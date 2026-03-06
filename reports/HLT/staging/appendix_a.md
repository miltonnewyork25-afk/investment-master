# 附录A: 数据可信度注册表 (DM Anchor Registry)

> 数据截止: 2026-03-06 | 注册表版本: v4.0 | 标的: Hilton Worldwide Holdings Inc. (HLT)

---

## A.1 锚点统计

**总锚点数量**: 78

### 按类型分布

| 类型 | 含义 | 数量 | 占比 |
|:----:|------|:----:|:----:|
| **H** | 硬数据 (Hard — 公开财报/SEC文件/MCP工具直取) | 62 | 79.5% |
| **R** | 合理推断 (Reasoned — 交叉推导/公式计算/引导性来源) | 12 | 15.4% |
| **S** | 软数据 (Soft — 二手分析/非权威来源/市场传言) | 4 | 5.1% |

### 按类别分布

| 类别 | 全称 | 数量 | 占比 |
|:----:|------|:----:|:----:|
| **CON** | 共识与指引 (Consensus) | 15 | 19.2% |
| **FIN** | 核心财务 (Financial) | 12 | 15.4% |
| **MGT** | 管理层 (Management) | 12 | 15.4% |
| **SMT** | 聪明钱 (Smart Money) | 10 | 12.8% |
| **OPT** | 期权/空头 (Options) | 8 | 10.3% |
| **VAL** | 估值 (Valuation) | 8 | 10.3% |
| **PMK** | 预测市场 (Prediction Mkt) | 7 | 9.0% |
| **MKT** | 市场行情 (Market) | 3 | 3.8% |
| **INF** | 推断 (Inference) | 3 | 3.8% |

### 质量门控

| 门控项 | 标准 | 实际 | 结果 |
|--------|:----:|:----:|:----:|
| H类占比 | >=50% | 79.5% | PASS |
| S类占比 | <20% | 5.1% | PASS |
| INF类标注 | 100%含推导链 | 3/3 | PASS |

---

## A.2 关键锚点速查表

### 核心财务数据 (FIN)

| DM-ID | 值 | 类型 | 来源 | 引用章节 |
|-------|------|:----:|------|---------|
| DM-FIN-001 | FY2025 Revenue $12.04B | H | MCP fmp_data income | Ch3 财务 |
| DM-FIN-002 | FY2025 Net Income $1.457B | H | MCP fmp_data income | Ch3 财务 |
| DM-FIN-003 | FY2025 EPS $6.12 (diluted) | H | MCP fmp_data income | Ch3, Ch8 估值 |
| DM-FIN-004 | FY2025 EBITDA $2.87B | H | MCP fmp_data income | Ch3, Ch8 |
| DM-FIN-005 | FY2025 FCF $2.03B | H | MCP fmp_data cashflow | Ch3, Ch9 |
| DM-FIN-006 | FY2025 Total Debt $15.67B | H | MCP fmp_data balance | Ch4 资产负债 |
| DM-FIN-007 | FY2025 Net Debt $14.70B | H | MCP fmp_data balance | Ch4, Ch8 |
| DM-FIN-008 | FY2025 Equity -$5.39B | H | MCP fmp_data balance | Ch4 |
| DM-FIN-009 | FY2025 Buybacks $3.254B | H | MCP fmp_data cashflow | Ch9 资本配置 |
| DM-FIN-010 | FY2025 Interest Expense $620M | H | MCP fmp_data income | Ch4, Ch8 |
| DM-FIN-011 | FY2025 SBC $170M | H | MCP fmp_data cashflow | Ch3 |
| DM-FIN-012 | Shares Out 238M (diluted) | H | MCP fmp_data income | Ch3, Ch8 |

### 估值数据 (VAL)

| DM-ID | 值 | 类型 | 来源 | 引用章节 |
|-------|------|:----:|------|---------|
| DM-VAL-001 | P/E TTM 50.2x | H | MCP fmp_data ratios | Ch8 估值 |
| DM-VAL-002 | Forward P/E 29.5x | H | MCP fmp_data quote | Ch8 |
| DM-VAL-003 | EV/EBITDA 28.7x | H | MCP fmp_data key-metrics | Ch8 |
| DM-VAL-004 | Net Debt/EBITDA 5.12x | H | MCP fmp_data key-metrics | Ch4, Ch8 |
| DM-VAL-005 | FMP DCF $153.21 | H | MCP fmp_data dcf | Ch8 |
| DM-VAL-006 | FCF Yield 2.8% | H | MCP fmp_data ratios | Ch8, Ch9 |
| DM-VAL-007 | ROIC 11.3% | H | MCP fmp_data key-metrics | Ch3 |
| DM-VAL-008 | Interest Coverage 4.3x | H | MCP fmp_data ratios | Ch4 |

### 市场行情 (MKT)

| DM-ID | 值 | 类型 | 来源 | 引用章节 |
|-------|------|:----:|------|---------|
| DM-MKT-001 | Stock Price $307.32 | H | MCP fmp_data quote | Ch1, Ch8 |
| DM-MKT-002 | RSI(14) 34.3 (Near Oversold) | H | yfinance technical | Ch7 技术 |
| DM-MKT-003 | VIX 23.75 | H | MCP get_market_overview | Ch7 |

### 共识与指引 (CON, 精选)

| DM-ID | 值 | 类型 | 来源 | 引用章节 |
|-------|------|:----:|------|---------|
| DM-CON-001 | Moderate Buy (15 Buy/11 Hold/0 Sell) | H | MarketBeat, TipRanks | Ch7 |
| DM-CON-002 | Avg PT $285.55; median $325; range $234-$340 | H | WallStreetZen, StockAnalysis | Ch7, Ch8 |
| DM-CON-004 | FY2026E EPS $8.49-$8.61; EBITDA $4.00-$4.04B | R | Hilton FY2026 guidance | Ch5, Ch8 |
| DM-CON-010 | ~95%调整后利润来自管理费+特许费(轻资产) | H | Insider Monkey, Yahoo Finance | Ch2 商业模式 |
| DM-CON-011 | Net unit growth 6.7% (2025); 520K在建房间 | H | Hilton press release | Ch5 增长 |

### 推断锚点 (INF) — 全部列出

| DM-ID | 值 | 类型 | 推导链 | 可证伪条件 |
|-------|------|:----:|--------|-----------|
| DM-INF-001 | EPS CAGR FY25-30E ~21.8% vs Rev CAGR 8.3% | R | EPS增速>>收入增速 = 回购缩股~3%/yr + OPM扩张 + 杠杆 | 回购节奏降>30%或利息超EBITDA增速 |
| DM-INF-002 | Buyback/FCF 160% = 需~$1.2B/yr新债维持回购 | R | FY2025回购$3.25B vs FCF $2.03B = $1.22B缺口由新债填补 | FCF增至>回购水平 或 回购降至<120% FCF |
| DM-INF-003 | 负权益恶化: -$821M→-$5,388M (5年6.6倍) | R | 库存股-$4.4B→-$14.4B驱动负权益加速 | 暂停回购或大幅减债逆转趋势 |

---

## A.3 数据新鲜度声明

| 数据层 | 来源 | 状态 | 覆盖范围 |
|--------|------|:----:|---------|
| **Layer 1** MCP直取 | fmp_data, analyze_stock, get_market_overview | OK | FIN/VAL/MKT全覆盖 |
| **Layer 2** Python验证 | yfinance技术指标 | OK | 技术面交叉验证 |
| **Layer 3** WebSearch | MarketBeat, TipRanks, Finviz, SEC filings, Polymarket | OK | CON/MGT/SMT/OPT/PMK |

**数据截止日期**: 2026-03-06

**已知局限**:
- DM-OPT-007/008 (暗池数据): 公开渠道不可获取，标记为N/A
- DM-SMT-001~010: 聪明钱数据value字段在注册时为空，实际数值内嵌于报告正文对应章节
- Polymarket无酒店/旅游垂直市场(DM-PMK-006)，宏观代理指标(衰退/通胀/利率)替代覆盖

---

*本注册表由Phase 0数据预取自动生成，Phase 1-4引用时通过DM-ID索引。全部78个锚点的完整JSON见 `data/research/HLT/dm_anchor_registry.json`。*
