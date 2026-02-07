#!/bin/bash
# research_fast.sh — 投资研究报告质量门控脚本 v1.0
# 用法: bash tests/research_fast.sh <报告文件> <最低字符数> <最低标注密度/万字>
# 示例: bash tests/research_fast.sh reports/PG_Phase3_AgentI_Moat.md 13000 15
# 退出码: 0=PASS, 1=FAIL

set -uo pipefail

# ====== 参数解析 ======
FILE="${1:?用法: research_fast.sh <文件路径> <最低字符数> <最低标注密度/万字>}"
MIN_CHARS="${2:?请提供最低字符数 (wc -m)}"
MIN_DENSITY="${3:-15}"  # 默认15个标注/万字符

# ====== 颜色输出 ======
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

pass() { echo -e "${GREEN}[PASS]${NC} $1"; PASS=$((PASS + 1)); }
fail() { echo -e "${RED}[FAIL]${NC} $1"; FAIL=$((FAIL + 1)); }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; WARN=$((WARN + 1)); }

echo "================================================"
echo "  投资研究报告质量门控 v1.0"
echo "  文件: $FILE"
echo "  目标: ≥${MIN_CHARS}字符, ≥${MIN_DENSITY}标注/万字"
echo "================================================"
echo ""

# ====== Check 1: 文件存在 ======
if [[ ! -f "$FILE" ]]; then
    fail "文件不存在: $FILE"
    echo ""
    echo "总结: 0 PASS / 1 FAIL"
    exit 1
fi
pass "文件存在"

# ====== Check 2: 字符数 (wc -m) ======
CHAR_COUNT=$(wc -m < "$FILE" | tr -d ' ')
if (( CHAR_COUNT >= MIN_CHARS )); then
    pass "字符数: ${CHAR_COUNT} ≥ ${MIN_CHARS}"
else
    fail "字符数: ${CHAR_COUNT} < ${MIN_CHARS} (差 $((MIN_CHARS - CHAR_COUNT)))"
fi

# ====== Check 3: 标注总数 ======
# 匹配三层标注: [硬数据:...], [合理推断:...], [主观判断:...]
# 用 { grep || true; } 避免 pipefail 导致的非零退出
HARD_COUNT=$({ grep -oE '\[硬数据:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
INFER_COUNT=$({ grep -oE '\[合理推断:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
SUBJ_COUNT=$({ grep -oE '\[主观判断:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')

# 兼容旧格式
OLD_A=$({ grep -oE '\[A:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
OLD_B=$({ grep -oE '\[B:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
OLD_P=$({ grep -oE '\[P:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
OLD_E=$({ grep -oE '\[E:[^]]*\]' "$FILE" || true; } | wc -l | tr -d ' ')
OLD_TOTAL=$((OLD_A + OLD_B + OLD_P + OLD_E))

TOTAL_ANNOTATIONS=$((HARD_COUNT + INFER_COUNT + SUBJ_COUNT + OLD_TOTAL))

# 标注密度 = 总标注 / (字符数/10000)
if (( CHAR_COUNT > 0 )); then
    # 用整数运算: density = total * 10000 / char_count
    DENSITY_X100=$((TOTAL_ANNOTATIONS * 1000000 / CHAR_COUNT))
    DENSITY_INT=$((DENSITY_X100 / 100))
    DENSITY_FRAC=$((DENSITY_X100 % 100))
    DENSITY_DISPLAY="${DENSITY_INT}.${DENSITY_FRAC}"
else
    DENSITY_DISPLAY="0"
    DENSITY_X100=0
fi

MIN_DENSITY_X100=$((MIN_DENSITY * 100))

if (( DENSITY_X100 >= MIN_DENSITY_X100 )); then
    pass "标注密度: ${DENSITY_DISPLAY}/万字 ≥ ${MIN_DENSITY}/万字 (共${TOTAL_ANNOTATIONS}个)"
else
    fail "标注密度: ${DENSITY_DISPLAY}/万字 < ${MIN_DENSITY}/万字 (共${TOTAL_ANNOTATIONS}个)"
fi

# ====== Check 4: 硬数据占比 ≥ 40% ======
HARD_TOTAL=$((HARD_COUNT + OLD_A + OLD_B + OLD_P))
if (( TOTAL_ANNOTATIONS > 0 )); then
    HARD_PCT=$((HARD_TOTAL * 100 / TOTAL_ANNOTATIONS))
else
    HARD_PCT=0
fi

if (( HARD_PCT >= 40 )); then
    pass "硬数据占比: ${HARD_PCT}% ≥ 40% (${HARD_TOTAL}/${TOTAL_ANNOTATIONS})"
else
    fail "硬数据占比: ${HARD_PCT}% < 40% (${HARD_TOTAL}/${TOTAL_ANNOTATIONS})"
fi

# ====== Check 5: So What段落存在 ======
SO_WHAT_COUNT=$({ grep -ciE 'so what|投资含义|核心洞察|关键启示' "$FILE" || true; } | tr -d ' ')
if (( SO_WHAT_COUNT > 0 )); then
    pass "So What段落: 找到${SO_WHAT_COUNT}处"
else
    warn "So What段落: 未找到 (建议添加 'So What' / '投资含义' / '核心洞察' 段落)"
fi

# ====== 输出摘要 ======
echo ""
echo "================================================"
echo "  摘要"
echo "------------------------------------------------"
echo "  字符数:     ${CHAR_COUNT}"
echo "  标注分布:   硬数据=${HARD_COUNT} 合理推断=${INFER_COUNT} 主观判断=${SUBJ_COUNT}"
if (( OLD_TOTAL > 0 )); then
    echo "  旧格式标注: A=${OLD_A} B=${OLD_B} P=${OLD_P} E=${OLD_E} (建议迁移到v21.0格式)"
fi
echo "  标注总数:   ${TOTAL_ANNOTATIONS}"
echo "  标注密度:   ${DENSITY_DISPLAY}/万字"
echo "  硬数据占比: ${HARD_PCT}%"
echo "------------------------------------------------"
echo -e "  结果: ${GREEN}${PASS} PASS${NC} / ${RED}${FAIL} FAIL${NC} / ${YELLOW}${WARN} WARN${NC}"
echo "================================================"

if (( FAIL > 0 )); then
    exit 1
else
    exit 0
fi
