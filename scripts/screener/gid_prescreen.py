#!/usr/bin/env python3
"""
GID Pre-Screen v1.0 — 年度数据快速初筛

用已有的年度数据(338只有3年+)做第一层漏斗:
  1. 收入加速(年度级): 最近1年增速 > 前1年增速
  2. 利润方向: OPM改善 或 毛利率扩张
  3. 规模适配: 排除GID不适用的行业
  4. 资产负债表健康: 非困境公司

输出: 需要补季报的高优先级候选列表

用法:
  python gid_prescreen.py data/screener/raw/
  python gid_prescreen.py data/screener/raw/ --fetch-list  # 输出可直接用于批量获取
"""

import json
import os
import sys
import argparse
from pathlib import Path


# GID不适用的行业(周期性/二元结果/特殊会计)
EXCLUDED_INDUSTRIES = {
    'Biotechnology', 'Drug Manufacturers - General',
    'Drug Manufacturers - Specialty & Generic',
    'Oil & Gas E&P', 'Oil & Gas Integrated', 'Oil & Gas Midstream',
    'Oil & Gas Refining & Marketing', 'Oil & Gas Equipment & Services',
    'Banks - Diversified', 'Banks - Regional',
    'Insurance - Diversified', 'Insurance - Life', 'Insurance - Property & Casualty',
    'Insurance - Reinsurance', 'Insurance - Specialty',
    'Utilities - Regulated Electric', 'Utilities - Regulated Gas',
    'Utilities - Diversified', 'Utilities - Regulated Water',
    'Utilities - Renewable', 'Utilities - Independent Power Producers',
    'REIT - Diversified', 'REIT - Industrial', 'REIT - Office',
    'REIT - Residential', 'REIT - Retail', 'REIT - Specialty',
    'REIT - Healthcare Facilities', 'REIT - Hotel & Motel',
    'Mortgage Finance', 'Credit Services',
    'Tobacco', 'Thermal Coal',
}

EXCLUDED_SECTORS = {'Utilities', 'Real Estate', 'Energy'}


def load_stock(path):
    with open(path) as f:
        return json.load(f)


def prescreen(data):
    """Annual-level pre-screen. Returns (pass, score, details) tuple."""
    sym = data.get('symbol', '?')

    profile = data.get('profile', {})
    if isinstance(profile, list) and profile:
        profile = profile[0]
    if not isinstance(profile, dict):
        profile = {}

    quote = data.get('quote', {})
    if isinstance(quote, list) and quote:
        quote = quote[0]
    if not isinstance(quote, dict):
        quote = {}

    # --- Basic info ---
    sector = profile.get('sector', '')
    industry = profile.get('industry', '')
    mcap = (profile.get('mktCap', 0) or quote.get('marketCap', 0) or 0) / 1e9

    # --- Exclusion filters ---
    if industry in EXCLUDED_INDUSTRIES:
        return False, 0, f"SKIP: industry={industry}"
    if sector in EXCLUDED_SECTORS:
        return False, 0, f"SKIP: sector={sector}"
    if mcap > 0 and mcap < 2:
        return False, 0, f"SKIP: mcap=${mcap:.1f}B (<$2B)"

    # --- Annual data ---
    income = data.get('income', []) or data.get('income_10y', [])
    cashflow = data.get('cashflow', []) or data.get('cashflow_10y', [])
    balance = data.get('balance', [])
    key_metrics = data.get('key_metrics', []) or data.get('key_metrics_10y', [])

    if len(income) < 3:
        return False, 0, "SKIP: <3 years income data"

    # --- Revenue acceleration (annual) ---
    revs = [x.get('revenue', 0) or 0 for x in income[:4]]
    if not all(r > 0 for r in revs[:3]):
        return False, 0, "SKIP: missing/zero revenue"

    rev_g1 = (revs[0] - revs[1]) / revs[1] * 100  # Latest year
    rev_g2 = (revs[1] - revs[2]) / revs[2] * 100  # Prior year
    accel = rev_g1 - rev_g2

    # Minimum growth filter: at least some growth
    if rev_g1 < 2:
        return False, 0, f"SKIP: rev growth {rev_g1:.1f}% (<2%)"

    # --- Gross margin direction ---
    gm_delta = None
    for i in range(min(2, len(income))):
        rev = income[i].get('revenue', 0) or 0
        gp = income[i].get('grossProfit', 0) or 0
        if rev > 0:
            gm = gp / rev * 100
            if i == 0:
                gm_latest = gm
            elif i == 1:
                gm_delta = gm_latest - gm

    # --- OPM direction ---
    opm_delta = None
    for i in range(min(2, len(income))):
        rev = income[i].get('revenue', 0) or 0
        oi = income[i].get('operatingIncome', 0) or 0
        if rev > 0:
            opm = oi / rev * 100
            if i == 0:
                opm_latest = opm
            elif i == 1:
                opm_delta = opm_latest - opm

    # --- FCF direction ---
    fcf_improving = False
    if len(cashflow) >= 2 and len(income) >= 2:
        for i in range(2):
            rev = income[i].get('revenue', 0) or 0
            ocf = cashflow[i].get('operatingCashFlow', 0) or 0
            capex = abs(cashflow[i].get('capitalExpenditure', 0) or 0)
            if rev > 0:
                fcf_m = (ocf - capex) / rev * 100
                if i == 0:
                    fcf_m_latest = fcf_m
                elif i == 1:
                    fcf_improving = fcf_m_latest > fcf_m

    # --- Balance sheet health (basic) ---
    stressed = False
    if balance and isinstance(balance[0], dict):
        bs = balance[0]
        cash = bs.get('cashAndShortTermInvestments', 0) or 0
        debt = bs.get('totalDebt', 0) or 0
        cl = bs.get('totalCurrentLiabilities', 0) or 0
        ca = bs.get('totalCurrentAssets', 0) or 0
        if cl > 0 and ca / cl < 0.5:
            stressed = True
        if debt > 0 and cash / debt < 0.1 and (income[0].get('operatingIncome', 0) or 0) < 0:
            stressed = True

    if stressed:
        return False, 0, "SKIP: balance sheet stressed"

    # --- Scoring ---
    score = 0
    details = []

    # Revenue acceleration (max 30pts)
    if accel > 15:
        score += 30
        details.append(f"强加速+{accel:.0f}pp")
    elif accel > 5:
        score += 20
        details.append(f"加速+{accel:.0f}pp")
    elif accel > 0:
        score += 10
        details.append(f"微加速+{accel:.0f}pp")
    elif rev_g1 > 15:
        score += 8  # Not accelerating but growing fast
        details.append(f"高增{rev_g1:.0f}%")

    # Revenue growth level (max 20pts)
    if rev_g1 > 30:
        score += 20
        details.append(f"增{rev_g1:.0f}%")
    elif rev_g1 > 15:
        score += 15
        details.append(f"增{rev_g1:.0f}%")
    elif rev_g1 > 8:
        score += 10
        details.append(f"增{rev_g1:.0f}%")
    else:
        score += 5

    # Margin improvement (max 20pts)
    if opm_delta is not None and opm_delta > 2:
        score += 15
        details.append(f"OPM+{opm_delta:.1f}pp")
    if gm_delta is not None and gm_delta > 1:
        score += 10
        details.append(f"GM+{gm_delta:.1f}pp")
    elif gm_delta is not None and gm_delta < -2:
        score -= 5
        details.append(f"GM{gm_delta:.1f}pp")

    # FCF improving (max 10pts)
    if fcf_improving:
        score += 10
        details.append("FCF↑")

    # Market cap tier bonus (max 15pts) — smaller = more discoverable
    if 2 <= mcap < 10:
        score += 15
        details.append(f"${mcap:.0f}B小盘")
    elif 10 <= mcap < 50:
        score += 10
        details.append(f"${mcap:.0f}B中盘")
    elif 50 <= mcap < 200:
        score += 5
        details.append(f"${mcap:.0f}B")
    else:
        details.append(f"${mcap:.0f}B大盘")

    # Minimum threshold
    if score < 15:
        return False, score, f"LOW SCORE: {score} ({', '.join(details)})"

    return True, score, f"{', '.join(details)}"


def main():
    parser = argparse.ArgumentParser(description='GID Annual Pre-Screen')
    parser.add_argument('path', help='Directory of raw JSON files')
    parser.add_argument('--fetch-list', action='store_true',
                       help='Output fetch list for batch quarterly data retrieval')
    parser.add_argument('--min-score', type=int, default=15,
                       help='Minimum pre-screen score (default 15)')
    parser.add_argument('--include-existing', action='store_true',
                       help='Include stocks that already have quarterly data')
    args = parser.parse_args()

    raw_dir = Path(args.path)
    candidates = []
    skipped = {'industry': 0, 'sector': 0, 'mcap': 0, 'data': 0,
               'growth': 0, 'balance': 0, 'score': 0}
    already_has_q = 0

    for jf in sorted(raw_dir.glob('*.json')):
        data = load_stock(jf)
        sym = data.get('symbol', jf.stem)

        has_q = len(data.get('income_quarterly', [])) >= 5
        if has_q and not args.include_existing:
            already_has_q += 1
            continue

        passed, score, details = prescreen(data)
        if passed:
            profile = data.get('profile', {})
            if isinstance(profile, list) and profile:
                profile = profile[0]
            if not isinstance(profile, dict):
                profile = {}
            candidates.append({
                'symbol': sym,
                'score': score,
                'details': details,
                'sector': profile.get('sector', ''),
                'industry': profile.get('industry', ''),
                'has_quarterly': has_q,
            })
        else:
            reason = details.split(':')[0] if ':' in details else 'other'
            if 'industry' in details.lower():
                skipped['industry'] += 1
            elif 'sector' in details.lower():
                skipped['sector'] += 1
            elif 'mcap' in details.lower():
                skipped['mcap'] += 1
            elif 'data' in details.lower() or 'revenue' in details.lower():
                skipped['data'] += 1
            elif 'growth' in details.lower() or 'rev growth' in details.lower():
                skipped['growth'] += 1
            elif 'balance' in details.lower():
                skipped['balance'] += 1
            else:
                skipped['score'] += 1

    # Sort by score
    candidates.sort(key=lambda x: -x['score'])

    if args.fetch_list:
        # Output just the symbols, one per line
        for c in candidates:
            if not c['has_quarterly']:
                print(c['symbol'])
        return

    # Pretty output
    print("=" * 100)
    print("GID Pre-Screen — 年度数据快速初筛")
    print("=" * 100)
    print(f"{'#':<4} {'Sym':<8} {'Score':>5} {'Sector':<25} {'信号'}")
    print("-" * 100)

    for i, c in enumerate(candidates, 1):
        q_mark = " [有Q]" if c['has_quarterly'] else ""
        print(f"{i:<4} {c['symbol']:<8} {c['score']:>5} {c['sector']:<25} {c['details']}{q_mark}")

    print("-" * 100)
    print(f"通过初筛: {len(candidates)} | 已有季报: {already_has_q}")
    print(f"排除: 行业{skipped['industry']} 板块{skipped['sector']} "
          f"市值{skipped['mcap']} 数据{skipped['data']} "
          f"增速{skipped['growth']} 财务{skipped['balance']} "
          f"低分{skipped['score']}")

    need_fetch = [c for c in candidates if not c['has_quarterly']]
    print(f"\n需要补季报: {len(need_fetch)}只")
    print(f"运行 --fetch-list 获取批量获取列表")

    # Sector breakdown of candidates
    from collections import Counter
    sector_counts = Counter(c['sector'] for c in candidates)
    print(f"\n通过者按板块: {dict(sector_counts)}")


if __name__ == '__main__':
    main()
