## 铁律 U: Skill二元激活表 (v1.0, 6框架升级)

> **源自**: Harness Engineering Ch6 Tool Preference Steering — 在最早决策点用二元格式路由
> **核心**: 替换"每Phase仅3-5个skill"的模糊指导 → Phase×任务→必须/可选/禁止的确定性路由
> **原则**: 用X, 不用Y (NOT Z) — 二元选择消除决策模糊; 战略冗余对抗注意力衰减

---

### U-1: Phase→Skill激活矩阵

| Phase | 必须激活 (不调用=违规) | 可选 (按需调用) | 禁止 (调用=浪费context) |
|-------|----------------------|----------------|----------------------|
| **Phase -1/-0.5** | `data-prefetch`, `orchestrator` | — | 其他所有skill |
| **Phase 0-0.75** | `orchestrator` | `quick-company-scan` | `red-team-suite`, `content-engine`, `deep-reflection` |
| **Phase 1** | `moat-evaluator`, `expectation-gap` | `game-theory-lens`, `competitive-benchmarking`, `ai-impact-analyzer`, `workflow-shift-detector` | `red-team-suite`, `content-engine`, `valuation-quality-gate` |
| **Phase 2** | `valuation-builder` | `assumption-audit`, `investment-logic-toolkit` | `content-engine`, `deep-reflection` |
| **Phase 3** | `competitive-benchmarking` | `game-theory-lens`, `risk-topology`, `consumer-brand-analysis-toolkit` | `content-engine` |
| **Phase 4** | `red-team-suite` | `assumption-audit`, `omission-scanner`, `cq-lifecycle-tracker` | `content-engine`, `data-prefetch` |
| **Phase 4.5** | `investment-committee`, `cognitive-boundary-assessor` | `valuation-quality-gate`, `narrative-discipline` | `data-prefetch` |
| **Phase 5** | `harness-controller` | `narrative-discipline` | `data-prefetch`, `red-team-suite`, `orchestrator` |
| **Post-Phase 5** | `deep-reflection` | `content-engine` | `data-prefetch`, `orchestrator` |

### U-2: P0原型→Skill路由修正

> 不是所有公司都需要所有skill。P0识别后, 在激活矩阵上叠加修正。

| P0原型 | 额外必须 | 额外禁止 | 原因 |
|--------|---------|---------|------|
| **软件平台/SaaS** | `expectation-gap` (Phase 1); P2.5∈{正在翻转/已翻转未定价/混沌多叙事}时**额外必须** `workflow-shift-detector` (Phase 1) | — | NRR/Rule of 40是核心变量; workflow迁移定位新owner |
| **网络基础设施** | `game-theory-lens` (Phase 3); 出现新接口/新协议/agent绕过信号时**额外必须** `workflow-shift-detector` (Phase 1) | — | 互动结构决定定价权; chokepoint最大威胁=被绕过 |
| **制度垄断/chokepoint** | `game-theory-lens` (Phase 3) | `competitive-benchmarking` (降级可选) | 竞争格局相对固定 |
| **运营密度** | `consumer-brand-analysis-toolkit`; 渠道/分发层重构时**可选** `workflow-shift-detector` | — | 品牌/渠道是核心壁垒 |
| **黑箱算法** | `cognitive-boundary-assessor` (Phase 1前置) | — | 早期识别分析边界 |
| **重资本再投资** | `valuation-builder` (Phase 1前置); 下游workflow被AI重构时**可选** `workflow-shift-detector` | — | CapEx周期是核心变量;下游迁移影响产能/槽位分配 |
| **周期股** | `risk-topology` (Phase 2必须) | — | 周期位置决定一切 |
| **科技平台+AI** | `ai-impact-analyzer` (Phase 1必须) + `workflow-shift-detector` (Phase 1必须, 先于ai-impact) | — | ai-impact回答方向/幅度,workflow-shift回答"新owner在哪"——串联顺序不可颠倒 |

### U-3: Skill成本预算 (数值锚定)

| 指标 | 阈值 | 原因 |
|------|------|------|
| 单Phase激活skill数 | **≤5个** | 每个skill描述~250字符, 5个=1.25K, >5个开始显著消耗context |
| 单次skill调用context消耗 | **≤8K tokens** | Skill截断保留头部5K(铁律G9), 超8K的部分大概率被压缩丢失 |
| 全报告skill总调用次数 | **≤30次** | 超过30次=过度流程化, 分析密度必然下降(铁律M3) |
| 同一skill重复调用 | **≤3次** | 同一skill调用>3次=要么参数错, 要么不该用这个skill |

### U-4: 二元路由速查 (写在最早决策点)

**选择困难时用这张表**:

| 你想做的事 | 用这个 (✓) | 不用这个 (✗) | 原因 |
|-----------|-----------|-------------|------|
| 快速看一家公司 | `quick-company-scan` | `standard-analysis`, `orchestrator` | 5分钟 vs 2小时 |
| 标准分析 | `standard-analysis` | `orchestrator` (Tier 3专用) | 复杂度不需要DAG编排 |
| 深度分析启动 | `orchestrator` + `tier3_launch.sh` | 手动Phase | 脚本强制>prompt记忆 |
| 评估护城河 | `moat-evaluator` | 手写护城河章节 | 框架v2.0有定价权分层 |
| 做估值 | `valuation-builder` + Python | 纯文字估值 | LLM不能做算术 |
| 红队审查 | `red-team-suite` | 手写"风险是..." | 7问+双向校准+有效性门控 |
| 博弈分析 | `game-theory-lens` | 手写"竞争格局..." | 结构化博弈>叙事性描述 |
| 找预期差 | `expectation-gap` | 手写"市场错在..." | E→R→G→T四步闭环 |
| 判断AI对公司的方向/幅度 | `ai-impact-analyzer` | `workflow-shift-detector` | ai-impact回答"利好还是利空",workflow-shift回答"新owner在哪" |
| 判断workflow控制权迁移/新经济owner | `workflow-shift-detector` | `ai-impact-analyzer` (NOT `expectation-gap`) | 结构判断先于影响评估;串联顺序: workflow-shift → moat-evaluator → ai-impact → expectation-gap |
| 写传播内容 | `content-engine` | 直接改报告 | 报告≠传播, 不同受众不同语言 |
| 检查遗漏 | `omission-scanner` | 自己检查 | AI自查遗漏=用同一盲点检查盲点 |

### U-5: 渐进式Skill升级 (失败时)

```
Skill调用失败 → ①读错误(缺前置数据? 参数错?) → ②补前置数据重试1次 → ③降级到手动分析(用skill框架但不调用skill)
NEVER: Skill失败就跳过该维度 | 同一Skill同参数重试>2次 | 用"该维度不重要"合理化跳过
因为: 遗漏关键维度 > 重复 (铁律M6)
```

---

### 与现有规则的关系

- CLAUDE.md "预算意识: 每Phase仅3-5个skill" → 本铁律U-1的详细展开+数值化
- CLAUDE.md "双向闭环" → U-4二元路由表实现了"Skill A说用B"的闭环
- 铁律M (反膨胀) → U-3成本预算的原因
- 铁律G (Context管理) G9/G15 → Skill加载=工具定义膨胀, U-3是量化约束
