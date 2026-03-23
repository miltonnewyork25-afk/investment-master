#!/usr/bin/env python3
"""
Undervalued Stock Screener — Signal Computation Engine v1.0

三层信号框架:
  L1: 可能便宜了 (valuation + insider + buyback)
  L2: 便宜不是陷阱 (quality + discipline)
  L3: 市场开始纠错 (catalyst + momentum)

输入: FMP/MCP工具导出的JSON数据文件
输出: 每只股票的信号得分 + 复合排名
"""

import json
import sys
from pathlib import Path
from dataclasses import dataclass, field, asdict
from typing import Optional

# ============================================================
# Data Structures
# ============================================================

@dataclass
class L1Signals:
    """Layer 1: 可能便宜了"""
    # Valuation (absolute)
    ev_ebit: Optional[float] = None           # 越低越好, <15好
    fcf_yield: Optional[float] = None         # 越高越好, >5%好
    pe_ttm: Optional[float] = None
    pb: Optional[float] = None
    shareholder_yield: Optional[float] = None # dividend + buyback + debt paydown

    # Valuation (self-relative) — 比绝对阈值更重要
    pe_percentile_10y: Optional[float] = None     # 当前PE在10年PE分布中的百分位(0=历史最低, 100=最高)
    ev_ebitda_percentile_10y: Optional[float] = None  # EV/EBITDA 10年百分位
    pe_vs_median: Optional[float] = None          # 当前PE / 10年中位PE - 1 (负=便宜)
    pe_median_10y: Optional[float] = None         # 10年中位PE (参考)
    pe_normalized: Optional[float] = None         # 正常化PE(剔除季度NI异常值)

    # Insider Buy
    insider_buy_count_6m: int = 0             # 近6月买入笔数
    insider_buy_value_6m: float = 0.0         # 近6月买入金额($)
    insider_cluster: bool = False             # 多人同期买入
    insider_post_drop: bool = False           # 大跌后买入

    # Buyback
    shares_change_1y: Optional[float] = None  # 流通股变化%, 负=缩股
    shares_change_3y: Optional[float] = None
    buyback_debt_funded: Optional[bool] = None
    buyback_fcf_ratio: Optional[float] = None # 回购/FCF, >1=靠举债回购(不可持续)

    score: Optional[float] = None

@dataclass
class L2Signals:
    """Layer 2: 便宜不是陷阱"""
    # Earnings Quality
    accruals_ratio: Optional[float] = None     # (NI - CFO) / TA, 越低越好
    cfo_ni_ratio: Optional[float] = None       # CFO/NI, >1好

    # Profitability
    gross_profit_assets: Optional[float] = None  # Novy-Marx GP/A
    roic: Optional[float] = None
    roe: Optional[float] = None

    # Capital Discipline
    asset_growth_1y: Optional[float] = None    # 越低越好(排除合理增长)
    capex_sales: Optional[float] = None        # CapEx/Sales

    # Piotroski F-Score (0-9)
    f_score: Optional[int] = None
    f_components: dict = field(default_factory=dict)

    # Altman Z-Score (simplified)
    z_score: Optional[float] = None              # >2.99=安全, 1.81-2.99=灰色, <1.81=危险

    # Red Flags
    short_interest_pct: Optional[float] = None  # >10%红旗
    audit_concern: bool = False

    score: Optional[float] = None

@dataclass
class L3Signals:
    """Layer 3: 市场开始纠错"""
    # Earnings Momentum (external)
    earnings_surprise_last: Optional[float] = None   # 最近一次surprise%
    earnings_surprise_streak: int = 0                 # 连续超预期次数
    eps_yoy_direction: Optional[float] = None         # 最近EPS vs 去年同期%, 正=增长
    surprise_quality: Optional[str] = None            # "true_beat"(beat+EPS↑) / "low_bar_beat"(beat+EPS↓) / "miss"
    has_external_surprise: bool = False               # 是否有外部surprise数据

    # 3Y Momentum Proxy (from annual data, always available)
    rev_accel_annual: Optional[float] = None         # FY增速加速度(最新增速-上年增速)
    opm_direction_annual: Optional[float] = None     # OPM年度变化方向(正=扩张)
    eps_improving_annual: Optional[bool] = None      # EPS绝对值同比改善?

    # Analyst Revisions
    estimate_revision_3m: Optional[float] = None     # 3月预测修正方向
    analyst_coverage_count: Optional[int] = None     # 覆盖数(低=信息不对称大)

    # Price Momentum (contrarian)
    price_52w_pct: Optional[float] = None            # 当前价/52周高点
    price_6m_return: Optional[float] = None

    score: Optional[float] = None

@dataclass
class L4Signals:
    """Layer 4: 品质护城河 (CQI-Lite, 阶段2深筛)"""
    # Pricing Power Proxy
    gross_margin_10y_slope: Optional[float] = None   # 10年GM线性回归斜率, 正=定价权
    gross_margin_latest: Optional[float] = None      # 最新GM%
    gross_margin_stability: Optional[float] = None   # GM标准差, 低=稳定

    # Revenue Recurring / Durability
    revenue_volatility_10y: Optional[float] = None   # 收入YoY增速标准差, 低=经常性
    revenue_cagr_10y: Optional[float] = None         # 10年收入CAGR
    revenue_cagr_3y: Optional[float] = None          # 3年收入CAGR (加速/减速)

    # Capital Efficiency
    roic_5y_mean: Optional[float] = None             # 5年ROIC均值
    roic_trend: Optional[float] = None               # ROIC趋势(正=改善)
    sbc_revenue_pct: Optional[float] = None          # SBC/Revenue, 低=纪律

    # Compounding Speed (复利速度) — 每$1收入有多少变成自由现金
    fcf_margin: Optional[float] = None               # FCF/Revenue %, 越高=复利越快
    real_fcf_margin: Optional[float] = None          # (OCF-CapEx-SBC)/Revenue %, 真实复利速度
    fcf_margin_trend: Optional[float] = None         # FCF margin 3Y斜率, 正=改善
    capex_intensity: Optional[float] = None          # CapEx/Revenue %, 低=资本轻
    reinvestment_need: Optional[float] = None        # (CapEx+R&D)/Revenue %, 低=少再投资
    compounding_power: Optional[float] = None        # real_fcf_margin × (1+rev_cagr) = 综合复利力

    # Buyback Discipline
    shares_change_5y: Optional[float] = None         # 5年净股数变化%, 负=缩股
    fcf_conversion: Optional[float] = None           # FCF/NI均值, >1=高质量

    # Anti-Cyclical (D1 Proxy)
    revenue_drop_2020: Optional[float] = None        # 2020收入vs2019, 负=受冲击
    revenue_drop_2022: Optional[float] = None        # 2022收入vs2021, 负=受紧缩
    max_revenue_drop_10y: Optional[float] = None     # 10年内最大年度收入下降%

    # Growth Durability
    positive_growth_years: Optional[int] = None      # 10年中收入正增长的年数
    growth_acceleration: Optional[float] = None      # 3Y CAGR - 10Y CAGR, 正=加速

    # EPS Growth Decomposition (EPS增速分解)
    eps_cagr_5y: Optional[float] = None              # 5年EPS CAGR
    eps_from_revenue: Optional[float] = None         # 来自收入增长的占比%
    eps_from_margin: Optional[float] = None          # 来自利润率扩张的占比%
    eps_from_buyback: Optional[float] = None         # 来自回购的占比%
    eps_quality: Optional[str] = None                # "revenue_driven"/"margin_driven"/"buyback_driven"

    score: Optional[float] = None

@dataclass
class L5Signals:
    """Layer 5: 逆转拐点 (阶段2深筛)"""
    # Revenue Acceleration
    rev_growth_recent_2q: Optional[float] = None     # 最近2季度收入增速均值
    rev_growth_prior_4q: Optional[float] = None      # 前4季度收入增速均值
    rev_acceleration: Optional[float] = None         # recent - prior, 正=加速

    # Margin Reversal
    opm_recent_2q: Optional[float] = None            # 最近2季度OPM均值
    opm_prior_4q: Optional[float] = None             # 前4季度OPM均值
    opm_inflection: Optional[float] = None           # OPM变化方向, 正=反转向上

    # Insider Cluster (enhanced)
    insider_buy_large: bool = False                  # 单笔>$500K
    insider_multiple_roles: bool = False             # CEO+CFO+Director多角色买入

    # Analyst Upgrade Cycle
    eps_revision_3m_pct: Optional[float] = None      # 3月EPS预测上修%
    recommendation_trend: Optional[float] = None     # 分析师评级变化方向

    # Management Change Catalyst
    new_ceo_within_2y: bool = False                  # 新CEO上任<2年
    new_strategy_signal: bool = False                # 战略转型信号

    # Deleveraging Trend
    net_debt_ebitda_now: Optional[float] = None      # 当前Net Debt/EBITDA
    net_debt_ebitda_3y_ago: Optional[float] = None   # 3年前Net Debt/EBITDA
    deleveraging_rate: Optional[float] = None        # 年化去杠杆速度(负=去杠杆)
    interest_coverage_trend: Optional[float] = None  # EBIT/Interest变化方向(正=改善)

    score: Optional[float] = None

@dataclass
@dataclass
class L6Macro:
    """Layer 6: 宏观顺风/逆风"""
    asset_dna: str = ""                          # 6种原型之一
    qrs: float = 0.0                             # QRS评分(-2到+2)
    regime_signal: int = 0                       # 政体信号(-2到+2)
    tailwind_score: float = 5.0                  # 顺风得分(0-10)
    tailwind_label: str = ""                     # "顺风"/"中性"/"逆风"


@dataclass
class StockScreenResult:
    symbol: str
    name: str = ""
    market_cap: Optional[float] = None
    sector: str = ""
    l1: L1Signals = field(default_factory=L1Signals)
    l2: L2Signals = field(default_factory=L2Signals)
    l3: L3Signals = field(default_factory=L3Signals)
    l4: L4Signals = field(default_factory=L4Signals)
    l5: L5Signals = field(default_factory=L5Signals)
    l6: L6Macro = field(default_factory=L6Macro)
    composite_score: Optional[float] = None
    stage2_score: Optional[float] = None   # 阶段2深筛得分
    final_score: Optional[float] = None    # Stage 2 + L6宏观修正后
    vetoes: list = field(default_factory=list)   # 硬否决原因
    flags: list = field(default_factory=list)    # 软警告


# ============================================================
# Signal Computation
# ============================================================

def compute_accruals(net_income: float, cfo: float, total_assets: float) -> float:
    """Sloan accruals ratio: (NI - CFO) / avg_TA. 低=好."""
    if total_assets == 0:
        return 0.0
    return (net_income - cfo) / total_assets


def compute_shareholder_yield(
    dividend_per_share: float,
    price: float,
    shares_change_pct: float,
    net_debt_change_pct: float = 0.0
) -> float:
    """
    Shareholder Yield = Dividend Yield + Buyback Yield + Debt Paydown Yield
    shares_change_pct: 负=回购(好), 正=稀释(差)
    net_debt_change_pct: 负=偿债(好), 正=举债(差)
    """
    div_yield = (dividend_per_share / price * 100) if price > 0 else 0
    buyback_yield = -shares_change_pct  # 缩股为正
    debt_yield = -net_debt_change_pct   # 偿债为正
    return div_yield + buyback_yield + debt_yield


def compute_f_score(data: dict) -> tuple[int, dict]:
    """
    Piotroski F-Score (0-9). 输入: 包含当期和上期财务数据的dict.

    Required keys:
      net_income, cfo, total_assets, total_assets_prev,
      long_term_debt, long_term_debt_prev,
      current_ratio, current_ratio_prev,
      shares_outstanding, shares_outstanding_prev,
      gross_margin, gross_margin_prev,
      asset_turnover, asset_turnover_prev
    """
    components = {}
    score = 0

    # --- Profitability (4 signals) ---
    # F1: ROA > 0
    ta = data.get('total_assets', 1)
    ni = data.get('net_income', 0)
    roa = ni / ta if ta else 0
    components['F1_roa_positive'] = int(roa > 0)

    # F2: CFO > 0
    cfo = data.get('cfo', 0)
    components['F2_cfo_positive'] = int(cfo > 0)

    # F3: ROA improving (delta ROA > 0)
    ta_prev = data.get('total_assets_prev', ta)
    ni_prev = data.get('net_income_prev', ni)
    roa_prev = ni_prev / ta_prev if ta_prev else 0
    components['F3_roa_improving'] = int(roa > roa_prev)

    # F4: CFO > NI (accruals quality)
    components['F4_cfo_gt_ni'] = int(cfo > ni)

    # --- Leverage/Liquidity (3 signals) ---
    # F5: Long-term debt decreasing
    ltd = data.get('long_term_debt', 0)
    ltd_prev = data.get('long_term_debt_prev', 0)
    components['F5_debt_decreasing'] = int(ltd <= ltd_prev)

    # F6: Current ratio improving
    cr = data.get('current_ratio', 1)
    cr_prev = data.get('current_ratio_prev', 1)
    components['F6_current_ratio_improving'] = int(cr > cr_prev)

    # F7: No share dilution
    so = data.get('shares_outstanding', 1)
    so_prev = data.get('shares_outstanding_prev', 1)
    components['F7_no_dilution'] = int(so <= so_prev)

    # --- Operating Efficiency (2 signals) ---
    # F8: Gross margin improving
    gm = data.get('gross_margin', 0)
    gm_prev = data.get('gross_margin_prev', 0)
    components['F8_gross_margin_improving'] = int(gm > gm_prev)

    # F9: Asset turnover improving
    at = data.get('asset_turnover', 0)
    at_prev = data.get('asset_turnover_prev', 0)
    components['F9_asset_turnover_improving'] = int(at > at_prev)

    score = sum(components.values())
    return score, components


def compute_gross_profitability(gross_profit: float, total_assets: float) -> float:
    """Novy-Marx gross profitability = GP / TA"""
    if total_assets == 0:
        return 0.0
    return gross_profit / total_assets


# ============================================================
# Scoring Functions
# ============================================================

def _normalize(value: float, low: float, high: float, invert: bool = False) -> float:
    """Normalize to 0-10 scale. invert=True means lower is better."""
    if value is None:
        return 5.0  # neutral
    clamped = max(low, min(high, value))
    score = (clamped - low) / (high - low) * 10 if high != low else 5.0
    return (10.0 - score) if invert else score


def score_l1(s: L1Signals) -> float:
    """
    Layer 1 composite: 自身历史相对估值 + 绝对估值 + Insider + 回购
    v2.0: 自身历史百分位权重最高(35%) — PE在自己10年分布中的位置比绝对PE更重要
    """
    scores = []
    weights = []

    # --- Self-Relative Valuation (35%) — 最重要的估值信号 ---
    # 在自己的10年历史中处于什么位置？低百分位=历史性便宜
    self_rel_scores = []
    if s.pe_percentile_10y is not None:
        # 百分位0-100, 低=便宜. 20百分位 = 历史仅20%时间更便宜
        self_rel_scores.append(_normalize(s.pe_percentile_10y, 0, 100, invert=True))
    if s.ev_ebitda_percentile_10y is not None:
        self_rel_scores.append(_normalize(s.ev_ebitda_percentile_10y, 0, 100, invert=True))
    if s.pe_vs_median is not None:
        # pe_vs_median: -0.5 = 比中位便宜50%, 0 = 中位, +0.5 = 贵50%
        self_rel_scores.append(_normalize(s.pe_vs_median, -0.6, 0.4, invert=True))

    if self_rel_scores:
        scores.append(sum(self_rel_scores) / len(self_rel_scores))
        weights.append(0.35)

    # --- Absolute Valuation (25-30%) ---
    val_scores = []
    if s.ev_ebit is not None and s.ev_ebit > 0:
        val_scores.append(_normalize(s.ev_ebit, 3, 20, invert=True))
    if s.fcf_yield is not None:
        val_scores.append(_normalize(s.fcf_yield, 0, 12, invert=False))
    if s.pe_ttm is not None and s.pe_ttm > 0:
        val_scores.append(_normalize(s.pe_ttm, 5, 25, invert=True))
    if s.shareholder_yield is not None:
        val_scores.append(_normalize(s.shareholder_yield, -2, 12, invert=False))

    has_insider = s.insider_buy_count_6m > 0
    # 有自身历史数据时绝对估值降权; 无历史数据时绝对估值升权
    has_self_rel = len(self_rel_scores) > 0

    if val_scores:
        scores.append(sum(val_scores) / len(val_scores))
        weights.append(0.25 if has_self_rel else 0.50)

    # --- Insider sub-score (20%) ---
    if has_insider:
        count_s = min(s.insider_buy_count_6m / 5.0, 1.0) * 6
        cluster_s = 3.0 if s.insider_cluster else 0.0
        post_drop_s = 1.0 if s.insider_post_drop else 0.0
        insider_score = min(count_s + cluster_s + post_drop_s, 10.0)
        scores.append(insider_score)
        weights.append(0.20)

    # --- Buyback/Shrink sub-score (15-20%) ---
    bb_score = 5.0
    if s.shares_change_1y is not None:
        bb_score = _normalize(s.shares_change_1y, -10, 10, invert=True)
        if s.buyback_debt_funded:
            bb_score *= 0.5
        # Buyback sustainability: >1.0 = buying back more than FCF (debt-funded)
        if s.buyback_fcf_ratio is not None and s.buyback_fcf_ratio > 1.0:
            bb_score *= 0.7  # 30% penalty for unsustainable buyback
    scores.append(bb_score)
    weights.append(0.15 if has_insider else 0.20)

    # --- Negative valuation penalty ---
    if s.ev_ebit is not None and s.ev_ebit < 0:
        scores.append(1.0)
        weights.append(0.15)

    total_weight = sum(weights)
    s.score = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 0
    return s.score


def score_l2(s: L2Signals) -> float:
    """Layer 2 composite: Accruals25% + Profitability25% + AssetGrowth20% + F-score15% + ShortInterest15%"""
    scores = []
    weights = []

    # Accruals (25%) - lower is better
    if s.accruals_ratio is not None:
        scores.append(_normalize(s.accruals_ratio, -0.1, 0.2, invert=True))
        weights.append(0.25)

    # Profitability (25%) - higher is better
    # ROIC < 0 is a strong negative signal — cap the profitability score
    prof_scores = []
    if s.gross_profit_assets is not None:
        gpa_score = _normalize(s.gross_profit_assets, 0, 0.5, invert=False)
        # Negative GP/A = negative gross margin → hard cap at 0
        if s.gross_profit_assets < 0:
            gpa_score = 0.0
        prof_scores.append(gpa_score)
    if s.roic is not None:
        if s.roic < 0:
            # Negative ROIC: scale penalty by severity
            roic_score = max(0.0, 3.0 + s.roic / 10.0)  # -30% → 0, 0% → 3
        else:
            roic_score = _normalize(s.roic, 0, 30, invert=False)
        prof_scores.append(roic_score)
    if prof_scores:
        scores.append(sum(prof_scores) / len(prof_scores))
        weights.append(0.25)

    # Asset Growth (20%) - lower is better (discipline)
    if s.asset_growth_1y is not None:
        scores.append(_normalize(s.asset_growth_1y, -5, 30, invert=True))
        weights.append(0.20)

    # F-Score (15%)
    if s.f_score is not None:
        scores.append(s.f_score / 9.0 * 10.0)
        weights.append(0.15)

    # Short Interest (15%) - lower is better (red flag filter)
    if s.short_interest_pct is not None:
        scores.append(_normalize(s.short_interest_pct, 0, 20, invert=True))
        weights.append(0.15)

    total_weight = sum(weights)
    s.score = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 5.0
    return s.score


def score_l3(s: L3Signals) -> float:
    """
    Layer 3 composite: v2.1 — 外部surprise + 3Y增速拐点 + 反转位
    当有外部surprise时: Surprise35% + Revisions30% + Contrarian20% + Coverage15%
    当无外部surprise时: 3Y拐点40% + Contrarian30% + Coverage15% + cap at 7.0
    """
    scores = []
    weights = []

    # --- External Earnings Surprise (if available) ---
    if s.has_external_surprise and s.earnings_surprise_last is not None:
        surprise_s = _normalize(s.earnings_surprise_last, -20, 30, invert=False)
        streak_bonus = min(s.earnings_surprise_streak * 1.0, 3.0)
        raw_score = min(surprise_s + streak_bonus, 10.0)

        if s.surprise_quality == "low_bar_beat":
            raw_score *= 0.50
        elif s.surprise_quality == "miss":
            raw_score = min(raw_score, 3.0)

        scores.append(raw_score)
        weights.append(0.35)

    # --- 3Y Annual Momentum Proxy (always available from 3Y data) ---
    proxy_scores = []
    if s.rev_accel_annual is not None:
        # 收入加速: 正=增速在加快
        proxy_scores.append(_normalize(s.rev_accel_annual, -15, 15, invert=False))
    if s.opm_direction_annual is not None:
        # OPM方向: 正=利润率扩张
        proxy_scores.append(_normalize(s.opm_direction_annual, -5, 5, invert=False))
    if s.eps_improving_annual is not None:
        proxy_scores.append(7.0 if s.eps_improving_annual else 3.0)

    if proxy_scores:
        proxy_avg = sum(proxy_scores) / len(proxy_scores)
        # 如果已有外部surprise, 3Y proxy权重15%; 如果无外部surprise, 权重40%
        if s.has_external_surprise:
            scores.append(proxy_avg)
            weights.append(0.15)
        else:
            scores.append(proxy_avg)
            weights.append(0.40)

    # --- Analyst Revisions ---
    if s.estimate_revision_3m is not None:
        scores.append(_normalize(s.estimate_revision_3m, -20, 20, invert=False))
        weights.append(0.15 if s.has_external_surprise else 0.15)

    # --- Contrarian: far from 52w high ---
    if s.price_52w_pct is not None:
        scores.append(_normalize(s.price_52w_pct, 0.5, 1.0, invert=True))
        w = 0.20 if s.has_external_surprise else 0.30
        weights.append(w)

    # --- Low coverage ---
    if s.analyst_coverage_count is not None:
        scores.append(_normalize(s.analyst_coverage_count, 0, 20, invert=True))
        weights.append(0.15)

    total_weight = sum(weights)
    raw = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 5.0

    # Cap: 无外部surprise数据时L3上限7.0 — "跌了很多"≠"开始纠错"
    if not s.has_external_surprise:
        raw = min(raw, 7.0)

    s.score = raw
    return s.score


# ============================================================
# L4 Scoring: 品质护城河 (CQI-Lite)
# ============================================================

def _linear_slope(values: list[float]) -> float:
    """Simple linear regression slope over index 0..n-1."""
    n = len(values)
    if n < 3:
        return 0.0
    x_mean = (n - 1) / 2
    y_mean = sum(values) / n
    num = sum((i - x_mean) * (v - y_mean) for i, v in enumerate(values))
    den = sum((i - x_mean) ** 2 for i in range(n))
    return num / den if den != 0 else 0.0


def _cagr(start: float, end: float, years: float) -> Optional[float]:
    """Compound annual growth rate."""
    if start <= 0 or end <= 0 or years <= 0:
        return None
    return ((end / start) ** (1.0 / years) - 1) * 100


def _stdev(values: list[float]) -> float:
    """Population standard deviation."""
    if len(values) < 2:
        return 0.0
    mean = sum(values) / len(values)
    return (sum((v - mean) ** 2 for v in values) / len(values)) ** 0.5


def score_l4(s: L4Signals) -> float:
    """
    Layer 4: 品质护城河 (CQI-Lite) v2.0
    定价权25% + 复利速度20% + 经常性15% + 资本效率15% + 反周期15% + 增长持久10%
    v2.0: 新增复利速度(FCF margin+CapEx轻度), EPS分解作为质量加分
    """
    scores = []
    weights = []

    # --- Pricing Power (25%) ---
    pp_scores = []
    if s.gross_margin_latest is not None:
        pp_scores.append(_normalize(s.gross_margin_latest, 10, 80, invert=False))
    if s.gross_margin_10y_slope is not None:
        pp_scores.append(_normalize(s.gross_margin_10y_slope, -1.0, 2.0, invert=False))
    if s.gross_margin_stability is not None:
        pp_scores.append(_normalize(s.gross_margin_stability, 0, 15, invert=True))
    if pp_scores:
        scores.append(sum(pp_scores) / len(pp_scores))
        weights.append(0.25)

    # --- Compounding Speed 复利速度 (20%) --- v2.1: 用real_fcf_margin(扣SBC)
    cs_scores = []
    # 优先用real_fcf_margin(扣SBC后的真实复利速度)
    fcfm = s.real_fcf_margin if s.real_fcf_margin is not None else s.fcf_margin
    if fcfm is not None:
        cs_scores.append(_normalize(fcfm, -5, 45, invert=False))
    if s.capex_intensity is not None:
        cs_scores.append(_normalize(s.capex_intensity, 0, 15, invert=True))
    if s.reinvestment_need is not None:
        cs_scores.append(_normalize(s.reinvestment_need, 0, 25, invert=True))
    if cs_scores:
        scores.append(sum(cs_scores) / len(cs_scores))
        weights.append(0.20)

    # --- Revenue Durability (15%) ---
    rd_scores = []
    if s.revenue_volatility_10y is not None:
        rd_scores.append(_normalize(s.revenue_volatility_10y, 0, 30, invert=True))
    if s.positive_growth_years is not None:
        rd_scores.append(_normalize(s.positive_growth_years, 3, 10, invert=False))
    if rd_scores:
        scores.append(sum(rd_scores) / len(rd_scores))
        weights.append(0.15)

    # --- Capital Efficiency (15%) ---
    ce_scores = []
    if s.roic_5y_mean is not None:
        if s.roic_5y_mean < 0:
            ce_scores.append(max(0.0, 2.0 + s.roic_5y_mean / 15))
        else:
            ce_scores.append(_normalize(s.roic_5y_mean, 0, 30, invert=False))
    if s.sbc_revenue_pct is not None:
        ce_scores.append(_normalize(s.sbc_revenue_pct, 0, 10, invert=True))
    if s.fcf_conversion is not None:
        ce_scores.append(_normalize(s.fcf_conversion, 0.5, 1.5, invert=False))
    if ce_scores:
        scores.append(sum(ce_scores) / len(ce_scores))
        weights.append(0.15)

    # --- Anti-Cyclical D1 Proxy (15%) ---
    ac_scores = []
    if s.max_revenue_drop_10y is not None:
        ac_scores.append(_normalize(s.max_revenue_drop_10y, -40, 5, invert=False))
    if s.revenue_drop_2020 is not None:
        ac_scores.append(_normalize(s.revenue_drop_2020, -30, 10, invert=False))
    if ac_scores:
        scores.append(sum(ac_scores) / len(ac_scores))
        weights.append(0.15)

    # --- Growth Durability (10%) ---
    gd_scores = []
    if s.revenue_cagr_10y is not None:
        gd_scores.append(_normalize(s.revenue_cagr_10y, -2, 20, invert=False))
    if s.growth_acceleration is not None:
        gd_scores.append(_normalize(s.growth_acceleration, -5, 10, invert=False))
    if gd_scores:
        scores.append(sum(gd_scores) / len(gd_scores))
        weights.append(0.10)

    total_weight = sum(weights)
    base = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 5.0

    # EPS Quality Bonus: revenue-driven growth = most durable compounding
    if s.eps_quality == "revenue_driven":
        base = min(base + 0.5, 10.0)
    elif s.eps_quality == "buyback_driven":
        base = max(base - 0.3, 0.0)

    s.score = base
    return s.score


# ============================================================
# L5 Scoring: 逆转拐点
# ============================================================

def score_l5(s: L5Signals) -> float:
    """
    Layer 5: 逆转拐点
    收入加速20% + 利润率反转20% + 去杠杆15% + Insider15% + 分析师上修15% + 管理层变更15%
    """
    scores = []
    weights = []

    # --- Revenue Acceleration (20%) ---
    if s.rev_acceleration is not None:
        scores.append(_normalize(s.rev_acceleration, -10, 15, invert=False))
        weights.append(0.20)

    # --- Margin Reversal (20%) ---
    if s.opm_inflection is not None:
        scores.append(_normalize(s.opm_inflection, -5, 5, invert=False))
        weights.append(0.20)

    # --- Deleveraging Trend (15%) ---
    delev_score = 5.0  # neutral
    if s.deleveraging_rate is not None:
        # 负=去杠杆(好). -1.0x/yr=很强去杠杆, +0.5=加杠杆(差)
        delev_score = _normalize(s.deleveraging_rate, -1.5, 0.5, invert=True)
    if s.interest_coverage_trend is not None and s.interest_coverage_trend > 0:
        delev_score = min(delev_score + 1.5, 10.0)  # 利息覆盖率改善=加分
    scores.append(delev_score)
    weights.append(0.15)

    # --- Enhanced Insider (15%) ---
    insider_score = 5.0
    if s.insider_buy_large:
        insider_score += 2.5
    if s.insider_multiple_roles:
        insider_score += 2.5
    scores.append(min(insider_score, 10.0))
    weights.append(0.15)

    # --- Analyst Upgrade (15%) ---
    if s.eps_revision_3m_pct is not None:
        scores.append(_normalize(s.eps_revision_3m_pct, -15, 15, invert=False))
        weights.append(0.15)

    # --- Management Change (15%) ---
    mgmt_score = 5.0
    if s.new_ceo_within_2y:
        mgmt_score += 3.0
    if s.new_strategy_signal:
        mgmt_score += 2.0
    scores.append(min(mgmt_score, 10.0))
    weights.append(0.15)

    total_weight = sum(weights)
    s.score = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 5.0
    return s.score


# ============================================================
# Veto Logic (硬否决)
# ============================================================

# 铁律: 行业排除名单 — 二元信息无法提前验证和量化的赛道
# 生物制药: 核心驱动是管线二元结果(FDA批准/失败), 无法用财务因子量化
EXCLUDED_INDUSTRIES = {
    'Biotechnology',
    'Drug Manufacturers - General',
    'Drug Manufacturers - Specialty & Generic',
    'Medical - Pharmaceuticals',
}


def check_vetoes(result: StockScreenResult) -> list[str]:
    """检查硬否决条件. 返回否决原因列表."""
    vetoes = []

    # 铁律第一条: 生物制药行业硬否决
    if hasattr(result, '_industry') and result._industry in EXCLUDED_INDUSTRIES:
        vetoes.append(f"VETO: 生物制药行业排除({result._industry})")
        result.vetoes = vetoes
        return vetoes  # 直接返回, 不再检查其他条件

    # 高应计 + 低现金流 = 利润质量极差
    if (result.l2.accruals_ratio is not None and result.l2.accruals_ratio > 0.15
        and result.l2.cfo_ni_ratio is not None and result.l2.cfo_ni_ratio < 0.5):
        vetoes.append("VETO: 高应计项+低现金流(利润质量极差)")

    # 审计问题
    if result.l2.audit_concern:
        vetoes.append("VETO: 审计意见保留/关注")

    # 极高空头 + 无insider buy = 危险
    if (result.l2.short_interest_pct is not None and result.l2.short_interest_pct > 20
        and result.l1.insider_buy_count_6m == 0):
        vetoes.append("VETO: 极高空头(>20%)+无内部人买入")

    # 持续大幅稀释
    if result.l1.shares_change_1y is not None and result.l1.shares_change_1y > 15:
        vetoes.append("VETO: 年稀释>15%(大规模增发)")

    # Z-Score极低 = 财务困境
    # 豁免: (1) 金融行业(Altman模型不适用) (2) 负权益公司(回购导致,非困境)
    financial_sectors = {'Financial Services', 'Banking', 'Insurance'}
    is_negative_equity = result.l1.pb is not None and result.l1.pb < 0
    if (result.l2.z_score is not None and result.l2.z_score < 1.0
            and result.sector not in financial_sectors
            and not is_negative_equity):
        vetoes.append(f"VETO: Z-Score={result.l2.z_score:.2f}(<1.0, 财务困境区)")

    result.vetoes = vetoes
    return vetoes


def check_flags(result: StockScreenResult) -> list[str]:
    """检查软警告条件. 标记但不否决."""
    flags = []

    # 负权益 (PB < 0)
    if result.l1.pb is not None and result.l1.pb < 0:
        flags.append("FLAG: 负股东权益(PB<0), 回购/杠杆导致")

    # F-Score极低
    if result.l2.f_score is not None and result.l2.f_score <= 3:
        flags.append(f"FLAG: F-Score={result.l2.f_score}/9(财务体质弱)")

    # 负盈利
    if result.l1.pe_ttm is not None and result.l1.pe_ttm < 0:
        flags.append("FLAG: 当前亏损(PE<0)")

    # 高资产增长
    if result.l2.asset_growth_1y is not None and result.l2.asset_growth_1y > 20:
        flags.append(f"FLAG: 资产增长{result.l2.asset_growth_1y:.0f}%(可能盲目扩张)")

    # 负ROIC
    if result.l2.roic is not None and result.l2.roic < -10:
        flags.append(f"FLAG: ROIC={result.l2.roic:.1f}%(严重亏损)")

    # CFO/NI 严重不匹配
    if result.l2.cfo_ni_ratio is not None and result.l2.cfo_ni_ratio < 0:
        flags.append("FLAG: CFO与NI符号相反(盈利结构异常)")

    # Earnings surprise quality warning
    if result.l3.surprise_quality == "low_bar_beat":
        flags.append("FLAG: 低基数beat(EPS超预期但同比下降)")

    # Z-Score灰色区域警告 (豁免金融行业)
    if (result.l2.z_score is not None and 1.0 <= result.l2.z_score < 1.81
            and result.sector not in {'Financial Services', 'Banking', 'Insurance'}):
        flags.append(f"FLAG: Z-Score={result.l2.z_score:.2f}(灰色区域1.0-1.81, 财务风险偏高)")

    # PE一次性项目扭曲检测 (from quarterly income)
    # 如果某季度NI > 其他季度均值3倍 → PE被一次性收益扭曲
    # This is detected during extraction and stored as a flag

    result.flags = flags
    return flags


# ============================================================
# Composite Scoring
# ============================================================

def compute_composite(result: StockScreenResult) -> float:
    """
    Stage 1 composite = L1×0.35 + L2×0.40 + L3×0.25
    L2权重最大: 避免价值陷阱比发现便宜更重要

    修正项:
    - 负盈利公司(PE<0): composite × 0.75 惩罚
    - 负ROIC: 已在L2评分中处理
    """
    l1 = score_l1(result.l1)
    l2 = score_l2(result.l2)
    l3 = score_l3(result.l3)

    vetoes = check_vetoes(result)
    if vetoes:
        result.composite_score = 0.0
        return 0.0

    flags = check_flags(result)

    composite = l1 * 0.35 + l2 * 0.40 + l3 * 0.25

    # 负盈利惩罚: 亏损公司的"便宜"可能是陷阱
    if result.l1.pe_ttm is not None and result.l1.pe_ttm < 0:
        composite *= 0.75

    result.composite_score = composite
    return result.composite_score


def compute_stage2(result: StockScreenResult) -> float:
    """
    Stage 2 composite: 五层融合
    L1(便宜)×15% + L2(不是陷阱)×15% + L3(纠错)×15% + L4(品质)×30% + L5(拐点)×25%

    Stage 2把品质和拐点放在核心(55%)，估值降为辅助(15%)。
    逻辑: 好公司在拐点 > 便宜的平庸公司
    """
    if result.vetoes:
        result.stage2_score = 0.0
        return 0.0

    l1 = result.l1.score if result.l1.score is not None else score_l1(result.l1)
    l2 = result.l2.score if result.l2.score is not None else score_l2(result.l2)
    l3 = result.l3.score if result.l3.score is not None else score_l3(result.l3)
    l4 = score_l4(result.l4)
    l5 = score_l5(result.l5)

    stage2 = l1 * 0.15 + l2 * 0.15 + l3 * 0.15 + l4 * 0.30 + l5 * 0.25

    # 负盈利惩罚
    if result.l1.pe_ttm is not None and result.l1.pe_ttm < 0:
        stage2 *= 0.80

    # 铁律: 数据不完整惩罚 — 宁可错过不可放错
    # H = 有10Y数据 → 无惩罚
    # M = 有3Y数据 → 按L4核心字段填充度动态惩罚(5-20%)
    # L = 数据严重不足 → 30%惩罚
    data_conf = getattr(result, '_data_confidence', 'L')
    if data_conf == 'M':
        # L4核心字段: GM/ROIC/real_fcf_margin/SBC/rev_cagr — 填充越多惩罚越小
        core_fields = [
            result.l4.gross_margin_latest,
            result.l4.roic_5y_mean,
            result.l4.real_fcf_margin,
            result.l4.sbc_revenue_pct,
            result.l4.revenue_cagr_10y,
        ]
        filled = sum(1 for f in core_fields if f is not None)
        # 5/5填充=5%惩罚, 4/5=8%, 3/5=12%, 2/5=17%, 1/5=22%, 0/5=27%
        penalty = 0.05 + (5 - filled) * 0.045
        stage2 *= (1 - penalty)
    elif data_conf == 'L':
        stage2 *= 0.70

    result.stage2_score = stage2
    return result.stage2_score


# ============================================================
# L6: Macro Tailwind (宏观顺风)
# ============================================================

# 资产DNA自动分类规则
def classify_asset_dna(result: StockScreenResult) -> str:
    """基于已有数据自动分类为6种资产原型"""
    sector = result.sector or ""
    pe = result.l1.pe_ttm
    rev_vol = result.l4.revenue_volatility_10y
    max_drop = result.l4.max_revenue_drop_10y
    rev_drop_2020 = result.l4.revenue_drop_2020
    gm = result.l4.gross_margin_latest
    pos_years = result.l4.positive_growth_years
    new_ceo = result.l5.new_ceo_within_2y

    # 反脆弱型: 危机中收入逆增 (CME, NEM, CPRT)
    if rev_drop_2020 is not None and rev_drop_2020 > 5:
        return "anti_fragile"

    # 防御复利型: 低波动+几乎不下跌 (VRSN, FICO, MO, COST)
    if pos_years is not None and pos_years >= 9 and rev_vol is not None and rev_vol < 10:
        return "defensive_compounder"

    # 成长利率敏感型: 高PE+高增速 (ADBE, APP, NVDA, PLTR)
    if pe is not None and pe > 30 and gm is not None and gm > 50:
        return "growth_rate_sensitive"

    # 消费信心型: Consumer sector (NKE, DIS, SBUX, RCL, HLT)
    if sector in ('Consumer Cyclical', 'Consumer Defensive') or sector == 'Communication Services':
        if pe is not None and pe > 0:
            return "consumer_confidence"

    # 转折催化型: 新CEO或L5高 (INTC, NKE with new CEO)
    if new_ceo:
        return "turnaround_catalyst"

    # 周期品质型: 其余有品质但有周期性的 (MCO, LRCX, AVGO)
    if gm is not None and gm > 35:
        return "cyclical_quality"

    return "cyclical_quality"  # default


# 政体×原型矩阵 (QRS信号 → 资产特定顺风/逆风)
# 行: QRS信号(+2=甜蜜, +1=有利, 0=中性, -1=逆风, -2=天敌)
# 值: 该原型在该政体中的顺风得分调整
REGIME_MATRIX = {
    "anti_fragile":        {2: -1, 1: 0, 0: 0, -1: +1, -2: +2},  # 危机中最强
    "defensive_compounder":{2: 0, 1: 0, 0: +1, -1: +1, -2: +1},  # 逆风中相对更优
    "cyclical_quality":    {2: +1, 1: +1, 0: 0, -1: -1, -2: -1},  # 顺周期
    "growth_rate_sensitive":{2: +2, 1: +1, 0: 0, -1: -1, -2: -2}, # 最敏感
    "consumer_confidence": {2: +1, 1: +1, 0: 0, -1: -1, -2: -2},  # 消费相关
    "turnaround_catalyst": {2: +1, 1: 0, 0: 0, -1: 0, -2: -1},   # 催化剂独立于宏观
}


def compute_l6_tailwind(result: StockScreenResult, qrs: float = 0.15) -> float:
    """
    计算L6宏观顺风得分。
    qrs: 当前QRS评分(全市场统一)
    返回顺风得分(0-10, 5=中性)
    """
    # 分类资产DNA
    dna = classify_asset_dna(result)
    result.l6.asset_dna = dna

    # QRS → 政体信号
    if qrs >= 1.5: regime = 2
    elif qrs >= 0.5: regime = 1
    elif qrs >= -0.4: regime = 0
    elif qrs >= -1.4: regime = -1
    else: regime = -2
    result.l6.qrs = qrs
    result.l6.regime_signal = regime

    # 矩阵查表
    matrix = REGIME_MATRIX.get(dna, REGIME_MATRIX["cyclical_quality"])
    adjustment = matrix.get(regime, 0)

    # 顺风得分: 5(中性) + adjustment × 2.5 → 范围0-10
    tailwind = 5.0 + adjustment * 2.5
    tailwind = max(0.0, min(10.0, tailwind))
    result.l6.tailwind_score = tailwind

    if adjustment > 0:
        result.l6.tailwind_label = "顺风"
    elif adjustment < 0:
        result.l6.tailwind_label = "逆风"
    else:
        result.l6.tailwind_label = "中性"

    return tailwind


def compute_final_score(result: StockScreenResult, qrs: float = 0.15) -> float:
    """
    Final Score = Stage 2 × 85% + L6 Tailwind × 15%
    L6权重15%: 宏观是修正项不是主驱动
    """
    if result.vetoes:
        result.final_score = 0.0
        return 0.0

    s2 = result.stage2_score
    if s2 is None or s2 == 0:
        s2 = compute_stage2(result)

    l6 = compute_l6_tailwind(result, qrs)

    final = s2 * 0.85 + l6 * 0.15
    result.final_score = final
    return final


# ============================================================
# FMP Data → Signal Extraction
# ============================================================

def extract_signals_from_fmp(
    profile: dict,
    income: list[dict],
    balance: list[dict],
    cashflow: list[dict],
    ratios: list[dict],
    key_metrics: list[dict],
    insider_trades: list[dict] = None,
    quote: dict = None,
    earnings_surprises: list[dict] = None,
    estimates: list[dict] = None,
    # Stage 2 extended data
    income_10y: list[dict] = None,
    ratios_10y: list[dict] = None,
    cashflow_10y: list[dict] = None,
    key_metrics_10y: list[dict] = None,
    income_quarterly: list[dict] = None,
    ratios_quarterly: list[dict] = None,
) -> StockScreenResult:
    """
    从FMP API返回的原始数据中提取所有信号.
    income/balance/cashflow/ratios/key_metrics: 列表, [0]=最近期, [1]=上期

    FMP实际字段映射 (v1.1 verified):
      profile: marketCap (not mktCap), companyName, sector
      ratios: priceToEarningsRatio, priceToBookRatio, returnOnEquity, returnOnAssets,
              grossProfitMargin, currentRatio (decimals, e.g. 0.15 = 15%)
      key_metrics: evToEBITDA, evToFreeCashFlow, returnOnInvestedCapital,
                   bookValuePerShare, capexToRevenue, freeCashFlowPerShare
      income: weightedAverageShsOut (share count), grossProfit, netIncome, revenue
      balance: totalAssets, longTermDebt, totalStockholdersEquity
              NOTE: commonStock = dollar value, NOT share count!
      cashflow: operatingCashFlow (or netCashProvidedByOperatingActivities)
      insider_trades: quarterly summary format {year, quarter, acquiredTransactions,
                      totalAcquired, totalPurchases($), disposedTransactions, totalSales($)}
      quote: price, yearHigh, yearLow, marketCap, volume
    """
    # Defensive: profile may be a list (old data format) or dict
    if isinstance(profile, list):
        profile = profile[0] if profile else {}
    if not isinstance(profile, dict):
        profile = {}

    # Defensive: quote may be a list (old data format) or dict
    if isinstance(quote, list):
        quote = quote[0] if quote else {}
    if not isinstance(quote, dict):
        quote = {}

    # Defensive: insider_trades may be a string placeholder
    if not isinstance(insider_trades, list):
        insider_trades = []

    symbol = profile.get('symbol', 'UNKNOWN')
    result = StockScreenResult(
        symbol=symbol,
        name=profile.get('companyName', ''),
        market_cap=profile.get('marketCap') or profile.get('mktCap', 0),
        sector=profile.get('sector', ''),
    )
    # Store industry for veto check (not in dataclass to keep it clean)
    result._industry = profile.get('industry', '')
    # Data confidence: H(10Y) / M(3Y+proxy) / L(insufficient)
    has_10y = income_10y and len(income_10y) > 5
    has_3y = income and len(income) >= 3
    has_quarterly = income_quarterly and len(income_quarterly) > 3
    if has_10y:
        result._data_confidence = "H"
    elif has_3y:
        result._data_confidence = "M"  # 3Y data → proxy indicators available
    else:
        result._data_confidence = "L"

    # --- L1: Valuation ---
    if ratios and len(ratios) > 0:
        r = ratios[0]
        result.l1.pe_ttm = r.get('priceToEarningsRatio') or r.get('priceEarningsRatio')
        result.l1.pb = r.get('priceToBookRatio')

    if key_metrics and len(key_metrics) > 0:
        km = key_metrics[0]
        result.l1.ev_ebit = km.get('evToEBITDA') or km.get('enterpriseValueOverEBITDA')
        # FCF yield: compute from freeCashFlowPerShare / price, or use evToFreeCashFlow inverse
        fcf_per_share = km.get('freeCashFlowPerShare')
        ev_to_fcf = km.get('evToFreeCashFlow')
        if fcf_per_share is not None and quote and quote.get('price', 0) > 0:
            result.l1.fcf_yield = (fcf_per_share / quote['price']) * 100
        elif ev_to_fcf is not None and ev_to_fcf != 0:
            result.l1.fcf_yield = (1.0 / ev_to_fcf) * 100

    # Shares change: use weightedAverageShsOut from income (NOT commonStock from balance!)
    if income and len(income) >= 2:
        so_now = income[0].get('weightedAverageShsOut', 0)
        so_prev = income[1].get('weightedAverageShsOut', 0)
        if so_prev and so_prev > 0 and so_now and so_now > 0:
            result.l1.shares_change_1y = ((so_now - so_prev) / so_prev) * 100

    # Shareholder yield
    if quote and isinstance(quote, dict) and quote.get('price', 0) > 0:
        price = quote['price']
        # Dividend yield from ratios
        div_yield_pct = 0.0
        if ratios and ratios[0].get('dividendYield') is not None:
            dy = ratios[0]['dividendYield']
            div_yield_pct = dy * 100 if abs(dy) < 1 else dy
        shares_chg = result.l1.shares_change_1y or 0
        buyback_yield = -shares_chg  # 缩股=正
        result.l1.shareholder_yield = div_yield_pct + buyback_yield

    # --- L1: Buyback/FCF sustainability ratio ---
    if cashflow and len(cashflow) > 0:
        ocf = cashflow[0].get('operatingCashFlow', 0) or cashflow[0].get('netCashProvidedByOperatingActivities', 0)
        capex = abs(cashflow[0].get('capitalExpenditure', 0) or 0)
        buyback_amt = abs(cashflow[0].get('commonStockRepurchased', 0) or 0)
        fcf = ocf - capex
        if fcf > 0 and buyback_amt > 0:
            result.l1.buyback_fcf_ratio = buyback_amt / fcf

    # --- L1: Normalized PE (剔除季度NI异常值) ---
    if income_quarterly and len(income_quarterly) >= 4:
        ni_quarters = [q.get('netIncome', 0) for q in income_quarterly[:4] if q.get('netIncome')]
        if len(ni_quarters) >= 4:
            # Remove outlier: if max > 3x median, replace with median
            sorted_ni = sorted(ni_quarters)
            median_ni = sorted_ni[len(sorted_ni) // 2]
            if median_ni > 0:
                normalized = [min(ni, median_ni * 3) for ni in ni_quarters]
                norm_annual_ni = sum(normalized)
                if norm_annual_ni > 0 and result.market_cap and result.market_cap > 0:
                    result.l1.pe_normalized = result.market_cap / norm_annual_ni

    # --- L1: Insider Buy ---
    # FMP insider-trading endpoint returns quarterly summaries:
    #   acquiredTransactions = ALL acquisitions (grants + options + purchases)
    #   totalPurchases = open-market BUY transactions only (真金白银!)
    #   totalAcquired = shares acquired (all types)
    #   totalSales = open-market SELL transactions
    # Key insight: totalPurchases > 0 is the real signal (not acquiredTransactions)
    # Handle malformed data: skip if not a list of dicts
    if insider_trades and isinstance(insider_trades, list) and len(insider_trades) > 0 and isinstance(insider_trades[0], dict):
        from datetime import datetime
        now = datetime.now()
        recent_purchase_txns = 0      # open-market buy transaction count
        recent_acquired_shares = 0    # total shares acquired (all types)
        quarters_with_purchases = 0   # quarters with real purchases

        for t in insider_trades:
            year = t.get('year', 0)
            quarter = t.get('quarter', 0)
            # Recency: within ~6 months
            t_approx_month = year * 12 + quarter * 3
            now_approx_month = now.year * 12 + ((now.month - 1) // 3 + 1) * 3
            months_ago = now_approx_month - t_approx_month
            if 0 <= months_ago <= 6:
                purchases = t.get('totalPurchases', 0) or 0
                acquired = t.get('totalAcquired', 0) or 0
                recent_purchase_txns += purchases
                recent_acquired_shares += int(acquired)
                if purchases > 0:
                    quarters_with_purchases += 1

        result.l1.insider_buy_count_6m = recent_purchase_txns
        # FMP quarterly summary doesn't give purchase $ amounts.
        # We can only estimate: totalPurchases(count) gives conviction signal.
        # Do NOT use totalAcquired × price (inflated by grants/options).
        # Instead, use purchase count as primary signal, leave value at 0
        # unless we have per-transaction data from a different source.
        result.l1.insider_buy_value_6m = 0.0  # not available from quarterly summary
        result.l1.insider_cluster = recent_purchase_txns >= 3 or quarters_with_purchases >= 2

    # --- L2: Earnings Quality ---
    if income and cashflow and balance:
        ni = income[0].get('netIncome', 0)
        cfo = cashflow[0].get('operatingCashFlow', 0) or cashflow[0].get('netCashProvidedByOperatingActivities', 0)
        ta = balance[0].get('totalAssets', 1)

        result.l2.accruals_ratio = compute_accruals(ni, cfo, ta)
        result.l2.cfo_ni_ratio = (cfo / ni) if ni and ni != 0 else None

    # --- L2: Profitability ---
    if income and balance:
        gp = income[0].get('grossProfit', 0)
        ta = balance[0].get('totalAssets', 1)
        result.l2.gross_profit_assets = compute_gross_profitability(gp, ta)

    if key_metrics and len(key_metrics) > 0:
        roic_raw = key_metrics[0].get('returnOnInvestedCapital')
        if roic_raw is None and ratios:
            roic_raw = ratios[0].get('returnOnCapitalEmployed') or ratios[0].get('returnOnAssets')
        result.l2.roic = roic_raw * 100 if roic_raw is not None and abs(roic_raw) < 1 else roic_raw

    if ratios and len(ratios) > 0:
        roe_raw = ratios[0].get('returnOnEquity')
        result.l2.roe = roe_raw * 100 if roe_raw is not None and abs(roe_raw) < 1 else roe_raw

    # --- L2: Capital Discipline ---
    if balance and len(balance) >= 2:
        ta_now = balance[0].get('totalAssets', 0)
        ta_prev = balance[1].get('totalAssets', 0)
        if ta_prev and ta_prev > 0:
            result.l2.asset_growth_1y = ((ta_now - ta_prev) / ta_prev) * 100

    # --- L2: F-Score ---
    # Use weightedAverageShsOut from income for share dilution check
    if (income and balance and cashflow and ratios
        and len(income) >= 2 and len(balance) >= 2 and len(cashflow) >= 2):
        so_now = income[0].get('weightedAverageShsOut', 1) or 1
        so_prev = income[1].get('weightedAverageShsOut', 1) or 1
        # Asset turnover: revenue / total_assets
        rev_now = income[0].get('revenue', 0) or 0
        rev_prev = income[1].get('revenue', 0) or 0
        ta_now = balance[0].get('totalAssets', 1) or 1
        ta_prev = balance[1].get('totalAssets', 1) or 1
        at_now = rev_now / ta_now if ta_now else 0
        at_prev = rev_prev / ta_prev if ta_prev else 0

        f_data = {
            'net_income': income[0].get('netIncome', 0),
            'net_income_prev': income[1].get('netIncome', 0),
            'cfo': cashflow[0].get('operatingCashFlow', 0) or cashflow[0].get('netCashProvidedByOperatingActivities', 0),
            'total_assets': ta_now,
            'total_assets_prev': ta_prev,
            'long_term_debt': balance[0].get('longTermDebt', 0) or 0,
            'long_term_debt_prev': balance[1].get('longTermDebt', 0) or 0,
            'current_ratio': ratios[0].get('currentRatio', 1) or 1,
            'current_ratio_prev': (ratios[1].get('currentRatio', 1) or 1) if len(ratios) >= 2 else 1,
            'shares_outstanding': so_now,
            'shares_outstanding_prev': so_prev,
            'gross_margin': ratios[0].get('grossProfitMargin', 0) or 0,
            'gross_margin_prev': (ratios[1].get('grossProfitMargin', 0) or 0) if len(ratios) >= 2 else 0,
            'asset_turnover': at_now,
            'asset_turnover_prev': at_prev,
        }
        result.l2.f_score, result.l2.f_components = compute_f_score(f_data)

    # --- L2: Simplified Altman Z-Score ---
    # Z = 1.2*WC/TA + 1.4*RE/TA + 3.3*EBIT/TA + 0.6*MktCap/TL + 1.0*Rev/TA
    if balance and income and len(balance) > 0 and len(income) > 0:
        ta = balance[0].get('totalAssets', 0) or 0
        tl = balance[0].get('totalLiabilities', 0) or 0
        if ta > 0 and tl > 0:
            wc = (balance[0].get('totalCurrentAssets', 0) or 0) - (balance[0].get('totalCurrentLiabilities', 0) or 0)
            re = balance[0].get('retainedEarnings', 0) or 0
            ebit = income[0].get('operatingIncome', 0) or 0
            rev = income[0].get('revenue', 0) or 0
            mkt_cap = result.market_cap or 0

            z = (1.2 * wc / ta
                 + 1.4 * re / ta
                 + 3.3 * ebit / ta
                 + 0.6 * mkt_cap / tl
                 + 1.0 * rev / ta)
            result.l2.z_score = z

    # --- L3: Price Position ---
    if quote and isinstance(quote, dict):
        price = quote.get('price', 0)
        high_52 = quote.get('yearHigh', 0)
        if high_52 and high_52 > 0:
            result.l3.price_52w_pct = price / high_52

    # --- L3: Earnings Surprise + Quality Detection ---
    if earnings_surprises and len(earnings_surprises) > 0:
        # Most recent surprise
        latest = earnings_surprises[0]
        actual = latest.get('actualEarningResult', 0)
        estimated = latest.get('estimatedEarning', 0)
        if estimated and estimated != 0:
            result.l3.earnings_surprise_last = ((actual - estimated) / abs(estimated)) * 100

        # Consecutive beat streak
        streak = 0
        for s in earnings_surprises:
            a = s.get('actualEarningResult', 0)
            e = s.get('estimatedEarning', 0)
            if e and a > e:
                streak += 1
            else:
                break
        result.l3.earnings_surprise_streak = streak

        # Surprise Quality: compare actual EPS to same-quarter prior year
        # earnings_surprises are sorted newest first
        if len(earnings_surprises) >= 4 and actual:
            # Compare latest to ~4 quarters ago (same quarter last year)
            prior_year = earnings_surprises[3] if len(earnings_surprises) > 3 else earnings_surprises[-1]
            prior_actual = prior_year.get('actualEarningResult', 0)
            if prior_actual and prior_actual > 0:
                result.l3.eps_yoy_direction = ((actual / prior_actual) - 1) * 100
                beat = actual > estimated if estimated else False
                if beat and result.l3.eps_yoy_direction > 0:
                    result.l3.surprise_quality = "true_beat"
                elif beat and result.l3.eps_yoy_direction <= 0:
                    result.l3.surprise_quality = "low_bar_beat"
                else:
                    result.l3.surprise_quality = "miss"

    # Mark if external surprise data exists
    result.l3.has_external_surprise = (earnings_surprises and len(earnings_surprises) > 0
                                        and result.l3.earnings_surprise_last is not None)

    # --- L3: 3Y Annual Momentum Proxy (from income data, always available) ---
    if income and len(income) >= 2:
        rev_now = income[0].get('revenue', 0) or 0
        rev_prev = income[1].get('revenue', 0) or 0
        growth_now = ((rev_now / rev_prev) - 1) * 100 if rev_prev > 0 else None

        if len(income) >= 3:
            rev_prev2 = income[2].get('revenue', 0) or 0
            growth_prev = ((rev_prev / rev_prev2) - 1) * 100 if rev_prev2 > 0 else None
            if growth_now is not None and growth_prev is not None:
                result.l3.rev_accel_annual = growth_now - growth_prev

        # OPM direction
        ni_now = income[0].get('netIncome', 0) or 0
        ni_prev = income[1].get('netIncome', 0) or 0
        opm_now = (ni_now / rev_now * 100) if rev_now > 0 else None
        opm_prev = (ni_prev / rev_prev * 100) if rev_prev > 0 else None
        if opm_now is not None and opm_prev is not None:
            result.l3.opm_direction_annual = opm_now - opm_prev

        # EPS improving
        eps_now = income[0].get('epsDiluted') or income[0].get('eps', 0)
        eps_prev = income[1].get('epsDiluted') or income[1].get('eps', 0)
        if eps_now and eps_prev:
            result.l3.eps_improving_annual = eps_now > eps_prev

    # --- L3: Analyst Coverage ---
    if estimates and len(estimates) > 0:
        result.l3.analyst_coverage_count = estimates[0].get('numAnalystsEps')

    # --- L1 Enhanced: Self-Relative Valuation (from 10Y ratios) ---
    _extract_l1_self_relative(result, ratios_10y, key_metrics_10y)

    # --- PE Distortion Detection (from quarterly income) ---
    if income_quarterly and len(income_quarterly) >= 4:
        ni_quarters = [q.get('netIncome', 0) for q in income_quarterly[:4] if q.get('netIncome')]
        if len(ni_quarters) >= 4:
            avg_ni = sum(ni_quarters) / len(ni_quarters)
            max_ni = max(ni_quarters)
            if avg_ni > 0 and max_ni > avg_ni * 3:
                result.flags.append(f"FLAG: PE可能被一次性项目扭曲(最大季度NI={max_ni/1e9:.1f}B是均值{avg_ni/1e9:.1f}B的{max_ni/avg_ni:.1f}x)")

    # --- L4: 品质护城河 (from 10Y annual data) ---
    _extract_l4(result, income_10y, ratios_10y, cashflow_10y, key_metrics_10y, income, cashflow, key_metrics)

    # --- L5: 逆转拐点 (from quarterly data) ---
    _extract_l5(result, income_quarterly, ratios_quarterly, earnings_surprises, estimates)

    # --- L5 Enhanced: Deleveraging Trend (from 10Y balance/income) ---
    _extract_l5_deleveraging(result, income_10y, balance, key_metrics_10y)

    # --- L5: Management signals (manually curated) ---
    mgmt = profile.get('_mgmt_signals', {})
    if not mgmt:
        # Also check top-level data (from inject_stage2.py)
        pass  # handled in run_screen.py via process_single
    if mgmt:
        result.l5.new_ceo_within_2y = mgmt.get('new_ceo_within_2y', False)
        result.l5.new_strategy_signal = mgmt.get('new_strategy_signal', False)

    return result


def _percentile(value: float, historical: list[float]) -> float:
    """Calculate what percentile `value` falls in within `historical`. Returns 0-100."""
    if not historical:
        return 50.0
    below = sum(1 for h in historical if h < value)
    return (below / len(historical)) * 100


def _extract_l1_self_relative(
    result: StockScreenResult,
    ratios_10y: list[dict],
    key_metrics_10y: list[dict],
):
    """Extract self-relative valuation from 10-year PE/EV-EBITDA history."""
    s = result.l1

    # --- PE percentile ---
    if ratios_10y and len(ratios_10y) >= 3:
        pe_history = []
        for r in ratios_10y:
            pe = r.get('priceToEarningsRatio') or r.get('priceEarningsRatio')
            if pe is not None and 0 < pe < 200:  # filter outliers
                pe_history.append(pe)

        if pe_history and s.pe_ttm is not None and s.pe_ttm > 0:
            s.pe_percentile_10y = _percentile(s.pe_ttm, pe_history)
            median_pe = sorted(pe_history)[len(pe_history) // 2]
            s.pe_median_10y = median_pe
            s.pe_vs_median = (s.pe_ttm / median_pe) - 1 if median_pe > 0 else None

    # --- EV/EBITDA percentile ---
    if key_metrics_10y and len(key_metrics_10y) >= 3:
        ev_history = []
        for km in key_metrics_10y:
            ev_ebitda = km.get('evToEBITDA') or km.get('enterpriseValueOverEBITDA')
            if ev_ebitda is not None and 0 < ev_ebitda < 100:
                ev_history.append(ev_ebitda)

        if ev_history and s.ev_ebit is not None and s.ev_ebit > 0:
            s.ev_ebitda_percentile_10y = _percentile(s.ev_ebit, ev_history)


def _extract_l5_deleveraging(
    result: StockScreenResult,
    income_10y: list[dict],
    balance: list[dict],
    key_metrics_10y: list[dict],
):
    """Extract deleveraging trend signals."""
    s = result.l5

    if not key_metrics_10y or len(key_metrics_10y) < 3:
        return

    # Net Debt / EBITDA trend
    nd_ebitda_series = []
    for km in key_metrics_10y:
        nd = km.get('netDebtToEBITDA') or km.get('netDebt')
        ebitda = km.get('ebitda') or km.get('enterpriseValue')
        # Try netDebtToEBITDA directly first
        ratio = km.get('netDebtToEBITDA')
        if ratio is not None:
            nd_ebitda_series.append(ratio)

    if len(nd_ebitda_series) >= 3:
        s.net_debt_ebitda_now = nd_ebitda_series[0]
        if len(nd_ebitda_series) >= 4:
            s.net_debt_ebitda_3y_ago = nd_ebitda_series[3]
            if s.net_debt_ebitda_3y_ago is not None and s.net_debt_ebitda_3y_ago != 0:
                s.deleveraging_rate = (s.net_debt_ebitda_now - s.net_debt_ebitda_3y_ago) / 3.0

    # Interest Coverage trend (EBIT / Interest Expense)
    if income_10y and len(income_10y) >= 3:
        ic_series = []
        for inc in income_10y[:5]:  # recent 5 years
            ebit = inc.get('operatingIncome', 0)
            interest = inc.get('interestExpense', 0)
            if interest and interest != 0 and ebit:
                ic_series.append(abs(ebit / interest))

        if len(ic_series) >= 2:
            # Positive slope = improving coverage
            s.interest_coverage_trend = _linear_slope(list(reversed(ic_series)))


def _extract_l4(
    result: StockScreenResult,
    income_10y: list[dict],
    ratios_10y: list[dict],
    cashflow_10y: list[dict],
    key_metrics_10y: list[dict],
    income: list[dict],
    cashflow: list[dict],
    key_metrics: list[dict],
):
    """Extract L4 signals from 10-year annual history."""
    s = result.l4

    # --- Gross Margin trend (10Y) ---
    if ratios_10y and len(ratios_10y) >= 3:
        gm_series = []
        for r in reversed(ratios_10y):  # oldest first
            gm = r.get('grossProfitMargin')
            if gm is not None:
                gm_pct = gm * 100 if abs(gm) < 1 else gm
                gm_series.append(gm_pct)
        if len(gm_series) >= 3:
            s.gross_margin_latest = gm_series[-1]
            s.gross_margin_10y_slope = _linear_slope(gm_series)
            s.gross_margin_stability = _stdev(gm_series)

    # --- Revenue analysis (10Y) ---
    if income_10y and len(income_10y) >= 3:
        rev_series = []
        for inc in reversed(income_10y):  # oldest first
            rev = inc.get('revenue', 0)
            if rev and rev > 0:
                rev_series.append(rev)

        if len(rev_series) >= 3:
            # YoY growth rates
            yoy = [(rev_series[i] / rev_series[i-1] - 1) * 100
                    for i in range(1, len(rev_series)) if rev_series[i-1] > 0]

            if yoy:
                s.revenue_volatility_10y = _stdev(yoy)
                s.positive_growth_years = sum(1 for g in yoy if g > 0)

            # CAGR
            n = len(rev_series)
            s.revenue_cagr_10y = _cagr(rev_series[0], rev_series[-1], n - 1)

            if n >= 4:
                s.revenue_cagr_3y = _cagr(rev_series[-4], rev_series[-1], 3)

            if s.revenue_cagr_10y is not None and s.revenue_cagr_3y is not None:
                s.growth_acceleration = s.revenue_cagr_3y - s.revenue_cagr_10y

            # Max revenue drop
            if yoy:
                s.max_revenue_drop_10y = min(yoy)

            # 2020 drop (look for year ~2020)
            for inc in income_10y:
                date_str = inc.get('date', '')
                if '2020' in date_str:
                    rev_2020 = inc.get('revenue', 0)
                    # Find 2019
                    for inc2 in income_10y:
                        if '2019' in inc2.get('date', ''):
                            rev_2019 = inc2.get('revenue', 0)
                            if rev_2019 and rev_2019 > 0:
                                s.revenue_drop_2020 = (rev_2020 / rev_2019 - 1) * 100
                            break
                    break

    # --- ROIC history ---
    roic_src = key_metrics_10y if key_metrics_10y and len(key_metrics_10y) >= 3 else key_metrics
    if roic_src and len(roic_src) >= 2:
        roic_vals = []
        for km in roic_src:
            r = km.get('returnOnInvestedCapital') or km.get('roic')
            if r is not None:
                roic_pct = r * 100 if abs(r) < 1 else r
                roic_vals.append(roic_pct)
        if roic_vals:
            # 5Y mean (or whatever we have)
            recent = roic_vals[:min(5, len(roic_vals))]
            s.roic_5y_mean = sum(recent) / len(recent)
            if len(roic_vals) >= 3:
                s.roic_trend = _linear_slope(list(reversed(roic_vals[-5:])))

    # --- SBC / Revenue ---
    if income and cashflow and len(income) > 0 and len(cashflow) > 0:
        rev = income[0].get('revenue', 0)
        sbc = cashflow[0].get('stockBasedCompensation', 0)
        if rev and rev > 0 and sbc is not None:
            s.sbc_revenue_pct = abs(sbc) / rev * 100

    # --- Compounding Speed: FCF Margin + CapEx Intensity ---
    src_inc = income_10y if income_10y and len(income_10y) >= 2 else income
    src_cf = cashflow_10y if cashflow_10y and len(cashflow_10y) >= 2 else (cashflow if cashflow else [])
    if src_inc and src_cf and len(src_inc) > 0 and len(src_cf) > 0:
        # Latest year FCF margin
        rev_latest = src_inc[0].get('revenue', 0)
        ocf_latest = src_cf[0].get('operatingCashFlow', 0) or src_cf[0].get('netCashProvidedByOperatingActivities', 0)
        capex_latest = abs(src_cf[0].get('capitalExpenditure', 0) or 0)
        rnd_latest = src_inc[0].get('researchAndDevelopmentExpenses', 0) or 0

        if rev_latest and rev_latest > 0:
            fcf_latest = ocf_latest - capex_latest
            sbc_latest = abs(src_cf[0].get('stockBasedCompensation', 0) or 0)
            s.fcf_margin = (fcf_latest / rev_latest) * 100
            s.real_fcf_margin = ((fcf_latest - sbc_latest) / rev_latest) * 100  # 扣SBC后真实复利
            s.capex_intensity = (capex_latest / rev_latest) * 100
            s.reinvestment_need = ((capex_latest + rnd_latest) / rev_latest) * 100

        # FCF margin trend (3Y slope)
        fcf_margins = []
        for i in range(min(5, len(src_inc), len(src_cf))):
            r = src_inc[i].get('revenue', 0)
            o = src_cf[i].get('operatingCashFlow', 0) or src_cf[i].get('netCashProvidedByOperatingActivities', 0)
            c = abs(src_cf[i].get('capitalExpenditure', 0) or 0)
            if r and r > 0:
                fcf_margins.append(((o - c) / r) * 100)
        if len(fcf_margins) >= 3:
            s.fcf_margin_trend = _linear_slope(list(reversed(fcf_margins)))

        # Compounding power: FCF margin × (1 + rev_cagr)
        if s.fcf_margin is not None and s.revenue_cagr_10y is not None:
            real = s.real_fcf_margin if s.real_fcf_margin is not None else s.fcf_margin
            if real is not None:
                s.compounding_power = real * (1 + s.revenue_cagr_10y / 100)

    # --- FCF Conversion ---
    if income and cashflow and len(income) >= 2 and len(cashflow) >= 2:
        conversions = []
        for i in range(min(3, len(income), len(cashflow))):
            ni = income[i].get('netIncome', 0)
            cfo = cashflow[i].get('operatingCashFlow', 0) or cashflow[i].get('netCashProvidedByOperatingActivities', 0)
            if ni and ni > 0:
                conversions.append(cfo / ni)
        if conversions:
            s.fcf_conversion = sum(conversions) / len(conversions)

    # --- 5Y Share change ---
    if income_10y and len(income_10y) >= 5:
        so_now = income_10y[0].get('weightedAverageShsOut', 0)
        so_5y = None
        for inc in income_10y[4:6]:  # ~5 years back
            so_5y = inc.get('weightedAverageShsOut', 0)
            if so_5y and so_5y > 0:
                break
        if so_now and so_5y and so_5y > 0 and so_now > 0:
            s.shares_change_5y = (so_now / so_5y - 1) * 100

    # --- EPS Growth Decomposition ---
    if income_10y and len(income_10y) >= 5:
        eps_now = income_10y[0].get('epsDiluted') or income_10y[0].get('eps', 0)
        eps_5y = None
        for inc in income_10y[4:6]:
            e = inc.get('epsDiluted') or inc.get('eps', 0)
            if e and e > 0:
                eps_5y = e
                break
        if eps_now and eps_5y and eps_5y > 0 and eps_now > 0:
            s.eps_cagr_5y = _cagr(eps_5y, eps_now, 5)

            # Decompose: EPS = (NI/Rev) × (Rev/Shares) = NetMargin × RevPerShare
            rev_now = income_10y[0].get('revenue', 0) or 0
            rev_5y = 0
            so_now_d = income_10y[0].get('weightedAverageShsOutDil') or income_10y[0].get('weightedAverageShsOut', 0) or 1
            so_5y_d = 1
            for inc in income_10y[4:6]:
                r = inc.get('revenue', 0)
                sod = inc.get('weightedAverageShsOutDil') or inc.get('weightedAverageShsOut', 0)
                if r and r > 0 and sod and sod > 0:
                    rev_5y = r
                    so_5y_d = sod
                    break

            if rev_now > 0 and rev_5y > 0 and so_5y_d > 0 and so_now_d > 0:
                rev_growth = (rev_now / rev_5y) ** 0.2 - 1  # annualized
                share_reduction = 1 - (so_now_d / so_5y_d) ** 0.2  # annualized buyback contribution
                total_eps_growth = (eps_now / eps_5y) ** 0.2 - 1 if eps_5y > 0 else 0
                margin_contribution = total_eps_growth - rev_growth - share_reduction if total_eps_growth != 0 else 0

                if total_eps_growth > 0:
                    s.eps_from_revenue = (rev_growth / total_eps_growth) * 100
                    s.eps_from_buyback = (share_reduction / total_eps_growth) * 100
                    s.eps_from_margin = (margin_contribution / total_eps_growth) * 100

                    # Classify
                    if s.eps_from_revenue >= 50:
                        s.eps_quality = "revenue_driven"
                    elif s.eps_from_buyback >= 50:
                        s.eps_quality = "buyback_driven"
                    else:
                        s.eps_quality = "margin_driven"


def _extract_l5(
    result: StockScreenResult,
    income_quarterly: list[dict],
    ratios_quarterly: list[dict],
    earnings_surprises: list[dict],
    estimates: list[dict],
):
    """Extract L5 signals from quarterly data."""
    s = result.l5

    # --- Revenue Acceleration (quarterly) ---
    if income_quarterly and len(income_quarterly) >= 6:
        # Need YoY growth: compare each Q to same Q prior year
        # income_quarterly[0] = most recent, sorted descending
        rev_list = [(q.get('date', ''), q.get('revenue', 0)) for q in income_quarterly]

        # Compute YoY growth for recent quarters (need 8Q for 4 YoY comparisons)
        # Simpler approach: just compare absolute revenue levels
        recent_2 = [q.get('revenue', 0) for q in income_quarterly[:2]]
        prior_4 = [q.get('revenue', 0) for q in income_quarterly[2:6]]

        if all(r > 0 for r in recent_2) and all(r > 0 for r in prior_4):
            avg_recent = sum(recent_2) / 2
            avg_prior = sum(prior_4) / 4
            if avg_prior > 0:
                s.rev_growth_recent_2q = (avg_recent / avg_prior - 1) * 100
                # Compare to longer trend
                s.rev_acceleration = s.rev_growth_recent_2q  # simplified: positive = growing faster than prior

    # --- OPM Inflection (quarterly) ---
    if ratios_quarterly and len(ratios_quarterly) >= 6:
        opm_recent = []
        opm_prior = []
        for i, r in enumerate(ratios_quarterly[:6]):
            opm = r.get('operatingProfitMargin')
            if opm is None:
                opm = r.get('operatingIncomeRatio')
            if opm is not None:
                opm_pct = opm * 100 if abs(opm) < 1 else opm
                if i < 2:
                    opm_recent.append(opm_pct)
                else:
                    opm_prior.append(opm_pct)

        if opm_recent and opm_prior:
            s.opm_recent_2q = sum(opm_recent) / len(opm_recent)
            s.opm_prior_4q = sum(opm_prior) / len(opm_prior)
            s.opm_inflection = s.opm_recent_2q - s.opm_prior_4q

    # --- EPS Revision from estimates ---
    if estimates and len(estimates) >= 2:
        # Compare most recent and ~3 month old estimate
        eps_now = estimates[0].get('epsAvg')
        eps_prior = estimates[1].get('epsAvg')
        if eps_now and eps_prior and eps_prior != 0:
            s.eps_revision_3m_pct = (eps_now / eps_prior - 1) * 100


# ============================================================
# Reporting
# ============================================================

def format_signal_card(r: StockScreenResult) -> str:
    """生成单只股票的信号卡片 (文本格式)"""
    lines = []
    lines.append(f"{'='*60}")
    lines.append(f"  {r.symbol} | {r.name}")
    lines.append(f"  市值: ${r.market_cap/1e9:.1f}B | 行业: {r.sector}")
    lines.append(f"  综合得分: {r.composite_score:.1f}/10")
    if r.vetoes:
        lines.append(f"  ⛔ 否决: {'; '.join(r.vetoes)}")
    lines.append(f"{'='*60}")

    # L1
    lines.append(f"\n  L1 可能便宜了 [{r.l1.score:.1f}/10]")
    lines.append(f"    EV/EBITDA: {_fmt(r.l1.ev_ebit, '.1f')} | PE: {_fmt(r.l1.pe_ttm, '.1f')} | PB: {_fmt(r.l1.pb, '.2f')}")
    lines.append(f"    FCF Yield: {_fmt(r.l1.fcf_yield, '.1f')}% | Shareholder Yield: {_fmt(r.l1.shareholder_yield, '.1f')}%")
    lines.append(f"    Insider Buy(6m): {r.l1.insider_buy_count_6m}笔 ${r.l1.insider_buy_value_6m/1e6:.2f}M | Cluster: {r.l1.insider_cluster}")
    lines.append(f"    流通股变化(1Y): {_fmt(r.l1.shares_change_1y, '.1f')}%")

    # L2
    lines.append(f"\n  L2 便宜不是陷阱 [{r.l2.score:.1f}/10]")
    lines.append(f"    Accruals: {_fmt(r.l2.accruals_ratio, '.3f')} | CFO/NI: {_fmt(r.l2.cfo_ni_ratio, '.2f')}x")
    lines.append(f"    GP/Assets: {_fmt(r.l2.gross_profit_assets, '.3f')} | ROIC: {_fmt(r.l2.roic, '.1f')}% | ROE: {_fmt(r.l2.roe, '.1f')}%")
    lines.append(f"    Asset Growth(1Y): {_fmt(r.l2.asset_growth_1y, '.1f')}%")
    lines.append(f"    F-Score: {r.l2.f_score}/9 {_fmt_f_components(r.l2.f_components)}")
    if r.l2.short_interest_pct is not None:
        lines.append(f"    Short Interest: {r.l2.short_interest_pct:.1f}%")

    # L3
    lines.append(f"\n  L3 市场开始纠错 [{r.l3.score:.1f}/10]")
    lines.append(f"    52周位置: {_fmt(r.l3.price_52w_pct, '.0%')}")
    if r.l3.earnings_surprise_last is not None:
        lines.append(f"    最近Surprise: {r.l3.earnings_surprise_last:.1f}% (连续{r.l3.earnings_surprise_streak}次)")
    if r.l3.estimate_revision_3m is not None:
        lines.append(f"    3月盈利修正: {r.l3.estimate_revision_3m:+.1f}%")

    # Flags
    if r.flags:
        lines.append(f"\n  ⚠️  警告: {'; '.join(r.flags)}")

    lines.append("")
    return "\n".join(lines)


def format_ranking_table(results: list[StockScreenResult]) -> str:
    """生成排名表"""
    # Sort by composite, exclude vetoed
    active = [r for r in results if not r.vetoes]
    vetoed = [r for r in results if r.vetoes]
    active.sort(key=lambda r: r.composite_score or 0, reverse=True)

    lines = []
    lines.append(f"\n{'='*80}")
    lines.append(f"  低估股筛选排名 | {len(active)}只通过 / {len(vetoed)}只否决 / {len(results)}只总计")
    lines.append(f"{'='*80}")
    lines.append(f"  {'#':>3} {'Symbol':<8} {'Name':<20} {'Comp':>5} {'L1':>5} {'L2':>5} {'L3':>5} {'F':>3} {'Insider':>8}")
    lines.append(f"  {'-'*74}")

    for i, r in enumerate(active, 1):
        insider_str = f"${r.l1.insider_buy_value_6m/1e6:.1f}M" if r.l1.insider_buy_value_6m > 0 else "-"
        lines.append(
            f"  {i:>3} {r.symbol:<8} {r.name[:20]:<20} "
            f"{r.composite_score:>5.1f} {r.l1.score:>5.1f} {r.l2.score:>5.1f} {r.l3.score:>5.1f} "
            f"{r.l2.f_score or 0:>3} {insider_str:>8}"
        )

    if vetoed:
        lines.append(f"\n  --- 否决 ---")
        for r in vetoed:
            lines.append(f"  ⛔ {r.symbol:<8} {r.name[:20]:<20} | {r.vetoes[0]}")

    lines.append("")
    return "\n".join(lines)


def _fmt(val, fmt_str):
    if val is None:
        return "N/A"
    if '%' in fmt_str:
        return f"{val:{fmt_str}}"
    return f"{val:{fmt_str}}"


def _fmt_f_components(components: dict) -> str:
    if not components:
        return ""
    passed = [k.split('_', 1)[1] for k, v in components.items() if v == 1]
    return f"({', '.join(passed[:4])}{'...' if len(passed) > 4 else ''})"


# ============================================================
# File I/O
# ============================================================

def save_results(results: list[StockScreenResult], output_dir: str = "data/screener", stage2: bool = False):
    """保存筛选结果到JSON + 文本报告"""
    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)

    # JSON (machine-readable)
    json_data = []
    for r in results:
        d = {
            'symbol': r.symbol,
            'name': r.name,
            'market_cap': r.market_cap,
            'sector': r.sector,
            'composite_score': r.composite_score,
            'stage2_score': r.stage2_score,
            'l1_score': r.l1.score,
            'l2_score': r.l2.score,
            'l3_score': r.l3.score,
            'l4_score': r.l4.score,
            'l5_score': r.l5.score,
            'f_score': r.l2.f_score,
            'gross_margin': r.l4.gross_margin_latest,
            'gm_slope': r.l4.gross_margin_10y_slope,
            'roic_5y': r.l4.roic_5y_mean,
            'rev_cagr_10y': r.l4.revenue_cagr_10y,
            'rev_cagr_3y': r.l4.revenue_cagr_3y,
            'opm_inflection': r.l5.opm_inflection,
            'rev_acceleration': r.l5.rev_acceleration,
            'ev_ebitda': r.l1.ev_ebit,
            'fcf_yield': r.l1.fcf_yield,
            'shareholder_yield': r.l1.shareholder_yield,
            'fcf_margin': r.l4.fcf_margin,
            'real_fcf_margin': r.l4.real_fcf_margin,
            'sbc_revenue_pct': r.l4.sbc_revenue_pct,
            'data_confidence': getattr(r, '_data_confidence', '?'),
            'asset_dna': r.l6.asset_dna,
            'tailwind': r.l6.tailwind_label,
            'vetoes': r.vetoes,
            'flags': r.flags,
        }
        json_data.append(d)

    with open(out / "screen_results.json", 'w') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    # Text report — Stage 2模式用stage2_score排序
    if stage2:
        active = sorted(
            [r for r in results if not r.vetoes and r.stage2_score],
            key=lambda r: r.stage2_score or 0,
            reverse=True
        )
        with open(out / "screen_report.txt", 'w') as f:
            # Write Stage 2 ranking header
            f.write(f"\nStage 2 深筛排名 | {len(active)}只通过\n")
            f.write(f"{'#':>3} {'Symbol':<6} {'S2':>5} {'L4':>5} {'L5':>5} {'信':>2}\n")
            f.write("-"*30 + "\n")
            for i, r in enumerate(active[:50], 1):
                conf = getattr(r, '_data_confidence', '?')
                f.write(f"{i:>3} {r.symbol:<6} {r.stage2_score:>5.1f} {r.l4.score:>5.1f} {r.l5.score:>5.1f} {conf:>2}\n")
    else:
        active = sorted(
            [r for r in results if not r.vetoes],
            key=lambda r: r.composite_score or 0,
            reverse=True
        )
        with open(out / "screen_report.txt", 'w') as f:
            f.write(format_ranking_table(results))
            f.write("\n\n" + "="*80 + "\n  详细信号卡片\n" + "="*80 + "\n")
            for r in active[:20]:
                f.write(format_signal_card(r))

    print(f"Results saved to {out}/screen_results.json + screen_report.txt")
    return out / "screen_results.json"


# ============================================================
# CLI Entry Point
# ============================================================

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python signals.py <data_dir>")
        print("  data_dir should contain per-symbol JSON files from FMP")
        sys.exit(1)

    data_dir = Path(sys.argv[1])
    results = []

    for f in sorted(data_dir.glob("*.json")):
        with open(f) as fh:
            data = json.load(fh)

        result = extract_signals_from_fmp(
            profile=data.get('profile', {}),
            income=data.get('income', []),
            balance=data.get('balance', []),
            cashflow=data.get('cashflow', []),
            ratios=data.get('ratios', []),
            key_metrics=data.get('key_metrics', []),
            insider_trades=data.get('insider_trades', []),
            quote=data.get('quote', {}),
            earnings_surprises=data.get('earnings_surprises', []),
            estimates=data.get('estimates', []),
        )
        compute_composite(result)
        results.append(result)

    print(format_ranking_table(results))
    save_results(results)
