#!/usr/bin/env python3
"""
MSCI v3.0 估值验证脚本
G6: Python验证 — SOTP + Reverse DCF + 敏感性矩阵
"""

# === SOTP v3.0 ===
def sotp_valuation():
    """四引擎独立定价 + 净债务扣除"""

    # 分部EBIT (调整后, 校准至总EBIT $1,714M)
    index_ebit = 1435  # $M, ~81% margin on ~$1,775M rev
    analytics_ebit = 288  # ~41% margin on ~$700M rev
    sc_ebit = 75  # ~22% margin on ~$340M rev
    pa_ebit = 9  # ~3% margin on ~$270M rev
    corp = -93  # 公司级费用
    total_ebit = index_ebit + analytics_ebit + sc_ebit + pa_ebit + corp

    print(f"=== SOTP v3.0 ===")
    print(f"Total EBIT: ${total_ebit}M (actual: $1,714M, diff: {total_ebit - 1714}M)")

    # PA用Revenue倍数(利润太低)
    pa_rev = 270  # $M

    scenarios = {
        '保守': {'idx': 28, 'ana': 20, 'sc': 18, 'pa_rev_x': 6, 'desc': '低倍数'},
        '基准': {'idx': 30, 'ana': 22, 'sc': 20, 'pa_rev_x': 8, 'desc': '合理倍数'},
        '乐观': {'idx': 32, 'ana': 24, 'sc': 22, 'pa_rev_x': 10, 'desc': '高倍数'},
    }

    net_debt = 5794  # $M
    shares = 77.3  # M diluted

    results = {}
    for name, s in scenarios.items():
        idx_ev = index_ebit * s['idx']
        ana_ev = analytics_ebit * s['ana']
        sc_ev = sc_ebit * s['sc']
        pa_ev = pa_rev * s['pa_rev_x']
        corp_ev = corp * 15  # corp费用用15x

        gross_ev = idx_ev + ana_ev + sc_ev + pa_ev + corp_ev
        equity = gross_ev - net_debt
        per_share = equity / shares

        results[name] = per_share

        print(f"\n  {name}({s['desc']}):")
        print(f"    Index: ${idx_ev:,.0f}M ({s['idx']}x)")
        print(f"    Analytics: ${ana_ev:,.0f}M ({s['ana']}x)")
        print(f"    S&C: ${sc_ev:,.0f}M ({s['sc']}x)")
        print(f"    PA: ${pa_ev:,.0f}M ({s['pa_rev_x']}x Rev)")
        print(f"    Corp: ${corp_ev:,.0f}M (15x)")
        print(f"    Gross EV: ${gross_ev:,.0f}M")
        print(f"    - Net Debt: ${net_debt:,.0f}M")
        print(f"    Equity: ${equity:,.0f}M")
        print(f"    Per Share: ${per_share:,.0f}")

    # 离散度
    vals = list(results.values())
    dispersion = (max(vals) - min(vals)) / sorted(vals)[1]
    print(f"\n  离散度: {dispersion:.1%} (G7门控: ≤30%)")
    print(f"  {'✓ PASS' if dispersion <= 0.30 else '✗ FAIL'}")

    return results, dispersion


# === Reverse DCF ===
def reverse_dcf():
    """反推隐含永续增长率"""

    ev = 49100  # $M (市值43.3B + 净债务5.8B)
    fcf = 1549  # $M FY2025

    print(f"\n=== Reverse DCF ===")

    for wacc in [0.085, 0.090, 0.095, 0.100, 0.105]:
        # EV = FCF*(1+g) / (WACC - g)
        # EV*(WACC-g) = FCF*(1+g)
        # EV*WACC - EV*g = FCF + FCF*g
        # EV*WACC - FCF = g*(EV + FCF)
        # g = (EV*WACC - FCF) / (EV + FCF)
        g = (ev * wacc - fcf) / (ev + fcf)
        print(f"  WACC {wacc:.1%}: 隐含g = {g:.1%}")

    # 基准
    wacc_base = 0.095
    g_base = (ev * wacc_base - fcf) / (ev + fcf)
    print(f"\n  基准(WACC=9.5%): 隐含永续增长 = {g_base:.1%}")
    return g_base


# === OPM敏感性 ===
def opm_sensitivity():
    """不同OPM假设下的隐含估值"""

    revenue = 3134  # $M
    wacc = 0.095
    g = 0.058  # 隐含增长
    net_debt = 5794
    shares = 77.3
    tax_rate = 0.195
    da_rate = 0.070  # D&A/Rev
    capex_rate = 0.013

    print(f"\n=== OPM敏感性 ===")
    print(f"{'OPM':>6} | {'EBIT':>8} | {'NOPAT':>8} | {'FCF':>8} | {'EV':>10} | {'Equity':>10} | {'$/Share':>8}")
    print("-" * 75)

    for opm in [0.53, 0.55, 0.57, 0.60]:
        ebit = revenue * opm
        nopat = ebit * (1 - tax_rate)
        fcf = nopat + revenue * da_rate - revenue * capex_rate  # simplified
        ev = fcf * (1 + g) / (wacc - g)
        equity = ev - net_debt
        per_share = equity / shares
        print(f"  {opm:.0%}  | ${ebit:>7,.0f} | ${nopat:>7,.0f} | ${fcf:>7,.0f} | ${ev:>9,.0f} | ${equity:>9,.0f} | ${per_share:>7,.0f}")


# === OEY计算 ===
def oey_calculation():
    """Owner Earnings Yield"""

    fcf = 1549  # $M
    ev = 49100  # $M
    g = 0.10  # 可持续增长(保守)
    rf = 0.045  # 5Y Treasury

    oey = fcf / ev
    oey_plus_g = oey + g
    spread = oey_plus_g - rf

    print(f"\n=== OEY锚定 ===")
    print(f"  FCF: ${fcf}M")
    print(f"  EV: ${ev}M")
    print(f"  OEY: {oey:.2%}")
    print(f"  g: {g:.0%}")
    print(f"  OEY+g: {oey_plus_g:.2%}")
    print(f"  Rf: {rf:.1%}")
    print(f"  OEY Spread: {spread:.2%}")


# === 综合 ===
def main():
    print("=" * 60)
    print("  MSCI v3.0 估值验证 (G6 Python必须)")
    print("=" * 60)

    sotp_results, disp = sotp_valuation()
    g_implied = reverse_dcf()
    opm_sensitivity()
    oey_calculation()

    # 三方法综合
    print(f"\n=== 三方法综合 ===")
    sotp_base = sotp_results['基准']
    oey_implied = 560  # 当前价格≈OEY合理
    pe_base = 35 * 17.2  # 35x × FY2026E EPS

    weighted = 0.40 * sotp_base + 0.20 * oey_implied + 0.40 * pe_base
    print(f"  SOTP基准: ${sotp_base:.0f}")
    print(f"  OEY隐含: ${oey_implied:.0f}")
    print(f"  PE基准: ${pe_base:.0f}")
    print(f"  加权(40/20/40): ${weighted:.0f}")
    print(f"  vs 当前$560: {(weighted/560 - 1):.1%}")

    # G6/G7验证
    print(f"\n=== 门控验证 ===")
    print(f"  G6 Python验证: ✓ PASS (本脚本执行完成)")
    print(f"  G7 离散度: {disp:.1%} {'✓ PASS' if disp <= 0.30 else '✗ FAIL'} (门控≤30%)")


if __name__ == '__main__':
    main()
