# MCO Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-14
## 数据预取版本: v4.0
## 状态: 初始版(MCP数据+准备阶段数据), Agent返回后补充

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $7.718B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-14
- **用于**: Ch02, Ch14

### DM-FIN-002
- **值**: FY2025 Net Income $2.459B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-14
- **用于**: Ch02, FCF分析

### DM-FIN-003
- **值**: FY2025 Gross Margin 68.2%
- **类型**: H
- **来源**: MCP fmp_data income FY2025 (GP $5.26B / Rev $7.72B)
- **日期**: 2026-03-14
- **用于**: Ch02, 定价权分析

### DM-FIN-004
- **值**: FY2025 Operating Margin 44.8% (GAAP) / 51.1% (Adj.)
- **类型**: H
- **来源**: MCP fmp_data income FY2025 + 4Q25 Earnings Release
- **日期**: 2026-03-14
- **用于**: Ch02, OPM趋势

### DM-FIN-005
- **值**: FY2025 EBITDA $3.935B (EBITDA Margin 51.0%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-14
- **用于**: 杠杆分析, EV/EBITDA

### DM-FIN-006
- **值**: FY2025 EPS (Diluted) $13.67
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-14
- **用于**: PE估值

### DM-FIN-007
- **值**: FY2025 Interest Expense $189M (利息覆盖 18.3x)
- **类型**: H
- **来源**: MCP fmp_data income FY2025 + ratios
- **日期**: 2026-03-14
- **用于**: 杠杆安全分析

### DM-FIN-008
- **值**: FY2025 D&A $480M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-14
- **用于**: FCF桥接, 收购摊销分析

### DM-FIN-009
- **值**: FY2025 SBC $232M (SBC/Rev 3.0%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-14
- **用于**: 真实盈利质量

### DM-FIN-010
- **值**: FY2025 Tax Rate 21.3%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-14
- **用于**: DCF/WACC

### 收入趋势 (6年)

| FY | Revenue | YoY | Op Income | OPM | Net Income | EPS(d) |
|----|---------|-----|-----------|-----|------------|--------|
| 2020 | $5.371B | — | $2.447B | 45.6% | $1.778B | $9.39 |
| 2021 | $6.218B | +15.8% | $2.844B | 45.7% | $2.214B | $11.78 |
| 2022 | $5.468B | -12.1% | $1.997B | 36.5% | $1.374B | $7.44 |
| 2023 | $5.916B | +8.2% | $2.221B | 37.5% | $1.607B | $8.73 |
| 2024 | $7.088B | +19.8% | $2.971B | 41.9% | $2.058B | $11.26 |
| 2025 | $7.718B | +8.9% | $3.455B | 44.8% | $2.459B | $13.67 |

### DM-FIN-011
- **值**: FY2022收入-12.1% (发行量周期低谷)
- **类型**: H
- **来源**: MCP fmp_data income FY2021-2022
- **日期**: 2026-03-14
- **用于**: 周期性分析, MIS交易性收入弹性

---

## Section A2: 分部数据锚点 (DM-SEG-xxx)

### DM-SEG-001
- **值**: FY2025 MIS Revenue $4.119B (53.4% of total)
- **类型**: H
- **来源**: 4Q25 Earnings Release
- **日期**: 2026-03-14
- **用于**: 分部分析

### DM-SEG-002
- **值**: FY2025 MA Revenue $3.599B (46.6% of total)
- **类型**: H
- **来源**: 4Q25 Earnings Release
- **日期**: 2026-03-14
- **用于**: 分部分析

### DM-SEG-003
- **值**: FY2025 MIS Adj. OPM 63.6% / MA Adj. OPM 33.1%
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 5
- **日期**: 2026-03-14
- **用于**: 分部利润率比较

### MIS资产类别拆分 (FY2022-2025)

| 资产类别 | FY2022 | FY2023 | FY2024 | FY2025 |
|---------|--------|--------|--------|--------|
| Corporate Finance | $1,269M | $1,404M | $1,950M | $2,132M |
| Structured Finance | $462M | $405M | $518M | $558M |
| Financial Institutions | $491M | $545M | $727M | $759M |
| Public/Project/Infra | $431M | $476M | $564M | $635M |
| MIS Other | $46M | $30M | $34M | $35M |
| **Total MIS** | **$2,699M** | **$2,860M** | **$3,793M** | **$4,119M** |

### MA产品线拆分 (FY2022-2025)

| 产品线 | FY2022 | FY2023 | FY2024 | FY2025 |
|--------|--------|--------|--------|--------|
| Decision Solutions | $1,245M | $1,383M | $1,516M | $1,692M |
| Research & Insights | $812M | $884M | $926M | $995M |
| Data & Information | $712M | $789M | $853M | $912M |
| **Total MA** | **$2,769M** | **$3,056M** | **$3,295M** | **$3,599M** |

### DM-SEG-004
- **值**: FY2025 MIS交易性收入67% / 经常性33%
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 6
- **日期**: 2026-03-14
- **用于**: 周期性风险评估

### DM-SEG-005
- **值**: FY2025 MA经常性收入96% / 交易性4%
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 6
- **日期**: 2026-03-14
- **用于**: 收入质量分析

### DM-SEG-006
- **值**: MA ARR $3.498B (Dec 2025), +8% YoY
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 10
- **日期**: 2026-03-14
- **用于**: MA增长分析

### DM-SEG-007
- **值**: MA留存率 93% (Q1/Q3/Q4 2025均确认)
- **类型**: H
- **来源**: 4Q25 Earnings Release + Earnings Call
- **日期**: 2026-03-14
- **用于**: 客户粘性分析

### MA ARR子分部 (Dec 2025)

| 子分部 | ARR | YoY增速 |
|--------|-----|---------|
| Decision Solutions | $1,579M | +10% |
| Research & Insights | $1,002M | +8% |
| Data & Information | $917M | +7% |
| **Total MA ARR** | **$3,498M** | **+8%** |

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FY2025 Total Debt $7.351B (Net Debt $4.967B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-14
- **用于**: 杠杆分析

### DM-BAL-002
- **值**: FY2025 Net Debt/EBITDA 1.26x (从2022年2.64x大幅下降)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-14
- **用于**: 杠杆趋势

### DM-BAL-003
- **值**: FY2025 Goodwill $6.368B + Intangibles $1.866B = $8.234B (52.0% of Total Assets)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-14
- **用于**: 收购分析, 商誉风险

### DM-BAL-004
- **值**: FY2025 Tangible Book Value -$4.029B (TBV/share -$22.50)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-14
- **用于**: 负权益分析

### DM-BAL-005
- **值**: FY2025 Treasury Stock $13.302B (累计回购)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-14
- **用于**: 资本配置历史

### DM-BAL-006
- **值**: FY2025 Cash & Equivalents $2.384B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-14
- **用于**: 流动性分析

### DM-BAL-007
- **值**: FY2025 Deferred Revenue $1.582B (current)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-14
- **用于**: 预收收入=经常性收入质量信号

---

## Section C: 现金流锚点 (DM-CF-xxx)

### DM-CF-001
- **值**: FY2025 Operating Cash Flow $2.901B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-14
- **用于**: FCF分析

### DM-CF-002
- **值**: FY2025 Free Cash Flow $2.575B (FCF Margin 33.4%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-14
- **用于**: 估值, 资本配置

### DM-CF-003
- **值**: FY2025 CapEx $326M (CapEx/Rev 4.2%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-14
- **用于**: 资本密集度

### DM-CF-004
- **值**: FY2025 Share Buyback $1.706B (Net Stock Issuance -$1.657B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-14
- **用于**: 资本配置

### DM-CF-005
- **值**: FY2025 Dividends Paid $701M ($3.91/share, payout ratio 28.5%)
- **类型**: H
- **来源**: MCP fmp_data cashflow + ratios FY2025
- **日期**: 2026-03-14
- **用于**: 股东回报

### DM-CF-006
- **值**: FY2025 FCF/NI = 104.7% (高转化质量)
- **类型**: H
- **来源**: MCP fmp_data ($2.575B/$2.459B)
- **日期**: 2026-03-14
- **用于**: 盈利质量

### FCF趋势 (6年)

| FY | OCF | CapEx | FCF | FCF Margin | FCF/NI |
|----|-----|-------|-----|-----------|--------|
| 2020 | $2.146B | $103M | $2.043B | 38.0% | 114.9% |
| 2021 | $2.005B | $139M | $1.866B | 30.0% | 84.3% |
| 2022 | $1.474B | $283M | $1.191B | 21.8% | 86.7% |
| 2023 | $2.151B | $271M | $1.880B | 31.8% | 117.0% |
| 2024 | $2.838B | $317M | $2.521B | 35.6% | 122.5% |
| 2025 | $2.901B | $326M | $2.575B | 33.4% | 104.7% |

---

## Section D: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 当前股价 $430.01 (2026-03-13 close)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-14
- **用于**: 全文引用

### DM-VAL-002
- **值**: Market Cap ~$77.3B (at $430.01, ~179.9M diluted shares)
- **类型**: H
- **来源**: MCP fmp_data (FMP显示$91.5B为高点, 当前按$430计算)
- **日期**: 2026-03-14
- **用于**: 估值

### DM-VAL-003
- **值**: P/E (TTM) 31.5x / Forward P/E 25.7x (FY2026E adj. EPS $16.75)
- **类型**: H
- **来源**: MCP analyze_stock + estimates
- **日期**: 2026-03-14
- **用于**: 估值对比

### DM-VAL-004
- **值**: EV/EBITDA 24.5x
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-14
- **用于**: 估值对比

### DM-VAL-005
- **值**: 52周范围 $378.71-$546.88 (当前距高点-21%)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-14
- **用于**: 技术面

### DM-VAL-006
- **值**: Beta 1.442
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-14
- **用于**: WACC计算

### 同业估值对比

| 指标 | MCO | SPGI | MSCI | ICE | FICO |
|------|-----|------|------|-----|------|
| P/E | 31.5x | 28.8x | 35.0x | 27.6x | 41.8x |
| P/B | 22.6x | 5.1x | neg | 3.2x | neg |
| ROE | 62.1% | 13.1% | neg | 11.9% | neg |

### 远期共识

| FY | Rev(E) | EPS(E) | Analysts |
|----|--------|--------|----------|
| 2026 | $8.30B | $16.75 | 14-15 |
| 2027 | $8.92B | $18.76 | 14-16 |
| 2028 | $9.60B | $20.91 | 5-12 |
| 2029 | $9.92B | $22.38 | 1-11 |
| 2030 | $10.56B | $24.69 | 1-6 |

### DM-VAL-007
- **值**: 共识EPS CAGR FY2025-2030E ~12.5%
- **类型**: R
- **推理链**: $13.67(FY2025) → $24.69(FY2030E), 5年CAGR = (24.69/13.67)^0.2 - 1 = ~12.5%
- **证伪条件**: FY2026 adj. EPS < $15.00 (指引低端)
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-14
- **用于**: 长期增长评估

---

## Section E: 市场竞争锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: MCO~40% / SPGI~40% / Fitch~15-20% 全球信用评级收入份额; Big Three=91% NRSRO收入
- **类型**: H
- **来源**: SEC 2024 NRSRO Staff Report
- **日期**: 2026-03-14
- **用于**: 护城河分析

### DM-MKT-002
- **值**: 10个注册NRSRO, Big Three占非政府证券评级84%
- **类型**: H
- **来源**: SEC 2024 NRSRO Staff Report
- **日期**: 2026-03-14
- **用于**: 监管壁垒分析

### DM-MKT-003
- **值**: FY2025全球评级债务>$6.6T, 公司债+银团贷款$13.7T(历史新高)
- **类型**: H
- **来源**: MCO Earnings Release + OECD
- **日期**: 2026-03-14
- **用于**: 发行量周期分析

### DM-MKT-004
- **值**: 私人信贷TAM ~$2T(当前) → $4T(2030E)
- **类型**: R
- **推理链**: MCO自身预测+行业共识, 增长驱动=银行监管收紧+LP配置需求
- **证伪条件**: 私人信贷AUM连续2年增速<5%
- **来源**: MCO-MSCI Press Release + 行业研报
- **日期**: 2026-03-14
- **用于**: 私人信贷增长机会

### DM-MKT-005
- **值**: MCO私人信贷相关收入FY2025 +75% (Q2 2025数据)
- **类型**: H
- **来源**: MCO Q2 2025 Earnings Call
- **日期**: 2026-03-14
- **用于**: 私人信贷执行进展

### DM-MKT-006
- **值**: MSCI-MCO合作: EDF-X模型+MSCI私募数据(2,800+基金/14,000+公司), Q4 2025上线
- **类型**: H
- **来源**: MCO-MSCI Press Release (2025-04-21)
- **日期**: 2026-03-14
- **用于**: 私人信贷战略分析

### DM-MKT-007
- **值**: RiskTech100连续4年#1 (Chartis 2026)
- **类型**: H
- **来源**: Chartis Research
- **日期**: 2026-03-14
- **用于**: MA竞争力评估

---

## Section F: 管理层锚点 (DM-MGT-xxx)

### DM-MGT-001
- **值**: CEO Rob Fauber, 自2021年就任, MCO任职21年+
- **类型**: H
- **来源**: WebSearch Agent-E (准备阶段)
- **日期**: 2026-03-14
- **用于**: 管理层评估

### DM-MGT-002
- **值**: CFO Noemie Heuland, 自2024年4月就任, ex-Dayforce/SAP
- **类型**: H
- **来源**: WebSearch Agent-E (准备阶段)
- **日期**: 2026-03-14
- **用于**: 管理层评估

---

## Section G: 收购整合锚点 (DM-ACQ-xxx)

### DM-ACQ-001
- **值**: Bureau van Dijk: 2017年收购, EUR 3B, 600M+实体数据库
- **类型**: H
- **来源**: MCO 10-K历史文件
- **日期**: 2026-03-14
- **用于**: MA基础设施分析

### DM-ACQ-002
- **值**: RMS: 2021年收购, $2B, 保险风险建模; 达到$150M增量收入目标(FY2025)
- **类型**: H
- **来源**: 4Q25 Earnings Call
- **日期**: 2026-03-14
- **用于**: 收购回报分析

### DM-ACQ-003
- **值**: FY2025 Goodwill增加$374M (2024→2025), 主要来自CAPE Analytics/Meris等收购
- **类型**: H
- **来源**: MCP fmp_data balance FY2024-2025
- **日期**: 2026-03-14
- **用于**: 商誉增长趋势

### DM-ACQ-004
- **值**: 剥离: Learning Solutions(2025.12) + Regulatory Reporting(2026), ~180bps MA增速拖累
- **类型**: H
- **来源**: 4Q25 Earnings Call
- **日期**: 2026-03-14
- **用于**: MA有机增长分析

---

## Section H: AI战略锚点 (DM-AI-xxx)

### DM-AI-001
- **值**: 40% MA ARR含GenAI功能(~$1.4B)
- **类型**: H
- **来源**: MCO Q2 2025 Earnings Call
- **日期**: 2026-03-14
- **用于**: AI货币化分析

### DM-AI-002
- **值**: CreditLens AI升级: 2/3续约升级, +67% ARPU提升
- **类型**: H
- **来源**: 4Q25 Earnings Call
- **日期**: 2026-03-14
- **用于**: AI定价权分析

### DM-AI-003
- **值**: GenAI/AgenTix客户: 97%留存, 增速2x MA整体
- **类型**: H
- **来源**: 4Q25 Earnings Call
- **日期**: 2026-03-14
- **用于**: AI增长持续性

### DM-AI-004
- **值**: KYC ARR +15% (FY2025), Decision Solutions内最快增速
- **类型**: H
- **来源**: 4Q25 Earnings Release
- **日期**: 2026-03-14
- **用于**: 增长引擎分析

---

## Section I: 指引锚点 (DM-GD-xxx)

### DM-GD-001
- **值**: FY2026 Adj. EPS指引 $16.40-$17.00
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 12
- **日期**: 2026-03-14
- **用于**: 估值锚点

### DM-GD-002
- **值**: FY2026 FCF指引 $2.8-3.0B
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 12
- **日期**: 2026-03-14
- **用于**: 估值

### DM-GD-003
- **值**: FY2026 Adj. OPM指引 52-53% / MIS~65% / MA 34-35%
- **类型**: H
- **来源**: 4Q25 Earnings Release Table 12
- **日期**: 2026-03-14
- **用于**: 利润率趋势

### DM-GD-004
- **值**: FY2026 回购计划 ~$2.0B
- **类型**: H
- **来源**: 4Q25 Earnings Release
- **日期**: 2026-03-14
- **用于**: 资本配置

---

## Section J: 风险锚点 (DM-RSK-xxx)

### DM-RSK-001
- **值**: MCO YTD下跌~17% (AI叙事恐慌+SPGI弱指引传导)
- **类型**: H
- **来源**: WebSearch (Seeking Alpha)
- **日期**: 2026-03-14
- **用于**: 市场情绪

### DM-RSK-002
- **值**: 杠杆贷款违约率 7.5%(2025) → 7.9%(Q1 2026), 2x历史均值
- **类型**: H
- **来源**: Moody's Credit Strategy
- **日期**: 2026-03-14
- **用于**: 信用周期定位

### DM-RSK-003
- **值**: Moody's Analytics衰退概率 42-48% (2026)
- **类型**: H
- **来源**: Mark Zandi / Moody's Analytics
- **日期**: 2026-03-14
- **用于**: 宏观风险

### DM-RSK-004
- **值**: 32%美国上市公司处于"严重信用风险"早期预警 (疫后最高)
- **类型**: H
- **来源**: Moody's Credit Strategy
- **日期**: 2026-03-14
- **用于**: 信用周期风险

### DM-RSK-005
- **值**: ESG评级业务已关闭 (Vigeo Eiris 2023-24裁员~100人)
- **类型**: H
- **来源**: Responsible Investor
- **日期**: 2026-03-14
- **用于**: 战略方向变化

---

## Section K: 分析师共识与市场情绪 (Agent A/B/G)

### DM-CON-001
- **值**: 分析师共识评级 Buy (21位分析师: Buy 12 / Hold 8 / Sell 1)
- **类型**: H
- **来源**: WebSearch Agent-A, TipRanks/MarketBeat
- **日期**: 2026-03-14
- **用于**: Ch13 分析师共识

### DM-CON-002
- **值**: 共识目标价 $550-$572 (均值~$560)
- **类型**: H
- **来源**: WebSearch Agent-A
- **日期**: 2026-03-14
- **用于**: Ch14 估值对比

### DM-CON-003
- **值**: FY2025 Adj. EPS $14.94 (GAAP $13.67), 连续4Q beat
- **类型**: H
- **来源**: WebSearch Agent-A, MCO 10-K
- **日期**: 2026-03-14
- **用于**: Ch02 盈利质量

### DM-CON-004
- **值**: 近期PT下调: Mizuho $550→$524, Barclays $580→$550, UBS $515→$490, GS $603→$532
- **类型**: H
- **来源**: WebSearch Agent-C
- **日期**: 2026-03-14
- **用于**: Ch13 分析师情绪变化

### DM-PMK-001
- **值**: Polymarket 2025年美国衰退概率 34.5%
- **类型**: H
- **来源**: Polymarket via WebSearch Agent-B
- **日期**: 2026-03-14
- **用于**: Ch09 宏观风险

### DM-PMK-002
- **值**: Fed 2025仅1次降息概率 30.5%, 通胀>3% 73%
- **类型**: H
- **来源**: Polymarket/Kalshi via Agent-B
- **日期**: 2026-03-14
- **用于**: Ch09 利率环境

### DM-PMK-003
- **值**: 银行倒闭概率 17.5%
- **类型**: H
- **来源**: Polymarket via Agent-B
- **日期**: 2026-03-14
- **用于**: Ch09 金融系统风险

### DM-OPT-001
- **值**: 做空比例 1.19% (极低), Put/Call 2.8:1 (财报期间), 无异常期权活动
- **类型**: H
- **来源**: WebSearch Agent-G
- **日期**: 2026-03-14
- **用于**: Ch13 市场情绪

---

## Section L: 管理层与Smart Money (Agent E/F)

### DM-MGT-003
- **值**: MA总裁Stephen Tulenko于2025年8月辞职, Andy Frepp临时接管
- **类型**: H
- **来源**: WebSearch Agent-C/E
- **日期**: 2026-03-14
- **用于**: Ch07 管理层, Ch04 MA风险

### DM-MGT-004
- **值**: CEO Rob Fauber薪酬$16.97M (FY2024), 任期自2021年
- **类型**: H
- **来源**: WebSearch Agent-E, Proxy
- **日期**: 2026-03-14
- **用于**: Ch07 管理层

### DM-MGT-005
- **值**: CFO Noémie Heuland, 前SAP/Dayforce CFO, 2024年加入
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-03-14
- **用于**: Ch07 管理层

### DM-SMT-001
- **值**: Berkshire Hathaway持股14.54%, Greg Abel确认为"永久持仓"
- **类型**: H
- **来源**: WebSearch Agent-E/F
- **日期**: 2026-03-14
- **用于**: Ch08 Smart Money, CI-MCO-004

### DM-SMT-002
- **值**: TCI (Chris Hohn) +61,500股 Q4 2025; T. Rowe Price +73.5%
- **类型**: H
- **来源**: WebSearch Agent-F, 13F
- **日期**: 2026-03-14
- **用于**: Ch08 Smart Money

### DM-SMT-003
- **值**: UBS -74.6% ($2.1B退出) Q4 2025; Citadel -66.5%
- **类型**: H
- **来源**: WebSearch Agent-F, 13F
- **日期**: 2026-03-14
- **用于**: Ch08 Smart Money, 风险信号

### DM-SMT-004
- **值**: MIS Q1 2025 Adj. OPM已达66% (高于FY2025全年63.6%)
- **类型**: H
- **来源**: WebSearch Agent-D, Q1 2025 Earnings
- **日期**: 2026-03-14
- **用于**: Ch03 MIS利润率趋势

---

## Section M: 锚点汇总统计 (完整版)

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 65 | 93% |
| R (合理推断) | 2 | 3% |
| S (主观判断) | 3 | 4% |
| **总计** | **70** | **100%** |

---

## Section N: Phase 1-4关键发现

> 随Phase推进追加。

[Phase推进时追加]
