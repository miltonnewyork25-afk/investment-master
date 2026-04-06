#!/bin/bash
# ============================================================
# tier3_launch.sh v1.0 — Tier 3 分析单一入口
# ============================================================
# 用法: bash scripts/tier3_launch.sh <TICKER> [INDUSTRY]
#
# 设计原则: 这是"单一指令→完整启动"的入口。
# 当用户说"深度调研XX"时，这是AI执行的第一个脚本。
#
# 执行内容:
# 1. 创建目录结构
# 2. 复杂度估计 — 扫描同行业报告→计算目标字符范围
# 3. Phase -1 知识库检索 → knowledge_context.md
# 4. 进化教训提取 → 最近3份报告的教训
# 5. 生成 launch_brief.md (AI的"作战地图")
# 6. Pre-Flight Gate 预检
#
# 退出码: 0=launch_brief已生成 | 1=参数错误
# ============================================================

set -uo pipefail

TICKER="${1:?用法: $0 <TICKER> [INDUSTRY]}"
INDUSTRY="${2:-auto}"

DATA_DIR="reports/${TICKER}/data"
STAGING_DIR="reports/${TICKER}/staging"
LAUNCH_BRIEF="${DATA_DIR}/launch_brief.md"
KC_FILE="${DATA_DIR}/knowledge_context.md"

# --- 行业映射 ---
map_industry() {
    case "$1" in
        TSM|MU|LRCX|AMAT|AMD|ASML|INTC|KLAC|NVDA) echo "半导体" ;;
        GOOGL|MSFT|META|AMZN|AAPL) echo "科技平台" ;;
        COST|PG|KO|NKE|WMT|MCD|SBUX) echo "消费品" ;;
        SOFI|JPM|GS|V|MA|BAC|BRK) echo "金融" ;;
        TSLA) echo "汽车科技" ;;
        *) echo "其他" ;;
    esac
}

echo "═══════════════════════════════════════════════════"
echo "  Tier 3 Launch v1.0 — 单一入口"
echo "  Ticker: $TICKER | Industry: $INDUSTRY"
echo "  Date: $(date '+%Y-%m-%d %H:%M')"
echo "═══════════════════════════════════════════════════"
echo ""

# ============================================================
# Step 1: 创建目录
# ============================================================
echo "--- [1/6] 创建目录 ---"
mkdir -p "$DATA_DIR" "$STAGING_DIR"
echo "  $DATA_DIR"
echo "  $STAGING_DIR"

# ============================================================
# Step 2: 复杂度估计 — 扫描同行业报告
# ============================================================
echo ""
echo "--- [2/6] 复杂度估计 ---"

# 确定目标行业
if [ "$INDUSTRY" = "auto" ]; then
    TARGET_IND=$(map_industry "$TICKER")
else
    TARGET_IND="$INDUSTRY"
fi
echo "  行业: $TARGET_IND"

# 扫描所有报告
SAME_IND_SIZES=""
SAME_IND_COUNT=0
SAME_IND_SUM=0
ALL_REPORTS_INFO=""

for dir in reports/*/; do
    T=$(basename "$dir")
    [ "$T" = "$TICKER" ] && continue

    # 找最新的Complete报告 (>100K才算有效)
    BEST_FILE=""
    BEST_SIZE=0
    for f in "$dir"${T}_Complete*.md; do
        if [ -f "$f" ]; then
            SZ=$(wc -m < "$f" 2>/dev/null | tr -d ' ')
            if [ "$SZ" -gt "$BEST_SIZE" ] && [ "$SZ" -gt 100000 ]; then
                BEST_FILE="$f"
                BEST_SIZE="$SZ"
            fi
        fi
    done

    [ -z "$BEST_FILE" ] && continue

    T_IND=$(map_industry "$T")
    SIZE_K=$((BEST_SIZE / 1000))
    BYTES=$(wc -c < "$BEST_FILE" 2>/dev/null | tr -d ' ')
    BYTES_K=$((BYTES / 1000))
    ALL_REPORTS_INFO="${ALL_REPORTS_INFO}  - ${T}: ${SIZE_K}K chars / ${BYTES_K}KB (${T_IND})\n"

    # 同行业统计
    if [ "$T_IND" = "$TARGET_IND" ]; then
        SAME_IND_COUNT=$((SAME_IND_COUNT + 1))
        SAME_IND_SUM=$((SAME_IND_SUM + BEST_SIZE))
        SAME_IND_SIZES="${SAME_IND_SIZES}${T}(${SIZE_K}K) "
    fi
done

# 计算目标范围
if [ "$SAME_IND_COUNT" -gt 0 ]; then
    IND_AVG=$((SAME_IND_SUM / SAME_IND_COUNT))
else
    # 无同行业报告时用全局默认
    IND_AVG=300000
fi

# 目标范围: 平均值 ±20%
TARGET_LOW=$((IND_AVG * 80 / 100))
TARGET_HIGH=$((IND_AVG * 125 / 100))

# 硬底线: 不低于200K
if [ "$TARGET_LOW" -lt 200000 ]; then
    TARGET_LOW=200000
fi

TARGET_LOW_K=$((TARGET_LOW / 1000))
TARGET_HIGH_K=$((TARGET_HIGH / 1000))
IND_AVG_K=$((IND_AVG / 1000))

echo "  同行业报告: $SAME_IND_COUNT 份"
echo "  同行业参考: $SAME_IND_SIZES"
echo "  同行业平均: ${IND_AVG_K}K chars"
echo "  ★ 目标范围: ${TARGET_LOW_K}K - ${TARGET_HIGH_K}K chars"

# ============================================================
# Step 3: Phase -1 知识检索
# ============================================================
echo ""
echo "--- [3/6] Phase -1 知识检索 ---"
if [ -f "scripts/find_relevant_knowledge.sh" ]; then
    bash scripts/find_relevant_knowledge.sh "$TICKER" "$TARGET_IND" > "$KC_FILE" 2>/dev/null || true
    KC_CHARS=$(wc -m < "$KC_FILE" 2>/dev/null | tr -d ' ')
    echo "  knowledge_context.md: ${KC_CHARS} chars"
else
    echo "  SKIP: find_relevant_knowledge.sh not found"
    KC_CHARS=0
fi

# ============================================================
# Step 4: 进化教训提取
# ============================================================
echo ""
echo "--- [4/6] 进化教训 ---"
EVOLUTION_LESSONS=""
if [ -f "knowledge/evolution_log.yaml" ]; then
    # 提取最近3条教训
    LESSONS=$({ grep 'top_lesson:' knowledge/evolution_log.yaml | tail -3 | sed 's/.*top_lesson: *"*/  - /' | sed 's/"$//' || true; })
    FAILURES=$({ grep -B1 'failure_flag: true' knowledge/evolution_log.yaml | grep 'ticker:' | sed 's/.*ticker: *"*//' | sed 's/"$//' || true; })

    echo "  最近3条教训:"
    echo "$LESSONS"
    EVOLUTION_LESSONS="$LESSONS"

    if [ -n "$FAILURES" ]; then
        echo "  ⚠ 质量失败记录: $FAILURES"
    fi
else
    echo "  evolution_log.yaml not found"
fi

# ============================================================
# Step 4.5: Poka-yoke — 自动创建checkpoint.yaml (消除AI遗忘)
# ============================================================
echo ""
echo "--- [4.5/8] Poka-yoke: 自动创建checkpoint ---"
CHECKPOINT="${DATA_DIR}/checkpoint.yaml"
if [ ! -f "$CHECKPOINT" ]; then
    cat > "$CHECKPOINT" << CKPT
schema_version: "2.0"
ticker: ${TICKER}
company: "${TICKER}"
framework_version: v17.0
worktree: "${TARGET_IND}"
industry: "${TARGET_IND}"
last_updated: "$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")"

current_phase: -1
phase_status: pre_launch
phases_completed: []

target_chars: ${IND_AVG}
target_range: "${TARGET_LOW_K}K-${TARGET_HIGH_K}K"
hard_floor: 200000

quick_ref:
  total_chars: 0
  latest_phase_chars: 0
CKPT
    echo "  checkpoint.yaml 已自动创建 (target_chars: ${IND_AVG})"
else
    echo "  checkpoint.yaml 已存在, 保留现有"
fi

# ============================================================
# Step 4.7: 抗体加载 (Adaptive Immunity)
# ============================================================
echo ""
echo "--- [4.7/8] 失败抗体检查 ---"
ANTIBODIES_FILE="knowledge/failure_antibodies.yaml"
AB_COUNT=0
AB_RELEVANT=""
if [ -f "$ANTIBODIES_FILE" ]; then
    AB_COUNT=$({ grep -c '^  - id:' "$ANTIBODIES_FILE" || echo "0"; })
    # 提取所有教训作为提醒
    AB_RELEVANT=$({ grep 'lesson:' "$ANTIBODIES_FILE" | head -5 | sed 's/.*lesson: *"*/  - /' | sed 's/"$//' || true; })
    echo "  已加载 $AB_COUNT 个失败抗体"
else
    echo "  failure_antibodies.yaml not found"
fi

# ============================================================
# Step 5: 生成 Launch Brief (含Pre-mortem + 抗体)
# ============================================================
echo ""
echo "--- [5/8] 生成 Launch Brief ---"

cat > "$LAUNCH_BRIEF" << BRIEF
# Launch Brief: $TICKER
> 自动生成 by tier3_launch.sh v1.0 | $(date '+%Y-%m-%d %H:%M')
> **AI必须在Phase 0开始前完整阅读本文件**

## 复杂度评估
- **行业**: $TARGET_IND
- **同行业报告数**: $SAME_IND_COUNT 份
- **同行业参考**: $SAME_IND_SIZES
- **同行业平均**: ${IND_AVG_K}K chars
- **★ 目标字符范围**: ${TARGET_LOW_K}K - ${TARGET_HIGH_K}K chars
- **硬底线**: 200K chars (低于此为质量失败)

## 参考报告 (按行业)
$(echo -e "$ALL_REPORTS_INFO")

## 进化教训 (最近3份报告)
$EVOLUTION_LESSONS

## Phase -1 知识检索
- knowledge_context.md: ${KC_CHARS} chars
- 状态: $([ "$KC_CHARS" -ge 500 ] && echo "✓ 完成" || echo "✗ 需补充")

## 已知失败抗体 (Adaptive Immunity)
> 以下教训来自历史报告的失败模式。AI必须在分析过程中主动避免。
$AB_RELEVANT

## Pre-mortem: 本报告最可能的失败模式
> 假设6个月后回顾,本报告质量很差。最可能的原因是什么?
1. 准备不足 — 跳过文献侦察,对行业认知浅薄 (AAPL教训)
2. 产出过薄 — 目标${TARGET_LOW_K}K-${TARGET_HIGH_K}K,实际远低于目标
3. 数据单源 — 关键财务数字只用FMP,未交叉验证 (RBLX教训)
4. 方法不独立 — 多方法估值结果<3%差异=共享假设 (AMAT教训)
5. 红队走过场 — 所有CQ同方向调整=系统性偏差 (AMAT教训)

## AI待完成清单 (Phase 0之前)
1. $([ "$KC_CHARS" -ge 500 ] && echo "[x]" || echo "[ ]") Phase -1 知识检索 (≥500 chars)
2. [ ] Phase -0.5 文献侦察 — 5路WebSearch → data/lit_recon_memo.md (≥1000 chars)
3. [ ] 运行 preflight_gate.sh 验证 → 必须CLEARED
4. [x] checkpoint.yaml 已自动创建 (target_chars: ${IND_AVG})

## 纵深防御提醒
- **Layer 0**: tier3_launch.sh [已完成] — 复杂度估计+知识检索+checkpoint
- **Layer 1**: preflight_gate.sh [待执行] — Phase 0前硬阻断
- **Layer 2**: phase_sentinel.sh [自动] — 每Phase后重验全部前序(嵌入phase_complete)
- **Layer 3**: quality_gate_complete.sh [最终] — 组装前门控
- **设计**: 即使任何单层被跳过,后续层仍会检测到缺失产出
BRIEF

echo "  launch_brief.md 已生成 ($(wc -m < "$LAUNCH_BRIEF" | tr -d ' ') chars)"

# ============================================================
# Step 6: Pre-Flight Gate 预检
# ============================================================
echo ""
echo "--- [6/8] Pre-Flight Gate 预检 ---"
if [ -f "scripts/preflight_gate.sh" ]; then
    GATE_RESULT=$(bash scripts/preflight_gate.sh "$TICKER" "$TARGET_IND" 2>&1) || true
    # 只显示结果行
    echo "$GATE_RESULT" | grep -E '(PASS|FAIL|WARN|BLOCKED|CLEARED)' || true
fi

# ============================================================
# 汇总
# ============================================================
echo ""
echo "═══════════════════════════════════════════════════"
echo "  Launch Brief: $LAUNCH_BRIEF"
echo "  目标: ${TARGET_LOW_K}K - ${TARGET_HIGH_K}K chars"
echo ""
echo "  AI下一步:"
echo "  1. 执行Phase -0.5文献侦察 (5路WebSearch)"
echo "  2. bash scripts/preflight_gate.sh $TICKER $TARGET_IND"
echo "  3. 通过后启动Phase 0"
echo "═══════════════════════════════════════════════════"
