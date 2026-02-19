#!/usr/bin/env python3
"""
AAPL Complete Report Assembly Script
Merges Assembly Parts 1-3 + Expansion A-D into one coherent document.
"""
import re, os, sys

BASE = "/Users/milton/投资大师/.worktrees/生态科技/reports/AAPL"
STAGING = f"{BASE}/staging"
OUTPUT = f"{BASE}/AAPL_Deep_Analysis_Complete_2026-02-19.md"

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

# ── 1. Read all sources ──
print("Reading source files...")
part1 = read(f"{STAGING}/AAPL_Assembly_Part1.md")
part2 = read(f"{STAGING}/AAPL_Assembly_Part2.md")
part3 = read(f"{STAGING}/AAPL_Assembly_Part3.md")
exp_a = read(f"{STAGING}/AAPL_Expansion_A.md")
exp_b = read(f"{STAGING}/AAPL_Expansion_B.md")
exp_c = read(f"{STAGING}/AAPL_Expansion_C.md")
exp_d = read(f"{STAGING}/AAPL_Expansion_D.md")
v2 = read(f"{BASE}/AAPL_Deep_Analysis_v2.0_2026-02-19.md")

# ── 2. Parser: split Assembly by chapter ──
def split_chapters(text):
    """Return [(chapter_num, full_text_with_header), ...] and preamble."""
    lines = text.split('\n')
    chapters = []
    preamble_end = None
    current_num = None
    current_start = None

    for i, line in enumerate(lines):
        m = re.match(r'^## Chapter (\d+):', line)
        if m:
            if current_num is not None:
                chapters.append((current_num, '\n'.join(lines[current_start:i])))
            else:
                preamble_end = i
            current_num = int(m.group(1))
            current_start = i

    # Last chapter
    if current_num is not None:
        chapters.append((current_num, '\n'.join(lines[current_start:])))

    preamble = '\n'.join(lines[:preamble_end]) if preamble_end else ''
    return preamble, chapters

# ── 3. Parser: split Expansion A/B/C sections ──
def split_expansion_abc(text):
    """Extract sections keyed by parent chapter number.
    Expansion A/B/C use headers like: ### 2.7 ... or ### 7.X ...
    """
    lines = text.split('\n')
    sections = {}
    current_key = None
    current_start = None

    for i, line in enumerate(lines):
        m = re.match(r'^### (\d+)[\.\w]', line)
        if m:
            if current_key is not None:
                sections[current_key] = '\n'.join(lines[current_start:i]).rstrip()
            current_key = int(m.group(1))
            current_start = i

    if current_key is not None:
        sections[current_key] = '\n'.join(lines[current_start:]).rstrip()

    return sections

# ── 4. Parser: split Expansion D new chapters ──
def split_expansion_d(text):
    """Extract new chapters like ## Ch16.5: ..."""
    lines = text.split('\n')
    sections = {}
    current_key = None
    current_start = None

    for i, line in enumerate(lines):
        m = re.match(r'^## Ch([\d]+\.[\d]+):', line)
        if m:
            if current_key is not None:
                sections[current_key] = '\n'.join(lines[current_start:i]).rstrip()
            current_key = m.group(1)
            current_start = i

    if current_key is not None:
        sections[current_key] = '\n'.join(lines[current_start:]).rstrip()

    return sections

# ── 5. Parse everything ──
print("Parsing chapter structure...")
preamble1, chapters_1 = split_chapters(part1)
_, chapters_2 = split_chapters(part2)
_, chapters_3 = split_chapters(part3)

all_chapters = chapters_1 + chapters_2 + chapters_3
print(f"  Assembly chapters: {len(all_chapters)} (Ch{all_chapters[0][0]}-Ch{all_chapters[-1][0]})")

# Parse expansion modules
exp_abc = {}
for label, exp_text in [("A", exp_a), ("B", exp_b), ("C", exp_c)]:
    sections = split_expansion_abc(exp_text)
    print(f"  Expansion {label}: {len(sections)} sections → Ch{sorted(sections.keys())}")
    exp_abc.update(sections)

exp_d_chs = split_expansion_d(exp_d)
print(f"  Expansion D: {len(exp_d_chs)} new chapters → {sorted(exp_d_chs.keys())}")

# Expansion D insertion points
exp_d_after = {
    16: ['16.5', '16.7'],
    22: ['22.5'],
    23: ['23.5']
}

# ── 6. Build Protocol Header ──
# Use v2.0's calibrated header (post-red-team numbers) but update for Complete
v2_lines = v2.split('\n')
header_end = 0
for i, line in enumerate(v2_lines):
    if line.startswith('## Ch1:'):
        header_end = i
        break

protocol_header = '\n'.join(v2_lines[:header_end]).rstrip()
# Update version references
protocol_header = protocol_header.replace(
    '# Apple Inc. (AAPL) 深度研究报告 v2.0',
    '# Apple Inc. (AAPL) 深度研究报告'
)

# ── 7. Build Appendices ──
# Extract appendices from v2.0 and update chapter references for Assembly numbering
appendix_start = None
for i, line in enumerate(v2_lines):
    if line.startswith('## 附录A:'):
        appendix_start = i
        break

appendices = '\n'.join(v2_lines[appendix_start:]).rstrip() if appendix_start else ''

# ── 8. Assemble ──
print("\nAssembling complete report...")
output_parts = []

# Protocol Header
output_parts.append(protocol_header)
output_parts.append('')
output_parts.append('---')
output_parts.append('')

# All chapters with expansion insertions
for ch_num, ch_text in all_chapters:
    output_parts.append(ch_text.rstrip())
    output_parts.append('')

    # Append expansion A/B/C depth sections
    if ch_num in exp_abc:
        output_parts.append(exp_abc[ch_num].rstrip())
        output_parts.append('')

    # Insert Expansion D new chapters after this chapter
    if ch_num in exp_d_after:
        for sub_key in exp_d_after[ch_num]:
            if sub_key in exp_d_chs:
                output_parts.append('---')
                output_parts.append('')
                output_parts.append(exp_d_chs[sub_key].rstrip())
                output_parts.append('')

# Appendices
if appendices:
    output_parts.append('---')
    output_parts.append('')
    output_parts.append(appendices)
    output_parts.append('')

# End marker
output_parts.append('---')
output_parts.append('')
output_parts.append('*报告终 | AAPL Deep Analysis Complete | 2026-02-19*')
output_parts.append('')

# ── 9. Write ──
final = '\n'.join(output_parts)
with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(final)

# ── 10. Statistics ──
total_chars = len(final)
total_bytes = len(final.encode('utf-8'))
total_lines = final.count('\n')

# Count chapters (Assembly + Expansion D)
ch_main = len(re.findall(r'^## Chapter \d+:', final, re.MULTILINE))
ch_exp_d = len(re.findall(r'^## Ch\d+\.\d+:', final, re.MULTILINE))
ch_total = ch_main + ch_exp_d

# Count DM anchors
dm_count = len(re.findall(r'\[DM-', final))

# Count Mermaid diagrams
mermaid_count = len(re.findall(r'```mermaid', final))

# Count tables
table_rows = len(re.findall(r'^\|.*\|$', final, re.MULTILINE))

print(f"\n{'='*50}")
print(f"OUTPUT: {OUTPUT}")
print(f"{'='*50}")
print(f"Total characters: {total_chars:,}")
print(f"Total bytes:      {total_bytes:,}")
print(f"Total lines:      {total_lines:,}")
print(f"{'='*50}")
print(f"Chapters:  {ch_main} main + {ch_exp_d} expansion = {ch_total} total")
print(f"DM anchors: {dm_count}")
print(f"Mermaid diagrams: {mermaid_count}")
print(f"Table rows: {table_rows}")
print(f"{'='*50}")

# Target check
target_min, target_max = 350000, 450000
if total_chars < target_min:
    print(f"⚠ BELOW TARGET: {total_chars:,} < {target_min:,} (need +{target_min - total_chars:,})")
elif total_chars > target_max:
    print(f"⚠ ABOVE TARGET: {total_chars:,} > {target_max:,} (over by {total_chars - target_max:,})")
else:
    print(f"✓ IN TARGET RANGE: {target_min:,} ≤ {total_chars:,} ≤ {target_max:,}")

# Sanity checks
print(f"\n{'='*50}")
print("SANITY CHECKS:")
issues = []

# Check for Assembly preamble leakage
if '# AAPL 组装' in final or '# AAPL 扩展模块' in final:
    issues.append("Assembly/Expansion module headers leaked into output")

# Check for placeholder markers
placeholders = re.findall(r'\[PLACEHOLDER\]', final)
if placeholders:
    issues.append(f"{len(placeholders)} [PLACEHOLDER] markers found")

# Check chapter continuity
ch_nums_found = sorted([int(m) for m in re.findall(r'^## Chapter (\d+):', final, re.MULTILINE)])
expected = list(range(1, max(ch_nums_found) + 1)) if ch_nums_found else []
missing = set(expected) - set(ch_nums_found)
if missing:
    issues.append(f"Missing chapters: {sorted(missing)}")

# Check for duplicate chapters
from collections import Counter
ch_counter = Counter(ch_nums_found)
dupes = {k: v for k, v in ch_counter.items() if v > 1}
if dupes:
    issues.append(f"Duplicate chapters: {dupes}")

if issues:
    for issue in issues:
        print(f"  ✗ {issue}")
else:
    print("  ✓ All sanity checks passed")

print(f"\nChapter sequence: {ch_nums_found}")
exp_d_found = sorted(re.findall(r'## Ch([\d.]+):', final))
print(f"Expansion D chapters: {exp_d_found}")
