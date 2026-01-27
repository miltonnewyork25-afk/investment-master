#!/usr/bin/env python3
"""
Master Data Integrator
======================
Integrates all data sources into a single master dataset for Top20 screening.

This script:
1. Loads fundamental metrics from database
2. Loads Sharpe calculations
3. Loads tail risk metrics
4. Merges into master_dataset.csv with 50+ fields
5. Generates data quality report

Output: /Users/milton/投资大师/Top20_Screener/data/processed/master_dataset.csv

Version: 1.0
Date: 2026-01-26
"""

import pandas as pd
import numpy as np
import sqlite3
from datetime import datetime
import os
import json
import logging

# Configuration
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
DB_PATH = f"{BASE_DIR}/data/market_data.db"
PROCESSED_DIR = f"{BASE_DIR}/data/processed"
OUTPUT_PATH = f"{PROCESSED_DIR}/master_dataset.csv"
LOG_PATH = f"{BASE_DIR}/data/master_integrator.log"

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_PATH),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


def load_company_data() -> pd.DataFrame:
    """Load basic company information from database"""
    conn = sqlite3.connect(DB_PATH)

    query = """
    SELECT
        c.symbol,
        c.name as company_name,
        c.sector,
        c.industry,
        c.market_cap,
        c.beta,
        c.exchange,
        c.last_updated as company_last_updated
    FROM companies c
    """

    df = pd.read_sql(query, conn)
    conn.close()

    logger.info(f"Loaded {len(df)} companies from database")
    return df


def load_financial_metrics() -> pd.DataFrame:
    """Load financial metrics from database"""
    conn = sqlite3.connect(DB_PATH)

    query = """
    SELECT
        m.symbol,
        m.pe_ratio,
        m.pb_ratio,
        m.ps_ratio,
        m.pfcf_ratio as price_to_fcf,
        m.peg_ratio,
        m.ev_ebitda,
        m.dividend_yield,
        m.roe,
        m.roa,
        m.roic,
        m.gross_margin,
        m.operating_margin,
        m.net_margin,
        m.debt_to_equity,
        m.current_ratio,
        m.quick_ratio,
        m.last_updated as metrics_last_updated
    FROM metrics m
    """

    df = pd.read_sql(query, conn)
    conn.close()

    logger.info(f"Loaded financial metrics for {len(df)} symbols")
    return df


def load_financial_statements() -> pd.DataFrame:
    """Load TTM financial statement data"""
    conn = sqlite3.connect(DB_PATH)

    query = """
    SELECT
        f.symbol,
        f.revenue,
        f.gross_profit,
        f.operating_income,
        f.net_income,
        f.ebitda,
        f.operating_cash_flow as ocf_ttm,
        f.free_cash_flow as fcf_ttm,
        f.capex,
        f.total_assets,
        f.total_liabilities,
        f.total_equity,
        f.total_debt,
        f.cash_and_equivalents,
        f.shares_outstanding
    FROM financials_ttm f
    """

    df = pd.read_sql(query, conn)
    conn.close()

    # Calculate derived metrics
    if len(df) > 0:
        # OCF to Net Income ratio (cash flow quality)
        df['ocf_to_net_income'] = np.where(
            df['net_income'] != 0,
            df['ocf_ttm'] / df['net_income'],
            np.nan
        )

        # FCF yield (if market cap available)
        # Will be calculated in merge step

        # FCF margin
        df['fcf_margin'] = np.where(
            df['revenue'] != 0,
            df['fcf_ttm'] / df['revenue'],
            np.nan
        )

        # EBITDA margin
        df['ebitda_margin'] = np.where(
            df['revenue'] != 0,
            df['ebitda'] / df['revenue'],
            np.nan
        )

        # Net debt
        df['net_debt'] = df['total_debt'] - df['cash_and_equivalents']

    logger.info(f"Loaded financial statements for {len(df)} symbols")
    return df


def load_risk_metrics() -> pd.DataFrame:
    """Load risk metrics from database"""
    conn = sqlite3.connect(DB_PATH)

    query = """
    SELECT
        r.symbol,
        r.sharpe_ratio as sharpe_from_db,
        r.sortino_ratio as sortino_from_db,
        r.max_drawdown as max_drawdown_from_db,
        r.volatility as volatility_from_db,
        r.beta_sp500 as beta_from_db,
        r.avg_daily_volume,
        r.calculation_date as risk_calculation_date
    FROM risk_metrics r
    """

    df = pd.read_sql(query, conn)
    conn.close()

    logger.info(f"Loaded risk metrics for {len(df)} symbols")
    return df


def load_price_summary() -> pd.DataFrame:
    """Calculate price summary statistics from daily prices"""
    conn = sqlite3.connect(DB_PATH)

    query = """
    SELECT
        symbol,
        MAX(adj_close) as price_52w_high,
        MIN(adj_close) as price_52w_low,
        AVG(volume) as avg_volume_1y,
        COUNT(*) as price_data_days
    FROM daily_prices
    WHERE date >= date('now', '-1 year')
    GROUP BY symbol
    """

    df = pd.read_sql(query, conn)

    # Get latest price
    latest_query = """
    SELECT symbol, adj_close as current_price, date as latest_price_date
    FROM daily_prices
    WHERE (symbol, date) IN (
        SELECT symbol, MAX(date)
        FROM daily_prices
        GROUP BY symbol
    )
    """

    latest_df = pd.read_sql(latest_query, conn)
    conn.close()

    df = df.merge(latest_df, on='symbol', how='left')

    # Calculate price metrics
    df['price_vs_52w_high'] = df['current_price'] / df['price_52w_high']
    df['price_vs_52w_low'] = df['current_price'] / df['price_52w_low']

    logger.info(f"Loaded price summary for {len(df)} symbols")
    return df


def load_sharpe_calculations() -> pd.DataFrame:
    """Load Sharpe calculations if CSV exists"""
    sharpe_path = f"{PROCESSED_DIR}/sharpe_calculations.csv"

    if os.path.exists(sharpe_path):
        df = pd.read_csv(sharpe_path)
        logger.info(f"Loaded Sharpe calculations for {len(df)} symbols")
        return df
    else:
        logger.warning("Sharpe calculations CSV not found")
        return pd.DataFrame()


def load_tail_risk_metrics() -> pd.DataFrame:
    """Load tail risk metrics if CSV exists"""
    risk_path = f"{PROCESSED_DIR}/tail_risk_metrics.csv"

    if os.path.exists(risk_path):
        df = pd.read_csv(risk_path)
        logger.info(f"Loaded tail risk metrics for {len(df)} symbols")
        return df
    else:
        logger.warning("Tail risk metrics CSV not found")
        return pd.DataFrame()


def integrate_all_data() -> pd.DataFrame:
    """Integrate all data sources into master dataset"""
    logger.info("=" * 60)
    logger.info("INTEGRATING DATA SOURCES")
    logger.info("=" * 60)

    # Load all data sources
    companies_df = load_company_data()
    metrics_df = load_financial_metrics()
    financials_df = load_financial_statements()
    risk_db_df = load_risk_metrics()
    price_df = load_price_summary()
    sharpe_df = load_sharpe_calculations()
    tail_risk_df = load_tail_risk_metrics()

    # Start with companies as base
    master_df = companies_df.copy()

    # Merge financial metrics
    if len(metrics_df) > 0:
        master_df = master_df.merge(metrics_df, on='symbol', how='left')

    # Merge financial statements
    if len(financials_df) > 0:
        master_df = master_df.merge(financials_df, on='symbol', how='left')

    # Merge risk metrics from database
    if len(risk_db_df) > 0:
        master_df = master_df.merge(risk_db_df, on='symbol', how='left')

    # Merge price summary
    if len(price_df) > 0:
        master_df = master_df.merge(price_df, on='symbol', how='left')

    # Merge Sharpe calculations (overwrite db values if newer)
    if len(sharpe_df) > 0:
        sharpe_cols = ['symbol', 'sharpe_1y', 'sharpe_3y', 'sharpe_5y',
                       'return_3y', 'volatility_3y', 'risk_free_rate']
        sharpe_subset = sharpe_df[[c for c in sharpe_cols if c in sharpe_df.columns]]
        master_df = master_df.merge(sharpe_subset, on='symbol', how='left')

    # Merge tail risk metrics
    if len(tail_risk_df) > 0:
        risk_cols = ['symbol', 'max_drawdown_3y', 'max_drawdown_5y',
                     'sortino_ratio', 'calmar_ratio', 'var_95_daily', 'cvar_95_daily',
                     'upside_capture', 'downside_capture', 'meets_mdd_threshold']
        risk_subset = tail_risk_df[[c for c in risk_cols if c in tail_risk_df.columns]]
        master_df = master_df.merge(risk_subset, on='symbol', how='left')

    # Calculate additional derived metrics
    if 'fcf_ttm' in master_df.columns and 'market_cap' in master_df.columns:
        master_df['fcf_yield'] = np.where(
            master_df['market_cap'] > 0,
            master_df['fcf_ttm'] / master_df['market_cap'],
            np.nan
        )

    if 'net_debt' in master_df.columns and 'ebitda' in master_df.columns:
        master_df['net_debt_to_ebitda'] = np.where(
            master_df['ebitda'] > 0,
            master_df['net_debt'] / master_df['ebitda'],
            np.nan
        )

    # Calculate enterprise value
    if 'market_cap' in master_df.columns and 'net_debt' in master_df.columns:
        master_df['enterprise_value'] = master_df['market_cap'] + master_df['net_debt']

        if 'fcf_ttm' in master_df.columns:
            master_df['ev_fcf'] = np.where(
                master_df['fcf_ttm'] > 0,
                master_df['enterprise_value'] / master_df['fcf_ttm'],
                np.nan
            )

    # Calculate dollar volume
    if 'avg_volume_1y' in master_df.columns and 'current_price' in master_df.columns:
        master_df['avg_dollar_volume'] = master_df['avg_volume_1y'] * master_df['current_price']

    # Add data quality score
    key_fields = ['pe_ratio', 'gross_margin', 'fcf_ttm', 'sharpe_3y', 'max_drawdown_3y']
    master_df['data_completeness'] = master_df[
        [c for c in key_fields if c in master_df.columns]
    ].notna().sum(axis=1) / len(key_fields)

    # Add generation timestamp
    master_df['dataset_generated'] = datetime.now().isoformat()

    logger.info(f"Master dataset: {len(master_df)} rows, {len(master_df.columns)} columns")

    return master_df


def generate_quality_report(df: pd.DataFrame) -> str:
    """Generate comprehensive data quality report"""
    report = []
    report.append("# Master Dataset Quality Report")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    report.append("## Overview\n")
    report.append(f"- Total Stocks: {len(df)}")
    report.append(f"- Total Fields: {len(df.columns)}")

    report.append("\n## Field Coverage\n")
    report.append("| Field | Non-Null | Coverage |")
    report.append("|-------|----------|----------|")

    coverage_data = []
    for col in sorted(df.columns):
        non_null = df[col].notna().sum()
        coverage = non_null / len(df) * 100
        coverage_data.append((col, non_null, coverage))

    # Sort by coverage ascending (show worst first)
    coverage_data.sort(key=lambda x: x[2])

    for col, non_null, coverage in coverage_data[:30]:  # Show worst 30
        report.append(f"| {col} | {non_null} | {coverage:.1f}% |")

    report.append("\n## Sector Distribution\n")
    if 'sector' in df.columns:
        sector_dist = df['sector'].value_counts()
        for sector, count in sector_dist.items():
            report.append(f"- {sector}: {count} ({count/len(df)*100:.1f}%)")

    report.append("\n## Key Statistics\n")

    stats_fields = {
        'market_cap': 'Market Cap',
        'pe_ratio': 'P/E Ratio',
        'sharpe_3y': 'Sharpe 3Y',
        'max_drawdown_3y': 'Max Drawdown 3Y',
        'roe': 'ROE',
        'fcf_yield': 'FCF Yield'
    }

    report.append("| Metric | Mean | Median | Min | Max |")
    report.append("|--------|------|--------|-----|-----|")

    for field, name in stats_fields.items():
        if field in df.columns:
            s = df[field].dropna()
            if len(s) > 0:
                if 'cap' in field.lower():
                    report.append(
                        f"| {name} | ${s.mean()/1e9:.1f}B | ${s.median()/1e9:.1f}B | "
                        f"${s.min()/1e9:.1f}B | ${s.max()/1e9:.1f}B |"
                    )
                else:
                    report.append(
                        f"| {name} | {s.mean():.3f} | {s.median():.3f} | "
                        f"{s.min():.3f} | {s.max():.3f} |"
                    )

    report.append("\n## Data Sources\n")
    report.append("1. **Company Data**: FMP API - company profile endpoint")
    report.append("2. **Financial Metrics**: FMP API - key-metrics-ttm, ratios-ttm")
    report.append("3. **Financial Statements**: FMP API - income/balance/cash-flow TTM")
    report.append("4. **Price Data**: FMP API - historical-price-full")
    report.append("5. **Risk Metrics**: Calculated from price history")
    report.append("6. **Sharpe Ratios**: Calculated per methodology doc")

    report.append("\n## Calculation Methodology References\n")
    report.append("- Sharpe Ratio: See `/data/scripts/sharpe_calculator.py`")
    report.append("- Tail Risk: See `/data/scripts/risk_calculator.py`")
    report.append("- Methodology Doc: See `/data/sharpe_calculation_methodology.md`")

    return "\n".join(report)


def save_master_dataset(df: pd.DataFrame):
    """Save master dataset and quality report"""
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    # Save main CSV
    df.to_csv(OUTPUT_PATH, index=False)
    logger.info(f"Saved: {OUTPUT_PATH}")

    # Save timestamped backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = f"{PROCESSED_DIR}/master_dataset_{timestamp}.csv"
    df.to_csv(backup_path, index=False)

    # Generate and save quality report
    report = generate_quality_report(df)
    report_path = f"{PROCESSED_DIR}/master_dataset_quality_report.md"
    with open(report_path, 'w') as f:
        f.write(report)
    logger.info(f"Saved: {report_path}")

    # Save summary JSON
    summary = {
        'generated_at': datetime.now().isoformat(),
        'total_stocks': len(df),
        'total_fields': len(df.columns),
        'fields': list(df.columns),
        'sector_distribution': df['sector'].value_counts().to_dict() if 'sector' in df.columns else {},
        'data_completeness': {
            'mean': df['data_completeness'].mean() if 'data_completeness' in df.columns else None,
            'complete_100pct': int((df['data_completeness'] >= 1.0).sum()) if 'data_completeness' in df.columns else 0
        }
    }

    summary_path = f"{PROCESSED_DIR}/master_dataset_summary.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    logger.info(f"Saved: {summary_path}")


def main():
    """Main execution"""
    logger.info("=" * 60)
    logger.info("MASTER DATA INTEGRATOR")
    logger.info("=" * 60)

    # Integrate all data
    master_df = integrate_all_data()

    # Save results
    save_master_dataset(master_df)

    # Display summary
    logger.info("\n" + "=" * 60)
    logger.info("SUMMARY")
    logger.info("=" * 60)
    logger.info(f"Total Stocks: {len(master_df)}")
    logger.info(f"Total Fields: {len(master_df.columns)}")

    # Show field list
    logger.info("\nFields in master dataset:")
    for i, col in enumerate(sorted(master_df.columns)):
        coverage = master_df[col].notna().sum() / len(master_df) * 100
        logger.info(f"  {i+1:2d}. {col}: {coverage:.0f}%")

    logger.info("\nMaster data integration completed!")

    return master_df


if __name__ == "__main__":
    main()
