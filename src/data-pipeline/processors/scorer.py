"""
自动评分计算器

基于 cycle-investing 框架自动计算股票评分
"""

from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, Tuple
import sys

sys.path.append(str(Path(__file__).parent.parent))
from config import VALUATION_SCORING, TRACKED_STOCKS
from storage.db import Database


class Scorer:
    """自动评分计算器"""

    def __init__(self):
        self.db = Database()

    def get_valuation_score(self, industry: str, pe: float, pb: float = None) -> int:
        """根据估值获取得分"""
        if industry not in VALUATION_SCORING:
            return 5  # 默认中性

        config = VALUATION_SCORING[industry]

        # 优先使用 PE
        if pe and "pe_ranges" in config:
            for min_val, max_val, score in config["pe_ranges"]:
                if min_val <= pe < max_val:
                    return score

        # 如果 PE 无效（如亏损），使用 PB
        if pb and "pb_ranges" in config:
            for min_val, max_val, score in config["pb_ranges"]:
                if min_val <= pb < max_val:
                    return score

        return 5

    def detect_divergence(self, valuation_score: int, indicator_score: int) -> Tuple[str, int]:
        """检测背离信号"""
        # 底部背离：估值低估 + 指标差
        if valuation_score >= 7 and indicator_score <= 3:
            return "bottom_divergence", 20

        # 顶部背离：估值高估 + 指标好
        if valuation_score <= 3 and indicator_score >= 7:
            return "top_divergence", -20

        return "none", 0

    def calculate_score_semicap(self, symbol: str, data: dict) -> dict:
        """计算半导体设备股票评分"""
        pe = data.get("pe") or 0
        pb = data.get("pb") or 0
        price = data.get("price") or data.get("close") or 0

        # 获取估值得分
        valuation_score = self.get_valuation_score("semicap", pe, pb)

        # 模拟先行指标得分（实际需要DRAM价格数据）
        # TODO: 从指标数据库获取实际DRAM数据
        indicator_score = 7  # 当前DRAM强势，假设得分7

        # 基础分计算（简化版，使用过热期权重）
        # 过热期权重：估值25%, 先行30%, 边际25%, 财务10%, 上下游10%
        base_score = (
            valuation_score * 0.25 +
            indicator_score * 0.30 +
            5 * 0.25 +  # 边际变化，暂用中性5
            5 * 0.10 +  # 财务深度，暂用中性5
            5 * 0.10    # 上下游，暂用中性5
        ) * 10  # 转换为百分制

        # 背离检测
        divergence_type, divergence_adj = self.detect_divergence(valuation_score, indicator_score)

        # 情绪调整（简化）
        sentiment_adj = 0
        if pe > 40:
            sentiment_adj = -5  # 高估时市场可能过热

        # 最终得分
        final_score = base_score + divergence_adj + sentiment_adj
        final_score = max(0, min(100, final_score))  # 限制在0-100

        # 评级
        if final_score >= 70:
            rating = "积极"
            recommendation = "买入/加仓"
        elif final_score >= 50:
            rating = "中性"
            recommendation = "持有/观望"
        elif final_score >= 30:
            rating = "谨慎"
            recommendation = "减仓/观望"
        else:
            rating = "消极"
            recommendation = "卖出/回避"

        return {
            "symbol": symbol,
            "industry": "semicap",
            "framework_version": "v5.0",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "base_score": round(base_score, 1),
            "adjustments": {
                "divergence": divergence_adj,
                "divergence_type": divergence_type,
                "sentiment": sentiment_adj
            },
            "final_score": round(final_score, 1),
            "rating": rating,
            "recommendation": recommendation,
            "data_snapshot": {
                "price": price,
                "pe": pe,
                "pb": pb,
                "valuation_score": valuation_score,
                "indicator_score": indicator_score
            }
        }

    def calculate_score_shipping(self, symbol: str, data: dict) -> dict:
        """计算航运股票评分"""
        pe = data.get("pe") or 0
        pb = data.get("pb") or 0
        price = data.get("price") or data.get("close") or 0

        # 获取估值得分
        valuation_score = self.get_valuation_score("shipping", pe, pb)

        # 模拟先行指标得分（实际需要SCFI数据）
        # TODO: 从指标数据库获取实际SCFI数据
        indicator_score = 2  # 当前供给过剩，假设得分2

        # 基础分计算（衰退期权重）
        # 衰退期权重：估值35%, 先行10%, 边际25%, 财务15%, 上下游15%
        base_score = (
            valuation_score * 0.35 +
            indicator_score * 0.10 +
            4 * 0.25 +  # 边际变化，SCFI企稳但未明显改善
            5 * 0.15 +  # 财务深度
            3 * 0.15    # 上下游，需求疲软
        ) * 10

        # 背离检测
        divergence_type, divergence_adj = self.detect_divergence(valuation_score, indicator_score)

        # v1.1 航运特殊规则
        special_adj = 0
        special_rules = []

        # 规则1：极端悲观溢价
        if valuation_score >= 8 and pb and pb < 0.5:
            special_adj += 10
            special_rules.append("extreme_pessimism_bonus")

        # 规则2：订单簿预警（假设当前订单簿31.7%）
        orderbook_ratio = 31.7  # TODO: 从数据库获取
        if orderbook_ratio > 20:
            special_adj -= 10
            special_rules.append("orderbook_warning")

        # 最终得分
        final_score = base_score + divergence_adj + special_adj
        final_score = max(0, min(100, final_score))

        # 评级
        if final_score >= 70:
            rating = "积极"
            recommendation = "买入/加仓"
        elif final_score >= 55:
            rating = "观察"
            recommendation = "小仓位试探"
        elif final_score >= 40:
            rating = "谨慎"
            recommendation = "观望"
        else:
            rating = "消极"
            recommendation = "回避"

        return {
            "symbol": symbol,
            "industry": "shipping",
            "framework_version": "v1.1",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "base_score": round(base_score, 1),
            "adjustments": {
                "divergence": divergence_adj,
                "divergence_type": divergence_type,
                "special": special_adj,
                "special_rules": special_rules
            },
            "final_score": round(final_score, 1),
            "rating": rating,
            "recommendation": recommendation,
            "data_snapshot": {
                "price": price,
                "pe": pe,
                "pb": pb,
                "valuation_score": valuation_score,
                "indicator_score": indicator_score,
                "orderbook_ratio": orderbook_ratio
            }
        }

    def calculate_score(self, symbol: str, data: dict) -> Optional[dict]:
        """计算股票评分（自动识别行业）"""
        # 识别行业
        industry = None
        for ind, config in TRACKED_STOCKS.items():
            if symbol in config["symbols"]:
                industry = ind
                break

        if not industry:
            print(f"[WARNING] 未知股票: {symbol}")
            return None

        # 根据行业调用相应的评分函数
        if industry == "semicap":
            return self.calculate_score_semicap(symbol, data)
        elif industry == "shipping":
            return self.calculate_score_shipping(symbol, data)
        else:
            print(f"[WARNING] 不支持的行业: {industry}")
            return None

    def score_and_save(self, symbol: str, data: dict) -> Optional[dict]:
        """计算评分并保存到数据库"""
        result = self.calculate_score(symbol, data)

        if result:
            self.db.insert_score(
                symbol=result["symbol"],
                date=result["date"],
                industry=result["industry"],
                version=result["framework_version"],
                base_score=result["base_score"],
                adjustments=result["adjustments"],
                final_score=result["final_score"],
                rating=result["rating"],
                recommendation=result["recommendation"],
                data_snapshot=result["data_snapshot"]
            )
            print(f"[INFO] {symbol} 评分: {result['final_score']} ({result['rating']})")

        return result

    def score_all(self, price_data: Dict[str, dict]) -> Dict[str, dict]:
        """计算所有股票评分"""
        results = {}

        for symbol, data in price_data.items():
            result = self.score_and_save(symbol, data)
            if result:
                results[symbol] = result

        return results

    def compare_with_previous(self, symbol: str, current_score: dict) -> Optional[dict]:
        """与上次评分对比"""
        history = self.db.get_score_history(symbol, limit=2)

        if len(history) < 2:
            return None

        previous = history[1]  # history[0] 是当前的
        change = current_score["final_score"] - previous["score"]

        return {
            "previous_score": previous["score"],
            "previous_rating": previous["rating"],
            "current_score": current_score["final_score"],
            "current_rating": current_score["rating"],
            "change": change,
            "significant": abs(change) >= 10
        }


def main():
    """测试评分计算"""
    print("=" * 60)
    print("评分计算器测试")
    print("=" * 60)

    scorer = Scorer()

    # 测试半导体股票
    print("\n[TEST] 计算 LRCX 评分...")
    lrcx_data = {"price": 75.50, "pe": 45.5, "pb": 8.2}
    result = scorer.calculate_score("LRCX", lrcx_data)
    print(f"  结果: {result}")

    # 测试航运股票
    print("\n[TEST] 计算 ZIM 评分...")
    zim_data = {"price": 15.0, "pe": 2.65, "pb": 0.4}
    result = scorer.calculate_score("ZIM", zim_data)
    print(f"  结果: {result}")

    print("\n[SUCCESS] 评分计算器测试完成!")


if __name__ == "__main__":
    main()
