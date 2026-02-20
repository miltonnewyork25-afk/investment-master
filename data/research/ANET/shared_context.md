# ANET Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-20
## 数据预取版本: v4.0
## 股价基准: $137.23 (2026-02-19)

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $9.006B (+28.6% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-20
- **用于**: Ch02, Ch14 Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $3.511B (net margin 39.0%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-20
- **用于**: Ch02, DCF

### DM-FIN-003
- **值**: FY2025 Gross Margin 63.7% (Q2 peak 65.3%, Q4 low 62.9%)
- **类型**: H
- **来源**: MCP fmp_data income quarterly
- **日期**: 2026-02-20
- **用于**: Ch02, 定价权分析

### DM-FIN-004
- **值**: FY2025 Operating Margin 42.5% (range 41.5%-44.7% quarterly)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-20
- **用于**: Ch02, 经营杠杆分析

### DM-FIN-005
- **值**: FY2025 FCF $4.252B (FCF margin 47.2%, FCF/NI=1.21x)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-20
- **用于**: Ch02, DCF, 现金质量

### DM-FIN-006
- **值**: FY2025 SBC $439.2M (4.9% of revenue, buyback offset ratio 515.7%)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-20
- **用于**: 估值SBC处理

### DM-FIN-007
- **值**: Q4 2025 Revenue $2.488B (+29% YoY), beat consensus $2.39B
- **类型**: H
- **来源**: MCP fmp_data income Q4 2025 + Agent-C news
- **日期**: 2026-02-20
- **用于**: Ch02 最新季度分析

### DM-FIN-008
- **值**: Revenue 5Y CAGR 31.1% (FY2020 $2.32B → FY2025 $9.01B)
- **类型**: H
- **来源**: MCP fmp_data annual 计算
- **日期**: 2026-02-20
- **用于**: 增长轨迹

### DM-FIN-009
- **值**: R&D Expense FY2025 $1.237B (13.7% of revenue), 5Y CAGR ~25%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-20
- **用于**: 技术投入分析

### DM-FIN-010
- **值**: Deferred Revenue Total $5.372B (current $4.003B + non-current $1.370B), FY2020→FY2025增长8.3x
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-20
- **用于**: 软件粘性分析, 收入可预测性

### DM-FIN-011
- **值**: Cash+Investments $10.743B, Total Debt $0, Net Cash $1.964B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-20
- **用于**: 财务韧性, 资本配置

### DM-FIN-012
- **值**: Inventory $2.247B (DIO 230天, FY2023峰值318天), CapEx $119.5M (1.3% revenue)
- **类型**: H
- **来源**: MCP fmp_data balance+cashflow FY2025
- **日期**: 2026-02-20
- **用于**: 供应链分析, 资本效率

### DM-FIN-013
- **值**: Share Repurchase FY2025 $1.603B vs SBC $439M = 3.65x coverage
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-20
- **用于**: 股东回报分析

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: PE TTM 51.7x | Forward PE 32.4x | EV/EBITDA TTM 43.0x
- **类型**: H
- **来源**: MCP analyze_stock + baggers_summary
- **日期**: 2026-02-20
- **用于**: 估值对比

### DM-VAL-002
- **值**: FMP DCF公允价值 $81.36 vs 股价 $136.44 (隐含高估40.4%)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-02-20
- **用于**: Reverse DCF参考锚

### DM-VAL-003
- **值**: P/B 14.7x | P/S 18.3x | FCF Yield 2.4% | EV/Sales 19.7x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-02-20
- **用于**: 估值矩阵

### DM-VAL-004
- **值**: ROIC TTM 196.9% (fabless模型极端值, 因invested capital仅$1.62B)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-20
- **用于**: 资本效率分析 (需标注光学误导性)

### DM-VAL-005
- **值**: ROE 31.4% | ROA 21.0% | ROCE 28.8%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-20
- **用于**: 杜邦分析

### DM-VAL-006
- **值**: Altman Z-Score 17.71 (极度健康), Current Ratio 3.05, D/E 0
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-20
- **用于**: 财务韧性评估

---

## Section C: 市场与共识锚点 (DM-MKT/CON-xxx)

### DM-MKT-001
- **值**: 股价 $137.23 (2026-02-19) | 52W High $164.94 | 52W Low $59.43
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-20
- **用于**: 全文引用

### DM-MKT-002
- **值**: Market Cap ~$172.8B | Beta 1.444 | RSI 40.5 (中性偏弱)
- **类型**: H
- **来源**: MCP analyze_stock + Agent-A
- **日期**: 2026-02-20
- **用于**: 市值基准

### DM-MKT-003
- **值**: SMA20 $140.07 > SMA50 $133.56 > SMA200 $125.84 (均线多头排列)
- **类型**: H
- **来源**: MCP analyze_stock technical
- **日期**: 2026-02-20
- **用于**: 技术面参考

### DM-CON-001
- **值**: 分析师共识 Buy (Strong Buy 9 / Buy 18 / Hold 6 / Sell 0), avg PT $173.80 (+26.6% upside)
- **类型**: H
- **来源**: WebSearch Agent-A (StockAnalysis/MarketBeat/TipRanks)
- **日期**: 2026-02-20
- **用于**: 分析师共识章节

### DM-CON-002
- **值**: Q1 2026E: Revenue $2.62B (guidance $2.60B), EPS $0.81 | Q2 2026E: EPS ~$0.90
- **类型**: H
- **来源**: WebSearch Agent-A
- **日期**: 2026-02-20
- **用于**: 近期预期

### DM-CON-003
- **值**: FY2026E Revenue $11.43B (+26.9%) | FY2027E $13.95B (+22.1%) | FY2028E $16.98B (+21.8%) | FY2029E $21.28B (+25.3%)
- **类型**: H
- **来源**: MCP fmp_data estimates (17 analysts FY2026)
- **日期**: 2026-02-20
- **用于**: DCF建模参考

### DM-CON-004
- **值**: FY2026E EPS $3.53 | FY2027E $4.29 | FY2028E $5.26 | FY2029E $6.96
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-20
- **用于**: PE估值

### DM-PMK-001
- **值**: US Recession by End of 2026: 22% probability
- **类型**: H
- **来源**: Polymarket, active market, $236K volume
- **日期**: 2026-02-20
- **用于**: 宏观风险情景

---

## Section D: 业务与竞争锚点 (DM-BIZ-xxx)

### DM-BIZ-001
- **值**: Products Revenue ~77% ($6.94B) | Services Revenue ~23% ($2.07B)
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-02-20
- **用于**: 业务矩阵

### DM-BIZ-002
- **值**: AI Networking Revenue FY2025 $1.5B → FY2026 Target $2.75-3.25B (+83-117% YoY)
- **类型**: H
- **来源**: 管理层Q4 2025 Earnings Call via Agent-D
- **日期**: 2026-02-20
- **用于**: AI增长驱动分析

### DM-BIZ-003
- **值**: Campus Networking Revenue FY2025 $750-800M → FY2026 Target $1.25B (+60% YoY)
- **类型**: H
- **来源**: 管理层Q4 2025 Earnings Call via Agent-D
- **日期**: 2026-02-20
- **用于**: 多元化分析

### DM-BIZ-004
- **值**: Customer A (Microsoft) ~26% FY2025 Revenue ($2.34B, +67.2% YoY) | Customer B (Meta) ~16% FY2025 Revenue
- **类型**: H
- **来源**: 10-K filing + Agent-D + lit_recon
- **日期**: 2026-02-20
- **用于**: 客户集中度分析 (合计42%)

### DM-BIZ-005
- **值**: CloudVision累计3,000+客户, Q4新增350 | EOS单一代码库覆盖全产品线
- **类型**: H
- **来源**: Q4 2025 Earnings Call via Agent-D
- **日期**: 2026-02-20
- **用于**: 软件粘性, 转换成本

### DM-BIZ-006 ⚠️ 关键竞争数据
- **值**: NVIDIA Spectrum-X DC份额 Q2 2025: 25.9% ($2.3B, +647% YoY) vs ANET 19.2% (Q3 2025)
- **类型**: H
- **来源**: WebSearch Agent-D (Dell'Oro Group)
- **日期**: 2026-02-20
- **用于**: 竞争格局核心 — NVIDIA已超越ANET成为DC Ethernet第一

### DM-BIZ-007
- **值**: Cisco DC Ethernet ~27.3% (total market, Q2 2025) | Juniper被Cisco收购 | HPE/Aruba enterprise focused
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-02-20
- **用于**: 三足鼎立竞争框架

### DM-BIZ-008
- **值**: DC Networking TAM: $45.8B(2025)→$103B(2030), CAGR 17.6% | AI DC Market: $17.7B→$133.5B(2034), CAGR 25.8%
- **类型**: R
- **推理链**: 多个行业报告交叉 (Dell'Oro, Gartner via WebSearch)
- **证伪条件**: AI CapEx连续2Q环比下降>20%
- **来源**: WebSearch Agent-D + lit_recon
- **日期**: 2026-02-20
- **用于**: TAM分析

### DM-BIZ-009
- **值**: Purchase Commitments从$4.8B升至$6.8B | 内存短缺"显著恶化" | 1.6T以太网2026量产
- **类型**: H
- **来源**: Q4 2025 Earnings Call + lit_recon
- **日期**: 2026-02-20
- **用于**: 供应链分析

### DM-BIZ-010
- **值**: VeloCloud SD-WAN从Broadcom收购 (2025年7月) | R4系列平台发布
- **类型**: H
- **来源**: Agent-C news
- **日期**: 2026-02-20
- **用于**: 产品扩展分析

---

## Section E: 管理层/Smart Money/期权锚点 (DM-MGT/SMT/OPT-xxx)

### DM-MGT-001
- **值**: CEO Jayshree Ullal, 17年任期, 曾将Cisco Catalyst从零做到$5B收入
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-02-20
- **用于**: 管理层评估

### DM-MGT-002
- **值**: CTO Kenneth Duda — EOS架构师, 2024年薪酬从$4.4M升至$35.2M (含$25M RSU)
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-02-20
- **用于**: 技术领导力

### DM-MGT-003
- **值**: Andy Bechtolsheim (联合创始人) — SEC内幕交易和解, 辞去Chairman, 继续任Chief Architect, 持股~15%
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-02-20
- **用于**: 治理风险

### DM-MGT-004
- **值**: 新COO Todd Nightingale (2025年7月) — 前Fastly CEO, 前Cisco Meraki SVP
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-02-20
- **用于**: 管理层变动

### DM-SMT-001
- **值**: 机构持股70%, 2763家机构, Vanguard 8.4% ($10.6B), Bechtolsheim 15%
- **类型**: H
- **来源**: WebSearch Agent-F
- **日期**: 2026-02-20
- **用于**: 股东结构

### DM-OPT-001
- **值**: Short Interest 1.23-1.45% of float (远低于行业均值7.97%), Days to Cover 1.6-2.5
- **类型**: H
- **来源**: WebSearch Agent-G
- **日期**: 2026-02-20
- **用于**: 空头情绪

### DM-OPT-002
- **值**: Put/Call OI Ratio 0.85 | IV Percentile 94 (earnings elevated) | IV Rank 65.7%
- **类型**: H
- **来源**: WebSearch Agent-G
- **日期**: 2026-02-20
- **用于**: 期权情绪

---

## Section F: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: FY2026 Revenue CAGR减速路径: 28.6%(FY2025) → 26.9%(FY2026E) → 22.1%(FY2027E) → 21.8%(FY2028E)
- **类型**: R
- **推理链**: 基数效应 + AI CapEx周期减速 + NVIDIA Spectrum-X份额蚕食
- **证伪条件**: FY2027 Revenue YoY > 25%
- **来源**: MCP fmp_data estimates + 分析推导
- **日期**: 2026-02-20
- **用于**: DCF增长假设

### DM-INF-002
- **值**: ANET DC Ethernet份额压缩趋势: 21.3%(Q1'25) → 19.2%(Q3'25) ≈ -2.1pp in 2Q
- **类型**: R
- **推理链**: NVIDIA Spectrum-X从零到25.9%的爆发式增长主要侵蚀ANET+Cisco份额
- **证伪条件**: ANET Q1 2026 DC份额回升>20%
- **来源**: Dell'Oro Group via Agent-D + lit_recon
- **日期**: 2026-02-20
- **用于**: 竞争分析核心

### DM-INF-003
- **值**: Deferred Revenue/Revenue比率: 7.2%(2020) → 25.5%(2024) → 59.7%(2025) — 软件粘性急剧增强
- **类型**: R
- **推理链**: CloudVision+EOS订阅从附加变为核心, 客户锁定效应增强
- **证伪条件**: 续约率<90%或NRR<100%
- **来源**: MCP balance sheet计算
- **日期**: 2026-02-20
- **用于**: 软件平台价值分析

### DM-SUB-001
- **值**: 管理层执行力评估: 极强 (Jayshree Ullal被广泛认为行业最优CEO之一)
- **类型**: S
- **依据**: 17年任期+revenue从<$200M→$9B+持续beat expectations
- **来源**: 定性分析
- **日期**: 2026-02-20
- **用于**: 管理层评估

### DM-SUB-002
- **值**: 可能性宽度(PW)=4 → 混合模式(传统估值+AI不确定性附录)
- **类型**: S
- **依据**: AI网络TAM不确定+NVIDIA变量, 但核心DC业务相对成熟
- **来源**: Phase -0.5 评估
- **日期**: 2026-02-20
- **用于**: 分析框架选择

---

## Section G: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 31 | 79.5% |
| R (合理推断) | 5 | 12.8% |
| S (主观判断) | 3 | 7.7% |
| **总计** | **39** | **100%** |

---

## Section H: 宏观市场温度

| 指标 | 当前值 | 历史百分位 | 状态 |
|------|--------|-----------|------|
| Shiller P/E (CAPE) | 40.01 | 98% | 非常昂贵 |
| Buffett 指标 | 222% | 100% | 非常昂贵 |
| Market Risk Premium | 4.5% | 66% | 偏贵 |
| S&P 500 | 6,862 | — | -0.28% |
| VIX | 20.23 | — | +3.11% |
| US Recession P(2026) | 22% | — | Polymarket |

---

## Section I: ANET关键异常 (Phase 0.75 候选)

1. **DIO 230天异常**: 网络设备通常DIO 60-90天, ANET 230天暗示战略备货或供应链囤积
2. **ROIC 197%光学幻觉**: fabless+零债务=invested capital极小, ROIC失真, 需用ROCE(28.8%)替代
3. **Deferred Revenue爆炸式增长**: 8.3x in 5年, 从$651M→$5.37B, 软件转型的隐藏指标
4. **NVIDIA份额逆转**: ANET从DC Ethernet #1被NVIDIA超越, 份额从21.3%→19.2%下降中
5. **42%客户集中度**: MSFT 26% + Meta 16%, 两家超级客户控制近半收入
6. **FMP DCF隐含高估40%**: 需验证DCF假设合理性(可能过于保守的增长率)
7. **CapEx突然加速**: FY2024 $32M → FY2025 $119.5M (+273%), 信号意义待解读

---

## Section J: Phase 1-4关键发现

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
