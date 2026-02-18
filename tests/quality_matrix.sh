#!/bin/bash
# ============================================================
# quality_matrix.sh — 历史质量矩阵生成器 v1.0
# ============================================================
# 用法: ./tests/quality_matrix.sh [--csv] [--sort=date|size|density]
# 功能: 扫描所有Complete报告，提取质量指标，生成对比矩阵
#       支持CSV导出和多维排序
# 退出码: 0=成功
# ============================================================

set -uo pipefail

# --- 参数 ---
CSV_MODE=0
SORT_BY="date"
for arg in "$@"; do
    case "$arg" in
        --csv) CSV_MODE=1 ;;
        --sort=*) SORT_BY="${arg#--sort=}" ;;
    esac
done

# --- 路径 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPORTS_DIR="${REPO_ROOT}/reports"

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# --- 已知报告列表 (按完成日期排序) ---
# 格式: TICKER|日期|框架版本
KNOWN_REPORTS=(
    "META|2026-02-08|v8"
    "SOFI|2026-02-09|v8"
    "COST|2026-02-10|v8"
    "MU|2026-02-10|v8"
    "GOOGL|2026-02-10|v9"
    "TSM|2026-02-10|v9"
    "LRCX|2026-02-11|v9"
    "AMD|2026-02-11|v9"
    "TSLA|2026-02-11|v9"
    "PLTR|2026-02-12|v10"
    "ASML|2026-02-13|v10"
    "RDDT|2026-02-14|v10"
    "PG|2026-02-10|v8"
)

# --- 指标提取函数 ---

extract_framework_version() {
    local file="$1"
    local version
    version=$(grep -oE '框架版本[: ]*v[0-9]+\.[0-9]+' "$file" 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+' | head -1) || true
    if [ -z "$version" ]; then
        version=$(grep -oE 'v[0-9]+\.[0-9]+ *框架' "$file" 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+' | head -1) || true
    fi
    echo "${version:-—}"
}

extract_possibility_width() {
    local file="$1"
    local width
    width=$(grep -oE '可能性宽度[: ]*[0-9]+' "$file" 2>/dev/null | grep -oE '[0-9]+' | head -1) || true
    echo "${width:-—}"
}

extract_cq_confidence() {
    local file="$1"
    local conf
    conf=$(grep -oE 'CQ加权置信度[: ]*[0-9]+\.?[0-9]*%?' "$file" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*' | head -1) || true
    echo "${conf:-—}"
}

extract_method_dispersion() {
    local file="$1"
    local disp
    disp=$(grep -oE '方法离散度[: ]*[0-9]+\.?[0-9]*x' "$file" 2>/dev/null | grep -oE '[0-9]+\.?[0-9]*' | head -1) || true
    echo "${disp:-—}"
}

extract_mermaid_count() {
    local file="$1"
    local count
    count=$(grep -c '```mermaid' "$file" 2>/dev/null || echo 0)
    echo "$count"
}

extract_ks_count() {
    local file="$1"
    local ks1 ks2 ks3 max_ks
    ks1=$(grep -oE 'KS-[A-Z]+-[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    ks2=$(grep -oE 'KS-[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    ks3=$(grep -oE 'KS[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    max_ks=$ks1
    if [ "$ks2" -gt "$max_ks" ] 2>/dev/null; then max_ks=$ks2; fi
    if [ "$ks3" -gt "$max_ks" ] 2>/dev/null; then max_ks=$ks3; fi
    echo "$max_ks"
}

extract_ts_count() {
    local file="$1"
    local ts
    ts=$(grep -oE 'TS-[A-Z]*-?[0-9]+|TS[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    echo "${ts:-0}"
}

extract_ci_count() {
    local file="$1"
    local ci
    ci=$(grep -oE 'CI-[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    echo "${ci:-0}"
}

extract_cq_count() {
    local file="$1"
    local cq
    cq=$(grep -oE 'CQ[0-9]+|CQ-[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    echo "${cq:-0}"
}

extract_dm_count() {
    local file="$1"
    local dm
    dm=$(grep -oE 'DM-[A-Z]+-[0-9]+' "$file" 2>/dev/null | sort -u | wc -l | tr -d ' ') || true
    echo "${dm:-0}"
}

extract_annotation_density() {
    local file="$1"
    local chars="$2"
    # Try DM anchors first (v10.0+)
    local dm_count
    dm_count=$(grep -oE 'DM-[A-Z]+-[0-9]+' "$file" 2>/dev/null | wc -l | tr -d ' ') || true
    if [ "$dm_count" -gt 10 ] && [ "$chars" -gt 0 ]; then
        python3 -c "print(round($dm_count * 10000 / $chars, 1))"
        return
    fi
    # Fallback to inline annotations (v9.0)
    local old_ann new_ann total
    old_ann=$(grep -oE '\[(A|B|P|E):' "$file" 2>/dev/null | wc -l | tr -d ' ') || true
    new_ann=$(grep -oE '\[(硬数据|合理推断|主观判断):' "$file" 2>/dev/null | wc -l | tr -d ' ') || true
    total=$((old_ann + new_ann))
    if [ "$total" -gt 0 ] && [ "$chars" -gt 0 ]; then
        python3 -c "print(round($total * 10000 / $chars, 1))"
    else
        echo "—"
    fi
}

extract_cg_result() {
    local ticker="$1"
    local checkpoint="${REPORTS_DIR}/${ticker}/data/checkpoint.yaml"
    if [ -f "$checkpoint" ]; then
        local cg
        cg=$(grep -oE 'cg_result: *"[^"]*"' "$checkpoint" 2>/dev/null | grep -oE '"[^"]*"' | tr -d '"') || true
        echo "${cg:-—}"
    else
        echo "—"
    fi
}

# --- 从checkpoint读取(如果存在) ---
read_checkpoint_field() {
    local ticker="$1"
    local field="$2"
    local checkpoint="${REPORTS_DIR}/${ticker}/data/checkpoint.yaml"
    if [ -f "$checkpoint" ]; then
        local val
        val=$(grep -E "^ *${field}:" "$checkpoint" 2>/dev/null | head -1 | sed 's/.*: *//' | tr -d '"') || true
        echo "${val:-}"
    fi
}

# --- 主扫描 ---
declare -a RESULTS=()

for ticker_dir in "${REPORTS_DIR}"/*/; do
    TICKER=$(basename "$ticker_dir")
    # Skip non-ticker directories
    case "$TICKER" in
        archived|reflection|tesla) continue ;;
    esac

    # Find latest Complete file
    COMPLETE_FILE=$(ls -1 "${ticker_dir}${TICKER}_Complete_"* 2>/dev/null | tail -1)
    if [ -z "$COMPLETE_FILE" ]; then
        continue
    fi

    BASENAME=$(basename "$COMPLETE_FILE")
    CHARS=$(wc -m < "$COMPLETE_FILE" | tr -d ' ')

    # Extract date from filename
    DATE=$(echo "$BASENAME" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)
    DATE="${DATE:-unknown}"

    # Extract version from filename
    FILE_VERSION=$(echo "$BASENAME" | grep -oE 'v[0-9]+\.[0-9]+' | head -1)
    FILE_VERSION="${FILE_VERSION:-v?}"

    # Framework version (from report content)
    FW_VERSION=$(extract_framework_version "$COMPLETE_FILE")
    if [ "$FW_VERSION" = "—" ]; then
        # Try checkpoint
        CP_FW=$(read_checkpoint_field "$TICKER" "framework_version")
        if [ -n "$CP_FW" ]; then FW_VERSION="$CP_FW"; fi
    fi

    # All metrics
    CG=$(extract_cg_result "$TICKER")
    PW=$(extract_possibility_width "$COMPLETE_FILE")
    MERMAID=$(extract_mermaid_count "$COMPLETE_FILE")
    KS=$(extract_ks_count "$COMPLETE_FILE")
    TS=$(extract_ts_count "$COMPLETE_FILE")
    CI=$(extract_ci_count "$COMPLETE_FILE")
    CQ=$(extract_cq_count "$COMPLETE_FILE")
    DM=$(extract_dm_count "$COMPLETE_FILE")
    DENSITY=$(extract_annotation_density "$COMPLETE_FILE" "$CHARS")
    CQ_CONF=$(extract_cq_confidence "$COMPLETE_FILE")
    DISP=$(extract_method_dispersion "$COMPLETE_FILE")

    # Format size
    SIZE_K=$(python3 -c "print(round($CHARS / 1000, 1))")

    # Store result as pipe-delimited string
    RESULTS+=("${DATE}|${TICKER}|${FILE_VERSION}|${FW_VERSION}|${SIZE_K}K|${CG}|${PW}|${DENSITY}|${MERMAID}|${CQ_CONF}|${DISP}|${KS}|${TS}|${CI}|${CQ}|${DM}")
done

# --- 排序 ---
IFS=$'\n'
case "$SORT_BY" in
    size)
        SORTED=($(for r in "${RESULTS[@]}"; do echo "$r"; done | sort -t'|' -k5 -rn))
        ;;
    density)
        SORTED=($(for r in "${RESULTS[@]}"; do echo "$r"; done | sort -t'|' -k8 -rn))
        ;;
    *)  # date
        SORTED=($(for r in "${RESULTS[@]}"; do echo "$r"; done | sort -t'|' -k1))
        ;;
esac
unset IFS

# --- 输出 ---

if [ "$CSV_MODE" -eq 1 ]; then
    # CSV output
    echo "日期,代码,报告版本,框架版本,体量,CG,可能性宽度,密度(/万),Mermaid,CQ置信度%,方法离散度,KS,TS,CI,CQ,DM锚点"
    for row in "${SORTED[@]}"; do
        echo "$row" | tr '|' ','
    done
    exit 0
fi

# Terminal formatted output
echo ""
echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${CYAN}  报告质量矩阵 — $(date +%Y-%m-%d) (按${SORT_BY}排序)${NC}"
echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════════════════════════════════════════════${NC}"
echo ""

# Header
printf "${BOLD}%-12s %-6s %-5s %-5s %7s  %-7s  %-3s  %6s  %4s  %6s  %6s  %3s %3s %3s %3s %4s${NC}\n" \
    "日期" "代码" "报告" "框架" "体量" "CG" "PW" "密度" "MMD" "CQ%" "离散" "KS" "TS" "CI" "CQ" "DM"
echo "─────────── ────── ───── ───── ─────── ─────── ─── ────── ──── ────── ────── ─── ─── ─── ─── ────"

for row in "${SORTED[@]}"; do
    IFS='|' read -r date ticker fver fwver size cg pw density mermaid cqconf disp ks ts ci cq dm <<< "$row"

    # Color coding by framework version
    case "$fwver" in
        v10*) COLOR="${GREEN}" ;;
        v9*)  COLOR="${CYAN}" ;;
        *)    COLOR="${DIM}" ;;
    esac

    printf "${COLOR}%-12s %-6s %-5s %-5s %7s  %-7s  %3s  %6s  %4s  %6s  %6s  %3s %3s %3s %3s %4s${NC}\n" \
        "$date" "$ticker" "$fver" "$fwver" "$size" "$cg" "$pw" "$density" "$mermaid" "$cqconf" "$disp" "$ks" "$ts" "$ci" "$cq" "$dm"
done

echo ""
echo "─────────── ────── ───── ───── ─────── ─────── ─── ────── ──── ────── ────── ─── ─── ─── ─── ────"

# --- 汇总统计 ---
TOTAL=${#SORTED[@]}
echo ""
echo -e "${BOLD}汇总 (${TOTAL} 份报告):${NC}"

# Average size
TOTAL_CHARS=0
COUNT_WITH_CG=0
for row in "${SORTED[@]}"; do
    IFS='|' read -r _ _ _ _ size cg _ _ _ _ _ _ _ _ _ _ <<< "$row"
    SIZE_NUM=$(echo "$size" | tr -d 'K')
    TOTAL_CHARS=$(python3 -c "print(round($TOTAL_CHARS + $SIZE_NUM, 1))")
    if [ "$cg" != "—" ]; then
        COUNT_WITH_CG=$((COUNT_WITH_CG + 1))
    fi
done
AVG_SIZE=$(python3 -c "print(round($TOTAL_CHARS / $TOTAL, 1))")
echo "  平均体量: ${AVG_SIZE}K | CG记录: ${COUNT_WITH_CG}/${TOTAL}"

# Framework version distribution
echo ""
echo -e "${BOLD}框架版本分布:${NC}"
for row in "${SORTED[@]}"; do
    IFS='|' read -r _ ticker _ fwver _ _ _ _ _ _ _ _ _ _ _ _ <<< "$row"
    echo "${fwver}|${ticker}"
done | sort | awk -F'|' '{
    fw[$1] = fw[$1] " " $2
}
END {
    for (f in fw) {
        printf "  %-6s:%s\n", f, fw[f]
    }
}' | sort

# Feature usage tracking
echo ""
echo -e "${BOLD}特性使用追踪:${NC}"
DM_REPORTS=0
ERM_REPORTS=0
OVM_REPORTS=0
SCOUT_REPORTS=0
for row in "${SORTED[@]}"; do
    IFS='|' read -r _ ticker _ _ _ _ _ _ _ _ _ _ _ _ _ dm <<< "$row"
    DM_NUM=$(echo "$dm" | tr -d ' ')
    if [ "$DM_NUM" -gt 10 ] 2>/dev/null; then
        DM_REPORTS=$((DM_REPORTS + 1))
    fi
done

# Check for ERM/OVM/Scout in report content
for ticker_dir in "${REPORTS_DIR}"/*/; do
    TICKER=$(basename "$ticker_dir")
    case "$TICKER" in archived|reflection|tesla) continue ;; esac
    COMPLETE_FILE=$(ls -1 "${ticker_dir}${TICKER}_Complete_"* 2>/dev/null | tail -1)
    if [ -z "$COMPLETE_FILE" ]; then continue; fi

    if grep -q 'ERM\|生态风险映射' "$COMPLETE_FILE" 2>/dev/null; then
        ERM_REPORTS=$((ERM_REPORTS + 1))
    fi
    if grep -q 'OVM\|期权估值' "$COMPLETE_FILE" 2>/dev/null; then
        OVM_REPORTS=$((OVM_REPORTS + 1))
    fi
    if grep -q 'Scout\|scout' "$COMPLETE_FILE" 2>/dev/null; then
        SCOUT_REPORTS=$((SCOUT_REPORTS + 1))
    fi
done

echo "  DM锚点系统 (v10.0): ${DM_REPORTS}/${TOTAL} 份报告"
echo "  ERM生态风险 (v11.0): ${ERM_REPORTS}/${TOTAL} 份报告"
echo "  OVM期权估值:         ${OVM_REPORTS}/${TOTAL} 份报告"
echo "  Scout协议:           ${SCOUT_REPORTS}/${TOTAL} 份报告"

# v12.0 features (should be 0)
echo ""
echo -e "${BOLD}v12.0 实验特性 (未验证):${NC}"
DAG_REPORTS=0
EC_REPORTS=0
COVE_REPORTS=0
for ticker_dir in "${REPORTS_DIR}"/*/; do
    TICKER=$(basename "$ticker_dir")
    case "$TICKER" in archived|reflection|tesla) continue ;; esac
    COMPLETE_FILE=$(ls -1 "${ticker_dir}${TICKER}_Complete_"* 2>/dev/null | tail -1)
    if [ -z "$COMPLETE_FILE" ]; then continue; fi

    if grep -q 'DAG-[0-7]' "$COMPLETE_FILE" 2>/dev/null; then
        DAG_REPORTS=$((DAG_REPORTS + 1))
    fi
    if grep -q 'EC-[A-Z]+-[0-9]+' "$COMPLETE_FILE" 2>/dev/null; then
        EC_REPORTS=$((EC_REPORTS + 1))
    fi
    if grep -q 'CoVe' "$COMPLETE_FILE" 2>/dev/null; then
        COVE_REPORTS=$((COVE_REPORTS + 1))
    fi
done

if [ "$DAG_REPORTS" -eq 0 ] && [ "$EC_REPORTS" -eq 0 ] && [ "$COVE_REPORTS" -eq 0 ]; then
    echo -e "  ${YELLOW}DAG编排器: 0/${TOTAL} | Evidence Cards: 0/${TOTAL} | CoVe: 0/${TOTAL}${NC}"
    echo -e "  ${YELLOW}→ v12.0 所有实验特性零使用，建议冻结${NC}"
else
    echo "  DAG编排器: ${DAG_REPORTS}/${TOTAL} | Evidence Cards: ${EC_REPORTS}/${TOTAL} | CoVe: ${COVE_REPORTS}/${TOTAL}"
fi

echo ""
echo -e "${DIM}提示: --csv 导出CSV | --sort=size|date|density 切换排序${NC}"
echo ""
