#!/bin/bash

# 知识库检索脚本 v1.0
# 用法: bash scripts/find_relevant_knowledge.sh <TICKER> [INDUSTRY]
# 给定TICKER+行业 → 输出top-3相似公司+教训+推荐参考
# 零LLM tokens, 纯bash匹配算法
# 兼容macOS bash 3.x (无declare -A)

set -e

TICKER="$1"
INDUSTRY="$2"
INDEX_FILE="knowledge/knowledge_index.yaml"
ARCHIVES_DIR="knowledge/planning_archives"
SCORE_FILE=$(mktemp)
trap "rm -f $SCORE_FILE" EXIT

if [[ -z "$TICKER" ]]; then
    echo "用法: $0 <TICKER> [INDUSTRY]"
    echo "  TICKER: 目标公司代码 (如 NVDA, SNAP)"
    echo "  INDUSTRY: 行业分类 (如 半导体, 生态科技, 消费品, 金融)"
    exit 1
fi

if [[ ! -f "$INDEX_FILE" ]]; then
    echo "ERROR: 知识索引文件不存在: $INDEX_FILE"
    echo "请先创建知识索引"
    exit 1
fi

# ============================================================
# 提取索引中所有已有ticker
# ============================================================
KNOWN_TICKERS=$({ grep -E "^  [A-Z]+:" "$INDEX_FILE" | sed 's/://g' | awk '{print $1}'; } || true)

if [[ -z "$KNOWN_TICKERS" ]]; then
    echo "ERROR: 知识索引为空"
    exit 1
fi

# 如果TICKER已在索引中, 标记
IS_KNOWN="false"
echo "$KNOWN_TICKERS" | grep -qw "$TICKER" && IS_KNOWN="true"

# ============================================================
# 辅助函数: 从YAML中提取单个ticker的字段值
# ============================================================
extract_field() {
    local ticker="$1"
    local field="$2"
    local in_section="false"
    while IFS= read -r line; do
        if echo "$line" | grep -qE "^  ${ticker}:"; then
            in_section="true"
            continue
        fi
        if [[ "$in_section" == "true" ]]; then
            if echo "$line" | grep -qE "^  [A-Z]+:"; then
                break
            fi
            if echo "$line" | grep -qE "^similarity_graph:"; then
                break
            fi
            if echo "$line" | grep -qE "^    ${field}:"; then
                echo "$line" | sed "s/^    ${field}: *//" | sed 's/^"//' | sed 's/"$//'
                return
            fi
        fi
    done < "$INDEX_FILE"
}

extract_list_field() {
    local ticker="$1"
    local field="$2"
    local raw
    raw=$(extract_field "$ticker" "$field")
    echo "$raw" | sed 's/^\[//;s/\]$//' | sed 's/, */\n/g'
}

extract_key_lessons() {
    local ticker="$1"
    local in_section="false"
    local in_lessons="false"
    while IFS= read -r line; do
        if echo "$line" | grep -qE "^  ${ticker}:"; then
            in_section="true"
            continue
        fi
        if [[ "$in_section" == "true" ]]; then
            if echo "$line" | grep -qE "^  [A-Z]+:"; then
                break
            fi
            if echo "$line" | grep -qE "^similarity_graph:"; then
                break
            fi
            if echo "$line" | grep -qE "^    key_lessons:"; then
                in_lessons="true"
                continue
            fi
            if [[ "$in_lessons" == "true" ]]; then
                if echo "$line" | grep -qE "^      - "; then
                    echo "$line" | sed 's/^      - "//' | sed 's/"$//'
                else
                    break
                fi
            fi
        fi
    done < "$INDEX_FILE"
}

# ============================================================
# 评分算法: 对每个已知ticker打分, 结果写入临时文件
# 格式: score|ticker|details
# ============================================================
for candidate in $KNOWN_TICKERS; do
    # 跳过自身
    if [[ "$candidate" == "$TICKER" ]]; then
        continue
    fi

    score=0
    details=""

    # --- 规则1: similar_to显式边 (5分) ---
    similar_list=$(extract_list_field "$candidate" "similar_to")
    has_similar="false"
    if echo "$similar_list" | grep -qw "$TICKER"; then
        score=$((score + 5))
        details="${details}similar_to(+5) "
        has_similar="true"
    fi

    # 反向检查: TICKER的similar_to是否包含candidate
    if [[ "$IS_KNOWN" == "true" && "$has_similar" == "false" ]]; then
        my_similar=$(extract_list_field "$TICKER" "similar_to")
        if echo "$my_similar" | grep -qw "$candidate"; then
            score=$((score + 5))
            details="${details}reverse_similar(+5) "
        fi
    fi

    # --- 规则2: 同行业 (3分) ---
    if [[ -n "$INDUSTRY" ]]; then
        cand_industry=$(extract_field "$candidate" "industry")
        if [[ "$cand_industry" == "$INDUSTRY" ]]; then
            score=$((score + 3))
            details="${details}same_industry(+3) "
        fi
    fi

    # --- 规则3: business_model标签重叠 (2分/个) ---
    if [[ "$IS_KNOWN" == "true" ]]; then
        my_bm=$(extract_list_field "$TICKER" "business_model")
        cand_bm=$(extract_list_field "$candidate" "business_model")
        overlap_count=0
        for bm in $my_bm; do
            if echo "$cand_bm" | grep -qw "$bm"; then
                overlap_count=$((overlap_count + 1))
            fi
        done
        if [[ $overlap_count -gt 0 ]]; then
            bm_score=$((overlap_count * 2))
            score=$((score + bm_score))
            details="${details}bm_overlap(+${bm_score},${overlap_count}tags) "
        fi
    fi

    # --- 规则4: 可能性宽度接近 (|差|≤2得1分) ---
    if [[ "$IS_KNOWN" == "true" ]]; then
        my_pw=$(extract_field "$TICKER" "poss_width")
        cand_pw=$(extract_field "$candidate" "poss_width")
        if [[ -n "$my_pw" && -n "$cand_pw" ]]; then
            diff=$((my_pw - cand_pw))
            if [[ $diff -lt 0 ]]; then diff=$((-diff)); fi
            if [[ $diff -le 2 ]]; then
                score=$((score + 1))
                details="${details}pw_close(+1,d=${diff}) "
            fi
        fi
    fi

    # --- 规则5: OVM/ERM标志匹配 (各1分) ---
    if [[ "$IS_KNOWN" == "true" ]]; then
        my_ovm=$(extract_field "$TICKER" "ovm")
        cand_ovm=$(extract_field "$candidate" "ovm")
        if [[ "$my_ovm" == "true" && "$cand_ovm" == "true" ]]; then
            score=$((score + 1))
            details="${details}ovm_match(+1) "
        fi

        my_erm=$(extract_field "$TICKER" "erm")
        cand_erm=$(extract_field "$candidate" "erm")
        if [[ "$my_erm" == "true" && "$cand_erm" == "true" ]]; then
            score=$((score + 1))
            details="${details}erm_match(+1) "
        fi
    fi

    echo "${score}|${candidate}|${details}" >> "$SCORE_FILE"
done

# ============================================================
# 排序并输出Top-3
# ============================================================
TOP3=$(sort -t'|' -k1 -rn "$SCORE_FILE" | head -3)

if [[ -z "$TOP3" ]]; then
    echo "WARNING: 无匹配结果 (索引中无其他公司)"
    exit 0
fi

# ============================================================
# 格式化输出
# ============================================================
echo ""
echo "═══════════════════════════════════════════════════"
echo "  Knowledge Retrieval: $TICKER"
if [[ -n "$INDUSTRY" ]]; then
    echo "  行业: $INDUSTRY"
fi
if [[ "$IS_KNOWN" == "true" ]]; then
    echo "  状态: 已有报告 (索引中)"
else
    echo "  状态: 新公司 (不在索引中)"
fi
echo "═══════════════════════════════════════════════════"
echo ""
echo "Top-3 相似公司:"
echo ""

rank=0
best_ticker=""
echo "$TOP3" | while IFS='|' read -r sc tk detail; do
    if [[ -z "$tk" ]]; then continue; fi
    rank=$((rank + 1))

    if [[ $rank -eq 1 ]]; then
        # 写best_ticker to a temp marker for later use
        echo "$tk" > "${SCORE_FILE}.best"
    fi

    # 提取关键信息
    cand_industry=$(extract_field "$tk" "industry")
    cand_pw=$(extract_field "$tk" "poss_width")
    cand_methodology=$(extract_field "$tk" "methodology")
    cand_chars=$(extract_field "$tk" "chars")
    cand_ovm=$(extract_field "$tk" "ovm")
    cand_erm=$(extract_field "$tk" "erm")

    # 格式化字符数
    if [[ -n "$cand_chars" ]]; then
        chars_k=$(echo "scale=0; $cand_chars / 1000" | bc)
        chars_display="${chars_k}K"
    else
        chars_display="?"
    fi

    # 特性标签
    tags=""
    if [[ "$cand_ovm" == "true" ]]; then tags="${tags}OVM "; fi
    if [[ "$cand_erm" == "true" ]]; then tags="${tags}ERM "; fi

    echo "  ${rank}. ${tk} (score:${sc}) — ${cand_industry}, PW=${cand_pw}, ${cand_methodology}, ${chars_display} ${tags}"

    # 匹配详情
    if [[ -n "$detail" ]]; then
        echo "     匹配: ${detail}"
    fi

    # 教训
    lessons=$(extract_key_lessons "$tk")
    if [[ -n "$lessons" ]]; then
        echo "     教训:"
        echo "$lessons" | head -3 | while IFS= read -r lesson; do
            echo "       - ${lesson}"
        done
    fi

    # Archive路径
    archive_file="${ARCHIVES_DIR}/${tk}.md"
    if [[ -f "$archive_file" ]]; then
        echo "     Archive: ${archive_file}"
    else
        echo "     Archive: (未创建)"
    fi
    echo ""
done

# 推荐
echo "─────────────────────────────────────────────────"
if [[ -f "${SCORE_FILE}.best" ]]; then
    best_ticker=$(cat "${SCORE_FILE}.best")
    rm -f "${SCORE_FILE}.best"
    echo "建议Scout精读: ${best_ticker} (最相似)"
    echo "建议参考报告: bash scripts/find_best_reference.sh ${best_ticker}"
fi
echo "─────────────────────────────────────────────────"
