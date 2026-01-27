#!/usr/bin/env python3
"""
估值引擎测试脚本

测试 valuation_engine.py 的核心功能
"""

import os
import sys
import json

# 添加路径
sys.path.insert(0, '/Users/milton/投资大师/Top20_Screener/valuation')

from valuation_engine import (
    UndervaluationEngine,
    FMPDataFetcher,
    RelativeValuationCalculator,
    HistoricalValuationCalculator,
    FCFYieldCalculator,
    SimplifiedDCFCalculator,
    INDUSTRY_VALUATION_BENCHMARKS
)


def test_data_fetcher():
    """测试数据获取器"""
    print("\n" + "="*60)
    print("测试1: 数据获取器")
    print("="*60)

    fetcher = FMPDataFetcher()

    # 测试获取公司概况
    profile = fetcher.get_company_profile('AAPL')
    if profile:
        print(f"[OK] 公司概况: {profile.get('companyName')}")
        print(f"     行业: {profile.get('sector')} / {profile.get('industry')}")
    else:
        print("[FAIL] 无法获取公司概况")
        return False

    # 测试获取报价
    quote = fetcher.get_quote('AAPL')
    if quote:
        print(f"[OK] 当前价格: ${quote.get('price'):.2f}")
        print(f"     市值: ${quote.get('marketCap', 0)/1e9:.1f}B")
    else:
        print("[FAIL] 无法获取报价")
        return False

    # 测试获取TTM指标
    metrics_ttm = fetcher.get_key_metrics_ttm('AAPL')
    if metrics_ttm:
        print(f"[OK] EV/EBITDA TTM: {metrics_ttm.get('enterpriseValueOverEBITDATTM', 'N/A')}")
    else:
        print("[WARN] TTM指标获取失败")

    print("\n[OK] 数据获取器测试通过")
    return True


def test_relative_valuation():
    """测试相对估值计算"""
    print("\n" + "="*60)
    print("测试2: 相对估值计算")
    print("="*60)

    fetcher = FMPDataFetcher()
    calc = RelativeValuationCalculator(fetcher)

    # 获取完整数据
    data = fetcher.compile_valuation_data('MSFT')

    # 计算相对估值
    result = calc.calculate(data)

    print(f"[OK] PE TTM: {result.pe_ttm:.2f}" if result.pe_ttm else "[WARN] PE TTM不可用")
    print(f"[OK] EV/EBITDA: {result.ev_ebitda:.2f}" if result.ev_ebitda else "[WARN] EV/EBITDA不可用")
    print(f"[OK] P/FCF: {result.p_fcf:.2f}" if result.p_fcf else "[WARN] P/FCF不可用")

    if result.pe_vs_industry is not None:
        print(f"[OK] PE vs 行业: {result.pe_vs_industry*100:+.1f}%")

    print(f"[OK] 相对估值评分: {result.relative_score}/100")

    print("\n[OK] 相对估值测试通过")
    return True


def test_historical_valuation():
    """测试历史估值计算"""
    print("\n" + "="*60)
    print("测试3: 历史估值计算")
    print("="*60)

    fetcher = FMPDataFetcher()
    calc = HistoricalValuationCalculator()

    data = fetcher.compile_valuation_data('GOOGL')
    result = calc.calculate(data)

    if result.pe_current:
        print(f"[OK] 当前PE: {result.pe_current:.2f}")
    if result.pe_5y_median:
        print(f"[OK] 5年PE中位数: {result.pe_5y_median:.2f}")
    if result.pe_percentile:
        print(f"[OK] PE百分位: {result.pe_percentile:.0f}%")

    print(f"[OK] 历史估值评分: {result.historical_score}/100")

    print("\n[OK] 历史估值测试通过")
    return True


def test_fcf_yield():
    """测试FCF收益率计算"""
    print("\n" + "="*60)
    print("测试4: FCF收益率计算")
    print("="*60)

    fetcher = FMPDataFetcher()
    calc = FCFYieldCalculator()

    data = fetcher.compile_valuation_data('META')
    result = calc.calculate(data)

    print(f"[OK] FCF TTM: ${result.fcf_ttm/1e9:.1f}B")
    print(f"[OK] 市值: ${result.market_cap/1e9:.1f}B")
    print(f"[OK] FCF收益率: {result.fcf_yield*100:.2f}%")
    print(f"[OK] vs 10年期国债: {result.fcf_yield_vs_10y_treasury*100:+.2f}%")
    print(f"[OK] FCF收益率评分: {result.fcf_yield_score}/100")

    print("\n[OK] FCF收益率测试通过")
    return True


def test_dcf():
    """测试DCF估值"""
    print("\n" + "="*60)
    print("测试5: DCF估值")
    print("="*60)

    fetcher = FMPDataFetcher()
    calc = SimplifiedDCFCalculator()

    data = fetcher.compile_valuation_data('AAPL')
    result = calc.calculate(data)

    print(f"[OK] DCF状态: {result.status}")

    if result.intrinsic_value:
        print(f"[OK] 内在价值 (Base): ${result.base_case:.2f}")
        print(f"[OK] 内在价值 (Bull): ${result.bull_case:.2f}")
        print(f"[OK] 内在价值 (Bear): ${result.bear_case:.2f}")
        print(f"[OK] 当前价格: ${result.current_price:.2f}")
        if result.upside_potential:
            print(f"[OK] 上行空间: {result.upside_potential*100:+.1f}%")

    print(f"[OK] DCF评分: {result.dcf_score}/100")

    # 打印假设
    assumptions = result.assumptions
    if assumptions:
        print(f"\nDCF假设:")
        print(f"  增长率: {assumptions.get('growth_rate', 0)*100:.1f}%")
        print(f"  WACC: {assumptions.get('discount_rate', 0)*100:.1f}%")
        print(f"  永续增长: {assumptions.get('terminal_growth', 0)*100:.1f}%")

    print("\n[OK] DCF测试通过")
    return True


def test_full_analysis():
    """测试完整分析流程"""
    print("\n" + "="*60)
    print("测试6: 完整低估分析")
    print("="*60)

    engine = UndervaluationEngine()

    # 分析单个股票
    result = engine.analyze('NVDA')

    print(f"\n分析结果摘要:")
    print(f"  公司: {result.company_name} ({result.ticker})")
    print(f"  行业: {result.sector}")
    print(f"  当前价格: ${result.current_price:.2f}")
    print(f"  低估评分: {result.undervaluation_score}/100")
    print(f"  低估等级: {result.undervaluation_grade}")
    print(f"  投资信号: {result.investment_signal}")
    print(f"  置信度: {result.confidence_level}")

    if result.red_flags:
        print(f"  红旗数量: {len(result.red_flags)}")

    print("\n[OK] 完整分析测试通过")
    return True


def test_batch_analysis():
    """测试批量分析"""
    print("\n" + "="*60)
    print("测试7: 批量分析")
    print("="*60)

    engine = UndervaluationEngine()

    tickers = ['AAPL', 'MSFT', 'GOOGL']
    results = engine.batch_analyze(tickers)

    print(f"\n批量分析结果 ({len(results)} 只股票):")
    print("-" * 60)

    sorted_results = sorted(results, key=lambda x: x.undervaluation_score, reverse=True)

    for r in sorted_results:
        print(f"{r.ticker:6} | Score: {r.undervaluation_score:5.1f} | "
              f"Grade: {r.undervaluation_grade} | Signal: {r.investment_signal:10}")

    print("\n[OK] 批量分析测试通过")
    return True


def test_export():
    """测试导出功能"""
    print("\n" + "="*60)
    print("测试8: 导出功能")
    print("="*60)

    engine = UndervaluationEngine()

    # 分析几只股票
    results = engine.batch_analyze(['AAPL', 'MSFT'])

    # 导出
    output_dir = '/Users/milton/投资大师/Top20_Screener/valuation/test_output'
    csv_path, json_path, pools_path = engine.export_results(results, output_dir)

    # 验证文件
    if os.path.exists(csv_path):
        print(f"[OK] CSV文件已创建: {csv_path}")
    else:
        print(f"[FAIL] CSV文件未创建")
        return False

    if os.path.exists(json_path):
        print(f"[OK] JSON文件已创建: {json_path}")
    else:
        print(f"[FAIL] JSON文件未创建")
        return False

    if os.path.exists(pools_path):
        print(f"[OK] 候选池文件已创建: {pools_path}")
    else:
        print(f"[FAIL] 候选池文件未创建")
        return False

    print("\n[OK] 导出测试通过")
    return True


def test_industry_benchmarks():
    """测试行业基准数据"""
    print("\n" + "="*60)
    print("测试9: 行业基准数据")
    print("="*60)

    sectors = ['Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer Cyclical']

    for sector in sectors:
        benchmark = INDUSTRY_VALUATION_BENCHMARKS.get(sector, {})
        pe_median = benchmark.get('pe_median', 'N/A')
        print(f"  {sector:25} | PE Median: {pe_median}")

    print("\n[OK] 行业基准数据可用")
    return True


def run_all_tests():
    """运行所有测试"""
    print("="*60)
    print("估值引擎测试套件")
    print("="*60)

    tests = [
        ("数据获取器", test_data_fetcher),
        ("相对估值", test_relative_valuation),
        ("历史估值", test_historical_valuation),
        ("FCF收益率", test_fcf_yield),
        ("DCF估值", test_dcf),
        ("完整分析", test_full_analysis),
        ("批量分析", test_batch_analysis),
        ("导出功能", test_export),
        ("行业基准", test_industry_benchmarks),
    ]

    results = []
    for name, test_func in tests:
        try:
            success = test_func()
            results.append((name, success))
        except Exception as e:
            print(f"[ERROR] {name} 测试异常: {e}")
            results.append((name, False))

    # 汇总
    print("\n" + "="*60)
    print("测试汇总")
    print("="*60)

    passed = sum(1 for _, s in results if s)
    total = len(results)

    for name, success in results:
        status = "[PASS]" if success else "[FAIL]"
        print(f"  {status} {name}")

    print(f"\n总计: {passed}/{total} 测试通过")

    if passed == total:
        print("\n[SUCCESS] 所有测试通过!")
    else:
        print(f"\n[WARNING] {total - passed} 个测试失败")


if __name__ == '__main__':
    run_all_tests()
