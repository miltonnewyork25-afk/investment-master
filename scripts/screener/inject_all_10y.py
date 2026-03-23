#!/usr/bin/env python3
"""
Master injection script for 10-year data.
Takes pairs of (symbol, key, json_string) from a JSONL file and injects them.
"""
import json
import sys
import os

RAW_DIR = "/Users/milton/投资大师/data/screener/raw"

def inject(symbol, key, data_list):
    raw_file = f"{RAW_DIR}/{symbol}.json"
    with open(raw_file, 'r') as f:
        existing = json.load(f)
    existing[key] = data_list
    with open(raw_file, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
    return len(data_list)

def process_mcp_file(filepath):
    """Process a file containing MCP responses in format:
    Each line: {"symbol": "X", "key": "income_10y", "data": [...]}
    """
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            entry = json.loads(line)
            sym = entry["symbol"]
            key = entry["key"]
            data = entry["data"]
            n = inject(sym, key, data)
            print(f"{sym}/{key}: {n} records")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: inject_all_10y.py <jsonl_file>")
        sys.exit(1)
    process_mcp_file(sys.argv[1])
