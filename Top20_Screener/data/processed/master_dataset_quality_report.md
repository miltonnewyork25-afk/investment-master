# Master Dataset Quality Report

Generated: 2026-01-26 10:31:41

## Overview

- Total Stocks: 503
- Total Fields: 79

## Field Coverage

| Field | Non-Null | Coverage |
|-------|----------|----------|
| dividend_yield | 0 | 0.0% |
| ev_ebitda | 0 | 0.0% |
| pb_ratio | 0 | 0.0% |
| pe_ratio | 0 | 0.0% |
| peg_ratio | 0 | 0.0% |
| price_to_fcf | 0 | 0.0% |
| ps_ratio | 0 | 0.0% |
| quick_ratio | 0 | 0.0% |
| shares_outstanding | 0 | 0.0% |
| ev_fcf | 461 | 91.7% |
| net_debt_to_ebitda | 491 | 97.6% |
| sharpe_5y | 494 | 98.2% |
| return_3y | 498 | 99.0% |
| sharpe_3y | 498 | 99.0% |
| volatility_3y | 498 | 99.0% |
| avg_daily_volume | 501 | 99.6% |
| beta_from_db | 501 | 99.6% |
| calmar_ratio | 501 | 99.6% |
| cvar_95_daily | 501 | 99.6% |
| downside_capture | 501 | 99.6% |
| max_drawdown_3y | 501 | 99.6% |
| max_drawdown_from_db | 501 | 99.6% |
| meets_mdd_threshold | 501 | 99.6% |
| risk_calculation_date | 501 | 99.6% |
| sharpe_from_db | 501 | 99.6% |
| sortino_from_db | 501 | 99.6% |
| sortino_ratio | 501 | 99.6% |
| upside_capture | 501 | 99.6% |
| var_95_daily | 501 | 99.6% |
| volatility_from_db | 501 | 99.6% |

## Sector Distribution

- Technology: 88 (17.5%)
- Industrials: 75 (14.9%)
- Financial Services: 70 (13.9%)
- Healthcare: 60 (11.9%)
- Consumer Cyclical: 51 (10.1%)
- Consumer Defensive: 36 (7.2%)
- Utilities: 32 (6.4%)
- Real Estate: 31 (6.2%)
- Energy: 23 (4.6%)
- Basic Materials: 20 (4.0%)
- Communication Services: 17 (3.4%)

## Key Statistics

| Metric | Mean | Median | Min | Max |
|--------|------|--------|-----|-----|
| Market Cap | $132.9B | $40.1B | $6.1B | $4569.2B |
| Sharpe 3Y | 0.363 | 0.267 | -1.050 | 3.719 |
| Max Drawdown 3Y | -0.443 | -0.421 | -0.990 | -0.172 |
| ROE | 0.194 | 0.144 | -4.746 | 11.102 |
| FCF Yield | 0.045 | 0.042 | -0.374 | 0.342 |

## Data Sources

1. **Company Data**: FMP API - company profile endpoint
2. **Financial Metrics**: FMP API - key-metrics-ttm, ratios-ttm
3. **Financial Statements**: FMP API - income/balance/cash-flow TTM
4. **Price Data**: FMP API - historical-price-full
5. **Risk Metrics**: Calculated from price history
6. **Sharpe Ratios**: Calculated per methodology doc

## Calculation Methodology References

- Sharpe Ratio: See `/data/scripts/sharpe_calculator.py`
- Tail Risk: See `/data/scripts/risk_calculator.py`
- Methodology Doc: See `/data/sharpe_calculation_methodology.md`