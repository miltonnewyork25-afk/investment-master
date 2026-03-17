#!/usr/bin/env python3
"""
Fetch and inject Stage 2 data for screener.
This script reads temp JSON files from /tmp/stage2_data/ and merges them into raw screener files.

Expected temp file format: /tmp/stage2_data/{SYMBOL}_{KEY}.json
Each file contains the FMP API response (with "data" field).
"""
import json
import os
import glob
import sys

RAW_DIR = "/Users/milton/投资大师/data/screener/raw"
TEMP_DIR = "/tmp/stage2_data"

STAGE2_KEYS = [
    "income_10y",
    "ratios_10y",
    "income_quarterly",
    "ratios_quarterly",
    "key_metrics_10y",
    "cashflow_10y"
]

def inject_for_symbol(symbol):
    """Read all temp files for a symbol and inject into raw JSON."""
    raw_path = os.path.join(RAW_DIR, f"{symbol}.json")
    if not os.path.exists(raw_path):
        print(f"ERROR: {raw_path} not found")
        return False

    with open(raw_path) as f:
        existing = json.load(f)

    injected = []
    missing = []

    for key in STAGE2_KEYS:
        temp_path = os.path.join(TEMP_DIR, f"{symbol}_{key}.json")
        if os.path.exists(temp_path):
            with open(temp_path) as f:
                response = json.load(f)
            # FMP response has "data" field
            if isinstance(response, dict) and "data" in response:
                existing[key] = response["data"]
            elif isinstance(response, list):
                existing[key] = response
            else:
                existing[key] = response
            injected.append(key)
        else:
            existing[key] = []  # empty if not found
            missing.append(key)

    with open(raw_path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    status = f"OK: {len(injected)}/6 injected"
    if missing:
        status += f", missing: {', '.join(missing)}"
    print(f"{symbol}: {status}")
    return True

if __name__ == "__main__":
    symbols = sys.argv[1:] if len(sys.argv) > 1 else []
    if not symbols:
        # Process all symbols with temp files
        files = glob.glob(os.path.join(TEMP_DIR, "*.json"))
        symbols = list(set(os.path.basename(f).split("_")[0] for f in files))

    for sym in sorted(symbols):
        inject_for_symbol(sym)
