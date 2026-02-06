---
name: green-finance-evaluator
description: 绿色金融评估器。分析生态科技公司获得绿色融资的成本、可得性和条件，包括绿色债券、ESG投资、碳金融等多种融资渠道评估。
---

# 绿色金融评估器 v1.1 (Prediction Market Enhanced)

## 功能描述

综合评估生态科技公司的绿色融资能力和成本，包括：
- ESG评级对融资成本的影响
- 绿色债券发行可行性分析
- ESG投资资金可得性评估
- 碳金融工具应用分析
- 融资成本对比传统融资
- 绿色金融政策影响评估

## 输入参数

### 公司基本信息
```yaml
company_profile:
  name: "公司名称"
  industry: "solar|wind|battery|ev|green_building|other"
  total_assets: 5000.0        # 百万元
  annual_revenue: 2000.0      # 百万元
  debt_to_equity: 0.8         # 负债权益比
  credit_rating: "AA-"        # 主体信用评级
  listing_status: "A股上市"    # 上市状态

business_profile:
  green_revenue_ratio: 85%    # 绿色收入占比
  carbon_intensity: 0.15     # tCO2/万元收入
  esg_initiatives: ["碳中和承诺", "绿色供应链", "社会责任报告"]
  certifications: ["绿色工厂", "ISO14001", "绿色建筑"]
```

### 当前融资状况
```yaml
current_financing:
  outstanding_debt:
    bank_loans: 800.0         # 银行贷款余额(百万元)
    bonds: 1200.0            # 债券余额
    green_bonds: 300.0       # 绿色债券余额

  recent_financing:
    - type: "绿色债券"
      amount: 500.0
      interest_rate: 3.8%
      issue_date: "2023-06"
      use_of_proceeds: "光伏项目建设"

    - type: "银行绿色信贷"
      amount: 300.0
      interest_rate: 4.2%
      date: "2023-10"

  cost_of_capital:
    wacc: 6.5%
    cost_of_debt: 4.8%
    cost_of_equity: 8.2%
```

### ESG评级状况
```yaml
esg_ratings:
  msci_esg: "AA"
  sustainalytics: "16.2"     # ESG风险评分(越低越好)
  ftse_russell: "3.8"        # 1-5分评级
  domestic_rating: "AAA"     # 国内ESG评级

  rating_trends:
    msci_2023: "AA"
    msci_2022: "A"           # 改善趋势
    msci_2021: "BBB"

strengths: ["低碳转型", "公司治理", "产品创新"]
weaknesses: ["水资源管理", "供应链管理"]
```

## 核心评估模型

### 1. ESG溢价/折扣模型
```python
def calculate_esg_premium_discount(esg_rating, industry_median, market_conditions):
    """
    基于ESG评级计算融资成本调整
    """
    # ESG评级对融资成本的影响
    rating_impact = {
        "AAA": -0.4,    # 基点调整
        "AA": -0.25,
        "A": -0.1,
        "BBB": 0,       # 基准
        "BB": 0.15,
        "B": 0.3,
        "CCC": 0.6
    }

    base_adjustment = rating_impact.get(esg_rating, 0)

    # 行业调整
    if industry_median != "BBB":
        industry_adjustment = (rating_impact[industry_median] - rating_impact["BBB"]) * 0.5
    else:
        industry_adjustment = 0

    # 市场环境调整
    market_multiplier = market_conditions.get("esg_demand_premium", 1.0)

    total_adjustment = (base_adjustment + industry_adjustment) * market_multiplier

    return {
        "cost_adjustment_bps": total_adjustment * 100,
        "cost_adjustment_pct": total_adjustment,
        "rating_component": base_adjustment * 100,
        "industry_component": industry_adjustment * 100,
        "market_component": (market_multiplier - 1.0) * base_adjustment * 100
    }
```

### 2. 绿色债券发行可行性分析
```python
def assess_green_bond_feasibility(company_data, project_data):
    """
    评估绿色债券发行可行性
    """
    # 绿色项目资金需求
    green_capex_need = sum([project["capex"] for project in project_data["green_projects"]])

    # 发行规模建议
    optimal_size = min(
        green_capex_need * 0.8,  # 不超过项目需求80%
        company_data["total_assets"] * 0.3,  # 不超过总资产30%
        company_data["annual_revenue"] * 2.0  # 不超过年收入2倍
    )

    # 定价优势评估
    conventional_bond_rate = estimate_conventional_bond_rate(company_data)
    green_bond_premium = calculate_greenium(company_data["industry"], company_data["esg_rating"])
    green_bond_rate = conventional_bond_rate - green_bond_premium

    # 投资者接受度
    investor_demand_score = calculate_investor_demand(
        company_data["esg_rating"],
        project_data["environmental_impact"],
        company_data["green_revenue_ratio"]
    )

    return {
        "feasibility_score": investor_demand_score,  # 1-10分
        "optimal_size_rmb": optimal_size,
        "pricing_advantage": {
            "conventional_rate": conventional_bond_rate,
            "green_rate": green_bond_rate,
            "greenium_bps": green_bond_premium * 100,
            "annual_savings": optimal_size * green_bond_premium
        },
        "requirements": {
            "green_building_standard": check_green_building_compliance(project_data),
            "use_of_proceeds": validate_green_taxonomy(project_data),
            "impact_reporting": "需要年度环境影响报告"
        }
    }
```

### 3. ESG投资资金可得性评估
```python
def assess_esg_investor_appetite(company_profile, market_data):
    """
    评估ESG投资者对公司的投资意愿
    """
    # ESG投资资金规模（全球）
    global_esg_aum = market_data["global_esg_aum"]  # 万亿美元
    china_allocation = global_esg_aum * 0.15        # 中国配置比例

    # 行业配置权重
    sector_weights = {
        "solar": 0.25,
        "wind": 0.20,
        "battery": 0.15,
        "ev": 0.18,
        "green_building": 0.10,
        "other": 0.12
    }

    sector_allocation = china_allocation * sector_weights.get(company_profile["industry"], 0.05)

    # 公司竞争力评分
    competitiveness = calculate_esg_competitiveness(company_profile)
    potential_funding = sector_allocation * competitiveness["market_share_potential"]

    # 投资者类型分析
    investor_types = {
        "pension_funds": {"allocation": 0.3, "ticket_size": "1-5亿", "duration": "长期"},
        "sovereign_wealth": {"allocation": 0.25, "ticket_size": "5-20亿", "duration": "长期"},
        "insurance": {"allocation": 0.2, "ticket_size": "0.5-3亿", "duration": "中长期"},
        "mutual_funds": {"allocation": 0.15, "ticket_size": "0.1-1亿", "duration": "中期"},
        "impact_funds": {"allocation": 0.1, "ticket_size": "0.2-2亿", "duration": "中长期"}
    }

    return {
        "total_addressable_funding": potential_funding,
        "investor_breakdown": investor_types,
        "competitiveness_score": competitiveness["overall_score"],
        "key_attraction_factors": competitiveness["strength_factors"],
        "improvement_areas": competitiveness["weakness_factors"]
    }
```

### 4. 碳金融工具分析
```python
def analyze_carbon_finance_options(carbon_data, company_profile):
    """
    分析公司可用的碳金融工具
    """
    options = {}

    # 1. 碳资产抵押融资
    if carbon_data["carbon_credits"] > 0:
        carbon_asset_value = carbon_data["carbon_credits"] * carbon_data["current_carbon_price"]
        loan_to_value = 0.7  # 碳资产抵押率

        options["carbon_asset_financing"] = {
            "collateral_value": carbon_asset_value,
            "available_credit": carbon_asset_value * loan_to_value,
            "interest_rate_estimate": "基准利率+200bps",
            "feasibility": "高" if carbon_data["carbon_credits"] > 10000 else "中"
        }

    # 2. 碳中和债券
    if company_profile["carbon_neutral_commitment"]:
        options["carbon_neutral_bond"] = {
            "market_acceptance": "较好",
            "pricing_advantage": "常规债券-20到-40bps",
            "requirements": ["碳中和路线图", "第三方验证", "定期报告"],
            "optimal_timing": "碳中和承诺后6-12个月"
        }

    # 3. CCER(中国核证自愿减排量)融资
    if carbon_data.get("ccer_potential", 0) > 0:
        ccer_value = carbon_data["ccer_potential"] * carbon_data.get("ccer_price", 20)

        options["ccer_financing"] = {
            "estimated_value": ccer_value,
            "financing_ratio": 0.5,  # 可融资比例
            "development_timeline": "12-24个月",
            "key_requirements": ["方法学适用", "项目额外性", "第三方审定"]
        }

    return options
```

## 绿色金融市场数据库

### 绿色债券市场数据
```yaml
green_bond_market:
  china_2024:
    issuance_volume: 380000    # 百万元
    average_greenium: 15       # 基点
    top_issuers: ["国开行", "工商银行", "三峡集团"]

  sector_distribution:
    clean_energy: 45%
    green_transportation: 20%
    sustainable_building: 15%
    water_management: 10%
    waste_management: 5%
    others: 5%

  pricing_data:
    aaa_5y_green: 3.2%
    aaa_5y_conventional: 3.4%
    aa_5y_green: 3.8%
    aa_5y_conventional: 4.1%
```

### ESG投资趋势
```yaml
esg_investment_trends:
  global_aum_2024: 35.3      # 万亿美元
  china_aum_2024: 2.1        # 万亿美元

  flow_trends:
    2024q1_inflow: 180       # 十亿美元全球流入
    china_share: 12%

  sector_preferences:
    renewable_energy: "超配"
    energy_storage: "标配"
    electric_vehicles: "超配"
    green_building: "低配"

  risk_factors:
    greenwashing_concern: "上升"
    regulatory_uncertainty: "中等"
    performance_pressure: "增加"
```

## 输出分析报告

### 绿色金融评估报告
```yaml
green_finance_assessment:
  executive_summary:
    overall_attractiveness: "高"
    cost_advantage: "15-25基点"
    funding_accessibility: "较好"
    key_recommendations: ["发行绿色债券", "提升ESG评级", "开发碳资产"]

  esg_impact_analysis:
    current_esg_premium: -20    # 基点
    potential_improvement: -35  # 基点(如果提升到AA+)
    annual_cost_savings: 12.5   # 百万元

  green_financing_options:
    green_bonds:
      feasibility: "高"
      optimal_size: 800         # 百万元
      cost_advantage: 20        # 基点
      timeline: "3-6个月"

    esg_equity:
      investor_interest: "高"
      potential_funding: 1500   # 百万元
      valuation_premium: "5-10%"

    carbon_finance:
      carbon_asset_value: 25    # 百万元
      financing_potential: 17   # 百万元
      development_timeline: "12-18个月"

  cost_comparison:
    conventional_financing:
      bank_loan: 5.2%
      corporate_bond: 4.8%

    green_financing:
      green_bank_loan: 4.8%
      green_bond: 4.6%

    savings_potential: 15       # 百万元/年

  market_positioning:
    peer_comparison:
      - company: "隆基绿能"
        esg_rating: "AA"
        green_bond_size: 2000
        greenium: 18

      - company: "比亚迪"
        esg_rating: "A+"
        green_financing_ratio: 35%
        cost_advantage: 12

  improvement_roadmap:
    short_term_3_months:
      - "提升ESG披露质量"
      - "完善绿色项目认证"
      - "准备绿色债券发行"

    medium_term_6_12_months:
      - "发行首只绿色债券"
      - "建立碳资产管理体系"
      - "引入ESG投资者"

    long_term_12_months_plus:
      - "建立绿色金融中心地位"
      - "开发碳金融创新产品"
      - "成为行业ESG标杆"

risk_assessment:
  policy_risks:
    - "绿色标准调整风险"
    - "碳价波动风险"

  market_risks:
    - "ESG投资热度下降"
    - "绿色溢价收窄"

  operational_risks:
    - "绿色项目执行风险"
    - "ESG评级下调风险"
```

### 可视化图表建议
```yaml
visualization_outputs:
  - type: "cost_waterfall"
    title: "绿色金融成本优势分解"

  - type: "funding_sources"
    title: "可获得的绿色资金来源"

  - type: "timeline_roadmap"
    title: "绿色金融发展路线图"

  - type: "peer_benchmarking"
    title: "同行业绿色金融对比"
```

## 数据更新与监控

### 数据源
```yaml
data_sources:
  market_data:
    - 中央结算公司绿债指数
    - Wind绿色债券数据
    - Bloomberg ESG数据

  esg_ratings:
    - MSCI ESG评级
    - Sustainalytics
    - 中证ESG评级

  policy_updates:
    - 人民银行绿色金融政策
    - 证监会绿色债券指引
    - 银保监会绿色信贷指引

update_frequency: "月度市场数据，季度深度更新"
```

## v1.1 预测市场增强层

### ESG投资趋势概率验证

**核心升级**：ESG资金流向预测用预测市场概率验证，而非依赖分析师主观判断。

```yaml
prediction_market_integration:
  ESG趋势验证:
    Polymarket:
      - "ESG fund inflows continuation probability"
      - "Green bond market growth rate"
      - "Carbon credit price path"
    Kalshi:
      - "Fed rate path (影响绿色融资成本)"
      - "US ESG regulation probability"
      - "EU Taxonomy tightening probability"

  Greenium预测验证:
    方法: "对比历史greenium与预测市场中ESG政策概率的相关性"
    公式: "Expected_Greenium = f(ESG_policy_probability, market_sentiment, supply_demand)"
    验证: "预测greenium偏差>5bps时发出信号"

  碳金融概率:
    碳价路径: "用Polymarket/Kalshi碳价事件概率替代线性假设"
    CCER重启概率: "用预测市场概率评估CCER项目的投资时机"
    碳市场扩容: "覆盖行业扩展概率影响碳资产估值"
```

### 跨Skill联动接口

```yaml
skill_linkage:
  输入依赖:
    - policy-impact-assessor → 政策风险评级 → 绿色融资可得性调整
    - lcoe-analyzer → 项目LCOE/IRR → 绿色债券项目质量评估
    - carbon-footprint-calculator → 碳排放基线 → 碳金融价值计算

  输出供给:
    - → 主框架估值模块: WACC调整 → 融资成本优势纳入DCF
    - → 主框架Kill Switch: 融资可得性风险 → Tier3预警
    - → tech-maturity-assessor: 融资时机建议 → 技术投资窗口

  联动触发规则:
    利率概率变化>50bps: 重算全部融资成本对比
    ESG评级变动: 重新评估投资者接受度
    碳价概率变化>20%: 更新碳金融工具估值
```

### 投资决策输出映射

```yaml
investment_decision_output:
  绿色融资竞争力信号:
    强信号: "Greenium>20bps + ESG评级AA+ → 融资成本显著优势"
    中信号: "Greenium 10-20bps + ESG评级A → 融资成本有优势"
    弱信号: "Greenium<10bps → 绿色融资优势不明显"

  Kill_Switch_triggers:
    Tier2_严重:
      - "ESG资金大规模撤出概率>30% → 减仓ESG依赖股"
      - "Greenium消失概率>40% → 重新评估融资假设"
    Tier3_警告:
      - "ESG评级下调风险>25% → 监控评级驱动因素"
      - "绿色债券发行窗口关闭概率>35% → 加速发行时间"

  数据质量标注:
    绿色债券市场数据: "[A:中央结算公司+Wind]"
    ESG评级数据: "[A:MSCI/Sustainalytics]"
    预测市场融资概率: "[B:PM平台+流动性较低]"
    分析师ESG预期: "[C:分析师共识+分歧度]"
```

## 使用场景

1. **融资规划**: 制定最优融资结构和时机（预测市场利率路径验证）
2. **成本优化**: 量化绿色金融的成本优势（概率化greenium预测）
3. **投资者关系**: 识别和吸引ESG投资者（ESG资金流向概率）
4. **ESG提升**: 指导ESG评级改善策略（联动policy skill）
5. **碳资产变现**: 将碳减排转化为金融价值（碳价概率验证）

## 输出文件
- `green_finance_report.pdf`: 完整评估报告
- `cost_analysis.xlsx`: 融资成本对比分析
- `funding_roadmap.pptx`: 绿色融资路线图
- `esg_improvement_plan.docx`: ESG提升计划
- `pm_validation_finance.json`: 预测市场验证报告（v1.1新增）