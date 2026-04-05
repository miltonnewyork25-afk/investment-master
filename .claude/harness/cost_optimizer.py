#!/usr/bin/env python3
"""
Investment Analysis Cost Optimizer
=================================

智能成本控制系统，确保分析质量与API成本之间的最优平衡
基于C编译器项目教训：16 agents × 2周 ≈ $20,000

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import json
import logging
from typing import Dict, List, Optional, Tuple, Union
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from pathlib import Path

class AnalysisComplexity(Enum):
    """分析复杂度等级"""
    SIMPLE = 1           # 成熟大盘股，业务模式清晰
    MODERATE = 2         # 一般复杂度，需要深入分析
    COMPLEX = 3          # 高复杂度，多业务线/新兴行业
    VERY_COMPLEX = 4     # 极高复杂度，颠覆性业务模式
    RESEARCH_INTENSIVE = 5  # 研究密集型，需要大量外部数据

class AnalysisTier(Enum):
    """分析层级"""
    TIER_1_QUICK = "tier_1_quick"           # 快速扫描: $5-10
    TIER_2_STANDARD = "tier_2_standard"     # 标准分析: $50-100
    TIER_3_DEEP = "tier_3_deep"             # 深度分析: $200-500
    TIER_3_PARALLEL = "tier_3_parallel"     # 并行专家团队: $500-2000

class CostCategory(Enum):
    """成本类别"""
    MODEL_TOKENS = "model_tokens"           # 模型token成本
    TOOL_CALLS = "tool_calls"              # 工具调用成本
    AGENT_ORCHESTRATION = "agent_orch"     # 多agent协调成本
    DATA_RETRIEVAL = "data_retrieval"      # 数据获取成本
    QUALITY_ASSURANCE = "quality_assurance" # 质量保障成本

@dataclass
class CostEstimate:
    """成本估算"""
    tier: AnalysisTier
    estimated_cost: float
    max_cost: float
    token_budget: int
    tool_budget: int
    time_estimate_hours: float
    confidence: float  # 估算置信度

@dataclass
class CostTracker:
    """成本追踪"""
    session_id: str
    ticker: str
    start_time: datetime
    model_tokens: int = 0
    tool_calls: int = 0
    agent_spawns: int = 0
    actual_cost: float = 0.0
    budget_utilization: float = 0.0

class InvestmentCostOptimizer:
    """投资分析成本优化器"""

    def __init__(self):
        # Token定价 (基于Sonnet 4价格)
        self.token_pricing = {
            'input_token': 0.000003,   # $3 per 1M input tokens
            'output_token': 0.000015,  # $15 per 1M output tokens
            'tool_call': 0.001,        # 每次工具调用估算成本
            'agent_spawn': 0.01        # 每次agent创建的协调成本
        }

        # 复杂度评估权重
        self.complexity_factors = {
            'business_lines': 0.2,      # 业务线数量
            'industry_maturity': 0.15,  # 行业成熟度
            'data_availability': 0.15,  # 数据可得性
            'regulatory_complexity': 0.1, # 监管复杂度
            'market_cap_tier': 0.1,     # 市值层级
            'analyst_coverage': 0.1,    # 分析师覆盖度
            'business_model_clarity': 0.2  # 商业模式清晰度
        }

        # 层级成本模板
        self.tier_cost_templates = {
            AnalysisTier.TIER_1_QUICK: {
                'token_budget': 15000,     # ~$0.5
                'tool_budget': 10,         # ~$0.01
                'agent_budget': 1,         # 单agent
                'max_cost': 10.0,
                'time_hours': 0.25
            },
            AnalysisTier.TIER_2_STANDARD: {
                'token_budget': 150000,    # ~$5
                'tool_budget': 50,         # ~$0.05
                'agent_budget': 1,         # 单agent
                'max_cost': 100.0,
                'time_hours': 2.0
            },
            AnalysisTier.TIER_3_DEEP: {
                'token_budget': 1000000,   # ~$30-50
                'tool_budget': 200,        # ~$0.2
                'agent_budget': 1,         # 单agent深度
                'max_cost': 500.0,
                'time_hours': 8.0
            },
            AnalysisTier.TIER_3_PARALLEL: {
                'token_budget': 5000000,   # ~$150-250
                'tool_budget': 1000,       # ~$1
                'agent_budget': 4,         # 并行专家团队
                'max_cost': 2000.0,
                'time_hours': 12.0
            }
        }

        self.active_sessions: Dict[str, CostTracker] = {}

    def assess_analysis_complexity(self, ticker: str,
                                 company_data: Dict) -> Tuple[AnalysisComplexity, Dict[str, float]]:
        """评估分析复杂度"""
        complexity_scores = {}

        # 业务线复杂度 (1-5)
        business_segments = company_data.get('business_segments', [])
        if len(business_segments) <= 1:
            complexity_scores['business_lines'] = 1.0
        elif len(business_segments) <= 3:
            complexity_scores['business_lines'] = 2.0
        elif len(business_segments) <= 5:
            complexity_scores['business_lines'] = 3.0
        else:
            complexity_scores['business_lines'] = 5.0

        # 行业成熟度
        industry = company_data.get('industry', 'unknown').lower()
        if any(keyword in industry for keyword in ['utility', 'banking', 'retail']):
            complexity_scores['industry_maturity'] = 2.0  # 成熟行业
        elif any(keyword in industry for keyword in ['technology', 'software']):
            complexity_scores['industry_maturity'] = 3.0  # 中等复杂
        elif any(keyword in industry for keyword in ['biotech', 'crypto', 'ai']):
            complexity_scores['industry_maturity'] = 5.0  # 新兴高复杂
        else:
            complexity_scores['industry_maturity'] = 3.0

        # 数据可得性
        market_cap = company_data.get('market_cap', 0)
        if market_cap > 50_000_000_000:  # > $50B
            complexity_scores['data_availability'] = 1.0  # 大量数据
        elif market_cap > 10_000_000_000:  # > $10B
            complexity_scores['data_availability'] = 2.0
        elif market_cap > 1_000_000_000:  # > $1B
            complexity_scores['data_availability'] = 3.0
        else:
            complexity_scores['data_availability'] = 4.0  # 小盘股数据稀少

        # 监管复杂度
        if any(keyword in industry for keyword in ['bank', 'insurance', 'pharmaceutical']):
            complexity_scores['regulatory_complexity'] = 4.0
        elif any(keyword in industry for keyword in ['utility', 'telecom']):
            complexity_scores['regulatory_complexity'] = 3.0
        else:
            complexity_scores['regulatory_complexity'] = 2.0

        # 分析师覆盖度
        analyst_count = company_data.get('analyst_coverage', 0)
        if analyst_count >= 20:
            complexity_scores['analyst_coverage'] = 1.0  # 高覆盖，容易对比
        elif analyst_count >= 10:
            complexity_scores['analyst_coverage'] = 2.0
        elif analyst_count >= 5:
            complexity_scores['analyst_coverage'] = 3.0
        else:
            complexity_scores['analyst_coverage'] = 4.0  # 低覆盖，需要更多工作

        # 商业模式清晰度 (需要人工判断或历史数据)
        complexity_scores['business_model_clarity'] = 3.0  # 默认中等

        # 计算加权复杂度分数
        weighted_score = sum(
            score * self.complexity_factors[factor]
            for factor, score in complexity_scores.items()
        )

        # 映射到复杂度等级
        if weighted_score <= 1.5:
            complexity = AnalysisComplexity.SIMPLE
        elif weighted_score <= 2.5:
            complexity = AnalysisComplexity.MODERATE
        elif weighted_score <= 3.5:
            complexity = AnalysisComplexity.COMPLEX
        elif weighted_score <= 4.5:
            complexity = AnalysisComplexity.VERY_COMPLEX
        else:
            complexity = AnalysisComplexity.RESEARCH_INTENSIVE

        return complexity, complexity_scores

    def recommend_analysis_tier(self, complexity: AnalysisComplexity,
                              urgency: str = "normal",
                              budget_limit: Optional[float] = None) -> Tuple[AnalysisTier, str]:
        """推荐分析层级"""
        # 基础映射
        base_recommendations = {
            AnalysisComplexity.SIMPLE: AnalysisTier.TIER_2_STANDARD,
            AnalysisComplexity.MODERATE: AnalysisTier.TIER_2_STANDARD,
            AnalysisComplexity.COMPLEX: AnalysisTier.TIER_3_DEEP,
            AnalysisComplexity.VERY_COMPLEX: AnalysisTier.TIER_3_DEEP,
            AnalysisComplexity.RESEARCH_INTENSIVE: AnalysisTier.TIER_3_PARALLEL
        }

        recommended_tier = base_recommendations[complexity]

        # 预算约束调整
        if budget_limit:
            tier_cost = self.tier_cost_templates[recommended_tier]['max_cost']
            if tier_cost > budget_limit:
                # 降级到预算内最高tier
                for tier in [AnalysisTier.TIER_3_DEEP, AnalysisTier.TIER_2_STANDARD, AnalysisTier.TIER_1_QUICK]:
                    if self.tier_cost_templates[tier]['max_cost'] <= budget_limit:
                        recommended_tier = tier
                        break

        # 紧急度调整
        if urgency == "high" and recommended_tier == AnalysisTier.TIER_3_PARALLEL:
            # 高紧急度避免并行复杂度，选择单agent深度
            recommended_tier = AnalysisTier.TIER_3_DEEP

        # 生成推荐理由
        reasons = []
        reasons.append(f"Complexity level: {complexity.name}")
        if budget_limit:
            reasons.append(f"Budget constraint: ${budget_limit}")
        if urgency != "normal":
            reasons.append(f"Urgency: {urgency}")

        return recommended_tier, "; ".join(reasons)

    def create_cost_estimate(self, ticker: str, tier: AnalysisTier,
                           complexity_scores: Dict[str, float]) -> CostEstimate:
        """创建成本估算"""
        template = self.tier_cost_templates[tier]

        # 根据复杂度调整成本
        complexity_multiplier = 1.0
        avg_complexity = sum(complexity_scores.values()) / len(complexity_scores)
        complexity_multiplier = 0.5 + (avg_complexity / 5.0)  # 0.5-1.0范围

        estimated_cost = template['max_cost'] * complexity_multiplier * 0.7  # 70%平均利用率
        max_cost = template['max_cost'] * complexity_multiplier

        return CostEstimate(
            tier=tier,
            estimated_cost=estimated_cost,
            max_cost=max_cost,
            token_budget=int(template['token_budget'] * complexity_multiplier),
            tool_budget=int(template['tool_budget'] * complexity_multiplier),
            time_estimate_hours=template['time_hours'] * complexity_multiplier,
            confidence=0.8 - (complexity_multiplier - 1.0) * 0.3  # 复杂度越高信心越低
        )

    def start_session_tracking(self, ticker: str, tier: AnalysisTier) -> str:
        """开始session成本追踪"""
        session_id = f"{ticker}_{tier.value}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        self.active_sessions[session_id] = CostTracker(
            session_id=session_id,
            ticker=ticker,
            start_time=datetime.now()
        )

        return session_id

    def track_token_usage(self, session_id: str, input_tokens: int,
                         output_tokens: int) -> Dict:
        """追踪token使用"""
        if session_id not in self.active_sessions:
            return {"error": "Session not found"}

        session = self.active_sessions[session_id]
        session.model_tokens += input_tokens + output_tokens

        token_cost = (input_tokens * self.token_pricing['input_token'] +
                     output_tokens * self.token_pricing['output_token'])

        session.actual_cost += token_cost

        return {
            "session_id": session_id,
            "total_tokens": session.model_tokens,
            "session_cost": session.actual_cost,
            "token_cost_added": token_cost
        }

    def track_tool_usage(self, session_id: str, tool_name: str,
                        execution_time: Optional[float] = None) -> Dict:
        """追踪工具使用"""
        if session_id not in self.active_sessions:
            return {"error": "Session not found"}

        session = self.active_sessions[session_id]
        session.tool_calls += 1

        tool_cost = self.token_pricing['tool_call']
        session.actual_cost += tool_cost

        return {
            "session_id": session_id,
            "total_tool_calls": session.tool_calls,
            "tool_cost_added": tool_cost,
            "session_cost": session.actual_cost
        }

    def track_agent_spawn(self, session_id: str, agent_type: str) -> Dict:
        """追踪agent创建"""
        if session_id not in self.active_sessions:
            return {"error": "Session not found"}

        session = self.active_sessions[session_id]
        session.agent_spawns += 1

        agent_cost = self.token_pricing['agent_spawn']
        session.actual_cost += agent_cost

        return {
            "session_id": session_id,
            "total_agents": session.agent_spawns,
            "agent_cost_added": agent_cost,
            "session_cost": session.actual_cost
        }

    def check_budget_status(self, session_id: str, budget_limit: float) -> Dict:
        """检查预算状态"""
        if session_id not in self.active_sessions:
            return {"error": "Session not found"}

        session = self.active_sessions[session_id]
        utilization = session.actual_cost / budget_limit
        session.budget_utilization = utilization

        status = "normal"
        if utilization > 0.9:
            status = "critical"
        elif utilization > 0.7:
            status = "warning"

        return {
            "session_id": session_id,
            "current_cost": session.actual_cost,
            "budget_limit": budget_limit,
            "utilization": utilization,
            "status": status,
            "remaining_budget": budget_limit - session.actual_cost
        }

    def suggest_cost_optimization(self, session_id: str,
                                current_phase: str) -> List[Dict[str, str]]:
        """建议成本优化措施"""
        if session_id not in self.active_sessions:
            return [{"error": "Session not found"}]

        session = self.active_sessions[session_id]
        suggestions = []

        # Token优化建议
        if session.model_tokens > 100000:  # 高token使用
            suggestions.append({
                "type": "token_optimization",
                "suggestion": "Consider context compression or summarization",
                "potential_saving": "20-30% token reduction"
            })

        # 工具使用优化
        if session.tool_calls > 50:  # 高工具调用
            suggestions.append({
                "type": "tool_optimization",
                "suggestion": "Batch tool calls or use cached results",
                "potential_saving": "10-20% tool cost reduction"
            })

        # Agent优化建议
        if session.agent_spawns > 2:  # 多agent使用
            suggestions.append({
                "type": "agent_optimization",
                "suggestion": "Consider consolidating agents or sequential execution",
                "potential_saving": "Reduce coordination overhead by 15%"
            })

        # Phase-specific优化
        phase_optimizations = {
            "Phase_0": "Use cached industry analysis if available",
            "Phase_1": "Focus on key business drivers, avoid comprehensive coverage",
            "Phase_2": "Use peer comparison for complex calculations",
            "Phase_3": "Simplify financial model if low materiality impact",
            "Phase_4": "Target specific risk scenarios, not exhaustive coverage"
        }

        if current_phase in phase_optimizations:
            suggestions.append({
                "type": "phase_optimization",
                "suggestion": phase_optimizations[current_phase],
                "potential_saving": "Phase-specific efficiency gains"
            })

        return suggestions

    def finalize_session(self, session_id: str) -> Dict:
        """完成session并生成成本报告"""
        if session_id not in self.active_sessions:
            return {"error": "Session not found"}

        session = self.active_sessions[session_id]
        end_time = datetime.now()
        duration = end_time - session.start_time

        final_report = {
            "session_summary": {
                "session_id": session_id,
                "ticker": session.ticker,
                "duration_hours": duration.total_seconds() / 3600,
                "total_cost": session.actual_cost
            },
            "usage_breakdown": {
                "model_tokens": session.model_tokens,
                "tool_calls": session.tool_calls,
                "agent_spawns": session.agent_spawns
            },
            "cost_breakdown": {
                "token_cost": session.model_tokens * 0.000009,  # 平均token成本
                "tool_cost": session.tool_calls * self.token_pricing['tool_call'],
                "agent_cost": session.agent_spawns * self.token_pricing['agent_spawn']
            },
            "efficiency_metrics": {
                "cost_per_token": session.actual_cost / max(session.model_tokens, 1),
                "tokens_per_hour": session.model_tokens / max(duration.total_seconds() / 3600, 0.1),
                "tools_per_hour": session.tool_calls / max(duration.total_seconds() / 3600, 0.1)
            }
        }

        # 从活跃session中移除
        del self.active_sessions[session_id]

        return final_report

    def save_cost_optimization_profile(self, ticker: str, file_path: str) -> bool:
        """保存成本优化配置文件"""
        try:
            profile_data = {
                "ticker": ticker,
                "generated_at": datetime.now().isoformat(),
                "cost_templates": {tier.value: template for tier, template in self.tier_cost_templates.items()},
                "complexity_factors": self.complexity_factors,
                "token_pricing": self.token_pricing,
                "optimization_history": [
                    asdict(session) for session in self.active_sessions.values()
                ]
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(profile_data, f, indent=2, ensure_ascii=False, default=str)

            return True

        except Exception as e:
            logging.error(f"Failed to save cost optimization profile: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建成本优化器
    optimizer = InvestmentCostOptimizer()

    # 模拟公司数据
    company_data = {
        'business_segments': ['Cloud Services', 'Hardware', 'Software'],
        'industry': 'Technology',
        'market_cap': 2_000_000_000_000,  # $2T
        'analyst_coverage': 30
    }

    # 评估复杂度
    complexity, scores = optimizer.assess_analysis_complexity('AAPL', company_data)
    print(f"Analysis complexity: {complexity.name}")
    print(f"Complexity scores: {scores}")

    # 推荐层级
    tier, reason = optimizer.recommend_analysis_tier(complexity, urgency="normal", budget_limit=1000)
    print(f"Recommended tier: {tier.value}")
    print(f"Reason: {reason}")

    # 创建成本估算
    estimate = optimizer.create_cost_estimate('AAPL', tier, scores)
    print(f"Cost estimate: ${estimate.estimated_cost:.2f} - ${estimate.max_cost:.2f}")

    # 开始session追踪
    session_id = optimizer.start_session_tracking('AAPL', tier)
    print(f"Started session: {session_id}")

    # 模拟usage追踪
    optimizer.track_token_usage(session_id, 10000, 5000)
    optimizer.track_tool_usage(session_id, "fmp_data")
    budget_status = optimizer.check_budget_status(session_id, estimate.max_cost)
    print(f"Budget status: {budget_status}")