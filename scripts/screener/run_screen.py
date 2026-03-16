#!/usr/bin/env python3
"""
Undervalued Stock Screener — Data Collector & Runner v1.0

设计: 由AI Agent调用MCP工具获取数据 → 写入JSON → 本脚本计算信号+排名
也可独立运行: 读取已缓存的数据文件, 重新计算得分

用法:
  # 对已缓存数据重新计算
  python run_screen.py data/screener/raw/

  # 对单只股票计算 (从缓存)
  python run_screen.py data/screener/raw/AAPL.json

  # 指定输出目录
  python run_screen.py data/screener/raw/ --output data/screener/results/
"""

import json
import sys
import argparse
from pathlib import Path
from datetime import datetime

# Add parent dir to path for imports
sys.path.insert(0, str(Path(__file__).parent))
from signals import (
    StockScreenResult, extract_signals_from_fmp, compute_composite,
    format_ranking_table, format_signal_card, save_results
)


def load_stock_data(filepath: Path) -> dict:
    """加载单只股票的缓存数据"""
    with open(filepath) as f:
        return json.load(f)


def process_single(data: dict) -> StockScreenResult:
    """处理单只股票数据 → 完整信号结果"""
    result = extract_signals_from_fmp(
        profile=data.get('profile', {}),
        income=data.get('income', []),
        balance=data.get('balance', []),
        cashflow=data.get('cashflow', []),
        ratios=data.get('ratios', []),
        key_metrics=data.get('key_metrics', []),
        insider_trades=data.get('insider_trades', []),
        quote=data.get('quote', {}),
        earnings_surprises=data.get('earnings_surprises', []),
        estimates=data.get('estimates', []),
    )
    compute_composite(result)
    return result


def process_batch(data_dir: Path) -> list[StockScreenResult]:
    """批量处理目录下所有股票数据"""
    results = []
    files = sorted(data_dir.glob("*.json"))

    if not files:
        print(f"No JSON files found in {data_dir}")
        return results

    print(f"Processing {len(files)} stocks...")

    for f in files:
        try:
            data = load_stock_data(f)
            result = process_single(data)
            results.append(result)
        except Exception as e:
            print(f"  Error processing {f.name}: {e}")

    return results


def main():
    parser = argparse.ArgumentParser(description="低估股筛选器")
    parser.add_argument("input", help="数据目录或单个JSON文件")
    parser.add_argument("--output", "-o", default="data/screener", help="输出目录")
    parser.add_argument("--top", "-t", type=int, default=20, help="显示前N只")
    parser.add_argument("--detail", "-d", action="store_true", help="显示详细信号卡片")
    args = parser.parse_args()

    input_path = Path(args.input)

    if input_path.is_file():
        data = load_stock_data(input_path)
        result = process_single(data)
        print(format_signal_card(result))
        return

    if input_path.is_dir():
        results = process_batch(input_path)
        if not results:
            return

        # Print ranking
        print(format_ranking_table(results))

        # Print detail cards for top N
        if args.detail:
            active = sorted(
                [r for r in results if not r.vetoes],
                key=lambda r: r.composite_score or 0,
                reverse=True
            )
            for r in active[:args.top]:
                print(format_signal_card(r))

        # Save
        save_results(results, args.output)
        return

    print(f"Error: {input_path} is not a file or directory")
    sys.exit(1)


if __name__ == "__main__":
    main()
