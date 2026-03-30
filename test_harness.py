#!/usr/bin/env python3
"""
Harness System Test
===================

测试harness系统的基本功能
"""

import sys
sys.path.insert(0, '.claude')

try:
    from harness import create_investment_harness

    print("🚀 Testing Investment Harness System")

    # 测试创建harness
    harness = create_investment_harness('AAPL', 'tier_2_standard')
    print(f'✅ Created harness for AAPL')
    print(f'Session ID: {harness.session_id}')

    # 测试获取状态
    status = harness.get_current_status()
    print(f'Current tier: {status["analysis_tier"]}')
    print(f'Current phase: {status["current_phase"]}')

    # 测试模拟初始化
    company_data = {
        'business_segments': ['iPhone', 'Services', 'Mac', 'iPad'],
        'industry': 'Technology',
        'market_cap': 2_800_000_000_000,
        'analyst_coverage': 35
    }

    print("\n📊 Testing analysis initialization...")
    init_result = harness.initialize_analysis(company_data, urgency="normal", budget_limit=500)

    if init_result['status'] == 'initialized':
        print('✅ Initialization successful')

        complexity = init_result['complexity_assessment']
        print(f"Complexity level: {complexity['level']}")
        print(f"Recommended tier: {complexity['recommended_tier']}")

        cost_plan = init_result['cost_planning']
        print(f"Estimated cost: ${cost_plan['estimated_cost']:.2f}")
        print(f"Max cost: ${cost_plan['max_cost']:.2f}")
        print(f"Time estimate: {cost_plan['time_estimate_hours']:.1f} hours")

        market = init_result['market_context']
        print(f"Market regime: {market['current_regime']}")
        print(f"Regime confidence: {market['regime_confidence']:.1%}")
    else:
        print(f"❌ Initialization failed: {init_result.get('error', 'Unknown error')}")

    # 测试不确定性处理
    print("\n🔧 Testing uncertainty handling...")
    uncertainty_result = harness.handle_tool_failure("fmp_data", "API rate limit exceeded")
    print(f"Fallback strategy: {uncertainty_result['recommended_action']}")
    print(f"Fallback options: {uncertainty_result.get('fallback_options', [])}")

    # 测试进度追踪
    print("\n📈 Testing progress tracking...")
    progress = harness.track_analysis_progress("Phase_1", 50000, ["fmp_data", "baggers_summary"])
    print(f"Tokens tracked: {progress['tokens_used']:,}")
    print(f"Tools called: {progress['tools_called']}")

    # 测试合规检查
    print("\n⚖️ Testing compliance check...")
    test_content = "我们推荐立即买入这只股票，因为它绝对会上涨50%。"
    compliance = harness.compliance_check(test_content)
    print(f"Compliance status: {compliance['compliance_status']}")
    print(f"Risk score: {compliance['risk_score']:.1f}/100")
    print(f"Critical issues: {compliance['critical_issues']}")

    print("\n🎉 All harness tests completed successfully!")

except ImportError as e:
    print(f"❌ Import failed: {e}")
except Exception as e:
    print(f"❌ Test failed: {e}")
    import traceback
    traceback.print_exc()