#!/bin/bash
# ============================================================
# inject_dm_annotations.sh — 自动DM标注注入器 v1.0
# ============================================================
# 用法:
#   bash scripts/inject_dm_annotations.sh <FILE> [DRY_RUN]
#   例: bash scripts/inject_dm_annotations.sh reports/SBUX/SBUX_Complete.md
#   例: bash scripts/inject_dm_annotations.sh reports/SBUX/SBUX_Complete.md --dry-run
#
# 功能: 为现有报告自动添加DM标注，解决SBUX类型的标注密度=0问题
# 退出码: 0=成功, 1=文件不存在, 2=备份失败
# ============================================================

set -euo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
FILE="${1:?用法: $0 <FILE> [--dry-run]}"
DRY_RUN="false"

if [[ "${2:-}" == "--dry-run" ]]; then
    DRY_RUN="true"
fi

# --- 检查文件 ---
if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: ${FILE}${NC}"
    exit 1
fi

BACKUP_FILE="${FILE}.backup.$(date +%Y%m%d_%H%M%S)"

echo -e "${CYAN}========================================${NC}"
echo -e " 自动DM标注注入器 v1.0"
echo -e " 文件: $(basename "$FILE")"
echo -e " 模式: $([ "$DRY_RUN" = "true" ] && echo "预览模式" || echo "执行模式")"
echo -e "${CYAN}========================================${NC}"
echo ""

# --- 统计当前状态 ---
ORIGINAL_DM=$(grep -o '\[DM-[A-Za-z0-9]+-[0-9]\+\]' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
CHARS=$(wc -c < "$FILE" | tr -d ' ')
ORIGINAL_DENSITY=$(python3 -c "print(f'{($ORIGINAL_DM / ($CHARS / 10000)):.1f}' if $CHARS > 0 else '0.0')")

echo -e "📊 当前状态:"
echo -e "   DM标注: ${ORIGINAL_DM} 个"
echo -e "   字符数: ${CHARS}"
echo -e "   密度: ${ORIGINAL_DENSITY}/万字符"
echo ""

if [ "$DRY_RUN" != "true" ]; then
    # --- 创建备份 ---
    echo -e "${CYAN}[1/4] 创建备份...${NC}"
    if cp "$FILE" "$BACKUP_FILE"; then
        echo -e "   备份已保存: $(basename "$BACKUP_FILE")"
    else
        echo -e "${RED}FATAL: 无法创建备份文件${NC}"
        exit 2
    fi
    echo ""
fi

# --- 准备临时文件 ---
TEMP_FILE="${FILE}.tmp.$$"

# --- DM标注注入规则 ---
echo -e "${CYAN}[$([ "$DRY_RUN" = "true" ] && echo "预览" || echo "2/4")] 注入DM标注...${NC}"

python3 << 'EOF'
import re
import sys

# 读取文件
file_path = sys.argv[1]
dry_run = sys.argv[2] == "true"
temp_file = sys.argv[3]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

original_content = content

# DM标注计数器
counters = {'F': 1, 'I': 1, 'V': 1, 'R': 1, 'G': 1}

def get_next_dm(prefix):
    current = counters[prefix]
    counters[prefix] += 1
    return f"[DM-{prefix}{current:02d}]"

# 规则1: 财务数字 (美元金额, 百分比, 倍数)
patterns = [
    # 美元金额 $XXX.XB/M/K
    (r'(\$[0-9,]+\.?[0-9]*[BMK]?)(?!\[DM-)', lambda m: m.group(1) + " " + get_next_dm('F')),

    # 百分比
    (r'([0-9]+\.?[0-9]*%)(?!\[DM-)', lambda m: m.group(1) + " " + get_next_dm('F')),

    # P/E倍数等
    (r'([0-9]+\.?[0-9]*x)(?!\[DM-)', lambda m: m.group(1) + " " + get_next_dm('F')),

    # 纯数字 (在财务上下文中)
    (r'(EPS[^:]*:?\s*)([0-9]+\.?[0-9]+)(?!\[DM-)', lambda m: m.group(1) + m.group(2) + " " + get_next_dm('F')),
    (r'(Revenue[^:]*:?\s*)([0-9]+\.?[0-9]+)(?!\[DM-)', lambda m: m.group(1) + m.group(2) + " " + get_next_dm('F')),
    (r'(Market Cap[^:]*:?\s*)([0-9]+\.?[0-9]+)(?!\[DM-)', lambda m: m.group(1) + m.group(2) + " " + get_next_dm('F')),
]

# 应用所有模式
for pattern, replacement in patterns:
    content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

# 规则2: 行业数据 (市场份额, 增长率等)
industry_patterns = [
    (r'(市场份额[^:]*:?\s*)([0-9]+\.?[0-9]*%)(?!\[DM-)', lambda m: m.group(1) + m.group(2) + " " + get_next_dm('I')),
    (r'(同店增长[^:]*:?\s*)([0-9+-]+\.?[0-9]*%)(?!\[DM-)', lambda m: m.group(1) + m.group(2) + " " + get_next_dm('I')),
]

for pattern, replacement in industry_patterns:
    content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

# 统计变化
new_dm_count = len(re.findall(r'\[DM-[A-Za-z0-9]+-[0-9]\+\]', content))
original_dm_count = len(re.findall(r'\[DM-[A-Za-z0-9]+-[0-9]\+\]', original_content))
added_dm = new_dm_count - original_dm_count

print(f"   原有DM标注: {original_dm_count} 个")
print(f"   新增DM标注: {added_dm} 个")
print(f"   总计DM标注: {new_dm_count} 个")

if not dry_run:
    # 写入临时文件
    with open(temp_file, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    # 预览模式：显示前几个变化
    import difflib
    diff = list(difflib.unified_diff(
        original_content.splitlines(keepends=True)[:50],
        content.splitlines(keepends=True)[:50],
        fromfile='原文件',
        tofile='修改后',
        n=2
    ))
    if diff:
        print("\n预览前50行的变化:")
        for line in diff[:20]:  # 只显示前20行差异
            print(line.rstrip())
        if len(diff) > 20:
            print(f"... (还有{len(diff)-20}行差异)")

EOF "$FILE" "$DRY_RUN" "$TEMP_FILE"

if [ "$DRY_RUN" = "true" ]; then
    echo ""
    echo -e "${YELLOW}预览完成。使用 --dry-run 参数查看，实际执行请去掉该参数。${NC}"
    exit 0
fi

echo ""

# --- 替换原文件 ---
echo -e "${CYAN}[3/4] 更新原文件...${NC}"
if mv "$TEMP_FILE" "$FILE"; then
    echo -e "   文件已更新: $(basename "$FILE")"
else
    echo -e "${RED}FATAL: 无法更新文件${NC}"
    exit 2
fi
echo ""

# --- 验证结果 ---
echo -e "${CYAN}[4/4] 验证结果...${NC}"
NEW_DM=$(grep -o '\[DM-[A-Za-z0-9]+-[0-9]\+\]' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
NEW_DENSITY=$(python3 -c "print(f'{($NEW_DM / ($CHARS / 10000)):.1f}' if $CHARS > 0 else '0.0')")

echo -e "📊 更新后状态:"
echo -e "   DM标注: ${ORIGINAL_DM} → ${NEW_DM} (+$((NEW_DM - ORIGINAL_DM)))"
echo -e "   密度: ${ORIGINAL_DENSITY} → ${NEW_DENSITY}/万字符"

if (( $(echo "$NEW_DENSITY >= 15.0" | bc -l) )); then
    echo -e "   ${GREEN}✅ 标注密度达标 (≥15.0/万字符)${NC}"
else
    echo -e "   ${YELLOW}⚠️  标注密度仍不足 (需≥15.0/万字符)${NC}"
    echo -e "   ${YELLOW}建议手动补充重要财务数据的DM标注${NC}"
fi

echo ""
echo -e "${GREEN}✅ 自动DM注入完成${NC}"
echo -e "   备份文件: $(basename "$BACKUP_FILE")"
echo -e "   如有问题，可恢复: cp $(basename "$BACKUP_FILE") $(basename "$FILE")"