#!/usr/bin/env python3
"""
Undervalued Stock Screener — Data Collector & Runner v2.0

两阶段筛选:
  Stage 1: L1+L2+L3 (宽筛, 基础数据)
  Stage 2: L1-L5全部 (深筛, 需要10Y年报+6Q季报)

用法:
  # Stage 1 (默认)
  python run_screen.py data/screener/raw/

  # Stage 2 (需要extended数据)
  python run_screen.py data/screener/raw/ --stage2

  # 对单只股票
  python run_screen.py data/screener/raw/AAPL.json
"""

import json
import sys
import argparse
from pathlib import Path
from datetime import datetime

sys.path.insert(0, str(Path(__file__).parent))
from signals import (
    StockScreenResult, extract_signals_from_fmp, compute_composite, compute_stage2,
    format_ranking_table, format_signal_card, save_results
)


def load_stock_data(filepath: Path) -> dict:
    """加载单只股票的缓存数据"""
    with open(filepath) as f:
        return json.load(f)


def process_single(data: dict, stage2: bool = False) -> StockScreenResult:
    """处理单只股票数据 → 完整信号结果"""
    # Merge mgmt_signals into profile for extraction
    profile = data.get('profile', {})
    if isinstance(profile, dict) and 'mgmt_signals' in data:
        profile['_mgmt_signals'] = data['mgmt_signals']
    result = extract_signals_from_fmp(
        profile=profile,
        income=data.get('income', []),
        balance=data.get('balance', []),
        cashflow=data.get('cashflow', []),
        ratios=data.get('ratios', []),
        key_metrics=data.get('key_metrics', []),
        insider_trades=data.get('insider_trades', []),
        quote=data.get('quote', {}),
        earnings_surprises=data.get('earnings_surprises', []),
        estimates=data.get('estimates', []),
        # Stage 2 extended data
        income_10y=data.get('income_10y', []),
        ratios_10y=data.get('ratios_10y', []),
        cashflow_10y=data.get('cashflow_10y', []),
        key_metrics_10y=data.get('key_metrics_10y', []),
        income_quarterly=data.get('income_quarterly', []),
        ratios_quarterly=data.get('ratios_quarterly', []),
    )
    compute_composite(result)
    if stage2:
        compute_stage2(result)
    return result


def process_batch(data_dir: Path, stage2: bool = False) -> list[StockScreenResult]:
    """批量处理目录下所有股票数据"""
    results = []
    files = sorted(data_dir.glob("*.json"))

    if not files:
        print(f"No JSON files found in {data_dir}")
        return results

    mode = "Stage 2 (五层)" if stage2 else "Stage 1 (三层)"
    print(f"Processing {len(files)} stocks... [{mode}]")

    for f in files:
        try:
            data = load_stock_data(f)
            result = process_single(data, stage2=stage2)
            results.append(result)
        except Exception as e:
            print(f"  Error processing {f.name}: {e}")

    return results


def format_stage2_ranking(results: list[StockScreenResult]) -> str:
    """生成Stage 2排名表 (五层)"""
    active = [r for r in results if not r.vetoes and r.stage2_score is not None]
    vetoed = [r for r in results if r.vetoes]
    no_s2 = [r for r in results if not r.vetoes and r.stage2_score is None]
    active.sort(key=lambda r: r.stage2_score or 0, reverse=True)

    lines = []
    lines.append(f"\n{'='*95}")
    lines.append(f"  Stage 2 深筛排名 | {len(active)}只通过 / {len(vetoed)}只否决 / {len(results)}只总计")
    lines.append(f"  权重: L1(便宜)15% + L2(不是陷阱)15% + L3(纠错)15% + L4(品质)30% + L5(拐点)25%")
    lines.append(f"{'='*95}")
    lines.append(f"  {'#':>3} {'Symbol':<6} {'S2':>5} {'S1':>5} {'L1':>5} {'L2':>5} {'L3':>5} {'L4':>5} {'L5':>5} {'F':>3} {'GM%':>5} {'ROIC5Y':>7}")
    lines.append(f"  {'-'*88}")

    for i, r in enumerate(active, 1):
        gm = f"{r.l4.gross_margin_latest:.0f}" if r.l4.gross_margin_latest is not None else "N/A"
        roic = f"{r.l4.roic_5y_mean:.0f}" if r.l4.roic_5y_mean is not None else "N/A"
        lines.append(
            f"  {i:>3} {r.symbol:<6} "
            f"{r.stage2_score:>5.1f} {r.composite_score:>5.1f} "
            f"{r.l1.score:>5.1f} {r.l2.score:>5.1f} {r.l3.score:>5.1f} "
            f"{r.l4.score:>5.1f} {r.l5.score:>5.1f} "
            f"{r.l2.f_score or 0:>3} {gm:>5} {roic:>7}"
        )

    if vetoed:
        lines.append(f"\n  --- 否决 ---")
        for r in vetoed:
            lines.append(f"  ⛔ {r.symbol:<6} | {r.vetoes[0]}")

    lines.append("")
    return "\n".join(lines)


def format_stage2_card(r: StockScreenResult) -> str:
    """Stage 2信号卡 (五层详细)"""
    lines = [format_signal_card(r)]

    # L4 details
    lines.append(f"  L4 品质护城河 [{r.l4.score:.1f}/10]")
    lines.append(f"    GM: {_fmt(r.l4.gross_margin_latest)}% (slope={_fmt(r.l4.gross_margin_10y_slope)}/yr, σ={_fmt(r.l4.gross_margin_stability)})")
    lines.append(f"    Rev CAGR: 10Y={_fmt(r.l4.revenue_cagr_10y)}% 3Y={_fmt(r.l4.revenue_cagr_3y)}% (加速={_fmt(r.l4.growth_acceleration)})")
    lines.append(f"    Rev波动: σ={_fmt(r.l4.revenue_volatility_10y)} | 正增长年: {r.l4.positive_growth_years}/{10}")
    lines.append(f"    ROIC 5Y均: {_fmt(r.l4.roic_5y_mean)}% | SBC/Rev: {_fmt(r.l4.sbc_revenue_pct)}% | FCF转换: {_fmt(r.l4.fcf_conversion)}x")
    lines.append(f"    反周期: 2020={_fmt(r.l4.revenue_drop_2020)}% | 最大跌幅={_fmt(r.l4.max_revenue_drop_10y)}%")
    lines.append(f"    5Y股数变化: {_fmt(r.l4.shares_change_5y)}%")

    # L5 details
    lines.append(f"\n  L5 逆转拐点 [{r.l5.score:.1f}/10]")
    lines.append(f"    收入加速: {_fmt(r.l5.rev_acceleration)}")
    lines.append(f"    OPM反转: 近2Q={_fmt(r.l5.opm_recent_2q)}% vs 前4Q={_fmt(r.l5.opm_prior_4q)}% (Δ={_fmt(r.l5.opm_inflection)})")
    lines.append(f"    EPS修正: {_fmt(r.l5.eps_revision_3m_pct)}%")
    if r.l5.new_ceo_within_2y:
        lines.append(f"    🔄 新CEO(<2年)")
    lines.append("")

    return "\n".join(lines)


def _fmt(val):
    if val is None:
        return "N/A"
    return f"{val:.1f}"


def main():
    parser = argparse.ArgumentParser(description="低估股筛选器 v2.0")
    parser.add_argument("input", help="数据目录或单个JSON文件")
    parser.add_argument("--output", "-o", default="data/screener", help="输出目录")
    parser.add_argument("--top", "-t", type=int, default=20, help="显示前N只")
    parser.add_argument("--detail", "-d", action="store_true", help="显示详细信号卡片")
    parser.add_argument("--stage2", "-s2", action="store_true", help="运行Stage 2深筛(需要10Y+6Q数据)")
    args = parser.parse_args()

    input_path = Path(args.input)

    if input_path.is_file():
        data = load_stock_data(input_path)
        result = process_single(data, stage2=args.stage2)
        if args.stage2:
            print(format_stage2_card(result))
        else:
            print(format_signal_card(result))
        return

    if input_path.is_dir():
        results = process_batch(input_path, stage2=args.stage2)
        if not results:
            return

        if args.stage2:
            print(format_stage2_ranking(results))
            if args.detail:
                active = sorted(
                    [r for r in results if not r.vetoes and r.stage2_score],
                    key=lambda r: r.stage2_score or 0,
                    reverse=True
                )
                for r in active[:args.top]:
                    print(format_stage2_card(r))
        else:
            print(format_ranking_table(results))
            if args.detail:
                active = sorted(
                    [r for r in results if not r.vetoes],
                    key=lambda r: r.composite_score or 0,
                    reverse=True
                )
                for r in active[:args.top]:
                    print(format_signal_card(r))

        save_results(results, args.output, stage2=args.stage2)
        return

    print(f"Error: {input_path} is not a file or directory")
    sys.exit(1)


if __name__ == "__main__":
    main()
