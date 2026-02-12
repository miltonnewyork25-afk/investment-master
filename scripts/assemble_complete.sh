#!/bin/bash
# ============================================================
# assemble_complete.sh — Complete报告组装自动化脚本 v1.0
# ============================================================
# 用法:
#   bash scripts/assemble_complete.sh <TICKER> <VERSION> <CONFIG_FILE>
#   例: bash scripts/assemble_complete.sh GOOGL v4.0 reports/GOOGL/staging/assembly_config.md
#
# 功能:
#   1. 读取assembly_config.md配置文件(章节→文件→行范围映射)
#   2. 生成Protocol Header(v10.0研究契约)
#   3. 按Part顺序拼接staging文件，支持行范围切割
#   4. 清理Agent元数据(写作日期/字符预算/覆盖章节等)
#   5. 插入Phase标记行(# Phase 4: / # Phase 5: — CG脚本需要)
#   6. 发布合规检查(入侵/invade/invasion)
#   7. 零仓位/零评分检查(禁止词)
#   8. 输出统计(总字符/Mermaid图/标注数)
#   9. 写入 reports/{TICKER}/{TICKER}_Complete_{VERSION}_{DATE}.md
#
# 配置文件格式(assembly_config.md):
#   见本脚本底部或文档 docs/deep_dive_protocol.md
#
# 退出码: 0=成功, 1=合规FAIL, 2=参数错误, 3=文件缺失
# ============================================================

set -uo pipefail

# --- 颜色 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# --- 参数 ---
TICKER="${1:?用法: $0 <TICKER> <VERSION> <CONFIG_FILE>}"
VERSION="${2:?缺少VERSION参数 (如 v4.0)}"
CONFIG="${3:?缺少CONFIG_FILE参数 (如 reports/GOOGL/staging/assembly_config.md)}"

# --- 路径 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

echo -e "${CYAN}========================================"
echo " Complete Assembly Script v1.0"
echo " Ticker: ${TICKER} | Version: ${VERSION}"
echo " Config: ${CONFIG}"
echo -e "========================================${NC}"
echo ""

# --- 前置检查 ---
if [ ! -f "$CONFIG" ]; then
    echo -e "${RED}FATAL: 配置文件不存在: ${CONFIG}${NC}"
    exit 3
fi

# --- Step 1: 解析配置文件 ---
echo -e "${CYAN}[1/8] 解析配置文件...${NC}"

# 提取头部元数据
parse_config_field() {
    local field="$1"
    local result
    result=$(grep -E "^${field}:" "$CONFIG" 2>/dev/null | head -1 | sed "s/^${field}:[[:space:]]*//" | tr -d '\r') || true
    echo "$result"
}

CFG_TICKER=$(parse_config_field "TICKER")
CFG_VERSION=$(parse_config_field "VERSION")
CFG_DATE=$(parse_config_field "DATE")
CFG_PRICE=$(parse_config_field "PRICE")
CFG_MARKET_CAP=$(parse_config_field "MARKET_CAP")
CFG_RATING=$(parse_config_field "RATING")
CFG_POSSIBILITY_WIDTH=$(parse_config_field "POSSIBILITY_WIDTH")
CFG_FRAMEWORK=$(parse_config_field "FRAMEWORK")

# 使用配置值或参数默认值
CFG_TICKER="${CFG_TICKER:-$TICKER}"
CFG_VERSION="${CFG_VERSION:-$VERSION}"
CFG_DATE="${CFG_DATE:-$(date +%Y-%m-%d)}"
CFG_FRAMEWORK="${CFG_FRAMEWORK:-v10.0}"

echo "  TICKER: ${CFG_TICKER}"
echo "  VERSION: ${CFG_VERSION}"
echo "  DATE: ${CFG_DATE}"
echo "  PRICE: ${CFG_PRICE:-未指定}"
echo "  MARKET_CAP: ${CFG_MARKET_CAP:-未指定}"
echo "  RATING: ${CFG_RATING:-未指定}"
echo "  POSSIBILITY_WIDTH: ${CFG_POSSIBILITY_WIDTH:-未指定}"
echo "  FRAMEWORK: ${CFG_FRAMEWORK}"
echo ""

# 提取Part Mapping表格行(跳过表头和分隔线)
# 格式: | Part I | Ch01-02 | staging/S1_agent_A_ch01_ch02.md | all |
MAPPING_LINES=()
IN_TABLE=0
while IFS= read -r line; do
    # 检测表格开始(## Part Mapping之后的表格)
    if echo "$line" | grep -qE '^\| *Part *\|'; then
        IN_TABLE=1
        continue
    fi
    # 跳过分隔线
    if echo "$line" | grep -qE '^\|[-: ]+\|'; then
        continue
    fi
    # 读取表格数据行
    if [ "$IN_TABLE" -eq 1 ]; then
        if echo "$line" | grep -qE '^\|.*\|.*\|.*\|.*\|'; then
            MAPPING_LINES+=("$line")
        else
            # 表格结束
            if [ -n "$line" ] && ! echo "$line" | grep -qE '^\|'; then
                IN_TABLE=0
            fi
        fi
    fi
done < "$CONFIG"

PART_COUNT=${#MAPPING_LINES[@]}
echo -e "  Part映射: ${PART_COUNT}条"

if [ "$PART_COUNT" -eq 0 ]; then
    echo -e "${RED}FATAL: 配置文件中未找到Part Mapping表格${NC}"
    echo "  期望格式: | Part I | Ch01-02 | staging/file.md | all |"
    exit 2
fi

# --- 解析mapping到数组 ---
PARTS=()
CHAPTERS=()
FILES=()
LINE_RANGES=()

for mapping_line in "${MAPPING_LINES[@]}"; do
    # 解析: | Part I | Ch01-02 | staging/S1_agent_A_ch01_ch02.md | all |
    part=$(echo "$mapping_line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $2); print $2}')
    chapter=$(echo "$mapping_line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $3); print $3}')
    file=$(echo "$mapping_line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $4); print $4}')
    lines=$(echo "$mapping_line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $5); print $5}')

    PARTS+=("$part")
    CHAPTERS+=("$chapter")
    FILES+=("$file")
    LINE_RANGES+=("$lines")
done

# 验证所有文件存在
STAGING_DIR="$(dirname "$CONFIG")"
MISSING_FILES=0
for i in "${!FILES[@]}"; do
    file="${FILES[$i]}"
    # 尝试相对于配置文件目录
    if [ -f "${STAGING_DIR}/${file}" ]; then
        FILES[$i]="${STAGING_DIR}/${file}"
    elif [ -f "reports/${TICKER}/${file}" ]; then
        FILES[$i]="reports/${TICKER}/${file}"
    elif [ -f "$file" ]; then
        FILES[$i]="$file"
    else
        echo -e "${RED}  MISSING: ${file}${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ "$MISSING_FILES" -gt 0 ]; then
    echo -e "${RED}FATAL: ${MISSING_FILES}个源文件缺失，中止组装${NC}"
    exit 3
fi

echo -e "${GREEN}  所有源文件验证通过${NC}"
echo ""

# --- Step 2: 生成Protocol Header ---
echo -e "${CYAN}[2/8] 生成Protocol Header...${NC}"

OUTPUT_DIR="reports/${TICKER}"
mkdir -p "$OUTPUT_DIR"
OUTPUT_FILE="${OUTPUT_DIR}/${TICKER}_Complete_${CFG_VERSION}_${CFG_DATE}.md"

# 写入Protocol Header
cat > "$OUTPUT_FILE" << HEADER_EOF
# ${CFG_TICKER} — Tier 3 深度研究报告 Complete ${CFG_VERSION}

## 研究契约

> **框架版本**: ${CFG_FRAMEWORK}
> **数据截止**: ${CFG_DATE}
> **股价**: ${CFG_PRICE:-待填写} | **市值**: ${CFG_MARKET_CAP:-待填写}
> **评级**: ${CFG_RATING:-待填写} | **可能性宽度**: ${CFG_POSSIBILITY_WIDTH:-待填写}

### 本报告包含
- 基于公开数据的事实整理与交叉验证
- 基于数据的逻辑推断（标注推理链）
- Reverse DCF价格含义分析（"市场在赌什么"）
- 结构化看空论证与认知偏差审计

### 本报告不包含
- 精确目标价或价格预测
- 仓位建议或操作触发点
- 对未来事件的确定性判断

### AI能力边界声明
- **深挖区(高信号)**: 财务数据组织、历史模式识别、交叉验证、价格含义反推
- **诚实区(中信号)**: 竞争格局评估、技术路线判断、管理层评估
- **人类决策区(低信号)**: 时机选择、仓位管理、宏观转折点、黑天鹅事件

---

HEADER_EOF

echo -e "${GREEN}  Protocol Header已写入${NC}"
echo ""

# --- Step 3: 按Part顺序拼接 ---
echo -e "${CYAN}[3/8] 按Part顺序拼接...${NC}"

CURRENT_PART=""
ASSEMBLED_PARTS=0

for i in "${!PARTS[@]}"; do
    part="${PARTS[$i]}"
    chapter="${CHAPTERS[$i]}"
    file="${FILES[$i]}"
    line_range="${LINE_RANGES[$i]}"

    # 如果Part变了，打印Part标记
    if [ "$part" != "$CURRENT_PART" ]; then
        CURRENT_PART="$part"
        echo "  --- ${part} ---"
    fi

    # 根据行范围提取内容
    CONTENT=""
    case "$line_range" in
        all|ALL|"")
            CONTENT=$(cat "$file")
            ;;
        *-*)
            # 解析行范围: "1-897" 或 "898-"
            START_LINE=$(echo "$line_range" | cut -d'-' -f1)
            END_LINE=$(echo "$line_range" | cut -d'-' -f2)

            START_LINE="${START_LINE:-1}"

            if [ -z "$END_LINE" ]; then
                # "898-" 格式: 从START到文件末尾
                CONTENT=$(tail -n +"$START_LINE" "$file")
            else
                # "1-897" 格式: 指定范围
                TOTAL_LINES=$((END_LINE - START_LINE + 1))
                CONTENT=$(tail -n +"$START_LINE" "$file" | head -n "$TOTAL_LINES")
            fi
            ;;
        *)
            echo -e "${YELLOW}  WARN: 未识别的行范围格式 '${line_range}'，使用全文${NC}"
            CONTENT=$(cat "$file")
            ;;
    esac

    # 追加到输出文件
    echo "$CONTENT" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    CONTENT_CHARS=$(echo "$CONTENT" | wc -m)
    CONTENT_CHARS="${CONTENT_CHARS// /}"
    echo "  ${chapter}: $(basename "$file") [${line_range}] → ${CONTENT_CHARS}字符"

    ASSEMBLED_PARTS=$((ASSEMBLED_PARTS + 1))
done

echo -e "${GREEN}  已拼接 ${ASSEMBLED_PARTS} 个片段${NC}"
echo ""

# --- Step 4: 清理Agent元数据 ---
echo -e "${CYAN}[4/8] 清理Agent元数据...${NC}"

# 统计清理前行数
LINES_BEFORE=$(wc -l < "$OUTPUT_FILE")
LINES_BEFORE="${LINES_BEFORE// /}"

# 使用临时文件进行sed操作(macOS BSD兼容)
TMPFILE=$(mktemp)

# 删除包含Agent元数据标记的行
# 匹配模式: Agent X产出 / 写作日期 / 字符预算 / 覆盖章节 / 产出Agent / 负责Agent
sed \
    -e '/Agent.*产出/d' \
    -e '/写作日期/d' \
    -e '/字符预算/d' \
    -e '/覆盖章节/d' \
    -e '/产出Agent/d' \
    -e '/负责Agent/d' \
    -e '/^> *Agent [A-Z]/d' \
    -e '/^> *本文件由.*Agent/d' \
    -e '/^> *生成时间:/d' \
    -e '/^> *目标字符:/d' \
    -e '/^> *实际字符:/d' \
    "$OUTPUT_FILE" > "$TMPFILE"

mv "$TMPFILE" "$OUTPUT_FILE"

LINES_AFTER=$(wc -l < "$OUTPUT_FILE")
LINES_AFTER="${LINES_AFTER// /}"
LINES_REMOVED=$((LINES_BEFORE - LINES_AFTER))

echo -e "  清理前: ${LINES_BEFORE}行 → 清理后: ${LINES_AFTER}行 (删除${LINES_REMOVED}行元数据)"
echo ""

# --- Step 5: 插入Phase标记行 ---
echo -e "${CYAN}[5/8] 检查Phase标记行...${NC}"

# 检查是否已有Phase 4标记
HAS_P4_MARKER=$({ grep -c '^# Phase 4' "$OUTPUT_FILE" || true; })
HAS_P5_MARKER=$({ grep -c '^# Phase 5' "$OUTPUT_FILE" || true; })

P4_INSERTED=0
P5_INSERTED=0

if [ "$HAS_P4_MARKER" -eq 0 ]; then
    # 尝试在Phase 4相关内容前插入标记
    # 查找Phase 4的典型标题: 看空/对抗/红队/Devil's Advocate/认知偏差审计
    P4_LINE=$({ grep -n -E '^#{1,3} .*(看空|对抗|红队|Devil|Advocate|认知偏差审计|Phase.*4|P4)' "$OUTPUT_FILE" | head -1 | cut -d: -f1; } || true)
    if [ -n "$P4_LINE" ] && [ "$P4_LINE" -gt 0 ]; then
        TMPFILE=$(mktemp)
        # 在该行前插入Phase标记(macOS BSD sed兼容)
        awk -v line="$P4_LINE" 'NR==line{print "# Phase 4:\n"}1' "$OUTPUT_FILE" > "$TMPFILE"
        mv "$TMPFILE" "$OUTPUT_FILE"
        P4_INSERTED=1
        echo -e "  ${GREEN}已在第${P4_LINE}行前插入 '# Phase 4:'${NC}"
    else
        echo -e "  ${YELLOW}WARN: 未检测到Phase 4内容起始位置，请手动添加 '# Phase 4:' 标记${NC}"
    fi
else
    echo -e "  Phase 4标记已存在"
fi

if [ "$HAS_P5_MARKER" -eq 0 ]; then
    # 尝试在Phase 5相关内容前插入标记
    # 查找Phase 5的典型标题: 决策输出/投资论文/估值/Reverse DCF
    P5_LINE=$({ grep -n -E '^#{1,3} .*(决策输出|投资论文|估值综合|Reverse.*DCF|Phase.*5|P5.*决策)' "$OUTPUT_FILE" | head -1 | cut -d: -f1; } || true)
    if [ -n "$P5_LINE" ] && [ "$P5_LINE" -gt 0 ]; then
        TMPFILE=$(mktemp)
        awk -v line="$P5_LINE" 'NR==line{print "# Phase 5:\n"}1' "$OUTPUT_FILE" > "$TMPFILE"
        mv "$TMPFILE" "$OUTPUT_FILE"
        P5_INSERTED=1
        echo -e "  ${GREEN}已在第${P5_LINE}行前插入 '# Phase 5:'${NC}"
    else
        echo -e "  ${YELLOW}WARN: 未检测到Phase 5内容起始位置，请手动添加 '# Phase 5:' 标记${NC}"
    fi
else
    echo -e "  Phase 5标记已存在"
fi

echo ""

# --- Step 6: 发布合规检查 ---
echo -e "${CYAN}[6/8] 发布合规检查...${NC}"

COMPLIANCE_ERRORS=0

# 检查禁止词: 入侵/invade/invasion (排除引号内的Polymarket市场名称)
INVADE_HITS=$({ grep -n -iE '入侵|invade|invasion' "$OUTPUT_FILE" | grep -v '^.*".*invade.*"' | grep -v "^.*'.*invade.*'" || true; })
if [ -n "$INVADE_HITS" ]; then
    INVADE_COUNT=$(echo "$INVADE_HITS" | wc -l)
    INVADE_COUNT="${INVADE_COUNT// /}"
    echo -e "${RED}  FAIL: 发现${INVADE_COUNT}处禁止表述(入侵/invade/invasion):${NC}"
    echo "$INVADE_HITS" | head -5 | while IFS= read -r hit; do
        echo -e "    ${RED}${hit}${NC}"
    done
    if [ "$INVADE_COUNT" -gt 5 ]; then
        echo -e "    ${RED}... 还有$((INVADE_COUNT - 5))处${NC}"
    fi
    COMPLIANCE_ERRORS=$((COMPLIANCE_ERRORS + INVADE_COUNT))
else
    echo -e "  ${GREEN}PASS: 无禁止表述(入侵/invade/invasion)${NC}"
fi

# 检查"中国入侵"变体
CHINA_INVADE=$({ grep -n -iE '中国.*入侵|China.*invad|invad.*Taiwan' "$OUTPUT_FILE" | grep -v '^.*".*"' || true; })
if [ -n "$CHINA_INVADE" ]; then
    echo -e "${RED}  FAIL: 发现'中国入侵台湾'类表述:${NC}"
    echo "$CHINA_INVADE" | while IFS= read -r hit; do
        echo -e "    ${RED}${hit}${NC}"
    done
fi

echo ""

# --- Step 7: 零仓位/零评分检查 ---
echo -e "${CYAN}[7/8] 零仓位/零评分检查...${NC}"

POSITION_ERRORS=0

# 检查仓位建议词
POSITION_HITS=$({ grep -n -E '加仓|减仓|建仓|清仓|仓位.*%|持仓比例|配置.*%' "$OUTPUT_FILE" || true; })
if [ -n "$POSITION_HITS" ]; then
    POS_COUNT=$(echo "$POSITION_HITS" | wc -l)
    POS_COUNT="${POS_COUNT// /}"
    echo -e "${YELLOW}  WARN: 发现${POS_COUNT}处仓位相关词汇:${NC}"
    echo "$POSITION_HITS" | head -5 | while IFS= read -r hit; do
        echo -e "    ${YELLOW}${hit}${NC}"
    done
    POSITION_ERRORS=$((POSITION_ERRORS + POS_COUNT))
else
    echo -e "  ${GREEN}PASS: 无仓位建议词汇${NC}"
fi

# 检查数字评分(X/100格式)
SCORE_HITS=$({ grep -n -E '[0-9]+/100|评分.*[0-9]{2}分' "$OUTPUT_FILE" || true; })
if [ -n "$SCORE_HITS" ]; then
    SCORE_COUNT=$(echo "$SCORE_HITS" | wc -l)
    SCORE_COUNT="${SCORE_COUNT// /}"
    echo -e "${YELLOW}  WARN: 发现${SCORE_COUNT}处数字评分(X/100):${NC}"
    echo "$SCORE_HITS" | head -5 | while IFS= read -r hit; do
        echo -e "    ${YELLOW}${hit}${NC}"
    done
else
    echo -e "  ${GREEN}PASS: 无数字评分(X/100)${NC}"
fi

# 检查精确目标价
TARGET_HITS=$({ grep -n -E '目标价[: ]*\$[0-9]|target.*price.*\$[0-9]' "$OUTPUT_FILE" || true; })
if [ -n "$TARGET_HITS" ]; then
    TARGET_COUNT=$(echo "$TARGET_HITS" | wc -l)
    TARGET_COUNT="${TARGET_COUNT// /}"
    echo -e "${YELLOW}  WARN: 发现${TARGET_COUNT}处精确目标价:${NC}"
    echo "$TARGET_HITS" | head -3 | while IFS= read -r hit; do
        echo -e "    ${YELLOW}${hit}${NC}"
    done
else
    echo -e "  ${GREEN}PASS: 无精确目标价${NC}"
fi

echo ""

# --- Step 8: 输出统计 ---
echo -e "${CYAN}[8/8] 输出统计...${NC}"

# 总字符(wc -m = Unicode字符)
TOTAL_CHARS=$(wc -m < "$OUTPUT_FILE")
TOTAL_CHARS="${TOTAL_CHARS// /}"

# Mermaid图数
MERMAID_COUNT=$({ grep -c '```mermaid' "$OUTPUT_FILE" || true; })

# 标注数(新旧两种格式)
OLD_ANN=$({ grep -oE '\[(A|B|P|E):' "$OUTPUT_FILE" | wc -l || true; })
OLD_ANN="${OLD_ANN// /}"
NEW_ANN=$({ grep -oE '\[(硬数据|合理推断|主观判断):' "$OUTPUT_FILE" | wc -l || true; })
NEW_ANN="${NEW_ANN// /}"
TOTAL_ANN=$((OLD_ANN + NEW_ANN))

# 密度
if [ "$TOTAL_CHARS" -gt 0 ]; then
    ANN_DENSITY=$(python3 -c "print(round($TOTAL_ANN * 10000 / $TOTAL_CHARS, 1))")
else
    ANN_DENSITY=0
fi

# 硬数据占比
HARD_OLD=$({ grep -oE '\[(A|B|P):' "$OUTPUT_FILE" | wc -l || true; })
HARD_OLD="${HARD_OLD// /}"
HARD_NEW=$({ grep -oE '\[硬数据:' "$OUTPUT_FILE" | wc -l || true; })
HARD_NEW="${HARD_NEW// /}"
HARD_TOTAL=$((HARD_OLD + HARD_NEW))
if [ "$TOTAL_ANN" -gt 0 ]; then
    HARD_RATIO=$(python3 -c "print(round($HARD_TOTAL * 100 / $TOTAL_ANN, 1))")
else
    HARD_RATIO=0
fi

# KS数
KS_COUNT=$({ grep -oE 'KS-[A-Z]+-[0-9]+|KS-[0-9]+|KS[0-9]+' "$OUTPUT_FILE" | sort -u | wc -l || true; })
KS_COUNT="${KS_COUNT// /}"

# TS数
TS_COUNT=$({ grep -oE 'TS-[0-9]+|TS[0-9]+' "$OUTPUT_FILE" | sort -u | wc -l || true; })
TS_COUNT="${TS_COUNT// /}"

# CQ数
CQ_COUNT=$({ grep -oE 'CQ-[0-9]+|CQ[0-9]+' "$OUTPUT_FILE" | sort -u | wc -l || true; })
CQ_COUNT="${CQ_COUNT// /}"

# CI数
CI_COUNT=$({ grep -oE 'CI-[0-9]+' "$OUTPUT_FILE" | sort -u | wc -l || true; })
CI_COUNT="${CI_COUNT// /}"

# 总行数
TOTAL_LINES=$(wc -l < "$OUTPUT_FILE")
TOTAL_LINES="${TOTAL_LINES// /}"

echo ""
echo -e "${GREEN}========================================"
echo " Complete Assembly Done!"
echo "========================================"
echo ""
echo " 输出文件: ${OUTPUT_FILE}"
echo ""
echo " --- 规模指标 ---"
echo " 总字符:    ${TOTAL_CHARS}"
echo " 总行数:    ${TOTAL_LINES}"
echo " 拼接片段:  ${ASSEMBLED_PARTS}"
echo ""
echo " --- 质量指标 ---"
echo " 标注总数:  ${TOTAL_ANN} (密度: ${ANN_DENSITY}/万字符)"
echo " 硬数据:    ${HARD_TOTAL} (${HARD_RATIO}%)"
echo " Mermaid图: ${MERMAID_COUNT}"
echo ""
echo " --- 结构指标 ---"
echo " KS: ${KS_COUNT} | TS: ${TS_COUNT} | CQ: ${CQ_COUNT} | CI: ${CI_COUNT}"
echo " Phase 4标记: $([ "$HAS_P4_MARKER" -gt 0 ] || [ "$P4_INSERTED" -eq 1 ] && echo '有' || echo '无')"
echo " Phase 5标记: $([ "$HAS_P5_MARKER" -gt 0 ] || [ "$P5_INSERTED" -eq 1 ] && echo '有' || echo '无')"
echo ""
echo " --- 合规检查 ---"
echo " 发布合规:  $([ "$COMPLIANCE_ERRORS" -eq 0 ] && echo 'PASS' || echo "FAIL (${COMPLIANCE_ERRORS}处)")"
echo " 零仓位:    $([ "$POSITION_ERRORS" -eq 0 ] && echo 'PASS' || echo "WARN (${POSITION_ERRORS}处)")"
echo -e "========================================${NC}"
echo ""

# 提示下一步
echo "下一步:"
echo "  1. 审查报告: less ${OUTPUT_FILE}"
echo "  2. 运行质量门控: bash tests/quality_gate_complete.sh ${OUTPUT_FILE}"
echo "  3. 运行数据验证: bash tests/verify_data_sources.sh ${OUTPUT_FILE} data/research/${TICKER}/shared_context.md"
echo ""

# 如果有合规错误，以非零退出
if [ "$COMPLIANCE_ERRORS" -gt 0 ]; then
    echo -e "${RED}注意: 有${COMPLIANCE_ERRORS}处发布合规违规，请修正后再提交。${NC}"
    exit 1
fi

exit 0
