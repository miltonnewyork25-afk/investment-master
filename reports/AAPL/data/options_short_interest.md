# AAPL Options & Short Interest Data
## 收集日期: 2026-02-19

---

### 做空数据

| 指标 | 数值 | 来源 |
|------|------|------|
| 做空股数 | 116.85M 股 | StockAnalysis/MarketBeat (Jan 2026报告期) |
| 前期做空股数 | 113.58M 股 (上一报告期) | StockAnalysis |
| 做空占流通股% | 0.80% | StockAnalysis/MarketBeat |
| 覆盖天数 (Short Ratio) | 2.2-2.36天 | MarketBeat/StockAnalysis (基于日均成交量52.56M股) |
| vs行业平均 | 显著低于Mega Cap Tech平均 (~2-5%) | 综合判断: AAPL 0.8%处于超大市值科技股底部区间 |
| 趋势 | **小幅增加** — 从109.14M→115.56M→116.85M, 连续两个报告期上升 |

**做空数据解读**:
- AAPL做空比例0.80%极低, 与其全球最大市值公司地位一致
- 覆盖天数仅2.2-2.36天, 表明做空头寸可快速平仓, 无逼空风险
- 近期小幅增加(+3.27M股, +2.9%环比)可能反映: (1)芯片短缺对iPhone利润率影响担忧; (2)Raymond James等分析师下调评级; (3)2026年手机销售增速放缓预期
- **逼空风险评估: 极低** — 做空占比不足1%, 覆盖天数<3天, 不具备逼空条件

---

### 期权情绪

| 指标 | 数值 | 日期 | 来源 |
|------|------|------|------|
| OI Put/Call Ratio | 0.68 | 2026年2月 | Fintel |
| 30日 Put/Call Ratio (成交量) | 0.3407 | 2026-01-23 | AlphaQuery |
| 30日 Put/Call Ratio (未平仓量) | 0.4928 | 2026-01-23 | AlphaQuery |
| 隐含波动率 (30日 IV) | 22.21% - 27.0% | 2026-02-03 / 2026-02-05 | Fintel / ProjectOption |
| IV Rank (52周) | 20% | 2026-02-05 | ProjectOption |
| IV Percentile | 15.48% - 53% | 2026-02-03 / 2026-02-05 | Fintel / ProjectOption |
| 30日历史波动率 (HV) | 33.58% (0.3358) | 2026-02-18 | AlphaQuery |
| HV参考值 (稍早) | 34.45% (0.3445) | 2026-02-17 | AlphaQuery |

**期权情绪解读**:
- **Put/Call Ratio偏低(0.34-0.68)**: 市场整体偏看多, Call交易活跃度显著高于Put
- **IV vs HV显著背离**: IV(22-27%) 远低于 HV(33-35%), 意味着:
  - 期权市场定价的未来波动率低于近期实际波动率
  - 期权可能被低估(尤其是Put), 波动率交易者可能视为买入波动率机会
  - 这种背离通常暗示市场预期波动将回归平静
- **IV Rank 20% (低位)**: 当前IV处于过去52周的低位区间, 距离年度高点有很大空间
- **整体判断**: 期权市场对AAPL短期持中性偏乐观态度, 未定价重大风险事件

---

### 异常期权活动 (2026年2月, Benzinga Whale Alerts)

| 日期 | 类型 | 方向 | 行权价 | 到期日 | 数量 | 金额 | 含义 |
|------|------|------|--------|--------|------|------|------|
| 2026年2月中旬 | Put Sweep | Bearish | $240.00 | 2026-03-20 | 200合约 | $29.6K | 深度OTM看跌保护, 分13笔成交, 防极端下行 |
| 2026年2月中旬 | Put Sweep | Bearish | $265.00 | 2026-02-20 | 70合约 | $28.0K | 短期看跌保护, 分14笔成交, 近月到期 |
| 2026年2月中旬 | Call Sweep | Mixed | $260.00 | 2026-02-18 | 500合约 | 未披露 | 短期看涨押注, 分12笔成交 |
| 2026年2月上旬 | Put Trade | Bullish* | $272.50 | 2026-02-11 | 180合约 | 未披露 | 卖Put获取权利金(Bullish方向) |
| 2026年2月上旬 | Mixed | Mixed | $275.00 | 2026-02-11 | 1,371合约 | $111.0K | 大宗交易, $81/合约 |

*注: Benzinga将卖出看跌期权归类为Bullish方向

**异常活动解读**:
- AAPL作为全球交易量最大的单一股票期权之一, 鲸鱼级交易频繁出现属于常态
- 2月异常活动以**短期交易**为主(到期日集中在2-3月), 缺乏大规模远期方向性押注
- $240 Put(深度虚值)的购买暗示部分大户在进行尾部风险对冲
- 整体活动规模($28K-$111K级别)相对AAPL日均期权成交量属于中等, 未见百万美元级别的方向性豪赌
- **信号强度: 中性** — 无法从当前异常活动中提取明确方向性信号

---

### 分析师与市场情绪补充

| 指标 | 数值 | 来源 |
|------|------|------|
| 分析师共识评级 | Buy (28位分析师) | 2026-02-16 |
| 12个月目标价共识 | $287.83 | 分析师共识 |
| 隐含上涨空间 | ~11% | 基于当前价格 |
| 散户CFD持仓 | 94%多头 vs 6%空头 | Capital.com (2026-01-08) |

**看空论点**:
- Raymond James: 2026年股票将盘整, 理由包括有限上行空间、手机出货量增长放缓、近期催化剂缺乏、中国供应链集中风险、估值偏高
- 芯片短缺: 分析师预计存储芯片短缺可能削减Apple利润率达1.5个百分点
- 2026年手机销售挑战: 芯片厂商优先供应数据中心而非智能手机, 组件成本上升

---

### 综合判断

| 维度 | 信号 | 强度 |
|------|------|------|
| 做空压力 | 极低 (0.8%做空占比, 覆盖仅2.2天) | 强看多信号 |
| 期权情绪 | 偏看多 (P/C Ratio 0.34-0.68) | 中等看多信号 |
| 波动率预期 | IV < HV, 市场预期波动下降 | 中性偏平静 |
| 鲸鱼活动 | 无明确方向性大额押注 | 中性 |
| 逼空风险 | 不存在 | N/A |

**Agent G总结**: AAPL做空和期权数据整体呈现"大盘股常态"特征 — 做空比例极低(0.8%)、期权市场偏看多(P/C 0.34-0.68)、IV处于低位(Rank 20%)。近期做空股数小幅增加(+2.9%环比)可能反映芯片短缺和估值担忧, 但绝对水平仍远低于行业平均。期权市场未定价重大下行风险。IV显著低于HV的背离值得关注 — 若实际波动持续, 期权市场可能需要重新定价。

---

### 来源URLs

- [MarketBeat - AAPL Short Interest (Updated Jan 2026)](https://www.marketbeat.com/stocks/NASDAQ/AAPL/short-interest/)
- [StockAnalysis - AAPL Statistics](https://stockanalysis.com/stocks/aapl/statistics/)
- [Fintel - AAPL Short Interest & Squeeze Data](https://fintel.io/ss/us/aapl)
- [Nasdaq - AAPL Short Interest](https://www.nasdaq.com/market-activity/stocks/aapl/short-interest)
- [Fintel - AAPL Put/Call Ratio & Options Sentiment](https://fintel.io/sopt/us/aapl)
- [AlphaQuery - AAPL 30-Day Put/Call Ratio (Volume)](https://www.alphaquery.com/stock/AAPL/volatility-option-statistics/30-day/put-call-ratio-volume)
- [AlphaQuery - AAPL 30-Day Put/Call Ratio (Open Interest)](https://www.alphaquery.com/stock/AAPL/volatility-option-statistics/30-day/put-call-ratio-oi)
- [AlphaQuery - AAPL 30-Day Historical Volatility](https://www.alphaquery.com/stock/AAPL/volatility-option-statistics/30-day/historical-volatility)
- [ProjectOption - AAPL IV Rank & Percentile](https://projectoption.com/stocks/aapl/implied-volatility)
- [Barchart - AAPL Put/Call Ratios](https://www.barchart.com/stocks/quotes/AAPL/put-call-ratios)
- [Barchart - AAPL Volatility Term Structure](https://www.barchart.com/stocks/quotes/AAPL/volatility-charts)
- [Benzinga - IT Stocks Whale Alerts (Feb 18, 2026)](https://www.benzinga.com/insights/options/26/02/50695550/10-information-technology-stocks-with-whale-alerts-in-todays-session)
- [Benzinga - IT Stocks Whale Alerts (Feb 14, 2026)](https://www.benzinga.com/insights/options/26/02/50638908/10-information-technology-stocks-with-whale-alerts-in-todays-session)
- [Benzinga - IT Stocks Whale Activity (Feb 7, 2026)](https://www.benzinga.com/insights/options/26/02/50488245/10-information-technology-stocks-whale-activity-in-todays-session)
- [Benzinga - IT Stocks Whale Activity (Feb 5, 2026)](https://www.benzinga.com/insights/options/26/02/50308413/10-information-technology-stocks-whale-activity-in-todays-session)
- [Capital.com - Apple Stock Forecast](https://capital.com/en-int/analysis/apple-stock-price-in-10-years)
- [Barchart - Analyst Expects Apple Stagnation in 2026](https://www.barchart.com/story/news/36888481/why-1-top-analyst-expects-apple-stock-to-stagnate-in-2026)
- [Yahoo Finance - Apple Stock Starts 2026 With Downgrade](https://finance.yahoo.com/news/apple-stock-starts-2026-downgrade-154205170.html)
