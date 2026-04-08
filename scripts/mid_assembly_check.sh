#!/bin/bash
# mid_assembly_check.sh — Phase 5 单会话组装中场质量检测 (P0 新增)
#
# 源自: PDD v2.0 复盘 — 单会话组装写到 200K+ 后出现写作疲劳:
#   - voice "本报告/笔者" 后段累积 14 个 (前段 1 个)
#   - 新写章节 DM 密度 0 (依赖 staging 原锚)
#   - Mermaid 0 (整份报告 0 图)
#   - hedging 后段累积 25 个
# 这些指标如果只在 commit 时 (quality_gate_complete.sh) 检测就太晚了 — 修复成本大。
# 本脚本在 Phase 5 写完每 50K 字符时强制调用, 当场清除问题。
#
# 用法:
#   bash scripts/mid_assembly_check.sh <Complete_file.md> [--strict]
#
# 触发频率 (写入 CLAUDE.md 强制):
#   Phase 5 写满 50K  → 必须调用一次 (基线)
#   Phase 5 写满 100K → 必须调用一次
#   Phase 5 写满 150K → 必须调用一次
#   Phase 5 写满 200K → 必须调用一次 + 强制重读 5 减法清单
#   Phase 5 写满 250K → 必须调用一次 + 警告超长报告分会话风险
#
# 返回码:
#   0 = 通过 (≤2 个 WARN)
#   1 = WARN (≥3 个软指标超限, 允许继续但建议立即清除)
#   2 = BLOCK (任一硬指标失败, 必须先修才能继续写)

set -uo pipefail

FILE="${1:?用法: bash scripts/mid_assembly_check.sh <Complete_file.md> [--strict]}"
STRICT="${2:-}"

if [ ! -f "$FILE" ]; then
    echo "ERROR: 文件不存在: $FILE" >&2
    exit 3
fi

RED="\033[0;31m"
YELLOW="\033[1;33m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
BOLD="\033[1m"
NC="\033[0m"

CHARS=$(wc -m < "$FILE" | tr -d ' ')
KCHARS=$((CHARS / 1000))

echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  Phase 5 中场质量检测 (mid_assembly_check v1.0)${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
echo
echo -e "  报告: ${CYAN}$FILE${NC}"
echo -e "  当前字符: ${BOLD}${KCHARS}K${NC}"
echo

WARN=0
BLOCK=0

# ─────────────────────────────────────────
# 硬指标 1: voice 残留 (本报告/笔者) — 必须 = 0
# ─────────────────────────────────────────
VOICE=$(grep -cE "本报告|笔者" "$FILE" || echo 0)
if [ "$VOICE" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} 减法4 voice: 0 处 '本报告/笔者'"
else
    echo -e "  ${RED}✗ BLOCK${NC} 减法4 voice: ${VOICE} 处 '本报告/笔者'"
    echo -e "    → 当场清除: ${CYAN}sed -i.bak 's/本报告/我们/g; s/笔者/我们/g' $FILE${NC}"
    BLOCK=$((BLOCK + 1))
fi

# ─────────────────────────────────────────
# 硬指标 2: 审美词 — 必须 ≤5
# ─────────────────────────────────────────
AESTH=$(grep -cE "漂亮|优雅|干净利落|完美|出色|卓越|安静地|默默地" "$FILE" || echo 0)
if [ "$AESTH" -le 5 ]; then
    echo -e "  ${GREEN}✓${NC} 减法3 审美词: ${AESTH} (≤5)"
else
    echo -e "  ${RED}✗ BLOCK${NC} 减法3 审美词: ${AESTH} (> 5)"
    echo -e "    → 用具体数字替换审美形容词"
    BLOCK=$((BLOCK + 1))
fi

# ─────────────────────────────────────────
# 软指标 1: hedging 密度 (相对字符)
# ─────────────────────────────────────────
HEDGE=$(grep -cE "可能|或许|某种程度|大概率|有待观察|may |might |could " "$FILE" || echo 0)
HEDGE_DENSITY=$(awk "BEGIN { printf \"%.2f\", $HEDGE / ($CHARS / 10000) }")
HEDGE_THRESHOLD=$(awk "BEGIN { printf \"%.0f\", $CHARS / 10000 * 1.0 }")  # 1/万字
if [ "$HEDGE" -le "$HEDGE_THRESHOLD" ]; then
    echo -e "  ${GREEN}✓${NC} 减法1 hedging: ${HEDGE} (密度 ${HEDGE_DENSITY}/万字, ≤1.0)"
else
    echo -e "  ${YELLOW}⚠ WARN${NC} 减法1 hedging: ${HEDGE} (密度 ${HEDGE_DENSITY}/万字, > 1.0)"
    echo -e "    → 真不确定就说'我们不知道', 别用 hedging"
    WARN=$((WARN + 1))
fi

# ─────────────────────────────────────────
# 软指标 2: 箭头链 (≥3 连续)
# ─────────────────────────────────────────
ARROW=$(grep -oE "→[^→]+→[^→]+→" "$FILE" 2>/dev/null | wc -l | tr -d ' ')
ARROW_THRESHOLD=$((KCHARS / 30))  # ~1 个/30K
if [ "$ARROW" -le "$ARROW_THRESHOLD" ]; then
    echo -e "  ${GREEN}✓${NC} 减法2 箭头链: ${ARROW} (≤${ARROW_THRESHOLD})"
else
    echo -e "  ${YELLOW}⚠ WARN${NC} 减法2 箭头链: ${ARROW} (> ${ARROW_THRESHOLD})"
    echo -e "    → 三连箭头改为散文叙述"
    WARN=$((WARN + 1))
fi

# ─────────────────────────────────────────
# 软指标 3: DM 密度 (累积)
# ─────────────────────────────────────────
DM=$(grep -c 'DM-' "$FILE" || echo 0)
DM_DENSITY=$(awk "BEGIN { printf \"%.2f\", $DM / ($CHARS / 1000) }")
DM_TARGET=$(awk "BEGIN { printf \"%.0f\", $CHARS / 1000 * 1.0 }")  # 1.0/千字
if [ "$DM" -ge "$DM_TARGET" ]; then
    echo -e "  ${GREEN}✓${NC} DM 密度: ${DM} (${DM_DENSITY}/千字, ≥1.0)"
else
    echo -e "  ${YELLOW}⚠ WARN${NC} DM 密度: ${DM} (${DM_DENSITY}/千字, < 1.0, 目标 ${DM_TARGET})"
    echo -e "    → 新写章节必须补 DM 锚点 (P4.5 handoff 应已列清单)"
    WARN=$((WARN + 1))
fi

# ─────────────────────────────────────────
# 软指标 4: Mermaid 图 (累积)
# ─────────────────────────────────────────
MERM=$(grep -c '```mermaid' "$FILE" 2>/dev/null || true)
MERM=$(echo "${MERM:-0}" | head -1 | tr -d '[:space:]')
MERM=${MERM:-0}
MERM_TARGET=$((KCHARS / 30))  # ~1 个/30K, 300K 报告 ≥10 个
if [ "$MERM" -ge "$MERM_TARGET" ]; then
    echo -e "  ${GREEN}✓${NC} Mermaid 图: ${MERM} (≥${MERM_TARGET})"
else
    echo -e "  ${YELLOW}⚠ WARN${NC} Mermaid 图: ${MERM} (< ${MERM_TARGET})"
    echo -e "    → 至少补: 业务结构 / 估值树 / Kill Switch 流程 / 时间轴"
    WARN=$((WARN + 1))
fi

# ─────────────────────────────────────────
# 范畴重分配 (≥3 硬要求)
# ─────────────────────────────────────────
RECAT=$(grep -cE "不是.*而是|从.*重新分类" "$FILE" || echo 0)
if [ "$RECAT" -ge 3 ]; then
    echo -e "  ${GREEN}✓${NC} 减法5 范畴重分配: ${RECAT} (≥3)"
else
    echo -e "  ${RED}✗ BLOCK${NC} 减法5 范畴重分配: ${RECAT} (< 3)"
    echo -e "    → Top 5 Lens 至少 3 个必须含'X→Y'范畴重分配"
    BLOCK=$((BLOCK + 1))
fi

# ─────────────────────────────────────────
# 200K+ 超长报告附加检查
# ─────────────────────────────────────────
if [ "$KCHARS" -ge 200 ]; then
    echo
    echo -e "${YELLOW}  ⚡ 超长报告警告 (≥200K)${NC}"
    echo -e "  ${YELLOW}→ 强制重读 5 减法清单 (.claude/rules/rule-N-evidence-style.md '5条减法规则')${NC}"
    echo -e "  ${YELLOW}→ 写作纪律滑落风险高 — 每写 30K 强制 grep 一次 voice${NC}"

    if [ "$KCHARS" -ge 250 ]; then
        echo -e "  ${RED}→ ≥250K 强烈建议分会话: 当前会话保存 + /clear + 新会话续写${NC}"
    fi
fi

# ─────────────────────────────────────────
# 总结
# ─────────────────────────────────────────
echo
echo -e "${BOLD}───────────────────────────────────────────────────────${NC}"
if [ "$BLOCK" -gt 0 ]; then
    echo -e "${RED}${BOLD}  ✗ BLOCK ($BLOCK 个硬指标失败) — 必须先修才能继续写${NC}"
    echo -e "${BOLD}───────────────────────────────────────────────────────${NC}"
    exit 2
elif [ "$WARN" -ge 3 ]; then
    echo -e "${YELLOW}${BOLD}  ⚠ WARN ($WARN 个软指标超限) — 允许继续但强烈建议立即清除${NC}"
    echo -e "${BOLD}───────────────────────────────────────────────────────${NC}"
    if [ "$STRICT" = "--strict" ]; then
        exit 1
    fi
    exit 0
else
    echo -e "${GREEN}${BOLD}  ✓ 通过 (BLOCK=0, WARN=$WARN) — 可继续写${NC}"
    echo -e "${BOLD}───────────────────────────────────────────────────────${NC}"
    exit 0
fi
