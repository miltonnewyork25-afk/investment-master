#!/usr/bin/env python3
"""
Fetch all 14 data endpoints for CQI stocks and save to raw JSON files.
Uses subprocess to call the MCP fmp_data tool via claude CLI-compatible approach.

Since this runs inside claude context, it outputs shell commands to be pasted.
Actually, this creates stub files that can be populated via MCP calls.
"""
import json
import os
import sys

STOCKS = ['CPRT', 'SPGI', 'FICO', 'MCO', 'MSFT', 'GOOGL', 'ASML', 'COST', 'META', 'AMZN']
RAW_DIR = '/Users/milton/投资大师/data/screener/raw'

def create_stub(symbol):
    """Create a stub JSON file with empty data slots."""
    path = os.path.join(RAW_DIR, f'{symbol}.json')

    # If file exists and already has stage 2 data, skip
    if os.path.exists(path):
        with open(path) as f:
            existing = json.load(f)
        if 'income_10y' in existing and len(existing.get('income_10y', [])) > 0:
            print(f'{symbol}: already complete, skipping')
            return False

    stub = {
        'symbol': symbol,
        'fetched_at': '2026-03-16',
        'profile': {},
        'income': [],
        'balance': [],
        'cashflow': [],
        'ratios': [],
        'key_metrics': [],
        'insider_trades': [],
        'quote': {},
        'income_10y': [],
        'ratios_10y': [],
        'key_metrics_10y': [],
        'cashflow_10y': [],
        'income_quarterly': [],
        'ratios_quarterly': [],
    }

    with open(path, 'w') as f:
        json.dump(stub, f, indent=2)

    print(f'{symbol}: stub created at {path}')
    return True

def inject_data(symbol, key_name, data):
    """Inject data into an existing stub file."""
    path = os.path.join(RAW_DIR, f'{symbol}.json')

    with open(path) as f:
        existing = json.load(f)

    # Handle profile/quote (single object from array)
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
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python3 fetch_cqi_batch.py stub          # Create stub files")
        print("  python3 fetch_cqi_batch.py inject SYM KEY # Inject from stdin")
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == 'stub':
        os.makedirs(RAW_DIR, exist_ok=True)
        for sym in STOCKS:
            create_stub(sym)

    elif cmd == 'inject':
        symbol = sys.argv[2]
        key_name = sys.argv[3]
        mcp_response = json.load(sys.stdin)
        data = mcp_response.get('data', mcp_response)
        inject_data(symbol, key_name, data)

    elif cmd == 'status':
        for sym in STOCKS:
            path = os.path.join(RAW_DIR, f'{sym}.json')
            if not os.path.exists(path):
                print(f'{sym}: MISSING')
                continue
            with open(path) as f:
                d = json.load(f)
            keys_with_data = sum(1 for k in ['profile','income','balance','cashflow','ratios',
                                              'key_metrics','insider_trades','quote',
                                              'income_10y','ratios_10y','key_metrics_10y',
                                              'cashflow_10y','income_quarterly','ratios_quarterly']
                               if k in d and (d[k] if isinstance(d[k], (list,dict)) else False))
            total = 14
            print(f'{sym}: {keys_with_data}/{total} datasets')
