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
    # Valuation
    ev_ebit: Optional[float] = None           # 越低越好, <15好
    fcf_yield: Optional[float] = None         # 越高越好, >5%好
    pe_ttm: Optional[float] = None
    pb: Optional[float] = None
    shareholder_yield: Optional[float] = None # dividend + buyback + debt paydown

    # Insider Buy
    insider_buy_count_6m: int = 0             # 近6月买入笔数
    insider_buy_value_6m: float = 0.0         # 近6月买入金额($)
    insider_cluster: bool = False             # 多人同期买入
    insider_post_drop: bool = False           # 大跌后买入

    # Buyback
    shares_change_1y: Optional[float] = None  # 流通股变化%, 负=缩股
    shares_change_3y: Optional[float] = None
    buyback_debt_funded: Optional[bool] = None

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

    # Red Flags
    short_interest_pct: Optional[float] = None  # >10%红旗
    audit_concern: bool = False

    score: Optional[float] = None

@dataclass
class L3Signals:
    """Layer 3: 市场开始纠错"""
    # Earnings Momentum
    earnings_surprise_last: Optional[float] = None   # 最近一次surprise%
    earnings_surprise_streak: int = 0                 # 连续超预期次数

    # Analyst Revisions
    estimate_revision_3m: Optional[float] = None     # 3月预测修正方向
    analyst_coverage_count: Optional[int] = None     # 覆盖数(低=信息不对称大)

    # Price Momentum (contrarian)
    price_52w_pct: Optional[float] = None            # 当前价/52周高点
    price_6m_return: Optional[float] = None

    score: Optional[float] = None

@dataclass
class StockScreenResult:
    symbol: str
    name: str = ""
    market_cap: Optional[float] = None
    sector: str = ""
    l1: L1Signals = field(default_factory=L1Signals)
    l2: L2Signals = field(default_factory=L2Signals)
    l3: L3Signals = field(default_factory=L3Signals)
    composite_score: Optional[float] = None
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
    Layer 1 composite: 估值 + Insider + 回购
    v1.2: 动态权重 — 有insider时25%, 无insider时权重转给估值+回购
    v1.2: 更陡峭的估值曲线 — EV/EBITDA<10和PE<12区间奖励更大
    """
    scores = []
    weights = []

    # --- Valuation sub-score ---
    # 更陡峭的归一化: EV/EBITDA 3-20 (not 5-30), PE 5-25 (not 5-40)
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

    if val_scores:
        scores.append(sum(val_scores) / len(val_scores))
        weights.append(0.50 if not has_insider else 0.40)

    # --- Insider sub-score (动态权重: 有买入=25%, 无买入=0%→给估值和回购) ---
    if has_insider:
        count_s = min(s.insider_buy_count_6m / 5.0, 1.0) * 6
        cluster_s = 3.0 if s.insider_cluster else 0.0
        post_drop_s = 1.0 if s.insider_post_drop else 0.0
        insider_score = min(count_s + cluster_s + post_drop_s, 10.0)
        scores.append(insider_score)
        weights.append(0.25)

    # --- Buyback/Shrink sub-score ---
    bb_score = 5.0
    if s.shares_change_1y is not None:
        bb_score = _normalize(s.shares_change_1y, -10, 10, invert=True)
        if s.buyback_debt_funded:
            bb_score *= 0.5
    scores.append(bb_score)
    weights.append(0.25 if not has_insider else 0.20)

    # --- Negative valuation penalty: 负EV/EBITDA或负PE = 确实亏损, 估值无意义 ---
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
    """Layer 3 composite: EarningsSurprise35% + Revisions30% + Contrarian20% + Coverage15%"""
    scores = []
    weights = []

    # Earnings Surprise (35%)
    if s.earnings_surprise_last is not None:
        surprise_s = _normalize(s.earnings_surprise_last, -20, 30, invert=False)
        streak_bonus = min(s.earnings_surprise_streak * 1.0, 3.0)
        scores.append(min(surprise_s + streak_bonus, 10.0))
        weights.append(0.35)

    # Analyst Revisions (30%)
    if s.estimate_revision_3m is not None:
        scores.append(_normalize(s.estimate_revision_3m, -20, 20, invert=False))
        weights.append(0.30)

    # Contrarian: far from 52w high = potential (20%)
    if s.price_52w_pct is not None:
        scores.append(_normalize(s.price_52w_pct, 0.5, 1.0, invert=True))
        weights.append(0.20)

    # Low coverage = more mispricing potential (15%)
    if s.analyst_coverage_count is not None:
        scores.append(_normalize(s.analyst_coverage_count, 0, 20, invert=True))
        weights.append(0.15)

    total_weight = sum(weights)
    s.score = sum(s * w for s, w in zip(scores, weights)) / total_weight if total_weight > 0 else 5.0
    return s.score


# ============================================================
# Veto Logic (硬否决)
# ============================================================

def check_vetoes(result: StockScreenResult) -> list[str]:
    """检查硬否决条件. 返回否决原因列表."""
    vetoes = []

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

    result.flags = flags
    return flags


# ============================================================
# Composite Scoring
# ============================================================

def compute_composite(result: StockScreenResult) -> float:
    """
    Final composite = L1×0.35 + L2×0.40 + L3×0.25
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
    symbol = profile.get('symbol', 'UNKNOWN')
    result = StockScreenResult(
        symbol=symbol,
        name=profile.get('companyName', ''),
        market_cap=profile.get('marketCap') or profile.get('mktCap', 0),
        sector=profile.get('sector', ''),
    )

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

    # --- L1: Insider Buy ---
    # FMP insider-trading endpoint returns quarterly summaries:
    #   acquiredTransactions = ALL acquisitions (grants + options + purchases)
    #   totalPurchases = open-market BUY transactions only (真金白银!)
    #   totalAcquired = shares acquired (all types)
    #   totalSales = open-market SELL transactions
    # Key insight: totalPurchases > 0 is the real signal (not acquiredTransactions)
    if insider_trades:
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

    # --- L3: Price Position ---
    if quote and isinstance(quote, dict):
        price = quote.get('price', 0)
        high_52 = quote.get('yearHigh', 0)
        if high_52 and high_52 > 0:
            result.l3.price_52w_pct = price / high_52

    # --- L3: Earnings Surprise (from estimates if available) ---
    # This needs estimates endpoint - marked as None for now

    return result


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

def save_results(results: list[StockScreenResult], output_dir: str = "data/screener"):
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
            'l1_score': r.l1.score,
            'l2_score': r.l2.score,
            'l3_score': r.l3.score,
            'f_score': r.l2.f_score,
            'insider_buy_value_6m': r.l1.insider_buy_value_6m,
            'insider_cluster': r.l1.insider_cluster,
            'accruals': r.l2.accruals_ratio,
            'gp_assets': r.l2.gross_profit_assets,
            'roic': r.l2.roic,
            'asset_growth': r.l2.asset_growth_1y,
            'ev_ebitda': r.l1.ev_ebit,
            'fcf_yield': r.l1.fcf_yield,
            'shareholder_yield': r.l1.shareholder_yield,
            'vetoes': r.vetoes,
            'flags': r.flags,
        }
        json_data.append(d)

    with open(out / "screen_results.json", 'w') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    # Text report
    active = sorted(
        [r for r in results if not r.vetoes],
        key=lambda r: r.composite_score or 0,
        reverse=True
    )
    with open(out / "screen_report.txt", 'w') as f:
        f.write(format_ranking_table(results))
        f.write("\n\n" + "="*80 + "\n  详细信号卡片\n" + "="*80 + "\n")
        for r in active[:20]:  # top 20 details
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
        )
        compute_composite(result)
        results.append(result)

    print(format_ranking_table(results))
    save_results(results)
