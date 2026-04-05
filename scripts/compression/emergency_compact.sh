#!/bin/bash
# Layer 4: 紧急压缩 v21.0
# 最后兜底机制：按Phase组删除，保护最近3个Phase

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# 配置参数
EMERGENCY_SIZE_LIMIT=250000  # 250K = 紧急状态
PROTECT_RECENT_PHASES=3      # 保护最近的Phase数量
MAX_RETRIES=3               # 最大重试次数
MIN_KEEP_SIZE=20000        # 最小保留大小

log() {
    echo -e "${MAGENTA}[EMERGENCY-COMPACT]${NC} $1"
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

critical() {
    echo -e "${RED}[CRITICAL]${NC} $1"
}

# 函数：检测紧急压缩需求
check_emergency_need() {
    if [ ! -f ".claude/session/current_prompt.md" ]; then
        echo "no_prompt"
        return 1
    fi

    local size=$(wc -c < .claude/session/current_prompt.md)
    echo "$size"

    if [ $size -gt $EMERGENCY_SIZE_LIMIT ]; then
        echo "emergency"
        return 0
    else
        echo "normal"
        return 1
    fi
}

# 函数：分析Phase结构
analyze_phase_structure() {
    local prompt_file="$1"

    log "分析Phase结构..."

    local phase_analysis=$(mktemp)

    # 查找所有Phase标记
    grep -n -i "phase\|阶段" "$prompt_file" > "$phase_analysis" 2>/dev/null || echo "" > "$phase_analysis"

    # 查找session boundary
    local boundary_line
    boundary_line=$(grep -n "SESSION BOUNDARY" "$prompt_file" | head -1 | cut -d: -f1 2>/dev/null || echo "0")

    # 分析Phase分布
    local phases_found=0
    local latest_phases=()

    while IFS=':' read -r line_num content; do
        if [[ "$content" =~ [Pp]hase.*[0-9] ]]; then
            phases_found=$((phases_found + 1))
            latest_phases+=("$line_num:$content")
        fi
    done < "$phase_analysis"

    echo "boundary_line:$boundary_line"
    echo "phases_found:$phases_found"
    echo "phase_lines:${latest_phases[*]:-}"

    rm "$phase_analysis"
}

# 函数：识别保护区域
identify_protection_zones() {
    local prompt_file="$1"

    log "识别关键保护区域..."

    local analysis
    analysis=$(analyze_phase_structure "$prompt_file")

    local boundary_line phases_found
    boundary_line=$(echo "$analysis" | grep "boundary_line:" | cut -d: -f2)
    phases_found=$(echo "$analysis" | grep "phases_found:" | cut -d: -f2)

    # 计算保护区域
    local total_lines
    total_lines=$(wc -l < "$prompt_file")

    local protect_from_line=$((total_lines - total_lines / 4))  # 保护最后25%

    # 如果有明确的Phase标记，更精确地保护
    local phase_lines
    phase_lines=$(echo "$analysis" | grep "phase_lines:" | cut -d: -f2-)

    if [ -n "$phase_lines" ] && [ "$phase_lines" != "" ]; then
        # 计算最近几个Phase的起始位置
        local recent_phase_start=99999
        for phase_line in $phase_lines; do
            local line_num=${phase_line%%:*}
            if [ "$line_num" -lt "$recent_phase_start" ]; then
                recent_phase_start=$line_num
            fi
        done

        if [ "$recent_phase_start" -lt 99999 ]; then
            protect_from_line=$recent_phase_start
        fi
    fi

    echo "boundary_line:$boundary_line"
    echo "protect_from_line:$protect_from_line"
    echo "total_lines:$total_lines"
    echo "phases_found:$phases_found"
}

# 函数：执行紧急切割
execute_emergency_cut() {
    local prompt_file="$1"
    local cut_percentage="$2"

    log "执行紧急切割 (${cut_percentage}%)..."

    local protection_info
    protection_info=$(identify_protection_zones "$prompt_file")

    local boundary_line protect_from_line total_lines
    boundary_line=$(echo "$protection_info" | grep "boundary_line:" | cut -d: -f2)
    protect_from_line=$(echo "$protection_info" | grep "protect_from_line:" | cut -d: -f2)
    total_lines=$(echo "$protection_info" | grep "total_lines:" | cut -d: -f2)

    # 计算切割范围
    local cut_lines=$(( (total_lines - protect_from_line) * cut_percentage / 100 ))
    local cut_start_line=$(( protect_from_line - cut_lines ))

    # 确保不切割静态区域
    if [ "$cut_start_line" -le "$boundary_line" ]; then
        cut_start_line=$((boundary_line + 1))
        warn "调整切割起点以保护静态区域"
    fi

    # 确保保留最小大小
    local remaining_lines=$((total_lines - cut_lines))
    local estimated_remaining_size=$((remaining_lines * 80))  # 假设每行80字符

    if [ $estimated_remaining_size -lt $MIN_KEEP_SIZE ]; then
        cut_lines=$(( (total_lines * 80 - MIN_KEEP_SIZE) / 80 ))
        warn "调整切割大小以保证最小保留内容"
    fi

    # 创建切割后的文件
    local temp_cut_file=$(mktemp)

    # 保留开头到切割起点
    head -n $((cut_start_line - 1)) "$prompt_file" > "$temp_cut_file"

    # 插入切割标记
    cat >> "$temp_cut_file" << EOF

## 🚨 紧急压缩通知

> **本session经历了Layer 4紧急压缩**
> **切割时间**: $(date '+%Y-%m-%d %H:%M:%S')
> **切割大小**: $cut_lines lines (~${cut_percentage}% content)
> **保护区域**: 最近 $PROTECT_RECENT_PHASES 个Phase + 静态内容

**恢复建议**:
- 如需完整历史，请查看: `.claude/session/emergency_backup.md`
- 建议尽快保存重要发现，避免再次紧急压缩
- 考虑使用 `/clear` 重新开始，或运行前序压缩层

---

EOF

    # 保留保护区域
    tail -n +$protect_from_line "$prompt_file" >> "$temp_cut_file"

    # 替换原文件
    cp "$prompt_file" ".claude/session/emergency_backup.md"
    mv "$temp_cut_file" "$prompt_file"

    local new_size=$(wc -c < "$prompt_file")
    echo "$new_size"
}

# 函数：多轮紧急压缩
execute_multi_round_compression() {
    local prompt_file="$1"

    local original_size=$(wc -c < "$prompt_file")
    log "开始多轮紧急压缩，原始大小: $original_size chars"

    local round=1
    local current_size=$original_size

    while [ $round -le $MAX_RETRIES ] && [ $current_size -gt $EMERGENCY_SIZE_LIMIT ]; do
        warn "第 $round 轮紧急压缩..."

        # 逐步增加切割比例
        local cut_percentage=$((round * 20))  # 20%, 40%, 60%

        local new_size
        new_size=$(execute_emergency_cut "$prompt_file" "$cut_percentage")

        local savings=$((current_size - new_size))
        local savings_pct=$((savings * 100 / current_size))

        log "第 $round 轮完成: $current_size → $new_size chars (${savings_pct}%)"

        current_size=$new_size
        round=$((round + 1))

        # 如果达到目标大小，提前退出
        if [ $current_size -le $EMERGENCY_SIZE_LIMIT ]; then
            break
        fi

        # 避免过度切割
        if [ $current_size -lt $MIN_KEEP_SIZE ]; then
            critical "已达到最小保留大小限制，停止压缩"
            break
        fi
    done

    echo "$current_size"
}

# 函数：创建最小可用prompt
create_minimal_prompt() {
    log "创建最小可用prompt..."

    cat > .claude/session/current_prompt.md << EOF
# 投资研究Agent - 紧急恢复模式

> **系统状态**: 经历Layer 4紧急压缩，当前处于最小工作模式

## 身份
买方研究分析师，面向终端投资者。

## 当前状态
- **工作目录**: $(pwd)
- **Git分支**: $(git branch --show-current 2>/dev/null || echo "main")
- **恢复时间**: $(date '+%Y-%m-%d %H:%M:%S')

## 可用功能
- 基础公司分析
- 数据查询 (MCP工具)
- 文档读取和写入

## 恢复指令
用户可以选择：
1. 从备份恢复: 查看 \`.claude/session/emergency_backup.md\`
2. 重新开始: 指定新的分析目标
3. 继续工作: 基于当前最小状态

## 紧急压缩历史
- **触发原因**: Context超过 ${EMERGENCY_SIZE_LIMIT} chars
- **备份位置**: \`.claude/session/emergency_backup.md\`
- **压缩层级**: Layer 4 (紧急兜底)

---
*建议：尽快决定恢复策略，避免工作中断*
EOF

    local minimal_size=$(wc -c < .claude/session/current_prompt.md)
    success "最小prompt创建完成: $minimal_size chars"
}

# 函数：生成紧急压缩报告
generate_emergency_report() {
    local original_size="$1"
    local final_size="$2"
    local rounds_used="$3"

    local total_savings=$((original_size - final_size))
    local savings_pct=$((total_savings * 100 / original_size))

    cat > .claude/session/emergency_compact_log.md << EOF
# 🚨 紧急压缩报告 (Layer 4)

**执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
**压缩级别**: Layer 4 (紧急兜底)
**紧急程度**: CRITICAL

## 紧急状况

⚠️ **触发条件**: Context超过 ${EMERGENCY_SIZE_LIMIT} chars
🚨 **处理方式**: 多轮渐进式切割
🛡️ **保护策略**: 保护最近 ${PROTECT_RECENT_PHASES} 个Phase + 静态内容

## 压缩统计

### 大小变化
- **原始大小**: $original_size chars
- **最终大小**: $final_size chars
- **节省空间**: $total_savings chars (${savings_pct}%)
- **压缩轮次**: $rounds_used rounds

### 保护机制
- ✅ 静态prompt (身份+原则+框架)
- ✅ 最近Phase内容
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

    critical "紧急压缩报告已保存至 .claude/session/emergency_compact_log.md"
}

# 主函数
main() {
    echo -e "${MAGENTA}🚨 Layer 4: 紧急压缩启动${NC}"
    echo -e "${RED}警告: 这是最后的兜底机制，将大幅删除内容${NC}"
    echo

    # 检查紧急压缩需求
    local size_info urgency
    if ! size_info=$(check_emergency_need); then
        log "当前context无需紧急压缩"
        exit 0
    fi

    urgency=$(echo "$size_info" | tail -1)
    local original_size=$(echo "$size_info" | head -1)

    critical "检测到Context危机！大小: $original_size chars (>${EMERGENCY_SIZE_LIMIT})"
    critical "将执行紧急压缩，可能丢失部分工作历史"

    # 确认用户意图（如果是交互式）
    if [ -t 0 ]; then  # 如果是交互式终端
        echo -e "${YELLOW}继续紧急压缩将删除大量内容，是否继续? [y/N]${NC}"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            log "用户取消紧急压缩"
            exit 0
        fi
    fi

    # 执行多轮紧急压缩
    local final_size rounds_used

    if final_size=$(execute_multi_round_compression ".claude/session/current_prompt.md"); then
        rounds_used=$MAX_RETRIES
    else
        # 如果多轮压缩失败，创建最小prompt
        warn "多轮压缩失败，创建最小可用prompt"
        create_minimal_prompt
        final_size=$(wc -c < .claude/session/current_prompt.md)
        rounds_used="minimal"
    fi

    # 生成报告
    generate_emergency_report "$original_size" "$final_size" "$rounds_used"

    echo
    if [ "$final_size" -le "$EMERGENCY_SIZE_LIMIT" ]; then
        success "🎯 紧急压缩成功！"
        success "Context已恢复至可用状态: $final_size chars"
        echo
        echo -e "${CYAN}下一步建议：${NC}"
        echo -e "  1. 检查工作连续性"
        echo -e "  2. 从备份恢复重要信息（如需）"
        echo -e "  3. 考虑优化工作流程避免再次紧急压缩"
    else
        critical "紧急压缩未能充分减小context"
        critical "建议手动清理或重新开始session"
    fi

    echo
}

# 运行主函数
main "$@"