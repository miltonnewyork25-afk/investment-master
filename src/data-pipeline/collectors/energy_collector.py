"""
能源行业指标采集器

采集：
- WTI原油价格
- Baker Hughes钻机数
- EIA原油库存
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import DATA_DIR, RAW_DIR

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False


class WTICollector:
    """WTI原油价格采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "energy"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集WTI原油价格

        注：实际生产中应使用EIA API或其他数据源
        这里使用模拟数据作为示例
        """
        print("[INFO] 采集WTI原油价格...")

        # 模拟数据（实际应从API获取）
        # 当前假设油价在中等水平
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "price": 72.50,  # 模拟当前油价
            "change_1d": -0.8,
            "change_1w": 2.3,
            "change_1m": -5.2,
            "change_yoy": 8.5,
            "high_52w": 95.0,
            "low_52w": 65.0,
            "source": "simulated"
        }

        # 计算评分（逆周期：低油价 = 高分）
        price = data["price"]
        if price < 50:
            score = 9
            signal = "深度低估，强烈买入"
        elif price < 60:
            score = 7
            signal = "低估，买入"
        elif price < 75:
            score = 5
            signal = "合理"
        elif price < 90:
            score = 3
            signal = "偏高"
        else:
            score = 1
            signal = "过热，卖出"

        data["score"] = score
        data["signal"] = signal

        if save:
            self._save(data)

        print(f"[INFO] WTI价格: ${data['price']} (评分: {score}, {signal})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"wti_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class RigCountCollector:
    """Baker Hughes钻机数采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "energy"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集Baker Hughes钻机数

        注：实际生产中应从Baker Hughes网站获取
        """
        print("[INFO] 采集Baker Hughes钻机数...")

        # 模拟数据
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "us_total": 585,
            "us_oil": 480,
            "us_gas": 100,
            "us_misc": 5,
            "change_wow": 3,  # 周环比
            "change_yoy": -8.5,  # 同比变化%
            "peak_2014": 1931,  # 2014年峰值
            "trough_2020": 244,  # 2020年谷底
            "source": "simulated"
        }

        # 计算评分（基于同比变化，逆周期）
        yoy = data["change_yoy"]
        if yoy < -30:
            score = 9
            signal = "大幅收缩，底部区域"
        elif yoy < -10:
            score = 7
            signal = "收缩，关注"
        elif yoy < 10:
            score = 5
            signal = "平稳"
        elif yoy < 30:
            score = 4
            signal = "扩张"
        else:
            score = 2
            signal = "过度扩张"

        data["score"] = score
        data["signal"] = signal

        # 趋势判断
        if data["change_wow"] > 0:
            data["trend"] = "expanding"
        elif data["change_wow"] < 0:
            data["trend"] = "contracting"
        else:
            data["trend"] = "flat"

        if save:
            self._save(data)

        print(f"[INFO] 美国钻机数: {data['us_total']} (YoY: {yoy}%, 评分: {score})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"rig_count_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class CrudeInventoryCollector:
    """EIA原油库存采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "energy"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集EIA原油库存数据

        注：实际生产中应使用EIA API
        """
        print("[INFO] 采集EIA原油库存...")

        # 模拟数据（单位：百万桶）
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "crude_stocks": 425.0,  # 商业原油库存
            "five_year_avg": 440.0,  # 5年均值
            "vs_5yr_avg_pct": -3.4,  # 相对5年均值%
            "weekly_change": -2.5,  # 周变化（百万桶）
            "spr": 350.0,  # 战略石油储备
            "source": "simulated"
        }

        # 计算评分（低库存 = 支撑油价）
        vs_avg = data["vs_5yr_avg_pct"]
        if vs_avg < -10:
            score = 8
            signal = "库存偏低，支撑油价"
        elif vs_avg < 0:
            score = 6
            signal = "略低于均值"
        elif vs_avg < 10:
            score = 4
            signal = "略高于均值"
        else:
            score = 2
            signal = "库存过高，压制油价"

        data["score"] = score
        data["signal"] = signal

        # 库存趋势
        if data["weekly_change"] < -1:
            data["trend"] = "drawing"
            data["trend_signal"] = "去库存中"
        elif data["weekly_change"] > 1:
            data["trend"] = "building"
            data["trend_signal"] = "累库存中"
        else:
            data["trend"] = "flat"
            data["trend_signal"] = "基本持平"

        if save:
            self._save(data)

        print(f"[INFO] 原油库存: {data['crude_stocks']}M桶 (vs 5年均值: {vs_avg}%)")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"crude_inventory_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class EnergyIndicatorCollector:
    """能源行业综合指标采集器"""

    def __init__(self):
        self.wti = WTICollector()
        self.rig_count = RigCountCollector()
        self.inventory = CrudeInventoryCollector()

    def collect_all(self, save: bool = True) -> Dict:
        """采集所有能源指标"""
        print("\n[INFO] === 能源行业指标 ===")

        results = {
            "wti": self.wti.collect(save),
            "rig_count": self.rig_count.collect(save),
            "inventory": self.inventory.collect(save)
        }

        # 计算综合指标评分
        wti_score = results["wti"]["score"]
        rig_score = results["rig_count"]["score"]
        inv_score = results["inventory"]["score"]

        # 加权平均（油价权重最大）
        composite_score = (
            wti_score * 0.5 +
            rig_score * 0.3 +
            inv_score * 0.2
        )

        results["composite"] = {
            "score": round(composite_score, 1),
            "wti_score": wti_score,
            "rig_score": rig_score,
            "inventory_score": inv_score
        }

        print(f"\n[INFO] 能源综合指标评分: {composite_score:.1f}")
        return results

    def get_cycle_stage(self) -> Dict:
        """判断当前周期阶段"""
        data = self.collect_all(save=False)

        wti_price = data["wti"]["price"]
        rig_yoy = data["rig_count"]["change_yoy"]

        # 周期阶段判断
        if wti_price < 50 and rig_yoy < -20:
            stage = "recession"
            description = "衰退期：油价低迷，钻机数大幅收缩"
            strategy = "关注抄底机会"
        elif wti_price < 70 and rig_yoy < 0:
            stage = "early_recovery"
            description = "早期复苏：油价企稳，钻机数触底"
            strategy = "逐步建仓"
        elif wti_price < 85 and rig_yoy > 0:
            stage = "expansion"
            description = "扩张期：油价健康，活动增加"
            strategy = "持有享受盈利"
        elif wti_price > 85 or rig_yoy > 20:
            stage = "late_cycle"
            description = "后周期：油价高位或活动过热"
            strategy = "警惕回调，逐步减仓"
        else:
            stage = "mid_cycle"
            description = "中周期：各指标正常"
            strategy = "持有"

        return {
            "stage": stage,
            "description": description,
            "strategy": strategy,
            "wti_price": wti_price,
            "rig_yoy": rig_yoy
        }


def main():
    """测试采集器"""
    collector = EnergyIndicatorCollector()

    # 采集所有指标
    data = collector.collect_all()

    # 判断周期阶段
    print("\n" + "=" * 50)
    cycle = collector.get_cycle_stage()
    print(f"当前周期阶段: {cycle['stage']}")
    print(f"描述: {cycle['description']}")
    print(f"策略: {cycle['strategy']}")


if __name__ == "__main__":
    main()
