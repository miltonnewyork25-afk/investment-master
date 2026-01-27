# Sharpe + Tail Risk Screening Methodology

**Version**: 1.0
**Date**: 2026-01-25
**Author**: Investment Research Agent v6.0

---

## Executive Summary

This document details the complete methodology for calculating risk-adjusted returns using Sharpe ratios and tail risk metrics. The system identifies stocks with superior risk-adjusted performance while filtering out high-Sharpe-but-dangerous positions.

---

## 1. Data Configuration

### 1.1 Time Windows

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Primary Analysis Window** | 5 years (60 months) | Captures full market cycle including bull (2021-2022), bear (2023), and recovery (2024-2025) |
| **Rolling Window** | 3 years (36 months) | Tests Sharpe stability across different market regimes |
| **Data Frequency** | Monthly | Reduces noise vs daily while maintaining granularity |
| **Analysis Period** | 2021-01-01 to 2026-01-25 | Most recent complete 5-year period |

### 1.2 Risk-Free Rate

**Value**: 4.2% per annum
**Source**: U.S. Treasury 5-Year Note Yield
**Date**: 2026-01-25
**Rationale**: 5-year Treasury matches typical investment horizon and reflects current rate environment

### 1.3 Price Data

**Type**: Adjusted Close Price
**Source**: Yahoo Finance (yfinance library)
**Adjustments Included**:
- Dividend reinvestment
- Stock splits
- Reverse splits
- Spin-offs and mergers

**Quality Requirements**:
- Minimum 36 months (3 years) of data required
- 60 months (5 years) preferred for full analysis
- Missing data flagged as "PARTIAL" or "INSUFFICIENT"

---

## 2. Core Metrics Calculation

### 2.1 Sharpe Ratio

**Formula**:
```
Sharpe Ratio = (CAGR - Risk_Free_Rate) / Annual_Volatility
```

**Component Calculations**:

1. **CAGR (Compound Annual Growth Rate)**:
   ```
   Total_Return = Product(1 + Monthly_Returns)
   Years = Number_of_Months / 12
   CAGR = Total_Return^(1/Years) - 1
   ```

2. **Annual Volatility**:
   ```
   Monthly_Std = Standard_Deviation(Monthly_Returns)
   Annual_Vol = Monthly_Std × √12
   ```

3. **Sharpe Calculation**:
   ```
   Sharpe = (CAGR - 0.042) / Annual_Vol
   ```

**Interpretation Thresholds**:
| Sharpe Range | Quality | Meaning |
|--------------|---------|---------|
| ≥ 1.5 | Excellent | Outstanding risk-adjusted returns |
| 1.0 - 1.5 | Good | Strong risk-adjusted performance |
| 0.8 - 1.0 | Acceptable | Adequate compensation for risk |
| 0.5 - 0.8 | Poor | Marginal risk-adjusted returns |
| < 0.5 | Exclude | Insufficient compensation for risk |

**Why Monthly vs Daily**:
- Daily returns contain significant noise from market microstructure
- Monthly frequency better captures true investment dynamics
- Reduces impact of bid-ask spreads and intraday volatility

---

### 2.2 Sortino Ratio

**Formula**:
```
Sortino Ratio = (CAGR - Risk_Free_Rate) / Downside_Deviation
```

**Downside Deviation Calculation**:
```
Negative_Returns = Monthly_Returns[Monthly_Returns < 0]
Downside_Std = Standard_Deviation(Negative_Returns)
Downside_Deviation = Downside_Std × √12
```

**Rationale**:
- Sharpe treats upside and downside volatility equally
- Investors only care about downside risk
- Sortino isolates downside deviation
- Higher Sortino/Sharpe ratio indicates asymmetric return profile (more upside volatility)

**Interpretation Thresholds**:
| Sortino Range | Quality |
|---------------|---------|
| ≥ 1.5 | Excellent |
| 1.0 - 1.5 | Good |
| 0.8 - 1.0 | Acceptable |
| < 0.8 | Poor |

---

### 2.3 Maximum Drawdown (MDD)

**Formula**:
```
For each day t:
  Running_Max[t] = Max(Price[0:t])
  Drawdown[t] = (Price[t] - Running_Max[t]) / Running_Max[t]

MDD = Min(Drawdown)
```

**Output**:
- MDD value (e.g., -35% means 35% decline from peak)
- Peak date (highest price before decline)
- Trough date (lowest price during decline)

**Interpretation Thresholds**:
| MDD Range | Quality | Action |
|-----------|---------|--------|
| > -30% | Excellent | Strong downside protection |
| -30% to -40% | Warning | Moderate tail risk |
| -40% to -50% | Poor | High tail risk |
| < -50% | Exclude | Unacceptable drawdown risk |

**Why MDD Matters**:
- High Sharpe can hide extreme tail events
- -50% drawdown requires +100% gain to recover
- Behavioral: Large drawdowns trigger panic selling
- Practical: Margin calls, forced liquidations

---

### 2.4 Calmar Ratio

**Formula**:
```
Calmar Ratio = CAGR / |MDD|
```

**Example**:
- Stock A: 20% CAGR, -40% MDD → Calmar = 0.50
- Stock B: 15% CAGR, -20% MDD → Calmar = 0.75 (better)

**Interpretation**:
- Measures return per unit of drawdown risk
- Higher is better
- Complements Sharpe by explicitly penalizing drawdowns

**Thresholds**:
| Calmar Range | Quality |
|--------------|---------|
| ≥ 1.0 | Excellent |
| 0.7 - 1.0 | Good |
| 0.5 - 0.7 | Acceptable |
| < 0.5 | Poor |

---

### 2.5 Value at Risk (VaR) & Conditional VaR (CVaR)

**VaR at 95% Confidence**:
```
VaR_95 = 5th Percentile of Monthly Returns
```

**Interpretation**:
- "95% of the time, monthly loss won't exceed X%"
- Example: VaR = -8% means 5% chance of losing >8% in a month

**CVaR (Expected Shortfall)**:
```
CVaR = Average(Monthly_Returns where Monthly_Returns ≤ VaR)
```

**Interpretation**:
- "When losses exceed VaR, average loss is X%"
- Captures tail risk severity
- More informative than VaR alone

**Thresholds**:
| Metric | Excellent | Acceptable |
|--------|-----------|------------|
| VaR(95%) | > -8% | > -10% |
| CVaR | > -12% | > -15% |

**Example**:
- Stock with VaR = -7%, CVaR = -11%:
  - 95% of months: loss < 7%
  - Worst 5% of months: average loss 11%

---

## 3. Rolling Window Analysis (Stability)

### 3.1 Rolling Sharpe Calculation

**Method**:
```
For each 36-month window:
  Calculate Sharpe Ratio
  Store result

Output:
  - Rolling_Sharpe_Mean
  - Rolling_Sharpe_Std (stability measure)
  - Rolling_Sharpe_Min (worst period)
  - Consistency (% of windows with Sharpe > 1.0)
```

### 3.2 Stability Metrics

**Rolling Sharpe Standard Deviation**:
- Low Std (< 0.3) → Consistent performance across regimes
- High Std (> 0.5) → Sharpe depends heavily on time period

**Rolling Sharpe Minimum**:
- Tests worst-case 3-year period
- Minimum > 0.6 → Acceptable even in worst window
- Minimum < 0 → Had multi-year underperformance

**Sharpe Consistency**:
```
Consistency = (Number of 3Y windows with Sharpe > 1.0) / Total Windows
```
- 70%+ consistency → Reliable risk-adjusted returns
- <50% consistency → Sharpe not stable

### 3.3 Why Rolling Analysis Matters

**Problem**: Single 5-year Sharpe can be misleading
- Stock might have great 2024-2025 but terrible 2021-2023
- One exceptional year can dominate average

**Solution**: Rolling windows test consistency
- Reveals regime-dependent performance
- Identifies lucky vs skillful returns

---

## 4. Risk-Adjusted Scoring System

### 4.1 Component Weights

Total Score: 0-100 points

| Component | Weight | Rationale |
|-----------|--------|-----------|
| **Sharpe Ratio** | 30 points | Primary risk-adjusted metric |
| **Sortino Ratio** | 25 points | Downside-focused refinement |
| **Calmar Ratio** | 20 points | Drawdown-adjusted returns |
| **Max Drawdown** | 15 points | Tail risk constraint |
| **VaR/CVaR** | 10 points | Extreme loss protection |

### 4.2 Sharpe Score (0-30 points)

| Sharpe Range | Points | Logic |
|--------------|--------|-------|
| ≥ 1.5 | 30 | Excellent |
| 1.0 - 1.5 | 20 | Good (67% of max) |
| 0.8 - 1.0 | 15 | Acceptable (50% of max) |
| < 0.8 | 0 | Below threshold |

### 4.3 Sortino Score (0-25 points)

| Sortino Range | Points | Logic |
|---------------|--------|-------|
| ≥ 1.5 | 25 | Excellent |
| 1.0 - 1.5 | 18 | Good (72% of max) |
| 0.8 - 1.0 | 12 | Acceptable (48% of max) |
| < 0.8 | 0 | Below threshold |

### 4.4 Calmar Score (0-20 points)

| Calmar Range | Points | Logic |
|--------------|--------|-------|
| ≥ 1.0 | 20 | Excellent |
| 0.7 - 1.0 | 15 | Good (75% of max) |
| 0.5 - 0.7 | 10 | Acceptable (50% of max) |
| < 0.5 | 0 | Below threshold |

### 4.5 MDD Score (0-15 points)

| MDD Range | Points | Logic |
|-----------|--------|-------|
| > -30% | 15 | Excellent downside protection |
| -30% to -40% | 10 | Moderate tail risk (67% of max) |
| -40% to -50% | 5 | High tail risk (33% of max) |
| < -50% | 0 | **EXCLUDE** |

### 4.6 VaR/CVaR Score (0-10 points)

| Condition | Points | Logic |
|-----------|--------|-------|
| VaR > -8% AND CVaR > -12% | 10 | Excellent tail protection |
| VaR > -10% AND CVaR > -15% | 6 | Acceptable tail risk (60% of max) |
| Other | 0 | Poor tail characteristics |

---

## 5. Tier Classification

### 5.1 Tier Definitions

**Tier 1: Premium Quality**
```
Criteria (ALL must be met):
- Risk_Adjusted_Score ≥ 70
- Sharpe ≥ 1.0
- MDD > -30%

Interpretation:
- Superior risk-adjusted returns
- Strong downside protection
- Suitable for core portfolio positions
```

**Tier 2: Acceptable Quality**
```
Criteria (ALL must be met):
- Risk_Adjusted_Score ≥ 50
- Sharpe ≥ 0.8
- MDD > -40%

Interpretation:
- Good risk-adjusted returns
- Moderate tail risk
- Suitable for satellite positions
```

**Tier 3: Excluded**
```
Criteria:
- Fails Tier 2 thresholds

Interpretation:
- Insufficient risk-adjusted returns
- High tail risk
- Not recommended
```

### 5.2 Tier Distribution Expectations

Based on historical market behavior:

| Tier | Expected % | Typical Count (100 stocks) |
|------|-----------|----------------------------|
| Tier 1 | 10-20% | 10-20 stocks |
| Tier 2 | 20-30% | 20-30 stocks |
| Tier 3 | 50-70% | 50-70 stocks |

**Interpretation**:
- If Tier 1 > 25% → Overly lax thresholds or exceptional market
- If Tier 1 < 5% → Overly strict thresholds or poor market

---

## 6. Data Quality Classification

### 6.1 Quality Flags

| Flag | Condition | Action |
|------|-----------|--------|
| **COMPLETE** | ≥ 60 months data | Full analysis |
| **PARTIAL** | 36-59 months | Analyze with caveat |
| **INSUFFICIENT** | < 36 months | Flag, do not exclude |
| **NO_DATA** | 0 months | Exclude from analysis |

### 6.2 IPO Handling

**Recent IPOs** (< 5 years):
- Use available data (minimum 3 years)
- Mark as "PARTIAL" quality
- Note: Sharpe may be biased (survivorship, IPO pop)
- Lower priority vs mature companies

**Very Recent IPOs** (< 3 years):
- Mark as "INSUFFICIENT"
- Calculate metrics but flag unreliability
- Do not use for primary screening

---

## 7. Special Considerations

### 7.1 High Dividend Stocks

**Issue**: Price return understates total return

**Solution**: Use Adjusted Close Price
- Automatically reinvests dividends
- Reflects true investor returns

**Verification**:
- Compare stock with/without high dividend
- REIT should show proper total return

### 7.2 Stock Splits

**Issue**: Splits distort price history

**Solution**: Use Adjusted Close Price
- Automatically adjusts for splits/reverse splits
- Historical prices normalized

### 7.3 Leveraged ETFs

**Issue**: Volatility decay distorts Sharpe

**Example**:
- TQQQ (3x Nasdaq): High volatility from leverage
- Sharpe likely poor despite tracking good index
- MDD extremely severe (-80%+)

**Treatment**:
- Include in analysis for contrast
- Expected to fall into Tier 3
- Illustrates importance of tail risk metrics

### 7.4 Cryptocurrency Exposure

**Stocks with crypto exposure** (COIN, RIOT, MSTR):
- Expected high volatility
- Likely poor Sharpe despite potential high returns
- Large drawdowns during crypto bear markets

---

## 8. Output Files Specification

### 8.1 File Structure

```
/Top20_Screener/risk_metrics/
├── sharpe_ratios.csv          # Sharpe and rolling metrics
├── tail_risk.csv              # MDD, Sortino, Calmar, VaR/CVaR
├── risk_adjusted_scores.csv   # Scores and tier classification
├── complete_metrics.csv       # All metrics combined
├── tier1_premium.csv          # Tier 1 stocks only
├── tier2_acceptable.csv       # Tier 2 stocks only
├── tier3_excluded.csv         # Tier 3 stocks only
└── methodology.md             # This document
```

### 8.2 Column Definitions

**sharpe_ratios.csv**:
```
ticker                  : Stock ticker symbol
sharpe                  : 5-year Sharpe Ratio
rolling_sharpe_mean     : Mean of 3-year rolling Sharpe
rolling_sharpe_std      : Std dev of rolling Sharpe (stability)
rolling_sharpe_min      : Minimum rolling Sharpe (worst period)
sharpe_consistency      : % of windows with Sharpe > 1.0
data_quality            : COMPLETE/PARTIAL/INSUFFICIENT
months_analyzed         : Number of monthly returns used
```

**tail_risk.csv**:
```
ticker              : Stock ticker symbol
mdd                 : Maximum drawdown (negative value)
mdd_peak_date       : Date of peak before drawdown
mdd_trough_date     : Date of trough during drawdown
sortino             : Sortino Ratio
calmar              : Calmar Ratio
var_95              : Value at Risk (95% confidence)
cvar_95             : Conditional VaR (expected shortfall)
```

**risk_adjusted_scores.csv**:
```
ticker              : Stock ticker symbol
risk_adjusted_score : Total score (0-100)
sharpe_score        : Sharpe component (0-30)
sortino_score       : Sortino component (0-25)
calmar_score        : Calmar component (0-20)
mdd_score           : MDD component (0-15)
var_cvar_score      : VaR/CVaR component (0-10)
tier                : TIER_1_PREMIUM / TIER_2_ACCEPTABLE / TIER_3_EXCLUDED
```

**complete_metrics.csv**:
- All columns from above files
- Plus: cagr, annual_vol, data_start, data_end

---

## 9. Validation Procedures

### 9.1 Sanity Checks

**Sharpe Ratio Bounds**:
```
Expected Range: -1.0 to 3.0
Action if |Sharpe| > 5:
  - Verify data quality
  - Check for errors in calculation
  - Investigate extreme events
```

**MDD Bounds**:
```
Expected Range: -10% to -80%
Action if MDD > 0:
  - Data error (should be negative)
Action if MDD < -90%:
  - Verify not a delisting/bankruptcy
  - Extremely high risk
```

**VaR/CVaR Relationship**:
```
Expected: CVaR < VaR (more negative)
Action if CVaR > VaR:
  - Calculation error
  - Recheck percentile logic
```

### 9.2 Cross-Metric Validation

**High Sharpe + High MDD** → Red Flag
```
Example: Sharpe = 1.5, MDD = -55%
Interpretation: Lottery-like returns (rare big gains, frequent small losses)
Action: Downgrade despite high Sharpe
```

**Sortino >> Sharpe** → Good Sign
```
Example: Sharpe = 1.2, Sortino = 1.8
Interpretation: Asymmetric returns (more upside volatility)
Action: Positive signal
```

**Low Sharpe + Low MDD** → Low Return
```
Example: Sharpe = 0.3, MDD = -15%
Interpretation: Low risk but also low return
Action: Not attractive (can get 4.2% risk-free)
```

### 9.3 Historical Benchmark Comparison

**Expected Ranges** (based on historical market):

| Asset Class | Typical Sharpe | Typical MDD |
|-------------|----------------|-------------|
| S&P 500 | 0.5 - 0.8 | -30% to -50% |
| Quality Large-Cap | 0.8 - 1.2 | -25% to -40% |
| Growth Tech | 0.3 - 0.7 | -40% to -70% |
| REITs | 0.4 - 0.9 | -30% to -50% |
| Leveraged ETFs | -0.5 to 0.5 | -70% to -95% |

---

## 10. Limitations and Biases

### 10.1 Survivorship Bias

**Issue**: Analysis only includes currently trading stocks
- Failed companies (delisted) excluded
- Overstates average Sharpe

**Mitigation**:
- Aware of bias, disclosed in reports
- Focus on relative ranking within survivors

### 10.2 Lookback Period Dependency

**Issue**: 5-year window captures specific market regime
- 2021-2025 includes COVID recovery, rate hikes, AI boom
- Different period would yield different Sharpe

**Mitigation**:
- Rolling window analysis tests stability
- Compare current Sharpe to historical range

### 10.3 Sharpe Ratio Assumptions

**Assumptions**:
1. Returns are normally distributed (often false)
2. Volatility is constant (often false)
3. Past predicts future (sometimes false)

**Mitigation**:
- Complement with tail risk metrics (VaR/CVaR)
- Use multiple metrics, not just Sharpe
- Acknowledge limitations in reports

### 10.4 Regime Change Risk

**Issue**: Future market regime may differ from past
- Rising rate environment (2022-2024) vs future cuts
- Tech dominance may fade
- Geopolitical shocks

**Mitigation**:
- Stress test under different scenarios
- Don't rely solely on historical metrics
- Qualitative analysis complements quantitative

---

## 11. Usage Guidelines

### 11.1 How to Use Scores

**Risk-Adjusted Score Interpretation**:

| Score Range | Use Case |
|-------------|----------|
| 70-100 | Core portfolio candidates |
| 50-70 | Satellite positions, tactical allocation |
| 30-50 | High conviction only (qualitative override) |
| 0-30 | Avoid or very small speculative allocation |

### 11.2 Score vs Qualitative Analysis

**Scores are necessary but not sufficient**:

**High Score ≠ Automatic Buy**:
- Check valuation (high score but expensive)
- Check business quality (mean reversion risk)
- Check catalysts (stagnant business)

**Low Score ≠ Automatic Sell**:
- Recent IPO with limited data
- Turnaround story (past poor, future bright)
- Deeply undervalued (risk/reward asymmetry)

### 11.3 Combining with Other Screens

**Recommended Multi-Factor Approach**:

1. **Risk Screen (This)**: Sharpe + Tail Risk → Tier 1/2
2. **Quality Screen**: ROIC, margins, moat
3. **Valuation Screen**: P/E, P/FCF, EV/EBITDA
4. **Momentum Screen**: Price trends, earnings revisions
5. **Final Filter**: Qualitative analysis + thesis

**Weight Allocation**:
- Risk metrics: 30%
- Quality: 30%
- Valuation: 25%
- Momentum: 15%

---

## 12. Maintenance and Updates

### 12.1 Data Refresh Frequency

**Recommended**:
- **Daily**: Price data (for active monitoring)
- **Monthly**: Full recalculation (after month-end close)
- **Quarterly**: Methodology review and threshold calibration

### 12.2 Threshold Recalibration

**When to recalibrate**:
- Market regime change (e.g., rate cuts)
- Risk-free rate changes significantly (>1%)
- Tier distribution differs from expected (>50% in Tier 1)

**Process**:
1. Re-run analysis with current data
2. Review tier distribution
3. Adjust thresholds if needed
4. Document changes in methodology

### 12.3 Version Control

**This Methodology**:
- Version: 1.0
- Date: 2026-01-25
- Author: Investment Research Agent v6.0

**Change Log**:
```
v1.0 (2026-01-25): Initial release
- Established core metrics and thresholds
- Defined 3-tier classification system
- Set risk-free rate at 4.2%
```

---

## 13. References and Data Sources

### 13.1 Risk-Free Rate

**Source**: U.S. Department of Treasury
**URL**: https://www.treasury.gov/resource-center/data-chart-center/interest-rates/
**Specific Instrument**: 5-Year Treasury Constant Maturity Rate
**Date Retrieved**: 2026-01-25
**Value Used**: 4.2%

### 13.2 Price Data

**Provider**: Yahoo Finance
**Library**: yfinance (Python)
**Data Type**: Adjusted Close Price
**Adjustments**: Dividends, splits, corporate actions

### 13.3 Academic References

1. **Sharpe, W.F. (1966)**: "Mutual Fund Performance", Journal of Business
2. **Sortino, F. & Price, L. (1994)**: "Performance Measurement in a Downside Risk Framework"
3. **Young, T.W. (1991)**: "Calmar Ratio: A Smoother Tool"
4. **Artzner et al. (1999)**: "Coherent Measures of Risk" (CVaR foundation)

---

## Document Version

**Version**: 1.0
**Last Updated**: 2026-01-25
**Next Review**: 2026-04-25
**Document Owner**: Investment Research System v6.0

---

**End of Methodology Documentation**
