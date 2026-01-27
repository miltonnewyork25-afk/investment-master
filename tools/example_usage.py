"""
Investment Tools Library - 完整使用示例

演示如何整合期权策略 + 估值分析进行投资决策
"""

import sys
sys.path.append('.')

from options_strategies.iron_condor import IronCondor
from options_strategies.cash_secured_put import CashSecuredPut
from options_strategies.call_debit_spread import CallDebitSpread
from options_strategies.strategy_selector import StrategySelector
from valuation_models.dcf_calculator import DCFCalculator
from valuation_models.comparable_companies import ComparableCompanyAnalysis


def complete_investment_workflow(ticker, capital=20000, risk_tolerance='moderate'):
    """
    完整投资工作流程示例

    流程:
    1. 基本面分析(DCF估值)
    2. 相对估值(可比公司)
    3. 综合判断市场观点
    4. 智能选择期权策略
    5. 执行最优策略
    """

    print("=" * 80)
    print(f"完整投资分析 - {ticker}")
    print("=" * 80)

    # ========== 第一步: DCF估值 ==========
    print("\n【第一步: DCF绝对估值】")
    print("-" * 80)

    dcf = DCFCalculator(ticker)
    dcf_result = dcf.calculate_dcf(growth_rate=0.12, terminal_growth=0.025)

    intrinsic_value = dcf_result['valuation']['intrinsic_value_per_share']
    current_price = dcf_result['valuation']['current_price']
    dcf_upside = dcf_result['valuation']['upside_downside']

    print(f"DCF内在价值: ${intrinsic_value:.2f}")
    print(f"当前价格: ${current_price:.2f}")
    print(f"估值差异: {dcf_upside:+.1%}")
    print(f"DCF建议: {dcf_result['valuation']['recommendation']}")

    # ========== 第二步: 可比公司估值 ==========
    print("\n【第二步: 可比公司相对估值】")
    print("-" * 80)

    # 根据不同股票选择同行
    peer_groups = {
        'TSLA': ['F', 'GM', 'TM'],
        'AAPL': ['MSFT', 'GOOGL', 'META'],
        'NVDA': ['AMD', 'INTC', 'TSM'],
        'JPM': ['BAC', 'WFC', 'C'],
        'Default': []
    }

    peers = peer_groups.get(ticker.upper(), peer_groups['Default'])

    if peers:
        comp = ComparableCompanyAnalysis(ticker, peers)
        comp_analysis = comp.analyze()

        if 'average' in comp_analysis['valuations']:
            comp_price = comp_analysis['valuations']['average']['implied_price']
            comp_upside = comp_analysis['valuations']['average']['upside']

            print(f"可比公司隐含价格: ${comp_price:.2f}")
            print(f"相对同行差异: {comp_upside:+.1%}")
            print(f"相对估值: {comp_analysis['relative_valuation']['overall_assessment']}")
        else:
            print("可比公司数据不足")
            comp_upside = 0
    else:
        print(f"未配置{ticker}的可比公司")
        comp_upside = 0

    # ========== 第三步: 综合判断 ==========
    print("\n【第三步: 综合投资观点】")
    print("-" * 80)

    # 综合DCF和可比公司的结果
    avg_upside = (dcf_upside + comp_upside) / 2 if comp_upside != 0 else dcf_upside

    if avg_upside > 0.15:
        market_view = 'bullish'
        view_reason = f"被低估{avg_upside:.1%},看多"
    elif avg_upside < -0.15:
        market_view = 'bearish'
        view_reason = f"被高估{abs(avg_upside):.1%},看空"
    else:
        market_view = 'neutral'
        view_reason = f"合理估值({avg_upside:+.1%}),中性"

    print(f"DCF上涨空间: {dcf_upside:+.1%}")
    if comp_upside != 0:
        print(f"可比公司上涨空间: {comp_upside:+.1%}")
    print(f"综合判断: {view_reason}")
    print(f"市场观点: {market_view}")

    # ========== 第四步: 智能选择期权策略 ==========
    print("\n【第四步: 智能策略选择】")
    print("-" * 80)

    selector = StrategySelector(ticker, capital=capital, risk_tolerance=risk_tolerance)
    strategy_report = selector.generate_report(market_view=market_view)

    print(f"账户资金: ${capital:,}")
    print(f"风险偏好: {risk_tolerance}")
    print(f"IV水平: {strategy_report['market_analysis']['iv_level']} "
          f"({strategy_report['market_analysis']['iv_percentile']:.0%}分位)")

    print("\n环境建议:")
    for advice in strategy_report['environment_advice'][:3]:
        print(f"  {advice}")

    print("\n推荐策略(Top 3):")
    for i, strat in enumerate(strategy_report['recommended_strategies'][:3], 1):
        print(f"\n  {i}. {strat['name']} (评分: {strat['score']})")
        print(f"     {strat['description']}")
        print(f"     预期回报: {strat['expected_return']:.0%} | 胜率: {strat['win_rate']:.0%}")
        print(f"     所需资金: ${strat['capital_required']:,.0f}")
        print(f"     Kelly仓位: ${strat['suggested_allocation']:,.0f} ({strat['kelly_fraction']:.1%})")

    # ========== 第五步: 执行最优策略 ==========
    if strategy_report['recommended_strategies']:
        print("\n【第五步: 策略执行计划】")
        print("-" * 80)

        top_strategy = strategy_report['recommended_strategies'][0]
        print(f"\n最优策略: {top_strategy['name']}")
        print(f"选择理由: {top_strategy['best_for']}")

        # 根据策略类型生成详细执行计划
        if top_strategy['name'] == 'Iron Condor':
            ic = IronCondor(ticker, expiry_days=30)
            ic_analysis = ic.analyze_setup(width=10)

            print("\n执行步骤:")
            for step in ic_analysis['execution_plan']['entry']:
                print(f"  {step}")

            print("\n风险管理:")
            for rule in ic_analysis['execution_plan']['management'][:3]:
                print(f"  {rule}")

        elif top_strategy['name'] == 'Cash-Secured Put':
            # 目标买入价 = 当前价 * (1 + upside * 0.5)
            # 如果被低估,设置更高的执行价;如果被高估,设置更低的执行价
            target_multiplier = 1 + (avg_upside * 0.3)
            target_price = current_price * target_multiplier

            csp = CashSecuredPut(ticker, target_entry_price=target_price)
            csp_analysis = csp.analyze_strategy(expiry_days=30)

            print("\n执行步骤:")
            for step in csp_analysis['execution_guide']['entry']:
                print(f"  {step}")

            print("\n预期结果:")
            for outcome in csp_analysis['execution_guide']['outcomes'][:5]:
                print(f"  {outcome}")

        elif top_strategy['name'] == 'Call Debit Spread':
            # 目标价 = 当前价 * (1 + max(upside, 0.10))
            target_price = current_price * (1 + max(avg_upside, 0.10))

            spread = CallDebitSpread(ticker)
            spread_analysis = spread.analyze_spread(expiry_days=60, target_price=target_price)

            print("\n执行步骤:")
            for step in spread_analysis['execution_plan']['entry']:
                print(f"  {step}")

            print("\n收益预期:")
            print(f"  盈亏平衡: ${spread_analysis['spread']['payoff']['breakeven_price']:.2f}")
            print(f"  最大收益: ${spread_analysis['spread']['payoff']['max_profit']:.2f}")
            print(f"  回报风险比: {spread_analysis['spread']['payoff']['return_on_investment']:.1f}:1")

    # ========== 总结 ==========
    print("\n" + "=" * 80)
    print("分析总结")
    print("=" * 80)

    print(f"\n{ticker}投资建议:")
    print(f"  1. 基本面: {dcf_result['valuation']['recommendation']}")
    if comp_upside != 0:
        print(f"  2. 相对估值: {comp_analysis['relative_valuation']['overall_assessment']}")
    print(f"  3. 综合观点: {view_reason}")
    if strategy_report['recommended_strategies']:
        print(f"  4. 最优策略: {strategy_report['recommended_strategies'][0]['name']}")
        print(f"  5. 建议仓位: ${strategy_report['recommended_strategies'][0]['suggested_allocation']:,.0f}")

    return {
        'dcf': dcf_result,
        'comparable': comp_analysis if peers else None,
        'market_view': market_view,
        'strategy': strategy_report
    }


if __name__ == "__main__":
    # 示例1: 分析特斯拉
    print("\n\n")
    print("🚗 " * 20)
    result_tsla = complete_investment_workflow(
        ticker='TSLA',
        capital=50000,
        risk_tolerance='aggressive'
    )

    # 示例2: 分析苹果
    print("\n\n")
    print("🍎 " * 20)
    result_aapl = complete_investment_workflow(
        ticker='AAPL',
        capital=20000,
        risk_tolerance='moderate'
    )

    # 示例3: 分析英伟达
    print("\n\n")
    print("💻 " * 20)
    result_nvda = complete_investment_workflow(
        ticker='NVDA',
        capital=30000,
        risk_tolerance='moderate'
    )
