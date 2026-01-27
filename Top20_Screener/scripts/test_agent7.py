"""
Agent 7 测试脚本 - 快速验证排除规则
"""

import pandas as pd
import os

# 测试数据
TEST_STOCKS = [
    # 应通过的股票
    {'Ticker': 'AAPL', 'Company': 'Apple Inc', 'Expected': 'PASS'},
    {'Ticker': 'MSFT', 'Company': 'Microsoft Corp', 'Expected': 'PASS'},
    {'Ticker': 'JNJ', 'Company': 'Johnson & Johnson', 'Expected': 'PASS'},
    {'Ticker': 'JPM', 'Company': 'JPMorgan Chase', 'Expected': 'PASS'},

    # 可能被排除的股票
    {'Ticker': 'MRNA', 'Company': 'Moderna Inc', 'Expected': 'EXCLUDE', 'Reason': '生物制药'},
    {'Ticker': 'COIN', 'Company': 'Coinbase', 'Expected': 'EXCLUDE', 'Reason': '近期IPO或加密'},
    {'Ticker': 'BKKT', 'Company': 'Bakkt Holdings', 'Expected': 'EXCLUDE', 'Reason': '加密/SPAC'},

    # 边界案例
    {'Ticker': 'TSLA', 'Company': 'Tesla Inc', 'Expected': 'BORDERLINE', 'Reason': '高估值但大盘股'},
    {'Ticker': 'GME', 'Company': 'GameStop Corp', 'Expected': 'BORDERLINE', 'Reason': 'Meme股但有收入'},
]

def create_test_pool():
    """创建测试股票池"""
    base_dir = "/Users/milton/投资大师/Top20_Screener"
    data_dir = os.path.join(base_dir, "data")
    os.makedirs(data_dir, exist_ok=True)

    # 只保留Ticker和Company列
    test_pool = pd.DataFrame([
        {'Ticker': stock['Ticker'], 'Company': stock['Company']}
        for stock in TEST_STOCKS
    ])

    output_file = os.path.join(data_dir, "initial_stock_pool.csv")
    test_pool.to_csv(output_file, index=False)

    print(f"✓ 测试股票池已创建: {output_file}")
    print(f"  包含 {len(test_pool)} 只股票")

    # 打印期望结果
    print("\n期望结果:")
    print("-" * 70)
    for stock in TEST_STOCKS:
        expected = stock['Expected']
        reason = stock.get('Reason', '')
        status = "✓" if expected == "PASS" else "✗" if expected == "EXCLUDE" else "?"
        print(f"{status} {stock['Ticker']:6} | {stock['Company']:25} | {expected:10} | {reason}")
    print("-" * 70)

    return output_file

def analyze_results():
    """分析执行结果"""
    base_dir = "/Users/milton/投资大师/Top20_Screener"

    # 读取结果文件
    excluded_file = os.path.join(base_dir, "exclusions", "excluded_companies.csv")
    passed_file = os.path.join(base_dir, "data", "passed_companies.csv")
    summary_file = os.path.join(base_dir, "exclusions", "exclusion_summary.md")

    if not os.path.exists(excluded_file):
        print("结果文件不存在，请先运行 agent7_exclusion_executor.py")
        return

    excluded = pd.read_csv(excluded_file)
    passed = pd.read_csv(passed_file) if os.path.exists(passed_file) else pd.DataFrame()

    print("\n" + "="*70)
    print("实际结果分析")
    print("="*70)

    # 对比期望结果
    print("\n对比期望结果:")
    print("-" * 70)

    correct = 0
    total = len(TEST_STOCKS)

    for stock in TEST_STOCKS:
        ticker = stock['Ticker']
        expected = stock['Expected']

        in_excluded = ticker in excluded['Ticker'].values
        in_passed = ticker in passed['Ticker'].values if not passed.empty else False

        if in_excluded:
            actual = "EXCLUDE"
            reason = excluded[excluded['Ticker'] == ticker]['Reason'].values[0]
        elif in_passed:
            actual = "PASS"
            reason = "通过所有规则"
        else:
            actual = "UNKNOWN"
            reason = "未找到结果"

        # 判断是否符合期望
        if expected == "BORDERLINE":
            match = "?"
            correct += 0.5  # 边界案例算半对
        elif expected == actual:
            match = "✓"
            correct += 1
        else:
            match = "✗"

        print(f"{match} {ticker:6} | 期望:{expected:10} | 实际:{actual:10} | {reason}")

    print("-" * 70)
    print(f"\n准确率: {correct}/{total} = {correct/total*100:.1f}%")

    # 统计摘要
    print("\n" + "="*70)
    print("排除统计")
    print("="*70)

    if len(excluded) > 0:
        print(f"\n总排除数: {len(excluded)}")
        print("\n按原因分类:")
        reason_counts = excluded['Reason'].value_counts()
        for reason, count in reason_counts.items():
            print(f"  - {reason}: {count}")

    if not passed.empty:
        print(f"\n通过数: {len(passed)}")

    # 显示summary文件
    if os.path.exists(summary_file):
        print("\n" + "="*70)
        print("完整报告")
        print("="*70)
        with open(summary_file, 'r', encoding='utf-8') as f:
            print(f.read())

def main():
    """主测试流程"""
    print("="*70)
    print("Agent 7 排除规则执行器 - 测试脚本")
    print("="*70)

    # 步骤1: 创建测试股票池
    print("\n[步骤 1/3] 创建测试股票池")
    pool_file = create_test_pool()

    # 步骤2: 提示运行主脚本
    print("\n[步骤 2/3] 运行排除规则")
    print("-" * 70)
    print("请运行以下命令执行排除规则:")
    print()
    print("  cd /Users/milton/投资大师/Top20_Screener/scripts")
    print("  python agent7_exclusion_executor.py")
    print()
    print("或者使用环境变量:")
    print("  export FMP_API_KEY='your_key'")
    print("  python agent7_exclusion_executor.py")
    print("-" * 70)

    # 步骤3: 检查是否已有结果
    print("\n[步骤 3/3] 分析结果")
    analyze_results()

    print("\n" + "="*70)
    print("测试完成")
    print("="*70)
    print("\n文件位置:")
    print(f"  - 测试池: {pool_file}")
    print(f"  - 排除列表: {os.path.join('/Users/milton/投资大师/Top20_Screener', 'exclusions', 'excluded_companies.csv')}")
    print(f"  - 通过列表: {os.path.join('/Users/milton/投资大师/Top20_Screener', 'data', 'passed_companies.csv')}")
    print(f"  - 总结报告: {os.path.join('/Users/milton/投资大师/Top20_Screener', 'exclusions', 'exclusion_summary.md')}")

if __name__ == "__main__":
    main()
