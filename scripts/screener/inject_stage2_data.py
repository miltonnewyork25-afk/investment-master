#!/usr/bin/env python3
"""
Inject Stage 2 historical data into screener raw JSON files.
Usage: python3 inject_stage2_data.py <symbol> <data_key> <json_file>
  where json_file contains the FMP response data to inject.
"""
import json
import sys
import os

def inject_data(symbol, data_key, data):
    """Inject data into existing raw JSON file."""
    raw_path = f"/Users/milton/投资大师/data/screener/raw/{symbol}.json"

    if not os.path.exists(raw_path):
        print(f"ERROR: {raw_path} not found")
        return False

    with open(raw_path, 'r') as f:
        existing = json.load(f)

    existing[data_key] = data

    with open(raw_path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    return True

def inject_batch(symbol, datasets):
    """Inject multiple datasets for a symbol.
    datasets: dict of {key_name: fmp_response_data}
    """
    raw_path = f"/Users/milton/投资大师/data/screener/raw/{symbol}.json"

    if not os.path.exists(raw_path):
        print(f"ERROR: {raw_path} not found")
        return False

    with open(raw_path, 'r') as f:
        existing = json.load(f)

    for key, data in datasets.items():
        existing[key] = data

    with open(raw_path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    count = len(datasets)
    print(f"OK: {symbol} - injected {count} datasets: {', '.join(datasets.keys())}")
    return True

if __name__ == "__main__":
    # Used as a library, not directly
    pass
