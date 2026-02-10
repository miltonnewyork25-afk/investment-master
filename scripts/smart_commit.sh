#!/bin/bash
# 智能提交脚本 v2.0 — 默认commit到当前worktree，不自动同步main
# 使用方法: ./scripts/smart_commit.sh "commit message"

set -uo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 获取提交信息
COMMIT_MSG="${1:-}"
if [[ -z "$COMMIT_MSG" ]]; then
    echo -e "${RED}错误: 请提供提交信息${NC}"
    echo "使用方法: ./scripts/smart_commit.sh \"提交信息\""
    exit 1
fi

# 检查当前分支 — 在main上时警告并要求确认
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$current_branch" == "main" ]]; then
    echo -e "${YELLOW}警告: 当前在main分支${NC}"
    read -p "确认要在main上提交吗? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy] ]]; then
        echo "已取消。请切换到worktree分支后再提交。"
        exit 0
    fi
fi

echo -e "${BLUE}智能提交协调器 v2.0${NC}"
echo -e "分支: ${GREEN}$current_branch${NC}"
echo -e "信息: ${YELLOW}$COMMIT_MSG${NC}"
echo "=================================="

# 检查是否有更改
if [[ -z "$(git status --porcelain)" ]]; then
    echo -e "${YELLOW}没有检测到文件更改${NC}"
    exit 0
fi

# 暂存已跟踪文件的更改（不暴力添加所有文件）
git add -u

# 提示未跟踪文件
untracked=$(git ls-files --others --exclude-standard)
if [[ -n "$untracked" ]]; then
    echo -e "${YELLOW}检测到未跟踪文件:${NC}"
    echo "$untracked"
    read -p "是否添加这些文件? (y/N): " add_untracked
    if [[ "$add_untracked" =~ ^[Yy] ]]; then
        echo "$untracked" | xargs git add
    fi
fi

# 分析文件类型
framework_files=0
worktree_files=0
manual_files=0

while IFS= read -r file; do
    if [[ -z "$file" ]]; then continue; fi

    # 通用框架文件
    if [[ "$file" =~ ^docs/((?!industry/).+\.md|.+/.+\.md)$ ]] || \
       [[ "$file" =~ ^\.claude/skills/.*\.skill\.md$ ]] || \
       [[ "$file" =~ ^tests/.*\.sh$ ]] || \
       [[ "$file" =~ ^scripts/.*\.sh$ ]] || \
       [[ "$file" =~ ^config/.*\.(yaml|json)$ ]]; then
        framework_files=$((framework_files + 1))

    # Worktree专属文件
    elif [[ "$file" =~ ^(reports/|data/research/|current_tasks/|agent_logs/) ]] || \
         [[ "$file" =~ ^(findings|progress|task_plan.*|STATUS)\.md$ ]] || \
         [[ "$file" =~ .*_backup\.md$ ]]; then
        worktree_files=$((worktree_files + 1))

    # 需要手动确认的文件
    else
        manual_files=$((manual_files + 1))
    fi
done < <(git diff --cached --name-only)

total_files=$((framework_files + worktree_files + manual_files))

echo -e "${BLUE}文件分析结果:${NC}"
echo "  通用框架: $framework_files 个文件"
echo "  Worktree专属: $worktree_files 个文件"
echo "  需要确认: $manual_files 个文件"
echo "  总计: $total_files 个文件"

# 决策: 是否同步到main (默认=不同步)
merge_to_main=false

if [[ $framework_files -gt 0 ]]; then
    echo -e "\n${YELLOW}检测到框架文件更新${NC}"
    read -p "是否cherry-pick同步到main? (y/N): " sync_choice
    if [[ "$sync_choice" =~ ^[Yy] ]]; then
        merge_to_main=true
    fi
fi

# 执行提交
echo -e "\n${BLUE}执行提交...${NC}"

commit_stats="

文件统计:
- 通用框架: $framework_files 个
- Worktree专属: $worktree_files 个
- 手动确认: $manual_files 个"

git commit -m "$COMMIT_MSG$commit_stats"
echo -e "${GREEN}已提交到 $current_branch${NC}"

# 如果用户确认同步到main，使用cherry-pick (非merge)
if [[ "$merge_to_main" == "true" ]]; then
    echo -e "\n${BLUE}cherry-pick同步到main...${NC}"
    current_commit=$(git rev-parse HEAD)

    git checkout main
    git pull origin main 2>/dev/null || true

    if git cherry-pick "$current_commit"; then
        echo -e "${GREEN}已cherry-pick到main${NC}"

        read -p "是否推送main到GitHub? (y/N): " push_choice
        if [[ "$push_choice" =~ ^[Yy] ]]; then
            git push origin main
            echo -e "${GREEN}已推送到GitHub${NC}"
        fi
    else
        echo -e "${RED}cherry-pick失败，可能有冲突${NC}"
        git cherry-pick --abort 2>/dev/null || true
    fi

    git checkout "$current_branch"
fi

# 生成操作报告
echo -e "\n${GREEN}提交完成报告${NC}"
echo "分支: $current_branch"
echo "提交: $(git rev-parse --short HEAD)"
echo "同步main: $([ "$merge_to_main" == "true" ] && echo "是(cherry-pick)" || echo "否")"
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
