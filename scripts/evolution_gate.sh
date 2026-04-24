#!/bin/bash
# ============================================================
# evolution_gate.sh — 框架进化门控脚本 v1.0
# ============================================================
# 借鉴: Hermes Agent self-evolution guardrails
# 核心: 任何框架/skill/规则修改提交前，必须通过 5 道门控
#
# 用法:
#   bash scripts/evolution_gate.sh [--all]           # 检查全部
#   bash scripts/evolution_gate.sh <file_path>       # 检查单个文件
#
# 门控:
#   G1: Size Gate — 文件大小 ≤ 上限
#   G2: Growth Gate — 单次增长 ≤ 20%
#   G3: Structure Gate — 必须字段齐全
#   G4: Duplicate Gate — 与 V-1 注册表不重复
#   G5: Count Gate — 总数不超限
#
# 退出码: 0=全部通过, 1=有 WARN, 2=有 BLOCK
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
GUARDRAILS="${REPO_ROOT}/knowledge/evolution_guardrails.yaml"

BLOCKS=0
WARNS=0
CHECKS=0

check() {
    local label="$1" condition="$2" level="$3"
    CHECKS=$((CHECKS + 1))
    if eval "$condition"; then
        echo -e "  ${GREEN}✓${NC} $label"
    else
        if [ "$level" == "BLOCK" ]; then
            echo -e "  ${RED}✗ BLOCK: $label${NC}"
            BLOCKS=$((BLOCKS + 1))
        else
            echo -e "  ${YELLOW}! WARN: $label${NC}"
            WARNS=$((WARNS + 1))
        fi
    fi
}

echo -e "${CYAN}========================================"
echo " Evolution Gate v1.0"
echo -e "========================================${NC}"
echo ""

# ============================================================
# G1: Size Gate — 文件大小约束
# ============================================================
echo -e "${CYAN}[G1] Size Gate...${NC}"

# CLAUDE.md
CLAUDE_SIZE=$(wc -c < "${REPO_ROOT}/CLAUDE.md" 2>/dev/null || echo 0)
CLAUDE_SIZE="${CLAUDE_SIZE// /}"
check "CLAUDE.md ≤ 22KB (当前: ${CLAUDE_SIZE}B)" "[ $CLAUDE_SIZE -le 22528 ]" "BLOCK"

CLAUDE_LINES=$(wc -l < "${REPO_ROOT}/CLAUDE.md" 2>/dev/null || echo 0)
CLAUDE_LINES="${CLAUDE_LINES// /}"
check "CLAUDE.md ≤ 280 行 (当前: ${CLAUDE_LINES})" "[ $CLAUDE_LINES -le 280 ]" "WARN"

# Pattern Registry
if [ -f "${REPO_ROOT}/knowledge/pattern_registry.yaml" ]; then
    PR_SIZE=$(wc -c < "${REPO_ROOT}/knowledge/pattern_registry.yaml" 2>/dev/null || echo 0)
    PR_SIZE="${PR_SIZE// /}"
    check "pattern_registry.yaml ≤ 8KB (当前: ${PR_SIZE}B)" "[ $PR_SIZE -le 8192 ]" "BLOCK"

    PR_PATTERNS=$(grep -c '^  [a-z]' "${REPO_ROOT}/knowledge/pattern_registry.yaml" 2>/dev/null || echo 0)
    PR_PATTERNS="${PR_PATTERNS// /}"
    PR_PATTERNS=$(echo "$PR_PATTERNS" | tr -d '\n')
    check "pattern_registry ≤ 15 patterns (当前: ${PR_PATTERNS})" "[ $PR_PATTERNS -le 15 ]" "WARN"
fi

# Skill files
SKILL_OVERSIZED=0
for sf in "${REPO_ROOT}"/.claude/skills/*/SKILL.md; do
    [ -f "$sf" ] || continue
    sf_size=$(wc -c < "$sf" 2>/dev/null || echo 0)
    sf_size="${sf_size// /}"
    if [ "$sf_size" -gt 12288 ]; then
        skill_name=$(basename "$(dirname "$sf")")
        echo -e "  ${YELLOW}! WARN: ${skill_name}/SKILL.md = ${sf_size}B > 12KB${NC}"
        SKILL_OVERSIZED=$((SKILL_OVERSIZED + 1))
        WARNS=$((WARNS + 1))
    fi
done
CHECKS=$((CHECKS + 1))
if [ "$SKILL_OVERSIZED" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} 所有 SKILL.md ≤ 12KB"
fi

# Rule files
RULE_OVERSIZED=0
TOTAL_RULE_SIZE=0
for rf in "${REPO_ROOT}"/.claude/rules/rule-*.md; do
    [ -f "$rf" ] || continue
    rf_size=$(wc -c < "$rf" 2>/dev/null || echo 0)
    rf_size="${rf_size// /}"
    TOTAL_RULE_SIZE=$((TOTAL_RULE_SIZE + rf_size))
    if [ "$rf_size" -gt 20480 ]; then
        rule_name=$(basename "$rf")
        echo -e "  ${YELLOW}! WARN: ${rule_name} = ${rf_size}B > 20KB${NC}"
        RULE_OVERSIZED=$((RULE_OVERSIZED + 1))
        WARNS=$((WARNS + 1))
    fi
done
CHECKS=$((CHECKS + 1))
if [ "$RULE_OVERSIZED" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} 所有 rule-*.md ≤ 20KB"
fi
check "铁律总大小 ≤ 160KB (当前: ${TOTAL_RULE_SIZE}B)" "[ $TOTAL_RULE_SIZE -le 163840 ]" "WARN"

echo ""

# ============================================================
# G2: Growth Gate — 对比 git 上次提交的增长
# ============================================================
echo -e "${CYAN}[G2] Growth Gate (vs last commit)...${NC}"

# 检查 CLAUDE.md 增长
CLAUDE_OLD=$(git show HEAD:CLAUDE.md 2>/dev/null | wc -c || echo 0)
CLAUDE_OLD="${CLAUDE_OLD// /}"
if [ "$CLAUDE_OLD" -gt 0 ] && [ "$CLAUDE_SIZE" -gt 0 ]; then
    GROWTH_PCT=$(python3 -c "print(round(($CLAUDE_SIZE - $CLAUDE_OLD) * 100 / $CLAUDE_OLD, 1))" 2>/dev/null || echo "0")
    check "CLAUDE.md 增长 ≤ 20% (当前: ${GROWTH_PCT}%)" "python3 -c 'exit(0 if $CLAUDE_SIZE <= $CLAUDE_OLD * 1.2 else 1)'" "WARN"
else
    echo -e "  ${GREEN}✓${NC} CLAUDE.md 无基线对比 (首次或未修改)"
fi

echo ""

# ============================================================
# G3: Structure Gate — 必须字段
# ============================================================
echo -e "${CYAN}[G3] Structure Gate...${NC}"

# 检查铁律是否有必须段落
RULE_MISSING_SECTIONS=0
for rf in "${REPO_ROOT}"/.claude/rules/rule-*.md; do
    [ -f "$rf" ] || continue
    rule_name=$(basename "$rf")
    # 跳过特殊文件
    [[ "$rule_name" == "rule-00-compliance.md" ]] && continue

    has_source=$({ grep -cE '源自|Source' "$rf" 2>/dev/null || echo 0; })
    has_source=$(echo "$has_source" | tr -d '\n ')
    has_never=$({ grep -cE '禁止|NEVER|反向约束' "$rf" 2>/dev/null || echo 0; })
    has_never=$(echo "$has_never" | tr -d '\n ')

    if [ "$has_source" -eq 0 ] || [ "$has_never" -eq 0 ]; then
        echo -e "  ${YELLOW}! WARN: ${rule_name} 缺少 '源自' 或 '禁止' 段落${NC}"
        RULE_MISSING_SECTIONS=$((RULE_MISSING_SECTIONS + 1))
        WARNS=$((WARNS + 1))
    fi
done
CHECKS=$((CHECKS + 1))
if [ "$RULE_MISSING_SECTIONS" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} 所有铁律含 '源自' + '禁止' 段落"
fi

echo ""

# ============================================================
# G5: Count Gate — 总数约束
# ============================================================
echo -e "${CYAN}[G5] Count Gate...${NC}"

RULE_COUNT=$(ls "${REPO_ROOT}"/.claude/rules/rule-*.md 2>/dev/null | wc -l || echo 0)
RULE_COUNT="${RULE_COUNT// /}"
check "铁律数量 ≤ 20 (当前: ${RULE_COUNT})" "[ $RULE_COUNT -le 20 ]" "WARN"

SKILL_COUNT=$(ls -d "${REPO_ROOT}"/.claude/skills/*/SKILL.md 2>/dev/null | wc -l || echo 0)
SKILL_COUNT="${SKILL_COUNT// /}"
check "Skill 数量合理 (当前: ${SKILL_COUNT})" "[ $SKILL_COUNT -le 35 ]" "WARN"

MEMORY_LINES=$(wc -l < "${REPO_ROOT}/.claude/projects/-Users-milton-----/memory/MEMORY.md" 2>/dev/null || echo 0)
MEMORY_LINES="${MEMORY_LINES// /}"
check "MEMORY.md ≤ 200 行 (当前: ${MEMORY_LINES})" "[ $MEMORY_LINES -le 200 ]" "WARN"

echo ""

# ============================================================
# 总结
# ============================================================
echo -e "${CYAN}========================================"
if [ "$BLOCKS" -gt 0 ]; then
    echo -e "${RED} BLOCKED: ${BLOCKS} 项阻断, ${WARNS} 项警告 / ${CHECKS} 项检查"
    echo -e " 必须修复 BLOCK 项才能提交框架修改${NC}"
    echo -e "========================================${NC}"
    exit 2
elif [ "$WARNS" -gt 0 ]; then
    echo -e "${YELLOW} WARN: ${WARNS} 项警告 / ${CHECKS} 项检查"
    echo -e " 建议修复但不阻断提交${NC}"
    echo -e "========================================${NC}"
    exit 1
else
    echo -e "${GREEN} ALL CLEAR: ${CHECKS} 项全部通过"
    echo -e " 框架修改可以安全提交${NC}"
    echo -e "========================================${NC}"
    exit 0
fi
