#!/usr/bin/env python3
"""
质量指标计算演示脚本
展示如何使用quality_calculator计算Top 20公司的质量指标
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

from quality_calculator import (
    CompanyFinancials,
    QualityMetricsCalculator,
    MoatScoring
)
import pandas as pd
import json


def get_sample_companies():
    """
    示例：Top 20公司财务数据
    实际应用时从FMP API或数据库获取
    """
    companies = []

    # 1. Tesla (制造业 - 汽车)
    companies.append(CompanyFinancials(
        ticker='TSLA',
        company_name='Tesla Inc',
        sector='Consumer Cyclical',
        industry='Auto Manufacturers',
        revenue=96773,
        net_income=14974,
        ebit=10831,
        gross_profit=17660,
        cost_of_revenue=79113,
        interest_expense=156,
        operating_cash_flow=13256,
        capex=8903,
        free_cash_flow=4353,
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
        data_source='10-K FY2023'
    ))

    # 2. Microsoft (科技 - SaaS)
    companies.append(CompanyFinancials(
        ticker='MSFT',
        company_name='Microsoft Corporation',
        sector='Technology',
        industry='Software - Infrastructure',
        revenue=211915,
        net_income=72361,
        ebit=88523,
        gross_profit=146052,
        cost_of_revenue=65863,
        interest_expense=1968,
        operating_cash_flow=87582,
        capex=28107,
        free_cash_flow=59475,
        total_assets=411976,
        total_equity=238268,
        total_debt=97714,
        current_assets=184257,
        current_liabilities=95082,
        cash=111262,
        accounts_receivable=48688,
        inventory=2500,
        accounts_payable=18095,
        short_term_debt=5247,
        tax_rate=0.15,
        shares_outstanding=7430,
        data_date='2023-06-30',
        data_source='10-K FY2023'
    ))

    # 3. Apple (科技 - 硬件)
    companies.append(CompanyFinancials(
        ticker='AAPL',
        company_name='Apple Inc',
        sector='Technology',
        industry='Consumer Electronics',
        revenue=383285,
        net_income=96995,
        ebit=114301,
        gross_profit=169148,
        cost_of_revenue=214137,
        interest_expense=3933,
        operating_cash_flow=110543,
        capex=10959,
        free_cash_flow=99584,
        total_assets=352755,
        total_equity=62146,
        total_debt=111088,
        current_assets=143566,
        current_liabilities=145308,
        cash=29965,
        accounts_receivable=29508,
        inventory=6331,
        accounts_payable=62611,
        short_term_debt=15799,
        tax_rate=0.15,
        shares_outstanding=15550,
        data_date='2023-09-30',
        data_source='10-K FY2023'
    ))

    # 4. Amazon (电商+云)
    companies.append(CompanyFinancials(
        ticker='AMZN',
        company_name='Amazon.com Inc',
        sector='Consumer Cyclical',
        industry='Internet Retail',
        revenue=574785,
        net_income=30425,
        ebit=36852,
        gross_profit=225872,
        cost_of_revenue=348913,
        interest_expense=3184,
        operating_cash_flow=84946,
        capex=48151,
        free_cash_flow=36795,
        total_assets=527854,
        total_equity=201876,
        total_debt=164107,
        current_assets=164710,
        current_liabilities=155393,
        cash=73387,
        accounts_receivable=42360,
        inventory=34252,
        accounts_payable=84981,
        short_term_debt=67651,
        tax_rate=0.11,
        shares_outstanding=10496,
        data_date='2023-12-31',
        data_source='10-K FY2023'
    ))

    # 5. Nvidia (半导体)
    companies.append(CompanyFinancials(
        ticker='NVDA',
        company_name='NVIDIA Corporation',
        sector='Technology',
        industry='Semiconductors',
        revenue=60922,
        net_income=29760,
        ebit=32972,
        gross_profit=45068,
        cost_of_revenue=15854,
        interest_expense=257,
        operating_cash_flow=28465,
        capex=1069,
        free_cash_flow=27396,
        total_assets=65728,
        total_equity=42985,
        total_debt=9719,
        current_assets=49604,
        current_liabilities=18302,
        cash=25984,
        accounts_receivable=9999,
        inventory=5282,
        accounts_payable=2699,
        short_term_debt=1250,
        tax_rate=0.11,
        shares_outstanding=24640,
        data_date='2024-01-28',
        data_source='10-K FY2024'
    ))

    # 6. Meta (社交平台)
    companies.append(CompanyFinancials(
        ticker='META',
        company_name='Meta Platforms Inc',
        sector='Communication Services',
        industry='Internet Content & Information',
        revenue=134902,
        net_income=39098,
        ebit=46753,
        gross_profit=104034,
        cost_of_revenue=30868,
        interest_expense=725,
        operating_cash_flow=71115,
        capex=27266,
        free_cash_flow=43849,
        total_assets=229624,
        total_equity=176259,
        total_debt=37234,
        current_assets=66138,
        current_liabilities=30791,
        cash=41862,
        accounts_receivable=13466,
        inventory=0,
        accounts_payable=7028,
        short_term_debt=0,
        tax_rate=0.16,
        shares_outstanding=2585,
        data_date='2023-12-31',
        data_source='10-K FY2023'
    ))

    return companies


def calculate_quality_metrics_batch(companies):
    """批量计算质量指标"""
    results = []

    for company_data in companies:
        print(f"正在计算 {company_data.ticker} - {company_data.company_name}...")

        calculator = QualityMetricsCalculator(company_data)
        metrics = calculator.calculate_all_metrics()

        results.append(metrics)

    return results


def export_to_csv(results, output_dir):
    """导出结果为CSV文件"""

    # 1. 现金流质量
    cash_flow_data = []
    for r in results:
        cfq = r['cash_flow_quality']
        cash_flow_data.append({
            'Ticker': r['ticker'],
            'Company': r['company_name'],
            'Sector': r['sector'],
            'OCF_to_NI': cfq['ocf_to_ni_ratio']['ratio'],
            'OCF_NI_Rating': cfq['ocf_to_ni_ratio']['rating'],
            'FCF_to_NI': cfq['fcf_to_ni_ratio']['ratio'],
            'FCF_NI_Rating': cfq['fcf_to_ni_ratio']['rating'],
            'DSO_Days': cfq['working_capital_metrics']['DSO'],
            'DIO_Days': cfq['working_capital_metrics']['DIO'],
            'DPO_Days': cfq['working_capital_metrics']['DPO'],
            'CCC_Days': cfq['working_capital_metrics']['CCC'],
            'CCC_Rating': cfq['working_capital_metrics']['CCC_rating'],
            'CapEx_Intensity': cfq['capex_intensity']['capex_intensity'],
            'Data_Date': r['data_date']
        })

    df_cf = pd.DataFrame(cash_flow_data)
    df_cf.to_csv(f"{output_dir}/cash_flow_quality.csv", index=False)
    print(f"✓ 已导出: cash_flow_quality.csv")

    # 2. 资本效率
    capital_eff_data = []
    for r in results:
        ce = r['capital_efficiency']
        capital_eff_data.append({
            'Ticker': r['ticker'],
            'Company': r['company_name'],
            'Sector': r['sector'],
            'ROIC_%': ce['roic']['roic'],
            'ROIC_Rating': ce['roic']['rating'],
            'NOPAT': ce['roic']['nopat'],
            'Invested_Capital': ce['roic']['invested_capital'],
            'ROE_%': ce['roe_dupont']['roe'],
            'Profit_Margin_%': ce['roe_dupont']['dupont_decomposition']['profit_margin'],
            'Asset_Turnover': ce['roe_dupont']['dupont_decomposition']['asset_turnover'],
            'Equity_Multiplier': ce['roe_dupont']['dupont_decomposition']['equity_multiplier'],
            'Asset_Turnover_Standalone': ce['asset_turnover']['asset_turnover'],
            'Asset_Turnover_Rating': ce['asset_turnover']['rating'],
            'Data_Date': r['data_date']
        })

    df_ce = pd.DataFrame(capital_eff_data)
    df_ce.to_csv(f"{output_dir}/capital_efficiency.csv", index=False)
    print(f"✓ 已导出: capital_efficiency.csv")

    # 3. 资产负债表稳健性
    balance_sheet_data = []
    for r in results:
        bs = r['balance_sheet_health']
        balance_sheet_data.append({
            'Ticker': r['ticker'],
            'Company': r['company_name'],
            'Sector': r['sector'],
            'Debt_to_Equity': bs['leverage_metrics']['debt_to_equity'],
            'DE_Rating': bs['leverage_metrics']['de_rating'],
            'Net_Debt_to_EBITDA': bs['leverage_metrics']['net_debt_to_ebitda'],
            'ND_EBITDA_Rating': bs['leverage_metrics']['nd_rating'],
            'Interest_Coverage': bs['interest_coverage']['interest_coverage'],
            'Interest_Cov_Rating': bs['interest_coverage']['rating'],
            'Current_Ratio': bs['liquidity_ratios']['current_ratio'],
            'Current_Ratio_Rating': bs['liquidity_ratios']['cr_rating'],
            'Quick_Ratio': bs['liquidity_ratios']['quick_ratio'],
            'Quick_Ratio_Rating': bs['liquidity_ratios']['qr_rating'],
            'Cash_to_STD': bs['liquidity_ratios']['cash_to_short_term_debt'],
            'Data_Date': r['data_date']
        })

    df_bs = pd.DataFrame(balance_sheet_data)
    df_bs.to_csv(f"{output_dir}/balance_sheet_health.csv", index=False)
    print(f"✓ 已导出: balance_sheet_health.csv")

    # 4. 综合仪表板
    dashboard_data = []
    for r in results:
        cfq = r['cash_flow_quality']
        ce = r['capital_efficiency']
        bs = r['balance_sheet_health']

        dashboard_data.append({
            'Ticker': r['ticker'],
            'Company': r['company_name'],
            'Sector': r['sector'],
            'Industry': r['industry'],

            # 核心质量指标
            'OCF/NI': cfq['ocf_to_ni_ratio']['ratio'],
            'FCF/NI': cfq['fcf_to_ni_ratio']['ratio'],
            'CCC_Days': cfq['working_capital_metrics']['CCC'],

            # 资本效率
            'ROIC_%': ce['roic']['roic'],
            'ROE_%': ce['roe_dupont']['roe'],

            # 稳健性
            'D/E': bs['leverage_metrics']['debt_to_equity'],
            'Net_Debt/EBITDA': bs['leverage_metrics']['net_debt_to_ebitda'],
            'Interest_Coverage': bs['interest_coverage']['interest_coverage'],

            # 评级汇总
            'OCF_Rating': cfq['ocf_to_ni_ratio']['rating'],
            'ROIC_Rating': ce['roic']['rating'],
            'Leverage_Rating': bs['leverage_metrics']['de_rating'],

            'Data_Date': r['data_date']
        })

    df_dashboard = pd.DataFrame(dashboard_data)
    df_dashboard.to_csv(f"{output_dir}/quality_dashboard.csv", index=False)
    print(f"✓ 已导出: quality_dashboard.csv")

    return df_cf, df_ce, df_bs, df_dashboard


def demonstrate_moat_scoring():
    """演示护城河评分"""
    print("\n" + "="*80)
    print("护城河评分演示")
    print("="*80 + "\n")

    moat = MoatScoring()

    # 示例：Apple的护城河评分
    print("示例: Apple Inc (AAPL)")
    print("-" * 40)

    # 定价权
    pricing_power = moat.score_pricing_power(
        gross_margin=44.1,  # Apple毛利率
        gross_margin_trend='stable',
        industry_median_margin=20.0,  # 消费电子行业中位数
        brand_premium_evidence=True
    )
    print(f"\n1. {pricing_power['category']}: {pricing_power['score']}/{pricing_power['max_score']}")
    for detail in pricing_power['details']:
        print(f"   - {detail}")

    # 转换成本
    switching_costs = moat.score_switching_costs(
        customer_retention_rate=92,  # Apple生态系统留存率高
        product_embedding='deep',  # 深度嵌入用户生活
        network_effects=True  # iMessage, AirDrop等网络效应
    )
    print(f"\n2. {switching_costs['category']}: {switching_costs['score']}/{switching_costs['max_score']}")
    for detail in switching_costs['details']:
        print(f"   - {detail}")

    # 成本优势
    cost_advantage = moat.score_cost_advantage(
        unit_cost_vs_industry=-15,  # 略低于行业
        scale_effects=True,  # 规模采购优势
        proprietary_tech=True  # A系列芯片
    )
    print(f"\n3. {cost_advantage['category']}: {cost_advantage['score']}/{cost_advantage['max_score']}")
    for detail in cost_advantage['details']:
        print(f"   - {detail}")

    # 综合评分
    total_moat = moat.calculate_total_moat_score(
        pricing_power,
        switching_costs,
        cost_advantage,
        network_effects_score=8,  # App Store生态
        regulatory_barriers_score=0
    )

    print("\n" + "="*40)
    print(f"综合护城河评分: {total_moat['total_score']}/100")
    print(f"评级: {total_moat['moat_rating']}")
    print(f"评价: {total_moat['interpretation']}")
    print("\n分项得分:")
    for component, score in total_moat['component_scores'].items():
        print(f"  - {component}: {score}")


def main():
    """主执行函数"""
    print("="*80)
    print("质量指标计算引擎 - 演示程序")
    print("="*80 + "\n")

    # 输出目录
    output_dir = "/Users/milton/投资大师/Top20_Screener/quality"

    # 1. 获取示例公司数据
    print("步骤1: 加载示例公司数据...")
    companies = get_sample_companies()
    print(f"✓ 已加载 {len(companies)} 家公司\n")

    # 2. 批量计算质量指标
    print("步骤2: 批量计算质量指标...")
    results = calculate_quality_metrics_batch(companies)
    print(f"✓ 计算完成\n")

    # 3. 导出CSV
    print("步骤3: 导出结果为CSV文件...")
    df_cf, df_ce, df_bs, df_dashboard = export_to_csv(results, output_dir)
    print()

    # 4. 导出完整JSON（供详细分析用）
    json_output = f"{output_dir}/quality_metrics_full.json"
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"✓ 已导出: quality_metrics_full.json\n")

    # 5. 打印汇总统计
    print("="*80)
    print("汇总统计")
    print("="*80 + "\n")

    print("现金流质量:")
    print(df_cf[['Ticker', 'Company', 'OCF_to_NI', 'OCF_NI_Rating', 'CCC_Days']].to_string(index=False))

    print("\n\n资本效率:")
    print(df_ce[['Ticker', 'Company', 'ROIC_%', 'ROIC_Rating', 'ROE_%']].to_string(index=False))

    print("\n\n资产负债表稳健性:")
    print(df_bs[['Ticker', 'Company', 'Debt_to_Equity', 'DE_Rating', 'Interest_Coverage']].to_string(index=False))

    # 6. 护城河评分演示
    demonstrate_moat_scoring()

    print("\n" + "="*80)
    print("所有输出文件已保存至:")
    print(f"  {output_dir}")
    print("\n生成的文件:")
    print("  - cash_flow_quality.csv")
    print("  - capital_efficiency.csv")
    print("  - balance_sheet_health.csv")
    print("  - quality_dashboard.csv")
    print("  - quality_metrics_full.json")
    print("  - calculation_methodology.md")
    print("  - quality_calculator.py")
    print("="*80)


if __name__ == "__main__":
    main()
