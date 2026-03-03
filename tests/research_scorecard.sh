#!/bin/bash
# ============================================================
# research_scorecard.sh — 研究质量记分卡 v1.2
# ============================================================
# 用法:
#   research_scorecard.sh pre  <TICKER>                        # Phase 0后评分
#   research_scorecard.sh post <Complete.md> [poss_width]      # Complete后评分
#   research_scorecard.sh compare <TICKER> <Complete.md> [pw]  # 前后对比
#
# D1-D10: 10维度 × 0-10分 = 总分100 (不变)
# D11: 分析正交度 — 8卦限覆盖热力图 (附加维度, 不计入总分)
# 与quality_gate_complete.sh互补: CG=门槛(PASS/FAIL), Scorecard=评分(0-100)
#
# 维度: D1数据基础 D2问题定义 D3分析深度 D4风险认知 D5估值框架
#       D6数据验证 D7非共识洞察 D8可视化 D9追踪体系 D10结构完整度
#       D11分析正交度 (附加)
#
# D11 三轴模型:
#   X轴 时间: 历史(←) vs 前瞻(→)
#   Y轴 结构层: 公司/行业(↓) vs 宏观/制度(↑)
#   Z轴 认知模式: 数据/模型(实) vs 判断/未知(虚)
#
# 8卦限:
#   O1 历史+微观+实证  O2 前瞻+微观+实证
#   O3 历史+宏观+实证  O4 前瞻+宏观+实证
#   O5 历史+微观+判断  O6 前瞻+微观+判断
#   O7 历史+宏观+判断  O8 前瞻+宏观+判断
#
# v1.0 (2026-02-14) — 首版
# v1.1 (2026-03-02) — D11分析正交度(8卦限覆盖热力图)
# v1.2 (2026-03-02) — D1识别DM锚点(≥300→10,≥200→9,≥100→8,≥50→7); D6识别DM锚点+硬数据标注密度 (EVO-NVDA-003)
# ============================================================

set -euo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# --- 辅助函数 ---
min() { [ "$1" -lt "$2" ] && echo "$1" || echo "$2"; }
max() { [ "$1" -gt "$2" ] && echo "$1" || echo "$2"; }
cap10() { local v="$1"; [ "$v" -gt 10 ] && echo 10 || echo "$v"; }

# 安全grep计数 (无匹配返回0, 确保返回纯整数)
count_grep() {
    local pattern="$1" file="$2" flags="${3:--c}"
    local result
    result=$(grep $flags "$pattern" "$file" 2>/dev/null | head -1) || true
    result="${result// /}"
    echo "${result:-0}"
}

# 安全grep -oE唯一计数
count_unique() {
    local pattern="$1" file="$2"
    local result
    result=$(grep -oE "$pattern" "$file" 2>/dev/null | sort -u | wc -l) || true
    echo "${result// /}"
}

# 从checkpoint.yaml安全读取值
yaml_val() {
    local key="$1" file="$2"
    grep "$key" "$file" 2>/dev/null | head -1 | sed 's/.*: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' '
}

# --- 用法检查 ---
usage() {
    echo "用法:"
    echo "  $0 pre  <TICKER>                        # Phase 0后评分"
    echo "  $0 post <Complete.md> [poss_width]      # Complete后评分"
    echo "  $0 compare <TICKER> <Complete.md> [pw]  # 前后对比"
    exit 1
}

[ $# -lt 2 ] && usage

MODE="$1"

# ============================================================
# PRE-RESEARCH 评分
# ============================================================
score_pre() {
    local TICKER="$1"

    # 查找数据目录 (支持两种路径约定)
    local REPORT_DATA="reports/${TICKER}/data"
    local RESEARCH_DIR=""
    if [ -d "${REPORT_DATA}/research" ]; then
        RESEARCH_DIR="${REPORT_DATA}/research"
    elif [ -d "data/research/${TICKER}" ]; then
        RESEARCH_DIR="data/research/${TICKER}"
    fi

    local CHECKPOINT="${REPORT_DATA}/checkpoint.yaml"
    local SCOUT="${REPORT_DATA}/scout_baseline.md"
    local SHARED="${REPORT_DATA}/shared_context.md"

    # 如果checkpoint不在report_data, 检查data/research
    if [ ! -f "$CHECKPOINT" ] && [ -f "data/research/${TICKER}/checkpoint.yaml" ]; then
        CHECKPOINT="data/research/${TICKER}/checkpoint.yaml"
    fi
    if [ ! -f "$SHARED" ] && [ -f "data/research/${TICKER}/shared_context.md" ]; then
        SHARED="data/research/${TICKER}/shared_context.md"
    fi

    # --- D1: 数据基础 — 预取文件数/17×10 ---
    local DATA_FILES=0
    if [ -n "$RESEARCH_DIR" ] && [ -d "$RESEARCH_DIR" ]; then
        DATA_FILES=$(ls "$RESEARCH_DIR" 2>/dev/null | wc -l | tr -d ' ')
    fi
    # 也计算report_data下的json/md文件(GOOGL风格: data/*.json)
    if [ -d "$REPORT_DATA" ]; then
        local EXTRA_FILES
        EXTRA_FILES=$(find "$REPORT_DATA" -maxdepth 1 \( -name "*.json" -o -name "*.md" \) 2>/dev/null | wc -l | tr -d ' ')
        EXTRA_FILES="${EXTRA_FILES:-0}"
        # 取较大值 (避免重复计数)
        DATA_FILES=$(max "$DATA_FILES" "$EXTRA_FILES")
    fi
    local D1=$(cap10 $((DATA_FILES * 10 / 17)))

    # --- D2: 问题定义 — CQ数量分档+覆盖矩阵 ---
    local CQ_COUNT=0
    local HAS_MATRIX=0
    if [ -f "$CHECKPOINT" ]; then
        CQ_COUNT=$(yaml_val "cq_count:" "$CHECKPOINT")
        CQ_COUNT="${CQ_COUNT:-0}"
    fi
    # 也从shared_context检测CQ
    if [ "$CQ_COUNT" -eq 0 ] && [ -f "$SHARED" ]; then
        CQ_COUNT=$(grep -c 'CQ[0-9]' "$SHARED" 2>/dev/null || true)
        CQ_COUNT="${CQ_COUNT// /}"
        CQ_COUNT="${CQ_COUNT:-0}"
    fi
    # CQ分档: 0→0, 1-4→4, 5-7→7, 8+→8
    local CQ_SCORE=0
    if [ "$CQ_COUNT" -ge 8 ]; then CQ_SCORE=8
    elif [ "$CQ_COUNT" -ge 5 ]; then CQ_SCORE=7
    elif [ "$CQ_COUNT" -ge 1 ]; then CQ_SCORE=4
    fi
    # 覆盖矩阵存在+2
    if [ -f "$SHARED" ]; then
        HAS_MATRIX=$(grep -cE '模块.*矩阵|CQ.*模块|覆盖.*矩阵|相关性' "$SHARED" 2>/dev/null || true)
        HAS_MATRIX="${HAS_MATRIX// /}"
        [ "${HAS_MATRIX:-0}" -gt 0 ] && CQ_SCORE=$((CQ_SCORE + 2))
    fi
    local D2=$(cap10 "$CQ_SCORE")

    # --- D3: 分析深度 — Pre阶段无分析内容 ---
    local D3=0

    # --- D4: 风险认知 — 已识别风险维度+预测市场+竞争者 ---
    local RISK_DIMS=0 PM_EVENTS=0 COMPETITORS=0
    if [ -f "$SHARED" ]; then
        RISK_DIMS=$(grep -ciE '风险|risk|监管|regulatory|竞争|宏观|macro|地缘' "$SHARED" 2>/dev/null || true)
        RISK_DIMS="${RISK_DIMS// /}"
        RISK_DIMS="${RISK_DIMS:-0}"
        [ "$RISK_DIMS" -gt 10 ] && RISK_DIMS=10
        COMPETITORS=$(grep -ciE '竞争者|competitor|versus|对手' "$SHARED" 2>/dev/null || true)
        COMPETITORS="${COMPETITORS// /}"
        COMPETITORS="${COMPETITORS:-0}"
    fi
    if [ -d "$REPORT_DATA" ] && [ -f "${REPORT_DATA}/prediction_market.json" ]; then
        PM_EVENTS=1
    elif [ -n "$RESEARCH_DIR" ] && find "$RESEARCH_DIR" -name "*prediction*" -maxdepth 1 2>/dev/null | grep -q .; then
        PM_EVENTS=1
    fi
    local COMP_CAP=$(min "$COMPETITORS" 5)
    local D4_RAW=$(( RISK_DIMS * 5 / 10 + PM_EVENTS * 3 + COMP_CAP * 2 / 5 ))
    local D4=$(cap10 "$D4_RAW")

    # --- D5: 估值框架 — 市场共识数据可用→2 ---
    local D5=0
    if [ -d "$REPORT_DATA" ]; then
        if find "$REPORT_DATA" -maxdepth 1 \( -name "*consensus*" -o -name "*analyst*" -o -name "*estimate*" \) 2>/dev/null | grep -q .; then
            D5=2
        fi
    fi
    if [ "$D5" -eq 0 ] && [ -n "$RESEARCH_DIR" ] && [ -d "$RESEARCH_DIR" ]; then
        if find "$RESEARCH_DIR" -maxdepth 1 \( -name "*consensus*" -o -name "*analyst*" -o -name "*estimate*" \) 2>/dev/null | grep -q .; then
            D5=2
        fi
    fi

    # --- D6: 数据验证 — Pre阶段仅单源预取 ---
    local D6=1

    # --- D7: 非共识洞察 — Pre阶段无 ---
    local D7=0

    # --- D8: 可视化 — Pre阶段无 ---
    local D8=0

    # --- D9: 追踪体系 — Pre阶段无 ---
    local D9=0

    # --- D10: 结构完整度 ---
    local D10=0
    [ -f "$CHECKPOINT" ] && D10=$((D10 + 2))
    [ -f "$SCOUT" ] && D10=$((D10 + 3))
    # CQ路由存在 (shared_context中有CQ定义)
    if [ -f "$SHARED" ] && grep -q 'CQ[0-9]' "$SHARED" 2>/dev/null; then
        D10=$((D10 + 3))
    fi
    # Agent分配存在
    if [ -f "$CHECKPOINT" ] && grep -q 'agent\|Agent' "$CHECKPOINT" 2>/dev/null; then
        D10=$((D10 + 2))
    fi
    D10=$(cap10 "$D10")

    local TOTAL=$((D1 + D2 + D3 + D4 + D5 + D6 + D7 + D8 + D9 + D10))

    # 输出分数数组 (供compare模式使用)
    echo "$D1 $D2 $D3 $D4 $D5 $D6 $D7 $D8 $D9 $D10 $TOTAL"
}

# ============================================================
# POST-RESEARCH 评分
# ============================================================
score_post() {
    local FILE="$1"
    local POSS_WIDTH="${2:-6}"

    if [ ! -f "$FILE" ]; then
        echo -e "${RED}FATAL: 文件不存在: $FILE${NC}" >&2
        exit 1
    fi

    local CHARS
    CHARS=$(wc -m < "$FILE")
    CHARS="${CHARS// /}"

    # 动态基准 (复用quality_gate_complete.sh逻辑)
    local BENCHMARK
    if [ "$POSS_WIDTH" -le 3 ]; then
        BENCHMARK=250000
    elif [ "$POSS_WIDTH" -le 6 ]; then
        BENCHMARK=200000
    else
        BENCHMARK=350000
    fi

    # --- D1: 数据基础 — DM锚点数 > DM覆盖率% > 标注密度 ---
    local DM_COV
    DM_COV=$(grep -oE 'DM覆盖率 *[0-9]+%' "$FILE" 2>/dev/null | grep -oE '[0-9]+' | head -1) || true
    if [ -z "$DM_COV" ]; then
        # 回退: 从审计摘要检测覆盖率数字
        DM_COV=$(grep -oE '[0-9]+%' "$FILE" 2>/dev/null | head -3 | grep -oE '[0-9]+' | head -1) || true
    fi
    # DM锚点计数 (DM-001 / DM-P1A-001 等格式)
    local DM_ANCHOR_COUNT
    DM_ANCHOR_COUNT=$(grep -oE 'DM-[A-Za-z0-9]+-[0-9]+|DM-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    DM_ANCHOR_COUNT="${DM_ANCHOR_COUNT// /}"
    DM_ANCHOR_COUNT="${DM_ANCHOR_COUNT:-0}"
    local D1=0
    if [ "$DM_ANCHOR_COUNT" -ge 300 ]; then
        D1=10
    elif [ "$DM_ANCHOR_COUNT" -ge 200 ]; then
        D1=9
    elif [ "$DM_ANCHOR_COUNT" -ge 100 ]; then
        D1=8
    elif [ "$DM_ANCHOR_COUNT" -ge 50 ]; then
        D1=7
    elif [ -n "$DM_COV" ] && [ "$DM_COV" -gt 0 ]; then
        # DM锚点<50: 尝试DM覆盖率%
        D1=$(cap10 $((DM_COV / 10)))
    else
        # 旧报告: 用标注密度推算
        local TOTAL_ANN
        TOTAL_ANN=$(grep -oE '\[(A|B|P|E):' "$FILE" 2>/dev/null | wc -l) || true
        local TOTAL_ANN2
        TOTAL_ANN2=$(grep -oE '硬数据:|合理推断:|主观判断:' "$FILE" 2>/dev/null | wc -l) || true
        TOTAL_ANN=$(( ${TOTAL_ANN// /} + ${TOTAL_ANN2// /} ))
        TOTAL_ANN="${TOTAL_ANN// /}"
        if [ "$CHARS" -gt 0 ] && [ "${TOTAL_ANN:-0}" -gt 0 ]; then
            local DENSITY
            DENSITY=$(python3 -c "print(int(min($TOTAL_ANN * 10000 / $CHARS, 50) / 5))" 2>/dev/null) || true
            D1=$(cap10 "${DENSITY:-5}")
        else
            D1=5  # 默认中等
        fi
    fi

    # --- D2: 问题定义 — CQ闭环数/CQ总数×10 ---
    local CQ_TOTAL
    CQ_TOTAL=$(grep -oE 'CQ[0-9]+|CQ-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    CQ_TOTAL="${CQ_TOTAL// /}"
    # CQ闭环检测 (支持多种格式: v9.0/v10.0/v13.0)
    local CQ_CLOSED=0
    # 方式1: 标准闭环关键词
    local CQ_C1
    CQ_C1=$(grep -cE '最终置信度|最终回答|如果我们错了|置信度演化表|置信度从.*→|CQ闭环总结|CQ回答' "$FILE" 2>/dev/null || true)
    CQ_C1="${CQ_C1// /}"; CQ_C1="${CQ_C1:-0}"
    # 方式2: CQ加权置信度演化表 (PLTR/RDDT格式)
    local CQ_C2
    CQ_C2=$(grep -cE 'CQ加权置信度|CQ.*闭环|置信度路径|置信度演化|加权平均置信度|CQ.*权重.*置信度' "$FILE" 2>/dev/null || true)
    CQ_C2="${CQ_C2// /}"; CQ_C2="${CQ_C2:-0}"
    # 方式3: P0.5假设+置信度行 (per-CQ closure)
    local CQ_C3
    CQ_C3=$(grep -cE 'P0\.5假设.*置信度|验证事件' "$FILE" 2>/dev/null || true)
    CQ_C3="${CQ_C3// /}"; CQ_C3="${CQ_C3:-0}"
    # 取最佳信号: 如有演化表或per-CQ置信度, 视为全闭环
    if [ "$CQ_C1" -ge "${CQ_TOTAL:-1}" ]; then
        CQ_CLOSED="$CQ_TOTAL"
    elif [ "$CQ_C2" -ge 3 ] || [ "$CQ_C3" -ge "${CQ_TOTAL:-1}" ]; then
        CQ_CLOSED="$CQ_TOTAL"
    elif [ "$CQ_C1" -gt 0 ]; then
        CQ_CLOSED="$CQ_C1"
    fi
    local D2=0
    if [ "${CQ_TOTAL:-0}" -gt 0 ]; then
        D2=$(cap10 $((CQ_CLOSED * 10 / CQ_TOTAL)))
    fi

    # --- D3: 分析深度 — min(总字符/动态基准×10, 10) ---
    local D3=0
    if [ "$BENCHMARK" -gt 0 ]; then
        D3=$((CHARS * 10 / BENCHMARK))
        D3=$(cap10 "$D3")
    fi

    # --- D4: 风险认知 ---
    # KS分(≥12→3) + Bear分(≥8→3) + RT覆盖(N/7×4)
    local KS_COUNT
    KS_COUNT=$(grep -oE 'KS-[A-Z]+-[0-9]+|KS-[A-Z][0-9]+|KS-[0-9]+|KS[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    KS_COUNT="${KS_COUNT// /}"
    KS_COUNT="${KS_COUNT:-0}"
    local KS_SCORE=0
    if [ "$KS_COUNT" -ge 12 ]; then KS_SCORE=3
    elif [ "$KS_COUNT" -ge 8 ]; then KS_SCORE=2
    elif [ "$KS_COUNT" -ge 4 ]; then KS_SCORE=1
    fi

    local BEAR_COUNT
    BEAR_COUNT=$(grep -ciE 'bear.*case|bear.*#|看空.*[0-9]' "$FILE" 2>/dev/null || true)
    BEAR_COUNT="${BEAR_COUNT// /}"
    BEAR_COUNT="${BEAR_COUNT:-0}"
    local BEAR_SCORE=0
    if [ "$BEAR_COUNT" -ge 8 ]; then BEAR_SCORE=3
    elif [ "$BEAR_COUNT" -ge 4 ]; then BEAR_SCORE=2
    elif [ "$BEAR_COUNT" -ge 2 ]; then BEAR_SCORE=1
    fi

    local RT_COUNT=0
    local rt_i
    for rt_i in 1 2 3 4 5 6 7; do
        if grep -q "RT-${rt_i}" "$FILE" 2>/dev/null; then
            RT_COUNT=$((RT_COUNT + 1))
        fi
    done
    local RT_SCORE=$((RT_COUNT * 4 / 7))

    local D4=$(cap10 $((KS_SCORE + BEAR_SCORE + RT_SCORE)))

    # --- D5: 估值框架 ---
    # 估值方法数×1.5 + Reverse DCF存在×3 (cap 10)
    local VALUATION_METHODS=0
    { grep -qiE 'DCF|现金流折现' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))
    { grep -qiE 'SOTP|分部估值|sum.*parts' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))
    { grep -qiE '可比公司|comparable|peer.*comp' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))
    { grep -qiE 'EV/EBITDA|P/E.*估值|PE.*估值' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))
    { grep -qiE 'PEG|价格.*增长' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))
    { grep -qiE 'OVM|期权估值|optionality' "$FILE" 2>/dev/null; } && VALUATION_METHODS=$((VALUATION_METHODS + 1))

    local RDCF_BONUS=0
    { grep -qiE 'Reverse.*DCF|反向.*DCF|隐含.*假设' "$FILE" 2>/dev/null; } && RDCF_BONUS=3

    local D5_RAW=$((VALUATION_METHODS * 3 / 2 + RDCF_BONUS))
    local D5=$(cap10 "$D5_RAW")

    # --- D6: 数据验证 ---
    # 审计摘要(+3) + DM覆盖(+4) + 折叠源表≥5(+3) + DM锚点密度(+2) + 硬数据标注(+2)
    local HAS_AUDIT
    HAS_AUDIT=$(grep -ciE '数据审计摘要|数据审计|DM覆盖率' "$FILE" 2>/dev/null || true)
    HAS_AUDIT="${HAS_AUDIT// /}"
    HAS_AUDIT="${HAS_AUDIT:-0}"
    local DETAILS_COUNT
    DETAILS_COUNT=$(grep -c '<details>' "$FILE" 2>/dev/null || true)
    DETAILS_COUNT="${DETAILS_COUNT// /}"
    DETAILS_COUNT="${DETAILS_COUNT:-0}"
    local HARD_DATA_COUNT
    HARD_DATA_COUNT=$(grep -c '硬数据:' "$FILE" 2>/dev/null || true)
    HARD_DATA_COUNT="${HARD_DATA_COUNT// /}"
    HARD_DATA_COUNT="${HARD_DATA_COUNT:-0}"

    local D6=0
    if [ "$HAS_AUDIT" -gt 0 ]; then
        D6=$((D6 + 3))
    fi
    if [ -n "$DM_COV" ] && [ "${DM_COV:-0}" -ge 80 ]; then
        D6=$((D6 + 4))
    elif [ -n "$DM_COV" ] && [ "${DM_COV:-0}" -ge 50 ]; then
        D6=$((D6 + 2))
    fi
    if [ "$DETAILS_COUNT" -ge 5 ]; then
        D6=$((D6 + 3))
    elif [ "$DETAILS_COUNT" -ge 2 ]; then
        D6=$((D6 + 1))
    fi
    # DM锚点≥200 = de facto verification (+2)
    if [ "${DM_ANCHOR_COUNT:-0}" -ge 200 ]; then
        D6=$((D6 + 2))
    elif [ "${DM_ANCHOR_COUNT:-0}" -ge 100 ]; then
        D6=$((D6 + 1))
    fi
    # 硬数据标注密度 (+2)
    if [ "$HARD_DATA_COUNT" -ge 100 ]; then
        D6=$((D6 + 2))
    elif [ "$HARD_DATA_COUNT" -ge 50 ]; then
        D6=$((D6 + 1))
    fi
    D6=$(cap10 "$D6")

    # --- D7: 非共识洞察 — min(CI数×2, 10) ---
    local CI_COUNT
    CI_COUNT=$(grep -oE 'CI-[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    CI_COUNT="${CI_COUNT// /}"
    local D7=$(cap10 $((${CI_COUNT:-0} * 2)))

    # --- D8: 可视化 — min(Mermaid数/24×10, 10) ---
    local MERMAID_COUNT
    MERMAID_COUNT=$(grep -c '```mermaid' "$FILE" 2>/dev/null || true)
    MERMAID_COUNT="${MERMAID_COUNT// /}"
    MERMAID_COUNT="${MERMAID_COUNT:-0}"
    local D8=0
    if [ "$MERMAID_COUNT" -gt 0 ]; then
        D8=$((MERMAID_COUNT * 10 / 24))
        D8=$(cap10 "$D8")
    fi

    # --- D9: 追踪体系 — min((TS数+KS数)/2.5, 10) ---
    local TS_COUNT
    TS_COUNT=$(grep -oE 'TS-[0-9]+|TS[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    TS_COUNT="${TS_COUNT// /}"
    local D9_RAW=$(( (${TS_COUNT:-0} + ${KS_COUNT:-0}) * 10 / 25 ))
    local D9=$(cap10 "$D9_RAW")

    # --- D10: 结构完整度 — CG通过数/14×10 ---
    # 从报告中检测各CG元素
    local CG_PASS=0
    # CG3: 评分维度
    local DIM_COUNT
    DIM_COUNT=$(grep -cE '估值吸引力|增长质量|护城河强度|财务健康|管理层质量|催化剂明确|风险可控|聪明钱信号|竞争定位|时机因素' "$FILE" 2>/dev/null || true)
    DIM_COUNT="${DIM_COUNT// /}"
    DIM_COUNT="${DIM_COUNT:-0}"
    [ "$DIM_COUNT" -ge 8 ] && CG_PASS=$((CG_PASS + 1))
    # CG4: KS
    [ "${KS_COUNT:-0}" -ge 12 ] && CG_PASS=$((CG_PASS + 1))
    # CG5: VP/TS
    local VP_TS
    VP_TS=$(grep -oE 'VP-[0-9]+|VP[0-9]+|TS-[0-9]+|TS[0-9]+' "$FILE" 2>/dev/null | sort -u | wc -l) || true
    VP_TS="${VP_TS// /}"
    [ "${VP_TS:-0}" -ge 5 ] && CG_PASS=$((CG_PASS + 1))
    # CG6: 三情景
    local BEAR_BULL
    BEAR_BULL=$(grep -ciE 'bear|看空|悲观|bull|看多|乐观' "$FILE" 2>/dev/null || true)
    BEAR_BULL="${BEAR_BULL// /}"
    BEAR_BULL="${BEAR_BULL:-0}"
    [ "$BEAR_BULL" -ge 6 ] && CG_PASS=$((CG_PASS + 1))
    # CG7: CQ闭环
    [ "${CQ_TOTAL:-0}" -ge 5 ] && CG_PASS=$((CG_PASS + 1))
    # CG8: 数据审计
    [ "$HAS_AUDIT" -gt 0 ] && CG_PASS=$((CG_PASS + 1))
    # CG9: DM覆盖
    [ -n "$DM_COV" ] && [ "${DM_COV:-0}" -ge 90 ] && CG_PASS=$((CG_PASS + 1))
    # CG10: Mermaid
    [ "$MERMAID_COUNT" -ge 24 ] && CG_PASS=$((CG_PASS + 1))
    # CG11: 日历+行动
    local HAS_CAL HAS_ACT HAS_DISC
    HAS_CAL=$(grep -ciE '投资日历|催化剂日历|investment calendar|catalyst calendar' "$FILE" 2>/dev/null || true)
    HAS_CAL="${HAS_CAL// /}"; HAS_CAL="${HAS_CAL:-0}"
    HAS_ACT=$(grep -ciE '行动清单|action.*plan|90天' "$FILE" 2>/dev/null || true)
    HAS_ACT="${HAS_ACT// /}"; HAS_ACT="${HAS_ACT:-0}"
    HAS_DISC=$(grep -ciE '免责声明|不构成投资建议' "$FILE" 2>/dev/null || true)
    HAS_DISC="${HAS_DISC// /}"; HAS_DISC="${HAS_DISC:-0}"
    [ "$HAS_CAL" -gt 0 ] && [ "$HAS_ACT" -gt 0 ] && [ "$HAS_DISC" -gt 0 ] && CG_PASS=$((CG_PASS + 1))
    # CG12: CI
    [ "${CI_COUNT:-0}" -ge 5 ] && CG_PASS=$((CG_PASS + 1))
    # CG13: 框架注册
    local HAS_FW
    HAS_FW=$(grep -ciE '框架注册表|Framework.*Registry' "$FILE" 2>/dev/null || true)
    HAS_FW="${HAS_FW// /}"; HAS_FW="${HAS_FW:-0}"
    [ "$HAS_FW" -gt 0 ] && CG_PASS=$((CG_PASS + 1))
    # CG14: 方法离散度
    local HAS_DISP
    HAS_DISP=$(grep -ciE '方法离散度|离散度.*x|method.*dispersion' "$FILE" 2>/dev/null || true)
    HAS_DISP="${HAS_DISP// /}"; HAS_DISP="${HAS_DISP:-0}"
    [ "$HAS_DISP" -gt 0 ] && CG_PASS=$((CG_PASS + 1))
    # CG1: 总字符
    local FLOOR=$((BENCHMARK * 80 / 100))
    [ "$CHARS" -ge "$FLOOR" ] && CG_PASS=$((CG_PASS + 1))
    # CG2: Phase 5字符
    local P5_START
    P5_START=$(grep -n -E '^#{1,3} *(Phase *5|P5|决策输出)' "$FILE" 2>/dev/null | head -1 | cut -d: -f1) || true
    if [ -n "$P5_START" ] && [ "${P5_START:-0}" -gt 0 ]; then
        local P5_CHARS
        P5_CHARS=$(tail -n +"$P5_START" "$FILE" | wc -m)
        P5_CHARS="${P5_CHARS// /}"
        local P5_FLOOR=$((BENCHMARK * 15 / 100))
        [ "$P5_CHARS" -ge "$P5_FLOOR" ] && CG_PASS=$((CG_PASS + 1))
    fi

    local D10=$((CG_PASS * 10 / 14))
    D10=$(cap10 "$D10")

    local TOTAL=$((D1 + D2 + D3 + D4 + D5 + D6 + D7 + D8 + D9 + D10))
    echo "$D1 $D2 $D3 $D4 $D5 $D6 $D7 $D8 $D9 $D10 $TOTAL"
}

# ============================================================
# D11: 分析正交度 — 8卦限覆盖检测 (仅post模式)
# ============================================================
# 三轴: X(时间) × Y(结构层) × Z(认知模式) = 8卦限
# 每个卦限通过特征关键词grep检测, 存在≥2个匹配=覆盖
#
# O1 历史+微观+实证: 财务历史数据, 历史P/E, 三表分析, 同比
# O2 前瞻+微观+实证: DCF, 预测收入, 敏感性矩阵, 目标价
# O3 历史+宏观+实证: 行业周期历史, 利率历史, GDP, CAPE
# O4 前瞻+宏观+实证: TAM建模, 渗透率曲线, 行业预测
# O5 历史+微观+判断: 管理层评价, 护城河演变, 历史类比
# O6 前瞻+微观+判断: 期权价值, 可能性空间, 非共识洞察, Kill Switch
# O7 历史+宏观+判断: 制度变迁, 范式转移, 政策演变回顾
# O8 前瞻+宏观+判断: 地缘情景, 监管展望, 温水煮青蛙, 黑天鹅

score_octant() {
    local FILE="$1"
    if [ ! -f "$FILE" ]; then
        echo "0 0 0 0 0 0 0 0 0 0"
        return
    fi

    local O1=0 O2=0 O3=0 O4=0 O5=0 O6=0 O7=0 O8=0

    # 辅助: grep匹配返回0/1, 兼容set -e
    _hit() { grep -qiE "$1" "$FILE" 2>/dev/null && echo 1 || echo 0; }

    # O1 历史+微观+实证: 财务回溯+公司级硬数据
    local o1_hits=0
    o1_hits=$((o1_hits + $(_hit '历史P/E|历史.*倍数|historical.*P/E')))
    o1_hits=$((o1_hits + $(_hit '三表分析|损益表|资产负债|现金流量表|income.*statement|balance.*sheet')))
    o1_hits=$((o1_hits + $(_hit '同比.*%|YoY|CAGR.*历史|过去.*年|FY20[0-9]')))
    o1_hits=$((o1_hits + $(_hit '毛利率.*历史|ROE.*历史|ROIC|资本回报|历史.*财务')))
    [ "$o1_hits" -ge 2 ] && O1=1

    # O2 前瞻+微观+实证: 公司级前瞻定量模型
    local o2_hits=0
    o2_hits=$((o2_hits + $(_hit 'DCF|现金流折现|WACC|终端价值|terminal.*value')))
    o2_hits=$((o2_hits + $(_hit '敏感性.*矩阵|sensitivity|情景.*概率')))
    o2_hits=$((o2_hits + $(_hit '预测.*收入|revenue.*forecast|FY202[5-9].*预|预计.*增长')))
    o2_hits=$((o2_hits + $(_hit 'Reverse.*DCF|反向.*DCF|隐含.*假设|市场在赌')))
    [ "$o2_hits" -ge 2 ] && O2=1

    # O3 历史+宏观+实证: 行业/宏观历史数据
    local o3_hits=0
    o3_hits=$((o3_hits + $(_hit '行业周期|半导体周期|WFE.*历史|行业.*历史|industry.*cycle')))
    o3_hits=$((o3_hits + $(_hit 'CAPE|Buffett.*Indicator|利率.*历史|GDP.*增|宏观.*数据')))
    o3_hits=$((o3_hits + $(_hit '市场份额.*变化|share.*shift|competitive.*landscape.*历')))
    o3_hits=$((o3_hits + $(_hit '产能.*周期|库存.*周期|供需.*历史|capex.*cycle')))
    [ "$o3_hits" -ge 2 ] && O3=1

    # O4 前瞻+宏观+实证: 行业级前瞻定量建模
    local o4_hits=0
    o4_hits=$((o4_hits + $(_hit 'TAM|总可寻址市场|total.*addressable|市场规模.*预')))
    o4_hits=$((o4_hits + $(_hit '渗透率.*曲线|渗透率.*20[2-3]|penetration.*rate|S曲线|adoption.*curve')))
    o4_hits=$((o4_hits + $(_hit '行业.*预测|行业.*增长率|industry.*growth|市场.*CAGR.*预')))
    o4_hits=$((o4_hits + $(_hit '供需.*平衡|产能.*扩张.*预|capex.*forecast|需求.*模型')))
    [ "$o4_hits" -ge 2 ] && O4=1

    # O5 历史+微观+判断: 公司级历史定性判断
    local o5_hits=0
    o5_hits=$((o5_hits + $(_hit '管理层.*评价|管理层.*画像|CEO.*评|leadership.*assessment')))
    o5_hits=$((o5_hits + $(_hit '护城河.*演变|护城河.*迁移|moat.*evolution|护城河.*强化|护城河.*侵蚀')))
    o5_hits=$((o5_hits + $(_hit '历史类比|类比.*分析|Cisco.*类比|Intel.*类比|历史.*教训|analog')))
    o5_hits=$((o5_hits + $(_hit '企业文化|组织.*能力|战略.*回顾|转型.*历史')))
    [ "$o5_hits" -ge 2 ] && O5=1

    # O6 前瞻+微观+判断: 公司级前瞻定性洞察
    local o6_hits=0
    o6_hits=$((o6_hits + $(_hit '期权价值|optionality|可能性空间|possibility.*space')))
    o6_hits=$((o6_hits + $(_hit 'CI-[0-9]+|非共识.*洞察|non-consensus|differentiated.*view')))
    o6_hits=$((o6_hits + $(_hit 'Kill.*Switch|催化剂|触发.*条件|trigger|转折点')))
    o6_hits=$((o6_hits + $(_hit '投资温度计|综合评级|条件.*评级|conditional.*rating')))
    [ "$o6_hits" -ge 2 ] && O6=1

    # O7 历史+宏观+判断: 制度/范式级历史判断
    local o7_hits=0
    o7_hits=$((o7_hits + $(_hit '制度.*变迁|制度.*迁移|regime.*change|institutional.*shift')))
    o7_hits=$((o7_hits + $(_hit '范式.*转移|paradigm.*shift|产业.*革命|技术.*范式')))
    o7_hits=$((o7_hits + $(_hit '政策.*演变|监管.*历史|regulation.*history|贸易.*政策.*历')))
    o7_hits=$((o7_hits + $(_hit '行为.*偏差|behavioral.*bias|锚定效应|过度.*自信|认知.*偏差')))
    [ "$o7_hits" -ge 2 ] && O7=1

    # O8 前瞻+宏观+判断: 制度/范式级前瞻判断
    local o8_hits=0
    o8_hits=$((o8_hits + $(_hit '地缘.*情景|geopolitical.*scenario|台海|中美|脱钩|decoupling')))
    o8_hits=$((o8_hits + $(_hit '监管.*展望|regulatory.*outlook|政策.*风险.*前瞻|regulation.*forward')))
    o8_hits=$((o8_hits + $(_hit '温水煮青蛙|boiling.*frog|黑天鹅|black.*swan|尾部风险|tail.*risk')))
    o8_hits=$((o8_hits + $(_hit '协同.*风险|risk.*topology|风险.*拓扑|系统性.*风险|contagion')))
    [ "$o8_hits" -ge 2 ] && O8=1

    local COVERED=$((O1 + O2 + O3 + O4 + O5 + O6 + O7 + O8))
    local D11=$((COVERED * 10 / 8))
    D11=$(cap10 "$D11")

    echo "$O1 $O2 $O3 $O4 $O5 $O6 $O7 $O8 $COVERED $D11"
}

# ============================================================
# 输出格式化
# ============================================================
DIMS=("数据基础" "问题定义" "分析深度" "风险认知" "估值框架" "数据验证" "非共识洞察" "可视化" "追踪体系" "结构完整度")

print_single() {
    local label="$1" ticker="$2"
    shift 2
    local scores=($@)
    local total="${scores[10]}"

    echo "============================================="
    echo -e " ${CYAN}${BOLD}Research Quality Scorecard v1.2${NC}"
    echo -e " ${ticker} | ${label}"
    echo "============================================="
    echo ""
    echo "| #   | 维度          | Score |"
    echo "|-----|--------------|:-----:|"
    local i
    for i in $(seq 0 9); do
        local dn=$((i + 1))
        printf "| D%-2d | %-12s |  %2d   |\n" "$dn" "${DIMS[$i]}" "${scores[$i]}"
    done
    echo "|-----|--------------|:-----:|"
    printf "| Σ   | ${BOLD}总分${NC}         |  ${BOLD}%2d${NC}   |\n" "$total"
    echo ""
}

# 卦限热力图输出
print_octant() {
    local ticker="$1"
    shift
    local oct=($@)
    # oct: O1 O2 O3 O4 O5 O6 O7 O8 COVERED D11

    local O1="${oct[0]}" O2="${oct[1]}" O3="${oct[2]}" O4="${oct[3]}"
    local O5="${oct[4]}" O6="${oct[5]}" O7="${oct[6]}" O8="${oct[7]}"
    local COVERED="${oct[8]}" D11="${oct[9]}"

    # 图标: ■=覆盖 □=空白
    local s1="□" s2="□" s3="□" s4="□" s5="□" s6="□" s7="□" s8="□"
    [ "$O1" -eq 1 ] && s1="■"
    [ "$O2" -eq 1 ] && s2="■"
    [ "$O3" -eq 1 ] && s3="■"
    [ "$O4" -eq 1 ] && s4="■"
    [ "$O5" -eq 1 ] && s5="■"
    [ "$O6" -eq 1 ] && s6="■"
    [ "$O7" -eq 1 ] && s7="■"
    [ "$O8" -eq 1 ] && s8="■"

    echo "---------------------------------------------"
    echo -e " ${CYAN}${BOLD}D11 分析正交度${NC} | ${ticker}"
    echo "---------------------------------------------"
    echo ""
    echo "  三轴: X(时间) × Y(结构层) × Z(认知模式)"
    echo ""
    echo "                     ← 历史        前瞻 →"
    echo "              ┌────────────┬────────────┐"
    echo "  宏观/制度 ↑ │ O7 ${s7} 判断 │ O8 ${s8} 判断 │"
    echo "              │ O3 ${s3} 实证 │ O4 ${s4} 实证 │"
    echo "              ├────────────┼────────────┤"
    echo "  公司/行业 ↓ │ O5 ${s5} 判断 │ O6 ${s6} 判断 │"
    echo "              │ O1 ${s1} 实证 │ O2 ${s2} 实证 │"
    echo "              └────────────┴────────────┘"
    echo ""
    printf "  覆盖: %d/8 卦限 | D11得分: %d/10\n" "$COVERED" "$D11"

    # 盲区诊断
    local blindspots=""
    [ "$O1" -eq 0 ] && blindspots="${blindspots} O1(历史财务回溯)"
    [ "$O2" -eq 0 ] && blindspots="${blindspots} O2(前瞻定量模型)"
    [ "$O3" -eq 0 ] && blindspots="${blindspots} O3(行业历史数据)"
    [ "$O4" -eq 0 ] && blindspots="${blindspots} O4(行业前瞻建模)"
    [ "$O5" -eq 0 ] && blindspots="${blindspots} O5(公司历史判断)"
    [ "$O6" -eq 0 ] && blindspots="${blindspots} O6(前瞻非共识洞察)"
    [ "$O7" -eq 0 ] && blindspots="${blindspots} O7(制度历史判断)"
    [ "$O8" -eq 0 ] && blindspots="${blindspots} O8(宏观前瞻判断)"

    if [ -n "$blindspots" ]; then
        echo -e "  ${YELLOW}盲区:${NC}${blindspots}"
    else
        echo -e "  ${GREEN}全覆盖 — 分析空间无系统性盲区${NC}"
    fi
    echo ""
}

print_compare() {
    local ticker="$1"
    shift
    local pre=($1) post=($2)

    local pre_total="${pre[10]}"
    local post_total="${post[10]}"
    local delta=$((post_total - pre_total))

    echo "============================================="
    echo -e " ${CYAN}${BOLD}Research Quality Scorecard v1.2${NC}"
    echo -e " ${ticker} | Pre-Research → Post-Research"
    echo "============================================="
    echo ""
    echo "| #   | 维度          | Pre | Post | Delta |"
    echo "|-----|--------------|:---:|:----:|:-----:|"
    local i
    for i in $(seq 0 9); do
        local dn=$((i + 1))
        local d=$((${post[$i]} - ${pre[$i]}))
        local sign=""
        [ "$d" -gt 0 ] && sign="+"
        printf "| D%-2d | %-12s | %2d  |  %2d  |  %s%-2d  |\n" "$dn" "${DIMS[$i]}" "${pre[$i]}" "${post[$i]}" "$sign" "$d"
    done
    echo "|-----|--------------|:---:|:----:|:-----:|"
    local sign=""
    [ "$delta" -gt 0 ] && sign="+"
    printf "| Σ   | ${BOLD}总分${NC}         | %2d  |  %2d  |  ${BOLD}%s%d${NC}  |\n" "$pre_total" "$post_total" "$sign" "$delta"
    echo ""

    # 评级
    local rating="" rating_text=""
    if [ "$delta" -ge 60 ]; then
        rating="★★★★★" rating_text="卓越 — 研究产出远超起点"
    elif [ "$delta" -ge 50 ]; then
        rating="★★★★" rating_text="优秀 — 高效研究"
    elif [ "$delta" -ge 40 ]; then
        rating="★★★" rating_text="良好 — 正常产出"
    elif [ "$delta" -ge 30 ]; then
        rating="★★" rating_text="及格 — 低于预期"
    else
        rating="★" rating_text="不足 — 需要诊断"
    fi

    # 转化率
    local conversion=0
    if [ "$pre_total" -gt 0 ]; then
        conversion=$((delta * 100 / pre_total))
    fi

    echo -e "研究增量: ${BOLD}${sign}${delta}分${NC} (Pre→Post转化率: ${conversion}%)"
    echo -e "评级: ${YELLOW}${rating}${NC} (${rating_text})"
    echo ""

    # 返回评级信息供checkpoint写入
    echo "SCORECARD_DELTA=$delta"
    echo "SCORECARD_RATING=$rating"
}

# ============================================================
# 主逻辑
# ============================================================
case "$MODE" in
    pre)
        TICKER="${2:?需要TICKER参数}"
        RESULT=$(score_pre "$TICKER")
        SCORES=($RESULT)
        print_single "Pre-Research" "$TICKER" "${SCORES[@]}"
        echo -e "${GREEN}Pre评分完成${NC}"
        ;;

    post)
        COMPLETE_FILE="${2:?需要Complete报告路径}"
        POSS_WIDTH="${3:-6}"
        # 从文件名提取TICKER
        TICKER=$(basename "$COMPLETE_FILE" | grep -oE '^[A-Z]+' | head -1)
        RESULT=$(score_post "$COMPLETE_FILE" "$POSS_WIDTH")
        SCORES=($RESULT)
        print_single "Post-Research (pw=${POSS_WIDTH})" "${TICKER:-UNKNOWN}" "${SCORES[@]}"
        # D11 卦限覆盖
        OCT_RESULT=$(score_octant "$COMPLETE_FILE")
        OCT_SCORES=($OCT_RESULT)
        print_octant "${TICKER:-UNKNOWN}" "${OCT_SCORES[@]}"
        echo -e "${GREEN}Post评分完成${NC}"
        ;;

    compare)
        TICKER="${2:?需要TICKER参数}"
        COMPLETE_FILE="${3:?需要Complete报告路径}"
        POSS_WIDTH="${4:-6}"

        PRE_RESULT=$(score_pre "$TICKER")
        POST_RESULT=$(score_post "$COMPLETE_FILE" "$POSS_WIDTH")

        print_compare "$TICKER" "$PRE_RESULT" "$POST_RESULT"
        # D11 卦限覆盖 (仅post有意义)
        OCT_RESULT=$(score_octant "$COMPLETE_FILE")
        OCT_SCORES=($OCT_RESULT)
        print_octant "$TICKER" "${OCT_SCORES[@]}"
        ;;

    *)
        usage
        ;;
esac
