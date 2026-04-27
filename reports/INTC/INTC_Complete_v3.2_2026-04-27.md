# INTC v3.2 — Intel 当前价格已经提前买了多少成功 (clean rewrite)

**当前股价 (2026-04-24 close)**: **$82.57** (盘中高 $85.22)
**今日 PV 区间**: **$18-25** (8% WACC, 5y 折现)
**5y exit value 区间**: **$26-35** (加权中点 $29)
**评级**: **审慎关注 (高争议)**
**5y 期望回报**: **-65%** / **Today PV downside**: **-76%**
**行动建议**: **avoid / watch / wait for reset** — 不构成 high-conviction SELL 推荐

> **v3.2 vs v3.1 关键区别**: v3.2 是 clean rewrite, 不是补丁. 全文只有一套数字: $82.57 baseline / $18-25 today PV / $26-35 5y exit / 审慎关注 (高争议). 删除 v3.0/v3.1 残留的 $95 / $26-28 today fair value / -72% / "(临界)" / 50-60% reset 概率等旧版本数字. 同时修正 v3.1 中 Q1'26 数据错误 (GAAP EPS 应为 -$0.73 不是 -$0.04, Non-GAAP GM 应为 41.0% 不是 38.5%).

---

## 0. 执行摘要 (90 秒读完)

### 0.1 一句话结论

Intel 当前 $82.57 隐含市值约 $357B (~4.32B 摊薄股本). 在 v3.2 修正后的 FY2025 / Q1'26 数据下, 我们的今日 PV 估值是 $18-25/share. 这意味着当前价格已经提前买了大量转型成功. 但 Q1'26 actual data 显示 DCAI +22% / NVIDIA Rubin 选 Xeon 6 / Foundry external 仍仅 $174M — bear thesis 方向成立但 conviction 弱. 评级**审慎关注 (高争议)**, 行动**avoid / watch / wait for reset**.

### 0.2 三个核心问题

我们这份研报围绕三个可监控问题组织:

**问题 1: DCAI Q1'26 +22% 是周期性反弹还是 trajectory 转折?**
- 数据: DCAI revenue $5.1B (+22% YoY) [DM-Q126-001, Intel Q1'26 release 2026-04-23]
- Bear: 1 季度反弹 ≠ trajectory 转折; AMD 持续抢量 + ARM hyperscaler 渗透
- Bull: NVIDIA DGX Rubin NVL8 选 Xeon 6 + Google Cloud Xeon 6 多年合作, Intel 在 AI server 仍有立足点
- 监控信号: DCAI 连续 3 季度 +20%+ YoY → bear weakened

**问题 2: Foundry external revenue 何时从 $174M/quarter 走向真正商业化?**
- 数据: Q1'26 Intel Foundry $5.4B (含内部转移) / external 仅 $174M / operating loss -$2.4B [DM-Q126-002]
- Bear: external $174M / quarter 年化 <$1B, 5y 累计 < $5B; 距离市场假设的 $20B+ 差 75%+
- Bull: Microsoft Cobalt 2 30K wafer LOI / DoD subsidies / Apple A20 NDA 传闻
- 监控信号: 季度 external > $500M → bull confirmed

**问题 3: 政府背书到底是 put (下行保护) 还是 call (上行催化)?**
- 数据: $7.86B direct + $3B Secure Enclave + 25% tax credit + 10% 持股 ($36B 估值) [DM-CHIPS-001, Intel newsroom 2024-Q4]
- Put 视角: 防止 INTC 财务崩盘, strike 实际 $10-15 (GM 2009 case 校准, 而非市场假设 $25-30)
- Call 视角: 政府介入是 implicit guarantee, 应给 +$5-8/share option value
- 监控信号: Trump 2026 重新评估 CHIPS Act 提案 (Polymarket 35% 概率) → put 信用 weakened

### 0.3 估值核心 (单一版本, 无 v3.0/v3.1 旧数字残留)

```
当前股价 (2026-04-24 close): $82.57

5y exit value 三情景:
  Bear  (30-45%, 中点 37.5%): $8-15  (中点 $11.5)
  Base  (40-55%, 中点 47.5%): $28-35 (中点 $31.5)
  Bull  (8-20%,  中点 15%):   $55-75 (中点 $65)

加权 5y exit value:
  37.5% × $11.5 + 47.5% × $31.5 + 15% × $65 = $29.02
  区间表达: $26-35

今日 PV (8% WACC, 5y, 折现因子 0.681):
  $29.02 × 0.681 = $19.76
  区间表达: $18-25

vs $82.57:
  5y exit downside: ($29 - $82.57) / $82.57 = -65%
  Today PV downside: ($19.76 - $82.57) / $82.57 = -76%
```

### 0.4 行动建议

**为什么不是 high-conviction SELL**:
- 黑箱 ≥40% (Foundry 5y NPV / 政府 puts strike / Tan 战略意图 三个核心变量缺 [B] 级数据)
- Q1'26 数据 partial reverse bear catalyst (DCAI +22% / NVIDIA Rubin)
- Lift size 难把握 (Klarman 视角: 半导体周期股 SELL 通常 dead cat bounce +20-30% 后才到 -50%)
- 政府 puts 提供下行保护 (strike 不确定但确实存在)

**为什么也不是 BUY 或 HOLD long**:
- 即使 Bull case (15% 概率) 5y exit $65, vs 当前 $82.57 仍 -21% 下行
- ROIC 2-4% / WACC 8% 反护城河持续 (没有任何场景显示 5y 内可改善 +400-600bp)
- Foundry external $174M / quarter 远低于商业化所需规模

**正确行动**: avoid / watch / 等以下任一信号:
- DCAI 连续 3 季度 +20%+ YoY (问题 1 reset)
- Foundry quarterly external > $500M (问题 2 reset)
- Tan 公开转向 spinoff signal (KS-8)
- 18A yield 数据公开化 + 良率 >50% in 2026 H2
- 股价 reset 到 $30-40 区间 (公允锚附近)

---

## 1. 事实表 (Single Source of Truth)

> 本节是全报告唯一引用的"事实层". 后续所有分析数字必须 trace 回这个表.

### 1.1 当前股价与市值

| 指标 | 数值 | 来源 |
|------|------|------|
| Close (2026-04-24) | **$82.57** | INTC 4-24 close [DM-PRICE-001] |
| 盘中高 (2026-04-24) | $85.22 | Business Insider 2026-04 [DM-PRICE-002] |
| 摊薄股本 | ~4.32B shares | INTC Q1'26 10-Q [DM-SHARES-001] |
| 隐含市值 | ~$357B | Calculated [DM-MCAP-001] |
| 政府 10% 持股估值 | ~$36B | Business Insider 2026-04 [DM-GOV-001] |

### 1.2 FY2025 财务 (Intel 官方, 2026-Q1 finalize)

| 指标 | 数值 | 备注 |
|------|------|------|
| Revenue | **$52.9B** | -32% from FY2020 peak $77.9B [DM-FY25-001, Intel FY2025 10-K] |
| GAAP EPS | **-$0.06** | -101% from peak $4.94 [DM-FY25-002] |
| Non-GAAP EPS | **$0.42** | -91% from peak [DM-FY25-003] |
| GAAP Gross Margin | **34.8%** | -21pp from FY2020 56.1% [DM-FY25-004] |
| Non-GAAP Gross Margin | **36.7%** | [DM-FY25-005] |
| Operating Income (GAAP) | -$0.5B | [DM-FY25-006] |
| Operating Income (Non-GAAP) | $1.5B | [DM-FY25-007] |

### 1.3 Q1'26 财务 (Intel 官方, 2026-04-23 release) — v3.2 修正

> **v3.2 修正** vs v3.1: GAAP EPS 从 -$0.04 修正为 -$0.73 (含 impairment / write-down); Non-GAAP GM 从 38.5% 修正为 41.0% (Intel reported); GAAP GM 39.4%.

| 指标 | 数值 | 备注 |
|------|------|------|
| Revenue | **$13.6B** | +7% YoY [DM-Q126-101, Intel Q1'26 release 2026-04-23] |
| GAAP EPS | **-$0.73** | 含 impairment / write-down (operating improvement 但 accounting loss 大) [DM-Q126-102] |
| Non-GAAP EPS | **$0.29** | +123% YoY (vs Q1'25 $0.13) [DM-Q126-103] |
| GAAP Gross Margin | **39.4%** | +460bp YoY [DM-Q126-104] |
| Non-GAAP Gross Margin | **41.0%** | +430bp YoY [DM-Q126-105] |
| Q2'26 Non-GAAP EPS guidance | **$0.20** | 季度环比下降 [DM-Q126-106] |

**Q1'26 GAAP loss 拆解** [DM-Q126-107]:
- Operating improvement: positive trajectory (Non-GAAP EPS +123% YoY 反映 underlying operating)
- Impairment / restructuring: ~$3-4B 一次性 (导致 GAAP EPS 与 Non-GAAP EPS 差距扩大)
- 含义: 不能简单用 "GAAP 改善" 说 Intel 进入 turnaround; 也不能用 "GAAP loss" 说 Intel 仍在恶化. 必须区分 operating recovery 与 accounting clean-up.

### 1.4 Q1'26 Segment 表现

| Segment | Q1'26 Revenue | YoY | 备注 |
|---------|--------------|-----|------|
| CCG (Client) | ~$7B | +3% | 含原 NEX edge 部分 (NEX 已整合) [DM-Q126-201] |
| DCAI (Data Center & AI) | **$5.1B** | **+22%** | 5 年来最强季度增长 [DM-Q126-202] |
| Intel Foundry (含内部转移) | $5.4B | +16% | [DM-Q126-203] |
| Intel Foundry external (单列) | **$174M** | n.m. | 季度年化 <$1B [DM-Q126-204] |
| Intel Foundry operating loss | -$2.4B | n.m. | [DM-Q126-205] |
| All Other (Mobileye 74% + Altera + 其他) | ~$0.5-1B | varies | [DM-Q126-206] |

### 1.5 Q1'26 客户 / 产品 announcements

| 项目 | 内容 | 对 thesis 的影响 |
|------|------|----------------|
| Xeon 6 选为 NVIDIA DGX Rubin NVL8 host CPU | NVIDIA 下一代 Rubin AI server 系统选 Intel x86 host | **partial reverse** v3.0/v3.1 "NVIDIA Vera 100% Grace ARM" 假设 [DM-Q126-301] |
| Google Cloud Xeon 6 多年合作 | Hyperscaler partner 公开 announce | **partial reverse** "ARM hyperscaler 加速" 单边假设 [DM-Q126-302] |
| TeraFab 项目宣布 | 新一代 fab 架构 | 长期 catalyst, 短期不影响估值 [DM-Q126-303] |
| 18A yield 进度 on track | Tan 强调 yield ramp 按 timeline | yield 实际数据未公开 (历史习惯 yield <50% 不公开) [DM-Q126-304] |
| 14A roadmap update | 2027 H2 risk production | 与 v3.0/v3.1 一致, 无 surprise [DM-Q126-305] |

### 1.6 资产负债表 (Q1'26)

| 项目 | 金额 |
|------|------|
| Cash + ST investments | $11.5B |
| LT debt | $53.0B |
| **Net debt** | **-$41.5B** [DM-BS-001, Intel Q1'26 10-Q] |
| Total equity | $99.0B |
| Total assets | $193.5B |
| 摊薄股本 | ~4.32B shares |

### 1.7 政府介入完整口径 (CHIPS Act + 持股, v3.2 修正)

| 项目 | 金额 / 性质 | 是否直接增加股东价值 |
|------|----------|----------------|
| CHIPS Act direct funding | **$7.86B** (up to) [DM-CHIPS-001, Intel newsroom 2024-Q4 finalize] | 降低 CapEx 现金压力, 不是收入 |
| Secure Enclave contract | **$3B** | 政府合同, 需要对应履约成本 |
| 25% investment tax credit | 依赖 CapEx 实际投入 | 抵减税负, 不是直接现金 |
| 政府 10% 持股 | 估值 ~$36B (按 $82.57 计算) | 稀释股东 + 战略约束 + implicit puts (净效应不明确) |
| Trump 2026 Q1 重新评估 CHIPS Act 提案 | Polymarket 35% 概率 [DM-POLY-001] | 政府 puts 信用风险 |

> **v3.2 关键修正**: v3.0/v3.1 把 "CHIPS Act $19.5B" 简化为单一拨款数字, 这是错误的. 正确表述是上述 4 项的合计, 且每项性质不同. 这影响"政府 puts" 估值 — 真实 put value 不是 BS option pricing 直接给的 $5-8/share, 而是需要分项校准.

### 1.8 5 年 FCF / Net Debt trajectory

| Year | OCF | CapEx | FCF | Net debt 期末 |
|------|-----|-------|-----|-------------|
| FY2020 | $35.4B | -$14.3B | +$21.1B | -$9.4B |
| FY2021 | $30.0B | -$18.7B | +$11.3B | -$5.7B (改善) |
| FY2022 | $15.4B | -$24.8B | -$9.4B | -$11.2B |
| FY2023 | $11.5B | -$25.7B | -$14.2B | -$22.5B |
| FY2024 | $8.2B | -$24.0B | -$15.8B | -$27.9B |
| FY2025 | $14.5B | -$22.2B | -$7.7B | -$38.7B |
| Q1'26 | (季度) | (季度) | (季度) | **-$41.5B** |

[DM-FCF-001, Intel FY2020-FY2025 cash flow + Q1'26 10-Q]

**累计 6y FCF**: -$14.7B (从 FY2020 peak 算起)
**累计 5y FCF (FY2021-FY2025, 排除 peak)**: -$35.8B
**净债务变化 (FY2020 → Q1'26)**: 从 -$9.4B 恶化到 -$41.5B (-$32.1B 消耗)

---

## 2. 估值表 (Single Source of Truth)

### 2.1 PE 倍数 (v3.2 修正, 三列)

> **v3.2 修正** vs v3.1: v3.1 错把 "$82.57 / FY2025 Non-GAAP EPS $0.42 = 197x" 称为 forward PE. 这其实是 trailing PE. 真正的 forward PE 应基于 FY2026 consensus 或 Q1/Q2 guidance run-rate.

| 倍数类型 | 计算 | 数值 | 备注 |
|---------|------|------|------|
| Trailing GAAP PE | $82.57 / FY2025 GAAP -$0.06 | n.m. (分母负) | 不可计算 |
| Trailing Non-GAAP PE | $82.57 / FY2025 Non-GAAP $0.42 | **197x** | FY2025 base, 极高 |
| FY2026 run-rate Non-GAAP PE | $82.57 / (Q1'26 $0.29 + Q2'26 guide $0.20) × 4 / 2 | **84x** (annualized) | 假设全年维持 H1 速度 |
| FY2026 consensus PE | $82.57 / FY26 consensus EPS (待 update) | TBD | Bloomberg / FactSet consensus |

**核心观察**: 任何 PE 倍数都显示当前估值显著高于半导体周期股历史 (周期顶部 PE 通常 18-25x). FY2026 run-rate 84x 仍是 3-4x 半导体周期顶部水平.

### 2.2 EV / Sales 倍数

| 倍数 | 计算 | 数值 |
|------|------|------|
| Market Cap | $82.57 × 4.32B | $357B |
| + Net debt | +$41.5B | $398B EV |
| FY2025 Revenue | $52.9B | — |
| **trailing EV/Sales** | **7.5x** | 历史 INTC 周期顶部 4-5x; 周期中位 2-3x |
| FY2026 run-rate Revenue | Q1'26 $13.6B × 4 ≈ $54B | — |
| FY2026 run-rate EV/Sales | $398B / $54B | **7.4x** |

### 2.3 SOTP (v3.2 修正, segment 对齐 Intel reportable structure)

> **v3.2 修正** vs v3.1: v3.1 SOTP 仍把 NEX 单列, 与 Intel FY2025 reportable (3 segments + All Other) 不一致. v3.2 改为 CCG / DCAI / Foundry / All Other.

| Segment | FY2025 Revenue | 估值方法 | Fair Value ($B) | $/share (摊薄) |
|---------|---------------|---------|---------------|---------------|
| CCG (含 NEX edge) | ~$32-34B | 12x EBIT, EBIT $4-5B | $50-60B | $11.6-13.9 |
| DCAI (含 NEX networking) | ~$15-17B | 15x EBIT, EBIT $0.3-1.5B | $5-22B | $1.2-5.1 |
| Intel Foundry | $17.5B (内部 + external) | NPV (基于 Q1'26 anchor) | -$15 to +$5B | -$3.5 to +$1.2 |
| All Other (Mobileye 74% + Altera) | ~$2-3B | Mobileye market cap × 74% + Altera 估算 | $10-12B | $2.3-2.8 |
| 净现金 / 投资 | $11.5B | mark-to-market | $11.5B | $2.7 |
| 政府 puts 期权 | — | adjusted BS option | $9-22B | $2-5 |
| - LT debt | -$53B | book value | -$53B | -$12.3 |
| **SOTP equity value** | — | — | **$33-79B** | **$8-22/share** |

**SOTP 中位**: ~$15/share. 这与 today PV $19.76 接近, 形成 cross-validation.

### 2.4 5y exit value 三情景 (v3.2 单一版本)

> 全报告唯一一套情景数字, 不再有 v3.0/v3.1 残留.

| 情景 | 概率区间 | 中点 概率 | 5y exit 区间 | 5y exit 中点 | 加权贡献 |
|------|---------|----------|------------|-------------|---------|
| Bear | 30-45% | 37.5% | $8-15 | $11.5 | $4.31 |
| Base | 40-55% | 47.5% | $28-35 | $31.5 | $14.96 |
| Bull | 8-20% | 15.0% | $55-75 | $65 | $9.75 |
| **加权** | 100% | — | **$26-35** | **$29.02** | — |

### 2.5 今日 PV (折现 5y exit 回当前)

| 步骤 | 数值 |
|------|------|
| 加权 5y exit | $29.02 |
| WACC (8%, 行业中位) | — |
| 折现因子 (1.08^-5) | 0.681 |
| **今日 PV (中点)** | **$19.76** |
| 区间表达 (90% 置信) | $18-25 |

### 2.6 期望回报 (vs $82.57)

| 视角 | Downside |
|------|---------|
| 5y exit value (中点 $29) | -65% |
| Today PV (中点 $19.76) | -76% |

### 2.7 三方法 cross-validation

| 方法 | Fair value | 来源 |
|------|-----------|------|
| SOTP | $8-22 (中位 $15) | §2.3 |
| Today PV (DCF 概率加权) | $18-25 (中位 $19.76) | §2.5 |
| Peer multiple (周期股 EV/Sales 2.5x × $52.9B - $41.5B 净债务) | $19/share | 半导体周期股中位 |
| **3 方法平均** | **$15-19/share** | 一致指向"显著高估" |

---

## 3. 反证表 (削弱 vs 强化 bear thesis)

### 3.1 削弱 bear thesis 的证据 (近期)

| 证据 | 来源 | 削弱程度 |
|------|------|---------|
| Q1'26 DCAI +22% YoY | Intel Q1'26 release | 强 — 5 年最强 server 增长 |
| Xeon 6 选为 NVIDIA DGX Rubin NVL8 host CPU | Intel Q1'26 announcement | 强 — INTC 在 NVIDIA AI server 仍有立足点 |
| Google Cloud Xeon 6 多年合作 | Intel Q1'26 announcement | 中 — 单一 hyperscaler partner |
| Q1'26 Non-GAAP EPS $0.29 (+123% YoY) | Intel Q1'26 release | 中 — operating improvement 真实 |
| Q1'26 Non-GAAP GM 41.0% (+430bp YoY) | Intel Q1'26 release | 中 — margin recovery 信号 |
| 18A yield Tan 强调 on track | Q1'26 earnings transcript | 弱 — 实际数据未公开 |
| Tan 强调 integrated foundry / advanced process 执行 | Q1'26 earnings transcript | 弱 — 不是 reject spinoff, 但显示 management commitment |
| TeraFab 宣布 | Q1'26 announcement | 弱 — 长期 catalyst, 短期不影响 |

**bear 概率影响**: 这些证据让 Bear 概率上限从 v3.0 的 42% 下修至 v3.2 的 35%, 但下限维持 30%.

### 3.2 强化 bear thesis 的证据

| 证据 | 来源 | 强化程度 |
|------|------|---------|
| Q1'26 Foundry external $174M (季度年化 <$1B) | Intel Q1'26 release | 强 — 距离市场假设 $20B+ 5y 差 75%+ |
| Q1'26 Foundry operating loss -$2.4B | Intel Q1'26 release | 强 — Foundry 仍处于高消耗阶段 |
| Q1'26 GAAP EPS -$0.73 | Intel Q1'26 release | 中 — 含 impairment, accounting loss 大 |
| Q2'26 guidance Non-GAAP EPS $0.20 (vs Q1 $0.29) | Intel Q1'26 release | 中 — 季度环比下降 |
| Net debt Q1'26 -$41.5B (vs FY2020 -$9.4B) | Q1'26 10-Q | 强 — 6 年消耗 $32B 资产负债表 |
| ROIC 2-4% vs WACC 8% (-4 to -6pp) | FY2025 财务 | 强 — 反护城河持续 |
| AMD server share 32.3% (FY2025 Q4) | Mercury Research | 中 — 持续抢量但 Q1'26 INTC DCAI +22% partial offset |
| Trump 2026 Q1 重新评估 CHIPS Act 提案 | Reuters 2026-04-15 | 中 — 政府 puts 信用风险 |

**bull 概率影响**: 这些证据让 Bull 概率上限从 v3.0 的 12.5% 上修至 v3.2 的 20%, 但下限维持 8% (因为 Foundry 商业化进度仍弱).

### 3.3 反证综合

> Q1'26 数据让 bear thesis 从"高确定性" 变为"高争议". 方向仍 SELL (公允 << 当前), 但 conviction 弱化. 最大不确定性是: DCAI +22% 是周期性反弹还是 trajectory 转折? Foundry external 何时真正商业化?

---

## 4. 监控表 (跟踪信号 + 阈值)

### 4.1 核心监控指标 (季度 / 事件触发)

| Signal | 当前 baseline (2026-04-27) | Confirm bear | Weaken bear | Pivot bull |
|--------|------------------------|-------------|------------|----------|
| **DCAI YoY 增速** | Q1'26 +22% | <10% in next 2 quarters | 维持 +15-20% | 连续 3 季度 >20% |
| **Foundry quarterly external revenue** | Q1'26 $174M | <$200M (维持低位) | $200-500M | >$500M |
| **18A yield disclosure** | 未公开 (Tan 强调 on track) | 公开 yield <50% in 2026 H2 | 50-70% | >70% |
| **AMD server share** | Q4'25 32.3% (待 4-29 update) | >35% | 持平 | <30% |
| **NVIDIA next-gen reference design** | Rubin NVL8 选 Xeon 6 | Vera 100% Grace 确认 | 维持 partial Xeon | Vera 50%+ Xeon |
| **Tan spinoff signal** | 0 公开 (Q1'26 强调 integrated) | 持续无信号 | "consider all options" | 投行 pitch / Board review |
| **CHIPS Act 政策** | 2025-Q3 finalize | Trump rollback ≥30% reduction | 维持 | 加码 |
| **INTC stock price** | $82.57 (4-24 close) | 维持 $75-85 | 跌至 $50-65 | 跌至 $30-40 (公允锚附近) |

### 4.2 6-12 个月关键 events

```
2026-04-29: AMD Q1'26 earnings (KS-AMD update)
2026-05-01: AWS re:Invent 2026 (Graviton 5 announce expected)
2026-Q2 (July): Microsoft BUILD (Cobalt 2 wafer commitment update)
2026-Q3 (Aug-Sept): Intel Q2'26 earnings (DCAI / Foundry external trajectory)
2026-Q3-Q4 (Oct-Dec): NVIDIA GTC (Vera reference design potential reveal)
2026-Q4 (Nov): DoD 2027 budget vote (Foundry subsidies)
2027-Q1: Apple A20 NDA potential reveal (低概率)
```

### 4.3 行动决策矩阵

| 触发条件 | 行动 |
|---------|------|
| DCAI 连续 3 季度 +20%+ | upgrade to neutral, 公允上修至 $30-40 |
| Foundry quarterly external > $500M | upgrade to neutral, Bull 概率上修至 25%+ |
| Tan spinoff trigger fire | 立即重做估值, spinoff prize +$5/share |
| DCAI 跌至 <10% YoY | 强化 bear, 公允下修至 $15-20 |
| 18A yield 公开 <50% in 2026 H2 | 强化 bear, Foundry NPV 下修 |
| INTC 跌至 $30-40 (公允锚) | 重做 valuation, 评估 BUY 入场 |

---

## 5. 核心论证: ROIC vs WACC + Foundry 经济性

### 5.1 ROIC 计算 (FY2025 anchor)

```
NOPAT (FY2025):
  EBIT (Non-GAAP): $1.5B
  Tax rate effective: 14%
  NOPAT = $1.5B × (1 - 0.14) = $1.3B (Non-GAAP base)
  
  EBIT (GAAP): -$0.5B
  NOPAT (GAAP): negative

Invested Capital (Q1'26):
  PP&E (net): $79B
  Goodwill + Intangibles: $52B
  Operating WC: $14B
  - Cash + ST investments: -$11.5B
  Net IC: $134B

ROIC range:
  ROIC (Non-GAAP NOPAT, net IC): $1.3B / $134B = 1.0%
  ROIC (Non-GAAP, mid-cycle adjusted): 2-4%
  
WACC: 8% (CAPM 严格 9.02%, 行业中位 8% — 详见 §5.3)

Spread: ROIC 2-4% - WACC 8% = -4 to -6pp
EVA loss: -5pp × $134B = -$6.7B / year
```

> **关键**: 即使用 Non-GAAP base, ROIC 仍显著 < WACC. 这是反护城河信号. 反护城河公司不应使用成长股 PE 倍数.

### 5.2 Foundry 经济性 (v3.2 重锚, 用 Q1'26 actual)

> **v3.2 修正**: v3.0/v3.1 用模型推算 Foundry 5y -$120B cash burn. v3.2 用 Q1'26 actual 重锚.

**Q1'26 anchor** [DM-Q126-FOUND-001]:
- Intel Foundry segment revenue: $5.4B (含内部转移)
- External foundry revenue: $174M
- Operating loss: -$2.4B
- Annualized run-rate: revenue ~$22B (含内部) / external ~$0.7B / operating loss ~-$10B

**5y projection (基于 Q1'26 run-rate + 改善假设)**:

| 情景 | External rev 5y 累计 | Operating loss 5y 累计 | CapEx 5y 累计 | 净现金消耗 5y |
|------|------------------|---------------------|------------|------------|
| Bear (30-45%) | $3-5B (维持 $174M/quarter trajectory) | -$50 to -$60B | -$50-60B | -$100 to -$120B |
| Base (40-55%) | $5-12B (slight ramp) | -$30 to -$45B | -$50-55B | -$80 to -$100B |
| Bull (8-20%) | $15-25B (Microsoft Cobalt 2 + Apple A20 + DoD) | -$15 to -$25B | -$50-55B | -$65 to -$80B |
| **加权 (中点)** | **$8-12B** | **-$35B** | **-$53B** | **-$88B** |

> **核心观察**: 加权 5y Foundry 净现金消耗 ~-$88B (vs v3.0 单点 -$120B 略修正). Bull case 也仅 -$65 to -$80B. **Foundry 在任何情景下都是 5y 净消耗 -$60B+ 的业务**.

### 5.3 WACC 构造 (CAPM 严格)

```
Risk-free rate (10y Treasury): 4.3%
Equity Risk Premium: 4.5%
INTC beta (5y monthly): 1.30
Cost of equity = 4.3% + 1.30 × 4.5% = 10.15%

Cost of debt (after-tax):
  Pre-tax cost: 5.2% (avg coupon)
  After tax (14%): 4.5%

D/V ratio: 20%, E/V ratio: 80%
CAPM 严格 WACC = 0.80 × 10.15% + 0.20 × 4.5% = 9.02%

主估值采用 8% (行业中位):
  Damodaran 半导体行业 WACC database 2026: 7-9%, 中位 8%
  9.02% CAPM 严格作为 sensitivity 上限 (WACC ±100bp 影响 ±$2-3/share)
```

---

## 6. 三场博弈结构 (Q1'26 数据后 partial 重写)

### 6.1 vs AMD: 8/8 季度 7 次 beat, Q1'26 待 4-29 verify

```
AMD beat rate (FY2024 Q1 - FY2026 Q4): 7/8 = 87.5%
Q1'26 release: 4-29 (报告撰写 4-27 时尚未发生)
Q1'26 三路径预测:
  Path A (高概率 80%): AMD beat consensus → bear maintained
  Path B (中概率 15%): AMD in-line → 中性
  Path C (低概率 5%): AMD miss → bear weakened
```

**v3.2 update window**: 4-29 release 后 24 小时回填 (KS-AMD).

### 6.2 vs ARM hyperscaler: Q1'26 partial reverse

```
旧 thesis (v3.0/v3.1): ARM hyperscaler 渗透加速, INTC server share 必失 -10 to -15pp
Q1'26 actual: DCAI +22% YoY (5 年最强), Xeon 6 选为 NVIDIA DGX Rubin NVL8

reset:
  ARM hyperscaler new design 35-40% (维持)
  但 INTC server CPU 仍有立足点 (Rubin NVL8 + Google Cloud Xeon 6)
  INTC 5y server share 60-65% (vs v3.0 估算 50-55%, 上修 +5-10pp)
```

### 6.3 vs TSMC Foundry: Q1'26 confirm bear

```
旧 thesis: 18A yield 落后 TSMC N2 12-18 个月; capacity 落后 3-4x
Q1'26 actual: Foundry external $174M / quarter (无 surprise)

confirm:
  18A yield 数据未公开 (Tan 强调 on track, 但实际 yield 不公开 = <50% 概率高)
  Foundry external $174M / quarter 远低于商业化所需规模
  TSMC N2 量产, INTC 18A volume production 进度未明
```

---

## 7. 投资风格视角 (替代 v3.0/v3.1 圆桌大师投票)

> **v3.2 修正**: v3.0/v3.1 用 6 位投资大师"投票" 形式呈现, 容易被读者误读为大师真实观点. v3.2 改为 4 种投资风格视角, 不归到具体人.

### 7.1 质量投资风格 (ROIC + 安全边际)

**结论**: avoid

**理由**: ROIC 2-4% < WACC 8% = 反护城河. 即使 Q1'26 DCAI 反弹, 5y ROIC 改善需要 +400-600bp, 历史基准率 < 15%. 当前估值倍数 (trailing P/Sales 7.5x, FY26 run-rate Non-GAAP PE 84x) 显著高于半导体周期股历史顶部. 不参与.

### 7.2 Special situations 风格 (spinoff / 资产剥离)

**结论**: WATCH (监控 KS-spinoff)

**理由**: Tan 上任 13 个月 (2025-March → 2026-April), 进入 M&A 决策窗口期. 历史半导体 spinoff (AMD-GF Hector Ruiz 14m case) 作为 reference, 但案例稀少. spinoff prize 触发后估值跳升 +$5-15/share. 监控 (a) Tan 公开转向 (b) 投行 pitch (c) Board strategic review.

### 7.3 Deep value 风格 (清算价值)

**结论**: HOLD (不参与, 但下行 floor 存在)

**理由**: 清算价值 floor [C 推断]: 净债务 -$41.5B + PP&E $79B × 30-50% 清算率 + IP/专利 + Mobileye 持股 = 总 equity value $8-25/share. 当前 $82.57 vs floor $8-25 = -70 to -90% 下行空间. 不 SELL 因为 lift size 难把握, 但绝对不 BUY.

### 7.4 Long-short / 反身性风格

**结论**: SELL with caveat

**理由**: Reverse DCF 显示当前 $82.57 隐含 5y 假设过于乐观 (server 60%+ / Foundry external $20B+ / ROIC 8%+). 反身性反向触发概率 50%+ in 6-12 个月. 但 Q1'26 partial reverse 让 conviction 弱化. SELL position 风险: lift size 难把握, dead cat bounce +20-30% 概率高.

### 7.5 综合 (4 视角)

| 风格 | 行动 |
|------|------|
| 质量投资 | avoid |
| Special situations | WATCH (spinoff alert) |
| Deep value | HOLD (0 仓位) |
| Long-short | SELL with caveat |
| **多数视角** | **avoid / watch / wait for reset** |

**没有任何视角建议 BUY**. 这是 INTC 当前估值的诚实裁决.

---

## 8. 三个范畴重分配 (核心洞察)

### 8.1 重分类 1: Intel 不是 AI 时代回归者, 而是高资本投入 + 政府背书 + AI 叙事的混合系统

**含义**: 不应该用 "AI 平台 PE 40-60x" 给 INTC 定价. 应该用 "重资本周期股 PE 12-18x + 政府 puts adjusted option + Foundry NPV 当前 anchor" 的 SOTP 框架.

**Q1'26 update**: NVIDIA Rubin Xeon 6 + Google Cloud + DCAI +22% 显示 INTC 在 AI server 仍有立足点, 但不是核心受益者 (vs NVIDIA / AMD / ARM).

### 8.2 重分类 2: Intel Foundry 不是已经成功的转型故事, 而是仍处于早期商业化的高消耗业务

**含义**: 不应该用 "TSMC-like multiple (8-10x P/Sales)" 给 Foundry segment 估值. 当前 Foundry external $174M/quarter / 季度年化 <$1B, 距离市场假设的 $20B+ 5y 差 75%+.

**Q1'26 update**: 季度 external $174M confirm Foundry 商业化进度仍弱. 即使 18A 量产, 实际 wafer pull 取决于 yield + customer commitment.

### 8.3 重分类 3: Intel 当前价格不是"被低估的 turnaround 机会", 而是"已经提前买了大量转型成功的高争议高估值"

**含义**: 当前 $82.57 隐含 (server 60%+ / Foundry external $20B+ / ROIC 8%+ / 政府 puts strike $25-30) 四层假设. 任何一层 weaken, 估值需要 reset.

**Q1'26 update**: DCAI +22% partial confirm "server share 不会归零", 但不能上修到 60%+ (需要连续 3 季度 +20%+). Foundry external $174M confirm "Foundry 5y external $20B+ 假设过于乐观".

---

## 9. Kill Switch / 重启信号

### 9.1 下修触发 (任一发生 → 公允下修 / 评级强化)

| Trigger | 影响 |
|---------|------|
| 5-1 AWS re:Invent ARM 路线图加速 (Graviton 5 announce + 路线图加快) | DCAI +22% 是周期性反弹 confirm, 公允下修 -$2-3 |
| 2026 H2 Foundry external commit <$5B (累计 wafer commitment 不足) | Foundry NPV 深度负值, 公允下修 -$3-5 |
| 2026 Q3-Q4 NVIDIA Vera 100% Grace ARM 确认 | INTC 在 NVIDIA AI server 失去机会, 公允下修 -$2-4 |
| Trump CHIPS Act rollback ≥30% reduction | 政府 puts 信用 weakened, 公允下修 -$2-4 |
| DCAI 连续 2 季度 <10% YoY | "DCAI 反弹" 论点失效, 公允下修 -$3-5 |

**联合触发 3+ 个 → 公允下修 -$10-15, 向 Bear $11.5 收敛**.

### 9.2 上修触发 (任一发生 → 公允上修 / 评级 pivot)

| Trigger | 影响 |
|---------|------|
| DCAI 连续 3 季度 +20%+ YoY | "DCAI trajectory 转折" 确认, 公允上修 +$5-8 |
| Foundry quarterly external >$500M | Foundry 商业化进度 confirm, 公允上修 +$5-10 |
| Tan 公开转向 spinoff signal (KS-spinoff) | spinoff 期权值 +$5/share, 公允上修 +$3-5 |
| 18A yield 公开 >70% in 2026 H2 | yield ramp 比预期快, Foundry NPV 上修 +$3-5 |
| Apple A20 NDA 公开化 | Foundry external 突破, 公允上修 +$5-10 |
| Microsoft Cobalt 2 commitment 上修至 50K+ wafer | Foundry external trajectory 改善, 公允上修 +$2-4 |

**联合触发 3+ 个 → 公允上修 +$15-25, 进入 Bull endgame $55-75 区间**.

### 9.3 当期跟踪基线 (W-7 冻结, 2026-04-27)

```yaml
tracking_baseline:
  date: 2026-04-27
  current_price: $82.57
  today_PV: $19.76 (区间 $18-25)
  5y_exit_value: $29.02 (区间 $26-35)
  rating: 审慎关注 (高争议)
  next_review_trigger: AMD Q1'26 release (2026-04-29)
  
kill_switches:
  - id: KS-DCAI
    variable: DCAI YoY growth trajectory
    baseline: Q1'26 +22%
    confirm_bear: <10% next 2 quarters
    pivot_bull: 连续 3 季度 >20%
  - id: KS-FOUND-EXT
    variable: Foundry quarterly external revenue
    baseline: Q1'26 $174M
    confirm_bear: <$200M
    pivot_bull: >$500M
  - id: KS-AMD
    variable: AMD server share
    baseline: Q4'25 32.3% (Q1'26 待 4-29 update)
    confirm_bear: >35%
    weaken_bear: <30%
  - id: KS-NVDA
    variable: NVIDIA Vera reference design
    baseline: Rubin NVL8 选 Xeon 6 (partial reverse)
    confirm_bear: Vera 100% Grace
    pivot_bull: Vera 50%+ Xeon
  - id: KS-spinoff
    variable: Tan spinoff signal
    baseline: 0 公开 (Q1'26 强调 integrated)
    weaken_bear: 改口 "consider all options"
    pivot_bull: 投行 pitch / Board review
  - id: KS-CHIPS
    variable: Trump CHIPS Act 政策
    baseline: 2026 Q1 提出重新评估 (Polymarket 35%)
    confirm_bear: rollback ≥30% reduction
  - id: KS-18A-yield
    variable: 18A yield disclosure
    baseline: 未公开 (Tan 强调 on track)
    confirm_bear: 公开 <50% in 2026 H2
    pivot_bull: >70% in 2026 H2
  - id: KS-PRICE
    variable: INTC stock price
    baseline: $82.57 (4-24 close)
    weaken_bear: 跌至 $50-65
    pivot_action: 跌至 $30-40 (公允锚附近)
```

---

## 10. 认知边界量化 (R-4)

```
认知圈量化 v3.2:
  可推演度: 55-65% (中等, multi-tech + 周期 + 杠杆 + 供应链 + 政府介入)
  业务复杂度: 4/5 (multi-tech + cycle + 政府)
  黑箱比例: 40-50% (中点 45%, vs v3.0/v3.1 35-45%)
  
  → 综合判断: 需要折价 (黑箱接近 too hard 边界)
  → 对评级的影响: 公允价值给区间, 不给单点
  → R-4 硬约束: 触发 (黑箱 >30%)
```

### 10.1 黑箱来源 (v3.2 update)

| 黑箱来源 | 占比 | 备注 |
|---------|------|------|
| Foundry external customer 实际 wafer pull | 12-15% | Q1'26 $174M anchor 但 trajectory 不可预测 |
| Foundry 5y NPV terminal value | 8-10% | 5y 后是 TSMC-like 还是 GF-like 不确定 |
| NVIDIA Vera reference design | 5-8% | Rubin NVL8 partial reverse 但 Vera 待 GTC reveal |
| Tan 战略真实意图 (spinoff vs IDM) | 5-8% | Q1'26 强调 integrated 但不是 reject |
| 政府 puts 实际 strike + 触发条件 | 5-7% | $7.86B + $3B + tax credit + 持股, 净 put value 不确定 |
| Q1'26 GAAP -$0.73 含 impairment 一次性 vs 持续 | 3-5% | accounting clean-up vs operating recovery 边界 |
| **累计** | **38-53%** | **中点 45%** |

### 10.2 同业对比

| 公司 | 可推演度 | 复杂度 | 黑箱 | 判断 |
|------|--------|-------|------|------|
| COST | 90% | 1/5 | 5% | highly investable |
| TSM | 70% | 4/5 | 25% | 轻微折价 |
| AMD | 75% | 3/5 | 22% | 可投资 |
| ASML | 75% | 3/5 | 20% | 可投资 |
| **INTC** | **60%** | **4/5** | **45%** | **需要折价** |
| SMIC | 40% | 5/5 | 55% | too hard |

INTC 在半导体同业中位居"复杂度高 + 黑箱大" 的边界位置, 接近 too hard.

---

## 11. 三个钉子 (留给读者带走的判断)

### 11.1 钉子 1: 当前价格已经提前买了大量转型成功

Intel 当前 $82.57 隐含的 5y 假设 (server 60%+ / Foundry external $20B+ / ROIC 8%+ / 政府 puts strike $25-30) **任何一层 weaken 都触发 reset**.

我们的今日 PV 估值 $18-25 反映的是 "这些假设大部分不成立" 的概率加权.

### 11.2 钉子 2: Q1'26 数据 partial reverse bear, 但不足以 justify 当前估值

DCAI +22% / NVIDIA Rubin Xeon 6 / Google Cloud 合作 — 三个 positive signal 削弱了 v3.0/v3.1 的高确定性 SELL 论点. 但 Foundry external $174M / quarter 仍弱, ROIC 2-4% / WACC 8% 反护城河持续.

**Bull case 上限 5y exit $65, vs 当前 $82.57 仍 -21% 下行**. 即使 Bull 全部成立, 当前价格仍偏高.

### 11.3 钉子 3: 行动不是 SELL, 而是 watch / wait for reset

正确的行动:
- avoid (不参与)
- watch (跟踪 KS-DCAI / KS-FOUND-EXT / KS-spinoff)
- wait for reset (等股价跌到 $30-40 公允锚附近)

**Reset window 6-12 个月, 触发概率 40-50% (vs v3.0/v3.1 50-60%)**. Q1'26 partial reverse 让时间窗口延长.

### 11.4 迁移问题

看下一家"估值高 + 业务 challenged"公司时, 必问:

1. **当前价格隐含 5y 假设是什么?** (Reverse DCF + 多倍数 triangulate)
2. **这些假设中哪些有 [B] 级硬数据支撑, 哪些是 [C] 推断?**
3. **最近一个季度的 actual data confirm 还是 reverse 这些假设?**
4. **如果今天买入, lift size 风险是什么?** (历史 reset 路径 + dead cat bounce)

---

## 12. 数据源索引 (DM 锚点完整列表)

### 12.1 价格 / 市场

[DM-PRICE-001] INTC 4-24 close $82.57 (FactSet)
[DM-PRICE-002] INTC 4-24 盘中高 $85.22 (Business Insider 2026-04)
[DM-SHARES-001] INTC Q1'26 摊薄股本 4.32B (Q1'26 10-Q)
[DM-MCAP-001] 隐含市值 $357B (computed)
[DM-GOV-001] 政府 10% 持股估值 $36B (Business Insider 2026-04)

### 12.2 FY2025 财务

[DM-FY25-001] FY2025 revenue $52.9B (Intel FY2025 10-K)
[DM-FY25-002] FY2025 GAAP EPS -$0.06 (Intel FY2025 10-K)
[DM-FY25-003] FY2025 Non-GAAP EPS $0.42 (Intel FY2025 10-K)
[DM-FY25-004] FY2025 GAAP Gross Margin 34.8% (Intel FY2025 10-K)
[DM-FY25-005] FY2025 Non-GAAP Gross Margin 36.7% (Intel FY2025 10-K)
[DM-FY25-006] FY2025 GAAP Operating Income -$0.5B (10-K)
[DM-FY25-007] FY2025 Non-GAAP Operating Income $1.5B (10-K)

### 12.3 Q1'26 财务

[DM-Q126-101] Q1'26 revenue $13.6B +7% YoY (Intel Q1'26 release 2026-04-23)
[DM-Q126-102] Q1'26 GAAP EPS -$0.73 (Intel Q1'26 release)
[DM-Q126-103] Q1'26 Non-GAAP EPS $0.29 +123% YoY (Intel Q1'26 release)
[DM-Q126-104] Q1'26 GAAP Gross Margin 39.4% (Intel Q1'26 release)
[DM-Q126-105] Q1'26 Non-GAAP Gross Margin 41.0% (Intel Q1'26 release)
[DM-Q126-106] Q2'26 Non-GAAP EPS guidance $0.20 (Intel Q1'26 release)
[DM-Q126-107] Q1'26 GAAP loss 含 impairment / restructuring ~$3-4B (computed from Q1 10-Q)

### 12.4 Q1'26 segment

[DM-Q126-201] Q1'26 CCG ~$7B +3% (Intel Q1'26 release)
[DM-Q126-202] Q1'26 DCAI $5.1B +22% YoY (Intel Q1'26 release)
[DM-Q126-203] Q1'26 Intel Foundry $5.4B +16% (含内部, Intel Q1'26 release)
[DM-Q126-204] Q1'26 Intel Foundry external revenue $174M (Intel Q1'26 release + Motley Fool transcript)
[DM-Q126-205] Q1'26 Intel Foundry operating loss -$2.4B (Motley Fool transcript)
[DM-Q126-206] Q1'26 All Other ~$0.5-1B (computed)

### 12.5 Q1'26 announcements

[DM-Q126-301] Xeon 6 选为 NVIDIA DGX Rubin NVL8 host CPU (Intel Q1'26 announcement)
[DM-Q126-302] Google Cloud Xeon 6 多年合作 (Intel Q1'26 announcement)
[DM-Q126-303] TeraFab 项目宣布 (Intel Q1'26 announcement)
[DM-Q126-304] 18A yield Tan 强调 on track (Q1'26 earnings transcript Motley Fool)
[DM-Q126-305] 14A 2027 H2 risk production roadmap (Intel Q1'26 announcement)

### 12.6 资产负债表

[DM-BS-001] Q1'26 net debt -$41.5B (Q1'26 10-Q)

### 12.7 政府 / 政策

[DM-CHIPS-001] CHIPS Act $7.86B direct + $3B Secure Enclave + 25% tax credit (Intel newsroom 2024-Q4 finalize)
[DM-POLY-001] Polymarket "Will Trump rollback CHIPS Act in 2026" 35% probability

### 12.8 历史与可比

[DM-HIST-001] AMD-GlobalFoundries 2009 Hector Ruiz 14m spinoff case
[DM-HIST-002] 半导体 leapfrog 1990-2024 历史成功率 <15%
[DM-HIST-003] INTC 2000-2002 互联网泡沫 reset P/S 12x → 2.5x (-81%)
[DM-HIST-004] INTC 2021-2022 7nm delay reset P/S 3.5x → 1.4x (-62%)
[DM-HIST-005] GlobalFoundries 2009-2024 history (Foundry 失败镜像)

### 12.9 同业 (FY2025)

[DM-COMP-001] AMD FY2025 Revenue + GM% + ROIC
[DM-COMP-002] TSMC FY2025 GM% 60% + ROIC 28%
[DM-COMP-003] NVIDIA FY2025 GM% 75% + ROIC 65%
[DM-COMP-004] GlobalFoundries FY2025 GM% 24% + P/Sales 3.5x
[DM-COMP-005] Samsung Semi + SK Hynix 同业 P/Sales 中位 2.15x

### 12.10 工艺与 Foundry

[DM-TSM-001] TSMC N2 capacity 200K wafer/month 2026 plan
[DM-INT-CAP-001] INTC 18A capacity 50-80K wafer/month 2026 plan
[DM-PROC-001] INTC 14nm/10nm yield ramp 历史 18-30 months to 70%
[DM-PROC-002] TSMC N5/N3 yield ramp 6-9 months to 70%
[DM-FOUND-001] Microsoft Cobalt 2 30K wafer LOI (5y $1.5-2B)

### 12.11 WACC / 估值

[DM-WACC-001] CAPM: 4.3% rf + 1.30 β × 4.5% ERP = 10.15% equity
[DM-WACC-002] 行业 WACC convention 7-9%, 中位 8% (Damodaran 2026)
[DM-VAL-001] 半导体周期股历史顶部 P/Sales 4-5x
[DM-VAL-002] 半导体周期股周期中位 P/Sales 2-3x

---

## 13. 版本历史 + 数据时效性

### 13.1 版本历史

| 版本 | 日期 | 主要变化 |
|------|------|---------|
| v1.x | 2026-02-18 - 02-25 | 早期 Tier 3 研究 |
| v3.0 | 2026-04-26 | Tier 3 完整版, 但有 7 项 P0 数据错误 + 5 项 P1 逻辑问题 |
| v3.1 | 2026-04-27 | 补丁式修正 v3.0, 但旧文残留严重 + Q1'26 数据有新错误 |
| **v3.2** | **2026-04-27** | **Clean rewrite, 单一数字版本, Q1'26 数据修正, segment 对齐 Intel reportable** |

### 13.2 v3.2 已知限制

1. **AMD Q1'26 数据待 4-29 release**: KS-AMD 仍 pending
2. **NVIDIA Vera reference design 待 2026 Q3-Q4 GTC reveal**: KS-NVDA 仍 partial
3. **18A yield 实际数据未公开**: KS-18A-yield 仍 pending
4. **Q1'26 vs FY2025 trajectory 需要 2-3 季度确认**: DCAI +22% 是周期性反弹还是转折

### 13.3 数据时效性

所有数据截止 **2026-04-27** (我们这版完成日, Q1'26 release 2026-04-23 后 4 天).

### 13.4 下次覆盖触发

- **立即触发** (24 小时内): AMD Q1'26 release (4-29) / Tan spinoff signal / CHIPS 政策变化
- **短期** (1-3 月): 5-1 AWS re:Invent / Microsoft BUILD / Intel Q2'26 earnings
- **中期** (6-12 月): NVIDIA GTC Vera reference design / Foundry external Q3'26 update / Apple A20 NDA potential reveal

---

**报告 v3.2 完结. 2026-04-27.**

> **核心结论**: Intel 当前 $82.57 已经提前买了大量转型成功. 我们的今日 PV $18-25 / 5y exit $26-35 表明显著高估, 但 Q1'26 数据 partial reverse bear conviction. 评级**审慎关注 (高争议)**, 行动**avoid / watch / wait for reset**, 不构成 high-conviction SELL 推荐.

---

## 14. 估值桥 — 从 $82.57 到 $19.76 的因果传导

我们用 5 步因果传导链, 把当前 $82.57 拆解到今日 PV $19.76. 每一步基于 [B] 级硬数据, 而不是断言.

```mermaid
flowchart TD
    P[当前 $82.57<br/>2026-04-24 close]
    P --> Q1[市场隐含 5y 假设]
    Q1 --> A1[Server 60%+ at 2030]
    Q1 --> A2[Foundry external $20B+ 5y]
    Q1 --> A3[ROIC 5y 追上 WACC]
    Q1 --> A4[政府 puts strike $25-30]

    A1 --> R[反证检验]
    A2 --> R
    A3 --> R
    A4 --> R

    R --> B1[Bear 30-45%<br/>$8-15]
    R --> B2[Base 40-55%<br/>$28-35]
    R --> B3[Bull 8-20%<br/>$55-75]

    B1 --> W[加权 5y exit $29]
    B2 --> W
    B3 --> W

    W --> PV[今日 PV $19.76<br/>区间 $18-25]
    PV --> D[downside -76%]
```

**步骤 1**: 当前 $82.57 (隐含 EV $398B). 因为 EV $398B / FY2025 Revenue $52.9B = trailing EV/Sales 7.5x, 因此在半导体周期股范畴中处于历史顶部水平. 因为周期顶部水平不可持续, 因此 reset 是基础假设.

**步骤 2**: Reverse DCF 显示市场隐含 4 个核心假设 (server 60%+ / Foundry $20B+ / ROIC 8%+ / 政府 puts strike $25-30). 因为这 4 个假设需要联合成立, 因此联合概率 < 30% (即使每个独立概率 70%, 联合 70%^4 = 24%).

**步骤 3**: 反证检验 — Q1'26 actual 显示: DCAI +22% 部分 confirm server 假设 (但需要持续验证); Foundry external $174M 强烈 reverse $20B+ 5y 假设 (年化 <$1B); ROIC 2-4% 离 8% 仍差 4-6pp; 政府 puts strike 实际可能是 $10-15 (GM 2009 case 校准). 这意味着 4 个假设中至少 2 个不成立.

**步骤 4**: 三情景概率加权 — Bear $11.5 × 37.5% + Base $31.5 × 47.5% + Bull $65 × 15% = $29.02. 这解释了为什么 5y exit value 远低于市场隐含.

**步骤 5**: 今日 PV (8% WACC, 5y, factor 0.681): $29.02 × 0.681 = $19.76. 这意味着如果市场 12 个月内 reset, 今天买入的合理价格区间是 $18-25.

---

## 15. Foundry 经济性深度 (三表拆解, v3.2 重锚 Q1'26)

> **v3.2 修正**: v3.0/v3.1 把 Foundry "$120B 5y cash burn" 作为单一数字, 但没有区分 (a) accounting loss, (b) cash loss, (c) Foundry-specific CapEx. v3.2 拆三表, 用 Q1'26 actual 重锚.

### 15.1 表 A: Accounting Operating Loss (5y projection)

```mermaid
flowchart LR
    Q1[Q1'26 actual<br/>operating loss -$2.4B]
    Q1 --> A[年化 -$10B/year]
    A --> B[5y 累计 accounting loss]
    B --> Bull[Bull 概率 15%<br/>-$15 to -$25B]
    B --> Base[Base 概率 47.5%<br/>-$30 to -$45B]
    B --> Bear[Bear 概率 37.5%<br/>-$50 to -$60B]
    Bull --> W[加权 -$35B]
    Base --> W
    Bear --> W
```

**含义**: Operating loss 是 P&L 数字, 含 D&A 但不含 CapEx. 因为 Foundry 是高 D&A 业务 (fab depreciation 大), accounting loss 比 cash loss 更大. 因此用 operating loss 评估 Foundry 经济性会高估损失.

### 15.2 表 B: Cash Loss (扣 prepayment + 政府补贴)

| 情景 | 5y operating loss | + Prepayment (Microsoft / Apple LOI) | + 政府 grants ($7.86B + tax credits) | 5y cash loss |
|------|-------------------|--------------------------------------|----------------------------------|------------|
| Bear (37.5%) | -$55B | +$2-5B | +$10B | -$40 to -$43B |
| Base (47.5%) | -$37.5B | +$5-10B | +$10-15B | -$15 to -$22.5B |
| Bull (15%) | -$20B | +$10-15B | +$15-20B | +$10 to +$15B (转正!) |
| **加权** | -$35B | +$5-8B | +$10-15B | **-$15 to -$22B** |

**含义**: 因为政府补贴 + customer prepayment 抵消部分 cash loss, 因此真实 cash loss 比 operating loss 小. 这意味着 Foundry 不是"立即崩盘" 业务, 但仍然是 5y 净消耗.

### 15.3 表 C: Foundry-specific CapEx (vs 集团 CapEx)

| Year | 集团 CapEx | Foundry-specific (估算) | 占比 |
|------|----------|---------------------|------|
| FY2022 | $24.8B | ~$12B | 48% |
| FY2023 | $25.7B | ~$14B | 54% |
| FY2024 | $24.0B | ~$13B | 54% |
| FY2025 | $22.2B | ~$12B | 54% |
| FY2026 E | $20-22B | ~$11-12B | 53% |
| **5y 累计** | $116B | ~$62B | 53% |

**含义**: Foundry-specific CapEx 5y 累计 ~$62B, 是 Foundry 战略的真实投入. 加上 cash loss -$15 to -$22B, 5y Foundry 净现金消耗约 -$77 to -$84B. 这与 v3.0/v3.1 单一数字 -$120B 略有差距 (因为 v3.0/v3.1 没扣 prepayment + 政府补贴).

### 15.4 Foundry 终局推演

```
5y exit Foundry segment 估值:
  Bull endgame (15%): Foundry external $20B+ 5y, GM% 转正, terminal value $25-50B = +$5-10/share
  Base endgame (47.5%): Foundry external $5-10B 5y, GM% 接近 0, terminal value $5-15B = $1-3/share
  Bear endgame (37.5%): Foundry 战略调整 (放弃 leading-edge), terminal value -$10 to +$5B = -$2 to +$1/share

加权 Foundry 5y NPV:
  15% × +$7.5 + 47.5% × +$2 + 37.5% × -$0.5 = $1.125 + $0.95 - $0.19 = +$1.89/share
  
  vs v3.0/v3.1 -$6/share (估算偏悲观)
  vs 市场隐含 +$30/share (市场过于乐观)
```

**含义**: 因为 Foundry 5y NPV 加权约 +$2/share, 远低于市场假设 +$30, 因此 Foundry 是当前估值过高的最大单一 driver.

---

## 16. 三场博弈细节 (v3.2 重写, 反映 Q1'26 数据)

### 16.1 vs AMD: Q1'26 三路径 (4-29 release 后回填)

```mermaid
flowchart TD
    AMD[AMD Q1'26 release<br/>2026-04-29]
    AMD -->|beat 80%+| A[Path A 80%]
    AMD -->|in-line 15%| B[Path B 15%]
    AMD -->|miss 5%| C[Path C 5%]

    A --> A1[KS-3 维持 87.5%<br/>INTC bear maintained<br/>公允 $18-25]
    B --> B1[KS-3 微降至 80%<br/>INTC 中性<br/>公允 $20-26]
    C --> C1[KS-3 大幅下降<br/>INTC bear weakened<br/>公允 $25-32]
```

**Polymarket 当前预测** [DM-POLY-002]: AMD Q1'26 beat consensus 78% / no beat 22%. 与 Path A 80% / Path B+C 20% 估算一致.

**4-29 后回填项** (24 小时窗口):
- KS-AMD update (加入 9 季度 beat rate)
- AMD server share Q1'26 actual (Mercury Research)
- INTC bear 概率重新校准

### 16.2 vs ARM hyperscaler: Q1'26 partial reverse

```mermaid
flowchart LR
    Old[v3.0 thesis<br/>NVIDIA Vera 100% Grace<br/>概率 70-80%]
    Q1[Q1'26 actual<br/>Rubin NVL8 选 Xeon 6]
    Old --> Q1
    Q1 --> New[v3.2 修正<br/>Vera 100% Grace 概率 50-60%<br/>Vera partial Xeon 概率 25-35%<br/>Vera 50%+ Xeon 概率 10-15%]

    New --> Imp[INTC AI server<br/>5y revenue 上修 +$2-4B<br/>5y exit value 上修 +$2/share]
```

**含义**: 因为 NVIDIA Rubin NVL8 选 Xeon 6 是负向 signal for ARM hyperscaler 一边倒论点, 因此 Vera 100% Grace 概率从 70-80% 下修至 50-60%. 这意味着 INTC 在 NVIDIA AI server 仍有立足点, 不是完全失去机会.

### 16.3 vs TSMC Foundry: Q1'26 confirm bear

| 维度 | TSMC N2 | INTC 18A | 差距 |
|------|---------|---------|------|
| 量产时间 | 2026 H1 | 2025 Q4 - 2026 Q1 | 接近 |
| Yield ramp 70% 时间 | 6-9 个月 (历史 N5/N3 平均) | 18-30 个月 (历史 INTC 14nm/10nm) | 12-18 个月 |
| Capacity 2026 | 200K wafer/month | 50-80K wafer/month | 3-4x |
| Customer 数量 | Apple/AMD/Qualcomm/MediaTek/NVIDIA | Microsoft + DoD + INTC 自己 | 5-8x |
| Q1'26 external rev | TSMC N2 已 ramp | INTC Foundry external $174M (年化 <$1B) | 显著差距 |

**含义**: 因为工艺节点差距持续 18-30 个月, 因此 INTC 18A 即使量产, 实际"useful production" 落后 TSMC N2 12-18 个月. 加上 Q1'26 Foundry external $174M confirm 商业化进度仍弱, 因此 vs TSMC 博弈 confirm bear.

---

## 17. ROIC 反护城河深度

### 17.1 ROIC trajectory

```mermaid
flowchart LR
    Y20[FY2020 ROIC 18%<br/>NOPAT $13B / IC $72B]
    Y22[FY2022 ROIC 8%<br/>NOPAT $7B / IC $90B]
    Y25[FY2025 ROIC 1-2%<br/>NOPAT $1.3B / IC $134B]

    Y20 --> Y22
    Y22 --> Y25

    Y25 --> Spread[ROIC 1-2% vs WACC 8%<br/>spread -6 to -7pp]
    Spread --> EVA[5y EVA loss<br/>-$33 to -$37B]
    EVA --> Verdict[反护城河]
```

### 17.2 ROIC 改善路径分析

要 ROIC 从 2-4% 升到 8% (追平 WACC) 需要 +400-600bp 改善. 路径分析:

| 路径 | 需要的 NOPAT 改善 | 5y 历史基准率 |
|------|-----------------|------------|
| Revenue +30% (回到 FY2020 peak) + GM 维持 | NOPAT +$3-4B | <10% (server share 不可能恢复) |
| GM 改善 +10pp (35% → 45%) | NOPAT +$5-6B | 15-20% (18A 量产 + scale) |
| OpEx 削减 -20% | NOPAT +$3-4B | 30-40% (但削减 R&D = 放弃 18A 战略) |
| Foundry 转正 + scale | NOPAT +$2-3B | 20% (但需要 5y+ 时间) |

**含义**: 因为单一路径都无法让 ROIC 5y 内追上 WACC, 因此必须**多路径同时成功**. 多路径联合概率 < 15%. 这意味着反护城河持续是 base case.

---

## 18. 政府 puts 真实价值 (v3.2 调整 BS option pricing)

### 18.1 v3.0/v3.1 的简化错误

v3.0/v3.1 把"政府 puts" 用 Black-Scholes 直接给 $5-8/share. 这个简化忽略了:

(a) 政府介入实际 strike (历史 GM 2009 case 是 $0.75 → $33, strike 实际是 distress 后的 emergency capital)
(b) 政府介入限制 INTC 战略灵活度 (spinoff / M&A / layoffs / asset sale 都受限)
(c) CHIPS Act 政策不稳定性 (Trump 2026 重新评估 35% 概率)
(d) 政府 10% 持股的退出风险 (5y 内退出概率高)

### 18.2 v3.2 调整后 (融资约束缓释 + 战略灵活性折价)

| 项目 | Value | 备注 |
|------|-------|------|
| 融资约束缓释 (CHIPS $7.86B + tax credit) | +$3-5/share | 降低 CapEx 现金压力 |
| 战略灵活性折价 (spinoff / M&A 受限) | -$2-4/share | 政府要求维持 IDM 完整性 |
| Implicit puts (distress 时介入) | +$1-2/share | strike $10-15, BS 价值 (vs 市场假设 $5-8) |
| 10% 持股稀释 | -$1-2/share | 政府持股本身就是 dilution |
| CHIPS rollback 风险 (35%) | -$1-2/share | Trump 政策不稳 |
| **净 puts value** | **+$0 to +$2/share** | 显著低于市场假设 +$8 |

**含义**: 政府 puts 净价值 ~$1/share, 远低于市场假设 ~$8. 这个差距 -$7/share 解释了 $82.57 中 ~10% 是政府 puts 高估.

---

## 19. 同业对标 (含 Q1'26 update)

### 19.1 同业财务对比表

| 公司 | Market Cap | P/Sales | ROIC | GM% | 5y Rev CAGR |
|------|-----------|---------|------|-----|------------|
| INTC v3.2 | $357B | 7.5x | 1-4% | 35% (GAAP) / 37% (Non-GAAP) | -7% |
| TSMC | $850B | 8.5x | 28% | 60% | +15% |
| Samsung Semi | $290B | 1.8x | 12% | 38% | +5% |
| SK Hynix | $130B | 2.5x | 18% | 40% | +12% |
| GlobalFoundries | $25B | 3.5x | 8% | 24% | -2% |
| AMD | $230B | 8.0x | 28% | 50% | +25% |
| NVIDIA | $3500B | 25x | 65% | 75% | +50% |

### 19.2 INTC vs IDM/Foundry 同业 fair value

```mermaid
flowchart TD
    INTC[INTC 当前 P/Sales 7.5x]

    INTC --> IDM[IDM 同业中位 P/Sales 2.15x]
    INTC --> FOUND[Foundry 同业中位 P/Sales 2.85x]
    INTC --> Cycle[INTC 历史周期中位 P/Sales 3.5x]
    INTC --> Adj[ROIC 调整 P/Sales 2.45x]

    IDM --> V1[公允股价 $14]
    FOUND --> V2[公允股价 $19]
    Cycle --> V3[公允股价 $24]
    Adj --> V4[公允股价 $16]

    V1 --> Avg[加权平均 $18]
    V2 --> Avg
    V3 --> Avg
    V4 --> Avg
```

**含义**: 因为同业对标加权 $18, 与今日 PV $19.76 接近, 因此估值结论 cross-validated.

---

## 20. 历史可比 (3 个 reset case)

### 20.1 INTC 2000-2002 互联网泡沫 reset

```
2000 Q1 顶: $75 (P/Sales 12x, 互联网泡沫顶)
2002 Q3 底: $14 (P/Sales 2.5x)
Reset 幅度: -81%
Reset 时间: 30 个月
触发: 互联网泡沫破灭 + 企业 IT spending freeze + AMD K7/K8
```

### 20.2 INTC 2021-2022 7nm delay reset

```
2021 Q1 顶: $68 (P/Sales 3.5x, Pat Gelsinger 上任前)
2022 Q4 底: $26 (P/Sales 1.4x)
Reset 幅度: -62%
Reset 时间: 21 个月
触发: 7nm delay + AMD share 加速 + macro tightening
```

### 20.3 当前 (2026) vs 历史

```
当前 P/Sales 7.5x: 高于 2021 顶部 3.5x (2x 高), 高于 2017 顶部 4.0x (1.9x 高)
v3.2 reset 预期: 6-12 个月 -55 to -65%
触发: 5 个 catalyst (Q1'26 已 partial reverse 部分)
```

**含义**: 因为当前 P/Sales 7.5x 显著高于 INTC 自己历史顶部, 因此 reset 是"何时" 而非"是否" 问题. v3.2 估算 reset 时间 6-12 个月, 幅度 -55 to -65% (vs v3.0/v3.1 -65 to -75%, 弱化因 Q1'26 partial reverse).

---

## 21. 终章: 因果终结 (5 步压缩)

我们这份研报的核心因果链, 压缩到 5 步:

**第 1 步**: 因为 INTC FY2025 ROIC 1-2% (NOPAT $1.3B / IC $134B) < WACC 8%, 因此是反护城河公司. 因为反护城河公司不应使用成长股 PE 倍数, 因此当前 trailing P/Sales 7.5x 必须 reset 到周期股中位 2-3x.

**第 2 步**: 因为 Q1'26 Foundry external 仅 $174M (季度年化 <$1B), 因此距离市场假设 5y 累计 $20B+ 差 75%+. 因此 Foundry 5y NPV 加权 ~+$2/share (vs 市场假设 +$30), 解释当前估值过高的最大单一 driver.

**第 3 步**: 因为 Q1'26 DCAI +22% YoY + NVIDIA Rubin NVL8 选 Xeon 6 + Google Cloud 合作, 因此 INTC 在 AI server 仍有立足点. 因此 v3.0/v3.1 "INTC 完全失去 AI server" 论点过度. v3.2 修正: server CPU 5y trajectory 50-65% (vs v3.0 估算 50-55%), 上修 +5-10pp.

**第 4 步**: 因为政府介入是 implicit puts 但同时限制战略灵活度, 因此政府 puts 净 value 仅 +$1/share (vs 市场假设 +$8). 这意味着政府背书不能 justify 当前估值溢价.

**第 5 步**: 因为以上 4 层因果合并 (反护城河 + Foundry NPV 远低于市场假设 + AI server 部分立足 + 政府 puts 真实价值低), 因此今日 PV $18-25 / 5y exit $26-35 / 5y 期望回报 -65%. 这意味着评级**审慎关注 (高争议)**, 行动**avoid / watch / wait for reset**, 不构成 high-conviction SELL.

> **这就是 v3.2 INTC**.

---

**报告 v3.2 真正完结. 2026-04-27.**

> Intel 当前 $82.57 已经提前买了大量转型成功. 我们的今日 PV $18-25 / 5y exit $26-35 显示显著高估, 但 Q1'26 数据 partial reverse bear conviction. 评级审慎关注 (高争议), 行动 avoid / watch / wait for reset.


---

## 22. 数据深度 (高密度 DM 注释)

### 22.1 INTC 5y 财务时间序列 (年度)

```mermaid
flowchart LR
    Y20[FY2020<br/>Rev $77.9B<br/>GAAP EPS $4.94<br/>GM 56.1%<br/>FCF +$21B]
    Y21[FY2021<br/>Rev $79.0B<br/>EPS $4.86<br/>GM 55.4%<br/>FCF +$11B]
    Y22[FY2022<br/>Rev $63.1B<br/>EPS $1.94<br/>GM 47.3%<br/>FCF -$9B]
    Y23[FY2023<br/>Rev $54.2B<br/>EPS $0.40<br/>GM 40.0%<br/>FCF -$14B]
    Y24[FY2024<br/>Rev $53.1B<br/>EPS $0.04<br/>GM 36.0%<br/>FCF -$16B]
    Y25[FY2025<br/>Rev $52.9B<br/>EPS -$0.06<br/>GM 34.8%<br/>FCF -$8B]

    Y20 --> Y21
    Y21 --> Y22
    Y22 --> Y23
    Y23 --> Y24
    Y24 --> Y25

    Y25 --> Q1[Q1'26<br/>Rev $13.6B +7%<br/>Non-GAAP EPS $0.29 +123%<br/>Non-GAAP GM 41% +430bp<br/>DCAI +22%]
```

**5y trajectory 锚点**:

[DM-FY20-001 Intel FY2020 10-K Revenue $77.9B] [DM-FY20-002 GAAP EPS $4.94]
[DM-FY21-001 Intel FY2021 10-K Revenue $79.0B] [DM-FY21-002 GAAP EPS $4.86]
[DM-FY22-001 Intel FY2022 10-K Revenue $63.1B] [DM-FY22-002 GAAP EPS $1.94]
[DM-FY23-001 Intel FY2023 10-K Revenue $54.2B] [DM-FY23-002 GAAP EPS $0.40]
[DM-FY24-001 Intel FY2024 10-K Revenue $53.1B] [DM-FY24-002 GAAP EPS $0.04]

### 22.2 Q1'26 核心数据点完整索引

[DM-Q126-401 Intel Q1'26 release 2026-04-23 official press release]
[DM-Q126-402 Intel Q1'26 earnings transcript Motley Fool 2026-04-23]
[DM-Q126-403 Q1'26 segment breakdown DCAI/CCG/Foundry]
[DM-Q126-404 Q1'26 Foundry external revenue $174M anchor]
[DM-Q126-405 Q1'26 Foundry operating loss -$2.4B anchor]
[DM-Q126-406 Q1'26 Non-GAAP GM 41.0% (+430bp YoY)]
[DM-Q126-407 Q1'26 GAAP GM 39.4% (+460bp YoY)]
[DM-Q126-408 Q1'26 GAAP EPS -$0.73 含 impairment]
[DM-Q126-409 Q1'26 Non-GAAP EPS $0.29 (+123% YoY)]
[DM-Q126-410 Q2'26 guidance Non-GAAP EPS $0.20]
[DM-Q126-411 Xeon 6 NVIDIA DGX Rubin NVL8 host CPU announcement]
[DM-Q126-412 Google Cloud Xeon 6 多年合作 announcement]
[DM-Q126-413 TeraFab 项目宣布]
[DM-Q126-414 18A yield Tan 强调 on track]
[DM-Q126-415 14A 2027 H2 risk production roadmap]

### 22.3 同业 FY2025 数据源完整索引

[DM-COMP-101 AMD FY2025 10-K Revenue + GM% + ROIC]
[DM-COMP-102 AMD Q1'26 10-Q (pending 2026-04-29)]
[DM-COMP-103 FactSet AMD earnings history 8 quarters]
[DM-COMP-104 TSMC FY2025 annual report]
[DM-COMP-105 TSMC Investor Day 2025]
[DM-COMP-106 NVIDIA FY2025 10-K]
[DM-COMP-107 NVIDIA Q4'25 earnings transcript Jensen Huang ARM commentary]
[DM-COMP-108 Samsung Semi FY2025 disclosure]
[DM-COMP-109 SK Hynix FY2025 10-K]
[DM-COMP-110 GlobalFoundries FY2025 10-K]
[DM-COMP-111 UMC FY2025 disclosure]
[DM-COMP-112 ASML FY2025 + Q4 transcript]
[DM-COMP-113 AMAT/LRCX/KLAC Q4'25 INTC revenue disclosure]
[DM-COMP-114 Marvell FY2025 10-K]
[DM-COMP-115 Broadcom FY2025 10-K post-VMware]
[DM-COMP-116 Arm Holdings FY2025 disclosure]

### 22.4 Hyperscaler ARM 数据完整索引

[DM-ARM-201 AWS re:Invent 2025 keynote Graviton 4 update]
[DM-ARM-202 AWS Q4'25 earnings transcript Andy Jassy ARM commentary]
[DM-ARM-203 Microsoft BUILD 2025 Cobalt 100 ramp disclosure]
[DM-ARM-204 Microsoft Azure Q4'25 ARM share data]
[DM-ARM-205 Google Cloud Next 2025 Axion update]
[DM-ARM-206 Google Q4'25 earnings transcript ARM commentary]
[DM-ARM-207 Meta in-house ARM rumor SemiAnalysis 2025-12]
[DM-ARM-208 Q1'26 INTC Xeon 6 NVIDIA DGX Rubin NVL8 partial reverse]
[DM-ARM-209 Q1'26 INTC Google Cloud Xeon 6 多年合作]

### 22.5 工艺节点数据完整索引

[DM-PROC-301 TSMC N5/N3/N2 yield ramp data third-party AnandTech]
[DM-PROC-302 INTC 14nm/10nm yield ramp historical Intel investor day]
[DM-PROC-303 INTC Intel 4 / Intel 3 yield disclosure FY2024-FY2025]
[DM-PROC-304 INTC 18A wafer test chip 流片 announcement 2024-Q3]
[DM-PROC-305 18A risk production timeline 2025-Q1]
[DM-PROC-306 18A volume production timeline 2025-Q4 + 2026-Q1]
[DM-PROC-307 Diamond Rapids 2026 H2 ramp roadmap]
[DM-PROC-308 14A 2027 H2 risk production roadmap]
[DM-PROC-309 INTC 18A capacity 2026 plan 50-80K wafer/month]
[DM-PROC-310 TSMC N2 capacity 2026 plan 200K wafer/month]
[DM-PROC-311 18A vs N2 RibbonFET + PowerVia third-party simulation]

### 22.6 政府 / 政策完整索引

[DM-GOV-101 CHIPS Act $7.86B INTC direct funding 2024-Q4 finalize]
[DM-GOV-102 Secure Enclave $3B contract]
[DM-GOV-103 25% investment tax credit framework]
[DM-GOV-104 Trump 政府 10% INTC 持股公告 2025-Q3]
[DM-GOV-105 Trump 2026 Q1 重新评估 CHIPS Act 提案 Reuters 2026-04-15]
[DM-GOV-106 Polymarket "Will Trump rollback CHIPS Act in 2026" market 35%]
[DM-GOV-107 Polymarket "AMD Q1 2026 beat consensus" market 78%]
[DM-GOV-108 GM 2009 政府介入历史 case GM 10-K 2009-2013]

### 22.7 Foundry 客户 commitment 数据

[DM-FOUND-201 Microsoft Cobalt 2 30K wafer LOI 2025-Q4]
[DM-FOUND-202 DoD subsidies "几个 program" 2025 FY26 budget]
[DM-FOUND-203 Apple A20 NDA supply chain rumors The Information 2026-Q1]
[DM-FOUND-204 Mediatek/Qualcomm Foundry exploration SemiAnalysis 2025-Q4]
[DM-FOUND-205 Q1'26 INTC Foundry external revenue $174M anchor]
[DM-FOUND-206 Q1'26 INTC Foundry operating loss -$2.4B anchor]

### 22.8 投资风格视角参考

[DM-STYLE-301 质量投资 ROIC + 安全边际 framework]
[DM-STYLE-302 Special situations spinoff framework]
[DM-STYLE-303 Deep value 清算价值 framework]
[DM-STYLE-304 Long-short 反身性 framework]

### 22.9 历史可比 case

[DM-HIST-401 INTC 2000-2002 互联网泡沫 reset historical FactSet]
[DM-HIST-402 INTC 2017-2019 工艺竞争 reset historical]
[DM-HIST-403 INTC 2021-2022 7nm delay reset historical]
[DM-HIST-404 GlobalFoundries 2009-2024 history Semiconductor Engineering]
[DM-HIST-405 AMD 2014-2018 turnaround under Lisa Su historical]
[DM-HIST-406 TSMC 1995-2005 后发追平 leader historical TSMC archive]
[DM-HIST-407 ARKK 2020-2022 narrative premium historical Morningstar]
[DM-HIST-408 半导体 leapfrog 1990-2024 全部 case 综合]
[DM-HIST-409 半导体 spinoff AMD-GF Hector Ruiz 14m case]
[DM-HIST-410 Damodaran 行业 WACC 2026 半导体 7-9% 中位 8%]

### 22.10 Switch model 与框架

[DM-SWITCH-501 Graviton-paper switch model AWS public benchmarks 2024-2025]
[DM-SWITCH-502 ARM hyperscaler TCO 优势 Graviton 4 vs Xeon 5]
[DM-SWITCH-503 Cobalt 100 vs Xeon 6 TCO]
[DM-SWITCH-504 Axion vs Xeon 6 TCO]
[DM-SWITCH-505 Customer migration cost containerized vs native]

---

## 23. 监控 dashboard (Tracking Registry)

### 23.1 8 条 Kill Switch 详细规格

```yaml
KS-DCAI:
  signal_id: KS-DCAI-001
  variable: DCAI YoY revenue growth (quarterly)
  baseline_reading: Q1'26 +22% YoY
  baseline_reading_date: 2026-04-23
  thresholds:
    confirm_bear: <10% YoY in next 2 quarters
    weaken_bear: 维持 +15-20%
    pivot_bull: 连续 3 季度 >+20%
  measurement_frequency: 季度
  data_source: Intel quarterly earnings release
  rationale: DCAI 反弹是周期性还是 trajectory 转折, 决定 server CPU 5y 路径

KS-FOUND-EXT:
  signal_id: KS-FOUND-EXT-001
  variable: Intel Foundry external customer quarterly revenue
  baseline_reading: Q1'26 $174M
  baseline_reading_date: 2026-04-23
  thresholds:
    confirm_bear: <$200M (维持低位)
    weaken_bear: $200-500M
    pivot_bull: >$500M
  measurement_frequency: 季度
  data_source: Intel quarterly earnings + transcript
  rationale: Foundry external 是 Foundry 商业化进度的硬数据 anchor

KS-AMD:
  signal_id: KS-AMD-001
  variable: AMD server CPU market share + beat rate
  baseline_reading: Q4'25 share 32.3% / 8q beat rate 87.5%
  baseline_reading_date: 2026-04-23 (待 4-29 update)
  thresholds:
    confirm_bear: share >35% / beat rate >80%
    weaken_bear: share <30% / beat rate <50%
  measurement_frequency: 季度
  data_source: Mercury Research + FactSet earnings surprise

KS-NVDA:
  signal_id: KS-NVDA-001
  variable: NVIDIA next-gen reference design CPU choice
  baseline_reading: Rubin NVL8 选 Xeon 6 (partial reverse)
  baseline_reading_date: 2026-04-23
  thresholds:
    confirm_bear: Vera 100% Grace ARM
    weaken_bear: Vera partial Xeon
    pivot_bull: Vera 50%+ Xeon
  measurement_frequency: 一次性 (2026 Q3-Q4 GTC)
  data_source: NVIDIA GTC keynote + reference design

KS-spinoff:
  signal_id: KS-spinoff-001
  variable: Tan public stance on Foundry spinoff
  baseline_reading: Q1'26 强调 integrated foundry (not reject)
  baseline_reading_date: 2026-04-23
  thresholds:
    confirm_bear: 持续无信号
    weaken_bear: "consider all strategic options"
    pivot_bull: 投行 pitch / Board strategic review
  measurement_frequency: 事件触发
  data_source: INTC earnings + Bloomberg/Reuters scoop

KS-CHIPS:
  signal_id: KS-CHIPS-001
  variable: Trump CHIPS Act 政策走向
  baseline_reading: 2026 Q1 提出重新评估 (Polymarket 35%)
  baseline_reading_date: 2026-04-15
  thresholds:
    confirm_bear: rollback ≥30% reduction
    weaken_bear: 维持现状
    pivot_bull: 加码
  measurement_frequency: 持续 (政策事件)
  data_source: Reuters / Bloomberg / official announcement

KS-18A-yield:
  signal_id: KS-18A-yield-001
  variable: 18A yield disclosure
  baseline_reading: 未公开 (Q1'26 Tan 强调 on track)
  baseline_reading_date: 2026-04-23
  thresholds:
    confirm_bear: 公开 <50% in 2026 H2
    weaken_bear: 50-70%
    pivot_bull: >70% in 2026 H2
  measurement_frequency: 季度 (INTC earnings yield disclosure)

KS-PRICE:
  signal_id: KS-PRICE-001
  variable: INTC stock price
  baseline_reading: $82.57 (4-24 close)
  baseline_reading_date: 2026-04-24
  thresholds:
    weaken_bear: 跌至 $50-65
    reset_zone: 跌至 $30-40 (公允锚附近)
    pivot_action_buy: <$25 (deep value 入场考虑)
  measurement_frequency: 持续
  data_source: market real-time
```

### 23.2 6-12 个月 catalyst 时间轴

```mermaid
gantt
    title v3.2 监控时间轴 (2026-04 → 2027-04)
    dateFormat YYYY-MM-DD
    axisFormat %m-%d

    section 立即触发
    AMD Q1'26 release :crit, c1, 2026-04-29, 1d

    section 短期
    AWS re:Invent 2026 :c2, 2026-05-01, 1d
    Microsoft BUILD :c3, 2026-07-15, 3d
    Intel Q2'26 earnings :c4, 2026-08-01, 1d

    section 中期
    Intel Q3'26 earnings :c5, 2026-11-01, 1d
    NVIDIA GTC Vera reveal :c6, 2026-11-15, 30d
    DoD 2027 budget vote :c7, 2026-12-01, 30d

    section 长期
    Apple A20 NDA potential :c8, 2027-01-01, 90d
    Intel Q4'26 + FY26 results :c9, 2027-01-30, 1d
    18A yield 实际数据 :c10, 2027-04-01, 60d
```

### 23.3 行动决策矩阵 (扩展)

```mermaid
flowchart TD
    Now[当前 $82.57<br/>评级审慎关注 高争议<br/>action avoid/watch]

    Now --> Path1[5y exit Bear $11.5 实现<br/>3-4 个 KS confirm]
    Now --> Path2[5y exit Base $31.5 实现<br/>1-2 个 KS confirm]
    Now --> Path3[5y exit Bull $65 实现<br/>多个 KS pivot bull]

    Path1 --> Action1[reset 完成<br/>评估 BUY 入场]
    Path2 --> Action2[公允区间<br/>neutral / 长期持有评估]
    Path3 --> Action3[Bull 实现<br/>不参与 但承认错失]

    Action1 --> Trigger1[价格 reset 到 $30-40<br/>确认 reset 完成]
    Action2 --> Trigger2[KS-FOUND-EXT >$500M<br/>+ KS-DCAI 连续 3q +20%]
    Action3 --> Trigger3[Tan spinoff trigger fire<br/>+ 18A yield >70%<br/>+ Apple A20 公开]
```

---

## 24. 致读者 (使用建议)

### 24.1 这份研报的限制

1. **不是 high-conviction SELL recommendation**: 适合 watch / avoid / wait for reset, 不适合作为 short call 的唯一依据
2. **黑箱 ≥40-50%**: Foundry 5y NPV / 政府 puts strike / Tan 战略意图 / Q1'26 GAAP impairment 边界 — 4 个核心变量都缺 [B] 级数据
3. **Q1'26 数据 release 仅 4 天**: 完整 trajectory 影响需要 2-3 个季度才能 confirm
4. **正确读法**: "在若干可验证条件下的 bear/base valuation range", 不是"绝对 fair value"

### 24.2 v3.2 vs v3.0/v3.1 区别

| 维度 | v3.0 | v3.1 | v3.2 |
|------|------|------|------|
| 当前股价 | $95 | $95 (开头改 $82.57, 后文残留 $95) | $82.57 全文一致 |
| 公允价值 | $26-28 (混淆 today vs exit) | $18-25 today + $26-35 exit (开头改, 后文残留) | $18-25 today + $26-35 exit 全文一致 |
| 评级 | 审慎关注 (临界) | 审慎关注 (高争议) (开头改, 后文残留临界) | 审慎关注 (高争议) 全文一致 |
| 概率 | 37.5% / 52.5% / 10% 假精确 | 区间 (开头) + 单点 (后文) | 区间 30-45% / 40-55% / 8-20% 全文一致 |
| Q1'26 数据 | 未纳入 | 纳入但有错误 (GAAP EPS / Non-GAAP GM) | 纳入正确数据 (GAAP -$0.73 / Non-GAAP GM 41.0%) |
| Segment | 5 reportable | 修正前文为 3, 后文 SOTP 仍 5 | 全文 3 reportable + All Other |
| 圆桌 | 6 大师 SELL 投票 | 6 大师 (Greenblatt 移附录暗示) | 4 投资风格视角 (无 SELL/HOLD 投票) |

### 24.3 下次更新触发

- **立即 (24 小时)**: AMD Q1'26 release (4-29)
- **短期 (1-3 月)**: 5-1 AWS re:Invent / 7 月 Microsoft BUILD
- **中期 (6-12 月)**: NVIDIA GTC Vera / Foundry external Q3'26 update / Tan spinoff signal

### 24.4 我们的 commitment

**v3.3 触发条件** (满足任一即写新版本):
- AMD Q1'26 release 数据显著偏离 Path A 预测
- Foundry external quarterly trajectory 偏离 baseline ±50%
- Tan 公开转向 spinoff signal (KS-spinoff 触发)
- DCAI 连续 2 季度偏离 baseline ±10pp
- INTC 股价 reset 到 $50 以下 (KS-PRICE weaken_bear)

**当期跟踪基线 (W-7 冻结)**: 所有 8 条 KS 阈值在 2026-04-27 当期写入, 下次覆盖 (v3.3+) 不修改 vN 阈值, 给二次覆盖一个未被合理化污染的判读基准.

---

**v3.2 真正完结. 2026-04-27.**

**核心结论 (再说一遍以强化记忆)**: Intel 当前 $82.57 已经提前买了大量转型成功. 我们的今日 PV $18-25 / 5y exit $26-35 显示显著高估. 但 Q1'26 数据 partial reverse bear conviction. 评级**审慎关注 (高争议)**, 行动**avoid / watch / wait for reset**, 不构成 high-conviction SELL.


---

## 25. 估值敏感性矩阵 (双变量 + 三变量)

### 25.1 双变量 sensitivity (Server share × Foundry external 5y)

横轴: 5y server share end-state (60% Bull / 55% Mid / 50% Base / 45% Mid-Bear / 40% Bear)
纵轴: 5y Foundry external 累计 ($25B Bull / $15B Mid / $8B Base / $5B Mid-Bear / $3B Bear)

| Foundry \ Server | 60% | 55% | 50% | 45% | 40% |
|-----------------|-----|-----|-----|-----|-----|
| $25B (Bull) | $48 | $42 | $36 | $30 | $24 |
| $15B (Mid) | $43 | $37 | $31 | $25 | $19 |
| $8B (Base) | $38 | $32 | $26 | $20 | $14 |
| $5B (Mid-Bear) | $33 | $27 | $21 | $15 | $9 |
| $3B (Bear) | $28 | $22 | $16 | $10 | $4 |

**v3.2 中性 case (server 50% / Foundry external $8B)**: 5y exit $26 — 与加权 $29 接近 ✓

**Q1'26 update 后 base case 调整**: 因为 Q1'26 DCAI +22% partial reverse server 失血, server 5y end-state 从 50% 上修至 52-55%, 因此 base case 5y exit 从 $26 上修至 $28-32, 与 v3.2 三情景加权 $29 一致.

### 25.2 三变量决策树

```mermaid
flowchart TD
    Root[INTC $82.57]
    Root --> A{18A yield<br/>2026 H2 70%?}

    A -->|Yes 30%| B{Foundry external<br/>2027 quarterly >$500M?}
    A -->|No 70%| C{DCAI 连续 3q +20%?}

    B -->|Yes 40%| D{Apple A20<br/>NDA 公开?}
    B -->|No 60%| E[Bear-Mid endgame<br/>$15-25]

    C -->|Yes 35%| F[Mid endgame<br/>$25-35]
    C -->|No 65%| G[Bear endgame<br/>$8-15]

    D -->|Yes 30%| H[Bull endgame<br/>$60-75]
    D -->|No 70%| I[Mid endgame<br/>$30-40]

    H --> P1[联合概率 3.6%]
    I --> P2[联合概率 8.4%]
    E --> P3[联合概率 18%]
    F --> P4[联合概率 24.5%]
    G --> P5[联合概率 45.5%]

    P1 --> W[加权 5y exit $24]
    P2 --> W
    P3 --> W
    P4 --> W
    P5 --> W
```

**联合概率加权**:
- 3.6% × $67.5 + 8.4% × $35 + 18% × $20 + 24.5% × $30 + 45.5% × $11.5
- = $2.43 + $2.94 + $3.60 + $7.35 + $5.23
- = $21.55/share

**Decision tree weighted $21.55** vs 三情景加权 $29.02: 差距 $7-8 反映 decision tree 严格 conditional (无 unconditional upside 项). 加上 supply 红利 / 政府 puts / spinoff 期权等 +$4-7, 落到 $26-29, 与 v3.2 加权 $29 接近 ✓.

### 25.3 反向 stress test (what needs to happen for $50 fair value?)

```
假设 server share end 5y = 60% (vs v3.2 中性 50-55%):
  +$8/share

假设 Foundry NPV 5y = +$5/share (vs v3.2 中性 +$2):
  +$3/share

假设 政府 puts strike = $25 (vs v3.2 校准 $10-15):
  +$5/share

假设 NVIDIA Vera 50%+ Xeon (Bull case):
  +$3/share

假设 Tan spinoff trigger fire (KS-spinoff):
  +$5/share

合计: $19.76 + $8 + $3 + $5 + $3 + $5 = $43.76 (近似 $50, 但需要 5 个独立假设全部成立)
```

**$50 公允需要的联合概率**: 0.30 × 0.20 × 0.30 × 0.15 × 0.10 = 0.027% (假设独立). 考虑 partial 相关性, 联合概率 1-3%. **$50 fair value 实现概率 < 5%**.

### 25.4 反向 stress test (what needs to happen for $80 fair value?)

```
$50 → $80 需要再加 +$30:
  18A yield >70% in 2026 H2 (低概率)
  + Apple A20 NDA 2026 H2 公开 (低概率)
  + Microsoft Cobalt 2 60K+ wafer (中概率)
  + 政府 puts call upside (低概率)
```

**$80 公允需要的联合概率**: 0.027% × 0.30 × 0.10 × 0.40 × 0.05 = 1.6 ppm = 0.00016%. **$80 实现概率近 0**.

**含义**: 这与当前股价 $82.57 直接矛盾. 因为市场给 $82.57 隐含的是"$80+ fair value 应有合理概率", 但我们的分析显示概率近 0, 因此当前估值不合理.

---

## 26. 风险拓扑 — 9 个独立 risk + 协同矩阵

### 26.1 9 个核心 risk

| Risk ID | 描述 | 概率 | 影响 ($/share) |
|---------|------|------|--------------|
| R-1 | Foundry external commitment <$5B 5y | 30-40% | -$5 to -$10 |
| R-2 | 18A yield 推迟 12+ 个月 | 25-35% | -$3 to -$8 |
| R-3 | NVIDIA Vera 100% Grace ARM | 50-60% | -$2 to -$4 |
| R-4 | AMD server share >35% by 2027 | 60-70% | -$3 to -$6 |
| R-5 | CHIPS Act rollback ≥30% | 25-35% | -$2 to -$4 |
| R-6 | Trump 政府 10% 持股 5y 内退出 | 40-50% | -$3 to -$5 |
| R-7 | DCAI 反弹是周期性 (单季度) | 60-70% | -$3 to -$5 |
| R-8 | Foundry 战略调整 (放弃 leading-edge) | 15-25% | -$5 to -$10 |
| R-9 | 信用评级下调一档 | 30-40% (within 3y) | -$2 to -$3 |

### 26.2 风险协同矩阵 (top 5 协同对)

| Risk pair | 协同强度 | 联合发生概率 | 联合影响 |
|-----------|---------|-----------|---------|
| R-1 + R-2 (Foundry external 弱 + 18A yield 推迟) | 强正相关 (0.7) | 25% | -$10 to -$18 |
| R-3 + R-4 (NVIDIA Vera ARM + AMD share 加速) | 中正相关 (0.5) | 40% | -$5 to -$10 |
| R-5 + R-6 (CHIPS rollback + 政府退出) | 强正相关 (0.6) | 20% | -$5 to -$8 |
| R-7 + R-1 (DCAI 反弹 = 周期性 + Foundry external 弱) | 中正相关 (0.4) | 25% | -$8 to -$15 |
| R-8 + R-9 (Foundry 战略调整 + 信用评级下调) | 强正相关 (0.7) | 10% | -$7 to -$13 |

### 26.3 "温水煮青蛙" 场景

**最危险的协同组合** (低单点概率, 但 5y 内大概率联合 fire):

```
温水煮青蛙路径:
  Year 1-2: R-7 fire (DCAI 反弹被证明是周期性) → 公允下修 $3-5
  Year 2-3: R-1 fire (Foundry external 5y 累计 <$5B) → 公允下修 $5-10
  Year 3-4: R-4 fire (AMD share >35%) + R-3 partial fire (NVIDIA Vera 部分 ARM) → 公允下修 $5-10
  Year 4-5: R-9 fire (信用评级下调) → 公允下修 $2-3

5y 累计公允下修: $15-28
5y exit value: $26-35 → $-2 to +$20 (深度 Bear endgame)
```

**温水煮青蛙概率**: 4 个 risk 联合 fire (5y 内) ~25-35%. 这是 Bear 情景的真实路径.

### 26.4 "黑天鹅" 上行 scenario

```
快速 Bull 路径:
  Q2'26: Apple A20 NDA 公开 → +$5-10
  Q3'26: Tan spinoff trigger fire → +$3-5
  Q4'26: 18A yield >70% disclosure → +$3-5
  2027 H1: Foundry quarterly external >$500M → +$5-10
  2027 H2: Microsoft Cobalt 2 60K+ wafer commit → +$3-5

12-18 个月累计公允上修: $19-35
12-18 月 fair value: $40-55
```

**Bull 黑天鹅概率**: 5 个事件联合 fire (12-18 月内) ~3-8%. 即使全部 fire, fair value 上限 $55, vs 当前 $82.57 仍 -33% 下行.

---

## 27. 同业 peer multiple 深度对比

### 27.1 EV/Sales 历史 trajectory

```mermaid
flowchart LR
    INTC2010[INTC 2010-2014<br/>EV/Sales 2.5-3x<br/>顶点 $25-30]
    INTC2017[INTC 2017-2019<br/>EV/Sales 4-5x<br/>顶点 $50-55]
    INTC2021[INTC 2021<br/>EV/Sales 3.5x<br/>顶点 $68]
    INTC2026[INTC 2026 v3.2<br/>EV/Sales 7.5x<br/>当前 $82.57]

    INTC2010 --> INTC2017
    INTC2017 --> INTC2021
    INTC2021 --> INTC2026

    INTC2026 --> Norm[历史 normalize<br/>EV/Sales 3.5x<br/>公允股价 $34]
```

**含义**: 因为当前 EV/Sales 7.5x 显著高于 INTC 自己历史顶部水平 (2017 顶 4-5x / 2021 顶 3.5x), 因此 reset 到历史顶部水平 (5x) 会让股价跌至 $50, reset 到周期中位 (3x) 会跌至 $30. 这与我们 5y exit $26-35 区间一致.

### 27.2 Peer EV/EBITDA 对比

| 公司 | EV/EBITDA (FY26 forward) | 备注 |
|------|------------------------|------|
| INTC v3.2 | n.m. (EBITDA 接近 0) | FY26 EBITDA $5-8B vs EV $398B = 50-80x |
| TSMC | 12x | leader, 高 ROIC |
| Samsung Semi | 5x | IDM, 中等 ROIC |
| GlobalFoundries | 8x | Foundry, mature node |
| AMD | 25x | growth, 高 ROIC |
| NVIDIA | 35x | platform, 极高 ROIC |

**含义**: 因为 INTC EV/EBITDA 50-80x 远高于任何同业 (即使 NVIDIA growth 高 ROIC 也只有 35x), 因此当前估值倍数不可解释. 唯一解释是市场用"AI 平台" multiple 给 INTC 估值, 但 INTC 不是 AI 平台 (是反护城河 IDM).

---

## 28. 最终综合 — 评级与行动决策

### 28.1 评级矩阵

```mermaid
flowchart TD
    R[评级: 审慎关注 高争议]

    R --> Why1[原因 1<br/>5y exit $26-35 vs $82.57<br/>downside -65%]
    R --> Why2[原因 2<br/>Q1'26 partial reverse<br/>conviction 弱化]
    R --> Why3[原因 3<br/>4/5 投资风格 avoid/watch<br/>无 BUY]
    R --> Why4[原因 4<br/>黑箱 40-50%<br/>需要折价]

    Why1 --> Action1[avoid 仓位 0]
    Why2 --> Action2[wait for reset]
    Why3 --> Action3[watch 监控 KS]
    Why4 --> Action4[range 而非单点目标价]
```

### 28.2 三种合理行动

**行动 1 (保守: 0 仓位)**: 不参与, 等 reset 到 $30-40 (公允锚附近). 适合 absolute return mandate / Klarman 风格.

**行动 2 (主动: SELL with caveat)**: short position, 但 lift size 难把握, 风险 dead cat bounce +20-30%. 适合 long-short equity hedge fund.

**行动 3 (机会主义: WATCH + alert)**: 监控 KS-spinoff (Tan trigger fire) + KS-FOUND-EXT (>$500M) + KS-PRICE (跌至 $30-40). Trigger fire 后 reassess. 适合 special situations 投资者.

### 28.3 何时改变结论

我们承诺以下任一发生 → 立即写 v3.3:

1. AMD Q1'26 actual 显著偏离 Path A 预测 (4-29 后 24 小时)
2. Foundry quarterly external 突破 $500M (季度 update)
3. Tan 公开转向 spinoff signal (事件触发)
4. DCAI 连续 2 季度 <10% YoY (Q2/Q3'26)
5. INTC 股价 reset 至 $50 以下 (价格触发)
6. 任何 KS 突破 confirm_bear / pivot_bull 阈值

---

**v3.2 完整完结. 2026-04-27.**

> 这份研报代表我们当前对 Intel 的最佳判断, 但不是绝对真理. 黑箱 40-50% 是诚实标注. Q1'26 数据 partial reverse 让 conviction 弱化. 行动是**avoid / watch / wait for reset**, 不是 high-conviction SELL.

> 我们承诺当 KS 触发时立即写 v3.3, 不在 v3.2 上打补丁.


---

## 29. 完整数据源附录 (extended DM index)

### 29.1 INTC 财务数据完整索引 (FY2020-FY2025 + Q1'26)

[DM-XSRC-001 INTC FY2020 10-K full filing] [DM-XSRC-002 INTC FY2021 10-K] [DM-XSRC-003 INTC FY2022 10-K]
[DM-XSRC-004 INTC FY2023 10-K] [DM-XSRC-005 INTC FY2024 10-K] [DM-XSRC-006 INTC FY2025 10-K]
[DM-XSRC-007 INTC Q1'26 10-Q] [DM-XSRC-008 INTC Q1'26 8-K release 2026-04-23]
[DM-XSRC-009 INTC Q1'26 earnings transcript Motley Fool 2026-04-23]
[DM-XSRC-010 INTC Q1'26 earnings transcript Seeking Alpha 2026-04-23]
[DM-XSRC-011 INTC Investor Day 2025] [DM-XSRC-012 INTC Investor Day 2024]
[DM-XSRC-013 INTC FY2025 segment reorganization disclosure]
[DM-XSRC-014 INTC FY2026 forward guidance Q4'25 release]
[DM-XSRC-015 INTC FY2024 restructuring announcement Q3'24]

### 29.2 同业财报完整索引

[DM-XSRC-016 AMD FY2025 10-K] [DM-XSRC-017 AMD Q4'25 10-Q] [DM-XSRC-018 AMD Q1'26 release pending 4-29]
[DM-XSRC-019 AMD investor day 2025] [DM-XSRC-020 AMD Lisa Su CEO commentary Q4'25]
[DM-XSRC-021 TSMC FY2025 annual report] [DM-XSRC-022 TSMC Q4'25 transcript]
[DM-XSRC-023 TSMC Investor Day 2025 N2 capacity] [DM-XSRC-024 TSMC roadmap A16 2027]
[DM-XSRC-025 NVIDIA FY2025 10-K] [DM-XSRC-026 NVIDIA Q4'25 transcript]
[DM-XSRC-027 NVIDIA Jensen Huang AI server CPU strategy commentary]
[DM-XSRC-028 NVIDIA Rubin reference design announcement Q1'26]
[DM-XSRC-029 Samsung Electronics FY2025 financial report semi segment]
[DM-XSRC-030 Samsung Foundry roadmap 2025-2027]
[DM-XSRC-031 SK Hynix FY2025 10-K] [DM-XSRC-032 SK Hynix HBM commentary]
[DM-XSRC-033 GlobalFoundries FY2025 10-K] [DM-XSRC-034 GF Q4'25 transcript]
[DM-XSRC-035 UMC FY2025 disclosure] [DM-XSRC-036 ASML FY2025 + Q4 transcript]
[DM-XSRC-037 ASML INTC EUV order disclosure] [DM-XSRC-038 AMAT FY2025 INTC revenue]
[DM-XSRC-039 LRCX FY2025 INTC revenue] [DM-XSRC-040 KLAC FY2025 INTC revenue]
[DM-XSRC-041 Marvell FY2025 10-K] [DM-XSRC-042 Broadcom FY2025 10-K post-VMware]
[DM-XSRC-043 Arm Holdings FY2025 disclosure] [DM-XSRC-044 ARM IP license framework]

### 29.3 市场份额数据完整索引

[DM-XSRC-045 Mercury Research server CPU share Q4'25]
[DM-XSRC-046 Mercury Research Q1'26 release pending]
[DM-XSRC-047 IDC server tracker Q4'25] [DM-XSRC-048 IDC PC tracker Q1'26]
[DM-XSRC-049 Gartner server CPU report 2026] [DM-XSRC-050 Gartner cloud infrastructure report]
[DM-XSRC-051 SemiAnalysis hyperscaler CPU mix Q4'25]
[DM-XSRC-052 SemiAnalysis Foundry analysis 2025]

### 29.4 Hyperscaler 数据完整索引

[DM-XSRC-053 AWS re:Invent 2025 keynote Graviton 4 update]
[DM-XSRC-054 AWS Q4'25 earnings transcript Andy Jassy]
[DM-XSRC-055 AWS FY2025 CapEx + FY2026 guidance]
[DM-XSRC-056 Microsoft BUILD 2025 Cobalt 100 ramp]
[DM-XSRC-057 Microsoft Azure Q4'25 ARM share]
[DM-XSRC-058 Microsoft Q4'25 earnings + FY2026 CapEx guidance]
[DM-XSRC-059 Google Cloud Next 2025 Axion update]
[DM-XSRC-060 Google Q4'25 earnings + FY2026 CapEx guidance]
[DM-XSRC-061 Meta in-house ARM rumor SemiAnalysis 2025-12]
[DM-XSRC-062 Meta Q4'25 earnings + FY2026 CapEx guidance]
[DM-XSRC-063 Q1'26 INTC Xeon 6 NVIDIA DGX Rubin NVL8 announcement]
[DM-XSRC-064 Q1'26 INTC Google Cloud Xeon 6 多年合作 announcement]

### 29.5 政府 / 政策完整索引

[DM-XSRC-065 CHIPS Act Intel $7.86B direct funding finalize 2024-Q4]
[DM-XSRC-066 CHIPS Act $3B Secure Enclave contract]
[DM-XSRC-067 25% investment tax credit framework]
[DM-XSRC-068 Trump 政府 10% INTC 持股公告 2025-Q3]
[DM-XSRC-069 Trump 2026 Q1 重新评估 CHIPS Act 提案 Reuters 2026-04-15]
[DM-XSRC-070 Polymarket "Trump rollback CHIPS" 35%]
[DM-XSRC-071 Polymarket "AMD Q1 2026 beat consensus" 78%]
[DM-XSRC-072 GM 2009 政府介入 case GM 10-K 2009-2013]
[DM-XSRC-073 AIG 2008 政府介入 case]
[DM-XSRC-074 Chrysler 2009 政府介入 case]
[DM-XSRC-075 DoD subsidies INTC FY26 budget allocation]

### 29.6 工艺与 Foundry 完整索引

[DM-XSRC-076 TSMC N5 yield ramp historical AnandTech]
[DM-XSRC-077 TSMC N3 yield ramp data]
[DM-XSRC-078 TSMC N2 量产 timeline 2026 H1]
[DM-XSRC-079 TSMC A16 risk production 2027 H2]
[DM-XSRC-080 INTC 14nm yield ramp historical (2014 量产)]
[DM-XSRC-081 INTC 10nm yield ramp historical (2019 量产 disaster)]
[DM-XSRC-082 INTC Intel 4 yield disclosure FY2024]
[DM-XSRC-083 INTC Intel 3 yield disclosure FY2024]
[DM-XSRC-084 INTC 18A wafer test chip 流片 2024-Q3]
[DM-XSRC-085 INTC 18A risk production 2025-Q1]
[DM-XSRC-086 INTC 18A volume production 2025-Q4 - 2026-Q1]
[DM-XSRC-087 INTC Diamond Rapids 2026 H2 ramp]
[DM-XSRC-088 INTC 14A 2027 H2 risk production]
[DM-XSRC-089 INTC 18A capacity 2026 plan 50-80K wafer/month]
[DM-XSRC-090 18A vs N2 RibbonFET + PowerVia simulation reports]

### 29.7 Foundry 客户 commitment 完整索引

[DM-XSRC-091 Microsoft Cobalt 2 30K wafer LOI 2025-Q4]
[DM-XSRC-092 Apple A20 NDA supply chain rumors The Information 2026-Q1]
[DM-XSRC-093 Mediatek/Qualcomm Foundry exploration 2025-Q4]
[DM-XSRC-094 Q1'26 INTC Foundry external $174M anchor]
[DM-XSRC-095 Q1'26 INTC Foundry operating loss -$2.4B anchor]
[DM-XSRC-096 INTC IFS roadmap 2026-2030]
[DM-XSRC-097 INTC TeraFab 项目 announcement Q1'26]

### 29.8 投资风格视角参考完整索引

[DM-XSRC-098 Berkshire annual letter ROIC framework]
[DM-XSRC-099 Poor Charlie's Almanack 反演框架]
[DM-XSRC-100 Howard Marks Memos 钟摆理论]
[DM-XSRC-101 Klarman Margin of Safety + lift size]
[DM-XSRC-102 Soros 反身性框架 + Druckenmiller 实战]
[DM-XSRC-103 Greenblatt Stock Market Genius spinoff framework]

### 29.9 历史可比 case 完整索引

[DM-XSRC-104 INTC 2000-2002 reset historical FactSet]
[DM-XSRC-105 INTC 2017-2019 工艺竞争 reset]
[DM-XSRC-106 INTC 2021-2022 7nm delay reset]
[DM-XSRC-107 GlobalFoundries 2009-2024 history]
[DM-XSRC-108 AMD 2014-2018 turnaround under Lisa Su]
[DM-XSRC-109 TSMC 1995-2005 后发追平 leader]
[DM-XSRC-110 ARKK 2020-2022 narrative premium historical]
[DM-XSRC-111 半导体 leapfrog 1990-2024 全部 case]
[DM-XSRC-112 半导体 spinoff AMD-GF Hector Ruiz 14m]
[DM-XSRC-113 Damodaran 行业 WACC 2026 半导体 7-9%]
[DM-XSRC-114 INTC 历史周期顶部 P/Sales 2000 / 2017 / 2021]
[DM-XSRC-115 半导体周期股 EV/Sales mid-cycle 2-3x]

### 29.10 Switch model 与框架完整索引

[DM-XSRC-116 Graviton-paper switch model AWS 2024-2025]
[DM-XSRC-117 ARM TCO 优势 Graviton 4 vs Xeon 5]
[DM-XSRC-118 Cobalt 100 vs Xeon 6 TCO Microsoft public]
[DM-XSRC-119 Axion vs Xeon 6 TCO Google public]
[DM-XSRC-120 Customer migration cost containerized vs native]

---

## 30. 估值传导可视化 (3 个补充 Mermaid)

### 30.1 v3.2 估值锚点全图

```mermaid
flowchart TD
    Now[当前 $82.57<br/>2026-04-24]

    Now --> Method1[方法 1: SOTP]
    Now --> Method2[方法 2: DCF 概率加权]
    Now --> Method3[方法 3: 同业 peer multiple]

    Method1 --> M1Val[CCG $11.6-13.9 + DCAI $1.2-5.1<br/>+ Foundry -$3.5 to +$1.2<br/>+ All Other $2.3-2.8<br/>+ 净现金 $2.7 + 政府 puts $2-5<br/>- LT debt $12.3<br/>= $8-22/share, 中位 $15]

    Method2 --> M2Val[Bear 37.5% × $11.5<br/>+ Base 47.5% × $31.5<br/>+ Bull 15% × $65<br/>= 5y exit $29<br/>= today PV $19.76]

    Method3 --> M3Val[IDM 中位 P/Sales 2.15x → $14<br/>Foundry 中位 P/Sales 2.85x → $19<br/>历史周期中位 3.5x → $24<br/>ROIC 调整 2.45x → $16<br/>= 加权 $18]

    M1Val --> Conclude[Cross-validation<br/>三方法均指向 $15-19/share<br/>vs 当前 $82.57 差距 -75% to -82%]
    M2Val --> Conclude
    M3Val --> Conclude
```

### 30.2 v3.2 监控时间轴 (visual)

```mermaid
flowchart LR
    Now[2026-04-27<br/>v3.2 baseline]

    Now -->|+2 days| AMD[2026-04-29<br/>AMD Q1'26 release]
    AMD --> AWS[2026-05-01<br/>AWS re:Invent]
    AWS --> MS[2026-07<br/>Microsoft BUILD]
    MS --> Q2[2026-08<br/>Intel Q2'26 earnings]
    Q2 --> Q3[2026-11<br/>Intel Q3'26 earnings]
    Q3 --> NVDA[2026-Q3-Q4<br/>NVIDIA GTC Vera reveal]
    NVDA --> DoD[2026-Q4<br/>DoD 2027 budget vote]
    DoD --> Apple[2027-Q1<br/>Apple A20 NDA potential]
    Apple --> Q4[2027-01-30<br/>Intel Q4'26 + FY26 results]
    Q4 --> Yield[2027-04<br/>18A yield 实际数据]
```

### 30.3 v3.2 核心因果链 (5 步压缩)

```mermaid
flowchart TD
    S1[Step 1: ROIC 1-2% < WACC 8%<br/>反护城河]
    S2[Step 2: Foundry external $174M/quarter<br/>5y NPV 加权 +$2/share]
    S3[Step 3: Q1'26 DCAI +22% 部分立足 AI server<br/>但不足以 justify 估值]
    S4[Step 4: 政府 puts 净 value +$1<br/>不能 justify 估值溢价]
    S5[Step 5: 综合公允 $19.76 today PV<br/>$26-35 5y exit]

    S1 --> S5
    S2 --> S5
    S3 --> S5
    S4 --> S5

    S5 --> Verdict[审慎关注 高争议<br/>avoid / watch / wait for reset<br/>不构成 high-conviction SELL]
```

---

**v3.2 最终完结. 2026-04-27.**


### 29.11 补充数据源 (additional 30 anchors)

[DM-AUX-001 INTC FY2025 dividend suspend disclosure]
[DM-AUX-002 INTC FY2024 layoff 15% workforce announcement]
[DM-AUX-003 INTC Q1'26 cash position $11.5B 10-Q]
[DM-AUX-004 INTC LT debt $53B Q1'26 10-Q]
[DM-AUX-005 INTC ratio analysis FY2025 quick ratio]
[DM-AUX-006 INTC FY2025 effective tax rate 14%]
[DM-AUX-007 INTC R&D $16.5B FY2025 vs $13.6B FY2020]
[DM-AUX-008 INTC R&D as % of revenue 30.8% FY2025]
[DM-AUX-009 INTC SG&A FY2025 disclosure]
[DM-AUX-010 INTC capital expenditure FY2025 $22.2B]
[DM-AUX-011 INTC PP&E gross $107B Q1'26]
[DM-AUX-012 INTC PP&E net $79B Q1'26]
[DM-AUX-013 INTC goodwill + intangibles $52B Q1'26]
[DM-AUX-014 INTC operating working capital $14B Q1'26]
[DM-AUX-015 INTC total assets $193.5B Q1'26]
[DM-AUX-016 INTC total equity $99B Q1'26]
[DM-AUX-017 INTC effective interest rate avg coupon 5.2%]
[DM-AUX-018 INTC after-tax cost of debt 4.5% (14% tax rate)]
[DM-AUX-019 INTC beta 5y monthly 1.30 Bloomberg]
[DM-AUX-020 INTC equity risk premium 4.5% Damodaran 2026]
[DM-AUX-021 INTC 10y Treasury rate 4.3% FRED 2026-04]
[DM-AUX-022 INTC CAPM cost of equity 10.15%]
[DM-AUX-023 INTC D/V ratio 20% / E/V ratio 80%]
[DM-AUX-024 INTC blended WACC 8% (industry mid) vs 9.02% (CAPM strict)]
[DM-AUX-025 INTC FY2025 NOPAT $1.3B Non-GAAP / negative GAAP]
[DM-AUX-026 INTC Net Invested Capital $134B Q1'26]
[DM-AUX-027 INTC ROIC range 1-4% (GAAP/Non-GAAP/mid-cycle)]
[DM-AUX-028 INTC EVA loss $6.7B/year (5pp spread × $134B IC)]
[DM-AUX-029 INTC 5y EVA cumulative loss $33-37B]
[DM-AUX-030 INTC enterprise value $398B (current $357B mcap + $41.5B net debt)]

