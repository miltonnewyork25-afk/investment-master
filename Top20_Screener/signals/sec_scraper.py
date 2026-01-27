#!/usr/bin/env python3
"""
SEC信号侦测系统 - 核心爬虫工具
功能：抓取Form 4（内部人交易）、Form 13F（机构持仓）、Form 13D/13G（重要股东）
遵循SEC EDGAR访问规范：10 requests/second limit
"""

import requests
import time
import json
import re
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from xml.etree import ElementTree as ET
from html.parser import HTMLParser
import csv
import os
from pathlib import Path


class SECClient:
    """SEC EDGAR API客户端"""

    BASE_URL = "https://www.sec.gov"
    RATE_LIMIT = 0.1  # 10 requests/second = 0.1s间隔

    def __init__(self, user_agent: str = "Investment Research Bot admin@example.com"):
        """
        初始化SEC客户端
        Args:
            user_agent: 必须包含邮箱，SEC要求
        """
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': user_agent,
            'Accept-Encoding': 'gzip, deflate',
            'Host': 'www.sec.gov'
        })
        self.last_request_time = 0
        self.cache_dir = Path("sec_cache")
        self.cache_dir.mkdir(exist_ok=True)

    def _rate_limit(self):
        """速率限制：10 req/sec"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.RATE_LIMIT:
            time.sleep(self.RATE_LIMIT - elapsed)
        self.last_request_time = time.time()

    def _get(self, url: str, use_cache: bool = True) -> Optional[str]:
        """
        发送GET请求
        Args:
            url: 完整URL或相对路径
            use_cache: 是否使用缓存
        Returns:
            响应文本或None
        """
        if not url.startswith('http'):
            url = f"{self.BASE_URL}{url}"

        # 检查缓存
        cache_key = url.replace('/', '_').replace(':', '_')[-200:]  # 文件名限制
        cache_file = self.cache_dir / f"{cache_key}.cache"

        if use_cache and cache_file.exists():
            # 缓存有效期7天
            if time.time() - cache_file.stat().st_mtime < 7 * 24 * 3600:
                return cache_file.read_text(encoding='utf-8')

        self._rate_limit()
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            content = response.text

            # 写入缓存
            cache_file.write_text(content, encoding='utf-8')
            return content

        except requests.exceptions.RequestException as e:
            print(f"请求失败 {url}: {e}")
            return None

    def get_cik(self, ticker: str) -> Optional[str]:
        """
        获取公司的CIK号码
        Args:
            ticker: 股票代码
        Returns:
            10位CIK号码或None
        """
        url = f"{self.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={ticker}&type=&dateb=&owner=exclude&count=1&search_text="
        content = self._get(url)

        if not content:
            return None

        # 从HTML提取CIK
        match = re.search(r'CIK=(\d{10})', content)
        if match:
            return match.group(1)

        # 备选：从JSON API获取
        try:
            json_url = f"{self.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={ticker}&type=&dateb=&owner=exclude&count=1&output=atom"
            content = self._get(json_url)
            if content:
                match = re.search(r'<cik>(\d+)</cik>', content)
                if match:
                    return match.group(1).zfill(10)
        except:
            pass

        return None

    def get_form4_filings(self, cik: str, months_back: int = 6) -> List[Dict]:
        """
        获取Form 4内部人交易文件列表
        Args:
            cik: 10位CIK号码
            months_back: 回溯月数
        Returns:
            文件列表，每个元素包含 {filing_date, url, accession_number}
        """
        start_date = (datetime.now() - timedelta(days=months_back*30)).strftime('%Y%m%d')
        end_date = datetime.now().strftime('%Y%m%d')

        # 使用EDGAR全文搜索API
        url = f"{self.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=4&dateb={end_date}&datea={start_date}&owner=only&count=100"

        content = self._get(url)
        if not content:
            return []

        filings = []
        # 解析HTML表格
        pattern = r'<tr>.*?<td>(\d+)</td>.*?<td.*?><a.*?href="(/Archives/edgar/data/.*?)".*?>.*?</a></td>.*?<td>(.*?)</td>.*?</tr>'
        matches = re.findall(pattern, content, re.DOTALL)

        for match in matches:
            filing_num, doc_path, filing_date = match
            filings.append({
                'filing_date': filing_date.strip(),
                'url': f"{self.BASE_URL}{doc_path}",
                'accession_number': doc_path.split('/')[-1]
            })

        return filings

    def parse_form4(self, filing_url: str) -> Dict:
        """
        解析单个Form 4文件
        Args:
            filing_url: Form 4文件URL
        Returns:
            解析结果字典
        """
        content = self._get(filing_url)
        if not content:
            return {}

        # Form 4通常是XML格式
        try:
            # 查找主文档（.xml文件）
            xml_pattern = r'<a href="(/Archives/edgar/data/.*?\.xml)">'
            xml_match = re.search(xml_pattern, content)

            if xml_match:
                xml_url = f"{self.BASE_URL}{xml_match.group(1)}"
                xml_content = self._get(xml_url)

                if xml_content:
                    return self._parse_form4_xml(xml_content)
        except Exception as e:
            print(f"解析Form 4失败 {filing_url}: {e}")

        return {}

    def _parse_form4_xml(self, xml_content: str) -> Dict:
        """
        解析Form 4 XML内容
        Returns:
            {
                'reporter_name': str,
                'reporter_title': str,
                'transactions': [
                    {
                        'date': str,
                        'code': 'P'/'S'/'A',  # Purchase/Sale/Award
                        'shares': float,
                        'price': float,
                        'value': float
                    }
                ]
            }
        """
        try:
            root = ET.fromstring(xml_content)

            result = {
                'reporter_name': '',
                'reporter_title': '',
                'transactions': []
            }

            # 提取报告人信息
            reporting_owner = root.find('.//reportingOwner')
            if reporting_owner is not None:
                name_elem = reporting_owner.find('.//rptOwnerName')
                if name_elem is not None:
                    result['reporter_name'] = name_elem.text or ''

                title_elem = reporting_owner.find('.//reportingOwnerRelationship/officerTitle')
                if title_elem is not None:
                    result['reporter_title'] = title_elem.text or ''

            # 提取交易信息（非衍生品交易）
            for transaction in root.findall('.//nonDerivativeTransaction'):
                trans_data = {}

                # 交易日期
                date_elem = transaction.find('.//transactionDate/value')
                if date_elem is not None:
                    trans_data['date'] = date_elem.text

                # 交易代码（P=Purchase, S=Sale, A=Award）
                code_elem = transaction.find('.//transactionCoding/transactionCode')
                if code_elem is not None:
                    trans_data['code'] = code_elem.text

                # 股份数量
                shares_elem = transaction.find('.//transactionAmounts/transactionShares/value')
                if shares_elem is not None:
                    try:
                        trans_data['shares'] = float(shares_elem.text)
                    except:
                        trans_data['shares'] = 0

                # 价格
                price_elem = transaction.find('.//transactionAmounts/transactionPricePerShare/value')
                if price_elem is not None:
                    try:
                        trans_data['price'] = float(price_elem.text)
                    except:
                        trans_data['price'] = 0

                # 计算价值
                trans_data['value'] = trans_data.get('shares', 0) * trans_data.get('price', 0)

                if trans_data.get('code') and trans_data.get('shares'):
                    result['transactions'].append(trans_data)

            return result

        except Exception as e:
            print(f"XML解析失败: {e}")
            return {}

    def get_13f_filings(self, cik: str, quarters_back: int = 2) -> List[Dict]:
        """
        获取13F机构持仓文件列表
        Args:
            cik: 机构的CIK号码
            quarters_back: 回溯季度数
        Returns:
            文件列表
        """
        # 13F每季度披露一次
        start_date = (datetime.now() - timedelta(days=quarters_back*90)).strftime('%Y%m%d')
        end_date = datetime.now().strftime('%Y%m%d')

        url = f"{self.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=13F-HR&dateb={end_date}&datea={start_date}&owner=exclude&count=10"

        content = self._get(url)
        if not content:
            return []

        filings = []
        pattern = r'<tr>.*?<td.*?><a.*?href="(/Archives/edgar/data/.*?)".*?>.*?</a></td>.*?<td>(.*?)</td>.*?</tr>'
        matches = re.findall(pattern, content, re.DOTALL)

        for match in matches[:quarters_back]:
            doc_path, filing_date = match
            filings.append({
                'filing_date': filing_date.strip(),
                'url': f"{self.BASE_URL}{doc_path}",
                'accession_number': doc_path.split('/')[-1]
            })

        return filings


class InsiderTradingAnalyzer:
    """Form 4内部人交易分析器"""

    # 高级管理人员职位关键词（高权重）
    EXEC_KEYWORDS = ['CEO', 'CFO', 'President', 'Chief', 'Director', 'Board']

    def __init__(self, sec_client: SECClient):
        self.client = sec_client

    def analyze_insider_trading(self, ticker: str, months_back: int = 6) -> Dict:
        """
        分析内部人交易信号
        Args:
            ticker: 股票代码
            months_back: 回溯月数
        Returns:
            {
                'ticker': str,
                'cik': str,
                'net_insider_buying': float,  # 净买入金额
                'buy_ratio': float,  # 买入比例
                'signal_score': float,  # 信号评分 0-10
                'signal_strength': str,  # 强/中/弱
                'transactions': List[Dict],
                'summary': str
            }
        """
        print(f"正在分析 {ticker} 的内部人交易...")

        # 获取CIK
        cik = self.client.get_cik(ticker)
        if not cik:
            return {'ticker': ticker, 'error': 'CIK未找到'}

        # 获取Form 4文件列表
        filings = self.client.get_form4_filings(cik, months_back)
        print(f"  找到 {len(filings)} 个Form 4文件")

        all_transactions = []
        total_buy_value = 0
        total_sell_value = 0
        exec_buy_count = 0

        # 解析每个文件
        for i, filing in enumerate(filings[:20]):  # 限制最多20个文件
            print(f"  解析文件 {i+1}/{min(len(filings), 20)}...", end='\r')
            parsed = self.client.parse_form4(filing['url'])

            if not parsed or not parsed.get('transactions'):
                continue

            reporter_name = parsed.get('reporter_name', '')
            reporter_title = parsed.get('reporter_title', '')

            # 判断是否是高管
            is_exec = any(kw in reporter_title.upper() for kw in self.EXEC_KEYWORDS)

            for trans in parsed['transactions']:
                trans_code = trans.get('code', '')
                trans_value = trans.get('value', 0)

                # 只统计有意义的交易（>$10K）
                if trans_value < 10000:
                    continue

                trans_record = {
                    'date': trans.get('date', filing['filing_date']),
                    'reporter': reporter_name,
                    'title': reporter_title,
                    'is_exec': is_exec,
                    'code': trans_code,
                    'shares': trans.get('shares', 0),
                    'price': trans.get('price', 0),
                    'value': trans_value,
                    'filing_url': filing['url']
                }

                all_transactions.append(trans_record)

                # 累计买卖金额
                if trans_code == 'P':  # Purchase
                    total_buy_value += trans_value
                    if is_exec:
                        exec_buy_count += 1
                elif trans_code == 'S':  # Sale
                    total_sell_value += trans_value

        print()  # 换行

        # 计算指标
        net_buying = total_buy_value - total_sell_value
        total_value = total_buy_value + total_sell_value
        buy_ratio = (total_buy_value / total_value * 100) if total_value > 0 else 0

        # 计算信号评分 (0-10)
        signal_score = 0

        # 维度1: 净买入金额
        if net_buying > 1000000:
            signal_score += 4
        elif net_buying > 500000:
            signal_score += 3
        elif net_buying > 100000:
            signal_score += 2
        elif net_buying > 0:
            signal_score += 1

        # 维度2: 买入比例
        if buy_ratio > 80:
            signal_score += 3
        elif buy_ratio > 60:
            signal_score += 2
        elif buy_ratio > 50:
            signal_score += 1

        # 维度3: 高管买入
        if exec_buy_count >= 3:
            signal_score += 3
        elif exec_buy_count >= 1:
            signal_score += 2

        # 判断信号强度
        if signal_score >= 8:
            signal_strength = '强买入'
        elif signal_score >= 5:
            signal_strength = '中等买入'
        elif signal_score >= 3:
            signal_strength = '弱买入'
        else:
            signal_strength = '中性/卖出'

        # 生成摘要
        summary = f"{ticker}: {signal_strength} (评分{signal_score}/10) | 净买入${net_buying:,.0f} | 买入占比{buy_ratio:.1f}% | {exec_buy_count}位高管买入 | 共{len(all_transactions)}笔交易"

        return {
            'ticker': ticker,
            'cik': cik,
            'net_insider_buying': net_buying,
            'buy_value': total_buy_value,
            'sell_value': total_sell_value,
            'buy_ratio': buy_ratio,
            'signal_score': signal_score,
            'signal_strength': signal_strength,
            'exec_buy_count': exec_buy_count,
            'transaction_count': len(all_transactions),
            'transactions': all_transactions,
            'summary': summary,
            'data_as_of': datetime.now().strftime('%Y-%m-%d')
        }

    def batch_analyze(self, tickers: List[str], months_back: int = 6) -> List[Dict]:
        """批量分析多个股票"""
        results = []

        for i, ticker in enumerate(tickers):
            print(f"\n[{i+1}/{len(tickers)}] 处理 {ticker}")
            result = self.analyze_insider_trading(ticker, months_back)
            results.append(result)

            # 避免被SEC封IP，每个股票间隔2秒
            if i < len(tickers) - 1:
                time.sleep(2)

        return results

    def save_results(self, results: List[Dict], output_file: str):
        """保存结果到CSV"""
        if not results:
            print("没有结果可保存")
            return

        # 准备CSV数据（汇总表）
        summary_rows = []
        for r in results:
            if 'error' in r:
                continue

            summary_rows.append({
                'Ticker': r['ticker'],
                'CIK': r['cik'],
                'Signal_Score': r['signal_score'],
                'Signal_Strength': r['signal_strength'],
                'Net_Buying_USD': r['net_insider_buying'],
                'Buy_Ratio_Pct': r['buy_ratio'],
                'Exec_Buy_Count': r['exec_buy_count'],
                'Total_Transactions': r['transaction_count'],
                'Data_As_Of': r['data_as_of'],
                'Summary': r['summary']
            })

        # 按信号评分排序
        summary_rows.sort(key=lambda x: x['Signal_Score'], reverse=True)

        # 写入CSV
        if summary_rows:
            fieldnames = ['Ticker', 'Signal_Score', 'Signal_Strength', 'Net_Buying_USD',
                         'Buy_Ratio_Pct', 'Exec_Buy_Count', 'Total_Transactions',
                         'CIK', 'Data_As_Of', 'Summary']

            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(summary_rows)

            print(f"\n✓ 汇总结果已保存至: {output_file}")

        # 保存详细交易记录
        detail_file = output_file.replace('.csv', '_detail.csv')
        detail_rows = []

        for r in results:
            if 'error' in r or not r.get('transactions'):
                continue

            for trans in r['transactions']:
                detail_rows.append({
                    'Ticker': r['ticker'],
                    'Date': trans['date'],
                    'Reporter': trans['reporter'],
                    'Title': trans['title'],
                    'Is_Executive': trans['is_exec'],
                    'Transaction_Code': trans['code'],
                    'Shares': trans['shares'],
                    'Price_USD': trans['price'],
                    'Value_USD': trans['value'],
                    'Filing_URL': trans['filing_url']
                })

        if detail_rows:
            fieldnames = ['Ticker', 'Date', 'Reporter', 'Title', 'Is_Executive',
                         'Transaction_Code', 'Shares', 'Price_USD', 'Value_USD', 'Filing_URL']

            with open(detail_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(detail_rows)

            print(f"✓ 详细交易记录已保存至: {detail_file}")


def main():
    """主程序示例"""

    # 初始化客户端
    client = SECClient(user_agent="Investment Research System admin@investresearch.com")

    # 初始化分析器
    analyzer = InsiderTradingAnalyzer(client)

    # 测试股票列表（可从命令行参数或配置文件读取）
    test_tickers = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL']

    print("=" * 80)
    print("SEC Form 4 内部人交易侦测系统")
    print("=" * 80)

    # 批量分析
    results = analyzer.batch_analyze(test_tickers, months_back=6)

    # 保存结果
    output_dir = Path(__file__).parent
    output_file = output_dir / 'insider_trading_signals.csv'
    analyzer.save_results(results, str(output_file))

    # 打印Top 5
    print("\n" + "=" * 80)
    print("Top 5 内部人买入信号:")
    print("=" * 80)

    sorted_results = sorted([r for r in results if 'error' not in r],
                           key=lambda x: x['signal_score'], reverse=True)

    for i, r in enumerate(sorted_results[:5], 1):
        print(f"{i}. {r['summary']}")

    print("\n完成！")


if __name__ == '__main__':
    main()
