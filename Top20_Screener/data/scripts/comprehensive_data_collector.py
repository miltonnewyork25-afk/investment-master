#!/usr/bin/env python3
"""
Comprehensive Market Data Collector
====================================
Collects 50+ financial and market metrics for the Top20 Screener system.

Data Categories:
1. Valuation Metrics (P/E, P/B, EV/EBITDA, etc.)
2. Profitability Metrics (margins, ROE, ROIC, etc.)
3. Cash Flow Quality (FCF, OCF/NI, etc.)
4. Balance Sheet Health (debt ratios, liquidity)
5. Growth Metrics (revenue, EPS, FCF growth)
6. Dividend Metrics (yield, payout, growth)
7. Quality Indicators (variability, beat rates)

Data Sources:
- FMP API (primary)
- Calculated from raw financials (secondary)

Version: 2.0
Date: 2026-01-26
"""

import requests
import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import json
from typing import List, Dict, Optional, Tuple
import logging
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuration
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h7FVfb"
FMP_BASE_URL = "https://financialmodelingprep.com"

# Paths
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
DB_PATH = f"{BASE_DIR}/data/market_data.db"
RAW_DIR = f"{BASE_DIR}/data/raw"
PROCESSED_DIR = f"{BASE_DIR}/data/processed"
LOG_PATH = f"{BASE_DIR}/data/comprehensive_collector.log"

# Rate limiting
REQUEST_DELAY = 0.02  # 20ms between requests
MAX_RETRIES = 3

# Date ranges
END_DATE = datetime.now().strftime('%Y-%m-%d')
START_DATE_5Y = (datetime.now() - timedelta(days=5*365)).strftime('%Y-%m-%d')
START_DATE_3Y = (datetime.now() - timedelta(days=3*365)).strftime('%Y-%m-%d')
START_DATE_1Y = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_PATH),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class FMPClient:
    """FMP API client with comprehensive endpoint coverage"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = FMP_BASE_URL
        self.session = requests.Session()

    def _request(self, endpoint: str, params: Optional[Dict] = None,
                 api_version: str = "api/v3") -> Optional[any]:
        """Make API request with retry logic"""
        if params is None:
            params = {}
        params['apikey'] = self.api_key

        url = f"{self.base_url}/{api_version}/{endpoint}"

        for attempt in range(MAX_RETRIES):
            try:
                time.sleep(REQUEST_DELAY)
                response = self.session.get(url, params=params, timeout=30)
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException as e:
                if attempt == MAX_RETRIES - 1:
                    logger.debug(f"Failed to fetch {endpoint}: {e}")
                    return None
                time.sleep(2 ** attempt)
        return None

    # =====================================================================
    # COMPANY INFORMATION
    # =====================================================================

    def get_profile(self, symbol: str) -> Optional[Dict]:
        """Get company profile"""
        data = self._request(f"profile/{symbol}")
        return data[0] if data else None

    def get_quote(self, symbol: str) -> Optional[Dict]:
        """Get real-time quote"""
        data = self._request(f"quote/{symbol}")
        return data[0] if data else None

    # =====================================================================
    # FINANCIAL STATEMENTS (TTM and Historical)
    # =====================================================================

    def get_income_statement_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM income statement"""
        data = self._request(f"income-statement/{symbol}", params={'limit': 1})
        return data[0] if data else None

    def get_income_statement_history(self, symbol: str, periods: int = 20) -> List[Dict]:
        """Get historical income statements (quarterly)"""
        data = self._request(f"income-statement/{symbol}",
                            params={'period': 'quarter', 'limit': periods})
        return data or []

    def get_balance_sheet_ttm(self, symbol: str) -> Optional[Dict]:
        """Get latest balance sheet"""
        data = self._request(f"balance-sheet-statement/{symbol}", params={'limit': 1})
        return data[0] if data else None

    def get_balance_sheet_history(self, symbol: str, periods: int = 20) -> List[Dict]:
        """Get historical balance sheets (quarterly)"""
        data = self._request(f"balance-sheet-statement/{symbol}",
                            params={'period': 'quarter', 'limit': periods})
        return data or []

    def get_cash_flow_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM cash flow statement"""
        data = self._request(f"cash-flow-statement/{symbol}", params={'limit': 1})
        return data[0] if data else None

    def get_cash_flow_history(self, symbol: str, periods: int = 20) -> List[Dict]:
        """Get historical cash flow statements (quarterly)"""
        data = self._request(f"cash-flow-statement/{symbol}",
                            params={'period': 'quarter', 'limit': periods})
        return data or []

    # =====================================================================
    # KEY METRICS AND RATIOS
    # =====================================================================

    def get_key_metrics_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM key metrics"""
        data = self._request(f"key-metrics-ttm/{symbol}")
        return data[0] if data else None

    def get_ratios_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM financial ratios"""
        data = self._request(f"ratios-ttm/{symbol}")
        return data[0] if data else None

    def get_financial_growth(self, symbol: str) -> Optional[Dict]:
        """Get financial growth metrics"""
        data = self._request(f"financial-growth/{symbol}", params={'limit': 1})
        return data[0] if data else None

    def get_enterprise_value(self, symbol: str) -> Optional[Dict]:
        """Get enterprise value metrics"""
        data = self._request(f"enterprise-values/{symbol}", params={'limit': 1})
        return data[0] if data else None

    def get_financial_scores(self, symbol: str) -> Optional[Dict]:
        """Get financial scores (Altman Z, Piotroski F)"""
        data = self._request(f"score", params={'symbol': symbol})
        return data[0] if data else None

    # =====================================================================
    # HISTORICAL PRICES
    # =====================================================================

    def get_historical_prices(self, symbol: str, from_date: str, to_date: str) -> List[Dict]:
        """Get historical daily prices"""
        data = self._request(f"historical-price-full/{symbol}",
                            params={'from': from_date, 'to': to_date})
        return data.get('historical', []) if data else []

    # =====================================================================
    # ANALYST DATA
    # =====================================================================

    def get_analyst_estimates(self, symbol: str) -> List[Dict]:
        """Get analyst estimates"""
        data = self._request(f"analyst-estimates/{symbol}", params={'limit': 8})
        return data or []

    def get_earnings_surprises(self, symbol: str) -> List[Dict]:
        """Get earnings surprises history"""
        data = self._request(f"earnings-surprises/{symbol}")
        return data or []


class MetricsCalculator:
    """Calculate derived metrics from raw financial data"""

    @staticmethod
    def safe_divide(numerator: float, denominator: float) -> Optional[float]:
        """Safe division handling zeros and None"""
        if numerator is None or denominator is None:
            return None
        if denominator == 0:
            return None
        return numerator / denominator

    @staticmethod
    def calculate_cagr(start_value: float, end_value: float, years: float) -> Optional[float]:
        """Calculate Compound Annual Growth Rate"""
        if start_value is None or end_value is None or years <= 0:
            return None
        if start_value <= 0 or end_value <= 0:
            return None
        return (end_value / start_value) ** (1 / years) - 1

    @staticmethod
    def calculate_yoy_growth(current: float, prior: float) -> Optional[float]:
        """Calculate year-over-year growth"""
        if current is None or prior is None or prior == 0:
            return None
        return (current - prior) / abs(prior)

    @staticmethod
    def calculate_earnings_variability(eps_history: List[float]) -> Optional[float]:
        """Calculate standard deviation of EPS over time"""
        if not eps_history or len(eps_history) < 4:
            return None
        eps_arr = np.array([e for e in eps_history if e is not None])
        if len(eps_arr) < 4:
            return None
        return np.std(eps_arr) / np.mean(np.abs(eps_arr)) if np.mean(np.abs(eps_arr)) != 0 else None

    @staticmethod
    def calculate_beat_rate(surprises: List[Dict]) -> Optional[float]:
        """Calculate earnings beat rate from surprise history"""
        if not surprises or len(surprises) < 4:
            return None

        beats = 0
        total = 0
        for surprise in surprises[:8]:  # Last 8 quarters
            actual = surprise.get('actualEarningResult')
            estimate = surprise.get('estimatedEarning')
            if actual is not None and estimate is not None:
                total += 1
                if actual >= estimate:
                    beats += 1

        return beats / total if total >= 4 else None


class ComprehensiveCollector:
    """Collects all 50+ metrics for each stock"""

    def __init__(self, client: FMPClient):
        self.client = client
        self.calculator = MetricsCalculator()

    def collect_stock_metrics(self, symbol: str) -> Dict:
        """
        Collect all metrics for a single stock.
        Returns a flat dictionary with all 50+ metrics.
        """
        logger.debug(f"Collecting metrics for {symbol}")

        metrics = {
            'symbol': symbol,
            'collection_timestamp': datetime.now().isoformat(),
            'data_quality': 'UNKNOWN'
        }

        try:
            # ===== PROFILE & QUOTE =====
            profile = self.client.get_profile(symbol)
            quote = self.client.get_quote(symbol)

            if not profile:
                metrics['data_quality'] = 'NO_PROFILE'
                return metrics

            # Basic info
            metrics.update({
                'company_name': profile.get('companyName'),
                'sector': profile.get('sector'),
                'industry': profile.get('industry'),
                'exchange': profile.get('exchangeShortName'),
                'country': profile.get('country'),
                'ipo_date': profile.get('ipoDate'),
            })

            # Market data
            metrics.update({
                'current_price': profile.get('price'),
                'market_cap': profile.get('mktCap'),
                'beta': profile.get('beta'),
                'avg_volume': profile.get('volAvg'),
            })

            if quote:
                metrics.update({
                    'price_52w_high': quote.get('yearHigh'),
                    'price_52w_low': quote.get('yearLow'),
                    'price_vs_52w_high': self.calculator.safe_divide(
                        quote.get('price'), quote.get('yearHigh')
                    ),
                    'price_200dma': quote.get('priceAvg200'),
                    'price_vs_200dma': self.calculator.safe_divide(
                        quote.get('price'), quote.get('priceAvg200')
                    ),
                    'avg_volume_10d': quote.get('avgVolume'),
                })

            # ===== KEY METRICS =====
            key_metrics = self.client.get_key_metrics_ttm(symbol)
            if key_metrics:
                metrics.update({
                    # Valuation
                    'pe_ratio_ttm': key_metrics.get('peRatioTTM'),
                    'peg_ratio': key_metrics.get('pegRatioTTM'),
                    'pb_ratio': key_metrics.get('priceToBookRatioTTM'),
                    'ps_ratio': key_metrics.get('priceToSalesRatioTTM'),
                    'ev_ebitda': key_metrics.get('enterpriseValueOverEBITDATTM'),
                    'ev_fcf': self.calculator.safe_divide(
                        key_metrics.get('enterpriseValueTTM'),
                        key_metrics.get('freeCashFlowTTM')
                    ),

                    # Profitability
                    'roe': key_metrics.get('roeTTM'),
                    'roa': key_metrics.get('returnOnTangibleAssetsTTM'),
                    'roic': key_metrics.get('roicTTM'),

                    # Per share
                    'revenue_per_share': key_metrics.get('revenuePerShareTTM'),
                    'fcf_per_share': key_metrics.get('freeCashFlowPerShareTTM'),
                    'book_value_per_share': key_metrics.get('bookValuePerShareTTM'),

                    # Enterprise value
                    'enterprise_value': key_metrics.get('enterpriseValueTTM'),

                    # Dividend
                    'dividend_yield': key_metrics.get('dividendYieldTTM'),

                    # Cash flow quality
                    'fcf_yield': key_metrics.get('freeCashFlowYieldTTM'),
                })

            # ===== FINANCIAL RATIOS =====
            ratios = self.client.get_ratios_ttm(symbol)
            if ratios:
                metrics.update({
                    # Margins
                    'gross_margin': ratios.get('grossProfitMarginTTM'),
                    'operating_margin': ratios.get('operatingProfitMarginTTM'),
                    'net_margin': ratios.get('netProfitMarginTTM'),
                    'ebitda_margin': ratios.get('ebitdaMarginTTM'),
                    'fcf_margin': ratios.get('freeCashFlowOperatingCashFlowRatioTTM'),

                    # Liquidity
                    'current_ratio': ratios.get('currentRatioTTM'),
                    'quick_ratio': ratios.get('quickRatioTTM'),
                    'cash_ratio': ratios.get('cashRatioTTM'),

                    # Leverage
                    'debt_to_equity': ratios.get('debtEquityRatioTTM'),
                    'debt_to_assets': ratios.get('debtRatioTTM'),
                    'interest_coverage': ratios.get('interestCoverageTTM'),
                    'net_debt_to_ebitda': ratios.get('netDebtToEBITDATTM'),

                    # Efficiency
                    'asset_turnover': ratios.get('assetTurnoverTTM'),
                    'inventory_turnover': ratios.get('inventoryTurnoverTTM'),
                    'receivables_turnover': ratios.get('receivablesTurnoverTTM'),

                    # Dividend
                    'payout_ratio': ratios.get('payoutRatioTTM'),
                    'dividend_per_share': ratios.get('dividendPerShareTTM'),

                    # Valuation (additional)
                    'pe_ratio_forward': ratios.get('priceEarningsToGrowthRatioTTM'),
                    'price_to_operating_cf': ratios.get('priceToOperatingCashFlowsRatioTTM'),
                    'price_to_fcf': ratios.get('priceToFreeCashFlowsRatioTTM'),
                })

            # ===== FINANCIAL STATEMENTS (for derived metrics) =====
            income = self.client.get_income_statement_ttm(symbol)
            balance = self.client.get_balance_sheet_ttm(symbol)
            cash_flow = self.client.get_cash_flow_ttm(symbol)

            if income and cash_flow:
                # Cash flow quality indicators
                net_income = income.get('netIncome') or 0
                ocf = cash_flow.get('operatingCashFlow') or 0
                fcf = cash_flow.get('freeCashFlow') or 0

                metrics['ocf_to_net_income'] = self.calculator.safe_divide(ocf, net_income)
                metrics['fcf_ttm'] = fcf
                metrics['ocf_ttm'] = ocf

                # Warning flag for cash flow quality
                if metrics['ocf_to_net_income'] and metrics['ocf_to_net_income'] < 0.7:
                    metrics['cash_flow_quality_warning'] = True
                else:
                    metrics['cash_flow_quality_warning'] = False

            # ===== GROWTH METRICS =====
            growth = self.client.get_financial_growth(symbol)
            if growth:
                metrics.update({
                    'revenue_growth_yoy': growth.get('revenueGrowth'),
                    'eps_growth_yoy': growth.get('epsgrowth'),
                    'ebitda_growth_yoy': growth.get('ebitdagrowth'),
                    'fcf_growth_yoy': growth.get('freeCashFlowGrowth'),
                    'net_income_growth_yoy': growth.get('netIncomeGrowth'),
                    'dividend_growth_yoy': growth.get('dividendsperShareGrowth'),
                })

            # Calculate multi-year growth from historical data
            income_history = self.client.get_income_statement_history(symbol, periods=20)
            if income_history and len(income_history) >= 12:
                try:
                    # 3-year revenue growth
                    recent_revenue = sum(i.get('revenue', 0) for i in income_history[:4])
                    prior_revenue = sum(i.get('revenue', 0) for i in income_history[12:16])
                    metrics['revenue_growth_3y'] = self.calculator.calculate_cagr(
                        prior_revenue, recent_revenue, 3
                    )

                    # 5-year if available
                    if len(income_history) >= 20:
                        oldest_revenue = sum(i.get('revenue', 0) for i in income_history[16:20])
                        metrics['revenue_growth_5y'] = self.calculator.calculate_cagr(
                            oldest_revenue, recent_revenue, 5
                        )

                    # EPS growth
                    recent_eps = sum(i.get('eps', 0) for i in income_history[:4])
                    prior_eps = sum(i.get('eps', 0) for i in income_history[12:16])
                    if prior_eps > 0:
                        metrics['eps_growth_3y'] = self.calculator.calculate_cagr(
                            prior_eps, recent_eps, 3
                        )

                except Exception as e:
                    logger.debug(f"Error calculating growth for {symbol}: {e}")

            # ===== EARNINGS QUALITY =====
            surprises = self.client.get_earnings_surprises(symbol)
            if surprises:
                metrics['analyst_beat_rate'] = self.calculator.calculate_beat_rate(surprises)

            # EPS variability from quarterly data
            if income_history and len(income_history) >= 8:
                eps_list = [i.get('eps') for i in income_history[:12] if i.get('eps') is not None]
                metrics['earnings_variability'] = self.calculator.calculate_earnings_variability(eps_list)

                revenue_list = [i.get('revenue') for i in income_history[:12] if i.get('revenue')]
                if revenue_list and len(revenue_list) >= 4:
                    metrics['revenue_variability'] = np.std(revenue_list) / np.mean(revenue_list)

            # ===== FINANCIAL SCORES =====
            scores = self.client.get_financial_scores(symbol)
            if scores:
                metrics.update({
                    'altman_z_score': scores.get('altmanZScore'),
                    'piotroski_f_score': scores.get('piotroskiScore'),
                })

            # Data quality assessment
            essential_fields = ['pe_ratio_ttm', 'market_cap', 'gross_margin', 'fcf_ttm']
            non_null = sum(1 for f in essential_fields if metrics.get(f) is not None)

            if non_null == len(essential_fields):
                metrics['data_quality'] = 'COMPLETE'
            elif non_null >= len(essential_fields) // 2:
                metrics['data_quality'] = 'PARTIAL'
            else:
                metrics['data_quality'] = 'INCOMPLETE'

            logger.debug(f"{symbol}: data_quality={metrics['data_quality']}")

        except Exception as e:
            logger.error(f"Error collecting {symbol}: {e}")
            metrics['data_quality'] = 'ERROR'
            metrics['error_message'] = str(e)

        return metrics


def collect_all_stocks(symbols: List[str], max_workers: int = 1) -> pd.DataFrame:
    """
    Collect metrics for all stocks in the universe.
    Uses sequential processing to respect API rate limits.
    """
    logger.info(f"Starting collection for {len(symbols)} stocks")

    client = FMPClient(FMP_API_KEY)
    collector = ComprehensiveCollector(client)

    all_metrics = []
    failed = []

    for i, symbol in enumerate(symbols):
        try:
            metrics = collector.collect_stock_metrics(symbol)
            all_metrics.append(metrics)

            if (i + 1) % 50 == 0:
                logger.info(f"Progress: {i+1}/{len(symbols)} stocks collected")

        except Exception as e:
            logger.error(f"Failed to collect {symbol}: {e}")
            failed.append(symbol)

    logger.info(f"Collection complete: {len(all_metrics)} successful, {len(failed)} failed")

    if failed:
        logger.warning(f"Failed symbols: {failed[:20]}...")

    return pd.DataFrame(all_metrics)


def save_master_dataset(df: pd.DataFrame):
    """Save the master dataset in multiple formats"""
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Main CSV
    main_path = f"{PROCESSED_DIR}/master_dataset.csv"
    df.to_csv(main_path, index=False)
    logger.info(f"Saved: {main_path}")

    # Timestamped backup
    backup_path = f"{PROCESSED_DIR}/master_dataset_{timestamp}.csv"
    df.to_csv(backup_path, index=False)

    # Split by category for easier analysis
    valuation_cols = ['symbol', 'company_name', 'market_cap', 'pe_ratio_ttm',
                      'pe_ratio_forward', 'pb_ratio', 'ps_ratio', 'peg_ratio',
                      'ev_ebitda', 'ev_fcf', 'price_to_fcf', 'enterprise_value']
    df[[c for c in valuation_cols if c in df.columns]].to_csv(
        f"{PROCESSED_DIR}/valuation_metrics.csv", index=False
    )

    profitability_cols = ['symbol', 'gross_margin', 'operating_margin', 'net_margin',
                         'ebitda_margin', 'roe', 'roa', 'roic', 'asset_turnover']
    df[[c for c in profitability_cols if c in df.columns]].to_csv(
        f"{PROCESSED_DIR}/profitability_metrics.csv", index=False
    )

    quality_cols = ['symbol', 'fcf_ttm', 'ocf_ttm', 'fcf_yield', 'fcf_margin',
                   'ocf_to_net_income', 'cash_flow_quality_warning',
                   'piotroski_f_score', 'altman_z_score', 'analyst_beat_rate']
    df[[c for c in quality_cols if c in df.columns]].to_csv(
        f"{PROCESSED_DIR}/quality_metrics.csv", index=False
    )

    growth_cols = ['symbol', 'revenue_growth_yoy', 'revenue_growth_3y', 'revenue_growth_5y',
                   'eps_growth_yoy', 'eps_growth_3y', 'fcf_growth_yoy']
    df[[c for c in growth_cols if c in df.columns]].to_csv(
        f"{PROCESSED_DIR}/growth_metrics.csv", index=False
    )

    logger.info(f"Saved category-specific CSVs to {PROCESSED_DIR}/")


def generate_data_quality_report(df: pd.DataFrame) -> str:
    """Generate comprehensive data quality report"""
    report = []
    report.append("# Comprehensive Data Collection Report")
    report.append(f"\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append(f"\n## Overview\n")
    report.append(f"- Total Stocks Collected: {len(df)}")
    report.append(f"- Data Quality Distribution:")
    report.append(df['data_quality'].value_counts().to_string())

    report.append(f"\n## Field Coverage\n")
    report.append("| Field | Non-Null Count | Coverage % |")
    report.append("|-------|----------------|------------|")

    for col in df.columns:
        non_null = df[col].notna().sum()
        coverage = non_null / len(df) * 100
        if coverage < 100:
            report.append(f"| {col} | {non_null} | {coverage:.1f}% |")

    report.append(f"\n## Sector Distribution\n")
    if 'sector' in df.columns:
        report.append(df['sector'].value_counts().to_string())

    report.append(f"\n## Data Sources\n")
    report.append("- Primary: Financial Modeling Prep (FMP) API")
    report.append("- Valuation/Ratios: FMP key-metrics-ttm, ratios-ttm")
    report.append("- Financial Statements: FMP income-statement, balance-sheet, cash-flow")
    report.append("- Prices: FMP historical-price-full")
    report.append("- Analyst Data: FMP analyst-estimates, earnings-surprises")

    report.append(f"\n## Calculation Methodology\n")
    report.append("- OCF/NI Ratio: Operating Cash Flow / Net Income")
    report.append("- FCF Yield: Free Cash Flow / Market Cap")
    report.append("- EV/FCF: Enterprise Value / Free Cash Flow")
    report.append("- Growth Rates: CAGR from quarterly data")
    report.append("- Beat Rate: % of quarters where actual EPS >= estimate")

    return "\n".join(report)


def main():
    """Main execution function"""
    logger.info("=" * 60)
    logger.info("COMPREHENSIVE DATA COLLECTION STARTED")
    logger.info("=" * 60)

    # Load universe
    universe_path = f"{BASE_DIR}/data/universe/full_universe.csv"
    if os.path.exists(universe_path):
        universe_df = pd.read_csv(universe_path)
        symbols = universe_df['symbol'].tolist()
        logger.info(f"Loaded {len(symbols)} symbols from universe file")
    else:
        # Fall back to existing S&P 500 from database
        logger.warning("Universe file not found, using existing S&P 500 from database")
        conn = sqlite3.connect(DB_PATH)
        symbols_df = pd.read_sql("SELECT symbol FROM companies", conn)
        conn.close()
        symbols = symbols_df['symbol'].tolist()
        logger.info(f"Loaded {len(symbols)} symbols from database")

    # Collect metrics
    metrics_df = collect_all_stocks(symbols)

    # Save results
    save_master_dataset(metrics_df)

    # Generate and save report
    report = generate_data_quality_report(metrics_df)
    report_path = f"{PROCESSED_DIR}/data_collection_report.md"
    with open(report_path, 'w') as f:
        f.write(report)
    logger.info(f"Saved report: {report_path}")

    logger.info("Data collection completed successfully!")

    return metrics_df


if __name__ == "__main__":
    main()
