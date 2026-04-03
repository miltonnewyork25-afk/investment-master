# Phase完成时的Harness集成

```python
def phase_end_with_harness(phase_name, harness, content, tokens_used, tools_used):
    '''Phase完成时的harness检查和记录'''

    # 1. 追踪进度和成本
    progress = harness.track_analysis_progress(
        phase=phase_name,
        tokens_used=tokens_used,
        tools_called=tools_used
    )

    print(f"📊 Phase {phase_name} completed:")
    print(f"  - Tokens used: {tokens_used:,}")
    print(f"  - Tools called: {len(tools_used)}")
    if 'budget_status' in progress:
        budget = progress['budget_status']
        print(f"  - Budget utilization: {budget['utilization']:.1%}")
        if budget['status'] != 'normal':
            print(f"  - Budget status: {budget['status']}")

    # 2. 质量评估
    if phase_name in ['Phase_4', 'Phase_5']:  # 关键Phase质量检查
        quality = harness.assess_analysis_quality()
        print(f"  - Analysis confidence: {quality['overall_confidence']:.1%}")
        print(f"  - Quality grade: {quality['uncertainty_analysis']['quality_grade']}")

    # 3. 中期合规检查（如有内容）
    if content and len(content) > 10000:  # 超过10K字符时检查
        compliance_preview = harness.compliance_check(content[:5000], f"{phase_name}_preview")
        if compliance_preview['critical_issues'] > 0:
            print(f"⚠️ Compliance issues found: {compliance_preview['critical_issues']} critical")

    return {
        'progress': progress,
        'quality_check': quality if phase_name in ['Phase_4', 'Phase_5'] else None,
        'compliance_preview': compliance_preview if content else None
    }
```
