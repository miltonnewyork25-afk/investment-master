# Changelog

本文件记录投资研究 Agent 框架的所有重大变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

---

## [v24.0] - 2026-02-08

### MAJOR - 质量不可回退 (Iron Rule F + Complete报告强制门控)

解决META报告质量回退问题(36K vs GOOGL 311K)。根因: Phase 5独立交付而未组装Complete报告 + Phase 5内容不达GOOGL基准。

**新增: 铁律F — 质量不可回退**
- **新增** `docs/quality_benchmarks.md` — 历史最佳质量基准注册表(GOOGL 311K为基准)
  - 10维度评分标准 + 10字段KS格式 + 三情景VP格式 + CQ 5要素闭环格式
  - 5档仓位矩阵标准 + Complete报告组装标准
- **新增** `tests/quality_gate_complete.sh` — 11项自动化Complete报告质量门控
  - CG1-CG11: 总字符/Phase5字符/评分维度/KS数/VP数/三情景/CQ闭环/标注密度/硬数据占比/Mermaid/必需章节
  - 全部基于历史最佳80%地板 — 违反即阻断commit
- **升级** `CLAUDE.md` 铁律F: 11项检查表 + Complete组装流程 + 禁止Phase 5即宣布完成
- **升级** `CLAUDE.md` 文档索引: 新增quality_benchmarks.md条目

**升级: Phase 5协议 (v6.0 → v7.0)**
- **升级** `docs/deep_dive_protocol.md` Phase 5: 字符目标15K→34K(GOOGL实际73.6K)
- **升级** Phase 5评分: 自定维度 → 标准10维度(估值/增长/护城河/财务/管理/催化/风险/聪明钱/竞争/时机)
- **升级** Phase 5 KS: 简要格式 → 10字段详细格式(触发/阈值/当前/距离/动作/CQ/Bear#/数据源/AI/紧迫性)
- **升级** Phase 5 VP: 单情景 → 三情景(Base/Bull/Bear)(禁止单情景预测)
- **新增** Phase 5 CQ最终解答: 5要素闭环(回答+置信度路径+KS关联+验证事件+反思)
- **新增** Phase 5.5: Complete报告组装为强制步骤(quality_gate_complete.sh通过后才能commit)
- **新增** Phase 5仓位: 5档矩阵标准(观望/观察仓/标准/核心/重仓)

**防退机制**:
- 80%地板规则: 新报告每项指标≥历史最佳80% (硬性阻断)
- Complete强制: Phase 5不等于全量完成，必须组装所有Phase + 通过11项CG门控
- 基准更新: 每完成一份报告，更新quality_benchmarks.md中的基准值

---

## [v23.0] - 2026-02-07

### MINOR - Context Window优化（输出质量不变，context占用大幅降低）

解决多worktree并行深度研究时context窗口频繁耗尽问题。4项优化，0质量降级。

**优化1: 自动检查点协议（最高优先级）**
- **新增** `docs/checkpoint_protocol.md` — checkpoint.yaml schema + 触发时机 + 恢复流程
- **升级** `CLAUDE.md` 铁律D步骤2: 新增checkpoint.yaml恢复检查
- **升级** `docs/agent_collaboration_protocol.md`: Step 12.5写入checkpoint
- **升级** `docs/deep_dive_protocol.md`: Fast Gate通过后写入checkpoint再git commit
- **升级** `CLAUDE.md` 文档索引: 新增checkpoint_protocol.md条目

**优化2: SubAgent输出压缩（高优先级）**
- **升级** `docs/parallel_execution.md`: 结果汇总改为摘要返回(≤500字符/agent)
- **升级** `docs/parallel_execution.md`: Agent Prompt v6.0新增第5项返回格式约束
- **升级** `docs/agent_collaboration_protocol.md`: Section 7新增Agent返回规范
- **节省**: 3 agents场景从24K→1.5K chars(94%), 5 agents场景从50K→2.5K chars(95%)

**优化3: CLAUDE.md瘦身（中等优先级）**
- **移出** 会话效率规则(8条) → `docs/time_management.md`，CLAUDE.md替换为1行指针
- **移出** 格式决策+框架开发规范 → `docs/readability_spec.md`，CLAUDE.md替换为2行指针
- **净减**: CLAUDE.md从226行减至~200行

**优化4: Agent调度预算规则（低优先级）**
- **升级** `docs/parallel_execution.md`: 并行数量限制→Agent调度预算规则v5.0
- **规则**: 单批次≤3 agents, 单会话≤6 agents, 批次间必须写checkpoint

---

## [v22.0] - 2026-02-07

### MAJOR - GOOGL经验驱动的实质质量升级（从"高形式分"到"高形式分+高实质分"）

基于GOOGL Tier 3深度研究的79个具体问题，提炼6个系统性根因，设计6个新机制解决。核心转变：流程合规→结果准确。

**M1: 数据版本控制 (Data Master v2.0)**
- **新增** `docs/data_version_control.md` — DM模板+语义版本号+Agent引用规范+生命周期+变更审计
- **解决S1**: shared_context无版本号 → SOTP段值偏差249%

**M2: 反幻觉协议**
- **新增** `docs/anti_hallucination_protocol.md` — 铁律14"无源数字禁写入"+5条禁令+SOTP三步验证+12项一致性清单
- **解决S2**: Agent幻觉 → Writer C"合理化"推算出错误段值

**M3: 关键假设主表 (KAL)**
- **新增** `docs/key_assumptions_list.md` — 假设注册+分类+敏感度分级+生命周期+跨Phase传递+Phase 4验证
- **解决S3**: 假设散落各Phase → GCP利润率假设跨Phase不一致

**M4: Kill Switch统一注册表**
- **新增** `docs/kill_switch_registry.md` — 注册表结构+三级阈值(L1黄/L2橙/L3红)+引用规则+KAL联动
- **解决S4**: KS各章节自行描述 → 阈值/状态/动作三重不一致

**M5: 估值修正层级**
- **新增** `docs/valuation_correction_hierarchy.md` — 5层管道(L1数据→L5范式)+单层±15%上限+审计日志+方向规则
- **解决S5**: Phase 4直接覆盖Phase 2 → $311→$326→$313来回跳

**M6: 质量门控v2.0 (双维度)**
- **新增** `docs/quality_gate_v2.md` — P-G过程门控10项+R-G结果门控12项+通过标准P-G≥8且R-G≥7
- **解决S6**: 质量门控只查流程不查结果 → 形式分9.6实质分6.8

**现有文件升级**
- **升级** `docs/deep_dive_protocol.md` v5.1→v6.0: Phase 0加DM/KAL初始化+双维度门控+铁律14/15+Agent协作8项
- **升级** `docs/parallel_execution.md` v3.0→v4.0: Agent Prompt反幻觉注入+DM/KAL引用规范+QG v2.0
- **升级** `docs/confidence_system.md` v1.0→v2.0: 数字来源分类+DM版本号标注
- **升级** `docs/sotp_methodology.md` v1.0→v2.0: 工作底稿三步验证+估值修正层级引用+DM集成
- **升级** `CLAUDE.md`: 铁律4(无源数字禁写入)+文档索引新增8项
- **新增** `docs/v22_migration_guide.md` — v21→v22迁移指南

---

## [v1.1-report-structure] - 2026-02-07

### MINOR - 报告目录结构标准化

解决报告放置混乱问题（504个文件混杂在reports/根目录、无Ticker子目录、命名不统一），统一到 `reports/{TICKER}/` 结构。

- **新增** `CLAUDE.md` 铁律E: 报告放置规则 — 所有报告统一存放 `reports/{TICKER}/`（main分支），方便查阅和横向参考
- **新增** 报告命名规范: `{TICKER}_Phase{N}_v{版本}_{YYYY-MM-DD}.md` / `{TICKER}_standard_v{版本}_{YYYY-MM-DD}.md`
- **新增** 目录结构标准: `reports/{TICKER}/` 含Phase报告+完整报告+`data/`子目录（合并原 `data/research/` 功能）
- **新增** Write hook: 报告未放入`reports/{TICKER}/`子目录时自动警告
- **升级** `.claude/skills/standard-analysis/SKILL.md`: 输出路径改为 `reports/{TICKER}/`
- **升级** `.claude/skills/orchestrator/SKILL.md`: 执行计划模板新增报告输出路径+数据缓存路径
- **升级** `docs/deep_dive_protocol.md`: Fast Gate路径+共享上下文路径对齐新结构
- **原则**: 不迁移现有504个历史文件，只规范未来行为

---

## [v1.0-agent-collab] - 2026-02-07

### MINOR - 多Agent协作优化

基于PG Phase 1-3的4路并行Agent经验，解决5个协作痛点。

- **新增** `docs/agent_collaboration_protocol.md` — 完整协作协议(共享上下文+任务锁+质量门控+STATUS.md+Agent日志+增量提交)
- **新增** `tests/research_fast.sh` — 报告质量门控脚本(字符数+标注密度+硬数据占比+So What检查)
- **新增** `data/research/PG/shared_context.md` — PG Phase 4共享上下文模板
- **新增** `data/research/PG/STATUS.md` — Phase执行期间实时仪表盘
- **新增** `data/research/PG/current_tasks/` — 任务锁目录
- **新增** `data/research/PG/agent_logs/` — Agent执行日志目录
- **升级** `CLAUDE.md` 铁律D: 新增session恢复检查(Step 2); 文档索引新增2条
- **升级** `docs/deep_dive_protocol.md`: 并行Agent加速段新增6项协作机制
- **升级** `docs/parallel_execution.md`: 新增多Agent协作协议引用
- **升级** `data/research/PG/progress.md`: 新增失败记录表+会话恢复日志

---

## [v21.0] - 2026-02-06

### MAJOR - 争议驱动框架升级（从模板填空到Core Questions驱动）

基于COST v20.0报告反思，修复7个结构性问题（洞察密度低/置信度虚假/模板填空/装饰性反证/零差异化/非活文档/五引擎非独立）。

**变更1: 争议驱动报告结构（核心变更）**
- **新增** `docs/core_questions_methodology.md` — CQ提取算法+模块相关性评分+报告结构模板
- **升级** `docs/market_attention_radar.md` v1.0→v2.0: 新增Step 2.5(CQ提取)+Step 3.5(模块评分)+Step 5.5(报告结构生成)
- **升级** `docs/deep_dive_protocol.md` v4.0→v5.0: Phase 0.5增加CQ提取步骤，Phase 1-3以CQ为组织轴心
- **升级** `.claude/skills/orchestrator/SKILL.md` v20.0→v21.0: Step 5改为争议驱动执行计划

**变更2: 三层置信度系统**
- **新增** `docs/confidence_system.md` — [硬数据]/[合理推断]/[主观判断]三层定义+20个示例+校准规则
- **废弃** `[置信度: XX%]` 旧格式
- **升级** `CLAUDE.md` 数据诚信规则: 铁律3改为三层标注

**变更3: 差异化洞察标准**
- **新增** `docs/differentiated_insight_standard.md` — "So What?"评分(0-10)+压缩模板
- **升级** `.claude/skills/orchestrator/modules/universal.md` v20.0→v21.0: 29模块新增So What阈值/压缩条件/时效性三列
- **升级** `.claude/skills/orchestrator/modules/consumer.md` v20.0→v21.0: 10模块新增三列
- **升级** `docs/depth_assurance.md`: 第5层从字数评分改为洞察密度评分，第3层深挖循环整合So What

**变更4: 五引擎依赖标注**
- **升级** `docs/deep_dive_protocol.md`: 五引擎部分新增数据依赖矩阵，E2+E3一致只算1票

**变更5: 看空分析等权重**
- **新增** `docs/bear_case_methodology.md` — 看空≥30%篇幅+四要素+钢人论证
- **升级** `docs/deep_dive_protocol.md` Phase 4: 新增看空等权重要求+So What抽查

**变更6: 时效性标注**
- **升级** `modules/universal.md` + `modules/consumer.md`: 每模块新增时效性列(实时/季度/年度/永久)

**其他**
- **升级** 铁律从9条扩展到12条(新增三层标注+看空等权+模块So What)
- **新增** `docs/v21_migration_guide.md` — v20→v21迁移指南
- **更新** `CLAUDE.md` 文档索引: 新增5个文档条目

---

## [v3.1-debate-scanner] - 2026-02-06

### MINOR - Market Debate Scanner 模块

- **新增** `docs/market_debate_scanner.md` — 市场争论扫描器，自动搜索投资者最关心的争论话题
- **核心机制**: Phase 0 自动执行 → 提炼8-12个争论 → 与标准模块交叉比对 → 未覆盖争论自动注入为Ad-hoc模块
- **升级** `docs/deep_dive_protocol.md` v3.0→v3.1: Phase 0新增争论扫描步骤，Phase 1新增争论图谱展示
- **更新** `CLAUDE.md` 文档索引新增 market_debate_scanner.md
- **设计动机**: TSM v2.0反思发现标准模板可能遗漏市场当下最关心的话题（如AMD的OpenAI大单股权稀释、H1产品空窗期等）

## [v3.0-framework] - 2026-02-06

### MAJOR - Deep-Dive协议v3.0 + 行为金融 + SOTP方法论

基于TSM v2.0深度研究的系统性反思，修复7个结构性问题。

- **新增** `docs/behavioral_finance.md` — 四项认知偏差检查清单+量化修正模板+投资者情绪评分
- **新增** `docs/sotp_methodology.md` — SOTP分部估值5步标准流程+极端压力测试+行业适配
- **重写** `docs/deep_dive_protocol.md` — 4Phase→6Phase架构（新增Phase 0数据基础 + Phase 4对抗审查）
- **升级** 数据源标注规范: `[实际数据]`/`[分析师估算]` → `[A:]`/`[B:]`/`[P:]`/`[E:]` 强制标注，≥15标注/万字
- **升级** 字符计量标准: wc -c(字节) → wc -m(Unicode字符)，修正中文~74%膨胀
- **升级** 字数目标: 基础从80,000字节降至85,000字符(实际更准确)，行业系数调整(半导体1.8→1.5)
- **升级** `data-prefetch` v2.0→v3.0: 新增Agent-F(Smart Money 13F) + Agent-G(期权/做空) + 3层容错机制
- **新增** 时间预算保护: Phase 4+5合计≥25%总时间，禁止压缩决策阶段
- **新增** Hooks: 报告文件数据标注密度检查
- **更新** `CLAUDE.md`: 新增2个文档索引条目 + 规则8字符计量 + Tier 3描述更新
- **更新** `docs/time_management.md`: 新增Tier 3 Phase时间分配表

## [v20.0] - 2026-02-05

### MAJOR - 预测市场增强框架全面升级

- **新增** v10.0预测市场驱动分析系统（五引擎协同）
- **新增** PPDA概率-价格背离分析算法
- **新增** PMSI预测市场情绪指数
- **新增** 12重动态Kill Switch风险管理系统
- **升级** 字数要求从≥60,000×系数提升到≥120,000×系数（+100%）
- **升级** 深度等级从L3.5提升到L4.5+（+57%）
- **升级** 证据质量从A+B级≥85%提升到≥95%
- **升级** 所有行业复杂度系数（半导体×2.0，消费品×1.8，科技×1.7等）
- **验证** TSM案例成功验证，120,847字符报告，87.4/100综合评分

## [v20.0-slim] - 2026-02-06

### MINOR - CLAUDE.md 瘦身优化

- **移出** v20.0升级总结到 `docs/v20_upgrade_summary.md`（减少~120行）
- **精简** 并行Agent加速系统（97行→~35行）
- **精简** 大项目阶段管理系统（~200行→~120行）
- **精简** Worktree规则（~292行→~180行）
- **新增** 框架开发规范 v1.0（技能文件创建、迁移文档、变更记录规则）
- **新增** CHANGELOG.md 项目变更日志
- **新增** hooks 配置（.md文件断链引用检查）
- **更新** 文档索引表（增加新文件引用）

## [v19.12] - 2026-01-31

### MINOR - 格式决策与基础规则

- **决定** 只做深度调研 MD 格式，不转 HTML
- **决定** 报告末尾必须加免责声明

## [v2.0-stage-mgmt] - 2026-01-xx

### MINOR - 大项目阶段管理系统升级

- **升级** 阶段管理从建议性规则到硬性阻断规则（铁律ABC）
- **新增** 铁律A: 单会话禁跨Phase
- **新增** 铁律B: 阶段完成=必须Git Commit
- **新增** 铁律C: 目标捆绑硬性限制

## [v1.0-worktree] - 2026-01-xx

### MINOR - Worktree小白友好规则

- **新增** 强制位置确认系统
- **新增** 智能位置切换（确认制）
- **新增** 防呆保护机制
- **新增** 工作流程严格区分规则（push vs merge）

## [v1.0-parallel] - 2026-01-xx

### MINOR - 并行Agent加速系统

- **新增** 并行优先原则
- **新增** 五引擎并行模式
- **新增** 自动并行触发规则
