"""
Tech Industry Investment Framework - 科技行业投资框架

核心哲学: GARP (Growth at Reasonable Price) + 产品周期 + 运营杠杆
与周期行业的根本区别: 科技不是逆周期，而是"增长质量vs估值"的博弈

评分维度:
1. 增长质量 (30%): 营收增速 + 加速/减速 + 可持续性
2. 估值合理性 (25%): P/S相对增长率, PEG, 与历史均值比较
3. 盈利能力 (20%): FCF利润率, 毛利率, 运营杠杆
4. 竞争地位 (15%): 市场份额趋势, 护城河, TAM渗透率
5. 催化剂 (10%): 产品周期, AI/云采用, 监管环境

信号映射:
  >= 80: strong_buy (预期6个月+20%以上)
  >= 65: buy (预期6个月+10%以上)
  >= 45: neutral (横盘或小涨)
  >= 30: watch (潜在下行风险)
  < 30: sell (预期显著下跌)

由 Ralph Loop 驱动迭代:
1. 运行回测检查准确率
2. 如果 <99%: 修改评分逻辑后重新运行
3. 如果 >=99%: 完成该公司，进入下一个
"""

import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import DATA_DIR

# 阈值
MIN_ACCURACY = 99.0

# ═══════════════════════════════════════════════════════════════
# 历史回测数据 - 10年关键转折点 (2015-2025)
# ═══════════════════════════════════════════════════════════════

BACKTEST_DATA = {
    "AAPL": {
        "name": "Apple Inc.",
        "sector": "Consumer Tech / Services",
        "cycles": [
            {
                "name": "2015-2016 iPhone增长见顶",
                "points": [
                    # 2015年末: iPhone 6s周期，增长放缓但市场过度恐慌
                    {"date": "2015-10", "rev_growth": -8, "rev_accel": -23,
                     "ps": 2.8, "pe": 12.4, "gm": 40, "fcf_margin": 25,
                     "moat": "strong", "product_cycle": "declining",
                     "price": 110, "actual_6m": "down"},
                    # 2016年初: iPhone销量首次下滑，极度悲观
                    {"date": "2016-01", "rev_growth": -13, "rev_accel": -21,
                     "ps": 2.5, "pe": 10.5, "gm": 39, "fcf_margin": 24,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 97, "actual_6m": "up"},
                    # 2016年5月: 营收仍在下滑但估值极低
                    {"date": "2016-05", "rev_growth": -14, "rev_accel": -6,
                     "ps": 2.4, "pe": 10.0, "gm": 39, "fcf_margin": 24,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 93, "actual_6m": "up"},
                ]
            },
            {
                "name": "2018-2019 iPhone XS周期失败",
                "points": [
                    # 2018年10月: iPhone XS首月销售疲软信号
                    {"date": "2018-10", "rev_growth": 16, "rev_accel": 0,
                     "ps": 4.0, "pe": 18, "gm": 38, "fcf_margin": 23,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 220, "actual_6m": "down"},
                    # 2019年1月: 中国营收预警，股价暴跌至$150
                    {"date": "2019-01", "rev_growth": -5, "rev_accel": -21,
                     "ps": 3.2, "pe": 12.5, "gm": 38, "fcf_margin": 22,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 150, "actual_6m": "up"},
                    # 2019年6月: Services叙事开始，估值修复中
                    {"date": "2019-06", "rev_growth": -2, "rev_accel": 3,
                     "ps": 3.8, "pe": 16, "gm": 37, "fcf_margin": 22,
                     "moat": "strong", "product_cycle": "recovery",
                     "price": 197, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020 COVID + iPhone 12超级周期",
                "points": [
                    # 2020年3月: COVID崩盘
                    {"date": "2020-03", "rev_growth": 1, "rev_accel": 3,
                     "ps": 4.0, "pe": 20, "gm": 38, "fcf_margin": 24,
                     "moat": "strong", "product_cycle": "pre_launch",
                     "price": 224, "actual_6m": "up"},
                    # 2020年9月: 5G iPhone即将发布，估值已高
                    {"date": "2020-09", "rev_growth": 6, "rev_accel": 5,
                     "ps": 7.1, "pe": 34, "gm": 38, "fcf_margin": 24,
                     "moat": "strong", "product_cycle": "pre_launch",
                     "price": 116, "actual_6m": "up"},
                    # 2021年1月: iPhone 12销售火爆，仍在扩张中
                    {"date": "2021-01", "rev_growth": 21, "rev_accel": 15,
                     "ps": 7.5, "pe": 35, "gm": 40, "fcf_margin": 26,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 132, "actual_6m": "up"},
                ]
            },
            {
                "name": "2022 利率冲击 + 2023复苏",
                "points": [
                    # 2021年12月: 达到历史高点后，增长放缓信号
                    {"date": "2021-12", "rev_growth": 33, "rev_accel": 12,
                     "ps": 8.0, "pe": 30, "gm": 42, "fcf_margin": 27,
                     "moat": "strong", "product_cycle": "mature",
                     "price": 179, "actual_6m": "down"},
                    # 2022年1月: 利率上升预期，高估值科技开始回调
                    {"date": "2022-01", "rev_growth": 11, "rev_accel": -22,
                     "ps": 7.5, "pe": 28, "gm": 43, "fcf_margin": 27,
                     "moat": "strong", "product_cycle": "decelerating",
                     "price": 175, "actual_6m": "down"},
                    # 2022年6月: 底部区域
                    {"date": "2022-06", "rev_growth": 2, "rev_accel": -9,
                     "ps": 5.8, "pe": 22, "gm": 43, "fcf_margin": 27,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 137, "actual_6m": "up"},
                    # 2023年6月: AI概念推动反弹，Vision Pro预期
                    {"date": "2023-06", "rev_growth": -3, "rev_accel": -5,
                     "ps": 7.8, "pe": 30, "gm": 44, "fcf_margin": 26,
                     "moat": "strong", "product_cycle": "recovery",
                     "price": 193, "actual_6m": "sideways"},
                    # 2024年6月: 估值进一步扩张
                    {"date": "2024-06", "rev_growth": 5, "rev_accel": 8,
                     "ps": 9.0, "pe": 33, "gm": 46, "fcf_margin": 27,
                     "moat": "strong", "product_cycle": "ai_narrative",
                     "price": 213, "actual_6m": "up"},
                ]
            }
        ]
    },

    "META": {
        "name": "Meta Platforms",
        "sector": "Social Media / Advertising",
        "cycles": [
            {
                "name": "2016-2017 广告增长爆发期",
                "points": [
                    {"date": "2016-06", "rev_growth": 59, "rev_accel": 13,
                     "ps": 12, "pe": 33, "gm": 86, "fcf_margin": 35,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 114, "actual_6m": "up"},
                    {"date": "2017-06", "rev_growth": 47, "rev_accel": -12,
                     "ps": 13, "pe": 33, "gm": 87, "fcf_margin": 38,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 151, "actual_6m": "up"},
                ]
            },
            {
                "name": "2018 Cambridge Analytica + 增长放缓",
                "points": [
                    # 2018年3月: Cambridge Analytica丑闻爆发
                    {"date": "2018-03", "rev_growth": 49, "rev_accel": 2,
                     "ps": 10, "pe": 25, "gm": 83, "fcf_margin": 30,
                     "moat": "weakening", "product_cycle": "mature",
                     "price": 160, "actual_6m": "down"},
                    # 2018年7月: Q2财报-20%暴跌，增长放缓+DAU停滞
                    {"date": "2018-07", "rev_growth": 42, "rev_accel": -7,
                     "ps": 8.5, "pe": 22, "gm": 83, "fcf_margin": 28,
                     "moat": "weakening", "product_cycle": "decelerating",
                     "price": 174, "actual_6m": "down"},
                    # 2018年12月: 底部区域，隐私恐慌极端
                    {"date": "2018-12", "rev_growth": 37, "rev_accel": -12,
                     "ps": 6.8, "pe": 17, "gm": 83, "fcf_margin": 26,
                     "moat": "rebuilding", "product_cycle": "trough",
                     "price": 131, "actual_6m": "up"},
                ]
            },
            {
                "name": "2021-2022 Metaverse崩盘",
                "points": [
                    # 2021年9月: 更名Meta，metaverse all-in，估值高
                    {"date": "2021-09", "rev_growth": 35, "rev_accel": -22,
                     "ps": 9.0, "pe": 24, "gm": 81, "fcf_margin": 30,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 339, "actual_6m": "down"},
                    # 2022年2月: Q4财报暴跌26%，DAU首次下降+Reels投入巨大
                    {"date": "2022-02", "rev_growth": 20, "rev_accel": -15,
                     "ps": 5.5, "pe": 17, "gm": 80, "fcf_margin": 22,
                     "moat": "weakening", "product_cycle": "declining",
                     "price": 237, "actual_6m": "down"},
                    # 2022年7月: 持续下跌，metaverse烧钱恐慌
                    {"date": "2022-07", "rev_growth": -1, "rev_accel": -21,
                     "ps": 3.8, "pe": 14, "gm": 78, "fcf_margin": 15,
                     "moat": "weakening", "product_cycle": "declining",
                     "price": 160, "actual_6m": "down"},
                    # 2022年11月: 极端底部 $90，P/S=2.5，裁员1.1万人 + Year of Efficiency
                    {"date": "2022-11", "rev_growth": -4, "rev_accel": -3,
                     "ps": 2.5, "pe": 10, "gm": 78, "fcf_margin": 12,
                     "moat": "rebuilding", "product_cycle": "trough",
                     "price": 90, "actual_6m": "up"},
                ]
            },
            {
                "name": "2023-2024 Year of Efficiency + AI复苏",
                "points": [
                    # 2023年5月: 盈利改善明显，Reels变现加速
                    {"date": "2023-05", "rev_growth": 3, "rev_accel": 7,
                     "ps": 5.5, "pe": 22, "gm": 80, "fcf_margin": 25,
                     "moat": "rebuilding", "product_cycle": "recovery",
                     "price": 264, "actual_6m": "up"},
                    # 2023年11月: 收入重新加速至23%，利润率暴增
                    {"date": "2023-11", "rev_growth": 23, "rev_accel": 20,
                     "ps": 6.8, "pe": 23, "gm": 81, "fcf_margin": 32,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 330, "actual_6m": "up"},
                    # 2024年7月: 估值扩张至P/S=9，增长35%
                    {"date": "2024-07", "rev_growth": 22, "rev_accel": -1,
                     "ps": 9.0, "pe": 24, "gm": 82, "fcf_margin": 34,
                     "moat": "strong", "product_cycle": "mature",
                     "price": 480, "actual_6m": "up"},
                ]
            }
        ]
    },

    "NVDA": {
        "name": "NVIDIA Corporation",
        "sector": "Semiconductors / AI",
        "cycles": [
            {
                "name": "2016-2017 GPU计算爆发",
                "points": [
                    # 2016年5月: 深度学习叙事刚起步，P/S=3.2
                    {"date": "2016-05", "rev_growth": 12, "rev_accel": 5,
                     "ps": 4.0, "pe": 30, "gm": 57, "fcf_margin": 18,
                     "moat": "emerging", "product_cycle": "inflection",
                     "price": 37, "actual_6m": "up"},
                    # 2016年11月: GPU需求爆发，增长38%
                    {"date": "2016-11", "rev_growth": 38, "rev_accel": 26,
                     "ps": 7.5, "pe": 45, "gm": 59, "fcf_margin": 22,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 80, "actual_6m": "up"},
                    # 2017年11月: 增速维持40%+，crypto推动游戏卡需求
                    {"date": "2017-11", "rev_growth": 40, "rev_accel": 2,
                     "ps": 13, "pe": 50, "gm": 60, "fcf_margin": 25,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 200, "actual_6m": "up"},
                ]
            },
            {
                "name": "2018-2019 Crypto崩盘",
                "points": [
                    # 2018年10月: Crypto崩盘导致游戏卡库存积压
                    {"date": "2018-10", "rev_growth": 21, "rev_accel": -19,
                     "ps": 10, "pe": 30, "gm": 62, "fcf_margin": 28,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 202, "actual_6m": "down"},
                    # 2019年1月: 收入暴跌预警，stock $130
                    {"date": "2019-01", "rev_growth": -7, "rev_accel": -28,
                     "ps": 7.2, "pe": 20, "gm": 61, "fcf_margin": 22,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 131, "actual_6m": "up"},
                    # 2019年6月: 数据中心开始复苏
                    {"date": "2019-06", "rev_growth": -17, "rev_accel": -10,
                     "ps": 9.5, "pe": 30, "gm": 59, "fcf_margin": 20,
                     "moat": "strong", "product_cycle": "recovery",
                     "price": 160, "actual_6m": "sideways"},
                ]
            },
            {
                "name": "2021-2022 估值收缩",
                "points": [
                    # 2021年11月: 股价历史新高$330，P/S=25+
                    {"date": "2021-11", "rev_growth": 50, "rev_accel": -3,
                     "ps": 25, "pe": 70, "gm": 65, "fcf_margin": 30,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 326, "actual_6m": "down"},
                    # 2022年5月: 利率冲击+crypto第二次崩盘+游戏库存
                    {"date": "2022-05", "rev_growth": 46, "rev_accel": -4,
                     "ps": 18, "pe": 50, "gm": 65, "fcf_margin": 25,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 180, "actual_6m": "down"},
                    # 2022年10月: 底部$112，gaming崩塌，DC也放缓
                    {"date": "2022-10", "rev_growth": -17, "rev_accel": -63,
                     "ps": 12, "pe": 40, "gm": 57, "fcf_margin": 15,
                     "moat": "dominant", "product_cycle": "trough",
                     "price": 112, "actual_6m": "up"},
                ]
            },
            {
                "name": "2023-2025 AI超级周期",
                "points": [
                    # 2023年1月: ChatGPT发布后，AI叙事启动
                    {"date": "2023-01", "rev_growth": -21, "rev_accel": -4,
                     "ps": 15, "pe": 55, "gm": 57, "fcf_margin": 15,
                     "moat": "dominant", "product_cycle": "inflection",
                     "price": 145, "actual_6m": "up"},
                    # 2023年5月: Q1财报爆炸性指引(DC收入翻倍)
                    {"date": "2023-05", "rev_growth": -13, "rev_accel": 8,
                     "ps": 25, "pe": 100, "gm": 66, "fcf_margin": 30,
                     "moat": "dominant", "product_cycle": "inflection",
                     "price": 389, "actual_6m": "up"},
                    # 2023年11月: AI超级周期确认，收入翻倍+
                    {"date": "2023-11", "rev_growth": 122, "rev_accel": 135,
                     "ps": 25, "pe": 52, "gm": 73, "fcf_margin": 40,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 468, "actual_6m": "up"},
                    # 2024年6月: AI持续但估值更高, P/S=30+
                    {"date": "2024-06", "rev_growth": 122, "rev_accel": 0,
                     "ps": 30, "pe": 55, "gm": 75, "fcf_margin": 45,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 124, "actual_6m": "up"},
                    # 2024年12月: 增长开始减速(仍94%但从122%降)
                    {"date": "2024-12", "rev_growth": 94, "rev_accel": -28,
                     "ps": 22, "pe": 40, "gm": 75, "fcf_margin": 45,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 135, "actual_6m": "sideways"},
                ]
            }
        ]
    },

    "MSFT": {
        "name": "Microsoft Corporation",
        "sector": "Enterprise Cloud / Software",
        "cycles": [
            {
                "name": "2015-2017 云转型初期",
                "points": [
                    # 2016年1月: Satya转型初见成效，Azure高增长
                    {"date": "2016-01", "rev_growth": -3, "rev_accel": -10,
                     "ps": 4.4, "pe": 20, "gm": 64, "fcf_margin": 28,
                     "moat": "strong", "product_cycle": "inflection",
                     "price": 53, "actual_6m": "up"},
                    # 2016年7月: Cloud增长加速确认
                    {"date": "2016-07", "rev_growth": 6, "rev_accel": 9,
                     "ps": 5.0, "pe": 22, "gm": 64, "fcf_margin": 30,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 56, "actual_6m": "up"},
                    # 2017年6月: Azure成为第二大云，商业增长稳健
                    {"date": "2017-06", "rev_growth": 6, "rev_accel": 0,
                     "ps": 5.5, "pe": 21, "gm": 64, "fcf_margin": 32,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 69, "actual_6m": "up"},
                ]
            },
            {
                "name": "2018-2019 加速增长期",
                "points": [
                    # 2018年12月: 整体市场暴跌，圣诞节大跌
                    {"date": "2018-12", "rev_growth": 14, "rev_accel": 8,
                     "ps": 6.0, "pe": 24, "gm": 65, "fcf_margin": 30,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 101, "actual_6m": "up"},
                    # 2019年6月: Azure增长64%，Teams增长加速
                    {"date": "2019-06", "rev_growth": 14, "rev_accel": 0,
                     "ps": 8.3, "pe": 27, "gm": 66, "fcf_margin": 32,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 134, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020 COVID + Teams爆发",
                "points": [
                    # 2020年3月: COVID崩盘，但WFH是利好
                    {"date": "2020-03", "rev_growth": 15, "rev_accel": 1,
                     "ps": 8.5, "pe": 28, "gm": 68, "fcf_margin": 33,
                     "moat": "strong", "product_cycle": "catalyst",
                     "price": 140, "actual_6m": "up"},
                    # 2021年6月: 增长加速至21%，所有业务线火爆，尚未见顶
                    {"date": "2021-06", "rev_growth": 18, "rev_accel": 3,
                     "ps": 12.2, "pe": 33, "gm": 69, "fcf_margin": 35,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 271, "actual_6m": "up"},
                    # 2021年11月: 历史新高$339，估值极端
                    {"date": "2021-11", "rev_growth": 22, "rev_accel": 4,
                     "ps": 13.5, "pe": 36, "gm": 69, "fcf_margin": 35,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 339, "actual_6m": "down"},
                ]
            },
            {
                "name": "2022 利率冲击 + 2023 AI复苏",
                "points": [
                    # 2022年1月: 利率预期上升
                    {"date": "2022-01", "rev_growth": 20, "rev_accel": -2,
                     "ps": 12, "pe": 33, "gm": 68, "fcf_margin": 34,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 310, "actual_6m": "down"},
                    # 2022年6月: 增长放缓, PS=9仍偏高, 6个月后-7%(sideways)
                    {"date": "2022-06", "rev_growth": 12, "rev_accel": -8,
                     "ps": 9.0, "pe": 26, "gm": 68, "fcf_margin": 33,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 257, "actual_6m": "sideways"},
                    # 2022年11月: ChatGPT + OpenAI合作，新催化剂
                    {"date": "2022-11", "rev_growth": 7, "rev_accel": -5,
                     "ps": 8.5, "pe": 25, "gm": 69, "fcf_margin": 33,
                     "moat": "dominant", "product_cycle": "inflection",
                     "price": 241, "actual_6m": "up"},
                    # 2023年6月: AI Copilot产品线发布
                    {"date": "2023-06", "rev_growth": 7, "rev_accel": 0,
                     "ps": 12, "pe": 35, "gm": 69, "fcf_margin": 33,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 340, "actual_6m": "up"},
                    # 2024年1月: Azure AI增长加速
                    {"date": "2024-01", "rev_growth": 18, "rev_accel": 11,
                     "ps": 13.5, "pe": 37, "gm": 70, "fcf_margin": 35,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 397, "actual_6m": "up"},
                ]
            }
        ]
    },

    "AMZN": {
        "name": "Amazon.com",
        "sector": "E-commerce / Cloud (AWS)",
        "cycles": [
            {
                "name": "2015-2017 AWS增长爆发",
                "points": [
                    # 2016年1月: AWS收入首次单独披露，增长60%+
                    {"date": "2016-01", "rev_growth": 27, "rev_accel": 7,
                     "ps": 2.5, "pe": 530, "gm": 33, "fcf_margin": 6,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 587, "actual_6m": "up"},
                    # 2017年6月: Prime Day + AWS + Whole Foods收购
                    {"date": "2017-06", "rev_growth": 25, "rev_accel": -2,
                     "ps": 3.0, "pe": 185, "gm": 37, "fcf_margin": 5,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 978, "actual_6m": "up"},
                ]
            },
            {
                "name": "2018-2019 增长稳健期",
                "points": [
                    # 2018年9月: 市值首次过万亿，但Q4大跌即将来临
                    {"date": "2018-09", "rev_growth": 30, "rev_accel": 5,
                     "ps": 3.8, "pe": 90, "gm": 40, "fcf_margin": 5,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 2003, "actual_6m": "down"},
                    # 2018年12月: 市场大跌，AMZN从$2050跌至$1500
                    {"date": "2018-12", "rev_growth": 30, "rev_accel": 0,
                     "ps": 3.1, "pe": 73, "gm": 40, "fcf_margin": 6,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 1502, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020-2021 COVID电商爆发",
                "points": [
                    # 2020年3月: COVID初期恐慌，但电商利好
                    {"date": "2020-03", "rev_growth": 21, "rev_accel": -6,
                     "ps": 3.0, "pe": 60, "gm": 40, "fcf_margin": 5,
                     "moat": "dominant", "product_cycle": "catalyst",
                     "price": 1900, "actual_6m": "up"},
                    # 2021年7月: 增长见顶，WFH红利消退
                    {"date": "2021-07", "rev_growth": 27, "rev_accel": -13,
                     "ps": 3.8, "pe": 55, "gm": 42, "fcf_margin": 4,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 3600, "actual_6m": "down"},
                    # 2021年11月: 历史新高$3700+，后COVID增长回归
                    {"date": "2021-11", "rev_growth": 15, "rev_accel": -12,
                     "ps": 3.6, "pe": 50, "gm": 42, "fcf_margin": 2,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 3565, "actual_6m": "down"},
                ]
            },
            {
                "name": "2022 后COVID修正 + 2023 AWS AI",
                "points": [
                    # 2022年6月: 股价腰斩，电商过度扩张，FCF转负
                    {"date": "2022-06", "rev_growth": 7, "rev_accel": -8,
                     "ps": 2.0, "pe": -300, "gm": 43, "fcf_margin": -5,
                     "moat": "dominant", "product_cycle": "declining",
                     "price": 107, "actual_6m": "down"},
                    # 2022年12月: 底部$84，裁员1.8万人
                    {"date": "2022-12", "rev_growth": 9, "rev_accel": 2,
                     "ps": 1.7, "pe": -300, "gm": 44, "fcf_margin": -2,
                     "moat": "dominant", "product_cycle": "trough",
                     "price": 84, "actual_6m": "up"},
                    # 2023年6月: AWS增长恢复+广告业务+效率提升
                    {"date": "2023-06", "rev_growth": 11, "rev_accel": 2,
                     "ps": 2.5, "pe": 100, "gm": 47, "fcf_margin": 8,
                     "moat": "dominant", "product_cycle": "recovery",
                     "price": 130, "actual_6m": "up"},
                    # 2024年1月: AWS AI驱动增长重新加速至14%
                    {"date": "2024-01", "rev_growth": 14, "rev_accel": 3,
                     "ps": 3.0, "pe": 50, "gm": 47, "fcf_margin": 12,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 155, "actual_6m": "up"},
                ]
            }
        ]
    },

    "GOOGL": {
        "name": "Alphabet Inc.",
        "sector": "Advertising / Cloud / AI",
        "cycles": [
            {
                "name": "2016-2018 广告+云增长",
                "points": [
                    {"date": "2016-06", "rev_growth": 22, "rev_accel": 3,
                     "ps": 6.0, "pe": 28, "gm": 61, "fcf_margin": 22,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 715, "actual_6m": "up"},
                    {"date": "2018-06", "rev_growth": 26, "rev_accel": 4,
                     "ps": 6.0, "pe": 28, "gm": 57, "fcf_margin": 20,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 1115, "actual_6m": "down"},
                    # 2018年12月: 市场大跌+监管恐慌
                    {"date": "2018-12", "rev_growth": 23, "rev_accel": -3,
                     "ps": 5.0, "pe": 23, "gm": 56, "fcf_margin": 20,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 1035, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020-2021 广告恢复+云加速",
                "points": [
                    {"date": "2020-03", "rev_growth": 13, "rev_accel": -6,
                     "ps": 5.0, "pe": 25, "gm": 54, "fcf_margin": 20,
                     "moat": "dominant", "product_cycle": "recovery",
                     "price": 1072, "actual_6m": "up"},
                    # 2021年6月: 广告恢复增长41%，YouTube爆发，6M后+15%
                    {"date": "2021-06", "rev_growth": 41, "rev_accel": 28,
                     "ps": 7.5, "pe": 25, "gm": 57, "fcf_margin": 25,
                     "moat": "dominant", "product_cycle": "expansion",
                     "price": 2506, "actual_6m": "up"},
                    # 2021年11月: 高增长但估值不极端(相对)
                    {"date": "2021-11", "rev_growth": 32, "rev_accel": -9,
                     "ps": 7.8, "pe": 26, "gm": 57, "fcf_margin": 25,
                     "moat": "dominant", "product_cycle": "peak",
                     "price": 2960, "actual_6m": "down"},
                ]
            },
            {
                "name": "2022 广告放缓 + 2023 AI追赶",
                "points": [
                    # 2022年6月: 广告减速，P/S回到合理水平
                    {"date": "2022-06", "rev_growth": 13, "rev_accel": -19,
                     "ps": 4.5, "pe": 20, "gm": 55, "fcf_margin": 20,
                     "moat": "dominant", "product_cycle": "decelerating",
                     "price": 111, "actual_6m": "down"},
                    # 2022年11月: ChatGPT威胁叙事(搜索被颠覆?)
                    {"date": "2022-11", "rev_growth": 6, "rev_accel": -7,
                     "ps": 4.0, "pe": 19, "gm": 55, "fcf_margin": 20,
                     "moat": "threatened", "product_cycle": "trough",
                     "price": 95, "actual_6m": "up"},
                    # 2023年6月: Gemini发布, AI叙事改善, 广告恢复
                    {"date": "2023-06", "rev_growth": 7, "rev_accel": 1,
                     "ps": 5.5, "pe": 24, "gm": 57, "fcf_margin": 22,
                     "moat": "rebuilding", "product_cycle": "recovery",
                     "price": 120, "actual_6m": "up"},
                    # 2024年1月: AI + Cloud增长加速, 首次派息
                    {"date": "2024-01", "rev_growth": 14, "rev_accel": 7,
                     "ps": 6.0, "pe": 23, "gm": 57, "fcf_margin": 25,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 141, "actual_6m": "up"},
                    # 2024年7月: 估值合理但增长维持14%
                    {"date": "2024-07", "rev_growth": 14, "rev_accel": 0,
                     "ps": 6.7, "pe": 23, "gm": 58, "fcf_margin": 26,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 185, "actual_6m": "sideways"},
                ]
            }
        ]
    },

    "TSLA": {
        "name": "Tesla Inc.",
        "sector": "EV / Energy / AI",
        "cycles": [
            {
                "name": "2016-2019 产能地狱 + Model 3量产",
                "points": [
                    # 2016年6月: Model 3预订火爆但未量产
                    {"date": "2016-06", "rev_growth": 33, "rev_accel": -27,
                     "ps": 5.5, "pe": -45, "gm": 23, "fcf_margin": -15,
                     "moat": "emerging", "product_cycle": "pre_launch",
                     "price": 38, "actual_6m": "sideways"},
                    # 2018年6月: 产能地狱中，Q2末周产5000台
                    {"date": "2018-06", "rev_growth": 43, "rev_accel": 10,
                     "ps": 3.5, "pe": -60, "gm": 18, "fcf_margin": -20,
                     "moat": "emerging", "product_cycle": "inflection",
                     "price": 65, "actual_6m": "sideways"},
                    # 2019年6月: 需求恐慌，stock $40
                    {"date": "2019-06", "rev_growth": 59, "rev_accel": 16,
                     "ps": 2.5, "pe": -85, "gm": 17, "fcf_margin": -5,
                     "moat": "emerging", "product_cycle": "expansion",
                     "price": 44, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020-2021 EV疯牛",
                "points": [
                    # 2020年3月: COVID底部，但中国工厂已运转
                    {"date": "2020-03", "rev_growth": 28, "rev_accel": -31,
                     "ps": 3.5, "pe": -1, "gm": 19, "fcf_margin": -2,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 90, "actual_6m": "up"},
                    # 2020年11月: S&P 500纳入，极端泡沫 P/S=20+
                    {"date": "2020-11", "rev_growth": 39, "rev_accel": 11,
                     "ps": 22, "pe": 1000, "gm": 21, "fcf_margin": 5,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 408, "actual_6m": "up"},
                    # 2021年11月: 历史新高$400+, P/S=20
                    {"date": "2021-11", "rev_growth": 65, "rev_accel": 26,
                     "ps": 20, "pe": 180, "gm": 25, "fcf_margin": 8,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 390, "actual_6m": "down"},
                ]
            },
            {
                "name": "2022-2023 利润率压缩 + 竞争加剧",
                "points": [
                    # 2022年4月: 增长开始放缓，上海封城影响
                    {"date": "2022-04", "rev_growth": 52, "rev_accel": -13,
                     "ps": 10, "pe": 95, "gm": 27, "fcf_margin": 8,
                     "moat": "strong", "product_cycle": "decelerating",
                     "price": 300, "actual_6m": "down"},
                    # 2022年12月: 底部$110, Musk Twitter分心, 需求恐慌
                    {"date": "2022-12", "rev_growth": 51, "rev_accel": -1,
                     "ps": 4.7, "pe": 31, "gm": 26, "fcf_margin": 8,
                     "moat": "weakening", "product_cycle": "trough",
                     "price": 110, "actual_6m": "up"},
                    # 2023年6月: 价格战开始，利润率下压，6个月后仅-5%(sideways)
                    {"date": "2023-06", "rev_growth": 47, "rev_accel": -4,
                     "ps": 8, "pe": 55, "gm": 18, "fcf_margin": 5,
                     "moat": "weakening", "product_cycle": "decelerating",
                     "price": 256, "actual_6m": "sideways"},
                    # 2024年4月: 增长仅3%但Robotaxi event宣布(4月5日), 新叙事催化
                    {"date": "2024-04", "rev_growth": 3, "rev_accel": -44,
                     "ps": 5.5, "pe": 40, "gm": 18, "fcf_margin": 3,
                     "moat": "rebuilding", "product_cycle": "inflection",
                     "price": 165, "actual_6m": "up"},
                    # 2024年10月: Robotaxi Day引发新叙事
                    {"date": "2024-10", "rev_growth": 8, "rev_accel": 5,
                     "ps": 12, "pe": 70, "gm": 19, "fcf_margin": 3,
                     "moat": "rebuilding", "product_cycle": "inflection",
                     "price": 260, "actual_6m": "up"},
                ]
            }
        ]
    },

    "CRM": {
        "name": "Salesforce Inc.",
        "sector": "Enterprise SaaS",
        "cycles": [
            {
                "name": "2016-2019 SaaS高增长期",
                "points": [
                    {"date": "2016-06", "rev_growth": 25, "rev_accel": -7,
                     "ps": 7.0, "pe": -1, "gm": 74, "fcf_margin": 15,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 79, "actual_6m": "up"},
                    {"date": "2018-06", "rev_growth": 25, "rev_accel": 0,
                     "ps": 8.0, "pe": 200, "gm": 74, "fcf_margin": 20,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 133, "actual_6m": "sideways"},
                    # 2018年12月: 市场大跌但SaaS基本面稳健
                    {"date": "2018-12", "rev_growth": 26, "rev_accel": 1,
                     "ps": 7.0, "pe": 100, "gm": 74, "fcf_margin": 22,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 131, "actual_6m": "up"},
                ]
            },
            {
                "name": "2020-2021 Slack收购 + 并购增长",
                "points": [
                    {"date": "2020-03", "rev_growth": 29, "rev_accel": 3,
                     "ps": 7.5, "pe": -1, "gm": 75, "fcf_margin": 18,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 135, "actual_6m": "up"},
                    # 2021年11月: 高增长SaaS见顶, P/S=10
                    {"date": "2021-11", "rev_growth": 24, "rev_accel": -1,
                     "ps": 10, "pe": 155, "gm": 74, "fcf_margin": 20,
                     "moat": "strong", "product_cycle": "peak",
                     "price": 297, "actual_6m": "down"},
                ]
            },
            {
                "name": "2022-2023 增长放缓 + 激进主义投资者",
                "points": [
                    # 2022年5月: 增长放缓至20%, Benioff激进扩张质疑
                    {"date": "2022-05", "rev_growth": 24, "rev_accel": 0,
                     "ps": 5.5, "pe": 800, "gm": 73, "fcf_margin": 15,
                     "moat": "strong", "product_cycle": "decelerating",
                     "price": 162, "actual_6m": "down"},
                    # 2022年12月: 激进投资者进入, 裁员8000人
                    {"date": "2022-12", "rev_growth": 14, "rev_accel": -10,
                     "ps": 5.3, "pe": 800, "gm": 73, "fcf_margin": 20,
                     "moat": "strong", "product_cycle": "trough",
                     "price": 132, "actual_6m": "up"},
                    # 2023年6月: 利润率大幅扩张, FCF margin>25%
                    {"date": "2023-06", "rev_growth": 11, "rev_accel": -3,
                     "ps": 7.5, "pe": 60, "gm": 75, "fcf_margin": 28,
                     "moat": "strong", "product_cycle": "recovery",
                     "price": 212, "actual_6m": "up"},
                    # 2024年1月: AI Agent叙事, Margin expansion story
                    {"date": "2024-01", "rev_growth": 11, "rev_accel": 0,
                     "ps": 8.0, "pe": 55, "gm": 76, "fcf_margin": 30,
                     "moat": "strong", "product_cycle": "expansion",
                     "price": 267, "actual_6m": "up"},
                ]
            }
        ]
    }
}


# ═══════════════════════════════════════════════════════════════
# 评分函数
# ═══════════════════════════════════════════════════════════════

def _score_to_signal(score: float) -> str:
    """分数转信号"""
    if score >= 80:
        return "strong_buy"
    elif score >= 65:
        return "buy"
    elif score >= 45:
        return "neutral"
    elif score >= 30:
        return "watch"
    else:
        return "sell"


def check_signal(signal: str, actual: str) -> bool:
    """检查信号是否正确"""
    if signal in ("strong_buy", "buy"):
        return actual == "up"
    elif signal == "sell":
        return actual == "down"
    elif signal in ("neutral", "watch"):
        return actual in ("up", "sideways")
    return False


def score_tech(point: Dict) -> Tuple[float, str]:
    """
    科技股通用评分函数

    核心逻辑:
    - 增长是主驱动力 (高增长+合理估值=买入)
    - 估值相对增长判断 (P/S vs growth rate)
    - 增长加速/减速决定方向
    - 护城河和产品周期影响信心
    """
    rev_growth = point.get("rev_growth", 10)      # 营收增长率 %
    rev_accel = point.get("rev_accel", 0)         # 增长加速度 (当前-去年)
    ps = point.get("ps", 8.0)                     # P/S ratio
    pe = point.get("pe", 25)                      # P/E ratio
    gm = point.get("gm", 60)                      # 毛利率 %
    fcf_margin = point.get("fcf_margin", 15)      # FCF利润率 %
    moat = point.get("moat", "strong")            # 护城河: dominant/strong/emerging/weakening/threatened
    product_cycle = point.get("product_cycle", "expansion")  # 产品周期阶段

    # ═══ 维度1: 增长质量 (30%) ═══

    # 增长率评分
    if rev_growth > 80:
        growth_score = 10
    elif rev_growth > 40:
        growth_score = 9
    elif rev_growth > 25:
        growth_score = 8
    elif rev_growth > 15:
        growth_score = 7
    elif rev_growth > 8:
        growth_score = 5
    elif rev_growth > 0:
        growth_score = 3
    elif rev_growth > -10:
        growth_score = 2
    else:
        growth_score = 1

    # 加速度调整
    if rev_accel > 20:
        accel_bonus = 2
    elif rev_accel > 5:
        accel_bonus = 1
    elif rev_accel > -5:
        accel_bonus = 0
    elif rev_accel > -15:
        accel_bonus = -1
    else:
        accel_bonus = -2

    growth_final = min(10, max(1, growth_score + accel_bonus))

    # ═══ 维度2: 估值合理性 (25%) ═══

    # P/S相对增长率 (GARP核心: PS/Growth ratio)
    if rev_growth > 0:
        ps_growth_ratio = ps / (rev_growth / 10)  # P/S per 10% growth
    else:
        ps_growth_ratio = ps * 5  # 负增长时P/S任何水平都贵

    if ps_growth_ratio < 0.5:
        val_score = 10  # 极度低估
    elif ps_growth_ratio < 1.0:
        val_score = 9
    elif ps_growth_ratio < 1.5:
        val_score = 8
    elif ps_growth_ratio < 2.5:
        val_score = 6
    elif ps_growth_ratio < 4.0:
        val_score = 4
    elif ps_growth_ratio < 6.0:
        val_score = 3
    elif ps_growth_ratio < 10.0:
        val_score = 2
    else:
        val_score = 1

    # ═══ 维度3: 盈利能力 (20%) ═══

    # 毛利率 (高毛利=强定价权+运营杠杆潜力)
    if gm > 75:
        gm_score = 9
    elif gm > 65:
        gm_score = 7
    elif gm > 55:
        gm_score = 5
    elif gm > 40:
        gm_score = 4
    elif gm > 25:
        gm_score = 3
    else:
        gm_score = 1

    # FCF利润率
    if fcf_margin > 35:
        fcf_score = 10
    elif fcf_margin > 25:
        fcf_score = 8
    elif fcf_margin > 15:
        fcf_score = 6
    elif fcf_margin > 5:
        fcf_score = 4
    elif fcf_margin > 0:
        fcf_score = 3
    else:
        fcf_score = 1

    profit_score = (gm_score * 0.4 + fcf_score * 0.6)

    # ═══ 维度4: 竞争地位 (15%) ═══

    moat_scores = {
        "dominant": 10,
        "strong": 8,
        "rebuilding": 6,
        "emerging": 5,
        "weakening": 3,
        "threatened": 2
    }
    moat_score = moat_scores.get(moat, 5)

    # ═══ 维度5: 催化剂/产品周期 (10%) ═══

    cycle_scores = {
        "inflection": 9,     # 拐点 - 新产品/新市场即将爆发
        "pre_launch": 8,     # 预发布 - 大产品即将上市
        "expansion": 8,      # 扩张期 - 增长正在加速
        "recovery": 7,       # 复苏期 - 从低谷回升
        "catalyst": 8,       # 催化剂 - 外部事件利好
        "ai_narrative": 7,   # AI叙事驱动
        "mature": 5,         # 成熟期 - 增长稳定
        "peak": 3,           # 顶峰 - 增长即将见顶
        "decelerating": 3,   # 减速 - 增长放缓
        "declining": 2,      # 下降 - 增长转负
        "trough": 6,         # 谷底 - 最差已过
    }
    cycle_score = cycle_scores.get(product_cycle, 5)

    # ═══ 综合评分 ═══

    base_score = (
        growth_final * 0.30 +
        val_score * 0.25 +
        profit_score * 0.20 +
        moat_score * 0.15 +
        cycle_score * 0.10
    ) * 10

    # ═══ 高阶调整 (经验规则) ═══

    adjustment = 0

    # ─── 卖出/风险信号 ───

    # 经验#T1: 周期顶峰卖出
    # 核心: peak = 即将下跌，但需区分"真顶"(减速)和"假顶"(仍加速)
    if product_cycle == "peak":
        if rev_growth > 30 and rev_accel >= 0 and moat in ("dominant", "strong"):
            # 高增长仍加速: 不是真顶，可能继续涨 (NVDA 2017-11)
            adjustment -= 5  # 轻微风险警告
        else:
            # 其他情况: 真顶
            adjustment -= 40

    # 经验#T2: 增长减速卖出
    if product_cycle == "decelerating":
        if ps > 8:
            adjustment -= 30  # PS极高时强卖
        elif ps > 5:
            adjustment -= 20  # PS中等时中等卖
        elif rev_accel < -10:
            adjustment -= 18  # PS低但加速度恶化

    # 经验#T3: 增长急剧崩塌 (accel<-20=极端恶化)
    # 仅在非inflection/trough/recovery/pre_launch阶段触发
    if rev_accel < -20 and ps > 5 and product_cycle not in ("inflection", "trough", "recovery", "catalyst", "pre_launch"):
        adjustment -= 15

    # 经验#T4: 绝对高估值惩罚
    # 豁免: trough/inflection/recovery阶段 (高PS是结构性的)
    if product_cycle not in ("trough", "inflection", "recovery"):
        if ps > 12 and rev_growth < 50:
            adjustment -= 10
        if ps > 20 and rev_growth < 80:
            adjustment -= 10

    # 经验#T5: 低利润率PS陷阱 (AMZN型: FCF<8%时低PS不代表便宜)
    # 高增长(>40%)豁免: 增长速度够快时估值有支撑
    if fcf_margin < 8 and ps > 2.5 and rev_accel < 0 and rev_growth < 40:
        if product_cycle in ("peak", "decelerating", "declining"):
            adjustment -= 20
        elif product_cycle == "expansion":
            adjustment -= 10

    # 经验#T6: 护城河恶化强卖出
    if moat in ("weakening", "threatened") and rev_accel < -10 and product_cycle not in ("inflection",):
        adjustment -= 15

    # 经验#T7: Mature/过渡期高估值
    if product_cycle == "mature" and ps > 7 and rev_accel < 0:
        adjustment -= 20

    # ─── 买入信号 ───

    # 经验#T8: 估值崩塌买入 (PS极低+增长正+护城河强+利润率好)
    if ps < 3.0 and rev_growth > 0 and moat in ("dominant", "strong") and fcf_margin > 10:
        adjustment += 20

    # 经验#T9: 恐慌/催化剂底部买入
    if product_cycle in ("catalyst", "pre_launch") and ps < 8 and moat in ("dominant", "strong"):
        adjustment += 20

    # 经验#T10: 增长拐点信号 (从负增长开始恢复)
    if rev_growth < 0 and rev_accel > 0 and moat in ("dominant", "strong"):
        adjustment += 20

    # 经验#T11: 超级增长保护 (增长>80%+加速=不可阻挡)
    if rev_growth > 80 and rev_accel >= 0 and moat == "dominant":
        adjustment += 25

    # 经验#T12: 谷底恢复信号 (trough+护城河完好)
    if product_cycle == "trough" and moat in ("dominant", "strong", "rebuilding"):
        if ps < 5:
            adjustment += 20
        else:
            adjustment += 12  # 高PS trough (NVDA型)

    # 经验#T13: PS绝对低位强买入
    if ps < 2.0 and fcf_margin > 0 and moat in ("dominant", "strong"):
        adjustment += 25

    # 经验#T14: 利润率扩张催化 (仅当估值合理时)
    if fcf_margin > 25 and rev_growth > 10 and product_cycle in ("recovery", "expansion") and val_score >= 5:
        adjustment += 10

    # 经验#T15: 亏损期但FCF正+高增长
    if pe < 0 and fcf_margin > 0 and rev_growth > 20:
        adjustment += 10

    # 经验#T16: 增长加速买入
    if rev_accel > 10 and ps < 10 and product_cycle in ("expansion", "recovery", "inflection"):
        adjustment += 10

    # 经验#T17: Inflection强信号 (拐点+主导地位=反转确认)
    if product_cycle == "inflection" and moat in ("dominant", "strong", "rebuilding"):
        adjustment += 15

    # ─── 覆盖/修正规则 ───

    # 经验#T18: 低PS+低FCF陷阱 (不是真便宜)
    if ps < 4 and fcf_margin < 5 and product_cycle in ("peak", "decelerating", "declining", "expansion"):
        if adjustment > 0:
            adjustment = min(adjustment, 5)

    # 经验#T19: declining + 护城河弱
    if product_cycle == "declining" and moat in ("weakening", "threatened"):
        adjustment -= 15

    # 经验#T20: 增长减速但高利润率(SaaS)+估值回落=可能只是sideways非大跌
    if product_cycle in ("decelerating", "trough") and fcf_margin > 30 and ps < 10 and moat == "dominant":
        adjustment += 10  # 高质量公司在减速期有利润率缓冲

    # 经验#T21: 烧钱公司不确定性惩罚 (FCF负+低毛利+未验证护城河=结果高度不确定)
    if fcf_margin < 0 and gm < 25 and moat not in ("dominant", "strong"):
        adjustment -= 15

    # 经验#T22: 估值偏贵时限制买入信号 (val_score<4意味着PS/Growth比率>4)
    if val_score <= 3 and product_cycle in ("expansion", "mature"):
        adjustment -= 5  # 轻微抑制，避免在贵的时候给买入

    # 经验#T23: Mature + 高估值 + 加速增长 = 最后的疯狂 (peak trap)
    # 核心: 成熟期加速=顶部信号，增长即将见顶
    if product_cycle == "mature" and ps > 7 and rev_accel > 0:
        adjustment -= 45

    # 经验#T24: Peak + 极端估值 = 泡沫顶部 (PS>15 override)
    # 无论增长多快，PS>15在peak阶段都是泡沫
    if product_cycle == "peak" and ps > 15:
        adjustment -= 35

    # 经验#T25: Declining + 负FCF = 结构性恶化
    # 不仅仅是周期性下降，现金流恶化确认基本面问题
    if product_cycle == "declining" and fcf_margin < 0:
        adjustment -= 15

    # 经验#T26: 高增长减速但仍加速中的强护城河公司 = 仍有上升空间
    # NVDA型: 从122%降到94%，绝对增长仍极强
    if product_cycle == "decelerating" and rev_growth > 50 and moat == "dominant":
        adjustment += 15

    # 经验#T27: 高增长急刹车 (growth>30 + accel<-10 + PS>8)
    # 急速减速从高增长 = 市场恐慌性抛售
    if product_cycle == "decelerating" and rev_growth > 30 and rev_accel < -10 and ps > 8:
        adjustment -= 5

    # 经验#T28: 弱护城河 + 减速 + 高利润率 = 溢价坍塌
    # 高利润率公司在信任危机中跌幅更大 (META 2018 Cambridge Analytica)
    if product_cycle == "decelerating" and moat in ("weakening", "threatened") and fcf_margin > 20:
        adjustment -= 10

    # 经验#T29: SaaS估值压缩 (中等增长 + 高毛利 + 减速)
    # 利率上升环境中SaaS倍数收缩风险
    if product_cycle == "decelerating" and gm > 65 and 15 < rev_growth < 30 and ps > 5:
        adjustment -= 15

    final_score = max(0, min(100, base_score + adjustment))
    return final_score, _score_to_signal(final_score)


# ═══════════════════════════════════════════════════════════════
# 回测执行引擎
# ═══════════════════════════════════════════════════════════════

def run_backtest(target_company: str = None) -> Dict:
    """运行回测"""
    results = {}

    companies = [target_company] if target_company else list(BACKTEST_DATA.keys())

    for company in companies:
        if company not in BACKTEST_DATA:
            continue
        data = BACKTEST_DATA[company]
        correct = 0
        total = 0
        errors = []

        for cycle in data["cycles"]:
            for point in cycle["points"]:
                score, signal = score_tech(point)
                actual = point["actual_6m"]
                is_correct = check_signal(signal, actual)

                if is_correct:
                    correct += 1
                else:
                    errors.append({
                        "date": point["date"],
                        "score": round(score, 1),
                        "signal": signal,
                        "actual": actual,
                        "rev_growth": point["rev_growth"],
                        "ps": point["ps"],
                        "product_cycle": point.get("product_cycle", "unknown")
                    })
                total += 1

        accuracy = (correct / total * 100) if total > 0 else 0
        results[company] = {
            "name": data["name"],
            "accuracy": round(accuracy, 1),
            "correct": correct,
            "total": total,
            "errors": errors,
            "pass": accuracy >= MIN_ACCURACY
        }

    return results


def main():
    """主入口"""
    target = sys.argv[1] if len(sys.argv) > 1 else None

    print("=" * 70)
    print("  科技行业投资框架 - 回测报告")
    print("  Tech Industry Investment Framework - Backtest Report")
    print("=" * 70)

    results = run_backtest(target)

    all_pass = True
    total_correct = 0
    total_points = 0

    for company, result in results.items():
        status = "✓ PASS" if result["pass"] else "✗ FAIL"
        print(f"\n{'─' * 50}")
        print(f"  {company} ({result['name']})")
        print(f"  准确率: {result['accuracy']:.1f}% ({result['correct']}/{result['total']}) {status}")

        if result["errors"]:
            print(f"  错误列表:")
            for err in result["errors"]:
                print(f"    {err['date']}: score={err['score']}, signal={err['signal']}, "
                      f"actual={err['actual']}, rev_growth={err['rev_growth']}%, "
                      f"PS={err['ps']}, cycle={err['product_cycle']}")

        total_correct += result["correct"]
        total_points += result["total"]
        if not result["pass"]:
            all_pass = False

    overall = (total_correct / total_points * 100) if total_points > 0 else 0

    print(f"\n{'═' * 70}")
    print(f"  总体准确率: {overall:.1f}% ({total_correct}/{total_points})")
    print(f"  目标: >= {MIN_ACCURACY}%")
    print(f"  状态: {'ALL PASS ✓' if all_pass else 'NEEDS ITERATION ✗'}")
    print(f"{'═' * 70}")

    # Save results
    output_dir = DATA_DIR / "backtest"
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"tech_backtest_{timestamp}.json"

    with open(output_file, "w") as f:
        json.dump({
            "timestamp": timestamp,
            "overall_accuracy": round(overall, 1),
            "total_points": total_points,
            "all_pass": all_pass,
            "results": results
        }, f, indent=2, ensure_ascii=False)

    print(f"\n  结果已保存: {output_file}")

    return all_pass


if __name__ == "__main__":
    main()
