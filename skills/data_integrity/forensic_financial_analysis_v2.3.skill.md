# 财务报表取证分析框架 v2.1

> **Skill ID**: `data_integrity.forensic_financial_v2.1`
> **主路由**: Data Integrity (60%)
> **辅助路由**: Research Mechanism (30%) + Quality Gate (10%)
> **来源**: forensic-financial.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

CFA风格的财务报表取证分析，覆盖：
- 盈利质量（Earnings Quality）
- 现金转换（Cash Conversion）
- 营运资金操纵（WC Manipulation）
- 资本化游戏（Capitalization Games）
- GAAP ↔ Non-GAAP调整
- 杠杆/流动性（Leverage/Liquidity）
- 跨周期韧性（Cross-cycle Durability）
- 管理层激励（Management Incentives）
- 估值 vs 质量匹配

**核心原则**：必须引用财报/字段，不编造数据。

---

## 适用场景

| 触发条件 | 说明 |
|----------|------|
| **Rev↑ but OCF/FCF↓** | 收入增长但现金流下降 |
| **AR/Inv balloon** | 应收账款/存货异常膨胀 |
| **Large addbacks** | 大额非经常性加回 |
| **"One-time" repeats** | "一次性"费用反复出现 |
| **Premium valuation** | 高估值需要盈利质量验证 |
| **Cycle turning** | 周期转折点验证 |

---

## 数据工具

```yaml
tools:
  bb_get_financials:
    input: "ticker, period_type, start, end, statements"
    output: "tables, fields, source, timestamp"

  bb_get_filing:
    input: "ticker, filing_type, section_query"
    output: "excerpts, citations, source"

  bb_get_market_data:
    input: "ticker, fields, as_of"
    output: "table, source"

  bb_get_actions:
    input: "ticker, fields, start, end"
    output: "table, source"
```

---

## 10步工作流

### Step 1: 数据拉取

```
拉取3-10年数据（年度 + TTM如有）:
- Income Statement (IS)
- Balance Sheet (BS)
- Cash Flow Statement (CF)

□ 列出缺失字段
□ 缺失字段对应的检查项标记为 NotTestable
```

---

### Step 2: 三角验证（Triangle）

**核心**：Income ↔ Cash ↔ BS 交叉比对

```
增长比较:
┌─────────────────────────────────────────────────┐
│  Revenue Growth  vs  OCF Growth  vs  FCF Growth │
│  Net Income Growth  vs  OCF Growth              │
│  EBIT Growth  vs  OCF Growth                    │
└─────────────────────────────────────────────────┘

NI → OCF 桥接分解:
Net Income
+ D&A (非现金)
+ SBC (非现金)
± 其他非现金调整
± ΔWorking Capital  ← 重点关注
= Operating Cash Flow

⚠️ 红旗: "OCF via WC pull" = 通过压缩营运资金虚增OCF
```

**速查表**：
| 指标 | 公式 | 健康阈值 | 红旗阈值 |
|------|------|----------|----------|
| OCF/Revenue | OCF / Revenue | >10% | <5% |
| FCF/Net Income | FCF / NI | >50% | <0% |
| Cash Conversion | OCF / EBITDA | >70% | <50% |

---

### Step 3: 收入/应收账款分析（Revenue/AR）

**核心指标**：

| 指标 | 公式 | 说明 |
|------|------|------|
| **DSO** | (AR / Revenue) × 365 | 应收账款周转天数 |
| **ΔAR vs ΔRev** | AR增速 vs 收入增速 | AR增速>收入增速=红旗 |
| **Allowance Ratio** | 坏账准备 / AR | 下降=红旗 |
| **Write-off Rate** | 实际核销 / AR | 趋势变化 |

**深度检查**：
- [ ] Contract Assets（合同资产）趋势
- [ ] Deferred Revenue（递延收入）趋势
- [ ] Unbilled Receivables（未开票应收）

**如果红旗** → 引用财报中的 "Revenue Recognition" 或 "Accounts Receivable" 注释

```yaml
ar_analysis:
  dso_current: "__ days"
  dso_3y_avg: "__ days"
  dso_trend: "↑/↓/→"

  ar_growth: "__%"
  revenue_growth: "__%"
  gap: "__%"  # AR增速 - Revenue增速

  allowance_ratio: "__%"
  allowance_trend: "↑/↓/→"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[10-K FY__ Note X]"
```

---

### Step 4: 存货/应付/应计分析（Inventory/AP/Accruals）

**核心指标**：

| 指标 | 公式 | 说明 |
|------|------|------|
| **DIO** | (Inventory / COGS) × 365 | 存货周转天数 |
| **ΔInv vs ΔCOGS** | 存货增速 vs COGS增速 | Inv增速>COGS=红旗 |
| **DPO** | (AP / COGS) × 365 | 应付账款周转天数 |
| **AP Stretch** | DPO异常延长 | 供应商融资 |
| **Accruals Proxy** | (NI - OCF) / Total Assets | 高=低质量盈利 |

**深度检查**：
- [ ] Inventory Reserves（存货减值准备）变化
- [ ] Inventory Write-downs（存货核销）
- [ ] Warranty/Litigation Accruals（质保/诉讼计提）

```yaml
inventory_analysis:
  dio_current: "__ days"
  dio_trend: "↑/↓/→"

  inv_growth: "__%"
  cogs_growth: "__%"
  gap: "__%"

  dpo_current: "__ days"
  dpo_trend: "↑/↓/→"  # ↑ = AP stretch

  accruals_proxy: "__%"
  accruals_trend: "↑/↓/→"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[10-K FY__ Note X]"
```

---

### Step 5: 资本化分析（Capitalization）

**红旗信号**：

| 信号 | 描述 | 影响 |
|------|------|------|
| 资本化成本↑ | 本应费用化的支出被资本化 | 虚增利润 |
| Capex vs D&A错配 | Capex远大于D&A | 折旧不足 |
| 摊销政策变更 | 延长摊销年限 | 虚增利润 |
| 软件/开发成本资本化 | 研发费用资本化比例异常 | 虚增利润 |

**检查项**：
- [ ] Capitalized Software Costs
- [ ] Capitalized Interest
- [ ] Capitalized Development Costs
- [ ] Useful Life Changes（使用寿命变更）
- [ ] Capex / D&A Ratio趋势

```yaml
capitalization_analysis:
  capex_to_da: "__x"  # >1.5x持续多年=检查
  capex_to_da_trend: "↑/↓/→"

  capitalized_costs:
    software: "$__M (vs prior $__M)"
    development: "$__M"
    other: "$__M"

  useful_life_changes: "[有/无]"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[10-K FY__ Accounting Policies]"
```

---

### Step 6: Non-GAAP/一次性项目分析

**核心检查**：

| 检查项 | 方法 | 红旗 |
|--------|------|------|
| GAAP ↔ Non-GAAP差距 | 计算差距占比 | 差距>30%且持续 |
| "一次性"重复 | 追踪历史一次性项目 | 每年都有"一次性" |
| SBC经济成本 | SBC/Revenue + 稀释率 | SBC>10% Revenue |
| 回购 vs 稀释 | 回购是否抵消SBC稀释 | 净稀释持续 |

**SBC分析**：
```
SBC经济成本 = SBC费用 + 稀释成本

稀释抵消率 = Buyback金额 / SBC金额
如果 < 1: 净稀释
如果 > 1: 净减少股份
```

**引用要求**：必须引用Non-GAAP Reconciliation表

```yaml
non_gaap_analysis:
  gaap_ni: "$__M"
  non_gaap_ni: "$__M"
  delta: "$__M (__%)"

  major_addbacks:
    - item: "Restructuring"
      amount: "$__M"
      recurring: "[Y/N]"  # 过去3年出现几次
    - item: "SBC"
      amount: "$__M"
      sbc_to_revenue: "__%"

  dilution:
    sbc_shares: "__M"
    buyback_shares: "__M"
    net_dilution: "__M"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[10-K FY__ Non-GAAP Reconciliation]"
```

---

### Step 7: 杠杆/流动性分析（Leverage/Liquidity）

**核心指标**：

| 指标 | 公式 | 健康阈值 |
|------|------|----------|
| Net Debt | Total Debt - Cash | 行业相关 |
| Net Debt/EBITDA | Net Debt / EBITDA | <3x |
| Interest Coverage | EBIT / Interest | >5x |
| Current Ratio | CA / CL | >1.5x |
| Quick Ratio | (CA - Inv) / CL | >1x |

**深度检查**：
- [ ] Debt Maturities（债务到期分布）
- [ ] Operating Leases（经营租赁负债）
- [ ] Commitments（承诺）
- [ ] Contingencies（或有负债）
- [ ] Cash Taxes vs Pretax Income（实际税负）

```yaml
leverage_analysis:
  net_debt: "$__M"
  net_debt_ebitda: "__x"
  interest_coverage: "__x"

  debt_maturities:
    within_1y: "$__M"
    1_3y: "$__M"
    3_5y: "$__M"
    beyond_5y: "$__M"

  lease_obligations: "$__M"
  other_commitments: "$__M"
  contingencies: "[描述]"

  cash_tax_rate: "__%"
  gaap_tax_rate: "__%"
  gap: "__%"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[10-K FY__ Note X]"
```

---

### Step 8: 跨周期分析（Cross-cycle）

**核心问题**：盈利和现金流改善是结构性的还是营运资金驱动的？

**检查项**：
- [ ] Margin Stability（利润率稳定性）
- [ ] OCF/FCF Stability（现金流稳定性）
- [ ] Worst-period Cash Conversion（最差时期现金转换）

```yaml
cross_cycle_analysis:
  window_years: "FY__ to FY__"

  margin_range:
    gross_margin: "__% to __%"
    operating_margin: "__% to __%"

  cash_conversion:
    best_year: "__%"
    worst_year: "__%"
    avg: "__%"

  stress_proxy: "[描述最差时期表现]"

  durability_notes: |
    [结构性改善 vs WC驱动改善的判断]

  flag: "[RED/YELLOW/GREEN]"
```

---

### Step 9: 管理层信号分析（Management Signals）

**检查项**：

| 信号 | 数据来源 | 红旗 |
|------|----------|------|
| SBC/激励结构 | DEF 14A | 激励与股东利益错配 |
| 内部人交易 | Form 4 | 集中卖出 |
| 回购质量 | CF Statement | 举债回购 |
| 连续M&A | 历史公告 | 用M&A掩盖有机增长疲软 |

```yaml
management_analysis:
  sbc_structure:
    description: "[激励结构描述]"
    alignment: "[High/Med/Low]"

  insider_activity:
    recent_buys: "__shares"
    recent_sells: "__shares"
    net: "[Net Buy/Net Sell]"
    cluster: "[Y/N]"  # 是否集中交易

  buyback_quality:
    fcf_funded: "__%"
    debt_funded: "__%"

  ma_pattern:
    deals_3y: "__"
    organic_growth_ex_ma: "__%"

  flag: "[RED/YELLOW/GREEN]"
  evidence_ref: "[DEF 14A / Form 4]"
```

---

### Step 10: 估值健全性检查（Valuation Sanity）

**核心问题**：估值溢价是否与盈利质量匹配？

**组合检查**：
```
高估值 + 弱现金转换 + 大额加回 = 脆弱性红旗
```

**指标**：
| 指标 | 说明 |
|------|------|
| EV/Sales | 销售倍数 |
| EV/EBITDA | EBITDA倍数 |
| FCF Yield | FCF / Market Cap |
| Quality-Adjusted FCF Yield | 调整后FCF / Market Cap |

```yaml
valuation_sanity:
  multiples:
    ev_sales: "__x"
    ev_ebitda: "__x"
    fcf_yield: "__%"

  quality_adjustment:
    gaap_fcf: "$__M"
    adjusted_fcf: "$__M"  # 去除一次性WC收益等
    adjusted_fcf_yield: "__%"

  fragility_flags:
    - "[红旗1]"
    - "[红旗2]"

  commentary: |
    [估值与质量匹配度评价]
```

---

## 核心信号清单

### 必检信号（Core）

| 类别 | 信号 |
|------|------|
| 现金转换 | OCF/Rev, FCF/NI |
| 应收 | DSO, ΔAR vs ΔRev |
| 存货 | DIO, ΔInv vs ΔCOGS |
| 应付 | DPO |
| 应计 | (NI-OCF)/Assets |
| Non-GAAP | GAAP↔NonGAAP% |
| SBC | SBC/Rev, dilution |
| 杠杆 | Interest coverage, lease/commitments |

### 可选信号（Optional）

| 工具 | 用途 | 注意 |
|------|------|------|
| Beneish M-Score | 盈余操纵筛选 | 仅作筛选，不能单独定论 |
| Altman Z-Score | 破产风险筛选 | 仅作筛选，不能单独定论 |

---

## 输出模板：取证卡片（Forensic Card）

```yaml
forensic_card:
  company: "[公司名称]"
  ticker: "[代码]"
  analysis_date: "[日期]"
  data_through: "[数据截止]"

  overall:
    severity: "[LOW/MED/HIGH]"
    confidence: "[LOW/MED/HIGH]"
    one_liner: "[一句话总结]"
    limitations: "[数据限制说明]"

  leading_red_flags:
    - category: "[Cash/Rev-AR/Inv/AP-Accruals/Cap/NonGAAP/Leverage/Cycle/Mgmt/Val]"
      signal: "[信号描述]"
      metrics: "[具体数字]"
      why: "[为什么是红旗]"
      evidence_ref: "[10-K FY__ Field/Section]"

  lagging_confirmations:
    - what: "[确认项]"
      evidence_ref: "[10-K FY__ Section]"

  normalization:
    - item: "[调整项]"
      treatment: "[REMOVE/RECLASS/FLAG]"
      evidence_ref: "[10-K FY__ Section]"

  alternatives:
    - explain: "[另一种解释]"
      tests: "[如何验证]"
      needed_data: "[需要的数据]"

  cross_cycle:
    window_years: "[FY__ to FY__]"
    stress_proxy: "[最差时期表现]"
    durability_notes: "[韧性判断]"

  management:
    notes: "[管理层信号]"
    evidence_ref: "[来源]"

  valuation:
    multiples: "[EV/S, EV/EBITDA, FCF Yield]"
    commentary: "[估值与质量匹配评价]"
    fragility_flags: "[脆弱性红旗]"

  evidence_checklist:
    docs: "[已检查的文件]"
    fields: "[已检查的字段]"

  next_actions:
    - priority: 1
      action: "[下一步行动]"
    - priority: 2
      action: "[下一步行动]"
    - priority: 3
      action: "[下一步行动]"
```

---

## 护栏规则（Guardrails）

### 规则1: 不编造数据
```
每个HIGH级别红旗必须有财报/字段引用:
- 期间 (FY2025 Q3)
- 来源 (10-K, 10-Q, 8-K)
- 具体位置 (Note 5, MD&A Section)
```

### 规则2: MECE分类
```
10个桶，互斥且完整:
1. Cash (现金转换)
2. Rev/AR (收入/应收)
3. Inv (存货)
4. AP/Accruals (应付/应计)
5. Capitalization (资本化)
6. Non-GAAP/One-offs (非GAAP/一次性)
7. Leverage (杠杆)
8. Cross-cycle (跨周期)
9. Mgmt (管理层)
10. Valuation (估值)
```

### 规则3: 语气规范
```
✓ "risk" / "anomaly" / "verify"
✗ "fraud" / "manipulation" / "lying"

必须区分:
- Leading signal (领先信号)
- Lagging confirmation (滞后确认)
- Benign alternative (良性解释)
```

---

## 与Agent架构整合

### Data Integrity 整合（主）

```yaml
data_integrity_integration:
  capability: "forensic_financial"

  triggers:
    - "盈利质量分析"
    - "现金流验证"
    - "财务取证"
    - "应收账款分析"
    - "存货分析"

  validation_rules:
    - "每个红旗必须有财报引用"
    - "区分领先信号和滞后确认"
    - "提供良性替代解释"

  output_artifact: "forensic_card"
```

### Research Mechanism 整合（辅）

```yaml
research_mechanism_integration:
  capability: "cross_cycle_analysis"

  cross_cycle_fields:
    - "margin_stability"
    - "cash_conversion_durability"
    - "structural_vs_wc_driven"
```

### Quality Gate 整合（辅）

```yaml
quality_gate_integration:
  capability: "evidence_citation"

  citation_rules:
    - "HIGH severity → 必须有filing引用"
    - "所有数字必须标注来源和期间"
```

---

## Contract Compliance v2.0

> 本节确保skill输出符合 `skills/_common/skill_design_standard_v2.0.yaml`

### 核心原则对齐 (Core Principles)

```yaml
core_principles_alignment:
  contract_first:
    input_validation: "财报数据完整性检查 + 数据新鲜度验证"
    workflow: "10步工作流明确定义"
    output_schema: "forensic_card标准格式"
    quality_gates: "PASS/DEGRADE/FAIL三态"
    degrade_circuit_break: "数据不足时降级，数据造假时熔断"

  eval_first:
    golden_cases: "3个标准案例(健康公司/红旗公司/数据不足)"
    scorers: "P0/P1/P2通过率 + 证据覆盖率"
    replay: "tool_calls序列可回放"

  sre_first:
    degrade_path: "简单可执行(数据不足→限制结论范围)"
    fast_close: "标记unusable_sections并继续"
    drill_frequency: "每周演练降级路径"
```

### 声明类型 (5-Type Claims)

| 声明示例 | 类型 | 重要性 | 特殊要求 |
|----------|------|--------|----------|
| "FY25 OCF/Revenue = 8%" | **FACT_DESCRIPTIVE** | supporting | min_evidence_tier: 1 |
| "现金转换下降因WC收紧" | **CAUSAL_INFERENCE** | critical | 必须列替代假说 |
| "预计下季度继续恶化" | **FORECAST** | optional | 必须做敏感性测试 |
| "当前估值隐含OCF/Rev>12%" | **VALUATION_IMPLIED** | supporting | min_evidence_tier: 2 |
| "建议降低持仓" | **ACTION_RECOMMENDATION** | optional | min_evidence_tier: 2 |

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
        - "现金转换三角验证"
        - "应收/存货/应付分析"
        - "Non-GAAP调整"
        - "杠杆/流动性"
      fallback: "未覆盖→DEGRADE with RC-EVIDENCE-002"

  tier_mapping:
    tier_1: "10-K, 10-Q, 8-K, SEC文件"
    tier_2: "Earnings Call, 分析师报告, 行业数据"
    tier_3: "媒体报道, 专家访谈, 社交媒体"
```

### Kill Switches (3 Mandatory + Domain-Specific)

```yaml
kill_switches:
  # 强制3类
  mandatory:
    - id: "KS-EVIDENCE-FABRICATION"
      condition: "引用的SEC文件不存在或数据与原文不符"
      detection: "evidence_hash验证 + 原文交叉检查"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-TOOL-OVERREACH"
      condition: "调用非白名单工具或参数越界"
      detection: "tool_whitelist: [bb_get_financials, bb_get_filing, bb_get_market_data]"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-HIGH-RISK-OUTPUT"
      condition: "输出包含'fraud'/'manipulation'等禁用词"
      detection: "content_filter检查"
      action: "FAIL或转人审"
      current_status: "GREEN"

  # 领域特定
  domain_specific:
    - id: "KS-FORENSIC-001"
      condition: "检测到公司重述财报或SEC调查"
      threshold: "任何重述或调查公告"
      action: "DEGRADE + 标记HIGH_RISK"
      monitoring_metric: "8-K监控"

    - id: "KS-FORENSIC-002"
      condition: "OCF/NI < 0.3 连续3年"
      threshold: "盈利质量极低"
      action: "DEGRADE + P0红旗"
      monitoring_metric: "现金转换率"
```

### 威胁模型 (Threat Model)

```yaml
threat_model:
  risks:
    prompt_injection:
      description: "输入公司名称包含恶意指令"
      detection: "输入sanitization"
      mitigation: "拒绝执行"

    evidence_fabrication:
      description: "编造财务数据或引用"
      detection: "每个数据点必须有filing引用"
      mitigation: "FAIL + 标记"

    confirmation_bias:
      description: "只找支持预设结论的证据"
      detection: "强制检查良性替代解释(alternatives)"
      mitigation: "无alternatives则DEGRADE"

    data_staleness:
      description: "使用过期财务数据"
      detection: "数据新鲜度检查(>180天=EXPIRED)"
      mitigation: "DEGRADE with RC-DATA-002"

  content_zones:
    TRUSTED: "SEC官方文件"
    DATA_ONLY: "财务数据库API"
    HIGH_RISK: "社交媒体/匿名来源"
    QUARANTINED: "编造数据/伪造引用"
```

### 可观测性与回放 (Observability)

```yaml
observability:
  required_fields:
    run_id: "UUID"
    skill_version: "v2.3"
    timestamp: "ISO8601"
    tool_calls:
      - tool: "bb_get_financials"
        input: "{ticker, statements, period}"
        output_summary: "3年IS/BS/CF"
        latency_ms: 1200
        success: true
    gate_scores:
      p0_passed: 8
      p0_total: 8
      p1_passed: 12
      p1_total: 14
    evidence_hashes: ["sha256:abc123..."]

  metrics:
    - success_rate: "PASS runs / total"
    - p0_failure_rate: "P0 failures / total"
    - tier1_evidence_ratio: "Tier 1 / total evidence"
    - degrade_trigger_rate: "DEGRADE / total (alert >20%)"

  replay:
    enabled: true
    requirements:
      - "所有输入可重建"
      - "tool_calls序列可重放"
      - "输出可对比"
```

### 成本/延迟预算 (Budget)

```yaml
budget:
  token_budget:
    soft_limit: 6000
    soft_action: "LOG warning"
    hard_limit: 10000
    hard_action: "DEGRADE with RC-BUDGET-001"
    critical_limit: 15000
    critical_action: "FAIL with RC-BUDGET-002"

  tool_call_budget:
    soft_limit: 8
    hard_limit: 15
    critical_limit: 25

  latency_budget:
    soft_limit_ms: 20000
    hard_limit_ms: 45000
    critical_limit_ms: 90000
```

### 质量检验 (Quality Checks)

```yaml
quality_checks:
  hard_fail_triggers:
    - "schema不合法(forensic_card格式错误)"
    - "P0红旗无evidence_ref"
    - "引用的10-K不存在"
    - "使用禁用词(fraud/manipulation)"
    - "Kill Switch RED状态被忽略"

  scoring:
    PASS:
      p0_requirement: "100% 通过"
      p1_requirement: "≥85% 通过"
      p2_requirement: "≥50% 通过"

    DEGRADE:
      p0_requirement: "100% 通过"
      p1_requirement: "70-85% 通过"

    FAIL:
      conditions:
        - "P0未100%通过"
        - "P1 < 70%"
        - "任何Hard-FAIL触发"

  runtime_constraints:
    degrade_path_testing:
      required: true
      frequency: "每周演练"
```

### 红旗代码 (Required)

| 类别 | 代码 | 触发条件 | 严重度 |
|------|------|----------|--------|
| CASH | RF-CASH-001 | OCF/Revenue < 5% | P0 |
| CASH | RF-CASH-002 | FCF/NI < 0% (持续) | P0 |
| CASH | RF-CASH-003 | OCF via WC pull | P1 |
| AR | RF-AR-001 | DSO增速 > Revenue增速 | P1 |
| AR | RF-AR-002 | 坏账准备率下降 | P1 |
| INV | RF-INV-001 | DIO增速 > COGS增速 | P1 |
| CAP | RF-CAP-001 | 资本化成本异常增加 | P1 |
| NONGAAP | RF-NONGAAP-001 | GAAP↔NonGAAP差距>30% | P1 |
| LEVERAGE | RF-LEV-001 | Net Debt/EBITDA > 4x | P0 |

### 证伪设计 (Falsification)

```yaml
falsification:
  basic_requirements:
    falsifier_per_claim: true
    premortem: "假设3年后盈利质量判断错误，最可能路径是什么？"
    counterfactual: "如果去掉Non-GAAP调整，结论是否改变？"

  advanced_requirements:
    alternative_hypotheses:
      required_for: ["CAUSAL_INFERENCE"]
      example:
        claim: "现金转换下降因WC收紧"
        alternatives:
          - "季节性因素导致"
          - "收入结构变化导致"
        distinguishing_evidence: "跨周期对比 + 细分分析"

    sensitivity_stress_test:
      required_for: ["FORECAST"]
      example:
        parameter: "OCF/Revenue预测"
        base_value: "8%"
        perturbation: "±3pp"
        conclusion_flip_threshold: "5%"

    disconfirming_evidence_plan:
      claim: "盈利质量存在问题"
      where_to_look:
        - "管理层解释(Earnings Call)"
        - "审计师意见"
        - "同行业对比"
      check_frequency: "每季度"
```

### 评估与回归 (Eval & Regression)

```yaml
eval_regression:
  self_score:
    dimensions:
      G1: {score: "0-5", how: "10步工作流完成度"}
      D1: {score: "0-5", how: "财务数据验证严格度"}
      E1: {score: "0-5", how: "每个红旗有filing引用"}
      Q1: {score: "0-5", how: "PASS/DEGRADE/FAIL判定准确"}
      K1: {score: "0-5", how: "Kill Switch正确触发"}

  calibration:
    golden_cases:
      - case_id: "GC-001-HEALTHY"
        input: "健康公司(OCF/Rev>15%, 无红旗)"
        expected_verdict: "PASS"
        expected_key_claims: ["盈利质量健康"]

      - case_id: "GC-002-REDFLAG"
        input: "问题公司(多个P0红旗)"
        expected_verdict: "PASS with RED_FLAGS"
        expected_key_claims: ["现金转换存在风险"]

      - case_id: "GC-003-DATA_GAP"
        input: "数据不完整(仅2年数据)"
        expected_verdict: "DEGRADE"
        expected_key_claims: ["跨周期分析受限"]

    metrics:
      - "success_rate"
      - "p0_failure_rate"
      - "tier1_evidence_ratio"
      - "false_positive_rate"
```

### 评估对标 (Evaluation Alignment)

```yaml
evaluation_alignment:
  standard_version: "agent_evaluation_standard_v1.1"

  dimension_coverage:
    G1_governance: "通过10步工作流结构化控制"
    D1_data_integrity: "通过财报数据验证规则"
    D2_contract_compliance: "通过forensic_card schema"
    E1_evidence_auditability: "通过Tier 1/2/3分层 + 双门槛"
    Q1_quality_gate: "通过PASS/DEGRADE/FAIL三态"
    K1_kill_switch: "通过3+2 Kill Switches"

  blocker_avoidance:
    B1_critical_unsupported: "P0红旗必须有Tier 1证据"
    B3_insecure_output: "禁用fraud/manipulation等词"
    B4_no_audit_log: "tool_calls + evidence_hashes记录"
    B5_kill_switch_ignored: "RED状态必须触发FAIL"
    B6_degrade_without_actions: "DEGRADE必须有3-7项next_actions"
```

### DEGRADE模式可执行剧本

```yaml
degrade_mode:
  template_locked: true
  trigger_reason: "RC-xxx"

  playbook:
    immediate_actions:
      - "标记受影响的分析步骤"
      - "限制结论范围"

    next_actions_required:
      - action: "获取最新10-Q补充数据"
        owner: "human"
        priority: "P0"
        deadline: "下次更新前"
        verification: "数据截止日期更新"

      - action: "验证P0红旗的Tier 1来源"
        owner: "agent"
        priority: "P0"
        deadline: "立即"
        verification: "evidence_ref可访问"

      - action: "补充跨周期数据至5年"
        owner: "agent"
        priority: "P1"
        deadline: "下次更新"
        verification: "cross_cycle_analysis完整"

  usable_sections: ["Step 2-6 (当期分析)"]
  unusable_sections: ["Step 8 (跨周期分析) - 数据不足"]

  fast_close:
    enabled: true
    method: "标记unusable_sections，继续可用部分分析"
    rollback_steps: ["恢复到最后有效状态"]
```

### Blackboard输出字段 (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "data_integrity.forensic_financial_v2.3"
    skill_version: "v2.3"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]
    key_claims: ["盈利质量评估结果"]

  extended_fields:
    earnings_quality_score: {type: "float", range: "0.0-1.0"}
    cash_conversion_flag: {type: "enum", values: ["HEALTHY", "WARNING", "CRITICAL"]}
    forensic_red_flags: {type: "array", description: "红旗代码列表"}
    evidence_tier_distribution: {type: "object", schema: "{tier_1: n, tier_2: n, tier_3: n}"}
    tool_calls: {type: "array"}
    token_usage: {type: "integer"}
    latency_ms: {type: "integer"}
```

---

**版本**: v2.3
**合约版本**: skill_design_standard_v2.0
**代码字典版本**: code_dictionary_v1.0
**归档位置**: `skills/data_integrity/`
**状态**: 已升级到v2.0合规
