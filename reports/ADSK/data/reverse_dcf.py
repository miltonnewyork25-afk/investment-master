#!/usr/bin/env python3
"""
Autodesk (ADSK) Reverse DCF Model
==================================
Decodes what $239/share implies about market expectations.
Reverse-engineers implied revenue CAGR, terminal growth, and FCF margins.

Includes "Owner Economics" variant that adjusts FCF for SBC tax-effected cost.
"""

import numpy as np
from scipy.optimize import brentq
import sys
from io import StringIO

# ============================================================
# INPUT ASSUMPTIONS
# ============================================================

# Market data (2026-03-24)
STOCK_PRICE = 239.39
SHARES_DILUTED = 213e6  # diluted shares outstanding
MARKET_CAP = STOCK_PRICE * SHARES_DILUTED
NET_DEBT = 485e6  # debt $2.73B - cash $2.60B
EV_MARKET = MARKET_CAP + NET_DEBT  # ~$51.5B

# FY2026 Actuals
REV_FY26 = 7.21e9
FCF_FY26 = 2.41e9
FCF_MARGIN_FY26 = FCF_FY26 / REV_FY26  # 33.4%
GAAP_OPM_FY26 = 0.249
NON_GAAP_OPM_FY26 = 0.38
SBC_FY26 = 788e6
SBC_PCT_REV = SBC_FY26 / REV_FY26  # 10.9%

# FY2027 Guidance
REV_FY27_LOW = 8.10e9
REV_FY27_HIGH = 8.17e9
REV_FY27_MID = (REV_FY27_LOW + REV_FY27_HIGH) / 2
FCF_FY27_LOW = 2.70e9
FCF_FY27_HIGH = 2.80e9
FCF_FY27_MID = (FCF_FY27_LOW + FCF_FY27_HIGH) / 2

# Tax rate assumption
TAX_RATE = 0.18  # effective, blended estimate

# Scenario grids
WACC_SCENARIOS = [0.09, 0.10, 0.11, 0.12]
TERMINAL_FCF_MARGIN_SCENARIOS = [0.25, 0.30, 0.35, 0.40]
TERMINAL_GROWTH_RATE = 0.03  # perpetuity growth (base case)
TERMINAL_GROWTH_SCENARIOS = [0.02, 0.025, 0.03, 0.035]

# Projection horizon
PROJECTION_YEARS = 5  # 5-year explicit forecast + terminal value

# Benchmarks
BENCHMARK_FY27_GUIDANCE_CAGR = 0.125  # midpoint of 12-13%
BENCHMARK_ANALYST_5Y_CAGR = 0.12  # consensus ~12%
BENCHMARK_HISTORICAL_ORGANIC_CAGR = 0.11  # ~10-12% organic


# ============================================================
# MODEL FUNCTIONS
# ============================================================

def compute_ev(rev_base, rev_cagr, terminal_fcf_margin, wacc, terminal_growth,
               projection_years=5, sbc_adjusted=False, sbc_pct=SBC_PCT_REV):
    """
    Forward DCF: given revenue CAGR and terminal FCF margin, compute Enterprise Value.

    Year 1 uses FY2027 guidance margins, then linear ramp to terminal margin.
    If sbc_adjusted=True, uses FCF - SBC*(1-tax) as the cash flow (Owner Economics).
    """
    # Revenue projection
    revenues = []
    for yr in range(1, projection_years + 1):
        rev = rev_base * (1 + rev_cagr) ** yr
        revenues.append(rev)

    # FCF margin ramp: start from FY27 guided margin, ramp to terminal
    fy27_fcf_margin = FCF_FY27_MID / REV_FY27_MID  # ~34%
    margins = []
    for yr in range(1, projection_years + 1):
        # Linear ramp from current to terminal over projection period
        weight = yr / projection_years
        margin = fy27_fcf_margin + (terminal_fcf_margin - fy27_fcf_margin) * weight
        margins.append(margin)

    # FCF projection
    fcfs = [rev * margin for rev, margin in zip(revenues, margins)]

    # SBC adjustment for Owner Economics
    if sbc_adjusted:
        for i, rev in enumerate(revenues):
            sbc = rev * sbc_pct
            sbc_after_tax = sbc * (1 - TAX_RATE)
            fcfs[i] -= sbc_after_tax

    # Discount explicit period
    pv_explicit = 0
    for yr, fcf in enumerate(fcfs, 1):
        pv_explicit += fcf / (1 + wacc) ** yr

    # Terminal value (Gordon Growth)
    terminal_fcf = fcfs[-1] * (1 + terminal_growth)
    terminal_value = terminal_fcf / (wacc - terminal_growth)
    pv_terminal = terminal_value / (1 + wacc) ** projection_years

    return pv_explicit + pv_terminal


def solve_implied_cagr(ev_target, terminal_fcf_margin, wacc, terminal_growth,
                       rev_base=REV_FY26, sbc_adjusted=False):
    """Solve for the revenue CAGR that produces the target EV."""
    def objective(cagr):
        ev_calc = compute_ev(rev_base, cagr, terminal_fcf_margin, wacc, terminal_growth,
                             sbc_adjusted=sbc_adjusted)
        return ev_calc - ev_target

    try:
        # Search between -5% and +30% CAGR
        result = brentq(objective, -0.05, 0.30, xtol=1e-6)
        return result
    except ValueError:
        return None  # No solution in range


def solve_implied_terminal_growth(ev_target, rev_cagr, terminal_fcf_margin, wacc,
                                  rev_base=REV_FY26, sbc_adjusted=False):
    """Solve for the terminal growth rate that produces the target EV."""
    def objective(g):
        ev_calc = compute_ev(rev_base, rev_cagr, terminal_fcf_margin, wacc, g,
                             sbc_adjusted=sbc_adjusted)
        return ev_calc - ev_target

    try:
        result = brentq(objective, -0.01, wacc - 0.005, xtol=1e-6)
        return result
    except ValueError:
        return None


def solve_implied_fcf_margin(ev_target, rev_cagr, wacc, terminal_growth,
                             rev_base=REV_FY26, sbc_adjusted=False):
    """Solve for the terminal FCF margin that produces the target EV."""
    def objective(margin):
        ev_calc = compute_ev(rev_base, rev_cagr, margin, wacc, terminal_growth,
                             sbc_adjusted=sbc_adjusted)
        return ev_calc - ev_target

    try:
        result = brentq(objective, 0.05, 0.60, xtol=1e-6)
        return result
    except ValueError:
        return None


# ============================================================
# OUTPUT
# ============================================================

def fmt_pct(x, decimals=1):
    if x is None:
        return "  N/A  "
    return f"{x*100:>{5+decimals}.{decimals}f}%"


def fmt_bn(x):
    return f"${x/1e9:.1f}B"


def run_model():
    output = StringIO()

    def p(text=""):
        output.write(text + "\n")

    p("=" * 80)
    p("AUTODESK (ADSK) — REVERSE DCF MODEL")
    p(f"Stock: ${STOCK_PRICE} | Shares: {SHARES_DILUTED/1e6:.0f}M | "
      f"Market Cap: {fmt_bn(MARKET_CAP)} | EV: {fmt_bn(EV_MARKET)}")
    p(f"FY2026 Rev: {fmt_bn(REV_FY26)} | FCF: {fmt_bn(FCF_FY26)} ({FCF_MARGIN_FY26*100:.1f}%) | "
      f"SBC: ${SBC_FY26/1e6:.0f}M ({SBC_PCT_REV*100:.1f}%)")
    p(f"FY2027 Guidance: Rev {fmt_bn(REV_FY27_MID)} (+{(REV_FY27_MID/REV_FY26-1)*100:.1f}%) | "
      f"FCF {fmt_bn(FCF_FY27_MID)}")
    p(f"Tax rate: {TAX_RATE*100:.0f}% | Terminal growth (base): {TERMINAL_GROWTH_RATE*100:.1f}%")
    p("=" * 80)

    # ----------------------------------------------------------
    # 1. IMPLIED 5-YEAR REVENUE CAGR (Standard FCF)
    # ----------------------------------------------------------
    p()
    p("─" * 80)
    p("1. IMPLIED 5-YEAR REVENUE CAGR — STANDARD FCF")
    p("   (What revenue growth does $239 require at each WACC × Terminal Margin?)")
    p("─" * 80)
    p()

    header = "WACC \\ Margin |"
    for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
        header += f"   {margin*100:.0f}%    |"
    p(header)
    p("-" * len(header))

    cagr_matrix = {}
    for wacc in WACC_SCENARIOS:
        row = f"    {wacc*100:.0f}%       |"
        for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
            cagr = solve_implied_cagr(EV_MARKET, margin, wacc, TERMINAL_GROWTH_RATE)
            cagr_matrix[(wacc, margin)] = cagr
            row += f" {fmt_pct(cagr)}  |"
        p(row)
    p()

    # Interpretation
    base_cagr = cagr_matrix.get((0.10, 0.35))
    p("INTERPRETATION (base case: WACC=10%, Terminal FCF Margin=35%, g=3%):")
    if base_cagr:
        p(f"  → Market implies {base_cagr*100:.1f}% revenue CAGR over 5 years")
        p(f"  → FY2027 guidance: +{BENCHMARK_FY27_GUIDANCE_CAGR*100:.1f}%")
        p(f"  → Historical organic: ~{BENCHMARK_HISTORICAL_ORGANIC_CAGR*100:.0f}-12%")
        p(f"  → Analyst consensus: ~{BENCHMARK_ANALYST_5Y_CAGR*100:.0f}%")
        if base_cagr < BENCHMARK_FY27_GUIDANCE_CAGR:
            delta = BENCHMARK_FY27_GUIDANCE_CAGR - base_cagr
            p(f"  ⇒ PRICING IN PESSIMISM: implied CAGR is {delta*100:.1f}pp BELOW guidance")
        elif base_cagr > BENCHMARK_HISTORICAL_ORGANIC_CAGR + 0.02:
            p(f"  ⇒ PRICING IN OPTIMISM: implied CAGR is ABOVE historical organic range")
        else:
            p(f"  ⇒ ROUGHLY FAIR: implied CAGR is within historical organic range")
    p()

    # ----------------------------------------------------------
    # 2. IMPLIED 5-YEAR REVENUE CAGR — OWNER ECONOMICS (FCF - SBC after tax)
    # ----------------------------------------------------------
    p("─" * 80)
    p("2. IMPLIED 5-YEAR REVENUE CAGR — OWNER ECONOMICS")
    p("   (Using FCF - SBC×(1-tax) as true cash flow to equity)")
    p(f"   SBC = {SBC_PCT_REV*100:.1f}% of revenue, tax-effected at {TAX_RATE*100:.0f}%")
    p(f"   Effective SBC drag: {SBC_PCT_REV*(1-TAX_RATE)*100:.1f}% of revenue")
    p("─" * 80)
    p()

    header = "WACC \\ Margin |"
    for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
        header += f"   {margin*100:.0f}%    |"
    p(header)
    p("-" * len(header))

    owner_cagr_matrix = {}
    for wacc in WACC_SCENARIOS:
        row = f"    {wacc*100:.0f}%       |"
        for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
            cagr = solve_implied_cagr(EV_MARKET, margin, wacc, TERMINAL_GROWTH_RATE,
                                      sbc_adjusted=True)
            owner_cagr_matrix[(wacc, margin)] = cagr
            row += f" {fmt_pct(cagr)}  |"
        p(row)
    p()

    owner_base = owner_cagr_matrix.get((0.10, 0.35))
    if owner_base and base_cagr:
        p(f"OWNER ECONOMICS IMPACT (WACC=10%, Margin=35%):")
        p(f"  Standard implied CAGR:       {base_cagr*100:.1f}%")
        p(f"  Owner Economics implied CAGR: {owner_base*100:.1f}%")
        p(f"  SBC tax shield adds: +{(owner_base - base_cagr)*100:.1f}pp to required growth")
        p(f"  → SBC dilution makes the stock MORE expensive on owner economics basis")
    p()

    # ----------------------------------------------------------
    # 3. IMPLIED TERMINAL GROWTH RATE
    # ----------------------------------------------------------
    p("─" * 80)
    p("3. IMPLIED TERMINAL GROWTH RATE (PERPETUITY)")
    p("   (If revenue grows at benchmark CAGRs, what terminal g is priced in?)")
    p("─" * 80)
    p()

    rev_cagr_scenarios = [0.08, 0.10, 0.12, 0.14]

    header = "CAGR \\ Margin |"
    for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
        header += f"   {margin*100:.0f}%    |"
    p(header)
    p("-" * len(header))

    wacc_for_tg = 0.10  # use base WACC
    for cagr in rev_cagr_scenarios:
        row = f"    {cagr*100:.0f}%       |"
        for margin in TERMINAL_FCF_MARGIN_SCENARIOS:
            tg = solve_implied_terminal_growth(EV_MARKET, cagr, margin, wacc_for_tg)
            row += f" {fmt_pct(tg)}  |"
        p(row)
    p(f"  (WACC fixed at {wacc_for_tg*100:.0f}%)")
    p()

    # ----------------------------------------------------------
    # 4. IMPLIED FCF MARGIN (at benchmark growth rates)
    # ----------------------------------------------------------
    p("─" * 80)
    p("4. IMPLIED TERMINAL FCF MARGIN")
    p("   (If revenue grows at X%, what FCF margin is needed?)")
    p("─" * 80)
    p()

    header = "CAGR \\ WACC  |"
    for wacc in WACC_SCENARIOS:
        header += f"   {wacc*100:.0f}%    |"
    p(header)
    p("-" * len(header))

    for cagr in rev_cagr_scenarios:
        row = f"    {cagr*100:.0f}%       |"
        for wacc in WACC_SCENARIOS:
            margin = solve_implied_fcf_margin(EV_MARKET, cagr, wacc, TERMINAL_GROWTH_RATE)
            row += f" {fmt_pct(margin)}  |"
        p(row)
    p(f"  (Terminal growth fixed at {TERMINAL_GROWTH_RATE*100:.1f}%)")
    p()

    # ----------------------------------------------------------
    # 5. TERMINAL GROWTH SENSITIVITY (Revenue CAGR × Terminal g)
    # ----------------------------------------------------------
    p("─" * 80)
    p("5. IMPLIED REVENUE CAGR — TERMINAL GROWTH SENSITIVITY")
    p("   (WACC=10%, Terminal FCF Margin=35%)")
    p("─" * 80)
    p()

    header = "  g \\ WACC    |"
    for wacc in WACC_SCENARIOS:
        header += f"   {wacc*100:.0f}%    |"
    p(header)
    p("-" * len(header))

    for tg in TERMINAL_GROWTH_SCENARIOS:
        row = f"   {tg*100:.1f}%       |"
        for wacc in WACC_SCENARIOS:
            cagr = solve_implied_cagr(EV_MARKET, 0.35, wacc, tg)
            row += f" {fmt_pct(cagr)}  |"
        p(row)
    p(f"  (Terminal FCF Margin fixed at 35%)")
    p()

    # ----------------------------------------------------------
    # 6. FORWARD PROJECTION — BASE CASE WATERFALL
    # ----------------------------------------------------------
    p("─" * 80)
    p("6. FORWARD PROJECTION WATERFALL (Base: WACC=10%, Margin=35%, g=3%)")
    p("─" * 80)
    p()

    if base_cagr:
        fy27_fcf_margin = FCF_FY27_MID / REV_FY27_MID
        p(f"{'Year':<8} {'Revenue':>12} {'FCF Margin':>12} {'FCF':>12} {'PV(FCF)':>12}")
        p("-" * 58)

        total_pv = 0
        last_fcf = 0
        for yr in range(1, 6):
            rev = REV_FY26 * (1 + base_cagr) ** yr
            weight = yr / 5
            margin = fy27_fcf_margin + (0.35 - fy27_fcf_margin) * weight
            fcf = rev * margin
            pv = fcf / (1.10) ** yr
            total_pv += pv
            last_fcf = fcf
            p(f"FY{2026+yr:<4} {fmt_bn(rev):>12} {margin*100:>10.1f}%  {fmt_bn(fcf):>12} {fmt_bn(pv):>12}")

        terminal_fcf = last_fcf * (1 + TERMINAL_GROWTH_RATE)
        tv = terminal_fcf / (0.10 - TERMINAL_GROWTH_RATE)
        pv_tv = tv / (1.10) ** 5

        p("-" * 58)
        p(f"{'PV(Explicit)':<30} {fmt_bn(total_pv):>12}")
        p(f"{'Terminal Value':<30} {fmt_bn(tv):>12}")
        p(f"{'PV(Terminal)':<30} {fmt_bn(pv_tv):>12}")
        p(f"{'Enterprise Value':<30} {fmt_bn(total_pv + pv_tv):>12}")
        p(f"{'Market EV':<30} {fmt_bn(EV_MARKET):>12}")
        p(f"{'TV as % of EV':<30} {pv_tv/(total_pv+pv_tv)*100:>10.1f}%")
    p()

    # ----------------------------------------------------------
    # 7. OWNER ECONOMICS WATERFALL
    # ----------------------------------------------------------
    p("─" * 80)
    p("7. OWNER ECONOMICS WATERFALL (Base: WACC=10%, Margin=35%, g=3%)")
    p(f"   FCF adjusted for SBC: -{SBC_PCT_REV*(1-TAX_RATE)*100:.1f}% of revenue")
    p("─" * 80)
    p()

    if owner_base:
        fy27_fcf_margin = FCF_FY27_MID / REV_FY27_MID
        p(f"{'Year':<8} {'Revenue':>12} {'FCF':>12} {'SBC(AT)':>12} {'Owner FCF':>12} {'PV':>12}")
        p("-" * 72)

        total_pv = 0
        last_owner_fcf = 0
        for yr in range(1, 6):
            rev = REV_FY26 * (1 + owner_base) ** yr
            weight = yr / 5
            margin = fy27_fcf_margin + (0.35 - fy27_fcf_margin) * weight
            fcf = rev * margin
            sbc = rev * SBC_PCT_REV
            sbc_at = sbc * (1 - TAX_RATE)
            owner_fcf = fcf - sbc_at
            pv = owner_fcf / (1.10) ** yr
            total_pv += pv
            last_owner_fcf = owner_fcf
            p(f"FY{2026+yr:<4} {fmt_bn(rev):>12} {fmt_bn(fcf):>12} {fmt_bn(sbc_at):>12} "
              f"{fmt_bn(owner_fcf):>12} {fmt_bn(pv):>12}")

        terminal = last_owner_fcf * (1 + TERMINAL_GROWTH_RATE)
        tv = terminal / (0.10 - TERMINAL_GROWTH_RATE)
        pv_tv = tv / (1.10) ** 5

        p("-" * 72)
        p(f"{'PV(Explicit)':<30} {fmt_bn(total_pv):>12}")
        p(f"{'PV(Terminal)':<30} {fmt_bn(pv_tv):>12}")
        p(f"{'Enterprise Value':<30} {fmt_bn(total_pv + pv_tv):>12}")
        p(f"{'Owner FCF Yield (Y5)':<30} {last_owner_fcf/EV_MARKET*100:>10.1f}%")
    p()

    # ----------------------------------------------------------
    # 8. KEY MULTIPLES SANITY CHECK
    # ----------------------------------------------------------
    p("─" * 80)
    p("8. MULTIPLES SANITY CHECK")
    p("─" * 80)
    p()

    ev_rev = EV_MARKET / REV_FY26
    ev_fcf = EV_MARKET / FCF_FY26
    owner_fcf_fy26 = FCF_FY26 - SBC_FY26 * (1 - TAX_RATE)
    ev_owner_fcf = EV_MARKET / owner_fcf_fy26
    fwd_ev_rev = EV_MARKET / REV_FY27_MID
    fwd_ev_fcf = EV_MARKET / FCF_FY27_MID

    p(f"  EV/Revenue (TTM):      {ev_rev:.1f}x")
    p(f"  EV/Revenue (FY27E):    {fwd_ev_rev:.1f}x")
    p(f"  EV/FCF (TTM):          {ev_fcf:.1f}x")
    p(f"  EV/FCF (FY27E):        {fwd_ev_fcf:.1f}x")
    p(f"  EV/Owner FCF (TTM):    {ev_owner_fcf:.1f}x")
    p(f"  FCF Yield (TTM):       {FCF_FY26/EV_MARKET*100:.1f}%")
    p(f"  Owner FCF Yield:       {owner_fcf_fy26/EV_MARKET*100:.1f}%")
    p(f"  SBC as % of FCF:       {SBC_FY26/FCF_FY26*100:.1f}%")
    p()

    # ----------------------------------------------------------
    # 9. VERDICT
    # ----------------------------------------------------------
    p("=" * 80)
    p("VERDICT: WHAT DOES $239 PRICE IN?")
    p("=" * 80)
    p()

    if base_cagr and owner_base:
        p(f"┌─────────────────────────────────────────────────────────┐")
        p(f"│ Standard Reverse DCF (WACC=10%, Margin=35%, g=3%):     │")
        p(f"│   Implied 5Y Revenue CAGR: {base_cagr*100:>5.1f}%                      │")
        p(f"│                                                         │")
        p(f"│ Owner Economics (FCF - SBC after tax):                  │")
        p(f"│   Implied 5Y Revenue CAGR: {owner_base*100:>5.1f}%                      │")
        p(f"│                                                         │")
        p(f"│ Benchmarks:                                             │")
        p(f"│   FY2027 Guidance:       +12.5%                         │")
        p(f"│   Analyst Consensus 5Y:  +12.0%                        │")
        p(f"│   Historical Organic:    +10-12%                        │")
        p(f"│                                                         │")

        if base_cagr < 0.10:
            verdict = "PESSIMISM — Below historical organic growth"
            p(f"│ → Market is pricing in PESSIMISM                        │")
            p(f"│   Implied growth is BELOW even historical organic rate   │")
        elif base_cagr < BENCHMARK_FY27_GUIDANCE_CAGR - 0.01:
            verdict = "MILD PESSIMISM — Below guidance but near organic"
            p(f"│ → Market is pricing MILD PESSIMISM                      │")
            p(f"│   Below guidance, near historical organic range          │")
        elif base_cagr < BENCHMARK_FY27_GUIDANCE_CAGR + 0.01:
            verdict = "ROUGHLY FAIR — Near guidance"
            p(f"│ → Market is pricing ROUGHLY FAIR                        │")
            p(f"│   Implied growth ≈ management guidance                  │")
        else:
            verdict = "OPTIMISM — Above guidance"
            p(f"│ → Market is pricing in OPTIMISM                         │")
            p(f"│   Implied growth ABOVE management guidance               │")

        p(f"│                                                         │")
        p(f"│ Key risk: SBC at {SBC_PCT_REV*100:.1f}% of revenue means Owner FCF     │")
        p(f"│   yield is only {owner_fcf_fy26/EV_MARKET*100:.1f}% vs reported {FCF_FY26/EV_MARKET*100:.1f}% FCF yield     │")
        p(f"└─────────────────────────────────────────────────────────┘")
    p()

    return output.getvalue()


if __name__ == "__main__":
    result = run_model()
    print(result)

    # Save to file
    output_path = "/Users/milton/投资大师/.worktrees/金融基础设施/reports/ADSK/data/reverse_dcf_output.txt"
    with open(output_path, "w") as f:
        f.write(result)
    print(f"\n[Output saved to {output_path}]")
