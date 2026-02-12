---
name: worktree-nav
description: 快速切换到行业worktree并显示状态。用法: /worktree-nav 半导体 或 /worktree-nav (显示全部)
---

# Worktree 导航

## 触发

用户说 `/worktree-nav [行业名]` 或 "进入XX"/"切换到XX"。

## 行业映射

| 行业名 | 路径 | 分支 |
|--------|------|------|
| 半导体 | `.worktrees/半导体` | 半导体 |
| 消费品 | `.worktrees/消费品` | 消费品 |
| 生态科技 | `.worktrees/生态科技` | 生态科技-new |
| 金融 | `.worktrees/金融` | 金融 |
| main | 项目根目录 | main |

## 执行步骤

### 无参数: 显示全部

```bash
git worktree list
```

输出每个worktree的: 路径 + 分支 + 最近commit

### 有参数: 切换到指定行业

1. **定位**: 从映射表找到路径
2. **切换**: `cd /Users/milton/投资大师/.worktrees/{行业名}`
3. **确认**: 运行 `pwd` + `git branch --show-current`
4. **状态**: 运行以下命令并输出摘要
   ```bash
   git log --oneline -3
   git status -s | head -10
   ls reports/*/data/checkpoint.yaml 2>/dev/null
   ```
5. **如有checkpoint**: 读取并显示当前Phase和next_action

## 输出格式

```
已切换到 [行业名] worktree
分支: [分支名]
路径: [完整路径]
最近工作: [最近3条commit摘要]
进行中: [checkpoint中的ticker + phase，如有]
```

## 禁止

- 让用户手动 cd 或开新 session
- 只打印路径不执行切换
- 创建新 worktree（那是 using-git-worktrees 的职责）
