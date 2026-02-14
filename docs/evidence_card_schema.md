# Evidence Card Schema v1.0

> **定位**: DAG-2 的原子工件。每个 Claim 必须有一张 Evidence Card，否则禁止进入报告正文。
> **向后兼容**: EC 编号保留 DM-XXX 命名前缀(DM-FIN / DM-INF / DM-MKT / DM-VAL 等)，旧 DM 锚点可原地升级为 EC。
> **设计动机**: DM 锚点解决了"数据有没有源"，EC 额外解决"Claim 类型是什么 / 验证是否独立 / 状态在哪个阶段 / 什么能推翻它"。

---

## 1. EC 与 DM 锚点的关系

```
DM 锚点 (v3.0)                    Evidence Card (v1.0)
┌──────────────┐                  ┌──────────────────────────┐
│ 值           │  ─────────────>  │ claim                    │
│ 类型(H/R/S)  │  ─────────────>  │ claim_type (扩展为4类)    │
│ 来源         │  ─────────────>  │ source{type,locator,ts}  │
│ 日期         │  ─────────────>  │ source.timestamp         │
│ 用于         │  ─────────────>  │ used_in[]                │
│ 推理链(R类)  │  ─────────────>  │ method                   │
│ 证伪条件(R类)│  ─────────────>  │ falsifier                │
│              │     NEW ──────>  │ verifier_questions[]     │
│              │     NEW ──────>  │ verification_mode        │
│              │     NEW ──────>  │ status                   │
│              │     NEW ──────>  │ contamination_guard      │
│              │     NEW ──────>  │ gate_log_refs[]          │
│              │     NEW ──────>  │ owner                    │
│              │     NEW ──────>  │ linked_question          │
└──────────────┘                  └──────────────────────────┘
```

**迁移规则**: 新报告必须用 EC。历史报告中的 DM 锚点不回溯修改，但如果被引用时应视为"status: legacy"的 EC。

---

## 2. Claim Type 四分类

| claim_type | 定义 | 验证要求 | 可进入正文? | DM旧类型映射 |
|:----------:|------|---------|:----------:|:-----------:|
| **fact** | 直接来自一级/二级来源的可验证事实 | source.locator 必须可复核 | 直接写入 | H |
| **estimate** | 基于外部来源的量化估计(分析师共识/管理层指引) | 标注来源+不确定范围 | 写入+注明来源 | H (部分) |
| **inference** | 基于 fact/estimate 的逻辑推导，推理链可审查 | method+falsifier 必填 | 写入+推理链可查 | R |
| **assumption** | 无法验证的前提假设，合理人可能不同意 | 必须注册到 KAL + 设置 falsifier | 写入+标注为假设 | S |

### 分类决策树

```
数据来自外部源且可独立验证?
  ├─ Yes → 是精确数值还是范围/估计?
  │         ├─ 精确 → fact
  │         └─ 范围/共识 → estimate
  └─ No  → 有完整推理链从 fact/estimate 推导?
            ├─ Yes → inference (必须附 method + falsifier)
            └─ No  → assumption (必须注册 KAL + 附 falsifier)
```

### 降级规则

如果验证过程中发现 claim 的支撑不足，必须降级:
- fact → estimate (来源不够可靠，降为估计)
- estimate → inference (外部来源不存在，变为内部推导)
- inference → assumption (推理链断裂，降为假设)
- **禁止升级**: assumption 不可升级为 inference，除非补充了完整推理链+外部观察

---

## 3. EC 完整 Schema

```yaml
# Evidence Card Template v1.0
# 文件位置: reports/{TICKER}/data/shared_context.md

### EC-{CATEGORY}-{SEQ} v{VERSION}
# ─── 核心字段 (必填) ───
claim: ""                    # Claim 的精确表述
claim_type: fact             # fact | estimate | inference | assumption
source:
  type: ""                   # MCP | SEC | WebSearch | formula | analyst | management
  locator: ""                # 可复核的定位符: API调用/URL/文件路径/工具记录
  timestamp: ""              # 数据获取时间 YYYY-MM-DD
method: ""                   # 计算方法或推理链简述 (fact类可为"直接获取")
status: draft                # draft | verified | challenged | deprecated

# ─── 验证字段 (inference/assumption 必填) ───
falsifier:                   # 什么可观测证据能推翻这个 Claim
  condition: ""              # 证伪条件的精确描述
  probability: ""            # 低/中/高 — 基于当前信号
  impact: ""                 # 若推翻，对估值/论文的影响
verifier_questions:          # CoVe 验证问题 (≥2个)
  - ""                       # 独立验证问题1
  - ""                       # 独立验证问题2
verification_mode: independent  # independent | dependent
  # independent: 验证时隔离草稿上下文，只看原始数据
  # dependent: 验证时允许引用前序 EC (仅用于衍生计算)

# ─── 溯源字段 (必填) ───
used_in: []                  # 报告中引用此 EC 的章节: ["P1§1.1", "P2§2.3"]
linked_question: ""          # 关联的 Question DAG 节点: "Q-L2-03a"
owner: ""                    # 负责子代理: Evidence Librarian | Data QA | Valuation

# ─── 治理字段 (可选) ───
gate_log_refs: []            # 通过的门控记录: ["CG8_pass", "FastGate_P2"]
contamination_guard:
  allowed_context: []        # 验证时允许引用的 EC 白名单
  blocked_context: []        # 验证时禁止引用的来源 (如 Phase 1-3 看多结论)
```

---

## 4. EC 生命周期

```
                    ┌─────────────────┐
                    │                 │
创建 ──→ draft ──→ verified ──→ 写入报告
                    │                 │
                    │    challenged ──┘  (Phase 4 红队质疑)
                    │         │
                    │         ├─ 重新验证 → verified (升级版本号)
                    │         └─ 确认无效 → deprecated
                    │
                    └─ deprecated (数据过期/来源失效)
```

### 状态转换规则

| 当前状态 | 可转换到 | 触发条件 | 谁触发 |
|---------|---------|---------|--------|
| **draft** | verified | CoVe 验证通过 + 门控日志记录 | Data QA |
| **draft** | deprecated | 来源失效或数据过期(>30天) | Evidence Librarian |
| **verified** | challenged | Phase 4 RT-4 数据审计 或 RT-7 替代解释 | Bear Prosecutor |
| **challenged** | verified | 重新验证通过(版本号+1) | Data QA |
| **challenged** | deprecated | 确认无效 | Data QA + Supervisor |
| **deprecated** | — | 终态，不可恢复 | — |

### 版本控制

- EC 创建时为 v1.0
- 每次状态变更(verified→challenged→verified)版本号+0.1
- 数据刷新(重新获取最新值)版本号+1.0
- Phase 4 冻结后(DM freeze)禁止再变更

---

## 5. CoVe 隔离验证协议

> **核心问题**: AI 验证自己的输出时，容易"关注自己的幻觉文本并重复幻觉"(CoVe 论文核心发现)。

### 验证三步法

```
Step 1: 起草 (Draft)
  Agent 写出 Claim + 初始 source
  status = draft

Step 2: 生成验证问题 (Verifier Questions)
  Data QA 为每个 draft EC 生成 ≥2 个验证问题
  验证问题必须:
    ✓ 可以通过工具调用回答 (不是纯推理)
    ✓ 与原始 Claim 独立 (不是"这个数字对吗?")
    ✓ 从不同角度验证 (交叉验证)

Step 3: 独立回答 (Independent Verification)
  verification_mode = independent 时:
    ✓ 验证 Agent 不读原始草稿
    ✓ 验证 Agent 只读 contamination_guard.allowed_context
    ✓ 验证 Agent 用工具重新获取数据
    ✓ 比较独立获取的值 vs EC 中的值
    ✓ 一致 → status = verified
    ✓ 不一致 → 标记差异，人工/高级 Agent 裁决
```

### 验证问题示例

```yaml
# EC-FIN-001: "AMD FY2025 Revenue $27.42B"
verifier_questions:
  - "用 MCP fmp_data 获取 AMD FY2025 income statement，总收入是多少?"
  - "AMD FY2025 10-K 中报告的 Net Revenue 是多少? (WebSearch SEC filing)"
# 两个问题从不同来源独立验证同一个数字
```

```yaml
# EC-INF-003: "EPYC FY2027E 市场份额达45%"
verifier_questions:
  - "当前 EPYC 市场份额是多少? Mercury Research 最新数据?"
  - "Intel 18A 的最新良率报告是什么? 是否支持 EPYC 份额持续增长?"
# 一个验证当前基数，一个验证推理链的关键假设
```

---

## 6. Contamination Guard (污染防护)

### 设计原则

1. **验证隔离**: 验证 EC 时，Agent 的可用上下文受白名单控制
2. **Phase 4 Bear 隔离**: Bear Agent 创建的 EC 不得引用 Phase 1-3 的看多 EC
3. **草稿隔离**: 一个 EC 的验证不引用同批次其他未验证 EC

### 上下文白名单矩阵

| 场景 | allowed_context | blocked_context |
|------|----------------|-----------------|
| **验证 fact EC** | 原始数据源(MCP/SEC/WebSearch) | 任何 inference/assumption EC |
| **验证 inference EC** | 原始数据源 + 被引用的 fact EC | 其他 inference EC + assumption EC |
| **Phase 4 Bear EC** | DM-FIN/DM-MKT 锚点 + CQ 文本 | Phase 1-3 staging + 投资论点 + 看多结论 |
| **Phase 4 RT-1~7** | 所有 verified EC + 原始数据 | 未验证的 draft EC |

### 实现方式

当前平台限制下，contamination_guard 通过 **Agent Prompt 注入** 实现:

```markdown
## Contamination Guard (本次验证任务)

你正在独立验证 EC-FIN-001。

### 允许引用:
- MCP 工具直接获取的数据
- SEC filing 原文
- EC-FIN-002 (status: verified)

### 禁止引用:
- Phase 1 报告正文
- 任何 staging/ 文件
- 任何 claim_type = assumption 的 EC

### 验证方法:
用工具重新获取数据，与 EC-FIN-001 的值比较。
```

**未来升级路径**: 当 Claude Code hooks 支持 PreToolUse 文件访问控制时，可将白名单变成确定性门禁。

---

## 7. EC 与 Question DAG 的绑定

每张 EC 必须通过 `linked_question` 字段绑定到 Question DAG:

```
Question DAG                    Evidence Cards
┌─────────────┐                ┌─────────────┐
│ Q-L1-01     │───requires───>│ EC-FIN-001  │ (fact: Revenue)
│ AMD GPU突破? │               │ EC-FIN-002  │ (fact: GPU份额)
│             │               │ EC-INF-003  │ (inference: FY27E份额)
│  Q-L2-01a  │──minimum──────>│ EC-FIN-004  │ (fact: ROCm采用率)
│  ROCm采用率?│    observation │             │
│  Q-L2-01b  │──minimum──────>│ EC-MKT-005  │ (fact: Top500 MI300X)
│  Top500份额?│    observation │             │
└─────────────┘                └─────────────┘
```

**规则**:
- 每个 L2 问题至少有 1 个 minimum_observation = 1 张 fact/estimate EC
- L1 问题的回答必须引用 ≥3 张 verified EC
- 无 EC 支撑的问题回答 = 无证据断言 = 禁止写入报告

---

## 8. EC 自动评分指标

| 指标 | 公式 | 目标 | 检查时机 |
|------|------|:----:|---------|
| **ec.completeness** | 必填字段完备率 | ≥95% | Phase 完成时 |
| **ec.verification_rate** | verified EC / 总 EC | ≥80% | Phase 5.5 组装前 |
| **ec.fact_ratio** | fact EC / 总 EC | ≥50% | Phase 5.5 组装前 |
| **ec.falsifier_coverage** | 有 falsifier 的 inference+assumption / 总 inference+assumption | ≥80% | Phase 4 RT-4 |
| **ec.orphan_claims** | 报告中无 EC 支撑的数字 | 0 | verify_data_sources.sh |
| **ec.contamination_incidents** | 验证时违反白名单的次数 | 0 | Agent 日志审计 |
| **ec.challenge_resolution** | challenged EC 中已解决的比例 | 100% | Phase 5 前 |

---

## 9. 与现有机制的集成

| 现有机制 | EC 集成方式 |
|---------|-----------|
| **shared_context.md** | EC 就写在这里，替代原 DM 锚点格式 |
| **verify_data_sources.sh** | 升级: 额外检查 ec.completeness + ec.verification_rate |
| **quality_gate_complete.sh** | CG8 升级: 检查 EC 审计覆盖 + ec.fact_ratio |
| **Agent Prompt 注入** | 新增: contamination_guard 白名单注入 |
| **Phase 4 RT-4** | RT-4 数据审计 = 对所有 EC 的 status 审查 |
| **Phase 5 CQ 闭环** | CQ 回答必须引用 linked EC 列表 |
| **checkpoint.yaml** | 新增: ec_stats (总数/verified/challenged/deprecated) |
| **KAL (key_assumptions.md)** | assumption 类型 EC 自动注册到 KAL |

---

## 10. 示例: 完整 EC 集合 (AMD 半导体)

```yaml
### EC-FIN-001 v1.0
claim: "AMD FY2025 Revenue $27.42B"
claim_type: fact
source:
  type: MCP
  locator: "fmp_data endpoint:income symbol:AMD period:annual limit:1"
  timestamp: "2026-02-11"
method: "直接获取"
status: verified
verifier_questions:
  - "MCP fmp_data 获取 AMD FY2025 total revenue?"
  - "AMD 10-K FY2025 Net Revenue 是多少?"
verification_mode: independent
used_in: ["P1§1.1", "P2§2.3", "P5§估值"]
linked_question: "Q-L2-01a"
owner: "Evidence Librarian"
gate_log_refs: ["FastGate_P1_pass"]

### EC-INF-003 v1.0
claim: "EPYC 服务器 CPU 市场份额 FY2027E 达到 45%"
claim_type: inference
source:
  type: WebSearch
  locator: "Mercury Research server CPU market share 2025"
  timestamp: "2026-02-11"
method: "当前41%(Mercury Q4'25) + 年增2-3pp(Zen5/Turin产品路线图) + Intel 18A延迟假设"
status: verified
falsifier:
  condition: "Intel 18A 良率 >80% 且 Granite Rapids 下一代提前6个月发布"
  probability: "低"
  impact: "EPYC 份额可能停滞在 42-43%，DCF 收入假设下调 8-12%"
verifier_questions:
  - "Intel 18A 最新良率数据是什么? 来源?"
  - "Mercury Research 最近3个季度的 AMD 服务器份额趋势?"
verification_mode: independent
used_in: ["P2§Reverse DCF", "P5§承重墙"]
linked_question: "Q-L1-01"
owner: "Data QA"
contamination_guard:
  allowed_context: ["EC-FIN-001", "EC-FIN-002", "Mercury Research 原始数据"]
  blocked_context: ["Phase 1 看多叙事", "Phase 3 护城河结论"]
gate_log_refs: ["FastGate_P2_pass", "RT-4_audit"]

### EC-ASM-001 v1.0
claim: "AI 训练工作负载将从 CUDA 生态向开放标准迁移"
claim_type: assumption
source:
  type: analyst
  locator: "分析师判断，无可验证外部来源"
  timestamp: "2026-02-11"
method: "类比: x86 开放标准最终击败专有架构 (历史模式)"
status: draft
falsifier:
  condition: "NVIDIA CUDA 生态在 FY2027 仍占 AI 训练框架 >90% 份额"
  probability: "中"
  impact: "AMD ROCm 增长论文核心假设失效，GPU 业务估值下调 30-50%"
verifier_questions:
  - "当前 CUDA vs 非CUDA AI 训练框架的使用份额?"
  - "主要云厂商 (AWS/Azure/GCP) 是否在推动 CUDA 替代方案?"
verification_mode: independent
used_in: ["P3§护城河", "P4§RT-7替代解释"]
linked_question: "Q-L1-01"
owner: "Bear Prosecutor"
contamination_guard:
  allowed_context: ["市场份额原始数据", "云厂商公开声明"]
  blocked_context: ["AMD 管理层对 ROCm 的乐观声明", "Phase 1 竞争优势叙事"]

```

---

## 版本历史

| 版本 | 日期 | 变更 |
|:---:|:---:|------|
| v1.0 | 2026-02-14 | 初版。DM→EC 升级 + claim_type 四分类 + CoVe 隔离验证 + contamination_guard + 状态追踪 + 自动评分 |
