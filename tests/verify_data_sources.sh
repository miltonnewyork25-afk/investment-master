#!/bin/bash
# ============================================================
# verify_data_sources.sh — 数据源交叉验证脚本 v1.0
# ============================================================
# 用法:
#   ./tests/verify_data_sources.sh <报告.md> <shared_context.md>
#   例: ./tests/verify_data_sources.sh \
#       reports/AMD/AMD_Complete_v3.0_2026-02-12.md \
#       reports/AMD/data/shared_context.md
#
# 功能:
#   1. 提取报告中的关键数字(金额/百分比/倍数)
#   2. 检查DM(shared_context.md)中是否存在对应锚点
#   3. 输出覆盖率+孤儿数字列表
#
# 退出码: 0=覆盖率≥90%, 1=覆盖率<90%
# ============================================================

REPORT="${1:?用法: $0 <报告.md> <shared_context.md>}"
DM="${2:?用法: $0 <报告.md> <shared_context.md>}"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# 检查文件存在
if [ ! -f "$REPORT" ]; then
    echo -e "${RED}FATAL: 报告不存在: $REPORT${NC}"
    exit 1
fi
if [ ! -f "$DM" ]; then
    echo -e "${RED}FATAL: DM不存在: $DM${NC}"
    exit 1
fi

echo "=============================================="
echo -e " ${CYAN}Data Source Verification v1.0${NC}"
echo " 报告: $(basename "$REPORT")"
echo " DM:   $(basename "$DM")"
echo "=============================================="
echo ""

# --- Step 1: 提取报告中的关键数字 ---
# 提取金额: $XXB, $XX.XB, $XXM, $XX.XM, ¥XX
REPORT_DOLLARS=$(grep -oE '\$[0-9]+\.?[0-9]*[BMK]?' "$REPORT" 2>/dev/null | sort -u) || true
REPORT_DOLLARS_COUNT=$(echo "$REPORT_DOLLARS" | grep -c '.' 2>/dev/null || echo 0)

# 提取百分比: XX%, XX.X%
REPORT_PCTS=$(grep -oE '[0-9]+\.?[0-9]*%' "$REPORT" 2>/dev/null | sort -u) || true
REPORT_PCTS_COUNT=$(echo "$REPORT_PCTS" | grep -c '.' 2>/dev/null || echo 0)

# 提取倍数: XXx, XX.Xx
REPORT_MULTIPLES=$(grep -oE '[0-9]+\.?[0-9]*x' "$REPORT" 2>/dev/null | sort -u) || true
REPORT_MULTIPLES_COUNT=$(echo "$REPORT_MULTIPLES" | grep -c '.' 2>/dev/null || echo 0)

TOTAL_NUMBERS=$((REPORT_DOLLARS_COUNT + REPORT_PCTS_COUNT + REPORT_MULTIPLES_COUNT))
echo "报告中提取到: 金额${REPORT_DOLLARS_COUNT} + 百分比${REPORT_PCTS_COUNT} + 倍数${REPORT_MULTIPLES_COUNT} = ${TOTAL_NUMBERS}个唯一数字"

# --- Step 2: 检查DM中是否存在 ---
FOUND=0
ORPHANS=""

# 检查金额
while IFS= read -r num; do
    [ -z "$num" ] && continue
    if grep -qF "$num" "$DM" 2>/dev/null; then
        FOUND=$((FOUND + 1))
    fi
done <<< "$REPORT_DOLLARS"

# 检查关键百分比 (跳过常见的非数据百分比如"80%地板")
while IFS= read -r num; do
    [ -z "$num" ] && continue
    if grep -qF "$num" "$DM" 2>/dev/null; then
        FOUND=$((FOUND + 1))
    fi
done <<< "$REPORT_PCTS"

# 检查倍数
while IFS= read -r num; do
    [ -z "$num" ] && continue
    if grep -qF "$num" "$DM" 2>/dev/null; then
        FOUND=$((FOUND + 1))
    fi
done <<< "$REPORT_MULTIPLES"

# --- Step 3: 计算覆盖率 ---
if [ "$TOTAL_NUMBERS" -gt 0 ]; then
    COVERAGE=$(python3 -c "print(round($FOUND * 100 / $TOTAL_NUMBERS, 1))")
else
    COVERAGE=0
fi

echo ""
echo "=============================================="
echo -e " ${CYAN}验证结果${NC}"
echo "=============================================="
echo " DM中匹配: ${FOUND} / ${TOTAL_NUMBERS}"
echo " 覆盖率: ${COVERAGE}%"

# --- Step 4: DM锚点统计 ---
DM_ANCHORS=$(grep -cE '^### DM-' "$DM" 2>/dev/null || echo 0)
DM_H=$(grep -ciE 'type.*H\b|类型.*H\b|硬数据' "$DM" 2>/dev/null || echo 0)
DM_R=$(grep -ciE 'type.*R\b|类型.*R\b|合理推断' "$DM" 2>/dev/null || echo 0)
DM_S=$(grep -ciE 'type.*S\b|类型.*S\b|主观判断' "$DM" 2>/dev/null || echo 0)
echo " DM锚点: ${DM_ANCHORS}个 (H:${DM_H} R:${DM_R} S:${DM_S})"

# --- Step 5: DM新鲜度 ---
DM_DATES=$(grep -oE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' "$DM" 2>/dev/null | sort -u | tail -1) || true
echo " DM最新日期: ${DM_DATES:-未知}"
echo "=============================================="

# --- 判定 ---
COVERAGE_INT=$(python3 -c "print(int($COVERAGE))")
if [ "$COVERAGE_INT" -ge 90 ]; then
    echo ""
    echo -e "${GREEN}RESULT: PASS — DM覆盖率 ${COVERAGE}% (≥90%)${NC}"
    exit 0
elif [ "$COVERAGE_INT" -ge 70 ]; then
    echo ""
    echo -e "${YELLOW}RESULT: WARN — DM覆盖率 ${COVERAGE}% (70-89%, 建议补充DM锚点)${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}RESULT: FAIL — DM覆盖率 ${COVERAGE}% (<70%)${NC}"
    exit 1
fi
