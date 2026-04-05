#!/usr/bin/env python3
"""
预期差分析 - Harness集成模块 v1.0

将预期差识别器v3.0集成到投资harness系统中，实现：
1. 分析矛盾 → 预期差机会转化
2. 不确定性管理中的预期差fallback策略
3. 市场制度检测中的预期差信号增强
4. 自动触发与执行验证

设计原则：
- 预期差不是bug，是feature - 矛盾指向机会
- 自动化检测但不自动化判断 - 人机协作决策
- 失败友好 - 数据缺失时的智能降级
- 成本意识 - 避免过度分析的资源浪费
"""

import os
import yaml
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime


@dataclass
class ExpectationGapSignal:
    """预期差信号数据结构"""
    ticker: str
    signal_type: str  # 'contradiction' | 'market_dislocation' | 'narrative_lag'
    confidence: float  # 0.0-1.0
    domains: Dict[str, str]  # E/R/G/T四个域的结果
    action_recommendation: str
    trigger_conditions: List[str]
    exit_conditions: List[str]
    timestamp: str


class ExpectationGapHarness:
    """预期差分析Harness控制器"""

    def __init__(self, ticker: str, session_id: str = None):
        self.ticker = ticker.upper()
        self.session_id = session_id or f"eg_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.repo_root = Path(__file__).parents[2]  # 回到投资大师根目录
        self.ticker_dir = self.repo_root / "reports" / self.ticker
        self.data_dir = self.ticker_dir / "data"

        # 确保目录存在
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def detect_analysis_contradiction(self, context: Dict) -> Optional[ExpectationGapSignal]:
        """
        检测分析矛盾并转化为预期差信号

        Args:
            context: 包含分析上下文的字典，如:
                    {"dcf_value": 180, "market_price": 250, "analyst_consensus": 220}

        Returns:
            预期差信号，如果没有显著矛盾则返回None
        """
        dcf_value = context.get('dcf_value')
        market_price = context.get('market_price')
        consensus = context.get('analyst_consensus')

        if not all([dcf_value, market_price]):
            return None

        # 计算偏差
        dcf_deviation = abs(market_price - dcf_value) / dcf_value
        consensus_deviation = abs(market_price - consensus) / consensus if consensus else 0

        # 判断是否存在显著预期差 (偏差>15%)
        if dcf_deviation > 0.15 or consensus_deviation > 0.15:
            domains = {
                "E_domain": f"市场定价 ${market_price:.0f} 隐含增长假设",
                "R_domain": f"DCF内在价值 ${dcf_value:.0f} 基于基本面",
                "G_domain": f"预期差 {(market_price/dcf_value-1)*100:.1f}% {'(高估)' if market_price > dcf_value else '(低估)'}",
                "T_domain": "需要详细的四步分析确定具体行动"
            }

            return ExpectationGapSignal(
                ticker=self.ticker,
                signal_type='contradiction',
                confidence=min(0.9, dcf_deviation * 2),  # 偏差越大置信度越高，但不超过90%
                domains=domains,
                action_recommendation="执行预期差识别器详细分析",
                trigger_conditions=[f"DCF偏差 {dcf_deviation*100:.1f}% > 15%"],
                exit_conditions=["预期差缩小至10%以内", "基本面发生重大变化"],
                timestamp=datetime.now().isoformat()
            )

        return None

    def handle_data_failure_expectation_gap(self, failed_component: str, error_msg: str) -> Dict:
        """
        数据失败时的预期差分析fallback策略

        Args:
            failed_component: 失败的组件名 (如 'fmp_data', 'reverse_dcf')
            error_msg: 错误信息

        Returns:
            fallback选项和预期差相关的替代方案
        """
        fallback_options = {
            "primary_failure": failed_component,
            "error": error_msg,
            "expectation_gap_alternatives": []
        }

        if "fmp_data" in failed_component:
            # MCP数据失败 → 使用市场价格和简单倍数进行预期差估算
            fallback_options["expectation_gap_alternatives"] = [
                "使用Yahoo Finance获取基本价格数据",
                "基于行业平均P/E倍数推估市场隐含预期",
                "使用Polymarket数据作为市场情绪代理",
                "简化版预期差分析(仅E域和G域)"
            ]

        elif "reverse_dcf" in failed_component:
            # DCF计算失败 → 使用相对估值进行预期差分析
            fallback_options["expectation_gap_alternatives"] = [
                "使用同行业可比公司倍数作为R域基准",
                "基于历史估值范围推估合理价值区间",
                "使用简化的P/FCF模型替代完整DCF",
                "聚焦于G域(定性预期差识别)"
            ]

        elif "expectation-gap" in failed_component:
            # 预期差skill本身失败 → 手动模板fallback
            fallback_options["expectation_gap_alternatives"] = [
                "使用内置预期差分析模板",
                "执行简化的E→R→G三步分析(跳过T域)",
                "直接在报告中内联预期差描述",
                "将预期差分析推迟到Phase 4红队阶段"
            ]

        return fallback_options

    def auto_trigger_expectation_gap(self, phase: int) -> Tuple[bool, str]:
        """
        自动触发预期差分析的条件检查

        Args:
            phase: 当前Phase编号

        Returns:
            (should_trigger, reason)
        """
        # 检查预期差分析是否已存在
        eg_file = self.data_dir / "expectation_gap_analysis.yaml"
        if eg_file.exists():
            return False, "预期差分析已存在"

        # Phase 1: 检查是否有Reverse DCF
        if phase >= 1:
            phase1_files = list(self.ticker_dir.glob("*Phase1*"))
            if phase1_files:
                phase1_content = phase1_files[0].read_text(encoding='utf-8')
                if "reverse dcf" in phase1_content.lower() or "市场隐含" in phase1_content:
                    return True, "Phase 1包含Reverse DCF，触发预期差分析"

        # Phase 2+: 检查是否有估值矛盾
        if phase >= 2:
            # 简单检查：寻找多个估值数字
            report_files = list(self.ticker_dir.glob("*Phase2*"))
            if not report_files:
                report_files = list(self.ticker_dir.glob("*Complete*"))

            if report_files:
                content = report_files[0].read_text(encoding='utf-8')

                # 查找估值相关的数字
                import re
                price_mentions = len(re.findall(r'\$[0-9]+', content))
                if price_mentions >= 3:  # 至少3个价格提及，暗示可能有矛盾
                    return True, f"发现{price_mentions}个价格提及，可能存在估值矛盾"

        return False, f"Phase {phase} 条件未满足，暂不触发"

    def validate_expectation_gap_output(self, eg_file_path: str = None) -> Dict:
        """
        验证预期差分析输出的质量和完整性

        Args:
            eg_file_path: 预期差分析文件路径，默认使用标准位置

        Returns:
            验证结果字典
        """
        if not eg_file_path:
            eg_file_path = self.data_dir / "expectation_gap_analysis.yaml"

        validation_result = {
            "exists": False,
            "domains_complete": False,
            "action_clear": False,
            "confidence_appropriate": False,
            "quality_score": 0.0,
            "missing_elements": [],
            "recommendations": []
        }

        if not os.path.exists(eg_file_path):
            validation_result["missing_elements"].append("预期差分析文件缺失")
            validation_result["recommendations"].append("执行 /expectation-gap " + self.ticker)
            return validation_result

        validation_result["exists"] = True

        try:
            with open(eg_file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # 检查E→R→G→T四个域
            required_domains = ["E_domain", "R_domain", "G_domain", "T_domain"]
            present_domains = sum(1 for domain in required_domains if domain in content)

            if present_domains >= 4:
                validation_result["domains_complete"] = True
            else:
                validation_result["missing_elements"].append(f"域不完整 ({present_domains}/4)")

            # 检查行动判断
            if "action_recommendation" in content:
                validation_result["action_clear"] = True
            else:
                validation_result["missing_elements"].append("缺少行动判断")

            # 检查置信度
            if "confidence" in content:
                validation_result["confidence_appropriate"] = True
            else:
                validation_result["missing_elements"].append("缺少置信度评估")

            # 计算质量分数
            score_components = [
                validation_result["exists"],
                validation_result["domains_complete"],
                validation_result["action_clear"],
                validation_result["confidence_appropriate"]
            ]
            validation_result["quality_score"] = sum(score_components) / len(score_components)

        except Exception as e:
            validation_result["missing_elements"].append(f"文件解析错误: {str(e)}")

        # 生成改进建议
        if validation_result["quality_score"] < 1.0:
            if not validation_result["domains_complete"]:
                validation_result["recommendations"].append("补全E→R→G→T四个域的分析")
            if not validation_result["action_clear"]:
                validation_result["recommendations"].append("明确action_recommendation字段")
            if not validation_result["confidence_appropriate"]:
                validation_result["recommendations"].append("添加confidence_level评估")

        return validation_result

    def generate_expectation_gap_reminder(self, phase: int) -> str:
        """生成预期差分析提醒文案"""
        should_trigger, reason = self.auto_trigger_expectation_gap(phase)

        if should_trigger:
            return f"""
📊 预期差分析提醒 - {self.ticker} Phase {phase}

触发原因: {reason}

建议执行: /expectation-gap {self.ticker}

预期输出:
✓ E域: 市场隐含预期提炼
✓ R域: 业务现实分析
✓ G域: 预期差量化
✓ T域: 行动判断

集成点: 可在Phase 1完成后执行，作为Phase 2估值分析的前置步骤。

验证: 完成后运行 bash scripts/expectation_gap_enforcer.sh {self.ticker} {phase} check
"""
        else:
            return f"预期差分析条件检查: {reason}"


def main():
    """命令行接口"""
    import sys

    if len(sys.argv) < 3:
        print("用法: python expectation_gap_integration.py <TICKER> <ACTION> [ARGS...]")
        print("ACTION: detect|trigger|validate|remind")
        return

    ticker = sys.argv[1]
    action = sys.argv[2]

    harness = ExpectationGapHarness(ticker)

    if action == "detect":
        # 检测分析矛盾
        context = {
            "dcf_value": float(sys.argv[3]) if len(sys.argv) > 3 else None,
            "market_price": float(sys.argv[4]) if len(sys.argv) > 4 else None,
            "analyst_consensus": float(sys.argv[5]) if len(sys.argv) > 5 else None
        }
        signal = harness.detect_analysis_contradiction(context)
        if signal:
            print(json.dumps(asdict(signal), indent=2, ensure_ascii=False))
        else:
            print("未检测到显著预期差信号")

    elif action == "trigger":
        # 检查自动触发条件
        phase = int(sys.argv[3]) if len(sys.argv) > 3 else 1
        should_trigger, reason = harness.auto_trigger_expectation_gap(phase)
        print(f"触发检查: {should_trigger} - {reason}")

    elif action == "validate":
        # 验证输出质量
        result = harness.validate_expectation_gap_output()
        print(json.dumps(result, indent=2, ensure_ascii=False))

    elif action == "remind":
        # 生成提醒文案
        phase = int(sys.argv[3]) if len(sys.argv) > 3 else 1
        reminder = harness.generate_expectation_gap_reminder(phase)
        print(reminder)

    else:
        print(f"未知操作: {action}")


if __name__ == "__main__":
    main()