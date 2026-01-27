# Quick Reference Guide - Top 20 Stock Screener

**Last Updated**: 2026-01-25

---

## Essential Files

### Results
```bash
# Top 20 stocks (CSV format)
/Users/milton/投资大师/Top20_Screener/data/top20_results.csv

# Summary report (text)
/Users/milton/投资大师/Top20_Screener/data/top20_results_summary.txt

# Comprehensive analysis (35 pages)
/Users/milton/投资大师/Top20_Screener/data/FINAL_REPORT.md
```

### Database
```bash
# SQLite database (150 MB)
/Users/milton/投资大师/Top20_Screener/data/market_data.db
```

### Documentation
```bash
# Project guide
/Users/milton/投资大师/Top20_Screener/README.md

# Project summary
/Users/milton/投资大师/Top20_Screener/PROJECT_SUMMARY.md

# Methodology details
/Users/milton/投资大师/Top20_Screener/data/sharpe_calculation_methodology.md

# Data quality report
/Users/milton/投资大师/Top20_Screener/data/data_quality_report.md
```

---

## Quick Commands

### View Top 20 Results

```bash
# CSV format
cat /Users/milton/投资大师/Top20_Screener/data/top20_results.csv

# Summary report
cat /Users/milton/投资大师/Top20_Screener/data/top20_results_summary.txt

# Full analysis
cat /Users/milton/投资大师/Top20_Screener/data/FINAL_REPORT.md
```

### Database Queries

```bash
# Connect to database
sqlite3 /Users/milton/投资大师/Top20_Screener/data/market_data.db

# Top 10 by Sharpe Ratio
SELECT c.symbol, c.name, r.sharpe_ratio, r.volatility, r.max_drawdown
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
ORDER BY r.sharpe_ratio DESC
LIMIT 10;

# Tech stocks with high Sharpe
SELECT c.symbol, c.name, r.sharpe_ratio, m.operating_margin
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
JOIN metrics m ON c.symbol = m.symbol
WHERE c.sector = 'Technology' AND r.sharpe_ratio > 0.8
ORDER BY r.sharpe_ratio DESC;

# Low volatility winners
SELECT c.symbol, c.name, r.sharpe_ratio, r.volatility, r.max_drawdown
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
WHERE r.volatility < 0.30 AND r.sharpe_ratio > 0.7
ORDER BY r.sharpe_ratio DESC;
```

### Run Analysis

```bash
# Navigate to scripts
cd /Users/milton/投资大师/Top20_Screener/scripts

# Full data refresh (takes ~15 minutes total)
python3 data_collector.py
python3 calculate_ratios.py
python3 update_metrics.py

# Run screener (5 seconds)
python3 screener_v2.py

# Monitor progress
python3 monitor_progress.py
```

---

## Top 20 Stocks (Quick Reference)

| # | Symbol | Company | Sharpe | Sector |
|---|--------|---------|--------|--------|
| 1 | NVDA | NVIDIA | 1.20 | Technology |
| 2 | ANET | Arista Networks | 1.01 | Technology |
| 3 | WMB | Williams Companies | 1.10 | Energy |
| 4 | AVGO | Broadcom | 1.08 | Technology |
| 5 | GE | GE Aerospace | 1.11 | Industrials |
| 6 | APH | Amphenol | 1.15 | Technology |
| 7 | MU | Micron | 0.83 | Technology |
| 8 | GOOGL | Alphabet A | 0.83 | Technology |
| 9 | GOOG | Alphabet C | 0.83 | Technology |
| 10 | WDC | Western Digital | 0.92 | Technology |
| 11 | XOM | Exxon Mobil | 0.94 | Energy |
| 12 | ORLY | O'Reilly Auto | 1.00 | Consumer Cyclical |
| 13 | PM | Philip Morris | 0.84 | Consumer Defensive |
| 14 | ABBV | AbbVie | 0.72 | Healthcare |
| 15 | LRCX | Lam Research | 0.77 | Technology |
| 16 | RTX | RTX | 0.95 | Industrials |
| 17 | GILD | Gilead Sciences | 0.71 | Healthcare |
| 18 | KMI | Kinder Morgan | 0.77 | Energy |
| 19 | PANW | Palo Alto Networks | 0.66 | Technology |
| 20 | MSFT | Microsoft | 0.55 | Technology |

---

## Key Statistics

- **Average Sharpe Ratio**: 0.90
- **S&P 500 Median Sharpe**: 0.35
- **Performance**: 2.5x better risk-adjusted returns
- **Average Volatility**: 32%
- **Sector Concentration**: 55% Technology, 15% Energy

---

## Investment Strategies

### Conservative (Low Volatility)

**Focus**: Sharpe >0.8, Volatility <30%

Stocks: WMB, ORLY, PM, XOM, APH

**Expected**: Sharpe ~0.95, Vol ~24%

### Balanced (Tiered)

- **Core 40%**: NVDA, ANET, WMB, AVGO, GE
- **Growth 30%**: APH, MU, GOOGL, WDC, XOM
- **Stability 20%**: WMB, ORLY, PM, XOM
- **Opportunistic 10%**: #15-20

**Expected**: Sharpe ~0.85, Vol ~30%

### Aggressive (High Growth)

**Focus**: Top 10 by score

Stocks: NVDA, ANET, WMB, AVGO, GE, APH, MU, GOOGL, GOOG, WDC

**Expected**: Sharpe ~1.0, Vol ~40%

---

## Risk Warnings

### Individual Stocks

**NVDA** (#1):
- ⚠️ 52% volatility, -66% max drawdown
- ✅ 1.20 Sharpe, AI dominance
- **Risk**: Competition, China exposure, valuation

**ABBV** (#14):
- ⚠️ -26x debt/equity (leverage)
- ✅ Pharma leader, 0.72 Sharpe
- **Risk**: Patent cliffs, high debt

**MU** (#7):
- ⚠️ Cyclical semiconductor
- ✅ 0.83 Sharpe, memory recovery
- **Risk**: Chip cycle, China exposure

### Portfolio Risks

- **Tech Concentration**: 55% in one sector
- **High Valuation**: Many stocks at 25-40x P/E
- **Cyclicality**: Semiconductors (5 stocks) cyclical

### Mitigation

- Max 10% per stock
- Max 60% per sector
- Stop-loss at -30% from entry
- Quarterly rebalancing

---

## Quarterly Refresh Checklist

**Schedule**: January, April, July, October

1. ✅ Run data collector (~10 min)
2. ✅ Calculate ratios (~1 min)
3. ✅ Update metrics (~5 min)
4. ✅ Run screener (~5 sec)
5. ✅ Compare to previous quarter
6. ✅ Identify changes:
   - New entrants → BUY
   - Dropouts → SELL
   - Score changes >15 pts → RE-WEIGHT
7. ✅ Update documentation

---

## Database Quick Queries

### Top Performers

```sql
-- Best Sharpe Ratios
SELECT c.symbol, c.name, r.sharpe_ratio, r.volatility
FROM companies c JOIN risk_metrics r ON c.symbol = r.symbol
ORDER BY r.sharpe_ratio DESC LIMIT 10;

-- Best Profitability
SELECT c.symbol, c.name, m.roe, m.operating_margin
FROM companies c JOIN metrics m ON c.symbol = m.symbol
WHERE m.roe IS NOT NULL
ORDER BY m.roe DESC LIMIT 10;

-- Low Volatility Champions
SELECT c.symbol, c.name, r.sharpe_ratio, r.volatility, r.max_drawdown
FROM companies c JOIN risk_metrics r ON c.symbol = r.symbol
WHERE r.volatility < 0.25
ORDER BY r.sharpe_ratio DESC LIMIT 10;
```

### Sector Analysis

```sql
-- Sector Sharpe Averages
SELECT c.sector,
       COUNT(*) as count,
       AVG(r.sharpe_ratio) as avg_sharpe,
       AVG(r.volatility) as avg_vol
FROM companies c JOIN risk_metrics r ON c.symbol = r.symbol
GROUP BY c.sector
ORDER BY avg_sharpe DESC;

-- Technology Stock Analysis
SELECT c.symbol, c.name, r.sharpe_ratio, m.operating_margin, m.roe
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
JOIN metrics m ON c.symbol = m.symbol
WHERE c.sector = 'Technology'
ORDER BY r.sharpe_ratio DESC;
```

### Financial Health

```sql
-- Strong Balance Sheets
SELECT c.symbol, c.name,
       m.current_ratio, m.debt_to_equity,
       f.operating_cash_flow/f.net_income as ocf_ni
FROM companies c
JOIN metrics m ON c.symbol = m.symbol
JOIN financials_ttm f ON c.symbol = f.symbol
WHERE m.current_ratio > 2.0
  AND m.debt_to_equity < 0.5
  AND f.operating_cash_flow/f.net_income > 1.0
ORDER BY m.current_ratio DESC;
```

---

## Python Usage

### Load Top 20 in Pandas

```python
import pandas as pd

# Load results
df = pd.read_csv('/Users/milton/投资大师/Top20_Screener/data/top20_results.csv')

# View summary
print(df[['symbol', 'name', 'sharpe_ratio', 'composite_score']].head(10))

# Filter by criteria
tech_stocks = df[df['sector'] == 'Technology']
high_sharpe = df[df['sharpe_ratio'] > 1.0]
```

### Query Database

```python
import sqlite3
import pandas as pd

conn = sqlite3.connect('/Users/milton/投资大师/Top20_Screener/data/market_data.db')

# Get top Sharpe stocks
query = """
SELECT c.symbol, c.name, r.sharpe_ratio, r.volatility, m.operating_margin
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
JOIN metrics m ON c.symbol = m.symbol
ORDER BY r.sharpe_ratio DESC
LIMIT 20
"""

df = pd.read_sql(query, conn)
print(df)
conn.close()
```

### Custom Analysis

```python
import sqlite3
import pandas as pd
import numpy as np

conn = sqlite3.connect('/Users/milton/投资大师/Top20_Screener/data/market_data.db')

# Get all data
query = """
SELECT c.*, r.*, m.*
FROM companies c
JOIN risk_metrics r ON c.symbol = r.symbol
JOIN metrics m ON c.symbol = m.symbol
"""

df = pd.read_sql(query, conn)

# Custom scoring
df['custom_score'] = (
    df['sharpe_ratio'] * 0.5 +
    df['operating_margin'] * 100 * 0.3 +
    df['roe'] * 100 * 0.2
)

top_custom = df.nlargest(20, 'custom_score')
print(top_custom[['symbol', 'name', 'custom_score']])

conn.close()
```

---

## Troubleshooting

### Database Locked

```bash
# If database is locked, close all connections
pkill -f "sqlite3 market_data.db"
```

### API Rate Limit

```bash
# If hitting rate limits, increase delay in data_collector.py
# Change REQUEST_DELAY from 0.02 to 0.05
```

### Missing Data

```bash
# Re-run data collection for specific stocks
python3 -c "
from data_collector import FMPClient, DatabaseManager
client = FMPClient('fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb')
db = DatabaseManager('/Users/milton/投资大师/Top20_Screener/data/market_data.db')
db.connect()
# Add custom collection logic here
db.close()
"
```

---

## Support

### Documentation
- Full report: `data/FINAL_REPORT.md`
- Project guide: `README.md`
- Methodology: `data/sharpe_calculation_methodology.md`

### Scripts
- All scripts in: `/Users/milton/投资大师/Top20_Screener/scripts/`
- Well-commented code
- Unit tests available

### Data
- Database: `data/market_data.db`
- 503 S&P 500 companies
- 5 years historical data
- 100% completeness

---

## Contact Info

**Project**: Top 20 Stock Screener
**Version**: 1.0
**Date**: 2026-01-25
**Next Review**: 2026-04-25

---

**Quick Links**:
- [README](README.md)
- [FINAL_REPORT](data/FINAL_REPORT.md)
- [PROJECT_SUMMARY](PROJECT_SUMMARY.md)
- [Data Quality Report](data/data_quality_report.md)
