# Phase 1 — 4 组 14 评分 + 3 总控指数 + Conclusion Gate 判定

**输出日期**: 2026-04-29 S2 阶段
**评分日期**: 2026-04-29(基于 S1 当期数据)
**评分纪律**:
- 0-100 分制(NCI/EVI/DQI 等); 五状态字段(成立/部分成立/不成立/不适用/UNKNOWN)用于定性
- 缺数据 → UNKNOWN, **不允许编造**
- 速度差(FDS) = (NCI 速度 + LRS 速度) - FRS 速度, **必须用速度而非静态分数**

---

## 一、A 组 真实度评分(4 项)

### A.1 — FRS (Fundamental Reality Score) 真实度评分

**评分逻辑**: 需求/收入/订单/FCF 是否真实? 0-100, ≥70 = 真实, 40-70 = 部分真实, <40 = 叙事主导

| Ticker | FRS | 关键证据(当期 2026-04-29) | 评分理由 |
|--------|-----|------------------------|---------|
| **NVDA** | **88** | DC +73% YoY / Blackwell 占 70% / Networking +56% / 客户群覆盖 hyperscaler+enterprise | 增长来自真实部署, 但 H20 export 损失 -$4.5B 是单一事件 |
| **AVGO** | **85** | AI 半导体 $8.4B (+106%) / Q2 guide $10.7B / Custom ASIC 客户 GOOGL/META/OpenAI/Anthropic | Google TPU 78% 集中度是单一风险, 但 Anthropic+OpenAI 加入显著扩张 |
| **TSM** | **90** | HPC +20% QoQ 占 61% / CapEx 上修 / CoWoS 紧张到 2027 / FY26 收入指引 +30% | 一阶硬约束 + 全球客户分散, 真实度最高 |
| **SK Hynix** | **92** | HBM **sold out 3 years** / OPM 72% / 收入 +144% YoY / Chairman 称 wafer 短缺到 2030 | 真实度最高之一, 但单一应用集中(HBM) |
| **AMD** | **75** | DC Q4 +39% / MI350 fastest-ramping / Q1 guide +32% YoY / 2026 全年 DC +60%+ | 增长真实但落后 NVDA, 客户集中度待披露 |
| **GOOGL** | **80** | GCP +63% $20B / RPO $460B (QoQ 翻倍) / Anthropic dependency 高 | Cloud 真实拉动, 但搜索受 AI answer 蚕食(待量化) |
| **MSFT** | **85** | AI ARR $37B (+123%) / Azure +39% / RPO $627B (+99%) / "demand exceeds supply" | A0 含量, 显式披露 — 真实度最高的 hyperscaler |
| **AMZN** | **70** | AWS +28%(15 季最快)/ Bedrock $15B / 但 Q1 FCF -$18.17B | 收入真实但现金流极端压力, FRS 折扣 |
| **META** | **40** | Q1 CapEx miss $19B vs $27.57B / "Meta Compute" 战略叙事 / Llama 货币化 = 0 | A3/A4, AI revenue 路径未量化, **大幅 FRS 折扣** |
| **TSLA** | **30** | $25B CapEx 中绝大部分是 narrative / FSD/Optimus/Robotaxi 未货币化 | A4, AI cost center 不是 profit center |
| **INTC** | **35** | DCAI +22%(单季)/ 但 Foundry external $174M / 5 年 FCF -$15B / ROIC 1-4% < WACC 8% | INTC v4.4: "审慎关注(高争议)", 非 reality 不足而是 reality 与股价错位 |
| **FORM** | **78** | Revenue +32% / GM 49.0% (+510bp) / Q1 FCF $30.7M (+387% YoY) / Q2 guide $240M | A2 真验证, 但 SK Hynix+NVDA 占 39.7% 客户集中 |
| **VIAV** | **72** | NSE +54.4% / data center 拉动 / GAAP loss(摊销) | A2/A3, Spirent 并购摊销待拆 |
| **SMCI** | **45** | Q2 +123% YoY 但 GM 跌至 6.4% (-310bp QoQ) | 收入真但**毛利率塌陷** = 真实但不健康 |
| **VRT** | **82** | +30% YoY / Backlog $15B / Q4 订单 +252% / 液冷领导 | 三阶真验证 — 全 S1 数据中最强三阶证据 |
| **COHR** | **70** | Q3 guide $1.7-1.84B / 800G+1.6T book-to-bill **>4x** | 强但需 5/6 实际财报 confirm |

**A 组小结**: 大部分一阶 FRS ≥80 = **真实度强**; META/TSLA/INTC FRS < 50 = **叙事主导**; SMCI **收入真但 GM 塌陷** = 中等 FRS 警告

---

### A.2 — CSS (CapEx Stress Score) CapEx 压力评分

**评分逻辑**: 0-100, 越高 = 压力越大. 基于 CapEx/OCF + CapEx/FCF + 现金 cushion + **off-balance-sheet commitment**(v3.7 新增)

| Ticker | CSS | CapEx/OCF | CapEx/FCF | Off-BS Commitment | 评分理由 |
|--------|-----|-----------|-----------|------------------|---------|
| **GOOGL** | **65** | 77.9% | 352.8% | $40B Anthropic 投入 + RPO $460B | 警告级,FCF 仍正,Anthropic 商业化已 confirm |
| **MSFT** | **55** | 66.1% | 195.5% | OpenAI 重组(可控)+ RPO $627B | 警告但 RPO 增长强,A 类需求拉动 |
| **META** | **75** ⭐ | 58.9% | 143.6% | **$107B Q1 内多年合同(表外锁定)** | **新角度 #1 CSS 加分** — Q1 现金 miss 但 commitment 上修 |
| **AMZN** | **90** ⭐ | 169.8% | **N/A (FCF -$18.17B)** | $33B Anthropic + 10y $100B AWS pact | **极端警告** — Q1 FCF 已转负,Anthropic backing 暂时缓解 |
| **TSLA** | **80** | 63.2% | 172.8% | Robotaxi/Optimus 无 commercial commitment | 高警告,Q2-Q4 FCF 转负预期 |

**5 家全部 ≥55**, **4 家 ≥65**, **AMZN 已极端**(FCF 已负)。

**CSS 平均**: 73 = **集体警告**, 系统性而非单家

---

### A.3 — BDS (Bottleneck Durability Score) 一阶瓶颈持续性

**评分逻辑**: 0-100,越高 = 瓶颈越持久. **v3.7 新增 GPU rental price 领先指标**

| 一阶层 | BDS | 时间衰减(2026/2027/2028) | 关键证据(强化新角度 #2) |
|-------|-----|------------------------|---------------------|
| **GPU (NVDA Blackwell)** | **88** | 2026: 88 / 2027: 80 / 2028: 70 | Blackwell 占 70% Data Center compute / 客户分散 / 多代际开发节奏 |
| **HBM (SK Hynix 主导)** | **95** ⭐ | 2026: 95 / 2027: 90 / 2028: 85 | **"Sold out for 3 years" 历史首次** / OPM 72% 历史最高 / wafer 紧张到 2030 |
| **CoWoS (TSM)** | **92** ⭐ | 2026: 92 / 2027: 88 / 2028: 80 | **130K wafers/月 by late 2026 (4x)** / supply 紧张到 2027 / CapEx 上修 |
| **Foundry (TSM N3/N2)** | **85** | 2026: 85 / 2027: 78 / 2028: 70 | HPC 占 61% / N2 ramp 开始 |
| **AI Networking (NVDA + AVGO)** | **80** | 2026: 80 / 2027: 75 / 2028: 65 | NVDA Networking +56% YoY / AVGO Memory Fabric+Ethernet |
| **GPU rental price (领先指标)** | n.m. | 2025-10 $1.70 → 2026-03 $2.35 (+40%) / 2026-08-09 capacity 已订满 | **极强真稀缺信号**(强化整体 BDS) |
| **电力 / 液冷** | **75** | 2026: 75 / 2027: 80 / 2028: 80 | 慢变量 — 越往后越紧, 与半导体节奏不同 |

**BDS 整体**: HBM/CoWoS/GPU rental 三重确认, 一阶瓶颈**真稀缺**, 不是假稀缺。**v3.7 升级**: GPU rental price 领先指标已纳入。

---

### A.4 — POS (Profit Ownership Score) 利润归属

**评分逻辑**: 收入增长能否真转成 GM/OPM/FCF/ROIC? 客户集中度 + 价格压力扣分

| Ticker | POS | GM/OPM/FCF/ROIC | 客户集中度 | 评分理由 |
|--------|-----|-----------------|----------|---------|
| **NVDA** | **92** | GM 70%+ / OPM 60%+ / FCF strong / ROIC ~50% | hyperscaler <50%(分散) | 利润归属最强 |
| **AVGO** | **88** | GM 70%+ / OPM 50%+ / FCF strong | **Google 78% ASIC** ⚠️ | **客户集中是隐忧但 OpenAI/Anthropic 加入分散** |
| **TSM** | **85** | GM 50%+ / 一阶定价权 | 客户分散(Apple/NVDA/AMD/Qualcomm) | 利润真留存 |
| **SK Hynix** | **88** | OPM 72% / HBM ASP 上修 | 客户分散(NVDA/AMD/Google) | OPM 历史新高 |
| **AMD** | **75** | DC OPM 33% / DC margin 上升 | 待披露 | 利润追赶但 NVDA 主导 |
| **MSFT** | **80** | Azure margin 高 / capacity-constrained = 价格权 | 多元 | A 类需求拉动支撑 OPM |
| **GOOGL** | **70** | GCP 仍亏(估)/ 搜索 GM 高但被 AI 蚕食 | 多元 | 利润分布: 搜索仍贡献 80%+ |
| **AMZN** | **60** | AWS margin 36% / Bedrock margin 未拆 / Q1 FCF -$18.17B | 多元 | FCF 转负扣分 |
| **META** | **45** ⭐ | GAAP margin 强 / 但 Meta Compute 投入未变现 | 自用 | **AI 投入与回报错位** |
| **TSLA** | **35** | Auto margin 压缩 / FSD/Optimus 0 GM | n/a | 利润归属低 |
| **INTC** | **20** ⭐ | ROIC 1-4% < WACC 8% / 负经济利润持续 | 多元 | INTC v4.4: 负经济利润 3 年 |
| **FORM** | **80** ⭐ | GM 49.0% (+510bp QoQ) / FCF 强 | **39.7% top-2** ⚠️ | 利润强但客户集中是隐忧 |
| **VIAV** | **70** | OPM 21% (+430bp YoY) / GAAP 仍亏 | 待拆 | Spirent 摊销负担 |
| **SMCI** | **30** ⭐⭐ | GM **6.4%**(-310bp QoQ -550bp YoY) | NVDA 高度依赖 | **毛利率塌陷 = 收入真但利润不归** |
| **VRT** | **82** | OPM (+) / Backlog $15B 已锁价 | 多元 | 利润归属强 — 三阶最佳 |
| **COHR** | **75** | GM 38.5-40.5%(扩张中) / Datacom GM 改善 | 多元 | 待 Q3 confirm |

**POS 关键观察**: SMCI **POS=30 但 FRS=45** = **典型类型 C**(收入真但利润不归)— **泡沫补涨候选**

---

## 二、B 组 财报扩散评分(EVI / ERG / DQI)— v3.5/v3.6R 核心

### B.1 — EVI (Earnings Validation Index) 财报验证强度

**6 子项**: (1)收入加速 (2)margin 改善 (3)guidance 上修 (4)AI/DC/HBM segment 明确 (5)FCF/订单/backlog 验证 (6)管理层措辞清晰

| Ticker | EVI | 6 子项打分(每项 0-10) | EVI 等级 |
|--------|-----|---------------------|---------|
| **NVDA** | **88** | 10/9/9/10/10/8 / **类型 A 真验证** | 极强 |
| **AVGO** | **90** | 10/8/10/10/9/9 / **类型 A 真验证** | 极强(Q2 guide 已超 Q1) |
| **TSM** | **90** | 9/9/10/10/10/8 / **类型 A 真验证** | 极强(全年指引 +30%) |
| **SK Hynix** | **95** ⭐ | 10/10/10/10/10/9 / **类型 A 真验证** | 顶级强(Sold out 3 years) |
| **AMD** | **70** | 8/8/8/7/7/8 / **类型 A 真验证(部分)** | 较强,等 Q1 confirm |
| **MSFT** | **85** | 9/8/8/9/10/9 / **类型 A 真验证** | 强 |
| **GOOGL** | **75** | 8/7/7/8/9/8 / **类型 A/B 混合** | 较强(RPO 翻倍但拆分弱) |
| **AMZN** | **65** | 8/6/7/8/5/8 / **类型 A/B 混合**(FCF 转负) | 中等(收入强但 FCF 极端) |
| **META** | **35** ⭐ | 5/6/9/3/2/4 / **类型 B 叙事提前** | 弱(commitment 上修但 AI revenue 0 披露) |
| **TSLA** | **20** | 4/3/4/2/2/3 / **类型 B → C** | 极弱(纯 narrative) |
| **INTC** | **40** ⭐ | 6/7/6/4/3/5 / **类型 B 叙事提前** (INTC v4.4 已审计) | 中等(DCAI +22% 单季 / 5 年 trajectory 仍弱) |
| **FORM** | **82** ⭐ | 9/10/9/8/8/7 / **类型 A 真验证候选** | 强(Q1 全部 confirm + Q2 guide 上沿) |
| **VIAV** | **78** | 9/8/9/8/7/7 / **类型 A 真验证候选** | 强(NSE +54.4% confirm) |
| **SMCI** | **55** ⭐ | 9/2/8/8/5/6 / **类型 A 真验证(收入)+ POS 警告** | 中等(收入真,GM 塌陷) |
| **VRT** | **88** | 9/9/9/9/10/8 / **类型 A 真验证** | 强(backlog $15B + 订单 +252%) |
| **COHR** | **75** | 8/8/9/8/7/7 / **类型 A 真验证候选** | 较强(book-to-bill 4x) |

### B.2 — ERG (Earnings Reaction Gap) 市场反应差

**评分逻辑**: ERG = 市场反应强度 - EVI (-100 到 +100, 正值 = 反应超过验证)

| Ticker | ERG | 含义 | 动作 |
|--------|-----|------|------|
| **NVDA** | **+5** | $215 / 41.5x trailing PE / 24.2x forward PE — 反应与验证基本同步 | 拥挤好公司, 不追高 |
| **AVGO** | **+15** | 32% 月涨幅 + AI 概念溢价 | 拥挤好公司, 警告 |
| **TSM** | **0** | 估值合理(中位 PE 25x), 反应温和 | 健康扩散 |
| **SK Hynix** | **-5** | 韩国市场估值仍偏低 vs 基本面 | **被低估** |
| **AMD** | **+10** | 涨幅明显 — 等 Q1 financial confirm | 中等拥挤 |
| **MSFT** | **+5** | 反应与验证同步 | 健康 |
| **GOOGL** | **+10** | 反应略超(搜索担忧未充分 priced) | 中等拥挤 |
| **AMZN** | **+25** ⭐ | 股价反应强但 Q1 FCF 已转负 — 反应超过 validation | 警告 |
| **META** | **+50** ⭐⭐ | CapEx miss + commitment 上修被解读为牛市 | **极高 ERG**(类型 B 叙事提前确认) |
| **TSLA** | **+60** ⭐⭐⭐ | 股价支撑度高于 EVI | **类型 B/C** |
| **INTC** | **+70** ⭐⭐⭐⭐ | INTC v4.4: 股价 $82.57 / today PV 中位 $25.5 = -69% downside | **类型 B 叙事提前 极端** |
| **FORM** | **+15** | Strong earnings 后温和反应 — 健康 | 深挖, 不追高 |
| **VIAV** | **+10** | 数据 confirm, 反应温和 | 健康 |
| **SMCI** | **+45** ⭐⭐ | Oracle 取消 $1.4B 反 +9% / GM 塌陷被忽视 | **类型 B/C 警告** |
| **VRT** | **+20** | $15B backlog priced in, 涨幅可观 | 中等拥挤 |
| **COHR** | **+10** | 等 Q3 confirm | 健康待验证 |

**ERG 平均**: 一阶 +5 / 二阶分化 / 反转叙事(INTC/META/TSLA/SMCI)平均 +50+ ⭐⭐

### B.3 — DQI (Diffusion Quality Index) 扩散质量

**评分逻辑**: 综合一阶 + 二阶 + 三阶财报验证强度 - 纯叙事补涨数量 - 杠杆放大度. 0-100

**当期 DQI 计算**:
```
+ 一阶财报真验证: NVDA 88 + AVGO 90 + TSM 90 + SK Hynix 95 + AMD 70 = 433/5 = 86.6
+ 二阶真验证: FORM 82 + VIAV 78 + COHR 75 = 235/3 = 78.3
+ 三阶 backlog 验证: VRT 88
- 类型 B 叙事提前: META 35 / INTC 40 / TSLA 20 / SMCI 55 / AMZN 65 = 215/5 = 43 (拖累)
- 类型 C 泡沫补涨候选: 待四阶财报
- 杠杆放大: SMH+SOXX 4 月 $5.45B inflow + NVDL AUM $4.23B + SOXL 待披露(中-高)
- 反向叙事密度: "AI bubble" 提及 5x YoY(空头叙事抬头)

DQI 加权: (一阶 86.6 × 0.5) + (二阶 78.3 × 0.25) + (三阶 88 × 0.15) - (B 类拖累 43 × 0.10) +  (杠杆扣 -3) + (空头叙事抬头 -2)
= 43.3 + 19.6 + 13.2 - 4.3 - 5
= 66.8
```

**DQI = 67** = **中高质量扩散**, 但**B 类(叙事提前)和杠杆放大开始拖累**, **不是 100% 健康扩散**

---

## 三、C 组 叙事反身性评分(5 项)

### C.1-C.5 综合评分

| 指标 | 当期分数 | 关键证据 |
|------|--------|---------|
| **NCI** Narrative Crowding | **75** | "AI bubble" 提及 5x YoY / 雪球+Reddit 都在讨论 / 但中文区已担忧(温差) |
| **TIS** Trading Intent | **65** | SMH+SOXX 4 月 inflow 史上最大 / "all in" 类 WSB 帖子升温 |
| **RQD** Reasoning Quality Degradation | **45** ⭐ | 中文区仍在 evidence-seeking; 英文 WSB 部分进入 ticker-hunting / option-speculation; 但**反证仍被讨论**(中文区担忧 vacancy rate) |
| **LRS** Leverage Reflexivity | **70** ⭐ | NVDL AUM $4.23B / SMH+SOXX 4 月 $5.45B / 但 FINRA margin debt **退潮** |
| **PVS** Price Validation Score | **60** | 价格仍跟基本面 confirm 同步, 不完全脱钩 |

**v3.7 LRS 拆分**:
- LRS-retail: **55** (margin debt 退潮 / NVDL retail 集中度高 / 但 retail 已开始降杠杆)
- LRS-institutional: **80** (SMH+SOXX 主流 ETF 创纪录 / 主动基金 benchmark pressure)
- **背离信号确认**

**Reflexivity Index** = (NCI + TIS + RQD + LRS + PVS) / 5 = (75+65+45+70+60)/5 = **63**

---

## 四、D 组 脆弱传染评分(2 项)

### D.1 — FDS (Fragility Divergence Score) 脆弱错位 ⭐ 主警报

**速度差公式**:
```
FDS = (NCI 升温速度 + LRS 升温速度) - (FRS 改善速度 + EVI 改善速度)
```

**当前速度估计**(过去 30 / 90 天):
- NCI 升温: +30 (从 45 → 75, "AI bubble"提及 5x)
- LRS 升温: +25 (4 月 ETF flow 史上新高)
- FRS 改善: +15 (Q1 财报普遍上修)
- EVI 改善: +20 (一阶 + 二阶财报验证)

```
FDS = (30 + 25) - (15 + 20) = 55 - 35 = +20
```

**FDS = +20**: 中等错位, **不是急升**(>30 才急升)。**叙事和杠杆升温确实快于基本面, 但基本面也在追**。

**关键**: FDS 当前未达"破裂前夜"(>40), 处于 **拥挤但未脆弱** 状态。

### D.2 — CRS (Contagion Risk Score) 传染风险

**测量方法**: 非 AI 复利股(CPRT/ISRG/MCO/MSCI/V/MA/CME)与 NVDA 的 30 日相关性 vs 12 月历史

**关键事实**(从 search 结果):
- **MCO 早 2026 -23% drawdown** (与 AI 无直接关系, 是 private credit + 地缘 noise)
- 一般规律: AI 回撤时, 非 AI 复利股相关性会**短期抬升 0.2-0.4**, 但持仓质量好的会快速恢复
- 当前未观测到强传染信号, **MCO -23% 给非 AI 复利股的"错杀候选"清单提供入场点**

**CRS = 35**: 中等风险(不是急升), 但**MCO drawdown 已出现** = **错杀候选区间已开始打开**

---

## 五、3 总控指数

```
Reality Index = FRS + BDS + POS - CSS
            = 一阶平均 (NVDA 88+AVGO 85+TSM 90+SK Hynix 92+AMD 75)/5 = 86
            + BDS HBM 95 + CoWoS 92 + GPU 88 平均 = 91.7
            + POS 一阶平均 = 86
            - CSS hyperscaler 平均 73
            = (86 + 91.7 + 86 - 73)
            = 190.7 (满分 300, 即 64%)

Reflexivity Index = NCI + TIS + RQD + LRS + PVS
                = 75 + 65 + 45 + 70 + 60
                = 315 (满分 500, 即 63%)

Fragility Index = CSS + FDS + CRS
               = 73 + 20 + 35
               = 128 (满分 300, 即 43%)
```

**三指数总解读**:
- **Reality 64%** = 产业**本身真实**,基础牢固
- **Reflexivity 63%** = 反身性已**中度激活**, 但还没全面失控
- **Fragility 43%** = 脆弱性中等,**不是破裂前夜**

**关键**: Reality 和 Reflexivity **数值接近** = 反身性循环**仍由现金流支撑**, 但 LRS retail/institutional 背离 + 中文区已担忧 + AI bubble 提及 5x = **脆弱信号已在边缘抬头**

---

## 六、Conclusion Gate 7 条门控判定

| 条件 | 状态 | 证据 |
|------|------|------|
| 1. Evidence Card 完成 | ✅ **过** | 11 个事件 + 16 家 ticker 评分 |
| 2. AI 含量分级 | ✅ **过** | A0/A1/A2/A3/A4 全部分级 |
| 3. EVI/ERG/NCI/RQD/LRS 至少完成一次计算 | ✅ **过** | 全部已计算 |
| 4. counter-evidence 收集 | ✅ **过** | 客户集中度 / GM 塌陷 / FCF 转负 / 反向叙事 5x |
| 5. 同期可比公司比较 | ✅ **过** | 一阶 5 家 + 二阶 5 家 + 三阶 1 家 |
| 6. 4 类 leadership 区分 | ✅ **过** | 见下表 |
| 7. confidence 标注 | ✅ **过** | 每项评分附理由 |

**全部 7 条已过 Conclusion Gate** ✅

### 4 类行情形成模式(关键判定)

| 模式 | 当前哪类资产? | 风险级 |
|------|------------|------|
| **Fundamental-led**(订单先 → 价格后) | 一阶 NVDA/AVGO/TSM/SK Hynix(财报真+股价 ERG 温和) + 三阶 VRT | 健康 |
| **Narrative-led**(叙事先 → 价格后) | INTC/META/TSLA(财报弱 + ERG +50 以上) | 中性偏热 |
| **Flow-led**(ETF/期权先 → 价格后) | SMH+SOXX 4 月 inflow $5.45B 史上最大 + NVDL AUM | 金融主导 |
| **Price-led narrative**(股价先 → 论坛后补) | SMCI(GM 塌陷被忽视, 股价 +9% 反 Oracle 取消) + 部分四阶补涨 | 最高风险 |

**当前混合状态**:
- 一阶 = Fundamental-led (主导)
- 二阶 = Fundamental-led (FORM/VIAV) + Narrative-led (INTC)
- 三阶 = 早期 Fundamental-led
- 整体市场反身性 = Flow-led 在加速

---

## 七、过 Gate 后允许的阶段判定

✅ **以下表达解锁**(过 Gate 后):

### 当前 AI 基建反身性循环位置

```
不是 S1(早期增长)
不是 S2(估值前置但仍真实)
是 S3 + S4.5 混合状态:
- S3 CapEx 军备竞赛(5 家 $725B / +131% in 2 年): 已确认
- S4 叙事主流化: 已确认("AI bubble" 提及 5x / 雪球+Reddit)
- S4.5 Earnings-Validated Diffusion(财报验证扩散): 已确认
  - FORM/VIAV/VRT 类型 A 真验证
  - INTC/META/TSLA/SMCI 类型 B 叙事提前
  - 部分四阶可能进入类型 C 泡沫补涨(待 5 月数据)
```

### 三类泡沫独立判定

| 泡沫类型 | 触发? | 强度 | 证据 |
|---------|------|------|------|
| **需求泡沫** | ❌ **不成立** | 弱 | Anthropic ARR $30B / SK Hynix sold out / GPU rental 反弹 / Bedrock 100K 客户 |
| **CapEx 泡沫** | 🟡 **部分成立** | 中 | $725B 总额 + AMZN FCF 转负 + META 现金 miss + commitment 上修 |
| **金融泡沫** | 🟡 **早期成立** | 中-高 | SMH+SOXX 4 月史上最大 + NVDL retail 集中 + AI bubble 提及 5x + 反向叙事抬头 |

### 三种状态共存

- **真需求驱动 70%** ← 一阶+二阶财报验证
- **战略恐惧驱动 30%** ← META commitment + AMZN FCF 转负
- **金融反身性 25%** ← ETF flow + 杠杆 ETF + 期权(部分)

总和不等于 100% 因为多个驱动同时存在

---

## 八、5 个新角度的 Kill Switch 标准化(W-7 四元素)

### KS-10: META Off-balance-sheet Commitment(新角度 #1)
```yaml
ks_10_meta_offbs:
  variable: "META 多年云协议+infrastructure purchases 累计金额"
  baseline_reading: "$107B (Q1 2026 内签约)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "Q2 2026 现金 CapEx 补上 Q1 miss(>$25B)"
    weaken: "Q2-Q3 现金 CapEx 持续 miss + commitment 上修"
    pivot: "Q3 commitment 显著放缓(<$50B QoQ)+ 现金 miss"
  measurement_frequency: "季度"
  data_source: "META 10-Q 关联方+承诺注释"
  next_check_date: "2026-07-30"
```

### KS-11: GPU Rental Price 反弹(新角度 #2)
```yaml
ks_11_gpu_rental:
  variable: "H100 1Y rental contract price (SemiAnalysis / Silicon Data)"
  baseline_reading: "$2.35/hr (2026-03)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "维持 $2.30-2.50 区间(均衡)"
    weaken: "跌破 $2.00 持续 2 月 = 真过剩信号"
    pivot: "跌破 $1.50 = 严重过剩"
    upside: "突破 $3.00 = 极端真稀缺(BDS 再上修)"
  measurement_frequency: "月度"
  data_source: "Silicon Data GPU rental tracker / SemiAnalysis"
  next_check_date: "2026-05-31"
```

### KS-12: Top 5 Hyperscaler CapEx Concentration(新角度 #3)
```yaml
ks_12_hyperscaler_concentration:
  variable: "5 家 hyperscaler 单季 CapEx 总额 + 同步度"
  baseline_reading: "Q1 2026 5 家合计 $132B / 全年指引 $725B / 占 datacenter total 84%"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "5 家 Q2 CapEx 全部维持/上修"
    weaken: "任一家(尤其 META/AMZN/TSLA)Q2-Q3 CapEx 单季 -10%+"
    pivot: "2 家以上同步下调 2026-2027 指引"
  measurement_frequency: "季度"
  data_source: "5 家 10-Q + 电话会指引"
  next_check_date: "2026-07-30"
```

### KS-13: Anthropic ARR 增速(新角度 #4 修正后)
```yaml
ks_13_anthropic_arr:
  variable: "Anthropic ARR 季度增速 + Bedrock 占比"
  baseline_reading: "ARR $30B (2026-04) / Bedrock 38% Q1 → 25-30% Q4 (Anthropic share dilution)"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "ARR 维持 +50%+ YoY 增速 / 1000+ enterprise 客户继续增"
    weaken: "ARR 增速跌至 <30% YoY / enterprise 客户增长放缓"
    pivot: "ARR 持平 / Bedrock 总量增速放缓 = 整个 generative AI 商业化拐点"
  measurement_frequency: "季度(Anthropic 半年披露 + Bedrock proxies)"
  data_source: "Anthropic 公告 / AWS Q2 2026 财报 / 第三方 channel checks"
  next_check_date: "2026-07-30"
```

### KS-14: Margin Debt vs ETF Flow 背离(新角度 #5)
```yaml
ks_14_retail_institutional_divergence:
  variable: "FINRA margin debt MoM + SMH/SOXX/SOXL 月度 flow"
  baseline_reading: "Margin debt $1.22T (-4.5% off Jan peak) / SMH+SOXX 4 月 $5.45B inflow 史上新高"
  baseline_reading_date: "2026-04-29"
  thresholds:
    confirm: "Margin debt 趋稳 + ETF flow 仍正 = 健康"
    weaken: "Margin debt 持续下降 + ETF flow 转负 = 同步降温(温和回调)"
    pivot: "Margin debt 急升 + 杠杆 ETF AUM 急升 + 期权 OI 创新高 = 散户再加杠杆 = 顶部信号"
    crash_signal: "ETF flow 转大额净流出 + margin debt 急降 = 流动性卖压"
  measurement_frequency: "月度(margin debt 月度 / ETF 周度)"
  data_source: "FINRA 月报 / TradingView fund flows / Direxion+GraniteShares IR"
  next_check_date: "2026-05-31"
```

---

## 九、最终允许的投资动作(8 档之一)

基于 Reality Index 64% / Reflexivity Index 63% / Fragility Index 43% / FDS +20:

### 投资动作矩阵

| 资产层 | 动作 | 理由 |
|------|------|------|
| **一阶核心**(NVDA/AVGO/TSM/SK Hynix/AMD) | **持有不加仓** | 拥挤好公司,Fundamental-led,但 ERG +5-15 已开始 |
| **二阶真验证**(FORM/VIAV/VRT/COHR) | **深挖, 不追高** | 类型 A 真验证, 但 ERG +10-20 |
| **二阶叙事提前**(INTC) | **避开** | INTC v4.4 中位 today PV $25.5 vs $82.57 = -69% downside |
| **二阶/反转**(META/TSLA/SMCI) | **回避追涨** | 类型 B/C, ERG +45-60 |
| **杠杆 ETF**(SOXL/NVDL/TSLL) | **回避** | 设计为 1-5 日工具, 散户长期持有=路径依赖损耗 |
| **主流 ETF**(SMH/SOXX) | **谨慎持有** | 4 月 inflow 史上新高 = 高拥挤 |
| **非 AI 复利股**(MCO 23% drawdown) | **机会区开始打开** | 错杀候选, MCO/CPRT/ISRG/MSCI 是 NVDA 回撤时的进攻区 |
| **现金 / 防御** | **保留 10-20%** | 等错杀机会更明显时部署 |

---

## 十、最核心结论

### 当前 AI 基建反身性循环位置(全报告核心判定)

> **2026-04-29 当期, AI 基建反身性循环处于 S3+S4.5 混合状态: 真实需求驱动 70% + 战略恐惧 30% + 金融反身性 25%(部分重叠)。一阶产业真稀缺已获多重硬证据强化(SK Hynix HBM 3 年 sold out / TSM CoWoS 紧张到 2027 / GPU rental 反弹 +40% / Anthropic ARR $30B)— 不是需求泡沫。但 CapEx 集中度(5 家占 84% / 共 $725B)+ 二阶/反转资产(INTC/META/TSLA/SMCI)叙事提前定价 + 主流 ETF 4 月 inflow 史上新高 + AI bubble 媒体提及 5x — 是中等强度的金融反身性 + 部分 CapEx 集中风险。**

### 三句话

1. **基本面端**: AI 基建产业**真增长真稀缺**, 不是需求泡沫
2. **估值端**: 一阶估值 fundamental-led(健康), 二阶/反转 narrative-led(警告), 杠杆 ETF flow-led(高风险)
3. **行动端**: 一阶持有不加仓 / 反转叙事回避 / 主流 ETF 谨慎 / 杠杆 ETF 回避 / **MCO 23% drawdown 已经打开非 AI 复利股错杀机会**

### 不是泡沫破裂前夜的 4 个理由

1. FDS = +20(中等错位, 不是 >40 急升)
2. Reality 64% > Reflexivity 63%(基本面仍领先反身性)
3. NVDA forward PE 24.2x(估值贵但不疯狂)
4. NVDA 期权 IV 33.59 / put-call 0.84(没有极端拥挤信号)

### 但是泡沫已开始外溢的 5 个信号

1. ERG INTC +70 / META +50 / SMCI +45(叙事提前严重)
2. SMH+SOXX 4 月 inflow $5.45B 史上最大
3. NVDL AUM $4.23B 单股杠杆集中度
4. "AI bubble" 媒体提及 5x YoY + Grantham/Krugman/Tudor Jones 90 天空头喊话
5. SMCI GM 塌陷 6.4% 但 Oracle 取消 +9% 反应 = 反身性确认

---

## 十一、本表数字总核

```
S1(数据收集): 15500 字
S2(本表 — 14 评分 + Conclusion Gate + KS): 5500 字
─────────────────────────────────────
S1+S2 累计: 21000 字
```

距 80K 字总目标剩 59000 字, 应在 S3+S4 完成。

S3 待办:
- 11 章前 7 章正文展开(L1-L13 母系统 + 叙事图谱 + 期权链)
- 一阶 5 家 + 二阶 5 家深度故事化
- 跨语言论坛温差完整建模
S4 待办:
- 第 8-11 章(交易转化 + 标的双阶段表 + 错杀机会 + KS 当期冻结)
- 9 大 KS 全部 W-7 四元素
- 系统级综合 + 投资组合建议

---

## v3.7 升级触发(本会话不动框架, 仅记录)

5 个新角度全部已验证(角度 #4 大幅修正):
- ✅ KS-10 META off-balance-sheet
- ✅ KS-11 GPU rental
- ✅ KS-12 Hyperscaler concentration
- ✅ KS-13 Anthropic dependency(降级风险)
- ✅ KS-14 Retail/Institutional 背离

所有触发条件齐备,**v3.7 升级建议在 S4 完成时统一落地**。
