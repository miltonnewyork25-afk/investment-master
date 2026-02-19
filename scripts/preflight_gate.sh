#!/bin/bash
# ============================================================
# preflight_gate.sh v1.0 — Tier 3 分析启动前强制门控
# ============================================================
# 用法: bash scripts/preflight_gate.sh <TICKER> [INDUSTRY]
#
# 在Phase 0开始前强制检查:
# 1. Phase -1 知识检索是否完成 (knowledge_context.md ≥500字符)
# 2. Phase -0.5 文献侦察是否完成 (lit_recon_memo.md ≥1000字符)
# 3. Scout基线是否完成 (scout_baseline.md 存在, 同行业有报告时)
# 4. 报告规模预估是否合理 (基于公司复杂度)
#
# 退出码: 0=全部通过 | 1=有阻断项 | 2=参数错误
# ============================================================

set -uo pipefail

TICKER="${1:?用法: $0 <TICKER> [INDUSTRY]}"
INDUSTRY="${2:-}"

DATA_DIR="reports/${TICKER}/data"
KNOWLEDGE_FILE="${DATA_DIR}/knowledge_context.md"
LIT_RECON_FILE="${DATA_DIR}/lit_recon_memo.md"
SCOUT_FILE="${DATA_DIR}/scout_baseline.md"

PASS=0
FAIL=0
WARN=0

check_pass() { echo "  PASS: $1"; PASS=$((PASS + 1)); }
check_fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }
check_warn() { echo "  WARN: $1"; WARN=$((WARN + 1)); }

echo "═══════════════════════════════════════════════════"
echo "  Pre-Flight Gate v1.0 — Tier 3 启动门控"
echo "  Ticker: $TICKER | Industry: ${INDUSTRY:-auto}"
echo "═══════════════════════════════════════════════════"
echo ""

# ============================================================
# Gate 1: data/ 目录存在
# ============================================================
echo "--- [1/5] 数据目录 ---"
if [ -d "$DATA_DIR" ]; then
    check_pass "data/ 目录存在"
else
    check_fail "data/ 目录不存在 → 运行: mkdir -p $DATA_DIR"
fi

# ============================================================
# Gate 2: Phase -1 知识检索
# ============================================================
echo ""
echo "--- [2/5] Phase -1 知识检索 ---"
if [ -f "$KNOWLEDGE_FILE" ]; then
    KC_CHARS=$(wc -m < "$KNOWLEDGE_FILE" 2>/dev/null | tr -d ' ')
    if [ "$KC_CHARS" -ge 500 ]; then
        check_pass "knowledge_context.md 存在 (${KC_CHARS} chars)"
    else
        check_fail "knowledge_context.md 太短 (${KC_CHARS} chars, 需≥500)"
        echo "         → 运行: bash scripts/find_relevant_knowledge.sh $TICKER ${INDUSTRY:-}"
    fi
else
    check_fail "knowledge_context.md 不存在"
    echo "         → 运行: bash scripts/find_relevant_knowledge.sh $TICKER ${INDUSTRY:-}"
    echo "         → 将输出保存到 $KNOWLEDGE_FILE"
fi

# ============================================================
# Gate 3: Phase -0.5 文献侦察
# ============================================================
echo ""
echo "--- [3/5] Phase -0.5 文献侦察 ---"
if [ -f "$LIT_RECON_FILE" ]; then
    LR_CHARS=$(wc -m < "$LIT_RECON_FILE" 2>/dev/null | tr -d ' ')
    if [ "$LR_CHARS" -ge 1000 ]; then
        check_pass "lit_recon_memo.md 存在 (${LR_CHARS} chars)"
    else
        check_fail "lit_recon_memo.md 太短 (${LR_CHARS} chars, 需≥1000)"
        echo "         → 5路WebSearch深度侦察: D1深度/D2对抗/D3行业/D4估值/D5演绎"
    fi
else
    check_fail "lit_recon_memo.md 不存在"
    echo "         → 执行Phase -0.5文献侦察 (5路WebSearch)"
fi

# ============================================================
# Gate 4: Scout基线 (同行业有报告时)
# ============================================================
echo ""
echo "--- [4/5] Scout基线 ---"
# 检查同行业是否有≥250K的Complete报告
HAS_REFERENCE="false"
if [ -f "scripts/find_best_reference.sh" ]; then
    REF_OUTPUT=$(bash scripts/find_best_reference.sh "$TICKER" 2>/dev/null) || true
    if echo "$REF_OUTPUT" | grep -q "推荐参考"; then
        HAS_REFERENCE="true"
    fi
fi

if [ "$HAS_REFERENCE" = "true" ]; then
    if [ -f "$SCOUT_FILE" ]; then
        SC_CHARS=$(wc -m < "$SCOUT_FILE" 2>/dev/null | tr -d ' ')
        if [ "$SC_CHARS" -ge 1000 ]; then
            check_pass "scout_baseline.md 存在 (${SC_CHARS} chars)"
        else
            check_warn "scout_baseline.md 太短 (${SC_CHARS} chars)"
        fi
    else
        check_warn "有参考报告但scout_baseline.md未创建"
        echo "         → 运行: bash scripts/scout_scan.sh {参考报告} $TICKER"
    fi
else
    check_pass "无同行业参考报告, Scout跳过"
fi

# ============================================================
# Gate 5: 报告规模预估
# ============================================================
echo ""
echo "--- [5/5] 报告规模预估 ---"
CHECKPOINT="${DATA_DIR}/checkpoint.yaml"
if [ -f "$CHECKPOINT" ]; then
    # 检查是否有target_chars字段
    TARGET=$({ grep -oE 'target_chars: [0-9]+' "$CHECKPOINT" | grep -oE '[0-9]+' || echo "0"; } | head -1)
    if [ "$TARGET" -ge 150000 ]; then
        check_pass "目标字符数: ${TARGET} (≥150K)"
    elif [ "$TARGET" -gt 0 ]; then
        check_warn "目标字符数: ${TARGET} (偏低, Tier 3 mega-cap建议≥200K)"
    else
        check_warn "checkpoint.yaml 未设定 target_chars"
        echo "         → 建议在Phase 0规划时设定目标字符数"
    fi
else
    check_warn "checkpoint.yaml 不存在 (Phase 0尚未开始)"
fi

# ============================================================
# 汇总
# ============================================================
echo ""
echo "═══════════════════════════════════════════════════"
echo "  结果: PASS=$PASS | FAIL=$FAIL | WARN=$WARN"

if [ $FAIL -gt 0 ]; then
    echo ""
    echo "  *** BLOCKED — 有 $FAIL 项阻断 ***"
    echo "  Phase 0 不得启动。请先完成上述 FAIL 项。"
    echo "═══════════════════════════════════════════════════"
    exit 1
else
    echo ""
    echo "  CLEARED — 可以启动 Phase 0"
    if [ $WARN -gt 0 ]; then
        echo "  (有 $WARN 项警告, 建议处理)"
    fi
    echo "═══════════════════════════════════════════════════"
    exit 0
fi
