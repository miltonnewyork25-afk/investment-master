#!/bin/bash
# Data Consistency Validator Runner
# 集成到Phase 0数据预取后自动执行

set -e

TICKER="$1"
MODE="${2:-normal}"  # normal, strict, auto-fix
OUTPUT_DIR="reports/${TICKER}/data"

if [ -z "$TICKER" ]; then
    echo "Usage: $0 <TICKER> [mode]"
    echo "Modes: normal, strict, auto-fix"
    exit 1
fi

echo "🔍 Data Consistency Validator v1.0: $TICKER"

# 确保输出目录存在
mkdir -p "$OUTPUT_DIR"

# 收集MCP数据源
echo "📊 Collecting data from multiple sources..."

# 临时文件存储各数据源
TEMP_DIR="/tmp/dcv_$$"
mkdir -p "$TEMP_DIR"

# 获取不同endpoint数据
echo "  • FMP Quote..."
python3 -c "
import sys; sys.path.append('.')
from scripts.mcp_helper import get_quote_data
import json
data = get_quote_data('$TICKER')
with open('$TEMP_DIR/quote.json', 'w') as f:
    json.dump({'quote': data}, f, indent=2)
" 2>/dev/null || echo "    ⚠️  Quote data unavailable"

echo "  • FMP Profile..."
python3 -c "
import sys; sys.path.append('.')
from scripts.mcp_helper import get_profile_data
import json
data = get_profile_data('$TICKER')
with open('$TEMP_DIR/profile.json', 'w') as f:
    json.dump({'profile': data}, f, indent=2)
" 2>/dev/null || echo "    ⚠️  Profile data unavailable"

echo "  • FMP Key Metrics..."
python3 -c "
import sys; sys.path.append('.')
from scripts.mcp_helper import get_metrics_data
import json
data = get_metrics_data('$TICKER')
with open('$TEMP_DIR/key-metrics.json', 'w') as f:
    json.dump({'key-metrics': data}, f, indent=2)
" 2>/dev/null || echo "    ⚠️  Key metrics unavailable"

# 合并所有数据源
echo "  • Merging data sources..."
python3 -c "
import json
import os
import glob

merged_data = {}
for file_path in glob.glob('$TEMP_DIR/*.json'):
    with open(file_path, 'r') as f:
        data = json.load(f)
        merged_data.update(data)

with open('$TEMP_DIR/merged_data.json', 'w') as f:
    json.dump(merged_data, f, indent=2)
"

# 运行验证器
echo "🔧 Running consistency validation..."

TOLERANCE="0.02"
if [ "$MODE" = "strict" ]; then
    TOLERANCE="0.01"
fi

VALIDATION_REPORT="$OUTPUT_DIR/data_consistency_report.md"

python3 .claude/skills/data-consistency-validator/validator.py \
    "$TICKER" \
    --tolerance "$TOLERANCE" \
    --input-file "$TEMP_DIR/merged_data.json" \
    --output-file "$VALIDATION_REPORT"

VALIDATION_EXIT_CODE=$?

# 处理结果
if [ $VALIDATION_EXIT_CODE -eq 0 ]; then
    echo "✅ All validations passed!"
else
    echo "❌ Data consistency issues detected!"

    if [ "$MODE" = "auto-fix" ]; then
        echo "🔧 Auto-fix mode: Applying recommended corrections..."

        # 提取推荐的基准数据并更新shared_context.md
        python3 -c "
import json
import re

# 读取验证结果
with open('$TEMP_DIR/merged_data.json', 'r') as f:
    data = json.load(f)

# 使用quote数据作为基准（最新、最可靠）
if 'quote' in data and data['quote']:
    quote_data = data['quote'][0] if isinstance(data['quote'], list) else data['quote']
    market_cap = quote_data.get('marketCap', 0)
    price = quote_data.get('price', 0)

    print(f'Recommended baseline:')
    print(f'  Market Cap: \${market_cap:,.0f}')
    print(f'  Stock Price: \${price:.2f}')

    # 更新shared_context.md中的市值数据
    shared_context_file = '$OUTPUT_DIR/shared_context.md'
    try:
        with open(shared_context_file, 'r') as f:
            content = f.read()

        # 替换市值相关的DM锚点
        content = re.sub(
            r'DM-MKT-001: 市值\$[\d,]+B.*',
            f'DM-MKT-001: 市值\${market_cap/1e9:.1f}B (2026-02-17计算: 股价×股数) [FMP quote updated]',
            content
        )

        with open(shared_context_file, 'w') as f:
            f.write(content)

        print(f'  ✅ Updated {shared_context_file}')

    except FileNotFoundError:
        print(f'  ⚠️  {shared_context_file} not found - manual update required')
"
    fi

    # 严格模式下，数据不一致直接失败
    if [ "$MODE" = "strict" ]; then
        echo "💥 Strict mode: Failing due to data inconsistencies"
        exit 1
    fi
fi

# 显示报告摘要
echo ""
echo "📋 Validation Summary:"
if [ -f "$VALIDATION_REPORT" ]; then
    head -20 "$VALIDATION_REPORT"
    echo ""
    echo "📄 Full report: $VALIDATION_REPORT"
else
    echo "⚠️  Report generation failed"
fi

# 清理临时文件
rm -rf "$TEMP_DIR"

# 如果是CG门控调用，写入状态
if [ -n "$CG_MODE" ]; then
    if [ $VALIDATION_EXIT_CODE -eq 0 ]; then
        echo "CG19_DATA_CONSISTENCY=PASS" >> "$OUTPUT_DIR/cg_status.txt"
    else
        echo "CG19_DATA_CONSISTENCY=FAIL" >> "$OUTPUT_DIR/cg_status.txt"
    fi
fi

echo "🏁 Data consistency validation complete"
exit $VALIDATION_EXIT_CODE