# 品牌情感控制系统 v1.0

> **Skill ID**: `brand_strategy.brand_emotion_control_v1.0`
> **主路由**: Brand Strategy (60%)
> **辅助路由**: Research Mechanism (25%), Quality Gate (15%)
> **理论基础**: SDT自我决定论 / Fogg行为模型 / Peak-End体验法则 / Cialdini说服原则 / EPPM恐惧诉求模型
> **归档日期**: 2026-01-27

---

## Skill 用途

将"品牌与情感"从灵感清单升级为**可审计的控制系统**：

```
Needs(为什么) → BehaviorGate(做不做得到) → Memory(记住什么) → Persuasion(怎么说服) → Governance(不反噬)
```

**输出可执行**：
1. 杠杆组合选择
2. 触点改造方案
3. 情绪投入占比(A/B/C配比)
4. 实验计划(含停表规则)
5. 反噬护栏与伦理审计

**适用场景**：
- To C品牌策略设计
- 用户体验优化
- 转化率/留存/复购提升
- 品牌溢价与定价策略
- 情感营销合规审计

---

## 输入参数 (Inputs)

```yaml
inputs:
  brand_context:
    description: "品牌背景"
    required:
      - category: "品类"
      - price_tier: "价格带（低/中/高/奢侈）"
      - channel: "渠道（线上/线下/混合）"
      - brand_tonality: "品牌调性"
      - category_norms: "品类默认玩法/竞品规范"

  audience:
    description: "目标人群"
    required:
      - segments: "人群分层"
      - jtbd: "Jobs To Be Done"
      - desires: "核心渴望"
      - anxieties: "核心焦虑"
      - identity_narrative: "身份叙事（他们想成为谁/被如何看见）"

  journey:
    description: "用户旅程"
    stages:
      - "发现"
      - "比较"
      - "下单"
      - "等待"
      - "交付"
      - "使用"
      - "分享"
      - "售后/续费"

  goal_metrics:
    description: "目标与护栏指标"
    primary: ["CVR", "留存", "复购", "ARPU", "提价接受度", "分享率"]
    guardrails: ["退款率", "投诉率", "NPS", "负面舆情"]

  constraints:
    description: "约束条件"
    items:
      - budget: "预算"
      - timeline: "周期"
      - compliance: "合规要求"
      - delivery_capability: "交付能力（承诺可兑现程度）"
```

---

## 六层模型架构 (6-Layer Model)

### L1: 需求坐标系 (Needs Coordinate)

**理论基础**: SDT自我决定论 + 进化心理学

**统一坐标系**：

| 维度 | SDT来源 | 进化来源 | 用户表达 |
|------|---------|----------|----------|
| **自主** | Autonomy | 控制感 | "我说了算" |
| **胜任** | Competence | 能力展示 | "我能行" |
| **联结** | Relatedness | 归属与认同 | "我属于这里" |
| **地位** | - | 社会等级 | "我比别人强/不比别人差" |
| **安全** | - | 生存本能 | "我不会吃亏/出错" |
| **探索** | - | 好奇心 | "我发现了新东西" |

**输出要求**：
```yaml
needs_output:
  top_3_needs:
    - need: "[需求1]"
      priority: 1
      user_voice: "用户想被如何看见/如何确认自己：___"

    - need: "[需求2]"
      priority: 2
      user_voice: "___"

    - need: "[需求3]"
      priority: 3
      user_voice: "___"

  evidence: "[支撑需求排序的证据]"
```

---

### L2: 行为门槛 (Behavior Gate)

**理论基础**: Fogg行为模型 B=MAP / COM-B模型

**公式**: `行为 = 动机(M) × 能力(A) × 触发(P)`

**诊断框架**：

| 关键行为 | 动机诊断 | 能力诊断 | 触发诊断 |
|----------|----------|----------|----------|
| 注册 | 价值不清晰？恐惧隐私？ | 步骤多？信息要求多？ | 时机不对？提示弱？ |
| 下单 | 不确定值不值？ | 支付摩擦？选择困难？ | 紧迫感不足？ |
| 复购 | 无惊喜？竞品更好？ | 重新搜索麻烦？ | 未被提醒？ |
| 分享 | 无社交货币？怕被嫌弃？ | 分享路径复杂？ | 无合适时机？ |

**输出要求**：
```yaml
behavior_gate_output:
  behaviors:
    - behavior: "[关键行为]"
      diagnosis:
        motivation: "[动机卡点]"
        ability: "[能力/摩擦卡点]"
        prompt: "[触发卡点]"
      primary_bottleneck: "[M/A/P中最严重的]"
      intervention:
        strategy: "[加动机/降摩擦/改触发]"
        specific_action: "[具体动作]"
```

---

### L3: 记忆设计 (Memory Design)

**理论基础**: Peak-End Rule (Kahneman)

**核心规则**: 情绪预算优先砸在 **2个峰值时刻 + 1个结尾时刻**

**峰值时刻候选**：
- 交付时刻（开箱/到货）
- 首次成功使用
- 意外惊喜（超预期）
- 身份确认时刻（被认可）

**结尾时刻候选**：
- 交付完成
- 售后体验
- 退款处理
- 续费/复购
- 收尾惊喜

**输出要求**：
```yaml
memory_design_output:
  peak_1:
    moment: "[时刻描述]"
    emotion_goal: "[目标情绪：惊喜/感动/自豪/安心...]"
    action: "[具体动作]"
    observable_signal: "[可观测信号：行为/反馈/数据]"

  peak_2:
    moment: "..."
    emotion_goal: "..."
    action: "..."
    observable_signal: "..."

  ending:
    moment: "[结尾时刻]"
    emotion_goal: "..."
    action: "..."
    observable_signal: "..."
```

---

### L4: 说服结构 (Persuasion Structure)

**理论基础**: Cialdini说服原则

**七大原则**：

| 原则 | 机制 | 正确用法 | 滥用风险 |
|------|------|----------|----------|
| **互惠** | 先给价值，触发回报义务 | 真诚给价值（试用/赠品/工具/内容） | 假赠品、套路式 |
| **稀缺** | 少=珍贵 | 真实限量、真实时效 | 虚假倒计时、假库存 |
| **社会认同** | 从众与模仿 | 真实用户、真实数据 | 刷单、假评论 |
| **权威** | 专家背书 | 真实资质、可验证 | 伪专家、假认证 |
| **一致性** | 承诺与行动一致 | 小承诺→大行动 | 诱导承诺陷阱 |
| **喜欢** | 相似性、赞美、熟悉 | 真实故事、真诚赞美 | 虚假人设 |
| **统一** | 同一群体认同 | 真实社群、价值观共鸣 | 假社群、操纵认同 |

**规则**：
- 每个决策节点只用 **1-2条原则**
- 必须绑定 **真实证据 + 兑现机制**
- 避免套路化

**输出要求**：
```yaml
persuasion_map:
  - decision_node: "[决策节点：发现/比较/下单/...]"
    principle: "[使用的原则]"
    evidence: "[真实证据]"
    fulfillment: "[兑现机制：服务/保障/规则透明]"

  - decision_node: "..."
    principle: "..."
    evidence: "..."
    fulfillment: "..."
```

---

### L5: 杠杆库 (Lever Library)

**9大情绪杠杆**：

#### 1. 地位与影响力 (Status_Influence)
```yaml
lever:
  name: "Status_Influence"
  mechanism: "地位/影响力：资格、稀缺配额、社群层级、专属服务"
  use_cases:
    - "会员等级体系"
    - "邀请制/配额制"
    - "专属客服/通道"
  luxury_note: "奢侈品可用Veblen逻辑：价格↑→需求↑"
  risk: "引发攀比焦虑、排斥感"
```

#### 2. 英雄之旅 (Hero_Journey)
```yaml
lever:
  name: "Hero_Journey"
  mechanism: "用户是英雄，你是导师；里程碑/挑战/前后对比叙事"
  use_cases:
    - "学习/健身/成长类产品"
    - "前后对比展示"
    - "里程碑庆祝"
  risk: "叙事过度、用户无感"
```

#### 3. 随机奖励 (Variable_Rewards)
```yaml
lever:
  name: "Variable_Rewards"
  mechanism: "可变比率强化（老虎机效应）"
  use_cases:
    - "抽奖/盲盒"
    - "随机优惠"
    - "惊喜礼物"
  mandatory_guardrails:
    - "透明概率"
    - "限频机制"
    - "防沉迷护栏"
  risk: "成瘾、反噬、监管风险"
```

#### 4. 恐惧诉求 (Fear_Appeal_EPPM)
```yaml
lever:
  name: "Fear_Appeal_EPPM"
  mechanism: "按EPPM模型：恐惧必须同时给应对效能+自我效能"
  rule: "必须同时回答：'有解决方案' + '你能做到'"
  violation_consequence: "只给恐惧不给出路→触发拒绝/愤怒"
  use_cases:
    - "健康/保险/安全类"
    - "错过损失（真实的）"
  risk: "过度恐惧→反感→品牌损伤"
```

#### 5. 奖赏系统 (Reward_System)
```yaml
lever:
  name: "Reward_System"
  mechanism: "社会奖赏/地位奖赏/自我奖赏（进度与成就）"
  types:
    - "社会奖赏：被认可、被点赞"
    - "地位奖赏：勋章、称号、排名"
    - "自我奖赏：进度条、成就解锁"
  risk: "奖赏通胀、边际效用递减"
```

#### 6. 确定性与安全 (Certainty_Safety)
```yaml
lever:
  name: "Certainty_Safety"
  mechanism: "降低不确定性焦虑"
  tactics:
    - "进度可视化"
    - "交付承诺（准时/不准时赔）"
    - "售后保障（无理由退/延保）"
    - "规则透明"
  note: "这是信任价值(C)的核心，任何强刺激(B)必须有C托底"
  risk: "承诺无法兑现→信任崩塌"
```

#### 7. 稀缺信息探索 (Scarce_Info_Exploration)
```yaml
lever:
  name: "Scarce_Info_Exploration"
  mechanism: "独特/个性化/'你不知道但该知道的'"
  use_cases:
    - "个性化推荐"
    - "独家内容/信息"
    - "先知先觉感"
  risk: "信息过载、隐私担忧"
```

#### 8. 互惠 (Reciprocity)
```yaml
lever:
  name: "Reciprocity"
  mechanism: "先给价值，触发回报义务"
  tactics:
    - "免费试用"
    - "赠品/样品"
    - "工具/模板"
    - "有价值内容"
    - "推荐奖励"
  rule: "给的必须是真价值，不是套路"
  risk: "假互惠→被识破→反感"
```

#### 9. 感官营销 (Sensory_Marketing)
```yaml
lever:
  name: "Sensory_Marketing"
  mechanism: "感官编码：视觉/听觉/触觉/味觉/气味/音乐一致性与辨识度"
  tactics:
    - "品牌色/字体/图形一致性"
    - "声音logo/品牌音乐"
    - "包装触感"
    - "门店气味"
  note: "跨触点一致性是关键"
  risk: "感官疲劳、不匹配品牌调性"
```

---

### L6: 治理层 (Governance)

#### 伦理红线 (Ethics Redlines)

```yaml
ethics_redlines:
  absolute_prohibitions:
    - "虚假稀缺（假倒计时、假库存）"
    - "夸大恐惧（无解决方案的恐吓）"
    - "诱导沉迷（无限制的随机奖励）"
    - "Deceptive/Dark Patterns"

  sensitive_populations:
    rule: "敏感人群（未成年/老年/心理脆弱）默认关闭强刺激"
    populations:
      - "未成年人"
      - "老年人"
      - "财务困难者"
      - "心理脆弱群体"

  transparency_requirements:
    - "概率必须公示"
    - "价格必须真实"
    - "评价必须真实"
    - "承诺必须可兑现"
```

#### 停表规则 (Stop Rules)

```yaml
stop_rules:
  trigger_condition: |
    若主指标↑但护栏指标恶化→立刻停表并降级策略

  guardrail_thresholds:
    - metric: "退款率"
      threshold: "环比上升>20%"
      action: "暂停实验"

    - metric: "投诉率"
      threshold: "环比上升>30%"
      action: "暂停实验"

    - metric: "NPS"
      threshold: "下降>10分"
      action: "暂停实验"

    - metric: "负面舆情"
      threshold: "出现>3条负面报道"
      action: "危机响应"

  degradation_strategy: |
    降级策略：用"确定性/互惠/收尾体验"替代"随机奖励/恐惧"
    即：用L5中的Certainty_Safety/Reciprocity替代Variable_Rewards/Fear_Appeal
```

---

## 评分体系 (Scoring)

### 三维评分

| 维度 | 定义 | 评分标准 |
|------|------|----------|
| **EmotionROI** | (主指标提升×覆盖) / (成本×复杂度) | 1-5分 |
| **TrustRisk** | 反噬风险（投诉/退款/NPS/法律/舆情） | 1-5分（低=好） |
| **BrandFit** | 与品类规范+品牌调性一致性 | 1-5分 |

### 优先级公式

```
优先级 = EmotionROI × BrandFit ÷ TrustRisk
```

**规则**: 只选 **Top-2** 进入实验

### 评分模板

```yaml
lever_scoring:
  - lever: "[杠杆名称]"
    emotion_roi: "[1-5]"
    trust_risk: "[1-5]"
    brand_fit: "[1-5]"
    priority_score: "[计算结果]"
    decision: "[进入实验/备选/放弃]"
```

---

## 预算配比 (Budgeting)

### A/B/C三层价值

| 层级 | 定义 | 示例 |
|------|------|------|
| **A - 功能价值** | 产品本身解决的问题 | 功能、性能、价格 |
| **B - 情绪价值** | 杠杆带来的情感溢价 | 地位、惊喜、认同 |
| **C - 信任价值** | 确定性/保障/透明 | 售后、承诺、规则 |

### 配比规则

```yaml
budgeting_rules:
  priority_order: "先C → 再A → 后B"
  rationale: "任何强刺激B必须有C托底，否则反噬"

  adjustment_factors:
    - factor: "品类风险"
      high_risk: "增加C占比"
      low_risk: "可增加B占比"

    - factor: "客单价"
      high_price: "增加C占比（决策慎重）"
      low_price: "可增加B占比"

    - factor: "决策周期"
      long_cycle: "增加C占比"
      short_cycle: "可增加B占比"

    - factor: "渠道"
      online_only: "C更重要（无实体信任）"
      offline: "A更直观"
```

### 配比输出模板

```yaml
budget_allocation:
  A_functional: "[X]%"
  B_emotional: "[Y]%"
  C_trust: "[Z]%"
  total: "100%"

  rationale: "[为什么这个配比]"
  adjustment_conditions: "[什么情况下调整]"
```

---

## 实验设计 (Experiments)

### 实验模板

```yaml
experiment_template:
  hypothesis: "[如果___，那么___，因为___]"
  change: "[单变量改变]"
  primary_metric: "[主指标]"
  guardrails: ["护栏指标1", "护栏指标2"]
  sample_size: "[样本量]"
  duration: "[周期]"
  stop_rule: "[停表条件]"
```

### 最小实验要求

| 类型 | 最小数量 | 说明 |
|------|----------|------|
| Top-2杠杆实验 | 2个 | 每个选中的杠杆做1个最小实验 |
| 峰值时刻实验 | 1个 | Peak-End的峰值触点 |
| 结尾时刻实验 | 1个 | Peak-End的结尾触点 |

### 实验包输出

```yaml
experiment_pack:
  experiments:
    - id: "EXP-001"
      type: "杠杆实验"
      lever: "[杠杆名称]"
      hypothesis: "..."
      change: "..."
      primary_metric: "..."
      guardrails: [...]
      stop_rule: "..."

    - id: "EXP-002"
      type: "峰值实验"
      moment: "[峰值时刻]"
      hypothesis: "..."
      change: "..."
      ...

  backlash_dashboard:
    metrics: ["退款率", "投诉率", "NPS", "负面舆情"]
    alert_thresholds: [...]
    escalation_path: "[升级路径]"
```

---

## 输出产物 (Deliverables)

### D1: Emotion Control Card

```yaml
emotion_control_card:
  company_brand: "[品牌名称]"
  category: "[品类]"
  as_of_date: "YYYY-MM-DD"

  top_needs:
    - need: "[需求1]"
      user_voice: "[用户想被如何看见]"
    - need: "[需求2]"
      user_voice: "..."

  top_levers:
    - lever: "[杠杆1]"
      touchpoint: "[触点]"
      expected_impact: "[预期影响]"
    - lever: "[杠杆2]"
      touchpoint: "..."

  key_touchpoint_redesign:
    - touchpoint: "[触点名称]"
      current_state: "[现状]"
      target_state: "[目标状态]"
      action: "[改造动作]"
```

### D2: Peak-End Plan

```yaml
peak_end_plan:
  peak_1:
    moment: "[时刻]"
    emotion_goal: "[情绪目标]"
    action: "[具体动作]"
    script: "[执行脚本/话术/流程]"
    observable: "[可观测信号]"

  peak_2:
    moment: "..."
    ...

  ending:
    moment: "..."
    ...
```

### D3: Persuasion Map

```yaml
persuasion_map:
  nodes:
    - node: "发现"
      principle: "[使用的原则]"
      evidence: "[真实证据]"
      fulfillment: "[兑现机制]"

    - node: "比较"
      ...

    - node: "下单"
      ...

    - node: "售后"
      ...
```

### D4: Experiment Pack

```yaml
experiment_pack:
  experiments: [...]  # 见上文模板
  stop_rules: [...]
  backlash_dashboard: {...}
```

### D5: Ethics Audit

```yaml
ethics_audit:
  deceptive_patterns_checklist:
    - pattern: "虚假稀缺"
      present: "[是/否]"
      evidence: "[证据]"
      fix: "[修复建议]"

    - pattern: "夸大恐惧"
      present: "[是/否]"
      evidence: "[证据]"
      fix: "[修复建议]"

    - pattern: "诱导沉迷"
      ...

    - pattern: "隐藏成本"
      ...

    - pattern: "强制续费"
      ...

  sensitive_population_check:
    underage_protection: "[是否有/措施]"
    elderly_protection: "[是否有/措施]"

  overall_risk_rating: "[低/中/高]"
  required_fixes: ["[修复项1]", "[修复项2]"]
```

---

## 与Agent架构的整合

### Brand Strategy 整合（主）

```yaml
brand_strategy_integration:
  capability: "brand_emotion_control"

  triggers:
    - "品牌情感设计"
    - "用户体验优化"
    - "转化率提升"
    - "情感营销策略"
    - "Peak-End设计"

  output_artifacts:
    - "emotion_control_card"
    - "peak_end_plan"
    - "persuasion_map"
    - "experiment_pack"
    - "ethics_audit"
```

### Research Mechanism 整合

```yaml
research_mechanism_integration:
  capability: "behavior_analysis"

  input_from_other_skills:
    - skill: "moat_evaluation"
      fields: ["brand_moat_signals"]
      usage: "品牌护城河评估输入"

  output_feeds_to:
    - skill: "valuation_engine"
      field: "brand_premium_assessment"
      usage: "品牌溢价估值输入"
```

### Quality Gate 整合

```yaml
quality_gate_integration:
  capability: "ethics_compliance_check"

  pass_conditions:
    - "6层模型完成"
    - "Ethics Audit无高风险项"
    - "实验有停表规则"

  degrade_conditions:
    - "部分层数据不足"
    - "Ethics Audit有中风险项"

  fail_conditions:
    - "Ethics Audit有高风险项"
    - "违反伦理红线"
```

---

## Contract Compliance v2.0

### Core Principles Alignment

| 原则 | 本Skill实现 |
|------|-------------|
| **Contract-first** | 6层模型 + 5个标准输出产物 |
| **Eval-first** | 三维评分体系 + 实验框架 |
| **SRE-first** | 停表规则 + 反噬仪表盘 + 伦理审计 |

### Claims Type Annotation (5类)

| 组件 | Claim类型 | 重要性 | 要求 |
|------|-----------|--------|------|
| L1需求排序 | CAUSAL_INFERENCE | critical | 需用户研究证据 |
| L2行为诊断 | CAUSAL_INFERENCE | critical | 需行为数据支撑 |
| L3记忆设计 | ACTION_RECOMMENDATION | critical | 需可执行方案 |
| L4说服结构 | CAUSAL_INFERENCE | supporting | 需真实证据 |
| 杠杆评分 | FACT_DESCRIPTIVE | supporting | 需评分明细 |
| 实验预测 | FORECAST | supporting | 需假设验证 |
| 伦理审计 | FACT_DESCRIPTIVE | critical | 需合规检查 |

### Evidence Registry (Dual Threshold)

```yaml
evidence_requirements:
  quantity_threshold:
    tier_1_min: 2  # 用户研究/行为数据至少2个
    total_min: 5   # 总证据≥5

  coverage_threshold:
    key_layers: ["L1_needs", "L2_behavior_gate", "L6_governance"]
    min_coverage: 0.67  # ≥2/3关键层有证据

  tiering:
    tier_1: "用户研究、行为数据、A/B测试结果"
    tier_2: "行业报告、竞品分析、专家访谈"
    tier_3: "案例参考、理论推断"
```

### Kill Switches

**Mandatory (3个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-EVIDENCE-FABRICATION | 证据造假/幻觉检测 | 3.0 | 任一需求/诊断无法溯源 |
| KS-TOOL-OVERREACH | 工具越权 | 3.0 | 调用未授权外部API |
| KS-HIGH-RISK-OUTPUT | 高风险输出 | 3.0 | 推荐违反伦理红线的杠杆 |

**Domain-Specific (5个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-BE-001 | 虚假稀缺检测 | 3.0 | 推荐使用假倒计时/假库存 |
| KS-BE-002 | 夸大恐惧检测 | 3.0 | 推荐恐惧诉求无应对方案 |
| KS-BE-003 | 诱导沉迷检测 | 3.0 | 推荐无限制随机奖励 |
| KS-BE-004 | 护栏触发 | 2.5 | 退款率/投诉率/NPS恶化 |
| KS-BE-005 | 承诺不可兑现 | 2.5 | 推荐超出交付能力的承诺 |

### Threat Model

```yaml
threat_model:
  risk_types:
    - "幻觉风险: 虚构用户需求或行为诊断"
    - "伦理风险: 推荐Dark Patterns"
    - "反噬风险: 忽视护栏指标"

  protection:
    - "L1需求必须有用户研究支撑"
    - "L6伦理审计强制执行"
    - "停表规则嵌入实验设计"

  content_zones:
    green: "需求分析、行为诊断"
    yellow: "杠杆推荐、实验设计"
    red: "涉及敏感人群的策略"
```

### Observability & Replay

```yaml
observability:
  run_id: "自动生成UUID"
  tool_calls: "记录所有数据获取"
  gate_scores: "记录6层完成状态"
  ethics_flags: "记录伦理检查结果"

replay:
  enabled: true
  inputs_logged: "brand_context, audience, journey, goal_metrics, constraints"
  outputs_logged: "完整5个产物"
```

### Budget

```yaml
budget:
  tokens:
    soft: 15000
    hard: 25000
    critical: 35000
  tool_calls:
    soft: 12
    hard: 20
  latency_ms:
    soft: 60000
    hard: 120000
```

### Quality Checks

```yaml
quality_checks:
  P0_blocking:
    - "6层模型完成"
    - "Ethics Audit完成"
    - "停表规则定义"
    - "无Kill Switch触发"

  P1_important:
    - "每层有证据支撑"
    - "实验数量≥4"
    - "A/B/C配比有依据"
    - "Top-2杠杆有评分"

  pass_rule: "P0: 100%, P1: ≥85%"

  hard_fail_triggers:
    - "推荐违反伦理红线的策略"
    - "无停表规则"
    - "任一Mandatory Kill Switch触发"
```

### Red Flags (Required)

```yaml
red_flags:
  - flag: "RF-BE-001"
    condition: "杠杆TrustRisk>3且无C层托底"
    action: "强制增加Certainty_Safety杠杆"

  - flag: "RF-BE-002"
    condition: "涉及敏感人群但无保护措施"
    action: "强制添加保护机制或放弃策略"

  - flag: "RF-BE-003"
    condition: "实验无护栏指标"
    action: "强制添加护栏或拒绝实验"

  - flag: "RF-BE-004"
    condition: "承诺超出交付能力"
    action: "调整承诺或提升交付能力"
```

### Falsification Design

```yaml
falsification:
  alternative_hypotheses:
    - "需求排序可能错误"
    - "行为卡点诊断可能偏差"
    - "杠杆效果可能被高估"

  sensitivity_tests:
    - "需求优先级调整对策略影响"
    - "A/B/C配比±10%对效果影响"
    - "护栏阈值±20%对停表判断影响"

  disconfirming_evidence_plan:
    - "实验后: 验证需求假设"
    - "季度: 复盘杠杆效果vs预期"
    - "持续: 监控护栏指标趋势"
```

### Eval & Regression

```yaml
eval:
  self_score:
    dimensions:
      - "6层模型完整性"
      - "伦理合规程度"
      - "实验可执行性"
    range: "[0, 1]"

  calibration_hook:
    trigger: "输出完成后"
    check: "策略效果vs预测回溯"

  golden_cases:
    - case: "高端消费品品牌"
      expected_top_needs: ["地位", "联结"]
      expected_abc_ratio: "C30%-A40%-B30%"

    - case: "功能性快消品"
      expected_top_needs: ["安全", "胜任"]
      expected_abc_ratio: "C20%-A60%-B20%"

    - case: "社交/内容平台"
      expected_top_needs: ["联结", "地位", "探索"]
      expected_abc_ratio: "C25%-A35%-B40%"
```

### Evaluation Alignment

| 维度 | 权重 | 本Skill评估点 |
|------|------|---------------|
| 深度 | 25% | 6层穿透至行为机制 |
| 证据 | 20% | 用户研究+行为数据支撑 |
| 可操作 | 25% | 实验可执行、停表规则明确 |
| 伦理 | 20% | Ethics Audit无高风险 |
| 一致性 | 10% | 层间逻辑一致 |

### DEGRADE Mode Playbook

```yaml
degrade_mode:
  triggers:
    - "部分层数据不足"
    - "Ethics Audit有中风险项"
    - "用户研究数据缺失"

  actions:
    - "输出标注: [DEGRADE] 分析受限"
    - "标注具体受限层"
    - "降低强刺激杠杆权重"

  recovery:
    - "补充用户研究"
    - "修复Ethics风险项"
    - "获取行为数据"
```

### Blackboard Outputs (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "brand_strategy.brand_emotion_control_v1.0"
    skill_version: "v1.0"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]

  extended_fields:
    top_needs: {type: "array", schema: "[{need, priority, user_voice}]"}
    behavior_gates: {type: "array", schema: "[{behavior, diagnosis, intervention}]"}
    peak_end_plan: {type: "object"}
    persuasion_map: {type: "array"}
    top_levers: {type: "array", schema: "[{lever, score, touchpoint}]"}
    abc_allocation: {type: "object", schema: "{A, B, C}"}
    experiments: {type: "array"}
    ethics_rating: {type: "enum", values: ["低风险", "中风险", "高风险"]}
```

---

**版本**: v1.0
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/brand_strategy/`
**状态**: 新建，v2.0合约兼容
