#!/usr/bin/env python3
"""
Quality Metrics Calculator
基本面质量核心指标计算引擎

计算四大类质量指标：
1. 现金流质量指标
2. 资本效率指标
3. 护城河评分系统
4. 资产负债表稳健性

所有指标均可验证，含公式说明和数据来源
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


@dataclass
class CompanyFinancials:
    """公司财务数据结构"""
    ticker: str
    company_name: str
    sector: str
    industry: str

    # 损益表数据
    revenue: float
    net_income: float
    ebit: float
    gross_profit: float
    cost_of_revenue: float
    interest_expense: float

    # 现金流量表数据
    operating_cash_flow: float
    capex: float
    free_cash_flow: float

    # 资产负债表数据
    total_assets: float
    total_equity: float
    total_debt: float
    current_assets: float
    current_liabilities: float
    cash: float
    accounts_receivable: float
    inventory: float
    accounts_payable: float
    short_term_debt: float

    # 额外指标
    tax_rate: float = 0.21  # 默认美国企业税率
    shares_outstanding: float = 0.0

    # 历史数据（5年趋势分析用）
    historical_data: Optional[pd.DataFrame] = None

    # 数据来源标注
    data_source: str = "10-K/10-Q"
    data_date: str = ""


class CashFlowQualityMetrics:
    """现金流质量指标计算"""

    @staticmethod
    def calculate_ocf_to_ni_ratio(ocf: float, net_income: float) -> Dict:
        """
        OCF to Net Income Ratio - 盈利兑现能力

        公式: OCF / Net Income
        目标: ≥ 1.0 (利润能兑现为现金)
        优秀: ≥ 1.2
        警告: < 0.8 (利润质量存疑)

        Args:
            ocf: 经营现金流 (Operating Cash Flow)
            net_income: 净利润

        Returns:
            Dict containing ratio, rating, and interpretation
        """
        if net_income == 0 or pd.isna(net_income):
            return {
                'ratio': np.nan,
                'rating': 'N/A',
                'interpretation': '净利润为零或负，无法计算',
                'formula': 'OCF / Net Income'
            }

        ratio = ocf / net_income

        if ratio >= 1.2:
            rating = 'Excellent'
            interpretation = '盈利质量优秀，现金转化能力强'
        elif ratio >= 1.0:
            rating = 'Good'
            interpretation = '盈利可兑现为现金，质量良好'
        elif ratio >= 0.8:
            rating = 'Acceptable'
            interpretation = '盈利质量可接受，需关注趋势'
        else:
            rating = 'Warning'
            interpretation = '盈利质量存疑，现金转化能力弱'

        return {
            'ratio': round(ratio, 3),
            'rating': rating,
            'interpretation': interpretation,
            'formula': 'OCF / Net Income',
            'ocf': ocf,
            'net_income': net_income
        }

    @staticmethod
    def calculate_fcf_to_ni_ratio(fcf: float, net_income: float) -> Dict:
        """
        FCF to Net Income Ratio

        公式: FCF / Net Income
        其中 FCF = OCF - CapEx
        目标: ≥ 0.7
        优秀: ≥ 0.9
        """
        if net_income == 0 or pd.isna(net_income):
            return {
                'ratio': np.nan,
                'rating': 'N/A',
                'interpretation': '净利润为零或负，无法计算'
            }

        ratio = fcf / net_income

        if ratio >= 0.9:
            rating = 'Excellent'
            interpretation = '自由现金流转化优秀'
        elif ratio >= 0.7:
            rating = 'Good'
            interpretation = '自由现金流转化良好'
        elif ratio >= 0.5:
            rating = 'Acceptable'
            interpretation = '资本支出较高，关注投资回报'
        else:
            rating = 'Warning'
            interpretation = '高资本支出侵蚀现金流，需评估必要性'

        return {
            'ratio': round(ratio, 3),
            'rating': rating,
            'interpretation': interpretation,
            'formula': 'FCF / Net Income, where FCF = OCF - CapEx'
        }

    @staticmethod
    def calculate_working_capital_metrics(
        revenue: float,
        cogs: float,
        accounts_receivable: float,
        inventory: float,
        accounts_payable: float
    ) -> Dict:
        """
        营运资本质量指标

        计算:
        - DSO (Days Sales Outstanding): 应收账款周转天数
        - DIO (Days Inventory Outstanding): 存货周转天数
        - DPO (Days Payable Outstanding): 应付账款周转天数
        - CCC (Cash Conversion Cycle): 现金转换周期

        公式:
        DSO = (Accounts Receivable / Revenue) × 365
        DIO = (Inventory / COGS) × 365
        DPO = (Accounts Payable / COGS) × 365
        CCC = DSO + DIO - DPO
        """
        dso = (accounts_receivable / revenue) * 365 if revenue > 0 else 0
        dio = (inventory / cogs) * 365 if cogs > 0 else 0
        dpo = (accounts_payable / cogs) * 365 if cogs > 0 else 0
        ccc = dso + dio - dpo

        # CCC评级
        if ccc < 30:
            ccc_rating = 'Excellent'
            ccc_interpretation = '现金转换周期短，营运资本效率优秀'
        elif ccc < 60:
            ccc_rating = 'Good'
            ccc_interpretation = '现金转换周期良好'
        elif ccc < 90:
            ccc_rating = 'Acceptable'
            ccc_interpretation = '现金转换周期可接受，有改善空间'
        else:
            ccc_rating = 'Warning'
            ccc_interpretation = '现金转换周期过长，占用大量营运资本'

        return {
            'DSO': round(dso, 1),
            'DIO': round(dio, 1),
            'DPO': round(dpo, 1),
            'CCC': round(ccc, 1),
            'CCC_rating': ccc_rating,
            'CCC_interpretation': ccc_interpretation,
            'formulas': {
                'DSO': '(AR / Revenue) × 365',
                'DIO': '(Inventory / COGS) × 365',
                'DPO': '(AP / COGS) × 365',
                'CCC': 'DSO + DIO - DPO'
            }
        }

    @staticmethod
    def calculate_capex_intensity(capex: float, revenue: float,
                                  historical_avg_capex: Optional[float] = None) -> Dict:
        """
        资本支出强度

        公式: CapEx / Revenue
        对比: 当前 vs 5年平均
        警告: CapEx突然大幅增加可能表明维持增长需要更多投资
        """
        intensity = capex / revenue if revenue > 0 else 0

        result = {
            'capex_intensity': round(intensity, 4),
            'capex': capex,
            'revenue': revenue,
            'formula': 'CapEx / Revenue'
        }

        if historical_avg_capex:
            pct_change = ((capex - historical_avg_capex) / historical_avg_capex * 100) if historical_avg_capex > 0 else 0
            result['vs_5yr_avg'] = f"{pct_change:+.1f}%"

            if pct_change > 50:
                result['warning'] = '资本支出大幅增加，需评估增长可持续性'
            elif pct_change > 20:
                result['note'] = '资本支出增加，关注投资回报'

        return result


class CapitalEfficiencyMetrics:
    """资本效率指标计算"""

    @staticmethod
    def calculate_roic(ebit: float, tax_rate: float, total_equity: float,
                      total_debt: float, cash: float) -> Dict:
        """
        ROIC - 投入资本回报率

        公式:
        NOPAT = EBIT × (1 - Tax Rate)
        Invested Capital = Total Equity + Total Debt - Cash
        ROIC = NOPAT / Invested Capital

        目标:
        - ROIC > WACC (创造价值)
        - ROIC > 15% (优秀)

        数据来源: 10-K损益表(EBIT)、资产负债表(权益、负债、现金)
        """
        nopat = ebit * (1 - tax_rate)
        invested_capital = total_equity + total_debt - cash

        if invested_capital <= 0:
            return {
                'roic': np.nan,
                'rating': 'N/A',
                'interpretation': '投入资本为负或零，无法计算'
            }

        roic = (nopat / invested_capital) * 100  # 百分比

        if roic >= 15:
            rating = 'Excellent'
            interpretation = '资本回报率优秀，强护城河证据'
        elif roic >= 10:
            rating = 'Good'
            interpretation = '资本回报率良好，创造价值'
        elif roic >= 5:
            rating = 'Acceptable'
            interpretation = '资本回报率可接受'
        else:
            rating = 'Poor'
            interpretation = '资本回报率低，可能摧毁价值'

        return {
            'roic': round(roic, 2),
            'nopat': round(nopat, 2),
            'invested_capital': round(invested_capital, 2),
            'rating': rating,
            'interpretation': interpretation,
            'formulas': {
                'NOPAT': 'EBIT × (1 - Tax Rate)',
                'Invested_Capital': 'Total Equity + Total Debt - Cash',
                'ROIC': 'NOPAT / Invested_Capital'
            }
        }

    @staticmethod
    def calculate_roe_dupont(net_income: float, revenue: float,
                            total_assets: float, total_equity: float) -> Dict:
        """
        ROE与杜邦三因素分解

        公式:
        ROE = Net Income / Total Equity

        杜邦分解:
        ROE = (Net Income / Revenue) × (Revenue / Total Assets) × (Total Assets / Total Equity)
            = 净利率 × 资产周转率 × 权益乘数

        分析:
        - 高ROE来自高利润率 → 定价权 (好)
        - 高ROE来自高杠杆 → 风险 (需警惕)
        """
        if total_equity <= 0:
            return {'roe': np.nan, 'interpretation': '权益为负，无法计算'}

        roe = (net_income / total_equity) * 100

        # 杜邦分解
        profit_margin = (net_income / revenue) * 100 if revenue > 0 else 0
        asset_turnover = revenue / total_assets if total_assets > 0 else 0
        equity_multiplier = total_assets / total_equity if total_equity > 0 else 0

        # 分析ROE来源
        if equity_multiplier > 3:
            leverage_note = '高杠杆驱动ROE，需警惕财务风险'
        elif equity_multiplier > 2:
            leverage_note = '中等杠杆'
        else:
            leverage_note = '低杠杆，保守财务结构'

        if profit_margin > 20:
            margin_note = '高利润率，强定价权证据'
        elif profit_margin > 10:
            margin_note = '良好利润率'
        else:
            margin_note = '利润率偏低，竞争压力大'

        return {
            'roe': round(roe, 2),
            'dupont_decomposition': {
                'profit_margin': round(profit_margin, 2),
                'asset_turnover': round(asset_turnover, 3),
                'equity_multiplier': round(equity_multiplier, 2)
            },
            'roe_verification': round(profit_margin * asset_turnover * equity_multiplier, 2),
            'analysis': {
                'leverage_assessment': leverage_note,
                'margin_assessment': margin_note
            },
            'formula': 'ROE = (NI/Revenue) × (Revenue/Assets) × (Assets/Equity)'
        }

    @staticmethod
    def calculate_asset_turnover(revenue: float, avg_total_assets: float) -> Dict:
        """
        资产周转率

        公式: Revenue / Average Total Assets

        行业对比: 零售高，资本密集型低
        趋势: 资产周转率下降 → 资产使用效率恶化
        """
        turnover = revenue / avg_total_assets if avg_total_assets > 0 else 0

        # 行业基准（简化版）
        if turnover > 2.0:
            rating = 'Excellent'
            interpretation = '资产周转率高，典型零售/服务业特征'
        elif turnover > 1.0:
            rating = 'Good'
            interpretation = '资产周转率良好'
        elif turnover > 0.5:
            rating = 'Acceptable'
            interpretation = '资产周转率可接受，资本密集型行业特征'
        else:
            rating = 'Low'
            interpretation = '资产周转率低，需提升资产使用效率'

        return {
            'asset_turnover': round(turnover, 3),
            'rating': rating,
            'interpretation': interpretation,
            'formula': 'Revenue / Average Total Assets'
        }


class MoatScoring:
    """护城河评分系统 (基于Morningstar护城河理论)"""

    @staticmethod
    def score_pricing_power(gross_margin: float, gross_margin_trend: str,
                           industry_median_margin: float,
                           brand_premium_evidence: bool = False) -> Dict:
        """
        定价权评分 (满分25分)

        指标:
        1. 毛利率 > 行业中位数+10%: +10分
        2. 毛利率连续5年上升: +5分
        3. 价格调整后销量未明显下降: +5分
        4. 品牌溢价证据: +5分

        数据来源:
        - 财报: 毛利率趋势
        - 行业报告: 品牌溢价量化
        """
        score = 0
        details = []

        # 1. 毛利率vs行业
        margin_diff = gross_margin - industry_median_margin
        if margin_diff >= 10:
            score += 10
            details.append(f'毛利率高于行业中位数{margin_diff:.1f}%: +10分')
        elif margin_diff >= 5:
            score += 5
            details.append(f'毛利率高于行业中位数{margin_diff:.1f}%: +5分')

        # 2. 毛利率趋势
        if gross_margin_trend == 'rising':
            score += 5
            details.append('毛利率连续上升: +5分')
        elif gross_margin_trend == 'stable':
            score += 3
            details.append('毛利率稳定: +3分')

        # 3. 品牌溢价
        if brand_premium_evidence:
            score += 5
            details.append('存在品牌溢价证据: +5分')

        return {
            'category': 'Pricing Power',
            'score': score,
            'max_score': 25,
            'percentage': round((score / 25) * 100, 1),
            'details': details,
            'gross_margin': gross_margin,
            'industry_median': industry_median_margin
        }

    @staticmethod
    def score_switching_costs(customer_retention_rate: float,
                             product_embedding: str,
                             network_effects: bool = False) -> Dict:
        """
        转换成本评分 (满分25分)

        指标:
        1. 客户留存率 > 90%: +10分
        2. 产品深度嵌入客户流程 (ERP/数据库): +8分
        3. 网络效应存在 (多边平台): +7分

        数据来源:
        - 财报: NRR (Net Revenue Retention)
        - 案例研究: 客户迁移成本分析
        """
        score = 0
        details = []

        # 1. 客户留存率
        if customer_retention_rate >= 90:
            score += 10
            details.append(f'客户留存率{customer_retention_rate}%: +10分')
        elif customer_retention_rate >= 80:
            score += 6
            details.append(f'客户留存率{customer_retention_rate}%: +6分')
        elif customer_retention_rate >= 70:
            score += 3
            details.append(f'客户留存率{customer_retention_rate}%: +3分')

        # 2. 产品嵌入度
        embedding_scores = {
            'deep': (8, '产品深度嵌入: +8分'),
            'moderate': (5, '产品中度嵌入: +5分'),
            'shallow': (2, '产品浅度嵌入: +2分')
        }
        if product_embedding in embedding_scores:
            points, msg = embedding_scores[product_embedding]
            score += points
            details.append(msg)

        # 3. 网络效应
        if network_effects:
            score += 7
            details.append('存在网络效应: +7分')

        return {
            'category': 'Switching Costs',
            'score': score,
            'max_score': 25,
            'percentage': round((score / 25) * 100, 1),
            'details': details
        }

    @staticmethod
    def score_cost_advantage(unit_cost_vs_industry: float,
                            scale_effects: bool = False,
                            proprietary_tech: bool = False) -> Dict:
        """
        成本优势评分 (满分25分)

        指标:
        1. 单位成本 < 行业中位数-20%: +10分
        2. 规模效应证据 (边际成本递减): +8分
        3. 专有技术/流程优势: +7分

        数据来源:
        - 财报: 单位经济学披露
        - 供应链分析: 成本结构对比
        - 专利数据: 技术壁垒
        """
        score = 0
        details = []

        # 1. 单位成本优势
        if unit_cost_vs_industry <= -20:
            score += 10
            details.append(f'单位成本低于行业{-unit_cost_vs_industry:.1f}%: +10分')
        elif unit_cost_vs_industry <= -10:
            score += 5
            details.append(f'单位成本低于行业{-unit_cost_vs_industry:.1f}%: +5分')

        # 2. 规模效应
        if scale_effects:
            score += 8
            details.append('存在规模效应: +8分')

        # 3. 专有技术
        if proprietary_tech:
            score += 7
            details.append('专有技术优势: +7分')

        return {
            'category': 'Cost Advantage',
            'score': score,
            'max_score': 25,
            'percentage': round((score / 25) * 100, 1),
            'details': details
        }

    @staticmethod
    def calculate_total_moat_score(pricing_power: Dict, switching_costs: Dict,
                                  cost_advantage: Dict, network_effects_score: int = 0,
                                  regulatory_barriers_score: int = 0) -> Dict:
        """
        综合护城河评分

        总分 = 定价权(25) + 转换成本(25) + 成本优势(25) + 网络效应(15) + 监管壁垒(10)

        评级:
        - Wide Moat (宽护城河): ≥70分
        - Narrow Moat (窄护城河): 50-69分
        - No Moat (无护城河): <50分
        """
        total_score = (
            pricing_power['score'] +
            switching_costs['score'] +
            cost_advantage['score'] +
            network_effects_score +
            regulatory_barriers_score
        )

        if total_score >= 70:
            moat_rating = 'Wide Moat'
            interpretation = '宽护城河：强大且持久的竞争优势'
        elif total_score >= 50:
            moat_rating = 'Narrow Moat'
            interpretation = '窄护城河：一定竞争优势，但可能被侵蚀'
        else:
            moat_rating = 'No Moat'
            interpretation = '无护城河：缺乏可持续竞争优势'

        return {
            'total_score': total_score,
            'max_score': 100,
            'moat_rating': moat_rating,
            'interpretation': interpretation,
            'component_scores': {
                'pricing_power': pricing_power['score'],
                'switching_costs': switching_costs['score'],
                'cost_advantage': cost_advantage['score'],
                'network_effects': network_effects_score,
                'regulatory_barriers': regulatory_barriers_score
            }
        }


class BalanceSheetHealth:
    """资产负债表稳健性分析"""

    @staticmethod
    def calculate_leverage_metrics(total_debt: float, total_equity: float,
                                   ebitda: float, cash: float) -> Dict:
        """
        杠杆与偿债能力指标

        公式:
        1. Debt/Equity = Total Debt / Total Equity
        2. Net Debt/EBITDA = (Total Debt - Cash) / EBITDA

        目标:
        - D/E < 1.0 (保守)
        - Net Debt/EBITDA < 3.0
        - 优秀: < 2.0
        """
        debt_to_equity = total_debt / total_equity if total_equity > 0 else np.nan
        net_debt = total_debt - cash
        net_debt_to_ebitda = net_debt / ebitda if ebitda > 0 else np.nan

        # D/E评级
        if debt_to_equity < 0.5:
            de_rating = 'Conservative'
            de_interpretation = '低杠杆，财务稳健'
        elif debt_to_equity < 1.0:
            de_rating = 'Moderate'
            de_interpretation = '中等杠杆，合理水平'
        elif debt_to_equity < 2.0:
            de_rating = 'Elevated'
            de_interpretation = '较高杠杆，需关注'
        else:
            de_rating = 'High'
            de_interpretation = '高杠杆，财务风险较大'

        # Net Debt/EBITDA评级
        if net_debt_to_ebitda < 2.0:
            nd_rating = 'Excellent'
            nd_interpretation = '偿债能力优秀'
        elif net_debt_to_ebitda < 3.0:
            nd_rating = 'Good'
            nd_interpretation = '偿债能力良好'
        elif net_debt_to_ebitda < 4.0:
            nd_rating = 'Acceptable'
            nd_interpretation = '偿债能力可接受'
        else:
            nd_rating = 'Warning'
            nd_interpretation = '偿债压力较大'

        return {
            'debt_to_equity': round(debt_to_equity, 2),
            'de_rating': de_rating,
            'de_interpretation': de_interpretation,
            'net_debt_to_ebitda': round(net_debt_to_ebitda, 2),
            'nd_rating': nd_rating,
            'nd_interpretation': nd_interpretation,
            'formulas': {
                'D/E': 'Total Debt / Total Equity',
                'Net_Debt/EBITDA': '(Total Debt - Cash) / EBITDA'
            }
        }

    @staticmethod
    def calculate_interest_coverage(ebit: float, interest_expense: float) -> Dict:
        """
        利息覆盖率

        公式: EBIT / Interest Expense

        目标: > 5.0 (利息支付无压力)
        警告: < 2.0 (财务脆弱)
        """
        if interest_expense == 0:
            return {
                'interest_coverage': np.inf,
                'rating': 'Excellent',
                'interpretation': '无利息支出或极低'
            }

        coverage = ebit / interest_expense

        if coverage > 5.0:
            rating = 'Excellent'
            interpretation = '利息覆盖率高，偿债能力强'
        elif coverage > 3.0:
            rating = 'Good'
            interpretation = '利息覆盖率良好'
        elif coverage > 2.0:
            rating = 'Acceptable'
            interpretation = '利息覆盖率可接受，需关注趋势'
        else:
            rating = 'Warning'
            interpretation = '利息覆盖率低，财务脆弱'

        return {
            'interest_coverage': round(coverage, 2),
            'rating': rating,
            'interpretation': interpretation,
            'formula': 'EBIT / Interest Expense'
        }

    @staticmethod
    def calculate_liquidity_ratios(current_assets: float, current_liabilities: float,
                                  inventory: float, cash: float,
                                  short_term_debt: float) -> Dict:
        """
        流动性指标

        公式:
        1. Current Ratio = Current Assets / Current Liabilities
        2. Quick Ratio = (Current Assets - Inventory) / Current Liabilities
        3. Cash to Short-term Debt = Cash / Short-term Debt

        目标:
        - Current Ratio > 1.5
        - Quick Ratio > 1.0 (不依赖存货变现)
        """
        current_ratio = current_assets / current_liabilities if current_liabilities > 0 else np.nan
        quick_ratio = (current_assets - inventory) / current_liabilities if current_liabilities > 0 else np.nan
        cash_to_std = cash / short_term_debt if short_term_debt > 0 else np.inf

        # Current Ratio评级
        if current_ratio >= 2.0:
            cr_rating = 'Excellent'
        elif current_ratio >= 1.5:
            cr_rating = 'Good'
        elif current_ratio >= 1.0:
            cr_rating = 'Acceptable'
        else:
            cr_rating = 'Warning'

        # Quick Ratio评级
        if quick_ratio >= 1.0:
            qr_rating = 'Good'
            qr_interpretation = '不依赖存货即可偿还短期债务'
        elif quick_ratio >= 0.8:
            qr_rating = 'Acceptable'
            qr_interpretation = '短期偿债能力可接受'
        else:
            qr_rating = 'Warning'
            qr_interpretation = '短期偿债能力弱'

        return {
            'current_ratio': round(current_ratio, 2),
            'cr_rating': cr_rating,
            'quick_ratio': round(quick_ratio, 2),
            'qr_rating': qr_rating,
            'qr_interpretation': qr_interpretation,
            'cash_to_short_term_debt': round(cash_to_std, 2),
            'formulas': {
                'Current_Ratio': 'Current Assets / Current Liabilities',
                'Quick_Ratio': '(Current Assets - Inventory) / Current Liabilities',
                'Cash_to_STD': 'Cash / Short-term Debt'
            }
        }


class QualityMetricsCalculator:
    """质量指标计算器主类"""

    def __init__(self, company_data: CompanyFinancials):
        self.company = company_data
        self.results = {}

    def calculate_all_metrics(self) -> Dict:
        """计算所有质量指标"""

        # 1. 现金流质量
        cash_flow_quality = self._calculate_cash_flow_quality()

        # 2. 资本效率
        capital_efficiency = self._calculate_capital_efficiency()

        # 3. 护城河评分 (需要额外输入)
        # moat_score = self._calculate_moat_score()

        # 4. 资产负债表稳健性
        balance_sheet = self._calculate_balance_sheet_health()

        self.results = {
            'ticker': self.company.ticker,
            'company_name': self.company.company_name,
            'sector': self.company.sector,
            'industry': self.company.industry,
            'data_date': self.company.data_date,
            'data_source': self.company.data_source,
            'cash_flow_quality': cash_flow_quality,
            'capital_efficiency': capital_efficiency,
            'balance_sheet_health': balance_sheet,
            'calculation_timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        return self.results

    def _calculate_cash_flow_quality(self) -> Dict:
        """现金流质量指标"""
        cfq = CashFlowQualityMetrics()

        ocf_ni = cfq.calculate_ocf_to_ni_ratio(
            self.company.operating_cash_flow,
            self.company.net_income
        )

        fcf_ni = cfq.calculate_fcf_to_ni_ratio(
            self.company.free_cash_flow,
            self.company.net_income
        )

        working_capital = cfq.calculate_working_capital_metrics(
            self.company.revenue,
            self.company.cost_of_revenue,
            self.company.accounts_receivable,
            self.company.inventory,
            self.company.accounts_payable
        )

        capex_intensity = cfq.calculate_capex_intensity(
            self.company.capex,
            self.company.revenue
        )

        return {
            'ocf_to_ni_ratio': ocf_ni,
            'fcf_to_ni_ratio': fcf_ni,
            'working_capital_metrics': working_capital,
            'capex_intensity': capex_intensity
        }

    def _calculate_capital_efficiency(self) -> Dict:
        """资本效率指标"""
        ce = CapitalEfficiencyMetrics()

        roic = ce.calculate_roic(
            self.company.ebit,
            self.company.tax_rate,
            self.company.total_equity,
            self.company.total_debt,
            self.company.cash
        )

        roe_dupont = ce.calculate_roe_dupont(
            self.company.net_income,
            self.company.revenue,
            self.company.total_assets,
            self.company.total_equity
        )

        asset_turnover = ce.calculate_asset_turnover(
            self.company.revenue,
            self.company.total_assets
        )

        return {
            'roic': roic,
            'roe_dupont': roe_dupont,
            'asset_turnover': asset_turnover
        }

    def _calculate_balance_sheet_health(self) -> Dict:
        """资产负债表稳健性"""
        bsh = BalanceSheetHealth()

        # 计算EBITDA (简化: EBIT + D&A, 这里用EBIT作为近似)
        ebitda = self.company.ebit  # 理想情况应该加回折旧摊销

        leverage = bsh.calculate_leverage_metrics(
            self.company.total_debt,
            self.company.total_equity,
            ebitda,
            self.company.cash
        )

        interest_coverage = bsh.calculate_interest_coverage(
            self.company.ebit,
            self.company.interest_expense
        )

        liquidity = bsh.calculate_liquidity_ratios(
            self.company.current_assets,
            self.company.current_liabilities,
            self.company.inventory,
            self.company.cash,
            self.company.short_term_debt
        )

        return {
            'leverage_metrics': leverage,
            'interest_coverage': interest_coverage,
            'liquidity_ratios': liquidity
        }

    def export_to_dataframe(self) -> pd.DataFrame:
        """导出为DataFrame格式"""
        if not self.results:
            self.calculate_all_metrics()

        # 扁平化结果用于表格展示
        flat_data = {
            'Ticker': self.company.ticker,
            'Company': self.company.company_name,
            'Sector': self.company.sector,
            'Industry': self.company.industry,

            # 现金流质量
            'OCF/NI': self.results['cash_flow_quality']['ocf_to_ni_ratio']['ratio'],
            'OCF/NI_Rating': self.results['cash_flow_quality']['ocf_to_ni_ratio']['rating'],
            'FCF/NI': self.results['cash_flow_quality']['fcf_to_ni_ratio']['ratio'],
            'CCC': self.results['cash_flow_quality']['working_capital_metrics']['CCC'],
            'CapEx_Intensity': self.results['cash_flow_quality']['capex_intensity']['capex_intensity'],

            # 资本效率
            'ROIC': self.results['capital_efficiency']['roic']['roic'],
            'ROIC_Rating': self.results['capital_efficiency']['roic']['rating'],
            'ROE': self.results['capital_efficiency']['roe_dupont']['roe'],
            'Asset_Turnover': self.results['capital_efficiency']['asset_turnover']['asset_turnover'],

            # 资产负债表
            'D/E': self.results['balance_sheet_health']['leverage_metrics']['debt_to_equity'],
            'Net_Debt/EBITDA': self.results['balance_sheet_health']['leverage_metrics']['net_debt_to_ebitda'],
            'Interest_Coverage': self.results['balance_sheet_health']['interest_coverage']['interest_coverage'],
            'Current_Ratio': self.results['balance_sheet_health']['liquidity_ratios']['current_ratio'],
            'Quick_Ratio': self.results['balance_sheet_health']['liquidity_ratios']['quick_ratio'],

            'Data_Date': self.company.data_date
        }

        return pd.DataFrame([flat_data])


# 示例使用
if __name__ == "__main__":
    # 示例：特斯拉财务数据 (2023年数据)
    tesla_data = CompanyFinancials(
        ticker='TSLA',
        company_name='Tesla Inc',
        sector='Consumer Cyclical',
        industry='Auto Manufacturers',

        # 损益表 (单位: 百万美元)
        revenue=96773,
        net_income=14974,
        ebit=10831,
        gross_profit=17660,
        cost_of_revenue=79113,
        interest_expense=156,

        # 现金流量表
        operating_cash_flow=13256,
        capex=8903,
        free_cash_flow=4353,

        # 资产负债表
        total_assets=106618,
        total_equity=62634,
        total_debt=9572,
        current_assets=48704,
        current_liabilities=28748,
        cash=16398,
        accounts_receivable=3508,
        inventory=13626,
        accounts_payable=14431,
        short_term_debt=1804,

        tax_rate=0.15,
        shares_outstanding=3178,
        data_date='2023-12-31',
        data_source='10-K'
    )

    # 计算质量指标
    calculator = QualityMetricsCalculator(tesla_data)
    results = calculator.calculate_all_metrics()

    # 打印结果
    import json
    print(json.dumps(results, indent=2, ensure_ascii=False))

    # 导出DataFrame
    df = calculator.export_to_dataframe()
    print("\n" + "="*80)
    print(df.T)
