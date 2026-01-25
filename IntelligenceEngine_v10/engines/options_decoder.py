"""
Options Market Intelligence Decoder Engine v1.0
===============================================

从期权市场提取情绪信号、隐含概率和异常交易活动。

核心功能:
- Put/Call Ratio 计算
- 隐含波动率 (IV) 分析
- Max Pain 计算
- 异常交易检测 (Unusual Options Activity)
- Black-Scholes 隐含概率倒推
- 期权链完整分析

数据源: Yahoo Finance (免费)
依赖: yfinance, scipy, numpy, pandas
"""

import yfinance as yf
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from scipy.stats import norm
from scipy.optimize import brentq
import json
from typing import Dict, List, Tuple, Optional
import warnings
warnings.filterwarnings('ignore')


class OptionsDecoder:
    """期权市场解码器"""

    def __init__(self, ticker: str, risk_free_rate: float = 0.045):
        """
        初始化期权解码器

        Args:
            ticker: 股票代码 (如 'TSLA')
            risk_free_rate: 无风险利率 (默认4.5%)
        """
        self.ticker = ticker.upper()
        self.risk_free_rate = risk_free_rate
        self.stock = yf.Ticker(self.ticker)
        self.current_price = None
        self.options_data = {}

    def fetch_data(self) -> bool:
        """
        获取股票当前价格和期权链数据

        Returns:
            bool: 数据获取是否成功
        """
        try:
            # 获取当前股价
            hist = self.stock.history(period='1d')
            if hist.empty:
                print(f"⚠️  无法获取 {self.ticker} 的股价数据")
                return False
            self.current_price = hist['Close'].iloc[-1]

            # 获取所有到期日
            expirations = self.stock.options
            if not expirations:
                print(f"⚠️  {self.ticker} 无可用期权数据")
                return False

            # 获取期权链数据（所有到期日）
            for exp_date in expirations[:6]:  # 取前6个到期日
                opt_chain = self.stock.option_chain(exp_date)
                self.options_data[exp_date] = {
                    'calls': opt_chain.calls,
                    'puts': opt_chain.puts,
                    'expiration': exp_date
                }

            print(f"✓ 成功获取 {self.ticker} 数据: ${self.current_price:.2f}")
            print(f"✓ 获取 {len(self.options_data)} 个到期日的期权链")
            return True

        except Exception as e:
            print(f"❌ 数据获取失败: {str(e)}")
            return False

    def calculate_put_call_ratio(self, exp_date: Optional[str] = None) -> Dict:
        """
        计算 Put/Call Ratio (成交量和持仓量两个维度)

        Args:
            exp_date: 指定到期日 (None = 所有到期日汇总)

        Returns:
            Dict: {
                'volume_ratio': float,
                'oi_ratio': float,
                'total_call_volume': int,
                'total_put_volume': int,
                'total_call_oi': int,
                'total_put_oi': int,
                'signal': str  # 'Bullish' / 'Bearish' / 'Neutral'
            }
        """
        if exp_date:
            exp_dates = [exp_date] if exp_date in self.options_data else []
        else:
            exp_dates = list(self.options_data.keys())

        total_call_vol = 0
        total_put_vol = 0
        total_call_oi = 0
        total_put_oi = 0

        for exp in exp_dates:
            calls = self.options_data[exp]['calls']
            puts = self.options_data[exp]['puts']

            total_call_vol += calls['volume'].fillna(0).sum()
            total_put_vol += puts['volume'].fillna(0).sum()
            total_call_oi += calls['openInterest'].fillna(0).sum()
            total_put_oi += puts['openInterest'].fillna(0).sum()

        # 计算比率
        vol_ratio = total_put_vol / total_call_vol if total_call_vol > 0 else 0
        oi_ratio = total_put_oi / total_call_oi if total_call_oi > 0 else 0

        # 信号判断 (P/C < 0.7 = Bullish, > 1.0 = Bearish)
        avg_ratio = (vol_ratio + oi_ratio) / 2
        if avg_ratio < 0.7:
            signal = 'Bullish'
        elif avg_ratio > 1.0:
            signal = 'Bearish'
        else:
            signal = 'Neutral'

        return {
            'volume_ratio': round(vol_ratio, 3),
            'oi_ratio': round(oi_ratio, 3),
            'avg_ratio': round(avg_ratio, 3),
            'total_call_volume': int(total_call_vol),
            'total_put_volume': int(total_put_vol),
            'total_call_oi': int(total_call_oi),
            'total_put_oi': int(total_put_oi),
            'signal': signal
        }

    def calculate_max_pain(self, exp_date: str) -> Dict:
        """
        计算 Max Pain 价格 (期权卖方损失最小的行权价)

        Args:
            exp_date: 到期日

        Returns:
            Dict: {
                'max_pain_price': float,
                'total_loss_at_max_pain': float,
                'current_price_loss': float,
                'distance_from_current': float (%)
            }
        """
        if exp_date not in self.options_data:
            return {}

        calls = self.options_data[exp_date]['calls']
        puts = self.options_data[exp_date]['puts']

        # 获取所有行权价
        strikes = sorted(set(calls['strike'].tolist() + puts['strike'].tolist()))

        min_loss = float('inf')
        max_pain_strike = None

        for strike in strikes:
            # 计算在该行权价的总损失
            call_loss = 0
            put_loss = 0

            # Call 的内在价值损失
            call_itm = calls[calls['strike'] < strike]
            call_loss = ((strike - call_itm['strike']) * call_itm['openInterest']).sum()

            # Put 的内在价值损失
            put_itm = puts[puts['strike'] > strike]
            put_loss = ((put_itm['strike'] - strike) * put_itm['openInterest']).sum()

            total_loss = call_loss + put_loss

            if total_loss < min_loss:
                min_loss = total_loss
                max_pain_strike = strike

        # 计算当前价格的损失
        current_loss = 0
        call_itm_current = calls[calls['strike'] < self.current_price]
        current_loss += ((self.current_price - call_itm_current['strike']) *
                        call_itm_current['openInterest']).sum()
        put_itm_current = puts[puts['strike'] > self.current_price]
        current_loss += ((put_itm_current['strike'] - self.current_price) *
                        put_itm_current['openInterest']).sum()

        distance = ((max_pain_strike - self.current_price) / self.current_price) * 100

        return {
            'max_pain_price': round(max_pain_strike, 2),
            'total_loss_at_max_pain': round(min_loss, 2),
            'current_price_loss': round(current_loss, 2),
            'distance_from_current_pct': round(distance, 2),
            'signal': 'Bullish' if distance > 2 else ('Bearish' if distance < -2 else 'Neutral')
        }

    def black_scholes_call(self, S: float, K: float, T: float, r: float, sigma: float) -> float:
        """
        Black-Scholes Call 期权定价

        Args:
            S: 当前股价
            K: 行权价
            T: 到期时间 (年)
            r: 无风险利率
            sigma: 波动率

        Returns:
            float: Call 期权理论价格
        """
        if T <= 0:
            return max(S - K, 0)

        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        call_price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        return call_price

    def black_scholes_put(self, S: float, K: float, T: float, r: float, sigma: float) -> float:
        """Black-Scholes Put 期权定价"""
        if T <= 0:
            return max(K - S, 0)

        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        put_price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        return put_price

    def implied_volatility(self, option_price: float, S: float, K: float, T: float,
                          r: float, option_type: str = 'call') -> Optional[float]:
        """
        反推隐含波动率 (IV)

        Args:
            option_price: 期权市场价格
            S: 当前股价
            K: 行权价
            T: 到期时间 (年)
            r: 无风险利率
            option_type: 'call' or 'put'

        Returns:
            float: 隐含波动率 (小数形式, 如 0.45 = 45%)
        """
        if T <= 0 or option_price <= 0:
            return None

        def objective(sigma):
            if option_type == 'call':
                return self.black_scholes_call(S, K, T, r, sigma) - option_price
            else:
                return self.black_scholes_put(S, K, T, r, sigma) - option_price

        try:
            iv = brentq(objective, 0.001, 5.0)  # 搜索范围 0.1% ~ 500%
            return iv
        except:
            return None

    def analyze_implied_volatility(self, exp_date: str, near_money_range: float = 0.1) -> Dict:
        """
        分析隐含波动率分布

        Args:
            exp_date: 到期日
            near_money_range: ATM 范围 (默认 ±10%)

        Returns:
            Dict: IV 分析结果
        """
        if exp_date not in self.options_data:
            return {}

        calls = self.options_data[exp_date]['calls'].copy()
        puts = self.options_data[exp_date]['puts'].copy()

        # 计算到期时间
        exp_datetime = datetime.strptime(exp_date, '%Y-%m-%d')
        days_to_exp = (exp_datetime - datetime.now()).days
        T = max(days_to_exp / 365.0, 1/365)  # 至少1天

        # ATM 范围
        lower_bound = self.current_price * (1 - near_money_range)
        upper_bound = self.current_price * (1 + near_money_range)

        atm_calls = calls[(calls['strike'] >= lower_bound) & (calls['strike'] <= upper_bound)]
        atm_puts = puts[(puts['strike'] >= lower_bound) & (puts['strike'] <= upper_bound)]

        # 提取隐含波动率
        call_ivs = atm_calls['impliedVolatility'].dropna()
        put_ivs = atm_puts['impliedVolatility'].dropna()

        if len(call_ivs) == 0 and len(put_ivs) == 0:
            return {'error': 'No ATM options with IV data'}

        avg_call_iv = call_ivs.mean() if len(call_ivs) > 0 else 0
        avg_put_iv = put_ivs.mean() if len(put_ivs) > 0 else 0
        avg_iv = (avg_call_iv + avg_put_iv) / 2 if (avg_call_iv > 0 and avg_put_iv > 0) else max(avg_call_iv, avg_put_iv)

        # IV Skew (Put IV - Call IV)
        iv_skew = avg_put_iv - avg_call_iv if (avg_put_iv > 0 and avg_call_iv > 0) else 0

        # 历史波动率百分位 (近似，使用 IV 的高低)
        all_ivs = pd.concat([call_ivs, put_ivs])
        iv_percentile = (avg_iv - all_ivs.min()) / (all_ivs.max() - all_ivs.min()) * 100 if len(all_ivs) > 1 else 50

        return {
            'avg_iv': round(avg_iv * 100, 2),  # 转为百分比
            'avg_call_iv': round(avg_call_iv * 100, 2),
            'avg_put_iv': round(avg_put_iv * 100, 2),
            'iv_skew': round(iv_skew * 100, 2),
            'iv_percentile': round(iv_percentile, 1),
            'days_to_expiration': days_to_exp,
            'signal': 'High Fear' if avg_iv > 0.6 else ('Low Complacency' if avg_iv < 0.3 else 'Normal')
        }

    def detect_unusual_activity(self, volume_threshold: float = 2.0) -> List[Dict]:
        """
        检测异常期权交易 (Unusual Options Activity)

        规则: 成交量 > volume_threshold × 持仓量

        Args:
            volume_threshold: 成交量/持仓量比率阈值 (默认 2.0)

        Returns:
            List[Dict]: 异常交易列表，按交易量降序
        """
        unusual_trades = []

        for exp_date, data in self.options_data.items():
            calls = data['calls']
            puts = data['puts']

            # 计算到期天数
            exp_datetime = datetime.strptime(exp_date, '%Y-%m-%d')
            days_to_exp = (exp_datetime - datetime.now()).days

            # 检查 Calls
            for idx, row in calls.iterrows():
                vol = row['volume']
                oi = row['openInterest']

                if pd.notna(vol) and pd.notna(oi) and oi > 0 and vol > volume_threshold * oi:
                    unusual_trades.append({
                        'type': 'CALL',
                        'strike': row['strike'],
                        'expiration': exp_date,
                        'days_to_exp': days_to_exp,
                        'volume': int(vol),
                        'open_interest': int(oi),
                        'vol_oi_ratio': round(vol / oi, 2),
                        'last_price': row['lastPrice'],
                        'implied_vol': round(row['impliedVolatility'] * 100, 2) if pd.notna(row['impliedVolatility']) else None,
                        'moneyness': 'ITM' if row['strike'] < self.current_price else 'OTM',
                        'premium_traded': round(vol * row['lastPrice'] * 100, 2)  # 美元
                    })

            # 检查 Puts
            for idx, row in puts.iterrows():
                vol = row['volume']
                oi = row['openInterest']

                if pd.notna(vol) and pd.notna(oi) and oi > 0 and vol > volume_threshold * oi:
                    unusual_trades.append({
                        'type': 'PUT',
                        'strike': row['strike'],
                        'expiration': exp_date,
                        'days_to_exp': days_to_exp,
                        'volume': int(vol),
                        'open_interest': int(oi),
                        'vol_oi_ratio': round(vol / oi, 2),
                        'last_price': row['lastPrice'],
                        'implied_vol': round(row['impliedVolatility'] * 100, 2) if pd.notna(row['impliedVolatility']) else None,
                        'moneyness': 'ITM' if row['strike'] > self.current_price else 'OTM',
                        'premium_traded': round(vol * row['lastPrice'] * 100, 2)
                    })

        # 按交易金额排序
        unusual_trades.sort(key=lambda x: x['premium_traded'], reverse=True)

        return unusual_trades

    def implied_probability_range(self, exp_date: str, confidence: float = 0.68) -> Dict:
        """
        从期权价格反推市场隐含的股价波动范围

        使用 ATM Straddle 价格估算隐含波动区间:
        Range = Current Price ± (Straddle Price × √(Days/365))

        Args:
            exp_date: 到期日
            confidence: 置信水平 (0.68 = 1σ, 0.95 = 2σ)

        Returns:
            Dict: {
                'lower_bound': float,
                'upper_bound': float,
                'expected_move_pct': float,
                'confidence_level': float
            }
        """
        if exp_date not in self.options_data:
            return {}

        calls = self.options_data[exp_date]['calls']
        puts = self.options_data[exp_date]['puts']

        # 找到 ATM strike
        atm_strike = min(calls['strike'].tolist(), key=lambda x: abs(x - self.current_price))

        # 获取 ATM Call 和 Put 价格
        atm_call = calls[calls['strike'] == atm_strike]
        atm_put = puts[puts['strike'] == atm_strike]

        if atm_call.empty or atm_put.empty:
            return {'error': 'No ATM options found'}

        call_price = atm_call['lastPrice'].values[0]
        put_price = atm_put['lastPrice'].values[0]
        straddle_price = call_price + put_price

        # 计算到期时间
        exp_datetime = datetime.strptime(exp_date, '%Y-%m-%d')
        days_to_exp = (exp_datetime - datetime.now()).days
        T = max(days_to_exp / 365.0, 1/365)

        # 隐含波动 (简化公式)
        # Expected Move ≈ Straddle Price × 0.85 (经验系数)
        expected_move = straddle_price * 0.85

        # 根据置信水平调整 (1σ = 68%, 2σ = 95%)
        sigma_multiplier = 1.0 if confidence <= 0.68 else (2.0 if confidence <= 0.95 else 3.0)
        expected_move *= sigma_multiplier

        lower_bound = self.current_price - expected_move
        upper_bound = self.current_price + expected_move
        move_pct = (expected_move / self.current_price) * 100

        return {
            'expiration': exp_date,
            'days_to_expiration': days_to_exp,
            'current_price': round(self.current_price, 2),
            'lower_bound': round(lower_bound, 2),
            'upper_bound': round(upper_bound, 2),
            'expected_move_dollars': round(expected_move, 2),
            'expected_move_pct': round(move_pct, 2),
            'confidence_level': confidence,
            'atm_strike': atm_strike,
            'straddle_price': round(straddle_price, 2)
        }

    def generate_full_report(self) -> Dict:
        """
        生成完整的期权市场情报报告

        Returns:
            Dict: 完整报告 JSON
        """
        if not self.options_data:
            return {'error': 'No data loaded. Call fetch_data() first.'}

        # 选择最近的两个到期日进行详细分析
        exp_dates = sorted(list(self.options_data.keys()))[:2]

        report = {
            'ticker': self.ticker,
            'current_price': round(self.current_price, 2),
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'risk_free_rate': self.risk_free_rate,

            # 1. Put/Call Ratio
            'put_call_ratio': self.calculate_put_call_ratio(),

            # 2. 近期到期日分析
            'expiration_analysis': {},

            # 3. 异常交易检测
            'unusual_activity': self.detect_unusual_activity()[:10],  # Top 10

            # 4. 警报
            'alerts': []
        }

        # 详细分析每个到期日
        for exp_date in exp_dates:
            report['expiration_analysis'][exp_date] = {
                'max_pain': self.calculate_max_pain(exp_date),
                'iv_analysis': self.analyze_implied_volatility(exp_date),
                'implied_range': self.implied_probability_range(exp_date)
            }

        # 生成警报
        pc_ratio = report['put_call_ratio']['avg_ratio']
        if pc_ratio > 1.2:
            report['alerts'].append({
                'type': 'BEARISH_SENTIMENT',
                'message': f'Put/Call Ratio 极高 ({pc_ratio}), 市场恐慌情绪',
                'severity': 'HIGH'
            })
        elif pc_ratio < 0.6:
            report['alerts'].append({
                'type': 'BULLISH_SENTIMENT',
                'message': f'Put/Call Ratio 极低 ({pc_ratio}), 市场过度乐观',
                'severity': 'MEDIUM'
            })

        # 检查异常大额交易
        if len(report['unusual_activity']) > 0:
            top_trade = report['unusual_activity'][0]
            if top_trade['premium_traded'] > 1000000:  # $1M+
                report['alerts'].append({
                    'type': 'LARGE_TRADE',
                    'message': f"大额 {top_trade['type']} 交易: ${top_trade['premium_traded']:,.0f} at strike ${top_trade['strike']}",
                    'severity': 'HIGH'
                })

        # 检查 IV 水平
        for exp_date in exp_dates:
            iv_data = report['expiration_analysis'][exp_date]['iv_analysis']
            if 'avg_iv' in iv_data and iv_data['avg_iv'] > 80:
                report['alerts'].append({
                    'type': 'HIGH_VOLATILITY',
                    'message': f'隐含波动率异常高 ({iv_data["avg_iv"]}%) for {exp_date}',
                    'severity': 'MEDIUM'
                })

        return report

    def print_report_summary(self, report: Dict):
        """打印报告摘要（美化输出）"""
        print("\n" + "="*70)
        print(f"📊 期权市场情报报告 - {report['ticker']}")
        print("="*70)
        print(f"当前股价: ${report['current_price']}")
        print(f"时间: {report['timestamp']}")
        print()

        # Put/Call Ratio
        pc = report['put_call_ratio']
        print(f"📈 Put/Call Ratio")
        print(f"   成交量比率: {pc['volume_ratio']} ({pc['signal']})")
        print(f"   持仓量比率: {pc['oi_ratio']}")
        print(f"   综合信号: {pc['signal']}")
        print()

        # 到期日分析
        print("📅 近期到期日分析")
        for exp_date, data in report['expiration_analysis'].items():
            print(f"\n   {exp_date}:")

            # Max Pain
            mp = data['max_pain']
            if 'max_pain_price' in mp:
                print(f"   • Max Pain: ${mp['max_pain_price']} (距当前 {mp['distance_from_current_pct']:+.1f}%)")

            # IV
            iv = data['iv_analysis']
            if 'avg_iv' in iv:
                print(f"   • 隐含波动率: {iv['avg_iv']:.1f}% ({iv['signal']})")
                print(f"     Call IV: {iv['avg_call_iv']:.1f}% | Put IV: {iv['avg_put_iv']:.1f}%")

            # 隐含区间
            imp_range = data['implied_range']
            if 'lower_bound' in imp_range:
                print(f"   • 隐含波动区间: ${imp_range['lower_bound']:.2f} - ${imp_range['upper_bound']:.2f}")
                print(f"     (±{imp_range['expected_move_pct']:.1f}% in {imp_range['days_to_expiration']} days)")

        print()

        # 异常交易
        print("🚨 异常期权交易 (Top 5)")
        for i, trade in enumerate(report['unusual_activity'][:5], 1):
            print(f"   {i}. {trade['type']} ${trade['strike']} exp {trade['expiration']}")
            print(f"      成交量: {trade['volume']:,} (持仓量 {trade['open_interest']:,}, 比率 {trade['vol_oi_ratio']}x)")
            print(f"      交易金额: ${trade['premium_traded']:,.0f} | {trade['moneyness']}")

        print()

        # 警报
        if report['alerts']:
            print("⚠️  警报")
            for alert in report['alerts']:
                emoji = '🔴' if alert['severity'] == 'HIGH' else '🟡'
                print(f"   {emoji} [{alert['type']}] {alert['message']}")

        print("\n" + "="*70 + "\n")


def main():
    """示例使用"""

    # 初始化解码器
    decoder = OptionsDecoder('TSLA', risk_free_rate=0.045)

    # 获取数据
    if not decoder.fetch_data():
        return

    # 生成完整报告
    report = decoder.generate_full_report()

    # 打印摘要
    decoder.print_report_summary(report)

    # 保存 JSON
    output_path = '/Users/milton/投资大师/IntelligenceEngine_v10/outputs/options_report.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"✓ 完整报告已保存: {output_path}")


if __name__ == '__main__':
    main()
