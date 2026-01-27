#!/usr/bin/env python3
"""
批量质量评分器 - 处理多个公司并生成排名

用法:
    python batch_scorer.py --tickers AAPL,GOOGL,MSFT,AMZN,META
    python batch_scorer.py --file tickers.txt
    python batch_scorer.py --use-sp500-top50
"""

import argparse
import sys
import os
from typing import List, Dict
import pandas as pd

# 添加当前目录到路径
sys.path.insert(0, os.path.dirname(__file__))

from fundamental_quality_scorer import FundamentalQualityScorer, QualityScore
from data_integration import FinancialDataIntegrator, create_sample_moat_data


# 预设的高质量公司数据库 (示例)
SAMPLE_COMPANIES = {
    'AAPL': {
        'ticker': 'AAPL',
        'company_name': 'Apple Inc.',
        'sector': 'Technology',
        'operating_cash_flow': 118.3e9,
        'net_income': 99.8e9,
        'free_cash_flow': 105.9e9,
        'days_sales_outstanding': 38,
        'dso_trend': 'stable',
        'days_inventory_outstanding': 8,
        'dio_trend': 'stable',
        'cash_conversion_cycle': -45,  # 负的CCC非常优秀
        'eps_5y_std_dev': 0.08,
        'consecutive_profit_years': 20,
        'roic': 0.52,
        'wacc': 0.09,
        'roic_5y_trend': 'stable',
        'roe': 1.47,
        'net_margin': 0.25,
        'equity_multiplier': 6.2,  # 高杠杆但有充分理由
        'roe_5y_trend': 'increasing',
        'asset_turnover': 1.08,
        'industry_median_asset_turnover': 0.55,
        'net_debt': -60e9,  # 净现金
        'ebitda': 135e9,
        'ebit': 125e9,
        'interest_expense': 1e9,
        'current_ratio': 0.96,
        'quick_ratio': 0.88,
        'revenue_cagr_5y': 0.08,
        'profit_cagr_5y': 0.12,
        'revenue_growth': 0.06,
        'market_position': 1,
        'market_share_trend': 'stable',
        'tam_growth_rate': 0.05
    },
    'GOOGL': {
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
    },
    'MSFT': {
        'ticker': 'MSFT',
        'company_name': 'Microsoft Corporation',
        'sector': 'Technology',
        'operating_cash_flow': 125.2e9,
        'net_income': 98.5e9,
        'free_cash_flow': 85.7e9,
        'days_sales_outstanding': 42,
        'dso_trend': 'stable',
        'days_inventory_outstanding': 0,
        'dio_trend': 'stable',
        'cash_conversion_cycle': 35,
        'eps_5y_std_dev': 0.10,
        'consecutive_profit_years': 20,
        'roic': 0.31,
        'wacc': 0.09,
        'roic_5y_trend': 'increasing',
        'roe': 0.42,
        'net_margin': 0.36,
        'equity_multiplier': 2.1,
        'roe_5y_trend': 'increasing',
        'asset_turnover': 0.58,
        'industry_median_asset_turnover': 0.55,
        'net_debt': -20e9,
        'ebitda': 145e9,
        'ebit': 135e9,
        'interest_expense': 2e9,
        'current_ratio': 1.85,
        'quick_ratio': 1.75,
        'revenue_cagr_5y': 0.13,
        'profit_cagr_5y': 0.15,
        'revenue_growth': 0.14,
        'market_position': 1,
        'market_share_trend': 'increasing',
        'tam_growth_rate': 0.12
    },
    'JNJ': {
        'ticker': 'JNJ',
        'company_name': 'Johnson & Johnson',
        'sector': 'Healthcare',
        'operating_cash_flow': 28.5e9,
        'net_income': 20.3e9,
        'free_cash_flow': 22.1e9,
        'days_sales_outstanding': 48,
        'dso_trend': 'stable',
        'days_inventory_outstanding': 55,
        'dio_trend': 'stable',
        'cash_conversion_cycle': 70,
        'eps_5y_std_dev': 0.18,
        'consecutive_profit_years': 30,
        'roic': 0.15,
        'wacc': 0.08,
        'roic_5y_trend': 'stable',
        'roe': 0.22,
        'net_margin': 0.16,
        'equity_multiplier': 1.8,
        'roe_5y_trend': 'stable',
        'asset_turnover': 0.48,
        'industry_median_asset_turnover': 0.45,
        'net_debt': 15e9,
        'ebitda': 35e9,
        'ebit': 30e9,
        'interest_expense': 1.5e9,
        'current_ratio': 1.25,
        'quick_ratio': 0.95,
        'revenue_cagr_5y': 0.04,
        'profit_cagr_5y': 0.03,
        'revenue_growth': 0.035,
        'market_position': 1,
        'market_share_trend': 'stable',
        'tam_growth_rate': 0.04
    },
    'WMT': {
        'ticker': 'WMT',
        'company_name': 'Walmart Inc.',
        'sector': 'Consumer',
        'operating_cash_flow': 32.5e9,
        'net_income': 18.2e9,
        'free_cash_flow': 20.8e9,
        'days_sales_outstanding': 5,  # 零售业特点
        'dso_trend': 'stable',
        'days_inventory_outstanding': 42,
        'dio_trend': 'decreasing',
        'cash_conversion_cycle': 8,
        'eps_5y_std_dev': 0.22,
        'consecutive_profit_years': 20,
        'roic': 0.12,
        'wacc': 0.07,
        'roic_5y_trend': 'stable',
        'roe': 0.18,
        'net_margin': 0.025,  # 零售业低利润率
        'equity_multiplier': 2.5,
        'roe_5y_trend': 'stable',
        'asset_turnover': 2.35,  # 零售业高周转
        'industry_median_asset_turnover': 2.0,
        'net_debt': 45e9,
        'ebitda': 42e9,
        'ebit': 35e9,
        'interest_expense': 2.8e9,
        'current_ratio': 0.85,
        'quick_ratio': 0.22,
        'revenue_cagr_5y': 0.05,
        'profit_cagr_5y': 0.04,
        'revenue_growth': 0.06,
        'market_position': 1,
        'market_share_trend': 'stable',
        'tam_growth_rate': 0.03
    }
}

# 预设护城河评分
SAMPLE_MOAT_SCORES = {
    'AAPL': {
        'moat_total_score': 85,
        'moat_rating': 'Wide Moat',
        'pricing_power': '极强品牌溢价',
        'switching_costs': 'iOS生态锁定',
        'network_effects': 'App Store双边网络',
        'cost_advantage': '垂直整合+规模',
        'intangible_assets': '全球#1品牌'
    },
    'GOOGL': {
        'moat_total_score': 66,
        'moat_rating': 'Narrow Moat',
        'pricing_power': '搜索定价强，AI威胁',
        'switching_costs': '云高搜索低',
        'network_effects': '9/10但衰减',
        'cost_advantage': '规模经济8/10',
        'intangible_assets': '数据资产'
    },
    'MSFT': {
        'moat_total_score': 80,
        'moat_rating': 'Wide Moat',
        'pricing_power': '企业级定价权强',
        'switching_costs': 'Office/Azure锁定',
        'network_effects': '开发者生态',
        'cost_advantage': '云规模经济',
        'intangible_assets': '企业品牌+专利'
    },
    'JNJ': {
        'moat_total_score': 72,
        'moat_rating': 'Wide Moat',
        'pricing_power': '医疗器械定价权',
        'switching_costs': '医生使用习惯',
        'network_effects': '有限',
        'cost_advantage': '研发规模',
        'intangible_assets': '专利+监管批准'
    },
    'WMT': {
        'moat_total_score': 58,
        'moat_rating': 'Narrow Moat',
        'pricing_power': '有限，价格竞争',
        'switching_costs': '低',
        'network_effects': '供应链网络',
        'cost_advantage': '规模+物流',
        'intangible_assets': '品牌认知'
    }
}


class BatchQualityScorer:
    """批量质量评分器"""

    def __init__(self):
        self.scorer = FundamentalQualityScorer()
        self.integrator = FinancialDataIntegrator()
        self.data_dir = '/Users/milton/投资大师/Top20_Screener/data'
        self.output_dir = '/Users/milton/投资大师/Top20_Screener/quality'
        os.makedirs(self.data_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)

    def score_single_company(self, ticker: str, use_api: bool = False) -> QualityScore:
        """
        评分单个公司

        Args:
            ticker: 股票代码
            use_api: 是否使用API获取数据

        Returns:
            QualityScore对象
        """
        print(f"\n{'='*60}")
        print(f"评分: {ticker}")
        print(f"{'='*60}")

        # 获取财务数据
        if use_api and self.integrator.fmp_api_key:
            print(f"从API获取 {ticker} 数据...")
            company_data = self.integrator.calculate_quality_metrics(ticker)
        elif ticker in SAMPLE_COMPANIES:
            print(f"使用预设数据: {ticker}")
            company_data = SAMPLE_COMPANIES[ticker]
        else:
            print(f"警告: {ticker} 无可用数据，跳过")
            return None

        # 获取护城河数据
        moat_file = os.path.join(self.data_dir, f'{ticker}_moat_analysis.json')
        if not os.path.exists(moat_file) and ticker in SAMPLE_MOAT_SCORES:
            create_sample_moat_data(ticker, self.data_dir)

        moat_data = self.integrator.load_moat_analysis(ticker)

        # 计算评分
        score = self.scorer.calculate_total_score(company_data, moat_data)

        print(f"✓ {score.company_name}: {score.total_score:.1f}/100 ({score.grade})")
        return score

    def batch_score(self, tickers: List[str], use_api: bool = False) -> List[QualityScore]:
        """
        批量评分

        Args:
            tickers: 股票代码列表
            use_api: 是否使用API

        Returns:
            QualityScore列表
        """
        scores = []
        for ticker in tickers:
            try:
                score = self.score_single_company(ticker.strip().upper(), use_api)
                if score:
                    scores.append(score)
            except Exception as e:
                print(f"处理 {ticker} 时出错: {e}")

        return scores

    def generate_ranking_report(self, scores: List[QualityScore]) -> str:
        """生成排名报告"""
        if not scores:
            return "无评分数据"

        # 按总分排序
        sorted_scores = sorted(scores, key=lambda x: x.total_score, reverse=True)

        report = []
        report.append("=" * 100)
        report.append("基本面质量排名报告")
        report.append("=" * 100)
        report.append(f"评估日期: {sorted_scores[0].evaluation_date}")
        report.append(f"公司数量: {len(scores)}")
        report.append("")

        # 汇总统计
        avg_score = sum(s.total_score for s in scores) / len(scores)
        grade_dist = {}
        for s in scores:
            grade_dist[s.grade] = grade_dist.get(s.grade, 0) + 1

        report.append("## 汇总统计")
        report.append(f"平均分: {avg_score:.1f}")
        report.append(f"评级分布: {grade_dist}")
        report.append("")

        # 排名表
        report.append("## 综合排名")
        report.append("")
        report.append(f"{'排名':<6} {'代码':<8} {'公司':<30} {'总分':<8} {'评级':<6} {'盈利':<6} {'资本':<6} {'护城河':<8} {'资产':<6} {'增长':<6}")
        report.append("-" * 100)

        for i, s in enumerate(sorted_scores, 1):
            report.append(
                f"{i:<6} {s.ticker:<8} {s.company_name:<30} {s.total_score:<8.1f} "
                f"{s.grade:<6} {s.profitability_quality:<6.1f} {s.capital_efficiency:<6.1f} "
                f"{s.moat_strength:<8.1f} {s.balance_sheet:<6.1f} {s.growth_sustainability:<6.1f}"
            )

        report.append("")

        # 分级池
        pools = self.scorer.generate_screening_pools(scores)
        report.append("## 质量候选池")
        report.append(f"\nA级池 (≥70分, 护城河≥50, 资产负债表≥15): {len(pools['A_grade_pool'])} 公司")
        if pools['A_grade_pool']:
            report.append(f"  {', '.join(pools['A_grade_pool'])}")

        report.append(f"\nB级池 (≥60分): {len(pools['B_grade_pool'])} 公司")
        if pools['B_grade_pool']:
            report.append(f"  {', '.join(pools['B_grade_pool'])}")

        report.append(f"\n排除池 (<50分): {len(pools['excluded_pool'])} 公司")
        if pools['excluded_pool']:
            report.append(f"  {', '.join(pools['excluded_pool'])}")

        report.append("")

        # 各维度最佳
        report.append("## 各维度最佳公司")
        dims = [
            ('盈利质量', 'profitability_quality'),
            ('资本效率', 'capital_efficiency'),
            ('护城河强度', 'moat_strength'),
            ('资产负债表', 'balance_sheet'),
            ('增长可持续性', 'growth_sustainability')
        ]

        for name, attr in dims:
            best = max(scores, key=lambda x: getattr(x, attr))
            report.append(f"\n{name}: {best.ticker} ({best.company_name}) - {getattr(best, attr):.1f}分")

        report.append("")
        report.append("=" * 100)

        return "\n".join(report)

    def export_results(self, scores: List[QualityScore]):
        """导出所有结果"""
        print(f"\n{'='*60}")
        print("导出结果...")
        print(f"{'='*60}")

        # 1. 标准CSV/JSON
        self.scorer.export_results(scores, self.output_dir)

        # 2. 排名报告
        report = self.generate_ranking_report(scores)
        report_path = os.path.join(self.output_dir, 'quality_ranking_report.txt')
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"✓ 排名报告: {report_path}")

        # 3. 打印到控制台
        print(f"\n{report}")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='批量基本面质量评分')
    parser.add_argument('--tickers', type=str, help='逗号分隔的股票代码')
    parser.add_argument('--file', type=str, help='包含股票代码的文件(每行一个)')
    parser.add_argument('--use-samples', action='store_true', help='使用预设示例数据')
    parser.add_argument('--use-api', action='store_true', help='使用FMP API获取数据')

    args = parser.parse_args()

    # 确定要评分的股票
    tickers = []
    if args.tickers:
        tickers = args.tickers.split(',')
    elif args.file:
        with open(args.file, 'r') as f:
            tickers = [line.strip() for line in f if line.strip()]
    elif args.use_samples:
        tickers = list(SAMPLE_COMPANIES.keys())
    else:
        # 默认使用示例
        print("未指定股票代码，使用默认示例")
        tickers = ['AAPL', 'GOOGL', 'MSFT', 'JNJ', 'WMT']

    print("=" * 80)
    print("批量基本面质量评分系统")
    print("=" * 80)
    print(f"待评分公司: {', '.join(tickers)}")
    print(f"使用API: {'是' if args.use_api else '否'}")

    # 执行评分
    batch_scorer = BatchQualityScorer()
    scores = batch_scorer.batch_score(tickers, args.use_api)

    if scores:
        batch_scorer.export_results(scores)
        print(f"\n✓ 成功评分 {len(scores)} 个公司")
    else:
        print("\n✗ 未能评分任何公司")
        sys.exit(1)


if __name__ == '__main__':
    main()
