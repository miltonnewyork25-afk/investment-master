#!/usr/bin/env python3
"""
Inject quarterly data into existing raw JSON files.
Usage: echo '{"symbol":"MRVL","type":"income_quarterly","data":[...]}' | python inject_quarterly.py
"""
import json, sys, os

RAW_DIR = '/Users/milton/投资大师/.worktrees/低估股票/data/screener/raw'

data = json.load(sys.stdin)
symbol = data['symbol']
dtype = data['type']  # "income_quarterly" or "ratios_quarterly"
records = data['data']

raw_path = os.path.join(RAW_DIR, f'{symbol}.json')
if os.path.exists(raw_path):
    with open(raw_path) as f:
        existing = json.load(f)
else:
    existing = {'symbol': symbol}

existing[dtype] = records if isinstance(records, list) else []

with open(raw_path, 'w') as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

count = len(records) if isinstance(records, list) else 0
print(f'{symbol}/{dtype}: {count} records')
