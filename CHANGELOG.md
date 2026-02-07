# Changelog

本文件记录投资研究 Agent 框架的所有重大变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

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
