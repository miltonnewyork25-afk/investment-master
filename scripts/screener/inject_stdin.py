#!/usr/bin/env python3
"""Inject stage2 data from stdin JSON into raw screener file."""
import json, sys

data = json.load(sys.stdin)
symbol = data["symbol"]
datasets = data["datasets"]  # {key_name: [list of records]}

path = f"data/screener/raw/{symbol}.json"
with open(path) as f:
    existing = json.load(f)

for key, records in datasets.items():
    existing[key] = records

with open(path, 'w') as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

injected = list(datasets.keys())
print(f"{symbol}: injected {len(injected)} keys: {', '.join(injected)}")
