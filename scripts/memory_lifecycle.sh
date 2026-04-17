#!/bin/bash
# ============================================================
# memory_lifecycle.sh — 记忆生命周期管理 v1.0
# ============================================================
# 借鉴: LLM Wiki v2 supersession 模型 (反过度工程版)
# 核心原则: 让旧信念显式退休 — 只改元数据, 不移动/删除文件
#
# 用法:
#   # 标注 memory/文件为 superseded
#   bash scripts/memory_lifecycle.sh supersede <file> <new_file>
#
#   # 标注为 invalidated
#   bash scripts/memory_lifecycle.sh invalidate <file> <evidence_ref>
#
#   # 标注为 archived (仍可检索, 但低优先级)
#   bash scripts/memory_lifecycle.sh archive <file>
#
#   # 检查 pattern_registry 中 pattern 的状态
#   bash scripts/memory_lifecycle.sh status <pattern_id>
#
#   # 列出所有非 active 的 memory
#   bash scripts/memory_lifecycle.sh list-retired
#
# 退出码: 0=成功, 1=错误, 2=参数错误
# ============================================================

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ACTION="${1:?用法: $0 <supersede|invalidate|archive|status|list-retired> [args]}"

today() { date -u +"%Y-%m-%d"; }

# ============================================================
# Action: supersede <file> <new_file>
# ============================================================
if [ "$ACTION" == "supersede" ]; then
    OLD_FILE="${2:?缺少旧文件路径}"
    NEW_FILE="${3:?缺少新文件路径}"

    [ -f "$OLD_FILE" ] || { echo -e "${RED}旧文件不存在: $OLD_FILE${NC}"; exit 1; }
    [ -f "$NEW_FILE" ] || { echo -e "${RED}新文件不存在: $NEW_FILE${NC}"; exit 1; }

    TODAY=$(today)
    OLD_BN=$(basename "$OLD_FILE")
    NEW_BN=$(basename "$NEW_FILE")

    # 检查 frontmatter 是否存在
    HAS_FM=$(head -1 "$OLD_FILE" | grep -c '^---$' || echo 0)

    if [ "$HAS_FM" -eq 0 ]; then
        # 没有 frontmatter, 在文件顶部添加
        TEMP=$(mktemp)
        cat > "$TEMP" << EOF
---
status: superseded
superseded_by: ${NEW_BN}
last_validated_at: "${TODAY}"
---

EOF
        cat "$OLD_FILE" >> "$TEMP"
        mv "$TEMP" "$OLD_FILE"
        echo -e "${GREEN}✓ ${OLD_BN} 已标注为 superseded (新增 frontmatter)${NC}"
    else
        # 已有 frontmatter, 更新字段
        # 使用 sed 更新或添加 status 和 superseded_by 字段
        TEMP=$(mktemp)
        IN_FM=0
        FM_END=0
        STATUS_WRITTEN=0
        SUPERSEDED_BY_WRITTEN=0

        while IFS= read -r line; do
            if [ "$FM_END" -eq 1 ]; then
                echo "$line" >> "$TEMP"
                continue
            fi

            if [ "$IN_FM" -eq 0 ] && [ "$line" == "---" ]; then
                IN_FM=1
                echo "$line" >> "$TEMP"
                continue
            fi

            if [ "$IN_FM" -eq 1 ] && [ "$line" == "---" ]; then
                # frontmatter 结束 — 确保必要字段已写入
                [ "$STATUS_WRITTEN" -eq 0 ] && echo "status: superseded" >> "$TEMP"
                [ "$SUPERSEDED_BY_WRITTEN" -eq 0 ] && echo "superseded_by: ${NEW_BN}" >> "$TEMP"
                echo "last_validated_at: \"${TODAY}\"" >> "$TEMP"
                echo "$line" >> "$TEMP"
                FM_END=1
                continue
            fi

            if [ "$IN_FM" -eq 1 ]; then
                case "$line" in
                    status:*)
                        echo "status: superseded" >> "$TEMP"
                        STATUS_WRITTEN=1
                        ;;
                    superseded_by:*)
                        echo "superseded_by: ${NEW_BN}" >> "$TEMP"
                        SUPERSEDED_BY_WRITTEN=1
                        ;;
                    last_validated_at:*)
                        # 跳过, 稍后重写
                        ;;
                    *)
                        echo "$line" >> "$TEMP"
                        ;;
                esac
            fi
        done < "$OLD_FILE"

        mv "$TEMP" "$OLD_FILE"
        echo -e "${GREEN}✓ ${OLD_BN} frontmatter 已更新: status=superseded, superseded_by=${NEW_BN}${NC}"
    fi

    echo ""
    echo "下次默认检索不会返回此文件内容。"
    echo "使用 --audit-mode 可以看到: bash scripts/search_past_analysis.sh <关键词> --audit-mode"
    exit 0
fi

# ============================================================
# Action: invalidate <file> <evidence_ref>
# ============================================================
if [ "$ACTION" == "invalidate" ]; then
    FILE="${2:?缺少文件路径}"
    EVIDENCE="${3:?缺少证据引用 (如报告名/DM锚点/事件)}"

    [ -f "$FILE" ] || { echo -e "${RED}文件不存在: $FILE${NC}"; exit 1; }

    TODAY=$(today)
    BN=$(basename "$FILE")

    HAS_FM=$(head -1 "$FILE" | grep -c '^---$' || echo 0)

    if [ "$HAS_FM" -eq 0 ]; then
        TEMP=$(mktemp)
        cat > "$TEMP" << EOF
---
status: invalidated
invalidated_by: "${EVIDENCE}"
last_validated_at: "${TODAY}"
---

EOF
        cat "$FILE" >> "$TEMP"
        mv "$TEMP" "$FILE"
        echo -e "${GREEN}✓ ${BN} 已标注为 invalidated${NC}"
    else
        echo -e "${YELLOW}文件已有 frontmatter, 请手动添加:${NC}"
        echo "  status: invalidated"
        echo "  invalidated_by: \"${EVIDENCE}\""
        echo "  last_validated_at: \"${TODAY}\""
        exit 1
    fi

    echo ""
    echo "  invalidated_by: ${EVIDENCE}"
    echo "默认检索不会返回此文件。audit 模式可见。"
    exit 0
fi

# ============================================================
# Action: archive <file>
# ============================================================
if [ "$ACTION" == "archive" ]; then
    FILE="${2:?缺少文件路径}"
    [ -f "$FILE" ] || { echo -e "${RED}文件不存在: $FILE${NC}"; exit 1; }

    TODAY=$(today)
    BN=$(basename "$FILE")

    HAS_FM=$(head -1 "$FILE" | grep -c '^---$' || echo 0)
    if [ "$HAS_FM" -eq 0 ]; then
        TEMP=$(mktemp)
        cat > "$TEMP" << EOF
---
status: archived
last_validated_at: "${TODAY}"
---

EOF
        cat "$FILE" >> "$TEMP"
        mv "$TEMP" "$FILE"
        echo -e "${GREEN}✓ ${BN} 已归档 (仍可检索, 但低优先级)${NC}"
    else
        echo -e "${YELLOW}文件已有 frontmatter, 请手动添加: status: archived${NC}"
        exit 1
    fi
    exit 0
fi

# ============================================================
# Action: status <pattern_id>
# ============================================================
if [ "$ACTION" == "status" ]; then
    PATTERN_ID="${2:?缺少 pattern ID (如 PAT-03)}"
    REGISTRY="${REPO_ROOT}/knowledge/pattern_registry.yaml"

    [ -f "$REGISTRY" ] || { echo -e "${RED}registry 不存在: $REGISTRY${NC}"; exit 1; }

    echo -e "${CYAN}Pattern ${PATTERN_ID} 状态:${NC}"
    awk -v pid="$PATTERN_ID" '
        /^  - id:/ {
            in_block = 0
            if (index($0, pid) > 0) in_block = 1
        }
        in_block {
            if (/^  - id:/ && index($0, pid) == 0) {
                exit
            }
            print "  " $0
        }
    ' "$REGISTRY"
    exit 0
fi

# ============================================================
# Action: list-retired — 列出所有非 active 的 memory
# ============================================================
if [ "$ACTION" == "list-retired" ]; then
    echo -e "${CYAN}========================================"
    echo " 已退休的 Memory 对象"
    echo -e "========================================${NC}"
    echo ""

    # 搜索所有 memory/*.md 和 reports/*/staging/*.md 中标注 superseded/invalidated/archived 的
    echo -e "${YELLOW}[Memory 文件]${NC}"
    MEMORY_RETIRED=0
    for f in "${REPO_ROOT}"/.claude/projects/-Users-milton-----/memory/*.md; do
        [ -f "$f" ] || continue
        status_line=$(head -20 "$f" 2>/dev/null | grep -E '^status:' | head -1 || true)
        if [ -n "$status_line" ]; then
            status_val=$(echo "$status_line" | sed 's/^status:[[:space:]]*//')
            if [ "$status_val" != "active" ]; then
                echo "  $(basename "$f") → $status_val"
                MEMORY_RETIRED=$((MEMORY_RETIRED + 1))
            fi
        fi
    done
    [ "$MEMORY_RETIRED" -eq 0 ] && echo "  (无)"
    echo ""

    # Pattern registry
    echo -e "${YELLOW}[Pattern Registry]${NC}"
    REGISTRY="${REPO_ROOT}/knowledge/pattern_registry.yaml"
    if [ -f "$REGISTRY" ]; then
        PAT_RETIRED=$(grep -cE '^    status:[[:space:]]*(superseded|invalidated|archived)' "$REGISTRY" || echo 0)
        PAT_RETIRED=$(echo "$PAT_RETIRED" | tr -d '\n ')
        if [ "$PAT_RETIRED" -gt 0 ]; then
            awk '
                /^  - id:/ { current_id = $0 }
                /^    status:[[:space:]]*(superseded|invalidated|archived)/ {
                    print "  " current_id " → " $0
                }
            ' "$REGISTRY"
        else
            echo "  (无)"
        fi
    fi
    echo ""

    exit 0
fi

echo -e "${RED}未知动作: $ACTION${NC}"
echo "可用: supersede | invalidate | archive | status | list-retired"
exit 2
