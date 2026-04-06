#!/usr/bin/env python3
"""
Investment-Specific Uncertainty Manager
=====================================

核心原则: 在投资研究中，不确定性是特征，不是bug
处理数据缺失、分析矛盾、低置信度等投资分析中的常见情况

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import json
import logging
from typing import Dict, List, Optional, Tuple, Union
from enum import Enum
from dataclasses import dataclass
from datetime import datetime, timedelta

class UncertaintyType(Enum):
    """不确定性类型分类"""
    DATA_MISSING = "data_missing"           # 数据缺失
    DATA_CONFLICT = "data_conflict"         # 数据冲突
    ANALYSIS_CONTRADICTION = "contradiction" # 分析矛盾
    LOW_CONFIDENCE = "low_confidence"       # 低置信度
    REGIME_UNCERTAINTY = "regime_change"    # 市场制度不确定性
    CATALYST_TIMING = "catalyst_timing"     # 催化剂时间不确定

class ResolutionStrategy(Enum):
    """不确定性解决策略"""
    FALLBACK_DATA = "fallback_data"         # 备用数据源
    PEER_ESTIMATION = "peer_estimation"     # 同业估算
    SCENARIO_ANALYSIS = "scenario_analysis" # 情景分析
    PROBABILITY_WEIGHTING = "prob_weight"   # 概率加权
    EXPECTATION_GAP = "expectation_gap"     # 预期差分析
    MONITOR_RESOLVE = "monitor_resolve"     # 监控待解决

@dataclass
class UncertaintyEvent:
    """不确定性事件记录"""
    event_id: str
    uncertainty_type: UncertaintyType
    description: str
    confidence_level: float  # 0.0 - 1.0
    impact_on_thesis: str   # high/medium/low
    resolution_strategy: ResolutionStrategy
    fallback_options: List[str]
    created_at: datetime
    resolved_at: Optional[datetime] = None
    resolution_notes: Optional[str] = None

class InvestmentUncertaintyManager:
    """投资分析不确定性管理器"""

    def __init__(self, ticker: str, analysis_session: str):
        self.ticker = ticker
        self.analysis_session = analysis_session
        self.uncertainty_events: List[UncertaintyEvent] = []
        self.confidence_history: List[Tuple[datetime, float]] = []

        # 数据源备用层级
        self.data_fallback_map = {
            'fmp_data': ['yfinance_backup', 'sec_filings', 'peer_estimation'],
            'earnings_data': ['consensus_estimates', 'historical_patterns'],
            'management_guidance': ['peer_analysis', 'analyst_estimates'],
            'market_data': ['alternative_exchanges', 'proxy_instruments'],
            'industry_data': ['trade_associations', 'government_statistics']
        }

        # 投资分析质量阈值
        self.quality_thresholds = {
            'minimum_confidence': 0.3,  # 低于此值需要scenario analysis
            'high_confidence': 0.7,     # 高于此值可以single-point估值
            'contradiction_tolerance': 0.2,  # 矛盾分析的容忍度
            'data_completeness': 0.6    # 数据完整度最低要求
        }

    def handle_data_failure(self, tool_name: str, error_details: str) -> Dict:
        """
        处理数据获取失败

        投资分析中数据缺失≠分析失败，需要智能fallback
        """
        event = UncertaintyEvent(
            event_id=f"data_fail_{tool_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            uncertainty_type=UncertaintyType.DATA_MISSING,
            description=f"Tool {tool_name} failed: {error_details}",
            confidence_level=0.0,  # 完全缺失
            impact_on_thesis="medium",  # 默认中等影响
            resolution_strategy=ResolutionStrategy.FALLBACK_DATA,
            fallback_options=self.data_fallback_map.get(tool_name, []),
            created_at=datetime.now()
        )

        self.uncertainty_events.append(event)

        return {
            "status": "handled",
            "event_id": event.event_id,
            "fallback_options": event.fallback_options,
            "recommended_action": f"Try fallback sources: {', '.join(event.fallback_options[:2])}",
            "impact_assessment": "Analysis can continue with alternative data sources"
        }

    def handle_contradiction(self, analysis_a: str, analysis_b: str,
                           contradiction_severity: float) -> Dict:
        """
        处理分析矛盾

        矛盾信号→预期差机会，不是错误
        """
        if contradiction_severity > self.quality_thresholds['contradiction_tolerance']:
            strategy = ResolutionStrategy.EXPECTATION_GAP
            action = "Explore contradiction as potential expectation gap opportunity"
        else:
            strategy = ResolutionStrategy.PROBABILITY_WEIGHTING
            action = "Use probability weighting to reconcile minor differences"

        event = UncertaintyEvent(
            event_id=f"contradiction_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            uncertainty_type=UncertaintyType.ANALYSIS_CONTRADICTION,
            description=f"Contradiction between: [{analysis_a}] vs [{analysis_b}]",
            confidence_level=1.0 - contradiction_severity,
            impact_on_thesis="high" if contradiction_severity > 0.5 else "medium",
            resolution_strategy=strategy,
            fallback_options=["scenario_analysis", "sensitivity_testing", "peer_comparison"],
            created_at=datetime.now()
        )

        self.uncertainty_events.append(event)

        return {
            "status": "contradiction_identified",
            "event_id": event.event_id,
            "recommended_action": action,
            "expectation_gap_potential": contradiction_severity > 0.3,
            "next_steps": [
                "Identify market consensus position",
                "Map contradiction to different investor types",
                "Assess resolution timeline and catalysts"
            ]
        }

    def handle_low_confidence(self, analysis_component: str,
                            confidence_level: float) -> Dict:
        """
        处理低置信度分析

        低置信度→概率加权，不是分析失败
        """
        if confidence_level < self.quality_thresholds['minimum_confidence']:
            strategy = ResolutionStrategy.SCENARIO_ANALYSIS
            action = "Build multiple scenarios with probability weighting"
        else:
            strategy = ResolutionStrategy.PROBABILITY_WEIGHTING
            action = "Apply confidence weighting to valuation range"

        event = UncertaintyEvent(
            event_id=f"low_conf_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            uncertainty_type=UncertaintyType.LOW_CONFIDENCE,
            description=f"Low confidence in {analysis_component}: {confidence_level:.2f}",
            confidence_level=confidence_level,
            impact_on_thesis="high" if confidence_level < 0.2 else "medium",
            resolution_strategy=strategy,
            fallback_options=["monte_carlo", "sensitivity_analysis", "comparable_anchoring"],
            created_at=datetime.now()
        )

        self.uncertainty_events.append(event)

        return {
            "status": "low_confidence_handled",
            "event_id": event.event_id,
            "confidence_level": confidence_level,
            "recommended_action": action,
            "valuation_impact": "Widen valuation range" if confidence_level < 0.4 else "Standard range",
            "disclosure_required": confidence_level < 0.3
        }

    def assess_overall_analysis_confidence(self) -> Dict:
        """评估整体分析置信度"""
        if not self.uncertainty_events:
            return {"overall_confidence": 0.8, "quality_grade": "A"}

        # 计算置信度加权平均
        total_weight = 0
        weighted_confidence = 0

        for event in self.uncertainty_events:
            if event.resolved_at is None:  # 未解决的不确定性
                weight = 1.0 if event.impact_on_thesis == "high" else 0.5
                total_weight += weight
                weighted_confidence += event.confidence_level * weight

        if total_weight == 0:
            overall_confidence = 0.8
        else:
            overall_confidence = weighted_confidence / total_weight

        # 质量等级评定
        if overall_confidence >= 0.7:
            quality_grade = "A"
            recommendation = "High-confidence analysis, single-point estimate acceptable"
        elif overall_confidence >= 0.5:
            quality_grade = "B"
            recommendation = "Medium confidence, use range estimates"
        elif overall_confidence >= 0.3:
            quality_grade = "C"
            recommendation = "Low confidence, scenario analysis required"
        else:
            quality_grade = "D"
            recommendation = "Very low confidence, analysis incomplete"

        return {
            "overall_confidence": overall_confidence,
            "quality_grade": quality_grade,
            "recommendation": recommendation,
            "active_uncertainties": len([e for e in self.uncertainty_events if e.resolved_at is None]),
            "resolved_uncertainties": len([e for e in self.uncertainty_events if e.resolved_at is not None])
        }

    def generate_uncertainty_disclosure(self) -> str:
        """生成不确定性披露声明"""
        assessment = self.assess_overall_analysis_confidence()

        disclosure_parts = []

        # 整体置信度声明
        confidence_pct = int(assessment["overall_confidence"] * 100)
        disclosure_parts.append(f"分析整体置信度: {confidence_pct}%")

        # 主要不确定性因素
        high_impact_events = [e for e in self.uncertainty_events
                            if e.impact_on_thesis == "high" and e.resolved_at is None]

        if high_impact_events:
            disclosure_parts.append("主要不确定性因素:")
            for event in high_impact_events[:3]:  # 最多展示3个
                disclosure_parts.append(f"- {event.description}")

        # 数据局限性
        missing_data_events = [e for e in self.uncertainty_events
                              if e.uncertainty_type == UncertaintyType.DATA_MISSING]

        if missing_data_events:
            disclosure_parts.append("数据局限性:")
            for event in missing_data_events[:2]:
                disclosure_parts.append(f"- {event.description}")

        # 投资风险提示
        if assessment["overall_confidence"] < 0.5:
            disclosure_parts.append("⚠️ 低置信度分析：投资决策应结合多维度验证")

        return "\n".join(disclosure_parts)

    def save_uncertainty_log(self, file_path: str) -> bool:
        """保存不确定性处理日志"""
        try:
            log_data = {
                "ticker": self.ticker,
                "analysis_session": self.analysis_session,
                "generated_at": datetime.now().isoformat(),
                "overall_assessment": self.assess_overall_analysis_confidence(),
                "uncertainty_events": [
                    {
                        "event_id": event.event_id,
                        "type": event.uncertainty_type.value,
                        "description": event.description,
                        "confidence_level": event.confidence_level,
                        "impact": event.impact_on_thesis,
                        "strategy": event.resolution_strategy.value,
                        "created_at": event.created_at.isoformat(),
                        "resolved_at": event.resolved_at.isoformat() if event.resolved_at else None
                    }
                    for event in self.uncertainty_events
                ]
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(log_data, f, indent=2, ensure_ascii=False)

            return True

        except Exception as e:
            logging.error(f"Failed to save uncertainty log: {e}")
            return False

# 使用示例和测试
if __name__ == "__main__":
    # 创建不确定性管理器
    um = InvestmentUncertaintyManager("AAPL", "2024_Q1_analysis")

    # 模拟数据失败处理
    result1 = um.handle_data_failure("fmp_data", "API rate limit exceeded")
    print("Data failure handling:", result1)

    # 模拟分析矛盾处理
    result2 = um.handle_contradiction(
        "DCF suggests fair value $180",
        "P/E comparison suggests fair value $220",
        0.4
    )
    print("Contradiction handling:", result2)

    # 模拟低置信度处理
    result3 = um.handle_low_confidence("Terminal value estimation", 0.25)
    print("Low confidence handling:", result3)

    # 评估整体分析质量
    assessment = um.assess_overall_analysis_confidence()
    print("Overall assessment:", assessment)

    # 生成披露声明
    disclosure = um.generate_uncertainty_disclosure()
    print("Uncertainty disclosure:")
    print(disclosure)