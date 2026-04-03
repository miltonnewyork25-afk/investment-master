#!/usr/bin/env python3
"""
Investment Research Compliance Layer
===================================

投资研究合规检查系统，确保分析报告符合监管要求和道德标准
投资建议具有法律责任，AI系统必须内置合规检查

Version: 1.0
Author: 投资大师 Framework v19.9+
"""

import json
import logging
import re
from typing import Dict, List, Optional, Tuple, Set
from enum import Enum
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta

class ComplianceRisk(Enum):
    """合规风险类型"""
    MATERIAL_NON_PUBLIC = "material_non_public"     # 内幕信息
    CONFLICT_OF_INTEREST = "conflict_of_interest"   # 利益冲突
    MISLEADING_STATEMENT = "misleading_statement"   # 误导性陈述
    INADEQUATE_DISCLOSURE = "inadequate_disclosure" # 披露不充分
    PROHIBITED_RECOMMENDATION = "prohibited_rec"    # 禁止的投资建议
    BIAS_DETECTION = "bias_detection"               # 偏见检测
    FORWARD_LOOKING_RISK = "forward_looking"        # 前瞻性声明风险
    JURISDICTION_VIOLATION = "jurisdiction"         # 管辖区违规

class RiskLevel(Enum):
    """风险等级"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class ComplianceIssue:
    """合规问题"""
    issue_id: str
    risk_type: ComplianceRisk
    risk_level: RiskLevel
    description: str
    location: str  # 文档位置
    suggested_fix: str
    regulation_reference: Optional[str]
    detected_at: datetime

@dataclass
class ComplianceReport:
    """合规报告"""
    document_id: str
    analysis_type: str
    total_issues: int
    critical_issues: int
    high_issues: int
    medium_issues: int
    low_issues: int
    overall_risk_score: float
    compliance_status: str  # PASS/WARNING/FAIL
    issues: List[ComplianceIssue]
    generated_at: datetime

class InvestmentComplianceChecker:
    """投资研究合规检查器"""

    def __init__(self):
        # 敏感词汇检测
        self.sensitive_terms = {
            'insider_info': [
                '内部消息', '私下得知', '未公开信息', '小道消息',
                'inside information', 'private tip', 'confidential source'
            ],
            'guaranteed_returns': [
                '保证', '确保', '必定', '一定会', '绝对', '100%',
                'guarantee', 'certain', 'definitely will', 'absolutely'
            ],
            'market_manipulation': [
                '操纵', '控制价格', '联合做市', 'pump and dump',
                'manipulate', 'control price', 'coordinate buying'
            ],
            'misleading_certainty': [
                '肯定会涨', '必涨', '绝对安全', '无风险',
                'will definitely rise', 'risk-free', 'guaranteed profit'
            ]
        }

        # 必须披露的风险因素
        self.required_risk_disclosures = [
            '市场风险', '流动性风险', '信用风险', '操作风险',
            '监管风险', '汇率风险', '利率风险'
        ]

        # 禁止的推荐用词
        self.prohibited_recommendations = [
            '买入', '卖出', '推荐购买', '建议出售', '立即行动',
            'buy', 'sell', 'purchase', 'dump', 'immediate action'
        ]

        # 合规评分权重
        self.risk_weights = {
            RiskLevel.CRITICAL: 10.0,
            RiskLevel.HIGH: 5.0,
            RiskLevel.MEDIUM: 2.0,
            RiskLevel.LOW: 0.5
        }

    def check_material_non_public_info(self, content: str) -> List[ComplianceIssue]:
        """检查是否涉及重大非公开信息"""
        issues = []

        # 检查内幕信息相关用词
        for term in self.sensitive_terms['insider_info']:
            if term in content.lower():
                issues.append(ComplianceIssue(
                    issue_id=f"mnpi_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.MATERIAL_NON_PUBLIC,
                    risk_level=RiskLevel.CRITICAL,
                    description=f"Potential reference to material non-public information: '{term}'",
                    location=f"Content contains: {term}",
                    suggested_fix="Remove references to non-public information sources. Use only publicly available data.",
                    regulation_reference="Securities Exchange Act Rule 10b-5",
                    detected_at=datetime.now()
                ))

        # 检查未经证实的管理层声明
        mgmt_patterns = [
            r'管理层(?:私下|内部)(?:表示|透露|暗示)',
            r'(?:CEO|CFO|高管)(?:私下|非正式)(?:说|表示|透露)',
            r'management\s+(?:privately|confidentially)\s+(?:indicated|suggested|revealed)'
        ]

        for pattern in mgmt_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                issues.append(ComplianceIssue(
                    issue_id=f"mgmt_info_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.MATERIAL_NON_PUBLIC,
                    risk_level=RiskLevel.HIGH,
                    description="Reference to private management communication",
                    location=f"Match: {match.group()}",
                    suggested_fix="Only reference public management statements from earnings calls, SEC filings, or press releases.",
                    regulation_reference="Fair Disclosure Regulation (Reg FD)",
                    detected_at=datetime.now()
                ))

        return issues

    def check_conflict_of_interest(self, content: str, analyst_holdings: Optional[List[str]] = None) -> List[ComplianceIssue]:
        """检查利益冲突"""
        issues = []

        # 检查未披露的关联关系
        conflict_indicators = [
            r'我们?(?:持有|拥有|投资)',
            r'(?:本人|作者|我们?)(?:在|于).*(?:工作|任职|担任)',
            r'we\s+(?:own|hold|invest)',
            r'(?:I|author)\s+(?:work|worked|employed)\s+(?:at|for)'
        ]

        for pattern in conflict_indicators:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                issues.append(ComplianceIssue(
                    issue_id=f"conflict_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.CONFLICT_OF_INTEREST,
                    risk_level=RiskLevel.HIGH,
                    description="Potential undisclosed conflict of interest",
                    location=f"Match: {match.group()}",
                    suggested_fix="Add proper disclosure of any conflicts of interest at the beginning of the analysis.",
                    regulation_reference="Investment Advisers Act Section 206",
                    detected_at=datetime.now()
                ))

        return issues

    def check_misleading_statements(self, content: str) -> List[ComplianceIssue]:
        """检查误导性陈述"""
        issues = []

        # 检查保证性收益声明
        for term in self.sensitive_terms['guaranteed_returns']:
            if term in content.lower():
                issues.append(ComplianceIssue(
                    issue_id=f"misleading_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.MISLEADING_STATEMENT,
                    risk_level=RiskLevel.CRITICAL,
                    description=f"Misleading guarantee of returns: '{term}'",
                    location=f"Content contains: {term}",
                    suggested_fix="Remove guarantees. Use probabilistic language and include risk warnings.",
                    regulation_reference="Securities Act Section 17(a)",
                    detected_at=datetime.now()
                ))

        # 检查过度确定性表述
        certainty_patterns = [
            r'(?:股价|价格)(?:一定|肯定|必然)(?:会|将)(?:上涨|下跌)',
            r'(?:绝对|完全)(?:安全|无风险)的投资',
            r'(?:stock|price)\s+will\s+(?:definitely|certainly|absolutely)\s+(?:rise|fall|increase|decrease)',
            r'(?:risk-free|absolutely safe|completely secure)\s+investment'
        ]

        for pattern in certainty_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                issues.append(ComplianceIssue(
                    issue_id=f"certainty_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.MISLEADING_STATEMENT,
                    risk_level=RiskLevel.HIGH,
                    description="Overly certain statement about market movements",
                    location=f"Match: {match.group()}",
                    suggested_fix="Use probabilistic language. Example: 'may', 'could', 'likely', with probability ranges.",
                    regulation_reference="Anti-fraud provisions",
                    detected_at=datetime.now()
                ))

        return issues

    def check_prohibited_recommendations(self, content: str) -> List[ComplianceIssue]:
        """检查禁止的投资建议"""
        issues = []

        # 检查直接投资建议用词
        for term in self.prohibited_recommendations:
            if term in content.lower():
                issues.append(ComplianceIssue(
                    issue_id=f"prohibited_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.PROHIBITED_RECOMMENDATION,
                    risk_level=RiskLevel.HIGH,
                    description=f"Prohibited investment recommendation term: '{term}'",
                    location=f"Content contains: {term}",
                    suggested_fix="Replace with analysis-focused language. Use 'analysis suggests', 'data indicates', 'consideration factors'.",
                    regulation_reference="Investment Advisers Act",
                    detected_at=datetime.now()
                ))

        return issues

    def check_risk_disclosure_adequacy(self, content: str) -> List[ComplianceIssue]:
        """检查风险披露充分性"""
        issues = []

        # 检查是否包含主要风险类别
        content_lower = content.lower()
        missing_risks = []

        for risk_type in self.required_risk_disclosures:
            if risk_type not in content_lower and risk_type.lower() not in content_lower:
                missing_risks.append(risk_type)

        if missing_risks:
            issues.append(ComplianceIssue(
                issue_id=f"risk_disclosure_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                risk_type=ComplianceRisk.INADEQUATE_DISCLOSURE,
                risk_level=RiskLevel.MEDIUM,
                description=f"Missing risk disclosures: {', '.join(missing_risks)}",
                location="Risk disclosure section",
                suggested_fix=f"Add disclosure for: {', '.join(missing_risks)}",
                regulation_reference="Suitability and Disclosure Requirements",
                detected_at=datetime.now()
            ))

        # 检查前瞻性声明警告
        forward_looking_indicators = [
            '预计', '预期', '估计', '预测', '展望',
            'expect', 'forecast', 'project', 'anticipate', 'outlook'
        ]

        has_forward_looking = any(term in content_lower for term in forward_looking_indicators)
        has_forward_warning = any(warning in content_lower for warning in [
            '前瞻性声明', '不构成投资建议', 'forward-looking', 'not investment advice'
        ])

        if has_forward_looking and not has_forward_warning:
            issues.append(ComplianceIssue(
                issue_id=f"forward_warning_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                risk_type=ComplianceRisk.FORWARD_LOOKING_RISK,
                risk_level=RiskLevel.MEDIUM,
                description="Forward-looking statements without proper warnings",
                location="Document contains forecasts/projections",
                suggested_fix="Add disclaimer: 'Forward-looking statements are subject to risks and uncertainties. Past performance does not guarantee future results.'",
                regulation_reference="Safe Harbor Provisions",
                detected_at=datetime.now()
            ))

        return issues

    def check_ai_bias_indicators(self, content: str) -> List[ComplianceIssue]:
        """检查AI可能产生的偏见"""
        issues = []

        # 检查survivorship bias指标
        survivorship_patterns = [
            r'历史上(?:成功|优秀)的(?:公司|案例)显示',
            r'(?:past|historical)\s+(?:winners|success)\s+(?:show|indicate|demonstrate)',
            r'成功(?:企业|公司)的(?:共同|典型)特征'
        ]

        for pattern in survivorship_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                issues.append(ComplianceIssue(
                    issue_id=f"survivorship_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    risk_type=ComplianceRisk.BIAS_DETECTION,
                    risk_level=RiskLevel.LOW,
                    description="Potential survivorship bias in historical examples",
                    location=f"Match: {match.group()}",
                    suggested_fix="Acknowledge survivorship bias and include failed examples for balanced perspective.",
                    regulation_reference="Fair and Balanced Analysis Standards",
                    detected_at=datetime.now()
                ))

        # 检查confirmation bias指标
        confirmation_patterns = [
            r'(?:证实|支持|验证)了我们的(?:观点|假设|预期)',
            r'(?:confirms|supports|validates)\s+(?:our|the)\s+(?:thesis|hypothesis|expectation)',
            r'正如(?:预期|预测)的那样'
        ]

        confirmation_count = 0
        for pattern in confirmation_patterns:
            confirmation_count += len(re.findall(pattern, content, re.IGNORECASE))

        if confirmation_count > 3:  # 过多确认性偏见表述
            issues.append(ComplianceIssue(
                issue_id=f"confirmation_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                risk_type=ComplianceRisk.BIAS_DETECTION,
                risk_level=RiskLevel.MEDIUM,
                description=f"High frequency of confirmation bias language ({confirmation_count} instances)",
                location="Throughout document",
                suggested_fix="Include contrarian viewpoints and potential disconfirming evidence.",
                regulation_reference="Objective Analysis Requirements",
                detected_at=datetime.now()
            ))

        return issues

    def comprehensive_compliance_check(self, content: str, document_id: str,
                                     analysis_type: str = "investment_analysis",
                                     analyst_holdings: Optional[List[str]] = None) -> ComplianceReport:
        """综合合规检查"""
        all_issues = []

        # 执行所有检查
        all_issues.extend(self.check_material_non_public_info(content))
        all_issues.extend(self.check_conflict_of_interest(content, analyst_holdings))
        all_issues.extend(self.check_misleading_statements(content))
        all_issues.extend(self.check_prohibited_recommendations(content))
        all_issues.extend(self.check_risk_disclosure_adequacy(content))
        all_issues.extend(self.check_ai_bias_indicators(content))

        # 统计风险等级
        risk_counts = {level: 0 for level in RiskLevel}
        for issue in all_issues:
            risk_counts[issue.risk_level] += 1

        # 计算风险评分
        total_risk_score = sum(
            count * self.risk_weights[level]
            for level, count in risk_counts.items()
        )

        # 标准化风险评分 (0-100)
        max_possible_score = 100  # 假设最高可能风险评分
        normalized_score = min(total_risk_score, max_possible_score)

        # 确定合规状态
        if risk_counts[RiskLevel.CRITICAL] > 0:
            compliance_status = "FAIL"
        elif risk_counts[RiskLevel.HIGH] > 2 or normalized_score > 50:
            compliance_status = "WARNING"
        else:
            compliance_status = "PASS"

        return ComplianceReport(
            document_id=document_id,
            analysis_type=analysis_type,
            total_issues=len(all_issues),
            critical_issues=risk_counts[RiskLevel.CRITICAL],
            high_issues=risk_counts[RiskLevel.HIGH],
            medium_issues=risk_counts[RiskLevel.MEDIUM],
            low_issues=risk_counts[RiskLevel.LOW],
            overall_risk_score=normalized_score,
            compliance_status=compliance_status,
            issues=all_issues,
            generated_at=datetime.now()
        )

    def generate_compliance_summary(self, report: ComplianceReport) -> str:
        """生成合规摘要"""
        summary_parts = [
            f"## 合规检查报告",
            f"**文档ID**: {report.document_id}",
            f"**检查时间**: {report.generated_at.strftime('%Y-%m-%d %H:%M:%S')}",
            f"**合规状态**: {report.compliance_status}",
            f"**风险评分**: {report.overall_risk_score:.1f}/100",
            f"",
            f"**问题统计**:",
            f"- 严重问题: {report.critical_issues}",
            f"- 高风险问题: {report.high_issues}",
            f"- 中风险问题: {report.medium_issues}",
            f"- 低风险问题: {report.low_issues}",
            f""
        ]

        if report.critical_issues > 0 or report.high_issues > 0:
            summary_parts.extend([
                f"**需要立即处理的问题**:",
                f""
            ])

            priority_issues = [issue for issue in report.issues
                             if issue.risk_level in [RiskLevel.CRITICAL, RiskLevel.HIGH]]

            for issue in priority_issues[:5]:  # 最多显示5个优先问题
                summary_parts.extend([
                    f"**{issue.risk_level.value.upper()}**: {issue.description}",
                    f"- 位置: {issue.location}",
                    f"- 建议: {issue.suggested_fix}",
                    f""
                ])

        if report.compliance_status == "FAIL":
            summary_parts.append("⚠️ **文档未通过合规检查，禁止发布**")
        elif report.compliance_status == "WARNING":
            summary_parts.append("⚠️ **文档存在合规风险，建议修改后发布**")
        else:
            summary_parts.append("✅ **文档通过合规检查**")

        return "\n".join(summary_parts)

    def save_compliance_report(self, report: ComplianceReport, file_path: str) -> bool:
        """保存合规报告"""
        try:
            report_data = {
                "compliance_report": {
                    "document_id": report.document_id,
                    "analysis_type": report.analysis_type,
                    "generated_at": report.generated_at.isoformat(),
                    "overall_risk_score": report.overall_risk_score,
                    "compliance_status": report.compliance_status,
                    "issue_summary": {
                        "total_issues": report.total_issues,
                        "critical_issues": report.critical_issues,
                        "high_issues": report.high_issues,
                        "medium_issues": report.medium_issues,
                        "low_issues": report.low_issues
                    },
                    "detailed_issues": [
                        {
                            "issue_id": issue.issue_id,
                            "risk_type": issue.risk_type.value,
                            "risk_level": issue.risk_level.value,
                            "description": issue.description,
                            "location": issue.location,
                            "suggested_fix": issue.suggested_fix,
                            "regulation_reference": issue.regulation_reference,
                            "detected_at": issue.detected_at.isoformat()
                        }
                        for issue in report.issues
                    ]
                }
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(report_data, f, indent=2, ensure_ascii=False)

            return True

        except Exception as e:
            logging.error(f"Failed to save compliance report: {e}")
            return False

# 使用示例
if __name__ == "__main__":
    # 创建合规检查器
    checker = InvestmentComplianceChecker()

    # 测试内容
    test_content = """
    根据我们从管理层私下得到的消息，这家公司的下个季度业绩一定会大涨。
    我们强烈推荐买入这只股票，因为它绝对安全，保证会有很高的回报。
    历史上成功的科技公司显示，这种模式必然成功。
    """

    # 执行合规检查
    report = checker.comprehensive_compliance_check(
        content=test_content,
        document_id="TEST_001",
        analysis_type="investment_analysis"
    )

    # 生成摘要
    summary = checker.generate_compliance_summary(report)
    print(summary)

    print(f"\nDetailed issues:")
    for issue in report.issues:
        print(f"- {issue.risk_level.value}: {issue.description}")
        print(f"  Fix: {issue.suggested_fix}")
        print()