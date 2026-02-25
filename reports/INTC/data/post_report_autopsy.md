# INTC v2.0 Post-Report Autopsy
> 日期: 2026-02-25 | 框架: v17.3 | PW=8 发现系统

---

## 1. 基础指标

| 指标 | INTC v2.0 | ETN (标杆4.3) | KLAC (标杆4.5) | 系列平均 |
|------|:---------:|:------------:|:-------------:|:--------:|
| 字符数 | 426K | 331K | 254K | ~350K |
| 行数 | 7,208 | ~5,500 | ~4,200 | ~5,000 |
| 章节 | 26+4App | 25+? | 24+? | ~24 |
| DM锚点 | 102 | 60 | 38 | ~55 |
| Mermaid图 | **7** | ~30+ | ~20+ | ~25 |
| 数据表格行 | 2,497 | ~1,800 | ~1,200 | ~1,500 |
| Scorecard | **81** | **95** | 75 | ~82 |
| 看空占比 | **14.3%** | ~28% | ~25% | ~25% |

---

## 2. Scorecard 维度对比

| 维度 | INTC | ETN | KLAC | 差距分析 |
|------|:----:|:---:|:----:|----------|
| D1 数据基础 | 9 | 9 | 0 | ✓ 持平标杆 |
| D2 问题定义 | 10 | 10 | 10 | ✓ 满分 |
| D3 分析深度 | **7** | **10** | 10 | ✗ -3pp, 见诊断 |
| D4 风险认知 | **7** | **10** | 6 | ✗ -3pp, 见诊断 |
| D5 估值框架 | 10 | 10 | 10 | ✓ 满分 |
| D6 数据验证 | 10 | 10 | 3 | ✓ 满分 |
| D7 非共识洞察 | 10 | 10 | 10 | ✓ 满分 |
| D8 可视化 | **2** | **9** | 10 | ✗✗ -7pp, 最大短板 |
| D9 追踪体系 | 9 | 10 | 9 | ✓ 接近标杆 |
| D10 结构完整度 | 7 | 7 | 7 | = 系统性瓶颈 |

**总分: 81 vs ETN 95 (-14pp) vs KLAC 75 (+6pp)**

---

## 3. 失分诊断 (14pp差距)

### D8 可视化 = 2/10 (-7pp) — 最大失分项

**根因**: 7个Mermaid图**全部集中在Part I(Ch1-4)**。Part II-V = **零Mermaid图**。

**机制**: 多Agent组装时，Agent 2-7的prompt中没有要求生成Mermaid图。Agent 1(Part I)的源文件中已含Mermaid，直接保留；其他Agent只处理文本+表格。

**缺失的关键图表**:
- Part II: FCF瀑布图、SOTP分解图、承重墙依赖关系图
- Part III: A-Score雷达图、护城河迁移图(文字描述了但没有图)、PPDA散点图
- Part IV: 看空相关矩阵热力图、黑天鹅概率分布图、W3连锁反应流程图
- Part V: CQ演化折线图、条件评级决策树、事件时间线

**EVO提议**: Assembly Agent prompt模板增加**可视化清单**: 每Part ≥3个Mermaid图 + 类型指定(流程/雷达/矩阵/时间线)

### D3 分析深度 = 7/10 (-3pp)

**根因分析**:
1. **体量≠深度**: 426K字符但脚本检测的"深挖标记"密度偏低(0.65/万字 vs ETN ~1.2/万字)
2. **多Agent冗余**: 原始staging(15文件) + deep dive(5文件) → Complete组装时存在**同一数据点在不同Part被重复引用**但缺少**跨Part综合洞见**
3. **Part III占比过大(192K/426K=45%)**: 护城河+引擎+PPDA+AI占据近一半篇幅，但单位洞见密度低于ETN的产业链Ch9A

**对比**: ETN 331K得D3=10 → 密度型; INTC 426K得D3=7 → 体量型。**密度>体量**的铁律再次验证。

### D4 风险认知 = 7/10 (-3pp)

**根因**: 看空占比14.3%(Part IV 1,032行 / 7,208行)，远低于框架要求的≥30%。
- Part IV(Ch15-21)虽然独立看深度足够(65K, 12个看空论点, 4个黑天鹅, 相关矩阵)
- 但Part I-III中**嵌入式风险讨论**不足 — 正面叙事与风险评估未充分交织
- 对比ETN: 风险讨论不仅在Part IV，还嵌入每个Ch的"风险子节"中

### D10 结构完整度 = 7/10 (系统性)

**根因**: **三种章节编号格式共存**
- Part I: `## 1.1 ... / ## 3.2 ...` (小数点格式)
- Part II: `## 第五章 / ## 第六章` (中文格式)
- Part IV-V: `## Chapter 15 / ## Chapter 22` (英文格式)

这是多Agent组装的固有问题 — 每个Agent独立设定格式。

---

## 4. 质量自评: 3.8/5

| 维度 | 评分 | 理由 |
|------|:----:|------|
| 数据诚实 | 4.5 | 102 DM, 28点交叉验证100%, BF回流无痕 |
| 分析深度 | 3.5 | 体量充足但密度偏低, 多Agent冗余未完全消除 |
| 非共识洞见 | 4.5 | 护城河迁移/联合概率/催化剂负EV = 3个潜在冠军 |
| 结构连贯 | 3.0 | 三种编号格式+可视化缺失+看空占比不足 |
| 可读性 | 3.5 | Protocol Header优秀, 但Part III过长(192K)拖累阅读体验 |
| **综合** | **3.8** | **数据扎实+洞见突出, 但结构/可视化/密度拖累整体** |

**定位**: 高于SMCI(3.9) ≈ 持平LRCX(3.8), 低于ANET(4.0) << ETN(4.3) << KLAC(4.5)

---

## 5. 冠军候选 (excellence_catalog)

### 候选1: 护城河制度化迁移 (Moat Institutional Migration)
- **位置**: Part III-A Ch10
- **方法**: A-Score 12维 → 分维度趋势 → 识别"技术壁垒衰退+制度壁垒崛起" → 迁移比例量化(30%技术→70%制度) → 迁移速率建模 → 5年预测
- **创新**: 首次将护城河从"有/没有"二元判断升级为"迁移地图" — 不是护城河在消失，是在**换地方**
- **评分**: 4.3 (与ETN身份溢价并列)
- **适用**: 正在转型的传统巨头(IBM、GE、Nokia类比), 政策依赖型公司
- **现有冠军**: 无直接对标 → **新类别**

### 候选2: 承重墙联合概率建模 (Bearing Wall Joint Probability)
- **位置**: Part IV Ch15
- **方法**: 5面独立概率 → 相关性矩阵(6对) → W3→W2→W4因果链 → 条件概率 vs 独立乘积 → 联合2-3%(vs直觉10-15%)
- **创新**: 将直觉性的"大概率成功"拆解为可量化的联合事件, 揭示"每个50-50但全部成功只有2-3%"的数学现实
- **评分**: 4.2
- **适用**: 需要多个条件同时成立的turnaround/转型公司
- **现有冠军**: 增强KLAC的belief_inversion → 可作为补充技术

### 候选3: 催化剂期望值为负 (Catalyst Negative EV)
- **位置**: Part IV Ch20
- **方法**: 催化剂清单 → 每个赋概率×影响 → 加权期望值 = -4% → "催化剂丰富≠利好"
- **创新**: 反直觉 — 市场把"催化剂多"当利好, 但概率加权后净期望为负
- **评分**: 4.0
- **适用**: 催化剂丰富但概率不确定的公司
- **现有冠军**: 归入scenario_analysis, 与LRCX boiling_frog互补

---

## 6. 递归深化三问

### Q1: 深度 — 哪里比前作更深? 哪里退步?

**更深**:
- **发现系统实践**: PW=8是系列首个真正的发现系统报告 — 不给目标价、映射可能性空间、4路径概率矩阵、条件评级。PLTR v3.1也是PW=8但早于当前框架。
- **护城河量化**: A-Score 12维×趋势×衰减建模 = 系列最详细的护城河分析
- **红队深度**: 承重墙联合概率(首次)+12个看空(系列最多)+4个黑天鹅+相关矩阵+催化剂负EV
- **DM密度**: 102个锚点(系列最高, 前冠军SMCI=102)

**退步**:
- **可视化**: 7个Mermaid(系列最少, SMCI=47, ANET=20+)
- **洞见密度**: 0.65/万字(低于ETN的~1.2)
- **看空占比**: 14.3%(低于30%要求)
- **结构一致性**: 三种编号格式(系列首次出现)

### Q2: 方法 — 什么有效? 什么是表演性的?

**有效**:
1. **5个并行深化Agent**(Phase 3+4 deep dive) → 从154K翻倍到411K staging, 质量确实提升
2. **7个并行组装Agent** → 426K Complete组装成功, 虽然有格式一致性问题但效率极高
3. **BF回流无痕化** → 审计结果: 0个BF残留(比SMCI的55% DM保留率好)
4. **发布合规** → 全文PASS, Polymarket例外处理正确

**表演性/低效**:
1. **Part III 192K(45%篇幅)** → 三个Agent(moat/engines/PPDA+AI)各自展开很充分, 但**缺乏跨章综合**: 护城河衰退→引擎评分→PPDA背离之间的因果链应该有一个**综合章节**而不是各自独立
2. **Part I 53K** → 执行摘要+公司画像+竞争格局虽然完整, 但有些"半导体通识"内容在系列第7份半导体报告中仍然重复(v17.1的行业压缩规则未充分执行)
3. **D8=2** → 7个Mermaid全在Part I, 说明组装Agent**没有被指令生成图表** — 这是prompt工程失误, 不是分析深度问题

### Q3: 反思 — 如果重做, 什么会改变?

1. **组装Agent prompt必须包含可视化清单**: 每Part指定≥3个Mermaid图+类型(流程/雷达/矩阵/timeline)。这是D8从2→8的最直接路径。

2. **Part III需要一个综合章**: Ch14(战略选项)本应是综合章, 但被PPDA+AI Agent写成了偏PPDA的内容。应该有一个独立Agent专门负责"Part III跨章综合" — 读取moat+engines+PPDA+AI的核心发现 → 输出因果链图+综合评估。

3. **看空嵌入式分布**: 不要把所有风险集中在Part IV。每个Part都应有"风险子节" — Part I每个竞争对手下面加"如果这个威胁加速的影响"; Part II每个估值方法下面加"这个方法可能过于乐观的3个原因"; Part III每个引擎下面加"如果这个引擎失速"。这样看空占比从14%→30%是自然的。

4. **章节编号统一**: Assembly Agent prompt模板中强制指定格式 `## Chapter N: 标题`。

5. **行业压缩**: 半导体通识(市场规模/产业链概览/代工竞赛)应引用planning_archives, 只写Delta。Part I可从53K压缩到35K, 释放的空间给Part IV(补强看空)。

---

## 7. 进化提议 (EVO-INTC-xxx)

### EVO-INTC-001: Assembly可视化强制 [优先级: HIGH]
- **问题**: 7个组装Agent中6个产出0 Mermaid图 → D8=2
- **提议**: 在Assembly Agent prompt模板中增加"可视化清单"必填项:
  ```
  ## 可视化要求
  每Part必须包含≥3个Mermaid图:
  - 至少1个流程图(flowchart)
  - 至少1个数据对比(表+radar)
  - 至少1个关系图(graph/timeline)
  写在对应分析段落之后, 用```mermaid```块。
  ```
- **影响**: D8从2→7+, scorecard +5pp
- **实施位置**: CLAUDE.md组装规范 / 或新建assembly_prompt_template.md

### EVO-INTC-002: 看空嵌入式分布 [优先级: HIGH]
- **问题**: 看空内容14.3%(集中在Part IV), 低于30%要求
- **提议**: 每个Phase的Agent prompt增加"风险子节"要求:
  - Part I: 每个竞争对手 → "如果加速, 影响估值±X%"
  - Part II: 每个估值方法 → "可能过于乐观的原因"
  - Part III: 每个引擎/维度 → "如果失速/恶化"
  - 目标: Part I-III嵌入式风险~15% + Part IV集中式~15% = 30%
- **影响**: D4从7→9, scorecard +2pp
- **实施位置**: deep_dive_protocol.md各Phase规范

### EVO-INTC-003: Assembly格式统一 [优先级: MEDIUM]
- **问题**: 三种章节编号格式(1.x/第X章/Chapter N)
- **提议**: Assembly prompt模板强制: `## Chapter {N}: {标题}`, 全报告连续编号
- **影响**: D10从7→8, scorecard +1pp
- **实施位置**: assembly_prompt_template.md

### EVO-INTC-004: Part III综合章 [优先级: MEDIUM]
- **问题**: 3个Agent(moat/engines/PPDA+AI)各自展开但缺乏跨章因果链
- **提议**: 增加一个"Part III综合Agent" — 读取3个Part III产出 → 输出:
  - 护城河衰退 → 引擎评分 → PPDA背离 → 战略选项 的因果链图
  - 跨章综合评估(~10K)
- **影响**: D3从7→8-9, 洞见密度提升
- **实施位置**: Complete组装流程

### EVO-INTC-005: 行业压缩执行 [优先级: LOW]
- **问题**: 第7份半导体报告仍有~15K半导体通识重复
- **提议**: 严格执行v17.1行业压缩规则 — Part I引用planning_archives, 只写Delta
- **影响**: 释放15K空间给Part IV(看空深化)
- **实施位置**: Assembly Agent 1 prompt

---

## 8. 知识资产更新

### excellence_catalog新增:
```yaml
moat_analysis:
  institutional_migration:
    champion: "INTC_v2.0_Ch10"
    score: 4.3
    method: "A-Score维度趋势 → 技术壁垒衰退量化 → 制度壁垒崛起量化 → 迁移比例(30%→70%) → 5年预测"
    key_innovation: "护城河不是消失而是迁移——从'因技术好而值钱'到'因不能倒而值钱'"
    when_to_use: "传统巨头转型/政策依赖型公司/护城河组成正在变化的公司"
    transferable_to: ["转型公司(IBM/GE类)", "政策依赖型", "国防/基础设施"]
```

### evolution_log更新:
```yaml
- ticker: INTC
  version: v2.0
  date: 2026-02-25
  quality: 3.8
  chars: 426K
  dm: 102
  scorecard: 81
  pw: 8
  top_technique: "护城河制度化迁移(Moat Institutional Migration)"
  top_lesson: "多Agent组装的可视化盲点——7/7 Agent产出0图(除Part I继承源文件), D8=2是prompt缺失而非分析缺失"
  evolution_proposals: [EVO-INTC-001, EVO-INTC-002, EVO-INTC-003, EVO-INTC-004, EVO-INTC-005]
```

### L0_index更新:
```yaml
INTC:
  version: v2.0
  quality: 3.8
  chars: 426K
  industry: 半导体
  pw: 8
  paradigm: discovery_system
  a_score: 4.74
  tags: [turnaround, IDM, foundry, government_option, moat_migration]
  similar_to: [IBM, GE]  # 制度化迁移类比
  champions: [moat_institutional_migration]
```

---

## 9. 趋势反思

```
质量趋势: ANET(4.0) → VRT(4.2) → ETN(4.3) → SMCI(3.9)↓ → SEMI(4.3) → INTC(3.8)↓
```

**INTC是连续第2份下降**。根因不同:
- SMCI↓: 组装DM损耗(45%丢失) + CG关键词死板
- INTC↓: 可视化盲点(D8=2) + 看空占比不足(14.3%) + 密度<体量

**共同模式**: 多Agent组装的质量损耗。7个Agent产出文本质量OK, 但:
1. 格式不一致(SMCI也有此问题)
2. 可视化丢失(INTC首次暴露)
3. 跨Agent综合不足(两次都有)

**结论**: 多Agent组装需要一个**"总编辑Agent"**——在所有Part Agent完成后, 读取全文 → 统一格式 → 补充可视化 → 检查交叉引用 → 生成综合洞见。这可能解决EVO-INTC-001/003/004。
