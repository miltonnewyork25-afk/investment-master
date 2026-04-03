#!/usr/bin/env python3
"""
Market Regime Detection System
=============================

实时检测市场制度变化，动态调整分析权重和方法论
投资harness必须感知市场环境，而非静态分析框架

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import json
import logging
from typing import Dict, List, Optional, Tuple
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
import asyncio

class MarketRegime(Enum):
    """市场制度类型"""
    BULL_GROWTH = "bull_growth"          # 牛市增长期
    BULL_LATE = "bull_late"              # 牛市后期
    BEAR_EARLY = "bear_early"            # 熊市初期
    BEAR_DEEP = "bear_deep"              # 深度熊市
    CRISIS_MODE = "crisis_mode"          # 危机模式
    RECOVERY_EARLY = "recovery_early"    # 复苏初期
    CONSOLIDATION = "consolidation"      # 整理期
    ROTATION = "rotation"                # 板块轮动期

class RegimeIndicator(Enum):
    """制度变化指标"""
    VOLATILITY_SPIKE = "volatility_spike"        # 波动率突增
    SECTOR_DISPERSION = "sector_dispersion"      # 板块离散度
    CREDIT_SPREAD = "credit_spread"              # 信用利差
    YIELD_CURVE = "yield_curve"                  # 收益率曲线
    SENTIMENT_SHIFT = "sentiment_shift"          # 情绪转向
    FLOW_REVERSAL = "flow_reversal"              # 资金流向逆转
    POLICY_CHANGE = "policy_change"              # 政策变化
    GEOPOLITICAL = "geopolitical"                # 地缘政治

@dataclass
class RegimeSignal:
    """制度变化信号"""
    indicator: RegimeIndicator
    strength: float  # 0.0 - 1.0
    direction: str   # positive/negative/neutral
    timestamp: datetime
    description: str
    data_source: str
    confidence: float  # 0.0 - 1.0

@dataclass
class MarketContext:
    """市场环境上下文"""
    current_regime: MarketRegime
    regime_confidence: float
    regime_start_date: datetime
    key_drivers: List[str]
    volatility_percentile: float
    sector_leadership: Dict[str, float]
    risk_appetite: str  # high/medium/low
    policy_stance: str  # accommodative/neutral/restrictive

class MarketRegimeDetector:
    """市场制度检测器"""

    def __init__(self):
        self.current_regime: Optional[MarketRegime] = None
        self.regime_history: List[Tuple[datetime, MarketRegime, float]] = []
        self.active_signals: List[RegimeSignal] = []
        self.regime_start_time: Optional[datetime] = None

        # 制度变化阈值
        self.regime_thresholds = {
            'volatility_spike': 0.7,      # VIX相对位置
            'credit_stress': 0.6,         # 信用利差扩大
            'sentiment_extreme': 0.8,     # 情绪极值
            'flow_reversal': 0.5,         # 资金流向变化
            'policy_shift': 0.9           # 政策转向权重
        }

        # 分析权重模板
        self.analysis_weights = {
            MarketRegime.CRISIS_MODE: {
                "liquidity": 0.4,
                "quality": 0.4,
                "valuation": 0.2
            },
            MarketRegime.BULL_GROWTH: {
                "growth": 0.5,
                "scalability": 0.3,
                "valuation": 0.2
            },
            MarketRegime.BEAR_DEEP: {
                "survival": 0.4,
                "cash_flow": 0.3,
                "debt_capacity": 0.3
            },
            MarketRegime.RECOVERY_EARLY: {
                "operating_leverage": 0.4,
                "cyclical_position": 0.3,
                "valuation": 0.3
            },
            MarketRegime.ROTATION: {
                "relative_strength": 0.4,
                "sector_dynamics": 0.3,
                "momentum": 0.3
            }
        }

    def add_signal(self, indicator: RegimeIndicator, strength: float,
                   direction: str, description: str, data_source: str,
                   confidence: float = 0.8) -> None:
        """添加制度变化信号"""
        signal = RegimeSignal(
            indicator=indicator,
            strength=strength,
            direction=direction,
            timestamp=datetime.now(),
            description=description,
            data_source=data_source,
            confidence=confidence
        )

        self.active_signals.append(signal)

        # 保持最近24小时的信号
        cutoff_time = datetime.now() - timedelta(hours=24)
        self.active_signals = [s for s in self.active_signals if s.timestamp > cutoff_time]

    def detect_volatility_regime(self, vix_level: float, vix_percentile: float) -> Optional[RegimeSignal]:
        """检测波动率制度"""
        if vix_percentile > 0.9:  # 极高波动率
            return RegimeSignal(
                indicator=RegimeIndicator.VOLATILITY_SPIKE,
                strength=min(vix_percentile, 1.0),
                direction="negative",
                timestamp=datetime.now(),
                description=f"VIX at {vix_level:.1f} ({vix_percentile:.0%} percentile)",
                data_source="market_data",
                confidence=0.9
            )
        elif vix_percentile < 0.1:  # 极低波动率
            return RegimeSignal(
                indicator=RegimeIndicator.VOLATILITY_SPIKE,
                strength=1.0 - vix_percentile,
                direction="positive",
                timestamp=datetime.now(),
                description=f"VIX at {vix_level:.1f} (complacency warning)",
                data_source="market_data",
                confidence=0.7
            )
        return None

    def detect_sector_rotation(self, sector_performance: Dict[str, float]) -> Optional[RegimeSignal]:
        """检测板块轮动"""
        if not sector_performance or len(sector_performance) < 5:
            return None

        performances = list(sector_performance.values())
        sector_dispersion = max(performances) - min(performances)

        if sector_dispersion > 0.15:  # 15%的板块间差异
            winner = max(sector_performance, key=sector_performance.get)
            loser = min(sector_performance, key=sector_performance.get)

            return RegimeSignal(
                indicator=RegimeIndicator.SECTOR_DISPERSION,
                strength=min(sector_dispersion / 0.3, 1.0),  # 标准化到30%差异
                direction="rotation",
                timestamp=datetime.now(),
                description=f"Sector rotation: {winner} leading (+{sector_performance[winner]:.1%}), {loser} lagging ({sector_performance[loser]:.1%})",
                data_source="sector_data",
                confidence=0.8
            )
        return None

    def detect_credit_stress(self, credit_spread: float, spread_percentile: float) -> Optional[RegimeSignal]:
        """检测信用压力"""
        if spread_percentile > 0.8:  # 信用利差扩大
            stress_level = "high" if spread_percentile > 0.95 else "elevated"
            return RegimeSignal(
                indicator=RegimeIndicator.CREDIT_SPREAD,
                strength=spread_percentile,
                direction="negative",
                timestamp=datetime.now(),
                description=f"Credit stress {stress_level}: spread at {credit_spread:.0f}bps ({spread_percentile:.0%} percentile)",
                data_source="bond_data",
                confidence=0.85
            )
        return None

    def assess_current_regime(self) -> MarketContext:
        """评估当前市场制度"""
        # 收集最近信号权重
        signal_weights = {}
        for signal in self.active_signals:
            weight = signal.strength * signal.confidence
            signal_weights[signal.indicator] = signal_weights.get(signal.indicator, 0) + weight

        # 制度评分矩阵
        regime_scores = {regime: 0.0 for regime in MarketRegime}

        # 根据信号计算制度概率
        if signal_weights.get(RegimeIndicator.VOLATILITY_SPIKE, 0) > 0.6:
            if signal_weights.get(RegimeIndicator.CREDIT_SPREAD, 0) > 0.5:
                regime_scores[MarketRegime.CRISIS_MODE] += 0.8
                regime_scores[MarketRegime.BEAR_EARLY] += 0.6
            else:
                regime_scores[MarketRegime.BEAR_EARLY] += 0.7

        if signal_weights.get(RegimeIndicator.SECTOR_DISPERSION, 0) > 0.4:
            regime_scores[MarketRegime.ROTATION] += 0.6

        # 如果没有强烈信号，默认为整理期
        max_score = max(regime_scores.values()) if regime_scores else 0
        if max_score < 0.3:
            regime_scores[MarketRegime.CONSOLIDATION] = 0.5

        # 确定最可能的制度
        best_regime = max(regime_scores, key=regime_scores.get)
        confidence = regime_scores[best_regime]

        # 检查制度是否发生变化
        if self.current_regime != best_regime and confidence > 0.4:
            self.regime_history.append((datetime.now(), self.current_regime, confidence))
            self.current_regime = best_regime
            self.regime_start_time = datetime.now()

        # 构建市场上下文
        return MarketContext(
            current_regime=best_regime,
            regime_confidence=confidence,
            regime_start_date=self.regime_start_time or datetime.now(),
            key_drivers=[signal.description for signal in self.active_signals[-3:]],
            volatility_percentile=self._get_latest_volatility_percentile(),
            sector_leadership=self._get_sector_leadership(),
            risk_appetite=self._assess_risk_appetite(),
            policy_stance="neutral"  # TODO: 集成政策检测
        )

    def get_analysis_weights_for_regime(self, regime: Optional[MarketRegime] = None) -> Dict[str, float]:
        """获取当前制度下的分析权重"""
        target_regime = regime or self.current_regime or MarketRegime.CONSOLIDATION
        return self.analysis_weights.get(target_regime, {
            "balanced": 0.33,
            "growth": 0.33,
            "valuation": 0.34
        })

    def should_adjust_methodology(self, current_context: MarketContext) -> Dict[str, str]:
        """判断是否需要调整分析方法论"""
        adjustments = {}

        if current_context.current_regime == MarketRegime.CRISIS_MODE:
            adjustments.update({
                "valuation_method": "liquidation_value_weighted",
                "forecast_horizon": "shortened_to_2_years",
                "risk_premium": "elevated_15_20_percent",
                "peer_comparison": "stress_tested_survivors_only"
            })

        elif current_context.current_regime == MarketRegime.BULL_LATE:
            adjustments.update({
                "valuation_method": "normalized_earnings_base",
                "forecast_horizon": "standard_5_years",
                "risk_premium": "below_historical_average",
                "red_team_intensity": "elevated_skepticism"
            })

        elif current_context.current_regime == MarketRegime.ROTATION:
            adjustments.update({
                "peer_comparison": "sector_relative_mandatory",
                "catalyst_analysis": "sector_rotation_drivers",
                "technical_analysis": "relative_strength_required"
            })

        return adjustments

    def _get_latest_volatility_percentile(self) -> float:
        """获取最新波动率百分位"""
        vol_signals = [s for s in self.active_signals if s.indicator == RegimeIndicator.VOLATILITY_SPIKE]
        return vol_signals[-1].strength if vol_signals else 0.5

    def _get_sector_leadership(self) -> Dict[str, float]:
        """获取板块领导力"""
        # TODO: 实际实现需要连接市场数据
        return {
            "technology": 0.7,
            "healthcare": 0.3,
            "financials": -0.2,
            "energy": -0.5
        }

    def _assess_risk_appetite(self) -> str:
        """评估市场风险偏好"""
        recent_signals = self.active_signals[-5:]  # 最近5个信号

        negative_signals = sum(1 for s in recent_signals if s.direction == "negative")
        positive_signals = sum(1 for s in recent_signals if s.direction == "positive")

        if negative_signals > positive_signals * 2:
            return "low"
        elif positive_signals > negative_signals * 2:
            return "high"
        else:
            return "medium"

    def generate_regime_report(self) -> str:
        """生成制度分析报告"""
        context = self.assess_current_regime()
        adjustments = self.should_adjust_methodology(context)
        weights = self.get_analysis_weights_for_regime()

        report_parts = [
            f"## 市场制度分析 ({datetime.now().strftime('%Y-%m-%d %H:%M')})",
            f"",
            f"**当前制度**: {context.current_regime.value.replace('_', ' ').title()}",
            f"**置信度**: {context.regime_confidence:.1%}",
            f"**制度持续时间**: {(datetime.now() - context.regime_start_date).days}天",
            f"**风险偏好**: {context.risk_appetite.title()}",
            f"",
            f"**主要驱动因素**:",
        ]

        for driver in context.key_drivers:
            report_parts.append(f"- {driver}")

        report_parts.extend([
            f"",
            f"**推荐分析权重调整**:"
        ])

        for factor, weight in weights.items():
            report_parts.append(f"- {factor.replace('_', ' ').title()}: {weight:.0%}")

        if adjustments:
            report_parts.extend([
                f"",
                f"**方法论调整建议**:"
            ])
            for method, adjustment in adjustments.items():
                report_parts.append(f"- {method.replace('_', ' ').title()}: {adjustment}")

        return "\n".join(report_parts)

    def save_regime_context(self, file_path: str) -> bool:
        """保存制度上下文到文件"""
        try:
            context = self.assess_current_regime()

            context_data = {
                "generated_at": datetime.now().isoformat(),
                "market_context": asdict(context),
                "analysis_weights": self.get_analysis_weights_for_regime(),
                "methodology_adjustments": self.should_adjust_methodology(context),
                "active_signals": [
                    {
                        "indicator": signal.indicator.value,
                        "strength": signal.strength,
                        "direction": signal.direction,
                        "timestamp": signal.timestamp.isoformat(),
                        "description": signal.description,
                        "confidence": signal.confidence
                    }
                    for signal in self.active_signals
                ],
                "regime_history": [
                    {
                        "timestamp": timestamp.isoformat(),
                        "regime": regime.value,
                        "confidence": confidence
                    }
                    for timestamp, regime, confidence in self.regime_history
                ]
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(context_data, f, indent=2, ensure_ascii=False)

            return True

        except Exception as e:
            logging.error(f"Failed to save regime context: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建制度检测器
    detector = MarketRegimeDetector()

    # 添加一些模拟信号
    detector.add_signal(
        RegimeIndicator.VOLATILITY_SPIKE,
        0.8,
        "negative",
        "VIX spiked to 35 (90th percentile)",
        "market_data"
    )

    detector.add_signal(
        RegimeIndicator.CREDIT_SPREAD,
        0.6,
        "negative",
        "Investment grade spreads widened 50bps",
        "bond_data"
    )

    # 评估制度
    context = detector.assess_current_regime()
    print(f"Current regime: {context.current_regime.value}")
    print(f"Confidence: {context.regime_confidence:.1%}")

    # 生成报告
    report = detector.generate_regime_report()
    print(report)