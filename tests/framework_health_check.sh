#!/usr/bin/env bash
# 框架健康检查 — 每次会话启动时可选执行
# 用法: bash tests/framework_health_check.sh

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREE_DIR="$REPO_ROOT/.worktrees"
ISSUES=0
WARNINGS=0

echo "=== 框架健康检查 v1.0 ==="
echo "时间: $(date '+%Y-%m-%d %H:%M')"
echo ""

# 1. Main CLAUDE.md 行数检查
main_lines=$(wc -l < "$REPO_ROOT/CLAUDE.md" 2>/dev/null || echo 0)
if [ "$main_lines" -gt 300 ]; then
    echo "❌ Main CLAUDE.md 膨胀: ${main_lines}行 (上限300)"
    ISSUES=$((ISSUES + 1))
elif [ "$main_lines" -gt 250 ]; then
    echo "⚠️  Main CLAUDE.md 偏大: ${main_lines}行 (建议<250)"
    WARNINGS=$((WARNINGS + 1))
else
    echo "✅ Main CLAUDE.md: ${main_lines}行"
fi

# 2. Worktree CLAUDE.md 行数检查 (thin-shell应<100行)
echo ""
echo "--- Worktree CLAUDE.md ---"
for wt_dir in "$WORKTREE_DIR"/*/; do
    wt_name=$(basename "$wt_dir")
    wt_lines=$(wc -l < "$wt_dir/CLAUDE.md" 2>/dev/null || echo 0)
    if [ "$wt_lines" -gt 100 ]; then
        echo "❌ $wt_name: ${wt_lines}行 (thin-shell上限100)"
        ISSUES=$((ISSUES + 1))
    else
        echo "✅ $wt_name: ${wt_lines}行"
    fi
done

# 3. Worktree与main同步检查
echo ""
echo "--- Worktree同步状态 ---"
main_head=$(cd "$REPO_ROOT" && git rev-parse main 2>/dev/null)
for wt_dir in "$WORKTREE_DIR"/*/; do
    wt_name=$(basename "$wt_dir")
    branch=$(cd "$wt_dir" && git branch --show-current 2>/dev/null)
    # 检查main的HEAD是否是worktree的祖先
    is_merged=$(cd "$wt_dir" && git merge-base --is-ancestor "$main_head" HEAD 2>/dev/null && echo "yes" || echo "no")
    if [ "$is_merged" = "yes" ]; then
        echo "✅ $wt_name ($branch): 已包含最新main"
    else
        behind=$(cd "$wt_dir" && git rev-list HEAD.."$main_head" --count 2>/dev/null || echo "?")
        echo "⚠️  $wt_name ($branch): 落后main ${behind}个commit"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# 4. 未提交文件检查
echo ""
echo "--- 未提交研究数据 ---"
for wt_dir in "$WORKTREE_DIR"/*/; do
    wt_name=$(basename "$wt_dir")
    untracked=$(cd "$wt_dir" && git ls-files --others --exclude-standard -- 'data/research/' 'reports/' 2>/dev/null | wc -l | tr -d ' ')
    if [ "$untracked" -gt 0 ]; then
        echo "⚠️  $wt_name: ${untracked}个未提交研究文件"
        WARNINGS=$((WARNINGS + 1))
    else
        echo "✅ $wt_name: 研究数据已全部提交"
    fi
done

# 5. 进行中的研究检查 (checkpoint.yaml)
echo ""
echo "--- 进行中的研究 ---"
found_any=0
for wt_dir in "$WORKTREE_DIR"/*/; do
    wt_name=$(basename "$wt_dir")
    for cp in "$wt_dir"/reports/*/data/checkpoint.yaml; do
        if [ -f "$cp" ]; then
            ticker=$(basename "$(dirname "$(dirname "$cp")")")
            phase=$(grep 'phase_current:' "$cp" 2>/dev/null | awk '{print $2}')
            echo "📌 $wt_name/$ticker: Phase ${phase:-?} 进行中"
            found_any=1
        fi
    done
done
if [ "$found_any" -eq 0 ]; then
    echo "  无进行中的研究"
fi

# 汇总
echo ""
echo "=== 汇总 ==="
if [ "$ISSUES" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo "✅ 全部健康，无问题"
elif [ "$ISSUES" -eq 0 ]; then
    echo "⚠️  ${WARNINGS}个警告，0个严重问题"
else
    echo "❌ ${ISSUES}个严重问题，${WARNINGS}个警告 — 建议修复后再开始研究"
fi
