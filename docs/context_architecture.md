# Context Architecture — OpenViking L0/L1/L2 设计
> 设计原则: AI不需要每次读完整本书。先看封面→再看目录→最后才翻正文。

## 三层加载策略

```
L0 (~100 tokens/项) → 秒判"这里有没有我要的东西"
L1 (~2K tokens/项)  → 规划阶段的决策依据
L2 (完整原文)       → 真正需要时才读
```

## 项目上下文地图

### 系统指令层 (每次会话自动加载)
```
CLAUDE.md (215行)     ← 核心路由+铁律+行业路由 (L0级精简)
MEMORY.md (48行)      ← 纯索引+关键规则 (L0)
```

### 知识层 (按需加载)
```
knowledge/
├── L0_index.yaml            L0  19报告×1行, 2.7K chars
├── knowledge_index.yaml     L1  319行结构化索引+相似性图谱, 15K
├── planning_archives/       L2  12份规划经验档案, 各~2K
└── external_refs/
    └── search_templates.yaml  L1  5维搜索模板
```

### 记忆层 (按需加载)
```
.claude/.../memory/
├── MEMORY.md                L0  48行, 自动加载
├── report_lessons.md        L1  5报告详细教训
├── framework_evolution.md   L1  框架版本+诚实评估
├── META_v1.0_复利反思.md     L2  META报告深度复盘
└── 框架升级v11.0_适配.md     L2  生态科技适配方案
```

### 框架层 (Phase启动时加载)
```
docs/
├── deep_dive_protocol.md    L2  Tier 3完整协议
├── checkpoint_protocol.md   L1  Phase自动化
├── quality_benchmarks.md    L1  质量标杆
├── confidence_system.md     L2  DM锚定系统
├── red_team_protocol.md     L2  Phase 4红队
├── industry/                L2  行业专用增强
└── CHANGELOG.md             L2  完整版本历史
```

### Skill层 (调用时加载)
```
.claude/skills/  (32个目录)
├── Tier 1: quick-company-scan
├── Tier 2: standard-analysis
├── Tier 3 核心: orchestrator, data-prefetch, investment-logic-toolkit
├── Phase 4: red-team-suite, risk-topology
├── Phase 5: assumption-audit, valuation-quality-gate, cq-lifecycle-tracker
├── 行业: consumer-brand-analysis-toolkit, smart-money-tracking-system, analyze-sector
├── 质量: omission-scanner, prediction-market-analyzer
├── 协作: dispatching-parallel-agents
└── 通用: simple-recursive-thinking, recursive-decomposition + Claude Code内置×15
```

## 加载决策树

```
新会话启动
  ├→ 自动: CLAUDE.md + MEMORY.md (L0, ~260行)
  │
  用户请求分析公司
  ├→ 读L0: knowledge/L0_index.yaml → 有无相似报告?
  │   ├→ 有: 读L1 knowledge_index.yaml 该公司条目
  │   │   └→ 需要: 读L2 planning_archives/{TICKER}.md
  │   └→ 无: 跳过
  │
  ├→ Tier判定: CLAUDE.md路由表
  │   ├→ T1: 读quick-company-scan SKILL.md
  │   ├→ T2: 读standard-analysis SKILL.md
  │   └→ T3: 读docs/deep_dive_protocol.md (Phase启动时)
  │
  └→ Phase执行: 按需加载对应Phase的skill
      ├→ P0: data-prefetch + orchestrator
      ├→ P1-3: 分析skill按需
      ├→ P4: red-team-suite + risk-topology
      └→ P5: valuation-quality-gate + cq-lifecycle-tracker
```

## Token预算估算

| 阶段 | 自动加载 | 按需加载 | 总计 |
|------|----------|----------|------|
| 会话启动 | ~5K (CLAUDE.md+MEMORY.md) | 0 | ~5K |
| Tier 1 | +5K | +2K (L0 index + scan skill) | ~12K |
| Tier 3 P0 | +5K | +8K (L1 index + protocol + skills) | ~18K |
| Tier 3 每Phase | +5K | +4K (phase skill) | ~9K/Phase |

**Context使用率**: 启动~5% → Tier 3单Phase~15% → 远低于20-40%退化阈值
