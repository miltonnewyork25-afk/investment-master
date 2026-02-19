#!/bin/bash
# ============================================================
# update_excellence_catalog.sh v2.0 — 报告完成后更新最佳实践目录
# ============================================================
# 用法: bash scripts/update_excellence_catalog.sh <TICKER> <REPORT_PATH>
#
# 功能:
# 1. 扫描报告中的章节评分 (从交叉审计表/质量评估中提取)
# 2. 对比现有excellence_catalog.yaml中的冠军评分
# 3. 输出升级/持平/不及决策
# 4. 生成结构化YAML片段供AI插入catalog
#
# 输入: 报告中需包含 "X.X/5" 或 "评分: X.X" 格式的章节评分
# 输出: 升级建议 (AI审核后手动应用到catalog)
# ============================================================

set -uo pipefail

TICKER="${1:?用法: $0 <TICKER> <REPORT_PATH>}"
REPORT_PATH="${2:?用法: $0 <TICKER> <REPORT_PATH>}"
CATALOG="knowledge/excellence_catalog.yaml"

if [[ ! -f "$REPORT_PATH" ]]; then
    echo "ERROR: 报告不存在: $REPORT_PATH"
    exit 1
fi

if [[ ! -f "$CATALOG" ]]; then
    echo "ERROR: Excellence catalog不存在: $CATALOG"
    exit 1
fi

echo "═══════════════════════════════════════════════════"
echo "  Excellence Catalog Updater v2.0"
echo "  Report: $TICKER | $(basename "$REPORT_PATH")"
echo "═══════════════════════════════════════════════════"
echo ""

# ============================================================
# 1. 提取当前catalog冠军评分
# ============================================================
echo "--- [1/3] 当前冠军 ---"

# 解析catalog中的champion和score
declare -a cat_domains=()
declare -a cat_champions=()
declare -a cat_scores=()

current_domain=""
while IFS= read -r line; do
    # 检测域名 (顶级YAML key, 如 valuation:, customer_analysis:)
    if echo "$line" | grep -qE '^[a-z_]+:$'; then
        current_domain=$(echo "$line" | sed 's/://');
    fi
    # 检测子域名 (如 belief_inversion:)
    if echo "$line" | grep -qE '^  [a-z_]+:$'; then
        sub_domain=$(echo "$line" | sed 's/://; s/^ *//')
        full_domain="${current_domain}.${sub_domain}"
    fi
    # 提取champion
    if echo "$line" | grep -qE '^\s+champion:'; then
        champ=$(echo "$line" | sed 's/.*champion: *"\{0,1\}\([^"]*\)"\{0,1\}/\1/' | tr -d ' ')
        cat_champions+=("$champ")
        cat_domains+=("${full_domain:-unknown}")
    fi
    # 提取score
    if echo "$line" | grep -qE '^\s+score:'; then
        score=$(echo "$line" | sed 's/.*score: *//' | tr -d ' ')
        cat_scores+=("$score")
    fi
done < "$CATALOG"

for ((i=0; i<${#cat_domains[@]}; i++)); do
    printf "  %-35s  %-20s  %s\n" "${cat_domains[$i]}" "${cat_champions[$i]}" "${cat_scores[$i]}/5"
done
echo ""

# ============================================================
# 2. 扫描报告中的章节评分
# ============================================================
echo "--- [2/3] 报告章节评分扫描 ---"

# 搜索模式: "Ch{N} ... (X.X/5)" 或 "评分: X.X" 或 "X.X/5.0"
# 提取格式: chapter_ref|score|context_line
report_scores=()
report_chapters=()
report_contexts=()

# 模式1: 明确的 "X.X/5" 评分 (在章节标题或评估表中)
while IFS= read -r line; do
    # 跳过注释和空行
    if echo "$line" | grep -qE '^\s*$|^\s*#'; then continue; fi

    # 提取 X.X/5 或 X.X/5.0 模式
    scores_in_line=$({ echo "$line" | grep -oE '[0-9]\.[0-9]/5\.?0?' || true; })
    if [[ -n "$scores_in_line" ]]; then
        # 提取关联的章节标题
        ch_ref=$({ echo "$line" | grep -oE 'Ch[0-9]+[^)]*' || true; } | head -1)
        if [[ -z "$ch_ref" ]]; then
            ch_ref=$(echo "$line" | head -c 80)
        fi

        while IFS= read -r score_match; do
            score_num=$(echo "$score_match" | sed 's|/5.*||')
            report_scores+=("$score_num")
            report_chapters+=("${TICKER}_${ch_ref}")
            report_contexts+=("$(echo "$line" | head -c 120)")
        done <<< "$scores_in_line"
    fi
done < "$REPORT_PATH"

unique_count=${#report_scores[@]}
echo "  发现 $unique_count 个评分标记"

if [[ $unique_count -eq 0 ]]; then
    echo "  (报告中未发现 X.X/5 格式的评分, 需AI手动评估)"
    echo ""
    echo "--- [3/3] 建议 ---"
    echo "  请AI评估以下板块是否超越现有冠军:"
    for ((i=0; i<${#cat_domains[@]}; i++)); do
        echo "    ${cat_domains[$i]}: 现有冠军 ${cat_champions[$i]} (${cat_scores[$i]})"
    done
    exit 0
fi

# 只显示高分 (>=4.0)
echo ""
echo "  高分章节 (>=4.0/5):"
high_score_count=0
for ((i=0; i<unique_count; i++)); do
    is_high=$(echo "${report_scores[$i]} >= 4.0" | bc 2>/dev/null || echo "0")
    if [[ "$is_high" == "1" ]]; then
        printf "    %-7s  %s\n" "${report_scores[$i]}/5" "${report_chapters[$i]}"
        high_score_count=$((high_score_count + 1))
    fi
done

if [[ $high_score_count -eq 0 ]]; then
    echo "    (无>=4.0评分)"
fi

# ============================================================
# 3. 对比分析: 报告 vs Catalog
# ============================================================
echo ""
echo "--- [3/3] 升级分析 ---"

upgrade_candidates=0
for ((i=0; i<unique_count; i++)); do
    r_score="${report_scores[$i]}"

    for ((j=0; j<${#cat_scores[@]}; j++)); do
        c_score="${cat_scores[$j]}"
        threshold=$(echo "$c_score + 0.1" | bc 2>/dev/null || echo "99")
        exceeds=$(echo "$r_score >= $threshold" | bc 2>/dev/null || echo "0")

        if [[ "$exceeds" == "1" ]]; then
            echo "  UPGRADE: ${report_chapters[$i]} ($r_score) > ${cat_domains[$j]} 冠军 ${cat_champions[$j]} ($c_score)"
            echo "    Context: ${report_contexts[$i]:0:100}"
            echo ""
            upgrade_candidates=$((upgrade_candidates + 1))
        fi
    done
done

if [[ $upgrade_candidates -eq 0 ]]; then
    echo "  无冠军超越 — 所有高分章节均未超过现有冠军+0.1"
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo "  升级候选: $upgrade_candidates | 高分章节: $high_score_count"
echo "  下一步: AI审核上述候选, 确认后手动更新 $CATALOG"
echo "═══════════════════════════════════════════════════"
