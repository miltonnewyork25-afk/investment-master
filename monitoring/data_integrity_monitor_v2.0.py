#!/usr/bin/env python3
"""
数据真实性监测工具 v2.0 - 实时监控版
Data Integrity Monitor v2.0 for Investment Research Reports

新功能:
1. 实时文件监控（watchdog）
2. 自动质量评分v2.0算法
3. 实时质量仪表盘更新
4. 自动修正建议生成
5. 质量<50分自动告警
6. 数据来源自动分类（Tier 1/2/3）
7. 数据时效性评分

使用方法:
python data_integrity_monitor_v2.0.py <报告文件路径>  # 单次扫描
python data_integrity_monitor_v2.0.py --watch  # 实时监控模式
python data_integrity_monitor_v2.0.py --watch --auto-update-dashboard  # 监控+仪表盘
"""

import re
import sys
import os
import time
import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from collections import defaultdict

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
    WATCHDOG_AVAILABLE = True
except ImportError:
    WATCHDOG_AVAILABLE = False
    print("⚠️ watchdog未安装，实时监控功能不可用")
    print("安装: pip install watchdog")


@dataclass
class DataPoint:
    """数据点对象"""
    value: str
    context: str
    line_number: int
    data_type: str
    has_source: bool
    source_tier: str  # NEW: Tier 1/2/3
    label: str
    confidence: int
    timestamp: str  # NEW: 数据时间戳


@dataclass
class QualityReport:
    """数据质量报告v2.0"""
    file_name: str
    file_path: str
    scan_time: str
    total_data_points: int
    verified_count: int
    estimated_count: int
    sample_count: int
    unverified_count: int
    source_tier1_count: int  # NEW
    source_tier2_count: int  # NEW
    source_tier3_count: int  # NEW
    quality_score: float
    quality_grade: str  # NEW: A+/B/C/F
    verifiable_data_ratio: float  # NEW
    source_annotation_ratio: float  # NEW
    timeliness_score: float  # NEW
    logic_completeness_score: float  # NEW
    disclaimer_present: bool  # NEW
    issues: List[str]
    recommendations: List[str]
    auto_fix_suggestions: List[Dict]  # NEW


class DataIntegrityMonitorV2:
    """数据完整性监测器 v2.0"""

    # 数据模式
    PATTERNS = {
        'percentage': r'\b\d+\.?\d*%',
        'number_with_unit': r'\b\d+\.?\d*[KMBT](?:亿|万|千)?',
        'currency': r'\$\d+(?:,\d{3})*(?:\.\d+)?[KMBT]?',
        'plain_number': r'\b\d{1,3}(?:,\d{3})+(?:\.\d+)?',
        'decimal': r'\b\d+\.\d+(?!%)',
        'date': r'\b20\d{2}[-/]\d{1,2}[-/]\d{1,2}\b',
        'time': r'\b\d{1,2}:\d{2}(?::\d{2})?\s?(?:UTC|EST|PST)?\b',
    }

    # 标注符号
    LABELS = {
        '✅': 'VERIFIED',
        '📊': 'ESTIMATED',
        '🎯': 'MODELED',
        '⚠️': 'SAMPLE',
        '❌': 'UNVERIFIED',
        '[VERIFIED]': 'VERIFIED',
        '[ESTIMATED]': 'ESTIMATED',
        '[SAMPLE]': 'SAMPLE',
    }

    # 数据来源分层（NEW）
    SOURCE_TIER1 = [
        'SEC', 'EDGAR', '10-K', '10-Q', '8-K', '财报', 'earnings report',
        'investor relations', 'IR.', '官方发布', 'official release',
        'press release', '新闻稿', 'annual report', '年报',
        '季报', 'quarterly report'
    ]

    SOURCE_TIER2 = [
        'Bloomberg', 'Reuters', 'Yahoo Finance', 'FactSet', 'S&P Capital IQ',
        'Morningstar', 'Seeking Alpha', 'MarketWatch', 'CNBC',
        'Wall Street Journal', 'Financial Times',
        '知名分析师', 'top analyst', '行业协会', 'industry association',
        'IDC', 'Gartner', 'McKinsey', 'BCG', 'Bain'
    ]

    SOURCE_TIER3 = [
        'Twitter', 'Reddit', 'social media', '社交媒体',
        'rumor', '传闻', '据悉', '消息人士',
        'anonymous', '匿名', 'unconfirmed', '未证实',
        'allegedly', '据称'
    ]

    # 可疑关键词（表明虚构数据）
    SUSPICIOUS_KEYWORDS = [
        'Engine 1', 'Engine 2', 'Engine 3', 'Engine 4', 'Engine 5', 'Engine 6',
        '实时监控', 'real-time monitoring',
        '异常大单', 'unusual activity',
        '内部消息', 'inside information',
        '独家获悉', 'exclusively learned',
        '暗池数据', 'dark pool data',
        '独家算法', 'proprietary algorithm'
    ]

    # 需要来源的关键数据
    REQUIRE_SOURCE = [
        '毛利率', '交付量', '市值', '营收', '利润', '增长率',
        'margin', 'delivery', 'revenue', 'profit', 'market cap',
        'growth rate', 'EBITDA', 'EPS', 'P/E', 'ROE', 'ROIC'
    ]

    def __init__(self):
        self.data_points: List[DataPoint] = []
        self.issues: List[str] = []
        self.recommendations: List[str] = []
        self.auto_fix_suggestions: List[Dict] = []
        self.all_reports: List[QualityReport] = []

    def scan_file(self, file_path: str) -> QualityReport:
        """扫描单个文件"""
        print(f"\n{'='*80}")
        print(f"扫描文件: {file_path}")
        print(f"扫描时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*80}\n")

        self.data_points = []
        self.issues = []
        self.recommendations = []
        self.auto_fix_suggestions = []

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception as e:
            print(f"❌ 错误: 无法读取文件 {file_path}: {e}")
            return None

        # 逐行扫描
        for i, line in enumerate(lines, 1):
            self._scan_line(line, i, file_path)

        # 检查免责声明
        content = ''.join(lines)
        has_disclaimer = self._check_disclaimer(content)

        # 生成报告
        report = self._generate_report_v2(file_path, has_disclaimer)
        return report

    def _scan_line(self, line: str, line_number: int, file_path: str):
        """扫描单行"""
        # 检测数字
        for pattern_name, pattern in self.PATTERNS.items():
            matches = re.finditer(pattern, line)
            for match in matches:
                value = match.group()
                context = line.strip()

                # 判断标注类型
                label = self._detect_label(line)

                # 判断数据来源分层
                source_tier, has_source = self._detect_source_tier(line, context)

                # 提取时间戳
                timestamp = self._extract_timestamp(line, context)

                # 计算置信度
                confidence = self._calculate_confidence_v2(
                    value, context, label, source_tier, timestamp
                )

                data_point = DataPoint(
                    value=value,
                    context=context,
                    line_number=line_number,
                    data_type=pattern_name,
                    has_source=has_source,
                    source_tier=source_tier,
                    label=label,
                    confidence=confidence,
                    timestamp=timestamp
                )

                self.data_points.append(data_point)

                # 生成自动修正建议
                if confidence < 50:
                    self._generate_auto_fix(data_point, file_path)

        # 检测可疑关键词
        for keyword in self.SUSPICIOUS_KEYWORDS:
            if keyword in line:
                self.issues.append(
                    f"⚠️ 行{line_number}: 发现可疑关键词 '{keyword}' - {line.strip()[:80]}"
                )
                self.auto_fix_suggestions.append({
                    'line': line_number,
                    'issue': f"可疑关键词: {keyword}",
                    'original': line.strip()[:100],
                    'suggestion': f"建议删除或重写此行，避免使用'{keyword}'等不可验证的来源",
                    'severity': 'HIGH'
                })

        # 检测缺少来源的关键数据
        for keyword in self.REQUIRE_SOURCE:
            if keyword in line.lower():
                _, has_source = self._detect_source_tier(line, line)
                if not has_source:
                    self.issues.append(
                        f"❌ 行{line_number}: '{keyword}' 数据缺少来源标注 - {line.strip()[:80]}"
                    )
                    self._generate_source_suggestion(line, line_number, keyword)

    def _detect_label(self, line: str) -> str:
        """检测数据标注类型"""
        for emoji, label in self.LABELS.items():
            if emoji in line:
                return label

        if 'VERIFIED' in line or '来源:' in line or 'Source:' in line:
            return 'VERIFIED'
        elif 'ESTIMATED' in line or '估算' in line or '预测' in line:
            return 'ESTIMATED'
        elif 'SAMPLE' in line or 'EXAMPLE' in line or '示例' in line or '演示' in line:
            return 'SAMPLE'
        elif 'Engine' in line:
            return 'UNVERIFIED'

        return 'UNLABELED'

    def _detect_source_tier(self, line: str, context: str) -> Tuple[str, bool]:
        """检测数据来源分层（NEW）"""
        # Tier 1: 官方来源
        for indicator in self.SOURCE_TIER1:
            if indicator in line or indicator in context:
                return 'Tier 1', True

        # Tier 2: 知名机构
        for indicator in self.SOURCE_TIER2:
            if indicator in line or indicator in context:
                return 'Tier 2', True

        # Tier 3: 社交媒体/传闻
        for indicator in self.SOURCE_TIER3:
            if indicator in line or indicator in context:
                return 'Tier 3', True

        return 'No Source', False

    def _extract_timestamp(self, line: str, context: str) -> str:
        """提取数据时间戳（NEW）"""
        # 查找日期
        date_pattern = r'\b(20\d{2})[-/年](\d{1,2})[-/月](\d{1,2})[日]?\b'
        match = re.search(date_pattern, context)
        if match:
            return f"{match.group(1)}-{match.group(2).zfill(2)}-{match.group(3).zfill(2)}"

        # 查找季度
        quarter_pattern = r'\b(20\d{2})\s*Q([1-4])\b'
        match = re.search(quarter_pattern, context, re.IGNORECASE)
        if match:
            return f"{match.group(1)}-Q{match.group(2)}"

        # 查找年份
        year_pattern = r'\b(20\d{2})年?\b'
        match = re.search(year_pattern, context)
        if match:
            return match.group(1)

        return 'Unknown'

    def _calculate_confidence_v2(self, value: str, context: str,
                                 label: str, source_tier: str,
                                 timestamp: str) -> int:
        """计算数据置信度v2.0（NEW）"""
        score = 50  # 基础分

        # 标注类型加分
        if label == 'VERIFIED':
            score += 30
        elif label == 'ESTIMATED':
            score += 10
        elif label == 'SAMPLE':
            score -= 20
        elif label == 'UNVERIFIED':
            score -= 40

        # 来源分层加分（NEW）
        if source_tier == 'Tier 1':
            score += 30
        elif source_tier == 'Tier 2':
            score += 15
        elif source_tier == 'Tier 3':
            score -= 20
        else:
            score -= 15

        # 时效性加分（NEW）
        if timestamp != 'Unknown':
            try:
                # 解析日期
                if 'Q' in timestamp:
                    year, quarter = timestamp.split('-Q')
                    data_date = datetime(int(year), int(quarter)*3, 1)
                elif len(timestamp) == 4:  # 年份
                    data_date = datetime(int(timestamp), 1, 1)
                else:  # 完整日期
                    data_date = datetime.strptime(timestamp, '%Y-%m-%d')

                days_old = (datetime.now() - data_date).days

                if days_old < 30:  # <1个月
                    score += 15
                elif days_old < 90:  # <3个月
                    score += 10
                elif days_old < 365:  # <1年
                    score += 5
                else:  # >1年
                    score -= 10
            except:
                pass

        # Engine系统数据严重扣分
        if 'Engine' in context:
            score -= 50

        # 可疑关键词扣分
        for keyword in self.SUSPICIOUS_KEYWORDS:
            if keyword in context:
                score -= 30
                break

        return max(0, min(100, score))

    def _check_disclaimer(self, content: str) -> bool:
        """检查是否有免责声明（NEW）"""
        disclaimer_keywords = [
            '免责声明', 'disclaimer', '风险提示', 'risk warning',
            '不构成投资建议', 'not investment advice',
            'for informational purposes only', '仅供参考'
        ]
        return any(keyword in content.lower() for keyword in disclaimer_keywords)

    def _generate_auto_fix(self, dp: DataPoint, file_path: str):
        """生成自动修正建议（NEW）"""
        suggestion = {
            'file': os.path.basename(file_path),
            'line': dp.line_number,
            'issue': f"置信度过低 ({dp.confidence}%)",
            'original': dp.context[:100],
            'data_point': dp.value,
            'current_label': dp.label,
            'current_source_tier': dp.source_tier,
            'severity': 'HIGH' if dp.confidence < 30 else 'MEDIUM'
        }

        # 根据问题类型生成具体建议
        if dp.source_tier == 'No Source':
            suggestion['suggestion'] = (
                f"原文: \"{dp.context[:80]}...\"\n"
                f"问题: 缺少来源标注\n"
                f"建议修正: 添加数据来源，如：\n"
                f"  - [VERIFIED] (来源: TSLA 10-Q Q3 2025, p.15)\n"
                f"  - [ESTIMATED] (基于Bloomberg Consensus)\n"
                f"  或删除此数据点"
            )
        elif dp.label == 'UNLABELED':
            suggestion['suggestion'] = (
                f"原文: \"{dp.context[:80]}...\"\n"
                f"问题: 缺少数据标注\n"
                f"建议修正: 添加标注符号：\n"
                f"  - [VERIFIED] - 可验证数据\n"
                f"  - [ESTIMATED] - 估算数据\n"
                f"  - [SAMPLE] - 示例数据"
            )
        elif dp.source_tier == 'Tier 3':
            suggestion['suggestion'] = (
                f"原文: \"{dp.context[:80]}...\"\n"
                f"问题: 使用了低可信度来源 (Tier 3)\n"
                f"建议修正: \n"
                f"  - 用Tier 1/2来源替换\n"
                f"  - 或标注为 [ESTIMATED] 并说明不确定性\n"
                f"  - 或删除此数据点"
            )
        elif 'Engine' in dp.context:
            suggestion['suggestion'] = (
                f"原文: \"{dp.context[:80]}...\"\n"
                f"问题: 包含'Engine'关键词（可能为虚构数据）\n"
                f"建议修正: 删除此行或用真实数据替换"
            )
        else:
            suggestion['suggestion'] = (
                f"原文: \"{dp.context[:80]}...\"\n"
                f"问题: 综合置信度过低\n"
                f"建议修正: 增加来源标注或删除此数据点"
            )

        self.auto_fix_suggestions.append(suggestion)

    def _generate_source_suggestion(self, line: str, line_number: int, keyword: str):
        """为缺少来源的关键数据生成建议（NEW）"""
        suggestion = {
            'line': line_number,
            'issue': f"关键指标'{keyword}'缺少来源",
            'original': line.strip()[:100],
            'suggestion': (
                f"检测到关键指标: {keyword}\n"
                f"原文: \"{line.strip()[:80]}...\"\n"
                f"建议修正: 添加Tier 1来源（SEC文件/财报）\n"
                f"示例格式:\n"
                f"  - \"{line.strip()[:50]}...\" [VERIFIED] (来源: 10-Q Q4 2025, p.XX)\n"
                f"  - \"{line.strip()[:50]}...\" [ESTIMATED] (基于Bloomberg数据)"
            ),
            'severity': 'HIGH'
        }
        self.auto_fix_suggestions.append(suggestion)

    def _calculate_quality_score_v2(self, report_data: Dict) -> Tuple[float, str]:
        """
        质量评分算法v2.0（NEW）

        质量评分 = (
            可验证数据占比 × 40 +
            数据来源标注率 × 30 +
            时效性得分 × 15 +
            逻辑完整性 × 10 +
            免责声明 × 5
        )
        """
        total = report_data['total_data_points']
        if total == 0:
            return 0.0, 'F'

        # 1. 可验证数据占比 (40分)
        verifiable = report_data['verified_count'] + report_data['estimated_count']
        verifiable_ratio = verifiable / total
        verifiable_score = verifiable_ratio * 40

        # 2. 数据来源标注率 (30分)
        tier1 = report_data['source_tier1_count']
        tier2 = report_data['source_tier2_count']
        tier3 = report_data['source_tier3_count']
        source_ratio = (tier1 + tier2) / total  # Tier 3不计入
        source_score = source_ratio * 30

        # 3. 时效性得分 (15分)
        # 计算有时间戳的数据占比
        timestamped = sum(1 for dp in self.data_points if dp.timestamp != 'Unknown')
        timeliness_ratio = timestamped / total if total > 0 else 0
        timeliness_score = timeliness_ratio * 15

        # 4. 逻辑完整性 (10分)
        # 检查是否有严重问题
        serious_issues = len([i for i in self.issues if '❌' in i])
        logic_score = max(0, 10 - serious_issues * 2)

        # 5. 免责声明 (5分)
        disclaimer_score = 5 if report_data['has_disclaimer'] else 0

        # 总分
        total_score = (
            verifiable_score +
            source_score +
            timeliness_score +
            logic_score +
            disclaimer_score
        )

        # 评级
        if total_score >= 90:
            grade = 'A+'
        elif total_score >= 70:
            grade = 'B'
        elif total_score >= 50:
            grade = 'C'
        else:
            grade = 'F'

        return round(total_score, 2), grade

    def _generate_report_v2(self, file_path: str, has_disclaimer: bool) -> QualityReport:
        """生成质量报告v2.0（NEW）"""
        # 统计各类数据
        verified = sum(1 for dp in self.data_points if dp.label == 'VERIFIED')
        estimated = sum(1 for dp in self.data_points if dp.label == 'ESTIMATED')
        sample = sum(1 for dp in self.data_points if dp.label == 'SAMPLE')
        unverified = sum(1 for dp in self.data_points
                        if dp.label in ['UNVERIFIED', 'UNLABELED'])

        # 统计来源分层
        tier1 = sum(1 for dp in self.data_points if dp.source_tier == 'Tier 1')
        tier2 = sum(1 for dp in self.data_points if dp.source_tier == 'Tier 2')
        tier3 = sum(1 for dp in self.data_points if dp.source_tier == 'Tier 3')

        total = len(self.data_points)

        # 计算各项比率
        verifiable_ratio = (verified + estimated) / total if total > 0 else 0
        source_annotation_ratio = (tier1 + tier2 + tier3) / total if total > 0 else 0

        # 时效性评分
        recent_data = sum(1 for dp in self.data_points
                         if dp.timestamp != 'Unknown' and
                         self._is_recent(dp.timestamp))
        timeliness_score = (recent_data / total * 100) if total > 0 else 0

        # 逻辑完整性评分
        serious_issues = len([i for i in self.issues if '❌' in i])
        logic_score = max(0, 100 - serious_issues * 10)

        # 准备数据用于质量评分
        report_data = {
            'total_data_points': total,
            'verified_count': verified,
            'estimated_count': estimated,
            'source_tier1_count': tier1,
            'source_tier2_count': tier2,
            'source_tier3_count': tier3,
            'has_disclaimer': has_disclaimer
        }

        # 计算质量分数v2.0
        quality_score, quality_grade = self._calculate_quality_score_v2(report_data)

        # 生成建议
        self._generate_recommendations_v2(
            quality_score, quality_grade, verifiable_ratio,
            source_annotation_ratio, tier3, total, has_disclaimer
        )

        report = QualityReport(
            file_name=os.path.basename(file_path),
            file_path=file_path,
            scan_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            total_data_points=total,
            verified_count=verified,
            estimated_count=estimated,
            sample_count=sample,
            unverified_count=unverified,
            source_tier1_count=tier1,
            source_tier2_count=tier2,
            source_tier3_count=tier3,
            quality_score=quality_score,
            quality_grade=quality_grade,
            verifiable_data_ratio=round(verifiable_ratio * 100, 2),
            source_annotation_ratio=round(source_annotation_ratio * 100, 2),
            timeliness_score=round(timeliness_score, 2),
            logic_completeness_score=round(logic_score, 2),
            disclaimer_present=has_disclaimer,
            issues=self.issues,
            recommendations=self.recommendations,
            auto_fix_suggestions=self.auto_fix_suggestions
        )

        return report

    def _is_recent(self, timestamp: str) -> bool:
        """判断数据是否为近期（6个月内）"""
        try:
            if 'Q' in timestamp:
                year, quarter = timestamp.split('-Q')
                data_date = datetime(int(year), int(quarter)*3, 1)
            elif len(timestamp) == 4:
                data_date = datetime(int(timestamp), 1, 1)
            else:
                data_date = datetime.strptime(timestamp, '%Y-%m-%d')

            days_old = (datetime.now() - data_date).days
            return days_old < 180
        except:
            return False

    def _generate_recommendations_v2(self, quality_score: float, grade: str,
                                    verifiable_ratio: float,
                                    source_ratio: float,
                                    tier3_count: int, total: int, has_disclaimer: bool):
        """生成改进建议v2.0（NEW）"""
        # 总体评价
        if grade == 'F':
            self.recommendations.append(
                f"🔴 质量评分: {quality_score}/100 (F级 - 不合格)\n"
                "   建议: 全面修订数据来源，删除所有不可验证数据"
            )
        elif grade == 'C':
            self.recommendations.append(
                f"🟡 质量评分: {quality_score}/100 (C级 - 需大修)\n"
                "   建议: 补充数据来源标注，替换低质量数据"
            )
        elif grade == 'B':
            self.recommendations.append(
                f"🟢 质量评分: {quality_score}/100 (B级 - 可用)\n"
                "   建议: 小幅优化数据来源，可考虑发布"
            )
        else:  # A+
            self.recommendations.append(
                f"✅ 质量评分: {quality_score}/100 (A+级 - 发布级)\n"
                "   建议: 数据质量优秀，达到发布标准"
            )

        # 可验证数据比例
        if verifiable_ratio < 0.3:
            self.recommendations.append(
                f"❌ 可验证数据过少 ({verifiable_ratio*100:.1f}%)\n"
                "   建议: 至少30%数据应标注为[VERIFIED]或[ESTIMATED]"
            )

        # 来源标注比例
        if source_ratio < 0.5:
            self.recommendations.append(
                f"⚠️ 数据来源标注不足 ({source_ratio*100:.1f}%)\n"
                "   建议: 至少50%数据应标注Tier 1或Tier 2来源"
            )

        # Tier 3来源过多
        if tier3_count > total * 0.1:
            self.recommendations.append(
                f"🔴 Tier 3低质量来源过多 ({tier3_count}/{total})\n"
                "   建议: 用Tier 1(SEC/财报)或Tier 2(Bloomberg)来源替换"
            )

        # 时效性
        if self.data_points:
            old_data = sum(1 for dp in self.data_points
                          if dp.timestamp != 'Unknown' and
                          not self._is_recent(dp.timestamp))
            if old_data > total * 0.3:
                self.recommendations.append(
                    f"⚠️ 过期数据较多 ({old_data}/{total})\n"
                    "   建议: 更新为最新季度/年度数据"
                )

        # 免责声明
        if not has_disclaimer:
            self.recommendations.append(
                "⚠️ 缺少免责声明\n"
                "   建议: 在文档末尾添加免责声明（法律合规要求）"
            )

    def print_report_v2(self, report: QualityReport):
        """打印报告v2.0（NEW）"""
        print(f"\n{'='*80}")
        print(f"📊 数据质量报告v2.0: {report.file_name}")
        print(f"{'='*80}")
        print(f"扫描时间: {report.scan_time}")
        print(f"文件路径: {report.file_path}")
        print(f"{'='*80}\n")

        # 质量评分（突出显示）
        print("🎯 质量评分v2.0")
        print(f"  总分: {report.quality_score}/100")
        print(f"  评级: {report.quality_grade}")

        if report.quality_grade == 'A+':
            status = "🟢 发布级 (90-100分)"
        elif report.quality_grade == 'B':
            status = "🟡 可用级 (70-89分)"
        elif report.quality_grade == 'C':
            status = "🟠 需修订 (50-69分)"
        else:
            status = "🔴 不合格 (<50分)"
        print(f"  状态: {status}\n")

        # 评分明细
        print("📈 评分明细")
        print(f"  可验证数据占比: {report.verifiable_data_ratio:.1f}% (权重40%)")
        print(f"  来源标注率: {report.source_annotation_ratio:.1f}% (权重30%)")
        print(f"  时效性得分: {report.timeliness_score:.1f}% (权重15%)")
        print(f"  逻辑完整性: {report.logic_completeness_score:.1f}% (权重10%)")
        print(f"  免责声明: {'✅ 有' if report.disclaimer_present else '❌ 无'} (权重5%)\n")

        # 数据统计
        print("📊 数据统计")
        print(f"  总数据点: {report.total_data_points}")
        print(f"  ✅ 可验证 (VERIFIED): {report.verified_count} "
              f"({report.verified_count/report.total_data_points*100:.1f}%)")
        print(f"  📊 估算 (ESTIMATED): {report.estimated_count} "
              f"({report.estimated_count/report.total_data_points*100:.1f}%)")
        print(f"  ⚠️ 示例 (SAMPLE): {report.sample_count} "
              f"({report.sample_count/report.total_data_points*100:.1f}%)")
        print(f"  ❌ 未验证: {report.unverified_count} "
              f"({report.unverified_count/report.total_data_points*100:.1f}%)\n")

        # 来源分层（NEW）
        print("🔍 数据来源分层")
        print(f"  Tier 1 (官方/SEC): {report.source_tier1_count} "
              f"({report.source_tier1_count/report.total_data_points*100:.1f}%)")
        print(f"  Tier 2 (知名机构): {report.source_tier2_count} "
              f"({report.source_tier2_count/report.total_data_points*100:.1f}%)")
        print(f"  Tier 3 (社交媒体): {report.source_tier3_count} "
              f"({report.source_tier3_count/report.total_data_points*100:.1f}%)")
        print(f"  无来源: {report.total_data_points - report.source_tier1_count - report.source_tier2_count - report.source_tier3_count}\n")

        # 主要问题
        if report.issues:
            print(f"⚠️ 主要问题 ({len(report.issues)}个)")
            for i, issue in enumerate(report.issues[:10], 1):
                print(f"  {i}. {issue}")
            if len(report.issues) > 10:
                print(f"  ... 还有{len(report.issues)-10}个问题\n")

        # 改进建议
        if report.recommendations:
            print("💡 改进建议")
            for i, rec in enumerate(report.recommendations, 1):
                print(f"  {i}. {rec}\n")

        # 自动修正建议（NEW）
        if report.auto_fix_suggestions:
            print(f"🔧 自动修正建议 ({len(report.auto_fix_suggestions)}个)")
            high_priority = [s for s in report.auto_fix_suggestions if s['severity'] == 'HIGH']
            if high_priority:
                print(f"  高优先级: {len(high_priority)}个")
                for i, sug in enumerate(high_priority[:5], 1):
                    print(f"\n  [{i}] 行{sug['line']}: {sug['issue']}")
                    print(f"      {sug['suggestion'][:200]}...")
            else:
                print("  暂无高优先级问题\n")

        # 低置信度数据
        low_confidence = sorted(
            [dp for dp in self.data_points if dp.confidence < 40],
            key=lambda x: x.confidence
        )
        if low_confidence:
            print(f"\n🔴 低置信度数据 (置信度<40%, {len(low_confidence)}个)")
            for i, dp in enumerate(low_confidence[:5], 1):
                print(f"  {i}. 行{dp.line_number} [{dp.label}] [{dp.source_tier}] "
                      f"置信度{dp.confidence}%")
                print(f"     {dp.context[:80]}")

        print(f"\n{'='*80}\n")

    def export_json_v2(self, report: QualityReport, output_path: str):
        """导出JSON报告v2.0"""
        data = {
            'report_version': 'v2.0',
            'file_name': report.file_name,
            'file_path': report.file_path,
            'scan_time': report.scan_time,
            'quality_summary': {
                'quality_score': report.quality_score,
                'quality_grade': report.quality_grade,
                'verifiable_data_ratio': report.verifiable_data_ratio,
                'source_annotation_ratio': report.source_annotation_ratio,
                'timeliness_score': report.timeliness_score,
                'logic_completeness_score': report.logic_completeness_score,
                'disclaimer_present': report.disclaimer_present
            },
            'data_statistics': {
                'total_data_points': report.total_data_points,
                'verified_count': report.verified_count,
                'estimated_count': report.estimated_count,
                'sample_count': report.sample_count,
                'unverified_count': report.unverified_count
            },
            'source_tier_statistics': {
                'tier1_count': report.source_tier1_count,
                'tier2_count': report.source_tier2_count,
                'tier3_count': report.source_tier3_count
            },
            'data_points': [
                {
                    'line': dp.line_number,
                    'value': dp.value,
                    'type': dp.data_type,
                    'label': dp.label,
                    'source_tier': dp.source_tier,
                    'confidence': dp.confidence,
                    'timestamp': dp.timestamp,
                    'context': dp.context[:100]
                }
                for dp in self.data_points
            ],
            'issues': report.issues,
            'recommendations': report.recommendations,
            'auto_fix_suggestions': report.auto_fix_suggestions
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✅ JSON报告已导出: {output_path}")

    def update_dashboard(self, dashboard_path: str):
        """更新质量仪表盘（NEW）"""
        if not self.all_reports:
            return

        # 计算统计数据
        total_files = len(self.all_reports)
        avg_score = sum(r.quality_score for r in self.all_reports) / total_files

        grade_counts = defaultdict(int)
        for r in self.all_reports:
            grade_counts[r.quality_grade] += 1

        alerts = [r for r in self.all_reports if r.quality_score < 50]

        # 生成仪表盘内容
        dashboard_content = f"""# 数据质量实时监控仪表盘 v2.0

最后更新: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 📊 总体质量概览

- **平均评分**: {avg_score:.1f}/100
- **总文件数**: {total_files}
- **告警数量**: {len(alerts)} 个文件不合格 (<50分)

### 评级分布
- A+ (90-100分): {grade_counts['A+']} 个
- B (70-89分): {grade_counts['B']} 个
- C (50-69分): {grade_counts['C']} 个
- F (<50分): {grade_counts['F']} 个

---

## 📈 各文件质量评分

| 文件 | 评分 | 评级 | 状态 | 可验证率 | 来源标注率 | 主要问题 |
|------|------|------|------|----------|------------|----------|
"""

        for report in sorted(self.all_reports, key=lambda x: x.quality_score, reverse=True):
            status = "✅ 通过" if report.quality_score >= 70 else (
                "⚠️ 需修正" if report.quality_score >= 50 else "❌ 不合格"
            )
            main_issue = report.issues[0][:50] if report.issues else "-"

            dashboard_content += f"| {report.file_name} | {report.quality_score}/100 | {report.quality_grade} | {status} | {report.verifiable_data_ratio:.1f}% | {report.source_annotation_ratio:.1f}% | {main_issue} |\n"

        # 添加告警区域
        if alerts:
            dashboard_content += f"\n---\n\n## 🚨 质量告警 ({len(alerts)}个)\n\n"
            for alert in alerts:
                dashboard_content += f"### ❌ {alert.file_name}\n"
                dashboard_content += f"- 评分: {alert.quality_score}/100 (F级)\n"
                dashboard_content += f"- 可验证数据: {alert.verifiable_data_ratio:.1f}%\n"
                dashboard_content += f"- 来源标注: {alert.source_annotation_ratio:.1f}%\n"
                dashboard_content += f"- 主要问题:\n"
                for issue in alert.issues[:3]:
                    dashboard_content += f"  - {issue}\n"
                dashboard_content += "\n"

        # 数据质量趋势
        total_points = sum(r.total_data_points for r in self.all_reports)
        total_verified = sum(r.verified_count for r in self.all_reports)
        total_tier1 = sum(r.source_tier1_count for r in self.all_reports)
        total_tier2 = sum(r.source_tier2_count for r in self.all_reports)

        dashboard_content += f"""---

## 📉 数据质量趋势

- **总数据点**: {total_points}
- **可验证数据**: {total_verified} ({total_verified/total_points*100:.1f}%)
- **Tier 1来源**: {total_tier1} ({total_tier1/total_points*100:.1f}%)
- **Tier 2来源**: {total_tier2} ({total_tier2/total_points*100:.1f}%)

---

## 🎯 质量改进建议

"""

        # 汇总建议
        if avg_score < 50:
            dashboard_content += "- 🔴 **紧急**: 整体数据质量不合格，建议暂停发布，全面审计所有文件\n"
        elif avg_score < 70:
            dashboard_content += "- 🟡 **注意**: 整体数据质量中等，建议优先修正F级和C级文件\n"
        else:
            dashboard_content += "- 🟢 **良好**: 整体数据质量达标，继续保持\n"

        if len(alerts) > 0:
            dashboard_content += f"- ⚠️ 请优先处理{len(alerts)}个不合格文件\n"

        dashboard_content += f"- 💡 目标: 所有文件达到B级(70分)以上\n"

        # 写入文件
        with open(dashboard_path, 'w', encoding='utf-8') as f:
            f.write(dashboard_content)

        print(f"✅ 仪表盘已更新: {dashboard_path}")

    def export_fix_suggestions(self, output_path: str):
        """导出修正建议文档（NEW）"""
        if not self.all_reports:
            return

        content = f"""# 自动修正建议汇总

生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

本文档包含所有扫描文件的自动修正建议，按严重程度排序。

---

"""

        # 收集所有建议并排序
        all_suggestions = []
        for report in self.all_reports:
            for sug in report.auto_fix_suggestions:
                sug['file'] = report.file_name
                all_suggestions.append(sug)

        # 按严重程度排序
        all_suggestions.sort(key=lambda x: (
            0 if x['severity'] == 'HIGH' else 1,
            x.get('line', 0)
        ))

        # 分组输出
        high_priority = [s for s in all_suggestions if s['severity'] == 'HIGH']
        medium_priority = [s for s in all_suggestions if s['severity'] == 'MEDIUM']

        content += f"## 🔴 高优先级问题 ({len(high_priority)}个)\n\n"
        for i, sug in enumerate(high_priority, 1):
            content += f"### [{i}] {sug['file']} - 行{sug['line']}\n\n"
            content += f"**问题**: {sug['issue']}\n\n"
            content += f"**修正建议**:\n```\n{sug['suggestion']}\n```\n\n"
            content += "---\n\n"

        content += f"## 🟡 中优先级问题 ({len(medium_priority)}个)\n\n"
        for i, sug in enumerate(medium_priority, 1):
            content += f"### [{i}] {sug['file']} - 行{sug['line']}\n\n"
            content += f"**问题**: {sug['issue']}\n\n"
            content += f"**修正建议**:\n```\n{sug['suggestion']}\n```\n\n"
            content += "---\n\n"

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ 修正建议已导出: {output_path}")


class FileChangeHandler(FileSystemEventHandler):
    """文件变化监听器（NEW）"""

    def __init__(self, monitor: DataIntegrityMonitorV2, dashboard_path: str):
        self.monitor = monitor
        self.dashboard_path = dashboard_path
        self.last_scan = {}

    def on_modified(self, event):
        if event.is_directory:
            return

        file_path = event.src_path
        if not file_path.endswith('.md'):
            return

        # 避免重复扫描（1分钟内）
        now = time.time()
        if file_path in self.last_scan:
            if now - self.last_scan[file_path] < 60:
                return

        self.last_scan[file_path] = now

        print(f"\n🔔 检测到文件变化: {file_path}")
        self.scan_and_update(file_path)

    def on_created(self, event):
        if event.is_directory:
            return

        file_path = event.src_path
        if not file_path.endswith('.md'):
            return

        print(f"\n🔔 检测到新文件: {file_path}")
        time.sleep(1)  # 等待文件写入完成
        self.scan_and_update(file_path)

    def scan_and_update(self, file_path: str):
        """扫描文件并更新仪表盘"""
        try:
            report = self.monitor.scan_file(file_path)
            if report:
                self.monitor.print_report_v2(report)

                # 更新报告列表
                # 移除旧报告（同文件）
                self.monitor.all_reports = [
                    r for r in self.monitor.all_reports
                    if r.file_path != file_path
                ]
                self.monitor.all_reports.append(report)

                # 导出JSON
                json_path = file_path.replace('.md', '_quality_report_v2.json')
                self.monitor.export_json_v2(report, json_path)

                # 更新仪表盘
                self.monitor.update_dashboard(self.dashboard_path)

                # 告警
                if report.quality_score < 50:
                    print(f"\n🚨 【质量告警】 {report.file_name} 评分过低: {report.quality_score}/100")
                    print(f"   建议: 立即修正或删除此文件\n")

        except Exception as e:
            print(f"❌ 扫描失败: {e}")


def watch_directory(watch_path: str, dashboard_path: str):
    """实时监控目录（NEW）"""
    if not WATCHDOG_AVAILABLE:
        print("❌ watchdog未安装，无法使用监控功能")
        print("安装命令: pip install watchdog")
        return

    monitor = DataIntegrityMonitorV2()

    # 初始扫描
    print(f"📁 开始初始扫描: {watch_path}")
    md_files = list(Path(watch_path).glob('*.md'))

    for md_file in md_files:
        try:
            report = monitor.scan_file(str(md_file))
            if report:
                monitor.all_reports.append(report)
                # 导出JSON
                json_path = str(md_file).replace('.md', '_quality_report_v2.json')
                monitor.export_json_v2(report, json_path)
        except Exception as e:
            print(f"⚠️ 跳过文件 {md_file}: {e}")

    # 生成初始仪表盘
    monitor.update_dashboard(dashboard_path)

    # 导出修正建议
    suggestions_path = os.path.join(
        os.path.dirname(dashboard_path),
        'Auto_Fix_Suggestions.md'
    )
    monitor.export_fix_suggestions(suggestions_path)

    print(f"\n✅ 初始扫描完成: {len(monitor.all_reports)} 个文件")
    print(f"✅ 仪表盘: {dashboard_path}")
    print(f"✅ 修正建议: {suggestions_path}")

    # 开始实时监控
    event_handler = FileChangeHandler(monitor, dashboard_path)
    observer = Observer()
    observer.schedule(event_handler, watch_path, recursive=False)
    observer.start()

    print(f"\n👀 开始实时监控: {watch_path}")
    print("   (按 Ctrl+C 停止)\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n🛑 监控已停止")

    observer.join()


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("""
数据完整性监测工具 v2.0
========================

使用方法:
  1. 单文件扫描:
     python data_integrity_monitor_v2.0.py <文件路径>

  2. 实时监控模式:
     python data_integrity_monitor_v2.0.py --watch
     python data_integrity_monitor_v2.0.py --watch --path <目录路径>

  3. 监控+自动更新仪表盘:
     python data_integrity_monitor_v2.0.py --watch --auto-update-dashboard

示例:
  python data_integrity_monitor_v2.0.py Tesla_Report.md
  python data_integrity_monitor_v2.0.py --watch
  python data_integrity_monitor_v2.0.py --watch --path ./IntelligenceEngine_v10

新功能 (v2.0):
  ✅ 实时文件监控
  ✅ 质量评分算法v2.0 (A+/B/C/F评级)
  ✅ 数据来源分层 (Tier 1/2/3)
  ✅ 自动修正建议生成
  ✅ 实时质量仪表盘
  ✅ 质量<50分自动告警
  ✅ 数据时效性评分
""")
        sys.exit(1)

    # 监控模式
    if '--watch' in sys.argv:
        # 确定监控路径
        if '--path' in sys.argv:
            path_index = sys.argv.index('--path') + 1
            watch_path = sys.argv[path_index] if path_index < len(sys.argv) else '.'
        else:
            watch_path = '/Users/milton/投资大师'

        # 仪表盘路径
        dashboard_path = os.path.join(watch_path, 'Quality_Dashboard.md')

        watch_directory(watch_path, dashboard_path)

    # 单文件模式
    else:
        file_path = sys.argv[1]

        if not os.path.exists(file_path):
            print(f"❌ 错误: 文件不存在 {file_path}")
            sys.exit(1)

        monitor = DataIntegrityMonitorV2()
        report = monitor.scan_file(file_path)

        if report:
            monitor.print_report_v2(report)

            # 导出JSON
            json_path = file_path.replace('.md', '_quality_report_v2.json')
            monitor.export_json_v2(report, json_path)

            # 如果评分过低，生成修正建议
            if report.quality_score < 70:
                fix_path = file_path.replace('.md', '_fix_suggestions.md')
                monitor.all_reports = [report]
                monitor.export_fix_suggestions(fix_path)
                print(f"✅ 修正建议已导出: {fix_path}")


if __name__ == '__main__':
    main()
