# Visual Analysis Summary

**Generated**: 2026-01-25
**Universe**: 92 stocks analyzed

---

## Tier Distribution

```
Tier Classification Results
═══════════════════════════════════════════════════════════════

Tier 1 (Premium)          Score ≥70, Sharpe ≥1.0, MDD >-30%
──────────────────────────────────────────────────────────────
[EMPTY]                   0 stocks (0.0%)


Tier 2 (Acceptable)       Score ≥50, Sharpe ≥0.8, MDD >-40%
──────────────────────────────────────────────────────────────
█                         6 stocks (6.5%)

RTX   ████████████████████████████████████████████ 76.15
LLY   ███████████████████████████████████████████  75.15
XOM   ███████████████████████████████████████████  75.00
WMT   ██████████████████████████████████████████   73.00
GS    █████████████████████████████████████████    71.05
COST  ████████████████████████████████████         64.05


Tier 3 (Excluded)         Below Tier 2 thresholds
──────────────────────────────────────────────────────────────
████████████████████████  86 stocks (93.5%)

Top excluded:
AVGO  ███████████████████████████████████████████  70.05 *
KLAC  ███████████████████████████████████████████  70.05 *
NVDA  █████████████████████████████████████        65.10 **
GE    █████████████████████████████████████        65.05
MPC   █████████████████████████████████████        65.05

* Failed MDD threshold only
** Catastrophic MDD (-66%)

═══════════════════════════════════════════════════════════════
```

---

## Risk-Return Scatter Plot (Tier 2)

```
CAGR vs Maximum Drawdown
═══════════════════════════════════════════════════════════════

45% │                                    ● LLY
    │                                  (40.1%, -34.5%)
    │
40% │
    │
35% │
    │                        ● GS
30% │                   (30.7%, -32.8%)   ● XOM
    │              ● RTX              (29.8%, -20.5%)
    │         (26.9%, -32.8%)
25% │                                 ● COST
    │                            (24.1%, -31.4%)
    │                        ● WMT
20% │                   (21.9%, -25.7%)
    │
    └─────────────────────────────────────────────────────────
     -40%        -35%        -30%        -25%        -20%
                       Maximum Drawdown

Legend:
● = Tier 2 stock
Ideal quadrant: Top-right (high CAGR, low |MDD|)

Best Risk-Adjusted: XOM (highest return per unit of drawdown)
Highest Returns: LLY (40.1% CAGR)
Best Protection: XOM (-20.5% MDD)

═══════════════════════════════════════════════════════════════
```

---

## Sharpe vs Sortino Comparison (Top 10)

```
Sharpe and Sortino Ratios (Higher is Better)
═══════════════════════════════════════════════════════════════

         Sharpe                     Sortino
         ══════                     ═══════

AVGO   1.23 ████████████         2.61 █████████████████
NVDA   1.31 █████████████        2.41 ████████████████
KLAC   1.13 ███████████          2.47 ████████████████
LLY    1.14 ███████████          2.29 ███████████████ ✓
GE     1.15 ███████████          1.89 ████████████
RTX    1.01 ██████████           1.66 ██████████ ✓
MPC    1.00 ██████████           1.69 ██████████
GS     0.96 █████████            2.07 █████████████ ✓
XOM    0.95 █████████            1.72 ██████████ ✓
WMT    0.90 █████████            1.34 ████████ ✓

✓ = Tier 2 (qualified)

Insight: Sortino >> Sharpe indicates asymmetric returns
         (more upside volatility than downside)

Best Asymmetry: AVGO (Sortino/Sharpe = 2.12)
                LLY  (Sortino/Sharpe = 2.01) ✓

═══════════════════════════════════════════════════════════════
```

---

## Maximum Drawdown Distribution (All 92 Stocks)

```
MDD Histogram
═══════════════════════════════════════════════════════════════

MDD Range        Count  Distribution
─────────────────────────────────────────────────────────────

-10% to -20%       3   ▓▓▓  (KO, MCD, XOM) ← EXCELLENT
-20% to -30%       9   ▓▓▓▓▓▓▓▓▓  (WMT, BRK-B, ABBV...) ✓
-30% to -40%      18   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (RTX, LLY, GS, COST...) ✓
-40% to -50%      24   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (AVGO, KLAC, GOOGL...)
-50% to -60%      14   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (ADBE, ASML, AMD...)
-60% to -70%       8   ▓▓▓▓▓▓▓▓  (NVDA, TSLA...)
-70% to -80%       6   ▓▓▓▓▓▓  (CRM, NET...)
-80% to -90%       5   ▓▓▓▓▓  (ARKK, COIN...)
-90% to -100%      5   ▓▓▓▓▓  (AMC, RIOT...) ← CATASTROPHIC

Median: -44.7%
Mean:   -45.2%

✓ = Tier 2 MDD range (-20% to -40%)

Tier 2 occupies top 2 ranges (best 30% of universe)

═══════════════════════════════════════════════════════════════
```

---

## Sharpe Ratio Distribution (All 92 Stocks)

```
Sharpe Histogram
═══════════════════════════════════════════════════════════════

Sharpe Range     Count  Distribution
─────────────────────────────────────────────────────────────

Below 0.0        30    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (ARKK, AMC...)
0.0 to 0.5       31    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (AAPL, MSFT...)
0.5 to 0.8       15    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (BRK-B, ABBV...)
0.8 to 1.0        8    ▓▓▓▓▓▓▓▓  (WMT, XOM, GS, COST) ✓
1.0 to 1.2        5    ▓▓▓▓▓  (RTX, LLY, KLAC, GE) ✓
1.2 to 1.5        3    ▓▓▓  (AVGO, NVDA, MU)
Above 1.5         0

Median: 0.42
Mean:   0.31

✓ = Tier 2 Sharpe range (≥0.8)

Only 16 stocks (17%) achieved Sharpe ≥0.8
Only 6 stocks (6.5%) passed all Tier 2 thresholds

═══════════════════════════════════════════════════════════════
```

---

## Sector Performance Matrix

```
Sector Success Rate
═══════════════════════════════════════════════════════════════

Sector              Analyzed  Tier 2  Success Rate  Median Score
─────────────────────────────────────────────────────────────

Retail/Consumer        7        2      28.6% ████████████████
Defense/Aerospace      4        1      25.0% █████████████
Energy                 8        1      12.5% ███████
Healthcare             8        1      12.5% ███████
Financials             9        1      11.1% ██████
─────────────────────────────────────────────────────────────
Technology            20        0       0.0% ░░░░░░░
Semiconductors         8        0       0.0% ░░░░░░░
REITs                  7        0       0.0% ░░░░░░░
Industrials            6        0       0.0% ░░░░░░░
Other                 15        0       0.0% ░░░░░░░

█ = Success   ░ = Failure

Top Sector: Retail/Consumer (WMT, COST)
Worst Sector: Technology (0/20 qualified)

═══════════════════════════════════════════════════════════════
```

---

## Risk-Adjusted Score Breakdown (Tier 2)

```
Component Score Analysis
═══════════════════════════════════════════════════════════════

Stock   Total  ║ Sharpe Sortino Calmar  MDD  VaR/CVaR
        Score  ║ (30pt) (25pt)  (20pt) (15pt) (10pt)
════════════════╬══════════════════════════════════════════════

RTX     76.15  ║  20.1   25.0    15.0   10.05   6.0  ← BEST
LLY     75.15  ║  20.1   25.0    20.0   10.05   0.0  ← HIGH RETURNS
XOM     75.00  ║  15.0   25.0    20.0   15.0    0.0  ← BEST MDD
WMT     73.00  ║  15.0   18.0    15.0   15.0   10.0  ← BEST TAIL
GS      71.05  ║  15.0   25.0    15.0   10.05   6.0  ← ASYMMETRIC
COST    64.05  ║  15.0   18.0    15.0   10.05   6.0  ← BALANCED

════════════════╬══════════════════════════════════════════════
Max Possible:   ║  30     25      20     15     10    = 100

Insights:
- All 6 maxed Sortino (25pt) except WMT, COST (18pt)
- XOM, WMT maxed MDD score (15pt) - best drawdown control
- LLY maxed Calmar (20pt) - best return/drawdown ratio
- Only WMT maxed VaR/CVaR (10pt) - best tail risk

No stock achieved perfect 100 score (most balanced: RTX 76.15)

═══════════════════════════════════════════════════════════════
```

---

## Rolling Sharpe Stability Analysis

```
3-Year Rolling Sharpe Consistency
═══════════════════════════════════════════════════════════════

Stock   Consistency  Mean    Std    Min     Visualization
        (% >1.0)    Sharpe  Dev    Sharpe
─────────────────────────────────────────────────────────────

AVGO      96%       1.54   0.42   0.89   ████████████████████
LLY       76%       1.45   0.40   0.85   ████████████████ ✓
NVDA      76%       1.26   0.71   0.20   ████████████████
KLAC      64%       1.03   0.33   0.32   █████████████
GE        64%       1.05   0.38   0.24   █████████████
WMT       52%       1.06   0.52   0.16   ██████████ ✓
COST      36%       0.91   0.16   0.57   ███████ ✓
GS        28%       0.66   0.42   0.17   █████ ✓

✓ = Tier 2

High Consistency + Low Std = Stable performer
Examples:
- AVGO: 96% consistency, but excluded (MDD)
- LLY: 76% consistency, qualified ✓ - BEST IN TIER 2
- COST: Lower consistency (36%), but low std (0.16) = stable

Red Flag: NVDA high consistency (76%) but high std (0.71)
          → Regime-dependent, not truly stable

═══════════════════════════════════════════════════════════════
```

---

## VaR/CVaR Tail Risk Ladder

```
Tail Risk Metrics (Monthly, 95% Confidence)
═══════════════════════════════════════════════════════════════

        VaR(95%)              CVaR (Conditional)
        Best ← → Worst        Best ← → Worst
─────────────────────────────────────────────────────────────

KO      -4.5%  ██            -7.5%   ██
MCD     -5.3%  ███           -8.6%   ███
BRK-B   -6.2%  ████          -9.6%   ████
WMT     -6.7%  ████          -11.3%  █████ ✓ BEST TIER 2
RTX     -8.4%  █████         -11.8%  ██████ ✓
ABBV    -8.8%  █████         -10.3%  ████
LMT     -8.9%  █████         -11.8%  ██████
GS      -9.2%  █████         -11.7%  ██████ ✓
COST    -9.9%  ██████        -12.9%  ███████ ✓
XOM     -10.0% ██████        -11.6%  ██████ ✓
...
NVDA    -14.5% █████████     -19.3%  ██████████
...
AMC     -39.7% ███████████████████   -53.1%  ██████████████████████████

Interpretation:
- VaR: "95% of months, loss won't exceed X%"
- CVaR: "When it exceeds VaR, average loss is X%"

WMT has best tail risk in Tier 2:
- 95% of months: loss < 6.7%
- Worst 5% of months: average loss 11.3%

═══════════════════════════════════════════════════════════════
```

---

## Market Environment Timeline

```
2021-2025 Market Regimes and Tier 2 Performance
═══════════════════════════════════════════════════════════════

2021 │ BULL MARKET (Low Rates, High Liquidity)
─────┤ Tech/Growth Peak │ ARKK, NVDA at ATH
     │ Growth >60%, Value +25%
     │ Tier 2: Moderate gains, lagged market
     │
2022 │ ██████ BEAR MARKET (Rate Hikes 0→5%) ██████
─────┤ Tech Crash -40% to -60%
     │ Energy Crisis → XOM +65% ✓
     │ Defense Resilient → RTX -33% (recovered fast) ✓
     │ Retail Hit → WMT -26%, COST -31% ✓ (shallow)
     │ Healthcare Stable → LLY -35% ✓
     │ Finance Mixed → GS -33% ✓
     │
     │ ← WORST YEAR FOR MOST STOCKS
     │    (Determined MDD for majority)
     │
2023 │ RECOVERY (AI Boom Begins)
─────┤ Regional Bank Crisis (Mar-May)
     │ NVDA +239% (AI hype)
     │ Tier 2: Steady recovery, no fireworks
     │
2024 │ AI BUBBLE (Magnificent 7 Dominance)
─────┤ NVDA +27%, Tech leadership
     │ LLY +60% (obesity drugs) ✓
     │ Tier 2: Mixed, generally positive
     │
2025 │ CORRECTION? (Recent drawdowns)
─────┤ Many stocks off recent peaks
 YTD │ LLY MDD ongoing (Aug 24 → Aug 25)
     │ NVDA MDD ongoing (Dec 24 → Apr 25)
     │ Market uncertainty rising

KEY INSIGHT:
Tier 2 stocks survived 2022 with controlled drawdowns
→ Defense/Energy/Healthcare outperformed in worst year
→ Tech/Growth won in 2023-2024 but with high volatility

═══════════════════════════════════════════════════════════════
```

---

## Portfolio Construction Scenarios

```
Three Portfolio Strategies
═══════════════════════════════════════════════════════════════

Strategy 1: CORE (All 6 Tier 2)
────────────────────────────────────────────────
RTX   18%  ████████████████████
LLY   18%  ████████████████████
XOM   18%  ████████████████████
WMT   16%  ████████████████
GS    15%  ███████████████
COST  15%  ███████████████

Expected: Sharpe 0.95, MDD -30%, CAGR 28%
Risk: Moderate | Diversification: Good
────────────────────────────────────────────────


Strategy 2: ENHANCED (Core + Tactical)
────────────────────────────────────────────────
Core (70%):
  Tier 2 stocks (as above, scaled to 70%)

Tactical (30%):
  AVGO  10%  ██████████
  NVDA   8%  ████████
  KLAC   7%  ███████
  BRK-B  5%  █████

Expected: Sharpe 1.05-1.10, MDD -35-40%, CAGR 32-35%
Risk: Higher | Return: Higher
────────────────────────────────────────────────


Strategy 3: DEFENSIVE (Lower Risk)
────────────────────────────────────────────────
Ultra-Defensive (50%):
  WMT   18%  ████████████████████
  XOM   17%  ███████████████████
  COST  15%  ███████████████

Defensive (30%):
  BRK-B 10%  ██████████
  KO    10%  ██████████
  MCD   10%  ██████████

Moderate (20%):
  LLY   10%  ██████████
  RTX   10%  ██████████

Expected: Sharpe 0.80, MDD -22-25%, CAGR 18-20%
Risk: Lower | Capital Preservation Focus
────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════
```

---

## Key Metrics Summary Table

```
Tier 2 Stocks - Key Metrics At-A-Glance
═══════════════════════════════════════════════════════════════

         Returns        Risk Control      Risk-Adjusted
         ───────        ────────────      ─────────────
Stock    CAGR   Vol    MDD     VaR       Sharpe Sortino

RTX      26.9%  22.5%  -32.8%  -8.4%     1.01   1.66
LLY      40.1%  31.4%  -34.5%  -10.6%    1.14   2.29   ← HIGHEST RETURNS
XOM      29.8%  27.1%  -20.5%  -10.0%    0.95   1.72   ← BEST MDD
WMT      21.9%  19.6%  -25.7%  -6.7%     0.90   1.34   ← BEST TAIL RISK
GS       30.7%  27.6%  -32.8%  -9.2%     0.96   2.07   ← ASYMMETRIC
COST     24.1%  23.9%  -31.4%  -9.9%     0.84   1.41   ← BALANCED

────────────────────────────────────────────────────────────
Median   27.8%  25.3%  -31.1%  -9.6%     0.93   1.69
Mean     28.9%  25.4%  -29.6%  -9.1%     0.97   1.75

S&P 500  ~13%   ~18%   ~-40%   ~-12%     ~0.60  ~1.00
Nasdaq   ~16%   ~22%   ~-50%   ~-15%     ~0.50  ~0.80

Tier 2 Advantage:
- Returns: 2.2x SPY
- Sharpe:  1.6x SPY
- MDD:     26% better than SPY

═══════════════════════════════════════════════════════════════
```

---

## Final Recommendation Matrix

```
Stock Selection Guide
═══════════════════════════════════════════════════════════════

                Best   Best    Best    Most     Most      Best
                Overall Returns MDD    Stable   Asymmetric Tail

Core            RTX    LLY     XOM    WMT      GS        WMT
Choice          ↓      ↓       ↓      ↓        ↓         ↓
                76.15  40.1%   -20.5% 52%      2.07      -6.7%
                       CAGR    MDD    Consist. Sortino   VaR

────────────────────────────────────────────────────────────

Investment Goal              Recommended Portfolio
─────────────────────────────────────────────────────────────

Maximum risk-adj return      All 6 Tier 2 (equal weight)
Highest absolute return      LLY 30%, AVGO 20%, NVDA 15%, Rest 35%
Capital preservation         WMT 25%, XOM 25%, KO 20%, MCD 20%, COST 10%
Balanced growth              RTX 20%, LLY 20%, XOM 20%, WMT 20%, GS 10%, COST 10%
Tactical tech exposure       Core 70% + AVGO 15% + NVDA 10% + KLAC 5%

═══════════════════════════════════════════════════════════════
```

---

## System Status

```
╔═══════════════════════════════════════════════════════════════╗
║                   SCREENING SYSTEM STATUS                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ✓ Data Collection:       92/92 stocks (100%)                ║
║  ✓ Data Quality:          All COMPLETE (60 months)           ║
║  ✓ Calculations:          2,300 data points generated        ║
║  ✓ Validation:            All sanity checks passed           ║
║  ✓ Tier Classification:   6 Tier 2, 86 Tier 3                ║
║  ✓ Output Files:          11 files generated                 ║
║                                                               ║
║  Status: OPERATIONAL ✓                                        ║
║  Confidence: HIGH                                             ║
║  Next Review: 2026-02-25 (monthly update)                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

**End of Visual Summary**

For detailed analysis, see:
- `EXECUTIVE_SUMMARY.md` - Quick reference
- `ANALYSIS_SUMMARY.md` - Full 30-page analysis
- `TOP20_DETAILED_COMPARISON.md` - Top 20 deep dive
- `methodology.md` - Complete methodology
