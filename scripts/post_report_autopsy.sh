#!/bin/bash
# post_report_autopsy.sh v1.0
# 报告完成后的自动测量脚本 — 进化循环的起点
# 用法: bash scripts/post_report_autopsy.sh <TICKER> <REPORT_FILE>
# 输出: 追加到 knowledge/evolution_log.yaml + 屏幕摘要

set -euo pipefail

TICKER="${1:-}"
REPORT="${2:-}"

if [ -z "$TICKER" ] || [ -z "$REPORT" ] || [ ! -f "$REPORT" ]; then
    echo "用法: bash scripts/post_report_autopsy.sh <TICKER> <REPORT_FILE>"
    echo "示例: bash scripts/post_report_autopsy.sh KLAC reports/KLAC/KLAC_Complete_v1.0_2026-02-17.md"
    exit 1
fi

echo "=== Post-Report Autopsy v1.0 ==="
echo "Ticker: $TICKER"
echo "Report: $(basename "$REPORT")"
echo "Date: $(date '+%Y-%m-%d %H:%M')"
echo ""

# --- 基础指标 ---
CHARS=$(wc -m < "$REPORT" 2>/dev/null | tr -d ' ')
CHARS_K="$((CHARS / 1000))K"
LINES=$(wc -l < "$REPORT" 2>/dev/null | tr -d ' ')

echo "--- [1/4] 基础指标 ---"
echo "  字符数: $CHARS_K ($CHARS)"
echo "  行数: $LINES"

# --- Quality Gate ---
echo ""
echo "--- [2/4] Quality Gate ---"
CG_RESULT="N/A"
if [ -f "tests/quality_gate_complete.sh" ]; then
    CG_OUTPUT=$(bash tests/quality_gate_complete.sh "$REPORT" 2>/dev/null) || true
    # 解析实际输出格式: "错误: X | 警告: Y" + "RESULT: PASSED/FAILED"
    CG_ERRORS=$(echo "$CG_OUTPUT" | { grep -oE '错误: [^|]+' | grep -oE '[0-9]+' || echo "?"; } | head -1)
    CG_WARNS=$(echo "$CG_OUTPUT" | { grep -oE '警告: [^|]+' | grep -oE '[0-9]+' || echo "?"; } | head -1)
    if echo "$CG_OUTPUT" | grep -q "PASSED"; then
        CG_RESULT="PASSED(${CG_ERRORS}E/${CG_WARNS}W)"
    elif echo "$CG_OUTPUT" | grep -q "FAILED"; then
        CG_RESULT="FAILED(${CG_ERRORS}E/${CG_WARNS}W)"
    fi
    echo "  CG: $CG_RESULT"
else
    echo "  CG: tests/quality_gate_complete.sh not found"
fi

# --- Compliance Check ---
echo ""
echo "--- [3/4] Compliance ---"
COMPLIANCE="N/A"
if [ -f "tests/compliance_check.sh" ]; then
    COMP_OUTPUT=$(bash tests/compliance_check.sh "$REPORT" 2>/dev/null) || true
    if echo "$COMP_OUTPUT" | grep -q "FAILED"; then
        COMPLIANCE="FAILED"
        FAIL_COUNT=$(echo "$COMP_OUTPUT" | { grep -oE 'FAIL: [0-9]+' | grep -oE '[0-9]+' || echo "?"; } | head -1)
        echo "  Compliance: FAILED ($FAIL_COUNT violations)"
    elif echo "$COMP_OUTPUT" | grep -q "PASSED"; then
        COMPLIANCE="PASSED"
        echo "  Compliance: PASSED"
    fi
else
    echo "  Compliance: tests/compliance_check.sh not found"
fi

# --- DM Anchors ---
echo ""
echo "--- [4/4] DM Anchors ---"
DM_COUNT=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$REPORT" 2>/dev/null | sort -u | wc -l || echo "0"; } | tr -d ' ')
echo "  Unique DM anchors: $DM_COUNT"

# --- 汇总 ---
echo ""
echo "=== AUTOPSY SUMMARY ==="
echo "  $TICKER | $CHARS_K | CG: $CG_RESULT | Compliance: $COMPLIANCE | DM: $DM_COUNT"

# --- 追加到 evolution_log.yaml ---
LOG_FILE="knowledge/evolution_log.yaml"

# 确保文件存在且有header
if [ ! -f "$LOG_FILE" ]; then
    cat > "$LOG_FILE" << 'HEADER'
# Evolution Log — 进化历史记录
# 每份报告Complete后由 post_report_autopsy.sh 自动追加
# AI读取最近3条用于Phase -1 + 进化提议

entries:
HEADER
fi

# 追加条目
cat >> "$LOG_FILE" << ENTRY

  - ticker: "$TICKER"
    date: "$(date '+%Y-%m-%d')"
    report: "$(basename "$REPORT")"
    chars: "$CHARS_K"
    cg_result: "$CG_RESULT"
    compliance: "$COMPLIANCE"
    dm_anchors: $DM_COUNT
    quality: null  # AI填入 (需人工/AI评分)
    scorecard: null  # AI填入 (research_scorecard.sh post)
    top_technique: null  # AI填入
    top_lesson: null  # AI填入
    evolution_proposed: null  # AI填入
    evolution_status: pending  # pending/approved/rejected
    shadow:
      price_at_report: null  # AI填入当时股价
      price_3m: null
      price_6m: null
      price_12m: null
ENTRY

echo ""
echo "  → 已追加到 $LOG_FILE"
echo ""
echo "=== 下一步 ==="
echo "  1. AI填入 quality/scorecard/top_technique/top_lesson"
echo "  2. AI对比 excellence_catalog.yaml 是否有新冠军"
echo "  3. AI生成进化提议 → 用户审批"
echo "  4. 更新 L0_index.yaml + report_lessons.md"
