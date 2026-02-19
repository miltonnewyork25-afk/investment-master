#!/bin/bash
# ============================================================
# deep_research.sh v1.0 — Single Command Orchestrator
# ============================================================
# 用法:
#   bash scripts/deep_research.sh <TICKER> [INDUSTRY] [--resume]
#   例: bash scripts/deep_research.sh AAPL 科技平台
#   例: bash scripts/deep_research.sh AAPL 科技平台 --resume
#
# 设计: 状态机，使用checkpoint.yaml追踪进度
# 自动化所有可脚本化的步骤，在需要AI介入时停止并指示
#
# 退出码:
#   0  = 全部完成 (autopsy done)
#   10 = 需要Phase -0.5 (lit_recon, AI介入)
#   11 = Preflight被阻断 (需修复)
#   12 = Phases未完成 (AI需执行Phase 0-5)
#   13 = 需要组装Complete (AI介入)
#   14 = Quality Gate失败 (需修复)
#   1  = 参数/文件错误
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
TICKER="${1:?用法: $0 <TICKER> [INDUSTRY] [--resume]}"
INDUSTRY="${2:-}"
RESUME="false"

for arg in "$@"; do
    if [[ "$arg" == "--resume" ]]; then
        RESUME="true"
    fi
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA="$REPO_ROOT/reports/${TICKER}/data"
CHECKPOINT="$DATA/checkpoint.yaml"

echo -e "${CYAN}══════════════════════════════════════════════════"
echo " Deep Research Orchestrator v1.0"
echo " Ticker: ${TICKER} | Industry: ${INDUSTRY:-auto}"
echo " Mode: $([ "$RESUME" == "true" ] && echo "resume" || echo "fresh")"
echo -e "══════════════════════════════════════════════════${NC}"
echo ""

# ============================================================
# Step 1: tier3_launch.sh (Phase -1)
# ============================================================
echo -e "${CYAN}[1/5] Phase -1: tier3_launch.sh...${NC}"

LAUNCH_BRIEF="$DATA/launch_brief.md"
KC="$DATA/knowledge_context.md"

if [ -f "$LAUNCH_BRIEF" ] && [ -f "$KC" ]; then
    echo -e "${GREEN}  已完成 — launch_brief.md + knowledge_context.md 存在${NC}"
else
    LAUNCH_SCRIPT="$SCRIPT_DIR/tier3_launch.sh"
    if [ -f "$LAUNCH_SCRIPT" ]; then
        if [ -n "$INDUSTRY" ]; then
            bash "$LAUNCH_SCRIPT" "$TICKER" "$INDUSTRY" || true
        else
            bash "$LAUNCH_SCRIPT" "$TICKER" || true
        fi
        # 验证产出
        if [ ! -f "$LAUNCH_BRIEF" ]; then
            echo -e "${RED}  tier3_launch.sh未生成launch_brief.md${NC}"
        fi
    else
        echo -e "${YELLOW}  tier3_launch.sh不存在，跳过自动化${NC}"
        mkdir -p "$DATA"
    fi
fi
echo ""

# ============================================================
# Step 2: 检查 lit_recon_memo.md (Phase -0.5)
# ============================================================
echo -e "${CYAN}[2/5] Phase -0.5: lit_recon_memo.md...${NC}"

LIT_RECON="$DATA/lit_recon_memo.md"
if [ -f "$LIT_RECON" ]; then
    LR_CHARS=$(wc -m < "$LIT_RECON" | tr -d ' ')
    if [ "$LR_CHARS" -ge 1000 ]; then
        echo -e "${GREEN}  已完成 — lit_recon_memo.md ($LR_CHARS chars)${NC}"
    else
        echo -e "${RED}  lit_recon_memo.md过短 ($LR_CHARS < 1000 chars)${NC}"
        echo ""
        echo -e "${YELLOW}需要AI执行Phase -0.5文献侦察:${NC}"
        echo "  1. 5路WebSearch (bull/bear/industry/regulation/competition)"
        echo "  2. 编写 $LIT_RECON (≥1000 chars)"
        echo "  3. 重新运行: bash scripts/deep_research.sh $TICKER $INDUSTRY --resume"
        exit 10
    fi
else
    echo -e "${RED}  lit_recon_memo.md 缺失${NC}"
    echo ""
    echo -e "${YELLOW}需要AI执行Phase -0.5文献侦察:${NC}"
    echo "  1. 5路WebSearch (bull/bear/industry/regulation/competition)"
    echo "  2. 编写 $LIT_RECON (≥1000 chars)"
    echo "  3. 重新运行: bash scripts/deep_research.sh $TICKER $INDUSTRY --resume"
    exit 10
fi
echo ""

# ============================================================
# Step 3: preflight_gate.sh
# ============================================================
echo -e "${CYAN}[3/5] Preflight Gate...${NC}"

PREFLIGHT="$SCRIPT_DIR/preflight_gate.sh"
if [ -f "$PREFLIGHT" ]; then
    PF_EXIT=0
    bash "$PREFLIGHT" "$TICKER" "${INDUSTRY:-unknown}" || PF_EXIT=$?
    if [ "$PF_EXIT" -ne 0 ]; then
        echo ""
        echo -e "${RED}Preflight BLOCKED — 修复上述问题后重新运行${NC}"
        exit 11
    fi
else
    echo -e "${YELLOW}  preflight_gate.sh不存在，跳过${NC}"
fi
echo ""

# ============================================================
# Step 4: 检查 Phase 0-5 完成状态
# ============================================================
echo -e "${CYAN}[4/5] Phase 0-5 检查...${NC}"

# 统计已完成的Phase
PHASES_DONE=0
LATEST_PHASE=-1
for pf in "$REPO_ROOT/reports/${TICKER}/${TICKER}_Phase"*.md; do
    if [ -f "$pf" ]; then
        PHASES_DONE=$((PHASES_DONE + 1))
        # 提取Phase号
        PN=$(echo "$(basename "$pf")" | grep -oE 'Phase[0-9]+' | sed 's/Phase//' || echo "0")
        if [ "$PN" -gt "$LATEST_PHASE" ]; then
            LATEST_PHASE="$PN"
        fi
    fi
done

# 检查Complete报告
COMPLETE_FILE=""
for cf in "$REPO_ROOT/reports/${TICKER}/${TICKER}_Complete"*.md; do
    if [ -f "$cf" ]; then
        COMPLETE_FILE="$cf"
    fi
done

if [ -n "$COMPLETE_FILE" ]; then
    COMPLETE_CHARS=$(wc -m < "$COMPLETE_FILE" | tr -d ' ')
    echo -e "${GREEN}  Complete报告已存在: $(basename "$COMPLETE_FILE") ($((COMPLETE_CHARS/1000))K chars)${NC}"
else
    if [ "$LATEST_PHASE" -ge 5 ]; then
        echo -e "${YELLOW}  Phase 0-$LATEST_PHASE 已完成, 但Complete尚未组装${NC}"
        echo ""
        echo -e "${YELLOW}需要AI组装Complete报告:${NC}"
        echo "  1. 组装 ${TICKER}_Complete_v1.0_$(date '+%Y-%m-%d').md"
        echo "  2. 运行 quality_gate_complete.sh"
        echo "  3. 重新运行: bash scripts/deep_research.sh $TICKER $INDUSTRY --resume"
        exit 13
    else
        echo -e "${YELLOW}  已完成 $PHASES_DONE 个Phase (最新: Phase $LATEST_PHASE)${NC}"
        echo ""
        echo -e "${YELLOW}需要AI继续执行Phase分析:${NC}"
        echo "  当前进度: Phase $LATEST_PHASE"
        echo "  下一步: Phase $((LATEST_PHASE + 1))"
        echo "  目标: 完成Phase 0-5"
        if [ -f "$DATA/launch_brief.md" ]; then
            TARGET_CHARS=$({ grep -oE 'target_chars: [0-9]+' "$DATA/checkpoint.yaml" 2>/dev/null | grep -oE '[0-9]+' || echo "300000"; } | head -1)
            echo "  目标字符: $((TARGET_CHARS/1000))K"
        fi
        echo "  完成后重新运行: bash scripts/deep_research.sh $TICKER $INDUSTRY --resume"
        exit 12
    fi
fi
echo ""

# ============================================================
# Step 5: Quality Gate + Autopsy
# ============================================================
echo -e "${CYAN}[5/5] Quality Gate + Autopsy...${NC}"

# Quality Gate
CG_SCRIPT="$REPO_ROOT/tests/quality_gate_complete.sh"
if [ -f "$CG_SCRIPT" ] && [ -n "$COMPLETE_FILE" ]; then
    CG_EXIT=0
    bash "$CG_SCRIPT" "$COMPLETE_FILE" || CG_EXIT=$?
    if [ "$CG_EXIT" -ne 0 ]; then
        echo ""
        echo -e "${RED}Quality Gate FAILED — 修复后重新运行${NC}"
        exit 14
    fi
fi

# Autopsy
AUTOPSY="$SCRIPT_DIR/post_report_autopsy.sh"
if [ -f "$AUTOPSY" ] && [ -n "$COMPLETE_FILE" ]; then
    echo ""
    bash "$AUTOPSY" "$TICKER" "$COMPLETE_FILE" || true
fi

echo ""
echo -e "${GREEN}══════════════════════════════════════════════════"
echo " Deep Research Complete!"
echo " Ticker: ${TICKER}"
echo " Report: $(basename "$COMPLETE_FILE")"
echo -e "══════════════════════════════════════════════════${NC}"
exit 0
