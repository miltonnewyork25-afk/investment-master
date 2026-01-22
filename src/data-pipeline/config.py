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
    },
    "energy": {
        "symbols": ["XOM", "CVX", "SLB", "HAL", "OXY"],
        "config": "energy.yaml"
    },
    "machinery": {
        "symbols": ["CAT", "DE", "PCAR", "CMI"],
        "config": "machinery.yaml"
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
    },
    "wti": {
        "name": "WTI原油价格",
        "url": "https://api.eia.gov/v2/petroleum/pri/spt/data/",
        "frequency": "daily",
        "industries": ["energy"]
    },
    "rig_count": {
        "name": "Baker Hughes钻机数",
        "url": "https://rigcount.bakerhughes.com/",
        "frequency": "weekly",
        "industries": ["energy"]
    },
    "crude_inventory": {
        "name": "EIA原油库存",
        "url": "https://www.eia.gov/petroleum/supply/weekly/",
        "frequency": "weekly",
        "industries": ["energy"]
    },
    "construction_spending": {
        "name": "美国建筑支出",
        "url": "https://www.census.gov/construction/c30/c30index.html",
        "frequency": "monthly",
        "industries": ["machinery"]
    },
    "excavator_sales": {
        "name": "挖掘机销量",
        "url": "AEM / 公司财报",
        "frequency": "monthly",
        "industries": ["machinery"]
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
    },
    "energy": {
        # 综合石油用PB (XOM, CVX)
        "pb_ranges": [
            (0, 1.0, 9),
            (1.0, 1.5, 7),
            (1.5, 2.0, 5),
            (2.0, 2.5, 3),
            (2.5, 999, 1)
        ],
        # 油服用PE (SLB, HAL)
        "pe_ranges": [
            (0, 12, 9),
            (12, 18, 7),
            (18, 25, 5),
            (25, 35, 3),
            (35, 999, 1)
        ],
        # 综合石油公司列表（用PB估值）
        "pb_symbols": ["XOM", "CVX"],
        # 油服公司列表（用PE估值）
        "pe_symbols": ["SLB", "HAL", "BKR", "OXY"]
    },
    "machinery": {
        "pe_ranges": [
            (0, 10, 9),
            (10, 14, 7),
            (14, 18, 5),
            (18, 25, 3),
            (25, 999, 1)
        ],
        "pb_ranges": [
            (0, 2.0, 8),
            (2.0, 3.5, 5),
            (3.5, 5.0, 3),
            (5.0, 999, 1)
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
