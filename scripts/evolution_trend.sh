#!/bin/bash
# evolution_trend.sh v1.0
# 质量趋势分析器 — 读取evolution_log.yaml, 输出趋势+警告
# 用法: bash scripts/evolution_trend.sh [--last N] [--json]
# 输出: 质量趋势图 + 警告信号 + 进化建议

set -euo pipefail

LAST_N=5
JSON_MODE="false"
LOG_FILE="knowledge/evolution_log.yaml"

# 参数解析
while [[ $# -gt 0 ]]; do
    case "$1" in
        --last) LAST_N="$2"; shift 2 ;;
        --json) JSON_MODE="true"; shift ;;
        *) shift ;;
    esac
done

# JSON模式: 抑制人类可读输出, 只输出JSON到stdout
if [[ "$JSON_MODE" == "true" ]]; then
    exec 3>&1
    exec 1>/dev/null
fi

if [[ ! -f "$LOG_FILE" ]]; then
    if [[ "$JSON_MODE" == "true" ]]; then
        exec 1>&3
        echo '{"error":"evolution_log not found"}'
    else
        echo "ERROR: $LOG_FILE not found"
    fi
    exit 1
fi

# ============================================================
# 提取entries — 纯bash解析YAML
# 格式: ticker|date|quality|chars|compliance|dm_anchors|top_technique|top_lesson|evolution_proposed|evolution_status
# ============================================================
entries=()
current_ticker="" current_date="" current_quality="" current_chars=""
current_compliance="" current_dm="" current_technique="" current_lesson=""
current_proposed="" current_status=""

while IFS= read -r line; do
    # 新条目开始
    if echo "$line" | grep -qE '^\s*- ticker:'; then
        # 保存前一个条目
        if [[ -n "$current_ticker" && "$current_quality" != "null" && -n "$current_quality" ]]; then
            entries+=("${current_ticker}|${current_date}|${current_quality}|${current_chars}|${current_compliance}|${current_dm}|${current_technique}|${current_lesson}|${current_proposed}|${current_status}")
        fi
        current_ticker=$(echo "$line" | sed 's/.*ticker: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
        current_date="" current_quality="" current_chars=""
        current_compliance="" current_dm="" current_technique="" current_lesson=""
        current_proposed="" current_status=""
    fi

    # 提取各字段
    if echo "$line" | grep -qE '^\s+date:'; then
        current_date=$(echo "$line" | sed 's/.*date: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
    fi
    if echo "$line" | grep -qE '^\s+quality:'; then
        current_quality=$(echo "$line" | sed 's/.*quality: *//' | tr -d ' "')
    fi
    if echo "$line" | grep -qE '^\s+chars:'; then
        current_chars=$(echo "$line" | sed 's/.*chars: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
    fi
    if echo "$line" | grep -qE '^\s+compliance:'; then
        current_compliance=$(echo "$line" | sed 's/.*compliance: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
    fi
    if echo "$line" | grep -qE '^\s+dm_anchors:'; then
        current_dm=$(echo "$line" | sed 's/.*dm_anchors: *//' | tr -d ' "')
    fi
    if echo "$line" | grep -qE '^\s+top_technique:'; then
        current_technique=$(echo "$line" | sed 's/.*top_technique: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/')
    fi
    if echo "$line" | grep -qE '^\s+top_lesson:'; then
        current_lesson=$(echo "$line" | sed 's/.*top_lesson: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/')
    fi
    if echo "$line" | grep -qE '^\s+evolution_proposed:'; then
        current_proposed=$(echo "$line" | sed 's/.*evolution_proposed: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/')
    fi
    if echo "$line" | grep -qE '^\s+evolution_status:'; then
        current_status=$(echo "$line" | sed 's/.*evolution_status: *//' | tr -d ' "')
    fi
done < "$LOG_FILE"

# 保存最后一个条目
if [[ -n "$current_ticker" && "$current_quality" != "null" && -n "$current_quality" ]]; then
    entries+=("${current_ticker}|${current_date}|${current_quality}|${current_chars}|${current_compliance}|${current_dm}|${current_technique}|${current_lesson}|${current_proposed}|${current_status}")
fi

TOTAL=${#entries[@]}
if [[ $TOTAL -eq 0 ]]; then
    echo "WARNING: evolution_log中无有效条目 (quality != null)"
    exit 0
fi

# 取最后N条
START=0
if [[ $TOTAL -gt $LAST_N ]]; then
    START=$((TOTAL - LAST_N))
fi

# ============================================================
# 质量趋势分析
# ============================================================
echo "═══════════════════════════════════════════════════"
echo "  Evolution Trend Analysis"
echo "  Total entries: $TOTAL | Showing last $LAST_N"
echo "═══════════════════════════════════════════════════"
echo ""

# 趋势表
echo "  # | Ticker | Date       | Quality | Chars | DM  | Trend"
echo " ---|--------|------------|---------|-------|-----|------"

prev_quality=""
trend_symbols=()
qualities=()
chars_nums=()

for ((i=START; i<TOTAL; i++)); do
    IFS='|' read -r ticker date quality chars compliance dm technique lesson proposed status <<< "${entries[$i]}"

    idx=$((i - START + 1))

    # 计算趋势符号
    trend="  "
    if [[ -n "$prev_quality" ]]; then
        # 使用bc进行浮点比较
        cmp=$(echo "$quality > $prev_quality" | bc 2>/dev/null || echo "0")
        cmp_eq=$(echo "$quality == $prev_quality" | bc 2>/dev/null || echo "0")
        if [[ "$cmp" == "1" ]]; then
            trend="UP"
        elif [[ "$cmp_eq" == "1" ]]; then
            trend="--"
        else
            trend="DN"
        fi
    fi

    trend_symbols+=("$trend")
    qualities+=("$quality")

    # 提取chars数字
    chars_num=$(echo "$chars" | sed 's/K$//')
    chars_nums+=("$chars_num")

    printf "  %d | %-6s | %s | %-7s | %-5s | %-3s | %s\n" "$idx" "$ticker" "$date" "$quality" "$chars" "$dm" "$trend"

    prev_quality="$quality"
done

echo ""

# ============================================================
# 警告信号检测
# ============================================================
WARNINGS=()
SIGNALS=()

# 信号1: 连续2份↓
consecutive_down=0
for trend in "${trend_symbols[@]}"; do
    if [[ "$trend" == "DN" ]]; then
        consecutive_down=$((consecutive_down + 1))
    else
        consecutive_down=0
    fi
done
if [[ $consecutive_down -ge 2 ]]; then
    WARNINGS+=("WARN: 连续${consecutive_down}份质量下降 → 紧急审查最近变更")
fi

# 信号2: 连续3份↑
consecutive_up=0
for trend in "${trend_symbols[@]}"; do
    if [[ "$trend" == "UP" ]]; then
        consecutive_up=$((consecutive_up + 1))
    else
        consecutive_up=0
    fi
done
if [[ $consecutive_up -ge 3 ]]; then
    SIGNALS+=("OK: 连续${consecutive_up}份质量上升 → 进化方向正确")
fi

# 信号3: chars↑但quality平或↓
num_entries=${#qualities[@]}
if [[ $num_entries -ge 3 ]]; then
    last_q=${qualities[$((num_entries-1))]}
    first_q=${qualities[0]}
    last_c=${chars_nums[$((num_entries-1))]}
    first_c=${chars_nums[0]}

    q_diff=$(echo "$last_q - $first_q" | bc 2>/dev/null || echo "0")
    c_diff=$((last_c - first_c))

    q_flat=$(echo "$q_diff <= 0.1 && $q_diff >= -0.1" | bc 2>/dev/null || echo "0")

    if [[ $c_diff -gt 50 && "$q_flat" == "1" ]]; then
        WARNINGS+=("WARN: 字符数增加${c_diff}K但质量持平 → 复杂度膨胀")
    fi
fi

# 信号4: 最新质量低于平均
if [[ $num_entries -ge 3 ]]; then
    sum=0
    for q in "${qualities[@]}"; do
        sum=$(echo "$sum + $q" | bc 2>/dev/null || echo "0")
    done
    avg=$(echo "scale=2; $sum / $num_entries" | bc 2>/dev/null || echo "0")
    last_q=${qualities[$((num_entries-1))]}
    below=$(echo "$last_q < $avg - 0.3" | bc 2>/dev/null || echo "0")
    if [[ "$below" == "1" ]]; then
        WARNINGS+=("WARN: 最新质量($last_q)低于平均($avg) → 检查退化原因")
    fi
fi

# 输出警告
if [[ ${#WARNINGS[@]} -gt 0 ]]; then
    echo "⚠  警告信号:"
    for w in "${WARNINGS[@]}"; do
        echo "  $w"
    done
    echo ""
fi

if [[ ${#SIGNALS[@]} -gt 0 ]]; then
    echo "✓  正面信号:"
    for s in "${SIGNALS[@]}"; do
        echo "  $s"
    done
    echo ""
fi

if [[ ${#WARNINGS[@]} -eq 0 && ${#SIGNALS[@]} -eq 0 ]]; then
    echo "  趋势: 正常波动范围内"
    echo ""
fi

# ============================================================
# JSON输出模式
# ============================================================
if [[ "$JSON_MODE" == "true" ]]; then
    exec 1>&3  # 恢复stdout

    # 趋势方向
    if [[ $consecutive_down -ge 2 ]]; then
        TREND_DIR="down"
        CONSEC_DIR="$consecutive_down"
    elif [[ $consecutive_up -ge 3 ]]; then
        TREND_DIR="up"
        CONSEC_DIR="$consecutive_up"
    else
        TREND_DIR="stable"
        CONSEC_DIR=0
    fi

    LATEST_Q="${qualities[$((num_entries-1))]}"

    # 计算平均
    _sum=0
    for _q in "${qualities[@]}"; do
        _sum=$(echo "$_sum + $_q" | bc 2>/dev/null || echo "0")
    done
    AVG_Q=$(echo "scale=2; $_sum / $num_entries" | bc 2>/dev/null || echo "0")

    # failure_flag: 最新质量<3.0
    HAS_FAILURE="false"
    _is_fail=$(echo "$LATEST_Q < 3.0" | bc 2>/dev/null || echo "0")
    if [[ "$_is_fail" == "1" ]]; then
        HAS_FAILURE="true"
    fi

    # 警告JSON数组
    WARN_JSON="["
    for ((w=0; w<${#WARNINGS[@]}; w++)); do
        if [[ $w -gt 0 ]]; then WARN_JSON+=","; fi
        ESCAPED=$(echo "${WARNINGS[$w]}" | sed 's/"/\\"/g')
        WARN_JSON+="\"$ESCAPED\""
    done
    WARN_JSON+="]"

    printf '{"trend_direction":"%s","consecutive_direction":%d,"latest_quality":%s,"average_quality":%s,"failure_flag":%s,"warnings":%s}\n' \
        "$TREND_DIR" "$CONSEC_DIR" "$LATEST_Q" "$AVG_Q" "$HAS_FAILURE" "$WARN_JSON"
    exit 0
fi

# ============================================================
# 最近教训和进化提议
# ============================================================
echo "───────────────────────────────────────────────────"
echo "  最近教训 (last 3):"

show_start=$((TOTAL - 3))
if [[ $show_start -lt 0 ]]; then show_start=0; fi

for ((i=show_start; i<TOTAL; i++)); do
    IFS='|' read -r ticker date quality chars compliance dm technique lesson proposed status <<< "${entries[$i]}"
    echo "  [$ticker] $lesson"
done

echo ""
echo "  待审批进化提议:"
pending_count=0
for ((i=0; i<TOTAL; i++)); do
    IFS='|' read -r ticker date quality chars compliance dm technique lesson proposed status <<< "${entries[$i]}"
    if [[ "$status" == "pending" ]]; then
        echo "  [$ticker] $proposed"
        pending_count=$((pending_count + 1))
    fi
done
if [[ $pending_count -eq 0 ]]; then
    echo "  (无待审批提议)"
fi

echo "───────────────────────────────────────────────────"

# ============================================================
# 最佳实践统计
# ============================================================
echo ""
echo "  统计摘要:"

# 平均质量
sum=0
for q in "${qualities[@]}"; do
    sum=$(echo "$sum + $q" | bc 2>/dev/null || echo "0")
done
avg=$(echo "scale=2; $sum / ${#qualities[@]}" | bc 2>/dev/null || echo "N/A")
echo "  平均质量: $avg / 5.0"

# 最高/最低
best_q="0" best_t=""
worst_q="99" worst_t=""
for ((i=START; i<TOTAL; i++)); do
    IFS='|' read -r ticker date quality chars compliance dm technique lesson proposed status <<< "${entries[$i]}"
    is_best=$(echo "$quality > $best_q" | bc 2>/dev/null || echo "0")
    is_worst=$(echo "$quality < $worst_q" | bc 2>/dev/null || echo "0")
    if [[ "$is_best" == "1" ]]; then best_q="$quality"; best_t="$ticker"; fi
    if [[ "$is_worst" == "1" ]]; then worst_q="$quality"; worst_t="$ticker"; fi
done
echo "  最高: $best_t ($best_q) | 最低: $worst_t ($worst_q)"

# 平均字符数
sum_c=0
for c in "${chars_nums[@]}"; do
    sum_c=$((sum_c + c))
done
avg_c=$((sum_c / ${#chars_nums[@]}))
echo "  平均字符: ${avg_c}K"
echo ""
