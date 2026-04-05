#!/usr/bin/env python3
"""
Adaptive Quality Assessment System
==================================

自适应质量标准：从固定门控到动态优化
根据公司特征、市场环境、历史成功模式动态调整质量标准

Version: 1.0
Author: 投资大师 Framework v19.9+ Phase 3-4
"""

import json
import logging
import statistics
from typing import Dict, List, Optional, Tuple
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta

class QualityDimension(Enum):
    """质量维度"""
    DATA_INTEGRITY = "data_integrity"         # 数据完整性
    ANALYSIS_DEPTH = "analysis_depth"         # 分析深度
    REASONING_RIGOR = "reasoning_rigor"       # 推理严谨性
    EVIDENCE_SUPPORT = "evidence_support"     # 证据支撑
    RISK_COVERAGE = "risk_coverage"          # 风险覆盖
    VALUATION_CONSISTENCY = "val_consistency" # 估值一致性
    NARRATIVE_COHERENCE = "narrative_coherence" # 叙事连贯性
    ACTIONABLE_INSIGHTS = "actionable_insights" # 可执行洞见
    UNCERTAINTY_HANDLING = "uncertainty_handling" # 不确定性处理
    COMPLIANCE_ADHERENCE = "compliance"       # 合规遵循

class CompanyTier(Enum):
    """公司层级"""
    MEGA_CAP = "mega_cap"          # >$500B
    LARGE_CAP = "large_cap"        # $50-500B
    MID_CAP = "mid_cap"            # $10-50B
    SMALL_CAP = "small_cap"        # $1-10B
    MICRO_CAP = "micro_cap"        # <$1B

class AnalysisComplexity(Enum):
    """分析复杂度"""
    SIMPLE = 1           # 简单业务模式
    MODERATE = 2         # 中等复杂度
    COMPLEX = 3          # 复杂多元化
    VERY_COMPLEX = 4     # 极高复杂度
    PARADIGM_SHIFT = 5   # 范式变革期

@dataclass
class QualityStandard:
    """质量标准"""
    dimension: QualityDimension
    threshold: float          # 最低门槛 0-10
    target: float            # 目标水平 0-10
    weight: float            # 权重 0-1
    adaptive_factor: float   # 自适应因子 0.5-1.5
    context_modifiers: Dict[str, float]  # 上下文修正

@dataclass
class QualityContext:
    """质量评估上下文"""
    ticker: str
    company_tier: CompanyTier
    industry: str
    analysis_complexity: AnalysisComplexity
    market_regime: str
    business_maturity: str   # startup/growth/mature/decline
    analyst_coverage: int
    data_availability: str   # high/medium/low
    regulatory_scrutiny: str # high/medium/low
    analysis_purpose: str    # investment_decision/monitoring/research

@dataclass
class QualityMetric:
    """质量度量"""
    dimension: QualityDimension
    raw_score: float         # 原始分数
    adjusted_score: float    # 调整后分数
    threshold_met: bool      # 是否达到门槛
    target_met: bool        # 是否达到目标
    improvement_suggestions: List[str]

class AdaptiveQualityAssessor:
    """自适应质量评估器"""

    def __init__(self):
        # 基础质量标准模板
        self.base_standards = self._initialize_base_standards()

        # 历史质量数据
        self.quality_history: List[Dict] = []
        self.success_patterns: Dict[str, List[float]] = {}  # context -> scores
        self.failure_patterns: Dict[str, List[float]] = {}

        # 学习参数
        self.learning_rate = 0.1
        self.adaptation_window = 30  # 天

    def _initialize_base_standards(self) -> Dict[QualityDimension, QualityStandard]:
        """初始化基础质量标准"""
        standards = {}

        # 数据完整性
        standards[QualityDimension.DATA_INTEGRITY] = QualityStandard(
            dimension=QualityDimension.DATA_INTEGRITY,
            threshold=6.0,
            target=8.0,
            weight=0.15,
            adaptive_factor=1.0,
            context_modifiers={
                "mega_cap": 1.1,    # 大公司数据要求更高
                "small_cap": 0.8,   # 小公司数据可能不完整
                "high_data": 1.2,   # 高数据可得性
                "low_data": 0.7     # 低数据可得性
            }
        )

        # 分析深度
        standards[QualityDimension.ANALYSIS_DEPTH] = QualityStandard(
            dimension=QualityDimension.ANALYSIS_DEPTH,
            threshold=7.0,
            target=8.5,
            weight=0.20,
            adaptive_factor=1.0,
            context_modifiers={
                "simple": 0.8,      # 简单业务降低要求
                "complex": 1.2,     # 复杂业务提高要求
                "paradigm_shift": 1.3,  # 范式变革最高要求
                "investment_decision": 1.2,  # 投资决策高要求
                "monitoring": 0.9   # 监控分析可降低
            }
        )

        # 推理严谨性
        standards[QualityDimension.REASONING_RIGOR] = QualityStandard(
            dimension=QualityDimension.REASONING_RIGOR,
            threshold=6.5,
            target=8.0,
            weight=0.15,
            adaptive_factor=1.0,
            context_modifiers={
                "healthcare": 1.2,  # 医疗行业推理要求高
                "technology": 1.1,  # 科技行业逻辑要求高
                "mature": 0.9,      # 成熟业务可降低
                "startup": 0.8      # 初创企业证据有限
            }
        )

        # 证据支撑
        standards[QualityDimension.EVIDENCE_SUPPORT] = QualityStandard(
            dimension=QualityDimension.EVIDENCE_SUPPORT,
            threshold=6.0,
            target=8.0,
            weight=0.12,
            adaptive_factor=1.0,
            context_modifiers={
                "high_coverage": 1.1,   # 高分析师覆盖
                "low_coverage": 0.8,    # 低分析师覆盖
                "regulated": 1.2        # 监管行业要求更高
            }
        )

        # 风险覆盖
        standards[QualityDimension.RISK_COVERAGE] = QualityStandard(
            dimension=QualityDimension.RISK_COVERAGE,
            threshold=7.0,
            target=8.5,
            weight=0.12,
            adaptive_factor=1.0,
            context_modifiers={
                "crisis_mode": 1.3,     # 危机时风险覆盖最重要
                "bear_market": 1.2,     # 熊市提高风险要求
                "bull_market": 0.9,     # 牛市可适当降低
                "high_volatility": 1.2  # 高波动性行业
            }
        )

        # 估值一致性
        standards[QualityDimension.VALUATION_CONSISTENCY] = QualityStandard(
            dimension=QualityDimension.VALUATION_CONSISTENCY,
            threshold=6.5,
            target=8.0,
            weight=0.10,
            adaptive_factor=1.0,
            context_modifiers={
                "mega_cap": 1.1,        # 大公司估值要求更严
                "growth": 0.9,          # 成长期估值可能分散
                "mature": 1.1           # 成熟期估值应该收敛
            }
        )

        # 叙事连贯性
        standards[QualityDimension.NARRATIVE_COHERENCE] = QualityStandard(
            dimension=QualityDimension.NARRATIVE_COHERENCE,
            threshold=6.0,
            target=7.5,
            weight=0.08,
            adaptive_factor=1.0,
            context_modifiers={
                "complex": 1.2,         # 复杂业务叙事更重要
                "simple": 0.8           # 简单业务降低要求
            }
        )

        # 可执行洞见
        standards[QualityDimension.ACTIONABLE_INSIGHTS] = QualityStandard(
            dimension=QualityDimension.ACTIONABLE_INSIGHTS,
            threshold=6.5,
            target=8.0,
            weight=0.08,
            adaptive_factor=1.0,
            context_modifiers={
                "investment_decision": 1.2,  # 投资决策需要行动指南
                "research": 0.8             # 纯研究可降低
            }
        )

        return standards

    def adapt_standards_to_context(self, context: QualityContext) -> Dict[QualityDimension, QualityStandard]:
        """根据上下文调整质量标准"""
        adapted_standards = {}

        for dimension, base_standard in self.base_standards.items():
            # 复制基础标准
            adapted = QualityStandard(
                dimension=dimension,
                threshold=base_standard.threshold,
                target=base_standard.target,
                weight=base_standard.weight,
                adaptive_factor=base_standard.adaptive_factor,
                context_modifiers=base_standard.context_modifiers.copy()
            )

            # 应用上下文修正
            context_factor = 1.0

            # 公司层级修正
            if context.company_tier.value in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[context.company_tier.value]

            # 复杂度修正
            if context.analysis_complexity.name.lower() in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[context.analysis_complexity.name.lower()]

            # 行业修正
            if context.industry.lower() in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[context.industry.lower()]

            # 数据可得性修正
            data_key = f"{context.data_availability}_data"
            if data_key in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[data_key]

            # 分析目的修正
            if context.analysis_purpose in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[context.analysis_purpose]

            # 市场制度修正
            if context.market_regime in adapted.context_modifiers:
                context_factor *= adapted.context_modifiers[context.market_regime]

            # 应用历史学习调整
            historical_adjustment = self._get_historical_adjustment(dimension, context)
            context_factor *= historical_adjustment

            # 更新标准
            adapted.threshold *= context_factor
            adapted.target *= context_factor
            adapted.adaptive_factor = context_factor

            # 确保阈值在合理范围内
            adapted.threshold = max(3.0, min(9.0, adapted.threshold))
            adapted.target = max(5.0, min(10.0, adapted.target))

            adapted_standards[dimension] = adapted

        return adapted_standards

    def _get_historical_adjustment(self, dimension: QualityDimension, context: QualityContext) -> float:
        """基于历史数据调整标准"""
        # 构建上下文键
        context_key = f"{context.company_tier.value}_{context.industry}_{context.analysis_complexity.value}"

        # 查找历史成功模式
        if context_key in self.success_patterns and dimension.value in self.success_patterns[context_key]:
            success_scores = self.success_patterns[context_key][dimension.value]
            if len(success_scores) >= 3:
                avg_success_score = statistics.mean(success_scores)
                # 如果历史成功分数普遍较低，降低标准
                if avg_success_score < 6.0:
                    return 0.9
                elif avg_success_score > 8.5:
                    return 1.1

        # 查找历史失败模式
        if context_key in self.failure_patterns and dimension.value in self.failure_patterns[context_key]:
            failure_scores = self.failure_patterns[context_key][dimension.value]
            if len(failure_scores) >= 3:
                avg_failure_score = statistics.mean(failure_scores)
                # 如果失败案例在某个维度分数较高，说明该维度标准需要提高
                if avg_failure_score > 7.0:
                    return 1.1

        return 1.0  # 默认不调整

    def assess_quality(self, analysis_data: Dict, context: QualityContext) -> Dict:
        """评估分析质量"""
        # 获取适应性标准
        adapted_standards = self.adapt_standards_to_context(context)

        # 执行各维度评估
        quality_metrics = {}
        for dimension, standard in adapted_standards.items():
            metric = self._assess_dimension(dimension, analysis_data, standard, context)
            quality_metrics[dimension] = metric

        # 计算综合分数
        overall_assessment = self._calculate_overall_assessment(quality_metrics, adapted_standards)

        # 生成改进建议
        improvement_plan = self._generate_improvement_plan(quality_metrics, context)

        # 记录评估历史
        self._record_quality_assessment(context, quality_metrics, overall_assessment)

        return {
            "timestamp": datetime.now().isoformat(),
            "context": asdict(context),
            "overall_assessment": overall_assessment,
            "dimension_scores": {
                dim.value: {
                    "raw_score": metric.raw_score,
                    "adjusted_score": metric.adjusted_score,
                    "threshold": adapted_standards[dim].threshold,
                    "target": adapted_standards[dim].target,
                    "threshold_met": metric.threshold_met,
                    "target_met": metric.target_met
                }
                for dim, metric in quality_metrics.items()
            },
            "improvement_plan": improvement_plan,
            "adaptive_adjustments": {
                dim.value: standard.adaptive_factor
                for dim, standard in adapted_standards.items()
            }
        }

    def _assess_dimension(self, dimension: QualityDimension, analysis_data: Dict,
                         standard: QualityStandard, context: QualityContext) -> QualityMetric:
        """评估单个维度"""
        raw_score = self._calculate_dimension_score(dimension, analysis_data, context)
        adjusted_score = raw_score * standard.adaptive_factor

        threshold_met = adjusted_score >= standard.threshold
        target_met = adjusted_score >= standard.target

        suggestions = []
        if not threshold_met:
            suggestions.extend(self._get_threshold_improvement_suggestions(dimension))
        elif not target_met:
            suggestions.extend(self._get_target_improvement_suggestions(dimension))

        return QualityMetric(
            dimension=dimension,
            raw_score=raw_score,
            adjusted_score=adjusted_score,
            threshold_met=threshold_met,
            target_met=target_met,
            improvement_suggestions=suggestions
        )

    def _calculate_dimension_score(self, dimension: QualityDimension,
                                 analysis_data: Dict, context: QualityContext) -> float:
        """计算维度分数"""
        if dimension == QualityDimension.DATA_INTEGRITY:
            return self._assess_data_integrity(analysis_data)
        elif dimension == QualityDimension.ANALYSIS_DEPTH:
            return self._assess_analysis_depth(analysis_data)
        elif dimension == QualityDimension.REASONING_RIGOR:
            return self._assess_reasoning_rigor(analysis_data)
        elif dimension == QualityDimension.EVIDENCE_SUPPORT:
            return self._assess_evidence_support(analysis_data)
        elif dimension == QualityDimension.RISK_COVERAGE:
            return self._assess_risk_coverage(analysis_data)
        elif dimension == QualityDimension.VALUATION_CONSISTENCY:
            return self._assess_valuation_consistency(analysis_data)
        elif dimension == QualityDimension.NARRATIVE_COHERENCE:
            return self._assess_narrative_coherence(analysis_data)
        elif dimension == QualityDimension.ACTIONABLE_INSIGHTS:
            return self._assess_actionable_insights(analysis_data)
        elif dimension == QualityDimension.UNCERTAINTY_HANDLING:
            return self._assess_uncertainty_handling(analysis_data)
        elif dimension == QualityDimension.COMPLIANCE_ADHERENCE:
            return self._assess_compliance_adherence(analysis_data)
        else:
            return 5.0  # 默认分数

    def _assess_data_integrity(self, data: Dict) -> float:
        """评估数据完整性"""
        score = 5.0  # 基础分

        # 检查DM密度
        dm_density = data.get("dm_density", 0)
        if dm_density >= 1.5:
            score += 2.0
        elif dm_density >= 1.0:
            score += 1.0
        elif dm_density < 0.5:
            score -= 2.0

        # 检查数据源多样性
        data_sources = data.get("data_sources", [])
        if len(data_sources) >= 3:
            score += 1.5
        elif len(data_sources) >= 2:
            score += 0.5

        # 检查数据时效性
        outdated_data_ratio = data.get("outdated_data_ratio", 0)
        if outdated_data_ratio < 0.1:
            score += 1.0
        elif outdated_data_ratio > 0.3:
            score -= 1.0

        return max(0, min(10, score))

    def _assess_analysis_depth(self, data: Dict) -> float:
        """评估分析深度"""
        score = 5.0

        # 字符数指标
        char_count = data.get("character_count", 0)
        if char_count >= 200000:
            score += 2.0
        elif char_count >= 100000:
            score += 1.0
        elif char_count < 50000:
            score -= 2.0

        # 分析维度覆盖
        covered_dimensions = data.get("analysis_dimensions", [])
        expected_dimensions = ["business", "competitive", "financial", "valuation", "risks"]
        coverage_ratio = len(set(covered_dimensions) & set(expected_dimensions)) / len(expected_dimensions)
        score += coverage_ratio * 2.0

        # 因果密度
        causal_density = data.get("causal_density", 0)
        if causal_density >= 8.0:
            score += 2.0
        elif causal_density >= 5.0:
            score += 1.0
        elif causal_density < 3.0:
            score -= 1.0

        return max(0, min(10, score))

    def _assess_reasoning_rigor(self, data: Dict) -> float:
        """评估推理严谨性"""
        score = 5.0

        # 逻辑链完整性
        logic_chains = data.get("logic_chains_count", 0)
        if logic_chains >= 20:
            score += 2.0
        elif logic_chains >= 10:
            score += 1.0

        # 假设明确性
        explicit_assumptions = data.get("explicit_assumptions", 0)
        if explicit_assumptions >= 5:
            score += 1.5
        elif explicit_assumptions >= 3:
            score += 0.5

        # 反面论证
        contrarian_arguments = data.get("contrarian_arguments", 0)
        if contrarian_arguments >= 3:
            score += 1.5
        elif contrarian_arguments >= 1:
            score += 0.5

        return max(0, min(10, score))

    def _assess_evidence_support(self, data: Dict) -> float:
        """评估证据支撑"""
        score = 5.0

        # 量化证据比例
        quantitative_evidence_ratio = data.get("quantitative_evidence_ratio", 0)
        if quantitative_evidence_ratio >= 0.7:
            score += 2.0
        elif quantitative_evidence_ratio >= 0.5:
            score += 1.0

        # 一手资料比例
        primary_source_ratio = data.get("primary_source_ratio", 0)
        if primary_source_ratio >= 0.6:
            score += 1.5
        elif primary_source_ratio >= 0.4:
            score += 0.5

        return max(0, min(10, score))

    def _assess_risk_coverage(self, data: Dict) -> float:
        """评估风险覆盖"""
        score = 5.0

        # 风险类型覆盖
        risk_types = data.get("risk_types_covered", [])
        expected_risks = ["market", "operational", "financial", "regulatory", "competitive"]
        coverage_ratio = len(set(risk_types) & set(expected_risks)) / len(expected_risks)
        score += coverage_ratio * 2.5

        # 风险量化程度
        quantified_risks_ratio = data.get("quantified_risks_ratio", 0)
        if quantified_risks_ratio >= 0.7:
            score += 1.5
        elif quantified_risks_ratio >= 0.5:
            score += 0.5

        return max(0, min(10, score))

    def _assess_valuation_consistency(self, data: Dict) -> float:
        """评估估值一致性"""
        score = 5.0

        # 估值方法数量
        valuation_methods = data.get("valuation_methods", [])
        if len(valuation_methods) >= 3:
            score += 1.5
        elif len(valuation_methods) >= 2:
            score += 0.5

        # 估值离散度
        valuation_dispersion = data.get("valuation_dispersion", 1.0)
        if valuation_dispersion <= 0.2:
            score += 2.0
        elif valuation_dispersion <= 0.3:
            score += 1.0
        elif valuation_dispersion > 0.5:
            score -= 1.0

        return max(0, min(10, score))

    def _assess_narrative_coherence(self, data: Dict) -> float:
        """评估叙事连贯性"""
        score = 7.0  # 基础较高分，难以量化

        # 检查逻辑一致性
        logical_inconsistencies = data.get("logical_inconsistencies", 0)
        score -= logical_inconsistencies * 0.5

        # 检查结论支撑度
        unsupported_conclusions = data.get("unsupported_conclusions", 0)
        score -= unsupported_conclusions * 0.3

        return max(0, min(10, score))

    def _assess_actionable_insights(self, data: Dict) -> float:
        """评估可执行洞见"""
        score = 5.0

        # 具体建议数量
        actionable_recommendations = data.get("actionable_recommendations", 0)
        if actionable_recommendations >= 5:
            score += 2.0
        elif actionable_recommendations >= 3:
            score += 1.0

        # 催化剂识别
        identified_catalysts = data.get("identified_catalysts", 0)
        if identified_catalysts >= 3:
            score += 1.5
        elif identified_catalysts >= 1:
            score += 0.5

        return max(0, min(10, score))

    def _assess_uncertainty_handling(self, data: Dict) -> float:
        """评估不确定性处理"""
        score = 5.0

        # 不确定性明确标注
        uncertainty_indicators = data.get("uncertainty_indicators", 0)
        if uncertainty_indicators >= 10:
            score += 1.5
        elif uncertainty_indicators >= 5:
            score += 1.0

        # 情景分析
        scenario_analyses = data.get("scenario_analyses", 0)
        if scenario_analyses >= 3:
            score += 2.0
        elif scenario_analyses >= 1:
            score += 1.0

        return max(0, min(10, score))

    def _assess_compliance_adherence(self, data: Dict) -> float:
        """评估合规遵循"""
        compliance_score = data.get("compliance_score", 50)
        # 将0-100分转换为0-10分
        return compliance_score / 10.0

    def _calculate_overall_assessment(self, metrics: Dict[QualityDimension, QualityMetric],
                                    standards: Dict[QualityDimension, QualityStandard]) -> Dict:
        """计算综合评估"""
        weighted_score = 0.0
        total_weight = 0.0
        thresholds_met = 0
        targets_met = 0

        for dimension, metric in metrics.items():
            weight = standards[dimension].weight
            weighted_score += metric.adjusted_score * weight
            total_weight += weight

            if metric.threshold_met:
                thresholds_met += 1
            if metric.target_met:
                targets_met += 1

        overall_score = weighted_score / total_weight if total_weight > 0 else 0
        threshold_pass_rate = thresholds_met / len(metrics)
        target_pass_rate = targets_met / len(metrics)

        # 确定整体质量等级
        if overall_score >= 8.5 and threshold_pass_rate >= 0.9:
            grade = "A"
            status = "EXCELLENT"
        elif overall_score >= 7.5 and threshold_pass_rate >= 0.8:
            grade = "B"
            status = "GOOD"
        elif overall_score >= 6.5 and threshold_pass_rate >= 0.7:
            grade = "C"
            status = "ACCEPTABLE"
        elif overall_score >= 5.5:
            grade = "D"
            status = "BELOW_STANDARD"
        else:
            grade = "F"
            status = "FAIL"

        return {
            "overall_score": overall_score,
            "grade": grade,
            "status": status,
            "threshold_pass_rate": threshold_pass_rate,
            "target_pass_rate": target_pass_rate,
            "dimensions_passed": thresholds_met,
            "dimensions_total": len(metrics),
            "recommendation": self._get_overall_recommendation(status, overall_score)
        }

    def _generate_improvement_plan(self, metrics: Dict[QualityDimension, QualityMetric],
                                 context: QualityContext) -> Dict:
        """生成改进计划"""
        # 识别最需要改进的维度
        improvement_priorities = []
        for dimension, metric in metrics.items():
            if not metric.threshold_met:
                priority = "HIGH"
                gap = self.base_standards[dimension].threshold - metric.adjusted_score
            elif not metric.target_met:
                priority = "MEDIUM"
                gap = self.base_standards[dimension].target - metric.adjusted_score
            else:
                continue

            improvement_priorities.append({
                "dimension": dimension.value,
                "priority": priority,
                "current_score": metric.adjusted_score,
                "gap": gap,
                "suggestions": metric.improvement_suggestions
            })

        # 按优先级和差距排序
        improvement_priorities.sort(key=lambda x: (x["priority"] == "HIGH", x["gap"]), reverse=True)

        return {
            "priorities": improvement_priorities[:5],  # Top 5
            "quick_wins": self._identify_quick_wins(metrics),
            "long_term_goals": self._identify_long_term_goals(metrics),
            "context_specific_advice": self._get_context_specific_advice(context, metrics)
        }

    def _get_threshold_improvement_suggestions(self, dimension: QualityDimension) -> List[str]:
        """获取门槛改进建议"""
        suggestions_map = {
            QualityDimension.DATA_INTEGRITY: [
                "增加DM锚点标注，目标≥1.0/千字",
                "验证数据源可靠性，移除过期数据",
                "添加多个独立数据源交叉验证"
            ],
            QualityDimension.ANALYSIS_DEPTH: [
                "扩展分析维度，确保覆盖业务、竞争、财务、风险",
                "增加因果推理链，每个关键判断提供逻辑支撑",
                "深入探讨核心业务驱动因素"
            ],
            QualityDimension.REASONING_RIGOR: [
                "明确关键假设，提供假设合理性论证",
                "增加反面论证，考虑不利情况",
                "构建完整逻辑链：事实→推理→结论"
            ]
        }
        return suggestions_map.get(dimension, ["提升该维度分析质量"])

    def _get_target_improvement_suggestions(self, dimension: QualityDimension) -> List[str]:
        """获取目标改进建议"""
        suggestions_map = {
            QualityDimension.VALUATION_CONSISTENCY: [
                "使用多种估值方法交叉验证",
                "分析估值方法间差异原因",
                "提供估值区间而非单点估计"
            ],
            QualityDimension.RISK_COVERAGE: [
                "构建风险矩阵，量化风险概率和影响",
                "识别尾部风险和黑天鹅事件",
                "提供风险缓解策略"
            ]
        }
        return suggestions_map.get(dimension, ["向卓越水平提升"])

    def _identify_quick_wins(self, metrics: Dict[QualityDimension, QualityMetric]) -> List[str]:
        """识别快速改进点"""
        quick_wins = []
        for dimension, metric in metrics.items():
            if not metric.threshold_met and metric.adjusted_score >= metric.raw_score * 0.9:
                quick_wins.append(f"轻微提升{dimension.value}即可达标")
        return quick_wins

    def _identify_long_term_goals(self, metrics: Dict[QualityDimension, QualityMetric]) -> List[str]:
        """识别长期目标"""
        long_term = []
        for dimension, metric in metrics.items():
            if metric.threshold_met and not metric.target_met:
                long_term.append(f"提升{dimension.value}至卓越水平")
        return long_term

    def _get_context_specific_advice(self, context: QualityContext,
                                   metrics: Dict[QualityDimension, QualityMetric]) -> List[str]:
        """获取上下文特定建议"""
        advice = []

        if context.analysis_complexity == AnalysisComplexity.PARADIGM_SHIFT:
            advice.append("范式变革期：重点关注不确定性处理和情景分析")

        if context.company_tier == CompanyTier.MEGA_CAP:
            advice.append("大市值公司：提高数据完整性和估值一致性标准")

        if context.data_availability == "low":
            advice.append("低数据可得性：加强定性分析和行业对比")

        return advice

    def _get_overall_recommendation(self, status: str, score: float) -> str:
        """获取整体建议"""
        if status == "EXCELLENT":
            return "分析质量优秀，可发布"
        elif status == "GOOD":
            return "分析质量良好，建议小幅改进后发布"
        elif status == "ACCEPTABLE":
            return "分析质量可接受，建议改进关键不足后发布"
        elif status == "BELOW_STANDARD":
            return "分析质量低于标准，需要重大改进"
        else:
            return "分析质量不合格，禁止发布"

    def _record_quality_assessment(self, context: QualityContext,
                                 metrics: Dict[QualityDimension, QualityMetric],
                                 overall_assessment: Dict) -> None:
        """记录质量评估历史"""
        record = {
            "timestamp": datetime.now().isoformat(),
            "context": asdict(context),
            "scores": {dim.value: metric.adjusted_score for dim, metric in metrics.items()},
            "overall_score": overall_assessment["overall_score"],
            "grade": overall_assessment["grade"]
        }

        self.quality_history.append(record)

    def learn_from_outcome(self, context: QualityContext, quality_scores: Dict[str, float],
                          outcome: str) -> None:
        """从结果中学习"""
        context_key = f"{context.company_tier.value}_{context.industry}_{context.analysis_complexity.value}"

        if outcome in ["success", "good"]:
            if context_key not in self.success_patterns:
                self.success_patterns[context_key] = {}
            for dimension, score in quality_scores.items():
                if dimension not in self.success_patterns[context_key]:
                    self.success_patterns[context_key][dimension] = []
                self.success_patterns[context_key][dimension].append(score)

        elif outcome in ["failure", "poor"]:
            if context_key not in self.failure_patterns:
                self.failure_patterns[context_key] = {}
            for dimension, score in quality_scores.items():
                if dimension not in self.failure_patterns[context_key]:
                    self.failure_patterns[context_key][dimension] = []
                self.failure_patterns[context_key][dimension].append(score)

        # 清理过期数据（保持最近100个记录）
        for pattern_dict in [self.success_patterns, self.failure_patterns]:
            for context_key in pattern_dict:
                for dimension in pattern_dict[context_key]:
                    if len(pattern_dict[context_key][dimension]) > 100:
                        pattern_dict[context_key][dimension] = pattern_dict[context_key][dimension][-100:]

    def get_quality_insights(self) -> Dict:
        """获取质量洞见"""
        if not self.quality_history:
            return {"error": "No quality history available"}

        recent_assessments = [
            record for record in self.quality_history
            if (datetime.now() - datetime.fromisoformat(record["timestamp"])).days <= 30
        ]

        if not recent_assessments:
            return {"error": "No recent assessments available"}

        insights = {
            "total_assessments": len(self.quality_history),
            "recent_assessments": len(recent_assessments),
            "average_score_trend": self._calculate_score_trend(recent_assessments),
            "dimension_performance": self._analyze_dimension_performance(recent_assessments),
            "adaptation_effectiveness": self._measure_adaptation_effectiveness()
        }

        return insights

    def _calculate_score_trend(self, assessments: List[Dict]) -> Dict:
        """计算分数趋势"""
        if len(assessments) < 2:
            return {"trend": "insufficient_data"}

        scores = [record["overall_score"] for record in assessments]
        recent_avg = statistics.mean(scores[-10:]) if len(scores) >= 10 else statistics.mean(scores)
        early_avg = statistics.mean(scores[:10]) if len(scores) >= 10 else statistics.mean(scores[:-5])

        trend = "improving" if recent_avg > early_avg else "declining" if recent_avg < early_avg else "stable"

        return {
            "trend": trend,
            "recent_average": recent_avg,
            "early_average": early_avg,
            "improvement": recent_avg - early_avg
        }

    def _analyze_dimension_performance(self, assessments: List[Dict]) -> Dict:
        """分析维度表现"""
        dimension_scores = {}

        for record in assessments:
            for dimension, score in record["scores"].items():
                if dimension not in dimension_scores:
                    dimension_scores[dimension] = []
                dimension_scores[dimension].append(score)

        performance = {}
        for dimension, scores in dimension_scores.items():
            performance[dimension] = {
                "average": statistics.mean(scores),
                "std_dev": statistics.stdev(scores) if len(scores) > 1 else 0,
                "min": min(scores),
                "max": max(scores),
                "count": len(scores)
            }

        return performance

    def _measure_adaptation_effectiveness(self) -> Dict:
        """测量自适应效果"""
        if len(self.quality_history) < 10:
            return {"status": "insufficient_data"}

        # 比较自适应前后的标准差
        early_scores = [record["overall_score"] for record in self.quality_history[:10]]
        recent_scores = [record["overall_score"] for record in self.quality_history[-10:]]

        early_std = statistics.stdev(early_scores) if len(early_scores) > 1 else 0
        recent_std = statistics.stdev(recent_scores) if len(recent_scores) > 1 else 0

        return {
            "status": "measured",
            "early_std_dev": early_std,
            "recent_std_dev": recent_std,
            "consistency_improvement": early_std - recent_std,
            "adaptation_working": recent_std < early_std
        }

    def save_adaptive_state(self, file_path: str) -> bool:
        """保存自适应状态"""
        try:
            state_data = {
                "quality_history_count": len(self.quality_history),
                "success_patterns": self.success_patterns,
                "failure_patterns": self.failure_patterns,
                "base_standards": {
                    dim.value: asdict(standard) for dim, standard in self.base_standards.items()
                },
                "generated_at": datetime.now().isoformat()
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(state_data, f, indent=2, ensure_ascii=False, default=str)

            return True

        except Exception as e:
            logging.error(f"Failed to save adaptive state: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建自适应质量评估器
    assessor = AdaptiveQualityAssessor()

    # 创建评估上下文
    context = QualityContext(
        ticker="AAPL",
        company_tier=CompanyTier.MEGA_CAP,
        industry="technology",
        analysis_complexity=AnalysisComplexity.MODERATE,
        market_regime="bull_growth",
        business_maturity="mature",
        analyst_coverage=35,
        data_availability="high",
        regulatory_scrutiny="medium",
        analysis_purpose="investment_decision"
    )

    # 模拟分析数据
    analysis_data = {
        "dm_density": 1.2,
        "character_count": 150000,
        "analysis_dimensions": ["business", "competitive", "financial", "valuation", "risks"],
        "causal_density": 6.5,
        "logic_chains_count": 15,
        "explicit_assumptions": 4,
        "contrarian_arguments": 2,
        "quantitative_evidence_ratio": 0.6,
        "primary_source_ratio": 0.5,
        "risk_types_covered": ["market", "operational", "financial", "regulatory"],
        "quantified_risks_ratio": 0.6,
        "valuation_methods": ["DCF", "Comparable", "Sum-of-Parts"],
        "valuation_dispersion": 0.25,
        "logical_inconsistencies": 1,
        "unsupported_conclusions": 0,
        "actionable_recommendations": 4,
        "identified_catalysts": 2,
        "uncertainty_indicators": 8,
        "scenario_analyses": 2,
        "compliance_score": 85
    }

    # 执行质量评估
    assessment_result = assessor.assess_quality(analysis_data, context)

    print("🎯 Adaptive Quality Assessment Results:")
    print(f"Ticker: {context.ticker} | Tier: {context.company_tier.value}")
    print(f"Overall Score: {assessment_result['overall_assessment']['overall_score']:.1f}/10")
    print(f"Grade: {assessment_result['overall_assessment']['grade']}")
    print(f"Status: {assessment_result['overall_assessment']['status']}")
    print(f"Threshold Pass Rate: {assessment_result['overall_assessment']['threshold_pass_rate']:.1%}")
    print()

    print("📊 Dimension Scores:")
    for dimension, scores in assessment_result["dimension_scores"].items():
        status = "✅" if scores["threshold_met"] else "❌"
        target_status = "🎯" if scores["target_met"] else ""
        print(f"{status}{target_status} {dimension}: {scores['adjusted_score']:.1f} "
              f"(threshold: {scores['threshold']:.1f}, target: {scores['target']:.1f})")

    print("\n🔧 Improvement Plan:")
    for priority in assessment_result["improvement_plan"]["priorities"][:3]:
        print(f"• {priority['priority']} priority: {priority['dimension']} "
              f"(gap: {priority['gap']:.1f})")
        for suggestion in priority['suggestions'][:2]:
            print(f"  - {suggestion}")

    print(f"\n📈 Adaptive Adjustments Applied:")
    for dimension, factor in assessment_result["adaptive_adjustments"].items():
        if factor != 1.0:
            direction = "↑" if factor > 1.0 else "↓"
            print(f"{direction} {dimension}: {factor:.2f}x")