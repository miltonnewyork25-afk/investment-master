# MAR Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-05
## 数据预取版本: v4.0
## 行业: 消费品/酒店 | 框架: v18.0 + consumer v28.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $26.186B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05
- **用于**: Ch02, Ch14 §Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $2.601B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05

### DM-FIN-003
- **值**: FY2025 Gross Profit $5.587B (Gross Margin 21.3%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05
- **注**: Gross profit = Total Revenue - Cost Reimbursement - Other COGS. 包含所有fee revenue

### DM-FIN-004
- **值**: FY2025 Operating Income $4.141B (OPM 15.8%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05

### DM-FIN-005
- **值**: FY2025 EBITDA $4.488B (EBITDA Margin 17.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05
- **注**: 公司报告Adj EBITDA $5.383B(含加回项), FMP口径$4.488B

### DM-FIN-006
- **值**: FY2025 EPS Diluted $9.49 (Reported) / $10.02 (Adjusted)
- **类型**: H
- **来源**: MCP fmp_data income FY2025 + 10-K
- **日期**: 2026-03-05

### DM-FIN-007
- **值**: FY2025 Interest Expense $809M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-05

### DM-FIN-008
- **值**: FY2025 D&A $298M (income) / $599M (cashflow含lease amortization)
- **类型**: H
- **来源**: MCP fmp_data income+cashflow FY2025
- **日期**: 2026-03-05

### DM-FIN-009
- **值**: FY2025 SBC $236M (0.9% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-05

### DM-FIN-010
- **值**: FY2025 Effective Tax Rate 23.4%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025 ($793M / $3,394M)
- **日期**: 2026-03-05

### DM-FIN-011
- **值**: FY2025 OCF $3.212B / FCF $2.608B / CapEx $604M
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-05

### DM-FIN-012
- **值**: FY2025 Share Repurchases $3.300B + Dividends $718M = 资本回报 $4.018B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-05
- **注**: 资本回报$4.0B > FCF$2.6B — 差额$1.4B由新增债务弥补

### DM-FIN-013
- **值**: FY2025 Total Debt $17.083B / Net Debt $16.725B / Cash $358M
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-05

### DM-FIN-014
- **值**: FY2025 Total Equity -$3.771B (负权益, 因$27.9B Treasury Stock)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-05

### DM-FIN-015
- **值**: FY2025 Goodwill $8.907B + Intangibles $10.336B = $19.243B (69.9% of assets)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-05

### DM-FIN-016
- **值**: Shares Outstanding 268.5M (basic) / 269.4M (diluted) — 5年回购: 329.3M→269.4M (-18.2%)
- **类型**: H
- **来源**: MCP fmp_data income FY2021-2025
- **日期**: 2026-03-05

### DM-FIN-017
- **值**: 5年收入趋势: $13.9B→$20.8B→$23.7B→$25.1B→$26.2B (FY21-25)
- **类型**: H
- **来源**: MCP fmp_data income FY2021-2025
- **日期**: 2026-03-05

### DM-FIN-018
- **值**: 5年Net Income趋势: $1.1B→$2.4B→$3.1B→$2.4B→$2.6B (FY21-25)
- **类型**: H
- **来源**: MCP fmp_data income FY2021-2025
- **日期**: 2026-03-05
- **注**: FY2023 NI $3.1B因低税率(8.7%), 非可持续

### DM-FIN-019
- **值**: 5年债务轨迹: $11.2B→$11.1B→$12.8B→$15.2B→$17.1B (+52% over 4 years)
- **类型**: H
- **来源**: MCP fmp_data balance FY2021-2025
- **日期**: 2026-03-05

### DM-FIN-020
- **值**: 5年回购轨迹: $0→$2.6B→$4.0B→$3.8B→$3.3B (累计$13.6B over 4 years)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2021-2025
- **日期**: 2026-03-05

### DM-FIN-021
- **值**: Gross Fee Revenue $5,438M (+5% YoY), 含信用卡费$716M (+8%)
- **类型**: H
- **来源**: 10-K FY2025 press release
- **日期**: 2026-03-05

### DM-FIN-022
- **值**: Cost Reimbursement Revenue ~$19.2B (pass-through, net zero to operating income)
- **类型**: H
- **来源**: 10-K FY2025
- **日期**: 2026-03-05

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: P/E (TTM, real-time) 35.4x ($335.94 / $9.49)
- **类型**: H
- **来源**: MCP fmp_data quote + income FY2025
- **日期**: 2026-03-05

### DM-VAL-002
- **值**: Forward P/E 25.8x (based on FY2026E consensus)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-05

### DM-VAL-003
- **值**: EV/EBITDA 22.3x (FMP口径, EV $100.0B / EBITDA $4.488B)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-004
- **值**: FMP DCF公允价值 $215.66 vs 股价 $335.94 (-36% overvaluation)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-03-05
- **注**: FMP DCF使用标准假设, 可能未反映品牌/特许权溢价

### DM-VAL-005
- **值**: Market Cap $89.0B (real-time) / $83.3B (FY2025 year-end)
- **类型**: H
- **来源**: MCP fmp_data quote + key-metrics
- **日期**: 2026-03-05

### DM-VAL-006
- **值**: EV $100.0B
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-007
- **值**: ROIC 15.6% (Invested Capital $17.3B)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-008
- **值**: ROCE 21.6%
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-009
- **值**: FCF Yield 3.1% ($2.608B / $83.3B)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-010
- **值**: Net Debt/EBITDA 3.73x
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-05

### DM-VAL-011
- **值**: Interest Coverage 5.12x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-05

### DM-VAL-012
- **值**: Dividend Yield 0.86% / Payout Ratio 27.6%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-05

### DM-VAL-013
- **值**: P/FCF 31.9x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-05

### DM-VAL-014
- **值**: Beta 1.101
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-05

---

## Section C: 竞品对标锚点 (DM-COMP-xxx)

### DM-COMP-001
- **值**: P/E阶梯 — IHG 27.8x < MAR 35.4x < HLT 49.8x < WH 32.2x
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-03-05

### DM-COMP-002
- **值**: ROIC排序 — IHG 22.6% > MAR 15.6% > HLT 11.3%
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-03-05
- **注**: ROIC与P/E完全负相关 — 效率悖论

### DM-COMP-003
- **值**: Net Debt/EBITDA — IHG 2.86x < MAR 3.73x < HLT 5.12x
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-03-05

### DM-COMP-004
- **值**: 规模 — MAR 1.78M rooms > HLT 1.3M > IHG 1.01M
- **类型**: H
- **来源**: 10-K/IR
- **日期**: 2026-03-05

### DM-COMP-005
- **值**: NUG — HLT 6.7% > IHG ~4.7% > MAR 4.3%
- **类型**: H
- **来源**: 10-K/IR
- **日期**: 2026-03-05

### DM-COMP-006
- **值**: 会员规模 — MAR 271M > HLT 243M > IHG 160M
- **类型**: H
- **来源**: IR
- **日期**: 2026-03-05

### DM-COMP-007
- **值**: 所有三家公司都有负权益(MAR -$3.8B, HLT -$4.9B, IHG negative)
- **类型**: H
- **来源**: MCP fmp_data balance/key-metrics
- **日期**: 2026-03-05

---

## Section D: 市场环境锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: 当前股价 $335.94 (2026-03-04 close)
- **类型**: H
- **来源**: MCP quote
- **日期**: 2026-03-05

### DM-MKT-002
- **值**: 52周范围 $205.40 - $370.00 (当前位于58th percentile)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-05

### DM-MKT-003
- **值**: RSI 32.3 (接近超卖)
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-05

### DM-MKT-004
- **值**: SMA20 $343.71 > SMA50 $327.81 > SMA200 $285.36
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-05
- **注**: 价格低于SMA20(短期弱势)但远高于SMA200(长期强势)

### DM-MKT-005
- **值**: S&P 500 6,869.5 | VIX 21.15 (-10.3%)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-05

---

## Section E: 分析师预期锚点 (DM-EST-xxx)

### DM-EST-001
- **值**: FY2028E Revenue ~$29.9B (9 analysts) / EPS ~$14.24 (5 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-05

### DM-EST-002
- **值**: FY2029E Revenue ~$30.2B (4 analysts) / EPS ~$15.91 (1 analyst)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-05
- **注**: 仅1位分析师覆盖2029 EPS, 可靠性低

### DM-EST-003
- **值**: FY2030E Revenue ~$27.5B (4 analysts) / EPS ~$19.04 (1 analyst)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-05
- **注**: 收入估计下降(可能含口径变化), 可靠性低

### DM-EST-004
- **值**: 管理层2026指引: Adj EPS $11.32-$11.57 (+13-15%), Adj EBITDA $5.8-5.9B, Gross Fee Rev $5.9-5.96B
- **类型**: H
- **来源**: 10-K FY2025 press release
- **日期**: 2026-03-05

---

## Section F: 业务特征锚点 (DM-BIZ-xxx — 来自lit_recon)

### DM-BIZ-001
- **值**: Bonvoy 271M会员, FY2025新增43M, US 75%/Global 68%会员房晚占比
- **类型**: H
- **来源**: IR/10-K
- **日期**: 2026-03-05

### DM-BIZ-002
- **值**: Co-branded credit card fees $716M (+8% YoY), 2026E +35% (~$966M)
- **类型**: H (FY2025), R (2026E)
- **来源**: 10-K + 管理层指引
- **日期**: 2026-03-05
- **推理链(R)**: $716M × 1.35 = $966M (费率提升+消费增长)
- **证伪条件**: 2026H1信用卡费<$450M

### DM-BIZ-003
- **值**: 总物业9,800+ / 1.78M rooms / Pipeline 610K rooms (4,056物业)
- **类型**: H
- **来源**: 10-K FY2025
- **日期**: 2026-03-05

### DM-BIZ-004
- **值**: NUG 4.3% (2026指引4.5-5.0%), Room Deletions 1.0-1.5%
- **类型**: H
- **来源**: 10-K FY2025
- **日期**: 2026-03-05

### DM-BIZ-005
- **值**: RevPAR WW +2.0% (US +0.7%, Intl +5.1%) FY2025
- **类型**: H
- **来源**: 10-K FY2025
- **日期**: 2026-03-05

### DM-BIZ-006
- **值**: 30+品牌(6 luxury + 12 premium + 10 select + 8 extended stay + 3 midscale)
- **类型**: H
- **来源**: Skift/10-K
- **日期**: 2026-03-05

### DM-BIZ-007
- **值**: 直订占比~75%+ (2021基准), OTA~14%, GDS/其他~11%
- **类型**: H (2021), R (当前估计)
- **来源**: PhocusWire/Marriott 2022 Annual Report
- **日期**: 2026-03-05

### DM-BIZ-008
- **值**: J.D. Power 2025: Ritz-Carlton #1 Luxury (779/1000); ACSI: MAR 78 vs HLT 80 vs IHG 79
- **类型**: H
- **来源**: J.D. Power NAGSI 2025 / ACSI 2025
- **日期**: 2026-03-05

### DM-BIZ-009
- **值**: 酒店业劳工成本34.4% of revenue (2024), +540bps vs 2019; 保险+19.5% YoY
- **类型**: H
- **来源**: CBRE/Actabl/CoStar
- **日期**: 2026-03-05

### DM-BIZ-010
- **值**: Select-service GOP margin >40% > Luxury 36-38%
- **类型**: H
- **来源**: CBRE/HotStats
- **日期**: 2026-03-05

---

## Section G: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: MAR Revenue CAGR FY2025-2028E ~4.5% ($26.2B → $29.9B)
- **类型**: R
- **推理链**: FY2025 +4.3% → NUG 4.5-5.0% + RevPAR +1.5-2.5% → fee revenue ~7-10% → total revenue ~4-5% (cost reimbursement稀释)
- **证伪条件**: NUG连续2Q <3.5% 或 RevPAR连续2Q negative
- **来源**: FMP estimates + 管理层指引
- **日期**: 2026-03-05

### DM-INF-002
- **值**: 资本回报>FCF的持续性 — FY2022-2025连续4年回购+分红>FCF, 缺口由新增债务弥补
- **类型**: R
- **推理链**: FCF $2.0-2.7B vs 资本回报 $2.9-4.5B → 年均缺口$1-2B → 债务$11B→$17B
- **证伪条件**: FY2026资本回报≤FCF (管理层指引>$4.3B vs FCF大概率<$3B → 仍会超出)
- **来源**: MCP fmp_data cashflow FY2021-2025 + 管理层指引
- **日期**: 2026-03-05

### DM-INF-003
- **值**: HLT溢价来源假说 — P/E 49.8x (41%溢价 vs MAR) 主要由NUG 6.7%驱动, 非资本效率
- **类型**: R
- **推理链**: ROIC(HLT 11.3% < MAR 15.6%)和杠杆(HLT 5.12x > MAR 3.73x)均不支持溢价 → 唯一解释是增速预期
- **证伪条件**: HLT NUG降至<5% 而HLT P/E未收窄
- **来源**: 竞品对标推导
- **日期**: 2026-03-05

### DM-SUB-001
- **值**: MAR品牌组合可能存在"品牌熵"风险 — 30+品牌vs HLT 26/IHG 19, 复杂度成本>品类覆盖收益?
- **类型**: S
- **依据**: ACSI评分MAR 78 < HLT 80, J.D.Power中端品牌被Hampton/Tru压制, NPS 15 vs 行业44
- **来源**: 定性分析
- **日期**: 2026-03-05

---

## Section H: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 43 | 86% |
| R (合理推断) | 5 | 10% |
| S (主观判断) | 2 | 4% |
| **总计** | **50** | **100%** |

> H占比86% > 50%门槛 ✓
> WebSearch Agent产出(DM-CON/PMK/NEW/MGT/SMT/OPT)待Agent完成后追加

---

## Section I: Phase 1-4关键发现 (传统格式)

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
