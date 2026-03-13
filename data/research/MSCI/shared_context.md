# MSCI Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-13
## 数据预取版本: v4.0

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $3.134B (+9.75% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14 Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $1.202B (+8.4% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch02

### DM-FIN-003
- **值**: FY2025 Gross Margin 82.4%
- **类型**: H
- **来源**: MCP fmp_data income FY2025 (GP $2.584B / Rev $3.134B)
- **日期**: 2026-03-13
- **用于**: Ch02, Ch05 定价权

### DM-FIN-004
- **值**: FY2025 Operating Margin 54.7% (Operating Income $1.714B)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch05

### DM-FIN-005
- **值**: FY2025 EBITDA $1.932B (margin 61.6%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-006
- **值**: FY2025 EPS $15.56 (diluted), Shares 77.3M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-007
- **值**: FY2025 R&D $177.6M (5.67% of revenue)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch03 R&D量化, D4

### DM-FIN-008
- **值**: FY2025 SBC $111.3M (3.55% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 FCF调整

### DM-FIN-009
- **值**: FY2025 Interest Expense $209.9M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 WACC

### DM-FIN-010
- **值**: FY2025 Income Tax Rate 19.5% (Tax $292M / PreTax $1.494B)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 WACC

### DM-FIN-011
- **值**: Revenue CAGR FY2021-2025 = 11.3% ($2.044B→$3.134B, 4年)
- **类型**: H
- **来源**: MCP fmp_data income 5年计算
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-012
- **值**: Net Income CAGR FY2021-2025 = 13.4% ($726M→$1.202B, 4年)
- **类型**: H
- **来源**: MCP fmp_data income 5年计算
- **日期**: 2026-03-13
- **用于**: Ch02

### DM-FIN-013
- **值**: R&D CAGR FY2021-2025 = 12.3% ($112M→$178M, 4年)
- **类型**: H
- **来源**: MCP fmp_data income 5年计算
- **日期**: 2026-03-13
- **用于**: Ch03 R&D量化

---

## Section A2: 资产负债表锚点 (DM-FIN-1xx)

### DM-FIN-101
- **值**: FY2025 Total Assets $5.702B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch02

### DM-FIN-102
- **值**: FY2025 Total Debt $6.310B (LT $6.202B + ST $0)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14 WACC

### DM-FIN-103
- **值**: FY2025 Stockholders Equity -$2.655B (负权益)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-104
- **值**: FY2025 Goodwill $2.923B + Intangibles $833M = $3.756B (65.9% of assets)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, ROIC分析

### DM-FIN-105
- **值**: FY2025 Cash $515M, Net Debt $5.794B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 EV计算

### DM-FIN-106
- **值**: FY2025 Deferred Revenue $1.232B (39.3% of revenue, 订阅预收)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch03 商业模式粘性

### DM-FIN-107
- **值**: FY2025 Treasury Stock $9.834B (累计回购总额)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-13
- **用于**: Ch02 资本配置

### DM-FIN-108
- **值**: Debt/EBITDA: 3.27x (FY2025, $6.31B/$1.932B), 目标3.0-3.5x
- **类型**: H
- **来源**: MCP fmp_data balance+income计算
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-109
- **值**: Employees 6,184 (FY2025)
- **类型**: H
- **来源**: MCP fmp_data profile
- **日期**: 2026-03-13
- **用于**: Ch03 人效分析

---

## Section A3: 现金流锚点 (DM-FIN-2xx)

### DM-FIN-201
- **值**: FY2025 Operating Cash Flow $1.588B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-202
- **值**: FY2025 Free Cash Flow $1.549B (FCF margin 49.4%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025 (OCF $1.588B - CapEx $39.3M)
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-203
- **值**: FY2025 CapEx $39.3M (1.25% of revenue, 极轻资产)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-204
- **值**: FY2025 Share Buyback $2.484B (+181% YoY from $885M)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch02 资本配置

### DM-FIN-205
- **值**: FY2025 Dividends $556.5M ($7.21/share)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch02 资本配置

### DM-FIN-206
- **值**: FY2025 Net Debt Issuance +$1.704B (新增借款用于回购)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-13
- **用于**: Ch02 杠杆策略

### DM-FIN-207
- **值**: FCF CAGR FY2021-2025 = 15.1% ($883M→$1.549B, 4年)
- **类型**: H
- **来源**: MCP fmp_data cashflow 5年计算
- **日期**: 2026-03-13
- **用于**: Ch14

### DM-FIN-208
- **值**: 累计5年回购: $5.47B ($198M+$1.398B+$504M+$885M+$2.484B)
- **类型**: H
- **来源**: MCP fmp_data cashflow 5年汇总
- **日期**: 2026-03-13
- **用于**: Ch02 资本配置效率

### DM-FIN-209
- **值**: 累计5年FCF: $6.067B ($883M+$1.022B+$1.145B+$1.468B+$1.549B)
- **类型**: H
- **来源**: MCP fmp_data cashflow 5年汇总
- **日期**: 2026-03-13
- **用于**: Ch02

---

## Section A4: 季度趋势锚点 (DM-FIN-3xx)

### DM-FIN-301
- **值**: 季度Revenue趋势(QoQ): Q1'24 $680M → Q2 $708M → Q3 $725M → Q4 $744M → Q1'25 $746M → Q2 $773M → Q3 $793M → Q4 $823M
- **类型**: H
- **来源**: MCP fmp_data income quarterly 8Q
- **日期**: 2026-03-13
- **用于**: Ch02 增长趋势

### DM-FIN-302
- **值**: Q4 2025 Revenue $822.5M (+10.6% YoY), Operating Income $463.6M (margin 56.4%), EPS $3.68
- **类型**: H
- **来源**: MCP fmp_data income Q4 2025
- **日期**: 2026-03-13
- **用于**: Ch02 最新季度

### DM-FIN-303
- **值**: FY2025 Quarterly EPS: Q1 $3.71 + Q2 $3.92 + Q3 $4.24 + Q4 $3.68 = $15.55 (Q3最高, Q4税率跳升26.8%)
- **类型**: H
- **来源**: MCP fmp_data income quarterly计算
- **日期**: 2026-03-13
- **用于**: Ch02, Ch14

### DM-FIN-304
- **值**: Q4 2025 Interest Expense $63.6M(+39.7% QoQ from $45.5M Q4'24), 反映FY2025新增$1.7B借款
- **类型**: H
- **来源**: MCP fmp_data income Q4 2025
- **日期**: 2026-03-13
- **用于**: Ch02 杠杆成本

### DM-FIN-305
- **值**: Insider Trading: Q1 2026 净买入(16买/4卖, 5笔open market purchase, 0 sale); Q4 2025也净买入(22买/4卖, 19 purchase, 2 sale)
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **日期**: 2026-03-13
- **用于**: D6 交易信号

### DM-FIN-306
- **值**: Insider Trading反转: 2021 Q3-Q4大量卖出(53 disposed/3 acquired, 52 sales) → 2024-2026转为买入主导
- **类型**: H
- **来源**: MCP fmp_data insider-trading历史
- **日期**: 2026-03-13
- **用于**: D6 交易信号

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: PE (TTM) 34.1x, Forward PE 24.3x
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-13
- **用于**: Ch14 估值对比

### DM-VAL-002
- **值**: FMP DCF公允价值 $339.72 (vs 当前$536.35 = -36.7%溢价)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-03-13
- **用于**: Ch14 DCF参考

### DM-VAL-003
- **值**: EV/EBITDA 25.9x (FY2025)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 估值对比

### DM-VAL-004
- **值**: P/FCF 28.6x (FY2025)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-13
- **用于**: Ch14 估值对比

### DM-VAL-005
- **值**: PE 10年范围 26.3x-80.6x, 中位数 39.7x, 当前34.1x首次低于中位
- **类型**: H
- **来源**: MCP fmp_data ratios 5年 + lit_recon
- **日期**: 2026-03-13
- **用于**: Ch14 估值区间

### DM-VAL-006
- **值**: Market Cap $40.3B, EV $50.1B (FY2025)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-13
- **用于**: Ch14

### DM-VAL-007
- **值**: ROIC 35.6% (FY2025, Invested Capital $3.77B)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-13
- **用于**: Ch05 护城河

### DM-VAL-008
- **值**: FCF Yield 3.5% (FY2025)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-03-13
- **用于**: Ch14

### DM-VAL-009
- **值**: Dividend Yield 1.26%, Payout Ratio 46.3%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-13
- **用于**: Ch02 资本配置

---

## Section B2: 同行对比锚点 (DM-VAL-1xx)

### DM-VAL-101
- **值**: MSCI PE 34.1x vs SPGI 28.6x / MCO 31.2x / ICE 27.5x / VRSK 30.6x / SPY 26.4x
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-03-13
- **用于**: Ch14 同行估值

### DM-VAL-102
- **值**: MSCI PE溢价: vs SPGI +19.2%, vs MCO +9.3%, vs ICE +24.0%, vs VRSK +11.5%
- **类型**: H
- **来源**: MCP compare_stocks计算
- **日期**: 2026-03-13
- **用于**: Ch14 溢价分析

---

## Section C: 市场与共识锚点 (DM-MKT/CON/PMK-xxx)

### DM-MKT-001
- **值**: 当前股价 $536.35 (2026-03-12)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-13
- **用于**: 全文引用

### DM-MKT-002
- **值**: 52周范围 $486.74-$626.28, 当前距高点-14.4%
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-13
- **用于**: Ch14

### DM-MKT-003
- **值**: 2年期回报 -1.33%, Period High $625.55, Low $434.85
- **类型**: H
- **来源**: MCP analyze_stock history_summary
- **日期**: 2026-03-13
- **用于**: Ch14 回撤DNA

### DM-MKT-004
- **值**: Beta 1.301, 日均成交量 ~593K
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-13
- **用于**: D6 交易策略

### DM-MKT-005
- **值**: 技术面: SMA20=$551.6 / SMA50=$568.2 / SMA200=$560.7, RSI=46.1, 趋势=下跌
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-13
- **用于**: D6 交易策略

### DM-MKT-006
- **值**: S&P 500 5672.62 (-1.52%), VIX 27.29 (+12.63%) [2026-03-12]
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-13
- **用于**: Ch09 宏观背景

---

## Section D: 业务与竞争锚点 (DM-BIZ/MGT/SMT/OPT-xxx)

> Agent D-G 数据回填中，完成后追加

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Revenue CAGR FY2025-2030E ~8-10%
- **类型**: R
- **推理链**: 历史11.3% CAGR → Index segment(56%) AUM挂钩增长~10-12% + Analytics稳定5-6% + ESG减速3-5% + PA加速10-15% → 加权8-10%
- **证伪条件**: 连续2Q organic revenue growth <5%
- **来源**: 历史数据外推 + 分析师共识方向
- **日期**: 2026-03-13
- **用于**: Ch14 DCF

### DM-INF-002
- **值**: Operating Margin FY2030E ~55-57% (from 54.7%)
- **类型**: R
- **推理链**: 运营杠杆 + 技术效率 + PA segment margin提升 → 缓慢扩张; 抵消: ESG margin压力 + R&D增投
- **证伪条件**: Operating margin连续2Y下滑至<52%
- **来源**: 历史趋势外推(52.5%→54.7%, 4年+2.2pp)
- **日期**: 2026-03-13
- **用于**: Ch14 DCF

### DM-SUB-001
- **值**: 护城河综合评估: 极强(寡头垄断+切换成本+网络效应)
- **类型**: S
- **依据**: Big Three控制>80%全球指数收入, 70-80%利润率, 切换需重验证历史数据
- **来源**: Phase -0.5 文献侦察
- **日期**: 2026-03-13
- **用于**: Ch05

### DM-SUB-002
- **值**: MSCI vs SPGI/FICO定位: "卖铲子的人中的卖铲子的人"
- **类型**: S
- **依据**: SPGI=信用评级(发行人付费), MSCI=指数许可(AUM挂钩), 两者都是金融基础设施但收费模型不同
- **来源**: 定性分析
- **日期**: 2026-03-13
- **用于**: Ch01 公司定位

---

## Section F: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 43 | 89.6% |
| R (合理推断) | 2 | 4.2% |
| S (主观判断) | 2 | 4.2% |
| 待补(Agent) | ~1 | 2.1% |
| **Phase 0小计** | **47+** | **100%** |

> Agent A-G完成后锚点数量将增加至60-80个

---

## Section G: Phase 1-4关键发现

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
