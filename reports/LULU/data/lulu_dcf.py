#!/usr/bin/env python3
"""LULU DCF + Multi-Method Valuation — Phase 2 Python Verification"""
import json

# ========== INPUT PARAMETERS ==========
# FMP verified data
revenue_fy25 = 11103  # $M
eps_fy25 = 13.26
shares_fy25 = 119.1  # M diluted
fcf_fy25 = 960  # $M (OCF 1602 - CapEx 615 - adjustments)
ocf_fy25 = 1602
capex_fy25 = 615
opm_fy25 = 0.199
gm_fy25 = 0.566
net_margin_fy25 = 0.1422
tax_rate = 0.295
debt = 1800  # $M
cash = 1810
price = 165.57
market_cap = price * shares_fy25  # ~$19.7B

# Guidance & Estimates
eps_fy26e = 12.20  # midpoint of $12.10-12.30
eps_fy28e = 13.25  # analyst consensus
eps_fy29e = 14.50
eps_fy30e = 15.56
rev_fy28e = 12003  # analyst consensus

# WACC components
rf = 0.043  # 10Y UST
beta = 1.01
erp = 0.055
wacc = rf + beta * erp  # ~9.86%, use 9.5% considering low leverage
wacc = 0.095

print("=" * 70)
print("LULU DCF + Multi-Method Valuation")
print("=" * 70)

# ========== METHOD 1: REVERSE DCF ==========
print("\n--- Method 1: Reverse DCF ---")
# Solve for implied growth rate that makes NPV = market cap
# Simple perpetuity: MktCap = FCF / (WACC - g)
# g = WACC - FCF/MktCap
g_implied = wacc - (fcf_fy25 / (market_cap))
print(f"Market Cap: ${market_cap:.0f}M")
print(f"FCF FY25: ${fcf_fy25}M")
print(f"WACC: {wacc:.1%}")
print(f"Implied perpetual growth: {g_implied:.2%}")
print(f"vs Historical 5Y revenue CAGR: 15.4%")
print(f"vs FY2026 guided: 2-4%")

# More sophisticated 2-stage Reverse DCF
print("\n  2-Stage Reverse DCF (10yr explicit + terminal):")
terminal_pe = 15  # conservative
# What growth rate makes NPV = market_cap?
for test_g in [0.00, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10]:
    npv = 0
    fcf = fcf_fy25
    for yr in range(1, 11):
        fcf = fcf * (1 + test_g)
        npv += fcf / (1 + wacc) ** yr
    # Terminal value at year 10
    terminal_eps = eps_fy25 * (1 + test_g) ** 10
    terminal_value = terminal_eps * shares_fy25 * terminal_pe / (1 + wacc) ** 10
    total = npv + terminal_value
    ev = total + debt - cash
    implied_price = total / shares_fy25
    print(f"  g={test_g:.0%}: NPV(FCF)=${npv:.0f}M + TV=${terminal_value:.0f}M = ${total:.0f}M → ${implied_price:.0f}/share")

# ========== METHOD 2: DCF (3 Scenarios) ==========
print("\n--- Method 2: 3-Scenario DCF ---")

scenarios = {
    "Bear (g=1%, OPM→17%)": {"rev_g": [0.02, 0.01, 0.01, 0.01, 0.01], "opm_target": 0.17, "terminal_g": 0.015, "terminal_pe": 12},
    "Base (g=4%, OPM→20%)": {"rev_g": [0.03, 0.04, 0.05, 0.05, 0.04], "opm_target": 0.20, "terminal_g": 0.03, "terminal_pe": 18},
    "Bull (g=7%, OPM→22%)": {"rev_g": [0.04, 0.06, 0.08, 0.08, 0.07], "opm_target": 0.22, "terminal_g": 0.04, "terminal_pe": 22},
}

dcf_results = {}
for name, params in scenarios.items():
    rev = revenue_fy25
    opm = opm_fy25
    opm_step = (params["opm_target"] - opm) / 5
    total_npv = 0
    
    for yr in range(5):
        rev = rev * (1 + params["rev_g"][yr])
        opm = opm + opm_step
        nopat = rev * opm * (1 - tax_rate)
        # FCF = NOPAT + D&A - CapEx - WC changes (simplified: FCF ≈ NOPAT * 0.85)
        fcf_yr = nopat * 0.85
        total_npv += fcf_yr / (1 + wacc) ** (yr + 1)
    
    # Terminal value
    terminal_fcf = fcf_yr * (1 + params["terminal_g"])
    tv = terminal_fcf / (wacc - params["terminal_g"])
    tv_pv = tv / (1 + wacc) ** 5
    
    equity_value = total_npv + tv_pv + cash - debt
    per_share = equity_value / shares_fy25
    dcf_results[name] = per_share
    
    print(f"\n  {name}:")
    print(f"    Y5 Revenue: ${rev:.0f}M, OPM: {opm:.1%}")
    print(f"    NPV(FCF 5yr): ${total_npv:.0f}M")
    print(f"    Terminal Value PV: ${tv_pv:.0f}M")
    print(f"    Equity Value: ${equity_value:.0f}M")
    print(f"    Per Share: ${per_share:.0f}")
    print(f"    vs Current ${price}: {(per_share/price - 1)*100:+.1f}%")

# ========== METHOD 3: PE BAND VALUATION ==========
print("\n--- Method 3: PE Band Valuation ---")
pe_scenarios = {
    "Bear PE 10x": (10, eps_fy28e),
    "Low PE 14x": (14, eps_fy28e),
    "Base PE 18x": (18, eps_fy28e),
    "Recovery PE 22x": (22, eps_fy28e),
    "Bull PE 26x": (26, eps_fy28e),
}
for name, (pe, eps) in pe_scenarios.items():
    target = pe * eps
    print(f"  {name}: {pe}x × ${eps} = ${target:.0f} ({(target/price-1)*100:+.1f}%)")

# ========== METHOD 4: EV/EBITDA ==========
print("\n--- Method 4: EV/EBITDA ---")
ebitda_fy25 = 2735  # $M from FMP
ev_current = market_cap + debt - cash
print(f"Current EV/EBITDA: {ev_current/ebitda_fy25:.1f}x")

for mult in [8, 10, 12, 15, 18]:
    ev_target = ebitda_fy25 * mult
    eq_target = ev_target - debt + cash
    ps_target = eq_target / shares_fy25
    print(f"  EV/EBITDA {mult}x: EV=${ev_target:.0f}M → Equity=${eq_target:.0f}M → ${ps_target:.0f}/share ({(ps_target/price-1)*100:+.1f}%)")

# ========== METHOD 5: SOTP ==========
print("\n--- Method 5: Sum-of-Parts ---")
# Americas: $8.1B rev, OPM ~22-24% (segment), declining
americas_ebit = 8100 * 0.22  # $1,782M segment
americas_ev = americas_ebit * 12  # low multiple for declining
print(f"  Americas: EBIT ${americas_ebit:.0f}M × 12x = ${americas_ev:.0f}M")

# China: $1.7B rev, OPM ~37% (segment), +20%
china_ebit = 1700 * 0.37  # $629M
china_ev = china_ebit * 25  # growth premium
print(f"  China: EBIT ${china_ebit:.0f}M × 25x = ${china_ev:.0f}M")

# Rest of World: $1.3B rev, OPM ~24% (segment), +10%
row_ebit = 1300 * 0.24  # $312M
row_ev = row_ebit * 18  # moderate growth
print(f"  RoW: EBIT ${row_ebit:.0f}M × 18x = ${row_ev:.0f}M")

total_sotp_ev = americas_ev + china_ev + row_ev
sotp_equity = total_sotp_ev - debt + cash
sotp_ps = sotp_equity / shares_fy25
print(f"  Total EV: ${total_sotp_ev:.0f}M")
print(f"  Equity: ${sotp_equity:.0f}M → ${sotp_ps:.0f}/share ({(sotp_ps/price-1)*100:+.1f}%)")

# ========== METHOD 6: PROBABILITY-WEIGHTED EV ==========
print("\n--- Method 6: Probability-Weighted Expected Value ---")
scenarios_pw = [
    ("A: Value Trap (brand dead)", 0.15, 105),  # PE 8x × $13
    ("B: Low Growth Normal (g=2%)", 0.25, 185),  # PE 14x × $13.25
    ("C: Cyclical Recovery (g=5-8%)", 0.35, 252),  # PE 19x × $13.25
    ("D: Full Revival (g=10%+)", 0.15, 345),  # PE 23x × $15
    ("E: Activist Catalyst + China", 0.10, 400),  # PE 25x × $16
]

pw_ev = 0
print(f"  {'Scenario':<40} {'Prob':>5} {'Price':>7} {'Contribution':>12}")
print(f"  {'-'*40} {'-----':>5} {'-------':>7} {'------------':>12}")
for name, prob, target_price in scenarios_pw:
    contribution = prob * target_price
    pw_ev += contribution
    print(f"  {name:<40} {prob:>5.0%} ${target_price:>6.0f} ${contribution:>11.1f}")

print(f"\n  Probability-Weighted EV: ${pw_ev:.0f}/share")
print(f"  vs Current ${price}: {(pw_ev/price-1)*100:+.1f}%")
print(f"  Upside/Downside: +{(pw_ev-price):.0f} / {(105-price):.0f}")

# ========== SENSITIVITY MATRIX ==========
print("\n--- Sensitivity: WACC × Terminal Growth ---")
print(f"  {'WACC↓ / g→':>12}", end="")
for g in [0.01, 0.02, 0.03, 0.04, 0.05]:
    print(f" {g:>7.0%}", end="")
print()

for w in [0.085, 0.090, 0.095, 0.100, 0.105]:
    print(f"  {w:>12.1%}", end="")
    for g in [0.01, 0.02, 0.03, 0.04, 0.05]:
        if w <= g:
            print(f" {'N/A':>7}", end="")
            continue
        # Simple Gordon Growth from normalized FCF $1100M
        norm_fcf = 1100
        eq_val = norm_fcf / (w - g) + cash - debt
        ps = eq_val / shares_fy25
        print(f" ${ps:>5.0f}", end="")
    print()

# ========== SUMMARY ==========
print("\n" + "=" * 70)
print("VALUATION SUMMARY")
print("=" * 70)
print(f"  Current Price: ${price}")
print(f"  Method 1 (Reverse DCF implied g): {g_implied:.2%}")
print(f"  Method 2 (DCF Bear/Base/Bull): ${dcf_results['Bear (g=1%, OPM→17%)']:.0f} / ${dcf_results['Base (g=4%, OPM→20%)']:.0f} / ${dcf_results['Bull (g=7%, OPM→22%)']:.0f}")
print(f"  Method 3 (PE Band 14-22x): ${14*eps_fy28e:.0f} - ${22*eps_fy28e:.0f}")
print(f"  Method 4 (EV/EBITDA 12-18x): ${(ebitda_fy25*12-debt+cash)/shares_fy25:.0f} - ${(ebitda_fy25*18-debt+cash)/shares_fy25:.0f}")
print(f"  Method 5 (SOTP): ${sotp_ps:.0f}")
print(f"  Method 6 (PW EV): ${pw_ev:.0f}")

# Fair value range
fv_low = min(dcf_results['Bear (g=1%, OPM→17%)'], 14*eps_fy28e, (ebitda_fy25*10-debt+cash)/shares_fy25)
fv_mid = pw_ev
fv_high = max(dcf_results['Bull (g=7%, OPM→22%)'], 22*eps_fy28e, sotp_ps)

print(f"\n  Fair Value Range: ${fv_low:.0f} - ${fv_mid:.0f} - ${fv_high:.0f}")
print(f"  Central Estimate (PW): ${pw_ev:.0f} ({(pw_ev/price-1)*100:+.1f}% vs current)")
print(f"  Margin of Safety at ${price}: {(1-price/pw_ev)*100:.0f}%")

# Dispersion check
all_values = [dcf_results['Base (g=4%, OPM→20%)'], 18*eps_fy28e, (ebitda_fy25*15-debt+cash)/shares_fy25, sotp_ps, pw_ev]
avg = sum(all_values)/len(all_values)
max_dev = max(abs(v-avg)/avg for v in all_values)
print(f"\n  Base methods average: ${avg:.0f}")
print(f"  Max deviation from avg: {max_dev*100:.1f}%")
print(f"  Dispersion check (≤30%): {'PASS' if max_dev <= 0.30 else 'FAIL'}")

print("\n" + "=" * 70)
