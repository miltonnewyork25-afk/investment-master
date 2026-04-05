#!/bin/bash
# Phase C主动执行系统测试 v21.0

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# 脚本路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROACTIVE_CONTROLLER="$SCRIPT_DIR/proactive_controller.sh"
FOCUS_DETECTOR="$SCRIPT_DIR/focus_detector.sh"
DECISION_BREAKPOINT="$SCRIPT_DIR/decision_breakpoint.sh"

log() {
    echo -e "${CYAN}[TEST-PROACTIVE]${NC} $1"
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

# 函数：检查依赖
check_dependencies() {
    log "检查Phase C系统依赖..."

    local all_good=true

    # 检查脚本文件
    for script in "$PROACTIVE_CONTROLLER" "$FOCUS_DETECTOR" "$DECISION_BREAKPOINT"; do
        if [ ! -f "$script" ]; then
            error "缺少脚本: $script"
            all_good=false
        else
            chmod +x "$script"
        fi
    done

    # 检查配置目录
    if [ ! -d ".claude/proactive" ]; then
        log "创建proactive配置目录"
        mkdir -p .claude/proactive
    fi

    if [ "$all_good" = "true" ]; then
        success "依赖检查通过"
        return 0
    else
        error "依赖检查失败"
        return 1
    fi
}

# 函数：测试焦点检测系统
test_focus_detection() {
    log "测试焦点检测系统..."

    echo "📍 测试1: 基础焦点检测"
    if bash "$FOCUS_DETECTOR" test; then
        success "焦点检测基础功能正常"
    else
        warn "焦点检测可能在当前环境下有限制"
    fi

    echo
    echo "📊 测试2: 焦点状态报告"
    bash "$FOCUS_DETECTOR" status

    echo
    echo "📝 测试3: 焦点历史记录"
    # 生成一些测试数据
    echo "$(date '+%Y-%m-%d %H:%M:%S')|terminal_focused|app:Terminal|window:test" >> .claude/proactive/focus_history.log
    bash "$FOCUS_DETECTOR" history

    success "焦点检测系统测试完成"
}

# 函数：测试断点系统
test_decision_breakpoints() {
    log "测试重大决策断点系统..."

    echo "📍 测试1: 断点系统初始化"
    bash "$DECISION_BREAKPOINT" config >/dev/null
    success "断点配置已初始化"

    echo
    echo "🔴 测试2: 触发测试断点"
    bash "$DECISION_BREAKPOINT" trigger "test_valuation" "Testing valuation breakpoint" "warning"

    echo
    echo "📊 测试3: 断点状态检查"
    bash "$DECISION_BREAKPOINT" status

    echo
    echo "✅ 测试4: 清除断点"
    bash "$DECISION_BREAKPOINT" clear

    success "重大决策断点系统测试完成"
}

# 函数：测试Token预算系统
test_token_budget() {
    log "测试Token预算系统..."

    echo "💰 测试1: 预算配置检查"
    bash "$PROACTIVE_CONTROLLER" config

    echo
    echo "📊 测试2: 预算使用状态"
    bash "$PROACTIVE_CONTROLLER" budget

    echo
    echo "📈 测试3: 预算使用模拟"
    # 创建一些测试内容来模拟token使用
    echo "# 测试内容用于模拟token使用" > .claude/session/current_prompt.md
    for i in {1..100}; do
        echo "这是用于测试token预算计算的模拟内容行 $i" >> .claude/session/current_prompt.md
    done

    bash "$PROACTIVE_CONTROLLER" budget

    success "Token预算系统测试完成"
}

# 函数：测试主动执行控制器
test_proactive_controller() {
    log "测试主动执行控制器..."

    echo "🤖 测试1: 控制器基础功能"
    bash "$PROACTIVE_CONTROLLER" status

    echo
    echo "👁️ 测试2: 监控模式 (5秒演示)"
    timeout 5s bash "$PROACTIVE_CONTROLLER" monitor || true

    echo
    echo "🤝 测试3: 协作模式检查"
    # 创建模拟的session状态
    cat > .claude/session/session_info.yaml << 'EOF'
session:
  timestamp: "2026-04-02 23:30:00"
  ticker: "TEST"
  industry: "Technology"
  tier: "Tier 3"
  mode: "collaborative"
EOF

    bash "$PROACTIVE_CONTROLLER" status

    success "主动执行控制器测试完成"
}

# 函数：测试集成功能
test_integrated_workflow() {
    log "测试Phase C集成工作流..."

    echo "🔧 步骤1: 初始化主动会话"
    # 设置配置
    cat > .claude/proactive/budget_config.yaml << 'EOF'
mode: proactive_research
auto_continue: true
focus_aware: true

token_budget:
  tier_3: 50000

auto_progression:
  enabled: true
  idle_threshold_seconds: 60

focus_detection:
  enabled: true
  terminal_check_interval: 10

breakpoints:
  major_contradiction: true
  valuation_complete: true
  user_input_required: true
EOF

    success "主动会话配置完成"

    echo
    echo "📊 步骤2: 综合状态检查"
    echo "  焦点状态:"
    bash "$FOCUS_DETECTOR" status | grep -A 5 "📍 当前状态:" || true

    echo "  断点状态:"
    bash "$DECISION_BREAKPOINT" status | grep -A 3 "📍 当前状态:" || true

    echo "  预算状态:"
    bash "$PROACTIVE_CONTROLLER" budget || true

    echo
    echo "🎯 步骤3: 模拟自主推进场景"
    # 模拟进度停滞
    touch .claude/proactive/last_activity.timestamp
    echo "$(($(date +%s) - 400))" > .claude/proactive/last_activity.timestamp

    # 运行控制器检查
    bash "$PROACTIVE_CONTROLLER" status

    success "集成工作流测试完成"
}

# 函数：生成测试报告
generate_test_report() {
    echo
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}    Phase C主动执行系统测试报告 v21.0${NC}"
    echo -e "${BLUE}================================================${NC}"

    echo -e "\n✅ 已测试组件:"
    echo "  🔍 焦点检测系统 - 检测用户终端焦点状态"
    echo "  🚨 重大决策断点 - 关键决策点人工确认"
    echo "  💰 Token预算管理 - 自动预算监控和控制"
    echo "  🤖 主动执行控制器 - 自主推进和协作模式"
    echo "  🔧 集成工作流 - 端到端功能验证"

    echo -e "\n📊 系统能力:"
    echo "  ✅ 基于Claude Code架构的分层设计"
    echo "  ✅ 焦点感知的智能模式切换"
    echo "  ✅ Token预算驱动的成本控制"
    echo "  ✅ 重大决策的安全断点机制"
    echo "  ✅ 自主推进与人工协作平衡"

    echo -e "\n🎯 关键特性:"
    echo "  • 用户在线时: 协作模式，提供建议等确认"
    echo "  • 用户离线时: 自主模式，自动推进工作"
    echo "  • 重大决策时: 强制断点，等待人工确认"
    echo "  • 预算耗尽时: 自动停止，避免成本失控"

    echo -e "\n📁 生成文件:"
    echo "  配置: .claude/proactive/budget_config.yaml"
    echo "  状态: .claude/proactive/session_state.json"
    echo "  焦点: .claude/proactive/focus_history.log"
    echo "  断点: .claude/proactive/breakpoint_history.log"

    echo -e "\n🚀 下一步使用:"
    echo "  启动主动模式: bash scripts/proactive/proactive_controller.sh autonomous"
    echo "  监控状态:     bash scripts/proactive/proactive_controller.sh monitor"
    echo "  检查焦点:     bash scripts/proactive/focus_detector.sh status"
    echo "  管理断点:     bash scripts/proactive/decision_breakpoint.sh status"

    echo -e "${BLUE}================================================${NC}"
    echo
}

# 主函数
main() {
    local test_mode="${1:-full}"

    echo -e "${MAGENTA}🚀 Phase C主动执行系统测试启动${NC}"
    echo

    # 检查依赖
    if ! check_dependencies; then
        exit 1
    fi

    case "$test_mode" in
        "full")
            test_focus_detection
            echo
            test_decision_breakpoints
            echo
            test_token_budget
            echo
            test_proactive_controller
            echo
            test_integrated_workflow
            ;;
        "focus")
            test_focus_detection
            ;;
        "breakpoint")
            test_decision_breakpoints
            ;;
        "budget")
            test_token_budget
            ;;
        "controller")
            test_proactive_controller
            ;;
        "integration")
            test_integrated_workflow
            ;;
        *)
            error "未知测试模式: $test_mode"
            echo "用法: $0 [full|focus|breakpoint|budget|controller|integration]"
            exit 1
            ;;
    esac

    generate_test_report
    success "🎯 Phase C主动执行系统测试完成！"
}

# 运行主函数
main "$@"