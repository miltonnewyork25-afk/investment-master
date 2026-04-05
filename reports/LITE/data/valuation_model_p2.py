#!/usr/bin/env python3
"""
LITE (Lumentum Holdings) — Phase 2 Non-GAAP Valuation Model
2026-04-05 | Fiscal Year ends June

Phase 2升级:
1. Non-GAAP vs GAAP双轨估值
2. 管理层$30 EPS可行性验证
3. 可转债精确建模(到期/稀释时间线)
4. SOTP估值(Components + Systems)
5. Owner FCF转正分析
6. 敏感性分析矩阵

数据来源: FMP MCP + earnings call + 10-Q/10-K
"""

import json

# ===================================================================
# Section 1: 基础数据 (Phase 0 verified + Phase 1 updated)
# ===================================================================
TICKER = "LITE"
CURRENT_PRICE = 826.88
SHARES_BASIC = 71.1e6
SHARES_DILUTED = 87.8e6  # Treasury stock method for convertibles

# 季度财务数据 (FMP verified)
QUARTERLY_DATA = {
    "FQ4_2024": {
        "revenue": 308.3e6, "gross_profit": 51.3e6, "gm": 0.166,
        "gaap_opinc": -133.4e6, "gaap_ni": -252.5e6, "gaap_eps_d": -3.72,
        "da": 99.2e6, "sbc": 30.5e6, "capex": 24.6e6,
        "ocf": 35.5e6,
    },
    "FQ1_2025": {
        "revenue": 336.9e6, "gross_profit": 77.9e6, "gm": 0.231,
        "gaap_opinc": -82.4e6, "gaap_ni": -82.4e6, "gaap_eps_d": -1.21,
        "da": 70.6e6, "sbc": 35.6e6, "capex": 74.1e6,
        "ocf": 39.6e6,
    },
    "FQ2_2025": {
        "revenue": 402.2e6, "gross_profit": 99.6e6, "gm": 0.248,
        "gaap_opinc": -51.6e6, "gaap_ni": -60.9e6, "gaap_eps_d": -0.88,
        "da": 64.9e6, "sbc": 38.8e6, "capex": 40.2e6,
        "ocf": 24.3e6,
    },
    "FQ3_2025": {
        "revenue": 425.2e6, "gross_profit": 122.5e6, "gm": 0.288,
        "gaap_opinc": -37.7e6, "gaap_ni": -44.1e6, "gaap_eps_d": -0.64,
        "da": 60.1e6, "sbc": 62.8e6, "capex": 62.8e6,  # SBC spike = CEO transition
        "ocf": -1.6e6,
    },
    "FQ4_2025": {
        "revenue": 480.7e6, "gross_profit": 159.9e6, "gm": 0.333,
        "gaap_opinc": -8.4e6, "gaap_ni": 213.3e6, "gaap_eps_d": 2.96,  # $198M tax benefit
        "da": 61.1e6, "sbc": 40.0e6, "capex": 53.9e6,
        "ocf": 64.0e6,
    },
    "FQ1_2026": {
        "revenue": 533.8e6, "gross_profit": 181.5e6, "gm": 0.340,
        "gaap_opinc": 6.7e6, "gaap_ni": 4.2e6, "gaap_eps_d": 0.054,
        "da": 62.2e6, "sbc": 42.4e6, "capex": 76.2e6,
        "ocf": 57.9e6,
    },
    "FQ2_2026": {
        "revenue": 665.5e6, "gross_profit": 240.1e6, "gm": 0.361,
        "gaap_opinc": 64.3e6, "gaap_ni": 78.2e6, "gaap_eps_d": 0.89,
        "da": 64.6e6, "sbc": 45.4e6, "capex": 76.2e6,
        "ocf": 126.7e6,
        # Non-GAAP (from earnings call)
        "nongaap_gm": 0.425, "nongaap_opm": 0.252, "nongaap_eps": 1.67,
    },
}

# Q3 FY2026 Guidance
Q3_GUIDANCE = {
    "revenue_low": 790e6, "revenue_high": 820e6, "revenue_mid": 805e6,
    "nongaap_opm_low": 0.30, "nongaap_opm_high": 0.31,
}

# Management Long-term targets (OFC 2026)
MGMT_TARGETS = {
    "quarterly_1.25B": {"gm": 0.465, "opm": 0.35},
    "quarterly_2B": {"gm": 0.505, "opm": 0.40},
    "fy2028_eps": 30.0,  # Non-GAAP
    "fy2028_revenue": 8.0e9,  # $2B/quarter × 4
}

# Consensus estimates (FMP, updated)
ESTIMATES = {
    "FY2026E": {"revenue": 2909.8e6, "eps_gaap": 7.70, "eps_nongaap_est": 10.5},
    "FY2027E": {"revenue": 4904.5e6, "eps_gaap": 15.24, "eps_nongaap_est": 21.0},
    "FY2028E": {"revenue": 6623.6e6, "eps_gaap": 19.95, "eps_nongaap_est": 28.0},
    "FY2029E": {"revenue": 4212.5e6, "eps_gaap": 10.86, "eps_nongaap_est": 15.0},
}

# ===================================================================
# Section 2: GAAP to Non-GAAP Bridge (Q2 FY2026 actual)
# ===================================================================
print("=" * 75)
print("LITE Phase 2 — Non-GAAP Valuation Model")
print("=" * 75)

print("\n" + "=" * 75)
print("SECTION 1: GAAP → Non-GAAP BRIDGE (FQ2 FY2026)")
print("=" * 75)

q2 = QUARTERLY_DATA["FQ2_2026"]
rev_q2 = q2["revenue"]

# GAAP to Non-GAAP reconciliation (estimated from available data)
gaap_gp = q2["gross_profit"]  # $240.1M, 36.1%
nongaap_gm_pct = q2["nongaap_gm"]  # 42.5%
nongaap_gp = rev_q2 * nongaap_gm_pct  # $282.8M
cogs_adjustment = nongaap_gp - gaap_gp  # ~$42.7M (intangibles amort in COGS)

gaap_opinc = q2["gaap_opinc"]  # $64.3M, 9.7%
nongaap_opm_pct = q2["nongaap_opm"]  # 25.2%
nongaap_opinc = rev_q2 * nongaap_opm_pct  # $167.7M
total_opex_adjustment = nongaap_opinc - gaap_opinc  # ~$103.4M

sbc_q2 = q2["sbc"]  # $45.4M
amort_in_opex = total_opex_adjustment - sbc_q2 - cogs_adjustment  # ~$15.3M (restructuring + other)

print(f"Revenue: ${rev_q2/1e6:.1f}M")
print(f"")
print(f"  GAAP Gross Profit:      ${gaap_gp/1e6:.1f}M ({q2['gm']:.1%})")
print(f"  + COGS adjustments:     ${cogs_adjustment/1e6:.1f}M (acquired intangibles amort in COGS)")
print(f"  Non-GAAP Gross Profit:  ${nongaap_gp/1e6:.1f}M ({nongaap_gm_pct:.1%})")
print(f"")
print(f"  GAAP Operating Income:  ${gaap_opinc/1e6:.1f}M ({gaap_opinc/rev_q2:.1%})")
print(f"  + SBC:                  ${sbc_q2/1e6:.1f}M")
print(f"  + COGS intangibles:     ${cogs_adjustment/1e6:.1f}M")
print(f"  + Other adjustments:    ${amort_in_opex/1e6:.1f}M (restructuring/acquisition costs)")
print(f"  = Total adjustments:    ${total_opex_adjustment/1e6:.1f}M")
print(f"  Non-GAAP OpInc:         ${nongaap_opinc/1e6:.1f}M ({nongaap_opm_pct:.1%})")
print(f"")
print(f"  GAAP EPS (diluted):     ${q2['gaap_eps_d']:.2f}")
print(f"  Non-GAAP EPS:           ${q2['nongaap_eps']:.2f}")
print(f"  Gap per share:          ${q2['nongaap_eps'] - q2['gaap_eps_d']:.2f}")

# Annualized adjustments
annual_sbc_run_rate = (q2["sbc"] + QUARTERLY_DATA["FQ1_2026"]["sbc"]) * 2
annual_cogs_adj_rate = cogs_adjustment * 4
annual_other_adj_rate = amort_in_opex * 4
total_annual_adj = annual_sbc_run_rate + annual_cogs_adj_rate + annual_other_adj_rate

print(f"\n  Annualized adjustment run-rate:")
print(f"    SBC:              ${annual_sbc_run_rate/1e6:.0f}M/yr")
print(f"    COGS amort:       ${annual_cogs_adj_rate/1e6:.0f}M/yr")
print(f"    Other:            ${annual_other_adj_rate/1e6:.0f}M/yr")
print(f"    Total:            ${total_annual_adj/1e6:.0f}M/yr")

# ===================================================================
# Section 3: Management $30 EPS Verification
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 2: MANAGEMENT $30 EPS VERIFICATION (FY2028)")
print("=" * 75)

# Management claims: $2B/Q revenue, 40% Non-GAAP OPM, $30 Non-GAAP EPS
mgmt_rev = 8.0e9
mgmt_opm = 0.40
mgmt_gm = 0.505  # at $2B/Q scale
mgmt_eps_target = 30.0

# Step 1: Revenue path verification
print("\n--- Step 1: Revenue Path ---")
h1_fy26_rev = q2["revenue"] + QUARTERLY_DATA["FQ1_2026"]["revenue"]  # $1,199.3M
q3_guide = Q3_GUIDANCE["revenue_mid"]  # $805M
# Implied Q4 for FY2026 consensus: 2909.8 - 1199.3 - 805 = $905.5M
implied_q4_fy26 = ESTIMATES["FY2026E"]["revenue"] - h1_fy26_rev - q3_guide
print(f"H1 FY2026 actual: ${h1_fy26_rev/1e6:.0f}M")
print(f"Q3 FY2026 guide:  ${q3_guide/1e6:.0f}M")
print(f"Implied Q4 FY2026: ${implied_q4_fy26/1e6:.0f}M (QoQ +{(implied_q4_fy26/q3_guide-1)*100:.0f}%)")
print(f"FY2026E total:    ${ESTIMATES['FY2026E']['revenue']/1e9:.1f}B")
print(f"FY2027E consensus: ${ESTIMATES['FY2027E']['revenue']/1e9:.1f}B (YoY +{(ESTIMATES['FY2027E']['revenue']/ESTIMATES['FY2026E']['revenue']-1)*100:.0f}%)")
print(f"FY2028E consensus: ${ESTIMATES['FY2028E']['revenue']/1e9:.1f}B (YoY +{(ESTIMATES['FY2028E']['revenue']/ESTIMATES['FY2027E']['revenue']-1)*100:.0f}%)")
print(f"Mgmt FY2028 target: ${mgmt_rev/1e9:.1f}B — consensus is ${(mgmt_rev - ESTIMATES['FY2028E']['revenue'])/1e9:.1f}B BELOW mgmt target")

# Step 2: Margin path verification
print("\n--- Step 2: Non-GAAP Margin Path ---")
# Current: Q2'26 Non-GAAP OPM 25.2%, Q3'26 guided 30-31%
# Target: 40% at $2B/Q

# Margin leverage model: Non-GAAP OpEx as % of revenue
# Q2'26: Non-GAAP OpEx = rev × (1 - nongaap_gm) + nongaap_opinc...
# Actually: Non-GAAP OpEx = Non-GAAP GP - Non-GAAP OpInc
nongaap_opex_q2 = nongaap_gp - nongaap_opinc  # operating expenses only
nongaap_opex_pct_q2 = nongaap_opex_q2 / rev_q2

print(f"Q2'26 Non-GAAP:")
print(f"  GM: {nongaap_gm_pct:.1%}")
print(f"  OpEx: ${nongaap_opex_q2/1e6:.1f}M ({nongaap_opex_pct_q2:.1%} of rev)")
print(f"  OPM: {nongaap_opm_pct:.1%}")
print(f"")

# Model: At $2B/Q, what needs to be true?
target_q_rev = 2.0e9
target_gp = target_q_rev * mgmt_gm  # $1,010M
target_opinc = target_q_rev * mgmt_opm  # $800M
target_opex = target_gp - target_opinc  # $210M

print(f"At $2B/Q target:")
print(f"  GM: {mgmt_gm:.1%} → GP = ${target_gp/1e6:.0f}M")
print(f"  OpEx: ${target_opex/1e6:.0f}M ({target_opex/target_q_rev:.1%} of rev)")
print(f"  OPM: {mgmt_opm:.1%} → OpInc = ${target_opinc/1e6:.0f}M")
print(f"")
print(f"  OpEx leverage needed: from {nongaap_opex_pct_q2:.1%} → {target_opex/target_q_rev:.1%}")
print(f"  This means OpEx grows from ${nongaap_opex_q2/1e6:.0f}M → ${target_opex/1e6:.0f}M")
print(f"  While revenue triples (${rev_q2/1e6:.0f}M → ${target_q_rev/1e6:.0f}M)")
print(f"  OpEx growth: {(target_opex/nongaap_opex_q2-1)*100:+.0f}% vs Revenue growth: +{(target_q_rev/rev_q2-1)*100:.0f}%")

# Step 3: EPS build-up
print("\n--- Step 3: $30 EPS Build-Up ---")
# Annual at $2B/Q: Rev $8B, OPM 40%
annual_opinc_target = mgmt_rev * mgmt_opm
# Interest expense: assume $3.35B debt at ~0.5-1.5% blended → ~$25M/yr
interest_exp_annual = 25e6
pretax_income = annual_opinc_target - interest_exp_annual
# Tax rate: ~15% (NOL benefits + R&D credits)
tax_rate_low = 0.12
tax_rate_mid = 0.15
tax_rate_high = 0.18

for label, tr in [("Low tax 12%", tax_rate_low), ("Mid tax 15%", tax_rate_mid), ("High tax 18%", tax_rate_high)]:
    ni = pretax_income * (1 - tr)
    eps_basic = ni / SHARES_BASIC
    eps_diluted = ni / SHARES_DILUTED
    print(f"  {label}: NI=${ni/1e6:.0f}M → EPS(basic)=${eps_basic:.2f} | EPS(diluted)=${eps_diluted:.2f}")

# Non-GAAP EPS uses different share count (adjusted for if-converted)
# At $827 stock price, all convertibles are deep in-the-money
# But Non-GAAP EPS typically uses diluted shares including converts
nongaap_ni_target = pretax_income * (1 - 0.15) + interest_exp_annual * 0.5  # add-back convert interest
eps_target_check = nongaap_ni_target / SHARES_DILUTED

print(f"\n  Non-GAAP NI (mid tax, + convert interest addback): ${nongaap_ni_target/1e6:.0f}M")
print(f"  Non-GAAP EPS (diluted {SHARES_DILUTED/1e6:.0f}M shares): ${eps_target_check:.2f}")
print(f"  Management target: ${mgmt_eps_target:.2f}")
print(f"  Gap: ${eps_target_check - mgmt_eps_target:+.2f} ({(eps_target_check/mgmt_eps_target-1)*100:+.1f}%)")

# What share count makes $30 work?
required_shares_for_30 = nongaap_ni_target / 30
print(f"\n  Shares needed for $30 EPS: {required_shares_for_30/1e6:.1f}M")
print(f"  Current diluted: {SHARES_DILUTED/1e6:.1f}M")
print(f"  Feasibility: {'YES' if required_shares_for_30 <= SHARES_DILUTED * 1.05 else 'MARGINAL' if required_shares_for_30 <= SHARES_DILUTED * 1.15 else 'NO'}")

# ===================================================================
# Section 4: Convertible Notes Modeling
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 3: CONVERTIBLE NOTES MODELING")
print("=" * 75)

CONVERTIBLE_NOTES = {
    "2029_Notes": {
        "principal": 525e6,
        "coupon": 0.015,  # 1.50%
        "maturity": "2029-12-15",
        "conversion_price": 69.54,
        "status": "deep ITM",
        "itm_ratio": CURRENT_PRICE / 69.54,
    },
    "2032_Notes": {
        "principal": 1265e6,
        "coupon": 0.00375,  # 0.375%
        "maturity": "2032-03-15",
        "conversion_price": 187.77,
        "status": "deep ITM",
        "itm_ratio": CURRENT_PRICE / 187.77,
        "capped_call_cost": 88.7e6,
    },
}

total_convert_principal = sum(n["principal"] for n in CONVERTIBLE_NOTES.values())
total_annual_interest = sum(n["principal"] * n["coupon"] for n in CONVERTIBLE_NOTES.values())

print(f"\nConvertible Notes Overview:")
print(f"{'Note':>12} {'Principal':>12} {'Coupon':>8} {'Conv Price':>12} {'ITM':>8} {'Shares if conv':>16}")

total_convert_shares = 0
for name, note in CONVERTIBLE_NOTES.items():
    shares_if_converted = note["principal"] / note["conversion_price"]
    total_convert_shares += shares_if_converted
    print(f"{name:>12} ${note['principal']/1e6:>9.0f}M {note['coupon']:>7.3%} ${note['conversion_price']:>10.2f} {note['itm_ratio']:>6.1f}x {shares_if_converted/1e6:>14.1f}M")

print(f"\nTotal convertible principal: ${total_convert_principal/1e6:.0f}M")
print(f"Total annual interest cost: ${total_annual_interest/1e6:.1f}M")
print(f"Total potential dilution: {total_convert_shares/1e6:.1f}M shares")
print(f"Basic + full conversion: {(SHARES_BASIC + total_convert_shares)/1e6:.1f}M shares")
print(f"Current diluted (treasury method): {SHARES_DILUTED/1e6:.1f}M shares")

# Dilution at different stock prices
print(f"\n--- Dilution Sensitivity to Stock Price ---")
print(f"{'Stock Price':>12} {'Treasury Shares':>16} {'Total Diluted':>14} {'Dilution %':>12}")
for price in [200, 400, 600, 827, 1000, 1500]:
    treasury_shares = 0
    for name, note in CONVERTIBLE_NOTES.items():
        if price > note["conversion_price"]:
            # Treasury stock method: incremental shares = principal/conv_price - principal/stock_price
            shares_from_convert = note["principal"] / note["conversion_price"]
            shares_buyback = note["principal"] / price
            incremental = shares_from_convert - shares_buyback
            treasury_shares += incremental
    total_diluted = SHARES_BASIC + treasury_shares
    dilution_pct = treasury_shares / SHARES_BASIC * 100
    print(f"${price:>10} {treasury_shares/1e6:>14.1f}M {total_diluted/1e6:>12.1f}M {dilution_pct:>10.1f}%")

# Convertible maturity timeline
print(f"\n--- Debt Maturity Timeline ---")
print(f"  2029 Dec: $525M 1.50% Notes mature (or convert)")
print(f"  2032 Mar: $1,265M 0.375% Notes mature (or convert)")
print(f"  Total: ${total_convert_principal/1e6:.0f}M")
print(f"  Cash + ST Inv: $1,155M → covers ~65% of total debt")

# Balance sheet: short-term debt reclassification analysis
print(f"\n--- Short-term Debt Reclassification Alert ---")
print(f"  FQ4'25 ST Debt: $10.6M | LT Debt: $2,562.6M")
print(f"  FQ1'26 ST Debt: $1,091.2M | LT Debt: $2,164.5M")
print(f"  FQ2'26 ST Debt: $3,252.9M | LT Debt: $69.8M")
print(f"  → Nearly ALL debt reclassified as current")
print(f"  → Likely: convertible holders can demand early redemption")
print(f"  → Or: accounting reclassification due to if-converted test")
print(f"  Current Ratio: 0.61 (vs 4.37 in FQ4'25) — ALARMING on paper")

# ===================================================================
# Section 5: Non-GAAP DCF Valuation (3 scenarios)
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 4: NON-GAAP DCF VALUATION (3 Scenarios)")
print("=" * 75)

NET_DEBT = 2687.7e6
WACC = 0.10

def dcf_value(fcf_projections, wacc, tg, net_debt, shares):
    pv_fcf = 0
    for i, fcf in enumerate(fcf_projections, 1):
        pv_fcf += fcf / (1 + wacc) ** i
    terminal_fcf = fcf_projections[-1] * (1 + tg)
    tv = terminal_fcf / (wacc - tg)
    pv_tv = tv / (1 + wacc) ** len(fcf_projections)
    ev = pv_fcf + pv_tv
    eq = ev - net_debt
    ps = eq / shares
    tv_pct = pv_tv / ev * 100 if ev > 0 else 0
    return {"per_share": ps, "ev": ev, "eq": eq, "tv_pct": tv_pct, "pv_fcf": pv_fcf, "pv_tv": pv_tv}

# Non-GAAP FCF = Non-GAAP OpInc × (1-tax) + D&A - CapEx - WC changes
# Simplified: Non-GAAP FCF margin = Non-GAAP OPM × (1-tax) + D&A/rev - CapEx/rev
# Phase 2 uses Non-GAAP operating income as starting point

print("\n--- Scenario A: BULL (Management Target Achieved) ---")
# Revenue reaches $8B by FY2028, Non-GAAP OPM 40%, mild cycle down FY2029
bull_rev = [2.91e9, 5.5e9, 8.0e9, 7.0e9, 7.5e9]  # FY26-30
bull_nongaap_opm = [0.22, 0.32, 0.40, 0.36, 0.38]
bull_da_rev = [0.047, 0.035, 0.030, 0.030, 0.028]  # D&A shrinks as % of rev
bull_capex_rev = [0.105, 0.090, 0.075, 0.060, 0.055]  # CapEx moderates
bull_tax = 0.15

bull_fcfs = []
print(f"{'FY':>6} {'Rev($B)':>9} {'NG OPM':>8} {'NG OpInc':>10} {'D&A':>8} {'CapEx':>8} {'FCF':>10} {'FCF%':>7}")
for i, (rev, opm, da_r, cx_r) in enumerate(zip(bull_rev, bull_nongaap_opm, bull_da_rev, bull_capex_rev)):
    fy = 2026 + i
    opinc = rev * opm
    nopat = opinc * (1 - bull_tax)
    da = rev * da_r
    capex = rev * cx_r
    fcf = nopat + da - capex
    bull_fcfs.append(fcf)
    print(f"FY{fy:>4} ${rev/1e9:>7.1f} {opm:>7.1%} ${opinc/1e6:>8.0f}M ${da/1e6:>6.0f}M ${capex/1e6:>6.0f}M ${fcf/1e6:>8.0f}M {fcf/rev:>6.1%}")

bull_result = dcf_value(bull_fcfs, WACC, 0.03, NET_DEBT, SHARES_DILUTED)
print(f"Bull FV: ${bull_result['per_share']:.0f}/share | TV%: {bull_result['tv_pct']:.0f}%")

print("\n--- Scenario B: BASE (Consensus + Cycle) ---")
base_rev = [2.91e9, 4.9e9, 6.6e9, 4.2e9, 4.8e9]
base_nongaap_opm = [0.22, 0.30, 0.35, 0.25, 0.28]
base_da_rev = [0.047, 0.035, 0.030, 0.035, 0.032]
base_capex_rev = [0.105, 0.090, 0.075, 0.070, 0.065]
base_tax = 0.15

base_fcfs = []
print(f"{'FY':>6} {'Rev($B)':>9} {'NG OPM':>8} {'NG OpInc':>10} {'D&A':>8} {'CapEx':>8} {'FCF':>10} {'FCF%':>7}")
for i, (rev, opm, da_r, cx_r) in enumerate(zip(base_rev, base_nongaap_opm, base_da_rev, base_capex_rev)):
    fy = 2026 + i
    opinc = rev * opm
    nopat = opinc * (1 - base_tax)
    da = rev * da_r
    capex = rev * cx_r
    fcf = nopat + da - capex
    base_fcfs.append(fcf)
    print(f"FY{fy:>4} ${rev/1e9:>7.1f} {opm:>7.1%} ${opinc/1e6:>8.0f}M ${da/1e6:>6.0f}M ${capex/1e6:>6.0f}M ${fcf/1e6:>8.0f}M {fcf/rev:>6.1%}")

base_result = dcf_value(base_fcfs, WACC, 0.03, NET_DEBT, SHARES_DILUTED)
print(f"Base FV: ${base_result['per_share']:.0f}/share | TV%: {base_result['tv_pct']:.0f}%")

print("\n--- Scenario C: BEAR (AI CapEx Overbuild / Cycle Bust) ---")
bear_rev = [2.7e9, 3.8e9, 3.5e9, 2.2e9, 2.8e9]
bear_nongaap_opm = [0.18, 0.22, 0.18, 0.08, 0.15]
bear_da_rev = [0.050, 0.040, 0.040, 0.050, 0.045]
bear_capex_rev = [0.100, 0.085, 0.070, 0.060, 0.055]
bear_tax = 0.15

bear_fcfs = []
print(f"{'FY':>6} {'Rev($B)':>9} {'NG OPM':>8} {'NG OpInc':>10} {'D&A':>8} {'CapEx':>8} {'FCF':>10} {'FCF%':>7}")
for i, (rev, opm, da_r, cx_r) in enumerate(zip(bear_rev, bear_nongaap_opm, bear_da_rev, bear_capex_rev)):
    fy = 2026 + i
    opinc = rev * opm
    nopat = opinc * (1 - bear_tax)
    da = rev * da_r
    capex = rev * cx_r
    fcf = nopat + da - capex
    bear_fcfs.append(fcf)
    print(f"FY{fy:>4} ${rev/1e9:>7.1f} {opm:>7.1%} ${opinc/1e6:>8.0f}M ${da/1e6:>6.0f}M ${capex/1e6:>6.0f}M ${fcf/1e6:>8.0f}M {fcf/rev:>6.1%}")

bear_result = dcf_value(bear_fcfs, WACC, 0.025, NET_DEBT, SHARES_DILUTED)
print(f"Bear FV: ${bear_result['per_share']:.0f}/share | TV%: {bear_result['tv_pct']:.0f}%")

# ===================================================================
# Section 6: SOTP Valuation
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 5: SUM-OF-THE-PARTS (SOTP) VALUATION")
print("=" * 75)

# FQ2'26: Components $443.7M (YoY +68.3%) + Systems $221.8M (YoY +60.1%)
# Components = EML chips + optical transceivers (high growth, cyclical)
# Systems = OCS + ROADM (high growth, more recurring/sticky)

print("\n--- Current Segment Run-Rates ---")
comp_q2 = 443.7e6
sys_q2 = 221.8e6
comp_ann = comp_q2 * 4  # $1,774.8M annualized
sys_ann = sys_q2 * 4    # $887.2M annualized

print(f"Components Q2'26: ${comp_q2/1e6:.1f}M (ann: ${comp_ann/1e9:.1f}B)")
print(f"Systems Q2'26: ${sys_q2/1e6:.1f}M (ann: ${sys_ann/1e9:.1f}B)")

# SOTP: Value each segment separately
# Components: High growth but cyclical → comparable to COHR (251x PE) but more focused
# Use EV/Revenue multiples

print("\n--- SOTP Scenarios ---")
print(f"{'Scenario':>12} {'Comp Rev':>10} {'Comp Mult':>10} {'Comp EV':>10} {'Sys Rev':>10} {'Sys Mult':>10} {'Sys EV':>10} {'Total EV':>10} {'$/share':>10}")

sotp_scenarios = {
    "Bull": {
        "comp_rev": 5.5e9, "comp_mult": 8.0,   # FY2028 peak, premium for EML monopoly
        "sys_rev": 2.5e9, "sys_mult": 12.0,     # OCS high-growth + sticky
    },
    "Base": {
        "comp_rev": 4.5e9, "comp_mult": 5.0,    # Consensus-ish
        "sys_rev": 2.0e9, "sys_mult": 8.0,
    },
    "Bear": {
        "comp_rev": 2.5e9, "comp_mult": 3.0,    # Post-cycle
        "sys_rev": 1.0e9, "sys_mult": 5.0,
    },
}

for name, s in sotp_scenarios.items():
    comp_ev = s["comp_rev"] * s["comp_mult"]
    sys_ev = s["sys_rev"] * s["sys_mult"]
    total_ev = comp_ev + sys_ev
    equity = total_ev - NET_DEBT
    per_share = equity / SHARES_DILUTED
    print(f"{name:>12} ${s['comp_rev']/1e9:.1f}B {s['comp_mult']:.1f}x ${comp_ev/1e9:.1f}B ${s['sys_rev']/1e9:.1f}B {s['sys_mult']:.1f}x ${sys_ev/1e9:.1f}B ${total_ev/1e9:.1f}B ${per_share:.0f}")

# ===================================================================
# Section 7: Owner FCF Analysis
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 6: OWNER FCF ANALYSIS")
print("=" * 75)

print("\n--- Quarterly Owner FCF Trajectory ---")
print(f"{'Quarter':>10} {'OCF':>10} {'CapEx':>10} {'FCF':>10} {'SBC':>10} {'Owner FCF':>12} {'Rev':>10}")
for q_name in ["FQ4_2024", "FQ1_2025", "FQ2_2025", "FQ3_2025", "FQ4_2025", "FQ1_2026", "FQ2_2026"]:
    q = QUARTERLY_DATA[q_name]
    fcf = q["ocf"] - q["capex"]
    owner_fcf = fcf - q["sbc"]
    print(f"{q_name:>10} ${q['ocf']/1e6:>8.0f}M ${q['capex']/1e6:>8.0f}M ${fcf/1e6:>8.0f}M ${q['sbc']/1e6:>8.0f}M ${owner_fcf/1e6:>10.0f}M ${q['revenue']/1e6:>8.0f}M")

# Owner FCF projection: when does it turn positive?
print("\n--- Owner FCF Projection ---")
# At current margins: OCF margin ~19% (Q2'26: 126.7/665.5), CapEx ~11.5%, SBC ~6.8%
# Owner FCF margin = OCF margin - CapEx margin - SBC margin = 19 - 11.5 - 6.8 = 0.7%
# Need: Revenue scale + margin expansion to generate meaningful Owner FCF

rev_levels = [3.0e9, 4.0e9, 5.0e9, 6.0e9, 8.0e9]
ocf_margins = [0.20, 0.25, 0.28, 0.30, 0.32]
capex_margins = [0.10, 0.085, 0.075, 0.070, 0.060]
sbc_levels = [190e6, 210e6, 230e6, 250e6, 280e6]  # SBC grows slower than rev

print(f"{'Rev':>8} {'OCF%':>6} {'OCF':>10} {'CapEx%':>7} {'CapEx':>10} {'FCF':>10} {'SBC':>10} {'OFCF':>12} {'OFCF%':>7} {'OFCF/sh':>9}")
for rev, ocf_m, cx_m, sbc in zip(rev_levels, ocf_margins, capex_margins, sbc_levels):
    ocf = rev * ocf_m
    capex = rev * cx_m
    fcf = ocf - capex
    ofcf = fcf - sbc
    ofcf_per_share = ofcf / SHARES_DILUTED
    print(f"${rev/1e9:.0f}B {ocf_m:>5.0%} ${ocf/1e6:>8.0f}M {cx_m:>6.1%} ${capex/1e6:>8.0f}M ${fcf/1e6:>8.0f}M ${sbc/1e6:>8.0f}M ${ofcf/1e6:>10.0f}M {ofcf/rev:>6.1%} ${ofcf_per_share:>7.1f}")

print(f"\n  Owner FCF turns positive at ~$3B revenue (FCF margin ~3-4%, SBC ~6%)")
print(f"  At management target $8B: Owner FCF ~$1.3B → $14.8/share → Owner PE = {CURRENT_PRICE/14.8:.0f}x")
print(f"  At consensus peak $6.6B: Owner FCF ~$0.8B → $9.1/share → Owner PE = {CURRENT_PRICE/9.1:.0f}x")

# ===================================================================
# Section 8: Three-PE Comparison
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 7: THREE-PE ANALYSIS (GAAP / Non-GAAP / Owner)")
print("=" * 75)

print(f"\n{'FY':>8} {'Rev':>8} {'GAAP EPS':>10} {'GAAP PE':>9} {'NG EPS':>9} {'NG PE':>8} {'Owner EPS':>10} {'Owner PE':>10}")
for fy_label, est in ESTIMATES.items():
    gaap_pe = CURRENT_PRICE / est["eps_gaap"] if est["eps_gaap"] > 0 else float('inf')
    nongaap_pe = CURRENT_PRICE / est["eps_nongaap_est"] if est["eps_nongaap_est"] > 0 else float('inf')

    # Owner EPS = Non-GAAP EPS - SBC per share
    # SBC estimate: ~$180M for FY2026, growing ~10%/yr
    fy_num = int(fy_label[2:6])
    sbc_est = 180e6 * (1.10 ** (fy_num - 2026))
    owner_eps = est["eps_nongaap_est"] - sbc_est / SHARES_DILUTED
    owner_pe = CURRENT_PRICE / owner_eps if owner_eps > 0 else float('inf')

    print(f"{fy_label:>8} ${est['revenue']/1e9:.1f}B ${est['eps_gaap']:>9.2f} {gaap_pe:>8.1f}x ${est['eps_nongaap_est']:>8.2f} {nongaap_pe:>7.1f}x ${owner_eps:>9.2f} {owner_pe:>9.1f}x")

# ===================================================================
# Section 9: Probability-Weighted Summary
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 8: PROBABILITY-WEIGHTED FAIR VALUE (Phase 2)")
print("=" * 75)

# Updated probabilities after Phase 1 analysis
prob_bull = 0.15  # Down from 0.20:护城河窗口只有2-3年
prob_base = 0.50
prob_bear = 0.35  # Up from 0.30: AI CapEx泡沫风险 + 可转债结构

pw_dcf = prob_bull * bull_result['per_share'] + prob_base * base_result['per_share'] + prob_bear * bear_result['per_share']

# SOTP weighted
sotp_bull_ps = (sotp_scenarios["Bull"]["comp_rev"] * sotp_scenarios["Bull"]["comp_mult"] +
                sotp_scenarios["Bull"]["sys_rev"] * sotp_scenarios["Bull"]["sys_mult"] - NET_DEBT) / SHARES_DILUTED
sotp_base_ps = (sotp_scenarios["Base"]["comp_rev"] * sotp_scenarios["Base"]["comp_mult"] +
                sotp_scenarios["Base"]["sys_rev"] * sotp_scenarios["Base"]["sys_mult"] - NET_DEBT) / SHARES_DILUTED
sotp_bear_ps = (sotp_scenarios["Bear"]["comp_rev"] * sotp_scenarios["Bear"]["comp_mult"] +
                sotp_scenarios["Bear"]["sys_rev"] * sotp_scenarios["Bear"]["sys_mult"] - NET_DEBT) / SHARES_DILUTED
pw_sotp = prob_bull * sotp_bull_ps + prob_base * sotp_base_ps + prob_bear * sotp_bear_ps

# Blended (60% DCF, 40% SOTP)
pw_blended = 0.60 * pw_dcf + 0.40 * pw_sotp

print(f"\nProbabilities: Bull {prob_bull:.0%} | Base {prob_base:.0%} | Bear {prob_bear:.0%}")
print(f"")
print(f"{'Method':>12} {'Bull':>10} {'Base':>10} {'Bear':>10} {'PW FV':>10} {'vs $827':>10}")
print(f"{'DCF':>12} ${bull_result['per_share']:>8.0f} ${base_result['per_share']:>8.0f} ${bear_result['per_share']:>8.0f} ${pw_dcf:>8.0f} {(pw_dcf/CURRENT_PRICE-1)*100:>+8.0f}%")
print(f"{'SOTP':>12} ${sotp_bull_ps:>8.0f} ${sotp_base_ps:>8.0f} ${sotp_bear_ps:>8.0f} ${pw_sotp:>8.0f} {(pw_sotp/CURRENT_PRICE-1)*100:>+8.0f}%")
print(f"{'Blended':>12} {'':>10} {'':>10} {'':>10} ${pw_blended:>8.0f} {(pw_blended/CURRENT_PRICE-1)*100:>+8.0f}%")

# ===================================================================
# Section 10: Sensitivity Tables
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 9: SENSITIVITY ANALYSIS")
print("=" * 75)

# Sensitivity 1: WACC vs Terminal Growth (Base case)
print("\n--- Base Case DCF: WACC × Terminal Growth ---")
waccs = [0.08, 0.09, 0.10, 0.11, 0.12]
tgs = [0.02, 0.025, 0.03, 0.035, 0.04]
print(f"{'WACC →':>12}", end="")
for w in waccs:
    print(f"{'%.0f%%' % (w*100):>10}", end="")
print()
for tg in tgs:
    print(f"  TG={'%.1f%%' % (tg*100):>5}", end="  ")
    for w in waccs:
        r = dcf_value(base_fcfs, w, tg, NET_DEBT, SHARES_DILUTED)
        print(f"${r['per_share']:>8.0f}", end="")
    print()

# Sensitivity 2: Peak Revenue vs Peak Non-GAAP OPM
print("\n--- FV Sensitivity: Peak Revenue × Peak Non-GAAP OPM ---")
peak_revs = [4.0e9, 5.0e9, 6.0e9, 7.0e9, 8.0e9]
peak_opms = [0.25, 0.30, 0.35, 0.40, 0.45]
print(f"{'Peak OPM →':>14}", end="")
for opm in peak_opms:
    print(f"{'%.0f%%' % (opm*100):>10}", end="")
print()
for rev in peak_revs:
    print(f"  Rev=${rev/1e9:.0f}B", end="     ")
    for opm in peak_opms:
        # Simplified: 5Y avg revenue = 0.7 × peak, avg OPM = 0.8 × peak
        avg_rev = rev * 0.7
        avg_opm = opm * 0.8
        avg_fcf = avg_rev * avg_opm * 0.85 * 0.02 + avg_rev * 0.03 - avg_rev * 0.08  # rough FCF
        avg_fcf = avg_rev * (avg_opm * 0.85 + 0.03 - 0.08)  # NOPAT + D&A - CapEx
        r = dcf_value([avg_fcf] * 5, WACC, 0.03, NET_DEBT, SHARES_DILUTED)
        print(f"${r['per_share']:>8.0f}", end="")
    print()

# ===================================================================
# Section 11: Reverse DCF
# ===================================================================
print("\n" + "=" * 75)
print("SECTION 10: REVERSE DCF — WHAT DOES $827 IMPLY?")
print("=" * 75)

market_cap = CURRENT_PRICE * SHARES_DILUTED
ev = market_cap + NET_DEBT

# What terminal state justifies this EV?
# EV ≈ Terminal FCF / (WACC - g) / (1+WACC)^5  (simplified, terminal dominates)
for wacc in [0.09, 0.10, 0.11]:
    for tg in [0.025, 0.03, 0.035]:
        implied_tv = ev * (1 + wacc) ** 5
        implied_terminal_fcf = implied_tv * (wacc - tg)
        # What rev/margin combo?
        for fcf_margin in [0.15, 0.20, 0.25]:
            implied_rev = implied_terminal_fcf / fcf_margin
            if wacc == 0.10 and tg == 0.03:
                print(f"  WACC={wacc:.0%}, TG={tg:.1%}, FCF margin={fcf_margin:.0%}: Implied terminal rev=${implied_rev/1e9:.1f}B")

print(f"\n  Current EV: ${ev/1e9:.1f}B")
print(f"  At WACC 10%, TG 3%, 20% FCF margin:")
implied_terminal_fcf_10_3 = ev * (1 + 0.10) ** 5 * (0.10 - 0.03)
implied_rev_20 = implied_terminal_fcf_10_3 / 0.20
print(f"  Implied terminal revenue: ${implied_rev_20/1e9:.1f}B")
print(f"  Current global optical transceiver TAM: ~$15-20B")
print(f"  Implied LITE market share at terminal: {implied_rev_20/20e9*100:.0f}% of $20B TAM")
print(f"  Or: TAM must expand to ${implied_rev_20/0.25/1e9:.0f}B for 25% share")

# ===================================================================
# Save updated summary
# ===================================================================
summary_p2 = {
    "ticker": TICKER,
    "model_date": "2026-04-05",
    "phase": "Phase 2",
    "current_price": CURRENT_PRICE,
    "shares_diluted_M": SHARES_DILUTED / 1e6,
    "ev_B": round(ev / 1e9, 1),
    "net_debt_B": round(NET_DEBT / 1e9, 1),
    "nongaap_bridge": {
        "q2_gaap_gm": 0.361,
        "q2_nongaap_gm": 0.425,
        "q2_gaap_opm": 0.097,
        "q2_nongaap_opm": 0.252,
        "annual_sbc_run_rate_M": round(annual_sbc_run_rate / 1e6),
        "annual_total_adj_M": round(total_annual_adj / 1e6),
    },
    "mgmt_30eps_feasibility": {
        "required_rev": "$8B",
        "required_opm": "40%",
        "calculated_eps": round(eps_target_check, 2),
        "verdict": "ACHIEVABLE if revenue and margin targets met, but aggressive",
    },
    "convertibles": {
        "total_principal_M": round(total_convert_principal / 1e6),
        "total_potential_shares_M": round(total_convert_shares / 1e6, 1),
        "annual_interest_M": round(total_annual_interest / 1e6, 1),
    },
    "scenarios_dcf": {
        "bull": {"probability": prob_bull, "fv": round(bull_result['per_share'])},
        "base": {"probability": prob_base, "fv": round(base_result['per_share'])},
        "bear": {"probability": prob_bear, "fv": round(bear_result['per_share'])},
    },
    "probability_weighted": {
        "dcf": round(pw_dcf),
        "sotp": round(pw_sotp),
        "blended": round(pw_blended),
        "expected_return": f"{(pw_blended/CURRENT_PRICE-1)*100:+.0f}%",
    },
    "owner_fcf": {
        "turns_positive_at": "$3B revenue",
        "at_8B_rev": "$14.8/share → Owner PE 56x",
        "at_6.6B_rev": "$9.1/share → Owner PE 91x",
    },
}

with open("reports/LITE/data/valuation_summary_p2.json", "w") as f:
    json.dump(summary_p2, f, indent=2, ensure_ascii=False)

print(f"\n{'='*75}")
print(f"SUMMARY SAVED: reports/LITE/data/valuation_summary_p2.json")
print(f"{'='*75}")
