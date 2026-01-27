# Platform Portfolio Matrix v1.0

## Skill Metadata
- **Name**: platform-portfolio-matrix
- **Version**: 1.0
- **Category**: ecosystem_analysis
- **Language**: zh/en
- **Last Updated**: 2026-01-27
- **Origin**: Google分析中发现BCG矩阵不适合平台公司

---

## Purpose

替代传统BCG矩阵，为平台型公司提供业务组合分析框架。

**为什么需要新矩阵**：

| 传统BCG | 问题 | 平台矩阵解决方案 |
|---------|------|-----------------|
| 市场份额 | 平台市场边界模糊 | 网络效应强度 |
| 市场增速 | 平台可创造新市场 | 平台成熟度 |
| 独立业务 | 平台间高度协同 | 跨平台协同维度 |
| 现金流导向 | 忽视数据/用户价值 | 战略价值导向 |

**适用公司**：
- 科技平台：Google, Meta, Amazon, Apple, Microsoft
- 中国科技：阿里, 腾讯, 字节, 美团
- 垂直平台：Uber, Airbnb, Spotify, Netflix

---

## When to Use

| 适用场景 | 说明 |
|---------|------|
| 平台公司业务组合分析 | 替代BCG矩阵 |
| 投资决策优先级 | 哪些业务加码/减码 |
| 协同价值评估 | 跨业务飞轮分析 |
| 剥离/分拆分析 | 识别可独立业务 |

---

## Framework: Platform Portfolio Matrix

### 两维度定义

**X轴：网络效应强度 (Network Effect Strength)**

```yaml
network_effect_strength:
  definition: 用户/参与者增加带来的边际价值提升

  components:
    direct_network_effect: 同侧用户价值（社交网络）
    indirect_network_effect: 跨侧用户价值（市场平台）
    data_network_effect: 数据积累提升产品质量

  scoring: 0-10
    - 10: 极强（社交网络、搜索引擎）
    - 7-9: 强（电商平台、云服务）
    - 4-6: 中等（内容平台、工具型产品）
    - 1-3: 弱（硬件、单机软件）
```

**Y轴：平台成熟度 (Platform Maturity)**

```yaml
platform_maturity:
  definition: 平台在生命周期中的位置

  stages:
    - 孵化期(0-2): 产品验证，用户<100万
    - 增长期(3-5): 快速扩张，用户增速>50%
    - 成熟期(6-8): 市场领导，增速放缓
    - 垄断期(9-10): 绝对主导，难以颠覆

  indicators:
    - 用户渗透率
    - 增速趋势
    - 竞争格局
    - 变现成熟度
```

### 矩阵四象限

```
                 网络效应强度
                 强(10) ←────→ 弱(1)
                    10    5    1
                 ┌──────┬──────┐
              10 │ 核心 │ 工具 │
   平            │ 平台 │ 业务 │
   台         5  ├──────┼──────┤
   成            │ 增长 │ 实验 │
   熟            │ 平台 │ 业务 │
   度          1 └──────┴──────┘

   核心平台(Core): 高网效+高成熟 → 保护并收割
   增长平台(Growth): 高网效+低成熟 → 投资加速
   工具业务(Utility): 低网效+高成熟 → 效率优化
   实验业务(Experiment): 低网效+低成熟 → 验证或砍掉
```

### 各象限策略

| 象限 | 特征 | 战略 | 资源分配 |
|------|------|------|---------|
| **核心平台** | 护城河深，现金牛 | 保护+优化变现 | 维护性投资 |
| **增长平台** | 高潜力，需投资 | 激进扩张 | 大量投资 |
| **工具业务** | 稳定但缺乏网效 | 效率提升 | 控制成本 |
| **实验业务** | 不确定性高 | 快速验证 | 有限资源 |

---

## Extended Analysis: Synergy Matrix

### 跨平台协同评估

```yaml
synergy_matrix:
  dimensions:
    - user_overlap: 用户重叠度
    - data_sharing: 数据共享程度
    - cross_sell: 交叉销售机会
    - cost_sharing: 成本协同
    - brand_halo: 品牌光环效应

  scoring:
    strong_synergy: >7 (深度协同，不可分割)
    medium_synergy: 4-7 (有协同，可优化)
    weak_synergy: <4 (独立性高，可考虑分拆)
```

### 协同矩阵示例（Google）

```
协同矩阵热力图：

           Search YouTube Cloud  Maps  Gmail Chrome Android Waymo
Search      ████   ████   ██    ███   ███   ████   ████    █
YouTube     ████   ████   ███   ██    ██    ████   ████    █
Cloud       ██     ███    ████  ███   ███   ██     ██      ███
Maps        ███    ██     ███   ████  ██    ███    ████    ████
Gmail       ███    ██     ███   ██    ████  ███    ███     █
Chrome      ████   ████   ██    ███   ███   ████   ███     █
Android     ████   ████   ██    ████  ███   ███    ████    ██
Waymo       █      █      ███   ████  █     █      ██      ████

图例: ████ 强协同(8-10)  ███ 中强(6-7)  ██ 中等(4-5)  █ 弱(1-3)
```

---

## Data Flywheel Analysis

### 数据飞轮模型

```yaml
data_flywheel:
  definition: |
    更多用户 → 更多数据 → 更好产品 → 更多用户

  components:
    - data_collection: 数据采集能力
    - data_processing: 数据处理能力
    - model_training: 模型训练能力
    - product_improvement: 产品改进速度
    - user_value_increase: 用户价值提升

  flywheel_velocity:
    fast: 周级迭代（AI产品）
    medium: 月级迭代（推荐系统）
    slow: 季度级迭代（传统软件）

  flywheel_acceleration:
    accelerating: 飞轮加速（用户增长+数据增长）
    steady: 稳定转动
    decelerating: 飞轮减速（用户流失或数据贬值）
```

### Google飞轮分析

```
Google "7×20亿" 数据飞轮：

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Search(20亿) ──→ 搜索意图数据 ──┐                         │
│                                   │                         │
│   YouTube(20亿) ──→ 视频偏好数据 ──┤                         │
│                                   │                         │
│   Gmail(20亿) ──→ 通信数据 ────────┼──→ 数据中台 ──→ AI训练  │
│                                   │        │                │
│   Maps(20亿) ──→ 位置行为数据 ────┤        │                │
│                                   │        ▼                │
│   Chrome(30亿) ──→ 浏览数据 ──────┤     Gemini              │
│                                   │        │                │
│   Android(30亿) ──→ 设备数据 ─────┤        │                │
│                                   │        ▼                │
│   Photos(20亿) ──→ 视觉数据 ──────┘   更好的产品 ──→ 更多用户│
│                                                   ↑         │
│                                                   └─────────┘
└─────────────────────────────────────────────────────────────┘

飞轮速度: 快（日级迭代）
飞轮加速度: 稳定加速（AI能力提升）
竞争者追赶时间: 10年+
```

---

## Workflow

### Step 1: 业务清单与基础数据

```yaml
business_inventory:
  for_each_business:
    - name: 业务名称
    - revenue: 收入
    - growth: 增速
    - users: 用户数
    - engagement: 参与度指标
    - margin: 利润率
```

### Step 2: 网络效应评分

```yaml
network_effect_scoring:
  for_each_business:
    direct_effect: 0-10
    indirect_effect: 0-10
    data_effect: 0-10
    weighted_score: (direct×0.3 + indirect×0.3 + data×0.4)
```

### Step 3: 成熟度评分

```yaml
maturity_scoring:
  for_each_business:
    penetration: 0-10
    growth_stage: 0-10
    competitive_position: 0-10
    monetization: 0-10
    weighted_score: average
```

### Step 4: 矩阵定位与策略

```yaml
matrix_positioning:
  for_each_business:
    x_position: network_effect_score
    y_position: maturity_score
    quadrant: 核心/增长/工具/实验
    recommended_strategy: 保护/投资/优化/验证
    resource_allocation: 高/中/低
```

### Step 5: 协同分析

```yaml
synergy_analysis:
  - build synergy matrix
  - identify strong synergy clusters
  - flag weak synergy (divestiture candidates)
  - calculate portfolio synergy premium
```

---

## Output Contract

```yaml
platform_portfolio_output:

  # 1. 业务定位矩阵
  portfolio_matrix:
    visualization: "ASCII或图表"
    businesses:
      - name: "业务名"
        network_effect_score: 0-10
        maturity_score: 0-10
        quadrant: "核心/增长/工具/实验"
        revenue: "$X B"
        growth: "X%"

  # 2. 象限汇总
  quadrant_summary:
    core_platforms:
      businesses: ["业务1", "业务2"]
      total_revenue: "$X B"
      strategy: "保护并收割"
    growth_platforms:
      businesses: ["业务3"]
      total_revenue: "$X B"
      strategy: "激进投资"
    utility_businesses:
      businesses: ["业务4"]
      total_revenue: "$X B"
      strategy: "效率优化"
    experimental:
      businesses: ["业务5"]
      total_revenue: "$X B"
      strategy: "快速验证"

  # 3. 协同矩阵
  synergy_matrix:
    strong_synergies: [("业务A", "业务B", 9)]
    weak_synergies: [("业务C", "业务D", 2)]
    divestiture_candidates: ["业务E"]
    synergy_premium: "X%估值溢价"

  # 4. 数据飞轮
  data_flywheel:
    velocity: "快/中/慢"
    acceleration: "加速/稳定/减速"
    competitive_moat: "X年追赶时间"
    key_data_assets: ["资产1", "资产2"]

  # 5. 投资优先级
  investment_priority:
    increase: ["业务1", "业务2"]
    maintain: ["业务3"]
    reduce: ["业务4"]
    divest_consider: ["业务5"]

  # 6. 估值含义
  valuation_implications:
    sum_of_parts: "$X T"
    synergy_premium: "$Y B"
    conglomerate_discount: "$Z B"
    fair_value: "$W T"
```

---

## Scoring System: Platform Portfolio Score (PP_Score)

### 组合健康度评分

| 维度 | 权重 | 说明 |
|------|------|------|
| **核心平台强度** | 30% | 核心象限业务的网效和主导地位 |
| **增长平台潜力** | 25% | 增长象限业务的增速和投资回报 |
| **协同效应** | 25% | 跨业务协同强度 |
| **组合平衡** | 10% | 各象限分布合理性 |
| **实验业务质量** | 10% | 期权价值和验证进度 |

```
PP_Score = Σ(维度得分 × 权重) × 100

解读:
  80-100: 优秀组合，协同强，增长清晰
  60-79: 良好组合，需优化部分业务
  40-59: 一般组合，存在结构性问题
  <40: 问题组合，需大幅重组
```

---

## Application Example: Google

### 业务定位

| 业务 | 网效分 | 成熟分 | 象限 | 策略 |
|------|--------|--------|------|------|
| Search | 10 | 10 | 核心 | 保护+AI整合 |
| YouTube | 9 | 9 | 核心 | 保护+Shorts |
| Chrome | 8 | 9 | 核心 | 保护（反垄断） |
| Android | 9 | 9 | 核心 | 保护（反垄断） |
| Gmail | 7 | 9 | 核心 | 效率优化 |
| Maps | 8 | 8 | 核心 | 变现提升 |
| Cloud | 7 | 6 | 增长 | 激进投资 |
| Gemini | 8 | 4 | 增长 | 激进投资 |
| Waymo | 5 | 3 | 实验 | 验证商业化 |
| Other Bets | 2 | 2 | 实验 | 严格筛选 |

### 矩阵可视化

```
                网络效应强度
             10 ←─────────→ 1
           ┌─────────────────────┐
        10 │Search Chrome       │
           │YouTube Android     │
           │Gmail  Maps         │
   成    8 ├─────────────────────┤
   熟      │                     │
   度    6 │      Cloud         │
           │      Gemini        │
         4 ├─────────────────────┤
           │              Waymo │
         2 │         Other Bets │
           └─────────────────────┘

   核心平台(6个): 保护并收割
   增长平台(2个): Cloud, Gemini → 激进投资
   实验业务(2个): Waymo, Other Bets → 验证
```

### 协同分析

**强协同集群**：
- Search-Chrome-Android（入口协同）
- YouTube-Search-Gemini（内容+AI协同）
- Maps-Android-Waymo（地理+出行协同）

**弱协同**：
- Other Bets多数业务与核心协同弱

**PP_Score**: 82/100（优秀组合）

---

## Kill Switches

| ID | 条件 | 触发动作 |
|----|------|---------|
| **KS-PP-001** | 核心平台份额下降>10pp | 重新评估护城河 |
| **KS-PP-002** | 增长平台连续4季度减速 | 下调投资建议 |
| **KS-PP-003** | 协同矩阵出现大面积弱化 | 评估分拆价值 |
| **KS-PP-004** | 实验业务3年无进展 | 建议砍掉 |

---

## v2.0 Contract Compliance

| 模块 | 状态 |
|------|------|
| Core Principles | ✅ |
| Scoring System | ✅ |
| Kill Switches | ✅ |
| Observability | ✅ |
| Output Contract | ✅ |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本，替代BCG矩阵 |
