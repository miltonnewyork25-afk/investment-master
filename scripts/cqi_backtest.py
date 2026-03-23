#!/usr/bin/env python3
"""
CQI Model Index — Phase 1 Backtest (2020-2025)
HYPOTHETICAL backtest with look-ahead bias. CQI scores computed 2026, applied retroactively.
"""

import yfinance as yf
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import statistics
import time

CONSTITUENTS = {
    'CPRT': 82, 'SPGI': 74, 'MCO': 70, 'MSFT': 67, 'GOOGL': 66,
    'ASML': 59, 'COST': 59, 'META': 58, 'AMZN': 56, 'IDXX': 56,
    'KLAC': 52, 'CTAS': 51, 'NVDA': 48, 'ICE': 47, 'ETN': 46, 'TSM': 45,
}
EXCLUDED_TREND = {'AAPL': 55, 'V': 53, 'PG': 47, 'FICO': 72}
EXCLUDED_CQI = {'LRCX': 43}
ALL_TICKERS = list(CONSTITUENTS.keys()) + list(EXCLUDED_TREND.keys()) + list(EXCLUDED_CQI.keys()) + ['SPY', 'MOAT']

def fetch_single(ticker, retries=3):
    """Fetch one ticker with retries."""
    for attempt in range(retries):
        try:
            t = yf.Ticker(ticker)
            hist = t.history(start='2019-12-28', end='2026-01-03', auto_adjust=True)
            if hist is not None and len(hist) > 100:
                return hist['Close']
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1)
    return None

def fetch_all():
    print(f"Fetching {len(ALL_TICKERS)} tickers one by one...")
    prices = {}
    for ticker in ALL_TICKERS:
        series = fetch_single(ticker)
        if series is not None:
            prices[ticker] = series
            # print(f"  {ticker}: OK ({len(series)} days)")
        else:
            print(f"  {ticker}: FAILED")
    print(f"Loaded: {len(prices)}/{len(ALL_TICKERS)}")
    return prices

def annual_return(series, year):
    yr = series[series.index.year == year]
    if len(yr) < 10:
        return None
    return float(yr.iloc[-1]) / float(yr.iloc[0]) - 1

def portfolio_return(prices, weights_map, year, wtype='cqi'):
    rets, ws = {}, {}
    for t, cqi in weights_map.items():
        if t not in prices: continue
        r = annual_return(prices[t], year)
        if r is None: continue
        rets[t] = r
        ws[t] = cqi if wtype == 'cqi' else 1.0
    if not ws: return None, {}
    tw = sum(ws.values())
    pr = sum(ws[t]/tw * rets[t] for t in ws)
    contribs = {t: (rets[t], ws[t]/tw) for t in ws}
    return pr, contribs

def max_drawdown_from_annual(annual_rets):
    """Approximate max drawdown from annual returns (conservative estimate)."""
    # For proper MDD we'd need daily data, but let's compute cumulative path
    cum = 1
    peak = 1
    mdd = 0
    for r in annual_rets:
        cum *= (1 + r)
        if cum > peak: peak = cum
        dd = (cum - peak) / peak
        if dd < mdd: mdd = dd
    return mdd

def daily_drawdown(prices, weights_map, wtype='cqi'):
    """Calculate MDD from daily data."""
    tickers = [t for t in weights_map if t in prices]
    if not tickers: return 0

    # Build aligned daily returns
    frames = {}
    for t in tickers:
        s = prices[t]
        mask = (s.index.year >= 2020) & (s.index.year <= 2025)
        frames[t] = s[mask]

    # Find common dates
    common = frames[tickers[0]].index
    for t in tickers[1:]:
        common = common.intersection(frames[t].index)
    common = common.sort_values()

    if len(common) < 2: return 0

    # Build portfolio value
    vals = [1.0]
    for i in range(1, len(common)):
        dr = 0; tw = 0
        for t in tickers:
            p0 = float(frames[t][common[i-1]])
            p1 = float(frames[t][common[i]])
            if p0 > 0:
                w = weights_map[t] if wtype == 'cqi' else 1
                dr += w * (p1/p0 - 1)
                tw += w
        if tw > 0: dr /= tw
        vals.append(vals[-1] * (1 + dr))

    peak = vals[0]
    mdd = 0
    for v in vals:
        if v > peak: peak = v
        dd = (v - peak) / peak
        if dd < mdd: mdd = dd
    return mdd

def main():
    prices = fetch_all()
    years = [2020, 2021, 2022, 2023, 2024, 2025]

    # === Core backtest ===
    print("\n" + "="*80)
    print("CQI MODEL INDEX  —  PHASE 1 BACKTEST (2020-2025)")
    print("="*80)
    avail = [t for t in CONSTITUENTS if t in prices]
    miss = [t for t in CONSTITUENTS if t not in prices]
    print(f"Universe: {len(CONSTITUENTS)} stocks | Data OK: {len(avail)} | Missing: {miss if miss else 'none'}")

    cqi_a, ew_a, spy_a = [], [], []

    print(f"\n{'Year':<6} {'CQI-Wtd':>10} {'EqWt':>10} {'S&P500':>10} {'CQI vs SPY':>11} {'N':>3}")
    print("-" * 52)

    for year in years:
        cr, cc = portfolio_return(prices, CONSTITUENTS, year, 'cqi')
        er, _ = portfolio_return(prices, CONSTITUENTS, year, 'equal')
        sr = annual_return(prices.get('SPY', pd.Series(dtype=float)), year) if 'SPY' in prices else None

        if cr is not None and sr is not None:
            print(f"{year:<6} {cr:>+9.1%} {er:>+9.1%} {sr:>+9.1%} {cr-sr:>+10.1%} {len(cc):>3}")
            cqi_a.append(cr); ew_a.append(er); spy_a.append(sr)

    # Cumulative
    def cum(lst): r=1; [r:=r*(1+x) for x in lst]; return r
    cc, ec, sc = cum(cqi_a), cum(ew_a), cum(spy_a)
    n = len(cqi_a)
    ccagr, ecagr, scagr = cc**(1/n)-1, ec**(1/n)-1, sc**(1/n)-1

    print("-" * 52)
    print(f"{'Total':<6} {cc-1:>+9.0%} {ec-1:>+9.0%} {sc-1:>+9.0%} {(cc-1)-(sc-1):>+10.0%}")
    print(f"{'CAGR':<6} {ccagr:>+9.1%} {ecagr:>+9.1%} {scagr:>+9.1%} {ccagr-scagr:>+10.1%}")

    # Drawdown
    cqi_dd = daily_drawdown(prices, CONSTITUENTS, 'cqi')
    ew_dd = daily_drawdown(prices, CONSTITUENTS, 'equal')
    spy_dd = daily_drawdown(prices, {'SPY': 1}, 'equal') if 'SPY' in prices else 0

    csharpe = (statistics.mean(cqi_a)-0.04)/statistics.stdev(cqi_a) if len(cqi_a)>=2 else 0
    esharpe = (statistics.mean(ew_a)-0.04)/statistics.stdev(ew_a) if len(ew_a)>=2 else 0
    ssharpe = (statistics.mean(spy_a)-0.04)/statistics.stdev(spy_a) if len(spy_a)>=2 else 0

    cqi_wins = sum(1 for c,s in zip(cqi_a, spy_a) if c>s)

    print(f"\n{'Metric':<20} {'CQI-Wtd':>12} {'Equal-Wt':>12} {'S&P 500':>12}")
    print("-" * 58)
    print(f"{'CAGR':<20} {ccagr:>+11.1%} {ecagr:>+11.1%} {scagr:>+11.1%}")
    print(f"{'Total Return':<20} {cc-1:>+11.0%} {ec-1:>+11.0%} {sc-1:>+11.0%}")
    print(f"{'Max Drawdown':<20} {cqi_dd:>+11.1%} {ew_dd:>+11.1%} {spy_dd:>+11.1%}")
    print(f"{'Sharpe (rf=4%)':<20} {csharpe:>11.2f} {esharpe:>11.2f} {ssharpe:>11.2f}")
    print(f"{'$10K becomes':<20} {'$'+f'{10000*cc:,.0f}':>12} {'$'+f'{10000*ec:,.0f}':>12} {'$'+f'{10000*sc:,.0f}':>12}")
    print(f"{'Win rate vs SPY':<20} {cqi_wins}/{n:>11} {'--':>12} {'--':>12}")

    # === Individual stocks ===
    print(f"\n\n{'='*80}")
    print("INDIVIDUAL STOCK PERFORMANCE (sorted by total return)")
    print(f"{'='*80}")

    all_map = {**{t:(c,'IN') for t,c in CONSTITUENTS.items()},
               **{t:(c,'OUT-T') for t,c in EXCLUDED_TREND.items()},
               **{t:(c,'OUT-C') for t,c in EXCLUDED_CQI.items()}}

    stock_perf = []
    for t,(cqi,status) in all_map.items():
        if t not in prices:
            stock_perf.append((t, cqi, status, None, None))
            continue
        c = 1; ny = 0
        for yr in years:
            r = annual_return(prices[t], yr)
            if r is not None: c *= (1+r); ny += 1
        if ny > 0:
            stock_perf.append((t, cqi, status, c-1, c**(1/ny)-1))
        else:
            stock_perf.append((t, cqi, status, None, None))

    stock_perf.sort(key=lambda x: x[3] if x[3] is not None else -999, reverse=True)

    print(f"\n{'#':<4} {'Ticker':<7} {'CQI':>4} {'Status':<6} {'Total':>10} {'CAGR':>8}")
    print("-" * 45)
    for i,(t,cqi,st,tot,cagr) in enumerate(stock_perf, 1):
        if tot is not None:
            marker = '*' if st != 'IN' else ' '
            print(f"{i:<4} {t:<7} {cqi:>4} {st:<6} {tot:>+9.0%} {cagr:>+7.1%}{marker}")
        else:
            print(f"{i:<4} {t:<7} {cqi:>4} {st:<6} {'N/A':>10} {'N/A':>8}")
    print(f"\n{'':4} {'SPY':<7} {'':>4} {'BM':<6} {sc-1:>+9.0%} {scagr:>+7.1%}")
    print("  * = excluded from CQI Index")

    # === Filtering analysis ===
    print(f"\n\n{'='*80}")
    print("FILTER VALUE ANALYSIS")
    print(f"{'='*80}")

    in_rets = [tot for _,_,st,tot,_ in stock_perf if st=='IN' and tot is not None]
    out_rets = [tot for _,_,st,tot,_ in stock_perf if st!='IN' and tot is not None]

    print(f"\nIncluded (n={len(in_rets)}): median {statistics.median(in_rets):+.0%}, mean {statistics.mean(in_rets):+.0%}")
    print(f"Excluded (n={len(out_rets)}): median {statistics.median(out_rets):+.0%}, mean {statistics.mean(out_rets):+.0%}")

    # Trend filter sensitivity
    expanded = {**CONSTITUENTS, **EXCLUDED_TREND}
    exp_a = []
    for yr in years:
        r, _ = portfolio_return(prices, expanded, yr, 'cqi')
        if r is not None: exp_a.append(r)

    exp_c = cum(exp_a)
    print(f"\nTrend filter value (CQI+Trend vs CQI-only):")
    print(f"  With trend filter (16 stocks):    {cc-1:+.0%} total, {ccagr:+.1%} CAGR")
    print(f"  Without trend filter (20 stocks): {exp_c-1:+.0%} total, {exp_c**(1/n)-1:+.1%} CAGR")
    print(f"  Trend filter adds: {(cc-1)-(exp_c-1):+.1%}pp total")

    # === MOAT ETF ===
    if 'MOAT' in prices:
        print(f"\n\n{'='*80}")
        print("vs MOAT ETF (VanEck Morningstar Wide Moat)")
        print(f"{'='*80}")

        moat_a = []
        print(f"\n{'Year':<6} {'CQI':>10} {'MOAT':>10} {'SPY':>10} {'CQI-MOAT':>10}")
        print("-" * 48)
        for yi,yr in enumerate(years):
            mr = annual_return(prices['MOAT'], yr)
            if mr is not None and yi < len(cqi_a):
                moat_a.append(mr)
                print(f"{yr:<6} {cqi_a[yi]:>+9.1%} {mr:>+9.1%} {spy_a[yi]:>+9.1%} {cqi_a[yi]-mr:>+9.1%}")

        mc = cum(moat_a)
        print("-" * 48)
        print(f"{'Total':<6} {cc-1:>+9.0%} {mc-1:>+9.0%} {sc-1:>+9.0%}")
        print(f"{'CAGR':<6} {ccagr:>+9.1%} {mc**(1/n)-1:>+9.1%} {scagr:>+9.1%}")
        print(f"{'$10K→':<6} {'$'+f'{10000*cc:,.0f}':>9} {'$'+f'{10000*mc:,.0f}':>9} {'$'+f'{10000*sc:,.0f}':>9}")

    # === Contributors ===
    print(f"\n\n{'='*80}")
    print("YEAR-BY-YEAR TOP/BOTTOM 3 (CQI-Weighted)")
    print(f"{'='*80}")

    for yr in years:
        _, contribs = portfolio_return(prices, CONSTITUENTS, yr, 'cqi')
        if not contribs: continue
        pr = sum(r*w for r,w in contribs.values())
        sc_list = sorted(contribs.items(), key=lambda x: x[1][0]*x[1][1], reverse=True)
        best = ' | '.join(f"{t} {r:+.0%}" for t,(r,w) in sc_list[:3])
        worst = ' | '.join(f"{t} {r:+.0%}" for t,(r,w) in sc_list[-3:])
        print(f"\n{yr} ({pr:+.1%})")
        print(f"  Best:  {best}")
        print(f"  Worst: {worst}")

    # === Verdict ===
    print(f"\n\n{'='*80}")
    print("VERDICT")
    print(f"{'='*80}")
    alpha_pp = ccagr - scagr
    print(f"""
CQI Model Index CAGR: {ccagr:+.1%} vs S&P 500: {scagr:+.1%} = {alpha_pp:+.1%}pp alpha
$10,000 invested 2020.1.1 becomes ${10000*cc:,.0f} (CQI) vs ${10000*sc:,.0f} (SPY)
Beat SPY in {cqi_wins}/{n} years
Max drawdown: {cqi_dd:+.1%} vs SPY {spy_dd:+.1%}

CAVEATS (must disclose):
1. LOOK-AHEAD BIAS: CQI scores from 2026, applied retroactively to 2020
2. SURVIVORSHIP BIAS: Only 39 hand-selected companies in universe
3. NO COSTS: No transaction costs, taxes, or slippage
4. CONCENTRATED: 16 stocks, heavy tech/quality tilt
5. NOT TRADEABLE: This validates CQI's quality identification, not a strategy
""")

if __name__ == '__main__':
    main()
