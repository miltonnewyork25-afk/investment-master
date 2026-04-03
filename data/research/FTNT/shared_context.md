# FTNT Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-04-03
## 数据预取版本: v4.0

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $6,799.6M (+14.2% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-04-03

### DM-FIN-002
- **值**: FY2025 Net Income $1,853.4M (净利率27.3%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025

### DM-FIN-003
- **值**: FY2025 Gross Margin 80.8%
- **类型**: H
- **来源**: MCP fmp_data income FY2025 (GP $5,497M / Rev $6,800M)

### DM-FIN-004
- **值**: FY2025 GAAP Operating Income $2,082M (OPM 30.6%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025

### DM-FIN-005
- **值**: FY2025 R&D $815.5M (12.0% of revenue)
- **类型**: H
- **来源**: MCP fmp_data income FY2025

### DM-FIN-006
- **值**: FY2025 SBC $279.5M (4.1% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025

### DM-FIN-007
- **值**: FY2025 Operating Cash Flow $2,590.6M (OCF Margin 38.1%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025

### DM-FIN-008
- **值**: FY2025 Free Cash Flow $2,225.8M (FCF Margin 32.7%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025

### DM-FIN-009
- **值**: FY2025 CapEx $364.8M (5.4% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025

### DM-FIN-010
- **值**: FY2025 Share Buyback $2,289.8M (超过FCF, 激进回购)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025 commonStockRepurchased

### DM-FIN-011
- **值**: FY2025 Diluted EPS $2.43 (vs FY2024 $2.26, +7.5%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025

### DM-FIN-012
- **值**: FY2025 Interest Income $162.3M / Interest Expense $20.1M (净利息收入$142.2M)
- **类型**: H
- **来源**: MCP fmp_data income FY2025

### DM-FIN-013
- **值**: 5年收入CAGR: $3,342M(FY21)→$6,800M(FY25) = 19.4%
- **类型**: H
- **来源**: MCP fmp_data income FY2021-FY2025计算

### DM-FIN-014
- **值**: 5年净利润CAGR: $607M(FY21)→$1,853M(FY25) = 32.2%
- **类型**: H
- **来源**: MCP fmp_data income计算

### DM-FIN-015
- **值**: 5年FCF CAGR: $1,204M(FY21)→$2,226M(FY25) = 16.6%
- **类型**: H
- **来源**: MCP fmp_data cashflow计算

### DM-FIN-016
- **值**: FY2025 D&A $336.3M (异常高, vs FY2024 $122.8M, +174%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **注**: FY2024报表D&A仅$122.8M但FY2025跳升至$336.3M, 可能含减值或会计变更, 需交叉验证

### DM-FIN-017
- **值**: Q4 FY2025 Revenue $1,905M (+14.8% YoY), OPM 32.8%
- **类型**: H
- **来源**: MCP fmp_data income Q4 FY2025

### DM-FIN-018
- **值**: Q1→Q4 FY2025收入轨迹: $1,540→$1,630→$1,725→$1,905M (加速)
- **类型**: H
- **来源**: MCP fmp_data income quarterly FY2025

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FY2025 Cash+STI $3,582.5M, Total Debt $996.3M, Net Cash $1,499M
- **类型**: H
- **来源**: MCP fmp_data balance FY2025

### DM-BAL-002
- **值**: FY2025 Deferred Revenue (Current) ~$3,636M估算 (otherCurrentLiabilities字段)
- **类型**: R
- **推理链**: FMP将deferredRevenue计入otherCurrentLiabilities=$3,636M, FY2024单独列示deferredRevenue=$3,276M, 增长11%合理
- **证伪条件**: 10-K确认deferred revenue实际数字
- **来源**: MCP fmp_data balance FY2025

### DM-BAL-003
- **值**: FY2025 Deferred Revenue (Non-Current) $3,479.8M
- **类型**: H
- **来源**: MCP fmp_data balance FY2025

### DM-BAL-004
- **值**: FY2025 Total Deferred Revenue ~$7,116M (Current $3,636M + Non-Current $3,480M)
- **类型**: R
- **推理链**: DM-BAL-002 + DM-BAL-003, FY2024为$6,361M($3,276+$3,085M), YoY +11.9%
- **来源**: 计算

### DM-BAL-005
- **值**: FY2025 Goodwill $354.7M (vs FY2024 $235.4M, +50.7%)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **注**: 增长$119.3M可能来自Lacework/Perception Point收购

### DM-BAL-006
- **值**: FY2025 Inventory $399.5M (vs FY2024 $315.5M, +26.6%)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **注**: 库存增加可能与FortiGate刷新周期备货相关

### DM-BAL-007
- **值**: FY2025 Stockholders' Equity $1,237.5M (FY2023为负$463.4M, 已转正)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025

### DM-BAL-008
- **值**: FY2025 PP&E $1,619M (vs FY2021 $687.6M, 4年增136%)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: 当前股价 $82.53 (2026-04-02), 52周高$109.33/低$70.12
- **类型**: H
- **来源**: MCP analyze_stock

### DM-VAL-002
- **值**: Market Cap ~$59.0B
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025

### DM-VAL-003
- **值**: GAAP PE (TTM) 34.1x (vs 5年均值~54x, 当前为历史低位)
- **类型**: H
- **来源**: MCP analyze_stock + fmp_data ratios

### DM-VAL-004
- **值**: Forward PE 24.9x (基于FY2026E EPS ~$3.00)
- **类型**: H
- **来源**: MCP analyze_stock

### DM-VAL-005
- **值**: EV/Sales (TTM) 8.46x, EV/EBITDA 23.3x, P/FCF 26.5x
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025

### DM-VAL-006
- **值**: ROIC 28.7% (FY2025), ROA 17.8%, ROCE 38.9%
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025

### DM-VAL-007
- **值**: Owner FCF = FCF $2,226M - SBC $280M = $1,946M, Owner FCF Margin 28.6%
- **类型**: R
- **推理链**: FCF(DM-FIN-008) - SBC(DM-FIN-006) = Owner FCF
- **来源**: 计算

### DM-VAL-008
- **值**: Owner PE = Market Cap $59.0B / Owner FCF $1.946B = 30.3x
- **类型**: R
- **来源**: 计算(DM-VAL-002 / DM-VAL-007)

---

## Section D: 同行对比锚点 (DM-COMP-xxx)

### DM-COMP-001
- **值**: FTNT PE 34.1x vs PANW 90.7x vs CSCO 28.4x vs SPY 26.0x
- **类型**: H
- **来源**: MCP compare_stocks

### DM-COMP-002
- **值**: CRWD/ZS/NET PE为负(亏损), FTNT是唯一盈利且PE<40的纯网安公司
- **类型**: H
- **来源**: MCP compare_stocks

### DM-COMP-003
- **值**: FTNT PB 47.7x (因历史负权益导致PB极高), PANW PB 14.7x, CRWD PB 25.2x
- **类型**: H
- **来源**: MCP compare_stocks

---

## Section E: 分析师共识与前瞻锚点 (DM-CON-xxx)

### DM-CON-001
- **值**: FY2027E Revenue共识 $8,390M (+12.1% vs FY2026E), EPS $3.30
- **类型**: H
- **来源**: MCP fmp_data estimates

### DM-CON-002
- **值**: FY2028E Revenue共识 $9,159M (+9.2%), EPS $3.67
- **类型**: H
- **来源**: MCP fmp_data estimates (14 analysts)

### DM-CON-003
- **值**: FY2030E Revenue共识 $11,869M, Revenue CAGR FY25→FY30E = 11.8%
- **类型**: H
- **来源**: MCP fmp_data estimates (13 analysts)

### DM-CON-004
- **值**: 分析师共识 Hold, 中位目标价$90 (+9%), 高$120/低$70
- **类型**: H
- **来源**: WebSearch Agent-A (lit_recon_memo)

### DM-CON-005
- **值**: FY2026E 管理层指引: Revenue $7.5-7.7B, Service Rev $5.05-5.15B, Non-GAAP OPM 33-36%
- **类型**: H
- **来源**: WebSearch Q4 FY2025 earnings release

---

## Section F: 内部人交易锚点 (DM-INS-xxx)

### DM-INS-001
- **值**: 2026Q1 内部人: 32笔acquire vs 36笔dispose, totalPurchases=0, totalSales=7
- **类型**: H
- **来源**: MCP fmp_data insider-trading

### DM-INS-002
- **值**: 2015-2026年间totalPurchases累计仅~8笔 vs totalSales数百笔, 内部人持续净卖出
- **类型**: H
- **来源**: MCP fmp_data insider-trading全量数据
- **注**: Ken Xie + Michael Xie 5年41笔零买入, 2026.02.02单日卖出$42M (per lit_recon)

---

## Section G: 关键财务趋势表

### 5年P&L趋势

| 年份 | Revenue($M) | YoY% | Gross% | OPM% | Net% | EPS | SBC($M) | SBC/Rev% |
|------|------------|------|--------|------|------|-----|---------|----------|
| FY2021 | 3,342 | — | 76.6% | 19.5% | 18.2% | $0.73 | 208 | 6.2% |
| FY2022 | 4,417 | +32.2% | 75.4% | 22.0% | 19.4% | $1.06 | 217 | 4.9% |
| FY2023 | 5,305 | +20.1% | 76.7% | 23.4% | 21.6% | $1.46 | 249 | 4.7% |
| FY2024 | 5,956 | +12.3% | 80.6% | 30.3% | 29.3% | $2.26 | 258 | 4.3% |
| FY2025 | 6,800 | +14.2% | 80.8% | 30.6% | 27.3% | $2.43 | 280 | 4.1% |

### 5年现金流趋势

| 年份 | OCF($M) | FCF($M) | FCF% | CapEx($M) | Buyback($M) | 回购>FCF? |
|------|---------|---------|------|-----------|-------------|----------|
| FY2021 | 1,500 | 1,204 | 36.0% | 296 | 742 | No |
| FY2022 | 1,731 | 1,449 | 32.8% | 281 | 1,991 | Yes |
| FY2023 | 1,936 | 1,731 | 32.6% | 204 | 1,501 | No |
| FY2024 | 2,258 | 1,879 | 31.5% | 379 | 1 | No |
| FY2025 | 2,591 | 2,226 | 32.7% | 365 | 2,290 | Yes |

### 季度收入加速趋势 (最近8Q)

| 季度 | Revenue($M) | YoY% | OPM% |
|------|------------|------|------|
| Q1'24 | 1,353 | +7.2% | 23.7% |
| Q2'24 | 1,434 | +10.9% | 30.5% |
| Q3'24 | 1,508 | +13.1% | 31.2% |
| Q4'24 | 1,660 | +16.8% | 34.6% |
| Q1'25 | 1,540 | +13.8% | 29.5% |
| Q2'25 | 1,630 | +13.7% | 28.0% |
| Q3'25 | 1,725 | +14.4% | 31.6% |
| Q4'25 | 1,905 | +14.8% | 32.8% |

---

## Section H: P0-P3前置识别 (初步)

### P0 原型识别
**混合体**: 硬件ASIC(FortiGate设备) + 软件订阅(FortiGuard安全服务) + 平台(Security Fabric)
- 不是纯SaaS(有实体硬件), 不是纯硬件(67%服务收入), 不是纯平台(正在转型中)
- **→ M0(混合体先拆)必须激活**

### P1 行业定价公式
网络安全行业: **Growth(ARR) × Subscription Mix × Rule of 40 × Platform Breadth**
- FTNT Rule of 45: 14.2% growth + 35.5% OPM = 49.7 ✓ (连续6年达标)
- 但市场对"硬件+软件混合"公司给折扣 vs 纯SaaS

### P2 资产身份识别
- **经营身份**: 混合平台(硬件根基+订阅转型+平台扩展)
- **市场身份**: "便宜版PANW" / "防火墙公司转型中" (PE 34x vs PANW 91x)
- **错位**: 经营在改善(OPM从19.5%→30.6%, 服务占比从~60%→67%), 但市场标签还是"硬件防火墙"
- **→ M2(身份协同/冲突) + M5(转型溢价)必须激活**

### P3 时间框架识别
- 市场买的是**2-3年窗口**: 刷新周期衰竭 vs SASE接力的timing gap
- PE从5年均值54x→当前34x = 市场在质疑转型能否及时
- **关键**: 如果服务占比突破70%+SASE ARR加速, 可能触发从"硬件倍数"到"平台倍数"的重估
