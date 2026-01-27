#!/usr/bin/env python3
"""
基本面质量评分系统 v1.0
Fundamental Quality Scoring System

整合财务数据、护城河分析，建立0-100分综合评分体系
"""

import pandas as pd
import numpy as np
import json
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


@dataclass
class QualityScore:
    """质量评分数据类"""
    ticker: str
    company_name: str

    # 总分
    total_score: float
    grade: str

    # 五大维度分数
    profitability_quality: float  # 盈利质量 (25分)
    capital_efficiency: float     # 资本效率 (20分)
    moat_strength: float          # 护城河强度 (25分)
    balance_sheet: float          # 资产负债表 (20分)
    growth_sustainability: float  # 增长可持续性 (10分)

    # 细分指标
    sub_scores: Dict

    # 证据链
    evidence: Dict

    # 行业分类
    sector: str
    industry_adjustment: str

    # 评估日期
    evaluation_date: str


class FundamentalQualityScorer:
    """基本面质量评分器"""

    def __init__(self):
        """初始化评分器"""
        # 行业分类与调整规则
        self.sector_adjustments = {
            'Technology': {
                'high_growth_threshold': 0.20,
                'rule_of_40': True,
                'use_revenue_growth_bonus': True
            },
            'Financials': {
                'use_roa_instead_roic': True,
                'leverage_tolerance_higher': True,
                'capital_ratio_required': True
            },
            'Real Estate': {
                'high_leverage_acceptable': True,
                'focus_dividend_sustainability': True,
                'use_ffo_metrics': True
            },
            'Utilities': {
                'high_leverage_acceptable': True,
                'stable_dividend_required': True
            },
            'Energy': {
                'use_cycle_adjusted_roic': True,
                'commodity_price_sensitivity': True
            },
            'Consumer': {
                'inventory_turnover_critical': True,
                'same_store_sales_required': True
            }
        }

    def score_profitability_quality(self, data: Dict) -> Tuple[float, Dict, Dict]:
        """
        评分维度1: 盈利质量 (25分)

        A. 现金流兑现能力 (12分)
        B. 营运资本质量 (8分)
        C. 盈利一致性 (5分)
        """
        score = 0
        sub_scores = {}
        evidence = {}

        # A. 现金流兑现能力 (12分)
        ocf = data.get('operating_cash_flow', 0)
        net_income = data.get('net_income', 0)
        fcf = data.get('free_cash_flow', 0)

        if net_income > 0:
            ocf_ni_ratio = ocf / net_income
            fcf_ni_ratio = fcf / net_income

            # 指标1: OCF/NI Ratio
            if ocf_ni_ratio >= 1.2:
                ocf_score = 12
            elif ocf_ni_ratio >= 1.0:
                ocf_score = 9
            elif ocf_ni_ratio >= 0.8:
                ocf_score = 5
            else:
                ocf_score = 0

            # 指标2: FCF/NI Ratio加分
            if fcf_ni_ratio >= 0.9:
                ocf_score = min(ocf_score + 3, 12)
            elif fcf_ni_ratio >= 0.7:
                ocf_score = min(ocf_score + 2, 12)

            score += ocf_score
            sub_scores['ocf_quality'] = ocf_score
            evidence['ocf_ni_ratio'] = f"{ocf_ni_ratio:.2f}"
            evidence['fcf_ni_ratio'] = f"{fcf_ni_ratio:.2f}"
        else:
            sub_scores['ocf_quality'] = 0
            evidence['ocf_ni_ratio'] = "N/A (negative NI)"

        # B. 营运资本质量 (8分)
        working_capital_score = 0

        # 应收账款质量 (3分)
        dso = data.get('days_sales_outstanding', None)
        dso_trend = data.get('dso_trend', 'stable')  # 'decreasing', 'stable', 'increasing'

        if dso is not None:
            if dso_trend == 'decreasing' or dso_trend == 'stable':
                working_capital_score += 3
                evidence['dso_quality'] = f"DSO={dso:.1f} days, trend={dso_trend}"
            elif dso_trend == 'increasing_moderate':
                working_capital_score += 1
                evidence['dso_quality'] = f"DSO={dso:.1f} days, increasing <10%"
            else:
                evidence['dso_quality'] = f"DSO={dso:.1f} days, increasing >10% - concern"

        # 存货质量 (3分)
        dio = data.get('days_inventory_outstanding', None)
        dio_trend = data.get('dio_trend', 'stable')
        revenue_growth = data.get('revenue_growth', 0)

        if dio is not None:
            if dio_trend == 'decreasing' or dio_trend == 'stable':
                working_capital_score += 3
                evidence['dio_quality'] = f"DIO={dio:.1f} days, trend={dio_trend}"
            elif dio_trend == 'increasing' and revenue_growth < 0.05:
                evidence['dio_quality'] = f"DIO={dio:.1f} days increasing + slow revenue - demand weakness"

        # 现金转换周期 (2分)
        ccc = data.get('cash_conversion_cycle', None)
        if ccc is not None:
            if ccc < 30:
                working_capital_score += 2
                evidence['ccc'] = f"{ccc:.1f} days - excellent"
            elif ccc < 60:
                working_capital_score += 1
                evidence['ccc'] = f"{ccc:.1f} days - good"
            else:
                evidence['ccc'] = f"{ccc:.1f} days - watch"

        score += working_capital_score
        sub_scores['working_capital'] = working_capital_score

        # C. 盈利一致性 (5分)
        consistency_score = 0

        # EPS波动性 (3分)
        eps_volatility = data.get('eps_5y_std_dev', None)
        if eps_volatility is not None:
            if eps_volatility < 0.15:
                consistency_score += 3
                evidence['eps_volatility'] = f"5Y std dev {eps_volatility:.1%} - very stable"
            elif eps_volatility < 0.25:
                consistency_score += 2
                evidence['eps_volatility'] = f"5Y std dev {eps_volatility:.1%} - stable"
            else:
                evidence['eps_volatility'] = f"5Y std dev {eps_volatility:.1%} - volatile"

        # 连续盈利记录 (2分)
        consecutive_profit_years = data.get('consecutive_profit_years', 0)
        if consecutive_profit_years >= 5:
            consistency_score += 2
            evidence['profit_track_record'] = f"{consecutive_profit_years} consecutive profitable years"
        else:
            evidence['profit_track_record'] = f"Only {consecutive_profit_years} consecutive years - concern"

        score += consistency_score
        sub_scores['profitability_consistency'] = consistency_score

        return score, sub_scores, evidence

    def score_capital_efficiency(self, data: Dict, sector: str) -> Tuple[float, Dict, Dict]:
        """
        评分维度2: 资本效率 (20分)

        A. ROIC (10分)
        B. ROE与杜邦分解 (7分)
        C. 资产周转率 (3分)
        """
        score = 0
        sub_scores = {}
        evidence = {}

        # 行业调整
        use_roa = self.sector_adjustments.get(sector, {}).get('use_roa_instead_roic', False)

        # A. ROIC评分 (10分)
        roic = data.get('roic', 0)
        wacc = data.get('wacc', 0.10)  # 默认10%
        roic_5y_trend = data.get('roic_5y_trend', 'stable')  # 'increasing', 'stable', 'decreasing'

        # 绝对水平 (6分)
        if roic >= 0.20:
            roic_abs_score = 6
        elif roic >= 0.15:
            roic_abs_score = 4
        elif roic >= 0.10:
            roic_abs_score = 2
        else:
            roic_abs_score = 0

        # vs WACC (4分)
        roic_spread = roic - wacc
        if roic_spread >= 0.10:
            roic_spread_score = 4
        elif roic_spread >= 0.05:
            roic_spread_score = 3
        elif roic_spread > 0:
            roic_spread_score = 2
        else:
            roic_spread_score = 0
            evidence['roic_warning'] = f"ROIC ({roic:.1%}) < WACC ({wacc:.1%}) - destroying value"

        # 趋势加分
        roic_total = roic_abs_score + roic_spread_score
        if roic_5y_trend == 'increasing':
            roic_total = min(roic_total + 2, 10)
        elif roic_5y_trend == 'stable':
            roic_total = min(roic_total + 1, 10)

        score += roic_total
        sub_scores['roic_score'] = roic_total
        evidence['roic'] = f"{roic:.1%} (WACC {wacc:.1%}, spread {roic_spread:.1%})"
        evidence['roic_trend'] = roic_5y_trend

        # B. ROE与杜邦分解 (7分)
        roe = data.get('roe', 0)
        net_margin = data.get('net_margin', 0)
        equity_multiplier = data.get('equity_multiplier', 1)
        roe_5y_trend = data.get('roe_5y_trend', 'stable')

        # ROE绝对水平 (4分)
        if roe >= 0.20:
            roe_abs_score = 4
        elif roe >= 0.15:
            roe_abs_score = 3
        elif roe >= 0.10:
            roe_abs_score = 2
        else:
            roe_abs_score = 0

        # 杜邦分解来源 (3分)
        # 高ROE主要来自利润率=优秀，来自杠杆=风险
        if net_margin > 0.15 and equity_multiplier < 3:
            roe_quality_score = 3
            evidence['roe_source'] = f"Quality ROE from margin ({net_margin:.1%}), leverage moderate ({equity_multiplier:.1f}x)"
        elif equity_multiplier > 3:
            roe_quality_score = 0
            evidence['roe_source'] = f"ROE boosted by high leverage ({equity_multiplier:.1f}x) - risk"
        else:
            roe_quality_score = 2
            evidence['roe_source'] = f"Moderate quality, margin {net_margin:.1%}"

        # 趋势 (2分)
        roe_trend_score = 0
        if roe_5y_trend in ['increasing', 'stable']:
            roe_trend_score = 2
            evidence['roe_trend'] = f"{roe_5y_trend} over 5 years"

        roe_total = min(roe_abs_score + roe_quality_score + roe_trend_score, 7)
        score += roe_total
        sub_scores['roe_score'] = roe_total
        evidence['roe'] = f"{roe:.1%}"

        # C. 资产周转率 (3分)
        asset_turnover = data.get('asset_turnover', 0)
        industry_median_turnover = data.get('industry_median_asset_turnover', 1.0)

        if industry_median_turnover > 0:
            turnover_vs_industry = asset_turnover / industry_median_turnover
            if turnover_vs_industry >= 1.2:
                turnover_score = 3
                evidence['asset_turnover'] = f"{asset_turnover:.2f} (industry +20%)"
            elif turnover_vs_industry >= 1.0:
                turnover_score = 2
                evidence['asset_turnover'] = f"{asset_turnover:.2f} (above industry)"
            else:
                turnover_score = 0
                evidence['asset_turnover'] = f"{asset_turnover:.2f} (below industry median {industry_median_turnover:.2f})"
        else:
            turnover_score = 1
            evidence['asset_turnover'] = f"{asset_turnover:.2f}"

        score += turnover_score
        sub_scores['asset_turnover_score'] = turnover_score

        return score, sub_scores, evidence

    def score_moat_strength(self, moat_data: Dict) -> Tuple[float, Dict, Dict]:
        """
        评分维度3: 护城河强度 (25分)

        直接使用Agent 3的Moat Score换算
        """
        moat_score = moat_data.get('moat_total_score', 0)  # 0-100
        moat_rating = moat_data.get('moat_rating', 'No Moat')

        # 换算为25分制
        if moat_rating == 'Wide Moat' or moat_score >= 70:
            converted_score = 25
        elif moat_rating == 'Narrow Moat' or moat_score >= 50:
            converted_score = 15
        else:
            converted_score = 5

        sub_scores = {
            'moat_total': converted_score,
            'original_moat_score': moat_score
        }

        evidence = {
            'moat_rating': moat_rating,
            'pricing_power': moat_data.get('pricing_power', 'Not assessed'),
            'switching_costs': moat_data.get('switching_costs', 'Not assessed'),
            'network_effects': moat_data.get('network_effects', 'Not assessed'),
            'cost_advantage': moat_data.get('cost_advantage', 'Not assessed'),
            'intangible_assets': moat_data.get('intangible_assets', 'Not assessed')
        }

        return converted_score, sub_scores, evidence

    def score_balance_sheet(self, data: Dict, sector: str) -> Tuple[float, Dict, Dict]:
        """
        评分维度4: 资产负债表稳健性 (20分)

        A. 杠杆水平 (10分)
        B. 利息覆盖 (5分)
        C. 流动性 (5分)
        """
        score = 0
        sub_scores = {}
        evidence = {}

        # 行业调整
        high_leverage_acceptable = self.sector_adjustments.get(sector, {}).get(
            'high_leverage_acceptable', False)

        # A. 杠杆水平 (10分)
        net_debt = data.get('net_debt', 0)
        ebitda = data.get('ebitda', 1)

        if net_debt < 0:  # 净现金
            leverage_score = 10
            evidence['leverage'] = f"Net cash ${abs(net_debt)/1e9:.1f}B - fortress balance sheet"
        else:
            net_debt_ebitda = net_debt / ebitda if ebitda > 0 else 999

            if sector in ['Real Estate', 'Utilities'] or high_leverage_acceptable:
                # 放宽标准
                if net_debt_ebitda < 2.0:
                    leverage_score = 10
                elif net_debt_ebitda < 4.0:
                    leverage_score = 7
                elif net_debt_ebitda < 6.0:
                    leverage_score = 4
                else:
                    leverage_score = 0
            else:
                # 标准评分
                if net_debt_ebitda < 1.0:
                    leverage_score = 10
                elif net_debt_ebitda < 2.0:
                    leverage_score = 7
                elif net_debt_ebitda < 3.0:
                    leverage_score = 4
                else:
                    leverage_score = 0

            evidence['leverage'] = f"Net Debt/EBITDA = {net_debt_ebitda:.2f}x"

        score += leverage_score
        sub_scores['leverage'] = leverage_score

        # B. 利息覆盖 (5分)
        ebit = data.get('ebit', 0)
        interest_expense = data.get('interest_expense', 1)

        if interest_expense > 0:
            interest_coverage = ebit / interest_expense

            if interest_coverage > 10:
                coverage_score = 5
                evidence['interest_coverage'] = f"{interest_coverage:.1f}x - no concern"
            elif interest_coverage >= 5:
                coverage_score = 3
                evidence['interest_coverage'] = f"{interest_coverage:.1f}x - healthy"
            elif interest_coverage >= 2:
                coverage_score = 1
                evidence['interest_coverage'] = f"{interest_coverage:.1f}x - adequate"
            else:
                coverage_score = 0
                evidence['interest_coverage'] = f"{interest_coverage:.1f}x - financial stress"
        else:
            coverage_score = 5  # 无债务
            evidence['interest_coverage'] = "No debt / minimal interest"

        score += coverage_score
        sub_scores['interest_coverage'] = coverage_score

        # C. 流动性 (5分)
        current_ratio = data.get('current_ratio', 0)
        quick_ratio = data.get('quick_ratio', 0)

        # Current Ratio (3分)
        if current_ratio > 2.0:
            liquidity_score = 3
            evidence['current_ratio'] = f"{current_ratio:.2f} - strong"
        elif current_ratio >= 1.5:
            liquidity_score = 2
            evidence['current_ratio'] = f"{current_ratio:.2f} - adequate"
        elif current_ratio >= 1.0:
            liquidity_score = 1
            evidence['current_ratio'] = f"{current_ratio:.2f} - watch"
        else:
            liquidity_score = 0
            evidence['current_ratio'] = f"{current_ratio:.2f} - concern"

        # Quick Ratio (2分)
        if quick_ratio > 1.5:
            liquidity_score += 2
            evidence['quick_ratio'] = f"{quick_ratio:.2f} - excellent"
        elif quick_ratio >= 1.0:
            liquidity_score += 1
            evidence['quick_ratio'] = f"{quick_ratio:.2f} - adequate"
        else:
            evidence['quick_ratio'] = f"{quick_ratio:.2f} - watch"

        score += liquidity_score
        sub_scores['liquidity'] = liquidity_score

        return score, sub_scores, evidence

    def score_growth_sustainability(self, data: Dict, sector: str) -> Tuple[float, Dict, Dict]:
        """
        评分维度5: 盈利增长可持续性 (10分)

        A. 增长质量 (6分)
        B. 增长可持续性 (4分)
        """
        score = 0
        sub_scores = {}
        evidence = {}

        # A. 增长质量 (6分)
        revenue_cagr_5y = data.get('revenue_cagr_5y', 0)
        profit_growth = data.get('profit_cagr_5y', 0)

        # 收入增长 (4分)
        if revenue_cagr_5y >= 0.15:
            growth_score = 4
            evidence['revenue_growth'] = f"5Y CAGR {revenue_cagr_5y:.1%} - excellent"
        elif revenue_cagr_5y >= 0.10:
            growth_score = 3
            evidence['revenue_growth'] = f"5Y CAGR {revenue_cagr_5y:.1%} - strong"
        elif revenue_cagr_5y >= 0.05:
            growth_score = 2
            evidence['revenue_growth'] = f"5Y CAGR {revenue_cagr_5y:.1%} - moderate"
        else:
            growth_score = 0
            evidence['revenue_growth'] = f"5Y CAGR {revenue_cagr_5y:.1%} - weak"

        # 利润增长 vs 收入增长 (2分)
        if profit_growth > revenue_cagr_5y:
            growth_score += 2
            evidence['operating_leverage'] = f"Profit growth ({profit_growth:.1%}) > Revenue - positive leverage"
        elif abs(profit_growth - revenue_cagr_5y) < 0.02:
            growth_score += 1
            evidence['operating_leverage'] = "Profit ≈ Revenue growth - stable margins"
        else:
            evidence['operating_leverage'] = "Profit < Revenue growth - margin compression"

        score += growth_score
        sub_scores['growth_quality'] = growth_score

        # B. 增长可持续性 (4分)
        market_position = data.get('market_position', 3)  # 1=leader, 2=top3, 3=follower
        market_share_trend = data.get('market_share_trend', 'stable')
        tam_growth = data.get('tam_growth_rate', 0.02)  # TAM增长率

        sustainability_score = 0

        # 市场地位 (2分)
        if market_position <= 2:
            sustainability_score += 2
            evidence['market_position'] = f"Industry leader/top 3"

        # 市场份额趋势 (2分)
        if market_share_trend == 'increasing':
            sustainability_score += 2
            evidence['market_share'] = "Gaining share"
        elif market_share_trend == 'stable':
            sustainability_score += 1
            evidence['market_share'] = "Maintaining share"

        # TAM增长 (2分)
        if tam_growth > 0.03:  # GDP+
            sustainability_score += 2
            evidence['tam'] = f"TAM growing {tam_growth:.1%} - structural tailwind"
        elif tam_growth > 0:
            sustainability_score += 1
            evidence['tam'] = f"TAM growing {tam_growth:.1%} - GDP-like"
        else:
            evidence['tam'] = "TAM saturated - headwind"

        sustainability_score = min(sustainability_score, 4)
        score += sustainability_score
        sub_scores['growth_sustainability'] = sustainability_score

        return score, sub_scores, evidence

    def calculate_total_score(self, company_data: Dict, moat_data: Dict) -> QualityScore:
        """
        计算总分并生成完整评分对象

        Args:
            company_data: 公司财务数据
            moat_data: 护城河分析数据

        Returns:
            QualityScore对象
        """
        ticker = company_data.get('ticker', 'N/A')
        company_name = company_data.get('company_name', 'Unknown')
        sector = company_data.get('sector', 'Technology')

        # 计算五大维度
        prof_score, prof_sub, prof_ev = self.score_profitability_quality(company_data)
        cap_score, cap_sub, cap_ev = self.score_capital_efficiency(company_data, sector)
        moat_score, moat_sub, moat_ev = self.score_moat_strength(moat_data)
        bs_score, bs_sub, bs_ev = self.score_balance_sheet(company_data, sector)
        growth_score, growth_sub, growth_ev = self.score_growth_sustainability(company_data, sector)

        # 总分
        total = prof_score + cap_score + moat_score + bs_score + growth_score

        # 评级
        if total >= 90:
            grade = 'A+'
        elif total >= 80:
            grade = 'A'
        elif total >= 70:
            grade = 'B+'
        elif total >= 60:
            grade = 'B'
        elif total >= 50:
            grade = 'C'
        else:
            grade = 'D'

        # 合并子分数和证据
        all_sub_scores = {
            **prof_sub,
            **cap_sub,
            **moat_sub,
            **bs_sub,
            **growth_sub
        }

        all_evidence = {
            'profitability': prof_ev,
            'capital_efficiency': cap_ev,
            'moat': moat_ev,
            'balance_sheet': bs_ev,
            'growth': growth_ev
        }

        # 行业调整说明
        adjustments = self.sector_adjustments.get(sector, {})
        adjustment_text = ', '.join([k for k, v in adjustments.items() if v]) if adjustments else 'None'

        return QualityScore(
            ticker=ticker,
            company_name=company_name,
            total_score=total,
            grade=grade,
            profitability_quality=prof_score,
            capital_efficiency=cap_score,
            moat_strength=moat_score,
            balance_sheet=bs_score,
            growth_sustainability=growth_score,
            sub_scores=all_sub_scores,
            evidence=all_evidence,
            sector=sector,
            industry_adjustment=adjustment_text,
            evaluation_date=datetime.now().strftime('%Y-%m-%d')
        )

    def generate_screening_pools(self, scores: List[QualityScore]) -> Dict[str, List[str]]:
        """
        生成质量候选池

        A级池: Score ≥70, 护城河≥50, 资产负债表≥15
        B级池: Score ≥60
        排除池: Score <50
        """
        a_pool = []
        b_pool = []
        excluded = []

        for score_obj in scores:
            if (score_obj.total_score >= 70 and
                score_obj.sub_scores.get('original_moat_score', 0) >= 50 and
                score_obj.balance_sheet >= 15):
                a_pool.append(score_obj.ticker)
            elif score_obj.total_score >= 60:
                b_pool.append(score_obj.ticker)
            elif score_obj.total_score < 50:
                excluded.append(score_obj.ticker)

        return {
            'A_grade_pool': a_pool,
            'B_grade_pool': b_pool,
            'excluded_pool': excluded
        }

    def export_results(self, scores: List[QualityScore], output_dir: str):
        """
        导出评分结果

        生成三个文件:
        1. fundamental_scores.csv - 汇总表
        2. score_breakdown.json - 详细拆解
        3. quality_methodology.md - 方法论文档
        """
        import os
        os.makedirs(output_dir, exist_ok=True)

        # 1. CSV汇总表
        summary_data = []
        for s in scores:
            summary_data.append({
                'Ticker': s.ticker,
                'Company': s.company_name,
                'Total_Score': s.total_score,
                'Grade': s.grade,
                'Profitability_Quality': s.profitability_quality,
                'Capital_Efficiency': s.capital_efficiency,
                'Moat_Strength': s.moat_strength,
                'Balance_Sheet': s.balance_sheet,
                'Growth_Sustainability': s.growth_sustainability,
                'Sector': s.sector,
                'Evaluation_Date': s.evaluation_date
            })

        df = pd.DataFrame(summary_data)
        df = df.sort_values('Total_Score', ascending=False)
        csv_path = os.path.join(output_dir, 'fundamental_scores.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8-sig')
        print(f"✓ CSV导出: {csv_path}")

        # 2. JSON详细拆解
        breakdown = {s.ticker: asdict(s) for s in scores}
        json_path = os.path.join(output_dir, 'score_breakdown.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(breakdown, f, indent=2, ensure_ascii=False)
        print(f"✓ JSON导出: {json_path}")

        # 3. 方法论文档
        methodology = self._generate_methodology_doc()
        md_path = os.path.join(output_dir, 'quality_methodology.md')
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(methodology)
        print(f"✓ 方法论文档: {md_path}")

        # 4. 候选池
        pools = self.generate_screening_pools(scores)
        print(f"\n质量候选池生成:")
        print(f"  A级池 (≥70分): {len(pools['A_grade_pool'])} 公司")
        print(f"  B级池 (≥60分): {len(pools['B_grade_pool'])} 公司")
        print(f"  排除池 (<50分): {len(pools['excluded_pool'])} 公司")

        return csv_path, json_path, md_path

    def _generate_methodology_doc(self) -> str:
        """生成方法论文档"""
        return """# 基本面质量评分方法论 v1.0

## 评分框架总览

**总分**: 0-100分
**评级**: A+ (90-100), A (80-89), B+ (70-79), B (60-69), C (50-59), D (<50)

---

## 五大评分维度

### 1. 盈利质量 (25分)

**A. 现金流兑现能力 (12分)**
- OCF/NI Ratio ≥1.2: 12分
- OCF/NI Ratio 1.0-1.2: 9分
- OCF/NI Ratio 0.8-1.0: 5分
- FCF/NI Ratio ≥0.9: 加3分

**B. 营运资本质量 (8分)**
- 应收账款质量 (DSO趋势): 3分
- 存货质量 (DIO趋势): 3分
- 现金转换周期 (CCC<30天): 2分

**C. 盈利一致性 (5分)**
- EPS波动性 (5年标准差<15%): 3分
- 连续盈利记录 (≥5年): 2分

### 2. 资本效率 (20分)

**A. ROIC (10分)**
- 绝对水平 (≥20%: 6分, ≥15%: 4分, ≥10%: 2分)
- vs WACC (ROIC>WACC+10%: 4分)
- 5年趋势 (上升: +2分)

**B. ROE与杜邦分解 (7分)**
- ROE绝对水平 (≥20%: 4分)
- 来源质量 (高利润率>高杠杆: 3分)
- 5年趋势 (稳定/上升: 2分)

**C. 资产周转率 (3分)**
- 高于行业+20%: 3分
- 高于行业: 2分

### 3. 护城河强度 (25分)

直接使用Agent 3的Moat Score换算:
- Wide Moat (≥70分): 25分
- Narrow Moat (50-69分): 15分
- No Moat (<50分): 5分

必须有具体证据支撑:
- 定价权 (毛利率数据)
- 转换成本 (客户留存率)
- 成本优势 (单位成本对比)
- 网络效应 (平台数据)
- 监管壁垒 (牌照/专利)

### 4. 资产负债表稳健性 (20分)

**A. 杠杆水平 (10分)**
- 净现金: 10分
- Net Debt/EBITDA <1.0: 10分
- Net Debt/EBITDA 1.0-2.0: 7分
- Net Debt/EBITDA 2.0-3.0: 4分

**B. 利息覆盖 (5分)**
- EBIT/Interest >10x: 5分
- 5-10x: 3分
- 2-5x: 1分

**C. 流动性 (5分)**
- Current Ratio >2.0: 3分
- Quick Ratio >1.5: 2分

### 5. 盈利增长可持续性 (10分)

**A. 增长质量 (6分)**
- 收入5年CAGR (≥15%: 4分, ≥10%: 3分, ≥5%: 2分)
- 利润增长>收入增长: 2分

**B. 增长可持续性 (4分)**
- 市场地位 (行业#1/#2): 2分
- 市场份额持续增长: 2分
- TAM仍在增长: 2分

---

## 行业调整规则

### Technology/SaaS
- 高增长容忍度 (收入增速>20%加分)
- Rule of 40: (增长率% + FCF Margin%) ≥ 40%

### Financials
- 使用ROA替代ROIC
- 杠杆标准调整 (Tier 1 Capital Ratio)

### Real Estate/REIT
- 高杠杆可接受
- 重点看股息可持续性
- 使用FFO metrics

### Utilities
- 高杠杆可接受
- 稳定股息要求

### Energy/Materials
- 周期性调整 (使用周期平均ROIC)
- 商品价格敏感性分析

### Consumer
- 存货周转率关键
- 同店销售增长要求

---

## 特殊情况处理

### 高增长亏损公司
允许净利润为负，但要求:
- 毛利率 >60% (单位经济学健康)
- 收入增速 >30%
- OCF已转正或接近
- 现金跑道 >3年

例: Snowflake, CrowdStrike早期

### 资产重组公司
- 使用调整后利润 (剔除一次性项目)
- 标注重组事件

### 并购频繁公司
- 检查有机增长 vs 并购驱动增长
- 有机增长 >总增长50%为佳

---

## 证据链要求

每个评分必须有证据支撑:
- 关键数据必须标注来源 (财报页码或API字段)
- 估算数据必须标注 [ESTIMATED]
- 验证数据标注 [VERIFIED]
- 模型数据标注 [MODELED]

示例格式:
```
盈利质量: 23/25
- OCF/NI = 1.15 [VERIFIED: 10-K 2025, p.45]
- DSO稳定在35天 [VERIFIED: 计算自10-K应收账款]
- 连续20年正EPS [VERIFIED: 历史财报]
```

---

## 筛选候选池

### A级池
条件: Score ≥70 AND 护城河≥50 AND 资产负债表≥15

### B级池
条件: Score ≥60

### 排除池
条件: Score <50 (质量不足)

---

**版本**: v1.0
**更新日期**: 2026-01-25
**评分器**: FundamentalQualityScorer
"""


def main():
    """主函数 - 示例用法"""
    print("=" * 80)
    print("基本面质量评分系统 v1.0")
    print("=" * 80)

    # 初始化评分器
    scorer = FundamentalQualityScorer()

    # 示例: Google (GOOGL) 数据
    # 注: 实际使用时应从Agent 3和财务API获取
    google_data = {
        'ticker': 'GOOGL',
        'company_name': 'Alphabet Inc.',
        'sector': 'Technology',

        # 现金流数据 (Q3 2025 TTM)
        'operating_cash_flow': 151.4e9,
        'net_income': 124.3e9,
        'free_cash_flow': 73.6e9,

        # 营运资本
        'days_sales_outstanding': 35,
        'dso_trend': 'stable',
        'days_inventory_outstanding': 0,  # 软件公司无存货
        'dio_trend': 'stable',
        'cash_conversion_cycle': 25,

        # 盈利一致性
        'eps_5y_std_dev': 0.12,
        'consecutive_profit_years': 10,

        # 资本效率
        'roic': 0.28,
        'wacc': 0.09,
        'roic_5y_trend': 'stable',
        'roe': 0.32,
        'net_margin': 0.31,
        'equity_multiplier': 1.4,
        'roe_5y_trend': 'stable',
        'asset_turnover': 0.65,
        'industry_median_asset_turnover': 0.55,

        # 资产负债表
        'net_debt': -64.8e9,  # 净现金
        'ebitda': 150e9,
        'ebit': 140e9,
        'interest_expense': 1e9,
        'current_ratio': 1.75,
        'quick_ratio': 1.65,

        # 增长
        'revenue_cagr_5y': 0.14,
        'profit_cagr_5y': 0.16,
        'revenue_growth': 0.157,
        'market_position': 1,
        'market_share_trend': 'decreasing',  # AI威胁
        'tam_growth_rate': 0.08
    }

    google_moat = {
        'moat_total_score': 66,  # 33/50 * 100
        'moat_rating': 'Narrow Moat',
        'pricing_power': '搜索定价能力强，但AI威胁',
        'switching_costs': '搜索低，云计算高',
        'network_effects': '9/10 - 极强但衰减中',
        'cost_advantage': '规模经济8/10',
        'intangible_assets': '品牌、专利、数据'
    }

    # 计算评分
    score = scorer.calculate_total_score(google_data, google_moat)

    # 打印结果
    print(f"\n公司: {score.company_name} ({score.ticker})")
    print(f"行业: {score.sector}")
    print(f"评估日期: {score.evaluation_date}")
    print(f"\n{'='*60}")
    print(f"总分: {score.total_score:.1f}/100")
    print(f"评级: {score.grade}")
    print(f"{'='*60}")
    print(f"\n五大维度分数:")
    print(f"  1. 盈利质量:        {score.profitability_quality:.1f}/25")
    print(f"  2. 资本效率:        {score.capital_efficiency:.1f}/20")
    print(f"  3. 护城河强度:      {score.moat_strength:.1f}/25")
    print(f"  4. 资产负债表:      {score.balance_sheet:.1f}/20")
    print(f"  5. 增长可持续性:    {score.growth_sustainability:.1f}/10")

    print(f"\n关键证据:")
    for dim, evs in score.evidence.items():
        print(f"\n  {dim.upper()}:")
        for k, v in evs.items():
            print(f"    - {k}: {v}")

    # 导出结果
    print(f"\n{'='*60}")
    print("导出结果...")
    output_dir = '/Users/milton/投资大师/Top20_Screener/quality'
    scorer.export_results([score], output_dir)

    print(f"\n{'='*60}")
    print("评分完成!")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    main()
