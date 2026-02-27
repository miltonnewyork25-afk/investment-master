#!/bin/bash
# ============================================================
# ci_candidate_scanner.sh — 非共识洞见候选自动扫描器 v1.0
# ============================================================
# 用法: bash scripts/ci_candidate_scanner.sh <报告文件.md>
#
# 背景: ARM报告有3个明确非共识洞见(CDS定价权/Phoenix EV/零地缘折价)
#        但因无人注册CI-N标记导致D7=0/10。
#        本脚本在组装后自动检测候选,防止遗漏。
#
# 逻辑:
#   1. grep非共识信号关键词
#   2. 统计现有CI-N数量
#   3. 信号>0但CI=0 → WARN + 候选清单
#   4. 信号>0且CI>0但CI<信号/3 → INFO
#
# 退出码: 0=OK(无遗漏风险), 1=WARN(有候选未注册)
# 集成: quality_gate_complete.sh CG12之后调用
#
# v1.0 (2026-02-25) — EVO-ARM-001
# ============================================================

set -uo pipefail

FILE="${1:?用法: $0 <报告文件.md>}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: $FILE${NC}"
    exit 1
fi

echo "=============================================="
echo -e " ${CYAN}CI Candidate Scanner v1.0${NC}"
echo " 文件: $(basename "$FILE")"
echo "=============================================="
echo ""

# --- 1. 扫描非共识信号关键词 ---
SIGNAL_PATTERN='CDS|信用违约|非共识|独特|首次|悖论|陷阱|反直觉|逆向|被低估|被高估|市场忽略|隐含假设'

# 统计信号行数
SIGNAL_COUNT=$(grep -cE "$SIGNAL_PATTERN" "$FILE" 2>/dev/null || true)
SIGNAL_COUNT="${SIGNAL_COUNT// /}"
SIGNAL_COUNT="${SIGNAL_COUNT:-0}"

# --- 2. 统计现有CI-N数量 ---
CI_COUNT=$(grep -oE 'CI-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l | tr -d ' ')
CI_COUNT="${CI_COUNT:-0}"

echo "非共识信号关键词命中: ${SIGNAL_COUNT} 行"
echo "已注册CI标记: ${CI_COUNT} 个"
echo ""

# --- 3. 输出候选清单 ---
if [ "$SIGNAL_COUNT" -gt 0 ]; then
    echo "--- 候选洞见清单 (关键词 + 行号) ---"
    # 输出匹配行(带行号,最多显示15行)
    grep -nE "$SIGNAL_PATTERN" "$FILE" 2>/dev/null | head -15 | while IFS= read -r line; do
        echo "  $line"
    done
    if [ "$SIGNAL_COUNT" -gt 15 ]; then
        echo "  ... (共${SIGNAL_COUNT}行,仅显示前15行)"
    fi
    echo ""
fi

# --- 4. 判定 ---
if [ "$SIGNAL_COUNT" -eq 0 ]; then
    echo -e "${GREEN}OK: 无非共识信号关键词 — 可能为传统框架报告${NC}"
    exit 0
elif [ "$CI_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}WARN: 检测到${SIGNAL_COUNT}个非共识信号但CI注册=0${NC}"
    echo "  → 建议: 从上方候选清单中选取3-5个最强洞见注册为CI-01~CI-05"
    echo "  → 注册格式: **CI-01: [洞见标题]** — [一句话描述]"
    exit 1
elif [ "$CI_COUNT" -lt $((SIGNAL_COUNT / 3)) ]; then
    echo -e "${YELLOW}INFO: CI注册${CI_COUNT}个 vs 信号${SIGNAL_COUNT}行 — 可能还有遗漏${NC}"
    echo "  → 建议: 检查上方候选清单是否有未注册的重要洞见"
    exit 0
else
    echo -e "${GREEN}OK: CI注册${CI_COUNT}个 vs 信号${SIGNAL_COUNT}行 — 覆盖充分${NC}"
    exit 0
fi
