# 网络效应评估框架 v1.1

## Skill Metadata
- **ID**: ecosystem_graph.network_effect_evaluator_v1.1
- **主路由**: Ecosystem Graph (70%) / Research Mechanism (20%) / Quality Gate (10%)
- **理论基础**: Rochet & Tirole (双边市场) / Katz & Shapiro (网络外部性) / Eisenmann-Parker-Van Alstyne (平台策略)

---

## Purpose

评估业务是否存在**可规模化、可防守、可变现**的网络效应。

**输出**: NE_Score (0-100) + Tipping_Likelihood + 主要瓶颈 + 反证条件

**适用**: 平台型/双边市场/生态系统/数据驱动型业务

---

## Inputs

```yaml
required:
  NetworkType: [信息撮合, 交易闭环, 服务撮合, 硬件+软件, 数据+模型, 生态系统]
  Sides: "需求侧/供给侧（可多侧）"
  CoreEvent: "核心价值事件（匹配/交易/交付/内容消费/模型推理）"
  Geo: [强地域性, 弱地域性]
  Frequency: [高频, 低频, 组合]
```

---

## 11模块评分体系 (v1.1)

| 模块 | 权重 | 核心问题 | +2 | -2 |
|------|------|----------|----|----|
| M1_MarketCeiling | 7% | 天花板在需求/供给? | 双边无天花板 | 双边严格天花板 |
| M2_Mechanism | 11% | 真网效还是仅规模? | 强同侧+强跨侧 | 无网效，仅规模 |
| M3_PricingStructure | 7% | 定价优化跨边外部性? | 结构精准 | 严重失衡 |
| M4_LiquidityDensity | 9% | 流动性够?冷启动破? | 匹配>90%，极短等待 | 严重流动性问题 |
| M5_Standardization | 8% | 服务标准化程度? | 高度标准化 | 强非标，强依赖个人 |
| M6_MultiHomingSwitching | 11% | 多归属和切换成本? | 单归属+高切换成本 | 零切换成本+全多归属 |
| M7_NegativeNetworkEffects | 8% | 负网效何时主导? | 无负网效，治理良好 | 严重负网效 |
| M8_ViralGameTheory | 6% | 病毒传播正和/零和? | 强正和病毒传播 | 零和/负和 |
| M9_DataLearningLoop | 8% | 数据飞轮形成? | 闭环运转，边际价值↑ | 无数据积累价值 |
| **M10_DataNetworkEffect** | **15%** | 数据带来边际价值? | 数据→模型→产品强闭环 | 无数据网效 |
| **M11_AIFlywheel** | **10%** | AI训练闭环加速? | 用户→数据→模型→产品飞轮 | 无AI飞轮 |

**公式**: `NE_Score = Σ(模块分数×权重)×25+50` (分数∈[-2,+2], Score∈[0,100])

**v1.1**: 新增M10/M11专门量化数据网效和AI飞轮（科技平台适用）

---

## Workflow

### M1-M9: 传统网效模块

```yaml
M1_MarketCeiling:
  check: [可触达市场N, 需求天花板, 供给天花板]
  output: "最大上限来自需求/供给/治理成本"

M2_Mechanism:
  check: [同侧网效, 跨侧网效, 仅规模vs真网效]
  key_metric: "匹配成功率vs用户规模相关性"

M3_PricingStructure:
  check: [强/弱吸引侧, 跨边弹性, 收费与价值事件绑定]
  theory: "Rochet&Tirole: 价格结构>价格水平"

M4_LiquidityDensity:
  check: [匹配成功率, 等待时间, 供需缺口, 密度口袋, 冷启动N₀]

M5_Standardization:
  check: [服务可标准化程度, 平台价值vs个人价值]

M6_MultiHomingSwitching:
  check: [多归属率, 切换成本类型, 锁定机制]
  theory: "Farrell&Klemperer: 多归属削弱赢家通吃"

M7_NegativeNetworkEffects:
  check: [拥堵, 劣质供给泛滥, 信任危机, 治理成本]
  inflection: "N*何时负网效>正网效"

M8_ViralGameTheory:
  check: [推荐激励, 正和vs零和, K因子]

M9_DataLearningLoop:
  check: [数据采集→模型训练→产品改进→更多数据]
```

### M10: 数据网络效应 (v1.1新增)

```yaml
M10_DataNetworkEffect:
  definition: "数据积累带来的边际价值提升"

  check:
    - data_volume: "数据量级(用户数×数据点/用户)"
    - data_uniqueness: "竞争者可获得性"
    - data_freshness: "更新频率"
    - ml_leverage: "数据→模型→产品闭环效率"

  scoring:
    "+2": "海量独特数据+高效ML利用+边际价值持续↑"
    "+1": "数据优势明显，ML利用中等"
    "0": "数据量大但利用不足"
    "-1": "数据可替代，竞争者可追赶"
    "-2": "无数据积累价值"

  example_google: |
    7产品×20亿用户→跨产品数据整合→搜索/广告/AI模型→
    竞争者追赶时间: 5-10年
```

### M11: AI飞轮 (v1.1新增)

```yaml
M11_AIFlywheel:
  definition: "AI训练闭环是否加速整体飞轮"

  check:
    - training_data_source: "训练数据来自用户行为?"
    - model_improvement_rate: "模型迭代速度"
    - product_integration: "模型嵌入产品闭环"
    - competitive_gap: "与竞品的能力差距趋势"

  scoring:
    "+2": "强闭环：用户↑→数据↑→模型↑→产品↑→用户↑（加速）"
    "+1": "闭环存在但转速一般"
    "0": "有AI但未形成飞轮"
    "-1": "AI能力落后，差距扩大"
    "-2": "无AI飞轮，依赖外部模型"

  measurement:
    flywheel_velocity: "(模型能力提升率)×(产品整合深度)"
    acceleration: "d(velocity)/dt > 0 ?"
```

---

## Tipping Assessment

```yaml
tipping_likelihood:
  formula: "网效强度 × 切换成本 × (1-多归属率)"

  high:
    conditions: ["NE_Score>75", "切换成本高", "多归属<20%"]
    implication: "可能赢家通吃"

  medium:
    conditions: ["NE_Score 50-75", "切换成本中等", "多归属20-50%"]
    implication: "可能2-3家共存"

  low:
    conditions: ["NE_Score<50", "切换成本低", "多归属>50%"]
    implication: "市场分散"
```

---

## Output Contract

```yaml
network_effect_output:
  ne_score: {total: 0-100, breakdown: {M1-M11各分数}}
  tipping_likelihood: "高/中/低"
  primary_bottleneck: "需求/供给/治理/冷启动/多归属/兼容性"
  data_moat_strength: "强/中/弱" (M10)
  ai_flywheel_status: "加速/运转/停滞/无" (M11)
  falsifiers: ["条件1", "条件2"] # 2-4季度内可验证
  monitoring_triggers: ["指标1突破阈值", "..."]
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-NE-01 | 多归属率>70%且上升 | 下调NE_Score，重评tipping |
| KS-NE-02 | 匹配效率连续3季度↓>10% | 流动性危机预警 |
| KS-NE-03 | 竞品用户增速>自身2倍 | 重评竞争格局 |
| KS-NE-04 | 负网效投诉率>5% | 启动治理成本评估 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 伪网效 | 用户多但边际价值不提升→仅规模经济 |
| 🚩 补贴依赖 | 停补贴用户流失→无真正锁定 |
| 🚩 供给同质化 | 供给侧无差异→价格战→利润率↓ |
| 🚩 治理失控 | 假货/欺诈/劣质内容泛滥→负网效主导 |
| 🚩 数据不可用 | 数据量大但无法有效利用于ML |

---

## v2.0 Compliance

| 模块 | 状态 |
|------|------|
| Scoring System | ✅ 11模块+权重 |
| Kill Switches | ✅ 4条 |
| Red Flags | ✅ 5个 |
| Output Contract | ✅ |
| Theoretical Foundation | ✅ 4理论 |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.1 | 2026-01-27 | 新增M10/M11，压缩至~300行 |
| 1.0 | 2026-01-27 | 初始版本 |
