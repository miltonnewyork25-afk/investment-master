#!/bin/bash
# Layer 2: Session摘要压缩 v21.0
# 保留最近30K token，将早期历史压缩为session_memory

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置参数
KEEP_TOKEN_LIMIT=30000
CHAR_TO_TOKEN_RATIO=4  # 粗略估计：4 chars = 1 token
KEEP_CHAR_LIMIT=$((KEEP_TOKEN_LIMIT * CHAR_TO_TOKEN_RATIO))
MIN_COMPRESS_SIZE=50000  # 最小触发压缩的大小

log() {
    echo -e "${BLUE}[SESSION-COMPACT]${NC} $1"
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

# 函数：检测当前context大小
check_context_size() {
    if [ ! -f ".claude/session/current_prompt.md" ]; then
        echo "0"
        return 1
    fi

    local size=$(wc -c < .claude/session/current_prompt.md)
    echo "$size"

    if [ $size -lt $MIN_COMPRESS_SIZE ]; then
        return 1
    fi

    return 0
}

# 函数：分析prompt结构
analyze_prompt_structure() {
    local prompt_file="$1"

    log "分析prompt结构..."

    # 查找SESSION BOUNDARY
    local boundary_line
    boundary_line=$(grep -n "SESSION BOUNDARY" "$prompt_file" || echo "0:")

    if [[ "$boundary_line" == "0:" ]]; then
        error "未找到SESSION BOUNDARY标记"
    fi

    local boundary_num=${boundary_line%%:*}
    local static_size=$(head -n $((boundary_num - 1)) "$prompt_file" | wc -c)
    local dynamic_size=$(tail -n +$((boundary_num + 1)) "$prompt_file" | wc -c)

    echo "static_end:$((boundary_num - 1))"
    echo "dynamic_start:$((boundary_num + 1))"
    echo "static_size:$static_size"
    echo "dynamic_size:$dynamic_size"
}

# 函数：创建session memory摘要
create_session_memory() {
    local prompt_file="$1"
    local keep_lines="$2"

    log "创建session memory摘要..."

    # 提取需要压缩的内容（早期的动态部分）
    local temp_content=$(mktemp)
    local analysis
    analysis=$(analyze_prompt_structure "$prompt_file")

    local dynamic_start
    dynamic_start=$(echo "$analysis" | grep "dynamic_start:" | cut -d: -f2)

    # 计算要保留的行数
    local total_dynamic_lines
    total_dynamic_lines=$(tail -n +$dynamic_start "$prompt_file" | wc -l)
    local compress_lines=$((total_dynamic_lines - keep_lines))

    if [ $compress_lines -le 0 ]; then
        log "动态内容不足，无需压缩"
        rm "$temp_content"
        return 1
    fi

    # 提取要压缩的内容
    tail -n +$dynamic_start "$prompt_file" | head -n $compress_lines > "$temp_content"

    # 使用简化的摘要算法（避免依赖外部Agent）
    local memory_summary=$(mktemp)

    cat > "$memory_summary" << 'EOF'
# Session Memory 摘要

> **自动生成的早期会话摘要，用于context压缩**

## 早期会话要点

EOF

    # 提取关键信息：ticker、phase、重要发现
    if grep -q "Target Ticker" "$temp_content"; then
        echo "- **目标公司**: $(grep "Target Ticker" "$temp_content" | head -1 | cut -d: -f2 | xargs)" >> "$memory_summary"
    fi

    if grep -q "Current Phase" "$temp_content"; then
        echo "- **分析阶段**: $(grep "Current Phase" "$temp_content" | head -1 | cut -d: -f2 | xargs)" >> "$memory_summary"
    fi

    # 查找数据发现
    if grep -qi "DM-" "$temp_content"; then
        echo "- **数据锚点**: 包含$(grep -ci "DM-" "$temp_content")个数据锚点" >> "$memory_summary"
    fi

    # 查找关键洞察
    if grep -qi "关键\|重要\|核心\|发现" "$temp_content"; then
        echo "- **关键发现**: $(grep -i "关键\|重要\|核心\|发现" "$temp_content" | head -3 | sed 's/^/  - /')" >> "$memory_summary"
    fi

    # 添加压缩元信息
    cat >> "$memory_summary" << EOF

## 压缩元信息
- **原始大小**: $(wc -c < "$temp_content") chars
- **压缩时间**: $(date '+%Y-%m-%d %H:%M:%S')
- **压缩算法**: Layer 2 Session摘要
- **保留策略**: 最近 ${KEEP_TOKEN_LIMIT} tokens

---
*这是早期会话的压缩摘要，完整历史已被压缩以节省context空间*
EOF

    local summary_size=$(wc -c < "$memory_summary")
    local original_size=$(wc -c < "$temp_content")
    local compression_ratio=$((original_size * 100 / summary_size))

    success "Session摘要生成完成"
    log "压缩比: ${compression_ratio}% (${original_size} → ${summary_size} chars)"

    # 保存摘要
    cp "$memory_summary" ".claude/session/session_memory.md"

    # 清理临时文件
    rm "$temp_content" "$memory_summary"

    echo "$compress_lines"  # 返回压缩的行数
    return 0
}

# 函数：重构prompt文件
rebuild_prompt() {
    local prompt_file="$1"
    local keep_lines="$2"
    local compressed_lines="$3"

    log "重构压缩后的prompt..."

    local temp_new_prompt=$(mktemp)
    local analysis
    analysis=$(analyze_prompt_structure "$prompt_file")

    local static_end dynamic_start
    static_end=$(echo "$analysis" | grep "static_end:" | cut -d: -f2)
    dynamic_start=$(echo "$analysis" | grep "dynamic_start:" | cut -d: -f2)

    # 重新组装prompt
    # 1. 静态部分
    head -n $static_end "$prompt_file" > "$temp_new_prompt"

    # 2. SESSION BOUNDARY
    echo "" >> "$temp_new_prompt"
    echo "================================================== SESSION BOUNDARY ==================================================" >> "$temp_new_prompt"
    echo "" >> "$temp_new_prompt"

    # 3. Session Memory摘要
    if [ -f ".claude/session/session_memory.md" ]; then
        cat ".claude/session/session_memory.md" >> "$temp_new_prompt"
        echo "" >> "$temp_new_prompt"
        echo "---" >> "$temp_new_prompt"
        echo "" >> "$temp_new_prompt"
    fi

    # 4. 保留的最近内容
    tail -n +$dynamic_start "$prompt_file" | tail -n $keep_lines >> "$temp_new_prompt"

    # 替换原文件
    mv "$temp_new_prompt" "$prompt_file"

    local new_size=$(wc -c < "$prompt_file")
    success "Prompt重构完成，新大小: $new_size chars"
}

# 函数：生成压缩报告
generate_compression_report() {
    local original_size="$1"
    local new_size="$2"
    local compressed_lines="$3"

    local savings=$((original_size - new_size))
    local savings_pct=$((savings * 100 / original_size))

    cat > .claude/session/session_compact_log.md << EOF
# Session摘要压缩报告 (Layer 2)

**执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
**压缩级别**: Layer 2 (Session摘要)

## 压缩统计

### 大小变化
- **原始大小**: $original_size chars
- **压缩后大小**: $new_size chars
- **节省空间**: $savings chars (${savings_pct}%)

### 内容处理
- **压缩行数**: $compressed_lines lines
- **保留策略**: 最近 ${KEEP_TOKEN_LIMIT} tokens
- **摘要文件**: .claude/session/session_memory.md

## 压缩策略

✅ **保留内容**:
- 完整静态prompt (缓存层)
- 最近 ${KEEP_CHAR_LIMIT} chars 的动态内容
- Session boundary标记

🗜️ **压缩内容**:
- 早期会话历史 → Session Memory摘要
- 重复的环境信息
- 过时的工具输出

## Context状态

$(
if [ $new_size -gt 100000 ]; then
    echo "⚠️  仍然较大，建议运行 Layer 3 压缩"
elif [ $new_size -gt 150000 ]; then
    echo "🚨 严重过大，强烈建议运行 Layer 3 压缩"
else
    echo "✅ Context大小已恢复正常"
fi
)

---
*Layer 2保持工作记忆完整性，同时显著减少context使用*
EOF

    success "压缩报告已保存至 .claude/session/session_compact_log.md"
}

# 主函数
main() {
    echo -e "${BLUE}🗜️  Layer 2: Session摘要压缩启动${NC}"
    echo

    # 检查context大小
    local original_size
    if ! original_size=$(check_context_size); then
        log "当前context大小 ($original_size chars) 小于最小压缩阈值"
        log "无需运行Layer 2压缩"
        exit 0
    fi

    log "检测到context大小: $original_size chars (>${MIN_COMPRESS_SIZE})"
    log "开始Layer 2压缩..."

    # 计算保留的行数
    local keep_lines=$((KEEP_CHAR_LIMIT / 80))  # 假设每行平均80字符

    # 创建session memory
    local compressed_lines
    if ! compressed_lines=$(create_session_memory ".claude/session/current_prompt.md" "$keep_lines"); then
        warn "无足够内容进行压缩，退出"
        exit 0
    fi

    # 重构prompt
    rebuild_prompt ".claude/session/current_prompt.md" "$keep_lines" "$compressed_lines"

    # 检查压缩结果
    local new_size
    new_size=$(wc -c < .claude/session/current_prompt.md)

    # 生成报告
    generate_compression_report "$original_size" "$new_size" "$compressed_lines"

    echo
    success "Layer 2 Session摘要压缩完成！"
    success "Context减少: $((original_size - new_size)) chars ($(((original_size - new_size) * 100 / original_size))%)"

    # 检查是否需要进一步压缩
    if [ $new_size -gt 100000 ]; then
        warn "压缩后大小仍较大，建议运行Layer 3智能压缩"
    fi

    echo
}

# 运行主函数
main "$@"