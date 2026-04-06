#!/bin/bash
# skill_sentinel.sh — 独立Skill应用验证哨兵 v1.0
#
# 用法:
#   bash scripts/skill_sentinel.sh <TICKER> [PHASE]
#   bash scripts/skill_sentinel.sh LITE P2
#   bash scripts/skill_sentinel.sh LITE all  # 检查所有Phase
#
# 退出码:
#   0 = 全部通过 或 仅有WARN
#   1 = HIGH级缺失 (需要修复)
#   2 = CRITICAL级缺失 (BLOCK, 不可继续)
#
# 检测逻辑:
#   1. 读取 .claude/skill_manifest.yaml
#   2. 对每个skill, 判断是否在当前phase触发
#   3. 如果触发, 在staging文件(或Complete)中grep expected_artifacts
#   4. 任意一个artifact匹配=通过; 全部不匹配=缺失
#   5. 按severity汇总结果

set -uo pipefail

TICKER="${1:?用法: bash skill_sentinel.sh <TICKER> [PHASE=all]}"
PHASE="${2:-all}"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="$REPO_ROOT/.claude/skill_manifest.yaml"
STAGING_DIR="$REPO_ROOT/reports/$TICKER/staging"
COMPLETE_PATTERN="$REPO_ROOT/reports/$TICKER/${TICKER}_Complete_v*.md"

if [ ! -f "$MANIFEST" ]; then
    echo "ERROR: 清单不存在: $MANIFEST" >&2
    exit 3
fi

if [ ! -d "$STAGING_DIR" ]; then
    echo "ERROR: staging目录不存在: $STAGING_DIR" >&2
    exit 3
fi

# 用python做yaml解析+regex检查 (bash yaml太痛苦, 中文regex也需要python)
python3 - <<PYEOF
import os
import re
import sys
import glob

try:
    import yaml
except ImportError:
    print("ERROR: 缺少pyyaml. 安装: pip3 install pyyaml", file=sys.stderr)
    sys.exit(3)

MANIFEST = "$MANIFEST"
STAGING_DIR = "$STAGING_DIR"
TICKER = "$TICKER"
PHASE = "$PHASE"
REPO_ROOT = "$REPO_ROOT"

# ANSI colors
RED = "\033[0;31m"
YELLOW = "\033[1;33m"
GREEN = "\033[0;32m"
CYAN = "\033[0;36m"
NC = "\033[0m"

with open(MANIFEST, 'r') as f:
    manifest = yaml.safe_load(f)

# 收集所有staging文件内容 (合并成一个大字符串)
staging_files = sorted(glob.glob(os.path.join(STAGING_DIR, "*.md")))
if not staging_files:
    print(f"WARNING: {STAGING_DIR} 无staging文件", file=sys.stderr)

# 按phase分组staging内容
phase_content = {}
all_content = ""
for fp in staging_files:
    with open(fp, 'r') as f:
        content = f.read()
    all_content += content + "\n"
    # 从文件名提取phase
    fname = os.path.basename(fp)
    # 匹配 P0, P1, P1.5, P2 等
    m = re.search(r'P(\d+(?:\.\d+)?)', fname)
    if m:
        p_key = f"P{m.group(1)}"
        phase_content.setdefault(p_key, "")
        phase_content[p_key] += content + "\n"

# 也包含Complete文件 (用于Kill Switch等跨Phase artifact)
complete_files = sorted(glob.glob(os.path.join(REPO_ROOT, "reports", TICKER, f"{TICKER}_Complete_v*.md")))
for fp in complete_files:
    if "_seamless" in fp:
        continue
    with open(fp, 'r') as f:
        all_content += f.read() + "\n"

def check_trigger(skill, phase_content):
    """判断skill是否应该在当前上下文触发"""
    trigger = skill.get('trigger', 'always')

    if trigger == 'always':
        return True, "always"

    if isinstance(trigger, dict):
        # grep_phase0_staging: 在P0 staging中找关键词
        if 'grep_phase0_staging' in trigger:
            p0_text = phase_content.get('P0', '') + phase_content.get('P0.5', '')
            for kw in trigger['grep_phase0_staging']:
                if re.search(kw, p0_text, re.IGNORECASE):
                    return True, f"P0含关键词 '{kw}'"
            return False, "P0未含触发关键词"

        # industries: 检查行业 (需要从某处读出, 暂时假设触发)
        if 'industries' in trigger:
            # TODO: 从checkpoint读取industry
            return True, "industry trigger (默认启用)"

    return True, "default"

def check_artifact(skill, search_text):
    """在文本中检查skill的artifact是否存在"""
    patterns = skill.get('expected_artifacts', [])
    min_required = skill.get('min_matches_required', 1)

    matches = []
    for pat in patterns:
        found = re.findall(pat, search_text, re.IGNORECASE | re.UNICODE)
        if found:
            matches.append((pat, len(found)))

    total_unique_patterns_matched = len(matches)

    if total_unique_patterns_matched >= min_required:
        return True, matches
    return False, matches

# 主检查循环
results = {'critical': [], 'high': [], 'medium': [], 'low': [], 'pass': []}

for skill in manifest.get('skills', []):
    skill_id = skill['id']
    name = skill['name']
    severity = skill.get('severity', 'medium')
    required_phases = skill.get('required_phases', [])

    # 如果用户指定了具体phase, 只检查包含该phase的skill
    if PHASE != 'all':
        phase_key = PHASE.upper() if PHASE.upper().startswith('P') else f"P{PHASE}"
        if phase_key not in required_phases:
            continue

    # 判断触发
    triggered, reason = check_trigger(skill, phase_content)
    if not triggered:
        continue

    # 检查artifact
    passed, matches = check_artifact(skill, all_content)

    if passed:
        results['pass'].append((skill_id, name, matches))
    else:
        results[severity].append((skill_id, name, matches, reason))

# 输出报告
print(f"{CYAN}{'='*60}{NC}")
print(f"{CYAN}Skill Sentinel v1.0 — {TICKER} / Phase: {PHASE}{NC}")
print(f"{CYAN}{'='*60}{NC}")
print()

passed_count = len(results['pass'])
total = passed_count + len(results['critical']) + len(results['high']) + len(results['medium']) + len(results['low'])
print(f"检查技能数: {total}")
print(f"通过: {passed_count}/{total}")
print()

if results['pass']:
    print(f"{GREEN}✓ 通过的Skill:{NC}")
    for sid, name, matches in results['pass']:
        match_summary = ", ".join([f"{p[:30]}...×{c}" if len(p)>30 else f"{p}×{c}" for p,c in matches[:2]])
        print(f"  ✓ {name}")
    print()

if results['critical']:
    print(f"{RED}✗ CRITICAL 缺失 (阻断级):{NC}")
    for sid, name, matches, reason in results['critical']:
        print(f"  ✗ {name}")
        print(f"    触发原因: {reason}")
        print(f"    rationale: {next((s['rationale'] for s in manifest['skills'] if s['id']==sid), '')}")
    print()

if results['high']:
    print(f"{YELLOW}⚠ HIGH 缺失 (警告响亮):{NC}")
    for sid, name, matches, reason in results['high']:
        print(f"  ⚠ {name}")
        print(f"    rationale: {next((s['rationale'] for s in manifest['skills'] if s['id']==sid), '')}")
    print()

if results['medium']:
    print(f"{YELLOW}· MEDIUM 缺失:{NC}")
    for sid, name, matches, reason in results['medium']:
        print(f"  · {name}")
    print()

# 决定退出码
if results['critical']:
    print(f"{RED}=== 结论: CRITICAL级缺失, 建议阻断 (exit 2) ==={NC}")
    sys.exit(2)
elif results['high']:
    print(f"{YELLOW}=== 结论: HIGH级缺失, 建议修复 (exit 1) ==={NC}")
    sys.exit(1)
else:
    print(f"{GREEN}=== 结论: 全部通过 或 仅MEDIUM/LOW警告 (exit 0) ==={NC}")
    sys.exit(0)
PYEOF
