#!/usr/bin/env python3
"""
Re-fetch and update metrics from FMP API
"""

import sqlite3
import requests
import time
import logging

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb"
FMP_BASE_URL = "https://financialmodelingprep.com"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def fetch_metrics(symbol: str) -> dict:
    """Fetch metrics from FMP API"""
    url = f"{FMP_BASE_URL}/stable/key-metrics-ttm"
    params = {'symbol': symbol, 'apikey': FMP_API_KEY}

    try:
        time.sleep(0.02)  # Rate limiting
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data[0] if data else {}
    except Exception as e:
        logger.error(f"Error fetching {symbol}: {e}")
        return {}


def update_all_metrics():
    """Update metrics for all symbols"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get all symbols
    cursor.execute("SELECT symbol FROM companies")
    symbols = [row[0] for row in cursor.fetchall()]

    logger.info(f"Updating metrics for {len(symbols)} companies...")

    for i, symbol in enumerate(symbols):
        metrics = fetch_metrics(symbol)

        if not metrics:
            continue

        # Update with correct field mapping
        cursor.execute("""
        UPDATE metrics
        SET roe = ?,
            roa = ?,
            roic = ?,
            current_ratio = ?
        WHERE symbol = ?
        """, (
            metrics.get('returnOnEquityTTM'),
            metrics.get('returnOnAssetsTTM'),
            metrics.get('returnOnInvestedCapitalTTM'),
            metrics.get('currentRatioTTM'),
            symbol
        ))

        if (i + 1) % 50 == 0:
            conn.commit()
            logger.info(f"Updated {i+1}/{len(symbols)} companies")

    conn.commit()
    conn.close()
    logger.info("Metrics update complete")


if __name__ == "__main__":
    update_all_metrics()

    # Verify
    conn = sqlite3.connect(DB_PATH)
    import pandas as pd

    coverage = pd.read_sql("""
    SELECT
        COUNT(*) as total,
        SUM(CASE WHEN roe IS NOT NULL THEN 1 ELSE 0 END) as has_roe,
        SUM(CASE WHEN roa IS NOT NULL THEN 1 ELSE 0 END) as has_roa,
        SUM(CASE WHEN roic IS NOT NULL THEN 1 ELSE 0 END) as has_roic,
        SUM(CASE WHEN current_ratio IS NOT NULL THEN 1 ELSE 0 END) as has_current
    FROM metrics
    """, conn)

    print("\n" + "=" * 60)
    print(" Updated Metrics Coverage")
    print("=" * 60)
    print(f"Total: {coverage['total'][0]}")
    print(f"ROE: {coverage['has_roe'][0]} ({coverage['has_roe'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"ROA: {coverage['has_roa'][0]} ({coverage['has_roa'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"ROIC: {coverage['has_roic'][0]} ({coverage['has_roic'][0]/coverage['total'][0]*100:.1f}%)")
    print(f"Current Ratio: {coverage['has_current'][0]} ({coverage['has_current'][0]/coverage['total'][0]*100:.1f}%)")
    print("=" * 60 + "\n")

    # Sample
    sample = pd.read_sql("""
    SELECT symbol, roe, roa, roic, gross_margin, operating_margin, debt_to_equity
    FROM metrics
    WHERE symbol IN ('AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META')
    ORDER BY symbol
    """, conn)

    print("Sample (FAANG):")
    print(sample.to_string(index=False))
    print()

    conn.close()
