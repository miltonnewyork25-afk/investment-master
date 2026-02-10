#!/bin/bash
# ============================================================
# quality_gate_complete.sh — Tier 3 Complete报告质量门控 v1.1
# ============================================================
# 用法:
#   ./tests/quality_gate_complete.sh <Complete报告.md> [benchmark_chars]
#   例: ./tests/quality_gate_complete.sh reports/META/META_Complete_v1.0_2026-02-08.md
#
# 门控项 (13项, 基于5报告滚动最佳值):
#   CG1. Complete总字符 ≥ 基准80% (249,049)
#   CG2. Phase 5字符 ≥ 基准80% (58,867)
#   CG3. 评分维度 ≥ 8个
#   CG4. Kill Switch ≥ 12个(详细格式)
#   CG5. 可验证预测 ≥ 14个
#   CG6. VP三情景检查 (≥80% VP含Bear/Bull)
#   CG7. CQ闭环检查 (置信度路径+验证事件)
#   CG8. 标注密度 ≥ 25/万字符
#   CG9. 硬数据占比 ≥ 36%
#   CG10. Mermaid图表 ≥ 24个
#   CG11. 投资日历+行动清单存在
#   CG12. 非共识洞察注册表 ≥ 5个CI (v1.1新增)
#   CG13. 分析框架注册表存在 (v1.1新增)
#
# 退出码: 0=全部通过, 1=有失败项
# 更新: v1.1 (2026-02-10) — 复利飞轮反思编码CG12/CG13+密度/Mermaid上调
# ============================================================

# --- 参数 ---
FILE="${1:?用法: $0 <Complete报告.md> [benchmark_chars]}"
BENCHMARK_CHARS="${2:-311311}"

# --- 计算80%地板 ---
FLOOR_COMPLETE=$((BENCHMARK_CHARS * 80 / 100))
FLOOR_PHASE5=58867
MIN_DIMENSIONS=8
MIN_KS=12
MIN_VP=14
MIN_MERMAID=24
MIN_DENSITY=25
MIN_HARD_RATIO=36
MIN_CI=5

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
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

echo "=============================================="
echo -e " ${CYAN}Complete Report Quality Gate v1.0${NC}"
echo " 文件: $(basename "$FILE")"
echo " 基准字符: $BENCHMARK_CHARS | 80%地板: $FLOOR_COMPLETE"
echo "=============================================="
echo ""

# 检查文件存在
if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: $FILE${NC}"
    exit 1
fi

# === CG1: Complete总字符 ===
CHARS=$(wc -m < "$FILE")
CHARS="${CHARS// /}"
if [ "$CHARS" -lt "$FLOOR_COMPLETE" ]; then
    echo -e "${RED}FAIL CG1: Complete总字符 ${CHARS} < 80%地板 ${FLOOR_COMPLETE} (基准: ${BENCHMARK_CHARS})${NC}"
    ERRORS=$((ERRORS + 1))
else
    RATIO=$((CHARS * 100 / BENCHMARK_CHARS))
    echo -e "${GREEN}PASS CG1: Complete总字符 ${CHARS} (基准的${RATIO}%)${NC}"
fi

# === CG2: Phase 5字符 ===
# 检测Phase 5起始: 查找"# Phase 5"或"## Phase 5"级别的标题(不匹配普通提及)
# 也匹配 "# Ch37" ~ "# Ch44" 风格的Phase 5章节开头
PHASE5_START=$(grep -n -E '^#{1,3} *(Phase *5|P5|决策输出)' "$FILE" 2>/dev/null | head -1 | cut -d: -f1)
if [ -z "$PHASE5_START" ] || [ "$PHASE5_START" -eq 0 ] 2>/dev/null; then
    # 备选: 查找 Ch37/Ch38 级别标题 (GOOGL Ch37开始, META Ch38开始)
    PHASE5_START=$(grep -n -E '^#{1,3} *Ch3[789]|^#{1,3} *Ch4[0-4]' "$FILE" 2>/dev/null | head -1 | cut -d: -f1)
fi
if [ -n "$PHASE5_START" ] && [ "$PHASE5_START" -gt 0 ]; then
    PHASE5_CHARS=$(tail -n +"$PHASE5_START" "$FILE" | wc -m)
    PHASE5_CHARS="${PHASE5_CHARS// /}"
    if [ "$PHASE5_CHARS" -lt "$FLOOR_PHASE5" ]; then
        echo -e "${RED}FAIL CG2: Phase 5字符 ${PHASE5_CHARS} < 80%地板 ${FLOOR_PHASE5} (基准: 73,584)${NC}"
        ERRORS=$((ERRORS + 1))
    else
        P5_RATIO=$((PHASE5_CHARS * 100 / 73584))
        echo -e "${GREEN}PASS CG2: Phase 5字符 ${PHASE5_CHARS} (基准的${P5_RATIO}%)${NC}"
    fi
else
    echo -e "${YELLOW}WARN CG2: 未检测到Phase 5区域标记(需要以#开头的Phase 5/Ch37-Ch44标题)${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# === CG3: 评分维度数 ===
# 方法1: 检测评分表格中编号维度行 (| 1 | ... | XX% | 格式)
DIMENSION_COUNT=$(grep -cE '^\| *[0-9]{1,2} *\|.+\| *[0-9]{1,2}%' "$FILE" 2>/dev/null || echo 0)
if [ "$DIMENSION_COUNT" -lt "$MIN_DIMENSIONS" ]; then
    # 方法2: 检测10个标准维度关键词(在评分区域附近)
    # 统计出现的标准维度关键词种类数(去重)
    DIMENSION_KEYWORDS=$(grep -oE '估值吸引力|增长质量|护城河强度|财务健康|管理层质量|催化剂明确|风险可控|聪明钱信号|竞争定位|时机因素' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    DIMENSION_KEYWORDS="${DIMENSION_KEYWORDS// /}"
    if [ "$DIMENSION_KEYWORDS" -gt "$DIMENSION_COUNT" ]; then
        DIMENSION_COUNT=$DIMENSION_KEYWORDS
    fi
fi
if [ "$DIMENSION_COUNT" -lt "$MIN_DIMENSIONS" ]; then
    echo -e "${RED}FAIL CG3: 评分维度 ${DIMENSION_COUNT} < 要求 ${MIN_DIMENSIONS}${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG3: 评分维度 ${DIMENSION_COUNT} (要求≥${MIN_DIMENSIONS})${NC}"
fi

# === CG4: Kill Switch数量(详细格式) ===
KS_UNIQUE=$(grep -oE 'KS-[A-Z]+-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
KS_UNIQUE="${KS_UNIQUE// /}"
if [ "$KS_UNIQUE" -lt "$MIN_KS" ]; then
    # 备选: KS-数字格式
    KS_UNIQUE2=$(grep -oE 'KS-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    KS_UNIQUE2="${KS_UNIQUE2// /}"
    if [ "$KS_UNIQUE2" -gt "$KS_UNIQUE" ]; then
        KS_UNIQUE=$KS_UNIQUE2
    fi
fi
if [ "$KS_UNIQUE" -lt "$MIN_KS" ]; then
    echo -e "${RED}FAIL CG4: Kill Switch唯一数 ${KS_UNIQUE} < 要求 ${MIN_KS}${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG4: Kill Switch唯一数 ${KS_UNIQUE} (要求≥${MIN_KS})${NC}"
fi

# KS详细度检查 (触发条件+阈值+动作 三要素)
KS_TRIGGER=$(count_matches '触发条件' "$FILE" "-c")
KS_THRESHOLD=$(count_matches '具体阈值\|阈值' "$FILE" "-c")
KS_ACTION=$(count_matches '动作\|行动\|清仓\|减仓' "$FILE" "-c")
echo "       KS详细度: 触发条件=${KS_TRIGGER} 阈值=${KS_THRESHOLD} 动作=${KS_ACTION}"

# === CG5: 可验证预测数量 ===
VP_COUNT=$(grep -oE 'VP-[0-9]+|P-[A-Z]+-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
VP_COUNT="${VP_COUNT// /}"
if [ "$VP_COUNT" -lt "$MIN_VP" ]; then
    echo -e "${RED}FAIL CG5: 可验证预测唯一数 ${VP_COUNT} < 要求 ${MIN_VP}${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG5: 可验证预测唯一数 ${VP_COUNT} (要求≥${MIN_VP})${NC}"
fi

# === CG6: VP三情景检查 ===
# 匹配多种情景表达: Bear/Bull/Base, 看空/看多/基准, 悲观/乐观/基础
BEAR_IN_VP=$(grep -ciE 'bear|看空|悲观|下行' "$FILE" 2>/dev/null || echo 0)
BULL_IN_VP=$(grep -ciE 'bull|看多|乐观|上行' "$FILE" 2>/dev/null || echo 0)
BASE_IN_VP=$(grep -ciE 'base|基准|基础|中性' "$FILE" 2>/dev/null || echo 0)
if [ "$VP_COUNT" -gt 0 ]; then
    # 至少需要在VP区域有三种情景各出现多次
    MIN_SCENARIO_MENTIONS=$((VP_COUNT / 2))
    if [ "$MIN_SCENARIO_MENTIONS" -lt 3 ]; then MIN_SCENARIO_MENTIONS=3; fi
    SCENARIO_MIN=$BEAR_IN_VP
    if [ "$BULL_IN_VP" -lt "$SCENARIO_MIN" ]; then SCENARIO_MIN=$BULL_IN_VP; fi
    if [ "$SCENARIO_MIN" -lt "$MIN_SCENARIO_MENTIONS" ]; then
        echo -e "${RED}FAIL CG6: VP三情景覆盖不足 Bear=${BEAR_IN_VP} Bull=${BULL_IN_VP} Base=${BASE_IN_VP} (需Bear/Bull各≥${MIN_SCENARIO_MENTIONS})${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}PASS CG6: VP三情景 Bear=${BEAR_IN_VP} Bull=${BULL_IN_VP} Base=${BASE_IN_VP}${NC}"
    fi
else
    echo -e "${RED}FAIL CG6: 无可验证预测，无法检查三情景${NC}"
    ERRORS=$((ERRORS + 1))
fi

# === CG7: CQ闭环检查 ===
CQ_COUNT=$(grep -oE 'CQ[0-9]+|CQ-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
CQ_COUNT="${CQ_COUNT// /}"
CQ_CONFIDENCE=$(count_matches '置信度路径\|最终置信度\|置信度.*%' "$FILE" "-c")
CQ_VERIFY=$(count_matches '验证事件\|1年内验证' "$FILE" "-c")
CQ_WRONG=$(count_matches '如果我们错了\|如果错了' "$FILE" "-c")
echo "       CQ闭环: CQ数=${CQ_COUNT} 置信度路径=${CQ_CONFIDENCE} 验证事件=${CQ_VERIFY} 反思=${CQ_WRONG}"
if [ "$CQ_COUNT" -lt 5 ]; then
    echo -e "${YELLOW}WARN CG7: CQ数量 ${CQ_COUNT} (建议≥5)${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG7: CQ数量 ${CQ_COUNT}${NC}"
fi

# === CG8: 标注密度 ===
OLD_ANN=$(count_matches '\[(A|B|P|E):' "$FILE")
NEW_ANN=$(count_matches '\[(硬数据|合理推断|主观判断):' "$FILE")
TOTAL_ANN=$((OLD_ANN + NEW_ANN))
if [ "$CHARS" -gt 0 ]; then
    DENSITY=$(python3 -c "print(round($TOTAL_ANN * 10000 / $CHARS, 1))")
else
    DENSITY=0
fi
DENSITY_OK=$(python3 -c "print(1 if $DENSITY >= $MIN_DENSITY else 0)")
if [ "$DENSITY_OK" -eq 0 ]; then
    echo -e "${RED}FAIL CG8: 标注密度 ${DENSITY}/万字符 < 要求 ${MIN_DENSITY}/万字符 (总数: ${TOTAL_ANN})${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG8: 标注密度 ${DENSITY}/万字符 (总数: ${TOTAL_ANN})${NC}"
fi

# === CG9: 硬数据占比 ===
HARD_DATA=$(count_matches '\[(A|B|P):|\[硬数据:' "$FILE")
if [ "$TOTAL_ANN" -gt 0 ]; then
    HARD_RATIO=$(python3 -c "print(round($HARD_DATA * 100 / $TOTAL_ANN, 1))")
    HARD_OK=$(python3 -c "print(1 if $HARD_RATIO >= $MIN_HARD_RATIO else 0)")
    if [ "$HARD_OK" -eq 0 ]; then
        echo -e "${RED}FAIL CG9: 硬数据占比 ${HARD_RATIO}% < 要求 ${MIN_HARD_RATIO}% (${HARD_DATA}/${TOTAL_ANN})${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}PASS CG9: 硬数据占比 ${HARD_RATIO}% (${HARD_DATA}/${TOTAL_ANN})${NC}"
    fi
else
    echo -e "${YELLOW}WARN CG9: 无标注，无法计算硬数据占比${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# === CG10: Mermaid图表 ===
MERMAID_COUNT=$(grep -c '```mermaid' "$FILE" 2>/dev/null || echo 0)
if [ "$MERMAID_COUNT" -lt "$MIN_MERMAID" ]; then
    echo -e "${YELLOW}WARN CG10: Mermaid图表 ${MERMAID_COUNT} < 建议 ${MIN_MERMAID}${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG10: Mermaid图表 ${MERMAID_COUNT} (要求≥${MIN_MERMAID})${NC}"
fi

# === CG11: 投资日历+行动清单 ===
HAS_CALENDAR=$(grep -ci '投资日历\|investment calendar' "$FILE" 2>/dev/null || echo 0)
HAS_ACTION=$(grep -ci '行动清单\|action.*plan\|90天\|90-day' "$FILE" 2>/dev/null || echo 0)
HAS_DISCLAIMER=$(grep -ci '免责声明\|不构成投资建议' "$FILE" 2>/dev/null || echo 0)
MISSING=""
if [ "$HAS_CALENDAR" -eq 0 ]; then MISSING="${MISSING}投资日历 "; fi
if [ "$HAS_ACTION" -eq 0 ]; then MISSING="${MISSING}行动清单 "; fi
if [ "$HAS_DISCLAIMER" -eq 0 ]; then MISSING="${MISSING}免责声明 "; fi

if [ -n "$MISSING" ]; then
    echo -e "${RED}FAIL CG11: 缺少必需章节: ${MISSING}${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG11: 投资日历+行动清单+免责声明 均存在${NC}"
fi

# === CG12: 非共识洞察注册表 (v1.1新增) ===
CI_COUNT=$(grep -oE 'CI-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
CI_COUNT="${CI_COUNT// /}"
HAS_CI_SECTION=$(grep -ci '非共识洞察注册表\|Contrarian.*Insight.*Registry\|非共识洞察' "$FILE" 2>/dev/null || echo 0)
if [ "$CI_COUNT" -lt "$MIN_CI" ]; then
    echo -e "${YELLOW}WARN CG12: 非共识洞察 CI-数 ${CI_COUNT} < 建议 ${MIN_CI} (注册表节: ${HAS_CI_SECTION})${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG12: 非共识洞察 CI-唯一数 ${CI_COUNT} (要求≥${MIN_CI})${NC}"
fi

# === CG13: 分析框架注册表 (v1.1新增) ===
HAS_FW_REGISTRY=$(grep -ci '框架注册表\|Framework.*Registry\|分析框架注册' "$FILE" 2>/dev/null || echo 0)
FW_CUSTOM=$(grep -ciE '原创.*×1\.5\|自研.*×1\.5\|custom.*×1\.5' "$FILE" 2>/dev/null || echo 0)
if [ "$HAS_FW_REGISTRY" -eq 0 ]; then
    echo -e "${YELLOW}WARN CG13: 未检测到分析框架注册表章节${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG13: 分析框架注册表存在 (提及${HAS_FW_REGISTRY}次, 原创框架${FW_CUSTOM}个)${NC}"
fi

# --- 汇总 ---
echo ""
echo "=============================================="
echo -e " ${CYAN}Complete Quality Gate v1.1 检查完成${NC}"
echo "=============================================="
echo " 文件: $(basename "$FILE")"
echo " 总字符: ${CHARS} / 基准 ${BENCHMARK_CHARS} (地板 ${FLOOR_COMPLETE})"
echo " 标注: ${TOTAL_ANN} (密度: ${DENSITY}/万字符)"
echo " KS: ${KS_UNIQUE} | VP: ${VP_COUNT} | CQ: ${CQ_COUNT} | CI: ${CI_COUNT}"
echo " Mermaid: ${MERMAID_COUNT} | 评分维度: ${DIMENSION_COUNT} | 框架注册: ${HAS_FW_REGISTRY}"
echo -e " 错误: ${RED}${ERRORS}${NC} | 警告: ${YELLOW}${WARNINGS}${NC}"
echo "=============================================="

if [ "$ERRORS" -gt 0 ]; then
    echo ""
    echo -e "${RED}══════════════════════════════════════════${NC}"
    echo -e "${RED}  RESULT: FAILED (${ERRORS} 项门控未通过)${NC}"
    echo -e "${RED}  禁止commit + 禁止标记完成 + 必须返工${NC}"
    echo -e "${RED}══════════════════════════════════════════${NC}"
    exit 1
else
    if [ "$WARNINGS" -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}RESULT: PASSED with ${WARNINGS} warnings${NC}"
    else
        echo ""
        echo -e "${GREEN}RESULT: ALL GATES PASSED ✓${NC}"
    fi
    exit 0
fi
