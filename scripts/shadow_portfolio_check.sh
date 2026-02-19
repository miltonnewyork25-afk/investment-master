#!/bin/bash
# ============================================================
# shadow_portfolio_check.sh v1.0 — 影子组合回顾
# ============================================================
# 用法: bash scripts/shadow_portfolio_check.sh
#
# 功能:
# 1. 读取evolution_log.yaml中所有shadow条目
# 2. 计算各ticker距报告日的时间差
# 3. 标识需要更新3m/6m/12m价格的条目
# 4. 输出结构化清单供AI用MCP工具填入价格
# 5. 如有已填价格,计算校准统计
#
# 依赖: knowledge/evolution_log.yaml (含shadow子段)
# ============================================================

set -uo pipefail

LOG_FILE="knowledge/evolution_log.yaml"

if [[ ! -f "$LOG_FILE" ]]; then
    echo "ERROR: $LOG_FILE not found"
    exit 1
fi

echo "═══════════════════════════════════════════════════"
echo "  Shadow Portfolio Review"
echo "  Date: $(date '+%Y-%m-%d')"
echo "═══════════════════════════════════════════════════"
echo ""

# ============================================================
# 提取所有entries的shadow数据
# ============================================================
declare -a tickers=()
declare -a dates=()
declare -a ratings=()
declare -a expected_returns=()
declare -a prices_at_report=()
declare -a prices_3m=()
declare -a prices_6m=()
declare -a prices_12m=()

ticker="" date_val="" rating="" exp_ret="" price_at="" p3m="" p6m="" p12m=""
in_shadow="false"

while IFS= read -r line; do
    # 新条目
    if echo "$line" | grep -qE '^\s*- ticker:'; then
        # 保存前一个
        if [[ -n "$ticker" ]]; then
            tickers+=("$ticker")
            dates+=("$date_val")
            ratings+=("$rating")
            expected_returns+=("$exp_ret")
            prices_at_report+=("$price_at")
            prices_3m+=("$p3m")
            prices_6m+=("$p6m")
            prices_12m+=("$p12m")
        fi
        ticker=$(echo "$line" | sed 's/.*ticker: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
        date_val="" rating="" exp_ret="" price_at="" p3m="" p6m="" p12m=""
        in_shadow="false"
    fi

    # 日期
    if [[ "$in_shadow" == "false" ]] && echo "$line" | grep -qE '^\s+date:'; then
        date_val=$(echo "$line" | sed 's/.*date: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
    fi

    # Shadow段落开始
    if echo "$line" | grep -qE '^\s+shadow:'; then
        in_shadow="true"
        continue
    fi

    # Shadow内的字段
    if [[ "$in_shadow" == "true" ]]; then
        if echo "$line" | grep -qE '^\s+price_at_report:'; then
            price_at=$(echo "$line" | sed 's/.*price_at_report: *//' | tr -d ' "')
        fi
        if echo "$line" | grep -qE '^\s+price_3m:'; then
            p3m=$(echo "$line" | sed 's/.*price_3m: *//' | tr -d ' "')
        fi
        if echo "$line" | grep -qE '^\s+price_6m:'; then
            p6m=$(echo "$line" | sed 's/.*price_6m: *//' | tr -d ' "')
        fi
        if echo "$line" | grep -qE '^\s+price_12m:'; then
            p12m=$(echo "$line" | sed 's/.*price_12m: *//' | tr -d ' "')
        fi
        # 非shadow字段出现=退出shadow段
        if echo "$line" | grep -qE '^\s+[a-z]' && ! echo "$line" | grep -qE 'price_'; then
            in_shadow="false"
        fi
    fi
done < "$LOG_FILE"

# 保存最后一个
if [[ -n "$ticker" ]]; then
    tickers+=("$ticker")
    dates+=("$date_val")
    ratings+=("$rating")
    expected_returns+=("$exp_ret")
    prices_at_report+=("$price_at")
    prices_3m+=("$p3m")
    prices_6m+=("$p6m")
    prices_12m+=("$p12m")
fi

TOTAL=${#tickers[@]}
if [[ $TOTAL -eq 0 ]]; then
    echo "  无shadow条目"
    exit 0
fi

# ============================================================
# 计算时间差, 确定需要更新的条目
# ============================================================
TODAY_EPOCH=$(date +%s)

needs_update=0
has_data=0

echo "  Ticker | Report Date | Price@Report | 3M      | 6M      | 12M     | Status"
echo "  -------|-------------|-------------|---------|---------|---------|-------"

for ((i=0; i<TOTAL; i++)); do
    tk="${tickers[$i]}"
    dt="${dates[$i]}"
    pa="${prices_at_report[$i]}"
    m3="${prices_3m[$i]}"
    m6="${prices_6m[$i]}"
    m12="${prices_12m[$i]}"

    # 计算天数差
    if [[ -n "$dt" ]]; then
        report_epoch=$(date -j -f "%Y-%m-%d" "$dt" +%s 2>/dev/null || echo "0")
        if [[ "$report_epoch" != "0" ]]; then
            days_diff=$(( (TODAY_EPOCH - report_epoch) / 86400 ))
        else
            days_diff=0
        fi
    else
        days_diff=0
    fi

    # 确定状态
    status=""
    need_items=""

    # price_at_report
    if [[ "$pa" == "null" || -z "$pa" ]]; then
        need_items="price_at"
        needs_update=$((needs_update + 1))
    fi

    # 3m check (>=90 days)
    if [[ $days_diff -ge 90 && ("$m3" == "null" || -z "$m3") ]]; then
        need_items="${need_items:+$need_items,}3m"
        needs_update=$((needs_update + 1))
    fi

    # 6m check (>=180 days)
    if [[ $days_diff -ge 180 && ("$m6" == "null" || -z "$m6") ]]; then
        need_items="${need_items:+$need_items,}6m"
        needs_update=$((needs_update + 1))
    fi

    # 12m check (>=365 days)
    if [[ $days_diff -ge 365 && ("$m12" == "null" || -z "$m12") ]]; then
        need_items="${need_items:+$need_items,}12m"
        needs_update=$((needs_update + 1))
    fi

    if [[ -n "$need_items" ]]; then
        status="NEED: $need_items"
    else
        status="OK (${days_diff}d)"
    fi

    # 格式化价格显示
    pa_show="${pa:-null}"
    m3_show="${m3:-null}"
    m6_show="${m6:-null}"
    m12_show="${m12:-null}"

    printf "  %-6s | %-11s | %-11s | %-7s | %-7s | %-7s | %s\n" \
        "$tk" "$dt" "$pa_show" "$m3_show" "$m6_show" "$m12_show" "$status"

    # 统计有数据的条目
    if [[ "$pa" != "null" && -n "$pa" ]]; then
        has_data=$((has_data + 1))
    fi
done

echo ""

# ============================================================
# 需要更新的具体操作
# ============================================================
if [[ $needs_update -gt 0 ]]; then
    echo "───────────────────────────────────────────────────"
    echo "  需要AI更新的价格 ($needs_update 项):"
    echo ""

    for ((i=0; i<TOTAL; i++)); do
        tk="${tickers[$i]}"
        dt="${dates[$i]}"
        pa="${prices_at_report[$i]}"
        m3="${prices_3m[$i]}"
        m6="${prices_6m[$i]}"
        m12="${prices_12m[$i]}"

        report_epoch=$(date -j -f "%Y-%m-%d" "$dt" +%s 2>/dev/null || echo "0")
        if [[ "$report_epoch" != "0" ]]; then
            days_diff=$(( (TODAY_EPOCH - report_epoch) / 86400 ))
        else
            days_diff=0
        fi

        actions=""

        if [[ "$pa" == "null" || -z "$pa" ]]; then
            actions="${actions}  - price_at_report: 用 fmp_data quote $tk 获取 $dt 的收盘价\n"
        fi
        if [[ $days_diff -ge 90 && ("$m3" == "null" || -z "$m3") ]]; then
            target_date=$(date -j -v+90d -f "%Y-%m-%d" "$dt" "+%Y-%m-%d" 2>/dev/null || echo "?")
            actions="${actions}  - price_3m: $tk 在 ~$target_date 的价格\n"
        fi
        if [[ $days_diff -ge 180 && ("$m6" == "null" || -z "$m6") ]]; then
            target_date=$(date -j -v+180d -f "%Y-%m-%d" "$dt" "+%Y-%m-%d" 2>/dev/null || echo "?")
            actions="${actions}  - price_6m: $tk 在 ~$target_date 的价格\n"
        fi
        if [[ $days_diff -ge 365 && ("$m12" == "null" || -z "$m12") ]]; then
            target_date=$(date -j -v+365d -f "%Y-%m-%d" "$dt" "+%Y-%m-%d" 2>/dev/null || echo "?")
            actions="${actions}  - price_12m: $tk 在 ~$target_date 的价格\n"
        fi

        if [[ -n "$actions" ]]; then
            echo "  [$tk] (report: $dt, ${days_diff}d ago)"
            echo -e "$actions"
        fi
    done
    echo "───────────────────────────────────────────────────"
fi

# ============================================================
# 校准统计 (如有足够数据)
# ============================================================
if [[ $has_data -ge 2 ]]; then
    echo ""
    echo "  校准统计: (需实际价格数据后计算)"
    echo "  方向性准确率 = 预测涨跌 vs 实际涨跌 的匹配度"
    echo "  幅度偏差 = |预测回报 - 实际回报| 的平均值"
    echo "  系统偏差 = 如果一致高估/低估, 检查WACC/折现率是否系统性偏高/偏低"
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo "  总计: $TOTAL 个ticker | 需更新: $needs_update 项"
echo "  有价格数据: $has_data / $TOTAL"
echo "═══════════════════════════════════════════════════"
