# ⚠️ v4.4 已下架 — 请阅读 v4.5

> ## 下架通知 (2026-04-24)
>
> **本版本 v4.4 因 FY26E Adj EPS bridge 双重扣税错误 + 多项微修已下架**. 请阅读 **[MSCI_v4.5_Complete.md](./MSCI_v4.5_Complete.md)** (发布候选版) 作为最新版本.
>
> **v4.4 问题** (v4.5 已全部修正):
>
> **必修**:
> 1. **FY26E Adj EPS bridge 数学错误** — v4.4 从 Adjusted EPS $4.55 再扣 $88M tax benefit = 双重计数 (Adjusted EPS 已 normalize). v4.5 从 Adj EPS 起步, 不再扣.
> 2. **Buy/Sell/Wait 表缺 $605-620 行** — v4.5 新增 "不追高 / 维持偏谨慎" 动作.
> 3. **Source Room 缺 audit status** — v4.5 加 Public / Paywalled / Restricted / Model-derived 四级.
> 4. **PCS / 非 PCS 敏感性缺公式** — v4.5 加显式公式 + 两组 PCS organic 假设 (15% vs 20%) + 诚实表达反推敏感度区间 +1% 到 -10%.
> 5. **同业对标缺口径标记** — v4.5 每行加 fact / consensus / internal estimate 标记.
>
> **建议修**:
> 6. PE 折价来源无区间 — v4.5 加**轻度 / Base / 重度**三档.
> 7. "BR 明确承诺不自建 Preqin indexing" 触发过高权重 — v4.5 改为 "BR 公开减少 Preqin indexing 扩张" 观察性证据并下调权重.
> 8. "Fed 降息 3 次" 过度依赖宏观预测 — v4.5 改为 "10Y Treasury <4.0% 或 real yield 显著下行".
> 9. 圆桌异议稍冗 — v4.5 压缩 20%, 保留观点精简人物口吻.
> 10. 标题 "发布版" 偏早 — v4.5 改为 "发布候选版 (v4.5 candidate)", 等 Q2 earnings 后确认 final.
>
> **评级语言对齐** (全报告统一使用框架标准术语, 不新造词):
> - 深度关注 / **关注** / 低估观察 / **中性关注** / **审慎关注**
> - Buy/Sell/Wait 表的"动作"语言 (加仓 / 维持 / 不追高 / 减仓 / 深度 review) 与"评级"语言分开
> - v4.4 中"升级关注" / "降级审慎关注" 已对齐为标准"中性关注 → 关注" / "中性关注 → 审慎关注"
>
> **v4.5 结论与 v4.4 一致**, 表达更精确, 评级语言对齐标准. 所有投资判断以 v4.5 为准.

---

# MSCI Q1 2026 Review: Index 利润杠杆、PCS 分层与资本配置再平衡 (已下架)

> **三层价值引擎下的重估: Base $575-605, 等待 Q2 验证** — **已下架, 见 v4.5**
>
> **Market data snapshot as of 2026-04-23 close; Consensus snapshot as of 2026-04-24**
> 发布日: 2026-04-24 | 版本: v4.4 | 基线: v3.0 (2026-03-18)

---

## 0. 一页投资结论

**Rating**: 中性关注 (维持).

**Price vs Fair Value** (FY26E Adj EPS × forward PE, 73.4M diluted shares):

| 情景 | FY26E Adj EPS | Forward PE | 公允区间 |
|------|---------------|-----------|---------|
| Stress | $17.0 | 28-29x | $475-495 |
| Mild Bear | $18.0 | 30-31.5x | $540-567 |
| **Base** | **$18.5** | **31-32.7x** | **$575-605** |
| Bull | $19.2-19.5 | 32.5-33.5x | $620-650 |

**Base case return** (相对股价 $598.01): **-4% 到 +1%**.
**Probability-weighted expected value** (Stress 15% / Mild Bear 25% / Base 45% / Bull 15%): **$572, 约 -4.3%**.
**结论**: 评级维持中性关注, 但风险调整后略偏负. 股价接近 Base 上沿, 无安全边际.

**Q1 changed what**:
1. **经营杠杆 vs 绝对 margin 分歧**. Consolidated incremental Adj EBITDA margin ~75%; 绝对 margin 59.3% (+220bp YoY) 仍在街共识 58-60%. Q1 强信号, 稳态未上移.
2. **PA 内部分层**. PCS run-rate +16% / new sales +44% 强; 但 **PA Adj EBITDA margin 从 21.1% 降到 18.9% (-220bp)**. **PA is not yet a margin story. It is a sales-quality story led by PCS.**
3. **资本配置再平衡 (非 pivot)**. Q1 回购 $414.8M (-66% vs Q3'25), M&A/Buyback cash flow 比 10%. 回购仍是并购 10 倍, 只是 "rebalance", 不是 "pivot".

**What market misses**:
- 市场用 PA 整体 run-rate + PE × EPS 单层估值; 本文分层: PCS 10-12x Rev + 非 PCS 3-4x Rev + Incremental margin 稳态验证
- 市场未单独定价 BlackRock 双重身份 (11.7% Q1 Rev + 私募 workflow 长期议价权边界风险)
- 市场未计 ABF 反身性非对称 (downside ~2x upside)

**Valuation**: 本文 Base PE 31-32.7x 比街共识 36-37x 保守约 4-5x, 折价来自: (a) margin 稳态未证明 -1x; (b) BR 双重身份 -2x; (c) ABF 反身性 -1x; (d) 内部纪律 -0.5-1x.

**Buy / Sell / Wait 规则** (价格 + 基本面**两层**必须同时满足):

| 动作 | 价格条件 | 基本面条件 |
|------|---------|-----------|
| 维持中性 | $575-620 任何区间 | 任何 |
| 升级关注 (可加仓) | **$540-567** | PCS ≥12% + Q2 incremental ≥55% + S&C 未扩散 |
| 不买 (等) | $540-567 | PCS <10% 或 incremental <50% |
| 深度 review (不自动加仓) | $475-510 | 两层断裂但 Index 护城河未损 |

**价格只是必要条件, 不是充分条件**.

**Q2 checklist** (Top 7 变量, 按优先级):
1. Incremental Adj EBITDA margin (≥60% 维持 / <50% 断裂)
2. PCS recurring run-rate YoY (≥15% / <10%)
3. Adj EBITDA margin TTM (≥58% / <56%)
4. PCS net new sales YoY (≥35% / <20%)
5. M&A / Buyback 现金流比连续 (≥10% / <5%)
6. S&C organic Rev YoY (≥3% / <1%)
7. Index ABF run-rate 与标普 β (±1:1 / 显著偏离)

**圆桌 2/5 下调异议**: Klarman + Druckenmiller 建议降级. 不到 3/5 强制标注"(临界)"门槛.

**BlackRock**: 不是短期断裂风险, 而是长期议价权与 workflow 边界风险.

---

## 1. Verified Q1 2026 Dashboard (核心 15 数字)

> 详细分部 retention / 成本分解 / debt maturity 见附录 B. 本章只列最决定投资判断的 15 个数字.

| # | 指标 | Q1 2026 | Q1 2025 | Δ | DM |
|---|------|---------|---------|---|------|
| 1 | Operating revenue | $850.8M | $745.8M | +14.1% | DM-001 |
| 2 | **Organic operating revenue growth** | — | — | **+13.3%** | DM-002 |
| 3 | Recurring subscription YoY | — | — | +8.6% | DM-003 |
| 4 | **Adjusted EBITDA margin** | **59.3%** | **57.1%** | **+220bp** | DM-007 |
| 5 | **Operating margin (GAAP)** | **53.7%** | **50.6%** | **+310bp** | DM-006 |
| 6 | **Incremental Adj EBITDA margin** | **~75%** | — | — | DM-010 |
| 7 | **PCS recurring run-rate YoY** | **+16%** | — | — | DM-019 |
| 8 | **PCS recurring net new sales YoY** | **+44%** | — | — | DM-018 |
| 9 | **PA Adj EBITDA margin** | **18.9%** | **21.1%** | **-220bp** | DM-024 |
| 10 | Index Adj EBITDA margin | 75.6% | 73.9% | +170bp | DM-021 |
| 11 | S&C organic Rev YoY | +3.7% | — | — | DM-016 |
| 12 | **Share repurchase Q1 cash flow** | **$414.8M** | — | (-66% vs Q3'25 $1,233M) | DM-031 |
| 13 | **Business acquisitions cash outflow** | **$41.7M** | — | (M&A/Buyback 10%) | DM-033 |
| 14 | **BlackRock % of Q1 Rev** | **11.7%** | — | 96% ABF | DM-048 |
| 15 | **GAAP EPS YoY (含 $88M tax benefit)** | **+49.1%** | — | **Adj EPS +13.8%** | DM-011, 012 |

**关键三组区分**:
- **Operating margin +310bp ≠ Adj EBITDA margin +220bp** (不同口径, v4.2 混淆)
- **Incremental 75% ≠ 绝对 59.3%** (Q1 强信号 ≠ 稳态上移)
- **GAAP EPS +49.1% 含 $88M discrete tax benefit** (效税率 -4.3%, legal entity restructuring 一次性), **不适合估值外推**; Adjusted EPS +13.8% 才是 underlying trend

---

## 2. Q1 暴露的三件事

### 2.1 经营杠杆强, 绝对 margin 未突破

- [事实] Rev 增量 $105M → Adj EBITDA 增量 $79.1M → incremental ~75%
- [事实] 绝对 Adj EBITDA margin 59.3% (+220bp YoY) 仍落在街共识 58-60%
- [推断] 结构性贡献 80-90% (Cost of revenues 杠杆 + intangible amort 下行 + R&D 规模 + S&C 可能一次性)
- [观点] Q1 75% 是强信号, 不等于稳态 63-64%. 稳态上移需 Q2-Q3 incremental ≥60% 连续
- [估值含义] Base +$6-10; Bull +$15-20; Bear 0

### 2.2 PA 内部分层 + 利润恶化

- [事实] PA Rev +7.9% total / +5.3% organic (街预期 ~15%, miss)
- [事实] PCS run-rate +16%, new sales +44%
- [事实] **PA Adj EBITDA margin 21.1% → 18.9% (-220bp), 绝对 EBITDA -$0.5M**
- [推断] 非 PCS PA organic 约 +0% 至 -5% (Real Assets legacy 拖累); PA 利润恶化可能 (a) Vantager/Compass 部分月份并表 (b) 非 PCS 成本刚性 (c) 一次性整合
- [观点] **PA is not yet a margin story. It is a sales-quality story led by PCS.**
- [估值含义] 增长层分层 +$3-8; PA 利润 concern -$3-5; 净 +$0-3

### 2.3 资本配置再平衡 (非 pivot)

- [事实] Q3'25-Q1'26: 回购 $1,233M → $907M → $414.8M (-66%); 并购 0 → Vantager 宣告 → 完成 Vantager + Compass; 发债 $500M+ → $900M+ → $200M
- [事实] Q1 M&A/Buyback 现金流比 **10%** (vs 此前 <2%)
- [事实] PM Insights 2026-04-07 完成, **会计归属 Index reportable segment** (战略属私募但计入 Index)
- [推断] 管理层在 Q3'25 $1.23B at PE 62x 之后意识到资本效率问题, earnings yield 2.5% << 标的 IRR 12-15%
- [观点] 当前是 **capital allocation rebalance**, 不是 pivot. 连续两季 M&A/Buyback ≥10% 才是 **rebalance confirmed**; 只有当并购贡献 run-rate + 管理层明确表态时, 才叫 **pivot**
- [估值含义] Base +$0-5; Bull +$5-9; Bear -$2

---

## 3. 三层价值引擎

| 层 | 核心变量 | 证据强度 | Q1 信号 | Base 估值贡献 | 失效条件 |
|----|---------|---------|---------|--------------|---------|
| **增长层** | PCS run-rate / PCS new sales / 非 PCS PA / PA margin | 中高 | PCS +16%/+44%; 非 PCS 反推 +0 至 -5%; PA margin -220bp | +$0-3 (分层 +$3-8 扣 PA 利润 -$3-5) | PCS <10% 连续 2 季 |
| **利润层** | Incremental margin / 绝对 margin / Index segment margin | 中 (本季最强单季信号) | incremental 75%; 绝对 59.3%; Index 75.6% | +$6-10 (Base), +$15-20 (Bull) | Q2 incremental <50% 连续 2 季 |
| **扩张层** | M&A/Buyback cash 比 / aggregate purchase price / 标的 run-rate 贡献 | 中低 | 比 10% (cash 口径); 经济 17% ($71.4M purchase / Buyback) | +$0-5 (Base), +$5-9 (Bull) | Q2 回购 >$800M + 无新并购 |

**三层耦合折价** (芒格视角): 5-15% 双重计数 (并购 Q1 部分月份并表混入 margin + PCS). 扣 -$3-5 Base.

**BlackRock 双重身份** (跨越三层):

| 风险 | 概率 | 冲击 | 处理 |
|------|-----|------|------|
| Aladdin + Preqin workflow 竞争 PCS | 中高 | 中 | Base 折价 -$3-5 |
| BR 自建 private markets index | 中 | 中高 | Bear trigger -$5-10 |
| iShares 大规模切换 MSCI 公募 benchmark | **低** | 极高 | Stress case -$15-20 (不放 base) |

**BlackRock 不是短期断裂风险, 而是长期议价权与 workflow 边界风险**.

---

## 4. 估值 — PE × Adj EPS 为主, EV/EBITDA 交叉验证

### 4.1 当前股价 $598 隐含了什么 (反推表)

| 当前价格 $598 隐含 | 数值 | 含义 |
|-------------------|------|------|
| Market cap | $43.9B | 73.4M × $598 |
| FY26E Adj EPS | $18.5 | 与街共识 mid-point 一致 |
| **Implied forward PE** | **32.3x** | 落在 Base 31-32.7x 区间 |
| **Implied EV/Adj EBITDA** | **~23.4x** | EV $50B / Adj EBITDA $2.13B |
| Implied EV/Rev | ~14.1x | 同业溢价 +15% 合理 |
| Implied Adj EBITDA margin 稳态 | 60-61% | 接近 Q1 59.3%, 未外推到 63% |
| Implied organic Rev CAGR (5 年) | 10-11% | 接近 normalized path |
| Implied PCS run-rate 稳态 | 需 >12-15% 维持 | 分层 alpha 已部分吸收 |
| Implied BR 折价 | 有 (约 -3-5) | 未计 stress 级切换风险 |
| Implied 情绪溢价 | ~$20 | 未完全修正 |

**结论**: **当前 $598 大致定价了 Base case, 但没有为 Q2 变量断裂提供保护**. 这不是明显高估, 也没有安全边际. 期望回报 -4% 到 +1% (Base) / 概率加权 -4.3% 说明风险调整后略偏负.

### 4.2 四情景推导

**Base case** (概率 45%): FY26E Adj EPS $18.5 × PE 31-32.7x = $575-605.

PE 31-32.7x 从街共识 36-37x 保守 4-5x:

| 折价 | PE 压缩 | 原因 |
|------|--------|------|
| Margin 稳态未证明 | -1x | Q1 绝对 59.3% 未突破街 58-60% |
| BR 双重身份 | -2x | 同业无此量级 |
| ABF 反身性非对称 | -1x | downside ~2x upside |
| 三层耦合 + 认知边界 | -0.5 到 -1x | internal discipline |

**Mild Bear** (25%): Adj EPS $18.0 × 30-31.5x = $540-567. 触发: Q2 温和 miss + 情绪溢价修正, 但至少一层价值引擎维持.

**Stress** (15%): Adj EPS $17.0 × 28-29x = $475-495. 触发: **两层同时断裂** (incremental <50% + PCS <10%) + 宏观冲击 + 情绪溢价完全修正.

**Bull** (15%): Adj EPS $19.2-19.5 × 32.5-33.5x = $620-650. 触发: Q2-Q3 incremental ≥60% 连续 + PCS ≥16% + M&A/Buyback ≥10% 连续; AI ARR $30M+ 披露为**增强项** (不单独激活 Bull, 仅加 +$5-10).

### 4.3 Reverse PE sensitivity 表

| PE 假设 | × FY26E Adj EPS $18.5 | Per share | 隐含情景 |
|---------|----------------------|-----------|---------|
| 28x | | $518 | 低于 Mild Bear 中位, 接近 Stress 上沿 |
| 30x | | $555 | Mild Bear 中位 |
| **32x** | | **$592** | **Base 中位** |
| 34x | | $629 | Bull 下沿 |
| 36x | | $666 | 街共识中位 |
| 38x | | $703 | MS $727 隐含 |

### 4.4 FY26E Adj EPS Bridge (从 Q1 到全年)

| 项 | 贡献 | 说明 |
|---|------|------|
| Q1 Adj EPS annualized ($4.55 × 4) | $18.20 | 简单年化基准 |
| + Seasonality (Q2-Q4 通常 > Q1) | +$0.30 | 历史 Q1 略低于全年平均 |
| + Buyback -1.5% 股数 (全年) | +$0.30 | 股数下降贡献 |
| + Interest expense guidance $274-280M | -$0.15 | 全年利息低于 Q1 年化 |
| - $88M tax benefit 一次性回流 | -$0.35 | one-time 不延续 |
| + 稳态 ETR 24% vs Q1 -4.3% | 包含在上行 | — |
| **FY26E Adj EPS (本文 Base)** | **$18.5** | 街共识 mid-point |

### 4.5 EV/EBITDA 交叉验证

- Base $590 对应 EV $49.4B / FY26E Adj EBITDA $2.13B = **~23.1x**
- 街共识 $688 对应 ~**26.6x**
- 差异 **3x quality premium** = 本文识别的三项折价 (BR 双重身份 -1x, 反身性 -1x, margin 稳态未证 -1x)
- 不是 EBITDA 水平差异

### 4.6 非 PCS PA 敏感性 (PCS 占比假设)

因非 PCS PA organic 是反推, 敏感性如下:

| PCS 占 PA 权重 | 隐含 PCS organic | 隐含非 PCS organic | 结论 |
|---------------|------------------|-------------------|------|
| 30% | +30% | -4% | 非 PCS 显著恶化 |
| 40% | +23% | -6% | 非 PCS 明显拖累 |
| **50% (本文基准假设)** | **+20%** | **-5%** | 非 PCS 持平偏负 |
| 60% | +18% | -2% | 非 PCS 接近持平 |

**结论**: 无论 PCS 占比 30-60%, 非 PCS organic **显著弱于 PCS**. 分层假设在各情景下都成立, 但非 PCS 的具体增速**不可精确反推**. 这是 [推断], 不是 [事实]. Q2-Q3 需要更细分部披露才能校准.

### 4.7 WACC 敏感性 (DCF cross-check, 非 PE 主估值直接敏感度)

| 因子 | -1pp | +1pp |
|------|------|------|
| WACC | +$45 | -$45 |
| Adj EBITDA margin 稳态 | -$25 | +$25 |
| Organic Rev CAGR 5 年 | -$20 | +$20 |

注: WACC ±$45 是 DCF 交叉验证的敏感度, 本文主估值用 PE × Adj EPS, 不是 DCF. WACC 敏感度仅用于判断宏观利率变化对估值的量级.

---

## 5. 风险与 Kill Switch (分 single-quarter 与 confirmed 两层)

### 5.1 下修触发 — Single-Quarter Yellow vs Confirmed Red

**Single-Quarter Yellow** (Q2 一季触发 → 临时 Bear review, Base 暂下修 $10-15):
- Q2 incremental Adj EBITDA margin **50-55%**
- PCS run-rate **10-14%**
- PA Adj EBITDA margin **<18%**
- S&C organic **1-3%**
- M&A / Buyback 比 **5-10%**

**Confirmed Red** (Q2 + Q3 连续 → 正式降级评级):
- Q2 + Q3 incremental margin **<50% 连续 2 季** → 利润层失效, 降级审慎关注, Base 下修 -$10
- Q2 + Q3 PCS run-rate **<10% 连续 2 季** → 增长层归零, 降级审慎关注, Base 下修 -$8
- Q2 + Q3 S&C organic **<1% + cancel 扩散到 ESG 核心** → S&C 保险化加速, Base 下修 -$5-8
- Q2 + Q3 M&A / Buyback **<5% + 回购恢复到 $800M+** → 再平衡证伪, Base 下修 -$3-5

**Stress-Direct** (单季即触发 Stress review, 不等 Q3):
- Q2 incremental **<45% 且 PCS <10% 同时** → 两层同时断裂, 直接进入 Stress 区间 $475-510
- Q2 GAAP earnings miss **>-10%** + Adj EPS miss **>-5%** 同时
- Index ABF run-rate **-15%+** 因股市回撤 (反身性触发)

### 5.2 上修触发 Top 5

| # | 条件 | 估值影响 | 评级影响 |
|---|------|---------|---------|
| 1 | Q2-Q3 incremental Adj EBITDA margin **≥60% 连续** | +$10-15 | Bull 激活 |
| 2 | PCS run-rate **≥16% 连续** + Q2 PCS new sales **≥35%** | +$5-10 | 辅助 Bull |
| 3 | 10Y Treasury **<4.0%** + Fed 降息 3 次 | +$15-20 (WACC) | 辅助 Bull |
| 4 | M&A purchase price / buyback **≥10% 连续 2 季** + 标的 run-rate 贡献披露 | +$5 | 无立即 |
| 5 | BlackRock **明确承诺不自建 Preqin indexing** | +$5-10 (CQ6 归零) | 无立即 |

**注**: AI 产品 ARR $30M+ 首次披露是**Bull case 的增强项** (+$5-10), 不单独激活 Bull. 真正 Bull 激活仍依赖 #1 + #2 同时成立. 若 AI ARR 只是低毛利试点 / 折扣销售 / 被 existing subscription 吸收, 估值贡献不自动是 +$8-15.

### 5.3 重评级规则

**中性 → 关注** (上调): **同时**满足
1. 上修触发 #1 或 #2 确认
2. 股价回落到 $540-567 (Mild Bear 区间)
3. PCS run-rate ≥12% + Q2 incremental ≥55% + S&C 未扩散 (**基本面未转红灯**)

**中性 → 审慎关注** (下调): **同时**满足
1. ≥2 个 Confirmed Red 触发 (双层断裂)
2. 情绪溢价快速修正 (Mild Bear 路径 B/C)

---

## 6. Q2 预登记变量 (Top 7 正文, 完整 21 变量见附录 C)

| # | 变量 | Q1 基线 | Q2 阈值 (维持/警示/断裂) | 优先级 |
|---|------|--------|-------------------------|--------|
| 1 | Incremental Adj EBITDA margin | ~75% | ≥60% / 50-60% / <50% | 🔴 最高 |
| 2 | PCS recurring run-rate YoY | +16% | ≥15% / 10-15% / <10% | 🔴 最高 |
| 3 | Adj EBITDA margin (TTM) | 59.3% | ≥58% / 56-58% / <56% | 🟠 高 |
| 4 | PCS recurring net new sales YoY | +44% | ≥35% / 20-35% / <20% | 🟠 高 |
| 5 | M&A / Buyback 现金流比连续 | 10% | ≥10% / 5-10% / <5% | 🟡 中 |
| 6 | S&C organic Rev YoY | +3.7% | ≥3% / 1-3% / <1% | 🟡 中 |
| 7 | Index ABF run-rate (与标普 β) | $872M | ±1:1 / 显著偏离 / 反转 | 🟡 中 |

---

# 附录

## 附录 A — 版本变更记录 (Changelog)

| 版本 | 状态 | 关键变化 |
|------|------|---------|
| v3.0 | 历史基线 | "资本市场铸币局"框架, 公允 $579 |
| v4.0 | 已下架 | Q1 2026 首次覆盖; 三层复利机框架; 因 Adj EBITDA margin 65.2% 误用等多项数据错误下架 |
| v4.1 | 已下架 | 修 v4.0 硬数据但研究深度压缩过头; 估值 anchor $609 × 80/73.4 逻辑混乱 |
| v4.2 | 已下架 | 补回深度, 但估值章节 EV/EBITDA 14x → $301 出现调试痕迹; 多项细节错误 (operating margin +220bp / SGA -280bp / S&C retention -50bp / PM Insights 归属 PA / BR "building the machine" 归属 Q1 / "organic 剔除外延" 残留) |
| v4.3 | 已下架 | 修 v4.2 P0/P1/P2 全部; PE × Adj EPS 主估值 + 四情景 + Stress case |
| **v4.4** | **发布版** | v4.3 基础 + 概率加权 vs Base return 区分 / 买点两层规则 (价格 + 基本面) / Kill Switch 分 Yellow/Red/Stress-Direct 三级 / AI ARR 降为增强项 / 隐含价格反推表 / FY26E EPS bridge / Reverse PE sensitivity / 非 PCS 占比敏感性 / Source room 三层拆解 |

### v4.3 → v4.4 关键修正

| # | v4.3 问题 | v4.4 修正 |
|---|----------|----------|
| 1 | Base return vs probability-weighted 混用 | 执行摘要显式分开: Base -4% 到 +1%, probability-weighted $572 (-4.3%) |
| 2 | 买点单层 (仅价格) | 两层: 价格 $540-567 + 基本面 (PCS ≥12% + incremental ≥55% + S&C 未扩散) |
| 3 | Kill Switch "连续 2 季" 与 earnings day 冲突 | 分 Single-Quarter Yellow (暂下修) / Confirmed Red (连续 2 季降级) / Stress-Direct (单季两层断裂触发) |
| 4 | AI ARR 上修触发单独激活 Bull | 降为 Bull 增强项 (+$5-10), 不单独激活 Bull |
| 5 | Source Index 单表 | 拆三层: Public Source Table / Data Extraction / Judgment Table |
| 6 | Market data snapshot 不醒目 | 标题下方首行加 "Market data snapshot as of..." |
| 7 | Verified Dashboard 过长 | 正文压到 15 核心数字, 详细表移附录 B |
| 8 | 报告标题过于概念化 | 改为 "MSCI Q1 2026 Review: Index 利润杠杆、PCS 分层与资本配置再平衡" |
| 9 | PA 钉子不够突出 | 加粗 "PA is not yet a margin story. It is a sales-quality story led by PCS." |
| 10 | BlackRock 风险略戏剧化 | 明确 "不是短期断裂风险, 是长期议价权与 workflow 边界风险" |
| 11 | M&A "pivot" 语言不一致 | 统一三档: rebalance → rebalance confirmed → pivot |
| 12 | 无 "当前价格隐含什么" 表 | 附估值章节 4.1 新增 |
| 13 | 无 Reverse PE sensitivity | 4.3 新增 |
| 14 | 无 FY26E Adj EPS bridge | 4.4 新增 |
| 15 | 非 PCS PA 反推无敏感性 | 4.6 新增 (PCS 占比 30-60% 四情景) |

---

## 附录 B — 完整数据表 (Full Detail)

### B.1 成本结构分解 (10-Q income statement)

| 项 | Q1 2026 / Rev | Q1 2025 / Rev | Δ |
|---|--------------|---------------|---|
| Cost of revenues | 16.7% | 18.3% | **-168bp** |
| Selling & marketing | 10.1% | 10.6% | -48bp |
| R&D | 5.8% | 6.4% | -55bp |
| G&A | 8.1% | 7.7% | **+45bp** |
| Acquired intangible amortization | 4.9% | 5.9% | -96bp |
| D&A (property/equipment) | 0.7% | 0.6% | +6bp |
| **Total opex ratio** | **46.3%** | **49.5%** | **-315bp** |
| **Operating margin** | **53.7%** | **50.6%** | **+310bp** |

**主 driver**: Cost of revenues -168bp + intangible amort -96bp + R&D -55bp = -319bp. **SGA (合并 S&M + G&A) 持平** (18.2% vs 18.3%, -10bp).

### B.2 Segment 收入与利润完整表

**Rev**:

| Segment | Q1 Rev | YoY total | Organic YoY | Run-rate | Run-rate YoY |
|---------|--------|-----------|-------------|----------|--------------|
| Index | $496.3M | +17.7% | — | — | — |
| Analytics | $190.0M | +10.3% | +10.5% | — | +7.9% |
| S&C | $91.9M | +8.6% | **+3.7%** | — | +6.6% (organic +4.2%) |
| PA | $72.6M | +7.9% | +5.3% | $296.4M | +8.4% |

**Adj EBITDA**:

| Segment | Q1'25 Adj EBITDA | Q1'26 Adj EBITDA | 增量 | 占 Consolidated 增量 | Q1'26 margin | Q1'25 margin | Δ |
|---------|------------------|------------------|------|---------------------|-------------|-------------|---|
| Index | $311.6M | $375.2M | **+$63.6M** | **80.4%** | 75.6% | 73.9% | +170bp |
| Analytics | $76.0M | $82.8M | +$6.8M | 8.6% | 43.6% | 44.2% | -60bp |
| S&C | $23.8M | $33.0M | +$9.2M | 11.6% | 35.9% | 28.2% | +770bp |
| PA | $14.2M | $13.7M | **-$0.5M** | **-0.6%** | 18.9% | 21.1% | **-220bp** |
| **Consolidated** | **$425.6M** | **$504.7M** | **+$79.1M** | 100% | 59.3% | 57.1% | +220bp |

**关键**: Segment adj EBITDA 加总 = Consolidated adj EBITDA (无 corporate 差额). Index 贡献 Consolidated 增量 **80%**.

### B.3 销售质量完整表

| Segment | New recurring sales | Cancellations | Net new | Retention Q1'26 | Retention Q1'25 | Δ |
|---------|--------------------|--------------|---------|----------------|-----------------|---|
| Index | $32.8M | $8.0M | +$24.8M | 96.9% | 96.5% | **+40bp** |
| Analytics | $17.1M | $8.9M | +$8.2M | 95.3% | 95.5% | -20bp |
| S&C | $7.5M | $6.6M | **+$0.9M** | **93.0%** | **94.5%** | **-150bp** |
| PA | $10.2M | $4.5M | +$5.7M | 93.8% | 91.5% | **+230bp** |
| **Total** | $67.6M | $28.0M | +$39.6M | **95.4%** | **95.3%** | +10bp |

### B.4 资本配置 — 现金流 vs 经济口径

**现金流口径**:
- Share repurchase Q1: $414.8M
- Through Apr.20: $464M
- Business acquisitions net cash: $41.7M
- Q1 新增债务: ~$200M
- **M&A / Buyback cash 比: 10.0%**

**经济口径** (10-Q Note 3):
- Vantager + Compass aggregate purchase price: **$71.4M**
- Intangibles: $36.5M (51.1%)
- Goodwill: $42.7M (59.8%)
- Contingent consideration: $34.3M (earn-out)
- **M&A purchase price / Buyback cash 比: 17%** (更能反映经济规模)

**并购清单**:
- Vantager 2026-02-27 (Q1) → 会计归属 PA
- Compass Financial Technologies 2026-03-02 (Q1) → 会计归属 Index
- PM Insights 2026-04-07 (**Q2 after-quarter**) → **会计归属 Index reportable segment** (不计入 PA Q2 revenue 或 PA margin 修复假设)

### B.5 Balance Sheet & Debt Maturity

| 项 | Q1 2026 |
|---|---------|
| Principal amount of debt | $6.45B |
| Carrying amount of debt | $6.404B |
| Cash & cash equivalents | $385.3M |
| Net debt | $6.065B |
| TTM Adj EBITDA | ~$1.99B |
| **Total debt / Adj EBITDA (官方)** | **3.2x** (目标 3.0-3.5x) |

**Debt Maturity**: 2026-2028 **$0**; 2029 $1.0B; 2030 $1.4B; 2031+ $4.05B. 短期 refinancing pressure 低.

### B.6 Quality Dashboard

| 指标 | Q1 2026 | 同业对比 |
|------|---------|---------|
| Rule of X (主口径) | 72.6 (13.3% + 59.3%) | #1 (SPGI 64.8 / MCO 63.0 / ICE 60.1) |
| Rule of X (recurring) | 67.5 (8.2% + 59.3%) | #1 |
| η (internal est, 3 年) | ~0.35 | 同业最低 (SPGI 0.75-0.80) |
| Consolidated Retention | 95.4% | 行业高端 |
| TTM FCF/NI | ~146% | 行业高端 |
| RPO | $2.483B (12 月 $1.1705B) | — |

---

## 附录 C — 21 变量预登记完整表

### C.1 增长层 (V1-V7)

| # | 变量 | Q1 基线 | 维持 | 警示 | 断裂 |
|---|------|--------|------|------|------|
| V1 | Total operating Rev YoY | +14.1% | ≥10% | 7-10% | <7% |
| V2 | Organic operating Rev YoY | +13.3% | ≥10% | 7-10% | <7% |
| V3 | Recurring subscription YoY | +8.6% | ≥8% | 6-8% | <6% |
| V4 | Analytics organic YoY | +10.5% (Q1) | ≥5% (Q2 指引) | 3-5% | <3% |
| V5 | S&C organic YoY | +3.7% | ≥3% | 1-3% | <1% |
| V6 | PA organic YoY | +5.3% | ≥4% | 2-4% | <2% |
| V7 | S&C cancel 扩散 | Real Assets 局部 | 稳定 | 扩散 | ESG 核心 |

### C.2 子板块先行变量 (V8-V10)

| # | 变量 | Q1 基线 | 维持 | 警示 | 断裂 |
|---|------|--------|------|------|------|
| V8 | PCS recurring run-rate YoY | +16% | ≥15% | 10-15% | <10% |
| V9 | PCS net new sales YoY | +44% | ≥35% | 20-35% | <20% |
| V10 | Incremental Adj EBITDA margin | ~75% | ≥60% | 50-60% | <50% |

### C.3 利润层 (V11-V13)

| # | 变量 | Q1 基线 | 维持 | 警示 | 断裂 |
|---|------|--------|------|------|------|
| V11 | Adj EBITDA margin TTM | 59.3% | ≥58% | 56-58% | <56% |
| V12 | Index segment margin | 75.6% | ≥73% | 70-73% | <70% |
| V13 | PA segment margin | 18.9% | ≥19% | 16-19% | <16% |

### C.4 资本配置 (V14-V17)

| # | 变量 | Q1 基线 | 维持 | 警示 | 断裂 |
|---|------|--------|------|------|------|
| V14 | M&A / Buyback 现金流比 | 10% | ≥10% | 5-10% | <5% |
| V15 | Buyback 绝对额 | $414.8M | $300-500M | <$300M / >$600M | >$800M |
| V16 | CEO 主动讨论 BR-Preqin | 沉默 | 沉默 | 主动否认 | 主动承认威胁 |
| V17 | Index ABF run-rate (与标普 β) | $872M | ±1:1 | 显著偏离 | 反转 |

### C.5 竞争与黑箱 (V18-V21)

| # | 变量 | Q1 基线 | 维持 | 警示 | 断裂 |
|---|------|--------|------|------|------|
| V18 | AI 产品 ARR (optional upside) | 未披露 | 未披露 | $30M+ | $100M+ |
| V19 | Aladdin + Preqin 集成公告 | 无 | 无 | 延后 | 正式上线 |
| V20 | Real Assets cancel rate | 局部 | 稳定 | 加剧 | >3% 全局 |
| V21 | Consolidated retention rate | 95.4% | ≥95% | 93-95% | <93% |

---

## 附录 D — 圆桌异议 (五位大师中篇)

### D.1 Buffett (弱同意, 偏上调)

MSCI 是品质标杆. 中性略保守. 前置条件: 管理层 10 年回购 η 如 >1.0, Q3'25 高 PE 回购是一次失误, pivot 是纠错应给 credit; 如长期 <1.0, pivot 是机会主义. 估值 +$3-5, 评级考虑上调.

### D.2 Munger (中性, 警惕框架)

"讲得太清楚说明没理解透". 三层可能耦合 5-15%, 有双重计数. 估值 -$3-5 (已扣). 评级维持.

### D.3 Howard Marks (同意, 强调情绪)

MSCI 距 52W 高 -4.5% vs 同行 -17-24% = quality 因子极度溢价反向前奏. 情绪溢价 $15-30 在 3-6 月大概率 mean reversion. 三路径: A 温和 50% / B 快速 30% / C 极端 20%. 评级维持 + $540-567 买点规则.

### D.4 Klarman (弱反对, 建议降级)

价格 = 公允 = 零边际. 扣情绪溢价后 12 月 -10-15%. 黑箱 20-25% 在 Too Hard 边界. AI 贡献应明确设为 0 base. 评级考虑降级.

### D.5 Druckenmiller (反对, 建议降级)

Fed 2026 降息 2→1 + PCE 2.7% + 10Y 4.325% = 38x PE 在 higher-for-longer 维持困难. ABF +25% 是牛市 beta, 股市 -15% 可 ABF -14% → 市值 -$1.9B. MSCI downside ~2x upside. 审慎关注更诚实.

### D.6 综合

2/5 下调 (Klarman + Druckenmiller) / 1/5 上调 (Buffett) / 2/5 维持 (Munger + Marks). 不到 3/5 强制"(临界)"门槛.

---

## 附录 E — BlackRock / Preqin 竞争图谱

### E.1 BlackRock 四层私募市场布局

| 层 | BR-Preqin 能力 | MSCI 暴露 | 概率 | 冲击 | 估值影响 |
|---|---------------|----------|------|------|---------|
| Data | Preqin 数据 (Q1'26 并表 $65M) | PCS 直接竞争 | 中高 | 中 | Base -$2-3 |
| Workflow | eFront + Aladdin 整合 (tech services +22% YoY) | PCS / portfolio tools | 中高 | 中 | Base -$2-3 |
| Index | BR "whole portfolio / public-private integrated platform" 愿景 | MSCI 私募 Index 机会 | 中 | 中高 | Bear trigger -$5-10 |
| Distribution | iShares 基准切换 (极低概率) + 客户网络 | 11.7% Q1 Rev 最大客户 | 低 | 极高 | Stress case -$15-20 |

### E.2 Q1 2026 新增证据

| 证据 | 含义 |
|------|------|
| Preqin Q1 并表 ~$65M Rev | Preqin 作为独立产品线开始贡献 |
| BR tech services & subscription revenue +22% YoY | Aladdin + Preqin 整合产生 demand pull |
| BR Q1'26 call "whole portfolio / public-private integrated platform" | 战略重点位移到公募私募整合 |
| MSCI Q1'26 call 对 BR-Preqin 第二次连续沉默 | 管理层战术回避 or analyst 未问 |

**时间归属说明**: "building the machine for the indexing of private markets" 是 BR/Preqin 2024 年 12 月收购交易语境的早期战略表述, **不是** Q1 2026 call 原话. Q1 2026 call 的新增证据是 Preqin 并表 + tech services +22% + whole portfolio 定位.

---

## 附录 F — Source Room (三层)

### F.1 Public Source Table

| Source ID | Title | URL / Locator | Access Date |
|-----------|-------|---------------|-------------|
| SRC-01 | MSCI Q1 2026 Earnings Press Release | ir.msci.com → Press Releases → 2026-04-21 | 2026-04-21 |
| SRC-02 | MSCI Q1 2026 Form 10-Q | SEC EDGAR, CIK 1408198, filed 2026-04-21 | 2026-04-21 |
| SRC-03 | MSCI Q1 2026 Earnings Presentation | ir.msci.com → IR Events → Q1 2026 deck | 2026-04-21 |
| SRC-04 | MSCI Q1 2026 Earnings Call Transcript | Seeking Alpha / MSCI IR | 2026-04-22 |
| SRC-05 | MSCI 4/7 Press Release — PM Insights acquisition | ir.msci.com → Press Releases → 2026-04-07 | 2026-04-08 |
| SRC-06 | BlackRock Q1 2026 Earnings Press Release | blackrock.com → Press → 2026-04-15 | 2026-04-15 |
| SRC-07 | MarketBeat MSCI Consensus Page | marketbeat.com/stocks/NYSE/MSCI/forecast/ | 2026-04-24 |
| SRC-08 | Investing.com MSCI Consensus Page | investing.com/equities/msci-inc | 2026-04-24 |
| SRC-09 | Morgan Stanley MSCI Research Note (2026-04-22) | MS Research Portal (access restricted) | 2026-04-22 |
| SRC-10 | Preqin / BlackRock Aladdin launch announcement | preqin.com / press room | 2026-04-24 |
| SRC-11 | Treasury.gov Daily Yield Curve | treasury.gov → yield curve daily | 2026-04-24 |
| SRC-12 | Fed 2026 SEP (Summary of Economic Projections) | federalreserve.gov → FOMC → 2026-03 SEP | 2026-03 |

### F.2 Data Extraction Table (关键数字)

| DM | 数据 | Source | 精确定位 | 使用值 |
|---|------|--------|---------|--------|
| DM-001 | Operating revenue $850.8M, +14.1% | SRC-01 | "Consolidated Financial Results" paragraph, first sentence | $850.8M, +14.1% |
| DM-002 | Organic operating revenue growth +13.3% | SRC-01 | Consolidated highlights, "organic operating revenue growth" | +13.3% |
| DM-006 | Operating margin 53.7% (Q1'25 50.6%) | SRC-01 + SRC-02 | Press release consolidated margin table + 10-Q income statement | +310bp |
| DM-007 | **Adjusted EBITDA margin 59.3% (57.1%)** | SRC-01 | Adjusted EBITDA reconciliation table | **+220bp** |
| DM-010 | Incremental Adj EBITDA margin ~75% | 计算 (SRC-01) | Rev 增量 $105M / Adj EBITDA 增量 $79.1M | ~75% |
| DM-011 | GAAP EPS +49.1%, 效税率 -4.3%, $88M tax benefit | SRC-01 + SRC-02 | Income tax commentary + 10-Q tax footnote | $88M one-time |
| DM-018 | PCS recurring net new sales ~+44% | SRC-03 + SRC-04 | Earnings presentation segment slide + call transcript | ~+44% |
| DM-019 | PCS subscription run-rate +16% | SRC-04 | Call transcript, CFO remarks | ~+16% |
| DM-020 | S&C "higher cancels + muted growth" | SRC-04 | CEO/CFO remarks on S&C segment | 原文 |
| DM-021-024 | Segment Adj EBITDA margins | SRC-03 | Earnings presentation segment profitability slide | Index 75.6% / Analytics 43.6% / S&C 35.9% / PA 18.9% |
| DM-025 | Segment EBITDA bridge (Index +$63.6M / S&C +$9.2M / Analytics +$6.8M / PA -$0.5M) | SRC-02 | 10-Q Adjusted EBITDA reconciliation table | 加总 = $79.1M |
| DM-026-030 | Retention by segment | SRC-02 | 10-Q Operating Metrics table | Index 96.9%, Analytics 95.3%, S&C 93.0%, PA 93.8%, Total 95.4% |
| DM-031 | Share repurchase Q1 cash flow $414.8M | SRC-02 | 10-Q Cash Flow Statement, Financing Activities | $414.8M |
| DM-032 | Share repurchase YTD through Apr.20 $464M | SRC-01 | Capital return discussion | $464M |
| DM-033 | Business acquisitions net cash $41.7M | SRC-02 | 10-Q Cash Flow Statement, Investing Activities | $41.7M |
| DM-035-038 | Vantager + Compass purchase price $71.4M, intangibles $36.5M, goodwill $42.7M, earn-out $34.3M | SRC-02 | 10-Q Note 3 "Business Combinations" | — |
| DM-039 | PM Insights 2026-04-07, 归属 Index reportable segment | SRC-05 + SRC-02 | 4/7 press release + 10-Q subsequent events | Index segment |
| DM-047 | Debt maturity (2026-2028 $0; 2029 $1.0B; 2030 $1.4B) | SRC-02 | 10-Q Debt footnote, maturity schedule | — |
| DM-048 | BlackRock 11.7% of Q1 revenue, 96% ABF | SRC-02 | 10-Q Note: Concentrations of Credit Risk | 11.7%, 96% ABF |
| DM-051 | MarketBeat consensus $692.70 (11 analysts) | SRC-07 | MarketBeat forecast page | Snapshot 2026-04-24 |
| DM-052 | Investing consensus $682.94 (17 analysts) | SRC-08 | Investing.com analyst page | Snapshot 2026-04-24 |
| DM-053 | MS overweight $727 (2026-04-22) | SRC-09 | MS research note | — |
| DM-054 | RPO $2.483B, 12 月 $1.1705B | SRC-02 | 10-Q Note 4 "Revenue Recognition" | — |
| DM-062 | BlackRock Q1 2026 Preqin 并表 ~$65M Rev | SRC-06 | BR Q1 2026 press release | ~$65M |
| DM-063 | BlackRock Q1 2026 tech services & subscription revenue +22% YoY | SRC-06 | BR Q1 press release | +22% |

### F.3 Judgment Table (标签清单)

| 核心论点 | 标签 | Source / 计算 |
|---------|------|---------------|
| Q1 operating revenue $850.8M, +14.1% | [事实] | DM-001 |
| Organic operating revenue growth +13.3% | [事实] | DM-002 |
| Adj EBITDA margin 59.3% vs 57.1% (+220bp) | [事实] | DM-007 |
| Incremental Adj EBITDA margin ~75% | [事实] (计算) | DM-010 |
| GAAP EPS +49.1% 含 $88M tax benefit | [事实] | DM-011 |
| **Q1 75% incremental 结构性占 80-90%** | [推断] | 本文分解 |
| **稳态 Adj EBITDA margin 上移到 63-64% 需 Q2-Q3 验证** | [观点] | 本文判断 |
| PCS run-rate +16%, new sales +44% | [事实] | DM-018, 019 |
| **非 PCS PA organic +0% 至 -5%** | [推断] | 从 PA +5.3% + PCS 占比假设反推 |
| **PCS 占 PA 权重 40-50%** | [假设] | 本文基准假设 |
| PA Adj EBITDA margin 21.1% → 18.9% (-220bp) | [事实] | DM-024 |
| **PA 是 sales-quality 故事, 不是 margin 故事** | [观点] | 本文钉子 |
| Q1 M&A/Buyback 现金流比 10% | [事实] | DM-031, 033 |
| **资本配置 rebalance, 不是 pivot** | [观点] | 本文判断 |
| **Rebalance confirmed 需连续 2 季** | [规则] | Kill Switch 设定 |
| BlackRock 11.7% Q1 Rev | [事实] | DM-048 |
| **BR-Preqin workflow 竞争概率 中高** | [观点] (三概率层) | 本文分层 |
| **iShares 大规模切换概率 低** | [观点] | 本文分层 |
| FY26E Adj EPS $18.5 | [假设] | 街共识 mid-point |
| **Base PE 31-32.7x** | [假设] | 从街 36-37x 保守 4-5x (four discount sources) |
| **情绪溢价约 $20** | [推断] | 四方法 converge $15-30 |
| Weaken ratio ~17% | [内部评分, 非可验证指标] | KS + CQ 加权 |
| 黑箱比例 ~20-25% | [内部评分] | 关键变量公开可验证比例 |

### F.4 实时变化数据 (不同稳定性分层)

**稳定事实层** (MSCI 财报, 不会变):
- Q1 2026 官方财务数据 (Operating revenue, margin, EPS, segment 数据)
- 10-Q 披露的 RPO, debt, retention
- 2026-04-07 PM Insights 收购公告

**季度更新层** (会变, 但有固定 cadence):
- Consensus target (季度 earnings 后大 revise)
- Segment run-rate (季度披露)
- Retention rate (季度披露)

**实时变动层** (每日或每周变):
- 股价 $598.01 (2026-04-23)
- 10Y Treasury 4.325% (2026-04-24)
- 52W 高低 (滚动)
- Consensus target (rolling, 个别分析师随时 revise)
- Fed 降息预期 (FOMC 会议 + 市场 pricing)

**所有实时层数据必须在发布时更新 snapshot, 不得混入稳定事实层**.

---

## 附录 G — 同业对标

| 指标 | MSCI | SPGI | MCO | ICE | FDS |
|------|------|------|-----|-----|-----|
| Market Cap ($B) | 43.9 | 134.7 | 83.5 | 92.4 | 18.6 |
| FY26E Rev ($B) | 3.55 | 14.2 | 7.4 | 10.1 | 2.3 |
| FY26E Adj EBITDA margin | 60% | 50% | 51% | 53% | 41% |
| Q1 organic Rev YoY | +13.3% | +6-8% | +5-7% | +7-9% | +5-6% |
| Rule of X | **72.6** | ~57 | ~57 | ~60 | ~47 |
| EV/FY26 Rev | 14.1x | 10.1x | 12.5x | 10.0x | 8.7x |
| EV/FY26 Adj EBITDA | 23.5x | 20.2x | 24.4x | 19.1x | 21.2x |
| FY26E Forward PE | 31-33x | 28x | 34x | 24x | 32x |
| Debt/EBITDA | 3.2x | 2.3x | 2.8x | 3.5x | 1.5x |
| BR-Preqin 暴露 | **最高** | 中 | 中 | 低 | 低 |

**MSCI 定位**: 基本面 Top 1 (Rule of X), 估值高位 (PE 略高于同业), BR-Preqin 暴露最高.

---

## 附录 H — Q2 Earnings Day 预判手册

### H.1 Pre-Earnings (一周前)

**决定性数字** (填空表):

| 数字 | Q1 | Q2 期望 | Q2 实际 | 行动 |
|------|-----|--------|---------|------|
| Incremental Adj EBITDA margin | ~75% | ≥60% | — | <50% Stress review; ≥65% Bull |
| Adj EBITDA margin TTM | 59.3% | ≥58% | — | <56% 利润层警示 |
| Organic Rev YoY | +13.3% | ≥10% | — | <7% thesis 削弱 |
| PCS run-rate YoY | +16% | ≥15% | — | <10% 增长层警示 |
| PCS net new sales YoY | +44% | ≥35% | — | <20% 警示 |
| S&C organic YoY | +3.7% | ≥3% | — | <1% 扩散风险 |
| M&A/Buyback 比 | 10% | ≥10% | — | <5% 再平衡证伪 |
| Buyback $ | $414.8M | $300-500M | — | >$800M 回归 buyback-led |
| PA Adj EBITDA margin | 18.9% | ≥19% | — | <16% 加速恶化 |

### H.2 情景 → 行动

| 情景 | 概率 | 判据 | 评级 | 股价目标 | 仓位 |
|------|-----|------|------|---------|------|
| Base 确认 | 45% | 各变量落在维持区间 | 维持中性 | $580-615 | 不变 |
| Bull | 15% | incremental ≥65% + PCS ≥16% + M&A ≥10% 同时 | 升级关注 (如股价未大涨) | $620-680 | 股价 $600 附近考虑加仓 25-50% |
| Mild Bear | 25% | 单变量单季轻度 miss | 维持中性, 下修 Base 中位 $10-15 | $510-540 | 减仓 20-30% |
| Stress | 15% | 两层同时断裂 + 宏观 | 降级审慎关注 | $450-490 | 大幅减仓; $475-510 重新 deep dive (不自动加仓) |

### H.3 Earnings +1 天

- 卖方 revise 方向
- 相对同行 price action
- BR-Preqin 新公告

---

## 附录 I — 术语表

| 术语 | 定义 | 关键区分 |
|------|------|---------|
| Operating margin (GAAP) | GAAP operating income / revenue | **≠ Adj EBITDA margin**; Q1 53.7% (+310bp YoY) |
| Adj EBITDA margin | Adjusted EBITDA / revenue | Q1 59.3% (+220bp YoY) |
| Incremental margin | YoY 增量利润 / YoY 增量收入 | 分 Incremental OPM (~76%) vs Incremental Adj EBITDA (~75%) |
| Organic revenue growth | 剔除 FX + M&A + 剥离 (MSCI 官方口径) | **不应再 "从 organic 中剔除外延"** |
| Run-rate | 季末年化基数 (调整后) | ≠ Rev × 4 |
| ABF | Asset-based fees, 按 AUM × 费率 | 对市场 beta 敏感 (反身性) |
| PCS | Private Capital Solutions (Burgiss + Preqin 类) | ≠ PA 整体 |
| PA | All Other — Private Assets (含 PCS + Real Assets + legacy ESG) | ≠ 纯 PCS |
| Adjusted EPS | Non-GAAP EPS, 剔除摊销 / 重组 / one-time tax | 用于估值, Q1 +13.8% |
| GAAP EPS Q1 2026 | 含 $88M one-time tax benefit, 效税率 -4.3% | **不适合估值外推**; +49.1% |
| η (internal estimate, 非官方) | MCO v2.0 口径, 3 年回购 EPS 增长 / 回购 $ 比 | 非可验证指标 |
| Rule of X | Organic Rev + Adj EBITDA margin 同期 | 本文 72.6 (主), 67.5 (recurring) |
| Three-tier 框架 | 增长层 (PCS + 非 PCS) + 利润层 (Index/Analytics/S&C) + 扩张层 (M&A) | ≠ 传统 segment SOTP |

---

**报告元信息**:

- **版本**: v4.4 (发布版, 2026-04-24)
- **评级**: 中性关注 (维持)
- **Fair value**: Base $575-605 / Mild Bear $540-567 / Stress $475-495 / Bull $620-650
- **Base case return** vs $598: -4% 到 +1%
- **Probability-weighted expected value**: $572 (-4.3%)
- **买点**: $540-567 (前提 PCS ≥12% + incremental ≥55% + S&C 未扩散)
- **真正安全边际**: $475-510 (Stress 情景, 概率 15%)
- **下次覆盖**: Q2 2026 earnings, 预计 2026 年 7 月下旬 (具体日期以 IR 日程为准)
- **Market data snapshot**: 2026-04-23 close / Consensus snapshot 2026-04-24
