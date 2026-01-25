#!/usr/bin/env python3
"""
测试脚本 - 使用示例数据测试sentiment_tracker（无需Reddit API）

功能：
1. 加载示例数据
2. 运行完整情感分析
3. 验证OCI计算
4. 生成报告
"""

import json
from datetime import datetime
from sentiment_tracker import SentimentTracker
import os


def load_sample_data(filename):
    """加载示例JSON数据"""
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 转换时间字符串为datetime对象
    for post in data['posts']:
        post['created_utc'] = datetime.fromisoformat(post['created_utc'])
        for comment in post.get('comments', []):
            comment['created_utc'] = datetime.fromisoformat(comment['created_utc'])

    return data['posts']


def test_scenario(tracker, scenario_name, data_file):
    """测试单个场景"""
    print(f"\n{'='*70}")
    print(f"测试场景: {scenario_name}".center(70))
    print(f"{'='*70}\n")

    # 加载数据
    print(f"正在加载数据: {data_file}")
    posts = load_sample_data(data_file)
    print(f"✓ 加载 {len(posts)} 篇帖子\n")

    # 处理数据
    print("正在分析情感...")
    df = tracker.process_posts(posts)
    print(f"✓ 处理完成：{len(df)} 条记录\n")

    # 计算OCI
    print("正在计算OCI指数...")
    oci_metrics = tracker.calculate_oci(df)
    print("✓ OCI计算完成\n")

    # 按子版块分析
    print("正在分析子版块...")
    subreddit_analysis = tracker.analyze_by_subreddit(df)
    print("✓ 子版块分析完成\n")

    # 关键词分析
    print("正在分析关键词趋势...")
    keyword_analysis = tracker.analyze_keyword_trends(df)
    print("✓ 关键词分析完成\n")

    # 生成报告
    report = tracker.generate_report(df, oci_metrics,
                                    subreddit_analysis, keyword_analysis)
    print(report)

    # 保存数据
    print("\n正在保存数据...")
    tracker.save_data(df, oci_metrics, filename_prefix=f'test_{scenario_name}')

    # 保存分析结果
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    report_path = os.path.join(tracker.data_dir, f'test_report_{scenario_name}_{timestamp}.txt')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report)
    print(f"✓ 报告已保存: {report_path}")

    if not subreddit_analysis.empty:
        sub_path = os.path.join(tracker.data_dir,
                               f'test_subreddit_{scenario_name}_{timestamp}.csv')
        subreddit_analysis.to_csv(sub_path, index=False)
        print(f"✓ 子版块分析已保存: {sub_path}")

    if not keyword_analysis.empty:
        kw_path = os.path.join(tracker.data_dir,
                              f'test_keyword_{scenario_name}_{timestamp}.csv')
        keyword_analysis.to_csv(kw_path, index=False)
        print(f"✓ 关键词分析已保存: {kw_path}")

    print(f"\n{'='*70}\n")

    return oci_metrics


def main():
    """主测试流程"""
    print("\n" + "="*70)
    print("Sentiment Tracker 测试程序（使用示例数据）".center(70))
    print("="*70)

    # 初始化追踪器（不需要Reddit API）
    tracker = SentimentTracker()

    # 数据目录
    data_dir = '../data/sentiment'

    # 测试场景
    scenarios = [
        ('positive', os.path.join(data_dir, 'sample_positive.json'), "乐观情绪"),
        ('negative', os.path.join(data_dir, 'sample_negative.json'), "悲观情绪"),
        ('neutral', os.path.join(data_dir, 'sample_neutral.json'), "中性情绪")
    ]

    results = {}

    # 检查示例数据是否存在
    missing_files = []
    for scenario_id, filepath, name in scenarios:
        if not os.path.exists(filepath):
            missing_files.append(filepath)

    if missing_files:
        print("\n⚠ 未找到示例数据文件！")
        print("请先运行以下命令生成示例数据：")
        print("  python generate_sample_data.py\n")
        print("缺失文件：")
        for f in missing_files:
            print(f"  - {f}")
        return

    # 运行所有测试场景
    for scenario_id, filepath, scenario_name in scenarios:
        results[scenario_id] = test_scenario(tracker, scenario_id, filepath)

    # 汇总结果
    print("="*70)
    print("测试结果汇总".center(70))
    print("="*70 + "\n")

    print(f"{'场景':<15} {'OCI分数':<12} {'7天MA':<12} {'30天MA':<12} {'解读':<20}")
    print("-" * 70)

    for scenario_id, filepath, scenario_name in scenarios:
        metrics = results[scenario_id]
        interpretation = tracker._interpret_oci(metrics['oci_score'])
        print(f"{scenario_name:<15} "
              f"{metrics['oci_score']:>10.2f}  "
              f"{metrics['oci_7d']:>10.2f}  "
              f"{metrics['oci_30d']:>10.2f}  "
              f"{interpretation:<20}")

    print("\n" + "="*70)
    print("验证结果：".center(70))
    print("="*70)

    # 验证逻辑
    positive_oci = results['positive']['oci_score']
    negative_oci = results['negative']['oci_score']
    neutral_oci = results['neutral']['oci_score']

    checks = [
        ("乐观场景OCI > 0", positive_oci > 0),
        ("悲观场景OCI < 0", negative_oci < 0),
        ("中性场景OCI接近0", abs(neutral_oci) < 20),
        ("乐观OCI > 悲观OCI", positive_oci > negative_oci)
    ]

    all_passed = True
    for check_name, passed in checks:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  {status} - {check_name}")
        if not passed:
            all_passed = False

    print("\n" + "="*70)
    if all_passed:
        print("所有测试通过！引擎运行正常。".center(70))
    else:
        print("部分测试失败，请检查代码。".center(70))
    print("="*70 + "\n")

    # 使用提示
    print("\n下一步：")
    print("1. 申请Reddit API密钥（见README_SENTIMENT.md）")
    print("2. 配置config/sentiment_config.json")
    print("3. 运行真实数据分析：python sentiment_tracker.py")
    print()


if __name__ == '__main__':
    main()
