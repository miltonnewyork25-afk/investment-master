---
name: carbon-footprint-calculator
description: 全生命周期碳足迹计算器。基于ISO14067标准，计算产品/服务从原料到废弃的全周期碳排放，支持Scope 1/2/3分类和碳足迹对比分析。
---

# 碳足迹计算器 v1.1 (Prediction Market Enhanced)

## 功能描述

基于ISO 14067:2018标准，计算产品或服务的全生命周期碳足迹，包括：
- Scope 1: 直接排放
- Scope 2: 间接排放（电力、热力等）
- Scope 3: 价值链排放（上下游）
- 碳足迹对比分析
- 减排潜力评估

## 输入参数

### 必需输入
```yaml
product_info:
  name: "产品名称"
  category: "solar_panel|wind_turbine|battery|ev|other"
  functional_unit: "1kWh|1MW|1km|custom"

company_info:
  name: "公司名称"
  industry: "制造业|能源|交通|其他"
  region: "中国|美国|欧盟|其他"

scope1_emissions:
  direct_combustion: 0.0  # tCO2e
  process_emissions: 0.0  # tCO2e
  fugitive_emissions: 0.0 # tCO2e

scope2_emissions:
  electricity_consumption: 0.0  # MWh
  heat_consumption: 0.0         # MJ
  electricity_factor: 0.0       # kgCO2e/kWh (默认用电网因子)

scope3_emissions:
  raw_materials: {}     # 原材料清单
  transportation: {}    # 运输数据
  use_phase: {}        # 使用阶段
  end_of_life: {}      # 废弃处理
```

### 可选输入
```yaml
benchmark_products: []  # 对比产品列表
carbon_reduction_scenarios: []  # 减排情景
time_period: "2024"    # 计算年份
uncertainty_analysis: true
```

## 核心计算逻辑

### 1. Scope 1 计算
```python
def calculate_scope1(direct_combustion, process_emissions, fugitive_emissions):
    """
    计算直接排放
    """
    scope1_total = direct_combustion + process_emissions + fugitive_emissions
    return {
        "total": scope1_total,
        "direct_combustion": direct_combustion,
        "process": process_emissions,
        "fugitive": fugitive_emissions
    }
```

### 2. Scope 2 计算
```python
def calculate_scope2(electricity_mwh, heat_mj, grid_factor, heat_factor):
    """
    计算间接排放（基于位置or市场方法）
    """
    electricity_emissions = electricity_mwh * grid_factor / 1000  # tCO2e
    heat_emissions = heat_mj * heat_factor / 1000000  # tCO2e

    return {
        "total": electricity_emissions + heat_emissions,
        "electricity": electricity_emissions,
        "heat": heat_emissions,
        "grid_factor_used": grid_factor
    }
```

### 3. Scope 3 计算
```python
def calculate_scope3(raw_materials, transportation, use_phase, end_of_life):
    """
    计算价值链排放（最复杂部分）
    """
    # 原材料排放
    materials_emissions = sum([
        material["quantity"] * EMISSION_FACTORS[material["type"]]
        for material in raw_materials
    ])

    # 运输排放
    transport_emissions = calculate_transportation_emissions(transportation)

    # 使用阶段排放
    use_emissions = calculate_use_phase_emissions(use_phase)

    # 废弃处理排放
    eol_emissions = calculate_end_of_life_emissions(end_of_life)

    return {
        "total": materials_emissions + transport_emissions + use_emissions + eol_emissions,
        "materials": materials_emissions,
        "transportation": transport_emissions,
        "use_phase": use_emissions,
        "end_of_life": eol_emissions
    }
```

## 排放因子数据库

### 电力排放因子 (kgCO2e/kWh)
```yaml
grid_emission_factors:
  中国: 0.5703    # 2023年全国平均
  美国: 0.3900    # 2023年平均
  德国: 0.3800    # 2023年平均
  丹麦: 0.1500    # 可再生能源比例高
```

### 材料排放因子 (kgCO2e/kg)
```yaml
material_emission_factors:
  钢材: 2.3
  铝: 8.2
  水泥: 0.9
  硅料: 45.0     # 多晶硅
  锂: 15.0
  稀土: 75.0
```

### 运输排放因子 (kgCO2e/tkm)
```yaml
transport_emission_factors:
  公路运输: 0.089
  铁路运输: 0.022
  海运: 0.014
  空运: 1.540
```

## 输出格式

### 碳足迹报告
```yaml
carbon_footprint_report:
  summary:
    total_emissions: 150.5        # tCO2e/功能单位
    scope1_share: 15.2%
    scope2_share: 35.8%
    scope3_share: 49.0%

  detailed_breakdown:
    scope1:
      total: 22.9
      components: {...}
    scope2:
      total: 53.8
      components: {...}
    scope3:
      total: 73.8
      components: {...}

  benchmark_comparison:
    - product: "竞品A"
      emissions: 180.2
      difference: -16.5%
    - product: "传统技术"
      emissions: 850.0
      difference: -82.3%

  reduction_potential:
    scope1_reduction: 5.2%
    scope2_reduction: 35.0%    # 可再生能源替代
    scope3_reduction: 15.8%
    total_reduction: 22.1%

  data_quality:
    primary_data_share: 45%
    secondary_data_share: 55%
    uncertainty_range: "±15%"
```

### 可视化图表建议
```yaml
charts_to_generate:
  - type: "waterfall"
    title: "碳足迹构成分解图"
    data: [scope1, scope2, scope3]

  - type: "comparison_bar"
    title: "与基准产品对比"
    data: [本产品, 竞品A, 竞品B, 传统技术]

  - type: "hotspot_analysis"
    title: "碳排放热点分析"
    data: [排放最高的10个环节]
```

## 数据验证规则

### 数据质量检查
```python
def validate_carbon_data(input_data):
    """
    数据质量检查
    """
    checks = {
        "scope_completeness": check_scope_completeness(input_data),
        "factor_currency": check_emission_factors_currency(),
        "material_consistency": check_material_data_consistency(),
        "transportation_logic": validate_transportation_distances(),
        "uncertainty_reasonable": check_uncertainty_ranges()
    }
    return checks
```

### 可信度评级
- **A级**: 实测数据+一级排放因子 (±5%)
- **B级**: 行业平均+二级因子 (±15%)
- **C级**: 估算数据+通用因子 (±30%)
- **D级**: 粗略估算 (±50%+)

## 使用场景

1. **产品碳足迹认证**: 获得PAS2050/ISO14067认证
2. **竞争对比分析**: 与竞品/传统技术对比
3. **减排策略制定**: 识别减排热点和潜力
4. **ESG报告支持**: 支撑Scope 3排放披露
5. **碳交易准备**: 为碳市场交易提供基础数据

## 输出文件
- `carbon_footprint_report.pdf`: 完整报告
- `carbon_data.csv`: 详细数据
- `benchmark_comparison.png`: 对比图表
- `hotspot_analysis.json`: 热点分析数据

## v1.1 预测市场增强层

### 碳价概率区间（投资映射）

**核心升级**：碳排放数据不再只是环保指标，直接映射为投资风险/机会信号。

```yaml
prediction_market_integration:
  碳价路径验证:
    source: "Polymarket/Kalshi 碳价相关事件"
    应用:
      - "碳价×碳排放量 = 碳成本风险敞口"
      - "碳价上涨概率 → 高碳足迹公司的估值折扣"
      - "碳价下跌概率 → 减排投资回报率降低"

  碳边境调节(CBAM)概率:
    source: "Polymarket EU CBAM事件"
    应用:
      - "CBAM全面实施概率 → 出口企业碳成本暴露"
      - "CBAM覆盖范围扩展概率 → 新增受影响行业"

  碳中和时间线:
    source: "预测市场气候政策事件"
    应用:
      - "各国碳中和承诺兑现概率 → 长期碳价走势"
      - "COP会议成果概率 → 短期政策信号"
```

### 投资决策输出映射

```yaml
investment_signal_mapping:
  碳足迹→投资信号:
    低碳足迹+碳价上涨概率高: "双重利好 → 超配"
    低碳足迹+碳价上涨概率低: "单一利好 → 标配"
    高碳足迹+碳价上涨概率高: "双重利空 → 低配或回避"
    高碳足迹+碳价上涨概率低: "风险可控 → 择机配置"

  碳成本敏感性:
    公式: "碳成本占比 = (碳排放量 × 碳价) / 营收"
    阈值:
      低敏感: "<2% → 碳价影响可忽略"
      中敏感: "2-5% → 需纳入估值模型"
      高敏感: ">5% → 关键风险因子"

  数据质量标注:
    实测碳排放数据: "[A:ISO14067认证+年份]"
    行业平均排放因子: "[B:IPCC/中国温室气体清单]"
    预测市场碳价概率: "[A:PM平台+流动性]"
    估算碳足迹: "[D:方法+不确定性±X%]"
```

### 跨Skill联动接口

```yaml
skill_linkage:
  输出供给:
    - → policy-impact-assessor: 碳排放基数 → 碳税/ETS成本计算
    - → lcoe-analyzer: 发电碳强度 → 竞争力对比权重
    - → green-finance-evaluator: 碳减排量 → CCER/碳金融价值
    - → 主框架ESG模块: 碳足迹评分 → ESG综合评级
```

## 相关标准
- ISO 14067:2018 - 产品碳足迹量化要求
- PAS 2050:2011 - 商品和服务生命周期温室气体排放评价规范
- GHG Protocol Product Standard
- 中国 GB/T 24040-2008 生命周期评价原则与框架