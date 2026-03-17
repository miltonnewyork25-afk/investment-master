#!/usr/bin/env python3
"""Save batch data from MCP responses into raw JSON files."""
import json
import os
import sys

RAW_DIR = '/Users/milton/投资大师/data/screener/raw'

def save_stock(symbol, data_dict):
    """Save a complete stock data dict to raw JSON."""
    path = os.path.join(RAW_DIR, f'{symbol}.json')

    result = {
        'symbol': symbol,
        'fetched_at': '2026-03-16',
    }

    for key, data in data_dict.items():
        if key in ('profile', 'quote'):
            if isinstance(data, list):
                result[key] = data[0] if data else {}
            else:
                result[key] = data
        else:
            result[key] = data if isinstance(data, list) else []

    with open(path, 'w') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    keys_with_data = sum(1 for k in ['profile','income','balance','cashflow','ratios',
                                      'key_metrics','insider_trades','quote']
                        if k in result and result[k])
    print(f'{symbol}: saved {keys_with_data}/8 datasets')

if __name__ == '__main__':
    os.makedirs(RAW_DIR, exist_ok=True)
    data = json.load(sys.stdin)
    for symbol, stock_data in data.items():
        save_stock(symbol, stock_data)
