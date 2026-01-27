"""
Strategy Selector - 智能期权策略选择器
根据市场条件、风险偏好和资金情况推荐最优策略
"""

import yfinance as yf
import numpy as np
from datetime import datetime


class StrategySelector:
    """
    智能期权策略选择器

    根据以下因素推荐策略:
    1. 市场观点(看涨/看跌/中性)
    2. 隐含波动率水平
    3. 风险承受能力
    4. 可用资金
    5. 时间框架
    """

    def __init__(self, ticker, capital=10000, risk_tolerance='moderate'):
        """
        初始化策略选择器

        Args:
            ticker: 股票代码
            capital: 可用资金
            risk_tolerance: 风险承受度('conservative'/'moderate'/'aggressive')
        """
        self.ticker = ticker.upper()
        self.capital = capital
        self.risk_tolerance = risk_tolerance
        self.current_price = self._get_current_price()
        self.iv_percentile = self._get_iv_percentile()

    def _get_current_price(self):
        """获取当前股价"""
        try:
            stock = yf.Ticker(self.ticker)
            return stock.history(period='1d')['Close'].iloc[-1]
        except:
            return 100.0  # 默认值

    def _get_iv_percentile(self):
        """
        估算IV百分位
        实际应用中应查询期权链获取真实IV数据
        """
        try:
            stock = yf.Ticker(self.ticker)
            hist = stock.history(period='252d')
            returns = np.log(hist['Close'] / hist['Close'].shift(1))

            # 计算滚动波动率
            rolling_vol = returns.rolling(21).std() * np.sqrt(252)
            current_vol = returns.tail(21).std() * np.sqrt(252)

            # 计算百分位
            percentile = (rolling_vol < current_vol).sum() / len(rolling_vol)
            return min(max(percentile, 0), 1)
        except:
            return 0.50  # 默认中等IV

    def _get_market_trend(self):
        """
        判断市场趋势
        Returns: 'bullish'/'bearish'/'sideways'
        """
        try:
            stock = yf.Ticker(self.ticker)
            hist = stock.history(period='60d')

            # 简单趋势判断: 20日均线 vs 50日均线
            sma_20 = hist['Close'].tail(20).mean()
            sma_50 = hist['Close'].tail(50).mean()
            current = hist['Close'].iloc[-1]

            if current > sma_20 > sma_50:
                return 'bullish'
            elif current < sma_20 < sma_50:
                return 'bearish'
            else:
                return 'sideways'
        except:
            return 'sideways'

    def select_best_strategy(self, market_view=None, time_horizon=30):
        """
        智能选择最优策略

        Args:
            market_view: 市场观点('bullish'/'bearish'/'neutral'/None=自动判断)
            time_horizon: 时间框架(天数)

        Returns:
            list: 推荐策略列表,按适配度排序
        """
        # 如果未指定市场观点,自动判断
        if market_view is None:
            trend = self._get_market_trend()
            if trend == 'bullish':
                market_view = 'bullish'
            elif trend == 'bearish':
                market_view = 'bearish'
            else:
                market_view = 'neutral'

        strategies = []

        # ========== 高IV策略(IV > 60%) ==========
        if self.iv_percentile > 0.60:
            # Iron Condor - 高IV中性策略
            if market_view == 'neutral':
                strategies.append({
                    'name': 'Iron Condor',
                    'description': '卖出看涨看跌价差,收取权利金',
                    'market_view': 'neutral',
                    'expected_return': 0.25,  # 25%年化
                    'win_rate': 0.70,
                    'capital_required': self.current_price * 10 * 100,  # $10价差
                    'max_risk': self.current_price * 10 * 100,
                    'time_horizon': '30-45天',
                    'complexity': 'medium',
                    'score': 90,
                    'best_for': '高IV环境,预期低波动'
                })

            # Short Put (现金担保) - 高IV看涨
            if market_view in ['bullish', 'neutral']:
                strategies.append({
                    'name': 'Cash-Secured Put',
                    'description': '卖出看跌期权,收权利金或低价买入股票',
                    'market_view': 'bullish/neutral',
                    'expected_return': 0.18,  # 18%年化
                    'win_rate': 0.65,
                    'capital_required': self.current_price * 100,
                    'max_risk': self.current_price * 100,
                    'time_horizon': '30-45天',
                    'complexity': 'low',
                    'score': 85,
                    'best_for': '想以折扣价买入股票'
                })

        # ========== 中度IV策略(30-60%) ==========
        elif 0.30 < self.iv_percentile <= 0.60:
            # Call Debit Spread - 中IV看涨
            if market_view == 'bullish':
                strategies.append({
                    'name': 'Call Debit Spread',
                    'description': '买入看涨价差,有限风险的看涨策略',
                    'market_view': 'bullish',
                    'expected_return': 0.80,  # 单次80%
                    'win_rate': 0.48,
                    'capital_required': self.current_price * 0.05 * 100,  # 约5%股价
                    'max_risk': self.current_price * 0.05 * 100,
                    'time_horizon': '45-60天',
                    'complexity': 'medium',
                    'score': 80,
                    'best_for': '明确看涨但想控制成本'
                })

            # Put Debit Spread - 中IV看跌
            if market_view == 'bearish':
                strategies.append({
                    'name': 'Put Debit Spread',
                    'description': '买入看跌价差,有限风险的看跌策略',
                    'market_view': 'bearish',
                    'expected_return': 0.75,
                    'win_rate': 0.45,
                    'capital_required': self.current_price * 0.05 * 100,
                    'max_risk': self.current_price * 0.05 * 100,
                    'time_horizon': '45-60天',
                    'complexity': 'medium',
                    'score': 78,
                    'best_for': '明确看跌但想控制风险'
                })

        # ========== 低IV策略(< 30%) ==========
        else:
            # Long Straddle - 低IV,预期大波动
            if market_view == 'volatile':
                strategies.append({
                    'name': 'Long Straddle',
                    'description': '买入同执行价看涨和看跌,赌波动率上升',
                    'market_view': 'volatile',
                    'expected_return': 1.20,  # 120%如果对
                    'win_rate': 0.35,
                    'capital_required': self.current_price * 0.08 * 100,
                    'max_risk': self.current_price * 0.08 * 100,
                    'time_horizon': '30-60天',
                    'complexity': 'high',
                    'score': 65,
                    'best_for': '财报前,重大事件前'
                })

        # ========== 风险调整 ==========
        # 根据风险承受度调整评分
        for strategy in strategies:
            if self.risk_tolerance == 'conservative':
                if strategy['complexity'] == 'low':
                    strategy['score'] += 10
                elif strategy['complexity'] == 'high':
                    strategy['score'] -= 15

            elif self.risk_tolerance == 'aggressive':
                if strategy['expected_return'] > 0.50:
                    strategy['score'] += 15
                if strategy['win_rate'] < 0.50:
                    strategy['score'] -= 5

        # ========== 资金过滤 ==========
        strategies = [s for s in strategies if s['capital_required'] <= self.capital]

        # ========== Kelly Criterion调整 ==========
        for s in strategies:
            # Kelly = (p * b - q) / b
            # p = 胜率, q = 1-p, b = 赔率(回报/风险)
            p = s['win_rate']
            q = 1 - p
            b = s['expected_return']
            kelly = (p * b - q) / b if b > 0 else 0
            s['kelly_fraction'] = max(0, min(kelly, 0.25))  # 限制在0-25%
            s['suggested_allocation'] = self.capital * s['kelly_fraction']

            # Kelly调整后的评分
            s['kelly_adjusted_score'] = s['score'] * (1 + s['kelly_fraction'])

        # 排序: 按Kelly调整后的评分
        strategies.sort(key=lambda x: x['kelly_adjusted_score'], reverse=True)

        return strategies[:5]  # 返回Top 5

    def generate_report(self, market_view=None, time_horizon=30):
        """
        生成完整的策略推荐报告

        Returns:
            dict: 包含市场分析和策略推荐
        """
        trend = self._get_market_trend()
        strategies = self.select_best_strategy(market_view, time_horizon)

        market_analysis = {
            'ticker': self.ticker,
            'current_price': round(self.current_price, 2),
            'iv_percentile': round(self.iv_percentile, 2),
            'iv_level': 'High' if self.iv_percentile > 0.6 else 'Medium' if self.iv_percentile > 0.3 else 'Low',
            'trend': trend,
            'market_view': market_view or trend,
            'capital': self.capital,
            'risk_tolerance': self.risk_tolerance
        }

        # 市场环境建议
        environment_advice = self._get_environment_advice()

        return {
            'market_analysis': market_analysis,
            'environment_advice': environment_advice,
            'recommended_strategies': strategies,
            'summary': self._generate_summary(strategies)
        }

    def _get_environment_advice(self):
        """根据当前市场环境给出建议"""
        advice = []

        if self.iv_percentile > 0.70:
            advice.append("⚠️ IV极高(>70%分位) - 优先考虑卖出期权策略")
            advice.append("✓ 推荐: Iron Condor, Cash-Secured Put, Covered Call")
            advice.append("✗ 避免: 买入期权(权利金过高)")
        elif self.iv_percentile < 0.30:
            advice.append("✓ IV较低(<30%分位) - 适合买入期权")
            advice.append("✓ 推荐: Long Calls, Long Straddle(如预期波动)")
            advice.append("✗ 避免: 卖出期权(收益有限)")
        else:
            advice.append("ℹ️ IV中等 - 价差策略性价比最优")
            advice.append("✓ 推荐: Call/Put Debit Spreads")

        # 资金建议
        if self.capital < 5000:
            advice.append(f"⚠️ 资金较少(${self.capital:,}) - 优先价差策略,降低成本")
        elif self.capital > 50000:
            advice.append(f"✓ 资金充裕(${self.capital:,}) - 可分散多个策略")

        # 风险建议
        if self.risk_tolerance == 'conservative':
            advice.append("🛡️ 保守型 - 优先高胜率策略(Iron Condor, CSP)")
        elif self.risk_tolerance == 'aggressive':
            advice.append("⚡ 激进型 - 可尝试高回报策略(Debit Spreads, Straddles)")

        return advice

    def _generate_summary(self, strategies):
        """生成推荐总结"""
        if not strategies:
            return "❌ 当前市场条件下,没有符合您资金和风险偏好的策略"

        top = strategies[0]

        summary = f"""
        ✓ 最优策略: {top['name']}

        核心理由:
        • 市场观点: {top['market_view']}
        • 预期回报: {top['expected_return']:.0%}
        • 胜率: {top['win_rate']:.0%}
        • 所需资金: ${top['capital_required']:,.0f}
        • 最大风险: ${top['max_risk']:,.0f}
        • 建议仓位: ${top['suggested_allocation']:,.0f} ({top['kelly_fraction']:.1%}仓位)

        适合原因: {top['best_for']}
        """

        return summary.strip()


# 使用示例
if __name__ == "__main__":
    print("=" * 80)
    print("智能期权策略选择器")
    print("=" * 80)

    # 场景1: 保守型投资者,$20,000资金,看好TSLA
    print("\n【场景1: 保守型,$20K,看好TSLA】")
    selector1 = StrategySelector('TSLA', capital=20000, risk_tolerance='conservative')
    report1 = selector1.generate_report(market_view='bullish')

    print(f"\n市场分析:")
    ma = report1['market_analysis']
    print(f"  {ma['ticker']}: ${ma['current_price']:.2f}")
    print(f"  IV水平: {ma['iv_level']} ({ma['iv_percentile']:.0%}分位)")
    print(f"  趋势: {ma['trend']}")

    print(f"\n环境建议:")
    for adv in report1['environment_advice']:
        print(f"  {adv}")

    print(f"\n推荐策略:")
    for i, strat in enumerate(report1['recommended_strategies'], 1):
        print(f"\n  {i}. {strat['name']} (评分: {strat['score']})")
        print(f"     {strat['description']}")
        print(f"     预期回报: {strat['expected_return']:.0%} | 胜率: {strat['win_rate']:.0%}")
        print(f"     所需资金: ${strat['capital_required']:,.0f}")
        print(f"     建议仓位: ${strat['suggested_allocation']:,.0f} (Kelly: {strat['kelly_fraction']:.1%})")

    print(report1['summary'])

    # 场景2: 激进型投资者,$5,000资金,看空市场
    print("\n\n" + "=" * 80)
    print("【场景2: 激进型,$5K,看空市场】")
    selector2 = StrategySelector('SPY', capital=5000, risk_tolerance='aggressive')
    report2 = selector2.generate_report(market_view='bearish')

    print(f"\n市场分析:")
    ma2 = report2['market_analysis']
    print(f"  {ma2['ticker']}: ${ma2['current_price']:.2f}")
    print(f"  IV水平: {ma2['iv_level']} ({ma2['iv_percentile']:.0%}分位)")

    print(f"\n推荐策略:")
    for i, strat in enumerate(report2['recommended_strategies'][:3], 1):
        print(f"\n  {i}. {strat['name']}")
        print(f"     回报: {strat['expected_return']:.0%} | 胜率: {strat['win_rate']:.0%} | 资金: ${strat['capital_required']:,.0f}")

    # 场景3: 自动判断市场观点
    print("\n\n" + "=" * 80)
    print("【场景3: 自动判断,中性风险】")
    selector3 = StrategySelector('AAPL', capital=15000, risk_tolerance='moderate')
    report3 = selector3.generate_report()  # 不指定market_view

    ma3 = report3['market_analysis']
    print(f"\n自动判断: {ma3['ticker']}市场趋势为 '{ma3['trend']}'")
    print(f"基于此推荐以下策略:")

    for i, strat in enumerate(report3['recommended_strategies'][:3], 1):
        print(f"  {i}. {strat['name']} - {strat['best_for']}")
