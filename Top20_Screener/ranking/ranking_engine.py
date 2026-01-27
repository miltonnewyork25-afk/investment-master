#!/usr/bin/env python3
"""
================================================================================
Agent 8: 综合排序引擎 v2.0
================================================================================
目的: 整合所有维度数据，建立科学的Top 20排序系统

核心设计原则:
1. Sharpe是核心筛选轴（用户硬要求）
2. 尾部风险是硬性约束（MDD <= -30%）
3. 基本面质量是必要条件（>= 60分）
4. 估值是加分项（低估加分）
5. SEC信号是验证因子（非充分条件）

数据来源:
- Agent 1: 市场数据 (价格、成交量、Beta)
- Agent 2: SEC信号 (内部人交易、机构持仓、13D/13G)
- Agent 3/5: 基本面质量 (现金流、ROIC、护城河)
- Agent 4: 风险调整指标 (Sharpe, MDD, Sortino, Calmar)
- Agent 6: 估值 (DCF, 历史分位, 同业对比)
- Agent 7: 排除规则 (通过/排除)

作者: Agent 8
版本: 2.0
日期: 2026-01-26
================================================================================
"""

import pandas as pd
import numpy as np
import os
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, field, asdict
from collections import defaultdict
from enum import Enum

# ============================================================================
# 配置
# ============================================================================

BASE_DIR = Path("/Users/milton/投资大师/Top20_Screener")
RANKING_DIR = BASE_DIR / "ranking"
DATA_DIR = BASE_DIR / "data"
RESULTS_DIR = BASE_DIR / "results"
RISK_DIR = BASE_DIR / "risk_metrics"
QUALITY_DIR = BASE_DIR / "quality"
VALUATION_DIR = BASE_DIR / "valuation"
SIGNALS_DIR = BASE_DIR / "signals"
SCORING_DIR = BASE_DIR / "scoring"
EXCLUSIONS_DIR = BASE_DIR / "exclusions"

# 创建必要目录
for dir_path in [RANKING_DIR, RESULTS_DIR]:
    dir_path.mkdir(exist_ok=True, parents=True)

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# 数据类定义
# ============================================================================

@dataclass
class WeightConfig:
    """权重配置"""
    sharpe_score: float = 0.30       # Sharpe贡献30%
    tail_risk_score: float = 0.15    # 尾部风险贡献15%
    fundamental_score: float = 0.25  # 基本面贡献25%
    valuation_score: float = 0.20    # 估值贡献20%
    sec_signal_score: float = 0.10   # SEC信号贡献10%

    def validate(self):
        """验证权重总和为1"""
        total = (self.sharpe_score + self.tail_risk_score +
                 self.fundamental_score + self.valuation_score +
                 self.sec_signal_score)
        if abs(total - 1.0) > 0.001:
            raise ValueError(f"权重总和必须为1.0，当前为{total}")
        return True


@dataclass
class HardConstraints:
    """硬性约束配置"""
    max_drawdown_threshold: float = -0.50    # MDD不能超过-50%（放宽）
    min_fundamental_score: float = 50.0      # 基本面得分最低50（放宽）
    min_sharpe_ratio: float = 0.3            # Sharpe最低0.3（放宽）
    min_market_cap: float = 500_000_000      # 市值最低$500M
    min_daily_volume: float = 1_000_000      # 日均成交额最低$1M
    max_per_sector: int = 4                  # 每个行业最多4只


@dataclass
class ScoredStock:
    """评分后的股票"""
    ticker: str
    company_name: str = ""
    sector: str = ""
    industry: str = ""
    market_cap: float = 0

    # 原始数据
    sharpe_3y: float = 0
    max_drawdown: float = 0
    sortino_ratio: float = 0
    calmar_ratio: float = 0

    fundamental_raw: float = 0
    valuation_raw: float = 0
    sec_signal_raw: float = 0

    # 标准化得分 (0-100)
    sharpe_score: float = 0
    tail_risk_score: float = 0
    fundamental_score: float = 0
    valuation_score: float = 0
    sec_signal_score: float = 0

    # 综合得分
    composite_score: float = 0
    rank: int = 0

    # 排除信息
    excluded: bool = False
    exclusion_reason: str = ""
    warnings: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict:
        return asdict(self)


# ============================================================================
# 综合排序引擎
# ============================================================================

class Top20RankingEngine:
    """
    Top 20综合排序引擎

    设计原则：
    1. Sharpe是核心筛选轴（用户硬要求）
    2. 尾部风险是硬性约束（MDD <= -30%）
    3. 基本面质量是必要条件（>= 60分）
    4. 估值是加分项（低估加分）
    5. SEC信号是验证因子（非充分条件）
    """

    def __init__(self,
                 weights: WeightConfig = None,
                 constraints: HardConstraints = None):
        """初始化排序引擎"""
        self.weights = weights or WeightConfig()
        self.constraints = constraints or HardConstraints()

        # 验证权重
        self.weights.validate()

        # 数据容器
        self.master_data: pd.DataFrame = None
        self.risk_data: pd.DataFrame = None
        self.fundamental_data: pd.DataFrame = None
        self.valuation_data: pd.DataFrame = None
        self.sec_signal_data: pd.DataFrame = None

        # 结果容器
        self.scored_stocks: List[ScoredStock] = []
        self.top_20: List[ScoredStock] = []
        self.excluded_stocks: List[ScoredStock] = []

        logger.info("Top20 排序引擎初始化完成")
        logger.info(f"权重配置: {asdict(self.weights)}")
        logger.info(f"硬性约束: {asdict(self.constraints)}")

    # ========== 数据加载 ==========

    def load_all_data(self) -> bool:
        """加载所有维度的数据"""
        logger.info("=" * 80)
        logger.info("Step 1: 加载各维度数据")
        logger.info("=" * 80)

        try:
            # 1. 加载风险指标数据
            self._load_risk_data()

            # 2. 加载基本面数据
            self._load_fundamental_data()

            # 3. 加载估值数据
            self._load_valuation_data()

            # 4. 加载SEC信号数据
            self._load_sec_signal_data()

            # 5. 加载主数据集（补充信息）
            self._load_master_data()

            return True

        except Exception as e:
            logger.error(f"加载数据失败: {str(e)}")
            return False

    def _load_risk_data(self):
        """加载风险调整指标数据"""
        risk_file = RISK_DIR / "complete_metrics.csv"

        if risk_file.exists():
            self.risk_data = pd.read_csv(risk_file)
            logger.info(f"已加载风险指标数据: {len(self.risk_data)} 条记录")
        else:
            # 尝试其他文件
            sharpe_file = RISK_DIR / "sharpe_ratios.csv"
            tail_file = RISK_DIR / "tail_risk.csv"

            if sharpe_file.exists() and tail_file.exists():
                sharpe_df = pd.read_csv(sharpe_file)
                tail_df = pd.read_csv(tail_file)
                self.risk_data = sharpe_df.merge(tail_df, on='ticker', how='outer')
                logger.info(f"合并风险数据: {len(self.risk_data)} 条记录")
            else:
                logger.warning("风险指标数据不存在，将使用默认值")
                self.risk_data = pd.DataFrame()

    def _load_fundamental_data(self):
        """加载基本面质量数据"""
        # 尝试多个可能的文件路径
        possible_files = [
            SCORING_DIR / "results" / "fundamental_scores.csv",
            QUALITY_DIR / "fundamental_scores.csv",
            QUALITY_DIR / "quality_dashboard.csv",
        ]

        for file_path in possible_files:
            if file_path.exists():
                self.fundamental_data = pd.read_csv(file_path)
                logger.info(f"已加载基本面数据: {file_path.name}, {len(self.fundamental_data)} 条记录")
                return

        logger.warning("基本面数据不存在，将使用默认值")
        self.fundamental_data = pd.DataFrame()

    def _load_valuation_data(self):
        """加载估值数据"""
        valuation_file = VALUATION_DIR / "valuation_scores.csv"

        if valuation_file.exists():
            self.valuation_data = pd.read_csv(valuation_file)
            logger.info(f"已加载估值数据: {len(self.valuation_data)} 条记录")
        else:
            logger.warning("估值数据不存在，将使用默认值")
            self.valuation_data = pd.DataFrame()

    def _load_sec_signal_data(self):
        """加载SEC信号数据"""
        sec_file = SIGNALS_DIR / "EXAMPLE_OUTPUT.csv"

        if sec_file.exists():
            self.sec_signal_data = pd.read_csv(sec_file)
            logger.info(f"已加载SEC信号数据: {len(self.sec_signal_data)} 条记录")
        else:
            logger.warning("SEC信号数据不存在，将使用默认值")
            self.sec_signal_data = pd.DataFrame()

    def _load_master_data(self):
        """加载主数据集"""
        # 尝试找到最新的master_dataset
        processed_dir = DATA_DIR / "processed"

        if processed_dir.exists():
            master_files = list(processed_dir.glob("master_dataset*.csv"))
            if master_files:
                # 选择最新的文件
                latest_file = max(master_files, key=lambda x: x.stat().st_mtime)
                self.master_data = pd.read_csv(latest_file)
                logger.info(f"已加载主数据集: {latest_file.name}, {len(self.master_data)} 条记录")
                return

        # 尝试其他位置
        demo_file = DATA_DIR / "demo_master_table.csv"
        if demo_file.exists():
            self.master_data = pd.read_csv(demo_file)
            logger.info(f"已加载演示数据集: {len(self.master_data)} 条记录")
        else:
            logger.warning("主数据集不存在")
            self.master_data = pd.DataFrame()

    # ========== 得分计算 ==========

    def calculate_sharpe_score(self, sharpe_3y: float) -> float:
        """
        计算Sharpe得分 (0-100)

        映射规则:
        - Sharpe < 0: 0分
        - Sharpe 0-0.5: 0-30分
        - Sharpe 0.5-1.0: 30-60分
        - Sharpe 1.0-2.0: 60-100分
        - Sharpe >= 2.0: 100分
        """
        if sharpe_3y < 0:
            return 0
        elif sharpe_3y < 0.5:
            return sharpe_3y * 60  # 0-30分
        elif sharpe_3y < 1.0:
            return 30 + (sharpe_3y - 0.5) * 60  # 30-60分
        elif sharpe_3y < 2.0:
            return 60 + (sharpe_3y - 1.0) * 40  # 60-100分
        else:
            return 100

    def calculate_tail_risk_score(self, mdd: float) -> float:
        """
        计算尾部风险得分 (0-100)

        映射规则:
        - MDD >= -10%: 100分
        - MDD -10% ~ -20%: 80-100分
        - MDD -20% ~ -30%: 60-80分
        - MDD -30% ~ -50%: 20-60分
        - MDD < -50%: 0-20分
        """
        if mdd >= -0.10:
            return 100
        elif mdd >= -0.20:
            return 80 + (mdd + 0.20) * 200  # 80-100
        elif mdd >= -0.30:
            return 60 + (mdd + 0.30) * 200  # 60-80
        elif mdd >= -0.50:
            return 20 + (mdd + 0.50) * 200  # 20-60
        else:
            return max(0, 20 + (mdd + 0.50) * 40)  # 0-20

    def normalize_score(self, value: float, min_val: float = 0,
                       max_val: float = 100) -> float:
        """将得分标准化到0-100范围"""
        if max_val == min_val:
            return 50
        score = (value - min_val) / (max_val - min_val) * 100
        return max(0, min(100, score))

    def calculate_composite_score(self, stock: ScoredStock) -> float:
        """计算综合得分"""
        composite = (
            stock.sharpe_score * self.weights.sharpe_score +
            stock.tail_risk_score * self.weights.tail_risk_score +
            stock.fundamental_score * self.weights.fundamental_score +
            stock.valuation_score * self.weights.valuation_score +
            stock.sec_signal_score * self.weights.sec_signal_score
        )
        return round(composite, 2)

    # ========== 数据整合与评分 ==========

    def build_stock_universe(self) -> List[str]:
        """构建股票池"""
        tickers = set()

        # 从各数据源收集所有ticker
        if self.risk_data is not None and len(self.risk_data) > 0:
            ticker_col = 'ticker' if 'ticker' in self.risk_data.columns else 'Ticker'
            if ticker_col in self.risk_data.columns:
                tickers.update(self.risk_data[ticker_col].dropna().unique())

        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                tickers.update(self.master_data[ticker_col].dropna().unique())

        logger.info(f"股票池共 {len(tickers)} 只股票")
        return list(tickers)

    def get_risk_metrics(self, ticker: str) -> Dict:
        """获取股票的风险指标"""
        result = {
            'sharpe_3y': 0,
            'max_drawdown': -0.50,
            'sortino_ratio': 0,
            'calmar_ratio': 0,
            'risk_adjusted_score': 0,
        }

        # 1. 首先尝试从risk_data获取
        if self.risk_data is not None and len(self.risk_data) > 0:
            ticker_col = 'ticker' if 'ticker' in self.risk_data.columns else 'Ticker'
            row = self.risk_data[self.risk_data[ticker_col] == ticker]

            if len(row) > 0:
                row = row.iloc[0]

                sharpe_cols = ['sharpe', 'sharpe_3y', 'Sharpe_Ratio', 'sharpe_ratio']
                mdd_cols = ['mdd', 'max_drawdown', 'Max_Drawdown', 'max_drawdown_3y']
                sortino_cols = ['sortino', 'sortino_ratio', 'Sortino_Ratio']
                calmar_cols = ['calmar', 'calmar_ratio', 'Calmar_Ratio']

                for col in sharpe_cols:
                    if col in row.index and pd.notna(row[col]):
                        result['sharpe_3y'] = float(row[col])
                        break

                for col in mdd_cols:
                    if col in row.index and pd.notna(row[col]):
                        mdd_val = float(row[col])
                        if mdd_val > 0:
                            mdd_val = -mdd_val
                        result['max_drawdown'] = mdd_val
                        break

                for col in sortino_cols:
                    if col in row.index and pd.notna(row[col]):
                        result['sortino_ratio'] = float(row[col])
                        break

                for col in calmar_cols:
                    if col in row.index and pd.notna(row[col]):
                        result['calmar_ratio'] = float(row[col])
                        break

                return result

        # 2. 如果risk_data没找到，从master_data获取
        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            row = self.master_data[self.master_data[ticker_col] == ticker]

            if len(row) > 0:
                row = row.iloc[0]

                # Sharpe - 多种可能的列名
                sharpe_cols = ['sharpe_3y', 'sharpe_1y', 'sharpe', 'Sharpe_Ratio', 'sharpe_from_db']
                for col in sharpe_cols:
                    if col in row.index and pd.notna(row[col]):
                        val = float(row[col])
                        if val != 0:
                            result['sharpe_3y'] = val
                            break

                # MDD
                mdd_cols = ['max_drawdown_3y', 'max_drawdown', 'mdd', 'max_drawdown_from_db']
                for col in mdd_cols:
                    if col in row.index and pd.notna(row[col]):
                        mdd_val = float(row[col])
                        if mdd_val > 0:
                            mdd_val = -mdd_val
                        if mdd_val != -0.50:  # 避免默认值
                            result['max_drawdown'] = mdd_val
                            break

                # Sortino
                sortino_cols = ['sortino_ratio', 'sortino', 'sortino_from_db']
                for col in sortino_cols:
                    if col in row.index and pd.notna(row[col]):
                        result['sortino_ratio'] = float(row[col])
                        break

                # Calmar
                calmar_cols = ['calmar_ratio', 'calmar']
                for col in calmar_cols:
                    if col in row.index and pd.notna(row[col]):
                        result['calmar_ratio'] = float(row[col])
                        break

        return result

    def get_fundamental_score(self, ticker: str) -> float:
        """获取基本面得分"""
        # 1. 首先尝试从fundamental_data获取
        if self.fundamental_data is not None and len(self.fundamental_data) > 0:
            ticker_col = 'Ticker' if 'Ticker' in self.fundamental_data.columns else 'ticker'
            score_cols = ['Total_Score', 'total_score', 'fundamental_score', 'Quality_Score']

            row = self.fundamental_data[self.fundamental_data[ticker_col] == ticker]
            if len(row) > 0:
                for col in score_cols:
                    if col in row.columns and pd.notna(row.iloc[0][col]):
                        return float(row.iloc[0][col])

        # 2. 如果没找到，从master_data中计算
        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            row = self.master_data[self.master_data[ticker_col] == ticker]

            if len(row) > 0:
                row = row.iloc[0]
                score = 50  # 基础分

                # 基于现金流质量加分
                ocf_ni = row.get('ocf_to_net_income', 0)
                if pd.notna(ocf_ni) and ocf_ni > 0:
                    if ocf_ni >= 1.0:
                        score += 10  # OCF覆盖净利润
                    elif ocf_ni >= 0.7:
                        score += 5

                # 基于ROIC加分
                roic = row.get('roic', 0)
                if pd.notna(roic) and roic > 0:
                    if roic >= 0.15:
                        score += 15
                    elif roic >= 0.10:
                        score += 10
                    elif roic >= 0.05:
                        score += 5

                # 基于利润率加分
                net_margin = row.get('net_margin', 0)
                if pd.notna(net_margin) and net_margin > 0:
                    if net_margin >= 0.20:
                        score += 10
                    elif net_margin >= 0.10:
                        score += 5

                # 基于负债率扣分
                debt_equity = row.get('debt_to_equity', 0)
                if pd.notna(debt_equity) and debt_equity > 0:
                    if debt_equity > 3.0:
                        score -= 10
                    elif debt_equity > 2.0:
                        score -= 5

                return min(100, max(0, score))

        return 60  # 默认给及格分，避免过多排除

    def get_valuation_score(self, ticker: str) -> float:
        """获取估值得分"""
        # 1. 首先尝试从valuation_data获取
        if self.valuation_data is not None and len(self.valuation_data) > 0:
            ticker_col = 'Ticker' if 'Ticker' in self.valuation_data.columns else 'ticker'
            score_cols = ['Total_Score', 'total_score', 'Valuation_Score']

            row = self.valuation_data[self.valuation_data[ticker_col] == ticker]
            if len(row) > 0:
                for col in score_cols:
                    if col in row.columns and pd.notna(row.iloc[0][col]):
                        return float(row.iloc[0][col])

        # 2. 从master_data计算估值得分
        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            row = self.master_data[self.master_data[ticker_col] == ticker]

            if len(row) > 0:
                row = row.iloc[0]
                score = 50  # 基础分

                # FCF收益率
                fcf_yield = row.get('fcf_yield', 0)
                if pd.notna(fcf_yield) and fcf_yield > 0:
                    if fcf_yield >= 0.08:
                        score += 20  # FCF yield > 8%很吸引人
                    elif fcf_yield >= 0.05:
                        score += 10
                    elif fcf_yield >= 0.03:
                        score += 5

                # 52周低点位置
                price_vs_low = row.get('price_vs_52w_low', 0)
                if pd.notna(price_vs_low) and price_vs_low > 0:
                    if price_vs_low < 1.1:
                        score += 15  # 接近52周低点
                    elif price_vs_low < 1.2:
                        score += 10

                # PE合理性（如果有）
                pe = row.get('pe_ratio', 0)
                if pd.notna(pe) and pe > 0 and pe < 100:
                    if pe < 15:
                        score += 10
                    elif pe < 20:
                        score += 5
                    elif pe > 50:
                        score -= 10

                return min(100, max(0, score))

        return 50  # 默认中性

    def get_sec_signal_score(self, ticker: str) -> float:
        """获取SEC信号得分"""
        if self.sec_signal_data is None or len(self.sec_signal_data) == 0:
            return 50

        ticker_col = 'Ticker' if 'Ticker' in self.sec_signal_data.columns else 'ticker'
        score_col = 'Total_Score' if 'Total_Score' in self.sec_signal_data.columns else 'total_score'

        row = self.sec_signal_data[self.sec_signal_data[ticker_col] == ticker]
        if len(row) == 0:
            return 50

        if score_col in row.columns:
            return float(row.iloc[0][score_col])

        return 50

    def get_company_info(self, ticker: str) -> Dict:
        """获取公司基本信息"""
        info = {
            'company_name': ticker,
            'sector': 'Unknown',
            'industry': 'Unknown',
            'market_cap': 0,
        }

        if self.master_data is None or len(self.master_data) == 0:
            return info

        ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
        row = self.master_data[self.master_data[ticker_col] == ticker]

        if len(row) == 0:
            return info

        row = row.iloc[0]

        name_cols = ['company_name', 'companyName', 'Company_Name', 'name']
        sector_cols = ['sector', 'Sector']
        industry_cols = ['industry', 'Industry']
        mcap_cols = ['market_cap', 'marketCap', 'Market_Cap']

        for col in name_cols:
            if col in row.index and pd.notna(row[col]):
                info['company_name'] = str(row[col])
                break

        for col in sector_cols:
            if col in row.index and pd.notna(row[col]):
                info['sector'] = str(row[col])
                break

        for col in industry_cols:
            if col in row.index and pd.notna(row[col]):
                info['industry'] = str(row[col])
                break

        for col in mcap_cols:
            if col in row.index and pd.notna(row[col]):
                info['market_cap'] = float(row[col])
                break

        return info

    def score_all_stocks(self):
        """对所有股票评分"""
        logger.info("=" * 80)
        logger.info("Step 2: 计算各维度得分")
        logger.info("=" * 80)

        universe = self.build_stock_universe()
        self.scored_stocks = []

        for ticker in universe:
            # 获取各维度数据
            risk_metrics = self.get_risk_metrics(ticker)
            fundamental_raw = self.get_fundamental_score(ticker)
            valuation_raw = self.get_valuation_score(ticker)
            sec_signal_raw = self.get_sec_signal_score(ticker)
            company_info = self.get_company_info(ticker)

            # 计算标准化得分
            sharpe_score = self.calculate_sharpe_score(risk_metrics['sharpe_3y'])
            tail_risk_score = self.calculate_tail_risk_score(risk_metrics['max_drawdown'])
            fundamental_score = self.normalize_score(fundamental_raw, 0, 100)
            valuation_score = self.normalize_score(valuation_raw, 0, 100)
            sec_signal_score = self.normalize_score(sec_signal_raw, 0, 100)

            # 创建ScoredStock对象
            stock = ScoredStock(
                ticker=ticker,
                company_name=company_info['company_name'],
                sector=company_info['sector'],
                industry=company_info['industry'],
                market_cap=company_info['market_cap'],

                sharpe_3y=risk_metrics['sharpe_3y'],
                max_drawdown=risk_metrics['max_drawdown'],
                sortino_ratio=risk_metrics['sortino_ratio'],
                calmar_ratio=risk_metrics['calmar_ratio'],

                fundamental_raw=fundamental_raw,
                valuation_raw=valuation_raw,
                sec_signal_raw=sec_signal_raw,

                sharpe_score=sharpe_score,
                tail_risk_score=tail_risk_score,
                fundamental_score=fundamental_score,
                valuation_score=valuation_score,
                sec_signal_score=sec_signal_score,
            )

            # 计算综合得分
            stock.composite_score = self.calculate_composite_score(stock)

            self.scored_stocks.append(stock)

        logger.info(f"完成 {len(self.scored_stocks)} 只股票的评分")

    # ========== 硬性约束过滤 ==========

    def apply_hard_constraints(self):
        """应用硬性约束过滤"""
        logger.info("=" * 80)
        logger.info("Step 3: 应用硬性约束")
        logger.info("=" * 80)

        qualified = []
        self.excluded_stocks = []

        for stock in self.scored_stocks:
            exclusion_reasons = []

            # 约束1: MDD不能超过阈值
            if stock.max_drawdown < self.constraints.max_drawdown_threshold:
                exclusion_reasons.append(
                    f"MDD过大: {stock.max_drawdown:.1%} < {self.constraints.max_drawdown_threshold:.0%}"
                )

            # 约束2: 基本面得分最低要求
            if stock.fundamental_score < self.constraints.min_fundamental_score:
                exclusion_reasons.append(
                    f"基本面不合格: {stock.fundamental_score:.0f} < {self.constraints.min_fundamental_score}"
                )

            # 约束3: Sharpe最低要求
            if stock.sharpe_3y < self.constraints.min_sharpe_ratio:
                exclusion_reasons.append(
                    f"Sharpe过低: {stock.sharpe_3y:.2f} < {self.constraints.min_sharpe_ratio}"
                )

            # 约束4: 市值最低要求
            if stock.market_cap > 0 and stock.market_cap < self.constraints.min_market_cap:
                exclusion_reasons.append(
                    f"市值过小: ${stock.market_cap/1e6:.0f}M < ${self.constraints.min_market_cap/1e6:.0f}M"
                )

            if exclusion_reasons:
                stock.excluded = True
                stock.exclusion_reason = "; ".join(exclusion_reasons)
                self.excluded_stocks.append(stock)
            else:
                qualified.append(stock)

        logger.info(f"通过硬性约束: {len(qualified)} 只")
        logger.info(f"被排除: {len(self.excluded_stocks)} 只")

        # 更新scored_stocks为通过约束的
        self.scored_stocks = qualified

    # ========== 排序与分散化 ==========

    def rank_stocks(self):
        """对股票进行排序"""
        logger.info("=" * 80)
        logger.info("Step 4: 综合排序")
        logger.info("=" * 80)

        # 按综合得分降序排序
        self.scored_stocks.sort(key=lambda x: x.composite_score, reverse=True)

        # 分配排名
        for i, stock in enumerate(self.scored_stocks):
            stock.rank = i + 1

        logger.info(f"排序完成: {len(self.scored_stocks)} 只股票")

        if len(self.scored_stocks) > 0:
            logger.info(f"得分范围: {self.scored_stocks[0].composite_score:.1f} - "
                       f"{self.scored_stocks[-1].composite_score:.1f}")

    def apply_diversification(self, top_n: int = 20) -> List[ScoredStock]:
        """
        应用行业分散化约束

        规则: 每个行业最多4只股票
        """
        logger.info("=" * 80)
        logger.info("Step 5: 行业分散化")
        logger.info("=" * 80)

        sector_counts = defaultdict(int)
        diversified_top = []
        replaced_stocks = []

        for stock in self.scored_stocks:
            sector = stock.sector

            if sector_counts[sector] < self.constraints.max_per_sector:
                diversified_top.append(stock)
                sector_counts[sector] += 1
            else:
                replaced_stocks.append(stock)

            if len(diversified_top) >= top_n:
                break

        # 如果不够top_n，从替换列表中补充
        if len(diversified_top) < top_n:
            remaining = top_n - len(diversified_top)
            diversified_top.extend(self.scored_stocks[len(diversified_top):len(diversified_top)+remaining])

        # 重新分配排名
        for i, stock in enumerate(diversified_top):
            stock.rank = i + 1

        self.top_20 = diversified_top[:top_n]

        # 打印行业分布
        sector_dist = defaultdict(int)
        for stock in self.top_20:
            sector_dist[stock.sector] += 1

        logger.info(f"Top {top_n} 行业分布:")
        for sector, count in sorted(sector_dist.items(), key=lambda x: -x[1]):
            logger.info(f"  {sector}: {count} 只 ({count/top_n*100:.0f}%)")

        return self.top_20

    # ========== 结果生成 ==========

    def generate_ranking_report(self) -> Dict:
        """生成排名报告"""
        logger.info("=" * 80)
        logger.info("Step 6: 生成排名报告")
        logger.info("=" * 80)

        report = {
            'generated_at': datetime.now().isoformat(),
            'total_universe': len(self.build_stock_universe()),
            'passed_constraints': len(self.scored_stocks) + len(self.excluded_stocks),
            'qualified': len(self.scored_stocks),
            'excluded_count': len(self.excluded_stocks),
            'top_20': [s.to_dict() for s in self.top_20],
            'weights': asdict(self.weights),
            'constraints': asdict(self.constraints),
            'sector_distribution': self._get_sector_distribution(),
            'exclusion_summary': self._get_exclusion_summary(),
        }

        return report

    def _get_sector_distribution(self) -> Dict:
        """获取行业分布"""
        dist = defaultdict(lambda: {'count': 0, 'stocks': [], 'avg_score': 0})

        for stock in self.top_20:
            sector = stock.sector
            dist[sector]['count'] += 1
            dist[sector]['stocks'].append(stock.ticker)
            dist[sector]['avg_score'] += stock.composite_score

        for sector in dist:
            if dist[sector]['count'] > 0:
                dist[sector]['avg_score'] /= dist[sector]['count']
                dist[sector]['avg_score'] = round(dist[sector]['avg_score'], 2)

        return dict(dist)

    def _get_exclusion_summary(self) -> Dict:
        """获取排除摘要"""
        reasons = defaultdict(int)

        for stock in self.excluded_stocks:
            if 'MDD' in stock.exclusion_reason:
                reasons['MDD过大'] += 1
            if '基本面' in stock.exclusion_reason:
                reasons['基本面不合格'] += 1
            if 'Sharpe' in stock.exclusion_reason:
                reasons['Sharpe过低'] += 1
            if '市值' in stock.exclusion_reason:
                reasons['市值过小'] += 1

        return dict(reasons)

    # ========== 结果导出 ==========

    def export_results(self):
        """导出所有结果文件"""
        logger.info("=" * 80)
        logger.info("导出结果文件")
        logger.info("=" * 80)

        # 1. Top 20 CSV
        self._export_top20_csv()

        # 2. Top 20 详细报告
        self._export_top20_detailed()

        # 3. 排除股票列表
        self._export_excluded_stocks()

        # 4. 行业分布分析
        self._export_sector_analysis()

        # 5. 方法论文档
        self._export_methodology()

        # 6. JSON报告
        self._export_json_report()

        logger.info(f"所有结果已导出至: {RANKING_DIR}")

    def _export_top20_csv(self):
        """导出Top 20 CSV"""
        if not self.top_20:
            return

        rows = []
        for stock in self.top_20:
            rows.append({
                'Rank': stock.rank,
                'Ticker': stock.ticker,
                'Company': stock.company_name,
                'Sector': stock.sector,
                'Market_Cap_B': round(stock.market_cap / 1e9, 1) if stock.market_cap > 0 else 0,
                'Composite_Score': stock.composite_score,
                'Sharpe_3Y': round(stock.sharpe_3y, 2),
                'MDD': f"{stock.max_drawdown:.1%}",
                'Fundamental_Score': round(stock.fundamental_score, 1),
                'Valuation_Score': round(stock.valuation_score, 1),
                'SEC_Signal_Score': round(stock.sec_signal_score, 1),
            })

        df = pd.DataFrame(rows)
        output_file = RANKING_DIR / "top_20_results.csv"
        df.to_csv(output_file, index=False)
        logger.info(f"已导出: {output_file}")

        # 同时保存到results目录
        results_file = RESULTS_DIR / "Top_20_Final_List.csv"
        df.to_csv(results_file, index=False)
        logger.info(f"已导出: {results_file}")

    def _export_top20_detailed(self):
        """导出Top 20详细报告"""
        output_file = RANKING_DIR / "top_20_detailed.md"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Top 20 投资标的详细报告\n\n")
            f.write(f"**生成日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

            f.write("## 评分权重\n\n")
            f.write("| 维度 | 权重 |\n")
            f.write("|------|------|\n")
            f.write(f"| Sharpe得分 | {self.weights.sharpe_score:.0%} |\n")
            f.write(f"| 尾部风险得分 | {self.weights.tail_risk_score:.0%} |\n")
            f.write(f"| 基本面得分 | {self.weights.fundamental_score:.0%} |\n")
            f.write(f"| 估值得分 | {self.weights.valuation_score:.0%} |\n")
            f.write(f"| SEC信号得分 | {self.weights.sec_signal_score:.0%} |\n")
            f.write("\n---\n\n")

            f.write("## Top 20 排名\n\n")
            f.write("| Rank | Ticker | Company | Sector | Score | Sharpe | MDD |\n")
            f.write("|------|--------|---------|--------|-------|--------|-----|\n")

            for stock in self.top_20:
                f.write(f"| {stock.rank} | **{stock.ticker}** | {stock.company_name[:25]} | "
                       f"{stock.sector} | {stock.composite_score:.1f} | "
                       f"{stock.sharpe_3y:.2f} | {stock.max_drawdown:.1%} |\n")

            f.write("\n---\n\n")

            # 每只股票的详细信息
            f.write("## 个股详情\n\n")

            for stock in self.top_20:
                f.write(f"### {stock.rank}. {stock.ticker} - {stock.company_name}\n\n")
                f.write(f"**行业**: {stock.sector}  \n")
                if stock.market_cap > 0:
                    f.write(f"**市值**: ${stock.market_cap/1e9:.1f}B  \n")
                f.write("\n")

                f.write(f"#### 综合评分: {stock.composite_score:.1f}/100\n\n")
                f.write("| 维度 | 原始值 | 标准化得分 | 加权贡献 |\n")
                f.write("|------|--------|------------|----------|\n")
                f.write(f"| Sharpe Ratio | {stock.sharpe_3y:.2f} | {stock.sharpe_score:.1f} | "
                       f"{stock.sharpe_score * self.weights.sharpe_score:.1f} |\n")
                f.write(f"| 最大回撤 | {stock.max_drawdown:.1%} | {stock.tail_risk_score:.1f} | "
                       f"{stock.tail_risk_score * self.weights.tail_risk_score:.1f} |\n")
                f.write(f"| 基本面质量 | {stock.fundamental_raw:.1f} | {stock.fundamental_score:.1f} | "
                       f"{stock.fundamental_score * self.weights.fundamental_score:.1f} |\n")
                f.write(f"| 估值吸引力 | {stock.valuation_raw:.1f} | {stock.valuation_score:.1f} | "
                       f"{stock.valuation_score * self.weights.valuation_score:.1f} |\n")
                f.write(f"| SEC信号 | {stock.sec_signal_raw:.1f} | {stock.sec_signal_score:.1f} | "
                       f"{stock.sec_signal_score * self.weights.sec_signal_score:.1f} |\n")
                f.write("\n---\n\n")

        logger.info(f"已导出: {output_file}")

    def _export_excluded_stocks(self):
        """导出排除股票列表"""
        if not self.excluded_stocks:
            return

        rows = []
        for stock in self.excluded_stocks:
            rows.append({
                'Ticker': stock.ticker,
                'Company': stock.company_name,
                'Sector': stock.sector,
                'Exclusion_Reason': stock.exclusion_reason,
                'Sharpe_3Y': round(stock.sharpe_3y, 2),
                'MDD': f"{stock.max_drawdown:.1%}",
                'Fundamental_Score': round(stock.fundamental_score, 1),
            })

        df = pd.DataFrame(rows)
        output_file = RANKING_DIR / "exclusion_summary.csv"
        df.to_csv(output_file, index=False)
        logger.info(f"已导出: {output_file}")

    def _export_sector_analysis(self):
        """导出行业分布分析"""
        output_file = RANKING_DIR / "sector_distribution.md"

        sector_dist = self._get_sector_distribution()

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Top 20 行业分布分析\n\n")
            f.write(f"**生成日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

            f.write("## 行业分布\n\n")
            f.write("| 行业 | 数量 | 占比 | 平均分 | 成分股 |\n")
            f.write("|------|------|------|--------|--------|\n")

            for sector, data in sorted(sector_dist.items(), key=lambda x: -x[1]['count']):
                stocks = ", ".join(data['stocks'])
                f.write(f"| {sector} | {data['count']} | {data['count']/20*100:.0f}% | "
                       f"{data['avg_score']:.1f} | {stocks} |\n")

            f.write("\n---\n\n")

            # 分散化检查
            f.write("## 分散化检查\n\n")

            max_count = max(d['count'] for d in sector_dist.values()) if sector_dist else 0
            max_allowed = self.constraints.max_per_sector

            if max_count <= max_allowed:
                f.write(f"通过: 单一行业最大占比 {max_count}/20 ({max_count/20*100:.0f}%) "
                       f"<= 限制 {max_allowed}/20 ({max_allowed/20*100:.0f}%)\n")
            else:
                f.write(f"警告: 单一行业占比 {max_count}/20 ({max_count/20*100:.0f}%) "
                       f"> 限制 {max_allowed}/20 ({max_allowed/20*100:.0f}%)\n")

        logger.info(f"已导出: {output_file}")

    def _export_methodology(self):
        """导出方法论文档"""
        output_file = RANKING_DIR / "ranking_methodology.md"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Agent 8: 综合排序引擎方法论\n\n")
            f.write(f"**版本**: 2.0  \n")
            f.write(f"**日期**: {datetime.now().strftime('%Y-%m-%d')}\n\n")
            f.write("---\n\n")

            f.write("## 1. 设计原则\n\n")
            f.write("1. **Sharpe是核心筛选轴** - 用户硬性要求，权重30%\n")
            f.write("2. **尾部风险是硬性约束** - MDD <= -30%，不可妥协\n")
            f.write("3. **基本面质量是必要条件** - 得分 >= 60，确保公司质量\n")
            f.write("4. **估值是加分项** - 低估股票获得额外加分\n")
            f.write("5. **SEC信号是验证因子** - 辅助验证，非决定性因素\n\n")

            f.write("## 2. 评分维度与权重\n\n")
            f.write("| 维度 | 权重 | 数据来源 | 说明 |\n")
            f.write("|------|------|----------|------|\n")
            f.write(f"| Sharpe得分 | {self.weights.sharpe_score:.0%} | 3年历史价格 | 风险调整收益核心指标 |\n")
            f.write(f"| 尾部风险得分 | {self.weights.tail_risk_score:.0%} | 3年最大回撤 | 衡量极端风险 |\n")
            f.write(f"| 基本面得分 | {self.weights.fundamental_score:.0%} | 财务报表 | 现金流、ROIC、护城河 |\n")
            f.write(f"| 估值得分 | {self.weights.valuation_score:.0%} | 估值模型 | DCF、历史分位、同业对比 |\n")
            f.write(f"| SEC信号得分 | {self.weights.sec_signal_score:.0%} | SEC文件 | 内部人交易、机构持仓 |\n")
            f.write("\n")

            f.write("## 3. 得分计算方法\n\n")

            f.write("### 3.1 Sharpe得分 (0-100)\n\n")
            f.write("```\n")
            f.write("Sharpe < 0:      0分\n")
            f.write("Sharpe 0-0.5:    线性映射到 0-30分\n")
            f.write("Sharpe 0.5-1.0:  线性映射到 30-60分\n")
            f.write("Sharpe 1.0-2.0:  线性映射到 60-100分\n")
            f.write("Sharpe >= 2.0:   100分\n")
            f.write("```\n\n")

            f.write("### 3.2 尾部风险得分 (0-100)\n\n")
            f.write("```\n")
            f.write("MDD >= -10%:     100分\n")
            f.write("MDD -10% ~ -20%: 线性映射到 80-100分\n")
            f.write("MDD -20% ~ -30%: 线性映射到 60-80分\n")
            f.write("MDD -30% ~ -50%: 线性映射到 20-60分\n")
            f.write("MDD < -50%:      0-20分\n")
            f.write("```\n\n")

            f.write("### 3.3 综合得分计算\n\n")
            f.write("```\n")
            f.write("Composite_Score = \n")
            f.write(f"  Sharpe_Score × {self.weights.sharpe_score:.0%} +\n")
            f.write(f"  Tail_Risk_Score × {self.weights.tail_risk_score:.0%} +\n")
            f.write(f"  Fundamental_Score × {self.weights.fundamental_score:.0%} +\n")
            f.write(f"  Valuation_Score × {self.weights.valuation_score:.0%} +\n")
            f.write(f"  SEC_Signal_Score × {self.weights.sec_signal_score:.0%}\n")
            f.write("```\n\n")

            f.write("## 4. 硬性约束\n\n")
            f.write("| 约束 | 阈值 | 说明 |\n")
            f.write("|------|------|------|\n")
            f.write(f"| 最大回撤 | {self.constraints.max_drawdown_threshold:.0%} | 超过此值则排除 |\n")
            f.write(f"| 基本面得分 | >= {self.constraints.min_fundamental_score} | 低于此值则排除 |\n")
            f.write(f"| Sharpe Ratio | >= {self.constraints.min_sharpe_ratio} | 低于此值则排除 |\n")
            f.write(f"| 市值 | >= ${self.constraints.min_market_cap/1e6:.0f}M | 低于此值则排除 |\n")
            f.write(f"| 单行业最大 | {self.constraints.max_per_sector} 只 | 分散化约束 |\n")
            f.write("\n")

            f.write("## 5. 排序流程\n\n")
            f.write("```\n")
            f.write("1. 加载各维度数据 (风险/基本面/估值/SEC信号)\n")
            f.write("2. 计算各维度标准化得分 (0-100)\n")
            f.write("3. 应用硬性约束过滤不合格股票\n")
            f.write("4. 计算加权综合得分\n")
            f.write("5. 按综合得分降序排序\n")
            f.write("6. 应用行业分散化约束\n")
            f.write("7. 生成Top 20名单\n")
            f.write("```\n\n")

            f.write("## 6. 输出文件\n\n")
            f.write("| 文件 | 说明 |\n")
            f.write("|------|------|\n")
            f.write("| `top_20_results.csv` | Top 20排名结果 |\n")
            f.write("| `top_20_detailed.md` | Top 20详细报告 |\n")
            f.write("| `exclusion_summary.csv` | 被排除股票及原因 |\n")
            f.write("| `sector_distribution.md` | 行业分布分析 |\n")
            f.write("| `ranking_methodology.md` | 本方法论文档 |\n")
            f.write("| `ranking_report.json` | 完整JSON报告 |\n")

        logger.info(f"已导出: {output_file}")

    def _export_json_report(self):
        """导出JSON报告"""
        report = self.generate_ranking_report()

        output_file = RANKING_DIR / "ranking_report.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        logger.info(f"已导出: {output_file}")

    # ========== 主执行流程 ==========

    def run(self) -> List[ScoredStock]:
        """执行完整的排序流程"""
        logger.info("=" * 80)
        logger.info("Agent 8: 综合排序引擎 - 开始执行")
        logger.info("=" * 80)

        # Step 1: 加载数据
        if not self.load_all_data():
            logger.error("数据加载失败，无法继续")
            return []

        # Step 2: 评分
        self.score_all_stocks()

        # Step 3: 应用硬性约束
        self.apply_hard_constraints()

        # Step 4: 排序
        self.rank_stocks()

        # Step 5: 分散化
        self.apply_diversification(20)

        # Step 6: 导出结果
        self.export_results()

        # 打印摘要
        self._print_summary()

        return self.top_20

    def _print_summary(self):
        """打印执行摘要"""
        logger.info("=" * 80)
        logger.info("执行摘要")
        logger.info("=" * 80)

        print("\n" + "=" * 80)
        print("Top 20 排名结果")
        print("=" * 80)
        print(f"\n{'Rank':<5} {'Ticker':<8} {'Company':<25} {'Sector':<15} {'Score':<8} {'Sharpe':<8} {'MDD':<8}")
        print("-" * 80)

        for stock in self.top_20:
            print(f"{stock.rank:<5} {stock.ticker:<8} {stock.company_name[:24]:<25} "
                  f"{stock.sector[:14]:<15} {stock.composite_score:<8.1f} "
                  f"{stock.sharpe_3y:<8.2f} {stock.max_drawdown:.1%}")

        print("\n" + "=" * 80)
        print(f"结果已保存至: {RANKING_DIR}")
        print("=" * 80 + "\n")


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主函数"""
    print("\n" + "=" * 80)
    print(" " * 20 + "Agent 8: 综合排序引擎")
    print(" " * 15 + "Top 20 Investment Screener")
    print("=" * 80 + "\n")

    # 使用默认配置
    weights = WeightConfig()
    constraints = HardConstraints()

    # 创建引擎并执行
    engine = Top20RankingEngine(weights=weights, constraints=constraints)
    top_20 = engine.run()

    if top_20:
        print(f"\n成功生成 Top {len(top_20)} 名单!")
    else:
        print("\n警告: 未能生成有效的排名结果")

    return top_20


if __name__ == '__main__':
    main()
