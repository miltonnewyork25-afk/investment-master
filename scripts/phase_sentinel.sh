#!/bin/bash
# ============================================================
# phase_sentinel.sh v2.1 — 纵深防御质量哨兵
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
# [Phase≥5] AB-007 方法独立性审计检查 (v2.1, EVO-AAPL-002)
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

# ============================================================
# Fever Response — 动态阈值 (基于质量趋势)
# trend=down+consecutive≥2 → 收紧20%
# failure_flag=true → 收紧30%
# trend=up+consecutive≥3 → 放松10%
# ============================================================
TH_KC_MIN=500
TH_LR_MIN=1000
TH_TARGET_MIN=150000
TH_PHASE_PCT=15
TH_DM_MIN=100
FEVER_LABEL=""

TREND_SCRIPT="$(cd "$(dirname "$0")" && pwd)/evolution_trend.sh"
if [[ -f "$TREND_SCRIPT" ]]; then
    TREND_JSON=$(bash "$TREND_SCRIPT" --json 2>/dev/null) || true
    if [[ -n "$TREND_JSON" ]]; then
        FEVER_RESULT=$(echo "$TREND_JSON" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    trend = d.get('trend_direction', 'stable')
    consec = d.get('consecutive_direction', 0)
    failure = d.get('failure_flag', False)
    if failure:
        print('FEVER-CRITICAL 1.3')
    elif trend == 'down' and consec >= 2:
        print('FEVER 1.2')
    elif trend == 'up' and consec >= 3:
        print('RELAXED 0.9')
    else:
        print('NORMAL 1.0')
except:
    print('NORMAL 1.0')
" 2>/dev/null) || FEVER_RESULT="NORMAL 1.0"

        FEVER_LABEL=$(echo "$FEVER_RESULT" | cut -d' ' -f1)
        FEVER_MULT=$(echo "$FEVER_RESULT" | cut -d' ' -f2)

        if [[ "$FEVER_LABEL" != "NORMAL" ]]; then
            TH_KC_MIN=$(python3 -c "print(int($TH_KC_MIN * $FEVER_MULT))" 2>/dev/null || echo "$TH_KC_MIN")
            TH_LR_MIN=$(python3 -c "print(int($TH_LR_MIN * $FEVER_MULT))" 2>/dev/null || echo "$TH_LR_MIN")
            TH_TARGET_MIN=$(python3 -c "print(int($TH_TARGET_MIN * $FEVER_MULT))" 2>/dev/null || echo "$TH_TARGET_MIN")
            TH_PHASE_PCT=$(python3 -c "print(int($TH_PHASE_PCT * $FEVER_MULT))" 2>/dev/null || echo "$TH_PHASE_PCT")
            TH_DM_MIN=$(python3 -c "print(int($TH_DM_MIN * $FEVER_MULT))" 2>/dev/null || echo "$TH_DM_MIN")
        fi
    fi
fi

echo "═══════════════════════════════════════════════════"
echo "  Phase Sentinel v2.0 — 纵深防御 + Fever Response"
echo "  Ticker: $TICKER | Phase: $PHASE | Target: $((TARGET/1000))K${FEVER_LABEL:+ | [$FEVER_LABEL]}"
if [[ -n "$FEVER_LABEL" && "$FEVER_LABEL" != "NORMAL" ]]; then
    echo "  Thresholds: KC≥${TH_KC_MIN} LR≥${TH_LR_MIN} DM≥${TH_DM_MIN} Phase%=${TH_PHASE_PCT}"
fi
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
    if [ "$KC" -ge $TH_KC_MIN ]; then
        check_pass "knowledge_context.md ($KC chars)"
    else
        check_fail "knowledge_context.md 过短 ($KC < $TH_KC_MIN chars)"
    fi
else
    check_block "knowledge_context.md 缺失 — Phase -1未执行"
fi

# 1b. lit_recon_memo.md (Phase -0.5产出)
if [ -f "$DATA/lit_recon_memo.md" ]; then
    LR=$(wc -m < "$DATA/lit_recon_memo.md" | tr -d ' ')
    if [ "$LR" -ge $TH_LR_MIN ]; then
        check_pass "lit_recon_memo.md ($LR chars)"
    else
        check_fail "lit_recon_memo.md 过短 ($LR < $TH_LR_MIN chars)"
    fi
else
    check_block "lit_recon_memo.md 缺失 — Phase -0.5未执行"
fi

# 1c. thesis_crystallization.md (Phase 0.75产出, v17.1新增)
if [ -f "$DATA/thesis_crystallization.md" ]; then
    TC_CHARS=$(wc -m < "$DATA/thesis_crystallization.md" | tr -d ' ')
    if [ "$TC_CHARS" -ge 1500 ]; then
        # 检查是否有非共识假说(H1/H2标记)
        H_COUNT=$({ grep -cE '^[|] H[0-9]' "$DATA/thesis_crystallization.md" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
        H_COUNT="${H_COUNT:-0}"
        if [ "$H_COUNT" -ge 1 ]; then
            check_pass "thesis_crystallization.md ($TC_CHARS chars, ${H_COUNT}个假说)"
        else
            check_warn "thesis_crystallization.md存在但无假说登记(H行=0) → 非共识洞见风险偏低"
        fi
    else
        check_warn "thesis_crystallization.md过短 ($TC_CHARS < 1500 chars)"
    fi
else
    if [ "$PHASE" -ge 1 ]; then
        check_warn "thesis_crystallization.md缺失 → Phase 0.75未执行, 报告可能缺乏核心矛盾聚焦"
    fi
fi

# 1d. launch_brief.md (tier3_launch产出)
if [ -f "$DATA/launch_brief.md" ]; then
    check_pass "launch_brief.md 存在"
else
    check_warn "launch_brief.md 缺失 (无复杂度预估)"
fi

# 1d. checkpoint.yaml + target_chars
if [ -f "$DATA/checkpoint.yaml" ]; then
    TC=$({ grep -oE 'target_chars: [0-9]+' "$DATA/checkpoint.yaml" 2>/dev/null | grep -oE '[0-9]+' || echo "0"; } | head -1)
    if [ "$TC" -ge $TH_TARGET_MIN ]; then
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
    EXPECTED_PCT=$((PHASE * TH_PHASE_PCT))
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
# Layer 3: DM锚点密度 — Phase 1+ (EVO-ANET-003: 从Phase 3前移至Phase 1)
# 设计: 检测"有文字但无数据支撑"的情况，越早发现越好
# ============================================================
if [ "$PHASE" -ge 1 ]; then
    echo ""
    echo "--- Layer 3: 数据密度 (Phase $PHASE) ---"

    # 统计所有产出中的DM锚点(累计)
    DM_COUNT=0
    for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$f" ]; then
            FC=$({ grep -oE 'DM-[A-Z]+-[0-9]+' "$f" 2>/dev/null | sort -u | wc -l || echo "0"; } | head -1 | tr -d ' ')
            FC="${FC:-0}"
            DM_COUNT=$((DM_COUNT + FC))
        fi
    done

    # 按Phase阶段调整预期 (EVO-ANET-003: 每Phase≥30，累计阶梯式增长)
    DM_EXPECTED=$((PHASE * 30))
    if [ "$DM_EXPECTED" -gt $TH_DM_MIN ]; then
        DM_EXPECTED=$TH_DM_MIN
    fi
    DM_WARN_MIN=$((DM_EXPECTED / 2))

    if [ "$DM_COUNT" -ge "$DM_EXPECTED" ]; then
        check_pass "DM锚点: $DM_COUNT (≥${DM_EXPECTED} for Phase $PHASE)"
    elif [ "$DM_COUNT" -ge "$DM_WARN_MIN" ]; then
        check_warn "DM锚点偏少: $DM_COUNT (Phase $PHASE建议≥$DM_EXPECTED)"
    else
        check_fail "DM锚点严重不足: $DM_COUNT (Phase $PHASE需≥$DM_EXPECTED)"
        echo "         → Agent prompt是否遗漏DM标注要求? 每Phase应≥30个DM引用"
    fi
fi

# ============================================================
# Layer 3.5: 前瞻完整性检查 — Phase 3+ AI相关公司 (EVO-ANET-005)
# 设计: 防止前瞻视角缺失导致v1.1补丁
# ============================================================
if [ "$PHASE" -ge 3 ]; then
    # 检测是否有checkpoint中的PW≥4(混合/发现模式=AI相关)
    PW_VAL=0
    if [ -f "$DATA/checkpoint.yaml" ]; then
        PW_VAL=$({ grep -oE 'pw: [0-9]+' "$DATA/checkpoint.yaml" 2>/dev/null | grep -oE '[0-9]+' || echo "0"; } | head -1 | tr -d ' ')
        PW_VAL="${PW_VAL:-0}"
    fi

    if [ "$PW_VAL" -ge 4 ]; then
        FWD_COUNT=0
        for f in "$STAGING"/S07*.md "$STAGING"/S08*.md "$STAGING"/S09*.md; do
            if [ -f "$f" ]; then
                FC=$({ grep -ciE '前沿变量|Token经济|推理需求|Agent系统|inference|Jevons' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
                FC="${FC:-0}"
                FWD_COUNT=$((FWD_COUNT + FC))
            fi
        done
        if [ "$FWD_COUNT" -ge 3 ]; then
            check_pass "前瞻变量: $FWD_COUNT mentions in P3 staging (PW=$PW_VAL)"
        else
            check_warn "前瞻变量偏少: $FWD_COUNT (<3) — PW≥4的AI相关公司应含Token经济/推理/Agent分析"
        fi
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
# Layer 4.5: 薄章节检测 — Phase≥5 (EVO-ARM-002)
# 设计: Complete组装前检测<1500字符章节,防止章节厚度极不均匀
# ============================================================
if [ "$PHASE" -ge 5 ]; then
    THIN_DETECTOR="$(cd "$(dirname "$0")" && pwd)/thin_chapter_detector.sh"
    # 查找Complete或最新Phase报告
    COMPLETE_FILE=""
    for cf in reports/${TICKER}/${TICKER}_Complete*.md; do
        if [ -f "$cf" ]; then COMPLETE_FILE="$cf"; fi
    done
    if [ -z "$COMPLETE_FILE" ]; then
        # 回退: 最新Phase报告
        for cf in reports/${TICKER}/${TICKER}_Phase*.md; do
            if [ -f "$cf" ]; then COMPLETE_FILE="$cf"; fi
        done
    fi
    if [ -f "$THIN_DETECTOR" ] && [ -n "$COMPLETE_FILE" ]; then
        echo ""
        echo "--- Layer 4.5: 薄章节检测 ---"
        THIN_EXIT=0
        THIN_RESULT=$(bash "$THIN_DETECTOR" "$COMPLETE_FILE" 1500 2>/dev/null) || THIN_EXIT=$?
        if [ "$THIN_EXIT" -eq 1 ]; then
            THIN_COUNT=$(echo "$THIN_RESULT" | grep '薄章节数:' | grep -oE '[0-9]+' | head -1)
            check_warn "薄章节检测: ${THIN_COUNT:-?}个章节<1500字符 → bash scripts/thin_chapter_detector.sh $COMPLETE_FILE"
        else
            check_pass "薄章节检测: 所有章节≥1500字符"
        fi
    fi
fi

# ============================================================
# 汇总 + 修复建议
# ============================================================
echo ""
echo "═══════════════════════════════════════════════════"
echo "  结果: PASS=$PASS | WARN=$WARN | FAIL=$FAIL | BLOCK=$BLOCK"

# ============================================================
# Layer 5: Antibody Checks — 自动化AI_review抗体
# AB-003: 单会话检测 (Phase≥5)
# AB-004: 交叉验证密度 (Phase≥3)
# AB-006: 方法独立性 (Phase≥5)
# ============================================================
if [ "$PHASE" -ge 3 ]; then
    echo ""
    echo "--- Layer 5: Antibody Checks ---"

    # AB-004: 交叉验证提及密度
    XV_COUNT=0
    for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$f" ]; then
            XV=$({ grep -ci '交叉验证' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            XV="${XV:-0}"
            XV_COUNT=$((XV_COUNT + XV))
        fi
    done
    if [ "$XV_COUNT" -lt 3 ]; then
        check_warn "AB-004: 交叉验证提及${XV_COUNT}次 (建议≥3) → 可能缺乏多源校验"
    else
        check_pass "AB-004: 交叉验证提及${XV_COUNT}次"
    fi
fi

if [ "$PHASE" -ge 5 ]; then
    # AB-003: 单会话检测 — checkpoint更新次数
    if [ -f "$DATA/checkpoint.yaml" ]; then
        UC=$({ grep -oE 'update_count: [0-9]+' "$DATA/checkpoint.yaml" 2>/dev/null | grep -oE '[0-9]+' || echo "0"; } | head -1)
        UC="${UC:-0}"
        if [ "$UC" -lt 3 ]; then
            check_warn "AB-003: 仅${UC}次检查点更新 → 可能单会话急速完成"
        else
            check_pass "AB-003: ${UC}次检查点更新"
        fi
    fi

    # AB-007 (v2.1, EVO-AAPL-002): 方法独立性审计 — 强制检查
    # AAPL教训: 5种估值方法实际仅2.5独立, 但无脚本检测
    # 检查: staging中有independence/独立性审计文件, 或报告提及"方法独立性"/"假设重叠"
    VIA_FILE=0
    for f in "$STAGING"/*independen* "$STAGING"/*独立性* "$STAGING"/*method_audit*; do
        if [ -f "$f" ]; then
            VIA_FILE=$((VIA_FILE + 1))
        fi
    done
    VIA_MENTION=0
    for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$f" ]; then
            VM=$({ grep -ci '方法独立性\|假设重叠\|independence.*audit\|方法.*伪独立\|独立性.*审计' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            VM="${VM:-0}"
            VIA_MENTION=$((VIA_MENTION + VM))
        fi
    done
    if [ "$VIA_FILE" -gt 0 ]; then
        check_pass "AB-007: 独立性审计文件 $VIA_FILE 个"
    elif [ "$VIA_MENTION" -ge 3 ]; then
        check_pass "AB-007: 独立性审计提及 $VIA_MENTION 次 (无独立文件)"
    else
        check_warn "AB-007: 未检测到估值方法独立性审计 → 可能存在方法伪独立(5法实际2.5独立)"
        echo "         → 建议: Phase 5前运行 /valuation-independence-audit"
    fi

    # AB-008 (v17.1, EVO-LRCX-001/003): 跨Agent数值一致性检查
    # LRCX教训: P5_A(-11.3%) vs P5_C(-29.5%) 18pp冲突, 组装修复43处
    # 策略: 从每个P5文件的前20行(通常含标题摘要)提取关键数值, 比较跨文件一致性
    if ls "$STAGING"/P5_*.md 1>/dev/null 2>&1; then
        P5_CONFLICT=0
        P5_DETAIL=""

        # 提取每个P5文件中"期望回报"关键数值(取首次出现的百分比,即标题/摘要值)
        ER_PER_FILE=""
        for pf in "$STAGING"/P5_*.md; do
            if [ -f "$pf" ]; then
                # 提取"期望回报"后紧跟的百分比(支持各种格式: 冒号/空格/~/**等)
                PF_ER=$({ grep -oE '期望回报[^0-9]*[-+]?[0-9]+\.?[0-9]*%' "$pf" 2>/dev/null | head -1 | grep -oE '[-+]?[0-9]+\.?[0-9]*' || true; })
                if [ -n "$PF_ER" ]; then
                    PF_NAME=$(basename "$pf")
                    ER_PER_FILE="${ER_PER_FILE}${PF_NAME}=${PF_ER} "
                fi
            fi
        done
        # 提取唯一数值(绝对值精度到整数)
        ER_UNIQUE=$(echo "$ER_PER_FILE" | grep -oE '=[-+]?[0-9]+' | sort -u | wc -l | tr -d ' ')
        ER_UNIQUE="${ER_UNIQUE:-0}"
        if [ "$ER_UNIQUE" -gt 1 ]; then
            P5_CONFLICT=$((P5_CONFLICT + 1))
            P5_DETAIL="${P5_DETAIL}期望回报: ${ER_PER_FILE}; "
        fi

        # 检查CQ加权置信度一致性
        CQ_PER_FILE=""
        for pf in "$STAGING"/P5_*.md; do
            if [ -f "$pf" ]; then
                PF_CQ=$({ grep -oE 'CQ加权置信度[^0-9]*[0-9]+\.?[0-9]*%' "$pf" 2>/dev/null | head -1 | grep -oE '[0-9]+\.?[0-9]*' || true; })
                if [ -n "$PF_CQ" ]; then
                    PF_NAME=$(basename "$pf")
                    CQ_PER_FILE="${CQ_PER_FILE}${PF_NAME}=${PF_CQ} "
                fi
            fi
        done
        CQ_UNIQUE=$(echo "$CQ_PER_FILE" | grep -oE '=[0-9]+' | sort -u | wc -l | tr -d ' ')
        CQ_UNIQUE="${CQ_UNIQUE:-0}"
        if [ "$CQ_UNIQUE" -gt 1 ]; then
            P5_CONFLICT=$((P5_CONFLICT + 1))
            P5_DETAIL="${P5_DETAIL}CQ置信度: ${CQ_PER_FILE}; "
        fi

        # 检查方法离散度一致性
        MD_PER_FILE=""
        for pf in "$STAGING"/P5_*.md; do
            if [ -f "$pf" ]; then
                PF_MD=$({ grep -oE '方法离散度[^0-9]*[0-9]+\.?[0-9]*x' "$pf" 2>/dev/null | head -1 | grep -oE '[0-9]+\.?[0-9]*' || true; })
                if [ -n "$PF_MD" ]; then
                    PF_NAME=$(basename "$pf")
                    MD_PER_FILE="${MD_PER_FILE}${PF_NAME}=${PF_MD} "
                fi
            fi
        done
        MD_UNIQUE=$(echo "$MD_PER_FILE" | grep -oE '=[0-9]+' | sort -u | wc -l | tr -d ' ')
        MD_UNIQUE="${MD_UNIQUE:-0}"
        if [ "$MD_UNIQUE" -gt 1 ]; then
            P5_CONFLICT=$((P5_CONFLICT + 1))
            P5_DETAIL="${P5_DETAIL}方法离散度: ${MD_PER_FILE}; "
        fi

        if [ "$P5_CONFLICT" -gt 0 ]; then
            check_warn "AB-008: P5跨Agent数值冲突${P5_CONFLICT}项 → ${P5_DETAIL}必须统一后再组装"
            echo "         → 建议: 以P5_C(估值闭环)为权威源, 更新P5_A中的引用值"
        else
            check_pass "AB-008: P5跨Agent数值一致(期望回报/CQ/离散度)"
        fi
    fi

    # AB-006: 方法独立性 — 估值结果离散度
    ALL_VALS=""
    for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md; do
        if [ -f "$f" ]; then
            FVALS=$({ grep -oE '(方法[0-9一二三四五六M][^:：]*[：:].*\$[0-9,.]+|DCF.*\$[0-9,.]+|SOTP.*\$[0-9,.]+)' "$f" 2>/dev/null | grep -oE '\$[0-9,]+\.?[0-9]*' | tr -d ',$' || true; })
            if [ -n "$FVALS" ]; then
                ALL_VALS="${ALL_VALS}${FVALS}"$'\n'
            fi
        fi
    done
    ALL_VALS=$(echo "$ALL_VALS" | sort -un | grep -v '^$' || true)

    if [ -n "$ALL_VALS" ]; then
        AB006=$(echo "$ALL_VALS" | python3 -c "
import sys
vals = [float(x) for x in sys.stdin.read().strip().split('\n') if x]
if len(vals) >= 2:
    close = 0
    for i in range(len(vals)):
        for j in range(i+1, len(vals)):
            if max(vals[i],vals[j]) > 0:
                diff = abs(vals[i]-vals[j])/max(vals[i],vals[j])*100
                if diff < 3: close += 1
    print(f'{close}')
else:
    print('-1')
" 2>/dev/null) || AB006="-1"

        if [ "$AB006" != "-1" ] && [ "$AB006" -gt 0 ] 2>/dev/null; then
            check_warn "AB-006: ${AB006}对估值方法结果差<3% → 方法可能缺乏独立性"
        elif [ "$AB006" == "0" ]; then
            check_pass "AB-006: 估值方法结果离散度合理"
        fi
    fi
fi

# --- Near-miss追踪: 写入sentinel_log.yaml ---
SENTINEL_LOG="$DATA/sentinel_log.yaml"
mkdir -p "$DATA"
if [ ! -f "$SENTINEL_LOG" ]; then
    echo "# Sentinel Log — 质量哨兵事件记录" > "$SENTINEL_LOG"
    echo "events:" >> "$SENTINEL_LOG"
fi
cat >> "$SENTINEL_LOG" << SENTRY
  - phase: $PHASE
    timestamp: "$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")"
    pass: $PASS
    warn: $WARN
    fail: $FAIL
    block: $BLOCK
    target_chars: $TARGET
SENTRY
echo "  → sentinel_log.yaml 已更新"

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
