#!/usr/bin/env python3
"""
机构持仓分析器 - Form 13F分析
功能：追踪顶级机构（Berkshire、Bridgewater等）的持仓变化
"""

import re
import csv
from typing import List, Dict, Optional
from pathlib import Path
from datetime import datetime
from sec_scraper import SECClient


class InstitutionalHoldingsAnalyzer:
    """13F机构持仓分析器"""

    # 著名机构CIK列表（加权评分时使用）
    FAMOUS_INSTITUTIONS = {
        '0001067983': {'name': 'Berkshire Hathaway', 'weight': 10},
        '0001350694': {'name': 'Bridgewater Associates', 'weight': 9},
        '0001037389': {'name': 'Renaissance Technologies', 'weight': 9},
        '0001649339': {'name': 'ARK Investment Management', 'weight': 8},
        '0001364742': {'name': 'Two Sigma', 'weight': 8},
        '0001336528': {'name': 'Citadel Advisors', 'weight': 7},
        '0001567619': {'name': 'Pershing Square Capital', 'weight': 9},
        '0001061768': {'name': 'Appaloosa Management', 'weight': 7},
        '0001079114': {'name': 'Third Point', 'weight': 7},
        '0001582694': {'name': 'Tiger Global Management', 'weight': 8}
    }

    def __init__(self, sec_client: SECClient):
        self.client = sec_client

    def get_institution_holdings(self, inst_cik: str, ticker: str, quarters_back: int = 2) -> List[Dict]:
        """
        获取某机构对某股票的持仓历史
        Args:
            inst_cik: 机构CIK
            ticker: 目标股票代码
            quarters_back: 回溯季度
        Returns:
            持仓历史列表 [{quarter, shares, value, change_pct}, ...]
        """
        filings = self.client.get_13f_filings(inst_cik, quarters_back)

        holdings = []
        for filing in filings:
            # 解析13F-HR文件（简化版本，实际需要解析XML）
            # 这里仅作示例框架
            holding = self._parse_13f_holding(filing['url'], ticker)
            if holding:
                holding['quarter'] = filing['filing_date']
                holding['filing_url'] = filing['url']
                holdings.append(holding)

        return holdings

    def _parse_13f_holding(self, filing_url: str, ticker: str) -> Optional[Dict]:
        """
        解析13F文件中特定股票的持仓
        注意：这是简化版本，完整实现需要解析XML表格
        """
        content = self.client._get(filing_url)
        if not content:
            return None

        # 查找信息表（informationTable.xml）
        xml_pattern = r'<a href="(/Archives/edgar/data/.*?/informationTable\.xml)">'
        xml_match = re.search(xml_pattern, content)

        if not xml_match:
            return None

        xml_url = f"{self.client.BASE_URL}{xml_match.group(1)}"
        xml_content = self.client._get(xml_url)

        if not xml_content:
            return None

        # 在XML中搜索目标股票（简化匹配）
        # 实际应使用ElementTree解析
        ticker_pattern = rf'<nameOfIssuer>.*?{re.escape(ticker)}.*?</nameOfIssuer>.*?<value>(\d+)</value>.*?<shrsOrPrnAmt>.*?<sshPrnamt>(\d+)</sshPrnamt>'
        match = re.search(ticker_pattern, xml_content, re.DOTALL | re.IGNORECASE)

        if match:
            return {
                'value': int(match.group(1)),  # 单位：千美元
                'shares': int(match.group(2))
            }

        return None

    def analyze_institutional_accumulation(self, ticker: str, quarters_back: int = 2) -> Dict:
        """
        分析机构累积/减持信号
        Args:
            ticker: 股票代码
        Returns:
            {
                'ticker': str,
                'total_institutions': int,
                'new_positions': int,
                'increased_positions': int,
                'decreased_positions': int,
                'famous_institution_actions': List[Dict],
                'signal_score': float,
                'summary': str
            }
        """
        print(f"正在分析 {ticker} 的机构持仓...")

        # 获取目标公司CIK
        target_cik = self.client.get_cik(ticker)
        if not target_cik:
            return {'ticker': ticker, 'error': 'CIK未找到'}

        famous_actions = []
        new_positions = 0
        increased_positions = 0
        decreased_positions = 0

        # 遍历著名机构
        for inst_cik, inst_info in self.FAMOUS_INSTITUTIONS.items():
            print(f"  检查 {inst_info['name']}...", end='\r')

            holdings = self.get_institution_holdings(inst_cik, ticker, quarters_back)

            if len(holdings) >= 2:
                # 比较最近两个季度
                latest = holdings[0]
                previous = holdings[1]

                shares_change = latest['shares'] - previous['shares']
                change_pct = (shares_change / previous['shares'] * 100) if previous['shares'] > 0 else 0

                action = 'Held'
                if shares_change > 0:
                    action = 'Increased'
                    increased_positions += 1
                elif shares_change < 0:
                    action = 'Decreased'
                    decreased_positions += 1

                famous_actions.append({
                    'institution': inst_info['name'],
                    'action': action,
                    'latest_shares': latest['shares'],
                    'change_shares': shares_change,
                    'change_pct': change_pct,
                    'latest_value_k': latest['value'],
                    'weight': inst_info['weight'],
                    'quarter': latest['quarter']
                })

            elif len(holdings) == 1:
                # 新建仓
                new_positions += 1
                famous_actions.append({
                    'institution': inst_info['name'],
                    'action': 'New Position',
                    'latest_shares': holdings[0]['shares'],
                    'latest_value_k': holdings[0]['value'],
                    'weight': inst_info['weight'],
                    'quarter': holdings[0]['quarter']
                })

        print()  # 换行

        # 计算信号评分 (0-100)
        signal_score = 0

        # 新建仓（每个+10分，最多30分）
        signal_score += min(new_positions * 10, 30)

        # 加仓（每个+5分，最多25分）
        signal_score += min(increased_positions * 5, 25)

        # 减仓（每个-5分）
        signal_score -= decreased_positions * 5

        # 著名机构加权（重点机构动作额外加分）
        for action in famous_actions:
            if action['action'] == 'Increased' and action['weight'] >= 9:
                signal_score += 15
            elif action['action'] == 'New Position' and action['weight'] >= 9:
                signal_score += 20

        # 限制在0-100范围
        signal_score = max(0, min(signal_score, 100))

        summary = f"{ticker}: 机构信号评分{signal_score}/100 | 新建仓{new_positions} | 加仓{increased_positions} | 减仓{decreased_positions}"

        return {
            'ticker': ticker,
            'total_institutions_tracked': len(self.FAMOUS_INSTITUTIONS),
            'new_positions': new_positions,
            'increased_positions': increased_positions,
            'decreased_positions': decreased_positions,
            'famous_institution_actions': famous_actions,
            'signal_score': signal_score,
            'summary': summary,
            'data_as_of': datetime.now().strftime('%Y-%m-%d')
        }

    def batch_analyze(self, tickers: List[str], quarters_back: int = 2) -> List[Dict]:
        """批量分析"""
        results = []

        for i, ticker in enumerate(tickers):
            print(f"\n[{i+1}/{len(tickers)}] 处理 {ticker}")
            result = self.analyze_institutional_accumulation(ticker, quarters_back)
            results.append(result)

        return results

    def save_results(self, results: List[Dict], output_file: str):
        """保存结果到CSV"""
        if not results:
            print("没有结果可保存")
            return

        # 汇总表
        summary_rows = []
        for r in results:
            if 'error' in r:
                continue

            summary_rows.append({
                'Ticker': r['ticker'],
                'Signal_Score': r['signal_score'],
                'New_Positions': r['new_positions'],
                'Increased_Positions': r['increased_positions'],
                'Decreased_Positions': r['decreased_positions'],
                'Total_Institutions_Tracked': r['total_institutions_tracked'],
                'Data_As_Of': r['data_as_of'],
                'Summary': r['summary']
            })

        # 按评分排序
        summary_rows.sort(key=lambda x: x['Signal_Score'], reverse=True)

        # 写入CSV
        if summary_rows:
            fieldnames = ['Ticker', 'Signal_Score', 'New_Positions', 'Increased_Positions',
                         'Decreased_Positions', 'Total_Institutions_Tracked', 'Data_As_Of', 'Summary']

            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(summary_rows)

            print(f"\n✓ 汇总结果已保存至: {output_file}")

        # 详细动作表
        detail_file = output_file.replace('.csv', '_detail.csv')
        detail_rows = []

        for r in results:
            if 'error' in r or not r.get('famous_institution_actions'):
                continue

            for action in r['famous_institution_actions']:
                detail_rows.append({
                    'Ticker': r['ticker'],
                    'Institution': action['institution'],
                    'Action': action['action'],
                    'Latest_Shares': action.get('latest_shares', 0),
                    'Change_Shares': action.get('change_shares', 0),
                    'Change_Pct': action.get('change_pct', 0),
                    'Latest_Value_kUSD': action.get('latest_value_k', 0),
                    'Institution_Weight': action['weight'],
                    'Quarter': action['quarter']
                })

        if detail_rows:
            fieldnames = ['Ticker', 'Institution', 'Action', 'Latest_Shares',
                         'Change_Shares', 'Change_Pct', 'Latest_Value_kUSD',
                         'Institution_Weight', 'Quarter']

            with open(detail_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(detail_rows)

            print(f"✓ 详细动作记录已保存至: {detail_file}")


def main():
    """主程序"""
    from sec_scraper import SECClient

    client = SECClient(user_agent="Investment Research System admin@investresearch.com")
    analyzer = InstitutionalHoldingsAnalyzer(client)

    test_tickers = ['AAPL', 'TSLA', 'NVDA']

    print("=" * 80)
    print("Form 13F 机构持仓分析系统")
    print("=" * 80)

    results = analyzer.batch_analyze(test_tickers, quarters_back=2)

    output_dir = Path(__file__).parent
    output_file = output_dir / 'institutional_holdings.csv'
    analyzer.save_results(results, str(output_file))

    print("\n完成！")


if __name__ == '__main__':
    main()
