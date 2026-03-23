#!/usr/bin/env python3
"""Helper to inject MCP fmp_data results into raw JSON files for batch 3 stocks."""
import json, os, sys

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'

def inject(symbol, key_name, data):
    path = os.path.join(RAW_DIR, f'{symbol}.json')
    if os.path.exists(path):
        with open(path) as f:
            existing = json.load(f)
    else:
        existing = {
            'symbol': symbol,
            'fetched_at': '2026-03-16',
            'profile': {}, 'income': [], 'balance': [], 'cashflow': [],
            'ratios': [], 'key_metrics': [], 'insider_trades': [], 'quote': {},
        }

    if key_name in ('profile', 'quote'):
        if isinstance(data, list):
            existing[key_name] = data[0] if data else {}
        else:
            existing[key_name] = data
    else:
        existing[key_name] = data if isinstance(data, list) else []

    with open(path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    count = len(data) if isinstance(data, list) else 1
    print(f'{symbol}/{key_name}: {count} records')

if __name__ == '__main__':
    symbol = sys.argv[1]
    key_name = sys.argv[2]
    mcp_response = json.load(sys.stdin)
    data = mcp_response.get('data', mcp_response)
    inject(symbol, key_name, data)
