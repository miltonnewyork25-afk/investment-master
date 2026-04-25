# Paradigm Shift Analysis Template v0.4

> **Position**: production working template (replaces v0.3)
> **Use**: 单公司分析 + 多公司对比都按此结构

---

## 阶段 0 — Mandatory Prompt Constraints (强制 4 条)

写入分析前必答:

```text
[ ] 1. 公司能用 `object: old state -> new state` 表达吗? 不能 → 停。
[ ] 2. 公司在不同业务线有 ≥3 个发散的 M11/M12/M13 吗? 是 → 强制 SOTP, 拆子评分。
[ ] 3. 我把内容生成等同于业务状态改写吗? 是 → 改正。
[ ] 4. 我有付费证据 (P2+) 才声称 TAM 重写吗? 没有 → 标记 optionality only。
```

---

## 阶段 1 — 主矛盾句 (Main Contradiction)

> 一句话讲: 市场把这家公司当什么 vs 报告认为它真的是什么。差异是什么。

例 (INTU):
> 市场把 INTU 当 "税务季软件 + SMB 软件" 复合体定价, 但报告认为它已经是 "AI + 专家 + 金融责任边界" 驱动的 SMB financial operator 雏形。最大风险不是 AI 不够强, 是 IRS Direct File + Stripe/Brex SMB 操作层替代风险。

---

## 阶段 2 — 业务场景叙事 (Business Scenario Narrative)

> 用客户角色 (老板 / PM / 品牌经理 / 工程师) 描述他们真正想要什么 — 减抽象词。1-2 段。

例 (INTU):
> 一个小企业老板真正想要的不是 QuickBooks 更聪明, 而是月底不用再追发票, 银行流水自动对上, 工资和税务不出错, 现金缺口提前被提醒。
>
> INTU 的 AI 第二曲线不是给老板"更好的 dashboard", 而是把"账本+发票催收+工资合规+报税申报+现金流预警+信用决策"打包成"已对账/已合规/已申报"的状态系统。

---

## 阶段 3 — 主图压缩 (One-Line Summary)

```text
{Company} is not just {old product label}; it is trying to control {object: old state -> new state},
with {write depth: D1-D5}, {responsibility tier: 1-5}, {attribution strength: 弱/中/强}, and {value-capture: 弱/中/强}.
```

---

## 阶段 4 — Layer 0 v0.4 模块化打分 (M1-M14)

每个模块输出:

```text
Judgment: Yes / Partial / No
Evidence (附 E 等级):
Counter-evidence:
Investment implication:
4-8 quarter monitor:
```

### M1. Core State Change

```text
Object:
Old state:
New state:
Trigger:
Legacy owner:
Legacy budget:
Economic consequence:
Paying party:
```

**Split-Entity check**: 业务线 ≥3 个 + M11/M12/M13 发散 ≥1 档 → P-12 Split Entity → 强制 SOTP

### M2. State-Change Quality and Clock Speed

5 维度 0-3 分: 频率 / 价值 / 摩擦 / 责任可转移 / 标准化

时钟分类 (依行业基准):
- Fast (反馈 ≤ 周): 报税 / Payroll / Ad ROAS / Code deploy
- Mid (反馈 周-月): 工业 PLM / Field service / Codebeamer test
- **Slow (反馈 ≥ 季, R-CLOCK 触发)**: AEC 设计-施工
- **Very slow (反馈 ≥ 年, R-CLOCK-STRONG 触发, AI 分上限 3.0/5)**: 大基建 / 国防

### M3. Data → State Variable

5 测试 0-3 分: 频率 / 独占 / 可验证 / 可触发 / 反馈

```text
1. Raw data
2. Structured data
3. State variable
4. Control variable (高目标)
```

R-VERIFY: 没有 ground truth → cap at state variable。

### M4. Semantic Authority

5 right 0-4 分: object / state-machine / permission / interface / audit-rollback

```text
0-4: 用别人语言
5-9: 产品级语义
10-15: 跨客户语义层
16-20: 行业操作语言候选
```

### M5. Write Rights + Depth

```text
执行: L0 read-only → L1 suggested → L2 human-approved → L3 write-enabled → L4 autonomous
深度: D1 UI → D2 workflow → D3 SoR → D4 external → D5 regulated/transaction/payment/production
```

G3 Hard Gate: 没有 D2+ 写入权 → C 类 M5 cap at 4/8。

### M6. Closed-Loop Control

7 层 0-1 分: sense / state / decide / execute / feedback / correct / rollback

R-ROLLBACK: 没有 correction 和 rollback → cap at 4/7。

### M7. AI Second-Curve Reality

```text
L1 AI feature
L2 Copilot
L3 Workflow executor
L4 Closed-loop agent
L5 Autonomous operator
L6 Industry operating layer
```

0-5 评分:
- 0: 无 AI
- 1: AI feature
- 2: copilot 效率
- 3: workflow executor + 有限 monetization
- 4: closed-loop + 定价证据
- 5: outcome / responsibility-backed operator

**R-CLOCK-STRONG**: 反馈 ≥1 年 → AI 分上限 3.0/5
**R-LEAK4**: 4 路泄漏 ≥3 高 → AI 分上限 3.0/5

### M8. Economic Migration

```text
P0: 管理层叙事
P1: 试点 usage / task
P2: SKU 对应 task / workflow / outcome
P3: 财报披露 AI / usage / outcome 收入
P4: 客户预算从软件迁移到劳动 / 服务 / 风险 / 结果
```

**v0.4 强制 detail 格式**:
> 整体 P{X}, 局部业务 P{Y} 潜力, AI agent 单独仍 P{Z}

避免用整体 P3 掩盖 AI 单独 P1-P2 的事实。

### M9. Complexity Quality + Unit Cost

7 项指标: GM / PS 占比 / 实施周期 / NRR/ARPU / 支持成本 / AI 人工干预率 / **单位状态变化成本**

R-UNIT: AI 上线但单位成本不降 → 标 "AI feature, 不是第二曲线"。

### M10. Competitive Capture (5 门)

数据门 / 语义门 / 权限门 / 责任门 / 分发门 (各 0-5 分, 共 0-25)。

5 actor 攻防矩阵: 模型商 / AI-native startup / 客户自建 / 服务商 AI 化 / Incumbent SaaS。

### M11. Responsibility + Transferability

```text
Tier 1 Software access
Tier 2 AI assist
Tier 3 Workflow automation
Tier 4 Outcome delivery
Tier 5 Risk sharing (5 项最低门槛)
```

Tier 5 最低门槛 (≥4 项):
1. 资本承担
2. 保险池 (\$X+ + 再保接受)
3. 监管接受
4. 历史 \$10M+ 理赔
5. success fee / risk-sharing 占主营 ≥30%
6. 客户为"风险承担"付溢价

7 测试 0-3 分: permission / audit / HITL / rollback / contract / regulatory / transferability。

### M12. Causal Attribution

5 测试 0-3 分: measurement / counterfactual / confound control / auditability / payment acceptance。

```text
No attribution = no outcome pricing
Weak = usage / task only
Strong = outcome pricing 进主情景
```

### M13. Value Capture (4 路泄漏强制输出)

4 路泄漏 (低 / 中 / 高):

| 路径 | 检验 |
|---|---|
| → 模型商 | OpenAI/Anthropic 抽走 token cost? |
| → 服务商 | Accenture/Deloitte 拿走实施咨询? |
| → 客户自建 | 大客户 + GPT-4 + 内部数据自建? |
| → 新进入者 | vertical AI / agent platform 抢入口/语义? |

R-LEAK4: ≥3 路高泄漏 → AI 第二曲线分上限 3.0/5。

### M14. Platform Layer (NEW v0.4)

5 维度 0-1: API / MCP / Marketplace / Take-rate / Certification

期权加分 (0-5):
- 0: 无平台
- 1-2: API 存在但无商业化
- 3: Marketplace 上线
- 4: Marketplace + take-rate
- 5: Marketplace 财务化 (P3)

R-ABSTRACT: 第三方 agent 通过 API 完成 80%+ 用户操作 → 公司沦为后端 data provider 风险。

---

## 阶段 5 — 100 分制 6 类记分卡 + M14 期权加分

| 类别 | 分数 | 模块来源 | 公司 X 得分 |
|---|---:|---|---:|
| A. 状态变化质量 | 0-15 | M1 + M2 | / 15 |
| B. 状态变量质量 | 0-15 | M3 | / 15 |
| C. 语义+写入权 | 0-20 | M4 + M5 | / 20 |
| D. 反馈+AI 执行 | 0-15 | M6 + M7 | / 15 |
| E. 责任+归因+收费 | 0-20 | M11 + M12 + M8 | / 20 |
| F. 价值捕获+单位经济 | 0-15 | M9 + M10 + M13 | / 15 |
| **G. M14 平台期权 (加分)** | 0-5 | M14 | + / 5 |
| **总分** | 100 + 5 期权 | — | **/ 105** |

得分带:

```text
85-100+: 真 AI 第二曲线 + 平台经济
75-84: 强 AI 第二曲线
65-74: 局部 AI 第二曲线
55-64: 复合期权 (SOTP 需要)
40-54: AI Copilot 增强
20-39: AI 叙事
0-19: 无第二曲线
```

红线 (G1-G7) 必须独立 check, 任何一项失败 → 对应类 cap。

---

## 阶段 6 — 12 项一致性检查 (C1-C12)

| 检查 | 公司 X | 失败/警告 |
|---|---|---|
| C1 M1 vs M3 | | |
| C2 M3 vs M4 | | |
| C3 M5 vs M7 | | |
| C4 M6 vs M7 | | |
| C5 M7 vs M9 | | |
| C6 M8 vs M11 | | |
| C7 M11 vs M12 | | |
| C8 M12 vs M13 | | |
| C9 M7 vs M9 | | |
| C10 M2 vs M6 | | |
| C11 M10 vs M13 | | |
| **C12 M2 vs M13 (NEW v0.4)** | | |

失败权重 (v0.4 新):
- 0 失败: 优秀
- 1: -2 分
- 2: -5 分
- 3: -10 分 + 评级降一档
- 4-5: -15 分 + 评级降两档 + 强制 SOTP
- 6+: 整体打分作废, 强制按业务线拆

特殊加重: C7 / C10 / C12 失败各加扣 -2 至 -3 分。

---

## 阶段 7 — Layer 0 to Layer 1 Bridge

| Layer 1 | Layer 0 来源 | 公司 X 强弱 |
|---|---|---|
| I1 Revenue unit | M5 + M8 + M11 + M12 | |
| I2 Decision context | M3 + M4 | |
| I3 Execution right | M5 + M6 | |
| I4 Authority | M11 + M12 | |
| I5 Budget ownership | M2 + M8 | |
| I6 Margin retention | M9 + M13 | |
| I7 Exception absorption | M6 + M11 | |
| I8 Entry and routing | M4 + M5 + M10 | |
| AI Asymmetry | M7 + M9 + M13 | |
| Stack Coherence | M10 + M11 | |
| **Platform Optionality** | **M14** | |

---

## 阶段 8 — Alpha Type 识别

13 候选 (v0.4):

```text
Value-Capturing Operator
Attribution-Backed Vendor
Liability-Backed Operator
Accountability-Thin Operator
Semantic Layer Definer
Closed-Loop Operator
State Machine Owner
Pricing-Stuck Vendor
Burden-Trapped SaaS
Stack Coherence Winner
Mixed Profile
P-12 Split Entity (NEW)
P-13 Platform Migration Candidate (NEW)
```

**Split Entity 强制**: 如果识别为 P-12, 必须 SOTP + ≥3 子评分 + 估值语言分叉。

---

## 阶段 9 — 反方最强论证 (Strongest Bear Case)

> 顶级研报必须给每家公司写最强 bear case。这不是补充风险, 是结论压力测试。

格式:
- **一句话 bear case** (附 E 等级)
- **5 条逻辑链** (每条独立, 打通主结论)

例 (INTU):
> "AI 不是增强 INTU, 是消灭低端税务/簿记的稀缺性"
>
> 5 条逻辑链:
> 1. IRS Direct File 持续扩展 → 个人简单税务公共化 → 压低整个 consumer tax pricing umbrella
> 2. AI bookkeeping startup 通过只读 QB 数据 → 自动分类 / reconciliation / AP-AR agent → 反向替代 QuickBooks UI
> 3. Stripe/Brex/Ramp/Mercury bundling free QB-like + payments + cards + lending → SMB 操作层入口被抢
> 4. Enterprise Suite 走向 mid-market ERP → 直接对位 NetSuite / Sage Intacct, 销售周期长
> 5. Credit Karma broker model 在 ChatGPT 金融 advisor 时代被压缩 + Mailchimp 持续负 NRR

---

## 阶段 10 — 估值与预期差 (Valuation Bridge, 4 列)

| 项 | 公司 X |
|---|---|
| 市场当前可能在 price-in 什么 | (PE / FCF yield / 隐含增长) |
| 报告与市场的分歧 | (低估了什么 / 高估了什么) |
| 上修触发器 (4-8Q) | |
| 下修触发器 (4-8Q) | |

估值语言分叉:
- 用什么 PE 倍数 / SOTP 拆分 / 平台期权打折等

---

## 阶段 11 — Kill Switch + 4-8 季度监控

每家公司:

```text
🔴 Kill Switch 1: (主线断裂条件)
🔴 Kill Switch 2:
🔴 Kill Switch 3:
🟡 Yellow 1: (警告条件, 不立即断裂)
🟡 Yellow 2:
🟢 上修触发器:
```

监控指标 (≥6 个, 附 E 等级):
- 产品类
- 商业化类
- 成本类
- 护城河类

---

## 阶段 12 — Final 10-Item Output

| # | 项 | 答案 |
|---|---|---|
| 1 | 核心状态变化一句话 | |
| 2 | 当前层级 (tool / data / SoR / workflow / copilot / closed-loop / 责任层 / 行业标准 / 利润池控制) | |
| 3 | AI 第二曲线评分 0-5 (含 M7 + M11 + M12 + M14 证据) | |
| 4 | 最大客观约束 | |
| 5 | 最大主观管理层选择 | |
| 6 | 最可能攻击的利润池 | |
| 7 | 最可能被谁攻击 | |
| 8 | 复杂度: compound / mixed / burden | |
| 9 | TAM 重写 (要求格式: "整体 P{X} / 局部 P{Y} / AI 单独 P{Z}") | |
| 10 | 4-8 季度监控指标 (4 类 ≥6 个) | |

---

## 阶段 13 — 多公司对比 (横向报告强制 — 三母表)

如果是横向对比报告 (≥3 家), 必须输出:

### Mother Table 1: 核心对比

| 维度 | 公司 A | 公司 B | 公司 C | 公司 D |
|---|---|---|---|---|
| 核心状态 | | | | |
| M1-M14 关键打分 | | | | |
| AI 第二曲线分 | | | | |

### Mother Table 2: 证据等级 (P0-P4 + E0-E5)

| 公司 | 整体 P 档位 | 关键证据 (E 等级) | 证据缺口 |
|---|---|---|---|

### Mother Table 3: 投资动作

| 公司 | 当前评级 | Bull case | Bear case | 上修触发 | 下修触发 |
|---|---|---|---|---|---|

---

## Appendix A — 评分锚点参考表 (Scoring Rubric)

总体锚点 (0-15, 20 分制等比例):

| 等级 | 含义 | E 证据要求 |
|---|---|---|
| 0-1 | 没有证据 | — |
| 2-3 | 仅管理层叙事 | E0-E1 |
| 4-5 | 产品试点 / beta | E2 |
| 6-7 | 已商业化 SKU | E2 |
| 8-10 | 财报可见收入 | E4 |
| 11-13 | 已改变客户预算 / P3-P4 | E4-E5 |
| 14-15 | 已形成利润池迁移 | E5 |

各类细分锚点 (举例 — A 类状态变化质量):

| 子项 | 0 分 | 1 分 | 2 分 | 3 分 |
|---|---|---|---|---|
| 频率 | 一次性 | 年度 | 月度 | 日级以下 |
| 价值 | 低后果 | 中价值 | 高价值 (\$100K+ 影响) | 极高价值 (\$1M+ 影响) |
| 摩擦 | 单人 + 单系统 | 多人 + 单系统 | 多人 + 多系统 | 多角色 + 多系统 + 多步骤 |
| 责任 | 不可审计 | 部分可审计 | 可合同化 | 可审计 + 合同 + 保险 |
| 标准化 | 完全定制 | 部分模板 | 大部分标准化 | 高度可重复 |

---

## Appendix B — 证据等级 E0-E5

每个关键判断必须附:

| 等级 | 含义 | 例子 |
|---|---|---|
| E0 | 作者推理 | "INTU 价值捕获强" (作者综合) |
| E1 | 管理层表述 | CEO 在投资者日 |
| E2 | 产品发布 / beta | GenOS launch / Revit Assistant Tech Preview |
| E3 | 客户案例 | BMW 采用 Codebeamer / 历史 \$X 理赔 |
| E4 | 财报指标 | TurboTax Live FY25 \$2B +47% / ARR cc +8.5% |
| E5 | 第三方 / 独立验证 | Gartner / Forrester / 客户论坛 / 招聘数据 |

证据覆盖度自评 (强制输出每家公司):

| E0 | E1 | E2 | E3 | E4 | E5 |
|---|---|---|---|---|---|
| 公司 X 在每个等级都有什么? | | | | | |

特别关注 **E5 缺口** — 这是从"高质量框架文"升级到"顶级研报"的关键缺口。

---

## Appendix C — Quality Gates Checklist

提交前 check:

```text
[ ] G1 State clarity (M1 完整 8 字段)
[ ] G2 Verification (M3 ground truth)
[ ] G3 Write depth (M5 D2+)
[ ] G4 Causal attribution (M12 customer-accepted)
[ ] G5 Responsibility transfer (M11 transferability)
[ ] G6 Payment evidence (M8 P2+ for main case)
[ ] G7 Unit economics (M9 unit cost decline)
[ ] C1-C12 一致性检查 (失败数 ≤2)
[ ] R-CLOCK / R-CLOCK-STRONG / R-LEAK4 / R-VERIFY / R-ROLLBACK / R-UNIT / R-CAUSAL / R-CAPTURE / R-ABSTRACT 检查
[ ] 主矛盾句 (一句话)
[ ] 业务场景叙事 (1-2 段)
[ ] 主图压缩 (one-line)
[ ] 14 模块打分 (each with Yes/Partial/No + Evidence E + Counter + Implication + Monitor)
[ ] 100 分制 + M14 期权加分
[ ] 反方最强论证 (一句话 + 5 条逻辑链)
[ ] 估值与预期差 (4 列)
[ ] Kill Switch (≥3 红 + ≥2 黄 + 上修触发)
[ ] 4-8 季度监控 (≥6 个, 附 E 等级)
[ ] Final 10-item output
[ ] 横向对比时: 三母表
[ ] Sources 附录 (公开证据 ≥10 条)
```
