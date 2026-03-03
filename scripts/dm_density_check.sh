#!/bin/bash
# ============================================================
# dm_density_check.sh — DM标注密度早期检查 v1.0
# ============================================================
# 用法:
#   bash scripts/dm_density_check.sh <FILE> <EXPECTED_DM> [PHASE]
#   例: bash scripts/dm_density_check.sh reports/SBUX/SBUX_P1.md 50 1
#
# 功能: Phase 1-3期间的DM标注密度早期警告
# 退出码: 0=充足, 1=不足, 2=严重不足(<50%)
# ============================================================

set -euo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
FILE="${1:?用法: $0 <FILE> <EXPECTED_DM> [PHASE]}"
EXPECTED_DM="${2:?缺少EXPECTED_DM参数}"
PHASE="${3:-unknown}"

# --- 检查文件存在 ---
if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: ${FILE}${NC}"
    exit 2
fi

# --- 统计DM标注 ---
ACTUAL_DM=$(grep -o '\[DM-[A-Za-z0-9]\+-[A-Za-z0-9]\+\]' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
CHARS=$(wc -c < "$FILE" | tr -d ' ')
DENSITY=$(python3 -c "print(f'{($ACTUAL_DM / ($CHARS / 10000)):.1f}' if $CHARS > 0 else '0.0')")

# --- 阈值计算 ---
CRITICAL_THRESHOLD=$((EXPECTED_DM / 2))  # 50%为严重不足
WARNING_THRESHOLD=$((EXPECTED_DM * 8 / 10))  # 80%为警告

echo -e "${CYAN}========================================${NC}"
echo -e " DM标注密度检查 - Phase ${PHASE}"
echo -e " 文件: $(basename "$FILE")"
echo -e "${CYAN}========================================${NC}"
echo ""

# --- 评估结果 ---
if [ "$ACTUAL_DM" -ge "$EXPECTED_DM" ]; then
    echo -e "${GREEN}✅ DM标注充足${NC}"
    echo -e "   实际: ${ACTUAL_DM} 个 | 期望: ${EXPECTED_DM} 个"
    echo -e "   密度: ${DENSITY}/万字符 | 字符: ${CHARS}"
    echo ""
    exit 0
elif [ "$ACTUAL_DM" -ge "$WARNING_THRESHOLD" ]; then
    echo -e "${YELLOW}⚠️  DM标注接近目标${NC}"
    echo -e "   实际: ${ACTUAL_DM} 个 | 期望: ${EXPECTED_DM} 个"
    echo -e "   还需: $((EXPECTED_DM - ACTUAL_DM)) 个标注"
    echo -e "   密度: ${DENSITY}/万字符 | 字符: ${CHARS}"
    echo ""
    echo -e "${YELLOW}建议在Phase ${PHASE}结束前补充标注${NC}"
    exit 0
elif [ "$ACTUAL_DM" -ge "$CRITICAL_THRESHOLD" ]; then
    echo -e "${YELLOW}⚠️  DM标注偏低但可接受${NC}"
    echo -e "   实际: ${ACTUAL_DM} 个 | 期望: ${EXPECTED_DM} 个"
    echo -e "   缺口: $((EXPECTED_DM - ACTUAL_DM)) 个标注"
    echo -e "   密度: ${DENSITY}/万字符 | 字符: ${CHARS}"
    echo ""
    echo -e "${YELLOW}请在后续Phase中重点补充数据标注${NC}"
    exit 1
else
    echo -e "${RED}❌ DM标注严重不足${NC}"
    echo -e "   实际: ${ACTUAL_DM} 个 | 期望: ${EXPECTED_DM} 个"
    echo -e "   缺口: $((EXPECTED_DM - ACTUAL_DM)) 个标注 (${DENSITY}/万字符)"
    echo -e "   字符: ${CHARS}"
    echo ""
    echo -e "${RED}🚨 数据诚信风险！必须立即补充DM标注${NC}"
    echo ""
    echo -e "${CYAN}建议修复方案:${NC}"
    echo "1. 检查每个财务数字是否有[DM-F##]标注"
    echo "2. 检查每个行业数据是否有[DM-I##]标注"
    echo "3. 运行 bash scripts/inject_dm_annotations.sh $FILE"
    echo ""
    exit 2
fi