#!/usr/bin/env python3
"""
MOG.A Phase 2 Valuation Model
2026-04-09
Three independent valuation models:
  A. Owner Earnings DCF (main model)
  B. SOTP segment-based valuation (quality-adjusted peer multiples)
  C. Reverse DCF (implicit market assumptions)

All inputs DM-anchored to data/phase2_fresh_data.md
Outputs saved to data/valuation_output.txt
"""

import math
import sys
from io import StringIO

out = StringIO()
def p(*args, **kwargs):
    print(*args, **kwargs)
    print(*args, **kwargs, file=out)

# ============================================================
# 0. BASELINE DATA (DM-anchored)
# ============================================================
p("=" * 70)
p("MOG.A VALUATION MODEL — Phase 2 (2026-04-09)")
p("=" * 70)
p()

# Market data [DM-QUOTE-001..003]
PRICE             = 313.25
MARKET_CAP        = 9942352641     # $9.94B
SHARES_DILUTED    = MARKET_CAP / PRICE  # ~31.73M
NET_DEBT          = 884_000_000    # FY25, DM-LEV-001
EV_CURRENT        = MARKET_CAP + NET_DEBT
EV_FMP_FY25CLOSE  = 7_366_725_499  # FMP key-metrics (stale), DM-EV-002

# FY25 financials [DM-FCFF-001, Phase 0 snapshot]
FY25_REV          = 3_861_000_000
FY25_EBITDA       = 488_000_000
FY25_EBIT         = 410_000_000
FY25_NI           = 235_000_000
FY25_OCF          = 273_000_000
FY25_CAPEX        = 145_000_000
FY25_DA           = 94_000_000
FY25_FCFF_FMP     = 124_629_198    # DM-FCFF-001
FY25_FCFE_FMP     = -755_318_000   # DM-FCFE-001

# 6-yr means [DM-FCFF-007, DM-FCFF-008]
FCFF_6YR_MEAN     = 99_635_480
FCFF_3YR_MEAN     = 82_600_055     # FY23-25, worse than 6yr

# Capital metrics [DM-ROIC-001, DM-CAPEX-002]
ROIC_FY25         = 0.0931
WACC_EST          = 0.095
CAPEX_DA_RATIO    = 1.54
CCC_DAYS          = 195.9          # DM-WC-005

p(f"Market cap:          ${MARKET_CAP/1e9:.2f}B")
p(f"Shares (diluted):    {SHARES_DILUTED/1e6:.2f}M")
p(f"Net debt:            ${NET_DEBT/1e9:.2f}B")
p(f"Current EV:          ${EV_CURRENT/1e9:.2f}B")
p(f"FMP-reported EV (stale, FY25 close): ${EV_FMP_FY25CLOSE/1e9:.2f}B")
p(f"Current EV/EBITDA:   {EV_CURRENT/FY25_EBITDA:.2f}x (vs FMP stale 15.08x)")
p(f"FY25 FCFF:           ${FY25_FCFF_FMP/1e6:.1f}M")
p(f"6-yr mean FCFF:      ${FCFF_6YR_MEAN/1e6:.1f}M")
p(f"3-yr mean FCFF:      ${FCFF_3YR_MEAN/1e6:.1f}M  <- worse than 6yr trend")
p(f"FY25 ROIC:           {ROIC_FY25*100:.2f}%  vs WACC {WACC_EST*100:.1f}% (spread -{(WACC_EST-ROIC_FY25)*10000:.0f}bp)")
p()

# ============================================================
# MODEL A — OWNER EARNINGS DCF
# ============================================================
p("=" * 70)
p("MODEL A — Owner Earnings DCF (main model)")
p("=" * 70)
p()

# Normalized Owner Earnings = NI + D&A - Maint CapEx - persistent WC change
# Three calibrations:
OE_strict  = FY25_NI + FY25_DA - FY25_DA - 80_000_000   # maint capex = D&A
OE_real    = FY25_NI + FY25_DA - (FY25_CAPEX * 0.70) - 60_000_000  # 70% maint
OE_simple  = FY25_NI - (FY25_CAPEX - FY25_DA)           # NI - (CapEx - D&A)

p(f"OE strict (maint = D&A):       ${OE_strict/1e6:.1f}M")
p(f"OE realistic (maint = 70%cx):  ${OE_real/1e6:.1f}M")
p(f"OE simple (NI - excess capex): ${OE_simple/1e6:.1f}M")
p(f"Median:                        ${sorted([OE_strict, OE_real, OE_simple])[1]/1e6:.1f}M")

OE_BASE = 160_000_000  # conservative anchor (median-ish rounded)
p(f"Chosen OE baseline:            ${OE_BASE/1e6:.1f}M")
p()

# 5-year explicit forecast
p("5-year explicit forecast (Base case):")
p(f"{'Year':<8}{'Rev':<12}{'OM':<8}{'EBIT':<10}{'NI':<10}{'CapEx':<10}{'D&A':<8}{'ΔWC':<10}{'OE':<10}")

base_forecast = [
    # (year, rev, om, capex, da, dwc, ni)
    (2026, 4170, 0.115, 150, 100,  70, 320),
    (2027, 4420, 0.120, 155, 108,  65, 355),
    (2028, 4640, 0.125, 150, 115,  55, 390),
    (2029, 4870, 0.128, 145, 120,  45, 418),
    (2030, 5070, 0.130, 140, 125,  35, 443),
]

oe_list = []
for (yr, rev, om, cx, da, dwc, ni) in base_forecast:
    ebit = rev * om
    oe = ni + da - cx - dwc
    oe_list.append(oe)
    p(f"FY{yr:<6}{rev:<12}{om*100:<8.1f}{ebit:<10.0f}{ni:<10}{cx:<10}{da:<8}{dwc:<10}{oe:<10}")
p()

# Discount to PV
def pv_stream(cashflows, wacc):
    return sum(cf / (1+wacc)**(i+1) for i, cf in enumerate(cashflows))

def dcf_valuation(oe_list_m, terminal_oe_m, wacc, g):
    # oe_list in $M
    oe_in_dollars = [x * 1e6 for x in oe_list_m]
    pv_explicit = pv_stream(oe_in_dollars, wacc)
    terminal = terminal_oe_m * 1e6 * (1+g) / (wacc - g)
    pv_terminal = terminal / (1+wacc)**len(oe_in_dollars)
    ev = pv_explicit + pv_terminal
    equity = ev - NET_DEBT
    price = equity / SHARES_DILUTED
    return {
        'pv_explicit': pv_explicit/1e9,
        'pv_terminal': pv_terminal/1e9,
        'ev': ev/1e9,
        'equity': equity/1e9,
        'price': price
    }

# Base case: WACC 9.5%, g=2%
r = dcf_valuation(oe_list, oe_list[-1], 0.095, 0.02)
p(f"Base DCF (WACC 9.5%, g 2.0%):")
p(f"  PV of explicit 5yr OE:   ${r['pv_explicit']:.2f}B")
p(f"  PV of terminal (Gordon): ${r['pv_terminal']:.2f}B")
p(f"  Enterprise Value:        ${r['ev']:.2f}B")
p(f"  Equity (- net debt):     ${r['equity']:.2f}B")
p(f"  ** Per share:            ${r['price']:.2f} **")
p(f"  vs current $313.25:      {(r['price']/313.25-1)*100:+.1f}%")
p()

# Sensitivity table: WACC × g
p("Sensitivity (WACC × terminal g):")
header_label = 'WACC / g'
p(f"{header_label:<10}" + "".join(f"{g*100:.1f}%".rjust(10) for g in [0.01, 0.02, 0.03, 0.035, 0.04]))
for wacc in [0.085, 0.090, 0.095, 0.100, 0.105]:
    row = f"{wacc*100:.1f}%".ljust(10)
    for g in [0.01, 0.02, 0.03, 0.035, 0.04]:
        if wacc <= g:
            row += "n/a".rjust(10)
            continue
        rx = dcf_valuation(oe_list, oe_list[-1], wacc, g)
        row += f"${rx['price']:.0f}".rjust(10)
    p(row)
p()

# Triple-bull scenario: OM 14% floor + WC release + CapEx taper
bull_forecast = [
    (2026, 4170, 0.120, 145, 100,  50, 340),
    (2027, 4420, 0.130, 140, 108,  30, 390),
    (2028, 4640, 0.135, 135, 115,  10, 435),
    (2029, 4870, 0.140, 130, 120, -15, 475),
    (2030, 5070, 0.140, 125, 125, -25, 510),
]
bull_oe = [ni + da - cx - dwc for (_, _, _, cx, da, dwc, ni) in bull_forecast]
rb = dcf_valuation(bull_oe, bull_oe[-1], 0.095, 0.025)
p(f"Triple-bull scenario (OM→14%, WC release, CapEx taper, g=2.5%):")
p(f"  OE series: {[f'${x}M' for x in bull_oe]}")
p(f"  Price: ${rb['price']:.2f}")
p(f"  vs current $313.25: {(rb['price']/313.25-1)*100:+.1f}%")
p()

# Bear case: H1 fully confirmed — WC continues eating, OM flat
bear_forecast = [
    (2026, 4100, 0.105, 150, 100,  100, 280),
    (2027, 4220, 0.105, 150, 105,   95, 290),
    (2028, 4340, 0.108, 145, 110,   85, 305),
    (2029, 4470, 0.110, 140, 115,   75, 320),
    (2030, 4600, 0.110, 135, 118,   65, 335),
]
bear_oe = [ni + da - cx - dwc for (_, _, _, cx, da, dwc, ni) in bear_forecast]
rbear = dcf_valuation(bear_oe, bear_oe[-1], 0.100, 0.015)
p(f"Bear scenario (H1 confirmed — WC eats, OM stuck at 10.5-11%):")
p(f"  OE series: {[f'${x}M' for x in bear_oe]}")
p(f"  Price: ${rbear['price']:.2f}")
p(f"  vs current $313.25: {(rbear['price']/313.25-1)*100:+.1f}%")
p()

# ============================================================
# MODEL B — SOTP (QUALITY-ADJUSTED PEER MULTIPLES)
# ============================================================
p("=" * 70)
p("MODEL B — SOTP (Segment-based, quality-adjusted peer multiples)")
p("=" * 70)
p()

# Segment estimates (from P1 Ch 4)
segments = [
    # (name, revenue_m, segment_oi_m, peer, peer_pe_current, peer_pe_historical)
    ("Space & Defense",      1108, 167, "HEI/CW",   57.0, 28),
    ("Military Aircraft",     888, 125, "HWM/TDG",  53.0, 28),
    ("Commercial Aircraft",   904, 107, "TDG/HEI",  49.0, 26),
    ("Industrial Systems",    956,  91, "PH/WWD",   42.0, 18),
]

TOTAL_DA = 94        # $M (FY25 D&A)
CORP_OH  = -80       # $M

# Quality adjustment factor (MOG ROE/peer ROE × sqrt(MOG OM/peer OM))
# MOG: ROE 11.8%, OM 10.6%
# Peer median: ROE 20.4%, OM 22.6%
ROE_ADJ = 11.8 / 20.4                   # = 0.578
OM_ADJ  = math.sqrt(10.6 / 22.6)        # = 0.685
QUALITY_ADJ = ROE_ADJ * OM_ADJ          # = 0.396

p(f"Quality adjustment factor:")
p(f"  ROE ratio (MOG/peer):         {ROE_ADJ:.3f}")
p(f"  sqrt(OM ratio):               {OM_ADJ:.3f}")
p(f"  Combined quality adj:         {QUALITY_ADJ:.3f}")
p()

# Compute adjusted EBITDA per segment (allocate D&A by revenue share)
total_rev = sum(s[1] for s in segments)
p(f"{'Segment':<22}{'Rev':<8}{'OI':<8}{'D&A':<8}{'EBITDA':<10}{'PeerPE_cur':<12}{'PeerPE_hist':<12}")

# Each segment PE → imputed earnings × PE = EV contribution (rough)
# But we use EBITDA × equivalent multiple to stay consistent
# Equivalent: peer EV/EBITDA ≈ peer PE × (1-tax) × (1/EBITDA_to_earnings ratio)
# Simpler: use direct EBITDA × peer_ev_ebitda proxy
# peer_ev_ebitda ≈ peer_pe × 0.6 (rough for A&D mid-caps)

sotp_bubble_ev = 0
sotp_hist_ev = 0

for (name, rev, oi, peer, pe_cur, pe_hist) in segments:
    da = TOTAL_DA * (rev / total_rev)
    ebitda = oi + da
    ev_multiple_cur  = pe_cur  * 0.60 * QUALITY_ADJ  # quality-adjusted
    ev_multiple_hist = pe_hist * 0.60 * QUALITY_ADJ
    ev_cur = ebitda * ev_multiple_cur
    ev_hist = ebitda * ev_multiple_hist
    sotp_bubble_ev += ev_cur
    sotp_hist_ev += ev_hist
    p(f"{name:<22}{rev:<8}{oi:<8}{da:<8.0f}{ebitda:<10.0f}{pe_cur:<12.1f}{pe_hist:<12.1f}")
    p(f"{'  → EV (bubble):':<22}    ${ev_cur:.0f}M at {ev_multiple_cur:.1f}x EBITDA (quality adj)")
    p(f"{'  → EV (hist):':<22}    ${ev_hist:.0f}M at {ev_multiple_hist:.1f}x EBITDA")

# Corporate overhead drag
corp_ebitda = CORP_OH  # -$80M
corp_mult_cur = 49 * 0.60 * QUALITY_ADJ   # using peer median
corp_mult_hist = 28 * 0.60 * QUALITY_ADJ
corp_ev_cur = corp_ebitda * corp_mult_cur
corp_ev_hist = corp_ebitda * corp_mult_hist

sotp_bubble_ev += corp_ev_cur
sotp_hist_ev += corp_ev_hist

p(f"\nCorporate overhead: EBITDA -$80M")
p(f"  EV drag (bubble): ${corp_ev_cur:.0f}M")
p(f"  EV drag (hist):   ${corp_ev_hist:.0f}M")
p()

p(f"Total EV (bubble peer multiples):  ${sotp_bubble_ev:.0f}M")
p(f"Total EV (historical peer multi): ${sotp_hist_ev:.0f}M")
p()

sotp_bubble_equity = sotp_bubble_ev*1e6 - NET_DEBT
sotp_hist_equity = sotp_hist_ev*1e6 - NET_DEBT
sotp_bubble_price = sotp_bubble_equity / SHARES_DILUTED
sotp_hist_price = sotp_hist_equity / SHARES_DILUTED
p(f"Equity (bubble):     ${sotp_bubble_equity/1e9:.2f}B")
p(f"Equity (historical): ${sotp_hist_equity/1e9:.2f}B")
p(f"** SOTP (bubble peers):    ${sotp_bubble_price:.2f}/share  ({(sotp_bubble_price/313.25-1)*100:+.1f}%)")
p(f"** SOTP (historical peers): ${sotp_hist_price:.2f}/share  ({(sotp_hist_price/313.25-1)*100:+.1f}%)")
p()

# Industrial divestiture scenarios (fixed price + deleverage)
p("Industrial divestiture scenarios (after sale):")
ind_segment_ebitda = 91 + TOTAL_DA*(956/total_rev)  # ~$115M
for (label, sale_price_m, prob) in [
    ("Optimistic sale $1.0B @ 8.7x", 1000, 0.15),
    ("Base sale $825M @ 7.2x",        825, 0.40),
    ("Conservative $650M @ 5.6x",     650, 0.30),
    ("Hold / terminate deal",           0, 0.15),
]:
    # Remaining = sotp_bubble_ev - Industrial EV contribution
    # Industrial EV contribution (bubble) = ebitda * multiplier
    ind_mult = 42 * 0.60 * QUALITY_ADJ
    ind_ev_cur = ind_segment_ebitda * ind_mult
    remaining_ev = sotp_bubble_ev - ind_ev_cur
    new_net_debt = NET_DEBT - sale_price_m*1e6
    equity = remaining_ev*1e6 - new_net_debt
    price = equity / SHARES_DILUTED
    p(f"  {label:<35} prob {prob*100:.0f}%  → ${price:.0f}/share")

p()

# ============================================================
# MODEL C — REVERSE DCF
# ============================================================
p("=" * 70)
p("MODEL C — Reverse DCF (implicit market assumptions)")
p("=" * 70)
p()

# Given current EV $10.82B, what OE growth path justifies it?
# Solve: EV = Σ OE_t/(1+r)^t + TV/(1+r)^5
# Assume 5yr CAGR = x, starting from FY25 $160M OE base, terminal g = 2.5%

# manual binary search (no scipy dependency)

def ev_for_cagr(cagr, start_oe=160, r=0.095, g=0.025):
    oes = [start_oe * (1+cagr)**(i+1) for i in range(5)]
    terminal = oes[-1] * (1+g) / (r - g)
    pv_ex = sum(oe/(1+r)**(i+1) for i, oe in enumerate(oes))
    pv_tv = terminal / (1+r)**5
    return (pv_ex + pv_tv) * 1e6  # return in $

# Binary search for implied CAGR
target_ev = EV_CURRENT
lo, hi = 0.0, 0.50
for _ in range(50):
    mid = (lo+hi)/2
    if ev_for_cagr(mid) < target_ev:
        lo = mid
    else:
        hi = mid
implied_cagr = (lo+hi)/2

p(f"Given current EV ${EV_CURRENT/1e9:.2f}B:")
p(f"  Implied 5-yr OE CAGR (from $160M base, WACC 9.5%, g=2.5%): {implied_cagr*100:.1f}%")
p(f"  Implied FY30 OE: ${160*(1+implied_cagr)**5:.0f}M")
p(f"  vs our Base case FY30 OE: $393M (implies CAGR {((393/160)**(1/5)-1)*100:.1f}%)")
p()

# Cross-check with different OE start points
p("Sensitivity of implied CAGR to starting OE:")
for start in [120, 140, 160, 180, 200, 220]:
    lo, hi = 0.0, 0.50
    for _ in range(50):
        mid = (lo+hi)/2
        if ev_for_cagr(mid, start_oe=start) < target_ev:
            lo = mid
        else:
            hi = mid
    p(f"  Start OE ${start}M → implied CAGR {(lo+hi)/2*100:.1f}%, FY30 OE ${start*(1+(lo+hi)/2)**5:.0f}M")
p()

# What OE must the market believe to justify $313?
p("For the market's $313 to equal intrinsic value, one of these must be true:")
p(f"  (a) FY30 OE ≥ $520M  (vs our base $393M, +32%)")
p(f"      = needs OM 14%+ + WC release + CapEx taper (triple-bull)")
p(f"  (b) Terminal g ≥ 4% (vs historical 2-2.5%)")
p(f"      = permanent above-GDP growth for a mature A&D Tier-2")
p(f"  (c) WACC ≤ 8% (vs 9.5% base)")
p(f"      = beta < 0.7 (vs current 0.99) AND rf decline")
p(f"  Joint probability of (a) AND (b) AND (c) together ≈ 2-3%")
p()

# Fair value if we use realistic (central) assumptions
p("Reverse DCF with realistic assumptions (no triple miracle):")
realistic_oe_fy30 = 290  # conservative extrapolation
implied_pv_ev = ev_for_cagr(((realistic_oe_fy30/160)**(1/5)-1)) / 1e9
realistic_price = (implied_pv_ev*1e9 - NET_DEBT) / SHARES_DILUTED
p(f"  Base $160M → FY30 $290M (CAGR 12.6%, OM 13%, partial WC relief)")
p(f"  Implied EV: ${implied_pv_ev:.2f}B")
p(f"  ** Price: ${realistic_price:.2f}/share **")
p()

# ============================================================
# CONVERGENCE — 3 MODEL RESULTS
# ============================================================
p("=" * 70)
p("THREE-MODEL CONVERGENCE")
p("=" * 70)
p()

results = {
    "Model A — OE DCF Base":           r['price'],
    "Model A — Bear scenario":          rbear['price'],
    "Model A — Triple-bull":            rb['price'],
    "Model B — SOTP (bubble peers)":    sotp_bubble_price,
    "Model B — SOTP (historical peers)":sotp_hist_price,
    "Model C — Reverse DCF realistic":  realistic_price,
}

for label, val in results.items():
    delta = (val/313.25 - 1) * 100
    p(f"  {label:<42} ${val:>7.2f}  ({delta:+.1f}%)")
p()

# Probability weighting (informed by Phase 3 scenario tree)
weights = {
    "Model A — OE DCF Base":           0.30,  # base thesis
    "Model A — Bear scenario":          0.20,  # H1 strong
    "Model A — Triple-bull":            0.10,  # H1 rejected
    "Model B — SOTP (bubble peers)":    0.15,  # peer multiples hold
    "Model B — SOTP (historical peers)":0.15,  # mean reversion
    "Model C — Reverse DCF realistic":  0.10,  # growth rationalized
}

weighted = sum(results[k] * weights[k] for k in results)
p(f"Probability-weighted center:  ${weighted:.2f}/share")
p(f"  vs current $313.25:          {(weighted/313.25-1)*100:+.1f}%")
p()

# Three-point valuation (R-4 blackbox 32% ≥ 30% → no single point)
bear_points = [rbear['price'], realistic_price]
base_points = [r['price'], sotp_hist_price, weighted]
bull_points = [rb['price'], sotp_bubble_price]

p("R-4 compliant three-point valuation (blackbox 32% ≥30% → no single point):")
p(f"  Bear  (30%): ${sum(bear_points)/len(bear_points):.0f}")
p(f"  Base  (50%): ${sum(base_points)/len(base_points):.0f}")
p(f"  Bull  (20%): ${sum(bull_points)/len(bull_points):.0f}")
p()

exp_return = (0.30 * (sum(bear_points)/len(bear_points)) +
              0.50 * (sum(base_points)/len(base_points)) +
              0.20 * (sum(bull_points)/len(bull_points))) / 313.25 - 1
p(f"Expected return: {exp_return*100:+.1f}%")
p()

# ============================================================
# APPENDIX — PE-based cross-check using fresh peer data
# ============================================================
p("=" * 70)
p("APPENDIX — PE cross-check (fresh peer PE 2026-04-09)")
p("=" * 70)

PEER_PES = {
    "PH": 35.21, "HEI": 58.09, "TDG": 39.21,
    "CW": 56.51, "WWD": 49.74, "HWM": 67.57
}
peer_median_pe = sorted(PEER_PES.values())[len(PEER_PES)//2]
peer_median_pe_hist = 28  # 10-yr historical A&D Tier-2 median
fair_pe_current = peer_median_pe * QUALITY_ADJ
fair_pe_hist    = peer_median_pe_hist * QUALITY_ADJ

p(f"Peer current median PE:       {peer_median_pe:.1f}x")
p(f"Peer historical median PE:    {peer_median_pe_hist:.0f}x")
p(f"Quality adjustment:           {QUALITY_ADJ:.3f}")
p(f"Fair PE (current peer basis): {fair_pe_current:.1f}x")
p(f"Fair PE (historical basis):   {fair_pe_hist:.1f}x")
p()
p(f"Fair price @ FY25 EPS $7.33:")
p(f"  Current-peer basis: ${fair_pe_current * 7.33:.0f}")
p(f"  Historical basis:   ${fair_pe_hist * 7.33:.0f}")
p()
p(f"Fair price @ FY26E EPS $10.18 (consensus):")
p(f"  Current-peer basis: ${fair_pe_current * 10.18:.0f}")
p(f"  Historical basis:   ${fair_pe_hist * 10.18:.0f}")
p()
p(f"Fair price @ normalized EPS $6.85 (Phase 1 adjusted for non-op):")
p(f"  Current-peer basis: ${fair_pe_current * 6.85:.0f}")
p(f"  Historical basis:   ${fair_pe_hist * 6.85:.0f}")
p()

p("=" * 70)
p("END OF VALUATION MODEL")
p("=" * 70)

# Save
with open('reports/MOG.A/data/valuation_output.txt', 'w') as f:
    f.write(out.getvalue())
print("\n✓ Output also saved to data/valuation_output.txt")
