#!/bin/bash
# ============================================================
# count_repetitions.sh — 关键数字重复度统计 v1.0
# ============================================================
# 用法:
#   bash tests/count_repetitions.sh <报告.md> [max_threshold]
#
# 功能:
#   统计报告中关键数字的重复出现次数
#   识别超阈值重复(默认45次)
#   输出替换建议
#
# 退出码: 0=正常, 1=有超阈值重复
# ============================================================

FILE="${1:?用法: $0 <报告.md> [max_threshold]}"
MAX_THRESHOLD="${2:-45}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

if [ ! -f "$FILE" ]; then
    echo -e "${RED}ERROR: 文件不存在: $FILE${NC}"
    exit 2
fi

echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${CYAN}  关键数字重复度统计 v1.0${NC}"
echo -e "${CYAN}  报告: $(basename "$FILE")${NC}"
echo -e "${CYAN}  阈值: ${MAX_THRESHOLD}次${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo ""

OVER_COUNT=0

# --- 金额类重复 ---
echo -e "${CYAN}[金额] \$xB格式:${NC}"
{ grep -oE '\$[0-9]+B|\$[0-9]+\.[0-9]+B' "$FILE" || true; } | sort | uniq -c | sort -rn | head -20 | while read count val; do
    if [ "$count" -gt "$MAX_THRESHOLD" ]; then
        echo -e "  ${RED}${count}次: $val ← 超阈值${NC}"
    elif [ "$count" -gt 30 ]; then
        echo -e "  ${YELLOW}${count}次: $val${NC}"
    else
        echo "  ${count}次: $val"
    fi
done
echo ""

# --- P/E重复 ---
echo -e "${CYAN}[P/E] 倍数出现:${NC}"
PE_TOTAL=$(grep -coE 'P/E' "$FILE" 2>/dev/null || true)
echo "  P/E总出现: ${PE_TOTAL}次"

{ grep -oE 'P/E[[:space:]]*[0-9]+\.?[0-9]*x' "$FILE" || true; } | sort | uniq -c | sort -rn | head -10 | while read count val; do
    if [ "$count" -gt "$MAX_THRESHOLD" ]; then
        echo -e "  ${RED}${count}次: $val ← 超阈值${NC}"
    else
        echo "  ${count}次: $val"
    fi
done
echo ""

# --- 限定百分比重复 (仅统计带上下文的百分比, 忽略裸数字) ---
echo -e "${CYAN}[限定百分比] WACC/OPM/份额等关键百分比:${NC}"
echo "  (注: 裸百分比如10%/15%在不同上下文中自然出现, 不计入重复统计)"

# 只统计有上下文的关键百分比模式
echo "  WACC相关:"
{ grep -oE 'WACC[[:space:]]*[0-9]+\.?[0-9]*%' "$FILE" || true; } | sort | uniq -c | sort -rn | head -5 | while read count val; do
    echo "    ${count}次: $val"
done

echo "  OPM相关:"
{ grep -oE 'OPM[[:space:]]*[>~]?[0-9]+\.?[0-9]*%' "$FILE" || true; } | sort | uniq -c | sort -rn | head -5 | while read count val; do
    echo "    ${count}次: $val"
done

echo "  份额相关:"
{ grep -oE '份额[[:space:]]*[>~]?[0-9]+\.?[0-9]*%|share[[:space:]]*[>~]?[0-9]+\.?[0-9]*%' "$FILE" || true; } | sort | uniq -c | sort -rn | head -5 | while read count val; do
    echo "    ${count}次: $val"
done
echo ""

# --- WACC/折现率重复 ---
echo -e "${CYAN}[WACC] 折现率出现:${NC}"
WACC_TOTAL=$(grep -coiE 'WACC' "$FILE" 2>/dev/null || true)
echo "  WACC总出现: ${WACC_TOTAL}次"
echo ""

# --- 股价重复 ---
echo -e "${CYAN}[股价] \$xxx/sh格式:${NC}"
{ grep -oE '\$[0-9]+\.?[0-9]*/sh' "$FILE" || true; } | sort | uniq -c | sort -rn | head -10 | while read count val; do
    if [ "$count" -gt 35 ]; then
        echo -e "  ${YELLOW}${count}次: $val${NC}"
    else
        echo "  ${count}次: $val"
    fi
done
echo ""

# --- 统计超阈值数量 ---
OVER_AMOUNTS=$(grep -oE '\$[0-9]+B|\$[0-9]+\.[0-9]+B' "$FILE" 2>/dev/null | sort | uniq -c | sort -rn | awk -v t="$MAX_THRESHOLD" '$1>t' | wc -l | tr -d ' ')
OVER_PE=$(grep -oE 'P/E[[:space:]]*[0-9]+\.?[0-9]*x' "$FILE" 2>/dev/null | sort | uniq -c | sort -rn | awk -v t="$MAX_THRESHOLD" '$1>t' | wc -l | tr -d ' ')
OVER_TOTAL=$((OVER_AMOUNTS + OVER_PE))

echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "  超阈值(${MAX_THRESHOLD}次)统计:"
echo -e "    金额类: ${OVER_AMOUNTS}个"
echo -e "    P/E类: ${OVER_PE}个"
echo -e "    总计: ${OVER_TOTAL}个"

if [ "$OVER_TOTAL" -gt 0 ]; then
    echo ""
    echo -e "  ${YELLOW}建议: 对超阈值数字使用代称变体${NC}"
    echo -e "  例: \$200B → \"FY2026 CapEx指引\"/\"年度资本支出\"/\"巨额CapEx\""
    exit 1
else
    echo -e "  ${GREEN}ALL CLEAR: 无超阈值重复${NC}"
    exit 0
fi
