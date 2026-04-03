#!/bin/bash
# 简化的Layer 4紧急压缩测试脚本

set -euo pipefail

echo "🚨 测试Layer 4紧急压缩..."

# 检查当前文件大小
if [ ! -f ".claude/session/current_prompt.md" ]; then
    echo "❌ 当前prompt文件不存在"
    exit 1
fi

original_size=$(wc -c < .claude/session/current_prompt.md)
echo "原始大小: $original_size chars"

# 检查是否确实需要紧急压缩
if [ $original_size -lt 250000 ]; then
    echo "⚠️  文件大小不足以触发Layer 4 (需要>250K)"
    echo "当前: $original_size chars"
    exit 0
fi

echo "🔥 触发紧急压缩！大小超过250K阈值"

# 备份原文件
cp .claude/session/current_prompt.md .claude/session/emergency_backup.md
echo "✅ 已备份至 emergency_backup.md"

# 执行渐进式切割 (保护最近25%内容)
total_lines=$(wc -l < .claude/session/current_prompt.md)
protect_lines=$((total_lines / 4))  # 保护最后25%
cut_lines=$((total_lines - protect_lines))

echo "📊 切割计划:"
echo "   总行数: $total_lines"
echo "   切割行数: $cut_lines"
echo "   保护行数: $protect_lines"

# 执行切割
tail -n $protect_lines .claude/session/current_prompt.md > .claude/session/temp_prompt.md

# 添加紧急压缩标记
cat > .claude/session/current_prompt.md << EOF
# 🚨 紧急压缩恢复模式

> **系统状态**: 经历Layer 4紧急压缩，大幅删除早期内容
> **执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
> **原始大小**: $original_size chars
> **切割比例**: $(((cut_lines * 100) / total_lines))%

## 恢复状态
- **工作目录**: $(pwd)
- **Git分支**: $(git branch --show-current 2>/dev/null || echo "main")
- **备份文件**: emergency_backup.md

## 保留内容
保留了最后 $protect_lines 行内容，包括：
- 最近的分析进展
- 当前工作状态
- 关键数据锚点

## 丢失内容
早期 $cut_lines 行内容已被删除以节省空间，包括：
- 详细的历史分析
- 完整的Phase展开
- 冗余的背景信息

## 恢复选项

### 选项1: 从备份恢复
\`\`\`bash
cp .claude/session/emergency_backup.md .claude/session/current_prompt.md
\`\`\`

### 选项2: 重新开始
\`\`\`bash
bash scripts/session_launch.sh [TICKER] [INDUSTRY] "Tier 3"
\`\`\`

### 选项3: 继续最小模式
基于保留的内容继续工作

---
**警告**: Layer 4是最后兜底，建议优化工作流程避免频繁触发

EOF

# 添加保留的内容
echo -e "\n## 保留内容\n" >> .claude/session/current_prompt.md
cat .claude/session/temp_prompt.md >> .claude/session/current_prompt.md

# 清理临时文件
rm .claude/session/temp_prompt.md

new_size=$(wc -c < .claude/session/current_prompt.md)
savings=$((original_size - new_size))
savings_pct=$((savings * 100 / original_size))

echo "✅ Layer 4紧急压缩完成！"
echo "📊 压缩统计:"
echo "   原始大小: $original_size chars"
echo "   压缩后: $new_size chars"
echo "   节省: $savings chars (${savings_pct}%)"

# 创建压缩报告
cat > .claude/session/emergency_compact_log.md << EOF
# 🚨 紧急压缩报告 (Layer 4)

**执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
**压缩级别**: Layer 4 (紧急兜底)
**紧急程度**: CRITICAL

## 紧急状况

⚠️ **触发条件**: Context超过 250000 chars
🚨 **处理方式**: 渐进式切割，保护最近25%内容
🛡️ **保护策略**: 保留最后 $protect_lines 行

## 压缩统计

### 大小变化
- **原始大小**: $original_size chars
- **最终大小**: $new_size chars
- **节省空间**: $savings chars (${savings_pct}%)
- **切割比例**: $(((cut_lines * 100) / total_lines))%

### 保护机制
- ✅ 保留最近内容
- ✅ 基础工作能力
- 🗂️ 完整备份保存

## 恢复选项

### 方案1: 从备份恢复
\`\`\`bash
cp .claude/session/emergency_backup.md .claude/session/current_prompt.md
\`\`\`

### 方案2: 重新启动
\`\`\`bash
bash scripts/session_launch.sh [TICKER] [INDUSTRY] "Tier 3"
\`\`\`

### 方案3: 继续最小模式
继续使用当前最小prompt，根据需要逐步重建

## 预防建议

1. **定期压缩**: 在达到150K时运行Layer 2/3压缩
2. **分段工作**: 避免单session过长
3. **及时保存**: 重要发现及时commit
4. **监控大小**: 使用 \`wc -c .claude/session/current_prompt.md\`

---
*Layer 4是最后兜底，建议优化工作流程避免频繁触发*
EOF

echo "📋 紧急压缩报告已保存至 .claude/session/emergency_compact_log.md"

if [ $new_size -le 250000 ]; then
    echo "🎯 紧急压缩成功！Context已恢复至可用状态"
else
    echo "⚠️  压缩效果有限，可能需要手动清理"
fi

echo "🚨 Layer 4紧急压缩测试完成！"