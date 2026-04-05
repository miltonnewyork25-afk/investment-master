#!/usr/bin/env python3
"""
Parallel Analysis Coordinator
============================

并行分析团队协调器：4专家协同分析系统
基于C编译器项目经验，实现Git-based任务协调和冲突解决

Version: 1.0
Author: 投资大师 Framework v19.9+ Phase 3-4
"""

import json
import logging
import subprocess
import time
import threading
from typing import Dict, List, Optional, Tuple, Set
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from pathlib import Path
import hashlib

class ExpertRole(Enum):
    """专家角色"""
    FUNDAMENTAL_ANALYST = "fundamental_analyst"    # 财务建模+行业分析
    TECHNICAL_ANALYST = "technical_analyst"        # 价格行为+市场情绪
    RISK_MANAGER = "risk_manager"                 # 风险拓扑+极端情境
    RED_TEAM_SPECIALIST = "red_team_specialist"   # 反向论证+盲点扫描

class TaskStatus(Enum):
    """任务状态"""
    PENDING = "pending"           # 等待中
    CLAIMED = "claimed"           # 已认领
    IN_PROGRESS = "in_progress"   # 进行中
    COMPLETED = "completed"       # 已完成
    FAILED = "failed"            # 失败
    CONFLICT = "conflict"        # 冲突

class SyncStrategy(Enum):
    """同步策略"""
    LOCK_FIRST = "lock_first"             # 先锁定后执行
    OPTIMISTIC = "optimistic"             # 乐观执行，冲突时解决
    CONSENSUS = "consensus"               # 共识机制
    LEADER_FOLLOWER = "leader_follower"   # 主从模式

@dataclass
class AnalysisTask:
    """分析任务"""
    task_id: str
    task_type: str  # "industry_analysis", "valuation_model", "risk_assessment", etc.
    description: str
    assigned_expert: Optional[ExpertRole]
    priority: int  # 1-5, 5最高
    dependencies: List[str]  # 依赖的其他task_id
    estimated_duration: float  # 预估小时数
    required_tools: List[str]
    input_requirements: Dict
    output_specification: Dict
    status: TaskStatus
    created_at: datetime
    claimed_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    result_path: Optional[str] = None

@dataclass
class ExpertAgent:
    """专家Agent配置"""
    role: ExpertRole
    description: str
    specialized_tools: List[str]
    strengths: List[str]
    limitations: List[str]
    preferred_tasks: List[str]
    max_parallel_tasks: int
    current_load: int = 0

@dataclass
class ConflictResolution:
    """冲突解决记录"""
    conflict_id: str
    task_id: str
    conflicting_experts: List[ExpertRole]
    conflict_type: str  # "data_disagreement", "method_conflict", "conclusion_divergence"
    resolution_strategy: str
    final_decision: str
    resolved_at: datetime

class ParallelAnalysisCoordinator:
    """并行分析协调器"""

    def __init__(self, workspace_path: str, sync_strategy: SyncStrategy = SyncStrategy.LOCK_FIRST):
        self.workspace_path = Path(workspace_path)
        self.sync_strategy = sync_strategy

        # 创建工作目录结构
        self._setup_workspace()

        # 专家团队配置
        self.expert_agents = self._initialize_expert_agents()

        # 任务管理
        self.task_queue: List[AnalysisTask] = []
        self.active_tasks: Dict[str, AnalysisTask] = {}
        self.completed_tasks: Dict[str, AnalysisTask] = {}

        # 同步管理
        self.task_locks: Set[str] = set()
        self.git_lock = threading.Lock()

        # 冲突解决历史
        self.conflict_history: List[ConflictResolution] = []

        # 性能统计
        self.performance_metrics = {
            "total_tasks_completed": 0,
            "average_completion_time": 0.0,
            "conflict_rate": 0.0,
            "expert_utilization": {role.value: 0.0 for role in ExpertRole}
        }

    def _setup_workspace(self) -> None:
        """设置工作空间"""
        # 创建目录结构
        (self.workspace_path / "tasks").mkdir(parents=True, exist_ok=True)
        (self.workspace_path / "results").mkdir(parents=True, exist_ok=True)
        (self.workspace_path / "conflicts").mkdir(parents=True, exist_ok=True)
        (self.workspace_path / "locks").mkdir(parents=True, exist_ok=True)
        (self.workspace_path / "logs").mkdir(parents=True, exist_ok=True)

        # 初始化Git仓库（如果不存在）
        if not (self.workspace_path / ".git").exists():
            subprocess.run(["git", "init"], cwd=self.workspace_path, capture_output=True)
            subprocess.run(["git", "config", "user.email", "coordinator@investment-harness.local"],
                          cwd=self.workspace_path, capture_output=True)
            subprocess.run(["git", "config", "user.name", "Parallel Coordinator"],
                          cwd=self.workspace_path, capture_output=True)

    def _initialize_expert_agents(self) -> Dict[ExpertRole, ExpertAgent]:
        """初始化专家Agent配置"""
        agents = {}

        # 基本面分析师
        agents[ExpertRole.FUNDAMENTAL_ANALYST] = ExpertAgent(
            role=ExpertRole.FUNDAMENTAL_ANALYST,
            description="财务建模和行业分析专家，专注于业务理解和估值建模",
            specialized_tools=[
                "fmp_data",
                "valuation-builder",
                "financial-analysis-framework",
                "competitive-benchmarking"
            ],
            strengths=[
                "财务报表分析",
                "业务模式理解",
                "行业对比分析",
                "DCF建模"
            ],
            limitations=[
                "市场情绪分析较弱",
                "短期价格预测能力有限"
            ],
            preferred_tasks=[
                "financial_analysis",
                "business_model_analysis",
                "valuation_modeling",
                "industry_comparison"
            ],
            max_parallel_tasks=2
        )

        # 技术分析师
        agents[ExpertRole.TECHNICAL_ANALYST] = ExpertAgent(
            role=ExpertRole.TECHNICAL_ANALYST,
            description="市场行为和情绪分析专家，专注于价格动态和市场心理",
            specialized_tools=[
                "market_data",
                "sentiment_analyzer",
                "technical_indicators",
                "polymarket_events"
            ],
            strengths=[
                "价格趋势分析",
                "市场情绪判断",
                "技术指标解读",
                "短期催化剂识别"
            ],
            limitations=[
                "基本面分析深度有限",
                "长期价值判断可能偏差"
            ],
            preferred_tasks=[
                "market_sentiment_analysis",
                "technical_analysis",
                "catalyst_identification",
                "timing_analysis"
            ],
            max_parallel_tasks=3
        )

        # 风险经理
        agents[ExpertRole.RISK_MANAGER] = ExpertAgent(
            role=ExpertRole.RISK_MANAGER,
            description="风险识别和压力测试专家，专注于下行保护和极端情境",
            specialized_tools=[
                "risk-topology",
                "stress-testing-framework",
                "scenario-analyzer",
                "black-swan-detector"
            ],
            strengths=[
                "风险识别全面性",
                "极端情境建模",
                "相关性分析",
                "下行保护策略"
            ],
            limitations=[
                "可能过于保守",
                "上行潜力评估偏谨慎"
            ],
            preferred_tasks=[
                "risk_assessment",
                "stress_testing",
                "scenario_analysis",
                "downside_protection"
            ],
            max_parallel_tasks=2
        )

        # 红队专家
        agents[ExpertRole.RED_TEAM_SPECIALIST] = ExpertAgent(
            role=ExpertRole.RED_TEAM_SPECIALIST,
            description="反向论证和盲点扫描专家，专注于挑战主流观点和发现逻辑漏洞",
            specialized_tools=[
                "assumption-audit",
                "red-team-suite",
                "contrarian-analyzer",
                "bias-detector"
            ],
            strengths=[
                "逻辑漏洞发现",
                "假设挑战",
                "反向思考",
                "认知偏差识别"
            ],
            limitations=[
                "可能过度质疑",
                "建设性建议相对较少"
            ],
            preferred_tasks=[
                "assumption_challenge",
                "bias_detection",
                "contrarian_analysis",
                "logic_review"
            ],
            max_parallel_tasks=1  # 专注深度质疑
        )

        return agents

    def create_analysis_plan(self, ticker: str, analysis_scope: Dict) -> List[AnalysisTask]:
        """创建分析计划"""
        tasks = []

        # Phase 1: 并行数据收集和初步分析
        tasks.extend([
            AnalysisTask(
                task_id=f"{ticker}_financial_data_collection",
                task_type="data_collection",
                description="收集和验证财务数据",
                assigned_expert=ExpertRole.FUNDAMENTAL_ANALYST,
                priority=5,
                dependencies=[],
                estimated_duration=1.0,
                required_tools=["fmp_data", "sec_filings"],
                input_requirements={"ticker": ticker},
                output_specification={"format": "structured_data", "validation": True},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            ),

            AnalysisTask(
                task_id=f"{ticker}_market_sentiment_scan",
                task_type="sentiment_analysis",
                description="分析市场情绪和价格行为",
                assigned_expert=ExpertRole.TECHNICAL_ANALYST,
                priority=4,
                dependencies=[],
                estimated_duration=0.8,
                required_tools=["market_data", "sentiment_analyzer"],
                input_requirements={"ticker": ticker, "lookback_period": "1y"},
                output_specification={"sentiment_score": "float", "key_levels": "list"},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            ),

            AnalysisTask(
                task_id=f"{ticker}_risk_landscape_mapping",
                task_type="risk_mapping",
                description="映射风险拓扑和识别关键风险",
                assigned_expert=ExpertRole.RISK_MANAGER,
                priority=4,
                dependencies=[],
                estimated_duration=1.2,
                required_tools=["risk-topology", "industry_risk_db"],
                input_requirements={"ticker": ticker, "industry": analysis_scope.get("industry")},
                output_specification={"risk_matrix": "dict", "key_risks": "list"},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            )
        ])

        # Phase 2: 深度分析（依赖Phase 1结果）
        tasks.extend([
            AnalysisTask(
                task_id=f"{ticker}_valuation_modeling",
                task_type="valuation",
                description="构建多方法估值模型",
                assigned_expert=ExpertRole.FUNDAMENTAL_ANALYST,
                priority=5,
                dependencies=[f"{ticker}_financial_data_collection"],
                estimated_duration=2.0,
                required_tools=["valuation-builder", "dcf_model", "comparable_analysis"],
                input_requirements={"financial_data": "required", "assumptions": "explicit"},
                output_specification={"dcf_value": "float", "comparable_value": "float", "sotp_value": "float"},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            ),

            AnalysisTask(
                task_id=f"{ticker}_stress_testing",
                task_type="stress_test",
                description="对估值模型进行压力测试",
                assigned_expert=ExpertRole.RISK_MANAGER,
                priority=4,
                dependencies=[f"{ticker}_valuation_modeling", f"{ticker}_risk_landscape_mapping"],
                estimated_duration=1.5,
                required_tools=["stress-testing-framework", "monte_carlo"],
                input_requirements={"valuation_model": "required", "risk_factors": "required"},
                output_specification={"stress_scenarios": "list", "var_estimates": "dict"},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            )
        ])

        # Phase 3: 红队审查（依赖前面所有结果）
        dependencies_for_red_team = [
            f"{ticker}_financial_data_collection",
            f"{ticker}_valuation_modeling",
            f"{ticker}_stress_testing",
            f"{ticker}_market_sentiment_scan"
        ]

        tasks.append(
            AnalysisTask(
                task_id=f"{ticker}_red_team_review",
                task_type="red_team",
                description="全面红队审查和假设挑战",
                assigned_expert=ExpertRole.RED_TEAM_SPECIALIST,
                priority=5,
                dependencies=dependencies_for_red_team,
                estimated_duration=2.5,
                required_tools=["assumption-audit", "red-team-suite", "bias-detector"],
                input_requirements={"all_analysis_results": "required"},
                output_specification={"challenged_assumptions": "list", "logic_gaps": "list", "recommendations": "list"},
                status=TaskStatus.PENDING,
                created_at=datetime.now()
            )
        )

        return tasks

    def submit_task_queue(self, tasks: List[AnalysisTask]) -> None:
        """提交任务队列"""
        self.task_queue.extend(tasks)

        # 按优先级和依赖关系排序
        self.task_queue.sort(key=lambda t: (-t.priority, len(t.dependencies)))

        logging.info(f"Submitted {len(tasks)} tasks to queue")

    def claim_task(self, expert_role: ExpertRole) -> Optional[AnalysisTask]:
        """专家认领任务"""
        agent = self.expert_agents[expert_role]

        # 检查负载限制
        if agent.current_load >= agent.max_parallel_tasks:
            return None

        # 寻找可执行的任务
        available_tasks = []
        for task in self.task_queue:
            if (task.status == TaskStatus.PENDING and
                self._can_execute_task(task, expert_role) and
                self._dependencies_met(task)):
                available_tasks.append(task)

        if not available_tasks:
            return None

        # 优先选择匹配专长的任务
        preferred_tasks = [
            task for task in available_tasks
            if task.task_type in agent.preferred_tasks
        ]

        selected_task = preferred_tasks[0] if preferred_tasks else available_tasks[0]

        # 尝试锁定任务
        if self._lock_task(selected_task.task_id):
            selected_task.status = TaskStatus.CLAIMED
            selected_task.claimed_at = datetime.now()
            selected_task.assigned_expert = expert_role

            # 从队列移到活跃任务
            self.task_queue.remove(selected_task)
            self.active_tasks[selected_task.task_id] = selected_task

            # 增加专家负载
            agent.current_load += 1

            logging.info(f"Task {selected_task.task_id} claimed by {expert_role.value}")
            return selected_task

        return None

    def _can_execute_task(self, task: AnalysisTask, expert_role: ExpertRole) -> bool:
        """检查专家是否能执行任务"""
        agent = self.expert_agents[expert_role]

        # 检查工具可用性
        required_tools = set(task.required_tools)
        available_tools = set(agent.specialized_tools)

        if not required_tools.issubset(available_tools):
            # 如果不是完全匹配，检查是否有足够的重叠
            overlap = len(required_tools & available_tools) / len(required_tools)
            if overlap < 0.6:  # 至少60%工具匹配
                return False

        # 检查任务类型匹配
        if task.task_type not in agent.preferred_tasks:
            # 非首选任务，降低优先级但不完全排除
            return len(self.task_queue) > 5  # 只有在任务积压时才接受非首选任务

        return True

    def _dependencies_met(self, task: AnalysisTask) -> bool:
        """检查任务依赖是否满足"""
        for dep_id in task.dependencies:
            if dep_id not in self.completed_tasks:
                return False
        return True

    def _lock_task(self, task_id: str) -> bool:
        """锁定任务（基于文件系统）"""
        if self.sync_strategy != SyncStrategy.LOCK_FIRST:
            return True  # 其他策略不使用预先锁定

        lock_file = self.workspace_path / "locks" / f"{task_id}.lock"

        try:
            # 原子性创建锁文件
            lock_file.touch(exist_ok=False)  # 如果已存在会抛出异常
            lock_file.write_text(f"{datetime.now().isoformat()}\n")
            self.task_locks.add(task_id)
            return True
        except FileExistsError:
            return False  # 任务已被其他专家锁定

    def execute_task(self, task: AnalysisTask, expert_role: ExpertRole) -> Dict:
        """执行任务"""
        logging.info(f"Starting execution of {task.task_id} by {expert_role.value}")

        task.status = TaskStatus.IN_PROGRESS
        start_time = datetime.now()

        try:
            # 准备输入数据
            input_data = self._prepare_task_input(task)

            # 根据任务类型执行相应分析
            result = self._execute_task_by_type(task, input_data, expert_role)

            # 保存结果
            result_path = self._save_task_result(task, result)

            # 提交到Git
            self._commit_task_result(task, result_path)

            # 更新任务状态
            task.status = TaskStatus.COMPLETED
            task.completed_at = datetime.now()
            task.result_path = result_path

            # 移动任务到完成列表
            del self.active_tasks[task.task_id]
            self.completed_tasks[task.task_id] = task

            # 释放专家负载
            self.expert_agents[expert_role].current_load -= 1

            # 释放任务锁
            self._unlock_task(task.task_id)

            execution_time = (datetime.now() - start_time).total_seconds() / 3600
            logging.info(f"Task {task.task_id} completed in {execution_time:.2f}h")

            return {
                "status": "success",
                "result_path": result_path,
                "execution_time": execution_time,
                "output": result
            }

        except Exception as e:
            logging.error(f"Task {task.task_id} failed: {e}")

            task.status = TaskStatus.FAILED
            self.expert_agents[expert_role].current_load -= 1
            self._unlock_task(task.task_id)

            return {
                "status": "failed",
                "error": str(e),
                "execution_time": (datetime.now() - start_time).total_seconds() / 3600
            }

    def _prepare_task_input(self, task: AnalysisTask) -> Dict:
        """准备任务输入数据"""
        input_data = task.input_requirements.copy()

        # 添加依赖任务的结果
        for dep_id in task.dependencies:
            if dep_id in self.completed_tasks:
                dep_task = self.completed_tasks[dep_id]
                if dep_task.result_path:
                    # 读取依赖结果
                    try:
                        with open(dep_task.result_path, 'r', encoding='utf-8') as f:
                            dep_result = json.load(f)
                        input_data[f"dependency_{dep_id}"] = dep_result
                    except Exception as e:
                        logging.warning(f"Failed to load dependency result {dep_id}: {e}")

        return input_data

    def _execute_task_by_type(self, task: AnalysisTask, input_data: Dict, expert_role: ExpertRole) -> Dict:
        """根据任务类型执行分析"""
        if task.task_type == "data_collection":
            return self._execute_data_collection(task, input_data)
        elif task.task_type == "sentiment_analysis":
            return self._execute_sentiment_analysis(task, input_data)
        elif task.task_type == "risk_mapping":
            return self._execute_risk_mapping(task, input_data)
        elif task.task_type == "valuation":
            return self._execute_valuation_modeling(task, input_data)
        elif task.task_type == "stress_test":
            return self._execute_stress_testing(task, input_data)
        elif task.task_type == "red_team":
            return self._execute_red_team_review(task, input_data)
        else:
            return {"status": "unknown_task_type", "task_type": task.task_type}

    def _execute_data_collection(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行数据收集任务"""
        ticker = input_data.get("ticker")

        # 模拟数据收集过程
        time.sleep(0.5)  # 模拟API调用延迟

        return {
            "ticker": ticker,
            "financial_data": {
                "revenue_3y": [100, 120, 145],
                "net_income_3y": [10, 15, 22],
                "free_cash_flow_3y": [12, 18, 25]
            },
            "data_quality": "high",
            "last_updated": datetime.now().isoformat(),
            "sources": ["fmp", "sec_filings"]
        }

    def _execute_sentiment_analysis(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行情绪分析任务"""
        ticker = input_data.get("ticker")

        # 模拟情绪分析
        time.sleep(0.3)

        return {
            "ticker": ticker,
            "sentiment_score": 0.65,  # -1 to 1
            "sentiment_trend": "improving",
            "key_price_levels": {
                "support": 150,
                "resistance": 180,
                "current": 165
            },
            "analyst_sentiment": "cautiously_optimistic",
            "social_sentiment": "positive"
        }

    def _execute_risk_mapping(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行风险映射任务"""
        ticker = input_data.get("ticker")
        industry = input_data.get("industry", "unknown")

        time.sleep(0.8)

        return {
            "ticker": ticker,
            "industry": industry,
            "risk_matrix": {
                "market_risk": {"probability": 0.3, "impact": 0.7},
                "operational_risk": {"probability": 0.2, "impact": 0.5},
                "regulatory_risk": {"probability": 0.4, "impact": 0.8},
                "competitive_risk": {"probability": 0.6, "impact": 0.6}
            },
            "key_risks": [
                "Regulatory changes in key markets",
                "Increased competition from new entrants",
                "Economic downturn impact on demand"
            ],
            "risk_correlation": {
                "market_operational": 0.3,
                "regulatory_competitive": 0.5
            }
        }

    def _execute_valuation_modeling(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行估值建模任务"""
        # 获取依赖数据
        financial_data = None
        for key, value in input_data.items():
            if key.startswith("dependency_") and "financial_data" in str(value):
                financial_data = value.get("financial_data", {})
                break

        if not financial_data:
            raise ValueError("Financial data dependency not found")

        time.sleep(1.2)

        # 模拟估值计算
        revenues = financial_data.get("revenue_3y", [100, 120, 145])
        latest_revenue = revenues[-1] if revenues else 100

        return {
            "dcf_value": latest_revenue * 8.5,  # 简化DCF
            "comparable_value": latest_revenue * 7.2,  # P/S倍数法
            "sotp_value": latest_revenue * 8.0,  # 分部估值
            "fair_value_range": {
                "low": latest_revenue * 6.5,
                "mid": latest_revenue * 7.9,
                "high": latest_revenue * 9.2
            },
            "key_assumptions": {
                "terminal_growth": 0.03,
                "wacc": 0.09,
                "ebitda_margin": 0.15
            },
            "sensitivity_analysis": {
                "wacc_impact": {"9%": 1235, "10%": 1150, "11%": 1070},
                "growth_impact": {"2%": 1100, "3%": 1235, "4%": 1380}
            }
        }

    def _execute_stress_testing(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行压力测试任务"""
        # 获取估值模型和风险因子
        valuation_model = None
        risk_factors = None

        for key, value in input_data.items():
            if key.startswith("dependency_") and "dcf_value" in str(value):
                valuation_model = value
            elif key.startswith("dependency_") and "risk_matrix" in str(value):
                risk_factors = value.get("risk_matrix", {})

        if not valuation_model or not risk_factors:
            raise ValueError("Required dependencies not found")

        time.sleep(1.0)

        base_value = valuation_model.get("dcf_value", 1000)

        return {
            "base_case_value": base_value,
            "stress_scenarios": {
                "recession": {
                    "value": base_value * 0.7,
                    "probability": 0.15,
                    "key_assumptions": "Revenue -30%, Margins -500bps"
                },
                "regulatory_shock": {
                    "value": base_value * 0.6,
                    "probability": 0.08,
                    "key_assumptions": "New regulations increase costs 25%"
                },
                "competitive_disruption": {
                    "value": base_value * 0.5,
                    "probability": 0.12,
                    "key_assumptions": "Market share loss 40%"
                }
            },
            "var_estimates": {
                "95%_confidence": base_value * 0.75,
                "99%_confidence": base_value * 0.55
            },
            "expected_shortfall": base_value * 0.45
        }

    def _execute_red_team_review(self, task: AnalysisTask, input_data: Dict) -> Dict:
        """执行红队审查任务"""
        time.sleep(1.5)

        # 分析所有前序结果
        valuation_results = []
        risk_results = []
        sentiment_results = []

        for key, value in input_data.items():
            if key.startswith("dependency_"):
                if "dcf_value" in str(value):
                    valuation_results.append(value)
                elif "risk_matrix" in str(value):
                    risk_results.append(value)
                elif "sentiment_score" in str(value):
                    sentiment_results.append(value)

        return {
            "challenged_assumptions": [
                {
                    "assumption": "Terminal growth rate of 3%",
                    "challenge": "Industry showing signs of maturity, 2% more realistic",
                    "impact": "Valuation overestimated by ~15%"
                },
                {
                    "assumption": "Market sentiment remains positive",
                    "challenge": "Sentiment often reverses quickly in volatile periods",
                    "impact": "Timing risk significant for entry/exit"
                },
                {
                    "assumption": "Current competitive position sustainable",
                    "challenge": "New technologies emerging that could disrupt",
                    "impact": "Long-term moat assumption questionable"
                }
            ],
            "logic_gaps": [
                "Valuation heavily weights optimistic scenarios without sufficient justification",
                "Risk correlation analysis incomplete - systemic risks underweighted",
                "Management guidance historically optimistic but not adjusted for in projections"
            ],
            "cognitive_biases_detected": [
                "Confirmation bias in cherry-picking positive data points",
                "Anchoring bias to recent strong performance",
                "Overconfidence in model precision"
            ],
            "recommendations": [
                "Widen valuation range to reflect genuine uncertainty",
                "Stress test key assumptions more thoroughly",
                "Include explicit contrarian scenario in base case",
                "Re-examine correlation assumptions in stress testing"
            ],
            "overall_assessment": {
                "analysis_quality": "good_with_reservations",
                "key_weakness": "insufficient_skepticism",
                "confidence_adjustment": -0.15  # Reduce confidence by 15%
            }
        }

    def _save_task_result(self, task: AnalysisTask, result: Dict) -> str:
        """保存任务结果"""
        result_dir = self.workspace_path / "results"
        result_file = result_dir / f"{task.task_id}_result.json"

        # 添加元数据
        result_with_meta = {
            "task_metadata": {
                "task_id": task.task_id,
                "task_type": task.task_type,
                "assigned_expert": task.assigned_expert.value,
                "completed_at": datetime.now().isoformat(),
                "execution_duration": (datetime.now() - task.claimed_at).total_seconds() / 3600
            },
            "result": result
        }

        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(result_with_meta, f, indent=2, ensure_ascii=False)

        return str(result_file)

    def _commit_task_result(self, task: AnalysisTask, result_path: str) -> None:
        """提交任务结果到Git"""
        with self.git_lock:
            try:
                # 添加结果文件到Git
                subprocess.run(["git", "add", result_path],
                             cwd=self.workspace_path, check=True, capture_output=True)

                # 提交
                commit_msg = f"Complete {task.task_type}: {task.task_id} by {task.assigned_expert.value}"
                subprocess.run(["git", "commit", "-m", commit_msg],
                             cwd=self.workspace_path, check=True, capture_output=True)

                logging.info(f"Committed result for task {task.task_id}")

            except subprocess.CalledProcessError as e:
                logging.warning(f"Git commit failed for task {task.task_id}: {e}")

    def _unlock_task(self, task_id: str) -> None:
        """释放任务锁"""
        if task_id in self.task_locks:
            lock_file = self.workspace_path / "locks" / f"{task_id}.lock"
            try:
                lock_file.unlink(missing_ok=True)
                self.task_locks.remove(task_id)
            except Exception as e:
                logging.warning(f"Failed to unlock task {task_id}: {e}")

    def detect_conflicts(self) -> List[ConflictResolution]:
        """检测分析冲突"""
        conflicts = []

        # 检查已完成任务间的冲突
        valuation_tasks = [
            task for task in self.completed_tasks.values()
            if task.task_type == "valuation" and task.result_path
        ]

        if len(valuation_tasks) >= 2:
            # 比较估值结果
            for i, task1 in enumerate(valuation_tasks):
                for task2 in valuation_tasks[i+1:]:
                    conflict = self._check_valuation_conflict(task1, task2)
                    if conflict:
                        conflicts.append(conflict)

        # 检查其他类型的冲突...

        return conflicts

    def _check_valuation_conflict(self, task1: AnalysisTask, task2: AnalysisTask) -> Optional[ConflictResolution]:
        """检查估值冲突"""
        try:
            # 读取两个任务的结果
            with open(task1.result_path, 'r', encoding='utf-8') as f:
                result1 = json.load(f)
            with open(task2.result_path, 'r', encoding='utf-8') as f:
                result2 = json.load(f)

            value1 = result1["result"].get("dcf_value", 0)
            value2 = result2["result"].get("dcf_value", 0)

            if value1 > 0 and value2 > 0:
                # 计算差异
                diff_ratio = abs(value1 - value2) / max(value1, value2)

                if diff_ratio > 0.2:  # 超过20%差异视为冲突
                    conflict_id = f"valuation_conflict_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

                    return ConflictResolution(
                        conflict_id=conflict_id,
                        task_id=f"{task1.task_id}|{task2.task_id}",
                        conflicting_experts=[task1.assigned_expert, task2.assigned_expert],
                        conflict_type="valuation_divergence",
                        resolution_strategy="weighted_average",
                        final_decision=f"Average: {(value1 + value2) / 2:.0f} (Range: {min(value1, value2):.0f}-{max(value1, value2):.0f})",
                        resolved_at=datetime.now()
                    )

        except Exception as e:
            logging.warning(f"Failed to check valuation conflict: {e}")

        return None

    def resolve_conflicts(self, conflicts: List[ConflictResolution]) -> Dict:
        """解决冲突"""
        resolution_summary = {
            "total_conflicts": len(conflicts),
            "resolved_conflicts": 0,
            "failed_resolutions": 0,
            "resolution_details": []
        }

        for conflict in conflicts:
            try:
                if conflict.conflict_type == "valuation_divergence":
                    # 估值分歧：使用加权平均
                    self._resolve_valuation_divergence(conflict)
                elif conflict.conflict_type == "data_disagreement":
                    # 数据分歧：使用最可靠来源
                    self._resolve_data_disagreement(conflict)
                elif conflict.conflict_type == "method_conflict":
                    # 方法冲突：专家投票
                    self._resolve_method_conflict(conflict)

                resolution_summary["resolved_conflicts"] += 1
                resolution_summary["resolution_details"].append({
                    "conflict_id": conflict.conflict_id,
                    "status": "resolved",
                    "strategy": conflict.resolution_strategy,
                    "decision": conflict.final_decision
                })

                # 记录到历史
                self.conflict_history.append(conflict)

            except Exception as e:
                logging.error(f"Failed to resolve conflict {conflict.conflict_id}: {e}")
                resolution_summary["failed_resolutions"] += 1
                resolution_summary["resolution_details"].append({
                    "conflict_id": conflict.conflict_id,
                    "status": "failed",
                    "error": str(e)
                })

        return resolution_summary

    def _resolve_valuation_divergence(self, conflict: ConflictResolution) -> None:
        """解决估值分歧"""
        # 实现加权平均解决方案
        logging.info(f"Resolving valuation divergence: {conflict.conflict_id}")
        # 具体实现取决于业务逻辑

    def _resolve_data_disagreement(self, conflict: ConflictResolution) -> None:
        """解决数据分歧"""
        logging.info(f"Resolving data disagreement: {conflict.conflict_id}")

    def _resolve_method_conflict(self, conflict: ConflictResolution) -> None:
        """解决方法冲突"""
        logging.info(f"Resolving method conflict: {conflict.conflict_id}")

    def aggregate_results(self, ticker: str) -> Dict:
        """聚合所有专家的分析结果"""
        # 收集所有完成的任务结果
        results_by_expert = {role.value: [] for role in ExpertRole}

        for task in self.completed_tasks.values():
            if task.result_path and task.assigned_expert:
                try:
                    with open(task.result_path, 'r', encoding='utf-8') as f:
                        result = json.load(f)
                    results_by_expert[task.assigned_expert.value].append({
                        "task_id": task.task_id,
                        "task_type": task.task_type,
                        "result": result["result"]
                    })
                except Exception as e:
                    logging.warning(f"Failed to load result for task {task.task_id}: {e}")

        # 检测并解决冲突
        conflicts = self.detect_conflicts()
        conflict_resolution = self.resolve_conflicts(conflicts) if conflicts else None

        # 构建综合分析
        aggregated_analysis = {
            "ticker": ticker,
            "analysis_timestamp": datetime.now().isoformat(),
            "participating_experts": [role.value for role in ExpertRole if results_by_expert[role.value]],
            "expert_contributions": results_by_expert,
            "conflict_resolution": conflict_resolution,
            "synthesis": self._synthesize_expert_opinions(results_by_expert, conflicts),
            "consensus_view": self._build_consensus_view(results_by_expert),
            "quality_metrics": self._calculate_analysis_quality_metrics()
        }

        return aggregated_analysis

    def _synthesize_expert_opinions(self, results_by_expert: Dict, conflicts: List[ConflictResolution]) -> Dict:
        """综合专家意见"""
        synthesis = {
            "valuation_consensus": None,
            "risk_assessment_synthesis": None,
            "sentiment_alignment": None,
            "key_disagreements": []
        }

        # 综合估值观点
        valuation_results = []
        for expert, tasks in results_by_expert.items():
            for task in tasks:
                if "dcf_value" in str(task["result"]):
                    valuation_results.append({
                        "expert": expert,
                        "value": task["result"].get("dcf_value"),
                        "method": "dcf"
                    })

        if valuation_results:
            values = [r["value"] for r in valuation_results if r["value"]]
            if values:
                synthesis["valuation_consensus"] = {
                    "range": {"min": min(values), "max": max(values)},
                    "average": sum(values) / len(values),
                    "std_dev": statistics.stdev(values) if len(values) > 1 else 0,
                    "expert_count": len(values)
                }

        # 记录主要分歧
        for conflict in conflicts:
            synthesis["key_disagreements"].append({
                "type": conflict.conflict_type,
                "experts": [exp.value for exp in conflict.conflicting_experts],
                "resolution": conflict.final_decision
            })

        return synthesis

    def _build_consensus_view(self, results_by_expert: Dict) -> Dict:
        """构建共识观点"""
        consensus = {
            "investment_recommendation": None,
            "key_risks": [],
            "key_opportunities": [],
            "confidence_level": 0.0
        }

        # 基于专家分析构建共识
        # 这里简化实现，实际应该有更复杂的逻辑

        return consensus

    def _calculate_analysis_quality_metrics(self) -> Dict:
        """计算分析质量指标"""
        total_tasks = len(self.completed_tasks)
        if total_tasks == 0:
            return {"status": "no_completed_tasks"}

        # 计算完成时间统计
        completion_times = []
        for task in self.completed_tasks.values():
            if task.claimed_at and task.completed_at:
                duration = (task.completed_at - task.claimed_at).total_seconds() / 3600
                completion_times.append(duration)

        return {
            "total_tasks_completed": total_tasks,
            "average_completion_time": sum(completion_times) / len(completion_times) if completion_times else 0,
            "task_success_rate": 1.0,  # 简化，实际应该跟踪失败率
            "expert_utilization": {
                role.value: agent.current_load / agent.max_parallel_tasks
                for role, agent in self.expert_agents.items()
            },
            "conflict_rate": len(self.conflict_history) / total_tasks if total_tasks > 0 else 0
        }

    def get_coordination_status(self) -> Dict:
        """获取协调状态"""
        return {
            "timestamp": datetime.now().isoformat(),
            "task_queue_length": len(self.task_queue),
            "active_tasks": len(self.active_tasks),
            "completed_tasks": len(self.completed_tasks),
            "expert_status": {
                role.value: {
                    "current_load": agent.current_load,
                    "max_capacity": agent.max_parallel_tasks,
                    "utilization": agent.current_load / agent.max_parallel_tasks
                }
                for role, agent in self.expert_agents.items()
            },
            "active_locks": len(self.task_locks),
            "recent_conflicts": len([c for c in self.conflict_history if
                                  (datetime.now() - c.resolved_at).days <= 1])
        }

    def save_coordination_state(self, file_path: str) -> bool:
        """保存协调状态"""
        try:
            state_data = {
                "workspace_path": str(self.workspace_path),
                "sync_strategy": self.sync_strategy.value,
                "task_queue": [asdict(task) for task in self.task_queue],
                "active_tasks": {tid: asdict(task) for tid, task in self.active_tasks.items()},
                "completed_tasks": {tid: asdict(task) for tid, task in self.completed_tasks.items()},
                "conflict_history": [asdict(conflict) for conflict in self.conflict_history],
                "performance_metrics": self.performance_metrics,
                "generated_at": datetime.now().isoformat()
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(state_data, f, indent=2, ensure_ascii=False, default=str)

            return True

        except Exception as e:
            logging.error(f"Failed to save coordination state: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建并行协调器
    coordinator = ParallelAnalysisCoordinator(
        workspace_path="/tmp/parallel_analysis_workspace",
        sync_strategy=SyncStrategy.LOCK_FIRST
    )

    # 创建分析计划
    analysis_scope = {"industry": "technology", "complexity": "moderate"}
    tasks = coordinator.create_analysis_plan("AAPL", analysis_scope)

    print(f"📋 Created analysis plan with {len(tasks)} tasks:")
    for task in tasks:
        deps = ", ".join(task.dependencies) if task.dependencies else "None"
        print(f"• {task.task_id} | {task.assigned_expert.value} | Priority: {task.priority} | Deps: {deps}")

    # 提交任务队列
    coordinator.submit_task_queue(tasks)

    # 模拟专家执行任务
    print("\n🤖 Simulating expert execution:")

    # 专家们认领并执行任务
    for _ in range(3):  # 模拟3轮执行
        for expert_role in ExpertRole:
            task = coordinator.claim_task(expert_role)
            if task:
                print(f"  {expert_role.value} claimed: {task.task_id}")
                result = coordinator.execute_task(task, expert_role)
                if result["status"] == "success":
                    print(f"  ✅ Completed in {result['execution_time']:.2f}h")
                else:
                    print(f"  ❌ Failed: {result['error']}")

    # 检查协调状态
    status = coordinator.get_coordination_status()
    print(f"\n📊 Coordination Status:")
    print(f"Queue: {status['task_queue_length']} | Active: {status['active_tasks']} | Complete: {status['completed_tasks']}")

    for role, expert_status in status["expert_status"].items():
        print(f"  {role}: {expert_status['utilization']:.1%} utilized")

    # 聚合结果（如果有完成的任务）
    if status["completed_tasks"] > 0:
        aggregated = coordinator.aggregate_results("AAPL")
        print(f"\n🎯 Analysis Complete!")
        print(f"Participating experts: {', '.join(aggregated['participating_experts'])}")

        if aggregated["synthesis"]["valuation_consensus"]:
            consensus = aggregated["synthesis"]["valuation_consensus"]
            print(f"Valuation consensus: ${consensus['average']:.0f} (${consensus['range']['min']:.0f}-${consensus['range']['max']:.0f})")