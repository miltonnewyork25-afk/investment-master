# Advertising Cycle Indicator v1.0

## Skill Metadata
- **Name**: advertising-cycle-indicator
- **Version**: 1.0
- **Category**: macro_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中广告周期与宏观经济关系的追踪需求

---

## Purpose

追踪广告支出周期与宏观经济的关系，为广告驱动公司（Google/Meta/Amazon/Snap等）提供周期定位和预测框架。

**核心问题**：
- 广告支出是经济的领先/同步/滞后指标？
- 广告支出与GDP/消费者信心的弹性是多少？
- 当前处于广告周期的哪个阶段？

**适用公司**：
| 公司 | 广告收入占比 | 周期敏感度 |
|------|------------|-----------|
| Google | 77% | 中 |
| Meta | 97% | 高 |
| Snap | 99% | 极高 |
| Pinterest | 95% | 高 |
| Trade Desk | 100% | 高 |
| Amazon Ads | 15% | 中 |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 广告公司估值 | 周期调整后的收入预测 |
| 宏观敏感度分析 | 经济下行对广告的影响 |
| 行业对标 | 广告 vs GDP/消费增速对比 |

---

## Theoretical Foundation

### 广告-经济关系

| 指标 | 与广告支出关系 | 领先/滞后 | 弹性 |
|------|---------------|----------|------|
| GDP增速 | 正相关 | 同步 | 1.5-2.0x |
| 消费者信心 | 正相关 | 领先2-3月 | 0.8-1.2x |
| 企业利润 | 正相关 | 同步 | 1.0-1.5x |
| 失业率 | 负相关 | 滞后3-6月 | -1.0x |
| 利率 | 复杂 | 滞后 | 非线性 |

### 参考研究

- Deleersnyder et al. (2009): "The Role of National Culture in Advertising's Sensitivity to Business Cycles"
- Graham & Frankenberger (2011): "The Earnings Effects of Marketing Communication Expenditures"
- IAB: 季度广告支出报告

---

## Framework Components

### Component 1: 广告周期阶段识别

```yaml
ad_cycle_stages:

  expansion:
    characteristics:
      - "广告支出增速>GDP增速"
      - "CPM/CPC持续上涨"
      - "广告库存紧张"
      - "新广告主涌入"
    indicators:
      growth_vs_gdp: ">1.5x"
      pricing_trend: "上涨"
      inventory_utilization: ">85%"

  peak:
    characteristics:
      - "广告支出增速放缓"
      - "定价增速见顶"
      - "预算审批收紧信号"
    indicators:
      growth_vs_gdp: "1.0-1.5x"
      pricing_trend: "持平/微涨"
      budget_sentiment: "谨慎"

  contraction:
    characteristics:
      - "广告支出增速<GDP增速"
      - "CPM/CPC下跌"
      - "广告主削减预算"
      - "效果广告>品牌广告"
    indicators:
      growth_vs_gdp: "<1.0x"
      pricing_trend: "下跌"
      performance_vs_brand: "效果占比上升"

  trough:
    characteristics:
      - "广告支出负增长"
      - "定价见底"
      - "清理库存"
    indicators:
      growth_vs_gdp: "负"
      pricing_trend: "见底"
      inventory_utilization: "<70%"

  current_stage_assessment:
    methodology:
      1. "收集最新广告支出数据"
      2. "对比GDP/消费增速"
      3. "追踪定价趋势"
      4. "评估广告主预算情绪"
    output: "当前阶段 + 证据"
```

### Component 2: 宏观-广告弹性模型

```yaml
elasticity_model:

  gdp_elasticity:
    formula: "%Δ广告支出 / %ΔGDP"
    historical_average: 1.7
    range: "1.2-2.5（取决于周期阶段）"
    current_estimate: "需要计算"

  consumer_confidence_elasticity:
    formula: "%Δ广告支出 / %Δ消费者信心"
    historical_average: 0.9
    lead_time: "2-3个月"

  corporate_profit_elasticity:
    formula: "%Δ广告支出 / %Δ企业利润"
    historical_average: 1.2

  application:
    scenario_analysis:
      - scenario: "GDP增速2%→1%"
        ad_impact: "-1.7%（弹性1.7x）"

      - scenario: "消费者信心下降10%"
        ad_impact: "-9%（弹性0.9x）"

      - scenario: "经济衰退（GDP -2%）"
        ad_impact: "-10%至-15%"
```

### Component 3: 广告渠道周期敏感度

```yaml
channel_sensitivity:

  by_channel:
    search:
      sensitivity: "中"
      rationale: "效果可衡量，预算最后削减"
      recession_impact: "-5%至-10%"

    social:
      sensitivity: "高"
      rationale: "品牌+效果混合"
      recession_impact: "-10%至-20%"

    display:
      sensitivity: "高"
      rationale: "品牌导向，首先削减"
      recession_impact: "-15%至-25%"

    video:
      sensitivity: "中高"
      rationale: "品牌导向但粘性强"
      recession_impact: "-10%至-20%"

    retail_media:
      sensitivity: "低"
      rationale: "接近购买点，ROI明确"
      recession_impact: "-0%至-5%"

  by_advertiser_type:
    small_business:
      sensitivity: "极高"
      behavior: "现金流紧张时立即削减"

    mid_market:
      sensitivity: "高"
      behavior: "按季度调整预算"

    enterprise:
      sensitivity: "中"
      behavior: "年度预算有惯性"

    brand:
      sensitivity: "高"
      behavior: "品牌广告首先削减"

    performance:
      sensitivity: "低"
      behavior: "ROI正就继续投"
```

### Component 4: 领先指标监测

```yaml
leading_indicators:

  ad_specific:
    - indicator: "广告主预算调查"
      source: "IAB/CMO Survey"
      lead_time: "1-2季度"
      current_reading: "待更新"

    - indicator: "广告招聘趋势"
      source: "LinkedIn/Indeed"
      lead_time: "2-3个月"
      current_reading: "待更新"

    - indicator: "广告科技公司指引"
      source: "TTD/MGNI/PUBM"
      lead_time: "1季度"
      current_reading: "待更新"

  macro:
    - indicator: "消费者信心指数"
      source: "Conference Board/Michigan"
      lead_time: "2-3个月"
      current_reading: "待更新"

    - indicator: "PMI"
      source: "ISM"
      lead_time: "1-2个月"
      current_reading: "待更新"

    - indicator: "企业利润预期"
      source: "FactSet/Bloomberg"
      lead_time: "1季度"
      current_reading: "待更新"

  composite_indicator:
    formula: "加权平均(广告指标×0.6 + 宏观指标×0.4)"
    interpretation:
      ">60": "扩张期"
      "40-60": "稳定/过渡"
      "<40": "收缩期"
```

---

## Scoring System: Ad Cycle Score (AC_Score)

```yaml
ac_score_calculation:

  dimensions:
    cycle_stage:
      weight: 30%
      scoring:
        "+2": "扩张早期"
        "+1": "扩张晚期/峰值"
        "0": "过渡期"
        "-1": "收缩早期"
        "-2": "收缩/谷底"

    pricing_trend:
      weight: 25%
      scoring:
        "+2": "CPM/CPC强劲上涨"
        "+1": "温和上涨"
        "0": "持平"
        "-1": "温和下跌"
        "-2": "大幅下跌"

    advertiser_sentiment:
      weight: 25%
      scoring:
        "+2": "预算增加意愿强"
        "+1": "预算温和增长"
        "0": "预算持平"
        "-1": "预算谨慎/削减"
        "-2": "预算大幅削减"

    macro_backdrop:
      weight: 20%
      scoring:
        "+2": "GDP加速+信心上升"
        "+1": "GDP稳定+信心稳定"
        "0": "混合信号"
        "-1": "GDP放缓+信心下降"
        "-2": "衰退风险高"

  formula: |
    AC_Score = Σ(维度得分 × 权重) × 25 + 50
    范围: 0-100

  interpretation:
    80-100: "广告繁荣期，增持广告股"
    60-79: "广告扩张期，持有"
    40-59: "广告稳定/过渡期，观望"
    20-39: "广告收缩期，减持"
    0-19: "广告低谷期，等待反转信号"
```

---

## Output Contract

```yaml
ad_cycle_output:

  # 1. 周期定位
  cycle_position:
    current_stage: "扩张/峰值/收缩/谷底"
    evidence:
      - "证据1"
      - "证据2"
    months_in_stage: "X个月"
    expected_duration: "还有X个月"

  # 2. 宏观-广告关系
  macro_ad_relationship:
    gdp_elasticity:
      current: X
      historical_avg: 1.7
    consumer_confidence_correlation:
      current: X
      lag: "X个月"

  # 3. 渠道敏感度
  channel_sensitivity:
    search: "低/中/高"
    social: "低/中/高"
    display: "低/中/高"
    video: "低/中/高"
    retail_media: "低/中/高"

  # 4. 领先指标仪表板
  leading_indicators:
    ad_specific:
      - {indicator: "名称", value: X, trend: "↑/↓/→"}
    macro:
      - {indicator: "名称", value: X, trend: "↑/↓/→"}
    composite: X

  # 5. AC评分
  ac_score:
    total: 0-100
    breakdown:
      cycle_stage: X
      pricing_trend: X
      advertiser_sentiment: X
      macro_backdrop: X
    interpretation: "描述"

  # 6. 情景分析
  scenarios:
    base:
      macro_assumption: "GDP X%"
      ad_growth_forecast: "X%"
      probability: "X%"
    bear:
      macro_assumption: "衰退"
      ad_growth_forecast: "-X%"
      probability: "X%"
    bull:
      macro_assumption: "加速"
      ad_growth_forecast: "+X%"
      probability: "X%"

  # 7. 投资含义
  investment_implications:
    overall_stance: "增持/持有/减持"
    channel_preference: ["渠道1", "渠道2"]
    stock_implications:
      - {company: "Google", sensitivity: "中", recommendation: "..."}
      - {company: "Meta", sensitivity: "高", recommendation: "..."}
```

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-AC-001** | 经济衰退确认(NBER) | 下调所有广告股 |
| **KS-AC-002** | 广告支出连续2季度负增长 | 进入收缩模式 |
| **KS-AC-003** | 大型广告主大规模削减预算 | 重估周期位置 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 数据滞后 | 广告支出数据通常滞后1-2月 |
| 🚩 渠道转移 | 总量下降可能掩盖渠道转移 |
| 🚩 区域差异 | 美国/欧洲/中国周期不同步 |

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
