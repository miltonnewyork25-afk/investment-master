#!/usr/bin/env python3
"""
Monitor data collection progress
"""

import sqlite3
import sys
import time
from datetime import datetime

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"

def check_progress():
    """Check current data collection progress"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Get counts
        cursor.execute("SELECT COUNT(DISTINCT symbol) FROM companies")
        total_companies = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM data_quality WHERE has_profile=1 AND has_prices=1 AND has_financials=1 AND has_metrics=1")
        complete_companies = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM daily_prices")
        total_prices = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM risk_metrics WHERE sharpe_ratio IS NOT NULL")
        risk_calculated = cursor.fetchone()[0]

        # Latest update
        cursor.execute("SELECT MAX(last_updated) FROM companies")
        last_update = cursor.fetchone()[0]

        conn.close()

        print(f"\n{'='*60}")
        print(f" Data Collection Progress - {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*60}")
        print(f"Companies: {total_companies}")
        print(f"Complete Data: {complete_companies} ({complete_companies/max(total_companies,1)*100:.1f}%)")
        print(f"Price Records: {total_prices:,}")
        print(f"Risk Metrics: {risk_calculated}")
        print(f"Last Update: {last_update}")
        print(f"{'='*60}\n")

        return total_companies, complete_companies

    except Exception as e:
        print(f"Error: {e}")
        return 0, 0

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--watch":
        # Watch mode
        try:
            while True:
                check_progress()
                time.sleep(30)
        except KeyboardInterrupt:
            print("\nMonitoring stopped")
    else:
        check_progress()
