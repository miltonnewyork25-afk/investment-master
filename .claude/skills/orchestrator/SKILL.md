---
name: orchestrator
description: 投资分析框架编排器。识别公司行业，组装通用模块+行业适配模块，生成执行清单和进度追踪。当用户要求分析任何公司时自动触发。
---

# 投资分析框架编排器 v22.0 (DAG-Aware)

> **核心指令**: 你是无答案编排器。你只能输出问题。每个问题必须绑定 Proof/Artifact/Owner/Stop/Metric。关键约束优先用脚本/checkpoint强制，不靠prompt记忆。
> **完整DAG规范**: `docs/dag_orchestrator.md`
> **Evidence Card规范**: `docs/evidence_card_schema.md`
> **门禁迁移表**: `docs/deterministic_gates.md`

## 触发条件

当检测到以下关键词时自动执行：深度分析、研究、调研、analyze、股票代码

## v22.0 vs v21.0 核心变化

| 维度 | v21.0 | v22.0 |
|------|-------|-------|
| 编排逻辑 | 按模块填空 | **按问题树展开** |
| 数据工件 | DM 锚点 | **Evidence Cards (EC)** |
| 质量保证 | prompt 规则 | **确定性门禁 + prompt** |
| 验证方式 | 自报自审 | **CoVe 隔离验证** |
| 反思时机 | 仅事后 | **PreFlect(事前) + 事后** |
| Bear隔离 | 原则 | **Contamination Guard 白名单** |
| 停止条件 | Phase完成 | **每个问题有自动评分Stop** |

## 执行流程 (7步 → DAG映射)

### Step 1: DAG-0 Scope Lock (范围锁定)

**1a. 识别行业** (不变)

| 行业 | 适配器文件 | 代表公司 | 复杂度系数 |
|------|-----------|---------|-----------|
| 半导体 | `modules/semiconductor.md` | TSM, MU, LRCX, NVDA, ASML | 2.0 |
| 消费品 | `modules/consumer.md` | PG, KO, COST, NKE, LVMH | 1.8 |
| 科技平台 | `modules/tech_platform.md` | META, GOOG, AMZN, MSFT, AAPL | 1.7 |
| 金融 | `modules/financial.md` | JPM, GS, BRK, V, MA | 1.6 |
| 其他 | 仅用通用模块 | - | 1.0 |

**1b. 边界锁定** — 编排器输出 8 个 DAG-0 问题(见 `docs/dag_orchestrator.md` DAG-0节)

必须确认:
- [ ] task.goal 定义完成
- [ ] task.out_of_scope[] ≥ 5 项
- [ ] governance.allowed_tools[] 列出
- [ ] gates.enforced_by_platform[] 映射 ≥80%
- [ ] abtest.env_fingerprint 生成
- [ ] run.checkpoint_policy 定义
- [ ] stop.criteria[] + stop.max_turns 定义
- [ ] risk.failure_modes[] ≥ 3 个 + 每个有 detector

**1c. 环境指纹**

```yaml
env_fingerprint:
  framework_version: "v12.0"
  git_hash: "{当前commit}"
  data_date: "{YYYY-MM-DD}"
  stock_price_cutoff: "${价格}@{日期}"
  mcp_tools: [baggers_summary, fmp_data, analyze_stock, polymarket_events]
```

**Stop**: scope.locked == 1 AND gates.mapped_ratio >= 0.80

### Step 2: 数据预取 + EC 初始化 (DAG-0 + DAG-2)

触发 `/data-prefetch` 技能:
1. MCP 工具获取实时数据 → 3个文件
2. 5个并行 WebSearch Agent → 6个文件
3. Python 估值模型 → 2个文件
4. 缓存到 `data/research/{TICKER}/`

**v22.0 新增**: 预取数据自动转化为 EC (draft 状态):
- MCP 输出 → EC-FIN-xxx (claim_type: fact, source.type: MCP)
- WebSearch → EC-MKT-xxx (claim_type: estimate, source.type: WebSearch)
- 模型输出 → EC-VAL-xxx (claim_type: inference, method: DCF/SOTP)

### Step 3: DAG-1 Question DAG 构建

**3a. 加载 Phase 0.5**: 读取 CQ 清单

**3b. CQ → L1/L2 分解**: 编排器输出 DAG-1 的 6 个问题

```yaml
# 编排器产出 (写入 reports/{TICKER}/data/question_dag.yaml)
question_dag:
  L1:
    - id: Q-L1-01
      question: "{CQ1 文本}"
      L2:
        - id: Q-L2-01a
          question: "{子问题}"
          minimum_observation: "{工具调用}"
          owner: EL
          stop: "{收敛条件}"
        - id: Q-L2-01b
          ...
  definitions:
    - "{口径1}: {定义}"
    - "{口径2}: {定义}"
  preflect_nodes:
    - trigger: "Phase 2 开始前"
      questions: ["估值框架是否匹配可能性宽度?"]
    - trigger: "Phase 4 开始前"
      questions: ["对抗策略是否覆盖承重墙?"]
```

**Stop**: qdag.coverage >= 0.90 AND min_observation.specified_ratio >= 0.85 AND preflect.inserted >= 2

### Step 4: 五引擎预热 (不变)

| 顺序 | 引擎 | 启动动作 |
|------|------|---------|
| 1 | 竞争博弈引擎 | 加载行业竞争格局数据 |
| 2 | 周期定位引擎 | 加载行业周期指标 |
| 3 | 估值重构引擎 | 加载预取的 DCF + 可比公司数据 |
| 4 | 预测市场引擎 | WebSearch: site:polymarket.com |
| 5 | 风险压力引擎 | 加载宏观数据 + 行业风险因子 |

### Step 5: 生成 DAG-Aware 执行计划

写入 `task_plan.md`:

```markdown
## 本次分析：{公司名} ({代码})
## 行业：{行业类型}
## 框架版本：v12.0 (DAG-Aware)
## 环境指纹：{env_fingerprint}
## 最低字数：85,000 × {行业系数} = {目标字数} (wc -m)

### Scope Lock
- Goal: {task.goal}
- Out of Scope: {task.out_of_scope[]}
- Stop Criteria: {stop.criteria[]}

### Question DAG
- L1 Questions: {count}
- L2 Questions: {count}
- PreFlect Nodes: {count}

### Sub-Agent Assignments
| Phase | DAG | Owner | Questions | EC Target |
|-------|-----|-------|-----------|-----------|
| P0+0.5 | DAG-0+1 | SUP+EL | Q-0.x + Q-1.x | EC-FIN/MKT draft |
| P1 | DAG-2 | EL+DQA | Q-2.x (data) | EC verified |
| P2 | DAG-3 | VAL+BP | Q-3.x (model) | EC-VAL + 承重墙 |
| P3 | DAG-2+3 | EL+VAL | Q-2.x+3.x | 护城河+引擎 |
| P4 | DAG-4 | BP+DQA | Q-4.x (bear) | RT-1~7 + KS |
| P5 | DAG-5 | SUP+DQA | Q-5.x (synth) | Complete + 审计包 |
| P6 | DAG-7 | SUP | Q-7.x (reflect) | reflection.md |

### 看空分析计划
- 目标篇幅: ≥18% (硬性) / ≥30% (目标)
- Bear Agent: Contamination Guard 启用
- 预定看空论点: [从CQ中提取]

### 门禁检查点
| 检查点 | 脚本 | 阻断条件 |
|--------|------|---------|
| Phase完成 | research_fast.sh | G1-G7任一FAIL |
| EC验证 | verify_data_sources.sh v2.0 | ec.completeness<95% |
| 发布合规 | check_compliance.sh | violations>0 |
| Complete | quality_gate_complete.sh | CG1-14任一FAIL |
```

### Step 6: 执行 — DAG节点遍历

**每个Phase执行时**:

1. **PreFlect检查**: 该Phase有预定的PreFlect节点吗? → 执行事前批判
2. **问题dispatch**: 将该Phase的L2问题分配给子代理
3. **EC收集**: 子代理产出EC(写入staging + shared_context.md)
4. **CoVe验证**: DQA对新EC执行隔离验证(verification_mode=independent)
5. **门禁检查**: 运行对应的确定性门禁脚本
6. **Checkpoint写入**: 更新checkpoint.yaml + ec_stats
7. **Git Commit**: 门禁通过后commit

**子代理dispatch模板 (v22.0)**:

```markdown
## 任务: {Phase} — {L2问题列表}

### 你的角色: {Owner代号} ({角色名})
### 输出格式: 每个问题按统一骨架产出

对每个问题，你必须产出:
- Q: (已给)
- Proof: 你用了什么工具/获取了什么数据
- Artifact: 写入哪些EC字段 (写入 staging/{TICKER}_P{N}_{Agent}.md)
- Stop: 你认为问题已回答的理由
- Metric: 可量化的完成指标

### Evidence Card 规则:
- 每个数字必须有EC (claim_type + source + method)
- inference/assumption 必须有 falsifier
- 完成后自检: 统计无EC数字数量

### Contamination Guard:
{如果是Phase 4 Bear: 插入白名单/黑名单}

### 反幻觉禁令 (5条):
{标准5条禁令注入}

### 返回格式:
完整内容写入 staging 文件。返回≤500字符摘要:
agent/{角色}/file/{文件路径}/chars/{字符数}/ec_count/{EC数}/stop/{停止理由}
```

### Step 7: DAG-7 复利闭环

Phase 5 完成+Complete组装+CG通过后:

1. **信号捕获**: 记录本轮 {失败类型, 回滚次数, EC缺口, 门禁阻断原因}
2. **反思写入**: `reports/{TICKER}/data/reflection.md` (结构化模板)
3. **记忆治理**: 只有跨≥3报告验证的模式才写入MEMORY.md
4. **漂移检测**: 对比本轮Phase 4否决的论点 vs MEMORY.md已存储的模式
5. **门禁迁移评估**: 本轮发现的新约束是否应迁移到确定性门禁?

## v22.0 质量标准

| 指标 | v22.0 要求 | 来源 |
|------|-----------|------|
| **总字数** | ≥85,000 × 行业系数 (wc -m) | CG1 |
| **EC completeness** | ≥95% 必填字段完备 | DAG-2 |
| **EC verification rate** | ≥80% verified | DAG-2 |
| **EC fact ratio** | ≥50% fact类型 | DAG-2 |
| **EC orphan claims** | 0 个无EC数字 | DAG-2 |
| **Question coverage** | 100% L1有EC支撑回答 | DAG-1 |
| **Falsifier coverage** | ≥80% inference/assumption有证伪 | DAG-3 |
| **Bear evidence coverage** | ≥80% 反方论点有EC | DAG-4 |
| **Output traceability** | ≥90% 段落映射到EC | DAG-5 |
| **Kill Switch precision** | ≥90% KS有4字段 | DAG-4 |
| **Contamination incidents** | 0 | DAG-4 |
| **看空篇幅** | ≥18% (硬性) | 铁律11 |
| **Mermaid图** | ≥24张 | CG |
| **发布合规** | 0 违规 | 第零律 |
| **审计包** | 存在且完备 | DAG-5 |

## 重要规则

- 编排器只输出问题，不产出答案
- 每个问题绑定 Proof/Artifact/Owner/Stop/Metric
- 子代理产出EC，不是自由文本
- 门禁脚本是硬阻断，不是建议
- Phase 4 Bear Agent 强制 Contamination Guard
- Phase 2/4 开始前强制 PreFlect
- 每Phase完成强制 Checkpoint
- /compact 后从 checkpoint.yaml + question_dag.yaml + shared_context.md 恢复
- 数据优先从 MCP 缓存读取，减少重复获取
