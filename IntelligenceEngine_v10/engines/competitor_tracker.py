"""
Engine 5: Competitor Tracker
监控竞品销量、技术参数、价格、市场份额
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import yfinance as yf
import requests
from dataclasses import dataclass
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class CompetitorData:
    """竞品数据结构"""
    ticker: str
    name: str
    market: str
    deliveries: Optional[int] = None
    yoy_growth: Optional[float] = None
    avg_price: Optional[float] = None
    price_change: Optional[float] = None
    range_km: Optional[int] = None
    charging_speed: Optional[int] = None
    autonomy_level: Optional[int] = None
    market_share: Optional[float] = None


class CompetitorTracker:
    """竞品追踪引擎"""

    # 硬编码竞品清单
    COMPETITORS = {
        'BYD': {
            'ticker': '002594.SZ',
            'name': 'BYD',
            'market': 'China',
            'ev_models': ['Han EV', 'Tang EV', 'Yuan Plus', 'Seal']
        },
        'XPEV': {
            'ticker': 'XPEV',
            'name': 'XPeng',
            'market': 'China+US',
            'ev_models': ['G9', 'P7', 'G6', 'X9']
        },
        'NIO': {
            'ticker': 'NIO',
            'name': 'NIO',
            'market': 'China',
            'ev_models': ['ET7', 'ET5', 'EC6', 'ES6']
        },
        'RIVN': {
            'ticker': 'RIVN',
            'name': 'Rivian',
            'market': 'US',
            'ev_models': ['R1T', 'R1S', 'EDV']
        },
        'LCID': {
            'ticker': 'LCID',
            'name': 'Lucid',
            'market': 'US',
            'ev_models': ['Air']
        }
    }

    # 技术参数基准（2026年数据）
    TECH_SPECS = {
        'TSLA': {'range_km': 650, 'charging_kw': 250, 'autonomy': 4},
        'BYD': {'range_km': 700, 'charging_kw': 170, 'autonomy': 2},
        'XPEV': {'range_km': 702, 'charging_kw': 480, 'autonomy': 3},
        'NIO': {'range_km': 1000, 'charging_kw': 150, 'autonomy': 2},
        'RIVN': {'range_km': 560, 'charging_kw': 220, 'autonomy': 2},
        'LCID': {'range_km': 830, 'charging_kw': 350, 'autonomy': 2}
    }

    def __init__(self, base_ticker: str = 'TSLA'):
        """
        初始化竞品追踪器

        Args:
            base_ticker: 基准公司ticker（默认Tesla）
        """
        self.base_ticker = base_ticker
        self.logger = logger

    def fetch_delivery_data(self, ticker: str) -> Dict:
        """
        获取交付量数据

        Args:
            ticker: 股票代码

        Returns:
            交付量数据字典
        """
        try:
            # 实际应用中应该从各公司IR页面或新闻爬取
            # 这里使用模拟数据演示结构

            # 2025 Q4 实际交付数据（部分）
            q4_2025_deliveries = {
                'TSLA': {'deliveries': 495570, 'yoy': 0.022},  # +2.2% YoY
                'BYD': {'deliveries': 500000, 'yoy': 0.35},    # +35% YoY (估计)
                'XPEV': {'deliveries': 32000, 'yoy': 0.28},    # +28% YoY
                'NIO': {'deliveries': 23000, 'yoy': -0.03},    # -3% YoY
                'RIVN': {'deliveries': 14000, 'yoy': 0.75},    # +75% YoY
                'LCID': {'deliveries': 2390, 'yoy': 0.50}      # +50% YoY
            }

            data = q4_2025_deliveries.get(ticker, {})

            self.logger.info(f"Fetched delivery data for {ticker}: {data}")
            return data

        except Exception as e:
            self.logger.error(f"Error fetching delivery data for {ticker}: {e}")
            return {}

    def fetch_price_data(self, ticker: str) -> Dict:
        """
        获取价格数据

        Args:
            ticker: 股票代码

        Returns:
            价格数据字典
        """
        try:
            # 平均售价（ASP）数据
            asp_data = {
                'TSLA': {'asp': 45000, 'change_qoq': -0.05},   # -5% QoQ降价
                'BYD': {'asp': 30000, 'change_qoq': -0.02},    # -2% QoQ
                'XPEV': {'asp': 32000, 'change_qoq': -0.08},   # -8% QoQ
                'NIO': {'asp': 48000, 'change_qoq': 0.0},      # 持平
                'RIVN': {'asp': 75000, 'change_qoq': -0.03},   # -3% QoQ
                'LCID': {'asp': 85000, 'change_qoq': 0.0}      # 持平
            }

            data = asp_data.get(ticker, {})

            self.logger.info(f"Fetched price data for {ticker}: {data}")
            return data

        except Exception as e:
            self.logger.error(f"Error fetching price data for {ticker}: {e}")
            return {}

    def calculate_market_share(self, deliveries: Dict[str, int]) -> Dict[str, float]:
        """
        计算市场份额

        Args:
            deliveries: 各公司交付量字典

        Returns:
            市场份额字典
        """
        total = sum(deliveries.values())
        if total == 0:
            return {}

        market_share = {k: v / total for k, v in deliveries.items()}

        self.logger.info(f"Market share calculated: {market_share}")
        return market_share

    def compare_tech_specs(self) -> pd.DataFrame:
        """
        对比技术参数

        Returns:
            技术参数对比DataFrame
        """
        specs_list = []

        for ticker, specs in self.TECH_SPECS.items():
            specs_list.append({
                'Ticker': ticker,
                'Range (km)': specs['range_km'],
                'Charging Speed (kW)': specs['charging_kw'],
                'Autonomy Level': specs['autonomy'],
                'Range vs TSLA (%)': (specs['range_km'] / self.TECH_SPECS['TSLA']['range_km'] - 1) * 100,
                'Charging vs TSLA (%)': (specs['charging_kw'] / self.TECH_SPECS['TSLA']['charging_kw'] - 1) * 100
            })

        df = pd.DataFrame(specs_list)

        self.logger.info(f"Tech specs comparison:\n{df}")
        return df

    def get_competitive_positioning(self) -> pd.DataFrame:
        """
        获取竞争定位（价格 vs 性能矩阵）

        Returns:
            竞争定位DataFrame
        """
        positioning = []

        for comp_name, comp_info in self.COMPETITORS.items():
            ticker = comp_info['ticker'].split('.')[0] if '.' in comp_info['ticker'] else comp_info['ticker']

            # 使用公司名称（comp_name）作为查找key，而不是ticker
            delivery_data = self.fetch_delivery_data(comp_name)
            price_data = self.fetch_price_data(comp_name)
            tech_specs = self.TECH_SPECS.get(comp_name, {})

            positioning.append({
                'Company': comp_name,
                'Ticker': ticker,
                'Market': comp_info['market'],
                'Q4 2025 Deliveries': delivery_data.get('deliveries', 0),
                'YoY Growth': delivery_data.get('yoy', 0),
                'Avg Price ($)': price_data.get('asp', 0),
                'Price Change (QoQ)': price_data.get('change_qoq', 0),
                'Range (km)': tech_specs.get('range_km', 0),
                'Charging (kW)': tech_specs.get('charging_kw', 0),
                'Autonomy': tech_specs.get('autonomy', 0)
            })

        # 添加Tesla数据
        tsla_delivery = self.fetch_delivery_data('TSLA')
        tsla_price = self.fetch_price_data('TSLA')
        tsla_tech = self.TECH_SPECS.get('TSLA', {})

        positioning.append({
            'Company': 'Tesla',
            'Ticker': 'TSLA',
            'Market': 'Global',
            'Q4 2025 Deliveries': tsla_delivery.get('deliveries', 0),
            'YoY Growth': tsla_delivery.get('yoy', 0),
            'Avg Price ($)': tsla_price.get('asp', 0),
            'Price Change (QoQ)': tsla_price.get('change_qoq', 0),
            'Range (km)': tsla_tech.get('range_km', 0),
            'Charging (kW)': tsla_tech.get('charging_kw', 0),
            'Autonomy': tsla_tech.get('autonomy', 0)
        })

        df = pd.DataFrame(positioning)

        # 计算市场份额
        deliveries = df.set_index('Ticker')['Q4 2025 Deliveries'].to_dict()
        market_share = self.calculate_market_share(deliveries)
        df['Market Share (%)'] = df['Ticker'].map(market_share) * 100

        # 按交付量排序
        df = df.sort_values('Q4 2025 Deliveries', ascending=False)

        self.logger.info(f"Competitive positioning:\n{df}")
        return df

    def calculate_competitive_pressure_score(self) -> Dict[str, float]:
        """
        计算竞争压力评分（0-100）

        Returns:
            竞争压力评分字典
        """
        df = self.get_competitive_positioning()

        # 获取Tesla数据
        tsla_row = df[df['Ticker'] == 'TSLA'].iloc[0] if 'TSLA' in df['Ticker'].values else None

        if tsla_row is None:
            self.logger.warning("Tesla data not found in positioning data")
            return {}

        scores = {}

        # 评分维度
        # 1. 销量增速压力（30%）
        tsla_growth = tsla_row['YoY Growth']
        competitors_avg_growth = df[df['Ticker'] != 'TSLA']['YoY Growth'].mean()
        growth_pressure = min(100, max(0, (competitors_avg_growth - tsla_growth) * 200))

        # 2. 市场份额压力（30%）
        tsla_share = tsla_row['Market Share (%)']
        tsla_share_rank = (df['Market Share (%)'] > tsla_share).sum() + 1
        share_pressure = (tsla_share_rank - 1) / len(df) * 100

        # 3. 技术参数压力（20%）
        tsla_range = tsla_row['Range (km)']
        better_range_count = (df['Range (km)'] > tsla_range).sum()
        tech_pressure = better_range_count / len(df) * 100

        # 4. 价格压力（20%）
        tsla_price = tsla_row['Avg Price ($)']
        lower_price_count = (df['Avg Price ($)'] < tsla_price).sum()
        price_pressure = lower_price_count / len(df) * 100

        # 综合评分
        total_score = (
            growth_pressure * 0.3 +
            share_pressure * 0.3 +
            tech_pressure * 0.2 +
            price_pressure * 0.2
        )

        scores = {
            'total_pressure_score': round(total_score, 1),
            'growth_pressure': round(growth_pressure, 1),
            'share_pressure': round(share_pressure, 1),
            'tech_pressure': round(tech_pressure, 1),
            'price_pressure': round(price_pressure, 1),
            'interpretation': self._interpret_pressure_score(total_score)
        }

        self.logger.info(f"Competitive pressure scores: {scores}")
        return scores

    def _interpret_pressure_score(self, score: float) -> str:
        """
        解释压力评分

        Args:
            score: 压力评分

        Returns:
            评分解释
        """
        if score < 30:
            return "Low competitive pressure - Tesla maintains strong position"
        elif score < 50:
            return "Moderate pressure - Competitors gaining ground in some areas"
        elif score < 70:
            return "High pressure - Significant competitive threats emerging"
        else:
            return "Extreme pressure - Tesla losing ground on multiple fronts"

    def get_quarterly_trend(self, periods: int = 4) -> pd.DataFrame:
        """
        获取季度趋势（模拟数据）

        Args:
            periods: 季度数量

        Returns:
            季度趋势DataFrame
        """
        # 模拟过去4个季度的数据
        quarters = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']

        trend_data = {
            'Quarter': quarters,
            'TSLA_Deliveries': [387000, 466000, 463000, 495570],
            'BYD_Deliveries': [300000, 350000, 440000, 500000],
            'XPEV_Deliveries': [21000, 24000, 28000, 32000],
            'NIO_Deliveries': [31000, 25000, 22000, 23000],
            'RIVN_Deliveries': [7000, 9000, 11000, 14000],
            'LCID_Deliveries': [1700, 1800, 2100, 2390]
        }

        df = pd.DataFrame(trend_data)

        # 计算每季度市场份额
        for quarter in quarters:
            q_data = df[df['Quarter'] == quarter]
            total = sum([q_data[f'{ticker}_Deliveries'].values[0]
                        for ticker in ['TSLA', 'BYD', 'XPEV', 'NIO', 'RIVN', 'LCID']])

            for ticker in ['TSLA', 'BYD', 'XPEV', 'NIO', 'RIVN', 'LCID']:
                df.loc[df['Quarter'] == quarter, f'{ticker}_Share'] = \
                    df.loc[df['Quarter'] == quarter, f'{ticker}_Deliveries'] / total * 100

        self.logger.info(f"Quarterly trend data:\n{df}")
        return df

    def generate_signal(self) -> Dict:
        """
        生成竞品追踪信号

        Returns:
            信号字典，包含评分、趋势、关键发现
        """
        # 获取数据
        positioning = self.get_competitive_positioning()
        pressure_scores = self.calculate_competitive_pressure_score()
        tech_comparison = self.compare_tech_specs()
        trend = self.get_quarterly_trend()

        # 计算Tesla市场份额变化趋势
        tsla_shares = trend[[col for col in trend.columns if 'TSLA_Share' in col]].values[0]
        share_trend = "declining" if tsla_shares[-1] < tsla_shares[0] else "stable/growing"

        # 识别最大威胁
        competitors_only = positioning[positioning['Ticker'] != 'TSLA'].copy()
        biggest_threat = competitors_only.nlargest(1, 'YoY Growth').iloc[0]

        signal = {
            'timestamp': datetime.now().isoformat(),
            'signal_strength': pressure_scores['total_pressure_score'],
            'direction': 'bearish' if pressure_scores['total_pressure_score'] > 50 else 'neutral',
            'confidence': 0.75,
            'metrics': {
                'competitive_pressure_score': pressure_scores['total_pressure_score'],
                'growth_pressure': pressure_scores['growth_pressure'],
                'share_pressure': pressure_scores['share_pressure'],
                'tech_pressure': pressure_scores['tech_pressure'],
                'price_pressure': pressure_scores['price_pressure'],
                'market_share_trend': share_trend,
                'biggest_threat': biggest_threat['Company'],
                'threat_growth_rate': biggest_threat['YoY Growth']
            },
            'key_findings': [
                f"Competitive pressure score: {pressure_scores['total_pressure_score']}/100 - {pressure_scores['interpretation']}",
                f"Biggest threat: {biggest_threat['Company']} with {biggest_threat['YoY Growth']*100:.1f}% YoY growth",
                f"Tesla market share trend: {share_trend}",
                f"Tech leadership: {len(tech_comparison[tech_comparison['Range vs TSLA (%)'] > 0])} competitors exceed Tesla range",
                f"Price competition: {len(positioning[positioning['Avg Price ($)'] < positioning[positioning['Ticker']=='TSLA']['Avg Price ($)'].values[0]])} competitors priced below Tesla"
            ],
            'data': {
                'positioning': positioning.to_dict('records'),
                'tech_comparison': tech_comparison.to_dict('records'),
                'quarterly_trend': trend.to_dict('records')
            }
        }

        self.logger.info(f"Generated competitor signal: strength={signal['signal_strength']}, direction={signal['direction']}")
        return signal


def main():
    """测试函数"""
    tracker = CompetitorTracker('TSLA')

    print("\n" + "="*80)
    print("ENGINE 5: COMPETITOR TRACKER")
    print("="*80)

    # 生成信号
    signal = tracker.generate_signal()

    print(f"\nSignal Strength: {signal['signal_strength']}/100")
    print(f"Direction: {signal['direction']}")
    print(f"Confidence: {signal['confidence']}")

    print("\nKey Findings:")
    for finding in signal['key_findings']:
        print(f"  - {finding}")

    print("\nCompetitive Positioning (Top 3):")
    positioning_df = pd.DataFrame(signal['data']['positioning'])
    print(positioning_df[['Company', 'Q4 2025 Deliveries', 'YoY Growth', 'Market Share (%)']].head(3).to_string(index=False))

    print("\nTech Comparison:")
    tech_df = pd.DataFrame(signal['data']['tech_comparison'])
    print(tech_df[['Ticker', 'Range (km)', 'Charging Speed (kW)', 'Range vs TSLA (%)']].to_string(index=False))


if __name__ == '__main__':
    main()
