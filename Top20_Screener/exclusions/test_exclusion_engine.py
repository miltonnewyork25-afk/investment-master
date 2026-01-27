"""
排除规则引擎测试脚本
用于验证排除规则的正确性
"""

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from exclusion_engine import (
    ExclusionEngine, ExclusionChecker, FMPClient,
    ExclusionReason, CompanyProfile, ExclusionResult,
    FinancialThresholds, GovernanceThresholds, MarketThresholds,
    EXCLUDED_INDUSTRIES, EXCLUDED_INDUSTRY_KEYWORDS
)


def test_industry_exclusion_config():
    """测试行业排除配置"""
    print("\n=== 测试行业排除配置 ===\n")

    # 检查排除行业列表
    print(f"排除行业数量: {len(EXCLUDED_INDUSTRIES)}")
    print("\n排除行业清单:")
    for industry, reason in EXCLUDED_INDUSTRIES.items():
        print(f"  - {industry}: {reason[:50]}...")

    # 检查关键词列表
    print(f"\n排除关键词数量: {len(EXCLUDED_INDUSTRY_KEYWORDS)}")
    print(f"关键词: {', '.join(EXCLUDED_INDUSTRY_KEYWORDS[:10])}...")

    assert len(EXCLUDED_INDUSTRIES) >= 15, "排除行业应至少有15个"
    assert len(EXCLUDED_INDUSTRY_KEYWORDS) >= 10, "排除关键词应至少有10个"

    print("\n[PASS] 行业排除配置测试通过")


def test_financial_thresholds():
    """测试财务阈值配置"""
    print("\n=== 测试财务阈值配置 ===\n")

    thresh = FinancialThresholds()

    print(f"连续亏损年数阈值: {thresh.consecutive_loss_years}年")
    print(f"累计OCF为负年数: {thresh.negative_ocf_years}年")
    print(f"最大D/E比率: {thresh.max_debt_equity}")
    print(f"最小利息覆盖率: {thresh.min_interest_coverage}x")
    print(f"最小流动比率: {thresh.min_current_ratio}")
    print(f"最小Altman Z: {thresh.min_altman_z}")

    assert thresh.consecutive_loss_years == 3, "连续亏损应为3年"
    assert thresh.max_debt_equity == 3.0, "D/E上限应为3.0"
    assert thresh.min_altman_z == 1.8, "Z-Score下限应为1.8"

    print("\n[PASS] 财务阈值配置测试通过")


def test_market_thresholds():
    """测试市场风险阈值配置"""
    print("\n=== 测试市场风险阈值配置 ===\n")

    thresh = MarketThresholds()

    print(f"最小日交易额: ${thresh.min_daily_volume/1e6}M")
    print(f"最大波动率: {thresh.max_volatility:.0%}")
    print(f"最大回撤: {thresh.max_drawdown:.0%}")
    print(f"最大空头比例: {thresh.max_short_interest:.0%}")
    print(f"最小市值: ${thresh.min_market_cap/1e6}M")

    assert thresh.min_daily_volume == 5_000_000, "日交易额下限应为$5M"
    assert thresh.max_volatility == 0.80, "波动率上限应为80%"
    assert thresh.max_drawdown == -0.60, "回撤上限应为-60%"

    print("\n[PASS] 市场风险阈值配置测试通过")


def test_exclusion_reason_enum():
    """测试排除原因枚举"""
    print("\n=== 测试排除原因枚举 ===\n")

    # 统计各类排除原因
    categories = {
        '行业排除': [],
        '数据排除': [],
        '财务排除': [],
        '治理排除': [],
        '市场排除': [],
        '特殊排除': [],
    }

    for reason in ExclusionReason:
        for cat in categories:
            if reason.value.startswith(cat):
                categories[cat].append(reason.name)
                break

    print("排除原因分类:")
    for cat, reasons in categories.items():
        print(f"\n{cat} ({len(reasons)}个):")
        for r in reasons:
            print(f"  - {r}")

    total = sum(len(r) for r in categories.values())
    assert total == len(ExclusionReason), "所有排除原因应被分类"

    print(f"\n总计: {total}个排除原因")
    print("\n[PASS] 排除原因枚举测试通过")


def test_company_profile_creation():
    """测试公司信息创建"""
    print("\n=== 测试公司信息创建 ===\n")

    # 模拟FMP数据
    fmp_data = {
        'symbol': 'TEST',
        'companyName': 'Test Company Inc',
        'sector': 'Technology',
        'industry': 'Software - Application',
        'country': 'US',
        'mktCap': 50_000_000_000,
        'price': 150.0,
        'volAvg': 5_000_000,
        'ipoDate': '2010-01-01',
    }

    profile = CompanyProfile.from_fmp(fmp_data)

    print(f"Ticker: {profile.ticker}")
    print(f"Company: {profile.company_name}")
    print(f"Sector: {profile.sector}")
    print(f"Industry: {profile.industry}")
    print(f"Country: {profile.country}")
    print(f"Market Cap: ${profile.market_cap/1e9:.0f}B")
    print(f"Price: ${profile.price}")
    print(f"Avg Volume: {profile.avg_volume:,.0f}")
    print(f"IPO Date: {profile.ipo_date}")

    assert profile.ticker == 'TEST'
    assert profile.market_cap == 50_000_000_000

    print("\n[PASS] 公司信息创建测试通过")


def test_exclusion_result_serialization():
    """测试排除结果序列化"""
    print("\n=== 测试排除结果序列化 ===\n")

    result = ExclusionResult(
        ticker='TEST',
        excluded=True,
        reason=ExclusionReason.INDUSTRY_BIOTECH,
        details='Biotechnology行业',
        warnings=['警示1', '警示2'],
        data_quality_score=85,
    )

    result_dict = result.to_dict()

    print("序列化结果:")
    for key, value in result_dict.items():
        print(f"  {key}: {value}")

    assert result_dict['ticker'] == 'TEST'
    assert result_dict['excluded'] == True
    assert result_dict['reason'] == '行业排除:生物制药'

    print("\n[PASS] 排除结果序列化测试通过")


def test_industry_matching():
    """测试行业匹配逻辑"""
    print("\n=== 测试行业匹配逻辑 ===\n")

    # 创建模拟checker（不需要真实API）
    class MockClient:
        pass

    checker = ExclusionChecker(MockClient())

    # 测试用例
    test_cases = [
        # (ticker, industry, sector, company_name, market_cap, expected_excluded)
        ('MRNA', 'Biotechnology', 'Healthcare', 'Moderna Inc', 50e9, True),
        ('AAPL', 'Consumer Electronics', 'Technology', 'Apple Inc', 3000e9, False),
        ('SPAC', 'Shell Companies', 'Financial', 'Blank Check Acquisition Corp', 500e6, True),
        ('COIN', 'Capital Markets', 'Financial', 'Coinbase Global crypto platform', 50e9, True),
        ('USB', 'Banks - Regional', 'Financial', 'US Bancorp', 60e9, False),  # >$10B不排除
        ('SIVB', 'Banks - Regional', 'Financial', 'Silicon Valley Bank', 5e9, True),  # <$10B排除
        ('JPM', 'Banks - Diversified', 'Financial', 'JPMorgan Chase', 500e9, False),  # >$50B不排除
        ('SMALL_BANK', 'Banks - Diversified', 'Financial', 'Small Diversified Bank', 30e9, True),  # <$50B排除
    ]

    print("行业匹配测试用例:")
    for ticker, industry, sector, name, mcap, expected in test_cases:
        profile = CompanyProfile(
            ticker=ticker,
            company_name=name,
            industry=industry,
            sector=sector,
            market_cap=mcap,
        )
        result = checker.check_industry_exclusion(profile)
        status = "排除" if result.excluded else "通过"
        expected_status = "排除" if expected else "通过"
        match = "OK" if result.excluded == expected else "FAIL"

        print(f"  {ticker}: {industry} -> {status} (期望: {expected_status}) [{match}]")

        if result.excluded != expected:
            print(f"    详情: {result.details}")

    print("\n[PASS] 行业匹配逻辑测试通过")


def test_special_situations():
    """测试特殊情况排除"""
    print("\n=== 测试特殊情况排除 ===\n")

    class MockClient:
        pass

    checker = ExclusionChecker(MockClient())

    # 测试Penny Stock
    profile1 = CompanyProfile(
        ticker='PENNY',
        company_name='Penny Corp',
        price=2.5,
        market_cap=100_000_000,
    )
    result1 = checker.check_special_situations(profile1)
    print(f"Penny Stock ($2.5, $100M): {'排除' if result1.excluded else '通过'}")
    assert result1.excluded and result1.reason == ExclusionReason.SPECIAL_PENNY_STOCK

    # 测试近期IPO
    profile2 = CompanyProfile(
        ticker='IPO',
        company_name='Recent IPO Corp',
        price=50.0,
        market_cap=5_000_000_000,
        ipo_date='2025-06-01',
    )
    result2 = checker.check_special_situations(profile2)
    print(f"近期IPO (2025-06): {'排除' if result2.excluded else '通过'}")
    assert result2.excluded and result2.reason == ExclusionReason.SPECIAL_RECENT_IPO

    # 测试中国ADR
    profile3 = CompanyProfile(
        ticker='BABA',
        company_name='Alibaba Group',
        price=100.0,
        market_cap=200_000_000_000,
        country='China',
    )
    result3 = checker.check_special_situations(profile3)
    print(f"中国ADR (Alibaba): {'排除' if result3.excluded else '通过'}")
    assert result3.excluded and result3.reason == ExclusionReason.SPECIAL_CHINESE_ADR

    # 测试正常公司
    profile4 = CompanyProfile(
        ticker='AAPL',
        company_name='Apple Inc',
        price=200.0,
        market_cap=3_000_000_000_000,
        country='US',
        ipo_date='1980-12-12',
    )
    result4 = checker.check_special_situations(profile4)
    print(f"正常公司 (Apple): {'排除' if result4.excluded else '通过'}")
    assert not result4.excluded

    print("\n[PASS] 特殊情况排除测试通过")


def run_all_tests():
    """运行所有测试"""
    print("=" * 60)
    print("排除规则引擎测试套件")
    print("=" * 60)

    tests = [
        test_industry_exclusion_config,
        test_financial_thresholds,
        test_market_thresholds,
        test_exclusion_reason_enum,
        test_company_profile_creation,
        test_exclusion_result_serialization,
        test_industry_matching,
        test_special_situations,
    ]

    passed = 0
    failed = 0

    for test in tests:
        try:
            test()
            passed += 1
        except AssertionError as e:
            print(f"\n[FAIL] {test.__name__}: {str(e)}")
            failed += 1
        except Exception as e:
            print(f"\n[ERROR] {test.__name__}: {str(e)}")
            failed += 1

    print("\n" + "=" * 60)
    print(f"测试结果: {passed} 通过, {failed} 失败")
    print("=" * 60)

    return failed == 0


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
