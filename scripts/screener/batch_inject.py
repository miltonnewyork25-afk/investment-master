#!/usr/bin/env python3
"""
Batch inject 10-year data into screener raw JSON files.
Reads MCP response JSONs from a temp directory and merges them into raw files.
"""
import json
import os
import sys
import glob

TEMP_DIR = "/tmp/screener_10y"
RAW_DIR = "/Users/milton/投资大师/data/screener/raw"

def inject_symbol(symbol):
    raw_file = os.path.join(RAW_DIR, f"{symbol}.json")
    if not os.path.exists(raw_file):
        print(f"SKIP: {raw_file} not found")
        return False

    with open(raw_file, 'r') as f:
        data = json.load(f)

    keys_to_inject = [
        "income_10y", "ratios_10y", "key_metrics_10y",
        "cashflow_10y", "income_quarterly", "ratios_quarterly"
    ]

    injected = 0
    for key in keys_to_inject:
        temp_file = os.path.join(TEMP_DIR, f"{symbol}_{key}.json")
        if os.path.exists(temp_file):
            with open(temp_file, 'r') as f:
                mcp_data = json.load(f)
            records = mcp_data.get("data", [])
            data[key] = records
            injected += 1
            print(f"  {key}: {len(records)} records")
        else:
            data[key] = []
            print(f"  {key}: MISSING -> empty list")

    with open(raw_file, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"OK: {symbol} - {injected}/6 datasets injected")
    return True

def main():
    symbols = sys.argv[1:] if len(sys.argv) > 1 else []
    if not symbols:
        print("Usage: batch_inject.py SYM1 SYM2 ...")
        sys.exit(1)

    for sym in symbols:
        print(f"\n=== {sym} ===")
        inject_symbol(sym)

if __name__ == "__main__":
    main()
