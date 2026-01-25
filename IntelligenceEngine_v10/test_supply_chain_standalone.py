#!/usr/bin/env python3
"""
Supply Chain Intelligence Engine - 独立测试脚本
直接导入supply_chain_intel.py，不依赖其他引擎
"""

import sys
import importlib.util
from pathlib import Path

# 直接加载supply_chain_intel模块
spec = importlib.util.spec_from_file_location(
    "supply_chain_intel",
    Path(__file__).parent / "engines" / "supply_chain_intel.py"
)
supply_chain_intel = importlib.util.module_from_spec(spec)
sys.modules["supply_chain_intel"] = supply_chain_intel
spec.loader.exec_module(supply_chain_intel)

SupplyChainIntelligence = supply_chain_intel.SupplyChainIntelligence

def test_basic_functionality():
    """测试基础功能"""
    print("="*70)
    print("Supply Chain Intelligence Engine - 功能测试")
    print("="*70)

    # 初始化
    print("\n[1] 初始化引擎...")
    engine = SupplyChainIntelligence()
    print(f"✓ 已加载 {len(engine.config['suppliers'])} 家供应商配置")

    # 列出供应商
    print("\n[2] 供应商清单:")
    print("-" * 70)
    print(f"{'供应商':<20} {'代码':<15} {'细分':<12} {'重要性':<10}")
    print("-" * 70)

    for supplier in engine.config['suppliers']:
        print(f"{supplier['name']:<20} {supplier['ticker']:<15} "
              f"{supplier['segment']:<12} {supplier['importance']:<10}")

    # 分析单个供应商（CATL）
    print("\n[3] 分析CATL（宁德时代）...")
    print("-" * 70)

    report = engine.analyze_supplier('CATL', force_download=False)

    if report:
        print(f"\n供应商: {report.supplier_name}")
        print(f"代码: {report.ticker}")
        print(f"报告期: {report.report_period}")
        print(f"\n提取指标:")

        for metric in report.metrics:
            print(f"  - {metric.metric_name}: {metric.value} {metric.unit} "
                  f"(置信度: {metric.confidence:.0%})")

        print(f"\n关键发现:")
        for finding in report.key_findings:
            print(f"  • {finding}")

        print(f"\n管理层评论:")
        for comment in report.management_commentary[:3]:
            print(f"  → {comment[:100]}...")

        print(f"\n影响评估:")
        print(f"  综合评分: {report.impact_score}/10")
        print(f"  交易信号: {report.signal}")
        print(f"  置信度: {report.confidence:.0%}")

    # 测试数据提取
    print("\n[4] 测试NLP数据提取...")
    print("-" * 70)

    sample_text = """
    In Q4 2024, our total revenue reached $8.5 billion, with automotive battery
    revenue accounting for $6.2 billion, representing 73% of total revenue.
    Gross margin improved to 28.5% from 26.1% in the previous quarter.

    North America revenue grew to $2.1 billion, up 35% year-over-year, driven by
    strong demand from major electric vehicle manufacturers. We are expanding our
    production capacity by 50 GWh in Nevada to meet increasing orders.

    Energy storage revenue hit $1.8 billion, with order backlog reaching $12 billion.
    """

    supplier_config = engine.config['suppliers'][0]  # CATL
    metrics = engine.extract_metrics(sample_text, supplier_config)

    print(f"从样本文本中提取到 {len(metrics)} 个指标:")
    for metric in metrics:
        print(f"  • {metric.metric_name}: {metric.value} {metric.unit} "
              f"(置信度: {metric.confidence:.0%}, 来源: {metric.source})")

    # 测试交叉验证
    print("\n[5] 测试交叉验证...")
    print("-" * 70)

    validated = engine.cross_validate_metrics(metrics)
    print(f"验证后保留 {len(validated)} 个指标:")
    for metric in validated:
        print(f"  • {metric.metric_name}: {metric.value} {metric.unit} "
              f"(置信度: {metric.confidence:.0%}, 来源: {metric.source})")

    # 测试影响评估
    print("\n[6] 测试Tesla影响评估...")
    print("-" * 70)

    impact = engine.assess_tesla_impact(supplier_config, validated)

    print(f"供应商: {impact.supplier}")
    print(f"评估日期: {impact.assessment_date}")
    print(f"\n四维度影响:")
    print(f"  成本影响: {impact.cost_impact:+.2f}/10")
    print(f"  产能影响: {impact.capacity_impact:+.2f}/10")
    print(f"  质量影响: {impact.quality_impact:+.2f}/10")
    print(f"  创新影响: {impact.innovation_impact:+.2f}/10")
    print(f"\n综合评分: {impact.overall_impact:.2f}/10")
    print(f"置信度: {impact.confidence:.0%}")
    print(f"建议: {impact.recommendation}")

    if impact.key_opportunities:
        print(f"\n关键机会:")
        for opp in impact.key_opportunities:
            print(f"  ✓ {opp}")

    if impact.key_risks:
        print(f"\n关键风险:")
        for risk in impact.key_risks:
            print(f"  ✗ {risk}")

    # 测试信号生成
    print("\n[7] 测试交易信号生成...")
    print("-" * 70)

    signal = engine.generate_trading_signal(impact)
    print(f"交易信号: {signal}")

    signal_thresholds = engine.config['analysis_config']['signal_thresholds']
    print(f"\n信号阈值配置:")
    for level, threshold in signal_thresholds.items():
        print(f"  {level.upper()}: >= {threshold}")

    print("\n" + "="*70)
    print("测试完成！")
    print("="*70)

    print("\n下一步:")
    print("  1. 运行完整分析: python3 engines/supply_chain_intel.py --all")
    print("  2. 查看输出文件: data/supply_chain/analysis/")
    print("  3. 阅读文档: README_SUPPLY_CHAIN.md")


if __name__ == '__main__':
    test_basic_functionality()
