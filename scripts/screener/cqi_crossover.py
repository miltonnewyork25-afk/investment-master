#!/usr/bin/env python3
"""
CQI × 低估股筛选器交叉分析 v1.0

核心问题: 哪些高品质公司(CQI高)当前可能被低估(筛选得分高)?
这是"便宜+好"的交叉信号 — 投资者最想找的东西。

输入:
  - data/screener/screen_results.json (筛选结果)
  - knowledge/stock_picking/cqi_public_ranking_v4.0.md (CQI排行榜)
输出:
  - 交叉分析报告 (终端输出 + 文件)
"""

import json
from pathlib import Path

# CQI v4.0 排行榜数据 (39家, 从 cqi_public_ranking_v4.0.md 提取)
CQI_DATA = {
    "CPRT": {"cqi": 82, "rank": 1, "trend": "↗", "tag": "双边拍卖网络 + 不可复制的土地银行"},
    "SPGI": {"cqi": 74, "rank": 2, "trend": "→", "tag": "Basel III锁定的评级双寡头"},
    "FICO": {"cqi": 72, "rank": 3, "trend": "↓", "tag": "制度垄断定价权释放中"},
    "MCO":  {"cqi": 70, "rank": 4, "trend": "→", "tag": "评级双寡头MIS印钞机OPM 60%+"},
    "MSFT": {"cqi": 67, "rank": 5, "trend": "→", "tag": "企业操作系统垄断"},
    "GOOGL":{"cqi": 66, "rank": 6, "trend": "↗", "tag": "知识入口收费站"},
    "ASML": {"cqi": 59, "rank": 7, "trend": "→", "tag": "光刻机独此一家"},
    "COST": {"cqi": 59, "rank": 8, "trend": "↗", "tag": "故意不赚商品的钱"},
    "META": {"cqi": 58, "rank": 9, "trend": "→", "tag": "39亿人的行为数据库"},
    "AMZN": {"cqi": 56, "rank": 10, "trend": "↗", "tag": "三引擎飞轮无敌手"},
    "IDXX": {"cqi": 56, "rank": 11, "trend": "→", "tag": "装了设备就离不开"},
    "AAPL": {"cqi": 55, "rank": 12, "trend": "↘", "tag": "最深消费生态"},
    "V":    {"cqi": 53, "rank": 13, "trend": "↘", "tag": "全球最大支付网络"},
    "KLAC": {"cqi": 52, "rank": 14, "trend": "↗", "tag": "良率的隐形守门人"},
    "CTAS": {"cqi": 51, "rank": 15, "trend": "→", "tag": "每多一层锁定翻倍"},
    "ARM":  {"cqi": 49, "rank": 16, "trend": "↓", "tag": "半导体隐形税"},
    "NVDA": {"cqi": 48, "rank": 17, "trend": "→", "tag": "CUDA生态短期加深"},
    "ICE":  {"cqi": 47, "rank": 18, "trend": "→", "tag": "流动性网络效应+NYSE品牌"},
    "PG":   {"cqi": 47, "rank": 19, "trend": "↘", "tag": "69年连续加分红"},
    "ETN":  {"cqi": 46, "rank": 20, "trend": "↑", "tag": "电气化的卖铲人"},
    "TSM":  {"cqi": 45, "rank": 21, "trend": "→", "tag": "最不可替代的公司"},
    "AVGO": {"cqi": 44, "rank": 22, "trend": "→", "tag": "并购之王"},
    "LRCX": {"cqi": 43, "rank": 23, "trend": "↘", "tag": "温水煮青蛙"},
    "ANET": {"cqi": 42, "rank": 24, "trend": "↑", "tag": "数据中心交换之王"},
    "CSGP": {"cqi": 41, "rank": 25, "trend": "→", "tag": "商业地产数据垄断"},
    "AMAT": {"cqi": 41, "rank": 26, "trend": "→", "tag": "设备产品线最宽"},
    "PLTR": {"cqi": 39, "rank": 27, "trend": "↗", "tag": "Ontology锁定在加深"},
    "DPZ":  {"cqi": 36, "rank": 28, "trend": "→", "tag": "最大披萨递送网络"},
    "CMG":  {"cqi": 35, "rank": 29, "trend": "→", "tag": "卷饼流水线最快"},
    "SBUX": {"cqi": 33, "rank": 30, "trend": "↓", "tag": "品牌溢价受损"},
    "VRT":  {"cqi": 30, "rank": 31, "trend": "↗", "tag": "NVIDIA合作加深液冷"},
    "ROL":  {"cqi": 30, "rank": 32, "trend": "→", "tag": "害虫防治密度经济"},
    "FAST": {"cqi": 25, "rank": 33, "trend": "→", "tag": "品质好但没品味"},
    "MAR":  {"cqi": 21, "rank": 34, "trend": "→", "tag": "最多酒店品牌"},
    "HLT":  {"cqi": 21, "rank": 35, "trend": "↗", "tag": "开店之王"},
    "RCL":  {"cqi": 16, "rank": 36, "trend": "↗", "tag": "私有目的地扩张"},
    "INTC": {"cqi": 14, "rank": 37, "trend": "⇊", "tag": "CHIPS Act兜底防破产"},
    "IHG":  {"cqi": 11, "rank": 38, "trend": "→", "tag": "真实利润率被报表藏住"},
    "SMCI": {"cqi": 8,  "rank": 39, "trend": "↓", "tag": "组装商宿命锁定利润天花板"},
}


def load_screen_results(path="data/screener/screen_results.json"):
    with open(path) as f:
        return json.load(f)


def crossover_analysis(screen_results, cqi_data):
    """交叉分析: 筛选结果 × CQI排行榜"""

    # Build lookup
    screen_map = {}
    for r in screen_results:
        if not r.get('vetoes'):
            screen_map[r['symbol']] = r

    # Find overlaps
    overlaps = []
    for sym in cqi_data:
        if sym in screen_map:
            s = screen_map[sym]
            c = cqi_data[sym]
            overlaps.append({
                'symbol': sym,
                'cqi': c['cqi'],
                'cqi_rank': c['rank'],
                'cqi_trend': c['trend'],
                'cqi_tag': c['tag'],
                'screen_score': s['composite_score'],
                'l1': s['l1_score'],
                'l2': s['l2_score'],
                'l3': s['l3_score'],
                'f_score': s['f_score'],
                'ev_ebitda': s.get('ev_ebitda'),
                'fcf_yield': s.get('fcf_yield'),
                'sector': s.get('sector', ''),
                # Combined metric: CQI × Screen (normalized)
                'cross_score': (c['cqi'] / 100) * (s['composite_score'] / 10) * 10,
            })

    overlaps.sort(key=lambda x: x['cross_score'], reverse=True)

    # Stocks in CQI but NOT screened as cheap
    cqi_not_screened = [sym for sym in cqi_data if sym not in screen_map]

    # Stocks screened as cheap but NOT in CQI (unknown quality)
    screened_not_cqi = [sym for sym in screen_map if sym not in cqi_data]

    return overlaps, cqi_not_screened, screened_not_cqi


def format_report(overlaps, cqi_not_screened, screened_not_cqi, cqi_data, screen_map):
    lines = []

    lines.append("=" * 80)
    lines.append("  CQI × 低估股筛选 交叉分析报告")
    lines.append("  " + "=" * 76)
    lines.append("")

    # Section 1: Golden Cross — High CQI + Cheap
    lines.append("━" * 80)
    lines.append("  一、黄金交叉: 高品质 + 可能便宜 (最有价值的信号)")
    lines.append("━" * 80)
    lines.append("")

    if overlaps:
        lines.append(f"  {'Symbol':<6} {'CQI':>4} {'趋势':>4} {'筛选':>5} {'L1':>5} {'L2':>5} {'L3':>5} {'交叉':>5}  标签")
        lines.append(f"  {'-'*74}")
        for o in overlaps:
            lines.append(
                f"  {o['symbol']:<6} {o['cqi']:>4} {o['cqi_trend']:>4} "
                f"{o['screen_score']:>5.1f} {o['l1']:>5.1f} {o['l2']:>5.1f} {o['l3']:>5.1f} "
                f"{o['cross_score']:>5.1f}  {o['cqi_tag']}"
            )
        lines.append("")
        lines.append(f"  交叉得分 = (CQI/100) × (筛选分/10) × 10")
        lines.append(f"  解读: 交叉得分越高 = 品质越好 + 越便宜 = 越值得深入研究")
    else:
        lines.append("  (无交叉 — CQI覆盖的39家公司均未出现在低估筛选中)")

    lines.append("")

    # Section 2: CQI高分但不便宜
    lines.append("━" * 80)
    lines.append("  二、高品质但不便宜 (CQI覆盖但未入选低估筛选)")
    lines.append("━" * 80)
    lines.append("")
    lines.append(f"  含义: 这些公司品质好但当前估值偏高。可放入观察名单等待回调。")
    lines.append("")

    # Sort by CQI
    not_screened_sorted = sorted(cqi_not_screened, key=lambda s: cqi_data[s]['cqi'], reverse=True)
    for sym in not_screened_sorted[:20]:
        c = cqi_data[sym]
        lines.append(f"  {sym:<6} CQI={c['cqi']:>2} {c['trend']}  {c['tag']}")

    if len(not_screened_sorted) > 20:
        lines.append(f"  ... 和 {len(not_screened_sorted) - 20} 家更多")
    lines.append("")

    # Section 3: Cheap but unknown quality
    lines.append("━" * 80)
    lines.append("  三、便宜但品质未知 (筛选入选但不在CQI覆盖范围)")
    lines.append("━" * 80)
    lines.append("")
    lines.append(f"  含义: 可能是价值陷阱，也可能是CQI尚未覆盖的好公司。需要进一步研究。")
    lines.append("")

    unknown_sorted = sorted(screened_not_cqi,
                           key=lambda s: screen_map[s]['composite_score'], reverse=True)
    for sym in unknown_sorted[:15]:
        s = screen_map[sym]
        lines.append(
            f"  {sym:<6} 筛选={s['composite_score']:.1f} "
            f"L1={s['l1_score']:.1f} L2={s['l2_score']:.1f} F={s['f_score'] or 'N/A'} "
            f"  {s.get('sector', '')}"
        )
    lines.append("")

    # Section 4: Key insights
    lines.append("━" * 80)
    lines.append("  四、关键洞见")
    lines.append("━" * 80)
    lines.append("")

    if overlaps:
        best = overlaps[0]
        lines.append(f"  1. 最佳交叉信号: {best['symbol']} (CQI={best['cqi']}, 筛选={best['screen_score']:.1f})")
        lines.append(f"     → {best['cqi_tag']}")
        lines.append("")

    # Count by category
    lines.append(f"  2. 覆盖统计:")
    lines.append(f"     CQI覆盖: {len(cqi_data)}家")
    lines.append(f"     筛选通过: {len(screen_map)}家")
    lines.append(f"     交叉重叠: {len(overlaps)}家")
    lines.append(f"     高品质不便宜: {len(cqi_not_screened)}家")
    lines.append(f"     便宜品质未知: {len(screened_not_cqi)}家")
    lines.append("")

    if overlaps:
        # Trend analysis
        strengthening = [o for o in overlaps if o['cqi_trend'] in ('↑', '↗')]
        weakening = [o for o in overlaps if o['cqi_trend'] in ('↓', '↘', '⇊')]

        if strengthening:
            lines.append(f"  3. 交叉中护城河在加强的: {', '.join(o['symbol'] for o in strengthening)}")
            lines.append(f"     → 品质在变好+可能便宜 = 最值得研究")

        if weakening:
            lines.append(f"  4. 交叉中护城河在减弱的: {', '.join(o['symbol'] for o in weakening)}")
            lines.append(f"     → 便宜可能是因为市场正确定价了品质下降")

    lines.append("")
    lines.append("=" * 80)
    return "\n".join(lines)


def main():
    screen_results = load_screen_results()
    screen_map = {}
    for r in screen_results:
        if not r.get('vetoes'):
            screen_map[r['symbol']] = r

    overlaps, cqi_not_screened, screened_not_cqi = crossover_analysis(
        screen_results, CQI_DATA
    )

    report = format_report(overlaps, cqi_not_screened, screened_not_cqi, CQI_DATA, screen_map)
    print(report)

    # Save
    out = Path("data/screener/cqi_crossover.txt")
    with open(out, 'w') as f:
        f.write(report)
    print(f"\nSaved to {out}")


if __name__ == "__main__":
    main()
