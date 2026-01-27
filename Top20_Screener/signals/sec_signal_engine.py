#!/usr/bin/env python3
"""
SEC综合信号评分引擎
整合Form 4、13F、13D/13G的信号，输出综合评分
"""

import csv
from typing import List, Dict
from pathlib import Path
from datetime import datetime
import json

from sec_scraper import SECClient, InsiderTradingAnalyzer
from institutional_analyzer import InstitutionalHoldingsAnalyzer


class Form13DAnalyzer:
    """Form 13D/13G（5%+重要股东）分析器"""

    def __init__(self, sec_client: SECClient):
        self.client = sec_client

    def analyze_13d_filings(self, ticker: str, months_back: int = 12) -> Dict:
        """
        分析13D/13G文件
        Returns:
            {
                'ticker': str,
                'has_activist': bool,  # 是否有维权投资者
                'total_5pct_holders': int,  # 5%+股东数量
                'recent_13d_count': int,  # 最近12个月13D数量
                'signal_score': float,  # 0-25分
                'filings': List[Dict]
            }
        """
        print(f"正在分析 {ticker} 的13D/13G文件...")

        cik = self.client.get_cik(ticker)
        if not cik:
            return {'ticker': ticker, 'error': 'CIK未找到'}

        # 获取13D和13G文件
        from datetime import timedelta
        start_date = (datetime.now() - timedelta(days=months_back*30)).strftime('%Y%m%d')
        end_date = datetime.now().strftime('%Y%m%d')

        filings_13d = []
        filings_13g = []

        # 13D文件（主动投资者）
        url_13d = f"{self.client.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=SC%2013D&dateb={end_date}&datea={start_date}&owner=include&count=20"
        content = self.client._get(url_13d)

        if content:
            import re
            pattern = r'<tr>.*?<td.*?><a.*?href="(/Archives/edgar/data/.*?)".*?>.*?</a></td>.*?<td>(.*?)</td>.*?</tr>'
            matches = re.findall(pattern, content, re.DOTALL)

            for match in matches:
                doc_path, filing_date = match
                filings_13d.append({
                    'type': '13D',
                    'date': filing_date.strip(),
                    'url': f"{self.client.BASE_URL}{doc_path}"
                })

        # 13G文件（被动投资者）
        url_13g = f"{self.client.BASE_URL}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=SC%2013G&dateb={end_date}&datea={start_date}&owner=include&count=20"
        content = self.client._get(url_13g)

        if content:
            matches = re.findall(pattern, content, re.DOTALL)

            for match in matches:
                doc_path, filing_date = match
                filings_13g.append({
                    'type': '13G',
                    'date': filing_date.strip(),
                    'url': f"{self.client.BASE_URL}{doc_path}"
                })

        all_filings = filings_13d + filings_13g

        # 计算信号评分 (0-25)
        signal_score = 0

        # 新13D文件（维权投资者）非常重要
        recent_13d = len(filings_13d)
        if recent_13d > 0:
            signal_score += min(recent_13d * 15, 25)  # 每个13D文件+15分，最多25分

        # 13G文件（被动投资者）
        recent_13g = len(filings_13g)
        if recent_13g > 0:
            signal_score += min(recent_13g * 3, 10)  # 每个13G+3分，最多10分

        # 限制在0-25范围
        signal_score = max(0, min(signal_score, 25))

        has_activist = recent_13d > 0

        summary = f"{ticker}: 13D/13G评分{signal_score}/25 | {'有维权投资者' if has_activist else '无维权'} | 13D:{recent_13d} | 13G:{recent_13g}"

        return {
            'ticker': ticker,
            'has_activist': has_activist,
            'recent_13d_count': recent_13d,
            'recent_13g_count': recent_13g,
            'total_filings': len(all_filings),
            'signal_score': signal_score,
            'filings': all_filings,
            'summary': summary,
            'data_as_of': datetime.now().strftime('%Y-%m-%d')
        }

    def batch_analyze(self, tickers: List[str], months_back: int = 12) -> List[Dict]:
        """批量分析"""
        results = []
        for i, ticker in enumerate(tickers):
            print(f"\n[{i+1}/{len(tickers)}] 处理 {ticker}")
            result = self.analyze_13d_filings(ticker, months_back)
            results.append(result)
        return results


class SECSignalEngine:
    """综合SEC信号评分引擎"""

    def __init__(self):
        self.client = SECClient(user_agent="Investment Research System admin@investresearch.com")
        self.insider_analyzer = InsiderTradingAnalyzer(self.client)
        self.institutional_analyzer = InstitutionalHoldingsAnalyzer(self.client)
        self.form13d_analyzer = Form13DAnalyzer(self.client)

    def comprehensive_analysis(self, tickers: List[str]) -> List[Dict]:
        """
        综合分析：整合三个维度的信号
        Returns:
            每个股票的综合评分 (0-100)
        """
        print("=" * 80)
        print("SEC综合信号侦测系统")
        print("=" * 80)
        print(f"分析股票数量: {len(tickers)}")
        print()

        # 1. Form 4内部人交易（40%权重）
        print("\n【阶段1/3】分析Form 4内部人交易...")
        print("-" * 80)
        insider_results = self.insider_analyzer.batch_analyze(tickers, months_back=6)

        # 2. Form 13F机构持仓（35%权重）
        print("\n【阶段2/3】分析Form 13F机构持仓...")
        print("-" * 80)
        institutional_results = self.institutional_analyzer.batch_analyze(tickers, quarters_back=2)

        # 3. Form 13D/13G重要股东（25%权重）
        print("\n【阶段3/3】分析Form 13D/13G重要股东...")
        print("-" * 80)
        form13d_results = self.form13d_analyzer.batch_analyze(tickers, months_back=12)

        # 整合结果
        combined_results = []

        for i, ticker in enumerate(tickers):
            insider = insider_results[i] if i < len(insider_results) else {}
            institutional = institutional_results[i] if i < len(institutional_results) else {}
            form13d = form13d_results[i] if i < len(form13d_results) else {}

            # 计算综合评分 (0-100)
            insider_score = insider.get('signal_score', 0)  # 0-10 → 转换为40分制
            insider_weighted = (insider_score / 10) * 40

            institutional_score = institutional.get('signal_score', 0)  # 0-100 → 转换为35分制
            institutional_weighted = (institutional_score / 100) * 35

            form13d_score = form13d.get('signal_score', 0)  # 0-25 → 已是25分制
            form13d_weighted = form13d_score

            total_score = insider_weighted + institutional_weighted + form13d_weighted

            # 综合评级
            if total_score >= 80:
                rating = 'A+ 强烈信号'
            elif total_score >= 65:
                rating = 'A 强信号'
            elif total_score >= 50:
                rating = 'B 中等信号'
            elif total_score >= 35:
                rating = 'C 弱信号'
            else:
                rating = 'D 无明显信号'

            combined_results.append({
                'ticker': ticker,
                'total_score': round(total_score, 1),
                'rating': rating,
                'insider_score': round(insider_score, 1),
                'insider_weighted': round(insider_weighted, 1),
                'institutional_score': round(institutional_score, 1),
                'institutional_weighted': round(institutional_weighted, 1),
                'form13d_score': round(form13d_score, 1),
                'form13d_weighted': round(form13d_weighted, 1),
                'insider_summary': insider.get('summary', 'N/A'),
                'institutional_summary': institutional.get('summary', 'N/A'),
                'form13d_summary': form13d.get('summary', 'N/A'),
                'data_as_of': datetime.now().strftime('%Y-%m-%d')
            })

        # 按总分排序
        combined_results.sort(key=lambda x: x['total_score'], reverse=True)

        return combined_results

    def save_combined_results(self, results: List[Dict], output_file: str):
        """保存综合结果"""
        if not results:
            print("没有结果可保存")
            return

        fieldnames = [
            'Ticker', 'Total_Score', 'Rating',
            'Insider_Score_0_10', 'Insider_Weighted_40',
            'Institutional_Score_0_100', 'Institutional_Weighted_35',
            'Form13D_Score_0_25', 'Form13D_Weighted_25',
            'Insider_Summary', 'Institutional_Summary', 'Form13D_Summary',
            'Data_As_Of'
        ]

        rows = []
        for r in results:
            rows.append({
                'Ticker': r['ticker'],
                'Total_Score': r['total_score'],
                'Rating': r['rating'],
                'Insider_Score_0_10': r['insider_score'],
                'Insider_Weighted_40': r['insider_weighted'],
                'Institutional_Score_0_100': r['institutional_score'],
                'Institutional_Weighted_35': r['institutional_weighted'],
                'Form13D_Score_0_25': r['form13d_score'],
                'Form13D_Weighted_25': r['form13d_weighted'],
                'Insider_Summary': r['insider_summary'],
                'Institutional_Summary': r['institutional_summary'],
                'Form13D_Summary': r['form13d_summary'],
                'Data_As_Of': r['data_as_of']
            })

        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"\n✓ 综合评分结果已保存至: {output_file}")

        # 同时保存JSON格式（便于程序读取）
        json_file = output_file.replace('.csv', '.json')
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

        print(f"✓ JSON格式已保存至: {json_file}")

    def print_top_signals(self, results: List[Dict], top_n: int = 10):
        """打印Top N信号"""
        print("\n" + "=" * 80)
        print(f"Top {top_n} SEC综合信号排名")
        print("=" * 80)
        print(f"{'排名':<4} {'代码':<8} {'总分':<8} {'评级':<15} {'内部人':<8} {'机构':<8} {'13D':<8}")
        print("-" * 80)

        for i, r in enumerate(results[:top_n], 1):
            print(f"{i:<4} {r['ticker']:<8} {r['total_score']:<8.1f} {r['rating']:<15} "
                  f"{r['insider_score']:<8.1f} {r['institutional_score']:<8.1f} {r['form13d_score']:<8.1f}")

        print("=" * 80)


def main():
    """主程序入口"""

    # 测试股票列表
    # 实际使用时可从Top 100/200股票池读取
    test_tickers = [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA',
        'TSLA', 'META', 'BRK.B', 'V', 'JNJ'
    ]

    # 初始化引擎
    engine = SECSignalEngine()

    # 综合分析
    results = engine.comprehensive_analysis(test_tickers)

    # 保存结果
    output_dir = Path(__file__).parent
    output_file = output_dir / 'sec_combined_signals.csv'
    engine.save_combined_results(results, str(output_file))

    # 同时保存各维度详细数据
    engine.insider_analyzer.save_results(
        [r for r in engine.insider_analyzer.batch_analyze(test_tickers, months_back=6)],
        str(output_dir / 'insider_trading_signals.csv')
    )

    engine.institutional_analyzer.save_results(
        [r for r in engine.institutional_analyzer.batch_analyze(test_tickers, quarters_back=2)],
        str(output_dir / 'institutional_holdings.csv')
    )

    # 打印Top信号
    engine.print_top_signals(results, top_n=10)

    print("\n✓ 所有分析完成！")
    print(f"✓ 结果文件位于: {output_dir}")


if __name__ == '__main__':
    main()
