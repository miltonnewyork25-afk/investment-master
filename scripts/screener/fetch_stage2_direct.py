#!/usr/bin/env python3
"""
Directly fetch Stage 2 historical data from FMP API and inject into raw screener JSON files.
Usage: python3 fetch_stage2_direct.py [SYMBOL1] [SYMBOL2] ...
If no symbols given, processes all 15 Stage 2 stocks.
"""
import json
import os
import sys
import time
import urllib.request
import urllib.error

API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb"
BASE_URL = "https://financialmodelingprep.com/stable"
RAW_DIR = "/Users/milton/投资大师/data/screener/raw"

# Mapping of data key -> (endpoint_path, limit, period)
DATASETS = {
    "income_10y":       ("income-statement", 12, "annual"),
    "ratios_10y":       ("ratios", 12, "annual"),
    "income_quarterly": ("income-statement", 8, "quarter"),
    "ratios_quarterly": ("ratios", 8, "quarter"),
    "key_metrics_10y":  ("key-metrics", 12, "annual"),
    "cashflow_10y":     ("cash-flow-statement", 12, "annual"),
}

def fetch_fmp(endpoint, symbol, limit, period):
    """Fetch data from FMP API."""
    url = f"{BASE_URL}/{endpoint}?symbol={symbol}&limit={limit}&period={period}&apikey={API_KEY}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "InvestmentMaster/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        if isinstance(data, list):
            return data
        elif isinstance(data, dict) and "data" in data:
            return data["data"]
        return data
    except Exception as e:
        print(f"  WARNING: Failed to fetch {endpoint} for {symbol}: {e}")
        return []

def process_symbol(symbol):
    """Fetch all 6 datasets for a symbol and inject into raw JSON."""
    raw_path = os.path.join(RAW_DIR, f"{symbol}.json")
    if not os.path.exists(raw_path):
        print(f"  ERROR: {raw_path} not found, skipping")
        return False

    with open(raw_path) as f:
        existing = json.load(f)

    results = {}
    for key, (endpoint, limit, period) in DATASETS.items():
        data = fetch_fmp(endpoint, symbol, limit, period)
        record_count = len(data) if isinstance(data, list) else 0
        results[key] = (data, record_count)
        existing[key] = data
        # Small delay to avoid rate limiting
        time.sleep(0.3)

    with open(raw_path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    # Report
    summary = []
    for key, (_, count) in results.items():
        status = f"{count}" if count > 0 else "EMPTY"
        summary.append(f"{key}={status}")
    print(f"  {symbol}: {', '.join(summary)}")
    return True

def main():
    all_symbols = ['HPQ', 'MO', 'GM', 'NKE', 'QCOM', 'BABA', 'CI', 'EBAY',
                   'PYPL', 'VRSN', 'CMCSA', 'BMY', 'GILD', 'TEVA', 'DIS']

    symbols = sys.argv[1:] if len(sys.argv) > 1 else all_symbols

    print(f"Processing {len(symbols)} symbols, 6 datasets each...")
    print(f"Total API calls: {len(symbols) * 6}")
    print()

    success = 0
    failed = 0

    for i, sym in enumerate(symbols):
        batch_num = i // 3 + 1
        print(f"[Batch {batch_num}] {sym} ({i+1}/{len(symbols)}):")
        if process_symbol(sym):
            success += 1
        else:
            failed += 1

        # Pause between symbols to avoid rate limiting
        if i < len(symbols) - 1:
            time.sleep(0.5)

    print(f"\nDone: {success} success, {failed} failed")

    # Verify
    print("\nVerification:")
    for sym in symbols:
        raw_path = os.path.join(RAW_DIR, f"{sym}.json")
        if os.path.exists(raw_path):
            with open(raw_path) as f:
                d = json.load(f)
            stage2_keys = [k for k in DATASETS.keys() if k in d]
            nonempty = sum(1 for k in stage2_keys if isinstance(d.get(k), list) and len(d[k]) > 0)
            print(f"  {sym}: {nonempty}/6 datasets with data")

if __name__ == "__main__":
    main()
