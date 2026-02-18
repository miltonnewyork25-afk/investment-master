# Claude Code 配置指南

## 问题描述

当AI生成长报告时出现错误：
```
API Error: Claude's response exceeded the 32000 output token maximum.
To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.
```

## 解决方案

### 🎯 已完成配置

**1. 系统级永久设置** (✅ 已设置)
```bash
# 已添加到 ~/.zshrc
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=128000
```

**2. 项目级配置模板** (✅ 已更新)
```bash
# 已添加到 .env.example
CLAUDE_CODE_MAX_OUTPUT_TOKENS=128000
```

### 📊 配置说明

| 设置值 | 适用场景 | 效果 |
|--------|----------|------|
| 32000 | 默认值 | 短到中等长度输出 |
| 64000 | 中长报告 | 2倍容量 |
| **128000** | **长报告(推荐)** | **4倍容量，适合Tier 3** |
| 200000 | 超长报告 | 6倍容量 |

### 🔧 验证配置

**检查当前设置**:
```bash
echo $CLAUDE_CODE_MAX_OUTPUT_TOKENS
# 应该输出: 128000
```

**如果需要立即修改**:
```bash
# 临时设置 (当前session)
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=200000

# 永久设置 (新terminal生效)
echo 'export CLAUDE_CODE_MAX_OUTPUT_TOKENS=200000' >> ~/.zshrc
source ~/.zshrc
```

### 📋 项目使用

**创建项目.env文件** (如果还没有):
```bash
cp .env.example .env
# .env中已包含: CLAUDE_CODE_MAX_OUTPUT_TOKENS=128000
```

### 🚀 重启说明

- **当前session**: 立即生效 (已设置)
- **新terminal**: 自动生效 (已写入~/.zshrc)
- **Claude Code**: 重启后生效

### 💡 最佳实践

**投资报告推荐值**:
- **Tier 1 (5K字)**: 默认32K足够
- **Tier 2 (40K字)**: 64K推荐
- **Tier 3 (≥250K字)**: **128K必需**
- **Complete组装**: 200K安全

**监控建议**:
- 如果仍然遇到限制 → 增加到200000
- 如果输出过长影响体验 → 降低到64000
- 观察实际使用情况动态调整

## 故障排除

**1. 设置后仍然报错**:
```bash
# 重启Claude Code
# 或手动临时设置
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=200000
```

**2. 检查配置文件**:
```bash
grep CLAUDE_CODE ~/.zshrc
cat .env | grep CLAUDE_CODE
```

**3. 清理重复设置**:
```bash
# 如发现重复设置，运行:
grep -v "CLAUDE_CODE_MAX_OUTPUT_TOKENS" ~/.zshrc > ~/.zshrc.tmp
mv ~/.zshrc.tmp ~/.zshrc
echo 'export CLAUDE_CODE_MAX_OUTPUT_TOKENS=128000' >> ~/.zshrc
```