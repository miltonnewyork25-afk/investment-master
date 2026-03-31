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

# CQI v7.0 排行榜数据 (54家, 44因子框架含C7自维持性, 2026-03-25)
# 源: cqi_leaderboard.md v1.5 + cqi_public_ranking_v7.0.md
CQI_DATA = {
    "CPRT": {"cqi": 90, "rank": 1,  "trend": "↗", "c7": 5,   "tag": "双边拍卖网络 + 不可复制的土地银行，唯一反周期的垄断者"},
    "CME":  {"cqi": 89, "rank": 2,  "trend": "→", "c7": 5,   "tag": "定义什么是衍生品市场——定义型垄断+Core PE被GAAP掩盖"},
    "VRSN": {"cqi": 75, "rank": 3,  "trend": "→", "c7": 5,   "tag": ".com独占运营权+合同7%提价+929人运营$1.66B"},
    "SPGI": {"cqi": 75, "rank": 4,  "trend": "→", "c7": 5,   "tag": "Basel III锁定的评级双寡头，定价权尚未充分释放"},
    "MCO":  {"cqi": 70, "rank": 5,  "trend": "→", "c7": 5,   "tag": "评级双寡头MIS印钞机OPM 60%+，MA增长是关键变量"},
    "MSCI": {"cqi": 69, "rank": 6,  "trend": "→", "c7": 5,   "tag": "资本市场铸币局, C1定义型嵌入(>50年), 品质已定价"},
    "FICO": {"cqi": 69, "rank": 7,  "trend": "↓", "c7": 4,   "tag": "制度垄断定价权释放中，但制度本身正在被打开"},
    "MSFT": {"cqi": 69, "rank": 8,  "trend": "→", "c7": 3,   "tag": "企业操作系统垄断，但AI军备赛在吃利润"},
    "GOOGL":{"cqi": 68, "rank": 9,  "trend": "↗", "c7": 3,   "tag": "知识入口收费站，Gemini生态全线铺开"},
    "AMZN": {"cqi": 67, "rank": 10, "trend": "↗", "c7": 2.5, "tag": "三引擎飞轮无敌手，但$200B CapEx是信仰测试"},
    "COST": {"cqi": 66, "rank": 11, "trend": "↗", "c7": 4.5, "tag": "故意不赚商品的钱，会员续费率93%且基数仍在增长"},
    "IDXX": {"cqi": 66, "rank": 12, "trend": "→", "c7": 4,   "tag": "装了设备就离不开的兽医诊断耗材机器"},
    "META": {"cqi": 62, "rank": 13, "trend": "→", "c7": 3,   "tag": "39亿人的行为数据库，广告靶向无敌手"},
    "KLAC": {"cqi": 61, "rank": 14, "trend": "↑", "c7": 4,   "tag": "良率的隐形守门人，芯片越小越离不开"},
    "AAPL": {"cqi": 59, "rank": 15, "trend": "↘", "c7": 3.5, "tag": "最深消费生态，但监管在拆围墙花园"},
    "INTU": {"cqi": 57, "rank": 16, "trend": "↘", "c7": 3,   "tag": "SMB金融操作系统+税务数据锁定，但AI降低报税壁垒"},
    "ASML": {"cqi": 56, "rank": 17, "trend": "→", "c7": 3.5, "tag": "光刻机独此一家，全人类最精密的瓶颈"},
    "CTAS": {"cqi": 56, "rank": 18, "trend": "→", "c7": 4,   "tag": "制服+地垫+急救，每多一层锁定翻倍"},
    "V":    {"cqi": 55, "rank": 19, "trend": "↘", "c7": 4,   "tag": "全球最大支付网络，但监管压费率+实时支付在崛起"},
    "ADBE": {"cqi": 53, "rank": 20, "trend": "↘", "c7": 2.5, "tag": "创意软件行业标准，但AI降低创作门槛"},
    "ETN":  {"cqi": 53, "rank": 21, "trend": "↑", "c7": 3.5, "tag": "电气化浪潮的卖铲人，数据中心电力需求爆发"},
    "ANET": {"cqi": 52, "rank": 22, "trend": "↑", "c7": 2,   "tag": "AI后端网络需求爆发，但客户高度集中"},
    "ICE":  {"cqi": 51, "rank": 23, "trend": "→", "c7": 4.5, "tag": "流动性网络效应+NYSE品牌"},
    "DXCM": {"cqi": 50, "rank": 24, "trend": "↗", "c7": 2.5, "tag": "CGM精度金标准+耗材锁定，非周期医疗需求"},
    "NVDA": {"cqi": 49, "rank": 25, "trend": "→", "c7": 2,   "tag": "CUDA生态短期加深，但自研芯片长期威胁"},
    "PGR":  {"cqi": 49, "rank": 26, "trend": "↗", "c7": 3.5, "tag": "Snapshot数据护城河+精算优势，市占率加速扩张"},
    "AVGO": {"cqi": 47, "rank": 27, "trend": "→", "c7": 2.5, "tag": "并购之王，但SBC在悄悄稀释你"},
    "CSGP": {"cqi": 47, "rank": 28, "trend": "→", "c7": 4,   "tag": "商业地产数据垄断，但Homes.com豪赌吞噬一切"},
    "FTNT": {"cqi": 47, "rank": 29, "trend": "↗", "c7": 2,   "tag": "FortiASIC成本优势+FortiOS统一平台，安全需持续创新"},
    "AMAT": {"cqi": 46, "rank": 30, "trend": "→", "c7": 3,   "tag": "设备产品线最宽，但广度不等于定价权"},
    "APP":  {"cqi": 45, "rank": 31, "trend": "↗", "c7": 1.5, "tag": "AXON数据引擎OPM 76%，但护城河需持续ML创新"},
    "PG":   {"cqi": 44, "rank": 32, "trend": "↘", "c7": 4,   "tag": "69年连续加分红，但私牌渗透率在持续上升"},
    "PLTR": {"cqi": 44, "rank": 33, "trend": "↗", "c7": 2,   "tag": "Ontology锁定在加深(AIP扩张)，但SBC和估值是两道深沟"},
    "LRCX": {"cqi": 43, "rank": 34, "trend": "↘", "c7": 2.5, "tag": "蚀刻三巨头之一，份额在缓慢流失——温水煮青蛙"},
    "PTC":  {"cqi": 43, "rank": 35, "trend": "↘", "c7": 3,   "tag": "五层制度嵌入保护40%ARR，但平台分3.25"},
    "ROL":  {"cqi": 42, "rank": 36, "trend": "→", "c7": 4,   "tag": "害虫防治密度经济，利润十一年零增长"},
    "ARM":  {"cqi": 41, "rank": 37, "trend": "↓", "c7": 3,   "tag": "半导体隐形税，但RISC-V正在逐市场侵蚀"},
    "CRM":  {"cqi": 41, "rank": 38, "trend": "↘", "c7": 2.5, "tag": "SaaS生态标准但NRR不公开，定价权剪刀差"},
    "TSM":  {"cqi": 41, "rank": 39, "trend": "→", "c7": 2.5, "tag": "技术领先在扩大，但地缘政治风险不减"},
    "DPZ":  {"cqi": 41, "rank": 40, "trend": "→", "c7": 4,   "tag": "最大披萨递送网络，价值定位限制提价"},
    "VRT":  {"cqi": 38, "rank": 41, "trend": "↗", "c7": 2,   "tag": "NVIDIA合作加深液冷先发优势，但每代平台可重新洗牌"},
    "CMG":  {"cqi": 37, "rank": 42, "trend": "→", "c7": 3,   "tag": "卷饼流水线最快，但没有客户锁定"},
    "BKNG": {"cqi": 35, "rank": 43, "trend": "→", "c7": 3,   "tag": "最大OTA双边市场，ROIC 51%但旅游强周期D1=0.70"},
    "FAST": {"cqi": 34, "rank": 44, "trend": "→", "c7": 4,   "tag": "品质好但没品味，锁定渠道不锁定价格"},
    "SBUX": {"cqi": 31, "rank": 45, "trend": "↓", "c7": 2,   "tag": "中国瑞幸竞争+OPM崩至个位数+品牌溢价受损"},
    "PYPL": {"cqi": 27, "rank": 46, "trend": "↓", "c7": 1.5, "tag": "ROIC 33%但护城河在萎缩——身份模糊+品牌checkout净收缩"},
    "LULU": {"cqi": 24, "rank": 47, "trend": "↓", "c7": 2,   "tag": "ROIC 23%以IPO最低PE交易，品牌侵蚀+CEO空缺"},
    "UNH":  {"cqi": 22, "rank": 48, "trend": "↘", "c7": 3.5, "tag": "覆盖1.5亿人的医疗基础设施，但高C1低B4=监管限制变现"},
    "HLT":  {"cqi": 17, "rank": 49, "trend": "↗", "c7": 3.5, "tag": "开店之王NUG行业最高，但NUG降一个点估值变七倍"},
    "IHG":  {"cqi": 17, "rank": 50, "trend": "→", "c7": 3.5, "tag": "真实利润率被报表藏住，周期是命门"},
    "MAR":  {"cqi": 15, "rank": 51, "trend": "→", "c7": 3.5, "tag": "最多酒店品牌，但被HLT的速度遮住了光"},
    "INTC": {"cqi": 12, "rank": 52, "trend": "⇊", "c7": 1,   "tag": "CHIPS Act兜底防破产，但多市场份额同时下降"},
    "RCL":  {"cqi": 11, "rank": 53, "trend": "↗", "c7": 2,   "tag": "私有目的地扩张+OPM创纪录，但建立在周期顶部"},
    "SMCI": {"cqi": 10, "rank": 54, "trend": "↓", "c7": 1,   "tag": "毛利率从18%→6%持续下滑，组装商宿命锁定利润天花板"},
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
