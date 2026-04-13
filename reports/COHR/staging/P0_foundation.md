# Phase 0: Foundation — COHR (Coherent Corp)
> 2026-04-13 | Phase 0 数据预取 + 结构化分析基础

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $5,810M (+23.4% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2025-08-15 (10-K filing)
- **用于**: 收入分析, Reverse DCF, 去杠杆建模

### DM-FIN-002
- **值**: FY2024 Revenue $4,708M (-8.8% YoY, 周期低谷)
- **类型**: H
- **来源**: MCP fmp_data income FY2024
- **日期**: 2024-08-16

### DM-FIN-003
- **值**: FQ2'26 Revenue $1,686M (QoQ +6.6%, YoY +17.5%)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026 (Dec 2025 quarter)
- **日期**: 2026-02-04

### DM-FIN-004
- **值**: FY2023 Revenue $5,160M — 首个含II-VI全年并表的财年
- **类型**: H
- **来源**: MCP fmp_data income FY2023
- **日期**: 2023-08-18
- **注意**: FY2022 $3,317M仅含II-VI半年 → FY2023的+55.6%主要是并表效应

### DM-FIN-005
- **值**: 季度收入轨迹 (FQ3'24→FQ2'26)
  - FQ3'24: $1,209M
  - FQ4'24: $1,314M (+8.7% QoQ)
  - FQ1'25: $1,348M (+2.6%)
  - FQ2'25: $1,435M (+6.5%)
  - FQ3'25: $1,498M (+4.4%)
  - FQ4'25: $1,529M (+2.1%)
  - FQ1'26: $1,581M (+3.4%)
  - FQ2'26: $1,686M (+6.6%) ← 加速
- **类型**: H
- **来源**: MCP fmp_data income quarterly (8 quarters)
- **注意**: 增速温和且加速中(最近2Q QoQ +3.4%/+6.6%), 与LITE的+25% QoQ相比温和得多

### DM-FIN-006
- **值**: 季度毛利率轨迹
  - FQ3'24: 30.3% ($366M/$1,209M)
  - FQ4'24: 32.9% ($432M/$1,314M)
  - FQ1'25: 34.1% ($460M/$1,348M)
  - FQ2'25: 35.5% ($509M/$1,435M)
  - FQ3'25: 35.2% ($528M/$1,498M)
  - FQ4'25: 36.6% ($560M/$1,529M)
  - FQ1'26: 36.6% ($579M/$1,581M)
  - FQ2'26: 37.0% ($623M/$1,686M)
- **类型**: H
- **来源**: MCP fmp_data income quarterly (calculated)
- **注意**: GM稳步改善但斜率放缓(最近3Q仅+0.4pp/Q) vs LITE +19.5pp in 6Q

### DM-FIN-007
- **值**: FY2025 Gross Profit $2,057M / GM 35.4%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **对比**: FY2022 GM 38.2% (pre-II-VI merger, 更高margin), FY2024 GM 30.9%

### DM-FIN-008
- **值**: FY2025 Operating Income $549M (OPM 9.4%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **注意**: GAAP OPM被巨额D&A ($554M)和利息支出($243M)压制

### DM-FIN-009
- **值**: FY2025 D&A $554M (Revenue的9.5%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **注意**: 大部分来自II-VI合并产生的无形资产摊销, 随时间自然递减

### DM-FIN-010
- **值**: FY2025 Interest Expense $243M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **注意**: 占Revenue 4.2%, 是GAAP盈利的最大压制因素之一。去杠杆每减$1B债务→节省~$50-70M利息

### DM-FIN-011
- **值**: FY2025 GAAP Net Income $49M (EPS -$0.52 due to preferred dividends)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **注意**: 普通股东归属后为负, 因preferred stock分红. Bottom line NI = -$81M

### DM-FIN-012
- **值**: FQ2'26 GAAP Net Income $147M (EPS $0.76 diluted)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026
- **注意**: 最近单季利润显著改善, 反映收入增长+OPM扩张+利息减少

### DM-FIN-013
- **值**: FQ2'26 Operating Income $199M (OPM 11.8%)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026
- **注意**: vs FQ3'24 $34M (OPM 2.8%) → OPM在8Q内从2.8%升至11.8%

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FQ2'26 Cash $864M, Total Debt $3,547M, Net Debt $2,683M
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **趋势**: Net Debt从FQ3'25 $3,054M降至$2,683M → 去杠杆$371M in 3Q

### DM-BAL-002
- **值**: FQ2'26 Goodwill $4,463M (29.6% of Total Assets $15,088M)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: 商誉/总资产29.6% 接近M8 kill switch的30%高风险线

### DM-BAL-003
- **值**: FQ2'26 Intangible Assets $3,064M → Goodwill+Intangibles = $7,527M (49.9% of assets)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: 近一半资产是合并产生的非有形资产 — 如果业务不达预期, 减值风险巨大

### DM-BAL-004
- **值**: FQ2'26 Total Equity $8,539M, Preferred Stock从$2,505M(Q1'26)降至$0(Q2'26)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: Q2'26 preferred stock消失可能与NVIDIA投资转换或赎回有关, 需验证

### DM-BAL-005
- **值**: FQ2'26 PP&E $2,117M (vs FQ3'25 $1,936M, +$181M in 3Q)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: PP&E在增长, 反映CapEx扩产(光通信产能扩张)

### DM-BAL-006
- **值**: FQ2'26 Inventory $1,848M (vs FQ1'26 $1,633M, +$215M QoQ)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: 库存快速增长, DIO = $1,848M / ($1,063M×4) × 365 ≈ 159天 — 偏高, 需监控

### DM-BAL-007
- **值**: Net Debt/EBITDA(TTM) ≈ $2,683M / ($325M+$339M+$297M+$293M) = $2,683M / $1,254M ≈ 2.1x
- **类型**: R
- **推理链**: EBITDA TTM ≈ Q1'26+Q2'26+Q4'25+Q3'25 = $1,254M; Net Debt $2,683M; ratio 2.1x
- **注意**: 低于M8 kill switch的3.0x, 但仍偏高; FY2022 pre-merger几乎无净负债

---

## Section C: 现金流锚点 (DM-CF-xxx)

### DM-CF-001
- **值**: FQ2'26 OCF $58M, CapEx $154M, FCF = -$96M
- **类型**: H
- **来源**: MCP fmp_data cashflow Q2 FY2026
- **注意**: OCF数据可能有异常(netIncome显示$369B, 明显是数据错误), 但FCF=-$96M可交叉验证

### DM-CF-002
- **值**: FQ1'26 OCF $46M, CapEx $104M, FCF = -$58M
- **类型**: H
- **来源**: MCP fmp_data cashflow Q1 FY2026

### DM-CF-003
- **值**: FQ2'25 OCF $187M, CapEx $106M, FCF = +$82M
- **类型**: H
- **来源**: MCP fmp_data cashflow Q2 FY2025
- **注意**: 6个月前FCF还是正的, CapEx加速导致FCF转负

### DM-CF-004
- **值**: 季度CapEx轨迹
  - FQ3'24: $93M
  - FQ4'24: $100M
  - FQ1'25: $92M
  - FQ2'25: $106M
  - FQ3'25: $112M
  - FQ4'25: $131M
  - FQ1'26: $104M
  - FQ2'26: $154M ← 跳升
- **类型**: H
- **来源**: MCP fmp_data cashflow quarterly
- **注意**: CapEx从~$95M/Q加速到~$130-154M/Q, 年化~$500-600M, 可能与NVIDIA扩产承诺有关

### DM-CF-005
- **值**: FY2025 SBC估计 ≈ $161M (Q1'25 $35M + Q2'25 $41M + Q3'25 $41M + Q4'25 估$44M)
- **类型**: R
- **推理链**: 季度SBC数据: Q1'25=$35M, Q2'25=$41M, Q3'25=$41M, Q4'25=$160M(异常高), Q1'26=$44M, Q2'26=$87M(可能含NVIDIA)
- **注意**: Q4'25和Q2'26的SBC数据异常高, 可能包含一次性股权激励或NVIDIA相关安排

### DM-CF-006
- **值**: FY2025 Interest Paid $244M (vs Interest Expense $243M — 一致)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025 (sum of 4 quarters)

---

## Section D: 估值锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: Current Price $307.50 | Shares ~155.5M | Market Cap ≈ $47.8B
- **类型**: H
- **来源**: MCP analyze_stock COHR
- **日期**: 2026-04-10

### DM-VAL-002
- **值**: 52-week range: $50.81 - $310.98 (当前接近ATH)
- **类型**: H
- **来源**: MCP analyze_stock COHR
- **注意**: 2年内+449%, 从2024年低点$49.26的6倍

### DM-VAL-003
- **值**: Trailing PE 304x | Forward PE (FY2027E) 41.2x
- **类型**: H/R
- **来源**: MCP analyze_stock ($307.50 / FY2027E EPS $7.47)
- **注意**: 巨大的trailing-to-forward PE压缩说明市场在买未来盈利能力, 不是当前

### DM-VAL-004
- **值**: Consensus Estimates
  - FY2026E: Rev $6,959M, EPS $5.35 → PE 57.5x
  - FY2027E: Rev $8,763M, EPS $7.47 → PE 41.2x
  - FY2028E: Rev $10,462M, EPS $9.64 → PE 31.9x
- **类型**: H
- **来源**: MCP fmp_data estimates
- **注意**: 如果FY2028E $9.64 EPS达到, 31.9x PE对高增长科技股"不贵"。关键假设: 从$6.3B TTM增长到$10.5B FY2028 需要CAGR ~18%

### DM-VAL-005
- **值**: EV ≈ Market Cap + Net Debt = $47.8B + $2.7B = $50.5B
- **类型**: R
- **推理链**: EV/Revenue(TTM) = $50.5B / $6.3B ≈ 8.0x; EV/EBITDA(TTM) = $50.5B / $1.25B ≈ 40x
- **注意**: EV/Rev 8x对光通信公司偏高(LITE ~22x更高), 但EV/EBITDA 40x需要验证增长路径

### DM-VAL-006
- **值**: P/B = 1.70x ($47.8B / $28.1B book value estimated)
- **类型**: H
- **来源**: MCP analyze_stock
- **注意**: 低P/B因为$7.5B goodwill+intangibles被计入book value; 调整后P/B(扣goodwill) ≈ $47.8B / ($8.5B-$7.5B) → 极高, 说明有形资产很少

### DM-VAL-007
- **值**: Beta 1.905
- **类型**: H
- **来源**: MCP analyze_stock
- **注意**: 高Beta反映AI cycle高度暴露, 市场下跌时可能跌幅是SPY的2倍

---

## Section E: 内部人行为锚点 (DM-INS-xxx)

### DM-INS-001
- **值**: 2026 Q1 (Jan-Mar): 9 sales, 0 purchases (open market)
- **类型**: H
- **来源**: MCP fmp_data insider-trading

### DM-INS-002
- **值**: 2025 Q4 (Oct-Dec): 16 sales, 0 purchases
- **类型**: H
- **来源**: MCP fmp_data insider-trading

### DM-INS-003
- **值**: 过去8季度 (Q1'24→Q1'26): Total open market purchases = 4 (仅Q3'24和Q4'24各2次, 都是小额)
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **注意**: 与LITE完全一样 — 内部人零有意义的买入, 纯卖出模式。但COHR的A/D ratio更分散(不如LITE的0.036极端)

### DM-INS-004
- **值**: Q4'25 异常: totalAcquired 7,826,452 (异常大) vs totalDisposed 8,076,335
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **注意**: 可能是大宗授予/转换(非open market), 需SEC filing验证

---

## Section F: 共识估计 (DM-CON-xxx)

### DM-CON-001
- **值**: 15家分析师覆盖FY2026E, 10家覆盖FY2027E, 仅8家覆盖FY2028E
- **类型**: H
- **来源**: MCP fmp_data estimates (numAnalystsRevenue)

### DM-CON-002
- **值**: FY2027E Revenue range: $8.51B - $9.44B (差距11%)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **注意**: 较窄的range说明分析师对中期增长路径共识度较高

### DM-CON-003
- **值**: FY2028E EPS range: $8.80 - $10.48 (差距19%)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **注意**: EPS range比Revenue range宽→说明利润率假设分歧大于收入假设分歧

### DM-CON-004
- **值**: 隐含增长路径: FY2025→FY2028 Revenue CAGR = ($10.46B/$5.81B)^(1/3)-1 ≈ 21.7%
- **类型**: R
- **推理链**: 市场共识+41x FY2027 PE → 市场在给21.7% CAGR + 高PE ≈ PEG 1.9x

---

## Section G: LITE对比锚点 (DM-COMP-xxx)

### DM-COMP-001
- **值**: LITE vs COHR Revenue Growth: LITE +65.5% YoY vs COHR +17.5% YoY (FQ2'26)
- **类型**: H
- **来源**: MCP compare_stocks
- **含义**: LITE增速是COHR的3.7倍, 但LITE Forward PE 263x vs COHR 41x → LITE按增速给的估值溢价远大于COHR

### DM-COMP-002
- **值**: LITE ROE 29.3% vs COHR ROE 3.2%
- **类型**: H
- **来源**: MCP compare_stocks
- **含义**: COHR的低ROE主要因为巨大的equity base(含$7.5B goodwill+intangibles) + 低net margin

### DM-COMP-003
- **值**: LITE P/B 5.76x vs COHR P/B 1.70x
- **类型**: H
- **来源**: MCP compare_stocks
- **含义**: COHR P/B低是因为book value被大量goodwill支撑, 不是因为"便宜"
