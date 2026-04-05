#!/usr/bin/env python3
"""
Intelligent Memory System
=========================

智能Memory检索系统：从存储到推理
主动关联推荐相关历史洞见，而非被动等待调用

Version: 1.0
Author: 投资大师 Framework v19.9+ Phase 3-4
"""

import json
import logging
import re
from typing import Dict, List, Optional, Tuple, Set
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from pathlib import Path
import hashlib

class MemoryType(Enum):
    """记忆类型"""
    COMPANY_ANALYSIS = "company_analysis"     # 公司分析
    INDUSTRY_INSIGHT = "industry_insight"     # 行业洞见
    VALUATION_PATTERN = "valuation_pattern"   # 估值模式
    RISK_PATTERN = "risk_pattern"            # 风险模式
    MARKET_LESSON = "market_lesson"          # 市场教训
    FRAMEWORK_EVOLUTION = "framework_evo"     # 框架演化
    SUCCESS_PATTERN = "success_pattern"       # 成功模式
    FAILURE_LESSON = "failure_lesson"         # 失败教训

class RelevanceSignal(Enum):
    """相关性信号"""
    SAME_TICKER = "same_ticker"               # 相同股票
    SAME_INDUSTRY = "same_industry"           # 相同行业
    SIMILAR_BUSINESS = "similar_business"     # 相似业务
    SAME_PROBLEM = "same_problem"            # 相同问题
    ANALOGOUS_SITUATION = "analogous"         # 类比情况
    CAUSAL_CHAIN = "causal_chain"            # 因果链
    PATTERN_MATCH = "pattern_match"          # 模式匹配

@dataclass
class MemoryNode:
    """记忆节点"""
    node_id: str
    memory_type: MemoryType
    content: str
    metadata: Dict
    tags: Set[str]
    relevance_score: float  # 0-1
    created_at: datetime
    last_accessed: datetime
    access_count: int
    source_file: Optional[str] = None

@dataclass
class MemoryLink:
    """记忆关联"""
    from_node: str
    to_node: str
    link_type: RelevanceSignal
    strength: float  # 0-1
    context: str
    created_at: datetime

@dataclass
class QueryContext:
    """查询上下文"""
    current_ticker: str
    current_industry: str
    current_phase: str
    analysis_focus: List[str]  # ["valuation", "risks", "competitive"]
    key_concepts: Set[str]
    business_model_keywords: Set[str]
    current_concerns: List[str]

class IntelligentMemoryManager:
    """智能记忆管理器"""

    def __init__(self, memory_base_path: str):
        self.memory_base_path = Path(memory_base_path)
        self.memory_nodes: Dict[str, MemoryNode] = {}
        self.memory_links: List[MemoryLink] = []
        self.concept_index: Dict[str, Set[str]] = {}  # concept -> node_ids
        self.ticker_index: Dict[str, Set[str]] = {}   # ticker -> node_ids
        self.industry_index: Dict[str, Set[str]] = {} # industry -> node_ids

        # 初始化
        self._initialize_memory_base()
        self._build_indexes()

    def _initialize_memory_base(self) -> None:
        """初始化记忆库"""
        self.memory_base_path.mkdir(parents=True, exist_ok=True)

        # 扫描现有memory文件
        self._load_existing_memories()

    def _load_existing_memories(self) -> None:
        """加载现有记忆"""
        logging.info("Loading existing memories...")

        # 加载用户memory
        user_memory_path = self.memory_base_path
        if user_memory_path.exists():
            self._scan_memory_directory(user_memory_path)

        # 加载报告archives
        reports_path = self.memory_base_path.parent.parent / "reports"
        if reports_path.exists():
            self._scan_reports_directory(reports_path)

        # 加载knowledge base
        knowledge_path = self.memory_base_path.parent.parent / "knowledge"
        if knowledge_path.exists():
            self._scan_knowledge_directory(knowledge_path)

        logging.info(f"Loaded {len(self.memory_nodes)} memory nodes")

    def _scan_memory_directory(self, memory_dir: Path) -> None:
        """扫描memory目录"""
        for memory_file in memory_dir.glob("*.md"):
            try:
                content = memory_file.read_text(encoding='utf-8')
                node = self._parse_memory_file(content, str(memory_file))
                if node:
                    self.memory_nodes[node.node_id] = node
            except Exception as e:
                logging.warning(f"Failed to load memory file {memory_file}: {e}")

    def _scan_reports_directory(self, reports_dir: Path) -> None:
        """扫描报告目录提取洞见"""
        for ticker_dir in reports_dir.iterdir():
            if ticker_dir.is_dir():
                ticker = ticker_dir.name

                # 扫描主报告文件
                for report_file in ticker_dir.glob("*.md"):
                    if report_file.name.startswith("Complete_"):
                        self._extract_insights_from_report(report_file, ticker)

                # 扫描digest cards
                digest_files = list(ticker_dir.glob("*_digest_card.yaml"))
                for digest_file in digest_files:
                    self._extract_insights_from_digest(digest_file, ticker)

    def _scan_knowledge_directory(self, knowledge_dir: Path) -> None:
        """扫描知识库目录"""
        # 扫描分析模块
        analysis_modules_dir = knowledge_dir / "analysis_modules"
        if analysis_modules_dir.exists():
            for module_file in analysis_modules_dir.glob("*.md"):
                self._extract_framework_knowledge(module_file)

        # 扫描进化日志
        evolution_files = list(knowledge_dir.glob("evolution_*.yaml"))
        for evo_file in evolution_files:
            self._extract_evolution_lessons(evo_file)

    def _parse_memory_file(self, content: str, file_path: str) -> Optional[MemoryNode]:
        """解析记忆文件"""
        try:
            # 提取frontmatter
            frontmatter_match = re.search(r'^---\n(.*?)\n---\n', content, re.DOTALL)
            if not frontmatter_match:
                return None

            frontmatter_text = frontmatter_match.group(1)
            body_content = content[frontmatter_match.end():]

            # 解析frontmatter
            metadata = {}
            for line in frontmatter_text.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    metadata[key.strip()] = value.strip()

            # 创建记忆节点
            node_id = self._generate_node_id(file_path, metadata.get('name', ''))

            return MemoryNode(
                node_id=node_id,
                memory_type=self._infer_memory_type(metadata.get('type', ''), content),
                content=body_content,
                metadata=metadata,
                tags=self._extract_tags(content),
                relevance_score=0.0,  # 将在查询时计算
                created_at=datetime.now(),
                last_accessed=datetime.now(),
                access_count=0,
                source_file=file_path
            )

        except Exception as e:
            logging.warning(f"Failed to parse memory file: {e}")
            return None

    def _extract_insights_from_report(self, report_file: Path, ticker: str) -> None:
        """从报告中提取洞见"""
        try:
            content = report_file.read_text(encoding='utf-8')

            # 提取关键洞见段落
            insight_patterns = [
                r'## 核心洞见.*?\n(.*?)(?=\n##|\n---|\Z)',
                r'## 投资要点.*?\n(.*?)(?=\n##|\n---|\Z)',
                r'## 关键发现.*?\n(.*?)(?=\n##|\n---|\Z)',
                r'**核心观点**.*?\n(.*?)(?=\n\*\*|\n##|\Z)'
            ]

            insights = []
            for pattern in insight_patterns:
                matches = re.findall(pattern, content, re.DOTALL | re.IGNORECASE)
                insights.extend(matches)

            # 为每个洞见创建记忆节点
            for i, insight in enumerate(insights):
                if len(insight.strip()) > 100:  # 过滤太短的内容
                    node_id = f"{ticker}_insight_{i}_{hashlib.md5(insight.encode()).hexdigest()[:8]}"

                    node = MemoryNode(
                        node_id=node_id,
                        memory_type=MemoryType.COMPANY_ANALYSIS,
                        content=insight.strip(),
                        metadata={
                            "ticker": ticker,
                            "source_type": "report_insight",
                            "report_file": str(report_file)
                        },
                        tags=self._extract_tags(insight),
                        relevance_score=0.8,  # 报告洞见高相关性
                        created_at=datetime.now(),
                        last_accessed=datetime.now(),
                        access_count=0,
                        source_file=str(report_file)
                    )

                    self.memory_nodes[node_id] = node

        except Exception as e:
            logging.warning(f"Failed to extract insights from {report_file}: {e}")

    def _extract_insights_from_digest(self, digest_file: Path, ticker: str) -> None:
        """从digest card提取洞见"""
        try:
            content = digest_file.read_text(encoding='utf-8')
            digest_data = json.loads(content) if content.strip().startswith('{') else {}

            # 从digest中提取不同类型的洞见
            if "investment_thesis" in digest_data:
                self._create_thesis_memory(digest_data["investment_thesis"], ticker, str(digest_file))

            if "key_risks" in digest_data:
                self._create_risk_memory(digest_data["key_risks"], ticker, str(digest_file))

            if "valuation_summary" in digest_data:
                self._create_valuation_memory(digest_data["valuation_summary"], ticker, str(digest_file))

        except Exception as e:
            logging.warning(f"Failed to extract insights from digest {digest_file}: {e}")

    def _build_indexes(self) -> None:
        """构建索引"""
        for node_id, node in self.memory_nodes.items():
            # 构建概念索引
            concepts = self._extract_concepts(node.content)
            for concept in concepts:
                if concept not in self.concept_index:
                    self.concept_index[concept] = set()
                self.concept_index[concept].add(node_id)

            # 构建ticker索引
            ticker = node.metadata.get("ticker", "").upper()
            if ticker:
                if ticker not in self.ticker_index:
                    self.ticker_index[ticker] = set()
                self.ticker_index[ticker].add(node_id)

            # 构建行业索引
            industry = node.metadata.get("industry", "")
            if industry:
                if industry not in self.industry_index:
                    self.industry_index[industry] = set()
                self.industry_index[industry].add(node_id)

    def _extract_concepts(self, content: str) -> Set[str]:
        """提取概念关键词"""
        concepts = set()

        # 投资概念
        investment_concepts = [
            "护城河", "moat", "competitive advantage", "定价权", "pricing power",
            "网络效应", "network effect", "规模效应", "scale", "转换成本", "switching cost",
            "品牌价值", "brand", "客户粘性", "customer loyalty", "平台效应", "platform",
            "数据壁垒", "data moat", "监管壁垒", "regulatory", "专利", "patent",
            "现金流", "cash flow", "资本配置", "capital allocation", "分红", "dividend",
            "回购", "buyback", "债务", "debt", "杠杆", "leverage", "ROE", "ROIC",
            "增长", "growth", "市场份额", "market share", "TAM", "渗透率", "penetration",
            "单位经济学", "unit economics", "LTV", "CAC", "NRR", "churn",
            "估值", "valuation", "DCF", "P/E", "EV/EBITDA", "PEG",
            "风险", "risk", "波动性", "volatility", "流动性", "liquidity"
        ]

        for concept in investment_concepts:
            if concept.lower() in content.lower():
                concepts.add(concept)

        # 行业特定概念
        if any(term in content.lower() for term in ["saas", "software", "subscription"]):
            concepts.update(["SaaS", "订阅模式", "软件"])

        if any(term in content.lower() for term in ["ai", "artificial intelligence", "machine learning"]):
            concepts.update(["人工智能", "AI", "机器学习"])

        return concepts

    def search_relevant_memories(self, context: QueryContext, max_results: int = 10) -> List[Tuple[MemoryNode, float]]:
        """搜索相关记忆"""
        relevant_nodes = []

        for node_id, node in self.memory_nodes.items():
            relevance_score = self._calculate_relevance_score(node, context)
            if relevance_score > 0.1:  # 过滤低相关性
                relevant_nodes.append((node, relevance_score))

        # 按相关性排序
        relevant_nodes.sort(key=lambda x: x[1], reverse=True)

        # 更新访问记录
        for node, score in relevant_nodes[:max_results]:
            node.last_accessed = datetime.now()
            node.access_count += 1

        return relevant_nodes[:max_results]

    def _calculate_relevance_score(self, node: MemoryNode, context: QueryContext) -> float:
        """计算相关性分数"""
        score = 0.0

        # 1. 直接匹配 (权重40%)
        if context.current_ticker.upper() == node.metadata.get("ticker", "").upper():
            score += 0.4

        # 2. 行业匹配 (权重20%)
        if context.current_industry == node.metadata.get("industry", ""):
            score += 0.2
        elif self._is_related_industry(context.current_industry, node.metadata.get("industry", "")):
            score += 0.1

        # 3. 概念匹配 (权重25%)
        node_concepts = self._extract_concepts(node.content)
        concept_overlap = len(context.key_concepts & node_concepts)
        if concept_overlap > 0:
            score += 0.25 * min(1.0, concept_overlap / len(context.key_concepts))

        # 4. 业务模式匹配 (权重10%)
        business_overlap = len(context.business_model_keywords & self._extract_concepts(node.content))
        if business_overlap > 0:
            score += 0.1 * min(1.0, business_overlap / len(context.business_model_keywords))

        # 5. 分析焦点匹配 (权重5%)
        for focus in context.analysis_focus:
            if focus.lower() in node.content.lower():
                score += 0.05

        # 6. 时间衰减
        age_days = (datetime.now() - node.created_at).days
        time_decay = max(0.5, 1.0 - age_days / 365)  # 一年内的记忆不完全衰减
        score *= time_decay

        # 7. 访问频率加权
        access_boost = min(0.2, node.access_count * 0.01)  # 最多加20%
        score += access_boost

        return min(1.0, score)

    def _is_related_industry(self, industry1: str, industry2: str) -> bool:
        """判断行业相关性"""
        related_groups = [
            {"technology", "software", "saas", "internet"},
            {"healthcare", "biotech", "pharmaceutical"},
            {"financial", "banking", "fintech", "insurance"},
            {"consumer", "retail", "brands", "ecommerce"},
            {"industrial", "manufacturing", "materials"}
        ]

        industry1_lower = industry1.lower()
        industry2_lower = industry2.lower()

        for group in related_groups:
            if any(term in industry1_lower for term in group) and any(term in industry2_lower for term in group):
                return True

        return False

    def get_proactive_recommendations(self, context: QueryContext) -> Dict:
        """主动推荐相关记忆"""
        recommendations = {
            "timestamp": datetime.now().isoformat(),
            "context_summary": {
                "ticker": context.current_ticker,
                "industry": context.current_industry,
                "phase": context.current_phase,
                "focus_areas": context.analysis_focus
            },
            "recommendations": []
        }

        # 搜索相关记忆
        relevant_memories = self.search_relevant_memories(context, max_results=15)

        # 按类型分组推荐
        recommendations_by_type = {}
        for node, score in relevant_memories:
            memory_type = node.memory_type.value
            if memory_type not in recommendations_by_type:
                recommendations_by_type[memory_type] = []
            recommendations_by_type[memory_type].append((node, score))

        # 生成推荐
        for memory_type, nodes in recommendations_by_type.items():
            # 每种类型最多推荐3个
            top_nodes = sorted(nodes, key=lambda x: x[1], reverse=True)[:3]

            for node, score in top_nodes:
                recommendation = {
                    "memory_type": memory_type,
                    "relevance_score": score,
                    "title": node.metadata.get("name", f"Memory from {node.metadata.get('ticker', 'Unknown')}"),
                    "preview": self._generate_preview(node.content),
                    "source": node.source_file or "Memory database",
                    "last_accessed": node.last_accessed.isoformat(),
                    "access_count": node.access_count,
                    "tags": list(node.tags),
                    "recommendation_reason": self._generate_recommendation_reason(node, context, score)
                }
                recommendations["recommendations"].append(recommendation)

        # 按相关性重新排序
        recommendations["recommendations"].sort(key=lambda x: x["relevance_score"], reverse=True)

        return recommendations

    def _generate_preview(self, content: str, max_length: int = 200) -> str:
        """生成内容预览"""
        # 清理内容
        cleaned = re.sub(r'\n+', ' ', content.strip())
        cleaned = re.sub(r'\s+', ' ', cleaned)

        if len(cleaned) <= max_length:
            return cleaned
        else:
            # 找到最近的句号
            truncated = cleaned[:max_length]
            last_period = truncated.rfind('。')
            if last_period > max_length * 0.7:  # 如果句号在后30%内
                return truncated[:last_period + 1]
            else:
                return truncated + "..."

    def _generate_recommendation_reason(self, node: MemoryNode, context: QueryContext, score: float) -> str:
        """生成推荐理由"""
        reasons = []

        if context.current_ticker.upper() == node.metadata.get("ticker", "").upper():
            reasons.append("同一公司分析")

        if context.current_industry == node.metadata.get("industry", ""):
            reasons.append("同行业洞见")

        node_concepts = self._extract_concepts(node.content)
        concept_overlap = len(context.key_concepts & node_concepts)
        if concept_overlap > 0:
            reasons.append(f"概念匹配({concept_overlap}个)")

        if node.access_count > 5:
            reasons.append("高价值记忆")

        if score > 0.7:
            reasons.append("高度相关")
        elif score > 0.5:
            reasons.append("中度相关")

        return " | ".join(reasons) if reasons else "潜在相关"

    def add_memory_link(self, from_node_id: str, to_node_id: str,
                       link_type: RelevanceSignal, strength: float, context: str) -> None:
        """添加记忆关联"""
        link = MemoryLink(
            from_node=from_node_id,
            to_node=to_node_id,
            link_type=link_type,
            strength=strength,
            context=context,
            created_at=datetime.now()
        )
        self.memory_links.append(link)

    def get_memory_network(self, node_id: str, max_depth: int = 2) -> Dict:
        """获取记忆网络"""
        visited = set()
        network = {"nodes": {}, "links": []}

        def explore_node(current_id, depth):
            if depth > max_depth or current_id in visited:
                return

            visited.add(current_id)
            if current_id in self.memory_nodes:
                node = self.memory_nodes[current_id]
                network["nodes"][current_id] = {
                    "id": current_id,
                    "type": node.memory_type.value,
                    "title": node.metadata.get("name", "Unknown"),
                    "preview": self._generate_preview(node.content, 100)
                }

            # 探索关联节点
            for link in self.memory_links:
                if link.from_node == current_id and depth < max_depth:
                    network["links"].append({
                        "from": link.from_node,
                        "to": link.to_node,
                        "type": link.link_type.value,
                        "strength": link.strength
                    })
                    explore_node(link.to_node, depth + 1)

        explore_node(node_id, 0)
        return network

    def save_memory_state(self, file_path: str) -> bool:
        """保存记忆状态"""
        try:
            state_data = {
                "nodes_count": len(self.memory_nodes),
                "links_count": len(self.memory_links),
                "concept_index_size": len(self.concept_index),
                "ticker_index": {k: len(v) for k, v in self.ticker_index.items()},
                "industry_index": {k: len(v) for k, v in self.industry_index.items()},
                "generated_at": datetime.now().isoformat()
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(state_data, f, indent=2, ensure_ascii=False)

            return True

        except Exception as e:
            logging.error(f"Failed to save memory state: {e}")
            return False

    def _generate_node_id(self, file_path: str, name: str) -> str:
        """生成节点ID"""
        base_string = f"{file_path}_{name}_{datetime.now().date()}"
        return hashlib.md5(base_string.encode()).hexdigest()[:16]

    def _infer_memory_type(self, type_hint: str, content: str) -> MemoryType:
        """推断记忆类型"""
        type_hint_lower = type_hint.lower()

        if "feedback" in type_hint_lower:
            return MemoryType.FRAMEWORK_EVOLUTION
        elif "user" in type_hint_lower:
            return MemoryType.SUCCESS_PATTERN
        elif "project" in type_hint_lower:
            return MemoryType.COMPANY_ANALYSIS
        elif "reference" in type_hint_lower:
            return MemoryType.INDUSTRY_INSIGHT

        # 基于内容推断
        if any(term in content.lower() for term in ["dcf", "valuation", "估值", "pe", "ev/ebitda"]):
            return MemoryType.VALUATION_PATTERN
        elif any(term in content.lower() for term in ["risk", "风险", "危机", "failure"]):
            return MemoryType.RISK_PATTERN
        else:
            return MemoryType.COMPANY_ANALYSIS

    def _extract_tags(self, content: str) -> Set[str]:
        """提取标签"""
        tags = set()

        # 基于内容提取标签
        if "saas" in content.lower():
            tags.add("SaaS")
        if any(term in content.lower() for term in ["ai", "artificial intelligence"]):
            tags.add("AI")
        if "platform" in content.lower():
            tags.add("Platform")
        if any(term in content.lower() for term in ["healthcare", "biotech"]):
            tags.add("Healthcare")

        return tags

    def _create_thesis_memory(self, thesis_data: Dict, ticker: str, source_file: str) -> None:
        """创建投资论点记忆"""
        if isinstance(thesis_data, dict) and "core_thesis" in thesis_data:
            content = thesis_data["core_thesis"]
            node_id = f"{ticker}_thesis_{hashlib.md5(content.encode()).hexdigest()[:8]}"

            node = MemoryNode(
                node_id=node_id,
                memory_type=MemoryType.COMPANY_ANALYSIS,
                content=content,
                metadata={
                    "ticker": ticker,
                    "source_type": "investment_thesis",
                    "confidence": thesis_data.get("confidence", 0.5)
                },
                tags={"投资论点", "thesis"},
                relevance_score=0.9,
                created_at=datetime.now(),
                last_accessed=datetime.now(),
                access_count=0,
                source_file=source_file
            )

            self.memory_nodes[node_id] = node

    def _create_risk_memory(self, risks_data: List, ticker: str, source_file: str) -> None:
        """创建风险记忆"""
        if isinstance(risks_data, list):
            for i, risk in enumerate(risks_data):
                if isinstance(risk, dict) and "description" in risk:
                    content = risk["description"]
                    node_id = f"{ticker}_risk_{i}_{hashlib.md5(content.encode()).hexdigest()[:8]}"

                    node = MemoryNode(
                        node_id=node_id,
                        memory_type=MemoryType.RISK_PATTERN,
                        content=content,
                        metadata={
                            "ticker": ticker,
                            "source_type": "risk_analysis",
                            "risk_level": risk.get("probability", 0.5)
                        },
                        tags={"风险", "risk"},
                        relevance_score=0.7,
                        created_at=datetime.now(),
                        last_accessed=datetime.now(),
                        access_count=0,
                        source_file=source_file
                    )

                    self.memory_nodes[node_id] = node

    def _create_valuation_memory(self, valuation_data: Dict, ticker: str, source_file: str) -> None:
        """创建估值记忆"""
        if isinstance(valuation_data, dict):
            content = str(valuation_data)
            node_id = f"{ticker}_valuation_{hashlib.md5(content.encode()).hexdigest()[:8]}"

            node = MemoryNode(
                node_id=node_id,
                memory_type=MemoryType.VALUATION_PATTERN,
                content=content,
                metadata={
                    "ticker": ticker,
                    "source_type": "valuation_summary",
                    "fair_value": valuation_data.get("fair_value", 0)
                },
                tags={"估值", "valuation"},
                relevance_score=0.8,
                created_at=datetime.now(),
                last_accessed=datetime.now(),
                access_count=0,
                source_file=source_file
            )

            self.memory_nodes[node_id] = node

    def _extract_framework_knowledge(self, module_file: Path) -> None:
        """提取框架知识"""
        try:
            content = module_file.read_text(encoding='utf-8')
            node_id = f"framework_{module_file.stem}_{hashlib.md5(str(module_file).encode()).hexdigest()[:8]}"

            node = MemoryNode(
                node_id=node_id,
                memory_type=MemoryType.FRAMEWORK_EVOLUTION,
                content=content,
                metadata={
                    "source_type": "framework_module",
                    "module_name": module_file.stem
                },
                tags={"框架", "framework"},
                relevance_score=0.6,
                created_at=datetime.now(),
                last_accessed=datetime.now(),
                access_count=0,
                source_file=str(module_file)
            )

            self.memory_nodes[node_id] = node

        except Exception as e:
            logging.warning(f"Failed to extract framework knowledge from {module_file}: {e}")

    def _extract_evolution_lessons(self, evo_file: Path) -> None:
        """提取进化教训"""
        try:
            content = evo_file.read_text(encoding='utf-8')
            node_id = f"evolution_{evo_file.stem}_{hashlib.md5(str(evo_file).encode()).hexdigest()[:8]}"

            node = MemoryNode(
                node_id=node_id,
                memory_type=MemoryType.FRAMEWORK_EVOLUTION,
                content=content,
                metadata={
                    "source_type": "evolution_lesson",
                    "lesson_file": evo_file.name
                },
                tags={"进化", "evolution", "教训"},
                relevance_score=0.7,
                created_at=datetime.now(),
                last_accessed=datetime.now(),
                access_count=0,
                source_file=str(evo_file)
            )

            self.memory_nodes[node_id] = node

        except Exception as e:
            logging.warning(f"Failed to extract evolution lessons from {evo_file}: {e}")

# 使用示例
if __name__ == "__main__":
    # 创建智能记忆管理器
    memory_manager = IntelligentMemoryManager("/Users/milton/.claude/projects/-Users-milton-----/memory/")

    # 创建查询上下文
    context = QueryContext(
        current_ticker="AAPL",
        current_industry="technology",
        current_phase="Phase_1",
        analysis_focus=["valuation", "competitive_advantage"],
        key_concepts={"护城河", "定价权", "网络效应", "品牌价值"},
        business_model_keywords={"platform", "ecosystem", "hardware", "software"},
        current_concerns=["AI冲击", "中国市场", "增长放缓"]
    )

    # 获取主动推荐
    recommendations = memory_manager.get_proactive_recommendations(context)

    print("🧠 Intelligent Memory Recommendations:")
    print(f"Context: {context.current_ticker} | {context.current_industry} | {context.current_phase}")
    print(f"Total recommendations: {len(recommendations['recommendations'])}")
    print()

    for i, rec in enumerate(recommendations["recommendations"][:5]):
        print(f"{i+1}. {rec['title']}")
        print(f"   Type: {rec['memory_type']} | Score: {rec['relevance_score']:.2f}")
        print(f"   Reason: {rec['recommendation_reason']}")
        print(f"   Preview: {rec['preview']}")
        print(f"   Tags: {', '.join(rec['tags'])}")
        print()

    print(f"💾 Memory Statistics:")
    print(f"Total nodes: {len(memory_manager.memory_nodes)}")
    print(f"Concept index: {len(memory_manager.concept_index)} concepts")
    print(f"Ticker index: {len(memory_manager.ticker_index)} tickers")
    print(f"Industry index: {len(memory_manager.industry_index)} industries")