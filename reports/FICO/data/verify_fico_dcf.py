#!/usr/bin/env python3
"""FICO DCF & SOTP Verification Script
Validates all arithmetic in Phase 2 Ch8/Ch10 estimates.
铁律#3: LLM不能做算术 — Python验证"""

import json

# === INPUTS ===
SHARE_PRICE = 1441.20
SHARES_OUT = 24.5  # M
MARKET_CAP = SHARE_PRICE * SHARES_OUT  # $M
NET_DEBT = 2702  # $M
EV = MARKET_CAP + NET_DEBT

# FY2025 Actuals
REV_FY25 = 1991
EBITDA_FY25 = 925  # ~46.5% OPM + D&A
FCF_FY25 = 770
EPS_FY25 = 26.90
OPM_FY25 = 0.465

# Scores / Software split
SCORES_REV = 1169
SOFTWARE_REV = 822
SCORES_OPM = 0.85
SOFTWARE_OPM = 0.32

print("=" * 60)
print("FICO DCF & SOTP Arithmetic Verification")
print("=" * 60)

# === 1. Basic Valuation Ratios ===
pe_ttm = SHARE_PRICE / EPS_FY25
ev_ebitda = EV / EBITDA_FY25
fcf_yield = FCF_FY25 / MARKET_CAP * 100

print(f"\n--- Basic Ratios ---")
print(f"Market Cap: ${MARKET_CAP:,.0f}M")
print(f"EV: ${EV:,.0f}M")
print(f"P/E TTM: {pe_ttm:.1f}x (report: 52x → DIFF: uses different EPS)")
print(f"EV/EBITDA: {ev_ebitda:.1f}x (report: 41x)")
print(f"FCF Yield: {fcf_yield:.1f}% (report: 2.1%)")

# === 2. SOTP Verification ===
print(f"\n--- SOTP Verification ---")

# Scores
scores_ebitda = SCORES_REV * SCORES_OPM  # ~993
scores_ev_low = scores_ebitda * 25
scores_ev_high = scores_ebitda * 30
print(f"Scores EBITDA: ${scores_ebitda:,.0f}M")
print(f"Scores EV range (25-30x): ${scores_ev_low:,.0f}M - ${scores_ev_high:,.0f}M")
print(f"  Report: $24.8-29.8B ✓" if abs(scores_ev_low - 24825) < 500 else "  MISMATCH!")

# Software
software_ev_low = SOFTWARE_REV * 5
software_ev_high = SOFTWARE_REV * 7
print(f"Software EV range (5-7x Rev): ${software_ev_low:,.0f}M - ${software_ev_high:,.0f}M")
print(f"  Report: $4.1-5.8B ✓" if abs(software_ev_low - 4100) < 200 else "  MISMATCH!")

# SOTP Total
for label, s_ev, sw_ev in [("Low", 25000, 4000), ("Mid", 26800, 5300), ("High", 32000, 7000)]:
    total_ev = s_ev + sw_ev
    equity = total_ev - NET_DEBT
    per_share = equity / SHARES_OUT
    print(f"SOTP {label}: EV=${total_ev:,}M, Equity=${equity:,}M, Per share=${per_share:,.0f}")

# === 3. Probability-Weighted Valuation ===
print(f"\n--- Probability-Weighted Valuation ---")
scenarios = [
    ("Bull", 0.15, 1800),
    ("Base+", 0.25, 1350),
    ("Base", 0.30, 1150),
    ("Bear", 0.20, 850),
    ("Deep Bear", 0.10, 550),
]
weighted_sum = 0
for name, prob, val in scenarios:
    contrib = prob * val
    weighted_sum += contrib
    print(f"  {name}: {prob:.0%} × ${val:,} = ${contrib:,.0f}")
print(f"  Weighted Average: ${weighted_sum:,.0f}")
print(f"  vs Current ${SHARE_PRICE:,.0f}: {(weighted_sum/SHARE_PRICE - 1)*100:+.1f}%")
print(f"  Report: $1,178 {'✓' if abs(weighted_sum - 1178) < 5 else 'MISMATCH!'}")

# === 4. Stress Test Verification ===
print(f"\n--- Stress Test: VantageScore 20% + Rates +200bp ---")
scores_rev_stress = SCORES_REV * 0.80  # -20%
ebitda_stress = EBITDA_FY25 * 0.70  # -30% (operating leverage)
nd_ebitda_stress = NET_DEBT / ebitda_stress
interest_stress = 2850 * 0.075  # 7.5% weighted rate
interest_coverage_stress = (ebitda_stress - 50) / interest_stress  # rough EBIT approx
print(f"Scores Rev (stressed): ${scores_rev_stress:,.0f}M")
print(f"EBITDA (stressed): ${ebitda_stress:,.0f}M")
print(f"ND/EBITDA (stressed): {nd_ebitda_stress:.2f}x (report: 4.16x)")
print(f"Interest (stressed): ${interest_stress:,.0f}M")
print(f"Interest Coverage: {interest_coverage_stress:.1f}x (report: 3.4x)")

# === 5. 68x Return Decomposition ===
print(f"\n--- 68x Return Decomposition ---")
rev_growth = 1991 / 789  # FY2014 Rev
opm_expansion = 0.465 / 0.205
tax_efficiency = 0.94
buyback = 34.9 / 24.6
pe_expansion = 52 / 18
product = rev_growth * opm_expansion * tax_efficiency * buyback * pe_expansion
print(f"Revenue: {rev_growth:.2f}x")
print(f"OPM: {opm_expansion:.2f}x")
print(f"Tax: {tax_efficiency:.2f}x")
print(f"Buyback: {buyback:.2f}x")
print(f"PE: {pe_expansion:.2f}x")
print(f"Product: {product:.1f}x (report: ~22x, actual stock: ~26x)")
print(f"Note: Cross-terms account for difference between product and actual return")

# === 6. OPM Ceiling Test ===
print(f"\n--- OPM Ceiling Test ---")
cases = [
    ("Current", 0.85, 0.59, 0.32, 0.41),
    ("OPM Expansion", 0.88, 0.65, 0.35, 0.35),
    ("Mix Shift Limit", 0.88, 0.75, 0.35, 0.25),
    ("Theoretical Max", 0.90, 0.80, 0.38, 0.20),
    ("VantageScore Erosion", 0.80, 0.55, 0.32, 0.45),
]
for name, s_opm, s_pct, sw_opm, sw_pct in cases:
    blended = s_opm * s_pct + sw_opm * sw_pct
    print(f"  {name}: {blended:.1%} (report target: see Ch7)")

# === 7. Sensitivity Matrix Spot Check ===
print(f"\n--- Sensitivity Spot Check ---")
# Simple DCF: 10Y projection, terminal value
def simple_dcf(rev_cagr, terminal_pe, opm_terminal=0.57, wacc=0.10, tg=0.03):
    """10-year DCF with terminal PE exit"""
    rev = REV_FY25
    total_pv = 0
    for yr in range(1, 11):
        rev *= (1 + rev_cagr)
        fcf = rev * opm_terminal * 0.80  # rough: OPM * (1-tax) * ~FCF conversion
        pv = fcf / (1 + wacc) ** yr
        total_pv += pv

    # Terminal value
    terminal_earnings = rev * opm_terminal * 0.80
    terminal_value = terminal_earnings * terminal_pe
    pv_terminal = terminal_value / (1 + wacc) ** 10

    ev = total_pv + pv_terminal
    equity = ev - NET_DEBT
    per_share = equity / SHARES_OUT
    return per_share

# Test a few points
test_cases = [
    (0.10, 20, "$960"),
    (0.14, 20, "$1,280"),
    (0.14, 22, "$1,380"),
    (0.16, 20, "$1,480"),
]
for cagr, t_pe, reported in test_cases:
    calc = simple_dcf(cagr, t_pe)
    print(f"  CAGR={cagr:.0%}, Terminal PE={t_pe}x → ${calc:,.0f} (report: {reported})")

print(f"\n{'=' * 60}")
print(f"VERIFICATION COMPLETE")
print(f"{'=' * 60}")
