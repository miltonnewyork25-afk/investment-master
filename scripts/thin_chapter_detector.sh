#!/bin/bash
# ============================================================
# thin_chapter_detector.sh — 薄章节检测器 v1.0
# ============================================================
# 用法: bash scripts/thin_chapter_detector.sh <报告文件.md> [最小字符阈值]
#
# 背景: ARM报告Ch10(1,008字符)、Ch22(1,235字符)等章节过薄,
#        拉低整体密度。本脚本在组装前/后检测薄章节。
#
# 逻辑:
#   1. 用正则分割章节 (## N. / ## 第X章 / ## Chapter)
#   2. 计算每章字符数
#   3. 低于阈值的章节排序列出(最薄在前,Top-5)
#   4. 输出统计: 总章数 / 薄章数 / 最薄章节
#
# 退出码: 0=OK(无薄章), 1=WARN(有薄章)
# 集成: phase_sentinel.sh Phase≥5时调用
#
# v1.0 (2026-02-25) — EVO-ARM-002
# ============================================================

set -uo pipefail

FILE="${1:?用法: $0 <报告文件.md> [最小字符阈值]}"
MIN_CHARS="${2:-1500}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

if [ ! -f "$FILE" ]; then
    echo -e "${RED}FATAL: 文件不存在: $FILE${NC}"
    exit 1
fi

echo "=============================================="
echo -e " ${CYAN}Thin Chapter Detector v1.0${NC}"
echo " 文件: $(basename "$FILE")"
echo " 阈值: ${MIN_CHARS} 字符"
echo "=============================================="
echo ""

# 用Python进行章节分割和字符计数(bash正则处理多行文本不够可靠)
# 通过环境变量传递参数,避免heredoc引号问题
RESULT=$(export _TC_FILE="$FILE" _TC_MIN="$MIN_CHARS"; python3 << 'PYEOF'
import re, os, sys

file_path = os.environ['_TC_FILE']
min_chars = int(os.environ['_TC_MIN'])

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 匹配章节标题: ## N. / ## 第X章 / ## Chapter N / ## ChN
pattern = r'^## +(?:\d+\.|第.{1,4}章|Chapter \d+|Ch\d+)'
matches = list(re.finditer(pattern, content, re.MULTILINE))

if not matches:
    print("NO_CHAPTERS")
    sys.exit(0)

chapters = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(content)
    nl_pos = content.find('\n', m.start())
    title_line = content[m.start():nl_pos] if nl_pos > 0 else content[m.start():]
    char_count = end - start
    chapters.append((title_line.strip(), char_count))

total = len(chapters)
thin = [(t, c) for t, c in chapters if c < min_chars]
thin.sort(key=lambda x: x[1])

print(f"TOTAL:{total}")
print(f"THIN:{len(thin)}")

if thin:
    for title, chars in thin[:5]:
        print(f"THIN_CH:{chars}|{title}")

chapters.sort(key=lambda x: x[1], reverse=True)
if chapters:
    print(f"THICKEST:{chapters[0][1]}|{chapters[0][0]}")
PYEOF
)

if [ "$RESULT" = "NO_CHAPTERS" ]; then
    echo -e "${YELLOW}未检测到标准章节标题 (## N. / ## 第X章 / ## Chapter / ## ChN)${NC}"
    exit 0
fi

# 解析结果
TOTAL=$(echo "$RESULT" | grep '^TOTAL:' | cut -d: -f2)
THIN_COUNT=$(echo "$RESULT" | grep '^THIN:' | cut -d: -f2)
THICKEST_LINE=$(echo "$RESULT" | grep '^THICKEST:' | cut -d: -f2-)
THICKEST_CHARS=$(echo "$THICKEST_LINE" | cut -d'|' -f1)
THICKEST_TITLE=$(echo "$THICKEST_LINE" | cut -d'|' -f2-)

echo "总章节数: ${TOTAL}"
echo "薄章节数: ${THIN_COUNT} (< ${MIN_CHARS} 字符)"
echo "最厚章节: ${THICKEST_CHARS} 字符 — ${THICKEST_TITLE}"
echo ""

if [ "${THIN_COUNT:-0}" -gt 0 ]; then
    echo "--- 薄章节清单 (最薄在前, Top-5) ---"
    echo "$RESULT" | grep '^THIN_CH:' | while IFS= read -r line; do
        CHARS=$(echo "$line" | cut -d: -f2 | cut -d'|' -f1)
        TITLE=$(echo "$line" | cut -d'|' -f2-)
        echo -e "  ${YELLOW}${CHARS} chars${NC} — ${TITLE}"
    done
    echo ""

    # 厚薄比
    if [ "${THICKEST_CHARS:-0}" -gt 0 ]; then
        THINNEST_CHARS=$(echo "$RESULT" | grep '^THIN_CH:' | head -1 | cut -d: -f2 | cut -d'|' -f1)
        if [ "${THINNEST_CHARS:-0}" -gt 0 ]; then
            RATIO=$((THICKEST_CHARS / THINNEST_CHARS))
            echo "厚薄比: ${RATIO}x (最厚${THICKEST_CHARS} / 最薄${THINNEST_CHARS})"
            if [ "$RATIO" -ge 10 ]; then
                echo -e "${YELLOW}→ 厚薄比≥10x 表明章节密度极不均匀, 建议扩展薄章节或合并至相邻章节${NC}"
            fi
        fi
    fi
    echo ""
    echo -e "${YELLOW}WARN: ${THIN_COUNT}个章节低于${MIN_CHARS}字符阈值${NC}"
    exit 1
else
    echo -e "${GREEN}OK: 所有${TOTAL}个章节均≥${MIN_CHARS}字符${NC}"
    exit 0
fi
