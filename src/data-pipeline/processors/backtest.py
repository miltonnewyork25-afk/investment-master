"""
Backtest Runner - 周期投资框架回测工具

用途：对行业评分逻辑进行历史回测，验证准确率
用法：python backtest.py [industry]  # 默认回测所有行业

由 Ralph Loop 驱动迭代：
1. Ralph Loop 调用此脚本检查准确率
2. 如果 <70%：Claude 修改评分逻辑后重新运行
3. 如果 >=70%：进入下一个行业
"""

import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import DATA_DIR

# 阈值
MIN_ACCURACY = 70.0

# ═══════════════════════════════════════════════════════════════
# 历史回测数据（已知的周期转折点）
# ═══════════════════════════════════════════════════════════════

BACKTEST_DATA = {
    "energy": {
        "cycles": [
            {
                "name": "2014-2016 油价暴跌",
                "points": [
                    {"date": "2014-06", "wti": 107, "rig_yoy": 15, "xom_pb": 2.3, "slb_pe": 22,
                     "actual_6m": "down"},
                    {"date": "2015-01", "wti": 48, "rig_yoy": -30, "xom_pb": 2.0, "slb_pe": 35,
                     "actual_6m": "down"},
                    {"date": "2016-02", "wti": 26, "rig_yoy": -60, "xom_pb": 1.8, "slb_pe": -1,
                     "actual_6m": "up"},
                    {"date": "2016-06", "wti": 48, "rig_yoy": -45, "xom_pb": 2.0, "slb_pe": -1,
                     "actual_6m": "up"},
                ]
            },
            {
                "name": "2020 COVID崩盘",
                "points": [
                    {"date": "2020-01", "wti": 60, "rig_yoy": -10, "xom_pb": 1.5, "slb_pe": 20,
                     "actual_6m": "down"},
                    {"date": "2020-04", "wti": 20, "rig_yoy": -50, "xom_pb": 1.0, "slb_pe": -1,
                     "actual_6m": "up"},
                    {"date": "2020-10", "wti": 40, "rig_yoy": -55, "xom_pb": 1.2, "slb_pe": -1,
                     "actual_6m": "up"},
                ]
            },
            {
                "name": "2022 能源牛市",
                "points": [
                    {"date": "2022-03", "wti": 130, "rig_yoy": 60, "xom_pb": 2.2, "slb_pe": 30,
                     "actual_6m": "down"},
                    {"date": "2022-06", "wti": 110, "rig_yoy": 55, "xom_pb": 2.3, "slb_pe": 25,
                     "actual_6m": "down"},
                    {"date": "2023-06", "wti": 70, "rig_yoy": -15, "xom_pb": 1.8, "slb_pe": 18,
                     "actual_6m": "sideways"},
                ]
            }
        ]
    },
    "machinery": {
        "cycles": [
            {
                "name": "2008-2009 金融危机",
                "points": [
                    {"date": "2007-12", "excavator_yoy": 20, "construction_yoy": 5, "utilization": 82,
                     "cat_pe": 15, "actual_6m": "down"},
                    {"date": "2009-03", "excavator_yoy": -45, "construction_yoy": -15, "utilization": 50,
                     "cat_pe": -1, "cat_pb": 1.8, "actual_6m": "up"},
                    {"date": "2009-09", "excavator_yoy": -30, "construction_yoy": -10, "utilization": 55,
                     "cat_pe": 25, "actual_6m": "up"},
                ]
            },
            {
                "name": "2015-2016 矿业衰退",
                "points": [
                    {"date": "2014-09", "excavator_yoy": 10, "construction_yoy": 8, "utilization": 78,
                     "cat_pe": 16, "actual_6m": "down"},
                    {"date": "2015-09", "excavator_yoy": -20, "construction_yoy": -5, "utilization": 65,
                     "cat_pe": 30, "actual_6m": "down"},
                    {"date": "2016-01", "excavator_yoy": -25, "construction_yoy": -3, "utilization": 62,
                     "cat_pe": 35, "cat_pb": 3.5, "actual_6m": "up"},
                    {"date": "2017-01", "excavator_yoy": 15, "construction_yoy": 5, "utilization": 72,
                     "cat_pe": 22, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020 COVID + 2021-2022恢复",
                "points": [
                    {"date": "2020-03", "excavator_yoy": -35, "construction_yoy": -12, "utilization": 55,
                     "cat_pe": 18, "cat_pb": 4.0, "actual_6m": "up"},
                    {"date": "2021-06", "excavator_yoy": 40, "construction_yoy": 10, "utilization": 80,
                     "cat_pe": 25, "actual_6m": "up"},
                    {"date": "2022-06", "excavator_yoy": 5, "construction_yoy": 8, "utilization": 82,
                     "cat_pe": 15, "actual_6m": "up"},
                ]
            }
        ]
    }
}


# ═══════════════════════════════════════════════════════════════
# 评分函数（这些是 Ralph Loop 需要迭代修改的核心逻辑）
# ═══════════════════════════════════════════════════════════════

def score_energy(point: Dict) -> Tuple[float, str]:
    """能源行业评分"""
    wti = point.get("wti", 70)
    rig_yoy = point.get("rig_yoy", 0)
    xom_pb = point.get("xom_pb", 1.8)

    # 油价评分（逆周期）
    if wti < 40:
        oil_score = 9
    elif wti < 55:
        oil_score = 7
    elif wti < 75:
        oil_score = 5
    elif wti < 95:
        oil_score = 3
    else:
        oil_score = 1

    # 钻机数评分（逆周期）
    if rig_yoy < -40:
        rig_score = 9
    elif rig_yoy < -20:
        rig_score = 7
    elif rig_yoy < 0:
        rig_score = 5
    elif rig_yoy < 20:
        rig_score = 4
    else:
        rig_score = 2

    # 估值评分（XOM用PB）
    if xom_pb < 1.2:
        val_score = 9
    elif xom_pb < 1.6:
        val_score = 7
    elif xom_pb < 2.0:
        val_score = 5
    elif xom_pb < 2.5:
        val_score = 3
    else:
        val_score = 1

    # 综合评分
    base_score = (
        val_score * 0.35 +
        oil_score * 0.25 +
        rig_score * 0.20 +
        5 * 0.10 +
        5 * 0.10
    ) * 10

    # 背离检测
    divergence_adj = 0
    if val_score >= 7 and oil_score <= 3:
        divergence_adj = -15  # 顶部背离
    elif val_score >= 7 and oil_score >= 7:
        divergence_adj = 20   # 底部背离

    if rig_yoy < -40:
        divergence_adj += 10  # CAPEX大幅收缩

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_machinery(point: Dict) -> Tuple[float, str]:
    """工程机械行业评分 - 由 Ralph Loop 迭代改进"""
    excavator_yoy = point.get("excavator_yoy", 0)
    construction_yoy = point.get("construction_yoy", 0)
    utilization = point.get("utilization", 70)
    cat_pe = point.get("cat_pe", 18)
    cat_pb = point.get("cat_pb", 4.0)

    # 挖掘机销量评分（逆周期）
    if excavator_yoy < -35:
        exc_score = 9
    elif excavator_yoy < -20:
        exc_score = 8
    elif excavator_yoy < -5:
        exc_score = 6
    elif excavator_yoy < 10:
        exc_score = 5
    elif excavator_yoy < 25:
        exc_score = 3
    else:
        exc_score = 1

    # 建筑支出评分（逆周期）
    if construction_yoy < -10:
        con_score = 8
    elif construction_yoy < -3:
        con_score = 6
    elif construction_yoy < 5:
        con_score = 5
    elif construction_yoy < 10:
        con_score = 4
    else:
        con_score = 2

    # 利用率评分（逆周期）
    if utilization < 55:
        util_score = 9
    elif utilization < 65:
        util_score = 7
    elif utilization < 75:
        util_score = 5
    elif utilization < 82:
        util_score = 3
    else:
        util_score = 1

    # 估值评分
    if cat_pe > 0:
        if cat_pe < 12:
            val_score = 9
        elif cat_pe < 16:
            val_score = 7
        elif cat_pe < 22:
            val_score = 5
        elif cat_pe < 30:
            val_score = 3
        else:
            val_score = 2
    else:
        # 亏损时用PB
        if cat_pb < 2.5:
            val_score = 8
        elif cat_pb < 4.0:
            val_score = 5
        else:
            val_score = 3

    # ═══ 以下为 Ralph Loop 迭代改进区域 ═══
    # [v1 - 初始版本] 无特殊规则，准确率60%

    # 综合评分
    base_score = (
        val_score * 0.30 +
        exc_score * 0.25 +
        con_score * 0.20 +
        util_score * 0.15 +
        5 * 0.10  # backlog placeholder
    ) * 10

    # 背离检测
    indicator_avg = (exc_score + con_score + util_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3:
        divergence_adj = -15  # 顶部背离

    # 特殊规则
    if excavator_yoy < -30 and utilization < 60:
        divergence_adj += 10  # 极端衰退加分

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def _score_to_signal(score: float) -> str:
    """分数转信号"""
    if score >= 75:
        return "strong_buy"
    elif score >= 60:
        return "buy"
    elif score >= 45:
        return "neutral"
    elif score >= 35:
        return "watch"
    else:
        return "sell"


def check_signal(signal: str, actual: str) -> bool:
    """检查信号是否正确"""
    if signal in ("strong_buy", "buy"):
        return actual == "up"
    elif signal == "sell":
        return actual == "down"
    else:  # neutral/watch/hold
        return actual in ("sideways", "up")


# ═══════════════════════════════════════════════════════════════
# 回测执行
# ═══════════════════════════════════════════════════════════════

SCORE_FUNCTIONS = {
    "energy": score_energy,
    "machinery": score_machinery,
}


def run_backtest(industry: str) -> Dict:
    """对单个行业执行回测"""
    if industry not in BACKTEST_DATA:
        print(f"  [SKIP] {industry}: 无回测数据")
        return {"industry": industry, "accuracy": 0, "total": 0, "errors": []}

    score_fn = SCORE_FUNCTIONS.get(industry)
    if not score_fn:
        print(f"  [SKIP] {industry}: 无评分函数")
        return {"industry": industry, "accuracy": 0, "total": 0, "errors": []}

    data = BACKTEST_DATA[industry]
    total = 0
    correct = 0
    errors = []

    for cycle in data["cycles"]:
        print(f"  {cycle['name']}")
        for point in cycle["points"]:
            total += 1
            score, signal = score_fn(point)
            actual = point["actual_6m"]
            is_correct = check_signal(signal, actual)

            if is_correct:
                correct += 1
                mark = "OK"
            else:
                mark = "FAIL"
                errors.append({
                    "date": point["date"],
                    "cycle": cycle["name"],
                    "score": round(score, 1),
                    "signal": signal,
                    "actual": actual
                })

            print(f"    [{mark}] {point['date']}: score={score:.1f} signal={signal} actual={actual}")

    accuracy = round(correct / total * 100, 1) if total > 0 else 0
    passed = accuracy >= MIN_ACCURACY

    print(f"  结果: {correct}/{total} = {accuracy}% {'PASS' if passed else 'FAIL'}")
    return {
        "industry": industry,
        "accuracy": accuracy,
        "total": total,
        "correct": correct,
        "passed": passed,
        "errors": errors
    }


def main():
    """主入口"""
    # 解析参数
    industries = sys.argv[1:] if len(sys.argv) > 1 else list(BACKTEST_DATA.keys())

    print("=" * 60)
    print("Backtest Runner - 周期投资框架回测")
    print(f"目标准确率: {MIN_ACCURACY}%")
    print("=" * 60)

    results = {}
    all_pass = True

    for industry in industries:
        print(f"\n{'─' * 50}")
        print(f"[{industry.upper()}]")
        print(f"{'─' * 50}")
        result = run_backtest(industry)
        results[industry] = result
        if not result.get("passed", False):
            all_pass = False

    # 总结
    print(f"\n{'═' * 60}")
    print("SUMMARY")
    print(f"{'═' * 60}")
    for ind, res in results.items():
        status = "PASS" if res.get("passed") else "FAIL"
        print(f"  [{status}] {ind}: {res['accuracy']}%")
        if res.get("errors"):
            for e in res["errors"]:
                print(f"         {e['date']}: signal={e['signal']} actual={e['actual']}")

    print(f"\nOverall: {'ALL PASS' if all_pass else 'NEEDS WORK'}")

    # 保存结果
    results_dir = DATA_DIR / "backtest"
    results_dir.mkdir(parents=True, exist_ok=True)
    filepath = results_dir / f"backtest_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False, default=str)
    print(f"\n[SAVED] {filepath}")

    # 返回退出码
    sys.exit(0 if all_pass else 1)


if __name__ == "__main__":
    main()
