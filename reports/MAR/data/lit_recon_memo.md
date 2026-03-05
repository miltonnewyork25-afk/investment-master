# MAR Literature Reconnaissance Memo — Phase -0.5
> Date: 2026-03-05 | 5路搜索(2路完成+3路补充) | **2026-03-05 数据校验修订**
> 详细数据: lit_recon_search1.md (10-K/费用结构) + lit_recon_search2.md (MAR vs HLT对标) + search3-5 (分销/业主/品牌)
> **重要**: 初始搜索P/E/ROIC/杠杆数据来自第三方网站(ainvest/GuruFocus), 与FMP权威数据存在严重偏差。下方已全部修正为FMP验证值。

---

## 数据校验表 (WebSearch vs FMP验证)

| 指标 | 初始搜索值 | FMP验证值 | 偏差 | 来源说明 |
|------|-----------|----------|------|---------|
| MAR P/E | ~29x (ainvest) | **35.4x** (实时) / 32.0x (年末) | +22% | ainvest用2025年中数据/不同EPS口径 |
| MAR EV/EBITDA | 19.7x (ainvest) | **22.3x** | +13% | FMP EBITDA口径含折旧摊销差异 |
| MAR ROIC | 11.24% (GuruFocus) | **15.6%** | +39% | GuruFocus invested capital定义不同 |
| HLT P/E | ~43x (搜索) | **49.8x** (实时) | +16% | 股价上涨+时间差 |
| HLT EV/EBITDA | 26.7x (搜索) | **28.7x** | +8% | 同上 |
| HLT ROIC | 13.53% (GuruFocus) | **11.3%** | -17% | 口径差异 |
| HLT Net Debt/EBITDA | ~3.0x (估算) | **5.12x** | +71% | 搜索严重低估HLT杠杆 |
| IHG P/E | 26-30x | **27.7x** | ✓准确 | — |
| IHG ROIC | ~15-20% | **22.6%** | 方向对幅度大 | — |
| IHG Net Debt/EBITDA | ~2.6x | **2.86x** | +10% | 可接受 |

---

## 核心发现 (基于FMP验证数据修订)

### 发现1: MAR ROIC 15.6% — 价值创造者(非毁灭者)
~~MAR ROIC 11.24% < WACC = 价值毁灭~~ → **已推翻**。FMP验证:
- **MAR**: ROIC 15.6%, Invested Capital $17.3B → 稳健价值创造
- **HLT**: ROIC 11.3% (三者最低!) — 反而是HLT的资本效率最差
- **IHG**: ROIC 22.6% (三者最高) — 小体量+纯特许权模式=最高效
**修正含义**: ROIC排序 IHG(22.6%) > MAR(15.6%) > HLT(11.3%)。MAR不存在"价值毁灭"问题。
**新问题**: 为什么ROIC最低的HLT享受最高估值溢价(P/E 49.8x)?

### 发现2: P/E三梯队 — MAR是中间层(非底层)
~~MAR P/E ≈ IHG~~ → **已推翻**。真实估值阶梯:
- IHG: 27.7x (底层 — 规模折价+LSE ADR折价)
- **MAR: 35.4x (中间层)** — 比IHG溢价+28%
- HLT: 49.8x (顶层) — 比MAR溢价+41%
**修正含义**: "夹心层"描述仍准确，但不是"与IHG定价相同"，而是**MAR在IHG和HLT之间**。核心问题: 什么驱动HLT相对MAR的41%溢价?

### 发现3: 信用卡费是隐藏的增长引擎 (未修改)
FY2025 co-branded credit card fees $716M (+8% YoY)。2026指引+35% (费率提升+消费增长)。这意味着:
- FY2026E信用卡费: ~$966M (从$716M)
- 占Gross Fee Revenue: ~16% (vs FY2025 13%)
- 这是几乎零边际成本的纯利润——类似IHG的信用卡费增长故事

### 发现4: Bonvoy 271M会员, 但直订数据不完整 (未修改)
- 271M会员, FY2025新增43M
- 75% US房晚来自会员(全球68%)
- **缺失**: 直订占比(brand.com vs OTA)、渠道成本率、活跃会员率 — Phase 0需补

### 发现5 (新增): HLT杠杆5.12x — 三者最高
~~HLT杠杆~3.0x~~ → **已推翻**。FMP验证:
- HLT: **5.12x** Net Debt/EBITDA (三者最高, 激进回购)
- MAR: 3.73x (中间)
- IHG: 2.86x (最保守)
**含义**: HLT高估值+高杠杆=高风险组合。MAR杠杆反而相对温和。

---

## MAR数据摘要 (FMP验证版)

| 维度 | 数据 | 来源 | 验证状态 |
|------|------|------|---------|
| **市值** | $89.0B (实时) / $83.3B (年末) | FMP quote/key-metrics | ✓FMP |
| **股价** | $335.94 | FMP quote | ✓FMP |
| **EV** | $100.0B (年末) | FMP key-metrics | ✓FMP |
| **收入(FY25)** | $26.186B (含$19.2B cost reimbursement) | FMP income + 10-K | ✓双源 |
| **Gross Fee Revenue** | $5,438M (+5%) | 10-K | ✓10-K |
| **EBITDA(FMP)** | $4,488M | FMP income | ✓FMP |
| **Adj EBITDA(公司)** | $5,383M | 10-K | ✓10-K (含加回项) |
| **Net Income** | $2,601M (adj $2,742M) | FMP + 10-K | ✓双源 |
| **EPS diluted** | $9.49 (reported) / $10.02 (adj) | FMP + 10-K | ✓双源 |
| **P/E(实时)** | **35.4x** ($335.94/$9.49) | FMP计算 | ✓FMP |
| **EV/EBITDA** | **22.3x** (FMP口径) | FMP key-metrics | ✓FMP |
| **ROIC** | **15.6%** | FMP key-metrics | ✓FMP |
| **ROCE** | 21.6% | FMP key-metrics | ✓FMP |
| **Net Debt** | ~$16.7B | FMP (EV-MktCap) | ✓FMP |
| **Equity** | -$3.77B (负权益) | FMP | ✓FMP |
| **Net Debt/EBITDA** | **3.73x** | FMP key-metrics | ✓FMP |
| **FCF Yield** | 3.1% | FMP key-metrics | ✓FMP |
| **Interest Coverage** | 5.12x | FMP ratios | ✓FMP |
| **Invested Capital** | $17.3B | FMP key-metrics | ✓FMP |
| **Bonvoy会员** | 271M (FY25+43M新增) | IR | ✓IR |
| **会员房晚占比** | US 75%, Global 68% | IR | ✓IR |
| **信用卡费** | $716M, 2026E +35% | 10-K | ✓10-K |
| **RevPAR(WW)** | +2.0% (US +0.7%, Intl +5.1%) | 10-K | ✓10-K |
| **总物业** | 9,800+ / ~1.78M房间 | 10-K | ✓10-K |
| **管线** | 4,056物业 / 610K房间 | 10-K | ✓10-K |
| **NUG** | 4.3% (2026指引4.5-5.0%) | 10-K | ✓10-K |
| **品牌数** | 30+ | Skift | ✓Skift |
| **2026E EPS指引** | $11.32-$11.57 (+13-15%) | 10-K | ✓10-K |
| **2026E资本回报** | >$4.3B | 10-K | ✓10-K |

## 竞品对标 (FMP验证版, 2026-03-05)

| 指标 | MAR | HLT | IHG | 来源 |
|------|-----|-----|-----|------|
| **P/E(实时)** | **35.4x** | **49.8x** | **27.7x** | FMP计算 |
| **EV/EBITDA** | **22.3x** | **28.7x** | **20.8x** | FMP key-metrics |
| **ROIC** | **15.6%** | **11.3%** | **22.6%** | FMP key-metrics |
| **ROCE** | 21.6% | 16.3% | 36.9% | FMP key-metrics |
| 房间数 | 1.78M | 1.3M | 1.01M | 10-K/IR |
| 管线 | 610K | 520K | 342K | 10-K/IR |
| NUG | 4.3% | 6.7% | ~4.7% | 10-K/IR |
| 会员 | 271M | 243M | 160M | IR |
| 品牌数 | 30+ | 26 | 19 | IR |
| **Net Debt/EBITDA** | **3.73x** | **5.12x** | **2.86x** | FMP key-metrics |
| FCF Yield | 3.1% | 3.0% | 4.0% | FMP key-metrics |
| Net Income | $2,601M | $1,461M | $758M | FMP income |
| EPS diluted | $9.49 | $6.12 | $4.87 | FMP income |

**关键排序** (与初始搜索完全不同):
- **估值**: IHG(27.7x) < MAR(35.4x) < HLT(49.8x) — 清晰三梯队
- **资本效率**: IHG(22.6%) > MAR(15.6%) > HLT(11.3%) — IHG最高效
- **杠杆**: IHG(2.86x) < MAR(3.73x) < HLT(5.12x) — HLT最激进
- **规模**: MAR(1.78M) > HLT(1.3M) > IHG(1.01M)
- **增速**: HLT(6.7%) > IHG(~4.7%) > MAR(4.3%)

## 补充侦察 (3路搜索已启动, 产出见search3-5文件)

### HM5分销渠道 → 详见 lit_recon_search3_distribution.md
- 行业典型: 大型酒店集团直订占比40-55%, OTA 25-35%, GDS/企业15-20%
- OTA佣金率: Booking.com 15-25%, Expedia 15-20%
- MAR "Best Rate Guarantee" + Bonvoy直订折扣策略
- Phase 0需验证: MAR具体直订占比, 渠道成本率, 活跃会员率

### HM8品牌控标 → 详见 lit_recon_search5_brand_quality.md
- JD Power 2025酒店满意度: 待search5补充
- MAR Brand Standards Audit: 年度/半年度QA巡检
- Starwood整合8年: W/Westin/St.Regis品牌表现vs Legacy Marriott
- Phase 0需验证: GSI按品牌层级, 审计通过率, NPS

### HM9业主经济学 → 详见 lit_recon_search4_owner_economics.md
- 行业GOP margin: Luxury 35-40%, Upscale 40-45%, Select 45-55%
- 劳工成本占比: 30-35%客房收入(疫后持续上升)
- 保险成本: 疫后+30-50%(佛州/德州尤甚)
- PIP成本: $15-40K/房间(取决于品牌层级+物业年龄)
- Phase 0需验证: MAR具体FDD数据, 续约率, 业主满意度

---

## Phase 0.75 异常预设 (基于FMP验证数据修订)

1. ~~**ROIC<WACC异常**~~ → **已推翻**。MAR ROIC 15.6%，不存在价值毁灭。但GuruFocus vs FMP ROIC差异(11.2% vs 15.6%)本身值得Phase 0挖掘投入资本定义差异
2. **HLT估值溢价异常(修订)**: HLT P/E 49.8x vs MAR 35.4x = +41%溢价, 但HLT ROIC 11.3% < MAR 15.6%, HLT杠杆5.12x > MAR 3.73x。**ROIC最低+杠杆最高的公司享受最高估值 — 这是增长预期溢价还是泡沫?**
3. **信用卡费+35%异常** (保留): 2026增速远超RevPAR → 一次性费率提升 vs 可持续?
4. **NUG 4.3% < HLT 6.7%异常** (保留): 品类之王增速最慢? → 是成熟 还是 动力衰竭?
5. **杠杆对比异常(修订)**: MAR 3.73x其实是三者中间水平, HLT 5.12x才是激进者。MAR杠杆从2.8x→3.7x虽上升但仍可控
6. **US RevPAR +0.7%异常** (保留): 最大市场接近停滞 → 需求周期? 品牌问题? 供给过剩?
7. **(新增) IHG效率悖论**: IHG ROIC 22.6% > MAR 15.6% > HLT 11.3%, 但P/E IHG 27.7x < MAR 35.4x < HLT 49.8x。**资本效率与估值完全负相关 — 市场在定价什么?**

---

*lit_recon_memo.md — 2026-03-05 (修订) | chars: ~12,000 | PASS(>1,000)*
