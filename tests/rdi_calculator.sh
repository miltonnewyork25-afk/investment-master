#!/bin/bash
# RDI v2.0 自动评分器
# 用法: bash tests/rdi_calculator.sh <report_file> [tier]
# tier: 2(Tier 2标准) 或 3(Tier 3 Complete), 默认3

set -uo pipefail

file="${1:-}"
tier="${2:-3}"

if [ ! -f "$file" ]; then
    echo "用法: bash tests/rdi_calculator.sh <report_file> [tier: 2|3]"
    exit 1
fi

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 安全计数函数: grep -c 无匹配时输出0但exit 1, 用此函数统一处理
# 关键: 先捕获输出再 || true, 避免 "0\n0" 双输出问题
safe_count()  { local r; r=$(grep -c "$1" "$2" 2>/dev/null) || true; echo "${r:-0}"; }
safe_count_i()  { local r; r=$(grep -ci "$1" "$2" 2>/dev/null) || true; echo "${r:-0}"; }
safe_count_E()  { local r; r=$(grep -cE "$1" "$2" 2>/dev/null) || true; echo "${r:-0}"; }
safe_count_iE() { local r; r=$(grep -ciE "$1" "$2" 2>/dev/null) || true; echo "${r:-0}"; }

echo -e "${BLUE}=== RDI v2.0 自动评分器 ===${NC}"
echo "文件: $file"
echo "层级: Tier $tier"
echo ""

chars=$(wc -m < "$file")
chars_k=$(echo "scale=1; $chars / 1000" | bc)
echo "总字符: ${chars_k}K"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ========== D1: 数据实证力 (20分) ==========
echo -e "\n${BLUE}D1: 数据实证力 (满分20)${NC}"

hard=$(safe_count '\[硬数据' "$file")
infer=$(safe_count '\[合理推断' "$file")
subj=$(safe_count '\[主观判断' "$file")
total_ann=$((hard + infer + subj))

if [ "$total_ann" -gt 0 ]; then
    density=$(echo "scale=1; $total_ann * 10000 / $chars" | bc)
    hard_ratio=$(echo "scale=0; $hard * 100 / $total_ann" | bc)
else
    density=0
    hard_ratio=0
fi

# [改进1] D1来源去重: 提取来源名称部分(冒号后、逗号/日期前)
# 从 [硬数据: Yahoo Finance, 2026-02] 提取 "Yahoo Finance"
# 从 [硬数据: FMP API] 提取 "FMP API"
# 从 [硬数据: 10-K FY2025] 提取 "10-K FY2025"
sources=$({
    grep -oE '\[硬数据:[^]]+\]' "$file" |
    sed -E 's/^\[硬数据:[[:space:]]*//' |
    sed -E 's/\]$//' |
    sed -E 's/,[[:space:]]*[0-9]{4}[-/][0-9]{1,2}([-/][0-9]{1,2})?$//' |
    sed -E 's/,[[:space:]]*Q[1-4][[:space:]]*[0-9]{4}$//' |
    sed -E 's/,[[:space:]]*FY[0-9]{4}$//' |
    sed -E 's/[[:space:]]*$//' |
    sort -u | wc -l | tr -d ' '
} || echo 0)

# [改进2] D1时效性半自动化: 检测文件中的日期模式和MCP工具标记
today_str=$(date '+%Y-%m-%d')
today_epoch=$(date -j -f '%Y-%m-%d' "$today_str" '+%s' 2>/dev/null || date -d "$today_str" '+%s' 2>/dev/null || echo 0)

# 提取文件中最新的YYYY-MM或YYYY-MM-DD日期
latest_date_in_file=""
freshness_days=999

# 搜索 YYYY-MM-DD 格式 (仅搜索合理范围: 2024-2030)
dates_ymd=$({ grep -oE '20[2][4-9]-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])' "$file" | sort -r | head -1 || true; })
# 搜索 YYYY-MM 格式
dates_ym=$({ grep -oE '20[2][4-9]-(0[1-9]|1[0-2])' "$file" | sort -r | head -1 || true; })

if [ -n "$dates_ymd" ]; then
    latest_date_in_file="$dates_ymd"
    file_epoch=$(date -j -f '%Y-%m-%d' "$dates_ymd" '+%s' 2>/dev/null || date -d "$dates_ymd" '+%s' 2>/dev/null || echo 0)
    if [ "$file_epoch" -gt 0 ] && [ "$today_epoch" -gt 0 ]; then
        freshness_days=$(( (today_epoch - file_epoch) / 86400 ))
        # 负数意味着日期在未来(可能是预测),视为当前
        if [ "$freshness_days" -lt 0 ]; then freshness_days=0; fi
    fi
elif [ -n "$dates_ym" ]; then
    latest_date_in_file="${dates_ym}-15"  # 月中近似
    file_epoch=$(date -j -f '%Y-%m-%d' "${dates_ym}-15" '+%s' 2>/dev/null || date -d "${dates_ym}-15" '+%s' 2>/dev/null || echo 0)
    if [ "$file_epoch" -gt 0 ] && [ "$today_epoch" -gt 0 ]; then
        freshness_days=$(( (today_epoch - file_epoch) / 86400 ))
        if [ "$freshness_days" -lt 0 ]; then freshness_days=0; fi
    fi
fi

# 检测MCP工具标记
mcp_markers=$(safe_count_iE 'baggers_summary|baggers_strategy|fmp_data|analyze_stock|compare_stocks|screen_stocks|get_market_overview|polymarket_events|MCP.*工具|MCP.*tool|实时.*获取|real.?time' "$file")

# 时效性评分逻辑
if [ "$freshness_days" -le 7 ] && [ "$mcp_markers" -gt 0 ]; then
    d1_fresh=4
    fresh_label="≤7天+MCP"
elif [ "$freshness_days" -le 7 ]; then
    d1_fresh=3
    fresh_label="≤7天(无MCP标记)"
elif [ "$freshness_days" -le 30 ]; then
    d1_fresh=3
    fresh_label="≤30天"
elif [ "$freshness_days" -le 90 ]; then
    d1_fresh=2
    fresh_label="≤90天"
elif [ "$freshness_days" -lt 999 ]; then
    d1_fresh=1
    fresh_label=">90天"
else
    d1_fresh=2
    fresh_label="无法检测日期"
fi

# D1子项计算
d1_density=$(echo "scale=1; x=$density/18*8; if(x>8) 8 else x" | bc)
d1_hard=$(echo "scale=1; x=$hard_ratio/45*4; if(x>4) 4 else x" | bc)
d1_source=$(echo "scale=1; x=$sources/20*4; if(x>4) 4 else x" | bc)

d1_total=$(echo "scale=1; $d1_density + $d1_hard + $d1_source + $d1_fresh" | bc)

echo "  标注总数: $total_ann (硬数据:$hard 推断:$infer 主观:$subj)"
echo "  标注密度: ${density}/万字 → ${d1_density}/8"
echo "  硬数据占比: ${hard_ratio}% → ${d1_hard}/4"
echo "  独立来源(去重): ${sources}个 → ${d1_source}/4"
echo "  时效性: ${fresh_label} (最新日期:${latest_date_in_file:-未检测到}, 距今:${freshness_days}天, MCP标记:${mcp_markers}处) → ${d1_fresh}/4"
echo -e "  ${GREEN}D1合计: ${d1_total}/20${NC}"

# ========== D2: 分析深度 (25分, 部分自动) ==========
echo -e "\n${BLUE}D2: 分析深度 (满分25)${NC}"

so_what=$(safe_count_i 'so what\|这意味着\|核心启示\|关键结论\|因此.*意味' "$file")

# [改进4] D2框架检测: 更精确的框架标记检测
framework_markers=$(safe_count_iE '评估框架|分析模型|分析框架|双轴|矩阵|三重|四象限|漏斗|雷达|评分体系|框架|模型|方法论|五维度|三层|退化路径|转化漏斗|脱钩模型|冲击矩阵' "$file")

# 检测命名框架(更精确): 匹配 "XXX框架/模型/矩阵/方法论" 模式
# 限定: 前面是字母/数字+中文内容+后缀关键词, 排除纯噪音
named_frameworks=$({
    grep -oE '[A-Za-z0-9]+.{0,15}(框架|模型|矩阵|漏斗|雷达|方法论)' "$file" |
    sed 's/^[[:space:]]*//' |
    sort -u | wc -l | tr -d ' '
} || echo 0)

# 检测因果链标记
causal_chains=$(safe_count_iE '因为.*所以|因此|导致|→.*→|这是因为|原因在于|推动.*增长|驱动.*变化' "$file")

echo "  框架关键词: ~${framework_markers}处"
echo "  命名框架(去重): ~${named_frameworks}个"
echo "  So What标记: ${so_what}处"
echo "  因果链标记: ${causal_chains}处"
echo -e "  ${YELLOW}D2需人工评分: 框架数(含原创性)/SoWhat质量/机制深度${NC}"
echo "  人工评分建议区间: [15-25]"

# ========== D3: 对抗严谨度 (25分, 半自动) ==========
echo -e "\n${BLUE}D3: 对抗严谨度 (满分25)${NC}"

cq_count=$(safe_count_E '^#{1,4}.*CQ[0-9#-]|^#{1,4}.*核心问题' "$file")
ks_count=$(safe_count_E 'KS[-_]?[0-9]|Kill Switch[-_]?[0-9]' "$file")
vp_count=$(safe_count_E 'VP[-_]?[0-9]|可验证预测[-_]?[0-9]' "$file")
bear_sections=$(safe_count_i '看空\|bear case\|钢人论证\|steel.?man\|devil.?s advocate' "$file")
three_scenario=$(safe_count_i 'base.*bull.*bear\|bull.*base.*bear\|Base.*Bear\|三情景' "$file")

# CQ闭环检查
cq_elements=$(safe_count_i '置信度路径\|验证事件\|如果我们错了\|Kill Switch关联' "$file")

# [改进3] D3 bear占比计算: 计算看空相关行的字符数占总字符比例
bear_chars=$({
    grep -iE '看空|bear|风险|Kill Switch|对抗|钢人|偏差修正|如果我们错了|devil|steel.?man|熊市|下行|worst.?case|downside' "$file" |
    wc -m | tr -d ' '
} || echo 0)

if [ "$chars" -gt 0 ] && [ "$bear_chars" -gt 0 ]; then
    bear_ratio=$(echo "scale=1; $bear_chars * 100 / $chars" | bc)
else
    bear_ratio="0.0"
fi

echo "  CQ标记: ~${cq_count}个 (闭环要素: ~${cq_elements}处)"
echo "  KS标记: ~${ks_count}个"
echo "  VP标记: ~${vp_count}个 (三情景标记: ~${three_scenario}处)"
echo "  看空/钢人标记: ${bear_sections}处"
echo -e "  看空相关行占比: ${CYAN}${bear_ratio}%${NC} (目标≥25%)"

# D3粗估
d3_cq=$(echo "scale=1; x=$cq_count/6*7; if(x>7) 7 else x" | bc)
d3_ks=$(echo "scale=1; x=$ks_count/12*6; if(x>6) 6 else x" | bc)
d3_vp=$(echo "scale=1; x=$vp_count/14*6; if(x>6) 6 else x" | bc)

# bear评分: 结合标记数量和占比
if [ "$bear_sections" -ge 10 ]; then
    d3_bear=6
elif [ "$bear_sections" -ge 5 ]; then
    # 占比≥25%则给满分
    bear_ratio_int=$(echo "$bear_ratio" | cut -d. -f1)
    if [ "${bear_ratio_int:-0}" -ge 25 ]; then d3_bear=6
    else d3_bear=4; fi
elif [ "$bear_sections" -ge 2 ]; then d3_bear=2
else d3_bear=0; fi

d3_auto=$(echo "scale=1; $d3_cq + $d3_ks + $d3_vp + $d3_bear" | bc)
echo -e "  ${YELLOW}D3粗估: ${d3_auto}/25 (需人工确认CQ闭环质量/KS字段完整性)${NC}"

# ========== D4: 可操作性 (15分, 半自动) ==========
echo -e "\n${BLUE}D4: 可操作性 (满分15)${NC}"

scoring_dims=$(safe_count_E '维度.*权重|评分.*维度|加权评分' "$file")
position_table=$(safe_count_i '仓位建议\|仓位.*档\|建议仓位\|position sizing' "$file")
action_plan=$(safe_count_i '行动计划\|行动清单\|90天\|action plan' "$file")
calendar=$(safe_count_i '投资日历\|催化剂日历\|investment calendar' "$file")
thermometer=$(safe_count_i '温度计\|thermometer' "$file")

# [改进7] D4 F×D检测
# 注意: 分步检测避免多字节字符编码问题
fxd_ascii=$(safe_count_iE 'FxD|Fundamentals.*Discount' "$file")
fxd_unicode=$(safe_count_i '基本面.*折扣\|基本面折扣率' "$file")
fxd_mult=$(safe_count 'F×D' "$file")
fxd_markers=$((fxd_ascii + fxd_unicode + fxd_mult))

echo "  评分维度: ${scoring_dims}处"
echo "  仓位建议: ${position_table}处"
echo "  行动计划: ${action_plan}处"
echo "  投资日历: ${calendar}处"
echo "  温度计: ${thermometer}处"
echo "  F×D标记: ${fxd_markers}处"
echo -e "  ${YELLOW}D4需人工评分: 行动方案具体程度/温度计+F×D质量${NC}"
echo "  人工评分建议区间: [8-15]"

# ========== D5: 洞察原创性 (10分, 纯人工) ==========
echo -e "\n${BLUE}D5: 洞察原创性 (满分10)${NC}"

insight_markers=$(safe_count_i '非共识\|市场.*忽略\|未被.*定价\|被低估\|隐性.*机制\|结构性.*变化' "$file")

# [改进5] D5非共识检测: 增加NCI标记和更多模式
nci_markers=$(safe_count_iE 'NCI[-_]|非共识洞察|市场为何错|共识.*我们|我们.*共识|consensus.*wrong|市场.*误解|市场.*低估|被忽视' "$file")

echo "  非共识/洞察标记: ~${insight_markers}处"
echo "  NCI/非共识洞察标记: ~${nci_markers}处"
echo -e "  ${YELLOW}D5完全需人工评分: 检验'删掉公司名是否仍有辨识度'${NC}"
echo "  人工评分建议区间: [5-10]"

# ========== D6: 表达规范 (5分) ==========
echo -e "\n${BLUE}D6: 表达规范 (满分5)${NC}"

mermaid=$(safe_count '```mermaid' "$file")
mermaid_types=$({ grep -A1 '```mermaid' "$file" | grep -oE 'flowchart|graph|pie|timeline|gantt|quadrantChart|sequenceDiagram|classDiagram|stateDiagram|xychart|mindmap' | sort -u | wc -l | tr -d ' ' || echo 0; })
table_rows=$(safe_count '^|' "$file")
h2=$(safe_count '^## ' "$file")
h3=$(safe_count '^### ' "$file")
h4=$(safe_count '^#### ' "$file")
total_headings=$((h2 + h3 + h4))

# D6子项
if [ "$mermaid" -ge 8 ] && [ "$mermaid_types" -ge 3 ]; then d6_visual=2
elif [ "$mermaid" -ge 5 ]; then d6_visual=1
else d6_visual=0; fi

if [ "$total_headings" -ge 30 ]; then d6_structure=2
elif [ "$total_headings" -ge 15 ]; then d6_structure=1
else d6_structure=0; fi

d6_consistency=1  # 默认1分(需人工确认无矛盾)
d6_total=$((d6_visual + d6_structure + d6_consistency))

echo "  Mermaid: ${mermaid}个 (${mermaid_types}种类型) → ${d6_visual}/2"
echo "  表格行: ${table_rows}行"
echo "  标题: H2=${h2} H3=${h3} H4=${h4} 总=${total_headings} → ${d6_structure}/2"
echo "  一致性: (需人工确认) → ${d6_consistency}/1"
echo -e "  ${GREEN}D6合计: ${d6_total}/5${NC}"

# ========== 汇总 ==========
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}=== RDI v2.0 评分汇总 ===${NC}"
echo ""

auto_total=$(echo "scale=1; $d1_total + $d3_auto + $d6_total" | bc)

# [改进6] 预估总分: 对人工部分给中值估计
# D2: 人工区间[15-25], 中值20
# D4: 人工区间[8-15], 中值11.5→12
# D5: 人工区间[5-10], 中值7.5→8
d2_mid=20
d4_mid=12
d5_mid=8
manual_mid=$((d2_mid + d4_mid + d5_mid))

estimated_total=$(echo "scale=1; $auto_total + $manual_mid" | bc)
estimated_int=$(echo "$estimated_total" | cut -d. -f1)

# 验收标准
if [ "$tier" = "3" ]; then
    threshold=95
elif [ "$tier" = "2" ]; then
    threshold=80
else
    threshold=95
fi

gap_to_threshold=$(echo "scale=1; $threshold - $estimated_total" | bc)
# 检查是否为负(已达标)
gap_sign=$(echo "$gap_to_threshold < 0" | bc)

echo "┌──────────────────────────────────────────────────────┐"
printf "│ D1 数据实证力    %5s/20  (自动)                     │\n" "$d1_total"
printf "│ D2 分析深度       ~%2d/25  (需人工, 中值%d)           │\n" "$d2_mid" "$d2_mid"
printf "│ D3 对抗严谨度    ~%5s/25  (半自动)                   │\n" "$d3_auto"
printf "│    └ bear占比     %5s%%  (目标≥25%%)                 │\n" "$bear_ratio"
printf "│ D4 可操作性       ~%2d/15  (需人工, 中值%d)           │\n" "$d4_mid" "$d4_mid"
printf "│ D5 洞察原创性      ~%1d/10  (需人工, 中值%d)           │\n" "$d5_mid" "$d5_mid"
printf "│ D6 表达规范       %2d/5   (自动)                     │\n" "$d6_total"
echo "├──────────────────────────────────────────────────────┤"
printf "│ 自动可计算部分:   ~%5s/50                            │\n" "$auto_total"
printf "│ 人工部分(中值):   ~%2d/50  (D2+D4+D5)                │\n" "$manual_mid"
echo "├──────────────────────────────────────────────────────┤"
printf "│ 预估总分:         ~%5s/100                           │\n" "$estimated_total"
if [ "$gap_sign" = "1" ]; then
    echo -e "│ ${GREEN}距Tier ${tier}标准(${threshold}分): 已达标(+$(echo "scale=1; $estimated_total - $threshold" | bc))${NC}              │"
else
    echo -e "│ ${RED}距Tier ${tier}标准(${threshold}分): 差 ${gap_to_threshold} 分${NC}                    │"
fi
echo "└──────────────────────────────────────────────────────┘"

echo -e "\nTier $tier 验收标准: RDI >= ${threshold}"

# 等级判定
if [ "${estimated_int:-0}" -ge 95 ]; then
    echo -e "预估等级: ${GREEN}S (机构级旗舰)${NC}"
elif [ "${estimated_int:-0}" -ge 90 ]; then
    echo -e "预估等级: ${GREEN}A+ (接近机构级)${NC}"
elif [ "${estimated_int:-0}" -ge 80 ]; then
    echo -e "预估等级: ${YELLOW}A (深度研究)${NC}"
elif [ "${estimated_int:-0}" -ge 65 ]; then
    echo -e "预估等级: ${YELLOW}B (标准研究)${NC}"
elif [ "${estimated_int:-0}" -ge 50 ]; then
    echo -e "预估等级: ${RED}C (基础分析, 需返工)${NC}"
else
    echo -e "预估等级: ${RED}F (不合格, 重做)${NC}"
fi

# 自动检查警告
echo ""
echo -e "${BLUE}--- 自动检查警告 ---${NC}"
warn_count=0

d1_int=$(echo "$d1_total" | cut -d. -f1)
if [ "${d1_int:-0}" -lt 16 ]; then
    echo -e "${RED}  [!] D1=${d1_total} < 16, 数据标注不足${NC}"
    warn_count=$((warn_count + 1))
fi
if [ "$d6_total" -lt 4 ]; then
    echo -e "${RED}  [!] D6=${d6_total} < 4, 表达规范不达标${NC}"
    warn_count=$((warn_count + 1))
fi
if [ "$mermaid" -lt 8 ]; then
    echo -e "${YELLOW}  [~] Mermaid图${mermaid}个 < 8, 建议补充${NC}"
    warn_count=$((warn_count + 1))
fi
if [ "$total_ann" -lt 10 ]; then
    echo -e "${RED}  [!] 标注总数${total_ann}个过少, 建议≥50个${NC}"
    warn_count=$((warn_count + 1))
fi

bear_ratio_int=$(echo "$bear_ratio" | cut -d. -f1)
if [ "${bear_ratio_int:-0}" -lt 25 ] && [ "$tier" = "3" ]; then
    echo -e "${YELLOW}  [~] bear占比${bear_ratio}% < 25%, Tier 3要求独立看空≥25%${NC}"
    warn_count=$((warn_count + 1))
fi

if [ "$mcp_markers" -eq 0 ]; then
    echo -e "${YELLOW}  [~] 未检测到MCP工具标记, 时效性可能受限${NC}"
    warn_count=$((warn_count + 1))
fi

if [ "$nci_markers" -eq 0 ] && [ "$insight_markers" -lt 3 ]; then
    echo -e "${YELLOW}  [~] 非共识洞察标记不足(NCI:${nci_markers}, 洞察:${insight_markers}), D5可能偏低${NC}"
    warn_count=$((warn_count + 1))
fi

if [ "$fxd_markers" -eq 0 ] && [ "$tier" = "3" ]; then
    echo -e "${YELLOW}  [~] 未检测到F×D标记, D4温度计集成可能不完整${NC}"
    warn_count=$((warn_count + 1))
fi

if [ "$warn_count" -eq 0 ]; then
    echo -e "${GREEN}  无警告${NC}"
fi

echo ""
echo "完成时间: $(date '+%Y-%m-%d %H:%M:%S')"
