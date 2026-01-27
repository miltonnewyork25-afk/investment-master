# 品牌体验分析框架 v1.0

> **Skill ID**: `research_mechanism.brand_experience_analysis_v1.0`
> **主路由**: Research Mechanism (65%)
> **辅助路由**: Ecosystem Graph (20%), Quality Gate (15%)
> **理论基础**: Schmitt体验模块 / Byron Sharp心智可得性 / Crossmodal Correspondences / 品牌资产理论
> **归档日期**: 2026-01-27

---

## Skill 用途

用**"商业模式→体验→感官→记忆钩子→验证"**的分析链路，评估任何公司的品牌体验竞争优势，输出：

1. **BrandExp_Score (0-100)**: 品牌体验竞争力综合得分
2. **Mental_Availability_Rating**: 心智可得性评级（高/中/低）
3. **Distinctive_Assets_Strength**: 可识别资产强度
4. **Experience_Moat_Contribution**: 体验对护城河的贡献度
5. **Brand_Premium_Estimate**: 品牌溢价估算

**核心理念**：
- 品牌不是"调性词"，而是用户在关键情境下形成的**可记忆、可识别、可重复**的体验与线索组合
- 多感官线索可把抽象属性（安全/高端/前沿/可信/放纵）变成**非语言触发器**，影响知觉、判断、行为与记忆
- **强品牌体验 = 护城河的重要来源**（切换成本、习惯默认、溢价能力）

**适用场景**：
- 消费品/快消公司分析
- 奢侈品/高端品牌估值
- 零售/餐饮体验评估
- SaaS/订阅产品体验分析
- 平台型公司品牌差异化
- B2B品牌与信任分析

---

## 输入参数 (Inputs)

```yaml
inputs:
  required:
    - name: "target"
      description: "目标公司/品牌/产品线"

    - name: "business_model"
      options:
        - "交易型（快消/零售/出行/餐饮）"
        - "订阅型（SaaS/会员/内容/健身）"
        - "平台型（双边市场/生态系统）"
        - "耐用品/高客单（汽车/家电/奢侈品）"
        - "企业级/工业（B2B设备/供应链/专业服务）"

    - name: "category_and_competition"
      description: "用户把它当作什么品类在买？最常被替代的'高维竞品'是什么？"

    - name: "customer_job"
      description: "用户雇佣它完成的任务（功能+情绪+社会身份）"

    - name: "moments_of_truth"
      description: "3-7个关键时刻：发现→比较→下单→首次使用→复用→升级/流失"

  optional:
    - name: "channels"
      description: "线上/线下/门店/交付/售后/社交媒体/社区"

    - name: "constraints"
      description: "文化禁忌/合规/成本/供应链/可用媒体形式"

    - name: "competitors"
      description: "主要竞争对手列表（用于对比分析）"
```

---

## 分析原则 (Principles)

| 原则 | 描述 | 投资含义 |
|------|------|----------|
| **多感官一致性** | 不同感官讲同一个故事；不一致会稀释与误导 | 一致性高→品牌资产积累→溢价持续 |
| **体验模块齐全** | Sense/Feel/Think/Act/Relate五模块覆盖不同商业模式 | 覆盖全面→用户粘性多维度 |
| **可识别资产** | 建立distinctive assets提升心智可得性 | 识别度高→获客成本低→市场份额稳定 |
| **线索可验证** | 每个关键线索对应可测指标+反证条件 | 可验证→投资论点可追踪 |

---

## 8步工作流 (Workflow)

### Step 1: 品类入口分析 (Category Entry Point)

**目的**: 识别用户在什么情境会想起这个品类与品牌

**分析框架**：
```yaml
cep_analysis:
  trigger_context:
    description: "用户在什么情境下会想到这个品类？"
    examples:
      - "早上起床想提神 → 咖啡"
      - "工作中需要协作 → Slack/飞书"
      - "想犒劳自己 → 奢侈品"

  need_state:
    description: "用户当时的需求状态"
    dimensions:
      - functional: "功能需求"
      - emotional: "情绪需求"
      - social: "社会需求"

  mental_availability:
    description: "品牌在该情境下的心智可得性"
    measurement: "提及率、第一联想、搜索关键词"

  high_dimensional_substitutes:
    description: "真正的替代方案（可能跨品类）"
    examples:
      - "星巴克的替代：瑞幸 OR 能量饮料 OR 小睡"
      - "Netflix的替代：抖音 OR 游戏 OR 睡眠"
```

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 品类第一联想，多个CEP强势覆盖 |
| +1 | 品类前三联想，部分CEP覆盖 |
| 0 | 中等心智可得性 |
| -1 | 心智可得性弱，易被替代 |
| -2 | 几乎无心智占位 |

**输出**: `cep_map`

---

### Step 2: 品牌阶梯分析 (Brand Ladder)

**目的**: 从属性到情绪到身份的价值链分析

**分析框架**：
```
属性/功能 → 使用后果 → 情绪收益 → 社会身份/自我叙事
```

**示例（Apple）**：
```yaml
brand_ladder:
  attributes:
    - "优秀的工业设计"
    - "iOS生态系统"
    - "隐私保护"

  consequences:
    - "使用体验流畅"
    - "设备间无缝协作"
    - "数据安全感"

  emotional_benefits:
    - "掌控感"
    - "品味被认可"
    - "不用担心"

  identity_narrative:
    - "我是一个有品味、注重细节、在乎隐私的人"

  core_promise: "Think Different - 为有创造力的人"
  proof_point: "设计+生态+隐私的组合"
  anti_claim: "不做廉价产品"
```

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 品牌阶梯完整清晰，情绪→身份链路强 |
| +1 | 阶梯基本完整，部分环节强 |
| 0 | 阶梯模糊，主要停留在功能层 |
| -1 | 阶梯断裂，无情绪/身份层 |
| -2 | 无品牌阶梯，纯功能/价格竞争 |

**输出**: `brand_ladder`

---

### Step 3: 5D体验模块分析 (Experience Modules)

**理论基础**: Schmitt体验模块

**五模块矩阵**：

| 模块 | 定义 | 驱动机制 | 评估维度 |
|------|------|----------|----------|
| **Sense** | 感官可识别 | 美学、愉悦、刺激 | 视觉/听觉/触觉一致性与辨识度 |
| **Feel** | 情绪体验 | 安全感、掌控感、惊喜 | 情绪峰值与结尾体验 |
| **Think** | 理性与聪明感 | 好奇、问题解决、创造 | 信息架构、决策支持 |
| **Act** | 行为与习惯 | 习惯、默认、仪式 | 行为锁定与切换成本 |
| **Relate** | 群体与身份 | 归属、地位、认同 | 社群、圈层、身份标签 |

**分析模板**：
```yaml
experience_modules:
  sense:
    score: "[-2, +2]"
    distinctive_elements: ["颜色", "声音", "材质"]
    consistency: "高/中/低"
    evidence: "[证据]"

  feel:
    score: "[-2, +2]"
    primary_emotion: "[主要情绪]"
    peak_moments: ["峰值时刻"]
    evidence: "[证据]"

  think:
    score: "[-2, +2]"
    intellectual_stimulation: "高/中/低"
    problem_solving: "[如何帮助用户解决问题]"
    evidence: "[证据]"

  act:
    score: "[-2, +2]"
    habit_formation: "高/中/低"
    switching_cost: "高/中/低"
    evidence: "[证据]"

  relate:
    score: "[-2, +2]"
    community_strength: "高/中/低"
    identity_signal: "[身份信号]"
    evidence: "[证据]"
```

**输出**: `exp_modules`

---

### Step 4: 感官翻译分析 (Sensory Translation)

**目的**: 评估品牌如何将抽象承诺翻译为可执行的感官线索

**感官维度**：

| 感官 | 线索类型 | 评估要点 |
|------|----------|----------|
| **视觉** | 色彩/对比/留白/形状/节奏/镜头语言 | 辨识度、一致性、情绪唤起 |
| **听觉** | 启动音/提示音/配乐/语速/音色 | 品牌音效、情绪匹配 |
| **触觉** | 材质/重量/阻尼/交互响应 | 质感、手感、反馈 |
| **数字触感** | 速度/反馈/摩擦/动效 | 界面流畅度、交互体验 |
| **味觉/嗅觉** | 口味结构/香气/余味 | （如适用）感官特征 |

**跨感官映射 (Crossmodal Correspondences)**：
```yaml
crossmodal_examples:
  - mapping: "尖锐音色 ↔ 清爽/锋利感"
  - mapping: "低沉音色 ↔ 厚重/可靠感"
  - mapping: "明亮色彩 ↔ 活力/年轻感"
  - mapping: "圆润形状 ↔ 亲和/安全感"
  - mapping: "重量感 ↔ 高端/品质感"
```

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 感官线索丰富、一致、高度可识别 |
| +1 | 感官线索较好，部分维度强 |
| 0 | 感官线索一般，无明显特征 |
| -1 | 感官线索弱或不一致 |
| -2 | 感官体验混乱或负面 |

**输出**: `cue_dictionary`

---

### Step 5: 触点蓝图分析 (Touchpoint Blueprint)

**目的**: 评估关键触点的体验脚本与线索配方

**关键触点**：

| 触点类型 | 评估维度 |
|----------|----------|
| **广告** | 信息传达、情绪唤起、品牌识别 |
| **包装** | 视觉吸引、开箱体验、信息层次 |
| **门店/展厅** | Servicescape、空间动线、服务交互 |
| **APP/网站** | 界面体验、功能流畅、情绪设计 |
| **客服** | 响应速度、解决能力、情绪管理 |
| **交付/开箱** | 期待管理、惊喜设计、首次体验 |
| **售后** | 问题解决、信任修复、结尾体验 |
| **社区** | 归属感、UGC、身份认同 |

**Servicescape评估**（服务业/零售）：
```yaml
servicescape:
  ambient_conditions: "温度/音乐/气味/灯光"
  spatial_layout: "动线/区域划分/密度"
  signs_symbols: "标识/装饰/主题"
  social_factors: "员工/其他顾客"
```

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 全触点体验一致、峰值明确、结尾出色 |
| +1 | 多数触点体验好，有峰值设计 |
| 0 | 触点体验一般，无明显设计 |
| -1 | 部分触点体验差，存在断点 |
| -2 | 触点体验混乱、负面体验多 |

**输出**: `touchpoint_blueprint`

---

### Step 6: 可识别资产分析 (Distinctive Assets)

**理论基础**: Byron Sharp - 心智可得性 (Mental Availability)

**目的**: 评估品牌可识别资产的强度与覆盖

**资产类型**：

| 类型 | 示例 | 评估维度 |
|------|------|----------|
| **颜色** | Tiffany蓝、可口可乐红 | 独特性、一致性、联想强度 |
| **形状** | Apple圆角、Nike Swoosh | 辨识度、跨媒体一致性 |
| **音效** | Intel音效、微信提示音 | 识别率、情绪关联 |
| **角色** | 天猫猫头、京东狗 | 好感度、记忆度 |
| **口号** | Just Do It、Think Different | 传播度、品牌关联 |
| **动效** | Apple动效、Google动效 | 流畅感、品牌一致性 |
| **字体** | 品牌专属字体 | 辨识度、一致性 |

**资产分类**：
```yaml
dba_register:
  core_assets:  # 3个必须长期固定
    - asset: "[资产名]"
      type: "[颜色/形状/音效/...]"
      distinctiveness: "高/中/低"
      consistency: "高/中/低"
      evidence: "[证据]"

  flexible_assets:  # 5-10个可变资产
    - asset: "[资产名]"
      type: "[类型]"
      usage: "[使用场景]"
```

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 核心资产强势、高度可识别、长期一致 |
| +1 | 有明确核心资产，识别度较高 |
| 0 | 资产存在但识别度一般 |
| -1 | 资产模糊或不一致 |
| -2 | 无可识别资产或频繁变化 |

**输出**: `dba_register`

---

### Step 7: 假设与验证分析 (Hypotheses & Tests)

**目的**: 为每个核心线索建立可证伪假设

**假设模板**：
```yaml
hypothesis_template:
  cue: "[核心线索]"
  touchpoint: "[触点]"
  if_then: "If 用户接触到{线索}，Then {联想/识别/记忆/选择}提升{指标}"
  falsification: "If 不提升或引发反向联想 → 线索无效/不一致"
```

**测试维度**：

| 维度 | 测试方法 | 指标 |
|------|----------|------|
| **识别** | 不露品牌名能否认出 | 识别率% |
| **联想** | 是否联想到目标承诺 | 联想准确率% |
| **记忆** | 24h/7d后能否回忆 | 回忆率% |
| **行为** | 是否影响选择 | 转化率/复购率/溢价意愿 |

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 有明确假设、有验证数据、假设成立 |
| +1 | 有假设、部分验证 |
| 0 | 假设模糊、无验证 |
| -1 | 假设不成立或数据矛盾 |
| -2 | 无假设、无验证、纯主观判断 |

**输出**: `test_plan`

---

### Step 8: 护城河映射 (Moat Mapping)

**目的**: 将体验与感官系统映射到护城河机制

**体验→护城河映射**：

| 体验维度 | 护城河类型 | 机制 |
|----------|------------|------|
| **习惯/默认 (Act)** | 切换成本 | 行为惯性、学习曲线 |
| **情绪峰值 (Feel)** | 品牌溢价 | 情感连接、溢价意愿 |
| **社群/身份 (Relate)** | 网络效应 | 社交锁定、身份认同 |
| **感官识别 (Sense)** | 心智垄断 | 品类联想、搜索默认 |
| **信任/安全 (Think)** | 风险降低 | 决策简化、信任成本 |

**护城河贡献度评估**：
```yaml
moat_contribution:
  switching_cost:
    from_experience: "Act模块 + 习惯形成"
    contribution: "高/中/低"
    evidence: "[证据：留存率、迁移成本]"

  brand_premium:
    from_experience: "Feel模块 + 情绪价值"
    contribution: "高/中/低"
    evidence: "[证据：溢价%、价格弹性]"

  network_effect:
    from_experience: "Relate模块 + 社群"
    contribution: "高/中/低"
    evidence: "[证据：社群规模、UGC量]"

  mental_monopoly:
    from_experience: "Sense模块 + 可识别资产"
    contribution: "高/中/低"
    evidence: "[证据：品类联想、搜索份额]"

  trust_barrier:
    from_experience: "Think模块 + 信任积累"
    contribution: "高/中/低"
    evidence: "[证据：NPS、复购率]"
```

**输出**: `moat_mapping`

---

## 评分体系 (Scoring System)

### 8模块评分

| 模块 | 权重 | 评分范围 |
|------|------|----------|
| S1_CEP | 15% | -2 to +2 |
| S2_Brand_Ladder | 12% | -2 to +2 |
| S3_Experience_5D | 18% | -2 to +2 |
| S4_Sensory | 12% | -2 to +2 |
| S5_Touchpoint | 13% | -2 to +2 |
| S6_DBA | 15% | -2 to +2 |
| S7_Hypotheses | 8% | -2 to +2 |
| S8_Moat | 7% | -2 to +2 |

### BrandExp_Score计算

```
BrandExp_Score = Σ(模块分数 × 权重) × 25 + 50
其中: 分数 ∈ [-2, +2], BrandExp_Score ∈ [0, 100]
```

### 评级标准

| BrandExp_Score | 评级 | 投资含义 |
|----------------|------|----------|
| 80-100 | **Excellent** | 品牌体验是核心护城河，支撑高溢价 |
| 65-79 | **Good** | 品牌体验是竞争优势，有溢价能力 |
| 50-64 | **Average** | 品牌体验一般，依赖其他竞争要素 |
| 35-49 | **Below Average** | 品牌体验弱，易被替代 |
| 0-34 | **Poor** | 品牌体验负向，拖累业务 |

---

## 输出产物 (Deliverables)

### D1: Brand Experience Card

```yaml
brand_experience_card:
  company: "[公司名称]"
  brand: "[品牌名称]"
  business_model: "[商业模式]"
  as_of_date: "YYYY-MM-DD"

  # 综合评分
  brandexp_score: "[0-100]"
  rating: "[Excellent/Good/Average/Below Average/Poor]"

  # 模块评分
  module_scores:
    S1_CEP: {score: "[-2,+2]", rationale: "..."}
    S2_Brand_Ladder: {score: "[-2,+2]", rationale: "..."}
    S3_Experience_5D: {score: "[-2,+2]", rationale: "..."}
    S4_Sensory: {score: "[-2,+2]", rationale: "..."}
    S5_Touchpoint: {score: "[-2,+2]", rationale: "..."}
    S6_DBA: {score: "[-2,+2]", rationale: "..."}
    S7_Hypotheses: {score: "[-2,+2]", rationale: "..."}
    S8_Moat: {score: "[-2,+2]", rationale: "..."}

  # 关键发现
  key_strengths: ["强项1", "强项2"]
  key_weaknesses: ["弱项1", "弱项2"]
  competitor_comparison: "[vs竞品的体验差异]"
```

### D2: CEP Map

```yaml
cep_map:
  primary_ceps:
    - context: "[情境]"
      trigger: "[触发]"
      brand_association: "高/中/低"
      competitors_in_cep: ["竞品1", "竞品2"]

  mental_availability:
    first_mention: "是/否"
    top_3_mention: "是/否"
    search_share: "[%]"
```

### D3: Brand Ladder

```yaml
brand_ladder:
  attributes: ["属性1", "属性2"]
  consequences: ["后果1", "后果2"]
  emotional_benefits: ["情绪收益1", "情绪收益2"]
  identity_narrative: "[身份叙事]"
  core_promise: "[核心承诺]"
  proof_point: "[证据点]"
  anti_claim: "[禁区]"
```

### D4: 5D Experience Matrix

```yaml
experience_matrix:
  sense: {score, elements, consistency}
  feel: {score, emotion, peaks}
  think: {score, stimulation, problem_solving}
  act: {score, habit, switching_cost}
  relate: {score, community, identity}
```

### D5: Cue Dictionary

```yaml
cue_dictionary:
  visual: [{cue, purpose, consistency}]
  auditory: [{cue, purpose, consistency}]
  tactile: [{cue, purpose, consistency}]
  digital: [{cue, purpose, consistency}]
  crossmodal_mappings: [{from, to, effect}]
```

### D6: DBA Register

```yaml
dba_register:
  core_assets:
    - {asset, type, distinctiveness, consistency}
  flexible_assets:
    - {asset, type, usage}
  mental_availability_score: "[1-5]"
```

### D7: Moat Mapping

```yaml
moat_mapping:
  switching_cost: {contribution, evidence}
  brand_premium: {contribution, evidence, estimated_premium_pct}
  network_effect: {contribution, evidence}
  mental_monopoly: {contribution, evidence}
  trust_barrier: {contribution, evidence}
  overall_moat_contribution: "[高/中/低]"
```

### D8: Investment Implications

```yaml
investment_implications:
  brand_premium_estimate:
    premium_over_generic: "[X]%"
    pricing_power: "强/中/弱"
    evidence: "[证据]"

  retention_from_experience:
    habit_driven_retention: "高/中/低"
    emotion_driven_retention: "高/中/低"
    community_driven_retention: "高/中/低"

  cac_efficiency:
    mental_availability_impact: "[降低CAC X%]"
    word_of_mouth_strength: "强/中/弱"

  risk_factors:
    experience_consistency_risk: "高/中/低"
    competitive_erosion_risk: "高/中/低"
    brand_fatigue_risk: "高/中/低"

  monitoring_kpis:
    - "NPS趋势"
    - "品牌搜索份额"
    - "溢价意愿变化"
    - "复购率"
```

---

## 快速模板 (Quick Templates)

### Brand Script Template

```
我在{情境/触发}需要{任务}，想获得{情绪收益}并体现{身份}；
我选择{品牌}因为它用{证据/体验}让我立刻感到{主联想}。
```

### Cue Hypothesis Template

```
If 用户接触到{核心线索}（在{触点}），
Then {联想/识别/记忆/选择}提升{指标}；
否则视为无效或不一致，需替换线索。
```

---

## 与Agent架构的整合

### Research Mechanism 整合（主）

```yaml
research_mechanism_integration:
  capability: "brand_experience_analysis"

  triggers:
    - "分析品牌体验"
    - "评估品牌资产"
    - "品牌护城河分析"
    - "心智可得性评估"
    - "消费品公司分析"

  input_from_other_skills:
    - skill: "moat_evaluation"
      fields: ["brand_moat_signals"]
      usage: "品牌护城河评估输入"

  output_feeds_to:
    - skill: "moat_evaluation"
      field: "brand_experience_strength"
      usage: "护城河品牌维度评分"

    - skill: "valuation_engine"
      field: "brand_premium_estimate"
      usage: "估值中的品牌溢价"
```

### Ecosystem Graph 整合

```yaml
ecosystem_graph_integration:
  capability: "brand_touchpoint_mapping"

  output_feeds_to:
    - skill: "product_matrix_network"
      field: "brand_experience_edges"
      usage: "品牌体验作为边强度"
```

---

## Contract Compliance v2.0

### Core Principles Alignment

| 原则 | 本Skill实现 |
|------|-------------|
| **Contract-first** | 8步工作流 + 8个标准输出产物 |
| **Eval-first** | BrandExp_Score可量化 + 模块评分可追溯 |
| **SRE-first** | 假设可证伪 + 监控KPI明确 |

### Claims Type Annotation (5类)

| 组件 | Claim类型 | 重要性 | 要求 |
|------|-----------|--------|------|
| CEP分析 | CAUSAL_INFERENCE | critical | 需用户研究证据 |
| 品牌阶梯 | CAUSAL_INFERENCE | critical | 需用户访谈/调研 |
| 5D模块评分 | FACT_DESCRIPTIVE | critical | 需体验数据 |
| 感官线索 | FACT_DESCRIPTIVE | supporting | 需可观测证据 |
| DBA评估 | FACT_DESCRIPTIVE | critical | 需识别度数据 |
| 护城河贡献 | CAUSAL_INFERENCE | critical | 需因果链验证 |
| 品牌溢价估算 | VALUATION_IMPLIED | supporting | 需价格数据 |
| 投资建议 | ACTION_RECOMMENDATION | optional | 需多方验证 |

### Evidence Registry (Dual Threshold)

```yaml
evidence_requirements:
  quantity_threshold:
    tier_1_min: 3  # 用户研究/体验数据至少3个
    total_min: 6   # 总证据≥6

  coverage_threshold:
    key_modules: ["S1_CEP", "S3_Experience_5D", "S6_DBA", "S8_Moat"]
    min_coverage: 0.75  # ≥3/4关键模块有证据

  tiering:
    tier_1: "用户研究、体验数据、识别度测试、价格数据"
    tier_2: "行业报告、竞品分析、专家访谈"
    tier_3: "媒体报道、主观判断、推断"
```

### Kill Switches

**Mandatory (3个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-EVIDENCE-FABRICATION | 证据造假/幻觉检测 | 3.0 | 任一模块评分无法溯源 |
| KS-TOOL-OVERREACH | 工具越权 | 3.0 | 调用未授权外部API |
| KS-HIGH-RISK-OUTPUT | 高风险输出 | 3.0 | 高评分但无证据支撑 |

**Domain-Specific (4个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-BE-001 | 品牌阶梯断裂 | 2.5 | 无情绪/身份层但评分高 |
| KS-BE-002 | DBA不一致 | 2.5 | 核心资产频繁变化 |
| KS-BE-003 | 体验负面证据 | 3.0 | NPS<0或投诉率上升>50% |
| KS-BE-004 | 护城河映射无效 | 2.0 | 体验强但无护城河证据 |

### Threat Model

```yaml
threat_model:
  risk_types:
    - "幻觉风险: 虚构品牌体验或用户反馈"
    - "确认偏误: 只找支持高评分的证据"
    - "时效风险: 使用过时的品牌认知数据"

  protection:
    - "每个模块评分必须有rationale"
    - "负面证据强制检查"
    - "数据时效标注"

  content_zones:
    green: "可观测体验数据"
    yellow: "护城河映射、溢价估算"
    red: "投资建议"
```

### Observability & Replay

```yaml
observability:
  run_id: "自动生成UUID"
  tool_calls: "记录所有数据获取"
  gate_scores: "记录8模块评分"
  brandexp_score_breakdown: "完整评分明细"

replay:
  enabled: true
  inputs_logged: "target, business_model, customer_job, moments_of_truth"
  outputs_logged: "完整8个产物"
```

### Budget

```yaml
budget:
  tokens:
    soft: 18000
    hard: 30000
    critical: 40000
  tool_calls:
    soft: 12
    hard: 20
  latency_ms:
    soft: 60000
    hard: 120000
```

### Quality Checks

```yaml
quality_checks:
  P0_blocking:
    - "8步工作流完成"
    - "BrandExp_Score计算正确"
    - "关键模块有证据"
    - "无Kill Switch触发"

  P1_important:
    - "每个模块有rationale"
    - "竞品对比完成"
    - "护城河映射有依据"
    - "投资含义明确"

  pass_rule: "P0: 100%, P1: ≥85%"

  hard_fail_triggers:
    - "CEP分析缺失但评分高"
    - "DBA无核心资产但评分高"
    - "任一Mandatory Kill Switch触发"
```

### Red Flags (Required)

```yaml
red_flags:
  - flag: "RF-BE-001"
    condition: "品牌体验与竞品高度同质"
    action: "下调S6_DBA评分"

  - flag: "RF-BE-002"
    condition: "NPS下降趋势"
    action: "警告体验恶化风险"

  - flag: "RF-BE-003"
    condition: "核心资产近期变化"
    action: "重新评估DBA强度"

  - flag: "RF-BE-004"
    condition: "溢价无法验证"
    action: "标注品牌溢价为推断"
```

### Falsification Design

```yaml
falsification:
  alternative_hypotheses:
    - "品牌体验强但不是用户选择的主因"
    - "可识别资产存在但无商业价值"
    - "情绪收益被功能价值主导"

  sensitivity_tests:
    - "去掉品牌logo，体验感知变化多少"
    - "价格提升10%，需求弹性如何"
    - "竞品改进体验，份额变化多少"

  disconfirming_evidence_plan:
    - "季度: 追踪NPS和品牌搜索份额"
    - "半年: 验证溢价意愿变化"
    - "年度: 复盘体验→留存因果链"
```

### Eval & Regression

```yaml
eval:
  self_score:
    dimensions:
      - "8步工作流完整性"
      - "模块评分准确性"
      - "护城河映射有效性"
    range: "[0, 1]"

  calibration_hook:
    trigger: "输出完成后"
    check: "BrandExp_Score与后续业绩相关性回溯"

  golden_cases:
    - case: "Apple (强品牌体验)"
      expected_score: "85-95"
      expected_moat: "高贡献"

    - case: "白牌快消品"
      expected_score: "30-45"
      expected_moat: "低贡献"

    - case: "新兴DTC品牌"
      expected_score: "55-70"
      expected_moat: "中贡献"
```

### Evaluation Alignment

| 维度 | 权重 | 本Skill评估点 |
|------|------|---------------|
| 深度 | 30% | 8步穿透至体验机制 |
| 证据 | 25% | 体验数据+用户研究支撑 |
| 可操作 | 20% | 投资含义明确可用 |
| 一致性 | 15% | 模块间逻辑一致 |
| 时效性 | 10% | 数据时效标注 |

### DEGRADE Mode Playbook

```yaml
degrade_mode:
  triggers:
    - "部分模块数据不足"
    - "用户研究数据缺失"
    - "竞品对比数据不足"

  actions:
    - "输出标注: [DEGRADE] 分析受限"
    - "标注具体受限模块"
    - "BrandExp_Score附加置信区间"

  recovery:
    - "补充用户研究"
    - "获取体验测试数据"
    - "补充竞品对比"
```

### Blackboard Outputs (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "research_mechanism.brand_experience_analysis_v1.0"
    skill_version: "v1.0"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]

  extended_fields:
    brandexp_score: {type: "integer", range: "0-100"}
    rating: {type: "enum", values: ["Excellent", "Good", "Average", "Below Average", "Poor"]}
    module_scores: {type: "object", schema: "{S1..S8: {score, rationale}}"}
    cep_map: {type: "object"}
    brand_ladder: {type: "object"}
    experience_matrix: {type: "object"}
    dba_register: {type: "object"}
    moat_mapping: {type: "object"}
    brand_premium_estimate: {type: "object"}
    investment_implications: {type: "object"}
```

---

**版本**: v1.0
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/research_mechanism/`
**状态**: 新建，v2.0合约兼容
