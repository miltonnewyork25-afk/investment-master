# Intel: 当前价格已经提前买了多少成功

**当前股价 (2026-04-24 close)**: $82.57 (盘中高 $85.22)
**今日 PV 区间**: $18-25 / **5y exit value 区间**: $26-35 (加权 $29)
**评级**: 审慎关注 (高争议) / **5y 期望回报**: -65% / **行动**: avoid / watch / wait for reset

> **报告版本说明**: 这是 v3.4, 一次性整体撰写的连贯研报, 不是 v3.0 / v3.1 / v3.2 / v3.3 的补丁或叠加. 全文采用单一估值口径, 不存在新旧数字并存. 数据截止 2026-04-27, 涵盖 Intel Q1'26 actual results (2026-04-23 release).

---

## 执行摘要

Intel 在过去 13 个月把股价从 2025 年 3 月低点的 $19 推到了 2026 年 4 月 24 日收盘的 $82.57. 涨幅 +335%, 远超同期 AMD (+12%), NVIDIA (+45%), SOX (+28%). 隐含市值约 $357B (按 4.32B 摊薄股本).

这种涨幅需要 turnaround 故事支撑. 市场的故事是: (1) Tan Lip-Bu 2025 年 3 月接任 CEO 带来战略奇袭, (2) 18A 工艺 2025 Q4 进入 volume production, 重夺工艺竞争力, (3) CHIPS Act $7.86B direct funding + $3B Secure Enclave 合同 + 25% investment tax credit + Trump 政府 10% 直接持股 ($36B 估值) 形成 too-big-to-fail backstop, (4) Q1'26 实际数据 (4-23 release) 部分确认 turnaround — DCAI revenue $5.1B (+22% YoY), Intel Foundry 接到 NVIDIA DGX Rubin NVL8 host CPU 订单, Google Cloud 公开 Xeon 6 多年合作.

我们认为这些事实方向上为真, 但价格已经过度提前买了它们. 我们用三种方法独立估算 Intel 的合理价格区间, 三种方法 converge 到 $15-22/share (中位 $18-19, 即今日 PV $19.76). 这意味着即便包括所有合理的 turnaround 假设, 当前 $82.57 仍然显著高估.

但我们不给 high-conviction SELL 推荐. Q1'26 数据 (DCAI +22%, NVIDIA Rubin Xeon 6 选用, Google Cloud 合作, Non-GAAP 毛利率 41% 同比 +430bp) 部分削弱了 v3.0 的"完全失去 AI server" 论点. 加上政府 puts 提供下行保护, lift size 难把握 (历史半导体周期股 SELL 通常在 -30% 后出现 dead cat bounce +20-30% 才进入 -50%+ 路径), 单边 SELL 的赔率从 v3.0 的 80%/20% 下降到 v3.4 的 65%/35%. 我们把评级定为审慎关注 (高争议), 行动建议是 avoid / watch / wait for reset.

具体来说: 在 4 种主流投资风格里, 4 种都不建议 BUY, 但只有 1 种 (Long-short / 反身性) 主动 SELL with caveat, 其余 3 种 (质量投资 / Special situations / Deep value) 是 avoid 或 WATCH 状态. 这种"4/4 不 BUY 但只有 1/4 SELL" 的分歧本身就反映了高争议状态.

接下来的 6-12 个月有 5 个 catalyst window: AMD Q1'26 release (4-29), AWS re:Invent (5-1), Intel Q2'26 earnings (8 月), NVIDIA GTC Vera reference design (Q3-Q4), Intel Foundry external revenue Q3'26 update. 3+ catalyst 在 6 个月内联合 fire 概率 40-50%. 任一显著触发后我们会重做估值, 不会在 v3.4 上叠加补丁.

---

## 第一部分: Intel 当前到底是什么生意

### 1.1 业务结构与 Q1'26 季度切片

Intel FY2025 报告 3 个 reportable segment: Client Computing Group (CCG, PC + 已整合的原 NEX edge 部分), Data Center & AI (DCAI, server CPU + 已整合的原 NEX networking 部分), Intel Foundry (代工业务, 含内部转移 + external customer). Mobileye (Intel 持股 74%) + Altera 残余 + 其他业务归入 "All Other". 这是 v3.0 报告中曾经误列 5 个 reportable segment 的修正.

| Segment | FY2025 Revenue | Q1'26 Revenue | Q1'26 YoY | OPM 范围 |
|---------|--------------|--------------|-----------|---------|
| CCG | ~$32-34B | ~$7B | +3% | 10-13% |
| DCAI | ~$15-17B | $5.1B | **+22%** | -2 to +5% |
| Intel Foundry (含内部) | $17.5B | $5.4B | +16% | -23 to -27% |
| Intel Foundry (external only) | <$1B 年化 | $174M | n.m. | 同上 |
| All Other | ~$2-3B | ~$0.5-1B | varies | varies |
| 合计 | $52.9B | $13.6B | +7% | -3 to 0% blended |

数据来源: Intel FY2025 10-K + Q1'26 release (2026-04-23) + Q1'26 earnings transcript (Motley Fool).

### 1.2 5 年财务全景: 收入 -32%, GAAP EPS 转负

Intel 过去 5 年从 FY2020 historical peak 走到 FY2025 谷底. Revenue 从 $77.9B 下降到 $52.9B (-32%), GAAP EPS 从 $4.94 跌到 -$0.06 (转负, -101% 跌幅), Non-GAAP EPS 从历史 $4.94 高位跌到 $0.42 (-91%), GAAP gross margin 从 56.1% 收缩到 34.8% (-21.3pp).

这 -32% 的收入下滑里, -19B (76%) 来自 DCAI 的 server CPU 失血 — 在过去 5 年, Intel server CPU market share 从 2020 Q1 的 89% 跌到 2025 Q4 的 60.5% (-28.5pp), 平均每年失 -5.7pp. 这是 AMD EPYC 系列的产品代际优势加上 hyperscaler 自研 ARM (AWS Graviton, Microsoft Cobalt, Google Axion) 联合造成的, 不是单一 driver.

毛利率收缩 -21.3pp 的归因更具结构性. 工艺落后 (Intel 10nm yield 从 0% 到 70% 用了 30 个月, 14nm++ 持续生产, wafer cost 高) 贡献 -7pp. AMD Zen 3/4 的竞争压力 (强迫 Intel 在 cloud sales ASP 下调 -8 to -12%) 贡献 -6pp. CapEx 大幅 ramp 推动 D&A 上升贡献 -3pp. Foundry 早期 GM 严重负 (-25% 到 -35%) 在 mix-weighted 上拉低 -2pp. FY2024-FY2025 的 restructuring + 一次性 impairment 贡献 -1.5pp. FY2023 因为 chip glut 的 inventory writedown 贡献 -2pp. Mobileye 高 GM 略有正贡献 +0.5pp.

EPS 下滑 $5+ 的归因: 收入 -25B 直接贡献 -$3.95 (基于 FY2020 base 的 sensitivity), GM 收缩 -21pp 贡献 -$2.20, OpEx 控制只贡献 +$0.55 (R&D 维持 $13-16B 不能砍, SG&A 减 -10%), D&A + 利息 + 稀释 -$0.85 (LT debt 从 $34B 升到 $53B), restructuring + impairment -$0.85.

这意味着 EPS 恢复必须同时解决 (a) revenue trajectory, (b) GM 改善, 单靠 cost cut 无效. 因为 R&D 不能砍 (放弃 18A = 放弃 turnaround), OpEx 杠杆已经反向.

### 1.3 现金流: 6 年累计 FCF -$15B, 净债务从 -$9B 恶化到 -$41.5B

| Year | OCF | CapEx | FCF | 期末净债务 |
|------|-----|-------|-----|-----------|
| FY2020 | $35.4B | -$14.3B | +$21.1B | -$9.4B |
| FY2021 | $30.0B | -$18.7B | +$11.3B | -$5.7B |
| FY2022 | $15.4B | -$24.8B | -$9.4B | -$11.2B |
| FY2023 | $11.5B | -$25.7B | -$14.2B | -$22.5B |
| FY2024 | $8.2B | -$24.0B | -$15.8B | -$27.9B |
| FY2025 | $14.5B | -$22.2B | -$7.7B | -$38.7B |
| Q1'26 | — | — | — | **-$41.5B** |

Intel 6 年累计 OCF $115B, CapEx -$130B, 净 FCF -$15B. 净债务从 FY2020 的 -$9.4B 恶化到 Q1'26 的 -$41.5B, 6 年消耗 $32B 的资产负债表. 这里需要纠正一个 v3.0/v3.1 的措辞错误: 早期版本说 Intel "Q1'26 净现金 +$5B", 这是把某种 unrestricted operating cash 的口径误用为 balance sheet 净现金. 真实情况是 LT debt $53B - cash + ST investments $11.5B = 净债务 -$41.5B.

这个净债务规模是 AMD 2009 年决定 spinoff GlobalFoundries 时财务压力 ($7B+ 净债务) 的 6 倍. 不同的是 Intel 现在有 CHIPS Act + 政府持股提供 backstop, 不像 AMD 当时面临 immediate distress. 但 5 年内如果继续 -$30 to -$50B FCF, 净债务可能跌至 -$80B+, 信用评级 (当前 A- / A3) 在 75%+ 的历史基准下会下调一档至 BBB+ / Baa1, 触发 +50-100bp credit spread, 额外 $250-500M/year 利息成本.

### 1.4 ROIC vs WACC: 反护城河持续

把 5 年财务画像翻译成单一指标: Intel 当前 ROIC. 用 FY2025 Non-GAAP EBIT $1.5B × (1 - 14% effective tax) = NOPAT $1.3B. Net Invested Capital 是 PP&E (net) $79B + Goodwill + Intangibles $52B + Operating WC $14B - Cash + ST investments $11.5B = $134B. ROIC = $1.3B / $134B = 1.0% (Non-GAAP base), mid-cycle adjusted 区间 2-4%. 用 GAAP NOPAT 则为负.

WACC 的 CAPM 严格计算: 4.3% 10y Treasury + 1.30 beta × 4.5% equity risk premium = 10.15% cost of equity. 5.2% pre-tax cost of debt × (1 - 14%) = 4.5% after-tax. 80% E/V + 20% D/V 加权 = 9.02%. 半导体行业 WACC convention 7-9%, 中位 8% (Damodaran 2026 数据库). 我们采用 8% 作为主折现率, 9% 作为 sensitivity 上限.

ROIC 1-4% vs WACC 8% = 负 spread -4 to -7pp. 在 Net Invested Capital $134B 上, 每年的 EVA loss = -5.5pp × $134B = -$7.4B. 这是反护城河的硬定义, 不是叙事问题.

要让 ROIC 在 5 年内追上 WACC, 需要 +400-600bp 改善. 4 条潜在路径分析: (a) 收入回到 FY2020 peak $77.9B (+47% from 当前), 历史基准率 < 10% — server share 不可能恢复 89%; (b) GM 改善 +10pp (35% → 45%), 历史基准率 15-20%, 18A 量产 + scale 可能, Q1'26 Non-GAAP GM 已经从去年同期的 36.7% 升到 41.0% (+430bp), 但需要持续到 FY2026 全年; (c) OpEx 削减 -20%, 历史基准率 30-40%, 但削减 R&D = 放弃 18A 战略, 不可行; (d) Foundry 转正 + scale, 历史基准率 20%, 需要 5y+ 时间窗口.

任何单一路径都不足以让 ROIC 5y 内追上 WACC. 必须 multiple paths 同时成功. 假设独立, 联合概率 < 15%. 这意味着反护城河 5y 持续是 base case.

不应该用成长股 PE 倍数 (40-60x) 给一家反护城河公司估值. 应该用周期股 PE (12-18x) + ROIC 折扣 + Foundry NPV adjustment.

---

## 第二部分: Q1'26 实际数据告诉我们什么

Q1'26 release (2026-04-23) 比我们这版报告早 4 天. 这一节把 Q1 数据翻译成对 thesis 的影响.

### 2.1 财务数据修正与 GAAP / Non-GAAP 边界

| 指标 | Q1'26 actual | 含义 |
|------|------------|------|
| Revenue | $13.6B (+7% YoY) | 季度同比正增长, 5 年来首次稳定 |
| GAAP EPS | -$0.73 | 含 impairment / restructuring ~$3-4B 一次性 |
| Non-GAAP EPS | $0.29 (+123% YoY) | 反映 underlying operating, 但季度小幅 |
| GAAP Gross Margin | 39.4% (+460bp YoY) | 5 年最大单季度 GM 改善 |
| Non-GAAP Gross Margin | **41.0%** (+430bp YoY) | Intel 官方 reported, 不是 38.5% (v3.1 错值) |
| Q2'26 Non-GAAP EPS guidance | $0.20 | 季度环比下降 -31% |

Q1'26 GAAP EPS -$0.73 与 Non-GAAP EPS $0.29 之间有 $1.02/share 的差距, 这个差距来自 ~$3-4B 的一次性 impairment / restructuring 项目. 解读时必须把 operating recovery (Non-GAAP EPS +123%) 和 accounting clean-up (GAAP loss 含 impairment) 分开. 不能简单说 "GAAP 改善" 就是 turnaround, 也不能说 "GAAP loss" 就是仍在恶化.

### 2.2 客户与产品 announcements

Q1'26 同时公布的几个客户进展直接影响 bear thesis:

**NVIDIA DGX Rubin NVL8 选 Xeon 6 作为 host CPU**. 这是显著的 partial reverse 信号. v3.0 报告假设 "NVIDIA Vera 100% Grace ARM" 概率 70-80%, 但 Rubin NVL8 (Rubin 系列的一个 SKU) 选了 Intel x86 host. 这意味着 NVIDIA 在 AI server CPU 战略上不是"Grace ARM 一边倒". 我们把 Vera 100% Grace 概率从 70-80% 下修到 50-60%, Vera partial Xeon 概率从 15-20% 上修到 25-35%. 但 Vera (Rubin 的下一代) 的 reference design 要等到 2026 Q3-Q4 NVIDIA GTC 才公布, 所以这个信号是 partial 不是 final.

**Google Cloud Xeon 6 多年合作** 是另一个 hyperscaler 的公开 commitment. AWS Graviton 4 已经占 AWS new EC2 design 50%, Microsoft Cobalt 占 Azure 25%, Google Axion 占 GCP Tau 30%. 但 Google Cloud 仍然签了 Xeon 6 多年合作, 表明 ARM 渗透虽然不可逆, 但 Intel x86 在 hyperscaler 仍有立足点.

**TeraFab 项目宣布** 是新一代 fab 架构. 长期 catalyst, 短期不影响估值.

**18A yield 进度** Tan 在 earnings call 强调 on track. 但 Intel 历史习惯是 yield <50% 时不公开数据 — 当前 0 公开数据 = yield <50% 概率高. 这是含蓄信号.

### 2.3 削弱 vs 强化 bear thesis

把 Q1'26 数据组织成"削弱" vs "强化" bear 两边:

削弱 bear 的证据: DCAI +22% YoY (5 年来最强 server 增长), Xeon 6 选为 NVIDIA DGX Rubin NVL8 host CPU (NVIDIA AI server 仍有立足点), Google Cloud Xeon 6 多年合作 (单一 hyperscaler partner), Q1'26 Non-GAAP EPS $0.29 (+123% YoY), Q1'26 Non-GAAP GM 41.0% (+430bp YoY), Tan 强调 18A yield on track 与 integrated foundry 执行.

强化 bear 的证据: Intel Foundry external revenue 仅 $174M (季度年化 <$1B, 距离市场假设 5y $20B+ 差 75%+), Foundry operating loss -$2.4B, Q1'26 GAAP EPS -$0.73 (含 impairment), Q2'26 guidance Non-GAAP EPS $0.20 (季度环比下降), Q1'26 净债务 -$41.5B (vs FY2020 -$9.4B 恶化 -$32B), AMD server share 32.3% (Q4'25, 待 4-29 update), Trump 2026 Q1 提议重新评估 CHIPS Act (Polymarket 35% rollback 概率).

净影响: bear thesis 方向仍成立 (公允 << 当前股价), 但 conviction 显著弱化. v3.0 估算的 Bear case 概率上限从 42% 下修到 35%, Bull case 概率上限从 12.5% 上修到 20%. 这就是为什么我们这版 (v3.4) 评级是审慎关注 (高争议) 而不是单一 SELL.

### 2.4 一个关键纠正: Tan 没有"公开拒绝" Foundry spinoff

v3.0 报告把"Tan 在 4-24 earnings call 公开拒绝 Foundry spinoff" 列为母裂缝事实之一, 标记为 [B] 级硬信号. v3.4 修正这一点 — 查阅 Q1'26 earnings transcript (Motley Fool 2026-04-23), Tan 确实强调了 14A 进度, TeraFab 项目, 客户披露, advanced process 执行, 但**没有逐字 "reject spinoff" 声明**. 把"管理层强调 integrated foundry / advanced process 执行"误读为"公开拒绝 spinoff" 是 v3.0 的解读错误.

正确表述: 管理层未释放 spinoff 信号, 也未公开 reject. Spinoff 概率维持 10-15% 历史基准率 (基于 AMD-GlobalFoundries 2009 case Hector Ruiz 14 个月窗口). 这意味着 spinoff option 仍然 alive, 监控触发条件 (Bloomberg/Reuters scoop, 投行 IB pitch, Board strategic review, Tan 改口 "consider all strategic options") 仍然有意义.

---

## 第三部分: 三种估值方法 + 反向 stress test

我们用三种独立方法估算 Intel 合理价格, 加上反向 stress test 检验当前 $82.57 的隐含假设.

### 3.1 方法一: Sum-of-the-parts (SOTP)

按 Intel FY2025 reportable structure 拆解:

| Segment | 估值方法 | Fair Value ($B) | $/share |
|---------|---------|---------------|---------|
| CCG | 12x EBIT × $4-5B EBIT | $50-60B | $11.6-13.9 |
| DCAI | 15x EBIT × $0.3-1.5B EBIT (周期低位) | $5-22B | $1.2-5.1 |
| Intel Foundry | NPV (基于 Q1'26 anchor, 见后) | -$15 to +$5B | -$3.5 to +$1.2 |
| All Other (Mobileye 74% + Altera) | Mobileye market cap × 74% + Altera 估算 | $10-12B | $2.3-2.8 |
| 净现金 / 投资 (mark-to-market) | $11.5B | $11.5B | $2.7 |
| 政府 puts 期权 (adjusted) | 见 §3.4 | $0-9B | $0-2 |
| 减 LT debt | -$53B | -$53B | -$12.3 |
| **SOTP equity value** | — | $13-67B | **$3-15/share** |

SOTP 中位 ~$8-10/share. 这是最 conservative 的估值方法, 因为 Foundry segment 在 base case 下贡献负值, All Other 估值偏低 (Mobileye 持股 mark-to-market 后市值波动大).

### 3.2 方法二: 三情景概率加权 DCF (5y exit + 折现)

定义 Bear / Base / Bull 三情景, 给概率区间, 计算 5y exit value 与今日 PV.

**Bear case (概率 30-45%, 中点 37.5%)**: 18A yield 推迟 12+ 个月, Foundry external 5y 累计 <$5B, AMD share >35% by 2027, NVIDIA Vera 100% Grace ARM, DCAI 反弹被证明是周期性 (单季度), 信用评级下调, Foundry 战略调整放弃 leading-edge. 5y exit value $8-15, 中点 $11.5.

**Base case (概率 40-55%, 中点 47.5%)**: 18A yield 在 2027 H1 达到 70%+ (略推迟 vs Tan 强调的 timeline), Foundry external 5y 累计 $5-10B (Q1'26 $174M run-rate 略加速但未爆发), DCAI 维持 +15-20% YoY (反弹但不是 trajectory 转折), 政府 puts 维持但 strike 实际只到 $10-15, Tan 不发动 spinoff, server share 跌到 50-55%. 5y exit value $28-35, 中点 $31.5.

**Bull case (概率 8-20%, 中点 15%)**: Apple A20 NDA 公开, Microsoft Cobalt 2 wafer commitment 上修至 60K+, Tan trigger spinoff fire, NVIDIA Vera 50%+ Xeon, DCAI 连续 3 季度 +20%+, 18A yield >70% in 2026 H2. 5y exit value $55-75, 中点 $65.

加权 5y exit value: 37.5% × $11.5 + 47.5% × $31.5 + 15% × $65 = $4.31 + $14.96 + $9.75 = $29.02. 区间表达 $26-35.

折现回今日, 用 8% WACC × 5y, 折现因子 0.681: $29.02 × 0.681 = $19.76. 区间 $18-25 (反映 90% 置信).

### 3.3 方法三: Peer multiple

历史 Intel 周期顶部 EV/Sales 4-5x (2017-2019 Sky Lake 顶 4x, 2010-2014 顶 2.5-3x, 2000 互联网泡沫顶 12x). 周期中位 EV/Sales 2-3x. 当前 trailing EV/Sales 7.5x ($398B EV / $52.9B FY2025 revenue) 显著高于周期顶部水平.

四种 peer multiple 计算:
- IDM 同业中位 P/Sales 2.15x (Samsung Semi + SK Hynix avg) → 公允股价 $14
- Foundry 同业中位 P/Sales 2.85x (GlobalFoundries + UMC avg) → 公允股价 $19
- INTC 自己历史周期中位 P/Sales 3.5x → 公允股价 $24
- ROIC 调整 P/Sales 2.45x (3.5x × (1 - 30% reverse-moat discount)) → 公允股价 $16

加权平均 $18/share.

### 3.4 政府 puts 的真实价值

v3.0 把"政府 puts" 用 Black-Scholes 直接给 $5-8/share. 这忽略了几个重要因素.

把 CHIPS Act + 持股拆为四项: $7.86B direct funding (降低 CapEx 现金压力, 不是收入), $3B Secure Enclave 合同 (政府合同, 需要对应履约成本), 25% investment tax credit (依赖 CapEx 实际投入, 抵减税负不是直接现金), 10% 政府持股 (估值 $36B, 但是稀释 + 战略约束 + implicit puts 三种性质并存).

调整后的真实 puts value:
- 融资约束缓释 (CHIPS direct + tax credit): +$3-5/share (降低 CapEx 现金压力)
- 战略灵活性折价 (spinoff / M&A / layoffs / asset sale 受限): -$2-4/share
- Implicit puts (distress 时介入, strike $10-15 校准 GM 2009 case 而非市场假设 $25-30): +$1-2/share
- 10% 持股稀释: -$1-2/share
- CHIPS rollback 风险 (Polymarket 35% Trump 2026 重新评估): -$1-2/share

净 puts value: 0 to +$2/share. 远低于市场假设 +$8/share.

### 3.5 三方法 cross-validation

| 方法 | 公允估值 |
|------|---------|
| SOTP | $8-15 (中位 $10) |
| 三情景概率加权 DCF (today PV) | $18-25 (中位 $19.76) |
| Peer multiple 加权 | $18 |
| **三方法加权** | **$15-19/share** |

三种方法独立 converge 到 $15-19 区间. 我们采用 $18-25 today PV 区间作为最终公允估值, 选偏上限是因为三情景 DCF 包含了 unconditional upside (supply 红利, 政府 puts adjusted, spinoff 期权) 而 SOTP / peer multiple 偏 conservative.

### 3.6 反向 stress test

倒过来问: 当前 $82.57 隐含的 5y 假设是什么?

要让公允达到 $50/share, 需要四个假设同时成立: server share end 5y 60% (vs 我们中性 50-55%) +$8, Foundry NPV 5y +$5/share (vs 中性 +$2) +$3, 政府 puts strike $25 (vs 校准 $10-15) +$5, NVIDIA Vera 50%+ Xeon (Bull case) +$3, Tan spinoff trigger fire +$5. 合计: $19.76 + $8 + $3 + $5 + $3 + $5 = $43.76 (近似 $50). 联合概率 0.30 × 0.20 × 0.30 × 0.15 × 0.10 = 0.027% (假设独立), 考虑 partial 相关性 1-3%. **$50 公允实现概率 < 5%**.

要让公允达到 $80/share (即 justify 当前 $82.57), 需要再加 +$30 的 upside, 包括 18A yield >70% in 2026 H2 (低概率), Apple A20 NDA 2026 H2 公开 (低概率), Microsoft Cobalt 2 60K+ wafer (中概率), 政府 puts call upside (低概率). 联合概率 0.027% × 0.30 × 0.10 × 0.40 × 0.05 = 1.6 ppm = 0.00016%. **$80 公允实现概率近 0**.

这与当前股价 $82.57 直接矛盾. 市场给 $82.57 隐含的是"$80+ fair value 应有合理概率", 但我们的分析显示概率近 0, 因此当前估值不合理.

---

## 第四部分: Intel Foundry 的真实经济性

Foundry 是当前估值争议最大的 segment. 市场默认给 Foundry segment 隐含估值 +$30/share (按 TSMC-like multiple). 我们的估算是 -$9 到 -$5/share. 差距 -$35 到 -$39/share, 解释当前股价 $82.57 vs 公允 $19.76 之间 gap 的 60%+. 这一节深入这个差距.

### 4.1 Foundry 战略需要满足三个条件

要 Foundry 创造正 NPV, 三个条件必须同时满足: (a) 18A yield 在 2027 H1 达到 70%+ (使产能 useful), (b) External customer 5 年累计 commitment $20B+ (覆盖至少 30% capacity utilization), (c) Foundry 5 年后进入 8%+ OPM 稳态 (vs TSMC 35%+).

**条件 (a) 18A yield 70%+ 的概率 30-40%**. 历史基准率: Intel 14nm yield 从 0% 到 70% 用了 24 个月, 10nm 用了 30 个月 (well-known disaster), Intel 4 用了 18 个月 (improvement). 18A best case 12 个月 (2027 H1), base case 18 个月 (2027 Q3), worst case 24+ 个月 (2028 H1). Q1'26 Tan 强调 on track 但未公开实际数据. INTC 历史习惯 yield <50% 时不公开 = 当前 0 公开数据暗示 yield <50% 概率高.

**条件 (b) External commitment $20B+ 的概率 20-25%**. 历史基准率: 半导体公司从"落后" 到 5y 内获得 $20B external commitment 的成功案例为 0 (TSMC 用 10y). 当前公开 commitment: Microsoft Cobalt 2 30K wafer LOI ($1.5-2B 5y), DoD subsidies ($0.5-1B), Apple A20 NDA 传闻 ($0-3B), 累计 $3-15B. Q1'26 Foundry external $174M / 季度年化 <$1B. 5y 累计实际可能 $5-10B (维持当前 trajectory).

**条件 (c) 8%+ OPM 稳态的概率 25-30%**. 历史基准率: Foundry 进入 8%+ OPM 需要 utilization 80%+ + GM% 35%+ + R&D/Rev <12%. TSMC 用了 8-10 年. Q1'26 Foundry GM% -45% (operating loss -$2.4B / revenue $5.4B), 距离 8% OPM 稳态 > 50pp 改善.

三条件联合概率: 35% × 22.5% × 27.5% = 2.17% (独立连乘). 加上正相关性调整 ×1.5 = 3.25%. P(三条件 2/3 满足) ≈ 18-25%, P(三条件 1/3 满足) ≈ 35-40%, P(三条件 0/3 满足) ≈ 25-35%. Foundry "完全成功" 概率 < 5%.

### 4.2 三情景下的 Foundry 5y NPV

**Bull case (概率 15%)**: 三条件 2/3 满足, 5y external rev $15-25B, GM% 转正, terminal value $25-50B. Year-by-year FCF: -$22B / -$18B / -$14B / -$8B / -$5B = 5y 累计 -$67B. 加上 prepayment $10B + 政府 grants $15B = 净 NPV +$1 to +$5/share.

**Base case (概率 47.5%)**: 三条件 1/3 满足, 5y external rev $5-10B, GM% 接近 0, terminal value $5-15B. Year-by-year FCF: -$23B / -$19B / -$18B / -$15B / -$12B = 5y 累计 -$87B. 加上 prepayment $5B + 政府 grants $12B = 净 NPV -$10 to -$5/share.

**Bear case (概率 37.5%)**: 三条件 0/3 满足, 5y external rev $2-5B, GM% -25 to -35%, terminal salvage value -$5 to +$5B. Year-by-year FCF: -$24B / -$20B / -$19B / -$16B / -$14B = 5y 累计 -$93B. NPV -$15 to -$18/share.

加权 Foundry NPV: 15% × +$2.5 + 47.5% × -$8 + 37.5% × -$15 = +$0.38 - $3.80 - $5.63 = **-$9.05/share**. 区间 -$17 到 +$3.

### 4.3 Spinoff 期权的真实价值

如果 Tan 在 5 年内宣布 spinoff (概率 10-15%, 中点 12.5%), 期权值算法:

Foundry 作为独立公司的 standalone 价值: Revenue $20-30B (5y exit), GM% 8-15%, EBITDA $1-2B, multiple 5-8x EBITDA (vs TSMC 12x, 折价反映 unproven track record). Standalone EV $5-15B 减去债务承继 $20-25B = net equity value -$20 to -$10B (Foundry 作为独立公司可能资不抵债).

但 Spinoff prize for INTC parent 来自三方面: debt deconsolidation +$25B, 集团 GM/OPM 改善 +5pp blended → 估值倍数 re-rating +$30B, IP/customer relationship 保留 +$5B. 合计 +$60B = +$15/share.

期权值: 12.5% × $15 = $1.88/share. 如果 KS-spinoff trigger fire (Tan 公开转向 / 投行 pitch / Board strategic review), 概率 jump 至 35%, 期权值跳升至 $5.25/share, 公允从 $19.76 上修至 ~$23.

### 4.4 与 GlobalFoundries 失败镜像的对比

GlobalFoundries 2009 从 AMD 拆分独立, 有 Abu Dhabi sovereign wealth backstop, 与 TSMC 竞争 leading-edge. 2014 年 14nm yield 困境, 2018 年宣布"放弃 7nm 及以下 leading-edge", 专注 mature node. Apple/AMD 全部转 TSMC 7nm. 2024 年现状: Revenue $7B (5y CAGR -2%), GM% 24%, market cap $25B (P/Sales 3.5x, 仅 mature 公司估值).

GlobalFoundries 用了 9 年验证了"半导体 Foundry leapfrog 失败概率 85%+". Intel Foundry 5 年时间窗口比 GF 9 年更紧, 因此失败概率应更高. Base case 应该是"部分商业化 + GF-like 边缘化", 不是 "TSMC-like 二号 leader".

---

## 第五部分: 18A 工艺追赶的可信度

18A (1.8nm equivalent, RibbonFET 晶体管 + PowerVia backside power delivery) 是 Intel 自 2018 年 14nm++ 以来第一次"按 timeline 推进" 的工艺节点. 失败 = Foundry 战略归零 + Server CPU 失血加速.

### 5.1 18A 与 TSMC N2 的真实对比

技术上, 18A 在 performance 与 N2 大致相当 (third-party simulation), power 上 PowerVia 优势 +5-10% 能效, density 上 N2 略优 (TSMC 优化更成熟). Timeline 上接近 (TSMC N2 2026 H1 量产, INTC 18A 2025 Q4 - 2026 Q1 量产). 看起来追平.

但实际差距在三个维度: yield ramp speed, capacity, customer 多样性. **Yield ramp**: TSMC 历史 N5/N3 平均 6-9 个月达到 70%+ yield, INTC 历史 14nm/10nm 平均 18-30 个月. 18A 预测 base case 18 个月达到 70%+ (2027 Q3), 落后 TSMC N2 (2026 Q3) 约 12 个月. **Capacity**: TSMC N2 2026 计划 200K wafer/month, INTC 18A 50-80K wafer/month, 差距 3-4x. **Customer 多样性**: TSMC N2 已签 Apple/AMD/Qualcomm/MediaTek/NVIDIA, INTC 18A 已签 Microsoft Cobalt 2 + DoD + INTC 自己 + (Q1'26 新增) NVIDIA Rubin NVL8.

技术追平不等于商业成功. 18A 的真实"useful production" 落后 N2 12-18 个月.

### 5.2 历史 leapfrog 案例: 成功率 < 15%

1990-2024 半导体公司从落后追平 leader 的案例: ~30 个公开 case, 成功率 < 15%. 唯一公认 case = TSMC 自己 (1995-2005, 用了 10 年). 失败案例: GlobalFoundries (2010-2018), UMC (1995-2005), IBM (2014 放弃), Samsung Foundry (2015-至今, 仍未追平).

INTC 18A 难度系数: 从 Intel 7 (相当于 TSMC N7) 跳到 18A (相当于 TSMC N2), 跨过 3 个工艺节点, timeline 4 年 (2022-2026). TSMC 用 7 年 (2017-2024) 走完同样路径. 时间压缩比 1.75x, 难度系数比 TSMC 高 ~75%. 历史成功率折扣后 5-10%.

### 5.3 18A 三情景与估值含义

**Bull (概率 15%, 18A yield 70% in 2026 H2)**: Microsoft Cobalt 2 wafer pull 2027 H1, Apple A20 NDA 2026 Q3 公开 (可能性提升), External commitment 5y 升至 $20-30B, Foundry NPV +$5 to +$15/share. 对 INTC 估值贡献: +$5-10/share.

**Base (概率 50%, 18A yield 70% in 2027 Q3)**: Microsoft Cobalt 2 部分 ramp 2027 H2, Apple A20 不公开化 / 仅小部分订单, External commitment 5y $5-10B, Foundry NPV -$10 to -$2/share. 对 INTC 估值贡献: -$3 to -$1/share.

**Bear (概率 35%, 18A yield <50% in 2027)**: Microsoft Cobalt 2 delay 至 2028 或转 TSMC, Apple A20 不公开化, External commitment 5y $2-5B, Foundry NPV -$18 to -$10/share. 对 INTC 估值贡献: -$5 to -$3/share.

18A 概率加权对 INTC 估值贡献: 15% × +$7.5 + 50% × -$2 + 35% × -$4 = +$1.1 - $1 - $1.4 = -$1.3/share.

而市场期望是 +$15-25/share 18A upside. 差距 -$16 to -$26/share.

18A 是必要不是充分条件. 即使 18A 完美按 timeline 量产, 也只能减少 INTC 估值下行, 不能创造显著上行.

---

## 第六部分: 三场博弈的现实

Intel 同时在三场博弈中: 与 AMD 的 server CPU 直接竞争, 与 hyperscaler 自研 ARM 的间接竞争, 与 TSMC Foundry 的工艺竞争.

### 6.1 vs AMD: 8 个季度 7 次 beat 的承重墙

AMD 在 server CPU 市场对 Intel 的进攻 5 年来持续: AMD server share 从 FY2020 Q1 8.9% 升到 FY2025 Q4 32.3% (+23pp). 这 +23pp 增量 100% 来自 Intel 失血. AMD 过去 8 季度 EPS beat 7 次 (87.5%), avg beat magnitude +7-12%. Q3'25 是唯一 miss (-1.7%, 但宏观因素).

AMD 当前产品代际优势 (EPYC 9005 Turin vs Intel Xeon 6 Granite Rapids): cores per socket 192 vs 128 (+50%), L3 cache 1152 MB vs 480 MB (+140%), TDP per core 1.97W vs 2.34W (-16% 更省电), Performance/W AMD +20-30%, Price/Perf AMD -15-25%. Q1'26 hyperscaler new design wins AMD 60-65% / Intel 35-40%.

INTC Diamond Rapids (2026 H2 ramp) 才能追平 AMD Turin, 但届时 AMD Venice (2027 ramp) 会再次拉开. 持续 1.5-2 年的代际差距是 AMD share gain 的根本驱动.

AMD Q1'26 release (2026-04-29, 这版报告完成 2 天后) 三路径预测:
- Path A (高概率 80%, Polymarket 78%): AMD beat consensus EPS $1.45+, server share +1-2pp, Intel bear thesis 维持, 我们今日 PV $19.76 不变.
- Path B (中概率 15%): AMD in-line, KS-AMD 微降至 80%, 我们公允微调 +$1.
- Path C (低概率 5%): AMD miss, KS-AMD 大幅下降, Intel bear weakened, 公允可能上修至 $25-32.

4-29 release 后 24 小时内必须回填. 如果 Path C 实现 (5% 概率), 会显著改变结论.

### 6.2 vs ARM hyperscaler: 渗透不可逆, 但 Q1'26 partial reverse

Hyperscaler ARM 渗透率 (server new design wins, 2025 Q4): AWS Graviton 4 占 50%, Microsoft Cobalt 占 25%, Google Axion 占 30%, Meta in-house ARM 占 10%. 加权整体 ~35-40% of new design wins.

Graviton-paper switch model (基于 AWS public benchmark + customer migration data) 显示: ARM TCO 优势 -25-30% (Graviton 4 vs Xeon 5), customer migration cost 1-4 quarters dev time, performance parity 已达成. Tipping point: 30% (new design) — 已过. 加速曲线开始. 5 年后 new design ARM 60-70%, installed base 30-40%. 历史可比: 2007-2010 智能手机从 BlackBerry/Symbian 到 iOS/Android, 30% 拐点后 5 年达 80%+.

INTC 在 ARM hyperscaler 渗透面前几乎无应对牌. (a) 不能做 ARM CPU (license + 商业模式冲突). (b) 不能阻止 hyperscaler 自研 (Graviton 已第 4 代). (c) 唯一可能反击是 18A Foundry 制造 hyperscaler ARM (Microsoft Cobalt 2 已选 INTC 18A 30K wafer LOI), 但 hyperscaler 主要用 TSMC N3/N2.

Q1'26 NVIDIA Rubin NVL8 选 Xeon 6 是 partial reverse 信号. 之前假设 NVIDIA Vera/Rubin host CPU 100% Grace ARM 概率 70-80%, 但 Rubin NVL8 (Rubin 系列一个 SKU) 选了 Intel x86 host. NVIDIA 不是"Grace ARM 一边倒". 我们把 Vera 100% Grace 概率从 70-80% 下修到 50-60%. 但 Vera (Rubin 的下一代) 的 reference design 要等 2026 Q3-Q4 GTC reveal, 仍是 partial 信号.

5 年路径: hyperscaler new design ARM 35-40% → 60-70%, installed base 7-10% → 30-40%, INTC 在 hyperscaler segment 失血 -10 to -15pp, 但 Microsoft Cobalt 2 + NVIDIA Rubin NVL8 提供 partial 立足. 总 server share 从 60.5% → 50-55% (vs v3.0 估算 50-55%, v3.4 略上修 +5pp 反映 Q1'26 reverse).

### 6.3 vs TSMC: 工艺差距是物理现实

工艺节点对比已经在第五部分讨论. 简短重述: TSMC roadmap N5 (2020) → N3E (2024 H2) → N2 (2026 H1) → A16 (2027 H2 risk). INTC roadmap Intel 4 (2023) → Intel 3 (2024 H2) → 18A (2025 Q4 - 2026 Q1) → 14A (2027 H2 risk). Timeline 接近.

但 yield + capacity + customer 维度差距持续 18-30 个月. Q1'26 Tan 强调 18A yield on track 但未公开实际数据 (历史习惯 yield <50% 时不公开). Foundry external $174M / quarter 远低于商业化所需规模. 5 年后 INTC 14A vs TSMC A16, 仍落后 1.5-2 年.

vs TSMC 博弈 Q1'26 confirm bear. 工艺差距是物理现实, 不是叙事问题.

### 6.4 三场博弈合并

INTC 在三场博弈中都不占优. Server CPU 收入 trajectory -5 to -8%/year (vs v3.0 估算 -8 to -10%, 略弱化 Q1'26 反弹). Foundry external 5y 累计 $5-15B (vs 市场假设 $20B+). GM% 从 36% 升到 38-42% (yield ramp + scale, Q1'26 已部分体现). ROIC 持续 < WACC, 累计 EVA -$30B+.

但 Q1'26 数据 partial reverse (DCAI +22%, NVIDIA Rubin Xeon 6) 让 conviction 弱化. 这就是 v3.4 评级"审慎关注 (高争议)" 的硬支撑, 不是 v3.0 的"高确定性 SELL".

---

## 第七部分: 反身性与 reset window

Intel 当前 $82.57 的支撑完全依赖三层叙事 (AI 时代回归者 + 政府 puts + Tan 战略奇袭). 任何一层 weaken 触发反身性循环: 股价跌 → 客户信心降 → 18A 客户流失 → Foundry NPV 下修 → 股价进一步跌 → 信用评级下调 → 财务结构性恶化 → 反身性 reset 到 $20-35.

### 7.1 5 个 catalyst 6-12 个月时间轴

未来 6-12 个月有 5 个 catalyst window, 每个有不同概率 fire:

**Catalyst 1: AMD Q1'26 release (2026-04-29)**. 80%+ 历史基准 + Polymarket 78%. 几乎确定 fire. 影响: 三路径已在 §6.1 列出.

**Catalyst 2: AWS re:Invent 2026 (5-1)**. 90%+ 历史基准 (AWS 每年 announce Graviton 系列更新). Graviton 5 announce + ARM 路线图加快. 影响: ARM hyperscaler 渗透加速 confirm, INTC 公允下修 -$1 to -$3.

**Catalyst 3: Intel Q2'26 earnings (8 月)**. 30-40% 概率 fire (中概率, 18A timeline 推迟信号). 影响: 18A delay → Foundry NPV 下修 → 公允下修 -$2 to -$5.

**Catalyst 4: 2026 H2 Foundry external commitment update**. 50%+ 概率 fire (Q1'26 $174M 维持低位 trajectory). 影响: external <$5B 5y → Foundry NPV 深度负值, 公允下修 -$3 to -$5.

**Catalyst 5: NVIDIA GTC Vera reference design (2026 Q3-Q4)**. 50-60% 概率 Vera 100% Grace ARM (v3.4 下修自 v3.0 的 70-80%, 因 Q1'26 Rubin Xeon 6 partial reverse). 影响: Vera 100% Grace → INTC 在 NVIDIA AI server 失去后续机会, 公允下修 -$2 to -$4.

3+ catalyst 在 6 个月内同时 fire 概率: Catalyst 1 + 2 几乎确定 (>70%), 加上任意一个其他 (30-50%), 联合 ≈ 40-50%.

### 7.2 Reset 时间窗口与幅度

**60 天窗口** (4-29 → 6-29): AMD beat + AWS ARM 路线图加速 = 高概率联合 fire. 估值反应 -$2 to -$8/share. 评级反应: 维持审慎关注 (1 catalyst) → 升级高争议 (2 catalysts).

**12 个月窗口** (4-29 → 2027-04): 5 catalysts 全部完成. 估值反应 -$10 to -$15/share (向 Bear 端 $11.5 收敛). 评级反应: 升级为"高度高估", 1 年期望回报 -75%+.

历史可比: INTC 2000-2002 互联网泡沫 reset (-81% in 30 months), INTC 2021-2022 7nm delay reset (-62% in 21 months). v3.4 reset 预期 -55 to -65% in 6-12 months. 时间比历史可比短, 因为当前 catalyst clock 更明确 (5 catalysts 联合 fire 概率高); 幅度比历史 2000 case 略低, 因为 Q1'26 partial reverse + 政府 puts 提供 floor.

---

## 第八部分: 4 投资风格视角

不同投资风格在 Intel 上有不同行动. 我们用 4 种主流风格做 cross-check.

### 8.1 质量投资风格: avoid (0 仓位)

经济商誉 = ROIC > WACC × (1 + 周期容忍度). Intel 当前 ROIC 1-4% < WACC 8%, spread -4 to -7pp. 反护城河持续 3 年 (FY2023-FY2025). 5y 内追上 WACC 概率 < 15%.

即使 Q1'26 partial confirm 部分路径 (DCAI +22%, GM 改善), 当前估值倍数 (trailing P/Sales 7.5x, FY26 run-rate Non-GAAP PE 84x) 显著高于半导体周期股历史顶部 (P/Sales 4-5x, PE 18-25x). 安全边际不存在 (公允 $19.76 vs 当前 $82.57).

不参与, 0 仓位. 何时改变结论: 5y 内 ROIC 连续 3 季度 >5%, 或 DCAI 连续 4 季度 +20%+ YoY, 或 Foundry quarterly external >$1B (年化 >$4B), 或估值 reset 至 trailing P/Sales 3-4x (股价 $30-45).

### 8.2 Special situations 风格: WATCH (监控 KS-spinoff)

Intel Foundry spinoff 期权 (校准 12.5% × $15 = $1.88/share) 不大但事件触发后估值跳升. Trigger fire 后概率 jump 至 35%, 期权值 $5.25/share, 公允从 $19.76 上修至 ~$23.

监控点: (a) Tan 第二年 (2026 H2) 是否进入 M&A 期 (历史可比 Hector Ruiz / AMD-GlobalFoundries 拆分用了 14-18 个月). (b) 投行 (GS / MS / Citi) 是否开始 pitch IFS 拆分. (c) Board 是否启动战略 review.

Q1'26 update: Tan 强调 integrated foundry 但**不是公开 reject spinoff**. spinoff option 仍然 alive. 三 trigger 同时达成概率 15-20%, 单独事件 5-10%.

WATCH 不是 do nothing. 设置 alert (Bloomberg/Reuters scoop, INTC quarterly transcript, 投行 pitch, Board 公告). Trigger fire 后立即重做估值.

### 8.3 Deep value 风格: HOLD (不参与, 但下行有 floor)

清算价值 floor 估算 (推断, 未做正式清算分析): 净债务 -$41.5B + PP&E 账面 $79B × 30-50% 清算率 + IP/专利 $5-15B + Mobileye 持股 (74%) market value $9.6B = 总 equity value $8-25/share.

当前 $82.57 vs floor $8-25 = -70 to -90% 下行空间. 但 floor 远低于 BUY 入场价 (deep value 通常要求 P/B < 0.5, INTC 当前 P/B = $357B / $99B = 3.6x).

不 SELL 因为 lift size 难把握. 半导体周期股 SELL 通常在 -30% 后出现 dead cat bounce +20-30%, 然后才进入 -50%+ 路径. 0 仓位 = 等待估值回到合理区间再考虑.

何时 BUY: 股价 reset 至 <$25 + 财务结构性改善 (FCF 转正 + 净债务改善). 5y 内低概率事件 (15-20%).

### 8.4 Long-short 风格: SELL with caveat

反身性反向链: 任一 catalyst miss → 客户信心降 → 18A 客户流失 → Foundry NPV 下修 → 股价进一步跌 → 信用评级下调 → 反身性 reset 到 $20-35.

宏观背景: Fed 2026 H2 历史基准 60%+ 进入降息周期, 半导体周期股估值压力. Hyperscaler CapEx 2026 增速预期 +20-25% (vs 2025 +60%), 半导体上游需求增速断崖.

具体 SELL 判断: 当前 $82.57 vs 公允 $19.76 = -76% downside. Reset window 6-12 个月, 触发概率 40-50%. 期望回报 SELL position 5y +50-65% (假设 reset 完成 + 短端利息成本 5%).

但 caveat: lift size 难把握 (dead cat bounce +20-30%), Q1'26 partial reverse 让 conviction 弱化, 政府 puts 提供下行保护 (虽然 strike $10-15 而非 $25-30, 但 short squeeze 仍存在), AI 叙事 macro 因素可能延迟 reset.

具体行动: 主动 SELL 部分仓位 (1-3% portfolio), 严格止损 (+25% lift). 选项替代 long-dated put options ($60 strike, 12 月 expiry). 配对交易 SELL INTC + BUY AMD/TSMC.

为什么不是 high-conviction SELL: Q1'26 partial reverse 让单边 SELL 赔率从 v3.0 的 80%/20% 下降到 v3.4 的 65%/35%. 加上 lift size 难把握, 单一 SELL 预期 Sharpe ratio 从 v3.0 估算 1.2 下降到 v3.4 0.7-0.9.

### 8.5 4 视角综合

| 风格 | 行动 | 仓位 | 核心理由 |
|------|------|------|---------|
| 质量投资 | avoid | 0 | ROIC < WACC + 估值倍数过高 |
| Special situations | WATCH | 0 (alert) | spinoff option 触发跳升 |
| Deep value | HOLD | 0 | 清算 floor $8-25, P/B 3.6x 远超 deep value 标准 |
| Long-short | SELL with caveat | -1 to -3% | 反身性反向 + lift size 风险 |

4 视角全部不 BUY, 但只有 1/4 主动 SELL with caveat. 这种"4/4 不 BUY 但只有 1/4 SELL" 的分歧反映高争议状态. 没有任何视角建议 BUY.

---

## 第九部分: 监控信号与 reset 触发条件

8 条 Kill Switch 在 2026-04-27 baseline 写入. 下次覆盖 (v3.5+) 直接读取这些阈值, 不允许回溯修改, 给二次覆盖留一个未被合理化污染的判读基准.

| Signal | 当前 baseline | Confirm bear | Weaken bear | Pivot bull |
|--------|--------------|-------------|------------|----------|
| DCAI YoY 增速 | Q1'26 +22% | <10% in next 2 quarters | 维持 +15-20% | 连续 3 季度 >+20% |
| Foundry quarterly external revenue | Q1'26 $174M | <$200M | $200-500M | >$500M |
| AMD server share + beat rate | Q4'25 32.3% / 87.5% | share >35% / beat >80% | share <30% / beat <50% | — |
| NVIDIA Vera reference design | Rubin NVL8 选 Xeon 6 (partial reverse) | Vera 100% Grace | Vera partial Xeon | Vera 50%+ Xeon |
| Tan spinoff signal | 0 公开 (强调 integrated) | 持续无信号 | "consider all options" | 投行 pitch / Board review |
| CHIPS Act 政策 | 2026 Q1 提议重新评估 | rollback ≥30% | 维持现状 | 加码 |
| 18A yield disclosure | 未公开 (Tan 强调 on track) | 公开 <50% in 2026 H2 | 50-70% | >70% |
| INTC stock price | $82.57 | 维持 $75-85 | 跌至 $50-65 | 跌至 $30-40 (公允锚附近) |

### 9.1 行动决策矩阵

| 触发条件 | 行动 |
|---------|------|
| DCAI 连续 3 季度 +20%+ | upgrade to neutral, 公允上修至 $30-40 |
| Foundry quarterly external > $500M | upgrade to neutral, Bull 概率上修至 25%+ |
| Tan spinoff trigger fire | 立即重做估值, spinoff prize +$5/share |
| DCAI 跌至 <10% YoY | 强化 bear, 公允下修至 $15-20 |
| 18A yield 公开 <50% in 2026 H2 | 强化 bear, Foundry NPV 下修 |
| INTC 跌至 $30-40 (公允锚) | 重做 valuation, 评估 BUY 入场 |

### 9.2 v3.5 触发条件

我们承诺以下任一发生 → 立即写 v3.5, 不在 v3.4 上叠补丁:

- AMD Q1'26 actual 显著偏离 Path A 预测 (4-29 后 24 小时)
- Foundry quarterly external 突破 $500M (季度 update)
- Tan 公开转向 spinoff signal (事件触发)
- DCAI 连续 2 季度 <10% YoY (Q2/Q3'26)
- INTC 股价 reset 至 $50 以下 (价格触发)
- 任一 KS 突破 confirm_bear / pivot_bull 阈值

---

## 第十部分: 一个问题, 三件带走的事

如果只能问 Intel 一个问题, 这个问题是:

> 假设 2030 年 Intel server CPU share 跌到 50%, Foundry 5 年累计净现金消耗 -$85B, 没有 spinoff catalyst, Q1'26 DCAI +22% 是周期性反弹而不是 trajectory 转折, 当前 $82.57 还合理吗?

如果回答"合理", 需要解释 ROIC 1-4% 何时能追上 WACC 8% (5y 内多路径联合概率 < 15%), Foundry 何时进入正 OPM (Q1'26 GM% -45%, 距离 8% OPM 稳态 > 50pp 改善), 估值倍数为什么应该高于历史周期顶部 (当前 P/Sales 7.5x vs 历史顶 4-5x).

如果回答"不合理", 需要给出比 $19.76 显著更高的公允价值, 但用不依赖三层叙事 (AI 回归者 / 政府 puts / Tan 奇袭) 的硬数据支撑.

我们做不到第二件事. 所以结论是审慎关注 (高争议), 公允 $18-25 today PV / $26-35 5y exit, 行动 avoid / watch / wait for reset.

三件最值得带走的事:

第一, **Intel 不是 AI 时代回归者, 是高资本投入 + 政府背书 + AI 叙事的混合系统**. 不应用 AI 平台 PE 倍数 (40-60x), 应用周期股 SOTP + 政府 puts adjusted option + Foundry NPV 当前 anchor 的混合框架.

第二, **当前价格已经提前买了大量转型成功**. 三方法 cross-validation 公允 $15-22 vs 当前 $82.57 = -73 to -82% downside. Q1'26 数据 partial reverse 让 conviction 弱化但方向不变.

第三, **行动不是 SELL, 是 watch / wait for reset**. 4 投资风格视角全部不 BUY, 但只有 1/4 主动 SELL with caveat. 这反映高争议状态, 不是 v3.0 的单边 SELL 推荐. Reset window 6-12 个月, 触发概率 40-50%.

下次覆盖触发条件已在 §9 列出. KS 触发后立即写 v3.5, 不在 v3.4 上叠补丁.

---

## 附录: 数据时效性与版本说明

所有数据截止 2026-04-27. 主要数据源:

- Intel Q1'26 release (2026-04-23, 含 financial highlights + segment breakdown + customer announcements)
- Intel Q1'26 earnings transcript (Motley Fool 2026-04-23)
- Intel FY2025 10-K (含 reportable segment 重组)
- Intel newsroom CHIPS Act $7.86B finalize (2024-Q4)
- INTC 4-24 close $82.57 (Business Insider 2026-04 + INTC close)
- Mercury Research server CPU share Q4'25
- Polymarket "Will Trump rollback CHIPS Act in 2026" 35%
- Polymarket "AMD Q1 2026 beat consensus" 78%
- Damodaran 半导体行业 WACC 数据库 2026 (中位 8%)

版本演进 (供历史参考):
- v3.0 (2026-04-26): 初版, 7 项数据错误 + 5 项逻辑问题
- v3.1 (2026-04-27): 补丁式修正, 旧文残留严重
- v3.2 (2026-04-27): clean rewrite 数字纪律, 但论证骨架化
- v3.3 (2026-04-27): 在 v3.2 基础上回填论证, 但仍是"baseline + 补充章节" 拼接结构
- **v3.4 (2026-04-27, 本版)**: 一次性整体撰写的连贯研报, 单一估值口径, 无版本残留, 无补丁结构

下次覆盖在 KS 触发后写 v3.5.

**报告完结. 2026-04-27.**
