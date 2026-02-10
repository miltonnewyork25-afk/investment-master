# Worktree 管理指南 v2.0

## Worktree 列表

| 行业 | 路径 | 分支 |
|------|------|------|
| 半导体 | `.worktrees/半导体` | 半导体 |
| 消费品 | `.worktrees/消费品` | 消费品 |
| 生态科技 | `.worktrees/生态科技` | 生态科技-new |
| 科技平台 | `.worktrees/科技平台` | 科技平台 |
| 金融 | `.worktrees/金融` | 金融 |

## 常用命令

```bash
# 查看所有worktree
git worktree list

# 切换到worktree
cd .worktrees/消费品

# 创建新worktree
git worktree add .worktrees/新行业 -b 新行业

# 删除worktree
git worktree remove .worktrees/旧行业

# 智能提交 (默认不同步main)
./scripts/smart_commit.sh "feat(消费品): Phase 1完成"
```

## 提交规则 (v27.0)

所有commit规则定义在 `CLAUDE.md` 的"Git提交规则"一节，此处不重复。核心要点:

1. **默认commit到当前worktree分支**，不同步main
2. **同步main必须用户确认**，使用cherry-pick（非merge）
3. **禁止** `git add .` / `git add -A` / 自动merge整个分支

## 从main同步更新到worktree

```bash
# 在worktree中拉取main的最新框架更新
cd .worktrees/消费品
git merge main
```

## 冲突解决

```bash
# 查看冲突文件
git status

# 解决冲突后
git add <冲突文件>
git commit -m "resolve: 解决与main的合并冲突"
```

## 健康检查

```bash
bash tests/framework_health_check.sh
```

检查项: worktree是否落后main | 未提交文件 | CLAUDE.md行数是否超标
