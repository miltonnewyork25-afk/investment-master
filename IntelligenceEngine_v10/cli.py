#!/usr/bin/env python3
"""
SEC Monitor - 命令行工具
提供便捷的命令行接口

使用示例:
    python cli.py monitor TSLA              # 监控特斯拉
    python cli.py summary TSLA --days 90    # 生成汇总
    python cli.py compare TSLA AAPL NVDA    # 对比多只股票
    python cli.py alert                     # 查看警报
"""

import argparse
import sys
import os
import json
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

from sec_monitor import SECMonitorEngine
from data_analysis import SECDataAnalyzer
from sec_config import MONITORED_COMPANIES, TOP_INSTITUTIONS


def format_currency(value):
    """格式化货币"""
    if abs(value) >= 1e9:
        return f"${value/1e9:.2f}B"
    elif abs(value) >= 1e6:
        return f"${value/1e6:.2f}M"
    elif abs(value) >= 1e3:
        return f"${value/1e3:.2f}K"
    else:
        return f"${value:.2f}"


class SECMonitorCLI:
    """命令行接口"""

    def __init__(self):
        self.engine = SECMonitorEngine()
        self.analyzer = SECDataAnalyzer()

    def monitor(self, ticker, full_scan=False):
        """监控指定股票的Form 4"""
        if ticker not in MONITORED_COMPANIES:
            print(f"❌ 错误: {ticker} 不在监控列表中")
            print(f"可用股票: {', '.join(MONITORED_COMPANIES.keys())}")
            return

        print(f"\n🔍 正在监控 {ticker} 的Form 4...")
        self.engine.monitor_form4(ticker=ticker, full_scan=full_scan)
        print(f"✅ 监控完成\n")

    def monitor_all(self):
        """监控所有股票"""
        print(f"\n🔍 开始监控所有股票...")
        for ticker in MONITORED_COMPANIES.keys():
            print(f"\n{'='*60}")
            print(f"监控 {ticker}")
            print('='*60)
            self.engine.monitor_form4(ticker=ticker, full_scan=False)

        print(f"\n✅ 所有股票监控完成\n")

    def summary(self, ticker, days=90):
        """生成汇总报告"""
        print(f"\n📊 {ticker} 内部人交易汇总（{days}天）")
        print("="*70)

        summary = self.engine.get_insider_summary(ticker, days)

        if 'error' in summary:
            print(f"❌ {summary['error']}")
            return

        print(f"总交易数: {summary['total_transactions']}")
        print(f"内部人数: {summary['unique_insiders']}")
        print(f"买入交易: {summary['buy_transactions']} 笔")
        print(f"卖出交易: {summary['sell_transactions']} 笔")
        print(f"买入金额: {format_currency(summary['buy_value'])}")
        print(f"卖出金额: {format_currency(summary['sell_value'])}")
        print(f"净买卖额: {format_currency(summary['net_value'])}")
        print(f"买卖比率: {summary['buy_sell_ratio']:.2f}")

        # 情绪分析
        sentiment = self.analyzer.get_insider_sentiment(ticker, days)
        print(f"\n情绪指标: {sentiment['sentiment']}")
        print("="*70 + "\n")

    def compare(self, tickers, days=90):
        """对比多只股票"""
        print(f"\n📈 多股票对比（{days}天）")
        print("="*90)

        comparison = self.analyzer.compare_tickers(tickers, days)

        # 表头
        print(f"{'股票':<8} {'情绪':<12} {'买卖比率':<10} {'净买入':<15} {'交易数':<8}")
        print("-"*90)

        # 数据行
        for ticker, data in comparison.items():
            print(f"{ticker:<8} {data['sentiment']:<12} "
                  f"{data['buy_sell_ratio']:>8.2f}  "
                  f"{format_currency(data['net_value']):>13}  "
                  f"{data['total_transactions']:>6}")

        print("="*90 + "\n")

    def alert(self):
        """显示警报"""
        print(f"\n🚨 大额交易警报")
        print("="*90)

        cursor = self.engine.db.conn.cursor()
        cursor.execute("""
            SELECT ticker, insider_name, insider_title, transaction_date,
                   transaction_type, transaction_value
            FROM form4_transactions
            WHERE alert_triggered = 1
            ORDER BY transaction_date DESC
            LIMIT 20
        """)

        results = cursor.fetchall()

        if not results:
            print("暂无警报")
        else:
            for ticker, insider, title, date, txn_type, value in results:
                print(f"{date} | {ticker:<6} | {insider:<20} ({title})")
                print(f"         {txn_type}: {format_currency(value)}")
                print("-"*90)

        print("\n")

    def largest(self, ticker=None, limit=10):
        """显示最大交易"""
        print(f"\n💰 最大交易（Top {limit}）")
        print("="*90)

        trades = self.analyzer.get_largest_trades(ticker, limit)

        for i, trade in enumerate(trades, 1):
            print(f"{i}. {trade['ticker']} - {trade['insider_name']} ({trade['insider_title']})")
            print(f"   {trade['transaction_date']}: {trade['transaction_type']}")
            print(f"   {trade['shares']:,.0f}股 @ ${trade['price_per_share']:.2f} = {format_currency(trade['transaction_value'])}")
            print("-"*90)

        print("\n")

    def report(self, ticker):
        """生成完整报告"""
        report = self.analyzer.generate_report(ticker)
        print(report)

    def status(self):
        """显示系统状态"""
        print(f"\n⚙️  系统状态")
        print("="*70)

        from sec_config import DB_PATH
        import sqlite3

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # 统计数据
        cursor.execute("SELECT COUNT(*) FROM form4_transactions")
        form4_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM form13f_holdings")
        form13f_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(DISTINCT ticker) FROM form4_transactions")
        ticker_count = cursor.fetchone()[0]

        cursor.execute("SELECT MIN(transaction_date), MAX(transaction_date) FROM form4_transactions")
        date_range = cursor.fetchone()

        print(f"数据库路径: {DB_PATH}")
        print(f"Form 4 交易数: {form4_count:,}")
        print(f"13F 持仓数: {form13f_count:,}")
        print(f"覆盖股票数: {ticker_count}")

        if date_range[0]:
            print(f"数据范围: {date_range[0]} 至 {date_range[1]}")

        print(f"配置的监控股票: {', '.join(MONITORED_COMPANIES.keys())}")
        print("="*70 + "\n")

        conn.close()

    def close(self):
        """关闭资源"""
        self.engine.close()
        self.analyzer.close()


def main():
    parser = argparse.ArgumentParser(
        description='SEC Filing Monitor - 命令行工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  %(prog)s monitor TSLA              # 监控特斯拉
  %(prog)s summary TSLA --days 90    # 生成90天汇总
  %(prog)s compare TSLA AAPL NVDA    # 对比三只股票
  %(prog)s alert                     # 查看警报
  %(prog)s largest --limit 20        # 显示最大20笔交易
  %(prog)s report TSLA               # 完整报告
  %(prog)s status                    # 系统状态
        """
    )

    subparsers = parser.add_subparsers(dest='command', help='可用命令')

    # monitor命令
    monitor_parser = subparsers.add_parser('monitor', help='监控指定股票')
    monitor_parser.add_argument('ticker', nargs='?', help='股票代码（留空则监控所有）')
    monitor_parser.add_argument('--full', action='store_true', help='全量扫描')

    # summary命令
    summary_parser = subparsers.add_parser('summary', help='生成汇总报告')
    summary_parser.add_argument('ticker', help='股票代码')
    summary_parser.add_argument('--days', type=int, default=90, help='统计天数（默认90）')

    # compare命令
    compare_parser = subparsers.add_parser('compare', help='对比多只股票')
    compare_parser.add_argument('tickers', nargs='+', help='股票代码列表')
    compare_parser.add_argument('--days', type=int, default=90, help='统计天数（默认90）')

    # alert命令
    subparsers.add_parser('alert', help='显示警报')

    # largest命令
    largest_parser = subparsers.add_parser('largest', help='显示最大交易')
    largest_parser.add_argument('ticker', nargs='?', help='股票代码（留空则显示所有）')
    largest_parser.add_argument('--limit', type=int, default=10, help='显示数量（默认10）')

    # report命令
    report_parser = subparsers.add_parser('report', help='生成完整报告')
    report_parser.add_argument('ticker', help='股票代码')

    # status命令
    subparsers.add_parser('status', help='显示系统状态')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    # 执行命令
    cli = SECMonitorCLI()

    try:
        if args.command == 'monitor':
            if args.ticker:
                cli.monitor(args.ticker.upper(), args.full)
            else:
                cli.monitor_all()

        elif args.command == 'summary':
            cli.summary(args.ticker.upper(), args.days)

        elif args.command == 'compare':
            tickers = [t.upper() for t in args.tickers]
            cli.compare(tickers, args.days)

        elif args.command == 'alert':
            cli.alert()

        elif args.command == 'largest':
            ticker = args.ticker.upper() if args.ticker else None
            cli.largest(ticker, args.limit)

        elif args.command == 'report':
            cli.report(args.ticker.upper())

        elif args.command == 'status':
            cli.status()

    except KeyboardInterrupt:
        print("\n\n⚠️  用户中断")
    except Exception as e:
        print(f"\n❌ 错误: {e}")
    finally:
        cli.close()


if __name__ == '__main__':
    main()
