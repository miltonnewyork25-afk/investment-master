# FORM Source Access Validation

> Date: 2026-04-16
> Purpose: verify that the local repo's configured data sources can be used as the research backbone for the FORM report

---

## Result

The repo's live data stack is usable for FORM research right now.

Working sources:

- `FMP`
- `100baggers.club`
- official investor-relations materials and filings

Partially blocked source:

- direct `SEC` client in local research code

---

## 1. FMP Validation

Validated through the repo's Python client in `mcp_server/main.py`.

Successful pulls:

- `profile`
- `financial-scores`

Key returned fields:

- `symbol`: `FORM`
- `companyName`: `FormFactor, Inc.`
- `cik`: `0001039399`
- `marketCap`: about `$10.10B`
- `price`: about `$129.62`
- `employees`: `2238`
- `altmanZScore`: `33.4`
- `piotroskiScore`: `5`
- `totalLiabilities`: about `$189M`
- `revenue`: about `$785M`

Why this matters:

- FMP gives a fast, structured sanity check for identity, scale, balance-sheet quality, and quality-factor context.

---

## 2. 100baggers Validation

Validated through the repo's Python client in `mcp_server/main.py`.

Successful pulls:

- quarterly financial summary
- SEC filing metadata

Most useful signals from the quarterly summary:

- macro backdrop is expensive:
  - `CAPE 40.24`
  - `Buffett Indicator 221%`
  - `ERP 4.5%`
- positive company signals:
  - revenue and gross-profit resonance
  - operating leverage release
- caution signal:
  - insider net selling
- demanding trailing valuation:
  - `P/E TTM 103.72`
  - `EV/EBITDA TTM 62.25`
  - `EV/Sales TTM 6.95`
  - `FCF Yield TTM 0.21%`
- operating quality snapshot:
  - `ROIC TTM 6.66%`
  - `Current Ratio 4.50`
  - `CCC 93 days`

Most useful SEC-style filing metadata returned by 100baggers:

- `10-K` filed `2026-02-20`
- `10-Q` filed `2025-11-04`
- multiple `8-K` events across `2025-07` to `2026-01`

Why this matters:

- 100baggers compresses the first-pass financial and filing scan into a much faster contradiction-hunting layer than manual browsing alone.

---

## 3. Direct SEC Client Validation

Validated through `engines/IntelligenceEngine_v10/engines/sec_monitor.py`.

What happened:

- the client constructed the correct `FORM` Form 4 RSS path using `CIK 0001039399`
- requests reached the network layer
- repeated reads from `www.sec.gov` timed out at `30s`

Interpretation:

- this is not a missing-code or missing-config failure
- it is currently a connectivity / latency reliability issue for direct SEC retrieval in this environment

---

## 4. Working Research Stack For FORM

Use this priority order for the next phase:

1. official company filings and investor presentation materials
2. `FMP` for structured company, valuation, and quality fields
3. `100baggers.club` for compressed financial diagnostics and filing metadata
4. direct SEC client only after hardening timeout / reliability behavior

Current conclusion:

> FORM research is not blocked by data access. The report can now move from discovery into deeper contradiction testing using the repo's own live data stack rather than relying only on public webpages.
