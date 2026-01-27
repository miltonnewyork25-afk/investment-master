"""
Agent 7: 排除规则执行器
执行硬性排除规则，确保Top 20池子纯净
"""

import pandas as pd
import numpy as np
import requests
import json
from datetime import datetime, timedelta
import time
import os
import re
from typing import Dict, List, Tuple, Optional

# FMP API配置
FMP_API_KEY = "your_api_key_here"  # 需要配置
BASE_DIR = "/Users/milton/投资大师/Top20_Screener"
EXCLUSIONS_DIR = os.path.join(BASE_DIR, "exclusions")
DATA_DIR = os.path.join(BASE_DIR, "data")

# 创建必要目录
os.makedirs(EXCLUSIONS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)


class ExclusionExecutor:
    """排除规则执行器"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.exclusion_log = []
        self.stats = {
            'biotech': 0,
            'data_quality': 0,
            'data_anomaly': 0,
            'bankruptcy_risk': 0,
            'debt_risk': 0,
            'fraud_risk': 0,
            'insider_selling': 0,
            'liquidity': 0,
            'recent_ipo': 0,
            'restructuring': 0,
            'chinese_adr': 0,
            'other': 0,
            'passed': 0
        }

    def log_exclusion(self, ticker: str, company: str, reason: str, details: str = ""):
        """记录排除"""
        self.exclusion_log.append({
            'Ticker': ticker,
            'Company': company,
            'Exclusion_Reason': reason,
            'Details': details,
            'Date_Excluded': datetime.now().strftime('%Y-%m-%d')
        })

    def get_company_profile(self, ticker: str) -> Optional[Dict]:
        """获取公司基本信息"""
        try:
            url = f"https://financialmodelingprep.com/api/v3/profile/{ticker}?apikey={self.api_key}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data[0] if data else None
        except:
            pass
        return None

    def get_financial_data(self, ticker: str, statement: str = 'income-statement', period: str = 'annual', limit: int = 5) -> Optional[pd.DataFrame]:
        """获取财务数据"""
        try:
            url = f"https://financialmodelingprep.com/api/v3/{statement}/{ticker}?period={period}&limit={limit}&apikey={self.api_key}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return pd.DataFrame(data) if data else None
        except:
            pass
        return None

    def get_insider_trading(self, ticker: str) -> Optional[pd.DataFrame]:
        """获取内部人交易数据"""
        try:
            url = f"https://financialmodelingprep.com/api/v4/insider-trading?symbol={ticker}&limit=100&apikey={self.api_key}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return pd.DataFrame(data) if data else None
        except:
            pass
        return None

    def get_stock_price_history(self, ticker: str, years: int = 3) -> Optional[pd.DataFrame]:
        """获取历史股价数据"""
        try:
            from_date = (datetime.now() - timedelta(days=years*365)).strftime('%Y-%m-%d')
            to_date = datetime.now().strftime('%Y-%m-%d')
            url = f"https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?from={from_date}&to={to_date}&apikey={self.api_key}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if 'historical' in data:
                    return pd.DataFrame(data['historical'])
        except:
            pass
        return None

    # ============ 排除规则 1: 行业排除 ============

    def check_biotech_exclusion(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查生物制药排除"""
        if not profile:
            return False, ""

        # 检查GICS行业
        sector = profile.get('sector', '').lower()
        industry = profile.get('industry', '').lower()

        # 生物技术关键词
        biotech_keywords = ['biotech', 'pharmaceutical', 'clinical', 'drug development', 'therapeutics']

        is_biotech = (
            sector == 'healthcare' and
            any(kw in industry for kw in biotech_keywords)
        )

        if is_biotech:
            # 获取财务数据判断是否收入主要来自未上市产品
            income = self.get_financial_data(ticker, 'income-statement', 'annual', 3)
            if income is not None and len(income) > 0:
                latest_revenue = income.iloc[0].get('revenue', 0)
                market_cap = profile.get('mktCap', 0)

                # 如果市值远大于收入（>20倍），可能是赌未来管线
                if market_cap > 0 and latest_revenue > 0:
                    if market_cap / latest_revenue > 20:
                        return True, f"生物制药/临床试验主导 (市值/收入={market_cap/latest_revenue:.1f}x)"

                # 如果收入太少或为零
                if latest_revenue < 50_000_000:  # <50M收入
                    return True, "生物制药/临床试验主导 (收入<$50M)"

        return False, ""

    def check_special_situations_exclusion(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查其他特殊情况排除"""
        if not profile:
            return False, ""

        company_name = profile.get('companyName', '').lower()
        price = profile.get('price', 0)
        market_cap = profile.get('mktCap', 0)

        # SPAC
        if 'acquisition corp' in company_name or 'spac' in company_name:
            return True, "SPAC公司"

        # Penny Stock
        if price < 5 and market_cap < 500_000_000:
            return True, f"Penny Stock (价格=${price:.2f}, 市值=${market_cap/1e6:.0f}M)"

        # Pre-Revenue
        income = self.get_financial_data(ticker, 'income-statement', 'annual', 1)
        if income is not None and len(income) > 0:
            revenue = income.iloc[0].get('revenue', 0)
            if revenue <= 0:
                return True, "Pre-Revenue公司"

        return False, ""

    # ============ 排除规则 2: 数据质量排除 ============

    def check_data_quality(self, ticker: str) -> Tuple[bool, str]:
        """检查数据质量"""
        # 获取必需数据
        income_annual = self.get_financial_data(ticker, 'income-statement', 'annual', 5)
        cash_flow = self.get_financial_data(ticker, 'cash-flow-statement', 'annual', 3)
        balance = self.get_financial_data(ticker, 'balance-sheet-statement', 'annual', 1)
        price_history = self.get_stock_price_history(ticker, 3)

        missing_data = []

        # 检查5年历史收入
        if income_annual is None or len(income_annual) < 5:
            missing_data.append("5年收入数据不足")
        else:
            # 检查数据完整性
            revenue_data = income_annual['revenue'].dropna()
            if len(revenue_data) < 4:  # 允许缺失1年
                missing_data.append("收入数据缺失>20%")

        # 检查现金流数据
        if cash_flow is None or len(cash_flow) < 3:
            missing_data.append("3年现金流数据不足")

        # 检查资产负债表
        if balance is None or len(balance) < 1:
            missing_data.append("资产负债表缺失")

        # 检查股价数据
        if price_history is None or len(price_history) < 250:  # 至少1年交易日
            missing_data.append("股价历史数据不足")

        if missing_data:
            return True, "; ".join(missing_data)

        return False, ""

    def check_data_anomaly(self, ticker: str) -> Tuple[bool, str]:
        """检查数据异常"""
        income = self.get_financial_data(ticker, 'income-statement', 'annual', 5)
        cash_flow = self.get_financial_data(ticker, 'cash-flow-statement', 'annual', 3)
        balance = self.get_financial_data(ticker, 'balance-sheet-statement', 'annual', 1)

        if income is None or len(income) < 2:
            return False, ""

        anomalies = []

        # 检查收入暴增（可能是并购或数据错误）
        revenues = income['revenue'].values
        for i in range(len(revenues)-1):
            if revenues[i] > 0 and revenues[i+1] / revenues[i] > 10:
                anomalies.append(f"收入暴增{revenues[i+1]/revenues[i]:.1f}x")
                break

        # 检查净利润与OCF方向相反
        if cash_flow is not None and len(cash_flow) >= 2:
            for i in range(min(2, len(income))):
                net_income = income.iloc[i].get('netIncome', 0)
                ocf = cash_flow.iloc[i].get('operatingCashFlow', 0) if i < len(cash_flow) else 0

                if net_income > 0 and ocf < 0:
                    anomalies.append(f"净利润为正但OCF为负 ({income.iloc[i].get('date', '')})")
                    break

        # 检查应收账款增速 > 收入增速
        if balance is not None and len(balance) > 0 and len(income) >= 2:
            latest_ar = balance.iloc[0].get('netReceivables', 0)
            # 获取去年的资产负债表
            balance_prev = self.get_financial_data(ticker, 'balance-sheet-statement', 'annual', 2)
            if balance_prev is not None and len(balance_prev) > 1:
                prev_ar = balance_prev.iloc[1].get('netReceivables', 0)
                latest_revenue = income.iloc[0].get('revenue', 0)
                prev_revenue = income.iloc[1].get('revenue', 0)

                if prev_ar > 0 and prev_revenue > 0 and latest_ar > 0 and latest_revenue > 0:
                    ar_growth = (latest_ar - prev_ar) / prev_ar
                    revenue_growth = (latest_revenue - prev_revenue) / prev_revenue

                    if ar_growth > revenue_growth * 2 and ar_growth > 0.5:
                        anomalies.append(f"应收增速{ar_growth:.1%} > 收入增速{revenue_growth:.1%}×2")

        # 检查商誉占比
        if balance is not None and len(balance) > 0:
            goodwill = balance.iloc[0].get('goodwill', 0)
            total_assets = balance.iloc[0].get('totalAssets', 0)

            if total_assets > 0 and goodwill / total_assets > 0.5:
                anomalies.append(f"商誉占总资产{goodwill/total_assets:.1%}")

        if anomalies:
            return True, "; ".join(anomalies)

        return False, ""

    # ============ 排除规则 3: 财务风险排除 ============

    def calculate_altman_z_score(self, ticker: str, balance: pd.DataFrame, income: pd.DataFrame, profile: Dict) -> Optional[float]:
        """计算Altman Z-Score"""
        if balance is None or len(balance) < 1 or income is None or len(income) < 1:
            return None

        try:
            # 获取最新数据
            b = balance.iloc[0]
            i = income.iloc[0]

            total_assets = b.get('totalAssets', 0)
            if total_assets <= 0:
                return None

            # 计算各组成部分
            working_capital = b.get('totalCurrentAssets', 0) - b.get('totalCurrentLiabilities', 0)
            retained_earnings = b.get('retainedEarnings', 0)
            ebit = i.get('operatingIncome', 0)  # EBIT
            market_cap = profile.get('mktCap', 0)
            total_liabilities = b.get('totalLiabilities', 0)
            revenue = i.get('revenue', 0)

            # Z = 1.2×(营运资本/总资产) + 1.4×(留存收益/总资产) +
            #     3.3×(EBIT/总资产) + 0.6×(市值/总负债) + 1.0×(收入/总资产)

            z1 = 1.2 * (working_capital / total_assets)
            z2 = 1.4 * (retained_earnings / total_assets)
            z3 = 3.3 * (ebit / total_assets)
            z4 = 0.6 * (market_cap / total_liabilities) if total_liabilities > 0 else 0
            z5 = 1.0 * (revenue / total_assets)

            z_score = z1 + z2 + z3 + z4 + z5

            return z_score
        except:
            return None

    def check_bankruptcy_risk(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查破产风险"""
        balance = self.get_financial_data(ticker, 'balance-sheet-statement', 'annual', 1)
        income = self.get_financial_data(ticker, 'income-statement', 'annual', 1)

        # 计算Z-Score
        z_score = self.calculate_altman_z_score(ticker, balance, income, profile)

        if z_score is not None and z_score < 1.8:
            return True, f"Altman Z-Score={z_score:.2f} (<1.8高破产风险)"

        # 对于金融公司，检查其他指标
        sector = profile.get('sector', '').lower() if profile else ''
        if 'financial' in sector or 'bank' in sector:
            # 这里可以添加Tier 1 Capital Ratio检查
            # 由于FMP可能没有这个数据，暂时跳过
            pass

        return False, ""

    def check_debt_risk(self, ticker: str) -> Tuple[bool, str]:
        """检查债务风险"""
        balance = self.get_financial_data(ticker, 'balance-sheet-statement', 'annual', 1)
        income = self.get_financial_data(ticker, 'income-statement', 'annual', 1)

        if balance is None or len(balance) < 1 or income is None or len(income) < 1:
            return False, ""

        b = balance.iloc[0]
        i = income.iloc[0]

        # 检查短期债务 vs 现金
        short_term_debt = b.get('shortTermDebt', 0)
        cash = b.get('cashAndCashEquivalents', 0)

        if cash > 0 and short_term_debt > cash * 2:
            return True, f"短期债务${short_term_debt/1e9:.2f}B > 现金${cash/1e9:.2f}B×2"

        # 检查利息覆盖率
        ebit = i.get('operatingIncome', 0)
        interest_expense = abs(i.get('interestExpense', 0))

        if interest_expense > 0:
            interest_coverage = ebit / interest_expense if interest_expense > 0 else 0
            if interest_coverage < 1.5:
                return True, f"利息覆盖率={interest_coverage:.2f} (<1.5)"

        return False, ""

    # ============ 排除规则 4: 治理与合规风险 ============

    def check_governance_risk(self, ticker: str) -> Tuple[bool, str]:
        """检查治理风险（简化版）"""
        # 注意：完整的SEC调查、审计师辞职等信息需要爬取SEC EDGAR或新闻
        # 这里仅做示例性检查

        # 可以通过FMP的news API检查是否有欺诈相关新闻
        try:
            url = f"https://financialmodelingprep.com/api/v3/stock_news?tickers={ticker}&limit=50&apikey={self.api_key}"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                news = response.json()
                fraud_keywords = ['investigation', 'fraud', 'sec', 'lawsuit', 'class action', 'restatement']

                for article in news[:20]:  # 检查最近20条新闻
                    title = article.get('title', '').lower()
                    text = article.get('text', '').lower()

                    if any(kw in title or kw in text for kw in fraud_keywords):
                        return True, f"可能存在治理风险 (新闻提及: {article.get('title', '')[:50]})"
        except:
            pass

        return False, ""

    def check_insider_selling(self, ticker: str) -> Tuple[bool, str]:
        """检查内部人大量抛售"""
        insider = self.get_insider_trading(ticker)

        if insider is None or len(insider) < 5:
            return False, ""

        # 过滤最近6个月
        six_months_ago = datetime.now() - timedelta(days=180)
        insider['transactionDate'] = pd.to_datetime(insider['transactionDate'], errors='coerce')
        recent = insider[insider['transactionDate'] > six_months_ago]

        if len(recent) < 5:
            return False, ""

        # 计算净卖出
        recent['value'] = recent['securitiesTransacted'] * recent['price']

        # 分离买入和卖出
        purchases = recent[recent['acquistionOrDisposition'] == 'A']['value'].sum()
        sales = recent[recent['acquistionOrDisposition'] == 'D']['value'].sum()

        # 检查是否有CEO/CFO大量抛售
        executives = recent[recent['reportingName'].str.contains('CEO|CFO|Chief', case=False, na=False)]
        exec_sales = executives[executives['acquistionOrDisposition'] == 'D']['value'].sum()

        # 排除条件：净卖出 > $10M 且卖出比率 > 80%
        if sales > 10_000_000 and sales > 0:
            sell_ratio = sales / (sales + purchases) if (sales + purchases) > 0 else 0

            if sell_ratio > 0.8 and exec_sales > 5_000_000:
                return True, f"内部人净卖出${sales/1e6:.1f}M (卖出率{sell_ratio:.1%}), 高管卖出${exec_sales/1e6:.1f}M"

        return False, ""

    # ============ 排除规则 5: 流动性风险 ============

    def check_liquidity_risk(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查流动性风险"""
        if not profile:
            return False, ""

        # 获取交易量数据
        avg_volume = profile.get('volAvg', 0)
        price = profile.get('price', 0)

        # 日均交易额
        daily_dollar_volume = avg_volume * price

        # 排除条件：日均交易额 < $5M
        if daily_dollar_volume < 5_000_000:
            return True, f"流动性不足 (日均交易额=${daily_dollar_volume/1e6:.2f}M < $5M)"

        return False, ""

    # ============ 排除规则 6: 特殊情况排除 ============

    def check_recent_ipo(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查是否为近期IPO"""
        if not profile:
            return False, ""

        ipo_date = profile.get('ipoDate')
        if ipo_date:
            try:
                ipo_dt = datetime.strptime(ipo_date, '%Y-%m-%d')
                years_since_ipo = (datetime.now() - ipo_dt).days / 365

                if years_since_ipo < 2:
                    return True, f"IPO<2年 (上市于{ipo_date})"
            except:
                pass

        return False, ""

    def check_chinese_adr(self, ticker: str, profile: Dict) -> Tuple[bool, str]:
        """检查中国ADR"""
        if not profile:
            return False, ""

        country = profile.get('country', '').lower()

        # 中国公司ADR
        if country in ['cn', 'china', 'hk', 'hong kong']:
            # 检查是否在美国有实质运营（这个信息难以自动获取，这里简化处理）
            # 如果是知名的在美有业务的公司，可以保留
            # 否则排除
            return True, f"中国ADR (审计风险, 国家={country})"

        return False, ""

    # ============ 主执行函数 ============

    def execute_exclusion_rules(self, ticker: str, company_name: str) -> Tuple[bool, str, str]:
        """
        执行所有排除规则
        返回: (是否排除, 排除原因, 详细信息)
        """
        # 获取基本信息
        profile = self.get_company_profile(ticker)

        if not profile:
            return True, "数据获取失败", "无法获取公司基本信息"

        # 按顺序执行排除规则
        rules = [
            ("biotech", lambda: self.check_biotech_exclusion(ticker, profile)),
            ("special_situations", lambda: self.check_special_situations_exclusion(ticker, profile)),
            ("data_quality", lambda: self.check_data_quality(ticker)),
            ("data_anomaly", lambda: self.check_data_anomaly(ticker)),
            ("bankruptcy_risk", lambda: self.check_bankruptcy_risk(ticker, profile)),
            ("debt_risk", lambda: self.check_debt_risk(ticker)),
            ("governance_risk", lambda: self.check_governance_risk(ticker)),
            ("insider_selling", lambda: self.check_insider_selling(ticker)),
            ("liquidity_risk", lambda: self.check_liquidity_risk(ticker, profile)),
            ("recent_ipo", lambda: self.check_recent_ipo(ticker, profile)),
            ("chinese_adr", lambda: self.check_chinese_adr(ticker, profile)),
        ]

        for rule_name, check_func in rules:
            try:
                excluded, details = check_func()
                if excluded:
                    # 更新统计
                    if rule_name in ['biotech', 'special_situations']:
                        self.stats['biotech'] += 1
                    elif rule_name == 'data_quality':
                        self.stats['data_quality'] += 1
                    elif rule_name == 'data_anomaly':
                        self.stats['data_anomaly'] += 1
                    elif rule_name == 'bankruptcy_risk':
                        self.stats['bankruptcy_risk'] += 1
                    elif rule_name == 'debt_risk':
                        self.stats['debt_risk'] += 1
                    elif rule_name == 'governance_risk':
                        self.stats['fraud_risk'] += 1
                    elif rule_name == 'insider_selling':
                        self.stats['insider_selling'] += 1
                    elif rule_name == 'liquidity_risk':
                        self.stats['liquidity'] += 1
                    elif rule_name == 'recent_ipo':
                        self.stats['recent_ipo'] += 1
                    elif rule_name == 'chinese_adr':
                        self.stats['chinese_adr'] += 1
                    else:
                        self.stats['other'] += 1

                    return True, rule_name, details
            except Exception as e:
                print(f"检查 {ticker} 的 {rule_name} 时出错: {str(e)}")
                continue

        # 通过所有检查
        self.stats['passed'] += 1
        return False, "通过所有排除规则", ""

    def process_stock_pool(self, stock_pool_file: str, output_prefix: str = "exclusion_results"):
        """
        处理整个股票池
        """
        print(f"正在加载股票池: {stock_pool_file}")

        # 加载股票池
        if stock_pool_file.endswith('.csv'):
            stocks = pd.read_csv(stock_pool_file)
        else:
            stocks = pd.read_json(stock_pool_file)

        print(f"股票池总数: {len(stocks)}")

        # 确保有必要的列
        if 'Ticker' not in stocks.columns:
            stocks['Ticker'] = stocks.get('ticker', stocks.get('symbol', stocks.get('Symbol')))
        if 'Company' not in stocks.columns:
            stocks['Company'] = stocks.get('company', stocks.get('companyName', stocks.get('name')))

        # 执行排除规则
        results = []
        excluded_list = []
        passed_list = []

        total = len(stocks)
        for idx, row in stocks.iterrows():
            ticker = row.get('Ticker', row.get('ticker', ''))
            company = row.get('Company', row.get('company', ''))

            if not ticker:
                continue

            print(f"[{idx+1}/{total}] 检查 {ticker} - {company}")

            excluded, reason, details = self.execute_exclusion_rules(ticker, company)

            result = {
                'Ticker': ticker,
                'Company': company,
                'Excluded': excluded,
                'Reason': reason,
                'Details': details,
                'Date': datetime.now().strftime('%Y-%m-%d')
            }

            results.append(result)

            if excluded:
                excluded_list.append(result)
                self.log_exclusion(ticker, company, reason, details)
            else:
                passed_list.append(result)

            # 避免API限流
            time.sleep(0.3)

        # 保存结果
        results_df = pd.DataFrame(results)
        excluded_df = pd.DataFrame(excluded_list)
        passed_df = pd.DataFrame(passed_list)

        results_df.to_csv(os.path.join(EXCLUSIONS_DIR, f"{output_prefix}_all.csv"), index=False)
        excluded_df.to_csv(os.path.join(EXCLUSIONS_DIR, "excluded_companies.csv"), index=False)
        passed_df.to_csv(os.path.join(DATA_DIR, "passed_companies.csv"), index=False)

        # 生成详细报告
        self.generate_exclusion_reports(excluded_df, passed_df, total)

        print(f"\n排除规则执行完成！")
        print(f"起始池: {total}家公司")
        print(f"排除: {len(excluded_list)}家")
        print(f"通过: {len(passed_list)}家")
        print(f"排除率: {len(excluded_list)/total*100:.1f}%")

    def generate_exclusion_reports(self, excluded_df: pd.DataFrame, passed_df: pd.DataFrame, total: int):
        """生成排除报告"""

        # 按排除原因分类保存
        if len(excluded_df) > 0:
            # 生物制药筛查
            biotech = excluded_df[excluded_df['Reason'].str.contains('biotech|special', case=False, na=False)]
            if len(biotech) > 0:
                biotech.to_csv(os.path.join(EXCLUSIONS_DIR, "biotech_screen.csv"), index=False)

            # 数据质量问题
            data_quality = excluded_df[excluded_df['Reason'].str.contains('data', case=False, na=False)]
            if len(data_quality) > 0:
                data_quality.to_csv(os.path.join(EXCLUSIONS_DIR, "data_quality_report.csv"), index=False)

            # 财务风险
            financial_risk = excluded_df[excluded_df['Reason'].str.contains('bankruptcy|debt', case=False, na=False)]
            if len(financial_risk) > 0:
                financial_risk.to_csv(os.path.join(EXCLUSIONS_DIR, "financial_risk_screen.csv"), index=False)

            # 治理风险
            governance = excluded_df[excluded_df['Reason'].str.contains('governance|insider', case=False, na=False)]
            if len(governance) > 0:
                governance.to_csv(os.path.join(EXCLUSIONS_DIR, "governance_alerts.csv"), index=False)

        # 生成总结报告
        summary = f"""# 排除规则执行总结

## 基本统计

- **起始池**: {total:,}家公司
- **生物制药排除**: {self.stats['biotech']:,}家
- **数据质量排除**: {self.stats['data_quality']:,}家
- **数据异常排除**: {self.stats['data_anomaly']:,}家
- **破产风险排除**: {self.stats['bankruptcy_risk']:,}家
- **债务风险排除**: {self.stats['debt_risk']:,}家
- **治理风险排除**: {self.stats['fraud_risk']:,}家
- **内部人抛售排除**: {self.stats['insider_selling']:,}家
- **流动性排除**: {self.stats['liquidity']:,}家
- **IPO<2年排除**: {self.stats['recent_ipo']:,}家
- **中国ADR排除**: {self.stats['chinese_adr']:,}家
- **其他排除**: {self.stats['other']:,}家
- **通过筛选**: {self.stats['passed']:,}家 ✅

**排除率**: {(total - self.stats['passed'])/total*100:.1f}%

## 排除原因分布

"""

        # 添加排除原因分布表
        if len(excluded_df) > 0:
            reason_counts = excluded_df['Reason'].value_counts()
            summary += "\n| 排除原因 | 数量 | 占比 |\n|---------|------|------|\n"
            for reason, count in reason_counts.items():
                summary += f"| {reason} | {count} | {count/len(excluded_df)*100:.1f}% |\n"

        summary += f"""

## 通过筛选的公司

通过所有排除规则的公司已保存至: `data/passed_companies.csv`

共 {len(passed_df)} 家公司进入下一轮分析。

## 文件清单

- `exclusions/excluded_companies.csv` - 所有被排除公司
- `exclusions/biotech_screen.csv` - 生物制药筛查详情
- `exclusions/data_quality_report.csv` - 数据质量问题
- `exclusions/financial_risk_screen.csv` - 财务风险详情
- `exclusions/governance_alerts.csv` - 治理风险详情
- `data/passed_companies.csv` - 通过筛选的公司 ✅

---
生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        # 保存总结
        with open(os.path.join(EXCLUSIONS_DIR, "exclusion_summary.md"), 'w', encoding='utf-8') as f:
            f.write(summary)

        print(f"\n排除总结已保存至: {EXCLUSIONS_DIR}/exclusion_summary.md")


def main():
    """主函数"""
    # 检查API Key
    api_key = os.getenv('FMP_API_KEY', FMP_API_KEY)

    if not api_key or api_key == "your_api_key_here":
        print("错误: 请设置FMP API Key")
        print("方法1: export FMP_API_KEY='your_actual_key'")
        print("方法2: 修改脚本中的 FMP_API_KEY 变量")
        return

    # 创建执行器
    executor = ExclusionExecutor(api_key)

    # 示例：处理股票池
    # 这里需要先有股票池文件，可以是Agent 1或其他来源生成的
    stock_pool_file = os.path.join(DATA_DIR, "initial_stock_pool.csv")

    if not os.path.exists(stock_pool_file):
        print(f"警告: 股票池文件不存在: {stock_pool_file}")
        print("请先运行Agent 1生成初始股票池，或提供股票池文件")

        # 创建示例股票池用于测试
        print("\n创建示例股票池进行测试...")
        sample_stocks = pd.DataFrame({
            'Ticker': ['AAPL', 'TSLA', 'MRNA', 'JNJ', 'JPM', 'ABNB', 'COIN'],
            'Company': ['Apple Inc', 'Tesla Inc', 'Moderna Inc', 'Johnson & Johnson',
                       'JPMorgan Chase', 'Airbnb', 'Coinbase']
        })
        sample_stocks.to_csv(stock_pool_file, index=False)
        print(f"示例股票池已创建: {stock_pool_file}")

    # 执行排除规则
    executor.process_stock_pool(stock_pool_file)


if __name__ == "__main__":
    main()
