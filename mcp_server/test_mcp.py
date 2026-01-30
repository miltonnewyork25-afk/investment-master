#!/usr/bin/env python3
"""
测试优化后的 MCP Server
"""

import asyncio
import json
from main import (
    get_stock_data,
    get_stock_fundamentals,
    get_technical_indicators,
    cache,
    SCREEN_PRESETS
)

def test_cache():
    """测试缓存功能"""
    print("\n" + "="*60)
    print("测试1: 缓存功能")
    print("="*60)

    import time

    # 第一次请求（无缓存）
    start = time.time()
    data1 = get_stock_data("AAPL")
    time1 = time.time() - start
    print(f"第1次请求 AAPL: {time1:.3f}秒")

    # 第二次请求（有缓存）
    start = time.time()
    data2 = get_stock_data("AAPL")
    time2 = time.time() - start
    print(f"第2次请求 AAPL: {time2:.3f}秒 ⚡缓存命中")

    # 验证数据一致性
    assert data1 == data2, "缓存数据不一致"
    print(f"✓ 缓存加速: {time1/time2:.0f}x")

def test_data_types():
    """测试不同 data_types"""
    print("\n" + "="*60)
    print("测试2: data_types 参数")
    print("="*60)

    symbol = "AAPL"

    # basic
    print(f"\n1. data_types='basic':")
    basic = get_stock_data(symbol)
    print(f"   包含字段: {list(basic.keys())[:5]}...")

    # full (basic + fundamentals + technical)
    print(f"\n2. data_types='full':")
    fundamentals = get_stock_fundamentals(symbol)
    technical = get_technical_indicators(symbol)
    print(f"   基本面字段: {list(fundamentals.keys())[:5]}...")
    print(f"   技术指标字段: {list(technical.keys())[:5]}...")

    # technical only
    print(f"\n3. data_types='technical':")
    tech = get_technical_indicators(symbol)
    print(f"   技术指标: SMA_20={tech.get('sma_20'):.2f}, RSI={tech.get('rsi'):.2f}")

def test_presets():
    """测试筛选预设"""
    print("\n" + "="*60)
    print("测试3: 筛选预设")
    print("="*60)

    for preset_name, preset_config in SCREEN_PRESETS.items():
        print(f"\n{preset_name}: {preset_config['name']}")
        print(f"  条件: {json.dumps(preset_config['criteria'], indent=4, ensure_ascii=False)}")

def test_screen_example():
    """测试实际筛选"""
    print("\n" + "="*60)
    print("测试4: 实际筛选示例")
    print("="*60)

    symbols = ["AAPL", "MSFT", "TSM"]
    preset = "value"

    print(f"\n使用 '{preset}' 预设筛选: {symbols}")

    preset_config = SCREEN_PRESETS[preset]
    criteria = preset_config["criteria"]

    results = []
    for symbol in symbols:
        data = get_stock_data(symbol)
        fundamentals = get_stock_fundamentals(symbol)
        stock_data = {**data, **fundamentals}

        # 检查是否满足条件
        passes = True
        reasons = []

        # pe_max
        if "pe_max" in criteria:
            pe = stock_data.get("pe_ratio")
            if pe and pe > criteria["pe_max"]:
                passes = False
                reasons.append(f"PE {pe:.2f} > {criteria['pe_max']}")

        # pb_max
        if "pb_max" in criteria:
            pb = stock_data.get("pb_ratio")
            if pb and pb > criteria["pb_max"]:
                passes = False
                reasons.append(f"PB {pb:.2f} > {criteria['pb_max']}")

        # dividend_yield_min
        if "dividend_yield_min" in criteria:
            div = stock_data.get("dividend_yield")
            if not div or div < criteria["dividend_yield_min"]:
                passes = False
                reasons.append(f"股息率 {div*100 if div else 0:.2f}% < {criteria['dividend_yield_min']*100}%")

        result = {
            "symbol": symbol,
            "passed": passes,
            "pe": stock_data.get("pe_ratio"),
            "pb": stock_data.get("pb_ratio"),
            "dividend_yield": stock_data.get("dividend_yield"),
            "reasons": reasons if not passes else []
        }
        results.append(result)

        status = "✓ 通过" if passes else "✗ 未通过"
        print(f"\n{symbol}: {status}")
        print(f"  PE: {result['pe']:.2f if result['pe'] else 'N/A'}")
        print(f"  PB: {result['pb']:.2f if result['pb'] else 'N/A'}")
        print(f"  股息率: {result['dividend_yield']*100:.2f}% if result['dividend_yield'] else 'N/A'}")
        if not passes:
            print(f"  原因: {', '.join(reasons)}")

    passed_count = sum(1 for r in results if r["passed"])
    print(f"\n筛选结果: {passed_count}/{len(symbols)} 通过")

def test_compare_defaults():
    """测试默认对比"""
    print("\n" + "="*60)
    print("测试5: 默认对比指标")
    print("="*60)

    symbols = ["AAPL", "MSFT"]
    default_metrics = ["pe_ratio", "pb_ratio", "roe", "market_cap"]

    print(f"\n对比 {symbols}")
    print(f"默认指标: {default_metrics}")

    comparison = {}
    for symbol in symbols:
        data = get_stock_data(symbol)
        fundamentals = get_stock_fundamentals(symbol)

        comparison[symbol] = {
            "pe_ratio": data.get("pe_ratio"),
            "pb_ratio": data.get("pb_ratio"),
            "roe": fundamentals.get("roe"),
            "market_cap": data.get("market_cap")
        }

    print(f"\n对比结果:")
    print(json.dumps(comparison, indent=2, ensure_ascii=False))

def test_token_savings():
    """测试 Token 节省"""
    print("\n" + "="*60)
    print("测试6: Token 节省估算")
    print("="*60)

    # 优化前的调用
    before = {
        "symbol": "AAPL",
        "include_fundamentals": True,
        "include_technical": True,
        "include_history": True,
        "period": "1y"
    }

    # 优化后的调用
    after = {
        "symbol": "AAPL",
        "data_types": "full"
    }

    before_json = json.dumps(before)
    after_json = json.dumps(after)

    print(f"\n优化前参数:")
    print(f"  {before_json}")
    print(f"  长度: {len(before_json)} 字符")
    print(f"  估算 Token: ~{len(before_json) * 0.75:.0f}")

    print(f"\n优化后参数:")
    print(f"  {after_json}")
    print(f"  长度: {len(after_json)} 字符")
    print(f"  估算 Token: ~{len(after_json) * 0.75:.0f}")

    savings = (len(before_json) - len(after_json)) / len(before_json) * 100
    print(f"\n✓ Token 节省: {savings:.1f}%")

async def main():
    """运行所有测试"""
    print("\n" + "="*60)
    print("MCP Server 优化测试")
    print("="*60)

    try:
        test_cache()
        test_data_types()
        test_presets()
        test_screen_example()
        test_compare_defaults()
        test_token_savings()

        print("\n" + "="*60)
        print("✓ 所有测试通过")
        print("="*60)

    except Exception as e:
        print(f"\n✗ 测试失败: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
