#!/usr/bin/env python3
"""Build raw JSON files for screener from MCP fmp_data responses.
Usage: python3 build_raw.py inject SYMBOL ENDPOINT < json_response
       python3 build_raw.py status SYMBOL...
"""
import json, os, sys

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'
ENDPOINT_MAP = {
    'profile': 'profile',
    'income': 'income',
    'balance': 'balance',
    'cashflow': 'cashflow',
    'ratios': 'ratios',
    'key-metrics': 'key_metrics',
    'insider-trading': 'insider_trades',
    'quote': 'quote',
}
SINGLE_KEYS = {'profile', 'quote'}

def get_path(symbol):
    return os.path.join(RAW_DIR, f'{symbol}.json')

def load_or_create(symbol):
    path = get_path(symbol)
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return {'symbol': symbol, 'fetched_at': '2026-03-16'}

def inject(symbol, endpoint, data):
    key = ENDPOINT_MAP.get(endpoint, endpoint)
    existing = load_or_create(symbol)
    if key in SINGLE_KEYS:
        existing[key] = data[0] if isinstance(data, list) and data else data
    else:
        existing[key] = data if isinstance(data, list) else []
    with open(get_path(symbol), 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
    count = len(data) if isinstance(data, list) else 1
    print(f'{symbol}/{key}: {count} records')

def status(*symbols):
    for sym in symbols:
        path = get_path(sym)
        if not os.path.exists(path):
            print(f'{sym}: MISSING')
            continue
        with open(path) as f:
            d = json.load(f)
        filled = []
        missing = []
        for ep, key in ENDPOINT_MAP.items():
            val = d.get(key)
            if val and (isinstance(val, (list, dict)) and len(val) > 0 if isinstance(val, (list, dict)) else val):
                filled.append(key)
            else:
                missing.append(key)
        print(f'{sym}: {len(filled)}/8 [{", ".join(missing) if missing else "complete"}]')

if __name__ == '__main__':
    os.makedirs(RAW_DIR, exist_ok=True)
    cmd = sys.argv[1]
    if cmd == 'inject':
        symbol, endpoint = sys.argv[2], sys.argv[3]
        resp = json.load(sys.stdin)
        data = resp.get('data', resp)
        inject(symbol, endpoint, data)
    elif cmd == 'status':
        status(*sys.argv[2:])
