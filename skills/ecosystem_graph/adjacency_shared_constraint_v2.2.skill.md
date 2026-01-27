# Adjacency by Shared Constraint v2.2

## Skill Metadata
- **ID**: ecosystem_graph.adjacency_shared_constraint_v2.2
- **Position**: Skill 6/6 in Ecosystem Graph Agent
- **Upstream**: All previous skills (Role Map → Disruption)
- **Theory**: Constraint-Based Strategic Analysis

---

## Purpose

识别"共享约束创造的战略邻接机会"——不是传统的业务相邻，而是因共同受制于同一约束而产生的合作/整合/替代可能。

**核心洞察**：共享约束 = 潜在战略关系

---

## Input

```yaml
input:
  role_map: "Skill1输出"
  flow_rules: "Skill2输出（含rule_owners, chokepoints）"
  competition_surface: "Skill3输出"
  substitutes: "Skill4输出"
  disruption: "Skill5输出"
  target: "目标公司"
```

---

## Constraint Taxonomy

### 资源约束
| 类型 | 定义 | 示例 |
|------|------|------|
| talent | 争夺同一人才池 | AI研究员、芯片工程师 |
| capital | 受制于同一资本来源 | VC轮次、产业资本 |
| supply | 依赖同一供应商 | 台积电、NVIDIA |
| infrastructure | 共用基础设施 | 云平台、支付通道 |

### 规则约束
| 类型 | 定义 | 示例 |
|------|------|------|
| regulation | 受同一监管机构约束 | FDA、GDPR、SEC |
| platform | 受同一平台规则约束 | App Store、AWS政策 |
| standard | 受同一技术标准约束 | USB-IF、3GPP |

### 市场约束
| 类型 | 定义 | 示例 |
|------|------|------|
| customer | 服务同一客户群 | 企业IT买家、Z世代 |
| distribution | 共用分销渠道 | 运营商、零售商 |
| attention | 竞争同一注意力池 | 社交媒体时间 |

---

## Adjacency Detection Workflow

### S1: 约束识别
```yaml
constraint_identification:
  for_each_player:
    - player_id
    - constraints:
        - constraint_type: "talent/capital/supply/regulation/..."
        - constraint_source: "约束来源"
        - constraint_severity: "low/medium/high/critical"
        - shared_with: ["共享此约束的其他players"]
```

### S2: 邻接机会评估
```yaml
adjacency_opportunities:
  types:
    collaboration:
      definition: "共同解决约束的合作机会"
      example: "共同游说监管、联合采购"
      value: "降低约束成本"

    acquisition:
      definition: "收购解决约束的机会"
      example: "垂直整合供应商"
      value: "消除约束"

    substitution:
      definition: "因约束变化产生的替代可能"
      example: "监管放松使新进入者涌入"
      value: "改变竞争格局"

    platform:
      definition: "成为约束协调者的机会"
      example: "建立行业标准、成为中间平台"
      value: "从受约束者变为规则制定者"
```

### S3: 战略关系图
```yaml
strategic_adjacency_map:
  nodes: "所有players"
  edges:
    - from: "player_a"
    - to: "player_b"
    - shared_constraints: ["共享约束列表"]
    - adjacency_type: "collaboration/acquisition/substitution/platform"
    - opportunity_score: 0.0-1.0
    - strategic_rationale: "战略逻辑"
```

---

## Scoring System: SA_Score (0-100)

| 维度 | 权重 | +2 | -2 |
|------|------|----|-----|
| 约束共享度 | 30% | 共享≥3个关键约束 | 无共享约束 |
| 约束严重度 | 25% | 约束为critical | 约束为low |
| 互补性 | 25% | 能力高度互补 | 能力重叠/冲突 |
| 可执行性 | 20% | 文化/规模匹配 | 严重不匹配 |

**公式**: `SA_Score = Σ(维度分数×权重)×25+50`

---

## Output Contract

```yaml
adjacency_output:
  target: "目标公司"

  constraints_faced:
    - {type, source, severity, shared_with}

  adjacency_opportunities:
    - partner: "潜在伙伴/目标"
      shared_constraints: ["共享约束"]
      adjacency_type: "collaboration/acquisition/substitution/platform"
      sa_score: 0.0-1.0
      strategic_rationale: "战略逻辑"
      execution_barriers: ["执行障碍"]
      timeline: "时间窗口"

  strategic_map:
    high_priority: ["SA_Score>70的机会"]
    emerging: ["SA_Score 50-70"]
    monitor: ["SA_Score<50但有潜力"]

  investment_implications:
    - insight: "对投资决策的启示"
    - action: "建议行动"

  confidence: 0.0-1.0
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-SA-01 | 约束识别遗漏chokepoints | 返回Skill2补充 |
| KS-SA-02 | 邻接机会无战略逻辑 | FAIL |
| KS-SA-03 | SA_Score>70但无执行路径 | DEGRADE |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 机械邻接 | 仅因业务相似就判为邻接 |
| 🚩 忽视执行障碍 | 理论邻接≠可执行 |
| 🚩 约束静态化 | 约束在变化，需标注时效 |

---

## Consistency Check

```yaml
upstream_integration:
  from_all_skills: true
  checks:
    - "chokepoints(Skill2)必须出现在constraints"
    - "rule_owners(Skill2)的规则必须被考虑"
    - "true_disruptors(Skill5)的约束需分析"

final_output:
  ecosystem_graph_complete:
    - role_map: "Skill1"
    - flow_rules: "Skill2"
    - competition_surface: "Skill3"
    - substitutes: "Skill4"
    - disruption: "Skill5"
    - adjacency: "Skill6(本skill)"

  cross_skill_validation:
    - "所有players在≥2个skill中出现"
    - "confidence传递：downstream ≤ min(upstreams)"
```

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.2 | 2026-01-27 | 新建，完成Ecosystem Graph 6-skill闭环 |
