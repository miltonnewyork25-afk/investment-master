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

    def calculate_score_energy(self, symbol: str, data: dict) -> dict:
        """计算能源股票评分"""
        pe = data.get("pe") or 0
        pb = data.get("pb") or 0
        price = data.get("price") or data.get("close") or 0
        dividend_yield = data.get("dividend_yield") or 0

        # 确定估值指标（综合石油用PB，油服用PE）
        energy_config = VALUATION_SCORING.get("energy", {})
        pb_symbols = energy_config.get("pb_symbols", ["XOM", "CVX"])

        if symbol in pb_symbols:
            # 综合石油公司，用PB估值
            valuation_score = 5
            if pb and "pb_ranges" in energy_config:
                for min_val, max_val, score in energy_config["pb_ranges"]:
                    if min_val <= pb < max_val:
                        valuation_score = score
                        break
            valuation_metric = "pb"
        else:
            # 油服公司，用PE估值
            valuation_score = 5
            if pe and "pe_ranges" in energy_config:
                for min_val, max_val, score in energy_config["pe_ranges"]:
                    if min_val <= pe < max_val:
                        valuation_score = score
                        break
            # 如果亏损（PE无效），用PB
            if not pe or pe <= 0:
                if pb and "pb_ranges" in energy_config:
                    for min_val, max_val, score in energy_config["pb_ranges"]:
                        if min_val <= pb < max_val:
                            valuation_score = score
                            break
            valuation_metric = "pe"

        # 模拟能源指标得分（实际需要WTI/钻机数数据）
        # TODO: 从指标数据库获取
        wti_price = 72.50  # 模拟
        if wti_price < 50:
            oil_score = 9
        elif wti_price < 60:
            oil_score = 7
        elif wti_price < 75:
            oil_score = 5
        elif wti_price < 90:
            oil_score = 3
        else:
            oil_score = 1

        rig_yoy = -8.5  # 模拟钻机数同比
        if rig_yoy < -30:
            rig_score = 9
        elif rig_yoy < -10:
            rig_score = 7
        elif rig_yoy < 10:
            rig_score = 5
        elif rig_yoy < 30:
            rig_score = 4
        else:
            rig_score = 2

        # 综合指标评分
        indicator_score = oil_score * 0.6 + rig_score * 0.4

        # 基础分计算
        # 权重：估值35%, 油价25%, 钻机数20%, 库存10%, CAPEX10%
        base_score = (
            valuation_score * 0.35 +
            oil_score * 0.25 +
            rig_score * 0.20 +
            5 * 0.10 +  # 库存，暂用中性
            5 * 0.10    # CAPEX，暂用中性
        ) * 10

        # 背离检测
        divergence_type, divergence_adj = self.detect_divergence(
            valuation_score, int(indicator_score)
        )

        # 特殊规则
        special_adj = 0
        special_rules = []

        # 规则1：深度价值（PB < 1.0 且股息率 > 5%）
        if pb and pb < 1.0 and dividend_yield and dividend_yield > 5:
            special_adj += 10
            special_rules.append("deep_value")

        # 规则2：油价暴跌（月跌幅超20%）
        # TODO: 需要历史数据计算
        oil_month_change = -5.2  # 模拟
        if oil_month_change < -20:
            special_adj += 5
            special_rules.append("oil_crash_opportunity")

        # 规则3：过热警告
        if wti_price > 100 and rig_yoy > 30:
            special_adj -= 10
            special_rules.append("overheating")

        # 最终得分
        final_score = base_score + divergence_adj + special_adj
        final_score = max(0, min(100, final_score))

        # 评级
        if final_score >= 80:
            rating = "积极"
            recommendation = "大幅加仓"
        elif final_score >= 65:
            rating = "观察"
            recommendation = "逐步建仓"
        elif final_score >= 50:
            rating = "中性"
            recommendation = "持有观望"
        elif final_score >= 35:
            rating = "谨慎"
            recommendation = "减仓/观望"
        else:
            rating = "消极"
            recommendation = "卖出/回避"

        return {
            "symbol": symbol,
            "industry": "energy",
            "framework_version": "v1.0",
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
                "valuation_metric": valuation_metric,
                "valuation_score": valuation_score,
                "oil_score": oil_score,
                "rig_score": rig_score,
                "wti_price": wti_price,
                "rig_yoy": rig_yoy
            }
        }

    def calculate_score_machinery(self, symbol: str, data: dict) -> dict:
        """计算工程机械股票评分"""
        pe = data.get("pe") or 0
        pb = data.get("pb") or 0
        price = data.get("price") or data.get("close") or 0
        dividend_yield = data.get("dividend_yield") or 0

        # 获取估值得分
        valuation_score = 5
        machinery_config = VALUATION_SCORING.get("machinery", {})

        # 优先使用PE
        if pe and pe > 0 and "pe_ranges" in machinery_config:
            for min_val, max_val, score in machinery_config["pe_ranges"]:
                if min_val <= pe < max_val:
                    valuation_score = score
                    break
        # 如果亏损，用PB
        elif pb and "pb_ranges" in machinery_config:
            for min_val, max_val, score in machinery_config["pb_ranges"]:
                if min_val <= pb < max_val:
                    valuation_score = score
                    break

        # 模拟行业指标得分（实际需要从指标数据库获取）
        # TODO: 从指标数据库获取
        excavator_yoy = 2.3  # 模拟全球挖掘机销量同比
        if excavator_yoy < -30:
            excavator_score = 9
        elif excavator_yoy < -15:
            excavator_score = 8
        elif excavator_yoy < 0:
            excavator_score = 6
        elif excavator_yoy < 15:
            excavator_score = 5
        elif excavator_yoy < 30:
            excavator_score = 3
        else:
            excavator_score = 1

        construction_yoy = 4.5  # 模拟建筑支出同比
        if construction_yoy < -10:
            construction_score = 8
        elif construction_yoy < 0:
            construction_score = 6
        elif construction_yoy < 5:
            construction_score = 5
        elif construction_yoy < 15:
            construction_score = 4
        else:
            construction_score = 2

        utilization = 75.0  # 模拟设备利用率
        if utilization < 55:
            utilization_score = 9
        elif utilization < 65:
            utilization_score = 7
        elif utilization < 75:
            utilization_score = 5
        elif utilization < 85:
            utilization_score = 3
        else:
            utilization_score = 1

        backlog_yoy = 6.8  # 模拟积压订单同比
        if backlog_yoy < -20:
            backlog_score = 8
        elif backlog_yoy < -5:
            backlog_score = 6
        elif backlog_yoy < 10:
            backlog_score = 5
        elif backlog_yoy < 25:
            backlog_score = 4
        else:
            backlog_score = 2

        # 综合指标评分
        indicator_score = (
            excavator_score * 0.35 +
            construction_score * 0.25 +
            utilization_score * 0.25 +
            backlog_score * 0.15
        )

        # 基础分计算
        base_score = (
            valuation_score * 0.30 +
            excavator_score * 0.25 +
            construction_score * 0.20 +
            utilization_score * 0.15 +
            backlog_score * 0.10
        ) * 10

        # 背离检测
        divergence_type, divergence_adj = self.detect_divergence(
            valuation_score, int(indicator_score)
        )

        # 特殊规则
        special_adj = 0
        special_rules = []

        # 规则1：基建刺激（假设无）
        infrastructure_stimulus = False
        if infrastructure_stimulus:
            special_adj += 10
            special_rules.append("infrastructure_stimulus")

        # 规则2：中国市场疲软
        china_excavator_yoy = -8.5  # 模拟
        if china_excavator_yoy < -30:
            special_adj -= 5
            special_rules.append("china_slowdown")

        # 规则3：股息率加分
        if dividend_yield and dividend_yield > 3:
            special_adj += 2
            special_rules.append("dividend_bonus")
        elif dividend_yield and dividend_yield > 2:
            special_adj += 1
            special_rules.append("dividend_bonus_small")

        # 最终得分
        final_score = base_score + divergence_adj + special_adj
        final_score = max(0, min(100, final_score))

        # 评级
        if final_score >= 80:
            rating = "积极"
            recommendation = "大幅加仓"
        elif final_score >= 65:
            rating = "观察"
            recommendation = "逐步建仓"
        elif final_score >= 50:
            rating = "中性"
            recommendation = "持有观望"
        elif final_score >= 35:
            rating = "谨慎"
            recommendation = "减仓/观望"
        else:
            rating = "消极"
            recommendation = "卖出/回避"

        return {
            "symbol": symbol,
            "industry": "machinery",
            "framework_version": "v1.0",
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
                "excavator_score": excavator_score,
                "construction_score": construction_score,
                "utilization_score": utilization_score,
                "backlog_score": backlog_score,
                "excavator_yoy": excavator_yoy,
                "utilization": utilization
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
        elif industry == "energy":
            return self.calculate_score_energy(symbol, data)
        elif industry == "machinery":
            return self.calculate_score_machinery(symbol, data)
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
