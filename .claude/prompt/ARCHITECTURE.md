# Prompt分层缓存架构 v22.0

> **基于Claude Code系统提示词架构的工程实践**
> **核心原则**: 分段记忆化 + 静态/动态边界分治 + 优先级链合成

---

## 一、分段记忆化模式

### 设计理念
提示词不是一个硬编码字符串，而是由独立段落组成的注册表。每个段落有明确的缓存策略。

### 段落分类

| 类型 | 缓存策略 | 变化频率 | 我们的对应物 |
|------|---------|---------|-------------|
| **稳定段落** | 首次计算后缓存，跨session复用 | 月级 | `static/core_identity.md` |
| **低频段落** | 缓存但定期更新 | 周级 | `static/analysis_framework.md` |
| **易变段落** | 每轮重新计算(DANGEROUS) | 每次 | `dynamic/session_context.md` |

### DANGEROUS标记规则
借鉴Claude Code的`DANGEROUS_uncachedSystemPromptSection`设计：
- 任何需要每session重新计算的段落，必须标注**为什么不能缓存**
- 增加"API摩擦"：需要明确理由才能使用易变段落
- 目的：防止"方便起见"把本可缓存的内容标为易变，浪费token

**我们系统中的DANGEROUS段落**:
1. `session_context` — 每session的ticker/phase/环境信息（理由：session特定，不可复用）
2. `active_skills` — 当前激活的skill列表（理由：skill可中途加载/卸载）
3. `handoff_note` — 上一轮交接笔记（理由：每轮更新）

---

## 二、静态/动态边界设计

### 边界标记
```
======== STATIC/DYNAMIC BOUNDARY (DO NOT MOVE) ========
```

### 静态区（边界前）
- **范围**: 身份 + L0哲学 + L1原则 + 研究纪律 + 分析路由 + 评级标准 + 铁律概览 + 行业路由
- **缓存级别**: global（跨session复用）
- **关键约束**: **静态区不能含有因session而异的条件分支**，否则缓存命中率从95%暴跌至10%

### 动态区（边界后）
- **范围**: 当前ticker + phase状态 + 激活工具 + session记忆 + handoff note
- **缓存级别**: session（仅当前session有效）

### 缓存键计算
```python
cache_key = md5(static_content)[:16]  # 静态内容hash
# 静态内容变化 → cache_key变化 → 自动重新生成
# 静态内容不变 → cache_key不变 → 直接复用
```

---

## 三、优先级链合成

### 投资研究Agent的优先级链
```
优先级 0 (最高): L0 研究哲学 ("先看股价在买什么")
  ↓
优先级 1: L1 投资原则 (5条不可妥协)
  ↓
优先级 2: L2 分析工具 (铁律H/I/J/K/M/N/O)
  ↓
优先级 3 (最低): L3 质量检查 (G1-G9门控/DM密度/因果密度)

+ 研究纪律(11条) 始终追加，不受优先级影响
+ 行业特化 始终追加，不替换通用框架
```

### 冲突解决规则
- L0与L1冲突 → L0胜出（"股价在买什么"优先于"业务判断优先"）
- L1与L2冲突 → L1胜出（"业务判断"优先于"Owner FCF计算"）
- L2与L3冲突 → L2胜出（"分析深度"优先于"DM密度达标"）
- 研究纪律与任何层冲突 → 研究纪律胜出（"深度优先/禁止硬写"是绝对边界）

---

## 四、文件结构

```
.claude/prompt/
├── ARCHITECTURE.md          # 本文件：架构说明
├── static/                  # 静态区（global缓存）
│   ├── core_identity.md     # 身份 + L0 + L1
│   ├── analysis_framework.md # 路由 + 评级 + 门控
│   ├── ironrules_overview.md # 铁律速查 + 工具优先级
│   └── session_protocols.md  # 会话规范 + Phase自动化
├── dynamic/                 # 动态区（session缓存）
│   └── session_context_template.md  # 模板
└── cache/                   # 缓存管理
    └── cache_manager.py     # 缓存键计算 + 有效性检查
```

---

## 五、缓存优化契约（必须遵守）

1. **静态区不含session变量** — ticker/phase/环境信息只能出现在动态区
2. **DANGEROUS段落必须有理由** — 没有理由的易变标记不允许通过
3. **边界标记位置不可移动** — 静态/动态分界线一旦设定，不随便调整
4. **行业worktree触发缓存降级** — 行业特化内容使全局缓存降级为行业级缓存
5. **监控缓存命中率** — 如果命中率下降，检查是否有条件分支侵入静态区

---

## 六、与CLAUDE.md的关系

**CLAUDE.md是宪法级文件**，它的全部内容属于静态区。
CLAUDE.md中不应出现任何会话特定信息（当前分析的ticker、当前phase、当前session状态）。
这些信息只在动态区的session_context中出现。

**铁律详情(.claude/rules/)**是按需加载的中间层，不属于静态区也不属于动态区。
它们在需要时加载到context中，用完释放。类似Claude Code的"工具按需注册"模式。