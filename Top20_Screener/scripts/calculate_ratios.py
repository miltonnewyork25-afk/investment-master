#!/usr/bin/env python3
"""
Calculate financial ratios from raw financial statement data
"""

import sqlite3
import pandas as pd
import logging

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def calculate_margins_and_ratios():
    """Calculate margins and financial ratios from raw data"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get all symbols with financial data
    symbols_df = pd.read_sql("""
    SELECT DISTINCT f.symbol
    FROM financials_ttm f
    INNER JOIN metrics m ON f.symbol = m.symbol
    """, conn)

    logger.info(f"Calculating ratios for {len(symbols_df)} companies...")

    updated_count = 0

    for symbol in symbols_df['symbol']:
        # Get financial data
        fin = pd.read_sql(f"""
        SELECT * FROM financials_ttm WHERE symbol = '{symbol}'
        """, conn)

        if fin.empty:
            continue

        fin = fin.iloc[0]

        # Calculate margins
        revenue = fin['revenue']
        gross_profit = fin['gross_profit']
        operating_income = fin['operating_income']
        net_income = fin['net_income']

        gross_margin = gross_profit / revenue if revenue and revenue != 0 else None
        operating_margin = operating_income / revenue if revenue and revenue != 0 else None
        net_margin = net_income / revenue if revenue and revenue != 0 else None

        # Calculate debt ratios
        total_debt = fin['total_debt'] or 0
        total_equity = fin['total_equity']
        debt_to_equity = total_debt / total_equity if total_equity and total_equity != 0 else None

        # Calculate quick ratio
        current_assets = fin['cash_and_equivalents'] or 0
        accounts_receivable = fin['accounts_receivable'] or 0
        inventory = fin['inventory'] or 0
        current_liabilities = fin['total_liabilities']

        # Approximate current assets as cash + AR + inventory (simplified)
        quick_assets = (current_assets or 0) + (accounts_receivable or 0)

        # For quick ratio, we need current liabilities
        # Approximate as total_liabilities for now (conservative)
        quick_ratio = None  # Would need proper current liabilities data

        # Update metrics table
        cursor.execute("""
        UPDATE metrics
        SET gross_margin = ?,
            operating_margin = ?,
            net_margin = ?,
            debt_to_equity = ?
        WHERE symbol = ?
        """, (gross_margin, operating_margin, net_margin, debt_to_equity, symbol))

        updated_count += 1

        if updated_count % 100 == 0:
            logger.info(f"Updated {updated_count} companies...")

    conn.commit()
    conn.close()

    logger.info(f"Calculation complete. Updated {updated_count} companies.")


def verify_calculations():
    """Verify calculated ratios"""
    conn = sqlite3.connect(DB_PATH)

    # Check coverage
    coverage = pd.read_sql("""
    SELECT
        COUNT(*) as total,
        SUM(CASE WHEN roe IS NOT NULL THEN 1 ELSE 0 END) as has_roe,
        SUM(CASE WHEN gross_margin IS NOT NULL THEN 1 ELSE 0 END) as has_gross_margin,
        SUM(CASE WHEN operating_margin IS NOT NULL THEN 1 ELSE 0 END) as has_op_margin,
        SUM(CASE WHEN net_margin IS NOT NULL THEN 1 ELSE 0 END) as has_net_margin,
        SUM(CASE WHEN debt_to_equity IS NOT NULL THEN 1 ELSE 0 END) as has_dte,
        SUM(CASE WHEN current_ratio IS NOT NULL THEN 1 ELSE 0 END) as has_current_ratio
    FROM metrics
    """, conn)

    print("\n" + "=" * 60)
    print(" Metrics Coverage After Calculation")
    print("=" * 60)
    print(f"Total Companies: {coverage['total'][0]}")
    print(f"ROE: {coverage['has_roe'][0]} ({coverage['has_roe'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Gross Margin: {coverage['has_gross_margin'][0]} ({coverage['has_gross_margin'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Operating Margin: {coverage['has_op_margin'][0]} ({coverage['has_op_margin'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Net Margin: {coverage['has_net_margin'][0]} ({coverage['has_net_margin'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Debt/Equity: {coverage['has_dte'][0]} ({coverage['has_dte'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Current Ratio: {coverage['has_current_ratio'][0]} ({coverage['has_current_ratio'][0]/coverage['total'][0]*100:.1f}%)")
    print("=" * 60 + "\n")

    # Sample some companies
    sample = pd.read_sql("""
    SELECT symbol, roe, gross_margin, operating_margin, net_margin, debt_to_equity, current_ratio
    FROM metrics
    WHERE roe IS NOT NULL AND gross_margin IS NOT NULL
    LIMIT 10
    """, conn)

    print("Sample Companies:")
    print(sample.to_string(index=False))
    print()

    conn.close()


if __name__ == "__main__":
    calculate_margins_and_ratios()
    verify_calculations()
