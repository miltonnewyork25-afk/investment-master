# 护城河与垄断评估框架 v1.3

> **Skill ID**: `research_mechanism.moat_evaluation_v1.3`
> **主路由**: Research Mechanism (70%)
> **辅助路由**: Quality Gate (证据分级与反证检验)
> **来源**: 识别公司的护城河和垄断.docx
> **归档日期**: 2026-01-27

---

## Skill 用途

评估公司的竞争护城河（Moat），特别是来自**转换成本**（Switching Costs）和**网络效应**（Network Effects）的垄断性优势。

**适用场景**：
- 分析留存率（Retention）
- 分析参与度（DAU/MAU）
- 分析流失率（Churn）
- 分析净收入留存（NRR）
- 分析定价权（Pricing Power）
- 判断公司是否具有持久护城河

**输出**：可审计的"护城河卡片"（Moat Card），包含关键信号、指标、证据和潜在弱点。

---

## 输入要求

```yaml
inputs:
  company: "[公司名称或股票代码]"  # 可选
  thesis: "[一句话护城河声明/假设]"  # 可选
  time_window: "[评估时间窗口，如最近8个季度]"  # 可选
```

---

## 7步工作流

### Step 1: 重述护城河声明 (Restate Moat Claim)

识别声明的护城河类型：

| 护城河类型 | 核心机制 | 典型特征 |
|------------|----------|----------|
| **转换成本** | 客户离开的代价高 | 数据锁定、学习曲线、集成深度 |
| **网络效应** | 用户越多价值越大 | 双边市场、平台生态、标准锁定 |
| **AI护城河** [v1.3新增] | 模型能力+训练数据+推理成本 | 数据飞轮、专有模型、成本优势 |
| **基础设施护城河** [v1.3新增] | 物理/数字资产难以复制 | 数据中心、自研芯片、专有硬件 |
| **监管护城河** [v1.3新增] | 牌照/合规/政策壁垒 | 准入许可、合规成本、政策保护 |
| **复合护城河** | 多重护城河叠加 | 最强形态（如Google=网络+AI+基础设施） |

```yaml
moat_claim:
  type: "[switching_costs / network_effects / both]"
  statement: "[一句话描述]"
  hypothesis: "[可证伪的假设]"
```

---

### Step 2: 收集领先信号 (Leading Signals)

**领先信号 = 护城河正在形成/加强的早期迹象**

#### 转换成本的领先信号

| 信号 | 描述 | 如何观测 |
|------|------|----------|
| 多年期合同 | 客户签订长期协议 | 合同期限、续约条款 |
| 深度集成 | 产品嵌入客户工作流 | API调用量、集成复杂度 |
| 数据锁定 | 客户数据存储于平台 | 数据导出难度、迁移成本 |
| 学习曲线 | 用户投入时间学习 | 培训时长、认证体系 |
| 定制化程度 | 针对客户的定制开发 | 定制功能占比 |

#### 网络效应的领先信号

| 信号 | 描述 | 如何观测 |
|------|------|----------|
| 用户快速增长 | 用户数加速扩张 | MAU/DAU增速 |
| 高频互动 | 用户之间频繁交互 | 消息量、交易频次 |
| 生态扩张 | 开发者/合作伙伴加入 | API开发者数、合作伙伴数 |
| 内容/供给增长 | UGC或供给侧扩张 | 内容量、SKU数 |
| 跨边正反馈 | 一边增长带动另一边 | 供需比例、匹配效率 |

```yaml
leading_signals:
  switching_costs:
    - signal: "[信号名]"
      observation: "[观测到的现象]"
      strength: "[强/中/弱]"

  network_effects:
    - signal: "[信号名]"
      observation: "[观测到的现象]"
      strength: "[强/中/弱]"
```

#### AI护城河的领先信号 [v1.3新增]

| 信号 | 描述 | 如何观测 |
|------|------|----------|
| 模型能力领先 | 基准测试分数领先 | MMLU/HumanEval/Arena ELO |
| 训练数据优势 | 独特/海量训练数据 | 数据来源独占性、数据量级 |
| 推理成本优势 | 单位推理成本低 | $/百万token、自研芯片效率 |
| AI飞轮运转 | 用户→数据→模型→产品闭环 | 迭代速度、模型改进率 |
| 人才优势 | 顶级AI研究员集中 | 论文引用、人才净流入 |

#### 基础设施护城河的领先信号 [v1.3新增]

| 信号 | 描述 | 如何观测 |
|------|------|----------|
| 专有硬件 | 自研芯片/专用硬件 | TPU/定制ASIC性能和成本 |
| 数据中心规模 | 物理基础设施优势 | 全球节点数、PUE效率 |
| 网络效应基础设施 | 边缘计算/CDN | 延迟、覆盖率 |
| CapEx壁垒 | 需要大量资本投入 | 累计投资额、进入者复制成本 |

#### 监管护城河的领先信号 [v1.3新增]

| 信号 | 描述 | 如何观测 |
|------|------|----------|
| 独家牌照 | 排他性准入许可 | 牌照数量、获取难度 |
| 合规成本壁垒 | 合规投入形成壁垒 | 合规团队规模、认证数量 |
| 政策保护 | 有利的政策环境 | 补贴、税收优惠、准入限制 |
| 数据合规优势 | GDPR/隐私合规领先 | 合规认证、处罚历史 |

```yaml
leading_signals:
  # ... existing fields ...

  ai_moat:  # v1.3新增
    - signal: "[信号名]"
      observation: "[观测到的现象]"
      strength: "[强/中/弱]"

  infrastructure_moat:  # v1.3新增
    - signal: "[信号名]"
      observation: "[观测到的现象]"
      strength: "[强/中/弱]"

  regulatory_moat:  # v1.3新增
    - signal: "[信号名]"
      observation: "[观测到的现象]"
      strength: "[强/中/弱]"
```

---

### Step 3: 收集滞后确认 (Lagging Confirmations)

**滞后确认 = 护城河已经发挥作用的结果证据**

#### 转换成本的滞后确认

| 确认项 | 阈值 | 解读 |
|--------|------|------|
| 续约率 | >90% | 客户不愿离开 |
| 流失率(Churn) | <5%年化 | 极低流失 |
| 市场份额 | 稳定或上升 | 竞争优势持续 |
| 提价能力 | 提价不流失客户 | 定价权强 |
| NRR(净收入留存) | >100% | 老客户花更多钱 |

#### 网络效应的滞后确认

| 确认项 | 阈值 | 解读 |
|--------|------|------|
| CAC下降 | 随规模下降 | 获客效率提升 |
| 竞争者失败 | 高投入无法撬动用户 | 网络效应壁垒 |
| 用户集中度 | 头部平台占比上升 | 赢家通吃 |
| 变现效率 | ARPU随规模上升 | 价值密度提升 |

```yaml
lagging_confirmations:
  switching_costs:
    - confirmation: "[确认项]"
      value: "[数值]"
      benchmark: "[行业基准]"
      verdict: "[优于/持平/低于]"

  network_effects:
    - confirmation: "[确认项]"
      value: "[数值]"
      benchmark: "[行业基准]"
      verdict: "[优于/持平/低于]"
```

---

### Step 4: 关键指标/代理变量 (Metrics / Proxies)

#### 转换成本指标

| 指标 | 公式/定义 | 优秀阈值 |
|------|-----------|----------|
| **Churn %** | 流失客户数/期初客户数 | <5%年化 |
| **合同平均期限** | 加权平均合同年限 | >2年 |
| **NRR** | (期初收入+扩展-收缩-流失)/期初收入 | >110% |
| **Gross Retention** | (期初收入-流失)/期初收入 | >90% |
| **转换成本指数** | 迁移成本/年度合同价值 | >2x |

#### 网络效应指标

| 指标 | 公式/定义 | 优秀阈值 |
|------|-----------|----------|
| **MAU/DAU比** | MAU/DAU | <2 (高粘性) |
| **留存曲线** | D7/D30/D90留存 | D30>40% |
| **GMV/TPV** | 平台交易总额 | YoY>30% |
| **Take Rate** | 平台收入/GMV | 稳定或上升 |
| **CAC趋势** | 获客成本变化 | 下降 |
| **供需比** | 供给侧/需求侧比例 | 趋向平衡 |

```yaml
key_metrics:
  switching_costs:
    - metric: "Churn %"
      value: "__%"
      trend: "↑/↓/→"
      source: "[来源]"

    - metric: "NRR"
      value: "__%"
      trend: "↑/↓/→"
      source: "[来源]"

  network_effects:
    - metric: "MAU/DAU"
      value: "__x"
      trend: "↑/↓/→"
      source: "[来源]"

    - metric: "CAC"
      value: "$__"
      trend: "↑/↓/→"
      source: "[来源]"
```

---

### Step 5: 证据收集 (Evidence Gathering)

**证据分级（必须包含至少1个A类来源）**：

| 类别 | 来源类型 | 可信度 | 示例 |
|------|----------|--------|------|
| **A类（一手）** | 官方文件 | 最高 | 10-K/10-Q、年报、投资者演示、Earnings Call |
| **B类（二手）** | 独立评估 | 较高 | 知名行业研究、分析师报告、学术研究 |
| **C类（参考）** | 其他来源 | 一般 | 媒体报道、专家访谈、社交媒体 |

```yaml
evidence:
  category_a:  # 必须≥1
    - source: "[10-K FY2025]"
      claim: "[支持的论点]"
      quote: "[原文引用]"
      page: "[页码]"

  category_b:
    - source: "[分析师报告]"
      claim: "[支持的论点]"
      date: "[日期]"

  category_c:
    - source: "[媒体报道]"
      claim: "[支持的论点]"
      caveat: "[使用注意]"
```

---

### Step 6: 陷阱识别 (Pitfalls)

#### 反证信号 (Disconfirmers)

**护城河正在削弱的迹象**：

| 反证信号 | 描述 | 严重程度 |
|----------|------|----------|
| 大客户流失 | 关键客户离开 | 高 |
| 大幅折扣续约 | 需要降价才能留住客户 | 高 |
| NRR下降 | 老客户花钱减少 | 中-高 |
| 竞品崛起 | 竞争对手获得大量用户 | 中 |
| 多归属增加 | 用户同时使用多个平台 | 中 |
| 定价压力 | 被迫降价 | 中 |

#### 假阳性 (False Positives)

**看似护城河但实际不是的情况**：

| 假阳性 | 描述 | 识别方法 |
|--------|------|----------|
| 无替代品 | 高留存仅因为没有选择 | 检查竞品出现后的留存变化 |
| 合同陷阱 | 长合同但有宽松退出条款 | 检查提前终止条款 |
| 补贴驱动 | 高增长靠烧钱补贴 | 检查去补贴后的增长 |
| 周期性假象 | 行业景气时显得强 | 跨周期比较 |
| 规模假象 | 大但不强 | 检查利润率和定价权 |

```yaml
pitfalls:
  disconfirmers:
    - signal: "[反证信号]"
      observation: "[观测到的现象]"
      severity: "[高/中/低]"
      implication: "[对护城河判断的影响]"

  false_positives:
    - type: "[假阳性类型]"
      observation: "[观测到的现象]"
      test: "[如何验证是否为假阳性]"
      result: "[验证结果]"
```

---

### Step 7: 判决 (Verdict)

#### 护城河强度评级

| 评级 | 标准 |
|------|------|
| **Strong** | 多个领先信号+滞后确认，无重大反证，关键指标显著优于行业 |
| **Medium** | 部分信号确认，有小瑕疵，指标接近行业优秀水平 |
| **Weak** | 信号不明确或存在重大反证，指标低于行业平均 |
| **None** | 无明显护城河证据，或假阳性明显 |

#### 输出格式

```yaml
verdict:
  rating: "[Strong/Medium/Weak/None]"
  confidence: "[High/Medium/Low]"

  rationale: |
    [2-3句话解释评级原因]

  watch_items:  # 下季度观察清单(Top 3)
    - item: "[观察项1]"
      threshold: "[阈值]"
      implication: "如果[条件]，则[护城河判断变化]"

    - item: "[观察项2]"
      threshold: "[阈值]"
      implication: "如果[条件]，则[护城河判断变化]"

    - item: "[观察项3]"
      threshold: "[阈值]"
      implication: "如果[条件]，则[护城河判断变化]"
```

---

## 输出模板：护城河卡片 (Moat Card)

```markdown
# Moat Card: [公司名称]

## Claim (护城河声明)
[一句话护城河论点]

## Leading Signals (领先信号)
**转换成本**:
- [信号1]: [观测] (强度: 强/中/弱)
- [信号2]: [观测] (强度: 强/中/弱)

**网络效应**:
- [信号1]: [观测] (强度: 强/中/弱)
- [信号2]: [观测] (强度: 强/中/弱)

## Lagging Confirmations (滞后确认)
| 确认项 | 数值 | 行业基准 | 判定 |
|--------|------|----------|------|
| ... | ... | ... | ... |

## Key Metrics (关键指标)
| 指标 | 当前值 | 趋势 | 来源 |
|------|--------|------|------|
| Churn % | ...% | ↑/↓/→ | ... |
| NRR | ...% | ↑/↓/→ | ... |
| ... | ... | ... | ... |

## Evidence (证据)
**A类 (一手)**:
- [来源]: "[引用]" (p.XX)

**B类 (二手)**:
- [来源]: [论点]

## Disconfirmers (反证)
- [反证1]: [观测], 严重程度: 高/中/低
- [反证2]: ...

## False Positives (假阳性检验)
- [假阳性1]: [验证方法] → [结果]
- [假阳性2]: ...

## Typical Examples (同类公司参考)
- [公司A]: [护城河模式], [关键指标]
- [公司B]: ...

## Verdict (判决)
**评级**: [Strong/Medium/Weak/None]
**置信度**: [High/Medium/Low]

**理由**: [2-3句话]

**下季度观察清单**:
1. [观察项1] - 阈值: [X], 含义: 如果[条件]则[影响]
2. [观察项2] - ...
3. [观察项3] - ...
```

---

## 与Agent架构整合

### Research Mechanism 整合（主）

```yaml
research_mechanism_integration:
  capability: "moat_evaluation"

  triggers:
    - "评估护城河"
    - "分析竞争优势"
    - "转换成本分析"
    - "网络效应分析"
    - "垄断优势评估"

  output_artifact: "moat_card"

  required_fields:
    - "claim"
    - "leading_signals"
    - "lagging_confirmations"
    - "key_metrics"
    - "evidence"
    - "disconfirmers"
    - "false_positives"
    - "verdict"
```

### Quality Gate 整合（辅）

```yaml
quality_gate_integration:
  capability: "moat_evidence_validation"

  evidence_rules:
    - "必须包含≥1个A类来源"
    - "每个论点需要证据支持"
    - "反证必须被检视"

  false_positive_check:
    required: true
    types:
      - "无替代品假象"
      - "合同陷阱"
      - "补贴驱动"
      - "周期性假象"
      - "规模假象"
```

---

## 使用示例

**Salesforce护城河评估**：

```yaml
claim:
  type: "switching_costs"
  statement: "Salesforce通过深度集成和数据锁定建立高转换成本护城河"

leading_signals:
  - signal: "深度集成"
    observation: "平均客户使用5+个Salesforce产品, 集成到核心业务流程"
    strength: "强"
  - signal: "数据锁定"
    observation: "客户CRM数据完全存储于平台, 迁移需6-12个月"
    strength: "强"

lagging_confirmations:
  - confirmation: "NRR"
    value: "115%"
    benchmark: "100%"
    verdict: "优于"
  - confirmation: "Gross Retention"
    value: "92%"
    benchmark: "85%"
    verdict: "优于"

key_metrics:
  - {metric: "Churn", value: "8%", trend: "→", source: "10-K FY2025"}
  - {metric: "NRR", value: "115%", trend: "↓", source: "Earnings Call Q4"}
  - {metric: "合同平均期限", value: "2.8年", trend: "↑", source: "10-K"}

evidence:
  category_a:
    - source: "10-K FY2025"
      claim: "NRR持续>110%"
      quote: "Dollar-based net retention rate was 115%"
      page: "42"

disconfirmers:
  - signal: "NRR下降趋势"
    observation: "NRR从125%降至115%，连续6季度下滑"
    severity: "中"
    implication: "老客户扩展放缓，护城河可能松动"

verdict:
  rating: "Strong"
  confidence: "High"
  rationale: "深度集成+数据锁定构成强转换成本，尽管NRR下滑但仍远高于100%"
  watch_items:
    - item: "NRR趋势"
      threshold: "<105%"
      implication: "如果NRR跌破105%，下调至Medium"
```

---

## Contract Compliance v2.0

> 本节确保skill输出符合 `skills/_common/skill_design_standard_v2.0.yaml`

### 核心原则对齐 (Core Principles)

```yaml
core_principles_alignment:
  contract_first:
    input_validation: "公司信息 + 时间窗口验证"
    workflow: "7步工作流明确定义"
    output_schema: "moat_card标准格式"
    quality_gates: "PASS/DEGRADE/FAIL三态"
    degrade_circuit_break: "数据不足时降级，证据造假时熔断"

  eval_first:
    golden_cases: "3个标准案例(强护城河/弱护城河/数据不足)"
    scorers: "护城河评级准确率 + 证据覆盖率"
    replay: "tool_calls序列可回放"

  sre_first:
    degrade_path: "简单可执行(数据不足→限制判决范围)"
    fast_close: "标记unusable_sections并继续"
    drill_frequency: "每周演练降级路径"
```

### 声明类型 (5-Type Claims)

| 声明示例 | 类型 | 重要性 | 特殊要求 |
|----------|------|--------|----------|
| "NRR = 115%" | **FACT_DESCRIPTIVE** | supporting | min_evidence_tier: 1 |
| "高NRR说明存在转换成本" | **CAUSAL_INFERENCE** | critical | 必须列替代假说 |
| "NRR将继续下滑" | **FORECAST** | optional | 必须做敏感性测试 |
| "当前估值隐含NRR>120%" | **VALUATION_IMPLIED** | supporting | min_evidence_tier: 2 |
| "建议关注竞品动态" | **ACTION_RECOMMENDATION** | optional | min_evidence_tier: 2 |

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
        - "护城河类型识别"
        - "领先信号验证"
        - "滞后确认验证"
        - "关键指标"
      fallback: "未覆盖→DEGRADE with RC-EVIDENCE-002"

  tier_mapping:
    tier_1: "10-K, 10-Q, Earnings Call, IR演示"
    tier_2: "分析师报告, 行业研究"
    tier_3: "媒体报道, 专家访谈"
```

### Kill Switches (3 Mandatory + Domain-Specific)

```yaml
kill_switches:
  mandatory:
    - id: "KS-EVIDENCE-FABRICATION"
      condition: "引用的公司数据不存在或与原文不符"
      detection: "evidence_hash验证 + 原文交叉检查"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-TOOL-OVERREACH"
      condition: "调用非白名单工具"
      detection: "tool_whitelist检查"
      action: "FAIL"
      current_status: "GREEN"

    - id: "KS-HIGH-RISK-OUTPUT"
      condition: "输出未经证据支持的极端判断"
      detection: "claims without evidence_refs检查"
      action: "FAIL或转人审"
      current_status: "GREEN"

  domain_specific:
    - id: "KS-MOAT-001"
      condition: "大客户(>20%收入)宣布转向竞品"
      threshold: "单一客户>20%收入流失"
      action: "FAIL + 护城河判断失效"
      monitoring_metric: "Top 5客户续约状态"

    - id: "KS-MOAT-002"
      condition: "NRR跌破100%"
      threshold: "NRR < 100%"
      action: "DEGRADE + 重新评估"
      monitoring_metric: "季度NRR"

    - id: "KS-MOAT-003"
      condition: "网络效应逆转"
      threshold: "留存率与规模负相关"
      action: "FAIL + 网络效应论点失效"
      monitoring_metric: "留存率 vs MAU相关性"
```

### 威胁模型 (Threat Model)

```yaml
threat_model:
  risks:
    evidence_fabrication:
      description: "编造NRR/留存等关键指标"
      detection: "必须引用官方来源"
      mitigation: "FAIL + 标记"

    confirmation_bias:
      description: "只找支持强护城河的证据"
      detection: "强制检查反证(disconfirmers)"
      mitigation: "无disconfirmers则DEGRADE"

    false_positive:
      description: "误判假护城河(无替代品/补贴驱动等)"
      detection: "强制假阳性检验"
      mitigation: "未检验则DEGRADE"

  content_zones:
    TRUSTED: "公司官方披露"
    DATA_ONLY: "第三方数据服务"
    HIGH_RISK: "社交媒体/论坛"
    QUARANTINED: "编造数据"
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
    evidence_hashes: ["sha256:..."]

  metrics:
    - success_rate: "PASS runs / total"
    - moat_accuracy: "判断准确率(vs 后续验证)"
    - tier1_evidence_ratio: "Tier 1 / total evidence"
    - degrade_trigger_rate: "DEGRADE / total (alert >20%)"

  replay:
    enabled: true
```

### 成本/延迟预算 (Budget)

```yaml
budget:
  token_budget:
    soft_limit: 5000
    hard_limit: 8000
    critical_limit: 12000

  tool_call_budget:
    soft_limit: 6
    hard_limit: 12
    critical_limit: 20

  latency_budget:
    soft_limit_ms: 15000
    hard_limit_ms: 30000
    critical_limit_ms: 60000
```

### 质量检验 (Quality Checks)

```yaml
quality_checks:
  hard_fail_triggers:
    - "moat_card格式错误"
    - "护城河判断无evidence_ref"
    - "disconfirmers部分为空"
    - "false_positives未检验"
    - "Kill Switch RED被忽略"

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

### 红旗代码 (Required)

| 代码 | 触发条件 | 严重度 |
|------|----------|--------|
| RF-MOAT-001 | NRR连续下降3季度 | P1 |
| RF-MOAT-002 | 大客户(>10%收入)流失 | P0 |
| RF-MOAT-003 | 需大幅折扣才能续约 | P1 |
| RF-MOAT-004 | 多归属比例上升>20% | P1 |
| RF-MOAT-005 | 竞品获得大量用户 | P1 |
| RF-MOAT-006 | 定价权丧失 | P0 |

### 证伪设计 (Falsification)

```yaml
falsification:
  basic_requirements:
    falsifier_per_claim: true
    premortem: "假设3年后护城河消失，最可能路径是什么？"
    counterfactual: "如果去掉网络效应，仅靠转换成本，判断是否改变？"

  advanced_requirements:
    alternative_hypotheses:
      required_for: ["CAUSAL_INFERENCE"]
      example:
        claim: "高NRR说明存在转换成本"
        alternatives:
          - "高NRR因产品持续升级而非锁定"
          - "高NRR因竞品不成熟"
        distinguishing_evidence: "竞品成熟后NRR变化"

    sensitivity_stress_test:
      required_for: ["FORECAST"]
      example:
        parameter: "NRR预测"
        base_value: "115%"
        perturbation: "±10pp"
        conclusion_flip_threshold: "100%"

    disconfirming_evidence_plan:
      claim: "存在强护城河"
      where_to_look:
        - "竞品用户增长数据"
        - "客户流失原因分析"
        - "行业多归属趋势"
      check_frequency: "每季度"
```

### 评估与回归 (Eval & Regression)

```yaml
eval_regression:
  self_score:
    dimensions:
      G1: {score: "0-5", how: "7步工作流完成度"}
      E1: {score: "0-5", how: "证据分层和引用质量"}
      Q1: {score: "0-5", how: "护城河判断准确性"}
      K1: {score: "0-5", how: "Kill Switch正确触发"}

  calibration:
    golden_cases:
      - case_id: "GC-MOAT-001"
        input: "Salesforce (强转换成本)"
        expected_verdict: "PASS"
        expected_moat_strength: "Strong"

      - case_id: "GC-MOAT-002"
        input: "弱护城河SaaS公司"
        expected_verdict: "DEGRADE"
        expected_moat_strength: "Weak"

      - case_id: "GC-MOAT-003"
        input: "数据不完整公司"
        expected_verdict: "DEGRADE"
```

### 评估对标 (Evaluation Alignment)

```yaml
evaluation_alignment:
  standard_version: "agent_evaluation_standard_v1.1"

  dimension_coverage:
    G1_governance: "通过7步工作流"
    E1_evidence_auditability: "通过Tier分层 + 双门槛"
    Q1_quality_gate: "通过护城河评级→verdict映射"
    K1_kill_switch: "通过3+3 Kill Switches"

  blocker_avoidance:
    B1_critical_unsupported: "护城河判断必须有Tier 1证据"
    B5_kill_switch_ignored: "RED状态必须触发FAIL"
    B6_degrade_without_actions: "DEGRADE必须有next_actions"
```

### DEGRADE模式可执行剧本

```yaml
degrade_mode:
  template_locked: true
  playbook:
    immediate_actions:
      - "标记受影响的分析步骤"
    next_actions_required:
      - action: "获取最新NRR/Churn数据"
        owner: "human"
        priority: "P0"
        verification: "数据源确认"
      - action: "验证竞品多归属比例"
        owner: "agent"
        priority: "P1"
      - action: "追踪大客户续约情况"
        owner: "human"
        priority: "P1"

  fast_close:
    enabled: true
    method: "限制判决范围，标记confidence=Low"
```

### Blackboard输出字段 (v2.0)

```yaml
blackboard_outputs:
  core_fields:
    run_id: "string"
    skill_id: "research_mechanism.moat_evaluation_v1.2"
    skill_version: "v1.2"
    verdict: "PASS | DEGRADE | FAIL"
    reason_codes: ["RC-xxx"]
    key_claims: ["护城河评估结果"]

  extended_fields:
    moat_type: {type: "enum", values: ["switching_costs", "network_effects", "both", "none"]}
    moat_strength: {type: "enum", values: ["strong", "medium", "weak", "none"]}
    moat_confidence: {type: "float", range: "0.0-1.0"}
    moat_watch_items: {type: "array"}
    moat_red_flags: {type: "array"}
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
| v1.3 | 2026-01-27 | 新增AI护城河、基础设施护城河、监管护城河评估模块 |
