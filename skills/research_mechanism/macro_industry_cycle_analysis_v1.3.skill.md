# 宏观行业周期分析框架 v1.1

> **Skill ID**: `research_mechanism.macro_industry_cycle_v1.1`
> **主路由**: Research Mechanism (60%)
> **辅助路由**: Data Integrity (25%), Quality Gate (15%)
> **来源**: 宏观和行业的周期分析skill.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

通过**五维打分体系**判断宏观/行业所处的周期位置，输出：
1. 周期相位：Top / Down / Bottom / Recovery
2. 置信度：High / Medium / Low
3. 触发器：升级/降级条件
4. 监控计划：日/周/月/季指标清单

---

## 1. 输入参数 (Inputs)

### 1.1 时间窗口与目标

```yaml
inputs:
  time_window:
    history: "10年 (默认)"
    forecast: "2-8季度"
    timezone: "ET (或用户指定)"

  target:
    type: "INDUSTRY | COMPANY | THEME"
    scope: "可选：上下游产业链 (供应商/渠道/客户)"

  calibration:
    rule: "优先使用10年历史分位数做阈值"
    fallback: "若无历史，使用默认阈值(heuristic)并标注行业适配风险"
```

### 1.2 宏观关键指标 (Macro Keys)

| Series ID | 名称 | 数据源 | 用途 |
|-----------|------|--------|------|
| **TCU** | Capacity Utilization: Total Industry | FRED | 产能利用率 |
| **T10Y3M** | 10Y-3M Treasury term spread | FRED | 收益率曲线 |
| **BAMLH0A0HYM2** | ICE BofA US High Yield OAS | FRED | 高收益利差 |
| **VIXCLS** | CBOE Volatility Index (VIX) | FRED | 波动率 |
| **DRTSCILM** | SLOOS: C&I loans (large/middle) | FRED | 银行贷款标准 |
| **DRTSCIS** | SLOOS: C&I loans (small firms) | FRED | 小企业贷款 |
| **DRTSCLCC** | SLOOS: Credit card loans (optional) | FRED | 消费信贷 |
| **NYFED_PROB_10Y3M** | NY Fed 12m recession probability | NY Fed | 衰退概率 |
| **FEAR_GREED** | CNN Fear & Greed (0-100, optional) | CNN | 情绪指标 |

### 1.3 公司/行业关键指标 (Company/Industry Keys)

| Field ID | 名称 | 内容 |
|----------|------|------|
| **CAPEX** | 资本支出 | 扩张 vs 维护；指引与取消 |
| **CAPACITY** | 产能 | 新增产能 / 利用率 (行业特定) |
| **ORDERS** | 订单 | 订单/积压/Book-to-Bill/交期/取消 |
| **INVENTORY** | 库存 | 库存天数 / 渠道库存 / 库销比 |
| **PRICE** | 价格 | 现货/合同价 / 折扣强度 / 毛利率 |

---

## 2. 五维打分体系 (Scoring)

**评分范围**: -2 到 +2

### 2.1 SUPPLY (供给) - 权重: 1.0

| 分数 | 状态 | 描述 |
|------|------|------|
| **+2** | 供给收缩明确 | 扩张Capex显著下修 / 项目取消↑ / 退出并购↑ / 新增产能推迟 |
| **+1** | 供给扩张放缓 | Capex增速下降 / 口径偏维护 / 产能利用率低位盘整 |
| **0** | 供给中性 | Capex与产能计划无明显变化或信号冲突 |
| **-1** | 供给偏热 | Capex上修 / 扩产项目加速 / 新增产能集中投放在途 |
| **-2** | 供给过热 | Capex飙升 + 扩产竞赛 + 进入者增多 + 纪律松动 |

**启发式阈值**:
- TCU > 80%: 常见"偏热"
- TCU < 75%: 常见"偏弱"
- (优先用历史分位校准)

### 2.2 INV_PRICE (库存/价格) - 权重: 1.0

**模型**: 订单×库存四格矩阵

```
          │  订单↑   │  订单↓
─────────┼─────────┼─────────
库存↑    │ 主动补库 │ 被动补库
库存↓    │ 被动去库 │ 主动去库
```

| 分数 | 状态 | 描述 |
|------|------|------|
| **+2** | 底部拐点 | 被动去库→主动去库/补库切换 / 取消率见顶回落 / 价格"跌幅收敛/止跌" |
| **+1** | 去库进行 | 库存增速下降 / 去库持续 / 价格仍弱但恶化放缓 / 毛利下滑放缓 |
| **0** | 中性 | 订单与库存信号不一致 / 价格与折扣无方向 |
| **-1** | 补库偏热 | 订单强 + 库存回补 / 折扣收窄但供给仍在扩 |
| **-2** | 过热/挤仓风险 | 主动补库 + 交期拉长 + 提价顺畅 + 毛利扩张 (且供给扩张同步) |

### 2.3 CREDIT (信用) - 权重: 1.0

| 分数 | 状态 | 描述 |
|------|------|------|
| **+2** | 信用明显缓和 | OAS快速回落且趋势确认 / SLOOS由"净收紧"转向"净宽松/不再收紧" |
| **+1** | 信用边际改善 | OAS见顶不再创新高 / SLOOS收紧幅度收敛 |
| **0** | 中性 | OAS/SLOOS无明显趋势或互相矛盾 |
| **-1** | 信用偏紧 | OAS走阔 / SLOOS净收紧为正且上升 |
| **-2** | 信用压力 | OAS急剧走阔 + 融资窗口收缩 + 再融资墙逼近 |

**启发式阈值**:
- OAS < 200bp: 常见"偏松"
- OAS > 300bp: 常见"偏紧"
- SLOOS > 0: 净收紧
- SLOOS ≤ 0: 不收紧/偏宽松

**假底警告**:
> 库存/供给似改善，但OAS继续走阔 OR SLOOS继续更紧 → **置信度下调并触发风控**

### 2.4 RATES_GATE (利率门槛) - 权重: 1.0

**目的**: 仅做"环境门槛"，不做水晶球择时

| 状态 | 条件 | 含义 |
|------|------|------|
| **RISK_HIGH** | T10Y3M ≤ 0 OR NYFED_PROB > 50% | 环境偏衰退 / 信用易恶化 |
| **RISK_LOW** | T10Y3M > 0 AND NYFED_PROB ≤ 50% | 环境中性/改善 |

### 2.5 SENTIMENT (情绪) - 权重: 0.5

| 分数 | 状态 | 条件 |
|------|------|------|
| **+1** | 恐惧窗口 | VIX > 30 OR FearGreed < 25 (仅加分，不可替代基本面) |
| **0** | 中性 | VIX 15-30 OR FearGreed 25-75 |
| **-1** | 贪婪窗口 | FearGreed > 75 (提示顶部/拥挤风险) |

---

## 3. 工作流程 (Workflow)

```yaml
workflow:
  s1_collect:
    action: "收集数据"
    sources:
      macro: "FRED, NYFed"
      industry: "财报, 价格, 订单, 库存, 产能"
    output: "数据包 + gaps列表"

  s2_score:
    action: "五维打分"
    dimensions: ["SUPPLY", "INV_PRICE", "CREDIT", "RATES_GATE", "SENTIMENT"]
    range: "[-2, +2]"
    output: "每维分数 + 理由 + 证据"

  s3_gate_check:
    action: "门槛/合取检查"
    rule: "RATES_GATE=high时，提高底部合取门槛"
    false_bottom: "强制降置信度"

  s4_phase_mapping:
    action: "相位映射"
    phases: ["Top", "Down", "Bottom", "Recovery"]
    output: "phase + confidence (High/Med/Low)"

  s5_triggers:
    action: "生成触发器"
    output: "升级/降级条件 + 反证条件 + 触发阈值"

  s6_monitoring:
    action: "监控计划"
    output: "按频率(日/周/月/季)的指标清单 + 阈值 + 数据源"
```

---

## 4. 相位判定规则 (Rules)

### 4.1 Bottom (底部)

```yaml
bottom:
  label: "Bottom/Bottoming (底部区间/反转前夜)"

  confluence:
    min_required: 3
    min_when_gate_high: 4  # RATES_GATE=high时要求更多

  conditions:
    - "SUPPLY ≥ +1 (供给收缩/扩张放缓)"
    - "INV_PRICE ≥ +1 (去库拐点/价格跌幅收敛或止跌)"
    - "CREDIT ≥ +1 (OAS回落或见顶 + SLOOS不再更紧)"
    - "(optional) SENTIMENT ≥ 0 (恐惧窗口加分)"
```

### 4.2 Recovery (复苏)

```yaml
recovery:
  label: "Recovery (复苏)"

  pattern: |
    INV_PRICE从+1→+2 且 订单回升
    价格/毛利确认改善
    同时 CREDIT ≥ 0 (不再紧缩)
```

### 4.3 Top (顶部)

```yaml
top:
  label: "Top/Peak (顶部/过热)"

  confluence:
    min_required: 3

  conditions:
    - "SUPPLY ≤ -1 (扩产竞赛/Capex上修/TCU高位)"
    - "INV_PRICE ≤ -1 (主动补库+提价顺畅/交期拉长)"
    - "CREDIT ≤ 0 且 OAS低分位 (融资极易/利差极窄)"
    - "(optional) SENTIMENT ≤ 0 (贪婪窗口加分)"
```

### 4.4 Down (下行)

```yaml
down:
  label: "Down (下行/衰退推进)"

  pattern: |
    INV_PRICE ≤ 0 且 CREDIT ≤ 0
    (去库但信用仍紧 / 或需求走弱)
```

---

## 5. 证伪条件 (Disconfirmers)

### 5.1 底部证伪

```yaml
disconfirmers_for_bottom:
  - "扩产重新上修/项目重启导致SUPPLY转负"
  - "库存再次累积或取消率再抬头"
  - "OAS继续走阔或SLOOS更紧 (假底)"
  - "利率环境继续恶化：倒挂加深或NYFed概率继续上行"
```

### 5.2 顶部证伪

```yaml
disconfirmers_for_top:
  - "Capex转弱/扩产取消 (SUPPLY转正)"
  - "进入去库格局、价格开始下行 (INV_PRICE转正)"
  - "OAS走阔或SLOOS明显转紧"
  - "恐惧窗口出现 (VIX上冲/情绪崩)"
```

---

## 6. 监控计划 (Monitoring)

| 频率 | 指标 | 数据源 |
|------|------|--------|
| **日度** | OAS (BAMLH0A0HYM2), T10Y3M, VIX (VIXCLS), Fear&Greed (optional) | FRED, CNN |
| **周度** | 行业现货价, 运费/商品价差, 持仓/资金流 (if available) | Bloomberg, 行业报告 |
| **月度** | 订单/库存代理 (PMI/ISM分项, 行业出货), 库销比 | ISM, 行业协会 |
| **季度** | SLOOS (DRTSCILM/DRTSCIS), 公司Capex/指引, 产能增减 | FRED, 财报 |

---

## 7. 与Agent架构的整合

### Research Mechanism 整合

```yaml
research_mechanism_enhancement:
  new_capability: "macro_industry_cycle_analysis"

  analysis_mode:
    - "cycle_phase_detection": "周期相位检测"
    - "five_dimension_scoring": "五维打分"

  output_fields_added:
    - "cycle_phase": "Top | Down | Bottom | Recovery"
    - "phase_confidence": "High | Medium | Low"
    - "dimension_scores": {SUPPLY, INV_PRICE, CREDIT, RATES_GATE, SENTIMENT}
    - "confluence_check": "满足条件数/所需条件数"
```

### Data Integrity 整合

```yaml
data_integrity_enhancement:
  new_capability: "macro_data_collection"

  data_sources_added:
    - "FRED API": "TCU, T10Y3M, OAS, VIX, SLOOS"
    - "NY Fed": "Recession probability"
    - "Industry sources": "Capex, Orders, Inventory"

  monitoring_integration:
    - "日度/周度/月度/季度自动拉取"
    - "历史分位数计算"
    - "阈值突破警报"
```

### Quality Gate 整合

```yaml
quality_gate_enhancement:
  new_capability: "cycle_disconfirmers"

  kill_switch_mapping:
    - "假底检测 → DEGRADE trigger"
    - "证伪条件触发 → reason_code: CYCLE_DISCONFIRMED"

  gate_rules_added:
    - "RATES_GATE=high时，底部判定需4个条件而非3个"
    - "假底警告触发时，强制降置信度"
```

---

## 8. 输出模板

```yaml
cycle_analysis_output:
  target: "半导体设备行业"
  as_of_date: "2026-01-27"

  dimension_scores:
    SUPPLY: {score: +1, reason: "Capex下修20%，扩产项目延期", evidence: "LRCX/AMAT财报"}
    INV_PRICE: {score: +1, reason: "库存增速放缓，价格跌幅收敛", evidence: "渠道调研"}
    CREDIT: {score: 0, reason: "OAS持平，SLOOS边际改善", evidence: "FRED最新数据"}
    RATES_GATE: {status: "RISK_LOW", reason: "T10Y3M=0.5%, NYFED_PROB=28%"}
    SENTIMENT: {score: +1, reason: "VIX=32，恐惧窗口", evidence: "CBOE"}

  phase:
    current: "Bottom"
    confidence: "Medium"
    confluence: "3/3 (满足底部条件)"

  triggers:
    upgrade_to_recovery:
      - "INV_PRICE → +2 (订单确认回升)"
      - "价格/毛利连续2季度改善"
    downgrade_to_down:
      - "OAS继续走阔>50bp"
      - "SLOOS再次转紧"
      - "扩产项目重启"

  monitoring_plan:
    daily: ["OAS", "VIX"]
    weekly: ["设备现货价"]
    monthly: ["订单/出货比"]
    quarterly: ["SLOOS", "Capex指引"]

  disconfirmers:
    - "扩产重启 → 底部判断失效"
    - "OAS>350bp → 假底风险"

  data_gaps:
    - "中国本土设备商Capex数据缺失"
    - "渠道库存仅有抽样数据"
```

---

## 9. 投研应用示例

**任务**: 判断半导体设备行业周期位置

```yaml
# Step 1: 收集数据
macro_data:
  TCU: 76.2% (历史分位: 45%)
  T10Y3M: 0.5%
  OAS: 285bp (历史分位: 60%)
  VIX: 32
  SLOOS: -5% (转为净宽松)
  NYFED_PROB: 28%

industry_data:
  CAPEX: "LRCX下修15%, AMAT下修20%"
  CAPACITY: "2026年新增产能推迟6个月"
  ORDERS: "Book-to-bill 0.92→0.98"
  INVENTORY: "渠道库存下降8%"
  PRICE: "设备均价跌幅从-15%收敛至-5%"

# Step 2: 五维打分
scores:
  SUPPLY: +1  # Capex下修，供给扩张放缓
  INV_PRICE: +1  # 去库进行，价格跌幅收敛
  CREDIT: +1  # SLOOS转宽松，OAS见顶
  RATES_GATE: RISK_LOW  # 曲线正常，衰退概率低
  SENTIMENT: +1  # VIX>30 恐惧窗口

# Step 3: 相位判定
phase_check:
  bottom_conditions_met: 3  # SUPPLY≥+1, INV_PRICE≥+1, CREDIT≥+1
  required: 3
  gate_status: RISK_LOW

verdict:
  phase: "Bottom"
  confidence: "Medium"
  rationale: "供给收缩确认，去库进行，信用边际改善，情绪恐惧"

# Step 4: 触发器
triggers:
  upgrade: "Book-to-bill>1.05 + 价格止跌确认"
  downgrade: "OAS>350bp OR 扩产项目重启"
```

---

## Contract Compliance v2.0

### Core Principles Alignment

| 原则 | 本Skill实现 |
|------|-------------|
| **Contract-first** | 五维打分结构化输出 |
| **Eval-first** | 相位判定有量化条件 |
| **SRE-first** | RATES_GATE作为环境门槛 |

### Claims Type Annotation (5类)

| 组件 | Claim类型 | 重要性 | 要求 |
|------|-----------|--------|------|
| 五维评分 | FACT_DESCRIPTIVE | critical | 需Tier 1数据源 |
| 相位判定 | CAUSAL_INFERENCE | critical | 需confluence验证 |
| 触发器 | CAUSAL_INFERENCE | critical | 需历史回测 |
| 监控计划 | FACT_DESCRIPTIVE | supporting | 需数据源明确 |
| 证伪条件 | ACTION_RECOMMENDATION | critical | 需可观测阈值 |
| 投资含义 | VALUATION_IMPLIED | supporting | 需风险标注 |

### Evidence Registry (Dual Threshold)

```yaml
evidence_requirements:
  quantity_threshold:
    tier_1_min: 3  # FRED/官方数据至少3个
    total_min: 5   # 总证据≥5

  coverage_threshold:
    key_nodes: ["SUPPLY", "INV_PRICE", "CREDIT", "RATES_GATE"]
    min_coverage: 0.75  # ≥75%关键维度有数据

  tiering:
    tier_1: "FRED、NYFed、SEC文件、财报"
    tier_2: "机构报告、行业协会数据"
    tier_3: "媒体、社交媒体情绪"

  data_freshness:
    daily: ["OAS", "VIX", "T10Y3M"]
    monthly: ["TCU", "SLOOS"]
    quarterly: ["公司Capex指引"]
```

### Kill Switches

**Mandatory (3个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-EVIDENCE-FABRICATION | 证据造假/幻觉检测 | 3.0 | 任一维度数据无法溯源 |
| KS-TOOL-OVERREACH | 工具越权 | 3.0 | 调用未授权外部API |
| KS-HIGH-RISK-OUTPUT | 高风险输出 | 3.0 | 投资建议未标注周期风险 |

**Domain-Specific (4个)**

| ID | 条件 | 权重 | 阈值 |
|----|------|------|------|
| KS-CYCLE-001 | RATES_GATE触发RISK_HIGH | 3.0 | T10Y3M≤0 OR NYFED_PROB>50% |
| KS-CYCLE-002 | 信用市场冻结 | 3.0 | OAS>500bp OR 信用事件 |
| KS-CYCLE-003 | 假底检测 | 2.5 | 库存改善但OAS继续走阔 |
| KS-CYCLE-004 | 数据严重滞后 | 2.0 | 关键数据>60天未更新 |

### Threat Model

```yaml
threat_model:
  risk_types:
    - "幻觉风险: 虚构宏观数据"
    - "假底陷阱: 过早判断周期拐点"
    - "数据滞后: 使用过时数据做判断"

  protection:
    - "所有宏观数据必须标注数据源和日期"
    - "假底警告机制强制检查"
    - "RATES_GATE作为环境前置检查"

  content_zones:
    green: "数据收集、维度评分"
    yellow: "相位判定、触发器设定"
    red: "投资建议"
```

### Observability & Replay

```yaml
observability:
  run_id: "自动生成UUID"
  tool_calls: "记录所有FRED/数据API调用"
  gate_scores: "记录五维评分和confluence"

replay:
  enabled: true
  inputs_logged: "目标行业、时间窗口、数据源"
  outputs_logged: "完整周期分析结构"
```

### Budget

```yaml
budget:
  tokens:
    soft: 12000
    hard: 20000
    critical: 25000
  tool_calls:
    soft: 8
    hard: 15
  latency_ms:
    soft: 30000
    hard: 60000
```

### Quality Checks

```yaml
quality_checks:
  P0_blocking:
    - "5维度评分完成"
    - "相位判定明确"
    - "RATES_GATE检查完成"
    - "无Kill Switch触发"

  P1_important:
    - "触发器(upgrade/downgrade)定义"
    - "证伪条件(disconfirmers)明确"
    - "监控计划完整"

  pass_rule: "P0: 100%, P1: ≥85%"

  hard_fail_triggers:
    - "RATES_GATE = RISK_HIGH"
    - "关键数据缺失无法评分"
    - "任一Mandatory Kill Switch触发"
```

### Red Flags (Required)

```yaml
red_flags:
  - flag: "RF-CYCLE-001"
    condition: "SUPPLY与INV_PRICE评分方向相反"
    action: "标注分歧，降低置信度"

  - flag: "RF-CYCLE-002"
    condition: "部分维度数据滞后>30天"
    action: "标注数据时效风险"

  - flag: "RF-CYCLE-003"
    condition: "假底信号 (库存改善但信用仍紧)"
    action: "强制降置信度至Low"
```

### Falsification Design

```yaml
falsification:
  alternative_hypotheses:
    - "当前判断为Bottom，但可能是Down的反弹"
    - "信用改善可能是短期技术因素"
    - "供给收缩可能不足以抵消需求下滑"

  sensitivity_tests:
    - "confluence条件从3个改为4个"
    - "RATES_GATE阈值调整±10bp"
    - "OAS阈值调整±50bp"

  disconfirming_evidence_plan:
    - "周度: 监控OAS和VIX变化"
    - "月度: 检查库存和订单趋势"
    - "季度: 验证Capex指引变化"
```

### Eval & Regression

```yaml
eval:
  self_score:
    dimensions:
      - "数据完整性 (5维覆盖)"
      - "相位判定准确性"
      - "触发器可操作性"
    range: "[0, 1]"

  calibration_hook:
    trigger: "输出完成后"
    check: "历史相位判定vs实际周期回溯"

  golden_cases:
    - "半导体设备行业周期分析"
    - "房地产行业周期分析"
```

### Evaluation Alignment

| 维度 | 权重 | 本Skill评估点 |
|------|------|---------------|
| 深度 | 25% | 五维穿透至机制层 |
| 证据 | 30% | FRED/官方数据占比 |
| 可操作 | 20% | 触发器可监控可执行 |
| 一致性 | 15% | 五维评分逻辑一致 |
| 时效性 | 10% | 数据时效符合频率要求 |

### DEGRADE Mode Playbook

```yaml
degrade_mode:
  triggers:
    - "部分维度数据滞后>30天"
    - "评分分歧大(如SUPPLY vs INV_PRICE矛盾)"
    - "置信度Medium"

  actions:
    - "输出标注: [DEGRADE] 周期判断受限"
    - "列出具体数据缺口"
    - "提供数据更新时间表"

  recovery:
    - "更新滞后数据"
    - "解决评分分歧"
    - "获取更多交叉验证数据"
```

### Blackboard Outputs (v2.0)

```yaml
blackboard_outputs:
  - field: "cycle_phase"
    type: "enum"
    values: ["Top", "Down", "Bottom", "Recovery"]
    claim_type: "CAUSAL_INFERENCE"

  - field: "cycle_scores"
    type: "object"
    schema: "{supply, inv_price, credit, rates_gate, sentiment}"
    claim_type: "FACT_DESCRIPTIVE"

  - field: "cycle_confidence"
    type: "enum"
    values: ["High", "Medium", "Low"]
    claim_type: "CAUSAL_INFERENCE"

  - field: "cycle_triggers"
    type: "object"
    schema: "{upgrade, downgrade}"
    claim_type: "ACTION_RECOMMENDATION"

  - field: "monitoring_plan"
    type: "object"
    schema: "{daily[], weekly[], monthly[], quarterly[]}"
    claim_type: "FACT_DESCRIPTIVE"

  - field: "investment_implication"
    type: "string"
    description: "投资含义"
    claim_type: "VALUATION_IMPLIED"
```

### Quality Gate Mapping

| 周期相位 | Quality Gate | 投资含义 |
|----------|--------------|----------|
| Bottom | **PASS** | 逆向布局窗口 |
| Recovery | **PASS** | 持有/加仓 |
| Top | **DEGRADE** | 谨慎，准备退出 |
| Down | **DEGRADE** | 观望/减仓 |
| (Gate=RISK_HIGH) | **FAIL** | 不参与周期判断 |

---

**版本**: v1.3
**合约版本**: skill_design_standard_v2.0
**归档位置**: `skills/research_mechanism/`
**状态**: 已整合到架构，v2.0合约兼容
