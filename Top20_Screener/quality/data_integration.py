#!/usr/bin/env python3
"""
数据集成模块 - 从多个数据源整合数据用于质量评分

支持的数据源:
1. FMP API - 财务数据
2. 本地财报文件 - 10-K/10-Q
3. Agent 3护城河分析输出
4. 行业对标数据
"""

import os
import json
import requests
import pandas as pd
from typing import Dict, List, Optional
from datetime import datetime, timedelta


class FinancialDataIntegrator:
    """财务数据集成器"""

    def __init__(self, fmp_api_key: Optional[str] = None):
        """
        初始化数据集成器

        Args:
            fmp_api_key: FMP API密钥，如果为None则从环境变量读取
        """
        self.fmp_api_key = fmp_api_key or os.getenv('FMP_API_KEY')
        self.base_url = 'https://financialmodelingprep.com/api/v3'

        if not self.fmp_api_key:
            print("警告: 未设置FMP_API_KEY，部分功能将不可用")

    def fetch_income_statement(self, ticker: str, period: str = 'quarter', limit: int = 4) -> pd.DataFrame:
        """
        获取损益表数据

        Args:
            ticker: 股票代码
            period: 'quarter' 或 'annual'
            limit: 获取期数

        Returns:
            DataFrame包含损益表数据
        """
        if not self.fmp_api_key:
            return pd.DataFrame()

        url = f"{self.base_url}/income-statement/{ticker}"
        params = {
            'period': period,
            'limit': limit,
            'apikey': self.fmp_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return pd.DataFrame(data)
        except Exception as e:
            print(f"获取损益表失败: {e}")
            return pd.DataFrame()

    def fetch_balance_sheet(self, ticker: str, period: str = 'quarter', limit: int = 4) -> pd.DataFrame:
        """获取资产负债表"""
        if not self.fmp_api_key:
            return pd.DataFrame()

        url = f"{self.base_url}/balance-sheet-statement/{ticker}"
        params = {
            'period': period,
            'limit': limit,
            'apikey': self.fmp_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return pd.DataFrame(data)
        except Exception as e:
            print(f"获取资产负债表失败: {e}")
            return pd.DataFrame()

    def fetch_cash_flow(self, ticker: str, period: str = 'quarter', limit: int = 4) -> pd.DataFrame:
        """获取现金流量表"""
        if not self.fmp_api_key:
            return pd.DataFrame()

        url = f"{self.base_url}/cash-flow-statement/{ticker}"
        params = {
            'period': period,
            'limit': limit,
            'apikey': self.fmp_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return pd.DataFrame(data)
        except Exception as e:
            print(f"获取现金流量表失败: {e}")
            return pd.DataFrame()

    def fetch_key_metrics(self, ticker: str, period: str = 'quarter', limit: int = 4) -> pd.DataFrame:
        """获取关键指标"""
        if not self.fmp_api_key:
            return pd.DataFrame()

        url = f"{self.base_url}/key-metrics/{ticker}"
        params = {
            'period': period,
            'limit': limit,
            'apikey': self.fmp_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return pd.DataFrame(data)
        except Exception as e:
            print(f"获取关键指标失败: {e}")
            return pd.DataFrame()

    def fetch_financial_ratios(self, ticker: str, period: str = 'quarter', limit: int = 4) -> pd.DataFrame:
        """获取财务比率"""
        if not self.fmp_api_key:
            return pd.DataFrame()

        url = f"{self.base_url}/ratios/{ticker}"
        params = {
            'period': period,
            'limit': limit,
            'apikey': self.fmp_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            return pd.DataFrame(data)
        except Exception as e:
            print(f"获取财务比率失败: {e}")
            return pd.DataFrame()

    def calculate_quality_metrics(self, ticker: str) -> Dict:
        """
        计算质量评分所需的所有指标

        Args:
            ticker: 股票代码

        Returns:
            包含所有质量指标的字典
        """
        print(f"\n正在获取 {ticker} 的财务数据...")

        # 获取基础数据
        income = self.fetch_income_statement(ticker, period='quarter', limit=8)
        balance = self.fetch_balance_sheet(ticker, period='quarter', limit=8)
        cashflow = self.fetch_cash_flow(ticker, period='quarter', limit=8)
        metrics = self.fetch_key_metrics(ticker, period='quarter', limit=8)
        ratios = self.fetch_financial_ratios(ticker, period='quarter', limit=8)

        if income.empty or balance.empty or cashflow.empty:
            print(f"警告: {ticker} 数据不完整")
            return {}

        # 提取最新季度数据
        latest = income.iloc[0] if not income.empty else {}
        latest_bs = balance.iloc[0] if not balance.empty else {}
        latest_cf = cashflow.iloc[0] if not cashflow.empty else {}
        latest_m = metrics.iloc[0] if not metrics.empty else {}
        latest_r = ratios.iloc[0] if not ratios.empty else {}

        # 计算TTM指标
        ttm_revenue = income['revenue'].head(4).sum() if 'revenue' in income.columns else 0
        ttm_net_income = income['netIncome'].head(4).sum() if 'netIncome' in income.columns else 0
        ttm_ocf = cashflow['operatingCashFlow'].head(4).sum() if 'operatingCashFlow' in cashflow.columns else 0
        ttm_capex = abs(cashflow['capitalExpenditure'].head(4).sum()) if 'capitalExpenditure' in cashflow.columns else 0
        ttm_fcf = ttm_ocf - ttm_capex

        # 计算ROIC (简化版)
        # ROIC = NOPAT / Invested Capital
        nopat = ttm_net_income  # 简化，实际应调整税后
        total_debt = latest_bs.get('totalDebt', 0)
        total_equity = latest_bs.get('totalStockholdersEquity', 0)
        invested_capital = total_debt + total_equity
        roic = nopat / invested_capital if invested_capital > 0 else 0

        # 计算ROE
        roe = ttm_net_income / total_equity if total_equity > 0 else 0

        # 计算营运资本指标
        receivables = latest_bs.get('netReceivables', 0)
        inventory = latest_bs.get('inventory', 0)
        payables = latest_bs.get('accountPayables', 0)
        daily_revenue = ttm_revenue / 365 if ttm_revenue > 0 else 1
        daily_cogs = latest.get('costOfRevenue', 0) * 4 / 365 if latest.get('costOfRevenue', 0) > 0 else 1

        dso = receivables / daily_revenue if daily_revenue > 0 else 0
        dio = inventory / daily_cogs if daily_cogs > 0 else 0
        dpo = payables / daily_cogs if daily_cogs > 0 else 0
        ccc = dso + dio - dpo

        # 计算5年增长率
        if len(income) >= 8:
            revenue_5y_ago = income['revenue'].iloc[7] if len(income) > 7 else income['revenue'].iloc[-1]
            revenue_cagr = ((ttm_revenue / revenue_5y_ago) ** (1/2) - 1) if revenue_5y_ago > 0 else 0

            ni_5y_ago = income['netIncome'].iloc[7] if len(income) > 7 else income['netIncome'].iloc[-1]
            profit_cagr = ((ttm_net_income / ni_5y_ago) ** (1/2) - 1) if ni_5y_ago > 0 and ttm_net_income > 0 else 0
        else:
            revenue_cagr = 0
            profit_cagr = 0

        # 计算EPS波动性
        if 'eps' in income.columns and len(income) >= 8:
            eps_std = income['eps'].head(8).std()
            eps_mean = income['eps'].head(8).mean()
            eps_volatility = eps_std / abs(eps_mean) if eps_mean != 0 else 0
        else:
            eps_volatility = 0

        # 资产负债表指标
        total_assets = latest_bs.get('totalAssets', 1)
        current_assets = latest_bs.get('totalCurrentAssets', 0)
        current_liabilities = latest_bs.get('totalCurrentLiabilities', 1)
        cash = latest_bs.get('cashAndCashEquivalents', 0)
        short_term_investments = latest_bs.get('shortTermInvestments', 0)
        total_cash = cash + short_term_investments

        current_ratio = current_assets / current_liabilities if current_liabilities > 0 else 0
        quick_ratio = (current_assets - inventory) / current_liabilities if current_liabilities > 0 else 0

        net_debt = total_debt - total_cash
        ebitda = latest.get('ebitda', 0) * 4  # 季度转年化

        # 组装结果
        result = {
            'ticker': ticker,
            'company_name': latest.get('symbol', ticker),
            'sector': 'Technology',  # 需要从profile API获取

            # 现金流数据
            'operating_cash_flow': ttm_ocf,
            'net_income': ttm_net_income,
            'free_cash_flow': ttm_fcf,

            # 营运资本
            'days_sales_outstanding': dso,
            'dso_trend': self._calculate_trend(
                [balance.iloc[i].get('netReceivables', 0) / (income.iloc[i].get('revenue', 1) / 90)
                 for i in range(min(4, len(balance)))]
            ),
            'days_inventory_outstanding': dio,
            'dio_trend': self._calculate_trend(
                [balance.iloc[i].get('inventory', 0) for i in range(min(4, len(balance)))]
            ),
            'cash_conversion_cycle': ccc,

            # 盈利一致性
            'eps_5y_std_dev': eps_volatility,
            'consecutive_profit_years': self._count_consecutive_profits(income),

            # 资本效率
            'roic': roic,
            'wacc': 0.09,  # 需要单独计算或估算
            'roic_5y_trend': 'stable',  # 需要计算5年数据
            'roe': roe,
            'net_margin': ttm_net_income / ttm_revenue if ttm_revenue > 0 else 0,
            'equity_multiplier': total_assets / total_equity if total_equity > 0 else 0,
            'roe_5y_trend': 'stable',
            'asset_turnover': ttm_revenue / total_assets if total_assets > 0 else 0,
            'industry_median_asset_turnover': 0.6,  # 需要从行业数据获取

            # 资产负债表
            'net_debt': net_debt,
            'ebitda': ebitda,
            'ebit': latest.get('operatingIncome', 0) * 4,
            'interest_expense': abs(latest.get('interestExpense', 1)),
            'current_ratio': current_ratio,
            'quick_ratio': quick_ratio,

            # 增长
            'revenue_cagr_5y': revenue_cagr,
            'profit_cagr_5y': profit_cagr,
            'revenue_growth': (income['revenue'].iloc[0] - income['revenue'].iloc[4]) / income['revenue'].iloc[4] if len(income) > 4 else 0,
            'market_position': 1,  # 需要从市场数据获取
            'market_share_trend': 'stable',
            'tam_growth_rate': 0.05  # 需要从行业研究获取
        }

        return result

    def _calculate_trend(self, values: List[float]) -> str:
        """计算趋势 (increasing/stable/decreasing)"""
        if len(values) < 2:
            return 'stable'

        # 简单线性回归
        changes = [values[i] - values[i+1] for i in range(len(values)-1) if values[i+1] != 0]
        if not changes:
            return 'stable'

        avg_change = sum(changes) / len(changes)
        if avg_change > 0.1:
            return 'increasing'
        elif avg_change < -0.1:
            return 'decreasing'
        else:
            return 'stable'

    def _count_consecutive_profits(self, income_df: pd.DataFrame) -> int:
        """计算连续盈利年数"""
        if 'netIncome' not in income_df.columns:
            return 0

        count = 0
        for ni in income_df['netIncome']:
            if ni > 0:
                count += 1
            else:
                break
        return min(count // 4, 10)  # 转换为年数，最多10年

    def load_moat_analysis(self, ticker: str, moat_file: str = None) -> Dict:
        """
        加载护城河分析数据

        Args:
            ticker: 股票代码
            moat_file: 护城河分析文件路径，如果为None则使用默认路径

        Returns:
            护城河数据字典
        """
        if moat_file is None:
            moat_file = f'/Users/milton/投资大师/Top20_Screener/data/{ticker}_moat_analysis.json'

        if os.path.exists(moat_file):
            with open(moat_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            print(f"警告: 未找到护城河分析文件 {moat_file}，使用默认值")
            return {
                'moat_total_score': 50,
                'moat_rating': 'Narrow Moat',
                'pricing_power': 'Not assessed',
                'switching_costs': 'Not assessed',
                'network_effects': 'Not assessed',
                'cost_advantage': 'Not assessed',
                'intangible_assets': 'Not assessed'
            }

    def batch_process(self, tickers: List[str]) -> pd.DataFrame:
        """
        批量处理多个股票

        Args:
            tickers: 股票代码列表

        Returns:
            包含所有股票质量指标的DataFrame
        """
        results = []
        for ticker in tickers:
            try:
                data = self.calculate_quality_metrics(ticker)
                if data:
                    results.append(data)
            except Exception as e:
                print(f"处理 {ticker} 时出错: {e}")

        return pd.DataFrame(results)


def create_sample_moat_data(ticker: str, output_dir: str):
    """
    创建示例护城河数据文件

    Args:
        ticker: 股票代码
        output_dir: 输出目录
    """
    os.makedirs(output_dir, exist_ok=True)

    # 示例数据 - 实际应该从Agent 3获取
    sample_moat = {
        'ticker': ticker,
        'evaluation_date': datetime.now().strftime('%Y-%m-%d'),
        'moat_total_score': 70,
        'moat_rating': 'Wide Moat',
        'dimensions': {
            'network_effects': {
                'score': 9,
                'max_score': 10,
                'evidence': '极强的网络效应，用户规模带来数据优势'
            },
            'switching_costs': {
                'score': 7,
                'max_score': 10,
                'evidence': '生态系统锁定，迁移成本高'
            },
            'cost_advantage': {
                'score': 8,
                'max_score': 10,
                'evidence': '规模经济，单位成本显著低于竞争对手'
            },
            'intangible_assets': {
                'score': 8,
                'max_score': 10,
                'evidence': '强大品牌、专利组合、数据资产'
            },
            'regulatory_barriers': {
                'score': 5,
                'max_score': 10,
                'evidence': '监管成为反向护城河'
            }
        },
        'pricing_power': '强定价能力，但受AI竞争威胁',
        'switching_costs': '云服务高，搜索低',
        'network_effects': '9/10 - 衰减中',
        'cost_advantage': '规模经济8/10',
        'intangible_assets': '品牌、数据、专利'
    }

    output_path = os.path.join(output_dir, f'{ticker}_moat_analysis.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(sample_moat, f, indent=2, ensure_ascii=False)

    print(f"✓ 示例护城河数据已创建: {output_path}")
    return output_path


def main():
    """示例：集成财务数据并生成质量评分"""
    from fundamental_quality_scorer import FundamentalQualityScorer

    print("=" * 80)
    print("财务数据集成与质量评分示例")
    print("=" * 80)

    # 初始化集成器
    integrator = FinancialDataIntegrator()

    # 测试股票
    ticker = 'GOOGL'

    # 方法1: 使用手工数据 (如果没有API key)
    print(f"\n方法1: 使用预设数据评分 {ticker}")
    google_data = {
        'ticker': 'GOOGL',
        'company_name': 'Alphabet Inc.',
        'sector': 'Technology',
        'operating_cash_flow': 151.4e9,
        'net_income': 124.3e9,
        'free_cash_flow': 73.6e9,
        'days_sales_outstanding': 35,
        'dso_trend': 'stable',
        'days_inventory_outstanding': 0,
        'dio_trend': 'stable',
        'cash_conversion_cycle': 25,
        'eps_5y_std_dev': 0.12,
        'consecutive_profit_years': 10,
        'roic': 0.28,
        'wacc': 0.09,
        'roic_5y_trend': 'stable',
        'roe': 0.32,
        'net_margin': 0.31,
        'equity_multiplier': 1.4,
        'roe_5y_trend': 'stable',
        'asset_turnover': 0.65,
        'industry_median_asset_turnover': 0.55,
        'net_debt': -64.8e9,
        'ebitda': 150e9,
        'ebit': 140e9,
        'interest_expense': 1e9,
        'current_ratio': 1.75,
        'quick_ratio': 1.65,
        'revenue_cagr_5y': 0.14,
        'profit_cagr_5y': 0.16,
        'revenue_growth': 0.157,
        'market_position': 1,
        'market_share_trend': 'decreasing',
        'tam_growth_rate': 0.08
    }

    # 创建或加载护城河数据
    moat_dir = '/Users/milton/投资大师/Top20_Screener/data'
    create_sample_moat_data(ticker, moat_dir)
    moat_data = integrator.load_moat_analysis(ticker)

    # 评分
    scorer = FundamentalQualityScorer()
    score = scorer.calculate_total_score(google_data, moat_data)

    print(f"\n{score.company_name} ({score.ticker})")
    print(f"总分: {score.total_score:.1f}/100 - 评级: {score.grade}")
    print(f"  盈利质量: {score.profitability_quality:.1f}/25")
    print(f"  资本效率: {score.capital_efficiency:.1f}/20")
    print(f"  护城河:   {score.moat_strength:.1f}/25")
    print(f"  资产负债表: {score.balance_sheet:.1f}/20")
    print(f"  增长可持续: {score.growth_sustainability:.1f}/10")

    # 方法2: 如果有FMP API key，从API获取数据
    if integrator.fmp_api_key:
        print(f"\n方法2: 从FMP API获取 {ticker} 数据")
        api_data = integrator.calculate_quality_metrics(ticker)
        if api_data:
            score_api = scorer.calculate_total_score(api_data, moat_data)
            print(f"API数据评分: {score_api.total_score:.1f}/100")

    print(f"\n{'='*80}")
    print("示例完成!")
    print(f"{'='*80}")


if __name__ == '__main__':
    main()
