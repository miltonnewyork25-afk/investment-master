#!/usr/bin/env python3
"""Inject earnings surprise + management change + estimates data for Stage 2."""

import json
from pathlib import Path

# === Earnings Surprises (newly fetched) ===
NEW_SURPRISES = {
    "CMCSA": [
        {"date": "2026-01-29", "actualEarningResult": 0.84, "estimatedEarning": 0.729},
        {"date": "2025-10-30", "actualEarningResult": 1.12, "estimatedEarning": 1.03},
        {"date": "2025-07-31", "actualEarningResult": 1.25, "estimatedEarning": 1.16},
        {"date": "2025-04-24", "actualEarningResult": 1.09, "estimatedEarning": 0.987},
    ],
    "T": [
        {"date": "2026-01-28", "actualEarningResult": 0.52, "estimatedEarning": 0.4628},
        {"date": "2025-10-22", "actualEarningResult": 0.54, "estimatedEarning": 0.537},
        {"date": "2025-07-23", "actualEarningResult": 0.54, "estimatedEarning": 0.53},
        {"date": "2025-04-23", "actualEarningResult": 0.51, "estimatedEarning": 0.509},
    ],
    "DIS": [
        {"date": "2026-02-02", "actualEarningResult": 1.63, "estimatedEarning": 1.57},
        {"date": "2025-11-13", "actualEarningResult": 1.11, "estimatedEarning": 1.05},
        {"date": "2025-08-06", "actualEarningResult": 1.61, "estimatedEarning": 1.45},
        {"date": "2025-05-07", "actualEarningResult": 1.45, "estimatedEarning": 1.19},
    ],
    "GILD": [
        {"date": "2026-02-10", "actualEarningResult": 1.86, "estimatedEarning": 1.81},
        {"date": "2025-10-30", "actualEarningResult": 2.47, "estimatedEarning": 2.13},
        {"date": "2025-08-07", "actualEarningResult": 2.01, "estimatedEarning": 1.96},
        {"date": "2025-04-24", "actualEarningResult": 1.81, "estimatedEarning": 1.78},
    ],
    "DELL": [
        {"date": "2026-02-26", "actualEarningResult": 3.89, "estimatedEarning": 3.53},
        {"date": "2025-11-25", "actualEarningResult": 2.59, "estimatedEarning": 2.47},
        {"date": "2025-08-28", "actualEarningResult": 2.32, "estimatedEarning": 2.29},
        {"date": "2025-05-29", "actualEarningResult": 1.55, "estimatedEarning": 1.70},
    ],
    "CSCO": [
        {"date": "2026-02-11", "actualEarningResult": 1.04, "estimatedEarning": 1.02},
        {"date": "2025-11-12", "actualEarningResult": 1.00, "estimatedEarning": 0.982},
        {"date": "2025-08-13", "actualEarningResult": 0.99, "estimatedEarning": 0.977},
        {"date": "2025-05-14", "actualEarningResult": 0.96, "estimatedEarning": 0.917},
    ],
    "BMY": [
        {"date": "2026-02-05", "actualEarningResult": 1.26, "estimatedEarning": 1.23},
        {"date": "2025-10-30", "actualEarningResult": 1.63, "estimatedEarning": 1.52},
        {"date": "2025-07-31", "actualEarningResult": 1.46, "estimatedEarning": 1.09},
        {"date": "2025-04-24", "actualEarningResult": 1.80, "estimatedEarning": 1.49},
    ],
    "TEVA": [
        {"date": "2026-01-28", "actualEarningResult": 0.96, "estimatedEarning": 0.641},
        {"date": "2025-11-05", "actualEarningResult": 0.78, "estimatedEarning": 0.68},
        {"date": "2025-07-30", "actualEarningResult": 0.66, "estimatedEarning": 0.63},
        {"date": "2025-05-07", "actualEarningResult": 0.52, "estimatedEarning": 0.47},
    ],
}

# === Management Change Signals (manually curated) ===
# new_ceo_within_2y: CEO appointed after 2024-03-16
# new_strategy_signal: clear strategic pivot underway
MGMT_SIGNALS = {
    "NKE": {"new_ceo_within_2y": True, "new_strategy_signal": True},   # Elliott Hill, Oct 2024
    "INTC": {"new_ceo_within_2y": True, "new_strategy_signal": True},  # Lip-Bu Tan, Mar 2025
    "STLA": {"new_ceo_within_2y": True, "new_strategy_signal": False}, # CEO search after Tavares exit Dec 2024
    "DIS": {"new_ceo_within_2y": False, "new_strategy_signal": True},  # Iger turnaround ongoing
    "TEVA": {"new_ceo_within_2y": False, "new_strategy_signal": True}, # Richard Francis pivot to branded generics
    "BMY": {"new_ceo_within_2y": False, "new_strategy_signal": True},  # Post-patent cliff pipeline rebuild
}

RAW_DIR = Path("data/screener/raw")
updated = 0

# Inject earnings surprises
for sym, surprises in NEW_SURPRISES.items():
    fpath = RAW_DIR / f"{sym}.json"
    if not fpath.exists():
        print(f"  SKIP {sym}: no raw file")
        continue
    with open(fpath) as f:
        data = json.load(f)
    data["earnings_surprises"] = surprises
    with open(fpath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    updated += 1
    print(f"  OK {sym}: {len(surprises)} surprises injected")

# Inject management signals
for sym, signals in MGMT_SIGNALS.items():
    fpath = RAW_DIR / f"{sym}.json"
    if not fpath.exists():
        print(f"  SKIP {sym}: no raw file")
        continue
    with open(fpath) as f:
        data = json.load(f)
    data["mgmt_signals"] = signals
    with open(fpath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  OK {sym}: mgmt signals injected ({signals})")
    updated += 1

print(f"\nDone: {updated} updates applied")
