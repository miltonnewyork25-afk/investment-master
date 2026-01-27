# Quality Gate v1.0 - 输出前强制质量检查

## 设计原则

这不是"建议"，而是**硬性门控**。报告在通过所有检查前不能输出。

---

## 三层质量检查

### Layer 1: 数据真实性检查（不可绕过）

```yaml
data_integrity:
  rules:
    - name: "无来源数据禁止使用"
      check: "每个具体数字必须有明确来源（API调用/搜索结果/财报引用）"
      violation_action: "删除该数据或标注'待验证'"

    - name: "禁止编造"
      check: "不能出现'据估计'、'大约'等模糊表述用于关键数据"
      violation_action: "要么获取真实数据，要么明确标注假设"

    - name: "时效性标注"
      check: "报告开头必须标注数据截止日期"
      violation_action: "添加标注"

  自检问题:
    - "报告中是否有任何数字是我'凭印象'写的？"
    - "如果用户追问某个数据的来源，我能立即提供吗？"
    - "是否有使用过时数据（>6个月）却未标注？"
```

### Layer 2: 深度验证检查（核心）

```yaml
depth_verification:

  rule_1_analyst_learning:
    required: true
    check: |
      - 是否搜索了至少5位分析师？
      - 是否有"顶级分析师观点全景"表格？
      - 是否学习了他们的方法论（不只是目标价）？
      - 是否识别了他们的盲区？
    failure_mode: "跳过此步骤会导致分析成为'自说自话'"

  rule_2_evidence_chain:
    required: true
    check: |
      对每个核心判断，验证：
      - 是否有≥2个独立证据支撑？
      - 证据是否来自不同来源（交叉验证）？
      - 是否说明了证据的局限性？
    failure_mode: "单一来源=脆弱判断"

  rule_3_mechanism_not_data:
    required: true
    check: |
      - 是否解释了"为什么"而不只是"是什么"？
      - 是否有因果链分析？
      - 是否到达了Level 3（机制层）或更深？
    failure_mode: "数据罗列=零价值"

  rule_4_counter_argument:
    required: true
    check: |
      - 每个关键判断是否有"但如果___则不成立"？
      - 是否认真考虑了相反观点？
      - 是否有Kill Switch？
    failure_mode: "没有反证=盲目自信"

  depth_scoring:
    level_1_surface: "只有结论，无支撑" → 0分
    level_2_data: "有数据，无解释" → 40分
    level_3_mechanism: "有因果链，有交叉验证" → 70分
    level_4_insight: "有反常识洞察，有预测价值" → 90分

    minimum_passing_score: 70
    target_score: 85
```

### Layer 3: 输出质量检查

```yaml
output_quality:

  word_count:
    minimum: 25000  # 字符数，非word count
    note: "字数是下限，不是目标。写够字数但内容空洞=失败"

  structure_completeness:
    required_sections:
      - "执行摘要（含Kill Switch）"
      - "分析师观点全景表"
      - "市场分歧表"
      - "核心命题回答（每个≥3000字符）"
      - "单位经济学"
      - "估值（多场景+敏感性）"
      - "反常识洞察（≥3个）"

  anti_patterns:
    - pattern: "大量bullet points堆砌"
      problem: "通常意味着没有深入思考"

    - pattern: "过多框架名称暴露"
      problem: "形式主义，用框架填充内容"

    - pattern: "数据罗列无分析"
      problem: "没有回答'so what'"
```

---

## 执行协议

### 输出前必须执行

```
步骤1：数据真实性自检
├── 逐一检查每个具体数字的来源
├── 标记任何"不确定"的数据
└── 决定：删除/标注/验证

步骤2：深度评分
├── 对每个核心命题打分（0-100）
├── 计算平均分
└── 如果 < 70分 → 返回深化该部分

步骤3：输出质量检查
├── 检查必需章节是否完整
├── 检查是否有anti-pattern
└── 确认字数达标

步骤4：最终决策
├── 全部通过 → 输出
└── 任一失败 → 修正后重新检查
```

### 失败处理

```yaml
on_failure:
  data_integrity_failure:
    action: "不能输出，必须获取真实数据或明确标注假设"

  depth_score_below_70:
    action: "返回该命题，添加更多证据链和机制分析"

  missing_required_section:
    action: "补充该章节"

  anti_pattern_detected:
    action: "重写该部分，避免堆砌"
```

---

## 与迭代循环的集成

### 如何与Ralph Loop（或类似迭代机制）集成

```
迭代循环设计：

Round 1: 数据收集 + 初步分析
├── 调用所有P0数据源
├── 搜索分析师观点
└── 产出初稿（可能不达标）

Round 2: 质量检查 + 深化
├── 运行Quality Gate检查
├── 识别低分部分
└── 针对性深化

Round 3: 反思 + 精炼
├── 检查是否有编造数据
├── 检查反常识洞察是否真正"反常识"
└── 最终输出

每轮之间的检查点：
- Round 1 → 2: 数据完整性验证
- Round 2 → 3: 深度评分≥70
- Round 3 → 输出: 全部检查通过
```

---

## 关键指标定义

### 什么是"真正的深度"

```
NOT 深度:
- "Tesla 2025年收入增长12%" ← 这是数据陈述
- "FSD v14已部署" ← 这是新闻

IS 深度:
- "Tesla收入增长12%但应收账款增长42%，说明部分收入可能来自
   渠道压货或信用销售放松，盈利质量存疑" ← 这是分析

- "FSD v14的干预率从441英里提升至9200英里，20x改进。但要达到
   unsupervised标准（行业共识100,000英里），按当前改进速度
   还需要1-2个版本迭代，预计时点2027年。这与市场隐含的2026年
   预期存在12-18个月的时间差，是估值风险的核心来源" ← 这是深度分析
```

### 什么是"反常识洞察"

```
NOT 反常识:
- "Tesla是电动车龙头" ← 常识
- "Robotaxi有巨大潜力" ← 共识

IS 反常识:
- "Tesla卖车的真正目的可能不是赚钱，而是收集数据。
   汽车业务亏损可能是'买数据'的合理成本" ← 改变了理解框架

- "Musk的政治风险可能被高估。他的政治影响力带来的
   监管利好价值可能超过品牌损伤" ← 挑战主流叙事
```

---

## 版本信息

- **版本**: v1.0
- **创建日期**: 2026-01-27
- **设计原则**: 简单、强制、可验证
