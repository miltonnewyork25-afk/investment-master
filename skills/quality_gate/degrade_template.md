# DEGRADE Output Template v2.2

> **重要**：此模板为DEGRADE输出的硬锁定格式。
> 当Quality Gate裁决为DEGRADE时，必须使用此模板替换原始输出。
> 禁止包含任何投资结论、目标价或买卖建议。

---

## Hypothesis List

列出当前分析中的核心假设（必须包含，最少3条）：

- H1: [假设描述]
- H2: [假设描述]
- H3: [假设描述]
- ...

---

## Key Uncertainties

列出阻碍形成高置信度结论的关键不确定性（必须包含，最少3条）：

- U1: [不确定性描述] — 影响程度：[高/中/低]
- U2: [不确定性描述] — 影响程度：[高/中/低]
- U3: [不确定性描述] — 影响程度：[高/中/低]
- ...

---

## Uncertainty Matrix

**必须包含** — 结构化不确定性表（最少3行）：

| 假设/不确定性 | 验证方法 | 数据源 | 预计时间 | 当前置信度 |
|---------------|----------|--------|----------|------------|
| [H1/U1] | [如何验证] | [数据来源] | [时间估计] | [0-100%] |
| [H2/U2] | [如何验证] | [数据来源] | [时间估计] | [0-100%] |
| [H3/U3] | [如何验证] | [数据来源] | [时间估计] | [0-100%] |
| ... | ... | ... | ... | ... |

---

## Monitoring Triggers

列出应持续监控的触发事件（必须包含，最少2条）：

- **Trigger A**: [事件描述] → 如果发生，则 [影响]
- **Trigger B**: [事件描述] → 如果发生，则 [影响]
- ...

---

## Next Evidence Plan

列出为消除不确定性需要获取的证据（必须包含，最少3条）：

1. **[证据1]**:
   - 来源: [权威来源]
   - 优先级: [P0/P1/P2]
   - 预期获取时间: [时间]

2. **[证据2]**:
   - 来源: [权威来源]
   - 优先级: [P0/P1/P2]
   - 预期获取时间: [时间]

3. **[证据3]**:
   - 来源: [权威来源]
   - 优先级: [P0/P1/P2]
   - 预期获取时间: [时间]

---

## Reason Codes

本次DEGRADE的原因代码：

```
[列出触发DEGRADE的reason_codes]
```

---

## Confidence Statement

> **当前置信度**: [0-100%]
>
> **置信度上限(cap)**: [来自上游的confidence_cap]
>
> **提升置信度所需**: [简述需要什么才能提升]

---

## Disclaimer

> ⚠️ **重要提示**
>
> 本输出处于DEGRADE状态，不包含投资结论。
> 以上内容仅为假设、不确定性和待验证事项的结构化梳理。
> 在获取更多证据并通过Quality Gate之前，不应基于本内容做出投资决策。

---

# 禁止措辞库

以下措辞在DEGRADE输出中**绝对禁止使用**：

## 投资建议类
- ❌ strong buy
- ❌ strong sell
- ❌ buy
- ❌ sell
- ❌ hold
- ❌ outperform
- ❌ underperform

## 目标价类
- ❌ target price
- ❌ price target
- ❌ fair value
- ❌ intrinsic value
- ❌ worth $XX

## 确定性表达类
- ❌ guaranteed
- ❌ definitely will
- ❌ must go up
- ❌ must go down
- ❌ 100% certain
- ❌ no risk
- ❌ sure to
- ❌ cannot fail

## 高置信度结论类
- ❌ we are confident that
- ❌ high conviction
- ❌ strong conviction
- ❌ clear winner
- ❌ obvious choice

---

# 允许的表达

以下表达在DEGRADE输出中**允许使用**：

## 假设性表达
- ✅ if ... then ...
- ✅ assuming that ...
- ✅ under the scenario of ...
- ✅ hypothetically ...

## 不确定性表达
- ✅ uncertain
- ✅ unclear
- ✅ to be verified
- ✅ pending confirmation
- ✅ requires further evidence

## 监控类表达
- ✅ watch for ...
- ✅ monitor ...
- ✅ key trigger ...
- ✅ leading indicator ...

## 证据需求表达
- ✅ need to verify ...
- ✅ requires evidence from ...
- ✅ should check ...
- ✅ pending data from ...
