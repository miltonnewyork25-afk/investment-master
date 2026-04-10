#!/usr/bin/env python3
"""
R2 网络安全横向估值模型 — CRWD / PANW / FTNT
Reverse DCF + 概率加权三情景 + Owner FCF估值
"""
import json

# ============================================================
# 1. 基础数据 (FMP verified)
# ============================================================

companies = {
    "CRWD": {
        "price": 394.68,
        "mkt_cap_B": 100.1,
        "shares_diluted_M": 258.1,  # FY2026
        "fy_label": "FY2026 (Jan'26)",
        # Income
        "rev_B": 4.812,
        "gm_pct": 74.6,
        "gaap_opm_pct": -3.4,
        "sbc_M": 1097,
        "sbc_rev_pct": 22.8,
        "gaap_ni_M": -162,
        # Cash Flow
        "fcf_M": 1310,
        "fcf_margin_pct": 27.2,
        "capex_M": 302,
        # Growth (from handoff)
        "arr_B": 5.25,
        "arr_growth_pct": 24,
        "organic_growth_pct": 20,  # ex-M&A
        "nrr_pct": 115,
        "rule_of_40": 49,
        # Owner FCF
        "owner_fcf_M": 1310 - 1097,  # FCF - SBC = $213M
        # Multiples
        "ev_B": 95.2,
        "net_cash_B": 4.9,  # $5.3B cash - ~$0.4B debt
    },
    "PANW": {
        "price": 166.99,
        "mkt_cap_B": 113.8,
        "shares_diluted_M": 709.3,  # FY2025
        "fy_label": "FY2025 (Jul'25)",
        # Income
        "rev_B": 9.222,
        "gm_pct": 73.4,
        "gaap_opm_pct": 13.5,
        "sbc_M": 1295,
        "sbc_rev_pct": 14.0,
        "gaap_ni_M": 1134,
        # Cash Flow
        "fcf_M": 3470,
        "fcf_margin_pct": 37.6,
        "capex_M": 246,
        # Growth
        "ngs_arr_B": 6.33,
        "ngs_arr_growth_pct": 33,
        "organic_growth_pct": 14,  # ex-M&A
        "total_rev_growth_pct": 15,  # FY25 vs FY24
        "magic_number": 0.43,
        # Owner FCF
        "owner_fcf_M": 3470 - 1295,  # $2,175M
        # Multiples
        "ev_B": 108.0,
        "net_cash_B": 5.8,  # estimated
    },
    "FTNT": {
        "price": 80.66,
        "mkt_cap_B": 60.0,
        "shares_diluted_M": 748.0,  # FY2025
        "fy_label": "FY2025 (Dec'25)",
        # Income
        "rev_B": 6.800,
        "gm_pct": 80.8,
        "gaap_opm_pct": 30.6,
        "sbc_M": 280,
        "sbc_rev_pct": 4.1,
        "gaap_ni_M": 1853,
        # Cash Flow
        "fcf_M": 2226,
        "fcf_margin_pct": 32.7,
        "capex_M": 365,
        # Growth
        "rev_growth_pct": 14.2,
        "organic_product_growth_pct": 0,  # ex-refresh
        "roic_pct": 28.7,
        # Owner FCF
        "owner_fcf_M": 2226 - 280,  # $1,946M
        # Multiples
        "ev_B": 58.8,
        "net_cash_B": 1.2,
        # Buyback
        "buyback_M": 2290,  # FY2025
    },
}

# ============================================================
# 2. Reverse DCF — 隐含增速反推
# ============================================================

def reverse_dcf(ev_B, fcf_M, wacc=0.10, terminal_growth=0.03, years=10):
    """
    给定EV和当前FCF, 反推市场隐含的年均FCF增速.
    EV = sum(FCF*(1+g)^t / (1+wacc)^t) + terminal_value / (1+wacc)^10
    """
    from scipy.optimize import brentq

    ev = ev_B * 1e9
    fcf = fcf_M * 1e6

    def npv_diff(g):
        pv = 0
        for t in range(1, years + 1):
            pv += fcf * (1 + g) ** t / (1 + wacc) ** t
        terminal = fcf * (1 + g) ** years * (1 + terminal_growth) / (wacc - terminal_growth)
        pv += terminal / (1 + wacc) ** years
        return pv - ev

    try:
        implied_g = brentq(npv_diff, -0.20, 0.50)
        return implied_g
    except:
        return None

print("=" * 70)
print("R2 网络安全横向估值模型")
print("=" * 70)

# 2a. Reverse DCF results
print("\n## 1. Reverse DCF — 市场隐含增速")
print("-" * 60)
print(f"{'指标':<20} {'CRWD':<15} {'PANW':<15} {'FTNT':<15}")
print("-" * 60)

implied_growth = {}
for ticker, d in companies.items():
    g = reverse_dcf(d["ev_B"], d["fcf_M"])
    implied_growth[ticker] = g
    g_str = f"{g*100:.1f}%" if g else "N/A"
    print(f"{'隐含FCF增速(10Y)':<20} {g_str:<15}", end="")
print()

# Also do Owner FCF reverse DCF
print(f"\n{'Owner FCF Reverse DCF':}")
for ticker, d in companies.items():
    g = reverse_dcf(d["ev_B"], d["owner_fcf_M"])
    g_str = f"{g*100:.1f}%" if g else "N/A"
    print(f"  {ticker}: 隐含Owner FCF增速 = {g_str} (当前Owner FCF = ${d['owner_fcf_M']}M)")

# ============================================================
# 3. 概率加权三情景估值
# ============================================================

print("\n\n## 2. 概率加权三情景估值")
print("=" * 70)

scenarios = {
    "CRWD": {
        "bull": {
            "label": "飞轮重加速 (NRR>120, Defender份额稳定)",
            "prob": 0.20,
            "rev_5y_cagr": 0.22,
            "fcf_margin_5y": 0.32,
            "exit_ev_fcf": 35,
        },
        "base": {
            "label": "飞轮减速 (NRR 110-115, 渐进增长)",
            "prob": 0.50,
            "rev_5y_cagr": 0.16,
            "fcf_margin_5y": 0.28,
            "exit_ev_fcf": 28,
        },
        "bear": {
            "label": "飞轮断裂 (Defender>35%, 内核移除加速)",
            "prob": 0.30,
            "rev_5y_cagr": 0.10,
            "fcf_margin_5y": 0.22,
            "exit_ev_fcf": 18,
        },
    },
    "PANW": {
        "bull": {
            "label": "平台化成功 (转化率>5%, CyberArk整合顺利)",
            "prob": 0.20,
            "rev_5y_cagr": 0.20,
            "fcf_margin_5y": 0.38,
            "exit_ev_fcf": 30,
        },
        "base": {
            "label": "平台化缓慢 (转化率2-3%, 有机增速13-15%)",
            "prob": 0.50,
            "rev_5y_cagr": 0.14,
            "fcf_margin_5y": 0.35,
            "exit_ev_fcf": 25,
        },
        "bear": {
            "label": "平台化失败 (Magic Number<0.3, M&A整合失败)",
            "prob": 0.30,
            "rev_5y_cagr": 0.08,
            "fcf_margin_5y": 0.30,
            "exit_ev_fcf": 18,
        },
    },
    "FTNT": {
        "bull": {
            "label": "SASE突破 + 刷新周期延续",
            "prob": 0.25,
            "rev_5y_cagr": 0.16,
            "fcf_margin_5y": 0.35,
            "exit_ev_fcf": 28,
        },
        "base": {
            "label": "渠道稳态 + SASE渐进 (有机8-10%)",
            "prob": 0.50,
            "rev_5y_cagr": 0.10,
            "fcf_margin_5y": 0.33,
            "exit_ev_fcf": 22,
        },
        "bear": {
            "label": "ASIC优势云端失效 + 后刷新减速",
            "prob": 0.25,
            "rev_5y_cagr": 0.06,
            "fcf_margin_5y": 0.28,
            "exit_ev_fcf": 16,
        },
    },
}

wacc = 0.10

results = {}

for ticker in ["CRWD", "PANW", "FTNT"]:
    d = companies[ticker]
    s = scenarios[ticker]
    print(f"\n### {ticker} (当前价 ${d['price']}, 市值 ${d['mkt_cap_B']:.1f}B)")
    print(f"    当前: Rev ${d['rev_B']:.2f}B | FCF ${d['fcf_M']}M | SBC/Rev {d['sbc_rev_pct']}%")
    print(f"    {'情景':<45} {'概率':>5} {'5Y Rev':>8} {'5Y FCF':>10} {'EV':>10} {'股价':>8} {'回报':>8}")
    print("    " + "-" * 95)

    weighted_price = 0
    scenario_results = []

    for case_name, case in s.items():
        rev_5y = d["rev_B"] * (1 + case["rev_5y_cagr"]) ** 5
        fcf_5y = rev_5y * case["fcf_margin_5y"] * 1e9
        ev_5y = fcf_5y * case["exit_ev_fcf"]

        # Discount back to today
        ev_today = ev_5y / (1 + wacc) ** 5
        equity_today = ev_today + d.get("net_cash_B", 0) * 1e9
        price_implied = equity_today / (d["shares_diluted_M"] * 1e6)
        ret = (price_implied / d["price"] - 1) * 100

        weighted_price += price_implied * case["prob"]

        scenario_results.append({
            "case": case_name,
            "label": case["label"],
            "prob": case["prob"],
            "rev_5y_B": rev_5y,
            "fcf_5y_B": fcf_5y / 1e9,
            "ev_5y_B": ev_5y / 1e9,
            "price": price_implied,
            "return_pct": ret,
        })

        print(f"    {case['label']:<45} {case['prob']*100:>4.0f}% "
              f"${rev_5y:>6.1f}B ${fcf_5y/1e9:>8.1f}B ${ev_5y/1e9:>8.1f}B "
              f"${price_implied:>6.1f} {ret:>+6.1f}%")

    weighted_ret = (weighted_price / d["price"] - 1) * 100
    print(f"    {'概率加权':>45}       {'':>8} {'':>10} {'':>10} "
          f"${weighted_price:>6.1f} {weighted_ret:>+6.1f}%")

    results[ticker] = {
        "weighted_price": weighted_price,
        "weighted_return_pct": weighted_ret,
        "scenarios": scenario_results,
    }

# ============================================================
# 4. 横向估值矩阵
# ============================================================

print("\n\n## 3. 横向估值矩阵")
print("=" * 70)
print(f"{'指标':<25} {'CRWD':<18} {'PANW':<18} {'FTNT':<18}")
print("-" * 70)

metrics = [
    ("股价", "price", "$", ""),
    ("市值 ($B)", "mkt_cap_B", "$", "B"),
    ("EV ($B)", "ev_B", "$", "B"),
    ("收入 ($B)", "rev_B", "$", "B"),
    ("毛利率", "gm_pct", "", "%"),
    ("GAAP OPM", "gaap_opm_pct", "", "%"),
    ("SBC/Rev", "sbc_rev_pct", "", "%"),
    ("FCF ($M)", "fcf_M", "$", "M"),
    ("FCF Margin", "fcf_margin_pct", "", "%"),
    ("Owner FCF ($M)", "owner_fcf_M", "$", "M"),
]

for label, key, prefix, suffix in metrics:
    vals = []
    for t in ["CRWD", "PANW", "FTNT"]:
        v = companies[t].get(key, "N/A")
        if isinstance(v, (int, float)):
            if abs(v) >= 100:
                vals.append(f"{prefix}{v:,.0f}{suffix}")
            else:
                vals.append(f"{prefix}{v:.1f}{suffix}")
        else:
            vals.append(str(v))
    print(f"{label:<25} {vals[0]:<18} {vals[1]:<18} {vals[2]:<18}")

# PE multiples
print("-" * 70)
print(f"{'EV/Sales':<25} {companies['CRWD']['ev_B']/companies['CRWD']['rev_B']:<18.1f}x {companies['PANW']['ev_B']/companies['PANW']['rev_B']:<17.1f}x {companies['FTNT']['ev_B']/companies['FTNT']['rev_B']:<17.1f}x")
print(f"{'P/FCF':<25} {companies['CRWD']['mkt_cap_B']*1e3/companies['CRWD']['fcf_M']:<18.1f}x {companies['PANW']['mkt_cap_B']*1e3/companies['PANW']['fcf_M']:<17.1f}x {companies['FTNT']['mkt_cap_B']*1e3/companies['FTNT']['fcf_M']:<17.1f}x")
print(f"{'P/Owner FCF':<25} {companies['CRWD']['mkt_cap_B']*1e3/companies['CRWD']['owner_fcf_M']:<18.1f}x {companies['PANW']['mkt_cap_B']*1e3/companies['PANW']['owner_fcf_M']:<17.1f}x {companies['FTNT']['mkt_cap_B']*1e3/companies['FTNT']['owner_fcf_M']:<17.1f}x")

# ============================================================
# 5. 三PE并列 (铁律 N)
# ============================================================

print("\n\n## 4. 三PE并列")
print("=" * 70)

for ticker in ["CRWD", "PANW", "FTNT"]:
    d = companies[ticker]
    gaap_ni = d["gaap_ni_M"]
    sbc = d["sbc_M"]
    mkt = d["mkt_cap_B"] * 1e3  # in $M

    gaap_pe = mkt / gaap_ni if gaap_ni > 0 else None
    owner_ni = gaap_ni - sbc
    owner_pe = mkt / owner_ni if owner_ni > 0 else None

    print(f"\n{ticker}:")
    if gaap_pe:
        print(f"  GAAP PE:  {gaap_pe:.1f}x (NI ${gaap_ni}M)")
    else:
        print(f"  GAAP PE:  负值/亏损 (NI ${gaap_ni}M)")

    if owner_pe and owner_pe > 0:
        print(f"  Owner PE: {owner_pe:.1f}x (Owner NI ${owner_ni}M = NI - SBC)")
    else:
        print(f"  Owner PE: 无意义 (Owner NI ${owner_ni}M = NI ${gaap_ni}M - SBC ${sbc}M < 0)")

    # Core PE (no significant non-operating income adjustments needed for these)
    interest_income = {"CRWD": 195, "PANW": 364, "FTNT": 162}
    core_ni = gaap_ni - interest_income[ticker]
    if core_ni > 0:
        core_pe = mkt / core_ni
        print(f"  Core PE:  {core_pe:.1f}x (Core NI ${core_ni}M = NI - 利息收入)")
    else:
        print(f"  Core PE:  负值 (Core NI ${core_ni}M)")

# ============================================================
# 6. 剪刀差分析
# ============================================================

print("\n\n## 5. 剪刀差数据")
print("=" * 70)

# SBC vs Revenue growth
print("\n### 剪刀差 1: SBC增速 vs 收入增速")
sbc_data = {
    "CRWD": {"sbc": [527, 632, 865, 1097], "rev": [2241, 3056, 3954, 4812], "years": ["FY23", "FY24", "FY25", "FY26"]},
    "PANW": {"sbc": [1011, 1075, 1075, 1295], "rev": [5502, 6893, 8028, 9222], "years": ["FY22", "FY23", "FY24", "FY25"]},
    "FTNT": {"sbc": [217, 249, 258, 280], "rev": [4417, 5305, 5956, 6800], "years": ["FY22", "FY23", "FY24", "FY25"]},
}

for ticker in ["CRWD", "PANW", "FTNT"]:
    sd = sbc_data[ticker]
    sbc_cagr = (sd["sbc"][-1] / sd["sbc"][0]) ** (1/3) - 1
    rev_cagr = (sd["rev"][-1] / sd["rev"][0]) ** (1/3) - 1
    sbc_rev_trend = [sd["sbc"][i]/sd["rev"][i]*100 for i in range(4)]
    print(f"\n{ticker}:")
    print(f"  SBC 3Y CAGR: {sbc_cagr*100:.1f}% | Rev 3Y CAGR: {rev_cagr*100:.1f}%")
    print(f"  SBC/Rev趋势: {' → '.join([f'{x:.1f}%' for x in sbc_rev_trend])}")
    gap = sbc_cagr - rev_cagr
    direction = "SBC增速 > 收入增速 (负面)" if gap > 0 else "SBC增速 < 收入增速 (正面)"
    print(f"  剪刀差方向: {direction} (差距 {abs(gap)*100:.1f}pp)")

# R&D vs Revenue
print("\n\n### 剪刀差 2: R&D/Rev趋势")
rd_data = {
    "CRWD": {"rd": [608, 768, 1077, 1381], "rev": [2241, 3056, 3954, 4812]},
    "PANW": {"rd": [1418, 1604, 1809, 1984], "rev": [5502, 6893, 8028, 9222]},
    "FTNT": {"rd": [512, 614, 717, 816], "rev": [4417, 5305, 5956, 6800]},
}

for ticker in ["CRWD", "PANW", "FTNT"]:
    rd = rd_data[ticker]
    ratios = [rd["rd"][i]/rd["rev"][i]*100 for i in range(4)]
    print(f"  {ticker}: R&D/Rev = {' → '.join([f'{x:.1f}%' for x in ratios])}")

# FCF conversion
print("\n\n### 剪刀差 3: GAAP NI vs FCF (现金转化质量)")
for ticker in ["CRWD", "PANW", "FTNT"]:
    d = companies[ticker]
    print(f"  {ticker}: GAAP NI ${d['gaap_ni_M']}M vs FCF ${d['fcf_M']}M "
          f"→ 差距 ${d['fcf_M'] - d['gaap_ni_M']}M "
          f"(SBC ${d['sbc_M']}M 是主要来源)")

# ============================================================
# 7. 军火商模型压力测试
# ============================================================

print("\n\n## 6. 军火商模型压力测试: 安全支出上修情景")
print("=" * 70)

base_security_spend_B = 213  # 2025E
upside_growth = 0.18  # from +13% to +18%
base_growth = 0.13

for scenario_label, growth in [("基准 (+13%)", base_growth), ("上修 (+18%)", upside_growth)]:
    spend_2030 = base_security_spend_B * (1 + growth) ** 5
    print(f"  {scenario_label}: 2025 ${base_security_spend_B}B → 2030E ${spend_2030:.0f}B")

print(f"\n  上修 vs 基准差额 (5Y累计): "
      f"${base_security_spend_B * ((1+upside_growth)**5 - (1+base_growth)**5):.0f}B 增量TAM")
print(f"  CRWD/PANW/FTNT 三家合计份额 ~15-18% → 增量收入 ~${base_security_spend_B * ((1+upside_growth)**5 - (1+base_growth)**5) * 0.16:.0f}B")

# ============================================================
# 8. 最终评级矩阵
# ============================================================

print("\n\n## 7. 最终评级矩阵")
print("=" * 70)

for ticker in ["CRWD", "PANW", "FTNT"]:
    d = companies[ticker]
    r = results[ticker]
    wp = r["weighted_price"]
    wr = r["weighted_return_pct"]

    if wr < -10:
        rating = "审慎关注"
        state = "[贵×恶化×无催化]" if ticker == "CRWD" else "[贵×稳定×无催化]"
    elif -10 <= wr <= 10:
        rating = "中性关注"
        state = "[合理×稳定×—]"
    else:
        rating = "关注"
        state = "[低估×改善×可能]"

    print(f"\n{ticker}:")
    print(f"  当前价: ${d['price']} | 概率加权公允: ${wp:.1f} | 期望回报: {wr:+.1f}%")
    print(f"  评级: {rating} {state}")
    print(f"  高估幅度: {-wr:.0f}%" if wr < 0 else f"  低估幅度: {wr:.0f}%")

# ============================================================
# 9. 输出 JSON 供报告引用
# ============================================================

output = {
    "model_version": "R2_Security_v1.0",
    "date": "2026-04-10",
    "wacc": wacc,
    "companies": {},
}

for ticker in ["CRWD", "PANW", "FTNT"]:
    d = companies[ticker]
    r = results[ticker]
    output["companies"][ticker] = {
        "price": d["price"],
        "mkt_cap_B": d["mkt_cap_B"],
        "weighted_fair_value": round(r["weighted_price"], 1),
        "expected_return_pct": round(r["weighted_return_pct"], 1),
        "implied_fcf_growth": round(implied_growth[ticker] * 100, 1) if implied_growth[ticker] else None,
        "owner_fcf_M": d["owner_fcf_M"],
        "sbc_rev_pct": d["sbc_rev_pct"],
        "p_owner_fcf": round(d["mkt_cap_B"] * 1e3 / d["owner_fcf_M"], 1),
        "scenarios": r["scenarios"],
    }

with open("reports/SAAS_SERIES_R2_SECURITY/data/r2_valuation_results.json", "w") as f:
    json.dump(output, f, indent=2, default=str)

print("\n\n✓ 估值结果已保存到 data/r2_valuation_results.json")
