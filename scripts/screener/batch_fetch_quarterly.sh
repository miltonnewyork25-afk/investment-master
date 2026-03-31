#!/bin/bash
# Batch fetch quarterly data for GID candidates
# Usage: bash batch_fetch_quarterly.sh [SYMBOLS...]
# Example: bash batch_fetch_quarterly.sh MRVL GWRE AFRM
# No args = fetch all Tier 1 (50 stocks)

set -e

RAW_DIR="/Users/milton/投资大师/.worktrees/低估股票/data/screener/raw"
API_KEY=$(grep '^FMP_API_KEY=' /Users/milton/投资大师/.env 2>/dev/null | cut -d= -f2)
BASE_URL="https://financialmodelingprep.com"
TMPDIR=$(mktemp -d)

if [ -z "$API_KEY" ]; then
    echo "ERROR: No FMP_API_KEY in .env"
    exit 1
fi

echo "API Key: ${API_KEY:0:8}... | Temp: $TMPDIR"

# Stock list
if [ $# -gt 0 ]; then
    SYMBOLS="$@"
else
    SYMBOLS="MRVL GWRE AFRM TOST RBLX AMD ADI APH LITE UI COHR MTSI CELH CIEN GLW HAS PODD BG EXAS IP FIX BALL BSX CNC INTU MU CASY CCK DXCM FFIV OLLI VEEV DECK IOT NTRA ADSK BRO DAR H KEYS NDAQ RMD SCCO SCHW TXN TXT UBER WST"
fi

# Deduplicate
SYMBOLS=$(echo $SYMBOLS | tr ' ' '\n' | sort -u | tr '\n' ' ')
TOTAL=$(echo $SYMBOLS | wc -w | tr -d ' ')
echo "Fetching quarterly data for $TOTAL stocks..."
echo ""

COUNT=0
SUCCESS=0
SKIP=0
FAIL=0

for SYM in $SYMBOLS; do
    COUNT=$((COUNT + 1))
    RAW_FILE="$RAW_DIR/$SYM.json"

    if [ ! -f "$RAW_FILE" ]; then
        echo "[$COUNT/$TOTAL] $SYM: SKIP (no raw file)"
        SKIP=$((SKIP + 1))
        continue
    fi

    # Check if already has quarterly data
    HAS_Q=$(python3 -c "
import json
d=json.load(open('$RAW_FILE'))
print('yes' if len(d.get('income_quarterly',[])) >= 5 else 'no')
" 2>/dev/null || echo "no")

    if [ "$HAS_Q" = "yes" ]; then
        echo "[$COUNT/$TOTAL] $SYM: SKIP (already has quarterly)"
        SKIP=$((SKIP + 1))
        continue
    fi

    echo -n "[$COUNT/$TOTAL] $SYM: fetching... "

    # Fetch income quarterly
    curl -s "$BASE_URL/stable/income-statement?symbol=$SYM&period=quarter&limit=8&apikey=$API_KEY" -o "$TMPDIR/${SYM}_inc.json" 2>/dev/null || true

    # Fetch ratios quarterly
    curl -s "$BASE_URL/stable/ratios?symbol=$SYM&period=quarter&limit=8&apikey=$API_KEY" -o "$TMPDIR/${SYM}_rat.json" 2>/dev/null || true

    # Inject into raw file
    python3 << PYEOF
import json

raw_file = "$RAW_FILE"
tmp_dir = "$TMPDIR"
sym = "$SYM"

with open(raw_file) as f:
    data = json.load(f)

inc_count = 0
rat_count = 0

try:
    with open(f"{tmp_dir}/{sym}_inc.json") as f:
        inc = json.load(f)
    if isinstance(inc, list) and len(inc) > 0:
        data['income_quarterly'] = inc
        inc_count = len(inc)
except:
    pass

try:
    with open(f"{tmp_dir}/{sym}_rat.json") as f:
        rat = json.load(f)
    if isinstance(rat, list) and len(rat) > 0:
        data['ratios_quarterly'] = rat
        rat_count = len(rat)
except:
    pass

with open(raw_file, 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"income_q={inc_count} ratios_q={rat_count}", end="")
if inc_count >= 5:
    print(" OK")
else:
    print(" INCOMPLETE")
PYEOF

    if [ $? -eq 0 ]; then
        SUCCESS=$((SUCCESS + 1))
    else
        FAIL=$((FAIL + 1))
    fi

    # Rate limit: ~300 calls/min for FMP
    sleep 0.4
done

rm -rf "$TMPDIR"

echo ""
echo "=========================================="
echo "Done! Success=$SUCCESS Skip=$SKIP Fail=$FAIL Total=$TOTAL"
echo "Run: python3 scripts/screener/run_growth_screen.py data/screener/raw/ --top 30"
