#!/usr/bin/env python3
"""
Google Ads ROAS Potential Evaluator — 100baggers.club

Usage: python evaluate_report.py <TICKER> [--all]

Scores a report across 7 dimensions to predict advertising ROAS,
then generates a campaign recommendation.
"""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# ── Dimension weights ──────────────────────────────────────
WEIGHTS = {
    "search_volume": 0.25,
    "cpc_efficiency": 0.15,
    "hook_strength": 0.20,
    "competition_gap": 0.15,
    "audience_willingness": 0.10,
    "report_quality": 0.10,
    "freshness": 0.05,
}

# ── Known report data (update as reports complete) ─────────
# Format: ticker -> {dim: score, ...}
REPORTS: dict[str, dict] = {
    "NVDA": {
        "search_volume": 10, "cpc_efficiency": 4, "hook_strength": 10,
        "competition_gap": 2, "audience_willingness": 9, "report_quality": 8,
        "freshness": 10,
        "hooks": [
            "Is NVIDIA a $4.3T platform or the most expensive cyclical stock in history?",
            "Analysts project FY2030 revenue decline — yet price it at 36x.",
        ],
        "report_chars": "210K", "quality_score": 4.0, "expected_return": "-16~20%",
        "rating": "审慎关注偏中性", "pe": "36x", "campaign_status": "deployed",
    },
    "INTC": {
        "search_volume": 6, "cpc_efficiency": 9, "hook_strength": 10,
        "competition_gap": 5, "audience_willingness": 7, "report_quality": 6,
        "freshness": 8,
        "hooks": [
            "Intel at $46 needs 5 assumptions to hold. Joint probability: 2-3%.",
            "Retail is buying. Institutions are selling. Who's right?",
        ],
        "report_chars": "270K", "quality_score": 4.1, "expected_return": "-72%",
        "rating": "审慎关注(条件性)", "pe": "N/A", "campaign_status": "deployed",
    },
    "ARM": {
        "search_volume": 6, "cpc_efficiency": 7, "hook_strength": 8,
        "competition_gap": 8, "audience_willingness": 8, "report_quality": 8,
        "freshness": 8,
        "hooks": [
            "ARM earnings could grow 137% — and you'd still lose 49%.",
            "RISC-V won't replace ARM. It will cap its pricing power.",
        ],
        "report_chars": "360K", "quality_score": 4.2, "expected_return": "-41%",
        "rating": "审慎关注", "pe": "141x", "campaign_status": "deployed",
    },
    "KLAC": {
        "search_volume": 4, "cpc_efficiency": 7, "hook_strength": 6,
        "competition_gap": 8, "audience_willingness": 9, "report_quality": 10,
        "freshness": 7,
        "hooks": [
            "Is KLA Corporation worth 42x earnings?",
            "Semiconductor equipment: what's actually priced in?",
        ],
        "report_chars": "254K", "quality_score": 4.5, "expected_return": "-38%",
        "rating": "审慎关注", "pe": "34x", "campaign_status": "deployed",
    },
    "SEMI_EQUIPMENT": {
        "search_volume": 3, "cpc_efficiency": 6, "hook_strength": 5,
        "competition_gap": 9, "audience_willingness": 9, "report_quality": 9,
        "freshness": 6,
        "hooks": [
            "The definitive semiconductor equipment deep dive — ASML vs KLAC vs LRCX vs AMAT.",
            "530+ evidence cards, 17 kill switches, 20 chapters.",
        ],
        "report_chars": "939K", "quality_score": 4.3, "expected_return": "varies",
        "rating": "varies", "pe": "varies", "campaign_status": "deployed",
    },
    "SBUX": {
        "search_volume": 8, "cpc_efficiency": 7, "hook_strength": 8,
        "competition_gap": 7, "audience_willingness": 7, "report_quality": 8,
        "freshness": 10,
        "hooks": [
            "Starbucks trades at 78x P/E with 9.6% margins. The math doesn't work.",
            "CEO Niccol's turnaround needs 5 conditions. Joint probability: ~15%.",
            "Earnings fell 51%. Stock fell 12%. Someone is wrong.",
            "Negative equity, 149% dividend payout, 5.6x leverage. What could go wrong?",
        ],
        "report_chars": "368K", "quality_score": 4.0, "expected_return": "-24%",
        "rating": "审慎关注", "pe": "78x(reported)/46x(normalized)", "campaign_status": "pending",
    },
    # ── Add new reports below ──
    "IHG": {
        "search_volume": 2, "cpc_efficiency": 9, "hook_strength": 5,
        "competition_gap": 10, "audience_willingness": 6, "report_quality": 9,
        "freshness": 6,
        "hooks": ["43% valuation discount decomposed into three layers."],
        "report_chars": "501K", "quality_score": 4.3, "expected_return": "+13.5%",
        "rating": "关注", "pe": "29x", "campaign_status": "not_planned",
    },
    "RCL": {
        "search_volume": 3, "cpc_efficiency": 8, "hook_strength": 5,
        "competition_gap": 9, "audience_willingness": 5, "report_quality": 8,
        "freshness": 6,
        "hooks": ["Cruise stocks: COVID recovery or structural transformation?"],
        "report_chars": "317K", "quality_score": 4.2, "expected_return": "-8.7%",
        "rating": "中性关注(偏审慎)", "pe": "20x", "campaign_status": "not_planned",
    },
    "VRT": {
        "search_volume": 2, "cpc_efficiency": 9, "hook_strength": 5,
        "competition_gap": 10, "audience_willingness": 6, "report_quality": 8,
        "freshness": 5,
        "hooks": ["Vertiv: AI infrastructure play or PE residue at 62x P/E?"],
        "report_chars": "368K", "quality_score": 4.2, "expected_return": "-1%~+7%",
        "rating": "中性关注(条件性)", "pe": "62x", "campaign_status": "not_planned",
    },
    "TSLA": {
        "search_volume": 10, "cpc_efficiency": 3, "hook_strength": 5,
        "competition_gap": 1, "audience_willingness": 4, "report_quality": 5,
        "freshness": 4,
        "hooks": ["Tesla: EV, robots, or energy — which identity is the market pricing?"],
        "report_chars": "415K", "quality_score": 3.8, "expected_return": "+22%",
        "rating": "关注", "pe": "175x", "campaign_status": "not_planned",
    },
}


@dataclass
class EvalResult:
    ticker: str
    scores: dict[str, int]
    weighted_total: float
    decision: str
    budget_range: str
    estimated_roas: str
    hooks: list[str]
    meta: dict = field(default_factory=dict)


def evaluate(ticker: str) -> EvalResult | None:
    data = REPORTS.get(ticker.upper())
    if not data:
        return None

    scores = {k: data[k] for k in WEIGHTS}
    total = sum(scores[k] * WEIGHTS[k] for k in WEIGHTS)

    if total >= 7.5:
        decision = "DEPLOY — 立即投放，优先分配预算"
        budget = "$500-800/mo"
        roas = "5:1+ (post-optimization)"
    elif total >= 6.0:
        decision = "TEST — 值得小预算测试"
        budget = "$300-500/mo"
        roas = "3-5:1 (post-optimization)"
    elif total >= 4.5:
        decision = "CONDITIONAL — 等催化剂窗口"
        budget = "$150-300/mo"
        roas = "2-3:1"
    else:
        decision = "SKIP — 不建议投放"
        budget = "$0"
        roas = "<2:1"

    return EvalResult(
        ticker=ticker.upper(),
        scores=scores,
        weighted_total=round(total, 2),
        decision=decision,
        budget_range=budget,
        estimated_roas=roas,
        hooks=data.get("hooks", []),
        meta={k: data[k] for k in data if k not in WEIGHTS and k != "hooks"},
    )


def print_eval(r: EvalResult):
    print(f"\n{'='*60}")
    print(f"  ROAS EVALUATION: {r.ticker}")
    print(f"{'='*60}\n")

    print("  Dimension Scores:")
    dim_labels = {
        "search_volume": "D1 Search Volume    ",
        "cpc_efficiency": "D2 CPC Efficiency   ",
        "hook_strength": "D3 Hook Strength    ",
        "competition_gap": "D4 Competition Gap  ",
        "audience_willingness": "D5 Audience Pay     ",
        "report_quality": "D6 Report Quality   ",
        "freshness": "D7 Freshness        ",
    }
    for k, label in dim_labels.items():
        bar = "█" * r.scores[k] + "░" * (10 - r.scores[k])
        wt = WEIGHTS[k]
        contrib = r.scores[k] * wt
        print(f"    {label} {bar} {r.scores[k]:2d}/10  (×{wt:.2f} = {contrib:.2f})")

    print(f"\n  {'─'*50}")
    print(f"  TOTAL SCORE:       {r.weighted_total:.2f} / 10.00")
    print(f"  DECISION:          {r.decision}")
    print(f"  BUDGET:            {r.budget_range}")
    print(f"  ESTIMATED ROAS:    {r.estimated_roas}")
    print(f"  {'─'*50}")

    if r.meta:
        print(f"\n  Report Info:")
        for k, v in r.meta.items():
            print(f"    {k}: {v}")

    if r.hooks:
        print(f"\n  Top Ad Hooks:")
        for i, h in enumerate(r.hooks, 1):
            print(f"    {i}. \"{h}\"")

    print()


def print_ranking():
    results = []
    for ticker in REPORTS:
        r = evaluate(ticker)
        if r:
            results.append(r)
    results.sort(key=lambda x: x.weighted_total, reverse=True)

    print(f"\n{'='*72}")
    print(f"  ROAS RANKING — ALL REPORTS")
    print(f"{'='*72}\n")
    print(f"  {'#':>2}  {'Ticker':<12} {'Score':>6}  {'Decision':<12} {'Budget':<14} {'Status'}")
    print(f"  {'─'*68}")

    for i, r in enumerate(results, 1):
        status = r.meta.get("campaign_status", "unknown")
        marker = "✅" if status == "deployed" else "⏳" if status == "pending" else "—"
        dec_short = r.decision.split("—")[0].strip()
        print(f"  {i:>2}  {r.ticker:<12} {r.weighted_total:>5.2f}  {dec_short:<12} {r.budget_range:<14} {marker} {status}")

    print(f"\n  Legend: ✅ deployed | ⏳ pending | — not planned\n")


def main():
    if len(sys.argv) < 2:
        print("Usage: python evaluate_report.py <TICKER> [--all]")
        print("\nAvailable tickers:", ", ".join(sorted(REPORTS.keys())))
        sys.exit(1)

    arg = sys.argv[1]

    if arg == "--all":
        print_ranking()
        return

    ticker = arg.upper()
    result = evaluate(ticker)
    if not result:
        print(f"Error: No data for {ticker}")
        print(f"Available: {', '.join(sorted(REPORTS.keys()))}")
        print(f"\nTo add {ticker}, edit REPORTS dict in evaluate_report.py")
        sys.exit(1)

    print_eval(result)

    if "--all" in sys.argv:
        print_ranking()


if __name__ == "__main__":
    main()
