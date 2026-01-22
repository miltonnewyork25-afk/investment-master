"""
工程机械行业指标采集器

采集：
- 挖掘机销量
- 建筑支出
- 设备利用率
- 积压订单
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


class ExcavatorSalesCollector:
    """挖掘机销量采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "machinery"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集挖掘机销量数据

        注：实际生产中应从行业协会或公司财报获取
        这里使用模拟数据作为示例
        """
        print("[INFO] 采集挖掘机销量数据...")

        # 模拟数据
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "north_america": {
                "units": 12500,
                "yoy_change": 5.2,
                "mom_change": -2.1
            },
            "china": {
                "units": 18000,
                "yoy_change": -8.5,
                "mom_change": 3.2
            },
            "global": {
                "units": 45000,
                "yoy_change": 2.3,
                "mom_change": 0.5
            },
            "source": "simulated"
        }

        # 使用全球同比变化计算评分（逆周期）
        global_yoy = data["global"]["yoy_change"]
        if global_yoy < -30:
            score = 9
            signal = "深度衰退，强烈买入"
        elif global_yoy < -15:
            score = 8
            signal = "衰退，买入"
        elif global_yoy < 0:
            score = 6
            signal = "下滑，关注"
        elif global_yoy < 15:
            score = 5
            signal = "平稳/复苏"
        elif global_yoy < 30:
            score = 3
            signal = "扩张"
        else:
            score = 1
            signal = "过热，卖出"

        data["score"] = score
        data["signal"] = signal

        if save:
            self._save(data)

        print(f"[INFO] 全球挖掘机销量: {data['global']['units']} (YoY: {global_yoy}%, 评分: {score})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"excavator_sales_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class ConstructionSpendingCollector:
    """建筑支出采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "machinery"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集美国建筑支出数据

        注：实际生产中应从Census Bureau或FRED获取
        """
        print("[INFO] 采集美国建筑支出数据...")

        # 模拟数据（单位：十亿美元，年化）
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "total": 2150.0,
            "residential": 850.0,
            "nonresidential": 1300.0,
            "yoy_change": 4.5,
            "mom_change": 0.3,
            "infrastructure": {
                "highway": 180.0,
                "transportation": 95.0,
                "power": 145.0
            },
            "source": "simulated"
        }

        # 计算评分（逆周期）
        yoy = data["yoy_change"]
        if yoy < -10:
            score = 8
            signal = "大幅收缩，底部区域"
        elif yoy < 0:
            score = 6
            signal = "收缩"
        elif yoy < 5:
            score = 5
            signal = "平稳"
        elif yoy < 15:
            score = 4
            signal = "扩张"
        else:
            score = 2
            signal = "过热"

        data["score"] = score
        data["signal"] = signal

        if save:
            self._save(data)

        print(f"[INFO] 美国建筑支出: ${data['total']}B (YoY: {yoy}%, 评分: {score})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"construction_spending_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class EquipmentUtilizationCollector:
    """设备利用率采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "machinery"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集设备利用率数据

        注：实际数据来自租赁公司或行业调研
        """
        print("[INFO] 采集设备利用率数据...")

        # 模拟数据
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "overall_utilization": 75.0,
            "by_type": {
                "excavators": 78.0,
                "loaders": 72.0,
                "cranes": 70.0,
                "trucks": 80.0
            },
            "rental_rates_yoy": 3.5,
            "source": "simulated"
        }

        # 计算评分（逆周期：低利用率 = 买入机会）
        utilization = data["overall_utilization"]
        if utilization < 55:
            score = 9
            signal = "严重过剩，抄底"
        elif utilization < 65:
            score = 7
            signal = "过剩，买入"
        elif utilization < 75:
            score = 5
            signal = "正常"
        elif utilization < 85:
            score = 3
            signal = "紧张"
        else:
            score = 1
            signal = "过热"

        data["score"] = score
        data["signal"] = signal

        if save:
            self._save(data)

        print(f"[INFO] 设备利用率: {utilization}% (评分: {score}, {signal})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"equipment_utilization_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class BacklogCollector:
    """积压订单采集器"""

    def __init__(self):
        self.save_dir = RAW_DIR / "indicators" / "machinery"
        self.save_dir.mkdir(parents=True, exist_ok=True)

    def collect(self, save: bool = True) -> Dict:
        """
        采集积压订单数据

        注：实际数据来自公司财报
        """
        print("[INFO] 采集积压订单数据...")

        # 模拟数据（单位：十亿美元）
        data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "cat_backlog": 28.5,
            "cat_backlog_yoy": 8.2,
            "de_backlog": 12.3,
            "de_backlog_yoy": 5.5,
            "industry_average_yoy": 6.8,
            "source": "simulated"
        }

        # 计算评分（逆周期）
        avg_yoy = data["industry_average_yoy"]
        if avg_yoy < -20:
            score = 8
            signal = "大幅下降，关注底部"
        elif avg_yoy < -5:
            score = 6
            signal = "下降"
        elif avg_yoy < 10:
            score = 5
            signal = "平稳"
        elif avg_yoy < 25:
            score = 4
            signal = "增长"
        else:
            score = 2
            signal = "过热"

        data["score"] = score
        data["signal"] = signal

        if save:
            self._save(data)

        print(f"[INFO] 积压订单YoY: {avg_yoy}% (评分: {score}, {signal})")
        return data

    def _save(self, data: Dict):
        """保存数据"""
        filename = f"backlog_{datetime.now().strftime('%Y-%m-%d')}.json"
        filepath = self.save_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")


class MachineryIndicatorCollector:
    """工程机械行业综合指标采集器"""

    def __init__(self):
        self.excavator = ExcavatorSalesCollector()
        self.construction = ConstructionSpendingCollector()
        self.utilization = EquipmentUtilizationCollector()
        self.backlog = BacklogCollector()

    def collect_all(self, save: bool = True) -> Dict:
        """采集所有工程机械指标"""
        print("\n[INFO] === 工程机械行业指标 ===")

        results = {
            "excavator_sales": self.excavator.collect(save),
            "construction_spending": self.construction.collect(save),
            "equipment_utilization": self.utilization.collect(save),
            "backlog": self.backlog.collect(save)
        }

        # 计算综合指标评分
        exc_score = results["excavator_sales"]["score"]
        con_score = results["construction_spending"]["score"]
        util_score = results["equipment_utilization"]["score"]
        back_score = results["backlog"]["score"]

        # 加权平均
        composite_score = (
            exc_score * 0.35 +
            con_score * 0.25 +
            util_score * 0.25 +
            back_score * 0.15
        )

        results["composite"] = {
            "score": round(composite_score, 1),
            "excavator_score": exc_score,
            "construction_score": con_score,
            "utilization_score": util_score,
            "backlog_score": back_score
        }

        print(f"\n[INFO] 工程机械综合指标评分: {composite_score:.1f}")
        return results

    def get_cycle_stage(self) -> Dict:
        """判断当前周期阶段"""
        data = self.collect_all(save=False)

        excavator_yoy = data["excavator_sales"]["global"]["yoy_change"]
        utilization = data["equipment_utilization"]["overall_utilization"]

        # 周期阶段判断
        if excavator_yoy < -20 and utilization < 60:
            stage = "recession"
            description = "衰退期：销量暴跌，设备闲置"
            strategy = "关注抄底，等待触底信号"
        elif excavator_yoy < 0 and utilization < 70:
            stage = "early_recovery"
            description = "早期复苏：销量触底，利用率回升"
            strategy = "逐步建仓"
        elif excavator_yoy > 0 and utilization < 80:
            stage = "expansion"
            description = "扩张期：销量增长，利用率健康"
            strategy = "持有享受盈利"
        elif excavator_yoy > 15 or utilization > 80:
            stage = "late_cycle"
            description = "后周期：增速放缓或利用率过高"
            strategy = "警惕回调，逐步减仓"
        else:
            stage = "mid_cycle"
            description = "中周期：各指标正常"
            strategy = "持有"

        return {
            "stage": stage,
            "description": description,
            "strategy": strategy,
            "excavator_yoy": excavator_yoy,
            "utilization": utilization
        }


def main():
    """测试采集器"""
    collector = MachineryIndicatorCollector()

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
