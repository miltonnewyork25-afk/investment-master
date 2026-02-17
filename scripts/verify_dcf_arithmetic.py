#!/usr/bin/env python3
"""
DCF算术验证器 v1.0
用途: 验证Phase 5 Agent C的DCF全链条算术正确性
依赖: 仅标准库(math)
用法: python3 scripts/verify_dcf_arithmetic.py --config config.json
      或在脚本内直接修改params/years字典

源自: MSFT v1.0 FCFF双表矛盾 + 敏感性矩阵8/9格错误
"""

import json
import sys
import math
from typing import List, Tuple, Dict, Optional


def calc_fcff(revenue: float, opm: float, da: float, capex: float,
              nwc: float, tax_rate: float) -> Dict[str, float]:
    """计算单年FCFF及中间值"""
    ebit = revenue * opm
    ebit_after_tax = ebit * (1 - tax_rate)
    fcff = ebit_after_tax + da - capex - nwc
    return {
        "ebit": round(ebit, 2),
        "ebit_after_tax": round(ebit_after_tax, 2),
        "fcff": round(fcff, 2),
    }


def calc_discount_factor(wacc: float, year: int) -> float:
    """计算折现因子 DF = 1/(1+WACC)^year"""
    return 1.0 / ((1 + wacc) ** year)


def calc_terminal_value(last_fcff: float, wacc: float, g: float) -> float:
    """Gordon增长模型终端价值"""
    return last_fcff * (1 + g) / (wacc - g)


def calc_dcf_ev(fcff_list: List[float], wacc: float, g: float,
                start_year: int = 1) -> Dict[str, float]:
    """计算完整DCF: 10Y PV + TV + EV"""
    # 逐年折现
    pvs = []
    dfs = []
    for i, fcff in enumerate(fcff_list):
        year = start_year + i
        df = calc_discount_factor(wacc, year)
        pv = fcff * df
        pvs.append(round(pv, 1))
        dfs.append(round(df, 4))

    pv_sum = sum(pvs)

    # 终端价值
    last_fcff = fcff_list[-1]
    last_df = calc_discount_factor(wacc, start_year + len(fcff_list) - 1)
    tv = calc_terminal_value(last_fcff, wacc, g)
    pv_tv = tv * last_df

    ev = pv_sum + pv_tv
    tv_pct = pv_tv / ev * 100 if ev > 0 else 0

    return {
        "pv_sum": round(pv_sum, 1),
        "pvs": pvs,
        "dfs": dfs,
        "tv": round(tv, 1),
        "pv_tv": round(pv_tv, 1),
        "ev": round(ev, 1),
        "tv_pct": round(tv_pct, 1),
    }


def verify_agent_table(agent_fcffs: List[float], calc_fcffs: List[float],
                       labels: List[str], tolerance: float = 0.01) -> List[dict]:
    """对比Agent表格与计算值"""
    results = []
    for i, (agent, calc, label) in enumerate(zip(agent_fcffs, calc_fcffs, labels)):
        if agent == 0 and calc == 0:
            status = "PASS"
            deviation = 0
        elif agent == 0:
            status = "ERROR"
            deviation = float('inf')
        else:
            deviation = abs(agent - calc) / abs(agent)
            if deviation > tolerance:
                status = "ERROR"
            elif deviation > tolerance / 2:
                status = "WARN"
            else:
                status = "PASS"
        results.append({
            "year": label,
            "agent": agent,
            "calculated": calc,
            "deviation_pct": round(deviation * 100, 2),
            "status": status,
        })
    return results


def verify_sensitivity_matrix(fcff_list: List[float], base_wacc: float,
                              base_g: float, start_year: int,
                              agent_matrix: Optional[List[List[float]]] = None,
                              wacc_offsets: List[float] = [-0.005, 0, 0.005],
                              g_offsets: List[float] = [-0.005, 0, 0.005]) -> Dict:
    """重算3x3敏感性矩阵"""
    matrix = []
    wacc_labels = []
    g_labels = []

    for w_off in wacc_offsets:
        wacc = base_wacc + w_off
        wacc_labels.append(f"{wacc*100:.1f}%")
        row = []
        for g_off in g_offsets:
            g = base_g + g_off
            if len(g_labels) < len(g_offsets):
                g_labels.append(f"{g*100:.1f}%")
            result = calc_dcf_ev(fcff_list, wacc, g, start_year)
            row.append(round(result["ev"], 0))
        matrix.append(row)

    # 比对Agent矩阵
    comparison = None
    if agent_matrix:
        comparison = []
        for i, (calc_row, agent_row) in enumerate(zip(matrix, agent_matrix)):
            for j, (calc_val, agent_val) in enumerate(zip(calc_row, agent_row)):
                if agent_val == 0:
                    deviation = float('inf')
                else:
                    deviation = (agent_val - calc_val) / calc_val * 100
                comparison.append({
                    "wacc": wacc_labels[i],
                    "g": g_labels[j],
                    "agent": agent_val,
                    "calculated": calc_val,
                    "deviation_pct": round(deviation, 1),
                    "status": "PASS" if abs(deviation) < 2 else "ERROR",
                })

    return {
        "matrix": matrix,
        "wacc_labels": wacc_labels,
        "g_labels": g_labels,
        "comparison": comparison,
    }


def print_report(ticker: str, params: dict, years_data: list,
                 agent_fcffs: list, agent_dfs: list, agent_pvs: list,
                 agent_tv: float, agent_pv_tv: float, agent_ev: float,
                 agent_sensitivity: Optional[list] = None,
                 base_year_index: int = 0):
    """输出完整验证报告

    base_year_index: 基准年在years_data中的索引(该年不折现)。
                     例如FY26E是基准年=index 0, DCF从FY27E(index 1)开始折现。
    """

    wacc = params["wacc"]
    g = params["terminal_g"]
    tax = params["tax_rate"]
    net_debt = params["net_debt"]
    shares = params["shares"]
    market_cap = params["market_cap"]
    fy_start = params.get("fy_start", 26)

    print(f"## DCF算术验证报告")
    print(f"")
    print(f"**TICKER**: {ticker}")
    print(f"**WACC**: {wacc*100:.1f}% | **g**: {g*100:.1f}% | **Tax**: {tax*100:.0f}%")
    print(f"**预测期**: FY{fy_start+base_year_index+1}E-FY{fy_start+len(years_data)-1}E ({len(years_data)-base_year_index-1}年折现)")
    print()

    # 1. FCFF验证 (全部年份)
    labels = [f"FY{fy_start+i}E" for i in range(len(years_data))]
    calc_fcffs_all = []
    for rev, opm, da, capex, nwc in years_data:
        result = calc_fcff(rev, opm, da, capex, nwc, tax)
        calc_fcffs_all.append(result["fcff"])

    fcff_results = verify_agent_table(agent_fcffs, calc_fcffs_all, labels)

    print("### FCFF逐行验证")
    print("| 年份 | Agent FCFF | 计算FCFF | 偏差% | 状态 |")
    print("|------|-----------|---------|-------|:----:|")
    fcff_errors = 0
    for r in fcff_results:
        emoji = "✅" if r["status"] == "PASS" else ("⚠️" if r["status"] == "WARN" else "❌")
        print(f"| {r['year']} | ${r['agent']:.1f}B | ${r['calculated']:.1f}B | {r['deviation_pct']:.1f}% | {emoji} |")
        if r["status"] == "ERROR":
            fcff_errors += 1
    print()

    # 2. 完整DCF计算 (仅折现年份: base_year_index+1 到末尾)
    dcf_fcffs = calc_fcffs_all[base_year_index + 1:]  # 跳过基准年
    dcf = calc_dcf_ev(dcf_fcffs, wacc, g, start_year=1)

    # 构建折现年的labels
    dcf_labels = labels[base_year_index + 1:]

    # 3. 折现因子验证 (仅折现年份)
    agent_dfs_dcf = agent_dfs[base_year_index + 1:]
    print("### 折现因子验证")
    df_ok = True
    for i, (agent_df, calc_df) in enumerate(zip(agent_dfs_dcf, dcf["dfs"])):
        if abs(agent_df - calc_df) > 0.002:
            print(f"❌ {dcf_labels[i]}: Agent {agent_df:.4f} vs 计算 {calc_df:.4f}")
            df_ok = False
    if df_ok:
        print("✅ 全部通过")
    print()

    # 4. PV验证 (仅折现年份)
    agent_pvs_dcf = agent_pvs[base_year_index + 1:]
    print("### PV = FCFF × DF 验证")
    pv_ok = True
    for i, (agent_pv, calc_pv) in enumerate(zip(agent_pvs_dcf, dcf["pvs"])):
        if abs(agent_pv - calc_pv) > 1.0:  # $1B tolerance
            print(f"❌ {dcf_labels[i]}: Agent ${agent_pv:.1f}B vs 计算 ${calc_pv:.1f}B")
            pv_ok = False
    if pv_ok:
        print("✅ 全部通过")
    print()

    # 5. 终端价值
    print("### 终端价值验证")
    tv_dev = abs(agent_tv - dcf["tv"]) / dcf["tv"] * 100 if dcf["tv"] > 0 else 0
    pv_tv_dev = abs(agent_pv_tv - dcf["pv_tv"]) / dcf["pv_tv"] * 100 if dcf["pv_tv"] > 0 else 0
    tv_emoji = "✅" if tv_dev < 1 else "❌"
    pv_tv_emoji = "✅" if pv_tv_dev < 1 else "❌"
    print(f"- TV: Agent ${agent_tv:.0f}B vs 计算 ${dcf['tv']:.0f}B ({tv_dev:.1f}%) {tv_emoji}")
    print(f"- PV(TV): Agent ${agent_pv_tv:.0f}B vs 计算 ${dcf['pv_tv']:.0f}B ({pv_tv_dev:.1f}%) {pv_tv_emoji}")
    print(f"- TV/EV: {dcf['tv_pct']:.1f}% {'✅ (50-65%区间)' if 50 <= dcf['tv_pct'] <= 65 else '⚠️ (超出50-65%区间)'}")
    print()

    # 6. 总EV
    ev_dev = abs(agent_ev - dcf["ev"]) / dcf["ev"] * 100 if dcf["ev"] > 0 else 0
    ev_emoji = "✅" if ev_dev < 1 else "❌"
    market_cap_calc = dcf["ev"] - net_debt
    price_calc = market_cap_calc / shares
    expected_return = (market_cap_calc - market_cap) / market_cap * 100

    print("### 总EV验证")
    print(f"- EV: Agent ${agent_ev:.0f}B vs 计算 ${dcf['ev']:.0f}B ({ev_dev:.1f}%) {ev_emoji}")
    print(f"- Market Cap: ${market_cap_calc:.0f}B")
    print(f"- 每股价值: ${price_calc:.0f}")
    print(f"- 期望回报: {expected_return:+.1f}%")
    print()

    # 7. 敏感性矩阵
    if agent_sensitivity:
        sens = verify_sensitivity_matrix(
            dcf_fcffs, wacc, g, start_year=1,
            agent_matrix=agent_sensitivity
        )

        print("### 敏感性矩阵验证")
        print(f"| WACC\\g | {' | '.join(sens['g_labels'])} |")
        print(f"|--------|{'|'.join([':----:'] * len(sens['g_labels']))}|")

        sens_errors = 0
        for i, wl in enumerate(sens["wacc_labels"]):
            cells = []
            for j in range(len(sens["g_labels"])):
                comp = sens["comparison"][i * len(sens["g_labels"]) + j]
                emoji = "✅" if comp["status"] == "PASS" else "❌"
                cells.append(f"A:{comp['agent']:.0f}/C:{comp['calculated']:.0f} {emoji}")
                if comp["status"] == "ERROR":
                    sens_errors += 1
            print(f"| {wl} | {' | '.join(cells)} |")
        print()
        print(f"**敏感性矩阵**: {9-sens_errors}/9 通过, {sens_errors}/9 错误")
        print()

    # 8. 总结
    print("### 总结")
    total_errors = fcff_errors + (0 if df_ok else 1) + (0 if pv_ok else 1)
    total_errors += (0 if tv_dev < 1 else 1) + (0 if ev_dev < 1 else 1)
    if agent_sensitivity:
        total_errors += sens_errors

    if total_errors == 0:
        print("✅ **全部通过** — DCF算术验证无误")
    else:
        print(f"❌ **{total_errors}项错误** — 需要修正后方可写入报告")
        if fcff_errors > 0:
            print(f"  - FCFF: {fcff_errors}行不匹配")
        if agent_sensitivity and sens_errors > 0:
            print(f"  - 敏感性矩阵: {sens_errors}/9格不匹配")


# ============================================================
# MSFT v1.0 示例配置 (修改此处适配其他公司)
# ============================================================

def msft_example():
    """MSFT v1.0的验证配置"""

    ticker = "MSFT"

    params = {
        "wacc": 0.095,
        "terminal_g": 0.03,
        "tax_rate": 0.18,
        "net_debt": 30.3,
        "shares": 7.46,
        "market_cap": 2995,
        "fy_start": 26,  # FY26E是第一年
    }

    # (Revenue $B, OPM, D&A $B, CapEx $B, NWC变动 $B)
    years_data = [
        (320, 0.450, 38.0, 80.0, 3.0),   # FY26E
        (371, 0.440, 48.0, 82.0, 3.5),   # FY27E
        (425, 0.425, 60.0, 80.0, 4.0),   # FY28E
        (482, 0.430, 68.0, 75.0, 3.5),   # FY29E
        (540, 0.445, 65.0, 68.0, 3.0),   # FY30E
        (594, 0.455, 60.0, 62.0, 2.5),   # FY31E
        (641, 0.460, 56.0, 58.0, 2.0),   # FY32E
        (686, 0.465, 52.0, 55.0, 1.5),   # FY33E
        (727, 0.470, 50.0, 52.0, 1.0),   # FY34E
        (763, 0.470, 48.0, 50.0, 1.0),   # FY35E
        (793, 0.470, 47.0, 48.0, 1.0),   # FY36E
    ]

    # Agent C的FCFF (从报告Table 1提取)
    agent_fcffs = [72.2, 97.0, 123.8, 166.6, 203.7, 233.6, 258.7, 282.3, 306.5, 323.4, 338.5]

    # Agent C的折现因子 (从折现表提取, FY27起 = year 1)
    # 注: FY26E不在折现表中(基准年)，我们从FY27E开始验证
    agent_dfs = [0.0, 0.913, 0.834, 0.762, 0.696, 0.635, 0.580, 0.530, 0.484, 0.442, 0.404]

    # Agent C的PV
    agent_pvs = [0.0, 87.9, 103.5, 121.5, 132.9, 148.3, 150.0, 149.6, 148.3, 142.9, 136.8]

    # Agent C的终端价值
    agent_tv = 5364.0
    agent_pv_tv = 2167.0
    agent_ev = 3489.0

    # Agent C的敏感性矩阵 (WACC 9.0/9.5/10.0 × g 2.5/3.0/3.5)
    agent_sensitivity = [
        [3568, 3930, 4414],  # WACC 9.0%
        [3126, 3489, 3940],  # WACC 9.5%
        [2791, 3096, 3479],  # WACC 10.0%
    ]

    print_report(
        ticker=ticker,
        params=params,
        years_data=years_data,
        agent_fcffs=agent_fcffs,
        agent_dfs=agent_dfs,
        agent_pvs=agent_pvs,
        agent_tv=agent_tv,
        agent_pv_tv=agent_pv_tv,
        agent_ev=agent_ev,
        agent_sensitivity=agent_sensitivity,
        base_year_index=0,  # FY26E是基准年(index 0), DCF从FY27E(index 1)开始
    )


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--config":
        # JSON配置模式 (未来扩展)
        with open(sys.argv[2], 'r') as f:
            config = json.load(f)
        print("JSON config mode not yet implemented. Use msft_example().")
    else:
        # 默认运行MSFT示例
        msft_example()
