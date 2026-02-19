# AMZN Phase 0 共享上下文 (DM锚点格式)
## 编译时间: 2026-02-18
## 数据预取版本: v4.0 (简化版 — MCP+WebSearch, 无Python模型)

---

## Section A: 财务数据锚点 (DM-FIN-xxx)

### DM-FIN-001
- **值**: FY2025 Revenue $716.9B
- **类型**: H
- **来源**: MCP baggers_summary FY2025
- **日期**: 2026-02-18
- **用于**: Ch02, Ch14 Reverse DCF

### DM-FIN-002
- **值**: FY2025 Net Income $77.7B
- **类型**: H
- **来源**: MCP baggers_summary FY2025
- **日期**: 2026-02-18
- **用于**: Ch02, P/E计算

### DM-FIN-003
- **值**: FY2025 Operating Cash Flow $139.5B
- **类型**: H
- **来源**: MCP baggers_summary FY2025
- **日期**: 2026-02-18
- **用于**: Ch02, FCF计算, CapEx/OCF比率

### DM-FIN-004
- **值**: FY2025 CapEx $131.8B (含lease)
- **类型**: H
- **来源**: MCP baggers_summary FY2025
- **日期**: 2026-02-18
- **用于**: Ch02, CapEx传导分析

### DM-FIN-005
- **值**: FY2025 Free Cash Flow $7.7B
- **类型**: H
- **来源**: MCP baggers_summary FY2025 (OCF $139.5B - CapEx $131.8B)
- **日期**: 2026-02-18
- **用于**: Ch02, FCF Yield, 估值基础

### DM-FIN-006
- **值**: FY2025 CapEx/OCF = 94.5%
- **类型**: H
- **来源**: 计算 DM-FIN-004/DM-FIN-003
- **日期**: 2026-02-18
- **用于**: Ch承重墙, CapEx轨迹分析

### DM-FIN-007
- **值**: FY2025 Operating Margin 11.2%
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-18
- **用于**: Ch02, 同业对比

### DM-FIN-008
- **值**: FY2025 Gross Margin 49.3%
- **类型**: H
- **来源**: MCP fmp_data ratios
- **日期**: 2026-02-18
- **用于**: Ch02

### DM-FIN-009
- **值**: FY2025 SBC $19.5B
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-18
- **用于**: Ch02, 真实FCF调整

### DM-FIN-010
- **值**: FY2025 D&A $65.8B
- **类型**: H
- **来源**: MCP baggers_summary
- **日期**: 2026-02-18
- **用于**: EBITDA计算

### DM-FIN-011
- **值**: CapEx轨迹: $52.7B(FY2023) → $83.0B(FY2024) → $131.8B(FY2025)
- **类型**: H
- **来源**: MCP baggers_summary 多年
- **日期**: 2026-02-18
- **用于**: CapEx加速分析, 承重墙

### DM-FIN-012
- **值**: ROIC (TTM) 16.99%
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-02-18
- **用于**: CapEx回报验证

### DM-FIN-013
- **值**: FY2025 EBITDA $155.3B (Operating Income $80.1B + D&A $65.8B + SBC $19.5B adj.)
- **类型**: R
- **推理链**: Operating Income + D&A, SBC单列
- **证伪条件**: 10-K正式EBITDA调节表
- **来源**: 计算 DM-FIN-007 * DM-FIN-001 + DM-FIN-010
- **日期**: 2026-02-18
- **用于**: EV/EBITDA计算

---

## Section B: 估值数据锚点 (DM-VAL-xxx)

### DM-VAL-001
- **值**: P/E (TTM) 27.8x
- **类型**: H
- **来源**: MCP fmp_data quote ($201.15 / EPS ~$7.24)
- **日期**: 2026-02-18
- **用于**: Ch14 估值对比

### DM-VAL-002
- **值**: EV/EBITDA (TTM) 15.4x
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-02-18
- **用于**: Ch14 估值对比

### DM-VAL-003
- **值**: P/FCF (TTM) ~280x
- **类型**: H
- **来源**: 计算 Market Cap $2,159B / FCF $7.7B
- **日期**: 2026-02-18
- **用于**: Ch14, FCF估值异常

### DM-VAL-004
- **值**: FCF Yield 0.34%
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-02-18
- **用于**: Ch14, 投资回报率

### DM-VAL-005
- **值**: Price/Sales (TTM) 3.0x
- **类型**: H
- **来源**: MCP fmp_data ratios
- **日期**: 2026-02-18
- **用于**: Ch14 估值对比

### DM-VAL-006
- **值**: 5年平均P/E 44x vs 当前28x
- **类型**: H
- **来源**: WebSearch Agent-D1 (Motley Fool)
- **日期**: 2026-02-18
- **用于**: 历史估值对比

### DM-VAL-007
- **值**: Morningstar Fair Value $277.00
- **类型**: H
- **来源**: WebSearch Agent-D5 (Morningstar)
- **日期**: 2026-02-18
- **用于**: 外部估值锚点

### DM-VAL-008
- **值**: Alpha Spread DCF $180.76 (高估9%)
- **类型**: H
- **来源**: WebSearch Agent-D1 (Alpha Spread)
- **日期**: 2026-02-18
- **用于**: 外部估值锚点(保守端)

---

## Section C: 市场与共识锚点 (DM-MKT/CON-xxx)

### DM-MKT-001
- **值**: 当前股价 $201.15
- **类型**: H
- **来源**: MCP fmp_data quote
- **日期**: 2026-02-18
- **用于**: 全文引用

### DM-MKT-002
- **值**: 市值 $2,159B
- **类型**: H
- **来源**: MCP fmp_data quote (10.73B shares × $201.15)
- **日期**: 2026-02-18
- **用于**: 全文引用, 期望回报计算

### DM-MKT-003
- **值**: EV ~$2,225B
- **类型**: H
- **来源**: MCP fmp_data key-metrics
- **日期**: 2026-02-18
- **用于**: EV基础估值

### DM-CON-001
- **值**: 分析师共识评级 Strong Buy (44-56 analysts)
- **类型**: H
- **来源**: WebSearch Agent-D4
- **日期**: 2026-02-18
- **用于**: Ch13 共识分析

### DM-CON-002
- **值**: 平均目标价 $287-297
- **类型**: H
- **来源**: WebSearch Agent-D4 (MarketBeat/TipRanks/StockAnalysis)
- **日期**: 2026-02-18
- **用于**: Ch13 共识分析

### DM-CON-003
- **值**: 目标价区间 $175-$325
- **类型**: H
- **来源**: WebSearch Agent-D4
- **日期**: 2026-02-18
- **用于**: Ch13 分歧度量化

### DM-CON-004
- **值**: Q4 2025 Revenue $213.4B (+12% YoY), EPS $1.95 (miss $1.97)
- **类型**: H
- **来源**: WebSearch Agent-D4 (CNBC Q4 earnings)
- **日期**: 2026-02-18
- **用于**: Ch02 最新季度

### DM-CON-005
- **值**: Q1 2026 Revenue指引 $173.5-178.5B
- **类型**: H
- **来源**: WebSearch Agent-D4 (earnings report)
- **日期**: 2026-02-18
- **用于**: Ch02 前瞻指引

### DM-CON-006
- **值**: 2026 CapEx指引 $200B (vs 分析师预期 $146.6B, +36%超预期)
- **类型**: H
- **来源**: WebSearch Agent-D4 (CNBC/Tickeron)
- **日期**: 2026-02-18
- **用于**: 承重墙核心, CapEx传导

---

## Section D: 业务与竞争锚点 (DM-BIZ-xxx)

### DM-BIZ-001
- **值**: AWS Q4 2025 Revenue $35.58B (+24% YoY), 年化$142B
- **类型**: H
- **来源**: WebSearch Agent-D4 (Q4 earnings)
- **日期**: 2026-02-18
- **用于**: AWS估值, SOTP

### DM-BIZ-002
- **值**: AWS市占率: 33%(2021) → 30%(Q2 2025) → 29%(Q3 2025)
- **类型**: H
- **来源**: WebSearch Agent-D2 (Synergy Research/The Register)
- **日期**: 2026-02-18
- **用于**: AWS竞争力评估, 承重墙

### DM-BIZ-003
- **值**: 云增速对比: AWS 20-24% / Azure 39% / GCP 36%
- **类型**: H
- **来源**: WebSearch Agent-D2
- **日期**: 2026-02-18
- **用于**: AWS竞争力评估

### DM-BIZ-004
- **值**: AWS 2025年运营利润 $45.6B (vs GCP $13.9B)
- **类型**: H
- **来源**: WebSearch Agent-D2 (Motley Fool/Jassy quote)
- **日期**: 2026-02-18
- **用于**: AWS利润率优势量化

### DM-BIZ-005
- **值**: AWS订单积压 $244B (+40% YoY, +22% QoQ)
- **类型**: H
- **来源**: WebSearch Agent-D5 (Futurum Group)
- **日期**: 2026-02-18
- **用于**: AWS增长确定性

### DM-BIZ-006
- **值**: Amazon美国电商市占率 37.6% (vs 2021高位41.8%)
- **类型**: H
- **来源**: WebSearch Agent-D3 (Demandsage/eMarketer)
- **日期**: 2026-02-18
- **用于**: 零售竞争力

### DM-BIZ-007
- **值**: 广告业务 Q4 2025 Revenue $21.32B
- **类型**: H
- **来源**: WebSearch Agent-D4 (Q4 earnings)
- **日期**: 2026-02-18
- **用于**: SOTP广告分部估值

### DM-BIZ-008
- **值**: Temu 3P销售预计 $30B(+60% YoY)
- **类型**: H
- **来源**: WebSearch Agent-D2 (Yahoo Finance)
- **日期**: 2026-02-18
- **用于**: 零售竞争压力

### DM-BIZ-009
- **值**: 超大规模商2026年CapEx总额 $660-690B (YoY +73-83%), Amazon $200B为最高
- **类型**: H
- **来源**: WebSearch Agent-D3 (Futurum/Goldman Sachs)
- **日期**: 2026-02-18
- **用于**: CapEx行业对比

### DM-BIZ-010
- **值**: AWS自定义芯片(Graviton+Trainium) $10B年化run rate, 三位数增长
- **类型**: H
- **来源**: WebSearch Agent-D2 (Motley Fool, Jassy earnings call)
- **日期**: 2026-02-18
- **用于**: AI竞争力差异化

### DM-BIZ-011
- **值**: GenAI云服务增速 140-180% YoY (Q2 2025)
- **类型**: H
- **来源**: WebSearch Agent-D3
- **日期**: 2026-02-18
- **用于**: AI增长潜力量化

---

## Section E: Smart Money锚点 (DM-SMT-xxx)

### DM-SMT-001
- **值**: Berkshire Hathaway Q4 2025减持AMZN 75% (1000万→250万股)
- **类型**: H
- **来源**: WebSearch Agent-D4 (Bloomberg/Benzinga 2026-02-17)
- **日期**: 2026-02-18
- **用于**: 聪明钱信号

### DM-SMT-002
- **值**: Bill Ackman (Pershing Square) 2025上半年大举建仓AMZN
- **类型**: H
- **来源**: WebSearch Agent-D4 (Motley Fool)
- **日期**: 2026-02-18
- **用于**: 聪明钱信号(对冲)

---

## Section F: 推断与判断锚点 (DM-INF/SUB-xxx)

### DM-INF-001
- **值**: 2026E CapEx/OCF可能超过100%(若CapEx $200B, OCF增速<43%)
- **类型**: R
- **推理链**: FY2025 OCF $139.5B, 需增至$200B+(43%+增长)才能覆盖CapEx → 历史OCF增速~15-20% → 大概率FCF为负
- **证伪条件**: FY2026 OCF>$200B (需要45%+增长, 历史无先例)
- **来源**: DM-FIN-003 + DM-CON-006 推导
- **日期**: 2026-02-18
- **用于**: 承重墙 #1

### DM-INF-002
- **值**: AWS独立估值 ~$850B-$1,100B (占AMZN总市值40-50%)
- **类型**: R
- **推理链**: AWS年化$142B收入, 34%运营利润率 → 运营利润$48B → 20-23x EV/EBIT for high-growth cloud
- **证伪条件**: AWS增速降至<15%或利润率压缩至<25%
- **来源**: DM-BIZ-001 + DM-BIZ-004 + 市场倍数推导
- **日期**: 2026-02-18
- **用于**: SOTP核心分部

### DM-INF-003
- **值**: 非AWS业务(零售+广告+其他)隐含估值 ~$1,050B-$1,300B
- **类型**: R
- **推理链**: 总市值$2,159B - AWS $850-1,100B = $1,050-1,300B → 零售+广告合计收入~$575B → P/S 1.8-2.3x
- **证伪条件**: 零售利润率扩张至>5%或广告增速降至<15%
- **来源**: DM-MKT-002 - DM-INF-002 推导
- **日期**: 2026-02-18
- **用于**: SOTP残差估值

### DM-SUB-001
- **值**: 可能性宽度评估: 4.2/10 → 混合模式
- **类型**: S
- **依据**: 成熟多分部(3/10) + 收入可预测(3/10) + 竞争动态活跃(5/10) + 监管风险(5/10) + 技术破坏中等(5/10)
- **来源**: Phase 0定性评估
- **日期**: 2026-02-18
- **用于**: 框架类型选择

---

## Section G: 锚点汇总统计

| 类型 | 数量 | 占比 |
|------|------|------|
| H (硬数据) | 35 | 80% |
| R (合理推断) | 5 | 11% |
| S (主观判断) | 1 | 2% |
| **总计** | **41** | **100%** |

---

## Section H: 同业对比数据

| 指标 | AMZN | MSFT | GOOG | META | AAPL |
|------|------|------|------|------|------|
| Market Cap | $2,159B | $2,790B | $2,105B | $1,760B | $3,473B |
| P/E (TTM) | 27.8x | 30.1x | 20.3x | 24.1x | 31.4x |
| Operating Margin | 11.2% | 45.6% | 31.6% | 41.4% | 33.8% |
| Revenue Growth | 11% | 16% | 14% | 22% | 4% |
| FCF Yield | 0.34% | 2.1% | 4.8% | 3.2% | 3.5% |

*来源: MCP compare_stocks, 2026-02-18*

---

## Section I: Phase 1-5关键发现 (Phase推进时追加)

[Phase推进时追加]
