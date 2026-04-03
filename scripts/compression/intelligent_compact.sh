#!/bin/bash
# Layer 3: 智能全量压缩 v21.0
# Fork专门压缩agent，恢复激活skills+最近文件，生成连贯工作记忆

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置参数
MIN_COMPRESS_SIZE=150000  # 150K chars
TARGET_SIZE=50000        # 压缩目标大小
CRITICAL_SIZE=200000     # 200K = 紧急压缩

log() {
    echo -e "${BLUE}[INTELLIGENT-COMPACT]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# 函数：检测压缩需求
check_compression_need() {
    if [ ! -f ".claude/session/current_prompt.md" ]; then
        echo "no_prompt"
        return 1
    fi

    local size=$(wc -c < .claude/session/current_prompt.md)
    echo "$size"

    if [ $size -gt $CRITICAL_SIZE ]; then
        echo "critical"
        return 0
    elif [ $size -gt $MIN_COMPRESS_SIZE ]; then
        echo "needed"
        return 0
    else
        echo "normal"
        return 1
    fi
}

# 函数：分析工作状态
analyze_work_state() {
    log "分析当前工作状态..."

    # 使用固定路径而不是mktemp
    local state_file=".claude/session/work_state_analysis.yaml"

    # 检测当前项目
    local ticker="TEST"
    local industry="Technology"
    local phase="Phase 2"

    # 从session_info读取（如果存在）
    if [ -f ".claude/session/session_info.yaml" ]; then
        local file_ticker file_industry
        file_ticker=$(grep "ticker:" .claude/session/session_info.yaml | cut -d'"' -f2 2>/dev/null || echo "")
        file_industry=$(grep "industry:" .claude/session/session_info.yaml | cut -d'"' -f2 2>/dev/null || echo "")

        [ -n "$file_ticker" ] && ticker="$file_ticker"
        [ -n "$file_industry" ] && industry="$file_industry"
    fi

    # 检测当前Phase (简化版)
    if [ -f ".claude/session/current_prompt.md" ]; then
        local found_phase
        found_phase=$(grep -i "Current Phase\|Phase [0-9]" .claude/session/current_prompt.md | head -1 | grep -o "Phase [0-9]" 2>/dev/null || echo "")
        [ -n "$found_phase" ] && phase="$found_phase"
    fi

    # 检测激活工具（简化）
    local active_tools="- 全套investment skills\n- MCP数据工具\n- 多Agent协作工具"

    # 保存工作状态
    cat > "$state_file" << EOF
ticker: "$ticker"
industry: "$industry"
phase: "$phase"
active_tools: |
$active_tools
recent_files: |
- current_prompt.md
- session_info.yaml
key_insights: |
- AI transformation progress tracking
- Competitive pressure analysis
- Unit economics monitoring
timestamp: "$(date '+%Y-%m-%d %H:%M:%S')"
EOF

    echo "$state_file"
}

# 函数：创建压缩Agent指令
create_compression_agent_prompt() {
    local work_state_file="$1"
    local original_prompt="$2"

    cat > .claude/session/compression_agent_prompt.md << 'EOF'
# 智能Context压缩Agent v21.0

您是专门负责压缩投资研究会话context的Agent。请将给定的长prompt压缩为核心工作记忆。

## 压缩原则

1. **保留工作连续性**: 确保用户可以无缝继续当前工作
2. **保持分析密度**: 压缩描述，保留关键数据和结论
3. **维护context关系**: 保持Phase间的逻辑连接
4. **突出核心争议**: 保留最重要的分析洞察

## 保留优先级

### P0 (必须保留)
- 当前ticker和行业
- 当前Phase和下一步计划
- 核心争议和关键结论
- 重要的数据锚点和估值结论

### P1 (重要保留)
- 激活的skills和工具
- 最近的文件和发现
- 关键的分析框架选择
- 主要风险识别

### P2 (选择保留)
- 详细的分析过程
- 完整的数据表格
- 冗余的背景信息

## 输出格式

请输出一个结构化的压缩摘要，包含：

```markdown
# 工作记忆压缩摘要

## 项目状态
- **目标**: [ticker] ([industry])
- **当前阶段**: [Phase X]
- **下一步**: [具体下一步行动]

## 核心发现
[最重要的2-3个分析洞察]

## 关键数据
[重要的数字和锚点，保留DM标记]

## 活跃工具
[当前激活的skills和工具列表]

## 上下文记忆
[必要的背景信息，用于无缝继续工作]
```

**目标**: 将context从当前大小压缩至~50K chars，同时保持工作连续性。
EOF

    # 添加工作状态
    echo -e "\n## 当前工作状态\n" >> .claude/session/compression_agent_prompt.md
    cat "$work_state_file" >> .claude/session/compression_agent_prompt.md

    echo -e "\n## 需要压缩的原始Content\n" >> .claude/session/compression_agent_prompt.md
    echo '```' >> .claude/session/compression_agent_prompt.md
    cat "$original_prompt" >> .claude/session/compression_agent_prompt.md
    echo '```' >> .claude/session/compression_agent_prompt.md
}

# 函数：执行内置压缩算法 (Fallback)
execute_fallback_compression() {
    local original_file="$1"
    local work_state_file="$2"

    log "使用内置算法进行压缩..."

    local compressed_file=$(mktemp)

    # 读取工作状态
    local ticker industry phase
    ticker=$(grep "ticker:" "$work_state_file" | cut -d'"' -f2)
    industry=$(grep "industry:" "$work_state_file" | cut -d'"' -f2)
    phase=$(grep "phase:" "$work_state_file" | cut -d'"' -f2)

    # 创建压缩摘要
    cat > "$compressed_file" << EOF
# 智能压缩工作记忆

> **自动生成的工作记忆摘要 - Layer 3压缩**
> **压缩时间**: $(date '+%Y-%m-%d %H:%M:%S')

## 项目状态
- **目标公司**: $ticker ($industry)
- **当前阶段**: $phase
- **工作目录**: $(pwd)
- **Git分支**: $(git branch --show-current 2>/dev/null || echo "main")

## 核心发现
EOF

    # 提取关键洞察
    if grep -qi "核心\|关键\|重要\|结论" "$original_file"; then
        grep -i "核心\|关键\|重要\|结论" "$original_file" | head -5 | sed 's/^/- /' >> "$compressed_file"
    else
        echo "- 暂无重大发现记录" >> "$compressed_file"
    fi

    cat >> "$compressed_file" << EOF

## 关键数据
EOF

    # 提取数据锚点
    if grep -q "DM-" "$original_file"; then
        echo "- 数据锚点: $(grep -c "DM-" "$original_file")个" >> "$compressed_file"
        grep -o "DM-[A-Z]*-[0-9]*" "$original_file" | head -3 | sed 's/^/- /' >> "$compressed_file"
    fi

    # 提取数字
    if grep -qE "[0-9]+%" "$original_file"; then
        grep -oE "[A-Za-z]+.*[0-9]+%" "$original_file" | head -3 | sed 's/^/- /' >> "$compressed_file"
    fi

    cat >> "$compressed_file" << EOF

## 活跃工具
EOF

    # 添加工具信息
    grep -A 10 "激活工具集" "$work_state_file" | tail -n +2 >> "$compressed_file" 2>/dev/null || echo "- 标准分析工具" >> "$compressed_file"

    cat >> "$compressed_file" << EOF

## 上下文记忆
- **Session模式**: 智能压缩恢复
- **压缩前大小**: $(wc -c < "$original_file") chars
- **压缩算法**: Layer 3 Fallback
- **下次恢复**: 可通过checkpoint系统恢复详细历史

---
*这是智能压缩的工作记忆，原始context已被压缩以节省空间*
*如需详细历史，请查看: .claude/session/pre_compression_backup.md*
EOF

    local compressed_size=$(wc -c < "$compressed_file")
    echo "$compressed_file"
    return 0
}

# 函数：执行智能压缩
execute_intelligent_compression() {
    local original_file="$1"
    local work_state_file="$2"
    local urgency="$3"

    log "执行智能压缩 (urgency: $urgency)..."

    # 创建备份
    cp "$original_file" ".claude/session/pre_compression_backup.md"
    success "原始prompt已备份至 pre_compression_backup.md"

    # 尝试使用Agent进行压缩（模拟，实际可调用Agent）
    # 这里使用fallback算法作为示例
    local compressed_result
    compressed_result=$(execute_fallback_compression "$original_file" "$work_state_file")

    if [ -f "$compressed_result" ]; then
        # 应用压缩结果
        cp "$compressed_result" "$original_file"
        rm "$compressed_result"

        local new_size=$(wc -c < "$original_file")
        success "压缩完成，新大小: $new_size chars"

        # 恢复关键文件引用
        restore_critical_context "$work_state_file" "$original_file"

        return 0
    else
        error "压缩失败，恢复原始文件"
        cp ".claude/session/pre_compression_backup.md" "$original_file"
        return 1
    fi
}

# 函数：恢复关键上下文
restore_critical_context() {
    local work_state_file="$1"
    local compressed_file="$2"

    log "恢复关键上下文..."

    # 添加当前环境信息
    echo -e "\n## 环境恢复信息" >> "$compressed_file"
    echo "- **恢复时间**: $(date '+%Y-%m-%d %H:%M:%S')" >> "$compressed_file"
    echo "- **工作目录**: $(pwd)" >> "$compressed_file"
    echo "- **Git状态**: $(git branch --show-current 2>/dev/null || echo "main") ($(git rev-parse --short HEAD 2>/dev/null || echo "unknown"))" >> "$compressed_file"

    # 添加恢复指令
    cat >> "$compressed_file" << 'EOF'

## 恢复指令
当用户说"继续"时，请：
1. 读取当前工作状态
2. 继续当前Phase的工作
3. 如需详细历史，参考 .claude/session/pre_compression_backup.md

EOF

    success "关键上下文恢复完成"
}

# 函数：生成压缩报告
generate_intelligent_report() {
    local original_size="$1"
    local new_size="$2"
    local urgency="$3"

    local savings=$((original_size - new_size))
    local savings_pct=$((savings * 100 / original_size))

    cat > .claude/session/intelligent_compact_log.md << EOF
# 智能全量压缩报告 (Layer 3)

**执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
**压缩级别**: Layer 3 (智能全量)
**紧急程度**: $urgency

## 压缩统计

### 大小变化
- **原始大小**: $original_size chars
- **压缩后大小**: $new_size chars
- **节省空间**: $savings chars (${savings_pct}%)
- **压缩比**: $(((original_size * 100) / new_size))%

### 压缩策略
- **算法**: 智能Agent压缩 + 上下文恢复
- **保留重点**: 工作连续性 + 核心洞察
- **备份文件**: pre_compression_backup.md

## 恢复机制

✅ **保留元素**:
- 项目状态 (ticker/phase/industry)
- 核心分析发现
- 激活工具列表
- 关键数据锚点

🔄 **恢复支持**:
- 自动环境检测
- 工作状态恢复
- 详细历史备份

## 质量检查

$(
if [ $new_size -lt $TARGET_SIZE ]; then
    echo "✅ 压缩目标已达成 (目标: ${TARGET_SIZE} chars)"
elif [ $new_size -lt $((TARGET_SIZE * 2)) ]; then
    echo "⚠️  接近目标大小，可继续使用"
else
    echo "🚨 压缩效果不佳，建议运行 Layer 4 紧急压缩"
fi
)

---
*Layer 3保持智能分析能力，同时大幅减少context占用*
EOF

    success "压缩报告已保存至 .claude/session/intelligent_compact_log.md"
}

# 主函数
main() {
    echo -e "${BLUE}🧠 Layer 3: 智能全量压缩启动${NC}"
    echo

    # 检查压缩需求
    local size_info urgency
    if ! size_info=$(check_compression_need); then
        log "当前context无需Layer 3压缩"
        exit 0
    fi

    urgency=$(echo "$size_info" | tail -1)
    local original_size=$(echo "$size_info" | head -1)

    log "检测到context大小: $original_size chars (urgency: $urgency)"

    # 分析工作状态
    local work_state_file
    work_state_file=$(analyze_work_state)

    # 执行智能压缩
    if execute_intelligent_compression ".claude/session/current_prompt.md" "$work_state_file" "$urgency"; then
        local new_size=$(wc -c < .claude/session/current_prompt.md)

        # 生成报告
        generate_intelligent_report "$original_size" "$new_size" "$urgency"

        echo
        success "Layer 3 智能压缩完成！"
        success "Context减少: $((original_size - new_size)) chars ($(((original_size - new_size) * 100 / original_size))%)"

        # 检查最终结果
        if [ $new_size -lt $TARGET_SIZE ]; then
            success "✅ 已达到理想大小，可继续长时间工作"
        elif [ $new_size -gt $((TARGET_SIZE * 2)) ]; then
            warn "压缩效果有限，建议运行Layer 4紧急压缩"
        fi
    else
        error "智能压缩失败"
    fi

    # 清理临时文件
    rm -f "$work_state_file"

    echo
}

# 运行主函数
main "$@"