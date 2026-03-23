"""
PayPal (PYPL) DCF Valuation Model — Phase 3 Python Verification
铁律G6: 估值算术必须Python验证
"""
import json

# ============================================================
# 基础参数
# ============================================================
CURRENT_PRICE = 44.19
SHARES_OUT = 935.65  # M, as of 2026.3
MARKET_CAP = CURRENT_PRICE * SHARES_OUT  # ~$41.3B
NET_DEBT = 1900  # $M (debt $10B - cash $10.4B + adjustments ~$2.3B)
EV = MARKET_CAP + NET_DEBT
BASE_FCF = 5210  # $M, normalized FCFE (Ch09)
BASE_REVENUE = 33172  # $M, FY2025
BASE_EPS = 5.41
WACC = 0.10  # 10%
TERMINAL_G = 0.025  # 2.5%

print("=" * 60)
print("PYPL DCF Valuation Model — Phase 3")
print("=" * 60)
print(f"Current Price: ${CURRENT_PRICE}")
print(f"Market Cap: ${MARKET_CAP:.0f}M")
print(f"EV: ${EV:.0f}M")
print(f"Base FCF (normalized): ${BASE_FCF}M")
print(f"WACC: {WACC:.1%}, Terminal g: {TERMINAL_G:.1%}")
print()

# ============================================================
# Scenario 1: Bear Case — 品牌加速衰退
# ============================================================
print("-" * 60)
print("Scenario 1: BEAR — 品牌加速衰退")
print("-" * 60)
bear_fcf_growth = [-0.03, -0.04, -0.05, -0.03, -0.02, -0.01, 0.0, 0.01, 0.01, 0.02]
bear_fcf = BASE_FCF
bear_pv_sum = 0
for i, g in enumerate(bear_fcf_growth):
    bear_fcf *= (1 + g)
    pv = bear_fcf / (1 + WACC) ** (i + 1)
    bear_pv_sum += pv
    if i < 3 or i >= 8:
        print(f"  Year {i+1}: FCF ${bear_fcf:.0f}M (g={g:.1%}), PV=${pv:.0f}M")

bear_terminal = bear_fcf * (1 + TERMINAL_G) / (WACC - TERMINAL_G)
bear_terminal_pv = bear_terminal / (1 + WACC) ** 10
bear_ev = bear_pv_sum + bear_terminal_pv
bear_equity = bear_ev - NET_DEBT
bear_per_share = bear_equity / SHARES_OUT

print(f"  Terminal Value: ${bear_terminal:.0f}M, PV=${bear_terminal_pv:.0f}M")
print(f"  ★ Bear EV: ${bear_ev:.0f}M")
print(f"  ★ Bear Equity: ${bear_equity:.0f}M = ${bear_per_share:.2f}/share")
print(f"  ★ vs Current ${CURRENT_PRICE}: {(bear_per_share/CURRENT_PRICE - 1)*100:.1f}%")
print()

# ============================================================
# Scenario 2: Base Case — 温和改善(Fastlane有效但受限)
# ============================================================
print("-" * 60)
print("Scenario 2: BASE — 温和改善")
print("-" * 60)
base_fcf_growth = [0.02, 0.03, 0.04, 0.05, 0.05, 0.04, 0.04, 0.03, 0.03, 0.03]
base_fcf = BASE_FCF
base_pv_sum = 0
for i, g in enumerate(base_fcf_growth):
    base_fcf *= (1 + g)
    pv = base_fcf / (1 + WACC) ** (i + 1)
    base_pv_sum += pv
    if i < 3 or i >= 8:
        print(f"  Year {i+1}: FCF ${base_fcf:.0f}M (g={g:.1%}), PV=${pv:.0f}M")

base_terminal = base_fcf * (1 + TERMINAL_G) / (WACC - TERMINAL_G)
base_terminal_pv = base_terminal / (1 + WACC) ** 10
base_ev = base_pv_sum + base_terminal_pv
base_equity = base_ev - NET_DEBT
base_per_share = base_equity / SHARES_OUT

print(f"  Terminal Value: ${base_terminal:.0f}M, PV=${base_terminal_pv:.0f}M")
print(f"  ★ Base EV: ${base_ev:.0f}M")
print(f"  ★ Base Equity: ${base_equity:.0f}M = ${base_per_share:.2f}/share")
print(f"  ★ vs Current ${CURRENT_PRICE}: {(base_per_share/CURRENT_PRICE - 1)*100:.1f}%")
print()

# ============================================================
# Scenario 3: Bull Case — Fastlane+Venmo+Braintree提价三重催化
# ============================================================
print("-" * 60)
print("Scenario 3: BULL — 三重催化")
print("-" * 60)
bull_fcf_growth = [0.04, 0.06, 0.08, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.04]
bull_fcf = BASE_FCF
bull_pv_sum = 0
for i, g in enumerate(bull_fcf_growth):
    bull_fcf *= (1 + g)
    pv = bull_fcf / (1 + WACC) ** (i + 1)
    bull_pv_sum += pv
    if i < 3 or i >= 8:
        print(f"  Year {i+1}: FCF ${bull_fcf:.0f}M (g={g:.1%}), PV=${pv:.0f}M")

bull_terminal = bull_fcf * (1 + TERMINAL_G) / (WACC - TERMINAL_G)
bull_terminal_pv = bull_terminal / (1 + WACC) ** 10
bull_ev = bull_pv_sum + bull_terminal_pv
bull_equity = bull_ev - NET_DEBT
bull_per_share = bull_equity / SHARES_OUT

print(f"  Terminal Value: ${bull_terminal:.0f}M, PV=${bull_terminal_pv:.0f}M")
print(f"  ★ Bull EV: ${bull_ev:.0f}M")
print(f"  ★ Bull Equity: ${bull_equity:.0f}M = ${bull_per_share:.2f}/share")
print(f"  ★ vs Current ${CURRENT_PRICE}: {(bull_per_share/CURRENT_PRICE - 1)*100:.1f}%")
print()

# ============================================================
# WACC Sensitivity Matrix
# ============================================================
print("-" * 60)
print("WACC × Terminal g Sensitivity (Base Case FCF path)")
print("-" * 60)
print(f"{'':>8}", end="")
for g in [0.020, 0.025, 0.030]:
    print(f"  g={g:.1%}", end="")
print()

for w in [0.09, 0.10, 0.11, 0.12]:
    print(f"WACC {w:.0%}", end="")
    for g in [0.020, 0.025, 0.030]:
        # Recalculate base case with different WACC/g
        fcf = BASE_FCF
        pv_sum = 0
        for i, gr in enumerate(base_fcf_growth):
            fcf *= (1 + gr)
            pv_sum += fcf / (1 + w) ** (i + 1)
        tv = fcf * (1 + g) / (w - g)
        tv_pv = tv / (1 + w) ** 10
        eq = (pv_sum + tv_pv - NET_DEBT) / SHARES_OUT
        print(f"  ${eq:>6.1f}", end="")
    print()
print()

# ============================================================
# Probability-Weighted Valuation
# ============================================================
print("-" * 60)
print("Probability-Weighted Valuation")
print("-" * 60)
scenarios = {
    "Bear (品牌衰退)": {"price": bear_per_share, "prob": 0.20},
    "Base (温和改善)": {"price": base_per_share, "prob": 0.45},
    "Bull (三重催化)": {"price": bull_per_share, "prob": 0.25},
    "Acquisition ($75)": {"price": 75.0, "prob": 0.10},
}

pw_price = 0
for name, s in scenarios.items():
    contrib = s["price"] * s["prob"]
    pw_price += contrib
    print(f"  {name}: ${s['price']:.1f} × {s['prob']:.0%} = ${contrib:.1f}")

print(f"\n  ★ Probability-Weighted Fair Value: ${pw_price:.2f}")
print(f"  ★ vs Current ${CURRENT_PRICE}: {(pw_price/CURRENT_PRICE - 1)*100:.1f}%")
print(f"  ★ vs Current ${CURRENT_PRICE}: {'UNDERVALUED' if pw_price > CURRENT_PRICE else 'OVERVALUED'}")
print()

# ============================================================
# SOTP Valuation (Updated at $44.19)
# ============================================================
print("-" * 60)
print("SOTP Valuation (Updated)")
print("-" * 60)

sotp = {
    "Branded Checkout": {"low": 20000, "mid": 24500, "high": 29000},
    "Braintree": {"low": 9000, "mid": 13000, "high": 17000},
    "Venmo": {"low": 3000, "mid": 5500, "high": 9000},
    "Other (Xoom/PYUSD/Interest)": {"low": 2000, "mid": 3500, "high": 5000},
}

for case in ["low", "mid", "high"]:
    total = sum(v[case] for v in sotp.values())
    equity = total - NET_DEBT
    per_share = equity / SHARES_OUT
    print(f"  {case.upper()}: Total EV ${total/1000:.1f}B - ND ${NET_DEBT/1000:.1f}B = ${equity/1000:.1f}B = ${per_share:.1f}/share")

print()

# ============================================================
# Summary
# ============================================================
print("=" * 60)
print("SUMMARY")
print("=" * 60)
print(f"  Current Price:     ${CURRENT_PRICE}")
print(f"  P/E (TTM):         {CURRENT_PRICE/BASE_EPS:.1f}x")
print(f"  FCF Yield:         {BASE_FCF/MARKET_CAP*100:.1f}%")
print(f"  EV/EBITDA:         {EV/7696:.1f}x")
print(f"  DCF Bear:          ${bear_per_share:.1f} ({(bear_per_share/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"  DCF Base:          ${base_per_share:.1f} ({(base_per_share/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"  DCF Bull:          ${bull_per_share:.1f} ({(bull_per_share/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"  PW Fair Value:     ${pw_price:.1f} ({(pw_price/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"  FMP DCF:           $105.7 ({(105.7/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"  Analyst Avg Target: ~$75 ({(75/CURRENT_PRICE-1)*100:+.0f}%)")
print(f"\n  Rating Direction: {'深度关注' if pw_price/CURRENT_PRICE > 1.3 else '关注' if pw_price/CURRENT_PRICE > 1.1 else '中性关注' if pw_price/CURRENT_PRICE > 0.9 else '审慎关注'}")
