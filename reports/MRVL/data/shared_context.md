# MRVL Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-03-30
## 数据预取版本: v4.0

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2026 Revenue $8.195B (+42.1% YoY)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-002
- **值**: FY2026 GAAP Net Income $2.670B (FY2025: -$885M)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-003
- **值**: FY2026 Gross Margin 51.0% (FY2025: 41.3%, FY2023: 50.5%)
- **类型**: H
- **来源**: MCP fmp_data ratios FY2026
- **日期**: 2026-03-30

### DM-FIN-004
- **值**: FY2026 Operating Income $1.338B (OPM 16.3%) vs FY2025: -$720M
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-005
- **值**: FY2026 EBITDA $2.629B (margin 32.1%)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-006
- **值**: FY2026 R&D $2.075B (25.3% of revenue, 49.6% of gross profit)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-007
- **值**: FY2026 SGA $767M (9.4% of revenue)
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-008
- **值**: FY2026 SBC $591M (7.2% of revenue), SBC Coverage 345%
- **类型**: H
- **来源**: MCP baggers_summary + fmp_data cashflow
- **日期**: 2026-03-30

### DM-FIN-009
- **值**: FY2026 FCF $1.396B (FCF margin 17.0%), OCF $1.751B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026
- **日期**: 2026-03-30

### DM-FIN-010
- **值**: FY2026 CapEx $354M (4.3% of revenue, CapEx/D&A 0.27x)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026
- **日期**: 2026-03-30

### DM-FIN-011
- **值**: FY2026 D&A $1.291B (15.7% of revenue) — 主要来自Inphi/Cavium无形资产摊销
- **类型**: H
- **来源**: MCP fmp_data income FY2026
- **日期**: 2026-03-30

### DM-FIN-012
- **值**: FY2026 Interest Expense $203M, Coverage 6.6x
- **类型**: H
- **来源**: MCP fmp_data income+ratios FY2026
- **日期**: 2026-03-30

### DM-FIN-013
- **值**: FY2026 Share Buyback $2.040B, Net Stock Issuance -$2.040B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026
- **日期**: 2026-03-30

### DM-FIN-014
- **值**: FY2026 Dividends $205M ($0.24/share)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2026
- **日期**: 2026-03-30

### DM-FIN-015
- **值**: Share Count -2.22% YoY (缩股, 正面信号)
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-30

### DM-FIN-016
- **值**: Q4 FY2026 Revenue $2.219B (+22% YoY), Q3 $2.075B (+37%), Q2 $2.006B, Q1 $1.895B
- **类型**: H
- **来源**: MCP fmp_data income quarterly
- **日期**: 2026-03-30

### DM-FIN-017
- **值**: Q4 FY2026 Gross Margin 48.4%, Q3 51.6%, Q2 50.4%, Q1 50.2%
- **类型**: H
- **来源**: MCP fmp_data income quarterly (calculated)
- **日期**: 2026-03-30

### DM-FIN-018
- **值**: Revenue 5Y CAGR: FY2022→FY2026 = 16.4% ($4.46B→$8.19B)
- **类型**: H
- **来源**: MCP fmp_data income (calculated)
- **日期**: 2026-03-30

---

## Section B: 资产负债表锚点

### DM-FIN-020
- **值**: Total Assets $22.29B, Total Equity $14.31B, Total Debt $4.47B
- **类型**: H
- **来源**: MCP fmp_data balance FY2026
- **日期**: 2026-03-30

### DM-FIN-021
- **值**: Goodwill $11.06B (49.6% of total assets)
- **类型**: H
- **来源**: MCP fmp_data balance FY2026
- **日期**: 2026-03-30

### DM-FIN-022
- **值**: Intangible Assets $1.75B (down from $6.64B in FY2022 — amortization)
- **类型**: H
- **来源**: MCP fmp_data balance FY2026 vs FY2022
- **日期**: 2026-03-30

### DM-FIN-023
- **值**: Cash $2.64B, Net Debt $1.83B, Net Debt/EBITDA 0.70x
- **类型**: H
- **来源**: MCP fmp_data balance+key-metrics FY2026
- **日期**: 2026-03-30

### DM-FIN-024
- **值**: Current Ratio 2.01, Quick Ratio 1.58, Altman Z-Score 5.87
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-30

### DM-FIN-025
- **值**: Inventory $1.39B, DIO 126 days (vs FY2025 111d, FY2023 133d)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2026
- **日期**: 2026-03-30

### DM-FIN-026
- **值**: AR $2.19B, DSO 97 days (vs FY2025 65d — 大幅上升, 需调查)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2026
- **日期**: 2026-03-30

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: PE (TTM) 24.65x, Forward PE 17.4x
- **类型**: H
- **来源**: MCP analyze_stock + baggers_summary
- **日期**: 2026-03-30

### DM-VAL-002
- **值**: EV/EBITDA 15.7x, EV/Sales 8.1x, P/B 4.75x
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-30

### DM-VAL-003
- **值**: FCF Yield 2.17%, Dividend Yield 0.23%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-03-30

### DM-VAL-004
- **值**: FMP DCF Fair Value $22.37 vs 股价$94.88 (大幅高估?)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **注意**: FMP DCF通常过于保守，需独立验证
- **日期**: 2026-03-30

### DM-VAL-005
- **值**: ROIC 7.05%, ROE 19.3%, ROTCE 179% (商誉扭曲ROIC)
- **类型**: H
- **来源**: MCP baggers_summary+key-metrics
- **日期**: 2026-03-30

### DM-VAL-006
- **值**: Owner PE = Market Cap / (NI $2.67B - SBC $591M) = $68B / $2.08B = 32.7x
- **类型**: R
- **推理链**: GAAP NI包含SBC补贴，Owner PE剥离SBC反映真实股东回报
- **证伪条件**: 如果SBC>NI则Owner PE无意义(当前SBC/NI=22%，有效)
- **来源**: 计算(MCP数据)
- **日期**: 2026-03-30

### DM-VAL-007
- **值**: Core PE(剥离FY2026一次性$1.71B其他收入) ≈ Market Cap / (NI $2.67B - $1.71B非经营) = $68B / $0.96B = 70.8x
- **类型**: R
- **推理链**: FY2026 NI含$1.71B totalOtherIncomeExpensesNet(Q3含$1.86B异常项，可能Celestial AI/Infineon交易相关)，Core PE更反映经营能力
- **证伪条件**: 如果$1.71B是经常性收入则Core PE不适用
- **来源**: 计算(MCP income数据)
- **日期**: 2026-03-30

---

## Section D: 同行对比锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: 股价$94.88, 52周高$102.77/低$47.09, 2年区间高$125.64/低$49.27
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-30

### DM-MKT-002
- **值**: Beta 1.989 (高波动，几乎2倍市场波动)
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-03-30

### DM-MKT-003
- **值**: 同行PE对比: MRVL 30.9x | QCOM 25.6x | TSM 31.5x | NVDA 34.1x | AVGO 58.5x | AMD 77.4x | ADI 56.2x
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-03-30

### DM-MKT-004
- **值**: S&P 500: 6369 (-1.67%) | NASDAQ: 20948 (-2.15%) | VIX: 31.05 (+13.2%)
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-03-27

---

## Section E: 分析师共识+预测锚点 (DM-CON-xxx)

### DM-CON-001
- **值**: 分析师评级: 33 Buy / 11 Hold / 0 Sell, 共识"Strong Buy"
- **类型**: H
- **来源**: WebSearch Agent-A (MarketBeat/TipRanks)
- **日期**: 2026-03-30

### DM-CON-002
- **值**: 平均目标价$116-121, 区间$67-188
- **类型**: H
- **来源**: WebSearch Agent-A
- **日期**: 2026-03-30

### DM-CON-003
- **值**: Q1 FY2027 Guidance: Revenue $2.40B ±5%, Adj EPS $0.79 ±$0.05
- **类型**: H
- **来源**: WebSearch Agent-A (Marvell IR)
- **日期**: 2026-03-30

### DM-CON-004
- **值**: FY2028E Rev $14.86B, EPS $5.43 (FMP estimates, 28 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-30

### DM-CON-005
- **值**: FY2029E Rev $18.93B, EPS $7.42 (15 analysts)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-03-30

### DM-CON-006
- **值**: CEO: "Revenue growth to accelerate each quarter in FY2027", DC >25% growth FY2027, ~40% FY2028
- **类型**: H
- **来源**: WebSearch Agent-A (earnings call)
- **日期**: 2026-03-30

---

## Section F: 业务与竞争锚点 (DM-BIZ-xxx)

### DM-BIZ-001
- **值**: FY2026 Data Center Revenue ~$6.1B (73% of total)
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-03-30

### DM-BIZ-002
- **值**: Custom Silicon FY2026: ~$1.5B, 20+设计wins, 18 XPU sockets部署于前4大云厂商
- **类型**: H
- **来源**: WebSearch Agent-D (Marvell IR)
- **日期**: 2026-03-30

### DM-BIZ-003
- **值**: ASIC市场: AVGO ~60%份额, MRVL 13-15% (#2), Alchip崛起
- **类型**: H
- **来源**: WebSearch Agent-D (Counterpoint, TrendForce)
- **日期**: 2026-03-30

### DM-BIZ-004
- **值**: Optical DSP: "undisputed market leader" (Inphi遗产), Ara 1.6T PAM4获OFC创新奖
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-03-30

### DM-BIZ-005
- **值**: 地理收入: 中国~38%, 台湾~21%, 美国~$690M(偏小)
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-03-30

### DM-BIZ-006
- **值**: 关键客户: Amazon(Trainium), Microsoft(Maia), Google(Axion), 前4大hyperscaler均有设计wins
- **类型**: H
- **来源**: WebSearch Agent-D
- **日期**: 2026-03-30

### DM-BIZ-007
- **值**: ASIC TAM: $60-90B(2027), $100-130B(2030) — Broadcom CEO预测
- **类型**: R
- **推理链**: AVGO CEO利益相关方可能高估TAM
- **证伪条件**: 第三方(Gartner/IDC)估计显著低于$60B
- **来源**: WebSearch Agent-D
- **日期**: 2026-03-30

### DM-BIZ-008
- **值**: Celestial AI收购$3.25B, H2 FY2028开始贡献, $500M run rate Q4 FY2028, $1B Q4 FY2029
- **类型**: H
- **来源**: WebSearch Agent-C
- **日期**: 2026-03-30

### DM-BIZ-009
- **值**: Infineon汽车以太网出售$2.5B, $1.8B税前收益(Q3 FY2026)
- **类型**: H
- **来源**: WebSearch Agent-C
- **日期**: 2026-03-30

### DM-BIZ-010
- **值**: Amazon Trainium 3/4可能流失给Alchip(未确认), Microsoft Maia SerDes问题导致二次tape-out
- **类型**: R
- **推理链**: CNBC报道+分析师关注; JPMorgan确认管理层否认流失
- **证伪条件**: Amazon/Microsoft下季度设计wins公告
- **来源**: WebSearch Agent-A/C/D
- **日期**: 2026-03-30

---

## Section G: 管理层+治理锚点 (DM-MGT-xxx)

### DM-MGT-001
- **值**: CEO Matt Murphy: 2016加入, 前Maxim EVP, FY2025薪酬$32.2M
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-03-30

### DM-MGT-002
- **值**: CFO Willem Meintjes: 2023-01任命, 2016加入, 前Newport/IR Corp Controller
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-03-30

### DM-MGT-003
- **值**: COO Chris Koopmans升任President(2025-07), Raghib Hussain辞职(2025-05)
- **类型**: H
- **来源**: WebSearch Agent-E
- **日期**: 2026-03-30

### DM-MGT-004
- **值**: Insider ownership 1.09%, Institutional 78-84%
- **类型**: H
- **来源**: WebSearch Agent-E/F
- **日期**: 2026-03-30

---

## Section H: 聪明钱+做空锚点 (DM-SMT/OPT-xxx)

### DM-SMT-001
- **值**: UBS减仓28.5M股(-77.7%), Lazard减仓3.5M股(-54.3%) Q4 2025
- **类型**: H
- **来源**: WebSearch Agent-F
- **日期**: 2026-03-30

### DM-SMT-002
- **值**: 693机构增持 vs 759减持(最近季度, 净减持方向)
- **类型**: H
- **来源**: WebSearch Agent-F
- **日期**: 2026-03-30

### DM-SMT-003
- **值**: CEO Murphy卖出30K股@$98.70(Mar 26), CLO Casper卖出5K股@$93.08(Jan 7)
- **类型**: H
- **来源**: WebSearch Agent-F + MCP insider-trading
- **日期**: 2026-03-30

### DM-SMT-004
- **值**: CFO Meintjes买入3,400股(唯一买入信号)
- **类型**: H
- **来源**: WebSearch Agent-F
- **日期**: 2026-03-30

### DM-OPT-001
- **值**: Short Interest 32-38M股, 4.3-4.4% of float, DTC 2.14天(低于同行4.9%)
- **类型**: H
- **来源**: WebSearch Agent-G
- **日期**: 2026-03-30

### DM-OPT-002
- **值**: Put/Call Ratio 1.27(偏空), IV 55% vs HV 72%(HV>IV=期权偏便宜)
- **类型**: H
- **来源**: WebSearch Agent-G
- **日期**: 2026-03-30

---

## Section I: 预测市场锚点 (DM-PMK-xxx)

### DM-PMK-001
- **值**: Polymarket "US recession by end 2026": 31%
- **类型**: H
- **来源**: WebSearch Agent-B (Polymarket)
- **日期**: 2026-03-30

### DM-PMK-002
- **值**: Polymarket "China invade Taiwan before 2027": 3.6% Yes / 96.4% No
- **类型**: H
- **来源**: WebSearch Agent-B (Polymarket)
- **日期**: 2026-03-30

### DM-PMK-003
- **值**: Polymarket "China blockade Taiwan by June 30": 6.5% Yes
- **类型**: H
- **来源**: WebSearch Agent-B (Polymarket)
- **日期**: 2026-03-30

---

## Section J: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 47 | 85% |
| R (合理推断) | 7 | 13% |
| S (主观判断) | 1 | 2% |
| **总计** | **55** | **100%** |

---

## Section K: 关键发现预览 (Phase 1-4追加)

### 初步异常信号 (已补强)
1. **DSO Q4暴增**: AR $2.19B(+$641M单季), DSO 90天(Q3仅68天)——主因: Q4末大量发货+hyperscaler长付款周期(60-90天)。**监控**: Q1 FY27 OCF是否>$500M+AR回落至$1.6-1.8B [DM-FIN-026补强]
2. **GAAP vs Non-GAAP巨大鸿沟**: Non-GAAP OPM 35.3% vs GAAP 16.1%(差19pp)。主因: $942M/yr收购无形资产摊销+$591M SBC。Non-GAAP是正确经营镜头。Infineon出售$1.83B一次性收益扭曲Q3 [DM-VAL-007补强]
3. **ROIC仅7%**: $11B商誉(49%总资产)是Inphi($10B)+Cavium($6B)收购遗产。ROTCE 179%是真实资本效率。商誉无减值风险(DCF>carrying value)但未来收购可能重复此模式(Celestial AI $3.25B) [DM-VAL-005补强]
4. **Custom Silicon GM稀释**: Non-GAAP GM从Q2 FY25 61.9%降至Q4 FY26 59.0%。管理层确认custom silicon毛利率低于标准产品，但OPM accretive(NRE抵消+低销售成本)。随custom从25%→40%+ DC收入，GM可能降至56-57% [新增DM-BIZ-011]
5. **增长100%有机**: FY2026 +42%全部有机(Celestial AI/XConn均在FY26年末后才close)。Infineon汽车剥离后pro-forma有机增速实际+47% [新增DM-FIN-019]

---

## Section L: 补强数据锚点 (Phase 0.5, 2026-03-30)

### DM-FIN-019
- **值**: FY2026有机增速+47%(pro-forma剥离汽车后), 100%有机(无并购贡献)
- **类型**: H
- **来源**: 10-K + earnings call确认Celestial/XConn均FY26后close
- **日期**: 2026-03-30

### DM-BIZ-011
- **值**: Non-GAAP GM趋势: Q2 FY25 61.9% → Q4 FY26 59.0%, custom silicon GM低于标准产品, 管理层确认OPM accretive
- **类型**: H/R
- **推理链**: custom silicon占DC比重从~15%→25%→FY28 40%+, GM稀释约2-3pp/年
- **证伪条件**: 如果GM稳定在59%+同时custom silicon增长，说明NRE/attach chips补偿了GM稀释
- **来源**: earnings call + 管理层commentary
- **日期**: 2026-03-30

### DM-BIZ-012
- **值**: DC季度收入: Q1 $1,441M(+76%) → Q2 $1,491M(+69%) → Q3 $1,518M(+38%) → Q4 $1,651M(+21%)
- **类型**: H
- **来源**: Marvell IR quarterly results
- **日期**: 2026-03-30

### DM-BIZ-013
- **值**: Custom silicon pipeline: 18 active programs, $75B lifetime revenue, >50 new opportunities beyond active
- **类型**: H
- **来源**: earnings call FY2026 Q4
- **日期**: 2026-03-30

### DM-BIZ-014
- **值**: Optical DSP/interconnect FY27指引: >50% YoY增长。1.6T PAM4进入量产Q4 FY26
- **类型**: H
- **来源**: earnings call guidance
- **日期**: 2026-03-30

### DM-VAL-008
- **值**: Non-GAAP metrics: GM 59.5%, OPM 35.3%, EPS $2.84. GAAP-Non-GAAP gap主因: $942M无形摊销+$591M SBC
- **类型**: H
- **来源**: Marvell FY2026 earnings press release + 10-K reconciliation
- **日期**: 2026-03-30

### DM-MKT-005
- **值**: AVGO对比: Revenue $63.9B(8x MRVL), GAAP GM 67.8%(+17pp), AI Rev $8.4B/Q(~5.6x MRVL annual), Non-GAAP OPM ~60%(+25pp)
- **类型**: H
- **来源**: MCP fmp_data AVGO income + WebSearch
- **日期**: 2026-03-30

### DM-CON-007
- **值**: FY27指引: Rev ~$11B(+30%+), Q4 exit rate >$3B, DC +40%, custom silicon >20%, optical >50%
- **类型**: H
- **来源**: FY2026 Q4 earnings call guidance
- **日期**: 2026-03-30

---

## Section M: Phase 3竞争/AI锚点 (DM-P3-xxx)

### DM-P3-001
- **值**: Credo Bluebird 1.6T DSP, 3nm, sub-20W, Sep 2025发布; Cardinal 2nd-gen 2026
- **类型**: H
- **来源**: Credo IR press release
- **日期**: 2026-03-30

### DM-P3-002
- **值**: Marvell Ara 1.6T批量出货中(mass volume shipping), 2025
- **类型**: H
- **来源**: Marvell IR press release Mar 2026
- **日期**: 2026-03-30

### DM-P3-003
- **值**: Marvell PAM4 DSP市占率60-80%(50-100G/lane), 20-30%(400G/800G模块)
- **类型**: R
- **推理链**: Inphi历史垄断+代际锁定→但高速率(1.6T)份额尚未确立
- **来源**: 多源估算(Futurum/Klover AI)
- **日期**: 2026-03-30

### DM-P3-004
- **值**: Broadcom >50,000 Tomahawk 5-Bailly CPO交换芯片已出货(2025)
- **类型**: H
- **来源**: Siemens CPO Trends 2026
- **日期**: 2026-03-30

### DM-P3-005
- **值**: Alchip赢得Trainium 3 bakeoff vs MRVL; MRVL Trn2 RDL interposer执行不佳, Alchip介入救场
- **类型**: R
- **推理链**: SemiAnalysis一手工程细节+Global Tech Research交叉验证
- **证伪条件**: MRVL/Amazon官方否认+提供替代证据
- **来源**: SemiAnalysis, Global Tech Research
- **日期**: 2026-03-30

### DM-P3-006
- **值**: Trainium 3前端PCIe SerDes来自Synopsys(非MRVL), MRVL content极少
- **类型**: R
- **推理链**: SemiAnalysis详细芯片架构分析
- **证伪条件**: MRVL披露Trn3 SerDes IP来源
- **来源**: SemiAnalysis
- **日期**: 2026-03-30

### DM-P3-009
- **值**: Synopsys 224G SerDes在N5/N3E/N3P production-ready, 29.7%接口IP市占率
- **类型**: H
- **来源**: Synopsys, Electronics Weekly
- **日期**: 2026-03-30

### DM-P3-011
- **值**: Alchip FY2025 Rev $992M(-37% YoY hiccup), 78%北美, 83% HPC/AI, 3nm active, 2nm开发中
- **类型**: H
- **来源**: Alchip IR Q4 FY2025 results (GlobeNewsWire)
- **日期**: 2026-03-30

### DM-P3-012
- **值**: AVGO 6年财务: FY2020 Rev$23.9B GM56.6% OPM16.8% → FY2025 Rev$63.9B GM67.8% OPM39.9%
- **类型**: H
- **来源**: FMP income data
- **日期**: 2026-03-30

### DM-P3-014
- **值**: Counterpoint: MRVL ASIC份额从~35%(FY2025)→~8%(FY2027), TAM膨胀+Amazon流失
- **类型**: R
- **推理链**: 份额下降≠收入下降(TAM从$13B→$150B+)
- **来源**: Counterpoint Research Jan 2026
- **日期**: 2026-03-30

### DM-P3-015
- **值**: AI ASIC市场$13B(2024)→$150B+(2030), ~50% CAGR
- **类型**: R
- **来源**: Counterpoint, Bloomberg Intelligence
- **日期**: 2026-03-30

### DM-P3-016
- **值**: Trainium 4 (Maverick) = Annapurna+Alchip设计, 量产目标Q4 2027
- **类型**: R
- **来源**: SemiAnalysis, Global Tech Research
- **日期**: 2026-03-30

### DM-P3-020
- **值**: Maia 300: 升级2nm+HBM4, 初始300-400K颗, 扩展至1.5M/yr, ASP ~$8K, MRVL为主要co-designer
- **类型**: R
- **推理链**: 分析师估计MRVL收入$2.4B(全芯片ASP)但实际MRVL可能只收设计费+royalty($0.5-0.7B)
- **来源**: Techi, GuruFocus, analyst estimates
- **日期**: 2026-03-30

### DM-P3-027
- **值**: 2026 hyperscaler AI CapEx $600-690B (+36-67% YoY), ~75% AI-related (~$450B)
- **类型**: R
- **来源**: Goldman Sachs, CNBC, Futurum, IEEE ComSoc
- **日期**: 2026-03-30

### DM-P3-030
- **值**: Omdia: AI数据中心芯片市场增速可能在2026达峰, 绝对值至$286B(2030)
- **类型**: R
- **来源**: Omdia Aug 2025
- **日期**: 2026-03-30

### DM-P3-032
- **值**: Insider A/D ratio <0.70连续5+季度, 零open-market purchase in Q1/Q4 2025 & Q1 2026
- **类型**: H
- **来源**: Benzinga, MarketBeat insider trades
- **日期**: 2026-03-30

### DM-P3-033
- **值**: ASIC增速44.6% vs GPU增速16.1%(2026年), ASIC in inference占37%部署份额
- **类型**: R
- **来源**: TrendForce
- **日期**: 2026-03-30

### DM-P3-035
- **值**: CPO市场$95M(2025)→$1,055M(2034), CAGR 30.66%; CPO端口>18M(2029)
- **类型**: R
- **来源**: Precedence Research
- **日期**: 2026-03-30

---

## Section J更新: 锚点汇总统计 (Phase 3后)

| 类型 | P0-P2 | P3新增 | 合计 | 占比 |
|------|-------|--------|------|------|
| H (硬数据) | 55 | 18 | 73 | 76% |
| R (合理推断) | 9 | 18 | 27 | 28% |
| S (主观判断) | 1 | 0 | 1 | 1% |
| **总计** | **65** | **36** | **101** | **100%** |

注: P3新增DM锚点完整列表见 `MRVL_Deep_Dive_Phase3.md` Ch7.4。上方仅选录Phase 4+需要引用的关键锚点。
