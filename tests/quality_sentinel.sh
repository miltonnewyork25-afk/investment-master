#!/bin/bash
# ============================================================
# quality_sentinel.sh — 质量哨兵脚本 v1.0 (QSA)
# ============================================================
# 用法:
#   ./tests/quality_sentinel.sh <staging文件.md> [shared_context.md] [目标字数]
#   例: ./tests/quality_sentinel.sh \
#       staging/GOOGL_P1_Agent_A.md \
#       reports/GOOGL/data/shared_context.md \
#       15000
#
# 功能: 每个Agent staging产出后自动运行，实时检查质量
#   1. 字符数检查 (vs 目标)
#   2. 标注密度检查 (≥25/万 地板)
#   3. 无源数字检测 (grep孤儿数字)
#   4. 发布合规检查 (禁用词)
#   5. EC引用完备性 (有EC引用的数字比例)
#   6. shared_context一致性 (报告数字 vs DM/EC数据)
#
# 退出码: 0=全部PASS, 1=有FAIL, 2=有WARN(无FAIL)
# ============================================================

STAGING="${1:?用法: $0 <staging文件.md> [shared_context.md] [目标字数]}"
DM="${2:-}"
TARGET_CHARS="${3:-15000}"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 计数器 ---
PASS_COUNT=0
WARN_COUNT=0
FAIL_COUNT=0

check_pass() {
    echo -e "  ${GREEN}PASS${NC} $1"
    PASS_COUNT=$((PASS_COUNT + 1))
}

check_warn() {
    echo -e "  ${YELLOW}WARN${NC} $1"
    WARN_COUNT=$((WARN_COUNT + 1))
}

check_fail() {
    echo -e "  ${RED}FAIL${NC} $1"
    FAIL_COUNT=$((FAIL_COUNT + 1))
}

# 检查文件存在
if [ ! -f "$STAGING" ]; then
    echo -e "${RED}FATAL: 文件不存在: $STAGING${NC}"
    exit 1
fi

FILENAME=$(basename "$STAGING")
echo "=============================================="
echo -e " ${CYAN}Quality Sentinel v1.0 (QSA)${NC}"
echo "=============================================="
echo " 文件: $FILENAME"
echo " 目标: ${TARGET_CHARS} chars"
echo "----------------------------------------------"

# ============================================================
# Check 1: 字符数
# ============================================================
echo ""
echo -e "${CYAN}[1/6] 字符数检查${NC}"
CHAR_COUNT=$(wc -m < "$STAGING" | tr -d ' ')
RATIO=$(echo "scale=1; $CHAR_COUNT * 100 / $TARGET_CHARS" | bc 2>/dev/null || echo "0")

if [ "$CHAR_COUNT" -ge "$TARGET_CHARS" ]; then
    check_pass "字符数: ${CHAR_COUNT} (${RATIO}% of target)"
elif [ "$CHAR_COUNT" -ge $((TARGET_CHARS * 70 / 100)) ]; then
    check_warn "字符数: ${CHAR_COUNT} (${RATIO}% of target, 70-99%)"
else
    check_fail "字符数: ${CHAR_COUNT} (${RATIO}% of target, <70%)"
fi

# ============================================================
# Check 2: 标注密度 (≥25/万 地板)
# ============================================================
echo ""
echo -e "${CYAN}[2/6] 标注密度检查${NC}"
# 计算标注数: [硬数据 | [合理推断 | [主观假设 | EC- | DM-
ANNOTATION_COUNT=$({ grep -oE '\[(硬数据|合理推断|主观假设|分析师估计|行业数据)[^]]*\]' "$STAGING" 2>/dev/null || true; } | wc -l | tr -d ' ')
EC_COUNT=$({ grep -oE 'EC-[A-Z]+-[0-9]+' "$STAGING" 2>/dev/null || true; } | wc -l | tr -d ' ')
DM_COUNT=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$STAGING" 2>/dev/null || true; } | wc -l | tr -d ' ')
TOTAL_ANNOTATIONS=$((ANNOTATION_COUNT + EC_COUNT + DM_COUNT))

if [ "$CHAR_COUNT" -gt 0 ]; then
    DENSITY=$(echo "scale=1; $TOTAL_ANNOTATIONS * 10000 / $CHAR_COUNT" | bc 2>/dev/null || echo "0")
else
    DENSITY="0"
fi

if [ "$(echo "$DENSITY >= 25" | bc 2>/dev/null || echo 0)" -eq 1 ]; then
    check_pass "标注密度: ${DENSITY}/万 (${TOTAL_ANNOTATIONS}个标注, 地板25)"
elif [ "$(echo "$DENSITY >= 15" | bc 2>/dev/null || echo 0)" -eq 1 ]; then
    check_warn "标注密度: ${DENSITY}/万 (低于25地板, ${TOTAL_ANNOTATIONS}个标注)"
else
    check_fail "标注密度: ${DENSITY}/万 (严重不足, ${TOTAL_ANNOTATIONS}个标注)"
fi

# ============================================================
# Check 3: 无源数字检测
# ============================================================
echo ""
echo -e "${CYAN}[3/6] 无源数字检测${NC}"
# 检测独立数字(排除日期/版本号/章节号/页码)
# 寻找 $XXX / XX% / XX亿 / XX.XB 等财务数字
TOTAL_NUMBERS=$({ grep -oE '\$[0-9,.]+[BMKTbmkt]?' "$STAGING" 2>/dev/null || true; } | wc -l | tr -d ' ')
TOTAL_PERCENTS=$({ grep -oE '[0-9]+\.?[0-9]*%' "$STAGING" 2>/dev/null || true; } | wc -l | tr -d ' ')
TOTAL_FINANCIAL=$((TOTAL_NUMBERS + TOTAL_PERCENTS))

# 数字后500字符内有标注引用
if [ "$TOTAL_FINANCIAL" -gt 0 ]; then
    # 简化检测: 有EC/DM/标注的行数 vs 有数字的行数
    LINES_WITH_NUMBERS=$({ grep -cE '\$[0-9,.]+|[0-9]+\.?[0-9]*%' "$STAGING" 2>/dev/null || true; })
    LINES_WITH_SOURCE=$({ grep -cE '\[(硬数据|合理推断|主观假设|EC-|DM-)' "$STAGING" 2>/dev/null || true; })

    if [ "$LINES_WITH_NUMBERS" -gt 0 ]; then
        SOURCE_RATIO=$(echo "scale=0; $LINES_WITH_SOURCE * 100 / $LINES_WITH_NUMBERS" | bc 2>/dev/null || echo "0")
    else
        SOURCE_RATIO="100"
    fi

    if [ "$SOURCE_RATIO" -ge 60 ]; then
        check_pass "数字来源覆盖: ~${SOURCE_RATIO}% (${TOTAL_FINANCIAL}个财务数字)"
    elif [ "$SOURCE_RATIO" -ge 40 ]; then
        check_warn "数字来源覆盖: ~${SOURCE_RATIO}% (部分数字缺少来源标注)"
    else
        check_fail "数字来源覆盖: ~${SOURCE_RATIO}% (大量数字缺少来源标注)"
    fi
else
    check_pass "数字来源覆盖: 无财务数字需要检查"
fi

# ============================================================
# Check 4: 发布合规 (第零律)
# ============================================================
echo ""
echo -e "${CYAN}[4/6] 发布合规检查${NC}"
VIOLATIONS=0
VIOLATION_DETAILS=""

# 检查禁用词
for TERM in "入侵台湾" "invade Taiwan" "invasion of Taiwan" "China invades" "中国入侵"; do
    FOUND=$({ grep -ci "$TERM" "$STAGING" 2>/dev/null || true; })
    if [ "$FOUND" -gt 0 ]; then
        VIOLATIONS=$((VIOLATIONS + FOUND))
        VIOLATION_DETAILS="${VIOLATION_DETAILS}\n    - \"${TERM}\" ×${FOUND}"
    fi
done

# 检查仓位建议禁用词
for TERM in "加仓" "减仓" "持仓" "建仓" "仓位比例" "买入" "卖出"; do
    FOUND=$({ grep -ci "$TERM" "$STAGING" 2>/dev/null || true; })
    if [ "$FOUND" -gt 0 ]; then
        VIOLATIONS=$((VIOLATIONS + FOUND))
        VIOLATION_DETAILS="${VIOLATION_DETAILS}\n    - \"${TERM}\" ×${FOUND} (v9.0禁止仓位建议)"
    fi
done

if [ "$VIOLATIONS" -eq 0 ]; then
    check_pass "发布合规: 0违规"
else
    check_fail "发布合规: ${VIOLATIONS}个违规${VIOLATION_DETAILS}"
fi

# ============================================================
# Check 5: EC引用完备性
# ============================================================
echo ""
echo -e "${CYAN}[5/6] EC/DM引用完备性${NC}"
EC_REFS=$((EC_COUNT + DM_COUNT))

if [ "$EC_REFS" -ge 10 ]; then
    check_pass "EC/DM引用: ${EC_REFS}个 (充分)"
elif [ "$EC_REFS" -ge 3 ]; then
    check_warn "EC/DM引用: ${EC_REFS}个 (建议≥10)"
elif [ "$TOTAL_FINANCIAL" -gt 20 ] && [ "$EC_REFS" -lt 3 ]; then
    check_fail "EC/DM引用: ${EC_REFS}个 (有${TOTAL_FINANCIAL}个财务数字但几乎无EC引用)"
else
    check_pass "EC/DM引用: ${EC_REFS}个 (内容非数据密集型)"
fi

# ============================================================
# Check 6: shared_context一致性 (如提供DM文件)
# ============================================================
echo ""
echo -e "${CYAN}[6/6] 数据一致性检查${NC}"
if [ -n "$DM" ] && [ -f "$DM" ]; then
    # 提取staging中引用的EC/DM编号
    REFS_IN_STAGING=$({ grep -oE '(EC|DM)-[A-Z]+-[0-9]+' "$STAGING" 2>/dev/null | sort -u || true; })
    REFS_IN_DM=$({ grep -oE '(EC|DM)-[A-Z]+-[0-9]+' "$DM" 2>/dev/null | sort -u || true; })

    if [ -n "$REFS_IN_STAGING" ]; then
        TOTAL_REFS=$(echo "$REFS_IN_STAGING" | wc -l | tr -d ' ')
        # 检查staging引用的EC是否都在DM中存在
        MISSING=0
        while IFS= read -r ref; do
            if ! echo "$REFS_IN_DM" | grep -q "$ref" 2>/dev/null; then
                MISSING=$((MISSING + 1))
            fi
        done <<< "$REFS_IN_STAGING"

        if [ "$MISSING" -eq 0 ]; then
            check_pass "数据一致性: ${TOTAL_REFS}个引用全部在shared_context中找到"
        elif [ "$MISSING" -le 3 ]; then
            check_warn "数据一致性: ${MISSING}/${TOTAL_REFS}个引用未在shared_context中找到"
        else
            check_fail "数据一致性: ${MISSING}/${TOTAL_REFS}个引用未在shared_context中找到"
        fi
    else
        check_pass "数据一致性: 无EC/DM引用需要验证"
    fi
else
    echo -e "  ${YELLOW}SKIP${NC} 未提供shared_context.md，跳过一致性检查"
fi

# ============================================================
# 汇总
# ============================================================
echo ""
echo "=============================================="
TOTAL=$((PASS_COUNT + WARN_COUNT + FAIL_COUNT))
echo -e " 检查结果: ${GREEN}${PASS_COUNT} PASS${NC} | ${YELLOW}${WARN_COUNT} WARN${NC} | ${RED}${FAIL_COUNT} FAIL${NC} (共${TOTAL}项)"

if [ "$FAIL_COUNT" -gt 0 ]; then
    echo -e " ${RED}状态: FAIL — 需要修复后继续${NC}"
    echo "=============================================="
    exit 1
elif [ "$WARN_COUNT" -gt 0 ]; then
    echo -e " ${YELLOW}状态: WARN — 可继续，建议改善${NC}"
    echo "=============================================="
    exit 2
else
    echo -e " ${GREEN}状态: PASS — 质量达标${NC}"
    echo "=============================================="
    exit 0
fi
