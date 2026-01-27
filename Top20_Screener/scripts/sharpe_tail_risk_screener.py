#!/usr/bin/env python3
"""
Sharpe + Tail Risk Screener
============================
Agent 4: Risk-Adjusted Return Screening System

Purpose: Calculate Sharpe ratios and tail risk metrics to identify stocks with
superior risk-adjusted returns while avoiding high-Sharpe-but-dangerous stocks.

Author: Investment Research System v6.0
Date: 2026-01-25
"""

import pandas as pd
import numpy as np
import yfinance as yf
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')

# ============================================================================
# CONFIGURATION
# ============================================================================

# Risk-free rate (5-year US Treasury as of 2026-01-25)
RISK_FREE_RATE = 0.042  # 4.2%
RF_SOURCE = "U.S. Treasury 5-Year Note, 2026-01-25"

# Time windows
LOOKBACK_YEARS = 5  # Primary analysis window
LOOKBACK_MONTHS = 60
ROLLING_WINDOW_YEARS = 3  # For stability analysis
ROLLING_WINDOW_MONTHS = 36

# Data configuration
DATA_START = "2021-01-01"
DATA_END = "2026-01-25"
FREQUENCY = "monthly"  # Use monthly returns to reduce noise

# Thresholds
SHARPE_THRESHOLDS = {
    'excellent': 1.5,
    'good': 1.0,
    'acceptable': 0.8,
    'minimum': 0.5
}

MDD_THRESHOLDS = {
    'excellent': -0.30,  # -30%
    'warning': -0.40,    # -40%
    'exclude': -0.50     # -50%
}

SORTINO_THRESHOLDS = {
    'excellent': 1.5,
    'good': 1.0,
    'acceptable': 0.8
}

CALMAR_THRESHOLDS = {
    'excellent': 1.0,
    'good': 0.7,
    'acceptable': 0.5
}

VAR_THRESHOLDS = {
    'excellent': -0.08,  # -8%
    'acceptable': -0.10  # -10%
}

CVAR_THRESHOLDS = {
    'excellent': -0.12,  # -12%
    'acceptable': -0.15  # -15%
}

# Scoring weights
SCORING_WEIGHTS = {
    'sharpe': 30,
    'sortino': 25,
    'calmar': 20,
    'mdd': 15,
    'var_cvar': 10
}

# ============================================================================
# CORE CALCULATION FUNCTIONS
# ============================================================================

def get_price_data(ticker: str, start_date: str, end_date: str) -> pd.Series:
    """
    Fetch adjusted close prices for a ticker.

    Uses Adjusted Close to account for:
    - Dividends
    - Stock splits
    - Corporate actions
    """
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(start=start_date, end=end_date)

        if df.empty:
            print(f"WARNING: No data for {ticker}")
            return pd.Series(dtype=float)

        # Use adjusted close if available, otherwise close
        if 'Close' in df.columns:
            prices = df['Close']
        else:
            print(f"WARNING: No close price for {ticker}")
            return pd.Series(dtype=float)

        return prices

    except Exception as e:
        print(f"ERROR fetching {ticker}: {str(e)}")
        return pd.Series(dtype=float)


def calculate_monthly_returns(prices: pd.Series) -> pd.Series:
    """Convert daily prices to monthly returns."""
    if len(prices) == 0:
        return pd.Series(dtype=float)

    # Resample to month-end prices
    monthly_prices = prices.resample('M').last()

    # Calculate returns
    returns = monthly_prices.pct_change().dropna()

    return returns


def calculate_sharpe_ratio(returns: pd.Series, risk_free_rate: float = RISK_FREE_RATE) -> float:
    """
    Calculate Sharpe Ratio.

    Formula: (Annualized Return - Risk Free Rate) / Annualized Volatility

    - Uses geometric mean (CAGR) for returns
    - Annualizes monthly volatility by sqrt(12)
    """
    if len(returns) < 12:  # Need at least 1 year
        return np.nan

    # Annualized return (geometric mean)
    total_return = (1 + returns).prod()
    n_years = len(returns) / 12
    cagr = total_return ** (1 / n_years) - 1

    # Annualized volatility
    annual_vol = returns.std() * np.sqrt(12)

    if annual_vol == 0:
        return np.nan

    sharpe = (cagr - risk_free_rate) / annual_vol

    return sharpe


def calculate_sortino_ratio(returns: pd.Series, risk_free_rate: float = RISK_FREE_RATE) -> float:
    """
    Calculate Sortino Ratio.

    Formula: (Annualized Return - Risk Free Rate) / Downside Deviation

    Only penalizes downside volatility (negative returns).
    """
    if len(returns) < 12:
        return np.nan

    # Annualized return
    total_return = (1 + returns).prod()
    n_years = len(returns) / 12
    cagr = total_return ** (1 / n_years) - 1

    # Downside deviation (only negative returns)
    downside_returns = returns[returns < 0]
    if len(downside_returns) == 0:
        return np.inf  # No downside = infinite Sortino

    downside_std = downside_returns.std() * np.sqrt(12)

    if downside_std == 0:
        return np.nan

    sortino = (cagr - risk_free_rate) / downside_std

    return sortino


def calculate_max_drawdown(prices: pd.Series) -> Tuple[float, str, str]:
    """
    Calculate Maximum Drawdown.

    Returns:
    - MDD value (negative)
    - Peak date
    - Trough date
    """
    if len(prices) == 0:
        return np.nan, None, None

    # Calculate running maximum
    running_max = prices.expanding().max()

    # Calculate drawdown series
    drawdown = (prices - running_max) / running_max

    # Find maximum drawdown
    mdd = drawdown.min()

    # Find peak and trough dates
    trough_date = drawdown.idxmin()
    peak_date = prices[:trough_date].idxmax()

    return mdd, str(peak_date.date()), str(trough_date.date())


def calculate_calmar_ratio(returns: pd.Series, mdd: float) -> float:
    """
    Calculate Calmar Ratio.

    Formula: Annualized Return / |Maximum Drawdown|

    Measures return per unit of drawdown risk.
    """
    if len(returns) < 12 or mdd == 0:
        return np.nan

    # Annualized return
    total_return = (1 + returns).prod()
    n_years = len(returns) / 12
    cagr = total_return ** (1 / n_years) - 1

    calmar = cagr / abs(mdd)

    return calmar


def calculate_var_cvar(returns: pd.Series, confidence: float = 0.95) -> Tuple[float, float]:
    """
    Calculate Value at Risk (VaR) and Conditional VaR (CVaR).

    VaR: Maximum loss at given confidence level (95%)
    CVaR: Average loss beyond VaR threshold

    Returns monthly values (not annualized).
    """
    if len(returns) < 20:  # Need reasonable sample
        return np.nan, np.nan

    # VaR at 95% confidence (5th percentile)
    var = returns.quantile(1 - confidence)

    # CVaR (expected loss beyond VaR)
    cvar = returns[returns <= var].mean()

    return var, cvar


def calculate_rolling_sharpe(returns: pd.Series, window_months: int = ROLLING_WINDOW_MONTHS) -> pd.Series:
    """
    Calculate rolling Sharpe ratio for stability analysis.

    Returns series of Sharpe ratios calculated over rolling windows.
    """
    if len(returns) < window_months:
        return pd.Series(dtype=float)

    rolling_sharpes = []

    for i in range(window_months, len(returns) + 1):
        window_returns = returns.iloc[i-window_months:i]
        sharpe = calculate_sharpe_ratio(window_returns)
        rolling_sharpes.append(sharpe)

    return pd.Series(rolling_sharpes)


# ============================================================================
# SCORING FUNCTIONS
# ============================================================================

def score_sharpe(sharpe: float) -> float:
    """Score Sharpe ratio (0-30 points)."""
    if pd.isna(sharpe):
        return 0

    if sharpe >= SHARPE_THRESHOLDS['excellent']:
        return SCORING_WEIGHTS['sharpe']
    elif sharpe >= SHARPE_THRESHOLDS['good']:
        return SCORING_WEIGHTS['sharpe'] * 0.67
    elif sharpe >= SHARPE_THRESHOLDS['acceptable']:
        return SCORING_WEIGHTS['sharpe'] * 0.50
    else:
        return 0


def score_sortino(sortino: float) -> float:
    """Score Sortino ratio (0-25 points)."""
    if pd.isna(sortino) or sortino == np.inf:
        return 0

    if sortino >= SORTINO_THRESHOLDS['excellent']:
        return SCORING_WEIGHTS['sortino']
    elif sortino >= SORTINO_THRESHOLDS['good']:
        return SCORING_WEIGHTS['sortino'] * 0.72
    elif sortino >= SORTINO_THRESHOLDS['acceptable']:
        return SCORING_WEIGHTS['sortino'] * 0.48
    else:
        return 0


def score_calmar(calmar: float) -> float:
    """Score Calmar ratio (0-20 points)."""
    if pd.isna(calmar):
        return 0

    if calmar >= CALMAR_THRESHOLDS['excellent']:
        return SCORING_WEIGHTS['calmar']
    elif calmar >= CALMAR_THRESHOLDS['good']:
        return SCORING_WEIGHTS['calmar'] * 0.75
    elif calmar >= CALMAR_THRESHOLDS['acceptable']:
        return SCORING_WEIGHTS['calmar'] * 0.50
    else:
        return 0


def score_mdd(mdd: float) -> float:
    """Score Maximum Drawdown (0-15 points)."""
    if pd.isna(mdd):
        return 0

    if mdd > MDD_THRESHOLDS['excellent']:
        return SCORING_WEIGHTS['mdd']
    elif mdd > MDD_THRESHOLDS['warning']:
        return SCORING_WEIGHTS['mdd'] * 0.67
    elif mdd > MDD_THRESHOLDS['exclude']:
        return SCORING_WEIGHTS['mdd'] * 0.33
    else:
        return 0  # Exclude if MDD worse than -50%


def score_var_cvar(var: float, cvar: float) -> float:
    """Score VaR and CVaR (0-10 points)."""
    if pd.isna(var) or pd.isna(cvar):
        return 0

    if var > VAR_THRESHOLDS['excellent'] and cvar > CVAR_THRESHOLDS['excellent']:
        return SCORING_WEIGHTS['var_cvar']
    elif var > VAR_THRESHOLDS['acceptable'] and cvar > CVAR_THRESHOLDS['acceptable']:
        return SCORING_WEIGHTS['var_cvar'] * 0.60
    else:
        return 0


def calculate_total_score(metrics: Dict) -> float:
    """Calculate total risk-adjusted score (0-100)."""
    score = 0

    score += score_sharpe(metrics.get('sharpe', np.nan))
    score += score_sortino(metrics.get('sortino', np.nan))
    score += score_calmar(metrics.get('calmar', np.nan))
    score += score_mdd(metrics.get('mdd', np.nan))
    score += score_var_cvar(metrics.get('var_95', np.nan), metrics.get('cvar_95', np.nan))

    return round(score, 2)


# ============================================================================
# MAIN ANALYSIS FUNCTION
# ============================================================================

def analyze_ticker(ticker: str) -> Dict:
    """
    Comprehensive risk analysis for a single ticker.

    Returns dictionary with all metrics.
    """
    print(f"Analyzing {ticker}...")

    # Initialize result dictionary
    result = {
        'ticker': ticker,
        'data_quality': 'UNKNOWN',
        'data_start': None,
        'data_end': None,
        'months_analyzed': 0
    }

    # Fetch price data
    prices = get_price_data(ticker, DATA_START, DATA_END)

    if len(prices) == 0:
        result['data_quality'] = 'NO_DATA'
        return result

    # Record data info
    result['data_start'] = str(prices.index[0].date())
    result['data_end'] = str(prices.index[-1].date())

    # Calculate monthly returns
    returns = calculate_monthly_returns(prices)
    result['months_analyzed'] = len(returns)

    if len(returns) < 36:  # Less than 3 years
        result['data_quality'] = 'INSUFFICIENT'
        return result
    elif len(returns) < 60:  # 3-5 years
        result['data_quality'] = 'PARTIAL'
    else:
        result['data_quality'] = 'COMPLETE'

    # Calculate core metrics
    result['sharpe'] = calculate_sharpe_ratio(returns)
    result['sortino'] = calculate_sortino_ratio(returns)

    mdd, peak_date, trough_date = calculate_max_drawdown(prices)
    result['mdd'] = mdd
    result['mdd_peak_date'] = peak_date
    result['mdd_trough_date'] = trough_date

    result['calmar'] = calculate_calmar_ratio(returns, mdd)

    var, cvar = calculate_var_cvar(returns)
    result['var_95'] = var
    result['cvar_95'] = cvar

    # Calculate CAGR and volatility for reference
    if len(returns) >= 12:
        total_return = (1 + returns).prod()
        n_years = len(returns) / 12
        result['cagr'] = total_return ** (1 / n_years) - 1
        result['annual_vol'] = returns.std() * np.sqrt(12)
    else:
        result['cagr'] = np.nan
        result['annual_vol'] = np.nan

    # Rolling Sharpe analysis (stability)
    if len(returns) >= ROLLING_WINDOW_MONTHS:
        rolling_sharpes = calculate_rolling_sharpe(returns)
        result['rolling_sharpe_mean'] = rolling_sharpes.mean()
        result['rolling_sharpe_std'] = rolling_sharpes.std()
        result['rolling_sharpe_min'] = rolling_sharpes.min()
        result['sharpe_consistency'] = (rolling_sharpes > 1.0).sum() / len(rolling_sharpes)
    else:
        result['rolling_sharpe_mean'] = np.nan
        result['rolling_sharpe_std'] = np.nan
        result['rolling_sharpe_min'] = np.nan
        result['sharpe_consistency'] = np.nan

    # Calculate component scores
    result['sharpe_score'] = score_sharpe(result['sharpe'])
    result['sortino_score'] = score_sortino(result['sortino'])
    result['calmar_score'] = score_calmar(result['calmar'])
    result['mdd_score'] = score_mdd(result['mdd'])
    result['var_cvar_score'] = score_var_cvar(result['var_95'], result['cvar_95'])

    # Total risk-adjusted score
    result['risk_adjusted_score'] = calculate_total_score(result)

    return result


def classify_tier(metrics: Dict) -> str:
    """
    Classify stock into quality tier based on metrics.

    Tier 1: Premium quality
    Tier 2: Acceptable quality
    Tier 3: Below threshold
    """
    score = metrics.get('risk_adjusted_score', 0)
    sharpe = metrics.get('sharpe', 0)
    mdd = metrics.get('mdd', 0)

    # Tier 1: Excellent risk-adjusted returns
    if score >= 70 and sharpe >= 1.0 and mdd > -0.30:
        return 'TIER_1_PREMIUM'

    # Tier 2: Good risk-adjusted returns
    elif score >= 50 and sharpe >= 0.8 and mdd > -0.40:
        return 'TIER_2_ACCEPTABLE'

    # Tier 3: Below threshold
    else:
        return 'TIER_3_EXCLUDED'


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Main execution function."""

    print("=" * 80)
    print("SHARPE + TAIL RISK SCREENER")
    print("=" * 80)
    print(f"Analysis Period: {DATA_START} to {DATA_END}")
    print(f"Risk-Free Rate: {RISK_FREE_RATE:.2%} ({RF_SOURCE})")
    print(f"Lookback Window: {LOOKBACK_YEARS} years ({LOOKBACK_MONTHS} months)")
    print("=" * 80)
    print()

    # Define stock universe
    # This is a representative sample across sectors and market caps
    stock_universe = [
        # Mega-cap Tech
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA',

        # Large-cap Quality
        'JPM', 'V', 'MA', 'UNH', 'JNJ', 'PG', 'HD', 'DIS', 'NFLX',

        # Growth Tech
        'ADBE', 'CRM', 'NOW', 'INTU', 'SNOW', 'DDOG', 'NET', 'PLTR',

        # Semiconductors
        'AMD', 'INTC', 'QCOM', 'AVGO', 'AMAT', 'LRCX', 'KLAC', 'ASML',

        # Finance
        'BRK-B', 'BAC', 'WFC', 'GS', 'MS', 'C', 'SCHW', 'BLK',

        # Healthcare
        'LLY', 'ABBV', 'MRK', 'TMO', 'ABT', 'DHR', 'ISRG', 'VRTX',

        # Consumer
        'WMT', 'COST', 'NKE', 'SBUX', 'MCD', 'TGT', 'LOW',

        # Industrial
        'CAT', 'DE', 'BA', 'HON', 'UPS', 'RTX', 'LMT', 'GE',

        # Energy
        'XOM', 'CVX', 'COP', 'SLB', 'EOG', 'PSX', 'MPC', 'VLO',

        # REITs
        'PLD', 'AMT', 'CCI', 'EQIX', 'PSA', 'DLR', 'O', 'VICI',

        # Defensive
        'KO', 'PEP', 'WMT', 'MDLZ', 'CL', 'GIS', 'K',

        # High-volatility (for contrast)
        'ARKK', 'TQQQ', 'SOXL', 'GME', 'AMC', 'COIN', 'RIOT'
    ]

    # Remove duplicates
    stock_universe = sorted(list(set(stock_universe)))

    print(f"Analyzing {len(stock_universe)} stocks...")
    print()

    # Analyze all tickers
    results = []

    for ticker in stock_universe:
        try:
            result = analyze_ticker(ticker)
            result['tier'] = classify_tier(result)
            results.append(result)
        except Exception as e:
            print(f"ERROR analyzing {ticker}: {str(e)}")
            continue

    print()
    print("=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)

    # Convert to DataFrame
    df = pd.DataFrame(results)

    # Save output files
    output_dir = "/Users/milton/投资大师/Top20_Screener/risk_metrics"

    # 1. Sharpe Ratios
    sharpe_cols = ['ticker', 'sharpe', 'rolling_sharpe_mean', 'rolling_sharpe_std',
                   'rolling_sharpe_min', 'sharpe_consistency', 'data_quality', 'months_analyzed']
    df[sharpe_cols].to_csv(f"{output_dir}/sharpe_ratios.csv", index=False)

    # 2. Tail Risk
    tail_cols = ['ticker', 'mdd', 'mdd_peak_date', 'mdd_trough_date',
                 'sortino', 'calmar', 'var_95', 'cvar_95']
    df[tail_cols].to_csv(f"{output_dir}/tail_risk.csv", index=False)

    # 3. Risk-Adjusted Scores
    score_cols = ['ticker', 'risk_adjusted_score', 'sharpe_score', 'sortino_score',
                  'calmar_score', 'mdd_score', 'var_cvar_score', 'tier']
    df[score_cols].to_csv(f"{output_dir}/risk_adjusted_scores.csv", index=False)

    # 4. Complete metrics
    df.to_csv(f"{output_dir}/complete_metrics.csv", index=False)

    # 5. Tier classifications
    tier1 = df[df['tier'] == 'TIER_1_PREMIUM'].sort_values('risk_adjusted_score', ascending=False)
    tier2 = df[df['tier'] == 'TIER_2_ACCEPTABLE'].sort_values('risk_adjusted_score', ascending=False)
    tier3 = df[df['tier'] == 'TIER_3_EXCLUDED'].sort_values('risk_adjusted_score', ascending=False)

    tier1.to_csv(f"{output_dir}/tier1_premium.csv", index=False)
    tier2.to_csv(f"{output_dir}/tier2_acceptable.csv", index=False)
    tier3.to_csv(f"{output_dir}/tier3_excluded.csv", index=False)

    print(f"\nTier 1 (Premium): {len(tier1)} stocks")
    print(f"Tier 2 (Acceptable): {len(tier2)} stocks")
    print(f"Tier 3 (Excluded): {len(tier3)} stocks")
    print()
    print(f"Output files saved to: {output_dir}/")
    print()

    # Display top performers
    print("=" * 80)
    print("TOP 20 BY RISK-ADJUSTED SCORE")
    print("=" * 80)
    top20 = df.nlargest(20, 'risk_adjusted_score')[
        ['ticker', 'risk_adjusted_score', 'sharpe', 'sortino', 'mdd', 'tier']
    ]
    print(top20.to_string(index=False))
    print()


if __name__ == "__main__":
    main()
