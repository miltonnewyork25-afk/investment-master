#!/usr/bin/env python3
"""
Save MCP fmp_data response to raw screener file.
Usage: python3 mcp_to_raw.py FILEPATH
  where FILEPATH is a JSON file containing MCP response with {symbol, endpoint, data}
"""
import json, os, sys

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'
ENDPOINT_MAP = {
    'profile': 'profile', 'income': 'income', 'balance': 'balance',
    'cashflow': 'cashflow', 'ratios': 'ratios', 'key-metrics': 'key_metrics',
    'insider-trading': 'insider_trades', 'quote': 'quote',
}
SINGLE_KEYS = {'profile', 'quote'}

def inject_from_file(filepath):
    with open(filepath) as f:
        resp = json.load(f)

    symbol = resp['symbol']
    endpoint = resp['endpoint']
    data = resp.get('data', [])
    key = ENDPOINT_MAP.get(endpoint, endpoint)

    # Load or create raw file
    raw_path = os.path.join(RAW_DIR, f'{symbol}.json')
    if os.path.exists(raw_path):
        with open(raw_path) as f:
            existing = json.load(f)
    else:
        existing = {'symbol': symbol, 'fetched_at': '2026-03-16'}

    # Inject data
    if key in SINGLE_KEYS:
        existing[key] = data[0] if isinstance(data, list) and data else data
    else:
        existing[key] = data if isinstance(data, list) else []

    with open(raw_path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    count = len(data) if isinstance(data, list) else 1
    print(f'{symbol}/{key}: {count} records')

if __name__ == '__main__':
    os.makedirs(RAW_DIR, exist_ok=True)
    if len(sys.argv) > 1:
        inject_from_file(sys.argv[1])
    else:
        # Read from stdin
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
