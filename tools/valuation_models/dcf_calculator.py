"""
DCF (Discounted Cash Flow) 估值计算器
适用场景: 成熟企业、稳定现金流、可预测业务
"""

import yfinance as yf
import numpy as np
from datetime import datetime


class DCFCalculator:
    """
    DCF估值计算器

    方法论:
    1. 预测未来5-10年自由现金流(FCF)
    2. 计算终值(Terminal Value)
    3. 用WACC折现至现值
    4. 加总得到企业价值(Enterprise Value)
    5. 减去净债务得到股权价值(Equity Value)
    6. 除以股数得到每股内在价值

    关键假设:
    - 收入增长率
    - 利润率
    - 资本支出需求
    - 折现率(WACC)
    - 永续增长率
    """

    def __init__(self, ticker):
        """
        初始化DCF计算器

        Args:
            ticker: 股票代码
        """
        self.ticker = ticker.upper()
        self.stock = yf.Ticker(ticker)
        self._load_financials()

    def _load_financials(self):
        """加载财务数据"""
        try:
            # 获取基本信息
            info = self.stock.info
            self.current_price = info.get('currentPrice', 0)
            self.shares_outstanding = info.get('sharesOutstanding', 0)
            self.market_cap = info.get('marketCap', 0)

            # 获取资产负债表
            balance_sheet = self.stock.balance_sheet
            if not balance_sheet.empty:
                latest = balance_sheet.columns[0]
                self.total_debt = balance_sheet.loc['Total Debt', latest] if 'Total Debt' in balance_sheet.index else 0
                self.cash = balance_sheet.loc['Cash', latest] if 'Cash' in balance_sheet.index else 0
                self.net_debt = self.total_debt - self.cash
            else:
                self.total_debt = 0
                self.cash = 0
                self.net_debt = 0

            # 获取现金流量表
            cashflow = self.stock.cashflow
            if not cashflow.empty:
                latest = cashflow.columns[0]
                self.operating_cashflow = cashflow.loc['Operating Cash Flow', latest] if 'Operating Cash Flow' in cashflow.index else 0
                self.capex = abs(cashflow.loc['Capital Expenditure', latest]) if 'Capital Expenditure' in cashflow.index else 0
                self.latest_fcf = self.operating_cashflow - self.capex

                # 计算历史FCF增长率
                fcf_history = []
                for col in cashflow.columns[:min(5, len(cashflow.columns))]:
                    ocf = cashflow.loc['Operating Cash Flow', col] if 'Operating Cash Flow' in cashflow.index else 0
                    capex = abs(cashflow.loc['Capital Expenditure', col]) if 'Capital Expenditure' in cashflow.index else 0
                    fcf_history.append(ocf - capex)

                if len(fcf_history) >= 2:
                    cagr = (fcf_history[0] / fcf_history[-1]) ** (1 / (len(fcf_history) - 1)) - 1
                    self.historical_fcf_growth = cagr
                else:
                    self.historical_fcf_growth = 0.10
            else:
                self.operating_cashflow = 0
                self.capex = 0
                self.latest_fcf = 0
                self.historical_fcf_growth = 0.10

        except Exception as e:
            print(f"数据加载警告: {e}")
            # 设置默认值
            self.current_price = 100
            self.shares_outstanding = 1000000
            self.market_cap = 100000000
            self.total_debt = 0
            self.cash = 0
            self.net_debt = 0
            self.latest_fcf = 1000000
            self.historical_fcf_growth = 0.10

    def calculate_wacc(self, risk_free_rate=None, market_return=0.10, beta=None):
        """
        计算加权平均资本成本(WACC)

        WACC = (E/V) × Re + (D/V) × Rd × (1-Tax)

        Args:
            risk_free_rate: 无风险利率(默认使用10年期国债收益率)
            market_return: 市场期望回报率(默认10%)
            beta: 贝塔系数(默认从Yahoo获取)

        Returns:
            float: WACC
        """
        # 1. 无风险利率(使用10年期国债,当前约4.5%)
        if risk_free_rate is None:
            risk_free_rate = 0.045

        # 2. 贝塔系数
        if beta is None:
            try:
                beta = self.stock.info.get('beta', 1.0)
            except:
                beta = 1.0

        # 3. 权益成本(CAPM)
        cost_of_equity = risk_free_rate + beta * (market_return - risk_free_rate)

        # 4. 债务成本
        if self.total_debt > 0 and 'interestExpense' in self.stock.financials.index:
            interest_expense = abs(self.stock.financials.loc['Interest Expense', self.stock.financials.columns[0]])
            cost_of_debt = interest_expense / self.total_debt
        else:
            cost_of_debt = 0.05  # 默认5%

        # 5. 税率
        try:
            if 'Tax Provision' in self.stock.financials.index and 'Pretax Income' in self.stock.financials.index:
                tax_provision = self.stock.financials.loc['Tax Provision', self.stock.financials.columns[0]]
                pretax_income = self.stock.financials.loc['Pretax Income', self.stock.financials.columns[0]]
                tax_rate = abs(tax_provision / pretax_income) if pretax_income != 0 else 0.21
            else:
                tax_rate = 0.21  # 美国联邦企业税率
        except:
            tax_rate = 0.21

        # 6. 计算WACC
        E = self.market_cap  # 股权价值
        D = self.total_debt  # 债务价值
        V = E + D  # 企业总价值

        if V > 0:
            wacc = (E / V) * cost_of_equity + (D / V) * cost_of_debt * (1 - tax_rate)
        else:
            wacc = cost_of_equity

        return {
            'wacc': wacc,
            'cost_of_equity': cost_of_equity,
            'cost_of_debt': cost_of_debt,
            'tax_rate': tax_rate,
            'beta': beta,
            'risk_free_rate': risk_free_rate,
            'equity_weight': E / V if V > 0 else 1,
            'debt_weight': D / V if V > 0 else 0
        }

    def project_fcf(self, years=10, growth_rate=None, terminal_growth=0.025):
        """
        预测未来自由现金流

        Args:
            years: 预测年数(通常5-10年)
            growth_rate: 年化增长率(默认使用历史增长率或10%)
            terminal_growth: 永续增长率(通常2-3%)

        Returns:
            dict: FCF预测
        """
        if growth_rate is None:
            # 使用历史增长率,但上限20%,下限5%
            growth_rate = max(0.05, min(0.20, self.historical_fcf_growth))

        # 预测FCF
        fcf_projections = []
        base_fcf = self.latest_fcf

        # 考虑增长率递减(高增长难以持续)
        for year in range(1, years + 1):
            # 增长率每年递减(fade to terminal growth)
            if year <= 5:
                year_growth = growth_rate
            else:
                # 后5年线性递减至永续增长率
                fade_factor = (years - year) / (years - 5)
                year_growth = terminal_growth + (growth_rate - terminal_growth) * fade_factor

            projected_fcf = base_fcf * ((1 + year_growth) ** year)
            fcf_projections.append({
                'year': year,
                'fcf': projected_fcf,
                'growth_rate': year_growth
            })

        # 计算终值(使用Gordon Growth Model)
        final_fcf = fcf_projections[-1]['fcf']
        terminal_fcf = final_fcf * (1 + terminal_growth)

        return {
            'base_fcf': base_fcf,
            'projections': fcf_projections,
            'terminal_fcf': terminal_fcf,
            'assumptions': {
                'initial_growth_rate': growth_rate,
                'terminal_growth_rate': terminal_growth,
                'projection_years': years
            }
        }

    def calculate_dcf(self, growth_rate=None, terminal_growth=0.025, years=10):
        """
        计算DCF估值

        Returns:
            dict: 完整DCF分析
        """
        # 1. 计算WACC
        wacc_data = self.calculate_wacc()
        wacc = wacc_data['wacc']

        # 2. 预测FCF
        fcf_data = self.project_fcf(years, growth_rate, terminal_growth)

        # 3. 折现FCF
        pv_fcf = 0
        discount_details = []
        for proj in fcf_data['projections']:
            year = proj['year']
            fcf = proj['fcf']
            discount_factor = 1 / ((1 + wacc) ** year)
            pv = fcf * discount_factor

            pv_fcf += pv
            discount_details.append({
                'year': year,
                'fcf': fcf,
                'discount_factor': discount_factor,
                'present_value': pv
            })

        # 4. 计算终值现值
        terminal_value = fcf_data['terminal_fcf'] / (wacc - terminal_growth)
        pv_terminal = terminal_value / ((1 + wacc) ** years)

        # 5. 计算企业价值
        enterprise_value = pv_fcf + pv_terminal

        # 6. 计算股权价值
        equity_value = enterprise_value - self.net_debt

        # 7. 每股价值
        intrinsic_value_per_share = equity_value / self.shares_outstanding if self.shares_outstanding > 0 else 0

        # 8. 相对当前价格的估值
        upside_downside = (intrinsic_value_per_share - self.current_price) / self.current_price if self.current_price > 0 else 0

        # 9. 终值占比
        terminal_value_percentage = pv_terminal / enterprise_value if enterprise_value > 0 else 0

        return {
            'valuation': {
                'intrinsic_value_per_share': round(intrinsic_value_per_share, 2),
                'current_price': round(self.current_price, 2),
                'upside_downside': round(upside_downside, 3),
                'recommendation': self._get_recommendation(upside_downside)
            },
            'enterprise_value_bridge': {
                'pv_of_fcf': round(pv_fcf, 0),
                'pv_of_terminal_value': round(pv_terminal, 0),
                'enterprise_value': round(enterprise_value, 0),
                'less_net_debt': round(self.net_debt, 0),
                'equity_value': round(equity_value, 0),
                'shares_outstanding': self.shares_outstanding,
                'value_per_share': round(intrinsic_value_per_share, 2)
            },
            'key_assumptions': {
                'wacc': round(wacc, 4),
                'initial_growth_rate': fcf_data['assumptions']['initial_growth_rate'],
                'terminal_growth_rate': terminal_growth,
                'projection_years': years,
                'base_fcf': round(fcf_data['base_fcf'], 0)
            },
            'sensitivity_analysis': self.sensitivity_analysis(wacc, terminal_growth, growth_rate),
            'fcf_projections': discount_details,
            'risk_indicators': {
                'terminal_value_percentage': round(terminal_value_percentage, 3),
                'warning': 'Terminal value >75% indicates high uncertainty' if terminal_value_percentage > 0.75 else None
            }
        }

    def _get_recommendation(self, upside):
        """根据上涨/下跌空间给出建议"""
        if upside > 0.30:
            return "强烈买入 - 被低估>30%"
        elif upside > 0.15:
            return "买入 - 被低估15-30%"
        elif upside > 0:
            return "持有 - 略被低估"
        elif upside > -0.15:
            return "持有 - 略被高估"
        elif upside > -0.30:
            return "卖出 - 被高估15-30%"
        else:
            return "强烈卖出 - 被高估>30%"

    def sensitivity_analysis(self, base_wacc, base_terminal_growth, base_growth_rate):
        """
        敏感性分析: 不同WACC和永续增长率下的估值

        Returns:
            dict: 敏感性矩阵
        """
        wacc_range = [base_wacc - 0.02, base_wacc - 0.01, base_wacc, base_wacc + 0.01, base_wacc + 0.02]
        tg_range = [base_terminal_growth - 0.01, base_terminal_growth, base_terminal_growth + 0.01]

        matrix = []
        for wacc in wacc_range:
            row = []
            for tg in tg_range:
                # 重新计算DCF
                fcf_data = self.project_fcf(10, base_growth_rate, tg)
                pv_fcf = sum([
                    proj['fcf'] / ((1 + wacc) ** proj['year'])
                    for proj in fcf_data['projections']
                ])
                terminal_value = fcf_data['terminal_fcf'] / (wacc - tg) if wacc > tg else 0
                pv_terminal = terminal_value / ((1 + wacc) ** 10) if wacc > 0 else 0
                ev = pv_fcf + pv_terminal
                equity = ev - self.net_debt
                price = equity / self.shares_outstanding if self.shares_outstanding > 0 else 0

                row.append(round(price, 2))
            matrix.append(row)

        return {
            'wacc_range': [round(w, 4) for w in wacc_range],
            'terminal_growth_range': [round(tg, 4) for tg in tg_range],
            'value_matrix': matrix,
            'explanation': 'Each cell shows intrinsic value for given WACC (rows) and terminal growth (columns)'
        }


# 使用示例
if __name__ == "__main__":
    # 创建DCF计算器
    ticker = 'AAPL'
    dcf = DCFCalculator(ticker)

    print("=" * 80)
    print(f"DCF估值分析 - {ticker}")
    print("=" * 80)

    # 执行DCF计算
    result = dcf.calculate_dcf(growth_rate=0.12, terminal_growth=0.025, years=10)

    print(f"\n【估值结论】")
    val = result['valuation']
    print(f"  内在价值: ${val['intrinsic_value_per_share']:.2f}")
    print(f"  当前价格: ${val['current_price']:.2f}")
    print(f"  上涨空间: {val['upside_downside']:+.1%}")
    print(f"  建议: {val['recommendation']}")

    print(f"\n【企业价值拆解】")
    bridge = result['enterprise_value_bridge']
    print(f"  未来10年FCF现值: ${bridge['pv_of_fcf']:,.0f}")
    print(f"  终值现值: ${bridge['pv_of_terminal_value']:,.0f}")
    print(f"  企业价值(EV): ${bridge['enterprise_value']:,.0f}")
    print(f"  减:净债务: ${bridge['less_net_debt']:,.0f}")
    print(f"  股权价值: ${bridge['equity_value']:,.0f}")
    print(f"  股数: {bridge['shares_outstanding']:,.0f}")
    print(f"  每股价值: ${bridge['value_per_share']:.2f}")

    print(f"\n【关键假设】")
    assumptions = result['key_assumptions']
    print(f"  WACC: {assumptions['wacc']:.2%}")
    print(f"  初始增长率: {assumptions['initial_growth_rate']:.1%}")
    print(f"  永续增长率: {assumptions['terminal_growth_rate']:.1%}")
    print(f"  预测年数: {assumptions['projection_years']}年")
    print(f"  基期FCF: ${assumptions['base_fcf']:,.0f}")

    print(f"\n【风险提示】")
    risk = result['risk_indicators']
    print(f"  终值占比: {risk['terminal_value_percentage']:.1%}")
    if risk['warning']:
        print(f"  ⚠️  {risk['warning']}")

    print(f"\n【未来10年FCF预测】")
    print(f"  {'年份':<6} {'FCF预测':<15} {'折现因子':<12} {'现值':<15}")
    print("  " + "-" * 55)
    for proj in result['fcf_projections'][:10]:
        print(f"  {proj['year']:<6} ${proj['fcf']:<14,.0f} {proj['discount_factor']:<12.4f} ${proj['present_value']:<14,.0f}")

    print(f"\n【敏感性分析】")
    sensitivity = result['sensitivity_analysis']
    print(f"\n  WACC↓ vs 永续增长率→")
    print(f"  {'WACC':<8}", end="")
    for tg in sensitivity['terminal_growth_range']:
        print(f"{tg:>10.1%}", end="")
    print()
    print("  " + "-" * 40)

    for i, wacc in enumerate(sensitivity['wacc_range']):
        print(f"  {wacc:<8.2%}", end="")
        for val in sensitivity['value_matrix'][i]:
            print(f"${val:>9.2f}", end="")
        print()

    print(f"\n{'='*80}")
    print("分析完成")
