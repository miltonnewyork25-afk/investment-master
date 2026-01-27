#!/usr/bin/env python3
"""
Test and validate risk metric calculations
"""

import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime
import sys

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"


def test_sharpe_calculation():
    """Test Sharpe ratio calculation with known data"""
    print("=" * 60)
    print("Testing Sharpe Ratio Calculation")
    print("=" * 60)

    # Create sample returns (simulated AAPL-like performance)
    np.random.seed(42)
    n_days = 1260  # 5 years

    # Annualized return: 20%, volatility: 25%
    daily_mean = 0.20 / 252
    daily_std = 0.25 / np.sqrt(252)

    returns = np.random.normal(daily_mean, daily_std, n_days)
    returns_series = pd.Series(returns)

    # Calculate Sharpe
    rf_annual = 0.042
    rf_daily = (1 + rf_annual) ** (1/252) - 1

    excess_returns = returns_series - rf_daily
    sharpe = (excess_returns.mean() * 252) / (returns_series.std() * np.sqrt(252))

    print(f"\nSimulated Stock Performance:")
    print(f"  Daily Mean Return: {returns_series.mean():.6f}")
    print(f"  Daily Std Dev: {returns_series.std():.6f}")
    print(f"  Annualized Return: {returns_series.mean() * 252:.2%}")
    print(f"  Annualized Volatility: {returns_series.std() * np.sqrt(252):.2%}")
    print(f"\nRisk-Free Rate:")
    print(f"  Annual: {rf_annual:.2%}")
    print(f"  Daily: {rf_daily:.6f}")
    print(f"\nSharpe Ratio: {sharpe:.3f}")

    expected_sharpe = (0.20 - 0.042) / 0.25
    print(f"Expected Sharpe: {expected_sharpe:.3f}")
    print(f"Difference: {abs(sharpe - expected_sharpe):.3f}")

    if abs(sharpe - expected_sharpe) < 0.2:
        print("✓ Sharpe calculation PASSED")
    else:
        print("✗ Sharpe calculation FAILED")

    return sharpe


def test_sortino_calculation():
    """Test Sortino ratio calculation"""
    print("\n" + "=" * 60)
    print("Testing Sortino Ratio Calculation")
    print("=" * 60)

    np.random.seed(42)
    n_days = 1260

    # Create asymmetric returns (more downside volatility)
    returns = []
    for _ in range(n_days):
        if np.random.random() < 0.5:
            # Positive days: lower volatility
            returns.append(np.random.normal(0.0015, 0.015))
        else:
            # Negative days: higher volatility
            returns.append(np.random.normal(-0.0005, 0.025))

    returns_series = pd.Series(returns)

    rf_annual = 0.042
    rf_daily = (1 + rf_annual) ** (1/252) - 1

    # Sharpe
    excess_returns = returns_series - rf_daily
    sharpe = (excess_returns.mean() * 252) / (returns_series.std() * np.sqrt(252))

    # Sortino
    downside_returns = returns_series[returns_series < 0]
    downside_std = downside_returns.std()
    sortino = (excess_returns.mean() * 252) / (downside_std * np.sqrt(252))

    print(f"\nReturn Statistics:")
    print(f"  Mean Return: {returns_series.mean():.6f}")
    print(f"  Total Volatility: {returns_series.std():.6f}")
    print(f"  Downside Volatility: {downside_std:.6f}")
    print(f"\nRisk-Adjusted Metrics:")
    print(f"  Sharpe Ratio: {sharpe:.3f}")
    print(f"  Sortino Ratio: {sortino:.3f}")
    print(f"  Sortino/Sharpe: {sortino/sharpe:.2f}x")

    print("\n✓ Sortino calculation completed")
    return sortino


def test_max_drawdown():
    """Test maximum drawdown calculation"""
    print("\n" + "=" * 60)
    print("Testing Maximum Drawdown Calculation")
    print("=" * 60)

    # Create price series with known drawdown
    dates = pd.date_range('2020-01-01', periods=500, freq='D')
    prices = [100]

    # Simulate growth then crash
    for i in range(1, 200):
        prices.append(prices[-1] * (1 + np.random.normal(0.001, 0.015)))

    # 40% crash
    for i in range(200, 250):
        prices.append(prices[-1] * (1 - 0.015))

    # Recovery
    for i in range(250, 500):
        prices.append(prices[-1] * (1 + np.random.normal(0.002, 0.015)))

    prices_series = pd.Series(prices, index=dates)

    # Calculate max drawdown
    cummax = prices_series.cummax()
    drawdown = (prices_series - cummax) / cummax
    max_dd = drawdown.min()

    print(f"\nPrice Series Statistics:")
    print(f"  Start Price: ${prices_series.iloc[0]:.2f}")
    print(f"  Peak Price: ${prices_series.max():.2f}")
    print(f"  End Price: ${prices_series.iloc[-1]:.2f}")
    print(f"\nDrawdown Analysis:")
    print(f"  Maximum Drawdown: {max_dd:.2%}")
    print(f"  Peak Date: {prices_series.idxmax().strftime('%Y-%m-%d')}")
    print(f"  Trough Date: {prices_series.loc[drawdown == max_dd].index[0].strftime('%Y-%m-%d')}")

    if max_dd < -0.35 and max_dd > -0.45:
        print("✓ Max drawdown calculation PASSED")
    else:
        print("✗ Unexpected drawdown value")

    return max_dd


def test_beta_calculation():
    """Test beta calculation"""
    print("\n" + "=" * 60)
    print("Testing Beta Calculation")
    print("=" * 60)

    np.random.seed(42)
    n_days = 1260

    # Create correlated returns
    market_returns = np.random.normal(0.0005, 0.01, n_days)

    # Stock with beta = 1.5
    noise = np.random.normal(0, 0.005, n_days)
    stock_returns = 1.5 * market_returns + noise

    market_series = pd.Series(market_returns)
    stock_series = pd.Series(stock_returns)

    # Calculate beta
    covariance = stock_series.cov(market_series)
    market_variance = market_series.var()
    beta = covariance / market_variance

    print(f"\nReturn Statistics:")
    print(f"  Market Mean: {market_series.mean():.6f}")
    print(f"  Market Std: {market_series.std():.6f}")
    print(f"  Stock Mean: {stock_series.mean():.6f}")
    print(f"  Stock Std: {stock_series.std():.6f}")
    print(f"\nBeta Calculation:")
    print(f"  Covariance: {covariance:.8f}")
    print(f"  Market Variance: {market_variance:.8f}")
    print(f"  Beta: {beta:.3f}")
    print(f"  Expected Beta: 1.500")

    if abs(beta - 1.5) < 0.2:
        print("✓ Beta calculation PASSED")
    else:
        print("✗ Beta calculation FAILED")

    return beta


def check_database_status():
    """Check current database status"""
    print("\n" + "=" * 60)
    print("Database Status Check")
    print("=" * 60)

    try:
        conn = sqlite3.connect(DB_PATH)

        # Check tables
        tables = pd.read_sql("""
        SELECT name FROM sqlite_master WHERE type='table'
        """, conn)

        print(f"\nTables in database: {len(tables)}")
        for table in tables['name']:
            count = pd.read_sql(f"SELECT COUNT(*) as count FROM {table}", conn)
            print(f"  {table}: {count['count'][0]} records")

        # Check data quality if table exists
        if 'data_quality' in tables['name'].values:
            quality = pd.read_sql("""
            SELECT
                COUNT(*) as total,
                SUM(has_profile) as profiles,
                SUM(has_prices) as prices,
                SUM(has_financials) as financials,
                SUM(has_metrics) as metrics
            FROM data_quality
            """, conn)

            print(f"\nData Quality Summary:")
            print(f"  Total Companies: {quality['total'][0]}")
            print(f"  With Profile: {quality['profiles'][0]}")
            print(f"  With Prices: {quality['prices'][0]}")
            print(f"  With Financials: {quality['financials'][0]}")
            print(f"  With Metrics: {quality['metrics'][0]}")

        conn.close()
        print("\n✓ Database check completed")

    except Exception as e:
        print(f"\n✗ Database error: {e}")


def test_real_stock_data():
    """Test calculations on real stock data if available"""
    print("\n" + "=" * 60)
    print("Testing with Real Stock Data")
    print("=" * 60)

    try:
        conn = sqlite3.connect(DB_PATH)

        # Check if we have any price data
        symbols = pd.read_sql("""
        SELECT DISTINCT symbol FROM daily_prices LIMIT 5
        """, conn)

        if symbols.empty:
            print("\nNo price data available yet")
            conn.close()
            return

        print(f"\nFound {len(symbols)} stocks with price data")

        for symbol in symbols['symbol']:
            prices = pd.read_sql(f"""
            SELECT date, adj_close FROM daily_prices
            WHERE symbol = '{symbol}'
            ORDER BY date
            LIMIT 1000
            """, conn, parse_dates=['date'])

            if len(prices) < 252:
                continue

            returns = prices['adj_close'].pct_change().dropna()

            # Calculate metrics
            rf_daily = (1.042) ** (1/252) - 1
            excess_returns = returns - rf_daily
            sharpe = (excess_returns.mean() * 252) / (returns.std() * np.sqrt(252))

            cummax = prices['adj_close'].cummax()
            drawdown = (prices['adj_close'] - cummax) / cummax
            max_dd = drawdown.min()

            volatility = returns.std() * np.sqrt(252)

            print(f"\n{symbol}:")
            print(f"  Data Points: {len(prices)}")
            print(f"  Sharpe Ratio: {sharpe:.3f}")
            print(f"  Max Drawdown: {max_dd:.2%}")
            print(f"  Volatility: {volatility:.2%}")

        conn.close()
        print("\n✓ Real data test completed")

    except Exception as e:
        print(f"\n✗ Real data test error: {e}")


def main():
    """Run all tests"""
    print("\n" + "=" * 80)
    print(" Risk Metrics Calculation Test Suite")
    print("=" * 80)

    # Unit tests
    test_sharpe_calculation()
    test_sortino_calculation()
    test_max_drawdown()
    test_beta_calculation()

    # Database tests
    check_database_status()
    test_real_stock_data()

    print("\n" + "=" * 80)
    print(" Test Suite Complete")
    print("=" * 80 + "\n")


if __name__ == "__main__":
    main()
