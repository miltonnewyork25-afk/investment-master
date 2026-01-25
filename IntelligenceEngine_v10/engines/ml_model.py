"""
ML Model for Earnings Prediction
机器学习模型：整合5引擎信号预测财报
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple, Optional
from datetime import datetime
import pickle
import logging
from pathlib import Path

# ML libraries
try:
    from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
    from sklearn.preprocessing import StandardScaler
    from sklearn.model_selection import train_test_split, cross_val_score
    from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
    import xgboost as xgb
except ImportError:
    print("Warning: ML libraries not installed. Install with: pip install scikit-learn xgboost")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EarningsPredictor:
    """财报预测器：整合多引擎信号"""

    def __init__(self, model_path: Optional[str] = None):
        """
        初始化预测器

        Args:
            model_path: 模型保存路径
        """
        self.model_eps = None
        self.model_revenue = None
        self.model_margin = None
        self.scaler = StandardScaler()
        self.feature_names = []
        self.model_path = model_path or "/Users/milton/投资大师/IntelligenceEngine_v10/data/models"
        self.logger = logger

        # 创建模型目录
        Path(self.model_path).mkdir(parents=True, exist_ok=True)

    def create_features(self, engine_signals: Dict) -> pd.DataFrame:
        """
        从5引擎信号创建特征

        Args:
            engine_signals: 包含所有引擎信号的字典

        Returns:
            特征DataFrame
        """
        features = {}

        # Engine 1: Insider Trading
        insider = engine_signals.get('insider_trading', {})
        features['insider_buy_ratio'] = insider.get('buy_ratio', 0.5)
        features['insider_net_value'] = insider.get('net_value_millions', 0)
        features['insider_signal_strength'] = insider.get('signal_strength', 0)

        # Engine 2: Social Sentiment
        sentiment = engine_signals.get('sentiment', {})
        features['sentiment_score'] = sentiment.get('composite_score', 0)
        features['sentiment_volume'] = sentiment.get('total_volume', 0)
        features['sentiment_momentum'] = sentiment.get('momentum', 0)

        # Engine 3: Supply Chain
        supply_chain = engine_signals.get('supply_chain', {})
        features['supplier_signal'] = supply_chain.get('signal_strength', 0)
        features['china_demand'] = supply_chain.get('china_demand_index', 0)
        features['inventory_health'] = supply_chain.get('inventory_health', 0)

        # Engine 4: Options Flow
        options = engine_signals.get('options', {})
        features['put_call_ratio'] = options.get('put_call_ratio', 1.0)
        features['unusual_activity'] = options.get('unusual_activity_score', 0)
        features['smart_money_signal'] = options.get('smart_money_signal', 0)

        # Engine 5: Competitor Tracker
        competitor = engine_signals.get('competitor', {})
        features['competitive_pressure'] = competitor.get('signal_strength', 50)
        features['market_share_trend'] = 1 if competitor.get('metrics', {}).get('market_share_trend') == 'stable/growing' else -1
        features['threat_growth_rate'] = competitor.get('metrics', {}).get('threat_growth_rate', 0)

        # 时间特征
        features['quarter'] = datetime.now().month // 3
        features['year'] = datetime.now().year

        df = pd.DataFrame([features])

        self.logger.info(f"Created {len(features)} features from engine signals")
        return df

    def prepare_training_data(self) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        准备训练数据（过去20个季度）

        Returns:
            (X, y) 特征和目标变量
        """
        # 模拟历史数据（实际应用中应从数据库加载）
        # 这里使用2020-2025的实际Tesla数据作为参考

        historical_data = [
            # 2020 quarters
            {'quarter': 1, 'year': 2020, 'eps': 0.23, 'revenue': 5985, 'margin': 16.0,
             'insider_buy_ratio': 0.6, 'insider_net_value': 2.5, 'insider_signal_strength': 65,
             'sentiment_score': 0.45, 'sentiment_volume': 50000, 'sentiment_momentum': 0.1,
             'supplier_signal': 55, 'china_demand': 60, 'inventory_health': 70,
             'put_call_ratio': 0.9, 'unusual_activity': 45, 'smart_money_signal': 55,
             'competitive_pressure': 40, 'market_share_trend': 1, 'threat_growth_rate': 0.2},

            {'quarter': 2, 'year': 2020, 'eps': 0.44, 'revenue': 6036, 'margin': 21.0,
             'insider_buy_ratio': 0.55, 'insider_net_value': 1.8, 'insider_signal_strength': 60,
             'sentiment_score': 0.50, 'sentiment_volume': 55000, 'sentiment_momentum': 0.15,
             'supplier_signal': 60, 'china_demand': 65, 'inventory_health': 72,
             'put_call_ratio': 0.85, 'unusual_activity': 50, 'smart_money_signal': 60,
             'competitive_pressure': 42, 'market_share_trend': 1, 'threat_growth_rate': 0.22},

            {'quarter': 3, 'year': 2020, 'eps': 0.76, 'revenue': 8771, 'margin': 23.5,
             'insider_buy_ratio': 0.7, 'insider_net_value': 3.2, 'insider_signal_strength': 70,
             'sentiment_score': 0.55, 'sentiment_volume': 60000, 'sentiment_momentum': 0.2,
             'supplier_signal': 65, 'china_demand': 70, 'inventory_health': 75,
             'put_call_ratio': 0.8, 'unusual_activity': 55, 'smart_money_signal': 65,
             'competitive_pressure': 38, 'market_share_trend': 1, 'threat_growth_rate': 0.18},

            {'quarter': 4, 'year': 2020, 'eps': 0.80, 'revenue': 10744, 'margin': 24.1,
             'insider_buy_ratio': 0.65, 'insider_net_value': 2.9, 'insider_signal_strength': 68,
             'sentiment_score': 0.60, 'sentiment_volume': 65000, 'sentiment_momentum': 0.25,
             'supplier_signal': 70, 'china_demand': 75, 'inventory_health': 78,
             'put_call_ratio': 0.75, 'unusual_activity': 60, 'smart_money_signal': 70,
             'competitive_pressure': 35, 'market_share_trend': 1, 'threat_growth_rate': 0.15},

            # 2021 quarters
            {'quarter': 1, 'year': 2021, 'eps': 0.93, 'revenue': 10389, 'margin': 26.5,
             'insider_buy_ratio': 0.75, 'insider_net_value': 4.1, 'insider_signal_strength': 75,
             'sentiment_score': 0.65, 'sentiment_volume': 70000, 'sentiment_momentum': 0.3,
             'supplier_signal': 72, 'china_demand': 80, 'inventory_health': 80,
             'put_call_ratio': 0.7, 'unusual_activity': 65, 'smart_money_signal': 75,
             'competitive_pressure': 45, 'market_share_trend': 1, 'threat_growth_rate': 0.25},

            {'quarter': 2, 'year': 2021, 'eps': 1.45, 'revenue': 11958, 'margin': 28.4,
             'insider_buy_ratio': 0.72, 'insider_net_value': 3.8, 'insider_signal_strength': 73,
             'sentiment_score': 0.68, 'sentiment_volume': 75000, 'sentiment_momentum': 0.32,
             'supplier_signal': 75, 'china_demand': 82, 'inventory_health': 82,
             'put_call_ratio': 0.68, 'unusual_activity': 68, 'smart_money_signal': 77,
             'competitive_pressure': 48, 'market_share_trend': 1, 'threat_growth_rate': 0.28},

            {'quarter': 3, 'year': 2021, 'eps': 1.86, 'revenue': 13757, 'margin': 30.5,
             'insider_buy_ratio': 0.8, 'insider_net_value': 5.5, 'insider_signal_strength': 80,
             'sentiment_score': 0.70, 'sentiment_volume': 80000, 'sentiment_momentum': 0.35,
             'supplier_signal': 78, 'china_demand': 85, 'inventory_health': 85,
             'put_call_ratio': 0.65, 'unusual_activity': 72, 'smart_money_signal': 80,
             'competitive_pressure': 50, 'market_share_trend': 1, 'threat_growth_rate': 0.30},

            {'quarter': 4, 'year': 2021, 'eps': 2.54, 'revenue': 17719, 'margin': 27.4,
             'insider_buy_ratio': 0.78, 'insider_net_value': 5.2, 'insider_signal_strength': 78,
             'sentiment_score': 0.72, 'sentiment_volume': 82000, 'sentiment_momentum': 0.38,
             'supplier_signal': 80, 'china_demand': 88, 'inventory_health': 87,
             'put_call_ratio': 0.63, 'unusual_activity': 75, 'smart_money_signal': 82,
             'competitive_pressure': 52, 'market_share_trend': 1, 'threat_growth_rate': 0.32},

            # 2022 quarters
            {'quarter': 1, 'year': 2022, 'eps': 3.22, 'revenue': 18756, 'margin': 29.1,
             'insider_buy_ratio': 0.7, 'insider_net_value': 4.5, 'insider_signal_strength': 72,
             'sentiment_score': 0.68, 'sentiment_volume': 78000, 'sentiment_momentum': 0.3,
             'supplier_signal': 75, 'china_demand': 70, 'inventory_health': 75,
             'put_call_ratio': 0.7, 'unusual_activity': 70, 'smart_money_signal': 75,
             'competitive_pressure': 55, 'market_share_trend': 1, 'threat_growth_rate': 0.35},

            {'quarter': 2, 'year': 2022, 'eps': 2.27, 'revenue': 16934, 'margin': 26.2,
             'insider_buy_ratio': 0.65, 'insider_net_value': 3.2, 'insider_signal_strength': 65,
             'sentiment_score': 0.55, 'sentiment_volume': 70000, 'sentiment_momentum': 0.15,
             'supplier_signal': 65, 'china_demand': 55, 'inventory_health': 68,
             'put_call_ratio': 0.85, 'unusual_activity': 60, 'smart_money_signal': 65,
             'competitive_pressure': 58, 'market_share_trend': 1, 'threat_growth_rate': 0.38},

            {'quarter': 3, 'year': 2022, 'eps': 1.05, 'revenue': 21454, 'margin': 25.1,
             'insider_buy_ratio': 0.6, 'insider_net_value': 2.8, 'insider_signal_strength': 60,
             'sentiment_score': 0.50, 'sentiment_volume': 75000, 'sentiment_momentum': 0.1,
             'supplier_signal': 70, 'china_demand': 72, 'inventory_health': 70,
             'put_call_ratio': 0.9, 'unusual_activity': 58, 'smart_money_signal': 62,
             'competitive_pressure': 60, 'market_share_trend': 1, 'threat_growth_rate': 0.40},

            {'quarter': 4, 'year': 2022, 'eps': 1.19, 'revenue': 24318, 'margin': 23.8,
             'insider_buy_ratio': 0.68, 'insider_net_value': 3.5, 'insider_signal_strength': 68,
             'sentiment_score': 0.52, 'sentiment_volume': 77000, 'sentiment_momentum': 0.12,
             'supplier_signal': 72, 'china_demand': 75, 'inventory_health': 72,
             'put_call_ratio': 0.88, 'unusual_activity': 62, 'smart_money_signal': 68,
             'competitive_pressure': 62, 'market_share_trend': 1, 'threat_growth_rate': 0.42},

            # 2023 quarters
            {'quarter': 1, 'year': 2023, 'eps': 0.85, 'revenue': 23329, 'margin': 19.3,
             'insider_buy_ratio': 0.55, 'insider_net_value': 2.2, 'insider_signal_strength': 55,
             'sentiment_score': 0.45, 'sentiment_volume': 72000, 'sentiment_momentum': 0.05,
             'supplier_signal': 68, 'china_demand': 68, 'inventory_health': 65,
             'put_call_ratio': 0.95, 'unusual_activity': 55, 'smart_money_signal': 58,
             'competitive_pressure': 65, 'market_share_trend': -1, 'threat_growth_rate': 0.45},

            {'quarter': 2, 'year': 2023, 'eps': 0.91, 'revenue': 24927, 'margin': 18.2,
             'insider_buy_ratio': 0.58, 'insider_net_value': 2.5, 'insider_signal_strength': 58,
             'sentiment_score': 0.48, 'sentiment_volume': 74000, 'sentiment_momentum': 0.08,
             'supplier_signal': 70, 'china_demand': 70, 'inventory_health': 68,
             'put_call_ratio': 0.92, 'unusual_activity': 58, 'smart_money_signal': 62,
             'competitive_pressure': 68, 'market_share_trend': -1, 'threat_growth_rate': 0.48},

            {'quarter': 3, 'year': 2023, 'eps': 0.66, 'revenue': 23350, 'margin': 17.9,
             'insider_buy_ratio': 0.52, 'insider_net_value': 1.8, 'insider_signal_strength': 52,
             'sentiment_score': 0.42, 'sentiment_volume': 70000, 'sentiment_momentum': 0.02,
             'supplier_signal': 65, 'china_demand': 65, 'inventory_health': 62,
             'put_call_ratio': 1.0, 'unusual_activity': 52, 'smart_money_signal': 55,
             'competitive_pressure': 70, 'market_share_trend': -1, 'threat_growth_rate': 0.50},

            {'quarter': 4, 'year': 2023, 'eps': 0.71, 'revenue': 25167, 'margin': 17.6,
             'insider_buy_ratio': 0.6, 'insider_net_value': 2.8, 'insider_signal_strength': 62,
             'sentiment_score': 0.50, 'sentiment_volume': 76000, 'sentiment_momentum': 0.15,
             'supplier_signal': 68, 'china_demand': 70, 'inventory_health': 68,
             'put_call_ratio': 0.88, 'unusual_activity': 60, 'smart_money_signal': 65,
             'competitive_pressure': 72, 'market_share_trend': -1, 'threat_growth_rate': 0.52},

            # 2024 quarters
            {'quarter': 1, 'year': 2024, 'eps': 0.45, 'revenue': 21301, 'margin': 17.4,
             'insider_buy_ratio': 0.48, 'insider_net_value': 1.5, 'insider_signal_strength': 50,
             'sentiment_score': 0.38, 'sentiment_volume': 68000, 'sentiment_momentum': -0.05,
             'supplier_signal': 62, 'china_demand': 62, 'inventory_health': 60,
             'put_call_ratio': 1.05, 'unusual_activity': 48, 'smart_money_signal': 52,
             'competitive_pressure': 75, 'market_share_trend': -1, 'threat_growth_rate': 0.55},

            {'quarter': 2, 'year': 2024, 'eps': 0.52, 'revenue': 25500, 'margin': 18.0,
             'insider_buy_ratio': 0.55, 'insider_net_value': 2.0, 'insider_signal_strength': 58,
             'sentiment_score': 0.45, 'sentiment_volume': 72000, 'sentiment_momentum': 0.08,
             'supplier_signal': 68, 'china_demand': 68, 'inventory_health': 66,
             'put_call_ratio': 0.95, 'unusual_activity': 55, 'smart_money_signal': 60,
             'competitive_pressure': 78, 'market_share_trend': -1, 'threat_growth_rate': 0.58},

            {'quarter': 3, 'year': 2024, 'eps': 0.72, 'revenue': 25182, 'margin': 19.8,
             'insider_buy_ratio': 0.62, 'insider_net_value': 3.0, 'insider_signal_strength': 65,
             'sentiment_score': 0.52, 'sentiment_volume': 76000, 'sentiment_momentum': 0.18,
             'supplier_signal': 72, 'china_demand': 72, 'inventory_health': 70,
             'put_call_ratio': 0.85, 'unusual_activity': 62, 'smart_money_signal': 68,
             'competitive_pressure': 75, 'market_share_trend': -1, 'threat_growth_rate': 0.55},

            {'quarter': 4, 'year': 2024, 'eps': 0.73, 'revenue': 25707, 'margin': 16.3,
             'insider_buy_ratio': 0.58, 'insider_net_value': 2.5, 'insider_signal_strength': 60,
             'sentiment_score': 0.48, 'sentiment_volume': 74000, 'sentiment_momentum': 0.12,
             'supplier_signal': 70, 'china_demand': 70, 'inventory_health': 68,
             'put_call_ratio': 0.92, 'unusual_activity': 58, 'smart_money_signal': 65,
             'competitive_pressure': 72, 'market_share_trend': -1, 'threat_growth_rate': 0.52},

            # 2025 quarters (partial)
            {'quarter': 1, 'year': 2025, 'eps': 0.46, 'revenue': 25167, 'margin': 17.4,
             'insider_buy_ratio': 0.52, 'insider_net_value': 1.8, 'insider_signal_strength': 55,
             'sentiment_score': 0.42, 'sentiment_volume': 70000, 'sentiment_momentum': 0.05,
             'supplier_signal': 65, 'china_demand': 65, 'inventory_health': 62,
             'put_call_ratio': 1.0, 'unusual_activity': 52, 'smart_money_signal': 58,
             'competitive_pressure': 68, 'market_share_trend': -1, 'threat_growth_rate': 0.48},
        ]

        df = pd.DataFrame(historical_data)

        # 分离特征和目标
        target_cols = ['eps', 'revenue', 'margin']
        feature_cols = [col for col in df.columns if col not in target_cols]

        X = df[feature_cols]
        y = df[target_cols]

        self.feature_names = feature_cols

        self.logger.info(f"Prepared training data: {len(df)} samples, {len(feature_cols)} features")
        return X, y

    def train_models(self, X: pd.DataFrame, y: pd.DataFrame):
        """
        训练预测模型

        Args:
            X: 特征数据
            y: 目标变量
        """
        # 标准化特征
        X_scaled = self.scaler.fit_transform(X)

        # 分离目标变量
        y_eps = y['eps']
        y_revenue = y['revenue']
        y_margin = y['margin']

        # 训练EPS模型
        self.logger.info("Training EPS model...")
        self.model_eps = xgb.XGBRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=42
        )
        self.model_eps.fit(X_scaled, y_eps)

        # 训练Revenue模型
        self.logger.info("Training Revenue model...")
        self.model_revenue = xgb.XGBRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=42
        )
        self.model_revenue.fit(X_scaled, y_revenue)

        # 训练Margin模型
        self.logger.info("Training Margin model...")
        self.model_margin = RandomForestRegressor(
            n_estimators=100,
            max_depth=5,
            random_state=42
        )
        self.model_margin.fit(X_scaled, y_margin)

        # 评估模型
        self._evaluate_models(X_scaled, y_eps, y_revenue, y_margin)

    def _evaluate_models(self, X_scaled, y_eps, y_revenue, y_margin):
        """评估模型性能"""
        # EPS模型
        eps_pred = self.model_eps.predict(X_scaled)
        eps_r2 = r2_score(y_eps, eps_pred)
        eps_mae = mean_absolute_error(y_eps, eps_pred)

        # Revenue模型
        revenue_pred = self.model_revenue.predict(X_scaled)
        revenue_r2 = r2_score(y_revenue, revenue_pred)
        revenue_mae = mean_absolute_error(y_revenue, revenue_pred)

        # Margin模型
        margin_pred = self.model_margin.predict(X_scaled)
        margin_r2 = r2_score(y_margin, margin_pred)
        margin_mae = mean_absolute_error(y_margin, margin_pred)

        self.logger.info(f"Model Performance:")
        self.logger.info(f"  EPS: R²={eps_r2:.3f}, MAE={eps_mae:.3f}")
        self.logger.info(f"  Revenue: R²={revenue_r2:.3f}, MAE={revenue_mae:.0f}M")
        self.logger.info(f"  Margin: R²={margin_r2:.3f}, MAE={margin_mae:.2f}%")

    def predict(self, engine_signals: Dict) -> Dict:
        """
        预测下季度财报

        Args:
            engine_signals: 引擎信号字典

        Returns:
            预测结果字典
        """
        if not all([self.model_eps, self.model_revenue, self.model_margin]):
            raise ValueError("Models not trained. Call train_models() first.")

        # 创建特征
        X = self.create_features(engine_signals)

        # 确保特征顺序一致
        X = X[self.feature_names]

        # 标准化
        X_scaled = self.scaler.transform(X)

        # 预测
        eps_pred = self.model_eps.predict(X_scaled)[0]
        revenue_pred = self.model_revenue.predict(X_scaled)[0]
        margin_pred = self.model_margin.predict(X_scaled)[0]

        # 计算置信区间（使用历史标准差）
        X_train, y_train = self.prepare_training_data()
        X_train_scaled = self.scaler.transform(X_train)

        eps_train_pred = self.model_eps.predict(X_train_scaled)
        eps_std = np.std(y_train['eps'] - eps_train_pred)

        revenue_train_pred = self.model_revenue.predict(X_train_scaled)
        revenue_std = np.std(y_train['revenue'] - revenue_train_pred)

        margin_train_pred = self.model_margin.predict(X_train_scaled)
        margin_std = np.std(y_train['margin'] - margin_train_pred)

        # 计算surprise概率（相对于市场预期）
        # 假设市场预期（实际应从Bloomberg/FactSet获取）
        market_consensus = {
            'eps': 0.75,  # 市场预期EPS
            'revenue': 26500,  # 市场预期收入（百万）
            'margin': 18.5  # 市场预期毛利率
        }

        eps_surprise_prob = self._calculate_surprise_probability(
            eps_pred, market_consensus['eps'], eps_std
        )
        revenue_surprise_prob = self._calculate_surprise_probability(
            revenue_pred, market_consensus['revenue'], revenue_std
        )

        prediction = {
            'timestamp': datetime.now().isoformat(),
            'quarter': f"Q{(datetime.now().month // 3) + 1} {datetime.now().year}",
            'predictions': {
                'eps': {
                    'predicted': round(eps_pred, 2),
                    'lower_ci': round(eps_pred - 1.96 * eps_std, 2),
                    'upper_ci': round(eps_pred + 1.96 * eps_std, 2),
                    'market_consensus': market_consensus['eps'],
                    'surprise_probability': eps_surprise_prob
                },
                'revenue': {
                    'predicted': round(revenue_pred, 0),
                    'lower_ci': round(revenue_pred - 1.96 * revenue_std, 0),
                    'upper_ci': round(revenue_pred + 1.96 * revenue_std, 0),
                    'market_consensus': market_consensus['revenue'],
                    'surprise_probability': revenue_surprise_prob
                },
                'gross_margin': {
                    'predicted': round(margin_pred, 1),
                    'lower_ci': round(margin_pred - 1.96 * margin_std, 1),
                    'upper_ci': round(margin_pred + 1.96 * margin_std, 1),
                    'market_consensus': market_consensus['margin'],
                    'surprise_probability': 'N/A'  # Margin通常不是surprise焦点
                }
            },
            'feature_importance': self._get_feature_importance(),
            'model_confidence': self._calculate_model_confidence(eps_std, revenue_std)
        }

        self.logger.info(f"Prediction generated: EPS={eps_pred:.2f}, Revenue={revenue_pred:.0f}M")
        return prediction

    def _calculate_surprise_probability(self, predicted: float, consensus: float, std: float) -> float:
        """
        计算beat/miss概率

        Args:
            predicted: 预测值
            consensus: 市场共识
            std: 标准差

        Returns:
            beat概率
        """
        from scipy import stats

        # 计算z-score
        z = (predicted - consensus) / std if std > 0 else 0

        # 计算beat概率
        prob = stats.norm.cdf(z)

        return round(prob, 2)

    def _get_feature_importance(self) -> Dict:
        """获取特征重要性"""
        importance = {}

        if hasattr(self.model_eps, 'feature_importances_'):
            feature_imp = self.model_eps.feature_importances_
            top_features = sorted(
                zip(self.feature_names, feature_imp),
                key=lambda x: x[1],
                reverse=True
            )[:5]

            importance['top_5_features'] = [
                {'feature': feat, 'importance': round(imp, 3)}
                for feat, imp in top_features
            ]

        return importance

    def _calculate_model_confidence(self, eps_std: float, revenue_std: float) -> str:
        """计算模型置信度"""
        # 基于历史误差评估置信度
        if eps_std < 0.15 and revenue_std < 1500:
            return "High"
        elif eps_std < 0.25 and revenue_std < 2500:
            return "Medium"
        else:
            return "Low"

    def save_models(self):
        """保存模型"""
        with open(f"{self.model_path}/eps_model.pkl", 'wb') as f:
            pickle.dump(self.model_eps, f)
        with open(f"{self.model_path}/revenue_model.pkl", 'wb') as f:
            pickle.dump(self.model_revenue, f)
        with open(f"{self.model_path}/margin_model.pkl", 'wb') as f:
            pickle.dump(self.model_margin, f)
        with open(f"{self.model_path}/scaler.pkl", 'wb') as f:
            pickle.dump(self.scaler, f)

        self.logger.info(f"Models saved to {self.model_path}")

    def load_models(self):
        """加载模型"""
        with open(f"{self.model_path}/eps_model.pkl", 'rb') as f:
            self.model_eps = pickle.load(f)
        with open(f"{self.model_path}/revenue_model.pkl", 'rb') as f:
            self.model_revenue = pickle.load(f)
        with open(f"{self.model_path}/margin_model.pkl", 'rb') as f:
            self.model_margin = pickle.load(f)
        with open(f"{self.model_path}/scaler.pkl", 'rb') as f:
            self.scaler = pickle.load(f)

        self.logger.info(f"Models loaded from {self.model_path}")


def main():
    """测试函数"""
    print("\n" + "="*80)
    print("ML MODEL: EARNINGS PREDICTOR TRAINING")
    print("="*80)

    predictor = EarningsPredictor()

    # 准备训练数据
    X, y = predictor.prepare_training_data()
    print(f"\nTraining data: {len(X)} samples")

    # 训练模型
    predictor.train_models(X, y)

    # 保存模型
    predictor.save_models()

    print("\nModels trained and saved successfully!")


if __name__ == '__main__':
    main()
