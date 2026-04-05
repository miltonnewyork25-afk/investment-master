#!/usr/bin/env python3
"""
Dynamic Tool Selection System
============================

智能工具调度器：从静态skill到动态能力
Context-aware工具选择，根据分析阶段、公司特征、市场环境动态选择最相关工具

Version: 1.0
Author: 投资大师 Framework v19.9+ Phase 3-4
"""

import json
import logging
from typing import Dict, List, Optional, Tuple, Set
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime

class ToolCategory(Enum):
    """工具类别"""
    DATA_RETRIEVAL = "data_retrieval"       # 数据获取
    FINANCIAL_ANALYSIS = "financial_analysis" # 财务分析
    VALUATION = "valuation"                  # 估值建模
    RISK_ASSESSMENT = "risk_assessment"      # 风险评估
    COMPETITIVE_ANALYSIS = "competitive"     # 竞争分析
    QUALITY_ASSURANCE = "quality_assurance" # 质量保障
    SECTOR_SPECIFIC = "sector_specific"      # 行业特化
    AUXILIARY = "auxiliary"                  # 辅助工具

class AnalysisPhase(Enum):
    """分析阶段"""
    PHASE_0 = "phase_0"           # 数据预取
    PHASE_1 = "phase_1"           # 业务理解
    PHASE_2 = "phase_2"           # 竞争格局
    PHASE_3 = "phase_3"           # 财务分析
    PHASE_4 = "phase_4"           # 红队审查
    PHASE_5 = "phase_5"           # 报告组装

@dataclass
class ToolProfile:
    """工具档案"""
    name: str
    category: ToolCategory
    cost_weight: float  # 相对成本权重 0.1-2.0
    time_weight: float  # 相对时间权重 0.1-2.0
    quality_impact: float  # 质量影响度 0.1-1.0
    dependencies: List[str]  # 依赖的其他工具
    applicable_phases: List[AnalysisPhase]
    industry_affinity: Dict[str, float]  # 行业亲和度
    market_regime_affinity: Dict[str, float]  # 市场制度亲和度
    complexity_threshold: int  # 复杂度阈值 1-5

@dataclass
class SelectionContext:
    """工具选择上下文"""
    current_phase: AnalysisPhase
    industry: str
    market_cap_tier: str  # mega/large/mid/small
    analysis_complexity: int  # 1-5
    budget_remaining: float
    time_constraint: Optional[float]  # hours
    market_regime: str
    previous_tools_used: List[str]
    quality_requirements: Dict[str, float]

class DynamicToolSelector:
    """动态工具选择器"""

    def __init__(self):
        # 工具库配置
        self.tool_profiles = self._initialize_tool_profiles()
        self.phase_tool_priorities = self._initialize_phase_priorities()
        self.industry_tool_mappings = self._initialize_industry_mappings()

        # 选择历史记录
        self.selection_history: List[Dict] = []
        self.performance_feedback: Dict[str, Dict] = {}  # tool_name -> metrics

    def _initialize_tool_profiles(self) -> Dict[str, ToolProfile]:
        """初始化工具档案库"""
        profiles = {}

        # 数据获取工具
        profiles["fmp_data"] = ToolProfile(
            name="fmp_data",
            category=ToolCategory.DATA_RETRIEVAL,
            cost_weight=0.3,
            time_weight=0.2,
            quality_impact=0.8,
            dependencies=[],
            applicable_phases=[AnalysisPhase.PHASE_0, AnalysisPhase.PHASE_1, AnalysisPhase.PHASE_3],
            industry_affinity={
                "technology": 0.9,
                "healthcare": 0.8,
                "financial": 0.9,
                "consumer": 0.7,
                "industrial": 0.6
            },
            market_regime_affinity={
                "bull_growth": 0.9,
                "consolidation": 0.8,
                "bear_deep": 0.6,
                "crisis_mode": 0.4
            },
            complexity_threshold=1
        )

        profiles["baggers_summary"] = ToolProfile(
            name="baggers_summary",
            category=ToolCategory.DATA_RETRIEVAL,
            cost_weight=0.5,
            time_weight=0.4,
            quality_impact=0.9,
            dependencies=[],
            applicable_phases=[AnalysisPhase.PHASE_0, AnalysisPhase.PHASE_1],
            industry_affinity={
                "technology": 1.0,
                "healthcare": 0.9,
                "consumer": 0.8,
                "financial": 0.6,
                "industrial": 0.7
            },
            market_regime_affinity={
                "bull_growth": 1.0,
                "consolidation": 0.8,
                "bear_deep": 0.5,
                "crisis_mode": 0.3
            },
            complexity_threshold=2
        )

        # 财务分析工具
        profiles["valuation-builder"] = ToolProfile(
            name="valuation-builder",
            category=ToolCategory.VALUATION,
            cost_weight=1.2,
            time_weight=1.5,
            quality_impact=0.95,
            dependencies=["fmp_data"],
            applicable_phases=[AnalysisPhase.PHASE_3],
            industry_affinity={
                "technology": 0.9,
                "healthcare": 0.8,
                "financial": 1.0,
                "consumer": 0.9,
                "industrial": 0.8
            },
            market_regime_affinity={
                "bull_growth": 0.9,
                "consolidation": 1.0,
                "bear_deep": 0.8,
                "crisis_mode": 0.6
            },
            complexity_threshold=3
        )

        profiles["assumption-audit"] = ToolProfile(
            name="assumption-audit",
            category=ToolCategory.QUALITY_ASSURANCE,
            cost_weight=0.8,
            time_weight=1.0,
            quality_impact=0.9,
            dependencies=["valuation-builder"],
            applicable_phases=[AnalysisPhase.PHASE_4],
            industry_affinity={
                "technology": 1.0,
                "healthcare": 0.9,
                "financial": 0.8,
                "consumer": 0.7,
                "industrial": 0.8
            },
            market_regime_affinity={
                "bull_growth": 0.7,
                "consolidation": 0.9,
                "bear_deep": 1.0,
                "crisis_mode": 1.0
            },
            complexity_threshold=3
        )

        # 行业特化工具
        profiles["ai-impact-analyzer"] = ToolProfile(
            name="ai-impact-analyzer",
            category=ToolCategory.SECTOR_SPECIFIC,
            cost_weight=1.0,
            time_weight=0.8,
            quality_impact=0.8,
            dependencies=[],
            applicable_phases=[AnalysisPhase.PHASE_1, AnalysisPhase.PHASE_2],
            industry_affinity={
                "technology": 1.0,
                "healthcare": 0.6,
                "financial": 0.7,
                "consumer": 0.5,
                "industrial": 0.6
            },
            market_regime_affinity={
                "bull_growth": 1.0,
                "consolidation": 0.8,
                "bear_deep": 0.6,
                "crisis_mode": 0.4
            },
            complexity_threshold=3
        )

        profiles["consumer-brand-analysis-toolkit"] = ToolProfile(
            name="consumer-brand-analysis-toolkit",
            category=ToolCategory.SECTOR_SPECIFIC,
            cost_weight=1.1,
            time_weight=1.0,
            quality_impact=0.9,
            dependencies=[],
            applicable_phases=[AnalysisPhase.PHASE_1, AnalysisPhase.PHASE_2],
            industry_affinity={
                "consumer": 1.0,
                "technology": 0.3,
                "healthcare": 0.2,
                "financial": 0.1,
                "industrial": 0.2
            },
            market_regime_affinity={
                "bull_growth": 0.8,
                "consolidation": 1.0,
                "bear_deep": 0.9,
                "crisis_mode": 0.7
            },
            complexity_threshold=2
        )

        # 风险评估工具
        profiles["risk-topology"] = ToolProfile(
            name="risk-topology",
            category=ToolCategory.RISK_ASSESSMENT,
            cost_weight=1.0,
            time_weight=1.2,
            quality_impact=0.85,
            dependencies=[],
            applicable_phases=[AnalysisPhase.PHASE_4],
            industry_affinity={
                "technology": 0.8,
                "healthcare": 0.9,
                "financial": 1.0,
                "consumer": 0.7,
                "industrial": 0.8
            },
            market_regime_affinity={
                "bull_growth": 0.6,
                "consolidation": 0.8,
                "bear_deep": 1.0,
                "crisis_mode": 1.0
            },
            complexity_threshold=3
        )

        profiles["red-team-suite"] = ToolProfile(
            name="red-team-suite",
            category=ToolCategory.QUALITY_ASSURANCE,
            cost_weight=1.5,
            time_weight=1.8,
            quality_impact=0.95,
            dependencies=["valuation-builder"],
            applicable_phases=[AnalysisPhase.PHASE_4],
            industry_affinity={
                "technology": 1.0,
                "healthcare": 0.9,
                "financial": 0.8,
                "consumer": 0.8,
                "industrial": 0.9
            },
            market_regime_affinity={
                "bull_growth": 0.8,
                "consolidation": 1.0,
                "bear_deep": 1.0,
                "crisis_mode": 0.9
            },
            complexity_threshold=4
        )

        # 竞争分析工具
        profiles["competitive-benchmarking"] = ToolProfile(
            name="competitive-benchmarking",
            category=ToolCategory.COMPETITIVE_ANALYSIS,
            cost_weight=1.3,
            time_weight=1.4,
            quality_impact=0.8,
            dependencies=["fmp_data"],
            applicable_phases=[AnalysisPhase.PHASE_2],
            industry_affinity={
                "technology": 0.9,
                "healthcare": 0.8,
                "financial": 0.7,
                "consumer": 1.0,
                "industrial": 0.8
            },
            market_regime_affinity={
                "bull_growth": 0.9,
                "consolidation": 1.0,
                "bear_deep": 0.8,
                "crisis_mode": 0.6
            },
            complexity_threshold=3
        )

        return profiles

    def _initialize_phase_priorities(self) -> Dict[AnalysisPhase, List[ToolCategory]]:
        """初始化各Phase的工具类别优先级"""
        return {
            AnalysisPhase.PHASE_0: [
                ToolCategory.DATA_RETRIEVAL
            ],
            AnalysisPhase.PHASE_1: [
                ToolCategory.DATA_RETRIEVAL,
                ToolCategory.SECTOR_SPECIFIC,
                ToolCategory.COMPETITIVE_ANALYSIS
            ],
            AnalysisPhase.PHASE_2: [
                ToolCategory.COMPETITIVE_ANALYSIS,
                ToolCategory.SECTOR_SPECIFIC,
                ToolCategory.FINANCIAL_ANALYSIS
            ],
            AnalysisPhase.PHASE_3: [
                ToolCategory.FINANCIAL_ANALYSIS,
                ToolCategory.VALUATION,
                ToolCategory.DATA_RETRIEVAL
            ],
            AnalysisPhase.PHASE_4: [
                ToolCategory.QUALITY_ASSURANCE,
                ToolCategory.RISK_ASSESSMENT,
                ToolCategory.VALUATION
            ],
            AnalysisPhase.PHASE_5: [
                ToolCategory.QUALITY_ASSURANCE,
                ToolCategory.AUXILIARY
            ]
        }

    def _initialize_industry_mappings(self) -> Dict[str, List[str]]:
        """初始化行业特化工具映射"""
        return {
            "technology": [
                "ai-impact-analyzer",
                "fmp_data",
                "baggers_summary",
                "assumption-audit"
            ],
            "healthcare": [
                "fmp_data",
                "baggers_summary",
                "risk-topology",
                "assumption-audit"
            ],
            "consumer": [
                "consumer-brand-analysis-toolkit",
                "competitive-benchmarking",
                "fmp_data"
            ],
            "financial": [
                "fmp_data",
                "valuation-builder",
                "risk-topology"
            ],
            "industrial": [
                "fmp_data",
                "competitive-benchmarking",
                "risk-topology"
            ]
        }

    def calculate_tool_score(self, tool_name: str, context: SelectionContext) -> float:
        """计算工具适配分数"""
        if tool_name not in self.tool_profiles:
            return 0.0

        profile = self.tool_profiles[tool_name]
        score = 0.0

        # 1. Phase适配性 (权重: 30%)
        if context.current_phase in profile.applicable_phases:
            score += 0.3
        else:
            return 0.0  # Phase不匹配直接淘汰

        # 2. 行业亲和度 (权重: 25%)
        industry_affinity = profile.industry_affinity.get(context.industry, 0.5)
        score += 0.25 * industry_affinity

        # 3. 复杂度匹配 (权重: 20%)
        complexity_match = 1.0 - abs(profile.complexity_threshold - context.analysis_complexity) / 5.0
        score += 0.2 * max(0.0, complexity_match)

        # 4. 成本效益 (权重: 15%)
        if context.budget_remaining > 0:
            cost_efficiency = min(1.0, context.budget_remaining / (profile.cost_weight * 100))
            score += 0.15 * cost_efficiency
        else:
            score += 0.15 * (1.0 - profile.cost_weight)  # 低成本工具得分更高

        # 5. 市场制度匹配 (权重: 10%)
        regime_affinity = profile.market_regime_affinity.get(context.market_regime, 0.5)
        score += 0.1 * regime_affinity

        # 6. 去重惩罚 - 已使用过的工具降分
        if tool_name in context.previous_tools_used:
            score *= 0.5

        # 7. 依赖关系检查
        for dependency in profile.dependencies:
            if dependency not in context.previous_tools_used:
                score *= 0.7  # 依赖未满足降分

        # 8. 质量需求匹配
        if context.quality_requirements:
            quality_match = profile.quality_impact
            for req_type, req_level in context.quality_requirements.items():
                if req_type in ["accuracy", "completeness"] and quality_match >= req_level:
                    score += 0.05

        return min(1.0, score)  # 归一化到[0,1]

    def select_tools_for_phase(self, context: SelectionContext,
                              max_tools: int = 5) -> List[Tuple[str, float]]:
        """为特定Phase选择最优工具组合"""

        # 计算所有工具的适配分数
        tool_scores = []
        for tool_name, profile in self.tool_profiles.items():
            score = self.calculate_tool_score(tool_name, context)
            if score > 0.1:  # 过滤低分工具
                tool_scores.append((tool_name, score, profile))

        # 按分数排序
        tool_scores.sort(key=lambda x: x[1], reverse=True)

        # 智能组合选择
        selected_tools = []
        total_cost = 0.0
        used_categories = set()

        for tool_name, score, profile in tool_scores:
            # 检查预算约束
            estimated_cost = profile.cost_weight * 50  # 假设基础成本50
            if context.budget_remaining > 0 and total_cost + estimated_cost > context.budget_remaining:
                continue

            # 检查类别多样性
            if len(selected_tools) < max_tools // 2:
                # 前半部分优先选择不同类别
                if profile.category in used_categories:
                    continue

            # 检查时间约束
            if context.time_constraint:
                estimated_time = profile.time_weight * 1.0  # 假设基础时间1小时
                if estimated_time > context.time_constraint:
                    continue

            selected_tools.append((tool_name, score))
            total_cost += estimated_cost
            used_categories.add(profile.category)

            if len(selected_tools) >= max_tools:
                break

        return selected_tools

    def get_tool_recommendations(self, context: SelectionContext) -> Dict:
        """获取工具推荐结果"""

        # 选择工具
        selected_tools = self.select_tools_for_phase(context)

        # 生成推荐报告
        recommendation = {
            "timestamp": datetime.now().isoformat(),
            "context_summary": {
                "phase": context.current_phase.value,
                "industry": context.industry,
                "complexity": context.analysis_complexity,
                "budget_remaining": context.budget_remaining,
                "market_regime": context.market_regime
            },
            "recommended_tools": []
        }

        total_estimated_cost = 0.0
        for tool_name, score in selected_tools:
            profile = self.tool_profiles[tool_name]
            estimated_cost = profile.cost_weight * 50

            tool_rec = {
                "name": tool_name,
                "score": score,
                "category": profile.category.value,
                "estimated_cost": estimated_cost,
                "estimated_time_hours": profile.time_weight * 1.0,
                "quality_impact": profile.quality_impact,
                "rationale": self._generate_selection_rationale(tool_name, context, score)
            }

            recommendation["recommended_tools"].append(tool_rec)
            total_estimated_cost += estimated_cost

        recommendation["total_estimated_cost"] = total_estimated_cost
        recommendation["selection_strategy"] = self._get_selection_strategy(context)

        # 记录选择历史
        self.selection_history.append({
            "timestamp": datetime.now().isoformat(),
            "context": asdict(context),
            "selected_tools": [t[0] for t in selected_tools],
            "scores": [t[1] for t in selected_tools]
        })

        return recommendation

    def _generate_selection_rationale(self, tool_name: str, context: SelectionContext, score: float) -> str:
        """生成工具选择理由"""
        profile = self.tool_profiles[tool_name]

        rationale_parts = []

        # 基础适配性
        rationale_parts.append(f"Phase {context.current_phase.value} 适配")

        # 行业匹配
        industry_affinity = profile.industry_affinity.get(context.industry, 0.5)
        if industry_affinity > 0.8:
            rationale_parts.append(f"{context.industry}行业高匹配({industry_affinity:.1%})")
        elif industry_affinity > 0.6:
            rationale_parts.append(f"{context.industry}行业匹配")

        # 复杂度匹配
        if abs(profile.complexity_threshold - context.analysis_complexity) <= 1:
            rationale_parts.append("复杂度匹配")

        # 成本效益
        if profile.cost_weight < 0.5:
            rationale_parts.append("成本友好")
        elif profile.cost_weight > 1.5:
            rationale_parts.append("高价值工具")

        # 质量影响
        if profile.quality_impact > 0.9:
            rationale_parts.append("高质量影响")

        # 市场制度匹配
        regime_affinity = profile.market_regime_affinity.get(context.market_regime, 0.5)
        if regime_affinity > 0.8:
            rationale_parts.append(f"{context.market_regime}制度优选")

        return " | ".join(rationale_parts)

    def _get_selection_strategy(self, context: SelectionContext) -> str:
        """获取选择策略描述"""
        if context.budget_remaining < 100:
            return "cost_optimized"
        elif context.time_constraint and context.time_constraint < 2:
            return "time_optimized"
        elif context.analysis_complexity >= 4:
            return "quality_prioritized"
        else:
            return "balanced"

    def update_tool_performance(self, tool_name: str, metrics: Dict) -> None:
        """更新工具性能反馈"""
        if tool_name not in self.performance_feedback:
            self.performance_feedback[tool_name] = {}

        # 更新性能指标
        for metric, value in metrics.items():
            if metric not in self.performance_feedback[tool_name]:
                self.performance_feedback[tool_name][metric] = []
            self.performance_feedback[tool_name][metric].append(value)

        # 基于性能反馈动态调整工具档案
        self._adjust_tool_profile_based_on_feedback(tool_name)

    def _adjust_tool_profile_based_on_feedback(self, tool_name: str) -> None:
        """基于反馈调整工具档案"""
        if tool_name not in self.tool_profiles or tool_name not in self.performance_feedback:
            return

        feedback = self.performance_feedback[tool_name]
        profile = self.tool_profiles[tool_name]

        # 根据实际成本调整成本权重
        if "actual_cost" in feedback and len(feedback["actual_cost"]) >= 3:
            avg_cost_ratio = sum(feedback["actual_cost"]) / len(feedback["actual_cost"])
            profile.cost_weight = min(2.0, max(0.1, profile.cost_weight * avg_cost_ratio))

        # 根据实际时间调整时间权重
        if "actual_time" in feedback and len(feedback["actual_time"]) >= 3:
            avg_time_ratio = sum(feedback["actual_time"]) / len(feedback["actual_time"])
            profile.time_weight = min(2.0, max(0.1, profile.time_weight * avg_time_ratio))

        # 根据质量反馈调整质量影响度
        if "quality_rating" in feedback and len(feedback["quality_rating"]) >= 3:
            avg_quality = sum(feedback["quality_rating"]) / len(feedback["quality_rating"])
            profile.quality_impact = min(1.0, max(0.1, avg_quality / 10.0))

    def get_selection_analytics(self) -> Dict:
        """获取选择分析报告"""
        if not self.selection_history:
            return {"error": "No selection history available"}

        analytics = {
            "total_selections": len(self.selection_history),
            "most_selected_tools": {},
            "average_scores": {},
            "selection_trends": {},
            "performance_summary": {}
        }

        # 统计最常选择的工具
        tool_counts = {}
        tool_score_sums = {}

        for record in self.selection_history:
            for i, tool in enumerate(record["selected_tools"]):
                tool_counts[tool] = tool_counts.get(tool, 0) + 1
                tool_score_sums[tool] = tool_score_sums.get(tool, 0) + record["scores"][i]

        # 计算平均分数
        for tool, count in tool_counts.items():
            analytics["most_selected_tools"][tool] = count
            analytics["average_scores"][tool] = tool_score_sums[tool] / count

        # 性能汇总
        for tool, feedback in self.performance_feedback.items():
            if feedback:
                analytics["performance_summary"][tool] = {
                    metric: sum(values) / len(values) if values else 0
                    for metric, values in feedback.items()
                }

        return analytics

    def save_selector_state(self, file_path: str) -> bool:
        """保存选择器状态"""
        try:
            state_data = {
                "selection_history": self.selection_history,
                "performance_feedback": self.performance_feedback,
                "tool_profiles": {
                    name: asdict(profile) for name, profile in self.tool_profiles.items()
                },
                "generated_at": datetime.now().isoformat()
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(state_data, f, indent=2, ensure_ascii=False, default=str)

            return True

        except Exception as e:
            logging.error(f"Failed to save selector state: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建动态工具选择器
    selector = DynamicToolSelector()

    # 模拟选择上下文
    context = SelectionContext(
        current_phase=AnalysisPhase.PHASE_1,
        industry="technology",
        market_cap_tier="large",
        analysis_complexity=3,
        budget_remaining=300,
        time_constraint=4.0,
        market_regime="bull_growth",
        previous_tools_used=["fmp_data"],
        quality_requirements={"accuracy": 0.8, "completeness": 0.7}
    )

    # 获取工具推荐
    recommendations = selector.get_tool_recommendations(context)

    print("🎯 Dynamic Tool Selection Results:")
    print(f"Phase: {context.current_phase.value}")
    print(f"Industry: {context.industry}")
    print(f"Complexity: {context.analysis_complexity}/5")
    print(f"Budget: ${context.budget_remaining}")
    print()

    print("📋 Recommended Tools:")
    for tool in recommendations["recommended_tools"]:
        print(f"• {tool['name']} (Score: {tool['score']:.2f})")
        print(f"  Category: {tool['category']}")
        print(f"  Cost: ${tool['estimated_cost']:.0f} | Time: {tool['estimated_time_hours']:.1f}h")
        print(f"  Rationale: {tool['rationale']}")
        print()

    print(f"💰 Total Estimated Cost: ${recommendations['total_estimated_cost']:.0f}")
    print(f"🎛️ Selection Strategy: {recommendations['selection_strategy']}")

    # 模拟性能反馈
    selector.update_tool_performance("fmp_data", {
        "actual_cost": 1.2,  # 比预期高20%
        "actual_time": 0.8,  # 比预期快20%
        "quality_rating": 8.5  # 质量评分8.5/10
    })

    # 获取分析报告
    analytics = selector.get_selection_analytics()
    print("\n📊 Selection Analytics:")
    if "most_selected_tools" in analytics:
        print("Most used tools:", analytics["most_selected_tools"])
        print("Average scores:", {k: f"{v:.2f}" for k, v in analytics["average_scores"].items()})