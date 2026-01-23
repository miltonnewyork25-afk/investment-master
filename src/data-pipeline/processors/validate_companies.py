"""
样本外验证 - 每个行业选择一家非基准公司验证框架
Company Validation Script

验证公司:
- Energy: CVX (Chevron) - 替代 XOM
- Machinery: DE (Deere) - 替代 CAT
- Industrial: EMR (Emerson) - 替代 HON
- Mining: BHP (BHP Group) - 替代 FCX
- Chemicals: LYB (LyondellBasell) - 替代 DOW
- Airlines: UAL (United Airlines) - 替代 DAL

方法: 使用相同的行业指标(WTI, rig_yoy, ISM等)，替换估值指标为新公司的PE/PB
"""

import json
import sys
import requests
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import DATA_DIR

FMP_API_KEY = "fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb"
FMP_BASE = "https://financialmodelingprep.com/api/v3"


def get_historical_key_metrics(symbol: str, period: str = "quarter") -> List[Dict]:
    """获取历史关键指标(PE/PB等)"""
    url = f"{FMP_BASE}/key-metrics/{symbol}"
    params = {"period": period, "apikey": FMP_API_KEY, "limit": 80}
    resp = requests.get(url, params=params)
    if resp.status_code == 200:
        return resp.json()
    return []


def get_historical_ratios(symbol: str, period: str = "quarter") -> List[Dict]:
    """获取历史财务比率"""
    url = f"{FMP_BASE}/ratios/{symbol}"
    params = {"period": period, "apikey": FMP_API_KEY, "limit": 80}
    resp = requests.get(url, params=params)
    if resp.status_code == 200:
        return resp.json()
    return []


def find_closest_metric(metrics: List[Dict], target_date: str, metric_key: str) -> float:
    """找到最接近目标日期的指标值"""
    from datetime import datetime as dt
    target = dt.strptime(target_date, "%Y-%m")

    best_val = None
    best_diff = float('inf')

    for m in metrics:
        try:
            d = dt.strptime(m.get("date", "")[:7], "%Y-%m")
            diff = abs((d - target).days)
            if diff < best_diff:
                val = m.get(metric_key)
                if val is not None and val != 0:
                    best_diff = diff
                    best_val = val
        except (ValueError, TypeError):
            continue

    return best_val


# ═══════════════════════════════════════════════════════════════
# 验证数据 - 使用相同行业指标 + 新公司估值
# ═══════════════════════════════════════════════════════════════

def build_validation_data(metrics_cache: Dict) -> Dict:
    """构建验证数据集 - 行业指标不变，估值用新公司"""

    validation_data = {
        "energy": {
            "company": "CVX",
            "val_metric": "pb",  # CVX用PB
            "cycles": [
                {
                    "name": "2014-2016 油价暴跌",
                    "points": [
                        {"date": "2014-06", "wti": 107, "rig_yoy": 15, "slb_pe": 22,
                         "actual_6m": "down"},
                        {"date": "2015-01", "wti": 48, "rig_yoy": -30, "slb_pe": 35,
                         "actual_6m": "down"},
                        {"date": "2016-02", "wti": 26, "rig_yoy": -60, "slb_pe": -1,
                         "actual_6m": "up"},
                        {"date": "2016-06", "wti": 48, "rig_yoy": -45, "slb_pe": -1,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2020 COVID崩盘",
                    "points": [
                        {"date": "2020-01", "wti": 60, "rig_yoy": -10, "slb_pe": 20,
                         "actual_6m": "down"},
                        {"date": "2020-04", "wti": 20, "rig_yoy": -50, "slb_pe": -1,
                         "actual_6m": "up"},
                        {"date": "2020-10", "wti": 40, "rig_yoy": -55, "slb_pe": -1,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2022 能源牛市",
                    "points": [
                        {"date": "2022-03", "wti": 130, "rig_yoy": 60, "slb_pe": 30,
                         "actual_6m": "down"},
                        {"date": "2022-06", "wti": 110, "rig_yoy": 55, "slb_pe": 25,
                         "actual_6m": "down"},
                        {"date": "2023-06", "wti": 70, "rig_yoy": -15, "slb_pe": 18,
                         "actual_6m": "sideways"},
                    ]
                }
            ]
        },
        "machinery": {
            "company": "DE",
            "val_metric": "pe",  # DE用PE
            "cycles": [
                {
                    "name": "2008-2009 金融危机",
                    "points": [
                        {"date": "2007-12", "excavator_yoy": 20, "construction_yoy": 5, "utilization": 82,
                         "actual_6m": "down"},
                        {"date": "2009-03", "excavator_yoy": -45, "construction_yoy": -15, "utilization": 50,
                         "actual_6m": "up"},
                        {"date": "2009-09", "excavator_yoy": -30, "construction_yoy": -10, "utilization": 55,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2015-2016 矿业衰退",
                    "points": [
                        {"date": "2014-09", "excavator_yoy": 10, "construction_yoy": 8, "utilization": 78,
                         "actual_6m": "down"},
                        {"date": "2015-09", "excavator_yoy": -20, "construction_yoy": -5, "utilization": 65,
                         "actual_6m": "down"},
                        {"date": "2016-01", "excavator_yoy": -25, "construction_yoy": -3, "utilization": 62,
                         "actual_6m": "up"},
                        {"date": "2017-01", "excavator_yoy": 15, "construction_yoy": 5, "utilization": 72,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2020 COVID + 2021-2022恢复",
                    "points": [
                        {"date": "2020-03", "excavator_yoy": -35, "construction_yoy": -12, "utilization": 55,
                         "actual_6m": "up"},
                        {"date": "2021-06", "excavator_yoy": 40, "construction_yoy": 10, "utilization": 80,
                         "actual_6m": "up"},
                        {"date": "2022-06", "excavator_yoy": 5, "construction_yoy": 8, "utilization": 82,
                         "actual_6m": "up"},
                    ]
                }
            ]
        },
        "industrial": {
            "company": "EMR",
            "val_metric": "pe",  # EMR用PE
            "cycles": [
                {
                    "name": "2008-2009 金融危机",
                    "points": [
                        {"date": "2007-10", "ism": 51, "ind_prod_yoy": 3, "cap_goods_yoy": 5,
                         "cap_util": 80, "actual_6m": "down"},
                        {"date": "2009-01", "ism": 35, "ind_prod_yoy": -12, "cap_goods_yoy": -25,
                         "cap_util": 68, "actual_6m": "up"},
                        {"date": "2009-06", "ism": 44, "ind_prod_yoy": -10, "cap_goods_yoy": -20,
                         "cap_util": 65, "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2015-2016 工业衰退",
                    "points": [
                        {"date": "2014-10", "ism": 56, "ind_prod_yoy": 4, "cap_goods_yoy": 8,
                         "cap_util": 79, "actual_6m": "down"},
                        {"date": "2015-12", "ism": 48, "ind_prod_yoy": -2, "cap_goods_yoy": -8,
                         "cap_util": 75, "actual_6m": "down"},
                        {"date": "2016-06", "ism": 53, "ind_prod_yoy": -1, "cap_goods_yoy": -5,
                         "cap_util": 74, "actual_6m": "up"},
                        {"date": "2017-06", "ism": 57, "ind_prod_yoy": 2, "cap_goods_yoy": 6,
                         "cap_util": 76, "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2020 COVID + 恢复",
                    "points": [
                        {"date": "2020-04", "ism": 41, "ind_prod_yoy": -15, "cap_goods_yoy": -30,
                         "cap_util": 60, "actual_6m": "up"},
                        {"date": "2021-03", "ism": 64, "ind_prod_yoy": 1, "cap_goods_yoy": 25,
                         "cap_util": 74, "actual_6m": "up"},
                        {"date": "2022-06", "ism": 53, "ind_prod_yoy": 4, "cap_goods_yoy": 10,
                         "cap_util": 80, "actual_6m": "down"},
                    ]
                }
            ]
        },
        "mining": {
            "company": "BHP",
            "val_metric": "pb",  # BHP用PB
            "cycles": [
                {
                    "name": "2008-2009 大宗商品崩盘",
                    "points": [
                        {"date": "2008-06", "copper": 3.8, "iron_ore": 150, "mining_capex_yoy": 30,
                         "actual_6m": "down"},
                        {"date": "2009-03", "copper": 1.5, "iron_ore": 60, "mining_capex_yoy": -30,
                         "actual_6m": "up"},
                        {"date": "2009-09", "copper": 2.8, "iron_ore": 80, "mining_capex_yoy": -25,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2015-2016 中国减速",
                    "points": [
                        {"date": "2014-06", "copper": 3.2, "iron_ore": 95, "mining_capex_yoy": 5,
                         "actual_6m": "down"},
                        {"date": "2015-12", "copper": 2.1, "iron_ore": 40, "mining_capex_yoy": -35,
                         "actual_6m": "up"},
                        {"date": "2016-06", "copper": 2.2, "iron_ore": 55, "mining_capex_yoy": -30,
                         "actual_6m": "up"},
                        {"date": "2017-01", "copper": 2.6, "iron_ore": 80, "mining_capex_yoy": -10,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2020-2022 COVID + 超级周期",
                    "points": [
                        {"date": "2020-03", "copper": 2.2, "iron_ore": 85, "mining_capex_yoy": -15,
                         "actual_6m": "up"},
                        {"date": "2021-05", "copper": 4.5, "iron_ore": 200, "mining_capex_yoy": 15,
                         "actual_6m": "down"},
                        {"date": "2022-07", "copper": 3.5, "iron_ore": 110, "mining_capex_yoy": 20,
                         "actual_6m": "down"},
                    ]
                }
            ]
        },
        "chemicals": {
            "company": "LYB",
            "val_metric": "pe",  # LYB用PE
            "cycles": [
                {
                    "name": "2008-2009 金融危机",
                    "points": [
                        {"date": "2008-06", "eth_spread": 600, "chem_util": 87, "inv_days": 22,
                         "actual_6m": "down"},
                        {"date": "2009-01", "eth_spread": 150, "chem_util": 72, "inv_days": 55,
                         "actual_6m": "up"},
                        {"date": "2009-09", "eth_spread": 350, "chem_util": 75, "inv_days": 40,
                         "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2015-2016 油价驱动",
                    "points": [
                        {"date": "2014-09", "eth_spread": 700, "chem_util": 86, "inv_days": 25,
                         "actual_6m": "down"},
                        {"date": "2015-12", "eth_spread": 250, "chem_util": 78, "inv_days": 45,
                         "actual_6m": "up"},
                        {"date": "2016-06", "eth_spread": 400, "chem_util": 80, "inv_days": 35,
                         "actual_6m": "up"},
                        {"date": "2017-06", "eth_spread": 500, "chem_util": 85, "inv_days": 28,
                         "actual_6m": "down"},
                    ]
                },
                {
                    "name": "2020-2022 COVID + 供应冲击",
                    "points": [
                        {"date": "2020-04", "eth_spread": 200, "chem_util": 70, "inv_days": 50,
                         "actual_6m": "up"},
                        {"date": "2021-03", "eth_spread": 900, "chem_util": 88, "inv_days": 18,
                         "actual_6m": "down"},
                        {"date": "2022-06", "eth_spread": 400, "chem_util": 82, "inv_days": 35,
                         "actual_6m": "down"},
                    ]
                }
            ]
        },
        "airlines": {
            "company": "UAL",
            "val_metric": "pe",  # UAL用PE
            "cycles": [
                {
                    "name": "2008-2009 金融危机+油价",
                    "points": [
                        {"date": "2008-07", "oil": 140, "rpk_yoy": 2, "load_factor": 82,
                         "rasm_yoy": 8, "actual_6m": "down"},
                        {"date": "2008-12", "oil": 40, "rpk_yoy": -10, "load_factor": 75,
                         "rasm_yoy": -5, "actual_6m": "up"},
                        {"date": "2009-06", "oil": 70, "rpk_yoy": -8, "load_factor": 78,
                         "rasm_yoy": -3, "actual_6m": "up"},
                    ]
                },
                {
                    "name": "2014-2016 油价崩盘利好",
                    "points": [
                        {"date": "2014-12", "oil": 55, "rpk_yoy": 5, "load_factor": 84,
                         "rasm_yoy": 3, "actual_6m": "up"},
                        {"date": "2016-01", "oil": 30, "rpk_yoy": 6, "load_factor": 83,
                         "rasm_yoy": -2, "actual_6m": "up"},
                        {"date": "2016-09", "oil": 45, "rpk_yoy": 4, "load_factor": 84,
                         "rasm_yoy": 0, "actual_6m": "down"},
                    ]
                },
                {
                    "name": "2020-2022 COVID + 报复出行",
                    "points": [
                        {"date": "2020-04", "oil": 20, "rpk_yoy": -90, "load_factor": 20,
                         "rasm_yoy": -80, "actual_6m": "up"},
                        {"date": "2020-10", "oil": 40, "rpk_yoy": -70, "load_factor": 50,
                         "rasm_yoy": -40, "actual_6m": "up"},
                        {"date": "2022-03", "oil": 110, "rpk_yoy": 100, "load_factor": 80,
                         "rasm_yoy": 30, "actual_6m": "down"},
                    ]
                }
            ]
        }
    }

    return validation_data


# ═══════════════════════════════════════════════════════════════
# 评分函数（从backtest.py复制，修改为接受通用val参数）
# ═══════════════════════════════════════════════════════════════

def _score_to_signal(score: float) -> str:
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
    if signal in ("strong_buy", "buy"):
        return actual == "up"
    elif signal == "sell":
        return actual == "down"
    else:
        return actual in ("sideways", "up")


def score_energy_val(point: Dict) -> Tuple[float, str]:
    """能源评分 - 用cvx_pb替代xom_pb"""
    wti = point.get("wti", 70)
    rig_yoy = point.get("rig_yoy", 0)
    pb = point.get("cvx_pb", 1.8)
    slb_pe = point.get("slb_pe", 18)

    if wti < 40: oil_score = 9
    elif wti < 55: oil_score = 7
    elif wti < 75: oil_score = 5
    elif wti < 95: oil_score = 3
    else: oil_score = 1

    if rig_yoy < -40: rig_score = 9
    elif rig_yoy < -20: rig_score = 7
    elif rig_yoy < 0: rig_score = 5
    elif rig_yoy < 20: rig_score = 4
    else: rig_score = 2

    # CVX PB阈值（CVX和XOM类似，同为石油巨头）
    if pb < 1.2: val_score = 9
    elif pb < 1.6: val_score = 7
    elif pb < 2.0: val_score = 5
    elif pb < 2.5: val_score = 3
    else: val_score = 1

    if slb_pe < 0: slb_score = 9
    elif slb_pe < 15: slb_score = 7
    elif slb_pe < 22: slb_score = 5
    elif slb_pe < 30: slb_score = 3
    else: slb_score = 2

    base_score = (val_score * 0.35 + oil_score * 0.25 + rig_score * 0.20 + slb_score * 0.10 + 5 * 0.10) * 10

    divergence_adj = 0
    if val_score >= 7 and oil_score <= 3:
        divergence_adj = -15
    elif val_score >= 7 and oil_score >= 7:
        # 底部背离: 只在服务商PE不极端时生效(PE>30=行业未见底)
        if slb_pe < 30 or slb_pe < 0:
            divergence_adj = 20
    if rig_yoy < -40:
        divergence_adj += 10
    # 服务商衰退确认: slb_pe极高=盈利崩塌中，行业未见底
    if slb_pe > 30 and rig_yoy < 0:
        divergence_adj -= 30
    elif slb_pe > 25 and rig_yoy < 0:
        divergence_adj -= 20
    if -20 < rig_yoy < 0 and wti > 50 and pb < 1.6:
        divergence_adj -= 25
    # 峰值油价确认: WTI>100 + rig扩张 = 绝对顶部
    if wti > 100 and rig_yoy > 10:
        divergence_adj -= 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_machinery_val(point: Dict) -> Tuple[float, str]:
    """工程机械评分 - 用de_pe替代cat_pe"""
    excavator_yoy = point.get("excavator_yoy", 0)
    construction_yoy = point.get("construction_yoy", 0)
    utilization = point.get("utilization", 70)
    pe = point.get("de_pe", 18)
    pb = point.get("de_pb", 4.0)

    if excavator_yoy < -35: exc_score = 9
    elif excavator_yoy < -20: exc_score = 8
    elif excavator_yoy < -5: exc_score = 6
    elif excavator_yoy < 10: exc_score = 5
    elif excavator_yoy < 25: exc_score = 3
    else: exc_score = 1

    if construction_yoy < -10: con_score = 8
    elif construction_yoy < -3: con_score = 6
    elif construction_yoy < 5: con_score = 5
    elif construction_yoy < 10: con_score = 4
    else: con_score = 2

    if utilization < 55: util_score = 9
    elif utilization < 65: util_score = 7
    elif utilization < 75: util_score = 5
    elif utilization < 82: util_score = 3
    else: util_score = 1

    if pe > 0:
        if pe < 12: val_score = 9
        elif pe < 16: val_score = 7
        elif pe < 22: val_score = 5
        elif pe < 30: val_score = 3
        else: val_score = 2
    else:
        if pb < 2.5: val_score = 8
        elif pb < 4.0: val_score = 5
        else: val_score = 3

    if utilization >= 78 and excavator_yoy >= 10 and 0 < pe < 18:
        val_score = min(val_score, 3)

    # 新经验#14: 高PE恢复信号 - PE>35 + 挖掘机复苏(>0) + 利用率中(60-78) = 谷底盈利的高PE，非贵
    if pe > 35 and excavator_yoy > 0 and 60 <= utilization < 78:
        val_score = max(val_score, 5)  # 至少中性

    base_score = (val_score * 0.30 + exc_score * 0.25 + con_score * 0.20 + util_score * 0.15 + 5 * 0.10) * 10

    expansion_protection = (excavator_yoy > 25 and construction_yoy > 5)
    indicator_avg = (exc_score + con_score + util_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15

    if expansion_protection:
        divergence_adj += 25
    if -30 < excavator_yoy < -5 and pe > 25:
        divergence_adj -= 15
    # 补充: 衰退确认 - 销量下降 + PE不便宜(>15) + 利用率未触极底(>63)
    # 盈利仍在下滑但股价还没跌够，需要更大跌幅才到底
    if -30 < excavator_yoy < -5 and pe > 15 and utilization > 63 and construction_yoy < 0:
        divergence_adj -= 20
    if excavator_yoy < -30 and utilization < 60:
        divergence_adj += 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_industrial_val(point: Dict) -> Tuple[float, str]:
    """工业综合评分 - 用emr_pe替代hon_pe"""
    ism = point.get("ism", 50)
    ind_prod_yoy = point.get("ind_prod_yoy", 0)
    cap_goods_yoy = point.get("cap_goods_yoy", 0)
    cap_util = point.get("cap_util", 75)
    pe = point.get("emr_pe", 20)
    pb = point.get("emr_pb", 6.0)

    if ism < 42: ism_score = 9
    elif ism < 47: ism_score = 7
    elif ism < 50: ism_score = 6
    elif ism < 53: ism_score = 5
    elif ism < 57: ism_score = 3
    else: ism_score = 1

    if ind_prod_yoy < -10: prod_score = 9
    elif ind_prod_yoy < -3: prod_score = 7
    elif ind_prod_yoy < 0: prod_score = 6
    elif ind_prod_yoy < 3: prod_score = 5
    elif ind_prod_yoy < 6: prod_score = 3
    else: prod_score = 1

    if cap_goods_yoy < -20: goods_score = 9
    elif cap_goods_yoy < -8: goods_score = 7
    elif cap_goods_yoy < 0: goods_score = 6
    elif cap_goods_yoy < 5: goods_score = 5
    elif cap_goods_yoy < 15: goods_score = 3
    else: goods_score = 1

    if cap_util < 65: util_score = 9
    elif cap_util < 72: util_score = 7
    elif cap_util < 76: util_score = 5
    elif cap_util < 80: util_score = 3
    else: util_score = 1

    if pe > 0:
        if pe < 12: val_score = 9
        elif pe < 16: val_score = 7
        elif pe < 22: val_score = 5
        elif pe < 28: val_score = 3
        else: val_score = 2
    else:
        if pb < 3: val_score = 9
        elif pb < 5: val_score = 7
        elif pb < 7: val_score = 5
        elif pb < 9: val_score = 3
        else: val_score = 1

    if cap_util >= 78 and ind_prod_yoy > 0 and 0 < pe < 20:
        val_score = min(val_score, 3)

    base_score = (val_score * 0.30 + ism_score * 0.25 + goods_score * 0.20 + prod_score * 0.15 + util_score * 0.10) * 10

    expansion_protection = (ism > 55 and cap_goods_yoy > 5 and cap_util < 78)
    indicator_avg = (ism_score + goods_score + util_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15
    if expansion_protection:
        divergence_adj += 25
    if ism < 50 and ind_prod_yoy < 0 and cap_goods_yoy < 0:
        divergence_adj -= 25
    if ind_prod_yoy < 0 and pe > 22:
        divergence_adj -= 15
    if cap_goods_yoy < -20:
        divergence_adj += 10
    if ism < 42 and cap_util < 65:
        divergence_adj += 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_mining_val(point: Dict) -> Tuple[float, str]:
    """矿业评分 - 用bhp_pb替代fcx_pb"""
    copper = point.get("copper", 3.0)
    iron_ore = point.get("iron_ore", 90)
    mining_capex_yoy = point.get("mining_capex_yoy", 0)
    pb = point.get("bhp_pb", 2.0)

    if copper < 2.0: copper_score = 9
    elif copper < 2.5: copper_score = 7
    elif copper < 3.0: copper_score = 5
    elif copper < 3.5: copper_score = 4
    elif copper < 4.0: copper_score = 3
    else: copper_score = 1

    if iron_ore < 50: iron_score = 9
    elif iron_ore < 70: iron_score = 7
    elif iron_ore < 90: iron_score = 5
    elif iron_ore < 120: iron_score = 3
    else: iron_score = 1

    if mining_capex_yoy < -30: capex_score = 9
    elif mining_capex_yoy < -15: capex_score = 7
    elif mining_capex_yoy < 0: capex_score = 5
    elif mining_capex_yoy < 15: capex_score = 4
    elif mining_capex_yoy < 30: capex_score = 2
    else: capex_score = 1

    # BHP PB阈值（BHP比FCX估值中枢偏高，但需更严格判断"便宜"）
    if pb < 1.3: val_score = 9
    elif pb < 1.7: val_score = 7
    elif pb < 2.3: val_score = 5
    elif pb < 3.0: val_score = 4
    elif pb < 4.0: val_score = 3
    else: val_score = 1

    base_score = (val_score * 0.30 + copper_score * 0.25 + capex_score * 0.25 + iron_score * 0.20) * 10

    expansion_protection = (mining_capex_yoy < 0 and copper > 2.5 and pb < 2.3)
    indicator_avg = (copper_score + capex_score + iron_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15
    if expansion_protection:
        divergence_adj += 15
    if copper > 3.0 and iron_ore > 90 and mining_capex_yoy > 0:
        divergence_adj -= 10
    if mining_capex_yoy < -25:
        divergence_adj += 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_chemicals_val(point: Dict) -> Tuple[float, str]:
    """化工评分 - 用lyb_pe替代dow_pe"""
    eth_spread = point.get("eth_spread", 400)
    chem_util = point.get("chem_util", 80)
    inv_days = point.get("inv_days", 35)
    pe = point.get("lyb_pe", 18)
    pb = point.get("lyb_pb", 2.0)

    if eth_spread < 200: spread_score = 9
    elif eth_spread < 350: spread_score = 7
    elif eth_spread < 500: spread_score = 5
    elif eth_spread < 700: spread_score = 3
    else: spread_score = 1

    if chem_util < 70: util_score = 9
    elif chem_util < 78: util_score = 7
    elif chem_util < 83: util_score = 5
    elif chem_util < 88: util_score = 3
    else: util_score = 1

    if inv_days > 50: inv_score = 9
    elif inv_days > 40: inv_score = 7
    elif inv_days > 30: inv_score = 5
    elif inv_days > 20: inv_score = 3
    else: inv_score = 1

    if pe > 0:
        if pe < 10: val_score = 9
        elif pe < 15: val_score = 7
        elif pe < 20: val_score = 5
        elif pe < 25: val_score = 3
        elif pe < 30: val_score = 2
        else: val_score = 1
    else:
        if pb < 1.0: val_score = 9
        elif pb < 1.5: val_score = 7
        elif pb < 2.0: val_score = 5
        elif pb < 2.5: val_score = 3
        else: val_score = 1

    # PE陷阱: 利用率>=82 + 价差>=400 + PE低 = 盈利顶峰
    if chem_util >= 82 and eth_spread >= 400 and pe > 0 and pe < 15:
        val_score = min(val_score, 3)

    base_score = (val_score * 0.30 + spread_score * 0.25 + util_score * 0.25 + inv_score * 0.20) * 10

    expansion_protection = (eth_spread < 300 and ((pb > 0 and pb < 1.5) or pe > 25))
    indicator_avg = (spread_score + util_score + inv_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15
    if expansion_protection:
        divergence_adj += 15
    if eth_spread >= 600 and inv_days <= 25:
        divergence_adj -= 15
    if eth_spread < 300 and chem_util < 78 and inv_days > 40:
        divergence_adj += 20
    if inv_days > 45:
        divergence_adj += 10
    # 盈利顶峰警告: PE极低 + 利用率高 + 价差中高 = 盈利高峰即将回落
    if pe > 0 and pe < 10 and chem_util >= 82 and eth_spread >= 400:
        divergence_adj -= 15

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_airlines_val(point: Dict) -> Tuple[float, str]:
    """航空评分 - 用ual_pe替代dal_pe"""
    oil = point.get("oil", 70)
    rpk_yoy = point.get("rpk_yoy", 0)
    load_factor = point.get("load_factor", 80)
    rasm_yoy = point.get("rasm_yoy", 0)
    pe = point.get("ual_pe", 15)
    pb = point.get("ual_pb", 2.0)

    if rpk_yoy < -50: rpk_score = 9
    elif rpk_yoy < -20: rpk_score = 8
    elif rpk_yoy < -5: rpk_score = 6
    elif rpk_yoy < 5: rpk_score = 5
    elif rpk_yoy < 10: rpk_score = 3
    else: rpk_score = 1

    if load_factor < 50: load_score = 9
    elif load_factor < 70: load_score = 7
    elif load_factor < 78: load_score = 5
    elif load_factor < 83: load_score = 3
    else: load_score = 1

    if rasm_yoy < -30: rasm_score = 9
    elif rasm_yoy < -10: rasm_score = 7
    elif rasm_yoy < -3: rasm_score = 6
    elif rasm_yoy < 3: rasm_score = 5
    elif rasm_yoy < 10: rasm_score = 3
    else: rasm_score = 1

    # 极端PE无效化: PE>100视为无意义(微利)，用PB
    if pe > 100 or pe <= 0:
        if pb < 1.0: val_score = 9
        elif pb < 1.5: val_score = 7
        elif pb < 2.5: val_score = 5
        else: val_score = 3
    else:
        if pe < 8: val_score = 9
        elif pe < 12: val_score = 7
        elif pe < 16: val_score = 5
        elif pe < 20: val_score = 3
        else: val_score = 2

    if load_factor >= 82 and rasm_yoy >= 0 and 0 < pe < 10:
        val_score = min(val_score, 3)

    base_score = (val_score * 0.30 + rpk_score * 0.25 + load_score * 0.25 + rasm_score * 0.20) * 10

    indicator_avg = (rpk_score + load_score + rasm_score) / 3
    divergence_adj = 0

    # PE极端时(>50或亏损)，不使用背离惩罚（PE无参考意义，PB对航空业也不准确）
    pe_meaningful = (0 < pe <= 50)

    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20
    elif val_score <= 3 and indicator_avg <= 3 and pe_meaningful:
        divergence_adj = -15
    # 成本端PE陷阱扩展: 亏损(PE<0) + 高油价 + 高客座 = 成本压垮盈利
    if oil > 90 and load_factor > 80:
        if pe <= 0 or (0 < pe < 10):
            divergence_adj -= 15
    # 低成本首次盈利保护: 油价低 + 客座高 + RPK增长 + PE极端(首次盈利/微利)
    if oil < 60 and load_factor > 82 and rpk_yoy > 0 and not pe_meaningful:
        divergence_adj += 25

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


VALIDATION_SCORE_FUNCTIONS = {
    "energy": score_energy_val,
    "machinery": score_machinery_val,
    "industrial": score_industrial_val,
    "mining": score_mining_val,
    "chemicals": score_chemicals_val,
    "airlines": score_airlines_val,
}

VAL_KEY_MAP = {
    "energy": ("cvx_pb", "pb"),
    "machinery": ("de_pe", "pe"),
    "industrial": ("emr_pe", "pe"),
    "mining": ("bhp_pb", "pb"),
    "chemicals": ("lyb_pe", "pe"),
    "airlines": ("ual_pe", "pe"),
}

PB_KEY_MAP = {
    "machinery": "de_pb",
    "industrial": "emr_pb",
    "chemicals": "lyb_pb",
    "airlines": "ual_pb",
}


def fetch_company_valuations():
    """从FMP API获取各公司历史估值数据"""
    companies = ["CVX", "DE", "EMR", "BHP", "LYB", "UAL"]
    all_data = {}

    for symbol in companies:
        print(f"  Fetching {symbol} key metrics...")
        metrics = get_historical_key_metrics(symbol, "quarter")
        ratios = get_historical_ratios(symbol, "quarter")
        all_data[symbol] = {"metrics": metrics, "ratios": ratios}
        print(f"    Got {len(metrics)} quarters of metrics, {len(ratios)} quarters of ratios")

    return all_data


def inject_valuations(validation_data: Dict, company_data: Dict) -> Dict:
    """将FMP获取的估值数据注入到验证数据点中"""

    symbol_map = {
        "energy": "CVX",
        "machinery": "DE",
        "industrial": "EMR",
        "mining": "BHP",
        "chemicals": "LYB",
        "airlines": "UAL",
    }

    for industry, data in validation_data.items():
        symbol = symbol_map[industry]
        val_key, val_type = VAL_KEY_MAP[industry]
        pb_key = PB_KEY_MAP.get(industry)

        metrics = company_data.get(symbol, {}).get("metrics", [])
        ratios = company_data.get(symbol, {}).get("ratios", [])

        for cycle in data["cycles"]:
            for point in cycle["points"]:
                date = point["date"]

                if val_type == "pb":
                    pb_val = find_closest_metric(metrics, date, "pbRatio")
                    if pb_val is None:
                        pb_val = find_closest_metric(ratios, date, "priceToBookRatio")
                    if pb_val and pb_val > 0:
                        point[val_key] = round(pb_val, 2)
                    else:
                        print(f"    [WARN] {symbol} PB not found for {date}, using default")
                        point[val_key] = 1.8
                else:
                    pe_val = find_closest_metric(metrics, date, "peRatio")
                    if pe_val is None:
                        pe_val = find_closest_metric(ratios, date, "priceEarningsRatio")
                    if pe_val and pe_val > 0:
                        point[val_key] = round(pe_val, 1)
                    else:
                        point[val_key] = -1

                    # 始终获取PB作为备用（PE无效时需要）
                    if pb_key:
                        pb_val = find_closest_metric(metrics, date, "pbRatio")
                        if pb_val is None:
                            pb_val = find_closest_metric(ratios, date, "priceToBookRatio")
                        if pb_val and pb_val > 0:
                            point[pb_key] = round(pb_val, 2)

    return validation_data


def run_validation(validation_data: Dict) -> Dict:
    """运行验证回测"""
    results = {}
    all_pass = True

    for industry, data in validation_data.items():
        company = data["company"]
        score_fn = VALIDATION_SCORE_FUNCTIONS[industry]

        print(f"\n{'─' * 50}")
        print(f"[{industry.upper()}] - {company}")
        print(f"{'─' * 50}")

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

                val_key = VAL_KEY_MAP[industry][0]
                val_val = point.get(val_key, "N/A")

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
                        "actual": actual,
                        "val": val_val
                    })

                print(f"    [{mark}] {point['date']}: {val_key}={val_val} score={score:.1f} signal={signal} actual={actual}")

        accuracy = round(correct / total * 100, 1) if total > 0 else 0
        passed = accuracy >= 70.0

        print(f"  结果: {correct}/{total} = {accuracy}% {'PASS' if passed else 'FAIL'}")

        if not passed:
            all_pass = False

        results[industry] = {
            "company": company,
            "accuracy": accuracy,
            "total": total,
            "correct": correct,
            "passed": passed,
            "errors": errors
        }

    return results, all_pass


def main():
    print("=" * 60)
    print("样本外验证 - 非基准公司框架验证")
    print("CVX / DE / EMR / BHP / LYB / UAL")
    print("=" * 60)

    # Step 1: 获取FMP数据
    print("\n[Step 1] 获取FMP估值数据...")
    company_data = fetch_company_valuations()

    # Step 2: 构建验证数据
    print("\n[Step 2] 构建验证数据集...")
    validation_data = build_validation_data(company_data)

    # Step 3: 注入估值
    print("\n[Step 3] 注入公司估值...")
    validation_data = inject_valuations(validation_data, company_data)

    # Step 4: 运行验证
    print("\n[Step 4] 运行验证回测...")
    results, all_pass = run_validation(validation_data)

    # 总结
    print(f"\n{'═' * 60}")
    print("VALIDATION SUMMARY")
    print(f"{'═' * 60}")
    for ind, res in results.items():
        status = "PASS" if res["passed"] else "FAIL"
        print(f"  [{status}] {ind} ({res['company']}): {res['accuracy']}% ({res['correct']}/{res['total']})")
        if res["errors"]:
            for e in res["errors"]:
                print(f"         {e['date']}: signal={e['signal']} actual={e['actual']} val={e['val']}")

    print(f"\nOverall: {'ALL PASS' if all_pass else 'NEEDS WORK'}")

    # 保存结果
    results_dir = DATA_DIR / "backtest"
    results_dir.mkdir(parents=True, exist_ok=True)
    filepath = results_dir / f"validation_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False, default=str)
    print(f"\n[SAVED] {filepath}")

    return results, all_pass


if __name__ == "__main__":
    results, all_pass = main()
    sys.exit(0 if all_pass else 1)
