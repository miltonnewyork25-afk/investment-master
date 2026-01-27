"""
IntelligenceEngine v10 - 引擎模块

6大核心引擎:
1. SECMonitor - SEC文件实时监控
2. SentimentTracker - 多源情绪追踪
3. SupplyChainIntel - 供应链情报
4. OptionsDecoder - 期权流解码
5. CompetitorTracker - 竞品追踪
6. EarningsPredictor - 财报预测
"""

from .base_engine import BaseEngine
from .sec_monitor import SECMonitorEngine
from .sentiment_tracker import SentimentTracker
from .supply_chain_intel import SupplyChainIntel
from .options_decoder import OptionsDecoder
from .competitor_tracker import CompetitorTracker
from .earnings_predictor import EarningsPredictorEngine

__all__ = [
    'BaseEngine',
    'SECMonitorEngine',
    'SentimentTracker',
    'SupplyChainIntel',
    'OptionsDecoder',
    'CompetitorTracker',
    'EarningsPredictorEngine'
]

__version__ = '10.0.0'
