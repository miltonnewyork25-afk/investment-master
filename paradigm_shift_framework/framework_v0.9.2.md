# 范式转移分析框架 v0.9.2 — 主框架规范

**版本**: v0.9.2
**固化日期**: 2026-04-23
**核心命题**: AI 范式转移 = 8 个不变量在不同层之间重新分配; 公司的价值不取决于"用了多少 AI", 而取决于它在新 workflow 中占据的是"被替换的位置"还是"新控制点"。

---

## 一句话口令

> 先匹配原型 → BSM 强制分叉 (剥离已完成不分叉) → 四拍填 8 不变量 (I1 PS/EE 双记录, I8 Scope+Stage 双标签) → 合体机制 → 四道门 (Sequencing 含行业豁免) → AI 架构驱动 Asymmetry → AP/EP 证据 → 结构优先判 Alpha 类型 → 估值方法绑定。

---

## 第一章 底层 — 8 个不变量

任何 AI 时代的公司都必须在 8 个不变量上有确定位置。这 8 项不是互斥分类, 而是**同时填入的 8 个字段**。

| # | 不变量 | 精确问法 | 为什么稳定 |
|---|--------|---------|----------|
| `I1` | **收入单位** Value Unit | 客户在为 access / execution / outcome / expert-backed / take rate 付钱? | 定价语言 = 商业模式的 DNA |
| `I2` | **决策 Context** | 谁拥有独占 data / semantics / history / state / operational ontology? | 模型可商品化, 独占 ground truth 难复制 |
| `I3` | **执行权** | 谁能真正改状态、触发流程、写入系统? | read 的天花板永远低于 write |
| `I4` | **权威与责任** | 谁有批准、审计、回滚、责任承接权? | 出事时谁负责, 谁就接近终极定价权 |
| `I5` | **预算归属** | 钱从 IT / 业务 P&L / 消费者 / 服务预算 / 交易抽成 哪格出? | 预算来源决定 TAM 和黏性 |
| `I6` | **边际价值留存** | 扣除模型/算力/渠道 passthrough 后, 谁留住增量毛利? | 决定是代收员还是 owner |
| `I7` | **异常吸损权** | agent 失败、误触发、客户投诉时, 谁修复、赔付、安抚、兜底? | agent 时代的 moat 常在失败处理 |
| `I8` | **入口与路由权** | 工作默认从哪里开始, 谁控制第一跳分发与任务路由? (**Scope + Stage 双标签**) | 利润先从入口迁移 |

### I8 双标签系统 (U8)

**Scope 标签**:
- `consumer default` — Google, ChatGPT
- `enterprise default` — Microsoft 365, Salesforce UI
- `domain-specific` — Shopify admin, AppLovin, Adobe Creative Cloud

**Stage 标签**:
- `Discovery Entry` — 用户/客户默认从哪里开始
- `Execution Routing` — 预算/任务进入平台后的 micro-routing
- `Transaction Completion` — 最终交易/执行完成点
- `Post-action Feedback` — 事后分析/优化入口

**打分规则** (I8 C):
- 单 Stage owner 最高 C = 1.5/2 (60%)
- 双 Stage owner C = 2/2 (80%)
- 多 Stage default 可满档

---

## 第二章 中层 — 5 个迁移箭头

| 箭头 | 定义 | 信号 | 投资含义 |
|------|-----|-----|---------|
| `A1 Sink` | 向模型层/协议层/基础设施层下沉 | 免费化、标准化、协议化 | 应用层被掏空 |
| `A2 Lift` | 向 orchestration / workflow owner 层上浮 | 完整 context、审批、治理争夺 | control plane 升值 |
| `A3 Spill` | 跨行业边界转移到新 owner | 新责任方出现; 业务剥离已完成事件 | 原分类失效, 利润池改道 |
| `A4 Rebundle` | 旧层被拆开后在新 bundle 里重组 | 软件+服务, agent+专家 | 新赢家未必是旧层延长线 |
| `A5 Split-Retain` | Discovery 外移到上游, Execution 在原位留存 | SHOP / APP / INTU 部分 | 原公司成为 execution owner, 变现可能更深 |

### 辅助标签

| 标签 | 取值 |
|------|-----|
| `L` 锁定 | 有/无 + 原因 (监管/物理/资本/合规/网络) |
| `H` 时间 | H1 <12月 / H2 1-3年 / H3 3-5年+ |
| `P` 证明 | P0 叙事 / P1 已上线 / P2 已预算化重复部署 / P3 已在收入毛利可见 |
| `D/E/B` 方向性 | D 防御 / E 扩张 / B 兼备 (**B 需 ≥2 具体证据**否则强制 D 或 E) |

---

## 第三章 打分规则

### 3.1 权重分配 (百分制基础盘 70 分)

| 不变量 | 权重 | 满分 | C 档位 | S 档位 | M 档位 |
|--------|-----|------|--------|--------|--------|
| I1 | 11% | 11 | 0/1.5/3 | 0/2.5/5 | 0/1.5/3 |
| I2 | 9% | 9 | 0/1.5/3 | 0/2/4 | 0/1/2 |
| I3 | 10% | 10 | 0/1.5/3 | 0/2/4 | 0/1.5/3 |
| I4 | 10% | 10 | 0/1.5/3 | 0/2/4 | 0/1.5/3 |
| I5 | 9% | 9 | 0/1.5/3 | 0/2/4 | 0/1/2 |
| I6 | 9% | 9 | 0/1.5/3 | 0/2/4 | 0/1/2 |
| I7 | 7% | 7 | 0/1/2 | 0/1.5/3 | 0/1/2 |
| I8 | 5% | 5 | 0/1/2 | 0/1/2 | 0/0.5/1 |
| **合计** | **70%** | **70** | | | |

**C/S/M 权重比**: 30% / 40% / 30% — S 优先 (稳定性是 alpha 核心)

### 3.2 双源证据规则

| 评分 | 证据要求 |
|------|---------|
| 满档 | ≥2 独立源 + ≥1 P2 级; 两源不得同类 (不都是 sell-side / 管理层) |
| 中档 | ≥1 P1 |
| 0 | 显式说"已主动搜索 X/Y/Z 未发现" |
| -1 | P2+ 证据显示原优势已减分 |

违反双源 → 该格打分上限降一档。

### 3.3 I1 PS/EE 双记录 (U2)

| 字段 | 定义 |
|------|-----|
| **PS** Pricing Surface | 客户看到的表面定价/计费结构 |
| **EE** Economic Engine | 真正产生毛利的经济引擎 |

**打分规则**:
- PS = EE → 按较高档
- PS ≠ EE (PS access, EE take rate) → 两者平均档, 不得单独按 EE 满档
- PS 超前 EE (outcome 叙事 + 实际 access) → 按 PS 降一档 (价值陷阱早期信号)

**I1 软上限 (U6)**:
- I1 ≥9/11 分必须证明 EE 主体迁移到 outcome/take rate/expert-backed
- 纯 access 最高 8/11, 无论规模或质量

### 3.4 I5 满档严格化 (U6)

I5 = 9/9 满档需满足以下之一:
1. 结构性不可替代 (法规/物理/合规/专利锁定)
2. 监管授权垄断级
3. 生态锁定 >95%

不满足 → 最高 8/9, 无论切换成本多高。

### 3.5 -1 反向评分触发 (任 2 条满足)

1. 该不变量的 owner 身份已在客户合同/采购行为上逆转 (P2+ 证据)
2. 逆转不可被对冲
3. 逆转影响核心 workflow, 不是边缘业务

满足 1 条 → 标 `-1 watch` + 复核时间, 不打 -1

### 3.6 I8 Stage 标签整合 (U8)

填表时强制标注 Scope + 主导 Stage, 打分按主导 Stage 深度 + 其他 Stage 覆盖综合:
- 单 Stage owner 最高 C = 1.5 (60%)
- 双 Stage owner C = 2 (80%)
- 多 Stage default C 可满档

---

## 第四章 BSM 强制分叉 (U1 + U7)

### 4.1 分叉判定 (BSM-1)

任一"是"则必须独立分叉填表:
1. I5 预算口袋跨 ≥2 类
2. I1 PS 或 EE 跨 ≥2 类
3. I3 execution 在不同 workflow

### 4.2 剥离完成例外 (U7, v0.9.1 新)

> **剥离已完成的业务不得作为 BSM 分叉对象, 仅作为 A3 Spill 历史标注。BSM 判定基于报告日的实际结构 (最新 10-K / 8-K 披露的 operating segments), 不是历史结构。**

**判定时必答**:
1. 报告日快照: 最新 10-K 披露的 operating segments 数量
2. 剥离完成时点: 是否有 2024-2026 完成的重大剥离?
3. 剥离进行中: 若未完成, 保留 BSM 分叉, 标 "BSM Pending — Spin-off in progress"

### 4.3 分叉报告结构

- 每条 ≥5% 收入占比的业务线独立母表
- 战略重要性 > 收入占比时独立"战略视图"
- 业务线间同一不变量差 ≥3 分 → 强制 SOTP 估值

### 4.4 铁律 4

> 分叉优先于合并。但剥离已完成的业务不分叉。BSM 基于报告日结构。

---

## 第五章 Operational Layer 合体机制 (U3)

### 5.1 触发条件

某个命名层同时承担:
1. **I2** (独占 semantic/context)
2. **I3** (真实 write 权和业务流 execution)
3. **I4** (governance / audit / security)

且有 **≥2 独立第三方证据** (不只是公司官网 P0) 证明合体性 → I2 + I3 + I4 各 +0.5 分 (共 +1.5 分)

### 5.2 反向约束

- 合体证据不得全部来自公司官网
- 合体加分仅对 A2 Lift 类型公司有效
- 合体加分不能与 I2/I3/I4 满档并存

### 5.3 典型

- ✓ **PLTR Ontology** (semantic + actions + functions + dynamic security)
- ✗ SHOP Shop Pay (主要是 I3, 不合 I2+I4)
- ✗ ADBE Creative Cloud (I2+I3 合体但缺 I4 governance)
- ✗ APP AXON (I2+I3 合体但缺 I4 governance)

---

## 第六章 四拍填表顺序

| 拍 | 填什么 | 为什么 |
|---|-------|-------|
| 拍 1 | `I5` 预算归属 | 所有其他不变量的价值上限由 I5 决定 |
| 拍 2 | `I2 + I3 + I4` 三角 | 互相约束, 不得单独填 |
| 拍 3 | `I1 + I6 + I7` 三元 | 价值捕获必须整体看 |
| 拍 4 | `I8` 入口 | 最易被近期噪音扭曲, 放最后 |

### 反向约束

1. NEVER 在 I1-I8 都填完前跑四道门
2. NEVER 用 P0 叙事支持 ≥2 分
3. NEVER 独立解读 Burden, 必须配对 A4/A5

---

## 第七章 四道门

### 门 1 结构门 (C3 放宽)

I3/I4/I7/I8 至少一项 **C ≥ 满档 × 0.8**, 两项合计 ≥ 满档 × 0.6

### 门 2 经济门

I1 + I5 + I6 合计 ≥ **12 分**

### 门 3 验证门

至少 **3 个**不变量达到 P2, 或 **1 个** P3

### 门 4 Sequencing 门 (含 U9 行业豁免)

**坏 Sequencing 原规则**:
1. I1 的 H 领先 I6 的 H 超过 1 档
2. I8 的 H 领先 I5 的 H 超过 1 档
3. I3 的 H 领先 I4 的 H 超过 1 档

**U9 — 行业通用错层豁免**:

> 若公司的某项错层与同行业代表性竞争对手 (至少 2 家可比公司) 的错层程度一致, 该错层视为"行业结构", 不单独触发 Bad Sequencing。但需标注"行业结构风险"。

**触发"行业通用"条件**:
1. 至少 2 家同行代表性公司有相同错层方向和程度
2. 错层来自行业商业模式结构, 不是公司特有
3. 显式标注行业列表 + 错层程度对照

**满足行业通用** → Sequencing Bad 改为 Neutral (+3)
**不满足** → 按原规则 Bad

**AI-Exposed 严格化**: 若 AI Asymmetry 为 AI-Exposed/Victim, U9 豁免不适用; H 差阈值从 1 档降到 0.5 档。

**好 Sequencing** (+7): I5 先 Frozen → I4 承接 → I1 迁移 → I6 实现

---

## 第八章 AP / EP 分离 (U4, 10 分)

### AP (Adoption Proof) 0-5

| 档 | 分 | 条件 |
|---|---|-----|
| 5 | 规模化部署 | ≥千客户, 多场景, P3 运营数据 |
| 4 | 中度规模 | 百-千客户, 主要场景覆盖, P2 |
| 3 | 早期规模 | 百级客户 或 大型旗舰, P1-P2 |
| 2 | 试点 | ≤百客户, bootcamp/PoC 为主 |
| 1 | 产品上线 | 客户极少 |
| 0 | 仅叙事 | 未公开部署 |

### EP (Economics Proof) 0-5

| 档 | 分 | 条件 |
|---|---|-----|
| 5 | 经济引擎清晰 | 整体 FCF/OPM 可见扩张, P3 收入毛利 |
| 4 | 主体经济已证 | P2-P3, 但 Alpha 相关部分未独立披露 |
| 3 | 部分经济已证 | 核心经济 P2, 因果链未明 |
| 2 | 单元经济合理 | P1 单元经济 (bootcamp 转化率) |
| 1 | 经济叙事合理 | 管理层描述 P0-P1 |
| 0 | 无经济证据 | 未披露 |

---

## 第九章 修正器 (20 分)

### 9.1 AI Asymmetry (8 分, 6 档, C2 升级)

| 档位 | 分数 | 架构判别 |
|------|-----|---------|
| AI-Accretive (+2) | +8 | AI 替代自己成本 + 自研/混合模型 |
| AI-Neutral Positive (+1.5) | +6 | Model-agnostic, 成本可对冲, 定价有上行 |
| AI-Neutral (+1) | +4 | 改善效率但不改变核心成本 |
| AI-Passthrough (0) | 0 | 成本/定价 passthrough |
| AI-Exposed (-1) | -4 | Embedded single-model, 成本锁定 |
| AI-Victim (-2) | -8 | 核心服务被 AI 直接替代 |

### 9.2 Sequencing Quality (7 分, 含 U9 豁免)

Good (+7) / Neutral (+3, 含行业豁免) / Bad 1 处 (0) / Bad ≥2 处 (-3)

### 9.3 D/E/B 画像 (5 分, B 严格化)

| 档 | 条件 | 分 |
|---|-----|---|
| Expansive-dominant | E ≥4 + D ≤3 | +5 |
| Balanced | E 2-3 + D 3-4 + B 补充 | +3 |
| Defensive-dominant | D ≥5 + E ≤2 | +1 |
| Pure Defensive | D ≥7 (或 E = 0) | 0 |

**B 严格化**: B 必须 ≥2 具体证据 (一个证防御, 一个证扩张), 否则强制 D 或 E。

---

## 第十章 总分合成

```
总分 = 不变量基础 (70)
     + AI Asymmetry (-8 ~ +8)
     + Sequencing (-3 ~ +7)
     + D/E/B (0 ~ +5)
     + AP (0 ~ +5)
     + EP (0 ~ +5)
     - Burden Flag (0 或 -5)
     + Operational Layer 合体 (0 ~ +1.5)
```

理论范围: -16 ~ 101.5

---

## 第十一章 Alpha 类型 (铁律 3: 结构优先)

| Alpha 类型 | 分数区间 | 结构特征 | 估值方法 |
|----------|---------|--------|--------|
| **Deep Alpha** | 75-95+ | ≤3 不变量 8-10 分 + 强 A0 Frozen + 物理/合规锁定 | DCF + 稳态 FCF |
| **Broad Alpha** | 75-100 | ≥5 不变量 6+ 分 + Expansive-dominant + AI-Accretive 常见 | 分部 SOTP |
| **Growth Alpha** | 55-80 | I3 接近满档 + 强飞轮 (AP+EP ≥8) + Good Sequencing + take rate/outcome 主体 | PEG + 飞轮验证 |
| **Option Alpha** | 35-60 + Conditional | 主体中低 + Conditional Upside P1+ + 巨大 TAM + 合体层早期 | 期权定价, 给区间 |
| **Transition-Watch** | 30-60 | 过前几门但 Sequencing 不过, 或 AI-Exposed, 或 legacy defending | 不给估值, 只给 Kill Switch |

### 铁律 3 (结构 override 分数)

Alpha 类型由**结构特征**决定, 分数是**结构判定的输入**不是输出。

- 分数 76 但结构符合 Growth Alpha (I3 极强 + 强飞轮 + take rate, 如 SHOP) → Growth Alpha, 不归 Broad
- 分数 73 但结构符合 Broad Alpha (多项 6+ 分 + 广度, 去除合体加分后的 PLTR) → 仍 Broad 下沿
- 分数 46 但有 Conditional Upside P2+ → Option Alpha, 不归 Transition-Watch
- 分数 80 但纯 Defensive + 无扩张 → Broad 下沿, 不能 Deep

---

## 第十二章 覆盖层

### 12.1 Burden Flag

- 必须配对 A4 Rebundle / A5 Split-Retain 检验后仍为负资产 → -5 分
- 若公司正在通过 A4/A5 重组旧资产, Burden 不打

### 12.2 Conditional Upside (最多 3 项)

- 不进主体分数
- 若 ≥1 项 P2 级且主体分数 <55 → Option Alpha 候选
- 若 Conditional Upside 有 P2-P3 级 → 应考虑从 Conditional 升级到主体
- 所有 Conditional 在 P0 级 → 忽略, 不给叙事加分

---

## 第十三章 校准锚 (v0.9.2, 8 锚)

| 锚 | Alpha 类型 | 分数 | 原型 | 关键识别 |
|---|-----------|-----|-----|---------|
| **INTU** | Broad Alpha | 93 | P4 | 四不变量 Frozen + AI-Accretive + Good Seq + 多 Stage 入口 |
| **TSM** | Deep Alpha | 80 | P5 | 物理 Frozen 单点极深 + 周期 |
| **SHOP** | Growth Alpha 上沿 | 77 | P2 | I3 双边网络 + take rate + Execution Routing + Transaction Completion 双 Stage |
| **APP** | Growth Alpha 上沿 | 76 | P3 | I3 execution routing 极强 + AI-Accretive + 单 Stage + 周期性 I5 |
| **PLTR** | Growth Alpha 近 Broad | 73 | P1 | Operational Layer 合体 + AI-Neutral Positive + Gov Frozen |
| **ADBE** | Transition-Watch (Legacy-Defending) | 60 | **P11 (v0.9.2 新)** | Legacy moat + AI 防御 + Pure Defensive (E=0) + Neutral |
| **GTLB** | Transition-Watch (Pure Defensive) | 40 | P6 | I4 FedRAMP Frozen 但全防御 + AI-Exposed |
| **CRM** | Transition-Watch (Defensive 尝试扩张) | 32 | P7 | I1 PS/EE 分离 + AI-Exposed + Bad Sequencing |

### 使用规则

- 分数 >85 → 必须说明比 INTU 强在哪
- 分数 >75 但 AI-Exposed → 重新检查 I6 S
- 每个新公司必须与 ≥2 个锚做"比 X 强/弱在哪一格"

---

## 第十四章 四条铁律

1. **不变量优先于类别** — 公司形态、收费模式、AI 阶段都是不变量归属的派生视图
2. **证据优先于叙事** — 双源规则 + I1 软上限 + P0 最多支持 1 分
3. **结构优先于分数** — Alpha 类型由结构特征决定, 分数是输入
4. **分叉优先于合并** — BSM 强制分叉, 但剥离已完成的业务不分叉; BSM 基于报告日结构

---

## 第十五章 填表模板

```markdown
# {TICKER} — v0.9.2 范式转移分析

## 原型匹配 (第 19 章库)
- 匹配原型: [P1-P11 + 一句话定位]
- 置信度: 高/中/低
- 与原型差异: ...
- 预期分数区间: ...

## BSM 强制分叉 (U1 + U7)
- 报告日快照: 最新 10-K operating segments
- 剥离完成检查 (U7): 是否有 A3 已完成?
- BSM-1 三问结果
- 分叉结果 + 策略

## [每条业务线独立填表, 若分叉]

### 拍 1 I5
- C/S/M + A + L + H + P + D/E/B
- I5 满档严格检查

### 拍 2 I2 + I3 + I4
- 各 C/S/M
- Operational Layer 合体检查 (U3)

### 拍 3 I1 + I6 + I7
- I1 强制 PS/EE 双记录 (U2)
- I1 软上限检查
- I6 AI 架构选择
- I7 空白检查

### 拍 4 I8 (Scope + Stage 双标签, U8)
- Scope: [consumer/enterprise/domain]
- 主导 Stage: [Discovery/Execution Routing/Transaction/Post-action]
- 覆盖其他 Stage: 是/否/部分

## 母表汇总

| I | 不变量 | 权重 | C | S | M | 小计 | 满分 | A | L | H | P | D/E/B | 双源✓ |
|---|-------|-----|---|---|---|------|------|---|---|---|---|-------|------|

**基础盘**: X/70

## 合体加分 (U3)
## 四道门 (含 U9 行业豁免)
## 修正器 (AI Asymmetry + Sequencing + D/E/B)
## AP/EP
## Burden Flag
## Conditional Upside

## 业务线一致性 (若 BSM 分叉)

## 校准锚对比 (≥2 锚)
- 比 [锚 1] 强在 / 弱在
- 比 [锚 2] 强在 / 弱在

## 输出
- **原型**: ...
- **Alpha 类型** (铁律 3 结构优先): ...
- **估值方法** (类型绑定): ...
- **方向性画像**: ...
- **Kill Switch** (3 条, P 级, 监测指标, 复核时间)
- **总分**: X/100
```

---

## 第十六章 v0.9.1 → v0.9.2 diff

| 模块 | v0.9.1 | v0.9.2 |
|------|--------|--------|
| 原型库 | P1-P7 (6 + P7 候选) | **P1-P11 (11 个, 含 P7-P10 正式 + P11 新)** |
| 校准锚数量 | 7 锚 | **8 锚 (加 ADBE 作为 P11)** |
| ADBE 归类 | 未决 | **明确 P11 Legacy-Platform-Defending-with-AI** |

**其他所有规则不变** (8 不变量 / 4 门 / BSM / 合体机制 / AI 6 档 / Sequencing U9 / 铁律)

---

## 第十七章 v0.9.2 自知边界 (留给 v1.0)

1. **Sequencing Neutral 细分** (Healthy / Tension-Balanced / Forced) — ADBE 实战暴露
2. **D/E/B 的 E=0 警告强化** — ADBE 是唯一 E=0, 值得额外权重信号
3. **Conditional Upside 的"低证据 + 高影响"场景** — ADBE 3 项 Conditional 都是 P0-P1 但潜在影响大
4. **AI-Neutral Positive 边界** — ADBE 部分符合但证据不足
5. **Growth Alpha 内部 Healthy vs Brittle 亚型** — SHOP 77 vs APP 76 vs PLTR 73 质的差异
6. **合规争议打分机制明文化** — APP 短报告争议如何反映在 S 层 vs Kill Switch
7. **I5 周期性口袋折价公式化** — APP 广告预算 vs SHOP 商家预算的周期性差异
8. **AI Asymmetry 结构 vs 周期来源区分** — APP 的 Signal Loss 优势是周期性

v0.9.2 复杂度已逼近可用上限, v1.0 应**反向精简**而不是继续加层。

---

## 一句话总纲

> **底层 8 个不变量是稳定的, 不变量的归属会迁移。分析的工作不是猜"AI 赢家输家", 而是填清楚"谁掌握知道 / 执行 / 批准 / 兜底 / 入口 / 预算 / 利润", 然后看每一格往哪里迁移, 最后判断这些控制权能否变成 cash flow。**
