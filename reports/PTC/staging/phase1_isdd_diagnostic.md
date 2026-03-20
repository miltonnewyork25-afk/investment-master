# PTC Inc. — ISDD v1.2 利润表深度诊断
# β路径(逆向溯源) — Phase 1财务诊断
# 日期: 2026-03-20

---

## ISDD路由判定

**量化路由计算**:
- 收入增速(FY2024→FY2025): +19.2%($2,298M→$2,739M) [DM-ISDD-001]
- 营业利润增速: +67.0%($588M→$982M) [DM-ISDD-002]
- profit_lag = 19.2% - 67.0% = **-47.8pp**(利润增速远超收入→表面为α)
- margin_delta = 35.9% - 25.6% = **+1,030bps**(OPM大幅扩张)

**自动路由→α路径(正向分解)**。但**手动覆盖为β路径**，原因:

1. **GAAP收入增速19.2%严重失真**: PTC的ARR增速仅8-9%(CC)，19.2%包含ASC 606合同确认节奏效应(Q4 $894M vs Q1 $565M=1.58x季节性)→用ARR增速8-9%重新计算→profit_lag需在归一化后评估
2. **OPM +1,030bps的可持续性存疑**: FY2025 OPM 35.9%含Q4异常高(48.5%)，Q1 FY2026回落至32.3%→标准化OPM可能仅32-34%→margin_delta实际可能仅+600-800bps
3. **M&A整合期(Codebeamer+ServiceMax FY2023收购)**: 收购整合掩盖了有机利润趋势
4. **IoT剥离(2026.3.16)**: 剥离前后的利润结构发生根本变化→需要逆向溯源才能理解"新PTC"的真实盈利能力

**执行路径: β(逆向溯源) S0→S1β→S2→S3→S4→S5→S6→S7→S8**

---

## Step 0: 收入质量扫描

**Collect**:
- 总收入增速: +19.2%(FY2024→FY2025) [DM-ISDD-001]
- 有机收入增速(扣除M&A+IoT+汇率): **~8-9%**(ARR CC增速) [DM-ISDD-003]
  - Codebeamer/ServiceMax在FY2024已年化→FY2025贡献增量约+2-3pp
  - SaaS迁移提价效应: +3-4pp
  - 纯有机(volume+新客): ~5-6%
- 价格贡献 vs 量贡献:
  - 价格: SaaS迁移提价1.5-2.5x + 年度通胀调价3-5% → **价格贡献约+6-8pp** [DM-ISDD-004]
  - 量: 新客户净增约+2-3pp(客户数增长有限, Ch5部署摩擦限制)
  - **价格 >> 量(约3:1)** → 标记"**价格驱动(量增长停滞)**"
- 经常性收入占比: **~95%**(订阅+SaaS) [DM-ISDD-005] → 极高, 无恶化

**规则3检查(收入-费用同步性)**:
- 5年数据: 收入CAGR 13.4%(FY2020-2025), 总费用CAGR 7.1%($1,248M→$1,757M)
- 收入增速显著>费用增速 → **盈利可预测性中等**(收入波动大于费用, 但方向一致)
- 从同步→不同步趋势: FY2020-2022(同步, OPM 14-23%) → FY2023-2025(不同步, OPM 22-36%) → **业务模式正在转变(SaaS转型释放运营杠杆)** [DM-ISDD-006]

```yaml
revenue_quality:
  organic_growth: "5-6%(纯有机) / 8-9%(含SaaS提价)"
  price_volume_split: "价6-8pp / 量2-3pp (价格驱动≈3:1)"
  recurring_ratio: "95%"
  quality_verdict: "中"
  flags: ["价格驱动(量增长停滞)", "GAAP增速19.2%严重失真(ARR仅8-9%)", "业务模式转变期(SaaS运营杠杆释放)"]
```

---

## Step 1β: 利润-规模脱钩检测

**Collect(归一化后)**:
- 归一化收入增速(用ARR CC): +8-9% [DM-ISDD-003]
- 营业利润增速(GAAP): +67.0% [DM-ISDD-002]
- 净利润增速: +95.1%($376M→$734M) [DM-ISDD-007]
- 营业利润率: 25.6%→35.9%(+1,030bps)
- 净利润率: 16.4%→26.8%(+1,040bps)

**表面诊断**: profit_lag = 8% - 67% = **-59pp** → 利润增速远超收入。这**不是**"增收不增利"——这是"增收大增利"(正向脱钩)。

**但需要逆向追问: 这个"大增利"是可持续的还是一次性的?**

**利润超速增长的来源拆解**:
1. **毛利率改善**: 80.6%→83.8%(+320bps) → 贡献利润增长约+$87M [DM-ISDD-008]
   - 来源: SaaS混合占比提升(SaaS毛利率85%+ vs on-prem 70%+)+IoT低毛利业务Q4剥离筹备中边际贡献减少
   - **可持续性: 高** — SaaS占比将继续提升

2. **SGA压缩**: 36.4%→28.9%(-750bps) → 贡献利润增长约+$205M [DM-ISDD-009]
   - 来源: 收入大涨(特别是Q4 $894M)稀释了相对固定的SGA→运营杠杆效应
   - **可持续性: 中** — Q4收入峰值不可外推; 正常化SGA/Rev约30-31%(Q1 FY2026实际31.3%)

3. **R&D/Rev下降**: 18.8%→16.7%(-210bps) → 贡献利润增长约+$58M [DM-ISDD-010]
   - 来源: R&D绝对值小幅增长($433M→$458M, +5.6%)但被收入大涨稀释
   - **可持续性: 中偏低** — R&D绝对值仍在增长, 比率下降主要是分母效应

4. **利息费用下降**: $120M→$77M(-$43M) → 贡献税后利润增长约+$33M [DM-ISDD-011]
   - 来源: 债务偿还(净债务$1.66B→$1.19B)
   - **可持续性: 高(但增量有限)** — 债务已降至低位, 未来利息节省空间小

**关键发现: OPM从25.6%跳到35.9%中, 约一半(+5pp)来自可持续因素(SaaS混合+毛利结构), 另一半(+5pp)来自Q4收入峰值的运营杠杆稀释效应(不可持续)** [DM-ISDD-012]。

Q1 FY2026的OPM 32.3%可能更接近"标准化水平"。预测FY2026全年标准化OPM: **33-35%**(比FY2025的35.9%略低, 因为IoT剥离后收入基数降低+Q4峰值不一定重现)。

```yaml
profit_scale_divergence:
  revenue_growth: "8-9%(ARR CC归一化)"
  operating_income_growth: "+67%(GAAP, 含运营杠杆+收入确认节奏)"
  net_income_growth: "+95.1%"
  profit_lag: "-59pp(利润超速增长)"
  margin_direction: "扩张(+1,030bps GAAP)"
  divergence_severity: "正向脱钩(利润 >> 收入)"
  problem_layer: "无问题 — 但OPM中约一半来自不可持续的Q4稀释效应"
  normalized_opm: "33-35%(vs GAAP 35.9%)"
```

---

## Step 2: 盈利质量清洗

**非经常性项目识别(FY2025)**:

| 项目 | 金额 | 经营/非经营 | 现金/非现金 | 性质 | 调整决策 |
|------|------|:-----------:|:---------:|------|---------|
| SBC | $216M | 经营 | 非现金 | 持续性 | **保留**(SBC/Rev=7.9%>5%) |
| 并购摊销 | ~$100M(估) | 争议 | 非现金 | 持续性(连续并购) | **保留**(PTC持续并购=业务模式) |
| 重组费用 | ~$20M(估) | 经营 | 混合 | 周期性 | **保留**(IoT剥离相关, 但属于战略执行) |
| IoT剥离相关 | ~$10-20M | 非经营 | 混合 | 一次性 | **剔除** |

[DM-ISDD-013]

**三版盈利(FY2025)**:

| 版本 | EPS | 方法 |
|------|-----|------|
| GAAP | $6.08 | 原始 |
| 管理层Non-GAAP | ~$8.50-9.00(估) | 剔除SBC+并购摊销+重组 |
| 分析师归一化 | **$6.20-6.40** | 仅剔除IoT一次性($10-20M税后→$0.08-0.15/股) |

[DM-ISDD-014]

**GAAP vs 归一化差距**: ($6.30 - $6.08) / $6.08 = **3.6%** → 差距<10% → **盈利质量: 高**

SBC决策: PTC SBC/Rev=7.9%(>5%阈值) → 不应剔除。$216M SBC是真实的人力成本, 只是非现金。但需注意: 管理层Non-GAAP剔除了SBC, 使得Non-GAAP EPS~$8.50-9.00(比GAAP高40%+)→**投资者应使用GAAP EPS而非管理层调整版**。

```yaml
earnings_quality:
  gaap_earnings: "$734M (EPS $6.08)"
  mgmt_adjusted_earnings: "~$1,020-1,080M (EPS ~$8.50-9.00)"
  analyst_normalized_earnings: "$748-772M (EPS $6.20-6.40)"
  gaap_to_normalized_gap: "3.6%"
  disputed_items:
    - item: "SBC"
      amount: "$216M"
      decision: "保留(不剔除)"
      reason: "SBC/Rev=7.9% > 5%阈值; 持续性真实成本"
    - item: "并购摊销"
      amount: "~$100M"
      decision: "保留(不剔除)"
      reason: "PTC持续并购(Codebeamer/ServiceMax/Arena/Onshape)=业务模式"
  quality_verdict: "高(gap=3.6%)"
```

---

## Step 3: 费用增速归因

**各项费用增速(FY2024→FY2025)**:

| 费用项 | FY2024 | FY2025 | 增速 | vs收入(+19.2%) | 判定 |
|--------|--------|--------|------|:-------------:|------|
| COGS | $445M | $445M | **0%** | **-19.2pp** | **强规模效率** |
| R&D | $433M | $458M | +5.8% | -13.4pp | 规模效率 |
| S&M | $559M | $567M | +1.4% | -17.8pp | **强规模效率** |
| G&A | $232M | $226M | **-2.6%** | -21.8pp | **强规模效率** |
| D&A | $141M | $135M | -4.3% | -23.5pp | 效率(并购摊销减少) |

[DM-ISDD-015]

**核心发现: PTC的每一项费用增速都远低于收入增速 — 这不是选择性的费用控制，而是全面的运营杠杆释放。**

**但需要用归一化收入(ARR +8-9%)重新计算**:

| 费用项 | 增速 | vs ARR(+8-9%) | 归一化判定 |
|--------|------|:-------------:|---------|
| COGS | 0% | **-8-9pp** | 规模效率(SaaS混合改善) |
| R&D | +5.8% | -2-3pp | **中性偏正**(R&D增长但慢于收入) |
| S&M | +1.4% | **-7-8pp** | 规模效率(GTM重组效果?) |
| G&A | -2.6% | **-11-12pp** | 强规模效率(管理精简) |

[DM-ISDD-016]

**即使用归一化收入，费用增速仍全面低于收入→运营杠杆是真实的，不仅仅是Q4收入峰值效应。**

排名(效率来源):
1. **G&A(-11pp)**: 最大的效率来源 — Neil Barua的管理精简
2. **S&M(-8pp)**: 第二大效率来源 — 可能反映GTM重组+渠道效率
3. **COGS(-9pp)**: SaaS混合改善(云收入毛利率>本地)
4. **R&D(-3pp)**: 温和效率 — R&D绝对值仍在增长(好事)

**无利润吞噬者**: PTC当前没有任何费用项增速超过收入→是典型的"SaaS运营杠杆释放期"→OPM扩展有结构性支撑。

```yaml
expense_attribution:
  top_destroyers: "无 — 所有费用项增速均低于收入"
  improving_lines:
    - line: "G&A"
      growth: "-2.6%"
      vs_revenue: "-21.8pp (GAAP) / -11pp (ARR归一化)"
      verdict: "强规模效率(管理精简)"
    - line: "S&M"
      growth: "+1.4%"
      vs_revenue: "-17.8pp (GAAP) / -8pp (ARR归一化)"
      verdict: "规模效率(GTM重组)"
  primary_profit_destroyer: "无"
  overall: "全面运营杠杆释放 — SaaS转型的典型盈利曲线"
```

---

## Step 4: 成本问题分类

PTC当前无"利润吞噬者"，但仍需分类各费用项的性质以判断可持续性:

| 费用项 | 分类 | 证据 | 投资含义 |
|--------|------|------|---------|
| COGS稳定 | **结构性改善** | SaaS毛利率>本地→混合改善是不可逆的 | 毛利率将持续在83-86%区间 |
| S&M效率 | **战略性+结构性** | GTM重组(战略) + SaaS自助续约(结构) | S&M/Rev可持续在27-30% |
| G&A压缩 | **战略性** | 管理层主动精简→有下限(不能无限裁) | G&A/Rev约8-9%接近底部 |
| R&D温和增长 | **战略性** | 维持竞争力的必要投入 | R&D/Rev 16-17%是底线(再压=产品落后) |

[DM-ISDD-017]

```yaml
cost_classification:
  problems: "无利润吞噬者"
  improvements:
    - line: "COGS"
      type: "结构性改善"
      evidence: "SaaS混合占比↑→毛利率结构性上移"
      investment_implication: "毛利率83-86%可持续"
    - line: "S&M"
      type: "战略性+结构性"
      evidence: "GTM重组+SaaS自助续约"
      investment_implication: "S&M/Rev 27-30%可持续, 但进一步压缩可能影响增长"
    - line: "G&A"
      type: "战略性(接近底部)"
      evidence: "管理精简, G&A/Rev=8.3%已低于行业"
      investment_implication: "G&A压缩空间有限(~0.5-1pp)"
  overall_verdict: "全面改善, 无结构性成本问题"
  opm_ceiling: "理论天花板~42-44%, 现实天花板~38-40%(R&D不可再压)"
```

---

## Step 5: 分部归因 + 核心引擎识别

**PTC分部拆解(PLM vs CAD)**:

| 指标 | PLM(含CB/SM/Arena) | CAD(Creo/Onshape) | 合计 |
|------|:---:|:---:|:---:|
| ARR(Q1 FY2026) | $1,533M(61.5%) | $961M(38.5%) | $2,494M |
| ARR增速(CC) | ~10% | ~7% | ~9% |
| 利润率(估) | ~38-40% | ~32-34% | 35.9% |
| 利润贡献(估) | ~65-70% | ~30-35% | 100% |

[DM-ISDD-018]

**引擎判定**:
- **核心盈利引擎**: PLM(Windchill为主) — 最高利润率+最大利润贡献+增速>CAD
- **扩张放大器**: Codebeamer(ALM) — 增速最快(~20%+)但ARR基数小($100-200M)
- **摆动因子**: ServiceMax(SLM) — churn信号使其从"贡献者"变为"不确定因素"

**规则检查**:
- 核心引擎(PLM)收入增速(10%) > 总ARR增速(9%) → ✅ 核心驱动增长(非扩张驱动)
- 单一分部(PLM)贡献65-70%利润 → 标记"**单引擎偏重**"(但不是>80%,可接受)

```yaml
segment_attribution:
  core_engine:
    segment: "PLM(Windchill)"
    revenue_share: "~50%(Windchill本体) / 61.5%(PLM分类)"
    margin: "~38-40%"
    margin_trend: "扩张(SaaS迁移提价)"
  expansion_amplifier:
    segment: "Codebeamer(ALM)"
    revenue_growth: "~20%+"
    margin: "待验证(收购整合期)"
    profitability_timeline: "FY2028-2030预计独立盈利"
  swing_factor:
    segment: "ServiceMax(SLM)"
    profit_volatility: "churn未量化"
    risk: "减值$3-5B"
  growth_quality: "核心驱动(PLM增速>总ARR)"
  low_quality_flags: ["ServiceMax churn方向未明", "Onshape收入贡献极小"]
```

---

## Step 6: 单元经济验证 (SaaS插槽→引用M2)

**已在Ch6完成(引用)**:
- NRR推断: 100-110%(锁定型, 非扩展型) [DM-NRR-002]
- Magic Number(年度): 0.43x(长周期效应) [DM-SAS-003]
- LTV/CAC: 8.5x(优秀but可能获客不足) [DM-SAS-007]

**Step 6额外检查: 成熟客户vs新客户经济性**:
- 成熟客户(使用>5年): GRR推断>95%, NRR~100%(仅通胀调价)→**稳定但不扩展**
- SaaS迁移客户: 一次性ARR提升1.5-2.5x→**NRR表面高(150-250%)但不可重复**
- 新客户(首年): 获客成本$1.41/$1ARR, 平均合同$60K→单客CAC约$85K→payback约14个月(健康)

**规则检查**:
- 总ARR增长(8-9%) + 单元(NRR)接近100% → 增长几乎完全来自新客户→**扩展质量: 中偏弱**
- 排除SaaS迁移效应后，存量客户NRR可能仅97-98%→**核心单元经济在微幅收缩** [DM-ISDD-019]

```yaml
unit_economics:
  metric: "NRR(推断) + Magic Number(年度)"
  current_nrr: "100-110%(含SaaS迁移)"
  underlying_nrr: "97-98%(排除SaaS迁移)"
  magic_number: "0.43x(年度)"
  ltv_cac: "8.5x"
  mature_vs_new: "成熟NRR~100% vs 迁移NRR 150-250%(一次性)"
  expansion_quality: "中偏弱(增长依赖新客, 存量微收缩)"
  verdict: "规模在改善经济性(OPM↑), 但单元微收缩(NRR<100%排除迁移)"
```

---

## Step 7: EPS归一化

**EPS变化四因素分解(FY2024→FY2025)**:

| 项目 | FY2024 | FY2025 | 变化 |
|------|--------|--------|------|
| 营业利润 | $588M | $982M | +$394M |
| 税前利润 | $469M | $920M | +$451M |
| 所得税 | $93M | $186M | +$93M |
| 有效税率 | 19.7% | 20.2% | +50bps |
| 利息费用 | $120M | $77M | -$43M |
| 稀释股数 | 120.7M | 120.8M | +0.1M(≈0) |
| EPS(稀释) | $3.12 | $6.08 | +$2.96 |

[DM-ISDD-020]

**四因素分解**(需Python验证, 此处手算初步):

```
归一化税率(3年中位数): ~20%

1. 经营贡献 = ($982M - $588M) × (1 - 20%) / 120.7M = $394M × 0.8 / 120.7M = +$2.61
2. 税务贡献 = $920M × (19.7% - 20.2%) / 120.7M = $920M × (-0.5%) / 120.7M = -$0.04
3. 利息贡献 = ($120M - $77M) × (1 - 20%) / 120.7M = $43M × 0.8 / 120.7M = +$0.28
4. 回购贡献 = $6.08 × (120.7M - 120.8M) / 120.7M = $6.08 × (-0.1M) / 120.7M ≈ $0.00

合计: $2.61 + (-$0.04) + $0.28 + $0.00 = +$2.85
实际变化: +$2.96
差异: $0.11(3.7%→舍入+少数股东→可接受)
```

[DM-ISDD-021]

**EPS变化来源占比**:
| 来源 | 贡献 | 占比 |
|------|------|------|
| **经营改善** | +$2.61 | **88%** |
| 利息节省 | +$0.28 | 10% |
| 税务 | -$0.04 | -1% |
| 回购 | $0.00 | 0% |
| 舍入差 | +$0.11 | 3% |

**核心发现: PTC FY2025 EPS增长的88%来自经营改善(OPM扩张)——这是高质量的EPS增长** [DM-ISDD-022]。非经营因素(利息/税/回购)仅贡献10%。

**但需注意**: 经营贡献的$2.61中, 大约$1.00-1.30来自Q4收入确认峰值的运营杠杆(不可持续), 另外$1.30-1.60来自结构性OPM改善(可持续)。因此**可持续EPS增长约+$1.60-1.90/年**(约50-65%的实际增长)。

FY2026E归一化EPS: 如果标准化OPM 33-35%, 收入~$2.6B(IoT剥离后), 税率20%:
- 归一化EBIT: $2.6B × 34% = $884M
- 归一化净利润: ($884M - $55M利息) × 0.8 = $663M
- 归一化EPS: $663M / 120M = **~$5.50** [DM-ISDD-023]
- vs 管理层FY2026 EPS指引$7.87 → **差距+43%来自Non-GAAP调整(SBC/摊销/季节性)**

```yaml
eps_normalization:
  reported_eps: "$6.08"
  normalized_eps: "$6.20-6.40(剔除IoT一次性)"
  fy2026e_normalized_eps: "~$5.50(GAAP归一化, 含IoT剥离影响)"
  eps_change_decomposition:
    operating: "+$2.61 (88%)"
    tax: "-$0.04 (-1%)"
    interest: "+$0.28 (10%)"
    buyback: "$0.00 (0%)"
  normalized_tax_rate: "20%"
  eps_distortion_flags:
    - "管理层Non-GAAP EPS~$8.50-9.00, GAAP EPS $6.08 — 差距40%+(SBC+摊销)"
    - "FY2025 EPS中约40-50%的增长来自Q4收入确认峰值的运营杠杆(不可持续)"
  buyback_eta: "0.4%(净回购效果极低, $300M回购被$216M SBC抵消)"
```

---

## Step 8: 现金验证

**Collect(FY2025)**:
- CFO: $868M [DM-ISDD-024]
- CapEx: $11M [DM-ISDD-025]
- FCF: $857M [DM-ISDD-026]
- 净利润: $734M
- FCF/NI: $857M/$734M = **117%** → 现金转换**强** ✅

**追加检查(ISDD v1.2规则1)**:
- (净利润 - CFO) / 总资产 = ($734M - $868M) / $6,617M = **-2.0%** → **现金超利润: 盈利保守, 质量高** ✅

**追加检查(ISDD v1.2规则2)**:
- 应收增速: ($1,001M - $862M) / $862M = +16.1%
- 收入增速: +19.2%
- AR增速 < 收入增速 → **无渠道塞货信号** ✅ [DM-ISDD-027]

**营运资金变动**:
- 应收增加: -$121M(收入增长→应收自然增加→正常)
- 其他: -$67M(预付/应计等)
- 总营运资金消耗: -$188M → 是FCF低于理论水平的原因, 但在收入大涨年份是正常的

**资本化费用检查**:
- PTC CapEx仅$11M → 几乎无资本化(纯SaaS轻资产) → 无费用资本化风险

```yaml
cash_validation:
  cfo: "$868M"
  fcf: "$857M"
  fcf_to_ni_ratio: "117%"
  cash_conversion: "强(>80%)"
  accrual_quality:
    ar_vs_revenue_growth: "应收+16.1% vs 收入+19.2% → 正常"
    ni_minus_cfo_over_assets: "-2.0%(现金超利润→保守)"
    capitalized_costs_ratio: "极低(CapEx $11M)"
    cash_tax_ratio: "待查(10-K)"
  root_cause: "无异常"
  earnings_to_cash_verdict: "一致(FCF>NI)"
  sustainability: "持久"
```

---

## 利润表健康诊断卡

```yaml
# 利润表健康诊断卡 (ISDD v1.2)
ticker: "PTC"
date: "2026-03-20"
period: "FY2025 (截至2025-09-30)"
path_used: "β逆向(手动覆盖, 原因: GAAP收入失真+M&A整合+IoT剥离)"

# --- 核心诊断 ---
revenue_quality: "中(价格驱动3:1, 有机增速仅5-6%)"
operating_leverage: "正向(全面运营杠杆释放, OPM+1,030bps)"
earnings_quality: "高(GAAP vs 归一化差距3.6%)"
profit_driver: "毛利率扩张(+320bps) + 费用控制(SGA-750bps)"

# --- 路径β专有 ---
profit_scale_divergence: "正向脱钩(利润 >> 收入, 但约半数来自Q4稀释效应)"
primary_profit_destroyer: "无 — 所有费用项增速低于收入"
cost_problem_type: "无问题(全面结构性+战略性改善)"
unit_economics_trend: "表面稳定(NRR 100-110%), 底层微收缩(排除SaaS迁移NRR 97-98%)"
growth_engine: "核心驱动(PLM增速10% > 总ARR 9%)"

# --- EPS分解 ---
eps_operating_pct: "88%"
eps_tax_pct: "-1%"
eps_interest_pct: "10%"
eps_buyback_pct: "0%"

# --- 现金验证 ---
fcf_to_ni: "117%"
cash_conversion: "强"
sustainability: "持久"

# --- 综合评级 ---
earnings_power_change: "显著改善(SaaS运营杠杆释放, OPM 14%→36% in 5Y)"
confidence_level: "中高(盈利质量高+现金强, 但OPM部分来自不可持续的Q4稀释)"
normalized_opm_range: "33-35%(vs报告35.9%)"
key_monitoring_items:
  - "Q2 FY2026: OPM是否回到32-34%(确认标准化水平)"
  - "ServiceMax churn: FY2026 Q2末是否改善(管理层承诺)"
  - "SaaS迁移速度: Windchill+渗透率变化(决定提价持续性)"
  - "R&D/Rev是否维持16-17%(低于15%=竞争力风险)"
```
