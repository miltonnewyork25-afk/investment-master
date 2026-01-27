# Consumer Behavior Analyst v3.0

## Skill Metadata
- **Name**: consumer-behavior-analyst
- **Version**: 3.0
- **Category**: consumer_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: 消费品公司投资分析中用户画像与行为分析的系统化需求
- **Theoretical Foundation**: NBD-Dirichlet + Ehrenberg-Bass + JTBD + Fogg B=MAP

---

## Purpose

为消费品公司（快消/耐用/DTC/订阅）提供系统化的用户画像与消费行为分析框架。

**核心方法论链条**：
```
市场结构先验 → 增长拆解 → 进入点(CEP)映射 → 机制解构 → 增量实验 → 监控预警
```

**核心问题**：
- 增长/下滑的真正驱动因素是什么？（渗透？频次？客单？可得性？）
- 用户画像是否可执行？（可识别、可触达、可追踪、可反证）
- 增长杠杆的因果性是否经过验证？（排除促销提前购买/渠道迁移/测量偏差）
- 监控体系能否提前预警衰退信号？

**适用公司**：
| 类型 | 代表公司 | 关键特征 |
|------|---------|---------|
| 快消品 | P&G、联合利华、农夫山泉 | 高频低价、渠道为王 |
| 耐用消费品 | 苹果、小米、戴森 | 低频高价、品牌溢价 |
| DTC品牌 | Warby Parker、完美日记 | 直达用户、数据丰富 |
| 订阅模式 | Dollar Shave Club、Netflix | 留存为王、LTV驱动 |
| 新零售 | 盒马、山姆会员店 | 全渠道、体验驱动 |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 消费品公司投资分析 | 判断增长质量和可持续性 |
| 品牌健康度评估 | 渗透/频次/可得性诊断 |
| 增长策略验证 | 区分真增长vs虚假增长 |
| 竞争格局分析 | CEP竞争与替代分析 |
| 并购尽调 | 用户资产质量评估 |

---

## Core Axioms（底层公理）

### Axiom 1: 增长拆解公式
```yaml
growth_decomposition:
  formula: |
    Sales/GMV = Penetration × Frequency × AOV × Price/Mix × Availability

  components:
    penetration:
      definition: "买过的人占目标人群比例"
      importance: "通常是增长第一驱动力"

    frequency:
      definition: "购买次数/时间单位"
      caveat: "受品类特性约束，提升空间有限"

    aov:
      definition: "平均订单价值"
      drivers: ["件数", "规格", "附加购买"]

    price_mix:
      definition: "价格层级×产品组合"
      trade_off: "高价≠高利润，取决于弹性"

    availability:
      definition: "物理可得性+心智可得性"
      physical: ["分销覆盖", "上架率", "缺货率", "配送时效"]
      mental: ["搜索份额", "联想词", "触点记忆"]
```

### Axiom 2: NBD-Dirichlet市场结构规律
```yaml
nbd_dirichlet:
  principle: |
    大牌vs小牌的差异主要在买家数（渗透率），而非忠诚度。
    所有品牌的重度买家占比大致相似（约占购买量50-60%）。

  implications:
    - "会员/社群"不是万能解，大多数用户是轻度买家
    - 复购提升叙事常与品类结构矛盾
    - 促销带来的"复购提升"可能是提前购买/渠道迁移

  sanity_check: |
    若公司声称"复购率远超品类均值" → 验证：
    1. 是否统计口径问题（只算活跃用户？）
    2. 是否促销驱动的提前购买？
    3. 是否渠道迁移（线下→线上）？

  double_jeopardy: |
    小品牌双重劣势：买家少 + 买家购买频次也略低
    → 增长第一优先级永远是扩渗透
```

### Axiom 3: 竞争=同任务的高维替代
```yaml
competition_redefinition:
  principle: |
    竞争不只是同品类品牌，而是同预算/时间/场景下的所有替代。

  substitutes:
    same_category: "可口可乐 vs 百事"
    adjacent_category: "可乐 vs 茶饮 vs 咖啡"
    different_form: "外出餐饮 vs 预制菜 vs 自己做"
    delay_substitute: "现在买 vs 等促销 vs 不买"
    service_substitute: "买产品 vs 订阅服务"

  implication: |
    分析竞争格局时，必须识别"隐形替代"——
    看似增长的品类可能只是从另一品类抢份额。
```

---

## Framework Workflow

### S0: Evidence Rules（证据规则）

```yaml
evidence_tiers:
  tier_A:
    definition: "一方可核验数据/原始访谈记录"
    examples:
      - "公司交易数据库"
      - "第一方用户调研原始记录"
      - "渠道POS数据"
    usage: "可作为核心论据"

  tier_B:
    definition: "权威第三方数据"
    examples:
      - "尼尔森/Kantar面板数据"
      - "艾瑞/QuestMobile报告"
      - "行业协会统计"
    usage: "需交叉验证后作为核心论据"

  tier_C:
    definition: "社媒线索/舆情数据"
    examples:
      - "小红书/抖音评论分析"
      - "微博舆情监测"
      - "电商评价抓取"
    usage: "必须二次验证，不可单独作为核心论据"

persona_rules:
  no_stereotypes: "画像不得刻板印象化（如'95后都追求个性'）"
  must_have:
    - "可识别字段：哪些数据字段能识别这个人群？"
    - "可观测行为：什么行为特征区分这个人群？"
    - "可反证指标：什么数据能证明这个画像是错的？"
```

### S1: Market Structure Prior（市场结构先验）

```yaml
market_structure_analysis:

  penetration_mapping:
    task: "画出品类渗透率阶梯"
    output: |
      | 品牌 | 渗透率 | 重度买家占比 | 轻度买家占比 | YoY变化 |
      |------|--------|------------|------------|---------|
      | 品牌A | 35% | 22% | 78% | +2pp |
      | 品牌B | 18% | 25% | 75% | -1pp |

  buyer_distribution:
    task: "识别重度/中度/轻度买家分布"
    typical_pattern: |
      - 重度买家(Top 20%): 贡献50-60%销量
      - 中度买家(Mid 30%): 贡献25-30%销量
      - 轻度买家(Bottom 50%): 贡献15-20%销量
    implication: "轻度买家数量是渗透率的主要来源"

  brand_switching:
    task: "绘制品牌转换矩阵"
    output: |
      从\到   | 品牌A | 品牌B | 品牌C | 流出品类 |
      品牌A   | 60%   | 15%   | 10%   | 15%      |
      品牌B   | 20%   | 55%   | 12%   | 13%      |

  dirichlet_sanity_check:
    condition: "公司声称复购率显著高于品类"
    action: |
      先假设为以下原因之一：
      1. 测量偏差（统计口径）
      2. 促销驱动的提前购买
      3. 渠道迁移（非真正复购）
      4. 细分市场特殊性（需证明）
```

### S2: Growth Decomposition（增长拆解）

```yaml
growth_table:
  template: |
    ## Growth Decomposition Table

    | 维度 | 渠道A | 渠道B | 渠道C | 总计 | 主假设 | 替代解释 | 反证指标 |
    |------|-------|-------|-------|------|--------|---------|---------|
    | ΔPenetration | +3% | +1% | 0% | +2% | 新品拉新 | 渠道转移 | 老渠道是否下降 |
    | ΔFrequency | +5% | +2% | -1% | +3% | 习惯养成 | 促销提前购买 | 促销后是否断崖 |
    | ΔAOV | +8% | +3% | +10% | +6% | 升级消费 | 凑单满减 | 件数vs单价拆分 |
    | ΔPrice/Mix | +2% | +1% | +5% | +2% | 高端占比提升 | 低价SKU缺货 | SKU层面验证 |
    | ΔAvailability | +10% | +5% | 0% | +5% | 分销拓展 | 铺货冲量 | 动销率验证 |

  decomposition_by_dimension:
    by_channel:
      - "电商平台（天猫/京东/拼多多）"
      - "即时零售（美团/饿了么）"
      - "商超（沃尔玛/永辉/山姆）"
      - "便利店（711/全家/便利蜂）"
      - "DTC渠道（官网/小程序/私域）"

    by_region:
      - "一线城市"
      - "新一线城市"
      - "二三线城市"
      - "下沉市场"

    by_price_tier:
      - "高端（>品类均价50%）"
      - "中端（品类均价±20%）"
      - "大众（<品类均价30%）"

  counter_explanations:
    promotion_pull_forward:
      signal: "促销期频次暴涨，促销后断崖"
      verification: "看促销前后4周对比"

    channel_migration:
      signal: "线上增长=线下下降"
      verification: "总渗透率是否提升"

    measurement_bias:
      signal: "只算活跃用户的复购"
      verification: "用全量用户重算"
```

### S3: CEP & Availability Map（进入点与可得性映射）

```yaml
cep_framework:
  definition: |
    CEP (Category Entry Point) = 用户想到购买某品类的情境/触发点。
    在该情境下，用户"想起谁"(Mental) + "买得到谁"(Physical) 决定购买。

  cep_identification:
    dimensions:
      occasion: "什么场合？（早餐/下午茶/聚会/送礼）"
      need: "什么需求？（解渴/提神/解馋/社交）"
      trigger: "什么触发？（路过/看到广告/朋友推荐/搜索）"

    example_coffee: |
      | CEP | Occasion | Need | Trigger |
      |-----|----------|------|---------|
      | 早晨提神 | 通勤路上 | 功能性提神 | 习惯 |
      | 下午续命 | 办公室 | 打破疲劳 | 困意 |
      | 社交场景 | 咖啡馆见面 | 社交空间 | 约人 |
      | 居家享受 | 周末在家 | 仪式感 | 休闲 |

  availability_matrix:
    mental_availability:
      metrics:
        - "搜索份额：品牌词搜索量/品类总搜索量"
        - "联想词：提到品类时自然联想到的品牌"
        - "触点记忆：广告/内容的回忆度"
        - "陈列可见度：货架位置/面积"
      measurement:
        search_share: "百度指数/淘宝搜索数据"
        association: "用户调研/社媒分析"

    physical_availability:
      metrics:
        - "上架率：目标网点中有货的比例"
        - "分销覆盖：覆盖的网点数/目标网点数"
        - "缺货率：缺货SKU数×缺货天数"
        - "配送时效：下单到送达的时间"
        - "价格带覆盖：各价格带是否有产品"
      measurement:
        coverage: "分销商数据/渠道调研"
        stockout: "订单系统/渠道反馈"

  output_matrix: |
    ## CEP × Availability Matrix

    | CEP | 心智可得性 | 物理可得性 | 差距 | 优先级 |
    |-----|-----------|-----------|------|--------|
    | 早晨提神 | 搜索份额25% | 便利店覆盖60% | 心智弱 | P0 |
    | 下午续命 | 搜索份额40% | 即时配送覆盖30% | 物理弱 | P1 |

  gap_prioritization:
    formula: "优先级 = 影响大小 × 可控程度 × 成本效率"
    output: "Top 3 gaps with action plan"
```

### S4: Operational Segmentation（可执行分群）

```yaml
segmentation_framework:
  principle: |
    分群必须"可落表、可触达、可追踪"——
    纯心理分群（如"追求品质生活"）无法执行，必须绑定可观测行为。

  three_layers:

    layer_a_occasion:
      name: "场景分群（CEP/JTBD）"
      basis: "在什么情境下购买/使用"
      examples:
        - "早餐场景用户"
        - "送礼场景用户"
        - "囤货型用户"
      identifiers: |
        通过购买时间/搭配商品/配送地址推断

    layer_b_behavior:
      name: "行为分群（RFM/模式）"
      basis: "可观测的购买行为模式"
      segments:
        rfm_based:
          - "高价值高频（VIP）"
          - "高价值低频（需激活）"
          - "低价值高频（促销依赖）"
          - "流失预警（RFM下降）"
        pattern_based:
          - "促销依赖型：>70%订单有折扣"
          - "高退货型：退货率>品类均值2倍"
          - "高毛利型：偏好高溢价SKU"
          - "订阅倾向型：复购间隔稳定"

    layer_c_structural:
      name: "结构分群（渠道×地区×价格带）"
      basis: "客观属性维度"
      dimensions:
        channel: ["电商", "线下", "即时零售", "DTC"]
        region: ["一线", "新一线", "下沉"]
        price_tier: ["高端", "中端", "大众"]

  output_template: |
    ## Segment Profile Card

    | 维度 | 内容 |
    |------|------|
    | 分群名称 | [名称] |
    | 规模(Size) | 占用户数X%，占GMV Y% |
    | 价值(Value) | ARPU ¥Z，毛利率 W% |
    | 趋势(Trend) | YoY增速 +/-% |
    | 识别字段 | [数据库中哪些字段能识别] |
    | 可观测行为 | [什么行为特征] |
    | 关键旅程节点 | 首购触点→复购周期→流失信号 |
    | 反证指标 | [什么数据能证明这个画像是错的] |
```

### S5: Mechanism Cards（机制卡片）

```yaml
mechanism_framework:

  jtbd_analysis:
    name: "Jobs-To-Be-Done 任务分析"
    dimensions:
      functional: "功能性任务（解渴、清洁、出行）"
      social: "社会性任务（身份、归属、认同）"
      emotional: "情绪性任务（愉悦、安慰、兴奋）"
    forces:
      push: "推力：对现状的不满"
      pull: "拉力：对新方案的向往"
      anxiety: "焦虑：对改变的担忧"
      habit: "惯性：现有习惯的粘性"

  fogg_bmap:
    name: "Fogg B=MAP 行为模型"
    principle: |
      行为发生需要三要素同时满足：
      B (Behavior) = M (Motivation) × A (Ability) × P (Prompt)

    diagnosis:
      motivation_gap:
        signal: "知道但不想做"
        intervention: "强化价值主张/情感连接"
      ability_gap:
        signal: "想做但太难/太贵"
        intervention: "降低门槛/简化流程/降价"
      prompt_gap:
        signal: "想做也能做但忘了/没机会"
        intervention: "增加触点/提醒/场景植入"

  decision_journey:
    name: "决策旅程分析"
    stages:
      consider:
        definition: "进入考虑集"
        kpi: "品牌认知度、搜索份额"
        failure_point: "不知道有这个品牌"
      evaluate:
        definition: "比较评估"
        kpi: "被考虑率、评价分数"
        failure_point: "比较后落选"
      buy:
        definition: "完成购买"
        kpi: "转化率、客单价"
        failure_point: "购物车放弃、缺货"
      post_buy:
        definition: "购后体验"
        kpi: "满意度、NPS、复购率"
        failure_point: "退货、差评、不复购"

  output_mechanism_card: |
    ## Mechanism Card: [人群名称]

    ### JTBD分析
    - 功能任务: [描述]
    - 社会任务: [描述]
    - 情绪任务: [描述]
    - Push: [痛点]
    - Pull: [吸引力]
    - Anxiety: [顾虑]
    - Habit: [惯性]

    ### B=MAP诊断
    - Motivation: [评分1-5] - [具体表现]
    - Ability: [评分1-5] - [具体障碍]
    - Prompt: [评分1-5] - [触点覆盖]
    - 瓶颈: [M/A/P哪个最弱]
    - 干预建议: [具体行动]

    ### 决策旅程
    | 阶段 | 当前表现 | 失败点 | 改进杠杆 |
    |------|---------|--------|---------|
    | Consider | 认知度X% | [问题] | [行动] |
    | Evaluate | 考虑率Y% | [问题] | [行动] |
    | Buy | 转化率Z% | [问题] | [行动] |
    | Post-buy | 复购率W% | [问题] | [行动] |
```

### S6: Price-Pack-Promo Architecture（价格-包装-促销架构）

```yaml
price_architecture:

  price_elasticity:
    definition: "价格变动1%导致销量变动的百分比"
    typical_ranges:
      inelastic: "<1（必需品/高忠诚）"
      unit_elastic: "≈1"
      elastic: ">1（可替代/价格敏感）"
    caveat: |
      短期弹性≠长期弹性
      促销期弹性≠常态期弹性

  reference_price:
    definition: "消费者心中的'合理价格'锚点"
    sources:
      - "历史购买价格"
      - "竞品价格"
      - "促销时常见价格"
    danger: |
      频繁深折会下移参考价 → 正价卖不动 → 促销成瘾

  pack_architecture:
    dimensions:
      size: "容量/规格梯度"
      format: "单品/组合/礼盒"
      channel_specific: "渠道专供规格"
    strategy: |
      | 目的 | 包装策略 |
      |------|---------|
      | 拉新 | 小规格试用装 |
      | 提频 | 多件装优惠 |
      | 提价 | 升级款/限定款 |
      | 防窜 | 渠道专供规格 |

  promo_health_check:
    metrics:
      promo_intensity:
        formula: "促销销量 / 总销量"
        healthy: "<30%"
        warning: "30-50%"
        danger: ">50%"

      promo_depth:
        formula: "平均折扣深度"
        healthy: "<20%"
        warning: "20-40%"
        danger: ">40%"

      promo_incrementality:
        formula: "增量销量 / 促销销量"
        verification: |
          真增量 = 促销期销量 - 基线销量
          需扣除：
          - 提前购买（促销后下滑）
          - 渠道迁移（其他渠道下降）
          - 品类内cannibalization

  output_template: |
    ## Price-Pack-Promo Health Check

    | 指标 | 当前值 | 基准 | 状态 | 行动 |
    |------|--------|------|------|------|
    | 促销强度 | X% | <30% | 🟢/🟡/🔴 | [建议] |
    | 折扣深度 | Y% | <20% | 🟢/🟡/🔴 | [建议] |
    | 净增量率 | Z% | >50% | 🟢/🟡/🔴 | [建议] |
    | 价格弹性 | W | 品类均值 | - | [含义] |
    | 参考价趋势 | ↑/↓/→ | 稳定 | 🟢/🟡/🔴 | [建议] |
```

### S7: Experiment Cards（实验卡片）

```yaml
experiment_framework:

  principle: |
    每个增长杠杆必须配一张实验卡片——
    没有实验验证的"增长策略"只是假设。

  experiment_card_template: |
    ## Experiment Card: [杠杆名称]

    ### Hypothesis（假设）
    如果我们[做什么]，那么[什么指标]会[如何变化]，
    因为[机制/原因]。

    ### Design（设计）
    - 类型: [A/B测试 / 地理实验 / 分层对照 / 前后对比]
    - 实验组: [描述]
    - 对照组: [描述]
    - 样本量: [计算依据]
    - 周期: [持续时间，含洗出期]

    ### Metrics（指标）
    - Primary（主指标）: [具体指标 + 预期变化]
    - Secondary（次指标）: [辅助验证指标]

    ### Guardrails（护栏指标）
    - [退货率不得上升>X%]
    - [口碑评分不得下降>Y分]
    - [复购率不得下降>Z%]
    - [毛利率不得下降>W个点]

    ### Disconfirmers（证伪条件）
    如果以下任一发生，假设被推翻：
    - [条件1]
    - [条件2]

    ### Decision（决策规则）
    - 如果主指标↑且护栏不触发 → 推广
    - 如果主指标↑但护栏触发 → 优化后重测
    - 如果主指标不变或↓ → 放弃或迭代假设

    ### Next Step（后续）
    [成功后推广计划 / 失败后迭代方向]

  experiment_types:
    ab_test:
      适用: "线上可随机分流的场景"
      优势: "随机化控制混杂变量"
      注意: "AA测试验证分流均衡"

    geo_experiment:
      适用: "线下/全渠道场景"
      优势: "真实市场环境"
      注意: "匹配城市选择、季节性控制"

    cohort_analysis:
      适用: "长周期行为变化"
      优势: "追踪同一批用户"
      注意: "生存者偏差、cohort混杂"
```

### S8: Monitoring & Early Warning（监控与预警）

```yaml
monitoring_framework:

  three_layer_system:

    leading_indicators:
      name: "先行指标（领先1-3个月）"
      metrics:
        - "搜索份额变化"
        - "CEP触点覆盖率"
        - "缺货率/上架率"
        - "社媒评价情绪"
        - "新客获取成本趋势"
      update_frequency: "周度/双周"

    concurrent_indicators:
      name: "中观指标（同步/滞后1个月）"
      metrics:
        - "Cohort复购曲线"
        - "购买间隔变化"
        - "促销依赖度"
        - "渠道渗透率"
        - "客单价/件数趋势"
      update_frequency: "月度"

    lagging_indicators:
      name: "滞后指标（滞后2-3个月）"
      metrics:
        - "市场份额"
        - "毛利率"
        - "留存率"
        - "退货率"
        - "投诉率"
      update_frequency: "季度"

  alert_triggers:
    red_flags:
      - trigger: "促销更深但净增量不升"
        implication: "价格敏感度上升/品牌力下降"
        action: "暂停促销加深，分析根因"

      - trigger: "缺货率上升>5pp"
        implication: "供应链/预测问题"
        action: "紧急供应链复盘"

      - trigger: "口碑评分下降>0.3分"
        implication: "产品质量/服务问题"
        action: "启动质量调查"

      - trigger: "复购率断崖下降>10pp"
        implication: "用户流失加速"
        action: "流失用户访谈+挽回测试"

      - trigger: "新客成本上升>30%"
        implication: "获客效率恶化"
        action: "渠道ROI重估"

  dashboard_template: |
    ## Consumer Health Dashboard

    ### 先行指标 (更新: YYYY-MM-DD)
    | 指标 | 当前值 | vs上月 | vs去年同期 | 状态 |
    |------|--------|--------|-----------|------|
    | 搜索份额 | X% | +/-% | +/-% | 🟢/🟡/🔴 |
    | CEP覆盖 | Y% | +/-% | +/-% | 🟢/🟡/🔴 |
    | 缺货率 | Z% | +/-pp | +/-pp | 🟢/🟡/🔴 |
    | 社媒情绪 | W | +/- | +/- | 🟢/🟡/🔴 |

    ### 中观指标
    [同上格式]

    ### 滞后指标
    [同上格式]

    ### 红旗预警
    🔴 [触发的预警 + 建议行动]
```

---

## Scoring System: Consumer Behavior Score (CB_Score)

```yaml
cb_score_calculation:

  dimensions:
    market_structure_health:
      weight: 20%
      scoring:
        "+2": "渗透率上升+轻度买家增加+转换率稳定"
        "+1": "渗透率稳定+结构健康"
        "0": "渗透率稳定但重度买家依赖加重"
        "-1": "渗透率下降但忠诚度数据好看（伪信号）"
        "-2": "渗透率和忠诚度双降"

    growth_quality:
      weight: 25%
      scoring:
        "+2": "渗透驱动+频次/AOV稳定+可得性提升"
        "+1": "多维度均衡增长"
        "0": "单一维度驱动（如促销）"
        "-1": "促销依赖度上升+净增量下降"
        "-2": "增长虚假（渠道迁移/提前购买）"

    cep_availability:
      weight: 20%
      scoring:
        "+2": "Top CEP心智+物理可得性双强"
        "+1": "主要CEP覆盖良好"
        "0": "部分CEP有明显缺口"
        "-1": "核心CEP竞争力弱"
        "-2": "主要CEP被竞品主导"

    price_promo_health:
      weight: 20%
      scoring:
        "+2": "促销强度<30%+净增量率>60%+参考价稳定"
        "+1": "促销健康+定价权稳固"
        "0": "促销强度适中但效率下降"
        "-1": "促销依赖度高+参考价下移"
        "-2": "促销成瘾+毛利持续稀释"

    user_health:
      weight: 15%
      scoring:
        "+2": "NPS>50+复购曲线健康+低退货低投诉"
        "+1": "用户满意度良好"
        "0": "用户指标稳定但无突出"
        "-1": "NPS下降/退货上升/投诉增加"
        "-2": "用户健康度全面恶化"

  formula: |
    CB_Score = Σ(维度得分 × 权重) × 25 + 50
    范围: 0-100

  interpretation:
    85-100: "消费品王者：增长健康+护城河强"
    70-84: "优质品牌：增长可持续+部分优势"
    55-69: "中等品牌：增长质量存疑+需关注"
    40-54: "问题品牌：多维度预警信号"
    <40: "危机品牌：需重大变革"
```

---

## Output Contract

```yaml
consumer_behavior_output:

  # 1. 市场结构先验
  market_structure_prior:
    penetration_ladder:
      - {brand: "品牌", penetration: "X%", yoy: "+/-Xpp"}
    buyer_distribution:
      heavy: "X%用户贡献Y%销量"
      light: "X%用户贡献Y%销量"
    switching_matrix: "品牌转换概率矩阵"
    dirichlet_check: "是否符合NBD规律"

  # 2. 增长拆解
  growth_decomposition:
    total_growth: "+/-X%"
    by_component:
      penetration: {change: "+/-X%", driver: "描述", counter_explanation: "描述"}
      frequency: {change: "+/-X%", driver: "描述", counter_explanation: "描述"}
      aov: {change: "+/-X%", driver: "描述", counter_explanation: "描述"}
      price_mix: {change: "+/-X%", driver: "描述", counter_explanation: "描述"}
      availability: {change: "+/-X%", driver: "描述", counter_explanation: "描述"}
    by_channel: "渠道层面拆解表"
    by_region: "地区层面拆解表"

  # 3. CEP与可得性
  cep_availability:
    cep_list:
      - {cep: "名称", occasion: "场合", mental_score: X, physical_score: X}
    gap_priority:
      - {cep: "名称", gap_type: "心智/物理", impact: "高/中/低", action: "描述"}
    availability_matrix: "CEP×渠道矩阵"

  # 4. 用户分群
  segmentation:
    by_occasion:
      - {segment: "名称", size: "X%", value: "¥X ARPU", trend: "+/-X%"}
    by_behavior:
      - {segment: "名称", identifiers: "识别字段", behaviors: "可观测行为"}
    by_structure:
      - {segment: "渠道×地区×价格带", metrics: "关键指标"}
    profile_cards: "每个重点分群的完整画像卡"

  # 5. 机制分析
  mechanism_analysis:
    top_segments:
      - segment: "名称"
        jtbd: {functional: "描述", social: "描述", emotional: "描述"}
        bmap: {motivation: X, ability: X, prompt: X, bottleneck: "M/A/P"}
        journey: "决策旅程分析"

  # 6. 价格-包装-促销
  price_promo_health:
    promo_intensity: "X%"
    promo_depth: "X%"
    net_incrementality: "X%"
    price_elasticity: "X"
    reference_price_trend: "↑/↓/→"
    health_status: "🟢/🟡/🔴"

  # 7. 实验卡片
  experiment_cards:
    - lever: "杠杆名称"
      hypothesis: "假设"
      design: "实验设计"
      metrics: "主指标+护栏"
      disconfirmers: "证伪条件"

  # 8. CB评分
  cb_score:
    total: 0-100
    breakdown:
      market_structure: X
      growth_quality: X
      cep_availability: X
      price_promo: X
      user_health: X
    interpretation: "描述"

  # 9. 监控仪表板
  monitoring_dashboard:
    leading: [{indicator: "名称", value: X, status: "🟢/🟡/🔴"}]
    concurrent: [{indicator: "名称", value: X, status: "🟢/🟡/🔴"}]
    lagging: [{indicator: "名称", value: X, status: "🟢/🟡/🔴"}]
    red_flags: ["触发的预警"]

  # 10. 投资含义
  investment_implications:
    growth_sustainability: "高/中/低"
    brand_health: "强/中/弱"
    key_risks:
      - "风险1"
    key_opportunities:
      - "机会1"
    action_priority:
      - {action: "描述", impact: "高/中/低", urgency: "高/中/低"}
```

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-CB-001** | 渗透率连续3季度下降>2pp/季 | 暂停所有增长假设，启动根因分析 |
| **KS-CB-002** | 促销依赖度>60%且净增量率<30% | 立即审视定价权和品牌力 |
| **KS-CB-003** | NPS下降>15点/年 or 退货率翻倍 | 暂停扩张，聚焦产品/服务问题 |
| **KS-CB-004** | 核心CEP被竞品夺取(搜索份额下降>10pp) | 重新评估竞争定位 |
| **KS-CB-005** | 毛利率连续4季度下降>1pp/季 | 价格战/促销失控警报 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 复购神话 | 声称复购率远超品类均值→先验证是否统计口径/促销驱动 |
| 🚩 渠道转移伪增长 | 线上增长=线下下降，总渗透率未变 |
| 🚩 促销提前购买 | 促销期暴涨，促销后断崖→净增量可能为负 |
| 🚩 画像刻板印象 | "Z世代追求个性"类泛泛描述→无法执行 |
| 🚩 忽视轻度买家 | 只看VIP/会员数据→忽视增长主要来源 |
| 🚩 单一渠道依赖 | >70%收入来自单一渠道→渠道议价力风险 |
| 🚩 价格锚点下移 | 消费者对正价无感→只等促销 |

---

## Theoretical References

| 理论 | 来源 | 应用 |
|------|------|------|
| NBD-Dirichlet | Ehrenberg, Sharp | 市场结构先验、增长期望校准 |
| Mental/Physical Availability | Ehrenberg-Bass Institute | CEP分析、可得性映射 |
| JTBD | Christensen, Ulwick | 用户任务分析、竞争替代识别 |
| Fogg B=MAP | BJ Fogg | 行为机制诊断、干预设计 |
| Consumer Decision Journey | McKinsey | 决策旅程分析、触点优化 |
| Double Jeopardy | Ehrenberg | 品牌规模与忠诚度关系 |

---

## v2.0 Contract Compliance

| 模块 | 状态 |
|------|------|
| Core Principles | ✅ (3 Axioms) |
| Evidence Rules | ✅ (Tier A/B/C) |
| Scoring System | ✅ (CB_Score 0-100) |
| Kill Switches | ✅ (5 conditions) |
| Red Flags | ✅ (7 flags) |
| Output Contract | ✅ (10 sections) |
| Theoretical Foundation | ✅ (6 theories) |
| Experiment Framework | ✅ (Causal validation) |
| Monitoring System | ✅ (3-layer) |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 3.0 | 2026-01-27 | v2.0合规重构：添加CB_Score评分系统、Kill Switches、Red Flags、Output Contract、实验框架、三层监控系统 |
| 2.0 | - | 原始XML版本（用户提供） |
