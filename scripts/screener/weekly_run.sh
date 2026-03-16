#!/bin/bash
# ============================================
# 低估股筛选系统 — 周跑自动化 v1.0
# 用途: 每周日运行，更新quote数据+重跑排名+生成变动报告
# 运行: bash scripts/screener/weekly_run.sh
# ============================================

set -uo pipefail
cd "$(dirname "$0")/../.."

DATE=$(date +%Y-%m-%d)
RAW_DIR="data/screener/raw"
OUT_DIR="data/screener"
ARCHIVE_DIR="data/screener/archive"
QRS=0.15  # 当前QRS评分，需手动更新或自动获取

echo "============================================"
echo "  低估股筛选系统 — 周跑 $DATE"
echo "  候选池: $(ls $RAW_DIR/*.json | wc -l | tr -d ' ')只"
echo "  QRS: $QRS"
echo "============================================"

# Step 1: 备份上周排名
mkdir -p "$ARCHIVE_DIR"
if [ -f "$OUT_DIR/screen_results.json" ]; then
    cp "$OUT_DIR/screen_results.json" "$ARCHIVE_DIR/screen_results_$(date -v-7d +%Y-%m-%d 2>/dev/null || date -d '7 days ago' +%Y-%m-%d).json" 2>/dev/null || true
    echo "→ 上周排名已备份"
fi

# Step 2: 运行Stage 2 + L6
echo "→ 运行Stage 2 + L6宏观..."
python3 scripts/screener/run_screen.py "$RAW_DIR" --stage2 --output "$OUT_DIR" 2>&1 | head -3

# Step 3: 生成变动报告
echo "→ 生成排名变动..."
python3 -c "
import json
from pathlib import Path

current = Path('$OUT_DIR/screen_results.json')
# Find most recent archive
archive_dir = Path('$ARCHIVE_DIR')
archives = sorted(archive_dir.glob('screen_results_*.json'))

if not archives:
    print('  (首次运行，无历史对比)')
else:
    with open(current) as f:
        curr = {r['symbol']: r for r in json.load(f)}
    with open(archives[-1]) as f:
        prev = {r['symbol']: r for r in json.load(f)}

    # Find rank changes
    curr_ranked = sorted(
        [(s, r.get('stage2_score') or r.get('composite_score') or 0) for s, r in curr.items() if not r.get('vetoes')],
        key=lambda x: x[1], reverse=True
    )
    prev_ranked = sorted(
        [(s, r.get('stage2_score') or r.get('composite_score') or 0) for s, r in prev.items() if not r.get('vetoes')],
        key=lambda x: x[1], reverse=True
    )

    curr_rank = {s: i+1 for i, (s, _) in enumerate(curr_ranked)}
    prev_rank = {s: i+1 for i, (s, _) in enumerate(prev_ranked)}

    # Top movers
    movers = []
    for s in curr_rank:
        if s in prev_rank:
            delta = prev_rank[s] - curr_rank[s]
            if abs(delta) >= 10:
                movers.append((s, curr_rank[s], delta))
    movers.sort(key=lambda x: -x[2])

    if movers:
        print(f'  排名变动>10位:')
        for s, rank, delta in movers[:15]:
            print(f'    {s:<6} #{rank:>3} ({delta:+d})')
    else:
        print('  (无显著排名变动)')

    # New entries in top 50
    new_top50 = [s for s, _ in curr_ranked[:50] if s not in prev_rank or prev_rank[s] > 50]
    if new_top50:
        print(f'  新进入Top 50: {\" \".join(new_top50)}')
"

# Step 4: CQI交叉
echo "→ CQI交叉分析..."
python3 scripts/screener/cqi_crossover.py 2>&1 | grep -A2 "最佳交叉"

echo ""
echo "✅ 周跑完成 — $DATE"
echo "  排名: $OUT_DIR/screen_results.json"
echo "  报告: $OUT_DIR/screen_report.txt"
echo "  交叉: $OUT_DIR/cqi_crossover.txt"
