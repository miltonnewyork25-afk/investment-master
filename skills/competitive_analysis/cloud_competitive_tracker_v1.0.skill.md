# Cloud Competitive Tracker v1.0

## Skill Metadata
- **ID**: competitive_analysis.cloud_competitive_tracker_v1.0
- **适用**: AWS/Azure/GCP/阿里云/OCI云竞争分析

---

## Purpose

追踪云计算市场（IaaS/PaaS/SaaS）竞争格局变化。

**核心问题**: 份额变化、定价动态、积压订单、AI对云竞争的影响

**适用公司**:
| 公司 | 品牌 | 份额 | AI定位 |
|------|------|------|--------|
| Amazon | AWS | ~32% | Bedrock+自研芯片 |
| Microsoft | Azure | ~23% | OpenAI+Copilot |
| Google | GCP | ~10% | Vertex AI+TPU |

---

## 5大追踪维度

### D1: 市场份额

```yaml
market_share:
  sources: [Synergy Research, Canalys, IDC(季度), Gartner(年度)]

  current_snapshot: |
    | 厂商 | IaaS份额 | YoY | 收入 | 增速 |
    |------|---------|-----|------|------|
    | AWS | 32% | -1pp | $29B/Q | +12% |
    | Azure | 23% | +2pp | $26B/Q | +29% |
    | GCP | 10% | +1pp | $12B/Q | +26% |

  trends:
    azure_gaining: "份额连续上升"
    aws_defending: "增速放缓但绝对领先"
    gcp_accelerating: "AI推动增速"
```

### D2: 定价与利润率

```yaml
pricing_margin:
  pricing_trends:
    compute: {trend: "↓", rate: "-5~10%/年"}
    storage: {trend: "↓", rate: "-10~15%/年"}
    ai_services: {trend: "→/↑", rate: "持平或微涨"}

  margins: |
    | 厂商 | 毛利率 | 营业利润率 | 趋势 |
    |------|--------|-----------|------|
    | AWS | ~62% | ~35% | 稳定 |
    | Azure | ~70% | ~45% | ↑ |
    | GCP | ~50% | ~10% | ↑ |

  price_war_indicators: [折扣深度, 免费试用期, 预留实例定价]
```

### D3: 积压订单

```yaml
backlog:
  definition: "已签约但未确认的收入"

  current: |
    | 厂商 | 积压 | YoY | 平均合同期 |
    |------|------|-----|-----------|
    | AWS | $156B | +18% | 3.5年 |
    | Azure | $295B+ | +34% | 4年 |
    | GCP | $155B | +82% | 4年 |

  tracking: [重大合同公告, 政府合同, 大客户迁移]
```

### D4: AI云服务竞争

```yaml
ai_cloud:
  platform_comparison: |
    | 维度 | AWS | Azure | GCP |
    |------|-----|-------|-----|
    | 模型合作 | Anthropic | OpenAI | Anthropic |
    | 自研模型 | Titan | Copilot | Gemini |
    | 自研芯片 | Trainium | Maia | TPU |
    | ML平台 | SageMaker | Azure ML | Vertex AI |

  ai_revenue:
    - {company: "AWS", arr: "$6B+", growth: "+35%"}
    - {company: "Azure", arr: "$15B+", growth: "+55%"}
    - {company: "GCP", arr: "$8B+", growth: "+45%"}
```

### D5: 客户动态

```yaml
customer:
  migration:
    from_on_prem: "~15%/年 → 主要到AWS"
    multi_cloud: "~70%企业使用多云（上升）"
    repatriation: "<5%（成本/合规/性能）"

  concentration:
    aws: "政府、Netflix、Capital One"
    azure: "政府、企业IT、Copilot用户"
    gcp: "Spotify、Snap、Anthropic"
```

---

## Scoring System: CC_Score (0-100)

| 维度 | 权重 | +2 | -2 |
|------|------|----|----|
| 市场地位 | 25% | 份额↑+绝对领先 | 份额大幅↓ |
| 增长动能 | 25% | 增速>30%且加速 | 增速为负 |
| AI定位 | 25% | AI云领先+芯片成熟 | AI云缺失 |
| 盈利能力 | 25% | 利润率>30%且↑ | 亏损 |

**公式**: `CC_Score = Σ(维度分数×权重)×25+50`

---

## Output Contract

```yaml
cloud_competitive_output:
  market_share: {iaas_share, revenue_growth, trend}
  pricing_margin: {pricing_trend, margin_comparison, price_war_risk}
  backlog: {by_vendor, yoy_growth}
  ai_cloud: {leader, advantages, gaps}
  cc_scores: [{vendor, score, breakdown}]
  investment_implications: {ranking, catalysts, risks}
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-CC-01 | 份额下降>5pp/年 | 下调评级 |
| KS-CC-02 | 利润率转负 | 重估可持续性 |
| KS-CC-03 | 重大客户流失 | 验证竞争力 |
| KS-CC-04 | AI合作关系变化 | 重估AI定位 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 数据口径不一 | 各厂商云收入定义不同 |
| 🚩 增速放缓 | 基数效应vs真实放缓 |
| 🚩 AI炒作 | AI收入归因困难 |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本，压缩至~200行 |
