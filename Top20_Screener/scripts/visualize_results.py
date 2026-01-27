"""
Agent 7 结果可视化工具
生成排除规则执行结果的图表和统计
"""

import pandas as pd
import os
from datetime import datetime

BASE_DIR = "/Users/milton/投资大师/Top20_Screener"


def generate_ascii_bar_chart(data_dict, title, max_width=50):
    """生成ASCII条形图"""
    if not data_dict:
        return "无数据"

    max_value = max(data_dict.values())
    output = [f"\n{title}", "=" * (max_width + 20), ""]

    for label, value in sorted(data_dict.items(), key=lambda x: x[1], reverse=True):
        bar_length = int((value / max_value) * max_width) if max_value > 0 else 0
        bar = "█" * bar_length
        percentage = (value / sum(data_dict.values()) * 100) if sum(data_dict.values()) > 0 else 0
        output.append(f"{label:30} {bar} {value:4} ({percentage:5.1f}%)")

    output.append("=" * (max_width + 20))
    return "\n".join(output)


def generate_summary_table(df, title):
    """生成汇总表格"""
    if df is None or len(df) == 0:
        return f"\n{title}\n无数据\n"

    output = [f"\n{title}", "=" * 80, ""]

    # 基本统计
    output.append(f"总数: {len(df)}")

    # 按Ticker显示
    if len(df) <= 20:  # 如果数量少，显示详情
        output.append("\n详细列表:")
        output.append("-" * 80)
        for idx, row in df.iterrows():
            ticker = row.get('Ticker', '')
            company = row.get('Company', '')
            reason = row.get('Reason', '')
            details = row.get('Details', '')

            output.append(f"{ticker:6} | {company:30} | {reason}")
            if details:
                output.append(f"       └─ {details}")
    else:
        output.append(f"\n(数量较多，详见CSV文件)")

    output.append("=" * 80)
    return "\n".join(output)


def analyze_exclusion_patterns(excluded_df):
    """分析排除模式"""
    if excluded_df is None or len(excluded_df) == 0:
        return "无排除数据"

    output = ["\n排除模式深度分析", "=" * 80, ""]

    # 1. 按原因分类
    reason_counts = excluded_df['Reason'].value_counts().to_dict()
    output.append(generate_ascii_bar_chart(reason_counts, "排除原因分布"))

    # 2. 详细分析各类原因
    output.append("\n详细分析:")
    output.append("-" * 80)

    for reason, count in excluded_df['Reason'].value_counts().items():
        subset = excluded_df[excluded_df['Reason'] == reason]
        output.append(f"\n{reason} ({count}家):")

        # 显示前5个案例
        for idx, row in subset.head(5).iterrows():
            output.append(f"  • {row['Ticker']:6} - {row['Company']:30}")
            if row.get('Details'):
                output.append(f"    └─ {row['Details']}")

    return "\n".join(output)


def generate_quality_report(passed_df, excluded_df, total):
    """生成质量报告"""
    output = ["\n质量报告", "=" * 80, ""]

    passed_count = len(passed_df) if passed_df is not None else 0
    excluded_count = len(excluded_df) if excluded_df is not None else 0
    exclusion_rate = excluded_count / total if total > 0 else 0

    # 基本指标
    output.append(f"起始池规模: {total:,}家公司")
    output.append(f"通过筛选: {passed_count:,}家公司 ✅")
    output.append(f"被排除: {excluded_count:,}家公司 ✗")
    output.append(f"排除率: {exclusion_rate*100:.1f}%")
    output.append("")

    # 质量评估
    output.append("质量评估:")
    output.append("-" * 80)

    if exclusion_rate < 0.2:
        quality = "⚠️  偏低"
        assessment = "规则可能太宽松，或股票池本身质量很高"
    elif exclusion_rate > 0.6:
        quality = "⚠️  偏高"
        assessment = "规则可能太严格，或股票池包含大量低质量公司"
    else:
        quality = "✓ 正常"
        assessment = "排除率在合理范围内 (30-50%)"

    output.append(f"排除率: {quality}")
    output.append(f"评估: {assessment}")
    output.append("")

    # 建议
    output.append("建议:")
    output.append("-" * 80)
    if exclusion_rate < 0.2:
        output.append("• 检查规则是否正确执行")
        output.append("• 验证股票池来源质量")
        output.append("• 考虑适当收紧阈值")
    elif exclusion_rate > 0.6:
        output.append("• 检查股票池是否包含大量低质量公司")
        output.append("• 考虑适当放宽阈值 (如Z-Score从1.8改为1.5)")
        output.append("• 复核边界案例")
    else:
        output.append("✓ 当前配置合理，继续下一步分析")

    output.append("=" * 80)
    return "\n".join(output)


def generate_company_spotlight(passed_df, excluded_df):
    """高亮重要公司"""
    output = ["\n公司重点关注", "=" * 80, ""]

    # 知名公司列表 (市值>1000亿的大盘股)
    famous_tickers = [
        'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA',
        'BRK.B', 'BRK.A', 'V', 'JNJ', 'WMT', 'JPM', 'MA', 'PG', 'UNH',
        'XOM', 'HD', 'CVX', 'MRK', 'ABBV', 'KO', 'PEP', 'COST', 'AVGO'
    ]

    # 检查知名公司状态
    if passed_df is not None:
        passed_famous = passed_df[passed_df['Ticker'].isin(famous_tickers)]
        if len(passed_famous) > 0:
            output.append(f"✓ 通过筛选的知名公司 ({len(passed_famous)}家):")
            for ticker in passed_famous['Ticker'].values:
                output.append(f"  • {ticker}")
            output.append("")

    if excluded_df is not None:
        excluded_famous = excluded_df[excluded_df['Ticker'].isin(famous_tickers)]
        if len(excluded_famous) > 0:
            output.append(f"⚠️  被排除的知名公司 ({len(excluded_famous)}家):")
            output.append("   需要人工复核排除原因是否合理")
            output.append("")
            for _, row in excluded_famous.iterrows():
                output.append(f"  ✗ {row['Ticker']:6} - {row['Company']}")
                output.append(f"    原因: {row['Reason']}")
                if row.get('Details'):
                    output.append(f"    详情: {row['Details']}")
                output.append("")

    output.append("=" * 80)
    return "\n".join(output)


def main():
    """主函数"""
    print("=" * 80)
    print("Agent 7 结果可视化工具")
    print("=" * 80)

    # 读取数据
    excluded_file = os.path.join(BASE_DIR, "exclusions", "excluded_companies.csv")
    passed_file = os.path.join(BASE_DIR, "data", "passed_companies.csv")
    all_results_file = os.path.join(BASE_DIR, "exclusions", "exclusion_results_all.csv")

    if not os.path.exists(excluded_file):
        print("\n错误: 结果文件不存在")
        print("请先运行 agent7_exclusion_executor.py")
        return

    excluded_df = pd.read_csv(excluded_file)
    passed_df = pd.read_csv(passed_file) if os.path.exists(passed_file) else pd.DataFrame()
    total = len(excluded_df) + len(passed_df)

    # 生成报告
    report_sections = [
        generate_quality_report(passed_df, excluded_df, total),
        generate_summary_table(passed_df, "通过筛选的公司 ✅"),
        generate_summary_table(excluded_df, "被排除的公司 ✗"),
        analyze_exclusion_patterns(excluded_df),
        generate_company_spotlight(passed_df, excluded_df),
    ]

    full_report = "\n\n".join(report_sections)

    # 输出到终端
    print(full_report)

    # 保存到文件
    report_file = os.path.join(BASE_DIR, "exclusions", "visual_analysis.txt")
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(full_report)
        f.write(f"\n\n生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    print(f"\n完整报告已保存至: {report_file}")

    # 生成CSV汇总
    summary_data = {
        'Metric': [
            'Total Companies',
            'Passed',
            'Excluded',
            'Exclusion Rate',
            'Biotech Exclusions',
            'Data Quality Exclusions',
            'Financial Risk Exclusions',
            'Governance Risk Exclusions',
            'Liquidity Exclusions',
            'Other Exclusions'
        ],
        'Value': [
            total,
            len(passed_df),
            len(excluded_df),
            f"{len(excluded_df)/total*100:.1f}%" if total > 0 else "0%",
            len(excluded_df[excluded_df['Reason'].str.contains('biotech|special', case=False, na=False)]),
            len(excluded_df[excluded_df['Reason'].str.contains('data', case=False, na=False)]),
            len(excluded_df[excluded_df['Reason'].str.contains('bankruptcy|debt', case=False, na=False)]),
            len(excluded_df[excluded_df['Reason'].str.contains('governance|insider', case=False, na=False)]),
            len(excluded_df[excluded_df['Reason'].str.contains('liquidity', case=False, na=False)]),
            len(excluded_df) - sum([
                len(excluded_df[excluded_df['Reason'].str.contains(pattern, case=False, na=False)])
                for pattern in ['biotech', 'special', 'data', 'bankruptcy', 'debt', 'governance', 'insider', 'liquidity']
            ])
        ]
    }

    summary_df = pd.DataFrame(summary_data)
    summary_csv = os.path.join(BASE_DIR, "exclusions", "summary_metrics.csv")
    summary_df.to_csv(summary_csv, index=False)
    print(f"汇总指标已保存至: {summary_csv}")

    print("\n" + "=" * 80)
    print("可视化完成！")
    print("=" * 80)


if __name__ == "__main__":
    main()
