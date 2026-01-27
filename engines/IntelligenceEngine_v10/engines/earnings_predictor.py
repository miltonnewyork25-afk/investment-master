"""
Engine 6: Earnings Predictor
整合5个引擎信号，使用ML模型预测下季度财报
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import logging

# 导入ML模型
from ml_model import EarningsPredictor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EarningsPredictorEngine:
    """财报预测引擎：整合所有信号源"""

    def __init__(self, ticker: str = 'TSLA'):
        """
        初始化预测引擎

        Args:
            ticker: 股票代码
        """
        self.ticker = ticker
        self.predictor = EarningsPredictor()
        self.logger = logger

        # 尝试加载已训练模型，否则训练新模型
        try:
            self.predictor.load_models()
            self.logger.info("Loaded pre-trained models")
        except FileNotFoundError:
            self.logger.info("No pre-trained models found. Training new models...")
            self._train_models()

    def _train_models(self):
        """训练模型"""
        X, y = self.predictor.prepare_training_data()
        self.predictor.train_models(X, y)
        self.predictor.save_models()

    def integrate_engine_signals(self, engine_outputs: Dict) -> Dict:
        """
        整合5个引擎的信号

        Args:
            engine_outputs: 包含所有引擎输出的字典

        Returns:
            整合后的信号字典
        """
        integrated = {
            'timestamp': datetime.now().isoformat(),
            'ticker': self.ticker,
            'engines': {}
        }

        # Engine 1: Insider Trading
        if 'insider_trading' in engine_outputs:
            insider = engine_outputs['insider_trading']
            integrated['engines']['insider_trading'] = {
                'signal_strength': insider.get('signal_strength', 0),
                'buy_ratio': insider.get('metrics', {}).get('buy_ratio', 0.5),
                'net_value_millions': insider.get('metrics', {}).get('net_transactions_value', 0) / 1_000_000,
                'direction': insider.get('direction', 'neutral')
            }

        # Engine 2: Social Sentiment (需要创建)
        if 'sentiment' in engine_outputs:
            sentiment = engine_outputs['sentiment']
            integrated['engines']['sentiment'] = {
                'composite_score': sentiment.get('signal_strength', 0) / 100,
                'total_volume': sentiment.get('metrics', {}).get('total_mentions', 0),
                'momentum': sentiment.get('metrics', {}).get('momentum', 0)
            }
        else:
            # 模拟数据
            integrated['engines']['sentiment'] = {
                'composite_score': 0.48,
                'total_volume': 74000,
                'momentum': 0.12
            }

        # Engine 3: Supply Chain (需要创建)
        if 'supply_chain' in engine_outputs:
            supply = engine_outputs['supply_chain']
            integrated['engines']['supply_chain'] = {
                'signal_strength': supply.get('signal_strength', 0),
                'china_demand_index': supply.get('metrics', {}).get('china_demand', 0),
                'inventory_health': supply.get('metrics', {}).get('inventory_health', 0)
            }
        else:
            # 模拟数据
            integrated['engines']['supply_chain'] = {
                'signal_strength': 70,
                'china_demand_index': 70,
                'inventory_health': 68
            }

        # Engine 4: Options Flow (需要创建)
        if 'options' in engine_outputs:
            options = engine_outputs['options']
            integrated['engines']['options'] = {
                'put_call_ratio': options.get('metrics', {}).get('put_call_ratio', 1.0),
                'unusual_activity_score': options.get('signal_strength', 0),
                'smart_money_signal': options.get('metrics', {}).get('smart_money_signal', 0)
            }
        else:
            # 模拟数据
            integrated['engines']['options'] = {
                'put_call_ratio': 0.92,
                'unusual_activity_score': 58,
                'smart_money_signal': 65
            }

        # Engine 5: Competitor Tracker
        if 'competitor' in engine_outputs:
            integrated['engines']['competitor'] = engine_outputs['competitor']

        self.logger.info(f"Integrated {len(integrated['engines'])} engine signals")
        return integrated

    def generate_earnings_prediction(self, engine_outputs: Dict) -> Dict:
        """
        生成财报预测

        Args:
            engine_outputs: 引擎输出字典

        Returns:
            财报预测结果
        """
        # 整合信号
        integrated_signals = self.integrate_engine_signals(engine_outputs)

        # 使用ML模型预测
        prediction = self.predictor.predict(integrated_signals['engines'])

        # 添加综合评估
        prediction['integrated_assessment'] = self._assess_prediction(prediction, integrated_signals)

        # 添加交易建议
        prediction['trading_implications'] = self._generate_trading_implications(prediction)

        # 添加风险因素
        prediction['risk_factors'] = self._identify_risk_factors(integrated_signals)

        self.logger.info(f"Generated earnings prediction for {prediction['quarter']}")
        return prediction

    def _assess_prediction(self, prediction: Dict, signals: Dict) -> Dict:
        """
        综合评估预测

        Args:
            prediction: 预测结果
            signals: 整合信号

        Returns:
            评估字典
        """
        eps_pred = prediction['predictions']['eps']
        revenue_pred = prediction['predictions']['revenue']

        # 计算综合surprise概率
        eps_surprise_prob = eps_pred['surprise_probability']
        revenue_surprise_prob = revenue_pred['surprise_probability']

        avg_surprise_prob = (eps_surprise_prob + revenue_surprise_prob) / 2

        # 评估信号一致性
        signal_scores = []
        for engine_name, engine_data in signals['engines'].items():
            if 'signal_strength' in engine_data:
                signal_scores.append(engine_data['signal_strength'])
            elif 'composite_score' in engine_data:
                signal_scores.append(engine_data['composite_score'] * 100)

        avg_signal = np.mean(signal_scores) if signal_scores else 50

        # 综合评级
        if avg_surprise_prob > 0.65 and avg_signal > 60:
            outlook = "Strong Beat Expected"
            confidence = "High"
        elif avg_surprise_prob > 0.55 and avg_signal > 50:
            outlook = "Moderate Beat Expected"
            confidence = "Medium"
        elif avg_surprise_prob > 0.45:
            outlook = "In-Line Expected"
            confidence = "Medium"
        elif avg_surprise_prob > 0.35:
            outlook = "Moderate Miss Expected"
            confidence = "Medium"
        else:
            outlook = "Significant Miss Risk"
            confidence = "High"

        assessment = {
            'outlook': outlook,
            'confidence': confidence,
            'average_surprise_probability': round(avg_surprise_prob, 2),
            'signal_consistency': 'High' if np.std(signal_scores) < 15 else 'Low',
            'key_drivers': self._identify_key_drivers(prediction, signals)
        }

        return assessment

    def _identify_key_drivers(self, prediction: Dict, signals: Dict) -> List[str]:
        """识别关键驱动因素"""
        drivers = []

        # 从特征重要性识别
        if 'feature_importance' in prediction:
            top_features = prediction['feature_importance'].get('top_5_features', [])
            for feature in top_features[:3]:
                feat_name = feature['feature']
                if 'insider' in feat_name:
                    drivers.append("Insider trading activity")
                elif 'sentiment' in feat_name:
                    drivers.append("Social sentiment momentum")
                elif 'competitive' in feat_name:
                    drivers.append("Competitive pressure")
                elif 'supplier' in feat_name or 'china' in feat_name:
                    drivers.append("Supply chain signals")
                elif 'put_call' in feat_name or 'smart_money' in feat_name:
                    drivers.append("Options market activity")

        # 去重
        drivers = list(set(drivers))

        return drivers[:3]  # 返回前3个

    def _generate_trading_implications(self, prediction: Dict) -> Dict:
        """
        生成交易建议

        Args:
            prediction: 预测结果

        Returns:
            交易建议字典
        """
        eps_pred = prediction['predictions']['eps']
        revenue_pred = prediction['predictions']['revenue']

        eps_surprise = eps_pred['predicted'] - eps_pred['market_consensus']
        eps_surprise_pct = (eps_surprise / eps_pred['market_consensus']) * 100

        revenue_surprise = revenue_pred['predicted'] - revenue_pred['market_consensus']
        revenue_surprise_pct = (revenue_surprise / revenue_pred['market_consensus']) * 100

        # 估算财报后股价反应
        # 历史上Tesla EPS每beat 1%，股价平均反应+2-3%
        estimated_move_pct = eps_surprise_pct * 2.5

        # 期权策略建议
        if abs(estimated_move_pct) > 5:
            if estimated_move_pct > 0:
                option_strategy = "Long Call or Call Spread (bullish)"
                stock_position = "Consider long position before earnings"
            else:
                option_strategy = "Long Put or Put Spread (bearish)"
                stock_position = "Consider reducing position or hedging"
        else:
            option_strategy = "Iron Condor or Short Straddle (low volatility expected)"
            stock_position = "Hold current position"

        implications = {
            'eps_surprise_pct': round(eps_surprise_pct, 1),
            'revenue_surprise_pct': round(revenue_surprise_pct, 1),
            'estimated_price_move_pct': round(estimated_move_pct, 1),
            'option_strategy': option_strategy,
            'stock_position_guidance': stock_position,
            'risk_level': 'High' if abs(estimated_move_pct) > 10 else 'Medium' if abs(estimated_move_pct) > 5 else 'Low'
        }

        return implications

    def _identify_risk_factors(self, signals: Dict) -> List[Dict]:
        """
        识别风险因素

        Args:
            signals: 整合信号

        Returns:
            风险因素列表
        """
        risks = []

        # 竞争风险
        if 'competitor' in signals['engines']:
            comp_pressure = signals['engines']['competitor'].get('signal_strength', 0)
            if comp_pressure > 70:
                risks.append({
                    'factor': 'High Competitive Pressure',
                    'severity': 'High',
                    'description': f"Competitive pressure score at {comp_pressure}/100, indicating significant market share threats"
                })

        # 情绪风险
        if 'sentiment' in signals['engines']:
            sentiment_score = signals['engines']['sentiment'].get('composite_score', 0.5)
            if sentiment_score < 0.4:
                risks.append({
                    'factor': 'Negative Social Sentiment',
                    'severity': 'Medium',
                    'description': f"Social sentiment at {sentiment_score:.2f}, below neutral"
                })

        # 供应链风险
        if 'supply_chain' in signals['engines']:
            inventory = signals['engines']['supply_chain'].get('inventory_health', 70)
            if inventory < 60:
                risks.append({
                    'factor': 'Inventory Concerns',
                    'severity': 'Medium',
                    'description': f"Inventory health score at {inventory}/100"
                })

        # 期权市场风险
        if 'options' in signals['engines']:
            put_call = signals['engines']['options'].get('put_call_ratio', 1.0)
            if put_call > 1.2:
                risks.append({
                    'factor': 'Elevated Put/Call Ratio',
                    'severity': 'Medium',
                    'description': f"Put/Call ratio at {put_call:.2f}, indicating bearish positioning"
                })

        return risks

    def generate_report(self, engine_outputs: Dict) -> str:
        """
        生成完整预测报告

        Args:
            engine_outputs: 引擎输出

        Returns:
            格式化报告字符串
        """
        prediction = self.generate_earnings_prediction(engine_outputs)

        report = f"""
{'='*80}
EARNINGS PREDICTION REPORT - {self.ticker}
{'='*80}

Generated: {prediction['timestamp']}
Quarter: {prediction['quarter']}

{'='*80}
PREDICTIONS
{'='*80}

EPS:
  Predicted:        ${prediction['predictions']['eps']['predicted']:.2f}
  Market Consensus: ${prediction['predictions']['eps']['market_consensus']:.2f}
  95% CI:          [${prediction['predictions']['eps']['lower_ci']:.2f}, ${prediction['predictions']['eps']['upper_ci']:.2f}]
  Beat Probability: {prediction['predictions']['eps']['surprise_probability']*100:.0f}%

Revenue:
  Predicted:        ${prediction['predictions']['revenue']['predicted']:,.0f}M
  Market Consensus: ${prediction['predictions']['revenue']['market_consensus']:,.0f}M
  95% CI:          [${prediction['predictions']['revenue']['lower_ci']:,.0f}M, ${prediction['predictions']['revenue']['upper_ci']:,.0f}M]
  Beat Probability: {prediction['predictions']['revenue']['surprise_probability']*100:.0f}%

Gross Margin:
  Predicted:        {prediction['predictions']['gross_margin']['predicted']:.1f}%
  Market Consensus: {prediction['predictions']['gross_margin']['market_consensus']:.1f}%
  95% CI:          [{prediction['predictions']['gross_margin']['lower_ci']:.1f}%, {prediction['predictions']['gross_margin']['upper_ci']:.1f}%]

{'='*80}
INTEGRATED ASSESSMENT
{'='*80}

Outlook:               {prediction['integrated_assessment']['outlook']}
Confidence:            {prediction['integrated_assessment']['confidence']}
Signal Consistency:    {prediction['integrated_assessment']['signal_consistency']}
Avg Surprise Prob:     {prediction['integrated_assessment']['average_surprise_probability']*100:.0f}%

Key Drivers:
"""
        for driver in prediction['integrated_assessment']['key_drivers']:
            report += f"  - {driver}\n"

        report += f"""
{'='*80}
TRADING IMPLICATIONS
{'='*80}

EPS Surprise:          {prediction['trading_implications']['eps_surprise_pct']:+.1f}%
Revenue Surprise:      {prediction['trading_implications']['revenue_surprise_pct']:+.1f}%
Est. Price Move:       {prediction['trading_implications']['estimated_price_move_pct']:+.1f}%

Options Strategy:      {prediction['trading_implications']['option_strategy']}
Stock Position:        {prediction['trading_implications']['stock_position_guidance']}
Risk Level:            {prediction['trading_implications']['risk_level']}

{'='*80}
RISK FACTORS
{'='*80}
"""
        if prediction['risk_factors']:
            for risk in prediction['risk_factors']:
                report += f"""
{risk['factor']} (Severity: {risk['severity']})
  {risk['description']}
"""
        else:
            report += "\nNo significant risk factors identified.\n"

        report += f"""
{'='*80}
FEATURE IMPORTANCE (Top 5)
{'='*80}
"""
        if 'feature_importance' in prediction:
            for feat in prediction['feature_importance'].get('top_5_features', []):
                report += f"  {feat['feature']}: {feat['importance']:.3f}\n"

        report += f"""
{'='*80}
MODEL CONFIDENCE: {prediction['model_confidence']}
{'='*80}
"""

        return report


def main():
    """测试函数"""
    print("\n" + "="*80)
    print("ENGINE 6: EARNINGS PREDICTOR")
    print("="*80)

    # 创建引擎
    engine = EarningsPredictorEngine('TSLA')

    # 模拟引擎输出（实际应从其他引擎获取）
    from competitor_tracker import CompetitorTracker

    competitor_tracker = CompetitorTracker('TSLA')
    competitor_signal = competitor_tracker.generate_signal()

    engine_outputs = {
        'competitor': competitor_signal,
        # 其他引擎的信号会在这里添加
    }

    # 生成预测
    report = engine.generate_report(engine_outputs)

    print(report)


if __name__ == '__main__':
    main()
