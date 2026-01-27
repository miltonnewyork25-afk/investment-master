# Flow & Rules Graph v2.2

## Skill Metadata
- **ID**: ecosystem_graph.flow_rules_graph_v2.2
- **Position**: Skill 2/6 in Ecosystem Graph Agent
- **Upstream**: Role Map (requires player_ids)
- **Downstream**: Competition Surface, Substitute Classifier
- **Theory**: Value Network Analysis + Platform Economics

---

## Purpose

画出"谁给谁传递什么"以及"谁制定规则约束谁"。

**输出**：4类流动边 + 规则边 + 规则制定者 + 咽喉点识别。

---

## Input

```yaml
input:
  role_map: "Skill1输出（player_ids + roles）"
  target: "目标公司/产品"
```

---

## 4 Flow Types

| 流动类型 | 定义 | 边属性 |
|---------|------|--------|
| **Money** | 资金流向（付费/投资/补贴） | amount, frequency, terms |
| **Goods** | 产品/服务/原材料流向 | volume, exclusivity, lead_time |
| **Data** | 数据/信息流向 | type, ownership, value |
| **Influence** | 影响力/决策权流向 | mechanism, strength |

---

## Rule Edge Taxonomy

### Formal Rules（正式规则）
| 类型 | 定义 | 示例 |
|------|------|------|
| standards | 技术/行业标准 | USB-C、5G NR |
| apis_protocols | API/协议规范 | OAuth、gRPC |
| contracts_terms | 合同条款 | 独家供应、MFN |
| certifications | 认证/资质要求 | FDA、ISO |
| regulations | 政府法规 | GDPR、反垄断 |
| ip_patents | 知识产权/专利 | SEP、交叉授权 |

### Platform Rules（平台规则）
| 类型 | 定义 | 示例 |
|------|------|------|
| platform_policies | 平台政策 | App Store审核、30%抽成 |
| pricing_rules | 定价规则 | MFN、最低价保证 |
| data_rights | 数据权限规则 | 数据可携带、API访问限制 |

### Implicit Rules（隐性规则）
| 类型 | 定义 | 示例 |
|------|------|------|
| network_lock_in | 网络效应锁定 | 社交图谱、内容生态 |
| habit_lock_in | 习惯/学习曲线锁定 | 快捷键、工作流 |

---

## Workflow

### S1: 流动边识别
```yaml
flow_identification:
  for_each_player_pair:
    - from_player: "起点player_id"
    - to_player: "终点player_id"
    - flow_type: "money/goods/data/influence"
    - attributes: {amount, frequency, exclusivity...}
    - confidence: 0.0-1.0
    - source: "数据来源"
```

### S2: 规则边识别
```yaml
rule_identification:
  for_each_rule:
    - rule_id: "唯一标识"
    - rule_type: "formal/platform/implicit"
    - rule_subtype: "具体类型"
    - rule_owner: "规则制定者player_id"
    - constrained_players: ["受约束player_ids"]
    - constraint_strength: "weak/medium/strong/absolute"
    - escape_cost: "规避成本估算"
    - confidence: 0.0-1.0
```

### S3: 咽喉点识别
```yaml
chokepoint_detection:
  definition: "移除后导致流动中断的节点或边"

  criteria:
    - flow_concentration: ">50%流量经过"
    - no_alternative: "无可替代路径"
    - high_switching_cost: "转换成本>6个月收入"

  output:
    - chokepoint_id
    - type: "node/edge"
    - controlled_by: "player_id"
    - criticality: 0.0-1.0
    - mitigation_options: ["可能的规避方式"]
```

---

## Output Contract

```yaml
flow_rules_output:
  target: "目标公司/产品"

  flows:
    - {from, to, flow_type, attributes, confidence}

  rules:
    - {rule_id, type, subtype, owner, constrained, strength, escape_cost, confidence}

  rule_owners:
    - {player_id, rules_owned: [], power_score: 0.0-1.0}

  chokepoints:
    - {id, type, controlled_by, criticality, mitigation}

  orphan_warning: ["Role Map中无边连接的players"]

  aggregate_confidence: 0.0-1.0
  evidence_refs: ["来源列表"]
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-FR-01 | Role Map中player在此无任何边 | ORPHAN_NODE warning |
| KS-FR-02 | 规则边无rule_owner | FAIL |
| KS-FR-03 | 咽喉点criticality>0.8但无mitigation | DEGRADE + flag |
| KS-FR-04 | 全部边confidence<0.5 | 整体confidence cap 0.4 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 隐性规则遗漏 | 只看formal rules忽视lock-in |
| 🚩 单向流动假设 | 忽视反向流动（如数据回流） |
| 🚩 规则静态化 | 规则在变化中，需标注时效 |

---

## Consistency Check

```yaml
upstream_check:
  from_skill: "Role Map"
  check: "每个player_id必须至少有1条flow或rule边"
  on_fail: "ORPHAN_NODE warning → 返回Role Map补充或删除"

downstream_handoff:
  to_skills: ["Competition Surface", "Substitute Classifier"]
  provides: ["chokepoints", "rule_owners", "flow_concentration"]
```

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.2 | 2026-01-27 | 新建，扩展rule_edge_types至11类 |
