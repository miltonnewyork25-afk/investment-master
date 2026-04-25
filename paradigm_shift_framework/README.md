# Paradigm Shift Analysis Framework

> Current production package: **v0.4 (Layer 0) + v1.1 (Layer 1) + Investment Judgment (Layer 2)**
> Scope: reusable company analysis framework for AI / agent / workflow-shift / software paradigm-shift research
> Design goal: strong enough to discriminate between companies, simple enough to execute repeatedly

---

## Current Architecture (v0.4)

```text
Layer 2: Investment Judgment
  主矛盾 + 业务场景 + Alpha Type + 估值桥 + 反方最强论证 + Kill Switches + 4-8Q 监控
    ↑
Layer 1: Paradigm Shift Framework v1.1
  I1-I8 + BSM + Charging Unit Ladder + AI Asymmetry + Stack Coherence + Platform Optionality
    ↑
Layer 0: State-Change Control × Value Capture v0.4
  14 modules + 7 hard gates + 12 consistency checks + 100-pt + 13 prototypes
  (含 P-12 Split Entity, P-13 Platform Migration Candidate)
```

**Layer 0 is mandatory.** 先识别 state change。如果不能用 `object: old state -> new state` 表达, 不要进入 Layer 1。

**Split-Entity rule (v0.4 强制)**: 如果公司在不同业务线有 ≥3 个发散的 M11/M12/M13, 强制 SOTP, 不允许整体打分。

---

## Master Thesis (v0.4 主钉子句)

> **AI 功能强, 不等于 AI 第二曲线强。只有当状态变化能被验证、归因、写回、回滚、收费, AI 才从"聪明功能"变成投资意义上的第二曲线。**

Compressed:

> Whoever can prove it can change high-value states cheaply, auditably, attributably, responsibly, profitably, and with platform optionality controls the new AI-era profit pool.

---

## Current Entry Points

| File | Purpose | Status |
|---|---|---|
| [framework_v0.4_consolidated.md](./framework_v0.4_consolidated.md) | **Primary Layer 0 framework v0.4** — state-change control + value capture + platform layer + 14 modules + 12 consistency + 13 prototypes | **Production** |
| [analysis_template_v0.4.md](./analysis_template_v0.4.md) | **Primary working template v0.4** — 13 stages + Mother Tables + Mandatory Output Structure | **Production** |
| [prototypes_library_v1.2.md](./prototypes_library_v1.2.md) | **13 Alpha Type prototypes v1.2** — adds P-12 Split Entity, P-13 Platform Migration Candidate | **Production** |
| [framework_v1.1.md](./framework_v1.1.md) | Layer 1: 8 invariants scoring system | Production |
| [skill/paradigm-shift-company-analyzer/SKILL.md](./skill/paradigm-shift-company-analyzer/SKILL.md) | Reusable skill entry point (v0.4) | Production |
| [skill/paradigm-shift-company-analyzer/quick_reference.md](./skill/paradigm-shift-company-analyzer/quick_reference.md) | Compact execution checklist (v0.4) | Production |

Historical / reference files (kept for audit, not production):

| File | Status |
|---|---|
| [framework_v0.3_state_change_value_capture.md](./framework_v0.3_state_change_value_capture.md) | v0.3, superseded by v0.4 |
| [analysis_template_v0.3.md](./analysis_template_v0.3.md) | v0.3 template, superseded |
| [prototypes_library_v1.1.md](./prototypes_library_v1.1.md) | v1.1 prototypes, superseded by v1.2 |
| [framework_v0.1_state_change_control.md](./framework_v0.1_state_change_control.md) | v0.1 historical compatibility |
| [analysis_template_v0.1.md](./analysis_template_v0.1.md) | v0.1 historical |
| [framework_v2.0_deep_diagnostic.md](./framework_v2.0_deep_diagnostic.md) | Extended deep-diagnostic reference; not production |
| [analysis_template_v2.0.md](./analysis_template_v2.0.md) | Extended reference template; not production |
| [framework_v0.9.2.md](./framework_v0.9.2.md) | Historical working draft |
| [retrospective_8_companies.md](./retrospective_8_companies.md) | Historical pressure-test record |

---

## v0.4 Key Additions

| Addition | Why It Matters |
|---|---|
| **M14 Platform Layer** | 评估 API / MCP / Marketplace 是否形成平台期权, 或是否导致公司被抽象成后端 data provider |
| **C12 (M2 + M13)** | 慢时钟 × 多路价值泄漏 = 加倍下行, 防止单项扣分不足 |
| **P-12 Split Entity** | 当公司不同业务线 M11/M12/M13 明显发散时, 强制 SOTP, 不允许整体打分掩盖差异 |
| **P-13 Platform Migration Candidate** | 将平台路径作为单独期权, 同时检查 R-ABSTRACT 后端化风险 |
| **R-CLOCK-STRONG** | 反馈 ≥1 年时, AI 第二曲线分上限 3.0/5 |
| **R-LEAK4** | 4 路泄漏 ≥3 高时, AI 第二曲线分上限 3.0/5 |
| **R-ABSTRACT** | 第三方 agent 通过 API 完成 80%+ 用户操作时, 检查 UI / seat 经济被抽象风险 |
| **Tier 5 最低门槛** | 明确责任承接升级到 risk-sharing 的硬条件 |
| **行业时钟速度参考线** | M2 fast / mid / slow 不再纯定性 |
| **评分锚点 (Scoring Rubric)** | 0-15 / 0-20 等级 × 6 类可复算 |
| **证据等级 E0-E5** | 区分推理、管理层叙事、产品、客户案例、财报和第三方验证 |
| **一致性失败权重分级** | 失败 1 个和失败 5 个不能同等扣分 |
| **强制输出: 主矛盾 + 业务场景 + 反方最强 + 估值桥 + 三母表** | 把结构质量接到投资动作 |
| **M8 detail 格式** | 用 "整体 P3, 局部 P4 潜力, AI agent 仍 P1-P2" 防止整体 P 档掩盖 AI 单独证据不足 |

---

## v0.4 Control Chain (含 Platform Layer)

```text
Reality signal
→ State variable
→ Semantic object
→ Decision rule
→ Action
→ System write-back
→ Result verification
→ Causal attribution
→ Error correction / rollback
→ Responsibility transfer
→ Charging-unit migration
→ Value capture
→ Platform layer (NEW v0.4)         ← 第三方 agent API/MCP 调用
→ Profit-pool control
```

---

## Recommended Workflow

```text
1. Run Layer 0 v0.4 first
   - Mandatory 5 prompt constraints check (含 Split-Entity check)
   - 主矛盾 + 业务场景 + 主图压缩
   - M1-M14 modules + R-rules check
   - 100-pt + M14 期权加分
   - C1-C12 一致性 (含 v0.4 失败权重)

2. Run Layer 1 v1.1 scoring
   - Prototype match (13 候选)
   - BSM
   - I1-I8 + Platform Optionality
   - 4 gates + overlays

3. Run Layer 2 v0.4 (强制结构)
   - Subtype + Alpha type
   - Valuation lens (估值语言分叉)
   - 反方最强论证 (一句话 + 5 条逻辑链)
   - 估值与预期差 (4 列)
   - Kill switches (≥3 红 + ≥2 黄 + ≥1 上修)
   - 4-8 季度监控 (≥6 个 + E 等级)
   - Final 10-item output

4. 横向对比时:
   - 三母表: 核心对比 / 证据等级 / 投资动作
```

---

## Layer 0 Hard Gates (v0.4 — 7 项不变, 但加 R-rules)

| Gate | Rule |
|---|---|
| G1 State clarity | 不通过 → A 类 0 + 整体停 |
| G2 Verification | M3 ground truth, 否则 cap data at state variable |
| G3 Write depth | <D2 → C 类 M5 cap at 4/8 |
| G4 Causal attribution | 没归因 → outcome pricing 不能算 |
| G5 Responsibility transfer | 没 transferability → risk/outcome budget 上限 |
| G6 Payment evidence | <P2 → optionality only |
| G7 Unit economics | unit cost 不降 → AI feature, 不是第二曲线 |

加上 R-rules: R-CLOCK / R-CLOCK-STRONG / R-LEAK4 / R-ABSTRACT / R-VERIFY / R-ROLLBACK / R-UNIT / R-CAUSAL / R-CAPTURE。

---

## Layer 0 to Layer 1 Bridge (v0.4)

| Layer 1 | Layer 0 来源 |
|---|---|
| I1 Revenue unit | M5 + M8 + M11 + M12 |
| I2 Decision context | M3 + M4 |
| I3 Execution right | M5 + M6 |
| I4 Authority | M11 + M12 |
| I5 Budget ownership | M2 + M8 |
| I6 Margin retention | M9 + M13 |
| I7 Exception absorption | M6 + M11 |
| I8 Entry and routing | M4 + M5 + M10 |
| AI Asymmetry | M7 + M9 + M13 |
| Stack Coherence | M10 + M11 |
| **Platform Optionality (NEW)** | **M14** |

每个 I1-I8 评分必须引用 Layer 0 来源。

---

## v0.4 Calibration Anchors

| Company | 100-pt | M14 | Subtype | C 失败 | 关键发现 |
|---|---:|---:|---|---:|---|
| INTU | 85 | +1 | P-1 + P-5 + P-10 | 0 | 罕见五闸门全过 |
| PTC | 74 | +1 | P-2 + P-3 + P-4 | 0 | 工业 lifecycle 状态机最深 + BMW Codebeamer |
| ADSK | 67 | +3 | P-4 + **P-13** | 2 (含 C10) | 慢时钟 + APS 平台期权双刃 |
| ADBE | 59 | +2 | **P-12 (SOTP)** | 3 (C7 + C12 警告) | 必须分业务线打分 |

---

## Upgrade Discipline (v0.4 保留)

Safe upgrades:
- Add a hard gate only when it prevents a repeatable misclassification.
- Add a prototype only after at least two company tests show the pattern is reusable.
- Keep Layer 1 v1.1 scores comparable across reports.

Unsafe upgrades:
- Adding dimensions because one company feels awkward.
- Letting management narrative substitute for payment evidence.
- Treating generated content as state rewriting.
- Treating value creation as value capture.

---

## Future Candidate Improvements

1. **E5 第三方证据集成**: v0.4 强制证据等级标注, 但获取 E5 (Gartner / Forrester / 客户论坛 / 招聘数据) 仍需独立 workflow
2. **Tier 5 实证锚定**: v0.4 给了 6 项最低门槛, 但还没有真锚 (四家都未达到 Tier 5)
3. **行业时钟速度的精确边界**: 反馈周期 1 季度 vs 1 年的边界仍偏粗
4. **C12 失败时具体下行幅度**: 加倍下行的具体百分比缺标准
5. **Platform Migration Candidate (P-13) 估值期权打折公式**: 期权值与 M14 评分 + P 档位的具体关系仍偏定性
