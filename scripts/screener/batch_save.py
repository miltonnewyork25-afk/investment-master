#!/usr/bin/env python3
"""Batch inject: reads full MCP data for a stock from stdin."""
import json, sys, os

RAW = '/Users/milton/投资大师/data/screener/raw'

def main():
    data = json.load(sys.stdin)
    sym = data['symbol']
    path = os.path.join(RAW, f'{sym}.json')
    
    with open(path) as f:
        existing = json.load(f)
    
    for key in data:
        if key == 'symbol':
            continue
        if key in ('profile', 'quote'):
            val = data[key]
            if isinstance(val, list) and val:
                existing[key] = val[0]
            elif isinstance(val, dict):
                existing[key] = val
        elif key in ('income', 'balance', 'cashflow', 'ratios', 'key_metrics', 'insider_trades'):
            existing[key] = data[key]
    
    with open(path, 'w') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)
    
    sz = os.path.getsize(path)
    filled = sum(1 for k in ['profile','income','balance','cashflow','ratios','key_metrics','insider_trades','quote'] 
                 if k in existing and existing[k] and (isinstance(existing[k], (dict, list)) and len(existing[k] if isinstance(existing[k], list) else existing[k].keys()) > 0))
    print(f'{sym}: {sz:,} bytes, {filled}/8 datasets')

if __name__ == "__main__":
    main()
