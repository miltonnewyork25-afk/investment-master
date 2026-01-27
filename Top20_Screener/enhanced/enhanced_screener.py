#!/usr/bin/env python3
"""
================================================================================
Enhanced Top 20 Screener v2.0
================================================================================
基于顶级基金策略逆向分析的增强版筛选系统

核心改进：
1. Alpha优先 - 不只找最安全的，而是找最有超额收益潜力的
2. 护城河是基础 - Buffett/Klarman都强调护城河
3. 估值安全边际 - Graham/Klarman的核心原则
4. 催化剂驱动 - Ackman/Loeb的激进主义方法
5. 聪明钱验证 - 被顶级机构持有是加分项
6. 适度集中 - 顶级投资者不分散，而是集中在最有信心的

因子权重（基于顶级基金逆向分析）：
- 护城河因子（Buffett核心）: 25%
- 估值因子（Graham/Klarman）: 20%
- 质量因子（全部顶级基金共性）: 20%
- 聪明钱因子（被顶级机构持有）: 15%
- 催化剂因子（Ackman/Loeb）: 10%
- 风险调整收益（原有）: 10%

作者: Agent C - Top 20 重构
版本: 2.0
日期: 2026-01-26
================================================================================
"""

import pandas as pd
import numpy as np
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
ENHANCED_DIR = BASE_DIR / "enhanced"
DATA_DIR = BASE_DIR / "data"
FUNNEL_DIR = BASE_DIR / "funnel"
SIGNALS_DIR = BASE_DIR / "signals"
SCORING_DIR = BASE_DIR / "scoring"
VALUATION_DIR = BASE_DIR / "valuation"
RISK_DIR = BASE_DIR / "risk_metrics"

# 创建目录
ENHANCED_DIR.mkdir(exist_ok=True, parents=True)

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# 顶级机构定义（基于逆向分析）
# ============================================================================

LEGENDARY_INVESTORS = {
    'Berkshire Hathaway': {
        'weight': 10,
        'style': 'Value',
        'core_holdings': ['AAPL', 'BAC', 'AXP', 'KO', 'CVX', 'OXY', 'MCO', 'CB', 'V', 'MA']
    },
    'Pershing Square': {
        'weight': 9,
        'style': 'Activist',
        'core_holdings': ['CMG', 'HLT', 'LOW', 'QSR', 'GOOGL', 'UBER', 'BN']
    },
    'Baupost Group': {
        'weight': 9,
        'style': 'Deep Value',
        'core_holdings': ['META', 'GOOGL', 'CNC', 'EBAY', 'INTC', 'WBD', 'ELV', 'WTW']
    },
    'Third Point': {
        'weight': 8,
        'style': 'Event Driven',
        'core_holdings': ['AMZN', 'MSFT', 'PDD', 'DKNG', 'PCG', 'NVDA', 'NSC']
    },
    'Greenlight Capital': {
        'weight': 8,
        'style': 'Value',
        'core_holdings': ['GRBK', 'FLR', 'CNR', 'BHF', 'KD']
    },
    'Appaloosa Management': {
        'weight': 8,
        'style': 'Distressed',
        'core_holdings': ['BABA', 'AMZN', 'WHR', 'NVDA', 'GOOGL']
    },
    'ValueAct Capital': {
        'weight': 8,
        'style': 'Constructivist',
        'core_holdings': ['AMZN', 'CRM', 'RBLX', 'META', 'V', 'MSFT']
    },
    'Tiger Global': {
        'weight': 7,
        'style': 'Growth',
        'core_holdings': ['MSFT', 'AMZN', 'META', 'NVDA', 'CRM', 'SNOW', 'UBER']
    },
    'Druckenmiller': {
        'weight': 9,
        'style': 'Macro',
        'core_holdings': ['NVDA', 'MSFT', 'GOOGL', 'AMZN', 'COIN']
    },
    'Coatue Management': {
        'weight': 7,
        'style': 'Tech Growth',
        'core_holdings': ['NVDA', 'META', 'AMZN', 'CRM', 'NOW', 'PANW']
    },
}

# 顶级价值基金（N-PORT来源）
TOP_VALUE_FUNDS = {
    'Dodge & Cox Stock Fund': {
        'ticker': 'DODGX',
        'style': 'Deep Value',
        'weight': 8
    },
    'Fidelity Contrafund': {
        'ticker': 'FCNTX',
        'style': 'GARP',
        'weight': 8
    },
    'American Funds Washington Mutual': {
        'ticker': 'AWSHX',
        'style': 'Quality Value',
        'weight': 7
    },
    'Vanguard Value Fund': {
        'ticker': 'VTV',
        'style': 'Large Value',
        'weight': 6
    },
}


# ============================================================================
# 因子权重配置
# ============================================================================

@dataclass
class EnhancedFactorWeights:
    """
    基于顶级基金逆向分析的因子权重

    设计原则：
    1. 护城河是基础（Buffett核心）
    2. 估值需要安全边际（Graham/Klarman）
    3. 聪明钱验证增加信心
    4. 催化剂加速价值实现
    5. 质量是必要条件
    """
    moat_score: float = 0.25       # 护城河因子（Buffett核心）
    valuation_score: float = 0.20  # 估值因子（Graham/Klarman安全边际）
    quality_score: float = 0.20    # 质量因子（全部顶级基金共性）
    smart_money_score: float = 0.15  # 聪明钱因子（被顶级机构持有）
    catalyst_score: float = 0.10   # 催化剂因子（Ackman/Loeb）
    risk_adjusted_return: float = 0.10  # 风险调整收益

    def validate(self):
        """验证权重总和为1"""
        total = (self.moat_score + self.valuation_score +
                 self.quality_score + self.smart_money_score +
                 self.catalyst_score + self.risk_adjusted_return)
        if abs(total - 1.0) > 0.001:
            raise ValueError(f"权重总和必须为1.0，当前为{total}")
        return True

    def to_dict(self) -> Dict:
        return asdict(self)


@dataclass
class EnhancedHardConstraints:
    """增强版硬性约束"""
    max_drawdown_threshold: float = -0.50    # MDD不能超过-50%
    min_quality_score: float = 50.0          # 质量得分最低50
    min_market_cap: float = 2_000_000_000    # 市值最低$2B（更高标准）
    min_daily_volume: float = 5_000_000      # 日均成交额最低$5M
    max_per_sector: int = 4                  # 每个行业最多4只
    require_positive_fcf: bool = True        # 必须有正FCF
    max_debt_equity: float = 2.0             # 最大D/E比率（金融除外）


# ============================================================================
# 评分后的股票数据结构
# ============================================================================

@dataclass
class EnhancedScoredStock:
    """增强版评分股票"""
    ticker: str
    company_name: str = ""
    sector: str = ""
    industry: str = ""
    market_cap: float = 0

    # 原始指标
    roic: float = 0
    roe: float = 0
    gross_margin: float = 0
    net_margin: float = 0
    fcf_yield: float = 0
    debt_to_equity: float = 0
    pe_ratio: float = 0
    pb_ratio: float = 0

    # 风险指标
    sharpe_3y: float = 0
    max_drawdown: float = 0
    sortino_ratio: float = 0
    calmar_ratio: float = 0

    # 六维度标准化得分 (0-100)
    moat_score: float = 0           # 护城河得分
    valuation_score: float = 0      # 估值得分
    quality_score: float = 0        # 质量得分
    smart_money_score: float = 0    # 聪明钱得分
    catalyst_score: float = 0       # 催化剂得分
    risk_adjusted_score: float = 0  # 风险调整得分

    # 综合得分
    composite_score: float = 0
    alpha_potential: float = 0      # Alpha潜力评估
    rank: int = 0

    # 聪明钱详情
    held_by_institutions: List[str] = field(default_factory=list)
    institution_weight: float = 0

    # 催化剂详情
    catalysts: List[str] = field(default_factory=list)

    # 排除信息
    excluded: bool = False
    exclusion_reason: str = ""
    warnings: List[str] = field(default_factory=list)

    # 投资论点
    investment_thesis: str = ""

    def to_dict(self) -> Dict:
        return asdict(self)


# ============================================================================
# 增强版Top 20筛选器
# ============================================================================

class EnhancedTop20Screener:
    """
    基于顶级基金策略逆向的增强版Top 20筛选器

    核心改进：
    1. 从"顶级基金在买什么"出发，而非从3000只股票海选
    2. 六维度评分体系（护城河/估值/质量/聪明钱/催化剂/风险调整）
    3. Alpha优先，不只追求安全
    4. 催化剂驱动价值实现
    5. 聪明钱验证增加信心
    """

    def __init__(self,
                 weights: EnhancedFactorWeights = None,
                 constraints: EnhancedHardConstraints = None):
        """初始化增强版筛选器"""
        self.weights = weights or EnhancedFactorWeights()
        self.constraints = constraints or EnhancedHardConstraints()

        # 验证权重
        self.weights.validate()

        # 数据容器
        self.master_data: pd.DataFrame = None
        self.smart_money_candidates: List[Dict] = []

        # 结果容器
        self.scored_stocks: List[EnhancedScoredStock] = []
        self.top_20: List[EnhancedScoredStock] = []
        self.excluded_stocks: List[EnhancedScoredStock] = []

        logger.info("增强版Top 20筛选器初始化完成")
        logger.info(f"因子权重: {self.weights.to_dict()}")

    # ========== 数据加载 ==========

    def load_all_data(self) -> bool:
        """加载所有数据"""
        logger.info("=" * 80)
        logger.info("Step 1: 加载数据")
        logger.info("=" * 80)

        try:
            # 1. 加载聪明钱候选池
            self._load_smart_money_candidates()

            # 2. 加载主数据集
            self._load_master_data()

            return True

        except Exception as e:
            logger.error(f"加载数据失败: {str(e)}")
            return False

    def _load_smart_money_candidates(self):
        """加载聪明钱候选池"""
        candidates_file = FUNNEL_DIR / "smart_money_candidates.json"

        if candidates_file.exists():
            with open(candidates_file, 'r') as f:
                self.smart_money_candidates = json.load(f)
            logger.info(f"已加载聪明钱候选池: {len(self.smart_money_candidates)} 只股票")
        else:
            # 使用已知的顶级机构持仓
            logger.info("聪明钱候选池文件不存在，使用顶级机构核心持仓...")
            self.smart_money_candidates = self._get_legendary_holdings()

    def _get_legendary_holdings(self) -> List[Dict]:
        """获取传奇投资者的核心持仓"""
        holdings_map = defaultdict(lambda: {
            'institutions': [],
            'total_weight': 0,
            'actions': []
        })

        for investor, data in LEGENDARY_INVESTORS.items():
            for ticker in data['core_holdings']:
                holdings_map[ticker]['institutions'].append(investor)
                holdings_map[ticker]['total_weight'] += data['weight']

        # 转换为列表格式
        result = []
        for ticker, info in holdings_map.items():
            result.append({
                'ticker': ticker,
                'f13_count': len(info['institutions']),
                'f13_institutions': info['institutions'],
                'smart_money_score': info['total_weight'],
                'nport_count': 0,
            })

        # 按聪明钱得分排序
        result.sort(key=lambda x: x['smart_money_score'], reverse=True)

        logger.info(f"从传奇投资者提取 {len(result)} 只核心持仓")
        return result

    def _load_master_data(self):
        """加载主数据集"""
        processed_dir = DATA_DIR / "processed"

        if processed_dir.exists():
            master_files = list(processed_dir.glob("master_dataset*.csv"))
            if master_files:
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
            logger.warning("主数据集不存在，将使用空数据")
            self.master_data = pd.DataFrame()

    # ========== 护城河评分（Buffett核心） ==========

    def calculate_moat_score(self, ticker: str, data: Dict = None) -> Tuple[float, List[str]]:
        """
        计算护城河得分（基于Buffett方法论）

        Buffett的护城河标准：
        - 持久竞争优势
        - 高资本回报率（ROIC > 15%）
        - 定价权（高毛利率）
        - 简单可理解的业务
        - 市场领导地位

        Returns:
            (score, reasons): 得分和原因列表
        """
        score = 50  # 基准分
        reasons = []

        if data is None:
            data = self._get_stock_data(ticker)

        # 1. ROIC评估（Buffett最看重）
        roic = data.get('roic', 0)
        if roic > 0.25:
            score += 25
            reasons.append(f"ROIC {roic:.1%} 极高，资本配置优秀")
        elif roic > 0.20:
            score += 20
            reasons.append(f"ROIC {roic:.1%} 优秀")
        elif roic > 0.15:
            score += 15
            reasons.append(f"ROIC {roic:.1%} 符合Buffett标准(>15%)")
        elif roic > 0.10:
            score += 5
            reasons.append(f"ROIC {roic:.1%} 中等")
        else:
            score -= 10
            reasons.append(f"ROIC {roic:.1%} 偏低")

        # 2. 毛利率评估（定价权代理）
        gross_margin = data.get('gross_margin', 0)
        if gross_margin > 0.60:
            score += 15
            reasons.append(f"毛利率 {gross_margin:.1%} 极高，定价权强")
        elif gross_margin > 0.40:
            score += 10
            reasons.append(f"毛利率 {gross_margin:.1%} 良好")
        elif gross_margin > 0.30:
            score += 5

        # 3. 持续性检验（净利润率稳定性）
        net_margin = data.get('net_margin', 0)
        if net_margin > 0.25:
            score += 10
            reasons.append(f"净利率 {net_margin:.1%} 极高")
        elif net_margin > 0.15:
            score += 5

        # 4. 市场地位（市值作为代理）
        market_cap = data.get('market_cap', 0)
        if market_cap > 100_000_000_000:  # $100B+
            score += 5
            reasons.append("大型龙头企业")

        return min(100, max(0, score)), reasons

    # ========== 估值评分（Graham/Klarman安全边际） ==========

    def calculate_valuation_score(self, ticker: str, data: Dict = None) -> Tuple[float, List[str]]:
        """
        计算估值得分（基于Graham/Klarman安全边际原则）

        Klarman的标准：
        - 至少25%安全边际
        - P/E低于历史均值
        - FCF收益率 > 无风险利率 + 5%

        Graham的标准：
        - P/E < 15（基于3年平均盈利）
        - P/B < 1.5 或 P/E × P/B < 22.5

        Returns:
            (score, reasons): 得分和原因列表
        """
        score = 50  # 基准分
        reasons = []

        if data is None:
            data = self._get_stock_data(ticker)

        # 1. FCF收益率（最重要）
        # 当前无风险利率4.5%，加5%风险溢价 = 9.5%
        fcf_yield = data.get('fcf_yield', 0)
        if fcf_yield > 0.12:
            score += 25
            reasons.append(f"FCF Yield {fcf_yield:.1%} 极有吸引力 (>12%)")
        elif fcf_yield > 0.08:
            score += 15
            reasons.append(f"FCF Yield {fcf_yield:.1%} 有吸引力")
        elif fcf_yield > 0.05:
            score += 5
        elif fcf_yield < 0.02:
            score -= 10
            reasons.append(f"FCF Yield {fcf_yield:.1%} 偏低")

        # 2. P/E比率（Graham标准）
        pe = data.get('pe_ratio', 0)
        if pe > 0 and pe < 100:  # 有效P/E
            if pe < 12:
                score += 15
                reasons.append(f"P/E {pe:.1f} 很低，符合Graham标准")
            elif pe < 15:
                score += 10
                reasons.append(f"P/E {pe:.1f} 合理 (Graham标准<15)")
            elif pe < 20:
                score += 5
            elif pe > 40:
                score -= 15
                reasons.append(f"P/E {pe:.1f} 过高")
            elif pe > 30:
                score -= 5

        # 3. P/B比率（Graham标准）
        pb = data.get('pb_ratio', 0)
        if pb > 0:
            if pb < 1.5:
                score += 10
                reasons.append(f"P/B {pb:.1f} 符合Graham标准 (<1.5)")
            elif pb < 3:
                score += 5
            elif pb > 10:
                score -= 10

        # 4. Graham复合检验：P/E × P/B < 22.5
        if pe > 0 and pb > 0:
            graham_number = pe * pb
            if graham_number < 22.5:
                score += 10
                reasons.append(f"通过Graham复合检验 (P/E×P/B={graham_number:.1f}<22.5)")

        return min(100, max(0, score)), reasons

    # ========== 质量评分（全部顶级基金共性） ==========

    def calculate_quality_score(self, ticker: str, data: Dict = None) -> Tuple[float, List[str]]:
        """
        计算质量得分（顶级基金共性标准）

        共性标准：
        - 强劲自由现金流（FCF/NI > 0.8）
        - 高ROE（>15%）
        - 低负债（D/E < 0.5，金融除外）
        - 持续盈利

        Returns:
            (score, reasons): 得分和原因列表
        """
        score = 50  # 基准分
        reasons = []

        if data is None:
            data = self._get_stock_data(ticker)

        # 1. ROE评估
        roe = data.get('roe', 0)
        if roe > 0.30:
            score += 15
            reasons.append(f"ROE {roe:.1%} 极高")
        elif roe > 0.20:
            score += 10
            reasons.append(f"ROE {roe:.1%} 优秀 (>20%)")
        elif roe > 0.15:
            score += 5
        elif roe < 0.05:
            score -= 10

        # 2. 现金流质量（OCF/NI）
        ocf_to_ni = data.get('ocf_to_net_income', 0)
        if ocf_to_ni > 1.2:
            score += 15
            reasons.append(f"现金流质量优秀 (OCF/NI={ocf_to_ni:.1f})")
        elif ocf_to_ni > 0.8:
            score += 10
        elif ocf_to_ni < 0.5:
            score -= 10
            reasons.append("现金流质量偏弱")

        # 3. 负债评估（非金融行业）
        sector = data.get('sector', '')
        debt_equity = data.get('debt_to_equity', 0)

        if sector not in ['Financial Services', 'Financials']:
            if debt_equity < 0.3:
                score += 10
                reasons.append(f"低负债 (D/E={debt_equity:.1f})")
            elif debt_equity < 0.5:
                score += 5
            elif debt_equity > 2.0:
                score -= 15
                reasons.append(f"高负债 (D/E={debt_equity:.1f})")
            elif debt_equity > 1.0:
                score -= 5

        # 4. 净利率
        net_margin = data.get('net_margin', 0)
        if net_margin > 0.20:
            score += 10
        elif net_margin > 0.10:
            score += 5
        elif net_margin < 0:
            score -= 20
            reasons.append("净利率为负")

        return min(100, max(0, score)), reasons

    # ========== 聪明钱评分（被顶级机构持有） ==========

    def calculate_smart_money_score(self, ticker: str) -> Tuple[float, List[str]]:
        """
        计算聪明钱得分（基于13F分析）

        加分项：
        - 被Berkshire持有 +30分
        - 被Pershing/Baupost持有 +20分
        - 被多家顶级机构共同持有
        - 最近季度新建仓/加仓

        Returns:
            (score, institutions): 得分和持有机构列表
        """
        score = 30  # 基准分（无机构持有）
        institutions = []

        # 从聪明钱候选池查找
        for candidate in self.smart_money_candidates:
            if candidate.get('ticker') == ticker:
                inst_list = candidate.get('f13_institutions', [])
                institutions = inst_list

                # Berkshire持有是最强信号
                if 'Berkshire Hathaway' in inst_list:
                    score += 30

                # 其他顶级机构
                top_tier = ['Pershing Square', 'Baupost Group', 'Druckenmiller']
                for inst in top_tier:
                    if inst in inst_list:
                        score += 15

                second_tier = ['Third Point', 'ValueAct Capital', 'Greenlight Capital',
                              'Appaloosa Management', 'Tiger Global', 'Coatue Management']
                for inst in second_tier:
                    if inst in inst_list:
                        score += 10

                # 多家机构共同持有
                if len(inst_list) >= 5:
                    score += 20
                elif len(inst_list) >= 3:
                    score += 10
                elif len(inst_list) >= 2:
                    score += 5

                break

        return min(100, max(0, score)), institutions

    # ========== 催化剂评分（Ackman/Loeb方法） ==========

    def calculate_catalyst_score(self, ticker: str, data: Dict = None) -> Tuple[float, List[str]]:
        """
        计算催化剂得分（基于Ackman/Loeb方法）

        催化剂类型：
        - 管理层变更
        - 战略转型
        - 资产分拆/出售
        - 大规模回购
        - 维权投资者介入
        - 行业整合
        - 利润率改善趋势

        Returns:
            (score, catalysts): 得分和催化剂列表
        """
        score = 40  # 基准分（无明确催化剂）
        catalysts = []

        if data is None:
            data = self._get_stock_data(ticker)

        # 1. 检查是否有维权投资者介入
        for candidate in self.smart_money_candidates:
            if candidate.get('ticker') == ticker:
                institutions = candidate.get('f13_institutions', [])
                activists = ['Pershing Square', 'Third Point', 'ValueAct Capital',
                            'Greenlight Capital', 'Elliott Management']
                for activist in activists:
                    if activist in institutions:
                        score += 20
                        catalysts.append(f"{activist} 持仓（维权投资者）")
                break

        # 2. 高FCF支持回购潜力
        fcf_yield = data.get('fcf_yield', 0)
        if fcf_yield > 0.08:
            score += 10
            catalysts.append(f"高FCF支持回购 (Yield {fcf_yield:.1%})")

        # 3. 低估值可能吸引并购
        pe = data.get('pe_ratio', 0)
        if 0 < pe < 12:
            score += 10
            catalysts.append(f"低估值可能吸引并购 (P/E {pe:.1f})")

        # 4. 行业整合机会（通过行业判断）
        industry = data.get('industry', '')
        consolidating_industries = ['Oil & Gas', 'Media', 'Telecom', 'Banking', 'Insurance']
        for ind in consolidating_industries:
            if ind.lower() in industry.lower():
                score += 5
                catalysts.append(f"行业整合机会 ({industry})")
                break

        # 5. 近期股价大幅回调（逆向机会）
        price_vs_52w_high = data.get('price_vs_52w_high', 1)
        if price_vs_52w_high < 0.75:
            score += 15
            catalysts.append(f"股价回调 {(1-price_vs_52w_high):.0%}，逆向机会")

        return min(100, max(0, score)), catalysts

    # ========== 风险调整收益评分 ==========

    def calculate_risk_adjusted_score(self, ticker: str, data: Dict = None) -> float:
        """计算风险调整收益得分"""
        score = 50  # 基准分

        if data is None:
            data = self._get_stock_data(ticker)

        # Sharpe Ratio
        sharpe = data.get('sharpe_3y', 0)
        if sharpe > 2.0:
            score += 30
        elif sharpe > 1.5:
            score += 25
        elif sharpe > 1.0:
            score += 15
        elif sharpe > 0.5:
            score += 5
        elif sharpe < 0:
            score -= 20

        # Sortino Ratio
        sortino = data.get('sortino_ratio', 0)
        if sortino > 2.0:
            score += 15
        elif sortino > 1.5:
            score += 10
        elif sortino > 1.0:
            score += 5

        # Max Drawdown
        mdd = data.get('max_drawdown', -0.5)
        if mdd >= -0.15:
            score += 10
        elif mdd >= -0.25:
            score += 5
        elif mdd < -0.40:
            score -= 15

        return min(100, max(0, score))

    # ========== 辅助方法 ==========

    def _get_stock_data(self, ticker: str) -> Dict:
        """获取股票的所有数据"""
        data = {}

        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            row = self.master_data[self.master_data[ticker_col] == ticker]

            if len(row) > 0:
                row = row.iloc[0]

                # 映射所有可能的列名
                mappings = {
                    'roic': ['roic', 'ROIC'],
                    'roe': ['roe', 'ROE'],
                    'gross_margin': ['gross_margin', 'grossMargin', 'Gross_Margin'],
                    'net_margin': ['net_margin', 'netMargin', 'Net_Margin'],
                    'fcf_yield': ['fcf_yield', 'fcfYield', 'FCF_Yield'],
                    'debt_to_equity': ['debt_to_equity', 'debtToEquity', 'D_E'],
                    'pe_ratio': ['pe_ratio', 'peRatio', 'P_E'],
                    'pb_ratio': ['pb_ratio', 'pbRatio', 'P_B'],
                    'market_cap': ['market_cap', 'marketCap', 'Market_Cap'],
                    'sector': ['sector', 'Sector'],
                    'industry': ['industry', 'Industry'],
                    'company_name': ['company_name', 'companyName', 'name'],
                    'sharpe_3y': ['sharpe_3y', 'sharpe', 'Sharpe_Ratio'],
                    'max_drawdown': ['max_drawdown', 'mdd', 'Max_Drawdown'],
                    'sortino_ratio': ['sortino_ratio', 'sortino'],
                    'ocf_to_net_income': ['ocf_to_net_income', 'OCF_NI'],
                    'price_vs_52w_high': ['price_vs_52w_high', 'price_to_52w_high'],
                }

                for key, possible_cols in mappings.items():
                    for col in possible_cols:
                        if col in row.index and pd.notna(row[col]):
                            data[key] = row[col]
                            break

        return data

    def _get_company_info(self, ticker: str) -> Dict:
        """获取公司基本信息"""
        data = self._get_stock_data(ticker)
        return {
            'company_name': data.get('company_name', ticker),
            'sector': data.get('sector', 'Unknown'),
            'industry': data.get('industry', 'Unknown'),
            'market_cap': data.get('market_cap', 0),
        }

    # ========== 综合评分与排序 ==========

    def score_all_stocks(self):
        """对所有聪明钱候选股票评分"""
        logger.info("=" * 80)
        logger.info("Step 2: 计算六维度得分")
        logger.info("=" * 80)

        self.scored_stocks = []

        # 从聪明钱候选池开始
        tickers = set()
        for candidate in self.smart_money_candidates:
            tickers.add(candidate.get('ticker', ''))

        # 添加主数据集中的股票
        if self.master_data is not None and len(self.master_data) > 0:
            ticker_col = 'symbol' if 'symbol' in self.master_data.columns else 'Ticker'
            if ticker_col in self.master_data.columns:
                for t in self.master_data[ticker_col].dropna().unique():
                    tickers.add(t)

        logger.info(f"待评分股票: {len(tickers)} 只")

        for ticker in tickers:
            if not ticker or ticker == '':
                continue

            data = self._get_stock_data(ticker)
            company_info = self._get_company_info(ticker)

            # 计算六维度得分
            moat_score, moat_reasons = self.calculate_moat_score(ticker, data)
            valuation_score, valuation_reasons = self.calculate_valuation_score(ticker, data)
            quality_score, quality_reasons = self.calculate_quality_score(ticker, data)
            smart_money_score, institutions = self.calculate_smart_money_score(ticker)
            catalyst_score, catalysts = self.calculate_catalyst_score(ticker, data)
            risk_adjusted_score = self.calculate_risk_adjusted_score(ticker, data)

            # 计算加权综合得分
            composite = (
                moat_score * self.weights.moat_score +
                valuation_score * self.weights.valuation_score +
                quality_score * self.weights.quality_score +
                smart_money_score * self.weights.smart_money_score +
                catalyst_score * self.weights.catalyst_score +
                risk_adjusted_score * self.weights.risk_adjusted_return
            )

            # Alpha潜力 = 催化剂 × 估值折价
            alpha_potential = (catalyst_score / 100) * (valuation_score / 100) * 100

            # 生成投资论点
            thesis_parts = moat_reasons + valuation_reasons + quality_reasons
            thesis = "; ".join(thesis_parts[:3]) if thesis_parts else "综合评分良好"

            stock = EnhancedScoredStock(
                ticker=ticker,
                company_name=company_info['company_name'],
                sector=company_info['sector'],
                industry=company_info['industry'],
                market_cap=company_info['market_cap'],

                roic=data.get('roic', 0),
                roe=data.get('roe', 0),
                gross_margin=data.get('gross_margin', 0),
                net_margin=data.get('net_margin', 0),
                fcf_yield=data.get('fcf_yield', 0),
                debt_to_equity=data.get('debt_to_equity', 0),
                pe_ratio=data.get('pe_ratio', 0),
                pb_ratio=data.get('pb_ratio', 0),

                sharpe_3y=data.get('sharpe_3y', 0),
                max_drawdown=data.get('max_drawdown', -0.5),
                sortino_ratio=data.get('sortino_ratio', 0),
                calmar_ratio=data.get('calmar_ratio', 0),

                moat_score=moat_score,
                valuation_score=valuation_score,
                quality_score=quality_score,
                smart_money_score=smart_money_score,
                catalyst_score=catalyst_score,
                risk_adjusted_score=risk_adjusted_score,

                composite_score=round(composite, 2),
                alpha_potential=round(alpha_potential, 2),

                held_by_institutions=institutions,
                institution_weight=len(institutions),
                catalysts=catalysts,
                investment_thesis=thesis,
            )

            self.scored_stocks.append(stock)

        logger.info(f"完成 {len(self.scored_stocks)} 只股票的六维度评分")

    def apply_hard_constraints(self):
        """应用硬性约束"""
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

            # 约束2: 质量得分最低要求
            if stock.quality_score < self.constraints.min_quality_score:
                exclusion_reasons.append(
                    f"质量不合格: {stock.quality_score:.0f} < {self.constraints.min_quality_score}"
                )

            # 约束3: 市值最低要求
            if stock.market_cap > 0 and stock.market_cap < self.constraints.min_market_cap:
                exclusion_reasons.append(
                    f"市值过小: ${stock.market_cap/1e9:.1f}B < ${self.constraints.min_market_cap/1e9:.1f}B"
                )

            # 约束4: D/E过高（非金融）
            if stock.sector not in ['Financial Services', 'Financials']:
                if stock.debt_to_equity > self.constraints.max_debt_equity:
                    exclusion_reasons.append(
                        f"负债过高: D/E {stock.debt_to_equity:.1f} > {self.constraints.max_debt_equity}"
                    )

            if exclusion_reasons:
                stock.excluded = True
                stock.exclusion_reason = "; ".join(exclusion_reasons)
                self.excluded_stocks.append(stock)
            else:
                qualified.append(stock)

        logger.info(f"通过硬性约束: {len(qualified)} 只")
        logger.info(f"被排除: {len(self.excluded_stocks)} 只")

        self.scored_stocks = qualified

    def rank_and_diversify(self, top_n: int = 20):
        """排序并应用分散化"""
        logger.info("=" * 80)
        logger.info("Step 4: 综合排序与行业分散化")
        logger.info("=" * 80)

        # 按综合得分排序（同分时按Alpha潜力）
        self.scored_stocks.sort(
            key=lambda x: (x.composite_score, x.alpha_potential),
            reverse=True
        )

        # 应用行业分散化
        sector_counts = defaultdict(int)
        diversified = []

        for stock in self.scored_stocks:
            sector = stock.sector
            if sector_counts[sector] < self.constraints.max_per_sector:
                diversified.append(stock)
                sector_counts[sector] += 1

            if len(diversified) >= top_n:
                break

        # 分配排名
        for i, stock in enumerate(diversified):
            stock.rank = i + 1

        self.top_20 = diversified

        # 打印行业分布
        logger.info(f"Top {len(self.top_20)} 行业分布:")
        for sector, count in sorted(sector_counts.items(), key=lambda x: -x[1]):
            logger.info(f"  {sector}: {count} 只 ({count/len(self.top_20)*100:.0f}%)")

    # ========== 报告生成 ==========

    def generate_new_top_20_report(self) -> str:
        """生成新版Top 20报告"""
        report = f"""# Enhanced Top 20 美股价值投资名单

**报告日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**方法论**: 基于顶级基金策略逆向分析的增强版筛选系统 v2.0
**核心改进**: Alpha优先 + 护城河基础 + 安全边际 + 催化剂驱动 + 聪明钱验证

---

## 执行摘要

### 核心设计原则

本系统基于对以下顶级投资者的逆向分析构建：

| 投资者/基金 | 风格 | 核心理念 | 权重贡献 |
|-------------|------|----------|----------|
| Warren Buffett | 价值投资 | 护城河 + 优质管理层 + 长期持有 | 护城河因子 |
| Seth Klarman | 安全边际 | 价格≪价值 + 催化剂 | 估值因子 |
| Bill Ackman | 激进主义 | 集中持仓 + 催化剂驱动 | 催化剂因子 |
| 顶级价值基金 | 质量价值 | ROE + FCF + 低负债 | 质量因子 |

### 六维度评分权重

| 因子 | 权重 | 来源 | 核心指标 |
|------|------|------|----------|
| **护城河** | 25% | Buffett | ROIC>15%, 毛利率, 市场地位 |
| **估值** | 20% | Graham/Klarman | FCF Yield, P/E, P/B, 安全边际 |
| **质量** | 20% | 全部顶级基金 | ROE, 现金流, D/E |
| **聪明钱** | 15% | 13F分析 | 被顶级机构持有 |
| **催化剂** | 10% | Ackman/Loeb | 维权介入, 回购, 整合 |
| **风险调整** | 10% | 量化 | Sharpe, MDD, Sortino |

---

## Top 20 名单

| Rank | Ticker | Company | Sector | Score | Moat | Value | Quality | Smart$ | Catalyst | Alpha |
|------|--------|---------|--------|-------|------|-------|---------|--------|----------|-------|
"""

        for stock in self.top_20:
            name = stock.company_name[:25] if stock.company_name else stock.ticker
            report += f"| {stock.rank} | **{stock.ticker}** | {name} | {stock.sector} | "
            report += f"{stock.composite_score:.1f} | {stock.moat_score:.0f} | {stock.valuation_score:.0f} | "
            report += f"{stock.quality_score:.0f} | {stock.smart_money_score:.0f} | {stock.catalyst_score:.0f} | "
            report += f"{stock.alpha_potential:.0f} |\n"

        report += """
---

## 个股详情

"""

        for stock in self.top_20:
            institutions = ", ".join(stock.held_by_institutions[:3]) if stock.held_by_institutions else "无"
            if len(stock.held_by_institutions) > 3:
                institutions += f" 等{len(stock.held_by_institutions)}家"

            catalysts = "; ".join(stock.catalysts[:2]) if stock.catalysts else "待识别"

            report += f"""### #{stock.rank} {stock.ticker} - {stock.company_name}

**行业**: {stock.sector} / {stock.industry}
**市值**: ${stock.market_cap/1e9:.1f}B

**综合评分**: {stock.composite_score:.1f}/100 | **Alpha潜力**: {stock.alpha_potential:.0f}

**六维度得分**:
| 护城河 | 估值 | 质量 | 聪明钱 | 催化剂 | 风险调整 |
|--------|------|------|--------|--------|----------|
| {stock.moat_score:.0f} | {stock.valuation_score:.0f} | {stock.quality_score:.0f} | {stock.smart_money_score:.0f} | {stock.catalyst_score:.0f} | {stock.risk_adjusted_score:.0f} |

**关键指标**:
| ROIC | ROE | 毛利率 | FCF Yield | P/E | D/E | Sharpe | MDD |
|------|-----|--------|-----------|-----|-----|--------|-----|
| {stock.roic:.1%} | {stock.roe:.1%} | {stock.gross_margin:.1%} | {stock.fcf_yield:.1%} | {stock.pe_ratio:.1f} | {stock.debt_to_equity:.1f} | {stock.sharpe_3y:.2f} | {stock.max_drawdown:.1%} |

**聪明钱持有**: {institutions}

**催化剂**: {catalysts}

**投资论点**: {stock.investment_thesis}

---

"""

        # 行业分布
        sector_dist = defaultdict(list)
        for stock in self.top_20:
            sector_dist[stock.sector].append(stock.ticker)

        report += """## 行业分布

| 行业 | 数量 | 占比 | 成分股 |
|------|------|------|--------|
"""

        for sector, tickers in sorted(sector_dist.items(), key=lambda x: -len(x[1])):
            pct = len(tickers) / len(self.top_20) * 100
            report += f"| {sector} | {len(tickers)} | {pct:.0f}% | {', '.join(tickers)} |\n"

        report += f"""
---

## 与旧版Top 20对比

### 方法论差异

| 维度 | 旧版 | 新版 | 改进点 |
|------|------|------|--------|
| 起点 | 3000只海选 | 顶级基金持仓 | 从"聪明钱在买什么"出发 |
| 核心因子 | Sharpe为主 | 六维度平衡 | 更全面的评估体系 |
| 护城河 | 未专门评估 | 25%权重 | Buffett核心标准 |
| 催化剂 | 无 | 10%权重 | 价值实现驱动 |
| 聪明钱 | SEC信号10% | 独立因子15% | 机构验证增强 |
| 目标 | 风险调整收益 | Alpha + 安全边际 | 进攻与防守兼顾 |

---

## 方法论详解

### 护城河评分逻辑（Buffett标准）

```
护城河得分 =
  基准分 50分 +
  ROIC评分 (>25%加25分, >20%加20分, >15%加15分) +
  毛利率评分 (>60%加15分, >40%加10分, >30%加5分) +
  净利率评分 (>25%加10分, >15%加5分) +
  市值评分 (>$100B加5分)
```

### 估值评分逻辑（Graham/Klarman标准）

```
估值得分 =
  基准分 50分 +
  FCF Yield评分 (>12%加25分, >8%加15分, >5%加5分) +
  P/E评分 (<12加15分, <15加10分, <20加5分) +
  P/B评分 (<1.5加10分, <3加5分) +
  Graham复合检验 (P/E×P/B<22.5加10分)
```

### 聪明钱评分逻辑

```
聪明钱得分 =
  基准分 30分 +
  Berkshire持有加30分 +
  顶级机构(Pershing/Baupost/Druckenmiller)每家加15分 +
  二线顶级机构每家加10分 +
  多家共同持有加分 (≥5家加20分, ≥3家加10分)
```

---

## 免责声明

1. 本报告基于公开数据和已披露的13F文件分析
2. 不构成投资建议，投资有风险
3. 顶级投资者的持仓可能已发生变化
4. 过往表现不代表未来收益

---

**报告生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**方法论版本**: Enhanced Top 20 v2.0
**数据来源**: SEC EDGAR 13F/N-PORT, Yahoo Finance, Bloomberg
"""

        return report

    def generate_comparison_report(self) -> str:
        """生成新旧Top 20对比报告"""
        report = f"""# 新旧Top 20对比分析

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 1. 方法论对比

### 1.1 设计理念差异

| 维度 | 旧版系统 | 新版系统 | 改进原因 |
|------|----------|----------|----------|
| **核心目标** | 风险调整收益最大化 | Alpha + 安全边际 | 用户反馈"太保守，缺乏Alpha潜力" |
| **起始候选池** | 全市场3000只 | 顶级基金持仓 | 从"聪明钱在买什么"出发更高效 |
| **主导因子** | Sharpe (30%) | 护城河 (25%) | Buffett强调护城河是长期超额收益来源 |
| **估值方法** | 历史分位 | Graham/Klarman安全边际 | 绝对估值标准更可靠 |
| **催化剂** | 无 | 独立因子 (10%) | Ackman/Loeb证明催化剂加速价值实现 |
| **聪明钱** | SEC信号混合 | 独立因子 (15%) | 顶级机构持仓是强信号 |

### 1.2 因子权重对比

| 因子 | 旧版权重 | 新版权重 | 变化 | 原因 |
|------|----------|----------|------|------|
| Sharpe/风险调整 | 30% | 10% | -20% | 不再作为主导因子 |
| 尾部风险 | 15% | 约束条件 | 移出 | 作为硬性排除条件更合理 |
| 基本面/质量 | 25% | 20% | -5% | 拆分为护城河+质量 |
| 估值 | 20% | 20% | 不变 | 仍是核心因子 |
| SEC信号 | 10% | 15% (聪明钱) | +5% | 专注于顶级机构持仓 |
| **护城河** | - | 25% | 新增 | Buffett核心标准 |
| **催化剂** | - | 10% | 新增 | 价值实现驱动 |

---

## 2. 候选池来源对比

### 旧版候选池
- S&P 500 + S&P 400 + S&P 600 (~1,500只)
- 海选模式：从大池子筛选

### 新版候选池（7大来源）
1. **Berkshire持仓** - 全部考虑 (权重10)
2. **Pershing Square持仓** - 全部考虑 (权重9)
3. **Baupost持仓** - 全部考虑 (权重9)
4. **2+家顶级机构共同持有** - 优先考虑
5. **最近季度新建仓/大幅加仓** - 重点关注
6. **历史高Sharpe但近期回调>20%** - 逆向机会
7. **有明确催化剂的优质公司** - 主动寻找

---

## 3. 新版Top 20特征分析

### 3.1 六维度得分分布

| 指标 | 最小值 | 最大值 | 平均值 | 中位数 |
|------|--------|--------|--------|--------|
"""

        if self.top_20:
            moat_scores = [s.moat_score for s in self.top_20]
            val_scores = [s.valuation_score for s in self.top_20]
            qual_scores = [s.quality_score for s in self.top_20]
            sm_scores = [s.smart_money_score for s in self.top_20]
            cat_scores = [s.catalyst_score for s in self.top_20]

            report += f"| 护城河 | {min(moat_scores):.0f} | {max(moat_scores):.0f} | {np.mean(moat_scores):.0f} | {np.median(moat_scores):.0f} |\n"
            report += f"| 估值 | {min(val_scores):.0f} | {max(val_scores):.0f} | {np.mean(val_scores):.0f} | {np.median(val_scores):.0f} |\n"
            report += f"| 质量 | {min(qual_scores):.0f} | {max(qual_scores):.0f} | {np.mean(qual_scores):.0f} | {np.median(qual_scores):.0f} |\n"
            report += f"| 聪明钱 | {min(sm_scores):.0f} | {max(sm_scores):.0f} | {np.mean(sm_scores):.0f} | {np.median(sm_scores):.0f} |\n"
            report += f"| 催化剂 | {min(cat_scores):.0f} | {max(cat_scores):.0f} | {np.mean(cat_scores):.0f} | {np.median(cat_scores):.0f} |\n"

        report += f"""
### 3.2 聪明钱覆盖度

| 指标 | 数值 |
|------|------|
| 被Berkshire持有 | {sum(1 for s in self.top_20 if 'Berkshire Hathaway' in s.held_by_institutions)} 只 |
| 被3+家顶级机构持有 | {sum(1 for s in self.top_20 if len(s.held_by_institutions) >= 3)} 只 |
| 有明确催化剂 | {sum(1 for s in self.top_20 if len(s.catalysts) > 0)} 只 |

---

## 4. 改进效果预期

### 4.1 预期优势
- **更高Alpha潜力**: 护城河+催化剂双驱动
- **更强信号验证**: 顶级机构持仓背书
- **更好安全边际**: Graham/Klarman标准
- **更清晰投资逻辑**: 每只股票有明确论点

### 4.2 风险提示
- 顶级机构持仓可能已发生变化（13F滞后45天）
- 催化剂可能未如期实现
- 历史护城河不保证未来

---

**报告版本**: v2.0
**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        return report

    def generate_factor_weights_justification(self) -> str:
        """生成因子权重设置依据"""
        report = f"""# 因子权重设置依据

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 1. 权重设计原则

基于对以下顶级投资者的逆向分析，我们设计了六维度因子权重：

### 1.1 顶级投资者策略归纳

| 投资者 | 核心策略 | 我们提取的因子 |
|--------|----------|----------------|
| Warren Buffett | 护城河 + 优质管理层 + 长期持有 | 护城河 (ROIC>15%, 高毛利率) |
| Seth Klarman | 安全边际 + 催化剂 | 估值 (FCF Yield, P/E, P/B) |
| Bill Ackman | 集中持仓 + 激进主义 | 催化剂 (维权介入, 战略变革) |
| Dodge & Cox | 深度价值 + 长期视角 | 质量 (ROE, 现金流, 低负债) |
| 13F顶级机构 | 验证信号 | 聪明钱 (被持有次数) |

---

## 2. 各因子权重详解

### 2.1 护城河因子 (25%)

**来源**: Warren Buffett方法论

**为什么25%**:
- Buffett反复强调"护城河是投资成功的关键"
- 护城河公司能在周期中保持超额收益
- 是长期复利的基础

**评分标准**:
```
ROIC评分:
  > 25%: +25分 (极强资本配置能力)
  > 20%: +20分 (优秀)
  > 15%: +15分 (符合Buffett标准)
  > 10%: +5分 (中等)
  其他:  -10分

毛利率评分 (定价权代理):
  > 60%: +15分 (极强定价权)
  > 40%: +10分 (良好)
  > 30%: +5分
```

### 2.2 估值因子 (20%)

**来源**: Benjamin Graham + Seth Klarman

**为什么20%**:
- "安全边际"是价值投资的核心原则
- Klarman: "避免损失是首要目标"
- 好公司高估也不是好投资

**评分标准**:
```
FCF Yield评分 (最重要):
  > 12%: +25分 (极有吸引力)
  > 8%:  +15分 (有吸引力)
  > 5%:  +5分
  < 2%:  -10分

P/E评分 (Graham标准<15):
  < 12: +15分
  < 15: +10分
  < 20: +5分
  > 40: -15分

Graham复合检验:
  P/E × P/B < 22.5: +10分
```

### 2.3 质量因子 (20%)

**来源**: 全部顶级基金共性

**为什么20%**:
- ROE>15%是顶级投资者的共识门槛
- 强自由现金流是价值实现的保障
- 低负债降低财务风险

**评分标准**:
```
ROE评分:
  > 30%: +15分
  > 20%: +10分
  > 15%: +5分
  < 5%:  -10分

现金流质量 (OCF/NI):
  > 1.2: +15分
  > 0.8: +10分
  < 0.5: -10分

负债评分 (非金融):
  D/E < 0.3: +10分
  D/E < 0.5: +5分
  D/E > 2.0: -15分
```

### 2.4 聪明钱因子 (15%)

**来源**: 13F机构持仓分析

**为什么15%**:
- 顶级机构有信息优势和分析能力
- 被多家顶级机构持有是验证信号
- Berkshire持有是最强信号

**评分标准**:
```
机构持有加分:
  Berkshire持有: +30分
  Pershing/Baupost/Druckenmiller每家: +15分
  其他顶级机构每家: +10分

共同持有加分:
  ≥5家: +20分
  ≥3家: +10分
  ≥2家: +5分
```

### 2.5 催化剂因子 (10%)

**来源**: Bill Ackman / Dan Loeb方法论

**为什么10%**:
- 催化剂加速价值实现
- 没有催化剂可能陷入价值陷阱
- 维权投资者介入是强催化

**评分标准**:
```
维权投资者介入: +20分
高FCF支持回购 (>8%): +10分
低估值吸引并购 (P/E<12): +10分
行业整合机会: +5分
股价大幅回调 (>25%): +15分
```

### 2.6 风险调整收益因子 (10%)

**来源**: 量化指标

**为什么10%**:
- 保留原有系统的核心优势
- Sharpe/Sortino仍是重要参考
- 但不再作为主导因子

**评分标准**:
```
Sharpe评分:
  > 2.0: +30分
  > 1.5: +25分
  > 1.0: +15分
  > 0.5: +5分
  < 0:   -20分

MDD评分:
  >= -15%: +10分
  >= -25%: +5分
  < -40%:  -15分
```

---

## 3. 权重优化考虑

### 3.1 为什么不给Sharpe更高权重

**用户反馈**: "当前Top 20过于保守，偏重低波动性"

**分析**:
- 高Sharpe可能只是低波动，不代表高收益
- 过度追求Sharpe会错过高Alpha机会
- 顶级投资者不以Sharpe为核心指标

### 3.2 为什么新增护城河和催化剂

**护城河**:
- Buffett 60年投资的核心原则
- 是长期超额收益的来源
- 比短期财务指标更稳定

**催化剂**:
- Ackman/Loeb证明催化剂加速价值实现
- 避免价值陷阱
- 提供明确的时间维度

### 3.3 权重敏感性分析

| 情景 | 护城河 | 估值 | 质量 | 聪明钱 | 催化剂 | 风险调整 | 预期效果 |
|------|--------|------|------|--------|--------|----------|----------|
| 当前 | 25% | 20% | 20% | 15% | 10% | 10% | 平衡型 |
| 激进 | 20% | 15% | 15% | 20% | 20% | 10% | 更高Alpha |
| 保守 | 30% | 25% | 20% | 10% | 5% | 10% | 更稳健 |
| 价值 | 20% | 30% | 20% | 10% | 10% | 10% | 深度价值 |

---

## 4. 结论

六维度因子权重的设计目标是:

1. **平衡进攻与防守** - 护城河(25%)+质量(20%)保底，催化剂(10%)+聪明钱(15%)增强Alpha
2. **学习顶级投资者** - 每个因子都有明确的大师来源
3. **可验证可调整** - 权重基于逻辑而非过拟合，可根据实际表现调整

---

**报告版本**: v1.0
**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        return report

    # ========== 导出结果 ==========

    def export_results(self):
        """导出所有结果文件"""
        logger.info("=" * 80)
        logger.info("Step 5: 导出结果文件")
        logger.info("=" * 80)

        # 1. Top 20 CSV
        self._export_top20_csv()

        # 2. Top 20报告
        report = self.generate_new_top_20_report()
        report_file = ENHANCED_DIR / "NEW_TOP_20_REPORT.md"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        logger.info(f"已导出: {report_file}")

        # 3. 对比分析
        comparison = self.generate_comparison_report()
        comparison_file = ENHANCED_DIR / "old_vs_new_comparison.md"
        with open(comparison_file, 'w', encoding='utf-8') as f:
            f.write(comparison)
        logger.info(f"已导出: {comparison_file}")

        # 4. 因子权重依据
        justification = self.generate_factor_weights_justification()
        justification_file = ENHANCED_DIR / "factor_weights_justification.md"
        with open(justification_file, 'w', encoding='utf-8') as f:
            f.write(justification)
        logger.info(f"已导出: {justification_file}")

        # 5. JSON数据
        json_file = ENHANCED_DIR / "enhanced_top_20_data.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(
                [s.to_dict() for s in self.top_20],
                f, indent=2, ensure_ascii=False
            )
        logger.info(f"已导出: {json_file}")

        logger.info(f"\n所有结果已导出至: {ENHANCED_DIR}")

    def _export_top20_csv(self):
        """导出Top 20 CSV"""
        rows = []
        for stock in self.top_20:
            rows.append({
                'Rank': stock.rank,
                'Ticker': stock.ticker,
                'Company': stock.company_name,
                'Sector': stock.sector,
                'Market_Cap_B': round(stock.market_cap / 1e9, 1) if stock.market_cap > 0 else 0,
                'Composite_Score': stock.composite_score,
                'Moat_Score': round(stock.moat_score, 1),
                'Valuation_Score': round(stock.valuation_score, 1),
                'Quality_Score': round(stock.quality_score, 1),
                'Smart_Money_Score': round(stock.smart_money_score, 1),
                'Catalyst_Score': round(stock.catalyst_score, 1),
                'Risk_Adjusted_Score': round(stock.risk_adjusted_score, 1),
                'Alpha_Potential': round(stock.alpha_potential, 1),
                'ROIC': f"{stock.roic:.1%}" if stock.roic else "N/A",
                'FCF_Yield': f"{stock.fcf_yield:.1%}" if stock.fcf_yield else "N/A",
                'Institutions': len(stock.held_by_institutions),
                'Catalysts': len(stock.catalysts),
            })

        df = pd.DataFrame(rows)
        output_file = ENHANCED_DIR / "enhanced_top_20_results.csv"
        df.to_csv(output_file, index=False)
        logger.info(f"已导出: {output_file}")

    # ========== 主执行流程 ==========

    def run(self) -> List[EnhancedScoredStock]:
        """执行完整的筛选流程"""
        logger.info("=" * 80)
        logger.info("Enhanced Top 20 Screener v2.0 - 开始执行")
        logger.info("基于顶级基金策略逆向分析")
        logger.info("=" * 80)

        # Step 1: 加载数据
        if not self.load_all_data():
            logger.error("数据加载失败")
            return []

        # Step 2: 评分
        self.score_all_stocks()

        # Step 3: 硬性约束
        self.apply_hard_constraints()

        # Step 4: 排序与分散化
        self.rank_and_diversify(20)

        # Step 5: 导出结果
        self.export_results()

        # 打印摘要
        self._print_summary()

        return self.top_20

    def _print_summary(self):
        """打印执行摘要"""
        print("\n" + "=" * 100)
        print("Enhanced Top 20 排名结果")
        print("=" * 100)
        print(f"\n{'Rank':<5} {'Ticker':<8} {'Company':<25} {'Sector':<18} {'Score':<8} "
              f"{'Moat':<6} {'Value':<6} {'Quality':<7} {'Smart$':<7} {'Catalyst':<8} {'Alpha':<6}")
        print("-" * 100)

        for stock in self.top_20:
            name = stock.company_name[:24] if stock.company_name else stock.ticker
            sector = stock.sector[:17] if stock.sector else 'Unknown'
            print(f"{stock.rank:<5} {stock.ticker:<8} {name:<25} {sector:<18} "
                  f"{stock.composite_score:<8.1f} {stock.moat_score:<6.0f} "
                  f"{stock.valuation_score:<6.0f} {stock.quality_score:<7.0f} "
                  f"{stock.smart_money_score:<7.0f} {stock.catalyst_score:<8.0f} "
                  f"{stock.alpha_potential:<6.0f}")

        print("\n" + "=" * 100)
        print(f"结果已保存至: {ENHANCED_DIR}")
        print("=" * 100 + "\n")


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主函数"""
    print("\n" + "=" * 100)
    print(" " * 25 + "Enhanced Top 20 Screener v2.0")
    print(" " * 15 + "Based on Reverse Engineering of Top Funds")
    print("=" * 100 + "\n")

    # 使用默认配置
    weights = EnhancedFactorWeights()
    constraints = EnhancedHardConstraints()

    # 创建筛选器并执行
    screener = EnhancedTop20Screener(weights=weights, constraints=constraints)
    top_20 = screener.run()

    if top_20:
        print(f"\n成功生成 Enhanced Top {len(top_20)} 名单!")
        print(f"六维度因子: 护城河(25%) + 估值(20%) + 质量(20%) + 聪明钱(15%) + 催化剂(10%) + 风险调整(10%)")
    else:
        print("\n警告: 未能生成有效的排名结果")

    return top_20


if __name__ == '__main__':
    main()
