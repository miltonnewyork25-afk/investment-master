# Zero-Click Impact Model v1.0

## Skill Metadata
- **Name**: zero-click-impact-model
- **Version**: 1.0
- **Category**: impact_models
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中AI Overviews对搜索广告收入影响的量化需求

---

## Purpose

量化零点击搜索（用户在搜索结果页直接获得答案而不点击链接）对搜索广告公司收入的影响。

**核心问题**：
- AI Overviews/Featured Snippets增加零点击率
- 零点击是否等于收入损失？（不一定）
- 需要区分"信息型"vs"交易型"搜索
- 需要评估广告形式迁移的补偿效应

**适用公司**：
| 公司 | 搜索广告收入占比 | 零点击影响敏感度 |
|------|-----------------|-----------------|
| Google | 57% | 高 |
| Microsoft Bing | 15% | 中 |
| 内容出版商 | 依赖搜索流量 | 极高 |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 搜索广告公司估值 | 评估AI对核心业务影响 |
| 出版商投资分析 | 评估流量来源风险 |
| AI搜索产品分析 | 评估颠覆性vs渐进性 |

---

## Theoretical Foundation

### 核心概念

| 概念 | 定义 | 来源 |
|------|------|------|
| **零点击搜索** | 用户未点击任何结果即离开SERP | SparkToro研究 |
| **搜索意图分类** | 信息型/导航型/交易型 | Broder (2002) |
| **广告库存** | 可展示广告的位置数量 | 行业标准 |
| **ARPU稀释** | 零点击导致每搜索收入下降 | 分析师框架 |

### 关键数据来源

- SparkToro/Similarweb零点击率研究
- Google官方AI Overviews数据
- SEMrush/Ahrefs搜索行为数据
- 广告主调研和行业报告

---

## Framework Components

### Component 1: 零点击率分解

```yaml
zero_click_decomposition:

  total_zero_click_rate:
    definition: "所有搜索中零点击的比例"
    current_estimate: "38-45%"
    trend: "AI Overviews推出后略有上升"

  by_intent_type:
    informational:
      share_of_searches: "~60%"
      zero_click_rate: "55-65%"
      ad_monetization: "低（知识面板为主）"
      examples: ["天气", "时间", "简单问答"]

    navigational:
      share_of_searches: "~15%"
      zero_click_rate: "70-80%"
      ad_monetization: "中（品牌词竞价）"
      examples: ["facebook login", "amazon"]

    transactional:
      share_of_searches: "~25%"
      zero_click_rate: "15-25%"
      ad_monetization: "高（购买意图强）"
      examples: ["buy iPhone", "hotel NYC"]

  key_insight: |
    零点击主要集中在信息型搜索，而广告收入主要来自交易型搜索。
    因此，零点击率上升≠广告收入同比例下降。
```

### Component 2: 收入影响模型

```yaml
revenue_impact_model:

  baseline_metrics:
    total_searches_per_day: "85亿"
    search_ad_revenue_annual: "$200B+"
    revenue_per_search: "$0.064"
    ad_load: "广告/搜索比例"

  impact_calculation:
    step_1_intent_weighted_zero_click:
      formula: |
        加权零点击损失 = Σ(意图类型占比 × 零点击率 × 广告变现系数)

        信息型: 60% × 60% × 0.2 = 7.2%
        导航型: 15% × 75% × 0.4 = 4.5%
        交易型: 25% × 20% × 1.0 = 5.0%
        ─────────────────────────────
        加权影响: 16.7%（远低于总体45%零点击率）

    step_2_mitigation_factors:
      - shopping_ads_expansion: "+2-3%收入"
      - ai_overview_sponsored: "+1-2%收入（测试中）"
      - higher_quality_clicks: "+1%（转化率提升）"

    step_3_net_impact:
      formula: |
        净收入影响 = 加权损失 - 缓解因素
        = 16.7% - 5% = ~12%潜在影响（最坏情况）

        但考虑到:
        - 搜索量仍在增长(+5-8%/年)
        - 新广告形式补偿
        - AI提升用户体验→更多搜索

        实际影响可能是: 中性到轻微负面

  scenario_analysis:
    bear_case:
      ai_overview_adoption: "80%搜索"
      zero_click_increase: "+15pp"
      revenue_impact: "-8%至-12%"
      probability: "20%"

    base_case:
      ai_overview_adoption: "50%搜索"
      zero_click_increase: "+5pp"
      revenue_impact: "-2%至+2%"
      probability: "60%"

    bull_case:
      ai_overview_adoption: "30%搜索"
      zero_click_increase: "+2pp"
      revenue_impact: "+3%至+5%"
      probability: "20%"
```

### Component 3: AI Overview渗透追踪

```yaml
ai_overview_tracking:

  rollout_status:
    us_coverage: "XX%搜索"
    global_coverage: "XX%搜索"
    query_types_enabled: ["信息型", "部分交易型"]

  user_behavior_changes:
    click_through_rate_change: "+X%/-X%"
    time_on_serp: "+/-秒"
    follow_up_searches: "+/-次"
    ad_engagement: "+/-点击率"

  publisher_impact:
    traffic_change: "-X%至+X%"
    affected_verticals: ["新闻", "知识站点", "评测站"]
    beneficiaries: ["权威来源", "独家数据"]

  monitoring_kpis:
    - "AI Overview展示率"
    - "展示后点击率"
    - "广告位置变化"
    - "出版商流量变化"
```

### Component 4: 广告形式迁移

```yaml
ad_format_migration:

  traditional_search_ads:
    current_share: "~70%"
    trend: "稳定略降"
    zero_click_vulnerability: "中"

  shopping_ads:
    current_share: "~20%"
    trend: "上升"
    zero_click_vulnerability: "低（产品图片吸引点击）"

  ai_sponsored_content:
    current_share: "测试中"
    trend: "快速增长预期"
    format: "AI Overview内嵌广告"
    monetization_potential: "高（意图明确）"

  video_ads_youtube:
    current_share: "~10%"
    trend: "上升"
    zero_click_relevance: "不适用"

  migration_thesis: |
    Google正在将广告库存从传统文字广告迁移到:
    1. 购物广告（视觉+意图）
    2. AI Overview嵌入广告（测试中）
    3. YouTube/Shorts广告（视频优先）

    这种迁移可能完全抵消零点击影响。
```

---

## Scoring System: Zero-Click Impact Score (ZCI_Score)

### 评分公式

```yaml
zci_score_calculation:

  dimensions:
    zero_click_rate_trend:
      weight: 25%
      scoring:
        "+2": "零点击率下降"
        "+1": "零点击率稳定"
        "0": "零点击率微升(<5pp)"
        "-1": "零点击率明显上升(5-10pp)"
        "-2": "零点击率大幅上升(>10pp)"

    intent_mix_protection:
      weight: 25%
      scoring:
        "+2": "交易型占比上升"
        "+1": "交易型占比稳定"
        "0": "中性"
        "-1": "交易型占比下降"
        "-2": "交易型占比大幅下降"

    ad_format_adaptation:
      weight: 25%
      scoring:
        "+2": "新广告形式成功补偿"
        "+1": "新广告形式部分补偿"
        "0": "适应中"
        "-1": "新广告形式效果有限"
        "-2": "无有效替代"

    competitive_moat:
      weight: 25%
      scoring:
        "+2": "搜索份额上升"
        "+1": "搜索份额稳定"
        "0": "中性"
        "-1": "份额流失给AI搜索"
        "-2": "份额大幅流失"

  formula: |
    ZCI_Score = Σ(维度得分 × 权重) × 25 + 50
    范围: 0-100

    解读:
    80-100: 零点击影响可忽略或正面
    60-79: 影响可控，有缓解措施
    40-59: 影响中等，需密切关注
    20-39: 影响显著，需战略调整
    <20: 严重威胁核心业务
```

---

## Output Contract

```yaml
zero_click_impact_output:

  # 1. 零点击率分析
  zero_click_analysis:
    current_rate: "XX%"
    trend: "上升/稳定/下降"
    by_intent:
      informational: "XX%"
      navigational: "XX%"
      transactional: "XX%"
    ai_overview_contribution: "XX pp"

  # 2. 收入影响估算
  revenue_impact:
    gross_impact: "-XX%（不考虑缓解）"
    mitigation_factors:
      - factor: "购物广告增长"
        offset: "+X%"
      - factor: "AI广告测试"
        offset: "+X%"
    net_impact: "-X%至+X%"
    confidence: "高/中/低"

  # 3. 场景分析
  scenarios:
    bear: {probability: "X%", revenue_impact: "-X%", driver: "..."}
    base: {probability: "X%", revenue_impact: "X%", driver: "..."}
    bull: {probability: "X%", revenue_impact: "+X%", driver: "..."}

  # 4. 广告迁移追踪
  ad_migration:
    traditional_text: {share: "X%", trend: "..."}
    shopping: {share: "X%", trend: "..."}
    ai_sponsored: {share: "X%", trend: "..."}
    video: {share: "X%", trend: "..."}

  # 5. ZCI评分
  zci_score:
    total: 0-100
    breakdown:
      zero_click_trend: X
      intent_protection: X
      format_adaptation: X
      competitive_moat: X
    interpretation: "影响程度描述"

  # 6. 监控建议
  monitoring:
    kpis: ["指标1", "指标2"]
    frequency: "月度/季度"
    upgrade_trigger: "条件"
    downgrade_trigger: "条件"
```

---

## Application Example: Google 2026

### 零点击分析

```yaml
google_zero_click_2026:

  current_state:
    total_zero_click_rate: "42%"
    ai_overview_coverage: "35%搜索"
    yoy_change: "-3pp（从45%下降）"

  by_intent:
    informational: "60% × 58% = 34.8% 影响"
    navigational: "15% × 72% = 10.8% 影响"
    transactional: "25% × 18% = 4.5% 影响"

  revenue_weighted_impact:
    gross: "~12%"
    mitigations:
      shopping_ads: "+3%"
      ai_ads_test: "+1%"
      quality_improvement: "+1%"
    net: "~7%潜在影响"

  actual_observation: |
    实际搜索广告收入增速: +12% YoY
    说明: 搜索量增长+广告优化完全抵消零点击影响
```

### ZCI评分

| 维度 | 得分 | 证据 |
|------|------|------|
| 零点击趋势 | +1 | 42%稳定，AI Overview未加剧 |
| 意图保护 | +1 | 交易型搜索点击率稳定 |
| 广告适应 | +1 | Shopping+AI广告增长 |
| 竞争护城河 | +2 | 搜索份额91%稳定 |

**ZCI_Score = 75** (影响可控)

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-ZC-001** | 零点击率突破55% | 重估收入影响 |
| **KS-ZC-002** | AI搜索替代品份额>10% | 评估颠覆风险 |
| **KS-ZC-003** | 广告主大规模削减搜索预算 | 验证需求侧 |
| **KS-ZC-004** | 交易型零点击率>40% | 核心收入威胁 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 数据来源偏差 | SparkToro等第三方数据可能不准确 |
| 🚩 定义不一致 | "零点击"定义各方不同 |
| 🚩 行为变化 | 用户可能多次搜索代替单次深度搜索 |
| 🚩 测量困难 | AI Overview内点击难以追踪 |

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
