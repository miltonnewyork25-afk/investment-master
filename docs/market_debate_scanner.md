# Market Debate Scanner（市场争论扫描器）

> **设计目的**: 模板是死的，市场关心的问题是活的。在分析开始前，先搜索市场正在争论什么，然后确保分析框架覆盖了这些争论。未覆盖的争论自动作为"Ad-hoc模块"注入到对应Phase中。

---

## 触发条件

**强制触发**: 所有 Tier 2 和 Tier 3 分析，在 Phase 0（数据基础）阶段自动执行。

---

## 执行流程（3步）

### Step 1: 搜索市场争论

使用 Task Agent 并行执行以下 WebSearch 查询（变量由编排器填充）：

```yaml
必搜查询（8条）:
  1. "{TICKER} bull case bear case {YEAR}"
  2. "{TICKER} biggest risk debate investors {YEAR}"
  3. "{TICKER} short thesis {YEAR}"
  4. "{COMPANY} controversy why investors disagree"
  5. "{TICKER} overvalued undervalued {YEAR}"
  6. "site:reddit.com {TICKER} stock debate {YEAR}"
  7. "{COMPANY} biggest challenge threat {YEAR}"
  8. "{TICKER} earnings reaction analysis {YEAR}"

行业追加查询:
  半导体: "{COMPANY} AI benefit or disruption", "{TICKER} cycle position semiconductor"
  消费品: "{COMPANY} brand value declining", "{COMPANY} private label threat"
  金融: "{COMPANY} credit risk debate", "{COMPANY} fintech disruption"
  科技平台: "{COMPANY} antitrust break up risk", "{COMPANY} AI monetization debate"
```

### Step 2: 提炼争论图谱

从搜索结果中提炼 **8-12个独立争论话题**，每个话题包含：

```yaml
争论卡模板:
  topic: "一句话标题"
  heat: 1-10  # 10=最热
  bull_case: "看多方核心论点（2-3句）"
  bear_case: "看空方核心论点（2-3句）"
  resolution_timeline: "何时见分晓"
  key_metrics: ["观测指标1", "观测指标2"]
  sources: ["来源URL"]
```

**排序规则**: 按 heat 降序排列。heat ≥ 7 的争论为"必须回应"级别。

### Step 3: 交叉比对 + 自动注入

将争论图谱与标准分析模块交叉比对：

```
对每个 heat ≥ 7 的争论:
  检查: 是否已被标准Phase模块覆盖？

  如果已覆盖:
    → 标注"✅ 已覆盖于 Phase X Section Y"
    → 在该Section中优先使用争论双方视角构建分析

  如果未覆盖:
    → 创建 Ad-hoc 分析模块
    → 分配到最相关的 Phase
    → 设定字数目标（≥2000字符/模块）
    → 标注"🆕 市场争论驱动新增"
```

---

## 输出格式

### 争论图谱表

```markdown
| 排名 | 争论主题 | 热度 | Bull核心 | Bear核心 | 覆盖状态 |
|:---:|---------|:---:|---------|---------|---------|
| 1 | [主题] | 10 | [一句话] | [一句话] | ✅ Phase 2 |
| 2 | [主题] | 9 | [一句话] | [一句话] | 🆕 → Phase 3 |
```

### Ad-hoc模块注入清单

```markdown
## 市场争论驱动的新增模块

### [Ad-hoc 1] [争论主题] → 注入Phase X
- **来源争论**: 排名#N, 热度X/10
- **分析角度**: [具体分析什么]
- **字数目标**: ≥2000字符
- **必须回答的问题**: [1个核心问题]
- **数据需求**: [需要什么数据来回答]
```

---

## 与Phase的整合规则

| Phase | 适合接收的Ad-hoc类型 | 示例 |
|-------|-------------------|------|
| Phase 1 定位 | 公司身份/战略方向争论 | "是AI公司还是传统芯片公司" |
| Phase 2 财务 | 收入质量/利润率/估值争论 | "运营费用飙升是投资还是浪费" |
| Phase 3 护城河 | 竞争力/技术路线/生态争论 | "CUDA生态能否被打破" |
| Phase 4 对抗审查 | 风险/泡沫/黑天鹅争论 | "AI泡沫破裂时AMD受伤多大" |
| Phase 5 决策 | 估值/仓位/时机争论 | "现在买入还是等产品空窗期结束" |

---

## Ad-hoc模块分析标准

每个Ad-hoc模块必须：

1. **呈现双方** — 不能只写一方观点。用"Bull认为...Bear认为..."结构
2. **引入数据** — 用具体数据/事实评判哪方论据更强。标注 `[A:]`/`[B:]`
3. **给出判断** — 明确表态"我们倾向于X方"，并量化置信度（%）
4. **设定验证** — "如果X方正确，我们将在[时间]看到[指标]变化"
5. **连接决策** — 这个争论的结论对最终评级/仓位有什么影响

---

## Tier 2 简化版

Tier 2 分析只需：
- Step 1 搜索（减少到5条查询）
- Step 2 提炼（只需top 5争论）
- Step 3 只对 heat ≥ 8 的争论创建Ad-hoc模块
- Ad-hoc字数降至≥1000字符/模块

---

## 示例：AMD 2026年2月

```
争论图谱 → 10个争论，heat≥7有7个
交叉比对结果:
  ✅ 已覆盖: CUDA vs ROCm(Phase 3护城河)、估值争论(Phase 2)、AI泡沫(Phase 4)、服务器CPU(Phase 3)
  🆕 未覆盖:
    → [Ad-hoc 1] OpenAI 6GW大单: 股权稀释+客户集中度 → Phase 2财务
    → [Ad-hoc 2] H1产品空窗期风险 → Phase 3技术路线
    → [Ad-hoc 3] 运营费用飙升vs营收增速 → Phase 2财务
```

这确保了分析不仅覆盖"模板要求的内容"，还覆盖了"市场此刻最关心的内容"。
