#!/usr/bin/env python3
"""
CRM (Salesforce) DCF/SOTP/概率加权 Python验证
Phase 2 v2.0 | 2026-03-19
所有关键估值数字的独立Python计算
"""

import json

# ============================================================
# 1. 基础参数 (FMP验证)
# ============================================================
FY2026 = {
    "revenue": 41.525,      # $B, FMP income annual
    "fcf": 14.402,           # $B, FMP cashflow annual
    "sbc": 3.509,            # $B, FMP cashflow annual
    "net_debt_current": 9.849,  # $B, FMP balance (pre-ASR full)
    "net_debt_post_asr": 30.0,  # $B, estimated after $25B ASR
    "sbc_npv_5yr": 15.0,     # $B, SBC 5年NPV估计
    "shares_post_asr": 0.850, # B shares, after ASR
    "price": 194.34,
    "market_cap": 182.7,      # $B at $194
}

WACC = 0.10
TERMINAL_G = 0.03
TERMINAL_FCF_MARGIN = 0.30

# ============================================================
# 2. 正向DCF — 三情景
# ============================================================
def dcf_model(revenue_growth_rates, opm_trajectory, fcf_margin_trajectory, 
              wacc, terminal_g, terminal_fcf_margin, 
              net_debt, sbc_npv, shares, label=""):
    """5年DCF模型"""
    revenues = []
    fcfs = []
    rev = FY2026["revenue"]
    
    for i, (g, fcf_m) in enumerate(zip(revenue_growth_rates, fcf_margin_trajectory)):
        rev = rev * (1 + g)
        fcf = rev * fcf_m
        revenues.append(rev)
        fcfs.append(fcf)
    
    # 终端价值
    terminal_fcf = revenues[-1] * (1 + terminal_g) * terminal_fcf_margin
    terminal_value = terminal_fcf / (wacc - terminal_g)
    
    # 折现
    pv_fcfs = sum(fcf / (1 + wacc) ** (i + 1) for i, fcf in enumerate(fcfs))
    pv_terminal = terminal_value / (1 + wacc) ** len(fcfs)
    
    ev = pv_fcfs + pv_terminal
    equity = ev - net_debt - sbc_npv
    per_share = equity / shares
    
    print(f"\n{'='*60}")
    print(f"  DCF: {label}")
    print(f"{'='*60}")
    print(f"  Revenue trajectory: {[f'${r:.1f}B' for r in revenues]}")
    print(f"  FCF trajectory:     {[f'${f:.1f}B' for f in fcfs]}")
    print(f"  5Y Rev CAGR:        {((revenues[-1]/FY2026['revenue'])**(1/5)-1)*100:.1f}%")
    print(f"  Terminal FCF:       ${terminal_fcf:.1f}B")
    print(f"  Terminal Value:     ${terminal_value:.1f}B")
    print(f"  PV(5Y FCFs):        ${pv_fcfs:.1f}B")
    print(f"  PV(Terminal):       ${pv_terminal:.1f}B")
    print(f"  Enterprise Value:   ${ev:.1f}B")
    print(f"  Less: Net Debt:     -${net_debt:.1f}B")
    print(f"  Less: SBC NPV:      -${sbc_npv:.1f}B")
    print(f"  Equity Value:       ${equity:.1f}B")
    print(f"  Per Share:          ${per_share:.0f}")
    print(f"  vs $194:            {(per_share/194.34-1)*100:+.1f}%")
    
    return per_share

# 基线情景 (50%)
baseline = dcf_model(
    revenue_growth_rates=[0.096, 0.070, 0.064, 0.062, 0.050],  # 逐年降速
    opm_trajectory=[0.23, 0.24, 0.25, 0.255, 0.26],
    fcf_margin_trajectory=[0.336, 0.339, 0.344, 0.345, 0.346],
    wacc=0.10, terminal_g=0.03, terminal_fcf_margin=0.30,
    net_debt=30.0, sbc_npv=15.0, shares=0.850,
    label="基线 (50%概率)"
)

# 乐观情景 (25%)
optimistic = dcf_model(
    revenue_growth_rates=[0.11, 0.095, 0.090, 0.085, 0.075],  # AF成功
    opm_trajectory=[0.235, 0.25, 0.265, 0.27, 0.275],
    fcf_margin_trajectory=[0.35, 0.36, 0.37, 0.375, 0.38],
    wacc=0.095, terminal_g=0.035, terminal_fcf_margin=0.32,
    net_debt=28.0, sbc_npv=14.0, shares=0.850,
    label="乐观 (25%概率)"
)

# 悲观情景 (25%)
pessimistic = dcf_model(
    revenue_growth_rates=[0.07, 0.04, 0.03, 0.025, 0.02],  # seat压缩
    opm_trajectory=[0.22, 0.225, 0.225, 0.23, 0.23],
    fcf_margin_trajectory=[0.31, 0.30, 0.295, 0.29, 0.285],
    wacc=0.105, terminal_g=0.025, terminal_fcf_margin=0.27,
    net_debt=32.0, sbc_npv=16.0, shares=0.850,
    label="悲观 (25%概率)"
)

# 概率加权
pw = 0.50 * baseline + 0.25 * optimistic + 0.25 * pessimistic
print(f"\n{'='*60}")
print(f"  概率加权DCF = ${pw:.0f}")
print(f"  vs $194 = {(pw/194.34-1)*100:+.1f}%")
print(f"{'='*60}")

# ============================================================
# 3. WACC敏感性矩阵
# ============================================================
print(f"\n{'='*60}")
print(f"  敏感性矩阵 (基线情景)")
print(f"{'='*60}")
print(f"{'WACC↓ / g→':>12} {'2.0%':>8} {'2.5%':>8} {'3.0%':>8} {'3.5%':>8} {'4.0%':>8}")

for wacc_test in [0.09, 0.095, 0.10, 0.105, 0.11]:
    row = f"  {wacc_test*100:.1f}%       "
    for g_test in [0.02, 0.025, 0.03, 0.035, 0.04]:
        val = dcf_model(
            revenue_growth_rates=[0.096, 0.070, 0.064, 0.062, 0.050],
            opm_trajectory=[0.23, 0.24, 0.25, 0.255, 0.26],
            fcf_margin_trajectory=[0.336, 0.339, 0.344, 0.345, 0.346],
            wacc=wacc_test, terminal_g=g_test, terminal_fcf_margin=0.30,
            net_debt=30.0, sbc_npv=15.0, shares=0.850,
            label=f"WACC={wacc_test:.1%}/g={g_test:.1%}"
        )
        row += f"  ${val:>5.0f}"
    # 只打印汇总行(不打印每次dcf详情)
    pass

# 重新计算只打印矩阵
print(f"\n  简化敏感性矩阵:")
print(f"  {'WACC↓ / g→':>12} {'2.0%':>8} {'2.5%':>8} {'3.0%':>8} {'3.5%':>8} {'4.0%':>8}")

def dcf_quick(wacc, terminal_g, terminal_fcf_margin=0.30):
    """快速DCF不打印"""
    rev = FY2026["revenue"]
    growths = [0.096, 0.070, 0.064, 0.062, 0.050]
    fcf_margins = [0.336, 0.339, 0.344, 0.345, 0.346]
    revenues, fcfs = [], []
    for g, fm in zip(growths, fcf_margins):
        rev = rev * (1 + g)
        revenues.append(rev)
        fcfs.append(rev * fm)
    tf = revenues[-1] * (1 + terminal_g) * terminal_fcf_margin
    tv = tf / (wacc - terminal_g)
    pv_fcf = sum(f / (1 + wacc) ** (i+1) for i, f in enumerate(fcfs))
    pv_tv = tv / (1 + wacc) ** 5
    return (pv_fcf + pv_tv - 30.0 - 15.0) / 0.850

for w in [0.090, 0.095, 0.100, 0.105, 0.110]:
    vals = [dcf_quick(w, g) for g in [0.02, 0.025, 0.03, 0.035, 0.04]]
    print(f"  {w*100:.1f}%        " + "".join(f"  ${v:>5.0f}" for v in vals))

# ============================================================
# 4. SOTP双引擎
# ============================================================
print(f"\n{'='*60}")
print(f"  SOTP双引擎估值")
print(f"{'='*60}")

sotp_scenarios = {
    "保守": {
        "core": {"Service": (10.3, 4.5), "Sales": (9.7, 5.0), "MC": (5.7, 3.5), "PS": (2.0, 1.0)},
        "new": {"Platform": (9.5, 6.0), "Agentforce": (1.5, 8.0), "DataCloud": (2.0, 7.0)},
    },
    "基线": {
        "core": {"Service": (10.3, 5.0), "Sales": (9.7, 5.5), "MC": (5.7, 4.0), "PS": (2.0, 1.5)},
        "new": {"Platform": (9.5, 8.0), "Agentforce": (1.5, 12.0), "DataCloud": (2.0, 10.0)},
    },
    "乐观": {
        "core": {"Service": (10.3, 5.5), "Sales": (9.7, 6.0), "MC": (5.7, 4.5), "PS": (2.0, 2.0)},
        "new": {"Platform": (9.5, 10.0), "Agentforce": (1.5, 15.0), "DataCloud": (2.0, 13.0)},
    }
}

for scenario, data in sotp_scenarios.items():
    core_val = sum(rev * mult for rev, mult in data["core"].values())
    new_val = sum(rev * mult for rev, mult in data["new"].values())
    ev = core_val + new_val
    equity = ev - 30.0 - 15.0
    per_share = equity / 0.850
    print(f"\n  {scenario}:")
    print(f"    核心业务: ${core_val:.1f}B")
    for name, (rev, mult) in data["core"].items():
        print(f"      {name}: ${rev}B × {mult}x = ${rev*mult:.1f}B")
    print(f"    新引擎:   ${new_val:.1f}B")
    for name, (rev, mult) in data["new"].items():
        print(f"      {name}: ${rev}B × {mult}x = ${rev*mult:.1f}B")
    print(f"    EV: ${ev:.1f}B → 股权: ${equity:.1f}B → 每股: ${per_share:.0f}")
    print(f"    vs $194: {(per_share/194.34-1)*100:+.1f}%")

# ============================================================
# 5. ASR IRR模型
# ============================================================
print(f"\n{'='*60}")
print(f"  ASR IRR 7情景")
print(f"{'='*60}")

asr_price = 175.0
asr_amount = 25.0  # $B
annual_interest = asr_amount * 0.05  # $1.25B/yr
total_cost_5yr = asr_amount + annual_interest * 5  # $31.25B
shares_bought = asr_amount / asr_price  # ~142.9M shares

print(f"  ASR执行价: ${asr_price}")
print(f"  回购金额: ${asr_amount}B → {shares_bought*1000:.0f}M股")
print(f"  年利息: ${annual_interest}B → 5年累计: ${annual_interest*5}B")
print(f"  总成本(含利息): ${total_cost_5yr}B")
print()

scenarios = [
    ("AI转型大成功", 350, 0.10),
    ("温和改善", 280, 0.20),
    ("基线", 230, 0.30),
    ("股价不动", 194, 0.20),
    ("温和恶化", 160, 0.12),
    ("SaaSpocalypse", 120, 0.05),
    ("极端IBM路径", 80, 0.03),
]

pw_irr = 0
for name, price_5yr, prob in scenarios:
    value = shares_bought * price_5yr  # $B
    profit = value - total_cost_5yr
    irr = (value / total_cost_5yr) ** (1/5) - 1
    pw_irr += prob * irr
    print(f"  {name:15s}: 5Y价=${price_5yr:>4} → 持有值=${value:.1f}B → 回报={profit:+.1f}B → IRR={irr*100:+.1f}% (概率{prob*100:.0f}%)")

print(f"\n  概率加权IRR: {pw_irr*100:+.2f}%")

# ============================================================
# 6. 概率加权5情景终极估值
# ============================================================
print(f"\n{'='*60}")
print(f"  概率加权5情景终极估值")
print(f"{'='*60}")

scenarios_5 = [
    ("S1: AI转型成功", 0.07, 293),
    ("S2: 渐进改善", 0.25, 260),
    ("S3: 基线(中性)", 0.35, 221),
    ("S4: 温和恶化", 0.23, 180),
    ("S5: SaaSpocalypse", 0.10, 130),
]

total = 0
for name, prob, val in scenarios_5:
    contrib = prob * val
    total += contrib
    print(f"  {name:25s}: {prob*100:5.1f}% × ${val:>4} = ${contrib:>6.1f}")

print(f"\n  概率加权公允价值: ${total:.0f}")
print(f"  vs $194: {(total/194.34-1)*100:+.1f}%")
print(f"  评级区间: {'中性关注(偏积极)' if -10 < (total/194.34-1)*100 < 30 else '待定'}")

# 保存结果
results = {
    "dcf_baseline": round(baseline),
    "dcf_optimistic": round(optimistic),
    "dcf_pessimistic": round(pessimistic),
    "dcf_probability_weighted": round(pw),
    "asr_irr_pw": round(pw_irr * 100, 2),
    "five_scenario_pw": round(total),
    "vs_current": f"{(total/194.34-1)*100:+.1f}%",
}
print(f"\n  结果JSON: {json.dumps(results, indent=2)}")
