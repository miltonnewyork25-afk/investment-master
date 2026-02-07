#!/bin/bash
# ============================================================
# research_fast.sh — 投资研究报告快速质量门控 v1.0
# ============================================================
# 用法:
#   ./tests/research_fast.sh <报告文件.md> [最低字符数] [tier]
#   例: ./tests/research_fast.sh reports/AMD_Phase1.md 20000 3
#
# 门控项:
#   G1. 字符数 (wc -m) ≥ 最低要求
#   G2. 数据标注密度 ≥ 15个/万字符 (Tier 3)
#   G3. 必需章节检查 (免责声明/目录)
#   G4. Mermaid图表语法基础检查
#   G5. 禁止词检查 ("众所周知"/"建议买入" 等)
#   G6. 数据源标注格式校验
#   G7. Kill Switch / 可验证预测数量检查 (Phase 4)
#
# 退出码: 0=全部通过, 1=有失败项
# ============================================================

# --- 参数 ---
FILE="${1:?用法: $0 <报告文件.md> [最低字符数] [tier]}"
MIN_CHARS="${2:-20000}"
TIER="${3:-3}"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

# 辅助函数: 安全计数grep匹配数
count_matches() {
    local pattern="$1"
    local file="$2"
    local flags="${3:--oE}"
    local result
    result=$(grep $flags "$pattern" "$file" 2>/dev/null | wc -l) || true
    echo "${result// /}"
}

echo "========================================"
echo " Research Fast Gate v1.0"
echo " 文件: $(basename "$FILE")"
echo " 最低字符: $MIN_CHARS | Tier: $TIER"
echo "========================================"
echo ""

# 检查文件存在
if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: $FILE${NC}"
    exit 1
fi

# --- G1: 字符数检查 (wc -m = Unicode字符) ---
CHARS=$(wc -m < "$FILE")
CHARS="${CHARS// /}"
if [ "$CHARS" -lt "$MIN_CHARS" ]; then
    echo -e "${RED}FAIL G1: 字符数 ${CHARS} < 最低要求 ${MIN_CHARS}${NC}"
    ERRORS=$((ERRORS+1))
else
    DIFF=$((CHARS - MIN_CHARS))
    echo -e "${GREEN}PASS G1: 字符数 ${CHARS} (超出 +${DIFF})${NC}"
fi

# --- G2: 数据标注密度 ---
OLD_ANNOTATIONS=$(count_matches '\[(A|B|P|E):' "$FILE")
NEW_ANNOTATIONS=$(count_matches '\[(硬数据|合理推断|主观判断):' "$FILE")
ANNOTATIONS=$((OLD_ANNOTATIONS + NEW_ANNOTATIONS))
if [ "$CHARS" -gt 0 ]; then
    DENSITY=$(python3 -c "print(round($ANNOTATIONS * 10000 / $CHARS, 1))")
else
    DENSITY=0
fi

if [ "$TIER" -ge 3 ]; then
    MIN_DENSITY=15
else
    MIN_DENSITY=8
fi

DENSITY_OK=$(python3 -c "print(1 if $DENSITY >= $MIN_DENSITY else 0)")
if [ "$DENSITY_OK" -eq 0 ]; then
    echo -e "${RED}FAIL G2: 标注密度 ${DENSITY}/万字符 < 要求 ${MIN_DENSITY}/万字符 (标注总数: ${ANNOTATIONS})${NC}"
    ERRORS=$((ERRORS+1))
else
    echo -e "${GREEN}PASS G2: 标注密度 ${DENSITY}/万字符 (标注总数: ${ANNOTATIONS})${NC}"
fi

# --- G3: 必需章节检查 ---
MISSING_SECTIONS=0

if ! grep -q '免责声明\|不构成投资建议\|投资决策需结合' "$FILE" 2>/dev/null; then
    echo -e "${RED}FAIL G3a: 缺少免责声明${NC}"
    MISSING_SECTIONS=$((MISSING_SECTIONS+1))
else
    echo -e "${GREEN}PASS G3a: 免责声明存在${NC}"
fi

TOC_ITEMS=$(grep -cE '^\- \[?[0-9]+\.[0-9]+|^## Phase|^# 目录|^## 全报告目录' "$FILE" 2>/dev/null || echo 0)
if [ "$TOC_ITEMS" -lt 3 ]; then
    echo -e "${YELLOW}WARN G3b: 目录条目较少 (${TOC_ITEMS}个)，可能缺少目录${NC}"
    WARNINGS=$((WARNINGS+1))
else
    echo -e "${GREEN}PASS G3b: 目录检测到 ${TOC_ITEMS} 个条目${NC}"
fi

if [ "$MISSING_SECTIONS" -gt 0 ]; then
    ERRORS=$((ERRORS+MISSING_SECTIONS))
fi

# --- G4: Mermaid图表基础检查 ---
MERMAID_OPEN=$(grep -c '```mermaid' "$FILE" 2>/dev/null || echo 0)
if [ "$MERMAID_OPEN" -gt 0 ]; then
    echo -e "${GREEN}PASS G4: 检测到 ${MERMAID_OPEN} 个Mermaid图表${NC}"
else
    if [ "$TIER" -ge 3 ]; then
        echo -e "${YELLOW}WARN G4: 未检测到Mermaid图表 (Tier 3建议≥3个)${NC}"
        WARNINGS=$((WARNINGS+1))
    else
        echo -e "${GREEN}PASS G4: Mermaid检查跳过 (非Tier 3)${NC}"
    fi
fi

# --- G5: 禁止词检查 ---
FORBIDDEN_WORDS=("众所周知" "建议买入" "建议卖出" "强烈推荐买入" "必须购买")
FORBIDDEN_FOUND=0
for word in "${FORBIDDEN_WORDS[@]}"; do
    COUNT=$(grep -o "$word" "$FILE" 2>/dev/null | wc -l) || true
    COUNT="${COUNT// /}"
    if [ -n "$COUNT" ] && [ "$COUNT" -gt 0 ]; then
        echo -e "${RED}FAIL G5: 发现禁止词 \"${word}\" (${COUNT}处)${NC}"
        FORBIDDEN_FOUND=$((FORBIDDEN_FOUND+1))
    fi
done
if [ "$FORBIDDEN_FOUND" -eq 0 ]; then
    echo -e "${GREEN}PASS G5: 未发现禁止词${NC}"
else
    ERRORS=$((ERRORS+1))
fi

# --- G6: 数据源标注格式校验 ---
BAD_ANNOTATIONS=$(count_matches '\[(A|B|P|E):[^]]{200,}' "$FILE")
if [ "$BAD_ANNOTATIONS" -gt 0 ]; then
    echo -e "${YELLOW}WARN G6: 发现 ${BAD_ANNOTATIONS} 个可能未闭合的数据标注 (超长)${NC}"
    WARNINGS=$((WARNINGS+1))
else
    echo -e "${GREEN}PASS G6: 数据标注格式正常${NC}"
fi

A_COUNT=$(count_matches '\[A:' "$FILE")
B_COUNT=$(count_matches '\[B:' "$FILE")
P_COUNT=$(count_matches '\[P:' "$FILE")
E_COUNT=$(count_matches '\[E:' "$FILE")
HARD_COUNT=$(count_matches '\[硬数据:' "$FILE")
INFER_COUNT=$(count_matches '\[合理推断:' "$FILE")
SUBJ_COUNT=$(count_matches '\[主观判断:' "$FILE")
echo "       旧格式: [A]=${A_COUNT} [B]=${B_COUNT} [P]=${P_COUNT} [E]=${E_COUNT}"
echo "       新格式: [硬数据]=${HARD_COUNT} [合理推断]=${INFER_COUNT} [主观判断]=${SUBJ_COUNT}"

# --- G7: Phase 4 专项检查 (Kill Switch / 预测) ---
HAS_PHASE4=$(grep -qi 'phase 4\|对抗审查\|决策输出\|kill switch' "$FILE" 2>/dev/null && echo 1 || echo 0)
if [ "$HAS_PHASE4" -eq 1 ]; then
    KS_COUNT=$(count_matches 'KS-[0-9]+|Kill Switch' "$FILE" "-oiE")
    if [ "$KS_COUNT" -lt 10 ]; then
        echo -e "${YELLOW}WARN G7a: Kill Switch提及数 ${KS_COUNT} (建议≥15)${NC}"
        WARNINGS=$((WARNINGS+1))
    else
        echo -e "${GREEN}PASS G7a: Kill Switch提及数 ${KS_COUNT}${NC}"
    fi

    BEAR_COUNT=$(count_matches '看空论点|bear.*case|看空.*#' "$FILE" "-oiE")
    if [ "$BEAR_COUNT" -lt 5 ]; then
        echo -e "${YELLOW}WARN G7b: 看空论点提及数 ${BEAR_COUNT} (要求≥8)${NC}"
        WARNINGS=$((WARNINGS+1))
    else
        echo -e "${GREEN}PASS G7b: 看空论点提及数 ${BEAR_COUNT}${NC}"
    fi
else
    echo -e "${GREEN}PASS G7: 非Phase 4文件，跳过Kill Switch/预测检查${NC}"
fi

# --- 汇总 ---
echo ""
echo "========================================"
echo " 检查完成"
echo "========================================"
echo " 文件: $(basename "$FILE")"
echo " 字符: ${CHARS} / ${MIN_CHARS}"
echo " 标注: ${ANNOTATIONS} (密度: ${DENSITY}/万字符)"
echo " Mermaid: ${MERMAID_OPEN} 个"
echo -e " 错误: ${RED}${ERRORS}${NC} | 警告: ${YELLOW}${WARNINGS}${NC}"
echo "========================================"

if [ "$ERRORS" -gt 0 ]; then
    echo ""
    echo -e "${RED}RESULT: FAILED (${ERRORS} 个门控未通过)${NC}"
    exit 1
else
    if [ "$WARNINGS" -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}RESULT: PASSED with ${WARNINGS} warnings${NC}"
    else
        echo ""
        echo -e "${GREEN}RESULT: ALL GATES PASSED${NC}"
    fi
    exit 0
fi
