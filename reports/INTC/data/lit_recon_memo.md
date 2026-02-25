# INTC 文献侦察备忘录 (Phase -0.5)
> 日期: 2026-02-25 | 5路WebSearch | 50+源筛选 | 框架v17.3

---

## A. 核心论点 (外部分析师主线逻辑)

**共识主线**: 2026是Intel的"make-or-break"年。18A技术已证明(RibbonFET+PowerVia全球首家量产), 但商业可行性未证明。

**多空分歧焦点**:
| 维度 | 多头 | 空头 |
|------|------|------|
| 18A | 技术领先TSMC/Samsung, 良率7-8%/月改善 | 良率仅10%(2025.08)→60%(2026.01), 2027才达标 |
| IFS | 客户"knocking on my door"(Tan语), Apple已签18A-P | FY2025亏$10.3B/-58%利润率, 外部收入≈0 |
| 估值 | 政府背书+AI推理需求爆发→$66目标价(SA) | 50x 2027E, Morningstar FV仅$32→溢价33-141% |
| AI | 推理转型利好x86, DCAI可超2020峰值$26.1B | Gaudi 3被H200性能碾压9x, Falcon Shores取消 |
| CEO | Tan工程+投资双背景, "Crescent Island" GPU入局 | 第3任CEO(5年内), 执行记录=0 |

**与CQ重叠预判**:
- CQ1(18A能否按时量产?) → 已部分回答(Panther Lake出货), 但良率/成本仍是核心
- CQ2(IFS能否获得外部客户?) → 最大未知数, Apple签约但规模不明
- CQ3(AI推理能否成为新增长极?) → Tan明确押注, 但GPU产品2027才出

---

## B. 风险盲点 (框架可能忽略的维度)

1. **文化腐烂深度** (SemiAnalysis): Otellini(2005)→Krzanich→Swan期间技术人才大规模流失, $36B回购 vs $38B capex = 资本分配灾难。7/11董事无半导体经验。**框架风险**: A12(管理层)可能被CEO个人能力掩盖董事会结构性缺陷。

2. **18A客户适配问题** (Mark LaPedus/Chip Insider): 18A为Intel自用芯片优化, 非代工客户优化。PDK不成熟, IP库"small", 移植成本≈新设计成本。**Nvidia/Broadcom已测试18A后放弃**(Reuters双源确认)。**框架风险**: 可能高估"技术证明"→"商业成功"的转化率。

3. **政府持股的双刃剑**: 美国政府$8.9B入股(9.9%持股, $20.47/股均价)创造了一个隐性底线, 但也可能: (a)影响商业决策独立性 (b)政策周期风险(换届) (c)外国客户(尤其中国/欧洲)对美国政府控股芯片制造商的信任下降。

4. **股本稀释加速**: FY2025股份增长11.81%, 3年累计16.90%。SoftBank $2B(2%持股@$23), NVIDIA $5B, 政府$8.9B。EPS增长需要跑赢稀释。

5. **Q1 2026指引暴跌**: $11.7-12.7B(vs $12.5B共识), 导致股价1月23日暴跌17%。供应链瓶颈(内存芯片短缺)暴露运营脆弱性。

---

## C. 竞争格局 (结构性位移)

### 份额侵蚀全景 (Mercury Research Q4 2025)
| 战场 | Intel | AMD | ARM | 趋势 |
|------|-------|-----|-----|------|
| 服务器CPU | 71.1% | 28.8% | ~12%(收入) | Intel -3pp/年, AMD EPYC Turin占服务器收入>50% |
| 桌面CPU | 64% | 36% | - | AMD +9pp YoY (Ryzen 9000) |
| 笔记本CPU | 74% | 26% | 13.3%(含ARM PC) | ARM PC平台期(从13.7%降至13.3%) |
| 代工 | 不在前6 | - | - | TSMC 70.2%垄断, Intel外部收入≈0 |
| AI加速器 | <1% | ~5% | - | NVIDIA 94%, Gaudi失败, Falcon Shores取消 |

### 关键竞争数据点
- AMD EPYC Turin**首次占服务器收入>50%** (Q4 2025)
- Intel服务器份额: 94.2%(2020 Q2) → 71.1%(2025 Q4), 5年-23pp
- ARM服务器出货量+70% YoY(2025), 但收入份额仅12-15%(低ASP段)
- TSMC代工收入$30.24B/季(Q2 2025), 市占70.2%, Intel不在前6
- NVIDIA H200 vs Gaudi 3: **9倍性能差距**(Los Alamos实测, Llama 3.1 405B)

---

## D. 信息差 (管理层/机构独特洞察)

1. **Tan的GPU战略转向** (CNBC, 2026.02.03): Intel将进入数据中心GPU市场, 代号"Crescent Island", 针对空气冷却企业推理服务器, 大内存容量优化。Kevork Kechichian(前ARM, 2025.09加入)主导。这是**公开信息但被低估的变量** — 如果GPU产品在2027上市且定位准确(推理而非训练), 可能开辟NVIDIA忽视的细分市场。

2. **服务器CPU价格上涨** (Motley Fool, 2026.02.09): Intel对中国客户提价10%。这既是利润率改善信号, 也是中国客户可能加速国产替代的催化剂。

3. **CSIS "Too Good to Lose"框架** (2025): 类比2008 TARP。Intel不是"too big to fail"而是"too good to lose" — CHIPS Act目标的实现取决于Intel。如果Intel失败, 美国先进制程产能目标"几乎不可能实现"。这为Intel估值提供了一个非市场化的底线。

4. **代工内部经济学** (Intel官方): 长期目标60%毛利率+40%营业利润率(远超当前-58%)。突破点仅需"low-to-mid single-digit billions"外部年收入(即$3-5B/年)。这意味着**2-3个大客户即可改变叙事**。

---

## E. 分歧 (外部观点与AI分析的实质性分歧)

### 分歧 #1: 估值锚的根本分歧
- **Morningstar**: FV $32, 基于DCF, 假设2026毛利率35%→2030 50%, 收入+6%/年
- **Seeking Alpha Bull**: PT $66.62, 基于IFS成功情景
- **我的引导词**: 发现系统(PW=8), 不给目标价, 映射可能性空间
- **分歧本质**: 市场在为"期权价值"(IFS+AI推理)定价, 传统DCF无法捕捉。需要条件评级框架。

### 分歧 #2: 18A的商业可行性
- **多头(TradingKey/ainvest)**: 良率>60%, 客户主动找上门, Apple验证
- **空头(SemiAnalysis/LaPedus)**: PDK不成熟, IP库小, Nvidia/Broadcom测试后放弃
- **关键变量**: 18A是为Intel芯片优化还是真正的通用代工节点? 这一点决定IFS叙事成败。

### 分歧 #3: AI推理是否是Intel的"救命稻草"
- **Tan(2026.02)**: "customers are crying for more products", DCAI可超$26.1B峰值
- **Morningstar**: "I don't look at this company as really being a participant of the AI buildout boom"
- **数据**: Q4 DCAI $4.3B(年化$17.2B vs 峰值$26.1B), 需+52%才能回到峰值

### 分歧 #4: Crescent Island GPU的可行性
- **Tan**: 招聘首席架构师, 瞄准空冷推理服务器
- **市场**: NVIDIA CUDA生态锁定极强, 新GPU进入壁垒极高
- **未被讨论**: 如果GPU产品定位于Xeon协处理器(而非独立GPU), 可能避开NVIDIA正面竞争

---

## 反形式化门控评估

| 门控项 | 结果 | 说明 |
|--------|:----:|------|
| E节(分歧) ≥ 2条实质性分歧 | **PASS** | 4条实质性分歧 |
| ≥ 3个维度有搜索结果 | **PASS** | 5个维度全部有结果 |
| ≥ 1个看空/质疑来源 | **PASS** | SemiAnalysis, Morningstar($32 FV), LaPedus, Motley Fool(Caplinger) |

**门控结果: PASS**

---

## 高质量源优先级排序

| 优先级 | 来源 | 价值 |
|--------|------|------|
| **P0** | Intel官方FY2025业绩+Q4 Earnings Call | 最新财务数据+管理层指引 |
| **P0** | Mercury Research Q4 2025 (via The Register) | 最新份额数据 |
| **P1** | SemiAnalysis "Intel on the Brink of Death" | 最深度技术+文化批判 |
| **P1** | Mark LaPedus / Chip Insider | 最严谨行业分析(18A为Intel优化非代工) |
| **P1** | CSIS "Too Good to Lose" | 地缘政治估值框架 |
| **P1** | TrendForce 18A良率+代工排名 | 硬数据(良率/份额/wafer价格) |
| **P2** | Morningstar FV $32 | 最严格的传统估值基准 |
| **P2** | Motley Fool (Tan Feb 2026 commentary) | 最新CEO战略信号 |
| **P3** | ainvest / TradingKey | 综合性但深度一般 |
