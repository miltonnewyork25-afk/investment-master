# 第一性原理分析协议 (FPAC Protocol) v1.0

> **Skill ID**: `research_mechanism.fpac_protocol_v1.0`
> **主路由**: Research Mechanism (70%)
> **辅助路由**: Valuation Engine (20%), Quality Gate (10%)
> **来源**: 第一性原理分析方法skil.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

将任意复杂问题**还原到最基本的物理/经济/逻辑约束**，通过以下步骤进行分析：
1. 定义目标函数和硬约束
2. 识别系统边界和I/O
3. 找出主导项（80/20法则）
4. 建立无量纲Pi群分析
5. 构建v0模型并做敏感性分析
6. 识别TOC瓶颈
7. 规划可行路径
8. 设定Kill信号

---

## FPAC Protocol Schema

```xml
<FPAC_Protocol 第一性原理分析>
  <Schema>
    <Objective unit="REQUIRED" current="NUMBER" target="NUMBER" limit="HARD_CONSTRAINT_LIST" />

    <Boundary>
      <IO inputs="LIST" outputs="LIST" />
      <HardStop trigger="CONDITION" />
    </Boundary>

    <DominantTerms>
      <Term name="STRING" pct="PERCENT" ctrl="ENUM" lever="STRING" evidence_grade="CHAR" />
    </DominantTerms>

    <Constraints>
      <Con name="STRING" type="Hard|Soft" penalty="STRING" evidence_grade="CHAR" />
    </Constraints>

    <PiGroups>
      <Pi name="STRING" formula="RATIO_MATH" range="RANGE" />
    </PiGroups>

    <Model_v0 equation="MATH_EQ" sensitivity="VAR_NAME">
      <Unknown var="STRING" range="RANGE" />
    </Model_v0>

    <TOC_Bottleneck constraint="STRING" throughput_metric="UNIT" />

    <Paths>
      <Path type="ENUM" hypothesis="STRING">
        <Cond>NECESSARY_CONDITION</Cond>
        <Risk>RISK_DESCRIPTION</Risk>
        <Step>MILESTONE</Step>
      </Path>
    </Paths>

    <KillCriteria>
      <Signal metric="STRING" threshold="VAL" action="ENUM" />
    </KillCriteria>
  </Schema>
</FPAC_Protocol>
```

---

## 1. Objective (目标定义)

> **映射到**: Research Mechanism - 核心命题定义

**模板**：

```yaml
objective:
  unit: "[目标单位: 美元/用户/GWh...]"
  current: "[当前值]"
  target: "[目标值]"
  limit:  # 硬约束列表
    - "[约束1: 如资金上限]"
    - "[约束2: 如时间窗口]"
    - "[约束3: 如监管红线]"
```

**投研应用示例**：

```yaml
objective:
  unit: "美元/股"
  current: 450  # 当前股价
  target: "确定合理估值区间"
  limit:
    - "不可依赖未公开信息"
    - "估值方法必须可审计"
    - "假设必须可证伪"
```

---

## 2. Boundary (系统边界)

> **映射到**: Research Mechanism + Quality Gate

**模板**：

```yaml
boundary:
  io:
    inputs:
      - "[输入1: 可控变量]"
      - "[输入2: 外部参数]"
    outputs:
      - "[输出1: 目标指标]"
      - "[输出2: 副产品]"

  hard_stop:
    trigger: "[触发条件]"
    action: "[停止/回退/警报]"
```

**投研应用示例**：

```yaml
boundary:
  io:
    inputs:
      - "收入增速假设"
      - "利润率假设"
      - "折现率"
      - "市场情绪"
    outputs:
      - "估值区间"
      - "置信度"
      - "关键监控指标"

  hard_stop:
    trigger: "发现财务造假证据 OR 核心假设被证伪"
    action: "IMMEDIATE_STOP + REASSESS"
```

---

## 3. DominantTerms (主导项分析)

> **映射到**: Research Mechanism - 核心假设识别
> **核心思想**: 80/20法则，找出决定结果的少数关键变量

**模板**：

```yaml
dominant_terms:
  - term:
      name: "[变量名]"
      pct: "[对结果的贡献百分比]"
      ctrl: "[可控性: HIGH/MEDIUM/LOW/NONE]"
      lever: "[可调节的杠杆]"
      evidence_grade: "[A/B/C]"
```

**投研应用示例**：

```yaml
dominant_terms:
  - term:
      name: "Robotaxi期权价值"
      pct: "55%"  # 占估值的55%
      ctrl: "NONE"  # 投资者不可控
      lever: "等待时间线明朗"
      evidence_grade: "C"  # 证据不足

  - term:
      name: "储能业务增速"
      pct: "25%"
      ctrl: "NONE"
      lever: "追踪部署数据"
      evidence_grade: "B"

  - term:
      name: "汽车业务利润率"
      pct: "15%"
      ctrl: "NONE"
      lever: "追踪ASP和成本"
      evidence_grade: "A"

  - term:
      name: "其他因素"
      pct: "5%"
      ctrl: "N/A"
      lever: "N/A"
      evidence_grade: "N/A"
```

**分析规则**：
- 累计贡献>80%的前几项为"主导项"
- 主导项的evidence_grade必须≥B才能PASS
- 主导项ctrl=NONE时，必须有明确的监控策略

---

## 4. Constraints (约束条件)

> **映射到**: Research Mechanism + Quality Gate

**模板**：

```yaml
constraints:
  - constraint:
      name: "[约束名称]"
      type: "Hard | Soft"
      penalty: "[违反的代价]"
      evidence_grade: "[A/B/C]"
```

**类型说明**：
- **Hard**: 绝对不可违反，违反即失败
- **Soft**: 可以违反但有代价，需权衡

**投研应用示例**：

```yaml
constraints:
  - constraint:
      name: "数据必须来自可验证来源"
      type: "Hard"
      penalty: "违反则整个分析作废"
      evidence_grade: "A"

  - constraint:
      name: "估值假设必须可证伪"
      type: "Hard"
      penalty: "无法证伪的假设不能作为核心依据"
      evidence_grade: "A"

  - constraint:
      name: "预测时间窗口≤3年"
      type: "Soft"
      penalty: "超过3年的预测不确定性显著增加，需降低权重"
      evidence_grade: "B"

  - constraint:
      name: "单一来源证据需交叉验证"
      type: "Soft"
      penalty: "未交叉验证的数据标记为C级"
      evidence_grade: "B"
```

---

## 5. PiGroups (无量纲分析)

> **映射到**: Valuation Engine - 比率分析
> **核心思想**: 用无量纲比率消除规模影响，找到普适规律

**模板**：

```yaml
pi_groups:
  - pi:
      name: "[无量纲群名称]"
      formula: "[比率公式]"
      range: "[正常范围]"
      interpretation: "[解读]"
```

**投研应用示例**：

```yaml
pi_groups:
  - pi:
      name: "PEG"
      formula: "PE / EPS_Growth_Rate"
      range: "[0.5, 2.0]"
      interpretation: "<1为低估, >2为高估(传统成长股)"

  - pi:
      name: "EV/Revenue to Growth"
      formula: "(EV/Revenue) / Revenue_Growth"
      range: "[0.2, 1.0]"
      interpretation: "高增长公司的估值锚"

  - pi:
      name: "Rule of 40"
      formula: "Revenue_Growth% + FCF_Margin%"
      range: "[40, ∞)"
      interpretation: "≥40为健康SaaS"

  - pi:
      name: "Robotaxi期权占比"
      formula: "Implied_Robotaxi_Value / Total_Market_Cap"
      range: "[0, 0.6]"
      interpretation: ">50%说明市场高度依赖Robotaxi假设"
```

---

## 6. Model_v0 (初始模型)

> **映射到**: Valuation Engine - 估值模型

**模板**：

```yaml
model_v0:
  equation: "[数学表达式]"
  sensitivity: "[最敏感的变量]"
  unknowns:
    - var: "[未知变量]"
      range: "[可能范围]"
      default: "[默认假设]"
```

**投研应用示例**：

```yaml
model_v0:
  equation: |
    Value = Auto_DCF + Energy_DCF + Robotaxi_Option + Optimus_Option
    where:
      Auto_DCF = Σ(Auto_FCF_t / (1+WACC)^t)
      Robotaxi_Option = P(success) × Option_Value × Time_Discount

  sensitivity: "P(Robotaxi_success)"  # 最敏感变量

  unknowns:
    - var: "P(Robotaxi_success)"
      range: "[0.1, 0.6]"
      default: 0.3

    - var: "Robotaxi_launch_year"
      range: "[2026, 2030]"
      default: 2027

    - var: "Terminal_auto_margin"
      range: "[0.08, 0.20]"
      default: 0.15

    - var: "Energy_CAGR"
      range: "[0.20, 0.50]"
      default: 0.35
```

---

## 7. TOC_Bottleneck (瓶颈约束)

> **映射到**: Research Mechanism - 核心矛盾识别
> **核心思想**: TOC (Theory of Constraints) - 找到限制系统产出的瓶颈

**模板**：

```yaml
toc_bottleneck:
  constraint: "[当前瓶颈]"
  throughput_metric: "[产出度量单位]"
  exploitation: "[如何最大化利用瓶颈]"
  subordination: "[其他环节如何配合]"
  elevation: "[如何提升瓶颈产能]"
```

**投研应用示例**：

```yaml
toc_bottleneck:
  constraint: "FSD技术成熟度"
  throughput_metric: "干预率 (次/万英里)"

  exploitation: |
    当前干预率~5次/万英里
    最大化利用: 聚焦高价值场景(高速公路)先商业化

  subordination: |
    其他业务配合:
    - 汽车销售提供数据采集
    - 储能提供现金流支撑研发

  elevation: |
    提升瓶颈:
    - 更多训练数据
    - 更大算力投入
    - 更好的传感器硬件
```

---

## 8. Paths (可行路径)

> **映射到**: Research Mechanism - 场景分析

**模板**：

```yaml
paths:
  - path:
      type: "[BULL | BASE | BEAR | BLACK_SWAN]"
      hypothesis: "[核心假设]"
      conditions:
        - "[必要条件1]"
        - "[必要条件2]"
      risks:
        - "[风险1]"
        - "[风险2]"
      milestones:
        - "[里程碑1]"
        - "[里程碑2]"
```

**投研应用示例**：

```yaml
paths:
  - path:
      type: "BULL"
      hypothesis: "Robotaxi 2026年规模商业化"
      conditions:
        - "干预率降至<1次/万英里"
        - "至少3个城市获得运营许可"
        - "单位经济学为正"
      risks:
        - "技术进度不及预期"
        - "监管审批延迟"
        - "致命事故风险"
      milestones:
        - "2026 Q1: 干预率<3次/万英里"
        - "2026 Q2: 首个城市许可"
        - "2026 H2: 商业化运营"

  - path:
      type: "BASE"
      hypothesis: "Robotaxi延迟至2027-2028"
      conditions:
        - "技术持续进步但未达商业化标准"
        - "储能业务成为增长主力"
      risks:
        - "竞争加剧侵蚀期权价值"
      milestones:
        - "2026: 储能收入超$20B"
        - "2027: Robotaxi小规模试点"

  - path:
      type: "BEAR"
      hypothesis: "Robotaxi长期搁置"
      conditions:
        - "监管全面收紧"
        - "技术瓶颈难以突破"
      risks:
        - "估值大幅重估"
      milestones:
        - "2026: 无实质性监管突破"
        - "2027: 竞品领先"
```

---

## 9. KillCriteria (终止信号)

> **映射到**: Quality Gate - Kill Switch

**模板**：

```yaml
kill_criteria:
  - signal:
      metric: "[监控指标]"
      threshold: "[阈值]"
      action: "[KILL | DEGRADE | REASSESS | MONITOR]"
```

**投研应用示例**：

```yaml
kill_criteria:
  - signal:
      metric: "致命事故数"
      threshold: ">0 (涉及Robotaxi)"
      action: "KILL - 立即重估全部论点"

  - signal:
      metric: "监管禁令"
      threshold: "任一主要市场全面禁止"
      action: "KILL - Robotaxi期权归零"

  - signal:
      metric: "干预率(Q2 2026)"
      threshold: ">5次/万英里"
      action: "DEGRADE - 降低Robotaxi概率假设"

  - signal:
      metric: "储能增速"
      threshold: "<20% YoY"
      action: "REASSESS - 重新评估增长引擎"

  - signal:
      metric: "汽车毛利率"
      threshold: "<12% 连续2季度"
      action: "MONITOR - 关注价格战影响"
```

---

## 10. 与Agent架构的整合

### Research Mechanism 整合

```yaml
research_mechanism_enhancement:
  new_capability: "fpac_protocol"

  output_fields_added:
    - "dominant_terms": "主导项分析(80/20)"
    - "constraints": "硬/软约束列表"
    - "toc_bottleneck": "当前瓶颈识别"
    - "paths": "可行路径(BULL/BASE/BEAR)"

  analysis_mode:
    - "fpac_first_principles": "第一性原理分析模式"
```

### Valuation Engine 整合

```yaml
valuation_engine_enhancement:
  new_capability: "fpac_modeling"

  output_fields_added:
    - "pi_groups": "无量纲比率分析"
    - "model_v0": "初始模型+敏感性"
    - "unknowns": "关键未知变量及范围"
```

### Quality Gate 整合

```yaml
quality_gate_enhancement:
  new_capability: "fpac_kill_criteria"

  kill_switch_mapping:
    - "kill_criteria.signal → reason_codes"
    - "threshold breach → FAIL/DEGRADE trigger"
```

---

## 11. 完整示例

**任务**: 用FPAC分析Tesla投资机会

```xml
<FPAC_Protocol>
  <Objective unit="USD/share" current="450" target="fair_value_range"
             limit="public_data_only; assumptions_must_be_falsifiable" />

  <Boundary>
    <IO inputs="revenue_growth, margin, wacc, robotaxi_prob"
        outputs="valuation_range, confidence, monitors" />
    <HardStop trigger="fraud_evidence OR fatal_accident" />
  </Boundary>

  <DominantTerms>
    <Term name="Robotaxi_option" pct="55%" ctrl="NONE" lever="wait" evidence_grade="C" />
    <Term name="Energy_growth" pct="25%" ctrl="NONE" lever="track" evidence_grade="B" />
    <Term name="Auto_margin" pct="15%" ctrl="NONE" lever="track" evidence_grade="A" />
  </DominantTerms>

  <Constraints>
    <Con name="Data_verifiable" type="Hard" penalty="analysis_void" evidence_grade="A" />
    <Con name="Forecast_horizon_3y" type="Soft" penalty="lower_weight" evidence_grade="B" />
  </Constraints>

  <PiGroups>
    <Pi name="Robotaxi_value_pct" formula="Robotaxi_IV / MCap" range="[0, 0.6]" />
    <Pi name="EV_Rev_to_Growth" formula="(EV/Rev) / Rev_Growth" range="[0.2, 1.0]" />
  </PiGroups>

  <Model_v0 equation="V = Auto_DCF + Energy_DCF + Robotaxi_Option" sensitivity="Robotaxi_prob">
    <Unknown var="Robotaxi_prob" range="[0.1, 0.6]" />
    <Unknown var="Energy_CAGR" range="[0.2, 0.5]" />
  </Model_v0>

  <TOC_Bottleneck constraint="FSD_maturity" throughput_metric="interventions/10k_miles" />

  <Paths>
    <Path type="BULL" hypothesis="Robotaxi_2026">
      <Cond>intervention_rate lt 1/10k</Cond>
      <Risk>regulatory_delay</Risk>
      <Step>Q1: rate lt 3; Q2: first_permit</Step>
    </Path>
    <Path type="BASE" hypothesis="Robotaxi_2027-28">
      <Cond>steady_progress</Cond>
      <Step>Energy_becomes_growth_driver</Step>
    </Path>
  </Paths>

  <KillCriteria>
    <Signal metric="fatal_accident" threshold="gt 0" action="KILL" />
    <Signal metric="intervention_rate_Q2" threshold="gt 5" action="DEGRADE" />
  </KillCriteria>
</FPAC_Protocol>
```

---

## Contract Compliance (v1.0合约兼容)

### Kill Criteria与Quality Gate映射

FPAC的KillCriteria直接映射到Quality Gate：

| FPAC Action | Quality Gate | 说明 |
|-------------|--------------|------|
| KILL | **FAIL** | 核心假设被证伪 |
| DEGRADE | **DEGRADE** | 关键指标触发警告 |
| (无触发) | **PASS** | 正常继续分析 |

### 质量门条件

```yaml
quality_gate:
  pass_criteria:
    - "FPAC 9步完成"
    - "DominantTerms(80/20)识别完成"
    - "Model_v0可量化"
    - "Paths(Bull/Base/Bear)定义完整"
    - "KillCriteria明确"

  degrade_criteria:
    - "Unknown变量范围过宽"
    - "TOC瓶颈不明确"
    - "部分Path缺少Step"

  fail_criteria:
    - "KillCriteria触发"
    - "Objective无法定义"
    - "Boundary无法划定"
```

### Blackboard输出字段

```yaml
blackboard_outputs:
  - field: "fpac_objective"
    type: "string"
    description: "分析目标"

  - field: "dominant_terms"
    type: "array"
    description: "80/20主导因素"

  - field: "model_unknowns"
    type: "array"
    schema: "[{var, range}]"

  - field: "toc_bottleneck"
    type: "object"
    schema: "{constraint, throughput_metric}"

  - field: "scenario_paths"
    type: "array"
    schema: "[{type, hypothesis, conditions, risks, steps}]"

  - field: "kill_criteria"
    type: "array"
    schema: "[{signal, threshold, action}]"
```

### 声明类型标注

| FPAC组件 | 声明类型 | 重要性 |
|----------|----------|--------|
| Objective | FACT | critical |
| Boundary | INFERENCE | critical |
| DominantTerms | INFERENCE | critical |
| Model_v0 | INFERENCE | critical |
| Paths | FORECAST | supporting |
| KillCriteria | INFERENCE | critical |

---

**版本**: v1.1
**合约版本**: skill_output_contract_v1.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已整合到架构，合约兼容
