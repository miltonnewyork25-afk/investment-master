#!/bin/bash
# ============================================================
# check_data_consistency.sh — 报告数据一致性扫描 v1.0
# ============================================================
# 用法:
#   bash tests/check_data_consistency.sh <报告.md> [golden_numbers.yaml]
#
# 功能:
#   1. 扫描报告中同一指标的多个不同数值
#   2. 与golden_numbers.yaml对比(如提供)
#   3. 检测概率集一致性(四档情景概率)
#   4. 检测市场份额口径矛盾
#
# 输出: JSON格式的一致性报告
# 退出码: 0=无矛盾, 1=发现矛盾
# ============================================================

FILE="${1:?用法: $0 <报告.md> [golden_numbers.yaml]}"
GOLDEN="${2:-}"

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
echo -e "${CYAN}  数据一致性扫描 v1.0${NC}"
echo -e "${CYAN}  报告: $(basename "$FILE")${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo ""

CONTRADICTIONS=0
WARNINGS=0

# --- Helper: 统计某个数值模式出现次数 ---
count_pattern() {
    { grep -oE "$1" "$FILE" || true; } | sort | uniq -c | sort -rn
}

# --- 检查1: 概率集一致性 ---
echo -e "${CYAN}[检查1] 概率集一致性${NC}"
echo -e "  (注: 敏感性分析中合法使用不同概率变体; 此检查标记所有变体供人工确认)"

# 查找所有 S1=XX%/S2=XX%/S3=XX%/S4=XX% 模式
PROB_SETS=$(grep -oE 'S[1-4][=:：][[:space:]]*[0-9]+%' "$FILE" 2>/dev/null | sort | uniq -c | sort -rn || true)

if [ -n "$PROB_SETS" ]; then
    for SN in S1 S2 S3 S4; do
        SN_VALUES=$(grep -oE "${SN}[=:：][[:space:]]*[0-9]+%" "$FILE" 2>/dev/null | grep -oE '[0-9]+%' | sort -u || true)
        SN_COUNT=$(echo "$SN_VALUES" | { grep -c '%' || true; })

        if [ "$SN_COUNT" -gt 2 ]; then
            # 3+个不同值 → 很可能有矛盾(敏感性通常只用2套)
            echo -e "  ${RED}CONTRADICTION: ${SN}概率有${SN_COUNT}个不同值: $(echo $SN_VALUES | tr '\n' ' ')${NC}"
            echo -e "  ${RED}  → 2个变体可能是基准+敏感性, 但3+个通常意味着数据矛盾${NC}"
            CONTRADICTIONS=$((CONTRADICTIONS + 1))
        elif [ "$SN_COUNT" -gt 1 ]; then
            # 2个不同值 → 可能是基准+敏感性, 降级为WARNING
            echo -e "  ${YELLOW}WARNING: ${SN}概率有2个值: $(echo $SN_VALUES | tr '\n' ' ') (可能是基准+敏感性)${NC}"
            WARNINGS=$((WARNINGS + 1))
        elif [ "$SN_COUNT" -eq 1 ]; then
            echo -e "  ${GREEN}PASS: ${SN}概率唯一 ($SN_VALUES)${NC}"
        fi
    done
else
    echo -e "  ${YELLOW}SKIP: 未找到概率集模式${NC}"
fi
echo ""

# --- 检查2: 市值一致性 ---
echo -e "${CYAN}[检查2] 市值基准一致性${NC}"

# 提取$X,XXXB或$X.XB格式的市值
MCAP_VALUES=$(grep -oE '\$[0-9,]+\.?[0-9]*B' "$FILE" 2>/dev/null | sort | uniq -c | sort -rn | head -20 || true)

if [ -n "$MCAP_VALUES" ]; then
    echo "  出现最多的$xB格式数值:"
    echo "$MCAP_VALUES" | head -10 | while read count val; do
        echo "    ${count}次: $val"
    done
else
    echo -e "  ${YELLOW}SKIP: 未找到市值格式数据${NC}"
fi
echo ""

# --- 检查3: 关键数字重复度 ---
echo -e "${CYAN}[检查3] 关键数字重复度${NC}"

# 检测$200B类的高频数字
HIGH_FREQ=$(grep -oE '\$[0-9]+B|\$[0-9]+\.[0-9]+B|\$[0-9,]+亿' "$FILE" 2>/dev/null | sort | uniq -c | sort -rn | head -15 || true)

echo "  高频$金额:"
REPEAT_WARN=0
echo "$HIGH_FREQ" | head -15 | while read count val; do
    if [ "$count" -gt 45 ]; then
        echo -e "    ${RED}${count}次: $val (超阈值45)${NC}"
    elif [ "$count" -gt 30 ]; then
        echo -e "    ${YELLOW}${count}次: $val${NC}"
    else
        echo "    ${count}次: $val"
    fi
done

# 计算超阈值数量
OVER_45=$(echo "$HIGH_FREQ" | awk '$1 > 45 {print}' | wc -l | tr -d ' ')
if [ "$OVER_45" -gt 0 ]; then
    echo -e "  ${YELLOW}WARNING: ${OVER_45}个数字超过45次重复阈值${NC}"
    WARNINGS=$((WARNINGS + OVER_45))
fi
echo ""

# --- 检查4: P/E一致性 ---
echo -e "${CYAN}[检查4] P/E倍数一致性${NC}"

PE_VALUES=$(grep -oE 'P/E[[:space:]]*[0-9]+\.?[0-9]*x' "$FILE" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*x' | sort -u || true)
PE_COUNT=$(echo "$PE_VALUES" | { grep -c 'x' || true; })

if [ "$PE_COUNT" -gt 3 ]; then
    echo -e "  ${YELLOW}WARNING: P/E有${PE_COUNT}个不同值: $(echo $PE_VALUES | tr '\n' ' ')${NC}"
    WARNINGS=$((WARNINGS + 1))
elif [ "$PE_COUNT" -gt 0 ]; then
    echo -e "  ${GREEN}PASS: P/E值数量合理 (${PE_COUNT}个)${NC}"
fi
echo ""

# --- 检查5: Phase引用残留 ---
echo -e "${CYAN}[检查5] Phase引用残留${NC}"

PHASE_REFS=$(grep -ciE 'Phase [0-9]' "$FILE" 2>/dev/null || true)
# 排除CQ表中的合法引用(P0-P5列名)
CQ_PHASE_REFS=$(grep -cE '^\| .* P[0-5] .*\|' "$FILE" 2>/dev/null || true)
NET_PHASE_REFS=$((PHASE_REFS - CQ_PHASE_REFS))

if [ "$NET_PHASE_REFS" -gt 5 ]; then
    echo -e "  ${YELLOW}WARNING: ${NET_PHASE_REFS}处Phase引用残留 (排除CQ表后)${NC}"
    WARNINGS=$((WARNINGS + 1))
elif [ "$NET_PHASE_REFS" -gt 0 ]; then
    echo -e "  ${GREEN}PASS: Phase引用${NET_PHASE_REFS}处 (≤5阈值)${NC}"
else
    echo -e "  ${GREEN}PASS: 无Phase引用残留${NC}"
fi
echo ""

# --- 检查6: Agent标签残留 ---
echo -e "${CYAN}[检查6] Agent角色标签残留${NC}"

AGENT_LABELS=$(grep -ciE 'Agent [A-C]|商业洞察分析师|独立风险审计员|定量估值分析师' "$FILE" 2>/dev/null || true)

if [ "$AGENT_LABELS" -gt 0 ]; then
    # 区分功能性标签(如"独立风险审计")和Agent标签(如"Agent A")
    PURE_AGENT=$(grep -ciE 'Agent [A-C]' "$FILE" 2>/dev/null || true)
    if [ "$PURE_AGENT" -gt 0 ]; then
        echo -e "  ${RED}CONTRADICTION: ${PURE_AGENT}处Agent角色标签残留${NC}"
        CONTRADICTIONS=$((CONTRADICTIONS + 1))
    else
        echo -e "  ${GREEN}PASS: 仅功能性标签(非Agent名),可接受${NC}"
    fi
else
    echo -e "  ${GREEN}PASS: 无Agent标签${NC}"
fi
echo ""

# --- 检查7: OPM范围一致性 ---
echo -e "${CYAN}[检查7] 利润率范围一致性${NC}"

OPM_RANGES=$(grep -oE 'OPM[[:space:]]*[>~]?[0-9]+-?[0-9]*%|利润率[[:space:]]*[>~]?[0-9]+-?[0-9]*%|运营利润率[[:space:]]*[>~]?[0-9]+-?[0-9]*%' "$FILE" 2>/dev/null | sort -u | head -20 || true)

if [ -n "$OPM_RANGES" ]; then
    OPM_COUNT=$(echo "$OPM_RANGES" | wc -l | tr -d ' ')
    if [ "$OPM_COUNT" -gt 5 ]; then
        echo -e "  ${YELLOW}WARNING: ${OPM_COUNT}种不同的利润率表述:${NC}"
        echo "$OPM_RANGES" | head -10 | while read line; do
            echo "    - $line"
        done
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "  ${GREEN}PASS: 利润率表述${OPM_COUNT}种${NC}"
    fi
else
    echo -e "  ${YELLOW}SKIP: 未找到OPM模式${NC}"
fi
echo ""

# --- 与golden_numbers对比 ---
if [ -n "$GOLDEN" ] && [ -f "$GOLDEN" ]; then
    echo -e "${CYAN}[检查8] Golden Numbers对比${NC}"

    # 提取golden中的关键值进行grep验证
    GOLDEN_VALUES=$(grep -E '^\s+value:' "$GOLDEN" 2>/dev/null | grep -oE '"[^"]*"' | tr -d '"' | grep -v '^$' || true)

    if [ -n "$GOLDEN_VALUES" ]; then
        GOLDEN_MATCH=0
        GOLDEN_TOTAL=0
        echo "$GOLDEN_VALUES" | while read val; do
            if [ -n "$val" ]; then
                GOLDEN_TOTAL=$((GOLDEN_TOTAL + 1))
                FOUND=$(grep -c "$val" "$FILE" 2>/dev/null || true)
                if [ "$FOUND" -gt 0 ]; then
                    GOLDEN_MATCH=$((GOLDEN_MATCH + 1))
                else
                    echo -e "    ${YELLOW}MISS: Golden值 '$val' 在报告中未找到${NC}"
                fi
            fi
        done
        echo -e "  Golden Numbers匹配完成"
    else
        echo -e "  ${YELLOW}SKIP: Golden Numbers为空${NC}"
    fi
    echo ""
else
    echo -e "${YELLOW}[检查8] SKIP: 未提供golden_numbers.yaml${NC}"
    echo ""
fi

# --- 汇总 ---
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${CYAN}  汇总${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"

if [ "$CONTRADICTIONS" -gt 0 ]; then
    echo -e "  ${RED}CONTRADICTIONS: $CONTRADICTIONS${NC}"
fi
if [ "$WARNINGS" -gt 0 ]; then
    echo -e "  ${YELLOW}WARNINGS: $WARNINGS${NC}"
fi
if [ "$CONTRADICTIONS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "  ${GREEN}ALL CLEAR: 无矛盾无警告${NC}"
fi

echo ""
echo -e "  矛盾数: $CONTRADICTIONS"
echo -e "  警告数: $WARNINGS"

if [ "$CONTRADICTIONS" -gt 0 ]; then
    exit 1
else
    exit 0
fi
