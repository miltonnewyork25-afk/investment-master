# 附录B: 数据源完整清单

> Phase 0-5 全报告数据来源汇总 | 总计: 12个主要来源类别

## B.1 一级数据源 (Primary Sources)

| 来源 | 类型 | 使用场景 | 可靠性 |
|------|------|----------|:------:|
| **FMP API** | MCP工具 | 财务报表/比率/估值/DCF | H |
| **Baggers Summary** | MCP工具 | 综合财务摘要/7维评分 | H |
| **Chipotle IR** | 公司官方 | Q4/FY2025业绩(2026-02-03) | H |
| **SEC EDGAR** | 监管文件 | 10-K/10-Q Filing | H |

## B.2 二级数据源 (Secondary Sources)

| 来源 | 类型 | 使用场景 | 可靠性 |
|------|------|----------|:------:|
| **CAVA IR** | 竞对官方 | FY2025业绩(2026-02-24) | H |
| **SBUX IR** | 竞对官方 | 镜像分析交叉引用 | H |
| **Wingstop/Sweetgreen IR** | 竞对官方 | 同业对标 | H |
| **Restaurant Business Online** | 行业媒体 | 行业趋势/竞争格局 | M |
| **Restaurant Dive** | 行业媒体 | 行业新闻/分析 | M |
| **CNBC/Fortune** | 财经媒体 | CMG Q4报道/市场反应 | M |

## B.3 估值参考源 (Valuation References)

| 来源 | CMG估值 | 备注 |
|------|:-------:|------|
| FMP DCF | $32.42 | 算法DCF, 偏保守 |
| AlphaSpread | $51 | 含增长溢价 |
| GuruFocus | $58 | 含历史P/E回归 |
| SimplyWallSt | $36 | 多方法平均 |
| 分析师共识(27人) | $44-47 | Buy评级主导 |
| **本报告(RT后)** | **$34.3** | 混合4方法+红队校准 |

## B.4 MCP工具调用清单

| 工具 | 调用次数 | 代表性调用 |
|------|:--------:|-----------|
| `fmp_data` (endpoint) | ~25次 | income/balance/cashflow/ratios/key-metrics/estimates/rating/dcf/quote/income-ttm/sector-pe/industry-pe/market-risk-premium |
| `fmp_data` (path) | ~5次 | insider-trading等自定义路径 |
| `baggers_summary` | 2次 | CMG + CAVA |
| `analyze_stock` | 1次 | CMG technical |
| `compare_stocks` | 1次 | 9公司对标 |
| `get_market_overview` | 1次 | 宏观指数 |
| `polymarket_events` | 1次 | CMG相关预测市场 |

## B.5 数据冲突记录

| 冲突 | 源A | 源B | 处理 |
|------|-----|-----|------|
| totalDebt | FMP: $9.85B | IR: $0金融债 | 采用IR, FMP含ASC842租赁 |
| P/E TTM | Baggers: 34.36x | FMP Ratios: 32.1x | 双源标注, 正文用FMP |
| EV/EBITDA | Baggers: 26.15x | FMP: 24.9x | 双源标注, 取中间值 |
| ROIC | Baggers: 18.9% | FMP Key-Metrics: 17.29% | 口径差异(分母定义), 双源标注 |
