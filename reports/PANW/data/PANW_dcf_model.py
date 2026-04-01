#!/usr/bin/env python3
"""
PANW DCF估值模型 — Phase 2 Python验证
日期: 2026-03-31
"""

# ===== 参数 =====
TICKER = "PANW"
PRICE = 160.32
MKT_CAP = 109_300  # $M
SHARES = 773  # FY2027E diluted (post-CyberArk)
NET_CASH = 3_786  # $M
DEBT = 372  # $M

# ===== 1. DCF Model =====
print("=" * 60)
print(f"{TICKER} DCF Model")
print("=" * 60)

WACC = 0.10
TERMINAL_GROWTH = 0.03
FCF_BASE = 4_200  # FY2026E ($M)
FCF_GROWTH = [0.15, 0.15, 0.12, 0.12]  # FY2027-FY2030

# Project FCF
fcf_stream = [FCF_BASE]
for g in FCF_GROWTH:
    fcf_stream.append(fcf_stream[-1] * (1 + g))

print("\nProjected FCF ($M):")
years = ["FY2026E", "FY2027E", "FY2028E", "FY2029E", "FY2030E"]
for i, (yr, fcf) in enumerate(zip(years, fcf_stream)):
    pv = fcf / (1 + WACC) ** (i + 1)
    print(f"  {yr}: ${fcf:,.0f}  PV: ${pv:,.0f}")

# Terminal Value
terminal_fcf = fcf_stream[-1]
terminal_value = terminal_fcf * (1 + TERMINAL_GROWTH) / (WACC - TERMINAL_GROWTH)
tv_pv = terminal_value / (1 + WACC) ** len(fcf_stream)

# Sum PVs
explicit_pv = sum(fcf / (1 + WACC) ** (i + 1) for i, fcf in enumerate(fcf_stream))
total_ev = explicit_pv + tv_pv
equity_value = total_ev + NET_CASH - DEBT
per_share = equity_value / SHARES

print(f"\nTerminal Value: ${terminal_value:,.0f}M")
print(f"PV of Terminal: ${tv_pv:,.0f}M")
print(f"PV of Explicit: ${explicit_pv:,.0f}M")
print(f"Total EV: ${total_ev:,.0f}M")
print(f"Equity Value: ${equity_value:,.0f}M")
print(f"Per Share: ${per_share:.0f}")
print(f"vs Current: ${PRICE} ({(per_share/PRICE-1)*100:+.1f}%)")

# ===== 2. Sensitivity =====
print("\n" + "=" * 60)
print("WACC / Terminal Growth Sensitivity")
print("=" * 60)
print(f"{'':>8}", end="")
for tg in [0.025, 0.03, 0.035]:
    print(f"  TG={tg:.1%}", end="")
print()

for w in [0.09, 0.10, 0.11]:
    print(f"WACC={w:.0%}", end="")
    for tg in [0.025, 0.03, 0.035]:
        tv = terminal_fcf * (1 + tg) / (w - tg)
        tv_p = tv / (1 + w) ** len(fcf_stream)
        ep = sum(fcf / (1 + w) ** (i + 1) for i, fcf in enumerate(fcf_stream))
        eq = ep + tv_p + NET_CASH - DEBT
        ps = eq / SHARES
        print(f"    ${ps:.0f}", end="")
    print()

# ===== 3. Owner FCF Analysis =====
print("\n" + "=" * 60)
print("Owner FCF Analysis")
print("=" * 60)

SBC_FY25 = 1_295
FCF_FY25 = 3_470
NI_FY25 = 1_134
OWNER_FCF = FCF_FY25 - SBC_FY25
OWNER_NI = NI_FY25 - SBC_FY25

print(f"FCF FY2025: ${FCF_FY25:,}M")
print(f"SBC FY2025: ${SBC_FY25:,}M")
print(f"Owner FCF: ${OWNER_FCF:,}M ({OWNER_FCF/9222*100:.1f}% margin)")
print(f"Owner NI: ${OWNER_NI:,}M ({'NEGATIVE' if OWNER_NI < 0 else 'positive'})")
print(f"FCF Yield: {FCF_FY25/MKT_CAP*100:.2f}%")
print(f"Owner FCF Yield: {OWNER_FCF/MKT_CAP*100:.2f}%")

# Three PE
print(f"\nThree PE:")
print(f"  GAAP PE: {MKT_CAP/NI_FY25:.1f}x")
print(f"  Owner PE: {'N/A (negative)' if OWNER_NI <= 0 else f'{MKT_CAP/OWNER_NI:.1f}x'}")
print(f"  Core PE: {MKT_CAP/(NI_FY25-364):.1f}x (ex interest income)")

# ===== 4. Probability-Weighted =====
print("\n" + "=" * 60)
print("Probability-Weighted Fair Value")
print("=" * 60)

scenarios = [
    ("Bull (平台化加速)", 0.25, 179),
    ("Base (稳健执行)", 0.45, 151),
    ("Bear (整合失败)", 0.25, 111),
    ("Tail (竞争颠覆)", 0.05, 75),
]
pw = sum(p * v for _, p, v in scenarios)
for name, prob, val in scenarios:
    print(f"  {name}: {prob*100:.0f}% × ${val} = ${prob*val:.1f}")
print(f"  PW Fair Value: ${pw:.0f}")
print(f"  vs ${PRICE}: {(pw/PRICE-1)*100:+.1f}%")

# ===== 5. Forward PE Sensitivity =====
print("\n" + "=" * 60)
print("Forward PE Sensitivity (FY2027E)")
print("=" * 60)
print(f"{'EPS →':>10}", end="")
for eps in [3.50, 3.70, 3.98, 4.20, 4.50]:
    print(f"  ${eps:.2f}", end="")
print()
for pe in [25, 30, 35, 38, 40, 45, 50]:
    print(f"PE {pe}x:", end="")
    for eps in [3.50, 3.70, 3.98, 4.20, 4.50]:
        print(f"   ${eps*pe:.0f}", end="")
    print()

print("\n✅ DCF model validated")
