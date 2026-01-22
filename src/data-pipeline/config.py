"""
投资数据管道配置文件

使用前请填入你的 API Keys
"""

import os
from pathlib import Path

# ============================================================
# 路径配置
# ============================================================

# 项目根目录
PROJECT_ROOT = Path(__file__).parent.parent.parent

# 数据目录
DATA_DIR = PROJECT_ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
SCORES_DIR = DATA_DIR / "scores"

# 数据库路径
DB_PATH = DATA_DIR / "investment.db"

# Skills 目录（用于读取行业配置）
SKILLS_DIR = Path.home() / ".claude" / "skills" / "cycle-investing" / "references"

# ============================================================
# API 配置
# ============================================================

# FMP (Financial Modeling Prep) API
# 获取: https://financialmodelingprep.com/developer/docs/
FMP_API_KEY = os.environ.get("FMP_API_KEY", "fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb")
FMP_BASE_URL = "https://financialmodelingprep.com/api/v3"

# ============================================================
# 跟踪的股票列表
# ============================================================

TRACKED_STOCKS = {
    "semicap": {
        "symbols": ["LRCX", "AMAT", "ASML", "KLAC"],
        "config": "semicap.yaml"
    },
    "shipping": {
        "symbols": ["ZIM", "MATX", "DAC", "GSL"],
        "config": "shipping.yaml"
    }
}

# ============================================================
# 行业指标数据源
# ============================================================

INDICATOR_SOURCES = {
    "scfi": {
        "name": "上海集装箱运价指数",
        "url": "https://en.sse.net.cn/indices/scfinew.jsp",
        "frequency": "weekly",
        "industries": ["shipping"]
    },
    "bdi": {
        "name": "波罗的海干散货指数",
        "url": "https://tradingeconomics.com/commodity/baltic",
        "frequency": "daily",
        "industries": ["shipping"]
    },
    "dram_spot": {
        "name": "DRAM现货价格",
        "url": "https://www.trendforce.com/",
        "frequency": "weekly",
        "industries": ["semicap"]
    }
}

# ============================================================
# 预警阈值
# ============================================================

ALERT_THRESHOLDS = {
    # 价格变动阈值
    "price_change_pct": {
        "warning": 5,    # 5% 变动触发警告
        "critical": 10   # 10% 变动触发严重警告
    },

    # 指标变动阈值
    "indicator_change": {
        "scfi_mom": 10,      # SCFI 月环比 10%
        "dram_mom": 10,      # DRAM 月环比 10%
        "orderbook_ratio": 25  # 订单簿比例警戒线
    },

    # 评分变动阈值
    "score_change": 10  # 评分变动超过10分触发预警
}

# ============================================================
# 评分参数（从 cycle-investing 框架）
# ============================================================

VALUATION_SCORING = {
    "semicap": {
        "pe_ranges": [
            (0, 15, 9),    # (min, max, score)
            (15, 20, 7),
            (20, 30, 5),
            (30, 40, 3),
            (40, 999, 2)
        ]
    },
    "shipping": {
        "pe_ranges": [
            (0, 3, 9),
            (3, 6, 7),
            (6, 10, 5),
            (10, 18, 3),
            (18, 999, 2)
        ],
        "pb_ranges": [
            (0, 0.3, 9),
            (0.3, 0.6, 7),
            (0.6, 1.0, 5),
            (1.0, 1.8, 3),
            (1.8, 999, 2)
        ]
    }
}

# ============================================================
# 日志配置
# ============================================================

LOG_LEVEL = "INFO"
LOG_FILE = DATA_DIR / "pipeline.log"

# ============================================================
# 通知配置（可选）
# ============================================================

NOTIFICATIONS = {
    "enabled": False,
    "email": {
        "smtp_server": "",
        "smtp_port": 587,
        "sender": "",
        "recipient": "",
        "password": ""
    },
    "slack": {
        "webhook_url": ""
    }
}
