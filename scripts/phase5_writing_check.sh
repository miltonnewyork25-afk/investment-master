#!/bin/bash
# phase5_writing_check.sh — Sprint 7 减法规则代码级验证
# 用法: bash scripts/phase5_writing_check.sh <Complete_file.md>
#
# 检查5条减法规则 + 范畴重分配 + 内部术语泄漏
# 返回码:
#   0 = 全部通过 或 仅MEDIUM警告
#   1 = HIGH级违反 (警告响亮但不阻断)
#   2 = CRITICAL级违反 (阻断 — 内部术语严重泄漏)

set -uo pipefail

FILE="${1:?用法: bash phase5_writing_check.sh <Complete_file.md>}"

if [ ! -f "$FILE" ]; then
    echo "ERROR: 文件不存在: $FILE" >&2
    exit 3
fi

# 用python做regex+unicode处理
python3 - "$FILE" <<'PYEOF'
import re
import sys

FILE = sys.argv[1]

RED = "\033[0;31m"
YELLOW = "\033[1;33m"
GREEN = "\033[0;32m"
CYAN = "\033[0;36m"
NC = "\033[0m"

with open(FILE, 'r') as f:
    content = f.read()

total_chars = len(content)

# 跳过非Complete文件
if '_seamless' in FILE:
    print(f"{CYAN}[跳过seamless版本]{NC}", file=sys.stderr)
    sys.exit(0)

print(f"{CYAN}=== Phase 5 写作质量检查 ==={NC}", file=sys.stderr)
print(f"文件: {FILE.split('/')[-1]} ({total_chars:,} 字符)", file=sys.stderr)
print("", file=sys.stderr)

# 检查项
critical_fails = 0
high_fails = 0
medium_fails = 0
passes = 0

# ========== CRITICAL: 内部术语泄漏 ==========
dm_anchors = len(re.findall(r'\[DM-[A-Z]+-[0-9]+\]', content))
cq_numbered = len(re.findall(r'(?<![A-Z])CQ-?[0-9]+', content))
ks_numbered = len(re.findall(r'(?<![A-Za-z0-9])KS-?[0-9]+', content))
phase_headings = len(re.findall(r'(?<![A-Za-z])P[0-5](?![A-Za-z0-9])', content))
kill_switch_raw = len(re.findall(r'Kill Switch', content))

term_leak_total = dm_anchors + cq_numbered + ks_numbered + phase_headings + kill_switch_raw

if term_leak_total > 50:
    print(f"{RED}✗ CRITICAL: 内部术语严重泄漏 ({term_leak_total}处){NC}", file=sys.stderr)
    print(f"    DM锚点: {dm_anchors} / CQ: {cq_numbered} / KS: {ks_numbered} / P标签: {phase_headings} / Kill Switch: {kill_switch_raw}", file=sys.stderr)
    print(f"    → 先运行 scripts/seamless_translator.sh 生成无痕化版本", file=sys.stderr)
    critical_fails += 1
elif term_leak_total > 10:
    print(f"{YELLOW}⚠ HIGH: 内部术语部分泄漏 ({term_leak_total}处){NC}", file=sys.stderr)
    high_fails += 1
else:
    print(f"{GREEN}✓ 内部术语: {term_leak_total}处 (可接受){NC}", file=sys.stderr)
    passes += 1

# ========== HIGH: 5条减法规则 ==========

# 减法1: hedging词
hedging_patterns = r'可能|或许|某种程度|一定程度|大概率|小概率|有待观察|值得关注'
hedging = len(re.findall(hedging_patterns, content))
hedging_density = hedging / (total_chars / 1000)  # per 1K chars
if hedging > 30 and hedging_density > 0.15:
    print(f"{YELLOW}⚠ HIGH: 减法1 hedging词泛滥 ({hedging}处, 密度{hedging_density:.2f}/千字){NC}", file=sys.stderr)
    high_fails += 1
elif hedging > 15:
    print(f"{YELLOW}· MEDIUM: hedging偏多 ({hedging}处){NC}", file=sys.stderr)
    medium_fails += 1
else:
    print(f"{GREEN}✓ 减法1 hedging: {hedging}处{NC}", file=sys.stderr)
    passes += 1

# 减法2: 箭头链3+
arrow_chains = len(re.findall(r'→\s*[^→\n]{0,40}→\s*[^→\n]{0,40}→', content))
if arrow_chains > 5:
    print(f"{YELLOW}⚠ HIGH: 减法2 箭头链过多 ({arrow_chains}处){NC}", file=sys.stderr)
    high_fails += 1
elif arrow_chains > 2:
    print(f"{YELLOW}· MEDIUM: 箭头链略多 ({arrow_chains}处){NC}", file=sys.stderr)
    medium_fails += 1
else:
    print(f"{GREEN}✓ 减法2 箭头链: {arrow_chains}处{NC}", file=sys.stderr)
    passes += 1

# 减法3: 审美形容词
aesthetic = len(re.findall(r'漂亮|优雅|干净利落|完美|出色|卓越|精彩', content))
if aesthetic > 5:
    print(f"{YELLOW}⚠ HIGH: 减法3 审美形容词过多 ({aesthetic}处){NC}", file=sys.stderr)
    high_fails += 1
else:
    print(f"{GREEN}✓ 减法3 审美形容词: {aesthetic}处{NC}", file=sys.stderr)
    passes += 1

# 减法4: voice
bad_voice = len(re.findall(r'本报告|笔者', content))
if bad_voice > 0:
    print(f"{YELLOW}⚠ HIGH: 减法4 voice残留 '本报告/笔者' ({bad_voice}处){NC}", file=sys.stderr)
    high_fails += 1
else:
    print(f"{GREEN}✓ 减法4 voice: 无'本报告/笔者'{NC}", file=sys.stderr)
    passes += 1

# 减法5: 范畴重分配 (最少3处)
recat = len(re.findall(r'不是.*?而是', content))
if recat < 3:
    print(f"{YELLOW}⚠ HIGH: 减法5 范畴重分配不足 ({recat}处, 需≥3){NC}", file=sys.stderr)
    high_fails += 1
else:
    print(f"{GREEN}✓ 减法5 范畴重分配: {recat}处{NC}", file=sys.stderr)
    passes += 1

# 孤儿"的" 检查 (voice替换bug)
orphan_de = len(re.findall(r'(^|[。\n])\s*的\S{2,}', content))
if orphan_de > 0:
    print(f"{YELLOW}⚠ HIGH: 孤儿'的X'主语丢失 ({orphan_de}处){NC}", file=sys.stderr)
    high_fails += 1
else:
    print(f"{GREEN}✓ 无孤儿'的X'{NC}", file=sys.stderr)
    passes += 1

# ========== 汇总 ==========
print("", file=sys.stderr)
print(f"{CYAN}=== 汇总 ==={NC}", file=sys.stderr)
print(f"通过: {passes} / CRITICAL: {critical_fails} / HIGH: {high_fails} / MEDIUM: {medium_fails}", file=sys.stderr)

if critical_fails > 0:
    print(f"{RED}=== 结论: CRITICAL违反, 建议阻断 ==={NC}", file=sys.stderr)
    sys.exit(2)
elif high_fails > 0:
    print(f"{YELLOW}=== 结论: HIGH违反{high_fails}条, 建议修复 ==={NC}", file=sys.stderr)
    sys.exit(1)
else:
    print(f"{GREEN}=== 结论: 通过 ==={NC}", file=sys.stderr)
    sys.exit(0)
PYEOF
