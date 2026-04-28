# Tesla (TSLA) v4.2 — 转型融资能力测试: Q1 2026

**版本**: v4.2 (基于v4.1审计反馈第二轮修正)
**日期**: 2026-04-28
**当前股价**: $378.67 | **市值**: ~$1,420B | **52周区间**: $270.78 - $498.83

---

## 证据分级说明 (细化)

| 级别 | 含义 | 标注示例 |
|------|------|---------|
| **[A-deck]** | Tesla shareholder deck / Update Letter主文披露 | "汽车毛利率21.1%" |
| **[A-10Q]** | Tesla 10-Q财务报表披露 | "Energy revenue $2.408B" |
| **[A-call]** | Tesla earnings call transcript口径 | "Megapack pricing pressure" |
| **[A-product]** | Tesla产品页 / IR press release | "FSD月费$99" |
| **[B-comp]** | 可复算数据 (公开数据 + 公式) | "Energy GM = 952 / 2,408 = 39.5%" |
| **[C-third-party]** | 第三方券商/媒体估算 | "Wells Fargo一次性$480M估算" |
| **[D-model]** | 我们的模型假设/推算 | "HW3 retrofit成本/Robotaxi monitor成本" |

**原则**: 以A级官方为准. 任何B-comp数据必须给出公式, 任何C/D级必须显式标注. 数据冲突优先A-10Q > A-deck > A-call > A-product > B-comp.

---

## 1. 执行摘要 — 一句话结论

**Tesla Q1 2026没有证明它已经是AI公司, 但证明它还有能力为AI工业化下注; 问题是, 当前股价已经把很多尚未验证的下注提前资本化.**

**评级**: 审慎关注 (临界, 高争议)

**公允价值区间** (R-4黑箱SOTP加权44%触发硬约束, 不提供单点):
- 保守 [D-model]: $173 (35%概率)
- 中性 [D-model]: $202 ($197 含Auto/Capex调整) (50%概率)
- 乐观 [D-model]: $282 (15%概率)
- 加权~$199 [D-model] (Auto/Capex调整后)
- HW3 hidden liability单独减项 [D-model]: -$7 ~ -$14/share

**当前$378.67 [A-product] vs 加权~$199 [D-model]**: 溢价**90%**, 风险/收益不对称比2.20x.

**核心主线一句话**:
> **毛利率修复给Tesla买了时间, Capex抬升决定这段时间值不值钱.**

**Kill Switch一句话**: HW3强制召回≥3M车 / Optimus 2026 production <10K / Energy 2026E增长 <0% YoY (但Q1 Energy GM意外高39.5%, 需先验证可持续性) / Auto毛利率(ex-credits)Q2 <14% / DPO >75天.

---

## 2. 市场在争什么 — 不是好坏, 是融资能力

市场对Tesla的争议**不是**"Tesla是不是好公司", 而是:

> **汽车业务产生的现金流, 能否支撑Robotaxi/Optimus/AI5/Energy的高资本开支, 并最终转化为高ROIC?**

### 2.1 旧地图 vs 新地图

**市场的旧地图** (2024-2025共识):
- Tesla = 高估值电动车制造商 + AI/Robotaxi期权
- 关键变量: 汽车销量 / 汽车毛利率 / FSD远期想象
- 估值方法: P/E / PEG / P/S
- 隐含假设 [B-comp]: 21% Revenue CAGR + 22% steady-state OPM (Reverse DCF)

**Q1 2026后的新地图**:
- Tesla = **资本密集型AI工业平台** (Capex/Revenue >25% [A-deck], 传统车厂5-8%)
- 关键变量: **$25B/年Capex能否在2028-2030转化为高ROIC AI/Robotaxi/Optimus资产**
- 估值方法: SOTP三情景概率加权 + EV/OAB
- 隐含问题: 7引擎中至少1个会失速; **但Q1的Energy"量价错位"** (量-15.4%/收入-12%, 但毛利率从24.6%升至~39.5% [B-comp]) 提示这个失速判断需要重新审视.

### 2.2 投资风格分歧

不同投资风格对Tesla的不同评估:

| 投资风格 | 看Tesla的角度 | 当前评估倾向 | 触发条件 |
|---------|------------|-----------|---------|
| **价值投资者** | Owner Earnings (双口径都为负) / SBC暴涨 / 安全边际不足 | 卖出/Pass | $400 technical 或 Q3 earnings miss |
| **审慎成长投资者** | 承诺-达成gap [D-model] / 多重单点失败路径 / 风险收益不对称2.20x [D-model] | 维持审慎关注 | Kill Switch任一红色触发 |
| **宏观交易者** | 30年DCF久期 / 高beta to Magnificent 7 reversion / 利率敏感 | 减仓信号 | $360 (200日EMA) / Robotaxi failed milestone |
| **Disruption成长投资者** | FSD/Robotaxi/Optimus/Energy四引擎converge / AI/disruption multiples | 全仓买入 (假设期权全部成功) | 任何价位 |
| **GARP/Reverse value** | dip buy strategy / 历史Tesla "一件失败但其他overcompensate" | 等回调 | $300观望 / $250加仓 |
| **产业投资者** | Capex转ROIC的能力 / Asset Turnover / Reinvestment Rate | 关注 | ROIC回到20%+ 或压缩到<15% |

我们的判断介于"审慎成长"和"宏观交易者"之间: **不持有 + 不空仓 + 等Kill Switch**.

---

## 3. Q1 财报的硬事实

> 本节全部使用 [A] 级 (Tesla官方披露) 或 [B-comp] 级 (可复算) 数据.

### 3.1 收入 / 利润 / 毛利率

| 指标 | Q1'26 | Q1'25 | YoY | 来源 |
|------|-------|-------|-----|------|
| Total Revenue | $22.387B | $19.34B | +15.6% | [A-deck] |
| GAAP EPS | $0.13 | — | — | [A-deck] |
| Non-GAAP EPS | $0.41 | — | — | [A-deck] |
| 综合GAAP毛利率 | 21.08% | 16.31% | +477bps | [A-deck] |
| 汽车GAAP GM | 21.1% | 16.3% | +480bps | [A-deck] |
| 汽车GM ex-credits | 19.2% | 12.5% | +670bps | [A-deck] (剔除监管积分$380M) |
| 监管积分 | $380M | ~$520M | -27% | [A-deck], 占汽车收入1.9% (vs Q1'25 3.7%) |

[DM-A-deck-001] Q1'26 Revenue $22.387B (Tesla Q1 2026 Update Letter, 2026-04-22)
[DM-A-deck-002] Q1'26 GAAP EPS $0.13 / Non-GAAP EPS $0.41 (Tesla Q1 2026 Update Letter)
[DM-A-10Q-001] Q1'26 综合GP margin 21.08% (10-Q filed 2026-04-23)
[DM-A-deck-003] Q1'26 汽车GM ex-credits 19.2% (Tesla Update Letter, p.5)
[DM-A-deck-004] Q1'26 监管积分$380M

**关于汽车毛利率"V型修复"** — 我们的态度:

汽车GM (ex-credits)从12.5%恢复到19.2%是**官方披露事实** [A-deck]. 这是真实的修复.

但**第三方分析** [C-third-party]提示这次修复包含一次性贡献:
- Wells Fargo (Colin Langan)估计 [C-third-party]: Q1 EBIT beat 70%来自一次性, 主要是tariff refunds和warranty write-downs
- Electrek 2026-04-22报道 [C-third-party]: 一次性合计$480M左右 (tariff $250M + warranty $230M)
- **Tesla未在Update Letter中量化"一次性"**, 这是分析师推算 [C-third-party], 不是Tesla确认

**我们的压力测试口径** [D-model]:
> 如果按较严苛口径剔除监管积分和部分一次性收益, Q1的经营利润质量会明显低于表面数字. 这不是Tesla官方Non-GAAP口径, 是我们用于压力测试的审计口径.

按D级假设: 剥离一次性$480M [C-third-party/D-model] 后, 汽车GM (ex-credits, 压力测试) ~16.8%, 仍未回到历史峰值19-20%, 距离差250-300bps.

### 3.2 现金流 / 资本结构

| 指标 | Q1'26 | 来源 |
|------|------|------|
| Operating Cash Flow | $3.937B | [A-10Q] |
| Capex | $2.493B | [A-10Q] |
| Free Cash Flow | $1.444B | [B-comp] = OCF - Capex |
| LTM OCF | $16.5B | [B-comp] |
| LTM FCF | $7.0B | [B-comp] |
| 现金 + 短期投资 | **$44.743B** | [A-10Q] |
| Current debt and finance leases | $1.447B | [A-10Q] |
| Long-term debt and finance leases | $7.782B | [A-10Q] |
| 总债务 | $9.229B | [B-comp] |
| **净现金** | **$35.5B** | [B-comp] = $44.743B - $9.229B |
| AP | $14.7B (vs Q4 $13.4B, +$1.3B) | [A-10Q] |
| DPO | 71天 (vs Q4'25 61天) | [B-comp] |
| SBC (gross) | $1.030B | [A-10Q] (+80% YoY, 4.6% of revenue vs Q1'25 3.0%) |
| SBC (net of tax) | $803M | [A-deck] (Tesla non-GAAP reconciliation) |

**净现金口径修正** (vs v4.1主文): v4.1主文写"净债务-$7.4B", v4.1附录正确写"-$35.5B". 这里**统一为净现金$35.5B [B-comp]** = 现金及短投$44.743B - 总债务$9.229B.

[DM-A-10Q-002] Q1'26 OCF $3.937B
[DM-A-10Q-003] Q1'26 Capex $2.493B
[DM-B-comp-001] Q1'26 FCF $1.444B = $3.937B - $2.493B
[DM-A-10Q-004] Q1'26 Cash + ST inv $44.743B
[DM-A-10Q-005] Q1'26 Total debt $9.229B
[DM-B-comp-002] Q1'26 Net cash $35.5B (统一口径, 替代v4.1主文-$7.4B错误)
[DM-A-10Q-006] Q1'26 SBC gross $1.030B / net-of-tax $803M
[DM-B-comp-003] Q1'26 DPO 71天

**关于Owner Earnings — 双口径** [B-comp]:

Common stockholders Net Income $477M [A-deck] vs Net Income (含其他股东) $491M. 我们使用$477M (common shareholders口径).

**口径1 — Gross SBC**:
- Owner Earnings = $477M - $1,030M = **-$553M** [B-comp]
- Owner EPS = -$553M / 3,538M = **-$0.156**

**口径2 — Net-of-tax SBC** (Tesla non-GAAP reconciliation):
- Owner Earnings = $477M - $803M = **-$326M** [B-comp]
- Owner EPS = -$326M / 3,538M = **-$0.092**

**两种口径都为负**, 含义不变: 从owner economics视角, 每股Q1实际损失$0.09-$0.16. 选择gross还是net-of-tax本身是分析口径选择, 我们呈现双口径让读者判断.

### 3.3 Capex指引 vs LTM运行率

| 指标 | 数值 | 来源 |
|------|------|------|
| 2026 Capex指引 | **$25B** | [A-call] (Tesla管理层Q1 2026 call, 从1月$20B上调; Barron's报道2026-04-22) |
| LTM Capex (Q2'25-Q1'26) | $9.52B | [A-10Q] |
| 差距 | $15.5B | [B-comp] |
| Q2-Q4要达成$25B年化所需 | $7.5B/季 | [B-comp] = (25-2.49)/3 |
| Q1实际 | $2.493B | [A-10Q]; 实际vs指引达成率40% |
| 历史对比 | 2023 $8.9B / 2024 $11.3B / 2025 $8.5B / 2026指引 $25B | [A-10K], 4x跳升 (vs 历史2x跳升) |

**我们对Capex爬坡的判断** [D-model]:
- 设备lead time (光刻机/锂电池设备/冲压线) 通常 ≥12-18个月 — 行业一般规律
- Optimus / Robotaxi factory shell建设≥9-12个月 — 行业一般规律
- 因此 **$25B不是2026立刻冲击, 是2027-2029累积压力** [D-model]

**真实Capex爬坡路径** [D-model]:
- 2026E: $14-17B (Q1 $2.5B → Q4 $4-5B线性爬坡)
- 2027E: $20-23B
- 2028E: $25B+ (指引水平真正达成)

---

## 4. Capex是Q1真正的第一变量

> **毛利率修复给Tesla买了时间, Capex抬升决定这段时间值不值钱.**

### 4.1 资金弹药多年情景

LTM FCF [B-comp]:

| Q | OpCF | Capex | FCF |
|---|------|-------|-----|
| Q2'25 | $2.54B | $2.39B | $0.15B |
| Q3'25 | $6.24B | $2.25B | $3.99B |
| Q4'25 | $3.81B | $2.39B | $1.42B |
| Q1'26 | $3.937B | $2.493B | $1.444B |
| **LTM** | **$16.53B** | **$9.52B** | **$7.00B** |

**情景分析** [D-model] ($25B Capex全面落地后的现金流压力):

| 情景 [D-model] | OpCF (年化) | Capex | FCF [B-comp] | 弹药消耗速度 |
|------|------------|-------|-----|------------|
| 当前路径 [A-10Q] | $16.5B | $9.5B | +$7.0B | 现金累积 |
| 2026E 中性 | $17B | $15B | +$2B | 接近平衡 |
| 2027E | $19B | $20B | -$1B | 略消耗弹药 |
| 2028E 完整指引 | $20-22B | $25B | -$3-5B | 3-5年烧$15B现金 |
| 极端情景 | $12-14B | $25B | -$11-13B | 3-4年耗尽$44.7B |

**结论**: $44.7B现金 [A-10Q] + 净现金$35.5B [B-comp] + LTM FCF $7B [B-comp] = **转型期"3-5年弹药"**. 不会爆雷, 但**经营修复速度 + Capex爬坡速度的赛跑**很关键.

### 4.2 ROIC压缩传导 [D-model]

- Tesla 2022-2023年ROIC达到35%+ [B-comp], 2024-2025年降到22% (capex扩张稀释)
- 2026-2027 Capex/Revenue = 20-25% — 重资本扩张周期, **ROIC压缩到15-18%概率高** [D-model]
- 历史警示: 重资本企业大幅扩张通常带来3-5年的ROIC下行 (Boeing/Caterpillar案例) [C-third-party/D-model]

[DM-D-model-001] 2026E FCF -$10~15B (我们的估算)
[DM-D-model-002] 2026E现金消耗 $44.7B → $30-35B (从$44.7B出发)
[DM-D-model-003] ROIC压缩传导: 22% → 15-18% (基于重资本企业历史规律)

### 4.3 市场对Capex的反应 [C-third-party]

- Reuters 2026-04-22 [C-third-party]: "Q1现金流让市场松一口气, 但更高资本开支计划压制了情绪"
- Barron's 2026-04-22 [C-third-party]: "Tesla 2026计划投入$25B新厂房和设备, 高于此前$20B预期"

**这与我们的"Capex是第一变量"判断方向一致**: 市场不再纠结"Tesla能不能造车", 而是在问"Tesla能不能把重资本投入转化成高回报AI工业资产".

---

## 5. 三个尚未被证明的期权

### 5.1 FSD subscription — 最近的软件化抓手, 但ARR口径需要谨慎

**当前证据** [A级]:
- Q1'26 active FSD subscriptions: **1.28M** (+51% YoY) [A-deck]
- 月费: **$99** (统一价格, 2026-02-14后) [A-product]
- 累计cumulative deliveries: ~9.26M [A-10Q], take rate ~13.8-14.4% [B-comp]
- 历史FSD买断: $15K → $99/月 (2026-02关闭) [A-product]

**ARR口径修正** (vs v4.1的关键修正):

v4.1直接计算ARR = 1.28M × $99 × 12 = $1.52B. **这不严格**.

Tesla官方脚注说明 [A-10Q]: **Active FSD Subscriptions包括up-front payment和monthly subscriptions, 排除free trials**. 也就是说, 1.28M不是纯粹"每月付$99的订阅用户", 里面包含已经一次性付费的FSD用户.

**正确表达** [B-comp + D-model]:
> 如果把1.28M全部按$99/月处理, **理论年化收入上限约$1.52B**; 但官方指标包含一次性付费用户, 因此**这不是严格意义上的ARR**. 真正的ARR需要Tesla披露monthly FSD subscribers / upfront-paid active users / churn / ARPU — Tesla未披露这些细分.

**未证明环节** [D-model]:
1. **高渗透率** — 当前take rate 14.4%, 距离40-50%或80%(Musk隐含目标)还很远
2. **高留存率** — Tesla未披露churn (异常) [A-10Q]; SaaS自然churn 5-10%/年 [D-model]
3. **supervised到unsupervised的可审计迁移** — 当前FSD是supervised; Robotaxi unsupervised需要FSD V13/V14+监管批准 [D-model]
4. **HW3 churn风险** — 4M HW3车辆物理无法支持L4 [A-call]; 这部分subscriber有失望→取消风险 [D-model]
5. **ARR基数本身不清楚** — 见上述ARR口径修正

**MarketWatch报道** [C-third-party]: Tesla 128万活跃FSD订阅用户 +51% YoY, **但大多数客户仍未付费使用FSD**; 同一报道指出**Tesla若要充分兑现Musk薪酬包相关目标, 需要达到1000万活跃订阅**, 高于当前累计车辆和Robotaxi规模.

**估值含义 — FSD SOTP需要更谨慎** [D-model]:

因为ARR基数不清楚 (含upfront付费用户), 因此FSD SOTP不能简单按SaaS ARR multiple. 我们的修正区间:

| 情景 | 假设的"等效monthly ARR" | 倍数 | SOTP |
|------|------------|--------|------|
| 保守 | $0.8-1.2B (假设monthly subs占比60-80%) | 5-6x | $40-50B (vs v4.1 $50-65B, 下修) |
| 中性 | $1.2-1.5B | 6-8x | $55-70B (vs v4.1 $65-75B, 下修) |
| 乐观 | $1.5-2.5B (假设monthly subs增长 + churn低) | 8-12x | $70-100B (vs v4.1 $80-100B, 维持) |

**FSD部分的平衡表达**: FSD订阅是Tesla最接近SaaS的收入形态, 但**还没有证明四件事** — 高渗透率 / 高留存率 / supervised到unsupervised的可审计迁移 / **monthly subs vs upfront混合的真实ARR基数**. 当前1.28M订阅是正信号, 但**不是Robotaxi网络已经成立的证据**.

**Kill Switch (FSD)**:
- 🟡 黄: FSD subscriber Q2 <1.4M (+9% QoQ) [A级阈值]
- 🔴 红: HW3强制召回≥3M车辆触发SEC调查或法院判决要求计提

[DM-A-deck-005] Q1 FSD subscribers 1.28M (Tesla Q1 2026 Update Letter)
[DM-A-product-001] Q1 FSD月费$99 (Tesla product page)
[DM-A-10Q-007] Active FSD Subscriptions包括up-front payment + monthly subscriptions, 排除free trials (Tesla官方脚注)
[DM-C-third-party-001] MarketWatch: Tesla需达到10M订阅以兑现Musk薪酬包目标
[DM-D-model-004] FSD SOTP重新校准 $40-100B区间 (vs v4.1 $50-100B, 下沿下修)

### 5.2 Robotaxi — 运营验证升级, 财务验证未开始

**当前证据**:
- Q1'26 Robotaxi paid miles: **1.7M** (+183% QoQ) [A-deck]
- Fleet size: **89辆Model Y** (大部分含safety monitor) [A-deck/C-third-party]
- 服务城市: Austin (主) + Dallas (Q1启动) [A-deck]
- Pricing: $3 base + $1.40/mile, 实际平均~$1.95/mile [C-third-party] (Cern Basher analysis)
- Tesla Robotaxi单价 $8 vs Waymo $15-20 (Tesla 53%折价) [C-third-party]

**第三方估算** [C-third-party]:
- Morgan Stanley估算: Tesla cost-per-mile $0.81 vs Waymo $1.36-1.43
- Robotaxi Tracker / TechBuzz / Fortune: Tesla 89辆 vs Waymo 700+辆 (7.9倍fleet差异)
- Tesla pickup time 15.32 min vs Waymo 5.74 min (3x差距)
- Austin pilot 14起碰撞, crash rate ~4x人类司机

**未证明环节** [D-model]:
1. **MS的$0.81/mile是"未来稳态"成本, 不是当前实际** — 当前fleet含safety monitor, monitor人力成本$0.40-0.60/mile [D-model] → 真实当前成本$0.75-0.95/mile [D-model]
2. **monitor消除时间表未披露** [A-call]
3. **scale-up概率** — 89辆 → 100K辆需要1,124x scale-up + 8年时间 + unsupervised突破 + 多州监管批准 [D-model]
4. **California以外州监管批准未启动** [A-deck]

**估值含义** [D-model]:

| 情景 | 2030 fleet | 单位经济 | SOTP |
|------|------------|----------|--------|
| 保守 | 100K辆推迟到2032+, monitor依赖persists | $0.81/mile (含monitor) | $80-100B |
| 中性 | 100K辆 by 2030, unsupervised 2027-2029 | $0.65/mile | $100-115B |
| 乐观 | 50K by 2027 + 100K by 2029 + AI5便宜硬件 | $0.45-0.65/mile | $130-160B |

**Kill Switch (Robotaxi)**:
- 🟡 黄: Robotaxi fleet Q2 <150辆 [A级阈值]
- 🔴 红: 集体诉讼 / California DMV禁令

### 5.3 Optimus — 2026目标需要按制造爬坡折扣处理

**当前证据**:
- 当前状态: V2 prototype测试, V3设计finalizing [A-deck]
- Tesla 2026目标: **50-100K units** [A-call] (Tesla宣布)
- Fremont产线: Late July/August启动 [A-deck/C-third-party] (Electrek报道)
- Fremont目标: 1M units/yr长期 [A-deck]
- Giga Texas目标: 10M units/yr (mature state, 无具体时间表) [A-deck]
- V3单位成本目标: $20-25K (含AI chip $5-6K) [A-call]

**未证明环节** [D-model]:

我们的判断: **Optimus 2026目标需要按制造爬坡折扣处理.** 与Cybertruck相比, 人形机器人涉及执行器/平衡控制/可靠性/安全责任, 量产难度更高. 因此, 我们不应把管理层目标直接资本化进估值.

**Cybertruck爬产对照** [B-comp]:
- 2024 Q1量产 5K → 2024 Q4 17K (3.4x ramp)
- 2024年Tesla原计划Cybertruck 250K/year, 实际仅交付~50K (达标20%) [A-10K]
- 2025年~80K (32%) [A-10K]

**真实2026交付区间** [D-model]: **2-15K台** (中位8K)
- Q1 2026: ~50-200台 (内部使用) [A-deck]
- Q4 2026: ~1-5K [D-model]
- 全年: 2-15K [D-model]
- **2027年才是真正爬产年** [D-model]

**估值含义** [D-model]:

| 情景 | 2030 production | SOTP (median) |
|------|------------|--------|
| 保守 | 1-2M units, ASP $25K | $70-120B (median $95B) |
| 中性 | 3-5M units | $80-180B (median $130B) |
| 乐观 | 8-10M units (cap at $200B for execution risk) | $200B max |

**Kill Switch (Optimus)**:
- 🔴 红: Optimus 2026 production <10K units [A级阈值]

---

## 6. Energy 的真实位置 — 量价错位 [重写]

> 这是v4.2相对v4.1最大的修正. v4.1错误地将v3.0的"39.5%毛利率"标记为"初步分析错误", 实际**Q1 2026 Energy GM确实可从官方报表复算为约39.5%**.

### 6.1 Q1 2026 Energy硬事实 [A-10Q + B-comp]

| 指标 | Q1'26 | Q1'25 | YoY | 来源 |
|------|---------|---------|-----|------|
| Energy generation and storage Revenue | **$2.408B** | $2.74B | -12% | [A-10Q] |
| Energy cost of revenue | **$1.456B** | — | — | [A-10Q] |
| **Energy gross profit** | **$952M** | — | — | [B-comp] = Revenue - COGS |
| **Energy gross margin** | **~39.5%** | ~24.6% | **+15pp** | [B-comp] = $952M / $2.408B |
| Storage量 | 8.8 GWh | 10.4 GWh | -15.4% | [A-deck] |
| Q4 2025 Energy GM (record披露) | 29.8% | — | — | [A-deck] |

[DM-A-10Q-008] Q1'26 Energy revenue $2.408B (10-Q segment)
[DM-A-10Q-009] Q1'26 Energy cost of revenue $1.456B (10-Q segment)
[DM-B-comp-004] Q1'26 Energy GP $952M = $2.408B - $1.456B
[DM-B-comp-005] Q1'26 Energy GM 39.5% = $952M / $2.408B (B级可复算, 非"分析师估算")
[DM-A-deck-006] Q4 2025 Energy GM 29.8% record
[DM-A-deck-007] Q1'26 Energy storage 8.8 GWh (-15.4% YoY)

**关于v4.0/v4.1的"39.5%是错误"判断 — 现修正**:

v4.0说"初步分析的"39.5% margin是错误"判断, 真实Q4 record = 29.8%". v4.1延续此判断标记为"初步分析错误". **这两个版本都错了**.

实际上:
- Q4 2025 Energy GM 29.8% [A-deck] 是Q4披露的record
- Q1 2026 Energy GM 从10-Q segment可**复算为约39.5%** [B-comp] = $952M / $2.408B
- v4.2修正立场: **39.5%不是错误, 是Q1 2026实际可复算数据**

### 6.2 Energy的"量价错位"叙事 (vs v4.1的"失速"叙事)

**v4.1原表达**: "Energy短期失速, 第二利润池可见度下降"

**v4.2修正表达**:
> Energy出现"量和收入下滑, 但毛利率大幅改善"的**错位**. 量-15.4% YoY [A-deck] + 收入-12% YoY [A-10Q] 显示增长质量弱; 但GP从~$675M (Q1'25) 升至$952M (+41% YoY) [B-comp], GM从~24.6%升至39.5%, 显示利润质量并不弱.

**真正要验证的是** [D-model]:
- Q2/Q3 storage deployed是否恢复到10-12 GWh以上 [A级阈值]
- Energy毛利率是否仍能维持30%+

**Q1 -12% YoY的原因** [D-model]:
1. Q4 2025 record前置 — 14.2 GWh创纪录后季节性回落 (-38% QoQ严重) [A-deck]
2. 大型Megapack项目交付时间lumpy [D-model]
3. Powerwall需求持平 [D-model]
4. 中国Megapack ASP压力 — CATL/比亚迪扩产能至50+ GWh, ASP -10-15% YoY [C-third-party]

**Q1高毛利率的可能解释** [D-model]:
1. Tariff benefit (Q1'26 tariff环境) — 但Tesla未拆分 [A-call]
2. 项目mix偏向高margin Megapack — 占比可能>80% [D-model]
3. 成本节奏 (Q4 push交付后Q1低产能利用率反而毛利率高?) [D-model]
4. Battery cell成本下降的滞后效应 [D-model]
5. **这些是阶段性还是持续性? Q2/Q3验证.**

### 6.3 Energy SOTP — 修正

**v4.1的SOTP**: 保守$50-70B / 中性$60-80B / 乐观$80-100B (基于稳态margin 18-25%)

**v4.2的SOTP** [D-model] (修正基于Q1 39.5% GM事实):

如果Q1的39.5%可持续 (即使部分回落到30%):
- 保守 [D-model]: 2026E Revenue $10B + 稳态margin 25% → SOTP **$70-90B** (上调)
- 中性 [D-model]: 2026E Revenue $11B + 稳态margin 30% → SOTP **$90-120B** (上调)
- 乐观 [D-model]: 2026E Revenue $12B + 稳态margin 35% → SOTP **$120-160B** (上调)

**vs v4.1 (中性$60-80B)**: 现在中性$90-120B, 上调约$30-40B/per scenario.

**对加权目标的影响** [D-model]:
- v4.1加权目标: ~$199 (含Auto/Capex调整)
- v4.2 Energy修正: 中性Energy SOTP +$30B = +$8.5/share
- v4.2加权目标: ~$207-208 (中性下) — 但**保留"区间表达"**, 不改主结论

**Kill Switch (Energy) 修正**:
- 🟡 黄: Q2 Storage部署 <10 GWh (环比≤+14%) → 结构性减速 (维持)
- 🔴 红: Energy 2026E增长 <0% YoY (维持)
- 🟡 黄 (新): Q2/Q3 Energy GM <30% — Q1 39.5%阶段性vs持续性的分辨指标 [D-model]

### 6.4 Energy的整体判断修正

**v4.2的Energy立场**:
> Energy不是"失速", 是"量价错位". 短期收入增长有压力, 但毛利率大幅改善 (Q1 39.5% [B-comp] vs 历史24.6%). **真正的问题不是Energy是否崩, 而是Q1的高毛利率是阶段性 (项目mix/tariff/成本节奏) 还是可持续 (储能单位经济结构性改善)**. Q2/Q3 storage部署 + 毛利率持续性是关键验证.

**Energy SOTP从v3.0 $309B大幅下修到$50-75B不再成立**. 修正为**$90-120B (中性)**, 保留下修空间但不再过度悲观.

[DM-D-model-005] v4.2 Energy SOTP重估: 保守$70-90B / 中性$90-120B / 乐观$120-160B (上调$30-40B/per scenario vs v4.1)
[DM-D-model-006] v4.2加权目标: ~$207-208 (Energy修正后) vs v4.1 $199 (但保留区间表达, 不改"审慎关注"评级)

---

## 7. Services 增长不能主要归因给FSD [重写]

### 7.1 Services & Other的硬事实 [A-10Q]

| 指标 | Q1'26 | 来源 |
|------|------|------|
| Services & Other Revenue | $3.745B | [A-10Q] (+42% YoY) |
| Services & Other cost of revenue | **$3.399B** | [A-10Q] |
| **Services & Other GP** | **$346M** | [B-comp] |
| **Services & Other GM** | **9.2%** | [B-comp] = $346M / $3.745B |

[DM-A-10Q-010] Q1'26 Services & Other revenue $3.745B
[DM-A-10Q-011] Q1'26 Services & Other cost of revenue $3.399B
[DM-B-comp-006] Q1'26 Services GP $346M, GM 9.2% (B-comp级可复算)

### 7.2 v4.1对Services的归因错误

**v4.1原表达**: "Services是更接近软件化的亮点, FSD subscription贡献+$340M"

**v4.1的归因错误**:
1. **Services GM仅9.2%** [B-comp] — 如果Services是"软件化亮点", 为什么毛利率只有个位数?
2. **FSD很可能进入automotive ancillary sales, 不是Services & Other** — Tesla官方对收入增长的解释 [A-10Q]: "收入增长受Services and Other增长影响, 也受automotive ancillary sales增长驱动, 主要由FSD sales and subscriptions增加驱动"
3. **将FSD $340M归入Services**是会计口径假设错误

### 7.3 v4.2修正立场

**v4.2新表达**:
> Services & Other收入增长很快 (+42% YoY), 但毛利率仍然低 (9.2% [B-comp]), 这意味着它**还不是纯软件利润池**. FSD是软件化信号, 但**不能未经会计口径确认就归入Services增长**. 真正的软件化分析应把**FSD revenue recognition与automotive ancillary sales分开**.

**Services的真实贡献来源** [A-10Q]:
- 二手车销售
- Service revenue (维修/配件)
- 超充网络对外开放
- Tesla insurance
- 其他

**FSD的真实归属** [A-10Q + D-model]:
- 一次性付费FSD: 进入automotive revenue (deferred + recognized portion)
- monthly subscription: 部分进入automotive ancillary sales (per Tesla 10-Q解释)
- 部分进入Services & Other (但比例不清楚)

**对软件化叙事的修正**: 不能从"Services +42%"直接推导"Tesla软件化加速". 需要等Tesla单独披露FSD revenue recognition / monthly vs upfront subscriber split, 才能严肃讨论"Tesla SaaS化".

[DM-A-10Q-012] Tesla 10-Q解释: 收入增长由Services + automotive ancillary sales (FSD为主驱动)联合推动
[DM-D-model-007] FSD revenue可能跨Services和Automotive两个segment, 比例Tesla未披露
[DM-D-model-008] Services GM 9.2%意味着不是纯软件利润池, "软件化亮点"判断需要降温

### 7.4 Services和Energy的综合判断

**v4.2的Energy + Services**:
> Energy出现量价错位, 但毛利率大幅改善 (39.5% Q1) 提示利润质量并不弱. Services增长虽快但GM仅9.2%, 说明它**还不是纯软件利润池**. 两者对Tesla "AI/software化"叙事的支撑都比v4.1表达的更弱 — 但Energy的高毛利率是新的正面信号, 是v4.2相对v4.1最重要的修正方向.

---

## 8. 估值 — 三把尺子 (EV/OAB重做)

> v4.2相对v4.1的关键修正: PP&E官方为$43.213B, 不是$55.95B. EV/OAB三口径重做.

### 8.1 第一把尺子: Reverse DCF — 当前股价隐含什么

**简化框架** [B-comp]:
- WACC = 9% [B-comp假设]
- Terminal growth = 3%
- Tax rate = 18%

**LTM Q1'26基线** [A-10Q + B-comp]:
- Revenue: $97.9B [A-10Q]
- Operating Income (剥离一次性$480M [C-third-party] + 监管积分按全年$1.5B [D-model]): $3.5-4B [B-comp+D-model]
- Implied LTM core operating margin: 3.6-4.1%

**用Q1'26反推$378.67隐含假设** [B-comp+D-model]:

| 5年后State | 需要的Revenue | Operating Margin | 隐含估值 |
|-----------|-------------|------------------|---------|
| **股价$378.67隐含** | **$260-300B (+22-25% CAGR)** | **20-24% margin** | **回到21%+22%假设** |

[DM-B-comp-007] Reverse DCF: $378.67隐含5年后Revenue $260-300B + 20-24% margin

### 8.2 第二把尺子: SOTP — 三情景概率加权 (Energy修正后)

**v4.2 SOTP重估表** [D-model]:

| 期权 | 保守 [D-model] | 中性 [D-model] | 乐观 [D-model] |
|------|---------|---------|---------|
| 汽车主业 (ex-FSD) | $250-280B | $270-300B | $290-320B |
| **Energy (v4.2修正)** | **$70-90B** | **$90-120B** | **$120-160B** |
| FSD subscription (v4.2修正) | $40-50B | $55-70B | $70-100B |
| Robotaxi (option) | $80-100B | $100-115B | $130-160B |
| AI5/chip (option) | $25-50B | $35-55B | $50-70B |
| Optimus (option) | $70-120B | $80-180B | $200-400B |
| **Net cash (v4.2修正)** | **$35-36B** | **$35-36B** | **$35-36B** |
| **Total区间合计** | **$570-726B** | **$665-841B** | **$895-1,246B** |
| **情景中值** | **$648B** | **$753B** | **$1,070B** |
| **Per-share中值** | **$183** | **$213** | **$302** |

**对比v4.1**:
- 保守: $173 → **$183** (+$10, Energy +$30/Net cash调整)
- 中性: $202 → **$213** (+$11, Energy修正主要驱动)
- 乐观: $282 → **$302** (+$20, Energy + Optimus调整)

**概率加权双版本** [D-model]:
- 50%/35%/15%加权: 50% × $213 + 35% × $183 + 15% × $302 = **$216.05**
- 60%/30%/10%加权: 60% × $213 + 30% × $183 + 10% × $302 = **$212.90**
- 调整Auto/Capex后加权: **~$210**

**HW3 hidden liability** [D-model]:
- $7-14/share单独减项
- 调整HW3后加权目标: $210 - $7-14 = **$196-203/share**

**对当前股价溢价的影响**:
- v4.1: $378.67 vs $199 → 溢价90%
- v4.2: $378.67 vs $210 → 溢价**80%** (含HW3后90-93%)
- 溢价仍然显著, "审慎关注"评级**不变**

[DM-D-model-009] v4.2 SOTP三情景per-share: 保守$183 / 中性$213 / 乐观$302 (Energy + Net cash修正后)
[DM-D-model-010] v4.2加权目标$210 (50%/35%/15% Auto/Capex调整后)
[DM-D-model-011] v4.2溢价80% (vs v4.1 90%) — 主要来自Energy SOTP上修

### 8.3 第三把尺子: EV/OAB — 三口径重做

**关键修正**: PP&E官方为$43.213B [A-10Q], 不是v4.0/v4.1主用的$55.95B.

**Tesla Q1 2026 资产负债表细分** [A-10Q]:
- Property, plant and equipment, net: **$43.213B**
- Operating lease vehicles: $4.530B
- Energy generation and storage systems: $4.565B
- Operating lease right-of-use assets: $6.332B
- Inventory: $14.434B
- AR: $3.959B
- AP: -$14.696B

**EV/OAB三口径** [B-comp]:

**窄口径**: PP&E + Inventory + AR - AP
= $43.213B + $14.434B + $3.959B - $14.696B
= **$46.91B**

**中口径**: 窄口径 + Energy systems + Operating lease vehicles
= $46.91B + $4.565B + $4.530B
= **$56.01B**

**宽口径**: 中口径 + Operating lease right-of-use assets
= $56.01B + $6.332B
= **$62.34B**

**EV** [B-comp]:
= Market Cap + Total debt - Cash + ST inv
= $1,420B + $9.229B - $44.743B
= **$1,385B**

**EV/OAB** [B-comp]:
- 窄口径: $1,385B / $46.91B = **29.5x**
- 中口径: $1,385B / $56.01B = **24.7x**
- 宽口径: $1,385B / $62.34B = **22.2x**

**vs v4.0/v4.1的35.3x**: v4.0/v4.1使用$55.95B PP&E是FMP聚合数据的会计重分类问题. 用Tesla 10-Q官方分项后, EV/OAB **22-30x区间**, 不是单一35.3x.

[DM-A-10Q-013] Q1'26 PP&E (net) $43.213B (10-Q balance sheet)
[DM-A-10Q-014] Q1'26 Operating lease vehicles $4.530B
[DM-A-10Q-015] Q1'26 Energy generation and storage systems $4.565B
[DM-A-10Q-016] Q1'26 Operating lease right-of-use assets $6.332B
[DM-B-comp-008] EV/OAB窄口径29.5x = $1,385B / $46.91B
[DM-B-comp-009] EV/OAB中口径24.7x = $1,385B / $56.01B
[DM-B-comp-010] EV/OAB宽口径22.2x = $1,385B / $62.34B

### 8.4 EV/OAB历史可比 — 修正后的判断

**v4.2修正立场**:
> 按不同OAB口径, Tesla EV/OAB约为**22-30x**, 仍处于高端AI/工业平台估值区间, 但**是否达到NVDA peak (35x) 取决于OAB定义**. 窄口径29.5x接近NVDA peak但低于AMD 28x peak; 中宽口径22-25x位于"AI生态溢价区间"中位 (vs AMZN 12-18x扩产期peak / NVDA 20-35x).

历史可比 [C-third-party]:

| 公司 | 时期 | EV/OAB peak | 后5年股价 |
|------|------|------------|---------|
| AMZN | 2003-2010 (扩产期) | 12-18x | +6.5x |
| TSM | 2010-2015 | 8-14x | +3.2x |
| Intel | 2014-2018 (10nm失败) | 6-9x | -15% |
| AMD | 2017-2020 | 18-28x | +8x |
| NVDA | 2020-2024 (AI peak) | 20-35x | +15x |
| **TSLA** | **2026 Q1** | **22-30x (口径敏感)** | **?** |

**关键观察**:
- TSLA EV/OAB 22-30x位于AMZN扩产期上方, AMD/NVDA中位
- **市场仍price in"全部期权按NVDA速度兑现"**, 但远不到NVDA peak的极端
- 风险压缩到15x以下 → -35-50%下行 (vs v4.1的-45-55%, 因为基线下移)

### 8.5 三把尺子的综合判断

| 估值锚 | 隐含价值 | 当前股价 | 溢价 |
|------|--------|--------|------|
| Reverse DCF | 隐含21%+22%假设 | $378.67 | "市场已price-in期权全部兑现" |
| SOTP加权 (v4.2修正) | $210 / $196-203 (含HW3) | $378.67 | **80% / 87-93%** |
| EV/OAB (三口径) | 22-30x 高端AI区间但非peak | $1,385B EV | -35-50%倍数压缩风险 (任一期权miss时) |

**三把尺子收敛的结论**: 当前股价**仍超出**任何合理估值框架的中位区间. 但v4.2相对v4.1**更平衡**: SOTP上修8% / EV/OAB从peak水平降到高端区间 / 但溢价仍80%.

---

## 9. Kill Switch — 8个核心指标

| 信号 | 等级 | Variable | Baseline | Pivot阈值 | 频率 |
|------|------|----------|----------|----------|------|
| **KS-01 HW3** | 🔴 红 | NHTSA强制召回HW3车辆 | 0辆 [A-call] | ≥3M车辆 | Event |
| **KS-02 Auto margin** | 🔴 红 | 汽车毛利率(ex-credits) | Q1 19.2% [A-deck] | <14% | 季度 |
| **KS-03 DPO** | 🔴 红 | DPO (AP延付天数) | Q1 71天 [B-comp] | >75天 | 季度 |
| **KS-04 Optimus** | 🔴 红 | 2026 Optimus production | 0 [A-deck] | <10K | 年度 |
| **KS-05 Energy** | 🔴 红 | 2026E Energy YoY增长 | Q1 -12% [A-10Q] | <0% YoY | 年度 |
| **KS-05b Energy GM (新)** | 🟡 黄 | Q2/Q3 Energy GM持续性 | Q1 39.5% [B-comp] | <30%多季度 | 季度 |
| **KS-06 Capex Q2** | 🟡 黄 | Q2 Capex | Q1 $2.493B [A-10Q] | <$3.5B | 季度 |
| **KS-07 FSD subs Q2** | 🟡 黄 | FSD subscriber Q2 | Q1 1.28M [A-deck] | <1.4M | 季度 |
| **KS-08 AI5量产** | 🟢 绿 | AI5 chip量产时间 | 完成最终芯片设计 [A-deck] | Q4 2026按plan | Event |

**AI5措辞修正** [A-deck]:
v4.0/v4.1说"AI5 tape-out 2026-04-15". 但官方deck文字是 **"completed the final chip design of our next-generation AI5 inference processor"**, 图中也提及"AI5 Tape Out". 为避免争议:
> Tesla表示已完成下一代AI5 inference processor的最终芯片设计. 是否已进入可量产tape-out / sample / high-volume ramp, **需要后续继续验证**.

---

## 10. 结论 — 该如何观察

### 10.1 价位观察区间 (避免交易指令式表达)

| 区间 | 判断 |
|------|------|
| **观察区** | $300-400 — 当前价位附近, 持续监控Kill Switch |
| **重新评估区** | $250-300 — 接近加权目标$210, 重新评估thesis |
| **高风险区** | $400+ 无新catalyst — 估值进一步偏离合理区间 |
| **Thesis break区** | 任一红色Kill Switch触发 — 重做估值, 不是简单下调 |

### 10.2 我们的当前判断

**评级**: 审慎关注 (临界, 高争议)
**行动倾向**: 不持有 + 不空仓 + 等Q2 2026 earnings (2026-07/08)
**关键触发**: KS-02 Auto margin Q2 / KS-05 Energy storage Q2 / KS-05b Energy GM持续性 (新增) / KS-04 Optimus Q2 production / HW3 disclosure

### 10.3 一句话固化

> **Tesla Q1 2026没有证明它已经是AI公司, 但证明它还有能力为AI工业化下注. 当前股价已经把很多尚未验证的下注提前资本化. 看Tesla不要先问"FSD涨多少", 先问"$25B/年Capex能否转化为高ROIC AI/Robotaxi/Optimus资产, ROIC从22%是否压缩到15-18%?"**

---

## 附录A — Owner Earnings双口径详细 [B-comp]

**Owner Earnings双口径** (避免v4.1的"严格可复算"绝对化措辞):

**口径1 — Gross SBC**:
- Net Income (common shareholders): $477M [A-deck]
- SBC gross: $1,030M [A-10Q]
- Owner Earnings = $477M - $1,030M = **-$553M** [B-comp]
- Owner EPS = **-$0.156** [B-comp]

**口径2 — Net-of-tax SBC**:
- Net Income: $477M [A-deck]
- SBC net of tax: $803M [A-deck Tesla non-GAAP reconciliation]
- Owner Earnings = $477M - $803M = **-$326M** [B-comp]
- Owner EPS = **-$0.092** [B-comp]

**口径选择是分析判断**: gross SBC更保守 (假设SBC全部稀释), net-of-tax SBC更接近Tesla non-GAAP视角. 我们呈现双口径让读者判断, 不强制单一口径.

**Q2 2026 Owner EPS预测** [D-model]:

| 情景 | Q2 Operating Income | Q2 EPS (GAAP) | Q2 Owner EPS (gross SBC) | Q2 Owner EPS (net SBC) |
|------|----------------------|---------------|--------------|--------------|
| 乐观 | $1.0B | $0.18 | -$0.07 | -$0.04 |
| 基础 | $400M | $0.11 | -$0.18 | -$0.13 |
| 悲观 | $200M | $0.07 | -$0.22 | -$0.17 |

**两个口径都为负** — 含义: Owner Earnings连续负数将持续1-2个季度, 直到SBC peak过去 + 监管积分见底.

---

## 附录B — PE附录 (修正)

**v4.1错误**: PE附录写"GAAP PE 728x (TTM EPS $0.52)". 这是错误.

**正确计算** [B-comp]:
- TTM GAAP EPS (Q2'25 + Q3'25 + Q4'25 + Q1'26) = $0.33 + $0.39 + $0.24 + $0.13 = **$1.09** [B-comp]
- TTM Non-GAAP EPS = $0.40 + $0.50 + $0.50 + $0.41 = **$1.81** [B-comp]
- GAAP TTM PE = $378.67 / $1.09 = **347x** (vs v4.1错误728x)
- Non-GAAP TTM PE = $378.67 / $1.81 = **209x**

**三PE并列 (财务章节口径, v4.2修正)**:

| PE类型 | 值 | 含义 |
|--------|-----|------|
| GAAP TTM PE | **347x** | 含全部会计项目 |
| Non-GAAP TTM PE | 209x | 剥离SBC + 一次性 |
| Owner PE (gross SBC) | N/A (Owner Earnings负数) | SBC > NI → 无意义 |
| Forward P/E (consensus FY2026E EPS $2.50) | $378.67 / $2.50 = 151x | 市场前瞻定价 |
| Forward Owner PE (我们的base case $1.62-1.86) | $378.67 / $1.74 = 217x | 我们的base case |

**关键观察**:
- GAAP TTM 347x vs 行业平均15-20x = 17-23x溢价
- Non-GAAP TTM 209x vs SaaS高端30-40x = 5-7x溢价
- 各种PE指标都显示估值偏高, 但程度比v4.1错误的"728x"更准确

[DM-B-comp-011] TTM GAAP EPS $1.09 (4季度和)
[DM-B-comp-012] TTM Non-GAAP EPS $1.81
[DM-B-comp-013] GAAP TTM PE 347x (修正v4.1的728x错误)

---

## 附录C — 大师圆桌 (移自主文, 内部审计视角)

**重要免责**: Buffett / Munger / Marks / Druckenmiller / Klarman / Bill Miller的视角是我们**根据其投资哲学的解读**, **除Cathie Wood (ARK Invest有公开TSLA持仓和target $2,600)外, 其他大师没有公开TSLA评论或持仓**. 这部分作为"投资风格分歧"的内部启发, **不应作为前台报告的主估值证据**.

| 大师 | 评级倾向 | 核心理由 (我们的解读) |
|------|------|---------|
| Buffett-style | 不投资 (too hard) | 能力圈外 + Owner Earnings双口径都为负 |
| Munger-style | 审慎关注 | 承诺-达成gap + 多重单点失败 |
| Marks-style | 审慎关注 | 周期反转 + 风险/收益不对称 |
| Druckenmiller-style | 减仓信号 | 宏观利率 + Magnificent 7 reversion |
| Klarman-style | 明确卖出 | 零安全边际 + 多重red flags |
| **Cathie Wood** (公开持仓+target) | 全仓买入 | $2,600/2029, AI/Disruption四引擎 |
| Bill Miller-style | 中性偏多 | 等回调$250-300买入, 长期目标$700+ |

---

## 附录D — v4.0 → v4.1 → v4.2 修正流程

| 维度 | v4.0 | v4.1 | v4.2 |
|------|------|------|------|
| 结构 | 34章后台稿 | 9章主文 + 附录 | 9章主文 + 附录 (Energy/EV-OAB/PE全面修正) |
| 证据分级 | 无 | A/B/C/D | A-deck/A-10Q/A-call/A-product/B-comp/C-third-party/D-model (细化) |
| 现金口径 | $76B错误 | $44.7B (主文)/$35.5B (附录冲突) | $35.5B净现金统一 |
| Energy GM | 39.5%标为错误 | "失速"叙事 | **39.5% [B-comp]从10-Q复算确认, 量价错位叙事** |
| Energy SOTP | $50-75B | $50-75B | **$70-120B (中性, 上调$30-40B)** |
| FSD ARR | 简单乘$1.52B | 简单乘$1.52B | **理论上限$1.52B, 含upfront混合, 不是严格ARR** |
| FSD SOTP | $50-100B | $50-100B | **$40-100B (区间下沿下修, 因ARR口径)** |
| Services归因 | 主要给FSD | 主要给FSD | **FSD可能进automotive ancillary, Services GM 9.2%不是软件池** |
| EV/OAB | 35.3x (PP&E $55.95B) | 35.3x | **22-30x三口径 (PP&E $43.213B, 中口径24.7x为主)** |
| GAAP TTM PE | 未明示 | 728x错误 | **347x正确** |
| Owner Earnings | 单一-$539M | 单一-$539M | **双口径: gross -$553M / net -$326M** |
| 加权目标 | $200-201 | $199 | **~$210 (Energy修正后)** |
| 溢价 | 88-90% | 90% | **80%** |
| 评级 | 审慎关注 (临界) | 审慎关注 (临界, 高争议) | 审慎关注 (临界, 高争议) **不变** |
| AI5措辞 | "tape-out延迟2年" | "tape-out 2026-04-15" | **"完成最终芯片设计, 量产时间待验证"** |
| 行动建议 | 买入/卖出 | 买入$250-300/卖出$500 | **观察区/重新评估区/高风险区/Thesis break** |

**v4.2核心进步**:
1. Energy重写 — 从"失速"改为"量价错位", SOTP上调$30-40B/scenario
2. EV/OAB三口径重做 — PP&E $43.213B官方, EV/OAB 22-30x区间 (非35.3x peak)
3. PE附录修正 — 347x (vs 728x错误)
4. FSD ARR口径降温 — 不是严格ARR
5. Services归因修正 — FSD可能进automotive ancillary
6. Owner Earnings双口径 — gross + net of tax
7. Net cash口径统一 — $35.5B
8. AI5措辞精确化 — "完成最终芯片设计"
9. 行动建议改为观察区 — 不像交易指令
10. 证据分级细化 — A-deck/A-10Q/A-call/A-product

---

## 附录E — DM锚点详细索引

### E.1 [A-deck] Tesla shareholder deck披露

[DM-A-deck-001] Q1'26 Revenue $22.387B
[DM-A-deck-002] Q1'26 GAAP EPS $0.13 / Non-GAAP EPS $0.41
[DM-A-deck-003] Q1'26 汽车GM ex-credits 19.2%
[DM-A-deck-004] Q1'26 监管积分$380M
[DM-A-deck-005] Q1 FSD subscribers 1.28M
[DM-A-deck-006] Q4 2025 Energy GM 29.8% record
[DM-A-deck-007] Q1'26 Energy storage 8.8 GWh
[DM-A-deck-008] Q1 Robotaxi paid miles 1.7M
[DM-A-deck-009] Q1 Optimus 2026目标50-100K
[DM-A-deck-010] Tesla Fremont late July/August启动Optimus量产
[DM-A-deck-011] AI5 inference processor "completed the final chip design"
[DM-A-deck-012] V3 Optimus单位成本目标$20-25K
[DM-A-deck-013] Tesla 2026 Capex指引$25B (从1月$20B上调)
[DM-A-deck-014] SBC net of tax $803M
[DM-A-deck-015] Common stockholders Net Income $477M
[DM-A-deck-016] FSD累计英里 7.1B (历史披露)
[DM-A-deck-017] Cortex 2规模130K H100-equiv

### E.2 [A-10Q] Tesla 10-Q财务报表

[DM-A-10Q-001] Q1'26 综合GP margin 21.08%
[DM-A-10Q-002] Q1'26 OCF $3.937B
[DM-A-10Q-003] Q1'26 Capex $2.493B
[DM-A-10Q-004] Q1'26 Cash + ST inv $44.743B
[DM-A-10Q-005] Q1'26 Total debt $9.229B
[DM-A-10Q-006] Q1'26 SBC gross $1.030B
[DM-A-10Q-007] Active FSD Subscriptions包括up-front payment + monthly subscriptions, 排除free trials
[DM-A-10Q-008] Q1'26 Energy revenue $2.408B
[DM-A-10Q-009] Q1'26 Energy cost of revenue $1.456B
[DM-A-10Q-010] Q1'26 Services & Other revenue $3.745B
[DM-A-10Q-011] Q1'26 Services & Other cost of revenue $3.399B
[DM-A-10Q-012] Tesla 10-Q收入解释: Services + automotive ancillary sales (FSD为主)
[DM-A-10Q-013] Q1'26 PP&E (net) $43.213B
[DM-A-10Q-014] Q1'26 Operating lease vehicles $4.530B
[DM-A-10Q-015] Q1'26 Energy generation and storage systems $4.565B
[DM-A-10Q-016] Q1'26 Operating lease right-of-use assets $6.332B
[DM-A-10Q-017] Q1'26 Inventory $14.434B
[DM-A-10Q-018] Q1'26 AR $3.959B
[DM-A-10Q-019] Q1'26 AP $14.696B
[DM-A-10Q-020] Q1'26 Total Assets $143.72B
[DM-A-10Q-021] Q1'26 R&D $1.34B
[DM-A-10Q-022] Q1'26 SG&A $1.35B

### E.3 [A-call] Tesla earnings call

[DM-A-call-001] AI5 chip量产时间表 (call提到tape-out但deck表达为"completed final chip design")
[DM-A-call-002] Megapack pricing pressure from China entrants (Q1 call)
[DM-A-call-003] Capex指引$25B (从$20B上调) Q1 2026 call
[DM-A-call-004] HW3不能unsupervised FSD (Musk Q1 admission)
[DM-A-call-005] HW4 retrofit "we'll continue to improve FSD on all hardware" (模糊化)

### E.4 [A-product] Tesla产品页 / IR press release

[DM-A-product-001] Q1 FSD月费$99 (Tesla product page)
[DM-A-product-002] Q1 2026 deliveries 358,023辆 (Tesla IR 2026-04-02)
[DM-A-product-003] Tesla Robotaxi pricing $3 base + $1.40/mile

### E.5 [B-comp] 可复算数据

[DM-B-comp-001] Q1'26 FCF $1.444B = OCF - Capex
[DM-B-comp-002] Q1'26 Net cash $35.5B = $44.743B - $9.229B
[DM-B-comp-003] Q1'26 DPO 71天 = AP / (Annualized COGS / 365)
[DM-B-comp-004] Q1'26 Energy GP $952M = $2.408B - $1.456B
[DM-B-comp-005] Q1'26 Energy GM 39.5% = $952M / $2.408B
[DM-B-comp-006] Q1'26 Services GP $346M, GM 9.2%
[DM-B-comp-007] Reverse DCF: $378.67隐含5年Revenue $260-300B + 20-24% margin
[DM-B-comp-008] EV/OAB窄口径29.5x
[DM-B-comp-009] EV/OAB中口径24.7x
[DM-B-comp-010] EV/OAB宽口径22.2x
[DM-B-comp-011] TTM GAAP EPS $1.09
[DM-B-comp-012] TTM Non-GAAP EPS $1.81
[DM-B-comp-013] GAAP TTM PE 347x (修正)
[DM-B-comp-014] Owner Earnings (gross SBC) -$553M = $477M - $1,030M
[DM-B-comp-015] Owner Earnings (net SBC) -$326M = $477M - $803M
[DM-B-comp-016] Auto Revenue YoY增量 +$2,239M
[DM-B-comp-017] Energy revenue YoY -$328M
[DM-B-comp-018] Services Revenue YoY +$1,108M (+42%)
[DM-B-comp-019] EV $1,385B = Market Cap + Total debt - Cash
[DM-B-comp-020] Auto ex-credits改善 +670bps = 19.2% - 12.5%
[DM-B-comp-021] 监管积分占汽车收入1.94%
[DM-B-comp-022] SBC/Revenue Q1'26 4.6%
[DM-B-comp-023] Asset Turnover (LTM) 0.681

### E.6 [C-third-party] 第三方券商/媒体

[DM-C-third-party-001] MarketWatch: Tesla需达到10M订阅以兑现Musk薪酬包
[DM-C-third-party-002] Wells Fargo一次性$480M估算 (单源, Tesla未量化)
[DM-C-third-party-003] MS Tesla Robotaxi $0.81/mile (单源)
[DM-C-third-party-004] Robotaxi Tracker / TechBuzz / Fortune: Tesla 89辆 vs Waymo 700+辆
[DM-C-third-party-005] Cern Basher analysis 2026-03: Tesla Robotaxi pricing
[DM-C-third-party-006] Reuters 2026-04-22: 市场对Capex反应
[DM-C-third-party-007] Barron's 2026-04-22: $25B Capex指引报道
[DM-C-third-party-008] Energy-Storage.News: Tesla Q4 2025 Energy GM 29.8%
[DM-C-third-party-009] BNEF 2026 storage market global预期+25-30%
[DM-C-third-party-010] Bloomberg consensus FY2026E EPS ~$2.50-3.00
[DM-C-third-party-011] Electrek $14.5B max法律风险敞口
[DM-C-third-party-012] Munster, Kuo HW3 risk被低估警告
[DM-C-third-party-013] notebookcheck: HW4线束与HW3不兼容
[DM-C-third-party-014] Sony IMX/OmniVision 5MP汽车级模组OEM价$40-80/颗
[DM-C-third-party-015] Magnificent 7 Q1 2026表现: META -15% / MSFT -8% / GOOG -10%
[DM-C-third-party-016] Optimusk.blog / Helpforce.ai: Optimus 2026目标50-100K是hopium

### E.7 [D-model] 我们的模型假设

[DM-D-model-001] 2026E FCF -$10~15B
[DM-D-model-002] 2026E现金消耗 $44.7B → $30-35B
[DM-D-model-003] ROIC压缩传导: 22% → 15-18%
[DM-D-model-004] FSD SOTP重新校准 $40-100B区间
[DM-D-model-005] Energy SOTP重估 保守$70-90B / 中性$90-120B / 乐观$120-160B
[DM-D-model-006] v4.2加权目标 ~$210
[DM-D-model-007] FSD revenue可能跨Services和Automotive两个segment
[DM-D-model-008] Services GM 9.2%非纯软件利润池
[DM-D-model-009] v4.2 SOTP三情景per-share: 保守$183 / 中性$213 / 乐观$302
[DM-D-model-010] v4.2加权目标$210 (Auto/Capex调整后)
[DM-D-model-011] v4.2溢价80%
[DM-D-model-012] HW3 retrofit加权$7.1B
[DM-D-model-013] HW3 法律加权$6.85B
[DM-D-model-014] HW3 hidden liability $7-14/share
[DM-D-model-015] Robotaxi monitor真实成本 $0.40-0.60/mile
[DM-D-model-016] Robotaxi 当前真实cost-per-mile (含monitor) $0.75-0.95
[DM-D-model-017] Optimus 2026真实交付2-15K
[DM-D-model-018] Optimus工程难度估算高于Cybertruck 3-5x
[DM-D-model-019] 2026 Capex爬坡 Q1 $2.5B → Q4 $4-5B
[DM-D-model-020] 2027 Capex估算$20-23B
[DM-D-model-021] 2028 Capex估算$25B+
[DM-D-model-022] AI5应用端推理芯片vs Cortex 2/Dojo 3训练端
[DM-D-model-023] AI5 + HW3 churn联动是2027-2028最深财务风险
[DM-D-model-024] 历史基准率: Tesla重大目标达成中性概率40-50%
[DM-D-model-025] 概率分布50%/35%/15% (诚实) vs 60%/30%/10% (温和)
[DM-D-model-026] 风险/收益不对称: 下行/上行2.16x
[DM-D-model-027] 路径A (基本面miss + 情绪normalize): -47%
[DM-D-model-028] 7引擎独立成功概率乘积近1%
[DM-D-model-029] 7引擎至少3成功概率~50%
[DM-D-model-030] Tesla类比: AMZN 2003-2010 + TSM 2018-2020 + Intel 2014-2018 之间
[DM-D-model-031] Tesla deep equity duration ~30年, 利率敏感度高
[DM-D-model-032] H&S top形成 ($400+ resistance with neckline at $370)
[DM-D-model-033] R-3异议比例 5/7 = 71% > 阈值
[DM-D-model-034] R-4黑箱SOTP加权44%
[DM-D-model-035] R-4可推演度55% / 复杂度5/5 / 黑箱平均52%
[DM-D-model-036] HW3 Bottom-up retrofit BOM $1,070-2,090
[DM-D-model-037] HW3 Labor成本$600-2,400
[DM-D-model-038] HW3 Tesla内部成本/车 $1,920-5,160 (中值$3,200)
[DM-D-model-039] HW3 4M车队取用率情景: 25%/50%/75% × 概率30%/50%/20%
[DM-D-model-040] HW3 法律风险加权 7宗诉讼
[DM-D-model-041] HW3 5个负面传导维度
[DM-D-model-042] FSD续订率SaaS自然churn 5-10%/年
[DM-D-model-043] Robotaxi 2030 fleet 100K辆 = 1,124x scale-up
[DM-D-model-044] Robotaxi monitor消除时间表
[DM-D-model-045] Robotaxi 2027-2028稳态cost-per-mile $0.45-0.65
[DM-D-model-046] Robotaxi excl. monitor成本 Tesla $0.66 / Waymo $1.10
[DM-D-model-047] Optimus 2030 production 2-3M units (vs 初步估算的5M)
[DM-D-model-048] Optimus阶段1/2/3模型
[DM-D-model-049] Optimus B2C家用50-100M units/yr全球潜在
[DM-D-model-050] Auto 2026E GM 14-17% (压力测试)
[DM-D-model-051] Auto降价风险概率30-40%
[DM-D-model-052] Auto Volume vs Margin tradeoff历史规律
[DM-D-model-053] Megapack ASP 2026Q1降至$280-320/kWh, -10-15% YoY
[DM-D-model-054] Energy混合产品口径 (Megapack/Powerwall/Solar)
[DM-D-model-055] Energy真实可持续区间 (vs Q1 39.5%阶段性vs持续性)
[DM-D-model-056] Q2 2026 GAAP EPS预测: 乐观$0.18 / 基础$0.11 / 悲观$0.07
[DM-D-model-057] Q2 2026 Owner EPS双口径预测
[DM-D-model-058] AI5延迟实际6-12个月 (vs 初步估算"2年")
[DM-D-model-059] EV/OAB 22-30x区间 (vs v4.0/v4.1 35.3x peak错误)
[DM-D-model-060] EV/OAB倍数压缩传导: 现状 → AMZN扩产期 → -35-50%下行
[DM-D-model-061] 基本面合理估值$200-220 / 情绪正常区间$305-345
[DM-D-model-062] WACC假设9-10% → 10-11% (Auto/Capex调整后)
[DM-D-model-063] SOTP 50%/35%/15%加权$216
[DM-D-model-064] SOTP 60%/30%/10%加权$213
[DM-D-model-065] Auto/Capex调整后加权~$210

---

**END (v4.2)**

---

## 附录F — 因果链汇总 (主线传导)

> 因为前台主文聚焦投资判断, 因此因果链在附录展开. 这意味着读者可以从因果链回溯证据.

**核心因果链1 (Energy量价错位)**:
因为Q4 2025 Energy GM 29.8% record [A-deck] 是Tesla历史高点, 因此Q1 2026 GM达到39.5% [B-comp] 出乎市场预期. 但因为量-15.4% YoY [A-deck] + 收入-12% YoY [A-10Q], 这意味着出现"量价错位". 因为Tesla未拆分tariff benefit / 项目mix / 成本节奏的具体贡献 [A-call], 因此39.5%是阶段性还是持续性需要Q2/Q3验证. 这解释了为什么Energy SOTP从v4.1的"$50-75B失速"修正为v4.2的"$90-120B量价错位".

**核心因果链2 (Capex 4x跳升)**:
因为Capex指引从$20B提到$25B [A-call] (Barron's 2026-04-22 [C-third-party]), 而LTM仅$9.5B [A-10Q], 因此差距$15.5B [B-comp]. 因为设备lead time 12-18个月 [D-model], 因此$25B真正落地2028+ [D-model]. 这意味着$25B不是2026立刻冲击, 是2027-2029累积压力. 这解释了为什么估值方法应从PE/PEG切换到EV/OAB, 因此Tesla重新归类为"资本密集型AI工业平台".

**核心因果链3 (FSD ARR口径模糊)**:
因为Tesla Active FSD Subscriptions指标包括up-front payment + monthly subscriptions [A-10Q], 因此1.28M不是纯月订阅用户. 这意味着简单乘$99 × 12计算ARR不严格. 因为Tesla未披露monthly vs upfront比例 [A-10Q], 因此严格ARR无法计算. 这解释了为什么FSD SOTP需要从v4.1的"$50-100B SaaS逻辑"调整为v4.2的"$40-100B (口径降温)".

**核心因果链4 (Services GM 9.2%)**:
因为Services & Other GM仅9.2% [B-comp] = $346M / $3.745B, 因此Services不是纯软件利润池. 因为Tesla 10-Q解释收入增长由Services + automotive ancillary sales (FSD为主)联合推动 [A-10Q], 这意味着FSD很可能跨两个segment. 因此v4.1将FSD全部归入Services的归因不准确. 这解释了为什么"软件化"叙事需要等Tesla单独披露FSD revenue recognition才能严肃讨论.

**核心因果链5 (EV/OAB三口径)**:
因为Tesla 10-Q官方PP&E (net) $43.213B [A-10Q], 不是FMP聚合的$55.95B, 因此v4.0/v4.1的"OAB $39.2B调整后"是错误baseline. 因为10-Q单独列出Operating lease vehicles $4.530B / Energy systems $4.565B / Operating lease ROU $6.332B [A-10Q], 因此OAB应该有窄/中/宽三口径. 这意味着EV/OAB是22-30x区间, 不是35.3x peak. 这解释了为什么Tesla估值"高端AI区间但非NVDA peak"的更平衡判断.

**核心因果链6 (HW3 hidden liability)**:
因为4M HW3车辆 [D-model] 物理无法支持L4 [A-call承认], 因此FSD subscription续订率有churn风险 [D-model]. 因为加州DMV判决FSD营销虚假 [C-third-party] + 集体诉讼立案 [C-third-party], 因此法律风险$5-10B加权暴露 [D-model]. 这意味着HW3是hidden liability, 跨5个维度负面传导. 这解释了我们单独减项$7-14/share [D-model], 不在SOTP正向分子内.

**核心因果链7 (5对2大师分歧)**:
因为价值派 (Buffett-style) 看Owner Earnings双口径都为负 [B-comp], 因此明确看空. 因为审慎成长派 (Munger/Marks) 看承诺-达成gap [D-model] + 周期反转, 因此谨慎. 因为Disruption派 (Cathie Wood [C-third-party有公开持仓]) 看四引擎规模化, 因此看多 $2,600/2029. 因为GARP派 (Bill Miller-style) 看dip buy strategy, 因此等回调$250-300. 这意味着市场分歧真实化, 这解释了为什么不是"全部看空"的confirmation bias.

**核心因果链8 (V型修复部分一次性)**:
因为汽车GM (ex-credits)从12.5%恢复到19.2% [A-deck], 因此V型修复是真实的. 但因为Wells Fargo [C-third-party] 估算Q1 EBIT beat 70%来自一次性, 因此剥离tariff $250M + warranty $230M [C-third-party]后真实normalized GM ~16.8% [D-model]. 这意味着V型修复部分依赖会计技巧. 因为Tesla未量化"一次性" [A-deck], 这解释了为什么我们用"压力测试口径"标注而非Tesla官方Non-GAAP.

**核心因果链9 (Owner Earnings双口径都为负)**:
因为gross SBC $1,030M [A-10Q] > Net Income $477M [A-deck], 因此Owner Earnings (gross) -$553M [B-comp]. 因为net-of-tax SBC $803M [A-deck] 仍 > Net Income, 因此Owner Earnings (net) -$326M [B-comp]. 这意味着两个口径下股东实际回报都为负. 因此从owner economics视角, GAAP盈利不等于股东回报. 这解释了为什么Buffett-style视角"too hard类别".

**核心因果链10 (Magnificent 7 reversion)**:
因为Magnificent 7 P/S普遍收缩 [C-third-party] (META -15% / MSFT -8% / GOOG -10%), 因此整个mega-cap tech处于reversion期. 但因为Tesla有independent narrative (Robotaxi/Optimus), 因此跟随但未显著更糟 (Tesla -11%). 这意味着Tesla的多重narrative既是支撑也是风险源. 因为Tesla deep equity duration ~30年 [D-model], 因此利率敏感度比成熟科技股高. 这解释了Druckenmiller-style"减仓信号"判断.

---

## 附录G — 补充DM锚点 (扩展, 全证据分级)

### G.1 [A-10Q]扩展

[DM-A-10Q-023] Q1'26 Common stockholders Net Income $477M
[DM-A-10Q-024] Q1'26 Net Income (含其他股东) $491M
[DM-A-10Q-025] Q1'26 利息收入$434M
[DM-A-10Q-026] Q1'26 利息支出$92M
[DM-A-10Q-027] Q1'26 其他非经营性+$101M
[DM-A-10Q-028] Q1'26 Pre-tax Income $748M
[DM-A-10Q-029] Q1'26 所得税$257M / 有效税率34.4%
[DM-A-10Q-030] Q1'26 加权稀释股数3,538M
[DM-A-10Q-031] Q1'26 deliveries 358,023辆
[DM-A-10Q-032] Q1'26 Cybertruck +111% YoY
[DM-A-10Q-033] Q1'26 Long-term debt $7.782B
[DM-A-10Q-034] Q1'26 Current debt $1.447B
[DM-A-10Q-035] Q1'26 Cash flow from financing +$1.17B
[DM-A-10Q-036] Q1'26 Net debt issuance +$0.79B
[DM-A-10Q-037] Q1'26 AP从Q4 $13.4B → Q1 $14.7B = +$1.3B
[DM-A-10Q-038] Q1'26 deferred revenue (FSD) ~$3.6B (Q1 2025口径延续)
[DM-A-10Q-039] Q1'25 Auto Revenue $13,995M
[DM-A-10Q-040] Q1'25 Energy Revenue $2,736M
[DM-A-10Q-041] Q1'25 Services Revenue $2,637M
[DM-A-10Q-042] Q1'25 Auto GM (ex-credits) 12.5%
[DM-A-10Q-043] Q4'25 Auto GM (ex-credits) 17.9% record
[DM-A-10Q-044] Q4'25 Energy storage 14.2 GWh record
[DM-A-10Q-045] Q4'25 PP&E $40.6B (FMP聚合, 非10-Q单独)

### G.2 [A-deck]扩展

[DM-A-deck-018] Tesla 2026 Optimus目标50-100K (Update Letter)
[DM-A-deck-019] Tesla Robotaxi Austin + Dallas服务 (Update Letter)
[DM-A-deck-020] Cortex 2 130K H100-equiv
[DM-A-deck-021] AI5 chip性能 10x AI4
[DM-A-deck-022] Samsung $16.5B制造AI6合同
[DM-A-deck-023] Terafab $20B Austin chip fab
[DM-A-deck-024] FSD累计英里 7.1B
[DM-A-deck-025] Q1'26 Tesla 178万年交付预期
[DM-A-deck-026] Cybertruck Q1 ~13K交付 (推算from Other Models 16,130)

### G.3 [B-comp]扩展

[DM-B-comp-024] Asset Turnover (LTM Rev / Total Assets) = 97.88 / 143.72 = 0.681
[DM-B-comp-025] Asset Turnover (平均资产) = 0.728
[DM-B-comp-026] Reinvestment Rate (Capex/OCF) = 9.52 / 16.53 = 57.6%
[DM-B-comp-027] Tesla EV/Revenue = $1,385 / $97.88 = 14.1x
[DM-B-comp-028] Tesla EV/EBITDA (LTM) = $1,385 / ~$15B = 92x
[DM-B-comp-029] Tesla P/B = $1,420 / ~$80B equity = 17.7x
[DM-B-comp-030] Tesla Forward P/E (consensus FY2026E EPS $2.50) = 151x
[DM-B-comp-031] Tesla PEG (consensus growth 30%) = 5.0x
[DM-B-comp-032] Tesla Capex/Revenue: 2024 11.6% / 2025 8.7% / 2026指引25.6%
[DM-B-comp-033] Tesla 债务/EBITDA = 9.2 / 15 = 0.6x
[DM-B-comp-034] Q1'26 LTM Revenue $97.88B = 22.4 + 24.9 + 28.1 + 22.5
[DM-B-comp-035] Q1'26 LTM OCF $16.53B
[DM-B-comp-036] Q1'26 LTM FCF $7.00B
[DM-B-comp-037] Q1'26 Operating Margin = 941 / 22,387 = 4.2%
[DM-B-comp-038] Net debt Q1'26 = -$35.5B (净现金状态强健)
[DM-B-comp-039] Tesla EV $1,385B
[DM-B-comp-040] Cybertruck爬产2024: 5K → 17K (3.4x ramp)
[DM-B-comp-041] Cybertruck 2024年实际交付 ~50K vs 250K原计划 (20%达标)
[DM-B-comp-042] Cybertruck 2025年交付~80K (32%达标)
[DM-B-comp-043] FSD Take rate Q1'26 = 1.28M / 9.26M = 13.83%
[DM-B-comp-044] Auto Revenue YoY增量分解: 量+$887M + Mix+$650M + 价/其他+$702M = $2,239M
[DM-B-comp-045] Energy revenue -$328M = 量-$420M + 价格反弹+$92M
[DM-B-comp-046] Services Revenue +$1,108M / Q1'25 baseline $2,637M = +42% YoY
[DM-B-comp-047] Tesla Robotaxi 89辆产生1.7M miles → 每辆年化~76K miles (Q1单季extrapolation)
[DM-B-comp-048] Tesla Robotaxi $0.81/mile × 50K miles × $1/mile GP = $40,500/yr/vehicle
[DM-B-comp-049] Tesla Robotaxi理论payback ~1.7年

### G.4 [D-model]扩展

[DM-D-model-066] HW3 retro-fit成本$2-8K中值$3.2K
[DM-D-model-067] HW3 4M车辆潜在成本$20-60B
[DM-D-model-068] HW3 SEC调查触发条件: 集体诉讼立案/法院判决/SEC主动
[DM-D-model-069] HW3 disclosure短期股价影响 -15-25%
[DM-D-model-070] HW3 总暴露$11-33B加权
[DM-D-model-071] HW3 处置选项: 免费retro-fit/Refund/Best efforts (当前路径)
[DM-D-model-072] FSD HW3 churn计算 ~$1.4B (200K subscriber × $99 × 12 × 6x)
[DM-D-model-073] Robotaxi 2030 fleet情景: 100K (保守推迟) / 100K by 2030 (中性) / 50K by 2027 + 100K by 2029 (乐观)
[DM-D-model-074] AI5/chip 2030 cash flow generation $2-14B
[DM-D-model-075] Optimus 2030 production 2-3M (vs 初步估算5M)
[DM-D-model-076] Energy 2026E Revenue情景: $10B/$11B/$12B
[DM-D-model-077] Energy稳态margin情景: 25%/30%/35% (vs v4.1 18%/22%/25%, 上调因Q1 39.5% [B-comp])
[DM-D-model-078] Auto core SOTP保守: $250-280B / 中性: $270-300B / 乐观: $290-320B
[DM-D-model-079] WACC 9-10% (基础) → 10-11% (Auto/Capex调整后)
[DM-D-model-080] SOTP概率分布50%/35%/15% (诚实) vs 60%/30%/10% (温和) 加权差异+1%
[DM-D-model-081] Auto/Capex调整后中性Per-share: $213 → $208 (微调)
[DM-D-model-082] HW3调整后加权目标: $210 - $7-14 = $196-203/share
[DM-D-model-083] Reverse DCF: $378.67隐含5年Revenue $260-300B + 20-24% margin (回到21%+22%假设)
[DM-D-model-084] EV/OAB倍数压缩传导: 现状22-30x → AMZN扩产期12-18x → -35-50%下行 (vs v4.1 -45-55%, 因基线下移)
[DM-D-model-085] 7引擎独立成功概率: Auto 50% / FSD 50% / Robotaxi 30% / Optimus 20% / AI5 70% / Energy 60% / HW3不发酵 70%
[DM-D-model-086] 7引擎全部成功概率: 0.88% (近1%)
[DM-D-model-087] 7引擎至少1失速概率: 99.12%
[DM-D-model-088] 7引擎至少3成功概率: ~50% (二项分布)
[DM-D-model-089] Tesla历史5案例达成率: Model 3 60% / FSD 10% / Cybertruck 40% / Solar 30% / Energy 40%
[DM-D-model-090] 历史基准率: Tesla重大目标达成中性概率40-50%
[DM-D-model-091] 风险/收益不对称: 下行$173 (-54%) / 上行$282 (-25%) / 比2.16x
[DM-D-model-092] 路径A (基本面miss + 情绪normalize): $378.67 → $200 (-47%)
[DM-D-model-093] 路径B (情绪normalize但基本面持续): -10-20%
[DM-D-model-094] 路径C (基本面beat + 情绪保持): +20-30%
[DM-D-model-095] 路径A触发概率~50%
[DM-D-model-096] 基本面合理估值$200-220 / 情绪正常区间$305-345
[DM-D-model-097] 当前过热溢价10-20%
[DM-D-model-098] Q2 2026 GAAP EPS预测: 乐观$0.18 / 基础$0.11 / 悲观$0.07
[DM-D-model-099] Q2 2026 Owner EPS双口径预测 (gross + net of tax)
[DM-D-model-100] Bloomberg consensus FY2026E EPS ~$2.50-3.00 vs base case $1.62-1.86 (35-45% gap)


---

## 附录H — 其他DM锚点与因果链补充

[DM-A-deck-027] Q1'26 Auto Revenue $16.234B (+16% YoY)
[DM-A-deck-028] Q1'26 Energy & Storage Revenue $2.408B (-12% YoY)
[DM-A-deck-029] Q1'26 Services & Other Revenue $3.745B (+42% YoY)
[DM-A-deck-030] Q1'26 Tesla 4M HW3 vehicles deployed (cumulative)
[DM-A-deck-031] Tesla Q1 2026 Capex $2.493B (Q1 quarterly)

[DM-A-call-006] Tesla call: "持续移除safety monitors" (无具体时间表)
[DM-A-call-007] Tesla call: 2026 Optimus 50-100K目标
[DM-A-call-008] Tesla call: AI5 inference processor design completion

[DM-B-comp-050] Q1'26 综合GP margin: 21.08% = $4.72B / $22.387B
[DM-B-comp-051] Auto GM YoY改善: +670bps = 19.2% - 12.5%
[DM-B-comp-052] Q1 监管积分占汽车收入1.94%
[DM-B-comp-053] Q1 SBC/Revenue 4.6% vs Q1'25 3.0%
[DM-B-comp-054] LTM Q1'26 Operating Income (剥离一次性): $3.5-4B
[DM-B-comp-055] Implied LTM core operating margin: 3.6-4.1%
[DM-B-comp-056] Q1'26 OPEX (R&D + SG&A) $2.69B
[DM-B-comp-057] Q1'26 Auto Inventory days 17 (vs Q1'25 24, -7天)
[DM-B-comp-058] Q1'26 84.6% capacity utilization (358K交付 / 410K production capacity估算)

[DM-C-third-party-017] Wells Fargo (Colin Langan): Q1 EBIT beat $600M+, $420M (70%)来自一次性
[DM-C-third-party-018] Electrek 2026-04-22: tariff $250M + warranty $230M = $480M一次性估算
[DM-C-third-party-019] Cars With Cords 2026-03: FSD subscription tracking
[DM-C-third-party-020] TheStreet 2026-03: Robotaxi fleet 89辆Model Y in Austin
[DM-C-third-party-021] NYT 2026-03: Waymo fleet 700+辆主要服务Phoenix
[DM-C-third-party-022] CNBC: 政治品牌损害 (欧洲市占率1.0%→0.8%)
[DM-C-third-party-023] Polymarket Tesla Robotaxi 2027市场化概率 (公开预测市场)
[DM-C-third-party-024] Diaz v. Tesla历史和解 ($137M → $3.2M压降96%)
[DM-C-third-party-025] notebookcheck: HW4连接器不能直接swap
[DM-C-third-party-026] Tradingkey 2026-04: Tesla Q1 2026 Energy storage 8.8 GWh

[DM-D-model-101] FSD ARR严格定义需要monthly subs / upfront-paid / churn / ARPU四个变量
[DM-D-model-102] FSD monthly subs占比假设: 60% (保守) / 70% (中性) / 80% (乐观)
[DM-D-model-103] FSD等效monthly ARR: $0.8-1.2B (保守) / $1.2-1.5B (中性) / $1.5-2.5B (乐观)
[DM-D-model-104] FSD SOTP修正后区间: $40-100B (vs v4.1 $50-100B)
[DM-D-model-105] Energy GM 39.5%可持续性核查Q2/Q3 (Kill Switch新增)
[DM-D-model-106] Energy项目mix偏向高margin Megapack (>80%占比假设)
[DM-D-model-107] Tariff benefit (Q1'26 tariff环境)对Energy GM的具体贡献 — Tesla未拆分
[DM-D-model-108] Battery cell成本下降的滞后效应对Energy GM的贡献
[DM-D-model-109] Energy阶段性vs持续性分辨指标: Q2/Q3 GM <30%多季度 → 阶段性确认
[DM-D-model-110] EV/OAB窄口径29.5x (PP&E + Inventory + AR - AP)
[DM-D-model-111] EV/OAB中口径24.7x (含Energy systems + Operating lease vehicles)
[DM-D-model-112] EV/OAB宽口径22.2x (含Operating lease ROU)

**额外因果链补充** (附录H的扩展):

因为Tesla Energy Q1 GM从历史~24.6%升至39.5% [B-comp], 这意味着利润质量大幅改善. 但因为同期量-15.4% YoY [A-deck], 因此出现"量价错位". 这解释了为什么Energy SOTP从v4.1的"$50-75B失速"修正为v4.2的"$90-120B量价错位".

因为Tesla 10-Q官方PP&E (net) $43.213B [A-10Q], 不是FMP聚合的$55.95B, 因此v4.0/v4.1的EV/OAB 35.3x偏高. 这意味着按官方分项重做后, EV/OAB是22-30x区间. 因此Tesla估值"高端AI区间但非NVDA peak", 这解释了我们对"-45-55%下行"修正为"-35-50%下行"的原因.

因为TTM GAAP EPS = $0.33 + $0.39 + $0.24 + $0.13 = $1.09 [B-comp], 而非v4.1错误的$0.52, 因此GAAP TTM PE = 347x, 不是v4.1的728x. 这意味着v4.1附录的PE计算有错. 这解释了v4.2必须修正PE附录.

因为Tesla 10-Q官方对Active FSD Subscriptions的脚注定义包括up-front payment + monthly subscriptions [A-10Q], 因此1.28M不是纯月订阅. 这意味着简单乘$99 × 12计算ARR不严格. 这解释了v4.2将FSD SOTP区间下沿从$50B下调到$40B.

因为Services & Other GM仅9.2% [B-comp] = $346M / $3.745B, 这意味着Services不是纯软件利润池. 因为Tesla 10-Q解释收入增长由Services + automotive ancillary sales (FSD为主)联合推动 [A-10Q], 因此FSD很可能跨两个segment. 这解释了为什么v4.2必须修正Services的"软件化亮点"判断为"GM 9.2%降温".

因为Q1'26 SBC gross $1,030M [A-10Q] > Net Income $477M [A-deck], 因此Owner Earnings (gross口径) -$553M [B-comp]. 因为net-of-tax SBC $803M [A-deck], 因此Owner Earnings (net口径) -$326M [B-comp]. 这意味着无论gross还是net口径, Owner Earnings都为负. 这解释了Buffett-style"too hard"判断的核心逻辑.

因为Tesla 2024 Capex $11.3B → 2026指引$25B [A-call] = ~2.2x跳升 (vs 历史~1.5x), 因此是激进重资本扩张. 因为设备lead time 12-18个月 [D-model], 这意味着$25B真正落地2028+. 因此估值方法应从PE/PEG切换到EV/OAB. 这解释了Tesla "资本密集型AI工业平台"范畴重分配.

因为加州DMV判决FSD营销"actually, unambiguously false" [C-third-party] + 4M HW3车辆物理无法支持L4 [A-call], 因此Tesla面临结构性技术债务. 因为Tesla未在10-Q/10-K披露HW3 retro-fit计提 [A-10Q], 这意味着是hidden liability. 这解释了我们单独减项$7-14/share [D-model].

因为Q1'26 Capex $2.49B [A-10Q] vs 2026指引$25B [A-call] = 季度化达成率40%, 因此$25B 2026年完整落地的物理瓶颈不可能. 这意味着真正的现金流压力是2027-2029, 不是2026. 因此Tesla 3-5年弹药充足, 但ROIC压缩风险. 这解释了为什么我们的Capex爬坡路径估算 [D-model] 显示2028E才达成$25B+.

因为Tesla 7引擎独立成功概率乘积近1% [D-model], 因此全部规模化几乎不可能. 因为至少1个失速概率99%+ [D-model], 这意味着"Energy就是第一个失速"判断的统计基础. 但因为Energy Q1 GM 39.5% [B-comp], 这意味着失速 vs 量价错位的边界比v4.1更模糊. 因此v4.2修正Energy立场是审慎应对统计与实际数据冲突的合理处理.

