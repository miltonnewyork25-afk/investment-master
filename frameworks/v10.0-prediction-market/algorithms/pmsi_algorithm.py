"""
PMSI预测市场情绪指数算法 (Prediction Market Sentiment Index)
v10.0预测市场增强框架核心算法

功能：基于预测市场概率构建前瞻性情绪指数，提供情绪量化分析
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import logging

class PMSICalculator:
    """PMSI预测市场情绪指数计算器"""

    def __init__(self, config: Dict = None):
        """
        初始化PMSI计算器

        Args:
            config: 配置字典，包含权重和参数设置
        """
        self.config = config or {}

        # 默认权重配置
        self.weights = self.config.get('weights', {
            'geopolitical': 0.35,    # 地缘政治权重35%
            'industry_cycle': 0.25,  # 行业周期权重25%
            'technology': 0.20,      # 技术竞争权重20%
            'demand_drivers': 0.20   # 需求驱动权重20%
        })

        # 历史数据存储
        self.historical_data = []
        self.correlation_cache = {}

        # 日志配置
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def calculate_pmsi(self, events_data: Dict, symbol: str = "TSM") -> Tuple[float, Dict]:
        """
        计算PMSI指数

        Args:
            events_data: 预测市场事件概率数据
            symbol: 股票代码

        Returns:
            Tuple[float, Dict]: (PMSI指数值, 各模块得分详情)
        """
        try:
            # 计算各模块得分
            pmsi_components = self._calculate_components(events_data)

            # 综合PMSI计算
            total_pmsi = sum(
                pmsi_components[component] * self.weights[component]
                for component in pmsi_components
            )

            # 存储历史数据
            self._store_historical_data(total_pmsi, pmsi_components, symbol)

            self.logger.info(f"PMSI-{symbol}计算完成: {total_pmsi:.1f}")

            return total_pmsi, pmsi_components

        except Exception as e:
            self.logger.error(f"PMSI计算失败: {e}")
            raise

    def _calculate_components(self, events_data: Dict) -> Dict[str, float]:
        """计算PMSI各组成模块"""

        components = {}

        # 地缘政治模块 (分数越高越乐观)
        components['geopolitical'] = self._calculate_geopolitical_score(events_data)

        # 行业周期模块
        components['industry_cycle'] = self._calculate_industry_cycle_score(events_data)

        # 技术竞争模块
        components['technology'] = self._calculate_technology_score(events_data)

        # 需求驱动模块
        components['demand_drivers'] = self._calculate_demand_drivers_score(events_data)

        return components

    def _calculate_geopolitical_score(self, events_data: Dict) -> float:
        """
        计算地缘政治模块得分

        权重分配：
        - 台海冲突概率: 60% (负向)
        - 贸易制裁概率: 40% (负向)
        """
        taiwan_prob = events_data.get('taiwan_conflict_prob', 0.183)
        sanctions_prob = events_data.get('trade_sanctions_prob', 0.342)

        # 转换为乐观度得分 (概率越低越乐观)
        geopolitical_score = (
            (1 - taiwan_prob) * 0.6 +
            (1 - sanctions_prob) * 0.4
        ) * 100

        return geopolitical_score

    def _calculate_industry_cycle_score(self, events_data: Dict) -> float:
        """
        计算行业周期模块得分

        权重分配：
        - 半导体增长概率: 70% (正向)
        - 产能利用率概率: 30% (正向)
        """
        growth_prob = events_data.get('semiconductor_growth_prob', 0.678)
        capacity_prob = events_data.get('capacity_utilization_prob', 0.824)

        cycle_score = (
            growth_prob * 0.7 +
            capacity_prob * 0.3
        ) * 100

        return cycle_score

    def _calculate_technology_score(self, events_data: Dict) -> float:
        """
        计算技术竞争模块得分

        权重分配：
        - TSM技术领先概率: 80% (正向)
        - 中国自给率概率: 20% (负向)
        """
        leadership_prob = events_data.get('tsm_leadership_prob', 0.921)
        china_selfsuff_prob = events_data.get('china_self_sufficiency_prob', 0.286)

        tech_score = (
            leadership_prob * 0.8 +
            (1 - china_selfsuff_prob) * 0.2
        ) * 100

        return tech_score

    def _calculate_demand_drivers_score(self, events_data: Dict) -> float:
        """
        计算需求驱动模块得分

        权重分配：
        - AI需求增长概率: 60% (正向)
        - 数据中心扩张概率: 40% (正向)
        """
        ai_demand_prob = events_data.get('ai_demand_growth_prob', 0.734)
        datacenter_prob = events_data.get('datacenter_expansion_prob', 0.689)

        demand_score = (
            ai_demand_prob * 0.6 +
            datacenter_prob * 0.4
        ) * 100

        return demand_score

    def calculate_historical_correlation(self, stock_prices: List[float], days: int = 90) -> float:
        """
        计算PMSI与股价的历史相关性

        Args:
            stock_prices: 股价历史数据
            days: 计算天数

        Returns:
            float: 相关系数
        """
        if len(self.historical_data) < days or len(stock_prices) < days:
            return 0.0

        # 提取最近N天的PMSI数据
        recent_pmsi = [data['pmsi'] for data in self.historical_data[-days:]]
        recent_prices = stock_prices[-days:]

        if len(recent_pmsi) != len(recent_prices):
            return 0.0

        # 计算相关系数
        correlation = np.corrcoef(recent_pmsi, recent_prices)[0, 1]

        return correlation if not np.isnan(correlation) else 0.0

    def get_pmsi_percentile(self, current_pmsi: float, days: int = 252) -> float:
        """
        计算当前PMSI在历史分布中的分位数

        Args:
            current_pmsi: 当前PMSI值
            days: 历史天数

        Returns:
            float: 分位数 (0-1)
        """
        if len(self.historical_data) < 30:
            return 0.5  # 数据不足时返回中位数

        historical_pmsi = [data['pmsi'] for data in self.historical_data[-days:]]

        if not historical_pmsi:
            return 0.5

        percentile = (np.sum(np.array(historical_pmsi) < current_pmsi) / len(historical_pmsi))

        return percentile

    def generate_signal(self, current_pmsi: float, symbol: str = "TSM") -> Dict:
        """
        基于PMSI生成投资信号

        Args:
            current_pmsi: 当前PMSI值
            symbol: 股票代码

        Returns:
            Dict: 信号详情
        """
        percentile = self.get_pmsi_percentile(current_pmsi)

        # 信号判断逻辑
        if current_pmsi >= 80 and percentile >= 0.85:
            signal = "STRONG_BULLISH"
            confidence = 0.9
        elif current_pmsi >= 70 and percentile >= 0.7:
            signal = "BULLISH"
            confidence = 0.75
        elif current_pmsi <= 30 and percentile <= 0.15:
            signal = "STRONG_BEARISH"
            confidence = 0.9
        elif current_pmsi <= 40 and percentile <= 0.3:
            signal = "BEARISH"
            confidence = 0.75
        else:
            signal = "NEUTRAL"
            confidence = 0.6

        return {
            'signal': signal,
            'confidence': confidence,
            'pmsi_value': current_pmsi,
            'historical_percentile': percentile,
            'recommendation': self._generate_recommendation(signal, confidence)
        }

    def _generate_recommendation(self, signal: str, confidence: float) -> str:
        """生成投资建议"""
        recommendations = {
            "STRONG_BULLISH": f"强烈建议增持，置信度{confidence:.0%}",
            "BULLISH": f"建议增持，置信度{confidence:.0%}",
            "NEUTRAL": f"维持当前仓位，置信度{confidence:.0%}",
            "BEARISH": f"建议减持，置信度{confidence:.0%}",
            "STRONG_BEARISH": f"强烈建议减持，置信度{confidence:.0%}"
        }

        return recommendations.get(signal, "无明确建议")

    def _store_historical_data(self, pmsi: float, components: Dict, symbol: str):
        """存储历史数据"""
        data_point = {
            'timestamp': datetime.now(),
            'symbol': symbol,
            'pmsi': pmsi,
            'components': components.copy()
        }

        self.historical_data.append(data_point)

        # 保持最近1年的数据
        if len(self.historical_data) > 365:
            self.historical_data = self.historical_data[-365:]

    def export_historical_data(self, filename: str = None) -> pd.DataFrame:
        """导出历史数据为DataFrame"""
        if not self.historical_data:
            return pd.DataFrame()

        df_data = []
        for data in self.historical_data:
            row = {
                'timestamp': data['timestamp'],
                'symbol': data['symbol'],
                'pmsi': data['pmsi']
            }
            row.update(data['components'])
            df_data.append(row)

        df = pd.DataFrame(df_data)

        if filename:
            df.to_csv(filename, index=False)
            self.logger.info(f"历史数据已导出至: {filename}")

        return df

# 使用示例
if __name__ == "__main__":
    # 初始化PMSI计算器
    pmsi_calc = PMSICalculator()

    # 示例数据 - TSM相关预测市场概率
    sample_events = {
        'taiwan_conflict_prob': 0.183,      # 台海冲突概率18.3%
        'trade_sanctions_prob': 0.342,       # 贸易制裁概率34.2%
        'tsm_leadership_prob': 0.921,        # TSM技术领先概率92.1%
        'semiconductor_growth_prob': 0.678,  # 半导体增长概率67.8%
        'ai_demand_growth_prob': 0.734,      # AI需求增长概率73.4%
        'china_self_sufficiency_prob': 0.286,# 中国自给率概率28.6%
        'capacity_utilization_prob': 0.824,  # 产能利用率概率82.4%
        'datacenter_expansion_prob': 0.689   # 数据中心扩张概率68.9%
    }

    # 计算PMSI
    pmsi_value, components = pmsi_calc.calculate_pmsi(sample_events, "TSM")

    print(f"PMSI-TSM指数: {pmsi_value:.1f}")
    print("模块得分详情:")
    for module, score in components.items():
        print(f"  {module}: {score:.1f}")

    # 生成投资信号
    signal_info = pmsi_calc.generate_signal(pmsi_value, "TSM")
    print(f"\n投资信号: {signal_info}")