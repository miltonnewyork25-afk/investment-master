# Substitute Classifier v2.2

## Skill Metadata
- **ID**: ecosystem_graph.substitute_classifier_v2.2
- **Position**: Skill 4/6 in Ecosystem Graph Agent
- **Upstream**: Role Map, Flow & Rules Graph, Competition Surface
- **Downstream**: Disruption Qualification
- **Theory**: Porter's Five Forces (Substitutes) + Jobs-to-be-Done

---

## Purpose

判断"谁真正能替代谁"。用6因素模型严格筛选，避免过度泛化。

**关键区分**：竞争者(Competitor) ≠ 替代品(Substitute)
- 竞争者：同类产品争夺同一市场
- 替代品：不同类产品满足同一Job

---

## Input

```yaml
input:
  role_map: "Skill1输出"
  competition_surface: "Skill3输出"
  target_product: "待分析产品/服务"
  candidate_substitutes: ["候选替代品列表"]
```

---

## 6-Factor Substitute Model

### Factor 1: Same Job (Jobs-to-be-Done)
```yaml
same_job:
  question: "解决的核心任务是否相同？"

  job_definition:
    functional: "功能性任务（做什么）"
    emotional: "情感性任务（感受如何）"
    social: "社会性任务（如何被看待）"

  scoring:
    "3": "三层job完全匹配"
    "2": "functional匹配+部分emotional/social"
    "1": "仅functional匹配"
    "0": "job不同"

  threshold: "≥2才算同job"
```

### Factor 2: Price-Performance Ratio
```yaml
price_performance:
  question: "性价比是否可比或更优？"

  metrics:
    - price_per_unit_value: "单位价值价格"
    - total_cost_of_ownership: "TCO"
    - value_per_dollar: "每美元获得的价值"

  scoring:
    "+2": "性价比显著更优(>30%)"
    "+1": "性价比略优(10-30%)"
    "0": "持平(±10%)"
    "-1": "性价比略差"
    "-2": "性价比显著差"
```

### Factor 3: Switching Cost
```yaml
switching_cost:
  question: "切换成本多高？"

  cost_types:
    - financial: "金钱成本"
    - time: "时间成本"
    - learning: "学习成本"
    - data_migration: "数据迁移成本"
    - relationship: "关系成本"

  scoring:
    "+2": "几乎无切换成本"
    "+1": "低切换成本(<1周工作量)"
    "0": "中等(1周-1月)"
    "-1": "高(1-6月)"
    "-2": "极高(>6月或不可逆)"
```

### Factor 4: Ceiling Effect
```yaml
ceiling_effect:
  question: "原产品是否触及性能天花板？"

  indicators:
    - performance_plateau: "性能增长放缓"
    - diminishing_returns: "边际改进递减"
    - overserving: "功能过剩（超出用户需求）"

  scoring:
    "+2": "明显触顶，用户开始寻找替代"
    "+1": "接近天花板"
    "0": "仍有改进空间"
    "-1": "快速迭代中"
    "-2": "远未触顶"
```

### Factor 5: Trajectory（性能轨迹）
```yaml
trajectory:
  question: "替代品的改进速度如何？"

  analysis:
    - current_gap: "当前与目标产品的差距"
    - improvement_rate: "替代品年改进率"
    - crossover_timeline: "预计何时追上/超越"

  scoring:
    "+2": "改进率>目标2x，2年内crossover"
    "+1": "改进率>目标，5年内crossover"
    "0": "改进率相当"
    "-1": "改进率<目标"
    "-2": "差距在扩大"
```

### Factor 6: Trigger Events（触发事件）
```yaml
trigger_events:
  question: "什么事件会大规模触发切换？"

  event_types:
    - price_shock: "价格剧变（涨价/竞品降价）"
    - quality_crisis: "质量危机"
    - regulatory_change: "监管变化"
    - technology_shift: "技术范式转移"
    - generational_change: "用户代际更替"

  scoring:
    "+2": "触发事件已发生或即将发生"
    "+1": "触发事件可预见(1-3年)"
    "0": "触发条件存在但不确定"
    "-1": "触发事件遥远(>5年)"
    "-2": "无可见触发事件"
```

---

## Substitute Score Calculation

```yaml
substitute_score:
  formula: |
    SS = (same_job ≥ 2 ? 1 : 0) ×  # 门槛条件
         (price_perf + switch_cost + ceiling + trajectory + trigger) / 5

  interpretation:
    "SS > 0.6": "强替代威胁"
    "SS 0.3-0.6": "中等替代可能"
    "SS < 0.3": "弱替代/非真正替代"
    "same_job < 2": "不构成替代（自动归零）"
```

---

## Output Contract

```yaml
substitute_output:
  target_product: "目标产品"

  substitutes:
    - candidate: "候选替代品"
      same_job_score: 0-3
      factor_scores:
        price_performance: -2 to +2
        switching_cost: -2 to +2
        ceiling_effect: -2 to +2
        trajectory: -2 to +2
        trigger_events: -2 to +2
      substitute_score: 0.0-1.0
      classification: "strong/medium/weak/not_substitute"
      key_evidence: ["支撑判断的关键证据"]
      crossover_timeline: "预计超越时间（如适用）"

  summary:
    strong_substitutes: ["强替代列表"]
    emerging_threats: ["新兴替代威胁"]
    false_positives: ["常被误认为替代但实际不是"]

  confidence: 0.0-1.0
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-SC-01 | same_job<2但仍判为替代 | FAIL（逻辑错误） |
| KS-SC-02 | 无任何触发事件但判为强替代 | DEGRADE + 复核 |
| KS-SC-03 | trajectory为负但判为威胁 | 警告"逻辑不一致" |
| KS-SC-04 | 6因素中>3个无数据 | confidence cap 0.4 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 过度泛化 | 把所有竞品都当替代品 |
| 🚩 忽视切换成本 | 理论上可替代≠实际会替代 |
| 🚩 静态分析 | 忽视trajectory和trigger |
| 🚩 Job定义模糊 | "解决问题"太宽泛，需精确定义 |

---

## Consistency Check

```yaml
upstream_check:
  from_skill: "Competition Surface"
  check: "candidate_substitutes应包含高overlap竞争者"
  note: "但高overlap不自动=替代，需本skill验证"

downstream_handoff:
  to_skill: "Disruption Qualification"
  provides: ["strong_substitutes", "trajectory", "trigger_events"]
  note: "替代≠颠覆，颠覆需额外foothold+upmarket判断"
```

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.2 | 2026-01-27 | 从4因素扩展至6因素，新增trajectory+trigger |
