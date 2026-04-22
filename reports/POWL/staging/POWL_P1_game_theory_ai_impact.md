# POWL Phase 1 — 博弈分析 + AI Impact 合并分析

> **Skills**: game-theory-lens + ai-impact-analyzer + workflow-shift-detector
> **目的**: 深化胜出变量 V1 (DC 占比) + V4 (Jacintoport 利用率) + V5 (FID 节奏)
> **核心问题**: POWL 在两个博弈中 (EPC/客户关系 + 同业扩产) 的结构位置

---

## Part A: 三场博弈结构 (game-theory-lens)

### A1. 博弈 1: POWL vs EPC 总包商 (Bechtel/Chiyoda/McDermott)

**参与方**: POWL (中压开关柜供应商) vs Bechtel/Chiyoda (EPC 总包)

**博弈结构**:
- POWL 的 BATNA (最佳替代方案): 转向直接服务 LNG 终端 owner (降价 + 订单不稳定)
- EPC 的 BATNA: 换其他中压供应商 (ABB/Eaton/Schneider/GE Vernova)
- **双方的不对称**: EPC 有更多供应商可选, POWL 有更少"可靠 EPC 关系"可选

**量化**:
- POWL 在 Gulf Coast EPC 中的 share of wallet: 10-20% (估计)
- EPC 平均选 2-3 家中压供应商 bid → POWL 中标概率 30-50%
- **EPC 的替代成本**: 低 (3 个月换供应商, 但认证 +3-6 个月); POWL 的替代成本: 高 (失去这个客户 = 失去项目)

**博弈均衡**:
- 供给紧张期 (2024-2026): POWL 有定价权 (替代成本高)
- 供给松弛期 (2027+, Eaton 扩产): POWL 定价权下降, EPC 有 recompete 压力

**对 thesis 的含义**: 支持 Gap #2 (周期错位), 定价权 3.5pp 会在 2027+ 被 EPC 层面 recompete 压缩

### A2. 博弈 2: POWL vs 同业竞品 (ETN/Schneider/ABB)

**参与方**: POWL (小盘定制) vs ETN/Schneider/ABB (大盘标准化)

**博弈结构**:
- POWL 的优势: Gulf Coast 地理 + 大项目工程经验 + 小盘灵活
- 大盘优势: 标准化产品线 + 全球供应链 + 研发投入 + 低单位成本

**各自最优策略**:
- POWL: 守住 LNG + 油气 boutique (退化到定制工程)
- ETN: 进攻 DC 标准化 + 全球布局 (不在乎 Gulf Coast LNG 个案)
- Schneider: 进攻 DC + 工业数字化 (EcoStruxure)
- ABB: 进攻 DC + 电动化 (e-mobility)

**纳什均衡**: **共存** — POWL 守住 LNG niche, ABB/ETN 主导 DC 标准化
- POWL DC 渗透 > 20%+ 需要打破这个均衡 → 困难
- POWL 在 Q1 FY26 拿到 $75M DC megaproject 可能是 "hyperscaler 策略性多元化供应商" 的偶发事件

**博弈 2 的压力**:
- Eaton Omaha $30M 扩产 2027H1 投产 → **主动出击 LNG 市场的产能**, 直接挑战 POWL 基本盘
- Schneider/ABB 全球扩产 → 间接压价 (overflow 到 Gulf Coast)

**对 thesis 的含义**: 支持 Gap #1 (范畴错分), POWL 无法持续在 DC 中与标准化产品竞争; 同时 2027+ LNG 基本盘也面临竞争

### A3. 博弈 3: POWL vs Hyperscaler 客户

**参与方**: POWL vs MSFT/META/GOOGL/AMZN/ORCL (DC megaproject 客户)

**博弈结构**:
- **非对称性**: Hyperscaler 预算 × 100 > POWL 年收入. Hyperscaler 选 POWL 只是"小数点" (2-3% DC 电气预算)
- POWL 依赖度: 单个 $75M megaproject = FY26 Q1 总营收 30%
- Hyperscaler 依赖度: POWL 是 10-20 个中压供应商之一

**各自动机**:
- **POWL**: 希望单客户复购 + 扩展到多客户
- **Hyperscaler**: 希望多元化供应商 + 标准化 BOM + 区域均衡

**均衡分析**:
- 短期 (12-18M): Hyperscaler 可能继续单次 order POWL, 但不签多年 agreement
- 中期 (2-3Y): Hyperscaler 会要求 POWL 标准化产品 or 转向 ETN/VRT 一站式方案
- 长期 (5Y+): POWL 要么**深度嵌入 hyperscaler 供应链**(需要产品线转型), 要么回到 LNG niche

**对 thesis 的含义**: 支持 Gap #1 (范畴错分). POWL 无法从"项目式定制"升级到"hyperscaler 战略供应商"因为没有 scale 优势.

---

## Part B: AI Impact 分析 (ai-impact-analyzer)

### B1. 方向判断 — 正面还是负面?

**AI 对 POWL 的方向**: **正面, 但幅度有限** (期权, 非主干)

### B2. 幅度量化

**路径 1: 短期 (12-24M) DC 订单窗口**
- 硬数据: Q1 FY26 DC backlog 15%, $240M; 单季 mega $75M+
- 合理预测: 12M 内 DC 营收 $150-220M (15-20% 营收占比)
- **对 EPS 贡献**: +$0.20-0.40 / 年 ≈ 4-8% EPS uplift

**路径 2: 中期 (2-3Y) DC 标准化产品线**
- 条件: POWL 宣布第二扩产 专用于 DC 标准化 + 与 hyperscaler 签 multi-year agreement
- 概率: 20-30% (目前管理层未宣布, 且 ETN/VRT 已占标准化市场)
- 幅度: 如果兑现, DC 收入 24M 内达 30-40%, PE 可支撑 35-40x

**路径 3: 长期 (5Y+) AI Infrastructure 持续扩张**
- 美国数据中心新增电力需求 2030 年前 +50% (EIA)
- POWL 的"地理+工程"护城河可能在 AI DC 部分领域扩展 (如 on-site generation 配套)
- 但需要 POWL 战略调整 (投入 DC-specific 产品研发)

### B3. AI 受益 vs AI 替代风险

**受益面**:
- DC 直接订单 ✓
- 半导体/AI 服务器工厂的电力基础设施 ✓ (TSM 亚利桑那工厂可能的电气订单)
- 电网 upgrade (for AI load) ✓ (间接, 通过 Utility backlog)

**替代风险**:
- 标准化 DC 电气产品 (ETN/VRT/Schneider 规模化) — 这部分 POWL 无法竞争
- Hyperscaler 自研 (MSFT 近年推"custom server rack" 是否延伸到电气?)
- AI 提升 EPC 效率 → 项目周期缩短 → 订单 velocity 提升 (对 POWL 略正面)

### B4. AI Impact 综合评分

| 维度 | 评分 | 依据 |
|------|------|------|
| 方向 | **正面** | 确定性 DC 订单 |
| 幅度 | **小-中** | 长期 5-15% 营收增量, 不是 50%+ |
| 时间窗 | **12M 内初现, 24-36M 内峰值** | Q1 FY26 $75M mega 是起点 |
| 持续性 | **中等** | 取决于管理层是否把 DC 作为战略方向 |
| 市场定价 | **过度** | 市场按 30-50% DC 占比定价, 实际 15-25% |

**关键点**: AI 对 POWL 是**期权**, 不是**主干**. 当前 47x PE 把期权当主干定价.

---

## Part C: Workflow Shift Detector — DC 电力工作流重构

### C1. DC 电力采购工作流的演化

**传统工作流 (2018-2023)**:
```
Hyperscaler → DC 设计院 (Jacobs/HDR) → EPC (Turner/Skanska) →
  中压电气分包 (Eaton/Schneider 标准化 or POWL 定制)
```

**AI 时代工作流 (2024+)**:
```
Hyperscaler → 自设计 + 总包 EPC (hyperscaler 自己 +  contractor) →
  中压电气分包 (战略供应商 + 多元化供应商)
```

**Key shift**:
- Hyperscaler 从"被动采购"变"主动设计" → 更倾向标准化产品线
- POWL 作为定制工程商, 需要**标准化 + 快速交付**能力 — 这是 POWL 不具备的

### C2. Workflow 新 owner 在哪?

**候选新 owner**:
- **VRT** (Vertiv): 垂直整合 Power + Cooling + Service, 提供 "turn-key DC infrastructure"
- **ETN**: 标准化中压+低压开关柜 + 全球售后
- **Schneider**: EcoStruxure 数字化平台 + 标准化产品
- **POWL**: 定制工程 niche

**POWL 在新 workflow 中的位置**:
- 不是 **owner** (workflow 主导者)
- 不是 **platform** (跨客户抽象层)
- 是 **component supplier** (在特定区域/特定项目的 component 供应商)

### C3. 对 thesis 的含义

Workflow shift 分析**强化** Gap #1 (范畴错分):
- 市场按"AI workflow 新 owner"定价 (类似 VRT 50x PE)
- 实际 POWL 是"component supplier" (类似 Graham/MLI PE 15-20x)
- PE 错定价幅度 2-3x

---

## Part D: 三个博弈 + AI + Workflow 综合 — 反向 RDCF 校准

### D1. 重新校准的 EPS 路径

| 年度 | Base GM | DC 占比 | 收入 | NI | EPS | PE |
|------|---------|---------|------|-----|-----|-----|
| FY25 (实际) | 29.4% | 2.4% | $1,104M | $181M | $4.97 | 48x |
| FY26 | 28.0% | 15% | $1,236M | $189M | $5.19 | 46x |
| FY27 | 26.5% | 18% | $1,335M | $189M | $5.19 | 46x |
| FY28 | 25.5% | 22% | $1,402M | $190M | $5.22 | 46x |
| FY29 | 26.0% | 25% | $1,430M | $199M | $5.46 | 44x |
| FY30 | 26.5% | 28% | $1,402M | $199M | $5.46 | 44x |

**关键含义**: Base 情景下 POWL FY26-30 EPS 在 $5.00-5.50 **平台期**, 不是 compound growth

### D2. 合理 PE 区间

基于 EPS 平台期 + 周期股+小盘特征:
- 周期 peak: PE 20x (传统周期股)
- 主题溢价 (AI + LNG 双): +5-8x → PE 25-28x
- **合理 PE: 22-28x × EPS $5.00-5.50 = **$110-154**

这与 SOTP $130-180 范围一致, **公允价值中值 $150**.

### D3. 三种路径的 RDCF

**Base (60%)**: $150 (-38%)
**Bull (25%)**: $210 (-13%) — AI Shift 加速, POWL 进入 hyperscaler 战略供应商
**Bear (15%)**: $100 (-58%) — LNG 下行 + DC 被标准化抢占

**概率加权公允价值**: 0.60 × 150 + 0.25 × 210 + 0.15 × 100 = **$157**

---

## Part E: 核心发现汇总

### E1. 博弈分析结论
- POWL 在三场博弈中 (vs EPC / vs 同业 / vs hyperscaler) 都处于**结构弱势**
- 弱势不是"灾难性", 是"定价上限" — POWL 能持续赚钱, 但无法维持 47x PE
- 2027+ 博弈均衡变化 (Eaton 扩产 + hyperscaler 标准化) 会进一步压缩 POWL 位置

### E2. AI Impact 结论
- AI 对 POWL 是**期权**, 不是**主干**
- 短期 12-24M EPS +4-8% 贡献, 但不足以支撑当前 47x PE
- 市场对 AI 暴露定价过度 ~2-3x

### E3. Workflow Shift 结论
- POWL 不是新 workflow owner (VRT/ETN/Schneider 才是)
- POWL 是 component supplier 角色
- 按 workflow owner PE (50x) 给 POWL 定价是范畴错分

### E4. 三者一致性
| 方法 | 公允价值 |
|------|---------|
| SOTP (Phase 0.75) | $130-180 |
| Reverse DCF 校准 (本文) | $110-154 |
| 概率加权 | $157 |
| 内部人基准率 | $135-170 |

**所有方法独立指向**: 公允价值 **$140-170 区间, 中值 $150** (-38% vs 当前 $241)

---

## Part F: 新增 DM 锚点

| DM ID | 数据 | 来源 |
|-------|------|------|
| DM-BATNA-001 | POWL 在 Gulf Coast EPC share of wallet 10-20% | 推断 |
| DM-BATNA-002 | EPC 换供应商认证周期 3-6 个月 | 行业常识 |
| DM-GAME-001 | Eaton Omaha $30M 扩产 2027H1 投产, 直接挑战 POWL 基本盘 | Eaton 2025Q1 公告 |
| DM-WF-001 | Hyperscaler 工作流从"被动采购"变"主动设计" (2024+) | 行业观察 |
| DM-WF-002 | VRT/ETN/Schneider 是 AI DC 电力 workflow 新 owner, POWL 是 component | 分析 |
| DM-EPS-001 | FY26-30 Base 情景 EPS 平台期 $5.00-5.50 | RDCF 重新校准 |
| DM-VAL-001 | 概率加权公允价值 $157 (60% base $150 + 25% bull $210 + 15% bear $100) | 本文 |

---

**一句话总结**: POWL 在三场博弈中结构弱势, AI 是期权非主干, 不是新 workflow owner. 概率加权公允价值 **$157**, 与 SOTP / RDCF / 内部人基准率**四路独立吻合**. 当前 $241 overshoot **53%**, 支持 thesis "混合体被按纯 beta 错定价".
