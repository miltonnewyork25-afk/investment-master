#!/usr/bin/env python3
"""
Investment-Specific Harness Package
===================================

投资大师框架v19.9+ 投资特化harness系统
实现从"分析工具"到"投资系统"的进化

核心模块:
- uncertainty_manager: 处理投资分析中的不确定性
- market_regime_detector: 实时市场环境感知与分析权重调整
- cost_optimizer: 智能成本控制与预算管理
- compliance_layer: 监管合规检查与风险防控

Version: 1.0
Author: 投资大师 Framework
"""

from .uncertainty_manager import (
    InvestmentUncertaintyManager,
    UncertaintyType,
    ResolutionStrategy,
    UncertaintyEvent
)

from .market_regime_detector import (
    MarketRegimeDetector,
    MarketRegime,
    RegimeIndicator,
    MarketContext
)

from .cost_optimizer import (
    InvestmentCostOptimizer,
    AnalysisComplexity,
    AnalysisTier,
    CostEstimate
)

from .compliance_layer import (
    InvestmentComplianceChecker,
    ComplianceRisk,
    RiskLevel,
    ComplianceReport
)

# Package metadata
__version__ = "1.0.0"
__author__ = "投资大师 Framework"
__description__ = "Investment-specific harness system for advanced financial analysis"

# Export main classes for easy import
__all__ = [
    # Uncertainty Management
    'InvestmentUncertaintyManager',
    'UncertaintyType',
    'ResolutionStrategy',
    'UncertaintyEvent',

    # Market Regime Detection
    'MarketRegimeDetector',
    'MarketRegime',
    'RegimeIndicator',
    'MarketContext',

    # Cost Optimization
    'InvestmentCostOptimizer',
    'AnalysisComplexity',
    'AnalysisTier',
    'CostEstimate',

    # Compliance
    'InvestmentComplianceChecker',
    'ComplianceRisk',
    'RiskLevel',
    'ComplianceReport'
]

# Quick access functions
def create_investment_harness(ticker: str, analysis_tier: str = "tier_2_standard"):
    """快速创建投资harness实例"""
    from .harness_controller import InvestmentHarnessController
    return InvestmentHarnessController(ticker, analysis_tier)

def check_compliance(content: str, document_id: str):
    """快速合规检查"""
    checker = InvestmentComplianceChecker()
    return checker.comprehensive_compliance_check(content, document_id)