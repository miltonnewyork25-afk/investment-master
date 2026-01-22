"""
DRAM 价格数据采集器

数据源：
- TrendForce DRAMeXchange: https://www.trendforce.com/
- 备用: 财经新闻、行业报告
"""

import json
import re
import requests
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional
import sys

sys.path.append(str(Path(__file__).parent.parent))
from config import RAW_DIR
from storage.db import Database


class DRAMCollector:
    """DRAM 价格采集器"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        })
        self.db = Database()

        # DRAM产品类型
        self.product_types = {
            "ddr4_8gb": "DDR4 8Gb",
            "ddr5_16gb": "DDR5 16Gb",
            "hbm3": "HBM3",
            "mobile_lpddr5": "Mobile LPDDR5"
        }

    def fetch_from_trendforce(self) -> Optional[Dict]:
        """
        从TrendForce获取DRAM价格

        注意：TrendForce数据需要订阅，这里提供模拟实现
        实际使用时需要：
        1. 订阅TrendForce DRAMeXchange服务
        2. 使用其API或解析报告
        """
        try:
            # 模拟TrendForce数据（基于最新研究）
            # 实际部署时替换为API调用
            current_data = {
                "source": "trendforce_simulated",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "prices": {
                    "ddr4_8gb": {
                        "spot": 2.15,      # 美元
                        "contract": 2.05,
                        "unit": "USD"
                    },
                    "ddr5_16gb": {
                        "spot": 4.80,
                        "contract": 4.50,
                        "unit": "USD"
                    },
                    "hbm3": {
                        "spot": None,      # HBM通常无现货价
                        "contract": 15.0,  # 估算
                        "unit": "USD"
                    }
                },
                "market_summary": {
                    "trend": "上涨",
                    "yoy_change": 30,      # 同比变化%
                    "mom_change": 9.64,    # 环比变化%
                    "outlook": "Q1 2026预计继续上涨10-15%"
                },
                "fetched_at": datetime.now().isoformat(),
                "note": "模拟数据，请配置TrendForce API"
            }

            return current_data

        except Exception as e:
            print(f"[WARNING] TrendForce数据获取失败: {e}")
            return None

    def fetch_spot_price(self) -> Optional[Dict]:
        """获取DRAM现货价格（简化版）"""
        data = self.fetch_from_trendforce()

        if data and "prices" in data:
            # 提取DDR4 8Gb作为主要跟踪指标
            ddr4 = data["prices"].get("ddr4_8gb", {})
            spot_price = ddr4.get("spot", 0)

            return {
                "source": data["source"],
                "date": data["date"],
                "product": "DDR4 8Gb",
                "spot_price": spot_price,
                "contract_price": ddr4.get("contract"),
                "yoy_change": data["market_summary"].get("yoy_change"),
                "mom_change": data["market_summary"].get("mom_change"),
                "trend": data["market_summary"].get("trend"),
                "fetched_at": data["fetched_at"]
            }

        return None

    def collect(self, save: bool = True) -> Optional[Dict]:
        """采集DRAM价格数据"""
        print("[INFO] 采集DRAM价格数据...")

        data = self.fetch_spot_price()

        if data:
            # 计算历史变化
            data = self._calculate_changes(data)

            if save:
                self._save_data(data)
                self._save_to_db(data)

            print(f"[INFO] DRAM现货价: ${data['spot_price']:.2f} "
                  f"(MoM: {data.get('mom_change', 'N/A')}%, "
                  f"YoY: {data.get('yoy_change', 'N/A')}%)")

        return data

    def _calculate_changes(self, data: Dict) -> Dict:
        """计算价格变化"""
        current_price = data.get("spot_price", 0)

        # 从历史数据计算变化率
        history = self.get_history(weeks=52)

        if history:
            # 环比（与上周比）
            if len(history) >= 1:
                last_week = history[0].get("spot_price", current_price)
                if last_week > 0:
                    data["mom_change"] = round((current_price - last_week) / last_week * 100, 2)

            # 同比（与去年同期比）
            if len(history) >= 52:
                last_year = history[51].get("spot_price", current_price)
                if last_year > 0:
                    data["yoy_change"] = round((current_price - last_year) / last_year * 100, 2)

        return data

    def _save_data(self, data: Dict):
        """保存数据到文件"""
        indicators_dir = RAW_DIR / "indicators" / "semicap"
        indicators_dir.mkdir(parents=True, exist_ok=True)

        filename = f"dram_{data['date']}.json"
        filepath = indicators_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")

    def _save_to_db(self, data: Dict):
        """保存到数据库"""
        self.db.insert_indicator(
            name="dram_spot",
            date=data["date"],
            value=data["spot_price"],
            yoy=data.get("yoy_change"),
            mom=data.get("mom_change"),
            source=data.get("source")
        )

    def get_history(self, weeks: int = 12) -> List[Dict]:
        """获取历史DRAM价格数据"""
        indicators_dir = RAW_DIR / "indicators" / "semicap"

        if not indicators_dir.exists():
            return []

        files = sorted(indicators_dir.glob("dram_*.json"), reverse=True)
        history = []

        for f in files[:weeks]:
            with open(f, "r", encoding="utf-8") as fp:
                history.append(json.load(fp))

        return history

    def get_latest(self) -> Optional[Dict]:
        """获取最新DRAM价格数据"""
        return self.db.get_latest_indicator("dram_spot")

    def analyze_cycle_stage(self) -> Dict:
        """分析DRAM周期阶段"""
        latest = self.get_latest()

        if not latest:
            return {"stage": "unknown", "confidence": "low"}

        yoy = latest.get("yoy_change", 0)
        mom = latest.get("mom_change", 0)

        # 周期阶段判断
        if yoy > 30 and mom > 5:
            stage = "overheating"
            description = "过热期：价格高速上涨"
        elif yoy > 0 and mom > 0:
            stage = "expansion"
            description = "扩张期：价格温和上涨"
        elif yoy < 0 and mom < 0:
            stage = "recession"
            description = "衰退期：价格下跌"
        elif yoy < 0 and mom > 0:
            stage = "recovery"
            description = "复苏期：价格触底回升"
        else:
            stage = "transition"
            description = "过渡期：趋势不明"

        return {
            "stage": stage,
            "description": description,
            "yoy_change": yoy,
            "mom_change": mom,
            "latest_price": latest.get("value"),
            "date": latest.get("date"),
            "confidence": "medium"
        }

    def check_divergence_signals(self) -> Dict:
        """检查背离信号"""
        cycle = self.analyze_cycle_stage()

        signals = {
            "top_divergence": False,
            "bottom_divergence": False,
            "cycle_stage": cycle["stage"],
            "details": []
        }

        # 顶部背离条件：过热期 + 环比开始放缓
        if cycle["stage"] == "overheating":
            mom = cycle.get("mom_change", 0)
            if 0 < mom < 5:  # 仍在上涨但放缓
                signals["top_divergence"] = True
                signals["details"].append("价格仍在上涨但涨幅放缓，可能见顶")

        # 底部背离条件：衰退期 + 环比开始改善
        if cycle["stage"] == "recession":
            mom = cycle.get("mom_change", 0)
            if mom > -5:  # 跌幅收窄
                signals["bottom_divergence"] = True
                signals["details"].append("价格跌幅收窄，可能触底")

        return signals


class MemoryCAPEXCollector:
    """Memory厂商CAPEX数据采集器"""

    def __init__(self):
        self.db = Database()

        # 主要Memory厂商
        self.companies = {
            "samsung": "Samsung Electronics",
            "skhynix": "SK Hynix",
            "micron": "Micron Technology"
        }

    def fetch_capex_data(self) -> Optional[Dict]:
        """获取CAPEX数据（需要财报数据）"""
        # 模拟数据
        current_data = {
            "source": "simulated",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "fiscal_year": 2026,
            "capex_data": {
                "samsung": {
                    "capex_usd_bn": 45,
                    "yoy_change": 15,
                    "focus": "HBM扩产"
                },
                "skhynix": {
                    "capex_usd_bn": 18,
                    "yoy_change": 20,
                    "focus": "HBM3E"
                },
                "micron": {
                    "capex_usd_bn": 12,
                    "yoy_change": 10,
                    "focus": "HBM, DDR5"
                }
            },
            "total_capex_bn": 75,
            "total_yoy_change": 15,
            "outlook": "2026年CAPEX预计继续增长，AI需求驱动",
            "fetched_at": datetime.now().isoformat()
        }

        return current_data

    def collect(self, save: bool = True) -> Optional[Dict]:
        """采集Memory CAPEX数据"""
        print("[INFO] 采集Memory CAPEX数据...")

        data = self.fetch_capex_data()

        if data and save:
            self.db.insert_indicator(
                name="memory_capex",
                date=data["date"],
                value=data["total_capex_bn"],
                yoy=data["total_yoy_change"],
                source=data.get("source")
            )
            print(f"[INFO] Memory CAPEX: ${data['total_capex_bn']}B (YoY: +{data['total_yoy_change']}%)")

        return data


def main():
    """测试数据采集"""
    print("=" * 60)
    print("半导体指标数据采集器测试")
    print("=" * 60)

    # 测试DRAM价格采集
    print("\n[TEST] DRAM价格采集...")
    dram = DRAMCollector()
    dram_data = dram.collect(save=True)
    print(f"  结果: {dram_data}")

    # 测试周期阶段分析
    print("\n[TEST] DRAM周期阶段分析...")
    cycle = dram.analyze_cycle_stage()
    print(f"  周期阶段: {cycle}")

    # 测试背离信号检测
    print("\n[TEST] 背离信号检测...")
    signals = dram.check_divergence_signals()
    print(f"  信号: {signals}")

    # 测试Memory CAPEX采集
    print("\n[TEST] Memory CAPEX采集...")
    capex = MemoryCAPEXCollector()
    capex_data = capex.collect(save=True)
    print(f"  结果: {capex_data}")

    print("\n[SUCCESS] 半导体指标采集器测试完成!")


if __name__ == "__main__":
    main()
