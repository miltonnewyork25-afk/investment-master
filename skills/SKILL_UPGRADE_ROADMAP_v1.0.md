# Skill升级迭代路线图 v1.0

**基于Google深度分析的框架缺陷识别**
**日期**: 2026-01-27

---

## 一、已完成的Skill创建

| Skill | 版本 | 状态 | 解决的问题 |
|-------|------|------|-----------|
| `ai_option_valuation` | v1.0 | ✅ 已创建 | AI期权业务估值方法缺失 |
| `regulatory_risk_framework` | v1.0 | ✅ 已创建 | 监管风险量化不足 |
| `macro_liquidity_regime` | v1.0 | ✅ 已创建 | 宏观流动性分析框架 |

---

## 二、需要新建的Skills

### 2.1 高优先级（P0）

#### Skill 1: `capex_intensive_valuation`
**问题**: 高CapEx期公司（Google/Meta/Amazon）的FCF失真，传统DCF估值失效

**核心功能**:
```yaml
modules:
  - capex_normalization: 区分维护性CapEx vs 增长性CapEx
  - depreciation_forecast: 折旧曲线建模
  - invested_capital_adjustment: ROIC调整（排除建设期资产）
  - fcf_reconstruction: 正常化FCF估算
  - valuation_bridge: 从报告FCF到正常化FCF的桥梁

outputs:
  - normalized_fcf: 调整后自由现金流
  - true_roic: 排除建设期的真实ROIC
  - capex_payback_timeline: CapEx回报时间表
  - margin_pressure_forecast: 利润率压力预测
```

**理论基础**:
- Damodaran (2012) "Investment Valuation" Chapter on CapEx
- McKinsey "Valuation" - Invested Capital treatment

**优先级**: P0
**预计工作量**: 2天

---

#### Skill 2: `platform_portfolio_matrix`
**问题**: 标准BCG矩阵不适合平台型公司的业务组合分析

**核心功能**:
```yaml
dimensions:
  - network_effect_strength: 网络效应强度 (替代市场份额)
  - platform_maturity: 平台成熟度 (替代市场增速)
  - cross_platform_synergy: 跨平台协同度
  - data_flywheel_velocity: 数据飞轮转速

matrix_quadrants:
  - core_platforms: 核心平台（高网效+高成熟）→ 保护
  - growth_platforms: 增长平台（高网效+低成熟）→ 投资
  - utility_platforms: 工具平台（低网效+高成熟）→ 收割
  - experimental_platforms: 实验平台（低网效+低成熟）→ 验证/砍掉

outputs:
  - platform_portfolio_map: 可视化矩阵
  - synergy_matrix: 平台间协同矩阵
  - investment_priority: 投资优先级建议
  - divestiture_candidates: 剥离候选
```

**优先级**: P0
**预计工作量**: 2天

---

#### Skill 3: `data_moat_quantifier`
**问题**: 数据护城河是平台公司核心资产，但缺乏量化方法

**核心功能**:
```yaml
dimensions:
  - data_volume: 数据量级 (用户数×数据点/用户)
  - data_uniqueness: 数据独特性 (竞争者可获得性)
  - data_freshness: 数据时效性 (更新频率)
  - data_integration: 数据整合度 (跨产品打通)
  - ml_leverage: ML利用率 (数据→模型→产品闭环)

scoring:
  data_moat_score: 0-100
  competitive_replicability: 年数 (竞争者追赶时间)

outputs:
  - data_asset_inventory: 数据资产清单
  - moat_score_breakdown: 护城河评分分解
  - competitive_gap_analysis: 竞争差距分析
  - monetization_potential: 变现潜力评估
```

**应用场景**:
- Google: 7×20亿用户飞轮
- Meta: 社交图谱
- Amazon: 购买行为+物流数据

**优先级**: P0
**预计工作量**: 3天

---

### 2.2 中优先级（P1）

#### Skill 4: `ai_competitive_landscape`
**问题**: AI竞争格局变化快，缺乏系统追踪框架

**核心功能**:
```yaml
tracking_dimensions:
  - model_capability: 模型能力基准 (MMLU/HumanEval/etc)
  - enterprise_adoption: 企业采用率
  - developer_mindshare: 开发者心智份额
  - infrastructure_cost: 基础设施成本效率
  - talent_flow: 人才流动监测

competitive_map:
  - frontier_models: 前沿模型对比
  - enterprise_platforms: 企业平台对比
  - chip_ecosystem: 芯片生态对比

outputs:
  - competitive_scorecard: 竞争评分卡
  - market_share_tracker: 份额追踪
  - technology_gap_analysis: 技术差距分析
  - investment_implications: 投资含义
```

**优先级**: P1
**预计工作量**: 2天

---

#### Skill 5: `zero_click_impact_model`
**问题**: 零点击率对广告公司的影响需要专门建模

**核心功能**:
```yaml
inputs:
  - zero_click_rate: 零点击率数据
  - ai_overview_penetration: AI Overviews渗透率
  - ad_format_mix: 广告形式构成
  - user_intent_distribution: 用户意图分布

models:
  - traffic_cannibalization: 流量蚕食模型
  - ad_revenue_sensitivity: 广告收入敏感性
  - publisher_impact: 出版商影响评估
  - long_term_equilibrium: 长期均衡预测

outputs:
  - revenue_impact_range: 收入影响区间
  - mitigation_effectiveness: 缓解措施有效性
  - competitive_moat_impact: 护城河影响
```

**优先级**: P1
**预计工作量**: 1.5天

---

#### Skill 6: `robotaxi_valuation`
**问题**: Robotaxi业务需要专门估值框架（Waymo/Tesla/Cruise）

**核心功能**:
```yaml
drivers:
  - fleet_size: 车队规模
  - utilization_rate: 利用率
  - revenue_per_mile: 每英里收入
  - cost_per_mile: 每英里成本
  - city_expansion_rate: 城市扩展速度
  - safety_record: 安全记录

valuation_methods:
  - tam_penetration: TAM渗透法
  - unit_economics_dcf: 单位经济学DCF
  - comparable_transactions: 可比交易

risk_factors:
  - regulatory_approval: 监管审批风险
  - safety_incident: 安全事故风险
  - technology_obsolescence: 技术淘汰风险
  - competition: 竞争风险

outputs:
  - scenario_valuation: 情景估值
  - break_even_timeline: 盈亏平衡时间表
  - key_milestones: 关键里程碑
```

**优先级**: P1
**预计工作量**: 2天

---

### 2.3 低优先级（P2）

#### Skill 7: `advertising_cycle_indicator`
**问题**: 广告周期与宏观经济的关系需要专门追踪

**核心功能**: 广告支出与GDP/消费者信心的弹性建模

**优先级**: P2
**预计工作量**: 1天

---

#### Skill 8: `cloud_competitive_tracker`
**问题**: 云市场份额和定价动态需要持续追踪

**核心功能**: AWS/Azure/GCP份额、定价、积压订单对比

**优先级**: P2
**预计工作量**: 1.5天

---

## 三、需要升级的现有Skills

### 3.1 `network_effect_evaluator` → v1.1

**升级内容**:
```yaml
new_modules:
  - data_network_effect: 数据网络效应量化
    # Google搜索→更好结果→更多用户→更多数据
  - ai_flywheel: AI飞轮效应
    # 更多用户→更多训练数据→更好模型→更多用户
  - cross_product_synergy: 跨产品协同效应
    # 7×20亿用户的协同价值

enhanced_scoring:
  - add data_network_effect weight: 15%
  - add ai_flywheel weight: 10%
```

**优先级**: P0
**预计工作量**: 0.5天

---

### 3.2 `moat_evaluation_framework` → v1.3

**升级内容**:
```yaml
new_modules:
  - ai_moat: AI护城河评估
    # 模型能力、训练数据、推理成本
  - infrastructure_moat: 基础设施护城河
    # 数据中心、自研芯片、专有硬件
  - regulatory_moat: 监管护城河
    # 牌照、合规壁垒、反垄断地位

enhanced_scoring:
  - add ai_moat weight: 10%
  - add infrastructure_moat weight: 10%
```

**优先级**: P1
**预计工作量**: 1天

---

### 3.3 `competitive_analysis_framework` → v1.3

**升级内容**:
```yaml
new_modules:
  - ai_capability_comparison: AI能力对比
    # 模型基准、企业采用、开发者生态
  - chip_strategy_comparison: 芯片策略对比
    # 自研vs外购、成本结构、供应安全

enhanced_templates:
  - add tech_platform_template: 科技平台专用模板
```

**优先级**: P1
**预计工作量**: 0.5天

---

## 四、CLAUDE.md框架升级建议

### 4.1 行业分类升级

**当前**: 8类行业
**建议**: 增加第9类

```markdown
### 9. AI基础设施/平台
分析模板:
- AI模型能力对比
- 芯片策略（自研vs外购）
- 数据护城河量化
- CapEx周期与ROI
- 平台业务组合（替代BCG）
- 网络效应+数据飞轮
```

### 4.2 估值方法升级

**当前**: DCF/SOTP/可比
**建议**: 增加

```markdown
### 新增估值方法
- **期权价值叠加法**: 核心业务估值 + AI期权 + 其他期权
- **正常化FCF法**: 对高CapEx期公司调整FCF
- **TAM渗透法**: 对早期高增长业务
```

### 4.3 深度检验升级

**建议新增检验项**:
```markdown
### 科技平台公司专项检验
26. ✓ 数据护城河: 已量化并对比竞争者
27. ✓ AI期权价值: 已独立估值
28. ✓ CapEx正常化: 已区分维护vs增长
29. ✓ 平台协同: 已评估跨业务飞轮
30. ✓ 人才流动: 已监测关键人才变动
```

---

## 五、实施路线图

### Phase 1: 核心Skills (Week 1-2)

| Skill | 优先级 | 工作量 | 完成日期 |
|-------|--------|--------|---------|
| `capex_intensive_valuation` | P0 | 2天 | W1D2 |
| `platform_portfolio_matrix` | P0 | 2天 | W1D4 |
| `data_moat_quantifier` | P0 | 3天 | W2D2 |
| `network_effect_evaluator` v1.1 | P0 | 0.5天 | W2D3 |

### Phase 2: 扩展Skills (Week 3-4)

| Skill | 优先级 | 工作量 | 完成日期 |
|-------|--------|--------|---------|
| `ai_competitive_landscape` | P1 | 2天 | W3D2 |
| `zero_click_impact_model` | P1 | 1.5天 | W3D4 |
| `robotaxi_valuation` | P1 | 2天 | W4D2 |
| `moat_evaluation_framework` v1.3 | P1 | 1天 | W4D3 |
| `competitive_analysis_framework` v1.3 | P1 | 0.5天 | W4D4 |

### Phase 3: 补充Skills (Week 5)

| Skill | 优先级 | 工作量 | 完成日期 |
|-------|--------|--------|---------|
| `advertising_cycle_indicator` | P2 | 1天 | W5D1 |
| `cloud_competitive_tracker` | P2 | 1.5天 | W5D3 |
| CLAUDE.md v7.0升级 | P0 | 1天 | W5D4 |

---

## 六、Agent架构优化建议

### 6.1 当前问题

| 问题 | 影响 | 解决方案 |
|------|------|---------|
| Skill调用不自动 | 需手动指定skill | 添加行业→skill自动映射 |
| 置信度计算手动 | 效率低 | 建立置信度自动计算框架 |
| 迭代循环无结构 | Ralph loop失败 | 建立内置迭代协议 |
| 数据验证分散 | 重复工作 | 建立数据验证skill库 |

### 6.2 优化方案

#### 方案A: 行业→Skill自动映射

```yaml
industry_skill_map:
  tech_platform:
    required:
      - network_effect_evaluator
      - data_moat_quantifier
      - platform_portfolio_matrix
      - ai_option_valuation
    optional:
      - regulatory_risk_framework
      - zero_click_impact_model

  saas:
    required:
      - arr_cohort_analysis
      - rule_of_40
      - net_dollar_retention
    optional:
      - competitive_analysis_framework

  # ... 其他行业映射
```

#### 方案B: 置信度自动计算框架

```yaml
confidence_framework:
  base_confidence: 60%  # 基础置信度

  enhancers:  # 提升因素
    - primary_data_verified: +10%
    - cross_source_validation: +8%
    - analyst_consensus_aligned: +5%
    - management_track_record: +5%
    - financial_data_audited: +7%

  reducers:  # 削减因素
    - model_assumption_uncertain: -5%
    - macro_risk_elevated: -3%
    - data_stale_>30days: -5%
    - single_source_reliance: -8%

  calculation:
    final_confidence = base + Σ(enhancers) - Σ(reducers)
    cap: 95%  # 最高不超过95%
```

#### 方案C: 内置迭代协议

```yaml
iteration_protocol:
  trigger: confidence < target_confidence

  iteration_loop:
    1. identify_uncertainty_sources:
       - list top 3 assumptions with lowest confidence
    2. design_validation_tasks:
       - for each assumption, define data needed
    3. execute_parallel_search:
       - launch Task agents for data collection
    4. update_analysis:
       - integrate new data
       - recalculate confidence
    5. check_convergence:
       - if confidence >= target: exit
       - if iterations > max: exit with warning
       - else: goto step 1

  max_iterations: 5
  confidence_target: 95%
```

---

## 七、总结

### 已完成
- ✅ 3个新skills创建
- ✅ Google报告v2.0（95%置信度）
- ✅ 升级路线图制定

### 待完成
- ⏳ 8个新skills创建
- ⏳ 3个现有skills升级
- ⏳ CLAUDE.md v7.0升级
- ⏳ Agent架构优化

### 预计收益
- 科技平台公司分析深度提升30%+
- 置信度达成效率提升50%+
- 减少重复工作60%+

---

**版本**: v1.0
**作者**: AI Research Agent
**日期**: 2026-01-27
