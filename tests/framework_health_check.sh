#!/usr/bin/env bash
# 框架健康检查 — 每次会话启动时可选执行
# 用法: bash tests/framework_health_check.sh

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREE_DIR="$REPO_ROOT/.worktrees"
ISSUES=0
WARNINGS=0

echo "=== 框架健康检查 v2.0 ==="
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

# 2. Worktree CLAUDE.md Thin-Shell检查 (v2.0: 行数+复制检测+字符数)
echo ""
echo "--- Worktree CLAUDE.md Thin-Shell检查 ---"
for wt_dir in "$WORKTREE_DIR"/*/; do
    wt_name=$(basename "$wt_dir")
    wt_file="$wt_dir/CLAUDE.md"
    if [ ! -f "$wt_file" ]; then
        echo "⚠️  $wt_name: CLAUDE.md不存在"
        WARNINGS=$((WARNINGS + 1))
        continue
    fi

    wt_lines=$(wc -l < "$wt_file" 2>/dev/null || echo 0)
    wt_chars=$(wc -m < "$wt_file" 2>/dev/null || echo 0)
    is_copy="no"

    # 检测是否是主CLAUDE.md的复制品 (首行含"主分支精简版")
    first_line=$(head -1 "$wt_file" 2>/dev/null)
    if echo "$first_line" | grep -q "主分支精简版"; then
        is_copy="yes"
    fi

    # 检测是否含Thin-Shell标记
    has_thinshell=$(grep -c "Thin-Shell" "$wt_file" 2>/dev/null || echo 0)

    if [ "$is_copy" = "yes" ]; then
        echo "❌ $wt_name: 主CLAUDE.md复制品! ${wt_lines}行/${wt_chars}字符 — 必须改为Thin-Shell"
        ISSUES=$((ISSUES + 1))
    elif [ "$wt_lines" -gt 120 ]; then
        echo "❌ $wt_name: ${wt_lines}行/${wt_chars}字符 (Thin-Shell上限120行/3K字符)"
        ISSUES=$((ISSUES + 1))
    elif [ "$wt_chars" -gt 4000 ]; then
        echo "⚠️  $wt_name: ${wt_lines}行/${wt_chars}字符 (字符偏大,建议<3K)"
        WARNINGS=$((WARNINGS + 1))
    elif [ "$has_thinshell" -eq 0 ]; then
        echo "⚠️  $wt_name: ${wt_lines}行 — 缺少Thin-Shell标记"
        WARNINGS=$((WARNINGS + 1))
    else
        echo "✅ $wt_name: ${wt_lines}行/${wt_chars}字符 (Thin-Shell)"
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

# --- 性能健康检查 ---
echo ""
echo -e "${CYAN}[Additional] 性能健康检查...${NC}"

# 检查脚本执行时间
SLOW_SCRIPTS=()
for script in scripts/*.sh; do
    if [[ -f "$script" && -x "$script" ]]; then
        # 简单的help调用测试执行时间
        start_time=$(date +%s)
        timeout 10s "$script" --help >/dev/null 2>&1 || true
        end_time=$(date +%s)
        duration=$((end_time - start_time))

        if [[ $duration -gt 5 ]]; then
            SLOW_SCRIPTS+=("$(basename "$script"):${duration}s")
        fi
    fi
done

if [[ ${#SLOW_SCRIPTS[@]} -eq 0 ]]; then
    echo -e "${GREEN}  ✅ 所有脚本响应时间正常${NC}"
else
    echo -e "${YELLOW}  ⚠️  发现响应缓慢的脚本:${NC}"
    for slow in "${SLOW_SCRIPTS[@]}"; do
        echo "    - $slow"
    done
fi
