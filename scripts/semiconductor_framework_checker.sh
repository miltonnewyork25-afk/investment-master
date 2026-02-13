#!/bin/bash

# 半导体框架v2.0合规检查器
# 用法: bash scripts/semiconductor_framework_checker.sh <报告文件路径>

set -e

REPORT_FILE="$1"

if [[ -z "$REPORT_FILE" ]]; then
    echo "用法: $0 <报告文件路径>"
    echo "示例: $0 reports/LRCX/LRCX_Complete_v2.0.md"
    exit 1
fi

if [[ ! -f "$REPORT_FILE" ]]; then
    echo "❌ 报告文件不存在: $REPORT_FILE"
    exit 1
fi

echo "🔍 半导体框架v2.0合规检查"
echo "📄 检查文件: $(basename "$REPORT_FILE")"
echo ""

# 检查计数器
PASS_COUNT=0
TOTAL_CHECKS=15

# 格式化输出函数
check_item() {
    local description="$1"
    local pattern="$2"
    local file="$3"

    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo "✅ $description"
        ((PASS_COUNT++))
        return 0
    else
        echo "❌ $description"
        return 1
    fi
}

check_item_count() {
    local description="$1"
    local pattern="$2"
    local min_count="$3"
    local file="$4"

    local count=$(grep -c "$pattern" "$file" 2>/dev/null || echo "0")
    if [[ $count -ge $min_count ]]; then
        echo "✅ $description ($count >= $min_count)"
        ((PASS_COUNT++))
        return 0
    else
        echo "❌ $description ($count < $min_count)"
        return 1
    fi
}

echo "📊 表1: Chokepoint指数检查"
check_item "不可替代性评分" "不可替代性.*[0-9]" "$REPORT_FILE"
check_item "供给稀缺性评分" "供给稀缺性.*[0-9]" "$REPORT_FILE"
check_item "分配权评分" "分配权.*[0-9]" "$REPORT_FILE"
check_item "资格认证摩擦评分" "资格认证摩擦.*[0-9]" "$REPORT_FILE"
echo ""

echo "📈 表2: 周期暴露矩阵检查"
check_item "存储价格敏感度" "存储价格敏感度\|L1.*敏感度" "$REPORT_FILE"
check_item "客户CapEx敏感度" "客户CapEx敏感度\|L2.*敏感度" "$REPORT_FILE"
check_item "周期暴露总分" "周期暴露总分\|周期敏感度总分" "$REPORT_FILE"
echo ""

echo "🔧 表3: 结构性变量检查"
check_item "AI结构性驱动分析" "AI结构性\|HBM需求刚性\|算力基建" "$REPORT_FILE"
check_item "传统周期属性" "传统周期\|存储周期相关\|消费电子暴露" "$REPORT_FILE"
check_item "挤出效应风险" "挤出效应\|资本挤出\|产能挤出" "$REPORT_FILE"
echo ""

echo "📊 BPC瓶颈抽水率模型检查"
check_item "BPC计算或引用" "BPC\|瓶颈抽水率" "$REPORT_FILE"
echo ""

echo "🎯 可验证预测(VP)检查"
check_item_count "VP表格式" "VP-.*:" 3 "$REPORT_FILE"
check_item "验证时间节点" "验证时间\|时间节点" "$REPORT_FILE"
echo ""

echo "⚡ Kill Switch检查"
check_item "Kill Switch触发器" "Kill Switch\|触发器\|Tier[123]" "$REPORT_FILE"
echo ""

echo "📈 图表要求检查"
check_item "Mermaid图表" "```mermaid\|mermaid" "$REPORT_FILE"
echo ""

# 计算通过率
PASS_RATE=$((PASS_COUNT * 100 / TOTAL_CHECKS))

echo "=========================================="
echo "🎯 检查结果汇总"
echo "=========================================="
echo "通过项目: $PASS_COUNT / $TOTAL_CHECKS"
echo "通过率:   $PASS_RATE%"
echo ""

if [[ $PASS_RATE -ge 80 ]]; then
    echo "🏆 优秀! 框架v2.0合规性良好"
    exit 0
elif [[ $PASS_RATE -ge 60 ]]; then
    echo "⚠️  合格! 建议补充缺失项目"
    exit 0
else
    echo "❌ 不合格! 需要大幅改进以符合v2.0框架"
    exit 1
fi