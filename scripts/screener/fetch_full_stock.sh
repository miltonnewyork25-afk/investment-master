#!/bin/bash
# Fetch all endpoints for a stock and save to raw JSON
# Usage: bash fetch_full_stock.sh SYMBOL [SYMBOL...]

set -e

RAW_DIR="/Users/milton/投资大师/.worktrees/低估股票/data/screener/raw"
API_KEY=$(grep '^FMP_API_KEY=' /Users/milton/投资大师/.env | cut -d= -f2)
BASE_URL="https://financialmodelingprep.com"

if [ -z "$API_KEY" ]; then echo "ERROR: No FMP_API_KEY"; exit 1; fi

for SYM in "$@"; do
    echo "=== Fetching $SYM ==="
    TMPDIR=$(mktemp -d)

    # Fetch all endpoints in parallel
    curl -s "$BASE_URL/stable/profile?symbol=$SYM&apikey=$API_KEY" -o "$TMPDIR/profile.json" &
    curl -s "$BASE_URL/stable/quote?symbol=$SYM&apikey=$API_KEY" -o "$TMPDIR/quote.json" &
    curl -s "$BASE_URL/stable/income-statement?symbol=$SYM&period=annual&limit=10&apikey=$API_KEY" -o "$TMPDIR/income.json" &
    curl -s "$BASE_URL/stable/balance-sheet-statement?symbol=$SYM&period=annual&limit=10&apikey=$API_KEY" -o "$TMPDIR/balance.json" &
    curl -s "$BASE_URL/stable/cash-flow-statement?symbol=$SYM&period=annual&limit=10&apikey=$API_KEY" -o "$TMPDIR/cashflow.json" &
    curl -s "$BASE_URL/stable/ratios?symbol=$SYM&period=annual&limit=10&apikey=$API_KEY" -o "$TMPDIR/ratios.json" &
    curl -s "$BASE_URL/stable/key-metrics?symbol=$SYM&period=annual&limit=10&apikey=$API_KEY" -o "$TMPDIR/key_metrics.json" &
    curl -s "$BASE_URL/stable/income-statement?symbol=$SYM&period=quarter&limit=8&apikey=$API_KEY" -o "$TMPDIR/income_q.json" &
    curl -s "$BASE_URL/stable/ratios?symbol=$SYM&period=quarter&limit=8&apikey=$API_KEY" -o "$TMPDIR/ratios_q.json" &
    curl -s "$BASE_URL/stable/insider-trading?symbol=$SYM&limit=100&apikey=$API_KEY" -o "$TMPDIR/insider.json" &
    wait

    # Combine into raw JSON
    python3 << PYEOF
import json, os

tmp = "$TMPDIR"
sym = "$SYM"
out = os.path.join("$RAW_DIR", f"{sym}.json")

def load(name):
    try:
        with open(os.path.join(tmp, name)) as f:
            data = json.load(f)
        return data if isinstance(data, list) else []
    except:
        return []

profile = load("profile.json")
quote = load("quote.json")
data = {
    "symbol": sym,
    "profile": profile[0] if profile else {},
    "quote": quote[0] if quote else {},
    "income": load("income.json"),
    "balance": load("balance.json"),
    "cashflow": load("cashflow.json"),
    "ratios": load("ratios.json"),
    "key_metrics": load("key_metrics.json"),
    "income_quarterly": load("income_q.json"),
    "ratios_quarterly": load("ratios_q.json"),
    "insider_trades": load("insider.json"),
}

with open(out, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

inc = data['income_quarterly']
print(f"  Saved {sym}: profile={'Y' if profile else 'N'} income_q={len(inc)} ratios_q={len(data['ratios_quarterly'])}")
PYEOF

    rm -rf "$TMPDIR"
    sleep 0.3
done
