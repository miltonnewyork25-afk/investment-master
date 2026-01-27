# Controller Spec 分析框架 v4.0

> **Skill ID**: `research_mechanism.controller_spec_v4.0`
> **主路由**: Research Mechanism (80%)
> **辅助路由**: Quality Gate (Safety Controller → Kill Switch)
> **来源**: 分析问题skill.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

将任意复杂问题建模为**控制系统**，通过以下步骤进行结构化分析：
1. 识别系统边界和隐变量
2. 区分真实状态 vs 观测信号（含噪声/滞后）
3. 设计三层控制策略（安全→稳定→性能）
4. 评估可观测性和可控性
5. 规划最小可行证据获取路径

---

## 1. System Definition (Plant)

**模板**：

```yaml
plant:
  name: "[系统边界描述]"

  state_x:  # 真实状态（The Truth）- 通常不可直接观测
    - x1:
        name: "[关键隐变量1]"
        example: "真实需求强度"
        observable: false
    - x2:
        name: "[关键隐变量2]"
        example: "信任水位/品牌心智"
        observable: false

  observation_y:  # 观测信号（The Signal）- 我们能看到的
    - y1:
        indicator: "[可观测指标]"
        noise_source: "[噪声来源]"
        lag: "[滞后程度: 实时/天/周/季度]"
    - y2:
        indicator: "[另一个指标]"
        noise_source: "..."
        lag: "..."

  estimator_strategy: "[如何从 y 推断 x̂]"
  # 选项: 贝叶斯更新 / 多源交叉验证 / 卡尔曼滤波 / 移动平均
```

**投研应用示例**：

```yaml
plant:
  name: "Tesla FSD商业化进度"

  state_x:
    - x1:
        name: "FSD真实技术成熟度"
        observable: false
        proxy: "干预率、接管频次"
    - x2:
        name: "监管接受度"
        observable: false
        proxy: "审批进度、政策信号"

  observation_y:
    - y1:
        indicator: "公司披露的FSD里程数"
        noise_source: "选择性披露、口径变化"
        lag: "季度"
    - y2:
        indicator: "第三方测试报告"
        noise_source: "样本偏差、测试条件差异"
        lag: "月度"

  estimator_strategy: "多源交叉验证 + 趋势外推"
```

---

## 2. Control Logic (The Policy)

### Layer 1: Safety Controller (Hard Stop)

> **映射到**: Quality Gate Kill Switch

```yaml
safety_controller:
  purpose: "防止不可逆损失"
  override: true  # 覆盖所有其他层

  triggers:
    - condition: "[观测到致命信号]"
      action: "IMMEDIATE_STOP"
    - condition: "[触碰合规/资金红线]"
      action: "ROLLBACK"
    - condition: "[核心假设被证伪]"
      action: "REASSESS_THESIS"

  investment_mapping:
    - trigger: "监管全面禁止Robotaxi测试"
      action: "Kill Switch触发，重估全部论点"
    - trigger: "致命事故导致全面暂停"
      action: "IMMEDIATE_STOP估值模型"
    - trigger: "财务造假证据"
      action: "ROLLBACK所有基于该数据的结论"
```

### Layer 2: Stability Controller (Anti-Jitter)

> **映射到**: Supervisor 任务调度

```yaml
stability_controller:
  purpose: "防止频繁切换、过度反应"

  hysteresis:  # 滞回设计
    start_threshold: "[High_Threshold]"  # 开始行动的阈值
    stop_threshold: "[Low_Threshold]"    # 停止行动的阈值
    # 示例: 开始买入要求>70分，停止卖出要求<40分

  min_window:
    description: "一旦开始，必须运行最短时间"
    duration: "[T_min]"
    # 示例: 一旦开始深度研究，至少完成3个核心命题分析

  switching_penalty:
    description: "[频繁切换的代价]"
    # 示例: 每次重新估值消耗2小时，每周最多重估1次

  investment_mapping:
    - rule: "不因单日股价波动>5%就改变长期判断"
    - rule: "不因单季度miss就推翻整体thesis"
    - rule: "重大判断变更需要至少2个独立数据源确认"
```

### Layer 3: Performance Controller (Optimization)

> **映射到**: Research Mechanism + Valuation Engine

```yaml
performance_controller:
  purpose: "在安全和稳定的前提下优化收益"

  control_u:  # 可调节的动作集合
    - action: "调整置信度"
      range: "[0, 1]"
    - action: "调整仓位建议"
      range: "[0%, 100%]"
    - action: "调整目标价"
      range: "[Bear, Base, Bull]"

  algorithm:
    options:
      - "逐步加码: 证据增强时逐步提高置信度"
      - "A/B Test: 对比不同估值方法的预测准确度"
      - "PID调节: 根据预测误差调整模型参数"

  investment_mapping:
    - "初始研究: 50% Base权重"
    - "证据增强: 逐步向Bull/Bear调整"
    - "持续校准: 每季度用实际数据校准模型"
```

---

## 3. Analysis Matrix

**可观测性 × 可控性矩阵**：

| Variable | Observability | Controllability | Strategy |
|----------|---------------|-----------------|----------|
| 高可观测 + 高可控 | High | High | **Optimize**: 直接优化 |
| 高可观测 + 低可控 | High | Low | **Hedge**: 对冲/分散 |
| 低可观测 + 高可控 | Low | High | **Probe**: 主动探测获取信息 |
| 低可观测 + 低可控 | Low | Low | **Accept**: 接受不确定性 |

**投研应用**：

| 变量 | 可观测性 | 可控性 | 策略 |
|------|----------|--------|------|
| 季度收入 | High | N/A | Optimize: 精确预测 |
| 竞争格局 | Medium | N/A | Hedge: 多情景分析 |
| FSD技术进度 | Low | N/A | Probe: 寻找领先指标 |
| 宏观政策 | Low | N/A | Accept: 情景加权 |

---

## 4. Execution Loop (The Sensing Budget)

> **映射到**: Data Integrity 数据获取策略

```yaml
execution_loop:
  purpose: "高效获取决策所需的最小信息"

  mve:  # Minimal Viable Evidence - 最小可行证据
    budget: "[可投入的资源: 时间/金钱/API调用]"
    probe: "[测试动作 u_probe]"
    measure: "[观测指标 y]"
    update: "[更新状态估计 x̂]"

  voi_check:  # Value of Information - 信息价值检验
    rule: "STOP if VoI < 0"
    description: "如果新数据不会改变决策，则停止获取"

  investment_mapping:
    - scenario: "已有足够证据支持Bull case"
      action: "停止寻找更多利好证据"
      reason: "VoI < 0, 不会改变结论"
    - scenario: "关键假设仍悬而未决"
      action: "继续Probe，寻找决定性证据"
      reason: "VoI > 0, 可能改变结论"
```

**VoI计算框架**：

```
VoI = P(数据改变决策) × |决策价值差异| - 获取数据成本

如果 VoI > 0: 继续获取数据
如果 VoI ≤ 0: 停止，用现有信息决策
```

---

## 5. 与Agent架构的整合

### Research Mechanism 整合

```yaml
research_mechanism_enhancement:
  new_capability: "controller_spec_analysis"

  when_to_use:
    - "分析复杂系统时"
    - "需要区分信号vs噪声时"
    - "需要设计监控触发器时"

  output_fields_added:
    - "state_variables": "识别的隐变量列表"
    - "observation_noise": "各指标的噪声评估"
    - "observability_matrix": "可观测性分析"
    - "control_layers": "三层控制策略"
```

### Quality Gate 整合

```yaml
quality_gate_enhancement:
  new_capability: "safety_controller_rules"

  kill_switch_mapping:
    from_controller_spec:
      - "Safety Controller triggers → Kill Switch rules"
      - "Hard Stop conditions → FAIL verdict triggers"
```

### Data Integrity 整合

```yaml
data_integrity_enhancement:
  new_capability: "sensing_budget_optimization"

  voi_check_integration:
    - "在获取额外数据前评估VoI"
    - "VoI ≤ 0时标记为SUFFICIENT_DATA"
    - "避免过度数据收集"
```

---

## 6. 使用示例

**任务**: 分析Tesla Robotaxi投资机会

```yaml
# Step 1: 定义系统
plant:
  name: "Tesla Robotaxi商业化"
  state_x:
    - x1: "技术成熟度 (干预率)"
    - x2: "监管接受度"
    - x3: "单位经济学可行性"
  observation_y:
    - y1: {indicator: "公司披露", noise: "high", lag: "季度"}
    - y2: {indicator: "第三方测试", noise: "medium", lag: "月度"}

# Step 2: 设定控制逻辑
safety_controller:
  triggers:
    - "致命事故 → Kill Switch"
    - "监管禁令 → Reassess"

stability_controller:
  hysteresis: "不因单次演示改变判断"
  min_window: "至少追踪2个季度数据"

# Step 3: 分析矩阵
analysis_matrix:
  - {var: "干预率", obs: "Low", ctrl: "N/A", strategy: "Probe"}
  - {var: "审批进度", obs: "Medium", ctrl: "N/A", strategy: "Monitor"}

# Step 4: 执行循环
next_mve:
  probe: "追踪Q1干预率数据"
  budget: "等待2月财报"
  voi_check: "如果干预率>3次/万英里，维持DEGRADE"
```

---

## Contract Compliance v2.0

### Core Principles Alignment

| 原则 | 本Skill实现 |
|------|-------------|
| **Contract-first** | 输出结构化：Plant/Control/Matrix/Loop四组件 |
| **Eval-first** | 可观测性×可控性矩阵提供可评估框架 |
| **SRE-first** | 三层控制：Safety→Stability→Performance |

### Claims Type Annotation (5类)

| 组件 | Claim类型 | 重要性 | 要求 |
|------|-----------|--------|------|
| Plant.state_x | FACT_DESCRIPTIVE | critical | 需Tier 1证据 |
| Plant.observation_y | FACT_DESCRIPTIVE | critical | 需交叉验证 |
| Safety Controller triggers | CAUSAL_INFERENCE | critical | 需因果链 |
| Stability hysteresis | CAUSAL_INFERENCE | supporting | 需历史验证 |
| VoI assessment | FORECAST | supporting | 需概率区间 |
| Control recommendations | ACTION_RECOMMENDATION | critical | 需风险标注 |

### Evidence Registry (Dual Threshold)

```yaml
evidence_requirements:
  quantity_threshold:
    tier_1_min: 2  # 至少2个一手来源
    total_min: 4   # 总证据≥4

  coverage_threshold:
    key_nodes: ["state_x", "observation_y", "safety_triggers"]
    min_coverage: 0.50  # ≥50%关键节点有证据

  tiering:
    tier_1: "公司披露、SEC文件、官方数据"
    tier_2: "机构报告、行业数据"
    tier_3: "媒体、推断、模型估计"
```

### Kill Switches

**Mandatory (3个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-EVIDENCE-FABRICATION | 证据造假/幻觉检测 | 3.0 | 任一关键数据无法溯源 |
| KS-TOOL-OVERREACH | 工具越权 | 3.0 | 调用未授权外部API |
| KS-HIGH-RISK-OUTPUT | 高风险输出 | 3.0 | 建议触发Safety Controller但未警告 |

**Domain-Specific (4个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-CTRL-001 | Safety Controller触发 | 3.0 | 检测到Hard Stop条件 |
| KS-CTRL-002 | 不可观测性过高 | 2.5 | state_x全部不可观测且无代理指标 |
| KS-CTRL-003 | VoI计算不可行 | 2.0 | 无法估计信息价值 |
| KS-CTRL-004 | 控制策略冲突 | 2.5 | 三层控制逻辑相互矛盾 |

### Threat Model

```yaml
threat_model:
  risk_types:
    - "幻觉风险: 虚构隐变量或因果关系"
    - "过度自信: 低估观测噪声"
    - "控制幻觉: 高估可控性"

  protection:
    - "所有state_x必须标注observable: true/false"
    - "所有observation_y必须标注noise_source和lag"
    - "Safety Controller必须有明确触发条件"

  content_zones:
    green: "Plant定义、观测指标"
    yellow: "控制策略建议"
    red: "Safety Controller触发判断"
```

### Observability & Replay

```yaml
observability:
  run_id: "自动生成UUID"
  tool_calls: "记录所有数据获取"
  gate_scores: "记录各组件完成状态"

replay:
  enabled: true
  inputs_logged: "目标系统、约束条件、数据源"
  outputs_logged: "Plant/Control/Matrix/Loop完整结构"
```

### Budget

```yaml
budget:
  tokens:
    soft: 15000
    hard: 25000
    critical: 30000
  tool_calls:
    soft: 8
    hard: 15
  latency_ms:
    soft: 45000
    hard: 90000
```

### Quality Checks

```yaml
quality_checks:
  P0_blocking:
    - "Plant四组件定义完整"
    - "Safety Controller triggers明确"
    - "无Kill Switch触发"

  P1_important:
    - "VoI检验完成"
    - "可观测性×可控性矩阵完整"
    - "Execution Loop有明确next_probe"

  pass_rule: "P0: 100%, P1: ≥85%"

  hard_fail_triggers:
    - "Safety Controller条件不明确"
    - "state_x全部缺失"
    - "任一Mandatory Kill Switch触发"
```

### Red Flags (Required)

```yaml
red_flags:
  - flag: "RF-CTRL-001"
    condition: "state_x无代理指标"
    action: "标注为不可观测，降低置信度"

  - flag: "RF-CTRL-002"
    condition: "observation_y噪声>HIGH且无滤波策略"
    action: "降级至DEGRADE"

  - flag: "RF-CTRL-003"
    condition: "Safety Controller缺少任一Hard Stop条件"
    action: "必须补充或标记为不完整"
```

### Falsification Design

```yaml
falsification:
  alternative_hypotheses:
    - "观测信号噪声被低估"
    - "因果链存在遗漏变量"
    - "可控性被高估"

  sensitivity_tests:
    - "噪声水平±50%对结论影响"
    - "滞后时间翻倍对决策影响"

  disconfirming_evidence_plan:
    - "6个月内: 验证observation_y与state_x相关性"
    - "季度: 检查Safety Controller触发条件有效性"
```

### Eval & Regression

```yaml
eval:
  self_score:
    dimensions:
      - "组件完整性 (Plant/Control/Matrix/Loop)"
      - "可观测性分析深度"
      - "控制策略可行性"
    range: "[0, 1]"

  calibration_hook:
    trigger: "输出完成后"
    check: "控制建议与实际结果回溯"

  golden_cases:
    - "Tesla FSD商业化进度分析"
    - "SaaS公司客户流失控制"
```

### Evaluation Alignment

| 维度 | 权重 | 本Skill评估点 |
|------|------|---------------|
| 深度 | 30% | Level 3+(机制层)穿透 |
| 证据 | 25% | Dual Threshold满足 |
| 可操作 | 20% | 控制策略明确可执行 |
| 一致性 | 15% | 三层控制逻辑一致 |
| 时效性 | 10% | 数据时效标注 |

### DEGRADE Mode Playbook

```yaml
degrade_mode:
  triggers:
    - "关键隐变量(state_x)不可观测"
    - "观测信号噪声过高"
    - "VoI > 0 但数据不足"

  actions:
    - "输出标注: [DEGRADE] 分析受限"
    - "列出具体受限原因"
    - "提供数据获取建议"

  recovery:
    - "获取更多观测数据"
    - "引入替代代理指标"
    - "扩大数据时间窗口"
```

### Blackboard Outputs (v2.0)

```yaml
blackboard_outputs:
  - field: "state_variables"
    type: "array"
    description: "识别的隐变量列表"
    claim_type: "FACT_DESCRIPTIVE"

  - field: "observation_quality"
    type: "object"
    schema: "{signal, noise_level, lag}"
    claim_type: "FACT_DESCRIPTIVE"

  - field: "control_status"
    type: "enum"
    values: ["SAFETY_TRIGGERED", "STABILITY_MODE", "PERFORMANCE_MODE"]
    claim_type: "CAUSAL_INFERENCE"

  - field: "voi_assessment"
    type: "object"
    schema: "{voi_value, decision, next_probe}"
    claim_type: "FORECAST"

  - field: "control_recommendations"
    type: "array"
    description: "控制策略建议"
    claim_type: "ACTION_RECOMMENDATION"
```

### Quality Gate Mapping

| 控制层 | Quality Gate | 说明 |
|--------|--------------|------|
| Safety Controller | **FAIL** | Hard Stop → Kill Switch触发 |
| Stability Controller | **DEGRADE** | Hysteresis → 需要更多数据 |
| Performance Controller | **PASS** | 正常优化模式 |

---

**版本**: v4.2
**合约版本**: skill_design_standard_v2.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已整合到架构，v2.0合约兼容
