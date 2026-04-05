---
name: lens-crystallization
description: Phase 4后置结晶。从完整草稿反向提炼Top 5核心投资视角，产出Lens-to-Model传导表和前台重组计划。
---

# Lens Crystallization Skill（Part A）

## 触发时机
Phase 3（Adversarial）完成且Evaluator PASS后，Generator在Phase 4调用此skill。

## 前置条件
- Phase 1-2 staging全部完成
- Phase 3红队回流已执行
- lens_seed_registry.yaml已有≥5个seeds
- revision_backflow_table.yaml已完成

---

## A1: Lens Seed Registry Review

读取`lens_seed_registry.yaml`，审查所有已记录的seeds。每个seed应有：
- Seed标题 + 来源章节
- 一句话描述
- 打在哪个底层变量
- 成熟度（embryonic / developing / mature）
- 是否影响估值/承重墙/评级
- 是否��市场预期有关

---

## A3: Crystallizer（核心步骤）

### 输入
- 完整草稿（所有staging文件）
- Lens Seed Registry
- 核心矛盾（research_state.yaml）
- 承重墙表
- 估值模型输出
- 红队结果（revision_backflow_table）
- Kill Switch条件

### 必须找出
1. 全稿中**反复出现但未被前置**的底层变量
2. **跨章节才能成立**的交叉视角（单章节内的不算）
3. 真正**改变了承重墙排序**的变量
4. 真正**改变市场预期理解**的变量
5. 红队攻击后**存活下来的最强洞见**

### 产出
Top 10候选后发现视角，每个包含：
- 视角标题
- 一句话判断（不是问题）
- 涉及哪些章节（≥2个才算交叉视角）
- 打在哪个一阶变量
- 是否改变承重墙排序
- 是否改变估值含义
- 市场是否已知/已定价

---

## A4: Lens Quality Gate

每个候选必须通过以下6条，否则淘汰：

1. **整篇压缩结果** — 它是整篇报告的压缩结果，而不是单章节观点？
2. **跨章节整��** — 它整合了至少2个章节的发现？
3. **改变承重墙/估值/预期** — 它改变了承重墙、估值或市场预期理解？
4. **可验证** — 它有清晰的验证路径（哪些数据/事件能确认/证伪）？
5. **不可删除** — 删掉它后，整篇报告明显变浅？
6. **值得前置** — 它值得被放在报告最前面让读者第一时间看到？

不通过任何一条 → 淘汰。

---

## A5: Lens Ranking（Top 10 → Top 5）

排序标准（按优先级）：
1. 整篇报告最深的一刀
2. 能压缩多个章节的解释力
3. 改变了承重墙排序
4. 改变了估值或市场预期理解
5. 最有价值的非共识结晶
6. 适合被前置而不误导读者

---

## A6: Lens-to-Model Transmission

每个Top 5 lens必须填写传导表：

```yaml
lens_id: "LENS-001"
title: "视角标题"
judgment: "一句话判断"

transmission:
  first_order_variable: "打在哪个一阶变量"
  impact_on:
    revenue: "如何影响收入"
    margin: "如何影响利润率"
    capital_efficiency: "如何影响资本效率"
    valuation_multiple: "如何影响估值倍数"
  time_horizon: "短期/中期/长期"
  currently_in_model: true/false
  if_not_in_model:
    modify_scenario: "应修改哪个情景"
    modify_parameter: "应修改哪个参数"
    modify_weight: "应修改哪个权重"
  validation_data: "哪些数据或事件能验证"
  load_bearing_wall_impact: "若成立，最该重估哪条承重墙"
```

---

## A7: Late Angle Gate

评估新Top 5相对旧前台结构的夹角。五个维度：

| 维度 | 评估 | 夹角大小 |
|------|------|---------|
| 变量层 | Top 5打在的变量 vs 旧结构的主变量 | 0-5 |
| 时间层 | Top 5的时间跨度 vs 旧结构 | 0-5 |
| 机制层 | Top 5揭示的因果机制 vs 旧结构 | 0-5 |
| 预期层 | Top 5改变的市场预期理解 vs 旧结构 | 0-5 |
| 决策层 | Top 5改变的投资决策 vs 旧结构 | 0-5 |

总分≥15 → 值得大规模前台重组
总分10-14 → 部分重组
总分<10 → 微调即可

---

## A8: Front Recomposition Plan

产出前���重组方案（不直接重写全稿）：

```yaml
recomposition_plan:
  new_opening_order:
    - "一句话结论"
    - "Top 5 Lens Cards"
    - "市场在定价什么 / 可能错在哪里"
    - "3-5个最重要数字"
    - "承重墙与失效条件摘要"
    - "正文主体"

  top5_cards:
    - lens_id: "LENS-001"
      title: "..."
      judgment: "..."
      market_priced: "..."
      investment_implication: "..."

  chapters_to_delete: []
  chapters_to_shrink: []
  chapters_to_move_to_appendix: []
  chapters_to_reorder: []
  low_value_transitions_to_cut: []
```

---

## A9: Search Budget

- Lens Seeds: 轻量持续记录（Phase 1-2��
- Crystallizer主循环: 1次
- 补充循环: 最多1次
- 候选视��: 最多10个
- 最终Top 5: 必须在2轮内收敛

---

## 产出文件清单

1. `reports/{TICKER}/data/top5_lenses.yaml` — 最终Top 5及传导表
2. `reports/{TICKER}/data/chapter_to_lens_map.md` — 章节→Lens映射
3. `reports/{TICKER}/data/front_recomposition_plan.md` — 前台重组方案
4. `reports/{TICKER}/data/late_angle_report.yaml` — 夹角评估
5. `reports/{TICKER}/data/lens_seed_registry.yaml` — 更新为final版本
