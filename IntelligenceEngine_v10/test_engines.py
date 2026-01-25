#!/usr/bin/env python
"""
测试脚本：Engine 5 & 6 完整测试
"""

import sys
import os

# 添加engines目录到路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

from engines.competitor_tracker import CompetitorTracker
from engines.earnings_predictor import EarningsPredictorEngine
from engines.ml_model import EarningsPredictor
import pandas as pd


def print_section(title):
    """打印分节标题"""
    print("\n" + "="*80)
    print(f" {title}")
    print("="*80 + "\n")


def test_competitor_tracker():
    """测试Engine 5: Competitor Tracker"""
    print_section("TEST 1: COMPETITOR TRACKER (ENGINE 5)")

    tracker = CompetitorTracker('TSLA')

    # 测试1: 竞争定位
    print("1.1 Competitive Positioning")
    print("-" * 80)
    positioning = tracker.get_competitive_positioning()
    print(positioning[['Company', 'Q4 2025 Deliveries', 'YoY Growth', 'Market Share (%)']].to_string(index=False))

    # 测试2: 技术参数对比
    print("\n1.2 Tech Specs Comparison")
    print("-" * 80)
    tech = tracker.compare_tech_specs()
    print(tech[['Ticker', 'Range (km)', 'Charging Speed (kW)', 'Range vs TSLA (%)']].to_string(index=False))

    # 测试3: 竞争压力评分
    print("\n1.3 Competitive Pressure Score")
    print("-" * 80)
    pressure = tracker.calculate_competitive_pressure_score()
    print(f"Total Pressure Score: {pressure['total_pressure_score']}/100")
    print(f"  - Growth Pressure:  {pressure['growth_pressure']:.1f}")
    print(f"  - Share Pressure:   {pressure['share_pressure']:.1f}")
    print(f"  - Tech Pressure:    {pressure['tech_pressure']:.1f}")
    print(f"  - Price Pressure:   {pressure['price_pressure']:.1f}")
    print(f"\nInterpretation: {pressure['interpretation']}")

    # 测试4: 季度趋势
    print("\n1.4 Quarterly Trend")
    print("-" * 80)
    trend = tracker.get_quarterly_trend()
    print(trend[['Quarter', 'TSLA_Deliveries', 'BYD_Deliveries', 'TSLA_Share']].head().to_string(index=False))

    # 测试5: 完整信号
    print("\n1.5 Signal Generation")
    print("-" * 80)
    signal = tracker.generate_signal()
    print(f"Signal Strength: {signal['signal_strength']}/100")
    print(f"Direction: {signal['direction']}")
    print(f"Confidence: {signal['confidence']}")
    print("\nKey Findings:")
    for finding in signal['key_findings']:
        print(f"  • {finding}")

    return signal


def test_ml_model():
    """测试ML模型训练"""
    print_section("TEST 2: ML MODEL TRAINING")

    predictor = EarningsPredictor()

    # 准备训练数据
    print("2.1 Training Data Preparation")
    print("-" * 80)
    X, y = predictor.prepare_training_data()
    print(f"Training samples: {len(X)}")
    print(f"Features: {len(X.columns)}")
    print(f"Feature names: {', '.join(X.columns[:5])}...")

    # 训练模型
    print("\n2.2 Model Training")
    print("-" * 80)
    predictor.train_models(X, y)

    # 保存模型
    print("\n2.3 Saving Models")
    print("-" * 80)
    predictor.save_models()
    print("Models saved successfully!")

    return predictor


def test_earnings_predictor(competitor_signal):
    """测试Engine 6: Earnings Predictor"""
    print_section("TEST 3: EARNINGS PREDICTOR (ENGINE 6)")

    engine = EarningsPredictorEngine('TSLA')

    # 准备引擎输出
    engine_outputs = {
        'competitor': competitor_signal,
        # 其他引擎暂时使用模拟数据
    }

    # 测试1: 信号整合
    print("3.1 Signal Integration")
    print("-" * 80)
    integrated = engine.integrate_engine_signals(engine_outputs)
    print(f"Integrated {len(integrated['engines'])} engine signals:")
    for engine_name in integrated['engines'].keys():
        print(f"  • {engine_name}")

    # 测试2: 生成预测
    print("\n3.2 Earnings Prediction")
    print("-" * 80)
    prediction = engine.generate_earnings_prediction(engine_outputs)

    print(f"Quarter: {prediction['quarter']}")
    print(f"\nPredictions:")
    print(f"  EPS: ${prediction['predictions']['eps']['predicted']:.2f} "
          f"(Consensus: ${prediction['predictions']['eps']['market_consensus']:.2f})")
    print(f"  Revenue: ${prediction['predictions']['revenue']['predicted']:,.0f}M "
          f"(Consensus: ${prediction['predictions']['revenue']['market_consensus']:,.0f}M)")
    print(f"  Margin: {prediction['predictions']['gross_margin']['predicted']:.1f}% "
          f"(Consensus: {prediction['predictions']['gross_margin']['market_consensus']:.1f}%)")

    print(f"\nSurprise Probabilities:")
    print(f"  EPS Beat Probability: {prediction['predictions']['eps']['surprise_probability']*100:.0f}%")
    print(f"  Revenue Beat Probability: {prediction['predictions']['revenue']['surprise_probability']*100:.0f}%")

    # 测试3: 综合评估
    print("\n3.3 Integrated Assessment")
    print("-" * 80)
    assessment = prediction['integrated_assessment']
    print(f"Outlook: {assessment['outlook']}")
    print(f"Confidence: {assessment['confidence']}")
    print(f"Signal Consistency: {assessment['signal_consistency']}")
    print(f"\nKey Drivers:")
    for driver in assessment['key_drivers']:
        print(f"  • {driver}")

    # 测试4: 交易建议
    print("\n3.4 Trading Implications")
    print("-" * 80)
    trading = prediction['trading_implications']
    print(f"EPS Surprise: {trading['eps_surprise_pct']:+.1f}%")
    print(f"Revenue Surprise: {trading['revenue_surprise_pct']:+.1f}%")
    print(f"Estimated Price Move: {trading['estimated_price_move_pct']:+.1f}%")
    print(f"\nRecommendations:")
    print(f"  Options Strategy: {trading['option_strategy']}")
    print(f"  Stock Position: {trading['stock_position_guidance']}")
    print(f"  Risk Level: {trading['risk_level']}")

    # 测试5: 风险因素
    print("\n3.5 Risk Factors")
    print("-" * 80)
    if prediction['risk_factors']:
        for risk in prediction['risk_factors']:
            print(f"{risk['factor']} (Severity: {risk['severity']})")
            print(f"  {risk['description']}")
    else:
        print("No significant risk factors identified.")

    # 测试6: 完整报告
    print_section("TEST 4: FULL REPORT GENERATION")
    report = engine.generate_report(engine_outputs)
    print(report)

    return prediction


def test_integration():
    """集成测试"""
    print_section("INTEGRATION TEST: FULL PIPELINE")

    print("Running full pipeline: Competitor → ML Model → Earnings Prediction")
    print("-" * 80)

    # Step 1: 竞品追踪
    print("\n[1/3] Running Competitor Tracker...")
    tracker = CompetitorTracker('TSLA')
    competitor_signal = tracker.generate_signal()
    print(f"✓ Competitor signal generated: {competitor_signal['signal_strength']}/100")

    # Step 2: ML模型
    print("\n[2/3] Loading/Training ML Models...")
    try:
        predictor = EarningsPredictor()
        predictor.load_models()
        print("✓ Pre-trained models loaded")
    except FileNotFoundError:
        print("  No pre-trained models found. Training new models...")
        X, y = predictor.prepare_training_data()
        predictor.train_models(X, y)
        predictor.save_models()
        print("✓ New models trained and saved")

    # Step 3: 财报预测
    print("\n[3/3] Generating Earnings Prediction...")
    engine = EarningsPredictorEngine('TSLA')
    engine_outputs = {'competitor': competitor_signal}
    prediction = engine.generate_earnings_prediction(engine_outputs)
    print(f"✓ Prediction generated for {prediction['quarter']}")

    print("\n" + "-" * 80)
    print("PIPELINE SUMMARY")
    print("-" * 80)
    print(f"Competitive Pressure: {competitor_signal['signal_strength']}/100")
    print(f"Predicted EPS: ${prediction['predictions']['eps']['predicted']:.2f}")
    print(f"Beat Probability: {prediction['predictions']['eps']['surprise_probability']*100:.0f}%")
    print(f"Outlook: {prediction['integrated_assessment']['outlook']}")
    print(f"Est. Price Move: {prediction['trading_implications']['estimated_price_move_pct']:+.1f}%")

    print("\n" + "="*80)
    print(" ALL TESTS PASSED ✓")
    print("="*80)


def main():
    """主测试函数"""
    print("\n")
    print("█" * 80)
    print("█" + " " * 78 + "█")
    print("█" + " " * 20 + "INTELLIGENCE ENGINE v10.0 TEST SUITE" + " " * 21 + "█")
    print("█" + " " * 78 + "█")
    print("█" * 80)

    try:
        # 测试1: Competitor Tracker
        competitor_signal = test_competitor_tracker()

        # 测试2: ML Model
        predictor = test_ml_model()

        # 测试3: Earnings Predictor
        prediction = test_earnings_predictor(competitor_signal)

        # 集成测试
        test_integration()

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
