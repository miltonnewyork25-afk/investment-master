#!/usr/bin/env python3
"""
trading_datacard.py — Populate drawdown profile, liquidity, and E-Score data for moat_datacard.yaml v2.0

Usage:
    python scripts/trading_datacard.py AAPL
    python scripts/trading_datacard.py AAPL --batch    # process all CQI constituents
    python scripts/trading_datacard.py AAPL --dry-run  # print YAML to stdout, don't write

Requires: yfinance, pyyaml, numpy, pandas
"""

import argparse
import datetime
import os
import sys
from pathlib import Path

import numpy as np
import pandas as pd
import yaml
import yfinance as yf


# ---------------------------------------------------------------------------
# CQI constituents (39 rated + 12 candidates)
# ---------------------------------------------------------------------------
CQI_TICKERS = [
    # Rated (39)
    "CPRT", "SPGI", "FICO", "MCO", "MSFT", "GOOGL", "ASML", "COST",
    "META", "AMZN", "IDXX", "AAPL", "V", "KLAC", "CTAS", "ARM",
    "NVDA", "ICE", "PG", "ETN", "TSM", "AVGO", "LRCX", "ANET",
    "CSGP", "AMAT", "PLTR", "DPZ", "CMG", "SBUX", "VRT", "ROL",
    "FAST", "MAR", "HLT", "RCL", "INTC", "IHG", "SMCI",
    # Candidates (12)
    "MSCI", "SNPS", "CDNS", "CME", "TDG", "VRSK", "INTU", "ISRG",
    "ADBE", "NOW", "VEEV", "RACE",
]

REPO_ROOT = Path(__file__).resolve().parent.parent


def fetch_history(ticker: str, start: str = "2019-01-01") -> pd.DataFrame:
    """Fetch daily price history using yf.Ticker().history() for reliability."""
    tk = yf.Ticker(ticker)
    df = tk.history(start=start, auto_adjust=True)
    if df is None or df.empty:
        raise ValueError(f"No price data for {ticker}")
    # Ensure simple Index columns (not MultiIndex)
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)
    return df


def fetch_spy_history(start: str = "2019-01-01") -> pd.DataFrame:
    """Fetch SPY history for beta calculation."""
    return fetch_history("SPY", start=start)


# ---------------------------------------------------------------------------
# Drawdown helpers
# ---------------------------------------------------------------------------
def max_drawdown_in_range(prices: pd.Series, start: str, end: str):
    """Return (max_drawdown_pct, trough_date) within [start, end]."""
    mask = (prices.index >= start) & (prices.index <= end)
    window = prices.loc[mask]
    if window.empty:
        return -1, None
    running_max = window.cummax()
    drawdown = (window - running_max) / running_max
    trough_idx = drawdown.idxmin()
    max_dd = drawdown.min()
    return round(float(max_dd) * 100, 2), trough_idx


def recovery_days(prices: pd.Series, pre_period_end: str, trough_date, search_end: str = None):
    """Days from trough_date to recover to pre-drawdown high."""
    if trough_date is None:
        return -1
    # Pre-drawdown high = max price up to pre_period_end
    pre_mask = prices.index <= pre_period_end
    if pre_mask.sum() == 0:
        return -1
    pre_high = prices.loc[pre_mask].max()

    # Search from trough onward
    post = prices.loc[prices.index >= trough_date]
    if search_end:
        post = post.loc[post.index <= search_end]
    recovered = post[post >= pre_high]
    if recovered.empty:
        return -1  # not yet recovered
    recovery_date = recovered.index[0]
    return int((recovery_date - trough_date).days)


# ---------------------------------------------------------------------------
# Downside beta
# ---------------------------------------------------------------------------
def compute_downside_beta(stock_prices: pd.Series, spy_prices: pd.Series) -> float:
    """Beta calculated only on days when SPY is down."""
    stock_ret = stock_prices.pct_change().dropna()
    spy_ret = spy_prices.pct_change().dropna()

    # Align dates
    common = stock_ret.index.intersection(spy_ret.index)
    if len(common) < 30:
        return -1.0
    stock_ret = stock_ret.loc[common]
    spy_ret = spy_ret.loc[common]

    # Filter to SPY down days
    down_mask = spy_ret < 0
    if down_mask.sum() < 20:
        return -1.0

    sr = stock_ret.loc[down_mask].values
    mr = spy_ret.loc[down_mask].values

    cov = np.cov(sr, mr)
    if cov[1, 1] == 0:
        return -1.0
    return round(float(cov[0, 1] / cov[1, 1]), 3)


# ---------------------------------------------------------------------------
# Liquidity
# ---------------------------------------------------------------------------
def compute_liquidity(df: pd.DataFrame, ticker: str):
    """Return avg_daily_volume_usd (30d), market_cap, spread_bps estimate."""
    recent = df.tail(30)
    avg_price = recent["Close"].mean()
    avg_vol = recent["Volume"].mean()
    avg_daily_volume_usd = round(float(avg_price * avg_vol), 0)

    # Market cap from yfinance info
    try:
        info = yf.Ticker(ticker).info
        market_cap = info.get("marketCap", -1)
    except Exception:
        market_cap = -1

    # Spread heuristic: lower volume / higher market cap => wider spread
    # For liquid large-caps, spread ~1-3 bps; for smaller names ~5-20 bps
    if avg_daily_volume_usd > 0 and market_cap and market_cap > 0:
        # Rough model: spread_bps ~ 1000 / sqrt(avg_daily_volume_usd / 1e6)
        adv_millions = avg_daily_volume_usd / 1e6
        if adv_millions > 0:
            spread_bps = round(min(100, max(1, 1000 / (adv_millions ** 0.5))), 1)
        else:
            spread_bps = -1
    else:
        spread_bps = -1

    return {
        "avg_daily_volume_usd": int(avg_daily_volume_usd),
        "market_cap": int(market_cap) if market_cap and market_cap > 0 else -1,
        "spread_bps_est": float(spread_bps) if spread_bps != -1 else -1,
    }


# ---------------------------------------------------------------------------
# E-Score (Earnings Predictability)
# ---------------------------------------------------------------------------
def compute_escore(ticker: str):
    """
    E-Score components:
      - revenue_cv: coefficient of variation of quarterly revenue (5y)
      - opm_range: [min, max] quarterly operating margin (5y)
      - miss_rate: % of quarters where EPS missed consensus (if available)
      - e_score: weighted composite 1-10
    """
    tk = yf.Ticker(ticker)

    # --- Revenue CV ---
    revenue_cv = -1.0
    opm_range = [-1, -1]
    try:
        # Try quarterly financials
        inc = tk.quarterly_income_stmt
        if inc is not None and not inc.empty:
            # Rows: Total Revenue, Operating Income, etc.
            rev_row = None
            for label in ["Total Revenue", "Revenue", "TotalRevenue"]:
                if label in inc.index:
                    rev_row = inc.loc[label]
                    break
            if rev_row is not None:
                rev_vals = rev_row.dropna().values.astype(float)
                # Take up to 20 quarters (5 years)
                rev_vals = rev_vals[:20]
                if len(rev_vals) >= 4:
                    revenue_cv = round(float(np.std(rev_vals) / np.mean(rev_vals)), 4)

            # OPM range
            oi_row = None
            for label in ["Operating Income", "OperatingIncome", "EBIT"]:
                if label in inc.index:
                    oi_row = inc.loc[label]
                    break
            if oi_row is not None and rev_row is not None:
                oi_vals = oi_row.dropna()
                rv_vals = rev_row.dropna()
                common_cols = oi_vals.index.intersection(rv_vals.index)[:20]
                if len(common_cols) >= 4:
                    margins = (oi_vals.loc[common_cols].values.astype(float) /
                               rv_vals.loc[common_cols].values.astype(float)) * 100
                    opm_range = [round(float(np.min(margins)), 1),
                                 round(float(np.max(margins)), 1)]
    except Exception:
        pass

    # --- Miss rate ---
    miss_rate = -1.0
    try:
        earnings_hist = tk.earnings_history
        if earnings_hist is not None and not earnings_hist.empty:
            # Look for surprise columns
            if "epsActual" in earnings_hist.columns and "epsEstimate" in earnings_hist.columns:
                valid = earnings_hist.dropna(subset=["epsActual", "epsEstimate"])
                if len(valid) >= 4:
                    misses = (valid["epsActual"] < valid["epsEstimate"]).sum()
                    miss_rate = round(float(misses / len(valid)) * 100, 1)
    except Exception:
        pass

    # --- E-Score composite (1-10, higher = more predictable) ---
    # Components:
    #   1) Revenue stability (CV): lower CV = higher score
    #   2) OPM range tightness: narrower range = higher score
    #   3) Miss rate: lower miss rate = higher score
    scores = []
    weights = []

    if revenue_cv >= 0:
        # CV < 0.05 = 10, CV > 0.5 = 1, linear interpolation
        cv_score = max(1, min(10, 10 - (revenue_cv - 0.05) * (9 / 0.45)))
        scores.append(cv_score)
        weights.append(0.4)

    if opm_range[0] >= -100 and opm_range[1] >= -100 and opm_range != [-1, -1]:
        opm_width = opm_range[1] - opm_range[0]
        # Width < 3pp = 10, Width > 30pp = 1
        opm_score = max(1, min(10, 10 - (opm_width - 3) * (9 / 27)))
        scores.append(opm_score)
        weights.append(0.35)

    if miss_rate >= 0:
        # 0% miss = 10, 50% miss = 1
        miss_score = max(1, min(10, 10 - miss_rate * (9 / 50)))
        scores.append(miss_score)
        weights.append(0.25)

    if scores:
        total_weight = sum(weights)
        e_score = round(sum(s * w for s, w in zip(scores, weights)) / total_weight, 1)
    else:
        e_score = -1

    return {
        "revenue_cv": revenue_cv,
        "opm_range_pct": opm_range,
        "miss_rate_pct": miss_rate,
        "e_score": float(e_score),
    }


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------
def process_ticker(ticker: str, spy_prices: pd.Series, dry_run: bool = False) -> dict:
    """Process a single ticker and return computed data dict."""
    ticker = ticker.upper()
    print(f"\n{'='*60}")
    print(f"  Processing: {ticker}")
    print(f"{'='*60}")

    result = {"ticker": ticker, "computed_date": str(datetime.date.today())}

    # --- Fetch price data ---
    try:
        df = fetch_history(ticker, start="2019-01-01")
        prices = df["Close"]
        print(f"  Price data: {len(prices)} trading days ({prices.index[0].strftime('%Y-%m-%d')} to {prices.index[-1].strftime('%Y-%m-%d')})")
    except Exception as e:
        print(f"  ERROR: Could not fetch price data: {e}")
        return result

    # --- Drawdown profile ---
    print("  Computing drawdown profile...")
    dd_2020, trough_2020 = max_drawdown_in_range(prices, "2020-01-01", "2020-12-31")
    rec_2020 = recovery_days(prices, "2020-01-01", trough_2020, search_end="2021-12-31")

    dd_2022, trough_2022 = max_drawdown_in_range(prices, "2022-01-01", "2022-12-31")
    rec_2022 = recovery_days(prices, "2022-01-01", trough_2022)

    result["drawdown_profile"] = {
        "max_dd_2020_pct": dd_2020,
        "trough_date_2020": str(trough_2020.date()) if trough_2020 is not None else "unavailable",
        "recovery_days_2020": rec_2020,
        "max_dd_2022_pct": dd_2022,
        "trough_date_2022": str(trough_2022.date()) if trough_2022 is not None else "unavailable",
        "recovery_days_2022": rec_2022,
    }
    print(f"    2020 COVID: max_dd={dd_2020}%, recovery={rec_2020} days")
    print(f"    2022 Rates: max_dd={dd_2022}%, recovery={rec_2022} days")

    # --- Downside beta ---
    print("  Computing downside beta vs SPY...")
    db = compute_downside_beta(prices, spy_prices)
    result["drawdown_profile"]["downside_beta"] = db
    print(f"    Downside beta: {db}")

    # --- Liquidity ---
    print("  Computing liquidity metrics...")
    liq = compute_liquidity(df, ticker)
    result["liquidity"] = liq
    adv_m = liq["avg_daily_volume_usd"] / 1e6
    mcap_b = liq["market_cap"] / 1e9 if liq["market_cap"] > 0 else -1
    print(f"    Avg daily volume: ${adv_m:.1f}M")
    print(f"    Market cap: ${mcap_b:.1f}B" if mcap_b > 0 else "    Market cap: unavailable")
    print(f"    Est spread: {liq['spread_bps_est']} bps")

    # --- E-Score ---
    print("  Computing E-Score (earnings predictability)...")
    escore = compute_escore(ticker)
    result["earnings_predictability"] = escore
    print(f"    Revenue CV: {escore['revenue_cv']}")
    print(f"    OPM range: {escore['opm_range_pct']}%")
    print(f"    Miss rate: {escore['miss_rate_pct']}%")
    print(f"    E-Score: {escore['e_score']}/10")

    # --- Valuation anchors placeholder ---
    result["valuation_anchors"] = {
        "reverse_dcf_implied_growth": "TBD",
        "ev_fcf_current": "TBD",
        "ev_fcf_5y_avg": "TBD",
        "note": "Populate from Tier 3 Phase 3 analysis",
    }

    # --- Write to moat_datacard.yaml if it exists ---
    datacard_path = REPO_ROOT / "reports" / ticker / "data" / "moat_datacard.yaml"
    if datacard_path.exists() and not dry_run:
        print(f"\n  Found existing datacard: {datacard_path}")
        try:
            with open(datacard_path, "r", encoding="utf-8") as f:
                existing = yaml.safe_load(f) or {}

            # Update/append v2.0 fields
            existing["drawdown_profile"] = result["drawdown_profile"]
            existing["liquidity"] = result["liquidity"]
            existing["earnings_predictability"] = result["earnings_predictability"]
            existing["valuation_anchors"] = existing.get("valuation_anchors", result["valuation_anchors"])
            existing["datacard_version"] = "v2.0"
            existing["v2_computed_date"] = str(datetime.date.today())

            with open(datacard_path, "w", encoding="utf-8") as f:
                yaml.dump(existing, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
            print(f"  UPDATED: {datacard_path}")
        except Exception as e:
            print(f"  ERROR writing datacard: {e}")
    else:
        if not dry_run and not datacard_path.exists():
            print(f"\n  No existing datacard at {datacard_path}")
        print("\n  --- YAML Output ---")
        print(yaml.dump(result, default_flow_style=False, allow_unicode=True, sort_keys=False))

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Trading datacard: drawdown profile, liquidity, E-Score for moat_datacard.yaml v2.0"
    )
    parser.add_argument("ticker", nargs="?", help="Stock ticker (e.g. AAPL)")
    parser.add_argument("--batch", action="store_true", help="Process all CQI constituents")
    parser.add_argument("--dry-run", action="store_true", help="Print YAML to stdout, don't write files")
    args = parser.parse_args()

    if not args.ticker and not args.batch:
        parser.print_help()
        sys.exit(1)

    tickers = CQI_TICKERS if args.batch else [args.ticker.upper()]

    # Fetch SPY once for all beta calculations
    print("Fetching SPY benchmark data...")
    try:
        spy_df = fetch_spy_history()
        spy_prices = spy_df["Close"]
        print(f"SPY: {len(spy_prices)} trading days loaded")
    except Exception as e:
        print(f"ERROR: Could not fetch SPY data: {e}")
        sys.exit(1)

    results = []
    errors = []
    for t in tickers:
        try:
            r = process_ticker(t, spy_prices, dry_run=args.dry_run)
            results.append(r)
        except Exception as e:
            print(f"  ERROR processing {t}: {e}")
            errors.append((t, str(e)))

    # --- Summary ---
    print(f"\n{'='*60}")
    print(f"  SUMMARY: {len(results)} processed, {len(errors)} errors")
    print(f"{'='*60}")
    if errors:
        for t, e in errors:
            print(f"  FAILED: {t} — {e}")

    if args.batch and results:
        # Print summary table
        print(f"\n{'Ticker':<8} {'DD2020%':>8} {'Rec2020':>8} {'DD2022%':>8} {'Rec2022':>8} {'DnBeta':>7} {'E-Score':>8} {'ADV($M)':>10}")
        print("-" * 75)
        for r in results:
            dp = r.get("drawdown_profile", {})
            ep = r.get("earnings_predictability", {})
            lq = r.get("liquidity", {})
            adv = lq.get("avg_daily_volume_usd", 0) / 1e6
            print(f"{r['ticker']:<8} {dp.get('max_dd_2020_pct', -1):>8} {dp.get('recovery_days_2020', -1):>8} "
                  f"{dp.get('max_dd_2022_pct', -1):>8} {dp.get('recovery_days_2022', -1):>8} "
                  f"{dp.get('downside_beta', -1):>7} {ep.get('e_score', -1):>8} {adv:>10.1f}")


if __name__ == "__main__":
    main()
