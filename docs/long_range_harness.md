# 长程研究Harness v22.0

> **核心理念**: 长程agent不是靠"更聪明的单轮"，而是靠"更好的session scaffolding + 更强的handoff discipline"。
> **来源**: Anthropic官方长程agent工程实践 + 40+份报告实战验证

---

## 两个典型失败模式

1. **One-shot倾向**: 想一次做太多，context耗尽后环境半成品，下一轮猜前面发生了什么
2. **过早宣布胜利**: 看见有一些成果就误以为任务完成，实际关键问题还没验证

**解法**: Initializer + 增量推进 + 结构化问题清单 + 强制Handoff

---

## Session 0: Initializer（首次研究）

**第一轮禁止直接输出正式投资判断**，只允许做以下4件事:

### 1. 建立研究问题清单 (Research Question List)

```yaml
# reports/{TICKER}/data/research_questions.yaml
questions:
  - id: RQ-001
    category: pricing
    description: "当前估值隐含的核心增长/利润率预期是什么"
    why_it_matters: "直接决定市场在买什么"
    evidence_needed: "Reverse DCF + 市场口径 + 管理层指引"
    status: pending  # pending / investigating / verified / falsified / inconclusive

  - id: RQ-002
    category: driver
    description: "未来3年最关键承重墙变量是什么"
    why_it_matters: "决定thesis是否站得住"
    evidence_needed: "经营指标 + 同行业对比 + 历史兑现度"
    status: pending

  - id: RQ-003
    category: expectation_gap
    description: "市场最可能错看的层是什么"
    why_it_matters: "alpha的来源"
    evidence_needed: "卖方共识 + 自主分析 + 反方路径"
    status: pending

  - id: RQ-004
    category: kill_switch
    description: "当前thesis的红灯信号和失效条件是什么"
    why_it_matters: "决定何时退出"
    evidence_needed: "历史stress test + 承重墙敏感度"
    status: pending
```

**规则**: 后续session只能更新status和补充note，不允许随意改写问题本身。

### 2. 建立 Research State Board

```yaml
# reports/{TICKER}/data/research_state.yaml
state:
  current_phase: "Session 0 - Initialization"
  main_thesis: "待形成"
  counter_thesis: "待形成"
  confidence: null
  explored_angles: []
  excluded_angles: []
  key_unknowns: []
  kill_switches: []
```

### 3. 列出8-12个候选研究角度并排序

按"解释力×可验证性×非共识度"三维评分排序。

### 4. 定义完成标准

明确: 什么情况下这份研究可以宣告收束?

---

## Get Bearings（每个新session开头）

**不允许直接继续写分析**，必须先做:

1. **读Handoff Note** — 上一轮交接了什么
2. **读Research State Board** — 当前整体进度
3. **读Research Question List** — 哪些问题已验证/证伪/待推进
4. **检查主线** — 上一轮主线是否仍成立（有没有新信息推翻）
5. **检查冲突** — 是否存在未修复的关键逻辑冲突
6. **选择行动** — 只有完成上述步骤后，才能选择本轮动作

**投研版"get bearings"对应Anthropic的coding agent开工流程**:
- Anthropic: pwd → 读progress → 读feature list → 看git log → 跑init → 基础测试
- 投研: 读handoff → 读state board → 读questions → 验证主线 → 检查冲突 → 选行动

---

## 循环推进规则

### 广度阶段
1. 先扫描角度，不下结论
2. 每轮新探索优先选择与已探索方向在"因果机制/证据来源/估值语言"上**夹角更大**的方向
3. 若一个方向只是沿旧方向补细节、换表述、换术语 → 判定为**低夹角**，降权

### 深挖触发条件（满足任一才允许进入深挖）
- 管理层口径与数据不一致
- 市场预期与经营现实显著不符
- 关键驱动变量存在非线性拐点
- 某方向同时连接业务质量、估值语言和市场预期
- 某方向可以直接生成Kill Switch

### 深挖模式
- **一次只推进一个问题**，不允许同时深挖多个方向
- 每轮结束必须回答:
  - 本轮是否新增了新的机制解释?
  - 是否只是重复验证旧主线?
  - 是否沿同一因果链继续挖低价值细节?
  - 本轮新增信息是否足以改变评级、置信度或Kill Switch?

### 方向切换
- 若连续两轮新增信息主要是重复验证 → **强制切换方向**
- 切换时优先选择研究问题清单中status=pending且priority最高的问题

---

## Handoff Note（每轮结尾强制输出）

```yaml
# reports/{TICKER}/data/handoff_note.yaml
session_number: N
date: "YYYY-MM-DD"

completed:
  - "描述本轮完成的工作"

new_mechanisms:
  - "本轮新增的机制解释（如果有）"

main_thesis_update: "当前主线判断（如有变化说明原因）"

counter_path: "当前反方路径"

kill_switches:
  - signal: "红灯信号"
    threshold: "触发阈值"
    current_status: "当前状态"

unresolved:
  - "仍未解决的关键问题"

next_session_priority: "下一轮唯一优先问题"

do_not_repeat:
  - "明确不要重复做的事"

research_state_changes:
  questions_verified: [RQ-001]
  questions_falsified: []
  new_questions: []
  confidence_change: "从X变到Y，原因是Z"
```

---

## 收束条件（不允许agent自己宣布"研究完成"）

**同时满足以下全部条件才允许宣告研究收束**:

1. ✅ 研究问题清单中高优先级项已大部分被验证或证伪
2. ✅ 已形成主线判断与反方路径
3. ✅ Kill Switch已明确（≥3个可量化信号+触发阈值）
4. ✅ 最近两轮新增信息主要是低边际收益
5. ✅ 已完成Handoff Note
6. ✅ 三维状态判断已完成（价值×方向×催化）

**不满足上述条件时禁止写"研究已完成"**。

---

## 最终输出清单

收束后必须输出:
1. 当前股价在买什么
2. 1-3条主线判断（标注硬/弱/猜测级别）
3. 市场最可能错看的层
4. 反方路径
5. Kill Switch（红灯/黄灯/上修/下修）
6. 后续跟踪清单（5-8个关键指标+频率）
7. 认知边界（硬数据/推断/黑箱区域）
8. 三维状态标签 [价值×方向×催化]

---

## 与现有Phase系统的关系

长程Harness是**研究思路管理层**，Phase系统是**分析执行层**。两者并存:

| 维度 | Phase系统 | 长程Harness |
|------|----------|------------|
| 管理什么 | 分析步骤的流转 | 研究方向的演进 |
| 颗粒度 | Phase 0→1→2→3→4→5 | Session 0→N（跨Phase） |
| 核心产出 | 报告章节 | 问题验证/证伪 |
| 交接机制 | checkpoint.yaml | handoff_note.yaml |
| 质量保障 | 门控脚本(G1-G9) | 收束条件(6项) |

**在实际执行中**: Session 0(Harness初始化) → Phase 0-0.75(框架执行) → Session 1-N(Harness循环推进+Phase 1-4) → 收束判定 → Phase 5(组装)