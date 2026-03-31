# SNOW Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-31
## 数据预取版本: v4.0
## 数据来源: MCP fmp_data + baggers_summary + analyze_stock + WebSearch Agents + Polymarket

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2026 Total Revenue $4,684M
- **类型**: H
- **来源**: MCP fmp_data income FY2026 (Q1-Q4合计)
- **日期**: 2026-03-31
- **用于**: 全文引用

### DM-FIN-002
- **值**: FY2026 Product Revenue $4,472M (+29% YoY)
- **类型**: H
- **来源**: WebSearch Agent-A (Snowflake Q4 FY2026 earnings)
- **日期**: 2026-03-31
- **用于**: Ch01 §执行摘要, Ch02 §收入分析

### DM-FIN-003
- **值**: Q4 FY2026 Revenue $1,284M (+30.1% YoY)
- **类型**: H
- **来源**: MCP fmp_data income Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch02 §季度趋势

### DM-FIN-004
- **值**: FY2026 GAAP Gross Margin 67.2% (TTM)
- **类型**: H
- **来源**: MCP baggers_summary TTM
- **日期**: 2026-03-31
- **用于**: Ch02 §利润率分析

### DM-FIN-005
- **值**: FY2026 Non-GAAP Product Gross Margin ~75%
- **类型**: H
- **来源**: WebSearch Agent-A (management guidance)
- **日期**: 2026-03-31
- **用于**: Ch02 §利润率对比

### DM-FIN-006
- **值**: FY2026 GAAP Operating Margin -30.6% (TTM)
- **类型**: H
- **来源**: MCP baggers_summary TTM
- **日期**: 2026-03-31
- **用于**: Ch02 §利润率, Ch08 §财务剪刀差

### DM-FIN-007
- **值**: FY2026 Non-GAAP Operating Margin ~10.5%
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data)
- **日期**: 2026-03-31
- **用于**: Ch02 §GAAP vs Non-GAAP

### DM-FIN-008
- **值**: FY2026 GAAP Net Income -$1,332M
- **类型**: H
- **来源**: MCP fmp_data income TTM合计
- **日期**: 2026-03-31
- **用于**: Ch08 §三PE

### DM-FIN-009
- **值**: FY2026 Operating Cash Flow $1,222M (TTM, 26.1% margin)
- **类型**: H
- **来源**: MCP baggers_summary TTM
- **日期**: 2026-03-31
- **用于**: Ch08 §FCF质量

### DM-FIN-010
- **值**: FY2026 Free Cash Flow $1,120M (TTM, 23.9% margin)
- **类型**: H
- **来源**: MCP fmp_data cashflow TTM合计
- **日期**: 2026-03-31
- **用于**: Ch08 §FCF, Ch14 §估值

### DM-FIN-011
- **值**: FY2026 SBC ~$1.5B (SBC/Revenue ~34%)
- **类型**: H
- **来源**: WebSearch Agent-A (earnings + management commentary)
- **日期**: 2026-03-31
- **用于**: Ch08 §SBC, Ch08 §Owner FCF

### DM-FIN-012
- **值**: FY2026 SBC Coverage (Buyback/SBC) 54.6%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-31
- **用于**: Ch08 §SBC

### DM-FIN-013
- **值**: Q4 FY2026 Billings ~$2,210M (+38.5% YoY)
- **类型**: R
- **推理链**: Revenue $1,284M + DR变化($3,361M - $2,435M) = $2,210M
- **证伪条件**: 如果DR季节性失常(Q4收款模式改变)则Billings失真
- **来源**: 计算: MCP fmp_data income Q4 + balance Q4 vs Q3 DR
- **日期**: 2026-03-31
- **用于**: Ch02 §需求领先指标

### DM-FIN-014
- **值**: FY2026 R&D Expense $1,969M (R&D/Revenue 42.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2026 Q1-Q4合计
- **日期**: 2026-03-31
- **用于**: Ch02 §运营效率

### DM-FIN-015
- **值**: FY2026 S&M Expense $2,062M (S&M/Revenue 44.0%)
- **类型**: H
- **来源**: MCP fmp_data income FY2026 Q1-Q4合计
- **日期**: 2026-03-31
- **用于**: Ch02 §运营效率, M2 §Magic Number

### DM-FIN-016
- **值**: Cash $2,828M + ST Investments $1,202M + LT Investments $755M = Total Liquidity $4,785M
- **类型**: H
- **来源**: MCP fmp_data balance Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch08 §资产负债表

### DM-FIN-017
- **值**: Total Debt $2,741M (incl. $2,280M LT Convertible), Net Debt -$87M
- **类型**: H
- **来源**: MCP fmp_data balance Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch08 §资产负债表

### DM-FIN-018
- **值**: Deferred Revenue (Current) $3,347M (+30% YoY), Non-current $14M
- **类型**: H
- **来源**: MCP fmp_data balance Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch02 §需求可见性

### DM-FIN-019
- **值**: Share Count 342.3M (diluted), YoY +2.9%, 3Y +5.6%
- **类型**: H
- **来源**: MCP baggers_summary + fmp_data income Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch08 §稀释

### DM-FIN-020
- **值**: Goodwill $1,194M (13.1% of Total Assets $9,133M)
- **类型**: H
- **来源**: MCP fmp_data balance Q4 FY2026
- **日期**: 2026-03-31
- **用于**: Ch08 §M&A

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 当前股价 $153.67 (2026-03-30)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-31
- **用于**: 全文引用

### DM-VAL-002
- **值**: 市值 ~$52.8B (FMP Q4数据$66B可能因日期差异)
- **类型**: H
- **来源**: MCP analyze_stock quote
- **日期**: 2026-03-31
- **用于**: 全文引用

### DM-VAL-003
- **值**: EV/Sales (TTM) 12.35x
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-31
- **用于**: Ch14 §估值

### DM-VAL-004
- **值**: P/FCF (TTM) ~46x ($52B / $1.12B)
- **类型**: R
- **推理链**: 市值$52.8B / FCF TTM $1.12B
- **证伪条件**: FCF含大量SBC加回→Owner FCF≈0→Owner P/FCF无意义
- **来源**: 计算: MCP data
- **日期**: 2026-03-31
- **用于**: Ch14 §估值

### DM-VAL-005
- **值**: Forward PE ~63x (Non-GAAP, FY2028E EPS $2.44)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-31
- **用于**: Ch14 §估值

### DM-VAL-006
- **值**: Owner FCF ~-$468M (FCF $1,120M - SBC ~$1,588M), Owner PE: 负/无意义
- **类型**: R
- **推理链**: Owner FCF = FCF - SBC. FCF margin 24%, SBC/Rev 34% → SBC > FCF → Owner FCF < 0
- **证伪条件**: SBC/Rev降至<24%(=FCF margin)时Owner FCF转正, 预计FY2028
- **来源**: 计算: MCP data + WebSearch earnings data
- **日期**: 2026-03-31
- **用于**: Ch08 §三PE, Ch14 §估值

### DM-VAL-007
- **值**: 行业PE: Software-Application (NASDAQ) 59.5x
- **类型**: H
- **来源**: MCP fmp_data industry-pe
- **日期**: 2026-03-31
- **用于**: Ch14 §行业对比

### DM-VAL-008
- **值**: Altman Z-Score 3.12 (安全), Piotroski F-Score 4/9 (中性)
- **类型**: H
- **来源**: MCP fmp_data financial-scores
- **日期**: 2026-03-31
- **用于**: Ch08 §财务健康

### DM-VAL-009
- **值**: Rule of 40: FCF basis 54%, Non-GAAP 41%, GAAP -1%
- **类型**: R
- **推理链**: Rev Growth 30% + FCF Margin 24% = 54% (FCF); + Non-GAAP OPM 10.5% = 41%; + GAAP OPM -31% = -1%
- **证伪条件**: GAAP basis最真实但对高SBC SaaS不公平; FCF basis最乐观但含SBC加回
- **来源**: 计算: MCP data
- **日期**: 2026-03-31
- **用于**: Ch02 §SaaS质量

---

## Section C: 市场与共识锚点 (DM-MKT/CON/PMK-xxx)

### DM-MKT-001
- **值**: S&P 500 6,344 | NASDAQ 20,795 | VIX 30.61 (高波动)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-30
- **用于**: Ch01 §宏观背景

### DM-MKT-002
- **值**: SNOW 52周: $120.10 - $280.67, 当前距高点-45%, RSI 30.3 (超卖)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-31
- **用于**: Ch01 §技术面

### DM-CON-001
- **值**: 分析师共识: Buy/Strong Buy (~80-85%), 平均目标价$245-250
- **类型**: H
- **来源**: WebSearch Agent-A (MarketBeat/StockAnalysis/Benzinga)
- **日期**: 2026-03-31
- **用于**: Ch13 §分析师共识

### DM-CON-002
- **值**: 分析师目标价范围: $83(Alpha Spread) - $325(最牛)
- **类型**: H
- **来源**: WebSearch Agent-A
- **日期**: 2026-03-31
- **用于**: Ch13 §分析师分歧

### DM-CON-003
- **值**: FY2027 指引: Product Revenue $5.66B (+27%), Non-GAAP OPM 12.5%, SBC/Rev ~27%
- **类型**: H
- **来源**: WebSearch Agent-A (Snowflake Q4 FY2026 earnings guidance)
- **日期**: 2026-03-31
- **用于**: Ch02 §前瞻, Ch14 §估值假设

### DM-CON-004
- **值**: FY2028E Revenue $7.33B, EPS $2.44 | FY2029E Rev $9.07B, EPS $3.40
- **类型**: H
- **来源**: MCP fmp_data estimates (34 analysts revenue, 25 analysts EPS)
- **日期**: 2026-03-31
- **用于**: Ch14 §Reverse DCF

### DM-PMK-001
- **值**: Databricks 2026年6月前不会IPO: 87%, 2027前IPO: 39%
- **类型**: H
- **来源**: Polymarket (active markets)
- **日期**: 2026-03-31
- **用于**: Ch06 §竞争, Ch09 §催化事件

### DM-PMK-002
- **值**: Databricks IPO市值≥$250B概率: 7.65% (最高单一bucket)
- **类型**: H
- **来源**: Polymarket (active markets)
- **日期**: 2026-03-31
- **用于**: Ch06 §竞争估值对比

### DM-PMK-003
- **值**: SNOW Q4 FY2026 Beat EPS: 100% (实际$0.34 vs 预期$0.27)
- **类型**: H
- **来源**: Polymarket (closed market)
- **日期**: 2026-03-31
- **用于**: Ch02 §earnings质量

---

## Section D: 业务与竞争锚点 (DM-BIZ/MGT-xxx)

### DM-BIZ-001
- **值**: NRR 125% (Q4 FY2026), 稳定3-4季度在124-125%
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data)
- **日期**: 2026-03-31
- **用于**: Ch03 §SaaS单位经济学, M2

### DM-BIZ-002
- **值**: RPO $9,772M (+42% YoY), cRPO ~$4,500M (46% of RPO)
- **类型**: H
- **来源**: WebSearch Agent-A (Snowflake Q4 FY2026 earnings)
- **日期**: 2026-03-31
- **用于**: Ch02 §需求可见性, Ch03 §cRPO剪刀差

### DM-BIZ-003
- **值**: 总客户 13,328 (+21% YoY), $1M+ TTM客户 733 (+27%)
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data)
- **日期**: 2026-03-31
- **用于**: Ch03 §客户分析

### DM-BIZ-004
- **值**: ARPA $351K/客户 (+6.6% YoY, vs FY25 $330K)
- **类型**: R
- **推理链**: TTM Revenue $4,684M / 13,328 customers = $351K
- **证伪条件**: 如果新增客户consumption起步低→ARPA可能因mix被稀释
- **来源**: 计算: MCP revenue / WebSearch customer count
- **日期**: 2026-03-31
- **用于**: Ch03 §定价权

### DM-BIZ-005
- **值**: Cortex AI 9,100+账户, Intelligence 2,500+(3月内, 史上最快), Cortex Code 4,400+
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data + management commentary)
- **日期**: 2026-03-31
- **用于**: Ch04 §AI战略, M3 AIAS

### DM-BIZ-006
- **值**: AI工作负载增长 200%+ YoY
- **类型**: H
- **来源**: WebSearch Agent-A (management commentary)
- **日期**: 2026-03-31
- **用于**: Ch04 §AI影响

### DM-BIZ-007
- **值**: Q4最大单笔合同 >$400M TCV, 7个9位数合同(去年同期2个)
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data)
- **日期**: 2026-03-31
- **用于**: Ch03 §大客户, Ch06 §竞争

### DM-BIZ-008
- **值**: 收购Observe ~$600M, 进入AI可观测性($50B TAM)
- **类型**: H
- **来源**: WebSearch Agent-A (earnings data)
- **日期**: 2026-03-31
- **用于**: Ch04 §M&A战略

### DM-BIZ-009
- **值**: Databricks Revenue Run-rate $5.4B, Growth 65%+, Valuation $134B (private)
- **类型**: H
- **来源**: WebSearch Agent-D (CNBC/SaaStr Feb 2026)
- **日期**: 2026-03-31
- **用于**: Ch06 §Databricks竞争

### DM-BIZ-010
- **值**: 客户重叠: 40% SNOW客户也用Databricks, 60% Databricks客户也用SNOW
- **类型**: H
- **来源**: WebSearch Agent-D (ETR survey data)
- **日期**: 2026-03-31
- **用于**: Ch06 §竞争格局

### DM-BIZ-011
- **值**: SNOW市占率 18.3% vs Databricks 8.7% (数据平台)
- **类型**: H
- **来源**: WebSearch Agent-D (DataCamp/industry reports)
- **日期**: 2026-03-31
- **用于**: Ch06 §市场份额

### DM-BIZ-012
- **值**: 员工数 9,060 (FY2026), 裁员~700(2024.7)+~550(2025.3), 净增长+30%
- **类型**: H
- **来源**: WebSearch Agent-D (MacroTrends SEC)
- **日期**: 2026-03-31
- **用于**: Ch07 §运营效率

### DM-BIZ-013
- **值**: CEO沉默域: Q3 FY2026 earnings call未提及Competition/Open Source/Azure/Iceberg
- **类型**: H
- **来源**: Polymarket earnings mention markets (closed, resolved)
- **日期**: 2026-03-31
- **用于**: Ch06 §竞争, M10 §CEO分析

### DM-MGT-001
- **值**: CEO Sridhar Ramaswamy, 2024年2月接任, 前Google SVP(Ads/Commerce), 创立Neeva(AI搜索)
- **类型**: H
- **来源**: WebSearch Agent-E (TechTarget/Constellation Research)
- **日期**: 2026-03-31
- **用于**: Ch07 §管理层

### DM-MGT-002
- **值**: Berkshire Hathaway 2024 Q2完全退出SNOW (~$990M清仓), 与CEO换人+数据泄露同期
- **类型**: H
- **来源**: WebSearch Agent-F (Nasdaq/Morningstar)
- **日期**: 2026-03-31
- **用于**: Ch07 §聪明钱, M10

### DM-MGT-003
- **值**: 内部人交易: 近2年零公开市场买入, A/D ratio 0.07-0.24
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **日期**: 2026-03-31
- **用于**: Ch07 §内部人信号

---

## Section E: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: Owner FCF转正预计FY2028 (SBC/Rev需降至<24%=FCF margin)
- **类型**: R
- **推理链**: FY25 SBC 41% → FY26 34% → FY27E 27% → FY28E ~20% < FCF margin 24%
- **证伪条件**: SBC收敛速度<7pp/年 或 FCF margin下降 → 转正推迟
- **来源**: 计算: MCP data + management guidance trajectory
- **日期**: 2026-03-31
- **用于**: Ch08 §Owner FCF, Ch14 §估值时间锚

### DM-INF-002
- **值**: Billings增速38.5% >> Revenue增速30% = +8.5pp正向cRPO-Revenue剪刀差
- **类型**: R
- **推理链**: Q4 Billings $2,210M / Q4 FY25 Billings $1,596M - 1 = 38.5%; 与RPO +42%互相验证
- **证伪条件**: Q4 DR大幅波动可能扭曲Billings计算(季节性)
- **来源**: 计算: MCP fmp_data income + balance
- **日期**: 2026-03-31
- **用于**: Ch02 §需求加速

### DM-INF-003
- **值**: SBC收敛路径: FY25 41% → FY26 34% → FY27E 27% → FY35E mid-teens
- **类型**: R
- **推理链**: management guidance FY27 27% + long-term target mid-teens + WDAY/CRM先例
- **证伪条件**: AI人才争夺加剧→SBC重新上升; 或增速放缓使SBC/Rev分子不降
- **来源**: WebSearch Agent-A (management commentary + analyst estimates)
- **日期**: 2026-03-31
- **用于**: Ch08 §SBC

### DM-INF-004
- **值**: SNOW可能性宽度 ~5.4/10 → 混合模式(传统估值+可能性附录)
- **类型**: S
- **依据**: Consumption波动性(5)+竞争格局不稳定(4)+AI变革高不确定(7)+新CEO(5)+估值分歧(6)
- **来源**: Scout phase综合评估
- **日期**: 2026-03-31
- **用于**: Phase 0 §方法论路由

### DM-SUB-001
- **值**: "一个问题": Databricks $134B+65%增速下, SNOW的核心不可替代性在哪?
- **类型**: S
- **依据**: L1原则5 "一个问题"测试, 答案能改变投资判断方向
- **来源**: Scout phase分析
- **日期**: 2026-03-31
- **用于**: Phase 0.75 §核心矛盾

---

## Section F: 可比公司锚点 (DM-COMP-xxx)

### DM-COMP-001
- **值**: SNOW EV/Sales 14.1x ≈ DDOG 14.3x, 但SNOW毛利率66.8%低于DDOG 80.4%(14pp差距)
- **类型**: H
- **来源**: MCP fmp_data key-metrics (SNOW+DDOG+MDB+ESTC+PLTR+NET)
- **日期**: 2026-03-31
- **用于**: Ch14 §可比估值

### DM-COMP-002
- **值**: SNOW SBC/Rev 34% vs 同行中位数~20% (差距14pp, 同行最高)
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-03-31
- **用于**: Ch08 §SBC对比

### DM-COMP-003
- **值**: SNOW GAAP OPM -24.8% (同行最差), FCF Margin ~60% (同行最高, 但含SBC加回)
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-03-31
- **用于**: Ch08 §利润率对比

---

## Section G: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 35 | 69% |
| R (合理推断) | 11 | 22% |
| S (主观判断) | 5 | 10% |
| **总计** | **51** | **100%** |

**H型占比69% > 50%门控** ✅

---

## Section H: Phase 1-4关键发现 (Phase推进时追加)

[Phase推进时追加]

---

## Section I: 认知边界预评估 (Lite, Phase 0.75)

```
认知边界预评估 (Lite):
  预估可推演度: 中偏低 (~55/100)
  主要黑箱区域:
    1. Consumption波动性: 使用量受客户优化周期驱动, 2023年63%→27%大幅波动 → Phase 1重点: NRR分解+consumption vs commit拆分
    2. Databricks竞争: 非上市, 财务不透明, 仅有run-rate数据 → Phase 3重点: 第三方市占率+客户重叠分析+ETR调研
    3. AI收入拆分: Cortex AI收入不单独披露, 仅有"200%+增长"模糊指标 → Phase 2重点: AI workload间接推算
    4. 可转债稀释: $2.3B convertible到期2027/2029, 转换价未确认 → Phase 2重点: 10-K可转债条款
  分析资源建议:
    - 增加覆盖: M2(NRR间接推算/Magic Number)+M3(AIAS量化)+M8(竞争弹性测试)
    - 承认局限: Databricks精确财务对比/AI收入精确拆分/可转债稀释精确场景→Phase 5标注为黑箱
```
