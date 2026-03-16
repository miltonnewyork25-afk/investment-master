#!/usr/bin/env python3
"""
Batch save all raw screener data from MCP fmp_data tool.
Reads individual JSON response files from a temp directory and assembles into raw files.
"""
import json, os, glob

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'
TEMP_DIR = '/tmp/screener_batch3'

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

def assemble(symbol):
    path = os.path.join(RAW_DIR, f'{symbol}.json')
    result = {'symbol': symbol, 'fetched_at': '2026-03-16'}

    count = 0
    for endpoint, key in ENDPOINT_MAP.items():
        fpath = os.path.join(TEMP_DIR, f'{symbol}_{endpoint}.json')
        if not os.path.exists(fpath):
            continue
        with open(fpath) as f:
            resp = json.load(f)
        data = resp.get('data', resp)

        if key in SINGLE_KEYS:
            result[key] = data[0] if isinstance(data, list) and data else data
        else:
            result[key] = data if isinstance(data, list) else []
        count += 1

    with open(path, 'w') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print(f'{symbol}: {count}/8 endpoints saved')

if __name__ == '__main__':
    os.makedirs(RAW_DIR, exist_ok=True)
    # Find all symbols that have temp files
    symbols = set()
    for f in glob.glob(os.path.join(TEMP_DIR, '*.json')):
        name = os.path.basename(f)
        sym = name.split('_')[0]
        symbols.add(sym)

    for sym in sorted(symbols):
        assemble(sym)
