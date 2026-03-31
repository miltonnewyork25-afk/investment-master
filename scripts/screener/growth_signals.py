#!/usr/bin/env python3
"""
Growth Inflection Detection (GID) — Signal Engine v3.0

v3.0: 从"找加速"升级为"找高质量新兴加速"。

核心理念改革:
  v1: 加速了吗？→ 找到了DELL(以价换量)排前面
  v2: 加速+质量？→ 找到了PLTR(质量好但$346B全球皆知)排前面
  v3: 加速+质量+发现概率？→ 找"市场还没注意到的高质量加速"

八层信号:
  G1: 加速检测       — 收入增速的导数 + 基数效应调整 + 多指标确认
  G2: 经营杠杆阶段   — 5阶段分类 + 增量利润率 + 盈利性转折精确定位
  G3: 增长质量       — 库存/应收/价vs量/递延 + 销售效率 + 毛利率稳定性 + 多季持续性
  G4: 规模经济       — 增量ROIC/FCF拐点/Rule of 40 + 资产负债表健康度
  G5: 定价滞后       — beat模式/估值vs增速背离
  G6: 聪明钱         — 内部人/回购
  G7: 发现概率       — 市值折扣/覆盖缺口/关注度/基数效应 (v3.0新增)
  G8: 模式识别       — 5种原型分类 (v3.0新增)

v3.0关键升级:
  1. 销售效率(S&M/Rev趋势) — 产品市场契合度的最硬财务证据
  2. 发现概率 — $20B公司加速 >> $300B公司加速(信息差)
  3. 基数效应 — 5%→15%(3x)比50%→70%(1.4x)更有信号价值
  4. 盈利转折阶段 — 从亏损到EBITDA+到OCF+到FCF+,精确定位在哪一步
  5. 多指标确认 — 单指标加速=噪音,3+指标同时改善=信号
  6. 原型分类 — Stealth Compounder / Leverage Breakout / Hyper Scaler / Mature Re-accel / Momentum Trap
"""

import json
import math
import sys
from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime, timedelta


# ============================================================
# Data Structures
# ============================================================

@dataclass
class G1Signals:
    """G1: 加速检测 — 增速在提速吗？增速从哪来？质量如何？"""
    # Revenue YoY by quarter (Q0=latest)
    rev_yoy: list = field(default_factory=list)  # [q0, q1, q2, q3] YoY%
    rev_acceleration: Optional[float] = None      # avg(q0,q1) - avg(q2,q3) pp
    rev_accel_consecutive: int = 0                # 连续加速Q数

    # Gross Profit Acceleration
    gp_yoy: list = field(default_factory=list)
    gp_faster_than_rev: Optional[bool] = None
    gp_rev_spread: Optional[float] = None         # GP增速 - Rev增速 pp

    # Operating Income Acceleration
    oi_yoy: list = field(default_factory=list)
    oi_faster_than_rev: Optional[bool] = None
    oi_rev_spread: Optional[float] = None

    # Cascading Leverage Test
    cogs_yoy_q0: Optional[float] = None
    opex_yoy_q0: Optional[float] = None
    cascade_test: Optional[str] = None            # "full"/"partial"/"none"

    # v3.0: Acceleration Quality
    base_growth_level: Optional[float] = None     # 加速前的基础增速(q2q3均值)
    accel_from_low_base: Optional[bool] = None    # 从低基数加速(更有信号价值)
    accel_multiplier: float = 1.0                 # 基数调整: 低基数加速1.3x, 高基数0.8x
    multi_metric_confirm: int = 0                 # 同时改善的指标数(rev+gm+opm+inv)
    multi_metric_details: list = field(default_factory=list)  # 哪些指标在同步改善

    score: Optional[float] = None


@dataclass
class G2Signals:
    """G2: 经营杠杆阶段识别 — 公司处于哪个阶段？"""
    # Operating Leverage Phase (核心输出)
    phase: Optional[str] = None                   # "investment"/"inflection"/"release"/"mature"/"decline"
    phase_score: Optional[float] = None           # 0-10, release=10, decline=0

    # Incremental Margins (增量利润率 — 杠杆释放的铁证)
    incremental_gross_margin: Optional[float] = None   # ΔGP / ΔRev (最近Q vs 去年同Q)
    incremental_op_margin: Optional[float] = None      # ΔOI / ΔRev
    incremental_vs_average_gm: Optional[float] = None  # 增量GM - 平均GM (正=杠杆释放)
    incremental_vs_average_opm: Optional[float] = None # 增量OPM - 平均OPM

    # Fixed Cost Absorption (固定成本摊薄)
    da_rev_q0: Optional[float] = None             # D&A/Rev最新季%
    da_rev_q4: Optional[float] = None             # D&A/Rev去年同季%
    da_absorption: Optional[float] = None         # D&A/Rev变化(负=摊薄)
    sga_rev_q0: Optional[float] = None
    sga_rev_q4: Optional[float] = None
    sga_absorption: Optional[float] = None
    rd_rev_q0: Optional[float] = None
    rd_rev_q4: Optional[float] = None
    rd_absorption: Optional[float] = None

    # Margin Trajectory (利润率轨迹)
    gm_trajectory: list = field(default_factory=list)   # 最近4Q的GM% [q0,q1,q2,q3]
    opm_trajectory: list = field(default_factory=list)
    gm_trend_direction: Optional[float] = None    # 线性斜率(正=扩张)
    opm_trend_direction: Optional[float] = None

    # v3.0: Profitability Transition Stage (盈利转折精确定位)
    profit_transition: Optional[str] = None       # 当前处于哪个转折
    # "pre_ebitda"  : 尚未EBITDA盈利
    # "ebitda_turn" : EBITDA刚转正(最早期信号)
    # "ocf_turn"    : 经营现金流刚转正
    # "fcf_turn"    : 自由现金流刚转正(核心拐点★)
    # "fcf_expand"  : FCF margin在扩张(成熟质量增长)
    # "profitable"  : 一直盈利,没有转折
    ebitda_margin_q0: Optional[float] = None
    ocf_margin_q0: Optional[float] = None         # (需要年化数据近似)

    score: Optional[float] = None


@dataclass
class G3Signals:
    """G3: 增长质量 — 增长是真需求还是虚胖？"""
    # Inventory Health (库存健康度 — 实物类公司关键信号)
    has_inventory: bool = False
    inv_turnover_q0: Optional[float] = None       # 最新季库存周转率
    inv_turnover_q4: Optional[float] = None       # 去年同季
    inv_turnover_trend: Optional[float] = None    # 变化(正=加快周转=健康)
    inv_turnover_consecutive_improve: int = 0     # 连续改善Q数
    inv_growth_vs_rev_growth: Optional[float] = None  # 库存增速-收入增速(负=精益)
    channel_stuffing_risk: Optional[bool] = None  # 库存↑+应收↑+收入平=高风险

    # Receivables Health (应收账款 — 真需求验证)
    recv_turnover_q0: Optional[float] = None
    recv_turnover_q4: Optional[float] = None
    recv_turnover_trend: Optional[float] = None   # 正=客户付款更快=需求强
    dso_improving: Optional[bool] = None          # Days Sales Outstanding改善?

    # Cash Conversion Cycle (现金转化周期)
    ccc_proxy_q0: Optional[float] = None          # 1/InvTurn + 1/RecvTurn - 1/PayTurn
    ccc_proxy_q4: Optional[float] = None
    ccc_improving: Optional[bool] = None          # CCC缩短 = 营运效率提升

    # Price vs Volume Decomposition (价vs量分解)
    growth_type: Optional[str] = None             # "pricing_power"/"volume"/"mixed"/"negative"
    # 逻辑: GM扩+Rev增=定价权; GM平+Rev增=量; GM缩+Rev增=以价换量(低质量)
    gm_delta_yoy: Optional[float] = None          # 毛利率YoY变化pp
    rev_growth_yoy: Optional[float] = None        # 收入YoY增速%

    # Deferred Revenue (递延收入 — SaaS/订阅制公司前瞻指标)
    has_deferred_rev: bool = False
    deferred_rev_growth: Optional[float] = None   # 递延收入增速%
    deferred_faster_than_rev: Optional[bool] = None  # 递延>收入增速 = 未来加速信号

    # Organic Growth Check (有机增长检查)
    potential_acquisition_flag: Optional[bool] = None  # 收入跳增>50%但无季度持续=可能并购
    acquisition_boost_flag: Optional[bool] = None     # v3.2: 并购驱动增长(商誉跳增或季度YoY跳变)
    acquisition_boost_detail: str = ""                # 触发原因

    # v3.0: Sales Efficiency (销售效率 — 产品市场契合度的最硬证据)
    sm_rev_q0: Optional[float] = None             # S&M/Rev最新季%(或SGA/Rev)
    sm_rev_q4: Optional[float] = None             # 去年同季
    sm_efficiency_delta: Optional[float] = None   # 变化(负=效率提升=产品自己卖自己)
    sm_efficiency_while_growing: Optional[bool] = None  # 效率提升+收入增长同时成立?
    sm_consecutive_improve: int = 0               # S&M/Rev连续下降Q数

    # v3.0: Gross Margin Durability (毛利率稳定性 — 护城河形成信号)
    gm_8q_stdev: Optional[float] = None           # 8季GM标准差(低=稳定=护城河)
    gm_8q_mean: Optional[float] = None            # 8季GM均值
    gm_durability_score: Optional[float] = None   # 高均值+低波动=强

    # v3.0: Multi-Quarter Persistence (多季持续性 — 区分信号vs噪音)
    persistence_count: int = 0                    # 连续2+Q同方向改善的指标数
    persistence_details: list = field(default_factory=list)

    # v3.1: Revenue Path Quality (增长路径质量 — 区分有机vs周期)
    rev_qoq_volatility: Optional[float] = None   # QoQ收入变化标准差%(高=波动大=周期性)
    rev_yoy_consistency: int = 0                  # YoY增速连续为正的季度数(高=可预测)
    rev_path_grade: Optional[str] = None          # "steady"/"moderate"/"lumpy"/"erratic"
    cyclicality_penalty: float = 1.0              # 波动惩罚因子(高波动→<1)

    score: Optional[float] = None


@dataclass
class G4Signals:
    """G4: 规模经济 + 增量回报 — 每多投1块钱赚多少？"""
    # Incremental ROIC (增量ROIC — 最核心的质量指标)
    roic_latest: Optional[float] = None           # 最新年度ROIC%
    roic_prior: Optional[float] = None            # 上年ROIC%
    roic_improving: Optional[bool] = None
    incremental_roic: Optional[float] = None      # ΔNOPAT / ΔInvested Capital %

    # FCF Inflection
    fcf_margin_latest: Optional[float] = None
    fcf_margin_prior: Optional[float] = None
    fcf_margin_delta: Optional[float] = None
    fcf_positive_inflection: Optional[bool] = None

    # Rule of 40 Trajectory (SaaS/成长股核心)
    rule_of_40_latest: Optional[float] = None     # RevGrowth% + FCFMargin%
    rule_of_40_prior: Optional[float] = None
    rule_of_40_trajectory: Optional[float] = None # 变化方向

    # SBC Discipline (SBC增速 vs 收入增速)
    sbc_rev_latest: Optional[float] = None
    sbc_rev_prior: Optional[float] = None
    sbc_growth_vs_rev_growth: Optional[float] = None  # SBC增速-Rev增速(负=纪律)

    # Compounding Power (复利力 = 真实FCF margin × (1+growth))
    real_fcf_margin: Optional[float] = None       # (OCF-CapEx-SBC)/Rev
    compounding_power: Optional[float] = None

    # v3.0: Balance Sheet Health (资产负债表健康度)
    net_cash: Optional[float] = None              # 现金-总债务 ($)
    net_cash_per_mcap: Optional[float] = None     # 净现金/市值 (正=有余粮)
    self_funding: Optional[bool] = None           # OCF > CapEx (不依赖外部融资)
    current_ratio: Optional[float] = None
    balance_sheet_grade: Optional[str] = None     # "fortress"/"healthy"/"adequate"/"stressed"

    score: Optional[float] = None


@dataclass
class G5Signals:
    """G5: 市场定价滞后 — 信息差还在吗？"""
    beat_count_4q: int = 0
    avg_beat_magnitude: Optional[float] = None
    beat_magnitude_increasing: Optional[bool] = None
    ev_sales: Optional[float] = None
    rev_growth_rate: Optional[float] = None
    growth_adjusted_ev_sales: Optional[float] = None
    forward_pe: Optional[float] = None
    trailing_pe: Optional[float] = None
    pe_compression: Optional[float] = None
    analyst_count: Optional[int] = None
    market_cap_b: Optional[float] = None
    coverage_density: Optional[float] = None
    estimate_revision_pct: Optional[float] = None
    score: Optional[float] = None


@dataclass
class G6Signals:
    """G6: 聪明钱确认"""
    insider_buy_count_6m: int = 0
    insider_buy_value_6m: float = 0.0
    insider_has_ceo_buy: bool = False
    insider_has_cfo_buy: bool = False
    insider_multi_role: bool = False
    insider_large_buy: bool = False
    insider_sell_count_6m: int = 0
    insider_sell_count_prior_6m: int = 0
    sell_reduction: Optional[float] = None
    shares_change_1y: Optional[float] = None
    score: Optional[float] = None


@dataclass
class G7Discovery:
    """G7: 发现概率 — 市场注意到了吗？"""
    # Market Cap Tier
    market_cap_b: Optional[float] = None
    mcap_tier: Optional[str] = None               # "micro"/<1B "small"/<10B "mid"/<50B "large"/<200B "mega"/>200B
    mcap_discovery_mult: float = 1.0              # <10B→1.3, 10-50→1.15, 50-200→1.0, >200→0.85

    # Analyst Coverage Gap
    analyst_count: Optional[int] = None
    coverage_per_growth: Optional[float] = None   # 覆盖数/增速 — 低=被忽视
    coverage_gap_score: Optional[float] = None

    # Valuation vs Quality Mismatch
    ev_sales_vs_quality: Optional[float] = None   # EV/Sales相对增长质量是否偏低

    # Base Effect Premium (从低基数加速的溢价)
    base_effect_mult: float = 1.0                 # 来自G1的基数调整

    # Composite
    discovery_multiplier: float = 1.0             # 综合发现概率乘数
    score: Optional[float] = None


@dataclass
class GIDResult:
    """Growth Inflection Detection complete result"""
    symbol: str
    name: str = ""
    market_cap: Optional[float] = None
    sector: str = ""
    industry: str = ""
    has_quarterly_data: bool = False
    quarterly_periods: int = 0

    g1: G1Signals = field(default_factory=G1Signals)
    g2: G2Signals = field(default_factory=G2Signals)
    g3: G3Signals = field(default_factory=G3Signals)
    g4: G4Signals = field(default_factory=G4Signals)
    g5: G5Signals = field(default_factory=G5Signals)
    g6: G6Signals = field(default_factory=G6Signals)
    g7: G7Discovery = field(default_factory=G7Discovery)

    # Quality-Adjusted Score
    raw_acceleration_score: Optional[float] = None
    quality_multiplier: Optional[float] = None
    discovery_multiplier: Optional[float] = None       # v3.0
    composite_score: Optional[float] = None
    leverage_phase: str = ""
    growth_quality: str = ""
    profit_transition: str = ""                        # v3.0
    archetype: str = ""                                # v3.0 模式分类

    vetoes: list = field(default_factory=list)
    flags: list = field(default_factory=list)
    signal_summary: str = ""


# ============================================================
# Helpers
# ============================================================

def _safe_div(a, b, default=None):
    if b is None or b == 0 or a is None:
        return default
    return a / b


def _yoy(current, prior):
    """YoY growth %, None if not computable."""
    if prior is None or prior == 0 or current is None:
        return None
    return (current - prior) / abs(prior) * 100


def _norm(value, low, high, invert=False):
    """Normalize to 0-10 scale."""
    if value is None:
        return 5.0
    clamped = max(low, min(high, value))
    s = (clamped - low) / (high - low) * 10 if high != low else 5.0
    return (10.0 - s) if invert else s


def _consec_positive(values):
    """Count leading positive values."""
    c = 0
    for v in values:
        if v is not None and v > 0:
            c += 1
        else:
            break
    return c


def _linear_slope(values):
    """Simple linear regression slope over index 0..n-1."""
    vals = [v for v in values if v is not None]
    n = len(vals)
    if n < 3:
        return None
    x_mean = (n - 1) / 2
    y_mean = sum(vals) / n
    num = sum((i - x_mean) * (v - y_mean) for i, v in enumerate(vals))
    den = sum((i - x_mean) ** 2 for i in range(n))
    return num / den if den != 0 else 0.0


def _get_q_field(quarters, idx, field_name, default=None):
    """Safely get a field from quarterly data at index idx."""
    if idx >= len(quarters):
        return default
    return quarters[idx].get(field_name) or default


def _get_q_ratio(ratios_q, idx, field_name, as_pct=True, default=None):
    """Safely get ratio and optionally convert to %."""
    if idx >= len(ratios_q):
        return default
    v = ratios_q[idx].get(field_name)
    if v is None:
        return default
    if as_pct and abs(v) < 2:  # Looks like decimal, convert to %
        return v * 100
    return v


# ============================================================
# G1: Acceleration Detection
# ============================================================

def extract_g1(income_q: list, ratios_q: list) -> G1Signals:
    g1 = G1Signals()
    if len(income_q) < 5:
        return g1

    # --- Extract quarterly sequences ---
    def _seq(field_name, n=8):
        return [_get_q_field(income_q, i, field_name) for i in range(min(n, len(income_q)))]

    revs = _seq('revenue')
    gps = _seq('grossProfit')
    ois = _seq('operatingIncome')
    cogss = _seq('costOfRevenue')
    opexes = _seq('operatingExpenses')

    # --- YoY growth rates (each Q vs same Q last year) ---
    def _yoy_series(vals):
        rates = []
        for i in range(min(4, len(vals) - 4)):
            rates.append(_yoy(vals[i], vals[i + 4]))
        return rates

    g1.rev_yoy = _yoy_series(revs)
    g1.gp_yoy = _yoy_series(gps)
    g1.oi_yoy = _yoy_series(ois)

    # --- Revenue Acceleration ---
    ry = g1.rev_yoy
    if len(ry) >= 4 and all(r is not None for r in ry[:4]):
        g1.rev_acceleration = (ry[0] + ry[1]) / 2 - (ry[2] + ry[3]) / 2
    elif len(ry) >= 2 and ry[0] is not None and ry[1] is not None:
        g1.rev_acceleration = ry[0] - ry[1]

    # Consecutive acceleration
    valid = [r for r in ry if r is not None]
    consec = 0
    for i in range(len(valid) - 1):
        if valid[i] > valid[i + 1]:
            consec += 1
        else:
            break
    g1.rev_accel_consecutive = consec

    # --- Gross Profit vs Revenue spread ---
    if g1.gp_yoy and g1.rev_yoy and g1.gp_yoy[0] is not None and g1.rev_yoy[0] is not None:
        g1.gp_rev_spread = g1.gp_yoy[0] - g1.rev_yoy[0]
        g1.gp_faster_than_rev = g1.gp_rev_spread > 0

    # --- Operating Income vs Revenue spread ---
    if g1.oi_yoy and g1.rev_yoy and g1.oi_yoy[0] is not None and g1.rev_yoy[0] is not None:
        raw_spread = g1.oi_yoy[0] - g1.rev_yoy[0]
        # v3.1: Cap OI spread at ±200pp — turnaround companies produce
        # absurd spreads (e.g., OI from $1M to $100M = +9900% YoY)
        g1.oi_rev_spread = max(-200, min(200, raw_spread))
        g1.oi_faster_than_rev = g1.oi_rev_spread > 0

    # --- Cascading Leverage Test ---
    # Rev growth > COGS growth > OpEx growth = full cascade
    cogs_yoy = _yoy_series(cogss)
    opex_yoy = _yoy_series(opexes)
    if cogs_yoy:
        g1.cogs_yoy_q0 = cogs_yoy[0]
    if opex_yoy:
        g1.opex_yoy_q0 = opex_yoy[0]

    if (g1.rev_yoy and g1.rev_yoy[0] is not None
        and g1.cogs_yoy_q0 is not None and g1.opex_yoy_q0 is not None):
        rev_g = g1.rev_yoy[0]
        # For cascade: check revenue > cogs AND cogs > opex growth
        rev_gt_cogs = rev_g > g1.cogs_yoy_q0
        rev_gt_opex = rev_g > g1.opex_yoy_q0
        if rev_gt_cogs and rev_gt_opex:
            g1.cascade_test = "full"
        elif rev_gt_cogs or rev_gt_opex:
            g1.cascade_test = "partial"
        else:
            g1.cascade_test = "none"

    # --- v3.0: Acceleration Quality ---
    ry = g1.rev_yoy
    valid_ry = [r for r in ry if r is not None]

    # Base growth level (what was growth BEFORE acceleration?)
    if len(valid_ry) >= 3:
        g1.base_growth_level = sum(valid_ry[1:]) / (len(valid_ry) - 1)
    elif len(valid_ry) >= 2:
        g1.base_growth_level = valid_ry[-1]

    # Low base acceleration premium
    if g1.base_growth_level is not None and g1.rev_acceleration is not None and g1.rev_acceleration > 0:
        if g1.base_growth_level < 10 and g1.rev_acceleration > 3:
            g1.accel_from_low_base = True
            g1.accel_multiplier = 1.3
        elif g1.base_growth_level < 20 and g1.rev_acceleration > 5:
            g1.accel_from_low_base = True
            g1.accel_multiplier = 1.15
        elif g1.base_growth_level > 50:
            # v3.2: 只有>50%才惩罚(DDOG 25%不应被罚)
            g1.accel_from_low_base = False
            g1.accel_multiplier = 0.90
        else:
            g1.accel_from_low_base = False

    # Multi-metric confirmation
    confirms = []
    if g1.rev_acceleration is not None and g1.rev_acceleration > 0:
        confirms.append("rev_accel")
    if g1.gp_faster_than_rev:
        confirms.append("gp>rev")
    if g1.oi_faster_than_rev:
        confirms.append("oi>rev")
    if g1.cascade_test == "full":
        confirms.append("cascade")
    g1.multi_metric_confirm = len(confirms)
    g1.multi_metric_details = confirms

    return g1


# ============================================================
# G2: Operating Leverage Phase Detection
# ============================================================

def extract_g2(income_q: list, ratios_q: list) -> G2Signals:
    """
    精确识别经营杠杆阶段。核心指标: 增量利润率。

    增量利润率(Incremental Margin) = ΔProfit / ΔRevenue
    如果增量OPM >> 平均OPM → 公司正在释放经营杠杆
    如果增量OPM << 平均OPM → 公司在投入期/杠杆在收缩
    """
    g2 = G2Signals()
    if len(income_q) < 5:
        return g2

    # --- Incremental Margins (最核心) ---
    # 用最近Q vs 去年同Q计算增量
    rev0 = _get_q_field(income_q, 0, 'revenue')
    rev4 = _get_q_field(income_q, 4, 'revenue')
    gp0 = _get_q_field(income_q, 0, 'grossProfit')
    gp4 = _get_q_field(income_q, 4, 'grossProfit')
    oi0 = _get_q_field(income_q, 0, 'operatingIncome')
    oi4 = _get_q_field(income_q, 4, 'operatingIncome')

    delta_rev = (rev0 - rev4) if (rev0 and rev4) else None

    if delta_rev and delta_rev > 0:
        if gp0 is not None and gp4 is not None:
            g2.incremental_gross_margin = (gp0 - gp4) / delta_rev * 100
        if oi0 is not None and oi4 is not None:
            g2.incremental_op_margin = (oi0 - oi4) / delta_rev * 100
    elif delta_rev and delta_rev < 0:
        # Revenue declining: incremental margin logic reverses
        # If profits decline slower than revenue, that's resilient
        if gp0 is not None and gp4 is not None:
            g2.incremental_gross_margin = (gp0 - gp4) / delta_rev * 100
        if oi0 is not None and oi4 is not None:
            g2.incremental_op_margin = (oi0 - oi4) / delta_rev * 100

    # Average margins for comparison
    avg_gm = None
    avg_opm = None
    if rev0 and rev0 > 0:
        if gp0 is not None:
            avg_gm = gp0 / rev0 * 100
        if oi0 is not None:
            avg_opm = oi0 / rev0 * 100

    if g2.incremental_gross_margin is not None and avg_gm is not None:
        g2.incremental_vs_average_gm = g2.incremental_gross_margin - avg_gm
    if g2.incremental_op_margin is not None and avg_opm is not None:
        g2.incremental_vs_average_opm = g2.incremental_op_margin - avg_opm

    # --- Fixed Cost Absorption ---
    for i in range(min(5, len(income_q))):
        q = income_q[i]
        rev = q.get('revenue', 0) or 0
        if rev <= 0:
            continue
        rd = (q.get('researchAndDevelopmentExpenses', 0) or 0) / rev * 100
        sga = (q.get('sellingGeneralAndAdministrativeExpenses', 0) or 0) / rev * 100
        # D&A: estimate from COGS + OpEx - (GP margin implies)
        da = (q.get('depreciationAndAmortization', 0) or 0) / rev * 100

        if i == 0:
            g2.rd_rev_q0 = rd
            g2.sga_rev_q0 = sga
            g2.da_rev_q0 = da
        elif i == 4:
            g2.rd_rev_q4 = rd
            g2.sga_rev_q4 = sga
            g2.da_rev_q4 = da

    if g2.rd_rev_q0 is not None and g2.rd_rev_q4 is not None:
        g2.rd_absorption = g2.rd_rev_q0 - g2.rd_rev_q4
    if g2.sga_rev_q0 is not None and g2.sga_rev_q4 is not None:
        g2.sga_absorption = g2.sga_rev_q0 - g2.sga_rev_q4
    if g2.da_rev_q0 is not None and g2.da_rev_q4 is not None:
        g2.da_absorption = g2.da_rev_q0 - g2.da_rev_q4

    # --- Margin Trajectory ---
    for i in range(min(4, len(income_q))):
        q = income_q[i]
        rev = q.get('revenue', 0) or 0
        if rev > 0:
            gp = q.get('grossProfit', 0) or 0
            oi = q.get('operatingIncome', 0) or 0
            g2.gm_trajectory.append(gp / rev * 100)
            g2.opm_trajectory.append(oi / rev * 100)
        else:
            g2.gm_trajectory.append(None)
            g2.opm_trajectory.append(None)

    g2.gm_trend_direction = _linear_slope(g2.gm_trajectory)
    g2.opm_trend_direction = _linear_slope(g2.opm_trajectory)

    # --- Phase Classification ---
    g2.phase = _classify_leverage_phase(g2, income_q)

    # --- v3.0: Profitability Transition Stage ---
    # EBITDA margin proxy from quarterly income
    if income_q:
        q0 = income_q[0]
        rev = q0.get('revenue', 0) or 0
        oi = q0.get('operatingIncome', 0) or 0
        da = q0.get('depreciationAndAmortization', 0) or 0
        if rev > 0:
            ebitda = oi + abs(da)
            g2.ebitda_margin_q0 = ebitda / rev * 100

    g2.profit_transition = _classify_profit_transition(g2, income_q)

    return g2


def _classify_leverage_phase(g2: G2Signals, income_q: list) -> str:
    """
    五阶段分类:
      investment : 收入增长但OPM在下降(投入期，固定成本在上升)
      inflection : 收入增长，OPM持平(拐点，成本增速=收入增速)
      release    : 收入增长，OPM扩张，增量OPM>>平均OPM(释放期★)
      mature     : 收入增长<5%，OPM稳定
      decline    : 收入萎缩或OPM持续收缩
    """
    rev_yoy = None
    if len(income_q) >= 5:
        r0 = _get_q_field(income_q, 0, 'revenue')
        r4 = _get_q_field(income_q, 4, 'revenue')
        rev_yoy = _yoy(r0, r4)

    incr_opm = g2.incremental_vs_average_opm
    opm_trend = g2.opm_trend_direction

    if rev_yoy is None:
        return "unknown"

    # Revenue declining
    if rev_yoy < -5:
        return "decline"

    # Low growth
    if rev_yoy < 5:
        if opm_trend is not None and opm_trend > 0.3:
            return "mature_improving"
        return "mature"

    # Growing >5%
    if incr_opm is not None:
        if incr_opm > 10:
            # Incremental OPM much higher than average = leverage releasing
            return "release"
        elif incr_opm > 0:
            # Incremental OPM positive but modest
            if opm_trend is not None and opm_trend > 0:
                return "release"
            return "inflection"
        else:
            # Incremental OPM negative = investing in growth
            return "investment"
    else:
        # No incremental data, use trend
        if opm_trend is not None:
            if opm_trend > 0.5:
                return "release"
            elif opm_trend > -0.2:
                return "inflection"
            else:
                return "investment"

    return "unknown"


def _classify_profit_transition(g2: G2Signals, income_q: list) -> str:
    """
    盈利转折阶段:
      pre_ebitda  → ebitda_turn  → ocf_turn → fcf_turn → fcf_expand → profitable
                     (最早信号)              (核心拐点★)  (成熟增长)
    """
    if not income_q or len(income_q) < 5:
        return "unknown"

    # Check latest quarter margins
    q0 = income_q[0]
    q4 = income_q[4] if len(income_q) > 4 else {}
    rev0 = q0.get('revenue', 0) or 0
    oi0 = q0.get('operatingIncome', 0) or 0
    ni0 = q0.get('netIncome', 0) or 0
    rev4 = q4.get('revenue', 0) or 0
    oi4 = q4.get('operatingIncome', 0) or 0
    ni4 = q4.get('netIncome', 0) or 0

    # Approximate: use OI+D&A as EBITDA proxy, OI as OCF proxy, NI as FCF proxy
    # (real OCF/FCF need cashflow data, but we can approximate from income)
    da0 = abs(q0.get('depreciationAndAmortization', 0) or 0)
    ebitda0 = oi0 + da0
    da4 = abs(q4.get('depreciationAndAmortization', 0) or 0)
    ebitda4 = oi4 + da4

    if rev0 <= 0:
        return "unknown"

    ebitda_now_pos = ebitda0 > 0
    ebitda_was_neg = ebitda4 <= 0
    oi_now_pos = oi0 > 0
    oi_was_neg = oi4 <= 0
    ni_now_pos = ni0 > 0
    ni_was_neg = ni4 <= 0

    if ebitda_now_pos and ebitda_was_neg:
        return "ebitda_turn"
    elif oi_now_pos and oi_was_neg:
        return "ocf_turn"
    elif ni_now_pos and ni_was_neg:
        return "fcf_turn"
    elif not ebitda_now_pos:
        return "pre_ebitda"
    elif oi_now_pos and ni_now_pos:
        # Already profitable — check if FCF margin is expanding
        if g2.opm_trend_direction is not None and g2.opm_trend_direction > 0.3:
            return "fcf_expand"
        return "profitable"
    else:
        return "profitable"


# ============================================================
# G3: Growth Quality
# ============================================================

def extract_g3(income_q: list, ratios_q: list, balance: list) -> G3Signals:
    """增长质量分析: 库存/应收/价vs量/递延收入。"""
    g3 = G3Signals()

    # --- Inventory Health ---
    if ratios_q and len(ratios_q) >= 5:
        inv_turns = []
        for i in range(min(8, len(ratios_q))):
            it = ratios_q[i].get('inventoryTurnover')
            inv_turns.append(it)

        if inv_turns[0] is not None and inv_turns[0] > 0:
            g3.has_inventory = True
            g3.inv_turnover_q0 = inv_turns[0]
            if len(inv_turns) >= 5 and inv_turns[4] is not None:
                g3.inv_turnover_q4 = inv_turns[4]
                g3.inv_turnover_trend = inv_turns[0] - inv_turns[4]

            # Consecutive improvement (QoQ YoY)
            yoy_improvements = []
            for i in range(min(4, len(inv_turns) - 4)):
                if inv_turns[i] is not None and inv_turns[i+4] is not None:
                    yoy_improvements.append(inv_turns[i] > inv_turns[i+4])
                else:
                    yoy_improvements.append(False)
            g3.inv_turnover_consecutive_improve = _consec_positive(
                [1 if x else -1 for x in yoy_improvements]
            )

    # --- Inventory Growth vs Revenue Growth (from balance sheet) ---
    if balance and len(balance) >= 2:
        inv0 = balance[0].get('inventory')
        inv1 = balance[1].get('inventory') if len(balance) > 1 else None
        if inv0 and inv1 and inv1 > 0:
            inv_growth = _yoy(inv0, inv1)
            # Get rev growth from annual
            if income_q and len(income_q) >= 5:
                r0 = _get_q_field(income_q, 0, 'revenue')
                r4 = _get_q_field(income_q, 4, 'revenue')
                rev_g = _yoy(r0, r4)
                if inv_growth is not None and rev_g is not None:
                    g3.inv_growth_vs_rev_growth = inv_growth - rev_g

        # Channel stuffing detection
        recv0 = balance[0].get('netReceivables') or balance[0].get('accountsReceivables')
        recv1 = (balance[1].get('netReceivables') or balance[1].get('accountsReceivables')) if len(balance) > 1 else None
        if (inv0 and inv1 and recv0 and recv1 and inv1 > 0 and recv1 > 0):
            inv_g = _yoy(inv0, inv1)
            recv_g = _yoy(recv0, recv1)
            if income_q and len(income_q) >= 5:
                r0 = _get_q_field(income_q, 0, 'revenue')
                r4 = _get_q_field(income_q, 4, 'revenue')
                rev_g = _yoy(r0, r4)
                if (inv_g is not None and recv_g is not None and rev_g is not None
                    and inv_g > rev_g + 10 and recv_g > rev_g + 10):
                    g3.channel_stuffing_risk = True
                else:
                    g3.channel_stuffing_risk = False

    # --- Receivables Health ---
    if ratios_q and len(ratios_q) >= 5:
        g3.recv_turnover_q0 = ratios_q[0].get('receivablesTurnover')
        if len(ratios_q) >= 5:
            g3.recv_turnover_q4 = ratios_q[4].get('receivablesTurnover')
        if g3.recv_turnover_q0 and g3.recv_turnover_q4:
            g3.recv_turnover_trend = g3.recv_turnover_q0 - g3.recv_turnover_q4
            g3.dso_improving = g3.recv_turnover_q0 > g3.recv_turnover_q4

    # --- Cash Conversion Cycle Proxy ---
    if ratios_q and len(ratios_q) >= 5:
        def _ccc_proxy(idx):
            r = ratios_q[idx]
            inv_t = r.get('inventoryTurnover')
            recv_t = r.get('receivablesTurnover')
            pay_t = r.get('payablesTurnover')
            if recv_t and recv_t > 0 and pay_t and pay_t > 0:
                ccc = (1/recv_t)
                if inv_t and inv_t > 0:
                    ccc += 1/inv_t
                ccc -= 1/pay_t
                return ccc * 365  # Convert to days
            return None

        g3.ccc_proxy_q0 = _ccc_proxy(0)
        if len(ratios_q) >= 5:
            g3.ccc_proxy_q4 = _ccc_proxy(4)
        if g3.ccc_proxy_q0 is not None and g3.ccc_proxy_q4 is not None:
            g3.ccc_improving = g3.ccc_proxy_q0 < g3.ccc_proxy_q4

    # --- Price vs Volume Decomposition ---
    if income_q and len(income_q) >= 5:
        r0 = _get_q_field(income_q, 0, 'revenue')
        r4 = _get_q_field(income_q, 4, 'revenue')
        gp0 = _get_q_field(income_q, 0, 'grossProfit')
        gp4 = _get_q_field(income_q, 4, 'grossProfit')
        g3.rev_growth_yoy = _yoy(r0, r4)

        if r0 and r0 > 0 and r4 and r4 > 0 and gp0 is not None and gp4 is not None:
            gm0 = gp0 / r0 * 100
            gm4 = gp4 / r4 * 100
            g3.gm_delta_yoy = gm0 - gm4

            if g3.rev_growth_yoy is not None:
                if g3.rev_growth_yoy <= 0:
                    g3.growth_type = "negative"
                elif g3.gm_delta_yoy > 1.0:
                    g3.growth_type = "pricing_power"
                elif g3.gm_delta_yoy > -1.0:
                    # v3.2: 高GM(>70%)+稳定 = "stable_moat"(比普通volume更好)
                    if gm0 > 70:
                        g3.growth_type = "stable_moat"
                    else:
                        g3.growth_type = "volume"
                else:
                    # v3.2: margin_sacrifice阈值按GM水平分层
                    # 高GM(>65%): -3pp以内=mix shift
                    # 中GM(35-65%): -3pp以内=正常季节波动
                    # 低GM(<35%): -5pp以内=正常(工业/零售GM波动大)
                    # 真正的margin sacrifice = 超过阈值的持续收缩
                    if gm0 > 65 and g3.gm_delta_yoy > -3.0:
                        g3.growth_type = "volume"
                    elif gm0 > 35 and g3.gm_delta_yoy > -3.0:
                        g3.growth_type = "volume"
                    elif gm0 <= 35 and g3.gm_delta_yoy > -5.0:
                        g3.growth_type = "volume"
                    else:
                        g3.growth_type = "margin_sacrifice"

    # --- Deferred Revenue ---
    if balance and len(balance) >= 2:
        dr0 = balance[0].get('deferredRevenue')
        dr1 = balance[1].get('deferredRevenue')
        if dr0 and dr0 > 0:
            g3.has_deferred_rev = True
            if dr1 and dr1 > 0:
                g3.deferred_rev_growth = _yoy(dr0, dr1)
                # Compare to revenue growth
                if income_q and len(income_q) >= 5:
                    rev_g = _yoy(
                        _get_q_field(income_q, 0, 'revenue'),
                        _get_q_field(income_q, 4, 'revenue')
                    )
                    if g3.deferred_rev_growth is not None and rev_g is not None:
                        g3.deferred_faster_than_rev = g3.deferred_rev_growth > rev_g

    # --- Organic Growth Check + v3.2 Acquisition Boost Detection ---
    if income_q and len(income_q) >= 6:
        r0 = _get_q_field(income_q, 0, 'revenue')
        r1 = _get_q_field(income_q, 1, 'revenue')
        r4 = _get_q_field(income_q, 4, 'revenue')
        r5 = _get_q_field(income_q, 5, 'revenue')
        if r0 and r4 and r4 > 0 and r1 and r5 and r5 > 0:
            yoy_q0 = _yoy(r0, r4)
            yoy_q1 = _yoy(r1, r5)
            if yoy_q0 is not None and yoy_q1 is not None:
                # Original check: massive single-quarter jump
                if yoy_q0 > 50 and yoy_q1 < 10:
                    g3.potential_acquisition_flag = True

                # v3.2: Refined acquisition boost detection
                # Condition A: 最新季YoY > 2× 次新季YoY 且 >25%
                # (ELF模式: 38% vs 14% — 某季开始并表)
                if (yoy_q0 > 25 and yoy_q1 is not None and yoy_q1 > 0
                    and yoy_q0 > yoy_q1 * 2.0):
                    g3.acquisition_boost_flag = True
                    g3.acquisition_boost_detail = (
                        f"季度跳变: Q0 +{yoy_q0:.0f}% vs Q1 +{yoy_q1:.0f}% (>{2.0:.0f}x)"
                    )

    # v3.2: Condition B: 商誉+无形资产大幅增加(年度数据)
    if balance and len(balance) >= 2 and isinstance(balance[0], dict) and isinstance(balance[1], dict):
        gw_ia_0 = (balance[0].get('goodwill', 0) or 0) + (balance[0].get('intangibleAssets', 0) or 0)
        gw_ia_1 = (balance[1].get('goodwill', 0) or 0) + (balance[1].get('intangibleAssets', 0) or 0)
        gw_delta = gw_ia_0 - gw_ia_1

        if income_q and len(income_q) >= 5:
            # Use annual revenue delta
            inc_data = [_get_q_field(income_q, i, 'revenue') for i in range(min(8, len(income_q)))]
            # Sum latest 4Q vs prior 4Q
            sum_recent = sum(r for r in inc_data[:4] if r) if len(inc_data) >= 4 else 0
            sum_prior = sum(r for r in inc_data[4:8] if r) if len(inc_data) >= 8 else 0
            rev_delta = sum_recent - sum_prior if sum_prior > 0 else 0

            if gw_delta > 50e6 and rev_delta > 0:
                ratio = gw_delta / rev_delta
                if ratio > 0.30:
                    g3.acquisition_boost_flag = True
                    g3.acquisition_boost_detail = (
                        f"商誉+IA增${gw_delta/1e6:.0f}M vs Rev增${rev_delta/1e6:.0f}M "
                        f"(比率{ratio:.0%})"
                    )

    # --- v3.0: Sales Efficiency (产品市场契合度的财务证据) ---
    sm_ratios = []  # S&M/Rev or SGA/Rev per quarter
    for i in range(min(8, len(income_q))):
        q = income_q[i]
        rev = q.get('revenue', 0) or 0
        if rev <= 0:
            sm_ratios.append(None)
            continue
        # Prefer separate S&M, fallback to SGA
        sm = q.get('sellingAndMarketingExpenses', 0) or 0
        if sm <= 0:
            sm = q.get('sellingGeneralAndAdministrativeExpenses', 0) or 0
        sm_ratios.append(sm / rev * 100 if sm > 0 else None)

    if len(sm_ratios) >= 1 and sm_ratios[0] is not None:
        g3.sm_rev_q0 = sm_ratios[0]
    if len(sm_ratios) >= 5 and sm_ratios[4] is not None:
        g3.sm_rev_q4 = sm_ratios[4]
    if g3.sm_rev_q0 is not None and g3.sm_rev_q4 is not None:
        g3.sm_efficiency_delta = g3.sm_rev_q0 - g3.sm_rev_q4  # 负=效率提升
        if g3.rev_growth_yoy is not None and g3.rev_growth_yoy > 0:
            g3.sm_efficiency_while_growing = g3.sm_efficiency_delta < -0.5

    # Consecutive S&M/Rev decline (YoY per Q)
    sm_yoy_deltas = []
    for i in range(min(4, len(sm_ratios) - 4)):
        if sm_ratios[i] is not None and sm_ratios[i+4] is not None:
            sm_yoy_deltas.append(sm_ratios[i] - sm_ratios[i+4])
        else:
            sm_yoy_deltas.append(None)
    g3.sm_consecutive_improve = _consec_positive(
        [1 if (d is not None and d < -0.3) else -1 for d in sm_yoy_deltas]
    )

    # --- v3.0: Gross Margin Durability ---
    gm_vals = []
    for i in range(min(8, len(income_q))):
        q = income_q[i]
        rev = q.get('revenue', 0) or 0
        gp = q.get('grossProfit', 0) or 0
        if rev > 0:
            gm_vals.append(gp / rev * 100)
        else:
            gm_vals.append(None)

    valid_gms = [g for g in gm_vals if g is not None]
    if len(valid_gms) >= 4:
        g3.gm_8q_mean = sum(valid_gms) / len(valid_gms)
        g3.gm_8q_stdev = (sum((g - g3.gm_8q_mean)**2 for g in valid_gms) / len(valid_gms)) ** 0.5
        # Durability: high mean + low stdev = strong
        # GM 60%±2% >> GM 40%±8%
        if g3.gm_8q_stdev > 0:
            g3.gm_durability_score = g3.gm_8q_mean / (g3.gm_8q_stdev + 1)
        else:
            g3.gm_durability_score = g3.gm_8q_mean

    # --- v3.0: Multi-Quarter Persistence ---
    persistent = []
    # Check: which signals are positive for 2+ consecutive quarters YoY?
    # Revenue accelerating
    rev_accel_flags = []
    if g3.rev_growth_yoy is not None:
        for i in range(min(4, len(income_q) - 4)):
            r_i = _get_q_field(income_q, i, 'revenue')
            r_i4 = _get_q_field(income_q, i+4, 'revenue')
            if r_i and r_i4 and r_i4 > 0:
                rev_accel_flags.append((r_i - r_i4) / r_i4 * 100 > 0)
            else:
                rev_accel_flags.append(False)
        if sum(rev_accel_flags[:3]) >= 3:
            persistent.append("rev_growing_3Q+")

    # GM expanding
    gm_expand_flags = []
    for i in range(min(4, len(gm_vals) - 4)):
        if gm_vals[i] is not None and gm_vals[i+4] is not None:
            gm_expand_flags.append(gm_vals[i] > gm_vals[i+4])
        else:
            gm_expand_flags.append(False)
    if sum(gm_expand_flags[:3]) >= 3:
        persistent.append("gm_expanding_3Q+")

    # S&M efficiency improving
    sm_improve_flags = [d is not None and d < 0 for d in sm_yoy_deltas]
    if sum(sm_improve_flags[:3]) >= 3:
        persistent.append("sm_efficiency_3Q+")

    # OPM expanding
    opm_vals = []
    for i in range(min(8, len(income_q))):
        q = income_q[i]
        rev = q.get('revenue', 0) or 0
        oi = q.get('operatingIncome', 0) or 0
        opm_vals.append(oi / rev * 100 if rev > 0 else None)
    opm_expand_flags = []
    for i in range(min(4, len(opm_vals) - 4)):
        if opm_vals[i] is not None and opm_vals[i+4] is not None:
            opm_expand_flags.append(opm_vals[i] > opm_vals[i+4])
        else:
            opm_expand_flags.append(False)
    if sum(opm_expand_flags[:3]) >= 3:
        persistent.append("opm_expanding_3Q+")

    g3.persistence_count = len(persistent)
    g3.persistence_details = persistent

    # --- v3.1: Revenue Path Quality ---
    if income_q and len(income_q) >= 5:
        revs_all = [_get_q_field(income_q, i, 'revenue') for i in range(min(8, len(income_q)))]
        valid_revs = [r for r in revs_all if r and r > 0]

        # QoQ changes
        if len(valid_revs) >= 4:
            qoq_changes = []
            for i in range(len(valid_revs) - 1):
                qoq_changes.append((valid_revs[i] - valid_revs[i+1]) / valid_revs[i+1] * 100)

            if len(qoq_changes) >= 3:
                import statistics
                g3.rev_qoq_volatility = statistics.stdev(qoq_changes)

        # YoY consistency (how many quarters have positive YoY growth)
        yoy_positive = 0
        for i in range(min(4, len(revs_all) - 4)):
            r_i = revs_all[i]
            r_i4 = revs_all[i + 4] if i + 4 < len(revs_all) else None
            if r_i and r_i4 and r_i4 > 0 and r_i > r_i4:
                yoy_positive += 1
        g3.rev_yoy_consistency = yoy_positive

        # Path grade
        vol = g3.rev_qoq_volatility
        if vol is not None:
            if vol < 5:
                g3.rev_path_grade = "steady"        # 如OKTA, HUBS — 有机增长
                g3.cyclicality_penalty = 1.0
            elif vol < 12:
                g3.rev_path_grade = "moderate"       # 正常季节性
                g3.cyclicality_penalty = 0.95
            elif vol < 25:
                g3.rev_path_grade = "lumpy"          # 周期性/大单驱动
                g3.cyclicality_penalty = 0.82
            else:
                g3.rev_path_grade = "erratic"        # 高度不可预测
                g3.cyclicality_penalty = 0.65

    return g3


# ============================================================
# G4: Scale Economics + Incremental Returns
# ============================================================

def extract_g4(income: list, cashflow: list, key_metrics: list, income_q: list,
               balance: list = None, profile_mcap: float = None) -> G4Signals:
    g4 = G4Signals()
    balance = balance or []
    if len(income) < 2:
        return g4

    # --- ROIC from key_metrics ---
    if key_metrics and len(key_metrics) >= 2:
        for i, km in enumerate(key_metrics[:2]):
            roic = km.get('returnOnInvestedCapital')
            if roic is not None:
                roic_pct = roic * 100 if abs(roic) < 1 else roic
                if i == 0:
                    g4.roic_latest = roic_pct
                else:
                    g4.roic_prior = roic_pct

        if g4.roic_latest is not None and g4.roic_prior is not None:
            g4.roic_improving = g4.roic_latest > g4.roic_prior

    # --- Incremental ROIC ---
    if key_metrics and len(key_metrics) >= 2 and len(income) >= 2:
        ic0 = key_metrics[0].get('investedCapital')
        ic1 = key_metrics[1].get('investedCapital')
        ni0 = income[0].get('operatingIncome', 0) or 0
        ni1 = income[1].get('operatingIncome', 0) or 0
        tax_rate = 0.21  # Approximate
        nopat0 = ni0 * (1 - tax_rate)
        nopat1 = ni1 * (1 - tax_rate)
        if ic0 and ic1 and (ic0 - ic1) != 0:
            g4.incremental_roic = (nopat0 - nopat1) / abs(ic0 - ic1) * 100

    # --- FCF Margin ---
    if len(cashflow) >= 2:
        for i in range(2):
            rev = income[i].get('revenue', 0) or 0 if i < len(income) else 0
            ocf = (cashflow[i].get('operatingCashFlow', 0) or 0) if i < len(cashflow) else 0
            capex = abs(cashflow[i].get('capitalExpenditure', 0) or 0) if i < len(cashflow) else 0
            if rev > 0:
                fcf_m = (ocf - capex) / rev * 100
                if i == 0:
                    g4.fcf_margin_latest = fcf_m
                else:
                    g4.fcf_margin_prior = fcf_m

        if g4.fcf_margin_latest is not None and g4.fcf_margin_prior is not None:
            g4.fcf_margin_delta = g4.fcf_margin_latest - g4.fcf_margin_prior
            g4.fcf_positive_inflection = g4.fcf_margin_prior < 0 and g4.fcf_margin_latest >= 0

    # --- Rule of 40 ---
    if income_q and len(income_q) >= 5:
        rev_g = _yoy(
            _get_q_field(income_q, 0, 'revenue'),
            _get_q_field(income_q, 4, 'revenue')
        )
        if rev_g is not None and g4.fcf_margin_latest is not None:
            g4.rule_of_40_latest = rev_g + g4.fcf_margin_latest
        if rev_g is not None and g4.fcf_margin_prior is not None:
            # Prior year's rule of 40 (approximate)
            if len(income_q) >= 8:
                rev_g_prior = _yoy(
                    _get_q_field(income_q, 4, 'revenue'),
                    _get_q_field(income_q, 7, 'revenue')  # Q4 vs Q7 ~= prior year
                )
                if rev_g_prior is not None:
                    g4.rule_of_40_prior = rev_g_prior + g4.fcf_margin_prior

        if g4.rule_of_40_latest is not None and g4.rule_of_40_prior is not None:
            g4.rule_of_40_trajectory = g4.rule_of_40_latest - g4.rule_of_40_prior

    # --- SBC Discipline ---
    if len(cashflow) >= 2 and len(income) >= 2:
        for i in range(2):
            rev = income[i].get('revenue', 0) or 0
            sbc = cashflow[i].get('stockBasedCompensation', 0) or 0
            if rev > 0:
                if i == 0:
                    g4.sbc_rev_latest = sbc / rev * 100
                else:
                    g4.sbc_rev_prior = sbc / rev * 100

        # SBC growth vs Revenue growth
        sbc0 = cashflow[0].get('stockBasedCompensation', 0) or 0
        sbc1 = cashflow[1].get('stockBasedCompensation', 0) or 0
        rev0 = income[0].get('revenue', 0) or 0
        rev1 = income[1].get('revenue', 0) or 0
        sbc_g = _yoy(sbc0, sbc1)
        rev_g = _yoy(rev0, rev1)
        if sbc_g is not None and rev_g is not None:
            g4.sbc_growth_vs_rev_growth = sbc_g - rev_g

    # --- Real FCF Margin + Compounding Power ---
    if len(cashflow) >= 1 and len(income) >= 1:
        rev = income[0].get('revenue', 0) or 0
        ocf = cashflow[0].get('operatingCashFlow', 0) or 0
        capex = abs(cashflow[0].get('capitalExpenditure', 0) or 0)
        sbc = cashflow[0].get('stockBasedCompensation', 0) or 0
        if rev > 0:
            g4.real_fcf_margin = (ocf - capex - sbc) / rev * 100
            rev_g = _yoy(
                income[0].get('revenue'), income[1].get('revenue')
            ) if len(income) >= 2 else 0
            if rev_g is not None and g4.real_fcf_margin is not None:
                g4.compounding_power = g4.real_fcf_margin * (1 + rev_g / 100)

    # --- v3.0: Balance Sheet Health ---
    if balance and isinstance(balance[0], dict):
        bs = balance[0]
        cash = bs.get('cashAndShortTermInvestments', 0) or 0
        total_debt = bs.get('totalDebt', 0) or 0
        g4.net_cash = cash - total_debt
        g4.current_ratio = bs.get('currentRatio') or _safe_div(
            bs.get('totalCurrentAssets'), bs.get('totalCurrentLiabilities')
        )

        # Net cash / market cap
        if profile_mcap and profile_mcap > 0:
            g4.net_cash_per_mcap = g4.net_cash / profile_mcap * 100

        # Self-funding check
        if cashflow and len(cashflow) >= 1:
            ocf = cashflow[0].get('operatingCashFlow', 0) or 0
            capex = abs(cashflow[0].get('capitalExpenditure', 0) or 0)
            g4.self_funding = ocf > capex

        # Balance sheet grade
        if g4.net_cash > 0 and (g4.current_ratio is None or g4.current_ratio > 1.5):
            g4.balance_sheet_grade = "fortress"
        elif g4.net_cash > 0 or (g4.current_ratio and g4.current_ratio > 1.2):
            g4.balance_sheet_grade = "healthy"
        elif g4.current_ratio and g4.current_ratio > 0.8:
            g4.balance_sheet_grade = "adequate"
        else:
            g4.balance_sheet_grade = "stressed"

    return g4


# ============================================================
# G5: Market Mispricing (kept from v1, minimal changes)
# ============================================================

def extract_g5(
    earnings_surprises, key_metrics, ratios, quote, income, income_q, estimates
) -> G5Signals:
    g5 = G5Signals()

    # Earnings beats
    if earnings_surprises and isinstance(earnings_surprises, list):
        beats = 0
        magnitudes = []
        for es in earnings_surprises[:4]:
            if not isinstance(es, dict):
                continue
            actual = es.get('actualEarningResult')
            est = es.get('estimatedEarning')
            if actual is not None and est is not None and est != 0:
                if actual > est:
                    beats += 1
                    magnitudes.append((actual - est) / abs(est) * 100)
        g5.beat_count_4q = beats
        if magnitudes:
            g5.avg_beat_magnitude = sum(magnitudes) / len(magnitudes)
            if len(magnitudes) >= 2:
                g5.beat_magnitude_increasing = magnitudes[0] > magnitudes[-1]

    # EV/Sales
    if key_metrics and isinstance(key_metrics, list) and key_metrics:
        km = key_metrics[0]
        if isinstance(km, dict):
            g5.ev_sales = km.get('evToSales')

    # Rev growth
    if income_q and len(income_q) >= 5:
        g5.rev_growth_rate = _yoy(
            _get_q_field(income_q, 0, 'revenue'),
            _get_q_field(income_q, 4, 'revenue')
        )
    elif income and len(income) >= 2:
        g5.rev_growth_rate = _yoy(
            income[0].get('revenue'), income[1].get('revenue')
        )

    if g5.ev_sales and g5.rev_growth_rate and g5.rev_growth_rate > 5:
        g5.growth_adjusted_ev_sales = g5.ev_sales / (g5.rev_growth_rate / 100)

    # PE
    if ratios and isinstance(ratios, list) and ratios:
        r = ratios[0]
        if isinstance(r, dict):
            g5.trailing_pe = r.get('priceToEarningsRatio') or r.get('peRatio')

    if isinstance(quote, dict):
        pe = quote.get('pe')
        if pe and pe > 0 and g5.trailing_pe is None:
            g5.trailing_pe = pe
        g5.market_cap_b = (quote.get('marketCap', 0) or 0) / 1e9

    if estimates and isinstance(estimates, list) and estimates:
        est = estimates[0]
        if isinstance(est, dict):
            est_eps = est.get('estimatedEpsAvg')
            if est_eps and est_eps > 0 and isinstance(quote, dict):
                price = quote.get('price', 0) or 0
                if price > 0:
                    g5.forward_pe = price / est_eps
            g5.analyst_count = est.get('numberAnalystsEstimatedEps')

    if g5.forward_pe and g5.trailing_pe and g5.trailing_pe > 0:
        g5.pe_compression = (g5.forward_pe - g5.trailing_pe) / g5.trailing_pe * 100

    if g5.analyst_count and g5.market_cap_b and g5.market_cap_b > 0:
        g5.coverage_density = g5.analyst_count / math.log(g5.market_cap_b + 1)

    if estimates and isinstance(estimates, list) and len(estimates) >= 2:
        curr = estimates[0].get('estimatedEpsAvg') if isinstance(estimates[0], dict) else None
        prev = estimates[1].get('estimatedEpsAvg') if isinstance(estimates[1], dict) else None
        if curr and prev and prev != 0:
            g5.estimate_revision_pct = (curr - prev) / abs(prev) * 100

    return g5


# ============================================================
# G6: Smart Money (kept from v1)
# ============================================================

def extract_g6(insider_trades: list, quote: dict, income: list) -> G6Signals:
    g6 = G6Signals()
    if not insider_trades or not isinstance(insider_trades, list):
        return g6
    if insider_trades and not isinstance(insider_trades[0], dict):
        return g6

    now = datetime(2026, 3, 31)
    six_months_ago = now - timedelta(days=180)
    twelve_months_ago = now - timedelta(days=365)

    buys_6m, sells_6m, sells_prior = [], [], []
    for trade in insider_trades:
        try:
            tdate = datetime.strptime(trade.get('transactionDate', ''), '%Y-%m-%d')
        except (ValueError, TypeError):
            continue
        ttype = (trade.get('transactionType') or '').lower()
        shares = abs(trade.get('securitiesTransacted', 0) or 0)
        price = trade.get('price', 0) or 0
        value = shares * price
        role = (trade.get('reportingName', '') or '').lower()

        if tdate >= six_months_ago:
            if 'purchase' in ttype or 'buy' in ttype or ttype == 'p-purchase':
                buys_6m.append({'value': value, 'role': role})
            elif 'sale' in ttype or 'sell' in ttype or ttype == 's-sale':
                sells_6m.append({'value': value})
        elif tdate >= twelve_months_ago:
            if 'sale' in ttype or 'sell' in ttype or ttype == 's-sale':
                sells_prior.append({'value': value})

    g6.insider_buy_count_6m = len(buys_6m)
    g6.insider_buy_value_6m = sum(b['value'] for b in buys_6m)
    g6.insider_sell_count_6m = len(sells_6m)
    g6.insider_sell_count_prior_6m = len(sells_prior)

    roles = set()
    for b in buys_6m:
        if 'ceo' in b['role'] or 'chief executive' in b['role']:
            g6.insider_has_ceo_buy = True
            roles.add('ceo')
        if 'cfo' in b['role'] or 'chief financial' in b['role']:
            g6.insider_has_cfo_buy = True
            roles.add('cfo')
        if b['value'] > 500_000:
            g6.insider_large_buy = True
        roles.add(b['role'][:20])
    g6.insider_multi_role = len(roles) >= 2

    if g6.insider_sell_count_prior_6m > 0:
        g6.sell_reduction = (
            (g6.insider_sell_count_6m - g6.insider_sell_count_prior_6m)
            / g6.insider_sell_count_prior_6m * 100
        )

    if income and len(income) >= 2:
        s0 = income[0].get('weightedAverageShsOut', 0) or 0
        s1 = income[1].get('weightedAverageShsOut', 0) or 0
        if s1 > 0:
            g6.shares_change_1y = (s0 - s1) / s1 * 100

    return g6


# ============================================================
# Scoring Functions
# ============================================================

def score_g1(g1: G1Signals) -> float:
    """
    G1得分: 加速度30% + 级联杠杆25% + 经营利润加速20% + 毛利加速15% + 连续性10%
    """
    scores, weights = [], []

    # Revenue Acceleration (30%)
    if g1.rev_acceleration is not None:
        scores.append(_norm(g1.rev_acceleration, -10, 20))
        weights.append(0.30)
    elif g1.rev_yoy and g1.rev_yoy[0] is not None:
        scores.append(_norm(g1.rev_yoy[0], -5, 40) * 0.5)
        weights.append(0.30)

    # Cascade Test (25%) — 最干净的杠杆信号
    if g1.cascade_test is not None:
        cascade_map = {"full": 9.5, "partial": 6.0, "none": 2.5}
        scores.append(cascade_map.get(g1.cascade_test, 5.0))
        weights.append(0.25)

    # OI faster than Rev (20%) — 利润在加速
    if g1.oi_rev_spread is not None:
        scores.append(_norm(g1.oi_rev_spread, -20, 40))
        weights.append(0.20)

    # GP faster than Rev (15%) — 定价权信号
    if g1.gp_rev_spread is not None:
        scores.append(_norm(g1.gp_rev_spread, -5, 15))
        weights.append(0.15)

    # Consecutive acceleration (10%)
    consec_s = min(g1.rev_accel_consecutive * 3.0, 10.0)
    scores.append(consec_s)
    weights.append(0.10)

    tw = sum(weights)
    g1.score = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 0
    return g1.score


def score_g2(g2: G2Signals) -> float:
    """
    G2得分: 阶段分40% + 增量利润率30% + 固定成本摊薄20% + 利润率轨迹10%
    """
    scores, weights = [], []

    # Phase (40%)
    phase_map = {
        "release": 10.0, "inflection": 6.5, "mature_improving": 5.5,
        "investment": 3.5, "mature": 4.0, "decline": 1.0, "unknown": 5.0,
    }
    scores.append(phase_map.get(g2.phase, 5.0))
    weights.append(0.40)
    g2.phase_score = phase_map.get(g2.phase, 5.0)

    # Incremental OPM vs Average (30%) — 核心
    if g2.incremental_vs_average_opm is not None:
        # >0 = 增量利润率高于平均 = 杠杆在释放
        # 典型 release 阶段: 增量OPM 50-80%, 平均OPM 20-30% → spread +30pp
        scores.append(_norm(g2.incremental_vs_average_opm, -30, 50))
        weights.append(0.30)
    elif g2.incremental_op_margin is not None:
        scores.append(_norm(g2.incremental_op_margin, -20, 60))
        weights.append(0.30)

    # Fixed Cost Absorption (20%)
    absorb_scores = []
    for absorb in [g2.rd_absorption, g2.sga_absorption, g2.da_absorption]:
        if absorb is not None:
            # 负 = 固定成本占比下降 = 好
            absorb_scores.append(_norm(absorb, -5, 3, invert=True))
    if absorb_scores:
        scores.append(sum(absorb_scores) / len(absorb_scores))
        weights.append(0.20)

    # OPM Trajectory (10%)
    if g2.opm_trend_direction is not None:
        # 正 = OPM在扩张
        scores.append(_norm(g2.opm_trend_direction, -2, 3))
        weights.append(0.10)

    tw = sum(weights)
    g2.score = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 5.0
    return g2.score


def score_g3(g3: G3Signals) -> float:
    """
    G3得分: 价vs量25% + 库存健康20% + 应收健康15% + CCC效率15% + 递延收入15% + 有机性10%
    """
    scores, weights = [], []

    # Price vs Volume (25%)
    type_map = {
        "pricing_power": 9.0, "stable_moat": 7.5, "volume": 6.0,
        "margin_sacrifice": 2.5, "negative": 1.0,
    }
    if g3.growth_type:
        base = type_map.get(g3.growth_type, 5.0)
        # Bonus for strong pricing power
        if g3.growth_type == "pricing_power" and g3.gm_delta_yoy is not None:
            base = min(base + g3.gm_delta_yoy * 0.3, 10.0)
        scores.append(base)
        weights.append(0.25)

    # Inventory Health (20%) — 仅实物类公司
    if g3.has_inventory:
        inv_s = 5.0
        if g3.inv_turnover_trend is not None:
            inv_s = _norm(g3.inv_turnover_trend, -2, 3)
        if g3.inv_growth_vs_rev_growth is not None:
            inv_s2 = _norm(g3.inv_growth_vs_rev_growth, -20, 20, invert=True)
            inv_s = (inv_s + inv_s2) / 2
        if g3.channel_stuffing_risk:
            inv_s = min(inv_s, 2.0)  # Hard cap
        if g3.inv_turnover_consecutive_improve >= 3:
            inv_s = min(inv_s + 1.0, 10.0)
        scores.append(inv_s)
        weights.append(0.20)
    else:
        # Non-inventory company: skip inventory, redistribute weight
        pass

    # Receivables Health (15%)
    if g3.recv_turnover_trend is not None:
        scores.append(_norm(g3.recv_turnover_trend, -1, 2))
        weights.append(0.15)
    if g3.dso_improving is not None and not g3.recv_turnover_trend:
        scores.append(7.0 if g3.dso_improving else 3.5)
        weights.append(0.15)

    # CCC Efficiency (15%)
    if g3.ccc_improving is not None:
        base = 7.5 if g3.ccc_improving else 3.5
        if g3.ccc_proxy_q0 is not None and g3.ccc_proxy_q4 is not None:
            delta = g3.ccc_proxy_q4 - g3.ccc_proxy_q0  # Positive = improving
            base = _norm(delta, -30, 30)
        scores.append(base)
        weights.append(0.15)

    # Deferred Revenue (15%)
    if g3.has_deferred_rev:
        if g3.deferred_faster_than_rev:
            scores.append(8.5)
        elif g3.deferred_rev_growth is not None and g3.deferred_rev_growth > 0:
            scores.append(6.0)
        else:
            scores.append(4.0)
        weights.append(0.15)

    # Organic Growth (5%)
    if g3.potential_acquisition_flag is not None:
        scores.append(2.0 if g3.potential_acquisition_flag else 7.0)
        weights.append(0.05)

    # v3.0: Sales Efficiency (15%) — 产品自己卖自己的证据
    if g3.sm_efficiency_delta is not None:
        # 负 = S&M/Rev下降 = 效率提升
        s = _norm(g3.sm_efficiency_delta, -8, 3, invert=True)
        if g3.sm_efficiency_while_growing:
            s = min(s + 1.5, 10.0)  # 增长+效率同步改善=大加分
        if g3.sm_consecutive_improve >= 3:
            s = min(s + 1.0, 10.0)
        scores.append(s)
        weights.append(0.15)

    # v3.0: Gross Margin Durability (8%)
    if g3.gm_durability_score is not None:
        s = _norm(g3.gm_durability_score, 5, 40)
        scores.append(s)
        weights.append(0.08)

    # v3.1: Revenue Path Quality (12%) — 区分有机增长vs周期性
    if g3.rev_path_grade is not None:
        path_map = {"steady": 9.5, "moderate": 7.0, "lumpy": 3.5, "erratic": 1.5}
        s = path_map.get(g3.rev_path_grade, 5.0)
        # YoY consistency bonus
        if g3.rev_yoy_consistency >= 4:
            s = min(s + 1.0, 10.0)
        scores.append(s)
        weights.append(0.12)

    tw = sum(weights)
    g3.score = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 5.0
    return g3.score


def score_g4(g4: G4Signals) -> float:
    """
    G4得分: 增量ROIC20% + FCF拐点20% + Rule of 40轨迹15% + 复利力10%
            + SBC纪律10% + 资产负债表15% + 自有资金增长10%
    """
    scores, weights = [], []

    # Incremental ROIC (20%)
    if g4.incremental_roic is not None:
        scores.append(_norm(g4.incremental_roic, -10, 50))
        weights.append(0.20)
    elif g4.roic_improving is not None:
        scores.append(7.0 if g4.roic_improving else 3.5)
        weights.append(0.20)

    # FCF Margin Delta (20%)
    if g4.fcf_margin_delta is not None:
        s = _norm(g4.fcf_margin_delta, -8, 15)
        if g4.fcf_positive_inflection:
            s = min(s + 2.5, 10.0)
        scores.append(s)
        weights.append(0.20)

    # Rule of 40 Trajectory (15%)
    if g4.rule_of_40_trajectory is not None:
        scores.append(_norm(g4.rule_of_40_trajectory, -20, 30))
        weights.append(0.15)
    elif g4.rule_of_40_latest is not None:
        scores.append(_norm(g4.rule_of_40_latest, 0, 60))
        weights.append(0.15)

    # Compounding Power (10%)
    if g4.compounding_power is not None:
        scores.append(_norm(g4.compounding_power, -10, 40))
        weights.append(0.10)

    # SBC Discipline (10%)
    if g4.sbc_growth_vs_rev_growth is not None:
        scores.append(_norm(g4.sbc_growth_vs_rev_growth, -30, 30, invert=True))
        weights.append(0.10)
    elif g4.sbc_rev_latest is not None:
        scores.append(_norm(g4.sbc_rev_latest, 0, 20, invert=True))
        weights.append(0.10)

    # v3.0: Balance Sheet Health (15%)
    bs_map = {"fortress": 9.0, "healthy": 7.0, "adequate": 5.0, "stressed": 2.5}
    if g4.balance_sheet_grade:
        bs_s = bs_map.get(g4.balance_sheet_grade, 5.0)
        if g4.self_funding:
            bs_s = min(bs_s + 1.0, 10.0)
        scores.append(bs_s)
        weights.append(0.15)

    # v3.0: Self-Funding + Growth (10%)
    if g4.self_funding is not None:
        s = 8.0 if g4.self_funding else 3.0
        if g4.net_cash_per_mcap is not None and g4.net_cash_per_mcap > 5:
            s = min(s + 1.0, 10.0)  # Net cash > 5% of mcap
        scores.append(s)
        weights.append(0.10)

    tw = sum(weights)
    g4.score = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 5.0
    return g4.score


def score_g5(g5: G5Signals) -> float:
    """G5: beat模式35% + 估值/增速25% + PE压缩20% + 修正20%"""
    scores, weights = [], []

    if g5.beat_count_4q > 0:
        s = min(g5.beat_count_4q * 2.5, 10.0)
        if g5.avg_beat_magnitude:
            s = min(s + _norm(g5.avg_beat_magnitude, 0, 20) * 0.3, 10.0)
        if g5.beat_magnitude_increasing:
            s = min(s + 1.0, 10.0)
        scores.append(s)
        weights.append(0.35)

    if g5.growth_adjusted_ev_sales is not None:
        scores.append(_norm(g5.growth_adjusted_ev_sales, 5, 50, invert=True))
        weights.append(0.25)

    if g5.pe_compression is not None:
        scores.append(_norm(g5.pe_compression, -40, 10, invert=True))
        weights.append(0.20)

    if g5.estimate_revision_pct is not None:
        scores.append(_norm(g5.estimate_revision_pct, -20, 30))
        weights.append(0.20)

    tw = sum(weights)
    raw = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 5.0
    if g5.beat_count_4q == 0 and g5.estimate_revision_pct is None:
        raw = min(raw, 6.0)
    g5.score = raw
    return g5.score


def score_g6(g6: G6Signals) -> float:
    """G6: 内部人买入50% + 卖出减少20% + 回购15% + 质量15%"""
    scores, weights = [], []

    if g6.insider_buy_count_6m > 0:
        s = min(g6.insider_buy_count_6m * 2.0, 8.0)
        if g6.insider_buy_value_6m > 1_000_000:
            s = min(s + 2.0, 10.0)
        scores.append(s)
    else:
        # v3.2: 零买入不是中性——是轻微负面(公司在加速但管理层不买=信心存疑)
        scores.append(2.5)
    weights.append(0.50)

    if g6.sell_reduction is not None:
        scores.append(_norm(g6.sell_reduction, -80, 50, invert=True))
        weights.append(0.20)

    if g6.shares_change_1y is not None:
        scores.append(_norm(g6.shares_change_1y, -8, 10, invert=True))
        weights.append(0.15)

    quality_s = 5.0
    if g6.insider_has_ceo_buy: quality_s += 2.0
    if g6.insider_has_cfo_buy: quality_s += 1.5
    if g6.insider_multi_role: quality_s += 1.0
    if g6.insider_large_buy: quality_s += 1.0
    scores.append(min(quality_s, 10.0))
    weights.append(0.15)

    tw = sum(weights)
    g6.score = sum(s * w for s, w in zip(scores, weights)) / tw if tw > 0 else 5.0
    return g6.score


# ============================================================
# Composite: Quality-Adjusted Acceleration
# ============================================================

GID_EXCLUDED_SECTORS = {
    'Biotechnology', 'Drug Manufacturers - General',
    'Drug Manufacturers - Specialty & Generic',
    # v3.2: 大宗商品行业(收入由商品价格驱动,非业务能力)
    'Gold', 'Silver', 'Copper', 'Steel',
    'Other Industrial Metals & Mining', 'Other Precious Metals & Mining',
    'Coking Coal', 'Thermal Coal',
    'Agricultural Inputs',
}
GID_EXCLUDED_SECTOR_GROUPS = {'Utilities', 'Real Estate', 'Energy'}


def check_gid_vetoes(result: GIDResult) -> list[str]:
    vetoes = []
    if result.industry in GID_EXCLUDED_SECTORS:
        vetoes.append(f"VETO: 行业排除({result.industry})")
    if result.sector in GID_EXCLUDED_SECTOR_GROUPS:
        vetoes.append(f"VETO: 板块排除({result.sector})")
    if result.g1.rev_yoy and result.g1.rev_yoy[0] is not None and result.g1.rev_yoy[0] < -15:
        vetoes.append(f"VETO: 收入深度萎缩{result.g1.rev_yoy[0]:.1f}%")
    result.vetoes = vetoes
    return vetoes


def check_gid_flags(result: GIDResult) -> list[str]:
    flags = []
    if result.g4.sbc_rev_latest is not None and result.g4.sbc_rev_latest > 15:
        flags.append(f"SBC/Rev={result.g4.sbc_rev_latest:.1f}%")
    if result.g4.fcf_margin_latest is not None and result.g4.fcf_margin_latest < -5:
        flags.append(f"FCF margin={result.g4.fcf_margin_latest:.1f}%")
    if result.g3.channel_stuffing_risk:
        flags.append("渠道堆货风险!")
    if result.g3.potential_acquisition_flag:
        flags.append("可能并购驱动")
    if result.g3.acquisition_boost_flag:
        flags.append(f"并购加速⚠({result.g3.acquisition_boost_detail})")
    if result.g3.growth_type == "margin_sacrifice":
        flags.append("以价换量")
    if (result.g1.rev_yoy and result.g1.rev_yoy[0] is not None
        and result.g1.rev_acceleration is not None
        and result.g1.rev_acceleration > 5 and result.g1.rev_yoy[0] < 5):
        flags.append("加速但基数低(<5%)")
    if result.g6.shares_change_1y is not None and result.g6.shares_change_1y > 5:
        flags.append(f"稀释{result.g6.shares_change_1y:.1f}%")
    # v3.1: Cyclicality warning
    if result.g3.rev_path_grade in ("lumpy", "erratic"):
        flags.append(f"收入波动大({result.g3.rev_path_grade})")
    # v3.2: Restructuring rebound detection
    # SGA/Rev单季大幅下降(>15pp) = 可能裁员驱动而非效率提升
    if (result.g2.sga_absorption is not None and result.g2.sga_absorption < -15):
        flags.append(f"重组反弹? SGA/Rev降{abs(result.g2.sga_absorption):.0f}pp")
    result.flags = flags
    return flags


def compute_gid_composite(result: GIDResult) -> float:
    """
    v3.0: 质量×发现概率调整的加速度评分。

    公式: final = Raw × Quality_Mult × Discovery_Mult
      Raw = G1(加速)×0.50 + G5(定价滞后)×0.25 + G6(聪明钱)×0.25
      Quality_Mult = avg(G2,G3,G4) / 5.0    (高质量>1, 低质量<1)
      Discovery_Mult = G7发现概率乘数        (未被发现>1, 已知<1)

    v3新增:
      - G3得分中纳入销售效率/GM稳定性/多季持续性
      - G4得分中纳入资产负债表健康度
      - Discovery_Mult惩罚$300B市值的"已知"加速, 奖励$10B的"隐藏"加速
      - 多指标确认bonus: G1中3+指标同时改善额外加分
      - 持续性bonus: G3中3+信号连续3Q改善额外加分
      - Archetype分类: 5种模式
    """
    score_g1(result.g1)
    score_g2(result.g2)
    score_g3(result.g3)
    score_g4(result.g4)
    score_g5(result.g5)
    score_g6(result.g6)

    check_gid_vetoes(result)
    check_gid_flags(result)

    if result.vetoes:
        result.composite_score = 0.0
        return 0.0

    # --- Raw acceleration ---
    acc_components = [
        (result.g1.score, 0.50),
        (result.g5.score, 0.25),
        (result.g6.score, 0.25),
    ]
    valid_acc = [(s, w) for s, w in acc_components if s is not None]
    tw = sum(w for _, w in valid_acc)
    raw = sum(s * w for s, w in valid_acc) / tw if tw > 0 else 0

    # Multi-metric confirmation bonus
    if result.g1.multi_metric_confirm >= 4:
        raw = min(raw + 0.8, 10.0)
    elif result.g1.multi_metric_confirm >= 3:
        raw = min(raw + 0.5, 10.0)

    # v3.2: Acquisition boost penalty — 并购驱动的加速不等于有机加速
    # G1的"加速"如果来自并购→打7折(ELF/BRO验证)
    if result.g3.acquisition_boost_flag:
        raw = round(raw * 0.70, 2)

    result.raw_acceleration_score = round(raw, 2)

    # --- Quality multiplier ---
    quality_scores = [s for s in [result.g2.score, result.g3.score, result.g4.score] if s is not None]
    if quality_scores:
        avg_quality = sum(quality_scores) / len(quality_scores)
        result.quality_multiplier = round(avg_quality / 5.0, 3)
    else:
        result.quality_multiplier = 1.0

    # Persistence bonus (4维>3维，修复之前的逻辑错误)
    if result.g3.persistence_count >= 4:
        result.quality_multiplier = round(result.quality_multiplier * 1.15, 3)
    elif result.g3.persistence_count >= 3:
        result.quality_multiplier = round(result.quality_multiplier * 1.08, 3)

    # --- v3.1: Cyclicality penalty (周期性惩罚) ---
    cyclicality_mult = result.g3.cyclicality_penalty
    result.quality_multiplier = round(result.quality_multiplier * cyclicality_mult, 3)

    # --- v3.2: Profitability discount (亏损公司折扣) ---
    # 亏损公司的信号不确定性更高：可能是真拐点，也可能是假信号
    if result.g2.profit_transition == "pre_ebitda":
        result.quality_multiplier = round(result.quality_multiplier * 0.80, 3)
    elif result.g2.profit_transition in ("ebitda_turn", "ocf_turn"):
        # 刚转正=好信号但需要确认，轻微折扣
        pass  # No discount — transition itself is the signal
    # Note: fcf_turn gets no discount, it's a confirmed inflection

    # --- Discovery multiplier ---
    result.discovery_multiplier = round(result.g7.discovery_multiplier, 3)

    # --- Final composite (使用asymptotic normalization防止cap clustering) ---
    raw_product = raw * result.quality_multiplier * result.discovery_multiplier
    # Asymptotic: score = 10 * (1 - e^(-raw_product/6))
    # 这让分数渐近于10但永远不到10，分数越高区分度越高
    result.composite_score = round(10.0 * (1 - math.exp(-raw_product / 6.0)), 2)

    # Labels
    result.leverage_phase = result.g2.phase or "unknown"
    result.growth_quality = result.g3.growth_type or "unknown"
    result.profit_transition = result.g2.profit_transition or "unknown"
    result.archetype = classify_archetype(result)

    # v3.2: Momentum trap penalty — 标签和分数必须一致
    # 被标为陷阱的公司应该被明确降级，否则排名会误导用户
    if result.archetype == "momentum_trap":
        result.composite_score = round(result.composite_score * 0.75, 2)

    result.signal_summary = _generate_summary(result)

    return result.composite_score


def _generate_summary(r: GIDResult) -> str:
    parts = []

    # Archetype first
    archetype_labels = {
        "stealth_compounder": "隐形复利", "leverage_breakout": "杠杆突破",
        "hyper_scaler": "超级扩张", "mature_reaccel": "成熟再加速",
        "momentum_trap": "动量陷阱⚠",
    }
    if r.archetype in archetype_labels:
        parts.append(archetype_labels[r.archetype])

    # Profit transition
    transition_labels = {
        "ebitda_turn": "EBITDA转正", "ocf_turn": "OCF转正",
        "fcf_turn": "FCF转正★", "fcf_expand": "FCF扩张",
    }
    if r.profit_transition in transition_labels:
        parts.append(transition_labels[r.profit_transition])

    # Key signals
    if r.g1.rev_acceleration is not None and r.g1.rev_acceleration > 3:
        parts.append(f"+{r.g1.rev_acceleration:.0f}pp")
    if r.g1.accel_from_low_base:
        parts.append("低基数")
    if r.g1.multi_metric_confirm >= 3:
        parts.append(f"{r.g1.multi_metric_confirm}指标确认")
    if r.g3.sm_efficiency_while_growing:
        parts.append("销售效率↑")
    if r.g3.persistence_count >= 3:
        parts.append(f"持续{r.g3.persistence_count}维")
    if r.g3.channel_stuffing_risk:
        parts.append("⚠堆货")
    if r.g3.acquisition_boost_flag:
        parts.append("⚠并购加速")
    if r.g4.balance_sheet_grade == "fortress":
        parts.append("净现金")

    return " | ".join(parts) if parts else "信号不足"


# ============================================================
# Main Pipeline
# ============================================================

def extract_gid_signals(
    profile: dict, income: list, balance: list, cashflow: list,
    key_metrics: list, ratios: list, insider_trades: list,
    quote: dict, earnings_surprises: list, estimates: list,
    income_quarterly: list, ratios_quarterly: list,
) -> GIDResult:
    symbol = profile.get('symbol', '') or profile.get('Symbol', '') or ''
    result = GIDResult(
        symbol=symbol,
        name=profile.get('companyName', '') or profile.get('Company Name', '') or '',
        market_cap=profile.get('mktCap') or (quote.get('marketCap') if isinstance(quote, dict) else None),
        sector=profile.get('sector', '') or '',
        industry=profile.get('industry', '') or '',
        has_quarterly_data=len(income_quarterly) >= 5,
        quarterly_periods=len(income_quarterly),
    )

    result.g1 = extract_g1(income_quarterly, ratios_quarterly)
    result.g2 = extract_g2(income_quarterly, ratios_quarterly)
    result.g3 = extract_g3(income_quarterly, ratios_quarterly, balance)
    result.g4 = extract_g4(income, cashflow, key_metrics, income_quarterly,
                           balance=balance, profile_mcap=result.market_cap)
    result.g5 = extract_g5(
        earnings_surprises, key_metrics, ratios, quote,
        income, income_quarterly, estimates
    )
    result.g6 = extract_g6(insider_trades, quote, income)
    result.g7 = extract_g7(result)

    return result


# ============================================================
# G7: Discovery Probability
# ============================================================

def extract_g7(result: GIDResult) -> G7Discovery:
    """发现概率: 市场注意到这个加速了吗？"""
    g7 = G7Discovery()

    # Market cap tier
    mcap_b = result.market_cap / 1e9 if result.market_cap else None
    g7.market_cap_b = mcap_b

    if mcap_b is not None:
        if mcap_b < 1:
            g7.mcap_tier = "micro"
            g7.mcap_discovery_mult = 1.35
        elif mcap_b < 10:
            g7.mcap_tier = "small"
            g7.mcap_discovery_mult = 1.25
        elif mcap_b < 50:
            g7.mcap_tier = "mid"
            g7.mcap_discovery_mult = 1.10
        elif mcap_b < 200:
            g7.mcap_tier = "large"
            g7.mcap_discovery_mult = 1.0
        else:
            g7.mcap_tier = "mega"
            g7.mcap_discovery_mult = 0.85

    # Analyst coverage gap
    g7.analyst_count = result.g5.analyst_count
    rev_g = result.g5.rev_growth_rate
    if g7.analyst_count and rev_g and rev_g > 0:
        g7.coverage_per_growth = g7.analyst_count / (rev_g / 10)
        # Low coverage relative to growth = under-researched
        g7.coverage_gap_score = _norm(g7.coverage_per_growth, 0.5, 5, invert=True)

    # EV/Sales vs quality mismatch
    ev_s = result.g5.ev_sales
    quality_score = None
    quality_scores = [s for s in [result.g2.score, result.g3.score, result.g4.score] if s is not None]
    if quality_scores:
        quality_score = sum(quality_scores) / len(quality_scores)
    if ev_s is not None and quality_score is not None and quality_score > 6:
        # High quality but low EV/Sales = market hasn't re-rated
        if ev_s < 5:
            g7.ev_sales_vs_quality = 1.15
        elif ev_s < 10:
            g7.ev_sales_vs_quality = 1.05
        elif ev_s > 30:
            g7.ev_sales_vs_quality = 0.90
        else:
            g7.ev_sales_vs_quality = 1.0

    # Base effect from G1
    g7.base_effect_mult = result.g1.accel_multiplier

    # Composite discovery multiplier
    mults = [g7.mcap_discovery_mult, g7.base_effect_mult]
    if g7.ev_sales_vs_quality is not None:
        mults.append(g7.ev_sales_vs_quality)
    g7.discovery_multiplier = 1.0
    for m in mults:
        g7.discovery_multiplier *= m
    # Cap between 0.6 and 1.8
    g7.discovery_multiplier = max(0.6, min(1.8, g7.discovery_multiplier))

    g7.score = g7.discovery_multiplier * 5.0  # Normalize to 0-10 scale roughly
    return g7


# ============================================================
# Archetype Classification
# ============================================================

def classify_archetype(result: GIDResult) -> str:
    """
    五种原型:
      stealth_compounder  : 中速增长+高质量+小市值+低关注 → 最有alpha
      leverage_breakout   : 盈利转折刚发生+运营杠杆释放 → 戴维斯双击候选
      hyper_scaler        : 高速增长+市场已知+质量极高 → 确定性高但alpha低
      mature_reaccel      : 大公司增长再加速 → 市值大但预期修正大
      momentum_trap       : 高加速+低质量 → 危险,可能是假阳性
    """
    g1 = result.g1
    g2 = result.g2
    g3 = result.g3
    g4 = result.g4
    mcap_b = result.market_cap / 1e9 if result.market_cap else 100

    rev_g = g1.rev_yoy[0] if g1.rev_yoy else None
    quality_mult = result.quality_multiplier or 1.0

    # Momentum Trap: high acceleration but low quality (v3.1: tightened criteria)
    trap_signals = 0
    if g3.growth_type == "margin_sacrifice":
        trap_signals += 2  # 以价换量=强负面
    if g3.channel_stuffing_risk:
        trap_signals += 2  # 渠道堆货=强负面
    if g3.rev_path_grade in ("lumpy", "erratic"):
        trap_signals += 1  # 收入波动大=可能周期性
    if quality_mult < 0.85:
        trap_signals += 1
    # v3.2: 重组反弹检测(SGA大幅下降=裁员驱动不是效率提升)
    if g2.sga_absorption is not None and g2.sga_absorption < -15:
        trap_signals += 1
    # 需要2+个陷阱信号才标记(避免单个信号误判)
    if trap_signals >= 2 and g1.score is not None and g1.score > 3:
        return "momentum_trap"

    # Stealth Compounder: moderate growth + high quality + small/mid cap
    if (mcap_b < 50
        and rev_g is not None and 10 < rev_g < 40
        and quality_mult > 1.1
        and g3.growth_type in ("pricing_power", "volume", "stable_moat")
        and (g4.self_funding or (g4.balance_sheet_grade in ("fortress", "healthy")))):
        return "stealth_compounder"

    # Leverage Breakout: profitability inflection + operating leverage
    if (g2.phase == "release"
        and g2.profit_transition in ("ebitda_turn", "ocf_turn", "fcf_turn")
        and g2.incremental_vs_average_opm is not None and g2.incremental_vs_average_opm > 10):
        return "leverage_breakout"

    # Hyper Scaler: very high growth, market knows, quality excellent
    if (rev_g is not None and rev_g > 35
        and quality_mult > 1.2
        and mcap_b > 50):
        return "hyper_scaler"

    # Mature Re-acceleration: large cap, was slow, now accelerating
    if (mcap_b > 50
        and g1.accel_from_low_base
        and g1.rev_acceleration is not None and g1.rev_acceleration > 3):
        return "mature_reaccel"

    # Leverage Breakout (broader): release phase with good quality
    if (g2.phase == "release" and quality_mult > 1.0):
        return "leverage_breakout"

    # Stealth Compounder (broader): smaller cap with quality
    if mcap_b < 50 and quality_mult > 1.0 and rev_g is not None and rev_g > 5:
        return "stealth_compounder"

    return "unclassified"


# ============================================================
# Output
# ============================================================

def format_gid_ranking(results: list[GIDResult], top_n: int = 30) -> str:
    ranked = sorted(
        [r for r in results if r.composite_score is not None and r.composite_score > 0],
        key=lambda r: r.composite_score, reverse=True
    )[:top_n]

    lines = [
        "=" * 155,
        "Growth Inflection Detection (GID) v3.0 — 高质量新兴加速信号排名",
        "=" * 155,
        f"{'#':<4} {'Sym':<6} {'Name':<18} {'GID':>5} "
        f"{'Raw':>4} {'Q×D':>5} "
        f"{'G1加速':>6} {'G2杠杆':>6} {'G3质量':>6} {'G4规模':>6} "
        f"{'MCap':>6} {'原型':<8} {'盈利转折':<8} {'信号摘要'}",
        "-" * 155,
    ]

    for i, r in enumerate(ranked, 1):
        archetype_short = {
            "stealth_compounder": "隐形复利", "leverage_breakout": "杠杆突破",
            "hyper_scaler": "超级扩张", "mature_reaccel": "再加速",
            "momentum_trap": "陷阱⚠", "unclassified": "—",
        }.get(r.archetype, "—")
        transition_short = {
            "ebitda_turn": "EBITDA+", "ocf_turn": "OCF+",
            "fcf_turn": "FCF+★", "fcf_expand": "FCF↑",
            "pre_ebitda": "亏损中", "profitable": "盈利中",
            "unknown": "—",
        }.get(r.profit_transition, "—")
        mcap_s = f"${r.market_cap/1e9:.0f}B" if r.market_cap else "N/A"
        qd = (r.quality_multiplier or 1) * (r.discovery_multiplier or 1)
        flags = " ⚠" if r.flags else ""

        lines.append(
            f"{i:<4} {r.symbol:<6} {r.name[:17]:<18} {r.composite_score:>5.2f} "
            f"{r.raw_acceleration_score or 0:>4.1f} {qd:>5.2f} "
            f"{r.g1.score or 0:>6.2f} {r.g2.score or 0:>6.2f} {r.g3.score or 0:>6.2f} "
            f"{r.g4.score or 0:>6.2f} "
            f"{mcap_s:>6} {archetype_short:<8} {transition_short:<8} {r.signal_summary[:38]}{flags}"
        )

    lines.append("-" * 155)
    lines.append(f"Screened: {len(results)} | Ranked: {len(ranked)} | "
                 f"With Q data: {sum(1 for r in results if r.has_quarterly_data)}")

    # Archetype breakdown
    from collections import Counter
    archetypes = Counter(r.archetype for r in ranked)
    lines.append(f"Archetypes: {dict(archetypes)}")

    return "\n".join(lines)


def format_gid_card(r: GIDResult) -> str:
    lines = [
        f"{'='*70}",
        f"GID v2.0 Signal Card: {r.symbol} ({r.name})",
        f"{'='*70}",
        f"Sector: {r.sector} | Industry: {r.industry}",
        f"Market Cap: ${r.market_cap/1e9:.1f}B" if r.market_cap else "Market Cap: N/A",
        f"Quarterly Data: {'Yes' if r.has_quarterly_data else 'No'} ({r.quarterly_periods}Q)",
        "",
        f"■ GID Score: {r.composite_score:.2f}/10",
        f"  Raw Acceleration: {r.raw_acceleration_score} × Quality Multiplier: {r.quality_multiplier}x",
        f"  Leverage Phase: {r.leverage_phase} | Growth Type: {r.growth_quality}",
        "",
    ]

    # G1
    lines.append(f"━━━ G1: 加速检测 ({r.g1.score:.2f}) ━━━")
    if r.g1.rev_yoy:
        yoys = " → ".join(f"{y:.1f}%" if y is not None else "N/A" for y in r.g1.rev_yoy)
        lines.append(f"  收入YoY (Q0→Q3): {yoys}")
    if r.g1.rev_acceleration is not None:
        lines.append(f"  加速度: {r.g1.rev_acceleration:+.1f}pp | 连续: {r.g1.rev_accel_consecutive}Q")
    if r.g1.cascade_test:
        lines.append(f"  级联杠杆: {r.g1.cascade_test.upper()} "
                     f"(Rev {r.g1.rev_yoy[0]:.1f}% > COGS {r.g1.cogs_yoy_q0:.1f}% > OpEx {r.g1.opex_yoy_q0:.1f}%)"
                     if r.g1.cogs_yoy_q0 is not None and r.g1.opex_yoy_q0 is not None and r.g1.rev_yoy
                     else f"  级联杠杆: {r.g1.cascade_test}")
    if r.g1.gp_rev_spread is not None:
        lines.append(f"  GP vs Rev增速差: {r.g1.gp_rev_spread:+.1f}pp | "
                     f"OI vs Rev增速差: {r.g1.oi_rev_spread:+.1f}pp" if r.g1.oi_rev_spread is not None
                     else f"  GP vs Rev增速差: {r.g1.gp_rev_spread:+.1f}pp")

    # G2
    lines.append(f"\n━━━ G2: 经营杠杆阶段 ({r.g2.score:.2f}) — {r.leverage_phase} ━━━")
    if r.g2.incremental_op_margin is not None:
        lines.append(f"  增量营业利润率: {r.g2.incremental_op_margin:.1f}% "
                     f"(vs 平均: {r.g2.incremental_vs_average_opm:+.1f}pp)"
                     if r.g2.incremental_vs_average_opm is not None
                     else f"  增量营业利润率: {r.g2.incremental_op_margin:.1f}%")
    if r.g2.incremental_gross_margin is not None:
        lines.append(f"  增量毛利率: {r.g2.incremental_gross_margin:.1f}%")
    absorbs = []
    if r.g2.rd_absorption is not None:
        absorbs.append(f"R&D {r.g2.rd_absorption:+.1f}pp")
    if r.g2.sga_absorption is not None:
        absorbs.append(f"SGA {r.g2.sga_absorption:+.1f}pp")
    if absorbs:
        lines.append(f"  固定成本摊薄: {' | '.join(absorbs)} (负=好)")
    if r.g2.opm_trajectory:
        opms = " → ".join(f"{o:.1f}%" if o is not None else "?" for o in r.g2.opm_trajectory)
        lines.append(f"  OPM轨迹(Q0→Q3): {opms}")

    # G3
    lines.append(f"\n━━━ G3: 增长质量 ({r.g3.score:.2f}) — {r.growth_quality} ━━━")
    if r.g3.growth_type:
        type_explain = {
            "pricing_power": "GM扩+Rev增 = 靠定价权增长(高质量)",
            "stable_moat": "高GM(>70%)+稳定 = 护城河增长(高质量)",
            "volume": "GM平+Rev增 = 靠量增长(可持续性需验证)",
            "margin_sacrifice": "GM缩+Rev增 = 以价换量(低质量⚠)",
            "negative": "收入萎缩",
        }
        lines.append(f"  增长类型: {type_explain.get(r.g3.growth_type, r.g3.growth_type)}")
    if r.g3.gm_delta_yoy is not None:
        lines.append(f"  毛利率YoY变化: {r.g3.gm_delta_yoy:+.1f}pp")
    if r.g3.has_inventory:
        lines.append(f"  库存周转: Q0={r.g3.inv_turnover_q0:.2f} "
                     f"{'→ 趋势' + ('+' if r.g3.inv_turnover_trend > 0 else '') + f'{r.g3.inv_turnover_trend:.2f}' if r.g3.inv_turnover_trend is not None else ''}"
                     f" | 连续改善: {r.g3.inv_turnover_consecutive_improve}Q"
                     if r.g3.inv_turnover_q0 else "  库存数据不足")
        if r.g3.inv_growth_vs_rev_growth is not None:
            lines.append(f"  库存增速-收入增速: {r.g3.inv_growth_vs_rev_growth:+.1f}pp (负=精益)")
        if r.g3.channel_stuffing_risk:
            lines.append("  ⚠ 渠道堆货风险: 库存+应收增速远超收入增速!")
    if r.g3.ccc_improving is not None:
        lines.append(f"  现金转化周期: {'缩短(好)' if r.g3.ccc_improving else '延长(差)'}"
                     f" Q0={r.g3.ccc_proxy_q0:.0f}天 vs Q4={r.g3.ccc_proxy_q4:.0f}天"
                     if r.g3.ccc_proxy_q0 is not None and r.g3.ccc_proxy_q4 is not None
                     else f"  现金转化周期: {'改善' if r.g3.ccc_improving else '恶化'}")
    if r.g3.has_deferred_rev:
        lines.append(f"  递延收入增速: {r.g3.deferred_rev_growth:.1f}% "
                     f"{'> 收入增速 = 未来加速信号' if r.g3.deferred_faster_than_rev else ''}"
                     if r.g3.deferred_rev_growth is not None else "  递延收入: 有数据")
    if r.g3.recv_turnover_trend is not None:
        lines.append(f"  应收周转趋势: {r.g3.recv_turnover_trend:+.2f} "
                     f"({'客户付款加快' if r.g3.recv_turnover_trend > 0 else '客户付款变慢'})")

    # G4
    lines.append(f"\n━━━ G4: 规模经济 ({r.g4.score:.2f}) ━━━")
    if r.g4.incremental_roic is not None:
        lines.append(f"  增量ROIC: {r.g4.incremental_roic:.1f}% "
                     f"(每多投$1赚${r.g4.incremental_roic/100:.2f})")
    if r.g4.roic_latest is not None:
        lines.append(f"  ROIC: {r.g4.roic_latest:.1f}% "
                     f"{'↑' if r.g4.roic_improving else '↓'}")
    if r.g4.fcf_margin_delta is not None:
        lines.append(f"  FCF Margin: {r.g4.fcf_margin_latest:.1f}% "
                     f"(Δ{r.g4.fcf_margin_delta:+.1f}pp)"
                     f"{' ★转正!' if r.g4.fcf_positive_inflection else ''}")
    if r.g4.rule_of_40_latest is not None:
        lines.append(f"  Rule of 40: {r.g4.rule_of_40_latest:.0f} "
                     f"(轨迹: {r.g4.rule_of_40_trajectory:+.0f})" if r.g4.rule_of_40_trajectory is not None
                     else f"  Rule of 40: {r.g4.rule_of_40_latest:.0f}")
    if r.g4.sbc_growth_vs_rev_growth is not None:
        lines.append(f"  SBC增速 vs Rev增速: {r.g4.sbc_growth_vs_rev_growth:+.1f}pp "
                     f"({'纪律好' if r.g4.sbc_growth_vs_rev_growth < 0 else '纪律差'})")
    if r.g4.compounding_power is not None:
        lines.append(f"  复利力(RealFCF×Growth): {r.g4.compounding_power:.1f}")

    # G5
    lines.append(f"\n━━━ G5: 定价滞后 ({r.g5.score:.2f}) ━━━")
    if r.g5.beat_count_4q > 0:
        lines.append(f"  Beat: {r.g5.beat_count_4q}/4Q "
                     f"avg {r.g5.avg_beat_magnitude:.1f}%" if r.g5.avg_beat_magnitude else
                     f"  Beat: {r.g5.beat_count_4q}/4Q")
    if r.g5.ev_sales is not None:
        lines.append(f"  EV/Sales: {r.g5.ev_sales:.1f}x | Rev增速: "
                     f"{r.g5.rev_growth_rate:.1f}%" if r.g5.rev_growth_rate is not None
                     else f"  EV/Sales: {r.g5.ev_sales:.1f}x")
    if r.g5.growth_adjusted_ev_sales is not None:
        lines.append(f"  Growth-Adj EV/S: {r.g5.growth_adjusted_ev_sales:.1f}x")

    # G6
    lines.append(f"\n━━━ G6: 聪明钱 ({r.g6.score:.2f}) ━━━")
    if r.g6.insider_buy_count_6m > 0:
        lines.append(f"  内部人买入: {r.g6.insider_buy_count_6m}笔 ${r.g6.insider_buy_value_6m/1000:.0f}K")
        roles = []
        if r.g6.insider_has_ceo_buy: roles.append("CEO")
        if r.g6.insider_has_cfo_buy: roles.append("CFO")
        if roles: lines.append(f"  高管: {', '.join(roles)}")
    else:
        lines.append("  内部人买入: 无")
    if r.g6.shares_change_1y is not None:
        lines.append(f"  股份变化: {r.g6.shares_change_1y:+.1f}%")

    # Flags & Vetoes
    if r.vetoes:
        lines.append(f"\n⛔ VETOES: {'; '.join(r.vetoes)}")
    if r.flags:
        lines.append(f"\n⚠ FLAGS: {'; '.join(r.flags)}")

    lines.append(f"\n{'='*70}")
    return "\n".join(lines)


def save_gid_results(results: list[GIDResult], output_path: str):
    data = []
    for r in results:
        data.append({
            'symbol': r.symbol, 'name': r.name,
            'market_cap': r.market_cap, 'sector': r.sector, 'industry': r.industry,
            'composite_score': r.composite_score,
            'raw_acceleration': r.raw_acceleration_score,
            'quality_multiplier': r.quality_multiplier,
            'leverage_phase': r.leverage_phase,
            'growth_quality': r.growth_quality,
            'archetype': r.archetype,
            'profit_transition': r.profit_transition,
            'discovery_multiplier': r.discovery_multiplier,
            'rev_path_grade': r.g3.rev_path_grade,
            'g1': r.g1.score, 'g2': r.g2.score, 'g3': r.g3.score,
            'g4': r.g4.score, 'g5': r.g5.score, 'g6': r.g6.score,
            'rev_yoy_q0': r.g1.rev_yoy[0] if r.g1.rev_yoy else None,
            'rev_acceleration': r.g1.rev_acceleration,
            'cascade_test': r.g1.cascade_test,
            'incremental_opm': r.g2.incremental_op_margin,
            'phase': r.g2.phase,
            'growth_type': r.g3.growth_type,
            'inv_turnover_trend': r.g3.inv_turnover_trend,
            'ccc_improving': r.g3.ccc_improving,
            'incremental_roic': r.g4.incremental_roic,
            'fcf_margin_delta': r.g4.fcf_margin_delta,
            'rule_of_40': r.g4.rule_of_40_latest,
            'ev_sales': r.g5.ev_sales,
            'balance_sheet': r.g4.balance_sheet_grade,
            'gm_delta_yoy': r.g3.gm_delta_yoy,
            'sm_efficiency_delta': r.g3.sm_efficiency_delta,
            'persistence_count': r.g3.persistence_count,
            'multi_metric_confirm': r.g1.multi_metric_confirm,
            'signal_summary': r.signal_summary,
            'vetoes': r.vetoes, 'flags': r.flags,
        })
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
