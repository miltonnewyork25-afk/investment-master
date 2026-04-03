---
name: CRM v1.0 failure lessons
description: CRM报告失败的5个教训 — 结论先行偏差+单日rush+v1.0/v2.0叙事断裂+ADBE对标迟到。v2.0重做要从P4结论($176)反推+Reverse DCF前置+禁止单日rush
type: feedback
---

## CRM v1.0 失败核心教训 (2026-03-18)

**失败模式**: P1/P2预设bullish叙事($235/+34%)→P3红队彻底推翻→P4结论$176/+0.6%→P1/P2叙事与P4结论不可调和→无法组装

**密度指标悖论**: DM 2.40/千字(历史最高)+因果11.68(超KLAC)→质量不差但方向错了。**高密度的错误叙事比低密度的正确叙事更危险**。

### 5条可迁移教训

1. **Reverse DCF必须在P0/P1最前面做** — 先翻译"市场在赌什么"，再决定叙事方向。CRM市场隐含6.5-8.5% CAGR，有机增速确实~7%→市场是对的。如果P1第一章就做了Reverse DCF，不会写出"标签系统性低估"。
   **Why:** P1一旦预设bullish框架，后续P2的所有估值都会被锚定→P3要花巨大力气纠偏→纠偏后P1/P2叙事报废
   **How to apply:** 所有Tier 3报告P1 Ch1必须包含Reverse DCF结论，且P1叙事不能比Reverse DCF暗示的方向偏离>1档

2. **禁止Tier 3单日rush** — CRM 10个commit全在一天内(Phase -0.5→Phase 4 v2.0)。缺少session间冷却期，bullish动量从P1一路传导到P2
   **Why:** 每个Phase之间的间隔是纠偏窗口，单日rush消除了这个窗口
   **How to apply:** Tier 3最少3个session (P0-P1 / P2-P3 / P4-P5)

3. **同行业可比在P0就要做，不能等P3** — ADBE是CRM最佳锚(增速12% vs 12%，PE 15x vs 13x)，但ADBE对标直到P3 v2.0才出现→P1错过了"ADBE也低PE但没人说低估"这个信号
   **Why:** 可比公司是最强的外部锚点，延迟引入=延迟纠偏
   **How to apply:** Phase 0 shared_context必须包含最相似公司的PE/增速对比，作为P1叙事的约束

4. **Phase自审门控必须严格** — P3 v1.0仅19.3K(目标的39%)就被提交了→触发v2.0重写→30K字符浪费
   **Why:** 低于目标50%的Phase产出不可能达到最低质量标准
   **How to apply:** Phase完成时字符<目标50%→自动BLOCK，不允许commit

5. **Checkpoint实时更新** — v2.0估值$176但checkpoint仍记录v1.0的$223→恢复session会拿到错误基准
   **Why:** Checkpoint是跨session的唯一数据传递机制
   **How to apply:** 任何估值结论变化后立即更新checkpoint.yaml

### v2.0重做策略
- 从P4结论($176/中性关注)反推→P1用中性视角("隐含假设合理吗？")
- P3 v2.0红队发现+P4校准参数→直接嵌入新P1/P2
- DM锚点401个可复用→不需要重新获取数据
- 5个CQ定义+P4闭环结论→直接复用
- 详见: `reports/CRM/reflection/CRM_v1_failure_reflection.md`
