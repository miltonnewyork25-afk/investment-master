#!/bin/bash
# ============================================================
# context_save.sh — Context紧急保存脚本 v1.0
# ============================================================
# 用法:
#   bash scripts/context_save.sh [TICKER]
#   例: bash scripts/context_save.sh TSM
#   无参数: 自动扫描所有未提交文件
#
# 功能:
#   1. 扫描当前worktree所有未提交文件(modified + untracked)
#   2. 分类: 报告/staging/data/其他
#   3. 自动git add + commit(wip标记)
#   4. 输出摘要 + 恢复指令
#
# 使用场景:
#   - /clear 前执行
#   - context接近上限时执行
#   - Agent主动在Phase完成或context不足时调用
#
# 退出码: 0=成功(有提交), 1=无需提交(已干净), 2=参数错误
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

TICKER="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${CYAN}========================================"
echo " Context Save Script v1.0"
echo "========================================${NC}"
echo ""

# --- 检查是否有未提交文件 ---
MODIFIED=$(git diff --name-only 2>/dev/null || true)
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null || true)
STAGED=$(git diff --cached --name-only 2>/dev/null || true)

if [ -z "$MODIFIED" ] && [ -z "$UNTRACKED" ] && [ -z "$STAGED" ]; then
    echo -e "${GREEN}工作区干净，无需保存。可以安全 /clear${NC}"
    exit 1
fi

# --- 收集要提交的文件 ---
FILES_TO_ADD=()
STAGING_FILES=()
DATA_FILES=()
REPORT_FILES=()
OTHER_FILES=()

# 处理modified文件
while IFS= read -r f; do
    [ -z "$f" ] && continue
    case "$f" in
        */staging/*) STAGING_FILES+=("$f") ;;
        */data/*) DATA_FILES+=("$f") ;;
        reports/*Phase*|reports/*Complete*) REPORT_FILES+=("$f") ;;
        *) OTHER_FILES+=("$f") ;;
    esac
    FILES_TO_ADD+=("$f")
done <<< "$MODIFIED"

# 处理untracked文件
while IFS= read -r f; do
    [ -z "$f" ] && continue
    case "$f" in
        */staging/*) STAGING_FILES+=("$f") ;;
        */data/*) DATA_FILES+=("$f") ;;
        reports/*Phase*|reports/*Complete*) REPORT_FILES+=("$f") ;;
        *) OTHER_FILES+=("$f") ;;
    esac
    FILES_TO_ADD+=("$f")
done <<< "$UNTRACKED"

# 处理已staged文件
while IFS= read -r f; do
    [ -z "$f" ] && continue
    case "$f" in
        */staging/*) STAGING_FILES+=("$f") ;;
        */data/*) DATA_FILES+=("$f") ;;
        reports/*Phase*|reports/*Complete*) REPORT_FILES+=("$f") ;;
        *) OTHER_FILES+=("$f") ;;
    esac
    # 已staged的不需要重新add
done <<< "$STAGED"

echo -e "${CYAN}发现未提交文件:${NC}"
[ ${#REPORT_FILES[@]} -gt 0 ] && echo -e "  报告:   ${#REPORT_FILES[@]} 个"
[ ${#STAGING_FILES[@]} -gt 0 ] && echo -e "  Staging: ${#STAGING_FILES[@]} 个"
[ ${#DATA_FILES[@]} -gt 0 ] && echo -e "  Data:    ${#DATA_FILES[@]} 个"
[ ${#OTHER_FILES[@]} -gt 0 ] && echo -e "  其他:    ${#OTHER_FILES[@]} 个"
echo ""

# --- 计算总字符 ---
TOTAL_CHARS=0
for f in "${FILES_TO_ADD[@]}"; do
    if [ -f "$f" ]; then
        fc=$(wc -m < "$f" 2>/dev/null || echo 0)
        fc="${fc// /}"
        TOTAL_CHARS=$((TOTAL_CHARS + fc))
    fi
done

# --- 构建commit消息 ---
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
TICKER_DISPLAY="${TICKER:-${BRANCH}}"

# 检测当前Phase
CURRENT_PHASE="unknown"
for ckpt in reports/*/data/checkpoint.yaml; do
    if [ -f "$ckpt" ]; then
        phase=$(grep '^current_phase:' "$ckpt" 2>/dev/null | head -1 | sed 's/^current_phase: *//')
        status=$(grep '^phase_status:' "$ckpt" 2>/dev/null | head -1 | sed 's/^phase_status: *//')
        CURRENT_PHASE="Phase ${phase} (${status})"
        if [ -z "$TICKER" ]; then
            TICKER=$(grep '^ticker:' "$ckpt" 2>/dev/null | head -1 | sed 's/^ticker: *//')
            TICKER_DISPLAY="$TICKER"
        fi
    fi
done

COMMIT_MSG="wip(${TICKER_DISPLAY}): context-save — ${#FILES_TO_ADD[@]}文件, ${TOTAL_CHARS}字符"

# --- git add + commit ---
echo -e "${CYAN}提交文件:${NC}"
for f in "${FILES_TO_ADD[@]}"; do
    echo "  - $f"
done
echo ""

git add "${FILES_TO_ADD[@]}" 2>/dev/null

git commit -m "$(cat <<EOF
${COMMIT_MSG}

${CURRENT_PHASE} | Branch: ${BRANCH}
Reports: ${#REPORT_FILES[@]} | Staging: ${#STAGING_FILES[@]} | Data: ${#DATA_FILES[@]} | Other: ${#OTHER_FILES[@]}
自动保存: context接近上限，下次会话继续。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"

echo ""
echo -e "${GREEN}========================================"
echo " Context Save Complete!"
echo "========================================"
echo " Ticker:    ${TICKER_DISPLAY}"
echo " Phase:     ${CURRENT_PHASE}"
echo " Files:     ${#FILES_TO_ADD[@]}"
echo " Chars:     ${TOTAL_CHARS}"
echo -e "========================================${NC}"
echo ""
echo "可以安全 /clear 了。"
echo ""

# --- 输出恢复指令 ---
if [ -n "$TICKER" ]; then
    echo -e "${YELLOW}恢复指令: \"继续${TICKER}，读取checkpoint恢复\"${NC}"
fi
