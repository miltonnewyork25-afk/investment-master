#!/usr/bin/env python3
"""
Tail Risk and Risk-Adjusted Return Calculator
==============================================
Calculates comprehensive tail risk metrics to complement Sharpe ratio analysis.

PURPOSE:
--------
Sharpe ratio alone can be misleading because it:
1. Assumes normal distribution of returns (ignores fat tails)
2. Penalizes upside volatility equally with downside
3. Can be manipulated by leverage or option strategies

This module calculates metrics that address these limitations:
- Maximum Drawdown: Measures worst historical loss
- Sortino Ratio: Only penalizes downside volatility
- Calmar Ratio: Return per unit of drawdown risk
- VaR/CVaR: Tail risk quantification
- Downside/Upside Capture: Asymmetric market participation

CONSTRAINT FOR TOP 20:
----------------------
Max Drawdown <= -30% required to qualify for Top 20
(Prevents high-Sharpe-but-dangerous stocks from making the list)

Version: 2.0
Date: 2026-01-26
Author: Investment Research System
"""

import numpy as np
import pandas as pd
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import logging
import os
import json

# Configuration
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
DB_PATH = f"{BASE_DIR}/data/market_data.db"
OUTPUT_DIR = f"{BASE_DIR}/data/processed"
LOG_PATH = f"{BASE_DIR}/data/risk_calculator.log"

# Thresholds
MAX_DRAWDOWN_THRESHOLD = -0.30  # -30% max drawdown to qualify
TRADING_DAYS_PER_YEAR = 252

# Risk-free rate (should match sharpe_calculator)
RISK_FREE_RATE = 0.045  # 4.5% (10Y Treasury)

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


class TailRiskCalculator:
    """
    Comprehensive tail risk calculations.

    METRICS CALCULATED:
    -------------------
    1. Maximum Drawdown (MDD):
       - Formula: (Trough - Peak) / Peak
       - Interpretation: Worst peak-to-trough decline
       - Use: Risk tolerance assessment

    2. Sortino Ratio:
       - Formula: (R - Rf) / Downside_Deviation
       - Only uses negative return volatility
       - Better for asymmetric return distributions

    3. Calmar Ratio:
       - Formula: CAGR / |Max_Drawdown|
       - Measures return per unit of drawdown risk
       - Preferred by hedge fund managers

    4. Value at Risk (VaR):
       - 95% confidence level
       - "With 95% probability, the maximum loss is..."
       - Historical simulation method

    5. Conditional VaR (CVaR/Expected Shortfall):
       - Average loss when VaR is exceeded
       - More sensitive to tail risk than VaR
       - Required by Basel III for banks

    6. Upside/Downside Capture:
       - How much the stock participates in up/down markets
       - Ideal: High upside capture, low downside capture
    """

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.market_returns = None  # Cache for SPY returns

    def get_price_data(self, symbol: str, days: int = 1260) -> pd.DataFrame:
        """Retrieve adjusted close prices from database"""
        conn = sqlite3.connect(self.db_path)

        query = """
        SELECT date, adj_close, volume
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
        df = df.ffill(limit=5)

        return df

    def get_market_returns(self, days: int = 1260) -> pd.Series:
        """Get S&P 500 (SPY) returns for beta calculation"""
        if self.market_returns is not None:
            return self.market_returns

        df = self.get_price_data('SPY', days)
        if df.empty:
            logger.warning("No SPY data available for market returns")
            return pd.Series(dtype=float)

        self.market_returns = df['adj_close'].pct_change().dropna()
        return self.market_returns

    def calculate_max_drawdown(self, prices: pd.Series) -> Dict:
        """
        Calculate Maximum Drawdown with detailed information.

        Returns:
            - max_drawdown: The maximum drawdown value (negative)
            - peak_date: Date of the peak before the drawdown
            - trough_date: Date of the maximum drawdown
            - recovery_date: Date when price recovered to peak (or None)
            - recovery_days: Days to recover (or None if not recovered)
            - current_drawdown: Current drawdown from most recent peak
        """
        if len(prices) < 20:
            return {'max_drawdown': None}

        # Calculate running maximum
        running_max = prices.expanding().max()

        # Calculate drawdown series
        drawdown = (prices - running_max) / running_max

        # Find maximum drawdown
        max_dd = drawdown.min()
        trough_idx = drawdown.idxmin()

        # Find peak before trough
        peak_idx = prices[:trough_idx].idxmax()
        peak_value = prices[peak_idx]

        # Find recovery (if any)
        after_trough = prices[trough_idx:]
        recovered = after_trough[after_trough >= peak_value]

        recovery_date = None
        recovery_days = None
        if not recovered.empty:
            recovery_date = recovered.index[0]
            recovery_days = (recovery_date - trough_idx).days

        # Current drawdown
        current_dd = drawdown.iloc[-1]

        return {
            'max_drawdown': max_dd,
            'max_drawdown_pct': f"{max_dd:.2%}",
            'peak_date': peak_idx.strftime('%Y-%m-%d'),
            'trough_date': trough_idx.strftime('%Y-%m-%d'),
            'peak_value': peak_value,
            'trough_value': prices[trough_idx],
            'recovery_date': recovery_date.strftime('%Y-%m-%d') if recovery_date else None,
            'recovery_days': recovery_days,
            'current_drawdown': current_dd,
            'recovered': recovery_date is not None
        }

    def calculate_sortino_ratio(self, returns: pd.Series,
                                 risk_free_rate: float = RISK_FREE_RATE) -> Optional[float]:
        """
        Calculate Sortino Ratio.

        Unlike Sharpe, only penalizes downside volatility.
        Better for strategies with positive skew.

        Formula: (R - Rf) / Downside_Deviation

        Where Downside_Deviation = sqrt(mean(min(r-target, 0)^2))
        """
        if len(returns) < 252:
            return None

        # Annualized return
        total_return = (1 + returns).prod()
        years = len(returns) / TRADING_DAYS_PER_YEAR
        annualized_return = (1 + total_return) ** (1 / years) - 1

        # Downside deviation (target = 0 for simplicity)
        downside_returns = returns[returns < 0]
        if len(downside_returns) == 0:
            return float('inf')  # No downside = infinite Sortino

        # Annualized downside deviation
        downside_std = downside_returns.std() * np.sqrt(TRADING_DAYS_PER_YEAR)

        if downside_std == 0:
            return None

        sortino = (annualized_return - risk_free_rate) / downside_std
        return round(sortino, 4)

    def calculate_calmar_ratio(self, returns: pd.Series,
                                max_drawdown: float) -> Optional[float]:
        """
        Calculate Calmar Ratio.

        Formula: CAGR / |Max_Drawdown|

        Measures return per unit of maximum drawdown risk.
        Popular in hedge fund performance assessment.
        """
        if len(returns) < 252 or max_drawdown is None or max_drawdown == 0:
            return None

        # CAGR
        total_return = (1 + returns).prod()
        years = len(returns) / TRADING_DAYS_PER_YEAR
        cagr = (1 + total_return) ** (1 / years) - 1

        calmar = cagr / abs(max_drawdown)
        return round(calmar, 4)

    def calculate_var_cvar(self, returns: pd.Series,
                            confidence: float = 0.95) -> Tuple[Optional[float], Optional[float]]:
        """
        Calculate Value at Risk and Conditional VaR.

        VaR: With (confidence)% probability, the loss will not exceed this amount
        CVaR: Average loss when VaR is exceeded

        Using Historical Simulation method (non-parametric).
        Returns are in daily terms.
        """
        if len(returns) < 100:
            return None, None

        # VaR at confidence level (e.g., 5th percentile for 95%)
        var = np.percentile(returns, (1 - confidence) * 100)

        # CVaR (Expected Shortfall) - average of returns below VaR
        cvar = returns[returns <= var].mean()

        return round(var, 4), round(cvar, 4)

    def calculate_beta(self, stock_returns: pd.Series,
                        market_returns: pd.Series) -> Optional[float]:
        """
        Calculate Beta (market sensitivity).

        Formula: Cov(stock, market) / Var(market)

        Interpretation:
        - Beta = 1: Moves with market
        - Beta > 1: More volatile than market
        - Beta < 1: Less volatile than market
        - Beta < 0: Inverse relationship (rare)
        """
        # Align dates
        aligned = pd.DataFrame({
            'stock': stock_returns,
            'market': market_returns
        }).dropna()

        if len(aligned) < 252:
            return None

        covariance = aligned['stock'].cov(aligned['market'])
        market_variance = aligned['market'].var()

        if market_variance == 0:
            return None

        beta = covariance / market_variance
        return round(beta, 3)

    def calculate_capture_ratios(self, stock_returns: pd.Series,
                                  market_returns: pd.Series) -> Tuple[Optional[float], Optional[float]]:
        """
        Calculate Upside and Downside Capture Ratios.

        Upside Capture: Stock return on up days / Market return on up days
        Downside Capture: Stock return on down days / Market return on down days

        Ideal: High upside capture (>100%), low downside capture (<100%)
        """
        aligned = pd.DataFrame({
            'stock': stock_returns,
            'market': market_returns
        }).dropna()

        if len(aligned) < 252:
            return None, None

        # Up days (market > 0)
        up_days = aligned[aligned['market'] > 0]
        if len(up_days) > 0:
            upside_capture = (up_days['stock'].mean() / up_days['market'].mean())
        else:
            upside_capture = None

        # Down days (market < 0)
        down_days = aligned[aligned['market'] < 0]
        if len(down_days) > 0:
            downside_capture = (down_days['stock'].mean() / down_days['market'].mean())
        else:
            downside_capture = None

        return (
            round(upside_capture, 3) if upside_capture else None,
            round(downside_capture, 3) if downside_capture else None
        )

    def calculate_all_risk_metrics(self, symbol: str) -> Dict:
        """
        Calculate all tail risk metrics for a single stock.

        Returns comprehensive risk profile dictionary.
        """
        result = {
            'symbol': symbol,
            'calculation_timestamp': datetime.now().isoformat(),
            'data_quality': 'UNKNOWN'
        }

        # Get price data
        price_df = self.get_price_data(symbol, days=1260)  # 5 years

        if price_df.empty:
            result['data_quality'] = 'NO_DATA'
            return result

        prices = price_df['adj_close']
        returns = prices.pct_change().dropna()

        result['trading_days'] = len(returns)
        result['data_start_date'] = prices.index[0].strftime('%Y-%m-%d')
        result['data_end_date'] = prices.index[-1].strftime('%Y-%m-%d')

        if len(returns) < 252:
            result['data_quality'] = 'INSUFFICIENT'
            return result

        # ===== MAXIMUM DRAWDOWN =====
        mdd_result = self.calculate_max_drawdown(prices)
        result.update({
            'max_drawdown_3y': mdd_result.get('max_drawdown'),
            'max_drawdown_peak_date': mdd_result.get('peak_date'),
            'max_drawdown_trough_date': mdd_result.get('trough_date'),
            'max_drawdown_recovery_days': mdd_result.get('recovery_days'),
            'max_drawdown_recovered': mdd_result.get('recovered'),
            'current_drawdown': mdd_result.get('current_drawdown'),
        })

        # 5-year max drawdown if enough data
        if len(returns) >= 1260:
            mdd_5y = self.calculate_max_drawdown(prices)
            result['max_drawdown_5y'] = mdd_5y.get('max_drawdown')

        # ===== SORTINO RATIO =====
        result['sortino_ratio'] = self.calculate_sortino_ratio(returns)

        # ===== CALMAR RATIO =====
        result['calmar_ratio'] = self.calculate_calmar_ratio(
            returns, mdd_result.get('max_drawdown')
        )

        # ===== VAR / CVAR =====
        var_95, cvar_95 = self.calculate_var_cvar(returns, confidence=0.95)
        result['var_95_daily'] = var_95
        result['cvar_95_daily'] = cvar_95

        # Monthly VaR/CVaR (more meaningful for investors)
        if len(returns) >= 252:
            monthly_returns = prices.resample('M').last().pct_change().dropna()
            var_95_monthly, cvar_95_monthly = self.calculate_var_cvar(monthly_returns, 0.95)
            result['var_95_monthly'] = var_95_monthly
            result['cvar_95_monthly'] = cvar_95_monthly

        # ===== BETA =====
        market_returns = self.get_market_returns(len(returns))
        if not market_returns.empty:
            result['beta'] = self.calculate_beta(returns, market_returns)

            # ===== CAPTURE RATIOS =====
            upside, downside = self.calculate_capture_ratios(returns, market_returns)
            result['upside_capture'] = upside
            result['downside_capture'] = downside

        # ===== VOLATILITY =====
        result['volatility_1y'] = returns.tail(252).std() * np.sqrt(252)
        result['volatility_3y'] = returns.std() * np.sqrt(252) if len(returns) >= 756 else None

        # ===== QUALIFICATION CHECK =====
        max_dd = result.get('max_drawdown_3y')
        result['meets_mdd_threshold'] = (
            max_dd is not None and max_dd >= MAX_DRAWDOWN_THRESHOLD
        )

        # Data quality assessment
        essential_fields = ['max_drawdown_3y', 'sortino_ratio', 'var_95_daily', 'beta']
        non_null = sum(1 for f in essential_fields if result.get(f) is not None)

        if non_null == len(essential_fields):
            result['data_quality'] = 'COMPLETE'
        elif non_null >= 2:
            result['data_quality'] = 'PARTIAL'
        else:
            result['data_quality'] = 'INCOMPLETE'

        return result


def calculate_risk_for_universe(symbols: List[str]) -> pd.DataFrame:
    """Calculate tail risk metrics for all symbols"""
    logger.info(f"Calculating tail risk for {len(symbols)} symbols")

    calculator = TailRiskCalculator()
    results = []

    for i, symbol in enumerate(symbols):
        try:
            result = calculator.calculate_all_risk_metrics(symbol)
            results.append(result)

            if (i + 1) % 100 == 0:
                logger.info(f"Progress: {i+1}/{len(symbols)} calculated")

        except Exception as e:
            logger.error(f"Error calculating {symbol}: {e}")
            results.append({
                'symbol': symbol,
                'data_quality': 'ERROR'
            })

    return pd.DataFrame(results)


def save_risk_results(df: pd.DataFrame):
    """Save risk calculation results"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Main output
    main_path = f"{OUTPUT_DIR}/tail_risk_metrics.csv"
    df.to_csv(main_path, index=False)
    logger.info(f"Saved: {main_path}")

    # Qualified stocks (meet MDD threshold)
    qualified_df = df[df['meets_mdd_threshold'] == True]
    qualified_path = f"{OUTPUT_DIR}/mdd_qualified_stocks.csv"
    qualified_df.to_csv(qualified_path, index=False)
    logger.info(f"Saved: {qualified_path} ({len(qualified_df)} stocks)")

    # Excluded stocks (fail MDD threshold)
    excluded_df = df[df['meets_mdd_threshold'] == False]
    excluded_path = f"{OUTPUT_DIR}/mdd_excluded_stocks.csv"
    excluded_df.to_csv(excluded_path, index=False)
    logger.info(f"Saved: {excluded_path} ({len(excluded_df)} stocks)")

    # Summary statistics
    valid_df = df[df['data_quality'] == 'COMPLETE']

    summary = {
        'calculation_date': datetime.now().isoformat(),
        'total_symbols': len(df),
        'complete_data': len(valid_df),
        'qualified_mdd': len(qualified_df),
        'excluded_mdd': len(excluded_df),
        'mdd_threshold': MAX_DRAWDOWN_THRESHOLD,
        'statistics': {
            'max_drawdown': {
                'mean': valid_df['max_drawdown_3y'].mean() if len(valid_df) > 0 else None,
                'median': valid_df['max_drawdown_3y'].median() if len(valid_df) > 0 else None,
                'worst': valid_df['max_drawdown_3y'].min() if len(valid_df) > 0 else None,
                'best': valid_df['max_drawdown_3y'].max() if len(valid_df) > 0 else None,
            },
            'sortino': {
                'mean': valid_df['sortino_ratio'].mean() if len(valid_df) > 0 else None,
                'median': valid_df['sortino_ratio'].median() if len(valid_df) > 0 else None,
            },
            'calmar': {
                'mean': valid_df['calmar_ratio'].mean() if len(valid_df) > 0 else None,
                'median': valid_df['calmar_ratio'].median() if len(valid_df) > 0 else None,
            },
            'beta': {
                'mean': valid_df['beta'].mean() if len(valid_df) > 0 else None,
                'median': valid_df['beta'].median() if len(valid_df) > 0 else None,
            }
        }
    }

    summary_path = f"{OUTPUT_DIR}/risk_summary.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    logger.info(f"Saved: {summary_path}")


def main():
    """Main execution"""
    logger.info("=" * 60)
    logger.info("TAIL RISK CALCULATION ENGINE")
    logger.info("=" * 60)
    logger.info(f"Max Drawdown Threshold: {MAX_DRAWDOWN_THRESHOLD:.0%}")

    # Get symbols from database
    conn = sqlite3.connect(DB_PATH)
    symbols_df = pd.read_sql("SELECT DISTINCT symbol FROM daily_prices", conn)
    conn.close()

    symbols = symbols_df['symbol'].tolist()
    logger.info(f"Found {len(symbols)} symbols with price data")

    # Calculate risk metrics
    results_df = calculate_risk_for_universe(symbols)

    # Save results
    save_risk_results(results_df)

    # Display summary
    qualified = results_df[results_df['meets_mdd_threshold'] == True]
    logger.info(f"\n{'='*60}")
    logger.info(f"SUMMARY")
    logger.info(f"{'='*60}")
    logger.info(f"Total Symbols: {len(results_df)}")
    logger.info(f"MDD Qualified: {len(qualified)} ({len(qualified)/len(results_df)*100:.1f}%)")
    logger.info(f"MDD Excluded: {len(results_df) - len(qualified)}")

    # Top 10 by Sortino
    if len(qualified) > 0:
        top_sortino = qualified.nlargest(10, 'sortino_ratio')[
            ['symbol', 'sortino_ratio', 'max_drawdown_3y', 'calmar_ratio', 'beta']
        ]
        logger.info("\nTop 10 by Sortino Ratio (among qualified):")
        print(top_sortino.to_string(index=False))

    logger.info("\nTail risk calculation completed!")

    return results_df


if __name__ == "__main__":
    main()
