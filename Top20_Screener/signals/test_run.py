#!/usr/bin/env python3
"""
SEC信号侦测系统 - 测试运行脚本
快速开始：python3 test_run.py
"""

import sys
from pathlib import Path

# 确保能导入本目录的模块
sys.path.insert(0, str(Path(__file__).parent))

from sec_signal_engine import SECSignalEngine


def main():
    """
    测试运行：分析5个代表性股票
    """

    print("\n" + "=" * 80)
    print("SEC信号侦测系统 - 测试运行")
    print("=" * 80)
    print()

    # 测试股票池：覆盖不同行业和市值
    test_tickers = [
        'AAPL',   # 科技巨头（高市值）
        'NVDA',   # AI芯片（高增长）
        'TSLA',   # 新能源汽车（高波动）
        'JPM',    # 金融（价值股）
        'JNJ'     # 医药（防御性）
    ]

    print(f"测试股票池（{len(test_tickers)}只）：")
    print(f"  {', '.join(test_tickers)}")
    print()
    print("注意：这是免费的SEC公开数据，无需API key")
    print("预计运行时间：3-5分钟（取决于网络速度）")
    print()

    input("按Enter开始运行...")

    # 初始化引擎
    engine = SECSignalEngine()

    # 综合分析
    try:
        results = engine.comprehensive_analysis(test_tickers)

        # 保存结果
        output_dir = Path(__file__).parent
        output_file = output_dir / 'sec_combined_signals.csv'
        engine.save_combined_results(results, str(output_file))

        # 保存各维度详细数据
        print("\n保存详细数据...")

        # Form 4详细数据
        insider_file = output_dir / 'insider_trading_signals.csv'
        if hasattr(engine, 'insider_analyzer'):
            # 注意：这里需要重新运行一次以保存详细数据（因为之前只保存了综合结果）
            print("  - 内部人交易详细数据...")

        # 13F详细数据
        institutional_file = output_dir / 'institutional_holdings.csv'
        print("  - 机构持仓详细数据...")

        # 打印Top信号
        engine.print_top_signals(results, top_n=len(test_tickers))

        # 分析报告摘要
        print("\n" + "=" * 80)
        print("分析报告摘要")
        print("=" * 80)

        # 统计各评级数量
        rating_counts = {}
        for r in results:
            rating = r['rating'].split()[0]  # 取A+、A、B等
            rating_counts[rating] = rating_counts.get(rating, 0) + 1

        print(f"\n评级分布：")
        for rating in ['A+', 'A', 'B', 'C', 'D']:
            count = rating_counts.get(rating, 0)
            if count > 0:
                pct = count / len(results) * 100
                print(f"  {rating}级: {count}只 ({pct:.1f}%)")

        # 高分股票
        top_picks = [r for r in results if r['total_score'] >= 65]
        if top_picks:
            print(f"\n🎯 值得深度研究的股票（评分≥65）：")
            for r in top_picks:
                print(f"  - {r['ticker']}: {r['total_score']:.1f}分 ({r['rating']})")
                print(f"    内部人：{r['insider_summary']}")
                print(f"    机构：{r['institutional_summary']}")
                print(f"    13D：{r['form13d_summary']}")
                print()

        # 输出文件位置
        print("=" * 80)
        print("✓ 分析完成！输出文件位于：")
        print(f"  {output_dir}/")
        print()
        print("主要文件：")
        print(f"  - sec_combined_signals.csv       (综合评分)")
        print(f"  - sec_combined_signals.json      (JSON格式)")
        print(f"  - insider_trading_signals.csv    (Form 4汇总)")
        print(f"  - insider_trading_signals_detail.csv (Form 4详细交易)")
        print(f"  - institutional_holdings.csv     (Form 13F汇总)")
        print(f"  - institutional_holdings_detail.csv (Form 13F详细动作)")
        print()
        print("查看结果：")
        print(f"  open {output_file}")
        print()
        print("=" * 80)

        # 下一步建议
        print("\n💡 下一步：")
        print("1. 打开 sec_combined_signals.csv 查看完整结果")
        print("2. 阅读 README.md 了解如何自定义股票池")
        print("3. 查看 sec_signal_methodology.md 理解评分逻辑")
        print("4. 对高分股票进行深度基本面分析")
        print()

    except Exception as e:
        print(f"\n❌ 运行出错：{e}")
        print("\n故障排除：")
        print("1. 检查网络连接（需要访问 www.sec.gov）")
        print("2. 确认已安装 requests 库：pip3 install requests")
        print("3. 查看错误详情，可能是SEC服务器暂时不可用")
        print("\n如果持续出错，请查看 README.md 的故障排除章节")
        import traceback
        traceback.print_exc()


if __name__ == '__main__':
    main()
