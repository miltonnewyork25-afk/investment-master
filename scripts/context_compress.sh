#!/bin/bash
# ============================================================
# context_compress.sh — 主动上下文压缩脚本 v1.0
# ============================================================
# 借鉴: Hermes Agent context_compressor.py 五步压缩算法
# 核心: 不等 Claude Code 83.5% 自动压缩，在 Phase 中期主动裁剪
#
# 用法:
#   bash scripts/context_compress.sh <TICKER> [--dry-run]
#
# 功能:
#   Step 1: 工具结果裁剪 — 扫描 staging/ 中的工具输出，生成一行摘要
#   Step 2: 生成工具执行摘要 — 汇总本 Phase 所有关键操作
#   Step 3: Staging 引用替代 — 输出 staging 文件路径清单(替代全文引用)
#   Step 4: 输出压缩建议 — 告诉 AI 哪些可以安全 /compact
#
# 退出码: 0=有压缩产出, 1=无需压缩, 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

TICKER="${1:?用法: $0 <TICKER> [--dry-run]}"
DRY_RUN="false"
for arg in "$@"; do
    [[ "$arg" == "--dry-run" ]] && DRY_RUN="true"
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
STAGING_DIR="reports/${TICKER}/staging"
DATA_DIR="reports/${TICKER}/data"
COMPRESS_OUT="${DATA_DIR}/tool_execution_summary.md"

echo -e "${CYAN}========================================"
echo " Context Compress v1.0 (Hermes-inspired)"
echo " Ticker: ${TICKER}"
echo -e "========================================${NC}"
echo ""

# --- 前置检查 ---
if [ ! -d "$STAGING_DIR" ]; then
    echo -e "${YELLOW}staging/ 目录不存在，无需压缩${NC}"
    exit 1
fi

# ============================================================
# Step 1: 扫描 staging 文件，统计体量
# ============================================================
echo -e "${CYAN}[Step 1/4] 扫描 staging 文件体量...${NC}"

TOTAL_STAGING_CHARS=0
STAGING_FILE_COUNT=0
LARGE_FILES=()

STAGING_ALL=()
for f in "${STAGING_DIR}"/*.md; do [ -f "$f" ] && STAGING_ALL+=("$f"); done
for f in "${STAGING_DIR}"/*.yaml; do [ -f "$f" ] && STAGING_ALL+=("$f"); done

for f in "${STAGING_ALL[@]}"; do
    STAGING_FILE_COUNT=$((STAGING_FILE_COUNT + 1))
    chars=$(wc -m < "$f" 2>/dev/null || echo 0)
    chars="${chars// /}"
    TOTAL_STAGING_CHARS=$((TOTAL_STAGING_CHARS + chars))
    # 标记 >10K 的大文件
    if [ "$chars" -gt 10000 ]; then
        basename_f=$(basename "$f")
        LARGE_FILES+=("${basename_f}(${chars}字符)")
    fi
done

echo "  staging 文件: ${STAGING_FILE_COUNT} 个, 总计 ${TOTAL_STAGING_CHARS} 字符"
if [ ${#LARGE_FILES[@]} -gt 0 ]; then
    echo -e "  ${YELLOW}大文件 (>10K):${NC}"
    for lf in "${LARGE_FILES[@]}"; do
        echo "    - $lf"
    done
fi
echo ""

# ============================================================
# Step 2: 生成工具执行摘要 (Hermes tool output pruning 思想)
# ============================================================
echo -e "${CYAN}[Step 2/4] 生成工具执行摘要...${NC}"

# 从 git log 提取本 ticker 最近的操作记录
RECENT_COMMITS=$(git log --oneline --since="7 days ago" --grep="${TICKER}" 2>/dev/null | head -20 || true)

# 从 checkpoint 读取当前 Phase
CURRENT_PHASE="unknown"
CHECKPOINT="${DATA_DIR}/checkpoint.yaml"
if [ -f "$CHECKPOINT" ]; then
    CURRENT_PHASE=$(grep '^current_phase:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^current_phase: *//')
fi

# 扫描 staging 中的 handoff notes，提取已完成的动作
COMPLETED_ACTIONS=()
for hf in "${STAGING_DIR}"/handoff_P*.md; do
    [ -f "$hf" ] || continue
    phase_label=$(basename "$hf" | grep -oE 'P[0-9]+\.?[0-9]*' | head -1)
    COMPLETED_ACTIONS+=("${phase_label}: $(basename "$hf")")
done

# 扫描 data/ 中的关键产出
DATA_OUTPUTS=()
DATA_ALL=()
for df in "${DATA_DIR}"/*.md; do [ -f "$df" ] && DATA_ALL+=("$df"); done
for df in "${DATA_DIR}"/*.yaml; do [ -f "$df" ] && DATA_ALL+=("$df"); done

for df in "${DATA_ALL[@]}"; do
    bn=$(basename "$df")
    chars=$(wc -m < "$df" 2>/dev/null || echo 0)
    chars="${chars// /}"
    DATA_OUTPUTS+=("[data] ${bn} — ${chars}字符")
done

# 扫描 staging 中的分析产出 (非 handoff)
ANALYSIS_OUTPUTS=()
for sf in "${STAGING_DIR}"/*.md; do
    [ -f "$sf" ] || continue
    bn=$(basename "$sf")
    # 跳过 handoff notes
    echo "$bn" | grep -q "handoff" && continue
    chars=$(wc -m < "$sf" 2>/dev/null || echo 0)
    chars="${chars// /}"
    # 提取第一个 ## 标题作为摘要
    first_heading=$({ grep -m1 '^## ' "$sf" 2>/dev/null || echo ""; } | sed 's/^## //')
    if [ -n "$first_heading" ]; then
        ANALYSIS_OUTPUTS+=("[staging] ${bn} — ${chars}字符 — ${first_heading}")
    else
        ANALYSIS_OUTPUTS+=("[staging] ${bn} — ${chars}字符")
    fi
done

# 生成摘要文件
if [ "$DRY_RUN" == "false" ]; then
    mkdir -p "$DATA_DIR"
    cat > "$COMPRESS_OUT" << SUMMARY
# 工具执行摘要 — ${TICKER} (自动生成)
> 生成时间: $(date -u +"%Y-%m-%dT%H:%M:%S+00:00")
> 当前 Phase: ${CURRENT_PHASE}
> 用途: 压缩后恢复"做过什么"的一行摘要，替代完整工具结果

## Staging 产出 (${STAGING_FILE_COUNT} 文件, ${TOTAL_STAGING_CHARS} 字符)
$(for ao in "${ANALYSIS_OUTPUTS[@]}"; do echo "- $ao"; done)

## Data 产出
$(for dout in "${DATA_OUTPUTS[@]}"; do echo "- $dout"; done)

## Handoff Notes
$(for ca in "${COMPLETED_ACTIONS[@]}"; do echo "- $ca"; done)

## 最近 Git 操作
$(echo "$RECENT_COMMITS" | head -10 | while IFS= read -r line; do [ -n "$line" ] && echo "- $line"; done)
SUMMARY
    echo -e "  ${GREEN}已生成: ${COMPRESS_OUT}${NC}"
else
    echo -e "  ${YELLOW}[dry-run] 将生成: ${COMPRESS_OUT}${NC}"
fi
echo ""

# ============================================================
# Step 3: Staging 引用清单 (供 /compact 时参考)
# ============================================================
echo -e "${CYAN}[Step 3/4] Staging 文件引用清单 (压缩后用路径替代全文)...${NC}"
echo ""
echo "  压缩后如需恢复，Read 以下文件:"
for sf in "${STAGING_DIR}"/*.md; do
    [ -f "$sf" ] || continue
    bn=$(basename "$sf")
    chars=$(wc -m < "$sf" 2>/dev/null || echo 0)
    chars="${chars// /}"
    echo "    Read ${sf}  (${chars}字符)"
done
if [ -f "$CHECKPOINT" ]; then
    echo "    Read ${CHECKPOINT}  (checkpoint)"
fi
echo ""

# ============================================================
# Step 4: 压缩建议
# ============================================================
echo -e "${CYAN}[Step 4/4] 压缩建议...${NC}"
echo ""

# 计算压缩紧迫度
if [ "$TOTAL_STAGING_CHARS" -gt 200000 ]; then
    echo -e "  ${RED}⚠ staging 超 200K — 强烈建议 /compact + 分会话${NC}"
    URGENCY="HIGH"
elif [ "$TOTAL_STAGING_CHARS" -gt 100000 ]; then
    echo -e "  ${YELLOW}⚠ staging 超 100K — 建议 Phase 完成后 /compact${NC}"
    URGENCY="MEDIUM"
else
    echo -e "  ${GREEN}staging < 100K — 暂无压缩压力${NC}"
    URGENCY="LOW"
fi

echo ""
echo -e "${CYAN}建议的 /compact 指令:${NC}"
echo ""
cat << 'COMPACT_HINT'
/compact 重点保留:
①当前研究的核心矛盾和主线thesis
②每Phase的关键结论和未解决问题
③被否决的方案及原因
④Kill Switch条件
⑤下一步行动计划
代码片段和估值数字完整保留。
工具结果可安全丢弃(已持久化到 tool_execution_summary.md)。
COMPACT_HINT

echo ""
echo -e "${GREEN}========================================"
echo " Context Compress 完成"
echo " Urgency: ${URGENCY}"
echo " Tool summary: ${COMPRESS_OUT}"
echo -e "========================================${NC}"

exit 0
