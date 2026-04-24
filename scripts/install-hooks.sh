#!/bin/bash
# install-hooks.sh — 把 scripts/git-hooks/ 下的 hook 模板安装到 .git/hooks/
#
# 用法: bash scripts/install-hooks.sh
#
# 为什么需要这个脚本:
#   .git/hooks/ 不在版本控制中,clone 后默认没有 hook。
#   本脚本把 scripts/git-hooks/ 下版本控制的 hook 模板安装到 .git/hooks/。
#
#   git worktree 共享 .git/hooks,所以安装一次即可对所有 worktree 生效。
#
# 重新安装(template 更新后): 直接重跑本脚本。会覆盖现有 hook。

set -e

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "✗ 不在 git 仓库中"
  exit 1
fi

GIT_COMMON_DIR="$(git rev-parse --git-common-dir)"
HOOK_TEMPLATE_DIR="$REPO_ROOT/scripts/git-hooks"
HOOK_INSTALL_DIR="$GIT_COMMON_DIR/hooks"

if [[ ! -d "$HOOK_TEMPLATE_DIR" ]]; then
  echo "✗ 找不到 hook 模板目录: $HOOK_TEMPLATE_DIR"
  exit 1
fi

mkdir -p "$HOOK_INSTALL_DIR"

INSTALLED=0
for template in "$HOOK_TEMPLATE_DIR"/*; do
  [[ -f "$template" ]] || continue
  hook_name="$(basename "$template")"
  target="$HOOK_INSTALL_DIR/$hook_name"
  cp "$template" "$target"
  chmod +x "$target"
  echo "✓ 安装 $hook_name → $target"
  INSTALLED=$((INSTALLED + 1))
done

if [[ "$INSTALLED" -eq 0 ]]; then
  echo "⚠ 模板目录为空,没有 hook 被安装"
  exit 1
fi

echo ""
echo "完成: $INSTALLED 个 hook 已安装"
echo "提示: git worktree 共享 .git/hooks,本次安装对所有 worktree 生效"
