"""
NET (Cloudflare) — DCF + SOTP + 可比 + 敏感性 估值模型
Phase 2 Python验证 (铁律G6: LLM不能做算术)
"""

import numpy as np

# ========== 基础数据 (FMP FY2025) ==========
REV_FY25 = 2168      # $M
GM_FY25 = 0.744      # 74.4%
OPM_GAAP_FY25 = -0.094
FCF_FY25 = 324       # $M
SBC_FY25 = 451       # $M
CAPEX_FY25 = 343     # $M
DA_FY25 = 291        # $M
SHARES = 351         # M diluted
PRICE = 203.07
MCAP = PRICE * SHARES  # $71,278M
CASH = 4101          # $M (cash + ST investments)
DEBT = 3700          # $M
EV = MCAP + DEBT - CASH  # $70,877M

# WACC计算
RF = 0.043           # 10Y UST
BETA = 2.028
ERP = 0.045          # baggers_summary
COST_EQUITY = RF + BETA * ERP  # = 13.4%
COST_DEBT = 0.05     # 估计(可转债利率较低)
TAX = 0.15           # 有效税率(亏损状态, 实际更低)
DEBT_RATIO = DEBT / (MCAP + DEBT)  # ~5%
WACC = COST_EQUITY * (1 - DEBT_RATIO) + COST_DEBT * (1 - TAX) * DEBT_RATIO
print(f"WACC = {WACC*100:.1f}%")
print(f"  Cost of Equity: {COST_EQUITY*100:.1f}% (Rf={RF*100:.1f}% + β={BETA:.2f} × ERP={ERP*100:.1f}%)")
print(f"  Cost of Debt: {COST_DEBT*100:.1f}% (after tax)")
print(f"  Debt Ratio: {DEBT_RATIO*100:.1f}%")

# ========== 1. DCF模型 — 3情景 ==========
print(f"\n{'='*70}")
print("1. DCF模型 — Bull/Base/Bear 3情景")
print(f"{'='*70}")

def dcf_model(name, rev_growth_path, terminal_opm, sbc_path, terminal_g=0.03):
    """
    rev_growth_path: list of 10 years growth rates
    terminal_opm: terminal operating margin (Non-GAAP)
    sbc_path: list of 10 years SBC/Rev ratios
    """
    rev = REV_FY25
    total_pv = 0

    print(f"\n--- {name} ---")
    print(f"{'Year':>6} {'Rev($M)':>10} {'Growth':>8} {'OPM':>8} {'SBC%':>8} {'OwnerFCF':>10} {'PV':>10}")

    for yr in range(1, 11):
        g = rev_growth_path[yr-1] if yr <= len(rev_growth_path) else rev_growth_path[-1]
        rev *= (1 + g)

        # OPM线性改善
        opm = OPM_GAAP_FY25 + (terminal_opm - OPM_GAAP_FY25) * (yr / 10)

        # SBC
        sbc_ratio = sbc_path[yr-1] if yr <= len(sbc_path) else sbc_path[-1]

        # FCF = Rev × OPM × (1-tax) + D&A - CapEx (简化)
        nopat = rev * opm * (1 - TAX)
        # 假设CapEx/Rev逐年降低, D&A跟随
        capex_ratio = 0.16 - (0.16 - 0.10) * (yr / 10)
        fcf = nopat + rev * 0.12 - rev * capex_ratio  # D&A ~ 12% of rev

        # Owner FCF
        sbc = rev * sbc_ratio
        owner_fcf = fcf - sbc

        pv = owner_fcf / (1 + WACC) ** yr
        total_pv += pv

        if yr <= 5 or yr == 10:
            print(f"  FY{2025+yr:>4} {rev:>10,.0f} {g*100:>7.1f}% {opm*100:>7.1f}% {sbc_ratio*100:>7.1f}% {owner_fcf:>10,.0f} {pv:>10,.0f}")

    # Terminal value
    terminal_fcf = rev * terminal_opm * (1 - TAX) * 0.7  # 70% FCF conversion
    terminal_sbc = rev * sbc_path[-1]
    terminal_owner = terminal_fcf - terminal_sbc
    tv = terminal_owner / (WACC - terminal_g)
    tv_pv = tv / (1 + WACC) ** 10
    total_pv += tv_pv

    equity_value = total_pv + CASH - DEBT
    per_share = equity_value / SHARES
    upside = (per_share - PRICE) / PRICE * 100

    print(f"\n  Terminal Value PV: ${tv_pv:,.0f}M")
    print(f"  Total PV of FCF:  ${total_pv:,.0f}M")
    print(f"  + Cash:           ${CASH:,.0f}M")
    print(f"  - Debt:           ${DEBT:,.0f}M")
    print(f"  Equity Value:     ${equity_value:,.0f}M")
    print(f"  Per Share:        ${per_share:.2f}")
    print(f"  vs Current $203:  {upside:+.1f}%")

    return per_share, upside

# Bull: 高增速持续 + SBC收敛快 + 高终端利润
bull_growth = [0.30, 0.28, 0.26, 0.24, 0.22, 0.20, 0.18, 0.16, 0.14, 0.12]
bull_sbc = [0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.12]
bull_ps, bull_up = dcf_model("Bull Case (30%概率)", bull_growth, 0.28, bull_sbc)

# Base: 共识增速 + SBC缓慢收敛 + 中等终端利润
base_growth = [0.28, 0.25, 0.22, 0.20, 0.18, 0.16, 0.14, 0.12, 0.10, 0.08]
base_sbc = [0.21, 0.21, 0.20, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.15]
base_ps, base_up = dcf_model("Base Case (45%概率)", base_growth, 0.22, base_sbc)

# Bear: 增速放缓 + SBC不收敛 + 低终端利润
bear_growth = [0.25, 0.20, 0.17, 0.14, 0.12, 0.10, 0.08, 0.07, 0.06, 0.05]
bear_sbc = [0.22, 0.22, 0.22, 0.21, 0.21, 0.20, 0.20, 0.19, 0.19, 0.18]
bear_ps, bear_up = dcf_model("Bear Case (20%概率)", bear_growth, 0.16, bear_sbc)

# Black Swan
bswan_ps = bull_ps * 0.3  # 重大事故/竞争颠覆 → 估值打3折
bswan_up = (bswan_ps - PRICE) / PRICE * 100
print(f"\n--- Black Swan (5%概率) ---")
print(f"  Per Share: ${bswan_ps:.2f} (Bull × 0.3)")
print(f"  vs Current: {bswan_up:+.1f}%")

# 概率加权
pw_value = bull_ps * 0.30 + base_ps * 0.45 + bear_ps * 0.20 + bswan_ps * 0.05
pw_up = (pw_value - PRICE) / PRICE * 100
print(f"\n{'='*70}")
print(f"概率加权估值")
print(f"{'='*70}")
print(f"  Bull  ${bull_ps:>8.2f} × 30% = ${bull_ps*0.30:>8.2f}")
print(f"  Base  ${base_ps:>8.2f} × 45% = ${base_ps*0.45:>8.2f}")
print(f"  Bear  ${bear_ps:>8.2f} × 20% = ${bear_ps*0.20:>8.2f}")
print(f"  BSwn  ${bswan_ps:>8.2f} ×  5% = ${bswan_ps*0.05:>8.2f}")
print(f"  ─────────────────────────────────")
print(f"  PW Value: ${pw_value:.2f}/股")
print(f"  vs $203:  {pw_up:+.1f}%")

# ========== 2. 可比估值 ==========
print(f"\n{'='*70}")
print("2. 可比公司估值")
print(f"{'='*70}")

comps = {
    'NET':    {'rev': 2168, 'growth': 30, 'ev_sales': 33.0, 'fcf_margin': 15.0, 'sbc_rev': 20.8, 'rule40': 45},
    'DDOG':   {'rev': 2500, 'growth': 28, 'ev_sales': 18.0, 'fcf_margin': 20.0, 'sbc_rev': 22.0, 'rule40': 48},
    'CRWD':   {'rev': 5250, 'growth': 24, 'ev_sales': 19.0, 'fcf_margin': 25.0, 'sbc_rev': 22.8, 'rule40': 49},
    'ZS':     {'rev': 2300, 'growth': 30, 'ev_sales': 13.6, 'fcf_margin': 22.0, 'sbc_rev': 20.0, 'rule40': 52},
    'PANW':   {'rev': 8500, 'growth': 14, 'ev_sales': 13.9, 'fcf_margin': 35.0, 'sbc_rev': 12.0, 'rule40': 49},
    'AKAMAI': {'rev': 3900, 'growth': 5,  'ev_sales': 3.0,  'fcf_margin': 20.0, 'sbc_rev': 6.0,  'rule40': 25},
}

print(f"\n{'Company':>8} {'Rev($M)':>10} {'Growth':>8} {'EV/S':>8} {'FCF%':>8} {'SBC%':>8} {'R40':>6}")
print("-" * 60)
for co, d in comps.items():
    marker = " ←" if co == 'NET' else ""
    print(f"{co:>8} {d['rev']:>10,} {d['growth']:>7}% {d['ev_sales']:>7.1f}x {d['fcf_margin']:>7.1f}% {d['sbc_rev']:>7.1f}% {d['rule40']:>5}{marker}")

# PEG comparison
print(f"\n--- PEG比较 (EV/S ÷ Growth) ---")
for co, d in comps.items():
    peg = d['ev_sales'] / d['growth'] if d['growth'] > 0 else 999
    marker = " ← 最贵" if co == 'NET' else ""
    print(f"  {co}: PEG = {peg:.2f}{marker}")

# 如果NET按ZS/CRWD平均EV/Sales定价
avg_peer_evs = np.mean([comps['DDOG']['ev_sales'], comps['CRWD']['ev_sales'], comps['ZS']['ev_sales']])
implied_ev = REV_FY25 * avg_peer_evs
implied_equity = implied_ev + CASH - DEBT
implied_ps = implied_equity / SHARES
print(f"\n如果NET按安全SaaS同行平均EV/Sales ({avg_peer_evs:.1f}x):")
print(f"  隐含EV: ${implied_ev:,.0f}M")
print(f"  隐含股价: ${implied_ps:.2f} (vs $203, {(implied_ps/PRICE-1)*100:+.1f}%)")

# ========== 3. SOTP估值 ==========
print(f"\n{'='*70}")
print("3. SOTP分部估值")
print(f"{'='*70}")

# 收入估算拆分(NET不披露, 基于间接推断)
sotp = {
    'CDN/性能': {'rev': 650, 'growth': 10, 'multiple': 5.0, 'note': 'Akamai 3x, 溢价为Workers引流'},
    '安全': {'rev': 800, 'growth': 35, 'multiple': 14.0, 'note': 'ZS 13.6x, 略溢价(增速更快)'},
    '开发者平台': {'rev': 500, 'growth': 45, 'multiple': 18.0, 'note': '高增长+锁定, 类DDOG估值'},
    'AI推理': {'rev': 100, 'growth': 200, 'multiple': 25.0, 'note': '极早期, 高不确定性'},
    '其他/企业': {'rev': 118, 'growth': 15, 'multiple': 8.0, 'note': '域名注册/消费者产品'},
}

total_sotp_ev = 0
print(f"\n{'业务线':<12} {'Rev($M)':>10} {'Growth':>8} {'EV/S':>8} {'EV($M)':>10}")
print("-" * 55)
for biz, d in sotp.items():
    ev = d['rev'] * d['multiple']
    total_sotp_ev += ev
    print(f"{biz:<12} {d['rev']:>10,} {d['growth']:>7}% {d['multiple']:>7.1f}x {ev:>10,}")
print("-" * 55)
print(f"{'Total':<12} {sum(d['rev'] for d in sotp.values()):>10,} {'':>8} {'':>8} {total_sotp_ev:>10,}")

sotp_equity = total_sotp_ev + CASH - DEBT
sotp_ps = sotp_equity / SHARES
sotp_up = (sotp_ps - PRICE) / PRICE * 100
print(f"\n  SOTP EV:    ${total_sotp_ev:,.0f}M")
print(f"  + Cash:     ${CASH:,.0f}M")
print(f"  - Debt:     ${DEBT:,.0f}M")
print(f"  Equity:     ${sotp_equity:,.0f}M")
print(f"  Per Share:  ${sotp_ps:.2f}")
print(f"  vs $203:    {sotp_up:+.1f}%")

# ========== 4. 敏感性矩阵 ==========
print(f"\n{'='*70}")
print("4. 敏感性矩阵 (WACC × 终端增速 × 终端OPM)")
print(f"{'='*70}")

print(f"\n--- Base Case DCF, WACC vs 终端OPM ---")
print(f"{'WACC↓ OPM→':>14}", end="")
for opm in [0.16, 0.20, 0.22, 0.25, 0.28]:
    print(f" {opm*100:>6.0f}%", end="")
print()
print("-" * 50)

for wacc_test in [0.10, 0.12, 0.13, 0.14]:
    print(f"  {wacc_test*100:>5.1f}%     ", end="")
    for opm in [0.16, 0.20, 0.22, 0.25, 0.28]:
        # Simplified DCF
        rev = REV_FY25
        total = 0
        for yr in range(1, 11):
            g = base_growth[yr-1]
            rev *= (1 + g)
            op = OPM_GAAP_FY25 + (opm - OPM_GAAP_FY25) * (yr / 10)
            sbc_r = base_sbc[yr-1]
            fcf = rev * op * (1 - TAX) + rev * 0.12 - rev * (0.16 - 0.06 * yr/10) - rev * sbc_r
            total += fcf / (1 + wacc_test) ** yr
        t_fcf = rev * opm * (1-TAX) * 0.7 - rev * base_sbc[-1]
        tv = t_fcf / (wacc_test - 0.03)
        total += tv / (1 + wacc_test) ** 10
        eq = total + CASH - DEBT
        ps = eq / SHARES
        print(f" ${ps:>5.0f}", end="")
    print()

# ========== 5. SBC收敛情景 ==========
print(f"\n{'='*70}")
print("5. SBC收敛情景分析 (3路径 × Owner FCF影响)")
print(f"{'='*70}")

sbc_scenarios = {
    'CRM模式(8年25%→15%)': [0.21, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.15],
    'NOW模式(6年20%→15%)': [0.20, 0.19, 0.18, 0.17, 0.16, 0.15],
    '不收敛(PLTR模式)':    [0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21],
}

for name, path in sbc_scenarios.items():
    print(f"\n--- {name} ---")
    rev = REV_FY25
    for yr, sbc_r in enumerate(path, 1):
        g = base_growth[yr-1] if yr <= len(base_growth) else 0.08
        rev *= (1 + g)
        fcf = rev * 0.15  # 假设FCF margin维持15%
        sbc = rev * sbc_r
        owner = fcf - sbc
        marker = " ← Owner FCF转正!" if owner > 0 and yr > 1 else ""
        if yr <= 3 or owner > 0:
            print(f"  FY{2025+yr}: Rev ${rev:,.0f}M, FCF ${fcf:,.0f}M, SBC ${sbc:,.0f}M, Owner ${owner:,.0f}M{marker}")

# ========== 6. 估值汇总 ==========
print(f"\n{'='*70}")
print("6. 估值汇总 — 方向一致性检查")
print(f"{'='*70}")

methods = {
    'DCF概率加权(Owner)': (pw_value, pw_up),
    'SOTP': (sotp_ps, sotp_up),
    '可比(同行平均EV/S)': (implied_ps, (implied_ps/PRICE-1)*100),
    'Reverse DCF': ('市场定价极端激进', None),
}

bullish = 0
bearish = 0
for method, (val, up) in methods.items():
    if isinstance(val, str):
        direction = "偏空"
        bearish += 1
        print(f"  {method}: {val} → {direction}")
    else:
        direction = "偏多" if up > 0 else "偏空"
        if up > 0: bullish += 1
        else: bearish += 1
        print(f"  {method}: ${val:.2f} ({up:+.1f}%) → {direction}")

consistency = bearish / (bullish + bearish) * 100
print(f"\n方向一致性: {bearish}/{bullish+bearish} 偏空 ({consistency:.0f}%)")
print(f"门控: {'PASS' if consistency >= 60 else 'WARN'} (≥60%方向一致)")
