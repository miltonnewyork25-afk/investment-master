#!/usr/bin/env python3
"""
SEC信号侦测系统 - 配置文件
集中管理所有可调参数
"""

# ============================================================================
# SEC API配置
# ============================================================================

# User-Agent（SEC要求必须包含邮箱）
SEC_USER_AGENT = "Investment Research System admin@investresearch.com"

# 速率限制（秒/请求）
# SEC规定：10 requests/second
# 建议设为0.1（安全值）或0.2（保守值）
SEC_RATE_LIMIT = 0.1

# 缓存有效期（秒）
CACHE_EXPIRY = {
    'form4': 7 * 24 * 3600,      # Form 4: 7天
    '13f': 90 * 24 * 3600,       # 13F: 90天
    '13d': 30 * 24 * 3600,       # 13D/13G: 30天
}


# ============================================================================
# 分析参数
# ============================================================================

# Form 4内部人交易分析
INSIDER_ANALYSIS = {
    'months_back': 6,              # 回溯月数
    'min_transaction_value': 10000,  # 最小交易金额（美元）
    'exec_keywords': ['CEO', 'CFO', 'President', 'Chief', 'Director', 'Board']  # 高管关键词
}

# Form 13F机构持仓分析
INSTITUTIONAL_ANALYSIS = {
    'quarters_back': 2,            # 回溯季度数
    'famous_institutions': {       # 重点追踪的机构（CIK: {name, weight}）
        '0001067983': {'name': 'Berkshire Hathaway', 'weight': 10},
        '0001350694': {'name': 'Bridgewater Associates', 'weight': 9},
        '0001037389': {'name': 'Renaissance Technologies', 'weight': 9},
        '0001649339': {'name': 'ARK Investment Management', 'weight': 8},
        '0001364742': {'name': 'Two Sigma', 'weight': 8},
        '0001336528': {'name': 'Citadel Advisors', 'weight': 7},
        '0001567619': {'name': 'Pershing Square Capital', 'weight': 9},
        '0001061768': {'name': 'Appaloosa Management', 'weight': 7},
        '0001079114': {'name': 'Third Point', 'weight': 7},
        '0001582694': {'name': 'Tiger Global Management', 'weight': 8}
    }
}

# Form 13D/13G重要股东分析
FORM13D_ANALYSIS = {
    'months_back': 12              # 回溯月数
}


# ============================================================================
# 评分权重配置
# ============================================================================

# 综合信号评分权重（总和应为100）
SIGNAL_WEIGHTS = {
    'insider': 40,        # Form 4内部人交易（40%）
    'institutional': 35,  # Form 13F机构持仓（35%）
    'form13d': 25        # Form 13D/13G重要股东（25%）
}

# Form 4评分参数（总分0-10）
INSIDER_SCORING = {
    'net_buying': {                    # 净买入金额评分（最高4分）
        1000000: 4,
        500000: 3,
        100000: 2,
        0: 1
    },
    'buy_ratio': {                     # 买入比例评分（最高3分）
        80: 3,
        60: 2,
        50: 1
    },
    'exec_buy': {                      # 高管买入评分（最高3分）
        3: 3,  # 3+高管买入
        1: 2   # 1+高管买入
    }
}

# Form 13F评分参数（总分0-100）
INSTITUTIONAL_SCORING = {
    'new_position_points': 10,         # 每个新建仓得分
    'new_position_max': 30,            # 新建仓最高分
    'increased_points': 5,             # 每个加仓得分
    'increased_max': 25,               # 加仓最高分
    'decreased_points': -5,            # 每个减仓扣分
    'closed_points': -10,              # 每个清仓扣分
    'famous_new_bonus': 20,            # 著名机构（weight≥9）新建仓额外加分
    'famous_increased_bonus': 15       # 著名机构（weight≥9）加仓额外加分
}

# Form 13D/13G评分参数（总分0-25）
FORM13D_SCORING = {
    '13d_points': 15,                  # 每个13D文件得分
    '13d_max': 25,                     # 13D最高分
    '13g_points': 3,                   # 每个13G文件得分
    '13g_max': 10                      # 13G最高分
}


# ============================================================================
# 评级标准
# ============================================================================

# 综合评分评级阈值
RATING_THRESHOLDS = {
    80: 'A+ 强烈信号',
    65: 'A 强信号',
    50: 'B 中等信号',
    35: 'C 弱信号',
    0: 'D 无明显信号'
}


# ============================================================================
# 输出配置
# ============================================================================

# 输出目录
OUTPUT_DIR = '.'

# 输出文件名
OUTPUT_FILES = {
    'combined': 'sec_combined_signals.csv',
    'combined_json': 'sec_combined_signals.json',
    'insider': 'insider_trading_signals.csv',
    'insider_detail': 'insider_trading_signals_detail.csv',
    'institutional': 'institutional_holdings.csv',
    'institutional_detail': 'institutional_holdings_detail.csv'
}

# Top N显示数量
TOP_N_DISPLAY = 10


# ============================================================================
# 高级配置
# ============================================================================

# 是否使用缓存
USE_CACHE = True

# 是否显示详细日志
VERBOSE = True

# 批量处理时的休息间隔（秒）
# 每处理N个股票后休息一次，避免被限流
BATCH_SIZE = 10
BATCH_REST_SECONDS = 5

# 超时设置（秒）
REQUEST_TIMEOUT = 30

# 重试次数
MAX_RETRIES = 3


# ============================================================================
# Ticker特殊映射
# ============================================================================

# 某些股票代码在SEC系统中的表示不同
TICKER_MAPPINGS = {
    'BRK.B': 'BRK/B',
    'BF.B': 'BF/B',
    'BF.A': 'BF/A'
}

# 手动指定的CIK（用于映射失败的情况）
MANUAL_CIK = {
    'BRK.B': '0001067983',  # Berkshire Hathaway
}


# ============================================================================
# 数据质量配置
# ============================================================================

# 数据信度分层
DATA_TIER_LABELS = {
    1: 'Tier 1: 官方数据（SEC直接披露）',
    2: 'Tier 2: 计算数据（基于官方数据计算）',
    3: 'Tier 3: 推测数据（需验证）'
}

# 异常值检测阈值
OUTLIER_THRESHOLDS = {
    'insider_single_trade': 50000000,    # 单笔内部人交易>$50M标记为异常
    'institutional_position': 10000000000  # 机构持仓>$100亿标记为异常
}


# ============================================================================
# 功能开关
# ============================================================================

# 是否启用各个分析模块
ENABLE_MODULES = {
    'form4': True,        # Form 4内部人交易
    '13f': True,          # Form 13F机构持仓
    '13d': True           # Form 13D/13G重要股东
}

# 是否保存详细数据
SAVE_DETAIL = True

# 是否保存JSON格式
SAVE_JSON = True


# ============================================================================
# 辅助函数
# ============================================================================

def get_rating(score: float) -> str:
    """根据评分获取评级"""
    for threshold in sorted(RATING_THRESHOLDS.keys(), reverse=True):
        if score >= threshold:
            return RATING_THRESHOLDS[threshold]
    return RATING_THRESHOLDS[0]


def get_ticker_for_sec(ticker: str) -> str:
    """获取SEC系统中的ticker表示"""
    return TICKER_MAPPINGS.get(ticker, ticker)


def get_manual_cik(ticker: str) -> str:
    """获取手动指定的CIK"""
    return MANUAL_CIK.get(ticker)


# ============================================================================
# 配置验证
# ============================================================================

def validate_config():
    """验证配置参数的合理性"""
    errors = []

    # 检查权重总和
    weight_sum = sum(SIGNAL_WEIGHTS.values())
    if weight_sum != 100:
        errors.append(f"SIGNAL_WEIGHTS总和应为100，当前为{weight_sum}")

    # 检查速率限制
    if SEC_RATE_LIMIT < 0.1:
        errors.append(f"SEC_RATE_LIMIT不应小于0.1（会超过10 req/sec限制）")

    # 检查评级阈值顺序
    thresholds = sorted(RATING_THRESHOLDS.keys(), reverse=True)
    for i in range(len(thresholds) - 1):
        if thresholds[i] <= thresholds[i+1]:
            errors.append(f"RATING_THRESHOLDS顺序错误")

    if errors:
        print("⚠️ 配置错误：")
        for error in errors:
            print(f"  - {error}")
        return False

    return True


if __name__ == '__main__':
    # 测试配置
    print("SEC信号侦测系统 - 配置检查")
    print("=" * 60)

    if validate_config():
        print("✓ 配置验证通过")
    else:
        print("✗ 配置验证失败，请修正错误")

    print()
    print("当前配置摘要：")
    print(f"  - Form 4回溯时间: {INSIDER_ANALYSIS['months_back']}个月")
    print(f"  - 13F回溯时间: {INSTITUTIONAL_ANALYSIS['quarters_back']}个季度")
    print(f"  - 13D回溯时间: {FORM13D_ANALYSIS['months_back']}个月")
    print()
    print(f"  - 信号权重: Form 4({SIGNAL_WEIGHTS['insider']}%) "
          f"+ 13F({SIGNAL_WEIGHTS['institutional']}%) "
          f"+ 13D({SIGNAL_WEIGHTS['form13d']}%)")
    print()
    print(f"  - 速率限制: {SEC_RATE_LIMIT}秒/请求 "
          f"({1/SEC_RATE_LIMIT:.1f} req/sec)")
    print(f"  - 缓存: {'启用' if USE_CACHE else '禁用'}")
    print()
