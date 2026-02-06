---
name: policy-impact-assessor
description: 政策影响评估器。量化分析政府政策变化对生态科技公司财务表现的影响，支持补贴、税收、监管等多维度政策情景建模和敏感性分析。
---

# 政策影响评估器 v1.1 (Prediction Market Enhanced)

## 功能描述

量化分析政策变化对生态科技公司的财务影响，包括：
- 补贴政策影响评估
- 税收政策影响分析
- 监管政策合规成本
- 碳价政策影响建模
- 多情景敏感性分析
- 政策风险评级

## 输入参数

### 公司基础信息
```yaml
company_info:
  name: "公司名称"
  industry: "solar|wind|battery|ev|energy_storage|other"
  revenue_2023: 1000.0          # 百万元
  net_income_2023: 100.0        # 百万元
  regions: ["中国", "美国", "欧盟"]  # 业务区域

business_structure:
  revenue_by_region:
    中国: 60%
    美国: 25%
    欧盟: 15%
  revenue_by_segment:
    制造: 70%
    开发: 20%
    运营: 10%
```

### 当前政策依赖度
```yaml
current_policy_exposure:
  subsidies:
    - type: "制造补贴"
      amount: 50.0            # 百万元/年
      expiry: "2025-12-31"
      certainty: "confirmed"

    - type: "研发补贴"
      amount: 20.0
      expiry: "2026-06-30"
      certainty: "proposed"

  tax_incentives:
    - type: "企业所得税减免"
      benefit: 30.0           # 百万元/年
      rate: "15% vs 25%"
      expiry: "2027-12-31"

    - type: "进口关税豁免"
      benefit: 15.0
      items: ["硅料", "设备"]

  carbon_pricing:
    exposure_tco2: 100000     # 吨CO2当量
    current_price: 80         # 元/吨
    coverage: "EU ETS"
```

### 政策变化情景
```yaml
policy_scenarios:
  base_case:
    name: "基准情景"
    description: "当前政策延续"
    probability: 60%

  policy_tightening:
    name: "政策收紧"
    description: "补贴减少，监管加强"
    probability: 25%
    changes:
      - subsidy_reduction: 50%
      - carbon_price_increase: 100%
      - compliance_cost_increase: 25%

  policy_support:
    name: "政策加码"
    description: "更大力度支持"
    probability: 15%
    changes:
      - subsidy_increase: 30%
      - tax_rate_reduction: 5%
      - fast_track_approval: true
```

## 核心计算逻辑

### 1. 补贴影响计算
```python
def calculate_subsidy_impact(current_subsidies, scenario_changes):
    """
    计算补贴政策变化的财务影响
    """
    impact = {
        "revenue_impact": 0,
        "cost_impact": 0,
        "net_impact": 0,
        "details": []
    }

    for subsidy in current_subsidies:
        if subsidy["type"] == "销售补贴":
            # 影响收入端
            base_amount = subsidy["amount"]
            scenario_multiplier = scenario_changes.get("subsidy_change", 1.0)
            new_amount = base_amount * scenario_multiplier

            revenue_impact = new_amount - base_amount
            impact["revenue_impact"] += revenue_impact

        elif subsidy["type"] == "制造补贴":
            # 影响成本端
            base_amount = subsidy["amount"]
            scenario_multiplier = scenario_changes.get("subsidy_change", 1.0)
            new_amount = base_amount * scenario_multiplier

            cost_impact = base_amount - new_amount  # 补贴减少=成本增加
            impact["cost_impact"] += cost_impact

        impact["details"].append({
            "subsidy_type": subsidy["type"],
            "base_amount": base_amount,
            "new_amount": new_amount,
            "impact": new_amount - base_amount
        })

    impact["net_impact"] = impact["revenue_impact"] - impact["cost_impact"]
    return impact
```

### 2. 税收影响计算
```python
def calculate_tax_impact(financial_data, tax_changes):
    """
    计算税收政策变化影响
    """
    base_ebit = financial_data["ebit"]
    current_tax_rate = financial_data["tax_rate"]

    impact = {}

    for change in tax_changes:
        if change["type"] == "企业所得税率":
            new_tax_rate = change["new_rate"]
            tax_impact = base_ebit * (current_tax_rate - new_tax_rate)
            impact["income_tax"] = tax_impact

        elif change["type"] == "增值税率":
            revenue = financial_data["revenue"]
            vat_impact = revenue * change["rate_change"]
            impact["vat"] = vat_impact

        elif change["type"] == "关税":
            import_cost = financial_data.get("import_cost", 0)
            tariff_impact = import_cost * change["rate_change"]
            impact["tariff"] = -tariff_impact  # 关税增加=成本增加=利润减少

    impact["total_tax_impact"] = sum(impact.values())
    return impact
```

### 3. 碳价影响建模
```python
def calculate_carbon_price_impact(carbon_data, price_scenarios):
    """
    计算碳价变化对公司的影响
    """
    base_emissions = carbon_data["annual_emissions_tco2"]
    current_carbon_price = carbon_data["current_price"]

    impact = {}

    for scenario, price_change in price_scenarios.items():
        new_carbon_price = current_carbon_price * (1 + price_change)

        # 直接成本影响（如果在碳市场）
        if carbon_data.get("in_carbon_market", False):
            cost_impact = base_emissions * (new_carbon_price - current_carbon_price)
            impact[f"{scenario}_direct"] = -cost_impact

        # 间接影响（上游成本传导）
        upstream_impact = estimate_upstream_carbon_cost(carbon_data, price_change)
        impact[f"{scenario}_indirect"] = -upstream_impact

        # 正面影响（低碳产品竞争力提升）
        if carbon_data.get("is_low_carbon_product", False):
            competitive_benefit = estimate_competitive_benefit(carbon_data, price_change)
            impact[f"{scenario}_benefit"] = competitive_benefit

        impact[f"{scenario}_net"] = (
            impact.get(f"{scenario}_direct", 0) +
            impact.get(f"{scenario}_indirect", 0) +
            impact.get(f"{scenario}_benefit", 0)
        )

    return impact
```

### 4. 监管合规成本评估
```python
def calculate_compliance_impact(regulatory_changes, company_data):
    """
    计算新监管要求的合规成本
    """
    compliance_costs = {}

    for regulation in regulatory_changes:
        if regulation["type"] == "环保标准提升":
            # 环保投资需求
            facility_upgrade_cost = estimate_facility_upgrade_cost(
                regulation["new_standard"],
                company_data["current_standard"]
            )
            annual_operating_cost = facility_upgrade_cost * 0.1  # 假设年化10%

            compliance_costs["environmental"] = {
                "capex": facility_upgrade_cost,
                "annual_opex": annual_operating_cost,
                "payback_period": facility_upgrade_cost / annual_operating_cost
            }

        elif regulation["type"] == "安全标准":
            safety_compliance_cost = estimate_safety_compliance_cost(regulation)
            compliance_costs["safety"] = safety_compliance_cost

        elif regulation["type"] == "数据保护":
            data_compliance_cost = estimate_data_compliance_cost(regulation)
            compliance_costs["data_protection"] = data_compliance_cost

    total_annual_cost = sum([
        cost.get("annual_opex", cost) if isinstance(cost, dict) else cost
        for cost in compliance_costs.values()
    ])

    compliance_costs["total_annual"] = total_annual_cost
    return compliance_costs
```

## 政策数据库

### 主要政策跟踪清单
```yaml
policy_database:
  中国:
    renewable_subsidies:
      - name: "可再生能源电价附加"
        status: "执行中"
        expiry: "2025-12-31"
        impact_level: "高"

    tax_incentives:
      - name: "高新技术企业15%税率"
        status: "执行中"
        expiry: "长期"
        eligibility: "研发费用占比>3%"

    carbon_market:
      - name: "全国碳市场"
        coverage: "电力行业"
        price_range: "40-80元/吨"
        expansion_plan: "2025年扩展到石化等行业"

  美国:
    ira_incentives:
      - name: "生产税收抵免(PTC)"
        sectors: ["风电", "太阳能"]
        rate: "$0.026/kWh"
        duration: "10年"

      - name: "投资税收抵免(ITC)"
        sectors: ["太阳能", "储能"]
        rate: "30%"
        start_date: "2022-2025"

    regulatory:
      - name: "清洁电力标准"
        target: "2030年无碳电力80%"
        status: "提案阶段"

  欧盟:
    green_deal:
      - name: "碳边境调节机制(CBAM)"
        sectors: ["钢铁", "水泥", "电力"]
        start_date: "2023-10(过渡), 2026-01(全面)"

    eu_ets:
      - name: "欧盟碳市场"
        price_trend: "€80-90/吨(2024)"
        expansion: "海运业2024年纳入"
```

## 输出格式

### 政策影响评估报告
```yaml
policy_impact_assessment:
  executive_summary:
    total_policy_dependency: "高"     # 政策收入占比>30%
    key_risk_factors: ["补贴到期", "碳价波动", "贸易政策"]
    net_policy_impact_base: 15.2      # 百万元(基准情景)
    policy_value_at_risk: 45.8        # 最坏情景损失

  detailed_impact_by_policy:
    subsidies:
      current_benefit: 70.0
      base_case_2025: 60.0            # 自然到期
      stress_case_2025: 35.0          # 提前取消

    tax_incentives:
      current_benefit: 30.0
      policy_risk: "中等"              # 相对稳定

    carbon_pricing:
      current_exposure: -8.0           # 净成本
      high_carbon_price: -25.0        # €100/吨情景
      benefit_from_competition: 15.0   # 竞争优势

  scenario_analysis:
    - scenario: "基准情景"
      probability: 60%
      net_impact: 15.2
      key_assumptions: ["当前政策延续", "碳价温和上涨"]

    - scenario: "政策支持"
      probability: 15%
      net_impact: 45.6
      key_assumptions: ["补贴延期", "税收优惠扩大"]

    - scenario: "政策收紧"
      probability: 25%
      net_impact: -30.4
      key_assumptions: ["补贴大幅减少", "合规成本上升"]

  policy_risk_rating:
    overall: "中高"
    components:
      subsidy_dependency: "高"        # >20%利润依赖
      regulatory_stability: "中"
      carbon_policy_exposure: "中高"

  mitigation_strategies:
    - strategy: "多元化地区布局"
      description: "降低单一政策依赖"
      effectiveness: "高"

    - strategy: "技术成本降低"
      description: "减少补贴依赖"
      effectiveness: "中高"

    - strategy: "上游整合"
      description: "对冲碳成本上涨"
      effectiveness: "中"
```

### 敏感性分析图表
```yaml
sensitivity_charts:
  - type: "tornado"
    title: "政策因素敏感性分析"
    variables: ["补贴水平", "碳价", "税率", "合规成本"]

  - type: "scenario_tree"
    title: "政策情景演化路径"
    scenarios: [基准, 支持, 收紧]

  - type: "policy_timeline"
    title: "关键政策到期时间表"
    events: [{date, policy, impact}]
```

## 数据源与更新

### 政策信息源
```yaml
data_sources:
  官方政策:
    - 国家发改委
    - 财政部
    - 生态环境部
    - 各地方政府

  国际政策:
    - IEA政策数据库
    - 欧盟官网
    - 美国能源部

  行业分析:
    - BloombergNEF
    - Wood Mackenzie
    - IRENA报告

update_frequency: "月度"
policy_change_alert: "实时"
```

## v1.1 预测市场增强层

### 预测市场数据接入（替代手工概率）

**核心升级**：政策情景概率不再手工设定，用预测市场"真金白银"概率替代。

```yaml
prediction_market_sources:
  政策概率数据:
    Polymarket:
      - "US IRA extension/modification probability"
      - "EU CBAM implementation timeline"
      - "China carbon market expansion scope"
    Kalshi:
      - "Fed interest rate path (影响绿色融资成本)"
      - "US election outcome (影响清洁能源政策)"
      - "EU regulatory tightening probability"

  数据质量要求:
    流动性: "≥$100K (政策市场流动性通常低于金融市场)"
    参与者: "≥100人"
    时效性: "≤48小时"
    标注方式: "[PM:平台+事件+概率+流动性]"
```

### 概率验证机制（PPDA政策版）

```python
def validate_policy_probability(manual_estimate, prediction_market_data):
    """
    对比手工设定的政策概率与预测市场实际概率
    发现背离时生成套利/风险信号
    """
    divergence = abs(manual_estimate - prediction_market_data["probability"])

    if divergence > 0.15:  # 15%以上背离
        return {
            "alert": "SIGNIFICANT_DIVERGENCE",
            "manual": manual_estimate,
            "market": prediction_market_data["probability"],
            "divergence": divergence,
            "action": "重新评估政策假设，市场可能掌握你不知道的信息",
            "investment_signal": "政策风险可能被高估或低估"
        }

    return {"status": "ALIGNED", "confidence": "HIGH"}
```

### 跨Skill联动接口

```yaml
skill_linkage:
  输入依赖:
    - carbon-footprint-calculator → 碳排放基数 → 碳价影响计算
    - lcoe-analyzer → 电力成本基数 → 补贴影响计算

  输出供给:
    - → green-finance-evaluator: 政策风险评级 → 融资成本调整
    - → tech-maturity-assessor: 监管支持度 → 商业化时间线调整
    - → 主框架Kill Switch: 政策风险概率 → Tier 2/3触发条件

  联动触发规则:
    政策概率变化>10%: 通知所有下游skill重新计算
    新政策事件出现: 触发全链路重评估
```

### 投资决策输出映射

```yaml
investment_decision_output:
  Kill_Switch_triggers:
    Tier1_致命:
      - "清洁能源补贴全面取消概率>40% → 立即减仓"
      - "碳市场暂停概率>30% → 重新评估行业配置"
    Tier2_严重:
      - "IRA修改概率>35% → 减仓美国敞口50%"
      - "CBAM延迟概率>40% → 调整欧洲布局"
    Tier3_警告:
      - "地方补贴到期未续概率>50% → 关注区域集中度"

  估值调整系数:
    政策高度依赖(>30%利润): "估值折扣15-25%"
    政策中度依赖(15-30%): "估值折扣5-15%"
    政策低度依赖(<15%): "无需额外折扣"

  数据质量标注:
    预测市场概率: "[A:PM平台+流动性]"
    官方政策文件: "[A:政府文件+发布日期]"
    分析师政策预期: "[C:分析师+分歧度]"
    手工估算概率: "[D:估算方法+不确定性]"
```

## 使用场景

1. **投资决策支持**: 评估政策风险对投资回报的影响（预测市场概率验证）
2. **财务预测调整**: 将政策变化纳入财务模型（概率加权情景）
3. **风险管理**: 识别和量化政策风险敞口（Kill Switch联动）
4. **战略规划**: 制定应对政策变化的策略（跨skill协同）
5. **估值调整**: 基于政策风险调整估值折扣（PPDA背离信号）

## 输出文件
- `policy_impact_report.pdf`: 完整评估报告
- `scenario_analysis.xlsx`: 情景分析数据（含预测市场概率）
- `policy_timeline.png`: 政策时间线图
- `sensitivity_analysis.json`: 敏感性分析结果
- `prediction_market_validation.json`: 概率验证报告（v1.1新增）