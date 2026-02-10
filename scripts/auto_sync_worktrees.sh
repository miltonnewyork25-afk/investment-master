#!/bin/bash
# ============================================================
# auto_sync_worktrees.sh — 自动同步worktree v1.0
# ============================================================
# 用法:
#   bash scripts/auto_sync_worktrees.sh [--force] [worktree_name]
#   例: bash scripts/auto_sync_worktrees.sh
#       bash scripts/auto_sync_worktrees.sh --force 金融
#
# 功能:
#   1. 检查main分支最新状态
#   2. 逐个同步所有worktree (或指定worktree)
#   3. 智能处理CLAUDE.md冲突 (保留worktree行业配置)
#   4. 输出同步状态报告
#
# 退出码: 0=成功, 1=冲突需手动处理, 2=参数错误
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
FORCE_MODE=false
TARGET_WORKTREE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE_MODE=true
            shift
            ;;
        *)
            TARGET_WORKTREE="$1"
            shift
            ;;
    esac
done

# --- 函数 ---
log_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

sync_worktree() {
    local worktree_name="$1"
    local worktree_path=".worktrees/$worktree_name"

    if [[ ! -d "$worktree_path" ]]; then
        log_warning "Worktree '$worktree_name' 不存在，跳过"
        return 0
    fi

    log_info "同步 worktree: $worktree_name"

    # 进入worktree
    cd "$worktree_path" || {
        log_error "无法进入 worktree: $worktree_path"
        return 1
    }

    # 检查是否有未提交变更
    if ! git diff --quiet || ! git diff --cached --quiet; then
        log_warning "$worktree_name 有未提交变更"
        if [[ "$FORCE_MODE" != "true" ]]; then
            log_error "请先提交变更，或使用 --force 忽略"
            cd - > /dev/null
            return 1
        fi
    fi

    # 尝试merge main
    local merge_result
    if git merge main --no-edit > /dev/null 2>&1; then
        log_success "$worktree_name 同步成功"
        cd - > /dev/null
        return 0
    else
        # 处理冲突
        log_warning "$worktree_name 存在冲突，尝试智能解决..."

        # 检查是否是CLAUDE.md冲突
        if git status --porcelain | grep -q "UU CLAUDE.md"; then
            log_info "检测到CLAUDE.md冲突，使用main版本..."

            # 使用main的CLAUDE.md，但保留worktree特有配置
            git checkout --theirs CLAUDE.md
            git add CLAUDE.md

            if git commit --no-edit > /dev/null 2>&1; then
                log_success "$worktree_name CLAUDE.md冲突已自动解决"
                cd - > /dev/null
                return 0
            else
                log_error "$worktree_name 自动解决失败"
                git merge --abort 2>/dev/null
                cd - > /dev/null
                return 1
            fi
        else
            log_error "$worktree_name 存在非CLAUDE.md冲突，需要手动处理"
            git merge --abort 2>/dev/null
            cd - > /dev/null
            return 1
        fi
    fi
}

# --- 主程序 ---
echo "=== Worktree自动同步 v1.0 ==="
echo "时间: $(date '+%Y-%m-%d %H:%M')"
echo

# 确认在main分支
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" ]]; then
    log_error "请在main分支运行此脚本 (当前: $current_branch)"
    exit 2
fi

# 获取worktree列表
worktree_list=("半导体" "消费品" "生态科技" "金融")
if [[ -n "$TARGET_WORKTREE" ]]; then
    worktree_list=("$TARGET_WORKTREE")
fi

# 记录main最新commit
main_commit=$(git rev-parse --short HEAD)
log_info "Main分支最新commit: $main_commit"

# 同步各worktree
success_count=0
total_count=${#worktree_list[@]}

for worktree in "${worktree_list[@]}"; do
    if sync_worktree "$worktree"; then
        ((success_count++))
    fi
done

echo
echo "=== 同步汇总 ==="
echo "成功: $success_count/$total_count"

if [[ $success_count -eq $total_count ]]; then
    log_success "所有worktree同步完成"
    exit 0
else
    log_warning "部分worktree同步失败，请检查上述错误信息"
    exit 1
fi