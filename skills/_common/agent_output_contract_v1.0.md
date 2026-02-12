# Agent产出合约 v1.0

> **来源**: GOOGL v4.0 Complete组装教训 — S1_agent_C跨Part(Ch03-04 + Ch08-09)导致手动拆分复杂。
> **目标**: 确保每个Agent的产出可以直接拼接，无需拆分或重排。

---

## 核心规则

### 规则1: Part边界对齐
- 单个Agent的产出**必须**完全在一个Part内
- 如果分配的章节跨越Part边界，**必须**拆分为多个输出文件
- 每个文件名包含Part编号: `S{session}_agent_{letter}_part{N}_ch{XX}_ch{YY}.md`

### 规则2: 文件命名规范
```
{Session}_{Agent}_{Part}_{Chapters}.md
例: S1_agentA_partI_ch01_ch02.md
    S1_agentC_partI_ch03_ch04.md
    S1_agentC_partII_ch08_ch09.md  ← 跨Part时拆分
```

### 规则3: 文件结构
每个文件必须以Part标题开头(除非是Part内的第二个文件):
```markdown
# Part X: [Part标题]

> **数据截止**: YYYY-MM-DD
> **关联CQ**: CQX, CQY

---

# Ch{NN}: [章节标题]
...
```

### 规则4: Agent元数据区
允许在文件开头有Agent元数据区，但必须用HTML注释包裹(组装脚本自动删除):
```html
<!-- AGENT_META
session: 1
agent: A
chapters: [1, 2]
part: I
char_budget: 40000
-->
```

### 规则5: 无Part标头重复
如果一个Part由多个Agent完成，只有**第一个Agent**的文件包含Part标题。后续Agent直接以Chapter标题开头。

### 规则6: Phase标记
Agent不需要插入Phase标记行。这由assemble_complete.sh自动处理。

---

## 与assemble_complete.sh的集成

组装脚本按以下顺序处理:
1. 读取assembly_config.md中的文件列表
2. 删除`<!-- AGENT_META ... -->`块
3. 按Part顺序拼接
4. 插入Protocol Header和Phase标记

---

## 分配规则

### Session规划时的Agent分配检查:
- 列出所有Chapter→Part映射
- 如果一个Agent被分配了跨Part的Chapter，**必须**拆分为两个输出要求
- Agent prompt中注入本合约的规则1和规则4

### 例: GOOGL v4.0的正确分配

**错误做法(v4.0实际)**:
| Agent | Chapters | Parts | 文件数 |
|-------|----------|-------|--------|
| S1_C | Ch03-04 + Ch08-09 | Part I + Part II | 1(需手动拆分) |

**正确做法(v5.0)**:
| Agent | Chapters | Parts | 文件数 |
|-------|----------|-------|--------|
| S1_C | Ch03-04 | Part I | 1 |
| S1_C | Ch08-09 | Part II | 1(单独文件) |

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2026-02-12 | 初版。Part对齐+命名规范+元数据区+分配检查 |
