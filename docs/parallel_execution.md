# 并行Agent加速系统 v7.0

> **设计目的**：利用Task Agent能力并行执行独立分析任务，大幅缩短分析时间
> **验证基准**：10份Tier 3报告实证(GOOGL/TSLA/PLTR/LRCX/TSM/AMD/META/SOFI/COST/MU)
> **v7.0变化**: 3+1 Agent架构(Agent A/B/C + QSA质量哨兵)、最低Agent数量门控(≥20)、与DAG编排器v22.0集成、跨Session角色一致性机制
> **v6.0变化**: Agent架构从硬规格改为指导原则、模块类型驱动产出目标、看空Agent强制独立、实证参考表
> **v5.0变化**: SubAgent输出压缩(≤500字符返回)、checkpoint.yaml批次间写入
> **v4.0变化**: Agent Prompt反幻觉注入、DM引用规范、Quality Gate v2.0集成

---

## 核心原则

**并行优先原则**：
- 独立任务**必须并行**执行
- 依赖任务**顺序**执行
- 自动识别任务依赖关系
- 最大化时间效率

---

## 可并行任务识别

**适合并行的分析任务**：

| 任务类型 | 并行方式 | 预计节省 | 示例 |
|---------|---------|---------|------|
| **多引擎分析** | 每引擎一个agent | ~70% | 周期+股权+聪明钱+信号+预测市场 |
| **多公司对比** | 每公司一个agent | ~60% | 同行业3-5家公司基础数据收集 |
| **多数据源收集** | 每数据源一个agent | ~50% | 多个财务/行业数据源并行获取 |
| **多维度验证** | 每维度一个agent | ~65% | 技术+周期+AI+地缘四维交叉验证 |
| **多品牌对比** | 每品牌一个agent | ~60% | 消费品多品牌价值+市场份额对比 |

**不适合并行的任务**：
- 有依赖关系的分析步骤（如周期定位→估值计算）
- 需要前序结论的判断（如风险评估→Kill Switch设置）
- 单一简单任务

---

## 自动并行触发规则

**检测到以下情况时自动建议并行**：
```yaml
触发条件:
  - 同时分析多个独立维度
  - 同时处理多家公司
  - 需要从多个数据源收集信息
  - 预估顺序执行>30分钟

自动响应:
  Claude: "检测到可并行任务，建议启动并行分析：

  顺序执行: ~70分钟
  并行执行: ~20分钟 (节省71%)

  确认启动并行？"
```

---

## 执行方式

```yaml
执行方式: 使用 Task tool 同时启动 Explore agents
限制: 最大 3-5 个并行 agent

示例 - 多维度分析:
  Agent 1: "维度A数据收集与分析"
  Agent 2: "维度B数据收集与分析"
  Agent 3: "维度C数据收集与分析"
  主Agent: 汇总对比 → 生成综合分析

结果汇总:
  - 收集各agent摘要返回 (≤500字符/agent)
  - 从staging文件读取完整内容进行合并
  - 交叉验证一致性
  - 识别分歧点
  - 生成综合报告
```

---

## 并行进度监控

**实时状态显示模板**：
```
📊 并行分析进度：

Agent 1 [维度A]   ████████░░ 80%  分析中...
Agent 2 [维度B]   ██████████ 100% ✅ 完成
Agent 3 [维度C]   █████░░░░░ 50%  数据收集中...

⏱️ 已用时间: 12分钟 | 预计剩余: 8分钟
```

---

## 3+1 Agent架构 (v7.0新增)

> **实证来源**: GOOGL v4.0(最佳报告, 9 Agent, 3×3并行, 453.5K) — 成功靠角色固定+跨Session一致，不是角色数量多。
> **与DAG编排器集成**: 详见 `docs/dag_orchestrator.md` 子代理模型v2.0。

### 核心架构: 3个研究Agent + 1个质量哨兵

> **身份模型 v7.1**: Agent身份 = 分析哲学 + 质量直觉 + 本次任务，不是功能标签。
> **完整身份定义**: `docs/dag_orchestrator.md` "Agent身份与行为规则"

| 代号 | 定位 | 分析哲学(核心) | 产出目标 | GOOGL实证 |
|------|------|---------------|---------|----------|
| **Agent A** | 商业洞察分析师 | 穿透公司自我叙事，找到真正的竞争身份。特异性测试：换公司名仍成立→太空泛 | 12-18K/session | 116K(25.6%) |
| **Agent B** | 独立风险审计员 | 找到论文中最脆弱的假设并压力测试。价值在于发现别人不愿面对的风险 | 12-18K/session | 148K(32.6%) |
| **Agent C** | 定量估值分析师 | "市场在赌什么"比"我认为值多少"更有价值。方法离散度本身就是不确定性量化 | 15-22K/session | 267K(58.9%) |
| **QSA** | 质量哨兵 | 脚本检查: 数值一致/密度/合规/EC完备 | N/A(脚本) | N/A |

### 角色一致性规则 (GOOGL成功核心)

```yaml
跨Session规则:
  Agent_A: "分析师身份固定，不因Session切换而改变。永远做商业洞察"
  Agent_B: "Phase 1-3做护城河/竞争，Phase 4自动切换Bear隔离模式"
  Agent_C: "估值模型参数跨Session继承，不重新计算已verified的EC"

身份注入规则:
  每次dispatch: "必须注入完整identity + quality_bar + this_session字段"
  禁止: "将identity缩写为单行role标签(如'你是估值专家')"
  this_session: "编排器每次dispatch时填入本Phase具体任务(identity和quality_bar固定不变)"

角色边界:
  禁止: "Agent A做估值计算 | Agent C写叙事定义 | Agent B在非P4时做Bear Case"
  允许: "各Agent创建自己领域的EC(轻量级fact/estimate直接写入)"
```

### 最低Agent数量门控 (v7.0新增)

> **实证**: 19个Agent是CG通过的硬性门槛。MU(15 Agent)是唯一CG失败的报告。

| Phase | 最低 | 推荐 | 铁律 |
|:-----:|:----:|:----:|:----:|
| P0/P0.5 | 3 | 3-5 | — |
| P1 | 3 | 3-4 | — |
| P2 | 3 | 4-5 | — |
| P3 | 3 | 4-5 | — |
| P4 | 3 | 3-4 | — |
| P5 | **3** | **3** | **铁律** |
| **合计** | **≥20** | **22-29** | — |

**门控检查**: 编排器在生成执行计划时，计算总Agent数。<20 → WARN + 建议增加。

### 与旧版的兼容性

- Agent A = 旧版Agent A/希腊字母α (叙事类)
- Agent B = 旧版Agent B/希腊字母β (风险类) + 旧BP角色(Phase 4)
- Agent C = 旧版Agent C/希腊字母γ (估值类) + 旧VAL角色
- QSA = 新增，替代旧DQA+GOV的脚本化部分
- 旧SUP = 编排器本身(不是独立Agent)

---

## Agent架构指导原则 (v6.0 → 整合入v7.0)

> 基于10份Tier 3报告实证。v7.0: 3+1架构 + 最低Agent门控 + 角色一致性。v6.1: P5=3A铁律 + P4看空≥50%。
> 以下为指导原则，非硬性规格。**例外: 原则6(P5=3Agent)和最低Agent门控(≥20)是铁律**。

### 原则1: 模块驱动Agent数量

Agent数量由分析模块数决定，不是固定数字。
- 简单公司(单一业务): Phase可能只需2-3 Agent
- 复杂公司(多分部/多平台): Phase可能需4-5 Agent
- 批次间写checkpoint.yaml，批次完成后可选/compact

### 原则2: 按模块类型设产出目标

| 模块类型 | 产出范围 | 典型示例 |
|---------|---------|---------|
| 数据密集型 | 12-20K字符 | 财务分析、SOTP估值、护城河量化 |
| 分析判断型 | 10-15K字符 | 偏差检查、五引擎协同、PPDA |
| 输出型 | 5-8K字符 | 投资日历、行动清单、Phase 0.5 CQ |
| 专精对抗型 | 15-22K字符 | 看空等权分析、Kill Switch注册表 |

### 原则3: Context感知动态调整

```yaml
会话前期 (Phase 1-2): context充裕，可dispatch 4-5 Agent
会话中期 (Phase 3):   视余量dispatch 3-4 Agent
会话后期 (Phase 4-5): 降到2-3 Agent
跨会话恢复:           新会话context全新，可dispatch更多

每批次完成后必须:
  1. 写入/更新 checkpoint.yaml
  2. 评估context余量
  3. 余量不足 → 减少下批Agent数 或 开新会话
```

### 原则4: 看空Agent必须独立

Phase 4的看空分析Agent（Bear Case Advocate）必须:
- **不读**前序Phase的看多结论和shared_context中的投资论点
- **只读**原始数据（DM锚点）+ Core Questions + 公开财报
- 独立形成看空论点后，由主线程与看多结论对抗合并

### 原则5: Checkpoint必写

每批次Agent完成后、每Phase结束时，写入 `reports/{TICKER}/data/checkpoint.yaml`。
详见 `docs/checkpoint_protocol.md`。

### 原则6: Phase 5 = 3 Agent (铁律) — v6.1新增

**这是铁律，不是指导原则。** 基于META/SOFI/TSM三项目一致验证:

```
Phase 5固定3个Agent (v7.0更新角色名):
  Agent A: 综合评估(定性评级) + SOTP收敛(6方法) + 条件估值范围
  Agent B: Kill Switch注册表 + TS追踪信号 + 12月投资日历
  Agent C: CQ最终解答(5要素闭环) + CI注册表 + 框架注册表
```

**实证**:
- META P5: 3A → ~100%目标达成
- SOFI P5: 3A → ~100%目标达成
- TSM P5: 3A → **205%目标达成**(69.7K, 最高效P5)

**禁止**: P5使用4+Agent(会重叠) 或 2-Agent(会遗漏)。

### 原则7: Phase 4看空Agent≥50% — v6.1新增

Phase 4的Agent中至少50%必须是**纯看空Agent**(不含校准/数据核查):

```
推荐P4配置(4个Agent):
  Agent A: 看空论点构建 (纯看空, 信息隔离)
  Agent B: 行为金融偏差检查 + 黑天鹅/尾部风险 (看空)
  Agent C: 数据核查 + 聪明钱验证 (中立校准)
  Agent D: 维度回检 + 估值压力测试 (中立校准)
  → 看空占比: 50% (A+B)
```

**依据**: TSM P4=16.5%(改善但仍<18%目标), 前5报告bear case仅10-13%。

### 实证参考（v6.1更新 — 13项目）

| 项目 | Agent总数 | 每Agent均产出 | Complete字符 | 最优实践 |
|------|:---:|:---:|:---:|------|
| TSLA(生态科技) | ~25+ | ~18K | 534K | OVM-7 PMX最复杂案例 |
| GOOGL v3(生态科技) | ~25+ | ~18K | 528K | OVM TAM Ceiling杀手级信号 |
| PLTR(生态科技) | ~25+ | ~16K | 457K | P0.5规划5A, 最大Agent团队 |
| TSM v2(半导体) | ~29 | ~15K | 451K | P2:5A(148K), P5:3A(69.7K铁律) |
| META(科技平台) | ~25 | ~14K | 317K | 专精Agent, 希腊字母命名 |
| SOFI(金融) | ~19 | ~15K | 295K | checkpoint恢复, 3-5/Phase |
| COST(消费品) | ~27 | ~10K | 282K | CI注册表+框架注册表首发 |
| MU(半导体) | ~15 | ~12K | 179K | v26首尝试, CG1需扩展 |

---

## 多Agent协作协议

> 详见 `docs/agent_collaboration_protocol.md`

**解决的5+3个痛点**:
1. 重复I/O → **共享上下文** (`shared_context.md`, Data Master格式)
2. 无质量预检 → **双维度质量门控** P-G(Fast Gate) + R-G(结果检查)
3. 无session恢复 → **任务锁** (`current_tasks/Agent{X}.lock.md`)
4. 无失败记录 → **Agent执行日志** (`agent_logs/`)
5. 批量commit → **增量提交** (每Agent完成即commit)
6. Agent幻觉 (v4.0) → **反幻觉5条禁令**注入每个SubAgent prompt
7. 数据版本混乱 (v4.0) → **DM引用规范** Agent必须用 `[DM-xxx vN.N]` 引用数据
8. 假设不一致 (v4.0) → **KAL引用规范** Agent必须用 `[KA-xxx]` 引用假设

### Agent Prompt v6.0 必须注入项 (v4.0新增)

每个SubAgent dispatch时，prompt中除现有要求外，还必须包含:

1. **反幻觉5条禁令** — 完整文本见 `docs/anti_hallucination_protocol.md` "Agent Prompt 反幻觉5条禁令"
2. **DM引用指令** — "引用数据时必须附带 [DM-xxx vN.N] 标注"
3. **KAL引用指令** — "引用假设时必须附带 [KA-xxx] 标注"
4. **自检清单** — "完成后统计无源数字数量，补充来源或标注'数据待获取'"
5. **返回格式约束 (v5.0)** — 完成后将完整内容写入staging文件，仅返回≤500字符结构化摘要。格式: agent/file/chars/qg/top3/anchors。禁止将全文返回主线程。
