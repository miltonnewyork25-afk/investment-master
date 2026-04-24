---
name: v22.3-v22.6 累积升级复盘
description: 5 次开源项目借鉴 + 2 次评估拒绝后的阶段性系统复盘
type: project
status: active
confidence: 0.90
last_validated_at: "2026-04-16"
---

## v22.3-v22.6 累积升级复盘 (2026-04-16)

### 一、总览

**7 次开源项目评估 → 5 次实施借鉴**

| 版本 | 项目 | 结果 | 新脚本 |
|---|---|---|---|
| v22.3 | Hermes Agent | ✓ 借 (5 项) | 3 |
| v22.3 | MiroFlow | ✓ 借 (4 项) | 2 |
| v22.4 | LLM Wiki v2 | ✓ 借 (3 项) | 1 |
| v22.5 | gstack | ✓ 借 (1 项) | 1 |
| v22.6 | STORM | ✓ 借 (1 项) | 1 |
| — | GPT Researcher | ✗ 评估不借 | 0 |
| — | Open Deep Research | ✗ 评估不借 | 0 |

**成功率 5/7 = 71%** — 反过度工程原则验证生效, 不是每次都能找到值得借鉴的机制。

### 二、累积产出

**代码**:
- 8 个新 bash 脚本 (2035 行, 含内嵌 Python)
- 3 个新 yaml 配置 (evolution_guardrails / research_modes / pattern_registry 扩展)
- 2 个已有脚本修改 (phase_complete.sh / tier3_launch.sh)
- 铁律 G 新增 G16 (Ephemeral Injection) + G17 (主动压缩脚本)
- **0 个新目录, 0 个 Python 独立模块, 0 个 Python 依赖**

**文档**:
- 7 个 memory 文件 (5 个借鉴记录 + 1 个双项目评估 + 本文档)
- CLAUDE.md 新增 4 行指向新脚本

### 三、实施的机制清单

**8 个新脚本按职能分类**:

| 类别 | 脚本 | 核心机制 |
|---|---|---|
| **Context 管理** | `context_compress.sh` | 五步压缩 + 工具摘要生成 (Hermes) |
| **门控治理** | `evolution_gate.sh` | 5 道门控 Size/Growth/Structure/Duplicate/Count (Hermes) |
| **检索** | `search_past_analysis.sh` | 跨报告关键词搜索 + default/audit 模式 (Hermes + LLM Wiki v2) |
| **回滚检测** | `research_rollback.sh` | 4 信号: 重复/循环/偏轨/低产出 (MiroFlow) |
| **质量度量** | `quality_statistical_eval.sh` | 跨 73 份报告 mean/std/min/max/trend/异常值 (MiroFlow) |
| **记忆生命周期** | `memory_lifecycle.sh` | supersede / invalidate / archive / list-retired (LLM Wiki v2) |
| **Learning 注入** | `phase_context_inject.sh` | ticker+industry+关键词 → top 3 pattern (gstack) |
| **未引用证据** | `unused_evidence_detector.sh` | staging DM - final DM 差集 + 相关性排序 (STORM/Co-STORM) |

### 四、意外收获: 系统首次获得"质量度量能力"

本轮最大的非预期收获 = `quality_statistical_eval.sh` 暴露了**长期质量下降信号**:

```
73 份报告全部:  DM 密度 mean=1.51  trend=↓ -14.6%
最近 20 份:    DM 密度 mean=1.29  trend=↓ -65.3%  ⚠
```

**准确定位到 3 个 DM=0 的异常报告** (全部是已知失败案例):
- `LITE v2.0 fragment` (30110 字符, 0 DM) — rule-S v1.0 失败 POC
- `PDD v3.0 FAILED_POC` (12272 字符, 0 DM) — rule-S v1.0 教训
- `LITE` 另一个 draft (171958 字符, 0 DM)

**意义**: 
- 之前只能**凭感觉**说"最近报告质量好像在下降"
- 现在可以**定量**说"DM 密度趋势 ↓ -14.6%, std=1.22, min=0.00 有 3 个异常值"
- 这是从"主观判断"到"可度量"的根本性提升

### 五、代码整洁度判断

**不建议进一步重构** (反过度工程):

每个脚本都有样板代码 (色彩定义 5-6 行, 路径变量 2 行 = ~60 行重复 / 2035 行 = 3%), 但:
1. **合并成 `_common.sh` 会引入抽象层** — 违反 "Don't create helpers for one-time operations" (CLAUDE.md 指令)
2. **每个脚本独立可运行** — 无真正运行时依赖, 只在 usage 字符串里互相引用
3. **60 行不是瓶颈** — 瓶颈是分析深度, 不是脚本整洁

**小修复已完成**:
- `context_compress.sh` 补充 `exit 0` (之前只有 exit 1)

**不修复的项**:
- 每个脚本独立的色彩定义 (保持独立运行能力)
- Python heredoc 风格不一致 (内嵌 vs `python3 -c`) — 按各自场景合适选择

### 六、系统性风险识别 (未处理)

**风险 1: 质量度量暴露的长期下降趋势**

数据:
- DM 密度: 最近 20 份 -65.3% (严重)
- Mermaid 数: 73 份 -12.0%
- 字符数: 73 份 -7.8%
- 因果密度: **稳定** → +2.7%

**含义**: 我们可能在写"更简洁"的报告, 但 DM 引用纪律在下滑。这值得**单独立项处理**, 不在本次范围。

**风险 2: scripts/ 有未清理的实验性文件**

看到 git status 里有 `attention_balance_*.sh` / `ci_balance_enforcer.sh` / `concept_substitution_enforcer.sh` 等 10+ 个未追踪文件, 也有 `.claude/meta/` 里的 Python 实验。这些可能违反反膨胀铁律 M, 但不是本轮造成的。

**建议**: 单独做一次"系统清理"会话, 不混入本轮。

### 七、学到的方法论 (7 次评估共识)

**1. 必读实际代码, 不只读 README**
3 个项目 (GPT-R / ODR / gstack) 的 handoff 文档与代码实态有偏差。只读 README 会得出错误的借鉴判断。

**2. "独特可代码化机制" 是筛选关键**
不是每个开源项目都有独特的可迁移机制。GPT-R 的 reviewer 比我们红队弱, ODR 自己都抛弃了 section-grading。

**3. 严格反过度工程**
宁可 5/7 借鉴率, 不要 7/7 全借。每次借鉴**最多实施 1-5 项**, 其他严格拒绝。

**4. 识别 breadth vs depth 定位**
breadth-focused 项目 (GPT-R, 15 retrievers) 对我们深度导向系统价值低。

**5. 注意 handoff doc 时效性**
开源项目架构演化快。ODR 显式抛弃了 section-grading; GPT-R 路径从 master/ 迁移到顶层。

**6. 拒绝也是有价值的记录**
2 个"评估不借"的项目也被记录。未来重读同一项目时不必重复评估。

**7. 借鉴 ≠ 改动**
有些借鉴是**反思**不是**实施**。ODR 从 in-graph grading 外置 evaluator 的架构演化, 给我们 `red-team-suite` 自我合谋风险提了警示, 但不因此重构。

### 八、下一步可选方向 (不做也可以)

**候选 1: 针对 DM 密度下降问题, 在 pattern_registry 加 PAT-09**
```yaml
- id: PAT-09
  name: "DM 密度长期衰减"
  principle: "长期来看, DM 引用纪律会自然下滑 (已记录 73 份报告 -14.6%). 需要定期扫描+单篇写作时强制检测, 才能维持质量标杆."
  trigger: "quality_statistical_eval 趋势 ↓ > 10%"
  fix: "Phase 5 mid_assembly_check 加 DM 密度实时告警"
  occurrences: 1 (本次统计检出)
  status: active
  confidence: 0.75
```
但这是**单实例发现**, 按我们的压缩协议需要 ≥2 个独立证据才能进 registry。**不做**, 等下次报告再验证。

**候选 2: 清理 scripts/ 和 .claude/meta/ 的实验文件**
独立会话做, 不混入本轮。

**候选 3: 针对质量下降做一次全框架 audit**
需要用户明确触发, 不在本轮范围。

### 九、How to apply

**未来新项目评估标准流程** (从 7 次提炼):

1. 读 handoff 文档 (如果有) → 先建立假设
2. **派并行 agent 读实际代码** (2-3 路) → 验证假设
3. 对比 5-7 项建议借鉴 vs 我们现状 → 识别"真实缺口"
4. 筛选出 ≤3 项 "独特且可代码化" 的机制
5. **如果 0 项 → 诚实地说不借**, 写评估 memory 留档
6. 实施的每项: 脚本 + 集成 + 文档 + memory 记录
7. 完成后跑 `evolution_gate` 验证无 BLOCK

**核心原则**: 每次升级后如无必要, **不做代码合并/抽象**。保持每个脚本独立。
