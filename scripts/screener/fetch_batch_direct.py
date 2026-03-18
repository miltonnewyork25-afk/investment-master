#!/usr/bin/env python3
"""
Directly fetch all 8 endpoints from FMP API and save to raw JSON files.
Usage: python3 fetch_batch_direct.py SYMBOL1 SYMBOL2 ...
"""
import json, os, sys, time
import urllib.request
import urllib.error

FMP_API_KEY = 'fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb'
FMP_BASE = 'https://financialmodelingprep.com'
RAW_DIR = '/Users/milton/投资大师/data/screener/raw'

ENDPOINTS = [
    ('profile',         '/stable/profile',              {'limit': 1}),
    ('income',          '/stable/income-statement',     {'limit': 3}),
    ('balance',         '/stable/balance-sheet-statement', {'limit': 3}),
    ('cashflow',        '/stable/cash-flow-statement',  {'limit': 3}),
    ('ratios',          '/stable/ratios',               {'limit': 3}),
    ('key_metrics',     '/stable/key-metrics',          {'limit': 3}),
    ('insider_trades',  '/api/v4/insider-trading',       {'limit': 20}),
    ('quote',           '/stable/quote',                {'limit': 1}),
]

def fetch(path, symbol, extra_params=None):
    params = f'apikey={FMP_API_KEY}&symbol={symbol}'
    if extra_params:
        for k, v in extra_params.items():
            params += f'&{k}={v}'
    url = f'{FMP_BASE}{path}?{params}'
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        print(f'  ERROR {symbol}/{path}: {e}')
        return []

def fetch_stock(symbol):
    raw_path = os.path.join(RAW_DIR, f'{symbol}.json')

    # Load existing or create new
    if os.path.exists(raw_path):
        with open(raw_path) as f:
            data = json.load(f)
    else:
        data = {'symbol': symbol, 'fetched_at': '2026-03-16'}

    filled = 0
    for key, path, params in ENDPOINTS:
        # Skip if already has data
        existing = data.get(key)
        if existing and (isinstance(existing, dict) and len(existing) > 0 or isinstance(existing, list) and len(existing) > 0):
            filled += 1
            continue

        result = fetch(path, symbol, params)

        if key in ('profile', 'quote'):
            data[key] = result[0] if isinstance(result, list) and result else result
        else:
            data[key] = result if isinstance(result, list) else []

        count = len(result) if isinstance(result, list) else (1 if result else 0)
        if count > 0:
            filled += 1
        print(f'  {symbol}/{key}: {count} records')

        time.sleep(0.15)  # Rate limiting

    data['fetched_at'] = '2026-03-16'

    with open(raw_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f'{symbol}: {filled}/8 endpoints saved')
    return filled

if __name__ == '__main__':
    os.makedirs(RAW_DIR, exist_ok=True)
    symbols = sys.argv[1:]
    if not symbols:
        print('Usage: python3 fetch_batch_direct.py SYMBOL1 SYMBOL2 ...')
        sys.exit(1)

    total = 0
    for sym in symbols:
        print(f'\n--- {sym} ---')
        n = fetch_stock(sym)
        total += n

    print(f'\n=== Done: {len(symbols)} stocks, {total} total endpoints ===')
