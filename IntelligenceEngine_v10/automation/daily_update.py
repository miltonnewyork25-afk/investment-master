#!/usr/bin/env python
"""
Daily Update Automation
每日自动更新竞品数据和生成财报预测
"""

import sys
import os
from datetime import datetime, timedelta
from pathlib import Path
import schedule
import time

# 添加engines目录到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'engines'))

from engines.competitor_tracker import CompetitorTracker
from engines.earnings_predictor import EarningsPredictorEngine


class DailyUpdateScheduler:
    """每日更新调度器"""

    def __init__(self, ticker='TSLA'):
        self.ticker = ticker
        self.report_dir = Path(__file__).parent.parent / 'reports'
        self.report_dir.mkdir(exist_ok=True)

        # 下次财报日期（需要手动更新）
        self.next_earnings_date = datetime(2026, 1, 29)  # 示例：2026年1月29日

    def calculate_days_to_earnings(self):
        """计算距离财报发布的天数"""
        today = datetime.now()
        delta = self.next_earnings_date - today
        return delta.days

    def daily_competitor_update(self):
        """每日竞品数据更新"""
        print(f"\n{'='*80}")
        print(f"Daily Competitor Update - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*80}\n")

        try:
            # 运行竞品追踪
            tracker = CompetitorTracker(self.ticker)
            signal = tracker.generate_signal()

            # 保存结果
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            report_file = self.report_dir / f'competitor_signal_{timestamp}.txt'

            with open(report_file, 'w') as f:
                f.write(f"Competitor Tracker Signal\n")
                f.write(f"{'='*80}\n\n")
                f.write(f"Generated: {signal['timestamp']}\n")
                f.write(f"Signal Strength: {signal['signal_strength']}/100\n")
                f.write(f"Direction: {signal['direction']}\n")
                f.write(f"Confidence: {signal['confidence']}\n\n")
                f.write(f"Key Findings:\n")
                for finding in signal['key_findings']:
                    f.write(f"  - {finding}\n")

            print(f"✓ Competitor signal saved to {report_file}")

            # 检查警报条件
            if signal['signal_strength'] > 75:
                self.send_alert(
                    f"HIGH COMPETITIVE PRESSURE ALERT: {signal['signal_strength']}/100",
                    signal['key_findings']
                )

            return signal

        except Exception as e:
            print(f"✗ Error in competitor update: {e}")
            return None

    def daily_earnings_prediction(self):
        """每日财报预测（仅在财报季前14天）"""
        days_to_earnings = self.calculate_days_to_earnings()

        print(f"\n{'='*80}")
        print(f"Daily Earnings Prediction - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Days to Earnings: {days_to_earnings}")
        print(f"{'='*80}\n")

        # 仅在财报前14天运行
        if days_to_earnings > 14 or days_to_earnings < 0:
            print(f"ℹ Not in earnings prediction window (14 days before earnings)")
            return None

        try:
            # 获取竞品信号
            tracker = CompetitorTracker(self.ticker)
            competitor_signal = tracker.generate_signal()

            # 生成预测
            engine = EarningsPredictorEngine(self.ticker)
            engine_outputs = {
                'competitor': competitor_signal,
                # 实际应用中添加其他引擎信号
            }

            prediction = engine.generate_earnings_prediction(engine_outputs)

            # 保存完整报告
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            report_file = self.report_dir / f'earnings_prediction_{timestamp}.txt'

            report_text = engine.generate_report(engine_outputs)

            with open(report_file, 'w') as f:
                f.write(report_text)

            print(f"✓ Earnings prediction saved to {report_file}")

            # 检查重大surprise
            eps_surprise_prob = prediction['predictions']['eps']['surprise_probability']
            if eps_surprise_prob > 0.7 or eps_surprise_prob < 0.3:
                outlook = "STRONG BEAT" if eps_surprise_prob > 0.7 else "SIGNIFICANT MISS RISK"
                self.send_alert(
                    f"EARNINGS ALERT: {outlook}",
                    [
                        f"EPS Beat Probability: {eps_surprise_prob*100:.0f}%",
                        f"Predicted EPS: ${prediction['predictions']['eps']['predicted']:.2f}",
                        f"Est. Price Move: {prediction['trading_implications']['estimated_price_move_pct']:+.1f}%"
                    ]
                )

            return prediction

        except Exception as e:
            print(f"✗ Error in earnings prediction: {e}")
            return None

    def weekly_summary(self):
        """每周总结报告"""
        print(f"\n{'='*80}")
        print(f"Weekly Summary - {datetime.now().strftime('%Y-%m-%d')}")
        print(f"{'='*80}\n")

        try:
            tracker = CompetitorTracker(self.ticker)

            # 季度趋势
            trend = tracker.get_quarterly_trend()
            positioning = tracker.get_competitive_positioning()
            pressure = tracker.calculate_competitive_pressure_score()

            # 保存周报
            timestamp = datetime.now().strftime('%Y%m%d')
            report_file = self.report_dir / f'weekly_summary_{timestamp}.txt'

            with open(report_file, 'w') as f:
                f.write(f"Weekly Competitor Summary\n")
                f.write(f"{'='*80}\n\n")
                f.write(f"Date: {datetime.now().strftime('%Y-%m-%d')}\n")
                f.write(f"Ticker: {self.ticker}\n\n")

                f.write(f"Competitive Pressure Score: {pressure['total_pressure_score']}/100\n")
                f.write(f"Interpretation: {pressure['interpretation']}\n\n")

                f.write(f"Top Competitors by Deliveries:\n")
                top3 = positioning.nlargest(3, 'Q4 2025 Deliveries')
                for _, row in top3.iterrows():
                    f.write(f"  {row['Company']}: {row['Q4 2025 Deliveries']:,} units "
                           f"({row['YoY Growth']*100:+.1f}% YoY)\n")

            print(f"✓ Weekly summary saved to {report_file}")

        except Exception as e:
            print(f"✗ Error in weekly summary: {e}")

    def send_alert(self, title, messages):
        """
        发送警报（可扩展为邮件、Slack等）

        Args:
            title: 警报标题
            messages: 消息列表
        """
        print(f"\n{'!'*80}")
        print(f"ALERT: {title}")
        print(f"{'!'*80}")
        for msg in messages:
            print(f"  {msg}")
        print(f"{'!'*80}\n")

        # TODO: 添加邮件/Slack集成
        # Example:
        # send_email(title, messages)
        # send_slack(title, messages)

    def run_daily_jobs(self):
        """运行所有每日任务"""
        print(f"\n{'█'*80}")
        print(f"█{' '*78}█")
        print(f"█{' '*20}DAILY UPDATE JOB - {datetime.now().strftime('%Y-%m-%d')}{' '*20}█")
        print(f"█{' '*78}█")
        print(f"{'█'*80}\n")

        # Job 1: 竞品更新
        self.daily_competitor_update()

        # Job 2: 财报预测（如果在预测窗口内）
        self.daily_earnings_prediction()

        print(f"\n{'='*80}")
        print(f"Daily jobs completed at {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*80}\n")

    def schedule_jobs(self):
        """设置定时任务"""
        # 每天上午9点运行
        schedule.every().day.at("09:00").do(self.run_daily_jobs)

        # 每周一上午10点运行周报
        schedule.every().monday.at("10:00").do(self.weekly_summary)

        print(f"Scheduler started. Jobs scheduled:")
        print(f"  - Daily update: Every day at 09:00")
        print(f"  - Weekly summary: Every Monday at 10:00")
        print(f"  - Next earnings date: {self.next_earnings_date.strftime('%Y-%m-%d')}")
        print(f"\nPress Ctrl+C to stop.\n")

        while True:
            schedule.run_pending()
            time.sleep(60)  # 检查间隔：1分钟


def main():
    """主函数"""
    import argparse

    parser = argparse.ArgumentParser(description='Intelligence Engine Daily Update Scheduler')
    parser.add_argument('--ticker', default='TSLA', help='Stock ticker (default: TSLA)')
    parser.add_argument('--mode', choices=['once', 'schedule'], default='once',
                       help='Run mode: once (run immediately) or schedule (run on schedule)')
    parser.add_argument('--job', choices=['competitor', 'earnings', 'weekly', 'all'], default='all',
                       help='Job to run (only for --mode once)')

    args = parser.parse_args()

    scheduler = DailyUpdateScheduler(args.ticker)

    if args.mode == 'once':
        # 立即运行一次
        if args.job == 'competitor' or args.job == 'all':
            scheduler.daily_competitor_update()

        if args.job == 'earnings' or args.job == 'all':
            scheduler.daily_earnings_prediction()

        if args.job == 'weekly' or args.job == 'all':
            scheduler.weekly_summary()

    else:
        # 定时调度模式
        try:
            scheduler.schedule_jobs()
        except KeyboardInterrupt:
            print("\n\nScheduler stopped by user.")
            sys.exit(0)


if __name__ == '__main__':
    main()
