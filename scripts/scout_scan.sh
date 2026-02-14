#!/bin/bash
# ============================================================
# scout_scan.sh — Scout Agent 预扫描脚本 v1.0
# ============================================================
# 用法:
#   bash scripts/scout_scan.sh <参考报告.md> [当前TICKER]
#   例: bash scripts/scout_scan.sh reports/GOOGL/GOOGL_Complete_v4.0_2026-02-12.md MSFT
#
# 功能: 在Scout Agent(LLM)深读之前，用脚本快速扫描参考报告的结构指标。
#       产出结构化摘要供Scout Agent消费，避免LLM读全文浪费context。
#
# 输出: 打印结构化扫描结果，包括:
#   1. 报告基础指标 (字数/标注/密度/Mermaid)
#   2. 章节结构 (H1/H2标题树)
#   3. 关键章节定位 (Reverse DCF/Bear Case/KS/CI所在行号范围)
#   4. DM锚点分布 (各类别数量)
#   5. 方法使用指纹 (OVM/Discovery/传统)
# ============================================================

REF="${1:?用法: $0 <参考报告.md> [当前TICKER]}"
TICKER="${2:-UNKNOWN}"

if [ ! -f "$REF" ]; then
    echo "FATAL: 文件不存在: $REF"
    exit 1
fi

FILENAME=$(basename "$REF")

echo "=============================================="
echo " Scout Scan v1.0 — 参考报告预扫描"
echo "=============================================="
echo " 参考报告: $FILENAME"
echo " 当前项目: $TICKER"
echo "----------------------------------------------"

# ============================================================
# 1. 基础指标
# ============================================================
echo ""
echo "[1/5] 基础指标"

CHAR_COUNT=$(wc -m < "$REF" | tr -d ' ')
WORD_COUNT=$(wc -w < "$REF" | tr -d ' ')

# 标注
ANNOTATION_COUNT=$({ grep -oE '\[(硬数据|合理推断|主观假设|分析师估计|行业数据)[^]]*\]' "$REF" 2>/dev/null || true; } | wc -l | tr -d ' ')
EC_COUNT=$({ grep -oE 'EC-[A-Z]+-[0-9]+' "$REF" 2>/dev/null || true; } | wc -l | tr -d ' ')
DM_COUNT=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$REF" 2>/dev/null || true; } | wc -l | tr -d ' ')
TOTAL_ANN=$((ANNOTATION_COUNT + EC_COUNT + DM_COUNT))

if [ "$CHAR_COUNT" -gt 0 ]; then
    DENSITY=$(echo "scale=1; $TOTAL_ANN * 10000 / $CHAR_COUNT" | bc 2>/dev/null || echo "0")
else
    DENSITY="0"
fi

# Mermaid
MERMAID_COUNT=$({ grep -c '```mermaid' "$REF" 2>/dev/null || true; })

echo "  字符数: ${CHAR_COUNT} ($(echo "scale=1; $CHAR_COUNT / 1000" | bc)K)"
echo "  标注总数: ${TOTAL_ANN} (内联${ANNOTATION_COUNT} + EC${EC_COUNT} + DM${DM_COUNT})"
echo "  标注密度: ${DENSITY}/万"
echo "  Mermaid图: ${MERMAID_COUNT}"

# ============================================================
# 2. 章节结构 (H1/H2)
# ============================================================
echo ""
echo "[2/5] 章节结构 (H1/H2)"

{ grep -n '^# \|^## ' "$REF" 2>/dev/null || true; } | head -40 | while IFS= read -r line; do
    echo "  $line"
done

H1_COUNT=$({ grep -c '^# ' "$REF" 2>/dev/null || true; })
H2_COUNT=$({ grep -c '^## ' "$REF" 2>/dev/null || true; })
echo "  ---"
echo "  H1: ${H1_COUNT} | H2: ${H2_COUNT}"

# ============================================================
# 3. 关键章节定位 (Scout Agent精读目标)
# ============================================================
echo ""
echo "[3/5] 关键章节定位 (Scout精读目标)"

for SECTION in "Reverse DCF" "Bear Case" "Kill Switch" "非共识\|CI-\|Contrarian" "KS-\|Kill.Switch注册" "TS-\|追踪信号" "Phase 4\|红队\|Red Team" "Phase 5\|综合评估\|最终"; do
    LABEL=$(echo "$SECTION" | sed 's/\\|/或/g' | head -c 30)
    LINE=$({ grep -n -i "$SECTION" "$REF" 2>/dev/null | head -1 || true; })
    if [ -n "$LINE" ]; then
        LINENUM=$(echo "$LINE" | cut -d: -f1)
        echo "  ${LABEL}: 首次出现 L${LINENUM}"
    fi
done

# ============================================================
# 4. DM锚点分布
# ============================================================
echo ""
echo "[4/5] DM/EC锚点分布"

if [ "$DM_COUNT" -gt 0 ]; then
    echo "  DM锚点类别:"
    { grep -oE 'DM-[A-Z]+' "$REF" 2>/dev/null || true; } | sort | uniq -c | sort -rn | while IFS= read -r line; do
        echo "    $line"
    done
fi

if [ "$EC_COUNT" -gt 0 ]; then
    echo "  EC锚点类别:"
    { grep -oE 'EC-[A-Z]+' "$REF" 2>/dev/null || true; } | sort | uniq -c | sort -rn | while IFS= read -r line; do
        echo "    $line"
    done
fi

if [ "$DM_COUNT" -eq 0 ] && [ "$EC_COUNT" -eq 0 ]; then
    echo "  (无DM/EC锚点，使用内联标注)"
fi

# ============================================================
# 5. 方法使用指纹
# ============================================================
echo ""
echo "[5/5] 方法使用指纹"

OVM_FOUND=$({ grep -ci 'OVM\|期权估值\|Optionality' "$REF" 2>/dev/null || true; })
DISCOVERY_FOUND=$({ grep -ci 'Discovery System\|发现系统\|可能性宽度' "$REF" 2>/dev/null || true; })
SOTP_FOUND=$({ grep -ci 'SOTP\|Sum.of.the.Parts' "$REF" 2>/dev/null || true; })
RDCF_FOUND=$({ grep -ci 'Reverse DCF\|反向DCF' "$REF" 2>/dev/null || true; })
KS_COUNT=$({ grep -oE 'KS-[0-9]+' "$REF" 2>/dev/null || true; } | sort -u | wc -l | tr -d ' ')
TS_COUNT=$({ grep -oE 'TS-[0-9]+' "$REF" 2>/dev/null || true; } | sort -u | wc -l | tr -d ' ')
CI_COUNT=$({ grep -oE 'CI-[0-9]+' "$REF" 2>/dev/null || true; } | sort -u | wc -l | tr -d ' ')
CQ_COUNT=$({ grep -oE 'CQ[0-9]\|CQ-[0-9]' "$REF" 2>/dev/null || true; } | sort -u | wc -l | tr -d ' ')

echo "  OVM期权估值: $([ "$OVM_FOUND" -gt 0 ] && echo "YES (${OVM_FOUND}处)" || echo "NO")"
echo "  Discovery System: $([ "$DISCOVERY_FOUND" -gt 0 ] && echo "YES (${DISCOVERY_FOUND}处)" || echo "NO")"
echo "  SOTP: $([ "$SOTP_FOUND" -gt 0 ] && echo "YES (${SOTP_FOUND}处)" || echo "NO")"
echo "  Reverse DCF: $([ "$RDCF_FOUND" -gt 0 ] && echo "YES (${RDCF_FOUND}处)" || echo "NO")"
echo "  KS注册: ${KS_COUNT}个 | TS追踪: ${TS_COUNT}个 | CI洞察: ${CI_COUNT}个 | CQ: ${CQ_COUNT}个"

# ============================================================
# 汇总: Scout Agent精读建议
# ============================================================
echo ""
echo "=============================================="
echo " Scout Agent精读建议"
echo "=============================================="
echo " 报告规模: $(echo "scale=0; $CHAR_COUNT / 1000" | bc)K chars — $([ "$CHAR_COUNT" -gt 300000 ] && echo "大型报告，建议精读5个关键章节" || echo "中型报告，可较完整阅读")"
echo ""
echo " 建议精读章节:"
echo "   1. Phase 4/红队 — 看空论点质量+RT回答深度"
echo "   2. Phase 5/综合评估 — 估值收敛方式+CQ闭环质量"
echo "   3. Reverse DCF — 隐含假设提取+承重墙评估方式"
echo "   4. Kill Switch注册表 — 可观测阈值的具体性"
echo "   5. CI/非共识洞察 — 洞察发现路径(如何从数据到非共识)"
echo ""
echo " 避免关注:"
echo "   - 数量指标(多少Mermaid/多少标注) — 这些是好分析的副产品"
echo "   - 章节命名方式 — 结构可以不同，重要的是分析逻辑"
echo "   - 排版/格式细节 — 与分析质量无关"
echo "=============================================="
