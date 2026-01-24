# AGI时代超级心理学架构
# AGI-Era Super Psychology Architecture v1.0
# 超越传统Kahneman/Tversky框架，面向AGI的投资与营销心理学系统

---

## 核心范式转换 (Paradigm Shifts)

| 传统框架 | AGI时代框架 | 关键区别 |
|----------|-------------|----------|
| 固定偏误列表 | 动态状态场 | 偏误是状态的函数，非固定特质 |
| 点估计预测 | 分布式预测 | 投资者编码全概率分布，非单点期望值 |
| 硬编码规则 | 涌现行为 | 多智能体交互产生不可预编码的市场现象 |
| 被动观察 | 主动推理 | 投资者主动寻找信息以减少不确定性 |
| 离散调研 | 连续测量 | 行为数字表型提供实时心理信号 |
| 单层信念 | 递归信念建模 | "我认为市场认为美联储认为..." |
| 经典概率 | 量子认知 | 信念叠加态在决策时刻坍缩 |

---

## 1. 量子认知决策模型 (Quantum Cognition Layer)

**理论基础:** 投资者的信念状态不是经典的"看多"或"看空"，而是多种观点的量子叠加态，只有在被迫做决策时才"坍缩"为具体行动。

**核心论文:**
- Khrennikov (2026) - Entropy: 量子态相位解释认知干涉效应
- Cognition in Superposition (arXiv 2508.20098, 2025): 多重矛盾观点共存直到决策时刻
- Quantum Neuroscience & Financial Decision-Making (2025): 金融决策源于量子认知过程

**编码规则:**

```yaml
quantum_belief_model:
  state_representation:
    description: "投资者信念 = 概率振幅的叠加态"
    formula: "|investor⟩ = α|bull⟩ + β|bear⟩ + γ|uncertain⟩"
    constraint: "|α|² + |β|² + |γ|² = 1"

  collapse_triggers:
    - "earnings_report: 财报发布 → 强制坍缩"
    - "margin_call: 追保 → 恐慌坍缩"
    - "peer_action: 社交圈5+人同方向 → 从众坍缩"
    - "price_extreme: 价格>2σ偏离 → FOMO/panic坍缩"

  interference_effects:
    description: "先后接收的信息产生干涉(非简单叠加)"
    rule: "P(buy|A_then_B) ≠ P(buy|B_then_A)"
    implication: "信息呈现顺序影响决策 → 营销内容顺序很重要"

  entanglement:
    description: "投资者信念与其社交网络纠缠"
    rule: "测量(观察)一个投资者的行为，瞬间影响纠缠群体的状态"
    example: "KOL公开持仓 → 跟随者信念坍缩"
```

**实际应用:**
- 不要问"投资者看多还是看空" → 问"投资者的信念分布是什么形状"
- 营销内容作为"测量算子" → 设计触发有利方向坍缩的内容
- 信息顺序效应 → 先呈现最有力的数据点(锚定+干涉)

---

## 2. 主动推理市场模型 (Active Inference Layer)

**理论基础:** Karl Friston自由能原理 — 投资者不是被动接收信息然后反应，而是主动构建世界模型并通过行动最小化"惊异"(surprise)。

**核心论文:**
- Halperin & Feldshteyn - "Market Self-Learning of Signals, Impact and Optimal Trading"
- Ruiz-Serra et al. (AAMAS 2025) - 多智能体主动推理
- Hyland et al. (ICML 2024) - 自由能均衡理论

**编码规则:**

```yaml
active_inference_model:
  free_energy_minimization:
    description: "投资者行为 = 最小化预测误差"
    two_paths:
      perception: "更新信念以匹配现实 (学习)"
      action: "改变现实以匹配信念 (交易)"
    formula: "F = D_KL[q(x)||p(x|o)] - ln p(o)"

  exploration_exploitation:
    description: "主动推理自然解决探索-利用困境"
    epistemic_value: "信息增益的价值 (research phase)"
    pragmatic_value: "预期收益的价值 (trade phase)"
    balance: "uncertainty高 → 更多探索; uncertainty低 → 更多利用"

  investor_behavior_prediction:
    high_uncertainty_market:
      behavior: "大量信息搜寻(探索) → 少量小额交易"
      signal: "搜索量↑ + 成交量↓ = 市场还在探索阶段"
    low_uncertainty_market:
      behavior: "信息搜寻减少 → 大额方向性交易"
      signal: "搜索量↓ + 成交量↑ = 方向已确认"

  surprise_signals:
    description: "高惊异事件触发大规模信念更新"
    examples:
      - "earnings miss > 20%: 超预期惊异 → 大规模卖出"
      - "macro_shock (如COVID): 模型完全失效 → 恐慌"
      - "gradual_drift: 低惊异 → 信念缓慢漂移"
    marketing_use: "制造适度'惊异'(反直觉洞察)吸引注意力"
```

**实际应用:**
- 追踪"信息搜寻强度"作为市场阶段指标
- 高惊异事件 = 最佳内容发布时机(人们主动寻找解释)
- 逆周期信号本身就是高惊异事件 → 自带传播力

---

## 3. 计算理性层 (Computational Rationality Layer)

**理论基础:** Lieder & Griffiths — 投资者的"偏误"可能是给定信息成本约束下的最优策略。

**核心区别:**
- 有限理性(Simon/Kahneman): 人类用启发式因为没有资源做完全理性分析
- 有限最优(Russell/Griffiths): 人类做出的决策在计算约束下是最优的 — "错误"实际是理性的资源分配

```yaml
computational_rationality:
  key_insight: "投资者偏误 ≠ 需要修正的错误; 可能 = 约束下的最优"

  resource_rational_rules:
    anchoring_as_optimal:
      traditional_view: "锚定偏误 = 非理性"
      new_view: "锚定 = 在信息过载时的合理简化策略"
      implication: "不要试图消除锚定，而是提供更好的锚"

    herding_as_optimal:
      traditional_view: "从众 = 盲目跟风"
      new_view: "从众 = 信息成本高时利用他人信号的理性策略"
      implication: "当信息成本降低(如我们的评分系统)，从众自然减少"

    loss_aversion_as_optimal:
      traditional_view: "损失厌恶 = 情绪弱点"
      new_view: "损失厌恶 = 在不确定环境中保存资源的最优策略"
      implication: "不要对抗损失厌恶，利用它 → 损失框架营销"

  design_principle:
    description: "降低用户的计算成本 → 偏误自然减少"
    methods:
      - "0-100评分 = 降低分析成本 → 减少锚定依赖"
      - "周期定位图 = 降低时间推理成本 → 减少近期偏误"
      - "社区讨论 = 降低信息搜寻成本 → 减少信息瀑布"
```

---

## 4. 合成用户调研引擎 (Synthetic Research Engine)

**技术基础:**
- Stanford HAI (2024): 1000人模拟 → 85%准确率 (匹配人类2周后自我复现率)
- ICML 2025: "一个LLM等于多少个人类被调查者"方法论
- Silicon Sampling: 至少200个合成受访者才能获得可靠分布

```yaml
synthetic_research_engine:
  architecture:
    investor_archetypes:
      - id: "retail_momentum"
        profile: "散户动量交易者，25-35岁，社交媒体重度用户"
        biases: ["FOMO", "recency", "overconfidence"]
        info_sources: ["Reddit", "Twitter", "YouTube"]
        risk_tolerance: "high"
        cycle_awareness: "low"

      - id: "retail_value"
        profile: "散户价值投资者，35-55岁，Buffett信徒"
        biases: ["anchoring", "endowment", "status_quo"]
        info_sources: ["SEC filings", "annual reports", "newsletters"]
        risk_tolerance: "medium"
        cycle_awareness: "medium"

      - id: "institutional_quant"
        profile: "机构量化基金经理，CFA/PhD，系统化决策"
        biases: ["overfitting", "complexity_bias", "model_worship"]
        info_sources: ["Bloomberg", "academic papers", "proprietary data"]
        risk_tolerance: "calibrated"
        cycle_awareness: "high"

      - id: "institutional_fundamental"
        profile: "机构基本面分析师，10年+经验，行业专家"
        biases: ["narrative_fallacy", "confirmation", "authority"]
        info_sources: ["company meetings", "supply chain checks", "expert networks"]
        risk_tolerance: "medium"
        cycle_awareness: "high"

      - id: "crypto_native"
        profile: "加密原生投资者，20-30岁，24/7交易"
        biases: ["gambler_fallacy", "overconfidence", "FOMO"]
        info_sources: ["CT (Crypto Twitter)", "Telegram", "on-chain data"]
        risk_tolerance: "extreme"
        cycle_awareness: "very_low"

      - id: "anxious_saver"
        profile: "保守型储蓄者，45-65岁，接近退休"
        biases: ["loss_aversion_extreme", "zero_risk", "status_quo"]
        info_sources: ["financial advisor", "TV news", "bank statements"]
        risk_tolerance: "very_low"
        cycle_awareness: "none"

  simulation_protocol:
    step_1_persona_conditioning:
      method: "向LLM提供详细人口统计+心理画像+当前市场状态"
      min_respondents: 200
      sample_method: "random_silicon_sampling (demographics match target)"

    step_2_scenario_injection:
      method: "注入当前市场情景(评分变化/财报/新闻)"
      format: |
        "你是[persona]。当前市场状态是[scenario]。
         你刚看到以下信息: [stimulus]。
         描述你的想法、情绪反应和可能采取的行动。"

    step_3_response_analysis:
      extract:
        - "emotional_valence: -1.0 to +1.0"
        - "action_probability: {buy: %, hold: %, sell: %}"
        - "confidence_level: 0-100"
        - "information_seeking_intent: 0-100"
        - "social_sharing_intent: 0-100"

    step_4_aggregation:
      method: "加权聚合所有persona的反应分布"
      weights: "按真实市场参与者比例加权"
      output: "market_psychology_state_vector"

    step_5_validation:
      method: "与实际市场反应对比(事后验证)"
      tracking: "记录预测vs实际，持续校准"

  use_cases:
    content_testing:
      description: "发布前测试内容对不同用户群的心理影响"
      process:
        - "创建内容草稿"
        - "向6种persona展示"
        - "收集: 注意力、理解度、情绪反应、行动意图"
        - "优化: 根据目标persona的反应调整"

    market_scenario_analysis:
      description: "预测市场事件后投资者群体的心理状态"
      process:
        - "定义市场事件(如: LRCX财报超预期)"
        - "向200+合成投资者展示事件"
        - "分析: 群体情绪分布、行动倾向、信息需求"
        - "输出: 最佳内容发布时机和角度"

    product_ux_research:
      description: "测试评分系统UX对不同用户的心理影响"
      process:
        - "设计UI变体(如: 数字分 vs 图表 vs 文字)"
        - "向各persona展示"
        - "测量: 理解速度、信心变化、决策质量"
        - "选择: 综合最优的设计方案"
```

---

## 5. 实时心理状态估计引擎 (Real-Time Psychology Engine)

**技术基础:**
- BiasGuard Platform (SSRN 2025): 实时认知偏误检测
- 188个认知偏误自动文本检测 (Atreides & Kelley)
- 击键/点击模式作为行为生物标志物
- 社交媒体时序模式作为群体情绪指标

```yaml
realtime_psychology_engine:
  # --- 文本信号层 ---
  text_analysis:
    cognitive_load_indicators:
      high_load: ["长句", "犹豫词(嗯、可能)", "自我修正", "信息重复请求"]
      low_load: ["短句", "确定性词汇", "快速响应", "简洁决策"]

    confidence_indicators:
      high: ["必须", "肯定", "毫无疑问", "100%"]
      medium: ["可能", "大概率", "倾向于", "看起来"]
      low: ["不确定", "需要更多信息", "如果...那么", "取决于"]
      overconfidence_flag: "高确定性词汇 + 无数据支撑 + 少量分析"

    emotional_state:
      fear_markers: ["暴跌", "崩盘", "亏完了", "怎么办", "止损"]
      greed_markers: ["暴涨", "翻倍", "all in", "满仓", "梭哈"]
      neutral_markers: ["分析", "评估", "数据显示", "根据历史"]

    bias_detection_from_text:
      anchoring: "反复提及特定价格点作为参考"
      confirmation: "只引用支持观点的信息"
      recency: "过度引用最近1-2周的事件"
      narrative: "构建因果故事但无统计支撑"
      herding: "引用他人行为作为决策依据"

  # --- 行为信号层 ---
  behavioral_signals:
    temporal_patterns:
      check_frequency:
        extreme_high: ">10次/天 → 焦虑状态"
        high: "5-10次/天 → 高关注"
        normal: "1-2次/天 → 正常"
        low: "<1次/周 → 漠不关心/信任系统"

      time_of_check:
        pre_market: "焦虑/准备型"
        market_hours: "活跃交易型"
        after_hours: "反思/研究型"
        midnight: "焦虑/FOMO型"

    engagement_patterns:
      deep_read: "阅读完整报告 → 分析型/高参与"
      skim: "只看评分数字 → 行动导向/低耐心"
      share: "分享内容 → 社交验证需求/信心高"
      save: "收藏但不行动 → 犹豫/信息收集阶段"

    decision_latency:
      instant: "<1分钟 → 冲动/直觉决策(System 1)"
      considered: "1-60分钟 → 混合决策"
      extended: ">1天 → 深思熟虑/犹豫(System 2)"
      frozen: ">1周无行动 → 决策瘫痪/status quo bias"

  # --- 群体心理温度计 ---
  crowd_thermometer:
    inputs:
      - "social_media_sentiment: NLP情绪分析 (LLM优于FinBERT 2x)"
      - "options_market: put/call ratio, VIX term structure"
      - "fund_flows: ETF资金流向"
      - "search_trends: 相关关键词搜索量变化"
      - "earnings_call_tone: 管理层语调分段分析"

    composite_index:
      name: "Crowd Psychology Temperature (CPT)"
      range: "0 (极度恐惧) → 50 (中性) → 100 (极度贪婪)"
      calculation: |
        CPT = weighted_average(
          sentiment_z_score * 0.25,
          put_call_inverse * 0.20,
          fund_flow_z * 0.20,
          search_trend_z * 0.15,
          earnings_tone_z * 0.20
        ) * 50 + 50

    contrarian_zones:
      extreme_fear: "CPT < 15 → 逆向买入信号"
      fear: "CPT 15-30 → 开始观察买点"
      neutral: "CPT 30-70 → 正常操作"
      greed: "CPT 70-85 → 开始减仓准备"
      extreme_greed: "CPT > 85 → 逆向卖出信号"
```

---

## 6. 分布式强化学习心理模型 (Distributional RL Psychology)

**理论基础:**
- Nature (2020/2025): 多巴胺神经元编码奖励分布的不同分位数
- D1神经元偏向乐观预测，D2神经元偏向悲观预测
- 投资者自然编码全概率分布，非单点期望值

```yaml
distributional_psychology:
  core_insight: "投资者大脑 = 分布式RL系统"

  asymmetric_learning:
    optimistic_channel:
      neuron_type: "D1 MSN (直接通路)"
      function: "对超预期正面结果敏感"
      investor_analog: "牛市中的FOMO/贪婪回路"
      learning_rate: "α+ (从好消息中学习的速度)"

    pessimistic_channel:
      neuron_type: "D2 MSN (间接通路)"
      function: "对低于预期的结果敏感"
      investor_analog: "熊市中的恐惧/损失厌恶回路"
      learning_rate: "α- (从坏消息中学习的速度)"

  heterogeneity_model:
    description: "不同投资者有不同的α+/α-比值"
    profiles:
      risk_seeking: "α+ >> α- → 从好消息中学习更快 → 更乐观"
      risk_averse: "α- >> α+ → 从坏消息中学习更快 → 更悲观"
      balanced: "α+ ≈ α- → 对称学习 → 更理性"
    implication: "针对不同α比值的投资者，使用不同的沟通框架"

  prediction_error_marketing:
    description: "多巴胺最强信号 = 超出预期 (正预测误差)"
    application:
      - "永远先设低预期，然后超越 → 最大正预测误差"
      - "不要过度承诺(避免负预测误差 = 失望)"
      - "变量奖励(每周评分不确定性) → 持续多巴胺参与"
      - "进步信号(评分趋势向好) → 持续正预测误差"
```

---

## 7. 多智能体涌现市场模拟 (Emergent Market Simulation)

**技术基础:**
- TwinMarket (NeurIPS 2025): 1000个LLM Agent + BDI认知 + 社交媒体互动
- FCLAgent: 基本面-技术面-LLM混合Agent
- MASS: 异质投资者多智能体组合构建

```yaml
emergent_simulation:
  architecture:
    agent_types:
      fundamental:
        count: 200
        decision_model: "cycle_score + valuation"
        cognitive_biases: ["anchoring", "confirmation"]
        info_update: "quarterly (earnings)"

      momentum:
        count: 300
        decision_model: "price_trend + volume"
        cognitive_biases: ["recency", "herding", "FOMO"]
        info_update: "daily"

      contrarian:
        count: 100
        decision_model: "inverse_crowd_sentiment"
        cognitive_biases: ["contrarian_bias", "overconfidence"]
        info_update: "when_crowd_extreme"

      noise:
        count: 300
        decision_model: "random + liquidity_needs"
        cognitive_biases: ["all_at_random_intensity"]
        info_update: "irregular"

      institutional:
        count: 100
        decision_model: "multi_factor + risk_budget"
        cognitive_biases: ["groupthink", "career_risk"]
        info_update: "continuous"

    interaction_channels:
      social_media: "agents公开分享观点 → 信息瀑布"
      price_signal: "所有agent观察价格 → 间接通信"
      order_flow: "成交量/方向 → 信号提取"

    emergent_phenomena_to_detect:
      - "bubble_formation: 价格持续偏离基本面+agent共识增强"
      - "flash_crash: noise→momentum反馈环 → 突然坍缩"
      - "information_cascade: 5+个agent连续同方向 → 瀑布"
      - "contrarian_reversal: 极端共识 → contrarian agent启动"
      - "regime_change: fundamental agent评分突变 → 趋势转折"

  simulation_uses:
    market_prediction:
      - "注入当前市场状态 → 模拟未来1-4周路径分布"
      - "识别当前处于哪种涌现态(泡沫/瀑布/转折)"

    content_impact:
      - "注入我们的内容 → 观察哪些agent受影响"
      - "测量: 内容的传播路径和说服效果"

    stress_testing:
      - "注入极端事件 → 观察agent群体反应"
      - "评估: 我们的框架在极端情况下的稳健性"
```

---

## 8. 递归心智理论层 (Recursive Theory of Mind)

**技术基础:**
- GPT-4在ToM任务上达到成人水平 (Strachan, Nature Human Behaviour 2024)
- 递归信念建模: "我认为你认为她知道..." (CMU PhD 2025)
- Mutual Theory of Mind (MToM): AI与人类的相互心智建模

```yaml
recursive_tom:
  levels:
    order_0: "我知道X (自己的信念)"
    order_1: "我认为市场认为X (一阶ToM)"
    order_2: "我认为市场认为我认为X (二阶ToM)"
    order_3: "我认为市场认为美联储认为市场认为X (三阶ToM)"

  investment_application:
    beauty_contest:
      description: "凯恩斯选美比赛：赢家不是选最美的，而是选别人会选的"
      order_1_thinking: "这个股票会涨因为基本面好"
      order_2_thinking: "这个股票会涨因为其他人会认为基本面好"
      order_3_thinking: "这个股票会涨因为其他人认为大多数人会买入"
      our_edge: "我们的周期评分 = order_0 (基本面); 群体温度 = order_1/2"

    earnings_call_tom:
      description: "CEO说什么 vs CEO想让你认为什么 vs CEO认为你会如何解读"
      analysis:
        - "表面信息: 直接陈述的数据"
        - "一阶推理: CEO想传达的信号"
        - "二阶推理: CEO认为市场会如何反应"
        - "三阶推理: CEO的措辞是否在试图引导预期"

  marketing_application:
    content_tom:
      order_1: "用户会认为这条内容有价值吗？"
      order_2: "用户会认为其他人也觉得有价值吗？(分享意愿)"
      order_3: "用户会认为分享这个会让别人觉得自己聪明吗？(身份信号)"
    design_rule: "最佳内容同时满足3阶ToM"
```

---

## 9. 元认知自监控层 (Metacognitive Self-Monitoring)

**技术基础:**
- SOFAI Architecture (npj AI 2025): 快/慢/元认知三层系统
- Agentic Metacognition (arXiv 2025): 双Agent自我监控 → 83.56% vs 75.78%
- Anthropic Introspection (2025): LLM内省能力研究

```yaml
metacognitive_layer:
  architecture:
    fast_system:
      function: "快速评分输出 (基于规则/阈值)"
      speed: "< 1秒"
      accuracy: "~80%"

    slow_system:
      function: "深度分析 (多因子+供应链+周期)"
      speed: "分钟级"
      accuracy: "~95%"

    meta_system:
      function: "监控快/慢系统的可靠性，决定何时信任哪个"
      capabilities:
        - "uncertainty_estimation: 我对这个结论有多确定？"
        - "knowledge_boundary: 这超出了我的训练数据范围吗？"
        - "bias_self_detection: 我的分析是否受到了偏误影响？"
        - "confidence_calibration: 我90%确信的事，历史上90%是对的吗？"

  uncertainty_communication:
    principle: "元认知最重要的输出 = 不确定性的诚实表达"
    levels:
      confident: "score 70+, 历史准确率100%, 数据完整 → 明确建议"
      moderate: "score 40-70, 部分数据缺失 → 条件性建议 + 风险标注"
      uncertain: "score变化剧烈, 模型分歧大 → 不给建议，只呈现数据"
      unknown: "超出训练范围(如新型资产/前所未见的宏观) → 明确说'不知道'"

  self_improvement_loop:
    step_1: "记录每次预测的置信度"
    step_2: "事后对比实际结果"
    step_3: "如果置信度90%但准确率60% → 过度自信，校准"
    step_4: "如果置信度50%但准确率90% → 过度谦虚，提升"
    step_5: "追踪哪类问题容易过度/过少自信 → 细粒度校准"
```

---

## 10. 整合架构图 (Integrated Architecture)

```
┌──────────────────────────────────────────────────────────────────┐
│                    元认知自监控层 (Meta Layer)                      │
│  不确定性估计 | 偏误自检 | 置信度校准 | 知识边界识别              │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 监控/调节
┌────────────────────────────────┼─────────────────────────────────┐
│                    递归心智理论层 (ToM Layer)                      │
│  一阶:市场信念 | 二阶:市场对我们的预期 | 三阶:博弈均衡             │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 信念建模
┌────────────────────────────────┼─────────────────────────────────┐
│              多智能体涌现模拟层 (Emergence Layer)                  │
│  1000 LLM Agents | BDI认知 | 社交互动 | 涌现现象检测             │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 群体动力学
┌────────────────────────────────┼─────────────────────────────────┐
│             分布式RL心理模型层 (Distributional Layer)              │
│  D1乐观通道 | D2悲观通道 | 异质学习率 | 预测误差信号              │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 奖励处理
┌────────────────────────────────┼─────────────────────────────────┐
│              实时心理状态估计层 (Real-Time Layer)                  │
│  文本分析 | 行为信号 | 群体温度计 | 数字表型                      │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 状态输入
┌────────────────────────────────┼─────────────────────────────────┐
│              合成用户调研层 (Synthetic Research Layer)             │
│  6种Persona | 200+合成受访者 | 场景注入 | 反应分析                │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ 验证/校准
┌────────────────────────────────┼─────────────────────────────────┐
│                量子认知 + 主动推理 + 计算理性 (Core Theory)        │
│  信念叠加态 | 自由能最小化 | 约束下最优 | 干涉效应                │
└──────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
              [投资决策]    [营销内容]    [产品设计]
```

---

## 11. 与现有系统集成点 (Integration Points)

| 现有模块 | AGI心理学增强 | 具体升级 |
|---------|--------------|---------|
| scoring.yaml | + psychology-scoring.yaml | 偏误修正叠加层 |
| orchestrator.ts | + metacognitive_monitor | 每次输出附带不确定性估计 |
| evidence-extractor.ts | + tom_signal_extractor | 从SEC文件推断管理层意图(一阶ToM) |
| relation-engine.ts | + quantum_entanglement_map | 公司间信念纠缠关系 |
| product-profile.yaml | + synthetic_research_engine | 内容发布前合成用户测试 |
| twitter-playbook.md | + realtime_psychology_engine | 最佳发布时机=群体温度极端时 |
| EVOLUTION.md | + metacognitive_calibration_log | 预测置信度vs实际准确率追踪 |

---

## 12. 论文索引 (Key Papers)

### 量子认知
- Khrennikov (2026) Entropy: Quantum-like Cognition Phase Interpretation
- arXiv 2508.20098 (2025): Cognition in Superposition
- Quantum Neuroscience & Financial Decision-Making (2025)

### 主动推理
- Ruiz-Serra et al. (AAMAS 2025): Multi-Agent Active Inference
- Halperin & Feldshteyn: Market Self-Learning with Free Energy
- Parr, Pezzulo, Friston (MIT Press): Active Inference

### 计算理性
- Lieder & Griffiths (2020): Resource-Rational Analysis
- Icard (2025): Resource Rationality manuscript
- Musslick & Masis (2023): Pushing Bounds of Bounded Optimality

### LLM合成调研
- Stanford HAI (2024-2025): 1000-Agent Simulation, 85% accuracy
- ICML 2025: How Many Humans is an LLM Worth
- NAACL 2025: Specializing LLMs for Surveys

### 分布式RL与神经科学
- Nature (2025): Opponent Striatal Circuit for Distributional RL
- Nature (2020): Distributional Code for Value in Dopamine
- Nature Neuroscience (2024): Distributional RL in PFC

### 多智能体模拟
- TwinMarket (NeurIPS 2025): 1000 LLM Agent Market Simulation
- FCLAgent (2025): Fundamental-Chartist-LLM Agent
- Axtell & Farmer (JEL 2025): ABM in Economics Past/Present/Future

### 心智理论
- Strachan et al. (Nature Human Behaviour 2024): GPT-4 ToM = Adult Level
- CMU PhD (2025): Recursive ToM in Multi-Agent Systems
- arXiv 2506.06366 (2025): Mutual Theory of Mind

### 元认知
- npj AI (2025): Fast/Slow/Metacognitive Architecture
- arXiv 2509.19783 (2025): Agentic Metacognition 83.56%
- Anthropic (2025): Emergent Introspective Awareness in LLMs

### 实时心理估计
- BiasGuard (SSRN 2025): Real-time Cognitive Bias Detection
- SSRN 4568851: 188 Cognitive Biases from Text Detection
- Brain Sciences (2025): Mobile Typing as Behavioral Biomarker
