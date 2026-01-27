"""
Options Decoder Usage Examples
==============================

展示各种使用场景和最佳实践
"""

from options_decoder import OptionsDecoder
import json
from datetime import datetime


def example_1_basic_usage():
    """示例1: 基础使用流程"""
    print("\n" + "="*70)
    print("示例1: 基础使用 - 单只股票完整分析")
    print("="*70)

    # 初始化
    decoder = OptionsDecoder('TSLA', risk_free_rate=0.045)

    # 获取数据
    if not decoder.fetch_data():
        return

    # 生成完整报告
    report = decoder.generate_full_report()

    # 打印摘要
    decoder.print_report_summary(report)

    # 保存 JSON
    output_path = '/Users/milton/投资大师/IntelligenceEngine_v10/outputs/tsla_options_report.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"✓ 报告已保存: {output_path}")


def example_2_pc_ratio_monitoring():
    """示例2: Put/Call Ratio 情绪监控"""
    print("\n" + "="*70)
    print("示例2: Put/Call Ratio 情绪监控")
    print("="*70)

    decoder = OptionsDecoder('NVDA')
    if not decoder.fetch_data():
        return

    # 计算 P/C Ratio
    pc_data = decoder.calculate_put_call_ratio()

    print(f"\n📊 {decoder.ticker} Put/Call Ratio 分析")
    print(f"   成交量比率: {pc_data['volume_ratio']}")
    print(f"   持仓量比率: {pc_data['oi_ratio']}")
    print(f"   平均比率: {pc_data['avg_ratio']}")
    print(f"   信号: {pc_data['signal']}")

    # 情绪判断
    ratio = pc_data['avg_ratio']
    if ratio < 0.5:
        print("\n⚠️  警告: 市场过度乐观 (P/C < 0.5), 可能见顶")
    elif ratio > 1.5:
        print("\n⚠️  警告: 市场极度恐慌 (P/C > 1.5), 可能见底")
    else:
        print(f"\n✓ 市场情绪正常")


def example_3_max_pain_strategy():
    """示例3: Max Pain 策略"""
    print("\n" + "="*70)
    print("示例3: Max Pain 回归策略")
    print("="*70)

    decoder = OptionsDecoder('SPY')  # 使用 SPY (效果最好)
    if not decoder.fetch_data():
        return

    # 获取最近到期日
    exp_dates = sorted(list(decoder.options_data.keys()))
    nearest_exp = exp_dates[0]

    print(f"\n分析到期日: {nearest_exp}")

    # 计算 Max Pain
    max_pain = decoder.calculate_max_pain(nearest_exp)

    print(f"\n当前价格: ${decoder.current_price:.2f}")
    print(f"Max Pain: ${max_pain['max_pain_price']:.2f}")
    print(f"距离: {max_pain['distance_from_current_pct']:+.2f}%")

    # 策略建议
    distance = max_pain['distance_from_current_pct']
    if abs(distance) > 3:
        direction = "上涨" if distance > 0 else "下跌"
        print(f"\n💡 策略提示: 预期向 Max Pain 回归, 可能{direction} {abs(distance):.1f}%")
    else:
        print("\n✓ 当前价格接近 Max Pain, 无明显方向")


def example_4_unusual_activity():
    """示例4: 异常交易检测"""
    print("\n" + "="*70)
    print("示例4: 异常期权交易检测")
    print("="*70)

    decoder = OptionsDecoder('AAPL')
    if not decoder.fetch_data():
        return

    # 检测异常交易 (更严格的阈值)
    unusual = decoder.detect_unusual_activity(volume_threshold=3.0)

    print(f"\n🔍 检测到 {len(unusual)} 笔异常交易 (Vol > 3× OI)")

    if len(unusual) > 0:
        print("\nTop 5 异常交易:")
        for i, trade in enumerate(unusual[:5], 1):
            print(f"\n{i}. {trade['type']} ${trade['strike']} exp {trade['expiration']}")
            print(f"   成交量: {trade['volume']:,} (持仓量 {trade['open_interest']:,})")
            print(f"   Vol/OI 比率: {trade['vol_oi_ratio']}×")
            print(f"   交易金额: ${trade['premium_traded']:,.0f}")
            print(f"   状态: {trade['moneyness']} | IV: {trade['implied_vol']}%")

        # 筛选大额 Put (可能是对冲)
        big_puts = [t for t in unusual
                    if t['type'] == 'PUT' and t['premium_traded'] > 1_000_000]

        if big_puts:
            print(f"\n⚠️  发现 {len(big_puts)} 笔大额 Put 交易 (>$1M), 可能有对冲或做空信号")
    else:
        print("\n✓ 未检测到显著异常交易")


def example_5_iv_analysis():
    """示例5: 隐含波动率分析"""
    print("\n" + "="*70)
    print("示例5: 隐含波动率分析")
    print("="*70)

    decoder = OptionsDecoder('TSLA')
    if not decoder.fetch_data():
        return

    exp_dates = sorted(list(decoder.options_data.keys()))[:3]

    print(f"\n分析 {len(exp_dates)} 个到期日的隐含波动率\n")

    for exp_date in exp_dates:
        iv_data = decoder.analyze_implied_volatility(exp_date)

        if 'error' in iv_data:
            continue

        print(f"📅 {exp_date} ({iv_data['days_to_expiration']} 天)")
        print(f"   平均 IV: {iv_data['avg_iv']:.1f}% ({iv_data['signal']})")
        print(f"   Call IV: {iv_data['avg_call_iv']:.1f}% | Put IV: {iv_data['avg_put_iv']:.1f}%")
        print(f"   IV Skew: {iv_data['iv_skew']:+.1f}%")
        print(f"   IV 百分位: {iv_data['iv_percentile']:.1f}%")

        # 解读
        if iv_data['iv_skew'] > 5:
            print("   → Put IV 明显高于 Call, 市场对下跌有溢价")
        elif iv_data['iv_skew'] < -5:
            print("   → Call IV 明显高于 Put, 市场对上涨有溢价")

        if iv_data['avg_iv'] > 80:
            print("   ⚠️  IV 极高, 卖期权有优势 (小心 Gamma 风险)")

        print()


def example_6_implied_probability():
    """示例6: 隐含概率区间"""
    print("\n" + "="*70)
    print("示例6: 市场隐含的价格波动区间")
    print("="*70)

    decoder = OptionsDecoder('MSFT')
    if not decoder.fetch_data():
        return

    exp_dates = sorted(list(decoder.options_data.keys()))[:2]

    for exp_date in exp_dates:
        prob_range = decoder.implied_probability_range(exp_date, confidence=0.68)

        if 'error' in prob_range:
            continue

        print(f"\n📊 {exp_date} ({prob_range['days_to_expiration']} 天)")
        print(f"   当前价: ${prob_range['current_price']:.2f}")
        print(f"   68% 概率区间: ${prob_range['lower_bound']:.2f} - ${prob_range['upper_bound']:.2f}")
        print(f"   预期波动: ±${prob_range['expected_move_dollars']:.2f} (±{prob_range['expected_move_pct']:.1f}%)")
        print(f"   ATM Straddle 价格: ${prob_range['straddle_price']:.2f}")

        # 策略提示
        move_pct = prob_range['expected_move_pct']
        if move_pct > 10:
            print(f"   💡 大幅波动预期 (>{move_pct:.0f}%), 适合买 Straddle")
        elif move_pct < 5:
            print(f"   💡 小幅波动预期 (<{move_pct:.0f}%), 适合卖 Iron Condor")


def example_7_watchlist_monitoring():
    """示例7: 批量监控股票池"""
    print("\n" + "="*70)
    print("示例7: 批量监控股票池")
    print("="*70)

    watchlist = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'SPY']

    summary = []

    for ticker in watchlist:
        print(f"\n处理 {ticker}...", end=' ')

        decoder = OptionsDecoder(ticker)
        if not decoder.fetch_data():
            print("失败")
            continue

        # 快速分析
        pc_data = decoder.calculate_put_call_ratio()

        exp_dates = sorted(list(decoder.options_data.keys()))
        nearest_exp = exp_dates[0] if exp_dates else None

        max_pain = decoder.calculate_max_pain(nearest_exp) if nearest_exp else {}
        unusual_count = len(decoder.detect_unusual_activity())

        summary.append({
            'ticker': ticker,
            'price': decoder.current_price,
            'pc_ratio': pc_data['avg_ratio'],
            'pc_signal': pc_data['signal'],
            'max_pain_distance': max_pain.get('distance_from_current_pct', 0),
            'unusual_trades': unusual_count
        })

        print("✓")

    # 打印汇总表
    print("\n" + "="*70)
    print("汇总表")
    print("="*70)
    print(f"{'股票':<8} {'价格':>8} {'P/C':>6} {'信号':<10} {'Max Pain距离':>12} {'异常交易':>8}")
    print("-"*70)

    for item in summary:
        print(f"{item['ticker']:<8} ${item['price']:>7.2f} {item['pc_ratio']:>6.2f} "
              f"{item['signal']:<10} {item['max_pain_distance']:>11.1f}% {item['unusual_trades']:>8}")

    # 标记异常
    print("\n⚠️  需要关注的股票:")
    for item in summary:
        alerts = []
        if item['pc_ratio'] > 1.5:
            alerts.append("极度恐慌")
        elif item['pc_ratio'] < 0.5:
            alerts.append("过度乐观")

        if abs(item['max_pain_distance']) > 5:
            alerts.append(f"远离 Max Pain ({item['max_pain_distance']:+.1f}%)")

        if item['unusual_trades'] > 5:
            alerts.append(f"{item['unusual_trades']} 笔异常交易")

        if alerts:
            print(f"   {item['ticker']}: {', '.join(alerts)}")


def example_8_earnings_play():
    """示例8: 财报前分析"""
    print("\n" + "="*70)
    print("示例8: 财报前期权分析")
    print("="*70)

    # 假设 TSLA 财报在2周后
    decoder = OptionsDecoder('TSLA')
    if not decoder.fetch_data():
        return

    print(f"\n{decoder.ticker} 财报前分析")

    # 找到财报后的到期日 (通常是财报当周/次周五)
    exp_dates = sorted(list(decoder.options_data.keys()))
    earnings_exp = exp_dates[1] if len(exp_dates) > 1 else exp_dates[0]

    print(f"分析到期日: {earnings_exp}")

    # IV 分析
    iv_data = decoder.analyze_implied_volatility(earnings_exp)
    if 'avg_iv' in iv_data:
        print(f"\n📊 隐含波动率: {iv_data['avg_iv']:.1f}%")

        if iv_data['avg_iv'] > 70:
            print("   ⚠️  IV 已飙升, Straddle 昂贵 (财报前常见)")
        else:
            print("   ✓ IV 尚未明显升高")

    # 隐含波动区间
    prob_range = decoder.implied_probability_range(earnings_exp)
    if 'expected_move_pct' in prob_range:
        print(f"\n📈 市场预期财报后波动: ±{prob_range['expected_move_pct']:.1f}%")
        print(f"   区间: ${prob_range['lower_bound']:.2f} - ${prob_range['upper_bound']:.2f}")

        # 策略建议
        expected_move = prob_range['expected_move_pct']
        if expected_move > 8:
            print("\n💡 策略建议:")
            print(f"   • 波动预期高 (>{expected_move:.0f}%), 买 Straddle 需要大幅突破才盈利")
            print(f"   • 考虑卖 Straddle (风险高, 需对冲)")
            print(f"   • 或买 OTM Butterfly 限制风险")
        else:
            print("\n💡 策略建议:")
            print(f"   • 波动预期适中, 买 Straddle 相对合理")

    # 异常交易
    unusual = decoder.detect_unusual_activity()
    if unusual:
        print(f"\n🔍 异常交易 ({len(unusual)} 笔):")
        for trade in unusual[:3]:
            print(f"   • {trade['type']} ${trade['strike']} - ${trade['premium_traded']:,.0f}")


# ============================================================================
# 主函数
# ============================================================================

def main():
    """运行所有示例"""
    examples = [
        ("基础使用", example_1_basic_usage),
        ("P/C Ratio 监控", example_2_pc_ratio_monitoring),
        ("Max Pain 策略", example_3_max_pain_strategy),
        ("异常交易检测", example_4_unusual_activity),
        ("隐含波动率分析", example_5_iv_analysis),
        ("隐含概率区间", example_6_implied_probability),
        ("批量监控", example_7_watchlist_monitoring),
        ("财报前分析", example_8_earnings_play),
    ]

    print("\n" + "="*70)
    print("Options Market Intelligence Decoder - 使用示例")
    print("="*70)
    print("\n可用示例:")
    for i, (name, _) in enumerate(examples, 1):
        print(f"  {i}. {name}")

    print("\n输入示例编号 (1-8), 或按 Enter 运行所有示例: ", end='')

    try:
        choice = input().strip()

        if choice == '':
            # 运行所有示例
            for name, func in examples:
                print(f"\n{'='*70}")
                print(f"运行示例: {name}")
                print('='*70)
                try:
                    func()
                except Exception as e:
                    print(f"❌ 错误: {str(e)}")

                input("\n按 Enter 继续...")

        elif choice.isdigit() and 1 <= int(choice) <= len(examples):
            # 运行指定示例
            idx = int(choice) - 1
            name, func = examples[idx]
            print(f"\n运行示例: {name}")
            func()

        else:
            print("无效输入")

    except KeyboardInterrupt:
        print("\n\n中断退出")


if __name__ == '__main__':
    main()
