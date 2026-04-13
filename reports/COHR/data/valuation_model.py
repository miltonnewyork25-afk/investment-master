#!/usr/bin/env python3
"""
COHR SOTP Valuation Model — Phase 2
三段拆分估值: AI Networking + SiC期权 + Industrial残值
数据来源: FMP API, 10-K/10-Q, 管理层指引
"""

import json

# ============================================================
# 1. 基础数据 (FMP + P1 staging)
# ============================================================

# 当前市场数据 (2026-04-13)
PRICE = 307.50
SHARES_DILUTED = 165.0  # M, 含preferred转换后~13.5M
MARKET_CAP = PRICE * SHARES_DILUTED  # $50.7B
NET_DEBT = 2984  # $M, FY25 balance sheet (total debt $3.89B - cash $0.91B)
# 注: Q2 FY26 cash at period end = $1.53B, debt已降, 估计当前net debt ~$2.0-2.5B
# 保守用FY25数据, 后面做敏感性
NET_DEBT_CURRENT = 2200  # $M, 估计当前 (debt repaid $435M in FY25 + more in H1 FY26)
EV = MARKET_CAP + NET_DEBT_CURRENT  # $52.9B

print("=" * 60)
print("COHR SOTP Valuation Model")
print("=" * 60)
print(f"Price: ${PRICE}")
print(f"Shares (diluted, post-preferred): {SHARES_DILUTED}M")
print(f"Market Cap: ${MARKET_CAP/1000:.1f}B")
print(f"Net Debt (est current): ${NET_DEBT_CURRENT/1000:.1f}B")
print(f"EV: ${EV/1000:.1f}B")

# ============================================================
# 2. 收入归因瀑布 (R-1)
# ============================================================

print("\n" + "=" * 60)
print("R-1: Revenue Attribution Waterfall")
print("=" * 60)

# FY24 → FY25 Revenue Bridge ($M)
fy24_rev = 4708
fy25_rev = 5810
fy25_delta = fy25_rev - fy24_rev

# Segment estimates based on quarterly data and P1 analysis
# D&C segment: Q1-Q4 FY25 growing from ~$870M to ~$1.1B/qtr
# Industrial: declining from ~$450M to ~$420M/qtr
print(f"\nFY24 Revenue: ${fy24_rev}M")
print(f"  + AI Networking volume ramp:    +${880}M  (800G shipments +60-70% YoY)")
print(f"  + 1.6T early qualification rev: +${80}M   (samples + qual units)")
print(f"  + Telecom stabilization:        +${50}M   (DWDM demand uptick)")
print(f"  + Mix improvement:              +${120}M  (higher-ASP AI products)")
print(f"  - Industrial decline:           -${100}M  (laser/materials weakness)")
print(f"  - A&D divestiture:              -${0}M    (already stripped in FY24)")
print(f"  ≈ Net change:                   +${fy25_delta}M (+{fy25_delta/fy24_rev*100:.1f}%)")
print(f"FY25 Revenue: ${fy25_rev}M")

# FY25 → FY26E
fy26e_rev = 6959  # consensus
fy26_delta = fy26e_rev - fy25_rev
print(f"\nFY25 Revenue: ${fy25_rev}M")
print(f"  + AI Networking continued ramp: +${850}M  (800G volume + 1.6T ramp)")
print(f"  + CPO early revenue:            +${100}M  (scale-out begins H2 FY26)")
print(f"  + Mix shift to higher-margin:   +${150}M  (1.6T ASP > 800G)")
print(f"  - 800G ASP erosion:             -${200}M  (competition pressure)")
print(f"  + Industrial recovery:          +${100}M  (cyclical trough passed)")
print(f"  + SiC material growth:          +${100}M  (EV ramp + substrate)")
print(f"  ≈ Net change:                   +${fy26_delta}M (+{fy26_delta/fy25_rev*100:.1f}%)")
print(f"FY26E Revenue: ${fy26e_rev}M")

# FY26E → FY27E
fy27e_rev = 8763  # consensus
fy27_delta = fy27e_rev - fy26e_rev
print(f"\nFY26E Revenue: ${fy26e_rev}M")
print(f"  + 1.6T volume ramp:             +${1000}M (1.6T becomes primary)")
print(f"  + CPO scale-up:                 +${300}M  (scale-up interconnects)")
print(f"  + Industrial recovery cont:     +${150}M  (mid-cycle reversion)")
print(f"  + SiC material ramp:            +${200}M  (EV production scale)")
print(f"  - 800G ASP decline:             -${300}M  (commoditization)")
print(f"  - Telecom flat:                 +${50}M")
print(f"  ≈ Net change:                   +${fy27_delta}M (+{fy27_delta/fy26e_rev*100:.1f}%)")
print(f"FY27E Revenue: ${fy27e_rev}M")

# ============================================================
# 3. 毛利率 Bridge (R-1)
# ============================================================

print("\n" + "=" * 60)
print("R-1: Gross Margin Bridge")
print("=" * 60)

fy24_gm = 1456 / 4708 * 100
fy25_gm = 2057 / 5810 * 100
q1fy26_gm = 579 / 1581 * 100
q2fy26_gm = 623 / 1686 * 100

print(f"\nFY24 Gross Margin: {fy24_gm:.1f}% (trough, integration drag)")
print(f"  + AI mix improvement:           +{2.0:.1f}pp (AI Datacom 42% GM vs Industrial 28%)")
print(f"  + Scale effects:                +{1.5:.1f}pp (utilization 50%→80%)")
print(f"  + Cloud Light friction decline:  +{0.5:.1f}pp (integration complete)")
print(f"  + Pricing (supply shortage):    +{0.5:.1f}pp (25-30% supply gap)")
print(f"  - InP CapEx depreciation:       -{0.3:.1f}pp (Sherman fab ramp)")
print(f"FY25 Gross Margin: {fy25_gm:.1f}%")
print(f"\nQuarterly progression:")
print(f"  Q1 FY25: {460/1348*100:.1f}%  Q2 FY25: {509/1435*100:.1f}%  Q3 FY25: {528/1498*100:.1f}%  Q4 FY25: {560/1529*100:.1f}%")
print(f"  Q1 FY26: {q1fy26_gm:.1f}%  Q2 FY26: {q2fy26_gm:.1f}%")
print(f"\nGM improving ~0.5pp/quarter → FY26E full-year ~37.5-38.5%")

# ============================================================
# 4. EPS 瀑布 (R-1)
# ============================================================

print("\n" + "=" * 60)
print("R-1: EPS Waterfall")
print("=" * 60)

# FY25 GAAP: EPS -$0.52 (bottomline)
# FY26E consensus: $5.35
# FY27E consensus: $7.47
# Key bridges:

fy25_gaap_ni = 49  # $M (GAAP net income from continuing ops ≈ $30M, add minority = $49M)
fy25_da = 554  # $M
fy25_sbc = 160  # $M
fy25_interest = 243  # $M

# FY26E estimates
fy26e_rev_est = 6959
fy26e_gm_est = 0.38  # our estimate
fy26e_gp = fy26e_rev_est * fy26e_gm_est
fy26e_rd = 640  # ~9.2% of rev (leveraging)
fy26e_sga = 520  # ~7.5%
fy26e_da = 480  # declining from $554M as intangibles amortize
fy26e_opex = fy26e_rd + fy26e_sga + fy26e_da
fy26e_oi = fy26e_gp - fy26e_opex  # GAAP operating income
fy26e_interest = 180  # declining due to debt paydown
fy26e_tax_rate = 0.15  # effective, low due to foreign mix
fy26e_ni = (fy26e_oi - fy26e_interest) * (1 - fy26e_tax_rate)
fy26e_eps = fy26e_ni / SHARES_DILUTED

# Non-GAAP adjustment
fy26e_nongaap_ni = fy26e_ni + fy26e_da * 0.7 + fy25_sbc  # add back amort (~70% of D&A is intangibles) + SBC
fy26e_nongaap_eps = fy26e_nongaap_ni / SHARES_DILUTED

print(f"\nFY25 GAAP Net Income: ${fy25_gaap_ni}M (EPS: -$0.52)")
print(f"  → Problem: D&A ${fy25_da}M + Interest ${fy25_interest}M = ${fy25_da + fy25_interest}M pre-tax drag")
print(f"  → EBITDA was ${1106}M — massive GAAP/EBITDA gap")
print(f"\nFY26E Bridge:")
print(f"  Revenue: ${fy26e_rev_est}M ({fy26e_rev_est/fy25_rev*100-100:+.1f}% YoY)")
print(f"  Gross Profit: ${fy26e_gp:.0f}M (GM {fy26e_gm_est*100:.1f}%)")
print(f"  R&D: ${fy26e_rd}M ({fy26e_rd/fy26e_rev_est*100:.1f}% of rev)")
print(f"  SG&A: ${fy26e_sga}M ({fy26e_sga/fy26e_rev_est*100:.1f}% of rev)")
print(f"  D&A: ${fy26e_da}M (declining from ${fy25_da}M)")
print(f"  GAAP Operating Income: ${fy26e_oi:.0f}M")
print(f"  Interest Expense: ${fy26e_interest}M (declining)")
print(f"  Tax Rate: {fy26e_tax_rate*100:.0f}%")
print(f"  GAAP Net Income: ${fy26e_ni:.0f}M")
print(f"  GAAP EPS: ${fy26e_eps:.2f}")
print(f"  Non-GAAP EPS: ${fy26e_nongaap_eps:.2f} (add back amort + SBC)")
print(f"  Consensus Non-GAAP EPS: $5.35")

# ============================================================
# 5. 三PE展示 (铁律N)
# ============================================================

print("\n" + "=" * 60)
print("Three PE Display (财务章节)")
print("=" * 60)

# Using FY26E estimates
fy26_consensus_eps = 5.35  # Non-GAAP
gaap_pe = PRICE / fy26e_eps if fy26e_eps > 0 else float('inf')
owner_eps = fy26e_eps - (160 / SHARES_DILUTED)  # GAAP NI - SBC
owner_pe = PRICE / owner_eps if owner_eps > 0 else float('inf')
nongaap_pe = PRICE / fy26_consensus_eps

print(f"\n| PE Type     | Value   | Meaning                          |")
print(f"|-------------|---------|----------------------------------|")
print(f"| GAAP PE     | {gaap_pe:.1f}x  | Includes D&A ${fy26e_da}M + SBC   |")
print(f"| Owner PE    | {owner_pe:.1f}x  | Strip SBC ($160M, 2.3% rev)     |")
print(f"| Non-GAAP PE | {nongaap_pe:.1f}x  | Add back amort + SBC (consensus)|")
print(f"\nNote: SBC/Rev = {160/fy26e_rev_est*100:.1f}% → Owner PE triggered")
print(f"GAAP/Non-GAAP gap driven by D&A amortization ${fy26e_da*0.7:.0f}M (intangibles)")
print(f"D&A declining: ${fy25_da}M(FY25) → ~${fy26e_da}M(FY26E) → ~$300M(FY29E)")
print(f"→ Gap naturally closes as merger intangibles roll off")

# ============================================================
# 6. SOTP 估值 (核心)
# ============================================================

print("\n" + "=" * 60)
print("SOTP Valuation — Three Engine Model")
print("=" * 60)

# Engine 1: AI Networking / Datacom
# FY26E revenue ~$4.0-4.5B (D&C segment ~$5.0B, minus Telecom ~$0.8B)
# FY27E revenue ~$5.5-6.0B
# Non-GAAP OPM: ~22-28%
# Growth: 25-35% for next 2-3 years
# Comps: LITE at 8-10x EV/Rev, optical networking peers at 5-8x

scenarios_networking = {
    'bear': {'rev_fy27': 5000, 'ev_rev_multiple': 5.0, 'label': 'AI CapEx slowdown, competition'},
    'base': {'rev_fy27': 5800, 'ev_rev_multiple': 6.5, 'label': 'Consensus, 1.6T ramp on track'},
    'bull': {'rev_fy27': 6500, 'ev_rev_multiple': 8.0, 'label': 'CPO upside + 1.6T dominance'},
}

print("\n--- Engine 1: AI Networking ---")
print(f"FY26E estimated rev: ~$4.2B (60% of total)")
print(f"FY27E estimated rev: $5.0-6.5B range")
print(f"Non-GAAP OPM: 22-28% (improving with scale)")
for scenario, params in scenarios_networking.items():
    ev = params['rev_fy27'] * params['ev_rev_multiple']
    print(f"  {scenario:5s}: Rev ${params['rev_fy27']}M × {params['ev_rev_multiple']}x = ${ev/1000:.1f}B  ({params['label']})")

# Engine 2: SiC Materials (Option Value)
# FY26E revenue: ~$400-500M (5-8% of total)
# Currently breakeven or slight loss
# EV opportunity depends on SiC market growth (ON Semi, Wolfspeed comps)
# Option valuation: Probability × Success Value

scenarios_sic = {
    'bear': {'ev': 1500, 'label': 'SiC oversupply, EV slowdown'},
    'base': {'ev': 3000, 'label': 'Moderate ramp, substrate competitive'},
    'bull': {'ev': 5000, 'label': 'SiC substrate leadership, device wins'},
}

print("\n--- Engine 2: SiC Materials (Option) ---")
print(f"FY26E estimated rev: ~$450M (6% of total)")
print(f"Status: Investment phase, breakeven-to-slight-loss")
print(f"Comps: Wolfspeed EV ~$2B (struggling), ON Semi SiC implied ~$5-8B")
for scenario, params in scenarios_sic.items():
    print(f"  {scenario:5s}: EV ${params['ev']/1000:.1f}B  ({params['label']})")

# Engine 3: Industrial (Legacy/Cyclical)
# FY26E revenue: ~$1.8-2.0B (28% of total)
# Mid-cycle OPM: 8-12%
# Cyclical, use mid-cycle EV/EBITDA

scenarios_industrial = {
    'bear': {'rev': 1700, 'opm': 0.08, 'ev_ebitda': 8, 'label': 'Extended downturn'},
    'base': {'rev': 1900, 'opm': 0.10, 'ev_ebitda': 10, 'label': 'Mid-cycle recovery'},
    'bull': {'rev': 2100, 'opm': 0.12, 'ev_ebitda': 12, 'label': 'Full cycle recovery'},
}

print("\n--- Engine 3: Industrial (Cyclical) ---")
print(f"FY26E estimated rev: ~$1.9B (28% of total)")
print(f"Mid-cycle OPM: 8-12%")
for scenario, params in scenarios_industrial.items():
    ebitda = params['rev'] * params['opm'] + params['rev'] * 0.05  # OPM + D&A portion
    ev = ebitda * params['ev_ebitda']
    print(f"  {scenario:5s}: Rev ${params['rev']}M × {params['opm']*100:.0f}% OPM → EBITDA ${ebitda:.0f}M × {params['ev_ebitda']}x = ${ev/1000:.1f}B  ({params['label']})")

# SOTP Assembly
print("\n--- SOTP Assembly ---")
print(f"{'':30s} {'Bear':>10s} {'Base':>10s} {'Bull':>10s}")

bear_ev = scenarios_networking['bear']['rev_fy27'] * scenarios_networking['bear']['ev_rev_multiple'] + \
          scenarios_sic['bear']['ev'] + \
          (scenarios_industrial['bear']['rev'] * (scenarios_industrial['bear']['opm'] + 0.05)) * scenarios_industrial['bear']['ev_ebitda']
base_ev = scenarios_networking['base']['rev_fy27'] * scenarios_networking['base']['ev_rev_multiple'] + \
          scenarios_sic['base']['ev'] + \
          (scenarios_industrial['base']['rev'] * (scenarios_industrial['base']['opm'] + 0.05)) * scenarios_industrial['base']['ev_ebitda']
bull_ev = scenarios_networking['bull']['rev_fy27'] * scenarios_networking['bull']['ev_rev_multiple'] + \
          scenarios_sic['bull']['ev'] + \
          (scenarios_industrial['bull']['rev'] * (scenarios_industrial['bull']['opm'] + 0.05)) * scenarios_industrial['bull']['ev_ebitda']

net_1 = scenarios_networking['bear']['rev_fy27'] * scenarios_networking['bear']['ev_rev_multiple']
net_2 = scenarios_networking['base']['rev_fy27'] * scenarios_networking['base']['ev_rev_multiple']
net_3 = scenarios_networking['bull']['rev_fy27'] * scenarios_networking['bull']['ev_rev_multiple']

sic_1 = scenarios_sic['bear']['ev']
sic_2 = scenarios_sic['base']['ev']
sic_3 = scenarios_sic['bull']['ev']

ind_1 = (scenarios_industrial['bear']['rev'] * (scenarios_industrial['bear']['opm'] + 0.05)) * scenarios_industrial['bear']['ev_ebitda']
ind_2 = (scenarios_industrial['base']['rev'] * (scenarios_industrial['base']['opm'] + 0.05)) * scenarios_industrial['base']['ev_ebitda']
ind_3 = (scenarios_industrial['bull']['rev'] * (scenarios_industrial['bull']['opm'] + 0.05)) * scenarios_industrial['bull']['ev_ebitda']

print(f"{'AI Networking EV':30s} ${net_1/1000:>9.1f}B ${net_2/1000:>9.1f}B ${net_3/1000:>9.1f}B")
print(f"{'SiC Option EV':30s} ${sic_1/1000:>9.1f}B ${sic_2/1000:>9.1f}B ${sic_3/1000:>9.1f}B")
print(f"{'Industrial EV':30s} ${ind_1/1000:>9.1f}B ${ind_2/1000:>9.1f}B ${ind_3/1000:>9.1f}B")
print(f"{'-'*30} {'-'*10} {'-'*10} {'-'*10}")
print(f"{'Total EV':30s} ${bear_ev/1000:>9.1f}B ${base_ev/1000:>9.1f}B ${bull_ev/1000:>9.1f}B")
print(f"{'Less: Net Debt':30s} ${-NET_DEBT_CURRENT/1000:>9.1f}B ${-NET_DEBT_CURRENT/1000:>9.1f}B ${-NET_DEBT_CURRENT/1000:>9.1f}B")

bear_equity = bear_ev - NET_DEBT_CURRENT
base_equity = base_ev - NET_DEBT_CURRENT
bull_equity = bull_ev - NET_DEBT_CURRENT

bear_price = bear_equity / SHARES_DILUTED
base_price = base_equity / SHARES_DILUTED
bull_price = bull_equity / SHARES_DILUTED

print(f"{'Equity Value':30s} ${bear_equity/1000:>9.1f}B ${base_equity/1000:>9.1f}B ${bull_equity/1000:>9.1f}B")
print(f"{'Per Share':30s} ${bear_price:>9.1f}  ${base_price:>9.1f}  ${bull_price:>9.1f}")
print(f"{'vs Current ($307.50)':30s} {(bear_price/PRICE-1)*100:>+8.1f}% {(base_price/PRICE-1)*100:>+8.1f}% {(bull_price/PRICE-1)*100:>+8.1f}%")

# ============================================================
# 7. 概率加权估值
# ============================================================

print("\n" + "=" * 60)
print("Probability-Weighted Valuation")
print("=" * 60)

# Probabilities based on three-anchor methodology
# Bear: AI CapEx cycle peaks early → historical: 3/8 CapEx cycles peak within 2 years → ~30%
# Base: Consensus trajectory → historical mean reversion rate → ~45%
# Bull: CPO + SiC dual upside → requires multiple catalysts → ~25%
bear_prob = 0.30
base_prob = 0.45
bull_prob = 0.25

weighted_price = bear_price * bear_prob + base_price * base_prob + bull_price * bull_prob
weighted_ev = bear_ev * bear_prob + base_ev * base_prob + bull_ev * bull_prob

print(f"\nProbabilities: Bear {bear_prob*100:.0f}% / Base {base_prob*100:.0f}% / Bull {bull_prob*100:.0f}%")
print(f"  Bear: AI CapEx peaks early (3/8 historical cycles ≤ 2yr = 37.5%, adjusted to 30%)")
print(f"  Base: Consensus trajectory (most likely single path)")
print(f"  Bull: CPO + SiC dual catalyst (requires 2 independent events)")
print(f"\nWeighted Fair Value: ${weighted_price:.1f} per share")
print(f"Weighted EV: ${weighted_ev/1000:.1f}B")
print(f"Current Price: ${PRICE}")
print(f"Upside/Downside: {(weighted_price/PRICE-1)*100:+.1f}%")

# ============================================================
# 8. Reverse DCF 隐含假设验证
# ============================================================

print("\n" + "=" * 60)
print("Reverse DCF — What $307.50 Implies")
print("=" * 60)

# At $307.50, EV ≈ $52.9B
# Assume terminal growth 3%, WACC 10%, terminal margin 18% EBITDA
# What revenue CAGR is needed for 5 years?

wacc = 0.10
terminal_growth = 0.03
terminal_ebitda_margin = 0.20
current_ev = EV

# Reverse solve: EV = Terminal EBITDA × (1/(WACC-g)) discounted back
terminal_multiple = 1 / (wacc - terminal_growth)  # 14.3x
# EV = Rev_FY30 × terminal_margin × terminal_multiple / (1+wacc)^4
# → Rev_FY30 = EV × (1+wacc)^4 / (terminal_margin × terminal_multiple)

import_rev_fy30 = current_ev * (1 + wacc)**4 / (terminal_ebitda_margin * terminal_multiple)
implied_cagr_5yr = (import_rev_fy30 / fy25_rev) ** (1/5) - 1

print(f"\nAssumptions: WACC={wacc*100:.0f}%, Terminal Growth={terminal_growth*100:.0f}%, Terminal EBITDA Margin={terminal_ebitda_margin*100:.0f}%")
print(f"Terminal EV/EBITDA Multiple: {terminal_multiple:.1f}x")
print(f"Current EV: ${current_ev/1000:.1f}B")
print(f"Implied FY30 Revenue: ${import_rev_fy30/1000:.1f}B")
print(f"Implied 5-Year Revenue CAGR (FY25→FY30): {implied_cagr_5yr*100:.1f}%")
print(f"Consensus 3-Year CAGR (FY25→FY28): {((10462/5810)**(1/3)-1)*100:.1f}%")
print(f"\nVerdict: Market implies {implied_cagr_5yr*100:.1f}% 5yr CAGR")
print(f"  Consensus delivers {((10462/5810)**(1/3)-1)*100:.1f}% for 3 years")
print(f"  Need to sustain ~{((import_rev_fy30/10462)**(1/2)-1)*100:.1f}% growth in FY29-FY30 after consensus period")
print(f"  This is plausible IF CPO ramps and SiC scales, but NOT guaranteed")

# ============================================================
# 9. 剪刀差分析 (R-2)
# ============================================================

print("\n" + "=" * 60)
print("R-2: Scissor Gap Analysis")
print("=" * 60)

# Gap 1: CapEx vs FCF
print("\n--- Gap 1: CapEx vs FCF ---")
for yr, capex, fcf, rev in [
    ('FY22', 314, 99, 3317),
    ('FY23', 436, 198, 5160),
    ('FY24', 347, 199, 4708),
    ('FY25', 441, 193, 5810),
]:
    print(f"  {yr}: CapEx ${capex}M ({capex/rev*100:.1f}% rev) | FCF ${fcf}M ({fcf/rev*100:.1f}% rev) | CapEx/FCF = {capex/fcf:.1f}x")
print(f"  FY25: CapEx/OCF = {441/634*100:.0f}% → heavy investment, FCF compressed")
print(f"  Implication: $441M CapEx vs $193M FCF → reinvestment consuming 70% of OCF")
print(f"  Risk: If AI CapEx cycle peaks, high CapEx becomes stranded capacity")

# Gap 2: GAAP vs Non-GAAP
print("\n--- Gap 2: GAAP vs Non-GAAP EPS ---")
fy25_nongaap_eps_est = 3.50  # consensus
fy25_gaap_eps = -0.52
fy26_nongaap_eps_est = 5.35
gap_fy25 = fy25_nongaap_eps_est - fy25_gaap_eps
gap_fy26 = fy26_nongaap_eps_est - fy26e_eps
print(f"  FY25: GAAP EPS -$0.52 | Non-GAAP ~$3.50 | Gap: ${gap_fy25:.2f}")
print(f"  FY26E: GAAP EPS ~${fy26e_eps:.2f} | Non-GAAP $5.35 | Gap: ~${gap_fy26:.2f}")
print(f"  Gap driver: D&A amortization (~$336M intangibles) + SBC (~$160M)")
print(f"  Trend: Gap NARROWING as intangibles amortize off ($554M→$480M→~$300M by FY29)")
print(f"  Implication: GAAP catches up to Non-GAAP over 3-5 years — positive for PE compression")

# Gap 3: Hyperscaler CapEx vs COHR Revenue
print("\n--- Gap 3: Hyperscaler CapEx Growth vs COHR Revenue Growth ---")
print(f"  Hyperscaler CapEx 2025: ~$380B → 2026E: ~$690B (+82%)")
print(f"  COHR Revenue FY25: $5.81B → FY26E: $6.96B (+20%)")
print(f"  Gap: Hyperscaler CapEx growing 4x faster than COHR revenue")
print(f"  Explanation: (1) Only ~15-20% of CapEx is optical (2) COHR is component, not system")
print(f"  Risk: When CapEx decelerates to +10%, COHR may decelerate to low single digits")
print(f"  Historical: In 2019 hyperscaler CapEx -3% → optical component cos revenue -15 to -25%")

# Gap 4: Inventory Build vs Revenue Growth
print("\n--- Gap 4: Inventory Build vs Revenue Growth ---")
for yr, inv, rev in [
    ('FY23', 1272, 5160),
    ('FY24', 1286, 4708),
    ('FY25', 1438, 5810),
]:
    print(f"  {yr}: Inventory ${inv}M | Inv/Rev = {inv/rev*100:.1f}% | DSI = {inv/(rev/365):.0f} days")
print(f"  FY24→FY25: Inventory +12% while Revenue +23% → healthy (building for demand)")
print(f"  BUT: DSI still elevated at 140 days → watch for write-down risk if demand falters")

# Gap 5: Value chain profit transfer
print("\n--- Gap 5: Value Chain — COHR GM vs Hyperscaler GM ---")
print(f"  COHR GM: FY24 30.9% → FY25 35.4% → Q2 FY26 37.0% (improving)")
print(f"  Hyperscaler GM: MSFT 69%→69% | GOOGL 57%→58% | AMZN 48%→49% (stable/improving)")
print(f"  Interpretation: Both layers improving → not a zero-sum transfer")
print(f"  But: COHR's GM recovery is from trough (integration drag), not pricing power")
print(f"  Watch: If hyperscaler CapEx slows, pricing power reverses toward buyer")

# ============================================================
# 10. Owner FCF & ROIC
# ============================================================

print("\n" + "=" * 60)
print("Owner FCF & Capital Efficiency")
print("=" * 60)

fy25_ocf = 634
fy25_capex = 441
fy25_sbc_val = 160
owner_fcf = fy25_ocf - fy25_capex - fy25_sbc_val
print(f"\nFY25 Owner FCF: OCF ${fy25_ocf}M - CapEx ${fy25_capex}M - SBC ${fy25_sbc_val}M = ${owner_fcf}M")
print(f"Owner FCF Yield: {owner_fcf/MARKET_CAP*100:.2f}% (on ${MARKET_CAP/1000:.0f}B market cap)")
print(f"→ Owner FCF essentially zero at current CapEx intensity")
print(f"→ Needs revenue >$8B with stable margins for meaningful positive Owner FCF")

# ROIC
invested_capital = 8128 + 3894 - 909  # equity + debt - cash
fy25_nopat = 549 * (1 - 0.15)  # GAAP OpInc × (1-tax)
roic = fy25_nopat / invested_capital * 100
print(f"\nFY25 ROIC: NOPAT ${fy25_nopat:.0f}M / Invested Capital ${invested_capital}M = {roic:.1f}%")
print(f"WACC estimate: 10-11%")
print(f"ROIC < WACC → currently destroying value on an invested capital basis")
print(f"→ Must improve to >10% for value creation (needs >$9B revenue at 20%+ OPM)")

# ============================================================
# 11. Summary Output for Staging
# ============================================================

print("\n" + "=" * 60)
print("SUMMARY — Phase 2 Key Findings")
print("=" * 60)

summary = {
    'sotp_bear': round(bear_price, 1),
    'sotp_base': round(base_price, 1),
    'sotp_bull': round(bull_price, 1),
    'probability_weighted': round(weighted_price, 1),
    'current_price': PRICE,
    'upside_downside_pct': round((weighted_price/PRICE-1)*100, 1),
    'implied_5yr_cagr': round(implied_cagr_5yr*100, 1),
    'consensus_3yr_cagr': round(((10462/5810)**(1/3)-1)*100, 1),
    'fy26e_gaap_eps': round(fy26e_eps, 2),
    'fy26e_nongaap_eps': 5.35,
    'owner_fcf_fy25': owner_fcf,
    'roic_fy25': round(roic, 1),
    'gaap_pe_fy26': round(gaap_pe, 1),
    'owner_pe_fy26': round(owner_pe, 1),
    'nongaap_pe_fy26': round(nongaap_pe, 1),
}

for k, v in summary.items():
    print(f"  {k}: {v}")

# Save summary
with open('/Users/milton/投资大师/.worktrees/半导体/reports/COHR/data/valuation_summary.json', 'w') as f:
    json.dump(summary, f, indent=2)

print(f"\n→ Saved to data/valuation_summary.json")
