#!/bin/bash
# Layer 1: 微压缩 (Micro Compact) v21.0
# 基于Claude Code cache_edits概念 - 删除旧tool_result，保持缓存命中

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置参数
KEEP_RECENT_TOOLS=5
STAGING_BACKUP_COUNT=3
DATA_FILE_AGE_HOURS=2

log() {
    echo -e "${BLUE}[MICRO-COMPACT]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 函数：检测context压力
detect_context_pressure() {
    # 检查是否存在大量staging文件
    if [ -d "staging" ]; then
        local staging_count=$(find staging -name "*.md" -o -name "*.txt" -o -name "*.yaml" 2>/dev/null | wc -l)
        if [ $staging_count -gt 20 ]; then
            echo "staging_overflow"
            return 0
        fi
    fi

    # 检查reports目录下的data文件
    if find reports -name "data" -type d 2>/dev/null | xargs -I {} find {} -name "*.txt" -o -name "*.json" -o -name "*.yaml" 2>/dev/null | wc -l | grep -q "[2-9][0-9]\|[0-9]{3,}"; then
        echo "data_accumulation"
        return 0
    fi

    # 检查.claude/session目录大小
    if [ -d ".claude/session" ]; then
        local session_size=$(du -sk .claude/session 2>/dev/null | cut -f1)
        if [ "$session_size" -gt 1024 ]; then  # 1MB
            echo "session_bloat"
            return 0
        fi
    fi

    echo "normal"
    return 1
}

# 函数：清理旧的staging文件
cleanup_staging() {
    log "清理旧staging文件..."

    if [ ! -d "staging" ]; then
        log "staging目录不存在，跳过"
        return 0
    fi

    # 保留最近的文件，删除其他
    find staging -name "*.md" -o -name "*.txt" -o -name "*.yaml" | \
    sort -t'_' -k2 -r | \
    tail -n +$((STAGING_BACKUP_COUNT + 1)) | \
    while read -r file; do
        if [ -f "$file" ]; then
            warn "删除旧staging文件: $file"
            rm "$file"
        fi
    done

    local remaining=$(find staging -name "*.md" -o -name "*.txt" -o -name "*.yaml" 2>/dev/null | wc -l)
    success "Staging清理完成，保留 $remaining 个文件"
}

# 函数：清理过时的data文件
cleanup_data_files() {
    log "清理过时的data文件..."

    local cleaned_count=0

    # 查找超过指定小时数的data文件
    while IFS= read -r -d '' file; do
        # 检查文件是否为临时数据文件
        if [[ "$file" =~ \.(tmp|temp|cache|intermediate)$ ]]; then
            warn "删除临时文件: $file"
            rm "$file"
            ((cleaned_count++))
        elif [[ "$file" =~ data.*\.(txt|json|yaml)$ ]]; then
            # 检查文件年龄
            if [ "$(stat -f%c "$file" 2>/dev/null || stat -c%Y "$file" 2>/dev/null)" ]; then
                local file_age=$(( $(date +%s) - $(stat -f%c "$file" 2>/dev/null || stat -c%Y "$file" 2>/dev/null) ))
                local age_hours=$(( file_age / 3600 ))

                if [ $age_hours -gt $DATA_FILE_AGE_HOURS ]; then
                    warn "删除过时数据文件 (${age_hours}h old): $file"
                    rm "$file"
                    ((cleaned_count++))
                fi
            fi
        fi
    done < <(find reports -name "data" -type d -exec find {} -name "*.txt" -o -name "*.json" -o -name "*.yaml" -o -name "*.tmp" -o -name "*.temp" -o -name "*.cache" -o -name "*.intermediate" \; -print0 2>/dev/null)

    if [ $cleaned_count -gt 0 ]; then
        success "清理了 $cleaned_count 个过时数据文件"
    else
        log "未发现需要清理的过时数据文件"
    fi
}

# 函数：压缩session历史
compress_session_history() {
    log "压缩session历史..."

    if [ ! -d ".claude/session" ]; then
        log "session目录不存在，跳过"
        return 0
    fi

    # 清理旧的临时文件
    find .claude/session -name "*.tmp" -o -name "temp_*" -mtime +1 -delete 2>/dev/null || true

    # 压缩旧的prompt文件
    if [ -f ".claude/session/current_prompt.md" ]; then
        local prompt_size=$(wc -c < .claude/session/current_prompt.md)
        if [ $prompt_size -gt 50000 ]; then  # 50K chars
            warn "当前prompt过大 (${prompt_size} chars)，建议运行Layer 2压缩"
        fi
    fi

    success "Session历史压缩完成"
}

# 函数：生成压缩报告
generate_compact_report() {
    local pressure="$1"

    cat > .claude/session/micro_compact_log.md << EOF
# 微压缩报告 (Layer 1)

**执行时间**: $(date '+%Y-%m-%d %H:%M:%S')
**触发原因**: $pressure
**压缩级别**: Layer 1 (微压缩)

## 清理统计

### Staging目录
- 保留文件: $(find staging -name "*.md" -o -name "*.txt" -o -name "*.yaml" 2>/dev/null | wc -l) 个
- 目标大小: ≤ $STAGING_BACKUP_COUNT 个备份文件

### Data文件
- 保留策略: 删除超过 ${DATA_FILE_AGE_HOURS}小时 的临时文件
- 总data文件: $(find reports -name "data" -type d -exec find {} -name "*.txt" -o -name "*.json" -o -name "*.yaml" \; 2>/dev/null | wc -l) 个

### Session历史
- 当前prompt大小: $([ -f ".claude/session/current_prompt.md" ] && wc -c < .claude/session/current_prompt.md || echo "0") chars
- 建议阈值: <50K chars

## 下一步建议

$(
if [ -f ".claude/session/current_prompt.md" ]; then
    local prompt_size=$(wc -c < .claude/session/current_prompt.md)
    if [ $prompt_size -gt 50000 ]; then
        echo "⚠️  当前prompt过大，建议运行 Layer 2 压缩"
    elif [ $prompt_size -gt 100000 ]; then
        echo "🚨 当前prompt严重过大，建议运行 Layer 3 压缩"
    else
        echo "✅ 当前context大小正常"
    fi
else
    echo "✅ 无需进一步压缩"
fi
)

---
*Layer 1微压缩保持缓存效率，仅清理明确的垃圾文件*
EOF

    success "压缩报告已保存至 .claude/session/micro_compact_log.md"
}

# 主函数
main() {
    echo -e "${BLUE}🧹 Layer 1: 微压缩启动${NC}"
    echo

    # 检测context压力
    local pressure
    pressure=$(detect_context_pressure)

    log "Context压力检测: $pressure"

    # 执行清理任务
    cleanup_staging
    cleanup_data_files
    compress_session_history

    # 生成报告
    generate_compact_report "$pressure"

    echo
    success "Layer 1微压缩完成！"

    # 压力评估和建议
    case "$pressure" in
        "staging_overflow")
            warn "检测到staging溢出，建议清理或运行Layer 2压缩"
            ;;
        "data_accumulation")
            warn "检测到数据积累，已自动清理旧文件"
            ;;
        "session_bloat")
            warn "检测到session膨胀，建议运行Layer 2压缩"
            ;;
        "normal")
            log "Context状态正常，预防性清理完成"
            ;;
    esac

    echo
}

# 运行主函数
main "$@"