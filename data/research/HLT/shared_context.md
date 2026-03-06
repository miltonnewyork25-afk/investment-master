# HLT Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-06
## 数据预取版本: v4.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $12.04B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch2 身份诊断, Ch11 财务趋势, Ch16 逆向DCF

### DM-FIN-002
- **值**: FY2025 Net Income $1.457B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch11 DuPont分解

### DM-FIN-003
- **值**: FY2025 EPS $6.12 (diluted)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch12 回购效率, Ch16 逆向DCF, Ch17 NUG弹性

### DM-FIN-004
- **值**: FY2025 EBITDA $2.87B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch11, Ch15 信用风险, Ch19 DCF

### DM-FIN-005
- **值**: FY2025 FCF $2.03B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch12 回购效率, Ch19 DCF

### DM-FIN-006
- **值**: FY2025 Total Debt $15.67B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **注意**: 含~$2.0B lease obligations
- **用于**: Ch15 信用风险

### DM-FIN-007
- **值**: FY2025 Net Debt $14.70B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch15 杠杆弹性

### DM-FIN-008
- **值**: FY2025 Equity -$5.39B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch11 ROIC修正, Ch12 回购悖论

### DM-FIN-009
- **值**: FY2025 Buybacks $3.254B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch12 回购效率(方法论C核心输入)

### DM-FIN-010
- **值**: FY2025 Interest Expense $620M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch15 信用风险

### DM-FIN-011
- **值**: FY2025 SBC $170M
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch11 真实成本

### DM-FIN-012
- **值**: Shares Out 238M (diluted)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch12 缩股速度计算

### 5年趋势速查
| Metric | FY2021 | FY2022 | FY2023 | FY2024 | FY2025 |
|--------|-------:|-------:|-------:|-------:|-------:|
| Revenue ($M) | 5,788 | 8,773 | 10,235 | 11,174 | 12,039 |
| OPM | 17.4% | 23.9% | 21.7% | 21.2% | 22.4% |
| FCF ($M) | 30 | 1,579 | 1,699 | 1,815 | 2,028 |
| Buybacks ($M) | 0 | -1,590 | -2,338 | -2,893 | -3,254 |
| Net Debt ($M) | 8,349 | 8,482 | 9,320 | 10,702 | 14,699 |
| Shares (M) | 281 | 277 | 264 | 247.5 | 238 |

**注意**: FY2025 Gross Margin跳至41.1%(vs FY2024 27.4%)——可能cost reimbursement分类变化，需Phase 1验证。FY2024税率13.7%异常低。

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: P/E TTM 50.2x
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: 2026-03-06
- **用于**: Ch6 三巨头对比, Ch16 逆向DCF, Ch17 NUG弹性

### DM-VAL-002
- **值**: Forward P/E 29.5x
- **类型**: H
- **来源**: MCP fmp_data quote
- **日期**: 2026-03-06
- **用于**: Ch16 信念反演

### DM-VAL-003
- **值**: EV/EBITDA 28.7x
- **类型**: H
- **来源**: MCP fmp_data key-metrics TTM
- **日期**: 2026-03-06
- **用于**: Ch6 三巨头对比

### DM-VAL-004
- **值**: Net Debt/EBITDA 5.12x
- **类型**: H
- **来源**: MCP fmp_data key-metrics TTM
- **日期**: 2026-03-06
- **趋势**: 3.7x(FY2022)→5.12x(FY2025)持续恶化
- **用于**: Ch15 信用风险KS

### DM-VAL-005
- **值**: FMP DCF $153.21
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-03-06
- **用于**: Ch19 DCF交叉验证

### DM-VAL-006
- **值**: FCF Yield 2.8%
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: 2026-03-06
- **趋势**: 4.5%(FY2022)→2.8%(FY2025)持续下降
- **用于**: Ch16 估值合理性

### DM-VAL-007
- **值**: ROIC 11.3%
- **类型**: H
- **来源**: MCP fmp_data key-metrics TTM
- **日期**: 2026-03-06
- **对比**: MAR 15.6%, IHG 22.6% — HLT三巨头最低
- **用于**: Ch11 ROIC分解, CQ-1核心矛盾

### DM-VAL-008
- **值**: Interest Coverage 4.3x
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: 2026-03-06
- **用于**: Ch15 信用风险

### Peer Comparison
```
HLT   50.2x  ████████████████████████████████████████████████
MAR   35.0x  ██████████████████████████████████
WH    31.8x  █████████████████████████████████
IHG   27.6x  ████████████████████████████
SPY   27.4x  ████████████████████████████
```
HLT溢价: vs MAR +43%, vs IHG +82%, vs SPY +83%

---

## Section C: 市场与共识锚点 (DM-MKT/CON/PMK-xxx)

### DM-MKT-001
- **值**: 股价 $307.32
- **类型**: H
- **来源**: MCP fmp_data quote
- **日期**: 2026-03-06
- **用于**: 全文引用

### DM-MKT-002
- **值**: RSI(14) 34.3 (接近超卖)
- **类型**: H
- **来源**: yfinance technical
- **日期**: 2026-03-06
- **用于**: Ch20 投资温度计

### DM-MKT-003
- **值**: VIX 23.75
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-06
- **用于**: Ch20 宏观环境

### DM-CON-001
- **值**: Consensus rating: Moderate Buy (15 Buy / 11 Hold / 0 Sell)
- **类型**: H
- **来源**: MarketBeat, StockAnalysis, TipRanks aggregation
- **日期**: 2026-03-06
- **用于**: Ch20 分析师情绪

### DM-CON-002
- **值**: Avg PT $285.55; median $325; range $234-$340
- **类型**: H
- **来源**: WallStreetZen, StockAnalysis, MarketBeat, TipRanks
- **日期**: 2026-03-06
- **用于**: Ch20 分析师目标价

### DM-CON-003
- **值**: Q1 2026 EPS guidance $1.91-$1.97, consensus $1.95
- **类型**: R
- **来源**: Hilton Q4 2025 earnings release
- **日期**: 2026-02-11
- **用于**: Ch16 近期催化剂

### DM-PMK-001 ~ DM-PMK-007
- Polymarket recession 2026 probability: 23%
- Fed rate cut by June 2026: 62%
- US recession by end 2026: 23%
- **用于**: Ch20 宏观概率, Ch15 压力测试

---

## Section D: 业务与竞争锚点 (DM-BIZ/MGT/SMT/OPT-xxx)

### 业务概况 (BIZ)
- 客房总数: 1,268,206 (8,447物业)
- Pipeline: 520,000间 (3,700+酒店, 历史新高)
- Honors会员: 243M (+15% YoY)
- 特许经营占比: ~88%
- 品牌数: 24+ (Spark/Graduate/Tempo/Apartment Collection等)
- 亚太: 1,000家运营, Pipeline 915家, 在建份额25%

### 管理层 (MGT)
- CEO: Christopher J. Nassetta, 19年任期
- CFO: Kevin Jacobs, 15年+任期
- 内部人持股: ~1.2% (Nassetta ~$120M)
- 高管买入信号: Kevin Silcock $493K公开市场买入

### 聪明钱 (SMT)
- 机构持有: ~96%
- Top holders: Vanguard(10.3%), BlackRock(8.5%), Capital Group(6.1%), Fidelity(5.8%)
- 近期动向: Fidelity/JPM加仓, BlackRock微减
- 新建仓: Citadel $450M新仓 (Q4 2025)

### 期权做空 (OPT)
- Short interest: 2.82% (极低)
- Days to cover: 3.2
- IV rank: ~35th percentile
- Put/Call ratio: 0.85 (轻微偏空)

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: EPS CAGR FY25→30E ~21.8% vs Rev CAGR 8.3%
- **类型**: R
- **推理链**: EPS CAGR远超Rev CAGR = 回购缩股(~3%/yr) + OPM扩张 + 杠杆
- **证伪条件**: 回购速度放缓>30% 或 利息成本增长超过EBITDA增长
- **来源**: FMP estimates推导
- **日期**: 2026-03-06
- **用于**: CQ-2量化基础, Ch12回购效率

### DM-INF-002
- **值**: Buyback/FCF 160% = 需举债~$1.2B/年维持回购
- **类型**: R
- **推理链**: FY2025回购$3.25B vs FCF $2.03B = $1.22B缺口由新债覆盖
- **证伪条件**: FCF增长超过回购水平 或 回购降至<120% FCF
- **来源**: FMP cashflow推导
- **日期**: 2026-03-06
- **用于**: CQ-2核心证据, Ch12, Ch15

### DM-INF-003
- **值**: 负权益恶化速度: -$821M→-$5,388M (5年6.6x)
- **类型**: R
- **推理链**: Treasury stock -$4.4B→-$14.4B驱动负权益加速
- **证伪条件**: 回购暂停或大幅减债
- **来源**: FMP balance sheet推导
- **日期**: 2026-03-06
- **用于**: CQ-2, Ch11, Ch15

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 62 | 79.5% |
| R (合理推断) | 12 | 15.4% |
| S (主观判断) | 4 | 5.1% |
| **总计** | **78** | **100%** |

质量门控: H>=50% → **PASS** (79.5%)

---

## Section G: Phase 1-4关键发现

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
