---
name: tech-maturity-assessor
description: 技术成熟度评估器。基于TRL(技术就绪度)标准评估生态科技公司的技术发展阶段、商业化进程和投资价值，集成生命周期价值模型和技术路线风险分析。
---

# 技术成熟度评估器 v1.1 (Prediction Market Enhanced)

## 功能描述

基于NASA TRL(Technology Readiness Level)框架，评估生态科技企业的技术成熟度和商业化进程，包括：
- TRL 1-9级技术成熟度评估
- 技术商业化时间线预测
- 技术风险等级评估
- 生命周期价值建模
- 技术路线选择分析
- 专利和知识产权评估

## TRL技术成熟度分级标准

### TRL分级定义
```yaml
trl_levels:
  TRL_1:
    name: "基本原理观察"
    description: "基础科学原理被观察和报告"
    典型特征: ["实验室研究", "理论验证", "科学论文"]
    风险等级: "极高"
    投资类型: "早期VC/政府资助"
    时间到商业化: "10-15年"

  TRL_2:
    name: "技术概念形成"
    description: "技术概念和应用被制定"
    典型特征: ["概念验证", "初步实验", "专利申请"]
    风险等级: "极高"
    投资类型: "种子轮"
    时间到商业化: "8-12年"

  TRL_3:
    name: "概念验证"
    description: "实验室分析研究证明技术可行性"
    典型特征: ["实验室样品", "性能验证", "技术论文"]
    风险等级: "很高"
    投资类型: "天使轮"
    时间到商业化: "6-10年"

  TRL_4:
    name: "实验室验证"
    description: "组件在实验室环境验证"
    典型特征: ["功能样机", "性能测试", "技术指标确定"]
    风险等级: "高"
    投资类型: "A轮"
    时间到商业化: "4-8年"

  TRL_5:
    name: "相关环境验证"
    description: "组件在相关环境验证"
    典型特征: ["工程样机", "模拟环境测试", "关键技术突破"]
    风险等级: "中高"
    投资类型: "A/B轮"
    时间到商业化: "3-6年"

  TRL_6:
    name: "相关环境演示"
    description: "系统/子系统在相关环境演示"
    典型特征: ["原型系统", "现场测试", "性能验证"]
    风险等级: "中"
    投资类型: "B/C轮"
    时间到商业化: "2-4年"

  TRL_7:
    name: "运行环境演示"
    description: "系统原型在运行环境演示"
    典型特征: ["示范项目", "预商业化", "客户试用"]
    风险等级: "中低"
    投资类型: "C轮/战略投资"
    时间到商业化: "1-3年"

  TRL_8:
    name: "系统完成验证"
    description: "技术系统完成并通过验证"
    典型特征: ["商业化准备", "批量生产准备", "市场准入"]
    风险等级: "低"
    投资类型: "IPO前投资"
    时间到商业化: "0.5-2年"

  TRL_9:
    name: "实际应用验证"
    description: "技术在最终形态和最终条件下验证成功"
    典型特征: ["商业化生产", "规模化应用", "市场验证"]
    风险等级: "很低"
    投资类型: "公开市场/成长股"
    时间到商业化: "已商业化"
```

## 输入参数

### 技术基本信息
```yaml
technology_profile:
  company_name: "公司名称"
  technology_name: "技术名称"
  technology_category: "solar|wind|battery|ev|hydrogen|other"
  development_start_date: "2018-01-01"

  key_metrics:
    efficiency: 22.5%           # 技术效率指标
    cost_per_unit: 1.2         # 单位成本
    scalability: "高/中/低"     # 可规模化程度
    manufacturing_complexity: "高/中/低"

technical_details:
  core_innovation: "钙钛矿串联太阳能电池技术"
  patent_count: 45
  patent_citation_count: 120
  key_researchers: 8
  rd_investment_annual: 50.0   # 百万元/年

  development_milestones:
    - date: "2020-06"
      milestone: "实验室效率突破20%"
      trl_achieved: 3

    - date: "2022-03"
      milestone: "中试线验证"
      trl_achieved: 5

    - date: "2023-09"
      milestone: "示范项目运行"
      trl_achieved: 7
```

### 竞争技术对比
```yaml
competitive_landscape:
  dominant_technology:
    name: "硅基太阳能电池"
    current_trl: 9
    market_share: 85%
    efficiency: 20-22%
    cost_per_watt: 0.8

  emerging_competitors:
    - name: "PERC技术"
      trl: 8
      efficiency: 24%
      cost_advantage: "5%"

    - name: "HJT技术"
      trl: 7
      efficiency: 25%
      cost_disadvantage: "15%"
```

### 市场和应用环境
```yaml
market_environment:
  target_market_size: 1200    # 亿元
  market_growth_rate: 15%     # 年增长率
  customer_readiness: "高/中/低"
  regulatory_support: "强/中/弱"

  adoption_barriers:
    - barrier: "成本过高"
      severity: "高"
      timeline_to_resolve: "2-3年"

    - barrier: "稳定性验证不足"
      severity: "中"
      timeline_to_resolve: "1-2年"
```

## 核心评估算法

### 1. TRL评估算法
```python
def assess_trl_level(technology_data, milestone_data, validation_data):
    """
    综合评估技术的TRL等级
    """
    # 基础评分
    base_scores = {
        "laboratory_validation": evaluate_lab_results(technology_data),
        "field_testing": evaluate_field_tests(validation_data),
        "performance_metrics": evaluate_performance(technology_data["key_metrics"]),
        "manufacturing_readiness": evaluate_manufacturing(technology_data),
        "market_validation": evaluate_market_feedback(validation_data)
    }

    # 里程碑权重评分
    milestone_score = calculate_milestone_progress(milestone_data)

    # 对标评估
    competitive_position = benchmark_against_competitors(competitive_landscape)

    # 综合TRL计算
    weighted_score = (
        base_scores["laboratory_validation"] * 0.25 +
        base_scores["field_testing"] * 0.2 +
        base_scores["performance_metrics"] * 0.2 +
        base_scores["manufacturing_readiness"] * 0.2 +
        base_scores["market_validation"] * 0.15
    ) * milestone_score * competitive_position

    # 转换为TRL等级
    trl_level = convert_score_to_trl(weighted_score)

    return {
        "current_trl": trl_level,
        "confidence_level": calculate_confidence(base_scores),
        "next_milestone": identify_next_milestone(trl_level),
        "component_scores": base_scores,
        "risk_factors": identify_risk_factors(base_scores)
    }
```

### 2. 技术生命周期价值建模
```python
def model_lifecycle_value(trl_data, market_data, financial_data):
    """
    技术生命周期价值建模
    """
    stages = {
        "research_stage": {"trl_range": [1, 3], "value_multiple": 0.1},
        "development_stage": {"trl_range": [4, 6], "value_multiple": 0.5},
        "demonstration_stage": {"trl_range": [7, 8], "value_multiple": 1.5},
        "commercialization_stage": {"trl_range": [9], "value_multiple": 3.0}
    }

    current_stage = determine_stage(trl_data["current_trl"], stages)

    # 基础市场价值
    total_addressable_market = market_data["target_market_size"]
    potential_market_share = estimate_market_share(trl_data, market_data)
    market_value = total_addressable_market * potential_market_share

    # 阶段价值调整
    stage_multiplier = stages[current_stage]["value_multiple"]
    current_value = market_value * stage_multiplier

    # 风险调整
    risk_discount = calculate_risk_discount(trl_data["current_trl"])
    risk_adjusted_value = current_value * (1 - risk_discount)

    # 时间价值折现
    time_to_commercialization = estimate_time_to_market(trl_data)
    discount_rate = 0.12  # 技术投资折现率
    present_value = risk_adjusted_value / ((1 + discount_rate) ** time_to_commercialization)

    return {
        "current_stage": current_stage,
        "market_value_potential": market_value,
        "stage_adjusted_value": current_value,
        "risk_adjusted_value": risk_adjusted_value,
        "present_value": present_value,
        "time_to_commercialization": time_to_commercialization,
        "risk_discount_rate": risk_discount,
        "value_inflection_points": identify_value_inflections(trl_data)
    }
```

### 3. 技术风险评估
```python
def assess_technology_risks(trl_data, competitive_data, market_data):
    """
    综合技术风险评估
    """
    risk_categories = {
        "technical_risk": {
            "weight": 0.35,
            "factors": {
                "unproven_concepts": assess_concept_risk(trl_data),
                "manufacturing_complexity": assess_manufacturing_risk(trl_data),
                "scalability_challenges": assess_scalability_risk(trl_data),
                "stability_concerns": assess_stability_risk(trl_data)
            }
        },

        "competitive_risk": {
            "weight": 0.25,
            "factors": {
                "incumbent_response": assess_incumbent_threat(competitive_data),
                "alternative_technologies": assess_tech_substitution(competitive_data),
                "patent_freedom": assess_patent_risk(trl_data),
                "talent_retention": assess_talent_risk(trl_data)
            }
        },

        "market_risk": {
            "weight": 0.25,
            "factors": {
                "market_timing": assess_market_timing(market_data),
                "customer_adoption": assess_adoption_risk(market_data),
                "regulatory_changes": assess_regulatory_risk(market_data),
                "economic_sensitivity": assess_economic_risk(market_data)
            }
        },

        "execution_risk": {
            "weight": 0.15,
            "factors": {
                "funding_adequacy": assess_funding_risk(financial_data),
                "team_capability": assess_team_risk(trl_data),
                "partnership_dependency": assess_partner_risk(trl_data),
                "timeline_achievability": assess_timeline_risk(trl_data)
            }
        }
    }

    # 计算综合风险评分
    total_risk_score = 0
    detailed_risks = {}

    for category, data in risk_categories.items():
        category_score = sum(data["factors"].values()) / len(data["factors"])
        weighted_score = category_score * data["weight"]
        total_risk_score += weighted_score

        detailed_risks[category] = {
            "score": category_score,
            "weighted_contribution": weighted_score,
            "key_factors": data["factors"]
        }

    # 风险等级分类
    risk_level = classify_risk_level(total_risk_score)

    return {
        "overall_risk_score": total_risk_score,
        "risk_level": risk_level,
        "risk_breakdown": detailed_risks,
        "key_risk_factors": identify_top_risks(detailed_risks),
        "mitigation_strategies": suggest_risk_mitigation(detailed_risks)
    }
```

## 行业技术基准数据库

### 各行业技术成熟度基准
```yaml
industry_benchmarks:
  solar:
    crystalline_silicon:
      trl: 9
      efficiency: "20-22%"
      cost_per_watt: "$0.20"
      market_dominance: 85%

    perc:
      trl: 8
      efficiency: "23-24%"
      cost_premium: "5%"
      market_growth: "快速增长"

    hjt:
      trl: 7
      efficiency: "24-26%"
      cost_premium: "15%"
      commercialization_timeline: "2025-2027"

    perovskite:
      trl: 4-5
      efficiency_potential: "30%+"
      stability_challenge: "主要技术障碍"
      commercialization_timeline: "2028-2030"

  wind:
    horizontal_axis:
      trl: 9
      capacity_factor: "35-45%"
      lcoe: "$30-60/MWh"

    floating_offshore:
      trl: 7-8
      potential_market: "深水海域"
      cost_premium: "30-50%"

    vertical_axis:
      trl: 6
      niche_applications: "城市环境"

  battery:
    lithium_ion:
      trl: 9
      energy_density: "250-300 Wh/kg"
      cost: "$100-150/kWh"

    solid_state:
      trl: 6-7
      energy_density_potential: "400+ Wh/kg"
      safety_advantage: "显著"
      commercialization: "2026-2028"

    lithium_metal:
      trl: 5-6
      energy_density_potential: "500+ Wh/kg"
      cycle_life_challenge: "主要障碍"
```

## 输出报告格式

### 技术成熟度评估报告
```yaml
technology_maturity_report:
  executive_summary:
    current_trl: 6.2
    technology_category: "新兴技术"
    commercialization_timeline: "3-4年"
    investment_attractiveness: "中等"
    key_advantages: ["性能领先", "成本潜力"]
    major_risks: ["稳定性验证", "制造放大"]

  detailed_trl_assessment:
    current_level: 6.2
    confidence_interval: [5.8, 6.6]
    assessment_basis:
      laboratory_validation: 8.5/10
      field_testing: 6.8/10
      performance_metrics: 7.2/10
      manufacturing_readiness: 5.5/10
      market_validation: 6.0/10

  development_roadmap:
    next_major_milestone:
      target_trl: 7.0
      timeline: "12-18个月"
      key_requirements: ["大规模示范", "长期稳定性验证"]
      investment_needed: "80-120百万元"
      success_probability: 75%

    path_to_commercialization:
      - milestone: "TRL 7达成"
        timeline: "18个月"
        investment: 100
        risks: ["技术稳定性", "制造成本"]

      - milestone: "TRL 8达成"
        timeline: "36个月"
        investment: 200
        risks: ["市场接受度", "竞争反应"]

      - milestone: "TRL 9商业化"
        timeline: "48个月"
        investment: 400
        risks: ["规模化生产", "成本控制"]

  competitive_positioning:
    technology_advantage:
      vs_incumbent: "效率提升15%，成本相当"
      vs_emerging: "开发进度领先12-18个月"
      unique_value_proposition: "高效率+低成本潜力"

    competitive_threats:
      - threat: "PERC技术持续改进"
        probability: "高"
        impact: "中等"
        timeline: "2-3年"

      - threat: "钙钛矿技术突破"
        probability: "中等"
        impact: "高"
        timeline: "3-5年"

  value_creation_analysis:
    technology_value_creation:
      current_value: 150      # 百万元
      peak_value_potential: 2500
      value_inflection_points:
        - trl_6_to_7: "价值提升50%"
        - trl_7_to_8: "价值提升100%"
        - trl_8_to_9: "价值提升200%"

    investment_efficiency:
      development_cost_to_date: 200
      remaining_investment_need: 500
      value_per_investment_dollar: 5.0
      payback_period: "6-8年"

  risk_assessment:
    overall_risk: "中等偏高"

    technical_risks:
      - risk: "长期稳定性未充分验证"
        severity: "高"
        mitigation: "扩大测试规模和时间"

      - risk: "制造放大工艺复杂"
        severity: "中等"
        mitigation: "与设备商深度合作"

    market_risks:
      - risk: "市场接受度不确定"
        severity: "中等"
        mitigation: "客户教育和示范项目"

    competitive_risks:
      - risk: "现有技术持续改进"
        severity: "中等"
        mitigation: "加速开发进度"

  investment_recommendations:
    overall_recommendation: "谨慎乐观"

    optimal_investment_timing:
      current_stage: "适合技术投资"
      next_optimal_entry: "TRL 7达成后的规模化投资"

    investment_structure_suggestions:
      - "里程碑式投资释放"
      - "与产业链伙伴联合投资"
      - "政府资金与商业资金配合"

    exit_strategy_options:
      - strategy: "IPO"
        optimal_timing: "TRL 8-9阶段"
        value_potential: "最高"

      - strategy: "战略收购"
        optimal_timing: "TRL 7-8阶段"
        certainty: "较高"

      - strategy: "技术许可"
        optimal_timing: "TRL 6-7阶段"
        风险最低: "是"
```

### 可视化图表输出
```yaml
visualization_outputs:
  - type: "trl_progression_chart"
    title: "TRL发展轨迹图"
    data: "历史和预测TRL进展"

  - type: "risk_radar_chart"
    title: "技术风险雷达图"
    dimensions: ["技术", "市场", "竞争", "执行"]

  - type: "value_creation_waterfall"
    title: "价值创造瀑布图"
    stages: ["研发", "验证", "示范", "商业化"]

  - type: "competitive_landscape_matrix"
    title: "技术竞争态势矩阵"
    axes: ["技术成熟度", "市场影响力"]

  - type: "investment_timeline"
    title: "投资时机时间线"
    events: ["里程碑", "投资窗口", "风险点"]
```

## 数据源和验证

### 数据收集来源
```yaml
data_sources:
  技术数据:
    - 专利数据库 (USPTO, SIPO)
    - 科技文献 (Web of Science, IEEE)
    - 行业报告 (BloombergNEF, Wood Mackenzie)

  市场数据:
    - 市场研究报告
    - 客户调研
    - 竞争对手分析

  财务数据:
    - 公司财报
    - 投资记录
    - 估值数据

validation_methods:
  - 专家访谈验证
  - 同行技术对比
  - 历史案例回测
  - 第三方技术评估
```

## v1.1 预测市场增强层

### 技术突破概率验证

**核心升级**：TRL跃升时间线用预测市场概率验证，避免过度乐观/悲观。

```yaml
prediction_market_integration:
  技术突破概率来源:
    Manifold:
      - "Perovskite solar cell commercial viability by 2028"
      - "Solid-state battery mass production by 2027"
      - "Green hydrogen cost parity with gray hydrogen"
    Polymarket:
      - "Major EV battery breakthrough announcement"
      - "Fusion energy demonstration milestone"
    Metaculus:
      - "Solar cell efficiency record predictions"
      - "Battery energy density milestones"

  TRL加速/减速信号:
    加速信号:
      - "技术突破概率上升>15% → TRL跃升时间线缩短"
      - "竞争对手里程碑达成 → 技术可行性确认"
      - "大规模资金涌入 → 工程化加速"
    减速信号:
      - "技术突破概率下降>15% → TRL时间线延长"
      - "关键障碍持续未解 → 风险评级上调"
      - "资金枯竭信号 → 商业化路径受阻"

  概率验证机制:
    方法: "对比公司内部TRL预测 vs 预测市场同类技术概率"
    背离阈值: ">20%背离 → 触发深度审查"
    应用: "内部乐观偏差修正 / 市场过度悲观发现"
```

### 投资时机概率化

```python
def probabilistic_investment_timing(trl_data, market_probabilities):
    """
    v1.1: TRL里程碑概率 → 最优投资窗口
    """
    timing_signals = {}
    for milestone in trl_data["upcoming_milestones"]:
        # 预测市场概率
        pm_probability = market_probabilities.get(milestone["event"], None)
        internal_probability = milestone["success_probability"]

        if pm_probability:
            divergence = pm_probability - internal_probability
            timing_signals[milestone["target_trl"]] = {
                "internal_prob": internal_probability,
                "market_prob": pm_probability,
                "divergence": divergence,
                "signal": "UNDERVALUED" if divergence > 0.15 else
                          "OVERVALUED" if divergence < -0.15 else "FAIR"
            }
    return timing_signals
```

### 跨Skill联动接口

```yaml
skill_linkage:
  输入依赖:
    - lcoe-analyzer → 成本竞争力 → 技术商业化经济可行性
    - policy-impact-assessor → 监管支持度 → 市场准入时间线
    - green-finance-evaluator → 融资可得性 → 研发资金充足性

  输出供给:
    - → 主框架护城河模块: 技术壁垒评分 → 护城河深度
    - → 主框架估值模块: TRL阶段 → 估值倍数选择
    - → 主框架Kill Switch: 技术风险评级 → Tier2/3触发条件
    - → lcoe-analyzer: 技术成本轨迹 → 学习曲线参数更新

  联动触发规则:
    技术突破概率变化>20%: 全链路重新评估
    竞争技术TRL超越: 触发竞争力紧急重评
    新专利/论文发布: 更新技术壁垒评分
```

### 投资决策输出映射

```yaml
investment_decision_output:
  TRL→投资阶段映射:
    TRL_1-3: "仅限早期VC → 主流投资者回避"
    TRL_4-5: "技术验证阶段 → 高风险高回报窗口"
    TRL_6-7: "示范到预商业 → 最佳战略投资窗口"
    TRL_8-9: "商业化 → 公开市场可投资"

  Kill_Switch_triggers:
    Tier2_严重:
      - "核心技术被替代概率>30% → 减仓50%"
      - "TRL停滞>18个月 → 重新评估技术路径"
    Tier3_警告:
      - "竞争技术TRL追平概率>40% → 关注技术壁垒"
      - "关键人才流失信号 → 监控执行风险"

  数据质量标注:
    专利数据库: "[A:USPTO/SIPO+更新日期]"
    预测市场技术概率: "[B:Manifold/Metaculus+参与者数]"
    公司内部TRL评估: "[C:自评+需第三方验证]"
    行业技术报告: "[B:BloombergNEF/IRENA]"
```

## 使用场景

1. **技术投资决策**: 评估技术投资的时机和价值（预测市场概率验证）
2. **研发管理**: 制定技术开发路线图和里程碑（概率化时间线）
3. **竞争分析**: 评估技术竞争地位和威胁（跨skill联动）
4. **合作伙伴选择**: 识别技术合作和并购目标（TRL匹配）
5. **风险管控**: 识别和管理技术开发风险（Kill Switch集成）

## 输出文件
- `tech_maturity_report.pdf`: 完整技术评估报告
- `trl_assessment.xlsx`: TRL评估详细数据
- `risk_analysis.json`: 风险分析结构化数据
- `competitive_benchmark.csv`: 竞争对比数据
- `value_model.xlsx`: 生命周期价值模型
- `pm_tech_validation.json`: 预测市场技术概率验证（v1.1新增）