# Research Mechanism Agent v1.1

## 概述

Research Mechanism (RM) Agent 是投资研究系统的核心推理组件，负责将上游数据包（Ecosystem Graph + Data Integrity Report）编译为结构化的因果机制分析。

### 核心职责
1. 构建因果声明注册表（ClaimSpec Registry）
2. 生成机制DAG（MechanismDAG）
3. 执行反事实分析（Counterfactual Analysis）
4. 映射Adner生态风险（Ecosystem Risk Mapping）
5. 执行Premortem并生成反证指标（Disconfirmers）
6. 组装监控触发器和论点备忘录（ThesisMemo）

---

## 架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Research Mechanism Agent v1.1                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │  Ecosystem   │    │    Data      │    │   Policy     │          │
│  │   Package    │    │  Confidence  │    │    Pack      │          │
│  │   (ECO)      │    │   Report     │    │   v1.1       │          │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘          │
│         │                   │                   │                   │
│         └───────────────────┼───────────────────┘                   │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    S0: Policy Pack Loader                     │  │
│  │                   (Load + Freeze + Validate)                  │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   S1: Claim & DAG Builder                     │  │
│  │          (ClaimSpec Registry + MechanismDAG)                  │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                 S2: Counterfactual Compiler                   │  │
│  │              (do(x) interventions + observables)              │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   S3: Adner Risk Mapper                       │  │
│  │      (Initiative / Co-Innovation / Adoption Chain)            │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                S4: Premortem & Disconfirmers                  │  │
│  │           (Klein premortem + falsifiable signals)             │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              S5: Trigger & Memo Assembler                     │  │
│  │       (MonitoringTriggers + ThesisMemo + DEGRADE)             │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                      Output Package                           │  │
│  │   thesis_memo + triggers + decision_trace → Quality Gate      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 理论基础

### 1. Judea Pearl - 因果推理
- **因果DAG**: 有向无环图表示变量间因果关系
- **do(x) operator**: 干预操作，区别于条件概率
- **可识别性**: 因果效应能否从观测数据确定

### 2. Ron Adner - 生态系统风险
- **Initiative Risk**: 内部执行风险（能否按时按规格交付）
- **Co-Innovation Risk**: 依赖外部互补创新达到所需成熟度
- **Adoption Chain Risk**: 依赖中间方采用才能实现终端价值

### 3. Gary Klein - Premortem
- **前瞻性事后诸葛**: 假设项目已失败，回溯原因
- **比传统风险评估更有效**: 克服乐观偏见
- **生成具体disconfirmers**: 可观测的失败信号

### 4. Karl Popper - 可证伪性
- **科学声明必须可证伪**: 无法证伪的声明无信息量
- **falsify_if条件**: 明确什么数据能推翻声明
- **observables + timeframe**: 具体、可观测、有时限

---

## 文件结构

```
research_mechanism/
├── research_mechanism_agent_v1.1.yaml     # Agent主配置
├── policies/
│   └── rm_policy_pack_v1.1.yaml           # 策略包配置
├── reason_codes/
│   └── reason_code_dictionary_RM.yaml     # Reason Code字典
├── schemas/
│   ├── rm_claim_spec_schema.yaml          # ClaimSpec结构
│   ├── rm_mechanism_dag_schema.yaml       # MechanismDAG结构
│   ├── rm_trigger_schema.yaml             # Trigger结构
│   ├── rm_thesis_memo_schema.yaml         # ThesisMemo结构
│   └── decision_trace_schema.yaml         # 决策轨迹结构
├── contracts/
│   ├── rm_upstream_interface_contract.yaml  # 上游接口契约
│   └── rm_qg_interface_contract.yaml        # QG接口契约
├── invariants/
│   └── rm_invariants_manifest.yaml        # 不变量清单
├── skills_xml/                            # 核心技能（XML格式）
│   ├── rm_policy_pack_loader_v1.1.skill.xml
│   ├── rm_claim_and_dag_builder_v1.1.skill.xml
│   ├── rm_counterfactual_compiler_v1.1.skill.xml
│   ├── rm_adner_risk_mapper_v1.1.skill.xml
│   ├── rm_premortem_disconfirmers_v1.1.skill.xml
│   └── rm_trigger_and_memo_assembler_v1.1.skill.xml
├── integration/                           # 遗留技能（YAML格式，已被skills_xml替代）
│   └── *.skill.yaml
├── docs/
│   └── RM_v1.1_README.md                  # 本文档
└── *.skill.md                             # 分析引擎技能（8个）
```

---

## Pipeline 执行流程

### S0: Policy Pack Loader
**输入**: `rm_policy_pack_v1.1.yaml`
**输出**: `frozen_policy`, `policy_hash`
**职责**:
- 加载策略包配置
- 计算SHA-256哈希
- 冻结配置（运行期间不可变）
- 验证版本兼容性

### S1: Claim & DAG Builder
**输入**: `EcosystemPackage`, `DataConfidenceReport`, `frozen_policy`
**输出**: `claim_registry`, `mechanism_dag`, `rm_confidence_cap`
**职责**:
- 从上游提取候选claims
- 构建ClaimSpec结构（cause→effect, observables, falsify_if, risk_type）
- 生成MechanismDAG（nodes + edges）
- 运行不变量检查
- 计算置信度

### S2: Counterfactual Compiler
**输入**: `claim_registry`, `rm_confidence_cap`
**输出**: `counterfactuals[]`
**职责**:
- 选择top-K关键claims
- 生成do(x)干预
- 定义预期效果和observables
- 评估因果效应可识别性（IDENTIFIED/PARTIAL/UNKNOWN/NON_IDENTIFIABLE）

### S3: Adner Risk Mapper
**输入**: `ecosystem_package`, `claim_registry`
**输出**: `ecosystem_risks[]`
**职责**:
- 映射三类Adner风险到claims
- 生成success_criteria + leading_signals + failure_triggers
- 验证adoption_chain_risk有明确步骤

### S4: Premortem & Disconfirmers
**输入**: `claim_registry`, `counterfactuals`, `ecosystem_risks`
**输出**: `failure_modes[]`, `disconfirmers[]`
**职责**:
- 执行Premortem（假设论点已失败）
- 生成5类失败模式（INITIATIVE, CO_INNOVATION, ADOPTION_CHAIN, SUBSTITUTION, REGULATION）
- 强制链接每个failure_mode到claim_id
- 生成具体的disconfirmers

### S5: Trigger & Memo Assembler
**输入**: 所有上游输出
**输出**: `thesis_memo`, `monitoring_triggers`, `decision_trace`
**职责**:
- 编译监控触发器
- 构建不确定性矩阵
- 计算最终置信度
- 应用Kill Switch规则
- 强制DEGRADE模板（如适用）
- 组装ThesisMemo

---

## Reason Codes

### P0 - 致命错误（必须DEGRADE）
| Code | 描述 |
|------|------|
| RM_DAG_EMPTY | MechanismDAG没有因果边 |
| RM_INVARIANT_FAIL | 不变量检查失败 |

### P1 - 严重问题（强烈建议DEGRADE）
| Code | 描述 |
|------|------|
| RM_CLAIM_MISSING_OBSERVABLE | 关键claim缺少可观测指标 |
| RM_FALSIFIABILITY_MISSING | 关键claim缺少证伪条件 |
| RM_ECOSYSTEM_RISK_UNMAPPED | 关键claim未标注Adner风险类型 |
| RM_EVIDENCE_GAP_CRITICAL | A/B证据覆盖率低于阈值 |
| RM_PREMORTEM_NOT_LINKED_TO_CLAIMS | Premortem失败模式未链接claim |
| RM_CAUSAL_QUERY_NON_IDENTIFIABLE | 因果查询不可识别 |
| RM_FORBIDDEN_PHRASE_DETECTED | 检测到禁止的投资建议短语 |

### P2 - 警告（建议WARN或DEGRADE）
| Code | 描述 |
|------|------|
| RM_COUNTERFACTUAL_TIMEFRAME_MISSING | 反事实缺少时间窗口 |
| RM_TRIGGER_INCOMPLETE | 触发器缺少必要字段 |
| RM_UNCERTAINTY_MATRIX_MISSING | 不确定性矩阵不完整 |
| RM_DEGRADE_MODE_ENFORCED | 系统强制DEGRADE模式 |

---

## DEGRADE模式

当触发Kill Switch规则时，系统进入DEGRADE模式：

### 触发条件（任一满足即触发）
1. `ab_coverage_critical < 0.40` - 关键claims证据不足
2. `falsifiability_critical < 0.50` - 可证伪性不足
3. 任何关键claim缺少observable
4. Premortem未链接到claims
5. Adner风险未映射

### DEGRADE模式下的限制
**允许的sections**:
- hypothesis_list
- monitoring_triggers
- uncertainty_matrix
- evidence_gaps
- next_actions

**禁止的sections**:
- price_target
- buy_sell_recommendation
- strong_conclusion

**禁止的phrases**:
- 中文: "强烈建议买入", "确定会", "必然", "目标价", "无风险"
- 英文: "strong buy", "guaranteed", "will definitely", "target price"

---

## 置信度计算

```
rm_internal_confidence =
    0.40 × evidence_coverage +
    0.35 × falsifiability +
    0.15 × invariant_pass_rate +
    0.10 × 0.5 (baseline)

rm_confidence_cap = min(upstream_confidence_cap, rm_internal_confidence)
```

**传递原则**: 下游置信度不能超过上游置信度上限。

---

## Blackboard模式

RM Agent使用append-only blackboard进行状态管理：

```yaml
blackboard:
  mode: append_only
  allowed_keys:
    - claim_registry
    - mechanism_dag
    - counterfactuals
    - ecosystem_risks
    - failure_modes
    - disconfirmers
    - monitoring_triggers
    - thesis_memo
    - decision_trace
    - reason_codes_buffer
    - confidence_chain
    - degrade_status
```

- 每个key只能append，不能覆盖或删除
- 支持完整审计轨迹
- 运行结束后可重放验证

---

## 与其他Agent的接口

### 上游接口（rm_upstream_interface_contract.yaml）
- **EcosystemPackage** from Ecosystem Graph Agent
- **DataConfidenceReport** from Data Integrity Agent

### 下游接口（rm_qg_interface_contract.yaml）
- **ThesisMemo** to Quality Gate Agent
- **MonitoringTriggers** to Quality Gate Agent
- **DecisionTrace** to Quality Gate Agent

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-01-25 | 初始版本：基础分析引擎 |
| 1.1.0 | 2026-01-27 | 重大升级：集成层技能、Policy Pack、DEGRADE模式、Blackboard |

---

## 使用示例

### 1. 加载Policy Pack
```yaml
# S0输出
frozen_policy:
  version: "1.1.0"
  hash: "sha256:abc123..."
  frozen_at: "2026-01-27T14:30:00Z"
```

### 2. ClaimSpec示例
```yaml
claim_id: "CLM_TSLA_001"
criticality: CRITICAL
cause: "FSD_v14_release"
effect: "robotaxi_revenue_unlock"
sign: POSITIVE
lag: "6-18M"
conditions:
  - "regulatory_approval_granted"
  - "safety_record_acceptable"
observables:
  - "interventions_per_1000_miles"
  - "regulatory_permit_count"
timeframe: "2026-Q2 to 2027-Q4"
falsify_if: "interventions > 5 per 1000 miles by 2026-Q3"
risk_type: "initiative_risk"
confidence: 0.55
```

### 3. Counterfactual示例
```yaml
claim_id: "CLM_TSLA_001"
intervention: "do(FSD_v14_release = never)"
expected_effect: "Robotaxi revenue remains $0, valuation drops $200-300"
observables:
  - "FSD_release_announcement"
  - "robotaxi_pilot_cities_count"
timeframe: "2026-Q2"
falsify_if: "FSD v14 not released by 2026-Q3"
identifiability: "PARTIAL"
identifiability_notes: "Cannot isolate FSD effect from macro/competition factors"
```

### 4. DEGRADE输出示例
```yaml
thesis_memo:
  core_thesis: "Tesla's Robotaxi potential remains uncertain..."
  degrade_mode: true
  reason_codes:
    - "RM_EVIDENCE_GAP_CRITICAL"
    - "RM_FALSIFIABILITY_MISSING"
  allowed_sections:
    - hypothesis_list
    - monitoring_triggers
    - uncertainty_matrix
  # NO price_target, NO buy_sell_recommendation
```

---

## 贡献指南

1. 新增Reason Code需同时更新`reason_code_dictionary_RM.yaml`和相关skill
2. Schema变更需保持向后兼容或明确版本升级
3. 新增skill需遵循XML格式，包含`<disconfirmers>`和`<output_contract>`
4. 所有变更需通过invariants检查

---

## 联系方式

- **系统**: RM Agent System
- **版本**: 1.1.0
- **更新日期**: 2026-01-27
