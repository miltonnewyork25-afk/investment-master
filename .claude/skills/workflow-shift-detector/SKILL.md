---
name: workflow-shift-detector
description: 工作流迁移与控制权转移检测器 v1.0 — 识别一个行业/公司是否正在从"旧workflow"迁移到"新workflow"(AI-native/agent-native/新基础设施),并定位新的控制点(control point)、上下文所有者(context owner)、执行层(execution layer)、定价语言迁移(pricing migration)、治理层(governance owner)。同时适用于硬件(产能/认证/槽位/installed base)和软件(workflow control/context/execution/interface)。回答的是"新经济owner将在哪里形成",而不是"AI对这家公司是利好还是利空"。
trigger: /workflow-shift
---

# 工作流迁移与控制权转移检测器 v1.0

> **核心命题**: 在任何产业重构中(AI崛起、基础设施代际、渠道重构、SaaS→agent 转型),**利润和定价权最终落在"新 workflow 的控制点"上**——不是最先叫嚷自己被影响的那一层,也不是技术最炫的那一层。
> **泛化基础**: 研究的不是"硬件"还是"软件",而是**"工作如何完成 / 控制点在哪里 / 谁拥有上下文 / 谁能执行动作 / 谁拿到结果定价权 / 旧流程是否正在被新流程替代"**。这套抽象在硬件里表现为产能/认证/槽位,在软件里表现为 workflow control/context/execution。
> **定位**: Phase 1 **可选** skill。触发条件由 P0 原型 + P2.5 旧地图状态联合决定(见下)。
> **核心理念**: 工作流是否真的在迁移 ≠ 公司是否在讲 AI 故事。是否真的迁移 = 客户购买行为变了 + 支出流向变了 + 定价单位变了 + 旧层真的被绕过了。

---

## 触发条件 (二元路由)

| 场景 | 是否触发 | 理由 |
|------|:-------:|------|
| P0=软件平台/SaaS **且** P2.5∈{正在翻转, 已翻转未定价, 混沌多叙事} | **必须** | 这是 workflow-shift 的主场景——范畴重分配的最大机会窗口 |
| P0=网络基础设施/制度垄断/chokepoint **且** 出现新接口竞争者(agent/新协议/新入口) | **必须** | chokepoint 的真正威胁不是价格战,是控制层被绕过 |
| P0=重资本再投资 **且** 下游 workflow 正在被 AI 重构(例: 半导体→AI workload / 云基础设施→agent workload) | **可选** | 硬件层映射:产能/槽位/认证是否因下游 workflow 变化而被重新分配 |
| P0=消费品/运营密度 **且** 渠道/分发层在重构(agent commerce / AI search / social commerce) | **可选** | 消费品 workflow 迁移主要在分发+发现层,不在产品层 |
| 其他场景 (P0=现金牛/周期股/单点瓶颈, **且**无 workflow 重构信号) | **禁止** | 调用 = 浪费 context,没有迁移就不会有 owner 转移 |

**与其他 skill 的二元边界** (最重要):

| 你要回答的问题 | 用这个 (✓) | 不用这个 (✗) | 理由 |
|--------------|-----------|-------------|------|
| AI 对这家公司是利好还是利空,幅度多少? | `ai-impact-analyzer` | workflow-shift-detector | ai-impact 回答**方向+幅度**,是影响评估 |
| workflow 控制权在迁移吗? 新 owner 将在哪里形成? | **workflow-shift-detector** | ai-impact-analyzer | workflow-shift 回答**结构+新 owner**,是结构判断 |
| 市场定价了没有? 预期差在哪? | `expectation-gap` | workflow-shift-detector | expectation-gap 回答**市场是否已定价** |
| 护城河现在还在吗? | `moat-evaluator` | workflow-shift-detector | moat 回答**静态护城河**,workflow-shift 回答**护城河归属是否在迁移** |

**正确的串联方式** (Phase 1):
```
workflow-shift-detector → 识别"新 owner 在 X 层" →
  moat-evaluator → 重估"护城河是不是还在老 owner 手里" →
    ai-impact-analyzer → 对老 owner 的方向+幅度评估 →
      expectation-gap → 市场是不是还在用旧范畴定价新 owner
```

---

## Step 1: 识别旧 workflow 和新 workflow

在做任何判断之前,先把"工作流本身"画出来。不做这一步就直接跳到"新 owner 是谁",是抢跑。

### 1.1 旧 workflow 地图

```yaml
old_workflow:
  who_does_the_work: "谁实际完成这个工作 (人/软件/组合)"
  what_is_the_input: "输入是什么 (数据/指令/文档/请求)"
  what_layers_are_involved:  # 从输入到结果的每一层
    - layer_1: "..." (例: CRM seat → 销售员手动录入)
    - layer_2: "..." (例: CRM 数据库 → 存储)
    - layer_3: "..." (例: BI 工具 → 分析)
    - layer_4: "..." (例: 销售领导 → 决策)
  control_point: "旧 workflow 中谁控制关键卡点 (谁收最多钱/谁 API 最难替换/谁 installed base 最大)"
  pricing_unit: "旧 workflow 按什么单位收费 (seat / hour / query / CPU-hour / shipment / 槽位)"
```

### 1.2 新 workflow 假设

```yaml
new_workflow_hypothesis:
  forcing_function: "什么在逼迫 workflow 改变 (不是'AI 很酷',必须是具体外力)"
    # 示例: "客户不愿意再雇 3 个初级分析师,想直接让 agent 跑"
    # 示例: "hyperscaler capex 从 GPU 转向推理 ASIC"
  who_does_the_work_now: "新 workflow 中谁完成工作 (agent / 新接口 / 新硬件层)"
  layers_that_get_collapsed: "哪些中间层被压缩掉"
  layers_that_emerge: "哪些新层被创造出来"
  new_control_point_candidates:  # 至少 2 个候选,不要只看一个
    - candidate_1: "..." (例: agent orchestrator)
    - candidate_2: "..." (例: context/memory store)
    - candidate_3: "..." (例: 新的硬件加速层)
  pricing_unit_migration: "收费单位从 X 变成 Y (例: seat → usage / hour → outcome / CPU-hour → token)"
```

---

## Step 2: 硬件 vs 软件映射对照表 (skill 核心资产)

> **核心洞察**: 同一个上层逻辑,在硬件和软件里映射到不同指标。用这张表做逐维度检查。

| 上层逻辑问题 | 硬件映射 (指标/证据) | 软件映射 (指标/证据) |
|-------------|-------------------|-------------------|
| **需求是不是强制的?** | 终端需求是否监管/合规驱动 (EV 强制年检、HBM 必须配 GPU) | 客户是否被 CFO 预算重分配/董事会决议/合规要求强制上 agent |
| **哪个节点产能最慢?** | 晶圆产能/HBM/CoWoS/特定材料/认证周期 | context window / 推理 token / 特定 API rate limit / agent 编排能力 |
| **谁控制卡点?** | 单一供应商 (ASML/TSMC CoWoS) / 制度垄断 / installed base | workflow orchestrator / context memory owner / default interface owner |
| **谁拿走 installed base / maintenance 红利?** | 设备厂商的 service 收入 / 维保合同 / 替换周期 | 锁定在特定 agent runtime / 特定 memory 格式 / 特定 workflow 编排商 |
| **定价单位迁移方向?** | 元件价 → 系统价 / 产品价 → service 价 / 硬件价 → outcome 价 | seat → usage / query → outcome / license → consumption |
| **谁在重构中吃 governance/observability 红利?** | 认证机构 / 第三方测试 / 保险公司 | agent 监控/合规/审计/guardrail 供应商 |
| **是真迁移还是换皮?** | 下游真的买了新型号 / 认证真的发了 / 客户真的切换了供应商 | 客户真的改了预算科目 / 实际在产线用 / 真的解雇了旧角色 |

**同一个问题,不同产业里换一层皮,但本质不变**:
- 硬件问: "谁控制产能卡点?" → 软件问: "谁控制 context 和执行闭环?"
- 硬件问: "installed base 谁最大?" → 软件问: "default workflow 谁拥有?"
- 硬件问: "维保/service 收入归谁?" → 软件问: "governance/observability 归谁?"

---

## Step 3: 真 shift vs 假 shift 判别 (反面案例锚定)

> **最危险的失败模式**: 把 AI messaging 当成 workflow shift。产品页贴"AI-powered"不等于 workflow 变了。

### 真 shift 的硬信号 (至少满足 3 条才算真 shift)

| 信号 | 为什么重要 | 验证方式 |
|------|----------|---------|
| 客户购买行为变化 | 如果买家没动,shift 还没开始 | 新增客户名单 / 流失客户理由 / 订单结构变化 |
| 支出流向迁移到新层 | 钱跟着控制权走,钱不动说明控制权没动 | 新层的 ARR 增速 vs 旧层 ARR 增速;客户访谈中的预算科目变化 |
| 定价单位变化 | seat→usage / hour→outcome 是最硬的 shift 信号 | 竞争者公开定价页 / 大客户合同披露 / 管理层电话会确认 |
| 旧层被真正绕过 | 如果旧层还在关键路径上,shift 是假的 | 新 workflow 能否完全不经过旧层完成任务 (技术可行性+客户实际用法) |
| 工作量迁移到自动执行 | UI 密集步骤是否变少,还是只是包了个 AI 壳 | 人工操作小时数/人头数变化,客户侧实证 |

### 假 shift 的反面案例 (必须明确排除)

| 反面信号 | 为什么假 | 反例 |
|---------|---------|------|
| 大量 AI 营销但没有购买行为变化 | 讲故事 ≠ workflow 变了 | 2023 年一批 SaaS 公司"AI copilot"发布后 ARR 增速并未改变 |
| feature 升级但没有定价变化 | 真 shift 一定会改定价单位 | 给老产品加一个"AI 按钮"但仍按 seat 收费 |
| 无客户真实切换行为 | 客户不动 = 还没 shift | LLM 供应商排名剧烈变化但企业合同 lock-in 没松动 |
| 人力工作量没有实质减少 | 自动化宣称 ≠ 自动化事实 | "AI agent 节省 80% 工作"但客服团队没减员 |
| 旧层仍在关键路径 | 没有绕过,只是并行 | agent 仍需要 CRM 数据库才能工作 = CRM 还是 control point |

**判定规则**:
- 真 shift 信号 ≥3 条 → 本 skill 进入 Step 4,继续定位新 owner
- 真 shift 信号 0-2 条 → 判定为"尚未发生/假 shift",产出应是**"继续观察" + 追踪指标**,不强行编新 owner

---

## Step 4: 新 owner 五维定位

> 对**通过** Step 3 判别的真 shift,用五维定位新经济 owner 可能在哪里形成。

### 维度 1: Context Owner (谁拥有上下文?)

- 上下文 = 让新 workflow 能工作的私有数据/记忆/历史/状态
- 硬件类比: installed base (谁装在客户现场,谁就拥有现场上下文)
- 软件形态: memory store / state management / customer data platform / 私有训练数据

### 维度 2: Execution Layer (谁真正执行动作?)

- 执行 = 不只是生成建议,而是实际完成 action (下单/发货/改配置/调参数)
- 硬件类比: 谁真正造出来、装上去、通电了
- 软件形态: agent runtime / orchestration platform / action API layer

### 维度 3: Interface / Default Entry (谁是默认入口?)

- 入口 = 用户/客户"第一个打开的地方",掌握意图入口就掌握分发
- 硬件类比: OEM 品牌 vs 代工厂,品牌是入口
- 软件形态: chat UI / IDE / 浏览器 / 专业工作流入口 (Figma/Notion/Cursor/...)

### 维度 4: Pricing Unit Owner (新定价单位归谁定义?)

- 定价单位 = 决定谁从 GDP 中切走一刀
- 如果新单位是 outcome/usage,谁有能力测量 outcome/usage,谁就是 owner
- 硬件类比: 从"卖产品"到"卖可用性" (GE 的 power-by-the-hour)
- 软件形态: outcome-based pricing provider / usage metering layer

### 维度 5: Governance / Trust Layer (谁保证这东西能在生产跑?)

- 治理 = audit / compliance / observability / guardrail / 出事了找谁负责
- 硬件类比: 认证机构 / 保险 / 维保 / 备件
- 软件形态: agent monitoring / compliance tooling / third-party eval / insurance

**对目标公司的诊断矩阵**:

```yaml
target_company_position:
  context_owner_score: [0/1/2/3]  # 0=完全不占, 3=显著占据
  execution_layer_score: [0/1/2/3]
  interface_default_score: [0/1/2/3]
  pricing_unit_owner_score: [0/1/2/3]
  governance_owner_score: [0/1/2/3]

  total_new_owner_score: # 0-15 分
  interpretation:
    12-15: "新 owner 本体, workflow 迁移是护城河加深事件 → 联动 moat-evaluator C4/C7 上调"
    7-11:  "部分新 owner 特征, 需判断能否巩固 → Kill Switch: X 条件下跌出"
    3-6:   "边缘参与者, 利润大概率流向他处 → ai-impact-analyzer M1 蚕食检测"
    0-2:   "旧层, workflow 迁移对其是结构性利空 → 必须进 Phase 4 红队承重墙测试"
```

---

## Step 5: 迁移阶段判定 (early / real / crowded)

> 新 owner 即使看清,阶段不同赔率完全不同。这是联动 `expectation-gap` 的锚点。

| 阶段 | 判定信号 | 对估值的意义 | 联动动作 |
|------|---------|-----------|---------|
| **Early** (未定价) | 新 owner 识别出来,但市场仍用旧范畴定价;管理层电话会仍被问旧变量 | 最大预期差机会 | 铁律 N 减法 5 "范畴重分配"→进入执行摘要 Top 5 lens |
| **Real** (部分定价) | 市场开始讨论新 owner,但估值只反映了一部分;新 owner 的 ARR 数据已存在 | 中等预期差,时间点敏感 | 联动 `expectation-gap` 量化市场定价了百分之几 |
| **Crowded** (已定价+过度) | 新 owner 叙事主流化,估值倍数已经完全 pricing in,可能还过度 | 警惕赔率反向 | 联动 `risk-topology` 找新 owner 的反身性风险 |
| **False** (Step 3 未通过) | 不进入 Step 5 | 产出"持续观察" | 定义 3 个追踪指标,入 Phase 4 Kill Switch 候选 |

---

## 产出格式 (直接可融入报告,无痕化)

### YAML 卡片 (staging)

```yaml
workflow_shift_detection:
  old_workflow:
    who_does_work: "..."
    key_layers: [...]
    control_point: "..."
    pricing_unit: "..."

  shift_reality_check:
    real_shift_signals_present: [信号1, 信号2, 信号3]  # ≥3 才算真 shift
    false_shift_signals_ruled_out: [反信号1, 反信号2]
    verdict: real_shift | not_yet | feature_marketing

  new_owner_hypothesis:  # 仅在 verdict=real_shift 时填
    context_owner: "..."
    execution_layer: "..."
    default_interface: "..."
    pricing_unit_owner: "..."
    governance_owner: "..."

  target_company_position:
    five_dim_scores: {context: X, execution: X, interface: X, pricing: X, governance: X}
    total: X/15
    role: new_owner_core | partial | edge | old_layer

  stage: early | real | crowded | false

  tracking_indicators:  # 证伪/强化信号,3-5 个可观测指标
    - indicator_1: "... (追踪频率: 季度/月)"
    - indicator_2: "..."

  downstream_skill_handoff:
    to_moat_evaluator: "重估 C4/C7 是否仍归属老 owner"
    to_expectation_gap: "市场是否按新范畴定价 (stage=early 时必做)"
    to_ai_impact: "如果 target 是 old_layer, 量化蚕食率"
```

### 无痕融入报告 (Phase 5 写作时)

- 不写"workflow-shift-detector 产出"
- 结论直接以投资分析语言出现:
  - "真正的控制点正在从 [旧层] 迁移到 [新层], 因为 [forcing function]..."
  - "如果继续用 [旧范畴] 给它估值,会抹平一个结构性变化——新 owner 在 [X 维度] 已经出现 [具体证据 DM-xxx]..."
- Step 5 阶段判定 → 进入执行摘要段 2 (新地图) 或段 1 的裂缝证据
- 五维得分 → 用叙述语言,不贴表
- Kill Switch (5 维得分跌出某区间) → 进入 Kill Switch 章节

---

## 与现有框架的关系

| 框架/Skill | 关系 | 接口 |
|-----------|------|------|
| `ai-impact-analyzer` | **互补,非替代** | ai-impact 回答方向/幅度,workflow-shift 回答"新 owner 在哪里";串联顺序: workflow-shift 先,ai-impact 后 |
| `expectation-gap` | **下游联动** | stage=early 时必调,量化市场定价百分比 |
| `moat-evaluator` | **下游联动** | 新 owner 识别后重估 CQI,尤其 C3(锁定)/C4(数据)/C7(自维持) |
| `game-theory-lens` | **可选上游** | 如果新旧层之间存在明确博弈(例: agent 与 CRM 厂商),game-theory-lens 优先 |
| 铁律 N 减法 5 (范畴重分配) | **核心支撑** | 真 shift 的本质就是范畴重分配——Top 5 lens 至少 3 条应由本 skill 产生 |
| L0 研究哲学目标 3 (最可能错看的那一层) | **直接对应** | workflow-shift 识别的新 owner 就是"市场最可能错看的那一层"的结构化来源 |

---

## 反例速查 (skill 误用场景)

| 误用 | 为什么错 | 正确做法 |
|------|---------|---------|
| 看到公司公告"AI agent 产品"就调用本 skill | AI 产品 ≠ workflow shift (可能只是 feature) | 先检查 Step 3 的 5 条真 shift 信号,<3 条就不深挖 |
| 对所有软件公司都调用 | 稳态 workflow (例: Visa 支付、SAP ERP)不适合 | 检查 P2.5 状态,稳态共识不触发 |
| 新 owner 直接等同于"AI 公司" | 新 owner 可能在治理/context/硬件层,不一定是 LLM 厂商 | 五维逐个打分,不押宝单一维度 |
| 把 ai-impact-analyzer 的 M1 蚕食结论复制进来 | 蚕食 ≠ 新 owner 在哪 | ai-impact 回答"旧公司会不会掉",workflow-shift 回答"利润会去哪" |
| 对硬件公司跳过本 skill | 硬件里 workflow 迁移同样决定谁拿 installed base/maintenance | 用 Step 2 映射表做硬件版检查 |

---

## 一句话总纲

> **工作流是否正在迁移,控制点是否正在转移,新的经济 owner 是否正在形成。**
> 不是判断"AI 对谁是利好"(→ ai-impact),不是判断"市场定价了没"(→ expectation-gap),而是判断"钱最终会流向哪一层"。

---

## 版本

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-04-18 | 初版: 5 步工作流 + 硬件/软件映射表 + 真假 shift 判别 + 五维定位 + 三阶段赔率。触发条件二元化,与 ai-impact/expectation-gap/moat 显式解耦。**灰度状态**: 待 1-2 份报告实战验证后决定是否固化到 Phase 1 必须清单 |
