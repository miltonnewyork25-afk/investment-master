#!/bin/bash

# 报告版本参考优先级脚本 v1.0
# 用法: bash scripts/find_best_reference.sh [TICKER] [指定文件名]

set -e

# 格式化文件大小显示函数 (macOS兼容)
format_size() {
    local size=$1
    if [[ $size -gt 1048576 ]]; then
        echo "$(echo "scale=1; $size / 1048576" | bc)M"
    elif [[ $size -gt 1024 ]]; then
        echo "$(echo "scale=1; $size / 1024" | bc)K"
    else
        echo "${size}B"
    fi
}

TICKER="$1"
SPECIFIED_FILE="$2"

if [[ -z "$TICKER" ]]; then
    echo "用法: $0 <TICKER> [指定文件名]"
    exit 1
fi

# 如果用户指定了文件，直接使用
if [[ -n "$SPECIFIED_FILE" ]]; then
    if [[ -f "$SPECIFIED_FILE" ]]; then
        echo "🎯 使用用户指定文件: $SPECIFIED_FILE"
        echo "文件大小: $(ls -lh "$SPECIFIED_FILE" | awk '{print $5}')"
        exit 0
    else
        echo "❌ 指定文件不存在: $SPECIFIED_FILE"
        exit 1
    fi
fi

echo "🔍 搜索 $TICKER 的最佳参考报告..."

# Step 1: 查找main分支的Complete文件
MAIN_COMPLETE_FILES=$(find reports/$TICKER -name "${TICKER}_Complete_v*.md" 2>/dev/null | head -10)

if [[ -n "$MAIN_COMPLETE_FILES" ]]; then
    echo "📋 找到Complete文件:"

    # 显示所有候选文件信息
    BEST_FILE=""
    BEST_SIZE=0
    BEST_VERSION="0.0"

    while IFS= read -r file; do
        if [[ -f "$file" ]]; then
            SIZE=$(wc -c < "$file")
            # 提取版本号 (v2.0, v3.1 等)
            VERSION=$(echo "$file" | grep -oE "v[0-9]+\.[0-9]+" | tail -1)

            echo "  📄 $(basename "$file")"
            echo "     大小: $(format_size $SIZE)"
            echo "     版本: $VERSION"

            # 版本比较逻辑 (简化版)
            MAJOR=$(echo "$VERSION" | cut -d'v' -f2 | cut -d'.' -f1)
            MINOR=$(echo "$VERSION" | cut -d'v' -f2 | cut -d'.' -f2)
            BEST_MAJOR=$(echo "$BEST_VERSION" | cut -d'.' -f1)
            BEST_MINOR=$(echo "$BEST_VERSION" | cut -d'.' -f2)

            # 选择最新版本，版本相同则选择最大文件
            if [[ "$MAJOR" -gt "$BEST_MAJOR" ]] || \
               [[ "$MAJOR" -eq "$BEST_MAJOR" && "$MINOR" -gt "$BEST_MINOR" ]] || \
               [[ "$VERSION" == "$BEST_VERSION" && "$SIZE" -gt "$BEST_SIZE" ]]; then
                BEST_FILE="$file"
                BEST_SIZE="$SIZE"
                BEST_VERSION="$VERSION"
            fi
        fi
    done <<< "$MAIN_COMPLETE_FILES"

    echo ""
    echo "🏆 推荐参考文件: $(basename "$BEST_FILE")"
    echo "   📍 路径: $BEST_FILE"
    echo "   📏 大小: $(format_size $BEST_SIZE)"
    echo "   🏷️  版本: $BEST_VERSION"

    # 质量检查
    if [[ $BEST_SIZE -gt 250000 ]]; then
        echo "   ✅ 符合Tier 3标准 (≥250K)"
    else
        echo "   ⚠️  小于Tier 3标准 (<250K)"
    fi

else
    # Step 2: 查找其他主要报告文件
    echo "📋 未找到Complete文件，搜索其他报告..."

    OTHER_FILES=$(find reports/$TICKER -name "*.md" -type f 2>/dev/null | grep -v staging | head -10)

    if [[ -n "$OTHER_FILES" ]]; then
        # 按文件大小排序，选择最大的
        LARGEST_FILE=$(echo "$OTHER_FILES" | xargs -I {} sh -c 'echo "$(wc -c < "{}")"":"{}"' | sort -nr | head -1 | cut -d':' -f2-)
        LARGEST_SIZE=$(wc -c < "$LARGEST_FILE")

        echo "🏆 推荐参考文件: $(basename "$LARGEST_FILE")"
        echo "   📍 路径: $LARGEST_FILE"
        echo "   📏 大小: $(format_size $LARGEST_SIZE)"
        echo "   ⚠️  注意: 非Complete版本，可能不是最终版本"
    else
        echo "❌ 未找到任何 $TICKER 报告文件"
        exit 1
    fi
fi