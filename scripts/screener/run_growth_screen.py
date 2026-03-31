#!/usr/bin/env python3
"""
Growth Inflection Detection (GID) — Runner v1.0

用法:
  # 批量筛选所有有季度数据的股票
  python run_growth_screen.py data/screener/raw/

  # 单只股票详细信号卡
  python run_growth_screen.py data/screener/raw/DDOG.json

  # 指定输出Top N
  python run_growth_screen.py data/screener/raw/ --top 20

  # 包含无季度数据的股票(用年度数据fallback)
  python run_growth_screen.py data/screener/raw/ --include-annual

  # 输出JSON结果
  python run_growth_screen.py data/screener/raw/ --output data/screener/output/gid_results.json
"""

import json
import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from growth_signals import (
    GIDResult, extract_gid_signals, compute_gid_composite,
    format_gid_ranking, format_gid_card, save_gid_results,
)


def load_stock_data(filepath: Path) -> dict:
    with open(filepath) as f:
        return json.load(f)


def process_single(data: dict) -> GIDResult:
    """Process one stock → GID result."""
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

    # Ensure symbol in profile
    if not profile.get('symbol') and data.get('symbol'):
        profile['symbol'] = data['symbol']

    result = extract_gid_signals(
        profile=profile,
        income=data.get('income', []) or data.get('income_10y', []),
        balance=data.get('balance', []),
        cashflow=data.get('cashflow', []) or data.get('cashflow_10y', []),
        key_metrics=data.get('key_metrics', []) or data.get('key_metrics_10y', []),
        ratios=data.get('ratios', []) or data.get('ratios_10y', []),
        insider_trades=data.get('insider_trades', []),
        quote=quote,
        earnings_surprises=data.get('earnings_surprises', []),
        estimates=data.get('estimates', []),
        income_quarterly=data.get('income_quarterly', []),
        ratios_quarterly=data.get('ratios_quarterly', []),
    )

    compute_gid_composite(result)
    return result


def main():
    parser = argparse.ArgumentParser(description='Growth Inflection Detection Screener')
    parser.add_argument('path', help='Directory of raw JSON files or single stock JSON')
    parser.add_argument('--top', type=int, default=30, help='Top N results to show')
    parser.add_argument('--include-annual', action='store_true',
                       help='Include stocks without quarterly data (annual fallback)')
    parser.add_argument('--output', '-o', help='Output JSON path')
    parser.add_argument('--card', action='store_true',
                       help='Show detailed signal card (single stock mode)')
    parser.add_argument('--min-score', type=float, default=0,
                       help='Minimum GID score to display')
    args = parser.parse_args()

    path = Path(args.path)
    results = []

    if path.is_file():
        # Single stock mode
        data = load_stock_data(path)
        result = process_single(data)
        if args.card:
            print(format_gid_card(result))
        else:
            print(format_gid_card(result))
        return

    # Batch mode
    json_files = sorted(path.glob('*.json'))
    skipped_no_q = 0
    skipped_error = 0
    processed = 0

    for jf in json_files:
        try:
            data = load_stock_data(jf)
            has_q = len(data.get('income_quarterly', [])) >= 5

            if not has_q and not args.include_annual:
                skipped_no_q += 1
                continue

            result = process_single(data)
            results.append(result)
            processed += 1
        except Exception as e:
            skipped_error += 1
            print(f"Error processing {jf.name}: {e}", file=sys.stderr)

    # Print ranking
    print(format_gid_ranking(results, top_n=args.top))
    print(f"\nProcessed: {processed} | Skipped(no quarterly): {skipped_no_q} | "
          f"Errors: {skipped_error}")

    # Breakdown of score distribution
    if results:
        scored = [r for r in results if r.composite_score and r.composite_score > 0]
        if scored:
            scores = [r.composite_score for r in scored]
            print(f"\nScore distribution (n={len(scored)}):")
            for threshold in [7.0, 6.5, 6.0, 5.5, 5.0]:
                count = sum(1 for s in scores if s >= threshold)
                print(f"  >= {threshold}: {count} stocks")

    # Save JSON
    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        save_gid_results(results, args.output)
        print(f"\nResults saved to {args.output}")


if __name__ == '__main__':
    main()
