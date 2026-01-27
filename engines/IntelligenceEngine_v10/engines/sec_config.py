"""
SEC Filing Monitor - Configuration File
配置文件：硬编码SEC数据源和监控参数
"""

import os

# ==================== SEC EDGAR API配置 ====================

# SEC EDGAR基础URL
SEC_EDGAR_BASE = "https://www.sec.gov"
SEC_EDGAR_SEARCH = f"{SEC_EDGAR_BASE}/cgi-bin/browse-edgar"

# 用户代理（SEC要求必须提供）
# 格式: Company Name Email@example.com
USER_AGENT = "Investment Research AI research@investmentai.com"

# API请求头
HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept-Encoding": "gzip, deflate",
    "Host": "www.sec.gov"
}

# ==================== 监控公司列表 ====================

# 核心监控股票池（CIK: Central Index Key）
MONITORED_COMPANIES = {
    "TSLA": {
        "name": "Tesla Inc",
        "cik": "0001318605",
        "forms": ["4", "13F-HR", "10-K", "10-Q", "8-K"]
    },
    "AAPL": {
        "name": "Apple Inc",
        "cik": "0000320193",
        "forms": ["4", "13F-HR", "10-K", "10-Q"]
    },
    "NVDA": {
        "name": "NVIDIA Corp",
        "cik": "0001045810",
        "forms": ["4", "13F-HR", "10-K", "10-Q"]
    },
    "MSFT": {
        "name": "Microsoft Corp",
        "cik": "0000789019",
        "forms": ["4", "13F-HR", "10-K", "10-Q"]
    },
    "GOOGL": {
        "name": "Alphabet Inc",
        "cik": "0001652044",
        "forms": ["4", "13F-HR", "10-K", "10-Q"]
    }
}

# ==================== Form 4 (内部人交易) 配置 ====================

# Form 4 RSS Feed模板
FORM4_RSS_TEMPLATE = (
    "{base}/cgi-bin/browse-edgar?"
    "action=getcompany&CIK={cik}&type=4&count=100&output=atom"
)

# Form 4数据提取规则
FORM4_FIELDS = [
    "issuer_name",           # 发行人
    "issuer_cik",            # 发行人CIK
    "owner_name",            # 内部人姓名
    "owner_relationship",    # 关系（CEO/CFO/Director等）
    "transaction_date",      # 交易日期
    "transaction_code",      # 交易代码（P=买入，S=卖出）
    "shares",                # 股数
    "price_per_share",       # 价格
    "shares_owned_after",    # 交易后持股
    "filing_date"            # 提交日期
]

# 交易代码映射
TRANSACTION_CODES = {
    "P": "Purchase",         # 公开市场买入
    "S": "Sale",             # 公开市场卖出
    "A": "Grant/Award",      # 授予（期权/RSU）
    "M": "Exercise",         # 期权行权
    "G": "Gift",             # 赠与
    "D": "Return/Forfeiture" # 退还/没收
}

# ==================== 13F (机构持仓) 配置 ====================

# 顶级机构监控列表（按管理规模排序）
TOP_INSTITUTIONS = {
    "BLK": {
        "name": "BlackRock Inc",
        "cik": "0001364742"
    },
    "VG": {
        "name": "Vanguard Group",
        "cik": "0000102909"
    },
    "SSGA": {
        "name": "State Street Corp",
        "cik": "0000093751"
    },
    "FMR": {
        "name": "Fidelity (FMR LLC)",
        "cik": "0001067983"
    },
    "BRK": {
        "name": "Berkshire Hathaway",
        "cik": "0001067983"
    },
    "ARK": {
        "name": "ARK Investment Management",
        "cik": "0001579982"
    }
}

# 13F-HR文件URL模板
FORM13F_URL_TEMPLATE = (
    "{base}/cgi-bin/browse-edgar?"
    "action=getcompany&CIK={cik}&type=13F-HR&count=40&output=atom"
)

# ==================== 数据库配置 ====================

# 项目根目录
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 数据存储路径
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# SQLite数据库路径
DB_PATH = os.path.join(DATA_DIR, "sec_filings.db")

# JSON缓存路径
CACHE_DIR = os.path.join(DATA_DIR, "cache")
os.makedirs(CACHE_DIR, exist_ok=True)

# ==================== 调度配置 ====================

# 抓取频率（秒）
FETCH_INTERVAL = {
    "form4": 3600,      # Form 4: 每小时检查（市场时间）
    "13f": 86400,       # 13F: 每天检查（季度申报）
    "10k": 86400,       # 10-K: 每天检查
    "10q": 86400        # 10-Q: 每天检查
}

# API请求速率限制
RATE_LIMIT = {
    "requests_per_second": 10,  # SEC限制：每秒不超过10次请求
    "delay_between_requests": 0.11  # 延迟110ms
}

# ==================== 日志配置 ====================

LOG_DIR = os.path.join(PROJECT_ROOT, "logs")
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "sec_monitor.log")

LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_LEVEL = "INFO"

# ==================== 通知配置 ====================

# 重要交易阈值（触发通知）
ALERT_THRESHOLDS = {
    "insider_trade_value": 1000000,  # 内部人交易超过100万美元
    "ownership_change": 0.05,         # 持股变化超过5%
    "institution_new_position": 0.01  # 机构新建仓位超过1%
}

# 关键内部人职位（重点监控）
KEY_POSITIONS = [
    "CEO",
    "CFO",
    "COO",
    "President",
    "Chairman",
    "Director",
    "10% Owner"
]

# ==================== 数据质量配置 ====================

# 数据验证规则
VALIDATION_RULES = {
    "min_share_price": 0.01,      # 最小合理股价
    "max_share_price": 100000,    # 最大合理股价
    "min_shares": 1,              # 最小交易股数
    "max_filing_delay_days": 90   # 最大允许申报延迟（天）
}

# 数据保留期限
DATA_RETENTION = {
    "form4": 365 * 5,    # Form 4保留5年
    "13f": 365 * 10,     # 13F保留10年
    "cache": 30          # 缓存保留30天
}
