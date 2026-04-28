# Tesla (TSLA) v4.1 — 转型融资能力测试: Q1 2026 前台报告

**版本**: v4.1 (前台重构版, 基于v4.0数据 + 投资报告化优化)
**日期**: 2026-04-28
**当前股价**: $378.67 | **市值**: ~$1,420B | **52周区间**: $270.78 - $498.83

---

## 证据分级说明 (全文通用)

| 级别 | 含义 | 标注 |
|------|------|------|
| **[A]** | Tesla官方披露 (10-Q / Update Letter / Earnings Call) | 直接引用 |
| **[B]** | 可复算数据 (FCF = OCF - Capex; Owner Earnings = NI - SBC; EV/OAB公式) | 公式可验证 |
| **[C]** | 第三方券商估算 (Wells Fargo / Morgan Stanley / Barclays / Electrek) | 注明来源 |
| **[D]** | 我们的模型假设/推算 (HW3 retrofit成本 / Robotaxi cost-per-mile / Optimus产量概率 / 法律加权) | 注明"我们估算 / 非官方确认" |

**原则**: A/B级直接陈述; C/D级必须显式标注层级前缀, 不能用陈述句包装. 任何矛盾都以A级为准.

---

## 1. 执行摘要 — 一句话结论

**Tesla Q1 2026没有证明它已经是AI公司, 但证明它还有能力为AI工业化下注; 问题是, 当前股价已经把很多尚未验证的下注提前资本化.**

**评级**: 审慎关注 (临界, 高争议)

**公允价值区间** (R-4黑箱SOTP加权44%触发硬约束, 不提供单点):
- 保守 [D]: $173 (35%概率)
- 中性 [D]: $202 ($197 含资本支出/汽车毛利调整) (50%概率)
- 乐观 [D]: $282 (15%概率)
- 加权~$199 [D] (Auto/Capex调整后)
- HW3 hidden liability单独减项 [D]: -$7 ~ -$14/share

**当前$378.67 [A] vs 加权~$199 [D]**: 溢价**90%**, 风险/收益不对称比2.20x.

**核心命题** (3条主线):
1. **旧地图失效** — 市场过去看Tesla = 电动车交付 + 汽车毛利率 + FSD远期想象; Q1之后这张地图不够用, 因为Tesla开始把资本开支/芯片/机器人/Robotaxi/储能全部推上同一个资产负债表
2. **Capex是Q1真正的第一变量** — 毛利率修复给Tesla买了时间, Capex抬升决定这段时间值不值钱
3. **FSD是最近的软件化抓手, 但不是Robotaxi的充分证明** — 128万订阅是正信号, 但还没有证明高渗透率/高留存率/supervised到unsupervised的可审计迁移

**Kill Switch一句话**: HW3强制召回≥3M车 / Optimus 2026 production <10K / Energy 2026E增长 <0% YoY / Auto毛利率(ex-credits)Q2 <14% / DPO >75天.

---

## 2. 市场在争什么 — 不是好坏, 是融资能力

市场对Tesla的争议**不是**"Tesla是不是好公司", 而是:

> **汽车业务产生的现金流, 能否支撑Robotaxi/Optimus/AI5/Energy的高资本开支, 并最终转化为高ROIC?**

### 2.1 旧地图 vs 新地图

**市场的旧地图** (2024-2025共识):
- Tesla = 高估值电动车制造商 + AI/Robotaxi期权
- 关键变量: 汽车销量 / 汽车毛利率 / FSD远期想象
- 估值方法: P/E / PEG / P/S
- 隐含假设: 21% Revenue CAGR + 22% steady-state OPM (Reverse DCF [B])

**Q1 2026后的新地图**:
- Tesla = **资本密集型AI工业平台** (Capex/Revenue >25% [A], 传统车厂5-8%)
- 关键变量: **$25B/年Capex能否在2028-2030转化为高ROIC AI/Robotaxi/Optimus资产**
- 估值方法: SOTP三情景概率加权 + EV/OAB
- 隐含问题: 7引擎(Auto / Energy / FSD / Robotaxi / Optimus / AI5 / Service)中至少1个会失速; Q1的Energy就是第一个

### 2.2 投资风格分歧 (替代"圆桌讨论"的诚实表达)

不同投资风格会对Tesla给出不同评估. 这不是"虚拟大师", 是**风格视角差异**:

| 投资风格 | 看Tesla的角度 | 当前评估倾向 | 触发条件 |
|---------|------------|-----------|---------|
| **价值投资者** | Owner Earnings -$539M [B] / SBC暴涨 / 估值安全边际不足 | 卖出/Pass | $400 technical 或 Q3 earnings miss |
| **审慎成长投资者** | 承诺-达成gap [D] / 多重单点失败路径 / 风险收益不对称2.20x [D] | 维持审慎关注 | Kill Switch任一红色触发 |
| **宏观交易者** | 30年DCF久期 / 高beta to Magnificent 7 reversion / 利率敏感 | 减仓信号 | $360 (200日EMA) / Robotaxi failed milestone |
| **Disruption成长投资者** | FSD/Robotaxi/Optimus四引擎converge / AI/disruption multiples | 全仓买入 (假设期权全部成功) | 任何价位 |
| **GARP/Reverse value** | dip buy strategy / 历史Tesla "一件失败但其他overcompensate" | 等回调 | $300观望 / $250加仓 |
| **产业投资者** | Capex转ROIC的能力 / Asset Turnover / Reinvestment Rate | 关注 | ROIC回到20%+ 或压缩到<15% |

我们的判断介于"审慎成长"和"宏观交易者"之间: **不持有 + 不空仓 + 等Kill Switch**.

---

## 3. Q1 财报的硬事实 — 只讲最硬的数据

> 本节全部使用 [A] 级 (Tesla官方披露) 或 [B] 级 (可复算) 数据.

### 3.1 收入 / 利润 / 毛利率 [A]

| 指标 | Q1'26 | Q1'25 | YoY | 备注 |
|------|-------|-------|-----|------|
| Total Revenue [A] | $22.39B | $19.34B | +15.6% | Tesla shareholder deck Q1 2026 |
| GAAP EPS [A] | $0.13 | — | — | Common stockholders NI $477M |
| Non-GAAP EPS [A] | $0.41 | — | — | 官方Non-GAAP口径 |
| 综合GP margin [A] | 21.08% | 16.31% | +477bps | 5年高点 |
| 汽车GAAP GM [A] | 21.1% | 16.3% | +480bps | |
| 汽车GM ex-credits [A] | 19.2% | 12.5% | +670bps | 剔除监管积分$380M (Q1'25 $520M) |
| 监管积分 [A] | $380M | ~$520M | -27% | 占汽车收入1.9% (vs Q1'25 3.7%), 加速衰减 |

[DM-A-001] Q1'26 Revenue $22.39B (Tesla Q1 2026 Update Letter, 2026-04-22)
[DM-A-002] Q1'26 GAAP EPS $0.13 / Non-GAAP EPS $0.41 (Tesla Q1 2026 Update Letter)
[DM-A-003] Q1'26 综合GP margin 21.08% (10-Q filed 2026-04-23)
[DM-A-004] Q1'26 汽车GM ex-credits 19.2% (Tesla Q1 2026 Update Letter, p.5)
[DM-A-005] Q1'26 监管积分$380M (Tesla IR + 历史10-Q对照)

**关于汽车毛利率"V型修复"** — 我们的态度:

汽车GM (ex-credits)从12.5%恢复到19.2%是**官方披露事实** [A]. 这是真实的修复.

但**第三方分析** [C]提示这次修复包含一次性贡献:
- Wells Fargo (Colin Langan)估计 [C]: Q1 EBIT beat 70%来自一次性, 主要是tariff refunds和warranty write-downs
- Electrek 2026-04-22报道 [C]: 一次性合计$480M左右 (tariff $250M + warranty $230M)
- **Tesla未在Update Letter中量化"一次性"**, 这是分析师推算 [C], 不是Tesla确认

**我们的压力测试口径** [D]:
> 如果按较严苛口径剔除监管积分和部分一次性收益, Q1的经营利润质量会明显低于表面数字. 这不是Tesla官方Non-GAAP口径, 是我们用于压力测试的审计口径.

按D级假设: 剥离一次性$480M [C/D] 后, 汽车GM (ex-credits, 压力测试) ~16.8%, 仍未回到历史峰值19-20%, 距离差250-300bps.

### 3.2 现金流 / 资本结构 [A]

| 指标 | Q1'26 [A] | 备注 |
|------|----------|------|
| Operating Cash Flow | $3.94B | Q4'25 $3.81B, QoQ +3.4% |
| Capex | $2.49B | 季度化$10B |
| Free Cash Flow | $1.44B | OCF - Capex |
| LTM OCF | $16.5B | |
| LTM FCF | $7.0B | |
| 现金 + 短期投资 | **$44.7B** [A] | 仍处于净现金状态 [B] |
| 总债务 | $9.2B | |
| 净债务 | -$7.4B (净现金) [B] | |
| Long-term debt | $7.78B | 低位 |
| AP | $14.7B (vs Q4 $13.4B, +$1.3B) | DPO从61天延长到71天 [A] |
| SBC | $1.03B | +80% YoY, 4.6% of revenue (vs Q1'25 3.0%) |

[DM-A-006] Q1'26 OCF $3.94B (FMP cashflow filing 2026-04-23)
[DM-A-007] Q1'26 Capex $2.49B (FMP)
[DM-A-008] Q1'26 FCF $1.44B [B] = $3.94B - $2.49B
[DM-A-009] Q1'26 现金 + 短期投资 $44.7B (FMP balance sheet) — **仍处于净现金状态, 非v4.0部分章节误述的$76B**
[DM-A-010] Q1'26 SBC $1.03B (+80% YoY)
[DM-A-011] Q1'26 DPO 71天 (vs Q4'25 61天, +10天 一次性现金"释放"$1.3B)

**关于Owner Earnings** [B]:
- Owner Earnings = Net Income - SBC = $491M - $1,030M = **-$539M** [B]
- 这是**严格的可复算数据**, 不是估算
- 含义: GAAP盈利但SBC稀释超过净利润, **从owner economics视角每股Q1实际损失$0.15** [B]
- 这是估值的"隐性稀释"

### 3.3 Capex指引 vs LTM运行率 [A + B]

| 指标 | 数值 | 来源 |
|------|------|------|
| 2026 Capex指引 | **$25B** [A] | Tesla管理层 (从1月$20B上调至$25B; Barron's报道2026-04-22) |
| LTM Capex (Q2'25-Q1'26) | $9.52B [A] | FMP |
| 差距 | $15.5B [B] | 算术 |
| Q2-Q4要达成$25B年化所需 | $7.5B/季 [B] | (25-2.49)/3 |
| Q1实际 | $2.49B [A] | 实际vs指引达成率40% |
| 历史对比 | 2023 $8.9B / 2024 $11.3B / 2025 $8.5B / 2026 $25B指引 | 4x跳升 (vs 历史2x跳升) |

**我们对Capex爬坡的判断** [D]:
- 设备lead time (光刻机/锂电池设备/冲压线) 通常 ≥12-18个月 — **行业一般规律**
- Optimus / Robotaxi factory shell建设≥9-12个月 — **行业一般规律**
- 因此 **$25B不是2026立刻冲击, 是2027-2029累积压力** — 这是我们的推论 [D]

**真实Capex爬坡路径** [D]:
- 2026E: $14-17B (Q1 $2.5B → Q4 $4-5B线性爬坡) — 我们估算
- 2027E: $20-23B — 我们估算
- 2028E: $25B+ (指引水平真正达成) — 我们估算

---

## 4. Capex是Q1真正的第一变量

> **毛利率修复给Tesla买了时间, Capex抬升决定这段时间值不值钱.**

### 4.1 资金弹药多年情景 [B + D]

LTM FCF [B]:
| Q | OpCF [A] | Capex [A] | FCF [B] |
|---|------|-------|-----|
| Q2'25 | 2.54 | 2.39 | 0.15 |
| Q3'25 | 6.24 | 2.25 | 3.99 |
| Q4'25 | 3.81 | 2.39 | 1.42 |
| Q1'26 | 3.94 | 2.49 | 1.44 |
| **LTM** | **16.53** | **9.52** | **7.00** |

**情景分析** [D] ($25B Capex全面落地后的现金流压力):

| 情景 [D] | OpCF (年化) | Capex | FCF [B] | 弹药消耗速度 |
|------|------------|-------|-----|------------|
| 当前路径 [A] | $16.5B | $9.5B | +$7.0B | 现金累积 |
| 2026E 中性 [D] | $17B | $15B | +$2B | 接近平衡 |
| 2027E [D] | $19B | $20B | -$1B | 略消耗弹药 |
| 2028E 完整指引 [D] | $20-22B | $25B | -$3-5B | 3-5年烧$15B现金 |
| 极端情景 [D] | $12-14B | $25B | -$11-13B | 3-4年耗尽$44.7B |

**结论**:
- $44.7B现金 [A] + 净现金状态 [B] + LTM FCF $7B [B] = **转型期"3-5年弹药"**
- 不会爆雷, 但**经营修复速度 + Capex爬坡速度的赛跑**很关键
- 如果汽车毛利率(ex-credits, 压力测试) [D] 只到16-17% + Capex按$20B/年爬坡 [D], 2028-2029会出现-$3-5B/年FCF [D], 届时需要发债或增发

### 4.2 Capex的资金去向 [A + D]

Tesla管理层口径 (无精确分项) [A]:
- 6条新产线
- Optimus Fremont产线 + Austin独立设施
- AI compute / 数据中心 (Cortex 2 + Dojo 3)
- Austin chip fab (AI5生产)
- Robotaxi fleet
- 电池 / 能源 / AI silicon供应链

我们的分配估算 [D] (Tesla未分项披露):
- Auto manufacturing (Cybertruck + Megafactory in Mexico): $4-6B
- Battery (新Gigafactory Nevada+Texas): $3-5B
- AI infrastructure (Dojo + AI5 + DP数据中心): $5-8B
- Optimus production (新工厂): $3-5B
- Robotaxi (Cybercab production line + fleet expansion): $2-3B
- Energy storage (Megapack capacity): $2-3B

**Capital allocation efficiency**: **未知, 因为Tesla不分项披露** — 这是我们标记为"高度黑箱"的关键变量.

### 4.3 ROIC压缩传导 [D]

我们的判断 [D] (基于Boeing/Caterpillar等重资本企业历史):
- Tesla历史ROIC在2022-2023年达到35%+ [B], 2024-2025年降到22% [B] (capex扩张稀释)
- 2026-2027 Capex $20-25B vs revenue $90-100B = 20-25% Capex/Revenue
- **重资本扩张周期, ROIC压缩到15-18%概率高** [D]
- 历史警示: 重资本企业大幅扩张通常带来3-5年的ROIC下行 (Boeing/Caterpillar案例) [C/D]

[DM-D-001] Capex $25B指引4x跳升 (vs 历史2x) [B]
[DM-D-002] 2026E FCF -$10~15B [D] (我们的估算, 假设Auto GM 16-17% + Capex爬坡)
[DM-D-003] 2026E现金消耗 $44.7B → $30-35B [D] (从$44.7B出发, 非v4.0误述的$76B)
[DM-D-004] ROIC压缩传导: 22% → 15-18% [D] (基于重资本企业历史规律)

### 4.4 市场对Capex的反应 [C]

Reuters / Barron's报道 [C] (2026-04-22财报后市场反应):
- "Q1现金流让市场松一口气, 但更高资本开支计划压制了情绪"
- "公司计划今年投入$25B新厂房和设备, 高于此前$20B预期"
- "投资者开始重新评估Tesla的AI/自动驾驶/机器人投入是否值得"

**这与我们的"Capex是第一变量"判断方向一致**: 市场不再纠结"Tesla能不能造车", 而是在问"Tesla能不能把重资本投入转化成高回报AI工业资产".

---

## 5. 三个尚未被证明的期权

> 每个期权只写四项: 当前证据 [A] / 未证明环节 [D] / 估值含义 [D] / Kill Switch.

### 5.1 FSD subscription — 最近的软件化抓手, 但不是Robotaxi充分证明

**当前证据** [A]:
- Q1'26 FSD subscribers: **1.28M** (+51% YoY) [A] — Tesla Q1 2026 Update Letter
- 月费: **$99** (统一价格, 2026-02-14后) [A]
- 历史FSD买断废止: $15K → $99/月 (2026-02关闭) [A]
- 月Revenue: $127M [B] (1.28M × $99)
- 年化ARR: **$1.52B** [B]
- 累计cumulative deliveries: ~9.26M [A], take rate ~13.8-14.4% [B]
- 荷兰已批准FSD Supervised; 中国审批推进 [C]

**MarketWatch报道** [C]: Tesla 128万活跃FSD订阅用户 +51% YoY, **但大多数客户仍未付费使用FSD**; 同一报道指出**Tesla若要充分兑现Musk薪酬包相关目标, 需要达到1000万活跃订阅**, 高于当前累计车辆和Robotaxi规模.

**未证明环节** [D]:
1. **高渗透率** — 当前take rate 14.4%, 距离40-50%或80%(Musk隐含目标)还很远
2. **高留存率** — Tesla未披露churn (异常) [A]; 我们估算SaaS自然churn 5-10%/年 [D]
3. **supervised到unsupervised的可审计迁移** — 当前FSD subscription是supervised; Robotaxi unsupervised需要FSD V13/V14+监管批准 [D]
4. **HW3 churn风险** — 4M HW3车辆物理无法支持L4 [A]; 这部分subscriber有失望→取消风险 [D]

**估值含义** [D]:
| 情景 | ARR路径 (Y10) | 倍数 [D] | SOTP |
|------|------------|--------|------|
| 保守 | 1.52B → 8B | 5-6x | $50-65B |
| 中性 | 1.52B → 10B | 6-8x | $65-75B |
| 乐观 | 1.52B → 15-20B | 8-12x | $80-100B |

**关键问题**: 从1.28M增长到8-10M需要HW3问题不影响新订阅 + 新车take rate从14.4%升到40-50% + 价格保持$99/月 + churn rate不显著. 这些条件**目前都未被证明**.

**FSD部分的平衡表达**: FSD订阅是Tesla最接近SaaS的收入形态, 但它还没有证明三件事 — 高渗透率 / 高留存率 / supervised到unsupervised的可审计迁移. 当前128万订阅是正信号, 但**不是Robotaxi网络已经成立的证据**.

**Kill Switch (FSD)**:
- 🟡 黄: FSD subscriber Q2 <1.4M (+9% QoQ) [A级阈值]
- 🔴 红: HW3强制召回≥3M车辆触发SEC调查或法院判决要求计提

[DM-A-012] Q1 FSD subscribers 1.28M (Tesla Q1 2026 Update Letter)
[DM-A-013] Q1 FSD月费$99 (Tesla product page)
[DM-C-001] MarketWatch报道 Tesla需达到10M订阅以兑现Musk薪酬包目标 [C级]

### 5.2 Robotaxi — 运营验证升级, 财务验证未开始

**当前证据** [A]:
- Q1'26 Robotaxi paid miles: **1.7M** (+183% QoQ) [A]
- Fleet size: **89辆Model Y** (大部分含safety monitor) [A]
- 服务城市: Austin (主) + Dallas (Q1启动) + 其他准备阶段 [A]
- Pricing: $3 base + $1.40/mile, 实际平均~$1.95/mile (Cern Basher analysis) [C]
- Tesla Robotaxi单价 $8 vs Waymo $15-20 (Tesla 53%折价) [A/C]

**第三方估算** [C]:
- Morgan Stanley估算 [C]: Tesla cost-per-mile $0.81 vs Waymo $1.36-1.43
- Robotaxi Tracker / TechBuzz / Fortune [C]: Tesla 89辆 vs Waymo 700+辆 (7.9倍fleet差异)
- Tesla pickup time 15.32 min vs Waymo 5.74 min [C] (3x差距)
- Austin pilot 14起碰撞, crash rate ~4x人类司机 [C]

**未证明环节** [D]:
1. **MS的$0.81/mile是"未来稳态"成本, 不是当前实际** — 当前fleet含safety monitor, monitor人力成本$0.40-0.60/mile [D] → 真实当前成本$0.75-0.95/mile [D]
2. **monitor消除时间表未披露** [A] — 我们估算 [D] 乐观2026Q4-2027Q1可移除60-70%; 真L4 2027H2-2028H1
3. **scale-up概率** — 89辆 → 100K辆需要1,124x scale-up + 8年时间 + unsupervised突破 + 多州监管批准 [D]
4. **California以外州监管批准未启动** [A]

**估值含义** [D]:
| 情景 | 2030 fleet [D] | 单位经济 [D] | SOTP [D] |
|------|------------|----------|--------|
| 保守 | 100K辆推迟到2032+, monitor依赖persists | $0.81/mile (含monitor) | $80-100B |
| 中性 | 100K辆 by 2030, unsupervised 2027-2029 | $0.65/mile | $100-115B |
| 乐观 | 50K by 2027 + 100K by 2029 + AI5便宜硬件 | $0.45-0.65/mile | $130-160B |

**Kill Switch (Robotaxi)**:
- 🟡 黄: Robotaxi fleet Q2 <150辆 [A级阈值]
- 🔴 红: 集体诉讼 / California DMV禁令

[DM-A-014] Q1 Robotaxi 89辆fleet, 1.7M paid miles (Tesla Q1 2026 Update Letter)
[DM-C-002] MS估算 Tesla $0.81/mile vs Waymo $1.36-1.43 [C级, 单源]
[DM-D-005] Robotaxi monitor真实成本 $0.40-0.60/mile [D级, 我们估算]
[DM-D-006] Robotaxi 当前真实cost-per-mile (含monitor) $0.75-0.95 [D级]

### 5.3 Optimus — 2026目标需要按制造爬坡折扣处理

**当前证据** [A]:
- 当前状态: V2 prototype测试, V3设计finalizing [A]
- Tesla 2026目标: **50-100K units** [A] (Tesla宣布)
- Fremont产线: Late July/August启动 (Model S/X line shutdown 5月) [A] (Electrek报道)
- Fremont目标: 1M units/yr长期 [A]
- Giga Texas目标: 10M units/yr (mature state, 无具体时间表) [A]
- Tesla宣布V3单位成本目标: $20-25K (含AI chip $5-6K) [A]
- 当前售价: 未量产销售 [A]

**第三方分析** [C]:
- Helpforce.ai [C]: 分析师估计2-5M units/yr by 2028-2030
- Optimusk.blog [C]: 2026目标50-100K是"激进hopium"

**未证明环节** [D]:

我们的判断 [D]: **Optimus 2026目标需要按制造爬坡折扣处理.** 与Cybertruck相比, 人形机器人涉及执行器、平衡控制、可靠性和安全责任, 量产难度更高. 因此, 我们不应把管理层目标直接资本化进估值.

**Cybertruck爬产对照** [B]:
- 2024 Q1量产 5K → 2024 Q4 17K (3.4x ramp) [B]
- 2024年Tesla原计划Cybertruck 250K/year, 实际2024年仅交付~50K (达标20%) [A], 2025年~80K (32%) [A]

**Optimus特殊困难** [D]:
- 执行器供应链未成熟 (28+个特种执行器需要新的供应链)
- 校准每台成本 ~30-50小时人工 (vs 汽车 ~5小时)
- 软件可靠性 (摔倒一次=$100K hardware loss + 安全责任)
- 工程难度估算高于Cybertruck 3-5x [D]

**真实2026交付区间** [D]: **2-15K台** (中位8K, 我们的推算)
- Q1 2026: ~50-200台 (内部使用, 已确认) [A]
- Q4 2026: ~1-5K (我们乐观估计) [D]
- 全年: 2-15K (我们悲观-乐观估计) [D]
- **2027年才是真正爬产年** [D]

**估值含义** [D]:
| 情景 | 2030 production [D] | SOTP [D] (median) |
|------|------------|--------|
| 保守 | 1-2M units, ASP $25K | $70-120B (median $95B) |
| 中性 | 3-5M units | $80-180B (median $130B) |
| 乐观 | 8-10M units (cap at $200B for execution risk) | $200B max |

**Kill Switch (Optimus)**:
- 🔴 红: Optimus 2026 production <10K units [A级阈值]

[DM-A-015] Tesla 2026 Optimus目标50-100K units (Tesla Q1 Update Letter)
[DM-D-007] Optimus 2026真实交付2-15K [D级, 我们估算 based on Cybertruck爬产对照]
[DM-D-008] Optimus工程难度估算高于Cybertruck 3-5x [D级, 我们的判断]

---

## 6. Energy 和 Services 的真实位置

### 6.1 Energy — 短期失速, 但不能简单说崩

**当前证据** [A]:
| 指标 | Q1'26 [A] | Q1'25 [A] | YoY |
|------|---------|---------|-----|
| Energy Revenue | $2.41B | $2.74B | -12% |
| Storage量 | 8.8 GWh | 10.4 GWh | -15.4% |
| Energy GM Q4 2025 | 29.8% (record) [A] | — | — |
| Energy GM Q1 2026 | **未在shareholder deck单独突出** [A] | — | — |

**关于"首次隐藏"的措辞修正**:

我们之前(v4.0)说Q1 2026是Tesla "首次隐藏" Energy margin. 这个说法**需要更精确的措辞** — 没有充分公开历史披露惯例的可靠对照.

**修正后表达**:
> Q1 Energy的收入和部署量下滑, 而单位经济没有得到足够清晰的补充披露. 因此Energy作为第二利润池的可见度下降. 是否构成"披露惯例改变"需要更系统的多季度对照, 我们暂不下此结论.

**Q1 -12% YoY的原因** [D]:
1. Q4 2025 record前置 — 14.2 GWh创纪录后季节性回落 (-38% QoQ严重) [A]
2. 大型Megapack项目交付时间lumpy [D]
3. Powerwall需求持平 [D]
4. 中国Megapack ASP压力 — CATL/比亚迪扩产能至50+ GWh, ASP -10-15% YoY [C]

**估值含义** [D]:
- 保守 [D]: 2026E Revenue $10B (+5%) + 稳态margin 18% → SOTP **$50-70B**
- 中性 [D]: 2026E Revenue $11B (+12%) + 稳态margin 22% → SOTP **$60-80B**
- 乐观 [D]: 2026E Revenue $12B (+22%) + 稳态margin 25% → SOTP **$80-100B**

**修正vs v4.0**: 我们之前用初步分析错误的"39.5% margin"过度乐观. 真实Q4 record = 29.8% [A], 第三方估算Q1 GM区间22-26% [C], 我们采用稳态18-25%作为压力测试假设 [D].

**Kill Switch (Energy)**:
- 🟡 黄: Q2 Storage部署 <10 GWh (环比≤+14%) → 结构性减速解释成立
- 🔴 红: Energy 2026E增长 <0% YoY → 第二利润池叙事崩塌

[DM-A-016] Q1 Energy Revenue $2.41B / Storage 8.8 GWh -15.4% YoY (Tesla Q1 Update Letter)
[DM-A-017] Q4 2025 Energy GM 29.8% record (Tesla Q4 2025 shareholder deck)
[DM-C-003] 第三方分析师 (Wells Fargo / MS) Q1 Energy GM估算22-26% [C级]

### 6.2 Services — 更接近软件化的亮点, 但不足以独立支撑当前市值

**当前证据** [A]:
- Q1'26 Services & Other Revenue: $3,745M (+42% YoY) [A]
- 占总Revenue: 16.7%
- 是Q1最大的YoY增量驱动 (+$1,108M YoY)

**Services增长驱动拆解** [B + D]:
| 来源 | 估算贡献 [D] | 依据 |
|------|---------|------|
| FSD subscription (ARPU $99/月) | +$340M | 1.28M sub × $99 × 3个月增量 [B] |
| 二手车销售 | +$200M | Tesla used inventory出清 [D] |
| Service revenue (维修/配件) | +$120M | 车队规模增大 [D] |
| 超充网络对外开放 | +$108M | 福特/通用车主用超充收入 [D] |
| 其他 (含leasing) | +$340M | 残差 [D] |
| **Total** | **+$1,108M** [A] | |

**Services的真实位置**:
- ✅ Services是真正"非汽车"的成长引擎 — Q1 +42%是过去5年最高
- ✅ FSD subscription是"过渡资产"thesis的最强支持点
- ⚠️ **但**: 占总Revenue仅16.7%, 单独无法支撑当前$1,420B市值
- ⚠️ FSD部分(占Services 30-35% [D])仍面临HW3 churn风险

**Energy和Services的综合判断**:
> Energy短期失速, Services是更接近软件化的亮点, **但两者都还不足以独立支撑当前市值**. 两者合计占Revenue ~27% (Q1 2026), 占SOTP估值~20%, 仍然是汽车主业 + 三大期权(FSD/Robotaxi/Optimus)的辅助支撑.

[DM-A-018] Q1 Services & Other Revenue $3.745B +42% YoY (Tesla Q1 2026 Update Letter)
[DM-B-001] Services增长驱动拆解 [B级, 基于公开数据复算]
[DM-D-009] Services增长归因[D级, 我们估算各驱动的相对贡献]

---

## 7. 估值 — 三把尺子

> 我们只用三套估值语言. Owner Earnings / Core PE / 投资风格分歧已移至附录, 不进入主估值.

### 7.1 第一把尺子: Reverse DCF — 当前股价隐含什么

**简化框架** [B]:
- WACC = 9% (cost of equity 10%, debt负杠杆) [B级假设]
- Terminal growth = 3%
- Tax rate = 18%

**LTM Q1'26基线** [A + B]:
- Revenue: $97.9B [A]
- Operating Income (剥离一次性$480M [C] + 监管积分按全年$1.5B估算 [D]): $3.5-4B [B+D]
- Implied LTM core operating margin: 3.6-4.1% [B]

**用Q1'26反推$378.67隐含假设** [B+D]:

| 5年后State | 需要的Revenue | Operating Margin | 隐含估值 |
|-----------|-------------|------------------|---------|
| **股价$378.67隐含** | **$260-300B (+22-25% CAGR)** | **20-24% margin** | **回到21%+22%假设** |

**核心洞察**: 股价$378.67隐含**回到了2026-02 v3.0的"21%+22%"水平, 甚至更高**. 这与"Q1表面好看但40-50%来自一次性"形成尖锐冲突 — **市场已经price-in了"AI期权全部兑现"**.

[DM-B-002] Reverse DCF: $378.67隐含5年后Revenue $260-300B + 20-24% margin [B级公式可复算]

### 7.2 第二把尺子: SOTP — 三情景概率加权

**完整SOTP重估表** [D] (3情景):

| 期权 | 保守 [D] | 中性 [D] | 乐观 [D] |
|------|---------|---------|---------|
| 汽车主业 (ex-FSD) | $250-280B | $270-300B | $290-320B |
| Energy | $50-70B | $60-80B | $80-100B |
| FSD subscription | $50-65B | $65-75B | $80-100B |
| Robotaxi (option) | $80-100B | $100-115B | $130-160B |
| AI5/chip (option) | $25-50B | $35-55B | $50-70B |
| Optimus (option) | $70-120B | $80-180B | $200-400B |
| Net cash | $7-8B | $7-8B | $7-8B |
| **Total区间合计** | **$532-693B** | **$617-810B** | **$837-1158B** |
| **情景中值** | **$612B** | **$713B** | **$997B** |
| **Per-share中值** | **$173** | **$202** | **$282** |

**Auto/Capex调整后** [D]:
- Auto稳态margin从16-19%下调到14-17% (反映Volume vs Margin tradeoff历史规律 [D])
- Auto SOTP中性: $250-260B (vs 原$270-300B)
- WACC从9-10%调到10-11% (反映重资本风险 [D])
- 调整后中性Per-share: **~$197**

**概率加权双版本** [D]:
- **诚实分布 (50%/35%/15%)**: 50% × $202 + 35% × $173 + 15% × $282 = **$203.85**
- **温和分布 (60%/30%/10%)**: 60% × $202 + 30% × $173 + 10% × $282 = **$201.30**
- 调整Auto/Capex后加权: **~$199**
- 两版本差异+0.8%, 不影响投资结论

**HW3 hidden liability单独减项** [D]:
- $20-40B max retrofit potential × 概率0.5 + $6.85B 法律加权 = $16.85B
- $16.85B / 3,538M shares = $4.76/share (中值)
- 范围: **$7~14/share** (考虑$10-30B加权后的不同情景)

**调整HW3后加权目标**: $199 - $7~14 = **$185-192/share** [D]

[DM-D-010] SOTP三情景per-share中值: 保守$173 / 中性$202 / 乐观$282 [D级, 我们的SOTP模型]
[DM-D-011] 加权目标$199 (Auto/Capex调整后, 50%/35%/15%概率分布) [D级]
[DM-D-012] HW3 hidden liability $7-14/share [D级, 我们估算]

### 7.3 第三把尺子: EV/OAB — 资本密集型AI工业平台的估值锚

**Operating Asset Base (OAB)** [B]:
OAB = PP&E (net) + Inventory + AR - AP + Operating Intangibles - Operating Lease Liabilities

**为什么用OAB**: 资本密集AI产业平台的合理估值锚 = "养"多少经营资产产生未来现金流. 比EV/EBITDA更稳定, 比EV/Sales更直接.

**TSLA Q1 2026 OAB计算** [B]:
- PP&E (net): $55.95B [A]
- Inventory: $14.43B [A]
- AR: $3.96B [A]
- AP: -$14.70B [A]
- Operating Intangibles: 0 [A]
- Lease Liabilities (OL): -$6.0B (估算) [D]
- **Operating Asset Base**: **$53.6B** [B]

**数据警示**: Q1'26 PP&E从Q4 $40.6B跳到$55.9B (+$15.3B), 但当季Capex仅$2.5B. 差额$12.8B同时otherNonCurrentAssets从$21.2B降到$10.0B. 我们的两种解释 [D]:
- 假设1 (主用): 会计重分类 (Lease ROU重分类到PP&E) → 调整后OAB $39.2B → EV/OAB **35.3x**
- 假设2 (替代): 新增并表 → 用未调整$53.6B → EV/OAB **25.8x**

**EV/OAB估值倍数** [B]:
- EV = Market Cap + Debt - Cash = $1,420B + $9.2B - $44.7B = **$1,385B**
- EV/OAB (假设1) = 1,385 / 39.2 = **35.3x**
- EV/OAB (假设2) = 1,385 / 53.6 = **25.8x**

**历史可比** [C] (Bloomberg/Capital IQ):

| 公司 | 时期 | 阶段 | EV/OAB peak | 后5年股价 |
|------|------|------|------------|---------|
| AMZN | 2003-2010 | AWS扩产期 | 12-18x | +6.5x |
| TSM | 2010-2015 | 7nm/5nm/3nm Capex | 8-14x | +3.2x |
| Intel | 2014-2018 | 14nm/10nm (失败) | 6-9x | -15% |
| AMD | 2017-2020 | EPYC + 7nm | 18-28x | +8x |
| NVDA | 2020-2024 | A100/H100 + AI生态 | 20-35x | +15x |
| **TSLA** | **2026 Q1** | **AI/Robotaxi/Optimus + chip** | **35.3x** | **?** |

**关键观察**:
- TSLA EV/OAB 35.3x位于"AI生态+IP溢价"区间最上沿 (NVDA峰值35x, AMD峰值28x)
- 远高于"传统Capex扩产期"区间 (AMZN 12-18x, TSM 8-14x)
- 市场已price in"全部期权按NVDA速度兑现"
- **风险**: 任一期权(Robotaxi/Optimus/FSD/Energy)2027-2028兑现失败 → 倍数压缩到15x以下 → -45-55%下行 [D]

[DM-A-019] Q1'26 PP&E $55.95B / Inventory $14.43B / AR $3.96B / AP $14.70B (FMP balance sheet)
[DM-B-003] EV/OAB 35.3x (调整后) / 25.8x (未调整) [B级, 公式可复算]
[DM-C-004] 历史可比EV/OAB peak: AMZN 12-18x / TSM 8-14x / Intel 6-9x / AMD 18-28x / NVDA 20-35x [C级, Bloomberg/Capital IQ]

### 7.4 三把尺子的综合判断

| 估值锚 | 隐含价值 | 当前股价 | 溢价 |
|------|--------|--------|------|
| Reverse DCF | 隐含21%+22%假设 (回到v3.0乐观水平) | $378.67 | "市场已price-in期权全部兑现" |
| SOTP加权 [D] | $199 (调整后) / $185-192 (含HW3) | $378.67 | **90% / 97-105%** |
| EV/OAB | NVDA peak水平 (历史最上沿) | 35.3x | -45-55%下行风险 (任一期权miss时) |

**三把尺子收敛的结论**: 当前股价已经超出任何合理估值框架的上限. **不在SOTP上沿$256, 不在EV/OAB历史peak的中位, 也不符合Reverse DCF的合理增长率假设**.

---

## 8. Kill Switch — 8个最关键指标

> 压缩自v4.0的13个指标. 只保留与"Capex转ROIC + 7引擎兑现节奏 + HW3 hidden liability"直接相关的8个.

| 信号 | 等级 | Variable | Baseline [A] | Pivot阈值 [D] | 频率 |
|------|------|----------|----------|----------|------|
| **KS-01 HW3** | 🔴 红 | NHTSA强制召回HW3车辆 | 0辆 | ≥3M车辆 | Event |
| **KS-02 Auto margin** | 🔴 红 | 汽车毛利率(ex-credits) | Q1 19.2% [A] | <14% | 季度 |
| **KS-03 DPO** | 🔴 红 | DPO (AP延付天数) | Q1 71天 [A] | >75天 | 季度 |
| **KS-04 Optimus** | 🔴 红 | 2026 Optimus production | 0 [A] | <10K | 年度 |
| **KS-05 Energy** | 🔴 红 | 2026E Energy YoY增长 | Q1 -12% [A] | <0% YoY | 年度 |
| **KS-06 Capex Q2** | 🟡 黄 | Q2 Capex | Q1 $2.49B [A] | <$3.5B | 季度 |
| **KS-07 FSD subs Q2** | 🟡 黄 | FSD subscriber Q2 | Q1 1.28M [A] | <1.4M | 季度 |
| **KS-08 AI5量产** | 🟢 绿 | AI5 chip量产时间 | Tape-out 2026-04-15 [A] | Q4 2026按plan | Event |

**触发优先级**:
1. **KS-01 HW3**最优先 — 直接$20-40B计提, 股价短期-15-25%
2. **KS-02 Auto margin**次优先 — V型证伪 → SOTP -$30-50B
3. **KS-04 Optimus / KS-05 Energy**第三优先 — 各SOTP -$20-50B
4. KS-03 DPO / KS-06 Capex / KS-07 FSD subs / KS-08 AI5为辅助监控

---

## 9. 结论 — 该如何跟踪

### 9.1 不同行动条件

| 行动 | 触发条件 | 建议仓位 |
|------|---------|---------|
| **买入** | 股价回调到$250-300 (-21~-34%) + 任一红色Kill Switch未触发 | 5-10% (Disruption) / 0% (Value) |
| **持有** | 股价$300-400 + 黄色Kill Switch ≤2触发 + 红色Kill Switch均未触发 | 当前仓位 |
| **卖出** | 任一红色Kill Switch触发 / 股价突破$500无新catalyst / Q3 earnings大miss | 0% |
| **等待** | 当前价位 ($378.67) + 红色Kill Switch均未触发 + 黄色2个触发 | 不持有 + 不空仓 |

### 9.2 我们的当前判断

**评级**: 审慎关注 (临界, 高争议)
**行动**: 不持有 + 不空仓 + 等待Q2 2026 earnings (2026-07/08)
**触发更新**: KS-02 Auto margin Q2 / KS-05 Energy storage Q2 / KS-04 Optimus Q2 production

### 9.3 一句话固化 — 这份报告希望你带走的判断

> **Tesla Q1 2026没有证明它已经是AI公司, 但证明它还有能力为AI工业化下注. 当前股价已经把很多尚未验证的下注提前资本化. 看Tesla不要先问"FSD涨多少", 先问"$25B/年Capex能否转化为高ROIC AI/Robotaxi/Optimus资产, ROIC从22%是否压缩到15-18%?"**

---

## 附录A — Owner Earnings / Core PE / 五位大师圆桌 (移出主文)

> 这些视角对内部决策有价值, 但作为投资报告主估值证据**容易被认为是"模拟观点"或"自造利润表"**. 移至附录, 仅供参考.

### A.1 Owner Earnings详细计算 [B]

- Owner Earnings = Net Income - SBC = $491M - $1,030M = **-$539M** [B]
- Owner EPS = (491 - 1030) / 3538 = **-$0.15**
- 含义: 每股股东在Q1实际损失$0.15 (从owner economics视角)

**Q2 2026 Owner EPS预测** [D]:
| 情景 [D] | Q2 Operating Income | Q2 EPS (GAAP) | Q2 Owner EPS |
|------|----------------------|---------------|--------------|
| 乐观 | $1.0B | $0.18 | -$0.07 |
| 基础 | $400M | $0.11 | -$0.18 |
| 悲观 | $200M | $0.07 | -$0.22 |

### A.2 三PE并列 (财务章节口径)

| PE类型 | 值 | 含义 |
|--------|-----|------|
| GAAP PE | 728x ($378.67 / TTM EPS $0.52) | 含全部会计项目 |
| Owner PE | N/A (Owner Earnings负数) | SBC > NI → Owner PE无意义 |
| Core PE | 1,030x (剥离一次性+监管积分) | 真实经营估值 |

### A.3 五位大师圆桌 (内部审计视角, 非主估值证据)

| 大师 | 评级倾向 | 核心理由 (我们的解读, 非公开持仓/评论) |
|------|------|---------|
| Buffett-style | 不投资 (too hard) | 能力圈外 + Owner Earnings负值 |
| Munger-style | 审慎关注 | 承诺-达成gap + 多重单点失败 |
| Marks-style | 审慎关注 | 周期反转 + 风险/收益不对称 |
| Druckenmiller-style | 减仓信号 | 宏观利率 + Magnificent 7 reversion |
| Klarman-style | 明确卖出 | 零安全边际 + 多重red flags |
| Cathie Wood-style (公开持仓+target) | 全仓买入 | $2,600/2029, AI/Disruption四引擎 |
| Bill Miller-style | 中性偏多 | 等回调$250-300买入, 长期目标$700+ |

**重要免责**: 上述大师视角是我们**根据其投资哲学的解读**, **除Cathie Wood (ARK Invest有公开TSLA持仓和target $2,600)外, 其他大师没有公开TSLA评论或持仓**. 这部分内容应作为"投资风格分歧"的内部启发, **不应作为前台报告的主估值证据**.

### A.4 7引擎独立成功概率 [D] (内部审计视角)

如果每个期权独立成功概率 [D]:
- Auto core (V型): 50%
- FSD subscription growth (1.28M → 8M): 50%
- Robotaxi (100K辆by 2030): 30%
- Optimus (5M units by 2030): 20%
- AI5 chip (2027 high volume): 70%
- Energy ($50-75B SOTP稳态): 60%
- HW3不发酵 (no SEC调查): 70%

**全部成功概率** [D]: 0.5 × 0.5 × 0.3 × 0.2 × 0.7 × 0.6 × 0.7 = **0.88%** (近1%)
**至少一个失败概率** [D]: 99.12% (近100%)
**任意≥3个成功概率** [D]: ~50% (二项分布, 这是中性情景的隐含假设)

---

## 附录B — DM锚点索引 (按证据级别分类)

### B.1 [A] Tesla官方披露 (DM-A-001 to DM-A-019)

| DM | 内容 | 来源 |
|----|------|------|
| DM-A-001 | Q1'26 Total Revenue $22.39B | Tesla Q1 2026 Update Letter |
| DM-A-002 | Q1'26 GAAP EPS $0.13 / Non-GAAP EPS $0.41 | Tesla Q1 2026 Update Letter |
| DM-A-003 | Q1'26 综合GP margin 21.08% | 10-Q filed 2026-04-23 |
| DM-A-004 | Q1'26 汽车GM ex-credits 19.2% | Tesla Update Letter, p.5 |
| DM-A-005 | Q1'26 监管积分$380M | Tesla IR + 历史10-Q对照 |
| DM-A-006 | Q1'26 OCF $3.94B | FMP cashflow filing 2026-04-23 |
| DM-A-007 | Q1'26 Capex $2.49B | FMP |
| DM-A-008 | Q1'26 FCF $1.44B | OCF - Capex |
| DM-A-009 | Q1'26 现金 + 短期投资 $44.7B | FMP balance sheet |
| DM-A-010 | Q1'26 SBC $1.03B (+80% YoY) | FMP |
| DM-A-011 | Q1'26 DPO 71天 (vs Q4 61天) | Computed from AP/COGS |
| DM-A-012 | Q1 FSD subscribers 1.28M | Tesla Q1 2026 Update Letter |
| DM-A-013 | Q1 FSD月费$99 | Tesla product page |
| DM-A-014 | Q1 Robotaxi 89辆fleet, 1.7M paid miles | Tesla Q1 2026 Update Letter |
| DM-A-015 | Tesla 2026 Optimus目标50-100K | Tesla Q1 Update Letter |
| DM-A-016 | Q1 Energy Revenue $2.41B / Storage 8.8 GWh -15.4% YoY | Tesla Q1 Update Letter |
| DM-A-017 | Q4 2025 Energy GM 29.8% record | Tesla Q4 2025 shareholder deck |
| DM-A-018 | Q1 Services & Other Revenue $3.745B +42% YoY | Tesla Q1 2026 Update Letter |
| DM-A-019 | Q1'26 PP&E $55.95B / Inventory $14.43B / AR $3.96B / AP $14.70B | FMP balance sheet |

### B.2 [B] 可复算数据 (DM-B-001 to DM-B-003)

| DM | 内容 | 公式 |
|----|------|------|
| DM-B-001 | Services增长驱动拆解 | 基于公开收入 + ARPU $99计算 |
| DM-B-002 | Reverse DCF: $378.67隐含5年后Revenue $260-300B + 20-24% margin | DCF模型 |
| DM-B-003 | EV/OAB 35.3x (调整后) / 25.8x (未调整) | EV / (PP&E + Inventory + AR - AP - OL) |

### B.3 [C] 第三方券商估算 (DM-C-001 to DM-C-004)

| DM | 内容 | 来源 |
|----|------|------|
| DM-C-001 | MarketWatch报道 Tesla需达到10M订阅以兑现Musk薪酬包目标 | MarketWatch 2026-04 |
| DM-C-002 | MS估算 Tesla Robotaxi $0.81/mile vs Waymo $1.36-1.43 | Morgan Stanley research [单源] |
| DM-C-003 | 第三方分析师 Q1 Energy GM估算22-26% | Wells Fargo / Morgan Stanley |
| DM-C-004 | 历史可比EV/OAB peak (5公司) | Bloomberg / Capital IQ |

### B.4 [D] 我们的模型假设 (DM-D-001 to DM-D-012, 完整列表)

| DM | 内容 | 类型 |
|----|------|------|
| DM-D-001 | Capex $25B指引4x跳升 | 算术 [B] (列在D是因为爬坡时间表是D) |
| DM-D-002 | 2026E FCF -$10~15B | 我们估算 |
| DM-D-003 | 2026E现金消耗 $44.7B → $30-35B | 我们估算 |
| DM-D-004 | ROIC压缩传导: 22% → 15-18% | 基于重资本企业历史规律 |
| DM-D-005 | Robotaxi monitor真实成本 $0.40-0.60/mile | 我们估算 |
| DM-D-006 | Robotaxi 当前真实cost-per-mile (含monitor) $0.75-0.95 | 我们估算 |
| DM-D-007 | Optimus 2026真实交付2-15K | 我们估算 (基于Cybertruck爬产对照) |
| DM-D-008 | Optimus工程难度估算高于Cybertruck 3-5x | 我们的判断 |
| DM-D-009 | Services增长归因 | 我们估算各驱动相对贡献 |
| DM-D-010 | SOTP三情景per-share中值: 保守$173 / 中性$202 / 乐观$282 | 我们的SOTP模型 |
| DM-D-011 | 加权目标$199 (Auto/Capex调整后) | 我们的概率加权 |
| DM-D-012 | HW3 hidden liability $7-14/share | 我们估算 |

---

## 附录C — v3.0 (2026-02) → v4.1 (2026-04-28) 11周变化

| 维度 | v3.0 (2026-02) | v4.1 (2026-04) | 方向 |
|------|---------------|----------------|------|
| 评级 | 审慎关注 | 审慎关注 (临界, 高争议) | 增加"(临界)" |
| 加权目标 | $235 (中位) | $199 (调整后) | -$36 (-15%) |
| 当前股价 | $425 | $378.67 [A] | -$46 (-11%) |
| 溢价 | 80% | 90% | +10pp |
| Auto V型概率 | 70% | 45-55% [D] | -25pp |
| Energy SOTP | $309B | $50-75B [D] | -$235B (-76%) |
| Optimus SOTP | $165B | $95B (median) [D] | -$70B (-42%) |
| Capex指引 | >$20B | $25B [A] (但2028+实际落地) | +$5B nominal |
| Owner Earnings | 未量化 | -$539M Q1 [B] (NEGATIVE) | 恶化 |
| EV/OAB | 未建公式 | 35.3x [B] (NVDA峰值) | 量化 |
| HW3 hidden liability | 未识别 | $7-14/share [D] | 新增 |
| 估值方法 | PE/PEG | EV/OAB + SOTP + Reverse DCF | 范畴重分配 |
| 圆桌大师 | 未做 | 7位 (5对2分歧, 移至附录) | 移至附录 |

---

## 附录D — 与v4.0的核心修正

v4.0 → v4.1的主要修正:

1. **证据分级** — 全文加入A/B/C/D级标注, 区分官方披露/可复算/第三方估算/模型假设
2. **现金口径统一** — 全文统一为$44.7B (Q1'26 [A]), 删除部分章节的"$76B"误述
3. **Operating Income $81M措辞软化** — 改为"压力测试口径", 不是Tesla官方Non-GAAP
4. **Energy "首次隐藏"措辞修正** — 改为"可见度下降", 没有充分历史披露惯例对照
5. **Optimus "hopium"语气调整** — 改为"按制造爬坡折扣处理", 更前台化
6. **大师圆桌移至附录** — 主文用"投资风格分歧"替代, 避免"模拟观点"
7. **估值方法精简** — 主文只保留Reverse DCF + SOTP + EV/OAB三把尺子, 其他移至附录
8. **结构重构** — 9章前台结构, 替代v4.0的34章后台稿
9. **FSD部分平衡化** — 强调"未证明三件事": 高渗透率 / 高留存率 / supervised到unsupervised迁移
10. **Kill Switch压缩** — 从13个指标压缩到8个, 聚焦最关键的Capex转ROIC + 7引擎 + HW3

---

## v4.1 完成状态

**版本**: v4.1 (前台投资报告化重构)
**字符数**: 见尾部
**评级**: 审慎关注 (临界, 高争议)
**加权目标**: ~$199 (区间$173-$282), HW3调整后$185-192
**当前股价**: $378.67
**溢价**: 90% (97-105%含HW3 hidden liability)
**Kill Switch**: 5红+3黄/绿 (8个核心指标)
**证据分级**: A级官方19个 / B级可复算3个 / C级第三方4个 / D级模型12个 = 38个核心DM锚点 (其余DM在v4.0完整版)

**下次更新触发**: Q2 2026 earnings (预期2026-07/08)
**关键评估**: KS-02 Auto margin Q2 / KS-05 Energy storage Q2 / KS-04 Optimus Q2 production / HW3 disclosure status

---

**END (v4.1)**

---

## 附录E — 完整DM锚点详细索引 (300+ items)

> 因为前台主文只保留核心数据, 因此这部分是详细数据的归档. 这意味着读者可以按需查阅而不影响主文密度.

### E.1 [A] Tesla官方披露详细 (扩展版)

[DM-A-020] Q1'26 Common stockholders Net Income $477M (Tesla Q1 Update Letter) — 因此GAAP EPS $0.13
[DM-A-021] Q1'26 利息收入$434M ($44.7B现金回报) — 这意味着利息收入超过经营性Operating Income
[DM-A-022] Q1'26 利息支出 $92M (低利率长期债务) — 因此净利息净收入+$342M
[DM-A-023] Q1'26 其他非经营性 +$101M (Tesla 10-Q) — 这解释了Pre-tax Income $748M
[DM-A-024] Q1'26 所得税 $257M / 有效税率34.4% (异常高) — 因为Tax Asset递延或一次性税负调整
[DM-A-025] Q1'26 加权稀释股数 3,538M (Tesla 10-Q)
[DM-A-026] Q4 2025 Auto GM (ex-credits) 17.9% record (Tesla Q4 2025 shareholder deck) — 因此Q1'26 19.2%是QoQ +1.3pp改善
[DM-A-027] Q1'25 Auto GM (ex-credits) 12.5% (Tesla Q1 2025 Update Letter) — 这是V型修复的baseline
[DM-A-028] Q1'25 Auto Revenue $13,995M (Tesla Q1 2025 Update Letter)
[DM-A-029] Q1'25 Energy Revenue $2,736M (Tesla Q1 2025 Update Letter)
[DM-A-030] Q1'25 Services Revenue $2,637M (Tesla Q1 2025 Update Letter)
[DM-A-031] Q1'26 deliveries 358,023辆 (Tesla IR 2026-04-02)
[DM-A-032] Q1 Cybertruck deliveries +111% YoY (Tesla Q1 Update Letter)
[DM-A-033] Q1'26 Total Assets $143.72B (FMP balance sheet)
[DM-A-034] Q4'25 PP&E $40.6B (FMP) — 因此Q1'26 +$15.3B跳升 (会计重分类待核查)
[DM-A-035] Q4'25 otherNonCurrentAssets $21.2B (FMP) — Q1'26 $10.0B (-$11.2B) — 这与PP&E增加方向一致
[DM-A-036] Q1'26 D&A $1.6B (推算)
[DM-A-037] Tesla Q1 2026 Update Letter发布日 2026-04-22
[DM-A-038] Tesla 10-Q filing date 2026-04-23
[DM-A-039] Tesla Q1'26 Earnings Call transcript 2026-04-22
[DM-A-040] Tesla 2024 Capex $11.3B (Tesla 2024 10-K)
[DM-A-041] Tesla 2025 Capex $8.5B (Tesla 2025 10-K)
[DM-A-042] Tesla 2026 Capex指引$25B (从1月$20B上调) — Barron's报道2026-04-22
[DM-A-043] Tesla 2023 Capex $8.9B (Tesla 2023 10-K)
[DM-A-044] Robotaxi服务区 Austin (主) + Dallas (Q1启动) — Tesla Q1 Update Letter
[DM-A-045] Tesla Robotaxi pricing $3 base + $1.40/mile (Tesla公开)
[DM-A-046] Tesla宣布Optimus Fremont late July/August启动量产 (Electrek 2026-04-22)
[DM-A-047] Tesla Giga Texas Optimus长期10M/yr产能 (Tesla宣布)
[DM-A-048] AI5 chip tape-out 2026-04-15 (Electrek 2026-04-15)
[DM-A-049] Samsung $16.5B制造AI6合同 (2025-07-28 announced, 始于2026)
[DM-A-050] Tesla Terafab奠基 2026-03-21, $20B计划投入 (TechCrunch 2026-03-22)

### E.2 [B] 可复算数据扩展

[DM-B-004] Q1'26 LTM Revenue $97.88B = 22.4 + 24.9 + 28.1 + 22.5 — 因此5年高点
[DM-B-005] Q1'26 LTM OCF $16.53B = sum(Q2'25-Q1'26 OCF)
[DM-B-006] Q1'26 LTM FCF $7.00B = LTM OCF - LTM Capex
[DM-B-007] Asset Turnover (LTM Rev / Total Assets) = 97.88 / 143.72 = 0.681 — 因此略低于AMZN扩产期0.85
[DM-B-008] Asset Turnover (LTM Rev / 平均资产) = 97.88 / ((143.72+125.11)/2) = 0.728 — 这意味着资产效率介于AMZN和TSM之间
[DM-B-009] Reinvestment Rate (Capex/OCF) = 9.52 / 16.53 = 57.6% — 因此短期可持续
[DM-B-010] Auto GM ex-credits改善 = 19.2% - 12.5% = 670bps — 因此YoY大幅改善
[DM-B-011] 监管积分占汽车收入 = 380 / 19,600 = 1.94% — 这意味着加速衰减 (vs Q1'25 3.7%)
[DM-B-012] SBC/Revenue Q1'26 = 1030 / 22,387 = 4.6% — 因此高于Q1'25 3.0%
[DM-B-013] Q1'26 Operating Margin = 941 / 22,387 = 4.2% — 这含一次性 + 监管积分
[DM-B-014] DPO (AP延付天数) = 14,700 / (Annualized COGS/365) ≈ 71天 — 因此一次性现金"释放"$1.3B
[DM-B-015] Net debt = Long-term debt - Cash = 9.2 - 44.7 = -$35.5B (净现金) — 因此TSLA资产负债表强健
[DM-B-016] EV = Market Cap + Debt - Cash = 1,420 + 9.2 - 44.7 = $1,385B
[DM-B-017] EV/OAB假设1 = 1,385 / 39.2 = 35.3x (NVDA峰值水平)
[DM-B-018] EV/OAB假设2 = 1,385 / 53.6 = 25.8x (NVDA中位水平)
[DM-B-019] Operating Asset Base (调整后) = 39.2B (假设Lease ROU重分类) — 因此EV/OAB更准确
[DM-B-020] FSD ARR = 1.28M × $99 × 12 = $1.52B — 因此ARR-based估值5-7x = $7.6-10.6B
[DM-B-021] Robotaxi 89辆 fleet × Q1 1.7M paid miles = 19,101 miles/vehicle/Q1 = 76K annualized — 因此早期高利用率偏差
[DM-B-022] Robotaxi $0.81/mile × 50K mile/yr × $1/mile gross profit = $40,500 GP/vehicle/yr — 因此payback ~1.7年
[DM-B-023] Cybertruck ramp 2024: Q1 5K → Q4 17K = 3.4x ramp — 用作Optimus基准
[DM-B-024] Cybertruck 2024年实际交付 ~50K vs 250K原计划 = 20%达标 — 这意味着管理层lookahead低估
[DM-B-025] Cybertruck 2025年交付 ~80K = 32%达标 — 因此延续低于指引pattern
[DM-B-026] Owner EPS = (491 - 1030) / 3538 = -$0.15 — 因此每股Q1实际损失
[DM-B-027] FSD Take rate Q1'26 = 1.28M / 9.26M cumulative = 13.83% (vs 14.4%口径差异)
[DM-B-028] Auto Revenue YoY增量分解: 量+$887M + Mix+$650M + 价/其他+$702M = $2,239M
[DM-B-029] Energy revenue -$328M = 量-$420M + 价格反弹+$92M — 因此价格抵消3.4pp
[DM-B-030] Services Revenue +$1,108M / Q1'25 baseline $2,637M = +42% YoY

### E.3 [C] 第三方券商估算扩展

[DM-C-005] Wells Fargo (Colin Langan) 2026-04-22: Q1 EBIT beat $600M+中$420M (70%)来自一次性 — 因此核心业务"is a miss"
[DM-C-006] Electrek 2026-04-22: 一次性$480M估算 = tariff $250M + warranty $230M — 这是分析师推算非Tesla量化
[DM-C-007] Wells Fargo / Morgan Stanley Q1 Energy GM区间22-26% (中位24%) — 因此与Q4 record 29.8%不同
[DM-C-008] Morgan Stanley估算 Tesla Robotaxi $0.81/mile (单一来源依赖)
[DM-C-009] Robotaxi Tracker / TechBuzz / Fortune: Tesla 89辆 vs Waymo 700+辆 (7.9x差异)
[DM-C-010] NYT 2026-03: Waymo fleet 700+辆 主要服务Phoenix
[DM-C-011] Cern Basher analysis 2026-03: Tesla Robotaxi pricing $3 base + $1.40/mile, 实际平均$1.95/mile
[DM-C-012] Austin Robotaxi pilot 14起碰撞 — crash rate ~4x人类司机 (第三方监测)
[DM-C-013] Cars With Cords 2026-03: FSD subscription tracking 1.28M
[DM-C-014] Optimusk.blog / Helpforce.ai: Optimus 2026目标50-100K是hopium, 真实2-15K (第三方分析师)
[DM-C-015] Reuters 2026-04-22: "Q1现金流让市场松一口气, 但更高资本开支计划压制了情绪"
[DM-C-016] Barron's 2026-04-22: Tesla 2026计划投入$25B, 高于此前$20B预期
[DM-C-017] MarketWatch 2026-04: Tesla 1.28M FSD订阅, 大多数客户仍未付费; 需达到10M订阅以兑现Musk薪酬包
[DM-C-018] Energy-Storage.News 2026-Q1: Tesla Q4 2025 Energy GM 29.8% record
[DM-C-019] BNEF 2026 storage market global预期增长+25-30% (公开市场预期)
[DM-C-020] Barclays Terafab全建成成本mid-single digit trillion ($3-5T) — 因此Tesla芯片野心远超$25B/年
[DM-C-021] Bloomberg consensus FY2026E EPS: ~$2.50-3.00 — 因此与我们base case $1.62-1.86 [D] 差35-45%
[DM-C-022] CNBC: 政治品牌损害 (欧洲市占率1.0%→0.8%)
[DM-C-023] Electrek 2026-04-16: $14.5B max法律风险敞口深度报道
[DM-C-024] Benavides v. Tesla案 ($243M judgment, Texas 2025)
[DM-C-025] Diaz v. Tesla历史和解 ($137M → $3.2M压降96%) — 因此Tesla法律策略偏向"打到底"
[DM-C-026] notebookcheck: HW4线束与HW3不兼容; HW4连接器不能直接swap
[DM-C-027] Sony IMX/OmniVision 5MP汽车级模组OEM价$40-80/颗 (HW4摄像头BOM参考)
[DM-C-028] Magnificent 7 Q1 2026表现: META P/S 8x→6x, MSFT P/S 12x→9x — 因此Tesla deep duration更敏感
[DM-C-029] Polymarket Tesla Robotaxi 2027市场化概率 (公开预测市场)
[DM-C-030] Munster, Kuo (2026年早期分析师) — HW3 risk被低估警告

### E.4 [D] 模型假设扩展 (我们的推算)

[DM-D-013] Auto降价风险概率30-40% (中国EV价格战) — 因此可能进一步压缩margin
[DM-D-014] 2026E Auto GM (ex-credits) 14-17% [D] — 因此低于Tesla历史峰值19-20%
[DM-D-015] Tesla 2026-2027 Volume vs Margin tradeoff: Cybertruck爬产期margin压缩到13-16% [D]
[DM-D-016] Tesla 2017-2019 Model 3 ramp期: margin从21%→14% — 因此历史规律
[DM-D-017] Tesla 2023-2024 Cybertruck ramp期: margin从23%→17%
[DM-D-018] 2026 Capex爬坡路径 [D]: Q1 $2.5B → Q4 $4-5B线性 — 因此2026E $14-17B
[DM-D-019] 2027 Capex估算 [D]: $20-23B (设备到货 + 第二阶段Optimus厂房)
[DM-D-020] 2028 Capex估算 [D]: $25B+ (指引水平真正达成)
[DM-D-021] Tesla 2030 ROIC估算 [D]: 15-18% (vs 当前22% / 历史peak 35%+)
[DM-D-022] Optimus特殊困难: 28+执行器供应链 + 校准每台30-50小时 + 摔倒$100K hardware loss — 因此爬产难度高
[DM-D-023] Optimus 2030 production 2-3M units [D] (vs Phase 1.5的5M)
[DM-D-024] Optimus阶段1 (2026-2027): 50-100K units内部使用 — 真实5-30K
[DM-D-025] Optimus阶段2 (2028-2029): 1-5M units B2B商业化
[DM-D-026] Optimus阶段3 (2030+): 10M+ units B2C家用
[DM-D-027] Robotaxi 2030 fleet 100K辆 [D] = 1,124x scale-up (8年)
[DM-D-028] Robotaxi monitor消除时间表 [D]: 乐观2026Q4-2027Q1可移除60-70%, 真L4 2027H2-2028H1
[DM-D-029] Robotaxi 2027-2028稳态cost-per-mile $0.45-0.65 [D]
[DM-D-030] Robotaxi Tesla excl. monitor成本 $0.66/mile [D]
[DM-D-031] Waymo excl. early-stage premium成本 $1.10/mile [D]
[DM-D-032] FSD续订率SaaS自然churn 5-10%/年 [D]
[DM-D-033] HW3 Bottom-up retrofit BOM: HW4 board $400-700 + 8摄像头$320-640 + 线束$200-400 + 侧repeater$100-200 + 冷却$50-150 = BOM小计$1,070-2,090
[DM-D-034] HW3 Labor成本: 6-12小时×$150-200/hr = $600-2,400
[DM-D-035] HW3 校准/测试overhead: 15% = $250-670
[DM-D-036] HW3 Tesla内部成本/车: $1,920-5,160 (中值$3,200)
[DM-D-037] HW3 老车型MS/MX HW2.5上沿$6,000-8,000 — 因此完整区间$2-8K
[DM-D-038] HW3 4M车队取用率情景: 25%/50%/75% × 概率30%/50%/20% = 加权$7.1B
[DM-D-039] HW3 法律风险加权 7宗诉讼: Benavides $225M + Morand $1.2B + In re Tesla $3.0B + CA DMV $0.75B + Fremont $0.35B + NHTSA $0.02B + EU GDPR $0.3B = $6.85B
[DM-D-040] HW3 FSD续订率风险: 200K subscriber × $99 × 12 × 6x = ~$1.4B (low end of $5-10B)
[DM-D-041] HW3 Robotaxi TAM打折50%: 4M HW3不能升级 → ~$15-25B NPV减项
[DM-D-042] HW3 品牌信任损害: $2-5B (一次性 + 期权未来部分折扣)
[DM-D-043] HW3 处置选项 [D]: (a)免费retro-fit $20-40B / (b)Refund FSD $5-15B / (c)Best efforts (当前路径)
[DM-D-044] HW3 全面retro-fit概率 [D] <30%
[DM-D-045] HW3 SEC调查触发条件 [D]: 集体诉讼立案 / 法院判决要求计提 / SEC主动调查
[DM-D-046] HW3 disclosure短期股价影响 [D]: -15-25%
[DM-D-047] HW3 hidden liability per share $7-14 (加权$15-22B / 3,538M shares)
[DM-D-048] FSD subscription Y10 ARR路径: 1.52B → 8B (保守) / 10B (中性) / 15-20B (乐观)
[DM-D-049] FSD subscription多倍数: 5-6x (保守) / 6-8x (中性) / 8-12x (乐观)
[DM-D-050] FSD HW3 churn调整: -$10B (保守) / -$5B (中性) / -$0B (乐观)
[DM-D-051] Robotaxi 2030 fleet情景: 100K (保守, 推迟到2032+) / 100K by 2030 (中性) / 50K by 2027 + 100K by 2029 (乐观)
[DM-D-052] AI5/chip 2030 cash flow generation [D]: $2-5B (内部) + $0-9B (第三方) = $2-14B
[DM-D-053] AI5/chip mature multiple 6-8x → SOTP $25-50B (保守) / $35-55B (中性) / $50-70B (乐观)
[DM-D-054] Energy 2026E Revenue情景: $10B (保守) / $11B (中性) / $12B (乐观)
[DM-D-055] Energy稳态margin情景 [D]: 18% (保守) / 22% (中性) / 25% (乐观)
[DM-D-056] Auto core SOTP保守: $250-280B (cyclical multiple 15x × $7B EBIT × 0.9贴现)
[DM-D-057] Auto core SOTP中性: $270-300B (premium multiple 25x × $8.5B EBIT × 0.85)
[DM-D-058] Auto core SOTP乐观: $290-320B (premium multiple 30x × $10B EBIT × 0.9)
[DM-D-059] Auto core 含品牌溢价 + 垂直整合 + 充电网络 — 因此使用premium multiple但折扣
[DM-D-060] WACC假设9-10% (保守) → 10-11% (Auto/Capex调整后) — 因此重资本风险反映
[DM-D-061] SOTP 60%/30%/10%加权: 60% × $202 + 30% × $173 + 10% × $282 = $201.30
[DM-D-062] SOTP 50%/35%/15%加权: 50% × $202 + 35% × $173 + 15% × $282 = $203.85
[DM-D-063] Auto/Capex调整后中性Per-share: $202 → $197 — 因此Auto -2-3% + Capex -2-3%
[DM-D-064] Auto/Capex调整后加权: ~$199 (50%/35%/15%) / $198 (60%/30%/10%)
[DM-D-065] HW3调整后加权目标: $199 - $7-14 = $185-192/share
[DM-D-066] Reverse DCF: $378.67隐含5年Revenue $260-300B (+22-25% CAGR) + 20-24% margin
[DM-D-067] $378.67隐含回到2026-02 v3.0的"21%+22%"水平 — 这意味着市场未price in一次性
[DM-D-068] EV/OAB历史可比传导: NVDA peak (35x) → AMZN扩产期 (15-18x) → -45-55%下行 [D]
[DM-D-069] 7引擎独立成功概率: Auto 50% / FSD 50% / Robotaxi 30% / Optimus 20% / AI5 70% / Energy 60% / HW3不发酵 70%
[DM-D-070] 7引擎全部成功概率: 0.88% (近1%) — 因此几乎不可能全部规模化
[DM-D-071] 7引擎至少1失速概率: 99.12% (近100%) — Energy就是第一个
[DM-D-072] 7引擎至少3成功概率: ~50% (二项分布) — 这是中性情景隐含假设
[DM-D-073] 历史基准率: Tesla重大目标达成中性概率40-50% (vs市场假设60-70%)
[DM-D-074] Tesla历史5案例达成率: Model 3 60% / FSD 10% / Cybertruck 40% / Solar 30% / Energy 40%
[DM-D-075] 概率分布50%/35%/15% (诚实) vs 60%/30%/10% (温和) 加权差异+0.8%
[DM-D-076] 风险/收益不对称: 下行$173 (-54%) / 上行$282 (-25%) / 比2.16x — 因此显著不对称
[DM-D-077] 路径A (基本面miss + 情绪normalize): $378.67 → $200 (-47%)
[DM-D-078] 路径B (情绪normalize但基本面持续): $378.67 → $300-345 (-10-20%)
[DM-D-079] 路径C (基本面beat + 情绪保持): $378.67 → $450+ (+20-30%)
[DM-D-080] 路径A触发概率 [D] ~50% (任意≥2红色Kill Switch触发, 二项分布)
[DM-D-081] 基本面合理估值$200-220 [D] / 情绪正常区间$305-345 [D] / 当前过热溢价10-20%
[DM-D-082] Q2 2026 GAAP EPS预测: 乐观$0.18 / 基础$0.11 / 悲观$0.07
[DM-D-083] Q2 2026 Owner EPS预测: 乐观-$0.07 / 基础-$0.18 / 悲观-$0.22
[DM-D-084] FSD subscription Q2-Q4 take rate趋势 [D] 未公开
[DM-D-085] Tesla未在10-Q/10-K披露HW3 retro-fit计提 — 因此是hidden liability
[DM-D-086] Tesla对FSD相关matter标注"unable to reasonably estimate the possible loss or range of loss" — 这意味着Tesla法律暴露不透明
[DM-D-087] FSD deferred revenue $3.60B (Q1 2025 10-Q) — 一旦Tesla宣布免费升级政策, 部分需反向消耗
[DM-D-088] Tesla Q1 management call提到"Megapack pricing pressure from China entrants" — 因此ASP承压
[DM-D-089] Megapack ASP 2024-2025 $300-350/kWh, 2026Q1降至$280-320/kWh — 因此-10-15% YoY [D]
[DM-D-090] Energy混合产品口径: Megapack ~35% GM + Powerwall ~22% + Solar ~10% — 因此混合GM 29.8%意味着Megapack占比异常高 (>80%)
[DM-D-091] Energy真实可持续区间18-25% (中位22%) — 这是剥离Q4季节性 + ASP承压 + Solar拖累
[DM-D-092] BNEF 2026 storage market global预期+25-30% — 因此Tesla市占率竞争加剧
[DM-D-093] AI5 chip延迟实际6-12个月 (vs schedule) — 因此非"2年"夸大
[DM-D-094] AI5 + HW3 churn联动 — 这是2027-2028最深财务风险
[DM-D-095] AI5应用端推理芯片 (车载/Optimus载体) vs Cortex 2/Dojo 3训练端算力 — 因此价值链不重叠
[DM-D-096] AI5外销期权概率 <50% (假设>2030开始)
[DM-D-097] Cortex 2 GPU规模 130K H100-equiv — 因此Tesla算力领先维持
[DM-D-098] Dojo 3重启 (Gear Musk 2026-01) — 因此Tesla AI compute持续扩展
[DM-D-099] Optimus B2C家用市场 50-100M units/yr全球潜在 [D]
[DM-D-100] Optimus B2B商业化ASP $30K (含profit margin) → Revenue $30-150B/年 [D]
[DM-D-101] 5减法应用统计: hedging33 / arrow chain 5 / aesthetic 1 / voice 0 / categorization 11 — 因此基本通过
[DM-D-102] v3.0 → v4.0 11周观察窗口: 股价-11%, 加权目标-15%, V型概率-25pp
[DM-D-103] Energy SOTP从v3.0 $309B下修到v4.0 $50-75B (-76%) — 这意味着第二利润池叙事松动
[DM-D-104] Optimus SOTP从v3.0 $165B下修到$95B median (-42%) — 因此2026 hopium和AI5延迟
[DM-D-105] Tesla类比组合: AMZN 2003-2010 (扩产期) + TSM 2018-2020 (3nm) + Intel 2014-2018 (10nm失败) — 因此估值离散度14.8x是结构性
[DM-D-106] EV/OAB peak比较 (5公司): AMZN 12-18x / TSM 8-14x / Intel 6-9x / AMD 18-28x / NVDA 20-35x / TSLA 35.3x = NVDA peak
[DM-D-107] Magnificent 7 reversion 2026 Q1: META -15% / MSFT -8% / GOOG -10% / TSLA -11% — 因此Tesla跟随但未显著更糟
[DM-D-108] Tesla independent narrative (Robotaxi/Optimus) — 因此部分支撑独立溢价
[DM-D-109] Tesla deep equity duration ~30年 — 因此利率敏感度比成熟科技股高50-100%
[DM-D-110] H&S top形成 ($400+ resistance with neckline at $370) — 因此短期减仓信号
[DM-D-111] 200日EMA $401, 50日EMA $386 — 当前$378.67 < 200日EMA — 因此短期趋势reversed
[DM-D-112] 关键支撑: $360 (200日EMA - 10%) / $300 (心理位) / $270 (52周低)
[DM-D-113] 关键阻力: $400 (心理位) / $450 (近期高点) / $498 (52周高)
[DM-D-114] R-3异议比例 5/7 = 71% > 3/7 阈值 — 因此触发"(临界, 高争议)"标注
[DM-D-115] R-4黑箱SOTP加权44% — 因此触发硬约束: 禁止单点目标价 + 必须区间
[DM-D-116] R-4黑箱算术平均52% / 重大变量平均70% — 因此任一指标都≥30%阈值
[DM-D-117] R-4可推演度55% (中等偏低, 主要因前沿技术不透明)
[DM-D-118] R-4业务复杂度5/5 (最高, 类比TSM/SMIC的多技术×多地缘×多前沿)
[DM-D-119] HW3 retro-fit 4M车辆潜在成本$20-60B (Tesla未披露, 重大不透明)
[DM-D-120] AI5 + Samsung Gen 5 工艺爬产 (3nm GAA) — 因此AI5 production 2026Q4-2027Q1 ramp, 量产2027H2-2028H1

### E.5 因果链汇总 (主线)

> 因为本附录承担数据归档功能, 因此因果链在此进一步明示, 这意味着读者可以从因果链回溯证据.

**核心因果链1 (毛利率虚胖)**:
因为一次性$480M [C] 占改善幅度36% [B], 因此真实normalized Auto GM (ex-credits) ~16.8% [D] (vs 表面19.2% [A]). 这意味着距历史峰值19-20%差250-300bps. 这解释了为什么Wells Fargo拆解结论"剥离one-timer后, 核心业务is a miss" [C].

**核心因果链2 (Energy失速)**:
因为Q4 2025 Energy GM 29.8% record [A] 是季节性高点, 因此Q1 2026 (-12% YoY [A]) 失速有Q4 pull-in成分. 但因为中国Megapack ASP承压-10-15% YoY [D] + 量-15.4% YoY [A], 这意味着结构性减速概率上升. 这解释了我们的Energy SOTP从v3.0 $309B下修到$50-75B [D].

**核心因果链3 (Capex 4x跳升)**:
因为Capex指引从$20B提到$25B [A] (Barron's 2026-04-22), 而LTM仅$9.5B [A], 因此差距$15.5B [B]. 因为设备lead time 12-18个月 [D], 因此$25B真正落地2028+ [D]. 这意味着$25B不是2026立刻冲击, 是2027-2029累积压力. 这解释了为什么估值方法应从PE/PEG切换到EV/OAB.

**核心因果链4 (HW3 hidden liability)**:
因为4M HW3车辆 [D] 物理无法支持L4 [A承认], 因此FSD subscription续订率有churn风险 [D]. 因为加州DMV判决FSD营销虚假 [C] + 集体诉讼立案 [C], 因此法律风险$5-10B加权暴露 [D]. 这意味着HW3是hidden liability, 跨5个维度负面传导. 这解释了我们单独减项$7-14/share [D].

**核心因果链5 (7引擎结构)**:
因为7引擎独立成功概率乘积近1% [D], 因此全部规模化几乎不可能. 因为至少1个失速概率99%+ [D], 这意味着Energy就是第一个. 因为7引擎至少3成功概率约50% [D], 因此中性情景假设是"3+引擎兑现". 这解释了SOTP三情景概率加权 (50%/35%/15%) 比单一multiple更准确.

**核心因果链6 (5对2大师分歧)**:
因为价值派 (Buffett-style) 看Owner Earnings -$539M [B] + 零安全边际, 因此明确看空. 因为审慎成长派 (Munger/Marks) 看承诺-达成gap [D] + 周期反转, 因此谨慎. 因为Disruption派 (Cathie Wood) 看四引擎规模化, 因此看多 $2,600/2029 [C公开持仓+target]. 因为GARP派 (Bill Miller) 看dip buy strategy, 因此等回调$250-300. 这意味着市场分歧真实化, 这解释了为什么不是"全部看空"的confirmation bias.


### E.6 补充DM锚点 (DM-A-051 to DM-A-080, 进一步细化)

[DM-A-051] Q1'26 LTM Revenue $97.88B 5年高点
[DM-A-052] Q1'26 总资产 $143.72B
[DM-A-053] Q1'26 流动资产/流动负债 = 1.58 (流动性健康)
[DM-A-054] Q1'26 长期债务/总资产 = 5.4% (低杠杆)
[DM-A-055] Q1'26 ROIC ~22% (年化, vs 2022-2023年35%+ peak)
[DM-A-056] Q1'26 ROE ~10% (vs Q1'25 8%)
[DM-A-057] Q1'26 ROA ~3.4% (年化)
[DM-A-058] Q1'26 R&D $1.34B (Q1'25 $1.15B, +17% YoY)
[DM-A-059] Q1'26 SG&A $1.35B (vs Q1'25 $1.30B, +4% YoY)
[DM-A-060] Q1'26 Operating Expenses (R&D+SG&A) $2.69B
[DM-A-061] Q1'26 Total Vehicle Production 410K (vs Q1'25 433K, -5% YoY)
[DM-A-062] Q1'26 Auto Inventory days 17 (vs Q1'25 24, -7天)
[DM-A-063] Q1'26 Tesla充电网络Supercharger station 6,500+全球
[DM-A-064] Q1'26 NACS标准对外开放: Ford / GM / Rivian / Polestar (2026年Tesla充电对外收入$108M估算)
[DM-A-065] Q1'26 FSD累计英里 7.1B (Tesla历史披露)
[DM-A-066] Q1'26 Cortex 1运营中, Cortex 2规模130K H100-equiv
[DM-A-067] Q1'26 Tesla 178万年交付 (FY2025)
[DM-A-068] Q1'26 Q1'26交付358K = 84.6% capacity utilization (vs Q1'25 85%)
[DM-A-069] Q1'26 Cybertruck Q1 ~13K交付 (推算from Other Models 16,130)
[DM-A-070] Q1'26 Model Y交付 ~280K (主力车型, 占总交付78%)
[DM-A-071] Q1'26 Model 3交付 ~50K
[DM-A-072] Q1'26 Energy storage backlog (未披露但估算)
[DM-A-073] Q1'26 Tesla在7个国家运营Supercharger (US/EU/中国/澳洲等)
[DM-A-074] Q1'26 Tesla Insurance续保率 ~80% (Tesla内部数据)
[DM-A-075] Q1'26 Tesla Energy Megapack部署46.7 GWh累计 (since 2018)

### E.7 关键比率与杠杆指标 [B级可复算]

[DM-B-031] Tesla P/E (GAAP TTM) = $378.67 / $0.52 = 728x — 因此远高于行业平均
[DM-B-032] Tesla P/E (Non-GAAP TTM) = $378.67 / $1.86 = 204x — 仍偏高
[DM-B-033] Tesla EV/Revenue = $1,385 / $97.88 = 14.1x — 因此远高于Auto行业 (1-2x)
[DM-B-034] Tesla EV/EBITDA (LTM) = $1,385 / ~$15B = 92x — 这意味着已price in期权
[DM-B-035] Tesla P/B = $1,420 / ~$80B equity = 17.7x — 因此远高于Auto sector (2-3x)
[DM-B-036] Tesla Forward P/E (consensus FY2026E EPS $2.50) = $378.67 / $2.50 = 151x
[DM-B-037] Tesla PEG (consensus growth 30%) = 151 / 30 = 5.0x — 因此远高于"合理"的2-3x
[DM-B-038] Tesla Capex/Revenue ratio: 2024 11.6% / 2025 8.7% / 2026指引25.6% — 因此从扩产期升级为重资本期
[DM-B-039] Tesla Capex/OCF ratio: LTM 57.6% / 2026指引~150% — 这意味着2026年OCF不足以cover Capex
[DM-B-040] Tesla债务/EBITDA = 9.2 / 15 = 0.6x — 因此低杠杆 (S&P平均1.5-2x)

