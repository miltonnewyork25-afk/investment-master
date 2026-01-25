"""
Options Decoder Configuration
=============================

配置参数、API密钥和监控阈值
"""

# ============================================================================
# 数据源配置
# ============================================================================

# 方案A: Yahoo Finance (免费, 默认)
DATA_SOURCE = 'yahoo'  # 'yahoo' or 'polygon'

# 方案B: Polygon.io (付费, $200/月)
# 需要申请: https://polygon.io/pricing
POLYGON_API_KEY = 'YOUR_POLYGON_API_KEY_HERE'  # 替换为实际密钥

# Yahoo Finance 不需要 API Key, 通过 yfinance 库直接访问
# URL 示例: https://query2.finance.yahoo.com/v7/finance/options/TSLA


# ============================================================================
# 市场参数
# ============================================================================

# 无风险利率 (美国10年期国债收益率, 定期更新)
RISK_FREE_RATE = 0.045  # 4.5%

# 交易日历 (用于计算到期时间)
TRADING_DAYS_PER_YEAR = 252

# ATM 范围定义 (用于计算 ATM IV)
ATM_RANGE = 0.10  # ±10% 认为是 Near-the-Money


# ============================================================================
# 异常交易检测参数
# ============================================================================

# 异常交易阈值
UNUSUAL_VOLUME_THRESHOLD = 2.0  # 成交量 > 2× 持仓量

# 大额交易阈值 (美元)
LARGE_TRADE_THRESHOLD = 1_000_000  # $1M

# 异常 IV 阈值
HIGH_IV_THRESHOLD = 80  # 隐含波动率 > 80% 视为异常高
LOW_IV_THRESHOLD = 20   # 隐含波动率 < 20% 视为异常低


# ============================================================================
# Put/Call Ratio 信号阈值
# ============================================================================

PC_RATIO_BULLISH = 0.7   # < 0.7 = Bullish 信号
PC_RATIO_BEARISH = 1.0   # > 1.0 = Bearish 信号
PC_RATIO_EXTREME_BULLISH = 0.5  # < 0.5 = 极度乐观 (警告)
PC_RATIO_EXTREME_BEARISH = 1.5  # > 1.5 = 极度恐慌 (警告)


# ============================================================================
# Max Pain 信号阈值
# ============================================================================

MAX_PAIN_SIGNIFICANT_DISTANCE = 2.0  # Max Pain 距离当前价 > ±2% 视为有意义


# ============================================================================
# 隐含波动率信号阈值
# ============================================================================

IV_PERCENTILE_HIGH = 75  # IV 百分位 > 75% = 高波动
IV_PERCENTILE_LOW = 25   # IV 百分位 < 25% = 低波动

# IV Skew 阈值 (Put IV - Call IV)
IV_SKEW_BEARISH = 5.0   # Skew > 5% = 看跌倾向
IV_SKEW_BULLISH = -5.0  # Skew < -5% = 看涨倾向


# ============================================================================
# 监控股票列表
# ============================================================================

# 默认监控的股票池
WATCHLIST = [
    'TSLA',   # Tesla
    'AAPL',   # Apple
    'NVDA',   # NVIDIA
    'MSFT',   # Microsoft
    'SPY',    # S&P 500 ETF
    'QQQ',    # Nasdaq ETF
    'GOOGL',  # Google
    'AMZN',   # Amazon
    'META',   # Meta
    'AMD',    # AMD
]

# 半导体供应链相关
SEMICAP_WATCHLIST = [
    'NVDA',   # GPU
    'AMD',    # GPU/CPU
    'ASML',   # 光刻机
    'AMAT',   # 设备
    'LRCX',   # 设备
    'KLAC',   # 检测
    'TSM',    # 晶圆代工
    'MU',     # Memory
    'AVGO',   # 芯片设计
]


# ============================================================================
# 报告输出配置
# ============================================================================

# 输出路径
OUTPUT_DIR = '/Users/milton/投资大师/IntelligenceEngine_v10/outputs/'

# 报告格式
REPORT_FORMAT = 'json'  # 'json', 'csv', 'html'

# 是否保存历史数据
SAVE_HISTORICAL = True

# 历史数据保存路径
HISTORICAL_DATA_DIR = '/Users/milton/投资大师/IntelligenceEngine_v10/data/options_history/'


# ============================================================================
# 高级功能配置
# ============================================================================

# 是否启用 Black-Scholes IV 计算 (计算密集)
ENABLE_BS_IV_CALCULATION = False  # Yahoo Finance 已提供 IV, 一般不需要重算

# 是否计算 Greeks (Delta, Gamma, Theta, Vega)
ENABLE_GREEKS_CALCULATION = False  # 高级功能, 可选

# 隐含概率置信水平
IMPLIED_PROBABILITY_CONFIDENCE = 0.68  # 1σ = 68%

# 是否启用多线程数据获取
ENABLE_MULTITHREADING = True
MAX_WORKERS = 5  # 最大线程数


# ============================================================================
# 警报配置
# ============================================================================

# 是否启用警报
ENABLE_ALERTS = True

# 警报级别
ALERT_SEVERITY_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

# 警报类型
ALERT_TYPES = {
    'BEARISH_SENTIMENT': 'Put/Call Ratio 异常高',
    'BULLISH_SENTIMENT': 'Put/Call Ratio 异常低',
    'HIGH_VOLATILITY': '隐含波动率异常高',
    'LOW_VOLATILITY': '隐含波动率异常低',
    'LARGE_TRADE': '检测到大额期权交易',
    'UNUSUAL_ACTIVITY': '检测到异常交易活动',
    'MAX_PAIN_DIVERGENCE': 'Max Pain 与当前价严重偏离',
    'IV_CRUSH': 'IV 急剧下降 (财报后常见)',
    'IV_SPIKE': 'IV 急剧上升 (重大事件前)',
}


# ============================================================================
# 回测配置
# ============================================================================

# 回测起始日期
BACKTEST_START_DATE = '2024-01-01'

# 回测策略
BACKTEST_STRATEGIES = {
    'max_pain_reversion': '股价向 Max Pain 回归策略',
    'iv_crush': 'IV Crush 策略 (卖 Straddle)',
    'unusual_follow': '跟随异常大单策略',
}


# ============================================================================
# 调试与日志
# ============================================================================

# 日志级别
LOG_LEVEL = 'INFO'  # 'DEBUG', 'INFO', 'WARNING', 'ERROR'

# 是否打印详细输出
VERBOSE = True

# 是否保存原始 API 响应 (用于调试)
SAVE_RAW_RESPONSES = False
