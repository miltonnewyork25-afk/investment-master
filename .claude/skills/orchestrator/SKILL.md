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
| 半导体 | `docs/industry/semiconductor_deep.md` | TSM, MU, LRCX, NVDA, ASML | 2.0 |
| 消费品 | `docs/industry/consumer_deep.md` | PG, KO, COST, NKE, LVMH | 1.8 |
| 科技平台 | `docs/industry/eco_tech_deep.md` | META, GOOG, AMZN, MSFT, AAPL | 1.7 |
| 金融 | `docs/industry/financial_deep.md` | JPM, GS, BRK, V, MA | 1.6 |
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

### Agent团队 (3+1架构)
| 代号 | 角色 | Phase 1-3 | Phase 4 | Phase 5 |
|------|------|-----------|---------|---------|
| Agent A | 叙事策略 | 公司定义+竞争格局+行业定位 | 行为偏差检查 | 综合评估 |
| Agent B | 风险竞争 | 护城河量化+Kill Switch | **Bear隔离模式**(RT-1~7) | KS/TS注册+投资日历 |
| Agent C | 估值综合 | 财务分析+Reverse DCF+SOTP | 承重墙压力测试 | CQ闭环+框架注册 |
| QSA | 质量哨兵 | 每Agent产出后脚本检查 | EC验证+合规检查 | Complete门控 |

### 最低Agent数量门控
| Phase | 最低 | 推荐 | 理由 |
|:-----:|:----:|:----:|------|
| P0/P0.5 | 3 | 3-5 | 数据预取+CQ提取+行业扫描 |
| P1 | 3 | 3-4 | 财务+竞争+技术三支柱 |
| P2 | 3 | 4-5 | 估值+Reverse DCF+可比+情景(产出峰值) |
| P3 | 3 | 4-5 | 护城河+引擎+风险+整合 |
| P4 | 3 | 3-4 | Bear专家(隔离)+红队+数据审计 |
| P5 | **3** | **3** | **铁律: 恰好3 Agent**(A评估+B KS/TS+C CQ闭环) |
| **合计** | **≥20** | **22-29** | 实证安全区(10报告验证) |

### Sub-Agent Assignments
| Phase | DAG | Agent分配 | EC Target |
|-------|-----|-----------|-----------|
| P0+0.5 | DAG-0+1 | 编排器 + 数据预取Agent×3 | EC-FIN/MKT draft |
| P1 | DAG-2 | Agent A+B+C + QSA | EC集合(draft) + 口径锁定 |
| P2 | DAG-3 | Agent C(估值) + Agent B(承重墙) + QSA | Reverse DCF + SOTP |
| P3 | DAG-2+3 | Agent A(叙事) + Agent C(引擎) + QSA | 护城河+五引擎 |
| P4 | DAG-4 | Agent B(**Bear隔离**) + QSA(验证) | RT-1~7 + KS |
| P5 | DAG-5 | Agent A+B+C(铁律3A) + QSA | Complete + 审计包 |
| P6 | DAG-7 | 编排器 | reflection.md |

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
2. **问题dispatch**: 将该Phase的L2问题分配给Agent A/B/C(按角色分工)
3. **EC收集**: Agent产出EC(轻量EC写入staging, 完整EC写入shared_context.md)
4. **QSA检查**: 质量哨兵脚本对每个staging产出自动检查(数值一致性/密度/合规)
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

## Agent Role Card 模板 (v7.0新增)

> **目的**: 确保每个Agent在dispatch时获得清晰的角色定义+输入+输出+边界。
> **写入位置**: `reports/{TICKER}/data/agent_roles.yaml` (Phase 0自动生成)

```yaml
# Agent Role Card Template
# 每个Agent dispatch时必须注入以下字段

agent_a:
  role: "叙事策略专家"
  scope: ["公司身份定义", "竞争格局分析", "行业定位", "行为金融偏差检查"]
  anti_scope: ["估值计算", "SOTP建模", "Reverse DCF"]
  input_files:
    - "data/research/{TICKER}/*.json"        # 预取数据
    - "data/shared_context.md"               # EC/DM锚点
    - "data/question_dag.yaml"               # 分配给A的L2问题
    - "staging/S{N-1}_agent_A_*.md"          # 前Session产出(跨Session继承)
  output_target: "12-18K chars"
  output_file: "staging/{TICKER}_P{N}_Agent_A.md"
  stop_condition: "所有分配的L2问题都有EC支撑的回答"

agent_b:
  role: "风险竞争专家"
  scope: ["护城河量化", "Kill Switch设计", "竞争动态", "风险评估"]
  phase_4_override:
    role: "Bear Case Prosecutor (隔离模式)"
    scope: ["红队七问RT-1~7", "黑天鹅概率加权", "偏差审计", "空头钢人"]
    contamination_guard:
      allowed: ["EC-FIN-*/EC-MKT-*(verified)", "CQ文本", "原始SEC数据"]
      blocked: ["Phase 1-3 staging文件", "投资论点", "看多结论"]
  anti_scope: ["基础财务分析", "估值建模", "叙事定义"]
  output_target: "12-18K chars"
  stop_condition: "护城河量化完成 + Kill Switch ≥10个有可观测阈值"

agent_c:
  role: "估值综合专家"
  scope: ["财务深度分析", "Reverse DCF", "SOTP", "OVM", "KS/TS注册", "CQ闭环"]
  anti_scope: ["竞争叙事", "公司重新定义", "行为偏差分析"]
  output_target: "15-22K chars"
  跨session继承: "估值模型参数+已verified的EC不重新计算"
  stop_condition: "Reverse DCF完成 + SOTP六方法收敛<5% + 所有CQ有EC支撑"
```

## Phase 0 知识传递 (v7.0新增)

> **来源**: GOOGL v4.0的 `AMD_lessons_for_GOOGL_v4.0.md`(13K) — 不是装饰，而是跨报告学习的关键机制。
> **目标**: 自动将同行业上一份报告的教训注入当前报告。

**执行步骤**:

1. **识别参考报告** — 运行 `bash scripts/find_best_reference.sh {TICKER}` 找同行业最佳报告
2. **提取教训** — 读取参考报告的 `data/reflection.md` + 报告Complete中的框架注册表
3. **生成教训文件** — 写入 `reports/{TICKER}/data/lessons_from_{REF_TICKER}.md`
   - 最多10条可操作教训
   - 每条格式: `教训 | 来源 | 应用方式 | 注意事项`
4. **注入Agent Prompt** — 所有后续Agent dispatch时附带教训文件路径
5. **跟踪应用** — Phase 5时回顾哪些教训被应用、哪些被证明不适用

**教训提取模板**:
```markdown
## 从 {REF_TICKER} v{VER} 学到的教训

1. {教训描述} — 来源: {哪个Phase发现的} — 应用: {在当前报告如何用}
2. ...
(最多10条)
```

## 重要规则

- 编排器只输出问题，不产出答案
- 每个问题绑定 Proof/Artifact/Owner/Stop/Metric
- Agent产出EC: 轻量EC(fact/estimate)只需3核心字段，完整EC(inference/assumption)需全部字段
- 门禁脚本是硬阻断，不是建议
- Phase 4 Agent B 自动切换Bear隔离模式 + Contamination Guard
- Phase 2/4 开始前强制 PreFlect
- 每Phase完成强制 Checkpoint
- 每Agent staging产出后运行 `tests/quality_sentinel.sh` (QSA检查)
- /compact 后从 checkpoint.yaml + question_dag.yaml + shared_context.md 恢复
- 数据优先从 MCP 缓存读取，减少重复获取
- 总Agent数≥20 (实证安全下限)，推荐22-29
