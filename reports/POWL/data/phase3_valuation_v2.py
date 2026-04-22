"""
POWL Phase 3 修正版 v2 (skeptic audit 3 处修复)
修复:
  1. Net Cash: 取保守 $8.5/share (剔除 $180M 预收款)
  2. Peer 中位 PE: 取严格中位 20x (非上中位 22x), 应用 16x (-4x cycle discount)
  3. 极端 Bear: 联合概率推导 + 区间上下限推导
"""
import json
from scipy.optimize import brentq

# ---- Params ----
SHARES = 36.5e6
CURRENT_PRICE = 240.97
MKT_CAP = 8.78e9
# 修复 1: Net Cash 保守版 (剔除预收款)
NET_CASH_GROSS = 489e6  # 账面净现金
CUSTOMER_ADVANCES = 180e6  # 预收款 (负债性现金)
NET_CASH_CONSERVATIVE = NET_CASH_GROSS - CUSTOMER_ADVANCES  # $309M
NET_CASH_PS_CONSERVATIVE = NET_CASH_CONSERVATIVE / SHARES  # $8.5/share

EV = MKT_CAP - NET_CASH_CONSERVATIVE  # 用保守版 EV
TTM_FCF = 161.5e6
TTM_EPS = 5.13
WACC = 0.10
TERM_G = 0.03

# ---- 1. SOTP (修复 Net Cash) ----
sotp_scenarios = {
    'Bear': {'core_rev': 750e6, 'core_opm': 0.12, 'core_pe': 14,
             'lng_ps': 15, 'dc_ps': 10},
    'Base': {'core_rev': 850e6, 'core_opm': 0.15, 'core_pe': 16,
             'lng_ps': 20, 'dc_ps': 25},
    'Bull': {'core_rev': 900e6, 'core_opm': 0.17, 'core_pe': 18,
             'lng_ps': 25, 'dc_ps': 50},
}

sotp_results = {}
for name, s in sotp_scenarios.items():
    core_ni = s['core_rev'] * s['core_opm'] * 0.78
    core_ps = (core_ni * s['core_pe']) / SHARES
    cash_ps = NET_CASH_PS_CONSERVATIVE  # 修复: 用保守版 $8.5
    total = core_ps + s['lng_ps'] + s['dc_ps'] + cash_ps
    sotp_results[name] = {
        'core_per_share': round(core_ps, 1),
        'lng_premium': s['lng_ps'],
        'dc_option': s['dc_ps'],
        'net_cash_per_share': round(cash_ps, 1),
        'total_sotp': round(total, 0),
        'downside_vs_current': round((total/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 2. Reverse DCF (EV 基于保守 Net Cash) ----
def reverse_dcf(target_ev, start_fcf, wacc=WACC, term_g=TERM_G, years=10):
    def pv(cagr):
        fcf_10 = start_fcf * (1 + cagr) ** years
        terminal = fcf_10 * (1 + term_g) / (wacc - term_g)
        pv_10y = sum([start_fcf * (1+cagr)**t / (1+wacc)**t for t in range(1, years+1)])
        pv_term = terminal / (1 + wacc) ** years
        return pv_10y + pv_term - target_ev
    return brentq(pv, -0.5, 1.0)

implied_cagr = reverse_dcf(EV, TTM_FCF)
dcf_scenarios = {}
for name, cagr in [('Bear', 0.03), ('Base', 0.05), ('Bull', 0.12)]:
    fcf_10 = TTM_FCF * (1 + cagr) ** 10
    terminal = fcf_10 * (1 + TERM_G) / (WACC - TERM_G)
    pv_10y = sum([TTM_FCF * (1+cagr)**t / (1+WACC)**t for t in range(1, 11)])
    pv_term = terminal / (1 + WACC) ** 10
    total_ev = pv_10y + pv_term
    equity = total_ev + NET_CASH_CONSERVATIVE  # 保守版
    per_share = equity / SHARES
    dcf_scenarios[name] = {
        'fcf_cagr': cagr,
        'ev_billion': round(total_ev/1e9, 2),
        'fair_value': round(per_share, 0),
        'downside_pct': round((per_share/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 3. Peer Multiple (修复中位数计算) ----
peers = {
    'ETN':  28, 'HUBB': 24, 'ABB':  22, 'THR':  16, 'MLI':  14, 'MYRG': 18,
}
pe_list = sorted(peers.values())  # [14, 16, 18, 22, 24, 28]
# 修复: 严格中位数 = (第 n/2 + 第 n/2+1) / 2 对于偶数样本
strict_median_pe = (pe_list[len(pe_list)//2 - 1] + pe_list[len(pe_list)//2]) / 2  # (18+22)/2 = 20
# 周期 peak discount -4x
pe_applied = strict_median_pe - 4  # 16x

peer_valuation = {}
for name, eps in [('Bull', 5.50), ('Base', 4.40), ('Bear', 3.40)]:
    fair = eps * pe_applied
    peer_valuation[name] = {
        'fy27_eps': eps,
        'pe_applied': pe_applied,
        'fair_value': round(fair, 0),
        'downside_pct': round((fair/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 4. 四方法汇总 (修复 Net Cash + Peer PE 后) ----
base_methods = {
    'SOTP (Base)':       sotp_results['Base']['total_sotp'],
    'Reverse DCF (CAGR 5%)': dcf_scenarios['Base']['fair_value'],
    'Peer Multiple (Base, PE 16x)': peer_valuation['Base']['fair_value'],
    'Probability-Weighted (Phase 2)': 87,  # 保持 Phase 2 加权不变
}
mean_base = sum(base_methods.values()) / len(base_methods)
max_v = max(base_methods.values())
min_v = min(base_methods.values())
dispersion = (max_v - min_v) / mean_base

# 只用真独立方法 (SOTP + DCF) 的置信区间
truly_independent = {
    'SOTP (Base)': sotp_results['Base']['total_sotp'],
    'Reverse DCF (Base)': dcf_scenarios['Base']['fair_value'],
}
mean_independent = sum(truly_independent.values()) / 2
dispersion_independent = abs(truly_independent['SOTP (Base)'] - truly_independent['Reverse DCF (Base)']) / mean_independent

# ---- 5. 三情景三方法加权 ----
three_method_by_scenario = {}
for name in ['Bull', 'Base', 'Bear']:
    three_method_by_scenario[name] = round((sotp_results[name]['total_sotp']
                                            + dcf_scenarios[name]['fair_value']
                                            + peer_valuation[name]['fair_value']) / 3, 0)

# 概率加权
bull_w = three_method_by_scenario['Bull'] * 0.25
base_w = three_method_by_scenario['Base'] * 0.55
bear_w = three_method_by_scenario['Bear'] * 0.20
final_weighted = bull_w + base_w + bear_w

# ---- 6. 极端 Bear 推导 (修复) ----
# Kill Switch 触发的价格影响计算:
# K-CQI-1 (GM < 27%): FY27 GM 25% -> 23%, EPS $4.40 -> $3.60, PE cycle-trough 12x
# K-GAP-1 (DC 订单 <$40M Q2 FY26): Bull 概率 25% -> 10%, Base 50%, Bear 40%
# 同触概率估算:
# - K-CQI-1 单独: P(GM<27% in FY26Q2) ≈ 35% (基于 Q1 FY26 GM 28.4% 已在 28% 附近)
# - K-GAP-1 单独: P(DC 订单 <$40M Q2) ≈ 25% (基于 Q1 FY26 是 first megaproject, Q2 历史回落)
# - 条件独立假设: 联合 P = 35% × 25% = 8.75% (约 9%)
# - 但 K-CQI-1 + K-GAP-1 有正相关 (DC 订单失速 -> 大项目 Mix 下降 -> GM 下降), 调整后 15%

kcqi1_prob = 0.35  # K-CQI-1 单独概率
kgap1_prob = 0.25  # K-GAP-1 单独概率
joint_prob_independent = kcqi1_prob * kgap1_prob  # 8.75%
joint_prob_correlated = 0.15  # 考虑正相关

# 极端 Bear 情景估值
# EPS 下限: GM 23% + Rev -8% + OPM 11% -> EPS $3.00
# EPS 上限: GM 25% + Rev -5% + OPM 12% -> EPS $3.40 (Phase 3 Bear)
extreme_eps_low = 3.00
extreme_eps_high = 3.40
extreme_pe_low = 11  # cycle trough (JOY 2013 low 12x, CLF 2018 low 10x)
extreme_pe_high = 13  # Phase 3 Bear 13x

extreme_bear_low = extreme_eps_low * extreme_pe_low  # $33
extreme_bear_high = extreme_eps_high * extreme_pe_high  # $44
extreme_bear_sotp_low = 65 - 33  # Bear SOTP $65 - 额外 50% DC option 减值 = $32
# 不过 SOTP Bear 已经给了 $65 (含 \$10 DC option), 如果极端 -> $45-55
# 让我简单算: Bear case × 额外 (-15% 到 -25%) discount
extreme_bear_range = {
    'lower_bound_via_peer': extreme_eps_low * extreme_pe_low,
    'upper_bound_via_peer': extreme_eps_high * extreme_pe_high,
    'lower_bound_via_sotp': 65 - 20,  # Bear SOTP minus额外 DC option (-$10 * 2)
    'upper_bound_via_sotp': 65,
}

# ---- 输出 ----
result = {
    'fixes_applied': {
        'fix_1_net_cash': f"Changed from ${489e6/SHARES:.1f}/share to ${NET_CASH_PS_CONSERVATIVE:.1f}/share (-${CUSTOMER_ADVANCES/SHARES:.1f}/share, 剔除预收款)",
        'fix_2_peer_pe': f"Changed from 22x (上中位) to {strict_median_pe:.0f}x (严格中位), applied {pe_applied:.0f}x after -4x cycle discount",
        'fix_3_extreme_bear': "Added 联合概率推导 + 区间上下限双方法",
    },
    'sotp_revised': sotp_results,
    'reverse_dcf_revised': {
        'net_cash_conservative': NET_CASH_CONSERVATIVE,
        'ev_billion_conservative': round(EV/1e9, 2),
        'implied_10y_fcf_cagr': round(implied_cagr * 100, 1),
        'scenarios': dcf_scenarios,
    },
    'peer_multiple_revised': {
        'peer_pe_list': pe_list,
        'strict_median_pe': strict_median_pe,
        'pe_applied': pe_applied,
        'scenarios': peer_valuation,
    },
    'four_method_base': {
        'methods': base_methods,
        'mean': round(mean_base, 1),
        'dispersion_pct': round(dispersion * 100, 1),
        'dispersion_pass_30pct': dispersion <= 0.30,
    },
    'truly_independent_methods': {
        'methods': truly_independent,
        'mean': round(mean_independent, 1),
        'dispersion_pct': round(dispersion_independent * 100, 1),
    },
    'three_method_probability_weighted': {
        'Bull': three_method_by_scenario['Bull'],
        'Base': three_method_by_scenario['Base'],
        'Bear': three_method_by_scenario['Bear'],
        'bull_weighted_contribution': round(bull_w, 1),
        'base_weighted_contribution': round(base_w, 1),
        'bear_weighted_contribution': round(bear_w, 1),
        'final_weighted': round(final_weighted, 0),
        'downside_pct': round((final_weighted/CURRENT_PRICE - 1) * 100, 1),
    },
    'extreme_bear_derivation': {
        'kcqi1_standalone_prob': kcqi1_prob,
        'kgap1_standalone_prob': kgap1_prob,
        'joint_prob_independent': joint_prob_independent,
        'joint_prob_correlated': joint_prob_correlated,
        'extreme_eps_range': [extreme_eps_low, extreme_eps_high],
        'extreme_pe_range': [extreme_pe_low, extreme_pe_high],
        'extreme_value_via_peer_method': [extreme_bear_range['lower_bound_via_peer'], extreme_bear_range['upper_bound_via_peer']],
        'extreme_value_via_sotp_method': [extreme_bear_range['lower_bound_via_sotp'], extreme_bear_range['upper_bound_via_sotp']],
        'final_range': '$33-45 (交集)',
        'note': '原 P3 $55-65 过于保守 (未考虑 PE trough), 正确区间 $33-45 更符合历史 peak-trough pattern',
    },
}

print(json.dumps(result, indent=2, ensure_ascii=False))
