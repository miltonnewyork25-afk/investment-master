# Simple Recursive Thinking

## Description
极简版递归思考触发器。将复杂的递归理论简化为3个简单问题，让用户一键触发，零认知负荷体验递归思考的价值。重点是体验而非技术。

## When to Use
- 用户需要递归思考但不想要复杂操作时
- AI回答后需要快速深化时
- 建立递归思考习惯的初期阶段
- 用户说"简单递归"或"快速递归"时

## Key Features
1. **三个万能问题**：只有3个简单递归触发问题
2. **一键确认**：用户只需要说"是"或"不"
3. **即时反馈**：立即显示递归带来的改进
4. **零学习成本**：无需理解复杂理论
5. **渐进深化**：成功后自然引导到更深层递归

## The 3 Universal Recursive Questions

### Question 1: 深度挖掘
```
"💡 要不要让这个分析更深入一点？"
→ 如果用户同意：自动质疑当前分析的深度和完整性
```

### Question 2: 方法质疑
```
"🤔 想质疑一下刚才选择的方法吗？"
→ 如果用户同意：自动评估方法选择并提出替代方案
```

### Question 3: 思考反思
```
"✨ 要不要反思一下刚才的思考过程？"
→ 如果用户同意：自动审视思考逻辑并寻找改进点
```

## Implementation

### 核心逻辑
```python
def simple_recursive_thinking():
    # Step 1: 智能选择最合适的问题
    best_question = select_best_question_for_context()

    # Step 2: 向用户提出简单选择
    user_response = ask_user_simple_choice(best_question)

    # Step 3: 如果用户同意，执行对应的递归思考
    if user_agrees(user_response):
        recursive_result = execute_matching_recursion(best_question)
        show_immediate_improvement(recursive_result)
        track_success()
    else:
        continue_without_recursion()
        suggest_later_opportunity()

def select_best_question_for_context():
    """
    根据上下文智能选择最合适的递归问题
    """
    if analysis_seems_superficial():
        return "深度挖掘"
    elif method_choice_unclear():
        return "方法质疑"
    elif thinking_process_visible():
        return "思考反思"
    else:
        return random.choice(["深度挖掘", "方法质疑", "思考反思"])
```

### 用户交互流程
```
AI完成回答
    ↓
自动检测递归机会
    ↓
弹出简单选择："💡 要不要让这个分析更深入一点？"
    ↓
用户点击"是"或"不"
    ↓
如果"是"：自动执行递归→显示改进效果
如果"不"：继续原流程→记录用户偏好
```

## User Interface Design

### 简单选择界面
```
┌─────────────────────────────────────────┐
│ 💡 要不要让这个分析更深入一点？          │
│                                         │
│ 👍 是的，深入一点    👌 当前就很好      │
│                                         │
│ 💭 预计提升洞察深度20%                  │
└─────────────────────────────────────────┘
```

### 即时反馈显示
```
🔄 正在深入思考...

✨ 递归思考完成！

📈 发现了2个新洞察点
🎯 分析深度提升了25%
💡 学到了1个新方法

🤔 这次递归思考有帮助吗？
👍 很有帮助    👎 没什么用    🤷 还行吧
```

## Response Templates

### 深度挖掘模式
```yaml
trigger_context: "分析看起来比较表面"
question: "💡 要不要让这个分析更深入一点？"
if_yes_action:
  - 重新审视分析的完整性
  - 识别可能遗漏的角度
  - 深入挖掘关键假设
  - 提供更细致的洞察
example_improvement:
  before: "这家公司财务状况良好"
  after: "这家公司财务状况良好，特别是现金流生成能力强（FCF margin 15%），但需要关注应收账款增长率（同比+25%）可能暗示的收入质量问题"
```

### 方法质疑模式
```yaml
trigger_context: "方法选择不够明确"
question: "🤔 想质疑一下刚才选择的方法吗？"
if_yes_action:
  - 解释为什么选择这个方法
  - 分析这个方法的局限性
  - 提出至少一个替代方法
  - 比较不同方法的适用性
example_improvement:
  before: "用P/E倍数估值，目标价$150"
  after: "我选择P/E倍数是因为公司盈利稳定，但这个方法可能忽略了成长性。考虑到公司处于扩张期，PEG或DCF可能更合适。让我用DCF重新估算..."
```

### 思考反思模式
```yaml
trigger_context: "思考过程需要优化"
question: "✨ 要不要反思一下刚才的思考过程？"
if_yes_action:
  - 观察自己的思考路径
  - 识别思考过程中的跳跃或盲点
  - 评估逻辑链条的严密性
  - 提出思考方式的改进
example_improvement:
  before: "基于管理层指导，我认为明年增长20%"
  after: "让我反思一下：我刚才直接采用了管理层指导，但没有质疑其可信度。管理层往往偏乐观，我应该交叉验证：看看历史指导的准确性、行业增长趋势、竞争格局变化..."
```

## Success Tracking

### 即时反馈指标
```python
immediate_feedback = {
    'new_insights_discovered': count_new_insights(),
    'analysis_depth_improvement': calculate_depth_increase(),
    'method_innovations': count_method_improvements(),
    'thinking_process_enhancement': assess_process_improvement()
}

def show_immediate_improvement(recursive_result):
    """
    立即显示递归思考带来的改进
    """
    improvements = extract_improvements(recursive_result)

    display_message = f"""
    ✨ 递归思考完成！

    📈 发现了{improvements.new_insights}个新洞察点
    🎯 分析深度提升了{improvements.depth_increase}%
    💡 学到了{improvements.new_methods}个新方法
    """

    return display_message
```

### 用户体验指标
```python
experience_metrics = {
    'ease_of_use': "用户是否觉得简单易用",
    'perceived_value': "用户是否觉得递归有价值",
    'continuation_rate': "用户是否继续使用递归功能",
    'satisfaction_score': "用户对递归体验的满意度"
}
```

## Progressive Complexity

### 阶段性引导更深递归
```python
def progressive_recursion_introduction():
    """
    根据用户接受程度渐进引入更深层递归
    """
    if user_basic_recursion_success_rate() > 80%:
        suggest_intermediate_recursion()
    elif user_intermediate_recursion_comfort() > 70%:
        introduce_advanced_recursion_concepts()
    elif user_advanced_recursion_mastery() > 60%:
        transition_to_full_recursive_thinking_system()
```

### 自然过渡机制
```yaml
Week 1-2: 只使用3个简单问题，建立习惯
Week 3-4: 开始解释为什么递归有效
Month 2: 引入用户主动请求递归的概念
Month 3: 过渡到完整递归思维系统
```

## Error Handling

### 常见问题处理
```python
def handle_user_hesitation():
    """
    处理用户对递归思考的犹豫
    """
    if user_always_says_no():
        reduce_recursion_frequency()
        make_questions_less_intrusive()

    elif user_gets_confused():
        provide_simpler_explanations()
        show_concrete_before_after_examples()

    elif user_loses_interest():
        gamify_the_experience()
        show_progress_and_achievements()
```

## Integration with Main System

### 与现有工具的协作
```python
def integrate_with_existing_tools():
    """
    与现有投资分析工具无缝集成
    """
    # 在每个分析阶段完成后触发
    phase_completion_triggers = [
        'after_company_overview',
        'after_financial_analysis',
        'after_valuation',
        'after_risk_assessment'
    ]

    # 检测到浅层分析时主动建议
    if detect_superficial_analysis():
        suggest_simple_recursion()

    # 与质量门控系统配合
    if quality_gate_identifies_gaps():
        offer_targeted_recursion()
```

## Measurement and Optimization

### 持续优化机制
```python
def continuous_optimization():
    """
    基于用户反馈持续优化简单递归系统
    """
    user_feedback = collect_user_experience_feedback()

    if feedback_indicates_too_complex():
        further_simplify_interface()
    elif feedback_indicates_too_simple():
        gradually_increase_sophistication()
    elif feedback_indicates_timing_issues():
        adjust_recursion_trigger_timing()

    optimize_question_selection_algorithm(user_feedback)
    refine_improvement_display_methods(user_feedback)
```

---

**这个简化版本的核心理念：让递归思考像"点赞"一样简单自然！** 👍✨