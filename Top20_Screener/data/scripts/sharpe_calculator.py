#!/usr/bin/env python3
"""
Sharpe Ratio Calculation Engine
================================
Dedicated module for calculating Sharpe ratios with explicit methodology documentation.

CALCULATION METHODOLOGY:
========================
Sharpe Ratio = (R_portfolio - R_risk_free) / sigma_portfolio

Where:
- R_portfolio: Annualized portfolio return
- R_risk_free: Annual risk-free rate (10-year US Treasury yield)
- sigma_portfolio: Annualized standard deviation of returns

CALCULATION STEPS:
1. Get daily adjusted close prices for the lookback period
2. Calculate daily log returns: r_t = ln(P_t / P_{t-1})
3. Calculate annualized return: R = (1 + geometric_mean(r))^252 - 1
4. Calculate annualized volatility: sigma = std(r) * sqrt(252)
5. Get risk-free rate from US Treasury yield
6. Compute Sharpe: (R - Rf) / sigma

WINDOWS:
- 1-Year Sharpe: 252 trading days
- 3-Year Sharpe: 756 trading days (PRIMARY)
- 5-Year Sharpe: 1260 trading days

RISK-FREE RATE:
- Source: 10-Year US Treasury Constant Maturity Rate
- Current Rate: ~4.5% (as of 2026-01-26)
- Update: Retrieved at calculation time from FMP API

DATA REQUIREMENTS:
- Minimum 252 trading days for 1Y Sharpe
- Use adjusted close prices (accounts for dividends, splits)
- Handle missing data by forward-filling up to 5 days

Version: 2.0
Date: 2026-01-26
Author: Investment Research System
"""

import numpy as np
import pandas as pd
import sqlite3
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import logging
import os

# Configuration
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h7FVfb"
FMP_BASE_URL = "https://financialmodelingprep.com"

BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
DB_PATH = f"{BASE_DIR}/data/market_data.db"
OUTPUT_DIR = f"{BASE_DIR}/data/processed"
LOG_PATH = f"{BASE_DIR}/data/sharpe_calculator.log"

# Trading days per year
TRADING_DAYS_PER_YEAR = 252

# Default risk-free rate if API fails (10Y Treasury as of 2026-01)
DEFAULT_RISK_FREE_RATE = 0.045  # 4.5%

# Minimum data requirements
MIN_DAYS_1Y = 252
MIN_DAYS_3Y = 756
MIN_DAYS_5Y = 1260

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_PATH),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class TreasuryRateProvider:
    """Provides risk-free rate from US Treasury data"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self._cached_rate = None
        self._cache_time = None
        self._cache_duration = timedelta(hours=24)

    def get_10y_treasury_rate(self) -> float:
        """
        Get current 10-Year US Treasury rate.
        Uses cache to avoid excessive API calls.
        """
        # Check cache
        if self._cached_rate and self._cache_time:
            if datetime.now() - self._cache_time < self._cache_duration:
                return self._cached_rate

        # Fetch from API
        try:
            url = f"{FMP_BASE_URL}/api/v4/treasury"
            params = {'from': (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'),
                     'to': datetime.now().strftime('%Y-%m-%d'),
                     'apikey': self.api_key}

            response = requests.get(url, params=params, timeout=10)
            data = response.json()

            if data and len(data) > 0:
                # Get most recent 10-year rate
                latest = data[0]
                rate = latest.get('year10') or latest.get('month10')
                if rate:
                    self._cached_rate = rate / 100  # Convert from percentage
                    self._cache_time = datetime.now()
                    logger.info(f"Treasury rate updated: {self._cached_rate:.4f}")
                    return self._cached_rate

        except Exception as e:
            logger.warning(f"Failed to fetch Treasury rate: {e}")

        # Return default if API fails
        logger.warning(f"Using default risk-free rate: {DEFAULT_RISK_FREE_RATE}")
        return DEFAULT_RISK_FREE_RATE


class SharpeCalculator:
    """
    Calculates Sharpe ratios with explicit methodology.

    METHODOLOGY NOTES:
    ------------------
    1. We use LOG RETURNS for daily calculations because they are:
       - Additive over time
       - More statistically robust
       - Better for volatility calculation

    2. We annualize using:
       - Return: Compound daily geometric mean over 252 days
       - Volatility: Daily std * sqrt(252)

    3. The formula assumes:
       - Returns are approximately normal (caveat: fat tails exist)
       - Volatility is relatively constant (caveat: volatility clustering)

    4. Interpretation benchmarks:
       - Sharpe < 0: Underperforming risk-free rate
       - 0-0.5: Below average
       - 0.5-1.0: Acceptable
       - 1.0-1.5: Good
       - 1.5-2.0: Very good
       - > 2.0: Excellent (rare for individual stocks)
    """

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.rate_provider = TreasuryRateProvider(FMP_API_KEY)
        self._risk_free_rate = None

    @property
    def risk_free_rate(self) -> float:
        """Get current risk-free rate (cached)"""
        if self._risk_free_rate is None:
            self._risk_free_rate = self.rate_provider.get_10y_treasury_rate()
        return self._risk_free_rate

    def get_price_data(self, symbol: str, days: int = MIN_DAYS_5Y) -> pd.DataFrame:
        """
        Retrieve adjusted close prices from database.

        Args:
            symbol: Stock ticker
            days: Number of trading days to retrieve

        Returns:
            DataFrame with date index and adj_close column
        """
        conn = sqlite3.connect(self.db_path)

        query = """
        SELECT date, adj_close
        FROM daily_prices
        WHERE symbol = ?
        ORDER BY date DESC
        LIMIT ?
        """

        df = pd.read_sql(query, conn, params=(symbol, days))
        conn.close()

        if df.empty:
            return pd.DataFrame()

        df['date'] = pd.to_datetime(df['date'])
        df = df.set_index('date').sort_index()

        # Forward-fill missing data (up to 5 days)
        df = df.ffill(limit=5)

        return df

    def calculate_returns(self, prices: pd.Series) -> pd.Series:
        """
        Calculate daily log returns.

        Log returns are preferred because:
        1. They are additive: ln(P2/P0) = ln(P2/P1) + ln(P1/P0)
        2. They are approximately normal for short periods
        3. They handle compounding correctly
        """
        # Filter out zero or negative prices
        valid_prices = prices[prices > 0]
        if len(valid_prices) < 2:
            return pd.Series(dtype=float)

        returns = np.log(valid_prices / valid_prices.shift(1))
        return returns.dropna()

    def calculate_sharpe_ratio(self, symbol: str, lookback_days: int) -> Dict:
        """
        Calculate Sharpe ratio for a given lookback period.

        Args:
            symbol: Stock ticker
            lookback_days: Number of trading days (252=1Y, 756=3Y, 1260=5Y)

        Returns:
            Dictionary with:
            - sharpe_ratio: The calculated Sharpe ratio
            - annualized_return: Geometric mean return, annualized
            - annualized_volatility: Standard deviation, annualized
            - risk_free_rate: The rate used
            - data_start_date: First price date used
            - data_end_date: Last price date used
            - trading_days: Actual days of data used
            - calculation_method: Description of method
        """
        result = {
            'symbol': symbol,
            'lookback_days': lookback_days,
            'sharpe_ratio': None,
            'annualized_return': None,
            'annualized_volatility': None,
            'risk_free_rate': self.risk_free_rate,
            'data_start_date': None,
            'data_end_date': None,
            'trading_days': 0,
            'data_quality': 'INSUFFICIENT',
            'calculation_method': 'Log returns, geometric mean, annualized'
        }

        # Get price data
        prices_df = self.get_price_data(symbol, lookback_days + 50)  # Extra buffer

        if prices_df.empty:
            result['data_quality'] = 'NO_DATA'
            return result

        prices = prices_df['adj_close']

        # Check data sufficiency
        if len(prices) < lookback_days * 0.9:  # Allow 10% missing
            result['data_quality'] = 'INSUFFICIENT'
            result['trading_days'] = len(prices)
            return result

        # Use most recent lookback_days
        prices = prices.tail(lookback_days)

        # Calculate returns
        returns = self.calculate_returns(prices)

        if len(returns) < lookback_days * 0.9:
            result['data_quality'] = 'INSUFFICIENT'
            result['trading_days'] = len(returns)
            return result

        # Record data range
        result['data_start_date'] = prices.index[0].strftime('%Y-%m-%d')
        result['data_end_date'] = prices.index[-1].strftime('%Y-%m-%d')
        result['trading_days'] = len(returns)

        # Calculate annualized return (geometric mean)
        # Using log returns: mean(log_returns) * 252
        daily_mean_log_return = returns.mean()
        annualized_return = np.exp(daily_mean_log_return * TRADING_DAYS_PER_YEAR) - 1

        # Alternative: using total return
        total_return = prices.iloc[-1] / prices.iloc[0] - 1
        years = len(returns) / TRADING_DAYS_PER_YEAR
        cagr = (1 + total_return) ** (1 / years) - 1

        # Use CAGR for final return (more accurate for long periods)
        result['annualized_return'] = cagr

        # Calculate annualized volatility
        daily_volatility = returns.std()
        annualized_volatility = daily_volatility * np.sqrt(TRADING_DAYS_PER_YEAR)
        result['annualized_volatility'] = annualized_volatility

        # Calculate Sharpe ratio
        if annualized_volatility > 0:
            sharpe = (cagr - self.risk_free_rate) / annualized_volatility
            result['sharpe_ratio'] = round(sharpe, 4)
            result['data_quality'] = 'COMPLETE'
        else:
            result['data_quality'] = 'ZERO_VOLATILITY'

        return result

    def calculate_all_timeframes(self, symbol: str) -> Dict:
        """
        Calculate Sharpe ratios for all standard timeframes (1Y, 3Y, 5Y).

        Returns comprehensive results for all periods.
        """
        result = {
            'symbol': symbol,
            'calculation_timestamp': datetime.now().isoformat(),
            'risk_free_rate': self.risk_free_rate,
            'risk_free_rate_source': '10-Year US Treasury'
        }

        # 1-Year Sharpe
        sharpe_1y = self.calculate_sharpe_ratio(symbol, MIN_DAYS_1Y)
        result['sharpe_1y'] = sharpe_1y['sharpe_ratio']
        result['return_1y'] = sharpe_1y['annualized_return']
        result['volatility_1y'] = sharpe_1y['annualized_volatility']
        result['data_quality_1y'] = sharpe_1y['data_quality']

        # 3-Year Sharpe (PRIMARY)
        sharpe_3y = self.calculate_sharpe_ratio(symbol, MIN_DAYS_3Y)
        result['sharpe_3y'] = sharpe_3y['sharpe_ratio']
        result['return_3y'] = sharpe_3y['annualized_return']
        result['volatility_3y'] = sharpe_3y['annualized_volatility']
        result['data_quality_3y'] = sharpe_3y['data_quality']

        # 5-Year Sharpe
        sharpe_5y = self.calculate_sharpe_ratio(symbol, MIN_DAYS_5Y)
        result['sharpe_5y'] = sharpe_5y['sharpe_ratio']
        result['return_5y'] = sharpe_5y['annualized_return']
        result['volatility_5y'] = sharpe_5y['annualized_volatility']
        result['data_quality_5y'] = sharpe_5y['data_quality']

        # Data range (from 5Y calculation)
        result['data_start_date'] = sharpe_5y['data_start_date']
        result['data_end_date'] = sharpe_5y['data_end_date']
        result['trading_days_available'] = sharpe_5y['trading_days']

        return result


def calculate_sharpe_for_universe(symbols: List[str]) -> pd.DataFrame:
    """
    Calculate Sharpe ratios for all symbols in the universe.

    Args:
        symbols: List of stock tickers

    Returns:
        DataFrame with Sharpe calculations for all symbols
    """
    logger.info(f"Calculating Sharpe ratios for {len(symbols)} symbols")
    logger.info(f"Risk-free rate: {DEFAULT_RISK_FREE_RATE:.4f}")

    calculator = SharpeCalculator()
    results = []

    for i, symbol in enumerate(symbols):
        try:
            result = calculator.calculate_all_timeframes(symbol)
            results.append(result)

            if (i + 1) % 100 == 0:
                logger.info(f"Progress: {i+1}/{len(symbols)} calculated")

        except Exception as e:
            logger.error(f"Error calculating {symbol}: {e}")
            results.append({
                'symbol': symbol,
                'sharpe_3y': None,
                'data_quality_3y': 'ERROR'
            })

    df = pd.DataFrame(results)
    logger.info(f"Calculation complete: {len(df)} results")

    return df


def save_sharpe_results(df: pd.DataFrame):
    """Save Sharpe calculation results"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Main output
    main_path = f"{OUTPUT_DIR}/sharpe_calculations.csv"
    df.to_csv(main_path, index=False)
    logger.info(f"Saved: {main_path}")

    # Summary statistics
    valid_df = df[df['sharpe_3y'].notna()]

    summary = {
        'calculation_date': datetime.now().isoformat(),
        'total_symbols': len(df),
        'valid_calculations': len(valid_df),
        'coverage_rate': len(valid_df) / len(df) if len(df) > 0 else 0,
        'sharpe_3y_mean': valid_df['sharpe_3y'].mean() if len(valid_df) > 0 else None,
        'sharpe_3y_median': valid_df['sharpe_3y'].median() if len(valid_df) > 0 else None,
        'sharpe_3y_std': valid_df['sharpe_3y'].std() if len(valid_df) > 0 else None,
        'sharpe_3y_min': valid_df['sharpe_3y'].min() if len(valid_df) > 0 else None,
        'sharpe_3y_max': valid_df['sharpe_3y'].max() if len(valid_df) > 0 else None,
    }

    # Percentile distribution
    if len(valid_df) > 0:
        for pct in [10, 25, 50, 75, 90]:
            summary[f'sharpe_3y_p{pct}'] = valid_df['sharpe_3y'].quantile(pct/100)

    import json
    summary_path = f"{OUTPUT_DIR}/sharpe_summary.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    logger.info(f"Saved: {summary_path}")


def main():
    """Main execution"""
    logger.info("=" * 60)
    logger.info("SHARPE RATIO CALCULATION ENGINE")
    logger.info("=" * 60)

    # Get symbols from database
    conn = sqlite3.connect(DB_PATH)
    symbols_df = pd.read_sql("SELECT DISTINCT symbol FROM daily_prices", conn)
    conn.close()

    symbols = symbols_df['symbol'].tolist()
    logger.info(f"Found {len(symbols)} symbols with price data")

    # Calculate Sharpe ratios
    results_df = calculate_sharpe_for_universe(symbols)

    # Save results
    save_sharpe_results(results_df)

    # Display top performers
    valid_df = results_df[results_df['sharpe_3y'].notna()]
    top20 = valid_df.nlargest(20, 'sharpe_3y')[
        ['symbol', 'sharpe_3y', 'return_3y', 'volatility_3y', 'data_quality_3y']
    ]

    logger.info("\nTop 20 by 3-Year Sharpe Ratio:")
    print(top20.to_string(index=False))

    logger.info("\nSharpe calculation completed successfully!")

    return results_df


if __name__ == "__main__":
    main()
