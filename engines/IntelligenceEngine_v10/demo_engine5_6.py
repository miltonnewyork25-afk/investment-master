#!/usr/bin/env python3
"""
Engine 5 & 6 Demo Script
演示竞品追踪和财报预测的完整工作流程
"""

import sys
import os
from pathlib import Path

# 添加engines目录到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

# 动态加载模块（避免__init__.py的依赖问题）
import importlib.util

def load_module(module_name, file_path):
    """动态加载模块"""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def print_banner(text):
    """打印横幅"""
    width = 80
    print("\n" + "="*width)
    print(f" {text.center(width-2)}")
    print("="*width + "\n")


def print_section(text):
    """打印章节"""
    print("\n" + "-"*80)
    print(f" {text}")
    print("-"*80 + "\n")


def demo_competitor_tracker():
    """演示Engine 5: Competitor Tracker"""
    print_banner("DEMO: ENGINE 5 - COMPETITOR TRACKER")

    # 加载模块
    competitor_module = load_module(
        'competitor_tracker',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/competitor_tracker.py'
    )
    CompetitorTracker = competitor_module.CompetitorTracker

    # 创建追踪器
    print("初始化竞品追踪器...")
    tracker = CompetitorTracker('TSLA')
    print("✓ Tracker initialized for TSLA\n")

    # 获取竞争定位
    print_section("1. 竞争定位分析")
    positioning = tracker.get_competitive_positioning()

    print("Q4 2025 交付量排名:")
    print(positioning[['Company', 'Q4 2025 Deliveries', 'YoY Growth', 'Market Share (%)']].to_string(index=False))

    # 技术参数对比
    print_section("2. 技术参数对比")
    tech = tracker.compare_tech_specs()
    print("续航与充电对比:")
    print(tech[['Ticker', 'Range (km)', 'Charging Speed (kW)', 'Range vs TSLA (%)']].to_string(index=False))

    # 竞争压力评分
    print_section("3. 竞争压力评分")
    pressure = tracker.calculate_competitive_pressure_score()

    print(f"📊 总压力评分: {pressure['total_pressure_score']}/100")
    print(f"\n评分细分:")
    print(f"  • 销量增速压力: {pressure['growth_pressure']:.1f}/100")
    print(f"  • 市场份额压力: {pressure['share_pressure']:.1f}/100")
    print(f"  • 技术参数压力: {pressure['tech_pressure']:.1f}/100")
    print(f"  • 价格压力:     {pressure['price_pressure']:.1f}/100")
    print(f"\n💡 解释: {pressure['interpretation']}")

    # 生成信号
    print_section("4. 竞争信号生成")
    signal = tracker.generate_signal()

    print(f"信号强度: {signal['signal_strength']}/100")
    print(f"方向:     {signal['direction'].upper()}")
    print(f"置信度:   {signal['confidence']*100:.0f}%")

    print(f"\n🔍 关键发现:")
    for i, finding in enumerate(signal['key_findings'], 1):
        print(f"  {i}. {finding}")

    return signal


def demo_earnings_predictor(competitor_signal):
    """演示Engine 6: Earnings Predictor"""
    print_banner("DEMO: ENGINE 6 - EARNINGS PREDICTOR")

    # 加载ML模块
    ml_module = load_module(
        'ml_model_simple',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/ml_model_simple.py'
    )
    sys.modules['ml_model'] = ml_module

    # 加载预测器
    earnings_module = load_module(
        'earnings_predictor',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/earnings_predictor.py'
    )
    EarningsPredictorEngine = earnings_module.EarningsPredictorEngine

    print("初始化财报预测引擎...")
    predictor = EarningsPredictorEngine('TSLA')
    print("✓ Predictor initialized\n")

    # 整合信号
    print_section("1. 信号整合")
    engine_outputs = {
        'competitor': competitor_signal,
        # 其他引擎信号在实际应用中会添加
    }

    integrated = predictor.integrate_engine_signals(engine_outputs)
    print(f"整合了 {len(integrated['engines'])} 个引擎的信号:")
    for engine_name in integrated['engines'].keys():
        print(f"  ✓ {engine_name}")

    # 生成预测
    print_section("2. 财报预测")
    prediction = predictor.generate_earnings_prediction(engine_outputs)

    print(f"预测季度: {prediction['quarter']}\n")

    print("📈 核心指标预测:")
    eps = prediction['predictions']['eps']
    revenue = prediction['predictions']['revenue']
    margin = prediction['predictions']['gross_margin']

    print(f"\nEPS:")
    print(f"  预测值:       ${eps['predicted']:.2f}")
    print(f"  市场共识:     ${eps['market_consensus']:.2f}")
    print(f"  95% CI:       [${eps['lower_ci']:.2f}, ${eps['upper_ci']:.2f}]")
    print(f"  Beat概率:     {eps['surprise_probability']*100:.0f}%")

    print(f"\nRevenue:")
    print(f"  预测值:       ${revenue['predicted']:,.0f}M")
    print(f"  市场共识:     ${revenue['market_consensus']:,.0f}M")
    print(f"  95% CI:       [${revenue['lower_ci']:,.0f}M, ${revenue['upper_ci']:,.0f}M]")
    print(f"  Beat概率:     {revenue['surprise_probability']*100:.0f}%")

    print(f"\nGross Margin:")
    print(f"  预测值:       {margin['predicted']:.1f}%")
    print(f"  市场共识:     {margin['market_consensus']:.1f}%")

    # 综合评估
    print_section("3. 综合评估")
    assessment = prediction['integrated_assessment']

    print(f"📊 Outlook: {assessment['outlook']}")
    print(f"🎯 Confidence: {assessment['confidence']}")
    print(f"🔄 Signal Consistency: {assessment['signal_consistency']}")
    print(f"📈 Avg Surprise Prob: {assessment['average_surprise_probability']*100:.0f}%")

    print(f"\n💡 关键驱动因素:")
    for i, driver in enumerate(assessment['key_drivers'], 1):
        print(f"  {i}. {driver}")

    # 交易建议
    print_section("4. 交易建议")
    trading = prediction['trading_implications']

    print(f"Surprise分析:")
    print(f"  EPS Surprise:      {trading['eps_surprise_pct']:+.1f}%")
    print(f"  Revenue Surprise:  {trading['revenue_surprise_pct']:+.1f}%")
    print(f"  预估价格波动:      {trading['estimated_price_move_pct']:+.1f}%")

    print(f"\n📋 推荐策略:")
    print(f"  期权策略: {trading['option_strategy']}")
    print(f"  股票仓位: {trading['stock_position_guidance']}")
    print(f"  风险等级: {trading['risk_level']}")

    # 风险因素
    print_section("5. 风险因素")
    if prediction['risk_factors']:
        print("⚠️  识别到以下风险:")
        for risk in prediction['risk_factors']:
            print(f"\n  {risk['factor']} (严重程度: {risk['severity']})")
            print(f"  {risk['description']}")
    else:
        print("✓ 未识别到重大风险因素")

    # 特征重要性
    print_section("6. 特征重要性")
    if 'feature_importance' in prediction:
        print("影响预测的Top 5特征:")
        for feat in prediction['feature_importance'].get('top_5_features', []):
            bar_length = int(feat['importance'] * 50)
            bar = '█' * bar_length
            print(f"  {feat['feature']:25s} {bar} {feat['importance']:.3f}")

    return prediction


def demo_full_report(competitor_signal):
    """演示完整报告生成"""
    print_banner("DEMO: FULL EARNINGS REPORT")

    # 加载模块
    ml_module = load_module(
        'ml_model_simple',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/ml_model_simple.py'
    )
    sys.modules['ml_model'] = ml_module

    earnings_module = load_module(
        'earnings_predictor',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/earnings_predictor.py'
    )
    EarningsPredictorEngine = earnings_module.EarningsPredictorEngine

    predictor = EarningsPredictorEngine('TSLA')
    engine_outputs = {'competitor': competitor_signal}

    print("生成完整财报预测报告...\n")
    report = predictor.generate_report(engine_outputs)

    print(report)


def save_demo_results(competitor_signal, prediction):
    """保存演示结果"""
    print_banner("SAVING DEMO RESULTS")

    output_dir = Path("/Users/milton/投资大师/IntelligenceEngine_v10/reports")
    output_dir.mkdir(exist_ok=True)

    from datetime import datetime
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # 保存竞品信号
    competitor_file = output_dir / f"demo_competitor_signal_{timestamp}.txt"
    with open(competitor_file, 'w') as f:
        f.write("COMPETITOR TRACKER DEMO RESULT\n")
        f.write("="*80 + "\n\n")
        f.write(f"Signal Strength: {competitor_signal['signal_strength']}/100\n")
        f.write(f"Direction: {competitor_signal['direction']}\n")
        f.write(f"Confidence: {competitor_signal['confidence']}\n\n")
        f.write("Key Findings:\n")
        for finding in competitor_signal['key_findings']:
            f.write(f"  - {finding}\n")

    print(f"✓ Competitor signal saved to: {competitor_file}")

    # 保存预测报告
    prediction_file = output_dir / f"demo_earnings_prediction_{timestamp}.txt"
    with open(prediction_file, 'w') as f:
        f.write("EARNINGS PREDICTION DEMO RESULT\n")
        f.write("="*80 + "\n\n")
        f.write(f"Quarter: {prediction['quarter']}\n\n")

        eps = prediction['predictions']['eps']
        f.write(f"EPS Prediction: ${eps['predicted']:.2f} (Consensus: ${eps['market_consensus']:.2f})\n")
        f.write(f"Beat Probability: {eps['surprise_probability']*100:.0f}%\n\n")

        f.write(f"Outlook: {prediction['integrated_assessment']['outlook']}\n")
        f.write(f"Confidence: {prediction['integrated_assessment']['confidence']}\n")

    print(f"✓ Prediction saved to: {prediction_file}\n")


def main():
    """主演示函数"""
    print("\n")
    print("█" * 80)
    print("█" + " " * 78 + "█")
    print("█" + " " * 15 + "INTELLIGENCE ENGINE v10.0 - LIVE DEMO" + " " * 20 + "█")
    print("█" + " " * 78 + "█")
    print("█" * 80)

    print("\n本演示将展示Engine 5 (Competitor Tracker) 和 Engine 6 (Earnings Predictor)")
    print("的完整工作流程。\n")

    input("按Enter键开始演示...")

    try:
        # Part 1: Competitor Tracker
        competitor_signal = demo_competitor_tracker()

        input("\n按Enter键继续到财报预测演示...")

        # Part 2: Earnings Predictor
        prediction = demo_earnings_predictor(competitor_signal)

        input("\n按Enter键生成完整报告...")

        # Part 3: Full Report
        demo_full_report(competitor_signal)

        input("\n按Enter键保存演示结果...")

        # Save results
        save_demo_results(competitor_signal, prediction)

        # Final summary
        print_banner("DEMO COMPLETED")

        print("✅ 演示完成！\n")
        print("主要成果:")
        print(f"  1. 竞争压力评分: {competitor_signal['signal_strength']}/100")
        print(f"  2. 预测季度: {prediction['quarter']}")
        print(f"  3. EPS预测: ${prediction['predictions']['eps']['predicted']:.2f}")
        print(f"  4. Beat概率: {prediction['predictions']['eps']['surprise_probability']*100:.0f}%")
        print(f"  5. Outlook: {prediction['integrated_assessment']['outlook']}")

        print("\n📁 结果已保存至: /Users/milton/投资大师/IntelligenceEngine_v10/reports/")

        print("\n" + "="*80)
        print("感谢使用 Intelligence Engine v10.0!")
        print("="*80 + "\n")

    except Exception as e:
        print("\n" + "="*80)
        print(" ERROR OCCURRED")
        print("="*80)
        print(f"\n{type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
