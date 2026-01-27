#!/usr/bin/env python3
"""
Market Data Collector for Top20 Screener
Collects comprehensive financial and price data for US stocks using FMP API
"""

import requests
import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import json
from typing import List, Dict, Optional
import logging

# Configuration
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb"
FMP_BASE_URL = "https://financialmodelingprep.com"
DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"
LOG_PATH = "/Users/milton/投资大师/Top20_Screener/data/collector.log"

# Rate limiting
REQUEST_DELAY = 0.02  # 20ms between requests (3000/min limit)
MAX_RETRIES = 3

# Date ranges
END_DATE = datetime.now().strftime('%Y-%m-%d')
START_DATE_5Y = (datetime.now() - timedelta(days=5*365)).strftime('%Y-%m-%d')
START_DATE_3Y = (datetime.now() - timedelta(days=3*365)).strftime('%Y-%m-%d')

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
    """FMP API client with rate limiting and retry logic"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = FMP_BASE_URL
        self.session = requests.Session()

    def _request(self, endpoint: str, params: Optional[Dict] = None, api_version: str = "stable") -> Optional[Dict]:
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
                logger.warning(f"Request failed (attempt {attempt+1}/{MAX_RETRIES}): {e}")
                if attempt == MAX_RETRIES - 1:
                    logger.error(f"Failed to fetch {endpoint}: {e}")
                    return None
                time.sleep(2 ** attempt)  # Exponential backoff
        return None

    def get_sp500_constituents(self) -> List[Dict]:
        """Get S&P 500 constituent list"""
        data = self._request("sp500_constituent", api_version="api/v3")
        return data if data else []

    def get_profile(self, symbol: str) -> Optional[Dict]:
        """Get company profile (includes beta, market cap, sector)"""
        data = self._request(f"profile", params={"symbol": symbol})
        return data[0] if data else None

    def get_quote(self, symbols: List[str]) -> List[Dict]:
        """Get batch quotes (52w high/low, PE, etc.)"""
        symbol_str = ",".join(symbols[:50])  # Limit to 50 per request
        data = self._request(f"quote/{symbol_str}", api_version="api/v3")
        return data if data else []

    def get_historical_prices(self, symbol: str, from_date: str, to_date: str) -> List[Dict]:
        """Get historical daily prices"""
        data = self._request(
            f"historical-price-full/{symbol}",
            params={"from": from_date, "to": to_date},
            api_version="api/v3"
        )
        return data.get('historical', []) if data else []

    def get_income_statement_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM income statement"""
        data = self._request("income-statement-ttm", params={"symbol": symbol})
        return data[0] if data else None

    def get_balance_sheet_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM balance sheet"""
        data = self._request("balance-sheet-statement-ttm", params={"symbol": symbol})
        return data[0] if data else None

    def get_cash_flow_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM cash flow statement"""
        data = self._request("cash-flow-statement-ttm", params={"symbol": symbol})
        return data[0] if data else None

    def get_financial_scores(self, symbol: str) -> Optional[Dict]:
        """Get financial scores (Altman Z-Score, Piotroski F-Score)"""
        data = self._request("financial-scores", params={"symbol": symbol})
        return data[0] if data else None

    def get_key_metrics_ttm(self, symbol: str) -> Optional[Dict]:
        """Get TTM key metrics (P/E, P/B, etc.)"""
        data = self._request("key-metrics-ttm", params={"symbol": symbol})
        return data[0] if data else None


class DatabaseManager:
    """SQLite database manager"""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = None

    def connect(self):
        """Create database connection"""
        self.conn = sqlite3.connect(self.db_path)
        self.create_tables()

    def create_tables(self):
        """Create database schema"""
        cursor = self.conn.cursor()

        # Companies table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS companies (
            symbol TEXT PRIMARY KEY,
            name TEXT,
            sector TEXT,
            industry TEXT,
            market_cap REAL,
            beta REAL,
            cik TEXT,
            exchange TEXT,
            last_updated TIMESTAMP
        )
        """)

        # Daily prices table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS daily_prices (
            symbol TEXT,
            date DATE,
            open REAL,
            high REAL,
            low REAL,
            close REAL,
            adj_close REAL,
            volume INTEGER,
            PRIMARY KEY (symbol, date),
            FOREIGN KEY (symbol) REFERENCES companies(symbol)
        )
        """)

        # Financial statements table (TTM)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS financials_ttm (
            symbol TEXT PRIMARY KEY,
            revenue REAL,
            gross_profit REAL,
            operating_income REAL,
            net_income REAL,
            ebitda REAL,
            operating_cash_flow REAL,
            free_cash_flow REAL,
            capex REAL,
            total_assets REAL,
            total_liabilities REAL,
            total_equity REAL,
            total_debt REAL,
            cash_and_equivalents REAL,
            accounts_receivable REAL,
            inventory REAL,
            goodwill REAL,
            shares_outstanding REAL,
            last_updated TIMESTAMP,
            FOREIGN KEY (symbol) REFERENCES companies(symbol)
        )
        """)

        # Key metrics table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS metrics (
            symbol TEXT PRIMARY KEY,
            pe_ratio REAL,
            pb_ratio REAL,
            ps_ratio REAL,
            pfcf_ratio REAL,
            peg_ratio REAL,
            ev_ebitda REAL,
            dividend_yield REAL,
            roe REAL,
            roa REAL,
            roic REAL,
            gross_margin REAL,
            operating_margin REAL,
            net_margin REAL,
            debt_to_equity REAL,
            current_ratio REAL,
            quick_ratio REAL,
            last_updated TIMESTAMP,
            FOREIGN KEY (symbol) REFERENCES companies(symbol)
        )
        """)

        # Risk metrics table (calculated)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS risk_metrics (
            symbol TEXT PRIMARY KEY,
            sharpe_ratio REAL,
            sortino_ratio REAL,
            max_drawdown REAL,
            volatility REAL,
            beta_sp500 REAL,
            avg_daily_volume REAL,
            calculation_date TIMESTAMP,
            FOREIGN KEY (symbol) REFERENCES companies(symbol)
        )
        """)

        # Data quality tracking
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS data_quality (
            symbol TEXT PRIMARY KEY,
            has_profile INTEGER,
            has_prices INTEGER,
            has_financials INTEGER,
            has_metrics INTEGER,
            price_data_days INTEGER,
            last_checked TIMESTAMP,
            FOREIGN KEY (symbol) REFERENCES companies(symbol)
        )
        """)

        self.conn.commit()

    def insert_company(self, data: Dict):
        """Insert or update company data"""
        cursor = self.conn.cursor()
        cursor.execute("""
        INSERT OR REPLACE INTO companies
        (symbol, name, sector, industry, market_cap, beta, cik, exchange, last_updated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('symbol'),
            data.get('companyName') or data.get('name'),
            data.get('sector'),
            data.get('industry') or data.get('subSector'),
            data.get('mktCap') or data.get('marketCap'),
            data.get('beta'),
            data.get('cik'),
            data.get('exchangeShortName') or data.get('exchange'),
            datetime.now()
        ))
        self.conn.commit()

    def insert_prices_batch(self, symbol: str, prices: List[Dict]):
        """Insert batch of historical prices"""
        cursor = self.conn.cursor()
        for price in prices:
            cursor.execute("""
            INSERT OR REPLACE INTO daily_prices
            (symbol, date, open, high, low, close, adj_close, volume)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                symbol,
                price.get('date'),
                price.get('open'),
                price.get('high'),
                price.get('low'),
                price.get('close'),
                price.get('adjClose') or price.get('close'),
                price.get('volume')
            ))
        self.conn.commit()

    def insert_financials_ttm(self, symbol: str, income: Dict, balance: Dict, cash_flow: Dict):
        """Insert TTM financial statements"""
        cursor = self.conn.cursor()
        cursor.execute("""
        INSERT OR REPLACE INTO financials_ttm
        (symbol, revenue, gross_profit, operating_income, net_income, ebitda,
         operating_cash_flow, free_cash_flow, capex, total_assets, total_liabilities,
         total_equity, total_debt, cash_and_equivalents, accounts_receivable,
         inventory, goodwill, shares_outstanding, last_updated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            symbol,
            income.get('revenue'),
            income.get('grossProfit'),
            income.get('operatingIncome'),
            income.get('netIncome'),
            income.get('ebitda'),
            cash_flow.get('operatingCashFlow'),
            cash_flow.get('freeCashFlow'),
            cash_flow.get('capitalExpenditure'),
            balance.get('totalAssets'),
            balance.get('totalLiabilities'),
            balance.get('totalStockholdersEquity') or balance.get('totalEquity'),
            balance.get('totalDebt'),
            balance.get('cashAndCashEquivalents'),
            balance.get('netReceivables') or balance.get('accountsReceivable'),
            balance.get('inventory'),
            balance.get('goodwill'),
            balance.get('weightedAverageShsOut'),
            datetime.now()
        ))
        self.conn.commit()

    def insert_metrics(self, symbol: str, metrics: Dict, quote: Dict = None):
        """Insert key metrics"""
        cursor = self.conn.cursor()

        # FMP field mapping (TTM suffix not used in all fields)
        pe = metrics.get('peRatioTTM') or metrics.get('peRatio') or (quote.get('pe') if quote else None)
        pb = metrics.get('pbRatioTTM') or metrics.get('pbRatio') or (quote.get('priceToBook') if quote else None)

        # Extract from income statement for margins if not in metrics
        # These will be calculated from financial statements if needed

        cursor.execute("""
        INSERT OR REPLACE INTO metrics
        (symbol, pe_ratio, pb_ratio, ps_ratio, pfcf_ratio, peg_ratio, ev_ebitda,
         dividend_yield, roe, roa, roic, gross_margin, operating_margin, net_margin,
         debt_to_equity, current_ratio, quick_ratio, last_updated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            symbol,
            pe,
            pb,
            metrics.get('priceToSalesRatioTTM') or metrics.get('evToSalesTTM'),
            metrics.get('pfcfRatioTTM'),
            metrics.get('pegRatioTTM'),
            metrics.get('evToEbitdaTTM') or metrics.get('evToEBITDATTM'),
            metrics.get('dividendYieldTTM') or (quote.get('dividendYield') if quote else None),
            metrics.get('returnOnEquityTTM') or metrics.get('roeTTM'),
            metrics.get('returnOnAssetsTTM') or metrics.get('returnOnTangibleAssetsTTM'),
            metrics.get('returnOnInvestedCapitalTTM') or metrics.get('roicTTM'),
            None,  # gross_margin - calculate from income statement
            None,  # operating_margin - calculate from income statement
            None,  # net_margin - calculate from income statement
            None,  # debt_to_equity - calculate from balance sheet
            metrics.get('currentRatioTTM'),
            None,  # quick_ratio - calculate from balance sheet
            datetime.now()
        ))
        self.conn.commit()

    def get_symbols_with_prices(self) -> List[str]:
        """Get symbols that have price data"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT DISTINCT symbol FROM daily_prices")
        return [row[0] for row in cursor.fetchall()]

    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()


class RiskCalculator:
    """Calculate risk-adjusted return metrics"""

    @staticmethod
    def calculate_sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.042) -> float:
        """
        Calculate Sharpe Ratio
        Args:
            returns: Daily returns series
            risk_free_rate: Annual risk-free rate (default: 4.2% based on 5Y Treasury)
        """
        if len(returns) < 252:  # Need at least 1 year of data
            return None

        # Convert annual risk-free rate to daily
        daily_rf = (1 + risk_free_rate) ** (1/252) - 1

        # Calculate excess returns
        excess_returns = returns - daily_rf

        # Annualize
        sharpe = (excess_returns.mean() * 252) / (returns.std() * np.sqrt(252))
        return sharpe

    @staticmethod
    def calculate_sortino_ratio(returns: pd.Series, risk_free_rate: float = 0.042) -> float:
        """Calculate Sortino Ratio (downside deviation only)"""
        if len(returns) < 252:
            return None

        daily_rf = (1 + risk_free_rate) ** (1/252) - 1
        excess_returns = returns - daily_rf

        # Downside deviation
        downside_returns = returns[returns < 0]
        downside_std = downside_returns.std()

        if downside_std == 0:
            return None

        sortino = (excess_returns.mean() * 252) / (downside_std * np.sqrt(252))
        return sortino

    @staticmethod
    def calculate_max_drawdown(prices: pd.Series) -> float:
        """Calculate maximum drawdown"""
        cummax = prices.cummax()
        drawdown = (prices - cummax) / cummax
        return drawdown.min()

    @staticmethod
    def calculate_beta(returns: pd.Series, market_returns: pd.Series) -> float:
        """Calculate beta vs market (S&P 500)"""
        if len(returns) < 252 or len(market_returns) < 252:
            return None

        # Align dates
        aligned = pd.DataFrame({'stock': returns, 'market': market_returns}).dropna()

        if len(aligned) < 252:
            return None

        covariance = aligned['stock'].cov(aligned['market'])
        market_variance = aligned['market'].var()

        return covariance / market_variance if market_variance != 0 else None


def collect_stock_data(client: FMPClient, db: DatabaseManager, symbol: str) -> Dict[str, bool]:
    """
    Collect all data for a single stock
    Returns: dict of data collection status
    """
    status = {
        'profile': False,
        'prices': False,
        'financials': False,
        'metrics': False
    }

    logger.info(f"Collecting data for {symbol}")

    # 1. Company Profile
    profile = client.get_profile(symbol)
    if profile:
        db.insert_company(profile)
        status['profile'] = True
    else:
        logger.warning(f"{symbol}: Failed to get profile")
        return status

    # 2. Historical Prices (5 years)
    prices = client.get_historical_prices(symbol, START_DATE_5Y, END_DATE)
    if prices:
        db.insert_prices_batch(symbol, prices)
        status['prices'] = True
        logger.info(f"{symbol}: Collected {len(prices)} price records")
    else:
        logger.warning(f"{symbol}: Failed to get price data")

    # 3. Financial Statements (TTM)
    income = client.get_income_statement_ttm(symbol)
    balance = client.get_balance_sheet_ttm(symbol)
    cash_flow = client.get_cash_flow_ttm(symbol)

    if income and balance and cash_flow:
        db.insert_financials_ttm(symbol, income, balance, cash_flow)
        status['financials'] = True
    else:
        logger.warning(f"{symbol}: Incomplete financial data")

    # 4. Key Metrics
    metrics = client.get_key_metrics_ttm(symbol)
    if metrics:
        db.insert_metrics(symbol, metrics)
        status['metrics'] = True
    else:
        logger.warning(f"{symbol}: Failed to get metrics")

    # Update data quality tracking
    cursor = db.conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO data_quality
    (symbol, has_profile, has_prices, has_financials, has_metrics, price_data_days, last_checked)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        symbol,
        int(status['profile']),
        int(status['prices']),
        int(status['financials']),
        int(status['metrics']),
        len(prices) if prices else 0,
        datetime.now()
    ))
    db.conn.commit()

    return status


def calculate_risk_metrics(db: DatabaseManager, symbols: List[str] = None):
    """Calculate risk metrics for stocks with price data"""
    logger.info("Calculating risk metrics...")

    conn = sqlite3.connect(db.db_path)

    # Get S&P 500 prices for beta calculation
    sp500_prices = pd.read_sql("""
    SELECT date, adj_close FROM daily_prices
    WHERE symbol = 'SPY'
    ORDER BY date
    """, conn, parse_dates=['date'], index_col='date')

    if sp500_prices.empty:
        logger.warning("No SPY data found, fetching...")
        client = FMPClient(FMP_API_KEY)
        spy_prices = client.get_historical_prices('SPY', START_DATE_5Y, END_DATE)
        if spy_prices:
            db.insert_prices_batch('SPY', spy_prices)
            sp500_prices = pd.read_sql("""
            SELECT date, adj_close FROM daily_prices
            WHERE symbol = 'SPY'
            ORDER BY date
            """, conn, parse_dates=['date'], index_col='date')

    sp500_returns = sp500_prices['adj_close'].pct_change()

    if symbols is None:
        symbols = db.get_symbols_with_prices()

    calculator = RiskCalculator()
    cursor = conn.cursor()

    for symbol in symbols:
        if symbol == 'SPY':
            continue

        # Get price data
        prices_df = pd.read_sql(f"""
        SELECT date, adj_close, volume FROM daily_prices
        WHERE symbol = '{symbol}'
        ORDER BY date
        """, conn, parse_dates=['date'], index_col='date')

        if len(prices_df) < 252:
            logger.debug(f"{symbol}: Insufficient price data ({len(prices_df)} days)")
            continue

        returns = prices_df['adj_close'].pct_change().dropna()

        # Calculate metrics
        sharpe = calculator.calculate_sharpe_ratio(returns)
        sortino = calculator.calculate_sortino_ratio(returns)
        max_dd = calculator.calculate_max_drawdown(prices_df['adj_close'])
        volatility = returns.std() * np.sqrt(252)  # Annualized
        beta = calculator.calculate_beta(returns, sp500_returns)
        avg_volume = prices_df['volume'].mean()

        # Insert into database
        cursor.execute("""
        INSERT OR REPLACE INTO risk_metrics
        (symbol, sharpe_ratio, sortino_ratio, max_drawdown, volatility, beta_sp500, avg_daily_volume, calculation_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            symbol, sharpe, sortino, max_dd, volatility, beta, avg_volume, datetime.now()
        ))

        if sharpe:
            logger.debug(f"{symbol}: Sharpe={sharpe:.2f}, Sortino={sortino:.2f}, MaxDD={max_dd:.2%}, Vol={volatility:.2%}")

    conn.commit()
    conn.close()
    logger.info("Risk metrics calculation complete")


def generate_data_quality_report(db_path: str) -> str:
    """Generate data quality report"""
    conn = sqlite3.connect(db_path)

    report = ["# Data Quality Report\n"]
    report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

    # Overall statistics
    stats = pd.read_sql("""
    SELECT
        COUNT(*) as total_companies,
        SUM(has_profile) as with_profile,
        SUM(has_prices) as with_prices,
        SUM(has_financials) as with_financials,
        SUM(has_metrics) as with_metrics,
        AVG(price_data_days) as avg_price_days
    FROM data_quality
    """, conn)

    report.append("## Overall Statistics\n\n")
    report.append(f"- Total Companies: {stats['total_companies'][0]}\n")
    report.append(f"- With Profile: {stats['with_profile'][0]} ({stats['with_profile'][0]/stats['total_companies'][0]*100:.1f}%)\n")
    report.append(f"- With Prices: {stats['with_prices'][0]} ({stats['with_prices'][0]/stats['total_companies'][0]*100:.1f}%)\n")
    report.append(f"- With Financials: {stats['with_financials'][0]} ({stats['with_financials'][0]/stats['total_companies'][0]*100:.1f}%)\n")
    report.append(f"- With Metrics: {stats['with_metrics'][0]} ({stats['with_metrics'][0]/stats['total_companies'][0]*100:.1f}%)\n")
    report.append(f"- Average Price Data Days: {stats['avg_price_days'][0]:.0f}\n\n")

    # Sector distribution
    sectors = pd.read_sql("""
    SELECT sector, COUNT(*) as count
    FROM companies
    GROUP BY sector
    ORDER BY count DESC
    """, conn)

    report.append("## Sector Distribution\n\n")
    report.append(sectors.to_markdown(index=False))
    report.append("\n\n")

    # Companies with complete data
    complete = pd.read_sql("""
    SELECT COUNT(*) as complete_count
    FROM data_quality
    WHERE has_profile = 1 AND has_prices = 1 AND has_financials = 1 AND has_metrics = 1
    """, conn)

    report.append(f"## Data Completeness\n\n")
    report.append(f"- Companies with Complete Data: {complete['complete_count'][0]}\n")
    report.append(f"- Completeness Rate: {complete['complete_count'][0]/stats['total_companies'][0]*100:.1f}%\n\n")

    # Risk metrics coverage
    risk_coverage = pd.read_sql("""
    SELECT COUNT(*) as risk_count
    FROM risk_metrics
    WHERE sharpe_ratio IS NOT NULL
    """, conn)

    report.append(f"## Risk Metrics Coverage\n\n")
    report.append(f"- Companies with Risk Metrics: {risk_coverage['risk_count'][0]}\n\n")

    # Missing data analysis
    missing = pd.read_sql("""
    SELECT symbol, has_profile, has_prices, has_financials, has_metrics, price_data_days
    FROM data_quality
    WHERE has_profile = 0 OR has_prices = 0 OR has_financials = 0 OR has_metrics = 0
    ORDER BY price_data_days DESC
    LIMIT 20
    """, conn)

    if not missing.empty:
        report.append("## Top 20 Incomplete Records\n\n")
        report.append(missing.to_markdown(index=False))
        report.append("\n")

    conn.close()
    return "".join(report)


def main():
    """Main execution function"""
    logger.info("=" * 60)
    logger.info("Market Data Collection Started")
    logger.info("=" * 60)

    # Initialize
    client = FMPClient(FMP_API_KEY)
    db = DatabaseManager(DB_PATH)
    db.connect()

    # Get S&P 500 constituents
    logger.info("Fetching S&P 500 constituent list...")
    sp500 = client.get_sp500_constituents()
    logger.info(f"Found {len(sp500)} S&P 500 companies")

    # Collect data for each stock
    success_count = 0
    failed_symbols = []

    for i, company in enumerate(sp500):
        symbol = company['symbol']

        try:
            status = collect_stock_data(client, db, symbol)

            if all(status.values()):
                success_count += 1
            else:
                failed_symbols.append(symbol)

            if (i + 1) % 50 == 0:
                logger.info(f"Progress: {i+1}/{len(sp500)} companies processed ({success_count} complete)")

        except Exception as e:
            logger.error(f"Error processing {symbol}: {e}")
            failed_symbols.append(symbol)

    logger.info(f"Data collection complete: {success_count}/{len(sp500)} successful")

    # Calculate risk metrics
    logger.info("Calculating risk metrics...")
    calculate_risk_metrics(db)

    # Generate report
    logger.info("Generating data quality report...")
    report = generate_data_quality_report(DB_PATH)

    report_path = "/Users/milton/投资大师/Top20_Screener/data/data_quality_report.md"
    with open(report_path, 'w') as f:
        f.write(report)

    logger.info(f"Report saved to {report_path}")

    if failed_symbols:
        logger.warning(f"Failed symbols ({len(failed_symbols)}): {', '.join(failed_symbols[:20])}")

    db.close()
    logger.info("Data collection process completed")


if __name__ == "__main__":
    main()
