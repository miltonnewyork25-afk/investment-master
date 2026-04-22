"""
POWL Phase 0 — Reverse DCF 初稿
当前价 $240.97 隐含什么增长假设?
"""

# ============== 输入 ==============
SHARES_OUT_DILUTED = 36.5  # M
CURRENT_PRICE = 240.97
MARKET_CAP = SHARES_OUT_DILUTED * CURRENT_PRICE  # = 8.8 B

# TTM (2025-12-31, Q1 FY26 end)
TTM_REVENUE = 1114.0  # M
TTM_NET_INCOME = 187.4  # M
TTM_FCF = 161.5  # M
NET_CASH = 489.0  # M

ENTERPRISE_VALUE = MARKET_CAP - NET_CASH  # = ~8.3 B

# ============== Reverse DCF v1: 10Y FCF growth 求解 ==============
# 假设: WACC 10% (无杠杆, beta 0.8, Rf 4.5%, ERP 5.5% → CoE 8.9%, 取 10% 保守)
# Terminal growth = 3% (长期工业股)
# 目标: EV / PV of FCF streams 应等于 1

import numpy as np
from scipy.optimize import brentq

def pv_fcf_10y_plus_tv(growth_10y, initial_fcf=TTM_FCF, wacc=0.10, g_terminal=0.03):
    """计算未来 10 年 FCF 和永续值的现值"""
    fcfs = [initial_fcf * (1 + growth_10y) ** t for t in range(1, 11)]
    pv_fcf = sum([fcf / (1 + wacc) ** t for t, fcf in enumerate(fcfs, 1)])
    fcf_year_11 = fcfs[-1] * (1 + g_terminal)
    tv = fcf_year_11 / (wacc - g_terminal)
    pv_tv = tv / (1 + wacc) ** 10
    return pv_fcf + pv_tv

# 求解使 EV = PV
implied_growth = brentq(lambda g: pv_fcf_10y_plus_tv(g) - ENTERPRISE_VALUE, 0.0, 0.50)
print(f"=== Reverse DCF v1 ===")
print(f"Market Cap: ${MARKET_CAP:.0f}M | EV: ${ENTERPRISE_VALUE:.0f}M")
print(f"TTM FCF: ${TTM_FCF}M | WACC 10% | Terminal g 3%")
print(f"  → 隐含 10Y FCF CAGR: {implied_growth*100:.1f}%")

# ============== 情景对比 ==============
print(f"\n=== Scenario EV 对比 ===")
scenarios = [
    ("Bear (回归周期): FY25 peak → 5Y 0% growth → revert", 0.0),
    ("Bear (5Y 5%)", 0.05),
    ("Base (分析师 EPS CAGR 16%, 对应 FCF 略低 13%)", 0.13),
    ("Bull (AI beta 18%)", 0.18),
    ("Market implied", implied_growth),
    ("Extreme Bull 25%", 0.25),
]
for name, g in scenarios:
    ev = pv_fcf_10y_plus_tv(g)
    implied_equity = ev + NET_CASH
    implied_price = implied_equity / SHARES_OUT_DILUTED
    upside = (implied_price / CURRENT_PRICE - 1) * 100
    print(f"  {name:40s} → EV ${ev:5.0f}M | Equity ${implied_equity:5.0f}M | Price ${implied_price:6.1f} ({upside:+5.1f}%)")

# ============== FCF 历史波动性审计 ==============
print(f"\n=== FCF 历史 (5Y, 波动极大) ===")
hist_fcf = {
    "FY21": -33, "FY22": -6, "FY23": 175, "FY24": 97, "FY25": 155
}
for y, v in hist_fcf.items():
    print(f"  {y}: ${v:+.0f}M")
avg_5y = sum(hist_fcf.values()) / 5
print(f"  5Y avg: ${avg_5y:.0f}M | Std dev ≈ ${np.std(list(hist_fcf.values())):.0f}M")
print(f"  TTM $162M vs 5Y avg $78M = 2.1x — peak 位置信号")

# ============== P/E 多倍数对比 ==============
print(f"\n=== PE 对比 ===")
pe_scenarios = [
    ("TTM EPS $5.13", 5.13),
    ("FY27E EPS $5.99 (analyst consensus)", 5.99),
    ("FY28E EPS $7.19", 7.19),
    ("FY30E EPS $9.32", 9.32),
]
for name, eps in pe_scenarios:
    pe = CURRENT_PRICE / eps
    print(f"  {name:40s} → PE = {pe:.1f}x")

print(f"\n对比历史: POWL 5年 PE range 18x (FY23/FY24) → 47x TTM = 2.6σ 上移")
