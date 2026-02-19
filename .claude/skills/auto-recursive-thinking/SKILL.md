# Auto Recursive Thinking

## Description
智能递归思考生成器。根据当前分析上下文自动生成最优递归提示词，促进深度思考。

## When to Use
- 分析过程中需要促进递归思考时
- Phase完成后需要深度反思时
- AI回答过于表面需要深化时
- 用户明确要求递归思考时

## Arguments
- `stage` (optional): 指定分析阶段 [startup|analysis|reflection]
- `type` (optional): 指定递归类型 [method-questioning|assumption-challenge|meta-cognition]
- `intensity` (optional): 指定提示强度 [gentle|moderate|challenging]

## Core Logic

1. 检测当前分析阶段(启动/分析中/反思)
2. 选择最合适的递归问题类型
3. 提出问题，等待用户确认
4. 执行递归思考，展示改进

## Prompt Templates

### 启动阶段
```yaml
startup_prompts:
  basic:
    - "在开始分析{company}之前，你觉得你当前的分析能力有什么局限性？"
    - "对于{company}这类公司，你认为什么样的分析方法最有效？为什么？"
    - "你准备如何确保这次分析比上次更深入？"
  advanced:
    - "你觉得你对{company}的预设判断可能会如何影响分析质量？"
    - "如果你要训练另一个AI分析师来分析{company}，你会重点强调哪些思维要点？"
```

### 深度分析阶段
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

### 反思阶段
```yaml
reflection_prompts:
  self_improvement:
    - "回顾刚才的分析过程，你觉得你的思考方式有什么进步空间？"
    - "如果重新开始这个分析，你会在哪个环节采用不同的方法？"
  meta_cognition:
    - "观察你刚才的思考过程，你发现了什么关于你自己思维模式的洞察？"
    - "你觉得你的分析质量在这次对话中有什么变化？"
  learning_extraction:
    - "这次分析让你学到了什么关于'如何更好地学习'的经验？"
    - "你觉得你从这次分析中提取的最有价值的'方法论洞察'是什么？"
```

## Integration
- Phase完成后自动触发反思阶段
- 检测到浅层回答时推荐深度挖掘
- 与quality_gate系统协同: 质量门控发现问题时触发方法质疑
- 与`tests/compliance_check.sh`配合: 递归完成后可运行合规检查
