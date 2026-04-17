# FORM — Codex Report Lab 发现整合备忘录

> **日期**: 2026-04-16 | **来源**: codex-report-lab worktree v0 分析 (10个staging文件 + 1个主稿)
> **目的**: 从codex-lab v0中提取对我们Phase 1+更高质量分析有价值的新发现

---

## 核心thesis一致性验证: ✓ 两套分析方向高度一致

| 维度 | 我们的v0 (半导体worktree) | codex-lab v0 | 差异/补强 |
|------|--------------------------|-------------|----------|
| **主要矛盾** | ROIC<WACC + F&L衰退 + EPS逆增长 | "好公司、难转型、薄安全垫" | 一致。codex更温和措辞但方向相同 |
| **估值判断** | 185x PE高估 | "几乎满打满算的转型成功才justify当前价" | 一致 |
| **护城河** | MEMS技术壁垒 + 1200专利 | "中等强度利基护城河" | codex更精准: **护城河不绝对，客户可以改测试策略** |
| **增长质量** | HBM +117%但F&L -15% | "窄而集中"的HBM驱动 | 一致。codex用季度数据更精确证明了窄度 |

---

## codex-lab提供的**5个关键新发现** (我们v0未覆盖)

### 新发现1: DRAM产品毛利率低于F&L — 增长方向和利润方向相反

> **10-K原文**: "DRAM products generally have lower margins than Foundry & Logic products"

**含义**: 市场奖励FORM的DRAM/HBM增长，但这个增长的**mix shift恰恰压制毛利率**。这是一个隐性矛盾——增长最快的部分，利润率最低。
- FY24 F&L占探针卡60.9% → FY25 58.0% (↓)
- FY24 DRAM占探针卡36.3% → FY25 38.8% (↑) 
- **方向**: 高毛利F&L萎缩 + 低毛利DRAM扩张 = 混合毛利率应该下降

**为什么Q4毛利率反而在升**: 规模效应 + 产品组合改善(HBM4 ASP高于普通DRAM) + 定价权(供不应求)。但如果HBM供需rebalance，低毛利DRAM mix回归主导

### 新发现2: Systems段毛利率在坍塌 — 51.3% → 41.8%

| Year | Systems GM |
|------|-----------|
| FY2023 | 51.3% |
| FY2024 | 43.2% |
| FY2025 | 41.8% |

**10-K归因**: increased manufacturing spending + unfavorable product mix + greater percentage of lower-margin products
**含义**: Systems不是"隐性高利润引擎"。投资者听到"量子计算+低温+硅光"会想到高利润平台，但数据说反方向。

### 新发现3: 客户集中度季度追踪 — SK Hynix常年占20-25%

| Quarter | SK Hynix | Intel | TSMC | 备注 |
|---------|---------|-------|------|------|
| Q1'25 | 23.3% | 10.5% | — | 双客户>10% |
| Q2'25 | 25.0% | 12.4% | 10.4% | **三客户>10%** |
| Q3'25 | 24.5% | — | 12.0% | |
| Q4'25 | 19.2% | — | — | SK Hynix占比降低=好信号 |

**含义**: Q4'25 SK Hynix从25%降到19.2%，但不是客户多元化——是DRAM收入季节性波动。需要看Q1'26确认趋势。

### 新发现4: Segment net contribution波动大 — Systems不稳定

| Year | Probe Cards Contribution ($M) | Systems Contribution ($M) |
|------|------|------|
| FY2023 | 69.4 | 36.9 |
| FY2024 | 128.3 | 15.6 |

**含义**: Systems利润波动极大($37M → $16M = -58%)。不能用"两条腿走路"叙事——Systems是辅助不是对冲。

### 新发现5: FCF压力测试 — 即使全面达标也只有1.6% FCF yield

codex-lab的压力测试:

| FCF假设 | FCF Yield @ $10B市值 | 隐含估值 |
|---------|---------------------|---------|
| $70M (Bear/Delay) | 0.7% | $26-36/share |
| $110M (Partial Conversion) | 1.1% | $56-81/share |
| $160M (Full Target Model) | 1.6% | $103-137/share |
| $190M (Above Target) | 1.9% | $139-181/share |

**含义**: 当前$128几乎正好落在"Full Target Model"的上限。意味着$128已经price in了**管理层目标模型的完全实现** + **溢价品质倍数**。任何执行偏差 = 下行。

---

## codex-lab发现对我们分析框架的升级

### 升级1: 从"ROIC<WACC"深化到"增长方向和利润方向相反"
- 我们v0的thesis: "收入翻倍但EPS下降"
- 升级后: "收入翻倍的主要驱动(DRAM/HBM)恰好是**低毛利率产品**，增长方向和mix方向构成结构性张力"
- **这解释了为什么EPS不随收入增长** — 不只是CapEx问题，是产品mix问题

### 升级2: 从"F&L衰退"深化到"Technoprobe蚕食 + 高毛利F&L萎缩的双重打击"
- 我们v0: "F&L从$436M降到$370M"
- 升级后: "F&L萎缩不只是量的问题——F&L是高毛利段，萎缩意味着利润率支撑在消失"
- **因果链**: Technoprobe赢TSMC 2nm份额 → F&L收入萎缩 → 高毛利占比下降 → 混合毛利率天花板

### 升级3: 从"估值高"深化到"FCF yield压力测试"
- 我们v0: "185x trailing PE"
- 升级后: "即使Full Target Model ($160M FCF)完全实现，$128也只买到1.6% FCF yield"
- **这比单纯说PE高估更有说服力** — 把估值问题转化为"你愿意为这个FCF yield持有一个周期股吗?"

### 升级4: 增加"客户可以改测试策略"作为护城河裂缝
- 我们v0: "MEMS技术壁垒 + 1200专利"
- 升级后: "10-K明确警告客户可能减少探针卡需求/改用低性能测试方案"
- **Kill Switch新增**: 如果HBM测试方法改变(如chiplet-level test替代wafer-level test)，探针卡content per wafer可能反向下降

---

## 对我们Phase 1-4的直接影响

| Phase | 从codex-lab吸收什么 |
|-------|-------------------|
| **P1 业务理解** | DRAM低毛利率事实 + Systems毛利率坍塌 + 客户季度集中度数据 |
| **P2 财务深度** | FCF yield压力测试框架 + 收入归因(mix effect是利润阻力) |
| **P3 竞争** | 10-K竞争对手完整列表 + "客户可以改测试策略"作为替代风险 |
| **P4 红队** | Bull case falsification条件(codex-lab已写好F1-F4) |

---

## 近期催化剂 (来自codex-lab)

- **April 29, 2026**: Q1 FY26 earnings — 首次验证Q4动能是否持续
- **May 11, 2026**: Analyst Day — 管理层target model bridge的关键细节
- **May 15, 2026**: Annual Meeting

---

*Integration memo by AI analyst, 2026-04-16*
