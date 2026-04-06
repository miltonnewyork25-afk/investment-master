#!/bin/bash
# seamless_translator.sh — 无痕化翻译器 v1.0
# 把内部框架术语翻译为读者友好语言
#
# 用法: bash scripts/seamless_translator.sh <input.md> [output.md]
# 默认输出: input_seamless.md (原文件保留不动)
#
# 翻译策略: 保守机械替换。只处理明确的模式匹配，不触碰分析内容。

set -uo pipefail

INPUT="${1:?用法: bash seamless_translator.sh <input.md> [output.md]}"
OUTPUT="${2:-${INPUT%.md}_seamless.md}"

if [ ! -f "$INPUT" ]; then
    echo "错误: 文件不存在: $INPUT" >&2
    exit 1
fi

# 字符数统计（前）
CHARS_BEFORE=$(wc -m < "$INPUT" | tr -d ' ')

# 使用perl做多模式替换（比sed更强大的正则，支持非贪婪+unicode）
perl -CSD -Mutf8 -pe '
    # 核心原则: 不使用\b (在中英文边界不工作)
    # 用 (?<![A-Za-z0-9]) 和 (?![A-Za-z0-9]) 替代 — 这些只看ASCII字母数字
    # 中文字符既不是ASCII字母也不是数字，所以中英交界处会正确匹配

    # ===== 第1组: DM锚点 — 直接删除 =====
    s/\[DM-[A-Z]+-[0-9]+\]//g;
    s/\(DM-[A-Z]+-[0-9]+\)//g;
    s/(?<![A-Za-z0-9])DM-[A-Z]+-[0-9]+(?![A-Za-z0-9])//g;
    # Section标题中的 (DM-XXX-xxx) 占位符
    s/\s*\(DM-[A-Z]+-x+\)//g;
    s/(?<![A-Za-z0-9])DM-[A-Z]+-x+(?![A-Za-z])//g;

    # ===== 第2组: 编号标签 — 翻译 =====
    s/(?<![A-Za-z0-9])CQ-?([0-9]+)(?![A-Za-z0-9])/核心问题$1/g;
    s/(?<![A-Za-z0-9])KS-?([0-9]+)(?![A-Za-z0-9])/失效信号$1/g;
    s/(?<![A-Za-z0-9])RT-?([0-9]+)(?![A-Za-z0-9])/反方质疑$1/g;
    s/(?<![A-Za-z0-9])TS-?([0-9]+)(?![A-Za-z0-9])/跟踪信号$1/g;
    s/(?<![A-Za-z0-9])EC-?([0-9]+)(?![A-Za-z0-9])/证据$1/g;

    # ===== 第3组: 独立术语 — 翻译 =====
    s/Kill Switch/失效信号/g;
    s/(?<![A-Za-z0-9])CQ(?![A-Za-z0-9])/核心问题/g;

    # ===== 第4组: Phase标题行 — 删除整行 =====
    next if /^#+\s*Phase\s+[0-9]+(\.[0-9]+)?\s*$/i;

    # ===== 第5组: Phase改写（先处理小数Phase再处理整数） =====
    s/Phase\s*0\.5/早期侦察/g;
    s/Phase\s*0\.75/主题结晶/g;
    s/Phase\s*3\.5/中期审查/g;
    s/Phase\s*4\.5/视角结晶/g;
    s/Phase\s*0(?![0-9\.])/早期研究/g;
    s/Phase\s*1(?![0-9\.])/业务分析/g;
    s/Phase\s*2(?![0-9\.])/估值分析/g;
    s/Phase\s*3(?![0-9\.])/深度研究/g;
    s/Phase\s*4(?![0-9\.])/对抗审查/g;
    s/Phase\s*5(?![0-9\.])/最终组装/g;
    # P0/P1/P2... 独立出现
    s/(?<![A-Za-z])P0(?![0-9A-Za-z\.])/早期研究/g;
    s/(?<![A-Za-z])P1(?![0-9A-Za-z])/业务分析/g;
    s/(?<![A-Za-z])P2(?![0-9A-Za-z])/估值分析/g;
    s/(?<![A-Za-z])P3(?![0-9A-Za-z])/深度研究/g;
    s/(?<![A-Za-z])P4(?![0-9A-Za-z])/对抗审查/g;
    s/(?<![A-Za-z])P5(?![0-9A-Za-z])/最终组装/g;

    # ===== 第6组: Agent编号 — 删除 =====
    s/\(Agent [A-C]\)//g;
    s/(?<![A-Za-z])Agent [A-C](?![A-Za-z])//g;

    # ===== 第7组: 框架版本/内部文件名 — 删除 =====
    s/v2[0-9]\.[0-9]+//g;
    s/staging\///g;
    s/checkpoint\.yaml//g;
    s/sprint_contract//g;
    s/Lens Seed//g;
    s/orchestrator//g;
    s/harness/框架/g;

    # ===== 第8组: 清理空括号和多余空格 =====
    s/\[\s*\]//g;
    s/\(\s*\)//g;
    s/【\s*】//g;
    s/（\s*）//g;
    # 连续多个横向空格压缩为一个（不碰换行）
    s/[ \t][ \t]+/ /g;
    # 行尾空格（只处理横向空白，保留换行）
    s/[ \t]+$//;
' "$INPUT" > "$OUTPUT"

# 字符数统计（后）
CHARS_AFTER=$(wc -m < "$OUTPUT" | tr -d ' ')
DELTA=$((CHARS_BEFORE - CHARS_AFTER))
PCT=$(awk "BEGIN {printf \"%.1f\", ($DELTA / $CHARS_BEFORE) * 100}")

echo "无痕化翻译完成"
echo "输入: $INPUT ($CHARS_BEFORE 字符)"
echo "输出: $OUTPUT ($CHARS_AFTER 字符)"
echo "删减: $DELTA 字符 ($PCT%)"
echo ""

# 验证残留内部术语
echo "=== 残留术语检查 ==="
REMAINING=0
for pattern in "DM-[A-Z]" "CQ-[0-9]" "KS-[0-9]" "RT-[0-9]" "Phase [0-9]" "\bCQ\b"; do
    COUNT=$(grep -cE "$pattern" "$OUTPUT" || true)
    if [ "$COUNT" -gt 0 ]; then
        echo "⚠ 残留 $pattern : $COUNT 处"
        REMAINING=$((REMAINING + COUNT))
    fi
done

if [ "$REMAINING" -eq 0 ]; then
    echo "✓ 未发现常见内部术语残留"
else
    echo ""
    echo "总残留: $REMAINING 处 — 可能需要人工处理或扩展脚本规则"
fi
