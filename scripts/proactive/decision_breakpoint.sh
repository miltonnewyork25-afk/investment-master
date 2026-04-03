#!/bin/bash
# 重大决策断点系统 v21.0
# 确保关键决策点需要人工确认

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# 配置路径
BREAKPOINT_CONFIG=".claude/proactive/breakpoint_config.yaml"
BREAKPOINT_LOG=".claude/proactive/breakpoint_history.log"
ACTIVE_BREAKPOINT=".claude/proactive/breakpoint_triggered.flag"

log() {
    echo -e "${CYAN}[BREAKPOINT]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

critical() {
    echo -e "${RED}[CRITICAL]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# 函数：初始化断点配置
init_breakpoint_config() {
    mkdir -p .claude/proactive

    if [ ! -f "$BREAKPOINT_CONFIG" ]; then
        cat > "$BREAKPOINT_CONFIG" << 'EOF'
# 重大决策断点配置 v21.0

# 估值相关断点
valuation_breakpoints:
  rating_assignment: true      # 评级分配
  target_price_setting: true  # 目标价设定
  valuation_method_choice: true # 估值方法选择
  dcf_assumptions: true       # DCF关键假设

# 投资决策断点
investment_breakpoints:
  recommendation_change: true  # 投资建议变更
  risk_rating_change: true   # 风险评级变更
  portfolio_sizing: true     # 仓位建议
  exit_strategy: true        # 退出策略

# 操作断点
operational_breakpoints:
  git_commit: true           # Git提交操作
  report_publish: true       # 报告发布
  external_api_calls: false # 外部API调用
  file_deletion: true       # 文件删除

# 分析断点
analytical_breakpoints:
  major_contradiction: true  # 重大矛盾发现
  assumption_change: true    # 关键假设变更
  data_quality_issues: true # 数据质量问题
  methodology_change: true  # 方法论变更

# 协作断点
collaboration_breakpoints:
  multi_agent_launch: false # 多Agent启动
  skill_execution: false    # 重要skill执行
  user_input_required: true # 明确需要用户输入
  session_handover: true    # 会话交接

# 全局设置
global_settings:
  auto_recovery: true        # 自动恢复机制
  timeout_seconds: 1800     # 30分钟超时
  notification_enabled: true # 启用通知
EOF
        log "断点配置已初始化"
    fi
}

# 函数：读取断点配置
load_breakpoint_config() {
    local breakpoint_type="$1"

    if [ ! -f "$BREAKPOINT_CONFIG" ]; then
        init_breakpoint_config
    fi

    # 简化的YAML解析
    local section="${breakpoint_type}_breakpoints"
    if grep -A 20 "$section:" "$BREAKPOINT_CONFIG" | grep -q "$breakpoint_type:"; then
        local enabled
        enabled=$(grep -A 20 "$section:" "$BREAKPOINT_CONFIG" | grep "$breakpoint_type:" | cut -d: -f2 | xargs)
        if [ "$enabled" = "true" ]; then
            return 0
        else
            return 1
        fi
    fi

    # 如果配置中没有找到，默认为启用
    return 0
}

# 函数：触发断点
trigger_breakpoint() {
    local breakpoint_type="$1"
    local context="$2"
    local severity="${3:-normal}"

    # 记录断点触发
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "$timestamp|$breakpoint_type|$severity|$context" >> "$BREAKPOINT_LOG"

    # 创建活跃断点标志
    cat > "$ACTIVE_BREAKPOINT" << EOF
type: $breakpoint_type
context: $context
severity: $severity
timestamp: $timestamp
auto_recovery: $(grep "auto_recovery:" "$BREAKPOINT_CONFIG" | cut -d: -f2 | xargs || echo "true")
timeout: $(grep "timeout_seconds:" "$BREAKPOINT_CONFIG" | cut -d: -f2 | xargs || echo "1800")
EOF

    case "$severity" in
        "critical")
            critical "🚨 关键断点触发: $breakpoint_type"
            critical "上下文: $context"
            critical "自主执行已暂停，等待用户确认"
            ;;
        "warning")
            warn "⚠️ 警告断点触发: $breakpoint_type"
            warn "上下文: $context"
            warn "建议用户审查决策"
            ;;
        *)
            log "📍 断点触发: $breakpoint_type"
            log "上下文: $context"
            log "等待用户确认"
            ;;
    esac

    return 0
}

# 函数：检查活跃断点
check_active_breakpoint() {
    if [ ! -f "$ACTIVE_BREAKPOINT" ]; then
        return 1
    fi

    local breakpoint_type context severity timestamp
    breakpoint_type=$(grep "type:" "$ACTIVE_BREAKPOINT" | cut -d: -f2 | xargs)
    context=$(grep "context:" "$ACTIVE_BREAKPOINT" | cut -d: -f2- | xargs)
    severity=$(grep "severity:" "$ACTIVE_BREAKPOINT" | cut -d: -f2 | xargs)
    timestamp=$(grep "timestamp:" "$ACTIVE_BREAKPOINT" | cut -d: -f2- | xargs)

    echo "active_breakpoint:true"
    echo "type:$breakpoint_type"
    echo "context:$context"
    echo "severity:$severity"
    echo "timestamp:$timestamp"

    return 0
}

# 函数：解除断点
clear_breakpoint() {
    local confirmation="${1:-manual}"

    if [ ! -f "$ACTIVE_BREAKPOINT" ]; then
        log "无活跃断点需要清除"
        return 1
    fi

    # 记录解除信息
    local breakpoint_type
    breakpoint_type=$(grep "type:" "$ACTIVE_BREAKPOINT" | cut -d: -f2 | xargs)
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "$timestamp|breakpoint_cleared|$confirmation|$breakpoint_type" >> "$BREAKPOINT_LOG"

    # 删除活跃断点标志
    rm "$ACTIVE_BREAKPOINT"

    success "断点已清除 ($confirmation)"
    log "自主执行可以继续"

    return 0
}

# 函数：自动超时处理
handle_breakpoint_timeout() {
    if [ ! -f "$ACTIVE_BREAKPOINT" ]; then
        return 1
    fi

    local timeout_seconds auto_recovery
    timeout_seconds=$(grep "timeout:" "$ACTIVE_BREAKPOINT" | cut -d: -f2 | xargs || echo "1800")
    auto_recovery=$(grep "auto_recovery:" "$ACTIVE_BREAKPOINT" | cut -d: -f2 | xargs || echo "true")

    # 检查超时
    local breakpoint_time current_time
    breakpoint_time=$(grep "timestamp:" "$ACTIVE_BREAKPOINT" | cut -d: -f2- | xargs)
    breakpoint_timestamp=$(date -d "$breakpoint_time" +%s 2>/dev/null || date -j -f "%Y-%m-%d %H:%M:%S" "$breakpoint_time" +%s 2>/dev/null || echo "0")
    current_time=$(date +%s)

    if [ $((current_time - breakpoint_timestamp)) -gt $timeout_seconds ]; then
        if [ "$auto_recovery" = "true" ]; then
            warn "断点超时，启用自动恢复"
            clear_breakpoint "auto_timeout"
            return 0
        else
            critical "断点已超时，但自动恢复被禁用"
            return 1
        fi
    fi

    return 1
}

# 函数：检查特定断点类型
check_breakpoint() {
    local breakpoint_category="$1"
    local breakpoint_type="$2"
    local context="$3"
    local severity="${4:-normal}"

    # 检查断点是否启用
    if ! load_breakpoint_config "$breakpoint_type"; then
        log "断点 $breakpoint_type 已禁用，跳过"
        return 1
    fi

    # 触发断点
    trigger_breakpoint "$breakpoint_type" "$context" "$severity"

    return 0
}

# 函数：生成断点报告
generate_breakpoint_report() {
    echo
    echo -e "${BLUE}=====================================>${NC}"
    echo -e "${BLUE}    重大决策断点报告 v21.0${NC}"
    echo -e "${BLUE}=====================================>${NC}"

    # 当前断点状态
    echo -e "\n📍 当前状态:"
    if breakpoint_info=$(check_active_breakpoint); then
        echo "$breakpoint_info" | while IFS= read -r line; do
            local key=${line%%:*}
            local value=${line##*:}
            case "$key" in
                "active_breakpoint")
                    echo "  🚨 活跃断点: 是"
                    ;;
                "type")
                    echo "  类型: $value"
                    ;;
                "context")
                    echo "  上下文: $value"
                    ;;
                "severity")
                    echo "  严重程度: $value"
                    ;;
                "timestamp")
                    echo "  触发时间: $value"
                    ;;
            esac
        done

        # 检查超时
        if handle_breakpoint_timeout; then
            echo "  ⏰ 状态: 已自动恢复"
        else
            echo "  ⏰ 状态: 等待用户确认"
        fi
    else
        echo "  ✅ 无活跃断点"
    fi

    # 断点历史
    echo -e "\n📊 断点历史:"
    if [ -f "$BREAKPOINT_LOG" ]; then
        echo "  最近5次断点:"
        tail -n 5 "$BREAKPOINT_LOG" | while IFS='|' read -r timestamp type severity context; do
            echo "    $timestamp - $type ($severity)"
        done
    else
        echo "  暂无断点历史"
    fi

    # 配置状态
    echo -e "\n⚙️  配置状态:"
    if [ -f "$BREAKPOINT_CONFIG" ]; then
        echo "  配置文件: 存在"
        echo "  自动恢复: $(grep "auto_recovery:" "$BREAKPOINT_CONFIG" | cut -d: -f2 | xargs || echo "未配置")"
        echo "  超时设置: $(grep "timeout_seconds:" "$BREAKPOINT_CONFIG" | cut -d: -f2 | xargs || echo "未配置")s"
    else
        echo "  配置文件: 不存在"
    fi

    echo -e "${BLUE}=====================================>${NC}"
    echo
}

# 主函数
main() {
    local action="${1:-status}"

    echo -e "${CYAN}📍 重大决策断点系统 v21.0${NC}"

    # 确保配置存在
    init_breakpoint_config

    case "$action" in
        "status"|"check")
            generate_breakpoint_report
            ;;
        "trigger")
            local breakpoint_type="${2:-user_input_required}"
            local context="${3:-Manual trigger test}"
            local severity="${4:-normal}"
            check_breakpoint "manual" "$breakpoint_type" "$context" "$severity"
            ;;
        "clear"|"confirm")
            clear_breakpoint "user_confirmed"
            ;;
        "timeout")
            if handle_breakpoint_timeout; then
                success "断点超时处理完成"
            else
                log "无超时断点或自动恢复被禁用"
            fi
            ;;
        "history")
            if [ -f "$BREAKPOINT_LOG" ]; then
                echo "断点历史记录:"
                cat "$BREAKPOINT_LOG"
            else
                echo "暂无断点历史"
            fi
            ;;
        "config")
            if [ -f "$BREAKPOINT_CONFIG" ]; then
                echo "当前断点配置:"
                cat "$BREAKPOINT_CONFIG"
            else
                echo "断点配置不存在"
            fi
            ;;
        "test")
            log "测试断点系统..."
            check_breakpoint "test" "test_breakpoint" "System test" "warning"
            sleep 2
            clear_breakpoint "test_completed"
            ;;
        *)
            echo "用法: $0 [status|trigger|clear|timeout|history|config|test]"
            echo "  status   - 显示断点状态"
            echo "  trigger  - 触发测试断点"
            echo "  clear    - 清除当前断点"
            echo "  timeout  - 处理断点超时"
            echo "  history  - 查看断点历史"
            echo "  config   - 显示配置"
            echo "  test     - 测试断点系统"
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"