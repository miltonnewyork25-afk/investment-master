"""
Cash-Secured Put (现金担保看跌期权)
适用场景: 看多股票、愿意以折扣价买入、赚取权利金收入
"""

import numpy as np
from scipy.stats import norm
from datetime import datetime, timedelta
import yfinance as yf


class CashSecuredPut:
    """
    Cash-Secured Put策略分析器

    策略逻辑:
    - 卖出ATM或OTM看跌期权
    - 预留100%现金作为担保(以防被行权)
    - 收取权利金作为收入

    两种结果:
    1. 期权到期时股价>执行价 → 权利金归零,收益=权利金
    2. 期权到期时股价<执行价 → 被行权,以执行价买入股票(实际成本=执行价-权利金)

    适合投资者:
    - 长期看好某只股票
    - 希望以低于当前价格买入
    - 愿意持有股票
    - 寻求稳定收入(轮动卖PUT)
    """

    def __init__(self, ticker, target_entry_price=None):
        """
        初始化CSP策略

        Args:
            ticker: 股票代码
            target_entry_price: 目标买入价(如果为None,使用当前价)
        """
        self.ticker = ticker.upper()
        self.current_price = self._get_current_price()
        self.target_entry = target_entry_price or self.current_price

    def _get_current_price(self):
        """获取当前股价"""
        try:
            stock = yf.Ticker(self.ticker)
            return stock.history(period='1d')['Close'].iloc[-1]
        except:
            raise ValueError(f"无法获取{self.ticker}的股价数据")

    def _get_historical_volatility(self):
        """计算历史波动率"""
        try:
            stock = yf.Ticker(self.ticker)
            hist = stock.history(period='60d')
            returns = np.log(hist['Close'] / hist['Close'].shift(1))
            return returns.std() * np.sqrt(252)
        except:
            return 0.30  # 默认30%

    def calculate_strategy(self, strike_price=None, expiry_days=30, premium_estimate=None):
        """
        计算CSP策略参数

        Args:
            strike_price: 执行价(默认为目标买入价)
            expiry_days: 到期天数(推荐30-45天)
            premium_estimate: 权利金估算(每份合约,如未提供则自动计算)

        Returns:
            dict: 策略详细参数
        """
        strike = strike_price or self.target_entry
        vol = self._get_historical_volatility()
        iv = vol * 1.2  # 假设IV高于历史波动率

        # 估算权利金(简化Black-Scholes)
        if premium_estimate is None:
            time_to_expiry = expiry_days / 365
            std_move = self.current_price * iv * np.sqrt(time_to_expiry)

            # Delta法估算: ATM期权约0.5 Delta,每个Delta价值约1%股价
            moneyness = (self.current_price - strike) / self.current_price
            delta = norm.cdf(moneyness / std_move * np.sqrt(time_to_expiry))
            premium = strike * delta * 0.02  # 简化公式
        else:
            premium = premium_estimate

        # 计算关键指标
        cash_required = strike * 100  # 每份合约需要的现金
        total_premium = premium * 100  # 每份合约收取的总权利金
        breakeven = strike - premium  # 实际买入成本
        discount_from_current = (self.current_price - strike) / self.current_price
        annual_return = (premium / strike) * (365 / expiry_days)

        # 计算被行权概率
        time_to_expiry = expiry_days / 365
        std_move = self.current_price * iv * np.sqrt(time_to_expiry)
        prob_assignment = norm.cdf((self.current_price - strike) / std_move)

        # 情景分析
        scenario_not_assigned = {
            'outcome': '期权到期作废',
            'result': f'收益${total_premium:.2f}',
            'return': premium / strike,
            'annual_return': annual_return,
            'probability': 1 - prob_assignment
        }

        scenario_assigned = {
            'outcome': '被行权,买入股票',
            'shares': 100,
            'cost_per_share': strike,
            'total_cost': cash_required,
            'effective_cost': breakeven,
            'discount_from_current': discount_from_current,
            'probability': prob_assignment
        }

        return {
            'setup': {
                'ticker': self.ticker,
                'current_price': round(self.current_price, 2),
                'strike_price': round(strike, 2),
                'expiry_days': expiry_days,
                'premium_per_contract': round(total_premium, 2),
                'num_contracts': 1  # 可调整
            },
            'capital': {
                'cash_required': round(cash_required, 2),
                'premium_received': round(total_premium, 2),
                'net_investment': round(cash_required - total_premium, 2)
            },
            'metrics': {
                'breakeven_price': round(breakeven, 2),
                'discount_from_current': round(discount_from_current, 3),
                'return_if_not_assigned': round(premium / strike, 4),
                'annual_return': round(annual_return, 3),
                'probability_of_assignment': round(prob_assignment, 3),
                'implied_volatility': round(iv, 3)
            },
            'scenarios': {
                'not_assigned': scenario_not_assigned,
                'assigned': scenario_assigned
            }
        }

    def analyze_strategy(self, strike_price=None, expiry_days=30):
        """
        完整分析CSP策略

        Returns:
            dict: 包含策略评估和建议
        """
        strategy = self.calculate_strategy(strike_price, expiry_days)

        # 评分系统
        score = 0
        recommendations = []
        warnings = []

        # 1. 折扣率评估
        discount = strategy['metrics']['discount_from_current']
        if discount > 0.05:
            score += 30
            recommendations.append(f"✓ 执行价比当前价低{discount:.1%},提供良好安全边际")
        elif discount > 0:
            score += 20
            recommendations.append(f"✓ 轻度折扣({discount:.1%})")
        else:
            warnings.append(f"⚠ 执行价高于当前价,无安全边际")

        # 2. 收益率评估
        annual_return = strategy['metrics']['annual_return']
        if annual_return > 0.15:
            score += 25
            recommendations.append(f"✓ 年化收益率优秀({annual_return:.1%})")
        elif annual_return > 0.10:
            score += 15
            recommendations.append(f"✓ 年化收益率良好({annual_return:.1%})")
        else:
            warnings.append(f"⚠ 年化收益率偏低({annual_return:.1%})")

        # 3. 被行权概率
        prob_assignment = strategy['metrics']['probability_of_assignment']
        if 0.25 < prob_assignment < 0.40:
            score += 25
            recommendations.append(f"✓ 被行权概率适中({prob_assignment:.1%}),平衡收益与风险")
        elif prob_assignment < 0.25:
            score += 15
            recommendations.append(f"✓ 被行权概率低({prob_assignment:.1%}),但权利金可能也低")
        else:
            warnings.append(f"⚠ 被行权概率高({prob_assignment:.1%}),需确保愿意持股")

        # 4. 到期时间
        if 30 <= expiry_days <= 45:
            score += 20
            recommendations.append(f"✓ 到期时间理想({expiry_days}天)")
        else:
            warnings.append(f"⚠ 到期时间非最优({expiry_days}天,推荐30-45天)")

        # 最终建议
        if score >= 75:
            verdict = "强烈推荐 - 优质CSP机会"
        elif score >= 50:
            verdict = "可以考虑 - 需评估是否愿意持股"
        else:
            verdict = "需谨慎 - 收益风险比不理想"

        return {
            'strategy': strategy,
            'analysis': {
                'score': score,
                'verdict': verdict,
                'recommendations': recommendations,
                'warnings': warnings
            },
            'execution_guide': self._generate_execution_guide(strategy),
            'suitability_check': self._check_suitability(strategy)
        }

    def _generate_execution_guide(self, strategy):
        """生成执行指南"""
        setup = strategy['setup']
        metrics = strategy['metrics']

        return {
            'entry': [
                f"1. 卖出(Sell to Open) {setup['num_contracts']}份 {self.ticker} ${setup['strike_price']}P",
                f"2. 到期日: {(datetime.now() + timedelta(days=setup['expiry_days'])).strftime('%Y-%m-%d')}",
                f"3. 收取权利金: ${setup['premium_per_contract']:.2f}",
                f"4. 预留现金: ${strategy['capital']['cash_required']:.2f}"
            ],
            'monitoring': [
                f"• 每日检查: 股价相对执行价${setup['strike_price']:.2f}的位置",
                f"• 盈利目标: 权利金衰减至50-70%时考虑平仓(Buy to Close)",
                f"• 滚动机会: 如接近到期且不想被行权,可滚动至下个月",
                f"• 被行权准备: 确保账户有${strategy['capital']['cash_required']:.2f}可用"
            ],
            'outcomes': [
                f"• 情景A(概率{strategy['metrics']['probability_of_assignment']:.0%}): 被行权",
                f"  → 买入100股@${setup['strike_price']:.2f}",
                f"  → 实际成本${metrics['breakeven_price']:.2f}(执行价-权利金)",
                f"  → 此时可持有或卖出Covered Call",
                f"",
                f"• 情景B(概率{1-strategy['metrics']['probability_of_assignment']:.0%}): 未被行权",
                f"  → 收益${setup['premium_per_contract']:.2f}",
                f"  → 回报率{metrics['return_if_not_assigned']:.2%}",
                f"  → 可继续卖下个月的PUT"
            ]
        }

    def _check_suitability(self, strategy):
        """适用性检查"""
        checks = []

        # 检查1: 是否有足够资金
        cash_needed = strategy['capital']['cash_required']
        checks.append({
            'criterion': '资金充足性',
            'required': f'账户需有${cash_needed:.0f}可用现金',
            'pass': True  # 假设用户自行检查
        })

        # 检查2: 是否愿意持有股票
        checks.append({
            'criterion': '持股意愿',
            'required': f'必须愿意以${strategy['setup']['strike_price']:.2f}持有{self.ticker}',
            'question': '如果明天股价暴跌20%,你愿意持有这只股票吗?'
        })

        # 检查3: 是否理解风险
        max_loss = strategy['capital']['cash_required']
        checks.append({
            'criterion': '风险理解',
            'required': f'理论最大损失=${max_loss:.0f}(股票归零)',
            'note': '虽然极端,但必须意识到这个风险'
        })

        # 检查4: 时间管理
        checks.append({
            'criterion': '时间管理',
            'required': f'能在未来{strategy["setup"]["expiry_days"]}天内监控持仓',
            'note': '尤其是临近到期时'
        })

        return checks

    def compare_multiple_strikes(self, strikes, expiry_days=30):
        """
        比较多个执行价的CSP策略

        Args:
            strikes: 执行价列表
            expiry_days: 到期天数

        Returns:
            list: 每个执行价的分析结果
        """
        results = []

        for strike in strikes:
            analysis = self.analyze_strategy(strike, expiry_days)
            results.append({
                'strike': strike,
                'score': analysis['analysis']['score'],
                'annual_return': analysis['strategy']['metrics']['annual_return'],
                'prob_assignment': analysis['strategy']['metrics']['probability_of_assignment'],
                'premium': analysis['strategy']['setup']['premium_per_contract'],
                'verdict': analysis['analysis']['verdict']
            })

        # 按评分排序
        results.sort(key=lambda x: x['score'], reverse=True)
        return results


# 使用示例
if __name__ == "__main__":
    # 示例: 想以折扣价买入TSLA
    csp = CashSecuredPut('TSLA', target_entry_price=400)

    # 分析单一执行价
    analysis = csp.analyze_strategy(strike_price=400, expiry_days=30)

    print("=" * 70)
    print(f"Cash-Secured Put策略分析 - {csp.ticker}")
    print("=" * 70)

    setup = analysis['strategy']['setup']
    print(f"\n当前股价: ${setup['current_price']:.2f}")
    print(f"目标买入: ${setup['strike_price']:.2f}")
    print(f"到期天数: {setup['expiry_days']}天")

    print("\n【资金需求】")
    capital = analysis['strategy']['capital']
    print(f"  现金担保: ${capital['cash_required']:,.2f}")
    print(f"  收取权利金: ${capital['premium_received']:.2f}")
    print(f"  净投资: ${capital['net_investment']:,.2f}")

    print("\n【关键指标】")
    metrics = analysis['strategy']['metrics']
    print(f"  盈亏平衡: ${metrics['breakeven_price']:.2f}")
    print(f"  当前折扣: {metrics['discount_from_current']:.2%}")
    print(f"  年化收益: {metrics['annual_return']:.1%}")
    print(f"  被行权概率: {metrics['probability_of_assignment']:.1%}")

    print("\n【策略评估】")
    print(f"  评分: {analysis['analysis']['score']}/100")
    print(f"  结论: {analysis['analysis']['verdict']}")

    if analysis['analysis']['recommendations']:
        print("\n  优势:")
        for rec in analysis['analysis']['recommendations']:
            print(f"    {rec}")

    if analysis['analysis']['warnings']:
        print("\n  风险:")
        for warn in analysis['analysis']['warnings']:
            print(f"    {warn}")

    print("\n【执行步骤】")
    for step in analysis['execution_guide']['entry']:
        print(f"  {step}")

    print("\n【可能结果】")
    for outcome in analysis['execution_guide']['outcomes']:
        print(f"  {outcome}")

    # 比较多个执行价
    print("\n\n" + "=" * 70)
    print("多执行价比较")
    print("=" * 70)

    strikes_to_compare = [380, 390, 400, 410, 420]
    comparison = csp.compare_multiple_strikes(strikes_to_compare)

    print(f"\n{'执行价':<10} {'评分':<8} {'年化收益':<12} {'行权概率':<12} {'权利金':<10} {'评级'}")
    print("-" * 70)
    for result in comparison:
        print(f"${result['strike']:<9.0f} {result['score']:<8} "
              f"{result['annual_return']:<11.1%} {result['prob_assignment']:<11.1%} "
              f"${result['premium']:<9.2f} {result['verdict']}")
