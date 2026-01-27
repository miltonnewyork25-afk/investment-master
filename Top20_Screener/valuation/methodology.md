# Valuation Methodology Documentation

**Analysis Date**: 2026-01-25
**Universe**: Top 20 Large-Cap US Stocks
**Data Source**: Financial Modeling Prep (FMP) API

---

## 1. Valuation Framework Overview

This analysis employs a **multi-factor valuation scoring system** combining:
- **Relative Valuation** (50 points): Historical bands + Peer comparison
- **Absolute Valuation** (30 points): Discounted Cash Flow (DCF) analysis
- **Safety Margin** (20 points): Free Cash Flow Yield + Asset-based metrics

**Total Score**: 0-100, where higher scores indicate greater undervaluation.

---

## 2. Historical Valuation Bands (25 points)

### Methodology
For each stock, we analyze 5-year historical valuation multiples (20 quarters):
- **P/E Ratio**: Price-to-Earnings
- **P/B Ratio**: Price-to-Book Value

### Calculation
1. Fetch quarterly financial ratios for past 5 years
2. Filter outliers (P/E > 200, P/B > 50 excluded)
3. Calculate percentiles:
   - Minimum
   - 25th Percentile
   - Median (50th Percentile)
   - 75th Percentile
   - Maximum

### Scoring Rules
Current P/E position relative to historical range:

| Position | Score | Interpretation |
|----------|-------|----------------|
| < 25th percentile | 25 | **Deep Undervalued** - Trading at lowest quartile of 5Y range |
| 25th - 50th percentile | 15 | **Below Median** - Cheaper than historical average |
| 50th - 75th percentile | 8 | **Above Median** - More expensive than average |
| > 75th percentile | 0 | **Overvalued** - Trading at highest quartile |

### Example: AAPL
```
5-Year P/E Range: [18.5, 22.1, 28.3, 32.5, 39.2]
Current P/E: 33.2
Position: Between Median and 75th percentile → Score: 8/25
```

### Data Quality Notes
- Stocks with <8 quarters of data receive score of 0
- Negative earnings quarters excluded from P/E calculations
- Asset-light businesses may show extreme P/B ratios (use P/E instead)

---

## 3. Peer Comparison (25 points)

### Methodology
Compare each stock's valuation multiples against sector peers.

### Sector Groupings
- **Technology**: AAPL, MSFT, NVDA
- **Communication Services**: GOOGL, META, DIS, NFLX
- **Consumer Discretionary**: AMZN, TSLA, HD
- **Financials**: JPM, V, BRK.B
- **Healthcare**: JNJ, UNH
- **Energy**: XOM, CVX
- **Consumer Staples**: PG, KO, WMT

### Calculation
1. Calculate sector median P/E and P/B
2. Compute discount/premium:
   ```
   Discount% = (Stock P/E - Sector Median P/E) / Sector Median P/E × 100
   ```

### Scoring Rules
| Discount vs Peers | Score | Interpretation |
|-------------------|-------|----------------|
| > 20% discount | 25 | **Significant undervaluation** vs peers |
| 10-20% discount | 18 | **Moderate undervaluation** |
| 0-10% discount | 10 | **Slight undervaluation** |
| Premium (negative discount) | 0 | Trading at premium to sector |

### Quality Adjustment
High-quality businesses deserve premium valuations:
```
Adjusted Discount = Raw Discount - (Quality Score Difference × 0.5)
```

Example:
- Stock A: 25% discount vs peers, Quality Score: 85/100
- Sector Average Quality: 60/100
- Quality Premium: (85-60) × 0.5 = 12.5%
- Adjusted Discount: 25% - 12.5% = 12.5% → Still attractive

**Note**: Quality scores would come from separate moat/financial health analysis.

---

## 4. DCF Absolute Valuation (30 points)

### Model Structure
**5-Year Projection Period + Terminal Value**

### Key Assumptions

#### A. Free Cash Flow (FCF) Projection
- **Starting Point**: TTM Free Cash Flow
- **Growth Rate**: Historical 5-year FCF CAGR (capped at -10% to +30%)
- **Projection**: FCF grows at assumed rate for 5 years

#### B. Discount Rate (WACC)
Sector-specific Weighted Average Cost of Capital:

| Sector | WACC |
|--------|------|
| Technology | 9.5% |
| Communication Services | 9.0% |
| Consumer Discretionary | 10.0% |
| Financials | 8.5% |
| Healthcare | 8.8% |
| Energy | 9.2% |
| Consumer Staples | 8.2% |

**Derivation**: Based on industry beta, risk-free rate (4.2%), and equity risk premium (8%).

#### C. Terminal Value
Gordon Growth Model:
```
Terminal Value = FCF_Year5 × (1 + g) / (WACC - g)
```
Where **g** = Perpetual Growth Rate = 3.0% (approximately GDP growth)

#### D. Enterprise to Equity Value Bridge
```
Equity Value = Enterprise Value - Net Debt
Net Debt = Total Debt - Cash & Equivalents
Intrinsic Value per Share = Equity Value / Shares Outstanding
```

### Three-Scenario Analysis

#### Base Case
- FCF Growth: Historical CAGR
- WACC: Sector benchmark
- Perpetual Growth: 3.0%

#### Bull Case (+20-45% upside vs Base)
- FCF Growth: Historical CAGR × 1.2 (capped at 35%)
- WACC: Sector benchmark - 1%
- Perpetual Growth: 3.5%

#### Bear Case (-15-25% downside vs Base)
- FCF Growth: Historical CAGR × 0.6 (minimum 2%)
- WACC: Sector benchmark + 1%
- Perpetual Growth: 2.5%

### Scoring Rules
Based on **Base Case** upside potential:

| Upside vs Market Price | Score |
|------------------------|-------|
| > 30% | 30 |
| 20-30% | 22 |
| 10-20% | 15 |
| 0-10% | 8 |
| Negative (overvalued) | 0 |

### Sensitivity Analysis
Every DCF includes bull/bear cases to show valuation range, not single-point estimate.

### Example: MSFT
```
Base Case:
- FCF Year 0: $65B
- Growth: 12% annually
- WACC: 9.5%
- Terminal Growth: 3%
→ Intrinsic Value: $520/share
→ Market Price: $466
→ Upside: 11.6%
→ Score: 15/30

Bull/Bear Range: $475-$585
```

---

## 5. Safety Margin Metrics (20 points)

### A. Free Cash Flow Yield (12 points max)

**Formula**:
```
FCF Yield = (FCF per Share / Current Price) × 100
```

**Scoring**:
| FCF Yield | Score | vs 10Y Treasury (4.5%) |
|-----------|-------|------------------------|
| > 10% | 12 | **2.2x risk-free rate** - Excellent |
| 6-10% | 8 | **1.3-2.2x** - Good |
| 4.5-6% | 4 | **1.0-1.3x** - Adequate equity premium |
| < 4.5% | 0 | **Below risk-free** - Poor |

**Interpretation**: FCF Yield represents "cash return" if you bought the entire business. Higher yields provide margin of safety.

### B. Price-to-Book Ratio (8 points max)

**Asset-Based Safety Check**:

| Condition | Score |
|-----------|-------|
| P/B < Sector Median × 0.7 | 8 |
| P/B < 1.0 (trading below liquidation value) | 6 |
| Otherwise | 0 |

**Caveats**:
- Technology/service stocks have low tangible assets (P/B less meaningful)
- Check for goodwill impairment risk (>30% of equity)
- Inventory quality matters (rising inventory may be obsolete)

---

## 6. Comprehensive Valuation Score

### Final Calculation
```
Total Score = Historical Score (25)
            + Peer Score (25)
            + DCF Score (30)
            + Safety Score (20)
            = 0-100 points
```

### Classification Thresholds
| Score | Classification | Action |
|-------|----------------|--------|
| 70-100 | **Deep Undervalued** | Strong buy candidate, high conviction |
| 50-69 | **Reasonably Undervalued** | Buy candidate, moderate conviction |
| 30-49 | **Fair Value** | Hold/watch, no margin of safety |
| 0-29 | **Overvalued** | Avoid/sell |

### Portfolio Construction Guidance
- **Deep Undervalued Pool**: ≥70 score + DCF upside >25% + Value trap check passed
- **Reasonably Undervalued Pool**: 50-69 score + DCF upside >15%
- **Exclusions**: <30 score OR failed value trap checks

---

## 7. Value Trap Verification

**Critical**: Low valuation alone doesn't mean opportunity. Must verify business quality.

### 5-Point Checklist
1. **Revenue Growth**: Is top-line growing or stable? (Structural demand intact)
2. **Competitive Moat**: Does business have sustainable competitive advantage?
3. **ROIC > WACC**: Is company creating value? (Return on Invested Capital > Cost of Capital)
4. **Cash Flow Quality**: OCF/Net Income > 0.8? (Earnings converting to cash)
5. **Management Alignment**: Insider ownership, rational capital allocation?

**Passing Standard**: ≥3 of 5 checks → Safe to invest
**Failing**: ≤2 checks → Value trap, exclude

### Common Value Traps
- ❌ **Structurally Declining Industries**: Newspapers, cable TV, traditional retail
- ❌ **Technological Disruption**: Obsolete products (DVD players, feature phones)
- ❌ **Permanent Margin Compression**: Loss of pricing power, commodity businesses
- ❌ **Financial Engineering**: Leverage masking operational decline
- ❌ **Governance Issues**: Poor capital allocation, related-party transactions

---

## 8. Catalyst Identification

**Question**: Why is the stock undervalued, and what will fix it?

### Catalyst Categories

#### A. Fundamental Catalysts (3-12 months)
- Earnings beats and guidance raises
- New product launches
- Margin expansion evidence
- Market share gains

#### B. Corporate Actions (0-6 months)
- Share buyback programs
- Dividend increases
- Asset sales / spin-offs
- Strategic M&A

#### C. Industry Trends (6-24 months)
- Regulatory changes (favorable)
- Demand cycle recovery
- Technology platform shifts
- Commodity price normalization

#### D. Market Technical (0-6 months)
- Index inclusion (passive inflows)
- Analyst coverage initiation
- Short interest squeeze potential
- Institutional accumulation

### Timeframe Classification
- **Immediate**: <3 months (earnings, announced events)
- **Near-Term**: 3-6 months (product launches, regulatory milestones)
- **Medium-Term**: 6-18 months (business model inflections)
- **Long-Term**: 18+ months (industry transformation, new markets)

**Portfolio Implication**: Mix of short/medium/long catalysts for staggered returns.

---

## 9. Data Sources & Quality

### Primary Data: Financial Modeling Prep (FMP) API
- **Quote Data**: Real-time price, P/E, market cap
- **Financial Statements**: TTM income statement, balance sheet, cash flow
- **Historical Ratios**: 5 years quarterly valuation multiples
- **Key Metrics**: ROIC, FCF, book value per share

### Data Validation
- Cross-check against SEC filings (10-K, 10-Q) for material discrepancies
- Outlier detection: Remove P/E >200, P/B >50 (distorted by one-time items)
- TTM data preferred over quarterly (smooths seasonality)

### Data Freshness
- **Quote Data**: Real-time (delayed 15 minutes)
- **Financial Statements**: Updated within 24 hours of SEC filing
- **Analysis Date**: 2026-01-25

### Known Limitations
- **BRK.B**: P/E not meaningful (insurance accounting, look-through earnings)
- **TSLA**: High volatility in FCF (capex-heavy growth phase)
- **Small-cap stocks**: Less analyst coverage, wider bid-ask spreads

---

## 10. Risk Factors & Disclaimers

### Model Risks
1. **DCF Sensitivity**: Small changes in WACC (±1%) or perpetual growth (±0.5%) significantly alter intrinsic value
2. **Historical Patterns**: Past valuation ranges may not apply in new paradigm (e.g., rising interest rates)
3. **Sector Classification**: Some companies span multiple sectors (AMZN = retail + cloud)
4. **Qualitative Factors**: Model doesn't capture management quality, brand value, ESG risks

### Investment Risks
- **Market Risk**: Entire market re-rating can overwhelm individual stock valuation
- **Liquidity Risk**: Large positions may face execution challenges
- **Event Risk**: Earnings misses, regulatory actions, macro shocks
- **Concentration Risk**: Top 20 large-caps = limited diversification

### Recommended Usage
- **Step 1**: Screen for undervalued candidates (score >50)
- **Step 2**: Deep-dive fundamental research on top picks
- **Step 3**: Verify value trap checks (business quality)
- **Step 4**: Identify near-term catalysts (timing)
- **Step 5**: Size positions based on conviction + risk

**This model is a screening tool, not a final investment decision.**

---

## 11. Appendix: Formulas Summary

### Free Cash Flow
```
FCF = Operating Cash Flow - Capital Expenditures
FCF per Share = FCF / Shares Outstanding
```

### Discounted Cash Flow (DCF)
```
PV of Cash Flows = Σ[FCF_t / (1+WACC)^t] for t=1 to 5

Terminal Value = FCF_5 × (1+g) / (WACC - g)

PV of Terminal Value = Terminal Value / (1+WACC)^5

Enterprise Value = PV of Cash Flows + PV of Terminal Value

Equity Value = Enterprise Value - Net Debt

Intrinsic Value per Share = Equity Value / Shares Outstanding
```

### Return on Invested Capital (ROIC)
```
ROIC = NOPAT / Invested Capital
NOPAT = Net Operating Profit After Tax
Invested Capital = Total Assets - Non-Interest Bearing Current Liabilities
```

### Price-to-Book (P/B)
```
Book Value = Total Equity
Book Value per Share = Total Equity / Shares Outstanding
P/B Ratio = Price / Book Value per Share
```

### Income Quality
```
Income Quality = Operating Cash Flow / Net Income
```
- Ratio > 1.0: Earnings backed by cash (good)
- Ratio < 0.8: Earnings not converting to cash (warning)

---

## 12. Future Enhancements

Potential additions to strengthen framework:
1. **Quality Scoring**: Integrate moat ratings, Piotroski F-Score, Altman Z-Score
2. **Momentum Overlay**: Add technical indicators (RSI, moving averages) for entry timing
3. **Options Market**: Implied volatility, put/call ratios for sentiment
4. **Insider Transactions**: Track Form 4 filings for management conviction
5. **Analyst Revisions**: Sentiment momentum (upgrades/downgrades)
6. **Event Calendar**: Earnings dates, product launches, regulatory milestones
7. **Pair Trades**: Identify relative value within sectors (long/short)
8. **Backtest Framework**: Historical performance of model recommendations

---

**Document Version**: 1.0
**Last Updated**: 2026-01-25
**Author**: Investment Research Agent v6.0
**Contact**: See project repository for updates
