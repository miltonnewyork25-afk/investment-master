# 战略远见分析框架 (Systemic Foresight) v1.0

> **Skill ID**: `research_mechanism.systemic_foresight_v1.0`
> **主路由**: Research Mechanism (50%)
> **辅助路由**: Ecosystem Graph (20%), Valuation Engine (15%), Quality Gate (15%)
> **来源**: systemic-foresight战略远见skill.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

对公司/平台进行**多层战略分析**，从飞轮机制到实物期权，输出：
1. 战略引擎映射（飞轮+产品系统图+能力审计）
2. 未来风险审计（期权树+生态依赖+鸿沟分析）
3. 物理与执行验证（成本曲线+架构设计+资本对齐）
4. 论点综合（里程碑账本+红队证伪+监控触发）

---

## 核心约定 (Conventions)

### 证据分类

| 等级 | 名称 | 来源 | 可信度 |
|------|------|------|--------|
| **A** | Primary | SEC文件、创始人信、Master Plan、工程文档、10-K | 最高 |
| **B** | Semi-Primary | 财报电话会、供应商披露、监管文件 | 中等 |
| **C** | Alternative | 招聘信息、网站、论坛、开发者社区 | 仅作hints |

### 证据ID格式

```
[A|B|C][0-9]+
示例: A001, B023, C105
```

### 核心规则

```yaml
conventions:
  claim_rule:
    description: "任何前瞻性断言必须包含"
    required:
      - Mechanism: "机制/因果链"
      - ProxyMetric: "代理指标"
      - EvidenceID: "证据ID"
    missing_action: "标记为'Insufficient Signal'"

  joint_prob_rule:
    description: "Adner乘法风险"
    formula: "P_success = P_internal × Π P_dependency_i"
    note: "联合概率 = 内部执行概率 × 所有外部依赖概率的乘积"

  design_rules:
    description: "平台系统三要素"
    elements:
      - Architecture: "架构"
      - Interfaces: "接口"
      - Tests: "测试"

  learning_rule:
    description: "Wright定律/经验曲线"
    definition: "学习率 = 累计产量每翻倍时的成本下降百分比"
    example: "20%学习率 = 产量翻倍成本下降20%"
```

---

## Skill 1: Map_Strategic_Engine (战略引擎映射)

> **层级**: L1+L2
> **目标**: 提取单一飞轮，构建产品系统图，审计能力可转移性

### 输入来源

| 等级 | 来源 |
|------|------|
| A | 创始人信/Master Plan/文化手册/工程文档/10-K业务描述 |
| B | 分部收入利润率/电话会Q&A/产品SDK文档 |
| C | 招聘结构/开发者社区信号 (仅作hints) |

### 规则

#### M1: 飞轮映射 (Flywheel)

```yaml
flywheel_rules:
  output: "单一强化循环"
  requirement: "每个节点必须有1个代理指标"

  template:
    nodes:
      - name: "[节点名]"
        proxy_metric: "[可观测指标]"
        evidence_id: "[A/B/C]xxx"

    edges:
      - from: "[节点A]"
        to: "[节点B]"
        mechanism: "[因果机制]"
```

**示例：Tesla数据飞轮**

```yaml
flywheel:
  name: "Tesla Data Flywheel"

  nodes:
    - {name: "车辆销售", proxy: "交付量", evidence: "A001"}
    - {name: "数据采集", proxy: "FSD里程数", evidence: "B012"}
    - {name: "FSD改进", proxy: "干预率", evidence: "B015"}
    - {name: "订阅价值", proxy: "FSD订阅率", evidence: "B018"}

  edges:
    - {from: "车辆销售", to: "数据采集", mechanism: "更多车=更多数据"}
    - {from: "数据采集", to: "FSD改进", mechanism: "更多数据=更好模型"}
    - {from: "FSD改进", to: "订阅价值", mechanism: "更好FSD=更高转化"}
    - {from: "订阅价值", to: "车辆销售", mechanism: "更好体验=更多购买"}
```

#### M2: 产品系统图 (Product Graph)

```yaml
product_graph_rules:
  node_types:
    - Entry: "获客入口"
    - Retention: "留存机制"
    - Monetize: "变现点"
    - ProfitPool: "利润池"
    - MoatInfra: "护城河基础设施"
    - OptionSeed: "期权种子"

  edge_types:
    - Data: "数据流动"
    - Dist: "分发/渠道"
    - Cost: "成本关联"
    - Bundle: "捆绑/交叉销售"
    - LockIn: "锁定效应"
    - Reg: "监管/合规"
```

**示例：Tesla产品系统图**

```yaml
product_system:
  nodes:
    - {id: "Model3Y", type: "Entry", proxy: "交付量"}
    - {id: "Supercharger", type: "Retention", proxy: "充电次数"}
    - {id: "FSD_Sub", type: "Monetize", proxy: "订阅收入"}
    - {id: "Energy", type: "ProfitPool", proxy: "储能GWh"}
    - {id: "Dojo", type: "MoatInfra", proxy: "训练算力"}
    - {id: "Robotaxi", type: "OptionSeed", proxy: "试点城市数"}
    - {id: "Optimus", type: "OptionSeed", proxy: "原型数量"}

  edges:
    - {from: "Model3Y", to: "FSD_Sub", type: "Bundle", evidence: "A003"}
    - {from: "Model3Y", to: "Dojo", type: "Data", evidence: "B021"}
    - {from: "Supercharger", to: "Model3Y", type: "LockIn", evidence: "B025"}
    - {from: "Dojo", to: "Robotaxi", type: "Cost", evidence: "B030"}
```

#### M3: 能力审计 (Capability Audit)

```yaml
capability_rules:
  classification:
    - Commodity: "通用能力，无差异化"
    - Differentiated: "差异化能力，有竞争优势"
    - Moat: "护城河级能力，难以复制"

  attributes:
    - Transferability: "high | medium | low"
    - ProxyMetric: "衡量指标"
    - EvidenceID: "证据来源"
```

**示例：Tesla能力审计**

```yaml
capability_audit:
  - capability: "垂直整合制造"
    class: "Differentiated"
    transferability: "low"
    proxy: "自制率%"
    evidence: "A010"

  - capability: "FSD数据规模"
    class: "Moat"
    transferability: "low"
    proxy: "累计FSD里程"
    evidence: "B015"

  - capability: "电池技术"
    class: "Differentiated"
    transferability: "medium"
    proxy: "$/kWh成本"
    evidence: "A012"

  - capability: "品牌溢价"
    class: "Moat"
    transferability: "low"
    proxy: "ASP vs 竞品"
    evidence: "B020"
```

### 输出产物

| 产物 | 描述 |
|------|------|
| **Flywheel_Map** | 飞轮图（节点+边+代理指标） |
| **Product_System_Graph** | 产品系统图（节点类型+边类型） |
| **Capability_Audit** | 能力审计表 |
| **Source_Log** | 证据来源日志 |

---

## Skill 2: Audit_Future_Risks (未来风险审计)

> **层级**: L2
> **目标**: 将路线图转换为实物期权树 + 生态依赖Kill List + 鸿沟/整体产品缺口
> **依赖**: Map_Strategic_Engine

### 输入来源

| 等级 | 来源 |
|------|------|
| A | 专利/标准/监管文件/官方路线图 |
| B | 供应商客户披露/行业白皮书 |
| C | 领域招聘/合作伙伴生态动态 |

### 规则

#### M4: 实物期权树 (Real Options)

```yaml
real_option_template:
  option_name: "[期权名称]"
  stage: "[Research | Pilot | Scale | Mature]"
  trigger: "[行权触发条件]"
  cost_of_carry: "[持有成本/年]"
  time_window: "[有效期]"
  implied_prob_range: "[隐含成功概率区间]"
  value_if_works: "[成功时价值]"
  evidence_id: "[证据ID]"
```

**示例：Tesla期权树**

```yaml
real_options:
  - option: "Robotaxi"
    stage: "Pilot"
    trigger: "干预率<1次/万英里 + 监管许可"
    cost_of_carry: "$2B/年 R&D"
    time_window: "2024-2028"
    implied_prob: "[0.15, 0.40]"
    value_if_works: "$300-500B"
    evidence: "B030"

  - option: "Optimus"
    stage: "Research"
    trigger: "工厂部署验证 + 成本<$20K"
    cost_of_carry: "$500M/年"
    time_window: "2025-2030"
    implied_prob: "[0.05, 0.15]"
    value_if_works: "$100-200B"
    evidence: "B035"

  - option: "Energy Storage Leadership"
    stage: "Scale"
    trigger: "产能>200GWh + 成本领先"
    cost_of_carry: "Capex投资"
    time_window: "2024-2027"
    implied_prob: "[0.60, 0.80]"
    value_if_works: "$150-250B"
    evidence: "A015"
```

#### M5: 生态依赖映射 (Dependency Map)

```yaml
dependency_rules:
  classification:
    - CoInnovation: "共同创新依赖（需要外部技术突破）"
    - AdoptionChain: "采纳链依赖（需要生态配合）"

  attributes:
    - bottleneck: "瓶颈描述"
    - validation_signal: "验证信号"
    - P_dependency: "依赖实现概率"
```

**M5b: 联合概率计算**

```yaml
joint_probability:
  formula: "P_success = P_internal × Π P_dependency_i"

  example:
    option: "Robotaxi"
    P_internal: 0.60  # 内部技术执行
    dependencies:
      - {name: "监管审批", P: 0.50}
      - {name: "保险框架", P: 0.70}
      - {name: "基础设施", P: 0.80}
    P_success: "0.60 × 0.50 × 0.70 × 0.80 = 0.168"

  top_3_probability_killers:
    - "监管审批 (P=0.50)"
    - "内部技术执行 (P=0.60)"
    - "保险框架 (P=0.70)"
```

#### M6: 鸿沟分析 (Chasm Analysis)

```yaml
chasm_analysis:
  next_segment: "[目标细分市场]"
  whole_product_gap: "[整体产品缺口]"
  gtm_sequencing: "[市场进入顺序]"
  friction_list: "[摩擦点清单]"
```

**示例：Robotaxi鸿沟分析**

```yaml
chasm:
  current_segment: "早期采用者（科技爱好者）"
  next_segment: "早期多数（实用主义者）"

  whole_product_gap:
    - "24/7可用性（非仅限测试时段）"
    - "全天候运营（雨雪天气）"
    - "保险责任框架"
    - "客服/事故处理流程"

  gtm_sequencing:
    - "Phase 1: 限定区域/时段试点"
    - "Phase 2: 城市级扩展"
    - "Phase 3: 跨城市网络"

  friction_list:
    - "用户信任（无人驾驶焦虑）"
    - "监管不确定性"
    - "竞品替代（有人驾驶网约车）"
```

### 输出产物

| 产物 | 描述 |
|------|------|
| **Real_Options_Tree** | 实物期权树 |
| **Dependency_Kill_List** | 生态依赖Kill List |
| **GTM_Sequencing** | 市场进入顺序 |
| **Assumption_Register** | 假设登记簿 |

---

## Skill 3: Verify_Physics_Org (物理与执行验证)

> **层级**: L2
> **目标**: 通过学习曲线、模块化/设计规则、资本/组织对齐来压力测试可行性
> **依赖**: Map_Strategic_Engine

### 输入来源

| 等级 | 来源 |
|------|------|
| A | 单位经济学披露/Capex注释/产品SDK接口文档 |
| B | 产能/良率/吞吐信号/薪酬结构 |
| C | 职能招聘/组织架构/访谈 |

### 规则

#### M7: 成本曲线 (Cost Curve)

```yaml
cost_curve_model:
  assumed_learning_rate: "[学习率%]"

  constraints_to_test:
    - materials: "原材料约束"
    - yield: "良率约束"
    - energy: "能源约束"
    - reg: "监管约束"
    - latency: "延迟约束"

  falsifiers: "[证伪条件列表]"
```

**示例：电池成本曲线**

```yaml
cost_curve:
  product: "4680电池"
  assumed_learning_rate: "18%"
  current_cost: "$120/kWh"
  target_cost: "$80/kWh"
  required_volume_multiple: "3x"

  constraints:
    - materials: "锂价波动±30%"
    - yield: "当前良率~70%，需达90%"
    - energy: "干电极工艺能耗降低"

  falsifiers:
    - "2026Q2良率仍<80%"
    - "锂价持续>$25/kg"
    - "干电极工艺未量产"
```

#### M8: 架构设计规则 (Architecture & Design Rules)

```yaml
architecture_rules:
  classification:
    - Modular: "模块化（松耦合，可独立迭代）"
    - Integral: "整体化（紧耦合，需协同迭代）"

  design_rules:
    - Architecture: "系统架构定义"
    - Interfaces: "模块接口规范"
    - Tests: "集成测试标准"

  api_surface: "对外API边界"
```

**示例：Tesla软件架构**

```yaml
architecture:
  system: "FSD软件栈"
  classification: "Integral"
  rationale: "感知-规划-控制紧耦合"

  design_rules:
    architecture: "端到端神经网络"
    interfaces: "传感器输入标准化，决策输出标准化"
    tests: "模拟器回归测试 + 影子模式验证"

  api_surface:
    external: "有限（车辆API仅限基础功能）"
    internal: "高度封闭"
    implication: "生态控制强，但第三方创新受限"
```

#### M9: 资本/组织OS对齐 (Follow-the-Money)

```yaml
capital_org_alignment:
  reconcile:
    - R&D_spend: "与飞轮(M1)+期权(M4)对齐"
    - Capex: "与产能路线图对齐"
    - M&A: "与能力缺口对齐"

  mismatch_flags:
    - "R&D增速与战略重点不符"
    - "Capex与产能计划矛盾"
    - "高管薪酬与长期目标脱节"
```

### 输出产物

| 产物 | 描述 |
|------|------|
| **Cost_Curve_Model** | 成本曲线模型 |
| **Architecture_DesignRules_Map** | 架构设计规则图 |
| **Capital_OrgOS_Alignment** | 资本/组织对齐分析 |

---

## Skill 4: Synthesize_Thesis_Ledger (论点综合)

> **层级**: L3
> **目标**: 生成可审计的论点：里程碑 + 红队证伪 + 监控触发，严格证据门禁
> **依赖**: Audit_Future_Risks, Verify_Physics_Org

### 规则

#### Gate1: 断言门禁

```yaml
gate1:
  rule: "任何断言必须包含"
  required:
    - EvidenceID: "证据ID"
    - Mechanism: "因果机制"
    - ProxyMetric: "代理指标"
  missing_action: "拒绝纳入论点"
```

#### Gate2: 期权/依赖门禁

```yaml
gate2:
  rule: "每个期权/依赖必须包含"
  required:
    - disconfirmers: "证伪条件（物理/经济/监管）"
    - validation_signals: "验证信号"
  missing_action: "标记为不完整"
```

#### Ledger: 里程碑账本

```yaml
ledger_rules:
  time_boxes:
    - "6m: 短期可验证"
    - "12-18m: 中期关键节点"
    - "24-36m: 长期战略验证"
  requirement: "每个里程碑必须可量化"
```

### 输出产物

| 产物 | 描述 |
|------|------|
| **Milestone_Ledger** | 里程碑账本（时间盒+量化指标） |
| **RedTeam_Disconfirmers** | 红队证伪条件 |
| **Monitoring_Triggers** | 监控触发器 |
| **Final_Source_Log** | 最终证据日志 |
| **Final_Assumption_Register** | 最终假设登记簿 |

---

## 与Agent架构的整合

### Research Mechanism 整合

```yaml
research_mechanism_enhancement:
  new_capabilities:
    - "systemic_foresight_analysis"
    - "flywheel_extraction"
    - "real_options_modeling"
    - "chasm_analysis"

  output_fields_added:
    - "flywheel_map"
    - "capability_audit"
    - "real_options_tree"
    - "gtm_sequencing"
```

### Ecosystem Graph 整合

```yaml
ecosystem_graph_enhancement:
  new_capabilities:
    - "product_system_graph"
    - "dependency_kill_list"

  node_types_added:
    - "Entry, Retention, Monetize, ProfitPool, MoatInfra, OptionSeed"

  edge_types_added:
    - "Data, Dist, Cost, Bundle, LockIn, Reg"
```

### Valuation Engine 整合

```yaml
valuation_engine_enhancement:
  new_capabilities:
    - "real_options_valuation"
    - "joint_probability_calculation"
    - "cost_curve_projection"

  methods_added:
    - "Adner_multiplying_risks"
    - "Wright_learning_curve"
```

### Quality Gate 整合

```yaml
quality_gate_enhancement:
  new_capabilities:
    - "evidence_gating"
    - "redteam_disconfirmers"

  gate_rules_added:
    - "Gate1: 断言必须有EvidenceID+Mechanism+ProxyMetric"
    - "Gate2: 期权/依赖必须有disconfirmers+validation_signals"
```

---

## 完整输出模板

```yaml
systemic_foresight_output:
  target: "Tesla"
  as_of_date: "2026-01-27"

  # L1+L2: Strategic Engine
  flywheel:
    name: "Data Flywheel"
    nodes: [...]
    rpm_status: "加速中"

  product_system:
    nodes: 7
    edges: 12
    key_insight: "FSD是MoatInfra，Robotaxi/Optimus是OptionSeed"

  capability_audit:
    moat_count: 2
    differentiated_count: 3
    gaps: ["制造自动化"]

  # L2: Future Risks
  real_options:
    - {name: "Robotaxi", stage: "Pilot", P_success: 0.17, value_if_works: "$400B"}
    - {name: "Optimus", stage: "Research", P_success: 0.08, value_if_works: "$150B"}
    - {name: "Energy", stage: "Scale", P_success: 0.70, value_if_works: "$200B"}

  dependency_kill_list:
    top_3:
      - "监管审批 (P=0.50)"
      - "内部技术执行 (P=0.60)"
      - "保险框架 (P=0.70)"

  chasm:
    current: "Early Adopters"
    next: "Early Majority"
    whole_product_gaps: 4

  # L2: Physics & Org
  cost_curve:
    product: "4680电池"
    learning_rate: "18%"
    on_track: "待验证"

  architecture:
    type: "Integral"
    design_rules_defined: true

  capital_alignment:
    r_d_aligned: true
    capex_aligned: true
    flags: []

  # L3: Thesis Ledger
  milestones:
    6m:
      - "FSD干预率<3次/万英里"
      - "储能部署>10GWh/季度"
    12_18m:
      - "首个Robotaxi城市许可"
      - "4680良率>85%"
    24_36m:
      - "Robotaxi规模化运营"
      - "Optimus工厂部署"

  redteam_disconfirmers:
    - "致命事故导致全面暂停"
    - "监管长期不批准"
    - "成本曲线停滞"

  monitoring_triggers:
    upgrade: "干预率<1次/万英里 + 城市许可"
    downgrade: "干预率恶化 OR 监管收紧"
    kill: "致命事故 OR 财务造假"

  evidence_summary:
    A_tier: 12
    B_tier: 25
    C_tier: 8
    gaps: 3
```

---

## Contract Compliance (v1.0合约兼容)

### 监控触发器与Quality Gate映射

| 触发类型 | Quality Gate | 说明 |
|----------|--------------|------|
| kill | **FAIL** | 致命事件，论点失效 |
| downgrade | **DEGRADE** | 需重新评估 |
| upgrade | **PASS** | 论点强化 |
| (无触发) | **PASS** | 维持当前判断 |

### 质量门条件

```yaml
quality_gate:
  pass_criteria:
    - "4层分析完成(L0-L3)"
    - "证据A_tier ≥ 10"
    - "Milestones定义(6m/12-18m/24-36m)"
    - "RedTeam disconfirmers ≥ 3"

  degrade_criteria:
    - "证据gaps > 5"
    - "关键里程碑无A_tier证据"
    - "依赖kill_list存在高风险项"

  fail_criteria:
    - "kill触发器激活"
    - "核心战略引擎证伪"
```

### Blackboard输出字段

```yaml
blackboard_outputs:
  - field: "strategic_engines"
    type: "array"
    schema: "[{name, status, value_potential, dependencies}]"

  - field: "real_options"
    type: "array"
    schema: "[{name, stage, estimated_value, kill_switch}]"

  - field: "dependency_kill_list"
    type: "array"
    schema: "[{critical_item, risk_level}]"

  - field: "thesis_milestones"
    type: "object"
    schema: "{6m[], 12_18m[], 24_36m[]}"

  - field: "monitoring_triggers"
    type: "object"
    schema: "{upgrade, downgrade, kill}"

  - field: "evidence_distribution"
    type: "object"
    schema: "{A_tier, B_tier, C_tier, gaps}"
```

### 证据层级要求

| 论点类型 | 最低证据要求 |
|----------|--------------|
| 战略引擎存在性 | A_tier |
| 期权价值估算 | B_tier |
| 里程碑时间表 | A_tier (公司发布) 或 B_tier (分析师) |
| 竞争力判断 | B_tier |
| 终局情景 | B/C_tier |

---

**版本**: v1.1
**合约版本**: skill_output_contract_v1.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已整合到架构，合约兼容
