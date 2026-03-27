---
name: income_statement_deep_diagnostic
description: 利润表深度诊断框架(ISDD) v1.0 — 正向分解+逆向溯源双路径融合，Phase 1财务分析标准执行SOP
type: reference
---

# 利润表深度诊断框架 v1.0 (Income Statement Deep Diagnostic, ISDD)

> **触发条件**: Tier 2+分析的Phase 1财务章节，**必须**执行本框架
> **来源**: Income Statement Method Extraction SOP(正向分解) + Profitability Reverse-Tracing Framework(逆向溯源) 融合升级
> **已有模块引用**: buyback_efficiency_module.md(Step 7 η函数) | cycle_exposure_module.md(Step 1 经营杠杆) | SaaS M1-M2(Step 5-6行业插槽)
> **核心理念**: 利润表分析不是看"赚了多少"，而是识别"持续赚钱能力的真实变化"

---

## 一、路径路由 (Phase 0数据预取后执行)

```
路由规则 (量化，非主观):

计算: profit_lag = 收入增速(YoY%) - 营业利润增速(YoY%)
计算: margin_delta = 当期OPM - 前期OPM

IF profit_lag > 5pp 连续2个季度 OR margin_delta < -200bps:
    → 路径β(逆向溯源): Step 0 → S1β → S2 → S3 → S4 → S5 → S6 → S7 → S8
    → 目的: 诊断"增收不增利"的根因

ELIF 公司处于并购整合 OR 会计准则变更 OR 税务结构变化:
    → 路径α(正向分解): Step 0 → S1α → S2 → S5 → S7 → S8
    → 目的: 精确分解各层利润贡献，归一化扰动

ELSE (稳态年度复检):
    → 路径γ(快速扫描): Step 0 → S1α → S2(简版) → S7 → S8
    → 目的: 确认盈利能力无恶化信号
```

**路径覆盖对比**:

| Step | α正向 | β逆向 | γ快速 | 说明 |
|------|:-----:|:-----:|:-----:|------|
| S0 收入质量 | ● | ● | ● | 通用前置 |
| S1α 经营杠杆分解 | ● | — | ● | 正向：结构分解 |
| S1β 利润-规模脱钩 | — | ● | — | 逆向：信号检测 |
| S2 盈利质量清洗 | ● | ● | ●简 | 通用：非经常性剔除 |
| S3 费用增速归因 | — | ● | — | 逆向独有 |
| S4 成本问题分类 | — | ● | — | 逆向独有 |
| S5 分部归因+引擎 | ● | ● | — | 通用：深度分析时 |
| S6 单元经济验证 | — | ● | — | 逆向独有 |
| S7 EPS归一化 | ● | ● | ● | 通用：税/利息/回购 |
| S8 现金验证 | ● | ● | ● | 通用：终极检验 |

---

## 二、执行步骤

### Step 0: 收入质量扫描 (Revenue Quality Scan)

> **为什么Step 0**: 收入是利润分析的上限。如果收入本身是低质量的（并购堆砌、渠道塞货、一次性大单），后续所有利润分析的意义都打折扣。

**Collect**:
- 总收入增速 (YoY%)
- 有机收入增速 (扣除M&A、货币、剥离)  `[DM必须]`
- 价格贡献 vs 量贡献 (price/volume/mix拆分)  `[DM必须]`
- 经常性收入占比 (合同/订阅/消耗品 vs 一次性/项目型)
- [行业插槽: SaaS→cRPO增速/NRR | 消费品→same-store-sales | 半导体→ASP×volume | 金融→AUM/交易量]

**Rules**:
- 有机增速 < 总增速的50% → 标记"并购驱动增长"
- 价格贡献 > 量贡献的2倍 → 标记"价格驱动(量增长停滞)"
- 量贡献 > 价格贡献的3倍 → 标记"以价换量风险"
- 经常性收入占比下降 → 标记"收入质量恶化"

**Output**:
```yaml
revenue_quality:
  organic_growth: "X%"          # 有机增速
  price_volume_split: "价X% / 量X%"  # 价量拆分
  recurring_ratio: "X%"         # 经常性占比
  quality_verdict: "高 / 中 / 低"
  flags: ["并购驱动", "以价换量"]  # 如有
```

---

### Step 1α: 经营杠杆分解 (Operating Leverage Decomposition) — 路径α/γ

> **引用**: cycle_exposure_module.md Step 2 经营杠杆量化公式

**Collect**:
- 收入增速 (当期 vs 前期)  `[DM必须]`
- 毛利润增速 + 毛利率变化  `[DM必须]`
- 营业费用增速 (SG&A + R&D分别)
- 营业利润增速 + 营业利润率变化  `[DM必须]`

**Rules**:
- 毛利润增速 > 收入增速 → 正向毛利杠杆 (定价权/产品结构改善)
- 毛利润增速 < 收入增速 → 负向毛利杠杆 (成本压力/产品降级)
- 营业费用增速 < 收入增速 → 正向运营杠杆 (规模效率)
- 营业费用增速 > 收入增速 → 负向运营杠杆 (费用失控/战略投入)
- 经营杠杆倍数 = ΔOPM% / ΔRevenue% → >1.5x为高杠杆  `[Python验证]`

**Output**:
```yaml
operating_leverage:
  revenue_cost_spread: "收入+X% vs 成本+Y%"
  gross_margin_change: "+/-Xbps"
  opex_ratio_change: "+/-Xbps"
  leverage_multiplier: "X.Xx"
  leverage_verdict: "正向 / 中性 / 负向"
  profit_driver: "收入驱动 / 毛利率扩张 / 费用控制 / 混合"
```

---

### Step 1β: 利润-规模脱钩检测 (Profit-Scale Divergence Scan) — 路径β

> **适用场景**: "增收不增利"诊断入口

**Collect**:
- 收入增速  `[DM必须]`
- 营业利润增速  `[DM必须]`
- 净利润增速  `[DM必须]`
- 营业利润率 (当期 vs 前期)
- 净利润率 (当期 vs 前期)

**Rules**:
- 净利润增速 < 收入增速 且 净利润率下降 → 确认"利润滞后于规模"
- 营业利润增速 < 收入增速 → 问题出在经营层面(非税/利息)
- 营业利润增速 ≈ 收入增速 但 净利润增速 << 收入增速 → 问题出在营业外(税/利息/一次性)
- profit_lag = 收入增速 - 营业利润增速: >10pp=严重, 5-10pp=中度, <5pp=轻微

**Output**:
```yaml
profit_scale_divergence:
  revenue_growth: "X%"
  operating_income_growth: "X%"
  net_income_growth: "X%"
  profit_lag: "Xpp"
  margin_direction: "扩张 / 稳定 / 收缩"
  divergence_severity: "严重 / 中度 / 轻微 / 无"
  problem_layer: "经营层 / 营业外 / 混合"
```

---

### Step 2: 盈利质量清洗 (Earnings Quality Cleanup)

> **这是两个原框架中最重要的独有步骤之一**。不清洗就分析=在脏数据上建模。
> γ快速路径: 仅检查>净利润5%的项目，不逐项分类。

**Collect** (从10-K/10-Q附注和MD&A):
- 重组费用 (restructuring charges)
- 资产减值 (impairment charges)
- 资产出售损益 (asset sale gains/losses)
- 诉讼/和解项目 (litigation/settlement)
- 并购相关摊销或调整 (acquisition-related)
- 养老金/公允价值/会计重分类效应
- 一次性税务项目

**Rules — 四维分类矩阵**:

| 项目 | 经营/非经营 | 现金/非现金 | 一次性/周期性/持续性 | 应调整/不应调整 |
|------|:-----------:|:---------:|:-------------------:|:--------------:|
| 重组费用 | 经营 | 混合 | 周期性(每3-5年) | **不应调整**(如果周期发生) |
| 商誉减值 | 非经营 | 非现金 | 一次性 | 应调整 |
| 资产出售 | 非经营 | 现金 | 一次性 | 应调整 |
| 诉讼和解 | 视性质 | 现金 | 一次性 | 应调整(除非业务模式固有) |
| 并购摊销 | 经营(争议) | 非现金 | 持续性 | **分歧项**: GAAP不调/管理层常调 |
| SBC | 经营 | 非现金 | 持续性 | **分歧项**: 真实成本但非现金 |

**三版盈利** `[Python验证]`:
1. **GAAP盈利** — 原始报告数字
2. **管理层调整盈利** — 管理层Non-GAAP(通常剔除SBC+并购摊销+重组)
3. **分析师归一化盈利** — 基于上述四维分类独立判断

**争议项决策规则**:
- SBC/Rev > 5% → 不应剔除(是实质性成本)
- SBC/Rev < 2% → 可剔除(对盈利影响极小)
- 并购摊销: 如果公司持续并购(如AVGO/DHR) → 不应剔除(是业务模式的一部分)
- 并购摊销: 如果单次大并购后逐年减少 → 可剔除

**Output**:
```yaml
earnings_quality:
  gaap_earnings: "$XM"
  mgmt_adjusted_earnings: "$XM"
  analyst_normalized_earnings: "$XM"   # [Python验证]
  gaap_to_normalized_gap: "X%"
  disputed_items:
    - item: "SBC"
      amount: "$XM"
      decision: "保留/剔除"
      reason: "SBC/Rev=X%"
  quality_verdict: "高(gap<10%) / 中(10-25%) / 低(>25%)"
```

---

### Step 3: 费用增速归因 (Expense-Revenue Growth Decomposition) — 路径β

> **B框架核心诊断工具**: 逐行费用与收入增速对比，精确定位利润吞噬者。

**Collect** (每项费用的增速):
- COGS / 原材料成本  `[DM必须]`
- 门店运营成本 / 履约成本
- 配送费用 / 平台费用
- 营销费用  `[DM必须]`
- 管理费用 (G&A)  `[DM必须]`
- 研发费用 (R&D)  `[DM必须]`
- [行业插槽: 零售→租金/人工 | SaaS→托管成本/客户成功 | 金融→信用损失拨备]

**Rules**:
对每项费用计算: `费用增速差 = 该项费用增速 - 收入增速`

| 费用增速差 | 判定 |
|:----------:|------|
| > +10pp | **强利润吞噬者** — 最优先调查 |
| +5pp ~ +10pp | 中度利润吞噬者 |
| -5pp ~ +5pp | 中性 |
| < -5pp | 规模效率来源 |

**Output**:
```yaml
expense_attribution:
  top_destroyers:          # 按增速差排序,取前3
    - line: "配送费用"
      growth: "+75%"
      vs_revenue: "+45pp"
      severity: "强利润吞噬者"
    - line: "营销费用"
      growth: "+40%"
      vs_revenue: "+10pp"
      severity: "中度"
  improving_lines:         # 取效率最好的前2
    - line: "G&A"
      growth: "+5%"
      vs_revenue: "-25pp"
      verdict: "规模效率"
  primary_profit_destroyer: "配送费用"
```

---

### Step 4: 成本问题分类 (Cost Problem Classification) — 路径β

> **在Step 3定位"谁在吞噬利润"后，本步判断"这是什么性质的问题"**

**四类成本问题**:

| 类型 | 定义 | 典型表现 | 投资含义 |
|------|------|---------|----------|
| **结构性** | 业务模式固有的成本劣势 | 渠道/平台依赖费率逐年上升,议价权弱 | 利润率天花板被压低,估值应折价 |
| **战略性** | 管理层主动投入换未来增长 | R&D/营销高增长但有明确ROI目标 | 短期压制利润但可能创造长期价值 |
| **周期性** | 宏观/行业周期驱动的成本波动 | 原材料/运费随商品周期涨跌 | 不改变长期盈利能力,关注均值回归 |
| **临时性** | 一次性事件驱动 | 诉讼/重组/搬迁/自然灾害 | 下期自动消失,不影响估值 |

**判断规则**:
- 渠道/平台费用增速持续超收入 → **结构性** (议价权弱的信号)
- 费用高增长+管理层有明确回报时间表+可追踪KPI → **战略性**
- 费用波动与大宗商品/行业指数高度相关(R²>0.6) → **周期性**
- 仅出现在单个季度/年度且有明确原因 → **临时性**
- 管理费用增速持续低于收入 → 通常是**规模效率**(正面信号)

**Output**:
```yaml
cost_classification:
  problems:
    - line: "配送费用"
      type: "结构性"
      evidence: "平台费率连续3年上升,议价权弱"
      investment_implication: "OPM天花板被压低至X%"
    - line: "R&D"
      type: "战略性"
      evidence: "AI产品投入,管理层目标FY28盈利"
      investment_implication: "短期压制3pp OPM,长期可能贡献$XB收入"
  overall_verdict: "结构性 / 战略性 / 周期性 / 临时性 / 混合"
```

---

### Step 5: 分部归因 + 核心引擎识别 (Segment Attribution + Core Engine ID)

> **融合A-S3(分部数据拆解) + B-S5(引擎vs放大器)**。A提供数据，B提供判断。

**Collect**:
- 各分部收入 + 增速  `[DM必须]`
- 各分部营业利润 / 利润率  `[DM必须]`
- 分部间交叉影响 (如新业务蚕食核心业务)
- [行业插槽: SaaS→M1各云分部 | 消费品→自营/加盟/批发 | 半导体→按终端市场]

**Rules**:
- **核心盈利引擎**: 利润率最高 + 利润贡献最大 + 利润率趋势稳定或上升的分部
- **扩张放大器**: 收入增速最快但利润率低或亏损的分部
- **摆动因子**: 利润波动最大的分部(正或负方向)
- 核心引擎收入增速 < 总收入增速 → 增长依赖扩张而非核心 → 质量警告
- 扩张分部亏损扩大 + 核心分部利润率下降 → 双重恶化信号
- 利润贡献集中度: 单一分部贡献>80%利润 → 标记"单引擎依赖"

**Output**:
```yaml
segment_attribution:
  core_engine:
    segment: "XX业务"
    revenue_share: "X%"
    margin: "X%"
    margin_trend: "扩张 / 稳定 / 收缩"
  expansion_amplifier:
    segment: "XX新业务"
    revenue_growth: "X%"
    margin: "X% (亏损)"
    profitability_timeline: "FY2X预计盈亏平衡"
  swing_factor:
    segment: "XX业务"
    profit_volatility: "±$XM"
  growth_quality: "核心驱动 / 扩张驱动 / 混合"
  low_quality_flags: ["亏损分部扩张加速", "核心引擎增速放缓"]
```

---

### Step 6: 单元经济验证 (Unit Economics Validation) — 路径β

> **B框架独有的底层验证**: 总量数字可能掩盖单元经济恶化。
> **引用**: SaaS M2模块(NRR/Magic Number)作为SaaS行业插槽

**Collect**:
- [行业插槽通用]: 单位贡献利润率 + 趋势  `[DM必须]`
- [消费品]: 单店利润率 / 同店销售 / 成熟店vs新店表现 / 单位订单利润
- [SaaS]: NRR / Magic Number / CAC Payback → 引用enterprise_saas_modules.md M2
- [半导体]: 单位ASP vs 单位成本 / 晶圆良率
- [金融]: 单客户收入 / 单交易利润 / 信贷单元经济

**Rules**:
- 总收入增长 + 单元利润率下降 → "规模稀释经济性" — 增长可能在摧毁价值
- 订单量增长 + 单位订单利润下降 → "以量换收入"但非盈利性增长
- 成熟单元利润率稳定 + 总利润率下降 → 问题出在新单元(扩张质量差)
- 成熟单元利润率也在下降 → 核心业务本身在恶化(最严重信号)

**Output**:
```yaml
unit_economics:
  metric: "单店利润率 / NRR / 单位ASP"  # 视行业
  current: "X%"
  prior: "X%"
  trend: "改善 / 稳定 / 恶化"
  mature_vs_new: "成熟X% vs 新X%"
  expansion_quality: "健康 / 脆弱 / 误导性"
  verdict: "规模在改善经济性 / 规模在稀释经济性"
```

---

### Step 7: EPS归一化 (Tax, Capital Structure & EPS Normalization)

> **A框架独有**: EPS变化的真实来源分解。
> **引用**: buyback_efficiency_module.md(η函数)处理回购部分。

**Collect**:
- 税前利润  `[DM必须]`
- 所得税费用  `[DM必须]`
- 有效税率 + 税率调节项 (税率reconciliation)
- 利息费用  `[DM必须]`
- 稀释股数 (当期 vs 前期)  `[DM必须]`
- 少数股东权益

**EPS变化四因素分解** `[Python验证必须]`:

```python
# EPS变化分解公式
eps_change_total = eps_current - eps_prior

# 1. 经营贡献 (营业利润变化 / 前期股数, 用前期税率)
operating_contribution = (oi_current - oi_prior) * (1 - normalized_tax_rate) / shares_prior

# 2. 税务贡献 (税率变化对EPS的影响)
tax_contribution = pretax_income * (prior_etr - current_etr) / shares_prior

# 3. 利息/杠杆贡献 (利息费用变化)
interest_contribution = (interest_prior - interest_current) * (1 - normalized_tax_rate) / shares_prior

# 4. 回购/稀释贡献 (股数变化)
buyback_contribution = eps_current * (shares_prior - shares_current) / shares_prior
# 如果回购/FCF > 50% → 引用buyback_efficiency_module.md计算η

# 验证: 四因素之和 ≈ eps_change_total (允许±2%舍入差)
```

**归一化税率估计**:
- 取3-5年有效税率中位数(排除极端年份)
- 如果税率调节项中有>2pp来自一次性项目 → 当期税率不可持续

**Output**:
```yaml
eps_normalization:
  reported_eps: "$X.XX"
  normalized_eps: "$X.XX"         # [Python验证]
  eps_change_decomposition:       # [Python验证]
    operating: "+$X.XX (X%)"      # 经营贡献
    tax: "+$X.XX (X%)"            # 税务贡献
    interest: "+$X.XX (X%)"       # 利息/杠杆贡献
    buyback: "+$X.XX (X%)"        # 回购/稀释贡献
  normalized_tax_rate: "X%"
  eps_distortion_flags:
    - "X%的EPS增长来自回购而非经营"
    - "有效税率异常低(X% vs 归一化X%)"
  buyback_eta: "X.Xx"             # 如适用,引用buyback_efficiency_module
```

---

### Step 8: 现金验证 (Cash Validation)

> **两个框架共有的终极检验**: 利润如果不能兑现为现金，前面所有分析的可信度都要打折。
> **升级**: 不仅做QG-2式的通过/不通过判断，还要追因。

**Collect**:
- 经营活动现金流 (CFO)  `[DM必须]`
- 资本支出 (CapEx)  `[DM必须]`
- 自由现金流 (FCF = CFO - CapEx)  `[DM必须]`
- 营运资金变动主要科目 (应收/应付/存货)
- 资本化费用 (资本化软件开发/资本化利息等)
- 实际缴纳现金税 vs 报表所得税费用

**Rules**:
- FCF / 净利润 > 80% → 现金转换健康 (对应QG-2标准)
- FCF / 净利润 50-80% → 现金转换中等 → 检查营运资金原因
- FCF / 净利润 < 50% → 现金转换差 → 强制追因
- CFO增速 < 净利润增速 → 应计利润在膨胀(盈利质量下降)
- 应收账款增速 > 收入增速 → 可能有渠道塞货/客户付款恶化
- 资本化费用/总研发 > 30% → 费用资本化可能在美化利润
- 现金税/报表税 < 70% → 税收盈利中有大量非现金递延税

**判定矩阵**:

| 利润质量(Step 2-6) | 现金转换 | 综合判定 |
|:-------------------:|:--------:|---------|
| 高 | 强(>80%) | **高度可信** — 盈利真实且可持续 |
| 高 | 弱(<50%) | **存疑** — 利润数字好但现金不支持,深挖营运资金 |
| 低 | 强(>80%) | **谨慎乐观** — 会计扰动但现金流健康 |
| 低 | 弱(<50%) | **高度担忧** — 利润和现金双弱,盈利能力可能虚假 |

**Output**:
```yaml
cash_validation:
  cfo: "$XM"
  fcf: "$XM"
  fcf_to_ni_ratio: "X%"
  cash_conversion: "强 / 中 / 弱"
  accrual_quality:
    ar_vs_revenue_growth: "应收+X% vs 收入+X%"
    capitalized_costs_ratio: "X%"
    cash_tax_ratio: "X%"
  root_cause: "营运资金膨胀 / 资本化过度 / 税收递延 / 无异常"
  earnings_to_cash_verdict: "一致 / 部分一致 / 矛盾"
  sustainability: "持久 / 部分持久 / 脆弱"
```

---

## 三、最终产出: 利润表健康诊断卡

> 每份报告Phase 1财务章节完成后，**必须**产出此诊断卡(YAML格式)。
> 存放位置: `reports/{TICKER}/data/income_diagnostic.yaml`

```yaml
# 利润表健康诊断卡 (ISDD v1.0)
ticker: "XXXX"
date: "YYYY-MM-DD"
period: "FYxxxx / Qx FYxxxx"
path_used: "α正向 / β逆向 / γ快速"

# --- 核心诊断 ---
revenue_quality: "高 / 中 / 低"
operating_leverage: "正向 / 中性 / 负向"
earnings_quality: "高(gap<10%) / 中(10-25%) / 低(>25%)"
profit_driver: "收入驱动 / 毛利率扩张 / 费用控制 / 混合"

# --- 路径β专有 (如适用) ---
profit_scale_divergence: "无 / 轻微 / 中度 / 严重"
primary_profit_destroyer: "XX费用(+Xpp vs收入)"
cost_problem_type: "结构性 / 战略性 / 周期性 / 临时性 / 混合"
unit_economics_trend: "改善 / 稳定 / 恶化"
growth_engine: "核心驱动 / 扩张驱动 / 混合"

# --- EPS分解 ---
eps_operating_pct: "X%"    # 经营贡献占EPS变化百分比
eps_tax_pct: "X%"
eps_interest_pct: "X%"
eps_buyback_pct: "X%"

# --- 现金验证 ---
fcf_to_ni: "X%"
cash_conversion: "强 / 中 / 弱"
sustainability: "持久 / 部分持久 / 脆弱"

# --- 综合评级 ---
earnings_power_change: "显著改善 / 温和改善 / 稳定 / 温和恶化 / 显著恶化"
confidence_level: "高 / 中 / 低"
key_monitoring_items:
  - "下季度关注: XX费用增速是否回落"
  - "下季度关注: 单元经济是否企稳"
```

---

## 四、与现有系统的集成关系

### 引用关系 (避免重复建设)

| ISDD Step | 现有模块 | 关系 |
|-----------|---------|------|
| S0 收入质量 | SaaS M1(收入结构) | SaaS公司**引用M1**替代S0通用版 |
| S1α 经营杠杆 | cycle_exposure_module S2 | **引用**其经营杠杆量化公式 |
| S1α 经营杠杆 | B5 OPM趋势 (quality_scoring) | S1α产出**喂入**B5评分 |
| S6 单元经济 | SaaS M2(NRR/Magic Number) | SaaS公司**引用M2**替代S6通用版 |
| S7 EPS归一化 | buyback_efficiency_module | 回购部分**引用**η函数 |
| S8 现金验证 | QG-2 (FCF/NI >80%) | S8是QG-2的**详细版**(增加追因) |

### Phase触发时机

| 层级 | 触发 | 路径 |
|------|------|------|
| Tier 1 (快速扫描) | 不触发 | — |
| Tier 2 (标准分析) | Phase 1财务章节 | γ快速 (S0→S1α→S2简→S7→S8) |
| Tier 3 (深度研究) | Phase 1财务章节 | α或β (路由规则自动选择) |
| 财报更新 | 季度财报发布后 | γ快速 + 与前期诊断卡对比 |

### DM锚点要求汇总

本框架中标注`[DM必须]`的数据点共**18个**，全部需要DM锚点:
- S0: 有机收入增速、价量拆分 (2个)
- S1: 收入增速、毛利润增速、毛利率、营业利润增速、营业利润率 (5个)
- S3: COGS、营销、G&A、R&D各项增速 (4个)
- S5: 各分部收入+利润率 (2个)
- S6: 单位贡献利润率 (1个)
- S7: 税前利润、所得税、利息、稀释股数 (4个)
- S8: CFO、CapEx、FCF (已含S7部分重叠,净增0个)

### Python验证要求

| 计算 | 验证脚本 | 对应铁律 |
|------|---------|---------|
| 经营杠杆倍数 | inline Python | 铁律K |
| 三版盈利(GAAP/调整/归一化) | inline Python | 铁律K |
| EPS四因素分解 | inline Python | 铁律K + 铁律N |
| FCF/NI比率 | inline Python | 铁律K |

---

## 五、3条额外检查规则 (嵌入已有Step)

> **设计原则**: 不加新Step，不加公式。只在已有Step中追加简单判断规则。
> **来源**: 从学术研究中提炼的3条直觉性规则，用你原始框架的风格表达。

### 规则1: "利润比现金多太多 = 未来利润会缩水" → 嵌入S8

> 如果公司赚的"利润"远超实际收到的"现金"，说明利润里有大量还没兑现的应计项目。
> 历史数据表明：这种公司未来1-3年盈利大概率回落。

**在S8 Cash Validation中追加一条检查**:
- 计算: (净利润 - 经营现金流) / 总资产
- 如果 > 10% → 标记"应计膨胀警告：利润远超现金，盈利可能不可持续"
- 如果 < -5% → 标记"现金超利润：盈利保守，质量高"

**举例**:
- 公司报告净利润$500M，但CFO只有$200M，总资产$2B → (500-200)/2000 = 15% → 警告
- 典型场景：渠道塞货(应收膨胀)、存货囤积(半导体)、拨备释放(金融)

### 规则2: "应收账款增速 > 收入增速 = 最简单的造假预警" → 嵌入S8

> 不需要任何复杂模型。如果客户欠的钱涨得比收入还快，要么客户在赖账，要么公司在提前确认收入。

**在S8 Cash Validation中追加一条检查**:
- 已有: `ar_vs_revenue_growth`
- 强化判断: 应收增速超收入增速 > 10pp 连续2个季度 → 从"关注"升级为"强制追因"
- 追因方向: 大客户付款周期变化？季末集中确认收入？渠道塞货？

### 规则3: "收入涨了但费用没跟着涨(或反过来) = 盈利不可预测" → 嵌入S0

> 多卖多少就多花多少——这种公司的利润最可预测(消耗品模式: CTAS/IDXX)。
> 先花后赚或收入与成本脱节——这种公司的当期利润不代表未来(SaaS前期投入模式)。

**在S0 Revenue Quality中追加一条检查**:
- 看5年数据：收入变化和费用变化是否同步？
- 同步(多卖多花) → "盈利可预测性高，DCF信心强"
- 不同步(收入涨费用没涨，或费用涨收入没涨) → "当期OPM不代表稳态，估值需留余地"
- 从同步变不同步 → "业务模式正在转变的信号"(如Adobe从买断制转订阅制时)

---

## 六、跨板块优先级

> **不同行业关注不同Step**。不需要每次都跑全部8步。

| 行业 | 最该关注的3步 | 为什么 |
|------|-------------|--------|
| **消费品** | S1β(利润脱钩) → S3(费用归因) → S6(单店经济) | 扩张期最容易"增收不增利"，单店经济是底层真相 |
| **SaaS** | S2(SBC争议) → S6(NRR/Magic Number) → S8(递延收入) | SBC是最大盈利质量争议，NRR是增长质量核心 |
| **半导体** | S1α(经营杠杆) → S5(终端市场分部) → S0(ASP×量) | 高固定成本→杠杆倍数极大，终端市场轮动是摆动因子 |
| **金融** | S2(拨备操纵) → S7(税率/杠杆) → S5(分部混合) | 拨备释放/计提可以大幅扭曲利润，税率波动大 |
| **B2B平台** | S0(有机增速) → S5(核心引擎) → S7(EPS分解) | 并购驱动增长常见，需拆清有机vs收购 |

---

## 七、版本记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.2 | 2026-03-20 | **删除4个过度工程化的学术增强模块**。用3条简单检查规则替代(嵌入S0/S8)。删除跨板块星级矩阵,改为5行业×3步优先级表。回归原始框架的简洁风格 |
| v1.1 | 2026-03-20 | (已废弃) 学术增强模块 — 过度专业化,不符合框架风格 |
| v1.0 | 2026-03-20 | 初版。融合正向分解+逆向溯源，双路径+路由规则+8步+诊断卡 |
