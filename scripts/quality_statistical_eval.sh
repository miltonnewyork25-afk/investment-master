#!/bin/bash
# ============================================================
# quality_statistical_eval.sh — 跨报告统计评测 v1.0
# ============================================================
# 借鉴: MiroFlow multi-run evaluation (mean/std/min/max + pass@k)
# 核心: 不看单份报告的绝对分数, 看跨报告的趋势和离散度
#
# 用法:
#   bash scripts/quality_statistical_eval.sh [--recent N]
#
# 功能:
#   1. 扫描所有完成报告的质量指标 (DM密度/因果密度/字符数/Mermaid)
#   2. 计算 mean / std / min / max / trend
#   3. 检测异常值 (>2σ 偏离)
#   4. 输出质量趋势报告
#
# 退出码: 0=正常, 1=有异常
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

RECENT_N=0
for arg in "$@"; do
    if [[ "$arg" == "--recent" ]]; then
        shift
        RECENT_N="${1:-10}"
        shift 2>/dev/null || true
    fi
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${CYAN}========================================"
echo " Quality Statistical Eval v1.0"
echo " MiroFlow-inspired multi-run analysis"
echo -e "========================================${NC}"
echo ""

# ============================================================
# Step 1: 收集所有完成报告的质量指标
# ============================================================
echo -e "${CYAN}[Step 1] 扫描完成报告...${NC}"

TICKERS=()
DM_DENSITIES=()
CHAR_COUNTS=()
MERMAID_COUNTS=()
CAUSAL_DENSITIES=()

for report_dir in "${REPO_ROOT}"/reports/*/; do
    [ -d "$report_dir" ] || continue
    ticker=$(basename "$report_dir")

    # 找 Complete 报告
    complete_file=""
    for cf in "${report_dir}"/*complete*.md "${report_dir}"/*Complete*.md "${report_dir}"/${ticker}_complete_*.md; do
        [ -f "$cf" ] && complete_file="$cf" && break
    done
    [ -z "$complete_file" ] && continue

    # 提取指标
    chars=$(wc -m < "$complete_file" 2>/dev/null || echo 0)
    chars="${chars// /}"
    [ "$chars" -lt 10000 ] && continue  # 跳过太小的文件

    dm_count=$({ grep -c 'DM-' "$complete_file" 2>/dev/null || echo 0; })
    dm_count=$(echo "$dm_count" | tr -d '\n ')
    mermaid=$({ grep -c '```mermaid' "$complete_file" 2>/dev/null || echo 0; })
    mermaid=$(echo "$mermaid" | tr -d '\n ')
    causal=$({ grep -cE '因为|因此|这意味着|这解释了|导致|所以' "$complete_file" 2>/dev/null || echo 0; })
    causal=$(echo "$causal" | tr -d '\n ')

    # 计算密度
    dm_density=$(python3 -c "print(round($dm_count * 1000 / $chars, 2))" 2>/dev/null || echo 0)
    causal_density=$(python3 -c "print(round($causal * 10000 / $chars, 2))" 2>/dev/null || echo 0)

    TICKERS+=("$ticker")
    DM_DENSITIES+=("$dm_density")
    CHAR_COUNTS+=("$chars")
    MERMAID_COUNTS+=("$mermaid")
    CAUSAL_DENSITIES+=("$causal_density")
done

TOTAL_REPORTS=${#TICKERS[@]}
echo "  找到 ${TOTAL_REPORTS} 份完成报告"
echo ""

if [ "$TOTAL_REPORTS" -lt 3 ]; then
    echo -e "${YELLOW}报告数量不足 (<3), 统计分析无意义${NC}"
    exit 0
fi

# 如果指定了 --recent，只取最近 N 份
if [ "$RECENT_N" -gt 0 ] && [ "$RECENT_N" -lt "$TOTAL_REPORTS" ]; then
    START=$((TOTAL_REPORTS - RECENT_N))
    TICKERS=("${TICKERS[@]:$START}")
    DM_DENSITIES=("${DM_DENSITIES[@]:$START}")
    CHAR_COUNTS=("${CHAR_COUNTS[@]:$START}")
    MERMAID_COUNTS=("${MERMAID_COUNTS[@]:$START}")
    CAUSAL_DENSITIES=("${CAUSAL_DENSITIES[@]:$START}")
    TOTAL_REPORTS=${#TICKERS[@]}
    echo -e "  ${CYAN}使用最近 ${TOTAL_REPORTS} 份报告${NC}"
    echo ""
fi

# ============================================================
# Step 2: 计算统计指标 (mean/std/min/max)
# ============================================================
echo -e "${CYAN}[Step 2] 计算统计指标...${NC}"
echo ""

compute_stats() {
    local name="$1"
    shift
    local values=("$@")
    local n=${#values[@]}

    python3 << PYEOF
import statistics
vals = [float(v) for v in """${values[*]}""".split()]
n = len(vals)
mean = statistics.mean(vals)
stdev = statistics.stdev(vals) if n > 1 else 0
mn = min(vals)
mx = max(vals)
# 趋势: 后半段均值 vs 前半段均值
half = n // 2
if half > 0:
    first_half = statistics.mean(vals[:half])
    second_half = statistics.mean(vals[half:])
    trend = "↑" if second_half > first_half * 1.05 else ("↓" if second_half < first_half * 0.95 else "→")
    trend_pct = round((second_half - first_half) / first_half * 100, 1) if first_half > 0 else 0
else:
    trend = "→"
    trend_pct = 0

print(f"  {' ' * (20-len('$name'))}$name: mean={mean:.2f}  std={stdev:.2f}  min={mn:.2f}  max={mx:.2f}  trend={trend} ({trend_pct:+.1f}%)")

# 检测异常值 (>2σ)
anomalies = []
for i, v in enumerate(vals):
    if stdev > 0 and abs(v - mean) > 2 * stdev:
        anomalies.append((i, v))
if anomalies:
    print(f"    {'':>20}⚠ 异常值: {', '.join(f'#{i}={v:.2f}' for i,v in anomalies)}")
PYEOF
}

echo -e "${BOLD}  指标统计 (${TOTAL_REPORTS} 份报告):${NC}"
compute_stats "DM密度(/千字)" "${DM_DENSITIES[@]}"
compute_stats "因果密度(/万字)" "${CAUSAL_DENSITIES[@]}"
compute_stats "字符数" "${CHAR_COUNTS[@]}"
compute_stats "Mermaid图" "${MERMAID_COUNTS[@]}"
echo ""

# ============================================================
# Step 3: 单报告明细
# ============================================================
echo -e "${CYAN}[Step 3] 报告明细...${NC}"
echo ""
printf "  ${BOLD}%-8s  %10s  %8s  %8s  %8s${NC}\n" "Ticker" "字符" "DM密度" "因果密度" "Mermaid"
printf "  %-8s  %10s  %8s  %8s  %8s\n" "------" "------" "------" "------" "------"

for i in $(seq 0 $((TOTAL_REPORTS - 1))); do
    printf "  %-8s  %10s  %8s  %8s  %8s\n" \
        "${TICKERS[$i]}" "${CHAR_COUNTS[$i]}" "${DM_DENSITIES[$i]}" "${CAUSAL_DENSITIES[$i]}" "${MERMAID_COUNTS[$i]}"
done

echo ""
echo -e "${GREEN}========================================"
echo " 评测完成"
echo -e "========================================${NC}"
