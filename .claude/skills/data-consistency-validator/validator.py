#!/usr/bin/env python3
"""
Data Consistency Validator v1.0
解决多数据源时间不一致和算术关系错误问题
"""

import json
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
import argparse

class DataConsistencyValidator:
    def __init__(self, ticker: str, tolerance: float = 0.02):
        self.ticker = ticker
        self.tolerance = tolerance
        self.inconsistencies = []
        self.recommendations = []

    def validate_market_cap_consistency(self, data_sources: Dict[str, Any]) -> List[Dict]:
        """验证市值数据一致性"""
        market_caps = {}
        inconsistencies = []

        # 提取市值相关数据
        for source, data in data_sources.items():
            if isinstance(data, list) and data:
                data = data[0]  # 取第一个元素

            if 'marketCap' in data or 'market_cap' in data:
                market_cap = data.get('marketCap') or data.get('market_cap')
                price = data.get('price', 0)
                shares = data.get('sharesOutstanding') or data.get('shares_outstanding', 0)

                market_caps[source] = {
                    'value': market_cap,
                    'price': price,
                    'shares': shares,
                    'timestamp': data.get('timestamp', data.get('date', 'unknown'))
                }

        # 算术验证
        for source, info in market_caps.items():
            if info['price'] and info['shares']:
                calculated_cap = info['price'] * info['shares']
                reported_cap = info['value']

                if reported_cap and abs(calculated_cap - reported_cap) / reported_cap > self.tolerance:
                    inconsistencies.append({
                        'source': source,
                        'type': 'arithmetic_error',
                        'calculated': calculated_cap,
                        'reported': reported_cap,
                        'deviation_pct': abs(calculated_cap - reported_cap) / reported_cap * 100,
                        'severity': 'CRITICAL' if abs(calculated_cap - reported_cap) / reported_cap > 0.1 else 'WARNING'
                    })

        # 跨源一致性检查
        market_cap_values = [(source, info['value']) for source, info in market_caps.items() if info['value']]
        if len(market_cap_values) > 1:
            base_source, base_value = market_cap_values[0]
            for source, value in market_cap_values[1:]:
                if abs(value - base_value) / base_value > self.tolerance:
                    inconsistencies.append({
                        'source': f"{base_source} vs {source}",
                        'type': 'cross_source_discrepancy',
                        'base_value': base_value,
                        'compare_value': value,
                        'deviation_pct': abs(value - base_value) / base_value * 100,
                        'severity': 'CRITICAL' if abs(value - base_value) / base_value > 0.1 else 'WARNING'
                    })

        return inconsistencies

    def validate_pe_calculation(self, data_sources: Dict[str, Any]) -> List[Dict]:
        """验证P/E计算一致性"""
        inconsistencies = []

        # 收集P/E相关数据
        market_cap = None
        net_income = None
        reported_pe = None

        for source, data in data_sources.items():
            if isinstance(data, list) and data:
                data = data[0]

            if 'marketCap' in data:
                market_cap = data['marketCap']
            if 'pe_ratio' in data or 'peRatio' in data:
                reported_pe = data.get('pe_ratio') or data.get('peRatio')
            if 'netIncome' in data:
                net_income = data['netIncome']

        # 计算验证
        if market_cap and net_income and net_income > 0:
            calculated_pe = market_cap / net_income

            if reported_pe and abs(calculated_pe - reported_pe) / reported_pe > 0.05:  # P/E容忍度5%
                inconsistencies.append({
                    'type': 'pe_calculation_error',
                    'calculated_pe': calculated_pe,
                    'reported_pe': reported_pe,
                    'market_cap': market_cap,
                    'net_income': net_income,
                    'deviation_pct': abs(calculated_pe - reported_pe) / reported_pe * 100,
                    'severity': 'WARNING'
                })

        return inconsistencies

    def check_data_freshness(self, data_sources: Dict[str, Any]) -> List[Dict]:
        """检查数据新鲜度"""
        issues = []
        today = datetime.now()

        for source, data in data_sources.items():
            if isinstance(data, list) and data:
                data = data[0]

            timestamp = data.get('timestamp') or data.get('date')
            if timestamp:
                try:
                    # 尝试解析时间戳
                    if isinstance(timestamp, (int, float)):
                        data_date = datetime.fromtimestamp(timestamp)
                    else:
                        data_date = datetime.strptime(timestamp, '%Y-%m-%d')

                    age_days = (today - data_date).days

                    if age_days > 1:  # 超过1个交易日
                        issues.append({
                            'source': source,
                            'type': 'stale_data',
                            'data_date': data_date.strftime('%Y-%m-%d'),
                            'age_days': age_days,
                            'severity': 'WARNING' if age_days < 7 else 'CRITICAL'
                        })

                except (ValueError, TypeError):
                    issues.append({
                        'source': source,
                        'type': 'invalid_timestamp',
                        'raw_timestamp': timestamp,
                        'severity': 'WARNING'
                    })

        return issues

    def recommend_baseline_data(self, data_sources: Dict[str, Any]) -> Dict[str, Any]:
        """推荐基准数据"""
        recommendations = {}

        # 数据源优先级: quote > profile > key-metrics
        priority_order = ['quote', 'profile', 'key-metrics', 'ratios']

        # 寻找最佳市值数据
        best_market_cap = None
        best_source = None

        for source_type in priority_order:
            if source_type in data_sources:
                data = data_sources[source_type]
                if isinstance(data, list) and data:
                    data = data[0]

                market_cap = data.get('marketCap') or data.get('market_cap')
                price = data.get('price')

                if market_cap and price:  # 有完整数据
                    best_market_cap = market_cap
                    best_source = source_type
                    break

        if best_market_cap and best_source:
            recommendations['market_cap'] = {
                'value': best_market_cap,
                'source': best_source,
                'reason': f'Most reliable source with complete data'
            }

        return recommendations

    def generate_report(self, validation_results: Dict[str, List]) -> str:
        """生成验证报告"""
        report = f"# Data Consistency Report: {self.ticker}\n"
        report += f"**Validation Time**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"

        # 统计结果
        total_issues = sum(len(issues) for issues in validation_results.values())
        critical_issues = sum(1 for issues in validation_results.values()
                            for issue in issues if issue.get('severity') == 'CRITICAL')

        if total_issues == 0:
            report += "## 🟢 ALL VALIDATIONS PASSED\n"
            report += "No data consistency issues detected.\n\n"
        else:
            report += f"## 🔴 ISSUES DETECTED: {total_issues} total ({critical_issues} critical)\n\n"

        # 详细问题列表
        for validation_type, issues in validation_results.items():
            if issues:
                report += f"### {validation_type.replace('_', ' ').title()}\n"
                for issue in issues:
                    severity_icon = "🔴" if issue.get('severity') == 'CRITICAL' else "🟡"
                    report += f"{severity_icon} **{issue.get('type', 'Unknown')}**\n"

                    if 'deviation_pct' in issue:
                        report += f"   - Deviation: {issue['deviation_pct']:.1f}%\n"

                    if 'calculated' in issue and 'reported' in issue:
                        report += f"   - Calculated: ${issue['calculated']:,.0f}\n"
                        report += f"   - Reported: ${issue['reported']:,.0f}\n"

                    report += "\n"

        return report

def main():
    parser = argparse.ArgumentParser(description='Data Consistency Validator')
    parser.add_argument('ticker', help='Stock ticker symbol')
    parser.add_argument('--tolerance', type=float, default=0.02, help='Tolerance for arithmetic deviations')
    parser.add_argument('--input-file', help='JSON file with data sources')
    parser.add_argument('--output-file', help='Output report file')

    args = parser.parse_args()

    # 示例数据结构（实际应从MCP工具获取）
    if args.input_file:
        with open(args.input_file, 'r') as f:
            data_sources = json.load(f)
    else:
        print(f"Error: Please provide input data file with --input-file")
        sys.exit(1)

    validator = DataConsistencyValidator(args.ticker, args.tolerance)

    # 执行所有验证
    validation_results = {
        'market_cap_consistency': validator.validate_market_cap_consistency(data_sources),
        'pe_calculation': validator.validate_pe_calculation(data_sources),
        'data_freshness': validator.check_data_freshness(data_sources)
    }

    # 生成推荐
    recommendations = validator.recommend_baseline_data(data_sources)

    # 生成报告
    report = validator.generate_report(validation_results)

    if args.output_file:
        with open(args.output_file, 'w') as f:
            f.write(report)
        print(f"Report written to {args.output_file}")
    else:
        print(report)

    # 返回退出码
    critical_issues = sum(1 for issues in validation_results.values()
                         for issue in issues if issue.get('severity') == 'CRITICAL')

    sys.exit(1 if critical_issues > 0 else 0)

if __name__ == '__main__':
    main()