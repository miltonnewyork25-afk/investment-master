---
name: paradigm-shift-company-analyzer
description: Use when analyzing a company whose AI, workflow, execution rights, responsibility boundary, charging unit, value capture, or platform layer (API/MCP/Marketplace) may be changing.
---

# Paradigm Shift Company Analyzer v0.4

## Overview

Use this skill to analyze a company through three layers:

```text
Layer 0: State-Change Control × Value Capture v0.4
  14 modules + 7 hard gates + 12 consistency checks + 100-pt score + 13 prototypes (incl. Split Entity, Platform Migration Candidate)

Layer 1: Paradigm Shift Framework v1.1
  I1-I8 scoring, BSM, charging-unit ladder, AI Asymmetry, gates

Layer 2: Investment Judgment
  Main contradiction / business scenario / strongest bear case / valuation bridge / kill switches / 4-8 quarter monitoring
```

**Master thesis (v0.4 主钉子句)**:
> AI 功能强, 不等于 AI 第二曲线强。只有当状态变化能被验证、归因、写回、回滚、收费, AI 才从"聪明功能"变成投资意义上的第二曲线。

## Load References In Order

1. [framework_v0.4_consolidated.md](../../framework_v0.4_consolidated.md) — primary Layer 0 framework (production)
2. [analysis_template_v0.4.md](../../analysis_template_v0.4.md) — primary working template
3. [prototypes_library_v1.2.md](../../prototypes_library_v1.2.md) — 13 prototypes (含 P-12 Split Entity, P-13 Platform Migration Candidate)
4. [framework_v1.1.md](../../framework_v1.1.md) — Layer 1 scoring
5. [quick_reference.md](./quick_reference.md) — compact checklist

v0.3 / v0.2 / v0.1 / v2.0 文件仅作历史比较, 不是 production。

## Mandatory Prompt Constraints (v0.4 — 5 条)

Before analysis, enforce:

1. If the company cannot be expressed as `object: old state -> new state`, stop.
2. **If the company has ≥3 divergent state changes with M11/M12/M13 differing by ≥1 tier across business lines, force SOTP — do not score as a single entity** (P-12 Split Entity 强制规则)。
3. Do not confuse content generation with business-state rewriting.
4. Do not confuse data with state variables or control variables.
5. Do not claim TAM rewrite without payment or budget-migration evidence (P2+).

## Operating Sequence

### Stage A — Layer 0 v0.4 (M1-M14)

Run all 14 modules before any I1-I8 scoring:

1. M1 Core State Change — hard stop if unclear; **Split-Entity check (强制 SOTP)**
2. M2 State-Change Quality and Clock Speed — **行业基准参考线 + R-CLOCK / R-CLOCK-STRONG 检查**
3. M3 Data to State Variable
4. M4 Semantic Authority
5. M5 Write Rights and Write Depth (D1-D5)
6. M6 Closed-Loop Control (7 layers)
7. M7 AI Second-Curve Reality (L1-L6, R-CLOCK-STRONG / R-LEAK4 cap)
8. M8 Economic Migration (P0-P4, **detail 格式: 整体 P / 局部 P / AI 单独 P**)
9. M9 Complexity Quality and Unit Economics (R-UNIT)
10. M10 Competitive Capture (5 gates)
11. M11 Responsibility Transferability (Tier 1-5, **Tier 5 6 项最低门槛**)
12. M12 Causal Attribution (R-CAUSAL)
13. M13 Value Capture (**4 路泄漏强制输出 + R-LEAK4**)
14. **M14 Platform Layer (NEW v0.4) — API/MCP/Marketplace + R-ABSTRACT 风险**

Each module must output:

```text
Judgment: Yes / Partial / No
Evidence (附 E0-E5 等级):
Counter-evidence:
Investment implication:
4-8 quarter monitor:
```

### Stage B — Consistency Checks (C1-C12)

Run all 12 consistency checks before scoring Layer 1. Any contradiction lowers the score (按 v0.4 失败权重表):

| 失败数 | 影响 |
|---|---|
| 0 | 优秀 |
| 1 | -2 分 |
| 2 | -5 分 |
| 3 | -10 + 评级降一档 |
| 4-5 | -15 + 评级降两档 + 强制 SOTP |
| 6+ | 整体作废, 强制按业务线拆 |

Special weights: C7 / C10 / **C12 (NEW v0.4)** 失败各加扣 -2 至 -3。

Key blockers:

- M5 < D2 → C 类 cap (G3)
- M6 ≤ 3/7 → AI level cap at L3 (C4)
- M11 < Tier 4 + M12 strong → outcome pricing 失败 (C7)
- M12 strong + M13 weak → 价值不能捕获 (C8)
- **M2 slow + M13 4 路泄漏 ≥3 高 → 加倍下行 (C12, NEW v0.4)**

### Stage C — Layer 1 v1.1

Score I1-I8 only after Layer 0:

| Invariant | Layer 0 Source |
|---|---|
| I1 | M5 / M8 / M11 / M12 |
| I2 | M3 / M4 |
| I3 | M5 / M6 |
| I4 | M11 / M12 |
| I5 | M2 / M8 |
| I6 | M9 / M13 |
| I7 | M6 / M11 |
| I8 | M4 / M5 / M10 |
| AI Asymmetry | M7 / M9 / M13 |
| Stack Coherence | M10 / M11 |
| **Platform Optionality (NEW v0.4)** | **M14** |

Then run BSM, four gates, AI Asymmetry, Stack Coherence, Burden, and anchor comparisons.

### Stage D — Layer 2 (强制输出结构)

Output (every report MUST include):

1. **主矛盾句 (Main Contradiction, 一句话)**
2. **业务场景叙事 (Business Scenario, 1-2 段, 用客户角色减抽象词)**
3. **主图压缩 (One-Line Summary)**
4. **Layer 0 100-point diagnostic score + M14 期权加分** (out of 100 + 5 期权)
5. **Layer 0 subtype** (13 候选: Value-Capturing Operator, Liability-Backed Operator, Attribution-Backed Vendor, Accountability-Thin Operator, Semantic Layer Definer, Closed-Loop Operator, State Machine Owner, Pricing-Stuck Vendor, Burden-Trapped SaaS, Stack Coherence Winner, Mixed Profile, **Split Entity (P-12)**, **Platform Migration Candidate (P-13)**)
6. **Alpha type** from v1.1
7. **Valuation lens** (要求估值语言分叉, e.g. PE 倍数 / SOTP / 平台期权打折)
8. **反方最强论证 (Strongest Bear Case)** — 一句话 + 5 条逻辑链 (NEW v0.4 强制)
9. **估值与预期差 (Valuation Bridge)** — 4 列: 市场 price-in / 报告分歧 / 上修触发 / 下修触发 (NEW v0.4 强制)
10. **At least 3 kill switches + 2 yellow + 1 上修触发**
11. **4-8 quarter monitoring indicators** across product / commercialization / cost / moat (≥6 个, 附 E 等级)
12. **Final 10-item output** (含 P0-P4 detail 格式 + L1-L6 + Tier 1-5 + D1-D5 + M14 评分)

### Stage E — 多公司对比 (横向报告强制)

If ≥3 companies, must output **三母表**:

1. Mother Table 1: 核心对比 (M1-M14 关键打分跨公司)
2. Mother Table 2: 证据等级 (P0-P4 + E0-E5 覆盖度)
3. Mother Table 3: 投资动作 (Bull / Bear / 上修 / 下修)

## Common Mistakes

- Scoring I1-I8 before identifying state change.
- Treating AI features or demos as write-enabled execution.
- Treating proprietary data as a moat when it cannot trigger actions or receive feedback.
- Claiming TAM rewrite on P0-P1 narrative evidence.
- Ignoring causal attribution when discussing outcome pricing.
- Ignoring value leakage to customers, model providers, services firms, or AI-native startups.
- Calling complexity a moat without gross-margin / services-mix / cycle-time / unit-cost evidence.
- **(NEW v0.4)** Scoring a Split Entity as a single number — must SOTP.
- **(NEW v0.4)** Ignoring platform layer (API/MCP/Marketplace) as either protection or被抽象 risk.
- **(NEW v0.4)** Using overall P3 to mask the fact that AI agent revenue is still P1-P2.
- **(NEW v0.4)** Treating "AI 节省时间" as automatic "公司能涨价" — must pass three filters: 能验证 / 能归因 / 能捕获价值.

## Quick Sentence (强制主图压缩格式)

```text
{Company} is not just {old product label}; it is trying to control {object: old state -> new state},
with {write depth: D1-D5}, {responsibility tier: 1-5}, {attribution strength: 弱/中/强}, {value-capture quality: 弱/中/强}, and {platform layer: M14 0-5}.
```

## v0.4 Anchors (4-Company Pressure-Test Calibration)

| Company | 100-pt | M14 期权 | Subtype | E5 缺口 |
|---|---:|---:|---|---|
| INTU | 85 | +1 | P-1 Value-Capturing + P-5 Liability-Backed + P-10 Stack Coherence | 缺第三方 SMB 渗透调研 |
| PTC | 74 | +1 | P-2 Closed-Loop + P-3 State Machine + P-4 Semantic | 缺 PLM 大客户战第三方 |
| ADSK | 67 | +3 | P-4 Semantic + **P-13 Platform Migration** | 缺 APS Marketplace 客户案例 |
| ADBE | 59 | +2 | **P-12 Split Entity** (强制 SOTP) | 缺 enterprise GenStudio 第三方 |
