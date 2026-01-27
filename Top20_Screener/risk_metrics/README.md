# Risk Metrics Analysis - File Guide

**Generated**: 2026-01-25
**Total Files**: 12
**Total Size**: ~140 KB

---

## Quick Start

**New to this analysis? Start here:**

1. **EXECUTIVE_SUMMARY.md** (9 KB)
   - 5-minute read
   - Key findings, 6 qualified stocks
   - Portfolio recommendations
   - Action items

2. **VISUAL_SUMMARY.md** (25 KB)
   - Charts and graphs (ASCII)
   - Visual comparisons
   - Easy to scan

3. **tier2_acceptable.csv** (2.2 KB)
   - The 6 stocks that passed
   - All metrics in spreadsheet format

---

## File Directory

### Documentation Files (Markdown)

#### 1. EXECUTIVE_SUMMARY.md (9 KB) ⭐ START HERE
**Purpose**: Quick reference guide
**Contents**:
- 30-second summary
- The 6 qualified stocks
- Portfolio recommendations
- Risk warnings
- Decision tree

**Read if**: You want the bottom line quickly

---

#### 2. ANALYSIS_SUMMARY.md (18 KB) ⭐ DEEP DIVE
**Purpose**: Complete analysis report
**Contents**:
- Detailed findings for each Tier 2 stock
- Notable exclusions (AVGO, NVDA, etc.)
- Sector analysis
- Statistical distributions
- Market environment context
- System validation

**Read if**: You want to understand WHY each stock qualified/failed

**Key Sections**:
- Tier 2 stock profiles (pg 2-8)
- Notable exclusions (pg 8-10)
- Sector winners/losers (pg 10-11)
- Rolling Sharpe stability (pg 14-15)
- System validation (pg 19-20)

---

#### 3. TOP20_DETAILED_COMPARISON.md (11 KB)
**Purpose**: Comparative analysis of top performers
**Contents**:
- Complete metrics table (top 20 stocks)
- Metric-by-metric champions
- Portfolio construction scenarios
- Risk warnings for each stock

**Read if**: You want to compare qualified stocks against near-misses

**Highlights**:
- Why AVGO failed (MDD -41.1%)
- Why NVDA excluded (MDD -66.3%)
- KO/MCD defensive analysis
- Enhanced portfolio strategies

---

#### 4. VISUAL_SUMMARY.md (25 KB) ⭐ BEST FOR BROWSING
**Purpose**: Visual analysis with charts
**Contents**:
- ASCII charts and graphs
- Risk-return scatter plots
- Distribution histograms
- Sector performance matrix
- Portfolio construction visuals

**Read if**: You prefer visual data or want to present findings

**Best Charts**:
- Tier distribution bar chart
- CAGR vs MDD scatter plot
- Sharpe vs Sortino comparison
- MDD histogram
- Market timeline

---

#### 5. methodology.md (19 KB) ⭐ TECHNICAL REFERENCE
**Purpose**: Complete methodology documentation
**Contents**:
- Every formula explained
- Data sources documented
- Threshold justifications
- Edge case handling
- Limitations and biases

**Read if**: You need to validate/audit the methodology or replicate analysis

**Key Sections**:
- Risk-free rate documentation
- Sharpe/Sortino/Calmar formulas
- Rolling window methodology
- Scoring system weights
- VaR/CVaR calculations

---

#### 6. README.md (This file)
**Purpose**: Navigation guide

---

### Data Files (CSV)

#### 7. tier2_acceptable.csv (2.2 KB) ⭐ PRIMARY OUTPUT
**6 rows** (6 qualified stocks)
**26 columns** (all metrics)

**Columns**:
```
ticker, data_quality, data_start, data_end, months_analyzed,
sharpe, sortino, mdd, mdd_peak_date, mdd_trough_date, calmar,
var_95, cvar_95, cagr, annual_vol,
rolling_sharpe_mean, rolling_sharpe_std, rolling_sharpe_min, sharpe_consistency,
sharpe_score, sortino_score, calmar_score, mdd_score, var_cvar_score,
risk_adjusted_score, tier
```

**Stocks**:
- RTX, LLY, XOM, WMT, GS, COST

**Use for**: Portfolio construction, further analysis, monitoring

---

#### 8. tier3_excluded.csv (28 KB)
**86 rows** (excluded stocks)
**26 columns** (same as tier2)

**Notable inclusions**:
- AVGO (70.05 score, failed MDD)
- NVDA (65.10 score, catastrophic MDD)
- AAPL, MSFT, META (tech giants, poor risk-adjusted)

**Use for**: Understanding what didn't make it, finding tactical opportunities

---

#### 9. tier1_premium.csv (310 bytes - Empty)
**0 rows**
**Header only**

**Why empty**: No stocks met Tier 1 criteria (Score ≥70, Sharpe ≥1.0, MDD >-30%)
- Several came close but failed MDD requirement

---

#### 10. complete_metrics.csv (30 KB)
**92 rows** (all analyzed stocks)
**26 columns** (all metrics)

**Use for**:
- Full dataset analysis
- Custom filtering/sorting
- Statistical analysis
- Backtesting

---

#### 11. sharpe_ratios.csv (9.1 KB)
**92 rows**
**8 columns**:
```
ticker, sharpe, rolling_sharpe_mean, rolling_sharpe_std,
rolling_sharpe_min, sharpe_consistency, data_quality, months_analyzed
```

**Focus**: Sharpe ratios and stability metrics

**Use for**: Quick Sharpe screening, consistency analysis

---

#### 12. tail_risk.csv (11 KB)
**92 rows**
**8 columns**:
```
ticker, mdd, mdd_peak_date, mdd_trough_date,
sortino, calmar, var_95, cvar_95
```

**Focus**: Downside risk metrics

**Use for**: Risk management, drawdown analysis

---

#### 13. risk_adjusted_scores.csv (4.3 KB)
**92 rows**
**8 columns**:
```
ticker, risk_adjusted_score,
sharpe_score, sortino_score, calmar_score, mdd_score, var_cvar_score,
tier
```

**Focus**: Scoring breakdown and tier classification

**Use for**: Understanding why stocks passed/failed

---

### Code Files

#### 14. ../scripts/sharpe_tail_risk_screener.py (15 KB)
**Language**: Python 3
**Dependencies**: pandas, numpy, yfinance

**Purpose**: Main screening engine

**Key Functions**:
- `get_price_data()`: Fetch historical prices
- `calculate_sharpe_ratio()`: Sharpe calculation
- `calculate_sortino_ratio()`: Sortino calculation
- `calculate_max_drawdown()`: MDD calculation
- `calculate_var_cvar()`: Tail risk metrics
- `analyze_ticker()`: Complete analysis for one stock
- `classify_tier()`: Tier assignment

**Usage**:
```bash
cd /Users/milton/投资大师/Top20_Screener/scripts
python3 sharpe_tail_risk_screener.py
```

**Output**: Regenerates all CSV and updates analysis

---

## File Relationships

```
Data Flow:
─────────

sharpe_tail_risk_screener.py
         │
         ├─> complete_metrics.csv (master dataset)
         │        │
         │        ├─> tier1_premium.csv (empty)
         │        ├─> tier2_acceptable.csv (6 stocks) ⭐
         │        └─> tier3_excluded.csv (86 stocks)
         │
         ├─> sharpe_ratios.csv (Sharpe focus)
         ├─> tail_risk.csv (risk focus)
         └─> risk_adjusted_scores.csv (scoring)

Documentation Flow:
──────────────────

methodology.md (technical foundation)
         │
         ├─> ANALYSIS_SUMMARY.md (detailed findings)
         │        │
         │        ├─> TOP20_DETAILED_COMPARISON.md
         │        └─> VISUAL_SUMMARY.md
         │
         └─> EXECUTIVE_SUMMARY.md (quick reference)
```

---

## Recommended Reading Order

### For Investors (Quick)
1. EXECUTIVE_SUMMARY.md (5 min)
2. VISUAL_SUMMARY.md (10 min)
3. tier2_acceptable.csv (in Excel/spreadsheet)
4. Done - ready to invest

**Total Time**: 15-20 minutes

---

### For Analysts (Thorough)
1. EXECUTIVE_SUMMARY.md (5 min)
2. ANALYSIS_SUMMARY.md (30 min)
3. TOP20_DETAILED_COMPARISON.md (15 min)
4. methodology.md (20 min)
5. complete_metrics.csv (analyze in Python/R)
6. Done - ready to validate/audit

**Total Time**: 70+ minutes

---

### For Developers (Technical)
1. methodology.md (20 min)
2. sharpe_tail_risk_screener.py (code review, 30 min)
3. complete_metrics.csv (validate outputs)
4. Run script yourself
5. Done - ready to modify/extend

**Total Time**: 60+ minutes

---

## Key Numbers at a Glance

| Metric | Value |
|--------|-------|
| **Stocks Analyzed** | 92 |
| **Time Period** | 2021-01-01 to 2026-01-25 (5 years) |
| **Data Points Generated** | 2,300 (92 stocks × 25 metrics) |
| **Tier 1 Qualified** | 0 (0%) |
| **Tier 2 Qualified** | 6 (6.5%) |
| **Tier 3 Excluded** | 86 (93.5%) |
| **Risk-Free Rate** | 4.2% |
| **Median Sharpe (all)** | 0.42 |
| **Median Sharpe (Tier 2)** | 0.93 |
| **Median MDD (all)** | -44.7% |
| **Median MDD (Tier 2)** | -31.1% |

---

## The 6 Qualified Stocks (Tier 2)

| Rank | Ticker | Sector | Score | Sharpe | MDD | CAGR |
|------|--------|--------|-------|--------|-----|------|
| 1 | RTX | Defense | 76.15 | 1.01 | -32.8% | 26.9% |
| 2 | LLY | Healthcare | 75.15 | 1.14 | -34.5% | 40.1% |
| 3 | XOM | Energy | 75.00 | 0.95 | -20.5% | 29.8% |
| 4 | WMT | Retail | 73.00 | 0.90 | -25.7% | 21.9% |
| 5 | GS | Finance | 71.05 | 0.96 | -32.8% | 30.7% |
| 6 | COST | Retail | 64.05 | 0.84 | -31.4% | 24.1% |

---

## Common Questions

### Q: Why only 6 stocks?
**A**: The 2021-2025 period was exceptionally volatile. 2022 rate hikes caused -40% to -60% drawdowns in most stocks. Only defensive sectors survived with acceptable risk-adjusted returns.

### Q: Why no tech stocks?
**A**: Tech had high absolute returns but catastrophic drawdowns. Example: NVDA 60.8% CAGR but -66.3% MDD. System correctly prioritized risk control.

### Q: Is AVGO worth considering?
**A**: Yes, tactically. Score 70.05 (would be Tier 2) but failed MDD by 1.1 percentage points. All other metrics excellent. Recent correction may be entry point.

### Q: Why are the thresholds so strict?
**A**: Intentionally selective. Low pass rate (6.5%) validates rigor. Alternative: Lower thresholds = more junk passes through.

### Q: Can I use this for my portfolio?
**A**: Yes, but understand limitations:
- Past performance ≠ future results
- 5-year window may not represent future regimes
- Diversification beyond these 6 recommended
- Consider your personal risk tolerance

---

## Data Sources

**Price Data**: Yahoo Finance (via yfinance Python library)
**Risk-Free Rate**: U.S. Treasury 5-Year Note (4.2% as of 2026-01-25)
**Time Period**: 2021-01-01 to 2026-01-25
**Frequency**: Monthly returns (reduced noise vs daily)

---

## Updates and Maintenance

**Last Updated**: 2026-01-25
**Next Update**: 2026-02-25 (monthly)

**To Update**:
```bash
cd /Users/milton/投资大师/Top20_Screener/scripts
python3 sharpe_tail_risk_screener.py
```

**What Gets Updated**:
- All CSV files (new prices, recalculated metrics)
- Tier classifications may change
- Markdown reports should be manually updated

**Monitor For**:
- Tier 2 stocks falling to Tier 3 (degradation)
- Tier 3 stocks rising to Tier 2 (new opportunities)
- Risk-free rate changes (adjust in code if >1% change)

---

## File Sizes Summary

| File Type | Count | Total Size |
|-----------|-------|------------|
| Documentation (MD) | 6 | ~87 KB |
| Data (CSV) | 7 | ~53 KB |
| Code (PY) | 1 | ~15 KB |
| **Total** | **14** | **~155 KB** |

---

## Contact / Support

**System**: Investment Research Agent v6.0
**Created**: 2026-01-25
**Location**: /Users/milton/投资大师/Top20_Screener/risk_metrics/

**For Issues**:
- Data errors: Check yfinance connection
- Calculation errors: Verify methodology.md
- Code errors: Review Python script comments

---

## Version History

**v1.0** (2026-01-25):
- Initial release
- 92 stocks analyzed
- 6 Tier 2 qualifiers
- Risk-free rate: 4.2%

---

## Legal Disclaimer

This analysis is for informational purposes only. Not financial advice.

- Past performance does not guarantee future results
- All investments carry risk of loss
- Consult a licensed financial advisor before investing
- Methodology limitations documented in methodology.md
- No warranty on accuracy or completeness of data

---

**End of README**

**Next Steps**:
1. Read EXECUTIVE_SUMMARY.md
2. Review tier2_acceptable.csv
3. Build portfolio or continue research with ANALYSIS_SUMMARY.md
