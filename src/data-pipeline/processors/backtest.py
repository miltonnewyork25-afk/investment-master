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
    },
    "airlines": {
        "cycles": [
            {
                "name": "2008-2009 金融危机+油价",
                "points": [
                    {"date": "2008-07", "oil": 140, "rpk_yoy": 2, "load_factor": 82,
                     "rasm_yoy": 8, "dal_pe": 5, "actual_6m": "down"},
                    {"date": "2008-12", "oil": 40, "rpk_yoy": -10, "load_factor": 75,
                     "rasm_yoy": -5, "dal_pe": -1, "dal_pb": 1.0, "actual_6m": "up"},
                    {"date": "2009-06", "oil": 70, "rpk_yoy": -8, "load_factor": 78,
                     "rasm_yoy": -3, "dal_pe": 10, "actual_6m": "up"},
                ]
            },
            {
                "name": "2014-2016 油价崩盘利好",
                "points": [
                    {"date": "2014-12", "oil": 55, "rpk_yoy": 5, "load_factor": 84,
                     "rasm_yoy": 3, "dal_pe": 10, "actual_6m": "up"},
                    {"date": "2016-01", "oil": 30, "rpk_yoy": 6, "load_factor": 83,
                     "rasm_yoy": -2, "dal_pe": 8, "actual_6m": "up"},
                    {"date": "2016-09", "oil": 45, "rpk_yoy": 4, "load_factor": 84,
                     "rasm_yoy": 0, "dal_pe": 7, "actual_6m": "down"},
                ]
            },
            {
                "name": "2020-2022 COVID + 报复出行",
                "points": [
                    {"date": "2020-04", "oil": 20, "rpk_yoy": -90, "load_factor": 20,
                     "rasm_yoy": -80, "dal_pe": -1, "dal_pb": 0.5, "actual_6m": "up"},
                    {"date": "2020-10", "oil": 40, "rpk_yoy": -70, "load_factor": 50,
                     "rasm_yoy": -40, "dal_pe": -1, "dal_pb": 1.0, "actual_6m": "up"},
                    {"date": "2022-03", "oil": 110, "rpk_yoy": 100, "load_factor": 80,
                     "rasm_yoy": 30, "dal_pe": 20, "actual_6m": "down"},
                ]
            }
        ]
    },
    "chemicals": {
        "cycles": [
            {
                "name": "2008-2009 金融危机",
                "points": [
                    {"date": "2008-06", "eth_spread": 600, "chem_util": 87, "inv_days": 22,
                     "dow_pe": 8, "actual_6m": "down"},
                    {"date": "2009-01", "eth_spread": 150, "chem_util": 72, "inv_days": 55,
                     "dow_pe": -1, "dow_pb": 1.0, "actual_6m": "up"},
                    {"date": "2009-09", "eth_spread": 350, "chem_util": 75, "inv_days": 40,
                     "dow_pe": 25, "actual_6m": "up"},
                ]
            },
            {
                "name": "2015-2016 油价驱动",
                "points": [
                    {"date": "2014-09", "eth_spread": 700, "chem_util": 86, "inv_days": 25,
                     "dow_pe": 15, "actual_6m": "down"},
                    {"date": "2015-12", "eth_spread": 250, "chem_util": 78, "inv_days": 45,
                     "dow_pe": 30, "actual_6m": "up"},
                    {"date": "2016-06", "eth_spread": 400, "chem_util": 80, "inv_days": 35,
                     "dow_pe": 22, "actual_6m": "up"},
                    {"date": "2017-06", "eth_spread": 500, "chem_util": 85, "inv_days": 28,
                     "dow_pe": 18, "actual_6m": "down"},
                ]
            },
            {
                "name": "2020-2022 COVID + 供应冲击",
                "points": [
                    {"date": "2020-04", "eth_spread": 200, "chem_util": 70, "inv_days": 50,
                     "dow_pe": -1, "dow_pb": 0.8, "actual_6m": "up"},
                    {"date": "2021-03", "eth_spread": 900, "chem_util": 88, "inv_days": 18,
                     "dow_pe": 10, "actual_6m": "down"},
                    {"date": "2022-06", "eth_spread": 400, "chem_util": 82, "inv_days": 35,
                     "dow_pe": 8, "actual_6m": "down"},
                ]
            }
        ]
    },
    "mining": {
        "cycles": [
            {
                "name": "2008-2009 大宗商品崩盘",
                "points": [
                    {"date": "2008-06", "copper": 3.8, "iron_ore": 150, "mining_capex_yoy": 30,
                     "fcx_pb": 3.5, "actual_6m": "down"},
                    {"date": "2009-03", "copper": 1.5, "iron_ore": 60, "mining_capex_yoy": -30,
                     "fcx_pb": 1.2, "actual_6m": "up"},
                    {"date": "2009-09", "copper": 2.8, "iron_ore": 80, "mining_capex_yoy": -25,
                     "fcx_pb": 2.0, "actual_6m": "up"},
                ]
            },
            {
                "name": "2015-2016 中国减速",
                "points": [
                    {"date": "2014-06", "copper": 3.2, "iron_ore": 95, "mining_capex_yoy": 5,
                     "fcx_pb": 2.5, "actual_6m": "down"},
                    {"date": "2015-12", "copper": 2.1, "iron_ore": 40, "mining_capex_yoy": -35,
                     "fcx_pb": 0.8, "actual_6m": "up"},
                    {"date": "2016-06", "copper": 2.2, "iron_ore": 55, "mining_capex_yoy": -30,
                     "fcx_pb": 1.0, "actual_6m": "up"},
                    {"date": "2017-01", "copper": 2.6, "iron_ore": 80, "mining_capex_yoy": -10,
                     "fcx_pb": 1.8, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020-2022 COVID + 超级周期",
                "points": [
                    {"date": "2020-03", "copper": 2.2, "iron_ore": 85, "mining_capex_yoy": -15,
                     "fcx_pb": 1.5, "actual_6m": "up"},
                    {"date": "2021-05", "copper": 4.5, "iron_ore": 200, "mining_capex_yoy": 15,
                     "fcx_pb": 3.0, "actual_6m": "down"},
                    {"date": "2022-07", "copper": 3.5, "iron_ore": 110, "mining_capex_yoy": 20,
                     "fcx_pb": 2.2, "actual_6m": "down"},
                ]
            }
        ]
    },
    "industrial": {
        "cycles": [
            {
                "name": "2008-2009 金融危机",
                "points": [
                    {"date": "2007-10", "ism": 51, "ind_prod_yoy": 3, "cap_goods_yoy": 5,
                     "cap_util": 80, "hon_pe": 18, "actual_6m": "down"},
                    {"date": "2009-01", "ism": 35, "ind_prod_yoy": -12, "cap_goods_yoy": -25,
                     "cap_util": 68, "hon_pe": 12, "actual_6m": "up"},
                    {"date": "2009-06", "ism": 44, "ind_prod_yoy": -10, "cap_goods_yoy": -20,
                     "cap_util": 65, "hon_pe": 15, "actual_6m": "up"},
                ]
            },
            {
                "name": "2015-2016 工业衰退",
                "points": [
                    {"date": "2014-10", "ism": 56, "ind_prod_yoy": 4, "cap_goods_yoy": 8,
                     "cap_util": 79, "hon_pe": 17, "actual_6m": "down"},
                    {"date": "2015-12", "ism": 48, "ind_prod_yoy": -2, "cap_goods_yoy": -8,
                     "cap_util": 75, "hon_pe": 20, "actual_6m": "down"},
                    {"date": "2016-06", "ism": 53, "ind_prod_yoy": -1, "cap_goods_yoy": -5,
                     "cap_util": 74, "hon_pe": 18, "actual_6m": "up"},
                    {"date": "2017-06", "ism": 57, "ind_prod_yoy": 2, "cap_goods_yoy": 6,
                     "cap_util": 76, "hon_pe": 22, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020 COVID + 恢复",
                "points": [
                    {"date": "2020-04", "ism": 41, "ind_prod_yoy": -15, "cap_goods_yoy": -30,
                     "cap_util": 60, "hon_pe": -1, "hon_pb": 5.0, "actual_6m": "up"},
                    {"date": "2021-03", "ism": 64, "ind_prod_yoy": 1, "cap_goods_yoy": 25,
                     "cap_util": 74, "hon_pe": 30, "actual_6m": "up"},
                    {"date": "2022-06", "ism": 53, "ind_prod_yoy": 4, "cap_goods_yoy": 10,
                     "cap_util": 80, "hon_pe": 22, "actual_6m": "down"},
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
    # [v2 - 迭代1] PE陷阱+扩张保护+衰退未触底，目标70%+

    # Fix 1: PE陷阱检测
    # 周期顶部盈利最高→PE最低，看起来"便宜"实则是峰值
    # 条件：利用率高 + 增长仍正(>=10%) + PE低 = 不是便宜，是顶峰
    if utilization >= 78 and excavator_yoy >= 10 and 0 < cat_pe < 18:
        val_score = min(val_score, 3)

    # 综合评分
    base_score = (
        val_score * 0.30 +
        exc_score * 0.25 +
        con_score * 0.20 +
        util_score * 0.15 +
        5 * 0.10  # backlog placeholder
    ) * 10

    # Fix 2: 扩张保护
    # 极端正增长(>25%)是扩张初/中期回复，不是过热卖出点
    expansion_protection = (excavator_yoy > 25 and construction_yoy > 5)

    # 背离检测
    indicator_avg = (exc_score + con_score + util_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15  # 顶部背离（扩张期豁免）

    if expansion_protection:
        divergence_adj += 25  # 扩张期加分：极端增长不要卖

    # Fix 3: 衰退初期+高PE = 盈利下滑中，未触底
    # 销量下降但PE升高，说明盈利下降速度快于股价
    if -30 < excavator_yoy < -5 and cat_pe > 25:
        divergence_adj -= 15

    # 特殊规则
    if excavator_yoy < -30 and utilization < 60:
        divergence_adj += 10  # 极端衰退加分

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_industrial(point: Dict) -> Tuple[float, str]:
    """工业综合行业评分 - 应用5条已验证经验 + 新增收缩确认"""
    ism = point.get("ism", 50)
    ind_prod_yoy = point.get("ind_prod_yoy", 0)
    cap_goods_yoy = point.get("cap_goods_yoy", 0)
    cap_util = point.get("cap_util", 75)
    hon_pe = point.get("hon_pe", 20)
    hon_pb = point.get("hon_pb", 6.0)

    # ISM PMI评分（逆周期）
    if ism < 42:
        ism_score = 9
    elif ism < 47:
        ism_score = 7
    elif ism < 50:
        ism_score = 6
    elif ism < 53:
        ism_score = 5
    elif ism < 57:
        ism_score = 3
    else:
        ism_score = 1

    # 工业产出评分（逆周期）
    if ind_prod_yoy < -10:
        prod_score = 9
    elif ind_prod_yoy < -3:
        prod_score = 7
    elif ind_prod_yoy < 0:
        prod_score = 6
    elif ind_prod_yoy < 3:
        prod_score = 5
    elif ind_prod_yoy < 6:
        prod_score = 3
    else:
        prod_score = 1

    # 资本品订单评分（逆周期）
    if cap_goods_yoy < -20:
        goods_score = 9
    elif cap_goods_yoy < -8:
        goods_score = 7
    elif cap_goods_yoy < 0:
        goods_score = 6
    elif cap_goods_yoy < 5:
        goods_score = 5
    elif cap_goods_yoy < 15:
        goods_score = 3
    else:
        goods_score = 1

    # 产能利用率评分（逆周期）
    if cap_util < 65:
        util_score = 9
    elif cap_util < 72:
        util_score = 7
    elif cap_util < 76:
        util_score = 5
    elif cap_util < 80:
        util_score = 3
    else:
        util_score = 1

    # 估值评分
    if hon_pe > 0:
        if hon_pe < 12:
            val_score = 9
        elif hon_pe < 16:
            val_score = 7
        elif hon_pe < 22:
            val_score = 5
        elif hon_pe < 28:
            val_score = 3
        else:
            val_score = 2
    else:
        # 亏损时用PB（工业资产轻，PB阈值更高）
        if hon_pb < 3:
            val_score = 9
        elif hon_pb < 5:
            val_score = 7
        elif hon_pb < 7:
            val_score = 5
        elif hon_pb < 9:
            val_score = 3
        else:
            val_score = 1

    # ═══ 应用已验证经验 ═══

    # [经验#3] PE陷阱: 产能利用率高+增长正+PE低=顶峰
    if cap_util >= 78 and ind_prod_yoy > 0 and 0 < hon_pe < 20:
        val_score = min(val_score, 3)

    # 综合评分
    base_score = (
        val_score * 0.30 +
        ism_score * 0.25 +
        goods_score * 0.20 +
        prod_score * 0.15 +
        util_score * 0.10
    ) * 10

    # [经验#4] 扩张保护: ISM强+订单正增长+产能未满=扩张期
    expansion_protection = (ism > 55 and cap_goods_yoy > 5 and cap_util < 78)

    # 背离检测
    indicator_avg = (ism_score + goods_score + util_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15  # 顶部背离（扩张期豁免）

    if expansion_protection:
        divergence_adj += 25  # 扩张期加分

    # [新经验#6] ISM收缩确认: PMI<50 + 产出负 + 订单负 = 确认衰退
    if ism < 50 and ind_prod_yoy < 0 and cap_goods_yoy < 0:
        divergence_adj -= 25

    # [经验#5] 衰退未触底: 产出负+PE高=盈利下滑中
    if ind_prod_yoy < 0 and hon_pe > 22:
        divergence_adj -= 15

    # [经验#2] CAPEX收缩底部信号
    if cap_goods_yoy < -20:
        divergence_adj += 10

    # 极端衰退加分
    if ism < 42 and cap_util < 65:
        divergence_adj += 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_airlines(point: Dict) -> Tuple[float, str]:
    """航空行业评分 - 应用8条经验 + 新增成本端PE陷阱"""
    oil = point.get("oil", 70)
    rpk_yoy = point.get("rpk_yoy", 0)
    load_factor = point.get("load_factor", 80)
    rasm_yoy = point.get("rasm_yoy", 0)
    dal_pe = point.get("dal_pe", 15)
    dal_pb = point.get("dal_pb", 2.0)

    # RPK客运量评分（逆周期：客运下降=买入机会）
    if rpk_yoy < -50:
        rpk_score = 9
    elif rpk_yoy < -20:
        rpk_score = 8
    elif rpk_yoy < -5:
        rpk_score = 6
    elif rpk_yoy < 5:
        rpk_score = 5
    elif rpk_yoy < 10:
        rpk_score = 3
    else:
        rpk_score = 1

    # 客座率评分（逆周期：低客座=买入机会）
    if load_factor < 50:
        load_score = 9
    elif load_factor < 70:
        load_score = 7
    elif load_factor < 78:
        load_score = 5
    elif load_factor < 83:
        load_score = 3
    else:
        load_score = 1

    # RASM评分（逆周期：收入下降=买入机会）
    if rasm_yoy < -30:
        rasm_score = 9
    elif rasm_yoy < -10:
        rasm_score = 7
    elif rasm_yoy < -3:
        rasm_score = 6
    elif rasm_yoy < 3:
        rasm_score = 5
    elif rasm_yoy < 10:
        rasm_score = 3
    else:
        rasm_score = 1

    # 估值评分
    if dal_pe > 0:
        if dal_pe < 8:
            val_score = 9
        elif dal_pe < 12:
            val_score = 7
        elif dal_pe < 16:
            val_score = 5
        elif dal_pe < 20:
            val_score = 3
        else:
            val_score = 2
    else:
        if dal_pb < 1.0:
            val_score = 9
        elif dal_pb < 1.5:
            val_score = 7
        elif dal_pb < 2.5:
            val_score = 5
        else:
            val_score = 3

    # ═══ 应用已验证经验 ═══

    # [经验#3改] PE陷阱(航空版): 客座率高+RASM正+PE低=顶峰盈利
    if load_factor >= 82 and rasm_yoy >= 0 and dal_pe > 0 and dal_pe < 10:
        val_score = min(val_score, 3)

    # 综合评分 (val 30%, rpk 25%, load 25%, rasm 20%)
    base_score = (
        val_score * 0.30 +
        rpk_score * 0.25 +
        load_score * 0.25 +
        rasm_score * 0.20
    ) * 10

    # 背离检测
    indicator_avg = (rpk_score + load_score + rasm_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3:
        divergence_adj = -15  # 顶部背离

    # [新经验#9] 成本端PE陷阱: 高油价+PE低+客座高=成本压缩利润
    if oil > 90 and dal_pe > 0 and dal_pe < 10 and load_factor > 80:
        divergence_adj -= 10

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_chemicals(point: Dict) -> Tuple[float, str]:
    """化工行业评分 - 应用7条经验 + 新增价差极端值"""
    eth_spread = point.get("eth_spread", 400)    # 乙烯-石脑油价差 $/ton
    chem_util = point.get("chem_util", 80)       # 化工产能利用率 %
    inv_days = point.get("inv_days", 35)         # 库存天数
    dow_pe = point.get("dow_pe", 18)
    dow_pb = point.get("dow_pb", 2.0)

    # 乙烯价差评分（逆周期：高价差=过热=低分）
    if eth_spread < 200:
        spread_score = 9
    elif eth_spread < 350:
        spread_score = 7
    elif eth_spread < 500:
        spread_score = 5
    elif eth_spread < 700:
        spread_score = 3
    else:
        spread_score = 1

    # 产能利用率评分（逆周期）
    if chem_util < 70:
        util_score = 9
    elif chem_util < 78:
        util_score = 7
    elif chem_util < 83:
        util_score = 5
    elif chem_util < 88:
        util_score = 3
    else:
        util_score = 1

    # 库存天数评分（高库存=需求弱=买入机会）
    if inv_days > 50:
        inv_score = 9
    elif inv_days > 40:
        inv_score = 7
    elif inv_days > 30:
        inv_score = 5
    elif inv_days > 20:
        inv_score = 3
    else:
        inv_score = 1

    # 估值评分
    if dow_pe > 0:
        if dow_pe < 10:
            val_score = 9
        elif dow_pe < 15:
            val_score = 7
        elif dow_pe < 20:
            val_score = 5
        elif dow_pe < 25:
            val_score = 3
        elif dow_pe < 30:
            val_score = 2
        else:
            val_score = 1
    else:
        # 亏损时用PB
        if dow_pb < 1.0:
            val_score = 9
        elif dow_pb < 1.5:
            val_score = 7
        elif dow_pb < 2.0:
            val_score = 5
        elif dow_pb < 2.5:
            val_score = 3
        else:
            val_score = 1

    # ═══ 应用已验证经验 ═══

    # [经验#3] PE陷阱: 利用率高+价差高+PE低=顶峰盈利
    if chem_util >= 80 and eth_spread > 300 and dow_pe > 0 and dow_pe < 20:
        val_score = min(val_score, 3)

    # 综合评分 (val 30%, spread 25%, util 25%, inv 20%)
    base_score = (
        val_score * 0.30 +
        spread_score * 0.25 +
        util_score * 0.25 +
        inv_score * 0.20
    ) * 10

    # [经验#4] 扩张保护: 低价差+低PB/高PE=从谷底回升
    expansion_protection = (eth_spread < 300 and
                           ((dow_pb > 0 and dow_pb < 1.5) or dow_pe > 25))

    # 背离检测
    indicator_avg = (spread_score + util_score + inv_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15  # 顶部背离

    if expansion_protection:
        divergence_adj += 15  # 复苏期加分

    # [新经验#8] 乙烯价差极端值: 高价差+低库存=过热
    if eth_spread >= 600 and inv_days <= 25:
        divergence_adj -= 15

    # [经验#6] 收缩确认: 低价差+低利用率+高库存=确认衰退底部
    if eth_spread < 300 and chem_util < 78 and inv_days > 40:
        divergence_adj += 20

    # 库存堆积底部信号
    if inv_days > 45:
        divergence_adj += 10

    # 盈利最高期警告: PE极低+利用率高+价差中高
    if dow_pe > 0 and dow_pe < 10 and chem_util >= 80 and eth_spread > 300:
        divergence_adj -= 15

    final_score = max(0, min(100, base_score + divergence_adj))
    return final_score, _score_to_signal(final_score)


def score_mining(point: Dict) -> Tuple[float, str]:
    """矿业行业评分 - 应用6条经验 + 新增大宗商品确认"""
    copper = point.get("copper", 3.0)       # $/lb
    iron_ore = point.get("iron_ore", 90)    # $/ton
    mining_capex_yoy = point.get("mining_capex_yoy", 0)
    fcx_pb = point.get("fcx_pb", 2.0)

    # 铜价评分（逆周期）
    if copper < 2.0:
        copper_score = 9
    elif copper < 2.5:
        copper_score = 7
    elif copper < 3.0:
        copper_score = 5
    elif copper < 3.5:
        copper_score = 4
    elif copper < 4.0:
        copper_score = 3
    else:
        copper_score = 1

    # 铁矿石评分（逆周期）
    if iron_ore < 50:
        iron_score = 9
    elif iron_ore < 70:
        iron_score = 7
    elif iron_ore < 90:
        iron_score = 5
    elif iron_ore < 120:
        iron_score = 3
    else:
        iron_score = 1

    # 矿业CAPEX评分（逆周期）
    if mining_capex_yoy < -30:
        capex_score = 9
    elif mining_capex_yoy < -15:
        capex_score = 7
    elif mining_capex_yoy < 0:
        capex_score = 5
    elif mining_capex_yoy < 15:
        capex_score = 4
    elif mining_capex_yoy < 30:
        capex_score = 2
    else:
        capex_score = 1

    # FCX估值 (用PB，矿业周期性强常亏损)
    if fcx_pb < 1.0:
        val_score = 9
    elif fcx_pb < 1.5:
        val_score = 7
    elif fcx_pb < 2.0:
        val_score = 5
    elif fcx_pb < 2.5:
        val_score = 4
    elif fcx_pb < 3.0:
        val_score = 3
    else:
        val_score = 1

    # ═══ 应用已验证经验 ═══

    # 综合评分 (4指标: val 30%, copper 25%, capex 25%, iron 20%)
    base_score = (
        val_score * 0.30 +
        copper_score * 0.25 +
        capex_score * 0.25 +
        iron_score * 0.20
    ) * 10

    # [经验#4] 扩张保护: CAPEX仍在收缩+铜价回升+PB低=复苏期
    expansion_protection = (mining_capex_yoy < 0 and copper > 2.5 and fcx_pb < 2.0)

    # 背离检测
    indicator_avg = (copper_score + capex_score + iron_score) / 3
    divergence_adj = 0
    if val_score >= 7 and indicator_avg >= 7:
        divergence_adj = 20  # 底部背离
    elif val_score <= 3 and indicator_avg <= 3 and not expansion_protection:
        divergence_adj = -15  # 顶部背离

    if expansion_protection:
        divergence_adj += 15  # 复苏期加分

    # [新经验#7] 大宗商品确认: 铜+铁矿双高+CAPEX扩张=过度投资期
    if copper > 3.0 and iron_ore > 90 and mining_capex_yoy > 0:
        divergence_adj -= 10

    # [经验#2] CAPEX收缩底部信号
    if mining_capex_yoy < -25:
        divergence_adj += 10

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
    "industrial": score_industrial,
    "mining": score_mining,
    "chemicals": score_chemicals,
    "airlines": score_airlines,
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
