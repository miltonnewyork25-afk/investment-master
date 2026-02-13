# MCP Tools Reference

> Server: `investment-master` | Code: `mcp_server/main.py` | Cache: 5min TTL

---

## Architecture Overview

```
Claude Code
  │
  ├── MCP Server (investment-master)
  │     ├── yfinance (4 tools) ─── Yahoo Finance (free, no key)
  │     ├── FMP Client (1 tool, 20 endpoints) ─── financialmodelingprep.com (FMP_API_KEY)
  │     ├── Baggers Client (4 tools) ─── 100baggers.club (INTERNAL_API_KEY)
  │     └── Polymarket Client (1 tool) ─── polymarket.com (public, no key)
  │
  └── .env (API keys, gitignored)
```

### Environment Variables

| Variable | Source | Used By |
|----------|--------|---------|
| `FMP_API_KEY` | [FMP Register](https://site.financialmodelingprep.com/register) | `fmp_data` |
| `FMP_BASE_URL` | Default: `https://financialmodelingprep.com` | `fmp_data` |
| `INTERNAL_API_KEY` | 100baggers.club admin | `baggers_summary`, `baggers_sec_filings`, `baggers_strategy` |

Template: `.env.example` | Active config: `.env` (gitignored)

### Worktree Access

All 5 worktrees + main share the same MCP server:
- `.mcp.json` in each worktree points to `mcp_server/main.py` via `cwd: /Users/milton/投资大师`
- `.env` exists in each worktree with identical keys
- Code changes only need to happen in main's `mcp_server/main.py`
- `.mcp.json` dependency changes must be copied to all worktrees

**Restart required**: MCP server loads at Claude Code startup. Any change to `.mcp.json` or `main.py` requires restarting Claude Code.

---

## Tools Summary

**10 Total Tools** across 4 data sources:
- **yfinance** (4): analyze_stock, compare_stocks, screen_stocks, get_market_overview
- **FMP** (1): fmp_data (20 endpoints)
- **100baggers** (4): baggers_search, baggers_summary, baggers_sec_filings, baggers_strategy
- **Polymarket** (1): polymarket_events

---

## Tool #1: `analyze_stock`

**Data source**: yfinance | **Auth**: None

Single stock analysis with configurable depth.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbol` | string | Yes | — | Stock ticker (e.g. `AAPL`) |
| `data_types` | enum | No | `basic` | `basic` / `full` / `technical` |
| `period` | string | No | `1y` | Price history period |

**Returns by data_types**:
- `basic` — price, market cap, PE, PB, margins, ROE, FCF, 5-day price history, period stats
- `full` — basic + fundamentals (D/E, current ratio, ROA) + technicals (SMA 20/50/200, RSI)
- `technical` — SMA 20/50/200, RSI, volume, trend direction

---

## Tool #2: `compare_stocks`

**Data source**: yfinance | **Auth**: None

Side-by-side comparison of multiple stocks against a benchmark.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbols` | string[] | Yes | — | Tickers to compare |
| `metrics` | string[] | No | `[pe_ratio, pb_ratio, roe, market_cap]` | Metrics to compare |
| `benchmark` | string | No | `SPY` | Benchmark ticker |

---

## Tool #3: `screen_stocks`

**Data source**: yfinance | **Auth**: None

Screen stocks against preset criteria.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbols` | string[] | Yes | — | Tickers to screen |
| `preset` | enum | Yes | — | `value` / `growth` / `dividend` / `momentum` |

**Preset criteria**:
| Preset | Key Filters |
|--------|------------|
| `value` | PE < 15, PB < 2, Div Yield > 2%, MCap > $1B |
| `growth` | Rev Growth > 15%, Earnings Growth > 20%, ROE > 15%, MCap > $5B |
| `dividend` | Div Yield > 3%, Payout < 70%, Div Growth > 5%, MCap > $2B |
| `momentum` | 1M Return > 5%, 3M Return > 10%, Volume +50%, MCap > $1B |

---

## Tool #4: `get_market_overview`

**Data source**: yfinance | **Auth**: None | **Parameters**: None

Returns current level + daily change for: S&P 500, Dow Jones, NASDAQ, VIX.

---

## Tool #5: `fmp_data`

**Data source**: Financial Modeling Prep | **Auth**: `FMP_API_KEY`

Universal gateway to 20 FMP endpoints.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbol` | string | Conditional | — | Required for all except market-wide endpoints |
| `endpoint` | enum | Yes | — | See endpoint table below |
| `period` | enum | No | `annual` | `annual` / `quarter` (standard statements only) |
| `limit` | integer | No | `4` | Number of periods (standard + TTM only) |
| `date` | string | No | — | `YYYY-MM-DD` (sector-pe / industry-pe only) |

### FMP Endpoints

#### Financial Statements (symbol + period + limit)
| Endpoint | Description | Typical Use |
|----------|-------------|-------------|
| `income` | Income statement | Revenue, EBIT, Net Income by period |
| `balance` | Balance sheet | Assets, liabilities, equity |
| `cashflow` | Cash flow statement | OCF, CapEx, FCF |
| `ratios` | Financial ratios | ROE, ROA, margins, leverage ratios |
| `key-metrics` | Key metrics | EV/EBITDA, revenue per share, etc. |
| `estimates` | Analyst estimates | Revenue/EPS consensus estimates |

#### TTM Statements (symbol + limit)
| Endpoint | Description |
|----------|-------------|
| `income-ttm` | Trailing 12-month income statement |
| `balance-ttm` | Trailing 12-month balance sheet |
| `cashflow-ttm` | Trailing 12-month cash flow |

#### Single-Value (symbol only)
| Endpoint | Description |
|----------|-------------|
| `profile` | Company profile (name, sector, MCap, logo, description) |
| `quote` | Real-time quote (price, change, volume) |
| `rating` | Analyst rating snapshot |
| `dcf` | DCF intrinsic value estimate |
| `financial-scores` | Altman Z-Score + Piotroski F-Score |
| `insider-trading` | Insider buy/sell statistics |
| `employee-count` | Historical employee count |
| `price-light` | Lightweight EOD price history |

#### Market-Wide (no symbol required)
| Endpoint | Parameters | Description |
|----------|-----------|-------------|
| `sector-pe` | `date` (optional) | P/E ratios by sector |
| `industry-pe` | `date` (optional) | P/E ratios by industry |
| `market-risk-premium` | — | Equity Risk Premium (ERP) |

---

## Tool #6: `baggers_search`

**Data source**: 100baggers.club | **Auth**: None (public)

Search companies by ticker, English name, or Chinese name.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search term (e.g. `AAPL`, `Apple`, `苹果`) |

**Returns**: symbol, company_name, company_name_chinese, sector, industry

---

## Tool #7: `baggers_summary`

**Data source**: 100baggers.club | **Auth**: `INTERNAL_API_KEY`

The most data-rich single API call. Returns a complete Markdown financial summary with 7 sections.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | Yes | Stock ticker |

**Returns** (Markdown, ~300 lines):
1. **Macro Temperature** — CAPE ratio, Buffett Indicator, ERP with values/percentiles/status
2. **Leading Indicators** — Positive/negative signals with explanation
3. **38 Financial Metrics (7 dimensions)** — Valuation, Growth, Profitability, Cash Quality, Leverage, Efficiency, Shareholder Returns
4. **DuPont Analysis** — ROE/ROIC/ROA decomposition
5. **Income Statement** — Latest quarter
6. **Balance Sheet** — Latest quarter
7. **Cash Flow Statement** — Latest quarter

**Timeout**: 60s (this API can be slow)

---

## Tool #8: `baggers_sec_filings`

**Data source**: 100baggers.club | **Auth**: `INTERNAL_API_KEY`

Retrieve SEC filings with EDGAR links. Supports batch queries.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbols` | string | Yes | — | Comma-separated tickers (max 20) |
| `types` | string | No | all | Filing types: `10-K`, `10-Q`, `8-K`, etc. |
| `year` | string | No | all | Fiscal year filter |
| `limit` | integer | No | `100` | Max filings per symbol (max 500) |

**Returns per filing**: filing_type, filing_date, period_end_date, filing_url, primary_document_url, accession_number

---

## Tool #9: `baggers_strategy`

**Data source**: 100baggers.club | **Auth**: `INTERNAL_API_KEY`

AI-generated strategy analysis report (5,000-20,000 words).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `symbol` | string | Yes | — | Stock ticker |
| `locale` | enum | No | `zh` | `zh` (Chinese) / `en` (English) |

**Returns**: Full Markdown report with competitive analysis, financial deep-dive, risk assessment, strategic outlook. Returns 404 if no report exists.

**Timeout**: 30s

---

## Tool #10: `polymarket_events`

**Data source**: Polymarket | **Auth**: None (public)

Query prediction market probabilities for company-related major events.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | Yes | — | Search term: company name/ticker/event keywords |
| `limit` | integer | No | `10` | Maximum markets to return |
| `include_prices` | boolean | No | `true` | Whether to fetch current probabilities |

**Search Examples**:
- `"Tesla earnings"` — Tesla earnings-related prediction markets
- `"AAPL"` — Apple-related events
- `"NVDA acquisition"` — NVIDIA merger/acquisition markets
- `"Fed rate cut"` — Federal Reserve policy markets

**Returns per market**:
- `question` — Market question/title
- `description` — Event details
- `status` — Market active/closed status
- `end_date` — Resolution deadline
- `current_prices` — Outcome probabilities (if `include_prices=true`)

**Use Cases**:
1. **Earnings Predictions** — Market expectations for upcoming earnings
2. **M&A Activity** — Acquisition/merger probability estimates
3. **Regulatory Events** — Approval/rejection probabilities
4. **Product Launches** — Success/delay predictions
5. **Macro Events** — Policy changes affecting industries

**Example Response**:
```json
{
  "query": "Tesla earnings",
  "total_markets": 3,
  "markets": [
    {
      "question": "Will Tesla beat Q4 2026 earnings expectations?",
      "status": true,
      "end_date": "2027-01-15",
      "current_prices": {
        "Yes": {"price": "65.0", "probability": 65.0},
        "No": {"price": "35.0", "probability": 35.0}
      }
    }
  ]
}
```

---

## Quick Reference: Which Tool for What?

| Need | Best Tool | Why |
|------|-----------|-----|
| Current price + basic metrics | `analyze_stock` | Fast, no API key needed |
| Full financial statements | `fmp_data` (income/balance/cashflow) | Multi-period, structured data |
| TTM financials | `fmp_data` (income-ttm/balance-ttm/cashflow-ttm) | Rolling 12-month view |
| All-in-one financial snapshot | `baggers_summary` | 38 metrics + macro + DuPont + 3 statements |
| Analyst estimates | `fmp_data` (estimates) | Consensus revenue/EPS |
| DCF valuation | `fmp_data` (dcf) | FMP's intrinsic value |
| Credit/quality scores | `fmp_data` (financial-scores) | Altman Z + Piotroski F |
| Insider trading signals | `fmp_data` (insider-trading) | Buy/sell statistics |
| SEC filings + EDGAR links | `baggers_sec_filings` | 10-K, 10-Q, 8-K |
| Strategy report | `baggers_strategy` | AI long-form analysis |
| Sector/industry PE | `fmp_data` (sector-pe/industry-pe) | Relative valuation context |
| Equity risk premium | `fmp_data` (market-risk-premium) | For DCF discount rate |
| Stock screening | `screen_stocks` | Preset-based filters |
| Multi-stock comparison | `compare_stocks` | Side-by-side with benchmark |
| Market indices status | `get_market_overview` | S&P/Dow/NASDAQ/VIX |
| Find company by name | `baggers_search` | Supports Chinese names |
| Technical analysis (SMA/RSI) | `analyze_stock` (technical) | Moving averages + RSI |
| **Prediction market probabilities** | **`polymarket_events`** | **Earnings/M&A/regulatory event odds** |

---

## Recommended Workflow for Deep Research

```
Phase 0 (Data Prefetch):
  1. baggers_summary(symbol)        → 38 metrics + macro + 3 statements
  2. fmp_data(symbol, "profile")    → Company overview
  3. fmp_data(symbol, "ratios")     → 4-year ratio trends
  4. fmp_data(symbol, "estimates")  → Analyst consensus
  5. baggers_sec_filings(symbol)    → Recent 10-K/10-Q links
  6. baggers_strategy(symbol)       → AI strategy report
  7. polymarket_events(symbol + " earnings") → Upcoming event probabilities

Phase 1-3 (As needed):
  8. fmp_data(symbol, "financial-scores")  → Z-Score, F-Score
  9. fmp_data(symbol, "insider-trading")   → Insider signals
  10. fmp_data(endpoint="sector-pe")        → Sector PE context
  11. fmp_data(symbol, "dcf")              → FMP DCF estimate
  12. polymarket_events(company_name + " acquisition") → M&A probabilities

Phase 4 (Valuation):
  13. fmp_data(symbol, "income", period="quarter", limit=8)  → 2-year quarterly
  14. fmp_data(endpoint="market-risk-premium")  → ERP for WACC
```
