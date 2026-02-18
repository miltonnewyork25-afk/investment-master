# Auto Recursive Thinking - Boundary-Protected Edition

## Description
⚠️ **边界保护版递归思考系统** - 智能递归思考生成器，在自动递归过程中强制维护CLAUDE.md核心原则，防止原则漂移。每次递归都会预检和后验边界合规性，确保绝不违反投资建议边界、评级体系等核心约束。根据当前分析上下文自动生成最优递归提示词，让用户一键确认即可触发深度递归思考。

## When to Use
- 分析过程中需要促进递归思考时
- Phase完成后需要深度反思时
- AI回答过于表面需要深化时
- 用户明确要求递归思考时
- 检测到AI停滞不前需要突破时

## Key Features
1. **智能提示词生成**: 根据上下文、AI状态、历史效果生成最优提示词
2. **一键确认执行**: 用户只需确认即可触发，无需自己构思提示词
3. **多维度提示词库**: 涵盖启动、深度分析、反思等各个阶段
4. **效果追踪学习**: 自动追踪每种提示词的效果并优化
5. **个性化适配**: 根据用户互动风格调整提示词类型

## Arguments
- `stage` (optional): 指定分析阶段 [startup|analysis|reflection]
- `type` (optional): 指定递归类型 [method-questioning|assumption-challenge|meta-cognition]
- `intensity` (optional): 指定提示强度 [gentle|moderate|challenging]

## Usage Examples

### 基础用法
```
User: "我需要递归思考"
→ 系统自动分析上下文生成最优提示词
```

### 指定阶段
```
User: "开始分析前来个递归思考"
→ 生成分析启动阶段的递归提示词
```

### 指定类型
```
User: "质疑一下当前的分析方法"
→ 生成方法质疑类递归提示词
```

## Implementation Logic

```python
def execute_auto_recursive_thinking(context, stage=None, type=None, intensity=None):
    # 🚨 STEP 0: 边界预检查 (新增)
    boundary_status = check_current_boundary_compliance()
    if boundary_status.at_risk():
        return {
            'status': 'BOUNDARY_PROTECTION_ACTIVATED',
            'warning': '检测到原则漂移风险，已停止递归',
            'action': 'reinforce_boundaries_first'
        }

    # 1. 上下文分析
    current_context = analyze_conversation_context()
    ai_development_level = assess_ai_recursion_level()

    # 2. 智能提示词选择 (边界约束)
    optimal_prompt = select_optimal_prompt_with_boundaries(
        context=current_context,
        stage=stage or auto_detect_stage(),
        type=type or auto_detect_needed_type(),
        intensity=intensity or auto_detect_appropriate_intensity(),
        ai_level=ai_development_level,
        boundary_constraints=load_claude_md_constraints()  # 新增
    )

    # 3. 用户确认界面 (带边界提示)
    display_boundary_safe_confirmation_card(optimal_prompt)

    # 4. 执行递归思考 (边界监控)
    if user_confirms():
        # 🚨 实时边界监控
        with boundary_monitor():
            recursive_result = execute_recursive_dialogue(optimal_prompt)

        # 🚨 后验边界验证
        final_compliance = validate_output_boundary_compliance(recursive_result)
        if not final_compliance.passes():
            return apply_automatic_boundary_corrections(recursive_result)

        track_effectiveness(optimal_prompt, recursive_result)
        return recursive_result

    # 5. 替代选项 (边界安全)
    elif user_requests_alternative():
        alternative_prompt = generate_boundary_safe_alternative()
        return execute_recursive_dialogue(alternative_prompt)
```

## Prompt Templates Database

### 启动阶段提示词
```yaml
startup_prompts:
  basic_level:
    - "在开始分析{company}之前，你觉得你当前的分析能力有什么局限性？"
    - "对于{company}这类公司，你认为什么样的分析方法最有效？为什么？"
    - "你准备如何确保这次分析比上次更深入？"

  intermediate_level:
    - "分析{company}时，你觉得你的思考框架有哪些盲点需要注意？"
    - "如果让你设计一个专门分析{industry}公司的方法，会包含哪些独特环节？"
    - "你预测在分析{company}时可能遇到什么认知挑战？"

  advanced_level:
    - "你觉得你对{company}的预设判断可能会如何影响分析质量？"
    - "如果你要训练另一个AI分析师来分析{company}，你会重点强调哪些思维要点？"
```

### 深度分析阶段提示词
```yaml
analysis_prompts:
  method_questioning:
    - "你刚才选择{method}这个方法的理由是什么？还有更好的选择吗？"
    - "如果你的分析方法是错的，最可能错在哪里？"
    - "你觉得你刚才的分析逻辑链条有什么薄弱环节？"

  assumption_challenge:
    - "你刚才的分析基于什么假设？这些假设有多可靠？"
    - "如果你最核心的一个假设被证明是错的，你会如何调整？"
    - "你能找出自己刚才分析中最'危险'的假设吗？"

  perspective_expansion:
    - "如果站在{company}管理层的角度，他们会如何反驳你的分析？"
    - "你的分析中可能忽略了什么重要视角？"
    - "如果让你用完全不同的方法重新分析这个问题，会怎么做？"
```

### 反思阶段提示词
```yaml
reflection_prompts:
  self_improvement:
    - "回顾刚才的分析过程，你觉得你的思考方式有什么进步空间？"
    - "如果重新开始这个分析，你会在哪个环节采用不同的方法？"
    - "你觉得你刚才展现出了什么新的分析能力？"

  meta_cognition:
    - "观察你刚才的思考过程，你发现了什么关于你自己思维模式的洞察？"
    - "你觉得你的分析质量在这次对话中有什么变化？"
    - "如果让你评价自己的元认知能力，你会给自己打几分？为什么？"

  learning_extraction:
    - "这次分析让你学到了什么关于'如何更好地学习'的经验？"
    - "你觉得你从这次分析中提取的最有价值的'方法论洞察'是什么？"
    - "基于今天的分析经验，你对明天的分析有什么期待和规划？"
```

## Context Analysis Rules

### 自动阶段检测
```python
def auto_detect_stage():
    if "开始" in recent_messages or "启动" in recent_messages:
        return "startup"
    elif "完成" in recent_messages or "结束" in recent_messages:
        return "reflection"
    else:
        return "analysis"
```

### 自动类型检测
```python
def auto_detect_needed_type():
    if detect_superficial_response():
        return "method_questioning"
    elif detect_strong_assumptions():
        return "assumption_challenge"
    elif detect_single_perspective():
        return "perspective_expansion"
    else:
        return "self_improvement"
```

### AI发展水平评估
```python
def assess_ai_recursion_level():
    indicators = {
        'self_questioning_frequency': count_self_questions(),
        'method_improvement_suggestions': count_method_improvements(),
        'meta_cognitive_statements': count_meta_statements(),
        'recursive_depth': measure_avg_recursion_depth()
    }

    if indicators.score > 8:
        return "advanced"
    elif indicators.score > 5:
        return "intermediate"
    else:
        return "basic"
```

## User Interface Design

### 提示词确认卡片
```
🔄 递归思考建议                    ⭐⭐⭐⭐ (历史效果评分)

💭 "你刚才选择这个分析方法的理由是什么？如果重新选择，还有更好的方法吗？"

🏷️ 标签: [方法质疑] [中等挑战] [深度思考]

┌─────────────────────────────────────────┐
│ ✅ 使用此提示    🔄 换一个提示           │
│ ✏️ 自定义提示    ⏭️ 跳过此次            │
└─────────────────────────────────────────┘

📊 预期效果: 提升方法论意识，促进递归思考
```

## Effectiveness Tracking

### 追踪指标
```python
effectiveness_metrics = {
    'recursion_depth': "递归思考层次增加",
    'insight_quality': "洞察质量提升",
    'self_awareness': "自我意识发展",
    'method_innovation': "方法创新频率",
    'user_satisfaction': "用户满意度"
}
```

### 自动优化机制
```python
def auto_optimize_prompts():
    # 识别高效提示词模式
    high_performers = identify_top_performing_prompts()

    # 生成变体
    new_variants = generate_successful_variants(high_performers)

    # 淘汰低效提示词
    retire_underperforming_prompts()

    # 更新提示词库
    update_prompt_database(new_variants)
```

## Integration Points

### 与现有工具的集成
- Phase完成后自动触发
- 检测到浅层回答时智能推荐
- 与quality_gate系统协同工作
- 记录到成长追踪系统

### 数据流
```
Input: 用户请求 + 当前上下文
↓
Context Analysis: 阶段/类型/强度检测
↓
Prompt Selection: 智能选择最优提示词
↓
User Confirmation: 一键确认界面
↓
Execution: 执行递归思考
↓
Tracking: 效果追踪和优化
```

## Success Indicators

### 定量指标
- 递归思考触发频率: >3次/天
- 提示词使用率: >80%
- AI递归深度提升: >50%
- 洞察质量改进: >30%

### 定性指标
- AI开始主动质疑自己的方法
- 分析深度明显增加
- 元认知能力发展
- 用户与AI的协作质量提升

## Error Handling

### 常见问题处理
```python
def handle_common_issues():
    if ai_response_too_superficial():
        increase_prompt_intensity()

    if ai_gets_stuck_in_loop():
        switch_to_different_prompt_type()

    if user_skips_prompts_frequently():
        adjust_prompt_timing_and_relevance()

    if recursion_goes_too_deep():
        implement_graceful_convergence()
```

## 🛡️ 边界保护机制 (新增)

### 核心原则锚定
```python
FORBIDDEN_PATTERNS = {
    'investment_advice': [
        r'投资评级.*买入|卖出|推荐',
        r'目标价.*\$\d+',
        r'建议.*买入|卖出',
        r'评级.*Buy|Sell|Hold'
    ],
    'positioning_advice': [
        r'仓位.*%',
        r'配置.*%',
        r'持仓比例'
    ]
}

REQUIRED_ALTERNATIVES = {
    '买入': '深度关注',
    '卖出': '审慎关注',
    '推荐': '关注',
    '目标价': '概率加权估值'
}
```

### 递归边界检查函数
```python
def check_current_boundary_compliance():
    """
    检查当前输出是否接近边界违反
    """
    recent_output = get_recent_generation(last_n=3)

    for category, patterns in FORBIDDEN_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, recent_output, re.IGNORECASE):
                return BoundaryStatus(
                    at_risk=True,
                    violation_type=category,
                    risk_level='HIGH'
                )

    return BoundaryStatus(at_risk=False)

def validate_output_boundary_compliance(output):
    """
    验证递归思考结果的边界合规性
    """
    violations = []

    for category, patterns in FORBIDDEN_PATTERNS.items():
        for pattern in patterns:
            matches = re.findall(pattern, output, re.IGNORECASE)
            if matches:
                violations.append({
                    'type': category,
                    'matches': matches,
                    'severity': 'CRITICAL'
                })

    return ComplianceReport(
        passes=len(violations) == 0,
        violations=violations
    )

def apply_automatic_boundary_corrections(output):
    """
    自动纠正边界违反
    """
    corrected_output = output

    for forbidden, alternative in REQUIRED_ALTERNATIVES.items():
        corrected_output = re.sub(
            forbidden, alternative,
            corrected_output,
            flags=re.IGNORECASE
        )

    return corrected_output
```

### 边界安全提示词前缀
```yaml
boundary_safe_prefix: |
  🚨 CRITICAL BOUNDARIES (不可违反):
  - 禁止: 买入/卖出/推荐/目标价
  - 必须: 深度关注/关注/中性关注/审慎关注
  - 禁止: 任何仓位建议或配置比例

  现在进行边界安全的递归思考:
```

### 实时监控上下文管理器
```python
class BoundaryMonitor:
    def __enter__(self):
        self.violations = []
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.violations:
            raise BoundaryViolationError(self.violations)

    def check_generation_step(self, partial_output):
        for pattern in CRITICAL_PATTERNS:
            if re.search(pattern, partial_output):
                self.violations.append(pattern)
                return False
        return True
```

### 边界安全确认界面
```
🛡️ 边界保护递归思考建议              ✅ 合规验证通过

💭 "你刚才选择这个分析方法的理由是什么？如果重新选择，还有更好的方法吗？"

🚨 边界保护状态:
   ✅ 无投资建议风险
   ✅ 无评级体系违反
   ✅ 原则锚定激活

🏷️ 标签: [边界安全] [方法质疑] [深度思考]

┌─────────────────────────────────────────┐
│ ✅ 安全执行      🔧 调整提示             │
│ ❌ 跳过此次      📋 查看边界规则         │
└─────────────────────────────────────────┘

⚠️ 此递归思考已通过边界安全检查
```

## Future Enhancements

### Planned Features
- 语音触发支持
- 多语言提示词库
- 视觉化递归思维过程
- 跨会话学习记忆
- 团队协作模式
- **边界学习算法** - 从历史违规中学习改进保护机制
- **实时原则强化** - 动态调整边界敏感度

---

**这个Skill让递归思考变得毫不费力且绝对安全 - 用户只需要一键确认，就能触发最适合当前情况且严格遵守CLAUDE.md原则的深度递归对话！** 🚀🛡️