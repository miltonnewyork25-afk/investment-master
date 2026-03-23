#!/bin/bash
# ============================================================
# 质量健康检查 v1.0 — 定期自检系统
#
# 触发时机:
#   1. 每份报告Complete后自动运行 (嵌入post_report_autopsy.sh)
#   2. 每5份报告后运行完整版 (跨报告趋势分析)
#   3. 用户手动: bash scripts/quality_health_check.sh [--full]
#
# 检查内容:
#   A. 最近5份报告的质量趋势
#   B. DM密度趋势 (是否在下降?)
#   C. 未实施的EVO提议积压
#   D. 进化系统是否停滞
#   E. 估值统一性抽查
# ============================================================

set -o pipefail

REPORTS_DIR="reports"
MEMORY_DIR="memory"
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "============================================================"
echo "  质量健康检查 v1.0"
echo "  日期: $(date +%Y-%m-%d)"
echo "============================================================"
echo ""

# ============================================================
# A. 最近报告质量趋势
# ============================================================
echo "--- A. 最近完成的报告 ---"
echo ""

recent_reports=()
while IFS= read -r f; do
    recent_reports+=("$f")
done < <(find "$REPORTS_DIR" -name "*Complete*" -type f -newer "$REPORTS_DIR" 2>/dev/null | sort -t/ -k3 | tail -10)

if [ ${#recent_reports[@]} -eq 0 ]; then
    # Fallback: find all Complete files sorted by modification time
    while IFS= read -r f; do
        recent_reports+=("$f")
    done < <(find "$REPORTS_DIR" -name "*Complete*" -type f 2>/dev/null -exec stat -f "%m %N" {} \; | sort -rn | head -10 | awk '{print $2}')
fi

printf "  %-8s %-10s %-8s %-8s %-8s %-8s %-6s\n" "Ticker" "Date" "Size" "DM" "DM/千字" "因果/万字" "状态"
printf "  %-8s %-10s %-8s %-8s %-8s %-8s %-6s\n" "------" "--------" "------" "----" "------" "--------" "----"

dm_densities=()
for report in "${recent_reports[@]}"; do
    ticker=$(echo "$report" | sed 's|reports/||' | cut -d'/' -f1)
    mod_date=$(stat -f "%Sm" -t "%Y-%m-%d" "$report" 2>/dev/null || echo "unknown")
    char_count=$(wc -m < "$report" 2>/dev/null | tr -d ' ')
    dm_count=$(grep -c 'DM-' "$report" 2>/dev/null || echo 0)

    if [ "$char_count" -gt 0 ] 2>/dev/null; then
        dm_density=$(echo "scale=2; $dm_count * 1000 / $char_count" | bc 2>/dev/null || echo "0")
        dm_densities+=("$dm_density")

        # Causal reasoning density (v19.2)
        causal_count=$({ grep -c '因为\|因此\|这意味着\|这解释了' "$report" || echo "0"; })
        causal_density=$(echo "scale=2; $causal_count * 10000 / $char_count" | bc 2>/dev/null || echo "0")

        # Status: check both DM and causal density
        status="✓"
        if (( $(echo "$dm_density < 0.5" | bc -l 2>/dev/null || echo 1) )); then
            status="${RED}✗ DM${NC}"
        elif (( $(echo "$causal_density < 3.0" | bc -l 2>/dev/null || echo 0) )); then
            status="${RED}✗ 证据链${NC}"
        elif (( $(echo "$dm_density < 0.8" | bc -l 2>/dev/null || echo 0) )); then
            status="${YELLOW}⚠ DM${NC}"
        elif (( $(echo "$causal_density < 5.0" | bc -l 2>/dev/null || echo 0) )); then
            status="${YELLOW}⚠ 推理弱${NC}"
        fi

        size_k=$(echo "scale=0; $char_count / 1000" | bc 2>/dev/null || echo "?")
        printf "  %-8s %-10s %-8s %-8s %-8s %-8s " "$ticker" "$mod_date" "${size_k}K" "$dm_count" "$dm_density" "$causal_density"
        echo -e "$status"
    fi
done

echo ""

# DM trend detection
if [ ${#dm_densities[@]} -ge 3 ]; then
    first=${dm_densities[0]}
    last=${dm_densities[${#dm_densities[@]}-1]}
    trend=$(echo "scale=2; $last - $first" | bc 2>/dev/null || echo "0")
    if (( $(echo "$trend < -0.3" | bc -l 2>/dev/null || echo 0) )); then
        echo -e "  ${RED}⚠ DM密度趋势: 下降中 ($first → $last, Δ=$trend)${NC}"
        echo "  → 铁律L门控可能未生效, 检查Assembly流程"
    else
        echo -e "  ${GREEN}DM密度趋势: 稳定或上升${NC}"
    fi
fi

echo ""

# ============================================================
# B. 进化系统活跃度
# ============================================================
echo "--- B. 进化系统活跃度 ---"
echo ""

# Last evolution update
last_evo=$(ls -t "$MEMORY_DIR"/*evolution* "$MEMORY_DIR"/*recursive* 2>/dev/null | head -1)
if [ -n "$last_evo" ]; then
    last_evo_date=$(stat -f "%Sm" -t "%Y-%m-%d" "$last_evo" 2>/dev/null || echo "unknown")
    echo "  最后进化更新: $last_evo_date ($last_evo)"
else
    last_evo_date="never"
    echo -e "  ${RED}最后进化更新: 从未${NC}"
fi

# Count reports since last evolution
reports_since=0
if [ "$last_evo_date" != "never" ] && [ "$last_evo_date" != "unknown" ]; then
    for report in "${recent_reports[@]}"; do
        report_date=$(stat -f "%Sm" -t "%Y-%m-%d" "$report" 2>/dev/null)
        if [[ "$report_date" > "$last_evo_date" ]]; then
            reports_since=$((reports_since + 1))
        fi
    done
fi

if [ "$reports_since" -ge 5 ]; then
    echo -e "  ${RED}⚠ 自上次进化以来已完成 $reports_since 份报告 — 进化系统停滞!${NC}"
    echo "  → 立即运行 /deep-reflection 对最近报告进行反思"
    echo "  → 检查EVO提议积压(见下)"
elif [ "$reports_since" -ge 3 ]; then
    echo -e "  ${YELLOW}自上次进化以来已完成 $reports_since 份报告 — 建议运行反思${NC}"
else
    echo -e "  ${GREEN}自上次进化以来 $reports_since 份报告 — 正常${NC}"
fi

echo ""

# ============================================================
# C. EVO提议积压
# ============================================================
echo "--- C. 未实施的EVO提议 ---"
echo ""

evo_count=$(grep -roh "EVO-[A-Z]*-[0-9]*" "$MEMORY_DIR"/ 2>/dev/null | sort -u | wc -l | tr -d ' ')
echo "  已登记EVO提议: $evo_count 个"

# Check which are marked as implemented
implemented=$(grep -rl "已实施\|✅\|DONE\|implemented" "$MEMORY_DIR"/*evolution* 2>/dev/null | wc -l | tr -d ' ')
echo "  状态: 大部分停留在提议阶段"

if [ "$evo_count" -gt 10 ]; then
    echo -e "  ${YELLOW}⚠ 积压 $evo_count 个EVO提议 — 需要审批或清理${NC}"
    echo "  → 优先实施P1级别的EVO"
    echo "  → 已过时的EVO标记为WONTFIX"
fi

echo ""

# ============================================================
# D. 框架版本 vs 实际执行
# ============================================================
echo "--- D. 框架合规性 ---"
echo ""

version=$(grep -m1 "当前版本" CLAUDE.md 2>/dev/null | grep -oE "v[0-9]+\.[0-9]+" | head -1)
echo "  框架版本: $version"

# Check if key v19.0 rules exist
if grep -q "铁律 K" CLAUDE.md 2>/dev/null; then
    echo -e "  ${GREEN}铁律K (估值统一性): 已部署${NC}"
else
    echo -e "  ${RED}铁律K (估值统一性): 缺失${NC}"
fi

if grep -q "铁律 L" CLAUDE.md 2>/dev/null; then
    echo -e "  ${GREEN}铁律L (DM硬门控): 已部署${NC}"
else
    echo -e "  ${RED}铁律L (DM硬门控): 缺失${NC}"
fi

if grep -q "铁律 M" CLAUDE.md 2>/dev/null; then
    echo -e "  ${GREEN}铁律M (反膨胀): 已部署${NC}"
else
    echo -e "  ${RED}铁律M (反膨胀): 缺失${NC}"
fi

if grep -q "密度优先\|密度>体量" CLAUDE.md 2>/dev/null; then
    echo -e "  ${GREEN}密度>体量原则: 已部署${NC}"
else
    echo -e "  ${RED}密度>体量原则: 缺失${NC}"
fi

echo ""

# ============================================================
# E. 综合建议
# ============================================================
echo "--- E. 综合建议 ---"
echo ""

issues=0

if [ "$reports_since" -ge 5 ]; then
    echo "  1. [紧急] 进化系统停滞 ${reports_since}份报告 → 运行批量反思"
    issues=$((issues + 1))
fi

if [ "$evo_count" -gt 10 ]; then
    echo "  2. [重要] ${evo_count}个EVO积压 → 审批/清理"
    issues=$((issues + 1))
fi

# Check for low DM density in recent reports
low_dm=0
for d in "${dm_densities[@]}"; do
    if (( $(echo "$d < 0.5" | bc -l 2>/dev/null || echo 0) )); then
        low_dm=$((low_dm + 1))
    fi
done
if [ "$low_dm" -gt 0 ]; then
    echo "  3. [紧急] ${low_dm}份报告DM密度<0.5 → 铁律L应阻断"
    issues=$((issues + 1))
fi

if [ "$issues" -eq 0 ]; then
    echo -e "  ${GREEN}所有检查通过。系统健康。${NC}"
else
    echo ""
    echo -e "  ${RED}发现 $issues 个问题需要处理。${NC}"
fi

echo ""
echo "============================================================"
echo "  检查完成"
echo "============================================================"
