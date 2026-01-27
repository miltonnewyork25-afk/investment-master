"""
===============================================================================
Agent 7: 排除规则执行引擎 v2.0
===============================================================================
目的: 建立严格的排除规则系统，确保进入Top 20的公司都是"可投资"的

排除规则分类:
1. 行业排除（二元事件/无法审计）
2. 数据完整性排除
3. 财务健康排除
4. 治理与合规排除
5. 市场风险排除

设计原则:
- 宁可错杀，不可放过（Type I error优于Type II error）
- 所有阈值有明确依据
- 支持自定义和覆盖
- 完整的日志记录

作者: Agent 7
版本: 2.0
日期: 2026-01-26
===============================================================================
"""

import pandas as pd
import numpy as np
import requests
import json
import os
import re
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, field, asdict
from enum import Enum
import time

# ============================================================================
# 配置常量
# ============================================================================

# 目录配置
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
EXCLUSIONS_DIR = os.path.join(BASE_DIR, "exclusions")
DATA_DIR = os.path.join(BASE_DIR, "data")
LOG_DIR = os.path.join(EXCLUSIONS_DIR, "logs")

# 创建必要目录
for dir_path in [EXCLUSIONS_DIR, DATA_DIR, LOG_DIR]:
    os.makedirs(dir_path, exist_ok=True)

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOG_DIR, f"exclusion_{datetime.now().strftime('%Y%m%d')}.log")),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


# ============================================================================
# 规则1: 行业排除配置
# ============================================================================

class ExclusionReason(Enum):
    """排除原因枚举"""
    INDUSTRY_BIOTECH = "行业排除:生物制药"
    INDUSTRY_SPAC = "行业排除:SPAC"
    INDUSTRY_CANNABIS = "行业排除:大麻"
    INDUSTRY_CRYPTO = "行业排除:加密货币"
    INDUSTRY_OIL_EXPLORATION = "行业排除:油气勘探"
    INDUSTRY_MINING_JUNIOR = "行业排除:初级矿业"
    INDUSTRY_REGIONAL_BANK = "行业排除:小型地区银行"
    INDUSTRY_OFFICE_REIT = "行业排除:办公REIT"

    DATA_MISSING = "数据排除:数据缺失过多"
    DATA_STALE = "数据排除:数据过时"
    DATA_PRICE_HISTORY = "数据排除:价格历史不足"

    FINANCIAL_CONSECUTIVE_LOSS = "财务排除:连续亏损"
    FINANCIAL_NEGATIVE_OCF = "财务排除:累计OCF为负"
    FINANCIAL_HIGH_LEVERAGE = "财务排除:杠杆过高"
    FINANCIAL_LOW_INTEREST_COVERAGE = "财务排除:利息覆盖不足"
    FINANCIAL_LOW_LIQUIDITY = "财务排除:流动性不足"
    FINANCIAL_BANKRUPTCY_RISK = "财务排除:破产风险"

    GOVERNANCE_AUDIT = "治理排除:审计意见异常"
    GOVERNANCE_RESTATEMENT = "治理排除:频繁财务重述"
    GOVERNANCE_SEC = "治理排除:SEC调查"
    GOVERNANCE_EXEC_TURNOVER = "治理排除:管理层不稳定"
    GOVERNANCE_INSIDER_SELLING = "治理排除:内部人大量抛售"

    MARKET_LOW_VOLUME = "市场排除:流动性不足"
    MARKET_HIGH_VOLATILITY = "市场排除:波动率过高"
    MARKET_LARGE_DRAWDOWN = "市场排除:历史回撤过大"
    MARKET_SHORT_CROWDED = "市场排除:空头拥挤"

    SPECIAL_PENNY_STOCK = "特殊排除:Penny Stock"
    SPECIAL_PRE_REVENUE = "特殊排除:Pre-Revenue"
    SPECIAL_RECENT_IPO = "特殊排除:IPO<2年"
    SPECIAL_CHINESE_ADR = "特殊排除:中国ADR"


# 排除行业配置
EXCLUDED_INDUSTRIES: Dict[str, str] = {
    # 生物制药/临床试验驱动
    'Biotechnology': '临床试验二元事件风险，FDA批准结果不可预测',
    'Pharmaceuticals - Development': '药物审批不确定性，单一药物依赖',
    'Pharmaceutical Services': '依赖单一大客户风险，收入波动大',
    'Drug Manufacturers - Specialty & Generic': '专利悬崖风险，定价压力',

    # 高度投机性行业
    'Shell Companies': 'SPAC，无运营历史，纯预期交易',
    'Cannabis': '监管极不确定，联邦合法性未定',
    'Cryptocurrency': '无内在价值锚定，监管风险极高',

    # 无法用财务数据验证的行业
    'Oil & Gas E&P': '储量估计主观性高，油价敏感性极强',
    'Uranium': '勘探结果二元性，政策依赖',
    'Gold': '大宗商品价格驱动，无竞争优势可言',
    'Silver': '投机性强，工业需求波动',
    'Other Precious Metals & Mining': '勘探风险，无法审计储量',

    # 特殊风险行业
    'Banks - Regional': '流动性风险高，参见SVB/FRC崩盘',
    'Banks - Diversified': '系统性风险，监管变化敏感',
    'REIT - Office': '结构性下行，远程办公永久性冲击',
    'REIT - Retail': '电商冲击持续，租户破产风险',

    # 其他高风险
    'Gambling': '监管风险，周期性极强',
    'Tobacco': 'ESG排斥，长期结构性下滑',
    'Coal': '能源转型淘汰，ESG排斥',
    'Airlines': '高固定成本，周期性极强，油价敏感',
    'Cruise Lines': '疫情风险，高负债，消费者信心敏感',
}

# 排除行业关键词（补充匹配）
EXCLUDED_INDUSTRY_KEYWORDS: List[str] = [
    'biotech', 'biotechnology', 'pharmaceutical', 'drug', 'clinical',
    'cannabis', 'marijuana', 'crypto', 'blockchain', 'bitcoin',
    'spac', 'acquisition corp', 'blank check',
    'exploration', 'mining', 'junior gold', 'junior silver',
    'penny', 'micro cap',
]


# ============================================================================
# 规则2: 数据完整性配置
# ============================================================================

REQUIRED_DATA_FIELDS: List[str] = [
    # 必须有的财务数据（最近4个季度）
    'revenue', 'net_income', 'operating_cash_flow', 'free_cash_flow',
    'total_assets', 'total_liabilities', 'shareholders_equity',
    'gross_margin', 'operating_margin',

    # 必须有的市场数据（至少3年）
    'price_history_3y', 'volume_history',

    # 必须有的估值数据
    'market_cap', 'enterprise_value', 'shares_outstanding',
]

# 数据时效性要求（天）
DATA_FRESHNESS_THRESHOLD = 60  # 最近财报延迟>60天警示

# 价格历史最小要求（交易日）
MIN_PRICE_HISTORY_DAYS = 750  # 约3年


# ============================================================================
# 规则3: 财务健康阈值配置
# ============================================================================

@dataclass
class FinancialThresholds:
    """财务健康阈值配置"""
    # 连续亏损年数阈值
    consecutive_loss_years: int = 3

    # 累计OCF为负的年数
    negative_ocf_years: int = 3

    # 债务/股权比率上限
    max_debt_equity: float = 3.0  # 300%

    # 利息覆盖率下限
    min_interest_coverage: float = 2.0

    # 流动比率下限
    min_current_ratio: float = 0.8

    # Altman Z-Score下限
    min_altman_z: float = 1.8  # <1.8为财务困境区

    # 快速比率下限（可选）
    min_quick_ratio: float = 0.5


# ============================================================================
# 规则4: 治理与合规阈值配置
# ============================================================================

@dataclass
class GovernanceThresholds:
    """治理阈值配置"""
    # 财务重述次数上限（3年内）
    max_restatements: int = 1

    # CFO变更次数上限（2年内）
    max_cfo_changes: int = 1

    # CEO变更次数上限（2年内）
    max_ceo_changes: int = 0  # 通常CEO变更更敏感

    # 内部人净卖出占比阈值（6个月）
    insider_selling_threshold: float = 0.5  # 50%

    # 内部人卖出金额阈值
    insider_selling_amount: float = 10_000_000  # $10M


# ============================================================================
# 规则5: 市场风险阈值配置
# ============================================================================

@dataclass
class MarketThresholds:
    """市场风险阈值配置"""
    # 日均交易额下限
    min_daily_volume: float = 5_000_000  # $5M

    # 年化波动率上限
    max_volatility: float = 0.80  # 80%

    # 最大回撤上限（3年）
    max_drawdown: float = -0.60  # -60%

    # 空头比例上限
    max_short_interest: float = 0.20  # 20%

    # 市值下限
    min_market_cap: float = 500_000_000  # $500M


# ============================================================================
# 数据类定义
# ============================================================================

@dataclass
class ExclusionResult:
    """排除检查结果"""
    ticker: str
    excluded: bool
    reason: Optional[ExclusionReason] = None
    details: str = ""
    warnings: List[str] = field(default_factory=list)
    data_quality_score: int = 100
    check_timestamp: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self) -> Dict:
        """转换为字典"""
        result = asdict(self)
        if self.reason:
            result['reason'] = self.reason.value
        return result


@dataclass
class CompanyProfile:
    """公司基本信息"""
    ticker: str
    company_name: str
    sector: str = ""
    industry: str = ""
    sub_industry: str = ""
    country: str = ""
    market_cap: float = 0
    price: float = 0
    avg_volume: float = 0
    ipo_date: Optional[str] = None

    @classmethod
    def from_fmp(cls, data: Dict) -> 'CompanyProfile':
        """从FMP数据创建"""
        return cls(
            ticker=data.get('symbol', ''),
            company_name=data.get('companyName', ''),
            sector=data.get('sector', ''),
            industry=data.get('industry', ''),
            sub_industry=data.get('subIndustry', ''),
            country=data.get('country', ''),
            market_cap=data.get('mktCap', 0),
            price=data.get('price', 0),
            avg_volume=data.get('volAvg', 0),
            ipo_date=data.get('ipoDate'),
        )


# ============================================================================
# API 客户端
# ============================================================================

class FMPClient:
    """Financial Modeling Prep API 客户端"""

    BASE_URL = "https://financialmodelingprep.com/api"

    def __init__(self, api_key: str, rate_limit_delay: float = 0.3):
        self.api_key = api_key
        self.rate_limit_delay = rate_limit_delay
        self._last_request_time = 0

    def _make_request(self, endpoint: str, params: Dict = None) -> Optional[Any]:
        """发送API请求"""
        # 速率限制
        elapsed = time.time() - self._last_request_time
        if elapsed < self.rate_limit_delay:
            time.sleep(self.rate_limit_delay - elapsed)

        url = f"{self.BASE_URL}/{endpoint}"
        params = params or {}
        params['apikey'] = self.api_key

        try:
            response = requests.get(url, params=params, timeout=15)
            self._last_request_time = time.time()

            if response.status_code == 200:
                return response.json()
            else:
                logger.warning(f"API请求失败: {url}, 状态码: {response.status_code}")
        except Exception as e:
            logger.error(f"API请求异常: {url}, 错误: {str(e)}")

        return None

    def get_profile(self, ticker: str) -> Optional[CompanyProfile]:
        """获取公司基本信息"""
        data = self._make_request(f"v3/profile/{ticker}")
        if data and len(data) > 0:
            return CompanyProfile.from_fmp(data[0])
        return None

    def get_income_statement(self, ticker: str, period: str = 'annual', limit: int = 5) -> Optional[pd.DataFrame]:
        """获取利润表"""
        data = self._make_request(f"v3/income-statement/{ticker}", {'period': period, 'limit': limit})
        if data:
            return pd.DataFrame(data)
        return None

    def get_balance_sheet(self, ticker: str, period: str = 'annual', limit: int = 3) -> Optional[pd.DataFrame]:
        """获取资产负债表"""
        data = self._make_request(f"v3/balance-sheet-statement/{ticker}", {'period': period, 'limit': limit})
        if data:
            return pd.DataFrame(data)
        return None

    def get_cash_flow(self, ticker: str, period: str = 'annual', limit: int = 3) -> Optional[pd.DataFrame]:
        """获取现金流量表"""
        data = self._make_request(f"v3/cash-flow-statement/{ticker}", {'period': period, 'limit': limit})
        if data:
            return pd.DataFrame(data)
        return None

    def get_key_metrics(self, ticker: str, period: str = 'annual', limit: int = 5) -> Optional[pd.DataFrame]:
        """获取关键指标"""
        data = self._make_request(f"v3/key-metrics/{ticker}", {'period': period, 'limit': limit})
        if data:
            return pd.DataFrame(data)
        return None

    def get_historical_price(self, ticker: str, years: int = 3) -> Optional[pd.DataFrame]:
        """获取历史价格"""
        from_date = (datetime.now() - timedelta(days=years * 365)).strftime('%Y-%m-%d')
        to_date = datetime.now().strftime('%Y-%m-%d')
        data = self._make_request(f"v3/historical-price-full/{ticker}", {'from': from_date, 'to': to_date})
        if data and 'historical' in data:
            return pd.DataFrame(data['historical'])
        return None

    def get_insider_trading(self, ticker: str, limit: int = 100) -> Optional[pd.DataFrame]:
        """获取内部人交易"""
        data = self._make_request(f"v4/insider-trading", {'symbol': ticker, 'limit': limit})
        if data:
            return pd.DataFrame(data)
        return None

    def get_stock_news(self, ticker: str, limit: int = 50) -> Optional[List[Dict]]:
        """获取股票新闻"""
        return self._make_request(f"v3/stock_news", {'tickers': ticker, 'limit': limit})

    def get_sec_filings(self, ticker: str, limit: int = 50) -> Optional[List[Dict]]:
        """获取SEC文件"""
        return self._make_request(f"v3/sec_filings/{ticker}", {'limit': limit})


# ============================================================================
# 排除规则检查器
# ============================================================================

class ExclusionChecker:
    """排除规则检查器"""

    def __init__(self, api_client: FMPClient,
                 financial_thresholds: FinancialThresholds = None,
                 governance_thresholds: GovernanceThresholds = None,
                 market_thresholds: MarketThresholds = None):
        self.client = api_client
        self.fin_thresh = financial_thresholds or FinancialThresholds()
        self.gov_thresh = governance_thresholds or GovernanceThresholds()
        self.mkt_thresh = market_thresholds or MarketThresholds()

    # ========== 规则1: 行业排除 ==========

    def check_industry_exclusion(self, profile: CompanyProfile) -> ExclusionResult:
        """
        检查是否属于排除行业

        规则:
        - 匹配EXCLUDED_INDUSTRIES字典中的行业
        - 匹配EXCLUDED_INDUSTRY_KEYWORDS中的关键词
        - 特殊处理：药企但收入来自非临床业务可考虑
        """
        ticker = profile.ticker
        industry = profile.industry
        sector = profile.sector
        company_name = profile.company_name.lower()

        # 检查行业是否在排除列表
        if industry in EXCLUDED_INDUSTRIES:
            # 特殊处理：大型地区银行（>$10B市值）不排除
            if industry == 'Banks - Regional' and profile.market_cap >= 10_000_000_000:
                return ExclusionResult(
                    ticker=ticker,
                    excluded=False,
                    warnings=[f"地区银行但市值${profile.market_cap/1e9:.0f}B >= $10B，不排除"]
                )

            # 特殊处理：大型多元化银行（>$50B市值）不排除
            if industry == 'Banks - Diversified' and profile.market_cap >= 50_000_000_000:
                return ExclusionResult(
                    ticker=ticker,
                    excluded=False,
                    warnings=[f"多元化银行市值${profile.market_cap/1e9:.0f}B >= $50B，不排除"]
                )

            # 确定排除原因
            if 'Biotech' in industry or 'Pharma' in industry or 'Drug' in industry:
                reason = ExclusionReason.INDUSTRY_BIOTECH
            elif 'Shell' in industry or 'SPAC' in industry:
                reason = ExclusionReason.INDUSTRY_SPAC
            elif 'Cannabis' in industry:
                reason = ExclusionReason.INDUSTRY_CANNABIS
            elif 'Crypto' in industry:
                reason = ExclusionReason.INDUSTRY_CRYPTO
            elif 'E&P' in industry or 'Exploration' in industry:
                reason = ExclusionReason.INDUSTRY_OIL_EXPLORATION
            elif 'Mining' in industry or 'Gold' in industry or 'Silver' in industry:
                reason = ExclusionReason.INDUSTRY_MINING_JUNIOR
            elif 'Bank' in industry:
                reason = ExclusionReason.INDUSTRY_REGIONAL_BANK
            elif 'Office' in industry and 'REIT' in industry:
                reason = ExclusionReason.INDUSTRY_OFFICE_REIT
            else:
                reason = ExclusionReason.INDUSTRY_BIOTECH  # 默认

            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=reason,
                details=f"行业={industry}: {EXCLUDED_INDUSTRIES[industry]}"
            )

        # 检查关键词匹配
        combined_text = f"{industry} {sector} {company_name}".lower()
        for keyword in EXCLUDED_INDUSTRY_KEYWORDS:
            if keyword in combined_text:
                # 特殊处理：如果是大公司的制药部门，可能需要进一步检查
                if keyword in ['pharmaceutical', 'drug'] and profile.market_cap > 50_000_000_000:
                    # 大市值药企可能主要收入来自已上市产品，需要进一步检查
                    return ExclusionResult(
                        ticker=ticker,
                        excluded=False,
                        warnings=[f"关键词匹配'{keyword}'但市值>${profile.market_cap/1e9:.0f}B，需进一步检查"]
                    )

                # 确定具体的排除原因
                if keyword in ['biotech', 'pharmaceutical', 'drug', 'clinical']:
                    reason = ExclusionReason.INDUSTRY_BIOTECH
                elif keyword in ['spac', 'acquisition corp', 'blank check']:
                    reason = ExclusionReason.INDUSTRY_SPAC
                elif keyword in ['cannabis', 'marijuana']:
                    reason = ExclusionReason.INDUSTRY_CANNABIS
                elif keyword in ['crypto', 'blockchain', 'bitcoin']:
                    reason = ExclusionReason.INDUSTRY_CRYPTO
                elif keyword in ['exploration', 'mining']:
                    reason = ExclusionReason.INDUSTRY_OIL_EXPLORATION
                else:
                    reason = ExclusionReason.INDUSTRY_BIOTECH  # 默认

                return ExclusionResult(
                    ticker=ticker,
                    excluded=True,
                    reason=reason,
                    details=f"关键词匹配: '{keyword}' 在 '{combined_text[:100]}'"
                )

        # 检查小型地区银行
        if 'bank' in industry.lower() and profile.market_cap < 10_000_000_000:
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.INDUSTRY_REGIONAL_BANK,
                details=f"小型地区银行 (市值=${profile.market_cap/1e9:.1f}B < $10B)"
            )

        # 检查办公REIT
        if 'office' in industry.lower() and 'reit' in industry.lower():
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.INDUSTRY_OFFICE_REIT,
                details="办公REIT面临远程办公结构性冲击"
            )

        return ExclusionResult(ticker=ticker, excluded=False)

    # ========== 规则2: 数据完整性排除 ==========

    def check_data_completeness(self, ticker: str) -> ExclusionResult:
        """
        检查数据完整性

        规则:
        - 核心财务数据缺失 > 20% -> 排除
        - 价格历史 < 3年 -> 排除（无法计算Sharpe）
        - 最近季报延迟 > 60天 -> 警示
        """
        missing_fields = []
        warnings = []
        data_quality_score = 100

        # 检查利润表数据
        income = self.client.get_income_statement(ticker, 'annual', 5)
        if income is None or len(income) < 4:
            missing_fields.append('revenue (5年)')
            data_quality_score -= 20
        else:
            # 检查数据完整性
            revenue_data = income['revenue'].dropna()
            if len(revenue_data) < 4:
                missing_fields.append('revenue数据缺失>20%')
                data_quality_score -= 10

        # 检查现金流数据
        cash_flow = self.client.get_cash_flow(ticker, 'annual', 3)
        if cash_flow is None or len(cash_flow) < 3:
            missing_fields.append('cash_flow (3年)')
            data_quality_score -= 15

        # 检查资产负债表
        balance = self.client.get_balance_sheet(ticker, 'annual', 1)
        if balance is None or len(balance) < 1:
            missing_fields.append('balance_sheet')
            data_quality_score -= 15

        # 检查价格历史
        price_history = self.client.get_historical_price(ticker, 3)
        if price_history is None or len(price_history) < MIN_PRICE_HISTORY_DAYS:
            actual_days = len(price_history) if price_history is not None else 0
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.DATA_PRICE_HISTORY,
                details=f"价格历史不足: {actual_days}天 < {MIN_PRICE_HISTORY_DAYS}天 (无法计算3年Sharpe)",
                data_quality_score=data_quality_score
            )

        # 检查数据时效性
        if income is not None and len(income) > 0:
            try:
                latest_date = pd.to_datetime(income.iloc[0].get('date'))
                days_since = (datetime.now() - latest_date).days
                if days_since > DATA_FRESHNESS_THRESHOLD:
                    warnings.append(f"最近财报{days_since}天前，可能有未披露事件")
            except:
                pass

        # 检查缺失比例
        if len(missing_fields) > len(REQUIRED_DATA_FIELDS) * 0.2:
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.DATA_MISSING,
                details=f"数据缺失过多: {missing_fields}",
                data_quality_score=data_quality_score
            )

        return ExclusionResult(
            ticker=ticker,
            excluded=False,
            warnings=warnings,
            data_quality_score=data_quality_score
        )

    # ========== 规则3: 财务健康排除 ==========

    def check_financial_health(self, ticker: str, profile: CompanyProfile) -> ExclusionResult:
        """
        检查财务健康状况

        规则:
        - 连续3年亏损 -> 排除
        - 3年累计OCF为负 -> 排除
        - D/E > 3.0 -> 排除
        - 利息覆盖率 < 2.0 -> 排除
        - 流动比率 < 0.8 -> 排除
        - Altman Z < 1.8 -> 排除
        """
        exclusion_reasons = []
        warnings = []

        # 获取财务数据
        income = self.client.get_income_statement(ticker, 'annual', 3)
        cash_flow = self.client.get_cash_flow(ticker, 'annual', 3)
        balance = self.client.get_balance_sheet(ticker, 'annual', 1)

        if income is None or balance is None:
            return ExclusionResult(
                ticker=ticker,
                excluded=False,
                warnings=["无法获取财务数据进行健康检查"]
            )

        # 1. 检查连续亏损
        if len(income) >= self.fin_thresh.consecutive_loss_years:
            net_incomes = income['netIncome'].head(self.fin_thresh.consecutive_loss_years).values
            if all(ni < 0 for ni in net_incomes if pd.notna(ni)):
                exclusion_reasons.append(f"连续{self.fin_thresh.consecutive_loss_years}年亏损")

        # 2. 检查累计OCF
        if cash_flow is not None and len(cash_flow) >= self.fin_thresh.negative_ocf_years:
            ocf_values = cash_flow['operatingCashFlow'].head(self.fin_thresh.negative_ocf_years).values
            ocf_sum = sum(ocf for ocf in ocf_values if pd.notna(ocf))
            if ocf_sum < 0:
                exclusion_reasons.append(f"{self.fin_thresh.negative_ocf_years}年累计OCF为负 (${ocf_sum/1e6:.0f}M)")

        # 3. 检查杠杆
        if len(balance) > 0:
            b = balance.iloc[0]
            total_debt = b.get('totalDebt', 0) or 0
            shareholders_equity = b.get('totalStockholdersEquity', 0) or 0

            if shareholders_equity > 0:
                debt_equity = total_debt / shareholders_equity
                if debt_equity > self.fin_thresh.max_debt_equity:
                    exclusion_reasons.append(f"杠杆过高: D/E={debt_equity:.1f} > {self.fin_thresh.max_debt_equity}")
            elif total_debt > 0:
                exclusion_reasons.append("负股东权益")

        # 4. 检查利息覆盖率
        if len(income) > 0 and len(balance) > 0:
            i = income.iloc[0]
            ebit = i.get('operatingIncome', 0) or 0
            interest_expense = abs(i.get('interestExpense', 0) or 0)

            if interest_expense > 0:
                interest_coverage = ebit / interest_expense
                if interest_coverage < self.fin_thresh.min_interest_coverage:
                    exclusion_reasons.append(f"利息覆盖不足: {interest_coverage:.1f}x < {self.fin_thresh.min_interest_coverage}x")

        # 5. 检查流动比率
        if len(balance) > 0:
            b = balance.iloc[0]
            current_assets = b.get('totalCurrentAssets', 0) or 0
            current_liabilities = b.get('totalCurrentLiabilities', 0) or 0

            if current_liabilities > 0:
                current_ratio = current_assets / current_liabilities
                if current_ratio < self.fin_thresh.min_current_ratio:
                    exclusion_reasons.append(f"流动性不足: CR={current_ratio:.2f} < {self.fin_thresh.min_current_ratio}")

        # 6. 计算Altman Z-Score
        z_score = self._calculate_altman_z(income, balance, profile)
        if z_score is not None:
            if z_score < self.fin_thresh.min_altman_z:
                exclusion_reasons.append(f"破产风险: Z-Score={z_score:.2f} < {self.fin_thresh.min_altman_z}")
            elif z_score < 2.99:  # 灰色区域
                warnings.append(f"Z-Score={z_score:.2f} 处于灰色区域(1.8-2.99)")

        if exclusion_reasons:
            # 返回第一个排除原因
            reason_text = exclusion_reasons[0]
            if '亏损' in reason_text:
                reason = ExclusionReason.FINANCIAL_CONSECUTIVE_LOSS
            elif 'OCF' in reason_text:
                reason = ExclusionReason.FINANCIAL_NEGATIVE_OCF
            elif '杠杆' in reason_text or 'D/E' in reason_text:
                reason = ExclusionReason.FINANCIAL_HIGH_LEVERAGE
            elif '利息' in reason_text:
                reason = ExclusionReason.FINANCIAL_LOW_INTEREST_COVERAGE
            elif '流动' in reason_text:
                reason = ExclusionReason.FINANCIAL_LOW_LIQUIDITY
            else:
                reason = ExclusionReason.FINANCIAL_BANKRUPTCY_RISK

            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=reason,
                details="; ".join(exclusion_reasons),
                warnings=warnings
            )

        return ExclusionResult(ticker=ticker, excluded=False, warnings=warnings)

    def _calculate_altman_z(self, income: pd.DataFrame, balance: pd.DataFrame,
                           profile: CompanyProfile) -> Optional[float]:
        """计算Altman Z-Score"""
        if income is None or balance is None or len(income) < 1 or len(balance) < 1:
            return None

        try:
            b = balance.iloc[0]
            i = income.iloc[0]

            total_assets = b.get('totalAssets', 0) or 0
            if total_assets <= 0:
                return None

            working_capital = (b.get('totalCurrentAssets', 0) or 0) - (b.get('totalCurrentLiabilities', 0) or 0)
            retained_earnings = b.get('retainedEarnings', 0) or 0
            ebit = i.get('operatingIncome', 0) or 0
            market_cap = profile.market_cap or 0
            total_liabilities = b.get('totalLiabilities', 0) or 0
            revenue = i.get('revenue', 0) or 0

            # Z = 1.2×(营运资本/总资产) + 1.4×(留存收益/总资产) +
            #     3.3×(EBIT/总资产) + 0.6×(市值/总负债) + 1.0×(收入/总资产)
            z1 = 1.2 * (working_capital / total_assets)
            z2 = 1.4 * (retained_earnings / total_assets)
            z3 = 3.3 * (ebit / total_assets)
            z4 = 0.6 * (market_cap / total_liabilities) if total_liabilities > 0 else 0
            z5 = 1.0 * (revenue / total_assets)

            return z1 + z2 + z3 + z4 + z5
        except Exception as e:
            logger.warning(f"计算Z-Score失败: {str(e)}")
            return None

    # ========== 规则4: 治理与合规排除 ==========

    def check_governance(self, ticker: str) -> ExclusionResult:
        """
        检查公司治理与合规风险

        规则:
        - 审计意见异常 -> 排除
        - 频繁财务重述(>1次/3年) -> 排除
        - SEC正在调查 -> 排除
        - 核心管理层不稳定 -> 排除
        - 内部人大量抛售 -> 排除
        """
        exclusion_reasons = []
        warnings = []

        # 1. 检查新闻中的治理风险信号
        news = self.client.get_stock_news(ticker, 50)
        if news:
            fraud_keywords = ['investigation', 'fraud', 'sec', 'lawsuit', 'class action',
                            'restatement', 'accounting', 'scandal', 'whistleblower', 'indictment']

            recent_date = datetime.now() - timedelta(days=180)  # 6个月内

            for article in news[:30]:
                try:
                    article_date = datetime.strptime(article.get('publishedDate', '')[:10], '%Y-%m-%d')
                    if article_date < recent_date:
                        continue
                except:
                    continue

                title = article.get('title', '').lower()
                text = article.get('text', '').lower()

                for keyword in fraud_keywords:
                    if keyword in title:
                        exclusion_reasons.append(f"新闻标题包含'{keyword}': {article.get('title', '')[:80]}")
                        break
                    elif keyword in text and keyword in ['fraud', 'sec investigation', 'indictment']:
                        warnings.append(f"新闻提及'{keyword}'")

        # 2. 检查SEC文件中的风险信号
        sec_filings = self.client.get_sec_filings(ticker, 50)
        if sec_filings:
            for filing in sec_filings[:20]:
                filing_type = filing.get('type', '')
                # 8-K中的管理层变更
                if filing_type == '8-K':
                    description = filing.get('description', '').lower()
                    if 'cfo' in description or 'chief financial' in description:
                        warnings.append(f"CFO变更通知: {filing.get('description', '')[:50]}")
                    if 'ceo' in description or 'chief executive' in description:
                        warnings.append(f"CEO变更通知: {filing.get('description', '')[:50]}")

                # NT (延迟提交)
                if 'NT' in filing_type:
                    warnings.append(f"财报延迟提交: {filing_type}")

        # 3. 检查内部人交易
        insider = self.client.get_insider_trading(ticker)
        if insider is not None and len(insider) >= 5:
            six_months_ago = datetime.now() - timedelta(days=180)

            try:
                insider['transactionDate'] = pd.to_datetime(insider['transactionDate'], errors='coerce')
                recent = insider[insider['transactionDate'] > six_months_ago]

                if len(recent) >= 3:
                    # 计算净卖出
                    recent['value'] = recent['securitiesTransacted'] * recent['price']

                    purchases = recent[recent['acquistionOrDisposition'] == 'A']['value'].sum()
                    sales = recent[recent['acquistionOrDisposition'] == 'D']['value'].sum()

                    if sales > self.gov_thresh.insider_selling_amount:
                        if (sales + purchases) > 0:
                            sell_ratio = sales / (sales + purchases)
                            if sell_ratio > self.gov_thresh.insider_selling_threshold:
                                exclusion_reasons.append(
                                    f"内部人大量抛售: 6个月净卖出${sales/1e6:.1f}M (卖出率{sell_ratio:.0%})"
                                )
            except Exception as e:
                logger.warning(f"分析内部人交易失败: {str(e)}")

        if exclusion_reasons:
            reason_text = exclusion_reasons[0]
            if 'sec' in reason_text.lower() or 'investigation' in reason_text.lower():
                reason = ExclusionReason.GOVERNANCE_SEC
            elif 'restatement' in reason_text.lower():
                reason = ExclusionReason.GOVERNANCE_RESTATEMENT
            elif '内部人' in reason_text or 'insider' in reason_text.lower():
                reason = ExclusionReason.GOVERNANCE_INSIDER_SELLING
            elif 'cfo' in reason_text.lower() or 'ceo' in reason_text.lower():
                reason = ExclusionReason.GOVERNANCE_EXEC_TURNOVER
            else:
                reason = ExclusionReason.GOVERNANCE_AUDIT

            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=reason,
                details="; ".join(exclusion_reasons),
                warnings=warnings
            )

        return ExclusionResult(ticker=ticker, excluded=False, warnings=warnings)

    # ========== 规则5: 市场风险排除 ==========

    def check_market_risk(self, ticker: str, profile: CompanyProfile) -> ExclusionResult:
        """
        检查市场风险

        规则:
        - 日均交易额 < $5M -> 排除
        - 年化波动率 > 80% -> 排除
        - 3年最大回撤 > 60% -> 排除
        - 空头比例 > 20% -> 排除
        """
        exclusion_reasons = []
        warnings = []

        # 1. 检查流动性
        daily_dollar_volume = profile.avg_volume * profile.price
        if daily_dollar_volume < self.mkt_thresh.min_daily_volume:
            exclusion_reasons.append(
                f"流动性不足: 日均交易额=${daily_dollar_volume/1e6:.2f}M < ${self.mkt_thresh.min_daily_volume/1e6}M"
            )

        # 2. 检查市值
        if profile.market_cap < self.mkt_thresh.min_market_cap:
            exclusion_reasons.append(
                f"市值过小: ${profile.market_cap/1e6:.0f}M < ${self.mkt_thresh.min_market_cap/1e6}M"
            )

        # 3. 检查波动率和回撤
        price_history = self.client.get_historical_price(ticker, 3)
        if price_history is not None and len(price_history) >= 250:
            try:
                prices = price_history['close'].values[::-1]  # 按时间正序

                # 计算年化波动率
                returns = np.diff(np.log(prices))
                volatility = np.std(returns) * np.sqrt(252)

                if volatility > self.mkt_thresh.max_volatility:
                    exclusion_reasons.append(
                        f"波动率过高: {volatility:.0%} > {self.mkt_thresh.max_volatility:.0%}"
                    )
                elif volatility > 0.5:
                    warnings.append(f"波动率较高: {volatility:.0%}")

                # 计算最大回撤
                peak = prices[0]
                max_drawdown = 0
                for price in prices:
                    if price > peak:
                        peak = price
                    drawdown = (price - peak) / peak
                    if drawdown < max_drawdown:
                        max_drawdown = drawdown

                if max_drawdown < self.mkt_thresh.max_drawdown:
                    exclusion_reasons.append(
                        f"历史回撤过大: {max_drawdown:.0%} < {self.mkt_thresh.max_drawdown:.0%}"
                    )
                elif max_drawdown < -0.4:
                    warnings.append(f"历史回撤较大: {max_drawdown:.0%}")

            except Exception as e:
                logger.warning(f"计算波动率/回撤失败: {str(e)}")

        if exclusion_reasons:
            reason_text = exclusion_reasons[0]
            if '流动性' in reason_text or '交易额' in reason_text:
                reason = ExclusionReason.MARKET_LOW_VOLUME
            elif '波动率' in reason_text:
                reason = ExclusionReason.MARKET_HIGH_VOLATILITY
            elif '回撤' in reason_text:
                reason = ExclusionReason.MARKET_LARGE_DRAWDOWN
            elif '空头' in reason_text:
                reason = ExclusionReason.MARKET_SHORT_CROWDED
            else:
                reason = ExclusionReason.MARKET_LOW_VOLUME

            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=reason,
                details="; ".join(exclusion_reasons),
                warnings=warnings
            )

        return ExclusionResult(ticker=ticker, excluded=False, warnings=warnings)

    # ========== 特殊情况排除 ==========

    def check_special_situations(self, profile: CompanyProfile) -> ExclusionResult:
        """
        检查特殊情况

        规则:
        - Penny Stock (价格<$5, 市值<$500M) -> 排除
        - Pre-Revenue -> 排除
        - IPO<2年 -> 排除
        - 中国ADR -> 排除（审计风险）
        """
        ticker = profile.ticker

        # 1. Penny Stock
        if profile.price < 5 and profile.market_cap < 500_000_000:
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.SPECIAL_PENNY_STOCK,
                details=f"Penny Stock: 价格=${profile.price:.2f}, 市值=${profile.market_cap/1e6:.0f}M"
            )

        # 2. 检查IPO时间
        if profile.ipo_date:
            try:
                ipo_dt = datetime.strptime(profile.ipo_date, '%Y-%m-%d')
                years_since_ipo = (datetime.now() - ipo_dt).days / 365

                if years_since_ipo < 2:
                    return ExclusionResult(
                        ticker=ticker,
                        excluded=True,
                        reason=ExclusionReason.SPECIAL_RECENT_IPO,
                        details=f"IPO<2年: 上市于{profile.ipo_date} ({years_since_ipo:.1f}年)"
                    )
            except:
                pass

        # 3. 中国ADR
        country = profile.country.lower()
        if country in ['cn', 'china', 'hk', 'hong kong', 'cayman islands']:
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.SPECIAL_CHINESE_ADR,
                details=f"中国相关ADR (国家={profile.country}): PCAOB审计风险"
            )

        return ExclusionResult(ticker=ticker, excluded=False)


# ============================================================================
# 综合排除引擎
# ============================================================================

class ExclusionEngine:
    """综合排除引擎"""

    def __init__(self, api_key: str):
        self.client = FMPClient(api_key)
        self.checker = ExclusionChecker(self.client)
        self.exclusion_log: List[ExclusionResult] = []
        self.stats = {reason.value: 0 for reason in ExclusionReason}
        self.stats['passed'] = 0

    def run_exclusion_checks(self, ticker: str) -> ExclusionResult:
        """
        运行所有排除检查

        返回:
        - ExclusionResult对象，包含:
          - excluded: True/False
          - reason: 排除原因
          - details: 详细信息
          - warnings: 警示列表
        """
        all_warnings = []

        # 1. 获取公司基本信息
        profile = self.client.get_profile(ticker)
        if profile is None:
            return ExclusionResult(
                ticker=ticker,
                excluded=True,
                reason=ExclusionReason.DATA_MISSING,
                details="无法获取公司基本信息"
            )

        # 2. 按顺序执行排除检查
        checks = [
            ("行业排除", lambda: self.checker.check_industry_exclusion(profile)),
            ("特殊情况", lambda: self.checker.check_special_situations(profile)),
            ("数据完整性", lambda: self.checker.check_data_completeness(ticker)),
            ("财务健康", lambda: self.checker.check_financial_health(ticker, profile)),
            ("治理合规", lambda: self.checker.check_governance(ticker)),
            ("市场风险", lambda: self.checker.check_market_risk(ticker, profile)),
        ]

        for check_name, check_func in checks:
            try:
                result = check_func()
                all_warnings.extend(result.warnings)

                if result.excluded:
                    # 更新统计
                    if result.reason:
                        self.stats[result.reason.value] = self.stats.get(result.reason.value, 0) + 1

                    # 记录日志
                    logger.info(f"[排除] {ticker}: {result.reason.value if result.reason else '未知'} - {result.details}")

                    # 合并警示
                    result.warnings = all_warnings
                    self.exclusion_log.append(result)
                    return result

            except Exception as e:
                logger.error(f"检查 {ticker} 的 {check_name} 时出错: {str(e)}")
                all_warnings.append(f"{check_name}检查异常: {str(e)}")

        # 通过所有检查
        self.stats['passed'] += 1
        logger.info(f"[通过] {ticker}")

        return ExclusionResult(
            ticker=ticker,
            excluded=False,
            warnings=all_warnings
        )

    def process_stock_pool(self, stock_pool: pd.DataFrame,
                          output_prefix: str = "exclusion_results") -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        处理整个股票池

        参数:
        - stock_pool: 包含Ticker和Company列的DataFrame
        - output_prefix: 输出文件前缀

        返回:
        - (passed_df, excluded_df): 通过和排除的公司DataFrame
        """
        total = len(stock_pool)
        logger.info(f"开始处理股票池: {total}家公司")

        results = []
        passed_list = []
        excluded_list = []

        for idx, row in stock_pool.iterrows():
            ticker = row.get('Ticker', row.get('ticker', row.get('symbol', '')))
            company = row.get('Company', row.get('company', row.get('companyName', '')))

            if not ticker:
                continue

            logger.info(f"[{idx+1}/{total}] 检查 {ticker} - {company}")

            result = self.run_exclusion_checks(ticker)
            result_dict = result.to_dict()
            result_dict['Company'] = company

            results.append(result_dict)

            if result.excluded:
                excluded_list.append(result_dict)
            else:
                passed_list.append(result_dict)

            # 避免API限流
            time.sleep(0.3)

        # 转换为DataFrame
        results_df = pd.DataFrame(results)
        passed_df = pd.DataFrame(passed_list)
        excluded_df = pd.DataFrame(excluded_list)

        # 保存结果
        self._save_results(results_df, passed_df, excluded_df, output_prefix, total)

        logger.info(f"\n排除规则执行完成!")
        logger.info(f"起始池: {total}家公司")
        logger.info(f"排除: {len(excluded_list)}家")
        logger.info(f"通过: {len(passed_list)}家")
        logger.info(f"排除率: {len(excluded_list)/total*100:.1f}%")

        return passed_df, excluded_df

    def _save_results(self, results_df: pd.DataFrame, passed_df: pd.DataFrame,
                     excluded_df: pd.DataFrame, output_prefix: str, total: int):
        """保存结果文件"""
        # 保存所有结果
        results_df.to_csv(os.path.join(EXCLUSIONS_DIR, f"{output_prefix}_all.csv"), index=False)

        # 保存排除公司
        if len(excluded_df) > 0:
            excluded_df.to_csv(os.path.join(EXCLUSIONS_DIR, "excluded_companies.csv"), index=False)

        # 保存通过公司
        if len(passed_df) > 0:
            passed_df.to_csv(os.path.join(DATA_DIR, "passed_companies.csv"), index=False)

        # 生成排除日志
        self._save_exclusion_log()

        # 生成总结报告
        self._generate_summary_report(excluded_df, passed_df, total)

    def _save_exclusion_log(self):
        """保存排除日志"""
        if not self.exclusion_log:
            return

        log_data = [r.to_dict() for r in self.exclusion_log]
        log_df = pd.DataFrame(log_data)
        log_df.to_csv(os.path.join(EXCLUSIONS_DIR, "exclusion_log.csv"), index=False)

    def _generate_summary_report(self, excluded_df: pd.DataFrame,
                                passed_df: pd.DataFrame, total: int):
        """生成总结报告"""
        summary = f"""# 排除规则执行总结

## 执行时间
{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 基本统计

| 指标 | 数值 |
|------|------|
| 起始池 | {total:,}家公司 |
| 排除 | {len(excluded_df):,}家 |
| 通过 | {len(passed_df):,}家 |
| 排除率 | {len(excluded_df)/total*100:.1f}% |

## 排除原因分布

| 排除原因 | 数量 | 占比 |
|---------|------|------|
"""
        # 按排除原因统计
        for reason, count in sorted(self.stats.items(), key=lambda x: -x[1]):
            if count > 0 and reason != 'passed':
                pct = count / len(excluded_df) * 100 if len(excluded_df) > 0 else 0
                summary += f"| {reason} | {count} | {pct:.1f}% |\n"

        summary += f"""
## 排除原因详细分类

### 行业排除
{self._count_by_prefix(excluded_df, '行业排除')}

### 数据排除
{self._count_by_prefix(excluded_df, '数据排除')}

### 财务排除
{self._count_by_prefix(excluded_df, '财务排除')}

### 治理排除
{self._count_by_prefix(excluded_df, '治理排除')}

### 市场排除
{self._count_by_prefix(excluded_df, '市场排除')}

### 特殊排除
{self._count_by_prefix(excluded_df, '特殊排除')}

## 输出文件

- `exclusions/excluded_companies.csv` - 所有被排除公司
- `exclusions/exclusion_log.csv` - 详细排除日志
- `data/passed_companies.csv` - 通过筛选的公司
- `exclusions/exclusion_summary.md` - 本总结报告

## 下一步

通过筛选的 {len(passed_df)} 家公司已保存至 `data/passed_companies.csv`，
可进入下一阶段的质量评分和排名流程。
"""

        with open(os.path.join(EXCLUSIONS_DIR, "exclusion_summary.md"), 'w', encoding='utf-8') as f:
            f.write(summary)

    def _count_by_prefix(self, df: pd.DataFrame, prefix: str) -> str:
        """按前缀统计排除原因"""
        if len(df) == 0 or 'reason' not in df.columns:
            return "无"

        mask = df['reason'].str.startswith(prefix, na=False)
        count = mask.sum()
        return f"{count}家公司" if count > 0 else "无"


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主函数"""
    import os

    # 获取API Key
    api_key = os.getenv('FMP_API_KEY', '')

    if not api_key:
        print("错误: 请设置FMP_API_KEY环境变量")
        print("方法: export FMP_API_KEY='your_actual_key'")
        return

    # 创建引擎
    engine = ExclusionEngine(api_key)

    # 查找股票池文件
    stock_pool_file = os.path.join(DATA_DIR, "initial_stock_pool.csv")

    if not os.path.exists(stock_pool_file):
        print(f"警告: 股票池文件不存在: {stock_pool_file}")
        print("创建示例股票池进行测试...")

        sample_stocks = pd.DataFrame({
            'Ticker': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA',
                      'META', 'MRNA', 'COIN', 'GME'],
            'Company': ['Apple Inc', 'Microsoft', 'Alphabet', 'Amazon', 'Tesla',
                       'NVIDIA', 'Meta Platforms', 'Moderna', 'Coinbase', 'GameStop']
        })
        sample_stocks.to_csv(stock_pool_file, index=False)

    # 加载股票池
    stock_pool = pd.read_csv(stock_pool_file)

    # 执行排除检查
    passed_df, excluded_df = engine.process_stock_pool(stock_pool)

    print(f"\n完成! 结果已保存至 {EXCLUSIONS_DIR}")


if __name__ == "__main__":
    main()
