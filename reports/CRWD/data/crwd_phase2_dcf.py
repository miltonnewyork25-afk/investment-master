#!/usr/bin/env python3
"""
CrowdStrike (CRWD) Phase 2 估值模型
========================================
包含:
1. Reverse DCF: 从$99.6B EV反推隐含FCF CAGR
2. 三情景×三SBC路径 = 9种子情景10年投影
3. 概率加权EV + 期望回报
4. 敏感性矩阵 (WACC ± 100bps × 终端增速 ± 1%)
5. SOTP分部估值
6. P/(FCF-SBC)对标

铁律G: LLM不能做算术, 所有数字由Python产出
"""

import json

# ========================================
# 基础参数
# ========================================
CURRENT_PRICE = 392.62
SHARES_OUT_M = 253.6  # 百万股 (稀释后)
MARKET_CAP_B = CURRENT_PRICE * SHARES_OUT_M / 1000  # ~$99.6B
NET_CASH_B = 4.41  # $4.41B净现金
EV_B = MARKET_CAP_B - NET_CASH_B  # ~$95.2B

# FY2026基准 (截至2026-01-31)
REV_FY26_B = 4.812
FCF_FY26_B = 1.310
SBC_FY26_B = 1.097
OWNER_FCF_FY26_B = FCF_FY26_B - SBC_FY26_B  # $0.213B
SBC_REV_RATIO = SBC_FY26_B / REV_FY26_B  # 22.8%

print("=" * 70)
print("CrowdStrike (CRWD) Phase 2 估值模型")
print("=" * 70)
print(f"当前价格: ${CURRENT_PRICE:.2f}")
print(f"市值: ${MARKET_CAP_B:.1f}B")
print(f"EV: ${EV_B:.1f}B")
print(f"FY2026: 收入${REV_FY26_B:.3f}B / FCF${FCF_FY26_B:.3f}B / SBC${SBC_FY26_B:.3f}B")
print(f"Owner FCF: ${OWNER_FCF_FY26_B:.3f}B (FCF-SBC)")
print(f"SBC/Rev: {SBC_REV_RATIO:.1%}")
print()

# ========================================
# 1. Reverse DCF: 反推隐含FCF CAGR
# ========================================
print("=" * 70)
print("1. REVERSE DCF: 市场在赌什么?")
print("=" * 70)

def reverse_dcf_implied_cagr(ev, base_fcf, wacc, terminal_growth, years=10):
    """反推让EV=DCF的隐含FCF CAGR"""
    low, high = -0.05, 0.50
    for _ in range(200):
        mid = (low + high) / 2
        # 计算10年DCF
        dcf_sum = 0
        fcf = base_fcf
        for y in range(1, years + 1):
            fcf = fcf * (1 + mid)
            dcf_sum += fcf / (1 + wacc) ** y
        # 终端价值
        terminal_fcf = fcf * (1 + terminal_growth)
        terminal_value = terminal_fcf / (wacc - terminal_growth)
        pv_terminal = terminal_value / (1 + wacc) ** years
        total = dcf_sum + pv_terminal
        if total < ev:
            low = mid
        else:
            high = mid
    return mid

# 用FCF反推
for wacc in [0.09, 0.10, 0.11]:
    for tg in [0.025, 0.03, 0.035]:
        implied = reverse_dcf_implied_cagr(EV_B, FCF_FY26_B, wacc, tg)
        print(f"  WACC={wacc:.0%}, TG={tg:.1%} → 隐含FCF CAGR: {implied:.1%}")

print()
# 用Owner FCF反推
print("--- 用Owner FCF (FCF-SBC) 反推 ---")
for wacc in [0.09, 0.10, 0.11]:
    implied = reverse_dcf_implied_cagr(EV_B, OWNER_FCF_FY26_B, wacc, 0.03)
    print(f"  WACC={wacc:.0%}, TG=3.0% → 隐含Owner FCF CAGR: {implied:.1%}")

print()

# 隐含收入CAGR (假设终端FCF Margin)
print("--- 隐含10年收入CAGR (给定终端FCF Margin) ---")
for terminal_margin in [0.25, 0.30, 0.35]:
    for wacc in [0.10]:
        implied_fcf_cagr = reverse_dcf_implied_cagr(EV_B, FCF_FY26_B, wacc, 0.03)
        # FCF CAGR → Revenue CAGR需要考虑margin变化
        # 简化: 假设margin从27.2%线性变到terminal_margin
        # Rev_10 * terminal_margin = FCF_0 * (1+cagr)^10
        fcf_10 = FCF_FY26_B * (1 + implied_fcf_cagr) ** 10
        rev_10 = fcf_10 / terminal_margin
        rev_cagr = (rev_10 / REV_FY26_B) ** (1/10) - 1
        print(f"  终端FCF Margin={terminal_margin:.0%}, WACC={wacc:.0%} → 隐含Rev CAGR: {rev_cagr:.1%}, FY2036收入: ${rev_10:.1f}B")

# ========================================
# 2. 六个隐含信念提取
# ========================================
print()
print("=" * 70)
print("2. 六个隐含信念 + 脆弱度评分")
print("=" * 70)

beliefs = [
    {
        "id": "B1", "name": "10年收入CAGR",
        "implied": "17-19%", "current": "22% (FY26)",
        "history_support": 3, "external_control": 3, "verify_delay": 4,
        "note": "需从22%缓降至15%+,维持17-19%均值. 基数效应+竞争压力"
    },
    {
        "id": "B2", "name": "终端FCF Margin",
        "implied": "30-35%", "current": "27.2%",
        "history_support": 2, "external_control": 2, "verify_delay": 5,
        "note": "需+3-8pp. 管理层FY27指引≥30%. 但SBC是否扣除?"
    },
    {
        "id": "B3", "name": "SBC/Rev收敛至10-12%",
        "implied": "10-12%", "current": "22.8%",
        "history_support": 5, "external_control": 4, "verify_delay": 5,
        "note": "5年零收敛+CEO新PSU+回购5%. 最脆弱信念"
    },
    {
        "id": "B4", "name": "终端P/FCF 20-25x",
        "implied": "20-25x", "current": "76x",
        "history_support": 2, "external_control": 4, "verify_delay": 5,
        "note": "成熟SaaS平均15-25x. 合理但需当前76x大幅压缩"
    },
    {
        "id": "B5", "name": "WACC ~10%",
        "implied": "~10%", "current": "~10.5%",
        "history_support": 3, "external_control": 5, "verify_delay": 3,
        "note": "Beta 1.12, 取决于利率环境. 外部因素主导"
    },
    {
        "id": "B6", "name": "增长持续年限≥10年",
        "implied": "≥10年15%+增长", "current": "TAM $323B by 2029",
        "history_support": 3, "external_control": 3, "verify_delay": 5,
        "note": "需网安TAM持续扩张+CRWD维持份额. AI是双刃剑"
    },
]

print(f"\n{'ID':<5}{'信念':<25}{'隐含值':<18}{'当前值':<18}{'历史':>4}{'外部':>4}{'延迟':>4}{'总分':>5}")
print("-" * 83)
for b in beliefs:
    total = b["history_support"] * b["external_control"] * b["verify_delay"]
    # 用乘积而非求和: 三维度均高才算脆弱
    fragility = (b["history_support"] + b["external_control"] + b["verify_delay"]) / 3
    print(f"{b['id']:<5}{b['name']:<25}{b['implied']:<18}{b['current']:<18}"
          f"{b['history_support']:>4}{b['external_control']:>4}{b['verify_delay']:>4}{fragility:>5.1f}")

print("\n脆弱度排序 (分数越高=越脆弱):")
sorted_beliefs = sorted(beliefs, key=lambda x: x["history_support"] + x["external_control"] + x["verify_delay"], reverse=True)
for i, b in enumerate(sorted_beliefs):
    f = (b["history_support"] + b["external_control"] + b["verify_delay"]) / 3
    print(f"  #{i+1}: {b['id']} {b['name']} — 脆弱度{f:.1f}/5 — {b['note']}")

# ========================================
# 3. 三情景 × 三SBC路径 = 9子情景
# ========================================
print()
print("=" * 70)
print("3. 三情景 × 三SBC路径 = 9子情景DCF")
print("=" * 70)

WACC = 0.10
TERMINAL_GROWTH = 0.03

# 情景定义
scenarios = {
    "Bull": {
        "prob": 0.25,
        "rev_cagr_path": [0.24, 0.22, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13],
        "fcf_margin_terminal": 0.33,
        "desc": "Charlotte AI货币化+LogScale $3B+SBC拐点"
    },
    "Base": {
        "prob": 0.50,
        "rev_cagr_path": [0.22, 0.20, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.11],
        "fcf_margin_terminal": 0.30,
        "desc": "正常成熟化, 分母驱动SBC缓慢下降"
    },
    "Bear": {
        "prob": 0.25,
        "rev_cagr_path": [0.18, 0.15, 0.13, 0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.06],
        "fcf_margin_terminal": 0.26,
        "desc": "内核趋同+SBC零收敛+增速断崖"
    }
}

# SBC路径定义 (SBC/Rev over 10 years)
sbc_paths = {
    "收敛": {  # FTNT路径
        "path": [0.22, 0.20, 0.18, 0.16, 0.15, 0.14, 0.13, 0.12, 0.12, 0.12],
        "desc": "主动纪律(FTNT路径), 22%→12%"
    },
    "分母驱动": {  # NOW路径
        "path": [0.228, 0.22, 0.21, 0.20, 0.19, 0.18, 0.18, 0.17, 0.17, 0.16],
        "desc": "收入增长稀释SBC(NOW路径), 22.8%→16%"
    },
    "零收敛": {  # 当前趋势
        "path": [0.228, 0.23, 0.23, 0.23, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22],
        "desc": "管理层不改变(当前趋势), 维持22-23%"
    }
}

# SBC路径概率 (from Phase 1 analysis)
sbc_path_probs = {"收敛": 0.15, "分母驱动": 0.45, "零收敛": 0.40}

def run_dcf(rev_cagr_path, fcf_margin_terminal, sbc_ratio_path, wacc, tg, base_rev):
    """10年DCF + 终端价值"""
    years = len(rev_cagr_path)
    fcf_margin_start = 0.272  # FY2026 FCF Margin

    projections = []
    rev = base_rev
    for y in range(years):
        rev = rev * (1 + rev_cagr_path[y])
        # FCF Margin线性渐变
        fcf_margin = fcf_margin_start + (fcf_margin_terminal - fcf_margin_start) * (y + 1) / years
        fcf = rev * fcf_margin
        sbc = rev * sbc_ratio_path[y]
        owner_fcf = fcf - sbc
        projections.append({
            "year": y + 1, "fy": f"FY{2027+y}",
            "rev": rev, "fcf": fcf, "sbc": sbc,
            "owner_fcf": owner_fcf,
            "fcf_margin": fcf_margin, "sbc_rev": sbc_ratio_path[y]
        })

    # DCF计算
    dcf_sum = sum(p["fcf"] / (1 + wacc) ** p["year"] for p in projections)
    terminal_fcf = projections[-1]["fcf"] * (1 + tg)
    terminal_value = terminal_fcf / (wacc - tg)
    pv_terminal = terminal_value / (1 + wacc) ** years
    total_ev = dcf_sum + pv_terminal

    # Owner FCF DCF
    owner_dcf_sum = sum(p["owner_fcf"] / (1 + wacc) ** p["year"] for p in projections)
    terminal_owner_fcf = projections[-1]["owner_fcf"] * (1 + tg)
    if terminal_owner_fcf > 0:
        terminal_owner_value = terminal_owner_fcf / (wacc - tg)
    else:
        terminal_owner_value = terminal_owner_fcf * 10  # negative = punitive
    pv_terminal_owner = terminal_owner_value / (1 + wacc) ** years
    total_owner_ev = owner_dcf_sum + pv_terminal_owner

    return {
        "ev_fcf": total_ev,
        "ev_owner": total_owner_ev,
        "terminal_rev": projections[-1]["rev"],
        "terminal_fcf": projections[-1]["fcf"],
        "terminal_sbc": projections[-1]["sbc"],
        "terminal_owner_fcf": projections[-1]["owner_fcf"],
        "terminal_fcf_margin": projections[-1]["fcf_margin"],
        "terminal_sbc_rev": projections[-1]["sbc_rev"],
        "projections": projections
    }

# 运行9子情景
results_9 = {}
print(f"\n{'情景':<8}{'SBC路径':<12}{'EV(FCF)':>10}{'EV(Owner)':>12}{'FY36收入':>10}{'FCF':>8}{'SBC':>8}{'OwnerFCF':>10}{'SBC/Rev':>8}")
print("-" * 88)

for scenario_name, scenario in scenarios.items():
    for sbc_name, sbc_data in sbc_paths.items():
        result = run_dcf(
            scenario["rev_cagr_path"],
            scenario["fcf_margin_terminal"],
            sbc_data["path"],
            WACC, TERMINAL_GROWTH, REV_FY26_B
        )
        key = f"{scenario_name}_{sbc_name}"
        results_9[key] = {**result, "scenario": scenario_name, "sbc_path": sbc_name}

        equity_fcf = result["ev_fcf"] + NET_CASH_B
        equity_owner = result["ev_owner"] + NET_CASH_B

        print(f"{scenario_name:<8}{sbc_name:<12}"
              f"${result['ev_fcf']:>8.1f}B"
              f"  ${result['ev_owner']:>9.1f}B"
              f"  ${result['terminal_rev']:>7.1f}B"
              f"  ${result['terminal_fcf']:>5.1f}B"
              f"  ${result['terminal_sbc']:>5.1f}B"
              f"  ${result['terminal_owner_fcf']:>7.1f}B"
              f"  {result['terminal_sbc_rev']:>6.1%}")

# ========================================
# 4. 概率加权EV + 隐含价格
# ========================================
print()
print("=" * 70)
print("4. 概率加权估值")
print("=" * 70)

# 方法A: 用FCF做DCF (传统)
weighted_ev_fcf = 0
for scenario_name, scenario in scenarios.items():
    for sbc_name, sbc_data in sbc_paths.items():
        key = f"{scenario_name}_{sbc_name}"
        joint_prob = scenario["prob"] * sbc_path_probs[sbc_name]
        weighted_ev_fcf += results_9[key]["ev_fcf"] * joint_prob

weighted_equity_fcf = weighted_ev_fcf + NET_CASH_B
implied_price_fcf = weighted_equity_fcf / SHARES_OUT_M * 1000

# 方法B: 用Owner FCF做DCF (保守)
weighted_ev_owner = 0
for scenario_name, scenario in scenarios.items():
    for sbc_name, sbc_data in sbc_paths.items():
        key = f"{scenario_name}_{sbc_name}"
        joint_prob = scenario["prob"] * sbc_path_probs[sbc_name]
        weighted_ev_owner += results_9[key]["ev_owner"] * joint_prob

weighted_equity_owner = weighted_ev_owner + NET_CASH_B
implied_price_owner = weighted_equity_owner / SHARES_OUT_M * 1000

print(f"\n方法A — FCF DCF (不扣SBC):")
print(f"  概率加权EV: ${weighted_ev_fcf:.1f}B")
print(f"  概率加权Equity: ${weighted_equity_fcf:.1f}B")
print(f"  隐含每股价格: ${implied_price_fcf:.0f}")
print(f"  vs当前${CURRENT_PRICE}: {(implied_price_fcf/CURRENT_PRICE - 1):+.1%}")

print(f"\n方法B — Owner FCF DCF (扣SBC后):")
print(f"  概率加权EV: ${weighted_ev_owner:.1f}B")
print(f"  概率加权Equity: ${weighted_equity_owner:.1f}B")
print(f"  隐含每股价格: ${implied_price_owner:.0f}")
print(f"  vs当前${CURRENT_PRICE}: {(implied_price_owner/CURRENT_PRICE - 1):+.1%}")

print(f"\n方法A vs B差距: ${implied_price_fcf - implied_price_owner:.0f}/股 ({(implied_price_fcf - implied_price_owner)/implied_price_fcf:.0%})")
print(f"  → SBC折价: 方法B比方法A低{(1 - implied_price_owner/implied_price_fcf):.0%}")

# 加权平均(50%方法A + 50%方法B)
blended_price = (implied_price_fcf + implied_price_owner) / 2
print(f"\n混合估值 (50/50):")
print(f"  隐含价格: ${blended_price:.0f}")
print(f"  vs当前${CURRENT_PRICE}: {(blended_price/CURRENT_PRICE - 1):+.1%}")

# ========================================
# 5. 敏感性矩阵
# ========================================
print()
print("=" * 70)
print("5. 敏感性矩阵 — 混合估值价格 (WACC × 终端增速)")
print("=" * 70)

print(f"\n{'':>12}", end="")
for tg in [0.02, 0.025, 0.03, 0.035, 0.04]:
    print(f"{'TG='+f'{tg:.1%}':>10}", end="")
print()
print("-" * 62)

for wacc in [0.085, 0.09, 0.095, 0.10, 0.105, 0.11, 0.115]:
    print(f"WACC={wacc:.1%}  ", end="")
    for tg in [0.02, 0.025, 0.03, 0.035, 0.04]:
        w_ev_fcf = 0
        w_ev_own = 0
        for sn, s in scenarios.items():
            for sp_name, sp_data in sbc_paths.items():
                r = run_dcf(s["rev_cagr_path"], s["fcf_margin_terminal"],
                           sp_data["path"], wacc, tg, REV_FY26_B)
                jp = s["prob"] * sbc_path_probs[sp_name]
                w_ev_fcf += r["ev_fcf"] * jp
                w_ev_own += r["ev_owner"] * jp
        blended = ((w_ev_fcf + NET_CASH_B) / SHARES_OUT_M * 1000 +
                   (w_ev_own + NET_CASH_B) / SHARES_OUT_M * 1000) / 2
        marker = " *" if abs(wacc - 0.10) < 0.001 and abs(tg - 0.03) < 0.001 else ""
        print(f"${blended:>7.0f}{marker}", end="")
    print()
print("  * = 基准情景 (WACC 10%, TG 3%)")

# ========================================
# 6. SOTP分部估值
# ========================================
print()
print("=" * 70)
print("6. SOTP分部估值")
print("=" * 70)

sotp_parts = [
    {
        "name": "端点保护(EDR/XDR)",
        "arr_b": 3.1, "growth": 0.15,
        "comp": "FTNT", "comp_ev_sales": 10.0,
        "discount": 0.85, "note": "成熟, 内核风险折扣15%"
    },
    {
        "name": "LogScale SIEM",
        "arr_b": 0.585, "growth": 0.75,
        "comp": "高增速SaaS(ZS)", "comp_ev_sales": 15.0,
        "discount": 0.90, "note": "高增速但竞争激烈(XSIAM)"
    },
    {
        "name": "Cloud+Identity",
        "arr_b": 1.3, "growth": 0.30,
        "comp": "ZS", "comp_ev_sales": 12.0,
        "discount": 0.90, "note": "增速强, SGNL收购加持"
    },
    {
        "name": "Charlotte AI/AIDR",
        "arr_b": 0.0, "growth": 0.0,
        "comp": "期权", "comp_ev_sales": 0,
        "discount": 1.0, "note": "零独立收入, 期权价值"
    },
]

# Charlotte AI期权估值
# 假设: 如果FY2028成功定价→$500M ARR, 概率30%; 如果失败→$0
charlotte_option = 0.30 * 0.500 * 15.0 + 0.70 * 0  # $2.25B期望值
sotp_parts[-1]["ev_b"] = charlotte_option

print(f"\n{'分部':<25}{'ARR($B)':>9}{'增速':>7}{'对标':>18}{'EV/Sales':>9}{'折扣':>6}{'估值($B)':>10}")
print("-" * 94)

total_sotp = 0
for p in sotp_parts:
    if "ev_b" not in p:
        p["ev_b"] = p["arr_b"] * p["comp_ev_sales"] * p["discount"]
    total_sotp += p["ev_b"]
    print(f"{p['name']:<25}{p['arr_b']:>8.3f}  {p['growth']:>5.0%}  {p['comp']:>16}  {p['comp_ev_sales']:>7.1f}x  {p['discount']:>4.0%}"
          f"  ${p['ev_b']:>8.1f}B")

print(f"\n{'SOTP总EV':<25}{'':>9}{'':>7}{'':>18}{'':>9}{'':>6}  ${total_sotp:>8.1f}B")
print(f"{'+ 净现金':<25}{'':>9}{'':>7}{'':>18}{'':>9}{'':>6}  ${NET_CASH_B:>8.1f}B")
sotp_equity = total_sotp + NET_CASH_B
sotp_price = sotp_equity / SHARES_OUT_M * 1000
print(f"{'SOTP总Equity':<25}{'':>9}{'':>7}{'':>18}{'':>9}{'':>6}  ${sotp_equity:>8.1f}B")
print(f"{'隐含每股价格':<25}{'':>9}{'':>7}{'':>18}{'':>9}{'':>6}  ${sotp_price:>8.0f}")
print(f"  vs当前${CURRENT_PRICE}: {(sotp_price/CURRENT_PRICE - 1):+.1%}")

# ========================================
# 7. P/(FCF-SBC)同行对标
# ========================================
print()
print("=" * 70)
print("7. P/(FCF-SBC) 同行对标")
print("=" * 70)

peers = [
    {"name": "CRWD", "mcap": 99.6, "fcf": 1.31, "sbc": 1.10, "rev_g": 0.22, "gaap_opm": -0.034},
    {"name": "FTNT", "mcap": 59.0, "fcf": 2.23, "sbc": 0.28, "rev_g": 0.15, "gaap_opm": 0.306},
    {"name": "PANW", "mcap": 123.0, "fcf": 4.13, "sbc": 1.30, "rev_g": 0.15, "gaap_opm": 0.135},
    {"name": "DDOG", "mcap": 36.0, "fcf": 1.00, "sbc": 0.57, "rev_g": 0.28, "gaap_opm": -0.013},
    {"name": "ZS", "mcap": 31.9, "fcf": 0.70, "sbc": 0.63, "rev_g": 0.26, "gaap_opm": -0.048},
]

print(f"\n{'公司':<7}{'市值($B)':>9}{'FCF($B)':>9}{'SBC($B)':>9}{'Owner FCF':>11}{'P/FCF':>7}{'P/(F-S)':>9}{'Yield':>7}{'增速':>6}{'GAAP OPM':>10}")
print("-" * 88)
for p in peers:
    owner = p["fcf"] - p["sbc"]
    p_fcf = p["mcap"] / p["fcf"]
    if owner > 0:
        p_owner = p["mcap"] / owner
        yld = owner / p["mcap"]
        p_owner_str = f"{p_owner:.0f}x"
        yld_str = f"{yld:.2%}"
    else:
        p_owner_str = "负值"
        yld_str = "负"
    print(f"{p['name']:<7}{p['mcap']:>8.1f}  {p['fcf']:>7.2f}  {p['sbc']:>7.2f}  ${owner:>8.2f}B"
          f"  {p_fcf:>5.0f}x  {p_owner_str:>7}  {yld_str:>5}  {p['rev_g']:>4.0%}  {p['gaap_opm']:>8.1%}")

# ========================================
# 8. 详细10年投影 (Base + 分母驱动SBC)
# ========================================
print()
print("=" * 70)
print("8. Base情景 × 分母驱动SBC — 逐年10年投影")
print("=" * 70)

base_result = results_9["Base_分母驱动"]
print(f"\n{'年份':<7}{'收入($B)':>9}{'FCF($B)':>9}{'SBC($B)':>9}{'Owner FCF':>11}{'FCF%':>7}{'SBC/Rev':>8}")
print("-" * 61)
for p in base_result["projections"]:
    print(f"{p['fy']:<7}  ${p['rev']:>6.2f}  ${p['fcf']:>6.2f}  ${p['sbc']:>6.2f}  ${p['owner_fcf']:>8.2f}"
          f"  {p['fcf_margin']:>5.1%}  {p['sbc_rev']:>6.1%}")

# ========================================
# 9. 汇总结论
# ========================================
print()
print("=" * 70)
print("9. 估值汇总")
print("=" * 70)

print(f"""
┌─────────────────────────────────────────────────────┐
│ 估值方法              │ 隐含价格  │ vs当前        │
├─────────────────────────────────────────────────────┤
│ DCF(FCF,不扣SBC)      │ ${implied_price_fcf:>6.0f}   │ {(implied_price_fcf/CURRENT_PRICE-1):>+6.1%}        │
│ DCF(Owner FCF,扣SBC)  │ ${implied_price_owner:>6.0f}   │ {(implied_price_owner/CURRENT_PRICE-1):>+6.1%}        │
│ 混合估值(50/50)       │ ${blended_price:>6.0f}   │ {(blended_price/CURRENT_PRICE-1):>+6.1%}        │
│ SOTP分部估值          │ ${sotp_price:>6.0f}   │ {(sotp_price/CURRENT_PRICE-1):>+6.1%}        │
│ 分析师共识            │   $548   │ +39.6%        │
│ Morningstar           │   $460   │ +17.2%        │
│ Alpha Spread          │   $131   │ -66.6%        │
├─────────────────────────────────────────────────────┤
│ 当前价格              │  ${CURRENT_PRICE:>6.2f} │               │
└─────────────────────────────────────────────────────┘

关键发现:
1. FCF DCF vs Owner FCF DCF差距 = SBC的"隐形税"
2. 方法A(FCF)→高估回报(忽略22.8% SBC的稀释)
3. 方法B(Owner)→保守(假设SBC永远不收敛)
4. 混合估值 = 对SBC收敛给予部分信用
5. SOTP暴露了Charlotte AI的期权价值(${charlotte_option:.1f}B)
""")

# 期望回报计算
expected_return_fcf = (implied_price_fcf / CURRENT_PRICE - 1)
expected_return_owner = (implied_price_owner / CURRENT_PRICE - 1)
expected_return_blended = (blended_price / CURRENT_PRICE - 1)

print(f"期望回报(概率加权):")
print(f"  FCF法: {expected_return_fcf:+.1%}")
print(f"  Owner法: {expected_return_owner:+.1%}")
print(f"  混合: {expected_return_blended:+.1%}")

# 写入JSON供报告引用
output = {
    "current_price": CURRENT_PRICE,
    "market_cap_b": round(MARKET_CAP_B, 1),
    "ev_b": round(EV_B, 1),
    "implied_price_fcf": round(implied_price_fcf, 0),
    "implied_price_owner": round(implied_price_owner, 0),
    "blended_price": round(blended_price, 0),
    "sotp_price": round(sotp_price, 0),
    "expected_return_blended": round(expected_return_blended * 100, 1),
    "sbc_discount_pct": round((1 - implied_price_owner / implied_price_fcf) * 100, 0),
    "charlotte_option_b": round(charlotte_option, 1),
}

with open("reports/CRWD/data/crwd_phase2_valuation.json", "w") as f:
    json.dump(output, f, indent=2)
print(f"\n估值数据已写入: reports/CRWD/data/crwd_phase2_valuation.json")
