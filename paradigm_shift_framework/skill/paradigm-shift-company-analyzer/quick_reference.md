# Quick Reference — v0.4

## Master Thesis (主钉子句)

> AI 功能强, 不等于 AI 第二曲线强。只有当状态变化能被验证、归因、写回、回滚、收费, AI 才从"聪明功能"变成投资意义上的第二曲线。

## Minimal Flow

1. Define `object: old state -> new state`; unclear means stop.
2. **Split-Entity check**: ≥3 业务线 + M11/M12/M13 ≥1 档差异 → 强制 SOTP, 拆子评分。
3. **主矛盾句 + 业务场景叙事 + 主图压缩**.
4. Run Layer 0 **M1-M14** (含新 M14 平台层).
5. Score 100-pt + M14 期权加分 (out of 105).
6. Run **C1-C12** consistency checks (含新 C12 慢时钟+4 路泄漏).
7. Run Layer 1 v1.1: prototype, BSM, I1-I8, gates, overlays.
8. Assign Layer 0 subtype (13 候选, 含 P-12 Split Entity, P-13 Platform Migration Candidate).
9. **反方最强论证 (一句话 + 5 条逻辑链)**.
10. **估值与预期差 (4 列)**.
11. Kill switches + 4-8 季度监控 (≥6 个, 附 E 等级).
12. Final 10-item summary.
13. 横向对比时: 三母表.

## v0.4 Hard Gates (G1-G7)

- G1 State change clear.
- G2 State variables 有 real-world verification.
- G3 Write rights ≥ D2.
- G4 Outcome pricing 需要 causal attribution.
- G5 Risk / outcome budget 需要 responsibility transferability.
- G6 TAM rewrite 需要 P2+ payment evidence.
- G7 AI second curve 需要 improving unit state-change economics.

## v0.4 New R-Rules

- **R-CLOCK**: 反馈 ≥1 季度 → 复利 cap at mixed (M2 vs M6)
- **R-CLOCK-STRONG (NEW)**: 反馈 ≥1 年 → AI 第二曲线分上限 3.0/5
- **R-LEAK4 (NEW)**: 4 路泄漏 ≥3 高 → AI 第二曲线分上限 3.0/5
- **R-ABSTRACT (NEW)**: 第三方 agent 通过 API 完成 80%+ 用户操作 → 沦为后端 data provider 风险
- R-VERIFY: 没 ground truth → cap data at state variable
- R-ROLLBACK: 没 correction + rollback → cap closed-loop at 4/7
- R-UNIT: AI 上线但单位成本不降 → 标 "AI feature, 不是第二曲线"
- R-CAUSAL: 没归因 → 没 outcome pricing
- R-CAPTURE: 创造价值不等于捕获价值

## AI Second-Curve Test (强化版)

Ask:

```text
Can the company change a high-value state
  cheaply (M9 unit cost decline)
  auditably (M11 audit chain)
  attributably (M12 causal)
  responsibly (M11 Tier 4+)
  profitably (M13 value capture)
  AND with platform optionality (M14)?
```

如果 6 项中 ≥4 项 No, 这是 AI enhancement, 不是 AI 第二曲线。

## Layer 0 to I1-I8 (v0.4)

- I1: M5 / M8 / M11 / M12
- I2: M3 / M4
- I3: M5 / M6
- I4: M11 / M12
- I5: M2 / M8
- I6: M9 / M13
- I7: M6 / M11
- I8: M4 / M5 / M10
- AI Asymmetry: M7 / M9 / M13
- Stack Coherence: M10 / M11
- **Platform Optionality (NEW)**: **M14**

## Red Flags (v0.4)

- AI demo but no write-back (M5)
- Data but no action / feedback (M3)
- Responsibility claim but no audit / rollback / contract (M11)
- Outcome pricing claim but no causal attribution (M12)
- Value creation but no pricing power or margin retention (M13)
- Usage growth but no unit-cost decline (M9)
- Strong narrative but only P0-P1 TAM evidence (M8)
- **(NEW)** ≥3 业务线发散但用单一打分 (Split Entity 误判)
- **(NEW)** API/MCP 大量调用但用户不再进 UI (R-ABSTRACT)
- **(NEW)** 慢时钟 + 4 路高泄漏 同时触发 (C12)
- **(NEW)** 整体 P3 掩盖 AI 单独 P1-P2 (M8 detail 格式缺失)

## Score Bands (v0.4)

```text
85-100+: 真 AI 第二曲线 + 平台经济
75-84: 强 AI 第二曲线
65-74: 局部 AI 第二曲线
55-64: 复合期权 (SOTP 需要)
40-54: AI Copilot 增强
20-39: AI 叙事
0-19: 无第二曲线
```

## v0.4 Anchors

| Company | 100-pt | M14 | Subtype |
|---|---:|---:|---|
| INTU | 85 | +1 | P-1 + P-5 + P-10 |
| PTC | 74 | +1 | P-2 + P-3 + P-4 |
| ADSK | 67 | +3 | P-4 + **P-13** |
| ADBE | 59 | +2 | **P-12 (SOTP)** |
