#!/usr/bin/env python3
"""
Stock Universe Builder for Top20 Screener
==========================================
Builds a comprehensive stock universe from S&P 500, S&P 400, and S&P 600.

Filtering Criteria:
- Market Cap >= $2B
- Average Daily Volume >= $5M
- Listed >= 3 years
- Exclude: ADRs, SPACs, shell companies, clinical-stage biotech

Data Source: FMP API
Version: 1.0
Date: 2026-01-26
"""

import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import json
from typing import List, Dict, Optional
import logging
import os

# Configuration
FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h7FVfb"
FMP_BASE_URL = "https://financialmodelingprep.com"

# Paths
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
UNIVERSE_DIR = f"{BASE_DIR}/data/universe"
LOG_PATH = f"{BASE_DIR}/data/universe_builder.log"

# Filtering thresholds
MIN_MARKET_CAP = 2e9  # $2 billion
MIN_AVG_VOLUME_USD = 5e6  # $5 million daily
MIN_LISTING_YEARS = 3

# Exclusion patterns
EXCLUDE_KEYWORDS = [
    'acquisition', 'spac', 'blank check', 'shell company',
    'adr', 'american depositary', 'sponsored adr'
]

CLINICAL_BIOTECH_KEYWORDS = [
    'clinical stage', 'pre-clinical', 'phase 1', 'phase 2', 'phase i', 'phase ii',
    'development stage', 'no revenue biotech'
]

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


class FMPUniverseBuilder:
    """Builds stock universe from FMP API"""

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

        for attempt in range(3):
            try:
                time.sleep(0.02)  # Rate limiting
                response = self.session.get(url, params=params, timeout=30)
                response.raise_for_status()
                return response.json()
            except requests.exceptions.RequestException as e:
                logger.warning(f"Request failed (attempt {attempt+1}/3): {e}")
                if attempt == 2:
                    logger.error(f"Failed to fetch {endpoint}: {e}")
                    return None
                time.sleep(2 ** attempt)
        return None

    def get_sp500_constituents(self) -> List[Dict]:
        """Get S&P 500 constituents"""
        logger.info("Fetching S&P 500 constituents...")
        data = self._request("sp500_constituent")
        if data:
            logger.info(f"Found {len(data)} S&P 500 companies")
        return data or []

    def get_sp400_constituents(self) -> List[Dict]:
        """Get S&P 400 Mid Cap constituents"""
        logger.info("Fetching S&P 400 constituents...")
        # FMP doesn't have direct S&P 400 endpoint, use stock screener
        data = self._request("dowjones_constituent")
        # Also try screener for mid-cap stocks
        screener_data = self._request("stock-screener", params={
            'marketCapMoreThan': 2e9,
            'marketCapLowerThan': 30e9,
            'exchange': 'NYSE,NASDAQ',
            'isEtf': 'false',
            'isActivelyTrading': 'true',
            'limit': 500
        })

        if screener_data:
            logger.info(f"Found {len(screener_data)} mid-cap stocks via screener")
        return screener_data or []

    def get_all_tradable_stocks(self) -> List[Dict]:
        """Get all tradable stocks from major exchanges"""
        logger.info("Fetching all tradable stocks...")
        data = self._request("stock/list")

        if data:
            # Filter for US exchanges only
            us_exchanges = ['NYSE', 'NASDAQ', 'AMEX']
            filtered = [
                s for s in data
                if s.get('exchangeShortName') in us_exchanges
                and s.get('type') == 'stock'
            ]
            logger.info(f"Found {len(filtered)} US stocks from {len(data)} total")
            return filtered
        return []

    def get_company_profile(self, symbol: str) -> Optional[Dict]:
        """Get detailed company profile"""
        data = self._request(f"profile/{symbol}")
        return data[0] if data else None

    def get_batch_profiles(self, symbols: List[str], batch_size: int = 50) -> List[Dict]:
        """Get profiles for multiple symbols in batches"""
        all_profiles = []

        for i in range(0, len(symbols), batch_size):
            batch = symbols[i:i+batch_size]
            symbol_str = ",".join(batch)

            data = self._request(f"profile/{symbol_str}")
            if data:
                all_profiles.extend(data)

            if (i + batch_size) % 200 == 0:
                logger.info(f"Fetched {min(i+batch_size, len(symbols))}/{len(symbols)} profiles")

            time.sleep(0.1)  # Extra delay for batch requests

        return all_profiles

    def screen_stocks(self) -> List[Dict]:
        """Use stock screener API to get filtered universe"""
        logger.info("Running stock screener...")

        # Get stocks meeting market cap criteria
        params = {
            'marketCapMoreThan': MIN_MARKET_CAP,
            'volumeMoreThan': 100000,  # Will filter by dollar volume later
            'exchange': 'NYSE,NASDAQ',
            'isEtf': 'false',
            'isActivelyTrading': 'true',
            'limit': 5000
        }

        data = self._request("stock-screener", params=params)

        if data:
            logger.info(f"Screener returned {len(data)} stocks")
        return data or []


def is_excluded_company(profile: Dict) -> tuple:
    """
    Check if company should be excluded.
    Returns (is_excluded: bool, reason: str)
    """
    name = (profile.get('companyName') or '').lower()
    description = (profile.get('description') or '').lower()
    industry = (profile.get('industry') or '').lower()
    country = profile.get('country') or ''

    # Check for ADR
    if profile.get('isAdr') == True or country not in ['US', 'United States', '']:
        # Allow companies HQ'd elsewhere but traded on US exchanges as primary
        if 'adr' in name or 'american depositary' in description:
            return True, "ADR"

    # Check for SPAC/shell company
    for keyword in EXCLUDE_KEYWORDS:
        if keyword in name or keyword in description:
            return True, f"Excluded keyword: {keyword}"

    # Check for clinical-stage biotech
    if 'biotechnology' in industry or 'pharmaceutical' in industry:
        for keyword in CLINICAL_BIOTECH_KEYWORDS:
            if keyword in description:
                return True, f"Clinical-stage biotech: {keyword}"

    return False, ""


def calculate_dollar_volume(profile: Dict) -> float:
    """Calculate average daily dollar volume"""
    avg_volume = profile.get('volAvg') or 0
    price = profile.get('price') or 0
    return avg_volume * price


def filter_universe(profiles: List[Dict]) -> pd.DataFrame:
    """Apply all filtering criteria and return qualified stocks"""
    logger.info(f"Filtering {len(profiles)} profiles...")

    qualified = []
    exclusion_reasons = {}

    for profile in profiles:
        symbol = profile.get('symbol', '')

        if not symbol:
            continue

        # Check market cap
        market_cap = profile.get('mktCap') or 0
        if market_cap < MIN_MARKET_CAP:
            exclusion_reasons[symbol] = f"Market cap ${market_cap/1e9:.2f}B < ${MIN_MARKET_CAP/1e9}B"
            continue

        # Check dollar volume
        dollar_volume = calculate_dollar_volume(profile)
        if dollar_volume < MIN_AVG_VOLUME_USD:
            exclusion_reasons[symbol] = f"Dollar volume ${dollar_volume/1e6:.2f}M < ${MIN_AVG_VOLUME_USD/1e6}M"
            continue

        # Check IPO date (3 year minimum)
        ipo_date = profile.get('ipoDate')
        if ipo_date:
            try:
                ipo_dt = datetime.strptime(ipo_date, '%Y-%m-%d')
                years_listed = (datetime.now() - ipo_dt).days / 365
                if years_listed < MIN_LISTING_YEARS:
                    exclusion_reasons[symbol] = f"Listed {years_listed:.1f} years < {MIN_LISTING_YEARS} years"
                    continue
            except:
                pass  # If can't parse date, don't exclude on this criteria

        # Check exclusion criteria
        is_excluded, reason = is_excluded_company(profile)
        if is_excluded:
            exclusion_reasons[symbol] = reason
            continue

        # Passed all filters
        qualified.append({
            'symbol': symbol,
            'company_name': profile.get('companyName', ''),
            'sector': profile.get('sector', ''),
            'industry': profile.get('industry', ''),
            'market_cap': market_cap,
            'market_cap_tier': classify_market_cap(market_cap),
            'price': profile.get('price', 0),
            'beta': profile.get('beta', 1.0),
            'avg_volume': profile.get('volAvg', 0),
            'dollar_volume': dollar_volume,
            'exchange': profile.get('exchangeShortName', ''),
            'ipo_date': ipo_date,
            'country': profile.get('country', ''),
            'cik': profile.get('cik', ''),
            'website': profile.get('website', ''),
            'description': (profile.get('description', '') or '')[:500]  # Truncate
        })

    logger.info(f"Qualified: {len(qualified)}, Excluded: {len(exclusion_reasons)}")

    # Log top exclusion reasons
    reason_counts = {}
    for reason in exclusion_reasons.values():
        reason_type = reason.split(':')[0] if ':' in reason else reason.split('<')[0].strip()
        reason_counts[reason_type] = reason_counts.get(reason_type, 0) + 1

    logger.info("Top exclusion reasons:")
    for reason, count in sorted(reason_counts.items(), key=lambda x: -x[1])[:5]:
        logger.info(f"  {reason}: {count}")

    return pd.DataFrame(qualified)


def classify_market_cap(market_cap: float) -> str:
    """Classify market cap tier"""
    if market_cap >= 200e9:
        return 'Mega'
    elif market_cap >= 10e9:
        return 'Large'
    elif market_cap >= 2e9:
        return 'Mid'
    else:
        return 'Small'


def build_universe() -> pd.DataFrame:
    """Main function to build the stock universe"""
    logger.info("=" * 60)
    logger.info("BUILDING STOCK UNIVERSE")
    logger.info("=" * 60)
    logger.info(f"Criteria: Market Cap >= ${MIN_MARKET_CAP/1e9}B, "
                f"Dollar Volume >= ${MIN_AVG_VOLUME_USD/1e6}M, "
                f"Listed >= {MIN_LISTING_YEARS} years")
    logger.info("=" * 60)

    builder = FMPUniverseBuilder(FMP_API_KEY)

    # Step 1: Get S&P 500 (guaranteed quality)
    sp500 = builder.get_sp500_constituents()
    sp500_symbols = [s['symbol'] for s in sp500]
    logger.info(f"S&P 500 base: {len(sp500_symbols)} symbols")

    # Step 2: Get broader universe via screener
    screener_results = builder.screen_stocks()
    screener_symbols = [s['symbol'] for s in screener_results if s.get('symbol')]

    # Step 3: Combine and deduplicate
    all_symbols = list(set(sp500_symbols + screener_symbols))
    logger.info(f"Combined unique symbols: {len(all_symbols)}")

    # Step 4: Get detailed profiles for all
    logger.info("Fetching detailed profiles...")
    profiles = builder.get_batch_profiles(all_symbols)
    logger.info(f"Retrieved {len(profiles)} profiles")

    # Step 5: Apply filters
    universe_df = filter_universe(profiles)

    # Step 6: Sort and clean
    universe_df = universe_df.sort_values('market_cap', ascending=False)
    universe_df = universe_df.reset_index(drop=True)

    # Step 7: Add index membership flags
    universe_df['in_sp500'] = universe_df['symbol'].isin(sp500_symbols)

    logger.info("=" * 60)
    logger.info(f"FINAL UNIVERSE: {len(universe_df)} stocks")
    logger.info("=" * 60)

    # Summary statistics
    logger.info("\nMarket Cap Distribution:")
    logger.info(universe_df['market_cap_tier'].value_counts().to_string())

    logger.info("\nSector Distribution:")
    logger.info(universe_df['sector'].value_counts().to_string())

    logger.info(f"\nS&P 500 members: {universe_df['in_sp500'].sum()}")
    logger.info(f"Non-S&P 500: {(~universe_df['in_sp500']).sum()}")

    return universe_df


def save_universe(df: pd.DataFrame):
    """Save universe to multiple formats"""
    os.makedirs(UNIVERSE_DIR, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Full universe CSV
    full_path = f"{UNIVERSE_DIR}/full_universe.csv"
    df.to_csv(full_path, index=False)
    logger.info(f"Saved: {full_path}")

    # Timestamped backup
    backup_path = f"{UNIVERSE_DIR}/full_universe_{timestamp}.csv"
    df.to_csv(backup_path, index=False)

    # Symbol-only list for quick reference
    symbols_path = f"{UNIVERSE_DIR}/symbol_list.txt"
    with open(symbols_path, 'w') as f:
        f.write('\n'.join(df['symbol'].tolist()))
    logger.info(f"Saved: {symbols_path}")

    # S&P 500 subset
    sp500_df = df[df['in_sp500']]
    sp500_path = f"{UNIVERSE_DIR}/sp500_constituents.csv"
    sp500_df.to_csv(sp500_path, index=False)
    logger.info(f"Saved: {sp500_path} ({len(sp500_df)} stocks)")

    # Summary stats JSON
    stats = {
        'generated_at': datetime.now().isoformat(),
        'total_stocks': len(df),
        'sp500_count': int(df['in_sp500'].sum()),
        'non_sp500_count': int((~df['in_sp500']).sum()),
        'sector_distribution': df['sector'].value_counts().to_dict(),
        'market_cap_distribution': df['market_cap_tier'].value_counts().to_dict(),
        'filtering_criteria': {
            'min_market_cap': MIN_MARKET_CAP,
            'min_dollar_volume': MIN_AVG_VOLUME_USD,
            'min_listing_years': MIN_LISTING_YEARS
        }
    }

    stats_path = f"{UNIVERSE_DIR}/universe_stats.json"
    with open(stats_path, 'w') as f:
        json.dump(stats, f, indent=2)
    logger.info(f"Saved: {stats_path}")


def main():
    """Main execution"""
    try:
        universe_df = build_universe()
        save_universe(universe_df)
        logger.info("Universe building completed successfully!")
        return universe_df
    except Exception as e:
        logger.error(f"Error building universe: {e}")
        raise


if __name__ == "__main__":
    main()
