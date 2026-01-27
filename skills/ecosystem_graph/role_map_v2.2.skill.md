# Role Map v2.2

## Skill Metadata
- **ID**: ecosystem_graph.role_map_v2.2
- **Position**: Skill 1/6 in Ecosystem Graph Agent
- **Downstream**: Flow & Rules Graph
- **Theory**: Brandenburger & Nalebuff Value Net

---

## Purpose

把"生态里谁是谁"先画对。识别玩家、分配角色、给出关系假设。

**不负责**：替代/颠覆判断（由Skill4/5处理）

---

## Input

```yaml
input:
  target: "目标公司/产品/平台"
  scope: "分析边界（行业/地区/价值链段）"
  known_players: ["已知玩家列表（可选）"]
```

---

## Role Taxonomy

| 角色 | 定义 | 与目标的关系边 |
|------|------|---------------|
| **Customers** | 向目标付费获取价值 | 买/订阅/使用 |
| **Suppliers** | 向目标提供输入 | 卖/供应/授权 |
| **Competitors** | 争夺同一客户的同类供给 | 替代性供给 |
| **Complementors** | 产品与目标共同提升客户价值 | 互补/协同 |
| **Platforms** | 提供基础设施/分发/规则 | 依赖/抽成/规则约束 |
| **Regulators** | 制定/执行行业规则 | 合规/许可/限制 |

**注意**：一个玩家可有多角色（如Apple对App开发者是Platform+Competitor）

---

## Workflow

### S1: 玩家识别
```yaml
player_identification:
  sources:
    tier_1: ["财报供应商/客户披露", "行业协会名单"]
    tier_2: ["行业报告", "专家访谈"]
    tier_3: ["媒体报道", "招聘信息推断"]

  output:
    - player_id: "唯一标识"
    - player_name: "名称"
    - player_type: "公司/产品/平台/机构"
    - source_tier: "数据来源等级"
```

### S2: 角色分配
```yaml
role_assignment:
  for_each_player:
    - primary_role: "主要角色"
    - secondary_roles: ["次要角色（如有）"]
    - role_rationale: "为什么是这个角色（一句话）"
    - relationship_edge: "与目标的关系边类型"
```

### S3: Added Value假设
```yaml
added_value_hypothesis:
  definition: "该玩家对生态的增量价值/杠杆的初始假设"
  note: "这是假设，不是结论，需后续Skill验证"

  output:
    - player_id
    - added_value_hypothesis: "描述"
    - leverage_hypothesis: "议价权/锁定来源假设"
    - validation_needed: ["需要验证的问题"]
```

---

## Output Contract

```yaml
role_map_output:
  target: "目标公司/产品"

  roles:
    customers:
      - {player_id, name, rationale, edge_type, added_value_hypo}
    suppliers:
      - {player_id, name, rationale, edge_type, added_value_hypo}
    competitors:
      - {player_id, name, rationale, edge_type, added_value_hypo}
    complementors:
      - {player_id, name, rationale, edge_type, added_value_hypo}
    platforms:
      - {player_id, name, rationale, edge_type, added_value_hypo}
    regulators:
      - {player_id, name, rationale, edge_type, added_value_hypo}

  multi_role_players:
    - {player_id, roles: [], rationale}

  confidence: 0.0-1.0
  evidence_refs: ["来源列表"]
  validation_queue: ["需后续验证的假设"]
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-RM-01 | 关键玩家缺失（市场份额>10%未识别） | DEGRADE + flag |
| KS-RM-02 | 角色分配无rationale | FAIL |
| KS-RM-03 | 数据来源全为Tier3 | DEGRADE + confidence cap 0.5 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 过度简化 | 把复杂玩家强塞单一角色 |
| 🚩 遗漏互补者 | Value Net核心是竞合，忽视互补者=分析不完整 |
| 🚩 假设当结论 | added_value_hypothesis未标注为"待验证" |

---

## Consistency Check (与下游)

```yaml
downstream_handoff:
  to_skill: "Flow & Rules Graph"
  check: "每个player必须在Flow Graph至少出现1条edge"
  on_fail: "ORPHAN_NODE warning"
```

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.2 | 2026-01-27 | 新建，符合Ecosystem Graph v2.2规范 |
