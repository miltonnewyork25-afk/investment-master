# Cloud Competitive Tracker v1.0

## Skill Metadata
- **Name**: cloud-competitive-tracker
- **Version**: 1.0
- **Category**: competitive_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中Cloud竞争格局持续追踪需求

---

## Purpose

持续追踪云计算市场（IaaS/PaaS/SaaS）的竞争格局变化，重点关注AWS/Azure/GCP三巨头。

**核心问题**：
- 云市场份额变化趋势
- 定价和利润率动态
- 积压订单和增长前景
- AI对云竞争格局的影响

**适用公司**：
| 公司 | 云品牌 | 市场份额(IaaS) | AI云定位 |
|------|--------|---------------|----------|
| Amazon | AWS | ~32% | 全面(Bedrock+自研芯片) |
| Microsoft | Azure | ~23% | OpenAI+Copilot |
| Google | GCP | ~10% | Vertex AI+TPU |
| Alibaba | 阿里云 | ~5% | 通义千问 |
| Oracle | OCI | ~3% | 数据库+AI |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 云公司投资分析 | AWS/Azure/GCP竞争定位 |
| AI基础设施评估 | AI云服务竞争 |
| SaaS公司分析 | 理解底层云依赖 |
| 定价趋势追踪 | 云服务价格战监测 |

---

## Tracking Dimensions

### Dimension 1: 市场份额追踪

```yaml
market_share_tracking:

  data_sources:
    tier_1:
      - "Synergy Research (季度)"
      - "Canalys (季度)"
      - "IDC (季度)"
    tier_2:
      - "Gartner Magic Quadrant (年度)"
      - "公司财报披露"

  metrics:
    iaas_share:
      definition: "基础设施即服务市场份额"
      update_frequency: "季度"
      current_snapshot: |
        | 厂商 | 份额 | YoY变化 |
        |------|------|---------|
        | AWS | 32% | -1pp |
        | Azure | 23% | +2pp |
        | GCP | 10% | +1pp |
        | Others | 35% | -2pp |

    paas_share:
      definition: "平台即服务市场份额"
      key_players: ["AWS", "Azure", "GCP", "Salesforce"]

    revenue_growth:
      tracking: |
        | 厂商 | Q收入 | YoY | QoQ |
        |------|-------|-----|-----|
        | AWS | $29B | +12% | +3% |
        | Azure | $26B | +29% | +5% |
        | GCP | $12B | +26% | +4% |

  trend_analysis:
    azure_gaining: "连续X季度份额上升"
    aws_defending: "增速放缓但绝对领先"
    gcp_accelerating: "AI推动增速加快"
```

### Dimension 2: 定价与利润率

```yaml
pricing_margin_tracking:

  pricing_trends:
    compute:
      trend: "下降"
      rate: "-5%至-10%/年"
      driver: "竞争+摩尔定律"

    storage:
      trend: "下降"
      rate: "-10%至-15%/年"
      driver: "容量成本下降"

    ai_services:
      trend: "上升/稳定"
      rate: "持平或微涨"
      driver: "需求强劲+GPU紧缺"

    serverless:
      trend: "稳定"
      rate: "持平"

  margin_comparison:
    template: |
      | 厂商 | 毛利率 | 营业利润率 | 趋势 |
      |------|--------|-----------|------|
      | AWS | ~62% | ~35% | 稳定 |
      | Azure | ~70% | ~45% | 上升 |
      | GCP | ~50% | ~10% | 上升 |

  price_war_indicators:
    - "折扣深度变化"
    - "免费试用期延长"
    - "预留实例定价"
    - "大客户定制定价"
```

### Dimension 3: 积压订单与增长前景

```yaml
backlog_growth:

  backlog_tracking:
    definition: "已签约但未确认的收入"
    importance: "收入可见性的领先指标"

    current_snapshot: |
      | 厂商 | 积压订单 | YoY增速 | 平均合同期限 |
      |------|---------|---------|-------------|
      | AWS | $156B | +18% | 3.5年 |
      | Azure | $295B+ | +34% | 4年 |
      | GCP | $155B | +82% | 4年 |

  contract_wins:
    tracking:
      - "重大合同公告"
      - "政府合同(JEDI/JWCC)"
      - "行业大客户迁移"

  growth_drivers:
    ai_workloads:
      share_of_growth: "~50%"
      key_services: ["GPU实例", "ML平台", "模型API"]

    digital_transformation:
      share_of_growth: "~30%"
      key_drivers: ["迁移", "现代化"]

    data_analytics:
      share_of_growth: "~20%"
      key_services: ["数据湖", "实时分析"]
```

### Dimension 4: AI云服务竞争

```yaml
ai_cloud_competition:

  ai_platform_comparison:
    template: |
      | 维度 | AWS | Azure | GCP |
      |------|-----|-------|-----|
      | 模型合作 | Anthropic | OpenAI | Anthropic |
      | 自研模型 | Titan | Copilot | Gemini |
      | 自研芯片 | Trainium | Maia | TPU |
      | ML平台 | SageMaker | Azure ML | Vertex AI |
      | 模型市场 | Bedrock | Azure AI | Model Garden |

  ai_revenue_tracking:
    - company: "AWS"
      ai_arr_estimate: "$6B+"
      yoy_growth: "+35%"

    - company: "Azure"
      ai_arr_estimate: "$15B+"
      yoy_growth: "+55%"

    - company: "GCP"
      ai_arr_estimate: "$8B+"
      yoy_growth: "+45%"

  ai_competitive_dynamics:
    openai_dependency:
      azure: "高（独家关系）"
      aws: "无（竞争关系）"
      gcp: "无"

    anthropic_relationship:
      aws: "投资+合作"
      gcp: "投资+合作"
      azure: "无"

    chip_strategy:
      aws: "Trainium/Inferentia（成熟）"
      azure: "Maia/Cobalt（起步）"
      gcp: "TPU（领先）"
```

### Dimension 5: 客户迁移与粘性

```yaml
customer_dynamics:

  migration_trends:
    from_on_prem:
      rate: "~15%/年"
      primary_destination: "AWS（多数）→ Azure/GCP"

    multi_cloud_adoption:
      rate: "~70%企业使用多云"
      trend: "上升"
      implication: "份额更分散"

    repatriation:
      rate: "<5%"
      reasons: ["成本", "合规", "性能"]
      trend: "稳定"

  customer_concentration:
    aws_top_customers: "政府、Netflix、Capital One"
    azure_top_customers: "政府、企业IT、Copilot用户"
    gcp_top_customers: "Spotify、Snap、Anthropic"

  churn_indicators:
    - "大客户合同续约情况"
    - "公开的迁移公告"
    - "云支出优化趋势"
```

---

## Scoring System: Cloud Competitive Score (CC_Score)

```yaml
cc_score_calculation:

  dimensions:
    market_position:
      weight: 25%
      scoring:
        "+2": "份额上升+绝对领先"
        "+1": "份额稳定或上升"
        "0": "份额稳定"
        "-1": "份额下降"
        "-2": "份额大幅下降"

    growth_momentum:
      weight: 25%
      scoring:
        "+2": "增速>30%且加速"
        "+1": "增速20-30%"
        "0": "增速10-20%"
        "-1": "增速<10%"
        "-2": "增速为负"

    ai_positioning:
      weight: 25%
      scoring:
        "+2": "AI云领先且自研芯片成熟"
        "+1": "AI云有竞争力"
        "0": "AI云追赶中"
        "-1": "AI云落后"
        "-2": "AI云缺失"

    profitability:
      weight: 25%
      scoring:
        "+2": "利润率>30%且上升"
        "+1": "利润率20-30%"
        "0": "利润率10-20%"
        "-1": "利润率<10%"
        "-2": "亏损"

  formula: |
    CC_Score = Σ(维度得分 × 权重) × 25 + 50
    范围: 0-100

  interpretation:
    85-100: "云市场领导者"
    70-84: "强竞争者"
    55-69: "有竞争力"
    40-54: "需改进"
    <40: "竞争劣势"
```

---

## Output Contract

```yaml
cloud_competitive_output:

  # 1. 市场份额快照
  market_share_snapshot:
    as_of_date: "YYYY-MM-DD"
    iaas:
      - {vendor: "AWS", share: "X%", yoy_change: "Xpp"}
      - {vendor: "Azure", share: "X%", yoy_change: "Xpp"}
      - {vendor: "GCP", share: "X%", yoy_change: "Xpp"}
    trend_summary: "描述"

  # 2. 收入与增长
  revenue_growth:
    quarterly:
      - {vendor: "AWS", revenue: "$XB", yoy: "X%", qoq: "X%"}
    backlog:
      - {vendor: "AWS", backlog: "$XB", yoy: "X%"}

  # 3. 定价与利润
  pricing_margin:
    pricing_trend: "描述"
    margin_comparison: "表格"
    price_war_risk: "高/中/低"

  # 4. AI云竞争
  ai_cloud:
    leader: "公司"
    key_advantages: ["优势1", "优势2"]
    competitive_gaps: ["差距1"]

  # 5. CC评分
  cc_scores:
    - {vendor: "AWS", score: X, breakdown: {...}}
    - {vendor: "Azure", score: X, breakdown: {...}}
    - {vendor: "GCP", score: X, breakdown: {...}}

  # 6. 投资含义
  investment_implications:
    ranking: ["#1公司", "#2公司", "#3公司"]
    catalysts:
      - {event: "描述", expected: "YYYY-QX", impact: "高/中/低"}
    risks:
      - "风险1"
    recommendation:
      overweight: ["公司"]
      underweight: ["公司"]
```

---

## Application Example: 2026 Q1快照

### CC评分对比

| 厂商 | 市场地位 | 增长动能 | AI定位 | 盈利能力 | CC_Score |
|------|---------|---------|--------|---------|----------|
| AWS | +1 | 0 | +1 | +2 | 70 |
| Azure | +2 | +2 | +2 | +1 | 82 |
| GCP | 0 | +1 | +2 | 0 | 62 |

### 竞争态势总结

```
云市场竞争格局 (2026 Q1):

市场份额趋势:
AWS  ████████████████████████████████ 32% (↓)
Azure ███████████████████████ 23% (↑)
GCP   ██████████ 10% (↑)
Others ███████████████████████████████████ 35%

AI云领先地位:
Azure > GCP > AWS (OpenAI合作vs TPU vs Bedrock)

投资建议:
1. Azure: 增持（AI领先+份额增长）
2. GCP: 持有（AI强但规模小）
3. AWS: 持有（领导地位但增速放缓）
```

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-CC-001** | 份额下降>5pp/年 | 下调评级 |
| **KS-CC-002** | 利润率转负 | 重估可持续性 |
| **KS-CC-003** | 重大客户流失 | 验证竞争力 |
| **KS-CC-004** | AI合作关系变化 | 重估AI定位 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 数据口径不一 | 各厂商云收入定义不同 |
| 🚩 增速放缓 | 基数效应vs真实放缓 |
| 🚩 定价压力 | 折扣深度难以追踪 |
| 🚩 AI炒作 | AI收入归因困难 |

---

## v2.0 Contract Compliance

| 模块 | 状态 |
|------|------|
| Core Principles | ✅ |
| Scoring System | ✅ |
| Kill Switches | ✅ |
| Red Flags | ✅ |
| Output Contract | ✅ |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本 |
