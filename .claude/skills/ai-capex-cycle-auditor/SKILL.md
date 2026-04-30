---
name: ai-capex-cycle-auditor
description: AI 基建反身性泡沫研究引擎 v3.6R 完整母框架 — 不是预设泡沫已发生, 也不是预设 FORM/INTC/VIAV 已证明二阶扩散, 而是建立 AI 原生研究引擎: 当市场出现财报异常上涨/论坛升温/ETF 期权杠杆放大时, 拆解其背后到底是基本面验证、AI 业绩含量提升、叙事提前外推、泡沫补涨, 还是价格反身性。研究对象 = 异常财报反应 × 疑似 AI 叙事 × 财报事实 × AI 含量 × 利润归属 × 论坛传播 × ETF/期权/杠杆 × 价格反馈。包含 18 层资本循环 + 4 组 14 评分 + 3 总控指数 + 5 档 AI 含量闸门(A0-A4) + Conclusion Gate + 9 阶段叙事生命周期 + 反身性图谱 + 9 大 Kill Switch + 4 档警报。
trigger: /ai-capex-audit
---

# AI 基建反身性泡沫研究引擎 v3.6R 完整母框架

## 核心定位

> **本研报不是预设 AI 基建已经泡沫化, 也不是预设 FORM/INTC/VIAV 已经证明二阶扩散。它要建立一套 AI 原生研究引擎: 当市场出现财报异常上涨、论坛叙事升温、ETF/期权/杠杆放大时, 系统拆解其背后到底是基本面验证、AI 业绩含量提升、叙事提前外推、泡沫补涨, 还是价格反身性。**

**研究对象**(不是单家公司):
```
异常财报反应 × 疑似 AI 叙事 × 财报事实 × AI 含量 × 利润归属
× 论坛传播 × ETF/期权/杠杆 × 价格反馈
```

**最重要的纪律**:
> **财报后大涨不是结论, 只是研究入口。AI 叙事不是证据, 只是待验证假设。只有当 AI 含量、利润含量、财报验证、市场反应差、叙事质量、ETF/期权/杠杆都被拆清楚后, 才能判断它是基本面扩散、叙事外推、泡沫补涨, 还是混合型扩散。**

**v3.5 → v3.6R 的过度纠偏修正**:
- v3.5 错误: 把系统收缩到"Evidence Card + AI 含量 + EVI/ERG/DQI", 丢失了真实需求 / Hyperscaler CapEx / 一阶瓶颈 / 利润归属 / 叙事传播 / 论坛 / ETF / 期权 / 杠杆 / 反身性 / 错杀 等核心层
- v3.6R 修正: 把 EVI/ERG/DQI 收回到"4 组 14 评分"中的 B 组(财报扩散), 与 A 组(真实度)+ C 组(叙事反身性)+ D 组(脆弱传染) **并列存在**, 完整母框架全部恢复

---

## 一、18 层资本循环母系统(完整恢复, 任何研究都不能跳层)

```
1.  真实 AI 需求层 (token / agent / inference 真消耗)
2.  Agent / 推理 / 企业工作流需求层 (是否真进入 production)
3.  Hyperscaler CapEx 层 (GOOGL/MSFT/META/AMZN/TSLA/ORCL/CoreWeave)
4.  买方现金流承压层 (CapEx/OCF/FCF/cash cushion)
5.  一阶核心瓶颈层 (GPU/HBM/ASIC/Foundry/CoWoS/Networking)
6.  二阶 / 三阶 / 四阶扩散层 (测试/光通信/CPU/电力/液冷/边缘补涨)
7.  ⭐ 异常财报反应层 (FORM/INTC/VIAV 类事件入口, 不是结论)
8.  ⭐ AI 业绩含量拆解层 (A0-A4 五档, 第一道闸门)
9.  财报验证层 (EVI: 收入+margin+guidance+segment+FCF+订单 6 子项)
10. 利润归属层 (POS: GM/OPM/FCF/ROIC/客户集中/价格压力)
11. 叙事生成层 (技术事实如何被翻译成投资口号)
12. 叙事传播层 (跨 6 类节点 / 5 语言区 / 9 阶段生命周期)
13. ETF / 主题篮子层 (SMH/SOXX/AIQ/BOTZ + 抽象化层级)
14. 期权 / 杠杆层 (call OI/IV/gamma/0DTE/SOXL/NVDL/margin)
15. 价格反身性层 (上涨被当成逻辑证明, PVS)
16. 脆弱错位层 (FDS 速度差: 叙事 + 杠杆升温速度 - 基本面改善速度)
17. 去杠杆 / 错杀 / 再进入层 (CRS 传染 + 非 AI 复利股错杀机会)
18. 投资动作层 (8 档 + Conclusion Gate 后才输出)
```

---

## 二、研究对象: 四元组事件(不是公司)

```yaml
event_record:
  event_id: ""
  date: ""
  event_type: "earnings_pop / narrative_surge / etf_inflow_spike / option_crowding / kol_amplification / cross_language_diffusion"

  # 四元组核心
  narrative: ""         # 例: "HBM supercycle"
  ticker_or_asset: ""   # 例: "FORM" / "SOXL"
  vehicle: ""           # stock / ETF / leveraged_ETF / option / margin
  crowd: ""             # retail / institution / KOL / engineer / option_trader

  platform: ""          # Reddit / X / Stocktwits / 雪球 / 老虎 / 富途 / 抖音
  intent_class: ""      # 12 类交易语言之一(见下)
  evidence_type: ""     # earnings / guidance / order / segment / press / forum
  evidence_grade: ""    # A0-A4 (AI 含量证据等级)

  # AI 含量(第一道闸门, 必填)
  AI_content_evidence_type: ""  # A0/A1/A2/A3/A4
  AI_revenue_content: ""        # 待估 / 数值 / proxy-based
  AI_growth_content: ""
  AI_profit_content: ""

  # 内容
  claim: ""
  counter_evidence: ""
  edge_type: ""        # fundamental / narrative / flow / price-led

  # 价格 / 资金后效
  pre_price_move: ""
  post_1d_price_move: ""
  post_5d_price_move: ""
  post_20d_price_move: ""
  flow_move_after: ""
  options_change: ""
  narrative_velocity: ""

  # 状态
  confidence: ""
  sample_bias: ""
  status: "unverified"  # unverified / partially verified / verified / contradicted
```

**初始状态强制 = `unverified`**。FORM / INTC / VIAV / LITE / VRT 等触发事件不是结论, 只是待验证入口。

---

## 三、AI 业绩含量 — 第一道闸门(A0-A4 五档)

> **核心**: 不能因为公司提到 data center / AI / HBM / networking 就直接当 AI 受益股。先过 AI 含量闸门。

| 档位 | 名称 | 定义 | 使用方式 |
|----|------|------|---------|
| **A0** | 明确披露 AI revenue | 公司直接披露 AI revenue 或 AI semiconductor revenue | 可直接计入 |
| **A1** | Segment proxy | 数据中心/AI networking/AI optical 等高度相关分部 | 需拆 segment |
| **A2** | Product proxy | 产品明确服务 AI 链条, 但收入未单列 | 靠产品/客户/指引验证 |
| **A3** | End-market proxy | 公司说受 data center / hyperscale / technology demand 拉动 | 防止混入非 AI |
| **A4** | Narrative proxy | 主要来自市场叙事, 财报未清晰验证 | 只能作为叙事样本 |

**三组 AI 含量**(每家必估):
- **AI revenue content**: 收入中 AI 相关占比
- **AI growth content**: 增量增长中 AI 相关占比
- **AI profit content**: 利润 / FCF 改善中 AI 相关占比

未披露 → 必须写: `待估 / proxy-based / low confidence`,**禁止编造数字**。

---

## 四、四阶扩散层(完整定义, 每层独立验证)

| 层级 | 定义 | 典型方向 | 关键验证 |
|------|------|---------|---------|
| **一阶核心** | 直接决定算力供给 | GPU / HBM / ASIC / Foundry / CoWoS / AI networking | 订单 / 产能 / ASP / 毛利 |
| **二阶验证** | AI 系统复杂度直接拉动 | 测试 / 测量 / 探针卡 / 光通信验证 / CPU orchestration / EDA-IP | segment / 产品 / 客户 / guidance |
| **三阶配套** | AI 数据中心建设拉动 | 电力 / 液冷 / 连接器 / 机电工程 / 服务器集成 / 光纤 | backlog / book-to-bill / margin |
| **四阶外围** | AI-adjacent 或补涨扩散 | 弱相关工业 / 通信 / 材料 / 能源 / 低位概念股 | **必须证明不是叙事包装** |

**层级规则**:
- 二阶资产必须靠 Evidence Card + EVI 升级, **不能靠故事升级**
- 三阶资产必须靠 backlog / 订单 / margin / 现金流验证
- 四阶资产**默认是叙事样本**, 除非证明 AI 含量和利润含量

### 候选研究池(初始, 不是结论池)

| 类别 | 候选公司 | 初始 AI 含量证据类型 | 需要验证 |
|------|---------|------------------|---------|
| 测试 / 探针卡 | FORM / TER / Advantest / COHU | A2 | HBM / advanced logic / probe-test 订单占比 |
| 网络 / 光通信测试 | VIAV / KEYS | A2/A3 | data center 与 AI fabric 测试收入占比 |
| 光通信 / Photonics | LITE / COHR / CRDO / AAOI / CIEN / Fabrinet | A1/A2 | 800G/1.6T / OCS / CPO / AI optics 收入与毛利 |
| CPU / orchestration | INTC / AMD / ARM | A1/A2 | AI workload 对 CPU/IP/DCAI 的真实拉动 |
| EDA / design verification | SNPS / CDNS | A2/A3 | AI chip design / verification / IP 增量 |
| Advanced packaging / substrate | AMKR / ASE / BESI / CAMT / ONTO / NVMI | A2/A3 | AI/HBM/advanced packaging 订单占比 |
| 电力 / 热管理 | VRT / ETN / TT / MOD / POWL | A3 | AI data center backlog / 液冷 / 电力订单 |
| 工程建设 / 机电 | PWR / FIX / EME / STRL | A3/A4 | data center 项目占比 / margin / 客户集中 |
| 服务器 / rack 集成 | SMCI / DELL / HPE | A1/A3 | AI server revenue / 毛利率 / 现金转换 |
| 能源 / 电网外围 | GEV / CEG / VST / NRG | A3/A4 | 是否真由 AI load growth 驱动, 而非电价 / 能源周期 |

---

## 五、4 组 14 评分(完整恢复)

### A 组: Reality / Fundamental 真实度 (4 项)

| 指标 | 名称 | 目的 |
|------|------|------|
| **FRS** | Fundamental Reality Score | 需求/收入/订单/FCF 是否真实 |
| **CSS** | CapEx Stress Score | 买方现金流是否被 AI CapEx 挤压 |
| **BDS** | Bottleneck Durability Score | 瓶颈是否持久 / 难替代 / 难扩产 |
| **POS** | Profit Ownership Score | 收入增长是否能留成利润和 FCF |

### B 组: Earnings Diffusion 财报扩散 (3 项, v3.5 新增, v3.6R 收回到此组)

| 指标 | 名称 | 目的 |
|------|------|------|
| **EVI** | Earnings Validation Index | 财报是否真实验证 AI 扩散(6 子项: 收入+margin+guidance+segment+FCF+订单) |
| **ERG** | Earnings Reaction Gap | 市场反应是否超过财报验证强度 |
| **DQI** | Diffusion Quality Index | 扩散是高质量还是泡沫外溢 |

### C 组: Narrative / Reflexivity 叙事反身性 (5 项)

| 指标 | 名称 | 目的 |
|------|------|------|
| **NCI** | Narrative Crowding Index | 叙事是否拥挤 / 口号化 / 信仰化 |
| **TIS** | Trading Intent Score | 讨论是否转化为买入 / 追涨 / 补票 |
| **RQD** | Reasoning Quality Degradation | 市场语言是否从分析退化为口号 |
| **LRS** | Leverage Reflexivity Score | ETF / 期权 / margin 是否放大价格 |
| **PVS** | Price Validation Score | 股价上涨是否被当成逻辑证明 |

### D 组: Fragility / Contagion 脆弱与传染 (2 项)

| 指标 | 名称 | 目的 |
|------|------|------|
| **FDS** ⭐ | Fragility Divergence Score | 基本面 / 叙事 / 价格 / 杠杆是否错位(主警报) |
| **CRS** | Contagion Risk Score | AI 回撤是否会拖累非 AI 资产 |

---

## 六、3 个总控指数(避免分数太散)

### 1. Reality Index
```
Reality Index = FRS + BDS + POS - CSS
```
回答: **产业本身是否真实、是否能赚钱、是否能持续?**

### 2. Reflexivity Index
```
Reflexivity Index = NCI + TIS + RQD + LRS + PVS
```
回答: **市场是否已经从研究转向叙事, 从叙事转向交易, 从交易转向杠杆, 从杠杆转向信仰?**

### 3. Fragility Index
```
Fragility Index = CSS + FDS + CRS
```
回答: **如果叙事降温, 基本面和资金结构能不能承受?**

---

## 七、FDS 主警报详细公式

```
FDS =
  + 叙事升温速度
  + ETF / options / leverage 升温速度
  + 估值扩张速度
  + RQD 上升速度
  + PVS 上升速度
  + 价格对利空的异常反应
  - 基本面兑现速度
  - FCF / 毛利率 / backlog 验证强度
  - 反证处理质量
```

**最高危组合**:
```
FRS 下行
POS 下行
CSS 上行
NCI 高位
RQD 上行
LRS 高位
PVS 高位
FDS 急升
```

含义不是"马上跌", 而是: **产业可能还没坏, 但股票已经变脆。**

---

## 八、12 类交易语言分类(替代 sentiment)

| # | 类别 | 典型语言 | 含义 | 阶段 |
|---|------|---------|------|------|
| 1 | Evidence-seeking | "HBM supply 到底够不够?" | 健康研究 | 早期 |
| 2 | Valuation-aware bullish | "好公司, 但价格贵" | 成熟看多 | 健康 |
| 3 | Thesis-building | "AI data center 需要更多网络" | 叙事形成 | T1-T2 |
| 4 | Ticker-hunting | "下一个 NVDA 是谁?" | 补涨开始 | T3 |
| 5 | ETF-allocation | "SMH 还是 SOXX?" | 配置化 | T3-T4 |
| 6 | Leverage-normalization | "SOXL 能长期拿吗?" | 杠杆正常化 | T4-T5 |
| 7 | Option-speculation | "weekly calls all in" | 赌博化 | T5 |
| 8 | Dip-buying reflex | "每次跌都买" | 条件反射 | T5-T6 |
| 9 | Anti-bear hostility | "估值都是 FUD" | 反证失效 | T6 |
| 10 | Price-validates-thesis | "涨了说明逻辑对" | 反身性 | T6 |
| 11 | Panic-fragmentation | "还拿不拿?" | 叙事分裂 | T7 |
| 12 | Capitulation | "AI was a scam" | 去杠杆后期 | 破裂后 |

---

## 九、9 阶段叙事生命周期 + 反证处理

| 阶段 | 语言 | 交易表达 | 反证处理 | 风险 |
|------|------|---------|---------|------|
| **技术事实** | HBM/CoWoS/800G/CapEx | 少量股票 | 认真讨论 | 健康 |
| **投资叙事** | "GPU 是 AI 税收层" | 龙头股 | 讨论估值 | 正常外推 |
| **Ticker 化** | "下一个 NVDA" | 二线股 | 选择性忽略 | 补涨风险 |
| **ETF 化** | "一键买 AI 基建" | SMH/SOXX | 分散化掩盖估值 | 拥挤 |
| **杠杆化** | "SOXL 长期拿 / NVDL 更好" | 杠杆 ETF | 忽略路径依赖 | 高危 |
| **期权化** | "weekly calls / all in" | 短期期权 | 忽略归零风险 | 极高危 |
| **信仰化** | "valuation does not matter" | 追涨+摊平 | 反证被称 FUD | 泡沫后段 |
| **脆弱化** | "buy the dip vs should I sell" | 减仓/加仓分裂 | 争吵增加 | 破裂前夜 |
| **去杠杆** | "I lost everything" | 强制卖出 | 叙事崩塌 | **错杀机会出现** |

---

## 十、Reflexivity Graph 反身性图谱

### 节点类型
```
事实节点: CapEx / 订单 / backlog / 毛利率 / 库存 / FCF
叙事节点: AI tax layer / HBM supercycle / next NVDA / Intel comeback
标的节点: NVDA / MU / INTC / FORM / VIAV / LITE / COHR / VRT
工具节点: SMH / SOXX / SOXL / NVDL / calls / margin
平台节点: Reddit / X / Stocktwits / YouTube / 雪球 / 富途 / 老虎 / 抖音
人群节点: retail / KOL / engineer / option trader / institution
价格节点: breakout / gap up / buy the dip / drawdown
反证节点: 估值担忧 / 库存上升 / 毛利率下滑 / CapEx 放缓
```

### 边类型
```
事实支撑边: Blackwell demand → NVDA
瓶颈边:    HBM shortage → MU / SK Hynix / Samsung
补票边:    missed NVDA → next AI play
ETF 化边:  bullish semis → SMH / SOXX
杠杆边:    bullish semis → SOXL / NVDL / calls
价格证明边: price up → thesis confirmed
反证排斥边: valuation concern → FUD
脆弱边:    bad news ignored → later gap-down risk
传染边:    NVDA drawdown → SOXX / SOXL → Nasdaq → quality growth
```

### 每条边记录
```
方向 / 时间 / 强度 / 证据等级 / 平台 / 人群 / 后续价格反应 / 后续资金反应
```

---

## 十一、领先滞后检测(每周必答 4 问)

```
1. 叙事热度领先价格, 还是追随价格?
2. ETF flow 领先价格, 还是追涨流入?
3. options call volume 是行情起点, 还是尾声信号?
4. CapEx 上调领先收入, 还是收入不跟但 CapEx 继续上?
```

### 4 类行情形成模式(风险递增)

| 类型 | 定义 | 风险 |
|------|------|------|
| **Fundamental-led** | 财报 / 订单 / backlog 先验证, 价格后上涨 | 最健康 |
| **Narrative-led** | 叙事先扩散, 价格后上涨, 基本面尚未完全验证 | 中性偏热 |
| **Flow-led** | ETF / options / leveraged flow 先放大, 价格后上涨 | 金融主导 |
| **Price-led narrative** | 股价先涨, 论坛和 KOL 再补编理由 | **最高风险** |

---

## 十二、9 大 Agent 流水线(每个标准化输出表)

```
1. CapEx Auditor:
   company / CapEx growth / OCF / FCF / AI revenue evidence / CSS / verdict status

2. Hardware Bottleneck Mapper:
   layer / bottleneck source / expansion timing / substitution risk / margin risk / BDS

3. Earnings Diffusion Agent:
   ticker / event / AI content (A0-A4) / EVI pending / ERG pending / DQI contribution pending

4. Narrative Mining Agent:
   narrative / tickers / platforms / intent class / RQD / NCI / leading_or_lagging

5. ETF Flow Agent:
   vehicle / AUM / flow / concentration / abstraction risk / LRS

6. Options Agent:
   ticker / call volume / OI / weekly share / IV / put-call / gamma proxy / LRS

7. Fragility Agent:
   ticker / FRS / NCI / LRS / RQD / FDS / status / alert candidate

8. Adversarial Reviewer:
   bull thesis / strongest counter-case / missing evidence / circular-demand risk / falsification test

9. Synthesis Agent (Conclusion Gate 之前不能输出判断, 只能输出):
   asset / research status / evidence gaps / allowed conclusion / forbidden conclusion / next verification
```

**铁律**: Lead 自己综合 9 路返回(不让 Synthesis Agent 转包理解, 铁律 T-2)。

---

## 十三、4 档警报系统

| 警报 | 条件 | 动作 |
|------|------|------|
| 🟢 **Green** | FRS 上升 / POS 上升 / NCI 可控 / RQD 低 / LRS 低 | 深挖 / 建仓候选 |
| 🟡 **Yellow** | FRS 高 / NCI 上升 / LRS 中等 / RQD 开始上升 | 持有不追 / 等回撤 |
| 🟠 **Orange** | FRS 未明显上升 / NCI/RQD/LRS 快速上升 / 估值快于 FCF | 停止追涨 / 降 beta / 避免杠杆 |
| 🔴 **Red** | FRS 下行 / POS 下行 / CSS 上行 / NCI/RQD/LRS 高 / FDS 急升 | 减仓 / 防传染 / 准备错杀清单 |

**重要纪律**: 对 FORM / INTC / VIAV 类样本, **不能直接套警报**, 必须先完成 Evidence Card 和分数计算, 过 Conclusion Gate。

---

## 十四、9 大 Kill Switch

```
1. Hyperscaler CapEx 继续升, 但 AI / cloud revenue 没有同步加速
2. GPU / HBM / 光模块 / 测试链订单高增, 但毛利率和现金流开始背离
3. 论坛仍 buy the dip, 但财报开始出现库存 / 应收 / 指引压力
4. ETF flow 放缓, 杠杆 ETF 和 weekly calls 仍活跃
5. 龙头横盘, 资金转向更边缘 / 更低质量的"下一个 NVDA"
6. 估值担忧从被嘲笑变成论坛争吵
7. AI 权重股回撤开始拖累非 AI 复利股
8. 二阶 / 三阶资产财报验证不足, 但市场反应越来越强
9. EVI 下降, 但 NCI / RQD / LRS 仍维持高位
```

每个 Kill Switch 必须四元素结构化(铁律 W-7): variable / baseline / baseline_date / thresholds {warning, kill} / data_source / next_check_date。

---

## 十五、输出分两个阶段

### A. Conclusion Gate 之前 — 只输出 3 张表

#### 表 1: 异常财报反应事件表
```
ticker / event_date / event_type / suspected_AI_link
AI_content_evidence_type / market_reaction / status / required_evidence
```

#### 表 2: 二阶 / 三阶 / 四阶候选池更新表
```
category / candidate companies / AI evidence type
current status / next verification
```

#### 表 3: AI 含量证据表
```
ticker / A0-A4
AI revenue content / AI growth content / AI profit content / confidence
```

### B. Conclusion Gate 之后 — 才输出仪表盘

```
Reality Index
Earnings Diffusion Status (EVI / ERG / DQI)
Reflexivity Index
Fragility Index
FDS / CRS
allowed action (8 档)
kill switch 状态
next data to watch
```

---

## 十六、Conclusion Gate(系统纪律, 7 条同时满足)

只有同时满足以下 7 条, 才能输出阶段判断:

```
1. 完成 Evidence Card
2. AI revenue / growth / profit content 有披露或明确 proxy
3. EVI / ERG / NCI / RQD / LRS 至少完成一次计算
4. 有 counter-evidence
5. 至少比较一组同类公司或上一期数据
6. 能区分 fundamental-led / narrative-led / flow-led / price-led narrative
7. 所有结论标注 confidence
```

**Conclusion Gate 之前不允许写**:
```
✗ 健康扩散
✗ 泡沫补涨
✗ 财报验证式扩散
✗ 已经进入 S4.5
✗ 高危破裂区
```

**只能写**:
```
✓ 待验证
✓ 候选
✓ 疑似
✓ 需要进一步拆解
✓ 证据不足
```

---

## 十七、9 阶段(含 S4.5)市场阶段

```yaml
market_stage:
  s1: "真实早期增长"
  s2: "真实增长 + 估值前置"
  s3: "CapEx 军备竞赛"
  s4: "叙事主流化(ticker 化)"
  s4_5: "Earnings-Validated Diffusion 财报验证式扩散"  # 牛市最肥但最危险
  s5: "ETF 化扩散"
  s6: "杠杆化加速"
  s7: "基本面放缓但叙事仍热"
  s8: "AI 链条去杠杆 / 错杀"
```

**双阶段判定**: 每个标的同时报告产业阶段 + 市场阶段, 不合并。
**典型错位**: 产业 S2(真实增长) + 市场 S6(杠杆化加速) = NVDA 候选, 公司好 ≠ 赔率好。

---

## 十八、4 类 CapEx 买方质量(防 D 类循环融资)

| 类型 | 定义 | 健康度 | 典型 |
|------|------|------|------|
| **A 类**: 现金流支撑型 | OCF 强 + FCF 仍正 + AI 收入同步 + RPO 增长 | 健康 | MSFT 部分(估) |
| **B 类**: 战略防御型 | 收入兑现不足但怕失去 AI 入口 | 不一定错 | META(防御广告) / AMZN(防御 AWS) |
| **C 类**: 融资驱动型 | 依赖债务 / 租赁 / GPU financing, 客户合同 < 资产回收期 | **高危** | CoreWeave / 部分 neocloud |
| **D 类**: 循环收入型 | hyperscaler 投资 startup → startup 买云 → 重复计算 | **dot-com 模式** | MSFT-OpenAI / AMZN-Anthropic / GOOGL-Anthropic |

---

## 十九、报告 11 章结构(Conclusion Gate 之后)

### 0. 一页结论
不写"AI 是不是泡沫", 写: 三大指数 + 四组 14 分数 + 双阶段 + 8 档动作

### 1. 这不是 AI 真假, 而是反身性循环是否过热

### 2. 买方审计: Hyperscaler 还能烧多久?
逐家 + 4 类 CapEx 买方质量(A/B/C/D)

### 3. 需求兑现: Agent 是否真能消化算力?
agent ARR / token / 推理价格弹性 / AI gross profit
**核心问**: agent 是 CapEx 回收机制, 还是 CapEx 故事的叙事引擎?

### 4. 一阶瓶颈: 谁是真短缺, 谁是假稀缺?
GPU / HBM / CoWoS / 光模块 / 网络 / 电力 BDS 衰减曲线

### 5. ⭐ 二阶 / 三阶 / 四阶扩散质量
- EVI 表(每家二阶/三阶逐家)
- ERG 表(市场反应 vs 验证强度)
- DQI 趋势(扩散是健康还是外溢)
- 五道门审计

### 6. 利润归属: 谁能留下现金流?
GM / OPM / FCF / ROIC / 三类假利润警告

### 7. 叙事图谱(Reflexivity Graph)
10 个叙事 × 9 阶段 + 反证处理 + 跨平台传播

### 8. 交易转化: 叙事如何变成 ETF / 杠杆 ETF / calls?
ETF flow / 抽象化 / 期权链 / margin / gamma / IV

### 9. 标的双阶段表 + 4 档警报

### 10. 泡沫破裂路径与错杀机会
先跌谁? 谁是杠杆放大器? 非 AI 复利股何时变成进攻区?

### 11. 9 Kill Switch 当期冻结 + 下次检查节奏

---

## 二十、关键纪律(NEVER, v3.6R 完整)

1. NEVER 给"AI 是泡沫 / AI 是革命"二元结论
2. NEVER 合并 14 分数成单一总分(skeleton 哲学)
3. NEVER 用"约 / 可能"补缺失数据 → UNKNOWN + how_to_resolve
4. NEVER 单看 NVDA 估值贵就判定泡沫
5. NEVER 单看 hyperscaler CapEx 大就判定军备竞赛
6. NEVER 把双阶段合并成单阶段
7. NEVER 让 Agent 自己综合(铁律 T-2)
8. NEVER 把 sentiment 当成 reasoning quality(必须用 12 类交易语言)
9. NEVER 把"行业"研究当成"四元组"研究
10. NEVER 静态打分(必须算速度差 FDS)
11. NEVER 漏掉错杀 / 重新部署层(L17-L18 是泡沫研究真正终局)
12. NEVER 把 D 类循环 CapEx 当 A 类
13. **NEVER v3.6R**: 把研究域窄化到二阶扩散(v3.5 错误); 必须保留 18 层完整母系统
14. **NEVER v3.6R**: 在 Conclusion Gate 之前输出阶段判断
15. **NEVER v3.6R**: 把 AI 含量 A4(纯叙事 proxy) 当 A0(明确披露 AI revenue)
16. **NEVER v3.6R**: 对 FORM / INTC / VIAV 类样本直接套警报, 必须先过 Evidence Card

---

## 二十一、与其他 skill 接口

| skill | 关系 |
|-------|------|
| **standard-analysis v1.2** | 单公司深度仍走 standard, 本 skill 前置做循环位置定位 |
| **moat-evaluator v2.5** | 单公司护城河; 本 skill 从循环视角判断 alpha 是否被周期掩盖 |
| **chokepoint-locator v2.1** | 一阶供应链 chokepoint 评估 |
| **valuation-builder** | reverse DCF 隐含增长做估值外推 |
| **risk-topology v2.0** | CRS 系统性传染风险 |
| **expectation-gap v3.0** | 单公司预期差; 本 skill 在循环位置层判定行业级预期差 |
| **game-theory-lens** | 5 个反身性回路 = 博弈论应用(hyperscaler 之间战略博弈) |
| **omission-scanner** | 9 路 agent 返回后强制扫描遗漏(尤其 D 类循环 CapEx) |
| **assumption-audit** | reverse DCF 隐含信念集 + 共识解构 |

---

## 二十二、跟踪节奏

| 频率 | 内容 |
|------|------|
| **周度** | 12 类交易语言占比变化 + ETF flow + 期权 OI/IV + KS-5/KS-6/KS-9 + 领先滞后 4 问 |
| **月度** | KS-2 / KS-7 / KS-8 + 叙事生命周期阶段更新 + 9 Agent 全流水线 + RQD 趋势 |
| **季度** | 全仪表盘 + 14 分数 + 3 总控指数 + 双阶段表 + 8 档动作复审 + 4 档警报复审 |
| **事件触发** | hyperscaler 财报 / NVDA 财报 / TSM 月营收 / FOMC / 重大叙事跨平台事件 / 二阶资产财报 |

---

## 二十三、最核心判断句(报告必含)

> **AI 基建泡沫不一定发生在需求为假时; 更可能发生在需求真实、公司优秀、但市场用 ETF、期权和杠杆把未来多年现金流一次性提前交易完的时候。**

> **真正危险的不是 AI 没有需求, 而是市场把真实需求加工成无限需求, 把阶段性瓶颈加工成永久垄断, 把股票上涨加工成逻辑证明, 再用杠杆 ETF 和 weekly calls 把这种信念放大。**

> **AI 基建泡沫的早期信号, 不一定是 NVIDIA 自己开始失真, 而是市场开始把 AI 需求从 GPU/HBM/Foundry 外推到每一个测试、测量、CPU、光通信、封装、电力和数据中心边缘资产。健康扩散由财报验证, 泡沫扩散由"下一个 NVDA"的叙事和杠杆交易验证。**

---

## 二十四、v3.6R 一句话总纲

> **V3.6R 不是把框架缩小到 FORM / INTC / VIAV, 而是把它们放回完整反身性系统中: 它们只是触发"二阶扩散是否发生"的待验证事件; 真正的研究引擎仍然必须同时追踪基本面、AI 含量、财报验证、利润归属、叙事传播、ETF 化、期权化、杠杆化、价格反身性、FDS 脆弱错位和最终投资动作。**

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-04-29 上午 | 初版: 6 维温度计 + 4 状态 + 三类泡沫 — 传统财报+宏观分析 |
| v1.1 | 2026-04-29 下午 | 增加 6 套 AI-native 框架 — 补丁式升级 |
| v3.0 | 2026-04-29 晚上 | 完整重写为 AI 原生反身性泡沫审计系统: 三线并行 + 12 层资本循环 + 10 分数 + 12 类交易语言 + 9 阶段叙事 + 4 类 CapEx 买方质量 + 双阶段 + 四元组 + 8 Agent + 13 KS + 5 图 |
| v3.5 | 2026-04-29 深夜 | 二阶扩散质量升级为主信号 + EVI/ERG/DQI 新增 + S4.5 阶段 + 三类分型(A/B/C) + 五道门审计。但**过度纠偏**: 把研究域窄化到二阶扩散, 丢失母系统其他层 |
| **v3.6R** | **2026-04-29 凌晨** | **完整母框架恢复**: 把 v3.5 收回到 4 组 14 评分中的 B 组(财报扩散), 与 A 组(真实度)+ C 组(叙事反身性)+ D 组(脆弱传染)**并列存在**。新增 18 层资本循环母系统(完整恢复)+ AI 含量 A0-A4 第一道闸门 + Conclusion Gate 7 条门控(之前不允许输出阶段判断, 只能写"待验证/候选/疑似/证据不足") + 3 总控指数(Reality/Reflexivity/Fragility) + 9 Agent 流水线 + 4 档警报 + 9 大 Kill Switch + 11 章报告结构。**核心修正**: FORM/INTC/VIAV 不是结论, 是待验证事件入口; 必须保留母系统所有层, 不允许窄化研究域。 |
| **v3.7 (建议升级, 待验证)** | **2026-04-30 (S4 提案)** | **基于 v1.0 仪表盘 5 个新角度全部当期数据强支持的灰度升级**, 等下一份原生报告验证后再正式启用。1) **CSS 加 Off-balance-sheet Commitment 子项** — 公式: CSS = α × CapEx/OCF + β × CapEx/FCF + γ × OffBS commitment / OCF + δ × cash cushion 反向; META 当期 CSS 75 中 OffBS 贡献 +20。2) **BDS 加 GPU Rental Price Index 领先指标** — 子项: H100 1Y rental + 1Y forward + spot 三层 + SK Hynix HBM contract price; 当期 GPU rental $2.35/hr 反弹强化 BDS。3) **新增 KS-12 Top 5 Hyperscaler CapEx Concentration Index** — 公式: 5 家季度 CapEx 总和 + 同步度系数 (任一家 -10% 触发 warning); baseline $132B 季度 / $725B 全年 / 占 datacenter 84%。4) **Anthropic Dependency 评估子标注** — AI Revenue Content 中加入: AMZN dependency 高 (Bedrock 38% from Anthropic) / GOOGL dependency 中; D 类高危改为 B-D 混合。5) **LRS 拆 retail / institutional** — LRS-retail (margin debt + 单股杠杆 ETF AUM + 0DTE 占比) vs LRS-institutional (主流 ETF flow + 主动基金集中度 + benchmark pressure); 背离信号 (retail ↓ + institutional ↑) = 慢退潮模式而非急崩。**v3.7 完整结构**: A 组 4 项 (FRS / **CSS-v3.7** / **BDS-v3.7** / POS) + B 组 3 项 (EVI/ERG/DQI) + C 组 6 项 (NCI / TIS / RQD / **LRS-retail** / **LRS-institutional** / PVS) + D 组 2 项 (FDS / CRS) = **15 项评分** (从 14 项); KS = **14 项** (从 9 项, 新增 KS-10 META OffBS / KS-11 GPU rental / KS-12 Hyperscaler concentration / KS-13 Anthropic ARR / KS-14 retail-institutional 背离)。**激活条件**: 至少 2 份新原生报告验证 + 任一新 KS 当期触发 warning。在此之前继续以 v3.6R 为生产框架, v3.7 仅作灰度建议存档于 v1.0 Dashboard 第 12 章。 |
