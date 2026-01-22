#!/usr/bin/env python3
"""
投资数据管道主入口

用法：
    python main.py --init                  # 初始化数据库
    python main.py --collect all           # 采集所有数据
    python main.py --collect prices        # 只采集股价
    python main.py --collect indicators    # 只采集行业指标
    python main.py --score                 # 计算评分
    python main.py --detect                # 检测信号
    python main.py --status                # 查看状态
    python main.py --daily                 # 每日例行任务
    python main.py --weekly                # 每周例行任务（含指标更新）
    python main.py --update-journals       # 更新投资日志
    python main.py --notify-test           # 测试通知系统
"""

import argparse
import json
from datetime import datetime, timedelta
from pathlib import Path
import sys

# 添加当前目录到路径
sys.path.insert(0, str(Path(__file__).parent))

from config import TRACKED_STOCKS, DATA_DIR, PROJECT_ROOT
from collectors.fmp_collector import FMPCollector
from collectors.scfi_collector import SCFICollector, BDICollector, OrderbookCollector
from collectors.dram_collector import DRAMCollector, MemoryCAPEXCollector
from storage.db import Database
from processors.scorer import Scorer
from alerts.detector import AlertDetector
from alerts.notifier import Notifier


def init_database():
    """初始化数据库"""
    print("\n[TASK] 初始化数据库...")
    db = Database()
    db.init_db()
    print("[DONE] 数据库初始化完成")


def collect_data(data_type: str = "all"):
    """采集数据"""
    print(f"\n[TASK] 采集数据 (类型: {data_type})...")

    collector = FMPCollector()
    db = Database()

    if data_type in ["all", "prices"]:
        print("\n[INFO] 采集股价数据...")
        all_data = collector.collect_all(save=True)

        # 保存到数据库
        for industry, stocks in all_data.items():
            for symbol, data in stocks.items():
                if data["quote"]:
                    db.insert_price(
                        symbol=symbol,
                        date=datetime.now().strftime("%Y-%m-%d"),
                        price_data=data["quote"]
                    )
                    print(f"  [DB] {symbol} 已保存到数据库")

    if data_type in ["all", "indicators"]:
        collect_indicators()

    print("\n[DONE] 数据采集完成")


def collect_indicators():
    """采集行业指标数据"""
    print("\n[TASK] 采集行业指标...")

    # 半导体指标
    print("\n[INFO] === 半导体行业指标 ===")
    dram = DRAMCollector()
    dram.collect(save=True)

    capex = MemoryCAPEXCollector()
    capex.collect(save=True)

    # 航运指标
    print("\n[INFO] === 航运行业指标 ===")
    scfi = SCFICollector()
    scfi.collect(save=True)

    bdi = BDICollector()
    bdi.collect(save=True)

    orderbook = OrderbookCollector()
    orderbook.collect(save=True)

    print("\n[DONE] 行业指标采集完成")


def calculate_scores():
    """计算评分"""
    print("\n[TASK] 计算评分...")

    db = Database()
    scorer = Scorer()

    results = {}

    for industry, config in TRACKED_STOCKS.items():
        print(f"\n[INFO] === {industry} 行业评分 ===")

        for symbol in config["symbols"]:
            # 获取最新价格数据
            price_data = db.get_latest_price(symbol)

            if price_data:
                score_result = scorer.score_and_save(symbol, price_data)
                if score_result:
                    results[symbol] = score_result

                    # 与上次评分对比
                    history = db.get_score_history(symbol, limit=2)
                    if len(history) >= 2:
                        change = score_result["final_score"] - history[1]["score"]
                        if abs(change) > 0:
                            direction = "↑" if change > 0 else "↓"
                            print(f"       变化: {direction} {abs(change):.1f}分")
            else:
                print(f"  [WARNING] {symbol} 无价格数据")

    print("\n[DONE] 评分计算完成")
    return results


def detect_signals(score_results: dict = None):
    """检测信号"""
    print("\n[TASK] 检测信号...")

    detector = AlertDetector()
    db = Database()

    # 准备数据
    price_data = {}
    score_data = {}

    for industry, config in TRACKED_STOCKS.items():
        for symbol in config["symbols"]:
            # 获取价格历史
            history = db.get_price_history(symbol, days=2)
            if len(history) >= 2:
                price_data[symbol] = {
                    "current_price": history[0]["close"],
                    "previous_price": history[1]["close"]
                }

            # 获取评分历史
            score_history = db.get_score_history(symbol, limit=2)
            if score_history:
                score_data[symbol] = {
                    "current_score": score_history[0]["score"],
                    "previous_score": score_history[1]["score"] if len(score_history) > 1 else None,
                    "industry": industry
                }

                # 添加评分详情
                latest = db.get_latest_score(symbol)
                if latest:
                    score_data[symbol].update({
                        "pe": latest["data_snapshot"].get("pe"),
                        "divergence_type": latest["adjustments"].get("divergence_type"),
                        "valuation_score": latest["data_snapshot"].get("valuation_score"),
                        "indicator_score": latest["data_snapshot"].get("indicator_score")
                    })

    # 运行检测
    alerts = detector.run_all_checks(price_data, score_data)

    # 打印结果
    detector.print_alerts(alerts)

    # 发送通知
    if alerts:
        notifier = Notifier()
        notify_results = notifier.send_alerts(alerts)
        print(f"\n[NOTIFY] 通知发送结果: {notify_results}")

    print("[DONE] 信号检测完成")
    return alerts


def show_status():
    """显示当前状态"""
    print("\n" + "=" * 60)
    print("投资 Agent 状态报告")
    print("=" * 60)
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    db = Database()

    # 显示各股票最新评分
    print("\n📊 最新评分:")
    print("-" * 50)
    print(f"{'股票':<8} {'行业':<12} {'得分':<8} {'评级':<10} {'建议'}")
    print("-" * 50)

    for industry, config in TRACKED_STOCKS.items():
        for symbol in config["symbols"]:
            score = db.get_latest_score(symbol)
            if score:
                print(f"{symbol:<8} {industry:<12} {score['final_score']:<8.1f} "
                      f"{score['rating']:<10} {score['recommendation']}")
            else:
                print(f"{symbol:<8} {industry:<12} {'--':<8} {'无数据':<10}")

    # 显示未确认的预警
    print("\n⚠️ 未确认预警:")
    alerts = db.get_recent_alerts(limit=5, unack_only=True)
    if alerts:
        for a in alerts:
            severity_icon = {"critical": "🔴", "warning": "🟡", "info": "🔵"}.get(a["severity"], "⚪")
            print(f"  {severity_icon} [{a['created_at'][:10]}] {a['message']}")
    else:
        print("  无未确认预警")

    # 显示预测准确率
    print("\n📈 预测准确率:")
    stats = db.get_accuracy_stats()
    print(f"  总计: {stats['correct']}/{stats['total']} ({stats['accuracy']}%)")

    # 显示待验证预测
    print("\n📋 待验证预测:")
    pending = db.get_pending_predictions()
    if pending:
        for p in pending[:5]:
            print(f"  • {p['symbol']} ({p['prediction_type']}): "
                  f"预测{p['predicted_direction']}，到期 {p['target_date']}")
    else:
        print("  无待验证预测")

    print("\n" + "=" * 60)


def update_journals():
    """自动更新投资日志"""
    print("\n[TASK] 更新投资日志...")

    db = Database()
    journals_dir = PROJECT_ROOT / "journals"

    updated_count = 0

    for industry, config in TRACKED_STOCKS.items():
        for symbol in config["symbols"]:
            # 获取最新评分
            score = db.get_latest_score(symbol)
            if not score:
                continue

            # 获取最新价格
            price = db.get_latest_price(symbol)

            # 查找该股票的日志目录
            symbol_dir = journals_dir / symbol
            if not symbol_dir.exists():
                continue

            # 创建或更新今日日志
            today = datetime.now().strftime("%Y-%m-%d")
            journal_file = symbol_dir / f"{today}.md"

            # 生成日志内容
            content = generate_journal_content(symbol, industry, score, price)

            # 保存日志
            with open(journal_file, "w", encoding="utf-8") as f:
                f.write(content)

            print(f"[INFO] 已更新: {journal_file}")
            updated_count += 1

    print(f"\n[DONE] 已更新 {updated_count} 个投资日志")


def generate_journal_content(symbol: str, industry: str, score: dict, price: dict) -> str:
    """生成投资日志内容"""
    today = datetime.now().strftime("%Y-%m-%d")

    # 确定框架版本
    if industry == "semicap":
        framework = "semicap-analysis v5.0"
    elif industry == "shipping":
        framework = "cycle-investing v1.1 (shipping)"
    else:
        framework = "cycle-investing"

    content = f"""# {symbol} 评估日志 - {today}

> 自动生成于 {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## 评估时数据

| 项目 | 数值 |
|------|------|
| 评估日期 | {today} |
| 股价 | ${price.get('close', 'N/A') if price else 'N/A'} |
| P/E | {price.get('pe', 'N/A') if price else 'N/A'} |
| P/B | {price.get('pb', 'N/A') if price else 'N/A'} |

## 框架评分

| 项目 | 数值 |
|------|------|
| 框架版本 | {framework} |
| 基础分 | {score.get('base_score', 'N/A')} |
| 调整项 | {json.dumps(score.get('adjustments', {}), ensure_ascii=False)} |
| **最终得分** | **{score.get('final_score', 'N/A')}** |
| 评级 | {score.get('rating', 'N/A')} |
| 建议 | {score.get('recommendation', 'N/A')} |

## 数据快照

```json
{json.dumps(score.get('data_snapshot', {}), indent=2, ensure_ascii=False)}
```

---

## 3个月回顾（待补充）

| 项目 | 数值 |
|------|------|
| 回顾日期 | 待填写 |
| 实际股价 | 待填写 |
| 实际涨跌幅 | 待计算 |
| 预测是否正确 | 待评估 |

---

## 6个月回顾（待补充）

| 项目 | 数值 |
|------|------|
| 回顾日期 | 待填写 |
| 实际股价 | 待填写 |
| 实际涨跌幅 | 待计算 |
| 预测是否正确 | 待评估 |

---

*自动生成 by Investment Agent*
*下次评估：{(datetime.now().replace(day=1) + timedelta(days=32)).replace(day=1).strftime("%Y-%m-%d")}*
"""

    return content


def daily_routine():
    """每日例行任务"""
    print("\n" + "=" * 60)
    print(f"每日例行任务 - {datetime.now().strftime('%Y-%m-%d')}")
    print("=" * 60)

    # 1. 采集股价数据
    collect_data("prices")

    # 2. 计算评分
    score_results = calculate_scores()

    # 3. 检测信号
    alerts = detect_signals(score_results)

    # 4. 发送每日摘要
    if score_results:
        notifier = Notifier()
        summary_results = notifier.send_daily_summary(score_results, alerts or [])
        print(f"\n[NOTIFY] 每日摘要发送结果: {summary_results}")

    # 5. 显示状态
    show_status()

    print("\n[DONE] 每日例行任务完成")


def weekly_routine():
    """每周例行任务（含指标更新）"""
    print("\n" + "=" * 60)
    print(f"每周例行任务 - {datetime.now().strftime('%Y-%m-%d')}")
    print("=" * 60)

    # 1. 采集所有数据（含指标）
    collect_data("all")

    # 2. 计算评分
    score_results = calculate_scores()

    # 3. 检测信号
    alerts = detect_signals(score_results)

    # 4. 更新投资日志
    update_journals()

    # 5. 发送每日摘要
    if score_results:
        notifier = Notifier()
        summary_results = notifier.send_daily_summary(score_results, alerts or [])
        print(f"\n[NOTIFY] 每周摘要发送结果: {summary_results}")

    # 6. 显示状态
    show_status()

    print("\n[DONE] 每周例行任务完成")


def test_notification():
    """测试通知系统"""
    print("\n[TASK] 测试通知系统...")

    test_alerts = [
        {
            "type": "sell_signal",
            "symbol": "LRCX",
            "severity": "critical",
            "message": "半导体卖出信号：顶部背离触发！（测试消息）"
        },
        {
            "type": "buy_signal",
            "symbol": "ZIM",
            "severity": "warning",
            "message": "航运买入信号：底部背离触发（测试消息）"
        }
    ]

    notifier = Notifier()
    results = notifier.send_alerts(test_alerts)

    print(f"\n[RESULT] 通知发送结果:")
    print(f"  本地日志: {'✓' if results.get('log') else '✗'}")
    print(f"  邮件:     {'✓' if results.get('email') else '✗ (未配置或未启用)'}")
    print(f"  Slack:    {'✓' if results.get('slack') else '✗ (未配置或未启用)'}")

    if results.get('log'):
        log_file = DATA_DIR / "notifications.log"
        print(f"\n  日志已保存到: {log_file}")

    print("\n[DONE] 通知测试完成")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description="投资数据管道")
    parser.add_argument("--init", action="store_true", help="初始化数据库")
    parser.add_argument("--collect", type=str, metavar="TYPE",
                        help="采集数据 (all/prices/indicators)")
    parser.add_argument("--score", action="store_true", help="计算评分")
    parser.add_argument("--detect", action="store_true", help="检测信号")
    parser.add_argument("--status", action="store_true", help="显示状态")
    parser.add_argument("--daily", action="store_true", help="执行每日例行任务")
    parser.add_argument("--weekly", action="store_true", help="执行每周例行任务")
    parser.add_argument("--update-journals", action="store_true", help="更新投资日志")
    parser.add_argument("--notify-test", action="store_true", help="测试通知系统")

    args = parser.parse_args()

    # 确保数据目录存在
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    if args.init:
        init_database()

    if args.collect:
        collect_data(args.collect)

    if args.score:
        calculate_scores()

    if args.detect:
        detect_signals()

    if args.status:
        show_status()

    if args.daily:
        daily_routine()

    if args.weekly:
        weekly_routine()

    if args.update_journals:
        update_journals()

    if args.notify_test:
        test_notification()

    # 如果没有指定任何参数，显示帮助
    if not any([args.init, args.collect, args.score, args.detect,
                args.status, args.daily, args.weekly, args.update_journals,
                args.notify_test]):
        parser.print_help()


if __name__ == "__main__":
    main()
