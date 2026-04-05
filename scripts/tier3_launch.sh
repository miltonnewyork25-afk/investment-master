#!/bin/bash
# Tier 3 Analysis Launch with Harness Integration
# Version: v19.9+ with Investment Harness

set -e

TICKER="${1}"
INDUSTRY="${2}"
MODE="${3:-production}"
TARGET_CHARS="${4:-0}"  # 用户指定目标字符数，0=使用行业推算

if [ -z "$TICKER" ] || [ -z "$INDUSTRY" ]; then
    echo "Usage: $0 <TICKER> <INDUSTRY> [MODE] [TARGET_CHARS]"
    echo "MODE: development|production|cost_optimized|research_intensive"
    echo "TARGET_CHARS: 用户指定目标字符数(如200000)，省略则使用行业推算"
    exit 1
fi

echo "🎯 Starting Tier 3 Analysis with Investment Harness"
echo "Ticker: $TICKER"
echo "Industry: $INDUSTRY"
echo "Harness Mode: $MODE"

# 1. Initialize harness
echo "📊 Initializing Investment Harness..."
python3 -c "
import sys
sys.path.append('.')
from claude.harness import create_investment_harness
from claude.harness.config import load_config

# Create harness with specified mode
config = load_config('${MODE}')
harness = create_investment_harness('${TICKER}', 'tier_3_deep')

# Save harness session info
session_info = harness.get_current_status()
print(f'Harness initialized: {session_info}')

# Create harness context file for Claude to read
import json
with open('reports/${TICKER}/data/harness_context.json', 'w') as f:
    json.dump({
        'session_id': session_info['session_id'],
        'harness_mode': '${MODE}',
        'ticker': '${TICKER}',
        'initialization_time': session_info.get('initialization_time', ''),
        'cost_monitoring': True,
        'uncertainty_handling': True,
        'compliance_checking': True,
        'regime_detection': True
    }, f, indent=2)
"

# 2. Execute original tier3_launch.sh logic with harness context
echo "🔧 Running original analysis pipeline with harness supervision..."

# Create reports directory if it doesn't exist
mkdir -p "reports/${TICKER}/data"

# Run the original tier3_launch.sh but with harness context
bash scripts/tier3_launch_original.sh "${TICKER}" "${INDUSTRY}" "${TARGET_CHARS}"

echo "✅ Tier 3 Analysis with Harness completed successfully"
echo "📋 Check reports/${TICKER}/data/harness_context.json for harness session details"
