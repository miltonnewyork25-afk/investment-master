"""
SEC Filing Real-Time Monitor Engine v1.0
SEC文件实时监控引擎

功能：
1. 自动抓取Form 4（内部人交易）
2. 自动抓取13F-HR（机构持仓）
3. 解析XML/HTML数据
4. 存储到SQLite数据库
5. 数据验证与清洗

作者：Investment Research AI
创建日期：2026-01-25
"""

import requests
import sqlite3
import json
import time
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import xml.etree.ElementTree as ET
from pathlib import Path
import re

# 导入配置
from sec_config import (
    SEC_EDGAR_BASE,
    SEC_EDGAR_SEARCH,
    HEADERS,
    MONITORED_COMPANIES,
    TOP_INSTITUTIONS,
    FORM4_RSS_TEMPLATE,
    FORM13F_URL_TEMPLATE,
    DB_PATH,
    CACHE_DIR,
    RATE_LIMIT,
    TRANSACTION_CODES,
    ALERT_THRESHOLDS,
    KEY_POSITIONS,
    VALIDATION_RULES,
    LOG_FILE,
    LOG_FORMAT,
    LOG_LEVEL
)

# ==================== 日志配置 ====================

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format=LOG_FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


# ==================== 数据库管理 ====================

class SECDatabase:
    """SEC文件数据库管理类"""

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.conn = None
        self._init_database()

    def _init_database(self):
        """初始化数据库表结构"""
        self.conn = sqlite3.connect(self.db_path)
        cursor = self.conn.cursor()

        # Form 4 内部人交易表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS form4_transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                accession_number TEXT UNIQUE,
                ticker TEXT,
                company_name TEXT,
                cik TEXT,
                insider_name TEXT,
                insider_title TEXT,
                is_director INTEGER,
                is_officer INTEGER,
                is_ten_percent_owner INTEGER,
                transaction_date TEXT,
                transaction_code TEXT,
                transaction_type TEXT,
                shares REAL,
                price_per_share REAL,
                transaction_value REAL,
                shares_owned_after REAL,
                ownership_percentage REAL,
                filing_date TEXT,
                filing_url TEXT,
                is_key_insider INTEGER,
                alert_triggered INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # 13F 机构持仓表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS form13f_holdings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                accession_number TEXT,
                institution_name TEXT,
                institution_cik TEXT,
                report_date TEXT,
                ticker TEXT,
                company_name TEXT,
                cusip TEXT,
                shares REAL,
                market_value REAL,
                percentage_of_portfolio REAL,
                shares_change REAL,
                shares_change_percentage REAL,
                filing_date TEXT,
                filing_url TEXT,
                is_new_position INTEGER,
                is_sold_out INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(accession_number, institution_cik, cusip)
            )
        """)

        # 文件抓取历史表（去重）
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS filing_history (
                accession_number TEXT PRIMARY KEY,
                form_type TEXT,
                ticker TEXT,
                cik TEXT,
                filing_date TEXT,
                processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # 创建索引加速查询
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_form4_ticker_date
            ON form4_transactions(ticker, transaction_date)
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_form4_insider
            ON form4_transactions(insider_name, ticker)
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_13f_ticker_date
            ON form13f_holdings(ticker, report_date)
        """)
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_13f_institution
            ON form13f_holdings(institution_cik, report_date)
        """)

        self.conn.commit()
        logger.info(f"数据库初始化完成: {self.db_path}")

    def is_filing_processed(self, accession_number: str) -> bool:
        """检查文件是否已处理（去重）"""
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT 1 FROM filing_history WHERE accession_number = ?",
            (accession_number,)
        )
        return cursor.fetchone() is not None

    def mark_filing_processed(self, accession_number: str, form_type: str,
                             ticker: str, cik: str, filing_date: str):
        """标记文件已处理"""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT OR IGNORE INTO filing_history
            (accession_number, form_type, ticker, cik, filing_date)
            VALUES (?, ?, ?, ?, ?)
        """, (accession_number, form_type, ticker, cik, filing_date))
        self.conn.commit()

    def insert_form4(self, data: Dict) -> bool:
        """插入Form 4交易数据"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO form4_transactions
                (accession_number, ticker, company_name, cik, insider_name,
                 insider_title, is_director, is_officer, is_ten_percent_owner,
                 transaction_date, transaction_code, transaction_type,
                 shares, price_per_share, transaction_value,
                 shares_owned_after, ownership_percentage,
                 filing_date, filing_url, is_key_insider, alert_triggered)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                data['accession_number'],
                data['ticker'],
                data['company_name'],
                data['cik'],
                data['insider_name'],
                data['insider_title'],
                data['is_director'],
                data['is_officer'],
                data['is_ten_percent_owner'],
                data['transaction_date'],
                data['transaction_code'],
                data['transaction_type'],
                data['shares'],
                data['price_per_share'],
                data['transaction_value'],
                data['shares_owned_after'],
                data.get('ownership_percentage'),
                data['filing_date'],
                data['filing_url'],
                data['is_key_insider'],
                data['alert_triggered']
            ))
            self.conn.commit()
            return True
        except Exception as e:
            logger.error(f"插入Form 4数据失败: {e}")
            return False

    def insert_form13f(self, data: Dict) -> bool:
        """插入13F持仓数据"""
        try:
            cursor = self.conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO form13f_holdings
                (accession_number, institution_name, institution_cik,
                 report_date, ticker, company_name, cusip,
                 shares, market_value, percentage_of_portfolio,
                 shares_change, shares_change_percentage,
                 filing_date, filing_url, is_new_position, is_sold_out)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                data['accession_number'],
                data['institution_name'],
                data['institution_cik'],
                data['report_date'],
                data.get('ticker'),
                data['company_name'],
                data['cusip'],
                data['shares'],
                data['market_value'],
                data.get('percentage_of_portfolio'),
                data.get('shares_change'),
                data.get('shares_change_percentage'),
                data['filing_date'],
                data['filing_url'],
                data.get('is_new_position', 0),
                data.get('is_sold_out', 0)
            ))
            self.conn.commit()
            return True
        except Exception as e:
            logger.error(f"插入13F数据失败: {e}")
            return False

    def get_recent_form4(self, ticker: str, days: int = 30) -> List[Dict]:
        """获取最近N天的Form 4交易"""
        cursor = self.conn.cursor()
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
        cursor.execute("""
            SELECT * FROM form4_transactions
            WHERE ticker = ? AND transaction_date >= ?
            ORDER BY transaction_date DESC
        """, (ticker, cutoff_date))

        columns = [desc[0] for desc in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

    def close(self):
        """关闭数据库连接"""
        if self.conn:
            self.conn.close()


# ==================== API请求管理 ====================

class SECAPIClient:
    """SEC EDGAR API客户端"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.last_request_time = 0

    def _rate_limit(self):
        """速率限制：SEC要求每秒不超过10次请求"""
        elapsed = time.time() - self.last_request_time
        if elapsed < RATE_LIMIT['delay_between_requests']:
            time.sleep(RATE_LIMIT['delay_between_requests'] - elapsed)
        self.last_request_time = time.time()

    def fetch_url(self, url: str, max_retries: int = 3) -> Optional[str]:
        """获取URL内容，带重试机制"""
        for attempt in range(max_retries):
            try:
                self._rate_limit()
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                logger.info(f"成功获取: {url}")
                return response.text
            except requests.RequestException as e:
                logger.warning(f"请求失败 (尝试 {attempt+1}/{max_retries}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # 指数退避
        return None

    def fetch_form4_rss(self, ticker: str, cik: str) -> Optional[str]:
        """获取Form 4 RSS Feed"""
        url = FORM4_RSS_TEMPLATE.format(
            base=SEC_EDGAR_BASE,
            cik=cik.lstrip('0')  # 移除前导零
        )
        return self.fetch_url(url)

    def fetch_form13f_rss(self, cik: str) -> Optional[str]:
        """获取13F RSS Feed"""
        url = FORM13F_URL_TEMPLATE.format(
            base=SEC_EDGAR_BASE,
            cik=cik.lstrip('0')
        )
        return self.fetch_url(url)


# ==================== XML/HTML解析器 ====================

class Form4Parser:
    """Form 4 XML解析器"""

    @staticmethod
    def parse_rss_feed(xml_content: str, ticker: str) -> List[Dict]:
        """解析RSS Feed，提取文件列表"""
        filings = []
        try:
            # 清理XML命名空间
            xml_content = re.sub(r'xmlns="[^"]+"', '', xml_content)
            root = ET.fromstring(xml_content)

            for entry in root.findall('.//entry'):
                filing = {
                    'ticker': ticker,
                    'title': entry.findtext('title', ''),
                    'filing_url': entry.findtext('link', ''),
                    'filing_date': entry.findtext('updated', '')[:10],
                    'accession_number': ''
                }

                # 从URL提取accession number
                match = re.search(r'accession[_-]number=([0-9-]+)', filing['filing_url'])
                if match:
                    filing['accession_number'] = match.group(1)

                filings.append(filing)

            logger.info(f"解析到 {len(filings)} 个 Form 4 文件")
        except Exception as e:
            logger.error(f"解析RSS Feed失败: {e}")

        return filings

    @staticmethod
    def parse_form4_xml(xml_content: str, ticker: str, company_name: str,
                       cik: str, filing_info: Dict) -> List[Dict]:
        """解析Form 4 XML文件，提取交易数据

        注意：真实的Form 4 XML结构非常复杂，这里提供简化版解析
        生产环境建议使用专业库如 sec-edgar-downloader
        """
        transactions = []
        try:
            # 清理命名空间
            xml_content = re.sub(r'xmlns="[^"]+"', '', xml_content)
            root = ET.fromstring(xml_content)

            # 提取报告所有者信息
            owner_name = root.findtext('.//reportingOwner/reportingOwnerId/rptOwnerName', 'Unknown')

            # 提取关系
            relationship = root.find('.//reportingOwner/reportingOwnerRelationship')
            is_director = 1 if relationship and relationship.findtext('isDirector') == '1' else 0
            is_officer = 1 if relationship and relationship.findtext('isOfficer') == '1' else 0
            is_ten_percent = 1 if relationship and relationship.findtext('isTenPercentOwner') == '1' else 0
            officer_title = relationship.findtext('officerTitle', '') if relationship else ''

            # 提取所有非衍生品交易
            for txn in root.findall('.//nonDerivativeTransaction'):
                try:
                    trans_date = txn.findtext('.//transactionDate/value', '')
                    trans_code = txn.findtext('.//transactionCoding/transactionCode', '')
                    shares = float(txn.findtext('.//transactionAmounts/transactionShares/value', '0'))
                    price = float(txn.findtext('.//transactionAmounts/transactionPricePerShare/value', '0'))
                    shares_after = float(txn.findtext('.//postTransactionAmounts/sharesOwnedFollowingTransaction/value', '0'))

                    # 数据验证
                    if not Form4Parser._validate_transaction(shares, price):
                        logger.warning(f"交易数据验证失败: {ticker} {trans_date}")
                        continue

                    transaction = {
                        'accession_number': filing_info['accession_number'],
                        'ticker': ticker,
                        'company_name': company_name,
                        'cik': cik,
                        'insider_name': owner_name,
                        'insider_title': officer_title,
                        'is_director': is_director,
                        'is_officer': is_officer,
                        'is_ten_percent_owner': is_ten_percent,
                        'transaction_date': trans_date,
                        'transaction_code': trans_code,
                        'transaction_type': TRANSACTION_CODES.get(trans_code, 'Other'),
                        'shares': shares,
                        'price_per_share': price,
                        'transaction_value': shares * price,
                        'shares_owned_after': shares_after,
                        'ownership_percentage': None,  # 需要从其他数据源获取总股本
                        'filing_date': filing_info['filing_date'],
                        'filing_url': filing_info['filing_url'],
                        'is_key_insider': 1 if any(pos in officer_title.upper() for pos in KEY_POSITIONS) else 0,
                        'alert_triggered': 0
                    }

                    # 检查是否触发警报
                    if transaction['transaction_value'] >= ALERT_THRESHOLDS['insider_trade_value']:
                        transaction['alert_triggered'] = 1
                        logger.warning(f"⚠️ 大额交易警报: {ticker} {owner_name} {trans_code} "
                                     f"{shares:,.0f}股 @ ${price:.2f} = ${transaction['transaction_value']:,.0f}")

                    transactions.append(transaction)

                except (ValueError, AttributeError) as e:
                    logger.error(f"解析单笔交易失败: {e}")
                    continue

        except Exception as e:
            logger.error(f"解析Form 4 XML失败: {e}")

        return transactions

    @staticmethod
    def _validate_transaction(shares: float, price: float) -> bool:
        """验证交易数据合理性"""
        if shares < VALIDATION_RULES['min_shares']:
            return False
        if price < VALIDATION_RULES['min_share_price'] or price > VALIDATION_RULES['max_share_price']:
            return False
        return True


class Form13FParser:
    """Form 13F解析器（简化版）"""

    @staticmethod
    def parse_rss_feed(xml_content: str, institution_cik: str) -> List[Dict]:
        """解析13F RSS Feed"""
        filings = []
        try:
            xml_content = re.sub(r'xmlns="[^"]+"', '', xml_content)
            root = ET.fromstring(xml_content)

            for entry in root.findall('.//entry'):
                filing = {
                    'institution_cik': institution_cik,
                    'title': entry.findtext('title', ''),
                    'filing_url': entry.findtext('link', ''),
                    'filing_date': entry.findtext('updated', '')[:10],
                    'accession_number': ''
                }

                match = re.search(r'accession[_-]number=([0-9-]+)', filing['filing_url'])
                if match:
                    filing['accession_number'] = match.group(1)

                filings.append(filing)

            logger.info(f"解析到 {len(filings)} 个 13F 文件")
        except Exception as e:
            logger.error(f"解析13F RSS Feed失败: {e}")

        return filings


# ==================== 监控引擎核心 ====================

class SECMonitorEngine:
    """SEC文件监控引擎主类"""

    def __init__(self):
        self.db = SECDatabase()
        self.api_client = SECAPIClient()
        self.form4_parser = Form4Parser()
        self.form13f_parser = Form13FParser()
        logger.info("SEC监控引擎已启动")

    def monitor_form4(self, ticker: str = None, full_scan: bool = False):
        """监控Form 4文件

        Args:
            ticker: 指定股票代码，None则监控所有
            full_scan: 是否全量扫描（否则只获取最新）
        """
        companies = {ticker: MONITORED_COMPANIES[ticker]} if ticker else MONITORED_COMPANIES

        for tick, info in companies.items():
            logger.info(f"开始监控 {tick} ({info['name']}) 的Form 4...")

            # 获取RSS Feed
            rss_content = self.api_client.fetch_form4_rss(tick, info['cik'])
            if not rss_content:
                logger.error(f"无法获取 {tick} 的Form 4 RSS")
                continue

            # 解析文件列表
            filings = self.form4_parser.parse_rss_feed(rss_content, tick)

            new_filings = 0
            for filing in filings:
                # 去重检查
                if self.db.is_filing_processed(filing['accession_number']):
                    if not full_scan:
                        break  # 只获取最新的，遇到已处理的就停止
                    continue

                # 获取完整XML文件
                xml_url = self._construct_xml_url(filing['accession_number'])
                xml_content = self.api_client.fetch_url(xml_url)

                if not xml_content:
                    logger.warning(f"无法获取XML: {filing['accession_number']}")
                    continue

                # 解析交易数据
                transactions = self.form4_parser.parse_form4_xml(
                    xml_content, tick, info['name'], info['cik'], filing
                )

                # 存入数据库
                for txn in transactions:
                    self.db.insert_form4(txn)

                # 标记已处理
                self.db.mark_filing_processed(
                    filing['accession_number'], 'Form 4',
                    tick, info['cik'], filing['filing_date']
                )

                new_filings += 1
                logger.info(f"✓ 处理完成: {tick} {filing['filing_date']} - {len(transactions)}笔交易")

            logger.info(f"{tick} 新增 {new_filings} 个Form 4文件")

    def monitor_form13f(self, institution_cik: str = None):
        """监控13F文件"""
        institutions = {institution_cik: TOP_INSTITUTIONS.get(institution_cik)} if institution_cik else TOP_INSTITUTIONS

        for inst_id, info in institutions.items():
            if not info:
                continue

            logger.info(f"开始监控 {info['name']} 的13F持仓...")

            rss_content = self.api_client.fetch_form13f_rss(info['cik'])
            if not rss_content:
                logger.error(f"无法获取 {info['name']} 的13F RSS")
                continue

            filings = self.form13f_parser.parse_rss_feed(rss_content, info['cik'])

            for filing in filings[:1]:  # 只处理最新一份
                if self.db.is_filing_processed(filing['accession_number']):
                    continue

                logger.info(f"发现新13F文件: {info['name']} {filing['filing_date']}")
                # 注意：完整的13F解析需要处理XML信息表，这里仅做框架演示

                self.db.mark_filing_processed(
                    filing['accession_number'], '13F-HR',
                    '', info['cik'], filing['filing_date']
                )

    def _construct_xml_url(self, accession_number: str) -> str:
        """构造Form 4 XML文件URL"""
        # 去除连字符
        acc_no = accession_number.replace('-', '')
        # SEC文件URL格式: /Archives/edgar/data/{CIK}/{ACCESSION}/primary_doc.xml
        # 简化版：直接用搜索URL
        return f"{SEC_EDGAR_BASE}/cgi-bin/viewer?action=view&cik=&accession_number={accession_number}&xbrl_type=v"

    def get_insider_summary(self, ticker: str, days: int = 90) -> Dict:
        """生成内部人交易汇总报告"""
        transactions = self.db.get_recent_form4(ticker, days)

        if not transactions:
            return {"error": f"没有找到 {ticker} 的数据"}

        # 按交易类型汇总
        buy_volume = sum(t['shares'] for t in transactions if t['transaction_code'] == 'P')
        sell_volume = sum(t['shares'] for t in transactions if t['transaction_code'] == 'S')
        buy_value = sum(t['transaction_value'] for t in transactions if t['transaction_code'] == 'P')
        sell_value = sum(t['transaction_value'] for t in transactions if t['transaction_code'] == 'S')

        # 关键内部人交易
        key_trades = [t for t in transactions if t['is_key_insider'] == 1]

        summary = {
            'ticker': ticker,
            'period_days': days,
            'total_transactions': len(transactions),
            'unique_insiders': len(set(t['insider_name'] for t in transactions)),
            'buy_transactions': sum(1 for t in transactions if t['transaction_code'] == 'P'),
            'sell_transactions': sum(1 for t in transactions if t['transaction_code'] == 'S'),
            'buy_volume': buy_volume,
            'sell_volume': sell_volume,
            'net_volume': buy_volume - sell_volume,
            'buy_value': buy_value,
            'sell_value': sell_value,
            'net_value': buy_value - sell_value,
            'key_insider_trades': len(key_trades),
            'avg_buy_price': buy_value / buy_volume if buy_volume > 0 else 0,
            'avg_sell_price': sell_value / sell_volume if sell_volume > 0 else 0
        }

        return summary

    def close(self):
        """关闭引擎"""
        self.db.close()
        logger.info("SEC监控引擎已关闭")


# ==================== 命令行接口 ====================

def main():
    """主函数 - 示例用法"""
    print("=" * 60)
    print("SEC Filing Real-Time Monitor v1.0")
    print("=" * 60)

    # 初始化引擎
    engine = SECMonitorEngine()

    try:
        # 示例1: 监控特斯拉的Form 4
        print("\n[示例1] 监控TSLA的Form 4（内部人交易）...")
        engine.monitor_form4(ticker='TSLA', full_scan=False)

        # 示例2: 获取内部人交易汇总
        print("\n[示例2] 生成TSLA内部人交易汇总（90天）...")
        summary = engine.get_insider_summary('TSLA', days=90)
        print(json.dumps(summary, indent=2, ensure_ascii=False))

        # 示例3: 监控所有公司（可选）
        # print("\n[示例3] 监控所有配置的公司...")
        # engine.monitor_form4(full_scan=False)

        # 示例4: 监控机构13F（可选）
        # print("\n[示例4] 监控ARK的13F持仓...")
        # engine.monitor_form13f(institution_cik='ARK')

    except KeyboardInterrupt:
        print("\n用户中断")
    except Exception as e:
        logger.error(f"运行错误: {e}", exc_info=True)
    finally:
        engine.close()

    print("\n" + "=" * 60)
    print(f"数据已保存到: {DB_PATH}")
    print("=" * 60)


if __name__ == "__main__":
    main()
