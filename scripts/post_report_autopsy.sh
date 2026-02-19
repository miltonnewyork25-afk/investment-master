#!/bin/bash
# post_report_autopsy.sh v2.0
# 报告完成后的自动测量脚本 — 进化循环的起点 + 编排器
# 用法: bash scripts/post_report_autopsy.sh <TICKER> <REPORT_FILE>
# 输出: 追加到 evolution_log.yaml + 趋势分析 + 屏幕摘要

set -euo pipefail

TICKER="${1:-}"
REPORT="${2:-}"

if [ -z "$TICKER" ] || [ -z "$REPORT" ] || [ ! -f "$REPORT" ]; then
    echo "用法: bash scripts/post_report_autopsy.sh <TICKER> <REPORT_FILE>"
    echo "示例: bash scripts/post_report_autopsy.sh KLAC reports/KLAC/KLAC_Complete_v1.0_2026-02-17.md"
    exit 1
fi

echo "=== Post-Report Autopsy v2.0 ==="
echo "Ticker: $TICKER"
echo "Report: $(basename "$REPORT")"
echo "Date: $(date '+%Y-%m-%d %H:%M')"
echo ""

# --- [1/6] 基础指标 ---
CHARS=$(wc -m < "$REPORT" 2>/dev/null | tr -d ' ')
CHARS_K="$((CHARS / 1000))K"
LINES=$(wc -l < "$REPORT" 2>/dev/null | tr -d ' ')
CHAPTERS=$({ grep -cE '^#{1,2} ' "$REPORT" || echo "0"; })

echo "--- [1/6] 基础指标 ---"
echo "  字符数: $CHARS_K ($CHARS)"
echo "  行数: $LINES"
echo "  章节数: $CHAPTERS"

# --- [2/6] Quality Gate ---
echo ""
echo "--- [2/6] Quality Gate ---"
CG_RESULT="N/A"
if [ -f "tests/quality_gate_complete.sh" ]; then
    CG_OUTPUT=$(bash tests/quality_gate_complete.sh "$REPORT" 2>/dev/null) || true
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

# --- [3/6] Compliance Check ---
echo ""
echo "--- [3/6] Compliance ---"
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

# --- [4/6] DM Anchors ---
echo ""
echo "--- [4/6] DM Anchors ---"
DM_COUNT=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$REPORT" 2>/dev/null | sort -u | wc -l || echo "0"; } | tr -d ' ')
echo "  Unique DM anchors: $DM_COUNT"

# --- [5/6] Research Scorecard ---
echo ""
echo "--- [5/6] Research Scorecard ---"
SCORECARD="N/A"
if [ -f "tests/research_scorecard.sh" ]; then
    SC_OUTPUT=$(bash tests/research_scorecard.sh post "$REPORT" 2>/dev/null) || true
    # 提取总分 (格式: "总分: XX/100" 或 "Total: XX/100")
    SC_TOTAL=$({ echo "$SC_OUTPUT" | grep -oE '[0-9]+/100' || echo ""; } | head -1)
    if [[ -n "$SC_TOTAL" ]]; then
        SCORECARD="$SC_TOTAL"
        echo "  Scorecard: $SCORECARD"
    else
        echo "  Scorecard: (无法解析总分)"
    fi
else
    echo "  Scorecard: tests/research_scorecard.sh not found"
fi

# --- [6/6] 质量趋势 ---
echo ""
echo "--- [6/6] 质量趋势 ---"
if [ -f "scripts/evolution_trend.sh" ]; then
    bash scripts/evolution_trend.sh --last 3 2>/dev/null || echo "  (趋势分析不可用)"
else
    echo "  scripts/evolution_trend.sh not found"
fi

# --- 汇总 ---
echo ""
echo "=== AUTOPSY SUMMARY ==="
echo "  $TICKER | $CHARS_K | CG: $CG_RESULT | Compliance: $COMPLIANCE | DM: $DM_COUNT | SC: $SCORECARD"

# --- 追加到 evolution_log.yaml ---
LOG_FILE="knowledge/evolution_log.yaml"

# 确保文件存在且有header
if [ ! -f "$LOG_FILE" ]; then
    cat > "$LOG_FILE" << 'HEADER'
# Evolution Log — 进化历史记录
# 每份报告Complete后由 post_report_autopsy.sh 自动追加
# AI读取最近3条用于Phase -1 + 进化提议
# 质量趋势: 连续3份↑=继续 | 连续2份↓=审查 | chars↑quality平=简化

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
    scorecard: "$SCORECARD"
    quality: null  # AI填入 (1.0-5.0)
    top_technique: null  # AI填入
    top_lesson: null  # AI填入
    evolution_proposed: null  # AI填入
    evolution_status: pending  # pending/approved/rejected
ENTRY

echo ""
echo "  -> 已追加到 $LOG_FILE"
echo ""
echo "=== AI下一步 ==="
echo "  1. 填入 quality (1.0-5.0) — 基于4 Agent交叉审计或自评"
echo "  2. 填入 top_technique / top_lesson"
echo "  3. 运行: bash scripts/update_excellence_catalog.sh $TICKER $REPORT"
echo "  4. 生成进化提议 -> 用户审批"
echo "  5. 更新 knowledge/L0_index.yaml"
