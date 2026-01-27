"""
SEC数据分析与可视化示例
展示如何使用监控引擎的数据进行深度分析
"""

import sys
import os
import sqlite3
from datetime import datetime, timedelta
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

from sec_config import DB_PATH, MONITORED_COMPANIES


class SECDataAnalyzer:
    """SEC数据分析器"""

    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.conn.row_factory = sqlite3.Row  # 允许通过列名访问

    def get_insider_sentiment(self, ticker: str, days: int = 90) -> dict:
        """计算内部人情绪指标

        返回:
            buy_sell_ratio: 买卖比率（>1为看涨，<1为看跌）
            net_value: 净买入金额
            participation_rate: 参与率（交易的内部人占总内部人比例）
        """
        cursor = self.conn.cursor()
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

        # 买入统计
        cursor.execute("""
            SELECT
                COUNT(*) as buy_count,
                SUM(shares) as buy_shares,
                SUM(transaction_value) as buy_value
            FROM form4_transactions
            WHERE ticker = ? AND transaction_code = 'P' AND transaction_date >= ?
        """, (ticker, cutoff_date))
        buy_stats = cursor.fetchone()

        # 卖出统计
        cursor.execute("""
            SELECT
                COUNT(*) as sell_count,
                SUM(shares) as sell_shares,
                SUM(transaction_value) as sell_value
            FROM form4_transactions
            WHERE ticker = ? AND transaction_code = 'S' AND transaction_date >= ?
        """, (ticker, cutoff_date))
        sell_stats = cursor.fetchone()

        # 计算指标
        buy_value = buy_stats['buy_value'] or 0
        sell_value = sell_stats['sell_value'] or 0
        buy_count = buy_stats['buy_count'] or 0
        sell_count = sell_stats['sell_count'] or 0

        return {
            'ticker': ticker,
            'period_days': days,
            'buy_transactions': buy_count,
            'sell_transactions': sell_count,
            'buy_value': buy_value,
            'sell_value': sell_value,
            'net_value': buy_value - sell_value,
            'buy_sell_ratio': buy_value / sell_value if sell_value > 0 else float('inf'),
            'sentiment': self._calculate_sentiment(buy_value, sell_value),
            'avg_buy_price': buy_value / (buy_stats['buy_shares'] or 1),
            'avg_sell_price': sell_value / (sell_stats['sell_shares'] or 1)
        }

    def _calculate_sentiment(self, buy_value: float, sell_value: float) -> str:
        """根据买卖比率判断情绪"""
        if buy_value == 0 and sell_value == 0:
            return "中性"
        ratio = buy_value / (sell_value or 1)
        if ratio > 2:
            return "强烈看涨"
        elif ratio > 1:
            return "看涨"
        elif ratio > 0.5:
            return "看跌"
        else:
            return "强烈看跌"

    def get_key_insider_activity(self, ticker: str, days: int = 90) -> list:
        """获取关键内部人（CEO/CFO等）的活动"""
        cursor = self.conn.cursor()
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

        cursor.execute("""
            SELECT
                insider_name,
                insider_title,
                transaction_date,
                transaction_code,
                transaction_type,
                shares,
                price_per_share,
                transaction_value
            FROM form4_transactions
            WHERE ticker = ?
              AND is_key_insider = 1
              AND transaction_date >= ?
            ORDER BY transaction_date DESC
        """, (ticker, cutoff_date))

        return [dict(row) for row in cursor.fetchall()]

    def get_trading_clusters(self, ticker: str, days: int = 90) -> dict:
        """检测集中交易（多个内部人在短时间内交易 = 强信号）"""
        cursor = self.conn.cursor()
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

        cursor.execute("""
            SELECT transaction_date, COUNT(*) as count, SUM(transaction_value) as total_value
            FROM form4_transactions
            WHERE ticker = ? AND transaction_date >= ?
            GROUP BY transaction_date
            HAVING count > 1
            ORDER BY count DESC, total_value DESC
        """, (ticker, cutoff_date))

        clusters = []
        for row in cursor.fetchall():
            if row['count'] >= 3:  # 至少3人同时交易
                clusters.append({
                    'date': row['transaction_date'],
                    'insider_count': row['count'],
                    'total_value': row['total_value'],
                    'signal_strength': 'strong' if row['count'] >= 5 else 'moderate'
                })

        return clusters

    def compare_tickers(self, tickers: list, days: int = 90) -> dict:
        """对比多只股票的内部人情绪"""
        comparison = {}
        for ticker in tickers:
            if ticker in MONITORED_COMPANIES:
                comparison[ticker] = self.get_insider_sentiment(ticker, days)

        return comparison

    def get_largest_trades(self, ticker: str = None, limit: int = 10) -> list:
        """获取最大交易（可选择特定股票或全部）"""
        cursor = self.conn.cursor()

        if ticker:
            cursor.execute("""
                SELECT ticker, insider_name, insider_title, transaction_date,
                       transaction_type, shares, price_per_share, transaction_value
                FROM form4_transactions
                WHERE ticker = ?
                ORDER BY transaction_value DESC
                LIMIT ?
            """, (ticker, limit))
        else:
            cursor.execute("""
                SELECT ticker, insider_name, insider_title, transaction_date,
                       transaction_type, shares, price_per_share, transaction_value
                FROM form4_transactions
                ORDER BY transaction_value DESC
                LIMIT ?
            """, (limit,))

        return [dict(row) for row in cursor.fetchall()]

    def get_trend_analysis(self, ticker: str, days: int = 180) -> dict:
        """趋势分析：内部人交易随时间的变化"""
        cursor = self.conn.cursor()
        cutoff_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')

        # 按月统计
        cursor.execute("""
            SELECT
                strftime('%Y-%m', transaction_date) as month,
                SUM(CASE WHEN transaction_code = 'P' THEN transaction_value ELSE 0 END) as buy_value,
                SUM(CASE WHEN transaction_code = 'S' THEN transaction_value ELSE 0 END) as sell_value
            FROM form4_transactions
            WHERE ticker = ? AND transaction_date >= ?
            GROUP BY month
            ORDER BY month
        """, (ticker, cutoff_date))

        monthly_data = [dict(row) for row in cursor.fetchall()]

        # 计算趋势
        if len(monthly_data) >= 2:
            recent_net = monthly_data[-1]['buy_value'] - monthly_data[-1]['sell_value']
            previous_net = monthly_data[-2]['buy_value'] - monthly_data[-2]['sell_value']
            trend = "改善" if recent_net > previous_net else "恶化"
        else:
            trend = "数据不足"

        return {
            'ticker': ticker,
            'monthly_data': monthly_data,
            'trend': trend
        }

    def generate_report(self, ticker: str) -> str:
        """生成综合分析报告（文本格式）"""
        report = []
        report.append("=" * 70)
        report.append(f"  {ticker} 内部人交易分析报告")
        report.append(f"  生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("=" * 70)

        # 1. 整体情绪
        sentiment_90d = self.get_insider_sentiment(ticker, 90)
        report.append("\n【90天情绪指标】")
        report.append(f"  买入交易: {sentiment_90d['buy_transactions']} 笔")
        report.append(f"  卖出交易: {sentiment_90d['sell_transactions']} 笔")
        report.append(f"  净值变化: ${sentiment_90d['net_value']:,.0f}")
        report.append(f"  买卖比率: {sentiment_90d['buy_sell_ratio']:.2f}")
        report.append(f"  整体情绪: {sentiment_90d['sentiment']}")

        # 2. 关键内部人活动
        key_trades = self.get_key_insider_activity(ticker, 90)
        report.append(f"\n【关键内部人活动】（90天内，共{len(key_trades)}笔）")
        for trade in key_trades[:5]:
            report.append(f"  • {trade['insider_name']} ({trade['insider_title']})")
            report.append(f"    {trade['transaction_date']}: {trade['transaction_type']}")
            report.append(f"    {trade['shares']:,.0f}股 @ ${trade['price_per_share']:.2f} = ${trade['transaction_value']:,.0f}")

        # 3. 集中交易
        clusters = self.get_trading_clusters(ticker, 90)
        if clusters:
            report.append(f"\n【集中交易警报】（多人同时交易）")
            for cluster in clusters[:3]:
                report.append(f"  • {cluster['date']}: {cluster['insider_count']}人同时交易")
                report.append(f"    总金额: ${cluster['total_value']:,.0f}")
                report.append(f"    信号强度: {cluster['signal_strength']}")
        else:
            report.append(f"\n【集中交易警报】无")

        # 4. 最大交易
        largest = self.get_largest_trades(ticker, 3)
        report.append(f"\n【历史最大交易】（Top 3）")
        for i, trade in enumerate(largest, 1):
            report.append(f"  {i}. {trade['insider_name']}: {trade['transaction_type']}")
            report.append(f"     ${trade['transaction_value']:,.0f} ({trade['transaction_date']})")

        report.append("\n" + "=" * 70)

        return "\n".join(report)

    def close(self):
        self.conn.close()


def main():
    """示例用法"""
    print("\n" + "█" * 70)
    print("█" + " " * 20 + "SEC数据分析示例" + " " * 29 + "█")
    print("█" * 70 + "\n")

    analyzer = SECDataAnalyzer()

    try:
        # 示例1: 单一股票分析
        print("【示例1】TSLA 内部人情绪分析")
        print("-" * 70)
        sentiment = analyzer.get_insider_sentiment('TSLA', 90)
        print(f"情绪: {sentiment['sentiment']}")
        print(f"买卖比率: {sentiment['buy_sell_ratio']:.2f}")
        print(f"净买入: ${sentiment['net_value']:,.0f}")

        # 示例2: 多股票对比
        print("\n【示例2】多股票情绪对比（90天）")
        print("-" * 70)
        tickers = ['TSLA', 'AAPL', 'NVDA', 'MSFT']
        comparison = analyzer.compare_tickers(tickers, 90)

        print(f"{'股票':<10} {'情绪':<15} {'买卖比率':<12} {'净买入':<20}")
        print("-" * 70)
        for ticker, data in comparison.items():
            print(f"{ticker:<10} {data['sentiment']:<15} "
                  f"{data['buy_sell_ratio']:>10.2f}  "
                  f"${data['net_value']:>15,.0f}")

        # 示例3: 完整报告
        print("\n【示例3】完整分析报告")
        report = analyzer.generate_report('TSLA')
        print(report)

        # 示例4: 集中交易检测
        print("\n【示例4】集中交易检测（NVDA）")
        print("-" * 70)
        clusters = analyzer.get_trading_clusters('NVDA', 90)
        if clusters:
            for cluster in clusters:
                print(f"{cluster['date']}: {cluster['insider_count']}人同时交易, "
                      f"金额${cluster['total_value']:,.0f}, "
                      f"信号强度: {cluster['signal_strength']}")
        else:
            print("未检测到集中交易")

    except Exception as e:
        print(f"错误: {e}")
    finally:
        analyzer.close()

    print("\n" + "█" * 70 + "\n")


if __name__ == "__main__":
    main()
