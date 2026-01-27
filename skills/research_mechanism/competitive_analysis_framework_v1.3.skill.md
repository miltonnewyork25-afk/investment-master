# 竞争力分析框架 v1.3

> **Skill ID**: `research_mechanism.competitive_analysis_v1.3`
> **主路由**: Research Mechanism (80%)
> **辅助路由**: Ecosystem Graph (竞争生态映射)
> **来源**: 竞争力分析框架skill.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

通用竞争分析闭环：边界→结构→量化→动态博弈→高维替代/包裹→可持续优势→EWS监控；输出可审计结论与可推翻条件。

---

## 输入要求

| 代码 | 输入项 | 说明 |
|------|--------|------|
| I | 行业定义 | A狭义 / B广义 / 系统市场 |
| G | 地域/客户/渠道 | 市场边界划定 |
| T | 时间范围 | 过去X年 + 未来2-8季 |
| P | 玩家清单 | 同行/进入者/替代/平台/互补/监管 |
| D | 数据维度 | 份额/价格/成本/产能/合同/流量/注意力/数据/财报/并购 |

---

## 11步分析工作流

### S1. 边界重构

**方法论**：
- **SSNIP测试**：小幅持久涨价(5-10%)后需求转移程度
- **SSNDQ测试**：零价产品用质量降级测试（适用于广告支持模式）

**关键质量维度识别**：
```yaml
quality_dimensions:
  - privacy: "隐私保护程度"
  - ad_load: "广告负载"
  - matching: "匹配质量"
  - moderation: "内容审核"
  - latency: "响应延迟"
  - reliability: "服务可靠性"
```

**市场结构识别**：
- 生态/簇群市场
- 主产品-次产品-后市场关系
- 捆绑/锁定/转换成本

---

### S2. 结构取证（五力2.0）

**进入/退出壁垒清单**：

| 壁垒类型 | 描述 | 量化指标 |
|----------|------|----------|
| 沉没成本 | 不可回收的初始投资 | 固定资产专用性比例 |
| 规模学习 | 累计产量带来的成本优势 | 学习曲线斜率 |
| 渠道锁定 | 排他性分销协议 | 独占渠道占比 |
| 许可壁垒 | 监管准入门槛 | 牌照获取难度/时间 |
| 切换成本 | 用户迁移代价 | 迁移用户流失率 |
| 多归属成本 | 同时使用多平台的摩擦 | 多归属用户比例 |
| 数据闭环冷启动 | 需要数据才能提供服务 | 冷启动所需数据量 |

**五力评估矩阵**：

```yaml
five_forces_2_0:
  entry_threat:
    score: "[0-5]"
    key_barriers: ["列出主要壁垒"]

  supplier_power:
    score: "[0-5]"
    concentration: "供应商集中度"
    switching_cost: "切换成本"

  buyer_power:
    score: "[0-5]"
    concentration: "买方集中度"
    price_sensitivity: "价格敏感度"

  complementor_power:  # 五力扩展
    score: "[0-5]"
    dependency: "互补品依赖度"

  substitute_threat:
    score: "[0-5]"
    functional_overlap: "功能重叠度"

  rivalry_intensity:
    score: "[0-5]"
    homogeneity: "产品同质化程度"
    transparency: "价格透明度"
    exit_barriers: "退出壁垒"
    tipping_point: "倾覆点距离"
```

---

### S3. 可竞争性分析

**核心问题**：市场是否"可竞争"？即使只有少数玩家，潜在进入威胁是否足以约束定价？

**沉没成本代理变量**：

| 变量 | 新进入者 | 在位者 | 不对称性 |
|------|----------|--------|----------|
| 专用资产投资 | $ | $ | 差异说明 |
| 合同锁定期 | 月 | 月 | |
| 不可转移投放 | $ | $ | |
| 专有数据资产 | 规模 | 规模 | |
| 合规沉没成本 | $ | $ | |

**"打了就走"可行性**：
```
contestability_score = 1 / (sunk_cost_ratio × asset_specificity)
如果 score > 0.7: 高度可竞争
如果 score 0.3-0.7: 中度可竞争
如果 score < 0.3: 低度可竞争（结构性护城河）
```

---

### S4. 量化实证

**市场集中度**：

| 指标 | 计算 | 阈值解读 |
|------|------|----------|
| HHI | Σ(份额²) × 10000 | <1500低集中, 1500-2500中, >2500高 |
| CR4 | Top4份额之和 | <40%竞争性, 40-60%寡头, >60%高度集中 |

**市场权力指标**：

```yaml
market_power_metrics:
  gross_margin: "毛利率 vs 行业均值"
  contribution_margin: "贡献毛利 = 收入 - 变动成本"
  unit_economics:
    revenue_per_unit: "$"
    cost_per_unit: "$"
    margin_per_unit: "$"

  lerner_index: "(P - MC) / P"  # 近似值用毛利率

  ltv_cac:
    ltv: "客户生命周期价值"
    cac: "获客成本"
    ratio: "LTV/CAC > 3为健康"

  tobin_q: "市值 / 重置成本"  # >1表示无形资产溢价
```

**利润池拆解**：
```
价值链环节: [研发] → [生产] → [分销] → [零售] → [服务]
利润占比:    [__]%   [__]%    [__]%    [__]%    [__]%
关键问题: 谁拿走了利润？为什么？趋势如何？
```

---

### S5. 竞争维度画布

**价值曲线对比**：

```
维度          在位者A  在位者B  新入者C  平台捆绑D  本公司
─────────────────────────────────────────────────────
价格           ████     ███      █████    ████      ███
性能           █████    ████     ███      ███       ████
体验           ████     ███      ████     █████     ████
集成度         ███      ██       ██       █████     ███
交付速度       ████     ████     ███      █████     ████
合规性         █████    █████    ██       ████      ████
生态丰富度     ████     ███      █        █████     ███
可得性         ███      ████     █████    ████      ████
```

**竞争焦点升维判断**：
- [ ] 仍在产品层面竞争
- [ ] 已升维到入口控制
- [ ] 已升维到系统/生态控制
- [ ] 已升维到分销渠道控制

---

### S6. 动态博弈

**武器库清单**：

| 武器 | 攻击方 | 防守方 | 代价 | 可持续性 |
|------|--------|--------|------|----------|
| 价格战 | | | | |
| 产能扩张 | | | | |
| 补贴烧钱 | | | | |
| 捆绑销售 | | | | |
| 渠道封锁 | | | | |
| 诉讼/游说 | | | | |
| 并购整合 | | | | |
| 创新突破 | | | | |

**价格战触发条件**：
```yaml
price_war_triggers:
  demand_shock: "需求突然下降"
  overcapacity: "产能过剩程度"
  homogenization: "产品同质化"
  high_exit_barriers: "退出成本高导致死撑"
  misperception: "对竞争对手成本/意图误判"
```

**协同/克制机制**：
- 默契定价条件
- 算法协同风险（监管关注）
- 多市场接触(MMC)的相互克制
- **崩盘条件**：什么情况下协同会瓦解？

---

### S7. 高维竞争

**替代地图**：

```
替代层级        替代品             威胁程度    时间窗口
──────────────────────────────────────────────────
功能替代        [直接竞品]         █████      现在
工作流替代      [解决同一任务]     ████       1-2年
注意力替代      [争夺同一时间]     ███        持续
平台包裹        [被大平台整合]     █████      2-3年
```

**平台包裹类型**：
- **互补型**：平台需要你，共生关系
- **弱替代型**：平台可以做但做不好
- **功能降维风险**：你的产品变成平台的一个feature

**颠覆诊断**：

| 颠覆类型 | 信号 | 当前状态 | 证伪规则 |
|----------|------|----------|----------|
| 低端颠覆 | 低价玩家份额增长 | | 如果___则不成立 |
| 新市场颠覆 | 非消费者开始使用 | | 如果___则不成立 |
| 上移威胁 | 低端玩家性能提升 | | 如果___则不成立 |

---

### S8. 可持续优势

**VRIO/VRIN评估**：

| 资源/能力 | V有价值 | R稀缺 | I难模仿 | N不可替代 | O组织化 | 结论 |
|-----------|---------|-------|---------|-----------|---------|------|
| 资源1 | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | 竞争优势类型 |
| 资源2 | | | | | | |

**不可模仿来源拆解**：

```yaml
imitation_barriers:
  path_dependency: "历史路径依赖"
  causal_ambiguity: "因果关系模糊"
  complementary_complexity: "互补资产复杂性"
  scale_learning: "规模学习曲线"
  network_effects: "网络效应强度"
  data_loop: "数据闭环壁垒"
  regulatory_license: "监管许可稀缺性"
  organizational_capability: "组织能力嵌入度"
```

**护城河断言格式**：

```
护城河断言: [具体表述]
来源: [≥3个不可模仿来源]
验证KPI: [4-8季可观测指标]
阈值: [具体数字]
可推翻条件: 如果[KPI]连续[N]季低于[阈值]，则护城河断言失效
```

---

### S9. EWS预警仪表盘

**领先信号**：

| 信号 | 当前值 | 趋势 | 触发阈值 | 结论可推翻条件 |
|------|--------|------|----------|----------------|
| 市场份额 | | ↑↓→ | | |
| 用户留存率 | | | | |
| 多归属比例 | | | | |
| 质量事件后流失 | | | | |
| 渠道条款恶化 | | | | |
| 竞品上移速度 | | | | |
| 监管风向 | | | | |

**滞后信号**：

| 信号 | 当前值 | 趋势 | 触发阈值 | 结论可推翻条件 |
|------|--------|------|----------|----------------|
| 价格/ASP | | | | |
| 毛利率 | | | | |
| 获客效率(CAC) | | | | |
| 产能利用率 | | | | |

---

### S10. 分层与迁移

**市场分层地图**：

```
          │ 既有市场          │ 新市场
──────────┼───────────────────┼──────────────
高端      │ [玩家/份额]       │ [机会/威胁]
──────────┼───────────────────┼──────────────
主流      │ [玩家/份额]       │ [机会/威胁]
──────────┼───────────────────┼──────────────
低端      │ [玩家/份额]       │ [机会/威胁]
```

**迁移路径标注**：
- 上移路径: [描述] → 触发器: [条件] → 证伪: [如果___]
- 降维路径: [描述] → 触发器: [条件] → 证伪: [如果___]
- 后市场扩张: [描述] → 触发器: [条件] → 证伪: [如果___]

---

### S11. 取证手段

**冲击/事件分析法**：

利用外生冲击观察真实竞争弹性：

| 事件类型 | 具体事件 | 观察指标 | 发现 |
|----------|----------|----------|------|
| 质量事故 | | Switching率变化 | |
| 产品改版 | | 留存率变化 | |
| 监管冲击 | | 份额弹性 | |
| 供给冲击 | | 价格传导 | |

**三角核验**：
- 前后对比: 事件前vs事件后
- 对照组: 受影响vs未受影响群体
- 交叉市场: 不同地区/细分的对比

**产出**: 可审计证据点，标注证据强度(A/B/C)

---

## 输出模板

### 结论卡

```yaml
conclusion_card:
  endpoint_2x2:
    scenarios:
      - name: "情景1"
        probability: "%"
        description: ""
      - name: "情景2"
        probability: "%"
        description: ""
    triggers: ["触发条件列表"]

  scores:
    structure: "[0-5] 市场结构对公司有利程度"
    market_power: "[0-5] 市场权力强度"
    dynamic_position: "[0-5] 动态博弈位置"
    high_dimension: "[0-5] 高维竞争防御力"
    moat: "[0-5] 护城河可持续性"
    total: "[0-25]"
```

### 证据/反证清单

| 论点 | 支持证据 | 反对证据 | 证据强度 | 净判断 |
|------|----------|----------|----------|--------|
| | | | A/B/C | |

### 监控项

**加剧信号(≥5项)**：
1.
2.
3.
4.
5.

**缓和信号(≥5项)**：
1.
2.
3.
4.
5.

---

## 结论书写规则

**每条结论必须包含**：

```
结论: [具体判断]
依据: [支撑数据/逻辑]
假设: [隐含前提]
反例: [已知的反面证据]
可推翻条件: 如果[具体可观测事件]发生，则此结论失效
下一季验证指标: [具体KPI及阈值]
```

**禁止**：编造数据、无依据断言、不可证伪的结论

---

## 科技平台专用模块 [v1.3新增]

### S12. AI能力对比分析 (AI Capability Comparison)

**适用于**: Google/Microsoft/Meta/Amazon/OpenAI/Anthropic等AI相关公司

```yaml
ai_capability_comparison:
  model_benchmarks:
    metrics:
      - benchmark: "MMLU"
        description: "多任务语言理解"
        leader: "[公司]"
        scores: {company_a: X, company_b: X}

      - benchmark: "HumanEval"
        description: "代码生成"
        leader: "[公司]"
        scores: {company_a: X, company_b: X}

      - benchmark: "Arena ELO"
        description: "人类偏好排名"
        leader: "[公司]"
        scores: {company_a: X, company_b: X}

  enterprise_adoption:
    metrics:
      - ai_arr: "AI相关ARR"
      - enterprise_customers: "企业客户数"
      - api_volume: "API调用量"
    comparison_table: |
      | 公司 | AI ARR | 企业客户 | YoY增速 |
      |------|--------|----------|---------|
      | ... | ... | ... | ... |

  developer_ecosystem:
    metrics:
      - github_stars: "开源项目Star"
      - sdk_downloads: "SDK下载量"
      - mindshare: "开发者心智份额"

  scoring:
    "+2": "全面领先（≥3维度领先）"
    "+1": "部分领先（1-2维度领先）"
    "0": "竞争持平"
    "-1": "部分落后"
    "-2": "全面落后"
```

### S13. 芯片战略对比分析 (Chip Strategy Comparison)

**适用于**: 有自研芯片或重度依赖AI芯片的公司

```yaml
chip_strategy_comparison:
  self_developed:
    chips:
      - name: "芯片名称"
        company: "公司"
        purpose: "训练/推理/通用"
        performance: "性能指标"
        cost_advantage: "成本优势vs NVIDIA"

    examples:
      - {chip: "TPU v5p", company: "Google", purpose: "训练+推理", advantage: "44% TCO"}
      - {chip: "Trainium", company: "AWS", purpose: "训练", advantage: "30% TCO"}
      - {chip: "Dojo", company: "Tesla", purpose: "FSD训练", advantage: "TBD"}

  nvidia_dependency:
    metrics:
      - gpu_procurement: "年GPU采购量"
      - supply_priority: "供应优先级"
      - cost_exposure: "成本敞口"

    comparison: |
      | 公司 | NVIDIA依赖度 | 自研进度 | 供应安全 |
      |------|-------------|---------|---------|
      | Google | 低(TPU主导) | 领先 | 高 |
      | Microsoft | 高 | 起步(Maia) | 中 |
      | Meta | 高 | 开发中 | 中 |
      | OpenAI | 极高 | 无 | 低 |

  scoring:
    "+2": "自研芯片成熟，NVIDIA依赖低"
    "+1": "自研进行中，部分成本优势"
    "0": "依赖NVIDIA但供应安全"
    "-1": "高度依赖NVIDIA"
    "-2": "供应链风险高"

  investment_implications:
    - "自研芯片公司：长期成本优势，毛利率提升潜力"
    - "NVIDIA依赖公司：关注供应协议和成本转嫁能力"
    - "芯片供应商：关注客户自研进度对需求的影响"
```

### 科技平台竞争分析模板

```yaml
tech_platform_template:
  required_modules:
    - "S1-S11: 通用竞争分析"
    - "S12: AI能力对比"
    - "S13: 芯片战略对比"
    - "network_effect_evaluator: 网络效应评估"
    - "data_moat_quantifier: 数据护城河量化"
    - "platform_portfolio_matrix: 平台组合分析"

  output_format:
    competitive_scorecard: |
      | 维度 | 公司A | 公司B | 公司C | 领先者 |
      |------|-------|-------|-------|--------|
      | AI模型能力 | X | X | X | ... |
      | 企业AI采用 | X | X | X | ... |
      | 开发者生态 | X | X | X | ... |
      | 芯片战略 | X | X | X | ... |
      | 数据护城河 | X | X | X | ... |
      | 网络效应 | X | X | X | ... |
      | 综合竞争力 | X | X | X | ... |
```

---

## 与Agent架构整合

### Research Mechanism 整合

```yaml
research_mechanism_integration:
  capability: "competitive_analysis"

  triggers:
    - "分析竞争格局"
    - "评估护城河"
    - "市场结构分析"
    - "五力分析"

  output_fields:
    - "market_structure": "HHI/CR4/集中度"
    - "competitive_position": "五力评分"
    - "moat_assessment": "VRIO评估结果"
    - "ews_dashboard": "预警指标清单"
```

### Ecosystem Graph 整合

```yaml
ecosystem_graph_integration:
  capability: "competitive_mapping"

  node_types:
    - "competitor"
    - "substitute"
    - "complementor"
    - "platform"
    - "regulator"

  edge_types:
    - "competes_with"
    - "substitutes"
    - "complements"
    - "wraps/bundles"
    - "regulates"
```

---

## Contract Compliance v2.0

> 本节确保skill输出符合 `skills/_common/skill_design_standard_v2.0.yaml`

### 核心原则对齐 (Core Principles)

```yaml
core_principles_alignment:
  contract_first:
    input_validation: "行业定义(I) + 地域(G) + 时间(T) + 玩家(P) + 数据(D)"
    workflow: "11步工作流(S1-S11)"
    output_schema: "结论卡 + 证据清单 + 监控项"
    quality_gates: "PASS/DEGRADE/FAIL三态"

  eval_first:
    golden_cases: "3个案例(高集中/低集中/数据不足)"
    scorers: "5维度评分准确率 + EWS触发准确率"

  sre_first:
    degrade_path: "标记不完整步骤"
    fast_close: "限制到S1-S4核心步骤"
```

### 声明类型 (5-Type Claims)

| 输出组件 | 类型 | 重要性 | 特殊要求 |
|----------|------|--------|----------|
| HHI/CR4 | **FACT_DESCRIPTIVE** | supporting | min_evidence_tier: 1 |
| 五力评分 | **CAUSAL_INFERENCE** | critical | 必须列替代解释 |
| 护城河断言 | **CAUSAL_INFERENCE** | critical | 必须有可推翻条件 |
| EWS预警 | **FORECAST** | supporting | 必须有阈值 |
| 终局情景 | **FORECAST** | optional | 必须做敏感性测试 |
| 投资建议 | **ACTION_RECOMMENDATION** | optional | min_evidence_tier: 2 |

### 证据注册表 (Dual Threshold)

```yaml
evidence_registry:
  tier_thresholds:
    quantity_threshold: {tier_1_minimum: 2}
    coverage_threshold:
      tier_1_covers_key_nodes: "≥50%"
      key_nodes: ["市场边界", "五力评估", "护城河断言", "EWS"]
```

### Kill Switches (3 Mandatory + Domain-Specific)

```yaml
kill_switches:
  mandatory:
    - id: "KS-EVIDENCE-FABRICATION"
      condition: "编造市场数据"
      action: "FAIL"
    - id: "KS-TOOL-OVERREACH"
      action: "FAIL"
    - id: "KS-HIGH-RISK-OUTPUT"
      condition: "结论无可推翻条件"
      action: "FAIL"

  domain_specific:
    - id: "KS-COMP-001"
      condition: "市场边界无法定义"
      action: "FAIL"
    - id: "KS-COMP-002"
      condition: "EWS触发阈值突破"
      action: "DEGRADE + 重新评估"
```

### 威胁模型 + 可观测性 + 预算

```yaml
threat_model:
  risks:
    boundary_manipulation: "操纵市场边界以支持结论"
    detection: "SSNIP测试验证"

observability:
  required_fields: [run_id, skill_version, gate_scores]
  metrics: [five_forces_accuracy, ews_trigger_rate]

budget:
  token_budget: {soft: 8000, hard: 12000, critical: 18000}
  tool_call_budget: {soft: 10, hard: 15, critical: 25}
```

### 质量检验 + 证伪设计

```yaml
quality_checks:
  hard_fail_triggers:
    - "市场边界无法定义"
    - "结论无可推翻条件"
    - "监控项<10"
  scoring:
    PASS: {p0: "100%", p1: "≥85%"}

falsification:
  basic_requirements:
    falsifier_per_claim: true
    premortem: "假设3年后竞争判断错误，最可能路径？"
  advanced_requirements:
    alternative_hypotheses:
      required_for: ["CAUSAL_INFERENCE"]
    disconfirming_evidence_plan:
      where_to_look: ["竞品动态", "监管变化", "技术替代"]
```

### 评估与回归 + 评估对标

```yaml
eval_regression:
  self_score:
    dimensions: {G1: "11步完成度", E1: "证据质量", K1: "EWS定义"}
  calibration:
    golden_cases:
      - {case_id: "GC-COMP-001", input: "高集中行业", expected: "HHI>2500"}

evaluation_alignment:
  standard_version: "agent_evaluation_standard_v1.1"
  dimension_coverage: {G1: "11步工作流", E1: "取证手段S11", K1: "可推翻条件"}
```

### Blackboard输出字段 (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "research_mechanism.competitive_analysis_v1.3"
    verdict: "PASS | DEGRADE | FAIL"
    key_claims: ["竞争格局评估"]

  extended_fields:
    market_structure: {type: "object", schema: "{hhi, cr4}"}
    five_forces_scores: {type: "object"}
    moat_assertions: {type: "array"}
    ews_dashboard: {type: "object", schema: "{leading[], lagging[]}"}
    competitive_verdict: {type: "object", schema: "{structure, power, dynamic, high_dim, moat, total}"}
```

---

**版本**: v1.3
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已升级到v2.0合规

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-01-27 | 初始版本 |
| v1.2 | 2026-01-27 | 升级到v2.0合约合规 |
| v1.3 | 2026-01-27 | 新增S12 AI能力对比、S13芯片战略对比、科技平台专用模板 |
