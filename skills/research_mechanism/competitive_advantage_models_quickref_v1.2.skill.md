# 公司竞争力底层模型速查 v1.0

> **Skill ID**: `research_mechanism.competitive_advantage_models_v1.0`
> **主路由**: Research Mechanism (90%)
> **辅助路由**: Quality Gate (证伪规则)
> **来源**: 公司竞争力底层模型速查.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

用**少量可复用模型**，快速判断公司优势来源（成本/需求/结构/治理/风险），并给出**可验证信号**与**反证路径**。

---

## 输入要求

```yaml
inputs:
  company_context:
    - 业务描述
    - 产品/服务
    - 客户画像
    - 渠道结构
    - 供应链布局
    - 竞争格局

  evidence:
    - 财报
    - 电话会纪要
    - 公告
    - 同行对比
    - 价格与份额数据
    - 用户与供给数据
```

---

## 输出格式

```yaml
output:
  models_hit:  # 命中的模型
    - model: "[模型ID]"
      name: "[模型名称]"
      strength: "[High/Med/Low]"
      rationale: "[命中理由]"

  signals:
    leading: "[领先信号列表]"
    lagging: "[滞后确认列表]"

  falsifiers:
    - path: "[最强反证路径]"
      warning_threshold: "[预警阈值]"
      current_status: "[当前状态]"
```

---

## 4步工作流

```
Step 1: 先结构
        五力 → 价值链 → 瓶颈
        定位利润池与议价权
              ↓
Step 2: 再机制
        网络/数据/学习曲线/范围经济/锁定
        找正反馈与路径依赖
              ↓
Step 3: 再兑现
        VRIO与治理
        确认"能否组织化变现"
              ↓
Step 4: 最后反证
        预先验尸 + FMEA
        列出最可能失败路径与预警信号
```

---

## 10个核心模型

### M1. 五力模型（行业结构）

**核心问题**：
> 利润池被谁分走？进入者/替代品/供方/买方/同业竞争哪一项最致命？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 毛利变化 | 毛利与费用率随周期/竞争如何变化 |
| 集中度 | 客户与供应商集中度趋势 |
| 替代威胁 | 替代路径出现速度 |

**证伪条件**：
- ❌ 行业长期价格战且无法差异化
- ❌ 关键上下游单点卡脖子且不可转移

**速查表**：
```
五力评分卡:
┌────────────────┬───────┬─────────────────────┐
│ 力量           │ 强度  │ 证据                │
├────────────────┼───────┼─────────────────────┤
│ 进入者威胁     │ H/M/L │                     │
│ 替代品威胁     │ H/M/L │                     │
│ 供应商议价力   │ H/M/L │                     │
│ 买方议价力     │ H/M/L │                     │
│ 同业竞争强度   │ H/M/L │                     │
└────────────────┴───────┴─────────────────────┘
利润池主要流向: _______________
```

---

### M2. 价值链 + 瓶颈（TOC）

**核心问题**：
> 价值链哪一段最稀缺/最难扩？公司是否控制瓶颈或关键接口？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 瓶颈位置 | 产能/交付/渠道/合规/数据获取成为"必经之路" |
| 瓶颈控制 | 扩张时瓶颈被公司优先满足 |
| 接口控制 | 控制关键接口可收"过路费" |

**证伪条件**：
- ❌ 瓶颈转移到对手可控环节
- ❌ 关键能力外包后被供应商抽走利润

**速查表**：
```
价值链瓶颈分析:

[上游] → [研发] → [生产] → [分销] → [零售] → [服务]
                      ↑
              瓶颈在哪一段？
              公司控制？ Y/N
              可扩展？   Y/N
```

---

### M3. 网络效应（平台飞轮）

**核心问题**：
> 用户/供给增加是否提升每个参与者价值？是否存在负网络效应？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 留存×规模 | 留存随规模上升 |
| 供给自增长 | 供给侧自发增长 |
| CAC下降 | 单位获客成本随规模下降 |
| 生态扩张 | 生态互补品增多 |

**证伪条件**：
- ❌ 规模变大但体验变差/劣币驱逐良币
- ❌ 多边无法同时增长（供需失衡）

**速查表**：
```
网络效应类型判断:

□ 直接网络效应（同侧用户互相增值）
  例：社交网络、通讯工具

□ 间接网络效应（跨边互相增值）
  例：平台市场、应用商店

□ 数据网络效应（用户贡献数据提升体验）
  例：推荐算法、地图导航

负网络效应风险: ______________
```

---

### M4. 数据闭环（Data → 体验 → Data）

**核心问题**：
> 数据是否"独占采集且可反馈改进"？对手能否购买/复制同等数据？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 效果提升 | 效果随使用量提升 |
| 模型领先 | 模型/风控/推荐领先对手 |
| 成本下降 | 数据获取成本随规模下降 |

**证伪条件**：
- ❌ 核心数据可被第三方同价提供
- ❌ 监管/隐私限制切断数据回路

**速查表**：
```
数据闭环诊断:

数据采集 → 模型训练 → 体验提升 → 更多使用 → 更多数据
    ↑                                           │
    └───────────────────────────────────────────┘

□ 数据独占性: H/M/L
□ 反馈周期: 实时/天/周/月
□ 对手可复制性: H/M/L
□ 监管风险: H/M/L
```

---

### M5. 学习曲线/经验曲线（越做越便宜）

**核心问题**：
> 累计交付/产量上升时，单位成本/工时/良率是否持续改善？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 毛利韧性 | 降价或ASP下行时毛利仍稳 |
| 良率爬坡 | 良率持续提升 |
| Capex效率 | 同等Capex产出提升 |
| 交付提速 | 交付周期缩短 |

**证伪条件**：
- ❌ 规模上去后边际成本反升
- ❌ 工艺/材料/能源成为硬约束且无替代

**速查表**：
```
学习曲线参数:

Wright's Law: 累计产量翻倍 → 成本下降___%

历史验证:
│ 累计产量 │ 单位成本 │ 下降幅度 │
├──────────┼──────────┼──────────┤
│ 1x       │ $___     │ baseline │
│ 2x       │ $___     │ -___%    │
│ 4x       │ $___     │ -___%    │

当前位置: 曲线早期/中期/成熟期
```

---

### M6. 范围经济（多业务协同）

**核心问题**：
> 同一渠道/研发/供应链/数据是否能低成本扩品类与场景？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 新品效率 | 新产品推出更快更省 |
| 交叉销售 | 交叉销售率提升 |
| 成本平台化 | 共享成本平台化（费用率下行） |

**证伪条件**：
- ❌ 协同承诺多但财务无体现
- ❌ 组织复杂度上升抵消协同

**速查表**：
```
范围经济评估:

共享资产清单:
□ 渠道: _______________ (复用率__%)
□ 研发: _______________ (复用率__%)
□ 供应链: _____________ (复用率__%)
□ 数据: _______________ (复用率__%)
□ 品牌: _______________ (复用率__%)

协同财务验证:
- 费用率趋势: ↑/↓/→
- 新品毛利 vs 老品毛利: ___
- 交叉销售收入占比: ___%
```

---

### M7. 交易成本（自制/外包/垂直整合）

**核心问题**：
> 资产专用性/不确定性/交易频率是否高到需要整合或强契约？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 整合效果 | 关键环节内化后交付/质量/成本更可控 |
| 供给优先 | 对关键输入有优先权与稳定供给 |

**证伪条件**：
- ❌ 整合后成本上升且协同失败
- ❌ 外部市场成熟使外包更优

**速查表**：
```
垂直整合决策矩阵:

              │ 低资产专用性 │ 高资产专用性
──────────────┼──────────────┼──────────────
低交易频率   │ 市场采购     │ 长期合同
高交易频率   │ 框架协议     │ 垂直整合 ←

公司当前位置: _______________
整合合理性:   H/M/L
```

---

### M8. VRIO（优势是否可持续）

**核心问题**：
> 该资源/能力是否：有价值V？稀缺R？难模仿I？组织能承接O？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 难复制 | 竞争对手难以复制的品牌/渠道/工艺/数据/合规能力 |
| 跨周期 | 优势跨周期仍有效 |

**证伪条件**：
- ❌ 优势可被资本堆出来
- ❌ 关键人才/渠道可被挖走或被平台替代

**速查表**：
```
VRIO评估矩阵:

资源/能力        │ V │ R │ I │ O │ 竞争优势类型
─────────────────┼───┼───┼───┼───┼────────────
[资源1]          │ Y │ Y │ Y │ Y │ 持续优势 ✓
[资源2]          │ Y │ Y │ Y │ N │ 未实现优势
[资源3]          │ Y │ Y │ N │ - │ 暂时优势
[资源4]          │ Y │ N │ - │ - │ 竞争均势
[资源5]          │ N │ - │ - │ - │ 竞争劣势

V=Valuable R=Rare I=Inimitable O=Organized
```

---

### M9. 定价权（价值定价+弹性）

**核心问题**：
> 公司赚钱靠成本低还是客户愿付更高？提价会不会伤量与留存？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 提价能力 | 提价后量稳 |
| 折扣依赖 | 折扣依赖低 |
| 定价工具 | 分层/捆绑/动态定价能力 |
| 留存强度 | NDR/续费强 |

**证伪条件**：
- ❌ 必须靠补贴/折扣维持
- ❌ 提价即流失
- ❌ 产品同质化导致价格跟随

**速查表**：
```
定价权诊断:

定价能力测试:
□ 过去3年提价次数: ___次
□ 提价后量变化: +__% / -__%
□ 提价后留存变化: +__% / -__%

定价策略:
□ 成本加成定价（弱）
□ 竞争对标定价（中）
□ 价值定价（强）

价格弹性估算: ___
```

---

### M10. 预先验尸 + FMEA（失败路径）

**核心问题**：
> 假设3年后失败，最可能5条路径是什么？每条的早期预警信号是什么？

**领先/滞后信号**：
| 信号类型 | 具体观测 |
|----------|----------|
| 单点故障 | 渠道/供应链/政策/融资/核心客户依赖 |
| 事件风险 | 质量/合规/安全事件 |

**证伪条件**：
- ❌ 任何一条失败路径出现"连续化证据"（而非一次性噪音）即下调结论

**速查表**：
```
预先验尸分析:

"假设3年后公司失败，最可能的5条路径是:"

│ # │ 失败路径           │ 概率 │ 早期预警信号        │ 当前状态 │
├───┼────────────────────┼──────┼─────────────────────┼──────────┤
│ 1 │                    │  %   │                     │ G/Y/R    │
│ 2 │                    │  %   │                     │ G/Y/R    │
│ 3 │                    │  %   │                     │ G/Y/R    │
│ 4 │                    │  %   │                     │ G/Y/R    │
│ 5 │                    │  %   │                     │ G/Y/R    │

FMEA矩阵:
严重度(S) × 发生率(O) × 可探测性(D) = 风险优先数(RPN)
```

---

## 输出规则

### 规则1: 每个结论必须双证
```
结论: [判断]
├── 最强支持证据: [具体数据/文件]
└── 最强反证路径: [如果___则结论失效]
```

### 规则2: 故事降级为假设
```
❌ "公司有强大的网络效应"
✓ "假设: 公司存在网络效应，待验证信号: 留存率随DAU增长而提升"
```

### 规则3: 只保留可观测信号
```
可观测清单:
- 价格变化
- 份额变化
- 留存率
- 成本曲线
- 交付数据
- 合同条款
- 治理动作
```

---

## 快速诊断模板

```yaml
# 公司竞争力底层模型速查结果

company: "[公司名称]"
date: "[分析日期]"

models_hit:
  - model: "M3"
    name: "网络效应"
    strength: "High"
    rationale: "[命中理由]"
    evidence: "[支持证据]"
    falsifier: "[反证路径]"

  - model: "M5"
    name: "学习曲线"
    strength: "Med"
    rationale: "[命中理由]"
    evidence: "[支持证据]"
    falsifier: "[反证路径]"

signals:
  leading:
    - "[领先信号1]"
    - "[领先信号2]"
  lagging:
    - "[滞后确认1]"
    - "[滞后确认2]"

top_3_falsifiers:
  - path: "[反证路径1]"
    threshold: "[预警阈值]"
    status: "G/Y/R"
  - path: "[反证路径2]"
    threshold: "[预警阈值]"
    status: "G/Y/R"
  - path: "[反证路径3]"
    threshold: "[预警阈值]"
    status: "G/Y/R"

verdict:
  primary_moat: "[主要护城河来源]"
  sustainability: "[High/Med/Low]"
  key_risk: "[最大风险]"
```

---

## 与Agent架构整合

### Research Mechanism 整合（主）

```yaml
research_mechanism_integration:
  capability: "competitive_advantage_models"

  triggers:
    - "分析竞争优势"
    - "护城河来源"
    - "模型速查"
    - "VRIO分析"
    - "五力分析"

  model_registry:
    - "M1_five_forces"
    - "M2_value_chain_toc"
    - "M3_network_effects"
    - "M4_data_loop"
    - "M5_learning_curve"
    - "M6_scope_economy"
    - "M7_transaction_cost"
    - "M8_vrio"
    - "M9_pricing_power"
    - "M10_premortem_fmea"

  output_rules:
    - "每个结论双证（支持+反证）"
    - "故事降级为假设"
    - "只保留可观测信号"
```

### Quality Gate 整合（辅）

```yaml
quality_gate_integration:
  capability: "model_falsification"

  validation_rules:
    - "每个命中模型必须有falsifier"
    - "falsifier必须有预警阈值"
    - "连续化证据触发结论下调"
```

---

## Contract Compliance v2.0

> 本节确保skill输出符合 `skills/_common/skill_design_standard_v2.0.yaml`

### 核心原则对齐 (Core Principles)

```yaml
core_principles_alignment:
  contract_first:
    input_validation: "公司上下文 + 证据完整性检查"
    workflow: "4步工作流(结构→机制→兑现→反证)"
    output_schema: "models_hit + signals + falsifiers"
    quality_gates: "PASS/DEGRADE/FAIL三态"

  eval_first:
    golden_cases: "3个案例(强护城河/弱护城河/数据不足)"
    scorers: "模型命中准确率 + falsifier质量"

  sre_first:
    degrade_path: "标记无法评估的模型"
    fast_close: "限制到可评估模型"
```

### 声明类型 (5-Type Claims)

| 输出组件 | 类型 | 重要性 | 特殊要求 |
|----------|------|--------|----------|
| 领先信号观测 | **FACT_DESCRIPTIVE** | supporting | min_evidence_tier: 1 |
| 模型命中判断 | **CAUSAL_INFERENCE** | critical | 必须列替代假说 |
| 可持续性判断 | **FORECAST** | critical | 必须做敏感性测试 |
| Falsifier | **CAUSAL_INFERENCE** | critical | 必须有阈值 |
| 投资建议 | **ACTION_RECOMMENDATION** | optional | min_evidence_tier: 2 |

### 证据注册表 (Dual Threshold)

```yaml
evidence_registry:
  tier_thresholds:
    quantity_threshold:
      tier_1_minimum: 2
    coverage_threshold:
      tier_1_covers_key_nodes: "≥50%"
      key_nodes: ["模型命中判断", "领先信号", "滞后确认", "falsifier"]
```

### Kill Switches (3 Mandatory + Domain-Specific)

```yaml
kill_switches:
  mandatory:
    - id: "KS-EVIDENCE-FABRICATION"
      condition: "编造证据数据"
      action: "FAIL"
    - id: "KS-TOOL-OVERREACH"
      action: "FAIL"
    - id: "KS-HIGH-RISK-OUTPUT"
      condition: "无falsifier的强断言"
      action: "FAIL"

  domain_specific:
    - id: "KS-MODEL-001"
      condition: "任一falsifier连续化证据出现"
      action: "DEGRADE + 下调结论"
```

### 威胁模型 + 可观测性 + 预算

```yaml
threat_model:
  risks:
    confirmation_bias: "只找支持模型的证据"
    detection: "强制双证(支持+反证)"

observability:
  required_fields: [run_id, skill_version, gate_scores]
  metrics: [model_accuracy, falsifier_quality]

budget:
  token_budget: {soft: 4000, hard: 7000, critical: 10000}
  tool_call_budget: {soft: 5, hard: 10, critical: 15}
```

### 质量检验 + 证伪设计

```yaml
quality_checks:
  hard_fail_triggers:
    - "模型命中无falsifier"
    - "无双证(支持+反证)"
  scoring:
    PASS: {p0: "100%", p1: "≥85%"}

falsification:
  basic_requirements:
    falsifier_per_claim: true
    premortem: "假设3年后判断错误，最可能路径？"
  advanced_requirements:
    alternative_hypotheses:
      required_for: ["CAUSAL_INFERENCE"]
    disconfirming_evidence_plan:
      where_to_look: ["竞品数据", "渠道反馈", "财务变化"]
```

### 评估与回归 + 评估对标

```yaml
eval_regression:
  self_score:
    dimensions: {G1: "4步完成度", E1: "双证质量", K1: "falsifier定义"}
  calibration:
    golden_cases:
      - {case_id: "GC-MODEL-001", input: "网络效应公司", expected: "M3命中"}

evaluation_alignment:
  standard_version: "agent_evaluation_standard_v1.1"
  dimension_coverage: {G1: "4步工作流", E1: "双证规则", K1: "falsifier"}
```

### Blackboard输出字段 (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "research_mechanism.competitive_advantage_models_v1.2"
    verdict: "PASS | DEGRADE | FAIL"
    key_claims: ["模型命中结果"]

  extended_fields:
    models_hit: {type: "array", schema: "[{model_id, strength, evidence, falsifier}]"}
    primary_moat_source: {type: "string"}
    moat_sustainability: {type: "enum", values: ["High", "Med", "Low"]}
    top_falsifiers: {type: "array"}
```

---

**版本**: v1.2
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已升级到v2.0合规
