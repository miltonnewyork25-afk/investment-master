#!/bin/bash
# ai_flavor_check.sh — narrative-discipline v1.0 的脚本层检查
# 用法: bash scripts/ai_flavor_check.sh {REPORT_PATH}
# 输出: AI 味词命中 / 套路转场词命中 / 句长方差
# 性质: WARN-only,不阻断 commit

set -u

REPORT="${1:-}"
if [[ -z "$REPORT" || ! -f "$REPORT" ]]; then
  echo "用法: bash scripts/ai_flavor_check.sh {REPORT_PATH}"
  exit 2
fi

echo "═══════════════════════════════════════════════════════"
echo "  narrative-discipline 扫描: $REPORT"
echo "═══════════════════════════════════════════════════════"

WARN_COUNT=0

# ─────────────────────────────────────────────────────────
# 1. AI 味词清单(框架内部比喻 + AI 味比喻)
# ─────────────────────────────────────────────────────────
AI_FLAVOR_WORDS=(
  "谜题"
  "解谜"
  "抽丝剥茧"
  "问题引擎"
  "问题驱动"
  "变量化思考"
  "承重墙"
  "脚手架"
  "钩子"
  "叙事驱动"
  "温水煮青蛙"
  "降维打击"
  "范式跃迁"
  "认知迷雾"
  "护城河雷达"
  "预期差雷达"
  "拨开迷雾"
  "层层剥开"
  "直击本质"
  "稻草人"
  "诉诸权威"
  "滑坡谬误"
  "循环论证"
  "读者"
  "我们"
  "笔者"
  "红队"
  "蓝队"
  "红方"
  "蓝方"
  "正方"
  "支持者"
  "反对者"
)

echo ""
echo "[1/3] AI 味词扫描"
echo "---"
AI_HIT=0
for word in "${AI_FLAVOR_WORDS[@]}"; do
  count=$({ grep -c "$word" "$REPORT" 2>/dev/null || true; })
  count=${count:-0}
  if [[ "$count" -gt 0 ]]; then
    echo "  ⚠  命中 '$word' ($count 次)"
    AI_HIT=$((AI_HIT + count))
  fi
done
if [[ "$AI_HIT" -eq 0 ]]; then
  echo "  ✓ 未命中 AI 味词"
else
  echo "  总命中: $AI_HIT 次 → WARN"
  WARN_COUNT=$((WARN_COUNT + 1))
fi

# ─────────────────────────────────────────────────────────
# 2. 套路转场词清单
# ─────────────────────────────────────────────────────────
FORMULAIC_PHRASES=(
  "综上所述"
  "值得一提的是"
  "不难发现"
  "众所周知"
  "本报告认为"
  "笔者观察"
  "本节将从"
  "本文将从"
  "本章将从"
)

echo ""
echo "[2/3] 套路转场词扫描"
echo "---"
FORMULAIC_HIT=0
for phrase in "${FORMULAIC_PHRASES[@]}"; do
  count=$({ grep -c "$phrase" "$REPORT" 2>/dev/null || true; })
  count=${count:-0}
  if [[ "$count" -gt 0 ]]; then
    echo "  ⚠  命中 '$phrase' ($count 次)"
    FORMULAIC_HIT=$((FORMULAIC_HIT + count))
  fi
done
if [[ "$FORMULAIC_HIT" -eq 0 ]]; then
  echo "  ✓ 未命中套路转场词"
else
  echo "  总命中: $FORMULAIC_HIT 次 → WARN"
  WARN_COUNT=$((WARN_COUNT + 1))
fi

# ─────────────────────────────────────────────────────────
# 3. 句长方差(节奏感)
# ─────────────────────────────────────────────────────────
# 按中文句号/问号/感叹号分割,统计句长分布
echo ""
echo "[3/3] 句长节奏扫描"
echo "---"

STATS=$(python3 - "$REPORT" <<'PY'
import sys, re
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# 移除代码块和表格(这些不算散文句)
text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
text = re.sub(r'\|.*?\|', '', text)
text = re.sub(r'^#+.*$', '', text, flags=re.MULTILINE)
text = re.sub(r'^\s*[-*]\s+', '', text, flags=re.MULTILINE)

# 按中文句末标点分割
sentences = re.split(r'[。！？；]', text)
lens = [len(s.strip()) for s in sentences if 5 <= len(s.strip()) <= 300]

if len(lens) < 20:
    print("SKIP|样本太少(<20句)")
    sys.exit(0)

import statistics
mean = statistics.mean(lens)
stdev = statistics.stdev(lens)
cv = stdev / mean if mean > 0 else 0

# 节奏单调阈值: 变异系数 CV < 0.4
verdict = "OK" if cv >= 0.4 else "WARN"

# 长句连续性: 连续 5 个以上 40+ 字句
long_streak = 0
max_long_streak = 0
for l in lens:
    if l >= 40:
        long_streak += 1
        max_long_streak = max(max_long_streak, long_streak)
    else:
        long_streak = 0

print(f"{verdict}|句数 {len(lens)}|平均 {mean:.1f}|标准差 {stdev:.1f}|变异系数 {cv:.2f}|连续长句 {max_long_streak}")
PY
)

VERDICT="${STATS%%|*}"
DETAILS="${STATS#*|}"

echo "  $DETAILS"
case "$VERDICT" in
  OK)
    echo "  ✓ 节奏正常"
    ;;
  WARN)
    echo "  ⚠  节奏单调(变异系数 < 0.4) → WARN"
    WARN_COUNT=$((WARN_COUNT + 1))
    ;;
  SKIP)
    echo "  - 样本不足,跳过"
    ;;
esac

# ─────────────────────────────────────────────────────────
# 总结
# ─────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════"
if [[ "$WARN_COUNT" -eq 0 ]]; then
  echo "  ✓ narrative-discipline: PASS"
else
  echo "  ⚠  narrative-discipline: $WARN_COUNT 类 WARN(不阻断)"
  echo ""
  echo "  WARN 不阻断 commit,但建议在下一轮回写时清理。"
  echo "  详见: .claude/skills/narrative-discipline/SKILL.md"
fi
echo "═══════════════════════════════════════════════════════"

exit 0
