# Sharpe Ratio Calculation Methodology

## Overview

This document details the methodology for calculating risk-adjusted return metrics used in the Top20 Screener system.

## Data Sources

- **Price Data**: Financial Modeling Prep (FMP) API
- **Historical Period**: 5 years (rolling)
- **Frequency**: Daily adjusted close prices
- **Risk-Free Rate**: 5-Year US Treasury yield (current: 4.2% annual)

## Sharpe Ratio

### Formula

```
Sharpe Ratio = (Rp - Rf) / σp

Where:
- Rp = Annualized portfolio return
- Rf = Risk-free rate (4.2% annual)
- σp = Annualized standard deviation of excess returns
```

### Implementation Details

1. **Daily Returns Calculation**
   ```
   r_t = (P_t - P_{t-1}) / P_{t-1}
   ```

2. **Daily Risk-Free Rate Conversion**
   ```
   daily_rf = (1 + annual_rf)^(1/252) - 1
   daily_rf = (1 + 0.042)^(1/252) - 1 ≈ 0.000163
   ```

3. **Excess Returns**
   ```
   excess_return_t = r_t - daily_rf
   ```

4. **Annualization**
   ```
   Sharpe = (mean(excess_returns) × 252) / (std(returns) × √252)
   ```

### Data Requirements

- **Minimum**: 252 trading days (1 year)
- **Standard**: 1260 trading days (5 years)
- **Outlier Handling**: Winsorize at 99th percentile to handle extreme events

### Interpretation

| Sharpe Ratio | Interpretation |
|--------------|----------------|
| < 0 | Negative risk-adjusted returns (underperforming risk-free rate) |
| 0 - 1 | Sub-optimal risk-adjusted returns |
| 1 - 2 | Good risk-adjusted returns |
| 2 - 3 | Very good risk-adjusted returns |
| > 3 | Excellent risk-adjusted returns (rare in equity markets) |

## Sortino Ratio

### Formula

```
Sortino Ratio = (Rp - Rf) / σd

Where:
- σd = Downside deviation (standard deviation of negative returns only)
```

### Key Differences from Sharpe

- **Downside Focus**: Only penalizes downside volatility
- **Asymmetric Risk**: More appropriate for non-normal return distributions
- **Upside Preservation**: Doesn't penalize positive volatility

### Implementation

1. Filter for negative returns: `returns[returns < 0]`
2. Calculate downside standard deviation
3. Annualize using same methodology as Sharpe

## Maximum Drawdown

### Formula

```
Max Drawdown = min((P_t - Peak_t) / Peak_t)

Where:
- Peak_t = Maximum price up to time t
- Drawdown_t = Percentage decline from peak
```

### Implementation

```python
cummax = prices.cummax()
drawdown = (prices - cummax) / cummax
max_drawdown = drawdown.min()
```

### Interpretation

- **Measure**: Worst peak-to-trough decline
- **Purpose**: Quantifies maximum historical loss
- **Use Case**: Risk tolerance assessment

| Max Drawdown | Risk Level |
|--------------|------------|
| > -10% | Low volatility |
| -10% to -20% | Moderate volatility |
| -20% to -40% | High volatility |
| < -40% | Extreme volatility |

## Beta (Market Sensitivity)

### Formula

```
β = Cov(R_stock, R_market) / Var(R_market)

Where:
- R_stock = Stock returns
- R_market = S&P 500 (SPY) returns
```

### Implementation

1. Align stock and market returns by date
2. Calculate covariance of daily returns
3. Divide by variance of market returns
4. No annualization needed (beta is dimensionless)

### Interpretation

| Beta | Market Sensitivity |
|------|-------------------|
| < 0 | Inverse relationship (rare) |
| 0 - 0.5 | Low volatility / defensive |
| 0.5 - 1 | Below-market volatility |
| 1 | Moves with market |
| 1 - 1.5 | Above-market volatility |
| > 1.5 | High volatility / aggressive |

## Volatility (Annualized Standard Deviation)

### Formula

```
σ_annual = σ_daily × √252
```

### Implementation

```python
daily_std = returns.std()
annual_volatility = daily_std * np.sqrt(252)
```

### Benchmarks

| Asset Class | Typical Annual Volatility |
|-------------|---------------------------|
| US Treasuries | 5-10% |
| Investment Grade Bonds | 8-12% |
| Large Cap Stocks (S&P 500) | 15-20% |
| Small Cap Stocks | 20-30% |
| Individual Stocks | 25-60% |
| Crypto | 60-120% |

## Data Quality Standards

### Price Data Requirements

1. **Completeness**: ≥90% of trading days present
2. **Outlier Detection**: Flag daily returns >30%
3. **Corporate Actions**: Use adjusted close prices
4. **Survivorship Bias**: Include delisted stocks (where available)

### Validation Checks

1. **Price Continuity**: No gaps >5 trading days
2. **Volume Consistency**: Average volume >$5M daily
3. **Return Sanity**: Daily returns within [-50%, +100%] range
4. **Zero Returns**: Flag if >10% of days have zero returns

## Calculation Schedule

- **Update Frequency**: Daily (after market close)
- **Lookback Windows**:
  - 1 Year (252 days): Short-term risk
  - 3 Years (756 days): Medium-term risk
  - 5 Years (1260 days): Long-term risk
- **Rolling Calculation**: Update metrics as new data arrives

## Known Limitations

1. **Normal Distribution Assumption**: Sharpe assumes returns are normally distributed (often violated)
2. **Backward-Looking**: Historical metrics don't predict future risk
3. **Survivorship Bias**: Delisted stocks may have worse metrics
4. **Market Regime Changes**: Risk metrics can shift during crises
5. **Low Frequency**: Daily data may miss intraday volatility

## Risk-Free Rate Selection

### Current Methodology

- **Rate**: 5-Year US Treasury Constant Maturity
- **Source**: Federal Reserve H.15 report
- **Update Frequency**: Weekly
- **Current Value**: 4.2% (as of 2025-01-24)

### Rationale for 5-Year Rate

- Matches typical investment horizon
- More stable than 3-month T-bills
- Less volatile than 10-year bonds
- Industry standard for equity analysis

### Historical Context

| Period | 5Y Treasury Yield | Context |
|--------|------------------|---------|
| 2020-2021 | 0.3-1.0% | COVID-era low rates |
| 2022-2023 | 3.5-4.5% | Fed hiking cycle |
| 2024-2025 | 4.0-4.5% | Higher-for-longer regime |

## Example Calculation

### Stock: AAPL (Apple Inc.)

**Input Data**:
- Period: 2020-01-01 to 2025-01-24 (5 years)
- Daily prices: 1,260 observations
- Risk-free rate: 4.2% annual

**Step 1: Calculate Daily Returns**
```
Date       Close    Return
2020-01-02  75.09    -
2020-01-03  74.36    -0.97%
2020-01-06  74.95    +0.79%
...
```

**Step 2: Daily Risk-Free Rate**
```
daily_rf = (1.042)^(1/252) - 1 = 0.000163 = 0.0163%
```

**Step 3: Excess Returns**
```
excess_return = daily_return - 0.000163
```

**Step 4: Annualized Sharpe**
```
Mean excess return = 0.0012 (daily)
Std dev of returns = 0.025 (daily)

Sharpe = (0.0012 × 252) / (0.025 × √252)
       = 0.3024 / 0.3969
       = 0.76
```

**Interpretation**: AAPL's Sharpe ratio of 0.76 indicates sub-optimal risk-adjusted returns over this period, despite strong absolute performance.

## Code Reference

See implementation in `/Users/milton/投资大师/Top20_Screener/scripts/data_collector.py`:

- Class: `RiskCalculator`
- Methods:
  - `calculate_sharpe_ratio()`
  - `calculate_sortino_ratio()`
  - `calculate_max_drawdown()`
  - `calculate_beta()`

## Validation Against Industry Standards

### Comparison Sources

1. **Bloomberg Terminal**: Cross-check Sharpe calculations
2. **Morningstar**: Validate risk metrics for mutual funds
3. **FactSet**: Compare beta and volatility measures
4. **Yahoo Finance**: Verify historical price data

### Typical Discrepancies

- **Sharpe differences**: ±0.1 due to risk-free rate choice
- **Beta differences**: ±0.05 due to lookback period
- **Volatility**: ±1% due to calculation frequency

---

**Version**: 1.0
**Last Updated**: 2025-01-25
**Author**: Top20 Screener Data Team
