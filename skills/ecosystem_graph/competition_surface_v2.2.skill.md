# Competition Surface v2.2

## Skill Metadata
- **ID**: ecosystem_graph.competition_surface_v2.2
- **Position**: Skill 3/6 in Ecosystem Graph Agent
- **Upstream**: Role Map, Flow & Rules Graph
- **Downstream**: Substitute Classifier
- **Theory**: Porter's Five Forces (Rivalry dimension)

---

## Purpose

量化"竞争在哪里发生、激烈程度如何"。

**不负责**：替代品判断（Skill4）、颠覆判断（Skill5）

---

## Input

```yaml
input:
  role_map: "Skill1输出"
  flow_rules: "Skill2输出"
  target: "目标公司/产品"
```

---

## Competition Dimensions

| 维度 | 定义 | 衡量指标 |
|------|------|---------|
| **Customer** | 争夺同一客户群 | 客户重叠率、win/loss rate |
| **Resource** | 争夺同一资源（人才/供应商） | 供应商共享度、人才流动 |
| **Attention** | 争夺用户时间/注意力 | DAU竞争、使用时长侵蚀 |
| **Capital** | 争夺投资者资金 | 融资竞争、估值对标 |
| **Regulatory** | 争夺监管有利地位 | 游说支出、政策影响 |

---

## Workflow

### S1: 竞争者配对
```yaml
competitor_pairing:
  from_role_map: "提取所有role=Competitor的players"

  for_each_pair:
    - player_a: "目标公司"
    - player_b: "竞争者"
    - competition_dimensions: ["触发的竞争维度"]
    - overlap_score: 0.0-1.0
```

### S2: 竞争强度评估
```yaml
intensity_scoring:
  for_each_dimension:
    factors:
      - market_concentration: "CR4/HHI"
      - growth_rate: "高增长=低强度，低增长=高强度"
      - differentiation: "差异化程度"
      - exit_barriers: "退出壁垒"
      - strategic_stakes: "战略重要性"

    intensity_score: 0.0-1.0
    intensity_label: "low/medium/high/intense"
```

### S3: 竞争表面映射
```yaml
surface_mapping:
  output:
    competition_matrix: |
      | 竞争者 | Customer | Resource | Attention | Capital | Regulatory | 综合 |
      |--------|----------|----------|-----------|---------|------------|------|
      | 竞争者A | 0.8 | 0.3 | 0.7 | 0.5 | 0.2 | 0.5 |

    hotspots: ["竞争最激烈的维度"]
    cold_zones: ["竞争较弱的维度"]
```

---

## Scoring System: CI_Score (0-100)

| 维度 | 权重 | +2 | -2 |
|------|------|----|-----|
| 市场集中度 | 25% | CR4>80%（少竞争） | CR4<40%（激烈） |
| 市场增速 | 25% | >20% CAGR | <5%或负增长 |
| 差异化程度 | 20% | 高度差异化 | 同质化严重 |
| 退出壁垒 | 15% | 低退出壁垒 | 高退出壁垒 |
| 战略重要性 | 15% | 非核心市场 | 必争之地 |

**公式**: `CI_Score = Σ(维度分数×权重)×25+50`

**解读**:
- CI>70: 竞争环境友好
- CI 50-70: 中等竞争
- CI<50: 激烈竞争

---

## Output Contract

```yaml
competition_surface_output:
  target: "目标公司"

  competitors:
    - {player_id, name, overlap_score, primary_dimensions}

  dimension_analysis:
    customer: {intensity, key_battlegrounds}
    resource: {intensity, contested_resources}
    attention: {intensity, time_competition}
    capital: {intensity, valuation_peers}
    regulatory: {intensity, policy_stakes}

  competition_matrix: "维度×竞争者矩阵"

  ci_score: {total, breakdown}

  hotspots: ["最激烈竞争点"]
  strategic_implications: ["竞争格局对目标的影响"]

  confidence: 0.0-1.0
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-CS-01 | 无竞争者识别（Role Map中无Competitor） | FAIL或返回Role Map |
| KS-CS-02 | 所有维度intensity<0.3 | 警告"可能遗漏竞争" |
| KS-CS-03 | 竞争者数据全为Tier 3 | confidence cap 0.5 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 忽视间接竞争 | 只看直接对手，忽视注意力/资源竞争 |
| 🚩 静态分析 | 竞争格局在变化，需标注趋势 |
| 🚩 过度聚焦头部 | 忽视新进入者/边缘竞争者 |

---

## Consistency Check

```yaml
upstream_check:
  from_skill: "Role Map"
  check: "Competitor角色players必须出现在competition_matrix"

downstream_handoff:
  to_skill: "Substitute Classifier"
  provides: ["competitor_list", "overlap_scores", "hotspots"]
  note: "高overlap不等于替代，替代需Skill4的6因素判断"
```

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.2 | 2026-01-27 | 新建，含5维度竞争模型+CI_Score |
