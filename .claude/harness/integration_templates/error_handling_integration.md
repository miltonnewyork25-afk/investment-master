# 错误处理的Harness集成

```python
def handle_error_with_harness(harness, tool_name, error_details, current_phase):
    '''使用harness处理分析中的错误'''

    print(f"🔧 Harness handling error in {tool_name}: {error_details}")

    # 1. 通过不确定性管理器处理
    recovery_result = harness.handle_tool_failure(tool_name, error_details)

    print(f"Recovery strategy: {recovery_result['recommended_action']}")
    print(f"Available fallbacks: {recovery_result.get('fallback_options', [])}")

    # 2. 如果有fallback选项，尝试执行
    fallback_options = recovery_result.get('fallback_options', [])
    for i, option in enumerate(fallback_options[:2]):  # 尝试前两个fallback
        print(f"Trying fallback {i+1}: {option}")
        # 这里实际执行fallback策略
        # 示例: 如果是数据源失败，切换到备用数据源

    # 3. 记录错误处理到成本追踪
    if harness.cost_session_id:
        harness.cost_optimizer.track_tool_usage(
            harness.cost_session_id, f"{tool_name}_error_recovery"
        )

    return recovery_result

def handle_contradiction_with_harness(harness, analysis_a, analysis_b, severity=0.5):
    '''处理分析矛盾'''

    contradiction_result = harness.handle_analysis_contradiction(
        analysis_a, analysis_b, severity
    )

    if contradiction_result.get('expectation_gap_potential'):
        print("💡 Contradiction identified as potential expectation gap opportunity")
        print("Next steps:")
        for step in contradiction_result.get('next_steps', []):
            print(f"  - {step}")

    return contradiction_result
```
