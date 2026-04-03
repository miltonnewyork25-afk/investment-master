# Phase启动时的Harness集成

```python
# 在每个Phase开始前调用
def phase_start_with_harness(phase_name, harness, current_context):
    '''Phase启动时的harness检查和准备'''

    # 1. 检查预算状态
    budget_status = harness.get_current_status()['budget_status']
    if budget_status and budget_status['status'] == 'critical':
        print("⚠️ Budget critical - applying cost optimization")
        optimizations = harness.cost_optimizer.suggest_cost_optimization(
            harness.cost_session_id, phase_name
        )
        for opt in optimizations:
            print(f"  - {opt['suggestion']}")

    # 2. 获取市场制度调整
    market_context = harness.regime_detector.assess_current_regime()
    adjustments = harness.regime_detector.should_adjust_methodology(market_context)
    if adjustments:
        print(f"📈 Market regime: {market_context.current_regime.value}")
        print("Methodology adjustments:")
        for method, adjustment in adjustments.items():
            print(f"  - {method}: {adjustment}")

    # 3. 检查未解决的不确定性
    uncertainty_assessment = harness.uncertainty_manager.assess_overall_analysis_confidence()
    if uncertainty_assessment['overall_confidence'] < 0.5:
        print(f"⚠️ Low analysis confidence: {uncertainty_assessment['overall_confidence']:.1%}")
        print(f"Active uncertainties: {uncertainty_assessment['active_uncertainties']}")

    return {
        'budget_status': budget_status,
        'market_adjustments': adjustments,
        'confidence_level': uncertainty_assessment['overall_confidence']
    }
```
