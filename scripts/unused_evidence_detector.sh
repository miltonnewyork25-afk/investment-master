#!/bin/bash
# ============================================================
# unused_evidence_detector.sh — 未引用证据检测 v1.0
# ============================================================
# 借鉴: Co-STORM Moderator._get_conv_turn_unused_information()
# 核心洞察: 信息"被检索到" ≠ "被使用"。找出 staging 里有
#           但最终报告没引用的 DM 锚点, 它们是盲点。
#
# Co-STORM 原算法 (使用 embedding):
#   score = (1 - query_sim)**0.5 × (1 - cited_sim)**0.5 × claim_sim
# 我们的翻译 (纯 lexical, 无 embedding):
#   - 存在性: DM 在 staging 但不在 final report
#   - 相关性: DM 所在段落与 thesis_crystallization 关键词重合度
#   - 权重: DM 所在 staging 文件 status (active=1.0, archived=0.5)
#
# 用法:
#   bash scripts/unused_evidence_detector.sh <TICKER> [--limit 10] [--phase N]
#
# 触发时机:
#   - Phase 4 完成后, Phase 5 组装之前 (推荐)
#   - Phase 5 完成后复盘 (可选)
#   - 手动调用
#
# 退出码: 0=有未引用证据输出, 1=全部被引用, 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

TICKER="${1:?用法: $0 <TICKER> [--limit N] [--phase N]}"
shift

LIMIT=10
PHASE="unknown"
while [ $# -gt 0 ]; do
    case "$1" in
        --limit) LIMIT="${2:-10}"; shift 2 ;;
        --phase) PHASE="${2:-unknown}"; shift 2 ;;
        *) echo "未知选项: $1" >&2; exit 2 ;;
    esac
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TICKER_DIR="${REPO_ROOT}/reports/${TICKER}"
STAGING_DIR="${TICKER_DIR}/staging"
DATA_DIR="${TICKER_DIR}/data"
OUTPUT="${DATA_DIR}/unused_evidence_report.md"

[ -d "$STAGING_DIR" ] || { echo -e "${YELLOW}${TICKER} 无 staging 目录${NC}"; exit 1; }

echo -e "${CYAN}========================================"
echo " Unused Evidence Detector v1.0"
echo " Ticker: ${TICKER} | Phase: ${PHASE}"
echo -e "========================================${NC}"
echo ""

# ============================================================
# Step 1: 提取 staging 中的所有 DM 锚点 (含 location)
# ============================================================
echo -e "${CYAN}[1/4] 扫描 staging DM 锚点...${NC}"

STAGING_DMS_FILE=$(mktemp)
STAGING_COUNT=0

# 格式: DM-ID|file|line_number|weight|context_snippet
for sf in "${STAGING_DIR}"/*.md; do
    [ -f "$sf" ] || continue

    # 跳过 registry/定义类文件 (DM 定义不算引用)
    bn_lower=$(basename "$sf" | tr '[:upper:]' '[:lower:]')
    case "$bn_lower" in
        *registry*|*anchor_registry*|*dm_registry*|*_anchors.md)
            continue ;;
    esac

    # 检查 status (LLM Wiki v2 过滤)
    status_line=$({ head -20 "$sf" 2>/dev/null | grep -E '^status:' | head -1 || true; })
    status_val="active"
    [ -n "$status_line" ] && status_val=$(echo "$status_line" | sed 's/^status:[[:space:]]*//')

    # 跳过 superseded/invalidated
    if [ "$status_val" == "superseded" ] || [ "$status_val" == "invalidated" ]; then
        continue
    fi

    # 权重
    weight=1.0
    [ "$status_val" == "archived" ] && weight=0.5

    # 提取 DM 锚点 (带行号, 跳过 YAML 定义行)
    while IFS=: read -r line_num line_content; do
        [ -z "$line_num" ] && continue
        # 跳过 YAML 定义格式 "- id: DM-XXX" (这是定义不是引用)
        if echo "$line_content" | grep -qE '^[[:space:]]*-[[:space:]]*id:[[:space:]]*DM-'; then
            continue
        fi
        for dm_id in $(echo "$line_content" | grep -oE 'DM-[A-Z]+-[0-9]+' | LC_ALL=C sort -u); do
            snippet=$(echo "$line_content" | head -c 200 | LC_ALL=C tr -d '\n|')
            echo "${dm_id}|${sf}|${line_num}|${weight}|${snippet}" >> "$STAGING_DMS_FILE"
            STAGING_COUNT=$((STAGING_COUNT + 1))
        done
    done < <(grep -nE 'DM-[A-Z]+-[0-9]+' "$sf" 2>/dev/null || true)
done

UNIQUE_STAGING_DMS=$(LC_ALL=C cut -d'|' -f1 "$STAGING_DMS_FILE" | LC_ALL=C sort -u | wc -l | tr -d ' ')
echo "  staging: ${STAGING_COUNT} 次引用, ${UNIQUE_STAGING_DMS} 个唯一 DM 锚点"
echo ""

if [ "$UNIQUE_STAGING_DMS" -eq 0 ]; then
    echo -e "${YELLOW}staging 中无 DM 锚点, 跳过${NC}"
    rm -f "$STAGING_DMS_FILE"
    exit 1
fi

# ============================================================
# Step 2: 提取最终报告中的 DM 引用
# ============================================================
echo -e "${CYAN}[2/4] 扫描最终报告 DM 引用...${NC}"

FINAL_DMS_FILE=$(mktemp)
FINAL_REPORTS=()

for rf in "${TICKER_DIR}"/*.md; do
    [ -f "$rf" ] || continue
    FINAL_REPORTS+=("$rf")
    grep -oE 'DM-[A-Z]+-[0-9]+' "$rf" 2>/dev/null | sort -u >> "$FINAL_DMS_FILE" || true
done

UNIQUE_FINAL_DMS=$({ cat "$FINAL_DMS_FILE" 2>/dev/null | sort -u | wc -l || echo 0; } | tr -d ' ')

if [ ${#FINAL_REPORTS[@]} -eq 0 ]; then
    echo -e "${YELLOW}  无最终报告 (Phase 5 未完成), 跳过 detector${NC}"
    rm -f "$STAGING_DMS_FILE" "$FINAL_DMS_FILE"
    exit 1
fi

echo "  最终报告: ${#FINAL_REPORTS[@]} 个文件, ${UNIQUE_FINAL_DMS} 个唯一 DM 引用"
echo ""

# ============================================================
# Step 3: 计算未引用 DM (staging - final)
# ============================================================
echo -e "${CYAN}[3/4] 计算未引用证据...${NC}"

UNUSED_DMS_FILE=$(mktemp)

for dm_id in $(LC_ALL=C cut -d'|' -f1 "$STAGING_DMS_FILE" | LC_ALL=C sort -u); do
    if ! grep -qx "$dm_id" "$FINAL_DMS_FILE" 2>/dev/null; then
        grep "^${dm_id}|" "$STAGING_DMS_FILE" | head -1 >> "$UNUSED_DMS_FILE"
    fi
done

UNUSED_COUNT=$(wc -l < "$UNUSED_DMS_FILE" 2>/dev/null | tr -d ' ')
USED_COUNT=$((UNIQUE_STAGING_DMS - UNUSED_COUNT))
USAGE_PCT=$(python3 -c "print(round($USED_COUNT * 100 / max($UNIQUE_STAGING_DMS, 1), 1))" 2>/dev/null || echo 0)

echo "  使用率: ${USED_COUNT}/${UNIQUE_STAGING_DMS} = ${USAGE_PCT}%"
echo "  未引用: ${UNUSED_COUNT} 个 DM"
echo ""

if [ "$UNUSED_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ 所有 staging DM 都在最终报告中被引用${NC}"
    rm -f "$STAGING_DMS_FILE" "$FINAL_DMS_FILE" "$UNUSED_DMS_FILE"
    exit 1
fi

# ============================================================
# Step 4: 按相关性排序 (与 thesis 关键词重合)
# ============================================================
echo -e "${CYAN}[4/4] 按相关性排序 (与核心矛盾 keyword 重合)...${NC}"

THESIS_KEYWORDS=$(mktemp)
THESIS_FOUND=""
for tf in \
    "${STAGING_DIR}/${TICKER}_thesis_crystallization.md" \
    "${STAGING_DIR}/thesis_crystallization.md" \
    "${STAGING_DIR}/P0.75_thesis_crystallization.md" \
    "${STAGING_DIR}/thesis_crystallization_P0.75.md"; do
    if [ -f "$tf" ]; then
        head -c 3000 "$tf" > "$THESIS_KEYWORDS" 2>/dev/null || true
        THESIS_FOUND="$tf"
        break
    fi
done

# 若无 thesis, 用 executive_summary 作为备选
if [ -z "$THESIS_FOUND" ]; then
    for sf in "${STAGING_DIR}"/S01_* "${STAGING_DIR}"/*executive*; do
        if [ -f "$sf" ]; then
            head -c 3000 "$sf" > "$THESIS_KEYWORDS" 2>/dev/null || true
            THESIS_FOUND="$sf (exec summary fallback)"
            break
        fi
    done
fi

if [ -n "$THESIS_FOUND" ]; then
    echo "  thesis 源: $(basename "$THESIS_FOUND")"
else
    echo -e "  ${YELLOW}无 thesis 源, 评分仅基于文件类型权重${NC}"
fi

# Python 评分+排序
SCORED_OUTPUT=$(python3 << PYEOF
# -*- coding: utf-8 -*-
import re

with open("$UNUSED_DMS_FILE", encoding='utf-8') as f:
    unused_lines = [l.strip() for l in f if l.strip()]

# 从 thesis 提取关键词 (2-6 字中文 + 3+ 字英文)
thesis_text = ""
try:
    with open("$THESIS_KEYWORDS", encoding='utf-8') as f:
        thesis_text = f.read()
except:
    pass

# 提取关键词: 中文 2-6 字连续, 英文 3+ 字
thesis_words = set()
for m in re.findall(r'[\u4e00-\u9fff]{2,6}', thesis_text):
    if len(m) >= 2:
        thesis_words.add(m)
for m in re.findall(r'[A-Za-z]{3,}', thesis_text):
    thesis_words.add(m)

# 过滤掉超高频停用词
stopwords = {'the', 'and', 'for', 'that', 'with', '公司', '市场', '分析', '研究', '可能', '因此', '以及'}
thesis_words -= stopwords

scored = []
for line in unused_lines:
    parts = line.split('|', 4)
    if len(parts) < 5:
        continue
    dm_id, filepath, line_num, weight, snippet = parts
    try:
        weight = float(weight)
    except:
        weight = 1.0

    # 评分: snippet 中 thesis 关键词出现次数
    score = 0
    matched_words = []
    for word in thesis_words:
        if word in snippet:
            score += 1
            matched_words.append(word)

    # 文件类型加权
    filepath_lower = filepath.lower()
    if 'executive' in filepath_lower or 'thesis' in filepath_lower:
        score += 3
    elif 'moat' in filepath_lower or 'valuation' in filepath_lower or 'kill' in filepath_lower:
        score += 2
    elif 's01' in filepath_lower or 's02' in filepath_lower:
        score += 1

    # DM 类型加权 (VAL/MOAT/KILL 类通常更核心)
    if re.search(r'DM-(VAL|MOAT|KILL|THESIS|CQ)-', dm_id):
        score += 2

    final_score = score * weight

    scored.append({
        'id': dm_id,
        'score': final_score,
        'raw_score': score,
        'weight': weight,
        'file': filepath.split('/')[-1],
        'line': line_num,
        'snippet': snippet,
        'matched_words': matched_words[:3],
    })

scored.sort(key=lambda x: x['score'], reverse=True)

limit = $LIMIT
for item in scored[:limit]:
    matched = ','.join(item['matched_words']) if item['matched_words'] else '无thesis词'
    print(f"{item['id']}|{item['score']:.2f}|{item['raw_score']}|{item['weight']}|{item['file']}|{item['line']}|{matched}|{item['snippet']}")
PYEOF
)

# ============================================================
# 输出 (stdout + 文件)
# ============================================================

echo ""
echo -e "${BOLD}未引用证据 Top ${LIMIT} (按与核心矛盾相关性排序):${NC}"
echo ""

COUNT=0
while IFS='|' read -r dm_id score raw weight file line matched snippet; do
    [ -z "$dm_id" ] && continue
    COUNT=$((COUNT + 1))

    # 相关性颜色
    score_int=$(python3 -c "print(int(float('$score')))" 2>/dev/null || echo 0)
    if [ "$score_int" -ge 5 ]; then
        score_color="${RED}"
    elif [ "$score_int" -ge 2 ]; then
        score_color="${YELLOW}"
    else
        score_color="${CYAN}"
    fi

    echo -e "${BOLD}[$COUNT] ${dm_id}${NC} ${score_color}评分=${score}${NC} (raw=${raw} × w=${weight})"
    echo -e "    ${CYAN}位置${NC}: ${file}:${line}"
    echo -e "    ${CYAN}匹配${NC}: ${matched}"
    snippet_short=$(echo "$snippet" | head -c 160)
    echo -e "    ${CYAN}片段${NC}: ${snippet_short}..."
    echo ""
done <<< "$SCORED_OUTPUT"

# 写入报告文件
mkdir -p "$DATA_DIR"
{
    echo "# 未引用证据报告 — ${TICKER}"
    echo "> 自动生成: $(date -u +"%Y-%m-%dT%H:%M:%S+00:00")"
    echo "> Phase: ${PHASE}"
    echo "> 借鉴: Co-STORM Moderator 未引用 snippet 检测"
    echo ""
    echo "## 统计"
    echo "- staging DM 锚点: ${UNIQUE_STAGING_DMS} 个唯一"
    echo "- 最终报告引用: ${UNIQUE_FINAL_DMS} 个唯一"
    echo "- 使用率: ${USAGE_PCT}%"
    echo "- **未引用: ${UNUSED_COUNT} 个** (可能遗漏的证据)"
    echo ""
    echo "## Top ${LIMIT} 高相关性未引用证据"
    echo ""
    echo "Phase 5 组装时应考虑是否需要引入这些证据, 尤其评分 ≥5 的项。"
    echo ""

    COUNT=0
    while IFS='|' read -r dm_id score raw weight file line matched snippet; do
        [ -z "$dm_id" ] && continue
        COUNT=$((COUNT + 1))
        echo "### ${COUNT}. ${dm_id} (评分 ${score})"
        echo ""
        echo "- **位置**: \`${file}:${line}\`"
        echo "- **相关性**: raw=${raw} × weight=${weight} | 匹配词: ${matched}"
        snippet_short=$(echo "$snippet" | head -c 200)
        echo "- **片段**: ${snippet_short}..."
        echo ""
    done <<< "$SCORED_OUTPUT"

    echo "---"
    echo ""
    echo "## 如何使用"
    echo ""
    echo "1. 检查评分 ≥5 的 DM: 这些高度相关但被遗漏, 可能是真实盲点"
    echo "2. 评分 2-5: 中等相关, Phase 5 考虑是否需要"
    echo "3. 评分 <2: 可能与主线关系不大, 或未在 thesis 中体现"
    echo ""
    echo "> 未引用 ≠ 必须补充 — 有些证据就是该被筛掉 (分析深度而非数据罗列)"
    echo "> 但评分 ≥5 的项应该能解释为什么不用"
} > "$OUTPUT"

rm -f "$STAGING_DMS_FILE" "$FINAL_DMS_FILE" "$UNUSED_DMS_FILE" "$THESIS_KEYWORDS"

echo -e "${GREEN}→ 详细报告: ${OUTPUT}${NC}"
exit 0
