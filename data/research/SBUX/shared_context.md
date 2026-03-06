# SBUX Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-06
## 数据预取版本: v4.0
## 报告版本: v4.0 (完全重做)

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $37.18B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch02 revenue trend, Ch14 DCF

### DM-FIN-002
- **值**: FY2025 Net Income $1.856B (EPS $1.63)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch02, Ch14 earnings base

### DM-FIN-003
- **值**: FY2025 Gross Margin 24.15% (vs FY2024 26.84%, FY2023 27.37%)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06
- **用于**: Ch05 定价权, Ch13 DuPont

### DM-FIN-004
- **值**: FY2025 Operating Margin 9.63% (vs FY2024 14.95%, FY2023 16.32%)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06
- **用于**: Ch03 门店经济, Ch07 Niccol, Ch13 DuPont, Ch22 DCF

### DM-FIN-005
- **值**: FY2025 Operating Income $3.581B (vs FY2024 $5.409B, FY2023 $5.871B)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch13 EBIT bridge

### DM-FIN-006
- **值**: FY2025 EBITDA $5.379B (vs FY2024 $7.124B, FY2023 $7.402B)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 leverage, EV/EBITDA

### DM-FIN-007
- **值**: FY2025 Revenue Growth +2.8% YoY ($37.18B vs $36.18B)
- **类型**: H
- **来源**: MCP fmp_data income FY2025/FY2024 计算
- **日期**: 2026-03-06
- **用于**: Ch06 增长引擎

### DM-FIN-008
- **值**: FY2025 Interest Expense $542.6M (coverage ratio 6.6x)
- **类型**: H
- **来源**: MCP fmp_data income + ratios FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 净债务

### DM-FIN-009
- **值**: FY2025 D&A $1.685B (income) / $2.606B (cashflow, 含租赁摊销)
- **类型**: H
- **来源**: MCP fmp_data income/cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch03 capex intensity, Ch22 DCF

### DM-FIN-010
- **值**: FY2025 Effective Tax Rate 41.1% (异常高, vs FY2024 24.3%, FY2023 23.6%)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06
- **用于**: Ch13 非经常性项目

### DM-FIN-011
- **值**: Q1 FY2026 Revenue $9.908B, OPM 9.18%, EPS $0.26
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026
- **日期**: 2026-03-06
- **用于**: Ch02 最新季度, 催化剂追踪

### DM-FIN-012
- **值**: Q1 FY2026 Tax Rate 61.7% ($471.6M / $764.8M) — 极端异常
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026 计算
- **日期**: 2026-03-06
- **用于**: Ch13 一次性调整

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FY2025 Total Assets $32.02B (vs FY2024 $31.34B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06

### DM-BAL-002
- **值**: FY2025 Total Equity -$8.097B (负权益)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 净债务, A-Score

### DM-BAL-003
- **值**: FY2025 Total Debt $26.61B (LTD $14.58B + STD $1.50B + Capital Leases $10.54B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 净债务三口径

### DM-BAL-004
- **值**: FY2025 Net Debt $23.39B (FMP口径: Total Debt - Cash)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 净债务口径1(金融)

### DM-BAL-005
- **值**: FY2025 Cash & ST Investments $3.467B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06

### DM-BAL-006
- **值**: FY2025 Current Ratio 0.723 (vs FY2024 0.755, FY2021 1.197)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06
- **用于**: Ch25 稳健比率

### DM-BAL-007
- **值**: FY2025 Deferred Revenue (Current + NC) $7.613B ($1.841B + $5.773B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch04 Rewards浮存金

### DM-BAL-008
- **值**: FY2025 PP&E Net $17.81B (vs FY2024 $17.95B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06

### DM-BAL-009
- **值**: FY2025 Retained Earnings -$8.273B (累计亏损由回购驱动)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-03-06
- **用于**: Ch15 ROIC崩溃分析

### DM-BAL-010
- **值**: Net Debt趋势 FY2021:$17.1B → FY2022:$21.0B → FY2023:$21.0B → FY2024:$22.5B → FY2025:$23.4B
- **类型**: H
- **来源**: MCP fmp_data balance 5年计算
- **日期**: 2026-03-06
- **用于**: Ch14 杠杆趋势

---

## Section C: 现金流锚点 (DM-CF-xxx)

### DM-CF-001
- **值**: FY2025 Operating Cash Flow $4.748B (vs FY2024 $6.096B, FY2023 $6.009B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06

### DM-CF-002
- **值**: FY2025 Free Cash Flow $2.442B (vs FY2024 $3.318B, FY2023 $3.675B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch22 DCF, Ch25 稳健比率

### DM-CF-003
- **值**: FY2025 CapEx $2.306B (vs FY2024 $2.778B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06

### DM-CF-004
- **值**: FY2025 Dividends Paid $2.771B (vs FCF $2.442B → Payout 113%!)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch14 分红可持续性, KS-06

### DM-CF-005
- **值**: FY2025 Share Repurchases $0 (暂停回购)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06
- **用于**: Ch15 资本配置

### DM-CF-006
- **值**: FY2025 SBC $318.3M (0.86% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-03-06

### DM-CF-007
- **值**: FCF/Revenue趋势: FY2021:15.5% → FY2022:7.9% → FY2023:10.2% → FY2024:9.2% → FY2025:6.6%
- **类型**: H
- **来源**: MCP fmp_data cashflow/income 5年计算
- **日期**: 2026-03-06
- **用于**: Ch25 稳健比率, FCF yield

---

## Section D: 估值与市场锚点 (DM-VAL/MKT-xxx)

### DM-VAL-001
- **值**: PE (TTM) 82.2x / PE (Forward FY2026E) 33.4x
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-06
- **用于**: Ch17 逆向DCF, Ch22 对比

### DM-VAL-002
- **值**: FMP DCF Fair Value $61.00 (vs Stock $98.69 → 38% premium)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-03-06
- **用于**: Ch22 DCF交叉验证

### DM-VAL-003
- **值**: EV/EBITDA 22.5x (FY2025) vs FY2024 18.7x vs FY2023 17.0x
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025/2024/2023
- **日期**: 2026-03-06

### DM-VAL-004
- **值**: P/FCF 40.0x (FY2025) vs FY2024 33.4x — 恶化趋势
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06

### DM-VAL-005
- **值**: Dividend Yield 2.84% (FY2025), Payout Ratio 149%
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-03-06
- **用于**: KS-06 分红可持续性

### DM-MKT-001
- **值**: 当前股价 $98.69 (2026-03-05)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-06

### DM-MKT-002
- **值**: 52W Range $75.50-$110.43 (当前位于51%百分位)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-06

### DM-MKT-003
- **值**: SMA20 $96.85 / SMA50 $92.68 / SMA200 $87.77 — 价格在所有均线之上
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-06

### DM-MKT-004
- **值**: RSI 58.2 (中性偏强), Beta 0.928
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-03-06

### DM-MKT-005
- **值**: S&P 500: 6,830.71 (-0.56%), VIX: 23.75 (+12.3%)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-06

---

## Section E: 同业对比锚点 (DM-PEER-xxx)

### DM-PEER-001
- **值**: QSR P/E对比: MCD 27.8x / CMG 32.2x / BROS 82.6x / DPZ 23.1x / YUM 28.6x / QSR 27.1x / SBUX 82.2x
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-03-06
- **用于**: Ch22 可比估值

### DM-PEER-002
- **值**: SBUX P/E 82.2x = QSR最高(与BROS并列), 是MCD的3x
- **类型**: H
- **来源**: MCP compare_stocks 计算
- **日期**: 2026-03-06
- **用于**: Ch17 逆向DCF隐含假设

### DM-PEER-003
- **值**: CMG ROE 47.4% / QSR ROE 24.0% / BROS ROE 14.1% — SBUX为负(无法比较)
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-03-06

---

## Section F: 共识估计锚点 (DM-EST-xxx)

### DM-EST-001
- **值**: FY2026E Revenue $38.32B (range $37.3B-$38.8B, 24 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06
- **用于**: Ch22 DCF vs 共识

### DM-EST-002
- **值**: FY2026E EPS $2.30 (range $2.14-$2.49, 19 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06
- **用于**: Ch17 逆向DCF

### DM-EST-003
- **值**: FY2027E EPS $2.95 (range $2.72-$3.25, 20 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06

### DM-EST-004
- **值**: FY2028E EPS $3.63 (range $3.30-$4.05, 8 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06
- **用于**: Ch17 管理层FY2028E $3.35-$4.00 vs 共识$3.63

### DM-EST-005
- **值**: FY2029E EPS $4.24 (range $3.96-$4.41, 3 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06

### DM-EST-006
- **值**: FY2026E EBITDA $7.62B → EBITDA margin 19.9% (vs FY2025 14.5%)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-06
- **用于**: 隐含margin恢复斜率

---

## Section G: 关键推断锚点 (DM-INF-xxx)

### DM-INF-001
- **值**: 共识隐含FY2025→FY2028 EPS CAGR 30.6% ($1.63→$3.63)
- **类型**: R
- **推理链**: FY2025 EPS $1.63 → FY2028E $3.63 = 3年CAGR 30.6%
- **证伪条件**: FY2027E EPS < $2.50 (margin恢复不达预期)
- **来源**: MCP estimates 计算
- **日期**: 2026-03-06
- **用于**: Ch17 逆向DCF隐含增速

### DM-INF-002
- **值**: 共识隐含OPM恢复: FY2025 9.6% → FY2026E ~15.3% (EBIT/Revenue)
- **类型**: R
- **推理链**: FY2026E EBIT $5.86B / Revenue $38.32B = 15.3% OPM
- **证伪条件**: FY2026 Q2 OPM仍<11%
- **来源**: MCP estimates EBIT/Revenue 计算
- **日期**: 2026-03-06
- **用于**: Ch07 Niccol效应验证

### DM-INF-003
- **值**: FY2025 异常项: Tax Rate 41.1%(正常~24%) + D&A discrepancy ($1.685B vs $2.606B)
- **类型**: R
- **推理链**: Tax rate异常+D&A口径差=一次性/会计调整,FY2025 NI被压低
- **证伪条件**: FY2026 Q2税率仍>35%
- **来源**: MCP income/cashflow对比
- **日期**: 2026-03-06
- **用于**: Ch13 normalized earnings

### DM-INF-004
- **值**: 分红不可持续性确认: FY2025 Div $2.77B > FCF $2.44B (覆盖率0.88x)
- **类型**: R
- **推理链**: 分红已连续1年超过FCF, 正在以新债还旧+分红
- **证伪条件**: FY2026 FCF > $3.5B(恢复覆盖能力)
- **来源**: MCP cashflow FY2025
- **日期**: 2026-03-06
- **用于**: KS-06, Ch14

---

## Section H: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 35 | 89.7% |
| R (合理推断) | 4 | 10.3% |
| S (主观判断) | 0 | 0% |
| **总计** | **39** | **100%** |

> 注: WebSearch Agent (A-G) 产出的锚点将在Agent返回后追加到此文件。

---

## Section I: Phase 1-4关键发现 (传统格式保留)

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
