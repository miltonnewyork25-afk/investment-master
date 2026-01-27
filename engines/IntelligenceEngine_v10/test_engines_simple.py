#!/usr/bin/env python3
"""
简化测试脚本：仅测试Engine 5 & 6
绕过其他引擎的依赖问题
"""

import sys
import os
import pandas as pd
import numpy as np

# 直接导入需要的模块，避免__init__.py的依赖问题
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'engines'))

# 直接导入文件而不是通过__init__.py
import importlib.util

def load_module(module_name, file_path):
    """动态加载模块"""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def print_section(title):
    """打印分节标题"""
    print("\n" + "="*80)
    print(f" {title}")
    print("="*80 + "\n")


def test_competitor_tracker():
    """测试Engine 5: Competitor Tracker"""
    print_section("TEST 1: COMPETITOR TRACKER (ENGINE 5)")

    # 动态加载
    competitor_module = load_module(
        'competitor_tracker',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/competitor_tracker.py'
    )
    CompetitorTracker = competitor_module.CompetitorTracker

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

    # 测试4: 完整信号
    print("\n1.4 Signal Generation")
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
    print_section("TEST 2: ML MODEL TRAINING (Simplified - Random Forest only)")

    ml_module = load_module(
        'ml_model_simple',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/ml_model_simple.py'
    )
    EarningsPredictor = ml_module.EarningsPredictor

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

    # 加载earnings_predictor需要先加载ml_model_simple
    ml_module = load_module(
        'ml_model_simple',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/ml_model_simple.py'
    )

    # 将ml_model模块添加到sys.modules，这样earnings_predictor可以import它
    sys.modules['ml_model'] = ml_module

    earnings_module = load_module(
        'earnings_predictor',
        '/Users/milton/投资大师/IntelligenceEngine_v10/engines/earnings_predictor.py'
    )
    EarningsPredictorEngine = earnings_module.EarningsPredictorEngine

    engine = EarningsPredictorEngine('TSLA')

    # 准备引擎输出
    engine_outputs = {
        'competitor': competitor_signal,
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

    # 测试5: 完整报告
    print_section("TEST 4: FULL REPORT GENERATION")
    report = engine.generate_report(engine_outputs)
    print(report)

    return prediction


def main():
    """主测试函数"""
    print("\n")
    print("█" * 80)
    print("█" + " " * 78 + "█")
    print("█" + " " * 15 + "INTELLIGENCE ENGINE v10.0 - ENGINE 5 & 6 TEST" + " " * 16 + "█")
    print("█" + " " * 78 + "█")
    print("█" * 80)

    try:
        # 测试1: Competitor Tracker
        competitor_signal = test_competitor_tracker()

        # 测试2: ML Model
        predictor = test_ml_model()

        # 测试3: Earnings Predictor
        prediction = test_earnings_predictor(competitor_signal)

        print("\n" + "="*80)
        print(" ALL TESTS PASSED ✓")
        print("="*80)

        print("\n" + "="*80)
        print(" SUMMARY")
        print("="*80)
        print(f"\n✓ Engine 5 (Competitor Tracker) - Working")
        print(f"  - Competitive Pressure: {competitor_signal['signal_strength']}/100")
        print(f"  - Direction: {competitor_signal['direction']}")

        print(f"\n✓ Engine 6 (Earnings Predictor) - Working")
        print(f"  - Quarter: {prediction['quarter']}")
        print(f"  - Predicted EPS: ${prediction['predictions']['eps']['predicted']:.2f}")
        print(f"  - Beat Probability: {prediction['predictions']['eps']['surprise_probability']*100:.0f}%")
        print(f"  - Outlook: {prediction['integrated_assessment']['outlook']}")

        print(f"\n✓ ML Models Trained and Saved")
        print(f"  - Location: /Users/milton/投资大师/IntelligenceEngine_v10/data/models/")

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
