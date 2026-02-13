# InvestView API Documentation

This document covers:
1. **External APIs** — InvestView endpoints for integration into other websites
2. **FMP API** — How InvestView calls Financial Modeling Prep for upstream data

---

## Part 1: External APIs (for Third-Party Integration)

All external APIs are hosted at `https://www.100baggers.club`.

### Authentication

| API | Auth Required |
|-----|--------------|
| Search | No (public) |
| Generate Summary | `x-api-key` header |
| Get SEC Filings | `x-api-key` header |
| Get Strategy Report | `x-api-key` header |

The `x-api-key` value must match the `INTERNAL_API_KEY` environment variable configured on the server. Store it server-side only — never expose in frontend code.

---

### 1. Search API

Find companies by symbol, English name, or Chinese name.

- **Endpoint**: `GET /api/search?q={query}`
- **Auth**: None

```bash
curl -G "https://www.100baggers.club/api/search" --data-urlencode "q=特斯拉"
```

**Response**:
```json
{
  "success": true,
  "results": [
    {
      "symbol": "TSLA",
      "company_name": "Tesla, Inc.",
      "company_name_chinese": "特斯拉",
      "sector": "Consumer Cyclical",
      "industry": "Auto - Manufacturers"
    }
  ]
}
```

---

### 2. Generate Summary API

Generate a Markdown financial summary for a company. Returns 7 sections: macro market temperature (CAPE/Buffett/ERP), leading indicators, 38 financial metrics across 7 dimensions, DuPont analysis, income statement, balance sheet, and cash flow statement.

- **Endpoint**: `POST /api/generate-summary`
- **Auth**: `x-api-key` header
- **Body**: `{ "symbol": "TSLA" }`

```bash
curl -X POST "https://www.100baggers.club/api/generate-summary" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_INTERNAL_API_KEY" \
  -d '{"symbol": "TSLA"}'
```

**Response**:
```json
{
  "success": true,
  "symbol": "TSLA",
  "markdown": "# TSLA 最新季度财务摘要 (2025 Q4)\n\n## 1. 宏观市场温度\n| 指标 | 当前值 | 历史百分位 | 状态 |\n...",
  "timestamp": "2026-02-09T00:02:21.816Z"
}
```

The `markdown` field contains the full summary (~300 lines). Sections:
1. 宏观市场温度 — CAPE, Buffett Indicator, ERP with values/percentiles/status
2. 领先指标 — Positive/negative signals with explanation table
3. 关键财务指标 (7 dimensions) — Valuation, Growth, Profitability, Cash Quality, Leverage, Efficiency, Shareholder Returns
4. 商业模式分析 (杜邦模型) — ROE/ROIC/ROA decomposition
5. 利润表 — Latest quarter income statement
6. 资产负债表 — Latest quarter balance sheet
7. 现金流量表 — Latest quarter cash flow

---

### 3. Get SEC Filings API

Retrieve SEC filings (10-K, 10-Q, 8-K, etc.) for one or more companies. Returns structured filing metadata with links to SEC EDGAR.

- **Endpoint**: `GET /api/get-sec-filings`
- **Auth**: `x-api-key` header
- **Query Parameters**:

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `symbols` | Yes | Comma-separated symbols (max 20) | `AAPL,MSFT,GOOGL` |
| `types` | No | Filing types filter | `10-K,10-Q` |
| `year` | No | Fiscal year filter | `2025` |
| `limit` | No | Max filings per symbol (default 100, max 500) | `50` |

```bash
# All filings for AAPL
curl -H "x-api-key: YOUR_KEY" \
  "https://www.100baggers.club/api/get-sec-filings?symbols=AAPL"

# Only 10-K and 10-Q for multiple companies, fiscal year 2025
curl -H "x-api-key: YOUR_KEY" \
  "https://www.100baggers.club/api/get-sec-filings?symbols=AAPL,MSFT&types=10-K,10-Q&year=2025"
```

**Response**:
```json
{
  "data": {
    "AAPL": [
      {
        "symbol": "AAPL",
        "cik": "0000320193",
        "filing_type": "10-K",
        "filing_date": "2025-10-31",
        "accepted_datetime": "2025-10-31T16:06:24.000Z",
        "accession_number": "0000320193-25-000106",
        "fiscal_year": 2025,
        "fiscal_quarter": null,
        "period_end_date": "2025-09-27",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/320193/...",
        "primary_document": "aapl-20250927.htm",
        "primary_document_url": "https://www.sec.gov/Archives/edgar/data/320193/.../aapl-20250927.htm",
        "items": null
      }
    ]
  },
  "meta": {
    "totalFilings": 15,
    "symbolsFound": ["AAPL"],
    "symbolsNotFound": [],
    "filters": {
      "types": "all",
      "year": "all",
      "limitPerSymbol": 100
    }
  }
}
```

Each filing object contains:
- `filing_type` — 10-K (annual), 10-Q (quarterly), 8-K (current event), etc.
- `filing_date` / `period_end_date` — When filed and what period it covers
- `filing_url` / `primary_document_url` — Direct links to SEC EDGAR documents
- `accession_number` — Unique SEC filing identifier

---

### 4. Get Strategy Report API

Retrieve the latest strategy analysis report (Markdown) for a company. These are long-form AI-generated investment strategy reports based on the latest quarterly data.

- **Endpoint**: `GET /api/get-strategy-report`
- **Auth**: `x-api-key` header
- **Query Parameters**:

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `symbol` | Yes | Stock ticker | `AAPL` |
| `locale` | No | Language: `zh` or `en` (default `en`) | `zh` |

```bash
curl -H "x-api-key: YOUR_KEY" \
  "https://www.100baggers.club/api/get-strategy-report?symbol=AAPL&locale=zh"
```

**Response**:
```json
{
  "success": true,
  "report": {
    "symbol": "AAPL",
    "filename": "2025_Q3_strategy.md",
    "slug": "AAPL-2025_Q3_strategy",
    "title": "AAPL Strategic Analysis based on 2025_Q3 Report",
    "tag": "战略分析",
    "date": "2025_Q3",
    "logoUrl": "https://financialmodelingprep.com/image-stock/AAPL.png",
    "companyName": "Apple Inc.",
    "content": "# Full markdown content of the strategy report..."
  },
  "timestamp": "2026-02-09T00:10:00.000Z"
}
```

The `content` field is a full Markdown strategy report (typically 5,000–20,000 words) containing competitive analysis, financial deep-dive, risk assessment, and strategic outlook. Returns `404` if no strategy report exists for the symbol.

---

## Part 2: FMP (Financial Modeling Prep) API

InvestView uses [FMP](https://site.financialmodelingprep.com/) as its upstream financial data source. All FMP calls happen **server-side only** (scripts and cron jobs), never from the browser. Data is fetched, processed, and stored in Supabase.

### Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `FMP_API_KEY` | `fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb` | API authentication key (query parameter) |
| `FMP_BASE_URL` | `https://financialmodelingprep.com/stable` | Base URL for stable endpoints |

### Authentication Method

FMP uses **query parameter** authentication (not headers):
```
https://financialmodelingprep.com/stable/profile?symbol=AAPL&apikey=fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb
```

### Rate Limits

- **3,000 requests per minute** (FMP enforced)
- Our scripts implement rate limiting with 20–100ms delays between requests

### FMP Endpoints Used

#### Company Data
| Endpoint | Description | Update Frequency |
|----------|-------------|-----------------|
| `stable/profile?symbol={symbol}` | Company profile (name, sector, market cap, logo) | Daily |
| `stable/quote?symbol={symbol}` | Real-time stock quote | On-demand |
| `stable/employee-count?symbol={symbol}` | Historical employee count | Quarterly |
| `stable/actively-trading-list` | All actively traded US stocks | Quarterly |

#### Financial Statements (Bulk — CSV format)
| Endpoint | Description | Update Frequency |
|----------|-------------|-----------------|
| `stable/income-statement-bulk?year={year}&period={period}` | All companies' income statements | Quarterly |
| `stable/balance-sheet-statement-bulk?year={year}&period={period}` | All companies' balance sheets | Quarterly |
| `stable/cash-flow-statement-bulk?year={year}&period={period}` | All companies' cash flow statements | Quarterly |

#### Financial Statements (TTM — per symbol)
| Endpoint | Description |
|----------|-------------|
| `stable/income-statement-ttm?symbol={symbol}&limit={n}` | Trailing 12-month income statement |
| `stable/balance-sheet-statement-ttm?symbol={symbol}&limit={n}` | Trailing 12-month balance sheet |
| `stable/cash-flow-statement-ttm?symbol={symbol}&limit={n}` | Trailing 12-month cash flow |

#### Financial Scores & Insider Trading
| Endpoint | Description |
|----------|-------------|
| `stable/financial-scores?symbol={symbol}` | Altman Z-Score & Piotroski F-Score |
| `stable/insider-trading/statistics?symbol={symbol}` | Insider buy/sell statistics |

#### Market Data
| Endpoint | Description |
|----------|-------------|
| `stable/historical-market-capitalization?symbol={symbol}&from={date}&to={date}` | Historical market cap |
| `stable/historical-price-eod/full?symbol={symbol}&from={date}&to={date}` | End-of-day price history |
| `stable/historical-price-eod/light?symbol={symbol}` | Lightweight price history |
| `stable/sector-pe-snapshot?date={date}` | P/E ratios by sector |
| `stable/industry-pe-snapshot?date={date}` | P/E ratios by industry |

#### Macro Indicators
| Endpoint | Description |
|----------|-------------|
| `stable/market-risk-premium` | Equity Risk Premium (ERP) |
| `stable/economic-indicators?name=GDP` | GDP data (for Buffett Indicator) |

#### Legacy v3 Endpoints (still in use)
| Endpoint | Description |
|----------|-------------|
| `api/v3/quote/{symbols}` | Batch quotes (comma-separated) |
| `api/v3/profile/{symbols}` | Batch profiles |
| `api/v3/historical-price-full/{symbol}?from={date}&to={date}` | Historical prices (Wilshire 5000) |
