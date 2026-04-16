#!/bin/bash
# ============================================================
# phase_context_inject.sh — 自动 learnings 注入 v1.0
# ============================================================
# 借鉴: gstack 的 gen-skill-docs.ts preamble 机制
# 核心: Phase 启动/切换时, 自动 retrieve 最相关的 3 条 pattern/memory
#
# gstack 做法: 每次 skill 调用前 gstack-learnings-search --limit 3 自动注入
# 我们做法: Phase 边界 (tier3_launch / phase_complete) 自动生成
#           → reports/{TICKER}/data/phase_context_preamble.md
#           → 下个 Phase 启动时 AI 自动读取
#
# 用法:
#   bash scripts/phase_context_inject.sh <TICKER> [--industry X] [--phase N] [--limit 3]
#
# 相关性评分 (无 embedding, 纯 lexical + structured):
#   +3  ticker 在 instances 中直接出现
#   +2  industry 在行业模块名中匹配
#   +1  principle/trigger 关键词在 thesis 中出现
#   ×   confidence (0.0-1.0, 作为最终分数权重)
#   ×   status filter (只算 status=active, LLM Wiki v2 过滤)
#
# 退出码: 0=成功有输出, 1=无匹配 (非错误), 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# --- 参数 ---
TICKER="${1:?用法: $0 <TICKER> [--industry X] [--phase N] [--limit 3]}"
shift

INDUSTRY=""
PHASE="unknown"
LIMIT=3

while [ $# -gt 0 ]; do
    case "$1" in
        --industry) INDUSTRY="${2:-}"; shift 2 ;;
        --phase) PHASE="${2:-unknown}"; shift 2 ;;
        --limit) LIMIT="${2:-3}"; shift 2 ;;
        *) echo "未知选项: $1" >&2; exit 2 ;;
    esac
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REGISTRY="${REPO_ROOT}/knowledge/pattern_registry.yaml"
DATA_DIR="reports/${TICKER}/data"
OUTPUT="${DATA_DIR}/phase_context_preamble.md"

[ -f "$REGISTRY" ] || { echo -e "${RED}pattern_registry.yaml 不存在${NC}" >&2; exit 2; }

# --- 从 checkpoint 补充 industry (如未指定) ---
CHECKPOINT="${DATA_DIR}/checkpoint.yaml"
if [ -z "$INDUSTRY" ] && [ -f "$CHECKPOINT" ]; then
    INDUSTRY=$({ grep '^industry:' "$CHECKPOINT" 2>/dev/null | head -1 | sed 's/^industry: *//' | tr -d '"' || true; })
fi

# --- 收集关键词源 → 写入临时文件 (避免 heredoc 中文编码问题) ---
# 优先级: thesis_crystallization > handoff notes > checkpoint
KEYWORDS_FILE=$(mktemp)
trap "rm -f $KEYWORDS_FILE" EXIT

# 尝试多个可能的 thesis 文件名
for THESIS_FILE in \
    "reports/${TICKER}/staging/${TICKER}_thesis_crystallization.md" \
    "reports/${TICKER}/staging/thesis_crystallization.md" \
    "reports/${TICKER}/staging/P0.75_thesis_crystallization.md" \
    "reports/${TICKER}/staging/thesis_crystallization_P0.75.md"; do
    if [ -f "$THESIS_FILE" ]; then
        head -c 2000 "$THESIS_FILE" > "$KEYWORDS_FILE" 2>/dev/null
        break
    fi
done

# 如无 thesis, 用最近 handoff
if [ ! -s "$KEYWORDS_FILE" ]; then
    LATEST_HANDOFF=$({ ls -t reports/${TICKER}/staging/handoff_P*.md 2>/dev/null | head -1 || true; })
    [ -n "$LATEST_HANDOFF" ] && head -c 2000 "$LATEST_HANDOFF" > "$KEYWORDS_FILE" 2>/dev/null
fi

# ============================================================
# 评分: 每个 pattern 计算相关性
# ============================================================

# 使用 Python 做评分 (yaml 解析+排序更方便)
SCORES=$(python3 << PYEOF
# -*- coding: utf-8 -*-
import re, sys, io

ticker = "${TICKER}"
industry = "${INDUSTRY}"
registry_path = "${REGISTRY}"
keywords_path = "${KEYWORDS_FILE}"

# 从文件读关键词 (避免 heredoc 编码问题)
try:
    with open(keywords_path, encoding='utf-8') as f:
        keywords_text = f.read()
except (FileNotFoundError, IOError):
    keywords_text = ""

# 读 registry
with open(registry_path, encoding='utf-8') as f:
    content = f.read()

# 简单 yaml 解析: 按 "- id:" 切块
pattern_blocks = re.split(r'\n  - id:', content)
patterns = []
for i, block in enumerate(pattern_blocks):
    if i == 0:
        continue  # 头部不是 pattern
    block = "  - id:" + block

    # 提取字段
    m_id = re.search(r'id: (PAT-\d+)', block)
    m_name = re.search(r'name: "([^"]+)"', block)
    m_principle = re.search(r'principle: "([^"]+)"', block)
    m_trigger = re.search(r'trigger: "([^"]+)"', block)
    m_fix = re.search(r'fix: "([^"]+)"', block)
    m_status = re.search(r'status: (\w+)', block)
    m_conf = re.search(r'confidence: ([\d.]+)', block)
    m_severity = re.search(r'severity: (\w+)', block)

    if not m_id:
        continue

    # 提取 instances (简单列表)
    instances_match = re.search(r'instances:\n((?:      - "[^"]+"\n?)+)', block)
    instances_text = instances_match.group(1) if instances_match else ""

    status = m_status.group(1) if m_status else "active"
    if status != "active":
        continue  # LLM Wiki v2 过滤: 只返回 active

    confidence = float(m_conf.group(1)) if m_conf else 0.7

    # 评分
    score = 0
    reasons = []

    # +3: ticker 直接匹配 instances
    if ticker in instances_text:
        score += 3
        reasons.append(f"ticker={ticker}直接命中")

    # +2: industry 匹配 (简单包含)
    if industry:
        ind_lower = industry.lower()
        block_lower = block.lower()
        # 行业关键词映射
        ind_keywords = {
            "semiconductor": ["半导体", "chip", "fab", "wafer", "wfe"],
            "software": ["saas", "software", "arr"],
            "consumer": ["消费", "brand", "retail"],
            "finance": ["金融", "bank", "insurance"],
            "platform": ["platform", "network", "marketplace"],
        }
        industry_hit = False
        if ind_lower in block_lower:
            industry_hit = True
        for k, vs in ind_keywords.items():
            if k in ind_lower or any(v in ind_lower for v in vs):
                if any(v in block_lower for v in vs):
                    industry_hit = True
                    break
        if industry_hit:
            score += 2
            reasons.append(f"industry={industry}匹配")

    # +1/次: principle/trigger 关键词在 thesis 中出现
    # 提取 principle 和 trigger 的关键动词/名词 (中文逗号/句号切分)
    kw_hits = 0
    for field_match in [m_principle, m_trigger]:
        if not field_match:
            continue
        field_text = field_match.group(1)
        # 切出 2-8 字符的中文片段
        tokens = re.findall(r'[\u4e00-\u9fff]{3,6}', field_text)
        for t in tokens:
            if t in keywords_text:
                kw_hits += 1
    if kw_hits > 0:
        score += min(kw_hits, 3)  # 上限 +3
        reasons.append(f"{kw_hits}个关键词匹配")

    # 乘以 confidence 作为权重
    final_score = score * confidence

    if score > 0:  # 至少有一点关联才算
        patterns.append({
            "id": m_id.group(1),
            "name": m_name.group(1) if m_name else "",
            "principle": m_principle.group(1) if m_principle else "",
            "fix": m_fix.group(1) if m_fix else "",
            "severity": m_severity.group(1) if m_severity else "medium",
            "score": final_score,
            "raw_score": score,
            "confidence": confidence,
            "reasons": reasons,
        })

# 按 final_score 降序
patterns.sort(key=lambda x: x["score"], reverse=True)

# 输出 top N
limit = ${LIMIT}
for p in patterns[:limit]:
    print(f"{p['id']}|{p['score']:.2f}|{p['raw_score']}|{p['confidence']}|{p['severity']}|{p['name']}|{p['principle']}|{p['fix']}|{'; '.join(p['reasons'])}")
PYEOF
)

# ============================================================
# 输出 (stdout + 写入文件)
# ============================================================

if [ -z "$SCORES" ]; then
    echo -e "${YELLOW}[phase_context_inject] ${TICKER} 无匹配 pattern${NC}"
    exit 1
fi

# --- stdout 彩色输出 ---
echo -e "${CYAN}========================================"
echo " Phase Context Preamble ${TICKER} (Phase ${PHASE})"
[ -n "$INDUSTRY" ] && echo " Industry: ${INDUSTRY}"
echo -e "========================================${NC}"
echo ""
echo -e "${BOLD}过往最相关的 ${LIMIT} 条模式 (自动注入):${NC}"
echo ""

COUNT=0
while IFS='|' read -r pid score raw conf sev name principle fix reasons; do
    [ -z "$pid" ] && continue
    COUNT=$((COUNT + 1))

    # severity 颜色
    case "$sev" in
        critical) sev_color="${RED}" ;;
        high) sev_color="${YELLOW}" ;;
        *) sev_color="${CYAN}" ;;
    esac

    echo -e "${BOLD}[$COUNT] ${pid} — ${name}${NC} ${sev_color}(${sev})${NC}"
    echo -e "    ${CYAN}原则${NC}: ${principle}"
    echo -e "    ${CYAN}修复${NC}: ${fix}"
    echo -e "    ${CYAN}评分${NC}: ${score} (raw=${raw} × conf=${conf}) | ${reasons}"
    echo ""
done <<< "$SCORES"

# --- 写入 preamble 文件 (供下个 Phase 读取) ---
mkdir -p "$DATA_DIR"
{
    echo "# Phase Context Preamble — ${TICKER}"
    echo "> 自动生成: $(date -u +"%Y-%m-%dT%H:%M:%S+00:00")"
    echo "> 生成时 Phase: ${PHASE}"
    [ -n "$INDUSTRY" ] && echo "> Industry: ${INDUSTRY}"
    echo "> 来源: gstack preamble 机制 + LLM Wiki v2 status 过滤"
    echo ""
    echo "## 过往最相关的 ${LIMIT} 条模式"
    echo ""
    echo "下一个 Phase 启动时, AI 应读取本文件, 在推理中参考这 ${LIMIT} 条教训, 避免已知陷阱。"
    echo ""

    COUNT=0
    while IFS='|' read -r pid score raw conf sev name principle fix reasons; do
        [ -z "$pid" ] && continue
        COUNT=$((COUNT + 1))
        echo "### ${COUNT}. ${pid} — ${name} (${sev})"
        echo ""
        echo "**原则**: ${principle}"
        echo ""
        echo "**修复**: ${fix}"
        echo ""
        echo "**相关性**: 评分 ${score} (raw=${raw} × confidence=${conf}) | ${reasons}"
        echo ""
    done <<< "$SCORES"

    echo "---"
    echo "> 如需查看所有 pattern: \`bash scripts/memory_lifecycle.sh status <ID>\`"
    echo "> 如需 audit mode: \`bash scripts/search_past_analysis.sh <关键词> --audit-mode\`"
} > "$OUTPUT"

echo -e "${GREEN}→ 写入: ${OUTPUT}${NC}"
exit 0
