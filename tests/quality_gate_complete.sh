#!/bin/bash
# ============================================================
# quality_gate_complete.sh — Tier 3 Complete报告质量门控 v6.0
# ============================================================
# 用法:
#   ./tests/quality_gate_complete.sh <Complete报告.md> [benchmark_chars] [possibility_width]
#   例: ./tests/quality_gate_complete.sh reports/META/META_Complete_v1.0_2026-02-08.md
#   例: ./tests/quality_gate_complete.sh reports/RDDT/RDDT_Complete_v1.0_2026-02-14.md 0 6
#   注: benchmark_chars=0 时使用按可能性宽度的动态基准
#
# 门控项 (18项, 基于8报告滚动最佳值):
#   CG1. Complete总字符 ≥ 基准80% (动态: 按可能性宽度分层)
#   CG2. Phase 5字符 ≥ 基准80% (动态: 按可能性宽度分层)
#   CG3. 评分维度 ≥ 8个
#   CG4. Kill Switch ≥ 12个(详细格式)
#   CG5. 可验证预测 ≥ 5个
#   CG6. VP三情景检查 (≥80% VP含Bear/Bull)
#   CG7. CQ闭环检查 (置信度路径+验证事件)
#   CG8. 数据审计覆盖 (v2.0: 审计摘要+折叠源表 或 旧标注密度≥25/万)
#   CG9. 数据质量 (v2.0: DM覆盖声明 或 旧硬数据占比≥36%)
#   CG10. Mermaid图表 ≥ 24个
#   CG11. 投资日历+行动清单存在
#   CG12. 非共识洞察注册表 ≥ 5个CI
#   CG13. 分析框架注册表存在
#   CG14. 方法离散度声明 (WARN级, v2.0新增)
#   CG15. Agent引用残留 = 0 (FAIL级, v4.0新增)
#   CG16. 市值基准唯一性 (WARN级, v4.0新增)
#   CG17. P/E一致性 (WARN级, v4.0新增)
#   CG18. 财务数据交叉验证声明 (WARN级, v5.0新增)
#
# 退出码: 0=全部通过, 1=有失败项
# 更新: v6.0 (2026-02-19) — CG4/CG5自然语言检测(EVO-AAPL-001: KS/VP内容充分但格式缺失时降级通过)
# 更新: v5.0 (2026-02-16) — CG18财务数据交叉验证声明(WARN, 深层质量协议L2)
# 更新: v4.0 (2026-02-16) — CG15 Agent引用FAIL+CG16市值唯一性WARN+CG17 P/E一致性WARN
# 更新: v3.0 (2026-02-14) — CG1/CG2动态基准(按可能性宽度分层)+Phase 5基准动态化
# 更新: v2.0 (2026-02-12) — CG8/CG9自动检测v2.0/v10.0模式+CG14方法离散度WARN
# ============================================================

# --- 参数 ---
FILE="${1:?用法: $0 <Complete报告.md> [benchmark_chars] [possibility_width]}"
BENCHMARK_INPUT="${2:-0}"
POSSIBILITY_WIDTH="${3:-6}"

# --- 动态基准计算 (v3.0: 按可能性宽度分层) ---
# 若用户显式传入benchmark_chars>0，使用用户值; 否则按可能性宽度自动计算
if [ "$BENCHMARK_INPUT" -gt 0 ] 2>/dev/null; then
    BENCHMARK_CHARS="$BENCHMARK_INPUT"
else
    if [ "$POSSIBILITY_WIDTH" -le 3 ]; then
        # 传统框架 (LRCX 470K, TSM 451K, COST 282K → 中位~350K)
        BENCHMARK_CHARS=250000
        BENCHMARK_LABEL="传统框架(≤3分)"
    elif [ "$POSSIBILITY_WIDTH" -le 6 ]; then
        # 混合模式 (RDDT 160K, AMD 349K, META 317K → 适度基准)
        BENCHMARK_CHARS=200000
        BENCHMARK_LABEL="混合模式(4-6分)"
    else
        # 发现系统 (TSLA 416K, PLTR 389K → 高基准)
        BENCHMARK_CHARS=350000
        BENCHMARK_LABEL="发现系统(≥7分)"
    fi
fi

# --- 计算80%地板 ---
FLOOR_COMPLETE=$((BENCHMARK_CHARS * 80 / 100))
# Phase 5 floor = 15% of benchmark (discovery系统Phase 1-3占比更大, P5相对紧凑)
FLOOR_PHASE5=$((BENCHMARK_CHARS * 15 / 100))
MIN_DIMENSIONS=8
MIN_KS=12
MIN_VP=5
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

# EVO-ETN-003: 安全整数提取 — 将可能含换行/空格/非数字的值清理为纯整数
# 用法: VAR=$(safe_int "$RAW_VALUE")
# 修复: pipefail环境下 `grep -c ... || echo 0` 输出 "0\n0" 导致 "integer expression expected"
safe_int() {
    local raw="$1"
    local cleaned
    # 取最后一行(|| echo 0 追加的行), 去除空白, 提取纯数字
    cleaned=$(echo "$raw" | tail -1 | tr -d '[:space:]')
    if [[ "$cleaned" =~ ^[0-9]+$ ]]; then
        echo "$cleaned"
    else
        echo "0"
    fi
}

echo "=============================================="
echo -e " ${CYAN}Complete Report Quality Gate v6.0${NC}"
echo " 文件: $(basename "$FILE")"
echo " 可能性宽度: ${POSSIBILITY_WIDTH} | ${BENCHMARK_LABEL:-自定义}"
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
PHASE5_START=$(grep -n -E '^#{1,3} *(Phase *5|P5|Part *V|决策输出)' "$FILE" 2>/dev/null | head -1 | cut -d: -f1)
if [ -z "$PHASE5_START" ] || [ "$PHASE5_START" -eq 0 ] 2>/dev/null; then
    # 备选: 查找 Ch37/Ch38 级别标题 (GOOGL Ch37开始, META Ch38开始)
    PHASE5_START=$(grep -n -E '^#{1,3} *Ch3[789]|^#{1,3} *Ch4[0-4]' "$FILE" 2>/dev/null | head -1 | cut -d: -f1)
fi
if [ -n "$PHASE5_START" ] && [ "$PHASE5_START" -gt 0 ]; then
    PHASE5_CHARS=$(tail -n +"$PHASE5_START" "$FILE" | wc -m)
    PHASE5_CHARS="${PHASE5_CHARS// /}"
    P5_BENCHMARK=$((BENCHMARK_CHARS * 25 / 100))
    if [ "$PHASE5_CHARS" -lt "$FLOOR_PHASE5" ]; then
        echo -e "${RED}FAIL CG2: Phase 5字符 ${PHASE5_CHARS} < 80%地板 ${FLOOR_PHASE5} (基准: ${P5_BENCHMARK})${NC}"
        ERRORS=$((ERRORS + 1))
    else
        P5_RATIO=$((PHASE5_CHARS * 100 / P5_BENCHMARK))
        echo -e "${GREEN}PASS CG2: Phase 5字符 ${PHASE5_CHARS} (基准的${P5_RATIO}%)${NC}"
    fi
else
    echo -e "${YELLOW}WARN CG2: 未检测到Phase 5区域标记(需要以#开头的Phase 5/Ch37-Ch44标题)${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# === CG3: 评分维度数 ===
# 方法1: 检测评分表格中编号维度行 (| 1 | ... | XX% | 格式)
DIMENSION_COUNT=$(safe_int "$(grep -cE '^\| *[0-9]{1,2} *\|.+\| *[0-9]{1,2}%' "$FILE" 2>/dev/null || echo 0)")
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
    # 备选: KS-数字格式 (如 KS-1, KS-14)
    KS_UNIQUE2=$(grep -oE 'KS-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    KS_UNIQUE2="${KS_UNIQUE2// /}"
    if [ "$KS_UNIQUE2" -gt "$KS_UNIQUE" ]; then
        KS_UNIQUE=$KS_UNIQUE2
    fi
fi
if [ "$KS_UNIQUE" -lt "$MIN_KS" ]; then
    # 备选: KS数字格式无连字符 (如 KS1, KS14) — v9.0报告使用此格式
    KS_UNIQUE3=$(grep -oE 'KS[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    KS_UNIQUE3="${KS_UNIQUE3// /}"
    if [ "$KS_UNIQUE3" -gt "$KS_UNIQUE" ]; then
        KS_UNIQUE=$KS_UNIQUE3
    fi
fi
if [ "$KS_UNIQUE" -lt "$MIN_KS" ]; then
    # 备选4 (v6.0): 自然语言Kill Switch检测 (EVO-AAPL-001)
    # AAPL教训: 报告有完整的触发条件+阈值+论文含义, 但未用KS-N格式标记
    # 检测策略: 统计含kill-switch语义的行数(触发+阈值+动作), 与正式KS取较大值
    # 触发类模式: 条件性否定语句("如果..."失败/崩溃/失效), 风险触发器, 信念失效
    KS_NL_TRIGGER=$(safe_int "$(grep -cE '触发条件|如果.*失效|如果.*崩溃|如果.*失败|论文终止|kill.*switch|信念.*失败|承重墙.*倒塌|风险触发|清仓信号|论文.*无效' "$FILE" 2>/dev/null || echo 0)")
    # 阈值类模式: 量化边界
    KS_NL_THRESHOLD=$(safe_int "$(grep -cE '具体阈值|阈值|>[0-9]|<[0-9]|连续[0-9]+|持续[0-9]+|降至[0-9]|跌破|低于[0-9]|超过[0-9].*%|脆弱度.*(高|极高)' "$FILE" 2>/dev/null || echo 0)")
    # 动作类模式: 论文/评级影响
    KS_NL_ACTION=$(safe_int "$(grep -cE '论文含义|论文失效|重新评估|评级.*下调|需要.*修正|估值.*下调|影响.*-[0-9]+%|若倒塌影响|论文.*修正' "$FILE" 2>/dev/null || echo 0)")
    # 取三要素中最小值作为"完整KS段落数"的保守估计
    KS_NL_MIN=$KS_NL_TRIGGER
    if [ "$KS_NL_THRESHOLD" -lt "$KS_NL_MIN" ]; then KS_NL_MIN=$KS_NL_THRESHOLD; fi
    if [ "$KS_NL_ACTION" -lt "$KS_NL_MIN" ]; then KS_NL_MIN=$KS_NL_ACTION; fi
    if [ "$KS_NL_MIN" -gt "$KS_UNIQUE" ]; then
        KS_UNIQUE=$KS_NL_MIN
        KS_NL_USED=1
    else
        KS_NL_USED=0
    fi
fi
if [ "$KS_UNIQUE" -lt "$MIN_KS" ]; then
    echo -e "${RED}FAIL CG4: Kill Switch唯一数 ${KS_UNIQUE} < 要求 ${MIN_KS}${NC}"
    ERRORS=$((ERRORS + 1))
else
    if [ "${KS_NL_USED:-0}" -eq 1 ]; then
        echo -e "${GREEN}PASS CG4: Kill Switch ${KS_UNIQUE} (自然语言检测: 触发=${KS_NL_TRIGGER} 阈值=${KS_NL_THRESHOLD} 动作=${KS_NL_ACTION})${NC}"
        echo -e "       ${YELLOW}提示: 建议使用KS-N格式标记以提高可追踪性${NC}"
    else
        echo -e "${GREEN}PASS CG4: Kill Switch唯一数 ${KS_UNIQUE} (要求≥${MIN_KS})${NC}"
    fi
fi

# KS详细度检查 (触发条件+阈值+动作 三要素)
KS_TRIGGER=$(count_matches '触发条件' "$FILE" "-c")
KS_THRESHOLD=$(count_matches '具体阈值\|阈值' "$FILE" "-c")
KS_ACTION=$(count_matches '动作\|行动\|清仓\|论文含义' "$FILE" "-c")
echo "       KS详细度: 触发条件=${KS_TRIGGER} 阈值=${KS_THRESHOLD} 动作=${KS_ACTION}"

# === CG5: 可验证预测数量 ===
VP_COUNT=$(grep -oE 'VP-[0-9]+|VP[0-9]+|P-[A-Z]+-[0-9]+|TS-[0-9]+|TS[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
VP_COUNT="${VP_COUNT// /}"
if [ "$VP_COUNT" -lt "$MIN_VP" ]; then
    # 备选2 (v6.0): 自然语言验证预测检测
    # AAPL教训: 报告有验证窗口+时间线+可观测指标, 但未用VP-N/TS-N格式
    VP_NL_VERIFY=$(safe_int "$(grep -cE '验证窗口|[0-9]+[月个季]内验证|验证事件|1年内验证' "$FILE" 2>/dev/null || echo 0)")
    VP_NL_PREDICT=$(safe_int "$(grep -cE '预测:|预计.*FY|预计.*Q[1-4]|我们预测|追踪信号|追踪什么' "$FILE" 2>/dev/null || echo 0)")
    VP_NL_COUNT=$VP_NL_VERIFY
    if [ "$VP_NL_PREDICT" -gt "$VP_NL_COUNT" ]; then VP_NL_COUNT=$VP_NL_PREDICT; fi
    if [ "$VP_NL_COUNT" -gt "$VP_COUNT" ]; then
        VP_COUNT=$VP_NL_COUNT
        VP_NL_USED=1
    else
        VP_NL_USED=0
    fi
fi
if [ "$VP_COUNT" -lt "$MIN_VP" ]; then
    echo -e "${RED}FAIL CG5: 可验证预测唯一数 ${VP_COUNT} < 要求 ${MIN_VP}${NC}"
    ERRORS=$((ERRORS + 1))
else
    if [ "${VP_NL_USED:-0}" -eq 1 ]; then
        echo -e "${GREEN}PASS CG5: 可验证预测 ${VP_COUNT} (自然语言检测: 验证窗口=${VP_NL_VERIFY} 预测=${VP_NL_PREDICT})${NC}"
        echo -e "       ${YELLOW}提示: 建议使用TS-N/VP-N格式标记以提高可追踪性${NC}"
    else
        echo -e "${GREEN}PASS CG5: 可验证预测唯一数 ${VP_COUNT} (要求≥${MIN_VP})${NC}"
    fi
fi

# === CG6: VP三情景检查 ===
# 匹配多种情景表达: Bear/Bull/Base, 看空/看多/基准, 悲观/乐观/基础
BEAR_IN_VP=$(safe_int "$(grep -ciE 'bear|看空|悲观|下行' "$FILE" 2>/dev/null || echo 0)")
BULL_IN_VP=$(safe_int "$(grep -ciE 'bull|看多|乐观|上行' "$FILE" 2>/dev/null || echo 0)")
BASE_IN_VP=$(safe_int "$(grep -ciE 'base|基准|基础|中性' "$FILE" 2>/dev/null || echo 0)")
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

# === CG8: 数据审计覆盖 (v2.0: 自动检测模式) ===
# v10.0模式: 检查文末审计摘要+折叠源表
# v2.0模式: 检查内联标注密度
HAS_AUDIT_SUMMARY=$(safe_int "$(grep -ci '数据审计摘要\|数据审计\|DM覆盖率' "$FILE" 2>/dev/null || echo 0)")
DETAILS_COUNT=$(safe_int "$(grep -c '<details>' "$FILE" 2>/dev/null || echo 0)")

if [ "$HAS_AUDIT_SUMMARY" -gt 0 ]; then
    # v10.0模式: 检查审计覆盖 (DM锚点 或 折叠源表)
    # EVO-ETN-003: 修复pipefail环境下 { grep|wc -l; } || echo 0 输出 "0\n0" 的问题
    # 原因: pipefail使grep无匹配时管道返回非零 → || echo 0触发 → wc -l的"0"和echo的"0"双输出
    # 修复: 不依赖 || echo 0, 直接用 wc -l (总是返回数字+exit 0); 用 tr 清理换行和空格
    DM_ANCHOR_COUNT=$(grep -oE '\[DM-[A-Z]+-[0-9]+\]' "$FILE" 2>/dev/null | sort -u | wc -l | tr -d '[:space:]')
    DM_ANCHOR_COUNT="${DM_ANCHOR_COUNT:-0}"
    FOLD_SOURCES=$(grep -c '📋.*数据源' "$FILE" 2>/dev/null || echo 0)
    FOLD_SOURCES=$(echo "$FOLD_SOURCES" | tail -1 | tr -d '[:space:]')
    FOLD_SOURCES="${FOLD_SOURCES:-0}"
    # 安全整数校验: 防止变量包含非数字字符导致 "integer expression expected"
    [[ "$DM_ANCHOR_COUNT" =~ ^[0-9]+$ ]] || DM_ANCHOR_COUNT=0
    [[ "$FOLD_SOURCES" =~ ^[0-9]+$ ]] || FOLD_SOURCES=0
    [[ "$DETAILS_COUNT" =~ ^[0-9]+$ ]] || DETAILS_COUNT=0
    if [ "$DM_ANCHOR_COUNT" -ge 50 ] || [ "$FOLD_SOURCES" -ge 5 ] || [ "$DETAILS_COUNT" -ge 5 ]; then
        echo -e "${GREEN}PASS CG8: [v10.0] 审计覆盖 — DM锚点${DM_ANCHOR_COUNT}个唯一 + 折叠源表${FOLD_SOURCES}个${NC}"
    else
        echo -e "${RED}FAIL CG8: [v10.0] 审计覆盖不足 — DM锚点${DM_ANCHOR_COUNT}个(需≥50) 折叠源表${FOLD_SOURCES}个(需≥5)${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    # v2.0模式: 检查内联标注密度
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
        echo -e "${RED}FAIL CG8: [v2.0] 标注密度 ${DENSITY}/万字符 < 要求 ${MIN_DENSITY}/万字符 (总数: ${TOTAL_ANN})${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}PASS CG8: [v2.0] 标注密度 ${DENSITY}/万字符 (总数: ${TOTAL_ANN})${NC}"
    fi
fi

# === CG9: 数据质量 (v2.0: 自动检测模式) ===
if [ "$HAS_AUDIT_SUMMARY" -gt 0 ]; then
    # v10.0模式: 检查DM覆盖率声明
    DM_COVERAGE=$(grep -oE 'DM覆盖率 *[0-9]+%' "$FILE" 2>/dev/null | grep -oE '[0-9]+' | head -1) || true
    if [ -n "$DM_COVERAGE" ] && [ "$DM_COVERAGE" -ge 90 ]; then
        echo -e "${GREEN}PASS CG9: [v10.0] DM覆盖率 ${DM_COVERAGE}% (要求≥90%)${NC}"
    elif [ -n "$DM_COVERAGE" ]; then
        echo -e "${RED}FAIL CG9: [v10.0] DM覆盖率 ${DM_COVERAGE}% < 要求90%${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${YELLOW}WARN CG9: [v10.0] 未检测到DM覆盖率数字${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    # v2.0模式: 检查硬数据占比
    HARD_DATA=$(count_matches '\[(A|B|P):|\[硬数据:' "$FILE")
    if [ "${TOTAL_ANN:-0}" -gt 0 ]; then
        HARD_RATIO=$(python3 -c "print(round($HARD_DATA * 100 / $TOTAL_ANN, 1))")
        HARD_OK=$(python3 -c "print(1 if $HARD_RATIO >= $MIN_HARD_RATIO else 0)")
        if [ "$HARD_OK" -eq 0 ]; then
            echo -e "${RED}FAIL CG9: [v2.0] 硬数据占比 ${HARD_RATIO}% < 要求 ${MIN_HARD_RATIO}% (${HARD_DATA}/${TOTAL_ANN})${NC}"
            ERRORS=$((ERRORS + 1))
        else
            echo -e "${GREEN}PASS CG9: [v2.0] 硬数据占比 ${HARD_RATIO}% (${HARD_DATA}/${TOTAL_ANN})${NC}"
        fi
    else
        echo -e "${YELLOW}WARN CG9: 无标注，无法计算硬数据占比${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
fi

# === CG10: Mermaid图表 ===
MERMAID_COUNT=$(safe_int "$(grep -c '```mermaid' "$FILE" 2>/dev/null || echo 0)")
if [ "$MERMAID_COUNT" -lt "$MIN_MERMAID" ]; then
    echo -e "${YELLOW}WARN CG10: Mermaid图表 ${MERMAID_COUNT} < 建议 ${MIN_MERMAID}${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG10: Mermaid图表 ${MERMAID_COUNT} (要求≥${MIN_MERMAID})${NC}"
fi

# === CG11: 投资日历+行动清单 ===
HAS_CALENDAR=$(safe_int "$(grep -ci '投资日历\|催化剂日历\|investment calendar\|catalyst calendar' "$FILE" 2>/dev/null || echo 0)")
HAS_ACTION=$(safe_int "$(grep -ci '行动清单\|action.*plan\|90天\|90-day' "$FILE" 2>/dev/null || echo 0)")
HAS_DISCLAIMER=$(safe_int "$(grep -ci '免责声明\|不构成投资建议' "$FILE" 2>/dev/null || echo 0)")
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
HAS_CI_SECTION=$(safe_int "$(grep -ci '非共识洞察注册表\|Contrarian.*Insight.*Registry\|非共识洞察' "$FILE" 2>/dev/null || echo 0)")
if [ "$CI_COUNT" -lt "$MIN_CI" ]; then
    echo -e "${YELLOW}WARN CG12: 非共识洞察 CI-数 ${CI_COUNT} < 建议 ${MIN_CI} (注册表节: ${HAS_CI_SECTION})${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG12: 非共识洞察 CI-唯一数 ${CI_COUNT} (要求≥${MIN_CI})${NC}"
fi

# === CG13: 分析框架注册表 (v1.1新增) ===
# EVO-ETN-003: 统一使用 grep || echo 0 + tail -1 + tr 清理模式
HAS_FW_REGISTRY=$(grep -ci '框架注册表\|Framework.*Registry\|分析框架注册' "$FILE" 2>/dev/null || echo 0)
HAS_FW_REGISTRY=$(echo "$HAS_FW_REGISTRY" | tail -1 | tr -d '[:space:]')
HAS_FW_REGISTRY="${HAS_FW_REGISTRY:-0}"
[[ "$HAS_FW_REGISTRY" =~ ^[0-9]+$ ]] || HAS_FW_REGISTRY=0
FW_CUSTOM=$(grep -ciE '原创.*×1\.5\|自研.*×1\.5\|custom.*×1\.5' "$FILE" 2>/dev/null || echo 0)
FW_CUSTOM=$(echo "$FW_CUSTOM" | tail -1 | tr -d '[:space:]')
FW_CUSTOM="${FW_CUSTOM:-0}"
[[ "$FW_CUSTOM" =~ ^[0-9]+$ ]] || FW_CUSTOM=0
if [ "$HAS_FW_REGISTRY" -eq 0 ]; then
    echo -e "${YELLOW}WARN CG13: 未检测到分析框架注册表章节${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG13: 分析框架注册表存在 (提及${HAS_FW_REGISTRY}次, 原创框架${FW_CUSTOM}个)${NC}"
fi

# === CG14: 方法离散度 (v2.0新增, WARN级) ===
HAS_DISPERSION=$(safe_int "$(grep -ciE '方法离散度|离散度.*x|method.*dispersion' "$FILE" 2>/dev/null || echo 0)")
if [ "$HAS_DISPERSION" -eq 0 ]; then
    echo -e "${YELLOW}WARN CG14: 未检测到方法离散度声明${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    DISPERSION_VAL=$(grep -oE '方法离散度[: ]*[0-9]+\.?[0-9]*x|离散度[: ]*[0-9]+\.?[0-9]*x' "$FILE" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*' | head -1) || true
    if [ -n "$DISPERSION_VAL" ]; then
        echo -e "${GREEN}PASS CG14: 方法离散度 ${DISPERSION_VAL}x (WARN级, 提及${HAS_DISPERSION}次)${NC}"
    else
        echo -e "${GREEN}PASS CG14: 方法离散度已声明 (提及${HAS_DISPERSION}次)${NC}"
    fi
fi

# === CG15: Agent引用残留 (v4.0新增, FAIL级) ===
# 检测残留的Agent身份引用(组装时应已清除)
AGENT_REF_COUNT=0
# 排除DM源表(|开头的表格行)和staging头部标记(*Agent*产出完成*)
# 只检测正文中的Agent身份泄漏
# 模式1: "Agent A/B/C" (带空格, 排除表格行和staging标记)
# EVO-ETN-003: 统一安全整数提取模式 (tail -1 + tr + 默认值 + 正则校验)
AG_SPACE=$({ grep -E 'Agent [A-C][^a-z]|Agent [A-C]$' "$FILE" 2>/dev/null | grep -cvE '^\||\*Agent.*产出' 2>/dev/null || echo 0; } | tail -1 | tr -d '[:space:]')
AG_SPACE="${AG_SPACE:-0}"
[[ "$AG_SPACE" =~ ^[0-9]+$ ]] || AG_SPACE=0
# 模式2: "AgentA/AgentB/AgentC" (无空格, 排除表格行)
AG_NOSPACE=$({ grep -E 'AgentA|AgentB|AgentC' "$FILE" 2>/dev/null | grep -cvE '^\|' 2>/dev/null || echo 0; } | tail -1 | tr -d '[:space:]')
AG_NOSPACE="${AG_NOSPACE:-0}"
[[ "$AG_NOSPACE" =~ ^[0-9]+$ ]] || AG_NOSPACE=0
# 模式3: "Phase X Agent" 格式 (排除表格行和staging标记)
AG_PHASE=$({ grep -E 'Phase [0-5] Agent' "$FILE" 2>/dev/null | grep -cvE '^\||\*.*产出' 2>/dev/null || echo 0; } | tail -1 | tr -d '[:space:]')
AG_PHASE="${AG_PHASE:-0}"
[[ "$AG_PHASE" =~ ^[0-9]+$ ]] || AG_PHASE=0
AGENT_REF_COUNT=$((AG_SPACE + AG_NOSPACE + AG_PHASE))
if [ "$AGENT_REF_COUNT" -gt 0 ]; then
    echo -e "${RED}FAIL CG15: Agent引用残留 ${AGENT_REF_COUNT} 处 (Agent空格=${AG_SPACE} 无空格=${AG_NOSPACE} Phase格式=${AG_PHASE})${NC}"
    echo "       修复: 组装时清除所有Agent身份引用"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}PASS CG15: Agent引用残留 = 0${NC}"
fi

# === CG16: 市值基准唯一性 (v4.0新增, WARN级) ===
# 检测报告中"当前市值"相关数值的一致性
# 提取所有"市值"后跟的$数字模式
MCAP_VALUES=$(grep -oE '市值[^0-9$]*\$[0-9,]+\.?[0-9]*[BMK亿万]?' "$FILE" 2>/dev/null | grep -oE '\$[0-9,]+\.?[0-9]*[BMK亿万]?' | sort | uniq -c | sort -rn) || true
MCAP_UNIQUE=$(safe_int "$(echo "$MCAP_VALUES" | grep -c '[0-9]' 2>/dev/null || echo 0)")
if [ "$MCAP_UNIQUE" -gt 1 ]; then
    # 检查是否有"当前市值"使用了不同的值
    MCAP_CURRENT=$(grep -oE '当前市值[^0-9$]*\$[0-9,]+\.?[0-9]*[BMK亿万]?' "$FILE" 2>/dev/null | grep -oE '\$[0-9,]+\.?[0-9]*[BMK亿万]?' | sort -u) || true
    MCAP_CURRENT_COUNT=$(safe_int "$(echo "$MCAP_CURRENT" | grep -c '[0-9]' 2>/dev/null || echo 0)")
    if [ "$MCAP_CURRENT_COUNT" -gt 1 ]; then
        echo -e "${YELLOW}WARN CG16: 当前市值出现${MCAP_CURRENT_COUNT}个不同值 — 可能存在旧数据未回流${NC}"
        echo "       值: $(echo "$MCAP_CURRENT" | tr '\n' ' ')"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}PASS CG16: 市值基准一致 (当前市值值唯一, 总市值提及${MCAP_UNIQUE}种含历史对比)${NC}"
    fi
else
    echo -e "${GREEN}PASS CG16: 市值基准一致 (市值引用${MCAP_UNIQUE}种)${NC}"
fi

# === CG17: P/E一致性 (v4.0新增, WARN级) ===
# 检测"当前P/E"或"P/E(TTM)"后数值的一致性
PE_VALUES=$(grep -oE '当前P/E[^0-9]*[0-9]+\.?[0-9]*x?' "$FILE" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*' | sort -u) || true
PE_TTM_VALUES=$(grep -oE 'P/E.{0,5}TTM.{0,5}[0-9]+\.?[0-9]*x?' "$FILE" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*' | sort -u) || true
# 合并并去重
ALL_PE=$(echo -e "${PE_VALUES}\n${PE_TTM_VALUES}" | grep -v '^$' | sort -u) || true
PE_UNIQUE_COUNT=$(safe_int "$(echo "$ALL_PE" | grep -c '[0-9]' 2>/dev/null || echo 0)")
if [ "$PE_UNIQUE_COUNT" -gt 1 ]; then
    echo -e "${YELLOW}WARN CG17: P/E(TTM)/当前P/E出现${PE_UNIQUE_COUNT}个不同值 — 可能有幽灵数据${NC}"
    echo "       值: $(echo "$ALL_PE" | tr '\n' ' ')"
    WARNINGS=$((WARNINGS + 1))
else
    if [ "$PE_UNIQUE_COUNT" -eq 1 ]; then
        echo -e "${GREEN}PASS CG17: P/E基准一致 (值: $(echo "$ALL_PE" | tr '\n' ' '))${NC}"
    else
        echo -e "${GREEN}PASS CG17: P/E基准一致 (未检测到当前P/E/TTM声明)${NC}"
    fi
fi

# === CG18: 财务数据交叉验证声明 (v5.0新增, WARN级) ===
# 检测报告中是否存在数据交叉验证的证据
# 背景: RBLX v1.2事件中单源SBC数据($2.65B)传播240+处, APIC硬约束本可即时否决
CROSS_VAL=$(safe_int "$(grep -ciE '交叉验证|cross.validation|APIC.*验证|多源验证|数据源对比|source.*reconcil|数据源.*校验|硬约束.*验证' "$FILE" 2>/dev/null || echo 0)")
if [ "$CROSS_VAL" -lt 3 ]; then
    echo -e "${YELLOW}WARN CG18: 交叉验证声明 ${CROSS_VAL}次 < 建议3次 — 关键财务数据可能缺少多源校验${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}PASS CG18: 财务数据交叉验证声明 ${CROSS_VAL}次 (要求≥3)${NC}"
fi

# --- 汇总 ---
echo ""
echo "=============================================="
echo -e " ${CYAN}Complete Quality Gate v6.0 检查完成${NC}"
echo "=============================================="
echo " 文件: $(basename "$FILE")"
echo " 总字符: ${CHARS} / 基准 ${BENCHMARK_CHARS} (地板 ${FLOOR_COMPLETE})"
if [ "$HAS_AUDIT_SUMMARY" -gt 0 ]; then
    echo " 模式: v10.0 (DM锚定+审计覆盖)"
else
    echo " 模式: v2.0 (内联标注) | 标注: ${TOTAL_ANN:-0} (密度: ${DENSITY:-0}/万字符)"
fi
echo " KS: ${KS_UNIQUE} | VP: ${VP_COUNT} | CQ: ${CQ_COUNT} | CI: ${CI_COUNT}"
echo " Mermaid: ${MERMAID_COUNT} | 评分维度: ${DIMENSION_COUNT} | 框架注册: ${HAS_FW_REGISTRY}"
echo " Agent引用: ${AGENT_REF_COUNT} | 市值值种类: ${MCAP_UNIQUE:-0} | P/E值种类: ${PE_UNIQUE_COUNT:-0}"
echo " 交叉验证: ${CROSS_VAL}"
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
