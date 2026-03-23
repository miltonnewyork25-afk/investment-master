#!/usr/bin/env bash
# 报告数据清理脚本 v1.0
# 用法: bash scripts/cleanup_report_data.sh [--dry-run] [TICKER]
# - 无参数: 清理所有已完成报告的中间产物
# - TICKER: 只清理指定报告
# - --dry-run: 只显示将删除的文件，不实际执行
#
# 触发时机:
# 1. post_report_autopsy.sh 完成后自动调用
# 2. 手动运行清理积压
#
# 设计原则: 只清理已Complete的报告。进行中的报告(有checkpoint但无Complete)不动。

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORTS_DIR="$REPO_ROOT/reports"
DRY_RUN=false
TARGET_TICKER=""
CLEANED=0
CLEANED_BYTES=0

# 解析参数
for arg in "$@"; do
    case "$arg" in
        --dry-run) DRY_RUN=true ;;
        *) TARGET_TICKER="$arg" ;;
    esac
done

echo "=== 报告数据清理 v1.0 ==="
echo "时间: $(date '+%Y-%m-%d %H:%M')"
if $DRY_RUN; then echo "模式: DRY-RUN (不实际删除)"; fi
echo ""

# 保留文件列表 (Complete后仍有价值的文件)
# checkpoint.yaml — 最终状态记录
# moat_datacard.yaml — CQI排行榜数据源
# quality_scorecard*.md — 品质评分
# *dcf*.py / *dcf*.json — 估值模型(可复现)
# phase*_summary.md — Phase摘要(跨报告参考)

is_keepable() {
    local fname="$1"
    case "$fname" in
        checkpoint.yaml) return 0 ;;
        moat_datacard.yaml) return 0 ;;
        quality_scorecard*) return 0 ;;
        *dcf*) return 0 ;;
        *_summary.md) return 0 ;;
        *) return 1 ;;
    esac
}

# 检查报告是否已完成
is_complete() {
    local ticker_dir="$1"
    ls "$ticker_dir"/*Complete* >/dev/null 2>&1
}

# 清理单个报告
cleanup_ticker() {
    local ticker_dir="$1"
    local ticker=$(basename "$ticker_dir")
    local data_dir="$ticker_dir/data"

    # 跳过无data目录的
    if [ ! -d "$data_dir" ]; then return; fi

    # 跳过未完成的报告
    if ! is_complete "$ticker_dir"; then
        return
    fi

    local ticker_cleaned=0
    local ticker_bytes=0

    for f in "$data_dir"/*; do
        [ -f "$f" ] || continue
        local fname=$(basename "$f")

        if ! is_keepable "$fname"; then
            local fsize=$(wc -m < "$f" 2>/dev/null || echo 0)
            if $DRY_RUN; then
                echo "  [DRY] 将删除: $ticker/data/$fname (${fsize}字符)"
            else
                rm "$f"
            fi
            ticker_cleaned=$((ticker_cleaned + 1))
            ticker_bytes=$((ticker_bytes + fsize))
        fi
    done

    # 清理data子目录(如archive/, research/)
    for subdir in "$data_dir"/*/; do
        if [ -d "$subdir" ]; then
            local subname=$(basename "$subdir")
            local sub_count=$(find "$subdir" -type f 2>/dev/null | wc -l | tr -d ' ')
            if [ "$sub_count" -gt 0 ]; then
                local sub_size=$(du -sm "$subdir" 2>/dev/null | awk '{print $1}')
                if $DRY_RUN; then
                    echo "  [DRY] 将删除目录: $ticker/data/$subname/ ($sub_count files)"
                else
                    rm -rf "$subdir"
                fi
                ticker_cleaned=$((ticker_cleaned + sub_count))
            fi
        fi
    done

    # 清理staging目录中的archive
    local staging_dir="$ticker_dir/staging"
    if [ -d "$staging_dir" ]; then
        for subdir in "$staging_dir"/v*_archive/ "$staging_dir"/archive/; do
            if [ -d "$subdir" ]; then
                local subname=$(basename "$subdir")
                local sub_count=$(find "$subdir" -type f 2>/dev/null | wc -l | tr -d ' ')
                if [ "$sub_count" -gt 0 ]; then
                    if $DRY_RUN; then
                        echo "  [DRY] 将删除staging归档: $ticker/staging/$subname/ ($sub_count files)"
                    else
                        rm -rf "$subdir"
                    fi
                    ticker_cleaned=$((ticker_cleaned + sub_count))
                fi
            fi
        done
    fi

    if [ "$ticker_cleaned" -gt 0 ]; then
        echo "  $ticker: 清理${ticker_cleaned}个文件 (~${ticker_bytes}字符)"
        CLEANED=$((CLEANED + ticker_cleaned))
        CLEANED_BYTES=$((CLEANED_BYTES + ticker_bytes))
    fi
}

# 主循环
if [ -n "$TARGET_TICKER" ]; then
    # 清理单个报告
    ticker_dir="$REPORTS_DIR/$TARGET_TICKER"
    if [ -d "$ticker_dir" ]; then
        echo "清理目标: $TARGET_TICKER"
        cleanup_ticker "$ticker_dir"
    else
        echo "❌ 未找到报告: $TARGET_TICKER"
        exit 1
    fi
else
    # 清理所有已完成报告
    echo "扫描所有已完成报告..."
    for ticker_dir in "$REPORTS_DIR"/*/; do
        cleanup_ticker "$ticker_dir"
    done
fi

# 汇总
echo ""
echo "=== 汇总 ==="
if [ "$CLEANED" -eq 0 ]; then
    echo "✅ 无需清理"
else
    local_kb=$((CLEANED_BYTES / 1024))
    if $DRY_RUN; then
        echo "📋 将清理${CLEANED}个文件 (~${local_kb}KB)"
        echo "运行 bash scripts/cleanup_report_data.sh 执行实际清理"
    else
        echo "🧹 已清理${CLEANED}个文件 (~${local_kb}KB)"
    fi
fi
