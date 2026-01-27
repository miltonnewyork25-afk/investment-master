#!/usr/bin/env python3
"""
估值与低估检测引擎 v2.0
Valuation & Undervaluation Detection Engine

Agent 5: 建立多维度估值系统，识别"被低估 + 能赚钱"的股票

核心目标：找出被市场低估但基本面优秀的股票

四大估值方法：
1. 相对估值（与同业比较）: 30%权重
2. 历史估值对比（与自身历史）: 25%权重
3. FCF收益率估值: 25%权重
4. 简化DCF估值: 20%权重

版本: v2.0
日期: 2026-01-26
"""

import os
import sys
import json
import requests
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional, Any, Union
from dataclasses import dataclass, asdict, field
from datetime import datetime, timedelta
from enum import Enum
from scipy.stats import percentileofscore
import warnings

warnings.filterwarnings('ignore')


# =============================================================================
# 配置
# =============================================================================

def load_api_key():
    """加载FMP API密钥"""
    key = os.environ.get('FMP_API_KEY')
    if key:
        return key

    env_file = '/Users/milton/投资大师/.env'
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                if line.startswith('FMP_API_KEY='):
                    return line.split('=', 1)[1].strip()

    return 'fzqJUYdwZSlnkHpPKTSTUJqJw7h1FVfb'


FMP_API_KEY = load_api_key()
FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3'


# =============================================================================
# GICS行业估值基准数据 (2026年1月更新)
# =============================================================================

INDUSTRY_VALUATION_BENCHMARKS = {
    # 信息技术
    'Technology': {
        'pe_median': 28.5,
        'pe_25p': 22.0,
        'pe_75p': 38.0,
        'ev_ebitda_median': 18.5,
        'p_fcf_median': 28.0,
        'pb_median': 6.5,
        'peg_median': 1.8,
        'fcf_yield_threshold': 0.035,  # 3.5%
    },
    # 通信服务
    'Communication Services': {
        'pe_median': 22.0,
        'pe_25p': 16.0,
        'pe_75p': 30.0,
        'ev_ebitda_median': 12.5,
        'p_fcf_median': 20.0,
        'pb_median': 3.5,
        'peg_median': 1.5,
        'fcf_yield_threshold': 0.045,
    },
    # 非必需消费品
    'Consumer Cyclical': {
        'pe_median': 20.0,
        'pe_25p': 14.0,
        'pe_75p': 28.0,
        'ev_ebitda_median': 11.0,
        'p_fcf_median': 18.0,
        'pb_median': 4.0,
        'peg_median': 1.3,
        'fcf_yield_threshold': 0.05,
    },
    # 必需消费品
    'Consumer Defensive': {
        'pe_median': 22.0,
        'pe_25p': 18.0,
        'pe_75p': 26.0,
        'ev_ebitda_median': 14.0,
        'p_fcf_median': 22.0,
        'pb_median': 5.0,
        'peg_median': 2.2,
        'fcf_yield_threshold': 0.04,
    },
    # 医疗保健
    'Healthcare': {
        'pe_median': 24.0,
        'pe_25p': 18.0,
        'pe_75p': 32.0,
        'ev_ebitda_median': 15.0,
        'p_fcf_median': 24.0,
        'pb_median': 4.5,
        'peg_median': 1.6,
        'fcf_yield_threshold': 0.04,
    },
    # 金融
    'Financial Services': {
        'pe_median': 12.0,
        'pe_25p': 9.0,
        'pe_75p': 15.0,
        'ev_ebitda_median': None,  # 不适用
        'p_fcf_median': None,  # 不适用
        'pb_median': 1.3,
        'peg_median': 1.2,
        'fcf_yield_threshold': None,
    },
    'Financials': {  # 别名
        'pe_median': 12.0,
        'pe_25p': 9.0,
        'pe_75p': 15.0,
        'ev_ebitda_median': None,
        'p_fcf_median': None,
        'pb_median': 1.3,
        'peg_median': 1.2,
        'fcf_yield_threshold': None,
    },
    # 工业
    'Industrials': {
        'pe_median': 20.0,
        'pe_25p': 15.0,
        'pe_75p': 26.0,
        'ev_ebitda_median': 12.0,
        'p_fcf_median': 20.0,
        'pb_median': 3.5,
        'peg_median': 1.5,
        'fcf_yield_threshold': 0.05,
    },
    # 能源
    'Energy': {
        'pe_median': 10.0,
        'pe_25p': 7.0,
        'pe_75p': 14.0,
        'ev_ebitda_median': 5.5,
        'p_fcf_median': 8.0,
        'pb_median': 1.5,
        'peg_median': 0.8,
        'fcf_yield_threshold': 0.08,
    },
    # 材料
    'Basic Materials': {
        'pe_median': 14.0,
        'pe_25p': 10.0,
        'pe_75p': 20.0,
        'ev_ebitda_median': 7.5,
        'p_fcf_median': 12.0,
        'pb_median': 2.0,
        'peg_median': 1.0,
        'fcf_yield_threshold': 0.06,
    },
    # 公用事业
    'Utilities': {
        'pe_median': 18.0,
        'pe_25p': 14.0,
        'pe_75p': 22.0,
        'ev_ebitda_median': 11.0,
        'p_fcf_median': None,  # 资本密集
        'pb_median': 1.8,
        'peg_median': 2.5,
        'fcf_yield_threshold': None,
    },
    # 房地产
    'Real Estate': {
        'pe_median': 35.0,  # P/FFO更合适
        'pe_25p': 25.0,
        'pe_75p': 50.0,
        'ev_ebitda_median': 18.0,
        'p_fcf_median': None,  # 使用P/FFO
        'pb_median': 2.0,
        'peg_median': None,
        'fcf_yield_threshold': None,
    },
}

# 默认行业基准
DEFAULT_BENCHMARK = {
    'pe_median': 18.0,
    'pe_25p': 12.0,
    'pe_75p': 25.0,
    'ev_ebitda_median': 12.0,
    'p_fcf_median': 18.0,
    'pb_median': 3.0,
    'peg_median': 1.5,
    'fcf_yield_threshold': 0.05,
}


# =============================================================================
# 数据类定义
# =============================================================================

class UndervaluationGrade(Enum):
    """低估等级"""
    A = "A"  # 强烈低估 (>=80)
    B = "B"  # 中度低估 (65-79)
    C = "C"  # 轻度低估 (50-64)
    D = "D"  # 未低估或高估 (<50)


@dataclass
class RelativeValuation:
    """相对估值结果"""
    pe_ttm: Optional[float]
    pe_forward: Optional[float]
    ev_ebitda: Optional[float]
    p_fcf: Optional[float]
    pb: Optional[float]
    peg: Optional[float]

    # 行业对比
    pe_vs_industry: Optional[float]  # 折/溢价百分比
    ev_ebitda_vs_industry: Optional[float]
    p_fcf_vs_industry: Optional[float]
    pb_vs_industry: Optional[float]

    # 同业对比详情
    peers: List[str]
    peer_pe_median: Optional[float]

    # 评分
    relative_score: float
    evidence: Dict[str, Any]


@dataclass
class HistoricalValuation:
    """历史估值对比结果"""
    pe_current: Optional[float]
    pe_5y_median: Optional[float]
    pe_5y_min: Optional[float]
    pe_5y_max: Optional[float]
    pe_percentile: Optional[float]  # 当前值在历史分布中的百分位

    ev_ebitda_current: Optional[float]
    ev_ebitda_5y_median: Optional[float]
    ev_ebitda_percentile: Optional[float]

    # 评分
    historical_score: float
    evidence: Dict[str, Any]


@dataclass
class FCFYieldValuation:
    """FCF收益率估值结果"""
    fcf_ttm: float
    market_cap: float
    fcf_yield: float
    fcf_per_share: float
    current_price: float

    # 比较
    fcf_yield_vs_10y_treasury: float  # 与10年期国债收益率对比
    fcf_yield_vs_sp500_avg: float  # 与标普500平均FCF收益率对比

    # 评分
    fcf_yield_score: float
    evidence: Dict[str, Any]


@dataclass
class DCFValuation:
    """DCF估值结果"""
    intrinsic_value: Optional[float]
    current_price: float
    upside_potential: Optional[float]
    margin_of_safety: Optional[float]

    # 场景分析
    base_case: Optional[float]
    bull_case: Optional[float]
    bear_case: Optional[float]

    # 假设
    assumptions: Dict[str, Any]

    # 评分
    dcf_score: float
    status: str  # 'valid', 'negative_fcf', 'insufficient_data'
    evidence: Dict[str, Any]


@dataclass
class UndervaluationResult:
    """综合低估评分结果"""
    ticker: str
    company_name: str
    sector: str
    industry: str
    current_price: float

    # 四大估值方法结果
    relative_valuation: RelativeValuation
    historical_valuation: HistoricalValuation
    fcf_yield_valuation: FCFYieldValuation
    dcf_valuation: DCFValuation

    # 综合评分
    undervaluation_score: float
    undervaluation_grade: str

    # 关键指标汇总
    key_metrics: Dict[str, Any]

    # 红旗警示
    red_flags: List[str]

    # 投资信号
    investment_signal: str  # 'strong_buy', 'buy', 'hold', 'avoid'

    # 元数据
    evaluation_date: str
    confidence_level: str


# =============================================================================
# FMP API 数据获取器
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

    def get_quote(self, ticker: str) -> Optional[Dict]:
        """获取实时报价"""
        data = self._request(f"quote/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_key_metrics_ttm(self, ticker: str) -> Optional[Dict]:
        """获取TTM关键指标"""
        data = self._request(f"key-metrics-ttm/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_ratios_ttm(self, ticker: str) -> Optional[Dict]:
        """获取TTM财务比率"""
        data = self._request(f"ratios-ttm/{ticker}")
        return data[0] if data and len(data) > 0 else None

    def get_key_metrics(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取历史关键指标"""
        data = self._request(f"key-metrics/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_ratios(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取历史财务比率"""
        data = self._request(f"ratios/{ticker}", {'period': period, 'limit': limit})
        return data or []

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

    def get_enterprise_value(self, ticker: str, period: str = 'annual', limit: int = 5) -> List[Dict]:
        """获取企业价值"""
        data = self._request(f"enterprise-values/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_analyst_estimates(self, ticker: str, period: str = 'annual', limit: int = 2) -> List[Dict]:
        """获取分析师预期"""
        data = self._request(f"analyst-estimates/{ticker}", {'period': period, 'limit': limit})
        return data or []

    def get_sector_pe(self, sector: str) -> Optional[Dict]:
        """获取行业PE"""
        data = self._request(f"sector_price_earning_ratio", {'date': datetime.now().strftime('%Y-%m-%d')})
        if data:
            for item in data:
                if item.get('sector', '').lower() == sector.lower():
                    return item
        return None

    def get_peers(self, ticker: str) -> List[str]:
        """获取同业公司列表"""
        data = self._request(f"stock_peers", {'symbol': ticker})
        if data and len(data) > 0:
            return data[0].get('peersList', [])[:10]
        return []

    def compile_valuation_data(self, ticker: str) -> Dict:
        """编译估值所需的完整数据"""
        print(f"[INFO] 获取 {ticker} 估值数据...")

        profile = self.get_company_profile(ticker) or {}
        quote = self.get_quote(ticker) or {}
        metrics_ttm = self.get_key_metrics_ttm(ticker) or {}
        ratios_ttm = self.get_ratios_ttm(ticker) or {}

        # 历史数据
        metrics_history = self.get_key_metrics(ticker, 'quarter', 20)
        ratios_history = self.get_ratios(ticker, 'quarter', 20)

        # 财务报表
        income = self.get_income_statement(ticker, 'annual', 5)
        balance = self.get_balance_sheet(ticker, 'annual', 5)
        cash_flow = self.get_cash_flow_statement(ticker, 'annual', 5)

        # 企业价值
        ev_data = self.get_enterprise_value(ticker, 'annual', 5)

        # 分析师预期
        estimates = self.get_analyst_estimates(ticker, 'annual', 2)

        # 同业
        peers = self.get_peers(ticker)

        # 计算TTM数据
        income_q = self.get_income_statement(ticker, 'quarter', 4)
        cash_flow_q = self.get_cash_flow_statement(ticker, 'quarter', 4)

        ttm_data = self._calculate_ttm(income_q, cash_flow_q)

        return {
            'ticker': ticker,
            'profile': profile,
            'quote': quote,
            'metrics_ttm': metrics_ttm,
            'ratios_ttm': ratios_ttm,
            'metrics_history': metrics_history,
            'ratios_history': ratios_history,
            'income_statement': income,
            'balance_sheet': balance,
            'cash_flow_statement': cash_flow,
            'enterprise_value': ev_data,
            'analyst_estimates': estimates,
            'peers': peers,
            'ttm_data': ttm_data,
            'data_date': datetime.now().strftime('%Y-%m-%d'),
        }

    def _calculate_ttm(self, income_q: List, cash_flow_q: List) -> Dict:
        """计算TTM数据"""
        ttm = {}

        if len(income_q) >= 4:
            ttm['revenue'] = sum(q.get('revenue', 0) or 0 for q in income_q[:4])
            ttm['net_income'] = sum(q.get('netIncome', 0) or 0 for q in income_q[:4])
            ttm['eps'] = sum(q.get('eps', 0) or 0 for q in income_q[:4])
            ttm['ebitda'] = sum(q.get('ebitda', 0) or 0 for q in income_q[:4])

        if len(cash_flow_q) >= 4:
            ttm['operating_cash_flow'] = sum(q.get('operatingCashFlow', 0) or 0 for q in cash_flow_q[:4])
            ttm['free_cash_flow'] = sum(q.get('freeCashFlow', 0) or 0 for q in cash_flow_q[:4])
            ttm['capital_expenditure'] = sum(abs(q.get('capitalExpenditure', 0) or 0) for q in cash_flow_q[:4])

        return ttm


# =============================================================================
# 方法1: 相对估值（与同业比较）
# =============================================================================

class RelativeValuationCalculator:
    """相对估值计算器"""

    def __init__(self, data_fetcher: FMPDataFetcher):
        self.fetcher = data_fetcher

    def calculate(self, data: Dict) -> RelativeValuation:
        """
        相对估值：与同业和行业基准对比

        核心指标：
        - P/E vs 行业中位数
        - EV/EBITDA vs 行业中位数
        - P/FCF vs 行业中位数
        - P/B vs 行业中位数
        """
        profile = data.get('profile', {})
        metrics_ttm = data.get('metrics_ttm', {})
        ratios_ttm = data.get('ratios_ttm', {})
        quote = data.get('quote', {})
        peers = data.get('peers', [])

        sector = profile.get('sector', 'Unknown')

        # 获取行业基准
        benchmark = INDUSTRY_VALUATION_BENCHMARKS.get(sector, DEFAULT_BENCHMARK)

        # 当前估值指标
        pe_ttm = ratios_ttm.get('peRatioTTM', None)
        pe_forward = quote.get('priceEarningsRatio', None)  # 使用预期PE
        ev_ebitda = metrics_ttm.get('enterpriseValueOverEBITDATTM', None)
        pb = ratios_ttm.get('priceToBookRatioTTM', None)
        peg = ratios_ttm.get('priceEarningsToGrowthRatioTTM', None)

        # P/FCF计算
        market_cap = quote.get('marketCap', 0) or 0
        fcf = data.get('ttm_data', {}).get('free_cash_flow', 0)
        p_fcf = market_cap / fcf if fcf > 0 else None

        # 计算与行业的折/溢价
        pe_vs_industry = None
        ev_ebitda_vs_industry = None
        p_fcf_vs_industry = None
        pb_vs_industry = None

        if pe_ttm and benchmark.get('pe_median'):
            pe_vs_industry = (pe_ttm - benchmark['pe_median']) / benchmark['pe_median']

        if ev_ebitda and benchmark.get('ev_ebitda_median'):
            ev_ebitda_vs_industry = (ev_ebitda - benchmark['ev_ebitda_median']) / benchmark['ev_ebitda_median']

        if p_fcf and benchmark.get('p_fcf_median'):
            p_fcf_vs_industry = (p_fcf - benchmark['p_fcf_median']) / benchmark['p_fcf_median']

        if pb and benchmark.get('pb_median'):
            pb_vs_industry = (pb - benchmark['pb_median']) / benchmark['pb_median']

        # 计算同业PE中位数
        peer_pe_median = self._get_peer_pe_median(peers) if peers else None

        # 计算相对估值评分
        score, evidence = self._calculate_score(
            pe_vs_industry, ev_ebitda_vs_industry, p_fcf_vs_industry, pb_vs_industry,
            pe_ttm, benchmark, peer_pe_median, sector
        )

        return RelativeValuation(
            pe_ttm=pe_ttm,
            pe_forward=pe_forward,
            ev_ebitda=ev_ebitda,
            p_fcf=p_fcf,
            pb=pb,
            peg=peg,
            pe_vs_industry=pe_vs_industry,
            ev_ebitda_vs_industry=ev_ebitda_vs_industry,
            p_fcf_vs_industry=p_fcf_vs_industry,
            pb_vs_industry=pb_vs_industry,
            peers=peers,
            peer_pe_median=peer_pe_median,
            relative_score=score,
            evidence=evidence
        )

    def _get_peer_pe_median(self, peers: List[str]) -> Optional[float]:
        """获取同业PE中位数"""
        if not peers:
            return None

        pe_values = []
        for peer in peers[:8]:  # 最多取8个同业
            try:
                ratios = self.fetcher.get_ratios_ttm(peer)
                if ratios:
                    pe = ratios.get('peRatioTTM')
                    if pe and 0 < pe < 200:  # 过滤异常值
                        pe_values.append(pe)
            except:
                continue

        return np.median(pe_values) if pe_values else None

    def _calculate_score(self, pe_vs_industry, ev_ebitda_vs_industry,
                         p_fcf_vs_industry, pb_vs_industry,
                         pe_ttm, benchmark, peer_pe_median, sector) -> Tuple[float, Dict]:
        """
        计算相对估值评分 (满分100)

        -20%折价 = 满分100，溢价20% = 0分
        """
        evidence = {}
        sub_scores = []
        weights = []

        # 1. PE vs 行业 (权重40%)
        if pe_vs_industry is not None:
            if pe_vs_industry <= -0.20:
                pe_score = 100
                pe_interpretation = 'Deep Discount (>=20% below industry)'
            elif pe_vs_industry <= -0.10:
                pe_score = 80
                pe_interpretation = 'Moderate Discount (10-20% below)'
            elif pe_vs_industry <= 0:
                pe_score = 60
                pe_interpretation = 'Slight Discount (0-10% below)'
            elif pe_vs_industry <= 0.10:
                pe_score = 40
                pe_interpretation = 'Slight Premium (0-10% above)'
            elif pe_vs_industry <= 0.20:
                pe_score = 20
                pe_interpretation = 'Moderate Premium (10-20% above)'
            else:
                pe_score = 0
                pe_interpretation = 'High Premium (>20% above)'

            evidence['pe_vs_industry'] = {
                'current_pe': pe_ttm,
                'industry_median': benchmark.get('pe_median'),
                'discount_premium': round(pe_vs_industry * 100, 1),
                'interpretation': pe_interpretation,
                'score': pe_score
            }
            sub_scores.append(pe_score)
            weights.append(0.40)

        # 2. EV/EBITDA vs 行业 (权重30%)
        if ev_ebitda_vs_industry is not None:
            if ev_ebitda_vs_industry <= -0.20:
                ev_score = 100
            elif ev_ebitda_vs_industry <= -0.10:
                ev_score = 80
            elif ev_ebitda_vs_industry <= 0:
                ev_score = 60
            elif ev_ebitda_vs_industry <= 0.10:
                ev_score = 40
            else:
                ev_score = 20 if ev_ebitda_vs_industry <= 0.20 else 0

            evidence['ev_ebitda_vs_industry'] = {
                'discount_premium': round(ev_ebitda_vs_industry * 100, 1),
                'score': ev_score
            }
            sub_scores.append(ev_score)
            weights.append(0.30)

        # 3. P/FCF vs 行业 (权重20%)
        if p_fcf_vs_industry is not None:
            if p_fcf_vs_industry <= -0.20:
                pfcf_score = 100
            elif p_fcf_vs_industry <= -0.10:
                pfcf_score = 80
            elif p_fcf_vs_industry <= 0:
                pfcf_score = 60
            elif p_fcf_vs_industry <= 0.10:
                pfcf_score = 40
            else:
                pfcf_score = 20 if p_fcf_vs_industry <= 0.20 else 0

            evidence['p_fcf_vs_industry'] = {
                'discount_premium': round(p_fcf_vs_industry * 100, 1),
                'score': pfcf_score
            }
            sub_scores.append(pfcf_score)
            weights.append(0.20)

        # 4. P/B vs 行业 (权重10%)
        if pb_vs_industry is not None:
            if pb_vs_industry <= -0.30:
                pb_score = 100
            elif pb_vs_industry <= -0.15:
                pb_score = 70
            elif pb_vs_industry <= 0:
                pb_score = 50
            else:
                pb_score = 30 if pb_vs_industry <= 0.15 else 0

            evidence['pb_vs_industry'] = {
                'discount_premium': round(pb_vs_industry * 100, 1),
                'score': pb_score
            }
            sub_scores.append(pb_score)
            weights.append(0.10)

        # 计算加权平均分
        if sub_scores and weights:
            # 归一化权重
            total_weight = sum(weights)
            normalized_weights = [w / total_weight for w in weights]
            final_score = sum(s * w for s, w in zip(sub_scores, normalized_weights))
        else:
            final_score = 50  # 数据不足给中间分
            evidence['warning'] = 'Insufficient data for relative valuation'

        evidence['final_score'] = round(final_score, 1)
        evidence['sector'] = sector
        evidence['benchmark_used'] = benchmark.get('pe_median')

        return round(final_score, 1), evidence


# =============================================================================
# 方法2: 历史估值对比
# =============================================================================

class HistoricalValuationCalculator:
    """历史估值对比计算器"""

    def calculate(self, data: Dict) -> HistoricalValuation:
        """
        与自身历史估值对比

        逻辑：如果公司基本面未恶化，但估值低于历史中位数，可能被低估
        """
        metrics_history = data.get('metrics_history', [])
        ratios_history = data.get('ratios_history', [])
        ratios_ttm = data.get('ratios_ttm', {})
        metrics_ttm = data.get('metrics_ttm', {})

        evidence = {}

        # 当前估值
        pe_current = ratios_ttm.get('peRatioTTM', None)
        ev_ebitda_current = metrics_ttm.get('enterpriseValueOverEBITDATTM', None)

        # 提取5年历史PE
        pe_history = self._extract_pe_history(ratios_history)
        ev_ebitda_history = self._extract_ev_ebitda_history(metrics_history)

        # PE历史分析
        pe_5y_median = None
        pe_5y_min = None
        pe_5y_max = None
        pe_percentile = None

        if pe_history and len(pe_history) >= 4 and pe_current:
            pe_5y_median = np.median(pe_history)
            pe_5y_min = min(pe_history)
            pe_5y_max = max(pe_history)
            pe_percentile = percentileofscore(pe_history, pe_current)

            evidence['pe_analysis'] = {
                'current': round(pe_current, 2),
                'median_5y': round(pe_5y_median, 2),
                'min_5y': round(pe_5y_min, 2),
                'max_5y': round(pe_5y_max, 2),
                'percentile': round(pe_percentile, 1),
                'data_points': len(pe_history)
            }

        # EV/EBITDA历史分析
        ev_ebitda_5y_median = None
        ev_ebitda_percentile = None

        if ev_ebitda_history and len(ev_ebitda_history) >= 4 and ev_ebitda_current:
            ev_ebitda_5y_median = np.median(ev_ebitda_history)
            ev_ebitda_percentile = percentileofscore(ev_ebitda_history, ev_ebitda_current)

            evidence['ev_ebitda_analysis'] = {
                'current': round(ev_ebitda_current, 2),
                'median_5y': round(ev_ebitda_5y_median, 2),
                'percentile': round(ev_ebitda_percentile, 1)
            }

        # 计算历史估值评分
        score = self._calculate_score(pe_percentile, ev_ebitda_percentile, evidence)

        return HistoricalValuation(
            pe_current=pe_current,
            pe_5y_median=pe_5y_median,
            pe_5y_min=pe_5y_min,
            pe_5y_max=pe_5y_max,
            pe_percentile=pe_percentile,
            ev_ebitda_current=ev_ebitda_current,
            ev_ebitda_5y_median=ev_ebitda_5y_median,
            ev_ebitda_percentile=ev_ebitda_percentile,
            historical_score=score,
            evidence=evidence
        )

    def _extract_pe_history(self, ratios_history: List) -> List[float]:
        """提取有效的历史PE数据"""
        pe_values = []
        for r in ratios_history:
            pe = r.get('priceEarningsRatio', r.get('peRatio'))
            if pe and 0 < pe < 200:  # 过滤异常值
                pe_values.append(pe)
        return pe_values

    def _extract_ev_ebitda_history(self, metrics_history: List) -> List[float]:
        """提取有效的历史EV/EBITDA数据"""
        values = []
        for m in metrics_history:
            ev_ebitda = m.get('enterpriseValueOverEBITDA')
            if ev_ebitda and 0 < ev_ebitda < 100:
                values.append(ev_ebitda)
        return values

    def _calculate_score(self, pe_percentile, ev_ebitda_percentile, evidence) -> float:
        """
        计算历史估值评分 (满分100)

        百分位越低越便宜：
        - <25%百分位 = 强烈低估信号 (满分)
        - <50%百分位 = 中度低估信号
        - >50%百分位 = 估值偏高
        """
        sub_scores = []
        weights = []

        # PE百分位评分 (权重60%)
        if pe_percentile is not None:
            # 转换：低百分位 = 高分
            pe_score = max(0, 100 - pe_percentile)

            if pe_percentile <= 25:
                interpretation = 'Strong Undervaluation Signal'
            elif pe_percentile <= 50:
                interpretation = 'Below Historical Median'
            elif pe_percentile <= 75:
                interpretation = 'Above Historical Median'
            else:
                interpretation = 'Near Historical High'

            evidence['pe_percentile_interpretation'] = interpretation
            sub_scores.append(pe_score)
            weights.append(0.60)

        # EV/EBITDA百分位评分 (权重40%)
        if ev_ebitda_percentile is not None:
            ev_score = max(0, 100 - ev_ebitda_percentile)
            sub_scores.append(ev_score)
            weights.append(0.40)

        # 计算加权平均
        if sub_scores:
            total_weight = sum(weights)
            final_score = sum(s * w / total_weight for s, w in zip(sub_scores, weights))
        else:
            final_score = 50
            evidence['warning'] = 'Insufficient historical data'

        evidence['final_score'] = round(final_score, 1)
        return round(final_score, 1)


# =============================================================================
# 方法3: FCF收益率估值
# =============================================================================

class FCFYieldCalculator:
    """FCF收益率估值计算器"""

    # 当前市场参数 (2026年1月)
    RISK_FREE_RATE = 0.045  # 10年期美债收益率 ~4.5%
    EQUITY_RISK_PREMIUM = 0.05  # 权益风险溢价 ~5%
    SP500_AVG_FCF_YIELD = 0.042  # 标普500平均FCF收益率 ~4.2%

    def calculate(self, data: Dict) -> FCFYieldValuation:
        """
        自由现金流收益率估值

        FCF Yield = FCF / Market Cap

        逻辑：FCF Yield > 无风险利率 + 风险溢价 = 有吸引力
        目标FCF Yield > 7%为有吸引力
        """
        ttm_data = data.get('ttm_data', {})
        quote = data.get('quote', {})
        profile = data.get('profile', {})

        fcf_ttm = ttm_data.get('free_cash_flow', 0)
        market_cap = quote.get('marketCap', 0) or profile.get('mktCap', 0)
        shares = quote.get('sharesOutstanding', 0) or profile.get('shareOutstanding', 0)
        current_price = quote.get('price', 0) or profile.get('price', 0)

        # 计算FCF收益率
        fcf_yield = fcf_ttm / market_cap if market_cap > 0 else 0
        fcf_per_share = fcf_ttm / shares if shares > 0 else 0

        # 与基准比较
        fcf_yield_vs_treasury = fcf_yield - self.RISK_FREE_RATE
        fcf_yield_vs_sp500 = fcf_yield - self.SP500_AVG_FCF_YIELD

        # 计算评分
        score, evidence = self._calculate_score(fcf_yield, fcf_ttm, market_cap)

        return FCFYieldValuation(
            fcf_ttm=fcf_ttm,
            market_cap=market_cap,
            fcf_yield=fcf_yield,
            fcf_per_share=fcf_per_share,
            current_price=current_price,
            fcf_yield_vs_10y_treasury=fcf_yield_vs_treasury,
            fcf_yield_vs_sp500_avg=fcf_yield_vs_sp500,
            fcf_yield_score=score,
            evidence=evidence
        )

    def _calculate_score(self, fcf_yield: float, fcf_ttm: float, market_cap: float) -> Tuple[float, Dict]:
        """
        计算FCF收益率评分 (满分100)

        评分标准:
        - >10%: 满分100 (极具吸引力)
        - 7-10%: 80分 (有吸引力)
        - 5-7%: 60分 (合理)
        - 3-5%: 40分 (偏低)
        - <3%: 20分 (缺乏吸引力)
        - 负数: 0分
        """
        evidence = {}

        if fcf_ttm <= 0:
            evidence['warning'] = 'Negative FCF - Not applicable'
            evidence['fcf_ttm'] = fcf_ttm
            return 0, evidence

        if fcf_yield >= 0.10:
            score = 100
            interpretation = 'Extremely Attractive (>=10%)'
        elif fcf_yield >= 0.07:
            # 线性插值 7-10% -> 80-100
            score = 80 + (fcf_yield - 0.07) / 0.03 * 20
            interpretation = 'Attractive (7-10%)'
        elif fcf_yield >= 0.05:
            score = 60 + (fcf_yield - 0.05) / 0.02 * 20
            interpretation = 'Fair (5-7%)'
        elif fcf_yield >= 0.03:
            score = 40 + (fcf_yield - 0.03) / 0.02 * 20
            interpretation = 'Below Average (3-5%)'
        else:
            score = max(0, 40 * fcf_yield / 0.03)
            interpretation = 'Unattractive (<3%)'

        evidence = {
            'fcf_yield': round(fcf_yield * 100, 2),
            'fcf_yield_pct': f"{fcf_yield*100:.2f}%",
            'interpretation': interpretation,
            'vs_risk_free': round((fcf_yield - self.RISK_FREE_RATE) * 100, 2),
            'vs_sp500': round((fcf_yield - self.SP500_AVG_FCF_YIELD) * 100, 2),
            'required_return': f"Risk-free ({self.RISK_FREE_RATE*100}%) + Premium ({self.EQUITY_RISK_PREMIUM*100}%) = {(self.RISK_FREE_RATE+self.EQUITY_RISK_PREMIUM)*100}%",
            'fcf_ttm': fcf_ttm,
            'market_cap': market_cap,
            'final_score': round(score, 1)
        }

        return round(score, 1), evidence


# =============================================================================
# 方法4: 简化DCF估值
# =============================================================================

class SimplifiedDCFCalculator:
    """简化DCF估值计算器"""

    # 默认参数
    DEFAULT_WACC = 0.10
    TERMINAL_GROWTH = 0.025
    PROJECTION_YEARS = 5

    # 行业WACC
    SECTOR_WACC = {
        'Technology': 0.095,
        'Communication Services': 0.090,
        'Consumer Cyclical': 0.100,
        'Consumer Defensive': 0.082,
        'Healthcare': 0.088,
        'Financial Services': 0.085,
        'Financials': 0.085,
        'Industrials': 0.092,
        'Energy': 0.092,
        'Basic Materials': 0.090,
        'Utilities': 0.070,
        'Real Estate': 0.075,
    }

    def calculate(self, data: Dict) -> DCFValuation:
        """
        简化DCF估值（保守假设）

        假设：
        - 未来5年增长率 = min(历史增长率, 分析师预期, 10%)
        - 永续增长率 = 2.5%
        - 折现率 = 行业WACC或10%
        """
        ttm_data = data.get('ttm_data', {})
        profile = data.get('profile', {})
        quote = data.get('quote', {})
        cash_flow = data.get('cash_flow_statement', [])
        balance = data.get('balance_sheet', [])
        estimates = data.get('analyst_estimates', [])

        fcf_current = ttm_data.get('free_cash_flow', 0)
        current_price = quote.get('price', 0) or profile.get('price', 0)

        # 处理负FCF情况
        if fcf_current <= 0:
            return DCFValuation(
                intrinsic_value=None,
                current_price=current_price,
                upside_potential=None,
                margin_of_safety=None,
                base_case=None,
                bull_case=None,
                bear_case=None,
                assumptions={},
                dcf_score=0,
                status='negative_fcf',
                evidence={'warning': f'Negative FCF ({fcf_current:,.0f}) - DCF not applicable'}
            )

        # 获取行业WACC
        sector = profile.get('sector', 'Unknown')
        wacc = self.SECTOR_WACC.get(sector, self.DEFAULT_WACC)

        # 计算增长率 (保守)
        historical_growth = self._calculate_historical_fcf_growth(cash_flow)
        analyst_growth = self._get_analyst_growth_estimate(estimates)

        # 取最小值，并设置上限
        growth_5y = min(
            historical_growth if historical_growth else 0.05,
            analyst_growth if analyst_growth else 0.10,
            0.10  # 上限10%
        )
        growth_5y = max(growth_5y, 0.02)  # 下限2%

        # 三个场景
        base_value = self._run_dcf(fcf_current, growth_5y, wacc, self.TERMINAL_GROWTH, data)
        bull_value = self._run_dcf(fcf_current, min(growth_5y * 1.3, 0.15), wacc - 0.01, 0.03, data)
        bear_value = self._run_dcf(fcf_current, max(growth_5y * 0.6, 0.02), wacc + 0.01, 0.02, data)

        # 计算上行空间
        upside = (base_value - current_price) / current_price if current_price > 0 else None

        # 计算评分
        score, evidence = self._calculate_score(upside, base_value, current_price)

        evidence.update({
            'fcf_current': fcf_current,
            'growth_rate_used': round(growth_5y * 100, 1),
            'wacc_used': round(wacc * 100, 1),
            'terminal_growth': round(self.TERMINAL_GROWTH * 100, 1),
            'historical_growth': round((historical_growth or 0) * 100, 1),
            'analyst_growth': round((analyst_growth or 0) * 100, 1),
            'sector': sector
        })

        return DCFValuation(
            intrinsic_value=base_value,
            current_price=current_price,
            upside_potential=upside,
            margin_of_safety=upside,
            base_case=base_value,
            bull_case=bull_value,
            bear_case=bear_value,
            assumptions={
                'growth_rate': growth_5y,
                'discount_rate': wacc,
                'terminal_growth': self.TERMINAL_GROWTH,
                'projection_years': self.PROJECTION_YEARS
            },
            dcf_score=score,
            status='valid',
            evidence=evidence
        )

    def _calculate_historical_fcf_growth(self, cash_flow: List) -> Optional[float]:
        """计算历史FCF CAGR"""
        if len(cash_flow) < 3:
            return None

        fcf_values = []
        for cf in cash_flow[:5]:
            fcf = cf.get('freeCashFlow', 0)
            if fcf and fcf > 0:
                fcf_values.append(fcf)

        if len(fcf_values) >= 3:
            cagr = (fcf_values[0] / fcf_values[-1]) ** (1 / (len(fcf_values) - 1)) - 1
            return min(max(cagr, -0.10), 0.30)  # 限制在-10%到30%
        return None

    def _get_analyst_growth_estimate(self, estimates: List) -> Optional[float]:
        """获取分析师增长预期"""
        if not estimates:
            return None

        try:
            # 使用EPS增长作为代理
            if len(estimates) >= 2:
                eps_current = estimates[0].get('estimatedEpsAvg', 0)
                eps_prior = estimates[1].get('estimatedEpsAvg', 0)
                if eps_current and eps_prior and eps_prior > 0:
                    return (eps_current - eps_prior) / eps_prior
        except:
            pass
        return None

    def _run_dcf(self, fcf_current: float, growth: float, wacc: float,
                 terminal_growth: float, data: Dict) -> float:
        """执行DCF计算"""
        # 5年显式预测
        fcf_projections = [fcf_current * (1 + growth) ** i for i in range(1, self.PROJECTION_YEARS + 1)]
        pv_fcf = sum([fcf / (1 + wacc) ** i for i, fcf in enumerate(fcf_projections, 1)])

        # 终值
        terminal_fcf = fcf_projections[-1] * (1 + terminal_growth)
        terminal_value = terminal_fcf / (wacc - terminal_growth)
        pv_terminal = terminal_value / (1 + wacc) ** self.PROJECTION_YEARS

        # 企业价值
        enterprise_value = pv_fcf + pv_terminal

        # 减去净债务得到股权价值
        net_debt = self._get_net_debt(data)
        equity_value = enterprise_value - net_debt

        # 每股内在价值
        shares = self._get_shares_outstanding(data)
        intrinsic_per_share = equity_value / shares if shares > 0 else 0

        return max(0, intrinsic_per_share)

    def _get_net_debt(self, data: Dict) -> float:
        """获取净债务"""
        balance = data.get('balance_sheet', [])
        if balance:
            latest = balance[0]
            total_debt = latest.get('totalDebt', 0) or 0
            cash = latest.get('cashAndCashEquivalents', 0) or 0
            return total_debt - cash
        return 0

    def _get_shares_outstanding(self, data: Dict) -> float:
        """获取流通股数"""
        quote = data.get('quote', {})
        profile = data.get('profile', {})
        return quote.get('sharesOutstanding', 0) or profile.get('shareOutstanding', 0) or 1

    def _calculate_score(self, upside: Optional[float], intrinsic: float,
                         current: float) -> Tuple[float, Dict]:
        """
        计算DCF评分 (满分100)

        基于安全边际评分：
        - >30% upside: 满分100
        - 20-30%: 80分
        - 10-20%: 60分
        - 0-10%: 40分
        - <0%: 基于下行幅度递减
        """
        evidence = {}

        if upside is None:
            return 0, {'warning': 'Cannot calculate upside'}

        if upside >= 0.30:
            score = 100
            interpretation = 'Strong Margin of Safety (>=30%)'
        elif upside >= 0.20:
            score = 80 + (upside - 0.20) / 0.10 * 20
            interpretation = 'Good Margin of Safety (20-30%)'
        elif upside >= 0.10:
            score = 60 + (upside - 0.10) / 0.10 * 20
            interpretation = 'Moderate Margin of Safety (10-20%)'
        elif upside >= 0:
            score = 40 + upside / 0.10 * 20
            interpretation = 'Slim Margin of Safety (0-10%)'
        elif upside >= -0.20:
            score = 40 + upside / 0.20 * 40
            interpretation = 'Overvalued (0-20% downside)'
        else:
            score = max(0, 20 + (upside + 0.20) / 0.30 * 20)
            interpretation = 'Significantly Overvalued (>20% downside)'

        evidence = {
            'intrinsic_value': round(intrinsic, 2),
            'current_price': round(current, 2),
            'upside_pct': round(upside * 100, 1),
            'interpretation': interpretation,
            'final_score': round(score, 1)
        }

        return round(score, 1), evidence


# =============================================================================
# 综合低估评分引擎
# =============================================================================

class UndervaluationEngine:
    """综合低估评分引擎"""

    # 权重配置
    WEIGHTS = {
        'relative': 0.30,      # 相对估值 30%
        'historical': 0.25,    # 历史估值 25%
        'fcf_yield': 0.25,     # FCF收益率 25%
        'dcf': 0.20,           # DCF 20%
    }

    def __init__(self, api_key: str = None):
        self.fetcher = FMPDataFetcher(api_key)
        self.relative_calc = RelativeValuationCalculator(self.fetcher)
        self.historical_calc = HistoricalValuationCalculator()
        self.fcf_yield_calc = FCFYieldCalculator()
        self.dcf_calc = SimplifiedDCFCalculator()

    def analyze(self, ticker: str) -> UndervaluationResult:
        """
        综合分析股票低估程度

        权重：
        - 相对估值（vs同业）: 30%
        - 历史估值（vs自身）: 25%
        - FCF收益率: 25%
        - DCF安全边际: 20%
        """
        print(f"\n{'='*60}")
        print(f"低估检测分析: {ticker}")
        print(f"{'='*60}")

        # 获取数据
        data = self.fetcher.compile_valuation_data(ticker)
        profile = data.get('profile', {})
        quote = data.get('quote', {})

        # 执行四大估值方法
        print("[1/4] 相对估值分析...")
        relative = self.relative_calc.calculate(data)

        print("[2/4] 历史估值分析...")
        historical = self.historical_calc.calculate(data)

        print("[3/4] FCF收益率分析...")
        fcf_yield = self.fcf_yield_calc.calculate(data)

        print("[4/4] DCF估值分析...")
        dcf = self.dcf_calc.calculate(data)

        # 计算综合评分
        total_score = self._calculate_weighted_score(relative, historical, fcf_yield, dcf)
        grade = self._assign_grade(total_score)

        # 识别红旗
        red_flags = self._identify_red_flags(data, relative, historical, fcf_yield, dcf)

        # 生成投资信号
        signal = self._generate_signal(total_score, red_flags)

        # 汇总关键指标
        key_metrics = {
            'pe_ttm': relative.pe_ttm,
            'pe_vs_industry': relative.pe_vs_industry,
            'pe_percentile_5y': historical.pe_percentile,
            'fcf_yield': fcf_yield.fcf_yield,
            'dcf_upside': dcf.upside_potential,
            'ev_ebitda': relative.ev_ebitda,
        }

        # 确定置信度
        confidence = self._assess_confidence(data, relative, historical, fcf_yield, dcf)

        result = UndervaluationResult(
            ticker=ticker,
            company_name=profile.get('companyName', ticker),
            sector=profile.get('sector', 'Unknown'),
            industry=profile.get('industry', 'Unknown'),
            current_price=quote.get('price', 0) or profile.get('price', 0),
            relative_valuation=relative,
            historical_valuation=historical,
            fcf_yield_valuation=fcf_yield,
            dcf_valuation=dcf,
            undervaluation_score=total_score,
            undervaluation_grade=grade,
            key_metrics=key_metrics,
            red_flags=red_flags,
            investment_signal=signal,
            evaluation_date=datetime.now().strftime('%Y-%m-%d'),
            confidence_level=confidence
        )

        self._print_summary(result)

        return result

    def _calculate_weighted_score(self, relative, historical, fcf_yield, dcf) -> float:
        """计算加权总分"""
        scores = {
            'relative': relative.relative_score,
            'historical': historical.historical_score,
            'fcf_yield': fcf_yield.fcf_yield_score,
            'dcf': dcf.dcf_score,
        }

        total = sum(scores[k] * self.WEIGHTS[k] for k in scores)
        return round(total, 1)

    def _assign_grade(self, score: float) -> str:
        """分配低估等级"""
        if score >= 80:
            return 'A'  # 强烈低估
        elif score >= 65:
            return 'B'  # 中度低估
        elif score >= 50:
            return 'C'  # 轻度低估
        else:
            return 'D'  # 未低估或高估

    def _identify_red_flags(self, data, relative, historical, fcf_yield, dcf) -> List[str]:
        """识别红旗警示"""
        red_flags = []

        # 负FCF
        if fcf_yield.fcf_ttm <= 0:
            red_flags.append("Negative Free Cash Flow - Earnings quality concern")

        # PE极端高
        if relative.pe_ttm and relative.pe_ttm > 50:
            red_flags.append(f"Extremely high P/E ({relative.pe_ttm:.1f}x)")

        # 历史最高估值
        if historical.pe_percentile and historical.pe_percentile > 90:
            red_flags.append("Trading near 5-year high valuation")

        # DCF显示大幅高估
        if dcf.upside_potential and dcf.upside_potential < -0.30:
            red_flags.append(f"DCF suggests significant overvaluation ({dcf.upside_potential*100:.0f}%)")

        # FCF收益率过低
        if fcf_yield.fcf_yield < 0.02 and fcf_yield.fcf_yield > 0:
            red_flags.append(f"Very low FCF yield ({fcf_yield.fcf_yield*100:.1f}%)")

        return red_flags

    def _generate_signal(self, score: float, red_flags: List[str]) -> str:
        """生成投资信号"""
        # 有严重红旗则降级
        severe_flags = len([f for f in red_flags if 'Negative' in f or 'Extremely' in f])

        if score >= 75 and severe_flags == 0:
            return 'strong_buy'
        elif score >= 60 and severe_flags <= 1:
            return 'buy'
        elif score >= 45:
            return 'hold'
        else:
            return 'avoid'

    def _assess_confidence(self, data, relative, historical, fcf_yield, dcf) -> str:
        """评估分析置信度"""
        confidence_points = 0

        # 相对估值数据完整
        if relative.pe_ttm and relative.ev_ebitda:
            confidence_points += 1

        # 历史数据充足
        if historical.pe_percentile is not None:
            confidence_points += 1

        # FCF为正
        if fcf_yield.fcf_ttm > 0:
            confidence_points += 1

        # DCF有效
        if dcf.status == 'valid':
            confidence_points += 1

        if confidence_points >= 4:
            return 'high'
        elif confidence_points >= 2:
            return 'medium'
        else:
            return 'low'

    def _print_summary(self, result: UndervaluationResult):
        """打印评估摘要"""
        print(f"\n{'='*60}")
        print(f"低估评估结果: {result.company_name} ({result.ticker})")
        print(f"{'='*60}")
        print(f"当前价格: ${result.current_price:.2f}")
        print(f"综合低估评分: {result.undervaluation_score}/100")
        print(f"低估等级: {result.undervaluation_grade}")
        print(f"投资信号: {result.investment_signal.upper()}")

        print(f"\n四大估值方法分数:")
        print(f"  相对估值 (30%):    {result.relative_valuation.relative_score}/100")
        print(f"  历史估值 (25%):    {result.historical_valuation.historical_score}/100")
        print(f"  FCF收益率 (25%):   {result.fcf_yield_valuation.fcf_yield_score}/100")
        print(f"  DCF估值 (20%):     {result.dcf_valuation.dcf_score}/100")

        print(f"\n关键指标:")
        km = result.key_metrics
        if km.get('pe_ttm'):
            print(f"  P/E TTM: {km['pe_ttm']:.1f}x")
        if km.get('pe_vs_industry'):
            print(f"  P/E vs Industry: {km['pe_vs_industry']*100:+.1f}%")
        if km.get('pe_percentile_5y'):
            print(f"  P/E 5Y Percentile: {km['pe_percentile_5y']:.0f}%")
        if km.get('fcf_yield'):
            print(f"  FCF Yield: {km['fcf_yield']*100:.2f}%")
        if km.get('dcf_upside'):
            print(f"  DCF Upside: {km['dcf_upside']*100:+.1f}%")

        if result.red_flags:
            print(f"\n[警示] Red Flags:")
            for flag in result.red_flags:
                print(f"  - {flag}")

        print(f"\n置信度: {result.confidence_level}")
        print(f"评估日期: {result.evaluation_date}")
        print(f"{'='*60}\n")

    def batch_analyze(self, tickers: List[str]) -> List[UndervaluationResult]:
        """批量分析"""
        results = []
        for ticker in tickers:
            try:
                result = self.analyze(ticker)
                results.append(result)
            except Exception as e:
                print(f"[ERROR] 分析 {ticker} 失败: {e}")
        return results

    def export_results(self, results: List[UndervaluationResult], output_dir: str):
        """导出分析结果"""
        os.makedirs(output_dir, exist_ok=True)

        # 1. CSV汇总
        summary_data = []
        for r in results:
            summary_data.append({
                'Ticker': r.ticker,
                'Company': r.company_name,
                'Sector': r.sector,
                'Price': r.current_price,
                'Undervaluation_Score': r.undervaluation_score,
                'Grade': r.undervaluation_grade,
                'Signal': r.investment_signal,
                'Relative_Score': r.relative_valuation.relative_score,
                'Historical_Score': r.historical_valuation.historical_score,
                'FCF_Yield_Score': r.fcf_yield_valuation.fcf_yield_score,
                'DCF_Score': r.dcf_valuation.dcf_score,
                'PE_TTM': r.key_metrics.get('pe_ttm'),
                'PE_vs_Industry': r.key_metrics.get('pe_vs_industry'),
                'PE_Percentile_5Y': r.key_metrics.get('pe_percentile_5y'),
                'FCF_Yield': r.key_metrics.get('fcf_yield'),
                'DCF_Upside': r.key_metrics.get('dcf_upside'),
                'Red_Flags': len(r.red_flags),
                'Confidence': r.confidence_level,
                'Date': r.evaluation_date,
            })

        df = pd.DataFrame(summary_data)
        df = df.sort_values('Undervaluation_Score', ascending=False)

        csv_path = os.path.join(output_dir, 'undervaluation_scores.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8-sig')
        print(f"[OK] CSV导出: {csv_path}")

        # 2. JSON详细结果
        detailed = {}
        for r in results:
            detailed[r.ticker] = {
                'ticker': r.ticker,
                'company_name': r.company_name,
                'sector': r.sector,
                'industry': r.industry,
                'current_price': r.current_price,
                'undervaluation_score': r.undervaluation_score,
                'undervaluation_grade': r.undervaluation_grade,
                'investment_signal': r.investment_signal,
                'key_metrics': r.key_metrics,
                'red_flags': r.red_flags,
                'confidence_level': r.confidence_level,
                'evaluation_date': r.evaluation_date,
                'relative_valuation': asdict(r.relative_valuation),
                'historical_valuation': asdict(r.historical_valuation),
                'fcf_yield_valuation': asdict(r.fcf_yield_valuation),
                'dcf_valuation': asdict(r.dcf_valuation),
            }

        json_path = os.path.join(output_dir, 'undervaluation_detailed.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(detailed, f, indent=2, ensure_ascii=False, default=str)
        print(f"[OK] JSON导出: {json_path}")

        # 3. 候选池
        pools = {
            'strong_buy': [r.ticker for r in results if r.investment_signal == 'strong_buy'],
            'buy': [r.ticker for r in results if r.investment_signal == 'buy'],
            'hold': [r.ticker for r in results if r.investment_signal == 'hold'],
            'avoid': [r.ticker for r in results if r.investment_signal == 'avoid'],
        }

        pools_path = os.path.join(output_dir, 'valuation_pools.json')
        with open(pools_path, 'w', encoding='utf-8') as f:
            json.dump(pools, f, indent=2)
        print(f"[OK] 候选池导出: {pools_path}")

        return csv_path, json_path, pools_path


# =============================================================================
# 主函数
# =============================================================================

def main():
    """主函数 - 演示用法"""
    import argparse

    parser = argparse.ArgumentParser(description='估值与低估检测引擎 v2.0')
    parser.add_argument('--ticker', type=str, help='单个股票代码')
    parser.add_argument('--tickers', type=str, help='逗号分隔的股票代码列表')
    parser.add_argument('--output', type=str,
                       default='/Users/milton/投资大师/Top20_Screener/valuation/results',
                       help='输出目录')

    args = parser.parse_args()

    engine = UndervaluationEngine()

    if args.ticker:
        result = engine.analyze(args.ticker)
        engine.export_results([result], args.output)

    elif args.tickers:
        tickers = [t.strip() for t in args.tickers.split(',')]
        results = engine.batch_analyze(tickers)
        engine.export_results(results, args.output)

    else:
        # 默认演示
        print("="*80)
        print("估值与低估检测引擎 v2.0 - 演示")
        print("="*80)

        demo_tickers = ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN']
        print(f"\n演示分析: {', '.join(demo_tickers)}")

        results = engine.batch_analyze(demo_tickers)
        engine.export_results(results, args.output)

        # 打印排名
        print("\n" + "="*80)
        print("低估排名 (从最低估到最高估):")
        print("="*80)

        sorted_results = sorted(results, key=lambda x: x.undervaluation_score, reverse=True)
        for i, r in enumerate(sorted_results, 1):
            print(f"{i}. {r.ticker:6} | Score: {r.undervaluation_score:5.1f} | "
                  f"Grade: {r.undervaluation_grade} | Signal: {r.investment_signal:10} | "
                  f"Price: ${r.current_price:.2f}")

        print("\n" + "="*80)
        print("分析完成!")
        print("="*80)


if __name__ == '__main__':
    main()
