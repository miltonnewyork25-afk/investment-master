#!/usr/bin/env python3
"""Inject earnings surprise + estimates data into existing raw JSON files."""

import json
from pathlib import Path

# Earnings surprise data collected from FMP /api/v3/earnings-surprises/
SURPRISES = {
    "PYPL": [
        {"date": "2026-02-03", "actualEarningResult": 1.23, "estimatedEarning": 1.29},
        {"date": "2025-10-28", "actualEarningResult": 1.34, "estimatedEarning": 1.20},
        {"date": "2025-07-29", "actualEarningResult": 1.40, "estimatedEarning": 1.30},
        {"date": "2025-04-29", "actualEarningResult": 1.33, "estimatedEarning": 1.16},
    ],
    "QCOM": [
        {"date": "2026-02-04", "actualEarningResult": 3.50, "estimatedEarning": 3.39},
        {"date": "2025-11-05", "actualEarningResult": 3.00, "estimatedEarning": 2.87},
        {"date": "2025-07-30", "actualEarningResult": 2.77, "estimatedEarning": 2.71},
        {"date": "2025-04-30", "actualEarningResult": 2.85, "estimatedEarning": 2.82},
    ],
    "HPQ": [
        {"date": "2026-02-24", "actualEarningResult": 0.81, "estimatedEarning": 0.765},
        {"date": "2025-11-25", "actualEarningResult": 0.93, "estimatedEarning": 0.921},
        {"date": "2025-08-27", "actualEarningResult": 0.75, "estimatedEarning": 0.745},
        {"date": "2025-05-28", "actualEarningResult": 0.71, "estimatedEarning": 0.775},
    ],
    "BABA": [
        {"date": "2025-11-25", "actualEarningResult": 0.61, "estimatedEarning": 0.66},
        {"date": "2025-08-29", "actualEarningResult": 2.06, "estimatedEarning": 2.13},
        {"date": "2025-05-15", "actualEarningResult": 1.73, "estimatedEarning": 1.48},
        {"date": "2025-02-20", "actualEarningResult": 2.93, "estimatedEarning": 2.67},
    ],
    "VRSN": [
        {"date": "2026-02-05", "actualEarningResult": 2.23, "estimatedEarning": 2.35},
        {"date": "2025-10-23", "actualEarningResult": 2.27, "estimatedEarning": 2.25},
        {"date": "2025-07-24", "actualEarningResult": 2.21, "estimatedEarning": 2.20},
        {"date": "2025-04-24", "actualEarningResult": 2.10, "estimatedEarning": 2.11},
    ],
    "NKE": [
        {"date": "2025-12-18", "actualEarningResult": 0.53, "estimatedEarning": 0.3747},
        {"date": "2025-09-30", "actualEarningResult": 0.49, "estimatedEarning": 0.272},
        {"date": "2025-06-26", "actualEarningResult": 0.14, "estimatedEarning": 0.1303},
        {"date": "2025-03-20", "actualEarningResult": 0.54, "estimatedEarning": 0.3007},
    ],
    "MO": [
        {"date": "2026-01-29", "actualEarningResult": 1.30, "estimatedEarning": 1.32},
        {"date": "2025-10-30", "actualEarningResult": 1.45, "estimatedEarning": 1.44},
        {"date": "2025-07-30", "actualEarningResult": 1.44, "estimatedEarning": 1.39},
        {"date": "2025-04-29", "actualEarningResult": 1.23, "estimatedEarning": 1.19},
    ],
    "GM": [
        {"date": "2026-01-27", "actualEarningResult": 2.51, "estimatedEarning": 2.26},
        {"date": "2025-10-21", "actualEarningResult": 2.80, "estimatedEarning": 2.29},
        {"date": "2025-07-22", "actualEarningResult": 2.53, "estimatedEarning": 2.34},
        {"date": "2025-04-29", "actualEarningResult": 2.78, "estimatedEarning": 2.68},
    ],
    "JD": [
        {"date": "2026-03-05", "actualEarningResult": 0.08, "estimatedEarning": 0.1006},
        {"date": "2025-11-13", "actualEarningResult": 0.52, "estimatedEarning": 0.46},
        {"date": "2025-08-14", "actualEarningResult": 0.69, "estimatedEarning": 0.50},
        {"date": "2025-05-13", "actualEarningResult": 1.16, "estimatedEarning": 1.05},
    ],
    "EBAY": [
        {"date": "2026-02-18", "actualEarningResult": 1.41, "estimatedEarning": 1.35},
        {"date": "2025-10-29", "actualEarningResult": 1.36, "estimatedEarning": 1.33},
        {"date": "2025-07-30", "actualEarningResult": 1.37, "estimatedEarning": 1.30},
        {"date": "2025-04-30", "actualEarningResult": 1.38, "estimatedEarning": 1.34},
    ],
    "CI": [
        {"date": "2026-02-05", "actualEarningResult": 8.08, "estimatedEarning": 7.88},
        {"date": "2025-10-30", "actualEarningResult": 7.83, "estimatedEarning": 7.64},
        {"date": "2025-07-31", "actualEarningResult": 7.20, "estimatedEarning": 7.16},
        {"date": "2025-05-02", "actualEarningResult": 6.74, "estimatedEarning": 6.35},
    ],
}

# Analyst coverage from estimates endpoint
ESTIMATES = {
    "PYPL": [{"numAnalystsEps": 19}],
    "QCOM": [{"numAnalystsEps": 10}],
    "BABA": [{"numAnalystsEps": 4}],
    "VRSN": [{"numAnalystsEps": 1}],
    "NKE": [{"numAnalystsEps": 9}],
}

RAW_DIR = Path("data/screener/raw")

updated = 0
for sym, surprises in SURPRISES.items():
    fpath = RAW_DIR / f"{sym}.json"
    if not fpath.exists():
        print(f"  SKIP {sym}: no raw file")
        continue
    with open(fpath) as f:
        data = json.load(f)
    data["earnings_surprises"] = surprises
    if sym in ESTIMATES:
        data["estimates"] = ESTIMATES[sym]
    with open(fpath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    updated += 1
    print(f"  OK {sym}: {len(surprises)} surprises injected")

print(f"\nDone: {updated} files updated")
