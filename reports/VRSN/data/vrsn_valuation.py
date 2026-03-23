#!/usr/bin/env python3
"""
VeriSign (VRSN) 收费站DCF估值模型
- 多情景: 提价路径 × 域名增长 × 回购效率
- Python验证: 铁律G6门控
"""

import json

# ==================== 基础参数 ====================
CURRENT_PRICE = 240.78
SHARES_OUT = 92.6e6  # FY2025 diluted
MARKET_CAP = CURRENT_PRICE * SHARES_OUT
NET_DEBT = 1.49e9  # $1.80B debt - $0.31B cash
EV = MARKET_CAP + NET_DEBT

# FY2025 基础财务
REV_2025 = 1656.6e6
FCF_2025 = 1068.3e6
EBITDA_2025 = 1171.5e6
OPM_2025 = 0.677
FCF_MARGIN_2025 = 0.645
COM_DOMAINS_2025 = 161.0e6
COM_PRICE_2025 = 10.26
NET_PRICE_2025 = 9.92
NET_DOMAINS_2025 = 12.5e6

# WACC
WACC = 0.085  # Beta 0.765, ERP 5%, Rf 4.3%
TERMINAL_GROWTH = 0.025  # 永续增长率(保守)

print("=" * 70)
print("VeriSign (VRSN) 收费站DCF估值模型")
print("=" * 70)

# ==================== 模型1: Reverse DCF精确化 ====================
print("\n### 模型1: Reverse DCF (反推隐含增长率)")

# 单阶段Gordon模型: EV = FCF1 / (WACC - g)
# g = WACC - FCF1/EV
fcf1 = FCF_2025 * 1.05  # 假设FY2026 FCF增长5%
g_implied_single = WACC - fcf1 / EV
print(f"  单阶段隐含g: {g_implied_single:.2%}")

# 两阶段模型: 高增长4年(2026-2029) + 永续
# 高增长期: g1 = 7%(合同提价)
# 求解永续g2使得PV = EV
g1 = 0.07  # 合同提价期增速
n_high = 4  # 高增长年数

# PV高增长期
pv_high = 0
fcf = FCF_2025
for i in range(1, n_high + 1):
    fcf = fcf * (1 + g1)
    pv_high += fcf / (1 + WACC) ** i

# 求解g2: PV_terminal = fcf * (1+g2) / (WACC - g2) / (1+WACC)^n
# EV = pv_high + PV_terminal
pv_terminal_needed = EV - pv_high
fcf_terminal = FCF_2025 * (1 + g1) ** n_high

# PV_terminal = fcf_terminal * (1+g2) / (WACC-g2) / (1+WACC)^n_high
# 求解g2
# pv_terminal_needed * (1+WACC)^n = fcf_terminal * (1+g2) / (WACC-g2)
pv_t_fv = pv_terminal_needed * (1 + WACC) ** n_high
# pv_t_fv = fcf_terminal * (1+g2) / (WACC - g2)
# pv_t_fv * (WACC - g2) = fcf_terminal * (1 + g2)
# pv_t_fv * WACC - pv_t_fv * g2 = fcf_terminal + fcf_terminal * g2
# pv_t_fv * WACC - fcf_terminal = g2 * (pv_t_fv + fcf_terminal)
g2_implied = (pv_t_fv * WACC - fcf_terminal) / (pv_t_fv + fcf_terminal)
print(f"  两阶段隐含g2: {g2_implied:.2%} (高增长g1=7%, 4年)")
print(f"  => 市场定价隐含永续FCF增长 {g2_implied:.1%}")

# ==================== 模型2: 收费站DCF ====================
print("\n### 模型2: 收费站DCF (5情景)")

def toll_booth_dcf(
    com_growth_rates,  # 每年.com域名增长率 [list, 10年]
    price_increase_rates,  # 每年提价率 [list, 10年]
    opm_path,  # OPM路径 [list, 10年]
    fcf_margin_path,  # FCF Margin路径 [list, 10年]
    buyback_pct,  # 回购占FCF比例
    terminal_g,  # 永续增长率
    wacc,  # 折现率
    label=""
):
    """收费站DCF: 域名数×批发价→收入→FCF→估值"""
    com_domains = COM_DOMAINS_2025
    com_price = COM_PRICE_2025
    net_domains = NET_DOMAINS_2025
    net_price = NET_PRICE_2025
    shares = SHARES_OUT

    fcf_projections = []
    eps_projections = []
    rev_projections = []

    for year in range(10):
        # 域名增长
        com_domains *= (1 + com_growth_rates[year])
        net_domains *= (1 + com_growth_rates[year] * 0.5)  # .net增速=.com一半

        # 提价
        com_price *= (1 + price_increase_rates[year])
        net_price *= (1 + price_increase_rates[year] * 1.2)  # .net提价=.com×1.2

        # 收入
        com_rev = com_domains * com_price
        net_rev = net_domains * net_price
        other_rev = 32e6 * (1.03 ** (year + 1))  # DNS安全服务3%增长
        total_rev = com_rev + net_rev + other_rev

        # FCF
        fcf = total_rev * fcf_margin_path[year]

        # 回购 → 减少流通股
        buyback_amount = fcf * buyback_pct
        buyback_price = CURRENT_PRICE * (1.05 ** (year + 1))  # 假设股价年涨5%
        shares_bought = buyback_amount / buyback_price
        shares -= shares_bought

        # EPS (用OPM近似净利)
        op_income = total_rev * opm_path[year]
        net_income = op_income * 0.73  # 假设有效税率23% + 利息4%
        eps = net_income / shares

        fcf_projections.append(fcf)
        eps_projections.append(eps)
        rev_projections.append(total_rev)

    # 终端价值
    terminal_fcf = fcf_projections[-1] * (1 + terminal_g)
    terminal_value = terminal_fcf / (wacc - terminal_g)

    # DCF
    pv_fcf = sum(f / (1 + wacc) ** (i + 1) for i, f in enumerate(fcf_projections))
    pv_terminal = terminal_value / (1 + wacc) ** 10
    enterprise_value = pv_fcf + pv_terminal
    equity_value = enterprise_value - NET_DEBT
    fair_price = equity_value / SHARES_OUT
    upside = (fair_price / CURRENT_PRICE - 1) * 100

    # EPS终端
    eps_2035 = eps_projections[-1]

    print(f"\n  [{label}]")
    print(f"    2035E Revenue: ${rev_projections[-1]/1e9:.2f}B")
    print(f"    2035E FCF:     ${fcf_projections[-1]/1e6:.0f}M")
    print(f"    2035E EPS:     ${eps_2035:.2f}")
    print(f"    PV(FCF):       ${pv_fcf/1e9:.2f}B")
    print(f"    PV(Terminal):  ${pv_terminal/1e9:.2f}B")
    print(f"    Enterprise:    ${enterprise_value/1e9:.2f}B")
    print(f"    Fair Price:    ${fair_price:.0f}")
    print(f"    Upside:        {upside:+.1f}%")

    return {
        "label": label,
        "fair_price": fair_price,
        "upside": upside,
        "ev": enterprise_value,
        "eps_2035": eps_2035,
        "fcf_2035": fcf_projections[-1],
        "rev_2035": rev_projections[-1],
    }

# 情景1: 基准(提价7%到2030, 之后CPI 3%, 域名+1%/年)
results = []
r = toll_booth_dcf(
    com_growth_rates=[0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005],
    price_increase_rates=[0.07, 0.07, 0.07, 0.07, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03],
    opm_path=[0.68, 0.685, 0.69, 0.695, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70],
    fcf_margin_path=[0.64, 0.645, 0.65, 0.655, 0.66, 0.66, 0.66, 0.66, 0.66, 0.66],
    buyback_pct=0.70, terminal_g=0.025, wacc=WACC,
    label="S1: 基准(7%提价→CPI, 域名+1%)"
)
results.append(r)

# 情景2: 乐观(提价7%永续, 域名+2%/年)
r = toll_booth_dcf(
    com_growth_rates=[0.025, 0.02, 0.02, 0.02, 0.02, 0.015, 0.015, 0.015, 0.01, 0.01],
    price_increase_rates=[0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.05, 0.05, 0.05],
    opm_path=[0.68, 0.69, 0.70, 0.70, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71],
    fcf_margin_path=[0.65, 0.66, 0.67, 0.67, 0.68, 0.68, 0.68, 0.68, 0.68, 0.68],
    buyback_pct=0.70, terminal_g=0.03, wacc=WACC,
    label="S2: 乐观(7%提价持续, 域名+2%)"
)
results.append(r)

# 情景3: 悲观(2030后提价受限至CPI, 域名-1%/年)
r = toll_booth_dcf(
    com_growth_rates=[0.01, 0.005, 0.0, -0.005, -0.01, -0.01, -0.01, -0.01, -0.01, -0.01],
    price_increase_rates=[0.07, 0.07, 0.07, 0.07, 0.03, 0.03, 0.03, 0.02, 0.02, 0.02],
    opm_path=[0.68, 0.685, 0.69, 0.69, 0.69, 0.69, 0.685, 0.68, 0.68, 0.68],
    fcf_margin_path=[0.64, 0.645, 0.65, 0.65, 0.65, 0.64, 0.635, 0.63, 0.63, 0.63],
    buyback_pct=0.70, terminal_g=0.02, wacc=WACC,
    label="S3: 悲观(CPI限价+域名萎缩)"
)
results.append(r)

# 情景4: 极端悲观(提价被冻结, 域名-2%/年)
r = toll_booth_dcf(
    com_growth_rates=[0.01, 0.0, -0.01, -0.015, -0.02, -0.02, -0.02, -0.02, -0.02, -0.02],
    price_increase_rates=[0.07, 0.07, 0.07, 0.07, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    opm_path=[0.68, 0.685, 0.69, 0.69, 0.68, 0.67, 0.66, 0.65, 0.65, 0.65],
    fcf_margin_path=[0.64, 0.645, 0.65, 0.65, 0.63, 0.62, 0.61, 0.60, 0.60, 0.60],
    buyback_pct=0.70, terminal_g=0.01, wacc=WACC,
    label="S4: 极端悲观(冻价+域名萎缩)"
)
results.append(r)

# 情景5: 巴菲特情景(提价合理, 持续回购, 分红增加)
r = toll_booth_dcf(
    com_growth_rates=[0.02, 0.015, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
    price_increase_rates=[0.07, 0.07, 0.07, 0.07, 0.05, 0.05, 0.04, 0.04, 0.04, 0.04],
    opm_path=[0.68, 0.69, 0.695, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70],
    fcf_margin_path=[0.65, 0.655, 0.66, 0.665, 0.665, 0.665, 0.665, 0.665, 0.665, 0.665],
    buyback_pct=0.60, terminal_g=0.03, wacc=WACC,  # 60%回购+40%分红
    label="S5: 巴菲特情景(温和提价+增加分红)"
)
results.append(r)

# ==================== 概率加权 ====================
print("\n### 概率加权估值")
probabilities = [0.35, 0.15, 0.25, 0.05, 0.20]  # S1-S5概率
prob_labels = ["S1基准35%", "S2乐观15%", "S3悲观25%", "S4极悲5%", "S5巴菲特20%"]

weighted_price = sum(r["fair_price"] * p for r, p in zip(results, probabilities))
weighted_upside = (weighted_price / CURRENT_PRICE - 1) * 100

print(f"\n  概率加权公允价: ${weighted_price:.0f}")
print(f"  当前价格:       ${CURRENT_PRICE:.2f}")
print(f"  隐含上行空间:   {weighted_upside:+.1f}%")

print("\n  情景分布:")
for r, p, l in zip(results, probabilities, prob_labels):
    print(f"    {l}: ${r['fair_price']:.0f} ({r['upside']:+.1f}%)")

# ==================== 模型3: 回购效率η函数 ====================
print("\n### 模型3: 回购效率η函数")

# η = (EPS增速_from_buyback) / (回购金额/市值)
# 7年数据
buyback_data = [
    {"year": 2019, "buyback": 783e6, "shares_start": 122.7e6, "shares_end": 119.0e6, "eps_start": 4.75, "eps_end": 5.15, "avg_price_est": 195},
    {"year": 2020, "buyback": 777e6, "shares_start": 119.0e6, "shares_end": 115.3e6, "eps_start": 5.15, "eps_end": 7.07, "avg_price_est": 200},
    {"year": 2021, "buyback": 723e6, "shares_start": 115.3e6, "shares_end": 112.2e6, "eps_start": 7.07, "eps_end": 7.00, "avg_price_est": 225},
    {"year": 2022, "buyback": 1048e6, "shares_start": 112.2e6, "shares_end": 108.0e6, "eps_start": 7.00, "eps_end": 6.24, "avg_price_est": 185},
    {"year": 2023, "buyback": 901e6, "shares_start": 108.0e6, "shares_end": 103.5e6, "eps_start": 6.24, "eps_end": 7.90, "avg_price_est": 195},
    {"year": 2024, "buyback": 1226e6, "shares_start": 103.5e6, "shares_end": 98.2e6, "eps_start": 7.90, "eps_end": 8.00, "avg_price_est": 195},
    {"year": 2025, "buyback": 893e6, "shares_start": 98.2e6, "shares_end": 92.6e6, "eps_start": 8.00, "eps_end": 8.81, "avg_price_est": 255},
]

print("  年份 | 回购($M) | 回购PE | 股数变化 | EPS变化 | η_shares")
print("  " + "-" * 65)
total_buyback = 0
total_shares_reduced = 0
for d in buyback_data:
    shares_reduced = d["shares_start"] - d["shares_end"]
    share_reduction_pct = shares_reduced / d["shares_start"]
    buyback_yield = d["buyback"] / (d["avg_price_est"] * d["shares_start"])  # 回购收益率
    # η_shares = 实际股数减少% / 理论股数减少%(buyback/市值)
    theoretical_reduction = d["buyback"] / (d["avg_price_est"] * d["shares_start"])
    eta = share_reduction_pct / theoretical_reduction if theoretical_reduction > 0 else 0
    pe_est = d["avg_price_est"] / (d["eps_start"])
    total_buyback += d["buyback"]
    total_shares_reduced += shares_reduced
    print(f"  {d['year']} | ${d['buyback']/1e6:,.0f}M  | {pe_est:.1f}x | -{shares_reduced/1e6:.1f}M ({share_reduction_pct:.1%}) | ${d['eps_start']:.2f}→${d['eps_end']:.2f} | η={eta:.2f}")

# 7年汇总
total_reduction_pct = total_shares_reduced / 122.7e6
avg_annual_reduction = 1 - (92.6e6 / 122.7e6) ** (1/7)
print(f"\n  7年汇总: 回购${total_buyback/1e9:.2f}B, 股数-{total_shares_reduced/1e6:.1f}M ({total_reduction_pct:.1%})")
print(f"  年化股数缩减: {avg_annual_reduction:.2%}")
print(f"  EPS增速(7Y CAGR): {(8.81/4.75)**(1/7)-1:.2%}")
print(f"  收入增速(7Y CAGR): {(1656.6/1215)**(1/7)-1:.2%}")
print(f"  回购贡献EPS增速: ~{avg_annual_reduction:.2%} (vs 总EPS CAGR {(8.81/4.75)**(1/7)-1:.2%})")

# ==================== 模型4: 敏感性分析 ====================
print("\n### 模型4: 敏感性分析 (WACC × 永续增长率)")
print("  Fair Price矩阵:")
print("  " + " " * 12 + "".join(f"g={g:.1%}  " for g in [0.02, 0.025, 0.03, 0.035, 0.04]))
for wacc_test in [0.075, 0.08, 0.085, 0.09, 0.095]:
    row = f"  WACC={wacc_test:.1%}  "
    for g_test in [0.02, 0.025, 0.03, 0.035, 0.04]:
        if wacc_test <= g_test:
            row += "  N/A    "
        else:
            # 简化: 用FY2025 FCF直接做单阶段
            ev_test = FCF_2025 * 1.05 / (wacc_test - g_test)
            price_test = (ev_test - NET_DEBT) / SHARES_OUT
            row += f"  ${price_test:>5.0f}   "
    print(row)

# ==================== 模型5: 期望回报率 ====================
print("\n### 模型5: 从当前价格买入的期望回报")
# 收入增长~5% + OPM扩张~0.5% + 回购~4% = EPS增速~9-10%
# 加上FCF yield 4.8% (分红1.6% + 回购3.2%)
# 总回报 = EPS增长 + 分红收益率

eps_growth_est = 0.09  # 9% EPS CAGR
div_yield = 0.016  # 1.6%分红
pe_current = 27.1

# 假设PE不变
total_return_pe_flat = eps_growth_est + div_yield
# 假设PE压缩到24x (5年)
pe_compression = (24 / pe_current) ** (1/5) - 1
total_return_pe_compress = eps_growth_est + div_yield + pe_compression
# 假设PE扩张到30x (5年)
pe_expansion = (30 / pe_current) ** (1/5) - 1
total_return_pe_expand = eps_growth_est + div_yield + pe_expansion

print(f"  EPS增速估计: {eps_growth_est:.1%}/年")
print(f"  分红收益率:  {div_yield:.1%}/年")
print(f"  PE不变(27x): 总回报 {total_return_pe_flat:.1%}/年 (5年复合 {(1+total_return_pe_flat)**5-1:.1%})")
print(f"  PE→24x:      总回报 {total_return_pe_compress:.1%}/年 (5年复合 {(1+total_return_pe_compress)**5-1:.1%})")
print(f"  PE→30x:      总回报 {total_return_pe_expand:.1%}/年 (5年复合 {(1+total_return_pe_expand)**5-1:.1%})")

# 概率加权5年回报
prob_pe = [(0.30, 24), (0.40, 27), (0.20, 30), (0.10, 22)]
eps_5y = 8.81 * (1 + eps_growth_est) ** 5
cum_div = sum(8.81 * (1 + eps_growth_est) ** i * 0.25 for i in range(5))  # 25%派息率
weighted_5y_price = sum(p * (eps_5y * pe) for p, pe in prob_pe)
total_5y_return = (weighted_5y_price + cum_div) / CURRENT_PRICE - 1
annualized = (1 + total_5y_return) ** (1/5) - 1

print(f"\n  概率加权5年目标价: ${weighted_5y_price:.0f}")
print(f"  5年累计分红(估):  ${cum_div:.0f}")
print(f"  5年总回报:        {total_5y_return:.1%}")
print(f"  年化回报:         {annualized:.1%}")

# ==================== 汇总 ====================
print("\n" + "=" * 70)
print("估值汇总")
print("=" * 70)
print(f"  当前价格:          ${CURRENT_PRICE:.2f}")
print(f"  Reverse DCF隐含g:  {g_implied_single:.2%}(单阶段) / {g2_implied:.2%}(两阶段)")
print(f"  概率加权公允价:    ${weighted_price:.0f}")
print(f"  隐含上行空间:      {weighted_upside:+.1f}%")
print(f"  概率加权5年年化:   {annualized:.1%}")
print(f"\n  情景分布:")
for r, p in zip(results, probabilities):
    marker = "◄" if abs(r["fair_price"] - CURRENT_PRICE) < 20 else ""
    print(f"    {r['label']}: ${r['fair_price']:.0f} ({r['upside']:+.1f}%) [概率{p:.0%}] {marker}")

print(f"\n  估值判断: ", end="")
if weighted_upside > 30:
    print("深度关注(显著低估)")
elif weighted_upside > 10:
    print("关注(偏积极)")
elif weighted_upside > -10:
    print("中性关注(接近合理)")
elif weighted_upside > -20:
    print("审慎关注(偏高估)")
else:
    print("回避(显著高估)")

# 保存结果
output = {
    "model": "VRSN Toll Booth DCF",
    "date": "2026-03-23",
    "current_price": CURRENT_PRICE,
    "reverse_dcf": {
        "single_stage_g": round(g_implied_single * 100, 2),
        "two_stage_g2": round(g2_implied * 100, 2),
    },
    "scenarios": [
        {"label": r["label"], "fair_price": round(r["fair_price"]),
         "upside_pct": round(r["upside"], 1), "probability": p}
        for r, p in zip(results, probabilities)
    ],
    "weighted_fair_price": round(weighted_price),
    "weighted_upside_pct": round(weighted_upside, 1),
    "five_year_annualized_return": round(annualized * 100, 1),
    "verdict": "中性关注" if -10 < weighted_upside < 10 else ("关注" if weighted_upside > 10 else "审慎关注"),
}

with open("reports/VRSN/data/valuation_output.json", "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\n  结果已保存到 reports/VRSN/data/valuation_output.json")
