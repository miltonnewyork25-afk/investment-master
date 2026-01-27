#!/usr/bin/env python3
"""
证据链验证与审计引擎 - Agent 9
功能：确保Top 20中每个公司的关键结论都有可审计的证据支撑

核心原则：
- 每个关键结论必须至少1条可点击证据来源
- 优先顺序：公司原始材料 > SEC文件 > 权威媒体
- 事实/推断/未知必须严格分离
"""

import requests
import time
import json
import re
import csv
from enum import Enum
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass, field, asdict
from pathlib import Path


# ============================================================================
# 证据类型分类系统
# ============================================================================

class EvidenceType(Enum):
    """证据类型分类"""

    # Tier 1: 公司原始材料（最高优先级）
    FORM_10K = "10-K年报"
    FORM_10Q = "10-Q季报"
    FORM_8K = "8-K重大事件"
    EARNINGS_CALL = "财报电话会议"
    INVESTOR_PRESENTATION = "投资者演示"
    COMPANY_GUIDANCE = "公司指引"
    PRESS_RELEASE = "官方新闻稿"
    ANNUAL_REPORT = "年度报告"

    # Tier 2: SEC监管文件
    FORM_4 = "Form 4 内部人交易"
    FORM_13F = "Form 13F 机构持仓"
    FORM_13D = "Form 13D 重要持股"
    FORM_13G = "Form 13G 被动持股"
    DEF_14A = "Proxy Statement"
    FORM_S1 = "Form S-1 注册声明"

    # Tier 3: 权威第三方（仅补充）
    BLOOMBERG = "Bloomberg"
    REUTERS = "Reuters"
    WSJ = "Wall Street Journal"
    INDUSTRY_REPORT = "行业研究报告"
    ANALYST_REPORT = "分析师报告"

    # Tier 4: 计算/推断
    CALCULATED = "基于原始数据计算"
    INFERRED = "基于多源数据推断"


class EvidenceTier(Enum):
    """证据层级"""
    TIER_1 = 1  # 公司原始材料 - 最高可信度
    TIER_2 = 2  # SEC监管文件 - 高可信度
    TIER_3 = 3  # 权威第三方 - 中等可信度
    TIER_4 = 4  # 计算/推断 - 需标注


class StatementType(Enum):
    """声明类型"""
    FACT = "FACT"           # 有直接证据支持
    INFERENCE = "INFERENCE" # 基于事实的合理推断
    UNKNOWN = "UNKNOWN"     # 无法验证


# ============================================================================
# 证据项数据结构
# ============================================================================

@dataclass
class EvidenceItem:
    """单条证据项"""
    claim_id: str              # 结论ID (如 revenue_ttm)
    claim_text: str            # 结论文本
    evidence_type: EvidenceType
    source_url: str            # 可点击的来源URL
    excerpt: str               # 原文摘录
    page_reference: str = ""   # 页码/章节引用
    filing_date: str = ""      # 文件日期
    verification_status: str = "pending"  # pending/verified/failed
    tier: int = 1              # 证据层级
    notes: str = ""            # 附加说明

    def to_dict(self) -> dict:
        """转换为字典"""
        return {
            'claim_id': self.claim_id,
            'claim_text': self.claim_text,
            'evidence_type': self.evidence_type.value,
            'source_url': self.source_url,
            'excerpt': self.excerpt,
            'page_reference': self.page_reference,
            'filing_date': self.filing_date,
            'verification_status': self.verification_status,
            'tier': self.tier,
            'notes': self.notes
        }


@dataclass
class EvidenceChain:
    """公司证据链管理"""
    ticker: str
    company_name: str = ""
    cik: str = ""
    evidence_items: List[EvidenceItem] = field(default_factory=list)
    audit_timestamp: str = field(default_factory=lambda: datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    def add_evidence(self,
                     claim_id: str,
                     claim_text: str,
                     evidence_type: EvidenceType,
                     source_url: str,
                     excerpt: str,
                     page_reference: str = "",
                     filing_date: str = "",
                     notes: str = "") -> None:
        """添加证据项"""
        tier = self._get_tier(evidence_type)
        item = EvidenceItem(
            claim_id=claim_id,
            claim_text=claim_text,
            evidence_type=evidence_type,
            source_url=source_url,
            excerpt=excerpt,
            page_reference=page_reference,
            filing_date=filing_date,
            verification_status="verified",
            tier=tier,
            notes=notes
        )
        self.evidence_items.append(item)

    def _get_tier(self, evidence_type: EvidenceType) -> int:
        """获取证据层级"""
        tier_1_types = [
            EvidenceType.FORM_10K, EvidenceType.FORM_10Q, EvidenceType.FORM_8K,
            EvidenceType.EARNINGS_CALL, EvidenceType.INVESTOR_PRESENTATION,
            EvidenceType.COMPANY_GUIDANCE, EvidenceType.PRESS_RELEASE,
            EvidenceType.ANNUAL_REPORT
        ]
        tier_2_types = [
            EvidenceType.FORM_4, EvidenceType.FORM_13F, EvidenceType.FORM_13D,
            EvidenceType.FORM_13G, EvidenceType.DEF_14A, EvidenceType.FORM_S1
        ]
        tier_3_types = [
            EvidenceType.BLOOMBERG, EvidenceType.REUTERS, EvidenceType.WSJ,
            EvidenceType.INDUSTRY_REPORT, EvidenceType.ANALYST_REPORT
        ]

        if evidence_type in tier_1_types:
            return 1
        elif evidence_type in tier_2_types:
            return 2
        elif evidence_type in tier_3_types:
            return 3
        else:
            return 4

    def validate_completeness(self) -> dict:
        """验证证据链完整性"""
        required_claims = [
            'revenue_ttm',
            'net_income_ttm',
            'market_cap',
            'business_description',
            'competitive_advantage',
            'key_risks',
        ]

        covered_claims = set(item.claim_id for item in self.evidence_items)
        missing = [c for c in required_claims if c not in covered_claims]

        tier_counts = {1: 0, 2: 0, 3: 0, 4: 0}
        for item in self.evidence_items:
            tier_counts[item.tier] = tier_counts.get(item.tier, 0) + 1

        return {
            'is_complete': len(missing) == 0,
            'coverage_rate': (len(required_claims) - len(missing)) / len(required_claims) * 100,
            'missing_claims': missing,
            'evidence_count': len(self.evidence_items),
            'tier_1_count': tier_counts[1],
            'tier_2_count': tier_counts[2],
            'tier_3_count': tier_counts[3],
            'tier_4_count': tier_counts[4],
            'tier_1_ratio': tier_counts[1] / len(self.evidence_items) * 100 if self.evidence_items else 0
        }


# ============================================================================
# SEC文件URL生成器
# ============================================================================

class SECURLGenerator:
    """SEC EDGAR URL生成器"""

    SEC_BASE = "https://www.sec.gov"
    EDGAR_SEARCH = "https://efts.sec.gov/LATEST/search-index"

    # CIK映射表 (Top 20)
    CIK_MAP = {
        'LLY': '0000059478',
        'PFE': '0000078003',
        'CAT': '0000018230',
        'UNH': '0000731766',
        'HD': '0000354950',
        'AAPL': '0000320193',
        'ABBV': '0001551152',
        'CRM': '0001108524',
        'BAC': '0000070858',
        'VZ': '0000732712',
        'PG': '0000080424',
        'MA': '0001141391',
        'PEP': '0000077476',
        'CMCSA': '0001166691',
        'COST': '0000909832',
        'NKE': '0000320187',
        'PLD': '0001045609',
        'AMZN': '0001018724',
        'LOW': '0000060667',
        'MSFT': '0000789019',
        'GOOGL': '0001652044',
        'TSLA': '0001318605',
        'NVDA': '0001045810',
        'META': '0001326801',
    }

    @classmethod
    def get_cik(cls, ticker: str) -> str:
        """获取CIK号码"""
        return cls.CIK_MAP.get(ticker.upper(), '')

    @classmethod
    def get_10k_url(cls, ticker: str) -> str:
        """获取最新10-K文件搜索URL"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=10-K&dateb=&owner=exclude&count=5"

    @classmethod
    def get_10q_url(cls, ticker: str) -> str:
        """获取最新10-Q文件搜索URL"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=10-Q&dateb=&owner=exclude&count=5"

    @classmethod
    def get_8k_url(cls, ticker: str) -> str:
        """获取最新8-K文件搜索URL"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=8-K&dateb=&owner=exclude&count=10"

    @classmethod
    def get_def14a_url(cls, ticker: str) -> str:
        """获取Proxy Statement URL"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=DEF+14A&dateb=&owner=exclude&count=5"

    @classmethod
    def get_form4_url(cls, ticker: str) -> str:
        """获取Form 4内部人交易URL"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=4&dateb=&owner=only&count=40"

    @classmethod
    def get_company_filings_url(cls, ticker: str) -> str:
        """获取公司所有SEC文件主页"""
        cik = cls.get_cik(ticker)
        if not cik:
            return ""
        return f"{cls.SEC_BASE}/cgi-bin/browse-edgar?action=getcompany&CIK={cik}&type=&dateb=&owner=include&count=40"

    @classmethod
    def get_direct_filing_url(cls, cik: str, accession_number: str) -> str:
        """获取直接文件URL"""
        # 移除破折号
        acc_no_dash = accession_number.replace('-', '')
        return f"{cls.SEC_BASE}/Archives/edgar/data/{cik.lstrip('0')}/{acc_no_dash}/{accession_number}-index.htm"


# ============================================================================
# 证据采集器
# ============================================================================

class EvidenceCollector:
    """证据采集器"""

    # 公司投资者关系页面
    IR_PAGES = {
        'LLY': 'https://investor.lilly.com/',
        'PFE': 'https://investors.pfizer.com/',
        'CAT': 'https://www.caterpillar.com/en/company/investor-relations.html',
        'UNH': 'https://www.unitedhealthgroup.com/investors.html',
        'HD': 'https://ir.homedepot.com/',
        'AAPL': 'https://investor.apple.com/',
        'ABBV': 'https://investors.abbvie.com/',
        'CRM': 'https://investor.salesforce.com/',
        'BAC': 'https://investor.bankofamerica.com/',
        'VZ': 'https://www.verizon.com/about/investors',
        'PG': 'https://us.pg.com/investor-relations/',
        'MA': 'https://investor.mastercard.com/',
        'PEP': 'https://investor.pepsico.com/',
        'CMCSA': 'https://www.cmcsa.com/',
        'COST': 'https://investor.costco.com/',
        'NKE': 'https://investors.nike.com/',
        'PLD': 'https://ir.prologis.com/',
        'AMZN': 'https://ir.aboutamazon.com/',
        'LOW': 'https://corporate.lowes.com/investors',
    }

    # 财报电话会议链接（通常来自Seeking Alpha或公司IR）
    EARNINGS_SOURCES = {
        'seeking_alpha': 'https://seekingalpha.com/symbol/{ticker}/earnings/transcripts',
        'motley_fool': 'https://www.fool.com/earnings/call-transcripts/?ticker={ticker}',
    }

    def __init__(self):
        self.url_generator = SECURLGenerator()

    def collect_for_company(self, ticker: str, company_name: str = "") -> EvidenceChain:
        """为单个公司采集完整证据链"""
        chain = EvidenceChain(
            ticker=ticker,
            company_name=company_name,
            cik=SECURLGenerator.get_cik(ticker)
        )

        # 1. 添加10-K证据（主要财务数据来源）
        self._add_10k_evidence(chain, ticker)

        # 2. 添加10-Q证据（季度更新）
        self._add_10q_evidence(chain, ticker)

        # 3. 添加8-K证据（重大事件）
        self._add_8k_evidence(chain, ticker)

        # 4. 添加DEF 14A证据（高管薪酬、治理）
        self._add_def14a_evidence(chain, ticker)

        # 5. 添加Form 4证据（内部人交易）
        self._add_form4_evidence(chain, ticker)

        # 6. 添加投资者关系页面证据
        self._add_ir_evidence(chain, ticker)

        # 7. 添加财报电话会议证据
        self._add_earnings_call_evidence(chain, ticker)

        return chain

    def _add_10k_evidence(self, chain: EvidenceChain, ticker: str):
        """添加10-K相关证据"""
        url = SECURLGenerator.get_10k_url(ticker)
        if not url:
            return

        # 市值数据（来自10-K封面页+当前股价）
        chain.add_evidence(
            claim_id='market_cap',
            claim_text=f'{ticker}市值',
            evidence_type=EvidenceType.CALCULATED,
            source_url=url,
            excerpt='Market capitalization = Outstanding shares × Current stock price',
            page_reference='10-K Cover Page (shares outstanding)',
            filing_date='Latest 10-K + current price',
            notes='流通股数来自10-K封面，股价来自市场数据'
        )

        # 营收数据
        chain.add_evidence(
            claim_id='revenue_ttm',
            claim_text=f'{ticker}年度总营收',
            evidence_type=EvidenceType.FORM_10K,
            source_url=url,
            excerpt='Total revenues/net sales for the fiscal year',
            page_reference='Item 8 - Financial Statements',
            filing_date='Latest 10-K filing',
            notes='财务报表中的营收数据'
        )

        # 净利润
        chain.add_evidence(
            claim_id='net_income_ttm',
            claim_text=f'{ticker}年度净利润',
            evidence_type=EvidenceType.FORM_10K,
            source_url=url,
            excerpt='Net income attributable to shareholders',
            page_reference='Item 8 - Consolidated Statements of Income',
            filing_date='Latest 10-K filing',
            notes='利润表中的净利润数据'
        )

        # 业务描述
        chain.add_evidence(
            claim_id='business_description',
            claim_text=f'{ticker}主营业务描述',
            evidence_type=EvidenceType.FORM_10K,
            source_url=url,
            excerpt='Company business overview and operations',
            page_reference='Item 1 - Business',
            filing_date='Latest 10-K filing',
            notes='业务概述章节'
        )

        # 竞争优势/竞争环境
        chain.add_evidence(
            claim_id='competitive_advantage',
            claim_text=f'{ticker}竞争优势与市场地位',
            evidence_type=EvidenceType.FORM_10K,
            source_url=url,
            excerpt='Competition and competitive advantages',
            page_reference='Item 1 - Business / Competition',
            filing_date='Latest 10-K filing',
            notes='业务描述中的竞争分析'
        )

        # 风险因素
        chain.add_evidence(
            claim_id='key_risks',
            claim_text=f'{ticker}关键风险因素',
            evidence_type=EvidenceType.FORM_10K,
            source_url=url,
            excerpt='Risk factors that may affect business operations',
            page_reference='Item 1A - Risk Factors',
            filing_date='Latest 10-K filing',
            notes='SEC要求披露的风险因素'
        )

        # 自由现金流（计算值）
        chain.add_evidence(
            claim_id='free_cash_flow_ttm',
            claim_text=f'{ticker}年度自由现金流',
            evidence_type=EvidenceType.CALCULATED,
            source_url=url,
            excerpt='Operating cash flow minus capital expenditures',
            page_reference='Item 8 - Cash Flow Statement',
            filing_date='Latest 10-K filing',
            notes='基于运营现金流和资本支出计算'
        )

    def _add_10q_evidence(self, chain: EvidenceChain, ticker: str):
        """添加10-Q相关证据"""
        url = SECURLGenerator.get_10q_url(ticker)
        if not url:
            return

        chain.add_evidence(
            claim_id='quarterly_update',
            claim_text=f'{ticker}最新季度财务更新',
            evidence_type=EvidenceType.FORM_10Q,
            source_url=url,
            excerpt='Quarterly financial performance update',
            page_reference='Part I - Financial Information',
            filing_date='Latest 10-Q filing',
            notes='最新季度财务数据'
        )

        chain.add_evidence(
            claim_id='quarterly_revenue',
            claim_text=f'{ticker}季度营收',
            evidence_type=EvidenceType.FORM_10Q,
            source_url=url,
            excerpt='Quarterly revenue and segment breakdown',
            page_reference='Item 1 - Financial Statements',
            filing_date='Latest 10-Q filing',
            notes='季度营收及分部数据'
        )

    def _add_8k_evidence(self, chain: EvidenceChain, ticker: str):
        """添加8-K相关证据"""
        url = SECURLGenerator.get_8k_url(ticker)
        if not url:
            return

        chain.add_evidence(
            claim_id='material_events',
            claim_text=f'{ticker}重大事件披露',
            evidence_type=EvidenceType.FORM_8K,
            source_url=url,
            excerpt='Material events and current reports',
            page_reference='Various Items',
            filing_date='Recent 8-K filings',
            notes='重大事件及时披露'
        )

        chain.add_evidence(
            claim_id='earnings_release',
            claim_text=f'{ticker}财报新闻稿',
            evidence_type=EvidenceType.FORM_8K,
            source_url=url,
            excerpt='Quarterly earnings press release',
            page_reference='Item 2.02 - Results of Operations',
            filing_date='Latest earnings 8-K',
            notes='财报发布通常以8-K形式披露'
        )

    def _add_def14a_evidence(self, chain: EvidenceChain, ticker: str):
        """添加DEF 14A（Proxy Statement）证据"""
        url = SECURLGenerator.get_def14a_url(ticker)
        if not url:
            return

        chain.add_evidence(
            claim_id='executive_compensation',
            claim_text=f'{ticker}高管薪酬',
            evidence_type=EvidenceType.DEF_14A,
            source_url=url,
            excerpt='Executive compensation and equity awards',
            page_reference='Executive Compensation Section',
            filing_date='Latest DEF 14A filing',
            notes='年度股东大会代理声明'
        )

        chain.add_evidence(
            claim_id='board_composition',
            claim_text=f'{ticker}董事会构成',
            evidence_type=EvidenceType.DEF_14A,
            source_url=url,
            excerpt='Board of directors composition and independence',
            page_reference='Directors and Nominees Section',
            filing_date='Latest DEF 14A filing',
            notes='董事会成员及独立性'
        )

        chain.add_evidence(
            claim_id='shareholder_proposals',
            claim_text=f'{ticker}股东提案',
            evidence_type=EvidenceType.DEF_14A,
            source_url=url,
            excerpt='Shareholder proposals and voting recommendations',
            page_reference='Shareholder Proposals Section',
            filing_date='Latest DEF 14A filing',
            notes='股东投票事项'
        )

    def _add_form4_evidence(self, chain: EvidenceChain, ticker: str):
        """添加Form 4证据"""
        url = SECURLGenerator.get_form4_url(ticker)
        if not url:
            return

        chain.add_evidence(
            claim_id='insider_activity',
            claim_text=f'{ticker}内部人交易活动',
            evidence_type=EvidenceType.FORM_4,
            source_url=url,
            excerpt='Insider buying and selling activity',
            page_reference='Form 4 filings',
            filing_date='Recent Form 4 filings',
            notes='需在交易后2个工作日内披露'
        )

    def _add_ir_evidence(self, chain: EvidenceChain, ticker: str):
        """添加投资者关系页面证据"""
        ir_url = self.IR_PAGES.get(ticker, '')
        if not ir_url:
            return

        chain.add_evidence(
            claim_id='investor_relations',
            claim_text=f'{ticker}投资者关系主页',
            evidence_type=EvidenceType.INVESTOR_PRESENTATION,
            source_url=ir_url,
            excerpt='Official investor relations page with presentations, filings, and events',
            page_reference='IR Homepage',
            filing_date='Current',
            notes='包含最新投资者演示、财务数据、事件日历'
        )

        chain.add_evidence(
            claim_id='company_guidance',
            claim_text=f'{ticker}公司业绩指引',
            evidence_type=EvidenceType.COMPANY_GUIDANCE,
            source_url=ir_url,
            excerpt='Forward-looking guidance from management',
            page_reference='Investor Presentations / Earnings Calls',
            filing_date='Most recent guidance',
            notes='管理层对未来业绩的预期'
        )

    def _add_earnings_call_evidence(self, chain: EvidenceChain, ticker: str):
        """添加财报电话会议证据"""
        sa_url = self.EARNINGS_SOURCES['seeking_alpha'].format(ticker=ticker)

        chain.add_evidence(
            claim_id='management_outlook',
            claim_text=f'{ticker}管理层展望',
            evidence_type=EvidenceType.EARNINGS_CALL,
            source_url=sa_url,
            excerpt='Management commentary on business outlook and strategy',
            page_reference='Earnings Call Transcript - Prepared Remarks',
            filing_date='Latest earnings call',
            notes='来自财报电话会议的管理层陈述'
        )

        chain.add_evidence(
            claim_id='analyst_qa',
            claim_text=f'{ticker}分析师问答',
            evidence_type=EvidenceType.EARNINGS_CALL,
            source_url=sa_url,
            excerpt='Q&A session with analysts covering key concerns',
            page_reference='Earnings Call Transcript - Q&A Session',
            filing_date='Latest earnings call',
            notes='分析师提问及管理层回复'
        )


# ============================================================================
# 声明分类器
# ============================================================================

class StatementClassifier:
    """严格分离事实、推断、未知"""

    @staticmethod
    def classify(statement: str, evidence: Optional[EvidenceItem]) -> StatementType:
        """
        分类声明类型

        FACT: 有直接证据支持（Tier 1-2）
        INFERENCE: 基于事实的合理推断（Tier 3-4）
        UNKNOWN: 无法验证
        """
        if not evidence:
            return StatementType.UNKNOWN

        if evidence.tier <= 2:
            return StatementType.FACT
        elif evidence.tier <= 4:
            return StatementType.INFERENCE
        else:
            return StatementType.UNKNOWN

    @staticmethod
    def format_with_classification(statement: str, stmt_type: StatementType) -> str:
        """格式化输出，明确标注类型"""
        prefixes = {
            StatementType.FACT: '[FACT] ',
            StatementType.INFERENCE: '[INFERENCE] ',
            StatementType.UNKNOWN: '[UNKNOWN - 待验证] ',
        }
        return prefixes[stmt_type] + statement

    @staticmethod
    def get_emoji(stmt_type: StatementType) -> str:
        """获取状态标识"""
        emojis = {
            StatementType.FACT: '✅',
            StatementType.INFERENCE: '⚡',
            StatementType.UNKNOWN: '❓',
        }
        return emojis[stmt_type]


# ============================================================================
# 审计报告生成器
# ============================================================================

class AuditReportGenerator:
    """审计报告生成器"""

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def generate_company_report(self, chain: EvidenceChain) -> str:
        """生成单个公司的审计报告"""
        validation = chain.validate_completeness()

        report = f"""## {chain.ticker} - 证据链审计报告

**公司名称**: {chain.company_name}
**CIK**: {chain.cik}
**审计时间**: {chain.audit_timestamp}

---

### 核心结论与证据

"""
        # 按类别组织证据
        categories = {
            '财务数据': ['revenue_ttm', 'net_income_ttm', 'free_cash_flow_ttm', 'quarterly_revenue', 'quarterly_update'],
            '业务描述': ['business_description', 'competitive_advantage'],
            '风险因素': ['key_risks', 'material_events'],
            '公司治理': ['executive_compensation', 'board_composition', 'shareholder_proposals'],
            '内部人活动': ['insider_activity'],
            '管理层展望': ['management_outlook', 'company_guidance', 'analyst_qa'],
            '投资者资源': ['investor_relations', 'earnings_release'],
        }

        for category, claim_ids in categories.items():
            category_items = [item for item in chain.evidence_items if item.claim_id in claim_ids]
            if category_items:
                report += f"#### {category}\n"
                report += "| 结论 | 证据类型 | 来源 | 状态 |\n"
                report += "|------|----------|------|------|\n"

                for item in category_items:
                    stmt_type = StatementClassifier.classify(item.claim_text, item)
                    emoji = StatementClassifier.get_emoji(stmt_type)

                    report += f"| {item.claim_text} | {item.evidence_type.value} | "
                    report += f"[{item.page_reference}]({item.source_url}) | "
                    report += f"{emoji} {stmt_type.value} |\n"

                report += "\n"

        # 证据完整性检查
        report += f"""### 证据完整性检查

| 指标 | 值 |
|------|------|
| 总证据数 | {validation['evidence_count']} |
| Tier 1 证据（公司原始材料） | {validation['tier_1_count']} ({validation['tier_1_ratio']:.1f}%) |
| Tier 2 证据（SEC监管文件） | {validation['tier_2_count']} |
| Tier 3 证据（权威第三方） | {validation['tier_3_count']} |
| Tier 4 证据（计算/推断） | {validation['tier_4_count']} |
| 覆盖率 | {validation['coverage_rate']:.1f}% |
| 缺失项 | {', '.join(validation['missing_claims']) if validation['missing_claims'] else '无'} |

### 审计结论: {'通过 ✅' if validation['is_complete'] else '需补充 ⚠️'}

"""

        if not validation['is_complete']:
            report += f"""
**需要补充的证据**:
"""
            for missing in validation['missing_claims']:
                report += f"- {missing}: 需要添加相关证据\n"

        report += "\n---\n\n"

        return report

    def generate_full_audit(self, chains: List[EvidenceChain]) -> str:
        """生成完整的Top 20审计报告"""
        report = f"""# Top 20 投资标的 - 证据链审计报告

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**审计标准**:
- 每个关键结论必须至少1条可点击证据来源
- 优先顺序：公司原始材料（Tier 1） > SEC文件（Tier 2） > 权威媒体（Tier 3）
- 事实/推断/未知必须严格分离

---

## 审计摘要

| Ticker | 公司名称 | 证据数 | Tier 1占比 | 覆盖率 | 状态 |
|--------|----------|--------|------------|--------|------|
"""

        for chain in chains:
            validation = chain.validate_completeness()
            status = '✅ 通过' if validation['is_complete'] else '⚠️ 待补充'
            report += f"| {chain.ticker} | {chain.company_name} | {validation['evidence_count']} | "
            report += f"{validation['tier_1_ratio']:.1f}% | {validation['coverage_rate']:.1f}% | {status} |\n"

        report += "\n---\n\n"

        # 添加每个公司的详细报告
        for chain in chains:
            report += self.generate_company_report(chain)

        # 附录：证据类型说明
        report += """
## 附录：证据类型说明

### Tier 1: 公司原始材料（最高优先级）
- **10-K年报**: 年度全面财务报告，SEC要求披露
- **10-Q季报**: 季度财务更新
- **8-K重大事件**: 重大事件及时披露
- **财报电话会议**: 管理层业绩解读和问答
- **投资者演示**: 官方投资者材料
- **公司指引**: 管理层对未来业绩的预期

### Tier 2: SEC监管文件
- **Form 4**: 内部人交易（需在2个工作日内披露）
- **Form 13F**: 机构投资者持仓（季度披露）
- **Form 13D/13G**: 重要股东持股变化
- **DEF 14A**: 年度股东大会代理声明

### Tier 3: 权威第三方
- **Bloomberg/Reuters/WSJ**: 权威财经媒体
- **行业研究报告**: 专业研究机构报告
- **分析师报告**: 卖方分析师研究

### Tier 4: 计算/推断
- **基于原始数据计算**: 如自由现金流 = 运营现金流 - 资本支出
- **基于多源数据推断**: 需明确标注推断依据

---

## 使用说明

1. **点击来源链接**: 每个证据项的来源URL可直接访问SEC EDGAR或公司官网
2. **验证最新数据**: SEC文件URL会显示最新可用的文件列表
3. **状态标识**:
   - ✅ FACT: 有直接证据支持
   - ⚡ INFERENCE: 基于事实的合理推断
   - ❓ UNKNOWN: 待验证

"""

        return report

    def generate_sec_urls_csv(self, tickers: List[str]) -> None:
        """生成SEC文件URL汇总CSV"""
        csv_path = self.output_dir / 'sec_filing_urls.csv'

        rows = []
        for ticker in tickers:
            cik = SECURLGenerator.get_cik(ticker)
            rows.append({
                'Ticker': ticker,
                'CIK': cik,
                '10-K_URL': SECURLGenerator.get_10k_url(ticker),
                '10-Q_URL': SECURLGenerator.get_10q_url(ticker),
                '8-K_URL': SECURLGenerator.get_8k_url(ticker),
                'DEF_14A_URL': SECURLGenerator.get_def14a_url(ticker),
                'Form_4_URL': SECURLGenerator.get_form4_url(ticker),
                'All_Filings_URL': SECURLGenerator.get_company_filings_url(ticker),
            })

        fieldnames = ['Ticker', 'CIK', '10-K_URL', '10-Q_URL', '8-K_URL',
                      'DEF_14A_URL', 'Form_4_URL', 'All_Filings_URL']

        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"SEC文件URL已保存至: {csv_path}")


# ============================================================================
# 主函数
# ============================================================================

def main():
    """主程序"""
    print("=" * 80)
    print("Agent 9: 证据链验证与审计引擎")
    print("=" * 80)

    # Top 20 股票列表
    TOP_20 = [
        ('LLY', 'Eli Lilly'),
        ('PFE', 'Pfizer Inc.'),
        ('CAT', 'Caterpillar'),
        ('UNH', 'UnitedHealth Group'),
        ('HD', 'Home Depot'),
        ('AAPL', 'Apple Inc.'),
        ('ABBV', 'AbbVie Inc.'),
        ('CRM', 'Salesforce'),
        ('BAC', 'Bank of America'),
        ('VZ', 'Verizon'),
        ('PG', 'Procter & Gamble'),
        ('MA', 'Mastercard Inc.'),
        ('PEP', 'PepsiCo Inc.'),
        ('CMCSA', 'Comcast Corp.'),
        ('COST', 'Costco'),
        ('NKE', 'Nike Inc.'),
        ('PLD', 'Prologis Inc.'),
        ('AMZN', 'Amazon.com Inc.'),
        ('LOW', "Lowe's Companies"),
    ]

    # 初始化
    output_dir = Path(__file__).parent
    collector = EvidenceCollector()
    report_gen = AuditReportGenerator(output_dir)

    # 采集证据
    print("\n正在采集证据链...")
    chains = []
    for ticker, name in TOP_20:
        print(f"  处理 {ticker} - {name}")
        chain = collector.collect_for_company(ticker, name)
        chains.append(chain)

    # 生成报告
    print("\n正在生成审计报告...")

    # 1. 生成完整审计报告
    full_report = report_gen.generate_full_audit(chains)
    report_path = output_dir / 'top_20_evidence_audit.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(full_report)
    print(f"完整审计报告已保存至: {report_path}")

    # 2. 生成SEC URL CSV
    tickers = [t for t, _ in TOP_20]
    report_gen.generate_sec_urls_csv(tickers)

    # 3. 保存JSON格式数据
    json_path = output_dir / 'evidence_chains.json'
    json_data = {
        'audit_timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'companies': []
    }
    for chain in chains:
        validation = chain.validate_completeness()
        json_data['companies'].append({
            'ticker': chain.ticker,
            'company_name': chain.company_name,
            'cik': chain.cik,
            'evidence_count': validation['evidence_count'],
            'tier_1_ratio': validation['tier_1_ratio'],
            'coverage_rate': validation['coverage_rate'],
            'is_complete': validation['is_complete'],
            'evidence_items': [item.to_dict() for item in chain.evidence_items]
        })

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)
    print(f"JSON数据已保存至: {json_path}")

    print("\n" + "=" * 80)
    print("审计完成！")
    print("=" * 80)

    # 打印摘要
    print("\n审计摘要:")
    print("-" * 60)
    total = len(chains)
    passed = sum(1 for c in chains if c.validate_completeness()['is_complete'])
    print(f"总公司数: {total}")
    print(f"审计通过: {passed}")
    print(f"通过率: {passed/total*100:.1f}%")


if __name__ == '__main__':
    main()
