"""
顶级基金逆向工程：最优量化参数

基于2020-2025年表现最佳的10家基金的深度逆向分析，
提取可编程的量化选股、买入时机、卖出时机、仓位管理和风险控制参数。

基金来源：
1. Renaissance Medallion (量化)
2. Discovery Capital (宏观对冲)
3. Bridgewater Pure Alpha (系统宏观)
4. D.E. Shaw (量化多策略)
5. Citadel Wellington (多策略)
6. Millennium Management (多策略Pod)
7. Pershing Square (价值激进)
8. Berkshire Hathaway (价值投资)
9. Duquesne Family Office (全球宏观)
10. Appaloosa Management (困境投资)

作者: 投资大师研究团队
日期: 2026-01-26
版本: 1.0
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import json


# ==========================================
# 基础枚举类型
# ==========================================

class InvestmentStyle(Enum):
    """投资风格枚举"""
    VALUE = "value"
    GROWTH = "growth"
    GARP = "garp"  # Growth at Reasonable Price
    MOMENTUM = "momentum"
    CONTRARIAN = "contrarian"
    QUANTITATIVE = "quantitative"
    MACRO = "macro"
    ACTIVIST = "activist"
    DISTRESSED = "distressed"


class MoatType(Enum):
    """护城河类型枚举"""
    BRAND = "brand"
    NETWORK_EFFECT = "network_effect"
    SWITCHING_COST = "switching_cost"
    COST_ADVANTAGE = "cost_advantage"
    INTANGIBLE_ASSET = "intangible_asset"
    EFFICIENT_SCALE = "efficient_scale"
    REGULATORY = "regulatory"


class CatalystType(Enum):
    """催化剂类型枚举"""
    MANAGEMENT_CHANGE = "management_change"
    RESTRUCTURING = "restructuring"
    PRODUCT_LAUNCH = "product_launch"
    COST_CUTTING = "cost_cutting"
    POLICY_CHANGE = "policy_change"
    INDUSTRY_CONSOLIDATION = "industry_consolidation"
    MACRO_SHIFT = "macro_shift"
    VALUATION_RERATE = "valuation_rerate"
    SPIN_OFF = "spin_off"
    BUYBACK = "buyback"


class Sector(Enum):
    """行业枚举"""
    TECHNOLOGY = "technology"
    HEALTHCARE = "healthcare"
    FINANCIALS = "financials"
    CONSUMER_STAPLES = "consumer_staples"
    CONSUMER_DISCRETIONARY = "consumer_discretionary"
    INDUSTRIALS = "industrials"
    COMMUNICATION = "communication"
    ENERGY = "energy"
    MATERIALS = "materials"
    UTILITIES = "utilities"
    REAL_ESTATE = "real_estate"


# ==========================================
# 选股参数配置
# ==========================================

@dataclass
class QualityFactors:
    """质量因子参数 - 基于Buffett/Ackman/顶级基金共性"""

    # ROE要求 (9/10家基金强调)
    roe_min: float = 15.0  # 最低ROE%
    roe_consistency_years: int = 5  # ROE稳定性检验年数
    roe_trend: str = "stable_or_improving"  # 趋势要求

    # ROIC要求 (8/10家基金)
    roic_min: float = 12.0  # 最低ROIC%

    # 利润率要求
    gross_margin_min: float = 25.0  # 最低毛利率%
    operating_margin_min: float = 10.0  # 最低营业利润率%
    profit_margin_trend: str = "stable_or_improving"

    # 盈利质量
    fcf_to_net_income_min: float = 0.80  # FCF/净利润最低比例
    earnings_quality_score_min: int = 3  # 盈利质量评分(1-5)

    # 资产周转
    asset_turnover_min: float = 0.5  # 最低资产周转率


@dataclass
class ValuationFactors:
    """估值因子参数 - 基于价值投资共性"""

    # P/E相关
    pe_max: float = 25.0  # 绝对P/E上限
    pe_vs_history_percentile_max: float = 50.0  # 相对历史P/E百分位上限
    pe_vs_sector_percentile_max: float = 50.0  # 相对行业P/E百分位上限

    # P/B相关
    pb_max: float = 5.0  # 绝对P/B上限
    pb_vs_history_percentile_max: float = 50.0

    # 现金流估值
    fcf_yield_min: float = 0.05  # 最低FCF收益率(5%)
    ev_ebitda_max: float = 15.0  # EV/EBITDA上限
    ev_fcf_max: float = 20.0  # EV/FCF上限

    # 安全边际 (Buffett核心原则)
    margin_of_safety_min: float = 0.25  # 最低安全边际(25%折价)

    # 相对债券
    fcf_yield_vs_10y_treasury_spread_min: float = 0.02  # FCF收益率超国债至少2%


@dataclass
class FinancialHealthFactors:
    """财务健康因子 - 基于Buffett/Ackman偏好"""

    # 杠杆限制 (9/10家强调低负债)
    debt_to_equity_max: float = 1.0  # D/E上限
    debt_to_ebitda_max: float = 3.0  # 净负债/EBITDA上限

    # 偿债能力
    interest_coverage_min: float = 5.0  # 利息覆盖倍数下限
    current_ratio_min: float = 1.5  # 流动比率下限
    quick_ratio_min: float = 1.0  # 速动比率下限

    # 现金流健康
    operating_cash_flow_positive_years: int = 5  # 连续正OCF年数
    fcf_positive_years: int = 4  # 连续正FCF年数


@dataclass
class MoatFactors:
    """护城河因子 - 基于Buffett"经济护城河"概念"""

    moat_required: bool = True  # 是否要求护城河 (8/10家)
    moat_score_min: int = 3  # 护城河评分下限(1-5)

    # 护城河类型权重
    moat_type_weights: Dict[str, float] = field(default_factory=lambda: {
        MoatType.BRAND.value: 0.25,
        MoatType.NETWORK_EFFECT.value: 0.20,
        MoatType.SWITCHING_COST.value: 0.20,
        MoatType.COST_ADVANTAGE.value: 0.15,
        MoatType.INTANGIBLE_ASSET.value: 0.10,
        MoatType.EFFICIENT_SCALE.value: 0.10
    })

    # 护城河持久性
    moat_trend: str = "stable_or_widening"  # 护城河趋势


@dataclass
class ManagementFactors:
    """管理层因子 - 基于Buffett诚信+能力双标准"""

    # 诚信指标
    insider_net_buyer_preferred: bool = True  # 偏好内部人净买入
    accounting_quality: str = "conservative"  # 会计风格偏好
    related_party_transactions_max: float = 0.05  # 关联交易占比上限

    # 能力指标
    capital_allocation_score_min: int = 3  # 资本配置能力(1-5)
    execution_track_record_years: int = 3  # 执行记录检验年数

    # 激励一致性
    insider_ownership_min: float = 0.01  # 内部人持股下限(1%)
    excessive_compensation_flag: bool = False  # 薪酬过高警示


@dataclass
class GrowthFactors:
    """成长因子 - 用于GARP筛选"""

    # 收入增长
    revenue_growth_min: float = 0.05  # 最低收入增速(5%)
    revenue_growth_consistency: int = 3  # 连续正增长年数

    # 盈利增长
    eps_growth_min: float = 0.05  # 最低EPS增速
    eps_growth_3y_cagr_min: float = 0.08  # 3年EPS CAGR下限

    # PEG约束
    peg_max: float = 2.0  # PEG上限

    # 增长质量
    organic_growth_preferred: bool = True  # 偏好有机增长


# ==========================================
# 综合选股参数
# ==========================================

@dataclass
class StockSelectionParameters:
    """综合选股参数"""

    quality: QualityFactors = field(default_factory=QualityFactors)
    valuation: ValuationFactors = field(default_factory=ValuationFactors)
    financial_health: FinancialHealthFactors = field(default_factory=FinancialHealthFactors)
    moat: MoatFactors = field(default_factory=MoatFactors)
    management: ManagementFactors = field(default_factory=ManagementFactors)
    growth: GrowthFactors = field(default_factory=GrowthFactors)

    # 市值约束
    market_cap_min_bn: float = 1.0  # 最低市值(十亿美元)
    market_cap_max_bn: Optional[float] = None  # 最高市值

    # 流动性约束
    avg_daily_volume_min: float = 1_000_000  # 最低日均成交量

    # 行业偏好
    preferred_sectors: List[str] = field(default_factory=lambda: [
        Sector.TECHNOLOGY.value,
        Sector.HEALTHCARE.value,
        Sector.CONSUMER_STAPLES.value,
        Sector.FINANCIALS.value
    ])

    avoided_sectors: List[str] = field(default_factory=lambda: [])

    # 地区偏好
    preferred_regions: List[str] = field(default_factory=lambda: ["US", "Developed"])


# ==========================================
# 买入时机参数
# ==========================================

@dataclass
class MarketSentimentSignals:
    """市场情绪信号 - 基于逆向投资共性"""

    # 恐慌指标 (9/10家在极端悲观时买入)
    vix_buy_signal: float = 25.0  # VIX超过此值触发买入信号
    vix_strong_buy_signal: float = 35.0  # 强买入信号

    # 期权市场
    put_call_ratio_buy_signal: float = 1.2  # Put/Call比率买入信号

    # 投资者情绪
    aaii_bearish_buy_signal: float = 50.0  # AAII看空占比%触发买入

    # 技术面超卖
    rsi_oversold: float = 30.0  # RSI超卖水平


@dataclass
class ValuationTriggers:
    """估值触发条件"""

    # 历史估值
    pe_percentile_buy: float = 30.0  # P/E低于历史30%分位时买入
    pb_percentile_buy: float = 30.0  # P/B低于历史30%分位

    # 绝对估值
    fcf_yield_buy: float = 0.07  # FCF收益率超7%触发买入
    ev_ebitda_buy: float = 10.0  # EV/EBITDA低于10x

    # 相对债券
    equity_risk_premium_buy: float = 0.04  # 股权风险溢价>4%


@dataclass
class CatalystRequirements:
    """催化剂要求"""

    catalyst_required: bool = True  # 是否要求催化剂 (10/10家)

    # 催化剂类型及权重
    catalyst_weights: Dict[str, float] = field(default_factory=lambda: {
        CatalystType.MANAGEMENT_CHANGE.value: 0.15,
        CatalystType.RESTRUCTURING.value: 0.15,
        CatalystType.POLICY_CHANGE.value: 0.15,
        CatalystType.MACRO_SHIFT.value: 0.15,
        CatalystType.COST_CUTTING.value: 0.10,
        CatalystType.BUYBACK.value: 0.10,
        CatalystType.PRODUCT_LAUNCH.value: 0.10,
        CatalystType.VALUATION_RERATE.value: 0.10
    })

    # 催化剂时间框架
    catalyst_timeframe_months_max: int = 18  # 催化剂应在18个月内实现

    # 催化剂清晰度
    catalyst_clarity_score_min: int = 3  # 催化剂清晰度评分(1-5)


@dataclass
class PositionBuildingRules:
    """建仓规则 - 基于分批建仓共性"""

    # 初始仓位 (7/10家分批建仓)
    initial_position_pct: float = 0.02  # 2%初始仓位

    # 加仓条件
    add_on_price_decline: bool = True  # 下跌时加仓
    add_on_decline_threshold: float = -0.10  # 下跌10%考虑加仓
    add_on_thesis_confirmation: bool = True  # 论点确认时加仓

    # 加仓幅度
    add_position_increment: float = 0.02  # 每次加仓2%

    # 最大仓位
    max_position_pct: float = 0.15  # 最大仓位15%


@dataclass
class BuyTimingParameters:
    """买入时机综合参数"""

    market_sentiment: MarketSentimentSignals = field(default_factory=MarketSentimentSignals)
    valuation_triggers: ValuationTriggers = field(default_factory=ValuationTriggers)
    catalyst: CatalystRequirements = field(default_factory=CatalystRequirements)
    position_building: PositionBuildingRules = field(default_factory=PositionBuildingRules)

    # 避免追涨 (9/10家)
    avoid_chasing: bool = True
    max_price_vs_52w_low: float = 1.30  # 股价不超过52周低点30%


# ==========================================
# 卖出时机参数
# ==========================================

@dataclass
class ValuationSellSignals:
    """估值卖出信号"""

    # 估值修复 (8/10家)
    pe_percentile_sell: float = 70.0  # P/E超过历史70%分位考虑卖出

    # 目标价达到
    upside_remaining_sell: float = 0.10  # 上涨空间<10%考虑卖出

    # 相对吸引力
    relative_value_deteriorated: bool = True  # 相对价值恶化时卖出


@dataclass
class StopLossRules:
    """止损规则 - 基于Millennium/Citadel风控"""

    # 价格止损
    hard_stop_loss_pct: float = -0.15  # -15%硬止损 (7/10家)

    # 波动调整止损
    atr_based_stop: bool = True
    atr_multiplier: float = 2.0  # ATR倍数

    # 基本面止损 (10/10家)
    fundamental_stop: bool = True  # 论点失效立即卖出

    # Millennium规则
    millennium_style_stops: Dict[str, float] = field(default_factory=lambda: {
        'cut_capital_50pct': -0.05,  # -5%时仓位减半
        'terminate_position': -0.075  # -7.5%时清仓
    })


@dataclass
class ThesisInvalidation:
    """论点失效条件 - 10/10家强调"""

    # 财务恶化
    earnings_miss_consecutive: int = 2  # 连续2次miss
    revenue_decline_quarters: int = 2  # 连续2季度收入下滑
    margin_deterioration_threshold: float = -0.03  # 利润率下降3%+

    # 竞争恶化
    market_share_loss_threshold: float = -0.05  # 市场份额下降5%+

    # 管理层问题
    management_departure_key: bool = True  # 关键管理层离职
    accounting_red_flag: bool = True  # 会计红旗

    # 护城河侵蚀
    moat_score_decline: int = 1  # 护城河评分下降1分+


@dataclass
class SellTimingParameters:
    """卖出时机综合参数"""

    valuation_signals: ValuationSellSignals = field(default_factory=ValuationSellSignals)
    stop_loss: StopLossRules = field(default_factory=StopLossRules)
    thesis_invalidation: ThesisInvalidation = field(default_factory=ThesisInvalidation)

    # 仓位过大卖出
    position_too_large_threshold: float = 0.20  # 超过20%考虑减仓

    # 更好机会 (9/10家)
    better_opportunity_sell: bool = True

    # 流动性需求
    liquidity_need_sell: bool = True


# ==========================================
# 仓位管理参数
# ==========================================

@dataclass
class ConcentratedStyle:
    """集中型仓位管理 - 基于Buffett/Ackman/Druckenmiller"""

    max_positions: int = 15
    min_positions: int = 7
    max_single_position_pct: float = 0.15  # 最大单一仓位15%
    top_5_max_pct: float = 0.60  # 前5大仓位最大60%
    top_10_max_pct: float = 0.80  # 前10大仓位最大80%


@dataclass
class DiversifiedStyle:
    """分散型仓位管理 - 基于Millennium/Citadel"""

    min_positions: int = 30
    max_positions: int = 100
    max_single_position_pct: float = 0.05  # 最大单一仓位5%
    top_10_max_pct: float = 0.30  # 前10大仓位最大30%


@dataclass
class PositionManagementParameters:
    """仓位管理综合参数"""

    # 风格选择
    style: str = "concentrated"  # "concentrated" 或 "diversified"

    concentrated: ConcentratedStyle = field(default_factory=ConcentratedStyle)
    diversified: DiversifiedStyle = field(default_factory=DiversifiedStyle)

    # 现金管理 (Buffett: $380B+现金)
    cash_min_pct: float = 0.05  # 最低现金5%
    cash_max_pct: float = 0.30  # 最高现金30%
    cash_target_pct: float = 0.15  # 目标现金15%

    # 再平衡
    rebalance_trigger_pct: float = 0.05  # 偏离5%触发再平衡
    rebalance_frequency: str = "quarterly"  # 再平衡频率

    # 行业限制
    max_single_sector_pct: float = 0.30  # 单一行业最大30%
    max_correlated_positions_pct: float = 0.40  # 相关仓位最大40%


# ==========================================
# 风险管理参数
# ==========================================

@dataclass
class PortfolioRiskLimits:
    """组合风险限制"""

    # 组合止损 (10/10家有某种形式的风控)
    portfolio_stop_loss_pct: float = -0.10  # -10%组合止损

    # 波动率限制
    portfolio_volatility_target: float = 0.15  # 目标波动率15%
    portfolio_volatility_max: float = 0.20  # 最大波动率20%

    # VaR限制
    daily_var_limit_pct: float = 0.02  # 日VaR限制2%

    # Beta限制
    portfolio_beta_range: Tuple[float, float] = (0.5, 1.2)  # Beta范围


@dataclass
class ConcentrationLimits:
    """集中度限制"""

    # 单一仓位
    max_single_position_pct: float = 0.15

    # 行业
    max_single_sector_pct: float = 0.30

    # 地区
    max_single_country_pct: float = 0.50  # 除美国外

    # 相关性
    max_highly_correlated_pct: float = 0.40


@dataclass
class LeverageRules:
    """杠杆规则"""

    # 最大杠杆 (非量化基金)
    max_leverage: float = 1.5

    # 净敞口
    net_exposure_range: Tuple[float, float] = (0.5, 1.2)

    # 毛敞口
    gross_exposure_max: float = 2.0


@dataclass
class RiskManagementParameters:
    """风险管理综合参数"""

    portfolio_limits: PortfolioRiskLimits = field(default_factory=PortfolioRiskLimits)
    concentration: ConcentrationLimits = field(default_factory=ConcentrationLimits)
    leverage: LeverageRules = field(default_factory=LeverageRules)

    # 流动性要求
    min_days_to_liquidate: int = 5  # 至少5天内可清仓

    # 相关性监控
    correlation_monitoring: bool = True
    rebalance_on_correlation_change: bool = True


# ==========================================
# 行业配置参数
# ==========================================

@dataclass
class SectorAllocationParameters:
    """行业配置参数"""

    # 行业权重目标
    sector_weights: Dict[str, Dict[str, float]] = field(default_factory=lambda: {
        Sector.TECHNOLOGY.value: {"min": 0.15, "max": 0.35, "neutral": 0.25},
        Sector.HEALTHCARE.value: {"min": 0.10, "max": 0.25, "neutral": 0.15},
        Sector.FINANCIALS.value: {"min": 0.05, "max": 0.20, "neutral": 0.12},
        Sector.CONSUMER_STAPLES.value: {"min": 0.05, "max": 0.15, "neutral": 0.08},
        Sector.CONSUMER_DISCRETIONARY.value: {"min": 0.05, "max": 0.15, "neutral": 0.10},
        Sector.INDUSTRIALS.value: {"min": 0.05, "max": 0.15, "neutral": 0.10},
        Sector.COMMUNICATION.value: {"min": 0.05, "max": 0.15, "neutral": 0.08},
        Sector.ENERGY.value: {"min": 0.00, "max": 0.10, "neutral": 0.04},
        Sector.MATERIALS.value: {"min": 0.00, "max": 0.08, "neutral": 0.03},
        Sector.UTILITIES.value: {"min": 0.00, "max": 0.08, "neutral": 0.03},
        Sector.REAL_ESTATE.value: {"min": 0.00, "max": 0.08, "neutral": 0.02}
    })

    # 行业偏好排序
    preferred_sectors: List[str] = field(default_factory=lambda: [
        Sector.TECHNOLOGY.value,
        Sector.HEALTHCARE.value,
        Sector.CONSUMER_STAPLES.value,
        Sector.FINANCIALS.value
    ])

    underweight_sectors: List[str] = field(default_factory=lambda: [
        Sector.ENERGY.value,
        Sector.MATERIALS.value,
        Sector.UTILITIES.value
    ])


# ==========================================
# 主配置类
# ==========================================

@dataclass
class TopFundsOptimalParameters:
    """
    顶级基金最优参数综合配置

    基于10家2020-2025年表现最佳基金的逆向分析
    """

    # 元数据
    version: str = "1.0"
    created_date: str = "2026-01-26"
    data_source: str = "10 Top Performing Funds 2020-2025"

    # 核心参数模块
    stock_selection: StockSelectionParameters = field(default_factory=StockSelectionParameters)
    buy_timing: BuyTimingParameters = field(default_factory=BuyTimingParameters)
    sell_timing: SellTimingParameters = field(default_factory=SellTimingParameters)
    position_management: PositionManagementParameters = field(default_factory=PositionManagementParameters)
    risk_management: RiskManagementParameters = field(default_factory=RiskManagementParameters)
    sector_allocation: SectorAllocationParameters = field(default_factory=SectorAllocationParameters)

    def to_dict(self) -> dict:
        """转换为字典"""
        import dataclasses
        return dataclasses.asdict(self)

    def to_json(self, indent: int = 2) -> str:
        """转换为JSON字符串"""
        return json.dumps(self.to_dict(), indent=indent, default=str)

    @classmethod
    def from_json(cls, json_str: str) -> 'TopFundsOptimalParameters':
        """从JSON字符串创建实例"""
        data = json.loads(json_str)
        return cls(**data)


# ==========================================
# 简化版参数（快速使用）
# ==========================================

QUICK_SCREENING_PARAMETERS = {
    """
    快速筛选参数 - 基于顶级基金共性的简化版
    """

    # 质量筛选
    "roe_min": 15,
    "roic_min": 12,
    "gross_margin_min": 25,
    "fcf_to_net_income_min": 0.80,

    # 估值筛选
    "pe_max": 25,
    "pe_percentile_max": 50,
    "fcf_yield_min": 0.05,
    "margin_of_safety_min": 0.25,

    # 财务健康
    "debt_to_equity_max": 1.0,
    "interest_coverage_min": 5.0,

    # 护城河
    "moat_required": True,
    "moat_score_min": 3,

    # 仓位管理
    "max_single_position": 0.15,
    "max_positions": 15,
    "min_positions": 7,

    # 止损
    "hard_stop_loss": -0.15,
    "portfolio_stop_loss": -0.10,

    # 买入时机
    "vix_buy_signal": 25,
    "pe_percentile_buy": 30,
    "catalyst_required": True,

    # 卖出时机
    "pe_percentile_sell": 70,
    "upside_remaining_sell": 0.10
}


# ==========================================
# 因子权重（基于顶级基金共性推断）
# ==========================================

FACTOR_WEIGHTS_FROM_TOP_FUNDS = {
    """
    因子权重 - 基于10家顶级基金的综合推断

    说明：
    - 权重反映了顶级基金对各因子的重视程度
    - 基于公开信息和投资哲学逆向推断
    - 可用于构建多因子选股模型
    """

    # 质量因子组合 (9/10家重视)
    "quality_factors": {
        "weight": 0.30,
        "components": {
            "roe": 0.35,
            "roic": 0.25,
            "gross_margin": 0.15,
            "fcf_quality": 0.25
        }
    },

    # 估值因子组合 (10/10家有估值纪律)
    "value_factors": {
        "weight": 0.25,
        "components": {
            "pe_relative": 0.30,
            "pb_relative": 0.15,
            "fcf_yield": 0.30,
            "ev_ebitda": 0.25
        }
    },

    # 财务健康因子 (9/10家重视低负债)
    "financial_health_factors": {
        "weight": 0.15,
        "components": {
            "leverage": 0.40,
            "interest_coverage": 0.30,
            "liquidity": 0.30
        }
    },

    # 护城河因子 (8/10家要求)
    "moat_factors": {
        "weight": 0.15,
        "components": {
            "moat_score": 0.50,
            "moat_trend": 0.30,
            "competitive_position": 0.20
        }
    },

    # 成长因子 (用于GARP)
    "growth_factors": {
        "weight": 0.10,
        "components": {
            "revenue_growth": 0.40,
            "eps_growth": 0.40,
            "organic_growth": 0.20
        }
    },

    # 动量/情绪因子 (部分基金使用)
    "momentum_sentiment_factors": {
        "weight": 0.05,
        "components": {
            "price_momentum": 0.50,
            "earnings_momentum": 0.30,
            "analyst_revision": 0.20
        }
    }
}


# ==========================================
# 使用示例
# ==========================================

def example_usage():
    """
    使用示例
    """
    # 创建默认参数实例
    params = TopFundsOptimalParameters()

    # 访问选股参数
    print(f"ROE最低要求: {params.stock_selection.quality.roe_min}%")
    print(f"P/E最大值: {params.stock_selection.valuation.pe_max}")
    print(f"安全边际要求: {params.stock_selection.valuation.margin_of_safety_min * 100}%")

    # 访问买入时机参数
    print(f"VIX买入信号: {params.buy_timing.market_sentiment.vix_buy_signal}")
    print(f"催化剂要求: {params.buy_timing.catalyst.catalyst_required}")

    # 访问卖出时机参数
    print(f"硬止损: {params.sell_timing.stop_loss.hard_stop_loss_pct * 100}%")

    # 访问仓位管理参数
    print(f"最大单一仓位: {params.position_management.concentrated.max_single_position_pct * 100}%")

    # 导出为JSON
    json_output = params.to_json()
    print("\nJSON输出预览:")
    print(json_output[:500] + "...")

    return params


if __name__ == "__main__":
    params = example_usage()
