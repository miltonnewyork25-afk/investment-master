#!/bin/bash
# rating_calibration.sh v1.0
# 跨报告评级校准器 — 读取L0_index.yaml, 按行业分组, 检测评级异常
# 用法: bash scripts/rating_calibration.sh [--industry 消费品] [--stale-days 90]
# 输出: 行业分组评级对比 + 异常标注 + 时效性检查
# 兼容macOS bash 3.x (无declare -A)

set -euo pipefail

INDEX_FILE="knowledge/L0_index.yaml"
STALE_DAYS=90
FILTER_INDUSTRY=""
TODAY=$(date +%s)
TMPDIR_CAL=$(mktemp -d)
trap "rm -rf $TMPDIR_CAL" EXIT

# 参数解析
while [[ $# -gt 0 ]]; do
    case "$1" in
        --industry) FILTER_INDUSTRY="$2"; shift 2 ;;
        --stale-days) STALE_DAYS="$2"; shift 2 ;;
        *) shift ;;
    esac
done

if [[ ! -f "$INDEX_FILE" ]]; then
    echo "ERROR: $INDEX_FILE not found"
    exit 1
fi

echo "=== Rating Calibration Report ==="
echo "Generated: $(date +%Y-%m-%d)"
echo "Stale threshold: ${STALE_DAYS} days"
echo ""

# ============================================================
# 评级排序函数: 深度关注=1, 关注=2, 中性关注=3, 审慎关注=4
# ============================================================
rate_order() {
    local r="$1"
    case "$r" in
        *深度关注*) echo 1 ;;
        关注)       echo 2 ;;
        *中性*|*条件*) echo 3 ;;
        *审慎*)     echo 4 ;;
        *)          echo 5 ;;
    esac
}

# ============================================================
# 解析L0_index.yaml — 提取每个报告到行业分组文件
# ============================================================

while IFS= read -r line; do
    # 跳过注释、空行、非报告行
    case "$line" in
        *"#"*) ;; # may contain inline comments, process anyway
    esac
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" =~ ^[[:space:]]*$ ]] && continue
    [[ "$line" =~ ^reports: ]] && continue
    [[ "$line" =~ ^summary: ]] && continue
    [[ "$line" =~ ^[[:space:]]+(total|complete|in_progress|by_industry|quality_range|best): ]] && continue

    # 提取ticker
    ticker=""
    if [[ "$line" =~ ^[[:space:]]+([A-Z_]+):[[:space:]]+\{ ]]; then
        ticker="${BASH_REMATCH[1]}"
    else
        continue
    fi

    # 提取各字段
    ind=""; rate=""; ret=""; qual=""; fw=""; rdate=""; pe=""

    if [[ "$line" =~ ind:[[:space:]]*([^,}]+) ]]; then
        ind=$(echo "${BASH_REMATCH[1]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    fi

    if [[ "$line" =~ rate:[[:space:]]*([^,}]+) ]]; then
        rate=$(echo "${BASH_REMATCH[1]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//;s/"//g')
    fi

    if [[ "$line" =~ ret:[[:space:]]*\"([^\"]*)\"|ret:[[:space:]]*([^,}]+) ]]; then
        ret="${BASH_REMATCH[1]:-${BASH_REMATCH[2]}}"
        ret=$(echo "$ret" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    fi

    if [[ "$line" =~ qual:[[:space:]]*([0-9.]+) ]]; then
        qual="${BASH_REMATCH[1]}"
    fi

    if [[ "$line" =~ fw:[[:space:]]*([^,}]+) ]]; then
        fw=$(echo "${BASH_REMATCH[1]}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//;s/"//g')
    fi

    if [[ "$line" =~ date:[[:space:]]*\"([0-9-]+)\" ]]; then
        rdate="${BASH_REMATCH[1]}"
    fi

    if [[ "$line" =~ pe:[[:space:]]*\"([^\"]*)\"|pe:[[:space:]]*([^,}]+) ]]; then
        pe="${BASH_REMATCH[1]:-${BASH_REMATCH[2]}}"
        pe=$(echo "$pe" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//;s/"//g')
    fi

    # 跳过进行中的报告
    [[ "$rate" == "null" || -z "$rate" ]] && continue

    # 过滤行业
    [[ -n "$FILTER_INDUSTRY" && "$ind" != "$FILTER_INDUSTRY" ]] && continue

    # 计算时效性
    freshness="-"
    if [[ -n "$rdate" && "$rdate" != "null" ]]; then
        report_ts=$(date -j -f "%Y-%m-%d" "$rdate" +%s 2>/dev/null || echo "0")
        if [[ "$report_ts" != "0" ]]; then
            days_old=$(( (TODAY - report_ts) / 86400 ))
            if [[ $days_old -le $STALE_DAYS ]]; then
                freshness="新鲜(${days_old}d)"
            else
                freshness="⚠过期(${days_old}d)"
            fi
        fi
    fi

    # 框架版本标注
    fw_tag="$fw"
    if [[ -z "$fw" || "$fw" == "null" ]]; then
        fw_tag="-"
    fi
    case "$fw" in
        v8*|v9*|v10*|v11*|v12*) fw_tag="${fw}(early)" ;;
    esac

    # 写入行业分组文件 (use md5 hash for safe filename)
    ind_file=$(echo -n "$ind" | md5 | cut -c1-8)
    echo "${ticker}|${rate}|${ret}|${pe:--}|${fw_tag}|${rdate:--}|${freshness}|${qual:--}" >> "$TMPDIR_CAL/${ind_file}.txt"

    # 记录行业名到映射文件
    { grep -q "^${ind_file}|" "$TMPDIR_CAL/ind_map.txt" 2>/dev/null; } || \
        echo "${ind_file}|${ind}" >> "$TMPDIR_CAL/ind_map.txt"

done < "$INDEX_FILE"

# ============================================================
# 输出: 按行业分组
# ============================================================

TOTAL=0
STALE_COUNT=0

if [[ ! -f "$TMPDIR_CAL/ind_map.txt" ]]; then
    echo "未找到任何报告数据"
    exit 0
fi

while IFS='|' read -r ind_file ind_name; do
    [[ ! -f "$TMPDIR_CAL/${ind_file}.txt" ]] && continue

    echo "━━━ $ind_name ━━━"
    printf "  %-16s | %-22s | %-12s | %-8s | %-12s | %-12s | %-14s | %-5s\n" \
        "Ticker" "评级" "期望回报" "P/E" "框架" "日期" "时效" "质量"
    printf "  %-16s-+-%-22s-+-%-12s-+-%-8s-+-%-12s-+-%-12s-+-%-14s-+-%-5s\n" \
        "----------------" "----------------------" "------------" "--------" "------------" "------------" "--------------" "-----"

    while IFS='|' read -r t r ret pe fw d fresh q; do
        [[ -z "$t" ]] && continue
        printf "  %-16s | %-22s | %-12s | %-8s | %-12s | %-12s | %-14s | %-5s\n" \
            "$t" "$r" "$ret" "$pe" "$fw" "$d" "$fresh" "$q"
        TOTAL=$((TOTAL + 1))
        case "$fresh" in *过期*) STALE_COUNT=$((STALE_COUNT + 1)) ;; esac
    done < "$TMPDIR_CAL/${ind_file}.txt"

    echo ""
done < "$TMPDIR_CAL/ind_map.txt"

# ============================================================
# 摘要统计
# ============================================================

echo "━━━ 摘要 ━━━"
echo "  总报告数: $TOTAL"
echo "  过期(>${STALE_DAYS}天): $STALE_COUNT"
echo ""

# ============================================================
# 异常检测: 同行业内评级一致性
# ============================================================

echo "━━━ 异常检测 ━━━"

anomaly_found=false

while IFS='|' read -r ind_file ind_name; do
    [[ ! -f "$TMPDIR_CAL/${ind_file}.txt" ]] && continue

    # 对同行业内每对报告检测
    while IFS='|' read -r t1 r1 ret1 pe1 fw1 d1 f1 q1; do
        [[ -z "$t1" ]] && continue
        while IFS='|' read -r t2 r2 ret2 pe2 fw2 d2 f2 q2; do
            [[ -z "$t2" || "$t1" == "$t2" ]] && continue

            ro1=$(rate_order "$r1")
            ro2=$(rate_order "$r2")

            # 提取纯数字PE
            pe_num1=$(echo "$pe1" | grep -oE '[0-9]+' | head -1 || true)
            pe_num2=$(echo "$pe2" | grep -oE '[0-9]+' | head -1 || true)

            if [[ -n "$pe_num1" && -n "$pe_num2" ]]; then
                # pe1 > pe2 但 rating1 更好 (数字更小) → 潜在异常
                if [[ $pe_num1 -gt $pe_num2 && $ro1 -lt $ro2 ]]; then
                    echo "  ⚠ $ind_name: $t1(PE ${pe_num1}x, $r1) 评级优于 $t2(PE ${pe_num2}x, $r2)"
                    anomaly_found=true
                fi
            fi
        done < "$TMPDIR_CAL/${ind_file}.txt"
    done < "$TMPDIR_CAL/${ind_file}.txt"
done < "$TMPDIR_CAL/ind_map.txt"

if [[ "$anomaly_found" == "false" ]]; then
    echo "  ✓ 无明显异常"
fi

echo ""
echo "━━━ 使用建议 ━━━"
echo "  1. 新报告完成后运行此脚本检查评级一致性"
echo "  2. 过期报告的评级仅供参考，不适合横向对比"
echo "  3. 早期框架(v8-v12)报告质量标准不同，对比需谨慎"
echo "  4. 异常不一定是错误——需要在报告中解释原因"
