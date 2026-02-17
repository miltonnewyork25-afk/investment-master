#!/usr/bin/env python3
"""
APP数据一致性验证测试
验证现有APP报告的数据问题
"""

import json

# APP案例的模拟数据（基于实际MCP调用结果）
app_data_sources = {
    "quote": [
        {
            "symbol": "APP",
            "name": "AppLovin Corporation",
            "price": 390.665,
            "marketCap": 132027195154,  # $132.03B
            "timestamp": 1771016403,
            "exchange": "NASDAQ"
        }
    ],
    "key-metrics": [
        {
            "symbol": "APP",
            "date": "2025-12-31",
            "fiscalYear": "2025",
            "marketCap": 228277413420.0,  # $228.28B
            "evToSales": 41.84398837232428,
            "returnOnEquity": 1.5617165369097705
        }
    ],
    "income": [
        {
            "symbol": "APP",
            "date": "2025-12-31",
            "netIncome": 3330000000,  # $3.33B
            "revenue": 5480716800
        }
    ]
}

def test_app_validation():
    """测试APP数据验证"""
    print("🔍 APP Data Consistency Validation Test")
    print("=" * 50)

    # 提取关键数据
    quote_market_cap = app_data_sources["quote"][0]["marketCap"]
    quote_price = app_data_sources["quote"][0]["price"]

    metrics_market_cap = app_data_sources["key-metrics"][0]["marketCap"]

    net_income = app_data_sources["income"][0]["netIncome"]

    print(f"📊 Data Sources Comparison:")
    print(f"   Quote Market Cap:     ${quote_market_cap:,.0f}     (${quote_market_cap/1e9:.1f}B)")
    print(f"   Key-Metrics Cap:      ${metrics_market_cap:,.0f}   (${metrics_market_cap/1e9:.1f}B)")
    print(f"   Price:                ${quote_price:.2f}")
    print(f"   Net Income (TTM):     ${net_income:,.0f}        (${net_income/1e9:.1f}B)")
    print()

    # 1. 市值一致性检查
    print("🔧 Validation #1: Market Cap Consistency")
    market_cap_deviation = abs(quote_market_cap - metrics_market_cap) / metrics_market_cap
    print(f"   Deviation: {market_cap_deviation * 100:.1f}%")

    if market_cap_deviation > 0.1:  # 10%阈值
        print("   ❌ CRITICAL: Significant market cap discrepancy detected!")
        print(f"      This is the root cause of APP report errors")
    else:
        print("   ✅ PASS: Market caps are consistent")
    print()

    # 2. P/E计算验证
    print("🔧 Validation #2: P/E Calculation")

    # 基于不同市值计算P/E
    pe_from_quote = quote_market_cap / net_income
    pe_from_metrics = metrics_market_cap / net_income

    print(f"   P/E (Quote data):     {pe_from_quote:.1f}x")
    print(f"   P/E (Metrics data):   {pe_from_metrics:.1f}x")

    pe_deviation = abs(pe_from_quote - pe_from_metrics) / pe_from_metrics
    print(f"   P/E Deviation:        {pe_deviation * 100:.1f}%")

    if pe_deviation > 0.2:  # 20%阈值
        print("   ❌ CRITICAL: P/E calculation inconsistency!")
        print(f"      APP report showed 68.5x → 39.6x correction")
        print(f"      This matches our validation: {pe_from_metrics:.1f}x → {pe_from_quote:.1f}x")
    else:
        print("   ✅ PASS: P/E calculations are consistent")
    print()

    # 3. 推荐解决方案
    print("💡 Recommendations:")
    print(f"   ✅ Use Quote data as baseline: ${quote_market_cap:,.0f} (${quote_market_cap/1e9:.1f}B)")
    print(f"   ✅ Correct P/E ratio: {pe_from_quote:.1f}x")
    print(f"   ✅ Flag key-metrics as stale (year-end vs current)")
    print()

    # 4. 影响评估
    print("📈 Impact Assessment:")
    estimated_shares = quote_market_cap / quote_price
    historical_price = metrics_market_cap / estimated_shares
    price_decline = (historical_price - quote_price) / historical_price

    print(f"   Estimated Shares Outstanding: {estimated_shares/1e6:.1f}M")
    print(f"   Implied Historical Price: ${historical_price:.2f}")
    print(f"   Price Decline: {price_decline * 100:.1f}%")
    print(f"   This explains the market cap discrepancy")
    print()

    # 5. 验证结果总结
    critical_issues = 0
    if market_cap_deviation > 0.1:
        critical_issues += 1
    if pe_deviation > 0.2:
        critical_issues += 1

    print("🏁 Validation Summary:")
    if critical_issues == 0:
        print("   ✅ All validations passed")
        return 0
    else:
        print(f"   ❌ {critical_issues} critical issues detected")
        print("   📋 This matches the APP report v1.1 → v1.2 fixes:")
        print("      • $228B → $132B market cap correction")
        print("      • P/E 68.5x → 39.6x recalculation")
        print("      • 103 places required data backflow")
        return 1

if __name__ == '__main__':
    exit_code = test_app_validation()
    exit(exit_code)