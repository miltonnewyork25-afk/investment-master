#!/bin/bash
# ============================================================
# verify_dm_anchors.sh — DM锚点预验证脚本 v1.0
# ============================================================
# 用法:
#   bash tests/verify_dm_anchors.sh <shared_context.md>
#   例: bash tests/verify_dm_anchors.sh data/research/GOOGL/v4_shared_context.md
#
# 功能:
#   1. 提取DM中的数值锚点($金额/百分比/倍数)
#   2. 内部一致性检查:
#      - 同一指标在不同节中的值是否一致
#      - 百分比是否在合理范围(YoY增速 ≤ ±500%)
#      - 检查常见计算关系(Revenue分部之和 vs Total)
#   3. DM格式检查:
#      - DM-XXX-NNN格式锚点ID
#      - type: H/R/S标注
#      - source标注
#   4. 新鲜度检查:
#      - 日期字段是否在30天内
#   5. 输出:
#      - PASS/FAIL状态 + 不一致列表 + DM覆盖率统计
#
# 退出码: 0=PASS(或仅WARN), 1=FAIL(严重不一致)
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
DM="${1:?用法: $0 <shared_context.md>}"

if [ ! -f "$DM" ]; then
    echo -e "${RED}FATAL: DM文件不存在: ${DM}${NC}"
    exit 1
fi

echo "=============================================="
echo -e " ${CYAN}DM Anchor Pre-Verification v1.0${NC}"
echo " 文件: $(basename "$DM")"
echo " 路径: ${DM}"
echo "=============================================="
echo ""

ERRORS=0
WARNINGS=0
SUGGESTIONS=()

# ============================================================
# SECTION 1: 数值锚点提取
# ============================================================
echo -e "${CYAN}[1/5] 提取数值锚点...${NC}"

# 提取金额: $XXB, $XX.XB, $XXM, $XX.XK, $XX,XXX
DOLLARS=$({ grep -oE '\$[0-9,]+\.?[0-9]*[BMKTbmkt]?' "$DM" | sort -u || true; })
DOLLAR_COUNT=$(echo "$DOLLARS" | { grep -c '.' || true; })
if [ -z "$DOLLARS" ]; then DOLLAR_COUNT=0; fi

# 提取百分比: XX%, XX.X%, -XX%
PCTS=$({ grep -oE '[-]?[0-9]+\.?[0-9]*%' "$DM" | sort -u || true; })
PCT_COUNT=$(echo "$PCTS" | { grep -c '.' || true; })
if [ -z "$PCTS" ]; then PCT_COUNT=0; fi

# 提取倍数: XXx, XX.Xx
MULTIPLES=$({ grep -oE '[0-9]+\.?[0-9]*x\b' "$DM" | sort -u || true; })
MULT_COUNT=$(echo "$MULTIPLES" | { grep -c '.' || true; })
if [ -z "$MULTIPLES" ]; then MULT_COUNT=0; fi

TOTAL_VALUES=$((DOLLAR_COUNT + PCT_COUNT + MULT_COUNT))

echo "  金额:   ${DOLLAR_COUNT}个唯一值"
echo "  百分比: ${PCT_COUNT}个唯一值"
echo "  倍数:   ${MULT_COUNT}个唯一值"
echo "  总计:   ${TOTAL_VALUES}个唯一数值锚点"

if [ "$TOTAL_VALUES" -eq 0 ]; then
    echo -e "${RED}  FAIL: DM中未发现任何数值锚点${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# ============================================================
# SECTION 2: 内部一致性检查
# ============================================================
echo -e "${CYAN}[2/5] 内部一致性检查...${NC}"

# --- 2a: 同一金额在不同节的一致性 ---
# 提取所有节标题(##开头)
SECTIONS=$({ grep -n '^##' "$DM" || true; })
SECTION_COUNT=$(echo "$SECTIONS" | { grep -c '.' || true; })
if [ -z "$SECTIONS" ]; then SECTION_COUNT=0; fi
echo "  DM共 ${SECTION_COUNT} 个节"

# 检查常见指标关键词在不同位置出现时对应的数值是否一致
# 策略: 对于每个关键指标词，收集同一行或相邻行的金额，检查是否一致
check_consistency() {
    local keyword="$1"
    local label="$2"

    # 找到包含该关键词的行及其数值
    local matches
    matches=$({ grep -i "$keyword" "$DM" | grep -oE '\$[0-9,]+\.?[0-9]*[BMKTbmkt]?' || true; })

    if [ -z "$matches" ]; then
        return 0
    fi

    local unique_vals
    unique_vals=$(echo "$matches" | sort -u)
    local unique_count
    unique_count=$(echo "$unique_vals" | wc -l)
    unique_count="${unique_count// /}"

    if [ "$unique_count" -gt 1 ]; then
        echo -e "  ${YELLOW}WARN: '${label}'关联了多个不同金额:${NC}"
        echo "$unique_vals" | while IFS= read -r val; do
            echo -e "    ${YELLOW}- ${val}${NC}"
        done
        WARNINGS=$((WARNINGS + 1))
        SUGGESTIONS+=("检查'${label}'在不同节中的数值是否应该一致")
        return 1
    fi
    return 0
}

# 检查常见财务指标
check_consistency "Revenue\|营收\|总收入" "Revenue/营收"
check_consistency "Net Income\|净利润\|净收入" "Net Income/净利润"
check_consistency "Market Cap\|市值" "Market Cap/市值"
check_consistency "EPS" "EPS"
check_consistency "Free Cash Flow\|FCF\|自由现金流" "FCF/自由现金流"
check_consistency "Gross Margin\|毛利率" "毛利率"

# --- 2b: 百分比合理范围检查 ---
echo ""
echo "  百分比范围检查:"

EXTREME_PCTS=0
if [ -n "$PCTS" ]; then
    while IFS= read -r pct; do
        [ -z "$pct" ] && continue
        # 提取数字部分(去掉%号和负号前缀)
        num=$(echo "$pct" | sed 's/%//' | sed 's/^-//')
        # 检查是否为有效数字
        if echo "$num" | grep -qE '^[0-9]+\.?[0-9]*$'; then
            # 检查是否超过500%
            is_extreme=$(python3 -c "print(1 if float('$num') > 500 else 0)" 2>/dev/null || echo 0)
            if [ "$is_extreme" -eq 1 ]; then
                EXTREME_PCTS=$((EXTREME_PCTS + 1))
                # 获取上下文(该百分比出现在哪一行)
                ctx=$({ grep -n "${pct}" "$DM" | head -1 || true; })
                echo -e "  ${YELLOW}WARN: 极端百分比 ${pct} — ${ctx}${NC}"
            fi
        fi
    done <<< "$PCTS"
fi

if [ "$EXTREME_PCTS" -eq 0 ]; then
    echo -e "  ${GREEN}PASS: 无极端百分比(>500%)${NC}"
else
    echo -e "  ${YELLOW}WARN: ${EXTREME_PCTS}个极端百分比(>500%)，请确认是否合理${NC}"
    WARNINGS=$((WARNINGS + EXTREME_PCTS))
fi

# --- 2c: Revenue分部加总检查 ---
echo ""
echo "  分部加总检查:"

# 查找"Total Revenue"或"总收入"行的金额
TOTAL_REV_LINE=$({ grep -i 'Total Revenue\|总收入\|总营收' "$DM" | head -1 || true; })
TOTAL_REV_VAL=$({ echo "$TOTAL_REV_LINE" | grep -oE '\$[0-9,]+\.?[0-9]*[BMKTbmkt]?' | head -1 || true; })

# 查找各分部收入行
SEGMENT_LINES=$({ grep -iE 'segment|分部|业务线|部门.*收入|.*Revenue.*:' "$DM" | grep -oE '\$[0-9,]+\.?[0-9]*[BMKTbmkt]?' || true; })

if [ -n "$TOTAL_REV_VAL" ] && [ -n "$SEGMENT_LINES" ]; then
    SEG_COUNT=$(echo "$SEGMENT_LINES" | wc -l)
    SEG_COUNT="${SEG_COUNT// /}"
    echo "  总收入: ${TOTAL_REV_VAL} | 分部数: ${SEG_COUNT}"
    echo -e "  ${YELLOW}NOTE: 请人工验证分部之和是否约等于总收入${NC}"
    SUGGESTIONS+=("验证分部收入之和是否约等于总收入 ${TOTAL_REV_VAL}")
else
    echo -e "  ${YELLOW}SKIP: 未检测到明确的总收入+分部收入结构${NC}"
fi

echo ""

# ============================================================
# SECTION 3: DM格式检查
# ============================================================
echo -e "${CYAN}[3/5] DM格式检查...${NC}"

# --- 3a: DM-XXX-NNN格式锚点ID ---
DM_IDS=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$DM" | sort -u || true; })
DM_ID_COUNT=$(echo "$DM_IDS" | { grep -c '.' || true; })
if [ -z "$DM_IDS" ]; then DM_ID_COUNT=0; fi

if [ "$DM_ID_COUNT" -eq 0 ]; then
    echo -e "  ${YELLOW}WARN: 未发现DM-XXX-NNN格式锚点ID${NC}"
    echo "  期望格式: DM-REV-001, DM-GM-002 等"
    WARNINGS=$((WARNINGS + 1))
    SUGGESTIONS+=("添加DM-XXX-NNN格式锚点ID(如DM-REV-001)")
else
    echo -e "  ${GREEN}PASS: DM锚点ID ${DM_ID_COUNT}个${NC}"
    # 检查ID是否有重复
    DM_ID_TOTAL=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$DM" | wc -l || true; })
    DM_ID_TOTAL="${DM_ID_TOTAL// /}"
    if [ "$DM_ID_TOTAL" -ne "$DM_ID_COUNT" ]; then
        DUPES=$((DM_ID_TOTAL - DM_ID_COUNT))
        echo -e "  ${YELLOW}WARN: 存在${DUPES}个重复锚点ID引用(非唯一)${NC}"
    fi
fi

# --- 3b: type: H/R/S标注 ---
TYPE_H=$({ grep -ciE 'type[: ]*H\b|类型[: ]*H\b|硬数据' "$DM" || true; })
TYPE_R=$({ grep -ciE 'type[: ]*R\b|类型[: ]*R\b|合理推断' "$DM" || true; })
TYPE_S=$({ grep -ciE 'type[: ]*S\b|类型[: ]*S\b|主观判断' "$DM" || true; })
TYPE_TOTAL=$((TYPE_H + TYPE_R + TYPE_S))

if [ "$TYPE_TOTAL" -eq 0 ]; then
    echo -e "  ${YELLOW}WARN: 未发现type H/R/S标注${NC}"
    echo "  期望: 每个锚点标注 type: H(硬数据) / R(合理推断) / S(主观判断)"
    WARNINGS=$((WARNINGS + 1))
    SUGGESTIONS+=("为锚点添加type: H/R/S标注")
else
    echo -e "  ${GREEN}PASS: type标注 ${TYPE_TOTAL}个 (H:${TYPE_H} R:${TYPE_R} S:${TYPE_S})${NC}"
    # 检查H占比是否合理(>=36%)
    if [ "$TYPE_TOTAL" -gt 0 ]; then
        H_RATIO=$(python3 -c "print(round($TYPE_H * 100 / $TYPE_TOTAL, 1))")
        if python3 -c "exit(0 if $TYPE_H * 100 / $TYPE_TOTAL >= 36 else 1)" 2>/dev/null; then
            echo -e "  ${GREEN}  硬数据占比: ${H_RATIO}% (≥36%)${NC}"
        else
            echo -e "  ${YELLOW}  WARN: 硬数据占比 ${H_RATIO}% (<36%，建议增加硬数据锚点)${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    fi
fi

# --- 3c: source标注 ---
SOURCE_COUNT=$({ grep -ciE 'source[: ]|来源[: ]|数据源[: ]' "$DM" || true; })
if [ "$SOURCE_COUNT" -eq 0 ]; then
    echo -e "  ${YELLOW}WARN: 未发现source/来源标注${NC}"
    WARNINGS=$((WARNINGS + 1))
    SUGGESTIONS+=("为锚点添加source/来源标注(如: source: FY2025 10-K)")
else
    echo -e "  ${GREEN}PASS: source标注 ${SOURCE_COUNT}处${NC}"
fi

# --- 3d: 锚点覆盖率(DM ID数 vs 总数值数) ---
if [ "$TOTAL_VALUES" -gt 0 ] && [ "$DM_ID_COUNT" -gt 0 ]; then
    ANCHOR_COVERAGE=$(python3 -c "print(round($DM_ID_COUNT * 100 / $TOTAL_VALUES, 1))")
    echo -e "  锚点覆盖率: ${DM_ID_COUNT}/${TOTAL_VALUES} = ${ANCHOR_COVERAGE}%"
fi

echo ""

# ============================================================
# SECTION 4: 新鲜度检查
# ============================================================
echo -e "${CYAN}[4/5] 新鲜度检查...${NC}"

# 提取DM中的所有日期
DM_DATES=$({ grep -oE '20[0-9]{2}-[0-1][0-9]-[0-3][0-9]' "$DM" | sort -u || true; })
DM_DATE_COUNT=$(echo "$DM_DATES" | { grep -c '.' || true; })
if [ -z "$DM_DATES" ]; then DM_DATE_COUNT=0; fi

if [ "$DM_DATE_COUNT" -eq 0 ]; then
    echo -e "  ${YELLOW}WARN: DM中未发现日期(YYYY-MM-DD格式)${NC}"
    WARNINGS=$((WARNINGS + 1))
    SUGGESTIONS+=("添加数据截止日期")
else
    # 找最新日期
    LATEST_DATE=$(echo "$DM_DATES" | sort | tail -1)
    OLDEST_DATE=$(echo "$DM_DATES" | sort | head -1)
    echo "  日期范围: ${OLDEST_DATE} ~ ${LATEST_DATE}"
    echo "  唯一日期: ${DM_DATE_COUNT}个"

    # 检查最新日期是否在30天内
    TODAY=$(date +%Y-%m-%d)
    # macOS BSD date: 计算30天前的日期
    if date -v-30d +%Y-%m-%d > /dev/null 2>&1; then
        # macOS BSD date
        CUTOFF=$(date -v-30d +%Y-%m-%d)
    else
        # GNU date
        CUTOFF=$(date -d "30 days ago" +%Y-%m-%d)
    fi

    if [[ "$LATEST_DATE" > "$CUTOFF" ]] || [[ "$LATEST_DATE" == "$CUTOFF" ]]; then
        echo -e "  ${GREEN}PASS: 最新日期 ${LATEST_DATE} 在30天内 (截止: ${CUTOFF})${NC}"
    else
        echo -e "  ${RED}FAIL: 最新日期 ${LATEST_DATE} 超过30天 (截止: ${CUTOFF})${NC}"
        echo -e "  ${RED}  DM数据可能过时，建议用MCP工具刷新${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# 检查财报日期标识
FISCAL_REFS=$({ grep -ciE 'FY20[0-9]{2}|Q[1-4].*20[0-9]{2}|[0-9]{4}Q[1-4]|财年|季度' "$DM" || true; })
echo "  财报周期引用: ${FISCAL_REFS}处"

echo ""

# ============================================================
# SECTION 5: 汇总
# ============================================================
echo -e "${CYAN}[5/5] 汇总...${NC}"
echo ""

# DM文件大小统计
DM_CHARS=$(wc -m < "$DM")
DM_CHARS="${DM_CHARS// /}"
DM_LINES=$(wc -l < "$DM")
DM_LINES="${DM_LINES// /}"

echo "=============================================="
echo -e " ${CYAN}DM Anchor Verification v1.0 检查完成${NC}"
echo "=============================================="
echo " 文件:     $(basename "$DM")"
echo " 大小:     ${DM_CHARS}字符 / ${DM_LINES}行"
echo " 节数:     ${SECTION_COUNT}"
echo ""
echo " --- 数值锚点 ---"
echo " 金额:     ${DOLLAR_COUNT} | 百分比: ${PCT_COUNT} | 倍数: ${MULT_COUNT}"
echo " 总计:     ${TOTAL_VALUES}个唯一数值"
echo ""
echo " --- 格式质量 ---"
echo " DM-ID:    ${DM_ID_COUNT}个"
echo " Type标注: ${TYPE_TOTAL}个 (H:${TYPE_H} R:${TYPE_R} S:${TYPE_S})"
echo " Source:   ${SOURCE_COUNT}处"
echo ""
echo " --- 检查结果 ---"
echo -e " 错误:     ${RED}${ERRORS}${NC}"
echo -e " 警告:     ${YELLOW}${WARNINGS}${NC}"
echo "=============================================="

# 输出建议修正列表
if [ ${#SUGGESTIONS[@]} -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}建议修正:${NC}"
    for idx in "${!SUGGESTIONS[@]}"; do
        echo -e "  ${YELLOW}$((idx + 1)). ${SUGGESTIONS[$idx]}${NC}"
    done
fi

# 最终判定
echo ""
if [ "$ERRORS" -gt 0 ]; then
    echo -e "${RED}══════════════════════════════════════════${NC}"
    echo -e "${RED}  RESULT: FAIL (${ERRORS}项严重问题)${NC}"
    echo -e "${RED}  建议修正后再开始写作Phase${NC}"
    echo -e "${RED}══════════════════════════════════════════${NC}"
    exit 1
elif [ "$WARNINGS" -gt 5 ]; then
    echo -e "${YELLOW}══════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  RESULT: PASS with ${WARNINGS} warnings${NC}"
    echo -e "${YELLOW}  建议处理WARN项以提高DM质量${NC}"
    echo -e "${YELLOW}══════════════════════════════════════════${NC}"
    exit 0
else
    echo -e "${GREEN}══════════════════════════════════════════${NC}"
    if [ "$WARNINGS" -gt 0 ]; then
        echo -e "${GREEN}  RESULT: PASS with ${WARNINGS} minor warnings${NC}"
    else
        echo -e "${GREEN}  RESULT: ALL CHECKS PASSED${NC}"
    fi
    echo -e "${GREEN}══════════════════════════════════════════${NC}"
    exit 0
fi
