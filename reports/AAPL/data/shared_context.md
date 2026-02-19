# AAPL Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-19
## 数据预取版本: v4.0
## 可能性宽度: 2.6 → 传统框架 + AR1条件估值中心

> 本文件为全Phase并行Agent的统一数据输入。每个数据点以DM锚点格式标注，
> 分析中直接引用DM-ID即可，无需重新标注来源。
> **CCC统一基准**: FMP口径(含非贸易应收), CCC=-42天

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $416.2B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-002
- **值**: FY2025 Net Income $112.0B
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-003
- **值**: FY2025 Gross Margin 46.9%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-004
- **值**: FY2025 Operating Margin 31.5%
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-005
- **值**: FY2025 EPS (diluted) $7.46
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-006
- **值**: FY2025 FCF $98.8B (OCF $111.5B - CapEx $12.7B)
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-19

### DM-FIN-007
- **值**: FY2025 SBC $12.9B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-19

### DM-FIN-008
- **值**: FY2025 Share Buyback $90.7B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-19

### DM-FIN-009
- **值**: FY2025 Dividend $15.4B
- **类型**: H
- **来源**: MCP fmp_data cashflow FY2025
- **日期**: 2026-02-19

### DM-FIN-010
- **值**: Q1 FY2026 Revenue $143.76B (+15.7% YoY)
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026
- **日期**: 2026-02-19

### DM-FIN-011
- **值**: Q1 FY2026 Net Income $42.1B | EPS $2.84
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026
- **日期**: 2026-02-19

### DM-FIN-012
- **值**: Q1 FY2026 Gross Margin 48.1%
- **类型**: H
- **来源**: MCP fmp_data income Q1 FY2026
- **日期**: 2026-02-19

### DM-FIN-013
- **值**: TTM Revenue $435.6B | TTM EPS $7.91 | TTM Net Income $117.8B
- **类型**: H
- **来源**: MCP fmp_data income 4Q sum
- **日期**: 2026-02-19

### DM-FIN-014
- **值**: FY2025 iPhone Revenue $209.6B (50.4%)
- **类型**: H
- **来源**: MCP fmp_data income segmented
- **日期**: 2026-02-19

### DM-FIN-015
- **值**: FY2025 Services Revenue $109.2B (26.2%)
- **类型**: H
- **来源**: MCP fmp_data income segmented
- **日期**: 2026-02-19

### DM-FIN-016
- **值**: FY2025 Wearables $35.7B (8.6%) | Mac $33.7B (8.1%) | iPad $28.0B (6.7%)
- **类型**: H
- **来源**: MCP fmp_data income segmented
- **日期**: 2026-02-19

### DM-FIN-017
- **值**: Services 3Y CAGR +11.8% | iPhone 3Y CAGR +0.7%
- **类型**: H
- **来源**: 计算 (FY2022-FY2025)
- **日期**: 2026-02-19

### DM-FIN-018
- **值**: FY2025 R&D $31.4B (R&D/Gross Profit = 18.0%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-019
- **值**: FY2025 SGA $26.6B (SGA/Revenue = 6.4%)
- **类型**: H
- **来源**: MCP fmp_data income FY2025
- **日期**: 2026-02-19

### DM-FIN-020 (CCC统一基准)
- **值**: CCC = -42天 (DSO 64天 + DIO 9天 - DPO 115天)
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025 (FMP口径, 含非贸易应收)
- **日期**: 2026-02-19
- **注意**: Baggers给出-83天(仅用贸易AR), 差异41天。全文统一用FMP -42天

---

## Section B: 资产负债表锚点 (DM-BAL-xxx)

### DM-BAL-001
- **值**: FY2025 Total Cash & Investments $132.4B (Cash $35.9B + ST $18.8B + LT $77.7B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-19

### DM-BAL-002
- **值**: FY2025 Total Debt $112.4B | Net Debt $76.4B
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-19

### DM-BAL-003
- **值**: FY2025 Shareholders' Equity $73.7B (负留存收益-$14.3B)
- **类型**: H
- **来源**: MCP fmp_data balance FY2025
- **日期**: 2026-02-19

### DM-BAL-004
- **值**: Current Ratio 0.89 | Debt/EBITDA 0.86x | Interest Coverage 46.1x
- **类型**: H
- **来源**: MCP fmp_data ratios FY2025
- **日期**: 2026-02-19

---

## Section C: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: P/E TTM 33.46x | Forward P/E 28.47x
- **类型**: H
- **来源**: MCP analyze_stock AAPL
- **日期**: 2026-02-19

### DM-VAL-002
- **值**: EV/EBITDA 25.1x
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: 2026-02-19

### DM-VAL-003
- **值**: P/S 8.61x | EV/Revenue 8.8x
- **类型**: H
- **来源**: MCP fmp_data ratios TTM
- **日期**: 2026-02-19

### DM-VAL-004
- **值**: FCF Yield 3.3% | Dividend Yield 0.37%
- **类型**: H
- **来源**: MCP fmp_data key-metrics TTM
- **日期**: 2026-02-19

### DM-VAL-005
- **值**: FMP DCF Fair Value $150.28 (vs 市价$264.35 → 溢价75.8%)
- **类型**: H
- **来源**: MCP fmp_data dcf
- **日期**: 2026-02-19

### DM-VAL-006
- **值**: ROIC 518% | ROE 162% | ROA 31.7%
- **类型**: H
- **来源**: MCP fmp_data key-metrics FY2025
- **日期**: 2026-02-19

### DM-VAL-007
- **值**: P/E 10年均值 23.78x → 当前溢价 +40.7%
- **类型**: R
- **推理链**: 当前33.46x vs 历史10年均值23.78x = 溢价9.68x / 23.78x = 40.7%
- **证伪条件**: 如果P/E持续>30x超过3年，则"均值回归"假设不成立
- **来源**: lit_recon_memo D1 (AAII data)
- **日期**: 2026-02-19

### DM-VAL-008
- **值**: 同行P/E比较: AAPL 33.46x vs MSFT 32.06x vs GOOGL 22.52x vs META 24.88x vs AMZN 30.27x → 同行均值27.30x → AAPL溢价+22.6%
- **类型**: H
- **来源**: MCP compare_stocks
- **日期**: 2026-02-19

---

## Section D: 市场数据锚点 (DM-MKT-xxx)

### DM-MKT-001
- **值**: AAPL股价 $264.35 | 52周 $169.21-$288.62
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-19

### DM-MKT-002
- **值**: Market Cap $3.82T | Shares Outstanding 14,440M
- **类型**: H
- **来源**: MCP analyze_stock
- **日期**: 2026-02-19

### DM-MKT-003
- **值**: S&P 500 6,129 | CAPE 40.01 (98th pctl) | VIX 14.7 | 10Y 4.48%
- **类型**: H
- **来源**: MCP get_market_overview
- **日期**: 2026-02-19

### DM-MKT-004
- **值**: Buffett Indicator 195.7% (极端区域)
- **类型**: H
- **来源**: MCP baggers_summary macro
- **日期**: 2026-02-19

---

## Section E: 共识预测锚点 (DM-CON-xxx)

### DM-CON-001
- **值**: FY2027E Revenue $493.4B | EPS $9.29 (31分析师)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-19

### DM-CON-002
- **值**: FY2028E Revenue $521.8B | EPS $10.25 (17分析师)
- **类型**: H
- **来源**: MCP fmp_data estimates
- **日期**: 2026-02-19

### DM-CON-003
- **值**: 股份年缩减率 -1.63% | 3年累计 -6.54%
- **类型**: H
- **来源**: MCP fmp_data key-metrics计算
- **日期**: 2026-02-19

---

## Section F: 推断锚点 (DM-INF-xxx)

### DM-INF-001
- **值**: 市场隐含永续FCFF CAGR ~6.35% vs 5年实际FCFF CAGR ~1.5%
- **类型**: R
- **推理链**: FMP DCF $150.28 vs $264.35 → 溢价75.8% → 需FCFF加速~4x
- **证伪条件**: 如果FY2026 FCFF>$115B(+16%), 加速趋势开始验证
- **来源**: v2.0 Reverse DCF + prefetch_data计算
- **日期**: 2026-02-19

### DM-INF-002
- **值**: P/E 40.7%溢价分解假设: 生态系统~15% + AI期权~12% + 回购增厚~8% + 利率/风险偏好~5%
- **类型**: R
- **推理链**: 40.7%溢价需逐项分解验证(Guide Prompt种子4)
- **证伪条件**: 如果AI期权溢价占>50%且仅1Q数据支撑, 估值脆弱
- **来源**: aapl_guide_prompt种子4分析框架
- **日期**: 2026-02-19

### DM-INF-003
- **值**: Services ARPU从$43→$46 (3年CAGR仅+2.3%), 增长靠设备基数驱动
- **类型**: R
- **推理链**: Services $109.2B / ~24亿活跃设备 = ARPU ~$46, vs 3年前~$43
- **证伪条件**: 如果ARPU增速>5%, 则深度驱动假设成立
- **来源**: v2.0 Agent A发现 + aapl_guide_prompt种子1
- **日期**: 2026-02-19

---

## Section G: 主观判断锚点 (DM-SUB-xxx)

### DM-SUB-001
- **值**: Apple CapEx/OCF 11.4% — 科技巨头中最低(MSFT 47.4%/GOOGL 55.5%/META 60.2%)
- **类型**: S
- **依据**: "轻资本AI策略"——外采基础模型而非自建GPU集群
- **来源**: v2.0 Agent A + prefetch_data计算
- **日期**: 2026-02-19

### DM-SUB-002
- **值**: Google搜索协议是Apple最脆弱承重墙
- **类型**: S
- **依据**: $20B+/年收入 + DOJ反垄断 + AI搜索替代三重风险叠加
- **来源**: lit_recon_memo D2/D4 + aapl_guide_prompt种子3
- **日期**: 2026-02-19

---

## Section H: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 32 | 74.4% |
| R (合理推断) | 8 | 18.6% |
| S (主观判断) | 3 | 7.0% |
| **总计** | **43** | **100%** |

> H占比74.4% > 50%目标 ✅
> WebSearch Agent数据(DM-CON/PMK/BIZ/MGT/SMT/OPT)待Agent返回后补充

---

## Section I: 7个CQ + 4个KS (参考框架)

### 核心问题 (CQ)
| CQ# | 问题 | 权重 | 初始置信度 |
|:---:|------|:----:|:---------:|
| CQ-1 | AI能否驱动iPhone超级换机周期? | 25% | 待定 |
| CQ-2 | Google协议终止对Services利润影响? | 15% | 待定 |
| CQ-3 | Services能否通过AI货币化维持12-15%增速? | 15% | 待定 |
| CQ-4 | 中国三重风险综合压缩幅度? | 10% | 待定 |
| CQ-5 | 33x PE能否被EPS增长支撑? | 20% | 待定 |
| CQ-6 | 轻资本AI战略长期可持续性? | 10% | 待定 |
| CQ-7 | App Store反垄断佣金侵蚀幅度? | 5% | 待定 |

### Kill Switches (KS)
| KS# | 触发条件 |
|:---:|---------|
| KS-1 | 中国iPhone收入连续2季YoY下降>10% |
| KS-2 | Google搜索协议被终止且无替代收入 |
| KS-3 | Services增速降至<8%持续两季 |
| KS-4 | Apple Intelligence用户采用率<5%(发布12月后) |

---

## Section J: Phase 1-4关键发现 (传统格式)

> 此区域在Phase 0初始生成时为空，随Phase推进由各Phase完成时追加。

[Phase推进时追加]
