#!/usr/bin/env python3
"""
Investment Harness Configuration
===============================

投资harness系统配置文件
定义默认参数、阈值和策略

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

from typing import Dict, List, Optional
from enum import Enum
from dataclasses import dataclass

class HarnessMode(Enum):
    """Harness运行模式"""
    DEVELOPMENT = "development"     # 开发模式：详细日志，宽松阈值
    PRODUCTION = "production"       # 生产模式：优化性能，严格阈值
    COST_OPTIMIZED = "cost_opt"    # 成本优化模式：严格预算控制
    RESEARCH_INTENSIVE = "research" # 研究密集模式：放宽成本限制

@dataclass
class HarnessConfig:
    """Harness配置类"""

    # 基础配置
    mode: HarnessMode = HarnessMode.PRODUCTION
    enable_logging: bool = True
    log_level: str = "INFO"

    # 不确定性管理配置
    uncertainty_config: Dict = None

    # 市场制度检测配置
    regime_config: Dict = None

    # 成本优化配置
    cost_config: Dict = None

    # 合规检查配置
    compliance_config: Dict = None

    def __post_init__(self):
        """初始化默认配置"""
        if self.uncertainty_config is None:
            self.uncertainty_config = self._get_default_uncertainty_config()

        if self.regime_config is None:
            self.regime_config = self._get_default_regime_config()

        if self.cost_config is None:
            self.cost_config = self._get_default_cost_config()

        if self.compliance_config is None:
            self.compliance_config = self._get_default_compliance_config()

    def _get_default_uncertainty_config(self) -> Dict:
        """默认不确定性管理配置"""
        return {
            "quality_thresholds": {
                "minimum_confidence": 0.3,
                "high_confidence": 0.7,
                "contradiction_tolerance": 0.2,
                "data_completeness": 0.6
            },
            "data_fallback_strategies": {
                "max_fallback_attempts": 3,
                "fallback_timeout_seconds": 30,
                "enable_peer_estimation": True,
                "enable_scenario_analysis": True
            },
            "resolution_priorities": [
                "fallback_data",
                "peer_estimation",
                "scenario_analysis",
                "probability_weighting",
                "monitor_resolve"
            ]
        }

    def _get_default_regime_config(self) -> Dict:
        """默认市场制度检测配置"""
        return {
            "detection_sensitivity": {
                "volatility_threshold": 0.7,
                "credit_stress_threshold": 0.6,
                "sentiment_extreme_threshold": 0.8,
                "flow_reversal_threshold": 0.5,
                "policy_shift_weight": 0.9
            },
            "regime_confidence_threshold": 0.4,
            "signal_retention_hours": 24,
            "analysis_weight_templates": {
                "crisis_mode": {
                    "liquidity": 0.4,
                    "quality": 0.4,
                    "valuation": 0.2
                },
                "bull_growth": {
                    "growth": 0.5,
                    "scalability": 0.3,
                    "valuation": 0.2
                },
                "bear_deep": {
                    "survival": 0.4,
                    "cash_flow": 0.3,
                    "debt_capacity": 0.3
                },
                "recovery_early": {
                    "operating_leverage": 0.4,
                    "cyclical_position": 0.3,
                    "valuation": 0.3
                }
            }
        }

    def _get_default_cost_config(self) -> Dict:
        """默认成本优化配置"""
        mode_multipliers = {
            HarnessMode.DEVELOPMENT: 1.5,      # 开发模式允许更高成本
            HarnessMode.PRODUCTION: 1.0,       # 生产模式标准成本
            HarnessMode.COST_OPTIMIZED: 0.6,   # 成本优化模式严格控制
            HarnessMode.RESEARCH_INTENSIVE: 2.0 # 研究模式放宽限制
        }

        base_budgets = {
            "tier_1_quick": 10,
            "tier_2_standard": 100,
            "tier_3_deep": 500,
            "tier_3_parallel": 2000
        }

        # 根据模式调整预算
        adjusted_budgets = {
            tier: budget * mode_multipliers[self.mode]
            for tier, budget in base_budgets.items()
        }

        return {
            "tier_budgets": adjusted_budgets,
            "token_pricing": {
                "input_token_cost": 0.000003,
                "output_token_cost": 0.000015,
                "tool_call_cost": 0.001,
                "agent_spawn_cost": 0.01
            },
            "budget_alerts": {
                "warning_threshold": 0.7,
                "critical_threshold": 0.9
            },
            "optimization_strategies": {
                "enable_context_compression": True,
                "enable_tool_batching": True,
                "enable_result_caching": True,
                "max_parallel_agents": 4 if self.mode != HarnessMode.COST_OPTIMIZED else 1
            },
            "complexity_multipliers": {
                "simple": 0.8,
                "moderate": 1.0,
                "complex": 1.3,
                "very_complex": 1.6,
                "research_intensive": 2.0
            }
        }

    def _get_default_compliance_config(self) -> Dict:
        """默认合规检查配置"""
        return {
            "risk_thresholds": {
                "critical_risk_limit": 0,      # 严重风险不能超过0个
                "high_risk_limit": 2,          # 高风险最多2个
                "total_risk_score_limit": 50   # 总风险分数限制
            },
            "required_disclaimers": [
                "forward_looking_statements",
                "risk_warnings",
                "not_investment_advice",
                "past_performance_disclaimer"
            ],
            "prohibited_terms": {
                "investment_advice": [
                    "买入", "卖出", "推荐购买", "建议出售",
                    "buy", "sell", "purchase", "dump"
                ],
                "guarantees": [
                    "保证", "确保", "必定", "绝对",
                    "guarantee", "certain", "definitely", "absolutely"
                ],
                "insider_info": [
                    "内部消息", "私下得知", "未公开信息",
                    "inside information", "private tip", "confidential"
                ]
            },
            "bias_detection": {
                "enable_survivorship_bias_check": True,
                "enable_confirmation_bias_check": True,
                "confirmation_bias_threshold": 3,  # 确认性用词不超过3次
                "enable_availability_bias_check": True
            },
            "auto_fix_suggestions": True,
            "generate_compliance_summary": True
        }

# 预设配置模板
PRESET_CONFIGS = {
    "conservative": HarnessConfig(
        mode=HarnessMode.COST_OPTIMIZED,
        uncertainty_config={
            "quality_thresholds": {
                "minimum_confidence": 0.5,  # 更高的最低置信度要求
                "high_confidence": 0.8,
                "contradiction_tolerance": 0.1,  # 更严格的矛盾容忍度
                "data_completeness": 0.8
            }
        }
    ),

    "aggressive_research": HarnessConfig(
        mode=HarnessMode.RESEARCH_INTENSIVE,
        uncertainty_config={
            "quality_thresholds": {
                "minimum_confidence": 0.2,  # 允许更低置信度
                "high_confidence": 0.6,
                "contradiction_tolerance": 0.3,  # 更宽松的矛盾容忍
                "data_completeness": 0.5
            }
        }
    ),

    "production_standard": HarnessConfig(
        mode=HarnessMode.PRODUCTION
        # 使用所有默认配置
    ),

    "development": HarnessConfig(
        mode=HarnessMode.DEVELOPMENT,
        enable_logging=True,
        log_level="DEBUG"
    )
}

def load_config(preset: str = "production_standard") -> HarnessConfig:
    """加载预设配置"""
    if preset in PRESET_CONFIGS:
        return PRESET_CONFIGS[preset]
    else:
        # 默认返回生产标准配置
        return PRESET_CONFIGS["production_standard"]

def create_custom_config(
    mode: HarnessMode = HarnessMode.PRODUCTION,
    max_budget: Optional[float] = None,
    min_confidence: Optional[float] = None,
    enable_parallel_agents: bool = True
) -> HarnessConfig:
    """创建自定义配置"""
    config = HarnessConfig(mode=mode)

    # 自定义预算限制
    if max_budget is not None:
        for tier in config.cost_config["tier_budgets"]:
            config.cost_config["tier_budgets"][tier] = min(
                config.cost_config["tier_budgets"][tier],
                max_budget
            )

    # 自定义置信度要求
    if min_confidence is not None:
        config.uncertainty_config["quality_thresholds"]["minimum_confidence"] = min_confidence

    # 并行agent控制
    if not enable_parallel_agents:
        config.cost_config["optimization_strategies"]["max_parallel_agents"] = 1

    return config

# 配置验证
def validate_config(config: HarnessConfig) -> List[str]:
    """验证配置合理性"""
    warnings = []

    # 检查置信度阈值
    uncertainty_thresholds = config.uncertainty_config["quality_thresholds"]
    if uncertainty_thresholds["minimum_confidence"] > uncertainty_thresholds["high_confidence"]:
        warnings.append("Minimum confidence threshold higher than high confidence threshold")

    # 检查成本配置
    budgets = config.cost_config["tier_budgets"]
    if budgets["tier_1_quick"] >= budgets["tier_2_standard"]:
        warnings.append("Tier 1 budget should be lower than Tier 2")

    # 检查合规风险限制
    compliance_limits = config.compliance_config["risk_thresholds"]
    if compliance_limits["critical_risk_limit"] > 0 and config.mode == HarnessMode.PRODUCTION:
        warnings.append("Production mode should not allow critical compliance risks")

    return warnings

# 使用示例
if __name__ == "__main__":
    # 加载预设配置
    config = load_config("production_standard")
    print(f"Loaded config mode: {config.mode.value}")

    # 验证配置
    warnings = validate_config(config)
    if warnings:
        print("Configuration warnings:")
        for warning in warnings:
            print(f"- {warning}")
    else:
        print("Configuration is valid")

    # 创建自定义配置
    custom_config = create_custom_config(
        mode=HarnessMode.COST_OPTIMIZED,
        max_budget=200,
        min_confidence=0.4,
        enable_parallel_agents=False
    )
    print(f"Custom config max parallel agents: {custom_config.cost_config['optimization_strategies']['max_parallel_agents']}")