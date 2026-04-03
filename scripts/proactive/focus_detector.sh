#!/bin/bash
# 焦点感知检测器 v21.0
# 基于Claude Code terminal focus概念

set -euo pipefail

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 配置
FOCUS_LOG=".claude/proactive/focus_history.log"
FOCUS_STATE=".claude/proactive/current_focus.state"

log() {
    echo -e "${CYAN}[FOCUS]${NC} $1"
}

# 函数：检测操作系统类型
detect_os() {
    case "$(uname -s)" in
        Darwin)
            echo "macos"
            ;;
        Linux)
            echo "linux"
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            echo "windows"
            ;;
        *)
            echo "unknown"
            ;;
    esac
}

# 函数：macOS焦点检测
detect_focus_macos() {
    if ! command -v osascript >/dev/null 2>&1; then
        echo "unavailable"
        return 1
    fi

    # 获取前台应用
    local active_app
    active_app=$(osascript -e 'tell application "System Events" to return name of first application process whose frontmost is true' 2>/dev/null || echo "unknown")

    # 获取活动窗口标题
    local window_title
    window_title=$(osascript -e 'tell application "System Events" to return title of front window of first application process whose frontmost is true' 2>/dev/null || echo "")

    # 检测终端相关应用
    case "$active_app" in
        "Terminal"|"iTerm 2"|"iTerm2"|"Alacritty"|"Kitty"|"WezTerm")
            echo "terminal_focused"
            echo "app:$active_app"
            echo "window:$window_title"
            return 0
            ;;
        "Visual Studio Code"|"Code"|"Cursor"|"Sublime Text")
            if [[ "$window_title" =~ .*\.sh$|.*\.py$|.*\.md$ ]]; then
                echo "code_focused"
                echo "app:$active_app"
                echo "window:$window_title"
                return 0
            else
                echo "code_unfocused"
                echo "app:$active_app"
                echo "window:$window_title"
                return 1
            fi
            ;;
        "Safari"|"Chrome"|"Firefox"|"Arc"|"Edge")
            echo "browser_focused"
            echo "app:$active_app"
            echo "window:$window_title"
            return 1
            ;;
        "Slack"|"Discord"|"Telegram"|"WhatsApp")
            echo "communication_focused"
            echo "app:$active_app"
            echo "window:$window_title"
            return 1
            ;;
        *)
            echo "other_focused"
            echo "app:$active_app"
            echo "window:$window_title"
            return 1
            ;;
    esac
}

# 函数：Linux焦点检测
detect_focus_linux() {
    # 检查是否在SSH会话中
    if [ -n "${SSH_TTY:-}" ]; then
        echo "ssh_session"
        echo "app:ssh"
        echo "window:${SSH_TTY}"
        return 0
    fi

    # 检查X11环境
    if [ -n "${DISPLAY:-}" ] && command -v xdotool >/dev/null 2>&1; then
        local window_id active_window_name
        window_id=$(xdotool getwindowfocus 2>/dev/null || echo "0")
        active_window_name=$(xdotool getwindowname "$window_id" 2>/dev/null || echo "unknown")

        case "$active_window_name" in
            *terminal*|*Terminal*|*tmux*|*vim*|*nvim*)
                echo "terminal_focused"
                echo "app:terminal"
                echo "window:$active_window_name"
                return 0
                ;;
            *)
                echo "gui_unfocused"
                echo "app:x11"
                echo "window:$active_window_name"
                return 1
                ;;
        esac
    fi

    # Wayland环境（有限支持）
    if [ -n "${WAYLAND_DISPLAY:-}" ]; then
        echo "wayland_session"
        echo "app:wayland"
        echo "window:unknown"
        return 0  # 假设用户专注
    fi

    # TTY环境
    if [ -t 0 ] && [ -t 1 ]; then
        echo "tty_session"
        echo "app:tty"
        echo "window:$(tty 2>/dev/null || echo "unknown")"
        return 0
    fi

    echo "unknown_environment"
    return 1
}

# 函数：Windows焦点检测（基础版）
detect_focus_windows() {
    # Windows环境下的基础检测
    if command -v powershell.exe >/dev/null 2>&1; then
        local active_window
        active_window=$(powershell.exe -Command 'Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::ComputerName' 2>/dev/null || echo "windows")

        echo "windows_session"
        echo "app:windows"
        echo "window:$active_window"
        return 0
    fi

    echo "windows_unknown"
    return 1
}

# 函数：统一焦点检测
detect_user_focus() {
    local os
    os=$(detect_os)

    case "$os" in
        "macos")
            detect_focus_macos
            ;;
        "linux")
            detect_focus_linux
            ;;
        "windows")
            detect_focus_windows
            ;;
        *)
            echo "unsupported_os"
            echo "app:unknown"
            echo "window:unknown"
            return 1
            ;;
    esac
}

# 函数：分析焦点历史
analyze_focus_patterns() {
    if [ ! -f "$FOCUS_LOG" ]; then
        log "无焦点历史数据"
        return 1
    fi

    local total_entries terminal_focused_entries
    total_entries=$(wc -l < "$FOCUS_LOG")
    terminal_focused_entries=$(grep "terminal_focused\|ssh_session\|tty_session" "$FOCUS_LOG" | wc -l)

    if [ "$total_entries" -gt 0 ]; then
        local focus_percentage=$((terminal_focused_entries * 100 / total_entries))
        echo "focus_history_entries:$total_entries"
        echo "terminal_focus_percentage:$focus_percentage"

        # 最近活动分析
        local recent_entries
        recent_entries=$(tail -n 10 "$FOCUS_LOG")
        if echo "$recent_entries" | grep -q "terminal_focused\|ssh_session\|tty_session"; then
            echo "recent_pattern:active"
        else
            echo "recent_pattern:inactive"
        fi
    else
        echo "focus_history_entries:0"
        echo "terminal_focus_percentage:0"
        echo "recent_pattern:unknown"
    fi
}

# 函数：记录焦点状态
log_focus_state() {
    local focus_result="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    # 确保目录存在
    mkdir -p .claude/proactive

    # 记录到历史日志
    echo "$timestamp|$focus_result" >> "$FOCUS_LOG"

    # 保持日志大小合理（最近1000条）
    if [ "$(wc -l < "$FOCUS_LOG")" -gt 1000 ]; then
        tail -n 1000 "$FOCUS_LOG" > "$FOCUS_LOG.tmp"
        mv "$FOCUS_LOG.tmp" "$FOCUS_LOG"
    fi

    # 更新当前状态
    echo "$focus_result" > "$FOCUS_STATE"
}

# 函数：连续监控焦点
monitor_focus() {
    local interval="${1:-30}"  # 默认30秒间隔
    local duration="${2:-3600}" # 默认1小时

    log "开始焦点监控 (间隔: ${interval}s, 时长: ${duration}s)"

    local start_time=$(date +%s)
    local end_time=$((start_time + duration))

    while [ "$(date +%s)" -lt "$end_time" ]; do
        local focus_info
        if focus_info=$(detect_user_focus); then
            local status=${focus_info%%$'\n'*}
            log "焦点状态: $status"
            log_focus_state "$focus_info"
        else
            log "焦点检测失败"
            log_focus_state "detection_failed"
        fi

        sleep "$interval"
    done

    log "焦点监控完成"
}

# 函数：生成焦点报告
generate_focus_report() {
    echo
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}    焦点检测报告 v21.0${NC}"
    echo -e "${BLUE}================================${NC}"

    # 当前焦点状态
    echo -e "\n📍 当前状态:"
    if focus_info=$(detect_user_focus); then
        echo "$focus_info" | while IFS= read -r line; do
            echo "  $line"
        done
    else
        echo "  检测失败或用户不在焦点"
    fi

    # 焦点历史分析
    echo -e "\n📊 历史模式:"
    if pattern_info=$(analyze_focus_patterns); then
        echo "$pattern_info" | while IFS= read -r line; do
            local key=${line%%:*}
            local value=${line##*:}
            case "$key" in
                "focus_history_entries")
                    echo "  历史记录: $value 条"
                    ;;
                "terminal_focus_percentage")
                    echo "  终端焦点: $value%"
                    ;;
                "recent_pattern")
                    echo "  最近趋势: $value"
                    ;;
            esac
        done
    else
        echo "  暂无历史数据"
    fi

    # 操作系统信息
    echo -e "\n🖥️  系统环境:"
    echo "  操作系统: $(detect_os)"
    echo "  检测时间: $(date '+%Y-%m-%d %H:%M:%S')"

    echo -e "${BLUE}================================${NC}"
    echo
}

# 主函数
main() {
    local action="${1:-status}"

    echo -e "${CYAN}👁️  焦点感知检测器 v21.0${NC}"

    case "$action" in
        "status"|"check")
            generate_focus_report
            ;;
        "monitor")
            local interval="${2:-30}"
            local duration="${3:-3600}"
            monitor_focus "$interval" "$duration"
            ;;
        "test")
            log "测试焦点检测..."
            if focus_info=$(detect_user_focus); then
                echo "✅ 焦点检测成功:"
                echo "$focus_info"
            else
                echo "❌ 焦点检测失败"
            fi
            ;;
        "history")
            if [ -f "$FOCUS_LOG" ]; then
                echo "焦点历史 (最近10条):"
                tail -n 10 "$FOCUS_LOG"
            else
                echo "暂无焦点历史"
            fi
            ;;
        "clear")
            rm -f "$FOCUS_LOG" "$FOCUS_STATE"
            log "焦点历史已清除"
            ;;
        *)
            echo "用法: $0 [status|monitor|test|history|clear]"
            echo "  status   - 显示当前焦点状态"
            echo "  monitor  - 连续监控焦点状态"
            echo "  test     - 测试焦点检测功能"
            echo "  history  - 查看焦点历史"
            echo "  clear    - 清除焦点历史"
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"