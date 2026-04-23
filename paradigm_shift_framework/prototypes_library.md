# 范式转移原型库 (Prototype Library) v0.9.2

> **用途**: 填表第一步 — 先匹配原型, 再精细化打分。原型决定分数锚定方向, 避免从零漂移。
> **当前原型数**: **11 个** (P1-P11), v0.9.2 正式加入 P7-P11 (原 v0.9.1 仅 P1-P6 + P7 候选)
> **匹配规则**: 高置信度直接用原型分数区间; 中置信度列 Top 2 原型取中位; 低置信度独立填表, 若结构稳定可备选加入原型库

---

## 原型库总表

| 原型 | 一句话定位 | 代表公司 | 典型分数 | Alpha 类型 |
|------|---------|--------|--------|----------|
| `P1` | **Operational Control Layer** | PLTR | 70-85 | Growth Alpha (近 Broad) |
| `P2` | **Split-Retain Execution Rail** | SHOP | 70-85 | Growth Alpha (上沿) |
| `P3` | **AI-Native Routing Layer** | APP, TTD | 60-80 | Growth Alpha |
| `P4` | **Compliance-Backed Authority Owner** | INTU | 85-100 | Broad Alpha |
| `P5` | **Single-Point Physical Frozen** | TSM, ASML | 75-90 | Deep Alpha |
| `P6` | **Pure Defensive Compliance** | GTLB | 35-50 | Transition-Watch |
| `P7` | **Transition-Watch (Defensive 尝试扩张)** | CRM | 25-40 | Transition-Watch |
| `P8` | **Growth-Brittle** (薄壳高增长) | (候选) | 50-70 | Growth Alpha (中段) |
| `P9` | **Option-Stage** | 早期 PLTR-AIP 独立看 | 35-60 | Option Alpha |
| `P10` | **Duopoly-Scale Network** | Meta, Google | 80-100 | Broad/Deep Alpha |
| `P11` | **Legacy-Platform-Defending-with-AI** (v0.9.2 新) | **ADBE** | 50-70 | Transition-Watch (Legacy-Defending) |

---

## P1: Operational Control Layer

**定位**: 承载 I2+I3+I4 合体的治理执行层, 是 A2 Lift 的终点

**代表**: **PLTR** (73)

**关键识别**:
- 有一个命名层 (如 Ontology) 同时具备 semantic + actions + functions + dynamic security
- ≥2 独立第三方证据证明合体性 (不只是公司官网)
- **Operational Layer 合体加分 (+1.5)** 触发
- AI-Neutral Positive (model-agnostic 架构常见)
- I5 可能是 Government 级 Frozen + Commercial 扩张
- Good Sequencing: I5 先 Frozen → I4 承接 → I1 迁移 → I6 实现

**典型打分模式**:
- I2/I3/I4 都在 2-2.5 区间, 合体后各 +0.5 达到 2.5-3
- I1 通常是 access/subscription 主体, 未迁移 outcome, 打 7-8/11
- I6 强 (55-60% OPM), 得 7-8/9

**估值方法**: PEG + BSM SOTP (政府/商业分开)

**识别反例**:
- SHOP 的 Shop Pay 是 I3 为主, 不合 I2+I4
- ADBE 的 Creative Cloud 是 I2+I3, 缺 I4 governance
- APP 的 AXON 是 I2+I3, 缺 I4 governance

---

## P2: Split-Retain Execution Rail

**定位**: Discovery 外移到 AI/上游, Execution + Transaction Completion 在原位留存

**代表**: **SHOP** (77)

**关键识别**:
- **A5 Split-Retain 箭头显著触发**: discovery 已下沉 (A1 完成), execution 保留
- I3 非常强 (接近满档, 8-9/10), 通常按 take rate 直接变现
- I8 Stage = Execution Routing + Transaction Completion 双 Stage owner
- 有双边/多边网络效应, F 飞轮 P2+ 可见
- Good Sequencing 常见
- PS/EE 部分一致 (take rate 主体, subscription 辅助)

**典型打分模式**:
- I3 打 9-10/10 (take rate 直接变现 M 满档)
- I1 打 7.5-8.5/11 (PS/EE 不完全一致, 有 subscription 稀释)
- I8 3.5-4/5 (双 Stage 但非 default)

**估值方法**: PEG + 飞轮验证

**识别反例**:
- APP 是单 Stage (仅 Execution Routing), 不是 Split-Retain 因为 APP 也失去了部分 Transaction Completion (最终消费者交易不经 APP)
- CRM 的 Agentforce 不是 Split-Retain, 因为 discovery 没外移, 是 Rebundle 失败

---

## P3: AI-Native Routing Layer

**定位**: 预算/任务进入平台后的 micro-routing owner, 只在 Execution Routing Stage 强势

**代表**: **APP** (76), TTD (The Trade Desk), Moloco

**关键识别**:
- I8 Scope = domain-specific, Stage = **单 Stage (Execution Routing only)**
- I3 强但有 S 层不稳 (因为被 Meta/Google 规模竞争 + 合规争议)
- I1 take rate 主体, PS = EE 一致
- I6 极高 (EBITDA margin 75%+ 常见), 靠自研模型
- **AI-Accretive** (自研 ML, 不依赖外部模型厂商)
- I4/I7 结构性低 (行业通用, 不主动担责)
- **Sequencing 行业通用错层, U9 豁免后 Neutral**
- I5 是周期性预算 (广告/交易), 非 Frozen

**典型打分模式**:
- I3 8-9/10, I6 7.5-8/9, I1 7-8/11
- I4 2-4/10, I7 2-3/7 (结构性低)
- I8 3-3.5/5 (单 Stage)

**估值方法**: PEG + 周期折价 + 合规风险折价

**识别反例**:
- SHOP 不是 P3, 因为 SHOP 是双 Stage 而不是单 Stage Execution Routing
- PLTR 不是 P3, 因为 PLTR 有 Operational Layer 合体

---

## P4: Compliance-Backed Authority Owner

**定位**: 主动承担责任并变现 authority, 全 Stage 入口, 广度型 moat

**代表**: **INTU** (93)

**关键识别**:
- I4 + I7 真实承担 + 独立变现线 (Live 溢价, Tax Penalty Protection, Audit Defense, Capital 信贷)
- I4 打 10/10 或接近
- 多 Stage default entry (domain-specific 但跨 Stage)
- **AI-Accretive** (AI 替代自己成本项, 如 CPA 人工)
- Good Sequencing 典型
- 多业务线 (BSM 强制分叉), 组合韧性强
- I5 多元口袋 Frozen (法规 / 消费者习惯 / 专业生态)
- F 飞轮强 (P2+ 可见, 留存型飞轮)

**典型打分模式**:
- I4 10/10, I7 6/7 (罕见的 authority 变现)
- I5 9/9 (Frozen 满档)
- I1 10-11/11 (多种收入单位都已变现)

**估值方法**: 分部 SOTP + 交叉销售溢价

**识别反例**:
- Salesforce 不是 P4, 尽管有合规功能, 但没有 I4 authority 变现线
- ADBE Firefly indemnification 是 P4 的萌芽, 但规模不足

---

## P5: Single-Point Physical Frozen

**定位**: 物理/资本/工艺不可替代的深度 Frozen, 单点极深

**代表**: **TSM** (80), ASML, 部分交易所 (CME)

**关键识别**:
- I3 物理 execution 满档 (3nm 制程, EUV 光刻机)
- I5 CapEx Frozen (hyperscaler/大厂必经)
- I7 承担 ppm-level 责任 (芯片失效承担)
- **Good Sequencing** (CapEx 周期先行)
- 周期性 (半导体/工程机械周期)
- AI-Accretive 常见 (AI 需求驱动 CapEx)
- D/E/B: Balanced, 不是 Expansive-dominant

**典型打分模式**:
- I3 9-10/10 (物理满档)
- I5 9/9 (Frozen 满档)
- I2/I4/I7 都在 7-9 区间, 单点深但不广

**估值方法**: DCF + 稳态 FCF + 周期调整

**识别反例**:
- NVDA 部分符合 P5 (CUDA 生态 Frozen) 但更接近 P10 Duopoly-Scale, 待新实战校准
- APP 不是 P5, 没有物理/工艺 Frozen

---

## P6: Pure Defensive Compliance

**定位**: 合规壁垒但无扩张, 纯防御型护城河

**代表**: **GTLB** (40)

**关键识别**:
- I4 Frozen (FedRAMP / 监管授权) 是唯一强项
- 其他 7 个不变量全部 Defensive 或中等
- **AI-Exposed** 常见 (AI 吃 inference cost, 定价不能上调)
- Sequencing Bad (I3 execution 被 agent 旁路, I4 Frozen 无法扩张)
- D/E/B: **Pure Defensive (D ≥7 + E ≤1)**
- AP + EP 中等 (部署存在但经济薄弱)

**典型打分模式**:
- I4 7/10 (Frozen 保卫)
- 其他不变量基础盘 32-40 区间

**估值方法**: 不给估值, 只给 Kill Switch 监控

**识别反例**:
- ADBE 不是 P6, 因为 ADBE 有真实扩张尝试 (Firefly indemnification)
- CRM 不是 P6, 因为 CRM 有 I1 outcome 叙事 (虽然失败)

---

## P7: Transition-Watch (Defensive 尝试扩张, CRM 型)

**定位**: Legacy SaaS 叠加 AI 叙事, 试图扩张但 PS/EE 严重分离

**代表**: **CRM** (32)

**关键识别**:
- I1 PS 超前 EE (outcome 叙事 + 实际 access) → PS 降一档
- **AI-Exposed** (AI inference cost 被吸收, Agentforce 不能转嫁)
- **Bad Sequencing** (I1 H1 outcome 承诺 vs I6 H3 毛利验证)
- BSM 强制分叉后多业务线分数稀释
- D/E/B: Defensive 主体但有 E (尝试扩张, 但未兑现)
- 被 Microsoft Copilot + ChatGPT 双边夹击
- 与 P6 区别: P6 无扩张尝试, P7 有扩张尝试但失败

**典型打分模式**:
- I1 打 3-5/11 (PS/EE 严重分离, 降档)
- I6 S 低 (AI 吃毛利)
- 总分 25-40 区间

**估值方法**: 不给估值, Kill Switch 优先

**识别反例**:
- GTLB 是 P6 (无扩张) 不是 P7 (有扩张叙事但失败)
- ADBE 介于 P6 和 P7, 更接近 P11

---

## P8: Growth-Brittle (候选, v0.9.2 暂无实战锚)

**定位**: 薄壳型高增长 — 财务极强但结构薄, 一颗心智冲击就会解构

**候选**: APP 在"合规争议若恶化 + 竞争追平"双情景下可能滑入此原型

**关键识别**:
- 基础盘看似过门 (Growth Alpha 区间), 但 I4/I7 结构性低 (<30% 满档)
- 飞轮依赖单一算法优势, 不是双边网络
- I5 是周期性/竞争激烈口袋
- Conditional Upside 少, 主要是防御对冲
- 容易在 Kill Switch 触发时快速崩塌到 Transition-Watch

**预期分数**: 50-70 (Growth Alpha 中下段, Brittle 版本)

**估值方法**: PEG + 极严 Kill Switch 监控 + tail risk 折价

**识别 (暂无 v0.9.2 实战锚, 待校准)**

---

## P9: Option-Stage

**定位**: 主体低分但 Conditional Upside 有 P1-P2 证据 + 巨大 TAM 的期权型

**代表**: 早期 PLTR-AIP 独立看 (~45 虚拟分数), 部分早期 SaaS

**关键识别**:
- 主体分数 <55 (Option Alpha 上沿)
- Conditional Upside ≥1 项 P1-P2 级
- 巨大未变现 TAM
- 主体经济未完全验证 (AP/EP 中等)
- 可能有合体层早期信号

**典型打分模式**:
- 主体 35-55, Conditional Upside 加分可选
- 估值按期权定价, 分阶段折价

**估值方法**: 期权定价 + 分阶段折价, 给区间不给目标价

**识别反例**:
- PLTR 整体是 P1 不是 P9, 因为主体已变现 (FY25 OPM 57%)
- 早期 SaaS 但 TAM 不够大的不符合 P9

---

## P10: Duopoly-Scale Network

**定位**: 双边网络 + first-party data 独占 + 规模垄断

**代表 (候选, v0.9.2 暂无实战锚)**: Meta, Google, 部分 Amazon

**关键识别**:
- I2 极强 (first-party consumer data 独占)
- I5 巨型口袋 (广告预算龙头)
- I8 Discovery Entry default (Meta/Google 是默认入口)
- 多 Stage default owner
- 典型 AI-Accretive 或 Neutral Positive

**预期分数**: 80-100

**估值方法**: DCF + 规模溢价, 但监管风险折价

**识别 (待新实战锚)**

---

## P11: Legacy-Platform-Defending-with-AI (v0.9.2 新正式化)

**定位**: 传统强势 SaaS 平台在 AI 时代的**防御 + 有限扩张** — 过去的 moat 仍然有效但价值被稀释, 新 moat (AI-native features) 规模未证

**代表**: **ADBE** (60)

**候选**: Oracle (若 Fusion Cloud AI 集成变主线), SAP, Autodesk, 部分传统 enterprise SaaS

### 关键识别

1. **Legacy Moat 真实存在但价值正在被稀释**
   - 专业生态 / 标准定义权 / 创作者文件锁定 / PDF/文档标准 / 等
   - 但 AI-native 工具 (Midjourney, Cursor, Figma) 在边缘领域蚕食

2. **A1 Sink 已发生在 Discovery Entry**
   - 用户的第一跳已下沉到 LLM / AI 工具
   - 公司保留 Execution Routing + Transaction Completion 部分

3. **AI-native features 规模未证**
   - 有自研 AI 产品 (如 ADBE Firefly, ORCL AI in Fusion)
   - 但**尚未显著改变收入结构或毛利曲线**
   - Conditional Upside 多是 P0-P1

4. **AI-Neutral (+4) 或 AI-Neutral Positive 边缘 (+6)**
   - 不是 AI-Accretive (没有显著替代自己主要成本)
   - 不是 AI-Exposed (margin 压缩轻微, 不是 CRM Agentforce 式严重)

5. **D/E/B: Pure Defensive 或 Defensive-dominant**
   - **E = 0** 是关键信号 — 所有扩张尝试都是防御性 (保护已有用户不流失)
   - 可能有 B 标签 (AI feature 兼具防御与扩张潜力)

6. **Sequencing: Neutral (Tension-Balanced)**
   - 多方压力 + 多方对冲同时发生
   - 不是 Good (I5 未明显先 Frozen)
   - 不是 Bad (无严重错层)
   - **警告**: Neutral 不稳定, 容易滑向 Bad

7. **过四道门但勉强**
   - 结构门靠 I3 单柱
   - 经济门稳过 (AP+EP 通常 9-10/10)
   - Sequencing 勉强 Neutral

### 典型打分模式

| 维度 | 分数区间 | 说明 |
|------|---------|------|
| I1 | 6-8/11 | 未迁移 outcome, 软上限触发 |
| I2 | 5-7/9 | Context 独占但被 AI 稀释 |
| I3 | 6-7/10 | tool-provider 型, 被 AI-native 旁路 |
| I4 | 4-6/10 | 有 I4 亮点 (如 Firefly indemnification) 但规模不足 |
| I5 | 6-7/9 | 预算口袋稳但非 Frozen, 扩张天花板明显 |
| I6 | 6-8/9 | 高毛利但 AI 压力 |
| I7 | 2-4/7 | 有 I7 亮点但不主动担责 |
| I8 | 3-4/5 | 多 Stage 覆盖但 Discovery Entry 已丢 |
| AI Asymmetry | +4 Neutral | 边缘判定 |
| Sequencing | +3 Neutral (Tension-Balanced) | 警告 |
| D/E/B | 0-1 Pure Defensive | E = 0 信号 |
| AP + EP | 9-10 | 规模化经济已证 |

### 预期总分

**50-70 分 (Transition-Watch 中段到上沿)**

### 估值方法

**不给单点目标价, 按防御估值下限 + Conditional 上升空间 + Kill Switch 监控**:
- **防御估值下限**: 稳态 FCF × 传统 SaaS PE (20-25 倍)
- **AI success scenario**: Conditional Upside 实现可达 30-35 倍
- **AI-Exposed scenario**: margin 压缩加速可能降到 15-18 倍

### 典型 Kill Switch (3 类)

1. **Seat 增速转负**: 监测核心产品 YoY 和 net new subscribers
2. **Operating Margin 大幅压缩** → 确认 AI-Exposed, 从 Neutral 降级
3. **AI-native 工具达到专业级可用 + 企业大量采用**: 监测竞争 AI 工具企业 ARR

### 识别反例

- **GTLB 是 P6 (Pure Defensive) 不是 P11**:
  - GTLB 没有真实扩张尝试 (Duo 是跟随式 AI, 不是差异化 AI)
  - GTLB I4 是单一 FedRAMP Frozen, 不是 AI-native feature
- **CRM 是 P7 (Defensive 尝试扩张) 不是 P11**:
  - CRM 有 Agentforce 激进 outcome 定价叙事 (PS/EE 严重分离)
  - P11 的 AI-native features 相对克制 (如 ADBE Firefly 不激进 outcome 定价)
  - CRM 是 AI-Exposed, P11 是 AI-Neutral
- **ADBE 是 P11 不是 P6 也不是 P7**:
  - 有真实扩张尝试 (Firefly indemnification, 真实 authority 变现初试) 区分于 P6
  - AI Asymmetry 是 Neutral 而不是 Exposed 区分于 P7

---

## 原型匹配规则

### 匹配置信度

**高置信度** (直接匹配 ≥1 个已知原型公司):
- 使用原型分数区间作为锚点
- 最终分数偏离锚点 >10 分需特别论证
- 可直接适用原型的估值方法

**中置信度** (混合多个原型):
- 列 Top 2 原型
- 分数取两者中位
- 估值方法可能需要组合

**低置信度** (无清晰匹配):
- 独立填表不依赖原型
- 若分数稳定且结构特征独特, 备选加入原型库
- ADBE 的 P11 正是通过此路径进入原型库

### 原型与 Alpha 类型不等同

- **原型**: 结构形态 (如何赚钱, 控制什么)
- **Alpha 类型**: 投资语言 (Deep/Broad/Growth/Option/Transition-Watch)

例:
- P1 (PLTR) 和 P2 (SHOP) 都是 Growth Alpha
- P4 (INTU) 是 Broad Alpha
- P5 (TSM) 是 Deep Alpha
- **P11 (ADBE) 是 Transition-Watch (Legacy-Defending 亚型)** — 与 P6/P7 同属 Transition-Watch 但结构不同

### 原型可部分混合

- INTU 的 TT 是 P4, QB 是 P4 变体, CK 是 P3 变体, Mailchimp 是 P2 候选
- 不强求单一原型匹配

---

## v0.9.2 原型库 vs v0.9.1 diff

| 原型 | v0.9.1 | v0.9.2 |
|------|-------|--------|
| P1-P6 | ✓ 已有 | ✓ 保留不变 |
| P7 | 候选, 未正式化 | **正式化, CRM 作为锚** |
| P8 | 候选, 未正式化 | **正式化** (但无实战锚, 待 v1.0 校准) |
| P9 | 候选, 未正式化 | **正式化** (虚拟锚: 早期 PLTR-AIP) |
| P10 | 候选, 未正式化 | **正式化** (无实战锚, 待测 Meta/Google) |
| P11 | 不存在 | **新增, ADBE 作为锚** |

**总结**: v0.9.2 把原型库从 6 个稳定 + 1 个候选扩展到 **11 个 (6 稳定 + 5 正式 但 3 无实战锚)**。P11 是本次升级的核心新原型。

---

## v0.9.2 原型库使用 checklist

填表时, 分析师应先完成:

- [ ] 基于公开信息 (10-K + 主营业务 + 收入单位) 猜测原型
- [ ] 匹配 Top 1-2 原型 (高/中置信度)
- [ ] 列出原型预期分数区间
- [ ] 填表过程中对比原型的典型打分模式
- [ ] 最终分数与原型预期差 >10 → 重新审视是否匹配原型
- [ ] 若独立填表后结构稳定且不匹配任一原型 → 备选新原型候选, 建议升级框架

---

## 待 v1.0 扩展的原型候选

- **P12: Trust-Asymmetric Service** — 资产管理 / 律所 / 医疗等高信任垄断服务, 待 WM/专业服务类实战
- **P13: Physical-Network Anchored** — 支付网络 V/MA, 支付 rails 类
- **P14: Regulatory-Arbitrage Platform** — 加密交易所 / 受监管 fintech 类
- **P15: Consumer-Habit Frozen** — 奢侈品 / 饮料垄断品牌, 消费 moat 类

---

## 一句话总纲

> **原型不是标签, 是填表锚点。11 个原型覆盖 AI 时代主要范式位置; 新公司先匹配原型避免从零漂移, 最终分数与原型预期一致 (±10 分) = 框架自洽。若稳定偏离 >10 分且结构特征独特, 可能是新原型候选, 应升级框架。**
