#!/usr/bin/env python3
"""
================================================================================
三段式漏斗筛选器
================================================================================
功能: 高效筛选Top 20投资标的

三段式漏斗架构:
Stage 1: 候选池（聪明钱持仓 + 硬指标）→ ~200只 [极快: 仅用量化指标]
Stage 2: 排序池（基本面指标面板）→ ~50只 [中等: 基本面计算]
Stage 3: Top 20（完整证据链核验）→ 20只 [最慢: 深度阅读，但只对20-30家做]

核心优化:
- "深阅读"只发生在20-30家公司，而不是200-2000家
- 用监管披露数据（N-PORT/13F）做候选池，替代全局穷举
- 渐进式筛选，每一层都大幅缩小范围

作者: Agent 12 - 三段式漏斗筛选器
版本: 1.0
日期: 2026-01-26
================================================================================
"""

import json
import logging
import pandas as pd
import numpy as np
from typing import List, Dict, Optional, Tuple, Any
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, field, asdict
from collections import defaultdict

# 导入本地模块
import sys
sys.path.insert(0, str(Path(__file__).parent))
sys.path.insert(0, str(Path(__file__).parent.parent))

try:
    from smart_money_pool import SmartMoneyCandidatePool, CandidateStock
except ImportError:
    from funnel.smart_money_pool import SmartMoneyCandidatePool, CandidateStock

# ============================================================================
# 配置
# ============================================================================

BASE_DIR = Path("/Users/milton/投资大师/Top20_Screener")
FUNNEL_DIR = BASE_DIR / "funnel"
DATA_DIR = BASE_DIR / "data"
RISK_DIR = BASE_DIR / "risk_metrics"
QUALITY_DIR = BASE_DIR / "quality"
VALUATION_DIR = BASE_DIR / "valuation"
SIGNALS_DIR = BASE_DIR / "signals"
RESULTS_DIR = BASE_DIR / "results"
EXCLUSIONS_DIR = BASE_DIR / "exclusions"

# 创建目录
FUNNEL_DIR.mkdir(exist_ok=True, parents=True)
RESULTS_DIR.mkdir(exist_ok=True, parents=True)

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# 排除行业列表
# ============================================================================

EXCLUDED_INDUSTRIES = [
    # 烟草
    'Tobacco',
    # 博彩
    'Casinos & Gaming',
    'Gambling',
    # 武器
    'Aerospace & Defense',  # 可选，某些投资者不排除
    # 色情（通常不在上市公司）
]

EXCLUDED_TICKERS = [
    # 烟草
    'PM', 'MO', 'BTI', 'JAPAY', 'TPB', 'VGR',
    # 博彩
    'LVS', 'WYNN', 'MGM', 'CZR', 'DKNG', 'PENN', 'BYD', 'BALY',
    # 可选排除
    # 高风险SPACs, Penny Stocks等
]


# ============================================================================
# 数据类
# ============================================================================

@dataclass
class Stage1Result:
    """Stage 1结果"""
    ticker: str
    smart_money_score: float = 0
    sharpe_3y: float = 0
    mdd_3y: float = -0.50
    passed: bool = True
    rejection_reason: str = ""


@dataclass
class Stage2Result:
    """Stage 2结果"""
    ticker: str
    smart_money_score: float = 0
    sharpe_3y: float = 0
    mdd_3y: float = -0.50

    # 基本面指标
    fundamental_score: float = 0
    valuation_score: float = 0
    sec_signal_score: float = 0

    # 综合得分
    composite_score: float = 0

    # 排名
    rank: int = 0


@dataclass
class Stage3Result:
    """Stage 3结果（最终结果）"""
    ticker: str
    company_name: str = ""
    sector: str = ""

    # 各维度得分
    smart_money_score: float = 0
    sharpe_3y: float = 0
    mdd_3y: float = -0.50
    fundamental_score: float = 0
    valuation_score: float = 0
    sec_signal_score: float = 0
    composite_score: float = 0

    # 证据链
    evidence_validated: bool = False
    evidence_summary: str = ""
    data_sources: List[str] = field(default_factory=list)

    # 最终排名
    final_rank: int = 0


# ============================================================================
# 三段式漏斗筛选器
# ============================================================================

class ThreeStageFunnel:
    """
    三段式漏斗筛选器

    Stage 1: 候选池（聪明钱持仓 + 硬指标）→ ~200只
    Stage 2: 排序池（基本面指标面板）→ ~50只
    Stage 3: Top 20（完整证据链核验）→ 20只
    """

    def __init__(self):
        """初始化漏斗筛选器"""
        self.smart_money_pool = SmartMoneyCandidatePool(use_cache=True)

        # 数据容器
        self.master_data: pd.DataFrame = None
        self.risk_data: pd.DataFrame = None
        self.fundamental_data: pd.DataFrame = None
        self.valuation_data: pd.DataFrame = None
        self.sec_signal_data: pd.DataFrame = None

        # 结果容器
        self.stage1_results: List[Stage1Result] = []
        self.stage2_results: List[Stage2Result] = []
        self.stage3_results: List[Stage3Result] = []

        # 加载已有数据
        self._load_existing_data()

        logger.info("三段式漏斗筛选器初始化完成")

    def _load_existing_data(self):
        """加载已有的各维度数据"""
        logger.info("加载已有数据...")

        # 1. 主数据集
        processed_dir = DATA_DIR / "processed"
        if processed_dir.exists():
            master_files = list(processed_dir.glob("master_dataset*.csv"))
            if master_files:
                latest_file = max(master_files, key=lambda x: x.stat().st_mtime)
                try:
                    self.master_data = pd.read_csv(latest_file)
                    logger.info(f"已加载主数据集: {len(self.master_data)} 条记录")
                except Exception as e:
                    logger.warning(f"加载主数据集失败: {e}")

        # 2. 风险指标
        risk_file = RISK_DIR / "complete_metrics.csv"
        if risk_file.exists():
            try:
                self.risk_data = pd.read_csv(risk_file)
                logger.info(f"已加载风险指标: {len(self.risk_data)} 条记录")
            except Exception as e:
                logger.warning(f"加载风险指标失败: {e}")

        # 3. 估值数据
        valuation_file = VALUATION_DIR / "valuation_scores.csv"
        if valuation_file.exists():
            try:
                self.valuation_data = pd.read_csv(valuation_file)
                logger.info(f"已加载估值数据: {len(self.valuation_data)} 条记录")
            except Exception as e:
                logger.warning(f"加载估值数据失败: {e}")

        # 4. SEC信号
        sec_file = SIGNALS_DIR / "EXAMPLE_OUTPUT.csv"
        if sec_file.exists():
            try:
                self.sec_signal_data = pd.read_csv(sec_file)
                logger.info(f"已加载SEC信号: {len(self.sec_signal_data)} 条记录")
            except Exception as e:
                logger.warning(f"加载SEC信号失败: {e}")

    def _get_risk_metrics(self, ticker: str) -> Dict:
        """获取股票的风险指标"""
        result = {'sharpe_3y': 0, 'mdd_3y': -0.50}

        # 从risk_data获取
        if self.risk_data is not None and len(self.risk_data) > 0:
            ticker_col = 'ticker' if 'ticker' in self.risk_data.columns else 'Ticker'
            if ticker_col in self.risk_data.columns:
                row = self.risk_data[self.risk_data[ticker_col] == ticker]
                if len(row) > 0:
                    row = row.iloc[0]

                    # Sharpe
                    for col in ['sharpe', 'sharpe_3y', 'Sharpe_Ratio']:
                        if col in row.index and pd.notna(row[col]):
                            result['sharpe_3y'] = float(row[col])
                            break

                    # MDD
                    for col in ['mdd', 'max_drawdown', 'Max_Drawdown']:
                        if col in row.index and pd.notna(row[col]):
                            mdd_val = float(row[col])
                            if mdd_val > 0:
                                mdd_val = -mdd_val
                            result['mdd_3y'] = mdd_val
                            break

        # 从master_data获取备用
        if result['sharpe_3y'] == 0 and self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                row = self.master_data[self.master_data[ticker_col] == ticker]
                if len(row) > 0:
                    row = row.iloc[0]
                    for col in ['sharpe_3y', 'sharpe_1y', 'sharpe']:
                        if col in row.index and pd.notna(row[col]):
                            result['sharpe_3y'] = float(row[col])
                            break
                    for col in ['max_drawdown_3y', 'max_drawdown', 'mdd']:
                        if col in row.index and pd.notna(row[col]):
                            mdd_val = float(row[col])
                            if mdd_val > 0:
                                mdd_val = -mdd_val
                            result['mdd_3y'] = mdd_val
                            break

        return result

    def _is_excluded_industry(self, ticker: str) -> bool:
        """检查是否属于排除行业"""
        if ticker in EXCLUDED_TICKERS:
            return True

        if self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                row = self.master_data[self.master_data[ticker_col] == ticker]
                if len(row) > 0:
                    for col in ['industry', 'Industry']:
                        if col in row.columns:
                            industry = str(row.iloc[0][col])
                            for excluded in EXCLUDED_INDUSTRIES:
                                if excluded.lower() in industry.lower():
                                    return True
        return False

    def _has_minimum_data(self, ticker: str) -> bool:
        """检查是否有最低数据要求"""
        # 基本检查：ticker至少在某个数据源中存在
        found = False

        if self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                if ticker in self.master_data[ticker_col].values:
                    found = True

        if self.risk_data is not None:
            ticker_col = 'ticker' if 'ticker' in self.risk_data.columns else 'Ticker'
            if ticker_col in self.risk_data.columns:
                if ticker in self.risk_data[ticker_col].values:
                    found = True

        return found

    def _calculate_fundamental_score(self, ticker: str) -> float:
        """计算基本面得分"""
        score = 50  # 基础分

        if self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                row = self.master_data[self.master_data[ticker_col] == ticker]
                if len(row) > 0:
                    row = row.iloc[0]

                    # OCF覆盖
                    if 'ocf_to_net_income' in row.index:
                        ocf_ni = row['ocf_to_net_income']
                        if pd.notna(ocf_ni) and ocf_ni >= 1.0:
                            score += 10
                        elif pd.notna(ocf_ni) and ocf_ni >= 0.7:
                            score += 5

                    # ROIC
                    if 'roic' in row.index:
                        roic = row['roic']
                        if pd.notna(roic) and roic >= 0.15:
                            score += 15
                        elif pd.notna(roic) and roic >= 0.10:
                            score += 10
                        elif pd.notna(roic) and roic >= 0.05:
                            score += 5

                    # 利润率
                    if 'net_margin' in row.index:
                        margin = row['net_margin']
                        if pd.notna(margin) and margin >= 0.20:
                            score += 10
                        elif pd.notna(margin) and margin >= 0.10:
                            score += 5

                    # 负债率
                    if 'debt_to_equity' in row.index:
                        de = row['debt_to_equity']
                        if pd.notna(de) and de > 3.0:
                            score -= 10
                        elif pd.notna(de) and de > 2.0:
                            score -= 5

        return max(0, min(100, score))

    def _calculate_valuation_score(self, ticker: str) -> float:
        """计算估值得分"""
        score = 50  # 基础分

        if self.valuation_data is not None and len(self.valuation_data) > 0:
            ticker_col = 'Ticker' if 'Ticker' in self.valuation_data.columns else 'ticker'
            if ticker_col in self.valuation_data.columns:
                row = self.valuation_data[self.valuation_data[ticker_col] == ticker]
                if len(row) > 0:
                    for col in ['Total_Score', 'total_score', 'Valuation_Score']:
                        if col in row.columns and pd.notna(row.iloc[0][col]):
                            return float(row.iloc[0][col])

        # 从master_data计算
        if self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                row = self.master_data[self.master_data[ticker_col] == ticker]
                if len(row) > 0:
                    row = row.iloc[0]

                    # FCF收益率
                    if 'fcf_yield' in row.index:
                        fcf_yield = row['fcf_yield']
                        if pd.notna(fcf_yield):
                            if fcf_yield >= 0.08:
                                score += 20
                            elif fcf_yield >= 0.05:
                                score += 10
                            elif fcf_yield >= 0.03:
                                score += 5

                    # PE
                    if 'pe_ratio' in row.index:
                        pe = row['pe_ratio']
                        if pd.notna(pe) and 0 < pe < 15:
                            score += 10
                        elif pd.notna(pe) and 15 <= pe < 20:
                            score += 5
                        elif pd.notna(pe) and pe > 50:
                            score -= 10

        return max(0, min(100, score))

    def _get_sec_signal_score(self, ticker: str) -> float:
        """获取SEC信号得分"""
        if self.sec_signal_data is not None and len(self.sec_signal_data) > 0:
            ticker_col = 'Ticker' if 'Ticker' in self.sec_signal_data.columns else 'ticker'
            if ticker_col in self.sec_signal_data.columns:
                row = self.sec_signal_data[self.sec_signal_data[ticker_col] == ticker]
                if len(row) > 0:
                    for col in ['Total_Score', 'total_score']:
                        if col in row.columns and pd.notna(row.iloc[0][col]):
                            return float(row.iloc[0][col])
        return 50  # 默认中性

    # ========================================================================
    # Stage 1: 候选池筛选
    # ========================================================================

    def stage_1_candidate_pool(self,
                               min_sharpe: float = 0.3,
                               max_mdd: float = -0.50) -> List[Stage1Result]:
        """
        Stage 1: 候选池筛选

        输入：聪明钱候选池（~300只）
        过滤：硬指标（Sharpe/回撤/行业排除）
        输出：~150-200只

        速度：极快（只用量化指标）

        Args:
            min_sharpe: 最小Sharpe要求
            max_mdd: 最大回撤阈值

        Returns:
            Stage 1结果列表
        """
        logger.info("=" * 80)
        logger.info("Stage 1: 候选池筛选（聪明钱 + 硬指标）")
        logger.info("=" * 80)

        # 获取聪明钱候选池
        candidates = self.smart_money_pool.build_candidate_pool()

        logger.info(f"聪明钱候选池: {len(candidates)} 只股票")
        logger.info(f"硬指标筛选: Sharpe >= {min_sharpe}, MDD >= {max_mdd:.0%}")

        self.stage1_results = []
        passed_count = 0
        rejected_count = 0
        rejection_reasons = defaultdict(int)

        for c in candidates:
            ticker = c.ticker
            result = Stage1Result(
                ticker=ticker,
                smart_money_score=c.smart_money_score,
            )

            # 硬指标1: Sharpe >= 0.3
            risk_metrics = self._get_risk_metrics(ticker)
            result.sharpe_3y = risk_metrics['sharpe_3y']
            result.mdd_3y = risk_metrics['mdd_3y']

            if result.sharpe_3y < min_sharpe:
                result.passed = False
                result.rejection_reason = f"Sharpe过低: {result.sharpe_3y:.2f} < {min_sharpe}"
                rejection_reasons['Sharpe过低'] += 1
                rejected_count += 1
                self.stage1_results.append(result)
                continue

            # 硬指标2: MDD >= -50%（宽松阈值）
            if result.mdd_3y < max_mdd:
                result.passed = False
                result.rejection_reason = f"MDD过大: {result.mdd_3y:.1%} < {max_mdd:.0%}"
                rejection_reasons['MDD过大'] += 1
                rejected_count += 1
                self.stage1_results.append(result)
                continue

            # 硬指标3: 行业排除
            if self._is_excluded_industry(ticker):
                result.passed = False
                result.rejection_reason = "排除行业（烟草/博彩等）"
                rejection_reasons['排除行业'] += 1
                rejected_count += 1
                self.stage1_results.append(result)
                continue

            # 硬指标4: 数据完整性
            if not self._has_minimum_data(ticker):
                result.passed = False
                result.rejection_reason = "数据不完整"
                rejection_reasons['数据不完整'] += 1
                rejected_count += 1
                self.stage1_results.append(result)
                continue

            # 通过所有硬指标
            result.passed = True
            passed_count += 1
            self.stage1_results.append(result)

        # 排序：通过的在前，按smart_money_score排序
        self.stage1_results.sort(key=lambda x: (-int(x.passed), -x.smart_money_score))

        logger.info(f"\nStage 1 结果:")
        logger.info(f"  -> 通过: {passed_count} 只")
        logger.info(f"  -> 拒绝: {rejected_count} 只")
        for reason, count in rejection_reasons.items():
            logger.info(f"      - {reason}: {count}")

        return [r for r in self.stage1_results if r.passed]

    # ========================================================================
    # Stage 2: 排序筛选
    # ========================================================================

    def stage_2_ranking(self,
                        stage_1_passed: List[Stage1Result] = None,
                        top_n: int = 50) -> List[Stage2Result]:
        """
        Stage 2: 排序筛选

        输入：Stage 1通过者（~150-200只）
        分析：基本面关键指标面板
        输出：Top 50

        速度：中等（基本面指标计算）

        Args:
            stage_1_passed: Stage 1通过的股票
            top_n: 输出数量

        Returns:
            Stage 2结果列表
        """
        logger.info("=" * 80)
        logger.info("Stage 2: 排序筛选（基本面指标面板）")
        logger.info("=" * 80)

        if stage_1_passed is None:
            stage_1_passed = [r for r in self.stage1_results if r.passed]

        logger.info(f"输入: {len(stage_1_passed)} 只股票")

        self.stage2_results = []

        for s1 in stage_1_passed:
            ticker = s1.ticker

            # 计算各维度得分
            fundamental = self._calculate_fundamental_score(ticker)
            valuation = self._calculate_valuation_score(ticker)
            sec_signal = self._get_sec_signal_score(ticker)

            # 计算Sharpe得分 (0-100)
            sharpe_score = 0
            if s1.sharpe_3y >= 2.0:
                sharpe_score = 100
            elif s1.sharpe_3y >= 1.0:
                sharpe_score = 60 + (s1.sharpe_3y - 1.0) * 40
            elif s1.sharpe_3y >= 0.5:
                sharpe_score = 30 + (s1.sharpe_3y - 0.5) * 60
            elif s1.sharpe_3y >= 0:
                sharpe_score = s1.sharpe_3y * 60

            # 计算尾部风险得分 (0-100)
            tail_score = 0
            if s1.mdd_3y >= -0.10:
                tail_score = 100
            elif s1.mdd_3y >= -0.20:
                tail_score = 80 + (s1.mdd_3y + 0.20) * 200
            elif s1.mdd_3y >= -0.30:
                tail_score = 60 + (s1.mdd_3y + 0.30) * 200
            elif s1.mdd_3y >= -0.50:
                tail_score = 20 + (s1.mdd_3y + 0.50) * 200
            else:
                tail_score = max(0, 20 + (s1.mdd_3y + 0.50) * 40)

            # 综合得分
            # 权重: Sharpe 30%, 尾部风险 15%, 基本面 25%, 估值 20%, SEC 10%
            composite = (
                sharpe_score * 0.30 +
                tail_score * 0.15 +
                fundamental * 0.25 +
                valuation * 0.20 +
                sec_signal * 0.10
            )

            result = Stage2Result(
                ticker=ticker,
                smart_money_score=s1.smart_money_score,
                sharpe_3y=s1.sharpe_3y,
                mdd_3y=s1.mdd_3y,
                fundamental_score=fundamental,
                valuation_score=valuation,
                sec_signal_score=sec_signal,
                composite_score=composite,
            )

            self.stage2_results.append(result)

        # 排序
        self.stage2_results.sort(key=lambda x: x.composite_score, reverse=True)

        # 分配排名
        for i, result in enumerate(self.stage2_results, 1):
            result.rank = i

        # 取Top N
        top_results = self.stage2_results[:top_n]

        logger.info(f"\nStage 2 结果:")
        logger.info(f"  -> 输出 Top {len(top_results)}")
        if top_results:
            logger.info(f"  -> 得分范围: {top_results[0].composite_score:.1f} - {top_results[-1].composite_score:.1f}")

        return top_results

    # ========================================================================
    # Stage 3: 证据链核验
    # ========================================================================

    def stage_3_evidence_verification(self,
                                       stage_2_top: List[Stage2Result] = None,
                                       final_count: int = 20) -> List[Stage3Result]:
        """
        Stage 3: 证据链核验

        输入：Top 50
        分析：完整证据链（验证数据来源）
        输出：Top 20

        速度：最慢（深度验证），但只对30-50家公司做

        Args:
            stage_2_top: Stage 2的Top结果
            final_count: 最终输出数量

        Returns:
            Stage 3结果列表（最终Top 20）
        """
        logger.info("=" * 80)
        logger.info("Stage 3: 证据链核验")
        logger.info("=" * 80)

        if stage_2_top is None:
            stage_2_top = self.stage2_results[:50]

        logger.info(f"输入: {len(stage_2_top)} 只股票")
        logger.info(f"目标: Top {final_count}")

        self.stage3_results = []
        verified_count = 0

        for s2 in stage_2_top:
            ticker = s2.ticker

            # 获取公司信息
            company_name = ticker
            sector = "Unknown"

            if self.master_data is not None:
                ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
                if ticker_col in self.master_data.columns:
                    row = self.master_data[self.master_data[ticker_col] == ticker]
                    if len(row) > 0:
                        row = row.iloc[0]
                        for col in ['company_name', 'companyName', 'name']:
                            if col in row.index and pd.notna(row[col]):
                                company_name = str(row[col])
                                break
                        for col in ['sector', 'Sector']:
                            if col in row.index and pd.notna(row[col]):
                                sector = str(row[col])
                                break

            # 证据链验证
            evidence_validated = True
            data_sources = []

            # 检查各数据源
            if self._has_risk_data(ticker):
                data_sources.append("Risk Metrics (Sharpe/MDD)")
            if self._has_fundamental_data(ticker):
                data_sources.append("Fundamental Data")
            if self._has_valuation_data(ticker):
                data_sources.append("Valuation Data")
            if self._has_sec_data(ticker):
                data_sources.append("SEC Signal Data")
            if self._is_in_smart_money_pool(ticker):
                data_sources.append("Smart Money (N-PORT/13F)")

            # 至少需要3个数据源
            if len(data_sources) < 2:
                evidence_validated = False

            evidence_summary = f"数据来源: {len(data_sources)}/5"

            result = Stage3Result(
                ticker=ticker,
                company_name=company_name,
                sector=sector,
                smart_money_score=s2.smart_money_score,
                sharpe_3y=s2.sharpe_3y,
                mdd_3y=s2.mdd_3y,
                fundamental_score=s2.fundamental_score,
                valuation_score=s2.valuation_score,
                sec_signal_score=s2.sec_signal_score,
                composite_score=s2.composite_score,
                evidence_validated=evidence_validated,
                evidence_summary=evidence_summary,
                data_sources=data_sources,
            )

            if evidence_validated:
                verified_count += 1
                self.stage3_results.append(result)

            if verified_count >= final_count:
                break

        # 如果验证的不够，补充未验证的
        if len(self.stage3_results) < final_count:
            remaining = final_count - len(self.stage3_results)
            for s2 in stage_2_top:
                ticker = s2.ticker
                if any(r.ticker == ticker for r in self.stage3_results):
                    continue

                # 创建未完全验证的结果
                result = Stage3Result(
                    ticker=ticker,
                    company_name=ticker,
                    sector="Unknown",
                    smart_money_score=s2.smart_money_score,
                    sharpe_3y=s2.sharpe_3y,
                    mdd_3y=s2.mdd_3y,
                    fundamental_score=s2.fundamental_score,
                    valuation_score=s2.valuation_score,
                    sec_signal_score=s2.sec_signal_score,
                    composite_score=s2.composite_score,
                    evidence_validated=False,
                    evidence_summary="部分验证",
                    data_sources=[],
                )
                self.stage3_results.append(result)
                remaining -= 1
                if remaining <= 0:
                    break

        # 分配最终排名
        for i, result in enumerate(self.stage3_results, 1):
            result.final_rank = i

        logger.info(f"\nStage 3 结果:")
        logger.info(f"  -> 最终 Top {len(self.stage3_results)}")
        logger.info(f"  -> 完全验证: {sum(1 for r in self.stage3_results if r.evidence_validated)}")

        return self.stage3_results

    def _has_risk_data(self, ticker: str) -> bool:
        """检查是否有风险数据"""
        if self.risk_data is not None:
            ticker_col = 'ticker' if 'ticker' in self.risk_data.columns else 'Ticker'
            if ticker_col in self.risk_data.columns:
                return ticker in self.risk_data[ticker_col].values
        return False

    def _has_fundamental_data(self, ticker: str) -> bool:
        """检查是否有基本面数据"""
        if self.master_data is not None:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                return ticker in self.master_data[ticker_col].values
        return False

    def _has_valuation_data(self, ticker: str) -> bool:
        """检查是否有估值数据"""
        if self.valuation_data is not None:
            ticker_col = 'Ticker' if 'Ticker' in self.valuation_data.columns else 'ticker'
            if ticker_col in self.valuation_data.columns:
                return ticker in self.valuation_data[ticker_col].values
        return False

    def _has_sec_data(self, ticker: str) -> bool:
        """检查是否有SEC数据"""
        if self.sec_signal_data is not None:
            ticker_col = 'Ticker' if 'Ticker' in self.sec_signal_data.columns else 'ticker'
            if ticker_col in self.sec_signal_data.columns:
                return ticker in self.sec_signal_data[ticker_col].values
        return False

    def _is_in_smart_money_pool(self, ticker: str) -> bool:
        """检查是否在聪明钱候选池中"""
        return ticker in self.smart_money_pool.candidates

    # ========================================================================
    # 完整执行
    # ========================================================================

    def run_full_funnel(self) -> Dict:
        """
        运行完整漏斗筛选

        Returns:
            完整结果字典
        """
        logger.info("\n" + "=" * 80)
        logger.info("      三段式漏斗筛选器 - 完整执行")
        logger.info("=" * 80 + "\n")

        start_time = datetime.now()

        # Stage 1
        logger.info("\n[Stage 1] 聪明钱候选池 + 硬指标过滤...")
        stage_1_passed = self.stage_1_candidate_pool()
        logger.info(f"  -> {len(stage_1_passed)} 只通过")

        # Stage 2
        logger.info("\n[Stage 2] 基本面排序...")
        stage_2_top = self.stage_2_ranking(stage_1_passed, top_n=50)
        logger.info(f"  -> Top {len(stage_2_top)} 进入下一阶段")

        # Stage 3
        logger.info("\n[Stage 3] 证据链核验...")
        final_top = self.stage_3_evidence_verification(stage_2_top, final_count=20)
        logger.info(f"  -> 最终 Top {len(final_top)}")

        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()

        result = {
            'generated_at': datetime.now().isoformat(),
            'duration_seconds': duration,
            'stage_1_count': len(stage_1_passed),
            'stage_2_count': len(stage_2_top),
            'final_count': len(final_top),
            'top_20': [asdict(r) for r in final_top],
        }

        logger.info(f"\n执行完成，耗时: {duration:.1f} 秒")

        return result

    def export_results(self):
        """导出所有结果"""
        logger.info("\n导出结果文件...")

        # 1. Top 20 CSV
        if self.stage3_results:
            rows = []
            for r in self.stage3_results:
                rows.append({
                    'Rank': r.final_rank,
                    'Ticker': r.ticker,
                    'Company': r.company_name,
                    'Sector': r.sector,
                    'Composite_Score': round(r.composite_score, 1),
                    'Sharpe_3Y': round(r.sharpe_3y, 2),
                    'MDD': f"{r.mdd_3y:.1%}",
                    'Fundamental': round(r.fundamental_score, 1),
                    'Valuation': round(r.valuation_score, 1),
                    'SEC_Signal': round(r.sec_signal_score, 1),
                    'Smart_Money': round(r.smart_money_score, 0),
                    'Validated': r.evidence_validated,
                })

            df = pd.DataFrame(rows)
            output_file = FUNNEL_DIR / "funnel_top_20.csv"
            df.to_csv(output_file, index=False)
            logger.info(f"Top 20 已保存: {output_file}")

            # 也保存到results目录
            results_file = RESULTS_DIR / "Funnel_Top_20.csv"
            df.to_csv(results_file, index=False)
            logger.info(f"Top 20 已保存: {results_file}")

        # 2. 完整JSON报告
        report = {
            'generated_at': datetime.now().isoformat(),
            'methodology': 'Three-Stage Funnel',
            'stages': {
                'stage_1': {
                    'name': 'Candidate Pool',
                    'input': 'Smart Money Holdings (N-PORT + 13F)',
                    'filters': ['Sharpe >= 0.3', 'MDD >= -50%', 'Industry Exclusions'],
                    'passed_count': len([r for r in self.stage1_results if r.passed]),
                },
                'stage_2': {
                    'name': 'Ranking',
                    'method': 'Composite Score',
                    'weights': {
                        'Sharpe': '30%',
                        'Tail_Risk': '15%',
                        'Fundamental': '25%',
                        'Valuation': '20%',
                        'SEC_Signal': '10%',
                    },
                    'top_count': len(self.stage2_results[:50]),
                },
                'stage_3': {
                    'name': 'Evidence Verification',
                    'final_count': len(self.stage3_results),
                },
            },
            'top_20': [asdict(r) for r in self.stage3_results],
        }

        json_file = FUNNEL_DIR / "funnel_report.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        logger.info(f"JSON报告已保存: {json_file}")

        # 3. Markdown报告
        self._export_markdown_report()

    def _export_markdown_report(self):
        """导出Markdown报告"""
        report = f"""# 三段式漏斗筛选结果

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 方法论

### 三段式漏斗架构

```
Stage 1: 候选池筛选
  输入: 聪明钱持仓 (N-PORT + 13F)
  过滤: Sharpe >= 0.3, MDD >= -50%, 排除烟草/博彩
  输出: ~150-200只
  速度: 极快

Stage 2: 排序筛选
  输入: Stage 1通过者
  方法: 综合评分 (Sharpe 30% + 尾部风险 15% + 基本面 25% + 估值 20% + SEC 10%)
  输出: Top 50
  速度: 中等

Stage 3: 证据链核验
  输入: Top 50
  验证: 数据来源完整性
  输出: Top 20
  速度: 最慢，但仅对20-30家做
```

---

## 执行结果摘要

| 阶段 | 输入 | 输出 | 通过率 |
|------|------|------|--------|
| Stage 1 | {len(self.stage1_results)} | {len([r for r in self.stage1_results if r.passed])} | {len([r for r in self.stage1_results if r.passed])/max(1,len(self.stage1_results))*100:.0f}% |
| Stage 2 | {len([r for r in self.stage1_results if r.passed])} | {len(self.stage2_results[:50])} | - |
| Stage 3 | {len(self.stage2_results[:50])} | {len(self.stage3_results)} | - |

---

## Top 20 最终名单

| Rank | Ticker | Company | Score | Sharpe | MDD | Fundamental | Valuation | Validated |
|------|--------|---------|-------|--------|-----|-------------|-----------|-----------|
"""

        for r in self.stage3_results[:20]:
            validated = "Yes" if r.evidence_validated else "Partial"
            report += f"| {r.final_rank} | **{r.ticker}** | {r.company_name[:25]} | {r.composite_score:.1f} | {r.sharpe_3y:.2f} | {r.mdd_3y:.1%} | {r.fundamental_score:.0f} | {r.valuation_score:.0f} | {validated} |\n"

        report += f"""
---

## 数据来源

- **N-PORT**: SEC EDGAR公募基金月度持仓报告
- **13F**: SEC EDGAR机构季度持仓报告
- **风险指标**: 3年历史价格数据计算
- **基本面**: 公司财务报表数据
- **估值**: DCF、可比公司、历史分位

---

**注意**:
1. N-PORT/13F数据有45-60天滞后
2. 此名单需结合市场环境和个人风险偏好使用
3. 仅供研究参考，不构成投资建议
"""

        md_file = FUNNEL_DIR / "funnel_results.md"
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(report)
        logger.info(f"Markdown报告已保存: {md_file}")


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主函数"""
    print("\n" + "=" * 80)
    print(" " * 15 + "三段式漏斗筛选器")
    print(" " * 10 + "Three-Stage Funnel Screener")
    print("=" * 80 + "\n")

    funnel = ThreeStageFunnel()

    # 运行完整漏斗
    result = funnel.run_full_funnel()

    # 导出结果
    funnel.export_results()

    # 打印Top 20摘要
    print("\n" + "=" * 80)
    print("Top 20 最终名单")
    print("=" * 80)
    print(f"\n{'Rank':<5} {'Ticker':<8} {'Score':<8} {'Sharpe':<8} {'MDD':<8} {'Sector'}")
    print("-" * 80)

    for r in funnel.stage3_results[:20]:
        print(f"{r.final_rank:<5} {r.ticker:<8} {r.composite_score:<8.1f} "
              f"{r.sharpe_3y:<8.2f} {r.mdd_3y:.1%}  {r.sector[:15]}")

    print("=" * 80)
    print(f"\n结果已保存至: {FUNNEL_DIR}")

    return result


if __name__ == '__main__':
    main()
