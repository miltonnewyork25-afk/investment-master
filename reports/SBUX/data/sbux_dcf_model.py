#!/usr/bin/env python3
"""
SBUX DCF Model — Phase 3 Python验证
3情景 × 5年FCFF + Terminal Value + 敏感性矩阵
铁律3: LLM不能做算术, 所有估值数字必须Python产出
"""

import json

# ============================================================
# 基础参数
# ============================================================
SHARES_OUT = 1.14e9  # 流通股 (B)
NET_DEBT = 23.0e9    # 纯金融债净额(排除租赁双重计算)
CURRENT_PRICE = 96.76
MARKET_CAP = SHARES_OUT * CURRENT_PRICE  # ~$110.3B
EV_CURRENT = MARKET_CAP + NET_DEBT       # ~$140.4B
TAX_RATE = 0.24      # 正常化税率
BASE_REVENUE = 37.18e9  # FY2025 收入
BASE_FCF = 2.44e9    # FY2025 FCF

# ============================================================
# 三情景定义
# ============================================================
scenarios = {
    "牛市(OPM恢复+加速增长)": {
        "probability": 0.20,
        "rev_growth": [0.045, 0.055, 0.055, 0.050, 0.045],  # FY2026-FY2030
        "opm_path":   [0.110, 0.130, 0.145, 0.155, 0.160],
        "capex_pct":  [0.060, 0.055, 0.055, 0.050, 0.050],
        "da_pct":     [0.045, 0.043, 0.042, 0.040, 0.040],
        "nwc_pct":    [0.005, 0.003, 0.002, 0.002, 0.002],  # NWC drain as % of rev
        "terminal_g": 0.030,
        "wacc": 0.050,  # 修正: Fed降息预期→前瞻性WACC
        "label": "牛市"
    },
    "基准(第一性原理恢复)": {
        "probability": 0.45,  # 修正: 50%→45%, 5pp转移至熊市
        "rev_growth": [0.031, 0.045, 0.045, 0.042, 0.040],
        "opm_path":   [0.105, 0.120, 0.132, 0.138, 0.140],  # 修正: 终态13.5%→14.0%(FY2023=16.3%的合理折扣)
        "capex_pct":  [0.062, 0.058, 0.055, 0.055, 0.053],
        "da_pct":     [0.048, 0.045, 0.043, 0.042, 0.042],
        "nwc_pct":    [0.008, 0.005, 0.003, 0.003, 0.002],
        "terminal_g": 0.025,
        "wacc": 0.056,  # 修正: 6.3%→5.6%(前瞻利率下行, 利率中位数法)
        "label": "基准"
    },
    "熊市(恢复失败+margin陷阱)": {
        "probability": 0.30,  # 修正: 25%→30%(基准-5pp转移至此)
        "rev_growth": [0.020, 0.025, 0.030, 0.030, 0.025],
        "opm_path":   [0.095, 0.100, 0.108, 0.112, 0.115],
        "capex_pct":  [0.065, 0.062, 0.060, 0.058, 0.055],
        "da_pct":     [0.050, 0.048, 0.046, 0.045, 0.044],
        "nwc_pct":    [0.012, 0.008, 0.005, 0.004, 0.003],
        "terminal_g": 0.020,
        "wacc": 0.075,
        "label": "熊市"
    },
    "极端熊(衰退+信用压力)": {
        "probability": 0.05,
        "rev_growth": [-0.02, 0.005, 0.015, 0.020, 0.020],
        "opm_path":   [0.080, 0.085, 0.090, 0.095, 0.100],
        "capex_pct":  [0.055, 0.050, 0.050, 0.050, 0.050],
        "da_pct":     [0.052, 0.050, 0.048, 0.046, 0.045],
        "nwc_pct":    [0.020, 0.012, 0.008, 0.005, 0.003],
        "terminal_g": 0.015,
        "wacc": 0.085,
        "label": "极端熊"
    }
}

# ============================================================
# DCF 计算
# ============================================================
def run_dcf(params, base_rev=BASE_REVENUE):
    """运行单一情景DCF"""
    results = {"years": [], "fcff": [], "pv_fcff": []}
    rev = base_rev
    cumulative_pv = 0

    for yr in range(5):
        # 收入
        rev = rev * (1 + params["rev_growth"][yr])
        # EBIT
        ebit = rev * params["opm_path"][yr]
        # NOPAT
        nopat = ebit * (1 - TAX_RATE)
        # D&A
        da = rev * params["da_pct"][yr]
        # CapEx
        capex = rev * params["capex_pct"][yr]
        # NWC变化
        nwc_change = rev * params["nwc_pct"][yr]
        # FCFF = NOPAT + D&A - CapEx - NWC变化
        fcff = nopat + da - capex - nwc_change

        # PV
        discount = (1 + params["wacc"]) ** (yr + 1)
        pv = fcff / discount

        cumulative_pv += pv
        results["years"].append(f"FY{2026+yr}")
        results["fcff"].append(fcff)
        results["pv_fcff"].append(pv)

        # 保存详细
        if yr == 0:
            results["fy26_rev"] = rev
            results["fy26_opm"] = params["opm_path"][yr]
            results["fy26_ebit"] = ebit
            results["fy26_nopat"] = nopat
            results["fy26_fcff"] = fcff

    # Terminal Value
    terminal_fcff = results["fcff"][-1] * (1 + params["terminal_g"])
    tv = terminal_fcff / (params["wacc"] - params["terminal_g"])
    pv_tv = tv / ((1 + params["wacc"]) ** 5)

    results["terminal_fcff"] = terminal_fcff
    results["terminal_value"] = tv
    results["pv_tv"] = pv_tv
    results["pv_fcff_sum"] = cumulative_pv
    results["enterprise_value"] = cumulative_pv + pv_tv
    results["equity_value"] = results["enterprise_value"] - NET_DEBT
    results["per_share"] = results["equity_value"] / SHARES_OUT
    results["upside"] = (results["per_share"] - CURRENT_PRICE) / CURRENT_PRICE
    results["terminal_rev"] = rev
    results["terminal_opm"] = params["opm_path"][-1]
    results["terminal_ebit"] = rev * params["opm_path"][-1]

    # EPS估算 (简化: NI ≈ NOPAT - Interest)
    interest_est = NET_DEBT * 0.045  # 4.5% avg cost of debt (on financial debt only)
    for yr_idx, yr_name in enumerate(results["years"]):
        yr_rev = base_rev
        for i in range(yr_idx + 1):
            yr_rev *= (1 + params["rev_growth"][i])
        yr_ni = yr_rev * params["opm_path"][yr_idx] * (1 - TAX_RATE) - interest_est * (1 - TAX_RATE)
        if yr_idx == 0:
            results["fy26_eps"] = yr_ni / SHARES_OUT
        elif yr_idx == 2:
            results["fy28_eps"] = yr_ni / SHARES_OUT

    return results

# ============================================================
# 敏感性矩阵
# ============================================================
def sensitivity_matrix():
    """OPM × WACC 敏感性"""
    opms = [0.11, 0.12, 0.13, 0.14, 0.15]
    waccs = [0.045, 0.050, 0.056, 0.063, 0.070]
    g = 0.025
    base_params = scenarios["基准(第一性原理恢复)"].copy()

    matrix = {}
    for opm in opms:
        row = {}
        for wacc in waccs:
            params = base_params.copy()
            params["opm_path"] = [opm * (0.8 + 0.04*yr) for yr in range(5)]
            # 简化: 使终态OPM = opm
            params["opm_path"][-1] = opm
            params["opm_path"][-2] = opm * 0.98
            params["wacc"] = wacc
            params["terminal_g"] = g
            r = run_dcf(params)
            row[f"{wacc:.1%}"] = round(r["per_share"], 1)
        matrix[f"{opm:.0%}"] = row
    return matrix

# ============================================================
# 主执行
# ============================================================
if __name__ == "__main__":
    print("=" * 70)
    print("SBUX DCF Model — Phase 3 Python验证")
    print(f"Base: Rev ${BASE_REVENUE/1e9:.2f}B | Price ${CURRENT_PRICE} | Shares {SHARES_OUT/1e9:.2f}B")
    print(f"Net Debt: ${NET_DEBT/1e9:.1f}B | EV: ${EV_CURRENT/1e9:.1f}B")
    print("=" * 70)

    all_results = {}
    pw_ev = 0
    pw_price = 0

    for name, params in scenarios.items():
        r = run_dcf(params)
        all_results[name] = r
        pw_ev += params["probability"] * r["enterprise_value"]
        pw_price += params["probability"] * r["per_share"]

        print(f"\n--- {params['label']} (概率 {params['probability']:.0%}) ---")
        print(f"  WACC: {params['wacc']:.1%} | Terminal g: {params['terminal_g']:.1%}")
        print(f"  FY2026: Rev ${r['fy26_rev']/1e9:.2f}B | OPM {r['fy26_opm']:.1%} | FCFF ${r['fy26_fcff']/1e9:.2f}B")
        if 'fy26_eps' in r:
            print(f"  FY2026 EPS: ${r['fy26_eps']:.2f}")
        if 'fy28_eps' in r:
            print(f"  FY2028 EPS: ${r['fy28_eps']:.2f}")
        print(f"  Terminal: Rev ${r['terminal_rev']/1e9:.2f}B | OPM {r['terminal_opm']:.1%}")
        print(f"  FCFF路径: " + " → ".join([f"${f/1e9:.2f}B" for f in r["fcff"]]))
        print(f"  PV(FCFF): ${r['pv_fcff_sum']/1e9:.2f}B")
        print(f"  PV(TV):   ${r['pv_tv']/1e9:.2f}B ({r['pv_tv']/(r['pv_fcff_sum']+r['pv_tv'])*100:.0f}% of EV)")
        print(f"  EV:       ${r['enterprise_value']/1e9:.2f}B")
        print(f"  Equity:   ${r['equity_value']/1e9:.2f}B")
        print(f"  Per Share: ${r['per_share']:.2f}")
        print(f"  vs Current: {r['upside']:+.1%}")

    print(f"\n{'=' * 70}")
    print(f"概率加权结果:")
    print(f"  PW EV:      ${pw_ev/1e9:.2f}B")
    print(f"  PW Equity:  ${(pw_ev - NET_DEBT)/1e9:.2f}B")
    print(f"  PW Price:   ${pw_price:.2f}")
    print(f"  vs Current: {(pw_price - CURRENT_PRICE)/CURRENT_PRICE:+.1%}")
    print(f"  Premium:    {(CURRENT_PRICE - pw_price)/pw_price:+.1%}")

    # 敏感性
    print(f"\n{'=' * 70}")
    print("敏感性矩阵: 终态OPM × WACC → 每股价值($)")
    print(f"{'OPM':>6}", end="")
    sm = sensitivity_matrix()
    waccs_header = list(list(sm.values())[0].keys())
    for w in waccs_header:
        print(f"{w:>8}", end="")
    print()
    for opm_label, row in sm.items():
        print(f"{opm_label:>6}", end="")
        for w in waccs_header:
            val = row[w]
            marker = " ◀" if abs(val - CURRENT_PRICE) < 5 else ""
            print(f"  ${val:>5.1f}{marker}", end="")
        print()

    print(f"\n当前价格: ${CURRENT_PRICE} (◀ 标记)")

    # SOTP三重身份
    print(f"\n{'=' * 70}")
    print("SOTP三重身份估值:")

    # 身份A: 咖啡零售运营商
    a_rev = 29.5e9  # 自营门店收入
    a_opm = 0.12    # 正常化门店OPM
    a_ebitda = a_rev * (a_opm + 0.04)  # +D&A
    a_multiple = 10  # 纯零售EV/EBITDA
    a_ev = a_ebitda * a_multiple

    # 身份B: 数字忠诚度平台
    b_stored_value = 1.8e9  # 浮存金
    b_digital_rev = 37.18e9 * 0.57  # 57% digital渗透的交易
    b_premium = 0.03  # 数字溢价
    b_ev = b_stored_value * 1.5 + b_digital_rev * b_premium  # DFFV + 数字溢价

    # 身份C: 品牌授权
    c_license_rev = 4.7e9  # 授权+CPG
    c_margin = 0.55  # 高margin
    c_ebitda = c_license_rev * c_margin
    c_multiple = 18  # 品牌授权倍数
    c_ev = c_ebitda * c_multiple

    # 中国JV
    china_ev = 4.0e9 * 0.40  # 40%保留权益

    sotp_ev = a_ev + b_ev + c_ev + china_ev
    sotp_equity = sotp_ev - NET_DEBT
    sotp_price = sotp_equity / SHARES_OUT

    print(f"  身份A (咖啡零售): Rev ${a_rev/1e9:.1f}B × OPM {a_opm:.0%} × EV/EBITDA {a_multiple}x = ${a_ev/1e9:.1f}B")
    print(f"  身份B (数字平台): DFFV ${b_stored_value/1e9:.1f}B × 1.5 + Digital溢价 = ${b_ev/1e9:.1f}B")
    print(f"  身份C (品牌授权): Rev ${c_license_rev/1e9:.1f}B × Margin {c_margin:.0%} × {c_multiple}x = ${c_ev/1e9:.1f}B")
    print(f"  中国JV (40%):     ${china_ev/1e9:.1f}B")
    print(f"  ---")
    print(f"  SOTP EV:    ${sotp_ev/1e9:.2f}B")
    print(f"  - Net Debt: ${NET_DEBT/1e9:.1f}B")
    print(f"  SOTP Equity: ${sotp_equity/1e9:.2f}B")
    print(f"  SOTP Price:  ${sotp_price:.2f}")
    print(f"  vs Current:  {(sotp_price - CURRENT_PRICE)/CURRENT_PRICE:+.1%}")

    # 可比估值
    print(f"\n{'=' * 70}")
    print("可比公司估值:")
    comps = {
        "MCD": {"ev_ebitda": 18.7, "pe": 28.0, "model": "95%特许"},
        "CMG": {"ev_ebitda": 35.0, "pe": 48.0, "model": "100%自营"},
        "QSR": {"ev_ebitda": 16.0, "pe": 18.0, "model": "特许+自营"},
        "DPZ": {"ev_ebitda": 22.0, "pe": 30.0, "model": "特许"},
        "YUM": {"ev_ebitda": 20.0, "pe": 26.0, "model": "95%特许"},
    }

    sbux_ebitda_normalized = 37.18e9 * 0.145  # 正常化EBITDA margin ~14.5%
    sbux_eps_normalized = 2.10

    print(f"\n  SBUX 正常化 EBITDA: ${sbux_ebitda_normalized/1e9:.2f}B | EPS: ${sbux_eps_normalized:.2f}")
    print(f"\n  {'Comp':>6} | {'EV/EBITDA':>10} | {'P/E':>6} | {'Model':>15} | {'SBUX隐含价(EV/EBITDA)':>22} | {'SBUX隐含价(P/E)':>16}")
    print(f"  {'-'*6}-+-{'-'*10}-+-{'-'*6}-+-{'-'*15}-+-{'-'*22}-+-{'-'*16}")

    for name, c in comps.items():
        implied_ev = sbux_ebitda_normalized * c["ev_ebitda"]
        implied_price_ebitda = (implied_ev - NET_DEBT) / SHARES_OUT
        implied_price_pe = sbux_eps_normalized * c["pe"]
        print(f"  {name:>6} | {c['ev_ebitda']:>10.1f}x | {c['pe']:>5.1f}x | {c['model']:>15} | ${implied_price_ebitda:>20.2f} | ${implied_price_pe:>14.2f}")

    # 方法汇总
    print(f"\n{'=' * 70}")
    print("估值方法汇总:")
    methods = {
        "DCF 概率加权": pw_price,
        "DCF 基准情景": all_results["基准(第一性原理恢复)"]["per_share"],
        "DCF 牛市情景": all_results["牛市(OPM恢复+加速增长)"]["per_share"],
        "DCF 熊市情景": all_results["熊市(恢复失败+margin陷阱)"]["per_share"],
        "SOTP 三重身份": sotp_price,
        "FMP DCF": 64.17,
    }
    for method, val in methods.items():
        upside = (val - CURRENT_PRICE) / CURRENT_PRICE
        print(f"  {method:<20}: ${val:>7.2f} ({upside:+.1%})")

    # 综合概率加权 (DCF 60% + SOTP 25% + 可比 15%)
    comp_avg = sum([(sbux_ebitda_normalized * c["ev_ebitda"] - NET_DEBT) / SHARES_OUT for c in comps.values()]) / len(comps)
    blended = pw_price * 0.60 + sotp_price * 0.25 + comp_avg * 0.15
    print(f"\n  综合加权 (DCF 60% + SOTP 25% + 可比 15%): ${blended:.2f} ({(blended-CURRENT_PRICE)/CURRENT_PRICE:+.1%})")
    print(f"  当前价格: ${CURRENT_PRICE}")

    expected_return = (blended - CURRENT_PRICE) / CURRENT_PRICE
    if expected_return > 0.30:
        rating = "深度关注"
    elif expected_return > 0.10:
        rating = "关注"
    elif expected_return > -0.10:
        rating = "中性关注"
    else:
        rating = "审慎关注"
    print(f"\n  期望回报: {expected_return:+.1%} → 初判评级: {rating}")
