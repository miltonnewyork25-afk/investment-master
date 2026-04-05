#!/usr/bin/env python3
"""
LITE (Lumentum Holdings) — DCF + Scenario Valuation Model
Phase 0 估值模型 | 2026-04-05
Fiscal Year ends June

数据来源: FMP MCP (income/cashflow/balance, annual + quarterly)
"""

import json
import math

# ===== 基础数据 (FMP MCP verified) =====
TICKER = "LITE"
CURRENT_PRICE = 826.88  # 2026-04-02
SHARES_BASIC = 71.1e6   # FQ2'26
SHARES_DILUTED = 87.8e6 # FQ2'26 (convertible notes dilution)

# 年度收入 (FMP, fiscal year ending June)
REVENUE_HISTORY = {
    "FY2022": 1712.6e6,  # Note: FMP FY2021=FY2022 duplicate, using FY2022 only
    "FY2023": 1767.0e6,
    "FY2024": 1359.2e6,  # Trough year
    "FY2025": 1645.0e6,  # Recovery
}

# 季度���入 (FMP, showing recovery trajectory)
QUARTERLY_REVENUE = {
    "FQ4_2024": 308.3e6,  # Jun'24 - Trough
    "FQ1_2025": 336.9e6,  # Sep'24
    "FQ2_2025": 402.2e6,  # Dec'24
    "FQ3_2025": 425.2e6,  # Mar'25
    "FQ4_2025": 480.7e6,  # Jun'25
    "FQ1_2026": 533.8e6,  # Sep'25
    "FQ2_2026": 665.5e6,  # Dec'25
}

# Analyst estimates (FMP)
ESTIMATES = {
    "FY2026E": {"revenue": 2909.8e6, "eps": 7.70},   # 16 analysts
    "FY2027E": {"revenue": 4904.5e6, "eps": 15.24},   # 16/12 analysts
    "FY2028E": {"revenue": 6623.6e6, "eps": 19.95},   # 12/5 analysts
    "FY2029E": {"revenue": 4212.5e6, "eps": 10.86},   # 8/2 analysts (DECLINE)
}

# Gross margins (quarterly, FMP)
GROSS_MARGINS_Q = {
    "FQ4_2024": 0.166,
    "FQ1_2025": 0.231,
    "FQ2_2025": 0.248,
    "FQ3_2025": 0.288,
    "FQ4_2025": 0.333,
    "FQ1_2026": 0.340,
    "FQ2_2026": 0.361,
}

# Cash flow (FMP annual)
CASHFLOW = {
    "FY2022": {"ocf": 459.3e6, "capex": -91.2e6, "fcf": 368.1e6, "sbc": 103.1e6},
    "FY2023": {"ocf": 179.8e6, "capex": -128.5e6, "fcf": 51.3e6, "sbc": 148.4e6},
    "FY2024": {"ocf": 24.7e6, "capex": -137.0e6, "fcf": -111.3e6, "sbc": 128.8e6},
    "FY2025": {"ocf": 126.3e6, "capex": -231.0e6, "fcf": -104.7e6, "sbc": 177.2e6},
}

# Balance sheet (FQ2'26, Dec'25)
BALANCE_SHEET = {
    "cash_and_st_investments": 1155.3e6,
    "total_debt": 3345.4e6,
    "net_debt": 2687.7e6,  # FMP: 2687.7M but verify: 3345.4 - 657.7 = 2687.7 ✓
    "goodwill_intangibles": 1457.6e6,
    "total_equity": 846.6e6,
    "total_assets": 4805.3e6,
}

# ===== Valuation Parameters =====
WACC = 0.10  # 10% - high beta (1.39) + high leverage
TERMINAL_GROWTH = 0.03  # 3% - cyclical industry
TAX_RATE = 0.15  # Effective tax rate (benefits from NOLs)

# ===== Helper Functions =====
def dcf_value(fcf_projections, wacc, terminal_growth, net_debt, shares):
    """Standard DCF with terminal value"""
    pv_fcf = 0
    for i, fcf in enumerate(fcf_projections, 1):
        pv_fcf += fcf / (1 + wacc) ** i

    # Terminal value using last year FCF
    terminal_fcf = fcf_projections[-1] * (1 + terminal_growth)
    terminal_value = terminal_fcf / (wacc - terminal_growth)
    pv_terminal = terminal_value / (1 + wacc) ** len(fcf_projections)

    enterprise_value = pv_fcf + pv_terminal
    equity_value = enterprise_value - net_debt
    per_share = equity_value / shares

    return {
        "pv_fcf": pv_fcf,
        "terminal_value": terminal_value,
        "pv_terminal": pv_terminal,
        "enterprise_value": enterprise_value,
        "equity_value": equity_value,
        "per_share": per_share,
        "terminal_pct": pv_terminal / enterprise_value * 100 if enterprise_value > 0 else 0,
    }


def reverse_dcf(current_price, shares, net_debt, wacc, terminal_growth, years=5):
    """What FCF growth does current price imply?"""
    market_cap = current_price * shares
    ev = market_cap + net_debt

    # Assume steady-state FCF in year 5
    # EV = PV(FCFs) + PV(Terminal)
    # Simplified: solve for terminal FCF that justifies EV
    # Terminal: FCF_terminal / (WACC - g) / (1+WACC)^5
    # Approximate: EV ≈ PV(Terminal) (terminal dominates at high growth)

    implied_terminal_fcf = ev * (wacc - terminal_growth) * (1 + wacc) ** years

    # What revenue/margin combo implies this FCF?
    # FY2025 FCF was -$105M, with heavy capex
    # Normalized FCF margin for optical companies: 15-20%
    implied_revenue_at_15pct_margin = implied_terminal_fcf / 0.15
    implied_revenue_at_20pct_margin = implied_terminal_fcf / 0.20

    return {
        "implied_terminal_fcf": implied_terminal_fcf,
        "implied_revenue_15pct_fcf_margin": implied_revenue_at_15pct_margin,
        "implied_revenue_20pct_fcf_margin": implied_revenue_at_20pct_margin,
    }


# ===== Scenario Analysis =====
print("=" * 70)
print(f"LITE (Lumentum Holdings) — Valuation Model")
print(f"Current Price: ${CURRENT_PRICE:.2f} | Date: 2026-04-05")
print(f"Shares: {SHARES_BASIC/1e6:.1f}M basic / {SHARES_DILUTED/1e6:.1f}M diluted")
print(f"Market Cap: ${CURRENT_PRICE * SHARES_BASIC / 1e9:.1f}B basic / ${CURRENT_PRICE * SHARES_DILUTED / 1e9:.1f}B diluted")
print(f"Net Debt: ${BALANCE_SHEET['net_debt']/1e9:.1f}B")
print(f"EV: ${(CURRENT_PRICE * SHARES_DILUTED + BALANCE_SHEET['net_debt']) / 1e9:.1f}B (diluted)")
print("=" * 70)

# --- Scenario 1: Bull Case (AI structural demand) ---
print("\n--- SCENARIO 1: BULL (AI Structural Demand) ---")
bull_assumptions = {
    "FY2026_rev": 2.91e9,   # consensus
    "FY2027_rev": 5.2e9,    # above consensus (AI acceleration)
    "FY2028_rev": 7.5e9,    # peak revenue, above consensus
    "FY2029_rev": 7.0e9,    # mild decline (not crash)
    "FY2030_rev": 7.5e9,    # recovery
    "fcf_margins": [0.05, 0.12, 0.18, 0.17, 0.18],  # expanding with scale
}
bull_fcfs = [rev * margin for rev, margin in zip(
    [bull_assumptions[f"FY{y}_rev"] for y in range(2026, 2031)],
    bull_assumptions["fcf_margins"]
)]
print(f"Revenue path: {' → '.join([f'${v/1e9:.1f}B' for v in [bull_assumptions[f'FY{y}_rev'] for y in range(2026, 2031)]])}")
print(f"FCF path: {' → '.join([f'${v/1e6:.0f}M' for v in bull_fcfs])}")
bull_result = dcf_value(bull_fcfs, WACC, TERMINAL_GROWTH, BALANCE_SHEET["net_debt"], SHARES_DILUTED)
print(f"Fair Value (diluted): ${bull_result['per_share']:.0f}/share")
print(f"Terminal % of EV: {bull_result['terminal_pct']:.0f}%")
print(f"Upside/Downside: {(bull_result['per_share']/CURRENT_PRICE - 1)*100:+.0f}%")

# --- Scenario 2: Base Case (Consensus path) ---
print("\n--- SCENARIO 2: BASE (Consensus) ---")
base_assumptions = {
    "FY2026_rev": 2.91e9,
    "FY2027_rev": 4.9e9,
    "FY2028_rev": 6.6e9,    # consensus peak
    "FY2029_rev": 4.2e9,    # consensus decline
    "FY2030_rev": 4.5e9,    # stabilize
    "fcf_margins": [0.04, 0.10, 0.15, 0.12, 0.13],
}
base_fcfs = [rev * margin for rev, margin in zip(
    [base_assumptions[f"FY{y}_rev"] for y in range(2026, 2031)],
    base_assumptions["fcf_margins"]
)]
print(f"Revenue path: {' → '.join([f'${v/1e9:.1f}B' for v in [base_assumptions[f'FY{y}_rev'] for y in range(2026, 2031)]])}")
print(f"FCF path: {' → '.join([f'${v/1e6:.0f}M' for v in base_fcfs])}")
base_result = dcf_value(base_fcfs, WACC, TERMINAL_GROWTH, BALANCE_SHEET["net_debt"], SHARES_DILUTED)
print(f"Fair Value (diluted): ${base_result['per_share']:.0f}/share")
print(f"Terminal % of EV: {base_result['terminal_pct']:.0f}%")
print(f"Upside/Downside: {(base_result['per_share']/CURRENT_PRICE - 1)*100:+.0f}%")

# --- Scenario 3: Bear Case (Cyclical bust) ---
print("\n--- SCENARIO 3: BEAR (Cyclical Bust / Overbuild) ---")
bear_assumptions = {
    "FY2026_rev": 2.7e9,    # below consensus
    "FY2027_rev": 3.8e9,    # significant miss
    "FY2028_rev": 3.5e9,    # peak lower
    "FY2029_rev": 2.5e9,    # sharp decline (overbuild)
    "FY2030_rev": 2.8e9,    # slow recovery
    "fcf_margins": [0.02, 0.06, 0.08, -0.02, 0.03],
}
bear_fcfs = [rev * margin for rev, margin in zip(
    [bear_assumptions[f"FY{y}_rev"] for y in range(2026, 2031)],
    bear_assumptions["fcf_margins"]
)]
print(f"Revenue path: {' → '.join([f'${v/1e9:.1f}B' for v in [bear_assumptions[f'FY{y}_rev'] for y in range(2026, 2031)]])}")
print(f"FCF path: {' → '.join([f'${v/1e6:.0f}M' for v in bear_fcfs])}")
bear_result = dcf_value(bear_fcfs, WACC, TERMINAL_GROWTH, BALANCE_SHEET["net_debt"], SHARES_DILUTED)
print(f"Fair Value (diluted): ${bear_result['per_share']:.0f}/share")
print(f"Terminal % of EV: {bear_result['terminal_pct']:.0f}%")
print(f"Upside/Downside: {(bear_result['per_share']/CURRENT_PRICE - 1)*100:+.0f}%")

# --- Reverse DCF ---
print("\n--- REVERSE DCF: What does $827 imply? ---")
for shares_label, shares in [("Basic", SHARES_BASIC), ("Diluted", SHARES_DILUTED)]:
    rev_dcf = reverse_dcf(CURRENT_PRICE, shares, BALANCE_SHEET["net_debt"], WACC, TERMINAL_GROWTH)
    print(f"\n{shares_label} shares ({shares/1e6:.1f}M):")
    print(f"  Implied terminal FCF (Year 5): ${rev_dcf['implied_terminal_fcf']/1e9:.1f}B")
    print(f"  Implied revenue @15% FCF margin: ${rev_dcf['implied_revenue_15pct_fcf_margin']/1e9:.1f}B")
    print(f"  Implied revenue @20% FCF margin: ${rev_dcf['implied_revenue_20pct_fcf_margin']/1e9:.1f}B")

# --- Probability-Weighted Fair Value ---
print("\n--- PROBABILITY-WEIGHTED FAIR VALUE ---")
prob_bull = 0.20
prob_base = 0.50
prob_bear = 0.30
pw_fv = (prob_bull * bull_result['per_share'] +
         prob_base * base_result['per_share'] +
         prob_bear * bear_result['per_share'])
print(f"Bull ({prob_bull:.0%}): ${bull_result['per_share']:.0f}")
print(f"Base ({prob_base:.0%}): ${base_result['per_share']:.0f}")
print(f"Bear ({prob_bear:.0%}): ${bear_result['per_share']:.0f}")
print(f"Probability-Weighted FV: ${pw_fv:.0f}")
print(f"Current Price: ${CURRENT_PRICE:.0f}")
print(f"Expected Return: {(pw_fv/CURRENT_PRICE - 1)*100:+.1f}%")

# --- Key Multiples at Current Price ---
print("\n--- CURRENT MULTIPLES ---")
ev_diluted = CURRENT_PRICE * SHARES_DILUTED + BALANCE_SHEET["net_debt"]
for fy, est in ESTIMATES.items():
    pe = CURRENT_PRICE / est["eps"] if est["eps"] > 0 else float('inf')
    ps = CURRENT_PRICE * SHARES_DILUTED / est["revenue"]
    ev_s = ev_diluted / est["revenue"]
    print(f"{fy}: PE={pe:.1f}x | P/S={ps:.1f}x | EV/S={ev_s:.1f}x | Rev=${est['revenue']/1e9:.1f}B | EPS=${est['eps']:.2f}")

# --- Sensitivity: WACC vs Terminal Growth ---
print("\n--- SENSITIVITY TABLE (Base Case, $/share) ---")
waccs = [0.08, 0.09, 0.10, 0.11, 0.12]
tgs = [0.02, 0.025, 0.03, 0.035, 0.04]
print(f"{'WACC →':>12}", end="")
for w in waccs:
    print(f"{'%.0f%%' % (w*100):>10}", end="")
print()
for tg in tgs:
    print(f"  TG={'%.1f%%' % (tg*100):>5}", end="  ")
    for w in waccs:
        r = dcf_value(base_fcfs, w, tg, BALANCE_SHEET["net_debt"], SHARES_DILUTED)
        print(f"${r['per_share']:>8.0f}", end="")
    print()

# --- Owner Economics ---
print("\n--- OWNER ECONOMICS (SBC-adjusted) ---")
for fy, cf in CASHFLOW.items():
    owner_fcf = cf["fcf"] - cf["sbc"]
    ocf_minus_sbc = cf["ocf"] - cf["sbc"]
    print(f"{fy}: OCF=${cf['ocf']/1e6:.0f}M | CapEx=${cf['capex']/1e6:.0f}M | FCF=${cf['fcf']/1e6:.0f}M | SBC=${cf['sbc']/1e6:.0f}M | Owner FCF=${owner_fcf/1e6:.0f}M")

# === Output JSON summary ===
summary = {
    "ticker": TICKER,
    "model_date": "2026-04-05",
    "current_price": CURRENT_PRICE,
    "shares_basic_M": SHARES_BASIC / 1e6,
    "shares_diluted_M": SHARES_DILUTED / 1e6,
    "market_cap_B": round(CURRENT_PRICE * SHARES_DILUTED / 1e9, 1),
    "ev_diluted_B": round(ev_diluted / 1e9, 1),
    "net_debt_B": round(BALANCE_SHEET["net_debt"] / 1e9, 1),
    "scenarios": {
        "bull": {
            "probability": prob_bull,
            "fair_value": round(bull_result["per_share"], 0),
            "terminal_pct": round(bull_result["terminal_pct"], 0),
            "key_assumption": "AI structural demand, peak revenue $7.5B, 18% FCF margin",
        },
        "base": {
            "probability": prob_base,
            "fair_value": round(base_result["per_share"], 0),
            "terminal_pct": round(base_result["terminal_pct"], 0),
            "key_assumption": "Consensus path, peak $6.6B then decline to $4.2B, 15% peak FCF margin",
        },
        "bear": {
            "probability": prob_bear,
            "fair_value": round(bear_result["per_share"], 0),
            "terminal_pct": round(bear_result["terminal_pct"], 0),
            "key_assumption": "Cyclical bust/overbuild, peak $3.5B, negative FCF in downturn",
        },
    },
    "probability_weighted_fv": round(pw_fv, 0),
    "expected_return_pct": round((pw_fv / CURRENT_PRICE - 1) * 100, 1),
    "wacc": WACC,
    "terminal_growth": TERMINAL_GROWTH,
}

with open("reports/LITE/data/valuation_summary.json", "w") as f:
    json.dump(summary, f, indent=2)
print(f"\n✅ Summary saved to reports/LITE/data/valuation_summary.json")
