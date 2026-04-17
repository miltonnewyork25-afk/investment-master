#!/bin/bash
# ============================================================
# research_rollback.sh — 研究回滚与去重检测 v1.0
# ============================================================
# 借鉴: MiroFlow IterativeAgentWithToolAndRollback
#   - 对话级回滚 (pop bad turn, retry with same context)
#   - 重复查询去重 (hash tool calls, detect loops)
#   - 失败分类 (truncation / malformed / refusal / loop)
#
# 用法:
#   bash scripts/research_rollback.sh <TICKER> <PHASE> [--check-only]
#
# 功能:
#   1. 检测当前 Phase 是否存在回滚信号 (偏轨/重复/死循环)
#   2. 生成回滚建议 (回到哪个 checkpoint, 用什么策略重试)
#   3. 记录失败类型到 rollback_log.yaml
#
# 退出码: 0=无需回滚, 1=建议回滚, 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

TICKER="${1:?用法: $0 <TICKER> <PHASE> [--check-only]}"
PHASE="${2:?缺少PHASE参数}"
CHECK_ONLY="false"
for arg in "$@"; do [[ "$arg" == "--check-only" ]] && CHECK_ONLY="true"; done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STAGING_DIR="reports/${TICKER}/staging"
DATA_DIR="reports/${TICKER}/data"
ROLLBACK_LOG="${DATA_DIR}/rollback_log.yaml"

echo -e "${CYAN}========================================"
echo " Research Rollback Detector v1.0"
echo " Ticker: ${TICKER} | Phase: ${PHASE}"
echo -e "========================================${NC}"
echo ""

SIGNALS=0
SIGNAL_DETAILS=()

# ============================================================
# Signal 1: 重复搜索检测 (MiroFlow duplicate query dedup)
# ============================================================
echo -e "${CYAN}[S1] 重复搜索检测...${NC}"

# 扫描 staging 文件中的重复数据源引用
DUPLICATE_SOURCES=0
if [ -d "$STAGING_DIR" ]; then
    # 检测同一个数据点在多个 staging 文件中重复出现
    for keyword in "DM-BIZ" "DM-FIN" "DM-COMP" "DM-VAL"; do
        # 收集每个 DM 锚点出现的文件
        DM_FILES=$({ grep -rl "$keyword" "${STAGING_DIR}"/*.md 2>/dev/null || true; } | sort -u | wc -l)
        DM_FILES="${DM_FILES// /}"
        DM_TOTAL=$({ grep -r "$keyword" "${STAGING_DIR}"/*.md 2>/dev/null || true; } | wc -l)
        DM_TOTAL="${DM_TOTAL// /}"
        if [ "$DM_TOTAL" -gt 0 ] && [ "$DM_FILES" -gt 0 ]; then
            RATIO=$((DM_TOTAL / DM_FILES))
            if [ "$RATIO" -gt 5 ]; then
                echo -e "  ${YELLOW}! ${keyword} 出现 ${DM_TOTAL} 次 / ${DM_FILES} 文件 (重复密度 ${RATIO})${NC}"
                DUPLICATE_SOURCES=$((DUPLICATE_SOURCES + 1))
            fi
        fi
    done
fi

if [ "$DUPLICATE_SOURCES" -gt 0 ]; then
    echo -e "  ${YELLOW}发现 ${DUPLICATE_SOURCES} 类重复数据源 — 可能在反复搜索同一件事${NC}"
    SIGNALS=$((SIGNALS + 1))
    SIGNAL_DETAILS+=("duplicate_sources: ${DUPLICATE_SOURCES} 类数据源重复密度过高")
else
    echo -e "  ${GREEN}✓ 未检测到异常重复${NC}"
fi
echo ""

# ============================================================
# Signal 2: 论点循环检测 (同一结论反复出现)
# ============================================================
echo -e "${CYAN}[S2] 论点循环检测...${NC}"

CIRCULAR_ARGS=0
if [ -d "$STAGING_DIR" ]; then
    # 检测相同的结论句式在不同章节重复
    for sf in "${STAGING_DIR}"/*.md; do
        [ -f "$sf" ] || continue
        # 提取 ## 标题下的第一句话作为论点指纹
        FINGERPRINTS=$({ grep -A1 '^## ' "$sf" 2>/dev/null | grep -v '^##' | grep -v '^--$' | sed 's/^[[:space:]]*//' | sort || true; })
        UNIQUE_FP=$(echo "$FINGERPRINTS" | sort -u | wc -l)
        TOTAL_FP=$(echo "$FINGERPRINTS" | wc -l)
        UNIQUE_FP="${UNIQUE_FP// /}"
        TOTAL_FP="${TOTAL_FP// /}"
        if [ "$TOTAL_FP" -gt 5 ] && [ "$UNIQUE_FP" -gt 0 ]; then
            DUP_RATIO=$((TOTAL_FP * 100 / UNIQUE_FP))
            if [ "$DUP_RATIO" -gt 200 ]; then
                bn=$(basename "$sf")
                echo -e "  ${YELLOW}! ${bn}: ${TOTAL_FP} 论点中仅 ${UNIQUE_FP} 个唯一 (循环度 ${DUP_RATIO}%)${NC}"
                CIRCULAR_ARGS=$((CIRCULAR_ARGS + 1))
            fi
        fi
    done
fi

if [ "$CIRCULAR_ARGS" -gt 0 ]; then
    SIGNALS=$((SIGNALS + 1))
    SIGNAL_DETAILS+=("circular_arguments: ${CIRCULAR_ARGS} 个文件存在论点循环")
else
    echo -e "  ${GREEN}✓ 未检测到论点循环${NC}"
fi
echo ""

# ============================================================
# Signal 3: 分析偏轨检测 (与核心矛盾脱节)
# ============================================================
echo -e "${CYAN}[S3] 分析偏轨检测 (核心矛盾覆盖)...${NC}"

THESIS_FILE="${STAGING_DIR}/${TICKER}_thesis_crystallization.md"
OFF_TRACK=0

if [ -f "$THESIS_FILE" ]; then
    # 提取核心矛盾关键词 (CQ)
    CQ_KEYWORDS=$({ grep -oE 'CQ[0-9]+' "$THESIS_FILE" 2>/dev/null || true; } | sort -u)
    CQ_COUNT=$(echo "$CQ_KEYWORDS" | grep -c 'CQ' 2>/dev/null || echo 0)
    CQ_COUNT="${CQ_COUNT// /}"

    if [ "$CQ_COUNT" -gt 0 ]; then
        # 检查最新的 staging 文件是否引用了 CQ
        LATEST_STAGING=$(ls -t "${STAGING_DIR}"/*.md 2>/dev/null | head -3)
        CQ_REFERENCED=0
        for lf in $LATEST_STAGING; do
            [ -f "$lf" ] || continue
            refs=$({ grep -c 'CQ[0-9]' "$lf" 2>/dev/null || echo 0; })
            refs="${refs// /}"
            CQ_REFERENCED=$((CQ_REFERENCED + refs))
        done

        if [ "$CQ_REFERENCED" -eq 0 ]; then
            echo -e "  ${YELLOW}! 最近 3 个 staging 文件未引用任何 CQ — 可能偏离核心矛盾${NC}"
            OFF_TRACK=1
            SIGNALS=$((SIGNALS + 1))
            SIGNAL_DETAILS+=("off_track: 最近 staging 未引用 CQ, 可能偏离核心矛盾")
        else
            echo -e "  ${GREEN}✓ CQ 引用正常 (${CQ_REFERENCED} 次)${NC}"
        fi
    else
        echo -e "  ${YELLOW}thesis_crystallization.md 中未找到 CQ 标记${NC}"
    fi
else
    echo -e "  ${YELLOW}thesis_crystallization.md 不存在 (Phase 0.75 未完成?)${NC}"
fi
echo ""

# ============================================================
# Signal 4: Phase 耗时/产出异常 (借鉴 MiroFlow max_turns 概念)
# ============================================================
echo -e "${CYAN}[S4] Phase 产出效率检测...${NC}"

CHECKPOINT="${DATA_DIR}/checkpoint.yaml"
if [ -f "$CHECKPOINT" ]; then
    LATEST_CHARS=$({ grep 'latest_phase_chars:' "$CHECKPOINT" 2>/dev/null | grep -oE '[0-9]+' || echo 0; } | head -1)
    LATEST_CHARS="${LATEST_CHARS// /}"

    # Phase 1-3: 每 Phase 至少 30K 字符才算有效产出
    if [ "$LATEST_CHARS" -gt 0 ] && [ "$LATEST_CHARS" -lt 15000 ]; then
        echo -e "  ${YELLOW}! 上一 Phase 仅 ${LATEST_CHARS} 字符 — 产出偏低${NC}"
        SIGNALS=$((SIGNALS + 1))
        SIGNAL_DETAILS+=("low_output: Phase 产出仅 ${LATEST_CHARS} 字符 (<15K)")
    else
        echo -e "  ${GREEN}✓ Phase 产出正常 (${LATEST_CHARS} 字符)${NC}"
    fi
else
    echo -e "  ${YELLOW}checkpoint.yaml 不存在${NC}"
fi
echo ""

# ============================================================
# 总结 + 回滚建议
# ============================================================
echo -e "${CYAN}========================================"

if [ "$SIGNALS" -eq 0 ]; then
    echo -e "${GREEN} ALL CLEAR: 无回滚信号"
    echo -e " 继续当前方向${NC}"
    echo -e "========================================${NC}"
    exit 0
fi

echo -e "${YELLOW} 检测到 ${SIGNALS} 个回滚信号:${NC}"
for sd in "${SIGNAL_DETAILS[@]}"; do
    echo -e "  - $sd"
done
echo ""

# 生成回滚建议
echo -e "${CYAN}回滚建议:${NC}"
echo ""

for sd in "${SIGNAL_DETAILS[@]}"; do
    case "$sd" in
        duplicate_sources*)
            echo "  → 重复搜索: 停止当前搜索方向, 换数据源或换查询角度"
            echo "    策略: 改 query / 改 source mix / 改时间窗口"
            ;;
        circular_arguments*)
            echo "  → 论点循环: 回到 thesis_crystallization, 重新聚焦核心矛盾"
            echo "    策略: 重读 CQ, 删除不服务主线的 staging 内容"
            ;;
        off_track*)
            echo "  → 分析偏轨: 当前分析与核心矛盾脱节"
            echo "    策略: 暂停, 重读 thesis_crystallization + handoff note"
            ;;
        low_output*)
            echo "  → 产出偏低: 可能遇到瓶颈或分析方向错误"
            echo "    策略: 检查是否被工具故障/数据缺失阻塞"
            ;;
    esac
done

echo ""

# 写入 rollback log (如非 check-only)
if [ "$CHECK_ONLY" == "false" ]; then
    mkdir -p "$DATA_DIR"
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")
    cat >> "$ROLLBACK_LOG" << YAML

- timestamp: "${TIMESTAMP}"
  phase: ${PHASE}
  signals: ${SIGNALS}
  details:
$(for sd in "${SIGNAL_DETAILS[@]}"; do echo "    - \"$sd\""; done)
YAML
    echo -e "${GREEN}  已记录到 ${ROLLBACK_LOG}${NC}"
fi

echo -e "========================================${NC}"
exit 1
