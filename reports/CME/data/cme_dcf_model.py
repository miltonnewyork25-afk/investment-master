#!/usr/bin/env python3
"""
CME Group DCF Model v3.0
Phase 2 Python验证 — 铁律: LLM不能做算术

三情景 × 两利率假设 = 六种输出
+ 利率敏感性矩阵 + Core P/E分析
"""

import json

# ============================================================
# 基础参数
# ============================================================
SHARES = 362  # million (diluted)
CURRENT_PRICE = 313.33
MARKET_CAP = SHARES * CURRENT_PRICE  # ~$113.4B
TAX_RATE = 0.24

# FY2025 actuals
FY2025 = {
    "revenue": 6520,       # $M
    "operating_income": 4230,
    "net_income": 4044,
    "eps": 11.16,
    "fcf": 4190,
    "dividends": 3930,
    "interest_gross": 5737,
    "interest_distributed": 4837,
    "interest_net_retained": 900,
    "capex": 84,
    "sbc": 95,
    "adv": 28.1,           # million contracts
    "rpc": 0.707,
    "data_revenue": 803,
    "opm": 0.649,
    "ebitda_margin": 0.877,
}

# ============================================================
# 情景定义
# ============================================================
scenarios = {
    "Bull-H": {
        "adv_cagr": 0.08, "opm_terminal": 0.67, "rpc_growth": 0.012,
        "interest_net": 750, "wacc": 0.080, "terminal_g": 0.035,
        "data_cagr": 0.10, "probability": 0.10,
        "desc": "高波+高利率+Treasury成功"
    },
    "Bull-L": {
        "adv_cagr": 0.07, "opm_terminal": 0.66, "rpc_growth": 0.010,
        "interest_net": 400, "wacc": 0.080, "terminal_g": 0.030,
        "data_cagr": 0.09, "probability": 0.15,
        "desc": "高波+低利率"
    },
    "Base-H": {
        "adv_cagr": 0.05, "opm_terminal": 0.65, "rpc_growth": 0.008,
        "interest_net": 550, "wacc": 0.085, "terminal_g": 0.030,
        "data_cagr": 0.08, "probability": 0.25,
        "desc": "温和增长+高利率维持"
    },
    "Base-L": {
        "adv_cagr": 0.04, "opm_terminal": 0.63, "rpc_growth": 0.006,
        "interest_net": 300, "wacc": 0.085, "terminal_g": 0.025,
        "data_cagr": 0.07, "probability": 0.25,
        "desc": "温和增长+利率下行"
    },
    "Bear-H": {
        "adv_cagr": 0.02, "opm_terminal": 0.62, "rpc_growth": 0.004,
        "interest_net": 250, "wacc": 0.090, "terminal_g": 0.025,
        "data_cagr": 0.05, "probability": 0.15,
        "desc": "低波+温和利率"
    },
    "Bear-L": {
        "adv_cagr": 0.01, "opm_terminal": 0.58, "rpc_growth": 0.002,
        "interest_net": 70, "wacc": 0.095, "terminal_g": 0.020,
        "data_cagr": 0.03, "probability": 0.10,
        "desc": "ZIRP+低波"
    },
}

def project_financials(scenario, years=5):
    """Project CME financials for N years."""
    s = scenarios[scenario]
    results = []

    # Starting values
    adv = FY2025["adv"]
    rpc = FY2025["rpc"]
    data_rev = FY2025["data_revenue"]
    other_rev = 436  # FY2025 other revenue
    opm_start = FY2025["opm"]
    opm_end = s["opm_terminal"]

    for yr in range(1, years + 1):
        # ADV grows at scenario CAGR
        adv *= (1 + s["adv_cagr"])
        # RPC grows at scenario rate
        rpc *= (1 + s["rpc_growth"])
        # Clearing revenue = ADV * 252 trading days * RPC / 1000 (to $M)
        clearing_rev = adv * 252 * rpc
        # Data revenue grows at scenario CAGR
        data_rev *= (1 + s["data_cagr"])
        # Other revenue grows at 2%
        other_rev *= 1.02
        # Total revenue
        total_rev = clearing_rev + data_rev + other_rev
        # OPM ramps linearly from start to terminal
        opm = opm_start + (opm_end - opm_start) * yr / years
        # Operating income
        op_income = total_rev * opm
        # Interest net retained (assumed flat at scenario level)
        interest_net = s["interest_net"]
        # Pre-tax income = op_income + interest_net
        pre_tax = op_income + interest_net
        # Net income
        ni = pre_tax * (1 - TAX_RATE)
        # EPS
        eps = ni / SHARES
        # FCF ≈ NI + D&A - CapEx (simplified)
        da = 250  # roughly stable
        capex = 90 + (115 if yr <= 3 else 50)  # Cloud migration until yr 3
        fcf = ni + da - capex

        results.append({
            "year": 2025 + yr,
            "adv": round(adv, 1),
            "rpc": round(rpc, 3),
            "clearing_rev": round(clearing_rev),
            "data_rev": round(data_rev),
            "total_rev": round(total_rev),
            "opm": round(opm, 3),
            "op_income": round(op_income),
            "interest_net": interest_net,
            "ni": round(ni),
            "eps": round(eps, 2),
            "fcf": round(fcf),
        })
    return results

def dcf_value(scenario, years=5):
    """Calculate DCF fair value per share."""
    s = scenarios[scenario]
    projections = project_financials(scenario, years)
    wacc = s["wacc"]
    terminal_g = s["terminal_g"]

    # Sum of discounted FCFs
    pv_fcfs = 0
    for i, yr_data in enumerate(projections):
        pv_fcfs += yr_data["fcf"] / (1 + wacc) ** (i + 1)

    # Terminal value (Gordon Growth on last year FCF)
    terminal_fcf = projections[-1]["fcf"]
    terminal_value = terminal_fcf * (1 + terminal_g) / (wacc - terminal_g)
    pv_terminal = terminal_value / (1 + wacc) ** years

    # Enterprise value
    ev = pv_fcfs + pv_terminal

    # Equity value (EV + net cash)
    net_cash = 670  # FY2025 net cash position
    equity_value = ev + net_cash

    # Per share
    fair_value = equity_value / SHARES

    return {
        "scenario": scenario,
        "fair_value": round(fair_value, 1),
        "vs_current": round((fair_value / CURRENT_PRICE - 1) * 100, 1),
        "terminal_eps": projections[-1]["eps"],
        "terminal_rev": projections[-1]["total_rev"],
        "pv_fcfs": round(pv_fcfs),
        "pv_terminal": round(pv_terminal),
        "ev": round(ev),
    }

def sensitivity_matrix():
    """WACC vs Terminal Growth sensitivity on Base-H scenario."""
    base = scenarios["Base-H"].copy()
    waccs = [0.075, 0.080, 0.085, 0.090, 0.095]
    growths = [0.020, 0.025, 0.030, 0.035]

    matrix = {}
    for w in waccs:
        row = {}
        for g in growths:
            scenarios["_temp"] = base.copy()
            scenarios["_temp"]["wacc"] = w
            scenarios["_temp"]["terminal_g"] = g
            result = dcf_value("_temp")
            row[f"{g:.1%}"] = result["fair_value"]
        matrix[f"{w:.1%}"] = row
    del scenarios["_temp"]
    return matrix

def core_pe_analysis():
    """Core P/E: strip out interest income."""
    gaap_eps = FY2025["eps"]
    interest_contribution = FY2025["interest_net_retained"] * (1 - TAX_RATE) / SHARES
    core_eps = gaap_eps - interest_contribution
    gaap_pe = CURRENT_PRICE / gaap_eps
    core_pe = CURRENT_PRICE / core_eps

    # Normalized interest scenarios
    normalized = {}
    for label, net_int in [("ZIRP", 70), ("Low", 200), ("Mid", 500), ("Current", 900)]:
        int_contrib = net_int * (1 - TAX_RATE) / SHARES
        norm_eps = core_eps + int_contrib
        norm_pe = CURRENT_PRICE / norm_eps
        normalized[label] = {
            "net_interest": net_int,
            "eps": round(norm_eps, 2),
            "pe": round(norm_pe, 1),
        }

    return {
        "gaap_eps": round(gaap_eps, 2),
        "interest_eps_contribution": round(interest_contribution, 2),
        "core_eps": round(core_eps, 2),
        "gaap_pe": round(gaap_pe, 1),
        "core_pe": round(core_pe, 1),
        "normalized_scenarios": normalized,
    }

def interest_sensitivity():
    """Interest rate sensitivity matrix."""
    results = []
    for iorb, cash_pool in [(5.25, 120), (4.40, 130), (3.50, 125),
                             (2.50, 120), (1.50, 115), (0.25, 110)]:
        gross = cash_pool * iorb / 100 * 1000  # $M (pool in $B)
        retention_rate = 0.13  # normalized to 13%
        net = gross * retention_rate
        eps_impact = net * (1 - TAX_RATE) / SHARES
        eps_total = (FY2025["eps"] - FY2025["interest_net_retained"] * (1 - TAX_RATE) / SHARES) + eps_impact
        price_at_28x = eps_total * 28

        results.append({
            "iorb": iorb,
            "cash_pool_B": cash_pool,
            "gross_interest_M": round(gross),
            "net_retained_M": round(net),
            "eps_interest": round(eps_impact, 2),
            "total_eps": round(eps_total, 2),
            "price_at_28x": round(price_at_28x),
            "vs_current": round((price_at_28x / CURRENT_PRICE - 1) * 100, 1),
        })
    return results

# ============================================================
# Main execution
# ============================================================
if __name__ == "__main__":
    print("=" * 70)
    print("CME Group DCF Model v3.0 — Phase 2 Python验证")
    print("=" * 70)

    # 1. Six-scenario DCF
    print("\n📊 六情景DCF估值:")
    print(f"{'Scenario':<12} {'Fair Value':>10} {'vs $313':>8} {'2030E EPS':>10} {'Prob':>6}")
    print("-" * 50)

    pw_ev = 0
    for name in scenarios:
        if name.startswith("_"):
            continue
        result = dcf_value(name)
        prob = scenarios[name]["probability"]
        pw_ev += result["fair_value"] * prob
        print(f"{name:<12} ${result['fair_value']:>8.1f} {result['vs_current']:>7.1f}% "
              f"${result['terminal_eps']:>8.2f} {prob:>5.0%}")

    print(f"\n{'概率加权EV:':<12} ${pw_ev:>8.1f} {(pw_ev/CURRENT_PRICE-1)*100:>7.1f}%")

    # 2. Core P/E
    print("\n📊 Core P/E分析:")
    core = core_pe_analysis()
    print(f"  GAAP EPS:     ${core['gaap_eps']}")
    print(f"  利息贡献:      ${core['interest_eps_contribution']}/股")
    print(f"  Core EPS:     ${core['core_eps']}")
    print(f"  GAAP P/E:     {core['gaap_pe']}x")
    print(f"  Core P/E:     {core['core_pe']}x  ← 真实运营业务估值")
    print(f"\n  正常化情景:")
    for label, data in core["normalized_scenarios"].items():
        print(f"    {label:<10} 利息${data['net_interest']}M → EPS ${data['eps']} → P/E {data['pe']}x")

    # 3. Interest sensitivity
    print("\n📊 利率敏感性矩阵:")
    print(f"{'IORB':>6} {'Cash($B)':>9} {'Gross($M)':>10} {'Net($M)':>8} {'EPS':>6} {'Price@28x':>10} {'vs $313':>8}")
    print("-" * 60)
    for row in interest_sensitivity():
        print(f"{row['iorb']:>5.2f}% {row['cash_pool_B']:>8}B ${row['gross_interest_M']:>8}M "
              f"${row['net_retained_M']:>6}M ${row['total_eps']:>5.2f} "
              f"${row['price_at_28x']:>8} {row['vs_current']:>7.1f}%")

    # 4. Sensitivity matrix
    print("\n📊 WACC × Terminal Growth 敏感性矩阵 (Base-H):")
    matrix = sensitivity_matrix()
    header = "WACC \\ g  |"
    for g in ["2.0%", "2.5%", "3.0%", "3.5%"]:
        header += f" {g:>6} |"
    print(header)
    print("-" * 45)
    for wacc_label, row in matrix.items():
        line = f" {wacc_label:<8} |"
        for g, val in row.items():
            marker = " *" if wacc_label == "8.5%" and g == "3.0%" else "  "
            line += f" ${val:>4.0f}{marker}|"
        print(line)

    # 5. Summary
    print("\n" + "=" * 70)
    print("📋 估值总结:")
    print(f"  概率加权公允价值: ${pw_ev:.0f}")
    print(f"  当前价格:         ${CURRENT_PRICE}")
    print(f"  高估/低估:        {(pw_ev/CURRENT_PRICE-1)*100:.1f}%")
    print(f"  Core P/E:         {core['core_pe']}x (vs GAAP {core['gaap_pe']}x)")
    print(f"  正常化EPS(利息$500M): ${core['normalized_scenarios']['Mid']['eps']}")
    print(f"  正常化P/E:        {core['normalized_scenarios']['Mid']['pe']}x")
    print("=" * 70)

    # Save results
    output = {
        "probability_weighted_ev": round(pw_ev, 1),
        "vs_current_pct": round((pw_ev/CURRENT_PRICE-1)*100, 1),
        "core_pe": core,
        "interest_sensitivity": interest_sensitivity(),
        "scenarios": {name: dcf_value(name) for name in scenarios if not name.startswith("_")},
    }

    with open("reports/CME/data/dcf_output.json", "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print("\n✅ 结果已保存到 reports/CME/data/dcf_output.json")
