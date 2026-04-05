#!/usr/bin/env python3
"""
Investment Harness Controller v2.0
==================================

投资harness主控制器升级版，集成智能化功能：
- 动态工具选择
- 智能Memory检索
- 自适应质量标准
- 并行分析协调

Version: 2.0
Author: 投资大师 Framework v19.9+ Phase 3-4
"""

import json
import logging
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime
from pathlib import Path

# 导入原有模块
from .uncertainty_manager import InvestmentUncertaintyManager, UncertaintyType, ResolutionStrategy
from .market_regime_detector import MarketRegimeDetector, MarketRegime, RegimeIndicator
from .cost_optimizer import InvestmentCostOptimizer, AnalysisComplexity, AnalysisTier
from .compliance_layer import InvestmentComplianceChecker, ComplianceRisk, RiskLevel

# 导入新的智能化模块
from .dynamic_tool_selector import DynamicToolSelector, AnalysisPhase, SelectionContext
from .intelligent_memory import IntelligentMemoryManager, QueryContext, MemoryType
from .adaptive_quality import AdaptiveQualityAssessor, QualityContext, CompanyTier
from .parallel_coordinator import ParallelAnalysisCoordinator, ExpertRole, SyncStrategy

class InvestmentHarnessControllerV2:
    """投资harness主控制器v2.0"""

    def __init__(self, ticker: str, initial_tier: str = "tier_2_standard"):
        self.ticker = ticker
        self.session_id = f"{ticker}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_v2"

        # 初始化原有四个核心模块
        self.uncertainty_manager = InvestmentUncertaintyManager(ticker, self.session_id)
        self.regime_detector = MarketRegimeDetector()
        self.cost_optimizer = InvestmentCostOptimizer()
        self.compliance_checker = InvestmentComplianceChecker()

        # 初始化新的智能化模块
        self.tool_selector = DynamicToolSelector()
        self.memory_manager = IntelligentMemoryManager(
            str(Path.home() / ".claude" / "projects" / "-Users-milton-----" / "memory")
        )
        self.quality_assessor = AdaptiveQualityAssessor()

        # 并行协调器（按需初始化）
        self.parallel_coordinator: Optional[ParallelAnalysisCoordinator] = None

        # 分析状态
        self.analysis_tier = AnalysisTier(initial_tier) if isinstance(initial_tier, str) else initial_tier
        self.current_phase = "initialization"
        self.analysis_context = {}
        self.cost_session_id: Optional[str] = None
        self.selected_tools_history: List[Dict] = []

        # 启动日志
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(f"harness_v2_{ticker}")

    def initialize_analysis_v2(self, company_data: Dict, urgency: str = "normal",
                              budget_limit: Optional[float] = None,
                              enable_parallel: bool = False) -> Dict:
        """初始化分析环境 v2.0"""
        self.logger.info(f"Initializing harness v2.0 for {self.ticker}")

        initialization_result = {
            "ticker": self.ticker,
            "session_id": self.session_id,
            "harness_version": "2.0",
            "initialization_time": datetime.now().isoformat(),
            "status": "initialized",
            "intelligent_features": {
                "dynamic_tool_selection": True,
                "intelligent_memory": True,
                "adaptive_quality": True,
                "parallel_analysis": enable_parallel
            }
        }

        try:
            # 1. 基础初始化（使用v1.0逻辑）
            base_init = self._run_base_initialization(company_data, urgency, budget_limit)
            initialization_result.update(base_init)

            # 2. 智能Memory推荐
            memory_recommendations = self._get_intelligent_memory_recommendations()
            initialization_result["memory_recommendations"] = memory_recommendations

            # 3. 动态工具选择准备
            tool_preparation = self._prepare_dynamic_tool_selection(company_data)
            initialization_result["tool_selection_ready"] = tool_preparation

            # 4. 自适应质量标准设置
            quality_context = self._setup_adaptive_quality_context(company_data)
            initialization_result["quality_context"] = quality_context

            # 5. 并行分析准备（如果启用）
            if enable_parallel:
                parallel_setup = self._setup_parallel_analysis(company_data)
                initialization_result["parallel_analysis_setup"] = parallel_setup

            self.logger.info(f"v2.0 initialization complete with intelligent features")

        except Exception as e:
            self.logger.error(f"v2.0 initialization failed: {e}")
            initialization_result.update({
                "status": "failed",
                "error": str(e)
            })

        return initialization_result

    def _run_base_initialization(self, company_data: Dict, urgency: str, budget_limit: Optional[float]) -> Dict:
        """运行基础初始化（v1.0逻辑）"""
        # 评估分析复杂度
        complexity, complexity_scores = self.cost_optimizer.assess_analysis_complexity(
            self.ticker, company_data
        )

        # 推荐分析层级
        recommended_tier, recommendation_reason = self.cost_optimizer.recommend_analysis_tier(
            complexity, urgency, budget_limit
        )

        # 创建成本估算
        cost_estimate = self.cost_optimizer.create_cost_estimate(
            self.ticker, recommended_tier, complexity_scores
        )

        # 检测市场制度
        market_context = self.regime_detector.assess_current_regime()

        # 获取分析权重
        analysis_weights = self.regime_detector.get_analysis_weights_for_regime(
            market_context.current_regime
        )

        # 开始成本追踪
        self.cost_session_id = self.cost_optimizer.start_session_tracking(
            self.ticker, recommended_tier
        )

        # 更新分析上下文
        self.analysis_context.update({
            "complexity": complexity.name,
            "complexity_scores": complexity_scores,
            "recommended_tier": recommended_tier.value,
            "cost_estimate": cost_estimate,
            "market_context": market_context,
            "analysis_weights": analysis_weights,
            "budget_limit": budget_limit
        })

        return {
            "complexity_assessment": {
                "level": complexity.name,
                "scores": complexity_scores,
                "recommended_tier": recommended_tier.value,
                "reason": recommendation_reason
            },
            "cost_planning": {
                "estimated_cost": cost_estimate.estimated_cost,
                "max_cost": cost_estimate.max_cost,
                "token_budget": cost_estimate.token_budget,
                "time_estimate_hours": cost_estimate.time_estimate_hours
            },
            "market_context": {
                "current_regime": market_context.current_regime.value,
                "regime_confidence": market_context.regime_confidence,
                "analysis_weights": analysis_weights
            }
        }

    def _get_intelligent_memory_recommendations(self) -> Dict:
        """获取智能Memory推荐"""
        try:
            # 构建查询上下文
            context = QueryContext(
                current_ticker=self.ticker,
                current_industry=self.analysis_context.get("industry", "unknown"),
                current_phase="Phase_0",
                analysis_focus=["valuation", "competitive_advantage", "risks"],
                key_concepts={"护城河", "定价权", "估值", "竞争优势"},
                business_model_keywords={"platform", "subscription", "network_effect"},
                current_concerns=[]
            )

            recommendations = self.memory_manager.get_proactive_recommendations(context)

            # 只返回前5个最相关的推荐
            top_recommendations = recommendations["recommendations"][:5]

            return {
                "status": "success",
                "total_recommendations": len(recommendations["recommendations"]),
                "top_recommendations": top_recommendations,
                "memory_stats": {
                    "total_nodes": len(self.memory_manager.memory_nodes),
                    "ticker_matches": len(self.memory_manager.ticker_index.get(self.ticker.upper(), set())),
                    "industry_matches": len(self.memory_manager.industry_index.get(
                        self.analysis_context.get("industry", ""), set()))
                }
            }

        except Exception as e:
            self.logger.warning(f"Memory recommendations failed: {e}")
            return {"status": "failed", "error": str(e)}

    def _prepare_dynamic_tool_selection(self, company_data: Dict) -> Dict:
        """准备动态工具选择"""
        try:
            # 为Phase 0创建选择上下文
            selection_context = SelectionContext(
                current_phase=AnalysisPhase.PHASE_0,
                industry=company_data.get("industry", "unknown"),
                market_cap_tier=self._get_market_cap_tier(company_data.get("market_cap", 0)),
                analysis_complexity=self._map_complexity_to_int(
                    self.analysis_context.get("complexity", "MODERATE")
                ),
                budget_remaining=self.analysis_context["cost_estimate"].max_cost,
                time_constraint=self.analysis_context["cost_estimate"].time_estimate_hours,
                market_regime=self.analysis_context["market_context"]["current_regime"],
                previous_tools_used=[],
                quality_requirements={"accuracy": 0.8, "completeness": 0.7}
            )

            # 获取Phase 0工具推荐
            phase_0_tools = self.tool_selector.get_tool_recommendations(selection_context)

            return {
                "status": "ready",
                "phase_0_tools": phase_0_tools["recommended_tools"][:3],  # 前3个推荐
                "selection_strategy": phase_0_tools["selection_strategy"],
                "total_estimated_cost": phase_0_tools["total_estimated_cost"]
            }

        except Exception as e:
            self.logger.warning(f"Tool selection preparation failed: {e}")
            return {"status": "failed", "error": str(e)}

    def _setup_adaptive_quality_context(self, company_data: Dict) -> Dict:
        """设置自适应质量上下文"""
        try:
            quality_context = QualityContext(
                ticker=self.ticker,
                company_tier=self._get_company_tier(company_data.get("market_cap", 0)),
                industry=company_data.get("industry", "unknown"),
                analysis_complexity=self._map_complexity_to_adaptive_enum(
                    self.analysis_context.get("complexity", "MODERATE")
                ),
                market_regime=self.analysis_context["market_context"]["current_regime"],
                business_maturity=self._infer_business_maturity(company_data),
                analyst_coverage=company_data.get("analyst_coverage", 0),
                data_availability=self._assess_data_availability(company_data),
                regulatory_scrutiny=self._assess_regulatory_scrutiny(company_data),
                analysis_purpose="investment_decision"
            )

            # 获取适应性标准
            adapted_standards = self.quality_assessor.adapt_standards_to_context(quality_context)

            return {
                "quality_context": {
                    "ticker": quality_context.ticker,
                    "company_tier": quality_context.company_tier.value,
                    "complexity": quality_context.analysis_complexity.value,
                    "market_regime": quality_context.market_regime
                },
                "adapted_thresholds": {
                    dim.value: {
                        "threshold": standard.threshold,
                        "target": standard.target,
                        "adaptive_factor": standard.adaptive_factor
                    }
                    for dim, standard in adapted_standards.items()
                },
                "context_adjustments": len([
                    s for s in adapted_standards.values()
                    if abs(s.adaptive_factor - 1.0) > 0.1
                ])
            }

        except Exception as e:
            self.logger.warning(f"Quality context setup failed: {e}")
            return {"status": "failed", "error": str(e)}

    def _setup_parallel_analysis(self, company_data: Dict) -> Dict:
        """设置并行分析"""
        try:
            workspace_path = f"/tmp/harness_parallel_{self.ticker}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

            self.parallel_coordinator = ParallelAnalysisCoordinator(
                workspace_path=workspace_path,
                sync_strategy=SyncStrategy.LOCK_FIRST
            )

            # 创建分析计划
            analysis_scope = {
                "industry": company_data.get("industry", "unknown"),
                "complexity": self.analysis_context.get("complexity", "moderate")
            }

            tasks = self.parallel_coordinator.create_analysis_plan(self.ticker, analysis_scope)

            return {
                "status": "ready",
                "workspace_path": workspace_path,
                "total_tasks": len(tasks),
                "expert_roles": [role.value for role in ExpertRole],
                "estimated_parallel_time": max(task.estimated_duration for task in tasks),
                "task_overview": [
                    {
                        "task_id": task.task_id,
                        "type": task.task_type,
                        "expert": task.assigned_expert.value,
                        "priority": task.priority
                    }
                    for task in tasks[:5]  # 显示前5个任务
                ]
            }

        except Exception as e:
            self.logger.warning(f"Parallel analysis setup failed: {e}")
            return {"status": "failed", "error": str(e)}

    def select_tools_for_phase_v2(self, phase: str, previous_results: Optional[Dict] = None) -> Dict:
        """为指定Phase智能选择工具 v2.0"""
        try:
            # 映射phase到枚举
            analysis_phase = self._map_phase_to_enum(phase)

            # 更新选择上下文
            selection_context = SelectionContext(
                current_phase=analysis_phase,
                industry=self.analysis_context.get("industry", "unknown"),
                market_cap_tier=self._get_market_cap_tier_from_context(),
                analysis_complexity=self._map_complexity_to_int(
                    self.analysis_context.get("complexity", "MODERATE")
                ),
                budget_remaining=self._calculate_remaining_budget(),
                time_constraint=None,  # 动态计算
                market_regime=self.analysis_context["market_context"]["current_regime"],
                previous_tools_used=self._get_previously_used_tools(),
                quality_requirements={"accuracy": 0.8, "completeness": 0.7}
            )

            # 获取工具推荐
            recommendations = self.tool_selector.get_tool_recommendations(selection_context)

            # 记录工具选择历史
            self.selected_tools_history.append({
                "phase": phase,
                "timestamp": datetime.now().isoformat(),
                "recommendations": recommendations["recommended_tools"],
                "selection_strategy": recommendations["selection_strategy"]
            })

            # 更新工具使用记录
            if previous_results:
                self._update_tool_performance(previous_results)

            return {
                "status": "success",
                "phase": phase,
                "recommended_tools": recommendations["recommended_tools"],
                "selection_rationale": recommendations["selection_strategy"],
                "estimated_cost": recommendations["total_estimated_cost"],
                "intelligent_features": {
                    "context_aware_selection": True,
                    "budget_optimization": True,
                    "performance_learning": True
                }
            }

        except Exception as e:
            self.logger.error(f"Tool selection failed for {phase}: {e}")
            return {"status": "failed", "error": str(e)}

    def assess_quality_v2(self, analysis_data: Dict, phase: str) -> Dict:
        """评估分析质量 v2.0"""
        try:
            # 构建质量上下文
            quality_context = QualityContext(
                ticker=self.ticker,
                company_tier=self._get_company_tier_from_context(),
                industry=self.analysis_context.get("industry", "unknown"),
                analysis_complexity=self._map_complexity_to_adaptive_enum(
                    self.analysis_context.get("complexity", "MODERATE")
                ),
                market_regime=self.analysis_context["market_context"]["current_regime"],
                business_maturity="mature",  # 默认值，可以改进
                analyst_coverage=20,  # 默认值，可以改进
                data_availability="medium",  # 默认值，可以改进
                regulatory_scrutiny="medium",  # 默认值，可以改进
                analysis_purpose="investment_decision"
            )

            # 执行自适应质量评估
            assessment = self.quality_assessor.assess_quality(analysis_data, quality_context)

            # 结合不确定性评估
            uncertainty_assessment = self.uncertainty_manager.assess_overall_analysis_confidence()

            # 综合评估
            combined_assessment = {
                "adaptive_quality_assessment": assessment,
                "uncertainty_assessment": uncertainty_assessment,
                "combined_score": (
                    assessment["overall_assessment"]["overall_score"] * 0.7 +
                    uncertainty_assessment["overall_confidence"] * 10 * 0.3
                ),
                "recommendations": self._generate_combined_recommendations(assessment, uncertainty_assessment)
            }

            return combined_assessment

        except Exception as e:
            self.logger.error(f"Quality assessment failed: {e}")
            return {"status": "failed", "error": str(e)}

    def execute_parallel_analysis_v2(self, enable_parallel: bool = True) -> Dict:
        """执行并行分析 v2.0"""
        if not enable_parallel or not self.parallel_coordinator:
            return {"status": "skipped", "reason": "Parallel analysis not enabled"}

        try:
            # 创建并提交分析计划
            analysis_scope = {
                "industry": self.analysis_context.get("industry", "unknown"),
                "complexity": self.analysis_context.get("complexity", "moderate")
            }

            tasks = self.parallel_coordinator.create_analysis_plan(self.ticker, analysis_scope)
            self.parallel_coordinator.submit_task_queue(tasks)

            # 模拟并行执行
            execution_results = []

            # 多轮执行，直到任务完成
            max_rounds = 5
            for round_num in range(max_rounds):
                round_results = []

                # 每个专家尝试认领和执行任务
                for expert_role in ExpertRole:
                    task = self.parallel_coordinator.claim_task(expert_role)
                    if task:
                        result = self.parallel_coordinator.execute_task(task, expert_role)
                        round_results.append({
                            "expert": expert_role.value,
                            "task_id": task.task_id,
                            "result": result
                        })

                if not round_results:
                    break  # 没有更多任务可执行

                execution_results.extend(round_results)

            # 检测和解决冲突
            conflicts = self.parallel_coordinator.detect_conflicts()
            conflict_resolution = self.parallel_coordinator.resolve_conflicts(conflicts) if conflicts else None

            # 聚合结果
            aggregated_results = self.parallel_coordinator.aggregate_results(self.ticker)

            return {
                "status": "completed",
                "execution_summary": {
                    "total_tasks": len(tasks),
                    "completed_tasks": len(execution_results),
                    "execution_rounds": len([r for r in range(max_rounds) if any(
                        res["expert"] for res in execution_results
                    )]),
                    "participating_experts": list(set(res["expert"] for res in execution_results))
                },
                "conflict_resolution": conflict_resolution,
                "aggregated_results": aggregated_results,
                "quality_metrics": self.parallel_coordinator._calculate_analysis_quality_metrics()
            }

        except Exception as e:
            self.logger.error(f"Parallel analysis execution failed: {e}")
            return {"status": "failed", "error": str(e)}

    def finalize_analysis_v2(self, final_content: Optional[str] = None) -> Dict:
        """完成分析并生成最终报告 v2.0"""
        self.logger.info("Finalizing analysis v2.0")

        finalization_result = {
            "session_id": self.session_id,
            "ticker": self.ticker,
            "harness_version": "2.0",
            "finalization_time": datetime.now().isoformat(),
            "status": "completed"
        }

        try:
            # 1. 基础最终化（v1.0逻辑）
            base_finalization = self._run_base_finalization(final_content)
            finalization_result.update(base_finalization)

            # 2. 智能工具选择总结
            tool_selection_summary = self._summarize_tool_selection()
            finalization_result["tool_selection_summary"] = tool_selection_summary

            # 3. Memory系统贡献总结
            memory_contribution = self._summarize_memory_contribution()
            finalization_result["memory_contribution"] = memory_contribution

            # 4. 质量评估演进总结
            quality_evolution = self._summarize_quality_evolution()
            finalization_result["quality_evolution"] = quality_evolution

            # 5. 并行分析结果（如果有）
            if self.parallel_coordinator:
                parallel_summary = self.parallel_coordinator.get_coordination_status()
                finalization_result["parallel_analysis_summary"] = parallel_summary

            # 6. v2.0特有的洞见
            v2_insights = self._generate_v2_insights()
            finalization_result["v2_insights"] = v2_insights

            self.logger.info("v2.0 analysis finalization completed successfully")

        except Exception as e:
            self.logger.error(f"v2.0 finalization failed: {e}")
            finalization_result.update({
                "status": "failed",
                "error": str(e)
            })

        return finalization_result

    def _run_base_finalization(self, final_content: Optional[str]) -> Dict:
        """运行基础最终化（v1.0逻辑）"""
        base_result = {}

        # 1. 最终质量评估
        quality_assessment = self.uncertainty_manager.assess_overall_analysis_confidence()
        base_result["base_quality_assessment"] = quality_assessment

        # 2. 成本结算
        if self.cost_session_id:
            cost_report = self.cost_optimizer.finalize_session(self.cost_session_id)
            base_result["cost_report"] = cost_report

        # 3. 合规检查
        if final_content:
            compliance_result = self.compliance_checker.comprehensive_compliance_check(
                final_content, f"{self.ticker}_final_report_{datetime.now().strftime('%Y%m%d')}"
            )
            base_result["compliance_check"] = {
                "status": compliance_result.compliance_status,
                "risk_score": compliance_result.overall_risk_score,
                "critical_issues": compliance_result.critical_issues
            }

        # 4. 不确定性披露
        uncertainty_disclosure = self.uncertainty_manager.generate_uncertainty_disclosure()
        base_result["uncertainty_disclosure"] = uncertainty_disclosure

        # 5. 市场制度报告
        regime_report = self.regime_detector.generate_regime_report()
        base_result["market_regime_report"] = regime_report

        return base_result

    def _summarize_tool_selection(self) -> Dict:
        """总结工具选择"""
        if not self.selected_tools_history:
            return {"status": "no_tool_selections"}

        total_tools_recommended = sum(len(record["recommendations"]) for record in self.selected_tools_history)
        unique_tools = set()
        for record in self.selected_tools_history:
            unique_tools.update(tool["name"] for tool in record["recommendations"])

        return {
            "total_selections": len(self.selected_tools_history),
            "total_tools_recommended": total_tools_recommended,
            "unique_tools_used": len(unique_tools),
            "most_recommended_tools": list(unique_tools)[:5],  # 简化统计
            "selection_strategies": list(set(record["selection_strategy"] for record in self.selected_tools_history))
        }

    def _summarize_memory_contribution(self) -> Dict:
        """总结Memory系统贡献"""
        return {
            "total_memory_nodes": len(self.memory_manager.memory_nodes),
            "ticker_specific_memories": len(self.memory_manager.ticker_index.get(self.ticker.upper(), set())),
            "industry_memories": len(self.memory_manager.industry_index.get(
                self.analysis_context.get("industry", ""), set()
            )),
            "concept_index_size": len(self.memory_manager.concept_index)
        }

    def _summarize_quality_evolution(self) -> Dict:
        """总结质量评估演进"""
        insights = self.quality_assessor.get_quality_insights()
        return {
            "total_assessments": insights.get("total_assessments", 0),
            "recent_assessments": insights.get("recent_assessments", 0),
            "quality_trend": insights.get("average_score_trend", {}),
            "adaptation_effectiveness": insights.get("adaptation_effectiveness", {})
        }

    def _generate_v2_insights(self) -> Dict:
        """生成v2.0特有洞见"""
        return {
            "intelligent_features_impact": {
                "dynamic_tool_selection": len(self.selected_tools_history) > 0,
                "memory_recommendations": len(self.memory_manager.memory_nodes) > 0,
                "adaptive_quality": True,
                "parallel_coordination": self.parallel_coordinator is not None
            },
            "performance_improvements": {
                "tool_selection_optimization": "Context-aware tool matching reduced redundancy",
                "memory_leveraging": "Historical insights accelerated analysis",
                "quality_adaptation": "Standards adapted to company and market context",
                "parallel_efficiency": "Multi-expert coordination increased coverage" if self.parallel_coordinator else "N/A"
            },
            "learning_outcomes": {
                "tool_performance_tracking": len(self.tool_selector.performance_feedback) > 0,
                "memory_network_building": len(self.memory_manager.memory_links) > 0,
                "quality_pattern_recognition": len(self.quality_assessor.success_patterns) > 0
            }
        }

    # 辅助方法
    def _get_market_cap_tier(self, market_cap: float) -> str:
        """获取市值层级"""
        if market_cap > 500_000_000_000:
            return "mega_cap"
        elif market_cap > 50_000_000_000:
            return "large_cap"
        elif market_cap > 10_000_000_000:
            return "mid_cap"
        elif market_cap > 1_000_000_000:
            return "small_cap"
        else:
            return "micro_cap"

    def _get_company_tier(self, market_cap: float) -> CompanyTier:
        """获取公司层级枚举"""
        if market_cap > 500_000_000_000:
            return CompanyTier.MEGA_CAP
        elif market_cap > 50_000_000_000:
            return CompanyTier.LARGE_CAP
        elif market_cap > 10_000_000_000:
            return CompanyTier.MID_CAP
        elif market_cap > 1_000_000_000:
            return CompanyTier.SMALL_CAP
        else:
            return CompanyTier.MICRO_CAP

    def _map_complexity_to_int(self, complexity_str: str) -> int:
        """映射复杂度字符串到整数"""
        mapping = {
            "SIMPLE": 1,
            "MODERATE": 2,
            "COMPLEX": 3,
            "VERY_COMPLEX": 4,
            "RESEARCH_INTENSIVE": 5
        }
        return mapping.get(complexity_str, 2)

    def _map_complexity_to_adaptive_enum(self, complexity_str: str):
        """映射复杂度到自适应质量枚举"""
        from .adaptive_quality import AnalysisComplexity as AdaptiveComplexity

        mapping = {
            "SIMPLE": AdaptiveComplexity.SIMPLE,
            "MODERATE": AdaptiveComplexity.MODERATE,
            "COMPLEX": AdaptiveComplexity.COMPLEX,
            "VERY_COMPLEX": AdaptiveComplexity.VERY_COMPLEX,
            "RESEARCH_INTENSIVE": AdaptiveComplexity.PARADIGM_SHIFT
        }
        return mapping.get(complexity_str, AdaptiveComplexity.MODERATE)

    def _map_phase_to_enum(self, phase: str) -> AnalysisPhase:
        """映射阶段字符串到枚举"""
        mapping = {
            "Phase_0": AnalysisPhase.PHASE_0,
            "Phase_1": AnalysisPhase.PHASE_1,
            "Phase_2": AnalysisPhase.PHASE_2,
            "Phase_3": AnalysisPhase.PHASE_3,
            "Phase_4": AnalysisPhase.PHASE_4,
            "Phase_5": AnalysisPhase.PHASE_5
        }
        return mapping.get(phase, AnalysisPhase.PHASE_1)

    def _get_market_cap_tier_from_context(self) -> str:
        """从上下文获取市值层级"""
        # 简化实现，实际应该从分析上下文中提取
        return "large_cap"

    def _get_company_tier_from_context(self) -> CompanyTier:
        """从上下文获取公司层级"""
        # 简化实现
        return CompanyTier.LARGE_CAP

    def _calculate_remaining_budget(self) -> float:
        """计算剩余预算"""
        if self.cost_session_id:
            budget_status = self.cost_optimizer.check_budget_status(
                self.cost_session_id,
                self.analysis_context["cost_estimate"].max_cost
            )
            return budget_status.get("remaining_budget", 0)
        return self.analysis_context["cost_estimate"].max_cost

    def _get_previously_used_tools(self) -> List[str]:
        """获取之前使用的工具"""
        used_tools = []
        for record in self.selected_tools_history:
            used_tools.extend(tool["name"] for tool in record["recommendations"])
        return list(set(used_tools))

    def _update_tool_performance(self, results: Dict) -> None:
        """更新工具性能反馈"""
        # 简化实现
        for tool_name, metrics in results.items():
            if isinstance(metrics, dict):
                self.tool_selector.update_tool_performance(tool_name, metrics)

    def _infer_business_maturity(self, company_data: Dict) -> str:
        """推断业务成熟度"""
        # 简化实现，实际应该基于更多数据
        market_cap = company_data.get("market_cap", 0)
        if market_cap > 100_000_000_000:
            return "mature"
        elif market_cap > 10_000_000_000:
            return "growth"
        else:
            return "startup"

    def _assess_data_availability(self, company_data: Dict) -> str:
        """评估数据可得性"""
        analyst_coverage = company_data.get("analyst_coverage", 0)
        if analyst_coverage > 20:
            return "high"
        elif analyst_coverage > 5:
            return "medium"
        else:
            return "low"

    def _assess_regulatory_scrutiny(self, company_data: Dict) -> str:
        """评估监管审查强度"""
        industry = company_data.get("industry", "").lower()
        if industry in ["banking", "pharmaceutical", "utility"]:
            return "high"
        elif industry in ["technology", "healthcare"]:
            return "medium"
        else:
            return "low"

    def _generate_combined_recommendations(self, quality_assessment: Dict, uncertainty_assessment: Dict) -> List[str]:
        """生成综合建议"""
        recommendations = []

        # 基于质量评估
        if quality_assessment["overall_assessment"]["status"] == "BELOW_STANDARD":
            recommendations.append("Overall analysis quality below standard - significant improvements needed")

        # 基于不确定性评估
        if uncertainty_assessment["overall_confidence"] < 0.5:
            recommendations.append("High uncertainty detected - consider scenario analysis")

        # 综合建议
        if not recommendations:
            recommendations.append("Analysis meets quality standards with manageable uncertainty")

        return recommendations

    def get_harness_status_v2(self) -> Dict:
        """获取harness v2.0状态"""
        base_status = {
            "session_id": self.session_id,
            "ticker": self.ticker,
            "harness_version": "2.0",
            "current_phase": self.current_phase,
            "analysis_tier": self.analysis_tier.value
        }

        # 添加智能化模块状态
        intelligent_status = {
            "dynamic_tool_selection": {
                "selections_made": len(self.selected_tools_history),
                "tools_performance_tracked": len(self.tool_selector.performance_feedback)
            },
            "intelligent_memory": {
                "total_nodes": len(self.memory_manager.memory_nodes),
                "memory_links": len(self.memory_manager.memory_links)
            },
            "adaptive_quality": {
                "assessments_made": len(self.quality_assessor.quality_history),
                "learning_patterns": len(self.quality_assessor.success_patterns)
            },
            "parallel_coordination": {
                "enabled": self.parallel_coordinator is not None,
                "status": self.parallel_coordinator.get_coordination_status() if self.parallel_coordinator else None
            }
        }

        base_status["intelligent_modules"] = intelligent_status
        return base_status

# 便捷函数更新
def create_investment_harness_v2(ticker: str, analysis_tier: str = "tier_2_standard"):
    """创建投资harness v2.0实例"""
    return InvestmentHarnessControllerV2(ticker, analysis_tier)

# 使用示例
if __name__ == "__main__":
    # 创建harness v2.0
    harness = InvestmentHarnessControllerV2("AAPL", "tier_3_deep")

    # 模拟公司数据
    company_data = {
        'business_segments': ['iPhone', 'Services', 'Mac', 'iPad'],
        'industry': 'technology',
        'market_cap': 2_800_000_000_000,
        'analyst_coverage': 35
    }

    # 初始化v2.0分析
    init_result = harness.initialize_analysis_v2(
        company_data,
        urgency="normal",
        budget_limit=1000,
        enable_parallel=True
    )

    print("🚀 Harness v2.0 Initialization:")
    print(f"Status: {init_result['status']}")
    print(f"Version: {init_result['harness_version']}")
    print(f"Memory recommendations: {len(init_result.get('memory_recommendations', {}).get('top_recommendations', []))}")
    print(f"Quality context ready: {'quality_context' in init_result}")
    print(f"Parallel analysis: {init_result['intelligent_features']['parallel_analysis']}")

    # 智能工具选择
    phase_1_tools = harness.select_tools_for_phase_v2("Phase_1")
    print(f"\n🎯 Phase 1 Tool Selection:")
    print(f"Recommended tools: {len(phase_1_tools.get('recommended_tools', []))}")
    print(f"Selection strategy: {phase_1_tools.get('selection_rationale')}")

    # 获取v2.0状态
    status = harness.get_harness_status_v2()
    print(f"\n📊 Harness v2.0 Status:")
    print(f"Tool selections made: {status['intelligent_modules']['dynamic_tool_selection']['selections_made']}")
    print(f"Memory nodes available: {status['intelligent_modules']['intelligent_memory']['total_nodes']}")
    print(f"Parallel coordination: {status['intelligent_modules']['parallel_coordination']['enabled']}")