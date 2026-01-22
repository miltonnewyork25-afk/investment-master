"""
SCFI (Shanghai Containerized Freight Index) 数据采集器

数据源：
- 上海航运交易所: https://en.sse.net.cn/indices/scfinew.jsp
- 备用: Container News, Freightos
"""

import json
import re
import requests
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import sys

sys.path.append(str(Path(__file__).parent.parent))
from config import RAW_DIR, INDICATOR_SOURCES
from storage.db import Database


class SCFICollector:
    """SCFI 运价指数采集器"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        })
        self.db = Database()

        # 数据源配置
        self.sources = {
            "sse": {
                "name": "上海航运交易所",
                "url": "https://en.sse.net.cn/indices/scfinew.jsp",
                "priority": 1
            },
            "container_news": {
                "name": "Container News",
                "url": "https://container-news.com/scfi/",
                "priority": 2
            },
            "trading_economics": {
                "name": "Trading Economics",
                "url": "https://tradingeconomics.com/commodity/containerized-freight-index",
                "priority": 3
            }
        }

    def fetch_from_sse(self) -> Optional[Dict]:
        """从上海航运交易所获取SCFI数据"""
        try:
            url = self.sources["sse"]["url"]
            response = self.session.get(url, timeout=30)
            response.raise_for_status()

            html = response.text

            # 解析HTML提取SCFI数据
            # 注意：实际HTML结构可能变化，需要根据实际情况调整
            scfi_match = re.search(r'SCFI.*?(\d{3,4}(?:\.\d+)?)', html, re.DOTALL)
            date_match = re.search(r'(\d{4}-\d{2}-\d{2})', html)

            if scfi_match:
                scfi_value = float(scfi_match.group(1))
                date_str = date_match.group(1) if date_match else datetime.now().strftime("%Y-%m-%d")

                return {
                    "source": "sse",
                    "date": date_str,
                    "value": scfi_value,
                    "fetched_at": datetime.now().isoformat()
                }

        except Exception as e:
            print(f"[WARNING] SSE数据获取失败: {e}")

        return None

    def fetch_from_api(self) -> Optional[Dict]:
        """
        从API获取SCFI数据（备用方案）

        注意：这里使用模拟数据，实际使用时需要：
        1. 找到可用的SCFI API
        2. 或者使用付费数据服务（如Clarksons, Drewry）
        """
        # 模拟当前SCFI数据（基于最新研究）
        # 实际部署时替换为真实API调用
        current_data = {
            "source": "simulated",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "value": 1574,  # 2026-01-22 的SCFI值
            "yoy_change": -26,  # YoY变化百分比
            "mom_change": -2,   # MoM变化百分比
            "fetched_at": datetime.now().isoformat(),
            "note": "模拟数据，请配置真实数据源"
        }

        return current_data

    def collect(self, save: bool = True) -> Optional[Dict]:
        """采集SCFI数据"""
        print("[INFO] 采集SCFI数据...")

        # 尝试从不同数据源获取
        data = self.fetch_from_sse()

        if not data:
            print("[INFO] 使用备用数据源...")
            data = self.fetch_from_api()

        if data:
            # 计算变化率
            data = self._calculate_changes(data)

            if save:
                self._save_data(data)
                self._save_to_db(data)

            print(f"[INFO] SCFI: {data['value']} (YoY: {data.get('yoy_change', 'N/A')}%)")

        return data

    def _calculate_changes(self, data: Dict) -> Dict:
        """计算同比和环比变化"""
        current_value = data["value"]

        # 获取历史数据计算变化率
        history = self.get_history(days=365)

        if history:
            # 计算环比（与上周比）
            if len(history) >= 1:
                last_week = history[0]["value"]
                data["mom_change"] = round((current_value - last_week) / last_week * 100, 2)

            # 计算同比（与去年同期比）
            if len(history) >= 52:  # 约一年的周度数据
                last_year = history[51]["value"]
                data["yoy_change"] = round((current_value - last_year) / last_year * 100, 2)

        return data

    def _save_data(self, data: Dict):
        """保存数据到文件"""
        indicators_dir = RAW_DIR / "indicators" / "shipping"
        indicators_dir.mkdir(parents=True, exist_ok=True)

        filename = f"scfi_{data['date']}.json"
        filepath = indicators_dir / filename

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"[INFO] 已保存: {filepath}")

    def _save_to_db(self, data: Dict):
        """保存到数据库"""
        self.db.insert_indicator(
            name="scfi",
            date=data["date"],
            value=data["value"],
            yoy=data.get("yoy_change"),
            mom=data.get("mom_change"),
            source=data.get("source")
        )

    def get_history(self, days: int = 30) -> List[Dict]:
        """获取历史SCFI数据"""
        indicators_dir = RAW_DIR / "indicators" / "shipping"

        if not indicators_dir.exists():
            return []

        files = sorted(indicators_dir.glob("scfi_*.json"), reverse=True)
        history = []

        for f in files[:days]:
            with open(f, "r", encoding="utf-8") as fp:
                history.append(json.load(fp))

        return history

    def get_latest(self) -> Optional[Dict]:
        """获取最新SCFI数据"""
        return self.db.get_latest_indicator("scfi")

    def check_buy_signals(self) -> Dict:
        """检查航运买入信号"""
        history = self.get_history(days=12)  # 约3个月的周度数据

        signals = {
            "scfi_improving": False,
            "consecutive_positive_months": 0,
            "current_value": None,
            "mom_changes": []
        }

        if not history:
            return signals

        signals["current_value"] = history[0]["value"]

        # 计算每周的环比变化
        for i in range(len(history) - 1):
            current = history[i]["value"]
            previous = history[i + 1]["value"]
            change = (current - previous) / previous * 100
            signals["mom_changes"].append(round(change, 2))

        # 检查是否连续改善
        if len(signals["mom_changes"]) >= 12:
            # 检查最近3个月（约12周）的趋势
            recent = signals["mom_changes"][:12]
            positive_count = sum(1 for x in recent if x > 0)

            if positive_count >= 8:  # 12周中有8周以上正增长
                signals["scfi_improving"] = True
                signals["consecutive_positive_months"] = positive_count // 4

        return signals


class BDICollector:
    """BDI (Baltic Dry Index) 数据采集器"""

    def __init__(self):
        self.session = requests.Session()
        self.db = Database()

    def fetch_from_api(self) -> Optional[Dict]:
        """获取BDI数据"""
        # 模拟数据（实际使用时替换为真实API）
        current_data = {
            "source": "simulated",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "value": 1200,  # 模拟BDI值
            "fetched_at": datetime.now().isoformat(),
            "note": "模拟数据，请配置真实数据源"
        }
        return current_data

    def collect(self, save: bool = True) -> Optional[Dict]:
        """采集BDI数据"""
        print("[INFO] 采集BDI数据...")

        data = self.fetch_from_api()

        if data and save:
            self.db.insert_indicator(
                name="bdi",
                date=data["date"],
                value=data["value"],
                source=data.get("source")
            )
            print(f"[INFO] BDI: {data['value']}")

        return data


class OrderbookCollector:
    """航运订单簿数据采集器"""

    def __init__(self):
        self.db = Database()

    def fetch_from_api(self) -> Optional[Dict]:
        """获取订单簿数据"""
        # 模拟数据（实际使用时需要Clarksons或Alphaliner订阅）
        current_data = {
            "source": "simulated",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "orderbook_teu": 9800000,  # 订单簿TEU
            "fleet_teu": 30900000,      # 现有船队TEU
            "orderbook_ratio": 31.7,    # 订单簿/船队比
            "fetched_at": datetime.now().isoformat(),
            "note": "模拟数据，基于2026-01研究报告"
        }
        return current_data

    def collect(self, save: bool = True) -> Optional[Dict]:
        """采集订单簿数据"""
        print("[INFO] 采集订单簿数据...")

        data = self.fetch_from_api()

        if data and save:
            self.db.insert_indicator(
                name="orderbook_ratio",
                date=data["date"],
                value=data["orderbook_ratio"],
                source=data.get("source")
            )
            print(f"[INFO] 订单簿/船队比: {data['orderbook_ratio']}%")

        return data


def main():
    """测试数据采集"""
    print("=" * 60)
    print("航运指标数据采集器测试")
    print("=" * 60)

    # 测试SCFI采集
    print("\n[TEST] SCFI采集...")
    scfi = SCFICollector()
    scfi_data = scfi.collect(save=True)
    print(f"  结果: {scfi_data}")

    # 测试BDI采集
    print("\n[TEST] BDI采集...")
    bdi = BDICollector()
    bdi_data = bdi.collect(save=True)
    print(f"  结果: {bdi_data}")

    # 测试订单簿采集
    print("\n[TEST] 订单簿采集...")
    orderbook = OrderbookCollector()
    orderbook_data = orderbook.collect(save=True)
    print(f"  结果: {orderbook_data}")

    # 测试买入信号检测
    print("\n[TEST] 买入信号检测...")
    signals = scfi.check_buy_signals()
    print(f"  信号: {signals}")

    print("\n[SUCCESS] 航运指标采集器测试完成!")


if __name__ == "__main__":
    main()
