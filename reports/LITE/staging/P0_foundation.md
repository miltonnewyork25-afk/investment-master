# Phase 0: Foundation — LITE (Lumentum Holdings)
> 2026-04-05 | Phase 0 数据预取 + 结构化分析基础

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $1,645M
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2025-08-19 (10-K filing)
- **用于**: 收入分析, Reverse DCF

### DM-FIN-002
- **值**: FY2024 Revenue $1,359M (trough, YoY -23.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2024
- **日期**: 2024-08-21

### DM-FIN-003
- **值**: FQ2'26 Revenue $665.5M (QoQ +24.7%, YoY +65.5%)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026
- **日期**: 2026-02-04

### DM-FIN-004
- **值**: FQ4'24 Revenue $308.3M (absolute trough)
- **类型**: H
- **来源**: MCP fmp_data income Q4 FY2024
- **日期**: 2024-08-21

### DM-FIN-005
- **值**: FY2025 Gross Margin 28.0% | FQ2'26 GM 36.1% | FY2022 GM 46.0%
- **类型**: H
- **来源**: MCP fmp_data income (calculated: grossProfit/revenue)
- **日期**: Multiple filings

### DM-FIN-006
- **值**: FY2025 GAAP Net Income $25.9M ($0.37 diluted EPS)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **注意**: 包含$198M税收利益(FQ4'25)，剥离税收影响后为亏损

### DM-FIN-007
- **值**: FY2025 Operating Cash Flow $126.3M | CapEx $231.0M | FCF -$104.7M
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2025-08-19

### DM-FIN-008
- **值**: FY2025 SBC $177.2M (10.8% of revenue)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025

### DM-FIN-009
- **值**: FY2025 Owner FCF = FCF - SBC = -$104.7M - $177.2M = -$281.9M
- **类型**: R
- **推理链**: FCF已为负 + SBC为额外稀释成本 → 真实股东回报为深度负值
- **证伪条件**: SBC大幅下降(不太可能，因为光通信人才竞争激烈)

### DM-FIN-010
- **值**: FY2022 Revenue $1,712.6M | GM 46.0% | OCF $459.3M | FCF $368.1M
- **类型**: H
- **来源**: MCP fmp_data income/cashflow FY2022
- **注意**: FMP FY2021数据与FY2022完全重复——数据质量问题，已标记

### DM-FIN-011
- **值**: 季度收入复苏轨迹: $308M → $337M → $402M → $425M → $481M → $534M → $666M (FQ4'24→FQ2'26, 6Q翻倍)
- **类型**: H
- **来源**: MCP fmp_data income quarterly (8 quarters)

### DM-FIN-012
- **值**: 季度毛利率复苏: 16.6% → 23.1% → 24.8% → 28.8% → 33.3% → 34.0% → 36.1%
- **类型**: H
- **来源**: MCP fmp_data income quarterly (calculated)

### DM-FIN-013
- **值**: FQ2'26 Operating Income $64.3M (首次转正, vs FQ4'24 -$133M)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026

### DM-FIN-014
- **值**: FQ2'26 EBITDA $167.4M (EBITDA margin 25.2%)
- **类型**: H
- **来源**: MCP fmp_data income Q2 FY2026

### DM-FIN-015
- **值**: R&D支出 FY2025 $303.9M (18.5% of revenue) | FY2024 $302.2M (22.2%) | FY2023 $307.8M (17.4%)
- **类型**: H
- **来源**: MCP fmp_data income
- **含义**: R&D绝对额稳定~$300M，但占收入比随收入波动大幅变化

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FQ2'26 Cash + ST Investments $1,155.3M
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **日期**: 2026-02-04

### DM-BAL-002
- **值**: FQ2'26 Total Debt $3,345.4M | Net Debt $2,687.7M
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: 大部分为可转换债券(convertible notes)

### DM-BAL-003
- **值**: FQ2'26 Debt/Equity 3.9x | Total Assets $4,805M | Equity $847M
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026

### DM-BAL-004
- **值**: FQ2'26 Goodwill $1,060.9M + Intangibles $396.7M = $1,457.6M
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **含义**: 主要来自Cloud Light收购(2023年)

### DM-BAL-005
- **值**: FQ2'26 Inventory $570.4M (QoQ +7.3%, vs FQ4'25 $470M)
- **类型**: H
- **来源**: MCP fmp_data balance quarterly
- **含义**: 库存增长反映产能扩张/需求预期，但也是下行风险(如果需求放缓→库存减值)

### DM-BAL-006
- **值**: FQ2'26 Retained Earnings -$778.8M (累计亏损)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **含义**: ��司历史累计亏���，未曾实现持续盈利

### DM-BAL-007
- **值**: FQ2'26 Short-term Debt $3,252.9M (99.7% of current liabilities in ST debt)
- **类型**: H
- **来源**: MCP fmp_data balance Q2 FY2026
- **注意**: 异常值——可能是可转债重分类为短期(临近到期)，需10-Q验证

### DM-BAL-008
- **值**: FQ2'26 Current Ratio 0.61 (vs FQ4'25 4.37)
- **类型**: H
- **来源**: MCP fmp_data key-metrics Q2 FY2026
- **含义**: 从4.37骤降至0.61——短期流动性风险信号，与DM-BAL-007的ST debt暴增一致

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: Current Price $826.88 | 52W Low $47.05 | 52W High $827.56
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-04-02

### DM-VAL-002
- **值**: Trailing PE 238.3x | Forward PE (FMP) 55.2x
- **类型**: H
- **来源**: MCP analyze_stock/fmp_data ratios

### DM-VAL-003
- **值**: Market Cap $72.6B (diluted, 87.8M shares × $827) | EV $75.3B
- **类型**: R
- **推理链**: FQ2'26 diluted shares 87.8M (vs basic 71.1M) due to convertible note dilution
- **来源**: MCP analyze_stock + fmp_data income Q2 FY2026

### DM-VAL-004
- **值**: EV/Sales FY2026E 25.9x | FY2027E 15.4x | FY2028E 11.4x
- **类型**: R
- **推理链**: EV $75.3B / consensus revenue estimates
- **来源**: Python valuation_model.py

### DM-VAL-005
- **值**: PE FY2026E 107.4x | FY2027E 54.3x | FY2028E 41.4x | FY2029E 76.1x
- **类型**: R
- **推理链**: $826.88 / consensus EPS estimates (注意FY2029E PE回升因收入下降)
- **来源**: Python valuation_model.py

### DM-VAL-006
- **值**: Probability-Weighted Fair Value $51/share (Bull $148 @20%, Base $53 @50%, Bear -$17 @30%)
- **类型**: R
- **推理链**: DCF with WACC 10%, TG 3%, 5-year projections, diluted shares
- **证伪条件**: 如果全球光模块TAM在2030年达到$100B+且LITE维持20%份额→Bull case需上调
- **来源**: Python valuation_model.py

### DM-VAL-007
- **值**: Reverse DCF implied terminal revenue: $42-57B (diluted shares)
- **类型**: R
- **推理链**: 当前EV $75.3B → discount back 5Y @10% → terminal FCF $8.5B → @15-20% margin → $42-57B revenue
- **证伪条件**: 光模块TAM在2030年前达到$100B+ (当前估计$15-20B)
- **来源**: Python valuation_model.py

### DM-VAL-008
- **值**: Peer PE: LITE 238x | COHR 251x | MRVL 35x | LRCX 45x | AMAT 36x | SPY 26x
- **类型**: H
- **来源**: MCP compare_stocks
- **含义**: LITE和COHR(Coherent Corp)同属光通信，PE远高于半导体设备同行，反映AI光通信溢价

---

## Section D: Analyst Estimates (DM-CON-xxx)

### DM-CON-001
- **值**: FY2026E Revenue $2.91B (range $2.87-2.94B, 16 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates

### DM-CON-002
- **值**: FY2027E Revenue $4.90B (range $4.32-5.40B, 16 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates

### DM-CON-003
- **值**: FY2028E Revenue $6.62B (range $6.53-6.72B, 12 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **注意**: Range极窄($6.53-6.72B)——可能反映分析师herding

### DM-CON-004
- **值**: FY2029E Revenue $4.21B (range $3.67-4.65B, 8 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **含义**: **FY2028→FY2029收入下降36.4%**——即使最乐观的卖方也预期周期性下行

### DM-CON-005
- **值**: FY2026E EPS $7.70 (12 analysts) | FY2027E $15.24 | FY2028E $19.95 | FY2029E $10.86
- **类型**: H
- **来源**: MCP fmp_data estimates
- **含义**: EPS轨迹与收入一致——FY2028峰值后FY2029下降46%

---

## Section E: 内部人交易锚点 (DM-INS-xxx)

### DM-INS-001
- **值**: 2026 Q1 insider A/D ratio 0.036 (2 acquire / 56 dispose, 0 purchases / 49 sales)
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **含义**: **极端内部人卖出** — 在股价接近历史高点时

### DM-INS-002
- **值**: 过去4个季度(2025Q2-2026Q1)零开放市场内部人买入
- **类型**: H
- **来源**: MCP fmp_data insider-trading (totalPurchases=0 for all 4 quarters)
- **含义**: 无一位高管/董事在公开市场买入——与"变革性增长"叙事矛盾

### DM-INS-003
- **值**: 2025 Q2 insider A/D ratio 0.00 (0 acquire / 15 dispose, 10 sales)
- **类型**: H
- **来源**: MCP fmp_data insider-trading
- **含义**: 纯卖出期——无任何获取

---

## Section F: 市场环境锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: S&P 500 6,582.69 (+0.11%) | NASDAQ 21,879.18 (+0.18%) | VIX 23.87 (-2.73%)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-04-02

### DM-MKT-002
- **值**: LITE Beta 1.39 | 52W Return +1,447%
- **类型**: H
- **来源**: MCP analyze_stock

### DM-MKT-003
- **值**: LITE技术指标: RSI 65.5 | SMA20 $694 | SMA50 $609 | SMA200 $302 | Trend: 上涨
- **类型**: H
- **来源**: MCP analyze_stock technical
- **含义**: 价格远高于所有均线(SMA200的2.7x)——极端超买但趋势完整

---

## Section G: 历史分部数据 (DM-SEG-xxx)

### DM-SEG-001
- **值**: FY2022 Optical Communications $1,518.5M (88.7%) | Lasers $194.1M (11.3%)
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation

### DM-SEG-002
- **值**: FY2023 Lasers $209.2M (Optical Communications数据缺失——可能因Cloud Light收购导致分部重组)
- **类型**: H
- **来源**: MCP fmp_data revenue-product-segmentation
- **注意**: FY2024/FY2025分部数据不可得——可能已改为Cloud & Networking / Industrial Tech分类

---

## Section H: 关键比率趋势 (DM-RAT-xxx)

### DM-RAT-001
- **值**: Gross Margin: FY2022 46.0% → FY2023 32.2% → FY2024 18.5% → FY2025 28.0% → FQ2'26 36.1%
- **类型**: H
- **来源**: MCP fmp_data ratios + income quarterly

### DM-RAT-002
- **值**: Operating Margin: FY2022 17.7% → FY2025 -10.9% → FQ2'26 9.7%
- **类型**: H
- **来源**: MCP fmp_data ratios + income quarterly

### DM-RAT-003
- **值**: Inventory Days: FQ2'26 121 days (vs FQ1'25 140 days) — 改善但仍高
- **类型**: H
- **来源**: MCP fmp_data key-metrics quarterly

### DM-RAT-004
- **值**: Cash Conversion Cycle: FQ2'26 98 days (vs FQ1'25 136 days) — 大幅改善
- **类型**: H
- **来源**: MCP fmp_data key-metrics quarterly

### DM-RAT-005
- **值**: SBC/Revenue: FY2022 6.0% → FY2023 8.4% → FY2024 9.5% → FY2025 10.8% → FQ2'26 6.8%
- **类型**: H
- **来源**: MCP fmp_data key-metrics quarterly
- **含义**: SBC绝对额稳定，但占比随收入增长下降——好信号

---

## Section I: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 35 | 76% |
| R (合理推断) | 11 | 24% |
| S (主观判断) | 0 | 0% |
| **总计** | **46** | **100%** |

---

## Section J: 待Agent补充数据 (Phase 0.5)

以下数据由9个后台Agent并行获取中，返回后补充：
- [ ] Agent A: 分析师共识详情 (bull/bear case)
- [ ] Agent B: 预测市场概率 (台海/AI spending/recession)
- [ ] Agent C: 最新新闻与催化剂
- [ ] Agent D: 业务/竞争格局详情
- [ ] Agent E: 管理层团队详情
- [ ] Agent F: 机构持仓13F
- [ ] Agent G: 期权/做空数据
- [x] MCP数据: 全部完成
- [x] Python估值模型: 全部完成

---

## Section K: Phase 1-5 执行计划

### 目标字符分配 (300K总目标)
| Phase | 主题 | 目标字符 | 关键问题 |
|-------|------|---------|---------|
| P1 | 业务理解+护城河 | 60K | CQ1(需求结构性), CQ2(市占率), CQ5(Cloud Light) |
| P2 | 财务+估值 | 60K | CQ3(估值), CQ4(可转债), CQ7(毛利率) |
| P3 | 竞争+风险+红队 | 50K | CQ6(内部人), CQ8(CPO风险), 竞对分析 |
| P4 | 红队审计+修正 | 40K | RT-1~7, Kill Switch, 双向校准 |
| P4.5 | Top 5 Lens结晶 | 5K | 后置视角提炼 |
| P5 | 组装+审计 | 85K | Complete组装, 前台结构 |

### 关键提醒 (LITE v1.0灾难防御)
1. **每章≥8K字符** — L1 Generator门控
2. **每Phase≥30K字符** — L4 sentinel门控
3. **Complete≥200K字符** — 硬底线
4. **每Phase完成后checkpoint** — 不积压
5. **不发明品类** — 没有"浓缩形态"
