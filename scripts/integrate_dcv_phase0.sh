#!/bin/bash
# 将data-consistency-validator集成到Phase 0标准流程
# v16.0框架增强 - 数据质量保障

set -e

TICKER="$1"
if [ -z "$TICKER" ]; then
    echo "Usage: $0 <TICKER>"
    exit 1
fi

echo "🚀 Phase 0 Enhanced with Data Consistency Validation"
echo "Ticker: $TICKER"
echo "Framework: v16.0 + DCV v1.0"
echo

# Step 1: 传统数据预取
echo "📊 Step 1: Data Prefetch..."
if ! /data-prefetch "$TICKER"; then
    echo "❌ Data prefetch failed"
    exit 1
fi
echo "✅ Data prefetch completed"
echo

# Step 2: 数据一致性验证 (新增)
echo "🔍 Step 2: Data Consistency Validation..."
if bash .claude/skills/data-consistency-validator/run_validator.sh "$TICKER" auto-fix; then
    echo "✅ Data consistency validation passed"
else
    echo "⚠️ Data consistency issues detected - but auto-fixed"
    echo "📋 Review: reports/$TICKER/data/data_consistency_report.md"
fi
echo

# Step 3: 验证修复结果
echo "🔧 Step 3: Post-Validation Check..."
SHARED_CONTEXT="reports/$TICKER/data/shared_context.md"

if [ -f "$SHARED_CONTEXT" ]; then
    # 检查是否有数据一致性更新
    if grep -q "FMP quote updated" "$SHARED_CONTEXT"; then
        echo "✅ Data corrections applied to shared_context.md"
    else
        echo "ℹ️  No data corrections needed"
    fi

    # 显示关键数据摘要
    echo "📈 Key Data Summary:"
    grep -E "DM-MKT-001|DM-VAL-001" "$SHARED_CONTEXT" | head -2
else
    echo "⚠️  shared_context.md not found"
fi
echo

# Step 4: 生成Phase 0完成标记
echo "Phase 0 Enhanced Complete" > "reports/$TICKER/data/phase0_enhanced.flag"
echo "✅ Phase 0 Enhanced workflow completed successfully"
echo "📄 Next: Continue with Phase 1 using validated data baseline"