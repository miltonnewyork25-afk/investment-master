#!/usr/bin/env python3
"""
Top 20 Stock Screener - Version 2 with relaxed criteria
"""

import sqlite3
import pandas as pd
import numpy as np
import logging

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"
OUTPUT_PATH = "/Users/milton/投资大师/Top20_Screener/data/top20_results.csv"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def run_screen():
    """Run stock screening with relaxed criteria"""
    conn = sqlite3.connect(DB_PATH)

    logger.info("="*60)
    logger.info("Top 20 Stock Screener - Starting")
    logger.info("="*60)

    # Step 1: Initial universe with basic filters
    query = """
    SELECT
        c.symbol,
        c.name,
        c.sector,
        c.industry,
        c.market_cap,
        c.beta,

        -- Risk metrics
        r.sharpe_ratio,
        r.sortino_ratio,
        r.max_drawdown,
        r.volatility,
        r.beta_sp500,
        r.avg_daily_volume,

        -- Profitability
        m.roe,
        m.roa,
        m.roic,
        m.gross_margin,
        m.operating_margin,
        m.net_margin,

        -- Valuation
        m.pe_ratio,
        m.pb_ratio,
        m.pfcf_ratio,
        m.peg_ratio,
        m.ev_ebitda,
        m.dividend_yield,

        -- Financial health
        m.debt_to_equity,
        m.current_ratio,

        -- Financials
        f.revenue,
        f.net_income,
        f.operating_cash_flow,
        f.free_cash_flow

    FROM companies c
    INNER JOIN risk_metrics r ON c.symbol = r.symbol
    INNER JOIN metrics m ON c.symbol = m.symbol
    INNER JOIN financials_ttm f ON c.symbol = f.symbol
    WHERE
        c.market_cap >= 1e9  -- Min $1B market cap
        AND r.avg_daily_volume >= 5e6  -- Min $5M daily volume
        AND r.sharpe_ratio IS NOT NULL
        AND f.net_income > 0  -- Profitable
        AND f.operating_cash_flow > 0  -- Positive cash flow
    """

    df = pd.read_sql(query, conn)
    logger.info(f"Initial universe: {len(df)} stocks")

    if df.empty:
        logger.error("No stocks in initial universe")
        conn.close()
        return pd.DataFrame()

    # Step 2: Quality filters
    initial = len(df)

    # Cash flow quality
    df['ocf_to_ni'] = df['operating_cash_flow'] / df['net_income']
    df = df[df['ocf_to_ni'] >= 0.5]  # Relaxed from 0.7
    logger.info(f"After OCF/NI filter: {len(df)} ({initial-len(df)} removed)")

    # Positive Sharpe
    df = df[df['sharpe_ratio'] > 0]
    logger.info(f"After Sharpe > 0: {len(df)}")

    # Max drawdown (not catastrophic)
    df = df[df['max_drawdown'] > -0.70]  # Relaxed from -0.60
    logger.info(f"After max DD filter: {len(df)}")

    # Volatility (not extreme)
    df = df[df['volatility'] < 0.70]  # Relaxed from 0.60
    logger.info(f"After volatility filter: {len(df)}")

    # Step 3: Profitability filters (optional - use what's available)
    # Only apply if data exists
    if df['roe'].notna().sum() > 20:
        df = df[(df['roe'] > 0.05) | df['roe'].isna()]  # ROE > 5% or missing
        logger.info(f"After ROE filter: {len(df)}")

    if df['operating_margin'].notna().sum() > 20:
        df = df[df['operating_margin'] > 0]  # Positive margin
        logger.info(f"After op margin filter: {len(df)}")

    # Step 4: Debt filter (relaxed for financials/REITs)
    financial_sectors = ['Financial Services', 'Real Estate']
    non_financial = df[~df['sector'].isin(financial_sectors)]
    financial = df[df['sector'].isin(financial_sectors)]

    if not non_financial.empty and non_financial['debt_to_equity'].notna().sum() > 0:
        non_financial = non_financial[(non_financial['debt_to_equity'] < 3.0) | non_financial['debt_to_equity'].isna()]

    df = pd.concat([non_financial, financial])
    logger.info(f"After debt filter: {len(df)}")

    if df.empty:
        logger.warning("No stocks passed filters")
        conn.close()
        return df

    # Step 5: Calculate composite score
    logger.info("\nCalculating composite scores...")

    def normalize(series: pd.Series, inverse: bool = False, clip_percentile: bool = True):
        """Normalize to 0-100"""
        series = series.copy()

        if inverse:
            series = 1 / series.replace(0, np.nan)

        if clip_percentile:
            series = series.clip(series.quantile(0.05), series.quantile(0.95))

        min_val = series.min()
        max_val = series.max()

        if min_val == max_val:
            return pd.Series(50, index=series.index)

        normalized = ((series - min_val) / (max_val - min_val)) * 100
        return normalized.fillna(50)  # Neutral score for missing

    # Component scores
    df['score_sharpe'] = normalize(df['sharpe_ratio'])
    df['score_sortino'] = normalize(df['sortino_ratio'])
    df['score_roe'] = normalize(df['roe'])
    df['score_roic'] = normalize(df['roic'])
    df['score_margin'] = normalize(df['operating_margin'])
    df['score_valuation'] = normalize(df['pe_ratio'], inverse=True)

    # Financial strength
    df['score_financial'] = (
        normalize(df['current_ratio']) * 0.4 +
        normalize(df['ocf_to_ni']) * 0.3 +
        normalize(1 / (df['debt_to_equity'] + 0.01)) * 0.3
    )

    # Composite score with weights
    df['composite_score'] = (
        df['score_sharpe'] * 0.30 +      # Risk-adjusted return
        df['score_sortino'] * 0.15 +     # Downside protection
        df['score_roe'] * 0.15 +         # Profitability
        df['score_margin'] * 0.10 +      # Operating efficiency
        df['score_valuation'] * 0.15 +   # Value
        df['score_financial'] * 0.15     # Financial health
    )

    # Step 6: Get top 20
    df = df.sort_values('composite_score', ascending=False)
    top20 = df.head(20)

    logger.info(f"\nSelected top 20 stocks")
    logger.info("="*60)

    conn.close()
    return top20


def export_and_report(df: pd.DataFrame):
    """Export results and generate report"""
    if df.empty:
        print("No stocks selected")
        return

    # Export
    export_cols = [
        'symbol', 'name', 'sector', 'industry',
        'market_cap', 'composite_score',
        'sharpe_ratio', 'sortino_ratio', 'max_drawdown', 'volatility',
        'roe', 'roic', 'operating_margin', 'net_margin',
        'pe_ratio', 'pb_ratio', 'peg_ratio',
        'debt_to_equity', 'current_ratio',
        'dividend_yield'
    ]

    export_df = df[export_cols].copy()
    export_df.to_csv(OUTPUT_PATH, index=False)
    logger.info(f"Results saved to {OUTPUT_PATH}")

    # Report
    report = []
    report.append("\n" + "=" * 80)
    report.append(" TOP 20 STOCK SCREENING RESULTS")
    report.append("=" * 80 + "\n")

    # Summary stats
    report.append("## Summary Statistics\n")
    report.append(f"Total Selected: 20 stocks")
    report.append(f"Average Market Cap: ${df['market_cap'].mean()/1e9:.2f}B")
    report.append(f"Average Sharpe Ratio: {df['sharpe_ratio'].mean():.3f}")
    report.append(f"Average ROE: {df['roe'].mean():.2%}" if df['roe'].notna().any() else "Average ROE: N/A")
    report.append(f"Average Composite Score: {df['composite_score'].mean():.1f}\n")

    # Sector breakdown
    report.append("## Sector Distribution\n")
    for sector, count in df['sector'].value_counts().items():
        report.append(f"  {sector}: {count}")
    report.append("")

    # Top 10
    report.append("## Top 10 by Composite Score\n")
    report.append(f"{'Rank':<5} {'Symbol':<8} {'Name':<25} {'Score':<8} {'Sharpe':<8} {'Sector':<20}")
    report.append("-" * 80)

    for i, row in enumerate(df.head(10).itertuples(), 1):
        name = row.name[:23] if len(row.name) > 23 else row.name
        sector = row.sector[:18] if len(row.sector) > 18 else row.sector
        report.append(
            f"{i:<5} {row.symbol:<8} {name:<25} "
            f"{row.composite_score:>6.1f}  {row.sharpe_ratio:>6.2f}  {sector:<20}"
        )

    report.append("\n")

    # Best performers
    report.append("## Best Risk-Adjusted Returns\n")
    best_sharpe = df.nlargest(5, 'sharpe_ratio')
    for row in best_sharpe.itertuples():
        report.append(
            f"  {row.symbol} - {row.name[:30]}\n"
            f"    Sharpe: {row.sharpe_ratio:.3f}, Volatility: {row.volatility:.2%}, "
            f"Max DD: {row.max_drawdown:.2%}"
        )
    report.append("")

    # Best value
    if df['pe_ratio'].notna().sum() > 0:
        report.append("## Best Value (P/E)\n")
        best_value = df[df['pe_ratio'] > 0].nsmallest(5, 'pe_ratio')
        for row in best_value.itertuples():
            roe_str = f"{row.roe:.2%}" if pd.notna(row.roe) else "N/A"
            report.append(
                f"  {row.symbol}: P/E {row.pe_ratio:.1f}, ROE {roe_str}, Sharpe {row.sharpe_ratio:.3f}"
            )
        report.append("")

    # Full list
    report.append("## Complete Top 20 List\n")
    for i, row in enumerate(df.itertuples(), 1):
        roe_str = f"ROE {row.roe:.1%}" if pd.notna(row.roe) else "ROE N/A"
        pe_str = f"P/E {row.pe_ratio:.1f}" if pd.notna(row.pe_ratio) else "P/E N/A"

        report.append(
            f"{i:2d}. {row.symbol:<6} - {row.name[:35]:<35}\n"
            f"    Score: {row.composite_score:.1f}, Sharpe: {row.sharpe_ratio:.3f}, "
            f"{roe_str}, {pe_str}\n"
            f"    Sector: {row.sector}, MCap: ${row.market_cap/1e9:.1f}B"
        )
    report.append("")

    report.append("=" * 80 + "\n")

    report_text = "\n".join(report)
    print(report_text)

    # Save report
    summary_path = OUTPUT_PATH.replace('.csv', '_summary.txt')
    with open(summary_path, 'w') as f:
        f.write(report_text)
    logger.info(f"Summary saved to {summary_path}")


if __name__ == "__main__":
    results = run_screen()
    export_and_report(results)
