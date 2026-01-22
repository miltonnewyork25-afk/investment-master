"""
信号检测器

检测：
- 价格异常变动
- 评分显著变化
- 买入/卖出信号触发
"""

from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
import sys

sys.path.append(str(Path(__file__).parent.parent))
from config import ALERT_THRESHOLDS, TRACKED_STOCKS
from storage.db import Database


class AlertDetector:
    """信号检测器"""

    def __init__(self):
        self.db = Database()
        self.thresholds = ALERT_THRESHOLDS

    def check_price_change(self, symbol: str, current_price: float,
                           previous_price: float) -> Optional[dict]:
        """检测价格异常变动"""
        if not previous_price or previous_price == 0:
            return None

        change_pct = (current_price - previous_price) / previous_price * 100
        abs_change = abs(change_pct)

        thresholds = self.thresholds["price_change_pct"]

        if abs_change >= thresholds["critical"]:
            severity = "critical"
        elif abs_change >= thresholds["warning"]:
            severity = "warning"
        else:
            return None

        direction = "上涨" if change_pct > 0 else "下跌"

        alert = {
            "type": "price_change",
            "symbol": symbol,
            "severity": severity,
            "message": f"{symbol} {direction} {abs(change_pct):.1f}%",
            "data": {
                "current_price": current_price,
                "previous_price": previous_price,
                "change_pct": round(change_pct, 2)
            }
        }

        # 保存预警
        self._save_alert(alert)
        return alert

    def check_score_change(self, symbol: str, current_score: float,
                           previous_score: float) -> Optional[dict]:
        """检测评分显著变化"""
        if previous_score is None:
            return None

        change = current_score - previous_score
        abs_change = abs(change)

        if abs_change < self.thresholds["score_change"]:
            return None

        direction = "上升" if change > 0 else "下降"
        severity = "warning" if abs_change < 20 else "critical"

        alert = {
            "type": "score_change",
            "symbol": symbol,
            "severity": severity,
            "message": f"{symbol} 评分{direction} {abs_change:.0f}分 ({previous_score:.0f} → {current_score:.0f})",
            "data": {
                "current_score": current_score,
                "previous_score": previous_score,
                "change": round(change, 1)
            }
        }

        self._save_alert(alert)
        return alert

    def check_buy_signals_shipping(self, indicator_data: dict) -> List[dict]:
        """检测航运买入信号"""
        alerts = []
        signals_met = 0
        total_signals = 4

        # 信号1：SCFI连续3个月环比改善
        scfi_mom = indicator_data.get("scfi_mom", [])
        if len(scfi_mom) >= 3 and all(m > 0 for m in scfi_mom[-3:]):
            signals_met += 1
            alerts.append({
                "type": "buy_signal",
                "industry": "shipping",
                "severity": "info",
                "message": "航运买入信号触发：SCFI连续3个月环比改善",
                "data": {"signal": "scfi_improvement", "values": scfi_mom[-3:]}
            })

        # 信号2：订单簿/船队比开始下降
        orderbook_trend = indicator_data.get("orderbook_trend", [])
        if len(orderbook_trend) >= 2 and orderbook_trend[-1] < orderbook_trend[-2]:
            signals_met += 1
            alerts.append({
                "type": "buy_signal",
                "industry": "shipping",
                "severity": "info",
                "message": "航运买入信号触发：订单簿/船队比开始下降",
                "data": {"signal": "orderbook_decline", "values": orderbook_trend[-2:]}
            })

        # 信号3：拆船量显著增加
        scrapping = indicator_data.get("scrapping_rate")
        if scrapping and scrapping > 2:  # 假设2%为显著
            signals_met += 1
            alerts.append({
                "type": "buy_signal",
                "industry": "shipping",
                "severity": "info",
                "message": f"航运买入信号触发：拆船率上升至{scrapping}%",
                "data": {"signal": "scrapping_increase", "value": scrapping}
            })

        # 信号4：闲置运力降至2%以下
        idle_capacity = indicator_data.get("idle_capacity")
        if idle_capacity and idle_capacity < 2:
            signals_met += 1
            alerts.append({
                "type": "buy_signal",
                "industry": "shipping",
                "severity": "info",
                "message": f"航运买入信号触发：闲置运力降至{idle_capacity}%",
                "data": {"signal": "low_idle_capacity", "value": idle_capacity}
            })

        # 汇总信号
        if signals_met >= 2:
            alerts.append({
                "type": "buy_signal_summary",
                "industry": "shipping",
                "severity": "warning",
                "message": f"航运买入信号：{signals_met}/{total_signals} 条件满足，考虑建仓",
                "data": {"signals_met": signals_met, "total": total_signals}
            })

        # 保存所有预警
        for alert in alerts:
            self._save_alert(alert)

        return alerts

    def check_sell_signals_semicap(self, score_data: dict) -> List[dict]:
        """检测半导体卖出信号"""
        alerts = []

        # 检测顶部背离
        if score_data.get("divergence_type") == "top_divergence":
            alerts.append({
                "type": "sell_signal",
                "industry": "semicap",
                "severity": "critical",
                "message": "半导体卖出信号：顶部背离触发！",
                "data": {
                    "signal": "top_divergence",
                    "valuation_score": score_data.get("valuation_score"),
                    "indicator_score": score_data.get("indicator_score")
                }
            })

        # 检测估值过高
        pe = score_data.get("pe", 0)
        if pe > 50:
            alerts.append({
                "type": "sell_signal",
                "industry": "semicap",
                "severity": "warning",
                "message": f"半导体估值警告：PE达到{pe:.1f}x，处于历史高位",
                "data": {"signal": "high_valuation", "pe": pe}
            })

        for alert in alerts:
            self._save_alert(alert)

        return alerts

    def check_pending_predictions(self) -> List[dict]:
        """检查待验证的预测"""
        alerts = []
        pending = self.db.get_pending_predictions()

        for pred in pending:
            alerts.append({
                "type": "prediction_due",
                "symbol": pred["symbol"],
                "severity": "info",
                "message": f"{pred['symbol']} 的{pred['prediction_type']}预测已到期，待验证",
                "data": pred
            })
            self._save_alert(alerts[-1])

        return alerts

    def _save_alert(self, alert: dict):
        """保存预警到数据库"""
        self.db.insert_alert(
            alert_type=alert["type"],
            severity=alert["severity"],
            message=alert["message"],
            symbol=alert.get("symbol"),
            industry=alert.get("industry"),
            data=alert.get("data")
        )

    def run_all_checks(self, price_data: Dict[str, dict],
                       score_data: Dict[str, dict],
                       indicator_data: dict = None) -> List[dict]:
        """运行所有检测"""
        all_alerts = []

        # 检查价格变动
        for symbol, data in price_data.items():
            current = data.get("current_price")
            previous = data.get("previous_price")
            if current and previous:
                alert = self.check_price_change(symbol, current, previous)
                if alert:
                    all_alerts.append(alert)

        # 检查评分变动
        for symbol, data in score_data.items():
            current = data.get("current_score")
            previous = data.get("previous_score")
            if current is not None:
                alert = self.check_score_change(symbol, current, previous)
                if alert:
                    all_alerts.append(alert)

            # 检查卖出信号（半导体）
            if data.get("industry") == "semicap":
                sell_alerts = self.check_sell_signals_semicap(data)
                all_alerts.extend(sell_alerts)

        # 检查买入信号（航运）
        if indicator_data:
            buy_alerts = self.check_buy_signals_shipping(indicator_data)
            all_alerts.extend(buy_alerts)

        # 检查待验证的预测
        prediction_alerts = self.check_pending_predictions()
        all_alerts.extend(prediction_alerts)

        return all_alerts

    def print_alerts(self, alerts: List[dict]):
        """打印预警信息"""
        if not alerts:
            print("[INFO] 无预警信息")
            return

        print("\n" + "=" * 60)
        print("预警信息汇总")
        print("=" * 60)

        # 按严重程度分组
        critical = [a for a in alerts if a["severity"] == "critical"]
        warning = [a for a in alerts if a["severity"] == "warning"]
        info = [a for a in alerts if a["severity"] == "info"]

        if critical:
            print("\n🔴 严重预警:")
            for a in critical:
                print(f"  • {a['message']}")

        if warning:
            print("\n🟡 警告:")
            for a in warning:
                print(f"  • {a['message']}")

        if info:
            print("\n🔵 信息:")
            for a in info:
                print(f"  • {a['message']}")

        print()


def main():
    """测试信号检测"""
    print("=" * 60)
    print("信号检测器测试")
    print("=" * 60)

    detector = AlertDetector()

    # 测试价格变动检测
    print("\n[TEST] 检测价格变动...")
    alert = detector.check_price_change("LRCX", 75.5, 70.0)
    if alert:
        print(f"  预警: {alert['message']}")

    # 测试评分变动检测
    print("\n[TEST] 检测评分变动...")
    alert = detector.check_score_change("LRCX", 40, 55)
    if alert:
        print(f"  预警: {alert['message']}")

    # 测试航运买入信号
    print("\n[TEST] 检测航运买入信号...")
    indicator_data = {
        "scfi_mom": [2.5, 3.1, 1.8],  # 连续正增长
        "orderbook_trend": [32, 31.5],  # 开始下降
    }
    alerts = detector.check_buy_signals_shipping(indicator_data)
    for a in alerts:
        print(f"  信号: {a['message']}")

    print("\n[SUCCESS] 信号检测器测试完成!")


if __name__ == "__main__":
    main()
