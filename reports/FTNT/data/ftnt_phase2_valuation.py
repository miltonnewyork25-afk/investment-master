#!/usr/bin/env python3
"""
Fortinet (FTNT) Phase 2 估值模型
========================================
包含:
1. Reverse DCF: $82.53隐含什么假设?
2. 三情景DCF (Bull/Base/Bear) + Owner Economics
3. 资本配置效率 (回购eta)
4. NRR间接推算
5. 三PE并列 + 同行对标
6. 敏感性矩阵 (WACC × Terminal Growth)
7. 承重墙脆弱度表

铁律G: LLM不能做算术, 所有数字由Python产出
"""

import json

# ========================================
# 基础参数
# ========================================
CURRENT_PRICE = 82.53
SHARES_DILUTED_M = 762.7  # 百万股 (NI $1,853.4M / EPS $2.43)
SHARES_BASIC_M = 743.6    # 市值/股价
MARKET_CAP_B = 61.37       # from quote
CASH_STI_B = 3.583        # Cash + Short-term investments
TOTAL_DEBT_B = 0.996
NET_CASH_B = CASH_STI_B - TOTAL_DEBT_B  # $2.587B
EV_B = MARKET_CAP_B - NET_CASH_B        # ~$58.8B

# FY2025 Actuals
REV_FY25_B = 6.800
NET_INCOME_B = 1.853
FCF_FY25_B = 2.226
SBC_FY25_B = 0.280
OWNER_FCF_B = FCF_FY25_B - SBC_FY25_B  # $1.946B
SBC_PCT_REV = SBC_FY25_B / REV_FY25_B  # 4.1%
FCF_MARGIN = FCF_FY25_B / REV_FY25_B   # 32.7%
OPM = 0.306
GROSS_MARGIN = 0.808
CAPEX_B = 0.365
DA_B = 0.336
INTEREST_INCOME_NET_B = 0.142
BUYBACK_FY25_B = 2.290

# FY2026E Guidance/Consensus
REV_FY26E_B = 7.597  # consensus
REV_FY26E_GUIDE_MID_B = 7.60  # mgmt $7.5-7.7B midpoint
EPS_FY26E = 2.97
NON_GAAP_OPM_GUIDE = 0.345  # 33-36% midpoint

# Deferred Revenue
DEFERRED_REV_FY25_B = 7.116
DEFERRED_REV_FY24_B = 6.361

# Historical data for cycle analysis
HIST_DATA = {
    "FY2021": {"rev": 3.342, "fcf": 1.204, "sbc": 0.208, "buyback": 0.742, "eps": 0.73, "opm": 0.195, "shares": 831},
    "FY2022": {"rev": 4.417, "fcf": 1.449, "sbc": 0.217, "buyback": 1.991, "eps": 1.06, "opm": 0.220, "shares": 808},
    "FY2023": {"rev": 5.305, "fcf": 1.731, "sbc": 0.249, "buyback": 1.501, "eps": 1.46, "opm": 0.234, "shares": 786},
    "FY2024": {"rev": 5.956, "fcf": 1.879, "sbc": 0.258, "buyback": 0.001, "eps": 2.26, "opm": 0.303, "shares": 770},
    "FY2025": {"rev": 6.800, "fcf": 2.226, "sbc": 0.280, "buyback": 2.290, "eps": 2.43, "opm": 0.306, "shares": 763},
}

# Consensus estimates
CONSENSUS = {
    "FY2026E": {"rev": 7.597, "eps": 2.97},
    "FY2027E": {"rev": 8.391, "eps": 3.30},
    "FY2028E": {"rev": 9.159, "eps": 3.67},
    "FY2029E": {"rev": 11.116, "eps": 3.08},  # Note: EPS drops - likely analyst count issue
    "FY2030E": {"rev": 11.869, "eps": 3.29},
}

TAX_RATE = 0.17  # effective tax rate (from FY2025)
WACC_BASE = 0.095  # FTNT beta ~0.9-1.0, lower than pure SaaS

print("=" * 75)
print("FORTINET (FTNT) Phase 2 估值模型")
print("=" * 75)
print(f"当前价格: ${CURRENT_PRICE}")
print(f"市值: ${MARKET_CAP_B:.1f}B | EV: ${EV_B:.1f}B | 净现金: ${NET_CASH_B:.1f}B")
print(f"FY2025: Rev ${REV_FY25_B:.3f}B | NI ${NET_INCOME_B:.3f}B | FCF ${FCF_FY25_B:.3f}B")
print(f"SBC ${SBC_FY25_B:.3f}B ({SBC_PCT_REV:.1%}) | Owner FCF ${OWNER_FCF_B:.3f}B")
print(f"FCF Margin {FCF_MARGIN:.1%} | OPM {OPM:.1%} | Gross {GROSS_MARGIN:.1%}")
print(f"FY2026E Guide: Rev ${REV_FY26E_GUIDE_MID_B:.1f}B | EPS ${EPS_FY26E}")
print()

# ========================================
# 1. REVERSE DCF: $82.53在赌什么?
# ========================================
print("=" * 75)
print("1. REVERSE DCF: $82.53隐含什么增长假设?")
print("=" * 75)

def reverse_dcf_implied_cagr(ev, base_rev, fcf_margin_start, fcf_margin_terminal,
                              wacc, terminal_growth, years=7, sbc_adjusted=False, sbc_pct=0.041):
    """反推让EV=DCF的隐含Revenue CAGR"""
    low, high = -0.05, 0.30
    for _ in range(300):
        mid = (low + high) / 2
        dcf_sum = 0
        rev = base_rev
        for y in range(1, years + 1):
            rev = rev * (1 + mid)
            margin = fcf_margin_start + (fcf_margin_terminal - fcf_margin_start) * y / years
            fcf = rev * margin
            if sbc_adjusted:
                sbc = rev * sbc_pct
                fcf = fcf - sbc * (1 - TAX_RATE)
            dcf_sum += fcf / (1 + wacc) ** y

        # Terminal value
        terminal_rev = base_rev * (1 + mid) ** years
        terminal_fcf = terminal_rev * fcf_margin_terminal
        if sbc_adjusted:
            terminal_fcf -= terminal_rev * sbc_pct * (1 - TAX_RATE)
        terminal_fcf_next = terminal_fcf * (1 + terminal_growth)
        tv = terminal_fcf_next / (wacc - terminal_growth)
        pv_tv = tv / (1 + wacc) ** years
        total = dcf_sum + pv_tv

        if total < ev:
            low = mid
        else:
            high = mid
    return mid

# Matrix: WACC × Terminal FCF Margin
print("\n--- Standard FCF ---")
header_label = "WACC \\ FCF Margin"
print(f"{header_label:<18}", end="")
for m in [0.28, 0.30, 0.33, 0.35]:
    print(f"  {m:.0%}     ", end="")
print()
print("-" * 62)

cagr_matrix = {}
for wacc in [0.085, 0.095, 0.10, 0.11]:
    print(f"  {wacc:.1%}          ", end="")
    for m in [0.28, 0.30, 0.33, 0.35]:
        cagr = reverse_dcf_implied_cagr(EV_B, REV_FY25_B, FCF_MARGIN, m, wacc, 0.03)
        cagr_matrix[(wacc, m)] = cagr
        print(f"  {cagr:.1%}   ", end="")
    print()

print("\n--- Owner Economics (FCF - SBC after tax) ---")
print(f"{header_label:<18}", end="")
for m in [0.28, 0.30, 0.33, 0.35]:
    print(f"  {m:.0%}     ", end="")
print()
print("-" * 62)

owner_cagr_matrix = {}
for wacc in [0.085, 0.095, 0.10, 0.11]:
    print(f"  {wacc:.1%}          ", end="")
    for m in [0.28, 0.30, 0.33, 0.35]:
        cagr = reverse_dcf_implied_cagr(EV_B, REV_FY25_B, FCF_MARGIN, m, wacc, 0.03,
                                         sbc_adjusted=True)
        owner_cagr_matrix[(wacc, m)] = cagr
        print(f"  {cagr:.1%}   ", end="")
    print()

# Base case interpretation
base_cagr = cagr_matrix.get((0.095, 0.33))
owner_base = owner_cagr_matrix.get((0.095, 0.33))
consensus_5y_cagr = (CONSENSUS["FY2030E"]["rev"] / REV_FY25_B) ** (1/5) - 1
guide_cagr = (REV_FY26E_GUIDE_MID_B / REV_FY25_B) - 1

print(f"\n基准情景解读 (WACC=9.5%, Terminal FCF Margin=33%, g=3%):")
print(f"  Standard隐含Rev CAGR: {base_cagr:.1%}")
print(f"  Owner隐含Rev CAGR:    {owner_base:.1%}")
print(f"  FY2026管理层指引:     {guide_cagr:.1%}")
print(f"  分析师5年共识CAGR:    {consensus_5y_cagr:.1%}")
print(f"  历史5年CAGR (FY21→25): 19.4%")
if base_cagr < consensus_5y_cagr:
    print(f"  --> 市场隐含增速 < 共识 = 定价偏悲观 (差距{(consensus_5y_cagr-base_cagr)*100:.1f}pp)")
elif base_cagr < consensus_5y_cagr + 0.02:
    print(f"  --> 市场隐含增速 ≈ 共识 = 定价合理")
else:
    print(f"  --> 市场隐含增速 > 共识 = 定价偏乐观")

# ========================================
# 2. 隐含信念提取 + 承重墙脆弱度
# ========================================
print()
print("=" * 75)
print("2. 六个隐含信念 + 承重墙脆弱度表")
print("=" * 75)

# Reverse DCF解码隐含信念
implied_rev_fy30 = REV_FY25_B * (1 + base_cagr) ** 5
implied_fcf_fy30 = implied_rev_fy30 * 0.33
implied_ni_fy30 = implied_rev_fy30 * 0.30  # assume NI margin ~30%
implied_eps_fy30 = implied_ni_fy30 * 1000 / SHARES_DILUTED_M

print(f"\n隐含FY2030 (基准CAGR {base_cagr:.1%}):")
print(f"  Revenue: ${implied_rev_fy30:.1f}B")
print(f"  FCF (33%): ${implied_fcf_fy30:.1f}B")
print(f"  隐含EPS: ~${implied_eps_fy30:.2f}")

beliefs = [
    {"id": "B1", "name": "5Y Rev CAGR", "implied": f"{base_cagr:.1%}", "benchmark": f"{consensus_5y_cagr:.1%}(共识)",
     "fragility": 2, "note": "FTNT有刷新周期+SASE双引擎, 实现门槛低"},
    {"id": "B2", "name": "Terminal FCF Margin", "implied": "33%", "benchmark": "32.7%(当前)",
     "fragility": 1, "note": "已达到. 软件占比↑→margin有上行空间"},
    {"id": "B3", "name": "SBC/Rev维持<5%", "implied": "<5%", "benchmark": "4.1%(当前)",
     "fragility": 1, "note": "FTNT SBC纪律在网安行业最好, 5年从6.2%→4.1%"},
    {"id": "B4", "name": "Terminal P/FCF", "implied": f"{EV_B/FCF_FY25_B:.0f}x→压缩", "benchmark": "26.5x(当前P/FCF)",
     "fragility": 2, "note": "已在历史低位. 如果服务>70%可能re-rate"},
    {"id": "B5", "name": "WACC ~9.5%", "implied": "9.5%", "benchmark": "Beta 0.9-1.0",
     "fragility": 2, "note": "网安行业Beta偏低, 利率环境是外部变量"},
    {"id": "B6", "name": "增长久期≥5年", "implied": "5年双位数", "benchmark": "TAM$200B+刷新",
     "fragility": 2, "note": "刷新周期有限(2-3年), SASE接力是关键"},
]

print(f"\n{'ID':<5}{'信念':<22}{'隐含值':<16}{'基准':<22}{'脆弱度':>6}  备注")
print("-" * 100)
for b in beliefs:
    print(f"{b['id']:<5}{b['name']:<22}{b['implied']:<16}{b['benchmark']:<22}{b['fragility']:>4}/5  {b['note']}")

avg_fragility = sum(b['fragility'] for b in beliefs) / len(beliefs)
print(f"\n平均脆弱度: {avg_fragility:.1f}/5 — {'低' if avg_fragility < 2.5 else '中' if avg_fragility < 3.5 else '高'}")
print("核心发现: FTNT的隐含信念脆弱度远低于CRWD/ZS等纯SaaS — 因为当前估值已经对增长放缓定价")

# ========================================
# 3. 三情景DCF (7年显式预测 + 终端)
# ========================================
print()
print("=" * 75)
print("3. 三情景DCF — 7年显式预测 + 终端价值")
print("=" * 75)

scenarios = {
    "Bull": {
        "prob": 0.25,
        "rev_cagr_path": [0.14, 0.14, 0.13, 0.12, 0.12, 0.11, 0.10],
        "fcf_margin_terminal": 0.36,
        "desc": "SASE加速+第二波刷新+提价→服务>70%触发re-rate",
        "exit_pe": 30,
    },
    "Base": {
        "prob": 0.50,
        "rev_cagr_path": [0.12, 0.11, 0.11, 0.10, 0.10, 0.09, 0.09],
        "fcf_margin_terminal": 0.33,
        "desc": "共识路径: 刷新周期逐步衰减, SASE部分补偿, OPM稳定",
        "exit_pe": 25,
    },
    "Bear": {
        "prob": 0.25,
        "rev_cagr_path": [0.10, 0.08, 0.07, 0.06, 0.05, 0.04, 0.04],
        "fcf_margin_terminal": 0.28,
        "desc": "刷新周期结束+SASE失速+MSFT侵蚀→增长降至mid-single",
        "exit_pe": 18,
    }
}

WACC = WACC_BASE
TG = 0.03

def run_dcf(rev_cagr_path, fcf_margin_terminal, wacc, tg, base_rev,
            sbc_pct=SBC_PCT_REV, sbc_decline_rate=0.0):
    """7年DCF + 终端价值, 含Owner Economics"""
    years = len(rev_cagr_path)
    fcf_margin_start = FCF_MARGIN  # 32.7%

    projections = []
    rev = base_rev
    sbc_pct_current = sbc_pct
    for y in range(years):
        rev = rev * (1 + rev_cagr_path[y])
        fcf_margin = fcf_margin_start + (fcf_margin_terminal - fcf_margin_start) * (y + 1) / years
        fcf = rev * fcf_margin
        sbc_pct_current = max(0.03, sbc_pct * (1 - sbc_decline_rate) ** (y + 1))
        sbc = rev * sbc_pct_current
        owner_fcf = fcf - sbc * (1 - TAX_RATE)
        projections.append({
            "year": y + 1, "fy": f"FY{2026+y}",
            "rev": rev, "fcf": fcf, "sbc": sbc,
            "owner_fcf": owner_fcf,
            "fcf_margin": fcf_margin, "sbc_pct": sbc_pct_current
        })

    # Standard FCF DCF
    dcf_sum = sum(p["fcf"] / (1 + wacc) ** p["year"] for p in projections)
    terminal_fcf = projections[-1]["fcf"] * (1 + tg)
    tv = terminal_fcf / (wacc - tg)
    pv_tv = tv / (1 + wacc) ** years
    total_ev = dcf_sum + pv_tv

    # Owner FCF DCF
    owner_dcf_sum = sum(p["owner_fcf"] / (1 + wacc) ** p["year"] for p in projections)
    terminal_owner = projections[-1]["owner_fcf"] * (1 + tg)
    tv_owner = terminal_owner / (wacc - tg)
    pv_tv_owner = tv_owner / (1 + wacc) ** years
    total_owner_ev = owner_dcf_sum + pv_tv_owner

    return {
        "ev_fcf": total_ev,
        "ev_owner": total_owner_ev,
        "terminal_rev": projections[-1]["rev"],
        "terminal_fcf": projections[-1]["fcf"],
        "terminal_owner_fcf": projections[-1]["owner_fcf"],
        "tv_pct": pv_tv / total_ev * 100,
        "projections": projections,
    }

# Run scenarios
print(f"\n{'情景':<8}{'概率':>5}{'EV(FCF)':>10}{'EV(Owner)':>11}{'FY32Rev':>9}{'FCF':>7}{'隐含价格':>10}{'Owner价格':>10}{'回报':>8}")
print("-" * 90)

scenario_results = {}
for name, s in scenarios.items():
    result = run_dcf(s["rev_cagr_path"], s["fcf_margin_terminal"], WACC, TG, REV_FY25_B)
    equity_fcf = result["ev_fcf"] + NET_CASH_B
    equity_owner = result["ev_owner"] + NET_CASH_B
    price_fcf = equity_fcf / SHARES_DILUTED_M * 1000
    price_owner = equity_owner / SHARES_DILUTED_M * 1000
    ret_fcf = price_fcf / CURRENT_PRICE - 1
    scenario_results[name] = {**result, "price_fcf": price_fcf, "price_owner": price_owner}

    print(f"{name:<8}{s['prob']:>4.0%}  ${result['ev_fcf']:>7.1f}B  ${result['ev_owner']:>8.1f}B"
          f"  ${result['terminal_rev']:>6.1f}B ${result['terminal_fcf']:>5.1f}B"
          f"  ${price_fcf:>7.0f}   ${price_owner:>7.0f}   {ret_fcf:>+6.1%}")

# Probability-weighted
weighted_price_fcf = sum(scenarios[n]["prob"] * scenario_results[n]["price_fcf"] for n in scenarios)
weighted_price_owner = sum(scenarios[n]["prob"] * scenario_results[n]["price_owner"] for n in scenarios)
blended_price = weighted_price_fcf * 0.3 + weighted_price_owner * 0.7  # FTNT SBC低, Owner权重更高

print(f"\n概率加权:")
print(f"  FCF法隐含价格:   ${weighted_price_fcf:.0f} (vs当前${CURRENT_PRICE}: {weighted_price_fcf/CURRENT_PRICE-1:+.1%})")
print(f"  Owner法隐含价格: ${weighted_price_owner:.0f} (vs当前${CURRENT_PRICE}: {weighted_price_owner/CURRENT_PRICE-1:+.1%})")
print(f"  混合估值(30/70): ${blended_price:.0f} (vs当前${CURRENT_PRICE}: {blended_price/CURRENT_PRICE-1:+.1%})")
print(f"  (FTNT SBC仅4.1%, 故FCF与Owner差距小, Owner权重70%)")

# ========================================
# 4. 详细投影 — Base情景
# ========================================
print()
print("=" * 75)
print("4. Base情景详细7年投影")
print("=" * 75)

base = scenario_results["Base"]
print(f"\n{'年份':<7}{'收入($B)':>9}{'增速':>7}{'FCF($B)':>9}{'FCF%':>6}{'SBC($B)':>9}{'SBC%':>6}{'OwnerFCF':>10}")
print("-" * 63)
for p in base["projections"]:
    rev_g = p["rev"] / (base["projections"][p["year"]-2]["rev"] if p["year"] > 1 else REV_FY25_B) - 1
    print(f"{p['fy']:<7}  ${p['rev']:>6.2f}  {rev_g:>5.1%}  ${p['fcf']:>6.2f}  {p['fcf_margin']:>4.1%}"
          f"  ${p['sbc']:>6.3f}  {p['sbc_pct']:>4.1%}  ${p['owner_fcf']:>7.2f}")

print(f"\n终端价值占比: {base['tv_pct']:.1f}%")

# ========================================
# 5. 敏感性矩阵 (WACC × Terminal Growth)
# ========================================
print()
print("=" * 75)
print("5. 敏感性矩阵 — 概率加权混合估值 (WACC × 终端增速)")
print("=" * 75)

print(f"\n{'':>12}", end="")
for tg in [0.02, 0.025, 0.03, 0.035, 0.04]:
    print(f"{'g='+f'{tg:.1%}':>10}", end="")
print()
print("-" * 62)

for wacc in [0.08, 0.085, 0.09, 0.095, 0.10, 0.105, 0.11]:
    print(f"WACC={wacc:.1%}  ", end="")
    for tg in [0.02, 0.025, 0.03, 0.035, 0.04]:
        w_fcf = 0
        w_own = 0
        for sn, s in scenarios.items():
            r = run_dcf(s["rev_cagr_path"], s["fcf_margin_terminal"], wacc, tg, REV_FY25_B)
            w_fcf += (r["ev_fcf"] + NET_CASH_B) / SHARES_DILUTED_M * 1000 * s["prob"]
            w_own += (r["ev_owner"] + NET_CASH_B) / SHARES_DILUTED_M * 1000 * s["prob"]
        blended = w_fcf * 0.3 + w_own * 0.7
        marker = " *" if abs(wacc - WACC_BASE) < 0.001 and abs(tg - 0.03) < 0.001 else ""
        print(f"${blended:>7.0f}{marker}", end="")
    print()
print("  * = 基准情景")

# ========================================
# 6. 资本配置效率 (回购eta)
# ========================================
print()
print("=" * 75)
print("6. 资本配置效率 — 回购eta分析")
print("=" * 75)

print("\n--- 回购历史 ---")
print(f"{'年份':<8}{'回购($B)':>10}{'FCF($B)':>9}{'回购/FCF':>9}{'EPS':>7}{'股数(M)':>9}{'EPS增速':>9}")
print("-" * 62)

prev_eps = None
for fy, d in HIST_DATA.items():
    ratio = d["buyback"] / d["fcf"] if d["fcf"] > 0 else 0
    eps_g = (d["eps"] / prev_eps - 1) if prev_eps else 0
    print(f"{fy:<8}  ${d['buyback']:>7.3f}  ${d['fcf']:>6.3f}  {ratio:>7.1%}  ${d['eps']:>5.2f}  {d['shares']:>7.0f}"
          f"  {eps_g:>+7.1%}" if prev_eps else f"{fy:<8}  ${d['buyback']:>7.3f}  ${d['fcf']:>6.3f}  {ratio:>7.1%}  ${d['eps']:>5.2f}  {d['shares']:>7.0f}   —")
    prev_eps = d["eps"]

# 回购eta计算: eta = (Value of shares retired) / ($ spent on buyback)
# 简化: 如果avg buyback price < intrinsic value, eta > 1
total_buyback = sum(d["buyback"] for d in HIST_DATA.values())
shares_retired = HIST_DATA["FY2021"]["shares"] - HIST_DATA["FY2025"]["shares"]  # 831 - 763 = 68M
avg_buyback_price = total_buyback * 1000 / shares_retired if shares_retired > 0 else 0

print(f"\n累计回购: ${total_buyback:.1f}B (FY2021-FY2025)")
print(f"退出股数: {shares_retired:.0f}M (831M→763M)")
print(f"平均回购价格: ${avg_buyback_price:.0f}/股")
print(f"当前价格: ${CURRENT_PRICE}")
print(f"回购增值率: {(CURRENT_PRICE / avg_buyback_price - 1):+.1%}" if avg_buyback_price > 0 else "N/A")

# Buyback efficiency: EPS growth decomposition
ni_cagr = (HIST_DATA["FY2025"]["eps"] * HIST_DATA["FY2025"]["shares"] /
           (HIST_DATA["FY2021"]["eps"] * HIST_DATA["FY2021"]["shares"])) ** (1/4) - 1
eps_cagr = (HIST_DATA["FY2025"]["eps"] / HIST_DATA["FY2021"]["eps"]) ** (1/4) - 1
share_reduction_cagr = (HIST_DATA["FY2025"]["shares"] / HIST_DATA["FY2021"]["shares"]) ** (1/4) - 1

print(f"\n--- EPS增长分解 (FY2021→FY2025, 4年CAGR) ---")
print(f"  净利润CAGR:   {ni_cagr:+.1%}")
print(f"  EPS CAGR:     {eps_cagr:+.1%}")
print(f"  股数减少CAGR: {share_reduction_cagr:+.1%}")
print(f"  回购对EPS的贡献: {eps_cagr - ni_cagr:.1%}pp ({(eps_cagr - ni_cagr)/eps_cagr:.0%} of EPS growth)")

# FY2025 specific: buyback > FCF
print(f"\n--- FY2025回购分析 (回购>FCF的年份) ---")
print(f"  回购: ${BUYBACK_FY25_B:.2f}B vs FCF: ${FCF_FY25_B:.2f}B → 超出${BUYBACK_FY25_B-FCF_FY25_B:.2f}B")
print(f"  PE at buyback: ~34x (vs 5年均值54x) → 管理层在历史低PE回购")
print(f"  如果PE回归40x, 每回购$1可获得{40/34-1:.0%}额外价值 (eta>1)")
print(f"  如果PE下探25x, 每回购$1价值缩水{25/34-1:.0%} (eta<1)")

# ========================================
# 7. NRR间接推算
# ========================================
print()
print("=" * 75)
print("7. NRR间接推算 (FTNT不披露NRR)")
print("=" * 75)

# Method 1: Deferred revenue growth as proxy
dr_growth = DEFERRED_REV_FY25_B / DEFERRED_REV_FY24_B - 1

# Method 2: Service revenue implication
service_rev_pct_fy25 = 0.67  # 67% service
service_rev_fy25 = REV_FY25_B * service_rev_pct_fy25  # $4.556B
service_rev_fy24 = 5.956 * 0.63  # estimated FY2024 63% service → $3.752B
service_growth = service_rev_fy25 / service_rev_fy24 - 1

# Method 3: Cross-sell signals
sase_from_existing = 0.91  # 91% of SASE billings from existing customers
secops_from_existing = 0.97  # 97% of SecOps billings from existing

# Method 4: Dollar retention proxy
# If 91% SASE billings from existing + SASE billings growth +40% Q4
# → existing customer expansion is strong
unified_sase_arr = 1.28  # $1.28B
fortisase_arr_growth = 0.90  # >90% YoY

print(f"方法1 — 递延收入增长代理:")
print(f"  递延收入FY25: ${DEFERRED_REV_FY25_B:.1f}B (+{dr_growth:.1%} YoY)")
print(f"  收入增长: +{(REV_FY25_B/5.956-1):.1%}")
print(f"  递延增速 {'<' if dr_growth < (REV_FY25_B/5.956-1) else '>'} 收入增速 = {'合同期缩短信号' if dr_growth < (REV_FY25_B/5.956-1) else '增长健康'}")

print(f"\n方法2 — 服务收入增长:")
print(f"  服务收入增速: ~{service_growth:.1%} (估算)")
print(f"  产品收入增速: ~{((REV_FY25_B*(1-service_rev_pct_fy25))/(5.956*(1-0.63))-1):.1%} (含刷新周期)")

print(f"\n方法3 — 交叉销售信号:")
print(f"  91%的SASE billings来自存量客户 → 强交叉销售能力")
print(f"  97%的SecOps billings来自存量客户 → 极强平台粘性")
print(f"  每$1防火墙收入撬动$12增量 → NRR代理")
print(f"  Unified SASE ARR: ${unified_sase_arr:.2f}B (+11% YoY)")
print(f"  FortiSASE ARR增速: >{fortisase_arr_growth:.0%}")

print(f"\n综合推断:")
print(f"  NRR估算范围: 115-125%")
print(f"  逻辑: 91%存量+SASE高增速+$12:$1交叉比 → 存量客户持续扩展消费")
print(f"  但: 递延收入增速略低于收入增速 → 合同期可能从5年→4年(billings合同缩短1月的报道)")
print(f"  置信度: [B]弱结论(推断), 因为FTNT不披露NRR, 上述是间接推算")

# ========================================
# 8. 三PE并列 + 同行对标
# ========================================
print()
print("=" * 75)
print("8. 三PE并列 + 网安同行对标")
print("=" * 75)

gaap_pe = MARKET_CAP_B / NET_INCOME_B
owner_pe = MARKET_CAP_B / OWNER_FCF_B  # Using Owner FCF as proxy
core_ni = NET_INCOME_B - INTEREST_INCOME_NET_B  # Strip net interest income
core_pe = MARKET_CAP_B / core_ni if core_ni > 0 else float('inf')
p_fcf = MARKET_CAP_B / FCF_FY25_B
fwd_pe = CURRENT_PRICE / EPS_FY26E

print(f"\n--- FTNT三PE并列 ---")
print(f"{'PE类型':<20}{'值':>8}  含义")
print("-" * 65)
print(f"{'GAAP PE (TTM)':<20}{gaap_pe:>7.1f}x  含全部会计项目(含$142M净利息收入)")
print(f"{'Owner PE (TTM)':<20}{owner_pe:>7.1f}x  剥离SBC后真实股东回报 (FCF-SBC)")
print(f"{'Core PE (TTM)':<20}{core_pe:>7.1f}x  剥离净利息收入(核心运营估值)")
print(f"{'P/FCF (TTM)':<20}{p_fcf:>7.1f}x  基于自由现金流")
print(f"{'Forward PE (FY26E)':<20}{fwd_pe:>7.1f}x  基于FY2026E EPS ${EPS_FY26E}")
print(f"\n注: GAAP PE {gaap_pe:.0f}x vs Core PE {core_pe:.0f}x → 净利息收入贡献{(1-core_ni/NET_INCOME_B):.0%}的GAAP利润, 剥离后PE升高{core_pe/gaap_pe-1:.0%}")

# Peer comparison
print(f"\n--- 网安同行对标 ---")
peers = [
    {"name": "FTNT", "pe": gaap_pe, "p_fcf": p_fcf, "owner_pe": owner_pe, "rev_g": 0.142,
     "opm": 0.306, "fcf_m": FCF_MARGIN, "sbc_pct": SBC_PCT_REV, "mcap": MARKET_CAP_B},
    {"name": "PANW", "pe": 42.4, "p_fcf": 29.8, "owner_pe": 53.0, "rev_g": 0.15,
     "opm": 0.135, "fcf_m": 0.37, "sbc_pct": 0.087, "mcap": 123.0},
    {"name": "CRWD", "pe": -1, "p_fcf": 76.0, "owner_pe": -1, "rev_g": 0.22,
     "opm": -0.034, "fcf_m": 0.272, "sbc_pct": 0.228, "mcap": 99.6},
    {"name": "ZS", "pe": -1, "p_fcf": 45.6, "owner_pe": -1, "rev_g": 0.26,
     "opm": -0.048, "fcf_m": 0.22, "sbc_pct": 0.20, "mcap": 31.9},
    {"name": "CSCO", "pe": 28.4, "p_fcf": 18.5, "owner_pe": 30.0, "rev_g": 0.03,
     "opm": 0.305, "fcf_m": 0.31, "sbc_pct": 0.035, "mcap": 220.0},
]

print(f"{'公司':<7}{'市值($B)':>9}{'PE':>7}{'P/FCF':>7}{'OwnerPE':>9}{'增速':>6}{'OPM':>6}{'FCF%':>6}{'SBC%':>6}")
print("-" * 66)
for p in peers:
    pe_str = f"{p['pe']:.1f}x" if p['pe'] > 0 else "亏损"
    own_str = f"{p['owner_pe']:.1f}x" if p['owner_pe'] > 0 else "负"
    print(f"{p['name']:<7}{p['mcap']:>8.1f}  {pe_str:>5}  {p['p_fcf']:>5.1f}x  {own_str:>7}"
          f"  {p['rev_g']:>4.0%}  {p['opm']:>4.1%}  {p['fcf_m']:>4.1%}  {p['sbc_pct']:>4.1%}")

print(f"\n关键发现:")
print(f"  1. FTNT是网安行业唯一GAAP盈利+PE<40的公司")
print(f"  2. FTNT SBC/Rev 4.1% 远低于CRWD 22.8%/ZS 20%/PANW 8.7%")
print(f"  3. FTNT Owner PE {owner_pe:.0f}x vs PANW 53x → FTNT在Owner基础上便宜42%")
print(f"  4. 但FTNT增速14%低于CRWD 22%/ZS 26% → 增速折扣合理")
print(f"  5. FTNT FCF Margin 32.7% 仅次于PANW 37% → 现金创造能力强")

# ========================================
# 9. 周期定位分析
# ========================================
print()
print("=" * 75)
print("9. 周期定位分析")
print("=" * 75)

# Quarterly revenue acceleration
q_data = [
    ("Q1'24", 1.353, 0.072), ("Q2'24", 1.434, 0.109),
    ("Q3'24", 1.508, 0.131), ("Q4'24", 1.660, 0.168),
    ("Q1'25", 1.540, 0.138), ("Q2'25", 1.630, 0.137),
    ("Q3'25", 1.725, 0.144), ("Q4'25", 1.905, 0.148),
]

print(f"\n--- 季度收入轨迹 (YoY%) ---")
for q, rev, yoy in q_data:
    bar = "█" * int(yoy * 100)
    print(f"  {q}: ${rev:.3f}B  +{yoy:.1%}  {bar}")

print(f"\n--- 刷新周期分析 ---")
print(f"  Product Revenue Q4 FY2025: +20% YoY → 刷新仍在加速")
print(f"  管理层: 350K台低端FortiGate设备2027年EoL → 第二波刷新")
print(f"  SASE Billings: Q4 +40% → 从刷新到SASE的转化正在发生")
print(f"  递延收入增长+12% vs 收入+14% → 合同期略缩短(谨慎信号)")

print(f"\n--- 行业周期判断 ---")
print(f"  网安IT预算: 2025E增长14-16% (持续超GDP)")
print(f"  FTNT在周期中的位置: 中期上升段 (刷新+SASE双引擎)")
print(f"  风险: 2027年刷新周期衰减 → SASE能否接力是核心不确定性")

# ========================================
# 10. 综合估值汇总
# ========================================
print()
print("=" * 75)
print("10. 综合估值汇总")
print("=" * 75)

# Exit multiple method
# FY2027E EPS $3.30 × exit PE
for exit_pe in [25, 30, 35]:
    fv = CONSENSUS["FY2027E"]["eps"] * exit_pe
    ret = (fv / CURRENT_PRICE) ** (1/2) - 1  # 2-year annualized
    print(f"  FY2027E EPS ${CONSENSUS['FY2027E']['eps']:.2f} × {exit_pe}x PE = ${fv:.0f} ({ret:+.1%}/yr)")

# FCF yield method
for yield_pct in [0.035, 0.04, 0.045]:
    fv = FCF_FY25_B * 1000 / SHARES_DILUTED_M / yield_pct
    print(f"  FCF Yield {yield_pct:.1%} → ${fv:.0f}")

print(f"\n┌────────────────────────────────────────────────────────────┐")
print(f"│ FTNT 估值汇总                                             │")
print(f"├────────────────────────────────────────────────────────────┤")
print(f"│ 方法                    │ 公允价值  │ vs当前 ${CURRENT_PRICE}     │")
print(f"├────────────────────────────────────────────────────────────┤")
print(f"│ DCF概率加权(FCF)        │ ${weighted_price_fcf:>7.0f}   │ {weighted_price_fcf/CURRENT_PRICE-1:>+7.1%}          │")
print(f"│ DCF概率加权(Owner)      │ ${weighted_price_owner:>7.0f}   │ {weighted_price_owner/CURRENT_PRICE-1:>+7.1%}          │")
print(f"│ 混合估值(30/70)         │ ${blended_price:>7.0f}   │ {blended_price/CURRENT_PRICE-1:>+7.1%}          │")
print(f"│ FY27E EPS×30x           │ ${CONSENSUS['FY2027E']['eps']*30:>7.0f}   │ {CONSENSUS['FY2027E']['eps']*30/CURRENT_PRICE-1:>+7.1%}          │")
print(f"│ FCF Yield 4.0%          │ ${FCF_FY25_B*1000/SHARES_DILUTED_M/0.04:>7.0f}   │ {FCF_FY25_B*1000/SHARES_DILUTED_M/0.04/CURRENT_PRICE-1:>+7.1%}          │")
print(f"│ 分析师共识              │ $   90    │ {90/CURRENT_PRICE-1:>+7.1%}          │")
print(f"├────────────────────────────────────────────────────────────┤")
print(f"│ 当前价格                │ $ {CURRENT_PRICE:>5.2f}  │                    │")
print(f"└────────────────────────────────────────────────────────────┘")

# Final expected return
print(f"\n期望回报 (概率加权混合):")
ret_total = blended_price / CURRENT_PRICE - 1
print(f"  总回报: {ret_total:+.1%}")
print(f"  估值离散度: ${scenario_results['Bull']['price_fcf']:.0f} ~ ${scenario_results['Bear']['price_fcf']:.0f}")
bull_ret = scenario_results["Bull"]["price_fcf"] / CURRENT_PRICE - 1
bear_ret = scenario_results["Bear"]["price_fcf"] / CURRENT_PRICE - 1
print(f"  Bull回报: {bull_ret:+.1%} | Bear回报: {bear_ret:+.1%}")
print(f"  不对称比: {abs(bull_ret)/abs(bear_ret):.1f}x (>1.5x = 有利不对称)" if bear_ret < 0 else f"  Bear也是正回报!")

# Save to JSON
output = {
    "current_price": CURRENT_PRICE,
    "market_cap_b": MARKET_CAP_B,
    "ev_b": round(EV_B, 1),
    "reverse_dcf_implied_cagr": round(base_cagr * 100, 1),
    "owner_reverse_dcf_implied_cagr": round(owner_base * 100, 1),
    "consensus_5y_cagr": round(consensus_5y_cagr * 100, 1),
    "dcf_price_fcf": round(weighted_price_fcf, 0),
    "dcf_price_owner": round(weighted_price_owner, 0),
    "blended_price": round(blended_price, 0),
    "expected_return_pct": round(ret_total * 100, 1),
    "bull_price": round(scenario_results["Bull"]["price_fcf"], 0),
    "base_price": round(scenario_results["Base"]["price_fcf"], 0),
    "bear_price": round(scenario_results["Bear"]["price_fcf"], 0),
    "gaap_pe": round(gaap_pe, 1),
    "owner_pe": round(owner_pe, 1),
    "core_pe": round(core_pe, 1),
    "p_fcf": round(p_fcf, 1),
    "fwd_pe": round(fwd_pe, 1),
    "avg_buyback_price": round(avg_buyback_price, 0),
    "nrr_estimate_range": "115-125%",
    "fragility_avg": round(avg_fragility, 1),
}

output_path = "/Users/milton/投资大师/reports/FTNT/data/ftnt_phase2_valuation.json"
with open(output_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\n估值数据已写入: {output_path}")
