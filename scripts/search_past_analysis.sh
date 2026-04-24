#!/bin/bash
# ============================================================
# search_past_analysis.sh — 跨报告分析搜索 v1.0
# ============================================================
# 借鉴: Hermes Agent SessionDB + FTS5 跨会话检索
# 核心: 不需要 SQLite，用 grep 实现 80% 的跨报告搜索需求
#
# 用法:
#   bash scripts/search_past_analysis.sh <关键词> [选项]
#
# 选项:
#   --ticker <TICKER>   限定搜索特定 ticker
#   --staging           只搜索 staging 文件
#   --reports           只搜索完成报告
#   --context <N>       前后显示 N 行 (默认 2)
#   --limit <N>         最多显示 N 条结果 (默认 20)
#
# 示例:
#   bash scripts/search_past_analysis.sh "InP晶圆"
#   bash scripts/search_past_analysis.sh "定价权" --ticker KLAC
#   bash scripts/search_past_analysis.sh "Kill Switch" --staging
#   bash scripts/search_past_analysis.sh "NRR" --context 5 --limit 10
#
# 退出码: 0=有结果, 1=无结果, 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# --- 参数解析 ---
KEYWORD=""
TICKER_FILTER=""
SEARCH_SCOPE="all"  # all | staging | reports
CONTEXT_LINES=2
LIMIT=20
RETRIEVAL_MODE="default"  # default | audit — LLM Wiki v2 借鉴

while [ $# -gt 0 ]; do
    case "$1" in
        --ticker)
            TICKER_FILTER="${2:?--ticker 需要参数}"
            shift 2
            ;;
        --staging)
            SEARCH_SCOPE="staging"
            shift
            ;;
        --reports)
            SEARCH_SCOPE="reports"
            shift
            ;;
        --context)
            CONTEXT_LINES="${2:?--context 需要数字}"
            shift 2
            ;;
        --limit)
            LIMIT="${2:?--limit 需要数字}"
            shift 2
            ;;
        --audit-mode|--include-superseded)
            RETRIEVAL_MODE="audit"
            shift
            ;;
        -*)
            echo "未知选项: $1" >&2
            exit 2
            ;;
        *)
            KEYWORD="$1"
            shift
            ;;
    esac
done

if [ -z "$KEYWORD" ]; then
    echo "用法: $0 <关键词> [--ticker TICKER] [--staging|--reports] [--context N] [--limit N] [--audit-mode]"
    echo ""
    echo "检索模式:"
    echo "  default     只返回 status=active 的内容 (默认)"
    echo "  --audit-mode 包含 superseded/invalidated 内容 (用于复盘/调试)"
    exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${CYAN}========================================"
echo " Past Analysis Search v1.1"
echo " 关键词: \"${KEYWORD}\""
[ -n "$TICKER_FILTER" ] && echo " Ticker: ${TICKER_FILTER}"
echo " 范围: ${SEARCH_SCOPE}"
if [ "$RETRIEVAL_MODE" == "audit" ]; then
    echo -e " 模式: ${YELLOW}audit (含 superseded/invalidated)${NC}"
else
    echo " 模式: default (只返回 active)"
fi
echo -e "${CYAN}========================================${NC}"
echo ""

# --- 构建搜索路径 ---
SEARCH_PATHS=()

if [ -n "$TICKER_FILTER" ]; then
    # 限定 ticker
    case "$SEARCH_SCOPE" in
        staging)
            SEARCH_PATHS+=("${REPO_ROOT}/reports/${TICKER_FILTER}/staging/")
            ;;
        reports)
            SEARCH_PATHS+=("${REPO_ROOT}/reports/${TICKER_FILTER}/")
            ;;
        all)
            SEARCH_PATHS+=("${REPO_ROOT}/reports/${TICKER_FILTER}/")
            ;;
    esac
else
    # 全部 ticker
    case "$SEARCH_SCOPE" in
        staging)
            for d in "${REPO_ROOT}"/reports/*/staging/; do
                [ -d "$d" ] && SEARCH_PATHS+=("$d")
            done
            ;;
        reports)
            SEARCH_PATHS+=("${REPO_ROOT}/reports/")
            ;;
        all)
            SEARCH_PATHS+=("${REPO_ROOT}/reports/")
            ;;
    esac
fi

# --- 验证搜索路径 ---
VALID_PATHS=()
for p in "${SEARCH_PATHS[@]}"; do
    [ -d "$p" ] && VALID_PATHS+=("$p")
done

if [ ${#VALID_PATHS[@]} -eq 0 ]; then
    echo -e "${YELLOW}无有效搜索路径${NC}"
    exit 1
fi

# --- 执行搜索 ---
RESULT_COUNT=0
TEMP_RESULTS=$(mktemp)
TEMP_FILTERED=$(mktemp)

for search_path in "${VALID_PATHS[@]}"; do
    grep -rn --include="*.md" -C "$CONTEXT_LINES" "$KEYWORD" "$search_path" 2>/dev/null >> "$TEMP_RESULTS" || true
done

# --- Default 模式过滤: 排除 status=superseded 或 status=invalidated 的文件 ---
# LLM Wiki v2 借鉴: 让旧信念显式退休, 默认检索只返回 active
FILTERED_FILES=0
if [ "$RETRIEVAL_MODE" == "default" ]; then
    while IFS= read -r line; do
        # 提取文件路径
        if echo "$line" | grep -qE '^[^:]+\.md:[0-9]+:'; then
            fp=$(echo "$line" | cut -d: -f1)
            # 检查文件 frontmatter 或前 20 行是否有 status: superseded/invalidated
            if [ -f "$fp" ]; then
                is_retired=$(head -20 "$fp" 2>/dev/null | grep -cE '^status:[[:space:]]*(superseded|invalidated)' || echo 0)
                is_retired=$(echo "$is_retired" | tr -d '\n ')
                if [ "$is_retired" -gt 0 ]; then
                    FILTERED_FILES=$((FILTERED_FILES + 1))
                    continue
                fi
            fi
        fi
        echo "$line" >> "$TEMP_FILTERED"
    done < "$TEMP_RESULTS"
    mv "$TEMP_FILTERED" "$TEMP_RESULTS"
fi

TOTAL_MATCHES=$(wc -l < "$TEMP_RESULTS" 2>/dev/null || echo 0)
TOTAL_MATCHES="${TOTAL_MATCHES// /}"

if [ "$FILTERED_FILES" -gt 0 ]; then
    echo -e "${YELLOW}已过滤 ${FILTERED_FILES} 行来自 superseded/invalidated 文件 (用 --audit-mode 显示)${NC}"
    echo ""
fi

if [ "$TOTAL_MATCHES" -eq 0 ]; then
    echo -e "${YELLOW}未找到匹配 \"${KEYWORD}\" 的结果${NC}"
    rm -f "$TEMP_RESULTS"
    exit 1
fi

# --- 按文件分组显示 ---
echo -e "${GREEN}找到匹配结果:${NC}"
echo ""

CURRENT_FILE=""
SHOWN=0

while IFS= read -r line; do
    [ "$SHOWN" -ge "$LIMIT" ] && break

    # 解析文件名和行号
    if echo "$line" | grep -qE '^[^:]+\.md:[0-9]+:'; then
        file_path=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)

        # 新文件 → 打印文件头
        if [ "$file_path" != "$CURRENT_FILE" ]; then
            CURRENT_FILE="$file_path"
            # 提取 ticker
            ticker=$(echo "$file_path" | grep -oE 'reports/[A-Z]+' | sed 's|reports/||')
            # 相对路径
            rel_path="${file_path#${REPO_ROOT}/}"
            echo -e "${BOLD}━━━ ${ticker:-?} ━━━ ${rel_path}${NC}"
        fi

        # 高亮关键词
        highlighted=$(echo "$content" | sed "s/${KEYWORD}/$(printf '\033[1;33m')${KEYWORD}$(printf '\033[0m')/g" 2>/dev/null || echo "$content")
        echo -e "  L${line_num}: ${highlighted}"
        SHOWN=$((SHOWN + 1))
    elif echo "$line" | grep -q "^--$"; then
        echo "  ---"
    fi
done < "$TEMP_RESULTS"

rm -f "$TEMP_RESULTS"

echo ""
echo -e "${CYAN}========================================"
echo " 显示: ${SHOWN} / ${TOTAL_MATCHES} 行"
[ "$SHOWN" -lt "$TOTAL_MATCHES" ] && echo " (使用 --limit 增加显示数量)"
echo -e "========================================${NC}"
