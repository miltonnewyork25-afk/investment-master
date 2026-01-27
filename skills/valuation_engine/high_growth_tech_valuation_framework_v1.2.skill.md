# 高成长科技公司估值框架 v1.0

> **Skill ID**: `valuation_engine.high_growth_tech_v1.0`
> **主路由**: Valuation Engine (90%)
> **辅助路由**: Research Mechanism (证伪协议)
> **来源**: high-growth-us-tech-valuation.doc
> **归档日期**: 2026-01-27

---

## Skill 用途

给 US 高成长科技/平台公司估值，避免两类常见误差：

1. **GAAP低估问题**：把"投资"当费用（R&D/部分SG&A）→ 低估真实资产与盈利力
2. **线性DCF盲区**：忽略里程碑/二元结果带来的"期权凸性"

**核心公式**：
```
Equity Value = Base（已成型核心业务） + Options（成长/新业务期权）
```

---

## 适用场景

- R&D / S&M 重的高成长公司
- 软件/AI/平台/市场/消费互联网/EV-机器人等
- 存在多个未来产品线，且结果呈现**非线性/二元**特征
  - 监管解锁
  - 新TAM打开
  - Take-rate跳变
  - 技术突破

---

## 输入要求 (Minimal)

```yaml
inputs:
  business_split:
    base: "[已跑通的业务列表]"
    options: "[尚在兑现的业务列表]"

  financials:
    - Revenue
    - Gross_Margin
    - R&D
    - SG&A
    - SBC (Stock-Based Compensation)
    - Working_Capital
    - Capex
    - D&A
    - Debt
    - Cash

  unit_economics:  # 若适用
    - Retention/Churn
    - ARPU
    - CAC
    - Contribution_Margin
    - Payback_Period

  market:
    - Market_Cap
    - Enterprise_Value
    - Share_Count
```

---

## 5步工作流 (AB+RO Framework)

### Step 1: 经济口径重述报表

**目标**：把隐藏投资变成资本存量，修正ROIC/再投资/利润

#### 1a. R&D资本化

```
R&D Capital = Σ(历史R&D × 剩余寿命权重)

设定：
- R&D寿命：通常3-7年（视行业）
- 摊销方法：直线法

Adjusted Operating Income =
    GAAP Operating Income
    + Current R&D
    − Amortization(R&D Capital)
```

**示例**：
| 年份 | R&D支出 | 剩余寿命(5年) | 计入资本 |
|------|---------|---------------|----------|
| Y-4 | $100M | 1/5 | $20M |
| Y-3 | $120M | 2/5 | $48M |
| Y-2 | $150M | 3/5 | $90M |
| Y-1 | $180M | 4/5 | $144M |
| Y0 | $200M | 5/5 | $200M |
| **R&D Capital** | | | **$502M** |

#### 1b. SG&A部分资本化

识别"投资性"SG&A（非日常运营费用）：
- 获客支出（CAC）
- 渠道建设
- 生态系统投资
- 品牌建设

```
Org Capital = Σ(投资性SG&A × 剩余寿命权重)
寿命：通常2-5年（比R&D短）
```

#### 1c. 调整后投入资本

```
Adjusted Invested Capital =
    Net Working Capital
    + Net PP&E
    + R&D Capital
    + Org Capital
    − Non-operating Cash
```

#### 1d. 调整后ROIC与再投资

```
Adjusted ROIC = Adjusted NOPAT / Adjusted Invested Capital

Reinvestment = Δ(Adjusted Invested Capital)
             ≠ 仅看Capex！

区分两类再投资：
- Maintenance：维持现有能力/TAM
- Growth：扩张能力/进入新TAM
```

---

### Step 2: Base层估值（核心业务 + 明确Fade）

**目标**：给"已成型业务"一个可审计区间，显式建模竞争侵蚀

#### 2a. 定义Base业务

Base业务必须满足：
- [x] 已商业化
- [x] 单位经济学可复现
- [x] 需求可见（非假设性TAM）

#### 2b. 预测框架（5-10年）

```yaml
base_forecast:
  revenue:
    Y1: "$__M, growth ___%"
    Y2-Y5: "逐年降速路径"
    Y6-Y10: "成熟期增速"

  margins:
    gross_margin: "路径: __% → __%"
    operating_margin: "路径: __% → __%"
    steady_state_margin: "__%"

  reinvestment:
    maintenance_rate: "__%"
    growth_rate: "__%（逐年递减）"
```

#### 2c. Fade建模（硬写清）

**Fade = 增长与ROIC向长期稳态回归**

```
Fade速度由护城河决定：

强护城河（慢Fade）：
├── 网络效应
├── 高切换成本
├── 规模学习曲线
├── 监管壁垒
└── 分销锁定

弱护城河（快Fade）：
├── 低切换成本
├── 技术易复制
├── 监管开放
└── 渠道可替代
```

**Fade参数表**：

| 护城河强度 | ROIC Fade | Growth Fade | 到稳态年数 |
|------------|-----------|-------------|------------|
| 强 | 20%→15% | 30%→5% | 10-15年 |
| 中 | 20%→12% | 30%→3% | 7-10年 |
| 弱 | 20%→10% | 30%→2% | 5-7年 |

#### 2d. 折现原则

```
⚠️ 关键原则：
- 保持折现口径一致
- 不要用"抬高折现率"来粗暴吞掉二元不确定性
- 二元不确定性应该放在Options层处理
```

#### 2e. Base输出

```yaml
base_output:
  value_range:
    P25: "$__B"
    P50: "$__B"
    P75: "$__B"

  key_sensitivities:
    - fade_speed: "±1年 → ±$__B"
    - margin_ceiling: "±2pp → ±$__B"
    - reinvestment_efficiency: "±5pp → ±$__B"

  assumptions_table:
    growth_path: "[详细]"
    margin_path: "[详细]"
    reinvestment_path: "[详细]"
    fade_schedule: "[详细]"
```

---

### Step 3: Sanity Anchors（防"故事漂移"）

**至少选一个锚点校验**：

#### 锚点1：经济一致性检验

```
Growth ≈ Reinvestment Rate × ROIC (经济口径)

如果：
隐含Growth = 25%
隐含ROIC = 20%
→ 需要Reinvestment Rate = 125% ❌ 不可能

校验通过条件：
Reinvestment Rate ≤ 100%
且符合行业历史范围
```

#### 锚点2：同业/自身历史对比

```
如果隐含经济指标远离合理区间：
- 回查：无形资本化假设是否合理？
- 回查：业务拆分Base/Options是否恰当？
- 回查：Fade假设是否过于乐观/悲观？
```

---

### Step 4: Customer Capital（订阅/复购型专用）

**把客户当资产（churn = 折旧）**

#### 4a. CLV驱动因素

```yaml
customer_capital:
  contribution_margin: "$__ per customer per year"
  retention_rate: "__% (churn = __%)"
  arpu_expansion: "__% YoY"
  cac: "$__"
  payback_period: "__ months"

  clv_calculation:
    formula: "CM × (1 / churn) × (1 + expansion_rate)"
    result: "$__"
    ltv_cac_ratio: "__x"
```

#### 4b. 再投资归因规则

```
营销支出拆分：

抵消流失的营销 = Maintenance Reinvestment
→ 维持客户资产存量

扩大净客户资产的营销 = Growth Reinvestment
→ 增加客户资产存量
```

#### 4c. 输出

```yaml
customer_capital_output:
  health_score: "[1-5]"
  health_assessment: "[描述]"

  top_3_kpis_affecting_base:
    - kpi_1: "[指标名] - 当前值 - 影响程度"
    - kpi_2: "[指标名] - 当前值 - 影响程度"
    - kpi_3: "[指标名] - 当前值 - 影响程度"
```

---

### Step 5: Options层（成长/新业务期权组合）

**目标**：显式定价"凸性"，不要塞进终值

#### 5a. 期权识别

每个期权对应：
- 新业务/产品线
- 监管解锁机会
- 平台变现跃迁
- 技术突破应用

#### 5b. 期权三要素

对每个期权填写：

| 要素 | 描述 | 如何估算 |
|------|------|----------|
| **Payoff** | 成功后成熟期现金流的PV | Mini-DCF：假设成功后的稳态收入/利润 |
| **T** | 到规模化所需时间/"到期" | 技术路线图/监管时间表 |
| **p** | 成功概率 | 可分段：技术p × 监管p × 采用p |

#### 5c. 隐含期权价值反推

```
Implied Options Value = Market EV − Base EV

步骤：
1. 计算Market EV（当前市值）
2. 计算Base EV（Step 2输出）
3. 差值 = 市场隐含的期权价值
4. 分配到各个期权（核心期权 + residual bucket）
```

#### 5d. 隐含概率反推

```
对每个期权：
Implied p = Implied Option Value / Payoff

对比：
- 市场隐含p
- 你估算的p
→ 定位分歧来源
```

#### 5e. Options Table输出

| Option | Payoff | T | Implied p | Your p | Milestones | Kill-Switch |
|--------|--------|---|-----------|--------|------------|-------------|
| 期权1 | $__B | __年 | __% | __% | [关键里程碑] | [否决条件] |
| 期权2 | $__B | __年 | __% | __% | [关键里程碑] | [否决条件] |
| Residual | $__B | - | - | - | - | - |

---

## 输出合约（Output Contract）

**每次估值必须交付以下5项**：

### 1. Base Value

```yaml
base_value:
  range:
    P25: "$__B"
    P50: "$__B"
    P75: "$__B"

  assumptions:
    growth_path: "[Y1-Y10]"
    margin_path: "[Y1-Y10]"
    reinvestment_path: "[Y1-Y10]"
    fade_schedule: "[详细]"
```

### 2. Options Table

| Option | Payoff | T | Implied p | Your p | Milestones | Kill-Switch |
|--------|--------|---|-----------|--------|------------|-------------|
| ... | ... | ... | ... | ... | ... | ... |

### 3. Moat → 参数映射

```yaml
moat_parameter_mapping:
  network_effects:
    strength: "[1-5]"
    impacts:
      - fade_speed: "慢/中/快"
      - margin_ceiling: "+/-__pp"

  switching_costs:
    strength: "[1-5]"
    impacts:
      - churn_rate: "___%"
      - pricing_power: "高/中/低"

  scale_learning:
    strength: "[1-5]"
    impacts:
      - reinvestment_efficiency: "+/-__pp"
      - margin_expansion: "+/-__pp"
```

### 4. Disconfirmers（证伪清单）

```yaml
disconfirmers:
  base_downgrades:
    - trigger: "[什么数据/事件]"
      impact: "Base下调__%"
      monitoring: "[如何监控]"

  option_kills:
    - option: "[期权名]"
      trigger: "[什么数据/事件]"
      impact: "p从__%下调到__%"
```

### 5. "Market is Pricing" 3 Bullets

```
市场当前定价隐含：
1. [核心假设1的人话翻译]
2. [核心假设2的人话翻译]
3. [核心假设3的人话翻译]
```

---

## 护栏规则 (Guardrails)

### 不编数
- 只基于输入数据计算
- 事实 vs 假设严格分栏
- 所有假设必须标注来源

### 拆分不清时
- Base保守
- 把不确定性放进Options
- 显式写范围（不给单点）

### 不给单点估值
```
❌ "目标价 $450"
✓ "Base: $150-200, Options: $100-250, 合计: $250-450"
   触发条件：如果[X]，向上移动；如果[Y]，向下移动
```

---

## 与Agent架构整合

### Valuation Engine 整合（主）

```yaml
valuation_engine_integration:
  capability: "high_growth_tech_valuation"

  triggers:
    - "高成长公司估值"
    - "科技股估值"
    - "期权估值"
    - "Base+Options"

  required_outputs:
    - "base_value_range"
    - "options_table"
    - "moat_parameter_mapping"
    - "disconfirmers"
    - "market_is_pricing"

  validation_rules:
    - "Growth ≈ Reinvestment × ROIC 一致性"
    - "Options必须有Kill-Switch"
    - "必须给区间不给单点"
```

### Research Mechanism 整合（辅）

```yaml
research_mechanism_integration:
  capability: "valuation_falsification"

  disconfirmer_format:
    trigger: "[可观测条件]"
    threshold: "[阈值]"
    impact: "[估值影响]"
    monitoring: "[监控方式]"
```

---

## 使用示例

**Tesla估值框架**：

```yaml
# Business Split
base: "汽车销售(已成熟市场) + 储能(规模化中)"
options:
  - "Robotaxi"
  - "Optimus机器人"
  - "FSD许可"

# Step 1: R&D资本化
r_d_capital:
  historical_rd: "$15B累计"
  life: "5年"
  capitalized: "$8B"
  adjusted_operating_income: "GAAP + $4B当期R&D - $1.6B摊销"

# Step 2: Base估值
base_value:
  P25: "$150B"
  P50: "$180B"
  P75: "$220B"
  key_assumption: "汽车毛利率稳定在18-22%, 储能增长30%→10%"

# Step 5: Options Table
options_table:
  - option: "Robotaxi"
    payoff: "$500B"
    T: "3-5年"
    implied_p: "50%"
    your_p: "25%"
    milestones: "监管批准, 干预率<0.1次/万英里"
    kill_switch: "致命事故导致全面暂停"

  - option: "Optimus"
    payoff: "$200B"
    T: "5-8年"
    implied_p: "30%"
    your_p: "10%"
    milestones: "工厂部署1万台, 外部销售开始"
    kill_switch: "3年内无法完成有用任务"

# Market is Pricing
market_is_pricing:
  - "Robotaxi在3年内获得美国主要州批准(隐含p=50%)"
  - "汽车业务毛利率不会跌破15%"
  - "储能业务到2028年达到$50B收入"
```

---

## Contract Compliance v2.0

> 本节确保skill输出符合 `skills/_common/skill_design_standard_v2.0.yaml`

### 核心原则对齐 (Core Principles)

```yaml
core_principles_alignment:
  contract_first:
    input_validation: "业务拆分 + 财务数据完整性检查"
    workflow: "5步工作流(AB+RO Framework)"
    output_schema: "base_value + options_table + market_is_pricing"
    quality_gates: "PASS/DEGRADE/FAIL三态"
    degrade_circuit_break: "数据不足时降级，假设矛盾时熔断"

  eval_first:
    golden_cases: "3个案例(高成长/成熟/数据不足)"
    scorers: "估值准确率 + Sanity Anchor通过率"
    replay: "tool_calls序列可回放"

  sre_first:
    degrade_path: "宽区间替代精确估值"
    fast_close: "Options改为定性分析"
    drill_frequency: "每周演练"
```

### 声明类型 (5-Type Claims)

| 估值组件 | 类型 | 重要性 | 特殊要求 |
|----------|------|--------|----------|
| 历史财务数据 | **FACT_DESCRIPTIVE** | supporting | min_evidence_tier: 1 |
| R&D资本化金额 | **CAUSAL_INFERENCE** | critical | 必须列替代假设 |
| Base Value | **VALUATION_IMPLIED** | critical | 必须做敏感性测试 |
| Options Payoff | **FORECAST** | critical | 必须做敏感性测试 |
| 成功概率p | **FORECAST** | critical | 必须列替代假设 |
| 投资建议 | **ACTION_RECOMMENDATION** | optional | min_evidence_tier: 2 |

### 证据注册表 (Dual Threshold)

```yaml
evidence_registry:
  tier_thresholds:
    quantity_threshold:
      tier_1_minimum: 2
      fallback: "若Tier 1仅1条→DEGRADE with RC-EVIDENCE-001"

    coverage_threshold:
      tier_1_covers_key_nodes: "≥50%"
      key_nodes:
        - "Base业务定义"
        - "R&D资本化"
        - "期权识别"
        - "Sanity Anchor"
      fallback: "未覆盖→DEGRADE with RC-EVIDENCE-002"

  tier_mapping:
    tier_1: "10-K, 10-Q, Earnings Call, IR材料"
    tier_2: "分析师报告, 行业研究"
    tier_3: "媒体报道, 专家访谈"
```

### Kill Switches (3 Mandatory + Domain-Specific)

```yaml
kill_switches:
  mandatory:
    - id: "KS-EVIDENCE-FABRICATION"
      condition: "引用财务数据与原文不符"
      detection: "evidence_hash验证"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-TOOL-OVERREACH"
      condition: "调用非白名单工具"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-HIGH-RISK-OUTPUT"
      condition: "给出单点目标价(违反护栏规则)"
      detection: "输出格式检查"
      action: "FAIL"
      current_status: "GREEN"

  domain_specific:
    - id: "KS-VAL-001"
      condition: "Base业务毛利率跌破盈亏平衡"
      threshold: "毛利率 < 10%"
      action: "FAIL + Base估值归零"
      monitoring_metric: "季度毛利率"

    - id: "KS-VAL-002"
      condition: "核心业务市场份额崩塌"
      threshold: "份额下降>10pp/年"
      action: "DEGRADE + 重估Base"

    - id: "KS-VAL-003"
      condition: "期权业务监管永久禁止"
      threshold: "主要市场立法禁止"
      action: "FAIL + 该期权归零"

    - id: "KS-VAL-004"
      condition: "Sanity Anchor持续失败"
      threshold: "Growth/ROIC/Reinvest连续3季不一致"
      action: "DEGRADE + 限制定量结论"
```

### 威胁模型 (Threat Model)

```yaml
threat_model:
  risks:
    evidence_fabrication:
      description: "编造财务数据或期权假设"
      detection: "财报交叉验证"
      mitigation: "FAIL"

    overconfidence:
      description: "对期权概率过度乐观"
      detection: "强制列替代假设 + 联合概率计算"
      mitigation: "隐含p与analyst_p对比"

    single_point_fallacy:
      description: "给出单点估值而非区间"
      detection: "输出格式检查"
      mitigation: "强制P25/P50/P75"

  content_zones:
    TRUSTED: "SEC文件"
    DATA_ONLY: "财务数据API"
    HIGH_RISK: "预测/假设"
```

### 可观测性与回放 (Observability)

```yaml
observability:
  required_fields:
    run_id: "UUID"
    skill_version: "v1.2"
    timestamp: "ISO8601"
    tool_calls: [{tool, input, output_summary, latency_ms, success}]
    gate_scores: {p0_passed, p0_total, p1_passed, p1_total}

  metrics:
    - sanity_anchor_pass_rate: "Anchor通过率"
    - option_probability_calibration: "期权概率校准度"
    - tier1_evidence_ratio: "Tier 1证据占比"

  replay:
    enabled: true
```

### 成本/延迟预算 (Budget)

```yaml
budget:
  token_budget:
    soft_limit: 8000
    hard_limit: 12000
    critical_limit: 18000

  tool_call_budget:
    soft_limit: 10
    hard_limit: 18
    critical_limit: 30

  latency_budget:
    soft_limit_ms: 25000
    hard_limit_ms: 50000
    critical_limit_ms: 100000
```

### 质量检验 (Quality Checks)

```yaml
quality_checks:
  hard_fail_triggers:
    - "Base/Options拆分不清"
    - "给出单点估值"
    - "期权无Kill-Switch"
    - "Sanity Anchor完全失败"

  scoring:
    PASS:
      p0_requirement: "100% 通过"
      p1_requirement: "≥85% 通过"
    DEGRADE:
      p0_requirement: "100% 通过"
      p1_requirement: "70-85% 通过"
    FAIL:
      conditions: ["P0未100%通过", "P1 < 70%"]
```

### 证伪设计 (Falsification)

```yaml
falsification:
  basic_requirements:
    falsifier_per_claim: true
    premortem: "假设3年后估值判断错误，最可能路径是什么？"
    counterfactual: "如果去掉最大期权，估值结论是否改变？"

  advanced_requirements:
    alternative_hypotheses:
      required_for: ["CAUSAL_INFERENCE", "FORECAST"]
      example:
        claim: "Robotaxi成功概率30%"
        alternatives:
          - "技术瓶颈导致概率仅10%"
          - "监管加速导致概率50%"
        distinguishing_evidence: "干预率数据 + 监管动态"

    sensitivity_stress_test:
      required_for: ["FORECAST", "VALUATION_IMPLIED"]
      example:
        parameter: "Robotaxi概率"
        base_value: "30%"
        perturbation: "±20pp"
        conclusion_flip_threshold: "50%"

    disconfirming_evidence_plan:
      claim: "Base Value = $180B"
      where_to_look:
        - "毛利率恶化趋势"
        - "竞争加剧证据"
        - "市场份额变化"
      check_frequency: "每季度"
```

### 评估与回归 (Eval & Regression)

```yaml
eval_regression:
  self_score:
    dimensions:
      G1: {score: "0-5", how: "5步工作流完成度"}
      E1: {score: "0-5", how: "估值假设有证据支持"}
      Q1: {score: "0-5", how: "Sanity Anchor通过"}
      K1: {score: "0-5", how: "Kill Switch正确设置"}

  calibration:
    golden_cases:
      - case_id: "GC-VAL-001"
        input: "Tesla (高成长+期权)"
        expected_verdict: "PASS"
        expected_key_outputs: ["Base + Options分拆"]

      - case_id: "GC-VAL-002"
        input: "成熟科技公司(无期权)"
        expected_verdict: "PASS"
        expected_key_outputs: ["仅Base估值"]

      - case_id: "GC-VAL-003"
        input: "数据不完整公司"
        expected_verdict: "DEGRADE"
```

### 评估对标 (Evaluation Alignment)

```yaml
evaluation_alignment:
  standard_version: "agent_evaluation_standard_v1.1"

  dimension_coverage:
    G1_governance: "通过5步工作流 + 护栏规则"
    E1_evidence_auditability: "通过Tier分层 + Sanity Anchor"
    Q1_quality_gate: "通过PASS/DEGRADE/FAIL"
    K1_kill_switch: "通过3+4 Kill Switches"

  blocker_avoidance:
    B1_critical_unsupported: "核心假设必须有Tier 1/2证据"
    B5_kill_switch_ignored: "期权必须有Kill Switch"
    B7_contract_violation: "不给单点估值"
```

### DEGRADE模式可执行剧本

```yaml
degrade_mode:
  template_locked: true
  playbook:
    immediate_actions:
      - "扩大估值区间(P25-P75→P10-P90)"
      - "期权改为定性描述"
    next_actions_required:
      - action: "获取完整5年历史数据"
        owner: "human"
        priority: "P0"
      - action: "验证业务拆分口径"
        owner: "agent"
        priority: "P1"

  fast_close:
    enabled: true
    method: "限制为定性分析"
```

### Blackboard输出字段 (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "valuation_engine.high_growth_tech_v1.2"
    skill_version: "v1.2"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]
    key_claims: ["估值结论"]

  extended_fields:
    base_value_range: {type: "object", schema: "{p25, p50, p75}"}
    options_table: {type: "array"}
    total_equity_value_range: {type: "object"}
    market_implied_assumptions: {type: "array"}
    valuation_confidence: {type: "float"}
    valuation_verdict: {type: "enum", values: ["UNDERVALUED", "FAIR", "OVERVALUED", "UNCERTAIN"]}
```

### 下游依赖提示

```yaml
downstream_hints:
  recommended_next_skills:
    - skill: "forensic_financial"
      reason: "验证Base业务盈利质量"
      priority: 1
    - skill: "moat_evaluation"
      reason: "验证fade假设的护城河基础"
      priority: 2

  data_for_downstream:
    report_composer: ["base_value_range", "options_table"]
    ecosystem_graph: ["业务拆分", "期权依赖关系"]
```

---

**版本**: v1.2
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/valuation_engine/`
**状态**: 已升级到v2.0合规
