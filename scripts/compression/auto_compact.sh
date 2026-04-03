#!/bin/bash
# 智能压缩控制器 v21.0
# 自动检测context压力并选择最适合的压缩层级

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 压缩阈值配置
LAYER1_THRESHOLD=80000   # 80K  - 微压缩
LAYER2_THRESHOLD=120000  # 120K - Session摘要
LAYER3_THRESHOLD=180000  # 180K - 智能压缩
LAYER4_THRESHOLD=250000  # 250K - 紧急压缩

# 脚本路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAYER1_SCRIPT="$SCRIPT_DIR/micro_compact.sh"
LAYER2_SCRIPT="$SCRIPT_DIR/session_memory_compact.sh"
LAYER3_SCRIPT="$SCRIPT_DIR/intelligent_compact.sh"
LAYER4_SCRIPT="$SCRIPT_DIR/emergency_compact.sh"

log() {
    echo -e "${CYAN}[AUTO-COMPACT]${NC} $1"
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

# 函数：检测当前context状态
analyze_context_state() {
    local prompt_file=".claude/session/current_prompt.md"

    if [ ! -f "$prompt_file" ]; then
        echo "size:0"
        echo "status:no_prompt"
        return 1
    fi

    local size=$(wc -c < "$prompt_file")
    local status

    if [ $size -lt $LAYER1_THRESHOLD ]; then
        status="normal"
    elif [ $size -lt $LAYER2_THRESHOLD ]; then
        status="layer1_needed"
    elif [ $size -lt $LAYER3_THRESHOLD ]; then
        status="layer2_needed"
    elif [ $size -lt $LAYER4_THRESHOLD ]; then
        status="layer3_needed"
    else
        status="layer4_emergency"
    fi

    echo "size:$size"
    echo "status:$status"

    # 分析context组成
    local static_lines dynamic_lines
    if grep -q "SESSION BOUNDARY" "$prompt_file"; then
        local boundary_line
        boundary_line=$(grep -n "SESSION BOUNDARY" "$prompt_file" | head -1 | cut -d: -f1)
        static_lines=$((boundary_line - 1))
        dynamic_lines=$(tail -n +$((boundary_line + 1)) "$prompt_file" | wc -l)
    else
        static_lines=0
        dynamic_lines=$(wc -l < "$prompt_file")
    fi

    echo "static_lines:$static_lines"
    echo "dynamic_lines:$dynamic_lines"

    return 0
}

# 函数：显示context分析报告
show_context_analysis() {
    local analysis="$1"

    local size status static_lines dynamic_lines
    size=$(echo "$analysis" | grep "size:" | cut -d: -f2)
    status=$(echo "$analysis" | grep "status:" | cut -d: -f2)
    static_lines=$(echo "$analysis" | grep "static_lines:" | cut -d: -f2)
    dynamic_lines=$(echo "$analysis" | grep "dynamic_lines:" | cut -d: -f2)

    echo
    echo -e "${BLUE}=====================================>${NC}"
    echo -e "${BLUE}    Context状态分析 v21.0${NC}"
    echo -e "${BLUE}=====================================>${NC}"
    echo -e "当前大小:    ${size} chars"
    echo -e "静态内容:    ${static_lines} lines"
    echo -e "动态内容:    ${dynamic_lines} lines"
    echo

    # 状态判断和建议
    case "$status" in
        "normal")
            echo -e "状态评估:    ${GREEN}✅ 正常${NC} (<${LAYER1_THRESHOLD})"
            echo -e "建议操作:    无需压缩"
            ;;
        "layer1_needed")
            echo -e "状态评估:    ${YELLOW}⚠️  轻度膨胀${NC} (${LAYER1_THRESHOLD}-${LAYER2_THRESHOLD})"
            echo -e "建议操作:    Layer 1 微压缩"
            ;;
        "layer2_needed")
            echo -e "状态评估:    ${YELLOW}⚠️  中度膨胀${NC} (${LAYER2_THRESHOLD}-${LAYER3_THRESHOLD})"
            echo -e "建议操作:    Layer 2 Session摘要"
            ;;
        "layer3_needed")
            echo -e "状态评估:    ${RED}🔶 重度膨胀${NC} (${LAYER3_THRESHOLD}-${LAYER4_THRESHOLD})"
            echo -e "建议操作:    Layer 3 智能压缩"
            ;;
        "layer4_emergency")
            echo -e "状态评估:    ${RED}🚨 紧急状态${NC} (>${LAYER4_THRESHOLD})"
            echo -e "建议操作:    Layer 4 紧急压缩"
            ;;
        "no_prompt")
            echo -e "状态评估:    ${BLUE}ℹ️  无prompt文件${NC}"
            echo -e "建议操作:    无需操作"
            ;;
    esac

    echo -e "${BLUE}=====================================>${NC}"
    echo
}

# 函数：执行自动压缩
execute_auto_compression() {
    local analysis="$1"
    local force_layer="${2:-}"

    local status
    status=$(echo "$analysis" | grep "status:" | cut -d: -f2)

    # 如果指定了强制层级
    if [ -n "$force_layer" ]; then
        status="layer${force_layer}_needed"
        warn "强制执行Layer $force_layer压缩"
    fi

    local script_to_run=""
    local layer_name=""

    case "$status" in
        "normal"|"no_prompt")
            log "Context状态正常，无需压缩"
            return 0
            ;;
        "layer1_needed")
            script_to_run="$LAYER1_SCRIPT"
            layer_name="Layer 1 (微压缩)"
            ;;
        "layer2_needed")
            script_to_run="$LAYER2_SCRIPT"
            layer_name="Layer 2 (Session摘要)"
            ;;
        "layer3_needed")
            script_to_run="$LAYER3_SCRIPT"
            layer_name="Layer 3 (智能压缩)"
            ;;
        "layer4_needed"|"layer4_emergency")
            script_to_run="$LAYER4_SCRIPT"
            layer_name="Layer 4 (紧急压缩)"
            ;;
    esac

    if [ -z "$script_to_run" ]; then
        error "未知压缩状态: $status"
        return 1
    fi

    # 检查脚本文件是否存在
    if [ ! -f "$script_to_run" ]; then
        error "压缩脚本不存在: $script_to_run"
        return 1
    fi

    # 添加执行权限
    chmod +x "$script_to_run"

    log "执行 $layer_name..."
    echo

    # 执行压缩脚本
    if bash "$script_to_run"; then
        success "$layer_name 执行完成"
        return 0
    else
        error "$layer_name 执行失败"
        return 1
    fi
}

# 函数：显示压缩选项菜单
show_compression_menu() {
    local analysis="$1"

    local size
    size=$(echo "$analysis" | grep "size:" | cut -d: -f2)

    echo
    echo -e "${CYAN}压缩选项：${NC}"
    echo "  ${BLUE}1.${NC} 自动选择最佳压缩层级"
    echo "  ${BLUE}2.${NC} Layer 1 - 微压缩 (清理垃圾文件)"
    echo "  ${BLUE}3.${NC} Layer 2 - Session摘要 (压缩早期历史)"
    echo "  ${BLUE}4.${NC} Layer 3 - 智能压缩 (Agent全量摘要)"
    echo "  ${BLUE}5.${NC} Layer 4 - 紧急压缩 (大幅删除内容)"
    echo "  ${BLUE}6.${NC} 仅分析，不执行压缩"
    echo "  ${BLUE}0.${NC} 退出"
    echo
}

# 函数：交互式压缩
interactive_compression() {
    local analysis="$1"

    while true; do
        show_compression_menu "$analysis"
        echo -n "请选择操作 [1-6,0]: "
        read -r choice

        case "$choice" in
            "1")
                log "执行自动压缩..."
                execute_auto_compression "$analysis"
                break
                ;;
            "2")
                log "强制执行Layer 1..."
                execute_auto_compression "$analysis" "1"
                break
                ;;
            "3")
                log "强制执行Layer 2..."
                execute_auto_compression "$analysis" "2"
                break
                ;;
            "4")
                log "强制执行Layer 3..."
                execute_auto_compression "$analysis" "3"
                break
                ;;
            "5")
                log "强制执行Layer 4..."
                execute_auto_compression "$analysis" "4"
                break
                ;;
            "6")
                log "仅显示分析结果，不执行压缩"
                break
                ;;
            "0")
                log "退出压缩控制器"
                exit 0
                ;;
            *)
                warn "无效选择，请重新输入"
                ;;
        esac
    done
}

# 主函数
main() {
    local mode="${1:-auto}"
    local force_layer="${2:-}"

    echo -e "${CYAN}🤖 智能压缩控制器 v21.0${NC}"

    # 分析context状态
    local analysis
    if ! analysis=$(analyze_context_state); then
        error "Context状态分析失败"
        exit 1
    fi

    # 显示分析结果
    show_context_analysis "$analysis"

    # 根据模式执行操作
    case "$mode" in
        "auto")
            log "自动模式：选择最佳压缩策略"
            execute_auto_compression "$analysis" "$force_layer"
            ;;
        "interactive"|"menu")
            log "交互模式：手动选择压缩策略"
            interactive_compression "$analysis"
            ;;
        "analyze"|"check")
            log "分析模式：仅显示状态，不执行压缩"
            ;;
        "force")
            local force_layer_param="${force_layer:-}"
            if [ -n "$force_layer_param" ]; then
                log "强制模式：执行Layer $force_layer_param"
                execute_auto_compression "$analysis" "$force_layer_param"
            else
                error "强制模式需要指定层级: force [1-4]"
                exit 1
            fi
            ;;
        *)
            error "未知模式: $mode"
            echo "用法: $0 [auto|interactive|analyze|force] [layer_number]"
            exit 1
            ;;
    esac

    echo
    success "压缩控制器任务完成"
}

# 帮助函数
show_help() {
    cat << EOF
智能压缩控制器 v21.0 - 基于Claude Code架构的4层压缩系统

用法:
  $0 [mode] [options]

模式:
  auto          自动选择最佳压缩层级 (默认)
  interactive   交互式菜单选择
  analyze       仅分析context状态
  force [1-4]   强制执行指定层级压缩

压缩层级:
  Layer 1 (80K+)   微压缩 - 清理垃圾文件，保持缓存效率
  Layer 2 (120K+)  Session摘要 - 压缩早期历史为摘要
  Layer 3 (180K+)  智能压缩 - Agent全量摘要+工作记忆恢复
  Layer 4 (250K+)  紧急压缩 - 按Phase删除，保护最近内容

示例:
  $0                    # 自动压缩
  $0 interactive        # 交互式选择
  $0 analyze            # 仅查看状态
  $0 force 2            # 强制Layer 2压缩

基于Claude Code启示的渐进式压缩，最大化context利用效率。
EOF
}

# 检查参数
if [[ "${1:-}" == "--help" ]] || [[ "${1:-}" == "-h" ]]; then
    show_help
    exit 0
fi

# 运行主函数
main "$@"