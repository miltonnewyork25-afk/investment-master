#!/usr/bin/env python3
"""
================================================================================
N-PORT 持仓数据提取器
================================================================================
功能: 从SEC EDGAR获取公募基金的N-PORT持仓数据

数据源: SEC EDGAR N-PORT XML
内容: 公募基金月度持仓
披露节奏: 按月报送，按季度公开（滞后约60天）
价值: 看到表现最好的公募基金在买什么

作者: Agent 12 - 聪明钱候选池构建器
版本: 1.0
日期: 2026-01-26
================================================================================
"""

import re
import time
import json
import logging
import xml.etree.ElementTree as ET
from typing import List, Dict, Optional, Any
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict
from dataclasses import dataclass, field, asdict
import requests

# ============================================================================
# 配置
# ============================================================================

BASE_DIR = Path("/Users/milton/投资大师/Top20_Screener")
FUNNEL_DIR = BASE_DIR / "funnel"
CACHE_DIR = FUNNEL_DIR / "cache"

# 创建目录
FUNNEL_DIR.mkdir(exist_ok=True, parents=True)
CACHE_DIR.mkdir(exist_ok=True, parents=True)

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# SEC EDGAR配置
SEC_BASE_URL = "https://www.sec.gov"
SEC_HEADERS = {
    "User-Agent": "Smart Money Screener research@investmentresearch.com",
    "Accept": "application/json, text/html, application/xml",
}

# API请求间隔（SEC限制: 10请求/秒）
REQUEST_DELAY = 0.15


# ============================================================================
# 数据类
# ============================================================================

@dataclass
class FundInfo:
    """基金信息"""
    name: str
    cik: str
    series_id: str = ""
    category: str = ""  # 价值型/成长型/股息增长型
    aum: float = 0  # 管理资产规模


@dataclass
class Holding:
    """持仓信息"""
    issuer_name: str
    cusip: str
    ticker: str = ""
    value: float = 0  # 持仓市值（千美元）
    shares: float = 0  # 持股数量
    pct_of_fund: float = 0  # 占基金比例
    asset_category: str = ""  # 资产类别
    sector: str = ""


@dataclass
class NPortFiling:
    """N-PORT文件信息"""
    filing_date: str
    reporting_date: str
    file_number: str
    accession_number: str
    document_url: str
    holdings: List[Holding] = field(default_factory=list)


# ============================================================================
# N-PORT提取器
# ============================================================================

class NPortExtractor:
    """
    N-PORT持仓数据提取器

    目标基金: 过去5年表现最优的价值型/质量型/股息增长型基金
    """

    # 目标基金列表
    # CIK是基金公司的CIK，需要结合Series ID来定位具体基金
    TARGET_FUNDS = [
        # 大盘价值基金
        FundInfo(name='Vanguard Value Index Fund', cik='0000034066',
                 series_id='S000002155', category='Value'),
        FundInfo(name='Fidelity Value Discovery Fund', cik='0000035315',
                 series_id='S000007192', category='Value'),
        FundInfo(name='Dodge & Cox Stock Fund', cik='0000029440',
                 series_id='S000000506', category='Value'),
        FundInfo(name='T. Rowe Price Value Fund', cik='0000057032',
                 series_id='S000001867', category='Value'),
        FundInfo(name='American Funds Washington Mutual', cik='0000002110',
                 series_id='S000005927', category='Value'),

        # 质量增长基金
        FundInfo(name='Fidelity Contrafund', cik='0000024237',
                 series_id='S000006036', category='Quality Growth'),
        FundInfo(name='T. Rowe Price Blue Chip Growth', cik='0000057032',
                 series_id='S000001869', category='Quality Growth'),
        FundInfo(name='American Funds Growth Fund of America', cik='0000002110',
                 series_id='S000005924', category='Quality Growth'),

        # 股息增长基金
        FundInfo(name='Vanguard Dividend Growth Fund', cik='0000034066',
                 series_id='S000002160', category='Dividend Growth'),
        FundInfo(name='T. Rowe Price Dividend Growth', cik='0000057032',
                 series_id='S000001871', category='Dividend Growth'),

        # 大盘混合/核心基金
        FundInfo(name='Vanguard 500 Index Fund', cik='0000034066',
                 series_id='S000002141', category='Large Cap Core'),
        FundInfo(name='Fidelity 500 Index Fund', cik='0000035315',
                 series_id='S000042784', category='Large Cap Core'),
    ]

    def __init__(self, use_cache: bool = True, cache_expiry_hours: int = 24):
        """
        初始化提取器

        Args:
            use_cache: 是否使用缓存
            cache_expiry_hours: 缓存过期时间（小时）
        """
        self.use_cache = use_cache
        self.cache_expiry = timedelta(hours=cache_expiry_hours)
        self.session = requests.Session()
        self.session.headers.update(SEC_HEADERS)

        # CUSIP到Ticker的映射（需要从其他数据源填充）
        self.cusip_to_ticker: Dict[str, str] = {}
        self._load_cusip_mapping()

        logger.info(f"N-PORT提取器初始化完成, 目标基金数量: {len(self.TARGET_FUNDS)}")

    def _load_cusip_mapping(self):
        """加载CUSIP到Ticker的映射"""
        mapping_file = CACHE_DIR / "cusip_ticker_map.json"

        if mapping_file.exists():
            try:
                with open(mapping_file, 'r') as f:
                    self.cusip_to_ticker = json.load(f)
                logger.info(f"已加载 {len(self.cusip_to_ticker)} 条CUSIP映射")
            except Exception as e:
                logger.warning(f"加载CUSIP映射失败: {e}")

        # 添加一些常见的大盘股映射
        common_cusips = {
            '594918104': 'MSFT',
            '037833100': 'AAPL',
            '02079K305': 'GOOGL',
            '02079K107': 'GOOG',
            '023135106': 'AMZN',
            '67066G104': 'NVDA',
            '88160R101': 'TSLA',
            '30303M102': 'META',
            '084670702': 'BRK.B',
            '92826C839': 'V',
            '478160104': 'JNJ',
            '931142103': 'WMT',
            '172967424': 'C',
            '46625H100': 'JPM',
            '78378X107': 'SPY',
            '912810TK6': 'T-Bill',
        }

        for cusip, ticker in common_cusips.items():
            if cusip not in self.cusip_to_ticker:
                self.cusip_to_ticker[cusip] = ticker

    def _save_cusip_mapping(self):
        """保存CUSIP映射"""
        mapping_file = CACHE_DIR / "cusip_ticker_map.json"
        try:
            with open(mapping_file, 'w') as f:
                json.dump(self.cusip_to_ticker, f, indent=2)
        except Exception as e:
            logger.warning(f"保存CUSIP映射失败: {e}")

    def _make_request(self, url: str) -> Optional[str]:
        """
        发送HTTP请求

        Args:
            url: 请求URL

        Returns:
            响应文本或None
        """
        try:
            time.sleep(REQUEST_DELAY)  # 遵守SEC速率限制
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logger.error(f"请求失败 {url}: {e}")
            return None

    def _get_cache_path(self, cache_key: str) -> Path:
        """获取缓存文件路径"""
        safe_key = re.sub(r'[^\w\-_]', '_', cache_key)
        return CACHE_DIR / f"{safe_key}.json"

    def _get_from_cache(self, cache_key: str) -> Optional[Dict]:
        """从缓存获取数据"""
        if not self.use_cache:
            return None

        cache_path = self._get_cache_path(cache_key)

        if not cache_path.exists():
            return None

        try:
            with open(cache_path, 'r') as f:
                cached = json.load(f)

            cached_time = datetime.fromisoformat(cached.get('cached_at', '2000-01-01'))
            if datetime.now() - cached_time > self.cache_expiry:
                logger.debug(f"缓存已过期: {cache_key}")
                return None

            return cached.get('data')
        except Exception as e:
            logger.warning(f"读取缓存失败: {e}")
            return None

    def _save_to_cache(self, cache_key: str, data: Any):
        """保存数据到缓存"""
        if not self.use_cache:
            return

        cache_path = self._get_cache_path(cache_key)

        try:
            with open(cache_path, 'w') as f:
                json.dump({
                    'cached_at': datetime.now().isoformat(),
                    'data': data
                }, f, indent=2)
        except Exception as e:
            logger.warning(f"保存缓存失败: {e}")

    def get_nport_filings(self, cik: str, count: int = 4) -> List[Dict]:
        """
        获取基金的N-PORT文件列表

        Args:
            cik: 基金公司CIK
            count: 获取数量

        Returns:
            文件列表
        """
        cache_key = f"nport_filings_{cik}_{count}"
        cached = self._get_from_cache(cache_key)
        if cached:
            return cached

        # 使用SEC EDGAR的submissions API
        submissions_url = f"{SEC_BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=NPORT-P&dateb=&owner=include&count={count}&output=atom"

        content = self._make_request(submissions_url)
        if not content:
            return []

        filings = []

        # 解析Atom feed
        try:
            # 简单解析，提取entry信息
            entry_pattern = r'<entry>.*?<link href="(.*?)".*?/>.*?<updated>(.*?)</updated>.*?</entry>'
            entries = re.findall(entry_pattern, content, re.DOTALL)

            for link, date in entries[:count]:
                # 清理链接
                if link.startswith('/'):
                    link = SEC_BASE_URL + link

                filings.append({
                    'url': link,
                    'filing_date': date[:10] if len(date) >= 10 else date,
                    'type': 'NPORT-P',
                })
        except Exception as e:
            logger.error(f"解析N-PORT列表失败: {e}")

        if filings:
            self._save_to_cache(cache_key, filings)

        return filings

    def parse_nport_xml(self, filing_url: str) -> List[Holding]:
        """
        解析N-PORT XML文件提取持仓

        Args:
            filing_url: 文件URL

        Returns:
            持仓列表
        """
        cache_key = f"nport_holdings_{hash(filing_url)}"
        cached = self._get_from_cache(cache_key)
        if cached:
            return [Holding(**h) for h in cached]

        # 获取文件索引页面
        content = self._make_request(filing_url)
        if not content:
            return []

        # 查找主要的N-PORT XML文件
        # 通常命名为 primary_doc.xml 或 包含 nport 的文件
        xml_patterns = [
            r'href="(/Archives/edgar/data/.*?\.xml)"[^>]*>primary',
            r'href="(/Archives/edgar/data/.*?nport.*?\.xml)"',
            r'href="(/Archives/edgar/data/.*?\.xml)"',
        ]

        xml_url = None
        for pattern in xml_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                xml_url = SEC_BASE_URL + match.group(1)
                break

        if not xml_url:
            logger.warning(f"未找到N-PORT XML文件: {filing_url}")
            return []

        # 获取XML内容
        xml_content = self._make_request(xml_url)
        if not xml_content:
            return []

        holdings = self._parse_nport_holdings_xml(xml_content)

        if holdings:
            self._save_to_cache(cache_key, [asdict(h) for h in holdings])

        return holdings

    def _parse_nport_holdings_xml(self, xml_content: str) -> List[Holding]:
        """
        解析N-PORT持仓XML

        Args:
            xml_content: XML内容

        Returns:
            持仓列表
        """
        holdings = []

        try:
            # 移除命名空间以简化解析
            xml_content = re.sub(r'xmlns[^=]*="[^"]*"', '', xml_content)
            xml_content = re.sub(r'<[^:>]+:', '<', xml_content)
            xml_content = re.sub(r'</[^:>]+:', '</', xml_content)

            root = ET.fromstring(xml_content)

            # 查找投资部分
            inv_or_secs = root.findall('.//invstOrSec') or root.findall('.//InvstOrSec')

            if not inv_or_secs:
                # 尝试其他常见路径
                inv_or_secs = root.findall('.//invOrSec') or root.findall('.//InvOrSec')

            for inv in inv_or_secs:
                try:
                    # 提取基本信息
                    name_elem = inv.find('name') or inv.find('Name') or inv.find('.//nameOfIssuer')
                    cusip_elem = inv.find('cusip') or inv.find('Cusip') or inv.find('.//cusip')
                    value_elem = inv.find('valUSD') or inv.find('ValUSD') or inv.find('.//value')
                    balance_elem = inv.find('balance') or inv.find('Balance') or inv.find('.//shrsOrPrnAmt/sshPrnamt')
                    pct_elem = inv.find('pctVal') or inv.find('PctVal') or inv.find('.//pctOfFund')

                    # 获取资产类别
                    asset_cat_elem = inv.find('assetCat') or inv.find('AssetCat')

                    if name_elem is None or cusip_elem is None:
                        continue

                    cusip = cusip_elem.text.strip() if cusip_elem.text else ""

                    # 跳过非股票资产（债券、现金等）
                    asset_cat = asset_cat_elem.text.strip() if asset_cat_elem is not None and asset_cat_elem.text else ""
                    if asset_cat and asset_cat not in ['EC', 'STIV', '']:
                        # EC = Equity-Common, STIV = Short-term investments
                        continue

                    # 获取ticker（从CUSIP映射或直接提取）
                    ticker = self.cusip_to_ticker.get(cusip, "")
                    if not ticker:
                        # 尝试从isin或ticker字段提取
                        ticker_elem = inv.find('ticker') or inv.find('Ticker')
                        if ticker_elem is not None and ticker_elem.text:
                            ticker = ticker_elem.text.strip()

                    holding = Holding(
                        issuer_name=name_elem.text.strip() if name_elem.text else "",
                        cusip=cusip,
                        ticker=ticker,
                        value=float(value_elem.text) if value_elem is not None and value_elem.text else 0,
                        shares=float(balance_elem.text) if balance_elem is not None and balance_elem.text else 0,
                        pct_of_fund=float(pct_elem.text) if pct_elem is not None and pct_elem.text else 0,
                        asset_category=asset_cat,
                    )

                    holdings.append(holding)

                except Exception as e:
                    logger.debug(f"解析单个持仓失败: {e}")
                    continue

        except ET.ParseError as e:
            logger.error(f"XML解析错误: {e}")
        except Exception as e:
            logger.error(f"解析N-PORT XML失败: {e}")

        return holdings

    def extract_top_holdings(self, fund: FundInfo, top_n: int = 50) -> List[Holding]:
        """
        提取基金前N大持仓

        Args:
            fund: 基金信息
            top_n: 返回数量

        Returns:
            持仓列表（按市值排序）
        """
        logger.info(f"提取基金持仓: {fund.name}")

        # 获取最新N-PORT文件
        filings = self.get_nport_filings(fund.cik, count=1)

        if not filings:
            logger.warning(f"未找到N-PORT文件: {fund.name}")
            return []

        # 解析持仓
        holdings = self.parse_nport_xml(filings[0]['url'])

        if not holdings:
            logger.warning(f"无法解析持仓: {fund.name}")
            return []

        # 按市值排序
        sorted_holdings = sorted(holdings, key=lambda x: x.value, reverse=True)

        logger.info(f"  -> 找到 {len(sorted_holdings)} 个持仓")

        return sorted_holdings[:top_n]

    def aggregate_across_funds(self) -> Dict[str, Dict]:
        """
        汇总所有目标基金的持仓，找出"反复出现"的股票

        Returns:
            聚合数据 {ticker: {fund_count, funds, total_value, weights, avg_weight}}
        """
        logger.info("=" * 80)
        logger.info("汇总所有目标基金持仓")
        logger.info("=" * 80)

        aggregated = defaultdict(lambda: {
            'fund_count': 0,
            'funds': [],
            'fund_categories': [],
            'total_value': 0,
            'weights': [],
            'cusips': set(),
            'issuer_names': [],
        })

        total_funds = len(self.TARGET_FUNDS)
        successful_funds = 0

        for i, fund in enumerate(self.TARGET_FUNDS, 1):
            logger.info(f"[{i}/{total_funds}] 处理 {fund.name}...")

            try:
                holdings = self.extract_top_holdings(fund, top_n=50)

                if holdings:
                    successful_funds += 1

                    for h in holdings:
                        # 优先使用ticker，否则用CUSIP
                        key = h.ticker if h.ticker else h.cusip

                        if not key:
                            continue

                        aggregated[key]['fund_count'] += 1
                        aggregated[key]['funds'].append(fund.name)
                        aggregated[key]['fund_categories'].append(fund.category)
                        aggregated[key]['total_value'] += h.value
                        aggregated[key]['weights'].append(h.pct_of_fund)
                        aggregated[key]['cusips'].add(h.cusip)
                        aggregated[key]['issuer_names'].append(h.issuer_name)

            except Exception as e:
                logger.error(f"处理基金失败 {fund.name}: {e}")

        # 计算平均权重并清理数据
        result = {}
        for key, data in aggregated.items():
            if data['fund_count'] >= 1:  # 至少被1家基金持有
                result[key] = {
                    'ticker': key,
                    'fund_count': data['fund_count'],
                    'funds': list(set(data['funds'])),  # 去重
                    'fund_categories': list(set(data['fund_categories'])),
                    'total_value': data['total_value'],
                    'avg_weight': sum(data['weights']) / len(data['weights']) if data['weights'] else 0,
                    'issuer_name': data['issuer_names'][0] if data['issuer_names'] else key,
                }

        logger.info(f"\n汇总完成: {successful_funds}/{total_funds} 基金成功")
        logger.info(f"找到 {len(result)} 只不重复股票")

        return result

    def generate_nport_holdings_report(self) -> str:
        """
        生成N-PORT持仓报告

        Returns:
            Markdown格式报告
        """
        aggregated = self.aggregate_across_funds()

        # 按fund_count和total_value排序
        sorted_holdings = sorted(
            aggregated.values(),
            key=lambda x: (x['fund_count'], x['total_value']),
            reverse=True
        )

        report = f"""# N-PORT公募基金持仓分析报告

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**数据来源**: SEC EDGAR N-PORT
**分析基金数量**: {len(self.TARGET_FUNDS)}
**找到持仓数量**: {len(sorted_holdings)}

---

## 目标基金列表

| 序号 | 基金名称 | 类型 | CIK |
|------|----------|------|-----|
"""
        for i, fund in enumerate(self.TARGET_FUNDS, 1):
            report += f"| {i} | {fund.name} | {fund.category} | {fund.cik} |\n"

        report += f"""
---

## 被多家基金持有的股票（共识持仓）

筛选标准: 被 ≥2 家目标基金持有

| 排名 | 代码 | 公司名称 | 持有基金数 | 总市值(百万$) | 平均权重 | 类型分布 |
|------|------|----------|-----------|--------------|---------|---------|
"""
        rank = 0
        for h in sorted_holdings:
            if h['fund_count'] >= 2:
                rank += 1
                categories = ', '.join(set(h['fund_categories']))
                total_value_m = h['total_value'] / 1000  # 转换为百万
                report += f"| {rank} | **{h['ticker']}** | {h['issuer_name'][:30]} | {h['fund_count']} | {total_value_m:,.0f} | {h['avg_weight']:.2%} | {categories} |\n"

        report += f"""
---

## 统计摘要

- **被≥3家基金持有**: {sum(1 for h in sorted_holdings if h['fund_count'] >= 3)} 只
- **被≥2家基金持有**: {sum(1 for h in sorted_holdings if h['fund_count'] >= 2)} 只
- **仅1家基金持有**: {sum(1 for h in sorted_holdings if h['fund_count'] == 1)} 只

---

**注**: 数据来自最新N-PORT报告，可能有60天左右的滞后。
"""

        return report


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主函数"""
    print("\n" + "=" * 80)
    print(" " * 20 + "N-PORT 持仓数据提取器")
    print(" " * 15 + "Smart Money Public Fund Holdings")
    print("=" * 80 + "\n")

    extractor = NPortExtractor(use_cache=True)

    # 生成报告
    report = extractor.generate_nport_holdings_report()

    # 保存报告
    report_file = FUNNEL_DIR / "nport_holdings_report.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"\n报告已保存至: {report_file}")

    # 保存聚合数据
    aggregated = extractor.aggregate_across_funds()
    data_file = FUNNEL_DIR / "nport_aggregated_holdings.json"
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(aggregated, f, indent=2, ensure_ascii=False)

    print(f"数据已保存至: {data_file}")

    return aggregated


if __name__ == '__main__':
    main()
