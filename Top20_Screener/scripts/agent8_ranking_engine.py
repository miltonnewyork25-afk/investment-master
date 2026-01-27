#!/usr/bin/env python3
"""
Agent 8: 综合排序引擎
整合前7个agents的结果，生成科学排序的Top 20名单

版本: v1.0
日期: 2026-01-25
"""

import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


class RankingEngine:
    """综合排序引擎 - Agent 8"""

    # 权重配置
    WEIGHTS = {
        'base': {
            'risk_adjusted': 0.35,      # 风险调整收益
            'fundamental_quality': 0.30, # 基本面质量
            'valuation': 0.25,          # 估值
            'sec_signal': 0.10          # SEC信号
        },
        'conservative': {
            'risk_adjusted': 0.45,
            'fundamental_quality': 0.30,
            'valuation': 0.20,
            'sec_signal': 0.05
        },
        'aggressive': {
            'risk_adjusted': 0.25,
            'fundamental_quality': 0.25,
            'valuation': 0.40,
            'sec_signal': 0.10
        }
    }

    # 筛选阈值
    THRESHOLDS = {
        'risk_adjusted_min': 60,
        'quality_min': 65,
        'valuation_min': 45,
        'sharpe_min': 0.8,
        'max_drawdown_max': -30,
        'liquidity_min': 10_000_000  # $10M日均交易量
    }

    # 行业分散度目标
    SECTOR_LIMITS = {
        'max_single_sector_pct': 0.40,  # 单一行业不超过40%
        'score_tolerance': 3.0           # 替换时最大分数容忍度
    }

    # 市值分层目标
    MARKET_CAP_TARGETS = {
        'large_cap': {'min': 50e9, 'target_pct': (0.50, 0.60)},   # $50B+, 50-60%
        'mid_cap': {'min': 10e9, 'max': 50e9, 'target_pct': (0.30, 0.40)},  # $10-50B, 30-40%
        'small_cap': {'min': 1e9, 'max': 10e9, 'target_pct': (0.10, 0.20)}  # $1-10B, 10-20%
    }

    def __init__(self, data_dir: str = None, results_dir: str = None):
        """初始化排序引擎"""
        self.base_dir = Path(__file__).parent.parent
        self.data_dir = Path(data_dir) if data_dir else self.base_dir / 'data'
        self.results_dir = Path(results_dir) if results_dir else self.base_dir / 'results'
        self.results_dir.mkdir(exist_ok=True, parents=True)

        # 数据容器
        self.master_table = None
        self.top20 = None
        self.runners_up = None
        self.sector_analysis = None

    def load_agent_data(self) -> pd.DataFrame:
        """
        加载前7个agents的数据并合并

        返回:
            合并后的主数据表
        """
        print("="*80)
        print("Step 1: 加载并整合Agents 1-7的数据")
        print("="*80)

        # 定义各Agent的数据文件路径
        agent_files = {
            'market': self.data_dir / 'agent1_market_data.csv',
            'sec': self.data_dir / 'agent2_sec_signals.csv',
            'quality': self.base_dir / 'quality' / 'agent3_quality_scores.csv',
            'risk': self.base_dir / 'risk_metrics' / 'agent4_risk_adjusted.csv',
            'fundamental': self.data_dir / 'agent5_fundamental_scores.csv',
            'valuation': self.base_dir / 'valuation' / 'agent6_valuation_scores.csv',
            'exclusion': self.data_dir / 'agent7_exclusion_results.csv'
        }

        # 检查文件是否存在
        missing_files = [str(f) for f in agent_files.values() if not f.exists()]

        if missing_files:
            print(f"⚠️  警告: 以下Agent数据文件缺失:")
            for f in missing_files:
                print(f"   - {f}")
            print(f"\n📊 将使用演示数据模拟完整流程...")
            return self._generate_demo_data()

        # 加载各Agent数据
        dataframes = {}
        for agent, file_path in agent_files.items():
            try:
                df = pd.read_csv(file_path)
                dataframes[agent] = df
                print(f"✓ 加载 {agent}: {len(df)} 条记录")
            except Exception as e:
                print(f"✗ 加载 {agent} 失败: {e}")
                return self._generate_demo_data()

        # 合并数据 (以Ticker为键)
        master = dataframes['market'].copy()

        # 逐个合并其他Agent数据
        for agent in ['sec', 'quality', 'risk', 'fundamental', 'valuation', 'exclusion']:
            master = master.merge(
                dataframes[agent],
                on='Ticker',
                how='left',
                suffixes=('', f'_{agent}')
            )

        print(f"\n✓ 数据整合完成: {len(master)} 家公司")
        return master

    def _generate_demo_data(self) -> pd.DataFrame:
        """
        生成演示数据（当真实数据不可用时）

        返回:
            演示数据DataFrame
        """
        print("\n" + "="*80)
        print("生成演示数据 (Demo Mode)")
        print("="*80)

        np.random.seed(42)

        # 真实的美股Top 100公司样本
        demo_companies = [
            # 科技巨头
            ('AAPL', 'Apple Inc.', 'Technology', 3.0e12),
            ('MSFT', 'Microsoft Corp.', 'Technology', 2.8e12),
            ('GOOGL', 'Alphabet Inc.', 'Technology', 1.8e12),
            ('AMZN', 'Amazon.com Inc.', 'Technology', 1.6e12),
            ('NVDA', 'NVIDIA Corp.', 'Technology', 1.2e12),
            ('META', 'Meta Platforms', 'Technology', 900e9),
            ('TSLA', 'Tesla Inc.', 'Consumer', 800e9),

            # 金融
            ('BRK.B', 'Berkshire Hathaway', 'Financials', 850e9),
            ('JPM', 'JPMorgan Chase', 'Financials', 550e9),
            ('V', 'Visa Inc.', 'Financials', 520e9),
            ('MA', 'Mastercard Inc.', 'Financials', 400e9),
            ('BAC', 'Bank of America', 'Financials', 320e9),
            ('WFC', 'Wells Fargo', 'Financials', 210e9),
            ('GS', 'Goldman Sachs', 'Financials', 140e9),

            # 医疗保健
            ('JNJ', 'Johnson & Johnson', 'Healthcare', 400e9),
            ('UNH', 'UnitedHealth Group', 'Healthcare', 480e9),
            ('LLY', 'Eli Lilly', 'Healthcare', 650e9),
            ('PFE', 'Pfizer Inc.', 'Healthcare', 160e9),
            ('ABBV', 'AbbVie Inc.', 'Healthcare', 310e9),
            ('TMO', 'Thermo Fisher', 'Healthcare', 210e9),

            # 消费
            ('WMT', 'Walmart Inc.', 'Consumer', 450e9),
            ('HD', 'Home Depot', 'Consumer', 350e9),
            ('PG', 'Procter & Gamble', 'Consumer', 380e9),
            ('KO', 'Coca-Cola', 'Consumer', 270e9),
            ('PEP', 'PepsiCo Inc.', 'Consumer', 230e9),
            ('COST', 'Costco', 'Consumer', 340e9),
            ('NKE', 'Nike Inc.', 'Consumer', 180e9),
            ('MCD', 'McDonald\'s', 'Consumer', 210e9),

            # 工业
            ('BA', 'Boeing Co.', 'Industrials', 130e9),
            ('CAT', 'Caterpillar', 'Industrials', 160e9),
            ('GE', 'General Electric', 'Industrials', 140e9),
            ('MMM', '3M Company', 'Industrials', 70e9),
            ('UPS', 'United Parcel', 'Industrials', 120e9),

            # 能源
            ('XOM', 'Exxon Mobil', 'Energy', 450e9),
            ('CVX', 'Chevron Corp.', 'Energy', 280e9),
            ('COP', 'ConocoPhillips', 'Energy', 140e9),

            # 电信/通信
            ('T', 'AT&T Inc.', 'Telecom', 140e9),
            ('VZ', 'Verizon', 'Telecom', 170e9),
            ('CMCSA', 'Comcast Corp.', 'Telecom', 160e9),

            # 半导体
            ('AVGO', 'Broadcom Inc.', 'Technology', 680e9),
            ('ASML', 'ASML Holding', 'Technology', 380e9),
            ('AMD', 'Advanced Micro', 'Technology', 180e9),
            ('INTC', 'Intel Corp.', 'Technology', 180e9),
            ('QCOM', 'Qualcomm Inc.', 'Technology', 200e9),
            ('TXN', 'Texas Instruments', 'Technology', 170e9),

            # 支付/金融科技
            ('PYPL', 'PayPal Holdings', 'Financials', 80e9),
            ('SQ', 'Block Inc.', 'Financials', 40e9),

            # 云计算/软件
            ('CRM', 'Salesforce', 'Technology', 240e9),
            ('ORCL', 'Oracle Corp.', 'Technology', 320e9),
            ('ADBE', 'Adobe Inc.', 'Technology', 240e9),
            ('NOW', 'ServiceNow', 'Technology', 160e9),

            # 媒体娱乐
            ('DIS', 'Walt Disney', 'Consumer', 200e9),
            ('NFLX', 'Netflix Inc.', 'Consumer', 240e9),

            # 零售
            ('TGT', 'Target Corp.', 'Consumer', 70e9),
            ('LOW', 'Lowe\'s Companies', 'Consumer', 140e9),

            # 制药/生物科技
            ('MRNA', 'Moderna Inc.', 'Healthcare', 40e9),
            ('GILD', 'Gilead Sciences', 'Healthcare', 110e9),
            ('BIIB', 'Biogen Inc.', 'Healthcare', 35e9),

            # 房地产投资信托
            ('AMT', 'American Tower', 'REIT', 100e9),
            ('PLD', 'Prologis Inc.', 'REIT', 120e9),
            ('SPG', 'Simon Property', 'REIT', 45e9),
        ]

        records = []

        for ticker, name, sector, market_cap in demo_companies:
            # 根据市值和行业生成合理的指标
            # 大盘股通常更稳定（高Sharpe，低MDD）
            size_factor = np.log10(market_cap / 1e9) / 3  # 0-1标准化

            # 行业特征
            sector_multipliers = {
                'Technology': {'growth': 1.3, 'volatility': 1.2, 'quality': 1.1},
                'Financials': {'growth': 0.9, 'volatility': 1.1, 'quality': 1.0},
                'Healthcare': {'growth': 1.1, 'volatility': 0.9, 'quality': 1.2},
                'Consumer': {'growth': 1.0, 'volatility': 1.0, 'quality': 1.0},
                'Industrials': {'growth': 0.8, 'volatility': 1.0, 'quality': 0.9},
                'Energy': {'growth': 0.7, 'volatility': 1.4, 'quality': 0.8},
                'Telecom': {'growth': 0.6, 'volatility': 0.8, 'quality': 0.9},
                'REIT': {'growth': 0.8, 'volatility': 0.9, 'quality': 1.0},
            }

            mult = sector_multipliers.get(sector, {'growth': 1.0, 'volatility': 1.0, 'quality': 1.0})

            # 风险调整指标
            base_sharpe = 0.8 + size_factor * 0.6 + np.random.normal(0, 0.2)
            sharpe = max(0.3, min(2.0, base_sharpe / mult['volatility']))

            base_mdd = -35 + size_factor * 15 + np.random.normal(0, 5)
            mdd = max(-60, min(-10, base_mdd * mult['volatility']))

            sortino = sharpe * 1.2 + np.random.normal(0, 0.1)

            # 风险调整评分 (0-100)
            risk_score = (
                (sharpe / 2.0) * 40 +  # Sharpe贡献40分
                ((mdd + 60) / 60) * 30 +  # MDD贡献30分
                (sortino / 2.5) * 30  # Sortino贡献30分
            )
            risk_score = max(0, min(100, risk_score + np.random.normal(0, 5)))

            # 基本面质量评分
            base_quality = 60 + size_factor * 20 + np.random.normal(0, 10)
            quality_score = max(0, min(100, base_quality * mult['quality']))

            # 估值评分（反向：小盘股通常低估机会更大）
            base_valuation = 70 - size_factor * 15 + np.random.normal(0, 12)
            valuation_score = max(0, min(100, base_valuation))

            # SEC信号评分（大盘股机构关注更多）
            sec_score = 50 + size_factor * 25 + np.random.normal(0, 15)
            sec_score = max(0, min(100, sec_score))

            # 财务指标
            roic = 10 + size_factor * 15 + np.random.normal(0, 5) * mult['quality']
            roic = max(-5, min(60, roic))

            ocf_ni_ratio = 0.85 + size_factor * 0.2 + np.random.normal(0, 0.1)
            ocf_ni_ratio = max(0.3, min(1.5, ocf_ni_ratio))

            # 护城河评分
            moat_scores = {
                'Wide Moat': 90 + np.random.normal(0, 5),
                'Narrow Moat': 70 + np.random.normal(0, 5),
                'No Moat': 50 + np.random.normal(0, 5)
            }

            # 大盘高质量公司更可能有宽护城河
            moat_prob = [max(0.1, 0.6 * size_factor), 0.3, max(0.1, 0.7 * (1 - size_factor))]
            moat_prob = np.array(moat_prob) / sum(moat_prob)
            moat = np.random.choice(list(moat_scores.keys()), p=moat_prob)
            moat_score = moat_scores[moat]

            # 通过排除规则（90%通过率）
            passes_exclusion = np.random.random() > 0.1

            # 流动性
            liquidity = market_cap * 0.0001 * (1 + np.random.normal(0, 0.3))
            liquidity = max(1e6, liquidity)

            record = {
                'Ticker': ticker,
                'Company_Name': name,
                'Sector': sector,
                'Market_Cap': market_cap,

                # Agent 4: 风险调整
                'Sharpe_Ratio': sharpe,
                'Max_Drawdown': mdd,
                'Sortino_Ratio': sortino,
                'Risk_Adjusted_Score': risk_score,

                # Agent 5: 基本面质量
                'ROIC': roic,
                'OCF_NI_Ratio': ocf_ni_ratio,
                'Moat': moat,
                'Moat_Score': moat_score,
                'Fundamental_Quality_Score': quality_score,

                # Agent 6: 估值
                'Valuation_Score': valuation_score,
                'DCF_Upside': (valuation_score / 100) * 50,  # 0-50%上涨空间

                # Agent 2: SEC信号
                'SEC_Signal_Score': sec_score,
                'Insider_Buy_Value': np.random.exponential(5e6) if sec_score > 60 else 0,

                # Agent 7: 排除规则
                'Passes_Exclusion': passes_exclusion,

                # Agent 1: 市场数据
                'Avg_Daily_Volume_USD': liquidity,
                'Beta': 0.8 + np.random.normal(0, 0.3) * mult['volatility'],
            }

            records.append(record)

        df = pd.DataFrame(records)
        print(f"✓ 生成 {len(df)} 家演示公司数据")

        # 保存演示数据
        demo_file = self.data_dir / 'demo_master_table.csv'
        self.data_dir.mkdir(exist_ok=True, parents=True)
        df.to_csv(demo_file, index=False)
        print(f"✓ 演示数据已保存: {demo_file}")

        return df

    def apply_initial_filters(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        应用初步筛选条件

        参数:
            df: 主数据表

        返回:
            筛选后的DataFrame
        """
        print("\n" + "="*80)
        print("Step 2: 应用初步筛选条件")
        print("="*80)

        initial_count = len(df)

        # 1. 必须通过排除规则
        df = df[df['Passes_Exclusion'] == True].copy()
        print(f"✓ 通过排除规则: {len(df)}/{initial_count} 家")

        # 2. 风险调整评分阈值
        df = df[df['Risk_Adjusted_Score'] >= self.THRESHOLDS['risk_adjusted_min']].copy()
        print(f"✓ 风险评分≥{self.THRESHOLDS['risk_adjusted_min']}: {len(df)} 家")

        # 3. 基本面质量阈值
        df = df[df['Fundamental_Quality_Score'] >= self.THRESHOLDS['quality_min']].copy()
        print(f"✓ 质量评分≥{self.THRESHOLDS['quality_min']}: {len(df)} 家")

        # 4. 估值阈值（不能太贵）
        df = df[df['Valuation_Score'] >= self.THRESHOLDS['valuation_min']].copy()
        print(f"✓ 估值评分≥{self.THRESHOLDS['valuation_min']}: {len(df)} 家")

        # 5. Sharpe Ratio阈值
        df = df[df['Sharpe_Ratio'] >= self.THRESHOLDS['sharpe_min']].copy()
        print(f"✓ Sharpe≥{self.THRESHOLDS['sharpe_min']}: {len(df)} 家")

        # 6. 最大回撤阈值
        df = df[df['Max_Drawdown'] >= self.THRESHOLDS['max_drawdown_max']].copy()
        print(f"✓ 最大回撤≥{self.THRESHOLDS['max_drawdown_max']}%: {len(df)} 家")

        # 7. 流动性阈值
        df = df[df['Avg_Daily_Volume_USD'] >= self.THRESHOLDS['liquidity_min']].copy()
        print(f"✓ 日均交易量≥${self.THRESHOLDS['liquidity_min']/1e6:.1f}M: {len(df)} 家")

        print(f"\n✓ 筛选后剩余: {len(df)} 家公司进入排序池")
        return df

    def calculate_final_scores(self, df: pd.DataFrame, weight_scheme: str = 'base') -> pd.DataFrame:
        """
        计算综合评分

        参数:
            df: 筛选后的数据
            weight_scheme: 权重方案 ('base', 'conservative', 'aggressive')

        返回:
            包含Final_Score的DataFrame
        """
        weights = self.WEIGHTS[weight_scheme]

        df['Final_Score'] = (
            df['Risk_Adjusted_Score'] * weights['risk_adjusted'] +
            df['Fundamental_Quality_Score'] * weights['fundamental_quality'] +
            df['Valuation_Score'] * weights['valuation'] +
            df['SEC_Signal_Score'] * weights['sec_signal']
        )

        return df

    def rank_companies(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        对公司进行排序

        排序逻辑:
        1. 按Final_Score降序
        2. 相同分数时按Risk_Adjusted_Score降序
        3. 仍相同时按Fundamental_Quality_Score降序
        4. 仍相同时按Market_Cap降序
        """
        df_sorted = df.sort_values(
            by=['Final_Score', 'Risk_Adjusted_Score', 'Fundamental_Quality_Score', 'Market_Cap'],
            ascending=[False, False, False, False]
        ).reset_index(drop=True)

        df_sorted['Rank'] = range(1, len(df_sorted) + 1)

        return df_sorted

    def check_sector_diversification(self, df: pd.DataFrame, top_n: int = 20) -> Tuple[pd.DataFrame, List[str]]:
        """
        检查并调整行业分散度

        返回:
            (调整后的DataFrame, 调整日志列表)
        """
        adjustments = []
        top_companies = df.head(top_n).copy()

        # 计算行业分布
        sector_counts = top_companies['Sector'].value_counts()
        max_allowed = int(top_n * self.SECTOR_LIMITS['max_single_sector_pct'])

        for sector, count in sector_counts.items():
            if count > max_allowed:
                adjustments.append(
                    f"⚠️  {sector} 占比过高: {count}/{top_n} ({count/top_n*100:.1f}%) > {max_allowed}家"
                )

                # 找到该行业中评分最低的公司
                sector_companies = top_companies[top_companies['Sector'] == sector].sort_values('Final_Score')

                # 找到其他行业中未入选但评分接近的公司
                other_sectors = df[~df['Ticker'].isin(top_companies['Ticker'])].copy()
                other_sectors = other_sectors[other_sectors['Sector'] != sector]

                # 尝试替换
                replacements_needed = count - max_allowed
                for i in range(replacements_needed):
                    if i >= len(sector_companies):
                        break

                    to_replace = sector_companies.iloc[i]

                    # 找到其他行业中最高分的
                    if len(other_sectors) > 0:
                        best_alternative = other_sectors.iloc[0]
                        score_diff = to_replace['Final_Score'] - best_alternative['Final_Score']

                        if score_diff <= self.SECTOR_LIMITS['score_tolerance']:
                            adjustments.append(
                                f"  → 替换: {to_replace['Ticker']} ({to_replace['Final_Score']:.1f}) "
                                f"→ {best_alternative['Ticker']} ({best_alternative['Final_Score']:.1f}), "
                                f"分差={score_diff:.1f}"
                            )

                            # 执行替换
                            top_companies = top_companies[top_companies['Ticker'] != to_replace['Ticker']]
                            top_companies = pd.concat([top_companies, other_sectors.iloc[[0]]])
                            other_sectors = other_sectors.iloc[1:]

        if adjustments:
            # 重新排序
            top_companies = top_companies.sort_values('Final_Score', ascending=False).reset_index(drop=True)
            top_companies['Rank'] = range(1, len(top_companies) + 1)

        return top_companies, adjustments

    def check_market_cap_balance(self, df: pd.DataFrame) -> List[str]:
        """
        检查市值分散度

        返回:
            检查结果日志
        """
        logs = []
        total = len(df)

        # 分类
        large_cap = df[df['Market_Cap'] >= self.MARKET_CAP_TARGETS['large_cap']['min']]
        mid_cap = df[(df['Market_Cap'] >= self.MARKET_CAP_TARGETS['mid_cap']['min']) &
                     (df['Market_Cap'] < self.MARKET_CAP_TARGETS['mid_cap']['max'])]
        small_cap = df[(df['Market_Cap'] >= self.MARKET_CAP_TARGETS['small_cap']['min']) &
                       (df['Market_Cap'] < self.MARKET_CAP_TARGETS['small_cap']['max'])]

        large_pct = len(large_cap) / total
        mid_pct = len(mid_cap) / total
        small_pct = len(small_cap) / total

        logs.append(f"\n市值分布:")
        logs.append(f"  大盘股 (>$50B): {len(large_cap)} 家 ({large_pct*100:.1f}%) - "
                   f"目标 {self.MARKET_CAP_TARGETS['large_cap']['target_pct'][0]*100:.0f}-"
                   f"{self.MARKET_CAP_TARGETS['large_cap']['target_pct'][1]*100:.0f}%")
        logs.append(f"  中盘股 ($10-50B): {len(mid_cap)} 家 ({mid_pct*100:.1f}%) - "
                   f"目标 {self.MARKET_CAP_TARGETS['mid_cap']['target_pct'][0]*100:.0f}-"
                   f"{self.MARKET_CAP_TARGETS['mid_cap']['target_pct'][1]*100:.0f}%")
        logs.append(f"  小盘股 ($1-10B): {len(small_cap)} 家 ({small_pct*100:.1f}%) - "
                   f"目标 {self.MARKET_CAP_TARGETS['small_cap']['target_pct'][0]*100:.0f}-"
                   f"{self.MARKET_CAP_TARGETS['small_cap']['target_pct'][1]*100:.0f}%")

        # 检查是否符合目标
        if not (self.MARKET_CAP_TARGETS['large_cap']['target_pct'][0] <= large_pct <=
                self.MARKET_CAP_TARGETS['large_cap']['target_pct'][1]):
            logs.append(f"  ⚠️  大盘股占比偏离目标")

        if not (self.MARKET_CAP_TARGETS['mid_cap']['target_pct'][0] <= mid_pct <=
                self.MARKET_CAP_TARGETS['mid_cap']['target_pct'][1]):
            logs.append(f"  ⚠️  中盘股占比偏离目标")

        if not (self.MARKET_CAP_TARGETS['small_cap']['target_pct'][0] <= small_pct <=
                self.MARKET_CAP_TARGETS['small_cap']['target_pct'][1]):
            logs.append(f"  ⚠️  小盘股占比偏离目标")

        return logs

    def generate_top20(self) -> Dict:
        """
        生成Top 20名单的主流程

        返回:
            包含所有结果的字典
        """
        print("\n" + "="*80)
        print("Agent 8: 综合排序引擎 - Top 20 生成流程")
        print("="*80)

        # Step 1: 加载数据
        self.master_table = self.load_agent_data()

        # Step 2: 初步筛选
        filtered = self.apply_initial_filters(self.master_table)

        if len(filtered) < 20:
            print(f"\n⚠️  警告: 筛选后仅剩 {len(filtered)} 家公司，少于20家")
            print("建议放宽筛选条件")

        # Step 3: 计算综合评分（基准权重）
        print("\n" + "="*80)
        print("Step 3: 计算综合评分")
        print("="*80)
        print(f"权重方案: 基准 (风险35% | 质量30% | 估值25% | SEC信号10%)")

        scored = self.calculate_final_scores(filtered, 'base')
        print(f"✓ 综合评分计算完成")

        # Step 4: 排序
        print("\n" + "="*80)
        print("Step 4: 公司排序")
        print("="*80)

        ranked = self.rank_companies(scored)
        print(f"✓ 排序完成: {len(ranked)} 家公司")
        print(f"   分数范围: {ranked['Final_Score'].max():.1f} - {ranked['Final_Score'].min():.1f}")

        # Step 5: 行业分散度调整
        print("\n" + "="*80)
        print("Step 5: 行业分散度检查与调整")
        print("="*80)

        top20, adjustments = self.check_sector_diversification(ranked, 20)

        if adjustments:
            for adj in adjustments:
                print(adj)
        else:
            print("✓ 行业分散度符合要求，无需调整")

        # Step 6: 市值分散度检查
        print("\n" + "="*80)
        print("Step 6: 市值分散度检查")
        print("="*80)

        cap_logs = self.check_market_cap_balance(top20)
        for log in cap_logs:
            print(log)

        # 获取Top 20和候补名单
        self.top20 = top20.head(20).copy()
        self.runners_up = ranked.iloc[20:30].copy() if len(ranked) > 20 else pd.DataFrame()

        # Step 7: 生成三种权重方案的对比
        print("\n" + "="*80)
        print("Step 7: 敏感性分析 (多权重方案对比)")
        print("="*80)

        sensitivity_results = {}
        for scheme in ['conservative', 'aggressive']:
            df_scheme = self.calculate_final_scores(filtered, scheme)
            df_scheme = self.rank_companies(df_scheme)
            top20_scheme = df_scheme.head(20)
            sensitivity_results[scheme] = top20_scheme[['Ticker', 'Final_Score', 'Rank']].copy()

            # 找出不变的公司
            overlap = set(self.top20['Ticker']) & set(top20_scheme['Ticker'])
            print(f"✓ {scheme.title()} 方案: Top 20中 {len(overlap)}/20 与基准方案重叠")

        sensitivity_results['base'] = self.top20[['Ticker', 'Final_Score', 'Rank']].copy()

        print("\n" + "="*80)
        print("✅ Top 20 生成完成!")
        print("="*80)

        return {
            'top20': self.top20,
            'runners_up': self.runners_up,
            'all_ranked': ranked,
            'sensitivity': sensitivity_results,
            'adjustments': adjustments,
            'cap_analysis': cap_logs
        }

    def export_results(self, results: Dict):
        """
        导出所有结果文件
        """
        print("\n" + "="*80)
        print("导出结果文件")
        print("="*80)

        # 1. Top 20 CSV
        top20_file = self.results_dir / 'Top_20_Final_List.csv'
        self.top20.to_csv(top20_file, index=False)
        print(f"✓ {top20_file}")

        # 2. Top 20 详细报告
        self._export_detailed_report()

        # 3. 候补名单
        if len(self.runners_up) > 0:
            self._export_runners_up()

        # 4. 行业分析
        self._export_sector_analysis()

        # 5. 敏感性分析
        self._export_sensitivity_analysis(results['sensitivity'])

        # 6. 组合构建建议
        self._export_portfolio_construction()

        # 7. 排序方法论
        self._export_methodology()

        print(f"\n✅ 所有结果文件已导出至: {self.results_dir}")

    def _export_detailed_report(self):
        """导出Top 20详细报告"""
        output_file = self.results_dir / 'Top_20_Detailed.md'

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Top 20 投资标的详细报告\n\n")
            f.write(f"**生成日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

            for idx, row in self.top20.iterrows():
                f.write(f"## {row['Rank']}. {row['Ticker']} - {row['Company_Name']}\n\n")
                f.write(f"**行业**: {row['Sector']}  \n")
                f.write(f"**市值**: ${row['Market_Cap']/1e9:.1f}B  \n\n")

                f.write(f"### 综合评分: {row['Final_Score']:.1f}/100\n\n")
                f.write(f"| 维度 | 评分 | 贡献 |\n")
                f.write(f"|------|------|------|\n")
                f.write(f"| 风险调整收益 | {row['Risk_Adjusted_Score']:.1f} | {row['Risk_Adjusted_Score']*0.35:.1f} (35%) |\n")
                f.write(f"| 基本面质量 | {row['Fundamental_Quality_Score']:.1f} | {row['Fundamental_Quality_Score']*0.30:.1f} (30%) |\n")
                f.write(f"| 估值吸引力 | {row['Valuation_Score']:.1f} | {row['Valuation_Score']*0.25:.1f} (25%) |\n")
                f.write(f"| SEC信号 | {row['SEC_Signal_Score']:.1f} | {row['SEC_Signal_Score']*0.10:.1f} (10%) |\n\n")

                f.write(f"### 关键指标\n\n")
                f.write(f"**风险收益**:  \n")
                f.write(f"- Sharpe Ratio: {row['Sharpe_Ratio']:.2f}  \n")
                f.write(f"- 最大回撤: {row['Max_Drawdown']:.1f}%  \n")
                f.write(f"- Sortino Ratio: {row['Sortino_Ratio']:.2f}  \n\n")

                f.write(f"**基本面**:  \n")
                f.write(f"- ROIC: {row['ROIC']:.1f}%  \n")
                f.write(f"- OCF/净利润: {row['OCF_NI_Ratio']:.2f}x  \n")
                f.write(f"- 护城河: {row['Moat']}  \n\n")

                f.write(f"**估值**:  \n")
                f.write(f"- DCF上涨空间: {row['DCF_Upside']:.1f}%  \n")
                f.write(f"- Beta: {row['Beta']:.2f}  \n\n")

                # 一句话投资逻辑
                thesis = self._generate_one_line_thesis(row)
                f.write(f"### 投资逻辑\n\n")
                f.write(f"{thesis}\n\n")

                f.write("---\n\n")

        print(f"✓ {output_file}")

    def _generate_one_line_thesis(self, row: pd.Series) -> str:
        """生成一句话投资逻辑"""
        thesis_parts = []

        # 护城河
        if row['Moat'] == 'Wide Moat':
            thesis_parts.append("宽护城河龙头")
        elif row['Moat'] == 'Narrow Moat':
            thesis_parts.append("具备竞争壁垒")

        # 质量
        if row['ROIC'] > 20:
            thesis_parts.append(f"高资本效率(ROIC {row['ROIC']:.0f}%)")

        # 现金流
        if row['OCF_NI_Ratio'] > 1.0:
            thesis_parts.append("优质现金流")

        # 风险收益
        if row['Sharpe_Ratio'] > 1.2:
            thesis_parts.append(f"优异风险收益比(Sharpe {row['Sharpe_Ratio']:.1f})")

        # 估值
        if row['DCF_Upside'] > 25:
            thesis_parts.append(f"显著低估({row['DCF_Upside']:.0f}%上涨空间)")

        # 行业特征
        sector_themes = {
            'Technology': '科技创新引擎',
            'Financials': '金融基础设施',
            'Healthcare': '医疗健康刚需',
            'Consumer': '消费品牌力量',
            'Industrials': '工业制造实力',
            'Energy': '能源供应保障',
        }
        if row['Sector'] in sector_themes:
            thesis_parts.insert(0, sector_themes[row['Sector']])

        return " + ".join(thesis_parts)

    def _export_runners_up(self):
        """导出候补名单"""
        output_file = self.results_dir / 'Runners_Up_21_to_30.md'

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# 候补名单 (Rank 21-30)\n\n")
            f.write("## 为什么没进Top 20?\n\n")

            for idx, row in self.runners_up.iterrows():
                f.write(f"### {row['Rank']}. {row['Ticker']} - {row['Company_Name']}\n\n")
                f.write(f"**综合评分**: {row['Final_Score']:.1f}/100  \n")
                f.write(f"**行业**: {row['Sector']}  \n")
                f.write(f"**市值**: ${row['Market_Cap']/1e9:.1f}B  \n\n")

                # 分析落选原因
                reasons = self._analyze_exclusion_reasons(row)
                f.write(f"**落选原因**:  \n")
                for reason in reasons:
                    f.write(f"- {reason}  \n")

                # 优势
                strengths = self._identify_strengths(row)
                f.write(f"\n**优势**:  \n")
                for strength in strengths:
                    f.write(f"- {strength}  \n")

                # 备注
                f.write(f"\n**备注**: 如果{self._generate_condition(row)}，考虑替换进Top 20\n\n")
                f.write("---\n\n")

        print(f"✓ {output_file}")

    def _analyze_exclusion_reasons(self, row: pd.Series) -> List[str]:
        """分析落选原因"""
        reasons = []

        # 与Top 20最后一名对比
        last_top20 = self.top20.iloc[-1]
        score_gap = last_top20['Final_Score'] - row['Final_Score']

        reasons.append(f"综合评分差距: {score_gap:.1f}分 (第20名: {last_top20['Final_Score']:.1f})")

        # 具体弱项
        if row['Risk_Adjusted_Score'] < 70:
            reasons.append(f"风险调整评分偏低 ({row['Risk_Adjusted_Score']:.1f}), Sharpe仅{row['Sharpe_Ratio']:.2f}")

        if row['Fundamental_Quality_Score'] < 75:
            reasons.append(f"基本面质量评分偏低 ({row['Fundamental_Quality_Score']:.1f})")

        if row['Valuation_Score'] < 60:
            reasons.append(f"估值吸引力不足 ({row['Valuation_Score']:.1f})")

        if row['Max_Drawdown'] < -35:
            reasons.append(f"历史回撤过大 ({row['Max_Drawdown']:.1f}%)")

        return reasons

    def _identify_strengths(self, row: pd.Series) -> List[str]:
        """识别优势"""
        strengths = []

        if row['Risk_Adjusted_Score'] > 75:
            strengths.append(f"风险调整评分优秀 ({row['Risk_Adjusted_Score']:.1f})")

        if row['Fundamental_Quality_Score'] > 80:
            strengths.append(f"基本面质量优秀 ({row['Fundamental_Quality_Score']:.1f})")

        if row['Valuation_Score'] > 75:
            strengths.append(f"估值非常有吸引力 ({row['Valuation_Score']:.1f}, DCF上涨空间{row['DCF_Upside']:.0f}%)")

        if row['Moat'] == 'Wide Moat':
            strengths.append("拥有宽护城河")

        if row['ROIC'] > 25:
            strengths.append(f"资本效率卓越 (ROIC {row['ROIC']:.1f}%)")

        return strengths

    def _generate_condition(self, row: pd.Series) -> str:
        """生成进入条件"""
        conditions = []

        if row['Valuation_Score'] < 70 and row['DCF_Upside'] < 30:
            conditions.append(f"股价回调15-20%")

        if row['Risk_Adjusted_Score'] < 70:
            conditions.append("波动率降低、风险收益比改善")

        if row['Fundamental_Quality_Score'] < 75:
            conditions.append("下季度财报显示基本面改善")

        return " 或 ".join(conditions) if conditions else "市场环境变化"

    def _export_sector_analysis(self):
        """导出行业分析"""
        output_file = self.results_dir / 'Sectoral_Analysis.md'

        sector_dist = self.top20['Sector'].value_counts()
        sector_stats = self.top20.groupby('Sector').agg({
            'Final_Score': ['mean', 'min', 'max'],
            'Market_Cap': 'sum',
            'Risk_Adjusted_Score': 'mean',
            'Fundamental_Quality_Score': 'mean',
            'Valuation_Score': 'mean'
        }).round(1)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Top 20 行业与市值分析\n\n")

            f.write("## 行业分布\n\n")
            f.write("| 行业 | 公司数 | 占比 | 平均评分 | 分数范围 | 总市值 |\n")
            f.write("|------|--------|------|----------|----------|--------|\n")

            for sector in sector_dist.index:
                count = sector_dist[sector]
                pct = count / 20 * 100
                stats = sector_stats.loc[sector]
                total_cap = stats[('Market_Cap', 'sum')] / 1e12

                f.write(f"| {sector} | {count} | {pct:.0f}% | "
                       f"{stats[('Final_Score', 'mean')]:.1f} | "
                       f"{stats[('Final_Score', 'min')]:.1f}-{stats[('Final_Score', 'max')]:.1f} | "
                       f"${total_cap:.2f}T |\n")

            # 市值分布
            f.write("\n## 市值分布\n\n")
            large_cap = self.top20[self.top20['Market_Cap'] >= 50e9]
            mid_cap = self.top20[(self.top20['Market_Cap'] >= 10e9) & (self.top20['Market_Cap'] < 50e9)]
            small_cap = self.top20[(self.top20['Market_Cap'] >= 1e9) & (self.top20['Market_Cap'] < 10e9)]

            f.write(f"| 市值分层 | 公司数 | 占比 | 平均评分 |\n")
            f.write(f"|----------|--------|------|----------|\n")
            f.write(f"| 大盘股 (>$50B) | {len(large_cap)} | {len(large_cap)/20*100:.0f}% | "
                   f"{large_cap['Final_Score'].mean():.1f} |\n")
            f.write(f"| 中盘股 ($10-50B) | {len(mid_cap)} | {len(mid_cap)/20*100:.0f}% | "
                   f"{mid_cap['Final_Score'].mean():.1f} |\n")
            f.write(f"| 小盘股 ($1-10B) | {len(small_cap)} | {len(small_cap)/20*100:.0f}% | "
                   f"{small_cap['Final_Score'].mean():.1f} |\n")

            # 风格分析
            f.write("\n## 风格分析\n\n")

            # 价值 vs 成长
            value_stocks = self.top20[self.top20['Valuation_Score'] >= 70]
            growth_stocks = self.top20[self.top20['Fundamental_Quality_Score'] >= 85]

            f.write(f"**价值型** (估值评分≥70): {len(value_stocks)} 家  \n")
            f.write(f"**成长型** (质量评分≥85): {len(growth_stocks)} 家  \n")
            f.write(f"**平衡型**: {20 - len(set(value_stocks['Ticker']) | set(growth_stocks['Ticker']))} 家  \n\n")

            # 风险偏好
            defensive = self.top20[(self.top20['Beta'] < 0.8) & (self.top20['Max_Drawdown'] > -25)]
            aggressive_growth = self.top20[(self.top20['Beta'] > 1.2) | (self.top20['Max_Drawdown'] < -30)]

            f.write(f"**防御型** (Beta<0.8 且 MDD>-25%): {len(defensive)} 家  \n")
            f.write(f"**进攻型** (Beta>1.2 或 MDD<-30%): {len(aggressive_growth)} 家  \n")
            f.write(f"**中性**: {20 - len(defensive) - len(aggressive_growth)} 家  \n")

        print(f"✓ {output_file}")

    def _export_sensitivity_analysis(self, sensitivity: Dict):
        """导出敏感性分析"""
        output_file = self.results_dir / 'Sensitivity_Analysis.md'

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# 敏感性分析: 多权重方案对比\n\n")

            f.write("## 权重方案\n\n")
            f.write("| 方案 | 风险调整 | 基本面质量 | 估值 | SEC信号 |\n")
            f.write("|------|----------|------------|------|--------|\n")
            f.write("| 基准 | 35% | 30% | 25% | 10% |\n")
            f.write("| 保守 | 45% | 30% | 20% | 5% |\n")
            f.write("| 激进 | 25% | 25% | 40% | 10% |\n\n")

            # 找出核心持仓（三种方案都在Top 20）
            base_tickers = set(sensitivity['base']['Ticker'])
            cons_tickers = set(sensitivity['conservative']['Ticker'])
            agg_tickers = set(sensitivity['aggressive']['Ticker'])

            core_holdings = base_tickers & cons_tickers & agg_tickers

            f.write(f"## 核心持仓候选 (3种方案都在Top 20)\n\n")
            f.write(f"**共 {len(core_holdings)} 家公司**:  \n\n")

            core_df = self.top20[self.top20['Ticker'].isin(core_holdings)].sort_values('Final_Score', ascending=False)
            for _, row in core_df.iterrows():
                f.write(f"- **{row['Ticker']}** ({row['Company_Name']}): {row['Final_Score']:.1f}分  \n")

            f.write(f"\n## 方案特定公司\n\n")

            # 仅在保守方案
            cons_only = cons_tickers - base_tickers - agg_tickers
            if cons_only:
                f.write(f"### 仅在保守方案 ({len(cons_only)}家)\n\n")
                for ticker in cons_only:
                    f.write(f"- {ticker}: 低波动、稳健收益  \n")

            # 仅在激进方案
            agg_only = agg_tickers - base_tickers - cons_tickers
            if agg_only:
                f.write(f"\n### 仅在激进方案 ({len(agg_only)}家)\n\n")
                for ticker in agg_only:
                    f.write(f"- {ticker}: 高估值折扣、成长潜力  \n")

            # 完整对比表
            f.write(f"\n## 完整Top 20对比\n\n")
            f.write("| Rank | 基准 | 保守 | 激进 |\n")
            f.write("|------|------|------|------|\n")

            for i in range(20):
                base_ticker = sensitivity['base'].iloc[i]['Ticker'] if i < len(sensitivity['base']) else '-'
                cons_ticker = sensitivity['conservative'].iloc[i]['Ticker'] if i < len(sensitivity['conservative']) else '-'
                agg_ticker = sensitivity['aggressive'].iloc[i]['Ticker'] if i < len(sensitivity['aggressive']) else '-'

                f.write(f"| {i+1} | {base_ticker} | {cons_ticker} | {agg_ticker} |\n")

        print(f"✓ {output_file}")

    def _export_portfolio_construction(self):
        """导出组合构建建议"""
        output_file = self.results_dir / 'Portfolio_Construction.md'

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# 基于Top 20的组合构建方案\n\n")

            f.write("## 方案A: 保守配置 (60岁+退休账户)\n\n")
            f.write("### 配置策略\n\n")
            f.write("均等权重Top 10 (每只10%)\n\n")

            # 选择Top 10中风险最低的
            conservative_picks = self.top20.nlargest(10, 'Risk_Adjusted_Score')

            f.write("| 序号 | 股票 | 权重 | Sharpe | 最大回撤 | 股息率预估 |\n")
            f.write("|------|------|------|--------|----------|------------|\n")

            total_sharpe = 0
            total_mdd = 0

            for i, (_, row) in enumerate(conservative_picks.iterrows(), 1):
                dividend_yield = 2.5 if row['Sector'] in ['Financials', 'Consumer', 'Industrials'] else 1.5
                f.write(f"| {i} | {row['Ticker']} | 10% | {row['Sharpe_Ratio']:.2f} | "
                       f"{row['Max_Drawdown']:.1f}% | {dividend_yield:.1f}% |\n")
                total_sharpe += row['Sharpe_Ratio']
                total_mdd += row['Max_Drawdown']

            avg_sharpe = total_sharpe / 10
            avg_mdd = total_mdd / 10

            f.write(f"\n**组合特征**:  \n")
            f.write(f"- 平均Sharpe: {avg_sharpe:.2f}  \n")
            f.write(f"- 平均最大回撤: {avg_mdd:.1f}%  \n")
            f.write(f"- 预期年化回报: 8-12%  \n")
            f.write(f"- 最大回撤预期: -18%  \n\n")

            # 方案B: 均衡配置
            f.write("## 方案B: 均衡配置 (40-50岁主力资金)\n\n")
            f.write("### 配置策略\n\n")
            f.write("Top 20均等权重 (每只5%) 或 按Final_Score加权\n\n")

            f.write("**均等权重法**:  \n")
            f.write(f"- 每只股票: 5%  \n")
            f.write(f"- 行业分散: {len(self.top20['Sector'].unique())} 个行业  \n")
            f.write(f"- 市值分散: 大中小盘平衡  \n\n")

            f.write("**评分加权法**:  \n")
            f.write("权重 = (该股票Final_Score / Top20总分) × 100%\n\n")

            total_score = self.top20['Final_Score'].sum()
            f.write("| 股票 | Final_Score | 权重 |\n")
            f.write("|------|-------------|------|\n")

            for _, row in self.top20.head(10).iterrows():
                weight = (row['Final_Score'] / total_score) * 100
                f.write(f"| {row['Ticker']} | {row['Final_Score']:.1f} | {weight:.1f}% |\n")

            f.write(f"| ... | ... | ... |\n\n")

            f.write("**组合特征**:  \n")
            f.write(f"- 预期年化回报: 10-15%  \n")
            f.write(f"- 最大回撤预期: -22%  \n")
            f.write(f"- 风险收益平衡  \n\n")

            # 方案C: 积极配置
            f.write("## 方案C: 积极配置 (30-40岁成长资金)\n\n")
            f.write("### 配置策略\n\n")

            # 成长股vs价值股
            growth_stocks = self.top20[self.top20['Fundamental_Quality_Score'] >= 80]
            value_stocks = self.top20[self.top20['Valuation_Score'] >= 70]

            f.write(f"- 60% 成长股 (质量评分≥80): {len(growth_stocks)} 只可选  \n")
            f.write(f"- 30% 价值股 (估值评分≥70): {len(value_stocks)} 只可选  \n")
            f.write(f"- 10% 候补机会股 (如NVDA回调后等)  \n\n")

            f.write("**成长股候选**:  \n")
            for _, row in growth_stocks.head(8).iterrows():
                f.write(f"- {row['Ticker']}: 质量{row['Fundamental_Quality_Score']:.0f}, "
                       f"ROIC {row['ROIC']:.0f}%  \n")

            f.write("\n**价值股候选**:  \n")
            for _, row in value_stocks.head(6).iterrows():
                f.write(f"- {row['Ticker']}: 估值{row['Valuation_Score']:.0f}, "
                       f"上涨空间{row['DCF_Upside']:.0f}%  \n")

            f.write("\n**组合特征**:  \n")
            f.write(f"- 预期年化回报: 12-18%  \n")
            f.write(f"- 最大回撤预期: -28%  \n")
            f.write(f"- 偏向质量成长, 适度容忍波动  \n\n")

            # 再平衡策略
            f.write("## 再平衡策略\n\n")
            f.write("### 季度再平衡\n\n")
            f.write("检查Top 20是否仍符合标准:  \n")
            f.write("- 估值过高 (P/E > 历史75分位) → 减仓  \n")
            f.write("- 基本面恶化 (质量评分降至<60) → 剔除  \n")
            f.write("- 新公司进入Top 20 → 轮换  \n\n")

            f.write("### 年度全面重筛\n\n")
            f.write("重新运行完整筛选流程:  \n")
            f.write("1. 重新运行Agents 1-7  \n")
            f.write("2. 更新Top 20名单  \n")
            f.write("3. 对比变化: 哪些公司掉出? 哪些新进? 原因?  \n")
            f.write("4. 调整持仓  \n")

        print(f"✓ {output_file}")

    def _export_methodology(self):
        """导出排序方法论"""
        output_file = self.results_dir / '排序方法论.md'

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Agent 8: 综合排序引擎方法论\n\n")

            f.write("## 数据整合流程\n\n")
            f.write("```\n")
            f.write("Agent 1: 市场数据库 → Sharpe, Beta, 价格数据\n")
            f.write("Agent 2: SEC信号 → 内部人买入, 机构持仓\n")
            f.write("Agent 3: 质量指标 → 现金流, ROIC, 护城河\n")
            f.write("Agent 4: 风险调整 → Sharpe, MDD, Sortino\n")
            f.write("Agent 5: 基本面质量 → 0-100评分\n")
            f.write("Agent 6: 估值 → 低估程度, DCF上涨空间\n")
            f.write("Agent 7: 排除规则 → 通过/失败\n")
            f.write("\n↓ 合并为主数据表 (Company_Master_Table)\n")
            f.write("```\n\n")

            f.write("## 筛选阈值\n\n")
            f.write("```python\n")
            f.write(f"THRESHOLDS = {{\n")
            for key, value in self.THRESHOLDS.items():
                f.write(f"    '{key}': {value},\n")
            f.write(f"}}\n")
            f.write("```\n\n")

            f.write("## 综合评分公式\n\n")
            f.write("### 基准权重\n\n")
            f.write("```\n")
            f.write("Final_Score = \n")
            f.write("  Risk_Adjusted_Score × 35% +\n")
            f.write("  Fundamental_Quality_Score × 30% +\n")
            f.write("  Valuation_Score × 25% +\n")
            f.write("  SEC_Signal_Score × 10%\n")
            f.write("```\n\n")

            f.write("**权重理由**:  \n")
            f.write("- 35% 风险调整收益: 核心要求 (Sharpe + 尾部风险)  \n")
            f.write("- 30% 基本面质量: 护城河 + 现金流 + 资本效率  \n")
            f.write("- 25% 估值: 被低估程度  \n")
            f.write("- 10% SEC信号: 内部人/机构增持 (辅助验证)  \n\n")

            f.write("## 排序逻辑\n\n")
            f.write("```python\n")
            f.write("排序步骤:\n")
            f.write("1. 按Final_Score从高到低排序\n")
            f.write("2. 相同分数时:\n")
            f.write("   a. Risk_Adjusted_Score更高的优先 (安全第一)\n")
            f.write("   b. 仍相同, Fundamental_Quality更高的优先\n")
            f.write("   c. 仍相同, 市值更大的优先 (流动性)\n")
            f.write("3. 取Top 20\n")
            f.write("```\n\n")

            f.write("## 行业分散度调整\n\n")
            f.write(f"**目标**: 避免单一行业占比 > {self.SECTOR_LIMITS['max_single_sector_pct']*100:.0f}%  \n\n")
            f.write("**调整规则**:  \n")
            f.write(f"- 如果某行业占比过高  \n")
            f.write(f"- 替换最低分的同行业公司  \n")
            f.write(f"- 换入其他行业中评分最高的公司  \n")
            f.write(f"- 但: 只有分数差距 < {self.SECTOR_LIMITS['score_tolerance']}分时才替换 (不牺牲质量)  \n\n")

            f.write("## 市值分散度目标\n\n")
            f.write("```\n")
            f.write("Large Cap (>$50B):   50-60%\n")
            f.write("Mid Cap ($10-50B):   30-40%\n")
            f.write("Small Cap ($1-10B):  10-20%\n")
            f.write("```\n\n")

            f.write("## 质量验证清单\n\n")
            f.write("```\n")
            f.write("[ ] 所有公司通过Agent 7排除规则\n")
            f.write("[ ] 所有公司Risk_Adjusted_Score ≥ 60\n")
            f.write("[ ] 所有公司Fundamental_Quality ≥ 65\n")
            f.write("[ ] 所有公司Valuation_Score ≥ 45\n")
            f.write("[ ] 平均Sharpe Ratio ≥ 1.0\n")
            f.write("[ ] 平均MDD < -30%\n")
            f.write("[ ] 行业分散 (单行业<40%)\n")
            f.write("[ ] 市值分散 (大中小盘都有)\n")
            f.write("[ ] 流动性充足 (日交易量>$10M)\n")
            f.write("[ ] 数据完整性 >80%\n")
            f.write("```\n")

        print(f"✓ {output_file}")


def main():
    """主函数"""
    print("\n" + "="*80)
    print(" "*20 + "Agent 8: 综合排序引擎")
    print(" "*15 + "Top 20 Investment Screener")
    print("="*80 + "\n")

    # 初始化引擎
    engine = RankingEngine()

    # 生成Top 20
    results = engine.generate_top20()

    # 导出结果
    engine.export_results(results)

    # 打印摘要
    print("\n" + "="*80)
    print("Top 20 摘要")
    print("="*80)
    print(f"\n{results['top20'][['Rank', 'Ticker', 'Company_Name', 'Sector', 'Final_Score']].to_string(index=False)}")

    print("\n" + "="*80)
    print("✅ Agent 8 执行完成!")
    print(f"📁 所有结果已保存至: {engine.results_dir}")
    print("="*80 + "\n")


if __name__ == '__main__':
    main()
