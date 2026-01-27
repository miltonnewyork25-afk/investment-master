# AI Competitive Landscape Tracker v1.0

## Skill Metadata
- **Name**: ai-competitive-landscape
- **Version**: 1.0
- **Category**: competitive_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中AI竞争格局变化快，缺乏系统追踪框架

---

## Purpose

系统追踪AI行业竞争格局，为投资决策提供实时竞争情报。

**核心问题**：
- AI竞争格局变化极快（月级变化）
- 传统竞争分析框架滞后
- 需要多维度追踪：模型能力、企业采用、开发者生态、芯片供应

**适用公司**：
| 类型 | 代表公司 |
|------|----------|
| AI平台 | Google, OpenAI, Anthropic, Meta |
| 云+AI | Microsoft Azure, AWS, GCP |
| AI芯片 | NVIDIA, AMD, Google TPU, 自研芯片 |
| AI应用 | Salesforce, Adobe, ServiceNow |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| AI公司投资分析 | 评估竞争地位 |
| 科技平台AI战略评估 | Google/Microsoft/Meta AI布局 |
| AI芯片供应链分析 | NVIDIA vs 自研芯片 |
| 企业AI采用趋势 | 云AI服务竞争 |

---

## Tracking Dimensions

### Dimension 1: 模型能力 (Model Capability)

```yaml
model_capability:
  benchmarks:
    - MMLU: "多任务语言理解"
    - HumanEval: "代码生成"
    - MATH: "数学推理"
    - GPQA: "研究生水平问答"
    - MT-Bench: "多轮对话"
    - Arena_ELO: "人类偏好排名"

  tracking_frequency: "月度"

  competitive_map:
    template: |
      | 模型 | 公司 | MMLU | HumanEval | Arena ELO | 发布日期 |
      |------|------|------|-----------|-----------|----------|
      | GPT-4o | OpenAI | 88.7 | 90.2 | 1287 | 2024-05 |
      | Claude 3.5 | Anthropic | 88.3 | 92.0 | 1269 | 2024-06 |
      | Gemini Ultra | Google | 90.0 | 74.4 | 1250 | 2024-02 |
      | Llama 3.1 405B | Meta | 88.6 | 89.0 | 1200 | 2024-07 |

  scoring:
    leader: "+2 (在≥3个关键基准领先)"
    competitive: "+1 (在1-2个基准领先或全面接近)"
    lagging: "0 (落后但差距<10%)"
    behind: "-1 (明显落后>10%)"
    out_of_race: "-2 (差距>20%或无竞争产品)"
```

### Dimension 2: 企业采用 (Enterprise Adoption)

```yaml
enterprise_adoption:
  metrics:
    - enterprise_customers: "企业客户数"
    - revenue_run_rate: "AI相关ARR"
    - fortune_500_penetration: "财富500强渗透率"
    - api_call_volume: "API调用量"
    - seats_deployed: "部署席位数"

  tracking_frequency: "季度"

  data_sources:
    tier_1: "公司财报、IR演示"
    tier_2: "行业报告(Gartner/IDC)、分析师估算"
    tier_3: "媒体报道、招聘数据"

  competitive_map:
    template: |
      | 公司 | AI ARR | 企业客户 | F500渗透 | YoY增速 |
      |------|--------|----------|----------|---------|
      | Microsoft | $15B+ | 60K+ | 85% | +55% |
      | Google | $8B+ | 30K+ | 70% | +45% |
      | AWS | $6B+ | 40K+ | 75% | +35% |
      | OpenAI | $4B+ | 1M+ | 50% | +200% |

  scoring:
    dominant: "+2 (市场份额>40%)"
    strong: "+1 (份额20-40%)"
    competitive: "0 (份额10-20%)"
    weak: "-1 (份额5-10%)"
    marginal: "-2 (份额<5%)"
```

### Dimension 3: 开发者生态 (Developer Ecosystem)

```yaml
developer_ecosystem:
  metrics:
    - github_stars: "开源项目Star数"
    - npm_downloads: "SDK下载量"
    - developer_docs_traffic: "文档访问量"
    - stack_overflow_mentions: "SO问答量"
    - hackathon_adoption: "黑客松使用率"
    - job_postings: "招聘中提及率"

  tracking_frequency: "月度"

  mindshare_indicators:
    - twitter_mentions: "技术社区讨论量"
    - hacker_news_sentiment: "HN情绪"
    - reddit_r_machinelearning: "Reddit讨论"

  competitive_map:
    template: |
      | 平台 | GitHub Stars | NPM下载/月 | 文档流量 | 开发者NPS |
      |------|-------------|------------|----------|-----------|
      | OpenAI API | N/A | 5M+ | #1 | 72 |
      | Hugging Face | 120K+ | 10M+ | #2 | 78 |
      | Google AI | 80K+ | 3M+ | #3 | 65 |
      | AWS Bedrock | N/A | 2M+ | #4 | 60 |

  scoring:
    dominant: "+2 (开发者首选，心智份额>50%)"
    strong: "+1 (主流选择，份额20-50%)"
    competitive: "0 (有存在感，份额10-20%)"
    niche: "-1 (小众，份额5-10%)"
    irrelevant: "-2 (几乎无开发者采用)"
```

### Dimension 4: 基础设施成本 (Infrastructure Cost)

```yaml
infrastructure_cost:
  metrics:
    - cost_per_million_tokens: "每百万token成本"
    - inference_latency: "推理延迟(ms)"
    - training_cost_per_flop: "训练成本效率"
    - chip_tco: "芯片TCO"

  tracking_frequency: "季度"

  cost_comparison:
    template: |
      | 服务 | 输入$/1M | 输出$/1M | 延迟(ms) | 性价比指数 |
      |------|----------|----------|----------|------------|
      | GPT-4o | $5.00 | $15.00 | 500 | 100 |
      | Claude 3.5 | $3.00 | $15.00 | 400 | 120 |
      | Gemini 1.5 | $3.50 | $10.50 | 350 | 140 |
      | Llama 3.1 | $0.50 | $0.50 | 300 | 200 |

  chip_strategy:
    - nvidia_dependency: "NVIDIA依赖度"
    - custom_silicon: "自研芯片进度"
    - tpu_efficiency: "TPU vs GPU效率"

  scoring:
    cost_leader: "+2 (成本最低且性能不妥协)"
    efficient: "+1 (成本有优势)"
    competitive: "0 (成本持平)"
    expensive: "-1 (成本劣势10-30%)"
    uncompetitive: "-2 (成本劣势>30%)"
```

### Dimension 5: 人才流动 (Talent Flow)

```yaml
talent_flow:
  metrics:
    - key_researcher_count: "顶级研究员数量"
    - paper_citations: "论文引用量"
    - talent_inflow: "人才净流入"
    - linkedin_growth: "AI团队LinkedIn增长"
    - glassdoor_rating: "Glassdoor评分"

  tracking_frequency: "季度"

  key_talent_tracker:
    categories:
      - "AI研究负责人"
      - "首席科学家"
      - "模型架构师"
      - "安全/对齐专家"

    movement_signals:
      positive: "从竞争对手流入"
      negative: "流向竞争对手/创业"
      neutral: "内部晋升/退休"

  competitive_map:
    template: |
      | 公司 | 顶级研究员 | 论文引用(年) | 人才净流动 | 团队增长% |
      |------|-----------|-------------|------------|----------|
      | Google DeepMind | 200+ | 50K+ | +10 | +15% |
      | OpenAI | 150+ | 30K+ | +20 | +40% |
      | Anthropic | 100+ | 15K+ | +15 | +50% |
      | Meta FAIR | 180+ | 40K+ | -5 | +5% |

  scoring:
    talent_magnet: "+2 (人才净流入且留存高)"
    attractive: "+1 (人才流入为主)"
    stable: "0 (流动平衡)"
    leaking: "-1 (人才净流出)"
    hemorrhaging: "-2 (关键人才大量流失)"
```

---

## Scoring System: AI Competitive Score (AIC_Score)

### 评分公式

```yaml
aic_score_calculation:
  weights:
    model_capability: 25%
    enterprise_adoption: 25%
    developer_ecosystem: 20%
    infrastructure_cost: 15%
    talent_flow: 15%

  formula: |
    AIC_Score = Σ(维度得分 × 权重) × 25 + 50
    其中: 分数 ∈ [-2, +2], AIC_Score ∈ [0, 100]

  interpretation:
    90-100: AI领导者，全面领先
    75-89: 强竞争者，多维度优势
    60-74: 有竞争力，需加强投入
    40-59: 竞争劣势，需战略调整
    <40: 竞争边缘化
```

### 竞争态势判断

```yaml
competitive_dynamics:
  winner_take_all_signals:
    - "模型能力差距拉大(>15%)"
    - "企业采用集中度上升"
    - "开发者生态网络效应显现"

  commoditization_signals:
    - "模型能力差距收窄(<5%)"
    - "价格战激烈"
    - "开源模型追平闭源"

  current_assessment:
    stage: "competitive/consolidating/commoditizing"
    evidence: ["证据1", "证据2"]
    trajectory: "加速分化/趋于均衡/走向商品化"
```

---

## Output Contract

```yaml
ai_competitive_output:

  # 1. 竞争格局快照
  competitive_snapshot:
    as_of_date: "YYYY-MM-DD"
    market_stage: "竞争/整合/商品化"
    leader: "公司名"
    challengers: ["公司1", "公司2"]
    key_battleground: "模型/企业/开发者/成本"

  # 2. 维度评分
  dimension_scores:
    - company: "Google"
      model_capability: {score: X, evidence: "..."}
      enterprise_adoption: {score: X, evidence: "..."}
      developer_ecosystem: {score: X, evidence: "..."}
      infrastructure_cost: {score: X, evidence: "..."}
      talent_flow: {score: X, evidence: "..."}
      aic_score: 0-100

  # 3. 竞争对比矩阵
  competitive_matrix:
    visualization: "ASCII热力图"
    leader_by_dimension:
      model: "公司A"
      enterprise: "公司B"
      developer: "公司C"
      cost: "公司D"
      talent: "公司E"

  # 4. 动态追踪
  momentum_tracker:
    gaining_ground: ["公司1", "公司2"]
    losing_ground: ["公司3"]
    stable: ["公司4"]
    key_changes_this_quarter:
      - "变化1"
      - "变化2"

  # 5. 投资含义
  investment_implications:
    overweight: ["公司1"]
    underweight: ["公司2"]
    key_catalysts:
      - catalyst: "GPT-5发布"
        expected_date: "YYYY-QX"
        impact: "高/中/低"
    risk_factors:
      - "开源追平风险"
      - "监管风险"

  # 6. 监控触发器
  monitoring_triggers:
    upgrade_conditions:
      - "AIC_Score提升>10分"
      - "新产品获得显著采用"
    downgrade_conditions:
      - "关键人才流失"
      - "模型基准落后"
    kill_switch:
      - "核心业务被颠覆"
```

---

## Application Example: Google AI竞争地位

### 维度评分

| 维度 | 得分 | 证据 |
|------|------|------|
| 模型能力 | +1 | Gemini Ultra MMLU领先但Arena ELO落后 |
| 企业采用 | +1 | Cloud AI增速45%，但份额落后Azure |
| 开发者生态 | +1 | TensorFlow仍强但PyTorch主导 |
| 基础设施成本 | +2 | TPU成本优势44%，自研芯片领先 |
| 人才流动 | +1 | DeepMind顶级但OpenAI吸引力上升 |

**AIC_Score = 72** (强竞争者)

### 竞争态势

```
AI竞争格局热力图 (2026 Q1):

           模型  企业  开发者  成本  人才  总分
OpenAI     ████  ███   ████   ██   ███   78
Google     ███   ███   ███   ████  ███   72
Microsoft  ███   ████  ███   ███   ███   74
Anthropic  ████  ██    ███   ███   ███   68
Meta       ███   ██    ████  ████  ██    65

图例: ████ 领先  ███ 竞争  ██ 落后  █ 边缘
```

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-AI-001** | 模型能力落后>20% | 下调至"竞争劣势" |
| **KS-AI-002** | 企业客户流失>15% | 重新评估采用趋势 |
| **KS-AI-003** | 关键研究员离职>10人/季度 | 人才流动评级下调 |
| **KS-AI-004** | 开源模型达到90%性能 | 重估护城河 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 基准游戏 | 公司可能针对基准优化而非真实能力 |
| 🚩 ARR定义不一 | 各公司AI收入口径不同 |
| 🚩 人才统计偏差 | LinkedIn数据可能不准确 |
| 🚩 成本不透明 | 推理成本难以直接比较 |

---

## v2.0 Contract Compliance

| 模块 | 状态 |
|------|------|
| Core Principles | ✅ |
| Scoring System | ✅ |
| Kill Switches | ✅ |
| Red Flags | ✅ |
| Output Contract | ✅ |
| Monitoring Triggers | ✅ |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本 |
