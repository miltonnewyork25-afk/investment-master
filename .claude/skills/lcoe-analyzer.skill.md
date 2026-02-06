---
name: lcoe-analyzer
description: 平准化电力成本分析器。计算和对比各种发电技术的LCOE(Levelized Cost of Energy)，支持敏感性分析、平价时点预测和成本竞争力评估，是新能源投资决策的核心工具。
---

# 平准化电力成本分析器 v1.1 (Prediction Market Enhanced)

## 功能描述

计算和分析各种发电技术的平准化电力成本(LCOE)，包括：
- 标准LCOE计算（含税前/税后）
- 多技术路线成本对比
- 平价时点预测分析
- 敏感性和情景分析
- 成本下降曲线建模
- 电网平价竞争力评估

## LCOE计算方法论

### 标准LCOE公式
```
LCOE = (总生命周期成本现值) / (总发电量现值)

详细公式：
LCOE = [Σt=1^n (It + Mt + Ft) / (1+r)^t] / [Σt=1^n Et / (1+r)^t]

其中：
- It = 第t年投资成本 (CAPEX)
- Mt = 第t年运维成本 (OPEX)
- Ft = 第t年燃料成本 (FUELX)
- Et = 第t年发电量
- r = 折现率 (WACC)
- n = 项目寿命 (年)
```

## 输入参数

### 项目基本信息
```yaml
project_info:
  technology: "solar_pv|wind_onshore|wind_offshore|nuclear|coal|gas|hydro|battery_storage"
  project_name: "项目名称"
  location: "中国-江苏省"
  capacity_mw: 100.0
  project_lifetime: 25        # 年
  commissioning_date: "2025-01-01"

technology_specifics:
  # 太阳能光伏特有参数
  solar_pv:
    panel_efficiency: 21.5%
    degradation_rate: 0.5%    # 年衰减率
    tracker_type: "fixed|single_axis|dual_axis"
    module_type: "mono_si|poly_si|thin_film"

  # 风电特有参数
  wind:
    turbine_capacity: 3.0     # MW单机容量
    hub_height: 120           # 米
    rotor_diameter: 136       # 米
    wind_class: "IEC_Class_2"
```

### 成本参数
```yaml
capex_breakdown:
  equipment_cost: 4200      # 元/kW
  installation_cost: 800    # 元/kW
  grid_connection: 300      # 元/kW
  development_cost: 200     # 元/kW
  contingency: 5%           # 应急费用比例
  total_capex: 5775        # 元/kW (自动计算)

opex_breakdown:
  fixed_om: 25             # 元/kW/年
  variable_om: 2           # 元/MWh
  insurance: 0.3%          # 占CAPEX比例
  land_lease: 50           # 元/kW/年
  management: 15           # 元/kW/年
  total_fixed_opex: 90     # 元/kW/年

financial_parameters:
  discount_rate: 6.5%      # WACC
  inflation_rate: 2.5%
  tax_rate: 25%
  depreciation_method: "straight_line"
  depreciation_period: 10   # 年

  debt_structure:
    debt_ratio: 70%
    debt_interest_rate: 4.8%
    debt_term: 15           # 年
```

### 发电性能参数
```yaml
performance_parameters:
  # 太阳能
  solar_irradiation: 1350   # kWh/m²/年
  performance_ratio: 0.85   # 系统效率
  capacity_factor: 18.5%    # 年平均

  # 风电
  wind_speed_average: 6.5   # m/s
  wind_distribution: "weibull"
  capacity_factor: 28.0%

  # 通用
  availability: 97%         # 可用率
  grid_loss: 3%            # 线损
  degradation_profile: "linear|exponential"
```

## 核心计算算法

### 1. 基础LCOE计算
```python
def calculate_lcoe(capex, opex_fixed, opex_variable, fuel_cost,
                   capacity_factor, capacity_mw, project_life, discount_rate):
    """
    计算标准LCOE
    """
    # 年发电量计算
    annual_generation = capacity_mw * 8760 * capacity_factor / 100  # MWh/年

    # 成本现值计算
    capex_pv = capex * capacity_mw * 1000  # 转换为kW

    opex_pv = 0
    generation_pv = 0

    for year in range(1, project_life + 1):
        # 运维成本现值
        annual_opex = (opex_fixed * capacity_mw * 1000 +
                      opex_variable * annual_generation +
                      fuel_cost * annual_generation)

        opex_pv += annual_opex / (1 + discount_rate) ** year

        # 发电量现值（考虑衰减）
        degradation_factor = 1 - (0.005 * (year - 1))  # 0.5%年衰减
        annual_gen_adjusted = annual_generation * degradation_factor
        generation_pv += annual_gen_adjusted / (1 + discount_rate) ** year

    # LCOE计算
    total_cost_pv = capex_pv + opex_pv
    lcoe = total_cost_pv / generation_pv  # 元/MWh

    return {
        "lcoe_rmb_mwh": lcoe,
        "lcoe_usd_mwh": lcoe / 7.2,  # 假设汇率
        "capex_contribution": capex_pv / total_cost_pv,
        "opex_contribution": opex_pv / total_cost_pv,
        "total_generation_pv": generation_pv,
        "total_cost_pv": total_cost_pv
    }
```

### 2. 税后LCOE计算
```python
def calculate_after_tax_lcoe(lcoe_pretax, tax_rate, depreciation_benefit,
                            debt_structure, incentives):
    """
    计算税后LCOE，考虑税收影响
    """
    # 税收盾牌价值
    depreciation_tax_shield = depreciation_benefit * tax_rate
    interest_tax_shield = debt_structure["interest"] * tax_rate

    # 政策激励价值
    investment_tax_credit = incentives.get("itc", 0)
    production_tax_credit = incentives.get("ptc", 0)

    # 调整后LCOE
    tax_adjustment = depreciation_tax_shield + interest_tax_shield
    incentive_adjustment = investment_tax_credit + production_tax_credit

    lcoe_after_tax = lcoe_pretax * (1 - tax_adjustment) - incentive_adjustment

    return {
        "lcoe_after_tax": lcoe_after_tax,
        "tax_shield_value": tax_adjustment * lcoe_pretax,
        "incentive_value": incentive_adjustment,
        "effective_tax_rate": (lcoe_pretax - lcoe_after_tax) / lcoe_pretax
    }
```

### 3. 多技术对比分析
```python
def compare_technologies(technology_configs, market_conditions):
    """
    多技术路线LCOE对比
    """
    results = {}

    for tech_name, config in technology_configs.items():
        # 计算各技术LCOE
        base_lcoe = calculate_lcoe(**config["cost_params"])

        # 地区和市场条件调整
        location_adjustment = get_location_factor(config["location"], tech_name)
        market_adjustment = get_market_factor(market_conditions, tech_name)

        adjusted_lcoe = base_lcoe["lcoe_rmb_mwh"] * location_adjustment * market_adjustment

        results[tech_name] = {
            "base_lcoe": base_lcoe["lcoe_rmb_mwh"],
            "adjusted_lcoe": adjusted_lcoe,
            "location_factor": location_adjustment,
            "market_factor": market_adjustment,
            "capacity_factor": config["performance"]["capacity_factor"],
            "capex_per_kw": config["cost_params"]["capex"]
        }

    # 排序和竞争力分析
    sorted_results = sorted(results.items(), key=lambda x: x[1]["adjusted_lcoe"])

    # 计算竞争差距
    lowest_cost = sorted_results[0][1]["adjusted_lcoe"]
    for tech_name, data in results.items():
        data["cost_gap_vs_cheapest"] = data["adjusted_lcoe"] - lowest_cost
        data["cost_premium_pct"] = (data["adjusted_lcoe"] / lowest_cost - 1) * 100

    return {
        "technology_ranking": sorted_results,
        "detailed_results": results,
        "market_winner": sorted_results[0][0],
        "cost_spread": sorted_results[-1][1]["adjusted_lcoe"] - lowest_cost
    }
```

### 4. 成本下降曲线建模
```python
def model_cost_decline_curve(technology, historical_data, learning_rate,
                           capacity_deployment_forecast):
    """
    基于学习曲线的成本下降建模
    """
    # 学习曲线公式: Cost_new = Cost_initial * (Capacity_cumulative / Capacity_initial) ^ (-learning_rate)

    initial_capacity = historical_data["cumulative_capacity_2024"]
    initial_cost = historical_data["lcoe_2024"]

    cost_projections = {}

    for year in range(2025, 2031):
        # 累计装机容量预测
        cumulative_capacity = forecast_cumulative_capacity(capacity_deployment_forecast, year)

        # 成本下降计算
        capacity_ratio = cumulative_capacity / initial_capacity
        cost_reduction_factor = capacity_ratio ** (-learning_rate)
        projected_cost = initial_cost * cost_reduction_factor

        # 技术改进额外贡献
        tech_improvement = estimate_tech_improvement(technology, year)
        final_cost = projected_cost * (1 - tech_improvement)

        cost_projections[year] = {
            "lcoe": final_cost,
            "cost_reduction_vs_2024": (initial_cost - final_cost) / initial_cost,
            "cumulative_capacity_gw": cumulative_capacity,
            "annual_deployment_gw": capacity_deployment_forecast.get(year, 0)
        }

    # 计算成本下降速度
    annual_decline_rates = {}
    for year in range(2026, 2031):
        prev_year_cost = cost_projections[year-1]["lcoe"]
        current_year_cost = cost_projections[year]["lcoe"]
        annual_decline_rates[year] = (prev_year_cost - current_year_cost) / prev_year_cost

    return {
        "cost_projections": cost_projections,
        "annual_decline_rates": annual_decline_rates,
        "total_cost_reduction_2024_2030": (
            initial_cost - cost_projections[2030]["lcoe"]
        ) / initial_cost,
        "learning_rate_applied": learning_rate
    }
```

### 5. 平价分析
```python
def analyze_grid_parity(renewable_lcoe_projections, conventional_power_costs,
                       carbon_pricing_scenarios):
    """
    分析可再生能源与传统能源的平价时点
    """
    grid_parity_analysis = {}

    for scenario_name, carbon_price_path in carbon_pricing_scenarios.items():
        parity_results = {}

        for conv_tech in ["coal", "gas", "nuclear"]:
            conv_base_cost = conventional_power_costs[conv_tech]["lcoe_2024"]

            for year in range(2024, 2031):
                # 传统能源成本（含碳价）
                carbon_price = carbon_price_path.get(year, 0)
                emission_factor = conventional_power_costs[conv_tech]["emission_factor"]  # tCO2/MWh
                carbon_cost = carbon_price * emission_factor  # 元/MWh

                conv_total_cost = conv_base_cost + carbon_cost

                # 可再生能源成本
                renewable_cost = renewable_lcoe_projections.get(year, {}).get("lcoe", float('inf'))

                # 判断是否达到平价
                if renewable_cost <= conv_total_cost and conv_tech not in parity_results:
                    parity_results[conv_tech] = {
                        "parity_year": year,
                        "renewable_lcoe": renewable_cost,
                        "conventional_lcoe": conv_total_cost,
                        "cost_advantage": conv_total_cost - renewable_cost,
                        "carbon_price_at_parity": carbon_price
                    }

        grid_parity_analysis[scenario_name] = parity_results

    return {
        "parity_analysis_by_scenario": grid_parity_analysis,
        "earliest_parity_year": min([
            result.get("parity_year", 2050)
            for results in grid_parity_analysis.values()
            for result in results.values()
        ]),
        "parity_summary": summarize_parity_results(grid_parity_analysis)
    }
```

## 行业基准数据库

### 全球LCOE基准 (2024年数据)
```yaml
lcoe_benchmarks_2024:
  solar_pv:
    utility_scale:
      global_average: 345     # 元/MWh
      china: 280
      middle_east: 180
      europe: 420
      us: 380

    distributed:
      global_average: 580
      china: 520
      europe: 650
      us: 620

  wind_onshore:
    global_average: 330
    china: 310
    europe: 380
    us: 420

  wind_offshore:
    global_average: 520
    europe: 480
    china: 600
    us: 650

  conventional_power:
    coal:
      china: 320
      india: 280
      us: 450
      europe: 550

    gas_ccgt:
      china: 450
      us: 380
      europe: 680

    nuclear:
      global_new_build: 800-1200
      existing_fleet: 200-400
```

### 学习曲线参数
```yaml
learning_rates:
  solar_pv: 19.5%          # 累计产量翻倍，成本下降19.5%
  wind_onshore: 11.0%
  wind_offshore: 8.5%
  battery_storage: 18.0%
  hydrogen_electrolysis: 15.0%

cost_decline_drivers:
  solar_pv:
    - "硅料成本下降"
    - "电池效率提升"
    - "规模经济"
    - "制造技术改进"

  wind:
    - "风机大型化"
    - "叶片技术改进"
    - "运维效率提升"
    - "选址优化"
```

## 输出分析报告

### LCOE分析报告
```yaml
lcoe_analysis_report:
  executive_summary:
    technology: "太阳能光伏"
    project_lcoe: 285          # 元/MWh
    market_competitiveness: "具竞争力"
    vs_grid_average: "-15%"    # 低于电网平均成本15%
    vs_coal_power: "-12%"      # 低于煤电12%
    key_cost_drivers: ["CAPEX占70%", "容量系数关键"]

  detailed_lcoe_breakdown:
    total_lcoe: 285
    capex_component: 200       # 70%
    opex_component: 65        # 23%
    financing_cost: 20        # 7%

    capex_breakdown:
      equipment: 168          # 84% of CAPEX
      installation: 32        # 16% of CAPEX

    opex_breakdown:
      fixed_om: 45
      insurance: 12
      land_lease: 8

  sensitivity_analysis:
    key_variables:
      - parameter: "CAPEX"
        base_case: 5500
        sensitivity: "±10%"
        lcoe_impact: "±28元/MWh"

      - parameter: "容量系数"
        base_case: "18.5%"
        sensitivity: "±2pp"
        lcoe_impact: "±31元/MWh"

      - parameter: "折现率"
        base_case: "6.5%"
        sensitivity: "±1%"
        lcoe_impact: "±22元/MWh"

    tornado_chart: "最敏感因素排序"

  technology_comparison:
    vs_other_renewables:
      - technology: "陆上风电"
        lcoe: 310
        difference: "+25元/MWh"
        comment: "地区风资源相对较差"

      - technology: "海上风电"
        lcoe: 520
        difference: "+235元/MWh"
        comment: "技术成本仍较高"

    vs_conventional:
      - technology: "煤电"
        lcoe_without_carbon: 320
        lcoe_with_carbon_50: 400   # 碳价50元/吨
        competitive_advantage: "显著"

      - technology: "天然气"
        lcoe_current: 450
        competitive_advantage: "明显"

  grid_parity_analysis:
    current_status:
      vs_retail_electricity: "已达平价"
      vs_wholesale_electricity: "部分地区平价"
      vs_coal_power_with_carbon: "已达平价"

    future_outlook:
      2025: "全面网侧平价"
      2027: "显著成本优势"
      2030: "成为最便宜电源"

  cost_reduction_roadmap:
    2024_2030_projections:
      2025: 270         # 元/MWh
      2026: 255
      2027: 242
      2028: 230
      2029: 220
      2030: 210

    cost_reduction_drivers:
      technology_improvement: "30%"
      scale_economy: "40%"
      supply_chain_optimization: "20%"
      financing_cost_reduction: "10%"

  investment_implications:
    attractiveness: "高"

    key_investment_points:
      - "LCOE具竞争力，市场前景明确"
      - "成本持续下降，先发优势重要"
      - "政策支持，但需关注补贴退坡"

    risk_factors:
      - "组件价格波动风险"
      - "并网消纳约束"
      - "土地资源竞争"

    optimal_investment_timing:
      development: "立即开始"
      construction: "2025年前"
      operation: "25年稳定期"

regional_analysis:
  location_suitability:
    solar_resource_rating: "优秀"     # >1400 kWh/m²
    grid_access_rating: "良好"
    land_availability: "充足"
    permitting_ease: "中等"

  location_specific_factors:
    land_cost_adjustment: "+5%"
    grid_connection_cost: "标准"
    local_incentives: "免税3年"
    permitting_timeline: "6-8个月"
```

### 可视化图表输出
```yaml
visualization_suite:
  - type: "lcoe_waterfall"
    title: "LCOE成本构成瀑布图"
    components: [CAPEX, OPEX, 融资成本, 总计]

  - type: "sensitivity_tornado"
    title: "敏感性分析龙卷风图"
    variables: [CAPEX, 容量系数, 折现率, OPEX]

  - type: "technology_comparison"
    title: "技术路线LCOE对比"
    technologies: [光伏, 陆风, 海风, 煤电, 气电]

  - type: "cost_decline_curve"
    title: "LCOE下降曲线 (2024-2030)"
    scenarios: [保守, 基准, 乐观]

  - type: "grid_parity_timeline"
    title: "平价时点分析"
    benchmarks: [煤电, 气电, 电网平均]

  - type: "regional_lcoe_heatmap"
    title: "区域LCOE热力图"
    regions: [华北, 华东, 华中, 华南, 西北, 西南]
```

## 数据更新与校准

### 数据源管理
```yaml
data_sources:
  cost_data:
    - IRENA全球成本数据库
    - IEA能源技术展望
    - NREL年度技术基准
    - 中国光伏行业协会数据

  market_data:
    - 各地区电力交易中心价格
    - 发改委标杆电价
    - 绿证交易价格
    - 碳市场价格

  technology_data:
    - 设备厂商报价
    - 工程总承包商成本
    - 运维服务商费率
    - 保险公司费率

update_frequency:
  cost_benchmarks: "季度更新"
  market_prices: "月度更新"
  technology_parameters: "半年更新"
  policy_changes: "实时更新"
```

## v1.1 预测市场增强层

### 成本预测概率区间（替代单点预测）

**核心升级**：LCOE预测从单一数字变为概率分布，用预测市场验证关键假设。

```yaml
prediction_market_integration:
  关键假设验证:
    碳价路径:
      source: "Polymarket/Kalshi 碳价预测事件"
      impact: "碳价每+10元/吨 → 煤电LCOE+8元/MWh → 可再生能源竞争力提升"
      validation: "对比预测市场碳价概率 vs 模型假设碳价"

    政策补贴持续性:
      source: "policy-impact-assessor skill输出"
      impact: "补贴取消 → 可再生能源LCOE+15-30元/MWh"
      validation: "补贴延续概率直接影响LCOE置信区间"

    技术成本下降速度:
      source: "Manifold 技术突破概率事件"
      impact: "学习曲线加速 → LCOE下降快于预期"
      validation: "技术突破概率影响成本下降曲线斜率"

  概率区间输出:
    format: "LCOE = [P10, P25, P50, P75, P90]"
    example: "光伏LCOE 2026 = [220, 245, 270, 300, 340] 元/MWh"
    driver: "概率区间宽度反映预测市场中关键变量的不确定性"
```

### 平价时点概率化

```python
def probabilistic_grid_parity(renewable_lcoe_dist, conventional_cost_dist, carbon_scenarios):
    """
    v1.1: 输出平价概率而非单一时点
    """
    parity_probabilities = {}
    for year in range(2025, 2031):
        # Monte Carlo: 抽样两个分布，计算可再生能源更便宜的概率
        parity_prob = sum(
            1 for r, c in zip(renewable_lcoe_dist[year], conventional_cost_dist[year])
            if r < c
        ) / len(renewable_lcoe_dist[year])

        parity_probabilities[year] = {
            "probability": parity_prob,
            "confidence": "HIGH" if parity_prob > 0.8 or parity_prob < 0.2 else "MEDIUM",
            "pm_validation": "与预测市场碳价/政策概率交叉验证"
        }
    return parity_probabilities
```

### 跨Skill联动接口

```yaml
skill_linkage:
  输入依赖:
    - policy-impact-assessor → 补贴概率 → 调整LCOE补贴组件
    - carbon-footprint-calculator → 碳排放强度 → 竞争力对比权重

  输出供给:
    - → green-finance-evaluator: 项目IRR/LCOE → 融资可行性判断
    - → tech-maturity-assessor: 成本下降速度 → 技术商业化时间线
    - → 主框架估值模块: LCOE竞争力 → DCF收入假设

  联动触发规则:
    碳价概率变化>15%: 重算全部平价分析
    新技术成本数据发布: 更新学习曲线参数
```

### 投资决策输出映射

```yaml
investment_decision_output:
  LCOE竞争力信号:
    强烈利好: "可再生能源LCOE < 煤电LCOE-20% → 行业超配信号"
    利好: "可再生能源LCOE < 煤电LCOE → 维持配置"
    中性: "可再生能源LCOE ≈ 煤电LCOE (±10%) → 选择性配置"
    利空: "可再生能源LCOE > 煤电LCOE+10% → 谨慎评估补贴依赖"

  Kill_Switch_triggers:
    Tier2_严重:
      - "LCOE反弹概率>30%（原材料暴涨等）→ 减仓50%"
      - "平价时点推迟>2年概率>35% → 重新评估行业"
    Tier3_警告:
      - "成本下降速度低于学习曲线50% → 关注技术瓶颈"

  数据质量标注:
    IRENA/IEA官方数据: "[A:IRENA2026]"
    公司财报成本数据: "[A:财报+年份]"
    行业平均估算: "[B:BloombergNEF]"
    预测市场衍生概率: "[A:PM平台+流动性]"
```

## 使用场景

1. **项目投资决策**: 评估项目经济可行性（概率区间而非单点）
2. **技术路线选择**: 对比不同技术方案（预测市场验证假设）
3. **平价时点分析**: 输出平价概率分布（非单一时点）
4. **政策制定支持**: 为补贴政策提供成本依据（联动policy skill）
5. **融资和估值**: 支持项目融资和企业估值（联动green-finance skill）

## 输出文件
- `lcoe_analysis_report.pdf`: 完整LCOE分析报告
- `lcoe_calculations.xlsx`: 详细计算模型
- `sensitivity_analysis.xlsx`: 敏感性分析数据
- `technology_comparison.csv`: 技术对比数据表
- `cost_projections.json`: 成本预测数据（含概率区间 v1.1）
- `parity_probability.json`: 平价概率分布（v1.1新增）
- `charts_package.zip`: 所有可视化图表