# 网络效应评估框架 v1.1

> **Skill ID**: `ecosystem_graph.network_effect_evaluator_v1.1`
> **主路由**: Ecosystem Graph (70%)
> **辅助路由**: Research Mechanism (20%), Quality Gate (10%)
> **理论基础**: Rochet & Tirole (双边市场) / Katz & Shapiro (网络外部性) / Farrell & Klemperer (切换成本) / Eisenmann-Parker-Van Alstyne (平台策略)
> **归档日期**: 2026-01-27

---

## Skill 用途

评估一个业务是否存在**可规模化、可防守、可变现**的网络效应，并输出：
1. **NE_Score (0-100)**: 网络效应强度综合得分
2. **Tipping_Likelihood**: 高/中/低（是否能"赢家通吃"）
3. **主要瓶颈**: 需求/供给/治理/冷启动/多归属/兼容性
4. **反证条件 + 监控触发器**: 2-4季度内可验证

**适用场景**：
- 当 `moat_evaluation` 识别出网络效应是潜在护城河时，调用本skill深度评估
- 当 `product_matrix_network` 发现NETWORK_EFFECTS边时，调用本skill量化强度
- 独立评估平台/双边市场/生态系统型业务

---

## 理论锚点 (Theory Anchors)

| 理论 | 作者 | 核心观点 | 本Skill应用 |
|------|------|----------|-------------|
| 双边市场定价 | Rochet & Tirole | 价格结构比价格水平更重要，跨边外部性决定补贴策略 | M3_PricingStructure |
| 网络外部性与兼容性 | Katz & Shapiro | 兼容性降低切换成本，影响tipping可能性 | M6_MultiHomingSwitching |
| 切换成本与锁定 | Farrell & Klemperer | 多归属(multi-homing)削弱赢家通吃 | M6_MultiHomingSwitching |
| 平台策略与赢家通吃 | Eisenmann/Parker/Van Alstyne | 网络效应强度×切换成本×多归属率决定集中度 | TippingAssessment |

---

## 输入参数 (Inputs)

```yaml
inputs:
  required:
    - name: "NetworkType"
      options: ["信息撮合", "交易闭环", "服务撮合", "硬件+软件", "数据+模型", "生态系统"]
      description: "网络的基本形态"

    - name: "Sides"
      description: "需求侧、供给侧（可多侧：广告主/开发者/内容方/支付方等）"

    - name: "CoreEvent"
      description: "核心价值事件：匹配/交易/交付/协作/内容消费/模型推理"

    - name: "Geo"
      options: ["强地域性", "弱地域性"]
      description: "是否需要本地密度"

    - name: "Frequency"
      options: ["高频", "低频", "高频带低频组合"]
      description: "交互频次特征"

  optional:
    - name: "DataAvailable"
      description: "可用数据：获客、留存、复购/交易频次、匹配成功率、等待时间、供需缺口、多归属率、推荐率、投诉率、作弊率、抽成/ARPU等"
```

---

## 11模块评分体系 (Scoring System) - v1.1升级

**评分范围**: 每模块 -2 到 +2
**加权汇总**: NE_Score = 0-100

| 模块 | 权重 | 核心问题 |
|------|------|----------|
| M1_MarketCeiling | 7% | 市场天花板来自需求还是供给？ |
| M2_Mechanism | 11% | 是真网络效应还是仅规模？ |
| M3_PricingStructure | 7% | 价格结构是否优化了跨边外部性？ |
| M4_LiquidityDensity | 9% | 流动性密度够吗？冷启动怎么破？ |
| M5_StandardizationIntegration | 8% | 服务标准化程度如何？ |
| M6_MultiHomingSwitching | 11% | 多归属和切换成本如何？ |
| M7_NegativeNetworkEffects | 8% | 负网络效应何时占主导？ |
| M8_ViralGameTheory | 6% | 病毒传播是正和还是零和？ |
| M9_DataLearningLoop | 8% | 数据飞轮是否形成？ |
| **M10_DataNetworkEffect** | **15%** | **数据积累带来的边际价值提升？** |
| **M11_AIFlywheel** | **10%** | **AI训练闭环是否加速飞轮？** |

**v1.1升级说明**: 新增M10、M11模块专门量化数据网络效应和AI飞轮，适用于科技平台公司（Google/Meta/Amazon等）。原有模块权重按比例下调。

**评分转换**：
```
NE_Score = Σ(模块分数 × 权重) × 25 + 50
其中: 分数 ∈ [-2, +2], NE_Score ∈ [0, 100]
```

---

## 工作流 (Workflow)

### M1: 市场天花板 (Market Ceiling) - 10%

**检查项**：
1. **可触达市场N**: 潜在节点总量、可渗透比例、法规/渠道/装机/供应链限制
2. **需求天花板**: 天然低频？强季节？强替代？结构性需求上限？
3. **供给天花板**: 供给稀缺？培养慢？强资质/强监管？质量离散大？

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 需求+供给均无明显天花板，可触达市场极大 |
| +1 | 单边有轻微限制，但可扩展 |
| 0 | 中性，需观察 |
| -1 | 单边有明显天花板 |
| -2 | 双边均有严格天花板，市场规模受限 |

**输出**: 结论 - 最大上限来自"需求"还是"供给"还是"治理成本"

---

### M2: 网络效应机制 (Mechanism) - 15%

**检查项**：
1. **同侧网络效应**: 同类用户越多，内容/社交/协作价值越大？
2. **跨侧网络效应**: 一侧增长是否显著提升另一侧匹配/成交/收入？（双边市场核心）
3. **仅规模 vs 真网络**: 用户多但价值不提升（例如仅广告堆量）= 假网络效应

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 强同侧+强跨侧，边际价值递增明显 |
| +1 | 有跨侧效应但同侧弱，或反之 |
| 0 | 效应不明确或数据不足 |
| -1 | 效应弱，更像规模经济而非网络效应 |
| -2 | 无真正网络效应，仅靠规模/补贴 |

**关键指标**: 匹配成功率vs用户规模相关性、跨边弹性系数

---

### M3: 定价结构 (Pricing Structure) - 10%

> **理论锚点**: Rochet & Tirole - "价格结构而非价格水平"

**检查项**：
1. **价格结构优化**: 哪一侧是强吸引侧/弱吸引侧？谁需要补贴"上船"？
2. **跨边弹性**: 补贴一侧是否能显著拉动另一侧增长（外部性强→结构更重要）
3. **收费与风控**: 收费点是否与"价值事件"绑定（撮合费/交易费/订阅/抽成）

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 定价结构精准利用跨边外部性，收费点与价值事件对齐 |
| +1 | 定价基本合理但有优化空间 |
| 0 | 中性/传统定价 |
| -1 | 定价结构有问题，补贴错误一方 |
| -2 | 定价严重失衡，或收费点与价值脱钩 |

---

### M4: 流动性密度 (Liquidity Density) - 12%

**检查项**：
1. **流动性 = 有效匹配概率**: 匹配成功率、等待时间、成交率、供需缺口
2. **密度口袋**: 最密集区域/人群/垂类在哪里？能否"先打穿再外扩"
3. **原子网络N₀**: 冷启动所需最小供需节点；启动共同特性（地理/组织/链条上下游）

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 流动性极高，匹配效率>90%，等待时间极短 |
| +1 | 流动性良好，有明确密度口袋 |
| 0 | 流动性一般，存在供需缺口 |
| -1 | 流动性不足，匹配效率低 |
| -2 | 严重流动性问题，冷启动困难 |

**关键指标**: 匹配成功率、平均等待时间、供需比、冷启动N₀

---

### M5: 标准化与整合 (Standardization & Integration) - 10%

**检查项**：
1. **交易/服务拆解**: 几步？哪些可标准化？哪些强非标？
2. **整合难度**: 步骤衔接、质量控制、售后纠纷、履约不确定性
3. **平台价值 vs 个人价值**: 平台价值>单人价值？还是强依赖个人？

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 高度标准化，平台价值远大于个人价值 |
| +1 | 中等标准化，平台有增量价值 |
| 0 | 部分标准化，部分非标 |
| -1 | 非标为主，平台价值有限 |
| -2 | 强非标，强依赖个人，平台仅是信息中介 |

---

### M6: 多归属与切换 (Multi-Homing & Switching) - 15%

> **理论锚点**: Farrell & Klemperer, Katz & Shapiro

**检查项**：
1. **多归属率**: 用户/供给是否同时在多平台活跃（会显著削弱赢家通吃）
2. **切换成本**: 数据/关系/工作流/合规认证/硬件锁定/学习成本
3. **兼容性与可迁移性**: 接口开放、数据可携带、跨平台互通会降低锁定（反之增强）

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 多归属极低(<10%)，切换成本极高，兼容性低 |
| +1 | 多归属较低(10-30%)，切换成本较高 |
| 0 | 多归属中等(30-50%)，切换成本一般 |
| -1 | 多归属较高(50-70%)，切换成本较低 |
| -2 | 多归属极高(>70%)，切换成本极低，完全可迁移 |

**输出**: 结论 - 护城河主要来自"锁定"还是"网络规模"还是"生态互补"

---

### M7: 负网络效应 (Negative Network Effects) - 10%

**检查项**：
1. **拥堵/稀释**: 规模增大导致等待时间↑、噪声↑、质量↓、作弊↑、内卷↑
2. **治理成本曲线**: 风控/审核/客服/履约成本是否吞噬规模经济
3. **收益递增 vs 递减**: 新增参与者是否提升"所有人"的单位收益，还是挤压存量

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 负网络效应极弱，规模越大体验越好 |
| +1 | 负网络效应可控，治理成本线性增长 |
| 0 | 负网络效应与正效应大致平衡 |
| -1 | 负网络效应明显，治理成本超线性增长 |
| -2 | 负网络效应主导，规模越大问题越多 |

**关键指标**: 作弊率、投诉率、单位治理成本、质量评分vs规模相关性

---

### M8: 病毒与博弈 (Viral & Game Theory) - 8%

**检查项**：
1. **推荐是零和还是正和**: 是否因同行竞争/资源争夺抑制口碑
2. **激励兼容**: 推荐/补贴是否诱发刷单、劣币驱逐良币
3. **社会传播 vs 网络效应**: 病毒传播是"营销放大器"还是网络效应本体？

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 强正和博弈，用户天然愿意推荐，无激励扭曲 |
| +1 | 正和为主，激励机制基本健康 |
| 0 | 中性，病毒效应有限 |
| -1 | 存在零和博弈，推荐动机受抑制 |
| -2 | 激励严重扭曲，刷单/作弊盛行 |

---

### M9: 数据学习闭环 (Data Learning Loop) - 8%

**检查项**：
1. **数据-学习-体验闭环**: 用户越多→数据越好→匹配/推荐/模型越好→留存越强（可形成复利）
2. **数据专有性**: 是否难以被竞品复制（来源独占、反馈高频、标注/标签沉淀）
3. **低频弥补**: 能否通过"心智占领+数据沉淀"弥补低频劣势

**评分标准**：
| 分数 | 状态 |
|------|------|
| +2 | 强数据飞轮，数据专有且高频反馈 |
| +1 | 有数据闭环但未形成明显优势 |
| 0 | 数据作用中性 |
| -1 | 数据可被复制或低频难以积累 |
| -2 | 无数据优势或数据反而成为负担 |

---

### M10: 数据网络效应 (Data Network Effect) - 15% [v1.1新增]

> **理论锚点**: Varian & Shapiro (1999) - 数据作为网络外部性来源

**定义**: 用户增加→数据量/质提升→产品/服务质量提升→吸引更多用户

**与M9的区别**: M9关注"是否存在数据闭环"，M10量化"数据闭环带来的竞争优势强度"

**检查项**：
1. **数据量级优势**: 数据量级对比竞争者（用户数×数据点/用户×历史深度）
2. **数据独特性**: 数据来源的独占程度（只有我能采集 vs 公开可获得）
3. **边际效用曲线**: 新增数据是否仍有边际价值？（是否进入收益递减区）
4. **竞争者追赶时间**: 假设竞争者无限资金，需要多少年追平数据优势？

**评分标准**：
| 分数 | 状态 | 追赶时间 |
|------|------|----------|
| +2 | 不可逾越的数据优势，数据来源完全独占 | >10年 |
| +1 | 强数据优势，来源难以复制 | 5-10年 |
| 0 | 有数据优势但非决定性 | 2-5年 |
| -1 | 数据优势有限，可被快速追赶 | 1-2年 |
| -2 | 无数据优势，数据为公共资源 | <1年 |

**量化指标**：
```yaml
data_network_effect_metrics:
  data_volume:
    users: "用户数（亿）"
    data_points_per_user: "每用户数据点/天"
    historical_depth: "历史数据年限"
    total_estimate: "users × points × 365 × years"

  data_uniqueness:
    exclusivity_score: "1-10 (10=完全独占)"
    collection_difficulty: "竞争者采集同类数据的成本($)"
    regulatory_protection: "是否有监管壁垒保护"

  marginal_utility:
    current_position: "收益递增/平台期/递减"
    inflection_point: "预计何时进入递减区"

  competitive_gap:
    closest_competitor: "最近竞争者数据量级"
    gap_ratio: "我方/竞争者"
    catch_up_time_estimate: "追赶时间（年）"
```

**示例评分**：
| 公司 | 数据资产 | 量级优势 | 独特性 | 追赶时间 | 得分 |
|------|----------|----------|--------|----------|------|
| Google Search | 搜索意图 | 10x | 极高 | >15年 | +2 |
| Meta | 社交图谱 | 3x | 高 | 8-10年 | +1.5 |
| Netflix | 观看偏好 | 2x | 中 | 3-5年 | +0.5 |
| 传统零售 | 交易数据 | 1x | 低 | <1年 | -1 |

---

### M11: AI飞轮效应 (AI Flywheel) - 10% [v1.1新增]

> **理论锚点**: AI时代特有的网络效应形态

**定义**: 更多用户→更多训练数据→更好AI模型→更好产品→更多用户

**与M10的区别**: M10是通用数据网络效应，M11专注于AI/ML模型训练形成的闭环

**检查项**：
1. **数据→模型转化**: 用户数据是否有效用于模型训练？（还是只用于规则系统）
2. **模型→产品转化**: 更好模型是否显著提升用户体验？（可量化的提升）
3. **闭环速度**: 从数据采集到模型改进到产品上线的周期（日/周/月）
4. **反馈信号质量**: 用户反馈是否足够丰富以支撑有监督学习？

**评分标准**：
| 分数 | 状态 | 闭环特征 |
|------|------|----------|
| +2 | 完美AI闭环，数据→模型→产品全链路打通 | 日级迭代，用户体验随用户增长显著提升 |
| +1 | 强AI闭环，主要环节打通 | 周级迭代，有明确的模型驱动产品改进 |
| 0 | 有AI应用但闭环不完整 | 月级迭代，AI为辅助而非核心 |
| -1 | AI应用有限，数据利用率低 | 季度级或更慢，规则系统为主 |
| -2 | 无AI飞轮，传统业务模式 | 不适用AI或数据未用于模型训练 |

**量化框架**：
```yaml
ai_flywheel_metrics:
  data_to_model:
    training_data_utilization: "用于模型训练的数据比例（%）"
    labeling_method: "自动标注/人工标注/无监督"
    data_freshness: "训练数据时效（天）"

  model_to_product:
    ai_driven_features: "AI驱动功能占比（%）"
    model_improvement_rate: "模型性能提升速度（%/季度）"
    user_experience_impact: "AI功能对NPS/留存的贡献"

  flywheel_velocity:
    iteration_cycle: "从数据到模型上线的周期（天）"
    feedback_loop_completeness: "反馈闭环完整度（0-100%）"

  competitive_moat:
    model_gap_vs_competitors: "与竞争者模型性能差距"
    data_advantage_sustainability: "数据优势可持续性（年）"
```

**AI飞轮类型**：
| 类型 | 代表 | 闭环机制 | 典型得分 |
|------|------|----------|----------|
| **搜索AI飞轮** | Google | 搜索→点击→训练→更好排序 | +2 |
| **推荐AI飞轮** | TikTok/YouTube | 观看→反馈→推荐模型→更好推荐 | +2 |
| **自动驾驶飞轮** | Tesla FSD | 驾驶→标注→训练→更安全驾驶 | +1.5 |
| **对话AI飞轮** | ChatGPT | 对话→RLHF→模型→更好对话 | +1 |
| **传统软件** | Office | 无AI闭环 | -1 |

**示例（Google AI飞轮评估）**：
```yaml
google_ai_flywheel:
  data_to_model:
    search_queries_per_day: "85亿次"
    youtube_watch_hours: "10亿小时/天"
    training_utilization: ">90%"
    labeling: "隐式反馈（点击）+ 显式反馈"

  model_to_product:
    ai_driven_features: "95%+ (Search, Ads, YouTube, Maps)"
    gemini_integration: "全面整合中"
    user_impact: "搜索相关性提升约2-3%/年"

  flywheel_velocity:
    iteration_cycle: "日级（搜索质量）"
    feedback_completeness: "95%+"

  assessment:
    score: +2
    rationale: "最完整的AI飞轮之一，日级迭代，7×20亿用户提供海量训练数据"
```

---

## Tipping评估 (Tipping Assessment)

**Tipping更可能发生当且仅当**：

```
Tipping概率 ∝ (跨边外部性强) × (同侧外部性强) × (多归属低) × (切换成本高) × (兼容性低) × (负网络效应可控)
```

**评估逻辑**：

```yaml
tipping_assessment:
  high_likelihood:
    conditions:
      - "M2_Mechanism ≥ +1 (强网络效应)"
      - "M6_MultiHomingSwitching ≥ +1 (低多归属/高切换成本)"
      - "M7_NegativeNetworkEffects ≥ 0 (负效应可控)"
    evidence: "Eisenmann/Parker/Van Alstyne: 强网络效应+低多归属→赢家通吃"

  medium_likelihood:
    conditions:
      - "M2 ≥ 0 且 M6 ≥ 0"
      - "存在局部/垂直tipping可能"

  low_likelihood:
    conditions:
      - "M2 < 0 或 M6 < 0"
      - "多归属高企或负网络效应严重"
```

---

## 证伪设计 (Falsification)

### 核心反证条件 (Disconfirmers)

| ID | 反证条件 | 被推翻的结论 |
|----|----------|--------------|
| D1 | 新增用户并未提高匹配成功率/内容质量/成交率（无"边际价值递增"） | "存在真正网络效应" |
| D2 | 撤补贴后留存、复购、供给活跃显著塌陷（增长靠补贴而非网络） | "网络效应可持续" |
| D3 | 多归属长期高企(>50%)且切换成本低 | "能够tipping/赢家通吃" |
| D4 | 规模扩大导致拥堵/作弊/纠纷/治理成本超线性上升 | "规模是正向的" |

---

## 监控触发器 (Monitoring Triggers)

**时间窗口**: 2-4个季度

| 类别 | KPI | 含义 |
|------|-----|------|
| 效率 | 匹配成功率、等待时间、供需缺口、成交率/复购率 | 流动性健康度 |
| 锁定 | 多归属率、切换行为(迁移/导出)、价格结构变化 | 护城河强度 |
| 治理 | 作弊率/风控成本、单位治理成本、内容有效率(去噪后)、投诉/纠纷率 | 负网络效应 |
| 经济 | LTV/CAC（补贴收缩后的"真实LTV"）、抽成与供给留存 | 单位经济学健康 |

---

## 输出产物：NetworkEffectCard

```yaml
network_effect_card:
  # 基础信息
  company: "[公司/业务名称]"
  network_type: "[信息撮合/交易闭环/服务撮合/硬件+软件/数据+模型/生态系统]"
  core_event: "[核心价值事件]"
  as_of_date: "YYYY-MM-DD"

  # 评分
  ne_score: "[0-100]"
  module_scores:
    M1_MarketCeiling: {score: "[-2,+2]", rationale: "..."}
    M2_Mechanism: {score: "[-2,+2]", rationale: "..."}
    M3_PricingStructure: {score: "[-2,+2]", rationale: "..."}
    M4_LiquidityDensity: {score: "[-2,+2]", rationale: "..."}
    M5_StandardizationIntegration: {score: "[-2,+2]", rationale: "..."}
    M6_MultiHomingSwitching: {score: "[-2,+2]", rationale: "..."}
    M7_NegativeNetworkEffects: {score: "[-2,+2]", rationale: "..."}
    M8_ViralGameTheory: {score: "[-2,+2]", rationale: "..."}
    M9_DataLearningLoop: {score: "[-2,+2]", rationale: "..."}
    M10_DataNetworkEffect: {score: "[-2,+2]", rationale: "...", catch_up_time: "X年"}  # v1.1新增
    M11_AIFlywheel: {score: "[-2,+2]", rationale: "...", flywheel_velocity: "日/周/月"}  # v1.1新增

  # 阶段与瓶颈
  stage: "[起步/成长/成熟/衰退]"
  stage_evidence: "[支撑判断的证据]"
  primary_bottleneck: "[需求/供给/冷启动/治理/多归属/兼容性]"

  # Tipping评估
  tipping_likelihood: "[高/中/低]"
  tipping_key_factors: "[关键因子解释]"
  negative_threshold: "[负网络效应拐点：什么规模/条件下负效应占主导]"

  # 证伪与监控
  disconfirmers:
    - condition: "[反证条件1]"
      overturned_conclusion: "[被推翻的结论]"
    - condition: "[反证条件2]"
      overturned_conclusion: "[被推翻的结论]"

  monitoring_triggers:
    upgrade_conditions: "[什么情况下上调评分]"
    downgrade_conditions: "[什么情况下下调评分]"
    kill_conditions: "[什么情况下整个论点失效]"
    kpis: ["KPI1", "KPI2", "KPI3"]
```

---

## 与Agent架构的整合

### Ecosystem Graph 整合（主）

```yaml
ecosystem_graph_integration:
  capability: "network_effect_evaluation"

  triggers:
    - "评估网络效应"
    - "分析双边市场"
    - "评估tipping概率"
    - "分析多归属风险"

  input_from_other_skills:
    - skill: "product_matrix_network"
      fields: ["ecosystem_edges", "flywheels"]
      usage: "作为网络结构输入"

  output_artifact: "network_effect_card"
```

### Research Mechanism 整合

```yaml
research_mechanism_integration:
  capability: "network_effect_deep_dive"

  input_from_other_skills:
    - skill: "moat_evaluation"
      fields: ["moat_type", "network_effects_signals"]
      trigger: "当moat_type包含network_effects时调用"

  output_feeds_to:
    - skill: "moat_evaluation"
      field: "network_effect_strength"
      usage: "量化网络效应护城河强度"
```

### Quality Gate 整合

```yaml
quality_gate_integration:
  capability: "network_effect_quality_check"

  pass_conditions:
    - "9模块全部评分完成"
    - "Tipping评估有理有据"
    - "证伪条件≥3"

  degrade_conditions:
    - "部分模块数据不足"
    - "多归属率数据缺失"

  fail_conditions:
    - "核心反证条件已满足"
    - "数据严重不足无法评分"
```

---

## 使用示例

**示例：评估某网约车平台网络效应**

```yaml
network_effect_card:
  company: "某网约车平台"
  network_type: "服务撮合"
  core_event: "乘客-司机匹配与出行服务"

  ne_score: 62

  module_scores:
    M1_MarketCeiling: {score: +1, rationale: "城市可扩展但地域性强"}
    M2_Mechanism: {score: +1, rationale: "跨边效应明显：司机多→等待短→乘客多"}
    M3_PricingStructure: {score: +1, rationale: "乘客补贴拉动双边，收费点=成交"}
    M4_LiquidityDensity: {score: +2, rationale: "核心城市流动性极高，匹配<3分钟"}
    M5_StandardizationIntegration: {score: +1, rationale: "服务标准化程度高"}
    M6_MultiHomingSwitching: {score: -1, rationale: "司机多归属>60%，乘客多归属>40%"}
    M7_NegativeNetworkEffects: {score: 0, rationale: "高峰拥堵但动态定价缓解"}
    M8_ViralGameTheory: {score: 0, rationale: "推荐中性，无强病毒效应"}
    M9_DataLearningLoop: {score: +1, rationale: "路径优化+需求预测有数据优势"}

  primary_bottleneck: "多归属"
  tipping_likelihood: "低"
  tipping_key_factors: "司机多归属严重削弱赢家通吃，更可能区域性均衡"

  disconfirmers:
    - condition: "某区域第二名达到40%份额且稳定"
      overturned_conclusion: "该区域无法tipping"

  monitoring_triggers:
    kpis: ["多归属率", "司机月活留存", "撤补贴后订单变化"]
```

---

## Contract Compliance v2.0

### Core Principles Alignment

| 原则 | 本Skill实现 |
|------|-------------|
| **Contract-first** | 9模块评分 + NetworkEffectCard标准输出 |
| **Eval-first** | NE_Score可量化对比 + 模块分可追溯 |
| **SRE-first** | 反证条件 + 监控触发器 + Kill条件 |

### Claims Type Annotation (5类)

| 组件 | Claim类型 | 重要性 | 要求 |
|------|-----------|--------|------|
| 模块评分(M1-M9) | CAUSAL_INFERENCE | critical | 需因果链解释 |
| NE_Score | FACT_DESCRIPTIVE | critical | 需评分明细 |
| Tipping_Likelihood | FORECAST | critical | 需概率化表达 |
| Stage判断 | CAUSAL_INFERENCE | supporting | 需证据支撑 |
| Bottleneck识别 | CAUSAL_INFERENCE | critical | 需对比分析 |
| 监控建议 | ACTION_RECOMMENDATION | supporting | 需可执行KPI |

### Evidence Registry (Dual Threshold)

```yaml
evidence_requirements:
  quantity_threshold:
    tier_1_min: 2  # 至少2个一手来源
    total_min: 5   # 总证据≥5

  coverage_threshold:
    key_modules: ["M2_Mechanism", "M4_LiquidityDensity", "M6_MultiHomingSwitching"]
    min_coverage: 0.67  # ≥2/3关键模块有证据

  tiering:
    tier_1: "公司财报、IR演示、平台公开数据"
    tier_2: "行业报告、分析师研究、学术论文"
    tier_3: "媒体报道、用户调研、推断"
```

### Kill Switches

**Mandatory (3个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-EVIDENCE-FABRICATION | 证据造假/幻觉检测 | 3.0 | 任一模块评分无法溯源 |
| KS-TOOL-OVERREACH | 工具越权 | 3.0 | 调用未授权外部API |
| KS-HIGH-RISK-OUTPUT | 高风险输出 | 3.0 | 高NE_Score但无证据支撑 |

**Domain-Specific (5个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-NE-001 | 反证条件D1已满足 | 3.0 | 新增用户未提升匹配效率 |
| KS-NE-002 | 反证条件D2已满足 | 3.0 | 撤补贴后留存崩塌>50% |
| KS-NE-003 | 多归属失控 | 2.5 | 多归属率>80%且持续上升 |
| KS-NE-004 | 负网络效应主导 | 2.5 | M7评分<-1且恶化 |
| KS-NE-005 | 定价结构崩溃 | 2.0 | 收费点与价值事件脱钩 |

### Threat Model

```yaml
threat_model:
  risk_types:
    - "幻觉风险: 虚构网络效应机制"
    - "过度乐观: 高估tipping概率"
    - "忽视负效应: 低估治理成本"

  protection:
    - "每个模块评分必须有rationale"
    - "反证条件≥3强制检查"
    - "负网络效应(M7)单独评分"

  content_zones:
    green: "公开数据、评分计算"
    yellow: "Tipping预测、阶段判断"
    red: "投资建议"
```

### Observability & Replay

```yaml
observability:
  run_id: "自动生成UUID"
  tool_calls: "记录所有数据获取"
  gate_scores: "记录9模块评分"
  ne_score_breakdown: "完整评分明细"

replay:
  enabled: true
  inputs_logged: "NetworkType, Sides, CoreEvent, Geo, Frequency, DataAvailable"
  outputs_logged: "完整NetworkEffectCard"
```

### Budget

```yaml
budget:
  tokens:
    soft: 12000
    hard: 20000
    critical: 30000
  tool_calls:
    soft: 10
    hard: 18
  latency_ms:
    soft: 45000
    hard: 90000
```

### Quality Checks

```yaml
quality_checks:
  P0_blocking:
    - "9模块全部评分"
    - "NE_Score计算正确"
    - "Tipping_Likelihood有依据"
    - "反证条件≥3"
    - "无Kill Switch触发"

  P1_important:
    - "每个模块有rationale"
    - "监控KPI≥3"
    - "关键模块有Tier 1证据"
    - "阶段判断有证据"

  pass_rule: "P0: 100%, P1: ≥85%"

  hard_fail_triggers:
    - "反证条件已满足但未标记"
    - "M2评分<-1但NE_Score>60"
    - "任一Mandatory Kill Switch触发"
```

### Red Flags (Required)

```yaml
red_flags:
  - flag: "RF-NE-001"
    condition: "多归属率>50%"
    action: "下调M6评分，重估tipping"

  - flag: "RF-NE-002"
    condition: "撤补贴数据缺失"
    action: "标注证据不足，降低NE_Score置信度"

  - flag: "RF-NE-003"
    condition: "治理成本增速>收入增速"
    action: "下调M7评分，警告负网络效应"

  - flag: "RF-NE-004"
    condition: "匹配成功率与规模负相关"
    action: "Kill Switch触发，网络效应论点失效"
```

### Falsification Design

```yaml
falsification:
  alternative_hypotheses:
    - "增长来自补贴而非网络效应"
    - "锁定来自惯性而非切换成本"
    - "流动性来自局部密度而非网络规模"

  sensitivity_tests:
    - "多归属率±20%对Tipping判断影响"
    - "补贴归零对留存影响"
    - "规模2x时治理成本是否2x以上"

  disconfirming_evidence_plan:
    - "季度: 追踪多归属率变化"
    - "季度: 监控匹配效率vs规模相关性"
    - "半年: 验证撤补贴后留存"
```

### Eval & Regression

```yaml
eval:
  self_score:
    dimensions:
      - "9模块评分完整性"
      - "Tipping判断准确性"
      - "反证条件覆盖度"
    range: "[0, 1]"

  calibration_hook:
    trigger: "输出完成后"
    check: "NE_Score与后续市场集中度变化回溯"

  golden_cases:
    - case: "美团(强本地网络效应)"
      expected_ne_score: "70-80"
      expected_tipping: "High(区域性)"

    - case: "滴滴(多归属严重)"
      expected_ne_score: "55-65"
      expected_tipping: "Medium"

    - case: "传统电商(弱网络效应)"
      expected_ne_score: "40-50"
      expected_tipping: "Low"
```

### Evaluation Alignment

| 维度 | 权重 | 本Skill评估点 |
|------|------|---------------|
| 深度 | 30% | 9模块穿透至机制层 |
| 证据 | 25% | Dual Threshold满足 |
| 可操作 | 20% | 监控KPI可执行 |
| 一致性 | 15% | 模块间逻辑一致 |
| 时效性 | 10% | 数据时效标注 |

### DEGRADE Mode Playbook

```yaml
degrade_mode:
  triggers:
    - "部分模块数据不足"
    - "多归属率数据缺失"
    - "补贴效应难以分离"

  actions:
    - "输出标注: [DEGRADE] 评估受限"
    - "标注具体受限模块"
    - "NE_Score附加置信区间"

  recovery:
    - "获取多归属率数据"
    - "设计补贴A/B测试"
    - "补充行业对标数据"
```

### Blackboard Outputs (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "ecosystem_graph.network_effect_evaluator_v1.0"
    skill_version: "v1.0"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]

  extended_fields:
    ne_score: {type: "integer", range: "0-100"}
    module_scores: {type: "object", schema: "{M1..M11: {score, rationale}}"}  # v1.1: M1-M11
    network_type: {type: "enum", values: ["信息撮合", "交易闭环", "服务撮合", "硬件+软件", "数据+模型", "生态系统"]}
    tipping_likelihood: {type: "enum", values: ["高", "中", "低"]}
    primary_bottleneck: {type: "enum", values: ["需求", "供给", "冷启动", "治理", "多归属", "兼容性"]}
    disconfirmers: {type: "array"}
    monitoring_kpis: {type: "array"}
    data_network_effect: {type: "object", schema: "{catch_up_time, data_volume, uniqueness}"}  # v1.1新增
    ai_flywheel: {type: "object", schema: "{velocity, model_gap, feedback_completeness}"}  # v1.1新增
```

---

**版本**: v1.1
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/ecosystem_graph/`
**状态**: 升级，v2.0合约兼容

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-27 | 初始版本，9模块评分体系 |
| v1.1 | 2026-01-27 | 新增M10_DataNetworkEffect、M11_AIFlywheel，适配科技平台分析需求 |
