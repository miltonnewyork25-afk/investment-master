#!/bin/bash
# 主动执行控制器 v21.0
# 基于Claude Code PROACTIVE模式的自主推进引擎

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
CONFIG_FILE=".claude/proactive/budget_config.yaml"
SESSION_STATE=".claude/proactive/session_state.json"
PROGRESS_LOG=".claude/proactive/progress.log"

# 默认配置
TOKEN_BUDGET=200000
IDLE_THRESHOLD=300
PROGRESS_INTERVAL=60
MAX_RETRIES=3

log() {
    echo -e "${CYAN}[PROACTIVE]${NC} $1" | tee -a "$PROGRESS_LOG"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$PROGRESS_LOG"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$PROGRESS_LOG"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$PROGRESS_LOG"
}

critical() {
    echo -e "${MAGENTA}[CRITICAL]${NC} $1" | tee -a "$PROGRESS_LOG"
}

# 函数：读取配置
load_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        warn "配置文件不存在，使用默认配置"
        return 1
    fi

    # 简化的YAML解析（移除注释）
    if grep -q "token_budget:" "$CONFIG_FILE"; then
        local tier="${1:-tier_3}"
        TOKEN_BUDGET=$(grep -A 5 "token_budget:" "$CONFIG_FILE" | grep "$tier:" | cut -d: -f2 | cut -d'#' -f1 | xargs || echo "200000")
    fi

    if grep -q "idle_threshold_seconds:" "$CONFIG_FILE"; then
        IDLE_THRESHOLD=$(grep "idle_threshold_seconds:" "$CONFIG_FILE" | cut -d: -f2 | cut -d'#' -f1 | xargs || echo "300")
    fi

    if grep -q "progress_check_interval:" "$CONFIG_FILE"; then
        PROGRESS_INTERVAL=$(grep "progress_check_interval:" "$CONFIG_FILE" | cut -d: -f2 | cut -d'#' -f1 | xargs || echo "60")
    fi

    log "配置加载: Budget=$TOKEN_BUDGET, Idle=$IDLE_THRESHOLD, Interval=$PROGRESS_INTERVAL"
}

# 函数：检测用户焦点状态
detect_user_focus() {
    # macOS焦点检测
    if command -v osascript >/dev/null 2>&1; then
        local active_app
        active_app=$(osascript -e 'tell application "System Events" to return name of first application process whose frontmost is true' 2>/dev/null || echo "unknown")

        # 检测终端相关应用
        case "$active_app" in
            "Terminal"|"iTerm 2"|"iTerm2"|"Alacritty"|"Kitty"|"WezTerm")
                echo "present"
                return 0
                ;;
            "Visual Studio Code"|"Code"|"vim"|"nvim")
                echo "coding"
                return 0
                ;;
            *)
                echo "absent"
                return 1
                ;;
        esac
    else
        # Linux/其他系统的简化检测
        if [ -n "${SSH_TTY:-}" ] || [ -n "${DISPLAY:-}" ]; then
            echo "present"
        else
            echo "absent"
        fi
    fi
}

# 函数：检测进度停滞
detect_progress_stagnation() {
    local last_activity_file=".claude/proactive/last_activity.timestamp"
    local current_time=$(date +%s)

    if [ ! -f "$last_activity_file" ]; then
        echo "$current_time" > "$last_activity_file"
        echo "no_baseline"
        return 1
    fi

    local last_activity
    last_activity=$(cat "$last_activity_file")
    local idle_duration=$((current_time - last_activity))

    if [ $idle_duration -gt $IDLE_THRESHOLD ]; then
        echo "stagnant:$idle_duration"
        return 0
    else
        echo "active:$idle_duration"
        return 1
    fi
}

# 函数：更新活动时间戳
update_activity() {
    echo "$(date +%s)" > ".claude/proactive/last_activity.timestamp"
}

# 函数：估算已使用的token
estimate_token_usage() {
    local total_chars=0

    # 累计session中的字符数
    if [ -f ".claude/session/current_prompt.md" ]; then
        total_chars=$((total_chars + $(wc -c < .claude/session/current_prompt.md)))
    fi

    # 累计staging中的文件
    if [ -d "staging" ]; then
        find staging -name "*.md" -o -name "*.txt" -o -name "*.yaml" 2>/dev/null | while read -r file; do
            if [ -f "$file" ]; then
                local file_chars
                file_chars=$(wc -c < "$file" 2>/dev/null || echo "0")
                total_chars=$((total_chars + file_chars))
            fi
        done 2>/dev/null || true
    fi

    # 粗略估算：4字符=1token
    local estimated_tokens=$((total_chars / 4))
    echo "$estimated_tokens"
}

# 函数：检查预算状态
check_budget_status() {
    local used_tokens
    used_tokens=$(estimate_token_usage)
    local usage_pct=$((used_tokens * 100 / TOKEN_BUDGET))

    echo "used:$used_tokens"
    echo "budget:$TOKEN_BUDGET"
    echo "usage_pct:$usage_pct"

    if [ $usage_pct -gt 95 ]; then
        echo "status:critical"
        return 2
    elif [ $usage_pct -gt 80 ]; then
        echo "status:warning"
        return 1
    else
        echo "status:normal"
        return 0
    fi
}

# 函数：检测当前工作状态
detect_work_state() {
    local state="unknown"
    local ticker="unknown"
    local phase="Phase 0"

    # 从session信息检测
    if [ -f ".claude/session/session_info.yaml" ]; then
        ticker=$(grep "ticker:" .claude/session/session_info.yaml | cut -d'"' -f2 2>/dev/null || echo "unknown")
    fi

    if [ -f ".claude/session/current_prompt.md" ]; then
        phase=$(grep -i "Current Phase\|Phase [0-9]" .claude/session/current_prompt.md | head -1 | grep -o "Phase [0-9]" 2>/dev/null || echo "Phase 0")
    fi

    # 检测工作类型
    if [ -f ".claude/session/current_prompt.md" ] && [ "$(wc -c < .claude/session/current_prompt.md)" -gt 5000 ]; then
        state="research_active"
    elif [ -d "staging" ] && [ "$(find staging -name "*.md" 2>/dev/null | wc -l)" -gt 0 ]; then
        state="analysis_pending"
    elif [ "$ticker" != "unknown" ]; then
        state="project_active"
    else
        state="idle"
    fi

    echo "ticker:$ticker"
    echo "phase:$phase"
    echo "state:$state"
}

# 函数：生成自主推进建议
generate_progression_suggestion() {
    local work_info="$1"

    local ticker phase state
    ticker=$(echo "$work_info" | grep "ticker:" | cut -d: -f2)
    phase=$(echo "$work_info" | grep "phase:" | cut -d: -f2)
    state=$(echo "$work_info" | grep "state:" | cut -d: -f2)

    case "$state" in
        "research_active")
            case "$phase" in
                "Phase 0"|"Phase 1")
                    echo "continue_analysis|继续当前Phase的深度分析"
                    ;;
                "Phase 2"|"Phase 3")
                    echo "proceed_next_phase|推进到下一个Phase"
                    ;;
                "Phase 4")
                    echo "initiate_red_team|启动红队验证"
                    ;;
                "Phase 5")
                    echo "finalize_report|完成报告组装"
                    ;;
                *)
                    echo "assess_progress|评估当前进度"
                    ;;
            esac
            ;;
        "analysis_pending")
            echo "process_staging|处理staging中的分析结果"
            ;;
        "project_active")
            echo "resume_work|恢复项目工作"
            ;;
        "idle")
            echo "await_instruction|等待用户指令"
            ;;
        *)
            echo "diagnose_state|诊断当前状态"
            ;;
    esac
}

# 函数：执行自主推进
execute_autonomous_action() {
    local suggestion="$1"
    local action=${suggestion%%|*}
    local description=${suggestion##*|}

    log "自主推进: $description"

    case "$action" in
        "continue_analysis")
            echo "🔄 建议继续当前分析..."
            echo "   - 深化当前Phase的研究"
            echo "   - 补充关键数据锚点"
            echo "   - 强化因果推理链"
            ;;
        "proceed_next_phase")
            echo "⏭️  建议推进到下一Phase..."
            echo "   - 当前Phase分析基本完成"
            echo "   - 准备启动下一阶段"
            echo "   - 确认必要的依赖项"
            ;;
        "initiate_red_team")
            echo "🔴 建议启动红队验证..."
            echo "   - 执行对抗性分析"
            echo "   - 验证关键假设"
            echo "   - 识别盲点和偏差"
            ;;
        "finalize_report")
            echo "📝 建议完成报告组装..."
            echo "   - 执行Phase 5组装"
            echo "   - 运行质量门控"
            echo "   - 生成最终报告"
            ;;
        "process_staging")
            echo "📁 建议处理pending分析..."
            echo "   - 整合staging中的结果"
            echo "   - 合成分析发现"
            echo "   - 更新工作记忆"
            ;;
        "await_instruction")
            echo "⏸️  等待用户指令..."
            echo "   - 无活跃项目，待命中"
            echo "   - 可以启动新分析"
            echo "   - 或恢复已保存工作"
            ;;
        *)
            echo "❓ 状态不明确，建议手动干预"
            ;;
    esac

    # 更新活动时间戳
    update_activity

    return 0
}

# 函数：检查重大决策断点
check_decision_breakpoints() {
    # 检查是否遇到需要用户确认的重大决策
    local breakpoint_file=".claude/proactive/breakpoint_triggered.flag"

    if [ -f "$breakpoint_file" ]; then
        local breakpoint_reason
        breakpoint_reason=$(cat "$breakpoint_file")
        rm "$breakpoint_file"  # 清理标志文件

        critical "检测到重大决策断点: $breakpoint_reason"
        critical "自主模式暂停，等待用户确认"
        return 0
    fi

    return 1
}

# 函数：生成进度报告
generate_progress_report() {
    local budget_info work_info

    budget_info=$(check_budget_status)
    work_info=$(detect_work_state)

    local used_tokens usage_pct ticker phase state
    used_tokens=$(echo "$budget_info" | grep "used:" | cut -d: -f2)
    usage_pct=$(echo "$budget_info" | grep "usage_pct:" | cut -d: -f2)
    ticker=$(echo "$work_info" | grep "ticker:" | cut -d: -f2)
    phase=$(echo "$work_info" | grep "phase:" | cut -d: -f2)
    state=$(echo "$work_info" | grep "state:" | cut -d: -f2)

    echo
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo -e "${BLUE}    主动执行状态报告 v21.0${NC}"
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo -e "时间:         $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "项目:         $ticker"
    echo -e "阶段:         $phase"
    echo -e "状态:         $state"
    echo
    echo -e "Token使用:    $used_tokens / $TOKEN_BUDGET (${usage_pct}%)"
    echo -e "焦点状态:     $(detect_user_focus)"
    echo -e "进度状态:     $(detect_progress_stagnation)"
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo
}

# 主循环函数
run_proactive_loop() {
    local mode="${1:-monitor}"
    local duration="${2:-3600}"  # 默认运行1小时

    log "启动主动执行循环 (模式: $mode, 时长: ${duration}s)"

    local start_time=$(date +%s)
    local end_time=$((start_time + duration))

    while [ "$(date +%s)" -lt "$end_time" ]; do
        # 检查重大决策断点
        if check_decision_breakpoints; then
            break
        fi

        # 检查预算状态
        local budget_status
        budget_status=$(check_budget_status | tail -1 | cut -d: -f2)

        if [ "$budget_status" = "critical" ]; then
            critical "Token预算严重不足，自动停止"
            break
        elif [ "$budget_status" = "warning" ]; then
            warn "Token预算接近上限，建议保存工作"
        fi

        # 检测用户焦点
        local focus_status
        focus_status=$(detect_user_focus)

        # 根据模式和焦点状态决定行为
        case "$mode" in
            "monitor")
                # 仅监控，不自主执行
                generate_progress_report
                ;;
            "autonomous")
                if [ "$focus_status" = "present" ]; then
                    # 用户在线，切换到协作模式
                    log "检测到用户在线，切换到协作模式"
                    generate_progress_report
                else
                    # 用户离线，执行自主推进
                    local work_info progress_status
                    work_info=$(detect_work_state)
                    progress_status=$(detect_progress_stagnation)

                    if [[ "$progress_status" =~ ^stagnant ]]; then
                        local suggestion
                        suggestion=$(generate_progression_suggestion "$work_info")
                        execute_autonomous_action "$suggestion"
                    fi
                fi
                ;;
            "collaborative")
                # 协作模式，提供建议但不自主执行
                local work_info progress_status
                work_info=$(detect_work_state)
                progress_status=$(detect_progress_stagnation)

                generate_progress_report

                if [[ "$progress_status" =~ ^stagnant ]]; then
                    local suggestion
                    suggestion=$(generate_progression_suggestion "$work_info")
                    log "检测到进度停滞，建议: ${suggestion##*|}"
                fi
                ;;
        esac

        # 等待下次检查
        sleep "$PROGRESS_INTERVAL"
    done

    success "主动执行循环完成"
}

# 主函数
main() {
    local action="${1:-monitor}"
    local tier="${2:-tier_3}"

    echo -e "${CYAN}🤖 主动执行控制器 v21.0${NC}"

    # 创建必要目录
    mkdir -p .claude/proactive

    # 加载配置
    load_config "$tier"

    case "$action" in
        "monitor")
            log "监控模式: 仅观察，不执行自主操作"
            generate_progress_report
            ;;
        "autonomous")
            log "自主模式: 用户离线时自动推进工作"
            run_proactive_loop "autonomous" 3600
            ;;
        "collaborative")
            log "协作模式: 提供建议，等待用户确认"
            run_proactive_loop "collaborative" 1800
            ;;
        "status")
            generate_progress_report
            ;;
        "budget")
            local budget_info
            budget_info=$(check_budget_status)
            echo "$budget_info"
            ;;
        "config")
            echo "当前配置:"
            echo "  Token Budget: $TOKEN_BUDGET"
            echo "  Idle Threshold: $IDLE_THRESHOLD s"
            echo "  Progress Interval: $PROGRESS_INTERVAL s"
            ;;
        *)
            echo "用法: $0 [monitor|autonomous|collaborative|status|budget|config] [tier_1|tier_2|tier_3]"
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"