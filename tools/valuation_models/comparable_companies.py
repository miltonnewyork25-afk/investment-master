"""
可比公司分析 (Comparable Company Analysis)
适用场景: 相对估值、快速筛选、市场定价参考
"""

import yfinance as yf
import pandas as pd
import numpy as np


class ComparableCompanyAnalysis:
    """
    可比公司估值分析器

    方法论:
    1. 选择同行业可比公司
    2. 计算估值倍数(P/E, EV/EBITDA, P/S等)
    3. 对比目标公司与同行
    4. 基于同行平均/中位数估值目标公司
    """

    def __init__(self, target_ticker, peer_tickers):
        """
        初始化可比公司分析

        Args:
            target_ticker: 目标公司代码
            peer_tickers: 可比公司代码列表
        """
        self.target_ticker = target_ticker.upper()
        self.peer_tickers = [t.upper() for t in peer_tickers]
        self.target_data = self._get_company_data(target_ticker)
        self.peer_data = {ticker: self._get_company_data(ticker) for ticker in peer_tickers}

    def _get_company_data(self, ticker):
        """获取公司财务数据"""
        try:
            stock = yf.Ticker(ticker)
            info = stock.info

            data = {
                'ticker': ticker,
                'name': info.get('longName', ticker),
                'price': info.get('currentPrice', 0),
                'market_cap': info.get('marketCap', 0),
                'enterprise_value': info.get('enterpriseValue', 0),
                'revenue': info.get('totalRevenue', 0),
                'ebitda': info.get('ebitda', 0),
                'earnings': info.get('netIncomeToCommon', 0),
                'book_value': info.get('bookValue', 0) * info.get('sharesOutstanding', 0),
                'fcf': info.get('freeCashflow', 0),
                'revenue_growth': info.get('revenueGrowth', 0),
                'earnings_growth': info.get('earningsGrowth', 0),
                'profit_margin': info.get('profitMargins', 0),
                'roe': info.get('returnOnEquity', 0),
                'debt_to_equity': info.get('debtToEquity', 0)
            }

            # 计算估值倍数
            data['pe'] = info.get('trailingPE', 0)
            data['forward_pe'] = info.get('forwardPE', 0)
            data['peg'] = info.get('pegRatio', 0)
            data['ps'] = data['market_cap'] / data['revenue'] if data['revenue'] > 0 else 0
            data['pb'] = data['market_cap'] / data['book_value'] if data['book_value'] > 0 else 0
            data['ev_ebitda'] = data['enterprise_value'] / data['ebitda'] if data['ebitda'] > 0 else 0
            data['ev_sales'] = data['enterprise_value'] / data['revenue'] if data['revenue'] > 0 else 0
            data['price_fcf'] = data['market_cap'] / data['fcf'] if data['fcf'] > 0 else 0

            return data

        except Exception as e:
            print(f"警告: 无法获取{ticker}的数据 - {e}")
            return None

    def calculate_peer_statistics(self):
        """计算同行统计数据"""
        metrics = ['pe', 'forward_pe', 'peg', 'ps', 'pb', 'ev_ebitda', 'ev_sales', 'price_fcf',
                   'revenue_growth', 'profit_margin', 'roe', 'debt_to_equity']

        stats = {}
        for metric in metrics:
            values = [peer[metric] for peer in self.peer_data.values()
                      if peer and peer[metric] > 0]

            if values:
                stats[metric] = {
                    'mean': np.mean(values),
                    'median': np.median(values),
                    'min': np.min(values),
                    'max': np.max(values),
                    'std': np.std(values)
                }
            else:
                stats[metric] = {
                    'mean': 0, 'median': 0, 'min': 0, 'max': 0, 'std': 0
                }

        return stats

    def value_target_company(self):
        """
        基于可比公司估值目标公司

        Returns:
            dict: 各种方法的估值结果
        """
        peer_stats = self.calculate_peer_statistics()
        target = self.target_data

        valuations = {}

        # 1. P/E估值
        if target['earnings'] > 0:
            peer_pe = peer_stats['pe']['median']
            implied_value_pe = target['earnings'] * peer_pe
            implied_price_pe = implied_value_pe / (target['market_cap'] / target['price'])
            valuations['pe'] = {
                'peer_multiple': peer_pe,
                'target_metric': target['pe'],
                'implied_price': implied_price_pe,
                'upside': (implied_price_pe - target['price']) / target['price']
            }

        # 2. EV/EBITDA估值
        if target['ebitda'] > 0:
            peer_ev_ebitda = peer_stats['ev_ebitda']['median']
            implied_ev = target['ebitda'] * peer_ev_ebitda
            net_debt = target['enterprise_value'] - target['market_cap']
            implied_market_cap = implied_ev - net_debt
            implied_price_ev = implied_market_cap / (target['market_cap'] / target['price'])
            valuations['ev_ebitda'] = {
                'peer_multiple': peer_ev_ebitda,
                'target_metric': target['ev_ebitda'],
                'implied_price': implied_price_ev,
                'upside': (implied_price_ev - target['price']) / target['price']
            }

        # 3. P/S估值
        if target['revenue'] > 0:
            peer_ps = peer_stats['ps']['median']
            implied_value_ps = target['revenue'] * peer_ps
            implied_price_ps = implied_value_ps / (target['market_cap'] / target['price'])
            valuations['ps'] = {
                'peer_multiple': peer_ps,
                'target_metric': target['ps'],
                'implied_price': implied_price_ps,
                'upside': (implied_price_ps - target['price']) / target['price']
            }

        # 4. P/B估值
        if target['book_value'] > 0:
            peer_pb = peer_stats['pb']['median']
            implied_value_pb = target['book_value'] * peer_pb
            implied_price_pb = implied_value_pb / (target['market_cap'] / target['price'])
            valuations['pb'] = {
                'peer_multiple': peer_pb,
                'target_metric': target['pb'],
                'implied_price': implied_price_pb,
                'upside': (implied_price_pb - target['price']) / target['price']
            }

        # 5. 综合估值(平均)
        if valuations:
            avg_price = np.mean([v['implied_price'] for v in valuations.values()])
            avg_upside = (avg_price - target['price']) / target['price']
            valuations['average'] = {
                'implied_price': avg_price,
                'upside': avg_upside
            }

        return valuations

    def generate_comp_table(self):
        """生成可比公司对比表"""
        companies = [self.target_data] + [p for p in self.peer_data.values() if p]

        table_data = []
        for comp in companies:
            table_data.append({
                'Ticker': comp['ticker'],
                'Name': comp['name'][:20],
                'Market Cap ($M)': comp['market_cap'] / 1e6,
                'P/E': comp['pe'],
                'EV/EBITDA': comp['ev_ebitda'],
                'P/S': comp['ps'],
                'P/B': comp['pb'],
                'Rev Growth': comp['revenue_growth'],
                'Profit Margin': comp['profit_margin'],
                'ROE': comp['roe']
            })

        df = pd.DataFrame(table_data)
        return df

    def analyze(self):
        """完整分析"""
        peer_stats = self.calculate_peer_statistics()
        valuations = self.value_target_company()
        comp_table = self.generate_comp_table()

        # 判断相对估值
        target = self.target_data
        relative_valuation = {
            'pe_percentile': self._calculate_percentile(target['pe'], 'pe', peer_stats),
            'ev_ebitda_percentile': self._calculate_percentile(target['ev_ebitda'], 'ev_ebitda', peer_stats),
            'ps_percentile': self._calculate_percentile(target['ps'], 'ps', peer_stats),
            'overall_assessment': self._assess_valuation(valuations)
        }

        return {
            'target': target,
            'peer_statistics': peer_stats,
            'valuations': valuations,
            'comparison_table': comp_table,
            'relative_valuation': relative_valuation
        }

    def _calculate_percentile(self, value, metric, peer_stats):
        """计算目标公司在同行中的百分位"""
        if value == 0:
            return None

        mean = peer_stats[metric]['mean']
        std = peer_stats[metric]['std']

        if std == 0:
            return 50

        z_score = (value - mean) / std
        percentile = 50 + 50 * np.tanh(z_score / 2)
        return round(percentile, 1)

    def _assess_valuation(self, valuations):
        """评估整体估值水平"""
        if not valuations or 'average' not in valuations:
            return "数据不足,无法评估"

        upside = valuations['average']['upside']

        if upside > 0.30:
            return "严重被低估 - 相对同行有>30%上涨空间"
        elif upside > 0.15:
            return "被低估 - 相对同行有15-30%上涨空间"
        elif upside > 0:
            return "略被低估 - 相对同行有0-15%上涨空间"
        elif upside > -0.15:
            return "略被高估 - 相对同行贵0-15%"
        elif upside > -0.30:
            return "被高估 - 相对同行贵15-30%"
        else:
            return "严重被高估 - 相对同行贵>30%"


# 使用示例
if __name__ == "__main__":
    # 示例: 分析特斯拉相对于传统车企的估值
    comp = ComparableCompanyAnalysis(
        target_ticker='TSLA',
        peer_tickers=['F', 'GM', 'TM', 'HMC', 'STLA']  # 福特、通用、丰田、本田、Stellantis
    )

    analysis = comp.analyze()

    print("=" * 80)
    print("可比公司估值分析")
    print("=" * 80)

    print(f"\n目标公司: {analysis['target']['name']} ({analysis['target']['ticker']})")
    print(f"当前价格: ${analysis['target']['price']:.2f}")
    print(f"市值: ${analysis['target']['market_cap'] / 1e9:.1f}B")

    print("\n【可比公司对比】")
    print(analysis['comparison_table'].to_string(index=False))

    print("\n【基于同行倍数的估值】")
    for method, val in analysis['valuations'].items():
        if method != 'average':
            print(f"\n{method.upper()}方法:")
            print(f"  同行中位数倍数: {val['peer_multiple']:.2f}x")
            print(f"  目标公司倍数: {val['target_metric']:.2f}x")
            print(f"  隐含股价: ${val['implied_price']:.2f}")
            print(f"  上涨空间: {val['upside']:+.1%}")

    if 'average' in analysis['valuations']:
        print(f"\n综合估值:")
        print(f"  平均隐含价格: ${analysis['valuations']['average']['implied_price']:.2f}")
        print(f"  平均上涨空间: {analysis['valuations']['average']['upside']:+.1%}")

    print(f"\n【相对估值评估】")
    rel_val = analysis['relative_valuation']
    print(f"  P/E百分位: {rel_val['pe_percentile']}%(在同行中的排名)")
    print(f"  EV/EBITDA百分位: {rel_val['ev_ebitda_percentile']}%")
    print(f"  P/S百分位: {rel_val['ps_percentile']}%")
    print(f"\n  结论: {rel_val['overall_assessment']}")
