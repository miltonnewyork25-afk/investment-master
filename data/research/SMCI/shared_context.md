# SMCI Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-21
## 数据预取版本: v4.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### 年度损益表趋势 (FY2021-FY2025)

### DM-FIN-001
- **值**: FY2025 Revenue $21.97B (+46.6% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-21
- **用于**: Ch02 §2.1, Ch14 §Reverse DCF

### DM-FIN-002
- **值**: FY2025 Gross Profit $2.43B, Gross Margin 11.1%
- **类型**: H
- **来源**: MCP fmp_data income FY2025 (GP $2,429,922K / Rev $21,972,042K)
- **日期**: 2026-02-21
- **用于**: Ch02 §2.2, Ch09 §毛利率解剖

### DM-FIN-003
- **值**: FY2025 Net Income $1.049B, NPM 4.8%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-21
- **用于**: Ch02, Ch08

### DM-FIN-004
- **值**: FY2025 EPS Diluted $1.68
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-21
- **用于**: Ch08, Ch12

### DM-FIN-005
- **值**: FY2025 Operating Income $1.253B, OPM 5.7%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-006
- **值**: FY2024 Revenue $14.99B (+110.4% YoY), GM 13.8%, NI $1.153B
- **类型**: H
- **来源**: MCP fmp_data income FY2024
- **日期**: 2026-02-21
- **用于**: Ch08 趋势分析

### DM-FIN-007
- **值**: FY2023 Revenue $7.12B (+37.1% YoY), GM 18.0%, NI $640M
- **类型**: H
- **来源**: MCP fmp_data income FY2023
- **日期**: 2026-02-21
- **用于**: Ch08 趋势分析

### DM-FIN-008
- **值**: FY2022 Revenue $5.20B (+46.1% YoY), GM 15.4%, NI $285M
- **类型**: H
- **来源**: MCP fmp_data income FY2022
- **日期**: 2026-02-21
- **用于**: Ch08 趋势分析

### DM-FIN-009
- **值**: FY2021 Revenue $3.56B, GM 15.0%, NI $112M
- **类型**: H
- **来源**: MCP fmp_data income FY2021
- **日期**: 2026-02-21
- **用于**: Ch08 趋势分析

### 季度损益趋势 (8Q)

### DM-FIN-010
- **值**: Q2 FY2026 Revenue $12.68B (+123.4% YoY), GP $799M, GM 6.3%
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026
- **日期**: 2026-02-21
- **用于**: Ch02, Ch09 §毛利率解剖, Ch11 §收入质量

### DM-FIN-011
- **值**: Q1 FY2026 Revenue $5.02B, GP $467M, GM 9.3%, NI $168M
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026
- **日期**: 2026-02-21
- **用于**: Ch08 趋势

### DM-FIN-012
- **值**: Q4 FY2025 Revenue $5.76B, GM 9.5%, NI $195M
- **类型**: H
- **来源**: MCP fmp_data income Q4 FY2025 (GP $544M / Rev $5,757M)
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-013
- **值**: Q3 FY2025 Revenue $4.60B, GM 9.6%, NI $109M
- **类型**: H
- **来源**: MCP fmp_data income Q3 FY2025
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-014
- **值**: Q2 FY2025 Revenue $5.68B, GM 11.8%, NI $321M
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2025
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-015
- **值**: Q1 FY2025 Revenue $5.94B, GM 13.1%, NI $424M
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2025
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-016
- **值**: TTM Revenue $28.06B (Q1+Q2 FY26 + Q3+Q4 FY25)
- **类型**: H
- **来源**: MCP fmp_data 季度损益汇总计算
- **日期**: 2026-02-21
- **用于**: 全文估值基准

### DM-FIN-017
- **值**: TTM Gross Margin 8.0% ($2.25B / $28.06B)
- **类型**: H
- **来源**: MCP fmp_data 季度损益汇总计算 ($467+$799+$440+$544 = $2,250M)
- **日期**: 2026-02-21
- **用于**: Ch09, CQ1

### 毛利率趋势 (关键CQ1数据)

### DM-FIN-018
- **值**: 毛利率5Y趋势: FY21 15.0% → FY22 15.4% → FY23 18.0% → FY24 13.8% → FY25 11.1% → Q2FY26 6.3%
- **类型**: H
- **来源**: MCP fmp_data income FY2021-2025 + Q2 FY2026
- **日期**: 2026-02-21
- **用于**: Ch09 §毛利率解剖 (核心CQ1数据)

### 资产负债表 (最新: FY2025 年度)

### DM-FIN-020
- **值**: FY2025 Cash $5.17B, Total Debt $4.78B, Net Debt -$0.39B (净现金)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-021
- **值**: FY2025 Inventory $4.68B (vs FY24 $4.33B, FY23 $1.45B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-21
- **用于**: Ch10, Ch11

### DM-FIN-022
- **值**: FY2025 Total Assets $14.02B, Total Equity $6.30B, D/E 0.76x
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-023
- **值**: FY2025 AR $2.20B, Deferred Revenue $629M(current)+$363M(non-current) = $992M total
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-21
- **用于**: Ch10, Ch11

### DM-FIN-024
- **值**: Q2 FY2026 最新BS: Cash $4.09B, Inventory $10.60B, Total Debt $4.91B, Equity $6.99B
- **类型**: H
- **来源**: MCP baggers_summary Q2 FY2026 balance sheet
- **日期**: 2026-02-21
- **用于**: Ch10 (最新数据)

### 现金流

### DM-FIN-030
- **值**: FY2025 OCF $1.66B, CapEx $127M, FCF $1.53B, SBC $314M
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-031
- **值**: FY2024 OCF -$2.49B, FCF -$2.61B (负! 因库存暴增$2.9B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2024
- **日期**: 2026-02-21
- **用于**: Ch10 §盈利质量

### DM-FIN-032
- **值**: FY2023 OCF $664M, FCF $627M, SBC $54M
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2023
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-033
- **值**: Q2 FY2026 OCF -$24M, FCF -$45M (最新季度现金流为负)
- **类型**: H
- **来源**: MCP baggers_summary Q2 FY2026 cashflow
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-034
- **值**: FY2024 库存增加$2.90B, 是FCF为负的最大原因
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2024 (inventory change)
- **日期**: 2026-02-21
- **用于**: Ch10, Ch11

### DM-FIN-035
- **值**: OCF/NI ratio TTM 0.63 (盈利质量偏低)
- **类型**: H
- **来源**: MCP baggers_summary cash quality
- **日期**: 2026-02-21
- **用于**: Ch10 §盈利质量

### 效率指标

### DM-FIN-040
- **值**: ROIC TTM 15.82%, ROE TTM 13.19%, ROA TTM 4.63%
- **类型**: H
- **来源**: MCP baggers_summary ops efficiency
- **日期**: 2026-02-21
- **用于**: Ch08 §杜邦分解

### DM-FIN-041
- **值**: CCC(现金转换周期) TTM 19天 (DSO 20 + DIO 100 - DPO 101)
- **类型**: H
- **来源**: MCP baggers_summary ops efficiency
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-042
- **值**: Inventory Days Outstanding 100天 (TTM) vs FY2024 122天 vs FY2023 90天
- **类型**: H
- **来源**: MCP fmp_data key-metrics + baggers
- **日期**: 2026-02-21
- **用于**: Ch11

### DM-FIN-043
- **值**: SBC/Revenue TTM 1.4% (相对低), R&D/GP TTM 31.1%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-21
- **用于**: Ch08

### DM-FIN-044
- **值**: Altman Z-Score 2.31 (灰色区间 1.81-2.99)
- **类型**: H
- **来源**: MCP baggers_summary leverage
- **日期**: 2026-02-21
- **用于**: Ch10

### DM-FIN-045
- **值**: 股份变动率1Y +8.40%, 3Y +19.87% (持续稀释)
- **类型**: H
- **来源**: MCP baggers_summary shareholder returns
- **日期**: 2026-02-21
- **用于**: Ch08, Ch10

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: PE(TTM) 23.1x, Forward PE 10.95x
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-21
- **用于**: Ch12, Ch25

### DM-VAL-002
- **值**: EV/Sales(TTM) 0.75x, EV/EBITDA(TTM) 26.97x
- **类型**: H
- **来源**: MCP baggers_summary valuation
- **日期**: 2026-02-21
- **用于**: Ch25 §估值对比

### DM-VAL-003
- **值**: P/B 4.62x (FY2025), 2.98x (MRQ)
- **类型**: H
- **来源**: MCP fmp_data ratios + baggers
- **日期**: 2026-02-21
- **用于**: Ch25

### DM-VAL-004
- **值**: FCF Yield(TTM) 2.16%, Earnings Yield 3.60%
- **类型**: H
- **来源**: MCP fmp_data key-metrics + baggers
- **日期**: 2026-02-21
- **用于**: Ch25

### DM-VAL-005
- **值**: FMP DCF公允价值 -$228.58 (负值! 模型给出极端悲观结果)
- **类型**: H
- **来源**: MCP fmp_data dcf (2026-02-20)
- **日期**: 2026-02-21
- **用于**: Ch25 §DCF参考 (需审视模型假设)

### DM-VAL-006
- **值**: EV/GP (组装商指标) = EV/Sales 0.75x ÷ GM 8.0% ≈ 9.4x (vs Dell ~6-8x)
- **类型**: R
- **推理链**: 低毛利组装商的EV/Sales误导性高 → EV/GP是更正确的对比指标
- **证伪条件**: 若SMCI毛利率恢复至>15%, EV/Sales恢复有效性
- **来源**: DM-VAL-002 + DM-FIN-017 推算
- **日期**: 2026-02-21
- **用于**: Ch25 §组装商估值陷阱

### DM-VAL-007
- **值**: PR市赚率 1.75 (PE/ROE)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-21
- **用于**: Ch25

### 估值历史区间

### DM-VAL-010
- **值**: PE 10Y历史: 均值18.9x, 峰值52.3x(2024.03), 谷值6.5x(2022.09)
- **类型**: H
- **来源**: lit_recon Agent-5
- **日期**: 2026-02-21
- **用于**: Ch12, Ch25

### 分析师共识估计

### DM-VAL-015
- **值**: FY2026E Revenue $40.5B, EPS $2.20 (12位分析师)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-21
- **用于**: Ch13, Ch24

### DM-VAL-016
- **值**: FY2027E Revenue $48.2B, EPS $2.95 (12位分析师收入, 10位EPS)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-21
- **用于**: Ch13, Ch24

### DM-VAL-017
- **值**: FY2028E Revenue $55.7B, EPS $3.27
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-21
- **用于**: Ch14

### DM-VAL-018
- **值**: FY2029E Revenue $62.1B, EPS $3.22
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-21
- **用于**: Ch14

### 同行估值对比

### DM-VAL-020
- **值**: DELL PE 16.3x, LNVGY PE 9.9x, IBM PE 23.1x, VRT PE 71.5x
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-21
- **用于**: Ch05, Ch25

---

## Section C: 市场数据锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: 当前股价 $32.42, 52W范围 $27.6-$66.4
- **类型**: H
- **来源**: MCP analyze_stock (2026-02-20)
- **日期**: 2026-02-21
- **用于**: 全文引用

### DM-MKT-002
- **值**: 2Y Price Range $18.01-$118.81, 2Y Return -55.84%
- **类型**: H
- **来源**: MCP analyze_stock history_summary
- **日期**: 2026-02-21
- **用于**: Ch01, Ch02

### DM-MKT-003
- **值**: Beta 1.523, 日均成交量58.2M股
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-21
- **用于**: Ch25 §WACC

### DM-MKT-004
- **值**: SMA20 $31.34, SMA50 $31.10, SMA200 $41.67, RSI 58.8
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-MKT-005
- **值**: S&P500 6909.51, VIX 19.09, CAPE 40.2(98%ile), Buffett指标220%(100%ile)
- **类型**: H
- **来源**: MCP get_market_overview + baggers macro
- **日期**: 2026-02-21
- **用于**: Ch24 §宏观背景

### 领先指标

### DM-MKT-010
- **值**: 正面信号: 经营杠杆释放 + 存货效率提升
- **类型**: H
- **来源**: MCP baggers_summary leading indicators
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-MKT-011
- **值**: 负面信号: 营收与毛利下降 + 速动比率恶化
- **类型**: H
- **来源**: MCP baggers_summary leading indicators
- **日期**: 2026-02-21
- **用于**: Ch28

---

## Section D: 共识/预测市场/新闻/业务/管理/聪明钱/期权锚点

### D1: 分析师共识 (DM-CON-xxx) — Agent A

### DM-CON-001
- **值**: 共识评级 Hold (5 Buy / 8 Hold / 2 Sell), 中位目标价 $43 (+32.6%)
- **类型**: H
- **来源**: StockAnalysis, Benzinga, TipRanks聚合 (2026-02)
- **日期**: 2026-02-21
- **用于**: Ch13, Ch25

### DM-CON-003
- **值**: Q2 FY26 EPS Surprise +50% ($0.69 vs $0.46 est), Revenue Surprise +21.4%
- **类型**: H
- **来源**: Investing.com, Nasdaq.com (2026-02-03)
- **日期**: 2026-02-21
- **用于**: Ch08, Ch11

### DM-CON-004
- **值**: Goldman Sachs Sell评级, 目标价$26, 结构性盈利能力担忧
- **类型**: H
- **来源**: MarketBeat, DefenseWorld (2026-01-13)
- **日期**: 2026-02-21
- **用于**: Ch13, Ch25, CQ1

### DM-CON-005
- **值**: FY26E EPS: $2.20(FMP) vs $1.86(Zacks), GAAP/Non-GAAP分歧
- **类型**: H
- **来源**: FMP estimates + Zacks (2026-02)
- **日期**: 2026-02-21
- **用于**: Ch13

### DM-CON-008
- **值**: 收入增长+66% YoY vs GM连降10Q → 经营杠杆未释放
- **类型**: R
- **推理链**: Revenue $40B+指引(CON-006) + GM连降10Q(CON-007) → OI增长落后Rev → 增收不增利
- **证伪条件**: Q3 FY26 GM>10.5% 则拐点成立; <9.3% 则空头强化
- **来源**: CON-006 + CON-007推导
- **日期**: 2026-02-21
- **用于**: CQ1, Ch09

### DM-CON-010
- **值**: 目标价极端分歧: 最高$93 / 最低$15 (6.2x spread)
- **类型**: H
- **来源**: Public.com, MarketBeat (25位分析师)
- **日期**: 2026-02-21
- **用于**: Ch25 §离散度

### D2: 预测市场 (DM-PMK-xxx) — Agent B

### DM-PMK-M01
- **值**: 美国2026衰退概率 23%
- **类型**: R
- **来源**: Polymarket
- **日期**: 2026-02-21
- **用于**: Ch24 §宏观

### DM-PMK-M04
- **值**: Fed 2026降息: 2次(27%), 3次(23%), 加息13%
- **类型**: R
- **来源**: Polymarket ($6.9M成交量)
- **日期**: 2026-02-21
- **用于**: Ch24 §利率

### DM-PMK-I01
- **值**: AI泡沫2026年底前破裂概率 19%, **SMCI被列为触发公司**
- **类型**: R
- **推理链**: Polymarket解析条件含"SMCI从ATH下跌50%"作为判定标准之一
- **证伪条件**: 若SMCI Q3-Q4 GM回升至>10%, 泡沫论弱化
- **来源**: Polymarket AI Bubble Burst
- **日期**: 2026-02-21
- **用于**: Ch24 §尾部风险, CQ2

### DM-PMK-I02
- **值**: 台海冲突2026年底前概率 10% ($9M成交量)
- **类型**: R
- **来源**: Polymarket
- **日期**: 2026-02-21
- **用于**: Ch24 §地缘

### D3: 新闻与催化剂 (DM-NEW-xxx) — Agent C

### DM-NEW-C-003
- **值**: Q2 FY26 Record: Rev $12.7B (+123% YoY), NI $401M, FY26指引≥$40B
- **类型**: H
- **来源**: Supermicro IR (2026-02-03)
- **日期**: 2026-02-21
- **用于**: Ch02, Ch08

### DM-NEW-C-004
- **值**: Goldman Sachs降级至Sell, GM从15.5%→9.3%→6.3%, OPM从10.1%→3.6%
- **类型**: R
- **来源**: Goldman Sachs via Yahoo Finance (2026-01-13)
- **日期**: 2026-02-21
- **用于**: CQ1, Ch09

### DM-NEW-C-005
- **值**: Vera Rubin NVL72/NVL8支持 + 液冷制造扩产, NVL144/CPX 2H 2026
- **类型**: H
- **来源**: Supermicro IR (2026-01-05)
- **日期**: 2026-02-21
- **用于**: CQ4, Ch06

### DM-NEW-C-014
- **值**: Q3 FY26财报日 2026-05-05, 共识EPS ~$0.59, 收入指引≥$12.3B
- **类型**: R
- **来源**: Nasdaq/MarketBeat/TipRanks
- **日期**: 2026-02-21
- **用于**: Ch28 §催化剂日历

### DM-NEW-C-017
- **值**: DOJ/SEC调查进行中, 无解决时间线
- **类型**: S
- **来源**: CFO Dive/CBS/CNBC
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### D4: 业务与竞争 (DM-BIZ-xxx) — Agent D

### DM-BIZ-07
- **值**: Q2 FY26 Record Rev $12.7B (+123% YoY, +153% QoQ), GM 6.3%, AI GPU平台占收入>90%
- **类型**: H
- **来源**: Supermicro Q2 FY26 earnings call (2026-02-03)
- **日期**: 2026-02-21
- **用于**: Ch02, Ch11

### DM-BIZ-09
- **值**: GM趋势: Q3FY24 15.5% → Q4FY24 11.2% → Q3FY25 9.6% → Q1FY26 9.3% → Q2FY26 6.3%, 年均降5.2pp
- **类型**: H
- **来源**: 多季度财报 + Simply Wall St
- **日期**: 2026-02-21
- **用于**: CQ1, Ch09

### DM-BIZ-14
- **值**: NVIDIA占SMCI采购的64.4% (FY2025), 极端单一供应商依赖
- **类型**: H
- **来源**: SMCI 10-K FY2025供应商集中度披露
- **日期**: 2026-02-21
- **用于**: CQ5, Ch04

### DM-BIZ-17
- **值**: AI服务器TAM: 2024 $128B → 2030 $854B (CAGR 34.3%)
- **类型**: R
- **来源**: GM Insights, Grand View Research, TrendForce
- **日期**: 2026-02-21
- **用于**: Ch03

### DM-BIZ-18
- **值**: DLC产能6,000 racks/月(总), ~3,000 DLC(45%液冷比率, 行业最高), DLC-2支持120kW/rack
- **类型**: H
- **来源**: Supermicro DLC-2新闻稿 + Q2 FY26 earnings call
- **日期**: 2026-02-21
- **用于**: CQ4, Ch06

### DM-BIZ-22
- **值**: AI服务器市场份额 7-10% (Citi: 8%), 从2023初期~50%大幅下滑
- **类型**: R
- **来源**: Citi分析师, WCCFTech, 多金融分析来源
- **日期**: 2026-02-21
- **用于**: CQ4, Ch05

### DM-BIZ-28
- **值**: 价格战活跃中, SMCI以GM 6.3%代价争夺份额, ODM(Foxconn/Quanta)成本更低
- **类型**: S
- **来源**: 季度GM趋势推导
- **日期**: 2026-02-21
- **用于**: CQ1, Ch05

### DM-BIZ-31
- **值**: DLC领先优势: 45%液冷比率, 12-18个月领先Dell/HPE, GPU TDP趋向1000W+使DLC成为刚需
- **类型**: H
- **来源**: Supermicro DLC-2新闻稿, FinancialContent分析
- **日期**: 2026-02-21
- **用于**: CQ4

### DM-BIZ-39
- **值**: 超大规模客户自研芯片(Google TPU, AWS Trainium, Microsoft Maia)减少GPU服务器依赖
- **类型**: S
- **来源**: 行业分析
- **日期**: 2026-02-21
- **用于**: CQ5, Ch24

### D5: 管理层 (DM-MGT-xxx) — Agent E

### DM-MGT-002
- **值**: SEC 2020年指控SMCI广泛会计违规, 罚款$17.5M, CEO退还$2.1M
- **类型**: H
- **来源**: SEC.gov 2020
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### DM-MGT-005
- **值**: EY 2024-10-30辞任审计师, 称"无法信任管理层和审计委员会的陈述"
- **类型**: H
- **来源**: CNBC/Bloomberg (2024-10)
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### DM-MGT-006
- **值**: 关联方Ablecom+Compuware 3年获付$983M, 99.8%出口给SMCI
- **类型**: R
- **来源**: Hindenburg Research (2024-08)
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### DM-MGT-008
- **值**: CFO搜索承诺2024年12月"立即"启动, 至2026年2月(14+月)仍未完成
- **类型**: H
- **来源**: Fortune (2026-02-20)
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### DM-MGT-010
- **值**: CEO薪酬$1+无现金奖金(至2029), SBC费用FY25 $314.5M
- **类型**: R
- **来源**: SEC proxy / fintool.com
- **日期**: 2026-02-21
- **用于**: Ch07

### D6: 聪明钱 (DM-SMT-xxx) — Agent F

### DM-SMT-016
- **值**: 机构净流出: 上季度卖出444.6M股 vs 买入142.9M股 = 301.7M净分销
- **类型**: S
- **来源**: StockAnalysis.com (2026-02)
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-SMT-019
- **值**: Tudor Investment Corp持有73.35M股(Q3 2025) — 最大单一13F仓位, 超越Vanguard
- **类型**: H
- **来源**: HoldingsChannel 13F
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-SMT-022
- **值**: 做空91.82M股(15.33% OS, 18.39% float), 做空趋势上升
- **类型**: S
- **来源**: StockAnalysis.com (2026-02)
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-SMT-029
- **值**: CEO Liang 5年记录: 0次买入, 23次卖出, 6个月卖出$36.8M
- **类型**: R
- **来源**: QuiverQuant
- **日期**: 2026-02-21
- **用于**: CQ3, Ch07

### D7: 期权与做空 (DM-OPT-xxx) — Agent G

### DM-OPT-001
- **值**: 做空87.7M股 = 19.39% float, 4.12天覆盖, 对冲基金第3大做空标的
- **类型**: H
- **来源**: MarketBeat/Fintel (2026-01 FINRA报告)
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-OPT-003
- **值**: OI P/C ratio 0.69(看多), 但2/19成交量P/C骤降至0.16(投机性看涨)
- **类型**: H
- **来源**: Fintel + FXLeaders (2026-02-19)
- **日期**: 2026-02-21
- **用于**: Ch28

### DM-OPT-008
- **值**: 可转债总额$4.725B (3笔: 2028 $700M@2.25%, 2029 $1.725B@3.50%, 2030 $2.3B@0%)
- **类型**: R
- **来源**: Supermicro IR发行公告汇总
- **日期**: 2026-02-21
- **用于**: Ch10, Ch25

### DM-OPT-012
- **值**: 全部转股最大稀释~73.8M股, 当前均深度价外(转换价$55-$83 vs 现价$32.42)
- **类型**: R
- **来源**: IR发行文件转换率计算
- **日期**: 2026-02-21
- **用于**: Ch10, Ch25

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Revenue CAGR FY2025-FY2029E ~30% (基于FMP estimates: $22B→$62B)
- **类型**: R
- **推理链**: FY26E $40.5B(+84% YoY) → FY27E $48.2B(+19%) → FY28E $55.7B(+16%) → FY29E $62.1B(+12%)
- **证伪条件**: FY2027实际Revenue<$40B(较估计低17%+)
- **来源**: MCP fmp_data estimates推导
- **日期**: 2026-02-21
- **用于**: Ch14 §14.2

### DM-INF-002
- **值**: 毛利率均衡点在8-12%区间(非历史15-18%)
- **类型**: R
- **推理链**: GPU占BOM 70-80% → SMCI增值仅10-15% → 浪潮6.85%确认行业均衡 → 规模效应可能恢复至8-12%但非15%+
- **证伪条件**: 连续2Q GM>14% 或 GPU占BOM降至<50%
- **来源**: lit_recon Agent-4 + DM-FIN-018
- **日期**: 2026-02-21
- **用于**: Ch09, CQ1

### DM-INF-003
- **值**: 市值估算 ~$19.3B (596.8M基本股×$32.42)
- **类型**: R
- **推理链**: FY2026 Q2基本股数596.8M × 收盘价$32.42
- **证伪条件**: 可转债转股后完全稀释股数674M → 稀释市值$21.8B
- **来源**: DM-FIN-010 shares + DM-MKT-001 price
- **日期**: 2026-02-21
- **用于**: 全文市值引用

### DM-INF-004
- **值**: 库存/市值比 ~55% ($10.6B / $19.3B)
- **类型**: R
- **推理链**: 最新季度库存$10.6B ÷ 估算市值$19.3B
- **证伪条件**: 市值变动>20%需重算
- **来源**: DM-FIN-024 + DM-INF-003
- **日期**: 2026-02-21
- **用于**: Ch10, Ch11

### DM-SUB-001
- **值**: 毛利率压缩为**结构性**(S)而非周期性
- **类型**: S
- **依据**: GPU占BOM 70-80%确认增值空间上限 + 浪潮在不同生态下收敛至相同水平 + Dell/HPE规模追赶
- **来源**: Phase -0.5 lit_recon + 约束分类
- **日期**: 2026-02-21
- **用于**: CQ1

### DM-SUB-002
- **值**: 治理风险为**制度性**(I) + 惯犯溢价
- **类型**: S
- **依据**: 两次丑闻pattern(2017-20 + 2024-26) + EY辞任声明措辞 + CEO家族关联交易
- **来源**: Phase -0.5 lit_recon + 约束分类
- **日期**: 2026-02-21
- **用于**: CQ3

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 112 | 60% |
| R (合理推断) | 54 | 29% |
| S (主观判断) | 21 | 11% |
| **总计** | **187** | **100%** |

### 按来源分布

| 来源 | 数量 |
|------|------|
| MCP Layer (FIN/VAL/MKT) | 45 |
| Agent A (CON) | 12 |
| Agent B (PMK) | 10 |
| Agent C (NEW) | 27 |
| Agent D (BIZ) | 39 |
| Agent E (MGT) | 12 |
| Agent F (SMT) | 30 |
| Agent G (OPT) | 12 |

---

## Section G: Phase 1-4关键发现

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
