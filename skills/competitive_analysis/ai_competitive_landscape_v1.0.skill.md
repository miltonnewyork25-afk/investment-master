# AI Competitive Landscape Tracker v1.0

## Skill Metadata
- **ID**: competitive_analysis.ai_competitive_landscape_v1.0
- **适用**: Google/OpenAI/Anthropic/Meta/Microsoft等AI竞争分析

---

## Purpose

系统追踪AI行业竞争格局变化（月级更新频率）。

**核心问题**: 模型能力、企业采用、开发者生态、芯片供应、人才流动

**适用公司**:
| 类型 | 代表 |
|------|------|
| AI平台 | Google, OpenAI, Anthropic, Meta |
| 云+AI | Microsoft Azure, AWS, GCP |
| AI芯片 | NVIDIA, AMD, Google TPU |

---

## 5大追踪维度

### D1: 模型能力

```yaml
benchmarks: [MMLU, HumanEval, MATH, GPQA, Arena_ELO]
frequency: "月度"

competitive_map: |
  | 模型 | 公司 | MMLU | HumanEval | Arena ELO |
  |------|------|------|-----------|-----------|
  | GPT-4o | OpenAI | 88.7 | 90.2 | 1287 |
  | Claude 3.5 | Anthropic | 88.3 | 92.0 | 1269 |
  | Gemini Ultra | Google | 90.0 | 74.4 | 1250 |

scoring:
  "+2": "≥3个关键基准领先"
  "+1": "1-2个基准领先或全面接近"
  "0": "落后但差距<10%"
  "-1": "明显落后>10%"
  "-2": "差距>20%或无竞争产品"
```

### D2: 企业采用

```yaml
metrics: [enterprise_customers, ai_arr, f500_penetration, api_volume]
frequency: "季度"
sources: {tier_1: "财报", tier_2: "行业报告", tier_3: "媒体"}

competitive_map: |
  | 公司 | AI ARR | 企业客户 | F500渗透 | YoY |
  |------|--------|----------|----------|-----|
  | Microsoft | $15B+ | 60K+ | 85% | +55% |
  | Google | $8B+ | 30K+ | 70% | +45% |
  | AWS | $6B+ | 40K+ | 75% | +35% |
```

### D3: 开发者生态

```yaml
metrics: [github_stars, npm_downloads, api_developers, documentation_quality]
frequency: "月度"

competitive_map: |
  | 公司 | API开发者 | GitHub Stars | 满意度 |
  |------|----------|--------------|--------|
  | OpenAI | 2M+ | 高 | 4.5/5 |
  | Anthropic | 500K+ | 中 | 4.6/5 |
  | Google | 1M+ | 中高 | 4.2/5 |
```

### D4: 基础设施成本

```yaml
metrics: [inference_cost, training_cost, chip_availability]

cost_comparison: |
  | 公司 | $/百万token | 自研芯片 | 供应安全 |
  |------|------------|----------|---------|
  | OpenAI | $5-15 | 无 | NVIDIA依赖 |
  | Google | $3-10 | TPU v5 | 自给率高 |
  | Anthropic | $3-15 | 无 | AWS/GCP |

trends:
  inference_cost: "下降30-50%/年"
  chip_shortage: "2024缓解，2025充裕"
```

### D5: 人才流动

```yaml
metrics: [researcher_count, paper_citations, talent_net_flow]
frequency: "季度"
sources: [LinkedIn, 论文库, 招聘数据]

tracking:
  key_researchers: "顶级AI研究员流动"
  phd_hiring: "新博士招聘"
  industry_moves: "学术→产业转移"
```

---

## Scoring System: AIC_Score (0-100)

| 维度 | 权重 | +2 | -2 |
|------|------|----|----|
| 模型能力 | 30% | ≥3基准领先 | 差距>20% |
| 企业采用 | 25% | ARR最高+F500>80% | 无企业产品 |
| 开发者生态 | 20% | 开发者最多+满意度>4.5 | 开发者流失 |
| 基础设施成本 | 15% | 成本最低+芯片自研 | 成本最高+供应风险 |
| 人才 | 10% | 顶级研究员净流入 | 人才大量流失 |

**公式**: `AIC_Score = Σ(维度分数×权重)×25+50`

---

## Output Contract

```yaml
ai_competitive_output:
  model_capability: {benchmark_comparison, leader, trend}
  enterprise_adoption: {arr_comparison, penetration, growth}
  developer_ecosystem: {developer_count, satisfaction, trend}
  infrastructure: {cost_comparison, chip_strategy, supply_risk}
  talent: {researcher_count, net_flow, key_moves}
  aic_scores: [{company, score, breakdown}]
  investment_implications: {ranking, catalysts, risks}
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-AIC-01 | 基准排名下降>3位 | 下调模型能力分 |
| KS-AIC-02 | 开发者流失>20% | 下调生态分 |
| KS-AIC-03 | 核心研究员离职>3人 | 评估人才影响 |
| KS-AIC-04 | 芯片供应危机 | 重评基础设施风险 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 基准操纵 | 模型针对基准过拟合 |
| 🚩 ARR定义不一 | 各家AI收入口径不同 |
| 🚩 开源冲击 | Llama等开源模型侵蚀份额 |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本，压缩至~200行 |
