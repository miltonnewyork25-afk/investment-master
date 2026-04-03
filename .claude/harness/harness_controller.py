#!/usr/bin/env python3
"""
Investment Harness Controller
============================

投资harness主控制器，协调四个核心模块：
1. 不确定性管理
2. 市场制度检测
3. 成本优化
4. 合规检查

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import json
import logging
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime
from pathlib import Path

from .uncertainty_manager import InvestmentUncertaintyManager, UncertaintyType, ResolutionStrategy
from .market_regime_detector import MarketRegimeDetector, MarketRegime, RegimeIndicator
from .cost_optimizer import InvestmentCostOptimizer, AnalysisComplexity, AnalysisTier
from .compliance_layer import InvestmentComplianceChecker, ComplianceRisk, RiskLevel

class InvestmentHarnessController:
    """投资harness主控制器"""

    def __init__(self, ticker: str, initial_tier: str = "tier_2_standard"):
        self.ticker = ticker
        self.session_id = f"{ticker}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        # 初始化四个核心模块
        self.uncertainty_manager = InvestmentUncertaintyManager(ticker, self.session_id)
        self.regime_detector = MarketRegimeDetector()
        self.cost_optimizer = InvestmentCostOptimizer()
        self.compliance_checker = InvestmentComplianceChecker()

        # 分析状态
        self.analysis_tier = AnalysisTier(initial_tier) if isinstance(initial_tier, str) else initial_tier
        self.current_phase = "initialization"
        self.analysis_context = {}
        self.cost_session_id: Optional[str] = None

        # 启动日志
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(f"harness_{ticker}")

    def initialize_analysis(self, company_data: Dict, urgency: str = "normal",
                          budget_limit: Optional[float] = None) -> Dict:
        """初始化分析环境"""
        self.logger.info(f"Initializing harness for {self.ticker}")

        initialization_result = {
            "ticker": self.ticker,
            "session_id": self.session_id,
            "initialization_time": datetime.now().isoformat(),
            "status": "initialized"
        }

        try:
            # 1. 评估分析复杂度
            complexity, complexity_scores = self.cost_optimizer.assess_analysis_complexity(
                self.ticker, company_data
            )

            # 2. 推荐分析层级
            recommended_tier, recommendation_reason = self.cost_optimizer.recommend_analysis_tier(
                complexity, urgency, budget_limit
            )

            # 3. 创建成本估算
            cost_estimate = self.cost_optimizer.create_cost_estimate(
                self.ticker, recommended_tier, complexity_scores
            )

            # 4. 检测市场制度
            # 添加一些基础市场信号（实际使用时应从市场数据源获取）
            market_context = self.regime_detector.assess_current_regime()

            # 5. 获取分析权重
            analysis_weights = self.regime_detector.get_analysis_weights_for_regime(
                market_context.current_regime
            )

            # 6. 开始成本追踪
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

            initialization_result.update({
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
            })

            self.logger.info(f"Initialization complete. Tier: {recommended_tier.value}, "
                           f"Estimated cost: ${cost_estimate.estimated_cost:.2f}")

        except Exception as e:
            self.logger.error(f"Initialization failed: {e}")
            initialization_result.update({
                "status": "failed",
                "error": str(e)
            })

        return initialization_result

    def handle_tool_failure(self, tool_name: str, error_details: str) -> Dict:
        """处理工具失败"""
        self.logger.warning(f"Tool failure: {tool_name} - {error_details}")

        # 通过不确定性管理器处理
        result = self.uncertainty_manager.handle_data_failure(tool_name, error_details)

        # 如果成本追踪启用，记录失败成本
        if self.cost_session_id:
            self.cost_optimizer.track_tool_usage(
                self.cost_session_id, f"{tool_name}_failed", 0.0
            )

        return result

    def handle_analysis_contradiction(self, analysis_a: str, analysis_b: str,
                                    severity: float = 0.5) -> Dict:
        """处理分析矛盾"""
        self.logger.info(f"Handling analysis contradiction (severity: {severity:.2f})")

        # 通过不确定性管理器处理
        result = self.uncertainty_manager.handle_contradiction(
            analysis_a, analysis_b, severity
        )

        # 如果是高严重性矛盾，可能需要调整市场制度解读
        if severity > 0.7:
            self.logger.warning("High severity contradiction detected - reviewing market context")

        return result

    def track_analysis_progress(self, phase: str, tokens_used: int,
                              tools_called: List[str]) -> Dict:
        """追踪分析进度"""
        self.current_phase = phase

        progress_result = {
            "phase": phase,
            "timestamp": datetime.now().isoformat(),
            "tokens_used": tokens_used,
            "tools_called": len(tools_called)
        }

        # 成本追踪
        if self.cost_session_id:
            # 假设输入输出token比例 2:1
            input_tokens = int(tokens_used * 0.67)
            output_tokens = int(tokens_used * 0.33)

            cost_result = self.cost_optimizer.track_token_usage(
                self.cost_session_id, input_tokens, output_tokens
            )

            # 追踪工具使用
            for tool in tools_called:
                self.cost_optimizer.track_tool_usage(self.cost_session_id, tool)

            # 检查预算状态
            if "cost_estimate" in self.analysis_context:
                budget_status = self.cost_optimizer.check_budget_status(
                    self.cost_session_id,
                    self.analysis_context["cost_estimate"].max_cost
                )
                progress_result["budget_status"] = budget_status

                # 如果预算紧张，提供优化建议
                if budget_status.get("status") in ["warning", "critical"]:
                    optimizations = self.cost_optimizer.suggest_cost_optimization(
                        self.cost_session_id, phase
                    )
                    progress_result["cost_optimizations"] = optimizations

        return progress_result

    def assess_analysis_quality(self) -> Dict:
        """评估分析质量"""
        quality_assessment = {
            "assessment_time": datetime.now().isoformat(),
            "overall_confidence": 0.0,
            "quality_factors": {}
        }

        # 不确定性评估
        uncertainty_assessment = self.uncertainty_manager.assess_overall_analysis_confidence()
        quality_assessment["uncertainty_analysis"] = uncertainty_assessment
        quality_assessment["overall_confidence"] = uncertainty_assessment["overall_confidence"]

        # 市场制度一致性检查
        current_context = self.regime_detector.assess_current_regime()
        regime_adjustments = self.regime_detector.should_adjust_methodology(current_context)

        if regime_adjustments:
            quality_assessment["regime_adjustments_needed"] = regime_adjustments
            # 如果需要重大方法论调整，降低置信度
            quality_assessment["overall_confidence"] *= 0.9

        return quality_assessment

    def compliance_check(self, content: str, document_type: str = "analysis_report") -> Dict:
        """执行合规检查"""
        self.logger.info("Executing compliance check")

        # 执行全面合规检查
        compliance_report = self.compliance_checker.comprehensive_compliance_check(
            content=content,
            document_id=f"{self.ticker}_{document_type}_{datetime.now().strftime('%Y%m%d')}",
            analysis_type=document_type
        )

        # 生成摘要
        summary = self.compliance_checker.generate_compliance_summary(compliance_report)

        result = {
            "compliance_status": compliance_report.compliance_status,
            "risk_score": compliance_report.overall_risk_score,
            "total_issues": compliance_report.total_issues,
            "critical_issues": compliance_report.critical_issues,
            "summary": summary,
            "detailed_report": compliance_report
        }

        # 如果有严重合规问题，记录到不确定性管理器
        if compliance_report.critical_issues > 0:
            self.uncertainty_manager.handle_low_confidence(
                f"Compliance check failed with {compliance_report.critical_issues} critical issues",
                0.1  # 极低置信度
            )

        return result

    def finalize_analysis(self, final_content: Optional[str] = None) -> Dict:
        """完成分析并生成最终报告"""
        self.logger.info("Finalizing analysis")

        finalization_result = {
            "session_id": self.session_id,
            "ticker": self.ticker,
            "finalization_time": datetime.now().isoformat(),
            "status": "completed"
        }

        try:
            # 1. 最终质量评估
            quality_assessment = self.assess_analysis_quality()
            finalization_result["quality_assessment"] = quality_assessment

            # 2. 成本结算
            if self.cost_session_id:
                cost_report = self.cost_optimizer.finalize_session(self.cost_session_id)
                finalization_result["cost_report"] = cost_report

            # 3. 合规检查（如果提供了内容）
            if final_content:
                compliance_result = self.compliance_check(final_content)
                finalization_result["compliance_check"] = compliance_result

            # 4. 生成不确定性披露
            uncertainty_disclosure = self.uncertainty_manager.generate_uncertainty_disclosure()
            finalization_result["uncertainty_disclosure"] = uncertainty_disclosure

            # 5. 市场制度报告
            regime_report = self.regime_detector.generate_regime_report()
            finalization_result["market_regime_report"] = regime_report

            self.logger.info("Analysis finalization completed successfully")

        except Exception as e:
            self.logger.error(f"Finalization failed: {e}")
            finalization_result.update({
                "status": "failed",
                "error": str(e)
            })

        return finalization_result

    def save_session_data(self, output_dir: str) -> bool:
        """保存session数据"""
        try:
            output_path = Path(output_dir)
            output_path.mkdir(parents=True, exist_ok=True)

            # 保存各模块数据
            session_files = {
                "uncertainty_log.json": self.uncertainty_manager.save_uncertainty_log,
                "regime_context.json": self.regime_detector.save_regime_context,
                "cost_profile.json": lambda f: self.cost_optimizer.save_cost_optimization_profile(
                    self.ticker, f
                )
            }

            for filename, save_func in session_files.items():
                file_path = output_path / filename
                if not save_func(str(file_path)):
                    self.logger.warning(f"Failed to save {filename}")
                    return False

            # 保存session摘要
            session_summary = {
                "session_id": self.session_id,
                "ticker": self.ticker,
                "analysis_tier": self.analysis_tier.value,
                "current_phase": self.current_phase,
                "analysis_context": self.analysis_context,
                "generated_at": datetime.now().isoformat()
            }

            with open(output_path / "session_summary.json", 'w', encoding='utf-8') as f:
                json.dump(session_summary, f, indent=2, ensure_ascii=False, default=str)

            self.logger.info(f"Session data saved to {output_path}")
            return True

        except Exception as e:
            self.logger.error(f"Failed to save session data: {e}")
            return False

    def get_current_status(self) -> Dict:
        """获取当前harness状态"""
        return {
            "session_id": self.session_id,
            "ticker": self.ticker,
            "current_phase": self.current_phase,
            "analysis_tier": self.analysis_tier.value,
            "active_uncertainties": len([
                e for e in self.uncertainty_manager.uncertainty_events
                if e.resolved_at is None
            ]),
            "current_market_regime": (
                self.regime_detector.current_regime.value
                if self.regime_detector.current_regime else "unknown"
            ),
            "budget_status": (
                self.cost_optimizer.check_budget_status(
                    self.cost_session_id,
                    self.analysis_context.get("cost_estimate", {}).get("max_cost", 100)
                ) if self.cost_session_id else None
            )
        }

# 使用示例
if __name__ == "__main__":
    # 创建harness控制器
    harness = InvestmentHarnessController("AAPL", "tier_2_standard")

    # 模拟公司数据
    company_data = {
        'business_segments': ['iPhone', 'Services', 'Mac', 'iPad'],
        'industry': 'Technology',
        'market_cap': 2_800_000_000_000,  # $2.8T
        'analyst_coverage': 35
    }

    # 初始化分析
    init_result = harness.initialize_analysis(company_data, urgency="normal", budget_limit=500)
    print("Initialization result:")
    print(json.dumps(init_result, indent=2, default=str))

    # 模拟分析进度追踪
    progress = harness.track_analysis_progress("Phase_1", 50000, ["fmp_data", "baggers_summary"])
    print("\nProgress tracking:")
    print(json.dumps(progress, indent=2, default=str))

    # 获取当前状态
    status = harness.get_current_status()
    print("\nCurrent status:")
    print(json.dumps(status, indent=2, default=str))