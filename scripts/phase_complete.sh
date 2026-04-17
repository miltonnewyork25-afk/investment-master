#!/bin/bash
# ============================================================
# phase_complete.sh — Phase完成一键脚本 v1.0
# ============================================================
# 用法:
#   bash scripts/phase_complete.sh <TICKER> <PHASE> <REPORT_FILE> <MIN_CHARS> [TIER]
#   例: bash scripts/phase_complete.sh PLTR 1 reports/PLTR/PLTR_Phase1_v2.0.md 55000
#
# 功能:
#   1. 运行 Fast Gate (tests/research_fast.sh) → PASS 才继续
#   2. 从现有 checkpoint.yaml 读取元数据 → 自动更新v2.0精简格式
#   3. git add 报告+checkpoint → git commit 标准格式
#   4. 输出摘要
#
# 退出码: 0=成功, 1=Fast Gate失败, 2=参数错误, 3=文件缺失, 4=Sentinel BLOCK
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
TICKER="${1:?用法: $0 <TICKER> <PHASE> <REPORT_FILE> <MIN_CHARS> [TIER]}"
PHASE="${2:?缺少PHASE参数}"
REPORT="${3:?缺少REPORT_FILE参数}"
MIN_CHARS="${4:?缺少MIN_CHARS参数}"
TIER="${5:-3}"

# --force 标志: 绕过Circuit Breaker
FORCE_MODE="false"
for arg in "$@"; do
    if [[ "$arg" == "--force" ]]; then
        FORCE_MODE="true"
    fi
done

# --- 路径 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CHECKPOINT="reports/${TICKER}/data/checkpoint.yaml"
FAST_GATE="${REPO_ROOT}/tests/research_fast.sh"

echo -e "${CYAN}========================================"
echo " Phase Complete Script v1.0"
echo " Ticker: ${TICKER} | Phase: ${PHASE}"
echo " Report: ${REPORT}"
echo -e "========================================${NC}"
echo ""

# --- 前置检查 ---
if [ ! -f "$REPORT" ]; then
    echo -e "${RED}FATAL: 报告文件不存在: ${REPORT}${NC}"
    exit 3
fi

if [ ! -f "$FAST_GATE" ]; then
    echo -e "${RED}FATAL: Fast Gate脚本不存在: ${FAST_GATE}${NC}"
    exit 3
fi

# --- Step 0: DM密度预检查 (v1.1新增) ---
echo -e "${CYAN}[0/6] DM标注密度预检查...${NC}"
EXPECTED_DM=$(python3 -c "print(max(50, int($MIN_CHARS / 10000 * 15)))")
DM_CHECK="${REPO_ROOT}/scripts/dm_density_check.sh"

if [ -f "$DM_CHECK" ] && [ "$PHASE" != "0" ]; then
    if bash "$DM_CHECK" "$REPORT" "$EXPECTED_DM" "$PHASE" 2>/dev/null; then
        echo -e "${GREEN}DM密度检查通过${NC}"
    else
        DM_EXIT_CODE=$?
        if [ "$DM_EXIT_CODE" -eq 2 ] && [ "$FORCE_MODE" != "true" ]; then
            echo -e "${RED}DM标注严重不足，中止提交 (使用 --force 强制提交)${NC}"
            exit 1
        elif [ "$DM_EXIT_CODE" -eq 1 ]; then
            echo -e "${YELLOW}DM标注偏低，但继续执行（请在后续Phase补充）${NC}"
        fi
    fi
else
    echo -e "${YELLOW}跳过DM密度检查 (Phase 0 或脚本不存在)${NC}"
fi
echo ""

# --- Step 1: Fast Gate ---
echo -e "${CYAN}[1/6] 运行 Fast Gate...${NC}"
if bash "$FAST_GATE" "$REPORT" "$MIN_CHARS" "$TIER"; then
    echo ""
    echo -e "${GREEN}Fast Gate PASSED${NC}"
else
    echo ""
    echo -e "${RED}Fast Gate FAILED — 中止提交${NC}"
    exit 1
fi
echo ""

# --- Step 2: 读取报告指标 ---
echo -e "${CYAN}[2/6] 读取报告指标...${NC}"

ACTUAL_CHARS=$(wc -m < "$REPORT")
ACTUAL_CHARS="${ACTUAL_CHARS// /}"

MERMAID_COUNT=$(grep -c '```mermaid' "$REPORT" 2>/dev/null || echo 0)

OLD_ANN=$(grep -oE '\[(A|B|P|E):' "$REPORT" 2>/dev/null | wc -l) || true
NEW_ANN=$(grep -oE '\[(硬数据|合理推断|主观判断):' "$REPORT" 2>/dev/null | wc -l) || true
OLD_ANN="${OLD_ANN// /}"
NEW_ANN="${NEW_ANN// /}"
TOTAL_ANN=$((OLD_ANN + NEW_ANN))

if [ "$ACTUAL_CHARS" -gt 0 ]; then
    ANN_DENSITY=$(python3 -c "print(round($TOTAL_ANN * 10000 / $ACTUAL_CHARS, 1))")
else
    ANN_DENSITY=0
fi

HARD_OLD=$(grep -oE '\[(A|B|P):' "$REPORT" 2>/dev/null | wc -l) || true
HARD_NEW=$(grep -oE '\[硬数据:' "$REPORT" 2>/dev/null | wc -l) || true
HARD_OLD="${HARD_OLD// /}"
HARD_NEW="${HARD_NEW// /}"
HARD_TOTAL=$((HARD_OLD + HARD_NEW))
if [ "$TOTAL_ANN" -gt 0 ]; then
    HARD_RATIO=$(python3 -c "print(round($HARD_TOTAL * 100 / $TOTAL_ANN, 1))")
else
    HARD_RATIO=0
fi

echo "  字符: ${ACTUAL_CHARS} | 标注: ${TOTAL_ANN} | 密度: ${ANN_DENSITY}/万 | 硬数据: ${HARD_RATIO}% | Mermaid: ${MERMAID_COUNT}"
echo ""

# --- Step 3: 更新 checkpoint.yaml ---
echo -e "${CYAN}[3/6] 更新 checkpoint.yaml (v2.0精简格式)...${NC}"

# 确保 data/ 目录存在
mkdir -p "$(dirname "$CHECKPOINT")"

# 从现有checkpoint读取元数据(如存在)
COMPANY=""
FRAMEWORK=""
WORKTREE=""
INDUSTRY=""
if [ -f "$CHECKPOINT" ]; then
    COMPANY=$(grep '^company:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^company: *//' | tr -d '"') || true
    FRAMEWORK=$(grep '^framework_version:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^framework_version: *//' | tr -d '"') || true
    WORKTREE=$(grep '^worktree:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^worktree: *//' | tr -d '"') || true
    INDUSTRY=$(grep '^industry:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^industry: *//' | tr -d '"') || true
fi

# 读取已有update_count
UPDATE_COUNT=0
if [ -f "$CHECKPOINT" ]; then
    UC=$({ grep -oE 'update_count: [0-9]+' "$CHECKPOINT" 2>/dev/null | grep -oE '[0-9]+' || echo "0"; } | head -1)
    UPDATE_COUNT="${UC:-0}"
fi
UPDATE_COUNT=$((UPDATE_COUNT + 1))

# 默认值
COMPANY="${COMPANY:-${TICKER}}"
FRAMEWORK="${FRAMEWORK:-v26.0}"
WORKTREE="${WORKTREE:-unknown}"
INDUSTRY="${INDUSTRY:-unknown}"

# 扫描已完成的Phase报告
PHASES_COMPLETED="["
TOTAL_PROJECT_CHARS=0
LATEST_REPORT="$REPORT"
DM_FILE="reports/${TICKER}/data/shared_context.md"
KA_FILE="reports/${TICKER}/data/key_assumptions.md"

for phase_file in reports/${TICKER}/${TICKER}_Phase*_v*.md; do
    if [ -f "$phase_file" ]; then
        # 提取Phase号
        phase_num=$(echo "$phase_file" | grep -oE 'Phase[0-9]+\.?[0-9]*' | sed 's/Phase//')
        if [ -n "$phase_num" ]; then
            PHASES_COMPLETED="${PHASES_COMPLETED}${phase_num}, "
        fi
        # 累计字符
        fc=$(wc -m < "$phase_file")
        fc="${fc// /}"
        TOTAL_PROJECT_CHARS=$((TOTAL_PROJECT_CHARS + fc))
    fi
done
# 去尾逗号+闭合
PHASES_COMPLETED=$(echo "$PHASES_COMPLETED" | sed 's/, $//')
PHASES_COMPLETED="${PHASES_COMPLETED}]"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")

cat > "$CHECKPOINT" << YAML
schema_version: "2.0"
ticker: ${TICKER}
company: "${COMPANY}"
framework_version: ${FRAMEWORK}
worktree: ${WORKTREE}
industry: ${INDUSTRY}
last_updated: "${TIMESTAMP}"

current_phase: ${PHASE}
phase_status: completed
phases_completed: ${PHASES_COMPLETED}
update_count: ${UPDATE_COUNT}

quick_ref:
  total_chars: ${TOTAL_PROJECT_CHARS}
  latest_phase_chars: ${ACTUAL_CHARS}
  annotations: ${TOTAL_ANN}
  annotation_density: "${ANN_DENSITY}/万"
  hard_data_ratio: "${HARD_RATIO}%"
  mermaid_charts: ${MERMAID_COUNT}

files:
  data_master: "${DM_FILE}"
  key_assumptions: "${KA_FILE}"
  latest_report: "${REPORT}"

next_action: "Phase $((${PHASE%.*} + 1)) 或用户指定"
resume_prompt: "读取 ${CHECKPOINT} 继续"
YAML

echo -e "${GREEN}  checkpoint.yaml 已更新 (v2.0, $(wc -l < "$CHECKPOINT") 行)${NC}"
echo ""

# --- Step 4: Phase Sentinel — Circuit Breaker ---
echo -e "${CYAN}[4/6] Phase Sentinel — Circuit Breaker...${NC}"
SENTINEL="${REPO_ROOT}/scripts/phase_sentinel.sh"
if [ -f "$SENTINEL" ]; then
    # 从checkpoint读取target_chars(如有)
    SENTINEL_TARGET="${MIN_CHARS}"
    if [ -f "$CHECKPOINT" ]; then
        CT=$({ grep -oE 'target_chars: [0-9]+' "$CHECKPOINT" | grep -oE '[0-9]+' || echo "0"; } | head -1)
        if [ "$CT" -gt 0 ]; then
            SENTINEL_TARGET="$CT"
        fi
    fi

    SENTINEL_EXIT=0
    bash "$SENTINEL" "$TICKER" "$PHASE" "$SENTINEL_TARGET" || SENTINEL_EXIT=$?

    if [ "$SENTINEL_EXIT" -eq 2 ]; then
        echo ""
        echo -e "${RED}*** CIRCUIT BREAKER — Sentinel BLOCK ***${NC}"
        echo -e "${RED}前序产出缺失,commit已阻止。${NC}"
        if [ "$FORCE_MODE" == "true" ]; then
            echo -e "${YELLOW}*** --force 模式: 绕过Circuit Breaker ***${NC}"
        else
            echo -e "${RED}修复问题后重新运行,或使用 --force 绕过${NC}"
            exit 4
        fi
    elif [ "$SENTINEL_EXIT" -eq 1 ]; then
        echo ""
        echo -e "${YELLOW}*** SENTINEL FAIL — 有质量问题,建议修复 ***${NC}"
    else
        echo ""
        echo -e "${GREEN}Sentinel CLEARED${NC}"
    fi
else
    echo "  phase_sentinel.sh not found (跳过)"
fi
echo ""

# --- Step 4.5: 工具执行摘要 (Hermes-inspired, v1.1新增) ---
echo -e "${CYAN}[4.5/6] 生成工具执行摘要...${NC}"
COMPRESS_SCRIPT="${REPO_ROOT}/scripts/context_compress.sh"
if [ -f "$COMPRESS_SCRIPT" ]; then
    bash "$COMPRESS_SCRIPT" "$TICKER" 2>/dev/null && {
        TOOL_SUMMARY="reports/${TICKER}/data/tool_execution_summary.md"
        [ -f "$TOOL_SUMMARY" ] && FILES_TO_ADD+=("$TOOL_SUMMARY")
        echo -e "${GREEN}  工具执行摘要已生成${NC}"
    } || echo -e "${YELLOW}  工具摘要生成跳过 (非关键)${NC}"
else
    echo "  context_compress.sh not found (跳过)"
fi
echo ""

# --- Step 4.55: 未引用证据检测 (Co-STORM 借鉴, v1.3新增) ---
# 仅在 Phase 4 完成时触发 — 为 Phase 5 组装提供盲点清单
if [ "$PHASE" == "4" ] || [ "$PHASE" == "4.5" ]; then
    echo -e "${CYAN}[4.55/6] 未引用证据检测 (Phase 4→5)...${NC}"
    UNUSED_SCRIPT="${REPO_ROOT}/scripts/unused_evidence_detector.sh"
    if [ -f "$UNUSED_SCRIPT" ]; then
        if bash "$UNUSED_SCRIPT" "$TICKER" --limit 10 --phase "$PHASE" 2>/dev/null; then
            UNUSED_REPORT="reports/${TICKER}/data/unused_evidence_report.md"
            [ -f "$UNUSED_REPORT" ] && FILES_TO_ADD+=("$UNUSED_REPORT")
            echo -e "${GREEN}  → Phase 5 组装前请检查 ${UNUSED_REPORT}${NC}"
        else
            echo -e "${GREEN}  无未引用证据 (或暂不触发)${NC}"
        fi
    else
        echo "  unused_evidence_detector.sh not found (跳过)"
    fi
    echo ""
fi

# --- Step 4.6: 下个 Phase 的 learnings 注入 preamble (gstack 借鉴, v1.2新增) ---
echo -e "${CYAN}[4.6/6] 为下个 Phase 生成 learnings preamble...${NC}"
INJECT_SCRIPT="${REPO_ROOT}/scripts/phase_context_inject.sh"
NEXT_PHASE=$((${PHASE%.*} + 1))
if [ -f "$INJECT_SCRIPT" ]; then
    if bash "$INJECT_SCRIPT" "$TICKER" --phase "$NEXT_PHASE" --limit 3 2>/dev/null; then
        PREAMBLE="reports/${TICKER}/data/phase_context_preamble.md"
        [ -f "$PREAMBLE" ] && FILES_TO_ADD+=("$PREAMBLE")
    else
        echo -e "${YELLOW}  无相关 learnings (非关键, 跳过)${NC}"
    fi
else
    echo "  phase_context_inject.sh not found (跳过)"
fi
echo ""

# --- Step 5: Git add + commit ---
echo -e "${CYAN}[5/6] Git commit...${NC}"

# 收集要提交的文件
FILES_TO_ADD=("$REPORT" "$CHECKPOINT")

# 如果 shared_context.md 有变化也加入
if [ -f "$DM_FILE" ] && git diff --name-only | grep -q "$DM_FILE" 2>/dev/null; then
    FILES_TO_ADD+=("$DM_FILE")
fi

# 如果 key_assumptions.md 有变化也加入
if [ -f "$KA_FILE" ] && git diff --name-only | grep -q "$KA_FILE" 2>/dev/null; then
    FILES_TO_ADD+=("$KA_FILE")
fi

# staging 目录里通过QG的文件
if [ -d "reports/${TICKER}/staging/" ]; then
    for sf in reports/${TICKER}/staging/*.md; do
        [ -f "$sf" ] && FILES_TO_ADD+=("$sf")
    done
fi

# sentinel_log也加入提交
if [ -f "reports/${TICKER}/data/sentinel_log.yaml" ]; then
    FILES_TO_ADD+=("reports/${TICKER}/data/sentinel_log.yaml")
fi

echo "  提交文件:"
for f in "${FILES_TO_ADD[@]}"; do
    echo "    - $f"
done

git add "${FILES_TO_ADD[@]}"

COMMIT_MSG="feat(${TICKER}): Phase ${PHASE} completed — ${ACTUAL_CHARS} chars, ${TOTAL_ANN} annotations"

git commit -m "$(cat <<EOF
${COMMIT_MSG}

Fast Gate: PASS | Chars: ${ACTUAL_CHARS}/${MIN_CHARS} | Annotations: ${TOTAL_ANN} (${ANN_DENSITY}/万)
Hard data: ${HARD_RATIO}% | Mermaid: ${MERMAID_COUNT}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"

echo ""
echo -e "${GREEN}========================================"
echo " Phase ${PHASE} Complete!"
echo "========================================"
echo " Ticker:      ${TICKER}"
echo " Phase:       ${PHASE}"
echo " Chars:       ${ACTUAL_CHARS} (target: ${MIN_CHARS})"
echo " Annotations: ${TOTAL_ANN} (${ANN_DENSITY}/万, hard: ${HARD_RATIO}%)"
echo " Checkpoint:  ${CHECKPOINT} (v2.0)"
echo -e "========================================${NC}"
echo ""
echo "下一步: git push (如需) 或继续下一Phase"
