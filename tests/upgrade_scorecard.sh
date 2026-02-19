#!/bin/bash
# ============================================================
# upgrade_scorecard.sh — 升级效果评估器 v1.0
# ============================================================
# 用法:
#   ./tests/upgrade_scorecard.sh <upgrade_id>
#   ./tests/upgrade_scorecard.sh --all
#   ./tests/upgrade_scorecard.sh --summary
#
# 功能: 读取升级假设卡，对比实际报告数据，生成判定
# 退出码: 0=成功
# ============================================================

set -uo pipefail

# --- 路径 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
UPGRADES_DIR="${REPO_ROOT}/docs/upgrades"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# --- 参数 ---
MODE="${1:---summary}"

# --- YAML简易解析 (无需yq依赖) ---
yaml_get() {
    local file="$1"
    local key="$2"
    grep -E "^ *${key}:" "$file" 2>/dev/null | head -1 | sed 's/.*: *//' | tr -d '"' | sed 's/ *$//'
}

yaml_get_list() {
    local file="$1"
    local key="$2"
    # 提取列表项 (- "item" 格式)
    local in_section=0
    while IFS= read -r line; do
        if echo "$line" | grep -qE "^ *${key}:"; then
            in_section=1
            continue
        fi
        if [ "$in_section" -eq 1 ]; then
            if echo "$line" | grep -qE '^ *- '; then
                echo "$line" | sed 's/^ *- *//' | tr -d '"'
            else
                break
            fi
        fi
    done < "$file"
}

# --- 单个升级评估 ---
evaluate_upgrade() {
    local yaml_file="$1"
    local upgrade_id
    upgrade_id=$(yaml_get "$yaml_file" "upgrade_id")
    local date_proposed
    date_proposed=$(yaml_get "$yaml_file" "date_proposed")
    local status
    status=$(yaml_get "$yaml_file" "status")
    local what
    what=$(yaml_get "$yaml_file" "what")

    echo ""
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}  升级: ${CYAN}${upgrade_id}${NC}"
    echo -e "${BOLD}  提出日期: ${date_proposed}${NC}"
    echo -e "${BOLD}  内容: ${what}${NC}"
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    # 假设
    local improves
    improves=$(yaml_get "$yaml_file" "improves_which_dimension")
    local baseline
    baseline=$(yaml_get "$yaml_file" "current_baseline")
    local expected
    expected=$(yaml_get "$yaml_file" "expected_after")
    local could_regress
    could_regress=$(yaml_get "$yaml_file" "could_regress")

    echo ""
    echo -e "${BOLD}假设:${NC}"
    echo "  改善维度: $improves"
    echo "  当前基准: $baseline"
    echo "  预期改善: $expected"
    echo "  可能退步: $could_regress"

    # 成功标准
    echo ""
    echo -e "${BOLD}成功标准:${NC}"
    while IFS= read -r criterion; do
        if [ -n "$criterion" ]; then
            echo "  □ $criterion"
        fi
    done <<< "$(yaml_get_list "$yaml_file" "success_criteria")"

    # 终止条件
    echo ""
    echo -e "${BOLD}终止条件:${NC}"
    while IFS= read -r kill; do
        if [ -n "$kill" ]; then
            echo "  ⚠ $kill"
        fi
    done <<< "$(yaml_get_list "$yaml_file" "kill_condition")"

    # 验证状态
    local first_report
    first_report=$(yaml_get "$yaml_file" "first_report")
    local date_validated
    date_validated=$(yaml_get "$yaml_file" "date_validated")
    local actual
    actual=$(yaml_get "$yaml_file" "actual_results")
    local honest
    honest=$(yaml_get "$yaml_file" "honest_assessment")

    echo ""
    echo -e "${BOLD}验证:${NC}"
    case "$status" in
        VALIDATED)
            echo -e "  状态: ${GREEN}██ VALIDATED${NC}"
            ;;
        NEUTRAL)
            echo -e "  状态: ${YELLOW}██ NEUTRAL${NC}"
            ;;
        REGRESSED)
            echo -e "  状态: ${RED}██ REGRESSED${NC}"
            ;;
        PENDING)
            echo -e "  状态: ${DIM}██ PENDING (未验证)${NC}"
            ;;
        *)
            echo -e "  状态: ${DIM}$status${NC}"
            ;;
    esac

    if [ -n "$first_report" ]; then
        echo "  首份验证报告: $first_report"
    fi
    if [ -n "$date_validated" ]; then
        echo "  验证日期: $date_validated"
    fi
    if [ -n "$actual" ]; then
        echo "  实际结果: $actual"
    fi
    if [ -n "$honest" ]; then
        echo "  诚实评估: $honest"
    fi

    # 已验证的标准
    echo ""
    echo -e "${BOLD}标准达成:${NC}"
    while IFS= read -r met; do
        if [ -n "$met" ]; then
            echo -e "  ${GREEN}✓${NC} $met"
        fi
    done <<< "$(yaml_get_list "$yaml_file" "criteria_met")"

    while IFS= read -r failed; do
        if [ -n "$failed" ]; then
            echo -e "  ${RED}✗${NC} $failed"
        fi
    done <<< "$(yaml_get_list "$yaml_file" "criteria_failed")"
}

# --- 汇总视图 ---
show_summary() {
    echo ""
    echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${CYAN}  框架升级验证记分板 — $(date +%Y-%m-%d)${NC}"
    echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════${NC}"
    echo ""

    local validated=0 neutral=0 regressed=0 pending=0 total=0

    printf "${BOLD}%-30s %-12s %-12s %-10s${NC}\n" "升级ID" "提出日期" "判定" "验证报告"
    echo "───────────────────────────── ──────────── ──────────── ──────────"

    for yaml_file in "${UPGRADES_DIR}"/*.yaml; do
        if [ ! -f "$yaml_file" ]; then
            echo -e "${DIM}  (无升级假设卡)${NC}"
            return
        fi

        local upgrade_id date_proposed status first_report
        upgrade_id=$(yaml_get "$yaml_file" "upgrade_id")
        date_proposed=$(yaml_get "$yaml_file" "date_proposed")
        status=$(yaml_get "$yaml_file" "status")
        first_report=$(yaml_get "$yaml_file" "first_report")

        total=$((total + 1))

        local status_display
        case "$status" in
            VALIDATED)
                status_display="${GREEN}VALIDATED${NC}"
                validated=$((validated + 1))
                ;;
            NEUTRAL)
                status_display="${YELLOW}NEUTRAL${NC}"
                neutral=$((neutral + 1))
                ;;
            REGRESSED)
                status_display="${RED}REGRESSED${NC}"
                regressed=$((regressed + 1))
                ;;
            *)
                status_display="${DIM}PENDING${NC}"
                pending=$((pending + 1))
                ;;
        esac

        printf "%-30s %-12s " "$upgrade_id" "$date_proposed"
        echo -en "$status_display"
        printf "%*s %-10s\n" $((12 - ${#status} )) "" "${first_report:-—}"
    done

    echo ""
    echo "───────────────────────────── ──────────── ──────────── ──────────"
    echo -e "  总计: ${total} | ${GREEN}VALIDATED: ${validated}${NC} | ${YELLOW}NEUTRAL: ${neutral}${NC} | ${RED}REGRESSED: ${regressed}${NC} | ${DIM}PENDING: ${pending}${NC}"

    if [ "$regressed" -gt 0 ]; then
        echo ""
        echo -e "${RED}⚠ 有 ${regressed} 项升级判定为 REGRESSED，建议冻结或撤销${NC}"
    fi

    if [ "$pending" -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}📋 有 ${pending} 项升级待验证，需要在下份报告中确认${NC}"
    fi

    # 效率指标
    if [ "$total" -gt 0 ]; then
        local rate
        rate=$(python3 -c "print(round($validated * 100 / $total, 0))")
        echo ""
        echo -e "${BOLD}升级有效率: ${rate}% (${validated}/${total})${NC}"
        if python3 -c "exit(0 if $rate >= 60 else 1)" 2>/dev/null; then
            echo -e "${GREEN}  升级纪律良好${NC}"
        else
            echo -e "${YELLOW}  升级有效率偏低，建议减少升级频率、提高每次升级质量${NC}"
        fi
    fi

    echo ""
}

# --- 主逻辑 ---
case "$MODE" in
    --summary)
        show_summary
        ;;
    --all)
        for yaml_file in "${UPGRADES_DIR}"/*.yaml; do
            if [ -f "$yaml_file" ]; then
                evaluate_upgrade "$yaml_file"
            fi
        done
        echo ""
        show_summary
        ;;
    *)
        # 查找特定升级
        FOUND=0
        for yaml_file in "${UPGRADES_DIR}"/*.yaml; do
            if [ -f "$yaml_file" ]; then
                uid=$(yaml_get "$yaml_file" "upgrade_id")
                if [ "$uid" = "$MODE" ] || echo "$yaml_file" | grep -q "$MODE"; then
                    evaluate_upgrade "$yaml_file"
                    FOUND=1
                fi
            fi
        done
        if [ "$FOUND" -eq 0 ]; then
            echo -e "${RED}未找到升级: $MODE${NC}"
            echo "可用升级:"
            for yaml_file in "${UPGRADES_DIR}"/*.yaml; do
                if [ -f "$yaml_file" ]; then
                    echo "  - $(yaml_get "$yaml_file" "upgrade_id")"
                fi
            done
            exit 1
        fi
        ;;
esac
