# BABA (Alibaba Group) — Options & Short Interest Research
> **Data Agent Output** | Date: 2026-02-25 | DM Anchor Prefix: OPT

---

## 1. Current Stock Context

| Metric | Value | Source |
|--------|-------|--------|
| **Price** | $153.11 | [OPT-01] FMP quote API, 2026-02-25 |
| **Market Cap** | $355.05B | [OPT-02] FMP quote API |
| **52-Week Range** | $95.73 – $192.67 | [OPT-03] FMP quote API |
| **50-Day MA** | $159.14 | [OPT-04] FMP quote API |
| **200-Day MA** | $144.51 | [OPT-05] FMP quote API |
| **Beta** | 0.39 | [OPT-06] StockAnalysis.com |
| **Shares Outstanding** | ~2.24B (YoY -3.23%) | [OPT-07] StockAnalysis.com |

**Position vs. MAs**: Price ($153.11) is trading below its 50-DMA ($159.14, -3.8%) but above its 200-DMA ($144.51, +5.9%). This places BABA in a short-term pullback within a longer-term uptrend. The stock is ~20.5% below its 52-week high of $192.67.

---

## 2. Short Interest Data

### 2.1 Core Short Interest Metrics

| Metric | Value | Reporting Date | Source |
|--------|-------|----------------|--------|
| **Shares Short** | ~40.1M – 41.3M | Nov 2025 – Jan 2026 | [OPT-08] type:H, MarketBeat/Fintel/ShortSqueeze.com |
| **Short % of Float** | 2.01% – 2.07% | Nov 2025 – Jan 2026 | [OPT-09] type:H, MarketBeat/StockAnalysis |
| **Short Interest (StockAnalysis)** | 2.04% | Latest available | [OPT-10] type:R, StockAnalysis.com |
| **Days to Cover** | 2.86 – 3.01 | Nov 2025 | [OPT-11] type:H, MarketBeat/ShortSqueeze.com |
| **Avg Daily Volume** | ~13.72M shares | Nov 2025 | [OPT-12] type:H, MarketBeat |

### 2.2 Short Interest Trend

| Period | Shares Short | % of Float | Change |
|--------|-------------|------------|--------|
| Oct 2025 (mid) | ~41.00M | ~2.05% | Baseline |
| Nov 2025 (end) | ~41.33M | ~2.07% | +0.33M (+0.8%) |
| Jan 2026 (est.) | ~40.10M | ~2.01% | -1.23M (-3.0%) |
| Latest (Feb 2026) | ~2.04% (float) | — | Broadly stable |

**Trend Assessment**: Short interest has been **broadly stable to slightly declining** over the past 3-4 months, hovering in the 2.0%-2.1% of float range. The slight decrease from 41.3M to ~40.1M shares suggests modest short covering, potentially driven by the strong rally in Chinese tech stocks (BABA rose ~75% in 2025 and surged further in early 2026 on AI/DeepSeek catalysts and Xi Jinping's meeting with Jack Ma).

**Source**: [MarketBeat](https://www.marketbeat.com/stocks/NYSE/BABA/short-interest/), [ShortSqueeze.com](https://shortsqueeze.com/shortinterest/stock/BABA.htm), [StockAnalysis](https://stockanalysis.com/stocks/baba/statistics/), [Fintel](https://fintel.io/ss/us/baba)

### 2.3 Short Squeeze Potential Assessment

| Factor | Assessment | Detail |
|--------|-----------|--------|
| **Short % of Float** | LOW | 2.0%-2.1% — well below squeeze threshold (~10%+) |
| **Days to Cover** | LOW-MODERATE | 2.86-3.01 days — manageable for shorts |
| **Borrow Cost** | LOW (est.) | Large-cap, high-liquidity stock — easy to borrow |
| **Recent Price Action** | SQUEEZE-UNFRIENDLY | Stock already rallied significantly (75% in 2025) |

**Verdict**: Short squeeze probability is **very low**. The ~2% short float is far below levels that typically trigger squeezes. The high average daily volume (~13.7M shares) means shorts can exit relatively quickly. BABA is not a short squeeze candidate.

**Source**: [Fintel Short Squeeze Score](https://fintel.io/ss/us/baba), [ShortSqueeze.com](https://shortsqueeze.com/shortinterest/stock/BABA.htm)

---

## 3. Options Sentiment

### 3.1 Put/Call Ratio

| Metric | Value | Interpretation | Source |
|--------|-------|---------------|--------|
| **OI Put/Call Ratio** | 0.60 | **Bullish** (< 1.0) | [OPT-13] type:R, Fintel |
| **Recent Options Flow (last 10 unusual trades)** | 9 Calls : 1 Put | **Strongly Bullish** | [OPT-14] type:R, TrendSpider |

**Interpretation**: The open interest put/call ratio of 0.60 indicates that there are significantly more open call positions than put positions — a bullish signal. For every 6 calls outstanding, there are approximately 3.6 puts. This is reinforced by recent unusual options flow data showing 9 out of 10 unusual trades were call transactions.

**Source**: [Fintel Options Sentiment](https://fintel.io/sopt/us/baba), [TrendSpider Options Flow](https://trendspider.com/markets/symbols/BABA/options-flow/)

### 3.2 Unusual Options Activity

Specific large block trade details are behind paywalls on most platforms. However, the following patterns were observed:

- **Directional Bias**: Predominantly bullish (call-heavy unusual flow)
- **Block/Sweep Detection**: Platforms (Barchart, TrendSpider, Fintel) filter for trades >10 contracts with premium >$20,000, showing institutional-level positioning
- **Pre-Earnings Positioning**: Ahead of the Q3 FY2026 earnings (reported Feb 20, 2026), the options market priced in a **~5% expected move** (approximately $7.86 based on pre-earnings stock price ~$157)
- **Post-Earnings Reaction**: BABA stock surged **+11.46%** on Feb 20, 2026, significantly exceeding the options-implied expected move, indicating the actual move was more than 2x the priced-in expectation

**Source**: [Barchart Unusual Activity](https://www.barchart.com/stocks/quotes/BABA/unusual-activity), [TrendSpider](https://trendspider.com/markets/symbols/BABA/options-flow/), [Fintel](https://fintel.io/sof/us/baba)

---

## 4. Implied Volatility Analysis

### 4.1 Current IV Levels

| Metric | Value | Source |
|--------|-------|--------|
| **IV30 (30-day Implied Vol)** | ~47.2% – 47.8% | [OPT-15] type:R, MarketChameleon/GuruFocus |
| **IV30 vs. 52-Week Median** | Above median | [OPT-16] type:R, GuruFocus |
| **Expected Daily Move (at IV30~47%)** | ~$4.54 | [OPT-17] type:S, derived from IV30 |
| **Pre-Earnings IV Spike** | Elevated (pre-Feb 20) | [OPT-18] type:R, multiple sources |
| **Post-Earnings IV Crush** | Expected significant drop | [OPT-19] type:S, standard post-earnings pattern |

### 4.2 IV Context

- **IV30 ~47%** is **above the 52-week median**, reflecting: (a) recent earnings volatility, (b) ongoing China policy/regulatory uncertainty, and (c) AI investment narrative driving both upside hopes and uncertainty
- **Pre-earnings IV** was elevated with the options market pricing a ~5% expected move for the Q3 FY2026 report (Feb 20, 2026). The actual move (+11.46%) far exceeded this, suggesting options were underpricing the event risk
- **Earnings IV pattern**: BABA historically experiences significant IV crush post-earnings as the uncertainty premium evaporates. Given the stock moved 2x the expected range, put sellers and straddle sellers likely experienced losses despite IV crush
- **IV vs. HV interpretation**: When IV > HV (which appears to be the current state given elevated IV30), options premiums are rich — generally favorable for options sellers. However, BABA's actual realized moves have recently exceeded implied expectations

### 4.3 IV Rank / IV Percentile (Estimated)

Exact IV Rank and IV Percentile values are behind paywalls (Barchart, MarketChameleon). Based on available context:

| Metric | Estimated Range | Reasoning |
|--------|----------------|-----------|
| **IV Rank** | ~40-55% (moderate) | IV30 ~47% is above 52-wk median but well below the peaks seen during 2022-2023 China regulatory crisis (when IV exceeded 70-80%) |
| **IV Percentile** | ~50-65% (moderate-high) | More days in the past year had lower IV than current level |

**Note**: These are directional estimates. For precise values, consult [Barchart IV Rank](https://www.barchart.com/stocks/quotes/BABA/volatility-greeks) or [MarketChameleon IV Chart](https://marketchameleon.com/Overview/BABA/IV/).

**Source**: [Barchart Volatility & Greeks](https://www.barchart.com/stocks/quotes/BABA/volatility-greeks), [MarketChameleon IV](https://marketchameleon.com/Overview/BABA/IV/), [AlphaQuery IV](https://www.alphaquery.com/stock/BABA/volatility-option-statistics/30-day/iv-put), [GuruFocus](https://www.gurufocus.com/news/8616076/alibaba-baba-faces-mixed-options-sentiment-amid-stock-decline)

---

## 5. Sector Comparison

### 5.1 Short Interest vs. China Tech Peers

| Stock | Short % of Float | Days to Cover | Notes |
|-------|-----------------|---------------|-------|
| **BABA** | ~2.04% | ~3.0 | Moderate, stable |
| **JD** | Low (est. <2%) | — | "Short float remains low" per analysts |
| **PDD** | Not available | — | No specific data retrieved |
| **Sector Avg (China ADR)** | ~2-4% (est.) | — | China ADRs generally carry higher short interest than US large-caps due to regulatory/VIE risk |

**Context**: BABA's ~2% short float is **at the lower end** of the China ADR spectrum. For comparison, the average short interest for S&P 500 stocks is typically 2-3%, suggesting BABA's short positioning is roughly in line with large-cap US norms — a notable shift from 2022-2023 when China tech shorts were far more elevated.

### 5.2 Valuation Context (for Options Pricing)

| Metric | BABA | JD | PDD |
|--------|------|-----|-----|
| **Forward P/E** | 21.93 | <9x (2026E) | 9.4x |
| **P/S Ratio** | 2.41 | — | — |
| **Analyst Consensus** | Strong Buy (14 analysts) | Strong Buy | — |
| **Avg Price Target** | $188.69 (+23.2% upside) | — | — |

**Source**: [StockAnalysis BABA](https://stockanalysis.com/stocks/baba/statistics/), [Kavout Comparison](https://www.kavout.com/market-lens/top-china-e-commerce-stocks-alibaba-vs-jd-vs-pdd), [Nasdaq](https://www.nasdaq.com/articles/pdd-baba-or-jd-which-chinese-e-commerce-giant-good-investment)

---

## 6. Q3 FY2026 Earnings Impact on Options/Short Data

### 6.1 Earnings Results (Feb 20, 2026)

| Metric | Actual | Estimate | Beat/Miss |
|--------|--------|----------|-----------|
| **Revenue** | RMB 290.98B | ~$40.95B consensus | Beat by ~$737M |
| **GAAP EPS** | — | $1.91 consensus | Beat by $0.85 |
| **Normalized EPS** | — | — | Missed by $0.20 |
| **Revenue YoY Growth** | +3.9% | — | — |
| **Pre-tax Profit YoY** | -44% | — | Significant decline |

### 6.2 Post-Earnings Stock Reaction

- **Feb 20, 2026**: BABA stock surged **+11.46%** (pre-earnings price ~$18.68 HKD context / ~$157 USD context)
- **Options Market Expected Move**: ~5% ($7.86)
- **Actual vs. Expected**: Actual move was ~2.3x the expected move
- **Implication**: Options were significantly underpricing the event. Call buyers profited handsomely; put sellers and straddle sellers faced losses

### 6.3 Key Business Catalysts Driving Options Sentiment

1. **AI/Cloud Acceleration**: AI-related workloads grew at triple-digit rates, rising to >20% of external cloud revenue
2. **DeepSeek Catalyst**: Low-cost AI model revelation boosted Chinese AI ecosystem sentiment
3. **Government Backing Signal**: Xi Jinping's meeting with Jack Ma in Feb 2026 signaled regulatory thaw
4. **Share Buyback Program**: Shares outstanding declined 3.23% YoY, reducing float

**Source**: [Seeking Alpha](https://seekingalpha.com/article/4871314-alibaba-risk-outweighs-reward-in-its-q3-earnings-despite-ai-chips), [Yahoo Finance](https://finance.yahoo.com/news/alibaba-market-favorite-chinese-ai-192030304.html), [MarketBeat Earnings](https://www.marketbeat.com/stocks/NYSE/BABA/earnings/)

---

## 7. Max Pain Analysis

Specific max pain levels for current expiration dates are only available through real-time options platforms. Based on available sources:

- **Available Expiration Dates**: Feb 28, Mar 6, Mar 13, Mar 20, Mar 27, and monthly out to Jan 2027+
- **Max Pain Tracking**: Available at [OptionCharts](https://optioncharts.io/options/BABA/max-pain), [SwaggyStocks](https://swaggystocks.com/dashboard/options-max-pain/BABA)
- **General Pattern**: Max pain for BABA near-term expirations typically centers around heavy open interest strikes. Given the current price of $153.11 and the recent $192.67 high, max pain for near-term expirations likely sits between $140-$160 based on typical OI distribution patterns

**Note**: Exact max pain values could not be retrieved due to paywall restrictions. Recommend manual check at platforms above for real-time data.

---

## 8. Summary & Key Takeaways

### Bullish Signals
- OI Put/Call ratio of 0.60 (bullish skew)
- 9 of 10 recent unusual options trades were calls
- Short interest declining slightly (41.3M -> 40.1M shares)
- Analyst consensus: Strong Buy with $188.69 avg target (+23.2% upside)
- Post-earnings surge of +11.46% exceeding options-implied move
- AI/Cloud revenue acceleration (triple-digit AI workload growth)

### Bearish/Cautionary Signals
- Pre-tax profit declined 44% YoY in Q3 FY2026
- Normalized EPS missed estimates by $0.20
- IV30 ~47% is above 52-week median (options premiums are elevated/expensive)
- Stock is 20.5% below 52-week high ($192.67), in short-term pullback
- China regulatory/geopolitical risk remains a structural overhang

### Net Assessment
The options and short interest data collectively paint a **moderately bullish** picture. Short interest is low and declining, options flow is call-heavy, and institutional positioning appears constructive. However, elevated IV suggests the market is pricing in continued uncertainty, and the post-earnings pullback from highs warrants monitoring.

---

## DM Anchor Registry

| ID | Type | Metric | Value | Source | Date |
|----|------|--------|-------|--------|------|
| OPT-01 | R | Price | $153.11 | FMP API | 2026-02-25 |
| OPT-02 | R | Market Cap | $355.05B | FMP API | 2026-02-25 |
| OPT-03 | R | 52-Week Range | $95.73-$192.67 | FMP API | 2026-02-25 |
| OPT-04 | R | 50-DMA | $159.14 | FMP API | 2026-02-25 |
| OPT-05 | R | 200-DMA | $144.51 | FMP API | 2026-02-25 |
| OPT-06 | R | Beta | 0.39 | StockAnalysis.com | 2026-02-25 |
| OPT-07 | R | Shares Outstanding | 2.24B | StockAnalysis.com | 2026-02-25 |
| OPT-08 | H | Shares Short | 40.1M-41.3M | MarketBeat/Fintel | Nov 2025-Jan 2026 |
| OPT-09 | H | Short % Float | 2.01%-2.07% | MarketBeat/StockAnalysis | Nov 2025-Jan 2026 |
| OPT-10 | R | Short Interest | 2.04% | StockAnalysis.com | 2026-02-25 |
| OPT-11 | H | Days to Cover | 2.86-3.01 | MarketBeat/ShortSqueeze | Nov 2025 |
| OPT-12 | H | Avg Daily Vol | 13.72M | MarketBeat | Nov 2025 |
| OPT-13 | R | OI P/C Ratio | 0.60 | Fintel | 2026-02 |
| OPT-14 | R | Unusual Flow | 9 Calls:1 Put | TrendSpider | 2026-02 |
| OPT-15 | R | IV30 | 47.2%-47.8% | MarketChameleon/GuruFocus | 2026-02 |
| OPT-16 | R | IV30 vs Median | Above 52-wk median | GuruFocus | 2026-02 |
| OPT-17 | S | Expected Daily Move | ~$4.54 | Derived from IV30 | 2026-02 |
| OPT-18 | R | Pre-Earnings IV | Elevated | Multiple sources | 2026-02-19 |
| OPT-19 | S | Post-Earnings IV | Expected crush | Standard pattern | 2026-02-20 |

**DM Type Legend**: H = Historical/Reported | R = Real-time/Retrieved | S = Synthesized/Derived
