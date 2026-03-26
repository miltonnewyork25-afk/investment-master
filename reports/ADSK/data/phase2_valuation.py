#!/usr/bin/env python3
"""ADSK Phase 2 — 三情景估值模型 + SOTP + 可比估值"""

import json

# ============================================================
# 基础数据
# ============================================================
PRICE = 235.42
SHARES = 213  # M (diluted)
MCAP = PRICE * SHARES  # ~$50.1B
NET_DEBT = -118  # $M (net cash)
EV = MCAP + NET_DEBT  # ~$50.0B

# FY2026 actuals
REV_FY26 = 7206  # $M
FCF_FY26 = 2409
SBC_FY26 = 788
GAAP_OPM_FY26 = 0.219  # reported
GAAP_OPM_EX_RESTRUCTURING = 0.249
NONGAAP_OPM_FY26 = 0.380
FCF_MARGIN_FY26 = 0.334
TAX_RATE = 0.20  # normalized FY2027+

# FY2027 guidance
REV_FY27_GUIDE = 8140  # midpoint
FCF_FY27_GUIDE = 2750

print("=" * 70)
print("ADSK PHASE 2 — MULTI-METHOD VALUATION")
print(f"Price: ${PRICE} | Shares: {SHARES}M | MCap: ${MCAP:.0f}M | EV: ${EV:.0f}M")
print("=" * 70)

# ============================================================
# 1. 三情景DCF (5年显式 + 终端价值)
# ============================================================
print("\n" + "─" * 70)
print("1. THREE-SCENARIO DCF (5-Year Explicit + Terminal)")
print("─" * 70)

scenarios = {
    "Bull": {
        "rev_cagr": 0.14,  # AI + BIM mandate upside
        "terminal_fcf_margin": 0.37,  # SBC converges to ~7%
        "terminal_growth": 0.035,
        "wacc": 0.095,
        "probability": 0.25,
        "rationale": "AI加速+BIM mandate全球扩展+SBC收敛至7%"
    },
    "Base": {
        "rev_cagr": 0.12,  # guidance-aligned
        "terminal_fcf_margin": 0.34,  # current level
        "terminal_growth": 0.03,
        "wacc": 0.10,
        "probability": 0.50,
        "rationale": "Guidance兑现+OPM稳步扩张+SBC/Rev~9%"
    },
    "Bear": {
        "rev_cagr": 0.08,  # competition erodes growth
        "terminal_fcf_margin": 0.28,  # SBC stays elevated
        "terminal_growth": 0.025,
        "wacc": 0.11,
        "probability": 0.25,
        "rationale": "MFG份额流失+AI蚕食AutoCAD+定价权触顶+SBC>10%"
    }
}

results = {}
for name, s in scenarios.items():
    # FY2027-FY2031 projections
    rev = REV_FY26
    pv_fcf_sum = 0
    yearly = []

    for yr in range(1, 6):
        rev = rev * (1 + s["rev_cagr"])
        # FCF margin ramps linearly to terminal
        margin = FCF_MARGIN_FY26 + (s["terminal_fcf_margin"] - FCF_MARGIN_FY26) * yr / 5
        fcf = rev * margin
        pv = fcf / (1 + s["wacc"]) ** yr
        pv_fcf_sum += pv
        yearly.append({"year": f"FY{2027+yr-1}", "rev": rev, "margin": margin, "fcf": fcf, "pv": pv})

    # Terminal value
    terminal_fcf = yearly[-1]["fcf"] * (1 + s["terminal_growth"])
    tv = terminal_fcf / (s["wacc"] - s["terminal_growth"])
    pv_tv = tv / (1 + s["wacc"]) ** 5

    enterprise_value = pv_fcf_sum + pv_tv
    equity_value = enterprise_value - NET_DEBT
    per_share = equity_value / SHARES
    upside = (per_share - PRICE) / PRICE * 100

    results[name] = {
        "ev": enterprise_value,
        "equity": equity_value,
        "per_share": per_share,
        "upside": upside,
        "pv_explicit": pv_fcf_sum,
        "pv_terminal": pv_tv,
        "tv_pct": pv_tv / enterprise_value * 100,
        "yearly": yearly,
        **s
    }

    print(f"\n{'='*50}")
    print(f"  {name} Case ({s['probability']*100:.0f}% prob): {s['rationale']}")
    print(f"  Rev CAGR: {s['rev_cagr']*100:.1f}% | Terminal Margin: {s['terminal_fcf_margin']*100:.1f}%")
    print(f"  WACC: {s['wacc']*100:.1f}% | Terminal g: {s['terminal_growth']*100:.1f}%")
    print(f"{'='*50}")
    print(f"  {'Year':<8} {'Revenue':>10} {'FCF Margin':>12} {'FCF':>10} {'PV(FCF)':>10}")
    for y in yearly:
        print(f"  {y['year']:<8} ${y['rev']:>8,.0f}M {y['margin']:>11.1%} ${y['fcf']:>8,.0f}M ${y['pv']:>8,.0f}M")
    print(f"  {'─'*52}")
    print(f"  PV(Explicit):  ${pv_fcf_sum:>10,.0f}M")
    print(f"  PV(Terminal):  ${pv_tv:>10,.0f}M  ({pv_tv/enterprise_value*100:.1f}% of EV)")
    print(f"  Enterprise:    ${enterprise_value:>10,.0f}M")
    print(f"  Per Share:     ${per_share:>10,.2f}")
    print(f"  Upside:        {upside:>10.1f}%")

# Probability-weighted
pw_value = sum(results[n]["per_share"] * results[n]["probability"] for n in results)
pw_upside = (pw_value - PRICE) / PRICE * 100

print(f"\n{'='*70}")
print(f"PROBABILITY-WEIGHTED VALUE: ${pw_value:.2f}/share ({pw_upside:+.1f}%)")
print(f"{'='*70}")
for n, r in results.items():
    print(f"  {n:6s}: ${r['per_share']:>8.2f} × {r['probability']*100:.0f}% = ${r['per_share']*r['probability']:>8.2f}")

# ============================================================
# 2. Owner Economics DCF (FCF - SBC after tax)
# ============================================================
print("\n" + "─" * 70)
print("2. OWNER ECONOMICS DCF (FCF - SBC×(1-t))")
print("─" * 70)

owner_results = {}
for name, s in scenarios.items():
    rev = REV_FY26
    pv_owner_sum = 0

    # SBC/Rev assumption: Bull→7%, Base→9%, Bear→11%
    sbc_rates = {"Bull": 0.07, "Base": 0.09, "Bear": 0.11}
    sbc_rate = sbc_rates[name]

    for yr in range(1, 6):
        rev = rev * (1 + s["rev_cagr"])
        margin = FCF_MARGIN_FY26 + (s["terminal_fcf_margin"] - FCF_MARGIN_FY26) * yr / 5
        fcf = rev * margin
        sbc = rev * sbc_rate
        owner_fcf = fcf - sbc * (1 - TAX_RATE)
        pv = owner_fcf / (1 + s["wacc"]) ** yr
        pv_owner_sum += pv

    # Terminal (owner basis)
    terminal_rev = rev * (1 + s["terminal_growth"])
    terminal_fcf = terminal_rev * s["terminal_fcf_margin"]
    terminal_sbc = terminal_rev * sbc_rate
    terminal_owner = terminal_fcf - terminal_sbc * (1 - TAX_RATE)
    tv_owner = terminal_owner / (s["wacc"] - s["terminal_growth"])
    pv_tv_owner = tv_owner / (1 + s["wacc"]) ** 5

    owner_ev = pv_owner_sum + pv_tv_owner
    owner_per_share = (owner_ev - NET_DEBT) / SHARES
    owner_upside = (owner_per_share - PRICE) / PRICE * 100

    owner_results[name] = {
        "per_share": owner_per_share,
        "upside": owner_upside,
        "sbc_rate": sbc_rate
    }

    print(f"  {name:6s}: SBC/Rev={sbc_rate*100:.0f}% → ${owner_per_share:.2f}/share ({owner_upside:+.1f}%)")

pw_owner = sum(owner_results[n]["per_share"] * scenarios[n]["probability"] for n in scenarios)
pw_owner_upside = (pw_owner - PRICE) / PRICE * 100
print(f"  PW Owner: ${pw_owner:.2f}/share ({pw_owner_upside:+.1f}%)")

# ============================================================
# 3. SOTP (Sum-of-the-Parts)
# ============================================================
print("\n" + "─" * 70)
print("3. SOTP (SUM-OF-THE-PARTS)")
print("─" * 70)

# FY2027E revenue estimates by segment
sotp = {
    "AECO": {"rev_fy27": 4200, "growth": 0.17, "ev_rev_mult": 8.0, "rationale": "BIM mandate+#1→premium"},
    "AutoCAD/LT": {"rev_fy27": 1950, "growth": 0.09, "ev_rev_mult": 7.0, "rationale": "Cash cow, mature"},
    "MFG": {"rev_fy27": 1600, "growth": 0.16, "ev_rev_mult": 6.5, "rationale": "Competitive→discount"},
    "M&E": {"rev_fy27": 350, "growth": 0.05, "ev_rev_mult": 5.0, "rationale": "Low growth, AI option"},
    "Other": {"rev_fy27": 140, "growth": 0.12, "ev_rev_mult": 4.0, "rationale": "Services/misc"},
}

# Comparable multiples reference
print(f"\n  Comparable EV/Revenue references:")
print(f"    Procore (PCOR): 8.0x (construction SaaS, high growth)")
print(f"    Bentley (BSY):  8.8x (infrastructure, premium SBC)")
print(f"    PTC:            6.8x (MFG CAD/PLM)")
print(f"    Trimble (TRMB): 5.5x (mixed)")
print(f"    ADSK overall:   7.1x (FY2026)")

total_sotp_ev = 0
print(f"\n  {'Segment':<15} {'Rev FY27E':>10} {'Growth':>8} {'EV/Rev':>8} {'Value':>10} {'Rationale'}")
print(f"  {'─'*70}")
for seg, d in sotp.items():
    value = d["rev_fy27"] * d["ev_rev_mult"]
    total_sotp_ev += value
    print(f"  {seg:<15} ${d['rev_fy27']:>8,}M {d['growth']:>7.0%} {d['ev_rev_mult']:>7.1f}x ${value:>8,}M  {d['rationale']}")

print(f"  {'─'*70}")
print(f"  {'TOTAL EV':<15} {'':>10} {'':>8} {'':>8} ${total_sotp_ev:>8,}M")

# Discount for conglomerate/SBC
conglomerate_discount = 0.10  # 10% conglomerate discount
sbc_discount = SBC_FY26 * (1 - TAX_RATE) / 0.10  # capitalize SBC at 10x
print(f"\n  Conglomerate discount (10%):  -${total_sotp_ev * conglomerate_discount:,.0f}M")
print(f"  Capitalized SBC drag:         -${sbc_discount:,.0f}M")

adjusted_ev = total_sotp_ev * (1 - conglomerate_discount) - sbc_discount
sotp_equity = adjusted_ev - NET_DEBT
sotp_per_share = sotp_equity / SHARES
sotp_upside = (sotp_per_share - PRICE) / PRICE * 100

print(f"\n  Adjusted EV:     ${adjusted_ev:,.0f}M")
print(f"  Equity Value:    ${sotp_equity:,.0f}M")
print(f"  Per Share:       ${sotp_per_share:.2f}")
print(f"  Upside:          {sotp_upside:+.1f}%")

# ============================================================
# 4. Comparable Company Valuation
# ============================================================
print("\n" + "─" * 70)
print("4. COMPARABLE COMPANY VALUATION")
print("─" * 70)

# FY2027E ADSK: Non-GAAP EPS ~$12.42, FCF ~$2.75B
NONGAAP_EPS_FY27E = 12.42
FCF_FY27E = 2750

comps = {
    "PTC": {"fwd_pe": 18.5, "ev_fcf": 22, "growth": 12, "opm": 44},
    "Bentley(BSY)": {"fwd_pe": 35, "ev_fcf": 30, "growth": 11, "opm": 29},
    "Procore(PCOR)": {"fwd_pe": 55, "ev_fcf": 40, "growth": 15, "opm": 14},
    "DDOG": {"fwd_pe": 49, "ev_fcf": 42, "growth": 22, "opm": 25},
    "NOW": {"fwd_pe": 35, "ev_fcf": 32, "growth": 20, "opm": 30},
}

print(f"\n  {'Company':<16} {'Fwd PE':>8} {'EV/FCF':>8} {'Growth':>8} {'Non-GAAP OPM':>14}")
print(f"  {'─'*58}")
for c, d in comps.items():
    print(f"  {c:<16} {d['fwd_pe']:>7.1f}x {d['ev_fcf']:>7.0f}x {d['growth']:>7.0f}% {d['opm']:>13.0f}%")
print(f"  {'─'*58}")
print(f"  {'ADSK':<16} {'19.2x':>8} {'22x':>8} {'13%':>8} {'38%':>14}")

# Apply peer median multiples to ADSK
median_fwd_pe = 35  # median of comps
median_ev_fcf = 32

# PEG-adjusted: ADSK growth 13% vs peer median 15%
peg_adjustment = 13 / 15  # 0.867
adjusted_pe = median_fwd_pe * peg_adjustment
comp_value_pe = adjusted_pe * NONGAAP_EPS_FY27E
comp_value_fcf = (median_ev_fcf * FCF_FY27E - NET_DEBT * 1000) / (SHARES * 1000) * 1000  # adjust

print(f"\n  Peer median Fwd PE: {median_fwd_pe:.0f}x → PEG-adjusted: {adjusted_pe:.1f}x")
print(f"  → ADSK at PEG-adjusted PE: ${comp_value_pe:.2f}/share ({(comp_value_pe-PRICE)/PRICE*100:+.1f}%)")
print(f"  → ADSK at 22x Fwd PE (PTC+discount): ${22*NONGAAP_EPS_FY27E:.2f}/share ({(22*NONGAAP_EPS_FY27E-PRICE)/PRICE*100:+.1f}%)")
print(f"  → ADSK at 25x Fwd PE (SaaS mid-range): ${25*NONGAAP_EPS_FY27E:.2f}/share ({(25*NONGAAP_EPS_FY27E-PRICE)/PRICE*100:+.1f}%)")

# ============================================================
# 5. LOAD-BEARING WALL FRAGILITY TABLE
# ============================================================
print("\n" + "─" * 70)
print("5. LOAD-BEARING WALL FRAGILITY TABLE")
print("─" * 70)

walls = [
    {"wall": "5Y Rev CAGR", "implied": "10.9%", "ref": "Guidance 12.5%, Hist 10-12%",
     "fragility": "LOW", "if_collapse": "-15%", "reason": "Implied below guidance"},
    {"wall": "Terminal FCF Margin", "implied": "35%", "ref": "Current 33.4%, FY27 33.8%",
     "fragility": "LOW", "if_collapse": "-20%", "reason": "Already near target"},
    {"wall": "SBC/Rev Convergence", "implied": "<9% by FY2030", "ref": "Current 10.9%, trend -0.5pp/yr",
     "fragility": "MEDIUM", "if_collapse": "-25%", "reason": "RSU vesting cycles uncertain"},
    {"wall": "WACC/Risk Premium", "implied": "10%", "ref": "Risk-free 4.3%+ERP 5.5%",
     "fragility": "LOW", "if_collapse": "-12%", "reason": "Standard range"},
    {"wall": "Terminal Growth", "implied": "3.0%", "ref": "GDP 2.5%, Inflation 2-3%",
     "fragility": "LOW", "if_collapse": "-10%", "reason": "Conservative"},
    {"wall": "AECO Dominance", "implied": "50%+ Rev, +15% CAGR", "ref": "Revit 63.5%, BIM mandate 20+ countries",
     "fragility": "LOW", "if_collapse": "-30%", "reason": "Mandate=structural, hard to dislodge"},
    {"wall": "MFG Growth", "implied": "+12-16% sustained", "ref": "Fusion vs PTC/Siemens, 19% of Rev",
     "fragility": "HIGH", "if_collapse": "-8%", "reason": "Direct competition, no moat"},
    {"wall": "Mgmt Execution", "implied": "No repeat of SEC issues", "ref": "2024 SEC investigation closed",
     "fragility": "MEDIUM", "if_collapse": "-20%", "reason": "New CFO, but track record thin"},
]

print(f"\n  {'Wall':<25} {'Implied':>18} {'Fragility':>10} {'If Collapse':>12}")
print(f"  {'─'*68}")
for w in walls:
    print(f"  {w['wall']:<25} {w['implied']:>18} {w['fragility']:>10} {w['if_collapse']:>12}")

# ============================================================
# 6. CAPITAL ALLOCATION SCORECARD (B6)
# ============================================================
print("\n" + "─" * 70)
print("6. CAPITAL ALLOCATION SCORECARD (B6)")
print("─" * 70)

capalloc = {
    "Share Repurchases (5Y)": {"amount": "$5,229M", "score": "Consistent, ~$1B/yr avg", "grade": "B+"},
    "M&A (5Y)": {"amount": "$2,056M", "score": "Innovyze+Payapps, GW/Assets 34%", "grade": "C+"},
    "Dividends": {"amount": "$0", "score": "No dividend, tech standard", "grade": "N/A"},
    "SBC Dilution": {"amount": "~2.5%/yr (gross)", "score": "Buybacks offset, net dilution ~0%", "grade": "B"},
    "CapEx": {"amount": "$43M (0.6% Rev)", "score": "Asset-light, typical SaaS", "grade": "A"},
    "ROIC": {"amount": "18.7%", "score": "Above WACC 10%, good but not elite", "grade": "B+"},
}

for k, v in capalloc.items():
    print(f"  {k:<25} {v['amount']:>15}  {v['grade']:>4}  {v['score']}")

# B6 Score
b6_score = 3.5  # out of 5
print(f"\n  B6 Capital Allocation Score: {b6_score}/5")
print(f"  Rationale: Consistent buybacks offset SBC dilution (B+), but M&A track record")
print(f"  is mixed (Innovyze unclear ROIC, SEC issues around FCF manipulation). New CFO")
print(f"  and $0 M&A in FY2026 suggest discipline improvement. Grade up from C+ to B- trend.")

# ============================================================
# 7. B5 PROFIT ELASTICITY
# ============================================================
print("\n" + "─" * 70)
print("7. B5 PROFIT ELASTICITY (10-Year OPM Trend)")
print("─" * 70)

opm_history = {
    "FY2017": -3.0, "FY2018": -15.0, "FY2019": -6.0, "FY2020": 6.0,
    "FY2021": 10.0, "FY2022": 14.1, "FY2023": 19.8, "FY2024": 20.5,
    "FY2025": 22.1, "FY2026": 21.9
}

print(f"  GAAP OPM trajectory:")
for fy, opm in opm_history.items():
    bar = "█" * max(0, int(opm / 2)) if opm > 0 else "▒" * int(abs(opm) / 2)
    print(f"    {fy}: {opm:>6.1f}% {'█' * max(0, int(opm))}")

expansion = opm_history["FY2026"] - opm_history["FY2017"]
print(f"\n  10Y OPM expansion: {expansion:+.1f}pp ({opm_history['FY2017']:.1f}% → {opm_history['FY2026']:.1f}%)")
print(f"  Non-GAAP OPM FY2026: 38.0% (16pp gap = SBC 10.9% + Restructuring 3.0% + Amort 1.9%)")
print(f"  B5 Score: 5/5 (expansion >500bps = maximum)")

# ============================================================
# SUMMARY
# ============================================================
print("\n" + "=" * 70)
print("VALUATION SUMMARY")
print("=" * 70)

summary = {
    "DCF PW (Standard)": (pw_value, pw_upside),
    "DCF PW (Owner)": (pw_owner, pw_owner_upside),
    "SOTP (adj)": (sotp_per_share, sotp_upside),
    "Comp (PEG-adj PE)": (comp_value_pe, (comp_value_pe-PRICE)/PRICE*100),
    "Comp (22x PE, PTC-parity)": (22*NONGAAP_EPS_FY27E, (22*NONGAAP_EPS_FY27E-PRICE)/PRICE*100),
    "Comp (25x PE, SaaS mid)": (25*NONGAAP_EPS_FY27E, (25*NONGAAP_EPS_FY27E-PRICE)/PRICE*100),
}

directions = []
print(f"\n  {'Method':<30} {'Value/Share':>12} {'Upside':>10}")
print(f"  {'─'*55}")
for method, (val, upside) in summary.items():
    direction = "↑" if upside > 10 else ("↓" if upside < -10 else "→")
    directions.append(1 if upside > 0 else -1)
    print(f"  {method:<30} ${val:>10.2f} {upside:>+9.1f}% {direction}")

bullish_pct = sum(1 for d in directions if d > 0) / len(directions) * 100
print(f"\n  Direction consensus: {bullish_pct:.0f}% methods suggest upside")
print(f"  Median value: ${sorted(v[0] for v in summary.values())[len(summary)//2]:.2f}")
print(f"  Range: ${min(v[0] for v in summary.values()):.2f} — ${max(v[0] for v in summary.values()):.2f}")
