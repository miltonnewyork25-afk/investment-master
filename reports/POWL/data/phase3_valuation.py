"""
POWL Phase 3 — 估值深度
SOTP + Reverse DCF + Peer Multiple + 敏感性
"""
import json
from scipy.optimize import brentq

# Params
SHARES = 36.5e6
CURRENT_PRICE = 240.97
MKT_CAP = 8.78e9
NET_CASH = 489e6
EV = MKT_CAP - NET_CASH
TTM_FCF = 161.5e6
TTM_EPS = 5.13
WACC = 0.10
TERM_G = 0.03

# ---- 1. SOTP ----
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
    cash_ps = NET_CASH / SHARES
    total = core_ps + s['lng_ps'] + s['dc_ps'] + cash_ps
    sotp_results[name] = {
        'core_per_share': round(core_ps, 1),
        'lng_premium': s['lng_ps'],
        'dc_option': s['dc_ps'],
        'net_cash_per_share': round(cash_ps, 1),
        'total_sotp': round(total, 0),
        'downside_vs_current': round((total/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 2. Reverse DCF ----
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
    equity = total_ev + NET_CASH
    per_share = equity / SHARES
    dcf_scenarios[name] = {
        'fcf_cagr': cagr,
        'ev_billion': round(total_ev/1e9, 2),
        'fair_value': round(per_share, 0),
        'downside_pct': round((per_share/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 3. Peer Multiple ----
peers = {
    'ETN':  {'pe': 28, 'ev_sales': 3.8},
    'HUBB': {'pe': 24, 'ev_sales': 3.2},
    'ABB':  {'pe': 22, 'ev_sales': 3.5},
    'THR':  {'pe': 16, 'ev_sales': 2.0},
    'MLI':  {'pe': 14, 'ev_sales': 1.8},
    'MYRG': {'pe': 18, 'ev_sales': 0.8},
}
industrial_pes = [peers[p]['pe'] for p in peers]
median_pe = sorted(industrial_pes)[len(industrial_pes)//2]  # 22x

peer_valuation = {}
for name, eps in [('Bull', 5.50), ('Base', 4.40), ('Bear', 3.40)]:
    # Use median peer PE ± adjustment for cycle position
    # POWL 当前 peak, 应用 PE 略低于中位 (cycle peak discount)
    pe_applied = median_pe - 4  # 18x (POWL 周期峰值 discount)
    fair = eps * pe_applied
    peer_valuation[name] = {
        'fy27_eps': eps,
        'pe_applied': pe_applied,
        'fair_value': round(fair, 0),
        'downside_pct': round((fair/CURRENT_PRICE - 1) * 100, 1),
    }

# ---- 4. 敏感性表 (二维) ----
sensitivity = {}
for eps in [3.50, 4.00, 4.40, 5.00, 5.50, 6.00]:
    row = {}
    for pe in [12, 15, 18, 20, 22, 25]:
        price = eps * pe
        row[f'PE_{pe}x'] = round(price, 0)
    sensitivity[f'EPS_${eps:.2f}'] = row

# ---- 5. 三方法汇总 (Base Case) ----
base_methods = {
    'SOTP (Base)': sotp_results['Base']['total_sotp'],
    'Reverse DCF (CAGR 5%)': dcf_scenarios['Base']['fair_value'],
    'Peer Multiple (Base)': peer_valuation['Base']['fair_value'],
    'Probability-Weighted (Phase 2)': 87,
}
mean_base = sum(base_methods.values()) / len(base_methods)
max_v = max(base_methods.values())
min_v = min(base_methods.values())
dispersion = (max_v - min_v) / mean_base

# ---- 输出 ----
result = {
    'sotp': sotp_results,
    'reverse_dcf': {
        'implied_10y_fcf_cagr_at_current_price': round(implied_cagr * 100, 1),
        'scenarios': dcf_scenarios,
    },
    'peer_multiple': {
        'industrial_peers_median_pe': median_pe,
        'pe_applied_for_powl_cycle_peak': median_pe - 4,
        'scenarios': peer_valuation,
    },
    'sensitivity_table': sensitivity,
    'three_method_summary_base': {
        'methods': base_methods,
        'mean': round(mean_base, 1),
        'dispersion_pct': round(dispersion * 100, 1),
        'dispersion_pass': dispersion <= 0.30,
        'downside_from_current': round((mean_base/CURRENT_PRICE - 1) * 100, 1),
    },
    'probability_weighted_three_method': {
        'Bull':  round(sum([sotp_results['Bull']['total_sotp'], dcf_scenarios['Bull']['fair_value'], peer_valuation['Bull']['fair_value']]) / 3, 0),
        'Base':  round(sum([sotp_results['Base']['total_sotp'], dcf_scenarios['Base']['fair_value'], peer_valuation['Base']['fair_value']]) / 3, 0),
        'Bear':  round(sum([sotp_results['Bear']['total_sotp'], dcf_scenarios['Bear']['fair_value'], peer_valuation['Bear']['fair_value']]) / 3, 0),
    },
}

# Apply probability weighting
bull_w = result['probability_weighted_three_method']['Bull'] * 0.25
base_w = result['probability_weighted_three_method']['Base'] * 0.55
bear_w = result['probability_weighted_three_method']['Bear'] * 0.20
result['final_weighted'] = {
    'bull_weighted': round(bull_w, 1),
    'base_weighted': round(base_w, 1),
    'bear_weighted': round(bear_w, 1),
    'total': round(bull_w + base_w + bear_w, 0),
    'downside': round(((bull_w + base_w + bear_w)/CURRENT_PRICE - 1) * 100, 1),
}

print(json.dumps(result, indent=2, ensure_ascii=False))
