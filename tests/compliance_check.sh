#!/bin/bash
# compliance_check.sh v1.1
# 报告合规性检查 — 检测CLAUDE.md禁止的推荐性用语
# 区分: 推荐性用语(FAIL) vs 分析性用语(OK)
# 用法: bash tests/compliance_check.sh <report_file>

set -euo pipefail

FILE="${1:-}"
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
    echo "用法: bash tests/compliance_check.sh <report_file>"
    echo "示例: bash tests/compliance_check.sh reports/AMZN/AMZN_Complete_v1.0.md"
    exit 1
fi

echo "=== 报告合规检查 v1.1 ==="
echo "文件: $(basename "$FILE")"
echo "时间: $(date '+%Y-%m-%d %H:%M')"
echo ""

FAIL=0
WARN=0

# Helper: safe grep count (避免 grep -c 返回0时exit 1的问题)
safe_count() {
    local pattern="$1"
    local file="$2"
    local result
    result=$(grep -cE "$pattern" "$file" 2>/dev/null) || result=0
    echo "$result"
}

# Helper: safe grep content
safe_grep() {
    local pattern="$1"
    local file="$2"
    { grep -nE "$pattern" "$file" 2>/dev/null || true; }
}

# --- 检查1: AI发出推荐性评级 (FAIL级) ---
# 关键区分: "投资评级: 买入" = FAIL | "买入信号识别" = OK
echo "--- [1/6] 推荐性评级用语 ---"

# 模式: 评级/级别 后跟 买入/卖出/推荐/持有
c1=$(safe_count '(投资评级|评级|级别).{0,5}(买入|卖出|强烈推荐|推荐|持有|减持|增持)' "$FILE")
if [ "$c1" -gt 0 ]; then
    echo "  FAIL: 推荐性评级表述 $c1 处"
    safe_grep '(投资评级|评级|级别).{0,5}(买入|卖出|强烈推荐|推荐|持有|减持|增持)' "$FILE" | head -5 | while read -r line; do
        echo "    -> $line"
    done
    FAIL=$((FAIL + 1))
else
    echo "  PASS"
fi

# --- 检查2: "建议买入/卖出" 推荐性用语 (FAIL级) ---
echo ""
echo "--- [2/6] 建议性用语 ---"
c2=$(safe_count '建议.{0,3}(买入|卖出|增持|减持|配置|仓位)' "$FILE")
if [ "$c2" -gt 0 ]; then
    echo "  FAIL: 建议性用语 $c2 处"
    safe_grep '建议.{0,3}(买入|卖出|增持|减持|配置|仓位)' "$FILE" | head -5 | while read -r line; do
        echo "    -> $line"
    done
    FAIL=$((FAIL + 1))
else
    echo "  PASS"
fi

# --- 检查3: 明确的仓位/配置建议 (FAIL级) ---
# 区分: "推荐配置比例: 10-20%" = FAIL | "资本配置效率" = OK
echo ""
echo "--- [3/6] 仓位配置建议 ---"
c3=$(safe_count '(推荐|建议).{0,5}(配置|仓位).{0,5}(比例|：|:)' "$FILE")
if [ "$c3" -gt 0 ]; then
    echo "  FAIL: 仓位配置建议 $c3 处"
    safe_grep '(推荐|建议).{0,5}(配置|仓位).{0,5}(比例|：|:)' "$FILE" | head -5 | while read -r line; do
        echo "    -> $line"
    done
    FAIL=$((FAIL + 1))
else
    echo "  PASS"
fi

# --- 检查4: 目标价使用 (WARN级) ---
# 传统框架(PW 0-3)允许目标价，混合/发现系统不允许
# 降级为WARN: 需要人工判断是否在允许的框架内
echo ""
echo "--- [4/6] 目标价使用 ---"
# 排除明显是引用外部来源的行(华尔街/分析师/卖方/空头)
ai_targets=$(safe_grep '目标价' "$FILE" | grep -vE '华尔街|分析师|卖方|一致|consensus|FactSet|Bloomberg|空头|如果|假设' || true)
# 检查是否有 "目标价: $XXX" 或 "目标价格: $XXX" 的直接推荐模式
ai_target_count=$(echo "$ai_targets" | grep -cE '目标价.{0,5}\$[0-9]' 2>/dev/null) || ai_target_count=0
if [ "$ai_target_count" -gt 0 ]; then
    echo "  WARN: 目标价表述 $ai_target_count 处 (传统框架PW≤3允许，混合/发现系统不允许)"
    echo "$ai_targets" | grep -E '目标价.{0,5}\$[0-9]' | head -5 | while read -r line; do
        echo "    -> $line"
    done
    WARN=$((WARN + 1))
else
    echo "  PASS"
fi

# --- 检查5: 英文推荐性用语 (FAIL级) ---
# "Strong Buy" / 评级用Buy/Sell 但排除引用卖方分布
echo ""
echo "--- [5/6] 英文推荐性用语 ---"
c5=$(safe_count 'Strong Buy|Strong Sell|rating.{0,5}Buy|rating.{0,5}Sell' "$FILE")
if [ "$c5" -gt 0 ]; then
    echo "  FAIL: 英文推荐性用语 $c5 处"
    safe_grep 'Strong Buy|Strong Sell|rating.{0,5}Buy|rating.{0,5}Sell' "$FILE" | head -5 | while read -r line; do
        echo "    -> $line"
    done
    FAIL=$((FAIL + 1))
else
    echo "  PASS"
fi

# --- 检查6: 台海合规 (WARN级) ---
echo ""
echo "--- [6/6] 台海合规 ---"
c6=$(safe_count '入侵台湾|invade taiwan|invasion of taiwan|中国入侵' "$FILE")
if [ "$c6" -gt 0 ]; then
    echo "  WARN: 非中性台海表述 $c6 处"
    safe_grep '入侵台湾|invade taiwan|invasion of taiwan|中国入侵' "$FILE" | head -5 | while read -r line; do
        echo "    -> $line"
    done
    WARN=$((WARN + 1))
else
    echo "  PASS"
fi

# --- 信息性检查: 正确评级体系 ---
echo ""
echo "--- [INFO] 正确评级体系使用 ---"
for term in "深度关注" "中性关注" "审慎关注"; do
    c=$(safe_count "$term" "$FILE")
    if [ "$c" -gt 0 ]; then
        echo "  \"$term\" x$c"
    fi
done

# --- 汇总 ---
echo ""
echo "=== 汇总 ==="
echo "FAIL: $FAIL | WARN: $WARN"

if [ "$FAIL" -gt 0 ]; then
    echo "结果: FAILED"
    exit 1
elif [ "$WARN" -gt 0 ]; then
    echo "结果: PASSED (有警告)"
    exit 0
else
    echo "结果: PASSED"
    exit 0
fi
