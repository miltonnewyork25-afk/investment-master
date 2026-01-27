#!/usr/bin/env python3
"""
基本面质量评分引擎 v2.0
Fundamental Quality Scoring Engine

Agent 3: 聚焦护城河、现金流质量、资产负债表健康度
建立严格的基本面质量评分系统，满分100分

五大评分维度：
1. 现金流与盈利质量 (25分)
2. 利润结构与经营韧性 (20分)
3. 资本效率与资产负债表 (20分)
4. 护城河证据 (25分)
5. 盈利可见性与确定性 (10分)

版本: v2.0
日期: 2026-01-26
"""

import os
import sys
import json
import requests
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, asdict, field
from datetime import datetime, timedelta
from enum import Enum
import warnings

warnings.filterwarnings('ignore')

# =============================================================================
# 配置
# =============================================================================

# FMP API配置 - 从环境变量或.env文件读取
def load_api_key():
    """加载FMP API密钥"""
    # 首先尝试环境变量
    key = os.environ.get('FMP_API_KEY')
    if key:
        return key

    # 尝试从.env文件读取
    env_file = '/Users/milton/投资大师/.env'
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                if line.startswith('FMP_API_KEY='):
                    return line.split('=', 1)[1].strip()

    # 默认值
    return 'fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb'


FMP_API_KEY = load_api_key()
FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3'

# 评分阈值配置
SCORING_CONFIG = {
    'ocf_ni_excellent': 1.0,
    'ocf_ni_good': 0.8,
    'ocf_ni_acceptable': 0.6,
    'ocf_ni_warning': 0.5,

    'roic_excellent': 0.20,
    'roic_good': 0.15,
    'roic_acceptable': 0.10,

    'interest_coverage_excellent': 10.0,
    'interest_coverage_good': 5.0,
    'interest_coverage_acceptable': 2.0,

    'net_debt_ebitda_excellent': 1.0,
    'net_debt_ebitda_good': 2.0,
    'net_debt_ebitda_acceptable': 3.0,
}

# 行业基准数据
INDUSTRY_BENCHMARKS = {
    'Technology': {
        'median_gross_margin': 0.55,
        'median_roic': 0.15,
        'median_asset_turnover': 0.55,
        'leverage_tolerance': 'low',
        'growth_premium': True,
    },
    'Healthcare': {
        'median_gross_margin': 0.60,
        'median_roic': 0.12,
        'median_asset_turnover': 0.45,
        'leverage_tolerance': 'medium',
        'growth_premium': True,
    },
    'Consumer Cyclical': {
        'median_gross_margin': 0.30,
        'median_roic': 0.12,
        'median_asset_turnover': 1.2,
        'leverage_tolerance': 'medium',
        'growth_premium': False,
    },
    'Consumer Defensive': {
        'median_gross_margin': 0.35,
        'median_roic': 0.15,
        'median_asset_turnover': 1.5,
        'leverage_tolerance': 'medium',
        'growth_premium': False,
    },
    'Financials': {
        'median_gross_margin': None,  # 不适用
        'median_roic': 0.10,
        'median_asset_turnover': 0.05,
        'leverage_tolerance': 'high',
        'use_roa': True,
    },
    'Real Estate': {
        'median_gross_margin': None,
        'median_roic': 0.06,
        'median_asset_turnover': 0.10,
        'leverage_tolerance': 'high',
        'use_ffo': True,
    },
    'Energy': {
        'median_gross_margin': 0.35,
        'median_roic': 0.08,
        'median_asset_turnover': 0.50,
        'leverage_tolerance': 'medium',
        'cycle_adjusted': True,
    },
    'Industrials': {
        'median_gross_margin': 0.30,
        'median_roic': 0.12,
        'median_asset_turnover': 0.80,
        'leverage_tolerance': 'medium',
        'growth_premium': False,
    },
    'Utilities': {
        'median_gross_margin': 0.40,
        'median_roic': 0.06,
        'median_asset_turnover': 0.30,
        'leverage_tolerance': 'high',
        'stable_dividend': True,
    },
    'Materials': {
        'median_gross_margin': 0.25,
        'median_roic': 0.10,
        'median_asset_turnover': 0.70,
        'leverage_tolerance': 'medium',
        'cycle_adjusted': True,
    },
    'Communication Services': {
        'median_gross_margin': 0.50,
        'median_roic': 0.10,
        'median_asset_turnover': 0.40,
        'leverage_tolerance': 'medium',
        'growth_premium': True,
    },
}


# =============================================================================
# 数据类定义
# =============================================================================

class MoatType(Enum):
    """护城河类型"""
    NETWORK_EFFECT = "Network Effect"
    SWITCHING_COST = "Switching Cost"
    COST_ADVANTAGE = "Cost Advantage"
    INTANGIBLE_ASSETS = "Intangible Assets"
    EFFICIENT_SCALE = "Efficient Scale"
    NONE = "No Moat"


class QualityGrade(Enum):
    """质量评级"""
    A_PLUS = "A+"
    A = "A"
    B_PLUS = "B+"
    B = "B"
    C = "C"
    D = "D"
    F = "F"


@dataclass
class DimensionScore:
    """维度评分"""
    dimension: str
    score: float
    max_score: float
    percentage: float
    sub_scores: Dict[str, float]
    evidence: Dict[str, Any]
    red_flags: List[str]
    data_sources: List[str]


@dataclass
class ExclusionCheck:
    """排除检查结果"""
    is_excluded: bool
    reasons: List[str]
    severity: str  # 'hard' or 'soft'


@dataclass
class FundamentalScore:
    """综合基本面评分"""
    ticker: str
    company_name: str
    sector: str
    industry: str

    # 总分与评级
    total_score: float
    grade: str

    # 五大维度分数
    cash_flow_quality: DimensionScore
    profit_structure: DimensionScore
    capital_efficiency: DimensionScore
    moat_strength: DimensionScore
    earnings_visibility: DimensionScore

    # 排除检查
    exclusion_check: ExclusionCheck

    # 元数据
    evaluation_date: str
    data_as_of: str
    confidence_level: str  # 'high', 'medium', 'low'

    def to_dict(self) -> Dict:
        """转换为字典"""
        return {
            'ticker': self.ticker,
            'company_name': self.company_name,
            'sector': self.sector,
            'industry': self.industry,
            'total_score': self.total_score,
            'grade': self.grade,
            'dimensions': {
                'cash_flow_quality': asdict(self.cash_flow_quality),
                'profit_structure': asdict(self.profit_structure),
                'capital_efficiency': asdict(self.capital_efficiency),
                'moat_strength': asdict(self.moat_strength),
                'earnings_visibility': asdict(self.earnings_visibility),
            },
            'exclusion_check': asdict(self.exclusion_check),
            'evaluation_date': self.evaluation_date,
            'data_as_of': self.data_as_of,
            'confidence_level': self.confidence_level,
        }


# =============================================================================
# FMP API 数据获取
# =============================================================================

class FMPDataFetcher:
    """FMP API 数据获取器"""

    def __init__(self, api_key: str = None):
        self.api_key = api_key or FMP_API_KEY
        self.base_url = FMP_BASE_URL
        self.session = requests.Session()
        self.cache = {}

    def _request(self, endpoint: str, params: dict = None) -> Optional[Any]:
        """发送API请求"""
        cache_key = f"{endpoint}_{json.dumps(params or {})}"
        if cache_key in self.cache:
            return self.cache[cache_key]

        params = params or {}
        params['apikey'] = self.api_key
        url = f"{self.base_url}/{endpoint}"

        try:
            response = self.session.get(url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            self.cache[cache_key] = data
            return data
        except Exception as e:
            print(f"[ERROR] API请求失败: {endpoint} - {e}")
            return None

    def get_company_profile(self, ticker: str) -> Optional[Dict]:
        """获取公司概况"""
        data = self._request(f"profile/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_income_statement(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取利润表"""
        data = self._request(f"income-statement/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_balance_sheet(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取资产负债表"""
        data = self._request(f"balance-sheet-statement/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_cash_flow_statement(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取现金流量表"""
        data = self._request(f"cash-flow-statement/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_key_metrics(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取关键指标"""
        data = self._request(f"key-metrics/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_ratios(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取财务比率"""
        data = self._request(f"ratios/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_ratios_ttm(self, ticker: str) -> Optional[Dict]:
        """获取TTM财务比率"""
        data = self._request(f"ratios-ttm/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_key_metrics_ttm(self, ticker: str) -> Optional[Dict]:
        """获取TTM关键指标"""
        data = self._request(f"key-metrics-ttm/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_enterprise_value(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取企业价值"""
        data = self._request(f"enterprise-values/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_analyst_estimates(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取分析师预估"""
        data = self._request(f"analyst-estimates/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_historical_prices(self, ticker: str, days: int = 365) -> List[Dict]:
        """获取历史价格"""
        data = self._request(f"historical-price-full/{ticker}")
        if data and 'historical' in data:
            return data['historical'][:days]
        return []

    def compile_financial_data(self, ticker: str) -> Dict:
        """编译完整财务数据"""
        print(f"[INFO] 获取 {ticker} 财务数据...")

        profile = self.get_company_profile(ticker) or {}
        income = self.get_income_statement(ticker, 'annual', 5)
        balance = self.get_balance_sheet(ticker, 'annual', 5)
        cash_flow = self.get_cash_flow_statement(ticker, 'annual', 5)
        metrics = self.get_key_metrics(ticker, 'annual', 5)
        ratios = self.get_ratios(ticker, 'annual', 5)
        ratios_ttm = self.get_ratios_ttm(ticker) or {}
        metrics_ttm = self.get_key_metrics_ttm(ticker) or {}
        estimates = self.get_analyst_estimates(ticker, 'annual', 2)

        # 计算TTM数据
        income_q = self.get_income_statement(ticker, 'quarter', 4)
        balance_q = self.get_balance_sheet(ticker, 'quarter', 1)
        cash_flow_q = self.get_cash_flow_statement(ticker, 'quarter', 4)

        ttm_data = self._calculate_ttm(income_q, cash_flow_q, balance_q)

        return {
            'ticker': ticker,
            'profile': profile,
            'income_statement': income,
            'balance_sheet': balance,
            'cash_flow_statement': cash_flow,
            'key_metrics': metrics,
            'ratios': ratios,
            'ratios_ttm': ratios_ttm,
            'metrics_ttm': metrics_ttm,
            'analyst_estimates': estimates,
            'ttm_data': ttm_data,
            'income_statement_quarterly': income_q,
            'balance_sheet_quarterly': balance_q,
            'cash_flow_quarterly': cash_flow_q,
            'data_date': datetime.now().strftime('%Y-%m-%d'),
        }

    def _calculate_ttm(self, income_q: List, cash_flow_q: List, balance_q: List) -> Dict:
        """计算TTM数据"""
        ttm = {}

        if len(income_q) >= 4:
            ttm['revenue'] = sum(q.get('revenue', 0) or 0 for q in income_q[:4])
            ttm['net_income'] = sum(q.get('netIncome', 0) or 0 for q in income_q[:4])
            ttm['gross_profit'] = sum(q.get('grossProfit', 0) or 0 for q in income_q[:4])
            ttm['operating_income'] = sum(q.get('operatingIncome', 0) or 0 for q in income_q[:4])
            ttm['ebitda'] = sum(q.get('ebitda', 0) or 0 for q in income_q[:4])
            ttm['interest_expense'] = sum(q.get('interestExpense', 0) or 0 for q in income_q[:4])

        if len(cash_flow_q) >= 4:
            ttm['operating_cash_flow'] = sum(q.get('operatingCashFlow', 0) or 0 for q in cash_flow_q[:4])
            ttm['free_cash_flow'] = sum(q.get('freeCashFlow', 0) or 0 for q in cash_flow_q[:4])
            ttm['capital_expenditure'] = sum(abs(q.get('capitalExpenditure', 0) or 0) for q in cash_flow_q[:4])

        if balance_q and len(balance_q) > 0:
            latest = balance_q[0]
            ttm['total_assets'] = latest.get('totalAssets', 0) or 0
            ttm['total_equity'] = latest.get('totalStockholdersEquity', 0) or 0
            ttm['total_debt'] = latest.get('totalDebt', 0) or 0
            ttm['cash'] = latest.get('cashAndCashEquivalents', 0) or 0
            ttm['accounts_receivable'] = latest.get('netReceivables', 0) or 0
            ttm['inventory'] = latest.get('inventory', 0) or 0
            ttm['accounts_payable'] = latest.get('accountPayables', 0) or 0
            ttm['current_assets'] = latest.get('totalCurrentAssets', 0) or 0
            ttm['current_liabilities'] = latest.get('totalCurrentLiabilities', 0) or 0

        return ttm


# =============================================================================
# 评分维度1: 现金流与盈利质量 (25分)
# =============================================================================

class CashFlowQualityScorer:
    """现金流与盈利质量评分器"""

    MAX_SCORE = 25

    def __init__(self):
        self.config = SCORING_CONFIG

    def score(self, data: Dict) -> DimensionScore:
        """
        评分现金流与盈利质量

        评分标准:
        - OCF/Net Income比率 (10分)
        - FCF质量与一致性 (8分)
        - 营运资本变化 (7分)

        扣分项:
        - 应收账款增速 > 营收增速 → -3分
        - 存货增速 > 营收增速 × 1.5 → -3分
        - 应付账款大幅减少 → -2分
        """
        sub_scores = {}
        evidence = {}
        red_flags = []
        data_sources = []

        ttm = data.get('ttm_data', {})
        income = data.get('income_statement', [])
        cash_flow = data.get('cash_flow_statement', [])
        balance = data.get('balance_sheet', [])

        total_score = 0

        # =====================================================================
        # 1. OCF/Net Income比率 (10分)
        # =====================================================================
        ocf = ttm.get('operating_cash_flow', 0)
        net_income = ttm.get('net_income', 0)

        if net_income > 0:
            ocf_ni_ratio = ocf / net_income

            if ocf_ni_ratio >= 1.0:
                ocf_score = 10
                quality = 'Excellent'
            elif ocf_ni_ratio >= 0.8:
                ocf_score = 8
                quality = 'Good'
            elif ocf_ni_ratio >= 0.6:
                ocf_score = 6
                quality = 'Acceptable'
            elif ocf_ni_ratio >= 0.5:
                ocf_score = 4
                quality = 'Warning'
            else:
                ocf_score = 2
                quality = 'Poor'
                red_flags.append(f"OCF/NI比率过低({ocf_ni_ratio:.2f})，利润质量存疑")

            sub_scores['ocf_ni_ratio'] = ocf_score
            evidence['ocf_ni_ratio'] = {
                'value': round(ocf_ni_ratio, 3),
                'ocf': ocf,
                'net_income': net_income,
                'quality': quality,
                'threshold': 'OCF/NI >= 1.0 为优秀'
            }
            data_sources.append('Cash Flow Statement TTM')
        else:
            # 净利润为负
            if ocf > 0:
                ocf_score = 5  # 至少经营现金流为正
                evidence['ocf_ni_ratio'] = {
                    'value': 'N/A (Net Income <= 0)',
                    'ocf': ocf,
                    'net_income': net_income,
                    'note': '净利润为负但OCF为正'
                }
            else:
                ocf_score = 0
                red_flags.append("净利润和经营现金流均为负")
                evidence['ocf_ni_ratio'] = {
                    'value': 'N/A',
                    'warning': '净利润和OCF均为负'
                }
            sub_scores['ocf_ni_ratio'] = ocf_score

        total_score += sub_scores.get('ocf_ni_ratio', 0)

        # =====================================================================
        # 2. FCF质量与一致性 (8分)
        # =====================================================================
        fcf = ttm.get('free_cash_flow', 0)

        # FCF/NI比率 (4分)
        if net_income > 0:
            fcf_ni_ratio = fcf / net_income
            if fcf_ni_ratio >= 0.9:
                fcf_ratio_score = 4
            elif fcf_ni_ratio >= 0.7:
                fcf_ratio_score = 3
            elif fcf_ni_ratio >= 0.5:
                fcf_ratio_score = 2
            else:
                fcf_ratio_score = 1

            evidence['fcf_ni_ratio'] = round(fcf_ni_ratio, 3)
        else:
            fcf_ratio_score = 2 if fcf > 0 else 0
            evidence['fcf_ni_ratio'] = 'N/A'

        sub_scores['fcf_ratio'] = fcf_ratio_score

        # FCF一致性 - 5年正FCF次数 (4分)
        fcf_positive_count = 0
        if cash_flow and len(cash_flow) >= 3:
            for cf in cash_flow[:5]:
                if (cf.get('freeCashFlow', 0) or 0) > 0:
                    fcf_positive_count += 1

            consistency_score = min(4, fcf_positive_count)
            evidence['fcf_consistency'] = {
                'positive_years': fcf_positive_count,
                'out_of': min(5, len(cash_flow)),
                'interpretation': f"{fcf_positive_count}/5年FCF为正"
            }
        else:
            consistency_score = 2  # 数据不足给中间分
            evidence['fcf_consistency'] = 'Insufficient data'

        sub_scores['fcf_consistency'] = consistency_score
        total_score += fcf_ratio_score + consistency_score

        # =====================================================================
        # 3. 营运资本变化 (7分)
        # =====================================================================
        wc_score = 7  # 从满分开始扣除

        if len(income) >= 2 and len(balance) >= 2:
            # 当前年度和上一年度
            current_revenue = income[0].get('revenue', 0) or 0
            prior_revenue = income[1].get('revenue', 0) or 0
            revenue_growth = (current_revenue - prior_revenue) / prior_revenue if prior_revenue > 0 else 0

            current_ar = balance[0].get('netReceivables', 0) or 0
            prior_ar = balance[1].get('netReceivables', 0) or 0
            ar_growth = (current_ar - prior_ar) / prior_ar if prior_ar > 0 else 0

            current_inv = balance[0].get('inventory', 0) or 0
            prior_inv = balance[1].get('inventory', 0) or 0
            inv_growth = (current_inv - prior_inv) / prior_inv if prior_inv > 0 else 0

            current_ap = balance[0].get('accountPayables', 0) or 0
            prior_ap = balance[1].get('accountPayables', 0) or 0
            ap_growth = (current_ap - prior_ap) / prior_ap if prior_ap > 0 else 0

            # 扣分项检查
            # 应收账款增速 > 营收增速
            if ar_growth > revenue_growth + 0.05:  # 5%容忍度
                wc_score -= 3
                red_flags.append(f"应收账款增速({ar_growth:.1%})超过营收增速({revenue_growth:.1%})")

            # 存货增速 > 营收增速 × 1.5
            if inv_growth > revenue_growth * 1.5 + 0.1 and current_inv > 0:
                wc_score -= 3
                red_flags.append(f"存货增速({inv_growth:.1%})异常，可能积压")

            # 应付账款大幅减少
            if ap_growth < -0.15:
                wc_score -= 1
                red_flags.append("应付账款大幅减少，可能供应商关系恶化")

            evidence['working_capital'] = {
                'revenue_growth': round(revenue_growth, 3),
                'ar_growth': round(ar_growth, 3),
                'inventory_growth': round(inv_growth, 3),
                'ap_growth': round(ap_growth, 3),
                'deductions': 7 - wc_score
            }
            data_sources.append('Balance Sheet YoY Comparison')
        else:
            evidence['working_capital'] = 'Insufficient data for YoY comparison'

        wc_score = max(0, wc_score)
        sub_scores['working_capital'] = wc_score
        total_score += wc_score

        return DimensionScore(
            dimension="Cash Flow Quality",
            score=round(total_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(total_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=evidence,
            red_flags=red_flags,
            data_sources=data_sources
        )


# =============================================================================
# 评分维度2: 利润结构与经营韧性 (20分)
# =============================================================================

class ProfitStructureScorer:
    """利润结构与经营韧性评分器"""

    MAX_SCORE = 20

    def score(self, data: Dict) -> DimensionScore:
        """
        评分利润结构与经营韧性

        评分标准:
        - 毛利率稳定性 (6分)
        - 营业利润率趋势 (6分)
        - 费用率控制 (4分)
        - 经营杠杆可解释性 (4分)
        """
        sub_scores = {}
        evidence = {}
        red_flags = []
        data_sources = []

        income = data.get('income_statement', [])
        ratios = data.get('ratios', [])
        profile = data.get('profile', {})
        sector = profile.get('sector', 'Unknown')

        total_score = 0

        # =====================================================================
        # 1. 毛利率稳定性 (6分)
        # =====================================================================
        gm_values = []
        for stmt in income[:5]:
            revenue = stmt.get('revenue', 0) or 0
            gp = stmt.get('grossProfit', 0) or 0
            if revenue > 0:
                gm_values.append(gp / revenue)

        if len(gm_values) >= 3:
            gm_mean = np.mean(gm_values)
            gm_std = np.std(gm_values)
            gm_trend = gm_values[0] - gm_values[-1]  # 正数表示上升

            # 标准差评分
            if gm_std < 0.03:
                gm_score = 6
                stability = 'Very Stable'
            elif gm_std < 0.05:
                gm_score = 4
                stability = 'Stable'
            elif gm_std < 0.08:
                gm_score = 2
                stability = 'Moderate'
            else:
                gm_score = 0
                stability = 'Volatile'
                red_flags.append(f"毛利率波动较大(标准差{gm_std:.1%})")

            # 趋势加成/减分
            if gm_trend > 0.02:
                gm_score = min(6, gm_score + 1)
            elif gm_trend < -0.03:
                gm_score = max(0, gm_score - 1)
                red_flags.append("毛利率下降趋势")

            evidence['gross_margin'] = {
                'current': round(gm_values[0], 3),
                'mean_5y': round(gm_mean, 3),
                'std_5y': round(gm_std, 3),
                'trend': 'Rising' if gm_trend > 0.01 else ('Falling' if gm_trend < -0.01 else 'Stable'),
                'stability': stability
            }
            data_sources.append('Income Statement 5-Year History')
        else:
            gm_score = 3
            evidence['gross_margin'] = 'Insufficient data'

        sub_scores['gross_margin_stability'] = gm_score
        total_score += gm_score

        # =====================================================================
        # 2. 营业利润率趋势 (6分)
        # =====================================================================
        om_values = []
        for stmt in income[:5]:
            revenue = stmt.get('revenue', 0) or 0
            op_income = stmt.get('operatingIncome', 0) or 0
            if revenue > 0:
                om_values.append(op_income / revenue)

        if len(om_values) >= 3:
            om_current = om_values[0]
            om_prior = om_values[-1]
            om_trend = om_current - om_prior

            # 趋势评分
            if om_trend > 0.03:
                om_score = 6
                trend_desc = 'Strong Improvement'
            elif om_trend > 0.01:
                om_score = 5
                trend_desc = 'Improving'
            elif om_trend > -0.01:
                om_score = 4
                trend_desc = 'Stable'
            elif om_trend > -0.03:
                om_score = 2
                trend_desc = 'Declining'
            else:
                om_score = 0
                trend_desc = 'Sharp Decline'
                red_flags.append(f"营业利润率大幅下降({om_trend:.1%})")

            evidence['operating_margin'] = {
                'current': round(om_current, 3),
                'prior': round(om_prior, 3),
                'change': round(om_trend, 3),
                'trend': trend_desc
            }
        else:
            om_score = 3
            evidence['operating_margin'] = 'Insufficient data'

        sub_scores['operating_margin_trend'] = om_score
        total_score += om_score

        # =====================================================================
        # 3. 费用率控制 (4分)
        # =====================================================================
        if income and len(income) > 0:
            latest = income[0]
            revenue = latest.get('revenue', 0) or 0
            sga = latest.get('sellingGeneralAndAdministrativeExpenses', 0) or 0
            rd = latest.get('researchAndDevelopmentExpenses', 0) or 0

            if revenue > 0:
                sga_ratio = sga / revenue
                rd_ratio = rd / revenue

                # 获取行业基准
                benchmark = INDUSTRY_BENCHMARKS.get(sector, {})

                # 费用率评分 (简化逻辑)
                if sector == 'Technology':
                    # 科技公司允许更高研发
                    expense_score = 4 if sga_ratio < 0.25 else (3 if sga_ratio < 0.35 else 2)
                elif sector in ['Consumer Defensive', 'Consumer Cyclical']:
                    expense_score = 4 if sga_ratio < 0.20 else (3 if sga_ratio < 0.30 else 2)
                else:
                    expense_score = 4 if sga_ratio < 0.15 else (3 if sga_ratio < 0.25 else 2)

                evidence['expense_control'] = {
                    'sga_ratio': round(sga_ratio, 3),
                    'rd_ratio': round(rd_ratio, 3),
                    'total_opex_ratio': round((sga + rd) / revenue, 3) if revenue > 0 else 0
                }
            else:
                expense_score = 2
                evidence['expense_control'] = 'No revenue data'
        else:
            expense_score = 2
            evidence['expense_control'] = 'Insufficient data'

        sub_scores['expense_control'] = expense_score
        total_score += expense_score

        # =====================================================================
        # 4. 经营杠杆可解释性 (4分)
        # =====================================================================
        # 检查固定成本占比与行业特性匹配
        if len(income) >= 2:
            current_revenue = income[0].get('revenue', 0) or 0
            prior_revenue = income[1].get('revenue', 0) or 0
            current_op = income[0].get('operatingIncome', 0) or 0
            prior_op = income[1].get('operatingIncome', 0) or 0

            if prior_revenue > 0 and prior_op > 0:
                revenue_change = (current_revenue - prior_revenue) / prior_revenue
                op_change = (current_op - prior_op) / prior_op if prior_op > 0 else 0

                # 经营杠杆 = 营业利润变化% / 收入变化%
                if revenue_change != 0:
                    operating_leverage = op_change / revenue_change

                    # 评分逻辑
                    if 1.0 <= operating_leverage <= 3.0:
                        leverage_score = 4
                        leverage_note = 'Healthy operating leverage'
                    elif 0.5 <= operating_leverage < 1.0:
                        leverage_score = 3
                        leverage_note = 'Low operating leverage'
                    elif operating_leverage > 3.0:
                        leverage_score = 2
                        leverage_note = 'High operating leverage - more volatile'
                    else:
                        leverage_score = 1
                        leverage_note = 'Negative leverage or unusual'

                    evidence['operating_leverage'] = {
                        'value': round(operating_leverage, 2),
                        'revenue_change': round(revenue_change, 3),
                        'op_income_change': round(op_change, 3),
                        'note': leverage_note
                    }
                else:
                    leverage_score = 2
                    evidence['operating_leverage'] = 'Revenue unchanged'
            else:
                leverage_score = 2
                evidence['operating_leverage'] = 'Insufficient data'
        else:
            leverage_score = 2
            evidence['operating_leverage'] = 'Insufficient data'

        sub_scores['operating_leverage'] = leverage_score
        total_score += leverage_score

        return DimensionScore(
            dimension="Profit Structure",
            score=round(total_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(total_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=evidence,
            red_flags=red_flags,
            data_sources=data_sources
        )


# =============================================================================
# 评分维度3: 资本效率与资产负债表 (20分)
# =============================================================================

class CapitalEfficiencyScorer:
    """资本效率与资产负债表评分器"""

    MAX_SCORE = 20

    def score(self, data: Dict) -> DimensionScore:
        """
        评分资本效率与资产负债表

        评分标准:
        - ROIC vs WACC (8分) - 最重要
        - ROE质量 (4分)
        - 杠杆与偿债能力 (5分)
        - 债务到期结构 (3分)
        """
        sub_scores = {}
        evidence = {}
        red_flags = []
        data_sources = []

        ttm = data.get('ttm_data', {})
        metrics_ttm = data.get('metrics_ttm', {})
        ratios_ttm = data.get('ratios_ttm', {})
        balance = data.get('balance_sheet', [])
        profile = data.get('profile', {})
        sector = profile.get('sector', 'Unknown')

        total_score = 0

        # =====================================================================
        # 1. ROIC vs WACC (8分)
        # =====================================================================
        roic = metrics_ttm.get('roicTTM', 0) or 0

        # 估算WACC (简化方法)
        beta = profile.get('beta', 1.0) or 1.0
        risk_free_rate = 0.04  # 假设4%无风险利率
        market_premium = 0.05  # 5%市场风险溢价
        cost_of_equity = risk_free_rate + beta * market_premium

        # 假设债务成本
        total_debt = ttm.get('total_debt', 0)
        total_equity = ttm.get('total_equity', 1)
        if total_debt > 0 and total_equity > 0:
            debt_ratio = total_debt / (total_debt + total_equity)
            equity_ratio = 1 - debt_ratio
            cost_of_debt = 0.05  # 假设5%税前债务成本
            tax_rate = 0.21
            wacc = equity_ratio * cost_of_equity + debt_ratio * cost_of_debt * (1 - tax_rate)
        else:
            wacc = cost_of_equity

        roic_spread = roic - wacc

        # 评分
        if roic_spread > 0.10:
            roic_score = 8
            roic_quality = 'Exceptional Value Creation'
        elif roic_spread > 0.05:
            roic_score = 6
            roic_quality = 'Strong Value Creation'
        elif roic_spread > 0:
            roic_score = 4
            roic_quality = 'Value Creation'
        elif roic_spread > -0.03:
            roic_score = 2
            roic_quality = 'Marginal'
        else:
            roic_score = 0
            roic_quality = 'Value Destruction'
            red_flags.append(f"ROIC({roic:.1%}) < WACC({wacc:.1%})，正在摧毁价值")

        sub_scores['roic_vs_wacc'] = roic_score
        evidence['roic'] = {
            'roic': round(roic, 4),
            'estimated_wacc': round(wacc, 4),
            'spread': round(roic_spread, 4),
            'quality': roic_quality,
            'beta': round(beta, 2)
        }
        data_sources.append('Key Metrics TTM')
        total_score += roic_score

        # =====================================================================
        # 2. ROE质量 (4分)
        # =====================================================================
        roe = ratios_ttm.get('returnOnEquityTTM', 0) or 0
        net_margin = ratios_ttm.get('netProfitMarginTTM', 0) or 0

        if balance and len(balance) > 0:
            latest = balance[0]
            total_assets = latest.get('totalAssets', 0) or 1
            total_equity = latest.get('totalStockholdersEquity', 0) or 1
            equity_multiplier = total_assets / total_equity if total_equity > 0 else 1
        else:
            equity_multiplier = 1

        # ROE评分 (考虑来源)
        if roe >= 0.20:
            roe_base_score = 2
        elif roe >= 0.15:
            roe_base_score = 1.5
        elif roe >= 0.10:
            roe_base_score = 1
        else:
            roe_base_score = 0.5

        # ROE来源质量
        if net_margin > 0.15 and equity_multiplier < 3:
            roe_quality_score = 2
            roe_source = 'High margin, low leverage - Quality'
        elif equity_multiplier > 4:
            roe_quality_score = 0
            roe_source = 'High leverage driven - Risk'
            red_flags.append(f"ROE主要由高杠杆驱动(权益乘数{equity_multiplier:.1f}x)")
        else:
            roe_quality_score = 1
            roe_source = 'Balanced'

        roe_score = min(4, roe_base_score + roe_quality_score)
        sub_scores['roe_quality'] = roe_score
        evidence['roe'] = {
            'roe': round(roe, 4),
            'net_margin': round(net_margin, 4),
            'equity_multiplier': round(equity_multiplier, 2),
            'source_quality': roe_source
        }
        total_score += roe_score

        # =====================================================================
        # 3. 杠杆与偿债能力 (5分)
        # =====================================================================
        ebitda = ttm.get('ebitda', 0)
        interest_expense = ttm.get('interest_expense', 0)
        total_debt = ttm.get('total_debt', 0)
        cash = ttm.get('cash', 0)
        net_debt = total_debt - cash

        leverage_score = 5  # 从满分开始

        # Net Debt / EBITDA
        if ebitda > 0:
            nd_ebitda = net_debt / ebitda

            if nd_ebitda < 0:  # 净现金
                nd_score = 5
                nd_quality = 'Net Cash Position'
            elif nd_ebitda < 1.0:
                nd_score = 4
                nd_quality = 'Very Low Leverage'
            elif nd_ebitda < 2.0:
                nd_score = 3
                nd_quality = 'Low Leverage'
            elif nd_ebitda < 3.0:
                nd_score = 2
                nd_quality = 'Moderate Leverage'
            elif nd_ebitda < 4.0:
                nd_score = 1
                nd_quality = 'High Leverage'
            else:
                nd_score = 0
                nd_quality = 'Very High Leverage'
                red_flags.append(f"杠杆过高(Net Debt/EBITDA = {nd_ebitda:.1f}x)")

            # 行业调整
            benchmark = INDUSTRY_BENCHMARKS.get(sector, {})
            if benchmark.get('leverage_tolerance') == 'high':
                nd_score = min(5, nd_score + 1)

            evidence['leverage'] = {
                'net_debt': net_debt,
                'net_debt_ebitda': round(nd_ebitda, 2),
                'quality': nd_quality
            }
        else:
            nd_score = 2
            evidence['leverage'] = 'EBITDA <= 0, cannot calculate'

        # Interest Coverage
        if interest_expense > 0:
            ebit = ttm.get('operating_income', 0)
            interest_coverage = ebit / interest_expense if interest_expense > 0 else float('inf')

            if interest_coverage > 10:
                ic_adj = 0
            elif interest_coverage >= 5:
                ic_adj = 0
            elif interest_coverage >= 2:
                ic_adj = -1
            else:
                ic_adj = -2
                red_flags.append(f"利息覆盖率过低({interest_coverage:.1f}x)")

            nd_score = max(0, nd_score + ic_adj)
            evidence['interest_coverage'] = round(interest_coverage, 2)
        else:
            evidence['interest_coverage'] = 'No significant interest expense'

        sub_scores['leverage_health'] = nd_score
        total_score += nd_score

        # =====================================================================
        # 4. 债务到期结构 (3分) - 简化版
        # =====================================================================
        # 由于FMP API限制，这里使用简化逻辑
        current_liabilities = ttm.get('current_liabilities', 0)
        current_assets = ttm.get('current_assets', 0)

        if current_liabilities > 0:
            current_ratio = current_assets / current_liabilities

            if current_ratio > 2.0:
                maturity_score = 3
                liquidity = 'Strong'
            elif current_ratio > 1.5:
                maturity_score = 2
                liquidity = 'Adequate'
            elif current_ratio > 1.0:
                maturity_score = 1
                liquidity = 'Tight'
            else:
                maturity_score = 0
                liquidity = 'Concern'
                red_flags.append(f"流动比率过低({current_ratio:.2f})")

            evidence['debt_maturity'] = {
                'current_ratio': round(current_ratio, 2),
                'liquidity_assessment': liquidity,
                'note': 'Simplified analysis based on current ratio'
            }
        else:
            maturity_score = 2
            evidence['debt_maturity'] = 'No current liabilities data'

        sub_scores['debt_maturity'] = maturity_score
        total_score += maturity_score

        return DimensionScore(
            dimension="Capital Efficiency",
            score=round(total_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(total_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=evidence,
            red_flags=red_flags,
            data_sources=data_sources
        )


# =============================================================================
# 评分维度4: 护城河证据 (25分) - 最重要的定性维度
# =============================================================================

class MoatScorer:
    """护城河评分器"""

    MAX_SCORE = 25

    def score(self, data: Dict, moat_analysis: Dict = None) -> DimensionScore:
        """
        评分护城河证据

        护城河类型 (每种最高5分):
        1. 网络效应 (Network Effects) - 最强
        2. 转换成本 (Switching Costs) - 强
        3. 成本优势 (Cost Advantages) - 中强
        4. 无形资产 (Intangibles) - 中
        5. 规模优势 (Economies of Scale) - 中

        必须有可验证证据才能得分
        """
        sub_scores = {}
        evidence = {}
        red_flags = []
        data_sources = []

        profile = data.get('profile', {})
        sector = profile.get('sector', 'Unknown')
        industry = profile.get('industry', 'Unknown')
        income = data.get('income_statement', [])
        ratios_ttm = data.get('ratios_ttm', {})
        metrics = data.get('key_metrics', [])

        total_score = 0

        # 如果有外部护城河分析，使用它
        if moat_analysis and moat_analysis.get('moat_total_score'):
            return self._score_from_external_analysis(moat_analysis)

        # 否则，基于财务数据推断护城河

        # =====================================================================
        # 1. 网络效应证据 (5分)
        # =====================================================================
        # 基于行业和商业模式推断
        network_effect_industries = [
            'Internet Content & Information', 'Software—Application',
            'Software—Infrastructure', 'Credit Services', 'Financial Data & Stock Exchanges'
        ]

        network_score = 0
        network_evidence = []

        if industry in network_effect_industries:
            # 检查收入增长是否伴随利润率提升 (网络效应的证据)
            if len(income) >= 3:
                revenue_cagr = self._calculate_cagr(income, 'revenue')
                margin_trend = self._calculate_margin_trend(income)

                if revenue_cagr > 0.15 and margin_trend > 0:
                    network_score = 4
                    network_evidence.append("高增长+利润率提升暗示网络效应")
                elif revenue_cagr > 0.10:
                    network_score = 2
                    network_evidence.append("行业具有网络效应特征")

        sub_scores['network_effect'] = network_score
        evidence['network_effect'] = {
            'score': network_score,
            'max_score': 5,
            'evidence': network_evidence if network_evidence else ['No clear network effect evidence'],
            'industry': industry
        }
        total_score += network_score

        # =====================================================================
        # 2. 转换成本证据 (5分)
        # =====================================================================
        switching_cost_industries = [
            'Software—Application', 'Software—Infrastructure', 'Banks—Regional',
            'Banks—Diversified', 'Information Technology Services',
            'Medical Devices', 'Healthcare Plans'
        ]

        switching_score = 0
        switching_evidence = []

        if industry in switching_cost_industries:
            switching_score = 3
            switching_evidence.append("行业特性导致高转换成本")

            # 如果毛利率高且稳定，加分
            gm = ratios_ttm.get('grossProfitMarginTTM', 0) or 0
            if gm > 0.60:
                switching_score = min(5, switching_score + 2)
                switching_evidence.append(f"高毛利率({gm:.1%})支持定价权")

        sub_scores['switching_costs'] = switching_score
        evidence['switching_costs'] = {
            'score': switching_score,
            'max_score': 5,
            'evidence': switching_evidence if switching_evidence else ['No clear switching cost evidence']
        }
        total_score += switching_score

        # =====================================================================
        # 3. 成本优势证据 (5分)
        # =====================================================================
        cost_score = 0
        cost_evidence = []

        # 比较毛利率与行业中位数
        gm = ratios_ttm.get('grossProfitMarginTTM', 0) or 0
        benchmark = INDUSTRY_BENCHMARKS.get(sector, {})
        industry_median_gm = benchmark.get('median_gross_margin', 0.30)

        if industry_median_gm and gm > 0:
            gm_premium = gm - industry_median_gm

            if gm_premium > 0.15:
                cost_score = 5
                cost_evidence.append(f"毛利率显著高于行业中位数(+{gm_premium:.1%})")
            elif gm_premium > 0.08:
                cost_score = 3
                cost_evidence.append(f"毛利率高于行业中位数(+{gm_premium:.1%})")
            elif gm_premium > 0:
                cost_score = 1
                cost_evidence.append(f"毛利率略高于行业中位数(+{gm_premium:.1%})")

        sub_scores['cost_advantage'] = cost_score
        evidence['cost_advantage'] = {
            'score': cost_score,
            'max_score': 5,
            'evidence': cost_evidence if cost_evidence else ['No clear cost advantage evidence'],
            'gross_margin': round(gm, 3),
            'industry_median': industry_median_gm
        }
        total_score += cost_score

        # =====================================================================
        # 4. 无形资产证据 (5分)
        # =====================================================================
        intangible_score = 0
        intangible_evidence = []

        # 品牌价值推断：高毛利率 + 低研发
        rd_ratio = 0
        if income and len(income) > 0:
            latest = income[0]
            revenue = latest.get('revenue', 0) or 0
            rd = latest.get('researchAndDevelopmentExpenses', 0) or 0
            if revenue > 0:
                rd_ratio = rd / revenue

        if gm > 0.50 and rd_ratio < 0.10:
            intangible_score += 3
            intangible_evidence.append("高毛利率+低研发支出暗示品牌溢价")

        # 监管壁垒行业
        regulated_industries = [
            'Banks', 'Insurance', 'Utilities', 'Drug Manufacturers',
            'Biotechnology', 'Medical Devices'
        ]
        if any(reg in industry for reg in regulated_industries):
            intangible_score = min(5, intangible_score + 2)
            intangible_evidence.append("受监管行业，存在进入壁垒")

        sub_scores['intangible_assets'] = intangible_score
        evidence['intangible_assets'] = {
            'score': intangible_score,
            'max_score': 5,
            'evidence': intangible_evidence if intangible_evidence else ['No clear intangible asset evidence']
        }
        total_score += intangible_score

        # =====================================================================
        # 5. 规模优势证据 (5分)
        # =====================================================================
        scale_score = 0
        scale_evidence = []

        # 市值作为规模代理
        market_cap = profile.get('mktCap', 0) or 0

        if market_cap > 200e9:
            scale_score = 3
            scale_evidence.append("大型公司，可能具有规模优势")
        elif market_cap > 50e9:
            scale_score = 2
            scale_evidence.append("中大型公司")
        elif market_cap > 10e9:
            scale_score = 1
            scale_evidence.append("中型公司")

        # 如果利润率随规模增长而提升，加分
        if len(income) >= 3:
            margin_trend = self._calculate_margin_trend(income)
            if margin_trend > 0.02:
                scale_score = min(5, scale_score + 2)
                scale_evidence.append("利润率提升暗示规模效应")

        sub_scores['scale_advantage'] = scale_score
        evidence['scale_advantage'] = {
            'score': scale_score,
            'max_score': 5,
            'evidence': scale_evidence if scale_evidence else ['Limited scale advantage evidence'],
            'market_cap': market_cap
        }
        total_score += scale_score

        # =====================================================================
        # 综合护城河评级
        # =====================================================================
        if total_score >= 18:
            moat_rating = 'Wide Moat'
        elif total_score >= 12:
            moat_rating = 'Narrow Moat'
        else:
            moat_rating = 'No Moat'
            if total_score < 8:
                red_flags.append("护城河证据不足，竞争优势可能有限")

        evidence['moat_rating'] = moat_rating
        evidence['primary_moat_type'] = self._identify_primary_moat(sub_scores)

        return DimensionScore(
            dimension="Moat Strength",
            score=round(total_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(total_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=evidence,
            red_flags=red_flags,
            data_sources=['Financial Statements', 'Company Profile', 'Industry Analysis']
        )

    def _score_from_external_analysis(self, moat_analysis: Dict) -> DimensionScore:
        """从外部护城河分析转换评分"""
        raw_score = moat_analysis.get('moat_total_score', 0)

        # 将0-100分转换为0-25分
        converted_score = raw_score * 0.25

        sub_scores = {
            'network_effect': moat_analysis.get('network_effects_score', 0),
            'switching_costs': moat_analysis.get('switching_costs_score', 0),
            'cost_advantage': moat_analysis.get('cost_advantage_score', 0),
            'intangible_assets': moat_analysis.get('intangible_assets_score', 0),
            'scale_advantage': moat_analysis.get('scale_advantage_score', 0),
        }

        return DimensionScore(
            dimension="Moat Strength",
            score=round(converted_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(converted_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=moat_analysis,
            red_flags=[],
            data_sources=['External Moat Analysis']
        )

    def _calculate_cagr(self, income: List, field: str) -> float:
        """计算复合年增长率"""
        if len(income) < 2:
            return 0

        current = income[0].get(field, 0) or 0
        oldest = income[-1].get(field, 0) or 0
        years = len(income) - 1

        if oldest > 0 and current > 0 and years > 0:
            return (current / oldest) ** (1 / years) - 1
        return 0

    def _calculate_margin_trend(self, income: List) -> float:
        """计算利润率趋势"""
        if len(income) < 2:
            return 0

        current_rev = income[0].get('revenue', 0) or 0
        current_op = income[0].get('operatingIncome', 0) or 0
        oldest_rev = income[-1].get('revenue', 0) or 0
        oldest_op = income[-1].get('operatingIncome', 0) or 0

        if current_rev > 0 and oldest_rev > 0:
            current_margin = current_op / current_rev
            oldest_margin = oldest_op / oldest_rev
            return current_margin - oldest_margin
        return 0

    def _identify_primary_moat(self, sub_scores: Dict) -> str:
        """识别主要护城河类型"""
        if not sub_scores:
            return MoatType.NONE.value

        max_score = max(sub_scores.values())
        if max_score == 0:
            return MoatType.NONE.value

        moat_mapping = {
            'network_effect': MoatType.NETWORK_EFFECT,
            'switching_costs': MoatType.SWITCHING_COST,
            'cost_advantage': MoatType.COST_ADVANTAGE,
            'intangible_assets': MoatType.INTANGIBLE_ASSETS,
            'scale_advantage': MoatType.EFFICIENT_SCALE,
        }

        for key, moat_type in moat_mapping.items():
            if sub_scores.get(key, 0) == max_score:
                return moat_type.value

        return MoatType.NONE.value


# =============================================================================
# 评分维度5: 盈利可见性与确定性 (10分)
# =============================================================================

class EarningsVisibilityScorer:
    """盈利可见性评分器"""

    MAX_SCORE = 10

    def score(self, data: Dict) -> DimensionScore:
        """
        评分盈利可见性与确定性

        评分标准:
        - 分析师预期一致性 (3分)
        - 历史指引准确性 (3分)
        - 收入结构 (2分)
        - 行业周期性 (2分)
        """
        sub_scores = {}
        evidence = {}
        red_flags = []
        data_sources = []

        estimates = data.get('analyst_estimates', [])
        income = data.get('income_statement', [])
        profile = data.get('profile', {})
        sector = profile.get('sector', 'Unknown')

        total_score = 0

        # =====================================================================
        # 1. 分析师预期一致性 (3分)
        # =====================================================================
        if estimates and len(estimates) > 0:
            latest_est = estimates[0]
            eps_high = latest_est.get('estimatedEpsHigh', 0) or 0
            eps_low = latest_est.get('estimatedEpsLow', 0) or 0
            eps_avg = latest_est.get('estimatedEpsAvg', 0) or 0

            if eps_avg > 0 and eps_high > 0 and eps_low > 0:
                # 计算变异系数 (标准差 / 均值)
                eps_range = eps_high - eps_low
                cv = eps_range / (2 * eps_avg) if eps_avg > 0 else 1

                if cv < 0.10:
                    consensus_score = 3
                    consensus = 'Strong Consensus'
                elif cv < 0.20:
                    consensus_score = 2
                    consensus = 'Moderate Consensus'
                elif cv < 0.35:
                    consensus_score = 1
                    consensus = 'Weak Consensus'
                else:
                    consensus_score = 0
                    consensus = 'High Dispersion'
                    red_flags.append("分析师预期分歧较大")

                evidence['analyst_consensus'] = {
                    'eps_high': eps_high,
                    'eps_low': eps_low,
                    'eps_avg': eps_avg,
                    'dispersion': round(cv, 3),
                    'assessment': consensus
                }
            else:
                consensus_score = 1
                evidence['analyst_consensus'] = 'Incomplete data'
        else:
            consensus_score = 1
            evidence['analyst_consensus'] = 'No analyst estimates available'

        sub_scores['analyst_consensus'] = consensus_score
        data_sources.append('Analyst Estimates')
        total_score += consensus_score

        # =====================================================================
        # 2. 历史指引准确性 (3分) - 简化版
        # =====================================================================
        # 使用EPS实际 vs 预期的历史数据 (需要更多API数据)
        # 这里使用盈利稳定性作为代理

        if len(income) >= 4:
            eps_values = []
            for stmt in income[:4]:
                eps = stmt.get('eps', 0) or 0
                eps_values.append(eps)

            if all(e > 0 for e in eps_values):
                eps_std = np.std(eps_values)
                eps_mean = np.mean(eps_values)
                eps_cv = eps_std / eps_mean if eps_mean > 0 else 1

                if eps_cv < 0.15:
                    guidance_score = 3
                    stability = 'Very Stable'
                elif eps_cv < 0.25:
                    guidance_score = 2
                    stability = 'Stable'
                elif eps_cv < 0.40:
                    guidance_score = 1
                    stability = 'Moderate'
                else:
                    guidance_score = 0
                    stability = 'Volatile'

                evidence['earnings_stability'] = {
                    'eps_cv': round(eps_cv, 3),
                    'assessment': stability,
                    'note': 'Using EPS stability as proxy for guidance accuracy'
                }
            else:
                guidance_score = 1
                evidence['earnings_stability'] = 'Inconsistent profitability'
        else:
            guidance_score = 1
            evidence['earnings_stability'] = 'Insufficient history'

        sub_scores['guidance_accuracy'] = guidance_score
        total_score += guidance_score

        # =====================================================================
        # 3. 收入结构 (2分)
        # =====================================================================
        # 订阅/经常性收入占比高 = 高可见性
        # 这里使用行业特性作为代理
        recurring_revenue_industries = [
            'Software—Application', 'Software—Infrastructure',
            'Information Technology Services', 'Healthcare Plans',
            'Insurance', 'Utilities', 'REITs'
        ]

        industry = profile.get('industry', '')

        if any(rec in industry for rec in recurring_revenue_industries):
            revenue_score = 2
            evidence['revenue_structure'] = {
                'type': 'Recurring/Subscription likely',
                'industry': industry,
                'visibility': 'High'
            }
        elif sector in ['Technology', 'Communication Services']:
            revenue_score = 1
            evidence['revenue_structure'] = {
                'type': 'Mixed',
                'industry': industry,
                'visibility': 'Medium'
            }
        else:
            revenue_score = 0.5
            evidence['revenue_structure'] = {
                'type': 'Transaction-based likely',
                'industry': industry,
                'visibility': 'Lower'
            }

        sub_scores['revenue_structure'] = revenue_score
        total_score += revenue_score

        # =====================================================================
        # 4. 行业周期性 (2分)
        # =====================================================================
        cyclical_sectors = ['Consumer Cyclical', 'Energy', 'Materials', 'Industrials']
        defensive_sectors = ['Consumer Defensive', 'Healthcare', 'Utilities']

        if sector in defensive_sectors:
            cyclicality_score = 2
            cyclicality = 'Defensive'
        elif sector in cyclical_sectors:
            cyclicality_score = 0
            cyclicality = 'Cyclical'
        else:
            cyclicality_score = 1
            cyclicality = 'Moderate'

        sub_scores['cyclicality'] = cyclicality_score
        evidence['cyclicality'] = {
            'sector': sector,
            'assessment': cyclicality,
            'visibility_impact': 'Higher' if cyclicality == 'Defensive' else 'Lower'
        }
        total_score += cyclicality_score

        return DimensionScore(
            dimension="Earnings Visibility",
            score=round(total_score, 1),
            max_score=self.MAX_SCORE,
            percentage=round(total_score / self.MAX_SCORE * 100, 1),
            sub_scores=sub_scores,
            evidence=evidence,
            red_flags=red_flags,
            data_sources=data_sources
        )


# =============================================================================
# 硬性排除规则检查
# =============================================================================

class ExclusionChecker:
    """排除规则检查器"""

    def check(self, data: Dict, dimension_scores: Dict) -> ExclusionCheck:
        """
        检查硬性排除条件

        硬性排除 (任一触发即排除):
        - OCF/Net Income < 0.5 连续2年
        - ROIC < WACC 连续3年
        - 护城河评分 = 0 (无可验证护城河)
        - 负债率 > 行业90分位
        """
        reasons = []
        is_excluded = False
        severity = 'soft'

        ttm = data.get('ttm_data', {})
        cash_flow = data.get('cash_flow_statement', [])
        metrics = data.get('key_metrics', [])

        # =====================================================================
        # 检查1: OCF/Net Income < 0.5 连续2年
        # =====================================================================
        low_ocf_ni_count = 0
        for i, cf in enumerate(cash_flow[:2]):
            income = data.get('income_statement', [])
            if i < len(income):
                ocf = cf.get('operatingCashFlow', 0) or 0
                ni = income[i].get('netIncome', 0) or 0
                if ni > 0 and ocf / ni < 0.5:
                    low_ocf_ni_count += 1

        if low_ocf_ni_count >= 2:
            reasons.append("OCF/Net Income < 0.5 连续2年，盈利质量严重存疑")
            is_excluded = True
            severity = 'hard'

        # =====================================================================
        # 检查2: ROIC < WACC 连续3年
        # =====================================================================
        low_roic_count = 0
        for m in metrics[:3]:
            roic = m.get('roic', 0) or 0
            if roic < 0.08:  # 假设WACC约8%
                low_roic_count += 1

        if low_roic_count >= 3:
            reasons.append("ROIC低于WACC连续3年，持续摧毁股东价值")
            is_excluded = True
            severity = 'hard'

        # =====================================================================
        # 检查3: 护城河评分 = 0
        # =====================================================================
        moat_score = dimension_scores.get('moat_strength', DimensionScore(
            dimension='', score=0, max_score=25, percentage=0,
            sub_scores={}, evidence={}, red_flags=[], data_sources=[]
        ))

        if moat_score.score == 0:
            reasons.append("无可验证护城河，缺乏可持续竞争优势")
            is_excluded = True
            severity = 'hard'

        # =====================================================================
        # 检查4: 杠杆过高
        # =====================================================================
        ebitda = ttm.get('ebitda', 0)
        total_debt = ttm.get('total_debt', 0)
        cash = ttm.get('cash', 0)
        net_debt = total_debt - cash

        if ebitda > 0:
            nd_ebitda = net_debt / ebitda
            if nd_ebitda > 5.0:  # 简化的90分位阈值
                reasons.append(f"杠杆过高(Net Debt/EBITDA = {nd_ebitda:.1f}x)，财务风险显著")
                is_excluded = True
                severity = 'hard'

        return ExclusionCheck(
            is_excluded=is_excluded,
            reasons=reasons,
            severity=severity
        )


# =============================================================================
# 综合评分器
# =============================================================================

class FundamentalQualityEngine:
    """基本面质量评分引擎"""

    def __init__(self, api_key: str = None):
        self.data_fetcher = FMPDataFetcher(api_key)
        self.cash_flow_scorer = CashFlowQualityScorer()
        self.profit_scorer = ProfitStructureScorer()
        self.capital_scorer = CapitalEfficiencyScorer()
        self.moat_scorer = MoatScorer()
        self.visibility_scorer = EarningsVisibilityScorer()
        self.exclusion_checker = ExclusionChecker()

    def score_company(self, ticker: str, moat_analysis: Dict = None) -> FundamentalScore:
        """
        评分单个公司

        评分权重:
        - 现金流质量: 25%
        - 利润结构: 20%
        - 资本效率: 20%
        - 护城河: 25%
        - 盈利可见性: 10%
        """
        print(f"\n{'='*60}")
        print(f"评分公司: {ticker}")
        print(f"{'='*60}")

        # 获取财务数据
        data = self.data_fetcher.compile_financial_data(ticker)
        profile = data.get('profile', {})

        # 计算各维度评分
        print("[1/5] 评分现金流质量...")
        cash_flow_score = self.cash_flow_scorer.score(data)

        print("[2/5] 评分利润结构...")
        profit_score = self.profit_scorer.score(data)

        print("[3/5] 评分资本效率...")
        capital_score = self.capital_scorer.score(data)

        print("[4/5] 评分护城河...")
        moat_score = self.moat_scorer.score(data, moat_analysis)

        print("[5/5] 评分盈利可见性...")
        visibility_score = self.visibility_scorer.score(data)

        # 检查排除条件
        dimension_scores = {
            'cash_flow_quality': cash_flow_score,
            'profit_structure': profit_score,
            'capital_efficiency': capital_score,
            'moat_strength': moat_score,
            'earnings_visibility': visibility_score,
        }

        exclusion = self.exclusion_checker.check(data, dimension_scores)

        # 计算加权总分
        total_score = (
            cash_flow_score.score +
            profit_score.score +
            capital_score.score +
            moat_score.score +
            visibility_score.score
        )

        # 评级
        grade = self._assign_grade(total_score, exclusion)

        # 确定数据置信度
        confidence = self._assess_confidence(data)

        result = FundamentalScore(
            ticker=ticker,
            company_name=profile.get('companyName', ticker),
            sector=profile.get('sector', 'Unknown'),
            industry=profile.get('industry', 'Unknown'),
            total_score=round(total_score, 1),
            grade=grade,
            cash_flow_quality=cash_flow_score,
            profit_structure=profit_score,
            capital_efficiency=capital_score,
            moat_strength=moat_score,
            earnings_visibility=visibility_score,
            exclusion_check=exclusion,
            evaluation_date=datetime.now().strftime('%Y-%m-%d'),
            data_as_of=data.get('data_date', 'Unknown'),
            confidence_level=confidence
        )

        self._print_summary(result)

        return result

    def _assign_grade(self, total_score: float, exclusion: ExclusionCheck) -> str:
        """分配评级"""
        if exclusion.is_excluded and exclusion.severity == 'hard':
            return 'F'

        if total_score >= 85:
            return 'A+'
        elif total_score >= 75:
            return 'A'
        elif total_score >= 70:
            return 'B+'
        elif total_score >= 60:
            return 'B'
        elif total_score >= 50:
            return 'C'
        elif total_score >= 40:
            return 'D'
        else:
            return 'F'

    def _assess_confidence(self, data: Dict) -> str:
        """评估数据置信度"""
        income = data.get('income_statement', [])
        cash_flow = data.get('cash_flow_statement', [])
        metrics = data.get('key_metrics', [])

        data_completeness = min(len(income), len(cash_flow), len(metrics))

        if data_completeness >= 5:
            return 'high'
        elif data_completeness >= 3:
            return 'medium'
        else:
            return 'low'

    def _print_summary(self, result: FundamentalScore):
        """打印评分摘要"""
        print(f"\n{'='*60}")
        print(f"评分结果: {result.company_name} ({result.ticker})")
        print(f"{'='*60}")
        print(f"总分: {result.total_score}/100")
        print(f"评级: {result.grade}")
        print(f"行业: {result.sector} / {result.industry}")
        print(f"\n维度分数:")
        print(f"  现金流质量:    {result.cash_flow_quality.score}/{result.cash_flow_quality.max_score}")
        print(f"  利润结构:      {result.profit_structure.score}/{result.profit_structure.max_score}")
        print(f"  资本效率:      {result.capital_efficiency.score}/{result.capital_efficiency.max_score}")
        print(f"  护城河:        {result.moat_strength.score}/{result.moat_strength.max_score}")
        print(f"  盈利可见性:    {result.earnings_visibility.score}/{result.earnings_visibility.max_score}")

        if result.exclusion_check.is_excluded:
            print(f"\n[排除] 原因:")
            for reason in result.exclusion_check.reasons:
                print(f"  - {reason}")

        # 收集所有红旗
        all_red_flags = []
        for dim in [result.cash_flow_quality, result.profit_structure,
                    result.capital_efficiency, result.moat_strength,
                    result.earnings_visibility]:
            all_red_flags.extend(dim.red_flags)

        if all_red_flags:
            print(f"\n[警示] Red Flags:")
            for flag in all_red_flags:
                print(f"  - {flag}")

        print(f"\n数据置信度: {result.confidence_level}")
        print(f"评估日期: {result.evaluation_date}")
        print(f"{'='*60}\n")

    def batch_score(self, tickers: List[str], moat_analyses: Dict = None) -> List[FundamentalScore]:
        """批量评分"""
        results = []
        moat_analyses = moat_analyses or {}

        for ticker in tickers:
            try:
                moat = moat_analyses.get(ticker)
                result = self.score_company(ticker, moat)
                results.append(result)
            except Exception as e:
                print(f"[ERROR] 评分 {ticker} 失败: {e}")

        return results

    def export_results(self, results: List[FundamentalScore], output_dir: str):
        """导出评分结果"""
        import os
        os.makedirs(output_dir, exist_ok=True)

        # 1. CSV汇总表
        summary_data = []
        for r in results:
            summary_data.append({
                'Ticker': r.ticker,
                'Company': r.company_name,
                'Sector': r.sector,
                'Industry': r.industry,
                'Total_Score': r.total_score,
                'Grade': r.grade,
                'Cash_Flow_Quality': r.cash_flow_quality.score,
                'Profit_Structure': r.profit_structure.score,
                'Capital_Efficiency': r.capital_efficiency.score,
                'Moat_Strength': r.moat_strength.score,
                'Earnings_Visibility': r.earnings_visibility.score,
                'Is_Excluded': r.exclusion_check.is_excluded,
                'Exclusion_Reasons': '; '.join(r.exclusion_check.reasons),
                'Confidence': r.confidence_level,
                'Evaluation_Date': r.evaluation_date,
            })

        df = pd.DataFrame(summary_data)
        df = df.sort_values('Total_Score', ascending=False)

        csv_path = os.path.join(output_dir, 'fundamental_scores.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8-sig')
        print(f"[OK] CSV导出: {csv_path}")

        # 2. JSON详细结果
        detailed = {r.ticker: r.to_dict() for r in results}
        json_path = os.path.join(output_dir, 'fundamental_scores_detailed.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(detailed, f, indent=2, ensure_ascii=False, default=str)
        print(f"[OK] JSON导出: {json_path}")

        # 3. 生成质量池
        pools = self._generate_pools(results)
        pools_path = os.path.join(output_dir, 'quality_pools.json')
        with open(pools_path, 'w', encoding='utf-8') as f:
            json.dump(pools, f, indent=2, ensure_ascii=False)
        print(f"[OK] 质量池导出: {pools_path}")

        return csv_path, json_path, pools_path

    def _generate_pools(self, results: List[FundamentalScore]) -> Dict:
        """生成质量候选池"""
        pools = {
            'high_quality': [],  # Score >= 70, 非排除
            'medium_quality': [],  # Score 60-69, 非排除
            'low_quality': [],  # Score < 60
            'excluded': [],  # 被排除的
        }

        for r in results:
            if r.exclusion_check.is_excluded:
                pools['excluded'].append({
                    'ticker': r.ticker,
                    'score': r.total_score,
                    'reasons': r.exclusion_check.reasons
                })
            elif r.total_score >= 70:
                pools['high_quality'].append({
                    'ticker': r.ticker,
                    'score': r.total_score,
                    'grade': r.grade
                })
            elif r.total_score >= 60:
                pools['medium_quality'].append({
                    'ticker': r.ticker,
                    'score': r.total_score,
                    'grade': r.grade
                })
            else:
                pools['low_quality'].append({
                    'ticker': r.ticker,
                    'score': r.total_score,
                    'grade': r.grade
                })

        # 排序
        for pool in pools.values():
            if pool:
                pool.sort(key=lambda x: x.get('score', 0), reverse=True)

        return pools


# =============================================================================
# 主函数
# =============================================================================

def main():
    """主函数 - 演示用法"""
    import argparse

    parser = argparse.ArgumentParser(description='基本面质量评分引擎 v2.0')
    parser.add_argument('--ticker', type=str, help='单个股票代码')
    parser.add_argument('--tickers', type=str, help='逗号分隔的股票代码列表')
    parser.add_argument('--output', type=str,
                       default='/Users/milton/投资大师/Top20_Screener/scoring/results',
                       help='输出目录')

    args = parser.parse_args()

    engine = FundamentalQualityEngine()

    if args.ticker:
        # 单个股票评分
        result = engine.score_company(args.ticker)
        engine.export_results([result], args.output)

    elif args.tickers:
        # 批量评分
        tickers = [t.strip() for t in args.tickers.split(',')]
        results = engine.batch_score(tickers)
        engine.export_results(results, args.output)

    else:
        # 默认演示
        print("="*80)
        print("基本面质量评分引擎 v2.0 - 演示")
        print("="*80)

        demo_tickers = ['AAPL', 'MSFT', 'GOOGL']
        print(f"\n演示评分: {', '.join(demo_tickers)}")

        results = engine.batch_score(demo_tickers)
        engine.export_results(results, args.output)

        print("\n" + "="*80)
        print("评分完成!")
        print("="*80)


if __name__ == '__main__':
    main()
