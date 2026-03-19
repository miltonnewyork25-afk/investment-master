#!/usr/bin/env python3
"""
UNH Phase 3 Forward DCF — 三情景×5年FCFF验证
铁律N: 所有估值数字必须Python验证
"""

import numpy as np

# ========== 共同参数 ==========
net_debt = 54.0  # $B
minority_interest = 7.6  # $B
tax_rates = {'bull': 0.22, 'base': 0.225, 'bear': 0.23}
da_base = 4.5  # $B, +3%/年
capex_base = 3.8  # $B, +5%/年

def build_da_schedule(years=5, base=4.5, growth=0.03):
    return [base * (1 + growth)**i for i in range(years)]

def build_capex_schedule(years=5, base=3.8, growth=0.05):
    return [base * (1 + growth)**i for i in range(years)]

# ========== Bull情景 ==========
print("=" * 60)
print("BULL SCENARIO (α: MCR Recovery)")
print("=" * 60)

bull_rev = [435, 455, 485, 520, 558]
bull_opm = [0.065, 0.075, 0.080, 0.083, 0.085]
bull_maint_acq = [3.0] * 5
bull_wacc = 0.075
bull_exit_multiple = 14
bull_shares = 895  # M

da = build_da_schedule()
capex = build_capex_schedule()

bull_ebit = [r * o for r, o in zip(bull_rev, bull_opm)]
bull_nopat = [e * (1 - tax_rates['bull']) for e in bull_ebit]
bull_fcff = [n + d - c - a for n, d, c, a in zip(bull_nopat, da, capex, bull_maint_acq)]

print("\nYear | Rev($B) | OPM   | EBIT($B) | NOPAT($B) | D&A   | CapEx | M&A | FCFF($B)")
print("-" * 85)
for i in range(5):
    print(f"{2026+i} | {bull_rev[i]:7.1f} | {bull_opm[i]:.1%} | {bull_ebit[i]:8.1f} | {bull_nopat[i]:9.1f} | {da[i]:.1f} | {capex[i]:.1f} | {bull_maint_acq[i]:.1f} | {bull_fcff[i]:7.1f}")

# PV of FCFF
bull_pv_fcff = sum([f / (1 + bull_wacc)**(i+1) for i, f in enumerate(bull_fcff)])
# Terminal value (exit multiple)
bull_ebitda_terminal = bull_ebit[-1] + da[-1]
bull_tv = bull_ebitda_terminal * bull_exit_multiple
bull_pv_tv = bull_tv / (1 + bull_wacc)**5
bull_ev = bull_pv_fcff + bull_pv_tv
bull_equity = bull_ev - net_debt - minority_interest
bull_per_share = bull_equity / (bull_shares / 1000)

print(f"\nPV(FCFF): ${bull_pv_fcff:.1f}B")
print(f"Terminal EBITDA: ${bull_ebitda_terminal:.1f}B × {bull_exit_multiple}x = TV ${bull_tv:.1f}B")
print(f"PV(TV): ${bull_pv_tv:.1f}B")
print(f"EV: ${bull_ev:.1f}B")
print(f"Equity: ${bull_equity:.1f}B")
print(f"Per Share: ${bull_per_share:.0f}")

# ========== Base情景 ==========
print("\n" + "=" * 60)
print("BASE SCENARIO (Premium Catch-up, MCR ~85%)")
print("=" * 60)

base_rev = [430, 445, 468, 495, 523]
base_opm = [0.055, 0.065, 0.070, 0.072, 0.072]
base_maint_acq = [4.0] * 5
base_wacc = 0.08
base_exit_multiple = 12
base_shares = 900

base_ebit = [r * o for r, o in zip(base_rev, base_opm)]
base_nopat = [e * (1 - tax_rates['base']) for e in base_ebit]
base_fcff = [n + d - c - a for n, d, c, a in zip(base_nopat, da, capex, base_maint_acq)]

print("\nYear | Rev($B) | OPM   | EBIT($B) | NOPAT($B) | D&A   | CapEx | M&A | FCFF($B)")
print("-" * 85)
for i in range(5):
    print(f"{2026+i} | {base_rev[i]:7.1f} | {base_opm[i]:.1%} | {base_ebit[i]:8.1f} | {base_nopat[i]:9.1f} | {da[i]:.1f} | {capex[i]:.1f} | {base_maint_acq[i]:.1f} | {base_fcff[i]:7.1f}")

base_pv_fcff = sum([f / (1 + base_wacc)**(i+1) for i, f in enumerate(base_fcff)])
base_ebitda_terminal = base_ebit[-1] + da[-1]
base_tv = base_ebitda_terminal * base_exit_multiple
base_pv_tv = base_tv / (1 + base_wacc)**5
base_ev = base_pv_fcff + base_pv_tv
base_equity = base_ev - net_debt - minority_interest
base_per_share = base_equity / (base_shares / 1000)

print(f"\nPV(FCFF): ${base_pv_fcff:.1f}B")
print(f"Terminal EBITDA: ${base_ebitda_terminal:.1f}B × {base_exit_multiple}x = TV ${base_tv:.1f}B")
print(f"PV(TV): ${base_pv_tv:.1f}B")
print(f"EV: ${base_ev:.1f}B")
print(f"Equity: ${base_equity:.1f}B")
print(f"Per Share: ${base_per_share:.0f}")

# ========== Bear情景 ==========
print("\n" + "=" * 60)
print("BEAR SCENARIO (β Extreme: Permanent MCR 86-87%)")
print("=" * 60)

bear_rev = [420, 425, 440, 458, 475]
bear_opm = [0.045, 0.050, 0.055, 0.055, 0.055]
bear_maint_acq = [5.0] * 5
bear_wacc = 0.09
bear_exit_multiple = 10
bear_shares = 910

bear_ebit = [r * o for r, o in zip(bear_rev, bear_opm)]
bear_nopat = [e * (1 - tax_rates['bear']) for e in bear_ebit]
bear_fcff = [n + d - c - a for n, d, c, a in zip(bear_nopat, da, capex, bear_maint_acq)]

print("\nYear | Rev($B) | OPM   | EBIT($B) | NOPAT($B) | D&A   | CapEx | M&A | FCFF($B)")
print("-" * 85)
for i in range(5):
    print(f"{2026+i} | {bear_rev[i]:7.1f} | {bear_opm[i]:.1%} | {bear_ebit[i]:8.1f} | {bear_nopat[i]:9.1f} | {da[i]:.1f} | {capex[i]:.1f} | {bear_maint_acq[i]:.1f} | {bear_fcff[i]:7.1f}")

bear_pv_fcff = sum([f / (1 + bear_wacc)**(i+1) for i, f in enumerate(bear_fcff)])
bear_ebitda_terminal = bear_ebit[-1] + da[-1]
bear_tv = bear_ebitda_terminal * bear_exit_multiple
bear_pv_tv = bear_tv / (1 + bear_wacc)**5
bear_ev = bear_pv_fcff + bear_pv_tv
bear_equity = bear_ev - net_debt - minority_interest
bear_per_share = bear_equity / (bear_shares / 1000)

print(f"\nPV(FCFF): ${bear_pv_fcff:.1f}B")
print(f"Terminal EBITDA: ${bear_ebitda_terminal:.1f}B × {bear_exit_multiple}x = TV ${bear_tv:.1f}B")
print(f"PV(TV): ${bear_pv_tv:.1f}B")
print(f"EV: ${bear_ev:.1f}B")
print(f"Equity: ${bear_equity:.1f}B")
print(f"Per Share: ${bear_per_share:.0f}")

# ========== 概率加权 ==========
print("\n" + "=" * 60)
print("PROBABILITY-WEIGHTED VALUATION")
print("=" * 60)

prob_bull, prob_base, prob_bear = 0.15, 0.55, 0.30
pw_value = prob_bull * bull_per_share + prob_base * base_per_share + prob_bear * bear_per_share

print(f"Bull: ${bull_per_share:.0f} × {prob_bull:.0%} = ${prob_bull*bull_per_share:.1f}")
print(f"Base: ${base_per_share:.0f} × {prob_base:.0%} = ${prob_base*base_per_share:.1f}")
print(f"Bear: ${bear_per_share:.0f} × {prob_bear:.0%} = ${prob_bear*bear_per_share:.1f}")
print(f"\nProbability-Weighted Fair Value: ${pw_value:.0f}")
print(f"Current Price: $284")
print(f"Upside/Downside: {(pw_value/284-1)*100:+.1f}%")

# ========== 敏感性矩阵 ==========
print("\n" + "=" * 60)
print("SENSITIVITY: OPM(terminal) × Exit Multiple (Base WACC 8%)")
print("=" * 60)

opm_range = [0.055, 0.060, 0.065, 0.070, 0.072, 0.075, 0.080]
exit_range = [10, 11, 12, 13, 14]

header = f"{'OPM':>8}"
for ex in exit_range:
    header += f" | {ex:>4}x"
print(header)
print("-" * 50)

for opm in opm_range:
    row = f"{opm:>7.1%}"
    for ex in exit_range:
        rev = base_rev
        maint = base_maint_acq
        ebit_s = [r * opm for r in rev]
        nopat_s = [e * (1 - 0.225) for e in ebit_s]
        fcff_s = [n + d - c - a for n, d, c, a in zip(nopat_s, da, capex, maint)]
        pv_f = sum([f / (1.08)**(i+1) for i, f in enumerate(fcff_s)])
        ebitda_t = ebit_s[-1] + da[-1]
        tv_s = ebitda_t * ex
        pv_t = tv_s / (1.08)**5
        ev_s = pv_f + pv_t
        eq_s = ev_s - net_debt - minority_interest
        ps = eq_s / 0.9  # 900M shares = 0.9B
        row += f" | ${ps:>4.0f}"
    print(row)

# ========== WACC敏感性 ==========
print("\n" + "=" * 60)
print("SENSITIVITY: WACC (Base OPM 7.2%, Exit 12x)")
print("=" * 60)

wacc_range = [0.065, 0.070, 0.075, 0.080, 0.085, 0.090, 0.100]
for w in wacc_range:
    pv_f = sum([f / (1 + w)**(i+1) for i, f in enumerate(base_fcff)])
    pv_t = base_tv / (1 + w)**5
    ev_s = pv_f + pv_t
    eq_s = ev_s - net_debt - minority_interest
    ps = eq_s / 0.9
    print(f"WACC {w:.1%}: ${ps:.0f}/share ({(ps/284-1)*100:+.0f}% vs $284)")

print("\n✅ DCF verification complete")
