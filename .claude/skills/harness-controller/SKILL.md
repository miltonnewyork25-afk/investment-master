# Harness Controller Skill

智能投资harness控制技能，提供四大核心能力：不确定性管理、市场制度检测、成本优化、合规检查。

## 核心功能

### 1. 不确定性处理
- 数据失败时自动fallback
- 分析矛盾转化为预期差机会
- 低置信度情况下的概率加权

### 2. 市场制度感知
- 实时检测市场环境变化
- 动态调整分析权重
- 制度变化的方法论调整

### 3. 成本智能控制
- 基于复杂度的层级路由
- 实时预算监控和预警
- 成本优化建议生成

### 4. 合规风险防护
- 自动检测合规问题
- 生成修正建议
- 披露声明生成

## 使用场景

1. **分析启动时**: 初始化harness环境，评估复杂度，设定预算
2. **工具失败时**: 智能fallback，避免分析中断
3. **Phase完成时**: 质量评估，成本监控，合规检查
4. **最终输出时**: 生成不确定性披露，合规摘要

## 调用方式

```python
# 初始化harness
from claude.harness import create_investment_harness

harness = create_investment_harness("AAPL", "tier_2_standard")

# 处理不确定性
if data_missing:
    result = harness.handle_tool_failure("fmp_data", error_message)

# 追踪进度和成本
progress = harness.track_analysis_progress(phase, tokens, tools)

# 最终检查
compliance = harness.compliance_check(final_content)
```

## 输出特点

- **成本透明**: 每个阶段的token使用和成本估算
- **质量量化**: 置信度评分和不确定性程度
- **合规清单**: 风险点识别和修正建议
- **市场感知**: 当前制度和权重调整建议

---

**注意**: 此技能是框架增强，与现有Phase流程协同工作，不是替代关系。
