#!/usr/bin/env python3
"""
Top 20 Stock Screener
Filters stocks based on multiple criteria including risk-adjusted returns
"""

import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime
from typing import List, Dict, Tuple
import logging

DB_PATH = "/Users/milton/投资大师/Top20_Screener/data/market_data.db"
OUTPUT_PATH = "/Users/milton/投资大师/Top20_Screener/data/top20_results.csv"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class StockScreener:
    """Multi-criteria stock screener"""

    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = None

    def connect(self):
        """Connect to database"""
        self.conn = sqlite3.connect(self.db_path)

    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()

    def get_screening_universe(self, min_market_cap: float = 1e9, min_volume: float = 5e6) -> pd.DataFrame:
        """
        Get initial screening universe
        Args:
            min_market_cap: Minimum market cap in dollars (default: $1B)
            min_volume: Minimum average daily volume in dollars (default: $5M)
        """
        query = f"""
        SELECT DISTINCT
            c.symbol,
            c.name,
            c.sector,
            c.industry,
            c.market_cap,
            c.beta,
            r.avg_daily_volume
        FROM companies c
        INNER JOIN risk_metrics r ON c.symbol = r.symbol
        WHERE c.market_cap >= {min_market_cap}
        AND r.avg_daily_volume >= {min_volume}
        AND c.sector IS NOT NULL
        """

        df = pd.read_sql(query, self.conn)
        logger.info(f"Initial universe: {len(df)} stocks")
        return df

    def get_comprehensive_metrics(self, symbols: List[str]) -> pd.DataFrame:
        """Get all metrics for given symbols"""
        symbol_list = "','".join(symbols)

        query = f"""
        SELECT
            c.symbol,
            c.name,
            c.sector,
            c.industry,
            c.market_cap,
            c.beta as beta_profile,

            -- Financial metrics
            f.revenue,
            f.net_income,
            f.operating_cash_flow,
            f.free_cash_flow,
            f.total_debt,
            f.cash_and_equivalents,
            f.total_equity,

            -- Valuation metrics
            m.pe_ratio,
            m.pb_ratio,
            m.ps_ratio,
            m.pfcf_ratio,
            m.peg_ratio,
            m.ev_ebitda,
            m.dividend_yield,

            -- Profitability metrics
            m.roe,
            m.roa,
            m.roic,
            m.gross_margin,
            m.operating_margin,
            m.net_margin,

            -- Financial health
            m.debt_to_equity,
            m.current_ratio,
            m.quick_ratio,

            -- Risk metrics
            r.sharpe_ratio,
            r.sortino_ratio,
            r.max_drawdown,
            r.volatility,
            r.beta_sp500,
            r.avg_daily_volume

        FROM companies c
        LEFT JOIN financials_ttm f ON c.symbol = f.symbol
        LEFT JOIN metrics m ON c.symbol = m.symbol
        LEFT JOIN risk_metrics r ON c.symbol = r.symbol
        WHERE c.symbol IN ('{symbol_list}')
        """

        df = pd.read_sql(query, self.conn)
        return df

    def apply_quality_filters(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Apply quality filters
        - Positive earnings
        - Positive operating cash flow
        - Debt to equity < 2.0 (unless REIT/financial)
        - Current ratio > 1.0
        """
        initial_count = len(df)

        # Positive earnings
        df = df[df['net_income'] > 0]
        logger.info(f"After positive earnings filter: {len(df)} stocks (removed {initial_count - len(df)})")

        # Positive operating cash flow
        df = df[df['operating_cash_flow'] > 0]
        logger.info(f"After positive OCF filter: {len(df)} stocks")

        # Cash flow quality: OCF/Net Income > 0.7
        df['ocf_to_ni'] = df['operating_cash_flow'] / df['net_income']
        df = df[df['ocf_to_ni'] >= 0.7]
        logger.info(f"After cash flow quality filter: {len(df)} stocks")

        # Debt to equity filter (more lenient for financials/REITs)
        financial_sectors = ['Financial Services', 'Real Estate']
        non_financial = df[~df['sector'].isin(financial_sectors)]
        financial = df[df['sector'].isin(financial_sectors)]

        non_financial = non_financial[non_financial['debt_to_equity'] < 2.0]
        df = pd.concat([non_financial, financial])
        logger.info(f"After debt/equity filter: {len(df)} stocks")

        # Current ratio (liquidity)
        df = df[df['current_ratio'] > 1.0]
        logger.info(f"After current ratio filter: {len(df)} stocks")

        return df

    def apply_profitability_filters(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Apply profitability filters
        - ROE > 10%
        - Operating margin > 5%
        - Gross margin > 20%
        """
        initial_count = len(df)

        df = df[df['roe'] > 0.10]
        logger.info(f"After ROE > 10% filter: {len(df)} stocks")

        df = df[df['operating_margin'] > 0.05]
        logger.info(f"After operating margin > 5% filter: {len(df)} stocks")

        df = df[df['gross_margin'] > 0.20]
        logger.info(f"After gross margin > 20% filter: {len(df)} stocks")

        return df

    def apply_valuation_filters(self, df: pd.DataFrame, max_pe: float = 30) -> pd.DataFrame:
        """
        Apply valuation filters
        - P/E < max_pe (or PEG < 2.0 for growth stocks)
        - P/FCF < 40
        """
        initial_count = len(df)

        # P/E filter with PEG exception for growth
        reasonable_pe = (df['pe_ratio'] < max_pe) | ((df['peg_ratio'] < 2.0) & (df['peg_ratio'] > 0))
        df = df[reasonable_pe]
        logger.info(f"After P/E filter: {len(df)} stocks")

        # P/FCF filter
        df = df[(df['pfcf_ratio'] < 40) | (df['pfcf_ratio'].isna())]
        logger.info(f"After P/FCF filter: {len(df)} stocks")

        return df

    def apply_risk_filters(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Apply risk-adjusted return filters
        - Sharpe ratio > 0 (beat risk-free rate)
        - Max drawdown > -60% (not catastrophic losses)
        - Volatility < 60% (not extremely volatile)
        """
        initial_count = len(df)

        df = df[df['sharpe_ratio'] > 0]
        logger.info(f"After Sharpe > 0 filter: {len(df)} stocks")

        df = df[df['max_drawdown'] > -0.60]
        logger.info(f"After max drawdown filter: {len(df)} stocks")

        df = df[df['volatility'] < 0.60]
        logger.info(f"After volatility filter: {len(df)} stocks")

        return df

    def calculate_composite_score(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Calculate composite score based on multiple factors
        Weights:
        - Sharpe ratio: 25%
        - ROE: 15%
        - Operating margin: 10%
        - Revenue growth: 15%
        - Valuation (inverse P/E): 15%
        - Financial strength: 10%
        - Sortino ratio: 10%
        """

        # Normalize metrics to 0-100 scale
        def normalize(series: pd.Series, inverse: bool = False) -> pd.Series:
            """Normalize to 0-100 scale"""
            if inverse:
                # For metrics where lower is better (P/E, volatility)
                series = 1 / series.replace(0, np.nan)

            min_val = series.quantile(0.05)  # Use 5th percentile to handle outliers
            max_val = series.quantile(0.95)  # Use 95th percentile

            normalized = ((series - min_val) / (max_val - min_val)) * 100
            return normalized.clip(0, 100)

        # Component scores
        df['score_sharpe'] = normalize(df['sharpe_ratio'])
        df['score_roe'] = normalize(df['roe'])
        df['score_margin'] = normalize(df['operating_margin'])
        df['score_valuation'] = normalize(df['pe_ratio'], inverse=True)
        df['score_sortino'] = normalize(df['sortino_ratio'])

        # Financial strength score
        df['score_financial'] = (
            normalize(df['current_ratio']) * 0.3 +
            normalize(df['ocf_to_ni']) * 0.4 +
            normalize(1 / (df['debt_to_equity'] + 0.01)) * 0.3
        )

        # Composite score
        df['composite_score'] = (
            df['score_sharpe'] * 0.25 +
            df['score_roe'] * 0.15 +
            df['score_margin'] * 0.10 +
            df['score_valuation'] * 0.15 +
            df['score_financial'] * 0.10 +
            df['score_sortino'] * 0.10
        )

        # Add any available revenue growth (would need historical data)
        # For now, use ROE as proxy for growth potential

        return df

    def get_top_n(self, df: pd.DataFrame, n: int = 20) -> pd.DataFrame:
        """Get top N stocks by composite score"""
        df = df.sort_values('composite_score', ascending=False)
        return df.head(n)

    def run_full_screen(self, min_market_cap: float = 1e9, min_volume: float = 5e6,
                       max_pe: float = 30, top_n: int = 20) -> pd.DataFrame:
        """
        Run complete screening process
        """
        logger.info("=" * 60)
        logger.info("Starting Stock Screening Process")
        logger.info("=" * 60)

        # Get universe
        universe = self.get_screening_universe(min_market_cap, min_volume)

        if universe.empty:
            logger.error("No stocks in initial universe")
            return pd.DataFrame()

        # Get comprehensive metrics
        logger.info("Fetching comprehensive metrics...")
        df = self.get_comprehensive_metrics(universe['symbol'].tolist())

        # Apply filters
        logger.info("\nApplying quality filters...")
        df = self.apply_quality_filters(df)

        logger.info("\nApplying profitability filters...")
        df = self.apply_profitability_filters(df)

        logger.info("\nApplying valuation filters...")
        df = self.apply_valuation_filters(df, max_pe)

        logger.info("\nApplying risk filters...")
        df = self.apply_risk_filters(df)

        if df.empty:
            logger.warning("No stocks passed all filters")
            return df

        # Calculate composite score
        logger.info("\nCalculating composite scores...")
        df = self.calculate_composite_score(df)

        # Get top N
        top_stocks = self.get_top_n(df, top_n)

        logger.info(f"\n{'=' * 60}")
        logger.info(f"Screening Complete: {len(top_stocks)} stocks selected")
        logger.info(f"{'=' * 60}\n")

        return top_stocks

    def export_results(self, df: pd.DataFrame, output_path: str):
        """Export results to CSV"""
        # Select columns for export
        export_columns = [
            'symbol', 'name', 'sector', 'industry', 'market_cap',
            'composite_score',
            'sharpe_ratio', 'sortino_ratio', 'max_drawdown', 'volatility',
            'roe', 'operating_margin', 'net_margin',
            'pe_ratio', 'pb_ratio', 'pfcf_ratio', 'peg_ratio',
            'debt_to_equity', 'current_ratio',
            'revenue', 'net_income', 'free_cash_flow',
            'dividend_yield'
        ]

        export_df = df[export_columns].copy()

        # Format numbers
        export_df['market_cap'] = export_df['market_cap'].apply(lambda x: f"${x/1e9:.2f}B")
        export_df['revenue'] = export_df['revenue'].apply(lambda x: f"${x/1e9:.2f}B" if pd.notna(x) else "")
        export_df['net_income'] = export_df['net_income'].apply(lambda x: f"${x/1e6:.1f}M" if pd.notna(x) else "")
        export_df['free_cash_flow'] = export_df['free_cash_flow'].apply(lambda x: f"${x/1e6:.1f}M" if pd.notna(x) else "")

        # Round percentages
        pct_cols = ['sharpe_ratio', 'sortino_ratio', 'max_drawdown', 'volatility',
                    'roe', 'operating_margin', 'net_margin', 'dividend_yield']
        for col in pct_cols:
            if col in export_df.columns:
                export_df[col] = export_df[col].round(4)

        # Round ratios
        ratio_cols = ['pe_ratio', 'pb_ratio', 'pfcf_ratio', 'peg_ratio', 'debt_to_equity', 'current_ratio']
        for col in ratio_cols:
            if col in export_df.columns:
                export_df[col] = export_df[col].round(2)

        export_df.to_csv(output_path, index=False)
        logger.info(f"Results exported to {output_path}")

    def generate_summary_report(self, df: pd.DataFrame) -> str:
        """Generate summary report"""
        if df.empty:
            return "No stocks passed screening criteria"

        report = []
        report.append("\n" + "=" * 80)
        report.append(" TOP 20 STOCK SCREENING RESULTS")
        report.append("=" * 80 + "\n")

        # Overall statistics
        report.append("## Summary Statistics\n")
        report.append(f"- Total Stocks Selected: {len(df)}")
        report.append(f"- Average Market Cap: ${df['market_cap'].mean()/1e9:.2f}B")
        report.append(f"- Average Sharpe Ratio: {df['sharpe_ratio'].mean():.3f}")
        report.append(f"- Average ROE: {df['roe'].mean():.2%}")
        report.append(f"- Average P/E: {df['pe_ratio'].mean():.1f}")
        report.append(f"- Average Composite Score: {df['composite_score'].mean():.1f}\n")

        # Sector distribution
        report.append("## Sector Distribution\n")
        sector_counts = df['sector'].value_counts()
        for sector, count in sector_counts.items():
            report.append(f"- {sector}: {count} stocks")
        report.append("\n")

        # Top 10 by composite score
        report.append("## Top 10 by Composite Score\n")
        top10 = df.nlargest(10, 'composite_score')
        report.append(f"{'Rank':<5} {'Symbol':<8} {'Name':<30} {'Score':<8} {'Sharpe':<8} {'ROE':<8} {'P/E':<8}")
        report.append("-" * 80)

        for i, row in enumerate(top10.itertuples(), 1):
            report.append(
                f"{i:<5} {row.symbol:<8} {row.name[:28]:<30} "
                f"{row.composite_score:>6.1f}  {row.sharpe_ratio:>6.2f}  "
                f"{row.roe:>6.1%}  {row.pe_ratio:>6.1f}"
            )

        report.append("\n")

        # Best risk-adjusted returns
        report.append("## Best Risk-Adjusted Returns (Sharpe Ratio)\n")
        best_sharpe = df.nlargest(5, 'sharpe_ratio')
        for row in best_sharpe.itertuples():
            report.append(
                f"- {row.symbol} ({row.name[:20]}): Sharpe {row.sharpe_ratio:.3f}, "
                f"Return/Vol: {row.sharpe_ratio * row.volatility:.2%} / {row.volatility:.2%}"
            )

        report.append("\n")

        # Best profitability
        report.append("## Best Profitability (ROE)\n")
        best_roe = df.nlargest(5, 'roe')
        for row in best_roe.itertuples():
            report.append(
                f"- {row.symbol} ({row.name[:20]}): ROE {row.roe:.2%}, "
                f"Margin {row.operating_margin:.2%}, P/E {row.pe_ratio:.1f}"
            )

        report.append("\n")

        # Best value
        report.append("## Best Value (P/E Ratio)\n")
        best_value = df[df['pe_ratio'] > 0].nsmallest(5, 'pe_ratio')
        for row in best_value.itertuples():
            report.append(
                f"- {row.symbol} ({row.name[:20]}): P/E {row.pe_ratio:.1f}, "
                f"ROE {row.roe:.2%}, Sharpe {row.sharpe_ratio:.3f}"
            )

        report.append("\n")

        # Risk warnings
        report.append("## Risk Considerations\n")
        high_vol = df[df['volatility'] > 0.40]
        if not high_vol.empty:
            report.append(f"- {len(high_vol)} stocks have volatility >40%: {', '.join(high_vol['symbol'].tolist())}")

        high_dd = df[df['max_drawdown'] < -0.40]
        if not high_dd.empty:
            report.append(f"- {len(high_dd)} stocks experienced drawdown >40%: {', '.join(high_dd['symbol'].tolist())}")

        high_pe = df[df['pe_ratio'] > 25]
        if not high_pe.empty:
            report.append(f"- {len(high_pe)} stocks have P/E >25: {', '.join(high_pe['symbol'].tolist())}")

        report.append("\n" + "=" * 80 + "\n")

        return "\n".join(report)


def main():
    """Main execution"""
    screener = StockScreener(DB_PATH)
    screener.connect()

    # Run screening
    results = screener.run_full_screen(
        min_market_cap=1e9,      # $1B minimum
        min_volume=5e6,          # $5M average daily volume
        max_pe=30,               # Maximum P/E of 30
        top_n=20                 # Top 20 stocks
    )

    if not results.empty:
        # Export results
        screener.export_results(results, OUTPUT_PATH)

        # Generate summary
        summary = screener.generate_summary_report(results)
        print(summary)

        # Save summary
        summary_path = OUTPUT_PATH.replace('.csv', '_summary.txt')
        with open(summary_path, 'w') as f:
            f.write(summary)
        logger.info(f"Summary saved to {summary_path}")

    screener.close()


if __name__ == "__main__":
    main()
