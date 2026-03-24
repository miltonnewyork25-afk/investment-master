#!/usr/bin/env python3
"""
Integrate Phase 2 and Phase 4 deepening content into Complete v1.0
"""
import re

COMPLETE = '/Users/milton/投资大师/.worktrees/金融基础设施/reports/VRSN/VRSN_Complete_v1.0_2026-03-23.md'
P2_DEEP = '/Users/milton/投资大师/.worktrees/金融基础设施/reports/VRSN/staging/phase2_deepening.md'
P4_DEEP = '/Users/milton/投资大师/.worktrees/金融基础设施/reports/VRSN/staging/phase4_deepening.md'
OUTPUT = '/Users/milton/投资大师/.worktrees/金融基础设施/reports/VRSN/VRSN_Complete_v1.1_2026-03-24.md'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def extract_sections(text, start_marker, end_marker=None):
    """Extract content between markers"""
    start = text.find(start_marker)
    if start == -1:
        return ""
    start += len(start_marker)
    if end_marker:
        end = text.find(end_marker, start)
        if end == -1:
            return text[start:]
        return text[start:end]
    return text[start:]

def prepare_p2_content(p2_text):
    """Prepare Phase 2 deepening content with proper chapter numbering"""
    # Extract from "## 章节A:" to the end (skip header)
    content_start = p2_text.find('## 章节A:')
    if content_start == -1:
        raise ValueError("Cannot find 章节A in P2 deepening")
    content = p2_text[content_start:]

    # Remove the trailing metadata line
    content = re.sub(r'\n\*Phase 2 Deepening.*$', '', content, flags=re.MULTILINE)

    # Rename chapter headers
    replacements = [
        ('## 章节A: 可比公司深度对标 — PE因子分解与定价偏差识别',
         '## 第八C章: 可比公司深度对标 — PE因子分解与定价偏差识别'),
        ('## 章节B: 负权益×资本结构深度诊断',
         '## 第八D章: 负权益×资本结构深度诊断'),
        ('## 章节C: SOTP估值 — .com/.net分离定价',
         '## 第八E章: SOTP估值 — .com/.net分离定价'),
        ('## 章节D: 管理层资本配置×回购择时×分红策略转型',
         '## 第八F章: 资本配置×回购择时×分红策略转型'),
        ('## 四章汇总: 对整体估值的影响',
         '## Phase 2深化汇总: 对整体估值的影响'),
    ]
    for old, new in replacements:
        content = content.replace(old, new)

    # Rename subsection markers (A.1 → 8C.1 etc)
    content = content.replace('### A.', '### 8C.')
    content = content.replace('### B.', '### 8D.')
    content = content.replace('### C.', '### 8E.')
    content = content.replace('### D.', '### 8F.')

    return content.strip()

def prepare_p4_hi_content(p4_text):
    """Prepare Phase 4 chapters H and I"""
    # Extract from "## 章节H:" to just before "## 章节J:"
    h_start = p4_text.find('## 章节H:')
    j_start = p4_text.find('## 章节J:')
    if h_start == -1 or j_start == -1:
        raise ValueError("Cannot find 章节H or 章节J in P4 deepening")

    content = p4_text[h_start:j_start].strip()

    # Rename headers
    content = content.replace(
        '## 章节H: 利率久期分析 — VRSN作为"类债券"资产的精确风险量化',
        '## 第三十一E-B章: 利率久期分析 — VRSN作为"类债券"资产的精确风险量化')
    content = content.replace(
        '## 章节I: 概率校准 — Base Rate分析',
        '## 第三十一E-C章: 概率校准 — Base Rate分析')

    # Rename subsections
    content = content.replace('### H.', '### 31EB.')
    content = content.replace('### I.', '### 31EC.')

    return content.strip()

def prepare_p4_j_content(p4_text):
    """Prepare Phase 4 chapter J and summary"""
    j_start = p4_text.find('## 章节J:')
    if j_start == -1:
        raise ValueError("Cannot find 章节J in P4 deepening")

    content = p4_text[j_start:]

    # Remove trailing metadata
    content = re.sub(r'\n\*Phase 4 深化.*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\n\*评级:.*$', '', content, flags=re.MULTILINE)

    # Rename headers
    content = content.replace(
        '## 章节J: 10年财务模型全路径 — 从$241到$X的完整推演',
        '## 第三十九C章: 10年财务模型全路径 — 从$241到$X的完整推演')
    content = content.replace(
        '## Phase 4深化的整体影响评估',
        '## 第三十九D章: Phase 4深化的整体影响评估')

    # Rename subsections
    content = content.replace('### J.', '### 39C.')

    return content.strip()

def main():
    print("Reading files...")
    complete = read_file(COMPLETE)
    p2_deep = read_file(P2_DEEP)
    p4_deep = read_file(P4_DEEP)

    print(f"Complete: {len(complete)} chars")
    print(f"P2 Deepening: {len(p2_deep)} chars")
    print(f"P4 Deepening: {len(p4_deep)} chars")

    # Prepare content
    p2_content = prepare_p2_content(p2_deep)
    p4_hi_content = prepare_p4_hi_content(p4_deep)
    p4_j_content = prepare_p4_j_content(p4_deep)

    print(f"\nPrepared P2 content: {len(p2_content)} chars")
    print(f"Prepared P4 H+I content: {len(p4_hi_content)} chars")
    print(f"Prepared P4 J content: {len(p4_j_content)} chars")

    # === INSERTION 1: Phase 2 deepening after Ch8B, before Ch9 ===
    marker1 = '## 第九章: 管理层评估 — CEO沉默分析×资本配置哲学'
    if marker1 not in complete:
        # Try alternate
        marker1 = '## 第九章: 管理层评估'
        if marker1 not in complete:
            raise ValueError(f"Cannot find insertion point 1: {marker1}")

    # Find the "---" before Ch9
    idx = complete.find(marker1)
    # Look backwards for the "---" separator
    sep_idx = complete.rfind('---', 0, idx)
    if sep_idx == -1:
        raise ValueError("Cannot find separator before Ch9")

    # Insert after the "---\n\n"
    insert_pos = sep_idx + len('---')
    insertion1 = f"\n\n{p2_content}\n\n---\n"

    complete = complete[:insert_pos] + insertion1 + complete[insert_pos:]
    print(f"\nAfter P2 insertion: {len(complete)} chars (+{len(insertion1)})")

    # === INSERTION 2: Phase 4 H+I after Ch31E, before Ch31F ===
    marker2 = '## 第三十一F章: 报告盲点扫描'
    if marker2 not in complete:
        raise ValueError(f"Cannot find insertion point 2: {marker2}")

    idx2 = complete.find(marker2)
    sep_idx2 = complete.rfind('---', 0, idx2)
    if sep_idx2 == -1:
        raise ValueError("Cannot find separator before Ch31F")

    insert_pos2 = sep_idx2 + len('---')
    insertion2 = f"\n\n{p4_hi_content}\n\n---\n"

    complete = complete[:insert_pos2] + insertion2 + complete[insert_pos2:]
    print(f"After P4 H+I insertion: {len(complete)} chars (+{len(insertion2)})")

    # === INSERTION 3: Phase 4 J after Ch39B, before closing metadata ===
    # Find the last "---" before the closing "*Phase 4 Draft" line
    closing_marker = '*Phase 4 Draft v2.0'
    if closing_marker not in complete:
        # Try alternate
        closing_marker = '*Phase 4'

    idx3 = complete.find(closing_marker)
    if idx3 == -1:
        # Insert before end
        idx3 = len(complete)

    sep_idx3 = complete.rfind('---', 0, idx3)
    if sep_idx3 == -1:
        sep_idx3 = idx3

    insert_pos3 = sep_idx3 + len('---')
    insertion3 = f"\n\n{p4_j_content}\n\n---\n"

    complete = complete[:insert_pos3] + insertion3 + complete[insert_pos3:]
    print(f"After P4 J insertion: {len(complete)} chars (+{len(insertion3)})")

    # === Update report metadata ===
    # Update version in header
    complete = complete.replace(
        '> **报告日期**: 2026-03-23 | **分析价格**: $240.78 | **框架**: v19.6 | **行业**: 金融基础设施',
        '> **报告日期**: 2026-03-24 | **分析价格**: $240.78 | **框架**: v19.6 | **行业**: 金融基础设施')

    # Update closing metadata
    complete = complete.replace(
        '*Phase 4 Draft v2.0 | 2026-03-23',
        '*Phase 4 Draft v2.1 | 2026-03-24')

    # Write output
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(complete)

    print(f"\n=== DONE ===")
    print(f"Output: {OUTPUT}")
    print(f"Total chars: {len(complete)}")
    print(f"Added: {len(complete) - len(read_file(COMPLETE))} chars")

    # Quality checks
    dm_count = len(re.findall(r'\[DM-', complete))
    mermaid_count = len(re.findall(r'```mermaid', complete))
    causal_count = len(re.findall(r'因为|因此|这意味着|这解释了', complete))
    chars = len(complete)

    print(f"\n=== Quality Metrics ===")
    print(f"Total chars: {chars}")
    print(f"DM references: {dm_count}")
    print(f"DM density: {dm_count / (chars/1000):.2f}/千字")
    print(f"Mermaid diagrams: {mermaid_count}")
    print(f"Causal markers: {causal_count}")
    print(f"Causal density: {causal_count / (chars/10000):.2f}/万字")

    if chars >= 270000:
        print(f"\n✅ G1 PASS: {chars} >= 270K")
    else:
        print(f"\n⚠️ G1 still FAIL: {chars} < 270K (gap: {270000 - chars})")

if __name__ == '__main__':
    main()
