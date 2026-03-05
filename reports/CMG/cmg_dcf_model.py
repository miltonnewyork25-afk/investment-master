#!/usr/bin/env python3
"""
CMG Forward DCF Model — Phase 3
Framework: v18.0 | 4 Scenarios | WACC Sensitivity
Iron Law: LLM不能做算术 — All valuation math must be Python-verified

Key Parameters:
- WACC = Ke (zero financial debt) = 9.5% base
- Terminal g = 2.5% base
- Net Cash = $1.05B
- Shares = 1.32B (FY2025 diluted)
- FY2025 base: Revenue $11.93B, FCF $1.45B, OPM 16.8%
"""

import json
from dataclasses import dataclass
from typing import List, Dict

# ============================================================
# Constants
# ============================================================
CURRENT_PRICE = 36.93
SHARES_DILUTED = 1.32e9  # 1.32B
MARKET_CAP = CURRENT_PRICE * SHARES_DILUTED  # ~$48.75B
NET_CASH = 1.05e9  # $1.05B (zero financial debt, $1.05B cash+short-term investments)
FY2025_REVENUE = 11.93e9
FY2025_FCF = 1.45e9
FY2025_OPM = 0.168
FY2025_EPS = 1.14
FY2025_NET_INCOME = 1.536e9
TAX_RATE = 0.245  # Effective tax rate ~24.5%
CAPEX_PCT_BASE = 0.056  # CapEx/Revenue ~5.6% (FY2025: $666M / $11.93B)
DA_PCT = 0.042  # D&A/Revenue ~4.2%
SBC_PCT = 0.010  # SBC/Revenue ~1.0% ($120M / $11.93B)

PROJECTION_YEARS = 5  # 5-year explicit forecast
TERMINAL_G_BASE = 0.025  # 2.5%


@dataclass
class Scenario:
    name: str
    probability: float
    # Revenue assumptions
    rev_cagr: float  # 5-year revenue CAGR
    # Margin assumptions
    opm_y1: float  # Year 1 OPM
    opm_terminal: float  # Year 5 OPM (linear ramp)
    # CapEx
    capex_pct: float  # CapEx as % of revenue
    # Buyback
    buyback_annual: float  # Annual buyback ($B)
    # WACC
    wacc: float
    # Terminal growth
    terminal_g: float
    # Share reduction from buybacks (annual %)
    share_reduction: float


# ============================================================
# 4 Scenarios (aligned with valuation_alignment_spec.md)
# ============================================================
scenarios = [
    Scenario(
        name="S1: HEEP驱动重加速",
        probability=0.15,
        rev_cagr=0.12,  # 12% (HEEP + new stores + comp recovery)
        opm_y1=0.172,
        opm_terminal=0.190,  # HEEP efficiency + scale leverage
        capex_pct=0.060,  # Higher CapEx for HEEP rollout
        buyback_annual=1.5e9,  # Moderate buyback (reinvesting more)
        wacc=0.090,  # Lower risk premium (growth confirmed)
        terminal_g=0.030,
        share_reduction=0.015,  # ~1.5%/yr
    ),
    Scenario(
        name="S2: 稳态增长",
        probability=0.50,
        rev_cagr=0.08,  # 8% (new stores +3-4% + comp ~flat + pricing ~2%)
        opm_y1=0.165,
        opm_terminal=0.170,  # Slight improvement from HEEP, offset by tariffs
        capex_pct=0.056,
        buyback_annual=1.5e9,  # Maintain pace
        wacc=0.095,  # Base WACC
        terminal_g=0.025,
        share_reduction=0.015,
    ),
    Scenario(
        name="S3: 增长停滞",
        probability=0.25,
        rev_cagr=0.05,  # 5% (new stores only, comp negative)
        opm_y1=0.158,
        opm_terminal=0.150,  # Tariff + wage pressure
        capex_pct=0.055,
        buyback_annual=1.2e9,  # Reduced buyback
        wacc=0.100,  # Higher risk premium
        terminal_g=0.020,
        share_reduction=0.012,
    ),
    Scenario(
        name="S4: 品牌衰退",
        probability=0.10,
        rev_cagr=0.02,  # 2% (store growth offset by comp decline)
        opm_y1=0.148,
        opm_terminal=0.120,  # Structural margin compression
        capex_pct=0.050,  # Reduced investment
        buyback_annual=0.8e9,  # Cash conservation
        wacc=0.110,  # Significant risk premium
        terminal_g=0.015,
        share_reduction=0.010,
    ),
]


def project_fcf(scenario: Scenario) -> List[float]:
    """Project Free Cash Flow for 5 years."""
    fcfs = []
    for year in range(1, PROJECTION_YEARS + 1):
        revenue = FY2025_REVENUE * (1 + scenario.rev_cagr) ** year

        # Linear OPM ramp from Y1 to terminal
        if PROJECTION_YEARS > 1:
            opm = scenario.opm_y1 + (scenario.opm_terminal - scenario.opm_y1) * (year - 1) / (PROJECTION_YEARS - 1)
        else:
            opm = scenario.opm_terminal

        ebit = revenue * opm
        nopat = ebit * (1 - TAX_RATE)

        # Add back D&A, subtract CapEx
        da = revenue * DA_PCT
        capex = revenue * scenario.capex_pct

        # FCF = NOPAT + D&A - CapEx (simplified: NOPAT + D&A - CapEx)
        # More precisely: FCFF = NOPAT + D&A - CapEx - ΔWC
        # CMG has negative CCC so ΔWC ≈ 0 on average
        fcf = nopat + da - capex

        fcfs.append(fcf)
    return fcfs


def calculate_terminal_value(final_fcf: float, wacc: float, terminal_g: float) -> float:
    """Gordon Growth Model terminal value."""
    return final_fcf * (1 + terminal_g) / (wacc - terminal_g)


def dcf_valuation(scenario: Scenario) -> Dict:
    """Full DCF valuation for a scenario."""
    fcfs = project_fcf(scenario)

    # Discount factors
    discount_factors = [(1 + scenario.wacc) ** (-t) for t in range(1, PROJECTION_YEARS + 1)]

    # PV of explicit period FCFs
    pv_fcfs = [fcf * df for fcf, df in zip(fcfs, discount_factors)]
    pv_explicit = sum(pv_fcfs)

    # Terminal value
    tv = calculate_terminal_value(fcfs[-1], scenario.wacc, scenario.terminal_g)
    pv_tv = tv * discount_factors[-1]

    # Enterprise value
    ev = pv_explicit + pv_tv

    # Equity value
    equity_value = ev + NET_CASH

    # Share count adjustment (buybacks reduce shares)
    adj_shares = SHARES_DILUTED
    for year in range(PROJECTION_YEARS):
        adj_shares *= (1 - scenario.share_reduction)

    # Price per share
    price_per_share = equity_value / adj_shares

    # Implied metrics
    implied_pe = equity_value / FY2025_NET_INCOME if FY2025_NET_INCOME > 0 else float('inf')
    upside = (price_per_share - CURRENT_PRICE) / CURRENT_PRICE

    return {
        "scenario": scenario.name,
        "probability": scenario.probability,
        "wacc": scenario.wacc,
        "terminal_g": scenario.terminal_g,
        "rev_cagr": scenario.rev_cagr,
        "opm_terminal": scenario.opm_terminal,
        "fcf_y1": fcfs[0],
        "fcf_y5": fcfs[-1],
        "fcf_cagr": (fcfs[-1] / fcfs[0]) ** (1/4) - 1,  # 4 periods between Y1 and Y5
        "pv_explicit": pv_explicit,
        "pv_tv": pv_tv,
        "tv_pct": pv_tv / (pv_explicit + pv_tv),
        "enterprise_value": ev,
        "equity_value": equity_value,
        "adj_shares": adj_shares,
        "price_per_share": price_per_share,
        "implied_pe": implied_pe,
        "upside": upside,
    }


def sensitivity_matrix(base_scenario: Scenario) -> List[List[Dict]]:
    """WACC × Terminal g sensitivity matrix."""
    wacc_range = [0.085, 0.090, 0.095, 0.100, 0.105, 0.110]
    g_range = [0.020, 0.025, 0.030]

    matrix = []
    for wacc in wacc_range:
        row = []
        for g in g_range:
            s = Scenario(
                name=f"Sensitivity WACC={wacc:.1%} g={g:.1%}",
                probability=0,
                rev_cagr=base_scenario.rev_cagr,
                opm_y1=base_scenario.opm_y1,
                opm_terminal=base_scenario.opm_terminal,
                capex_pct=base_scenario.capex_pct,
                buyback_annual=base_scenario.buyback_annual,
                wacc=wacc,
                terminal_g=g,
                share_reduction=base_scenario.share_reduction,
            )
            result = dcf_valuation(s)
            row.append({"wacc": wacc, "g": g, "price": result["price_per_share"]})
        matrix.append(row)
    return matrix


def main():
    print("=" * 70)
    print("CMG Forward DCF Model — Phase 3")
    print(f"Current Price: ${CURRENT_PRICE:.2f} | Market Cap: ${MARKET_CAP/1e9:.1f}B")
    print(f"Net Cash: ${NET_CASH/1e9:.2f}B | Shares: {SHARES_DILUTED/1e9:.2f}B")
    print("=" * 70)

    # ============================================================
    # 1. Individual Scenario Results
    # ============================================================
    results = []
    for s in scenarios:
        r = dcf_valuation(s)
        results.append(r)
        print(f"\n{'─' * 60}")
        print(f"  {r['scenario']} (Prob: {r['probability']:.0%})")
        print(f"{'─' * 60}")
        print(f"  WACC: {r['wacc']:.1%} | Terminal g: {r['terminal_g']:.1%}")
        print(f"  Rev CAGR: {r['rev_cagr']:.1%} | OPM Terminal: {r['opm_terminal']:.1%}")
        print(f"  FCF Y1: ${r['fcf_y1']/1e9:.2f}B → Y5: ${r['fcf_y5']/1e9:.2f}B (CAGR: {r['fcf_cagr']:.1%})")
        print(f"  PV Explicit: ${r['pv_explicit']/1e9:.1f}B | PV TV: ${r['pv_tv']/1e9:.1f}B ({r['tv_pct']:.0%})")
        print(f"  Enterprise Value: ${r['enterprise_value']/1e9:.1f}B")
        print(f"  Equity Value: ${r['equity_value']/1e9:.1f}B")
        print(f"  Adj. Shares: {r['adj_shares']/1e9:.3f}B")
        print(f"  ★ Price/Share: ${r['price_per_share']:.2f} ({r['upside']:+.1%} vs current)")
        print(f"  Implied P/E: {r['implied_pe']:.1f}x")

    # ============================================================
    # 2. Probability-Weighted Price
    # ============================================================
    pw_price = sum(r["price_per_share"] * r["probability"] for r in results)
    pw_ev = sum(r["enterprise_value"] * r["probability"] for r in results)
    pw_upside = (pw_price - CURRENT_PRICE) / CURRENT_PRICE

    print(f"\n{'=' * 70}")
    print(f"  PROBABILITY-WEIGHTED RESULTS")
    print(f"{'=' * 70}")
    print(f"  PW Price: ${pw_price:.2f} ({pw_upside:+.1%} vs ${CURRENT_PRICE})")
    print(f"  PW EV: ${pw_ev/1e9:.1f}B")
    print(f"  PW Implied P/E: {pw_price / FY2025_EPS:.1f}x")

    # Expected return classification
    if pw_upside > 0.30:
        rating = "深度关注"
    elif pw_upside > 0.10:
        rating = "关注"
    elif pw_upside > -0.10:
        rating = "中性关注"
    else:
        rating = "审慎关注"
    print(f"  DCF-implied Rating: {rating}")

    # ============================================================
    # 3. Sensitivity Matrix (Base scenario parameters)
    # ============================================================
    base = scenarios[1]  # S2 稳态增长
    matrix = sensitivity_matrix(base)

    print(f"\n{'=' * 70}")
    print(f"  SENSITIVITY MATRIX (S2 Base Params, Rev CAGR {base.rev_cagr:.0%}, OPM→{base.opm_terminal:.1%})")
    print(f"{'=' * 70}")
    print(f"  {'WACC ↓ / g →':>14} {'g=2.0%':>10} {'g=2.5%':>10} {'g=3.0%':>10}")
    print(f"  {'─' * 44}")
    for row in matrix:
        wacc = row[0]["wacc"]
        prices = [f"${cell['price']:.2f}" for cell in row]
        marker = " ◄BASE" if abs(wacc - 0.095) < 0.001 else ""
        print(f"  {'WACC=' + f'{wacc:.1%}':>14} {prices[0]:>10} {prices[1]:>10} {prices[2]:>10}{marker}")

    # ============================================================
    # 4. Cross-validation with Reverse DCF
    # ============================================================
    print(f"\n{'=' * 70}")
    print(f"  CROSS-VALIDATION")
    print(f"{'=' * 70}")

    # What growth rate does current price imply?
    # Solve for rev_cagr such that DCF price = current price
    # Binary search
    for wacc_test in [0.090, 0.095, 0.100]:
        lo, hi = -0.05, 0.20
        for _ in range(50):
            mid = (lo + hi) / 2
            test_s = Scenario(
                name="implied", probability=0, rev_cagr=mid,
                opm_y1=0.165, opm_terminal=0.170,
                capex_pct=0.056, buyback_annual=1.5e9,
                wacc=wacc_test, terminal_g=0.025, share_reduction=0.015,
            )
            test_r = dcf_valuation(test_s)
            if test_r["price_per_share"] > CURRENT_PRICE:
                hi = mid
            else:
                lo = mid
        implied_cagr = (lo + hi) / 2
        print(f"  WACC={wacc_test:.1%}: Current price implies Rev CAGR = {implied_cagr:.1%} (OPM→17.0%)")

    # ============================================================
    # 5. Scenario Summary Table (for report embedding)
    # ============================================================
    print(f"\n{'=' * 70}")
    print(f"  SCENARIO SUMMARY TABLE (Copy to Ch15)")
    print(f"{'=' * 70}")
    print(f"  | 情景 | 概率 | WACC | Rev CAGR | OPM终态 | FCF Y5 | 价格 | 回报 |")
    print(f"  |------|:----:|:----:|:--------:|:-------:|:------:|:----:|:----:|")
    for r in results:
        print(f"  | {r['scenario'][:20]:20s} | {r['probability']:.0%} | {r['wacc']:.1%} | {r['rev_cagr']:.0%} | {r['opm_terminal']:.1%} | ${r['fcf_y5']/1e9:.2f}B | ${r['price_per_share']:.2f} | {r['upside']:+.1%} |")
    print(f"  | **概率加权** | 100% | — | — | — | — | **${pw_price:.2f}** | **{pw_upside:+.1%}** |")

    # ============================================================
    # 6. Pessimism Bias Check (EVO-RCL-001 + EVO-SBUX-003)
    # ============================================================
    bear_prob = sum(r["probability"] for r in results if r["upside"] < -0.10)
    bull_prob = sum(r["probability"] for r in results if r["upside"] > 0.10)
    print(f"\n{'=' * 70}")
    print(f"  PESSIMISM BIAS CHECK")
    print(f"{'=' * 70}")
    print(f"  Bearish scenarios (>10% downside): {bear_prob:.0%}")
    print(f"  Bullish scenarios (>10% upside): {bull_prob:.0%}")
    print(f"  Bear/Bull ratio: {bear_prob/bull_prob:.1f}x" if bull_prob > 0 else "  Bear/Bull ratio: N/A")
    if bear_prob > 0.40:
        print(f"  ⚠️ WARNING: Bear probability > 40% — trigger RT-1 calibration")
    else:
        print(f"  ✓ Bear probability within acceptable range")

    # ============================================================
    # 7. Output JSON for programmatic use
    # ============================================================
    output = {
        "model_version": "CMG_DCF_v1.0",
        "framework": "v18.0",
        "current_price": CURRENT_PRICE,
        "net_cash": NET_CASH,
        "shares": SHARES_DILUTED,
        "scenarios": [{
            "name": r["scenario"],
            "probability": r["probability"],
            "wacc": r["wacc"],
            "terminal_g": r["terminal_g"],
            "rev_cagr": r["rev_cagr"],
            "opm_terminal": r["opm_terminal"],
            "price": round(r["price_per_share"], 2),
            "upside": round(r["upside"], 4),
            "ev": round(r["enterprise_value"] / 1e9, 1),
            "fcf_y5": round(r["fcf_y5"] / 1e9, 2),
            "tv_pct": round(r["tv_pct"], 2),
            "implied_pe": round(r["implied_pe"], 1),
        } for r in results],
        "pw_price": round(pw_price, 2),
        "pw_upside": round(pw_upside, 4),
        "pw_ev": round(pw_ev / 1e9, 1),
        "rating_implied": rating,
        "sensitivity": [[{"wacc": c["wacc"], "g": c["g"], "price": round(c["price"], 2)} for c in row] for row in matrix],
    }

    with open("reports/CMG/data/cmg_dcf_output.json", "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"\n  ✓ JSON output saved to reports/CMG/data/cmg_dcf_output.json")


if __name__ == "__main__":
    main()
