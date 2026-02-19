#!/bin/bash
# ============================================================
# phase_sentinel.sh v1.0 — 纵深防御质量哨兵
# ============================================================
# 用法: bash scripts/phase_sentinel.sh <TICKER> <CURRENT_PHASE> [TARGET_CHARS]
#
# 核心设计原则: 后续检查点永远重新验证前序产出
# 这意味着即使Phase 0的检查被跳过，Phase 1的哨兵会重新
# 验证Phase -1/-0.5的产出是否存在。多层重叠=单点失败不致命。
#
# 检查项:
# [永久] knowledge_context.md / lit_recon_memo.md / launch_brief.md
# [永久] checkpoint.yaml + target_chars
# [Phase≥1] staging累计产出 vs 轨迹预期
# [Phase≥3] 分析深度指标 (DM锚点密度)
# [Phase≥4] 红队产出验证
#
# 退出码: 0=CLEARED | 1=FAIL(建议修复) | 2=BLOCK(前序缺失,必须补)
# ============================================================

set -uo pipefail

TICKER="${1:?用法: $0 <TICKER> <PHASE> [TARGET_CHARS]}"
PHASE="${2:?缺少PHASE参数}"
TARGET="${3:-300000}"

DATA="reports/${TICKER}/data"
STAGING="reports/${TICKER}/staging"

PASS=0
WARN=0
FAIL=0
BLOCK=0

check_pass()  { echo "  [PASS]  $1"; PASS=$((PASS + 1)); }
check_warn()  { echo "  [WARN]  $1"; WARN=$((WARN + 1)); }
check_fail()  { echo "  [FAIL]  $1"; FAIL=$((FAIL + 1)); }
check_block() { echo "  [BLOCK] $1"; BLOCK=$((BLOCK + 1)); }

echo "═══════════════════════════════════════════════════"
echo "  Phase Sentinel v1.0 — 纵深防御"
echo "  Ticker: $TICKER | Phase: $PHASE | Target: $((TARGET/1000))K"
echo "  Time: $(date '+%Y-%m-%d %H:%M')"
echo "═══════════════════════════════════════════════════"

# ============================================================
# Layer 1: 永久检查项 — 每次都验证,不管当前Phase
# 设计: 即使前面的检查被跳过,这里总会重新捕获
# ============================================================
echo ""
echo "--- Layer 1: Prerequisites (永久验证) ---"

# 1a. knowledge_context.md (Phase -1产出)
if [ -f "$DATA/knowledge_context.md" ]; then
    KC=$(wc -m < "$DATA/knowledge_context.md" | tr -d ' ')
    if [ "$KC" -ge 500 ]; then
        check_pass "knowledge_context.md ($KC chars)"
    else
        check_fail "knowledge_context.md 过短 ($KC < 500 chars)"
    fi
else
    check_block "knowledge_context.md 缺失 — Phase -1未执行"
fi

# 1b. lit_recon_memo.md (Phase -0.5产出)
if [ -f "$DATA/lit_recon_memo.md" ]; then
    LR=$(wc -m < "$DATA/lit_recon_memo.md" | tr -d ' ')
    if [ "$LR" -ge 1000 ]; then
        check_pass "lit_recon_memo.md ($LR chars)"
    else
        check_fail "lit_recon_memo.md 过短 ($LR < 1000 chars)"
    fi
else
    check_block "lit_recon_memo.md 缺失 — Phase -0.5未执行"
fi

# 1c. launch_brief.md (tier3_launch产出)
if [ -f "$DATA/launch_brief.md" ]; then
    check_pass "launch_brief.md 存在"
else
    check_warn "launch_brief.md 缺失 (无复杂度预估)"
fi

# 1d. checkpoint.yaml + target_chars
if [ -f "$DATA/checkpoint.yaml" ]; then
    TC=$({ grep -oE 'target_chars: [0-9]+' "$DATA/checkpoint.yaml" 2>/dev/null | grep -oE '[0-9]+' || echo "0"; } | head -1)
    if [ "$TC" -ge 150000 ]; then
        check_pass "target_chars=$TC"
        # 使用checkpoint中的target覆盖默认值
        TARGET="$TC"
    elif [ "$TC" -gt 0 ]; then
        check_warn "target_chars=$TC (偏低,Tier 3建议≥200K)"
    else
        check_warn "target_chars未设定"
    fi
else
    if [ "$PHASE" -ge 1 ]; then
        check_fail "checkpoint.yaml缺失 (Phase 0未完成?)"
    else
        check_warn "checkpoint.yaml尚未创建 (Phase 0前正常)"
    fi
fi

# ============================================================
# Layer 2: 产出轨迹检查 — Phase 1+
# 设计: 检测"产出过薄"问题(像AAPL 66K的情况)
# ============================================================
if [ "$PHASE" -ge 1 ]; then
    echo ""
    echo "--- Layer 2: 产出轨迹 (Phase $PHASE) ---"

    # 统计staging产出
    STAGING_CHARS=0
    STAGING_FILES=0
    if [ -d "$STAGING" ]; then
        for sf in "$STAGING"/*.md; do
            if [ -f "$sf" ]; then
                FC=$(wc -m < "$sf" | tr -d ' ')
                STAGING_CHARS=$((STAGING_CHARS + FC))
                STAGING_FILES=$((STAGING_FILES + 1))
            fi
        done
    fi

    # 统计Phase报告产出
    PHASE_CHARS=0
    for pf in reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$pf" ]; then
            FC=$(wc -m < "$pf" | tr -d ' ')
            PHASE_CHARS=$((PHASE_CHARS + FC))
        fi
    done

    TOTAL_CHARS=$((STAGING_CHARS + PHASE_CHARS))
    TOTAL_K=$((TOTAL_CHARS / 1000))

    # 轨迹预期: 每个Phase至少贡献目标的15%
    # Phase 1完成: ≥15% | Phase 2: ≥30% | Phase 3: ≥50% | Phase 4: ≥65%
    EXPECTED_PCT=$((PHASE * 15))
    if [ "$EXPECTED_PCT" -gt 80 ]; then EXPECTED_PCT=80; fi
    EXPECTED_MIN=$((TARGET * EXPECTED_PCT / 100))
    EXPECTED_MIN_K=$((EXPECTED_MIN / 1000))

    echo "  累计产出: ${TOTAL_K}K chars (staging: $STAGING_FILES files)"
    echo "  轨迹预期: ≥${EXPECTED_MIN_K}K chars (${EXPECTED_PCT}% of target)"

    if [ "$TOTAL_CHARS" -ge "$EXPECTED_MIN" ]; then
        ACTUAL_PCT=$((TOTAL_CHARS * 100 / TARGET))
        check_pass "产出轨迹正常 (${ACTUAL_PCT}% of target at Phase $PHASE)"
    elif [ "$TOTAL_CHARS" -ge "$((EXPECTED_MIN / 2))" ]; then
        ACTUAL_PCT=$((TOTAL_CHARS * 100 / TARGET))
        check_warn "产出偏薄 (${ACTUAL_PCT}% vs expected ${EXPECTED_PCT}%)"
    else
        ACTUAL_PCT=$((TOTAL_CHARS * 100 / TARGET))
        check_fail "产出严重不足 (${ACTUAL_PCT}% vs expected ${EXPECTED_PCT}%)"
        echo "         → 回顾: 是否跳过了关键分析步骤?"
    fi
fi

# ============================================================
# Layer 3: DM锚点密度 — Phase 3+
# 设计: 检测"有文字但无数据支撑"的情况
# ============================================================
if [ "$PHASE" -ge 3 ]; then
    echo ""
    echo "--- Layer 3: 数据密度 (Phase $PHASE) ---"

    # 统计所有产出中的DM锚点
    DM_COUNT=0
    for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$f" ]; then
            FC=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$f" 2>/dev/null | sort -u | wc -l || echo "0"; } | tr -d ' ')
            DM_COUNT=$((DM_COUNT + FC))
        fi
    done

    # 预期: Tier 3报告至少100个unique DM锚点到Phase 3
    if [ "$DM_COUNT" -ge 100 ]; then
        check_pass "DM锚点: $DM_COUNT (≥100)"
    elif [ "$DM_COUNT" -ge 50 ]; then
        check_warn "DM锚点偏少: $DM_COUNT (建议≥100)"
    else
        check_fail "DM锚点严重不足: $DM_COUNT (需≥100)"
        echo "         → 回顾: 分析是否缺乏数据支撑?"
    fi
fi

# ============================================================
# Layer 4: Phase-specific artifact检查
# ============================================================
if [ "$PHASE" -ge 4 ]; then
    echo ""
    echo "--- Layer 4: Phase 4 红队产出 ---"

    RT_FOUND=0
    for pattern in "*red*team*" "*redteam*" "*RT*" "*P4*" "*phase4*" "*red_team*"; do
        for f in "$STAGING"/$pattern; do
            if [ -f "$f" ]; then
                RT_FOUND=$((RT_FOUND + 1))
            fi
        done
    done

    if [ "$RT_FOUND" -gt 0 ]; then
        check_pass "红队产出: $RT_FOUND files"
    else
        check_warn "未检测到红队产出文件 (可能使用了不同命名)"
    fi
fi

# ============================================================
# 汇总 + 修复建议
# ============================================================
echo ""
echo "═══════════════════════════════════════════════════"
echo "  结果: PASS=$PASS | WARN=$WARN | FAIL=$FAIL | BLOCK=$BLOCK"

if [ $BLOCK -gt 0 ]; then
    echo ""
    echo "  *** CRITICAL BLOCK — 前序Phase产出缺失 ***"
    echo "  当前所有工作建立在不完整的基础上。"
    echo "  必须回补缺失的前序产出,才能继续。"
    echo ""
    echo "  修复步骤:"
    echo "  1. bash scripts/tier3_launch.sh $TICKER"
    echo "  2. 完成Phase -0.5文献侦察"
    echo "  3. bash scripts/preflight_gate.sh $TICKER"
    echo "═══════════════════════════════════════════════════"
    exit 2
elif [ $FAIL -gt 0 ]; then
    echo ""
    echo "  *** FAIL — $FAIL 项需要修复 ***"
    echo "  可以继续,但质量可能受影响。"
    echo "  强烈建议修复后再进入下一Phase。"
    echo "═══════════════════════════════════════════════════"
    exit 1
elif [ $WARN -gt 2 ]; then
    echo ""
    echo "  CAUTION — $WARN 项警告"
    echo "  建议review后继续。"
    echo "═══════════════════════════════════════════════════"
    exit 0
else
    echo ""
    echo "  CLEARED — Phase $PHASE 质量合格"
    echo "═══════════════════════════════════════════════════"
    exit 0
fi
