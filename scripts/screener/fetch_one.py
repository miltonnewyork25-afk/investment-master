#!/usr/bin/env python3
"""
Fetch all 8 endpoints for one stock and save to raw JSON.
This script is meant to be fed MCP responses via stdin, one per line.
Each line is a complete MCP JSON response.

Usage:
  # In a loop, pipe each MCP response:
  echo '{"symbol":"CRM","endpoint":"profile","data":[...]}' | python3 fetch_one.py
"""
import json, os, sys

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'
ENDPOINT_MAP = {
    'profile': 'profile', 'income': 'income', 'balance': 'balance',
    'cashflow': 'cashflow', 'ratios': 'ratios', 'key-metrics': 'key_metrics',
    'insider-trading': 'insider_trades', 'quote': 'quote',
}
SINGLE_KEYS = {'profile', 'quote'}

os.makedirs(RAW_DIR, exist_ok=True)
resp = json.load(sys.stdin)
symbol = resp['symbol']
endpoint = resp['endpoint']
data = resp.get('data', [])
key = ENDPOINT_MAP.get(endpoint, endpoint)

raw_path = os.path.join(RAW_DIR, f'{symbol}.json')
if os.path.exists(raw_path):
    with open(raw_path) as f:
        existing = json.load(f)
else:
    existing = {'symbol': symbol, 'fetched_at': '2026-03-16'}

if key in SINGLE_KEYS:
    existing[key] = data[0] if isinstance(data, list) and data else data
else:
    existing[key] = data if isinstance(data, list) else []

with open(raw_path, 'w') as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

count = len(data) if isinstance(data, list) else 1
print(f'{symbol}/{key}: {count} records')
