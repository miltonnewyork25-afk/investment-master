# Innovation Agent v1.0

## 概述

Innovation Agent 是投资研究 Agent 系统中的创新生成引擎，负责系统性地产出非显而易见的投资洞察。它基于事件驱动架构，通过跨领域类比和结构化假设生成，为其他 Agent（RM、VE、ECO、DI）提供创新输入。

## 理论基础

Innovation Agent 的设计融合了三大理论框架：

### 1. Structure-Mapping Theory (Gentner, 1983)
- **核心原则**：有效的类比保持关系结构，而非表面属性
- **Systematicity Principle**：高阶关系（因果、条件）比一阶关系更有价值
- **应用**：Cross-Domain Analogizer 使用此理论评估类比质量

### 2. TRIZ (Altshuller, 1946-1985)
- **矛盾分析**：技术矛盾和物理矛盾的系统识别
- **40 发明原则**：标准化的问题解决模式
- **应用**：作为类比领域之一，提供结构化的创新模式

### 3. Design Thinking Double Diamond
- **Diverge 阶段**：广泛生成想法，不过早收敛
- **Converge 阶段**：系统评估和筛选
- **应用**：Pipeline 架构遵循此模式

## 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    Innovation Agent v1.0                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐                                                │
│  │   P0        │  Event Trigger Dispatcher                      │
│  │   触发阶段   │  • 事件分类(P0-P3)                             │
│  │             │  • 冷却期/聚合/限流                             │
│  └──────┬──────┘                                                │
│         │                                                        │
│  ┌──────┴──────────────────────────────────────────┐            │
│  │            DIVERGE 阶段 (发散)                   │            │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │            │
│  │  │     D1      │→│     D2      │→│    D3    │ │            │
│  │  │ Idea Seed   │  │Cross-Domain │  │Hypothesis│ │            │
│  │  │ Generator   │  │ Analogizer  │  │Structurer│ │            │
│  │  └─────────────┘  └─────────────┘  └──────────┘ │            │
│  └──────────────────────────┬───────────────────────┘            │
│                             │                                    │
│  ┌──────────────────────────┴───────────────────────┐            │
│  │            CONVERGE 阶段 (收敛)                   │            │
│  │  ┌─────────────┐  ┌─────────────┐               │            │
│  │  │     C1      │→│     C2      │               │            │
│  │  │  Novelty    │  │ Innovation  │               │            │
│  │  │   Scorer    │  │Quality Gate │               │            │
│  │  └─────────────┘  └─────────────┘               │            │
│  └──────────────────────────┬───────────────────────┘            │
│                             │                                    │
│  ┌──────────────────────────┴───────────────────────┐            │
│  │              ROUTE 阶段 (路由)                    │            │
│  │  ┌─────────────┐                                 │            │
│  │  │     R1      │  → RM Agent (MECHANISM)        │            │
│  │  │   Output    │  → VE Agent (VALUATION)        │            │
│  │  │   Router    │  → ECO Agent (ECOSYSTEM)       │            │
│  │  │             │  → DI Agent (DATA_GAP)         │            │
│  │  └─────────────┘                                 │            │
│  └──────────────────────────┬───────────────────────┘            │
│                             │                                    │
│  ┌──────────────────────────┴───────────────────────┐            │
│  │            FEEDBACK 阶段 (反馈)                   │            │
│  │  ┌─────────────┐  ┌─────────────┐               │            │
│  │  │     F1      │→│     F2      │               │            │
│  │  │  Feedback   │  │ Adaptation  │               │            │
│  │  │ Collector   │  │   Engine    │               │            │
│  │  └─────────────┘  └─────────────┘               │            │
│  └──────────────────────────────────────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 文件结构

```
skills/innovation_engine/
├── innovation_agent_v1.yaml          # 主配置文件
├── policies/
│   ├── innovation_policy_pack_v1.yaml    # 完整策略包
│   ├── event_trigger_rules_v1.yaml       # 事件触发规则
│   ├── analogy_domain_library_v1.yaml    # 类比领域库
│   └── scoring_rules_v1.yaml             # 评分规则
├── skills_xml/
│   ├── event_trigger_dispatcher_v1.skill.xml
│   ├── idea_seed_generator_v1.skill.xml
│   ├── cross_domain_analogizer_v1.skill.xml
│   ├── hypothesis_structurer_v1.skill.xml
│   ├── novelty_scorer_v1.skill.xml
│   ├── innovation_quality_gate_v1.skill.xml
│   ├── output_router_v1.skill.xml
│   ├── feedback_collector_v1.skill.xml
│   └── adaptation_engine_v1.skill.xml
├── schemas/
│   ├── innovation_hypothesis_schema_v1.yaml
│   └── innovation_output_schema_v1.yaml
├── contracts/
│   ├── innov_rm_interface_v1.yaml
│   ├── innov_ve_interface_v1.yaml
│   ├── innov_eco_interface_v1.yaml
│   └── innov_di_interface_v1.yaml
├── reason_codes/
│   └── reason_code_dictionary_INNOV.yaml
├── tests/
│   └── test_innovation_pipeline_v1.yaml
├── examples/
│   ├── sample_innovation_output_v1.yaml
│   └── sample_hypothesis_examples_v1.yaml
└── docs/
    └── INNOV_v1_README.md
```

## 核心概念

### 1. 事件驱动触发

Innovation Agent 不持续运行，而是被事件触发：

| 优先级 | 事件类型 | 触发行为 |
|--------|----------|----------|
| P0 | 重大财务异常 | 立即触发 |
| P1 | 重要业务事件 | 即时触发 |
| P2 | 竞争/行业动态 | 聚合后触发 |
| P3 | 常规信息 | 批量聚合触发 |

### 2. 跨领域类比

类比领域库包含6个预定义域：

| 领域 | 典型结构 | 与商业的距离 |
|------|----------|--------------|
| biological_systems | 捕食-猎物、免疫系统 | 0.7 |
| physics_principles | 相变、势能、临界点 | 0.8 |
| historical_patterns | 商业周期、技术周期 | 0.4 |
| adjacent_industries | 相邻行业模式 | 0.3 |
| system_dynamics | 反馈回路、延迟 | 0.5 |
| triz_principles | 40发明原则 | 0.6 |

类比质量约束：
- 领域距离：0.3 ≤ distance ≤ 0.8
- 映射分数：≥ 0.5
- 必须保持关系结构

### 3. 假设类型与路由

| 类型 | 描述 | 目标 Agent | 输出格式 |
|------|------|------------|----------|
| MECHANISM | 因果机制假设 | RM Agent | claim_spec_v1 |
| VALUATION | 估值影响假设 | VE Agent | cap_hypothesis_addendum |
| ECOSYSTEM | 生态系统假设 | ECO Agent | eco_signal |
| DATA_GAP | 数据缺口 | DI Agent | data_request |
| INNOVATION | 通用创新洞察 | Innovation Registry | standard |

### 4. 新颖性评分公式

```
Novelty = 0.40 × embedding_distance
        + 0.35 × information_gain
        + 0.25 × human_calibration
```

- **embedding_distance**：与历史假设的语义距离
- **information_gain**：相对于基线知识的信息增量
- **human_calibration**：人工反馈校准系数

### 5. 质量门控 (IQG)

```
通过条件:
  novelty ≥ 0.20 AND
  feasibility ≥ 0.30 AND
  composite ≥ 0.40 AND
  NOT duplicate AND
  claim_type IS NOT NULL

降级条件:
  novelty ≥ 0.15 AND (novelty < 0.20 OR feasibility < 0.30)
  → 输出但标记警告

拒绝条件:
  novelty < 0.15 OR duplicate = true OR claim_type IS NULL
```

## Reason Codes

Innovation Agent 使用 `INNOV_` 前缀的 reason codes：

| 阶段 | 代码数 | 示例 |
|------|--------|------|
| Trigger | 5 | INNOV_DAILY_LIMIT_REACHED |
| Seed | 4 | INNOV_SEED_DUPLICATE |
| Analogy | 5 | INNOV_WEAK_ANALOGY |
| Structurer | 5 | INNOV_HYPOTHESIS_INCOMPLETE |
| Scorer | 4 | INNOV_LOW_NOVELTY |
| IQG | 8 | INNOV_NOT_NOVEL |
| Router | 4 | INNOV_DELIVERY_FAILED |
| Feedback | 3 | INNOV_LOW_ACCEPTANCE_RATE |
| Adaptation | 5 | INNOV_ADJUSTMENT_CONFLICT |

详细定义见 `reason_codes/reason_code_dictionary_INNOV.yaml`

## 自适应机制

Innovation Agent 包含反馈驱动的自适应：

1. **Feedback Collector (F1)**
   - 收集下游 Agent 的处理结果
   - 收集人工审核反馈
   - 计算接受率、拒绝原因分布

2. **Adaptation Engine (F2)**
   - 根据接受率调整质量阈值
   - 根据拒绝原因调整评分权重
   - 根据人工反馈重新训练校准模型

触发条件示例：
- 接受率 < 30% → 提升 novelty_threshold
- 高重复拒绝 → 降低 embedding_distance 权重
- 人工-模型相关性 < 0.5 → 重训校准模型

## 使用示例

### 典型输入

```yaml
event:
  event_id: "EVT_TSLA_2026012701"
  event_type: "EARNINGS_SURPRISE"
  priority: "P0"
  data:
    ticker: "TSLA"
    actual_eps: 0.52
    expected_eps: 0.75
    automotive_margin: 0.165
```

### 典型输出

```yaml
innovation_proposals:
  - id: "INNOV_H_001"
    claim_type: "MECHANISM"
    statement: "如果毛利率持续低于18%超过2个季度，Tesla将被迫实施5%+的降价策略"
    origin:
      analogy_source:
        domain: "biological_systems"
        structure: "predator-prey dynamics"
    falsifiability:
      metric: "Automotive gross margin"
      threshold: "< 18% for 2 consecutive quarters"
      time_window: "next 4 quarters"
    scores:
      novelty: 0.72
      feasibility: 0.85
      composite: 0.77
    routing:
      target_agent: "research_mechanism_agent"
```

## 与其他 Agent 的集成

### 下游 Agent 接口

| Agent | 接口文件 | 协议 |
|-------|----------|------|
| RM Agent | innov_rm_interface_v1.yaml | PUSH_CONFIRM |
| VE Agent | innov_ve_interface_v1.yaml | PUSH_CONFIRM |
| ECO Agent | innov_eco_interface_v1.yaml | PUSH_CONFIRM |
| DI Agent | innov_di_interface_v1.yaml | PUSH_CONFIRM |

### Push+Confirm 协议

1. Innovation Agent 推送假设
2. 目标 Agent 返回 ACCEPTED/REJECTED/DEFERRED/MODIFIED
3. 超时(5s) → 重试(最多2次) → 记录失败

## Kill Switch

系统包含多个安全机制：

| 规则 | 阈值 | 动作 |
|------|------|------|
| 每日触发上限 | 10次 | 停止触发 |
| 每次输出上限 | 5个假设 | 截断 |
| 连续失败 | 3次 | 暂停24小时 |
| 调整幅度限制 | 0.1/周期 | 裁剪 |

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-01-27 | 初始版本 |

## 参考文献

1. Gentner, D. (1983). Structure-mapping: A theoretical framework for analogy. *Cognitive Science*, 7(2), 155-170.
2. Altshuller, G. (1984). *Creativity as an Exact Science*. Gordon and Breach.
3. Design Council. (2005). The Double Diamond Design Process Model.
4. Holyoak, K. J., & Thagard, P. (1995). *Mental Leaps: Analogy in Creative Thought*. MIT Press.
