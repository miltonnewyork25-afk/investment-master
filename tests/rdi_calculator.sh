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
NC='\033[0m'

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

hard=$({ grep -c '\[硬数据' "$file" || true; })
infer=$({ grep -c '\[合理推断' "$file" || true; })
subj=$({ grep -c '\[主观判断' "$file" || true; })
total_ann=$((hard + infer + subj))

if [ "$total_ann" -gt 0 ]; then
    density=$(echo "scale=1; $total_ann * 10000 / $chars" | bc)
    hard_ratio=$(echo "scale=0; $hard * 100 / $total_ann" | bc)
else
    density=0
    hard_ratio=0
fi

sources=$({ grep -oE '\[硬数据:[^]]+\]' "$file" | sort -u | wc -l | tr -d ' ' || echo 0; })

# D1子项计算
d1_density=$(echo "scale=1; x=$density/18*8; if(x>8) 8 else x" | bc)
d1_hard=$(echo "scale=1; x=$hard_ratio/45*4; if(x>4) 4 else x" | bc)
d1_source=$(echo "scale=1; x=$sources/20*4; if(x>4) 4 else x" | bc)
d1_fresh=3  # 默认3分(≤30天), 无法自动判断精确日期

d1_total=$(echo "scale=1; $d1_density + $d1_hard + $d1_source + $d1_fresh" | bc)

echo "  标注总数: $total_ann (硬数据:$hard 推断:$infer 主观:$subj)"
echo "  标注密度: ${density}/万字 → ${d1_density}/8"
echo "  硬数据占比: ${hard_ratio}% → ${d1_hard}/4"
echo "  独立来源: ${sources}个 → ${d1_source}/4"
echo "  时效性: (需人工确认) → ${d1_fresh}/4"
echo -e "  ${GREEN}D1合计: ${d1_total}/20${NC}"

# ========== D2: 分析深度 (25分, 部分自动) ==========
echo -e "\n${BLUE}D2: 分析深度 (满分25)${NC}"

so_what=$({ grep -ci 'so what\|这意味着\|核心启示\|关键结论\|因此.*意味' "$file" || echo 0; })
framework_markers=$({ grep -ci '评估框架\|分析模型\|双轴\|矩阵\|三重\|四象限\|漏斗\|雷达\|评分体系' "$file" || echo 0; })

echo "  框架标记: ~${framework_markers}处 (需人工确认具体框架数)"
echo "  So What标记: ${so_what}处"
echo -e "  ${YELLOW}D2需人工评分: 框架数/原创性/SoWhat质量/机制深度${NC}"
echo "  人工评分建议区间: [15-25]"

# ========== D3: 对抗严谨度 (25分, 半自动) ==========
echo -e "\n${BLUE}D3: 对抗严谨度 (满分25)${NC}"

cq_count=$({ grep -cE '^#{1,4}.*CQ[0-9#-]|^#{1,4}.*核心问题' "$file" || echo 0; })
ks_count=$({ grep -cE 'KS[-_]?[0-9]|Kill Switch[-_]?[0-9]' "$file" || echo 0; })
vp_count=$({ grep -cE 'VP[-_]?[0-9]|可验证预测[-_]?[0-9]' "$file" || echo 0; })
bear_sections=$({ grep -ci '看空\|bear case\|钢人论证\|steel.?man\|devil.?s advocate' "$file" || echo 0; })
three_scenario=$({ grep -ci 'base.*bull.*bear\|bull.*base.*bear\|Base.*Bear\|三情景' "$file" || echo 0; })

# CQ闭环检查
cq_elements=$({ grep -ci '置信度路径\|验证事件\|如果我们错了\|Kill Switch关联' "$file" || echo 0; })

echo "  CQ标记: ~${cq_count}个 (闭环要素: ~${cq_elements}处)"
echo "  KS标记: ~${ks_count}个"
echo "  VP标记: ~${vp_count}个 (三情景标记: ~${three_scenario}处)"
echo "  看空/钢人标记: ${bear_sections}处"

# D3粗估
d3_cq=$(echo "scale=1; x=$cq_count/6*7; if(x>7) 7 else x" | bc)
d3_ks=$(echo "scale=1; x=$ks_count/12*6; if(x>6) 6 else x" | bc)
d3_vp=$(echo "scale=1; x=$vp_count/14*6; if(x>6) 6 else x" | bc)
if [ "$bear_sections" -ge 10 ]; then d3_bear=6
elif [ "$bear_sections" -ge 5 ]; then d3_bear=4
elif [ "$bear_sections" -ge 2 ]; then d3_bear=2
else d3_bear=0; fi

d3_auto=$(echo "scale=1; $d3_cq + $d3_ks + $d3_vp + $d3_bear" | bc)
echo -e "  ${YELLOW}D3粗估: ${d3_auto}/25 (需人工确认CQ闭环质量/KS字段完整性)${NC}"

# ========== D4: 可操作性 (15分, 半自动) ==========
echo -e "\n${BLUE}D4: 可操作性 (满分15)${NC}"

scoring_dims=$({ grep -cE '维度.*权重|评分.*维度|加权评分' "$file" || echo 0; })
position_table=$({ grep -ci '仓位建议\|仓位.*档\|建议仓位\|position sizing' "$file" || echo 0; })
action_plan=$({ grep -ci '行动计划\|行动清单\|90天\|action plan' "$file" || echo 0; })
calendar=$({ grep -ci '投资日历\|催化剂日历\|investment calendar' "$file" || echo 0; })
thermometer=$({ grep -ci '温度计\|thermometer\|F×D' "$file" || echo 0; })

echo "  评分维度: ${scoring_dims}处"
echo "  仓位建议: ${position_table}处"
echo "  行动计划: ${action_plan}处"
echo "  投资日历: ${calendar}处"
echo "  温度计: ${thermometer}处"
echo -e "  ${YELLOW}D4需人工评分: 行动方案具体程度/温度计质量${NC}"
echo "  人工评分建议区间: [8-15]"

# ========== D5: 洞察原创性 (10分, 纯人工) ==========
echo -e "\n${BLUE}D5: 洞察原创性 (满分10)${NC}"
insight_markers=$({ grep -ci '非共识\|市场.*忽略\|未被.*定价\|被低估\|隐性.*机制\|结构性.*变化' "$file" || echo 0; })
echo "  非共识/洞察标记: ~${insight_markers}处"
echo -e "  ${YELLOW}D5完全需人工评分: 检验'删掉公司名是否仍有辨识度'${NC}"
echo "  人工评分建议区间: [5-10]"

# ========== D6: 表达规范 (5分) ==========
echo -e "\n${BLUE}D6: 表达规范 (满分5)${NC}"

mermaid=$({ grep -c '```mermaid' "$file" || echo 0; })
mermaid_types=$({ grep -A1 '```mermaid' "$file" | grep -oE 'flowchart|graph|pie|timeline|gantt|quadrantChart|sequenceDiagram|classDiagram|stateDiagram|xychart|mindmap' | sort -u | wc -l | tr -d ' ' || echo 0; })
table_rows=$({ grep -c '^|' "$file" || echo 0; })
h2=$({ grep -c '^## ' "$file" || echo 0; })
h3=$({ grep -c '^### ' "$file" || echo 0; })
h4=$({ grep -c '^#### ' "$file" || echo 0; })
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

echo "┌─────────────────────────────────────────┐"
echo "│ D1 数据实证力    ${d1_total}/20  (自动)         │"
echo "│ D2 分析深度      ??/25  (需人工)         │"
echo "│ D3 对抗严谨度    ~${d3_auto}/25  (半自动)      │"
echo "│ D4 可操作性      ??/15  (需人工)         │"
echo "│ D5 洞察原创性    ??/10  (需人工)         │"
echo "│ D6 表达规范      ${d6_total}/5   (自动)          │"
echo "├─────────────────────────────────────────┤"
echo "│ 自动可计算部分:  ~${auto_total}/50             │"
echo "│ 人工评分部分:    ??/50 (D2+D4+D5)       │"
echo "└─────────────────────────────────────────┘"

# 验收判断
if [ "$tier" = "3" ]; then
    threshold=95
    echo -e "\nTier 3 Complete 验收标准: RDI ≥ ${threshold}"
elif [ "$tier" = "2" ]; then
    threshold=80
    echo -e "\nTier 2 标准分析 验收标准: RDI ≥ ${threshold}"
fi

# D1/D6自动检查警告
echo ""
d1_int=$(echo "$d1_total" | cut -d. -f1)
if [ "$d1_int" -lt 16 ]; then
    echo -e "${RED}警告: D1=${d1_total} < 16, 数据标注不足${NC}"
fi
if [ "$d6_total" -lt 4 ]; then
    echo -e "${RED}警告: D6=${d6_total} < 4, 表达规范不达标${NC}"
fi
if [ "$mermaid" -lt 8 ]; then
    echo -e "${YELLOW}提示: Mermaid图${mermaid}个 < 8, 建议补充${NC}"
fi
if [ "$total_ann" -lt 10 ]; then
    echo -e "${RED}警告: 标注总数${total_ann}个过少, 建议≥50个${NC}"
fi

echo ""
echo "完成时间: $(date '+%Y-%m-%d %H:%M:%S')"
