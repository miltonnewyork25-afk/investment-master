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
# Layer 2.5: 关键铁律脚本化检查 — prompt→script升级 (v3.0, 2026-03-25复盘)
# 原则: "质量来自更硬的约束"——把可忽略的prompt规则变成不可绕过的脚本检查
# ============================================================

# 铁律O: Reverse DCF必须在Phase 1出现 (CRM v1.0教训)
if [ "$PHASE" -ge 1 ]; then
    RDCF_FOUND=0
    for f in "$STAGING"/*.md; do
        if [ -f "$f" ]; then
            RC=$({ grep -ci 'Reverse DCF\|逆向.*DCF\|隐含.*CAGR\|市场.*隐含\|市场.*在.*定价\|反推.*增速' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            RDCF_FOUND=$((RDCF_FOUND + ${RC:-0}))
        fi
    done
    if [ "$RDCF_FOUND" -ge 2 ]; then
        check_pass "铁律O: Reverse DCF已出现(${RDCF_FOUND}处)"
    elif [ "$RDCF_FOUND" -ge 1 ]; then
        check_warn "铁律O: Reverse DCF仅${RDCF_FOUND}处 — 建议在Ch1深入展开"
    else
        check_fail "铁律O: Reverse DCF未出现! Phase 1必须含'市场在$XX隐含什么假设'"
        echo "         → 先翻译市场(隐含增速/利润率), 再提出自己观点"
        echo "         → CRM v1.0教训: 不做Reverse DCF→预设bullish→叙事断裂"
    fi
fi

# 铁律G6: Python验证必须在Phase 2后存在 (PTC/MA教训)
if [ "$PHASE" -ge 2 ]; then
    PY_COUNT=$(find "$DATA" -name "*.py" 2>/dev/null | wc -l | tr -d ' ')
    if [ "${PY_COUNT:-0}" -ge 1 ]; then
        check_pass "铁律G6: Python验证已存在(${PY_COUNT}个.py文件)"
    else
        check_warn "铁律G6: data/目录无.py文件 — Phase 2估值必须有Python DCF验证"
        echo "         → LLM不能做算术(铁律#3): DCF/SOTP/敏感性矩阵必须Python计算"
        echo "         → 产出: reports/${TICKER}/data/${TICKER}_dcf_model.py"
    fi
fi

# 铁律K: 估值统一性检查 — Phase 5前 (MCO教训)
if [ "$PHASE" -ge 4 ]; then
    # 检查staging中是否存在多个不一致的公允价值数字
    FV_NUMBERS=0
    FV_UNIQUE=0
    for f in "$STAGING"/*.md; do
        if [ -f "$f" ]; then
            # 提取"公允价值/fair value/FV"后面的$数字
            FVN=$({ grep -oE '公允.*\$[0-9]+|fair.*\$[0-9]+|FV.*\$[0-9]+' "$f" 2>/dev/null | wc -l || echo "0"; } | head -1 | tr -d ' ')
            FV_NUMBERS=$((FV_NUMBERS + ${FVN:-0}))
        fi
    done
    if [ "$FV_NUMBERS" -ge 2 ]; then
        check_warn "铁律K: 发现${FV_NUMBERS}处公允价值引用 — Phase 5前必须确认全报告数字一致"
        echo "         → 检查: 估值章节/执行摘要/评级的FV是否完全相同"
        echo "         → MCO教训: 6个估值中4个说高估但评级说低估=自相矛盾"
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

    # P1 升级 (PDD v2.0教训, v22.2): Staging 累积 DM 密度前移检查
    # 目的: 给 Phase 5 留缓冲。如果 staging 已经≥1.5/千字, P5 即使加 60K 0-DM 章节也仅稀释到 ~1.2
    # PDD v2.0 失败模式: staging ~0.6/千字, P5 加 65K 0-DM → 总 0.57 (BLOCK)
    if [ "$PHASE" -ge 2 ] && [ "$PHASE" -le 4 ]; then
        STAGING_CHARS=0
        STAGING_DM=0
        for f in "$STAGING"/*.md; do
            if [ -f "$f" ]; then
                FC=$(wc -m < "$f" | tr -d ' ')
                STAGING_CHARS=$((STAGING_CHARS + ${FC:-0}))
                FD=$({ grep -c 'DM-' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
                STAGING_DM=$((STAGING_DM + ${FD:-0}))
            fi
        done
        if [ "$STAGING_CHARS" -gt 5000 ]; then
            STAGING_DENSITY_X100=$((STAGING_DM * 1000 * 100 / STAGING_CHARS))  # x100 整数算术
            # Phase 阈值: P2≥100 (1.0), P3≥120 (1.2), P4≥150 (1.5)
            case "$PHASE" in
                2) STAGING_TARGET=100 ;;
                3) STAGING_TARGET=120 ;;
                4) STAGING_TARGET=150 ;;
            esac
            STAGING_DENSITY_DISPLAY=$(awk "BEGIN { printf \"%.2f\", $STAGING_DENSITY_X100 / 100 }")
            if [ "$STAGING_DENSITY_X100" -ge "$STAGING_TARGET" ]; then
                check_pass "Staging DM 密度: ${STAGING_DENSITY_DISPLAY}/千字 (≥$(awk "BEGIN{printf \"%.1f\", $STAGING_TARGET/100}") for P${PHASE}, P5 缓冲足够)"
            elif [ "$STAGING_DENSITY_X100" -ge $((STAGING_TARGET * 70 / 100)) ]; then
                check_warn "Staging DM 密度偏低: ${STAGING_DENSITY_DISPLAY}/千字 (P${PHASE}目标 $(awk "BEGIN{printf \"%.1f\", $STAGING_TARGET/100}"))"
                echo "         → P5 加新章节会进一步稀释 — 建议本 Phase 补 DM 而不是留给 P5"
            else
                check_fail "Staging DM 密度严重不足: ${STAGING_DENSITY_DISPLAY}/千字 (P${PHASE}目标 $(awk "BEGIN{printf \"%.1f\", $STAGING_TARGET/100}"))"
                echo "         → PDD v2.0 教训: staging ~0.6 → P5 加 65K 后 → 0.57 BLOCK 提交"
                echo "         → 必须本 Phase 补 DM, 不能拖到 P5"
            fi
        fi
    fi

    # EVO-SPGI-003: Phase 5 DM密度比检查 (扩写同步规则)
    if [ "$PHASE" -ge 5 ]; then
        COMPLETE_FILE=""
        for f in reports/${TICKER}/${TICKER}_Complete*.md; do
            [ -f "$f" ] && COMPLETE_FILE="$f" && break
        done
        if [ -n "$COMPLETE_FILE" ]; then
            CHAR_COUNT=$(wc -m < "$COMPLETE_FILE" | tr -d ' ')
            CHAR_COUNT="${CHAR_COUNT:-0}"
            COMPLETE_DM=$({ grep -oE '\[DM-[A-Za-z0-9]+-[0-9]+\]' "$COMPLETE_FILE" 2>/dev/null | sort -u | wc -l || echo "0"; } | head -1 | tr -d ' ')
            COMPLETE_DM="${COMPLETE_DM:-0}"
            if [ "$CHAR_COUNT" -gt 0 ]; then
                # 密度 = DM数 / (字符数/1000), 目标≥0.8/千字
                DM_PER_K=$(( COMPLETE_DM * 100 / (CHAR_COUNT / 1000) ))
                if [ "$DM_PER_K" -ge 80 ]; then
                    check_pass "DM密度: ${COMPLETE_DM}个/${CHAR_COUNT}字 = $(echo "scale=2; $COMPLETE_DM / ($CHAR_COUNT / 1000)" | bc)/千字 (≥0.8目标)"
                elif [ "$DM_PER_K" -ge 50 ]; then
                    check_warn "DM密度偏低: ${COMPLETE_DM}个/${CHAR_COUNT}字 = $(echo "scale=2; $COMPLETE_DM / ($CHAR_COUNT / 1000)" | bc)/千字 (目标≥0.8, 标杆VRT=1.49)"
                else
                    check_fail "DM密度严重不足: ${COMPLETE_DM}个/${CHAR_COUNT}字 (目标≥0.8/千字, 当前<0.5)"
                    echo "         → EVO-SPGI-003: 扩写期间未同步DM锚点, 需补充后重新检查"
                fi
            fi
        fi
    fi
fi

# ============================================================
# Layer 3.3: 断言密度检查 — Phase 1+ (v3.0, MA教训)
# 设计: 检测"有结论无证据"的偷懒模式——脚本级强制，AI无法绕过
# 断言=没有数据支撑的结论性判断，证据=有DM锚点/因果链/数据的段落
# 断言密度>50%=太多"空话"→FAIL
# ============================================================
if [ "$PHASE" -ge 1 ]; then
    echo ""
    echo "--- Layer 3.3: 断言密度检查 (MA教训) ---"

    TOTAL_ASSERTIONS=0
    TOTAL_EVIDENCE=0

    for f in "$STAGING"/*.md; do
        if [ -f "$f" ]; then
            # 断言模式: "X很强/X优秀/X显著/X领先/X稳定/X健康" 等结论性判断
            ASSERT=$({ grep -ciE '很强|极强|优秀|显著|领先|稳定|健康|良好|突出|核心优势|明显|无疑|毋庸置疑|不可替代|绝对|必然' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            TOTAL_ASSERTIONS=$((TOTAL_ASSERTIONS + ${ASSERT:-0}))

            # 证据模式: 有DM锚点/具体数字/因果推理的段落
            EVID=$({ grep -ciE 'DM-[A-Z]|[0-9]+%|[0-9]+\.[0-9]+x|\$[0-9]+|因为|因此|这意味着|这是因为|数据显示|根据' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            TOTAL_EVIDENCE=$((TOTAL_EVIDENCE + ${EVID:-0}))
        fi
    done

    if [ "$TOTAL_EVIDENCE" -eq 0 ]; then
        TOTAL_EVIDENCE=1  # 避免除零
    fi

    # 断言/证据比
    if [ "$TOTAL_ASSERTIONS" -gt 0 ] && [ "$TOTAL_EVIDENCE" -gt 0 ]; then
        AE_RATIO_PCT=$((TOTAL_ASSERTIONS * 100 / (TOTAL_ASSERTIONS + TOTAL_EVIDENCE)))
    else
        AE_RATIO_PCT=0
    fi

    echo "  断言=${TOTAL_ASSERTIONS} 证据=${TOTAL_EVIDENCE} 断言占比=${AE_RATIO_PCT}%"

    if [ "$AE_RATIO_PCT" -le 30 ]; then
        check_pass "断言密度: ${AE_RATIO_PCT}%(≤30% = 证据充分)"
    elif [ "$AE_RATIO_PCT" -le 50 ]; then
        check_warn "断言密度: ${AE_RATIO_PCT}%(30-50% = 部分段落缺证据链，建议补充DM锚点)"
    else
        check_fail "断言密度: ${AE_RATIO_PCT}%(>50% = 断言多于证据，需回补数据支撑)"
        echo "         → 查找无证据段落: grep -n '很强\|极强\|优秀\|显著\|领先' staging/*.md"
        echo "         → 每个断言后补: [DM-xxx] + 因为X→所以Y + 反面:什么条件下不成立"
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
# Layer 3.7: 地理分析门控 — Phase 1+ (EVO-SPGI-001)
# 设计: 国际收入>30%的公司必须含地理分析, 防止M7=0的结构遗漏
# ============================================================
if [ "$PHASE" -ge 1 ]; then
    GEO_REQ=""
    if [ -f "$DATA/checkpoint.yaml" ]; then
        GEO_REQ=$({ grep -oE 'geo_analysis_required: [a-z_]+' "$DATA/checkpoint.yaml" 2>/dev/null | cut -d' ' -f2 || echo ""; } | head -1 | tr -d ' ')
    fi
    if [ "$GEO_REQ" = "true" ]; then
        # 检查staging/Phase报告中是否有地理分析内容
        GEO_MENTIONS=0
        for f in "$STAGING"/*.md reports/${TICKER}/${TICKER}_Phase*.md reports/${TICKER}/${TICKER}_Complete*.md; do
            if [ -f "$f" ]; then
                GC=$({ grep -ciE '地理|geographic|international|region|美洲|欧洲|亚太|EMEA|Americas|Asia' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
                GC="${GC:-0}"
                GEO_MENTIONS=$((GEO_MENTIONS + GC))
            fi
        done
        if [ "$GEO_MENTIONS" -ge 10 ]; then
            check_pass "EVO-001: 地理分析存在 (${GEO_MENTIONS}次提及, 国际收入>30%)"
        elif [ "$GEO_MENTIONS" -ge 3 ]; then
            check_warn "EVO-001: 地理分析偏薄 (仅${GEO_MENTIONS}次提及) → 国际收入>30%需含地理拆分表"
        else
            check_fail "EVO-001: 地理分析缺失 (${GEO_MENTIONS}次提及) → checkpoint标记geo_analysis_required=true但无地理分析"
            echo "         → 需补充: 地理收入拆分表(≥3地区×≥3年) + 国际增速 + 国际OPM"
        fi
    fi
fi

# ============================================================
# Layer 3.8: ISDD利润表诊断卡 — Phase 1+ (ISDD v1.0)
# 设计: Phase 1财务分析必须产出income_diagnostic.yaml, 防止利润表分析流于表面
# ============================================================
if [ "$PHASE" -ge 2 ]; then
    if [ -f "$DATA/income_diagnostic.yaml" ]; then
        ISDD_CHARS=$(wc -m < "$DATA/income_diagnostic.yaml" | tr -d ' ')
        if [ "$ISDD_CHARS" -ge 200 ]; then
            check_pass "ISDD: 利润表诊断卡存在 (${ISDD_CHARS} chars)"
        else
            check_warn "ISDD: 诊断卡过短 (${ISDD_CHARS} chars < 200) → 可能未完整执行ISDD框架"
        fi
    else
        check_warn "ISDD: income_diagnostic.yaml缺失 → Phase 1应执行利润表深度诊断(knowledge/analysis_modules/income_statement_deep_diagnostic.md)"
    fi
fi

# ============================================================
# Layer 3.7: 财务六能力检查 — Phase≥1 (v3.0, 财务框架升级)
# 检查: 因果拆解/三表联动/质量分级/跨周期/证伪/商业映射
# ============================================================
if [ "$PHASE" -ge 1 ]; then
    echo ""
    echo "--- Layer 3.7: 财务六能力检查 ---"

    # 统计所有staging产出
    FIN_TOTAL=0
    FIN_CAUSAL=0   # 因果桥(价×量/OPM分解/FCF桥)
    FIN_CROSS=0    # 三表联动(OCF/NI, AR vs Rev, CapEx/DA)
    FIN_GRADE=0    # 质量分级(增长质量/利润质量/现金质量+A-F)
    FIN_NORMAL=0   # 正常化(正常化OPM/正常化盈利/中周期)
    FIN_FALSIFY=0  # 证伪(峰值OPM/SBC/GAAP≠有机)
    FIN_BIZ=0      # 商业映射(定价权/议价力/战略方向)

    for f in "$STAGING"/*.md; do
        if [ -f "$f" ]; then
            FIN_TOTAL=$((FIN_TOTAL + 1))
            # 能力1: 因果拆解
            C1=$({ grep -ci '价格.*贡献\|量.*贡献\|mix.*效应\|价.*量.*拆\|因果.*桥\|OPM.*分解\|FCF.*桥' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_CAUSAL=$((FIN_CAUSAL + ${C1:-0}))
            # 能力2: 三表联动
            C2=$({ grep -ci 'OCF/NI\|FCF/NI\|应收.*收入\|AR.*Revenue\|CapEx.*折旧\|三表\|交叉验证' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_CROSS=$((FIN_CROSS + ${C2:-0}))
            # 能力3: 质量分级
            C3=$({ grep -ci '增长质量\|利润质量\|现金质量\|质量.*[A-F]级\|质量分级' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_GRADE=$((FIN_GRADE + ${C3:-0}))
            # 能力4: 正常化
            C4=$({ grep -ci '正常化.*OPM\|正常化.*盈利\|中周期\|跨周期\|峰值.*谷底\|normalize' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_NORMAL=$((FIN_NORMAL + ${C4:-0}))
            # 能力5: 证伪
            C5=$({ grep -ci '峰值OPM\|SBC.*侵蚀\|GAAP.*有机\|FCF.*陷阱\|ROIC.*商誉\|证伪\|最容易错' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_FALSIFY=$((FIN_FALSIFY + ${C5:-0}))
            # 能力6: 商业映射
            C6=$({ grep -ci '定价权.*信号\|议价力\|战略.*方向\|商业.*含义\|财务.*商业\|这意味着.*业务\|这说明.*竞争' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            FIN_BIZ=$((FIN_BIZ + ${C6:-0}))
        fi
    done

    FIN_SCORE=0
    for v in $FIN_CAUSAL $FIN_CROSS $FIN_GRADE $FIN_NORMAL $FIN_FALSIFY $FIN_BIZ; do
        if [ "${v:-0}" -ge 1 ]; then FIN_SCORE=$((FIN_SCORE + 1)); fi
    done

    echo "  因果拆解=$FIN_CAUSAL 三表联动=$FIN_CROSS 质量分级=$FIN_GRADE 正常化=$FIN_NORMAL 证伪=$FIN_FALSIFY 商业映射=$FIN_BIZ"

    if [ "$FIN_SCORE" -ge 5 ]; then
        check_pass "财务六能力: ${FIN_SCORE}/6 维度覆盖"
    elif [ "$FIN_SCORE" -ge 3 ]; then
        check_warn "财务六能力: ${FIN_SCORE}/6 维度覆盖 — 缺失维度需要在后续Phase补齐"
    else
        check_fail "财务六能力: ${FIN_SCORE}/6 维度覆盖 — 严重不足，财务章节质量风险"
    fi
fi

# ============================================================
# Layer 3.8: 圆桌痕迹检查 — Phase≥3 (v3.1, 无痕融入)
# ============================================================
if [ "$PHASE" -ge 3 ]; then
    ROUNDTABLE_TRACE=0
    for f in "$STAGING"/*.md; do
        if [ -f "$f" ]; then
            RT=$({ grep -ci '巴菲特\|芒格\|李录\|阿克曼\|德鲁肯米勒\|达里奥\|Cathie\|Bear检察官\|【陈述】\|【质疑】\|【补充】\|【反驳】\|圆桌讨论\|大师认为\|大师们' "$f" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            ROUNDTABLE_TRACE=$((ROUNDTABLE_TRACE + ${RT:-0}))
        fi
    done

    if [ "$ROUNDTABLE_TRACE" -eq 0 ]; then
        check_pass "圆桌无痕: staging中0处圆桌痕迹"
    else
        check_fail "圆桌痕迹: staging中${ROUNDTABLE_TRACE}处未清除的大师名字/行动标签 — 必须改写为报告正文口吻"
        echo "         → 运行: grep -in '巴菲特|李录|阿克曼|【陈述】|【质疑】|圆桌' staging/*.md"
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
# Layer 4.1: G9认知边界5维分解检测 — Phase≥4 (EVO-SNOW-001)
# 设计: 确保cognitive_boundary_assessment包含v3.0的5维业务复杂度分解
# 而非仅输出总分。防止Phase 4 context压力下跳过Step 2详细评估
# ============================================================
if [ "$PHASE" -ge 4 ]; then
    echo ""
    echo "--- Layer 4.1: G9认知边界5维分解 ---"

    CB_FILE=""
    for cf in "reports/${TICKER}/cognitive_boundary_assessment"*.md; do
        if [ -f "$cf" ]; then CB_FILE="$cf"; fi
    done

    if [ -n "$CB_FILE" ]; then
        # 检查是否包含5维分解的关键词
        DIM_COUNT=0
        for kw in "收入引擎" "护城河异质性\|MDI" "变量耦合" "财务透明" "外部依赖"; do
            if grep -qE "$kw" "$CB_FILE" 2>/dev/null; then
                DIM_COUNT=$((DIM_COUNT + 1))
            fi
        done

        if [ "$DIM_COUNT" -ge 4 ]; then
            check_pass "G9 v3.0: 业务复杂度5维分解 ${DIM_COUNT}/5维 in $(basename $CB_FILE)"
        elif [ "$DIM_COUNT" -ge 2 ]; then
            check_warn "G9 v3.0: 仅${DIM_COUNT}/5维 → 缺少业务复杂度分项评估，请补充收入引擎/MDI/耦合度/透明度/依赖性"
        else
            check_fail "G9 v3.0: 业务复杂度5维分解缺失(仅${DIM_COUNT}/5维) → /cognitive-boundary ${TICKER} 需重新执行Step 2"
        fi
    else
        check_warn "G9: 认知边界评估文件未找到 → Phase 4完成后执行 /cognitive-boundary ${TICKER}"
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
# Layer 4.7: 重复话题检测 — Phase≥5 (EVO-SPGI-005)
# 设计: 扫描Complete中高频短语, 防止同一话题≥3处重复
# ============================================================
if [ "$PHASE" -ge 5 ]; then
    COMPLETE_FOR_DEDUP=""
    for cf in reports/${TICKER}/${TICKER}_Complete*.md; do
        if [ -f "$cf" ]; then COMPLETE_FOR_DEDUP="$cf"; fi
    done
    if [ -n "$COMPLETE_FOR_DEDUP" ]; then
        echo ""
        echo "--- Layer 4.7: 重复话题检测 (EVO-SPGI-005) ---"
        # 统计200字符以上段落中的重复关键短语
        DEDUP_ISSUES=0
        DEDUP_DETAILS=""
        # 检查常见重复模式: 同一概念在不同章节反复展开
        for keyword in "商誉" "ROIC" "Nash" "被动投资" "定价权" "护城河" "回购" "SBC" "AI冲击" "周期性"; do
            KCOUNT=$({ grep -ci "$keyword" "$COMPLETE_FOR_DEDUP" 2>/dev/null || echo "0"; } | head -1 | tr -d ' ')
            KCOUNT="${KCOUNT:-0}"
            # 章节级重复: 同一词在≥15行出现 → 可能是跨章节重复展开
            if [ "$KCOUNT" -ge 15 ]; then
                DEDUP_ISSUES=$((DEDUP_ISSUES + 1))
                DEDUP_DETAILS="${DEDUP_DETAILS} ${keyword}(${KCOUNT})"
            fi
        done
        if [ "$DEDUP_ISSUES" -eq 0 ]; then
            check_pass "EVO-005: 无高频重复话题"
        elif [ "$DEDUP_ISSUES" -le 2 ]; then
            check_warn "EVO-005: ${DEDUP_ISSUES}个话题高频出现:${DEDUP_DETAILS} → 建议检查是否跨章节重复展开"
        else
            check_warn "EVO-005: ${DEDUP_ISSUES}个话题高频出现:${DEDUP_DETAILS} → 建议合并重复段落(目标重复度<5%)"
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
