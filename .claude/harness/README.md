# Investment Harness System v1.0

> **从"分析工具"到"投资系统"的进化**
>
> 基于5篇Anthropic harness设计文章的洞见，专为投资研究特化的harness架构

## 🎯 核心理念

**传统分析工具的局限**:
- 被动响应用户请求
- 静态分析框架
- 忽视不确定性管理
- 缺乏成本意识
- 无实时市场适应

**投资harness系统的进化**:
- 主动市场感知
- 动态方法调整
- 拥抱不确定性
- 智能成本控制
- 合规风险防护

## 🏗️ 系统架构

### 四大核心模块

```
InvestmentHarnessController
├── UncertaintyManager      # 不确定性是特征，不是bug
├── MarketRegimeDetector    # 实时环境感知与权重调整
├── CostOptimizer          # 智能成本控制($20K教训)
└── ComplianceLayer        # 监管合规与道德约束
```

### 1. 不确定性管理 (`uncertainty_manager.py`)

**核心原则**: 投资分析中，不确定性是特征，不是bug

```python
from claude.harness import InvestmentUncertaintyManager

um = InvestmentUncertaintyManager("AAPL", "analysis_session_1")

# 处理数据失败 → 智能fallback，而非分析停止
result = um.handle_data_failure("fmp_data", "API rate limit exceeded")
# 返回: {"fallback_options": ["yfinance_backup", "sec_filings"], ...}

# 处理分析矛盾 → 预期差机会，而非错误
contradiction = um.handle_contradiction(
    "DCF suggests $180",
    "P/E suggests $220",
    severity=0.4
)
# 返回: {"expectation_gap_potential": True, "next_steps": [...]}

# 评估整体置信度
assessment = um.assess_overall_analysis_confidence()
# 返回: {"overall_confidence": 0.65, "quality_grade": "B"}
```

**支持的不确定性类型**:
- `DATA_MISSING`: 数据缺失 → fallback策略
- `DATA_CONFLICT`: 数据冲突 → 多源验证
- `ANALYSIS_CONTRADICTION`: 分析矛盾 → 预期差探索
- `LOW_CONFIDENCE`: 低置信度 → 概率加权
- `REGIME_UNCERTAINTY`: 市场制度变化 → 方法调整

### 2. 市场制度检测 (`market_regime_detector.py`)

**核心能力**: 实时感知市场环境变化，动态调整分析权重

```python
from claude.harness import MarketRegimeDetector

detector = MarketRegimeDetector()

# 添加市场信号
detector.add_signal(
    RegimeIndicator.VOLATILITY_SPIKE,
    strength=0.8,
    direction="negative",
    description="VIX spiked to 35 (90th percentile)"
)

# 评估当前制度
context = detector.assess_current_regime()
print(f"Current regime: {context.current_regime}")  # CRISIS_MODE
print(f"Confidence: {context.regime_confidence}")   # 0.85

# 获取制度对应的分析权重
weights = detector.get_analysis_weights_for_regime()
# Crisis模式: {"liquidity": 0.4, "quality": 0.4, "valuation": 0.2}
```

**制度检测能力**:
- `CRISIS_MODE`: 危机时重视流动性和质量
- `BULL_GROWTH`: 牛市时重视成长性和可扩展性
- `BEAR_DEEP`: 熊市时重视生存能力和现金流
- `ROTATION`: 轮动时重视相对强度和板块动态

### 3. 成本优化 (`cost_optimizer.py`)

**灵感来源**: C编译器项目$20,000教训 - 每个token都有ROI考量

```python
from claude.harness import InvestmentCostOptimizer

optimizer = InvestmentCostOptimizer()

# 评估分析复杂度
complexity, scores = optimizer.assess_analysis_complexity("AAPL", company_data)
print(f"Complexity: {complexity}")  # MODERATE

# 推荐分析层级(基于复杂度+预算+紧急度)
tier, reason = optimizer.recommend_analysis_tier(
    complexity,
    urgency="normal",
    budget_limit=500
)
print(f"Recommended: {tier}")  # TIER_2_STANDARD

# 创建成本估算
estimate = optimizer.create_cost_estimate("AAPL", tier, scores)
print(f"Estimated cost: ${estimate.estimated_cost:.2f}")  # $35.50
print(f"Max cost: ${estimate.max_cost:.2f}")             # $75.00
```

**智能层级路由**:
- `TIER_1_QUICK`: 简单分析，$5-10，15分钟
- `TIER_2_STANDARD`: 标准分析，$50-100，2小时
- `TIER_3_DEEP`: 深度分析，$200-500，8小时
- `TIER_3_PARALLEL`: 并行专家团队，$500-2000，12小时

### 4. 合规检查 (`compliance_layer.py`)

**核心责任**: 投资建议具有法律责任，AI必须内置合规防护

```python
from claude.harness import InvestmentComplianceChecker

checker = InvestmentComplianceChecker()

# 全面合规检查
report = checker.comprehensive_compliance_check(
    content=analysis_text,
    document_id="AAPL_analysis_20240330"
)

print(f"Status: {report.compliance_status}")     # PASS/WARNING/FAIL
print(f"Risk Score: {report.overall_risk_score}") # 15.5/100
print(f"Critical Issues: {report.critical_issues}") # 0

# 生成合规摘要
summary = checker.generate_compliance_summary(report)
```

**检查维度**:
- 重大非公开信息检测
- 利益冲突披露检查
- 误导性陈述识别
- 投资建议用词规范
- 风险披露充分性
- AI偏见指标监控

## 🚀 快速开始

### 基础用法

```python
from claude.harness import create_investment_harness

# 创建harness实例
harness = create_investment_harness("AAPL", "tier_2_standard")

# 初始化分析环境
company_data = {
    'business_segments': ['iPhone', 'Services', 'Mac'],
    'industry': 'Technology',
    'market_cap': 2_800_000_000_000,
    'analyst_coverage': 35
}

init_result = harness.initialize_analysis(
    company_data,
    urgency="normal",
    budget_limit=500
)

# 追踪分析进度
progress = harness.track_analysis_progress(
    phase="Phase_1",
    tokens_used=50000,
    tools_called=["fmp_data", "baggers_summary"]
)

# 处理工具失败
if api_error:
    fallback = harness.handle_tool_failure("fmp_data", "Rate limit exceeded")
    print(f"Fallback options: {fallback['fallback_options']}")

# 最终完成分析
final_result = harness.finalize_analysis(final_content)
```

### 配置定制

```python
from claude.harness.config import create_custom_config, HarnessMode

# 成本优化模式
config = create_custom_config(
    mode=HarnessMode.COST_OPTIMIZED,
    max_budget=200,
    min_confidence=0.4,
    enable_parallel_agents=False
)

# 研究密集模式
research_config = create_custom_config(
    mode=HarnessMode.RESEARCH_INTENSIVE,
    max_budget=2000,
    min_confidence=0.2,
    enable_parallel_agents=True
)
```

## 🔧 集成到现有框架

### Step 1: 修改Tier 3分析启动

```bash
# 原来的tier3_launch.sh
bash scripts/tier3_launch.sh AAPL TECHNOLOGY

# 新的harness集成版本
bash scripts/tier3_harness_launch.sh AAPL TECHNOLOGY --mode=production
```

### Step 2: Phase级别集成

在每个Phase开始时：

```python
# Phase开始前
harness_status = harness.get_current_status()
if harness_status['budget_status']['status'] == 'critical':
    # 触发成本优化
    optimizations = harness.suggest_cost_optimization(session_id, current_phase)

# Phase执行中
progress = harness.track_analysis_progress(phase, tokens, tools)

# Phase完成后
quality = harness.assess_analysis_quality()
if quality['overall_confidence'] < 0.3:
    # 触发不确定性处理流程
```

### Step 3: 输出检查集成

```python
# Phase 5组装前
compliance_result = harness.compliance_check(final_content)
if compliance_result['compliance_status'] == 'FAIL':
    # 阻止发布，要求修改

# 添加自动生成的披露声明
uncertainty_disclosure = harness.uncertainty_manager.generate_uncertainty_disclosure()
```

## 📊 成本控制示例

### 预算敏感的分析路由

```python
# 场景1: 预算充足($1000) + 复杂公司
complexity = AnalysisComplexity.VERY_COMPLEX
tier, reason = optimizer.recommend_analysis_tier(complexity, budget_limit=1000)
# 返回: TIER_3_PARALLEL, "Complex analysis with sufficient budget"

# 场景2: 预算紧张($100) + 复杂公司
tier, reason = optimizer.recommend_analysis_tier(complexity, budget_limit=100)
# 返回: TIER_2_STANDARD, "Budget constraint forces tier downgrade"

# 场景3: 紧急分析 + 复杂公司
tier, reason = optimizer.recommend_analysis_tier(complexity, urgency="high")
# 返回: TIER_3_DEEP, "High urgency avoids parallel complexity"
```

### 实时成本监控

```python
# 追踪session成本
session_id = optimizer.start_session_tracking("AAPL", AnalysisTier.TIER_2_STANDARD)

# 每次工具调用后
optimizer.track_tool_usage(session_id, "fmp_data", execution_time=2.5)
budget_status = optimizer.check_budget_status(session_id, max_budget=100)

if budget_status['status'] == 'warning':
    # 预算预警: 70%用尽
    suggestions = optimizer.suggest_cost_optimization(session_id, current_phase)
    # 建议: ["Use cached industry analysis", "Focus on key drivers only"]

elif budget_status['status'] == 'critical':
    # 预算告急: 90%用尽
    # 自动降级到更简单的分析方法
```

## 🔄 与现有技能的集成

### skill触发前检查

```python
# 在调用expensive skill前
if harness.cost_session_id:
    budget_status = harness.check_budget_status(max_budget)
    if budget_status['status'] == 'critical':
        # 跳过非关键skill，或使用轻量级替代
        use_lightweight_alternative = True
```

### 动态skill选择

```python
# 根据市场制度调整skill权重
market_context = harness.regime_detector.assess_current_regime()

if market_context.current_regime == MarketRegime.CRISIS_MODE:
    # 危机模式: 重点使用流动性和质量评估skill
    skills = ["liquidity-analyzer", "quality-assessor", "stress-tester"]
elif market_context.current_regime == MarketRegime.BULL_GROWTH:
    # 增长模式: 重点使用成长性和可扩展性skill
    skills = ["growth-analyzer", "scalability-assessor", "tam-evaluator"]
```

## 🏆 预期效果

### 成本效益优化

- **智能层级路由**: 避免过度分析，节约30-50%成本
- **实时预算控制**: 防止预算超支，提供优化建议
- **失败容错**: 工具失败时智能降级，不中断分析

### 分析质量提升

- **不确定性透明化**: 明确标注置信度和局限性
- **市场适应性**: 根据环境动态调整分析重点
- **合规风险防护**: 自动检测并修正合规问题

### 操作效率提升

- **主动异常处理**: 预期并处理常见失败模式
- **智能fallback**: 数据源失败时自动切换备用方案
- **质量门控**: 自动评估分析质量，防止低质量输出

## 🔮 未来扩展 (P1阶段)

- **Always-On监控**: 持续监控市场变化，主动触发分析更新
- **并行专家团队**: 4-agent协同分析，提升深度和效率
- **智能缓存**: 复用历史分析组件，降低重复成本
- **学习优化**: 从历史session学习，持续优化参数

---

## 📞 Support

如有问题或建议，请查看现有框架文档:
- `docs/deep_dive_protocol.md` - Tier 3分析协议
- `docs/quality_standard_4.4.md` - 质量标准
- `.claude/rules/` - 铁律详情

Harness系统是现有框架的增强，不是替代。两者协同工作，共同实现投资分析的智能化和专业化。