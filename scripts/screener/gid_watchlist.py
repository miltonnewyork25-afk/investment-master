#!/usr/bin/env python3
"""
GID Watchlist Generator v1.0

从GID结果生成可操作的分层观察名单:
  Tier A (立即关注): 高分+非陷阱+隐形复利/杠杆突破+中小盘
  Tier B (持续跟踪): 高质量但需要更多确认(大盘/加速初期/亏损中)
  Tier C (观察变化): 信号存在但需要下季确认

季度对比: 与前次结果比较，标记新进入/退出/信号变化

用法:
  python gid_watchlist.py data/screener/output/gid_v32_full.json
  python gid_watchlist.py data/screener/output/gid_v32_full.json --prev data/screener/output/gid_prev.json
"""

import json
import sys
import argparse
from pathlib import Path
from collections import defaultdict


def classify_tier(r: dict) -> str:
    """
    Tier A: score≥7.5 + 非陷阱 + (隐形复利|杠杆突破) + MCap<$100B
    Tier B: score≥6.5 + 非陷阱 + 质量好(quality_mult>1.0)
    Tier C: score≥5.5 + 有某些亮点信号
    """
    score = r.get('composite_score', 0)
    arch = r.get('archetype', '')
    mcap = r.get('market_cap', 0) or 0
    mcap_b = mcap / 1e9
    flags = r.get('flags', [])
    summary = r.get('signal_summary', '')

    if arch == 'momentum_trap':
        return 'C'  # 陷阱最多Tier C

    # Tier A: high conviction, actionable
    if (score >= 7.5
        and arch in ('stealth_compounder', 'leverage_breakout')
        and mcap_b < 100
        and '重组反弹' not in ' '.join(flags)):
        return 'A'

    # Also Tier A: exceptional quality even if larger
    if (score >= 8.0
        and arch in ('stealth_compounder', 'leverage_breakout', 'mature_reaccel')
        and '重组反弹' not in ' '.join(flags)):
        return 'A'

    # Tier B: good but needs confirmation
    if score >= 6.5 and arch != 'momentum_trap':
        return 'B'

    # Tier C: watch for improvement
    if score >= 5.5:
        return 'C'

    return None  # Below threshold


def generate_watchlist(results: list, prev_results: list = None):
    """Generate tiered watchlist with optional quarterly comparison."""

    # Build current tier assignments
    tiers = {'A': [], 'B': [], 'C': []}
    for r in sorted(results, key=lambda x: x.get('composite_score', 0), reverse=True):
        tier = classify_tier(r)
        if tier:
            tiers[tier].append(r)

    # Build previous lookup
    prev_lookup = {}
    if prev_results:
        prev_lookup = {r['symbol']: r for r in prev_results}

    # --- Output ---
    lines = []
    lines.append("=" * 110)
    lines.append("GID Watchlist — 可操作观察名单")
    lines.append("=" * 110)

    for tier_name, tier_label, tier_desc in [
        ('A', 'TIER A — 立即关注', '高分+非陷阱+中小盘+杠杆突破或隐形复利'),
        ('B', 'TIER B — 持续跟踪', '质量好但需要更多确认(大盘/加速初期/亏损)'),
        ('C', 'TIER C — 观察变化', '信号存在但弱，等下季确认'),
    ]:
        stocks = tiers[tier_name]
        lines.append("")
        lines.append(f"━━━ {tier_label} ({len(stocks)}只) — {tier_desc} ━━━")

        if not stocks:
            lines.append("  (无)")
            continue

        lines.append(f"  {'Sym':<7} {'GID':>5} {'MCap':>7} {'EV/S':>5} "
                     f"{'1Y涨':>6} {'距高':>6} {'OPM位':>6} "
                     f"{'原型':<8} {'阶段':<6} {'增长':>6} {'RevΔ':>5}")
        lines.append(f"  {'-'*120}")

        for r in stocks[:20] if tier_name != 'A' else stocks:
            sym = r['symbol']
            score = r.get('composite_score', 0)
            mcap = r.get('market_cap', 0) or 0
            mcap_s = f"${mcap/1e9:.0f}B" if mcap else "N/A"
            arch = r.get('archetype', '—')[:6]
            phase = (r.get('leverage_phase') or '—')[:5]
            rev_g = r.get('rev_yoy_q0')
            rev_s = f"{rev_g:.0f}%" if rev_g else "N/A"
            rev_acc = r.get('rev_acceleration')
            acc_s = f"{rev_acc:+.0f}" if rev_acc is not None else "N/A"
            summary = (r.get('signal_summary') or '')[:40]

            # Quarter-over-quarter change indicator
            change = ""
            if prev_lookup:
                if sym in prev_lookup:
                    prev_score = prev_lookup[sym].get('composite_score', 0)
                    delta = score - prev_score
                    if delta > 0.5:
                        change = " ↑NEW"
                    elif delta > 0.2:
                        change = " ↑"
                    elif delta < -0.5:
                        change = " ↓↓"
                    elif delta < -0.2:
                        change = " ↓"
                else:
                    change = " ★NEW"

            evs = r.get('ev_sales')
            evs_s = f"{evs:.0f}x" if evs else "N/A"

            # v3.3: 反直觉提醒上下文
            yh = r.get('price_context_year_high')
            yl = r.get('price_context_year_low')
            pct_ath = r.get('price_context_pct_from_ath')
            pct_low = r.get('price_context_pct_from_low')

            # 1Y涨幅 = (current - yearLow) / yearLow approximation
            # 实际1Y是52W区间内的位置, 用 pct_from_low 作为代理
            y1_s = f"{pct_low:+.0f}%" if pct_low is not None else "N/A"
            ath_s = f"{pct_ath:+.0f}%" if pct_ath is not None else "N/A"

            # OPM位置: 是否在8Q peak
            opm_at_peak = r.get('opm_at_8q_peak')
            if opm_at_peak is True:
                opm_s = "★PEAK"  # 红flag: OPM处于8Q高点
            elif opm_at_peak is False:
                opm_s = "below"
            else:
                opm_s = "N/A"

            lines.append(f"  {sym:<7} {score:>5.2f} {mcap_s:>7} {evs_s:>5} "
                        f"{y1_s:>6} {ath_s:>6} {opm_s:>6} "
                        f"{arch:<8} {phase:<6} {rev_s:>6} {acc_s:>5}{change}")

    # --- Summary stats ---
    lines.append("")
    lines.append("=" * 110)
    lines.append(f"Tier A: {len(tiers['A'])}只 | Tier B: {len(tiers['B'])}只 | "
                f"Tier C: {len(tiers['C'])}只 | "
                f"Total watchlist: {sum(len(v) for v in tiers.values())}只")

    # Archetype breakdown across all tiers
    all_archetypes = defaultdict(int)
    for tier_stocks in tiers.values():
        for r in tier_stocks:
            all_archetypes[r.get('archetype', 'unknown')] += 1
    lines.append(f"原型分布: {dict(all_archetypes)}")

    # New entries (if comparing)
    if prev_lookup:
        new_entries = [r['symbol'] for tier_stocks in tiers.values()
                      for r in tier_stocks if r['symbol'] not in prev_lookup]
        exited = [sym for sym in prev_lookup
                 if sym not in {r['symbol'] for tier_stocks in tiers.values() for r in tier_stocks}
                 and prev_lookup[sym].get('composite_score', 0) >= 5.5]
        if new_entries:
            lines.append(f"新进入: {', '.join(new_entries[:15])}")
        if exited:
            lines.append(f"退出: {', '.join(exited[:15])}")

    # Sector concentration check
    sector_counts = defaultdict(int)
    for r in tiers['A']:
        sector_counts[r.get('sector', 'Unknown')] += 1
    if sector_counts:
        lines.append(f"Tier A板块集中度: {dict(sector_counts)}")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description='GID Watchlist Generator')
    parser.add_argument('results', help='Current GID results JSON')
    parser.add_argument('--prev', help='Previous quarter results JSON for comparison')
    args = parser.parse_args()

    results = json.load(open(args.results))

    prev_results = None
    if args.prev:
        prev_results = json.load(open(args.prev))

    print(generate_watchlist(results, prev_results))


if __name__ == '__main__':
    main()
