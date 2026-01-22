"""
预测管理与验证系统

功能：
- 基于评分自动生成预测
- 验证历史预测准确性
- 计算框架准确率统计
- 从错误预测中学习
"""

import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional, Tuple
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from config import TRACKED_STOCKS, DATA_DIR, PROJECT_ROOT
from storage.db import Database


class Predictor:
    """预测管理器"""

    def __init__(self):
        self.db = Database()

        # 预测周期配置
        self.prediction_horizons = {
            "3month": 90,   # 3个月
            "6month": 180,  # 6个月
        }

        # 评分到方向的映射
        self.score_direction_map = {
            (80, 100): "up",      # 积极 -> 上涨
            (60, 80): "up",       # 观察(偏积极) -> 小涨
            (40, 60): "sideways", # 中性 -> 横盘
            (20, 40): "down",     # 消极 -> 下跌
            (0, 20): "down",      # 非常消极 -> 大跌
        }

        # 评分到信心的映射
        self.score_confidence_map = {
            (80, 100): "high",
            (65, 80): "medium",
            (50, 65): "medium",
            (35, 50): "medium",
            (20, 35): "medium",
            (0, 20): "high",  # 极端评分也有高信心
        }

    def generate_predictions(self) -> List[Dict]:
        """
        基于当前评分生成预测

        Returns:
            生成的预测列表
        """
        print("\n[TASK] 生成预测...")

        predictions = []
        today = datetime.now().strftime("%Y-%m-%d")

        for industry, config in TRACKED_STOCKS.items():
            for symbol in config["symbols"]:
                score = self.db.get_latest_score(symbol)

                if not score:
                    print(f"  [SKIP] {symbol}: 无评分数据")
                    continue

                final_score = score["final_score"]

                # 获取预测方向和信心
                direction = self._score_to_direction(final_score)
                confidence = self._score_to_confidence(final_score)

                # 生成不同周期的预测
                for horizon_name, days in self.prediction_horizons.items():
                    target_date = (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")

                    # 检查是否已存在该预测
                    existing = self._check_existing_prediction(symbol, today, horizon_name)
                    if existing:
                        print(f"  [SKIP] {symbol} {horizon_name}: 今日已有预测")
                        continue

                    # 插入预测
                    self.db.insert_prediction(
                        symbol=symbol,
                        prediction_date=today,
                        prediction_type=horizon_name,
                        direction=direction,
                        score=final_score,
                        confidence=confidence,
                        target_date=target_date
                    )

                    pred = {
                        "symbol": symbol,
                        "prediction_date": today,
                        "type": horizon_name,
                        "direction": direction,
                        "score": final_score,
                        "confidence": confidence,
                        "target_date": target_date
                    }
                    predictions.append(pred)

                    print(f"  [NEW] {symbol} {horizon_name}: 预测{direction} (得分{final_score}, 信心{confidence})")

        print(f"\n[DONE] 生成 {len(predictions)} 条新预测")
        return predictions

    def verify_predictions(self) -> Dict:
        """
        验证到期的预测

        Returns:
            验证结果统计
        """
        print("\n[TASK] 验证预测...")

        # 获取待验证预测
        pending = self.db.get_pending_predictions()

        if not pending:
            print("  无待验证预测")
            return {"verified": 0, "correct": 0, "incorrect": 0}

        print(f"  找到 {len(pending)} 条待验证预测")

        verified = 0
        correct = 0
        incorrect = 0

        for pred in pending:
            symbol = pred["symbol"]
            pred_date = pred["prediction_date"]
            pred_type = pred["prediction_type"]
            predicted_direction = pred["predicted_direction"]

            # 获取预测时的价格
            pred_price_data = self._get_price_at_date(symbol, pred_date)
            if not pred_price_data:
                print(f"  [SKIP] {symbol}: 无法获取预测日价格")
                continue

            pred_price = pred_price_data["close"]

            # 获取当前/目标日期的价格
            current_price_data = self.db.get_latest_price(symbol)
            if not current_price_data:
                print(f"  [SKIP] {symbol}: 无法获取当前价格")
                continue

            current_price = current_price_data["close"]

            # 计算实际变化
            price_change = (current_price - pred_price) / pred_price * 100

            # 判断实际方向
            if price_change > 5:
                actual_direction = "up"
            elif price_change < -5:
                actual_direction = "down"
            else:
                actual_direction = "sideways"

            # 判断预测是否正确
            is_correct = self._is_prediction_correct(
                predicted_direction, actual_direction, price_change
            )

            # 生成备注
            notes = f"预测价格: ${pred_price:.2f}, 实际价格: ${current_price:.2f}, 变化: {price_change:.1f}%"

            # 更新数据库
            self.db.update_prediction_result(
                symbol=symbol,
                prediction_date=pred_date,
                prediction_type=pred_type,
                actual_price=current_price,
                actual_direction=actual_direction,
                is_correct=is_correct,
                notes=notes
            )

            verified += 1
            if is_correct:
                correct += 1
                status = "✓"
            else:
                incorrect += 1
                status = "✗"

            print(f"  [{status}] {symbol} ({pred_type}): 预测{predicted_direction} vs 实际{actual_direction} ({price_change:+.1f}%)")

        result = {
            "verified": verified,
            "correct": correct,
            "incorrect": incorrect,
            "accuracy": round(correct / verified * 100, 1) if verified > 0 else 0
        }

        print(f"\n[DONE] 验证完成: {correct}/{verified} 正确 ({result['accuracy']}%)")
        return result

    def get_accuracy_report(self) -> Dict:
        """
        生成准确率报告

        Returns:
            详细的准确率统计
        """
        print("\n[TASK] 生成准确率报告...")

        report = {
            "overall": self.db.get_accuracy_stats(),
            "by_symbol": {},
            "by_industry": {},
            "by_horizon": {},
            "by_direction": {}
        }

        # 按股票统计
        for industry, config in TRACKED_STOCKS.items():
            for symbol in config["symbols"]:
                stats = self.db.get_accuracy_stats(symbol)
                if stats["total"] > 0:
                    report["by_symbol"][symbol] = stats

        # 详细统计需要直接查询数据库
        conn = self.db._connect()
        cursor = conn.cursor()

        # 按行业统计
        for industry in TRACKED_STOCKS.keys():
            symbols = TRACKED_STOCKS[industry]["symbols"]
            placeholders = ",".join("?" * len(symbols))
            cursor.execute(f"""
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
                FROM predictions
                WHERE symbol IN ({placeholders}) AND is_correct IS NOT NULL
            """, symbols)
            row = cursor.fetchone()
            if row[0] > 0:
                report["by_industry"][industry] = {
                    "total": row[0],
                    "correct": row[1] or 0,
                    "accuracy": round((row[1] or 0) / row[0] * 100, 1)
                }

        # 按预测周期统计
        for horizon in self.prediction_horizons.keys():
            cursor.execute("""
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
                FROM predictions
                WHERE prediction_type = ? AND is_correct IS NOT NULL
            """, (horizon,))
            row = cursor.fetchone()
            if row[0] > 0:
                report["by_horizon"][horizon] = {
                    "total": row[0],
                    "correct": row[1] or 0,
                    "accuracy": round((row[1] or 0) / row[0] * 100, 1)
                }

        # 按预测方向统计
        for direction in ["up", "down", "sideways"]:
            cursor.execute("""
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
                FROM predictions
                WHERE predicted_direction = ? AND is_correct IS NOT NULL
            """, (direction,))
            row = cursor.fetchone()
            if row[0] > 0:
                report["by_direction"][direction] = {
                    "total": row[0],
                    "correct": row[1] or 0,
                    "accuracy": round((row[1] or 0) / row[0] * 100, 1)
                }

        conn.close()

        # 打印报告
        self._print_accuracy_report(report)

        return report

    def analyze_errors(self) -> List[Dict]:
        """
        分析错误预测

        Returns:
            错误分析列表
        """
        print("\n[TASK] 分析错误预测...")

        conn = self.db._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM predictions
            WHERE is_correct = 0
            ORDER BY prediction_date DESC
        """)

        rows = cursor.fetchall()
        conn.close()

        columns = ["id", "symbol", "prediction_date", "prediction_type",
                   "predicted_direction", "predicted_score", "confidence",
                   "target_date", "actual_price", "actual_direction",
                   "is_correct", "reviewed_at", "notes", "created_at"]

        errors = []
        for row in rows:
            error = dict(zip(columns, row))

            # 分析错误原因
            analysis = self._analyze_error(error)
            error["analysis"] = analysis

            errors.append(error)

            print(f"  [{error['symbol']}] {error['prediction_date']} {error['prediction_type']}")
            print(f"      预测: {error['predicted_direction']} (得分{error['predicted_score']})")
            print(f"      实际: {error['actual_direction']}")
            print(f"      分析: {analysis}")

        print(f"\n[DONE] 分析 {len(errors)} 条错误预测")
        return errors

    def _score_to_direction(self, score: float) -> str:
        """将评分转换为预测方向"""
        for (low, high), direction in self.score_direction_map.items():
            if low <= score < high:
                return direction
        return "sideways"

    def _score_to_confidence(self, score: float) -> str:
        """将评分转换为信心水平"""
        for (low, high), confidence in self.score_confidence_map.items():
            if low <= score < high:
                return confidence
        return "medium"

    def _check_existing_prediction(self, symbol: str, date: str, pred_type: str) -> bool:
        """检查是否已存在预测"""
        conn = self.db._connect()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id FROM predictions
            WHERE symbol = ? AND prediction_date = ? AND prediction_type = ?
        """, (symbol, date, pred_type))

        exists = cursor.fetchone() is not None
        conn.close()
        return exists

    def _get_price_at_date(self, symbol: str, date: str) -> Optional[Dict]:
        """获取指定日期的价格"""
        conn = self.db._connect()
        cursor = conn.cursor()

        # 尝试获取精确日期，如果没有则获取最近的
        cursor.execute("""
            SELECT date, close FROM prices
            WHERE symbol = ? AND date <= ?
            ORDER BY date DESC LIMIT 1
        """, (symbol, date))

        row = cursor.fetchone()
        conn.close()

        if row:
            return {"date": row[0], "close": row[1]}
        return None

    def _is_prediction_correct(self, predicted: str, actual: str, change_pct: float) -> bool:
        """
        判断预测是否正确

        规则：
        - 预测上涨，实际涨幅 > 0: 正确
        - 预测下跌，实际跌幅 > 0: 正确
        - 预测横盘，实际变化 < 5%: 正确
        - 其他情况: 错误
        """
        if predicted == "up":
            return change_pct > 0
        elif predicted == "down":
            return change_pct < 0
        else:  # sideways
            return abs(change_pct) < 5

    def _analyze_error(self, error: Dict) -> str:
        """分析错误原因"""
        predicted = error["predicted_direction"]
        actual = error["actual_direction"]
        score = error["predicted_score"]

        # 分析模式
        if predicted == "up" and actual == "down":
            if score > 70:
                return "过于乐观：高分但实际下跌，可能忽略了风险信号"
            else:
                return "中性偏多但实际下跌，市场情绪可能比预期更差"
        elif predicted == "down" and actual == "up":
            if score < 30:
                return "过于悲观：低分但实际上涨，可能低估了反弹力度"
            else:
                return "中性偏空但实际上涨，市场情绪可能比预期更好"
        elif predicted == "sideways":
            return f"预测横盘但实际{'上涨' if actual == 'up' else '下跌'}，市场波动超预期"
        else:
            return "预测方向与实际不符"

    def _print_accuracy_report(self, report: Dict):
        """打印准确率报告"""
        print("\n" + "=" * 60)
        print("预测准确率报告")
        print("=" * 60)

        # 总体
        overall = report["overall"]
        print(f"\n📊 总体准确率: {overall['correct']}/{overall['total']} ({overall['accuracy']}%)")

        # 按股票
        if report["by_symbol"]:
            print("\n📈 按股票:")
            for symbol, stats in report["by_symbol"].items():
                print(f"  {symbol}: {stats['correct']}/{stats['total']} ({stats['accuracy']}%)")

        # 按行业
        if report["by_industry"]:
            print("\n🏭 按行业:")
            for industry, stats in report["by_industry"].items():
                print(f"  {industry}: {stats['correct']}/{stats['total']} ({stats['accuracy']}%)")

        # 按周期
        if report["by_horizon"]:
            print("\n📅 按预测周期:")
            for horizon, stats in report["by_horizon"].items():
                print(f"  {horizon}: {stats['correct']}/{stats['total']} ({stats['accuracy']}%)")

        # 按方向
        if report["by_direction"]:
            print("\n↕️ 按预测方向:")
            for direction, stats in report["by_direction"].items():
                direction_cn = {"up": "上涨", "down": "下跌", "sideways": "横盘"}.get(direction, direction)
                print(f"  {direction_cn}: {stats['correct']}/{stats['total']} ({stats['accuracy']}%)")

        print("\n" + "=" * 60)


def main():
    """测试预测系统"""
    predictor = Predictor()

    # 生成预测
    predictor.generate_predictions()

    # 验证预测
    predictor.verify_predictions()

    # 生成报告
    predictor.get_accuracy_report()


if __name__ == "__main__":
    main()
