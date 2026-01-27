# Robotaxi Valuation Framework v1.0

## Skill Metadata
- **Name**: robotaxi-valuation
- **Version**: 1.0
- **Category**: valuation
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中Waymo估值、Tesla FSD/Robotaxi期权估值需求

---

## Purpose

为自动驾驶出行服务（Robotaxi）业务提供专门估值框架。

**核心挑战**：
- 业务处于早期，传统DCF不适用
- 技术进度是最大变量
- 监管审批路径不确定
- 安全记录影响扩张速度
- 需要结合期权定价和概率分析

**适用公司**：
| 公司 | 业务 | 阶段 |
|------|------|------|
| Waymo (Alphabet) | Waymo One | 商业化早期 |
| Tesla | FSD/Robotaxi | 开发中 |
| Cruise (GM) | Cruise | 暂停/重组 |
| Baidu Apollo | 萝卜快跑 | 商业化早期 |
| Zoox (Amazon) | Zoox | 开发中 |
| Mobileye | 技术供应商 | 合作模式 |

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| Waymo/Cruise业务估值 | 作为母公司SOTP一部分 |
| Tesla估值 | Robotaxi期权价值 |
| 自动驾驶投资 | 纯AV公司或供应商 |
| 出行市场分析 | 评估颠覆风险 |

---

## Valuation Methodology

### Method 1: TAM渗透法

```yaml
tam_penetration_method:

  total_addressable_market:
    global_ride_hail_market: "$350B (2025)"
    growth_rate: "10% CAGR"
    robotaxi_addressable: "60%（城市+郊区）"
    tam_2035: "$550B"

  penetration_scenarios:
    bear_case:
      robotaxi_penetration_2035: "5%"
      market_share: "20%"
      revenue: "$5.5B"

    base_case:
      robotaxi_penetration_2035: "15%"
      market_share: "30%"
      revenue: "$25B"

    bull_case:
      robotaxi_penetration_2035: "30%"
      market_share: "40%"
      revenue: "$66B"

  valuation:
    revenue_multiple: "3-5x（成长期）"
    discount_rate: "15%（高风险）"
    time_to_maturity: "10年"
```

### Method 2: 单位经济学DCF

```yaml
unit_economics_dcf:

  vehicle_level_economics:
    inputs:
      vehicle_cost: "$150,000-250,000"
      vehicle_life: "5年/500,000英里"
      utilization_rate: "50-70%（小时/天）"
      revenue_per_mile: "$2.50-4.00"
      cost_per_mile:
        depreciation: "$0.30-0.50"
        maintenance: "$0.15-0.25"
        cleaning: "$0.05-0.10"
        insurance: "$0.20-0.40"
        remote_support: "$0.10-0.20"
        energy: "$0.08-0.15"
        platform_opex: "$0.10-0.20"
        total: "$1.00-1.80"

    outputs:
      gross_margin_per_mile: "$1.00-2.50"
      annual_miles_per_vehicle: "80,000-120,000"
      annual_gross_profit_per_vehicle: "$80K-300K"
      payback_period: "1-3年"

  fleet_level_projection:
    template: |
      | 年份 | 车队规模 | 利用率 | 收入 | 毛利 | 投资 |
      |------|---------|--------|------|------|------|
      | 2026 | 1,000 | 50% | $200M | $80M | $200M |
      | 2027 | 5,000 | 55% | $1.1B | $500M | $800M |
      | 2028 | 20,000 | 60% | $4.8B | $2.4B | $3B |
      | 2030 | 100,000 | 65% | $26B | $14B | $10B |

  dcf_inputs:
    wacc: "12-15%"
    terminal_growth: "3%"
    terminal_multiple: "15x EBITDA"
```

### Method 3: 期权定价法

```yaml
option_pricing_method:

  real_option_framework:
    underlying_asset: "成功商业化后的Robotaxi业务价值"
    strike_price: "累计研发投资+监管成本"
    time_to_expiry: "技术成熟时间"
    volatility: "技术/监管不确定性"
    risk_free_rate: "4%"

  simplified_probability_approach:
    step_1_success_scenarios:
      full_success:
        probability: "30%"
        value: "$150B"
        probability_weighted: "$45B"

      partial_success:
        probability: "40%"
        value: "$50B"
        probability_weighted: "$20B"

      failure:
        probability: "30%"
        value: "$0"
        probability_weighted: "$0"

    step_2_expected_value:
      gross_value: "$65B"
      discount_factor: "0.5（10年@7%）"
      present_value: "$32.5B"

    step_3_net_option_value:
      pv_of_expected_value: "$32.5B"
      cumulative_investment: "$15B"
      net_option_value: "$17.5B"
```

### Method 4: 可比交易法

```yaml
comparable_transactions:

  private_funding_rounds:
    - company: "Cruise"
      date: "2021"
      valuation: "$30B"
      stage: "Pre-commercial"

    - company: "Waymo"
      date: "2020"
      valuation: "$30B"
      stage: "Early commercial"

    - company: "Aurora"
      date: "2021"
      valuation: "$13B"
      stage: "Pre-commercial"

  public_comparables:
    - company: "Mobileye"
      market_cap: "$20B"
      business_model: "Technology supplier"

  adjustment_factors:
    technology_lead: "+/- 20%"
    regulatory_progress: "+/- 15%"
    commercial_traction: "+/- 25%"
    parent_resources: "+/- 10%"
```

---

## Key Valuation Drivers

### Driver 1: 技术进度 (Technology Progress)

```yaml
technology_assessment:

  autonomy_levels:
    L4_geofenced: "特定区域全自动"
    L4_expanded: "多城市/多场景"
    L5_general: "任何场景"

  key_metrics:
    miles_between_disengagement: "MBD"
    miles_between_collision: "MBC"
    human_intervention_rate: "次/万英里"

  tracking:
    - "CA DMV自动驾驶报告"
    - "公司安全报告"
    - "第三方测试"

  scoring:
    "+2": "行业领先，MBD>50,000"
    "+1": "竞争力强，MBD 20,000-50,000"
    "0": "中等水平，MBD 10,000-20,000"
    "-1": "落后，MBD 5,000-10,000"
    "-2": "显著落后，MBD<5,000"
```

### Driver 2: 监管进度 (Regulatory Progress)

```yaml
regulatory_assessment:

  key_approvals:
    - "加州DMV无人驾驶许可"
    - "加州CPUC商业运营许可"
    - "各州扩展许可"
    - "联邦NHTSA豁免"

  city_expansion:
    template: |
      | 城市 | 状态 | 服务类型 | 启动时间 |
      |------|------|----------|----------|
      | SF | 运营中 | 24/7付费 | 2023 |
      | LA | 运营中 | 24/7付费 | 2024 |
      | Phoenix | 运营中 | 24/7付费 | 2022 |
      | Austin | 测试中 | 员工 | 2025 |

  scoring:
    "+2": "多城市商业运营，扩张顺利"
    "+1": "商业运营中，扩张进行"
    "0": "有限商业运营"
    "-1": "仅测试阶段"
    "-2": "监管受阻/暂停"
```

### Driver 3: 安全记录 (Safety Record)

```yaml
safety_assessment:

  metrics:
    - collision_rate: "碰撞/百万英里"
    - injury_rate: "伤亡/百万英里"
    - at_fault_rate: "责任事故率"

  comparison_baseline:
    human_driver_collision_rate: "~4次/百万英里"
    human_driver_fatality_rate: "~1.3次/亿英里"

  tracking_sources:
    - "NHTSA事故报告"
    - "CA DMV碰撞报告"
    - "公司透明度报告"

  scoring:
    "+2": "安全记录显著优于人类"
    "+1": "安全记录优于人类"
    "0": "安全记录与人类持平"
    "-1": "安全记录略逊于人类"
    "-2": "发生严重事故/暂停运营"

  kill_switch:
    condition: "致命事故导致全面暂停"
    action: "估值归零直至恢复"
```

### Driver 4: 商业牵引力 (Commercial Traction)

```yaml
commercial_traction:

  metrics:
    - weekly_rides: "周订单量"
    - monthly_revenue: "月收入"
    - customer_satisfaction: "NPS"
    - repeat_usage: "复购率"

  example_waymo:
    weekly_rides: "450,000+"
    cities: "4个城市"
    revenue_estimate: "$200-300M ARR"
    growth: ">100% YoY"

  scoring:
    "+2": "强劲增长，PMF验证"
    "+1": "增长中，PMF初步验证"
    "0": "早期商业化"
    "-1": "商业化困难"
    "-2": "无商业化进展"
```

---

## Scoring System: Robotaxi Readiness Score (RR_Score)

```yaml
rr_score_calculation:

  dimensions:
    technology: 30%
    regulatory: 25%
    safety: 25%
    commercial: 20%

  formula: |
    RR_Score = Σ(维度得分 × 权重) × 25 + 50
    范围: 0-100

  interpretation:
    90-100: "商业化成熟，可用标准估值"
    75-89: "商业化早期，高确信期权"
    60-74: "预商业化，中等确信期权"
    40-59: "开发阶段，低确信期权"
    <40: "早期研发，极高风险"

  valuation_method_by_score:
    "80+": "单位经济学DCF为主"
    "60-79": "期权定价+DCF"
    "40-59": "纯期权定价"
    "<40": "可比交易参考"
```

---

## Output Contract

```yaml
robotaxi_valuation_output:

  # 1. 业务概览
  business_overview:
    company: "公司名"
    business_unit: "业务单元"
    stage: "研发/测试/预商业/商业化"
    fleet_size: "车队规模"
    cities_operational: "运营城市数"
    weekly_rides: "周订单量"

  # 2. RR评分
  rr_score:
    total: 0-100
    breakdown:
      technology: {score: X, evidence: "..."}
      regulatory: {score: X, evidence: "..."}
      safety: {score: X, evidence: "..."}
      commercial: {score: X, evidence: "..."}
    recommended_valuation_method: "DCF/期权/可比"

  # 3. 估值结果
  valuation:
    method_1_tam_penetration:
      bear: "$XB"
      base: "$XB"
      bull: "$XB"

    method_2_unit_economics:
      dcf_value: "$XB"
      key_assumptions: ["假设1", "假设2"]

    method_3_option_pricing:
      success_probability: "X%"
      success_value: "$XB"
      expected_value: "$XB"

    method_4_comparables:
      implied_value: "$XB"
      comparables_used: ["公司1", "公司2"]

    weighted_value:
      bear: "$XB"
      base: "$XB"
      bull: "$XB"
      methodology_weights: {dcf: X%, option: X%, comp: X%}

  # 4. 关键假设
  key_assumptions:
    technology:
      mbd_assumption: "X英里"
      timeline_to_scale: "X年"
    regulatory:
      city_expansion_rate: "X城市/年"
      federal_approval: "20XX"
    commercial:
      utilization_rate: "X%"
      revenue_per_mile: "$X"
      cost_per_mile: "$X"

  # 5. 敏感性分析
  sensitivity:
    to_success_probability: "概率±10% → 估值±$XB"
    to_penetration: "渗透率±5% → 估值±$XB"
    to_timeline: "延迟1年 → 估值-$XB"

  # 6. 风险因素
  risks:
    technology_risk: "描述"
    regulatory_risk: "描述"
    safety_risk: "描述"
    competition_risk: "描述"
    kill_switch: "致命事故导致暂停"

  # 7. 里程碑追踪
  milestones:
    - milestone: "描述"
      expected_date: "20XX QX"
      valuation_impact: "+$XB/-$XB"
      probability: "X%"
```

---

## Application Example: Waymo (2026)

### RR评分

| 维度 | 得分 | 证据 |
|------|------|------|
| 技术 | +2 | MBD>100,000，行业领先 |
| 监管 | +2 | 4城市商业运营，持续扩张 |
| 安全 | +1 | 优于人类，无严重事故 |
| 商业 | +1 | 45万周订单，强增长 |

**RR_Score = 82** (商业化早期，高确信期权)

### 估值

```yaml
waymo_valuation_2026:

  method_1_tam:
    base_case: "$80B"
    assumptions:
      - "2035年Robotaxi TAM $80B (US)"
      - "Waymo份额35%"
      - "4x收入倍数"

  method_2_dcf:
    value: "$100B"
    assumptions:
      - "2030年100,000车队"
      - "利用率65%"
      - "毛利率50%"
      - "12% WACC"

  method_3_option:
    expected_value: "$70B"
    assumptions:
      - "成功概率60%"
      - "成功估值$120B"
      - "失败估值$0"

  weighted_valuation:
    weights: {tam: 30%, dcf: 40%, option: 30%}
    value: "$85B"
    range: "$50B - $120B"
```

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|----------|
| **KS-RT-001** | 致命事故导致运营暂停 | 估值归零直至恢复 |
| **KS-RT-002** | 监管全面收紧 | 下调监管评分和估值 |
| **KS-RT-003** | 技术路线被证伪 | 重新评估技术评分 |
| **KS-RT-004** | 母公司撤资 | 调整持续经营假设 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 安全数据选择性披露 | 公司可能只报告有利数据 |
| 🚩 里程定义不一致 | 有人/无人里程混计 |
| 🚩 城市复杂度差异 | SF难度远高于Phoenix |
| 🚩 补贴掩盖经济学 | 早期可能亏本获客 |

---

## v2.0 Contract Compliance

| 模块 | 状态 |
|------|------|
| Core Principles | ✅ |
| Scoring System | ✅ |
| Kill Switches | ✅ |
| Red Flags | ✅ |
| Output Contract | ✅ |
| Multiple Methods | ✅ |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本 |
