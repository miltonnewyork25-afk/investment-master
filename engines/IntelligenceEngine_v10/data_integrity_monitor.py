#!/usr/bin/env python3
"""
数据真实性监测工具
Data Integrity Monitor for Investment Research Reports

功能:
1. 扫描Markdown报告中的数字
2. 检查数据来源标注
3. 验证数据标注符号(✅📊🎯⚠️❌)
4. 生成数据质量评分报告
5. 标记可疑数据

使用方法:
python data_integrity_monitor.py <报告文件路径>
python data_integrity_monitor.py --dir <目录路径>  # 批量扫描
"""

import re
import sys
import os
from pathlib import Path
from typing import Dict, List, Tuple
from dataclasses import dataclass
from datetime import datetime
import json


@dataclass
class DataPoint:
    """数据点对象"""
    value: str  # 数据值
    context: str  # 上下文（所在句子）
    line_number: int  # 行号
    data_type: str  # 数据类型（数字/百分比/金额）
    has_source: bool  # 是否有来源标注
    label: str  # 标注类型(VERIFIED/ESTIMATED/SAMPLE/等)
    confidence: int  # 置信度(0-100)


@dataclass
class QualityReport:
    """数据质量报告"""
    file_name: str
    total_data_points: int
    verified_count: int
    estimated_count: int
    sample_count: int
    unverified_count: int
    quality_score: float
    issues: List[str]
    recommendations: List[str]


class DataIntegrityMonitor:
    """数据完整性监测器"""

    # 数据模式（正则表达式）
    PATTERNS = {
        'percentage': r'\b\d+\.?\d*%',  # 百分比: 18.7%, 100%
        'number_with_unit': r'\b\d+\.?\d*[KMBT](?:亿|万|千)?',  # 带单位数字: 1.2B, 500万
        'currency': r'\$\d+(?:,\d{3})*(?:\.\d+)?[KMBT]?',  # 货币: $450, $1.2B
        'plain_number': r'\b\d{1,3}(?:,\d{3})+(?:\.\d+)?',  # 普通数字: 1,234,567
        'decimal': r'\b\d+\.\d+(?!%)',  # 小数: 18.7 (不包括百分比)
        'date': r'\b20\d{2}[-/]\d{1,2}[-/]\d{1,2}\b',  # 日期: 2026-01-25
        'time': r'\b\d{1,2}:\d{2}(?::\d{2})?\s?(?:UTC|EST|PST)?\b',  # 时间: 08:00 UTC
    }

    # 标注符号
    LABELS = {
        '✅': 'VERIFIED',
        '📊': 'ESTIMATED',
        '🎯': 'MODELED',
        '⚠️': 'SAMPLE',
        '❌': 'UNVERIFIED'
    }

    # 可疑关键词（表明数据可能为虚构）
    SUSPICIOUS_KEYWORDS = [
        'Engine 1', 'Engine 2', 'Engine 3', 'Engine 4', 'Engine 5', 'Engine 6',
        '实时监控', 'real-time monitoring',
        '异常大单', 'unusual activity',
        '内部消息', 'inside information',
        '独家获悉', 'exclusively learned'
    ]

    # 需要来源的关键数据类型
    REQUIRE_SOURCE = [
        '毛利率', '交付量', '市值', '营收', '利润',
        'margin', 'delivery', 'revenue', 'profit', 'market cap'
    ]

    def __init__(self):
        self.data_points: List[DataPoint] = []
        self.issues: List[str] = []
        self.recommendations: List[str] = []

    def scan_file(self, file_path: str) -> QualityReport:
        """扫描单个文件"""
        print(f"\n{'='*80}")
        print(f"扫描文件: {file_path}")
        print(f"{'='*80}\n")

        self.data_points = []
        self.issues = []
        self.recommendations = []

        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # 逐行扫描
        for i, line in enumerate(lines, 1):
            self._scan_line(line, i)

        # 生成报告
        report = self._generate_report(file_path)
        return report

    def _scan_line(self, line: str, line_number: int):
        """扫描单行"""
        # 1. 检测数字
        for pattern_name, pattern in self.PATTERNS.items():
            matches = re.finditer(pattern, line)
            for match in matches:
                value = match.group()
                context = line.strip()

                # 判断标注类型
                label = self._detect_label(line)

                # 判断是否有来源
                has_source = self._has_source(line, context)

                # 计算置信度
                confidence = self._calculate_confidence(value, context, label, has_source)

                data_point = DataPoint(
                    value=value,
                    context=context,
                    line_number=line_number,
                    data_type=pattern_name,
                    has_source=has_source,
                    label=label,
                    confidence=confidence
                )

                self.data_points.append(data_point)

        # 2. 检测可疑关键词
        for keyword in self.SUSPICIOUS_KEYWORDS:
            if keyword in line:
                self.issues.append(
                    f"⚠️ 行{line_number}: 发现可疑关键词 '{keyword}' - {line.strip()[:80]}"
                )

        # 3. 检测缺少来源的关键数据
        for keyword in self.REQUIRE_SOURCE:
            if keyword in line.lower() and not self._has_source(line, line):
                self.issues.append(
                    f"❌ 行{line_number}: '{keyword}' 数据缺少来源标注 - {line.strip()[:80]}"
                )

    def _detect_label(self, line: str) -> str:
        """检测数据标注类型"""
        for emoji, label in self.LABELS.items():
            if emoji in line:
                return label

        # 检测文本标注
        if 'VERIFIED' in line or '来源:' in line or 'Source:' in line:
            return 'VERIFIED'
        elif 'ESTIMATED' in line or '估算' in line or '预测' in line:
            return 'ESTIMATED'
        elif 'SAMPLE' in line or 'EXAMPLE' in line or '示例' in line or '演示' in line:
            return 'SAMPLE'
        elif 'Engine' in line:
            return 'UNVERIFIED'

        return 'UNLABELED'

    def _has_source(self, line: str, context: str) -> bool:
        """检测是否有来源标注"""
        source_indicators = [
            '来源:', 'Source:', '数据源:', 'Data source:',
            '(来自', '(from', '根据', 'according to',
            'SEC', 'EDGAR', '10-K', '10-Q', '财报', 'earnings',
            'Bloomberg', 'Reuters', 'Yahoo Finance',
            'IR.tesla.com', 'investor relations'
        ]

        for indicator in source_indicators:
            if indicator in line or indicator in context:
                return True

        return False

    def _calculate_confidence(self, value: str, context: str,
                             label: str, has_source: bool) -> int:
        """计算数据置信度(0-100)"""
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

        # 有来源加分
        if has_source:
            score += 20
        else:
            score -= 15

        # Engine系统数据严重扣分
        if 'Engine' in context:
            score -= 50

        # 财报数据加分
        if any(word in context for word in ['10-K', '10-Q', '财报', 'earnings report']):
            score += 15

        # 限制范围
        return max(0, min(100, score))

    def _generate_report(self, file_path: str) -> QualityReport:
        """生成质量报告"""
        # 统计各类数据
        verified = sum(1 for dp in self.data_points if dp.label == 'VERIFIED')
        estimated = sum(1 for dp in self.data_points if dp.label == 'ESTIMATED')
        sample = sum(1 for dp in self.data_points if dp.label == 'SAMPLE')
        unverified = sum(1 for dp in self.data_points
                        if dp.label in ['UNVERIFIED', 'UNLABELED'])

        total = len(self.data_points)

        # 计算质量分数(0-100)
        if total == 0:
            quality_score = 0
        else:
            # 加权计算
            weighted_sum = (
                verified * 100 +
                estimated * 60 +
                sample * 20 +
                unverified * 0
            )
            quality_score = weighted_sum / total

        # 生成建议
        if quality_score < 40:
            self.recommendations.append("🔴 质量评分过低，建议全面修订数据来源")
        elif quality_score < 60:
            self.recommendations.append("🟡 质量评分中等，需要补充数据来源标注")
        else:
            self.recommendations.append("🟢 质量评分良好，继续保持数据透明度")

        if unverified > total * 0.3:
            self.recommendations.append(
                f"❌ 未验证数据过多({unverified}/{total} = {unverified/total*100:.1f}%)，"
                "建议删除或标注为'示例'"
            )

        if verified < total * 0.2:
            self.recommendations.append(
                f"⚠️ 可验证数据过少({verified}/{total} = {verified/total*100:.1f}%)，"
                "建议增加官方数据来源"
            )

        # 检测高风险数据
        high_risk_data = [dp for dp in self.data_points if dp.confidence < 30]
        if high_risk_data:
            self.recommendations.append(
                f"🔴 发现{len(high_risk_data)}个高风险数据点(置信度<30%)，"
                "建议重点审查"
            )

        return QualityReport(
            file_name=os.path.basename(file_path),
            total_data_points=total,
            verified_count=verified,
            estimated_count=estimated,
            sample_count=sample,
            unverified_count=unverified,
            quality_score=quality_score,
            issues=self.issues,
            recommendations=self.recommendations
        )

    def print_report(self, report: QualityReport):
        """打印报告"""
        print(f"\n{'='*80}")
        print(f"数据质量报告: {report.file_name}")
        print(f"{'='*80}\n")

        # 数据统计
        print("📊 数据统计")
        print(f"  总数据点: {report.total_data_points}")
        print(f"  ✅ 可验证: {report.verified_count} "
              f"({report.verified_count/report.total_data_points*100:.1f}%)")
        print(f"  📊 估算: {report.estimated_count} "
              f"({report.estimated_count/report.total_data_points*100:.1f}%)")
        print(f"  ⚠️ 示例: {report.sample_count} "
              f"({report.sample_count/report.total_data_points*100:.1f}%)")
        print(f"  ❌ 未验证: {report.unverified_count} "
              f"({report.unverified_count/report.total_data_points*100:.1f}%)")

        # 质量评分
        print(f"\n🎯 质量评分: {report.quality_score:.1f}/100")
        if report.quality_score >= 80:
            rating = "🟢 优秀"
        elif report.quality_score >= 60:
            rating = "🟡 良好"
        elif report.quality_score >= 40:
            rating = "🟠 及格"
        else:
            rating = "🔴 不合格"
        print(f"   评级: {rating}")

        # 主要问题
        if report.issues:
            print(f"\n⚠️ 主要问题 ({len(report.issues)}个)")
            for i, issue in enumerate(report.issues[:10], 1):  # 最多显示10个
                print(f"  {i}. {issue}")
            if len(report.issues) > 10:
                print(f"  ... 还有{len(report.issues)-10}个问题（见完整报告）")

        # 建议
        if report.recommendations:
            print(f"\n💡 改进建议")
            for i, rec in enumerate(report.recommendations, 1):
                print(f"  {i}. {rec}")

        # 低置信度数据示例
        low_confidence = sorted(
            [dp for dp in self.data_points if dp.confidence < 40],
            key=lambda x: x.confidence
        )
        if low_confidence:
            print(f"\n🔴 低置信度数据示例 (置信度<40%)")
            for i, dp in enumerate(low_confidence[:5], 1):
                print(f"  {i}. 行{dp.line_number} [{dp.label}] "
                      f"置信度{dp.confidence}% - {dp.context[:80]}")

        print(f"\n{'='*80}\n")

    def export_json(self, report: QualityReport, output_path: str):
        """导出JSON报告"""
        data = {
            'file_name': report.file_name,
            'scan_time': datetime.now().isoformat(),
            'summary': {
                'total_data_points': report.total_data_points,
                'verified_count': report.verified_count,
                'estimated_count': report.estimated_count,
                'sample_count': report.sample_count,
                'unverified_count': report.unverified_count,
                'quality_score': round(report.quality_score, 2)
            },
            'data_points': [
                {
                    'line': dp.line_number,
                    'value': dp.value,
                    'type': dp.data_type,
                    'label': dp.label,
                    'has_source': dp.has_source,
                    'confidence': dp.confidence,
                    'context': dp.context[:100]
                }
                for dp in self.data_points
            ],
            'issues': report.issues,
            'recommendations': report.recommendations
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✅ JSON报告已导出: {output_path}")


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("使用方法:")
        print("  python data_integrity_monitor.py <文件路径>")
        print("  python data_integrity_monitor.py --dir <目录路径>")
        print("\n示例:")
        print("  python data_integrity_monitor.py Tesla深度调研报告_v10.0_赚钱机会版.md")
        print("  python data_integrity_monitor.py --dir ./IntelligenceEngine_v10")
        sys.exit(1)

    monitor = DataIntegrityMonitor()

    # 目录扫描模式
    if sys.argv[1] == '--dir':
        if len(sys.argv) < 3:
            print("❌ 错误: 请指定目录路径")
            sys.exit(1)

        dir_path = sys.argv[2]
        md_files = list(Path(dir_path).glob('*.md'))

        if not md_files:
            print(f"❌ 错误: 目录 {dir_path} 中没有找到Markdown文件")
            sys.exit(1)

        print(f"📁 发现 {len(md_files)} 个Markdown文件")

        all_reports = []
        for md_file in md_files:
            report = monitor.scan_file(str(md_file))
            monitor.print_report(report)
            all_reports.append(report)

            # 导出单个文件的JSON报告
            json_path = str(md_file).replace('.md', '_quality_report.json')
            monitor.export_json(report, json_path)

        # 生成汇总报告
        print(f"\n{'='*80}")
        print("📊 汇总报告")
        print(f"{'='*80}\n")

        avg_score = sum(r.quality_score for r in all_reports) / len(all_reports)
        total_verified = sum(r.verified_count for r in all_reports)
        total_points = sum(r.total_data_points for r in all_reports)

        print(f"总文件数: {len(all_reports)}")
        print(f"平均质量分: {avg_score:.1f}/100")
        print(f"总数据点: {total_points}")
        print(f"可验证数据: {total_verified} ({total_verified/total_points*100:.1f}%)")

        if avg_score < 50:
            print("\n🔴 警告: 整体数据质量不合格，建议全面审计修正")
        elif avg_score < 70:
            print("\n🟡 提示: 整体数据质量中等，建议补充来源标注")
        else:
            print("\n🟢 良好: 整体数据质量达标")

    # 单文件扫描模式
    else:
        file_path = sys.argv[1]

        if not os.path.exists(file_path):
            print(f"❌ 错误: 文件不存在 {file_path}")
            sys.exit(1)

        report = monitor.scan_file(file_path)
        monitor.print_report(report)

        # 导出JSON报告
        json_path = file_path.replace('.md', '_quality_report.json')
        monitor.export_json(report, json_path)


if __name__ == '__main__':
    main()
