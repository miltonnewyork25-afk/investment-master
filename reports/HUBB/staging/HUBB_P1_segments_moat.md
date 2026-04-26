# HUBB Phase 1 — Segment Deep Dive + Moat + Expectation Gap
**Date**: 2026-04-22 | **Phase**: 1 | **Purpose**: 业务理解 / 护城河评估 / E→R→G→T 建立

---

## 1. Utility Solutions (HUS) — 63% 收入, $3.68B (FY25)

### 1.1 子板块拆分

| 子板块 | 占 HUS | 2025 Rev (估) | 2025 增速 | 关键产品 | DM |
|--------|--------|--------------|---------|---------|-----|
| **Grid Infrastructure** | ~75% | $2.76B | ~+HSD% vol / +3% price | Insulators, arresters, connectors, bushings, pole hardware, Burndy | DM-HUS-001 |
| **Grid Automation** | ~25% | $920M | **-LSD%-MSD% ("stabilizing at lower base")** | Aclara smart meters, Systems Control, Beckwith relays | DM-HUS-002 |

**[DM-HUS-003]** Q3 2025 Grid Automation YoY = **-18%**, management 语言: "stabilizing at a lower base, focus on smaller projects and replacement products" — **不是 V 形反弹, 是 run-rate reset lower**。

**[DM-HUS-004]** 管理层: ">80% 的 HUS 组合对齐 electric T&D 组件 + 解决方案" — 但**量的问题是子板块 mix 不对, 不是整体组合**。

### 1.2 Aclara 智能电表 (在 HUS 中最弱的一环)

**[DM-ACL-001]** Install base: 北美 **>30M meter endpoints** deployed, 服务 >1,000 utility 客户。
**[DM-ACL-002]** **北美市场份额**: Aclara **#3 at 21%** of installed base 电表硬件; **通信网络层仅 <10%** — Itron 64%, Landis+Gyr 25%, Sensus 8%。
**[DM-ACL-003]** **关键结构判断**: Aclara 是**电表硬件玩家, 不是网络/通信玩家**。网络/通信层是**经常性软件/服务收入**所在 — Aclara 被锁在低利润、低留存的硬件环节。
**[DM-ACL-004]** 2025 AMI 销售"weak", 2025 Q3 单位出货估计 -15% 以上 (从 -18% 收入 + price 持平倒推)。
**[DM-ACL-005]** **AMI 2.0 周期时间**: 2027-2028 consensus, 当前尚未进 backlog → **2 年真空期**。

### 1.3 Systems Control (2023 年 $1.1B 收购)

- 收购价: $1.1B, 2024E sales $400M → **收购倍数 ~12x EBITDA**
- 2025 E 收入: $420-450M (仅 5-10% growth), 低于收购 thesis 的 teens 增速
- 位置: Grid Automation **内部** (虽然"substation" 标签, 产品是工程控制 panel / 变电站 turnkey), 2025 帮 Grid Automation 顶住了 AMI 下滑

**[DM-SC-001]** Systems Control 2 年 post-deal, 收入仅 5-10% CAGR — **收购 thesis (teens growth) 未兑现**, 但尚未减值触发。

### 1.4 HUS 竞争格局 (12 家核心 peer)

| 产品类别 | HUBB 对手 | HUBB 相对位置 |
|---------|---------|-------------|
| Insulators/arresters | ABB, Siemens Energy, GE, TE Connectivity | **中段** (声称 compete 成功, 无量化份额) |
| Connectors/hardware | Eaton Cooper Power, MacLean-Fogg, PLP, Panduit | **Top 3** (Burndy 品牌强) |
| Transmission hardware | PLP, MacLean Power, AFL | 中段 |
| **Substation control** (SC 所在) | **SEL (龙头, 私企), GE Grid, ABB, Siemens Energy, Eaton** | **中下**, 利基进入 |
| Smart meter AMI | **Itron, L+G, Sensus/Xylem, Honeywell** | **#3 硬件 / 劣势网络** |

[DM-HUS-005]

### 1.5 HUS 护城河评估 (moat-evaluator v2.0 框架)

| 维度 | 打分 | 证据 | 反向证据 |
|------|------|------|---------|
| **定价权分层** | 4/5 (Tier 2) | 2025 HUS pricing ~3% 穿越 tariff 周期, "administered pricing not commodity pass-through" [DM-HUS-006] | 但 Aclara 作为 #3 硬件商, 在竞标中价格敏感 |
| **规格卡位 (AVL)** | 4/5 | 产品必须 ANSI/IEEE/IEC + FERC 规范, 进 AVL 需要**多年 field performance**; HPS 声称">85% of what you find on a typical distribution pole" [DM-HUS-007] | 不是合约锁定, utilities 可 multi-source |
| **转换成本** | 3/5 | (a) SKU 标准化于仓储, (b) line crew 培训专用工具 (Ripley), (c) 工程图纸引用 specific 零件号 [DM-HUS-008] | 软性, 可克服 |
| **网络效应** | 1/5 | 无 — 硬件业务, 无平台/数据网络效应 | — |
| **规模经济** | 3/5 | 北美制造足迹 + 分销渗透, 但小于 ETN (5x 规模) | — |
| **无形资产/品牌** | 3/5 | Burndy/Hubbell 130 年品牌 | — |
| **成本优势** | 2/5 | Cu/Al/Steel 输入 — 与 peer 成本基本相同 | Tariff 暴露放大 |

**HUS 护城河综合判断**: **"规格卡位 + installed base + AVL 惯性"** — sticky **但不是 network effect sticky**。更接近 **B2B 基础设施 catalog + administered pricing**, 而不是"真实垄断"。Grid Infrastructure 75% 有真壁垒; Grid Automation 25% (特别是 Aclara) **壁垒显著更弱**。

### 1.6 HUS 增长分解 (2025 FY)

```
HUS 2025 Organic Growth ≈ +4-5%
├── Price: +3% (company-wide, balanced between 2 segments)
├── Grid Infra volume: +HSD (say +7%) × 75% weight = +5.25pp
├── Grid Auto volume: -LSD (say -6%) × 25% weight = -1.5pp
└── HUS volume 净 ≈ +3-4pp
合计 HUS organic ≈ +6-7% (vs 管理层披露近 +7%)
```

**[DM-HUS-009]** **关键拐点**: 如果 Grid Automation 继续 -5~-10% (AMI 真空期), 同时 Grid Infrastructure 放缓到 +4-5% (tariff 头风), **2026 HUS organic 可能回落到 +2-3%, 而非管理层指引的 +5-7%**。

---

## 2. Electrical Solutions (HES) — 37% 收入, $2.16B (FY25)

### 2.1 子板块拆分 (估计, 未官方披露)

| 子板块 | 占 HES | 2025 Rev (估) | 2025 增速 | 关键产品 |
|--------|--------|--------------|---------|---------|
| Industrial & Commercial | ~55-60% | $1.20-1.30B | ~+LSD% | Wiring devices, rough-in, connector/grounding (RACO/Killark/Bryant) |
| **Data center 特定** | ~11-13% | **$225-275M** (FY25 估 $250M) | **+40-60%** | PCX modular power, Burndy 连接器, 专用 PDU |
| Lighting | ~20-25% | $450-550M | ~flat/declining | C&I lighting, 危险位置 |
| Industrial Controls | ~10-15% | $220-280M | ~+LSD% | Gleason Reel, Pauluhn |

**[DM-HES-001]** 数据中心 **$250M 占 HES 11.6% / 占全公司仅 4.3%** — **叙事大, 基数小**。
**[DM-HES-002]** HES 2025 OPM **首次 20%** — 驱动: operating leverage + 数据中心 mix + 3% price on 平坦 commodity (2025 H1 tariff 前) + productivity/lean。

### 2.2 HES 竞争格局 (数据中心 vertical 是真正的战场)

| 对手 | 2025 关键事实 | HUBB 相对位置 |
|------|-------------|-------------|
| **nVent (NVT)** | 2025 rev $3.89B (+29.5% YoY); Systems Protection Q4 +58% YoY, +34% organic; 10+ 年液冷部署 >1 GW | **nVent 数据中心增速 3x HUBB HES** |
| **Schneider Electric** | 全球数据中心物理基础设施 top-2 (与 Vertiv 并列) | 规模 >> HUBB |
| **Vertiv (VRT)** | 全球 top-2, busway 增长 +40% YoY (2024) | 规模 >> HUBB |
| **Eaton (ETN)** | Busway, switchgear, UPS 大玩家 | 规模 5x HUBB |
| **Legrand** | PDU, rack, cable management | 规模 ~1.5x HUBB |

**[DM-HES-003]** **HUBB 在数据中心不是主 switchgear/UPS/rack/cooling 玩家, 只在 "gray space" (connectors/grounding/wiring devices + PCX modular power)** — commodity-adjacent-with-spec-sheet 位置。
**[DM-HES-004]** **nVent Systems Protection Q4 2025 +58% (+34% organic)** vs HUBB 数据中心 +60%(Q4 base 小) — nVent 是在 "~$600M→$900M" 基数上增 34%, HUBB 是在 "~$50M→$80M/季" 基数上。**nVent 正在赢数据中心, HUBB 是 passive beneficiary**。

### 2.3 HES 护城河评估

| 维度 | 打分 | 证据 |
|------|------|------|
| 定价权 | 3/5 | 2025 +3% price, 靠品牌 (Hubbell Wiring Devices 130 年) + spec, 非 price setter |
| 转换成本 | 2/5 | 弱, electrician 可替换 |
| 规模经济 | 2/5 | 子规模 vs 数据中心前三 |
| 品牌/分销 | 3/5 | Rexel/Graybar/WESCO 渠道, 但非垂直集成 |

**HES 护城河**: **commodity-adjacent spec**, 弱于 HUS Grid Infrastructure, 强于商品照明。

### 2.4 HES 20% OPM 可持续性评估

**[DM-HES-005]** 支持论: 2025 Q4 adj OPM +140bps YoY, 管理层语言"momentum not peak"。
**[DM-HES-006]** 反驳论 (更强):
- 数据中心 12% of HES 以 ~25-30% OPM 贡献 ~300bps 的 HES OPM → 若数据中心增速从 +60% 降到 +15%, HES OPM 回落 100-150bp
- **铜 tariff 50% (Aug 2025 生效)** + 2026 mid-single-digit metals inflation, Q1-Q2 2026 GM 压力大
- Lighting 子板块结构性下滑 (20-25% of HES, 长期 headwind), 一旦数据中心拉动放缓即暴露

**结论**: HES 20% OPM **是 mix peak, 不是 new baseline**。2026 FY OPM 更可能回到 18-19%。

### 2.5 数据中心 channel — 未披露 (CQ)

- 2025 Q1-Q4 谁下单 HUBB 的数据中心产品? 直接 hyperscaler? 还是 EPC (Jacobs/Fluor/Turner/Mortenson) 中介?
- 行业结构提示**大多数经 EPC**, hyperscaler 直接关系在 Schneider/Vertiv/Eaton 手里
- HUBB 产品通过 general contractor 从 AVL 进入 → **被动分销, 非战略合作伙伴关系**
- [CQ-BLACKBOX-1] channel mix 是黑箱, 影响 HUBB 在 2026+ 数据中心减速下能否 hold 单位经济

---

## 3. M&A 轨迹 + ROIC 下滑原因 (主线 #4 校验)

### 3.1 2020-2025 并购清单

| Year | Target | Price | Rev 贡献 | Rationale | DM |
|------|--------|-------|---------|-----------|-----|
| 2020 Q4 | Beckwith Electric | $54M | $25-30M | Distribution automation relays | DM-MA-001 |
| 2020 Q4 | Armorcast Products | ~$140M | $40-50M | 专业 enclosures/distribution controls | DM-MA-002 |
| 2022 Jul | **PCX Corporation** | 未披露 | 数据中心主力 (~$100M+ 时收) | 数据中心/能源/商业 modular power | DM-MA-003 |
| 2022 Jul | Ripley Tools | $50M | $30-40M | Wire/cable prep 工具 | DM-MA-004 |
| 2023 Dec | **Systems Control** | **$1.1B** | 2024E $400M, 2025 $420-450M | Substation protection/control | DM-MA-005 |
| 2025 Oct | **DMC Power** | **$825M** | 2026E $130M / $60M EBITDA (40% OPM) / EPS +$0.20 | 高压连接器 (swage) | DM-MA-006 |

**[DM-MA-007]** **3 年内 $2.12B 大额并购** (Systems Control $1.1B + DMC $825M + PCX 未披露但显著) — 占当前 Goodwill+Intangibles $4.46B 的近半数。
**[DM-MA-008]** **DMC 倍数**: $825M / $60M EBITDA = **13.75x 2026E EBITDA** — 类似 Systems Control (~12x)。**倍数没有降**, 但 ROIC 反向走 — 意味着内部回报要求在下行。

### 3.2 ROIC 下滑的机械性拆解

**FMP 数据**:
- 2023 ROIC: 14.1% (Systems Control 年底并表, 未贡献)
- 2024 ROIC: 15.3% (Systems Control 首个完整年)
- **2025 ROIC: 13.8%** (DMC Power 10/1 closed, 加 $825M invested capital 但仅 3 个月 income)

**[DM-ROIC-001]** **2025 ROIC 下滑机械因子**:
1. **分母扩大 25%**: Invested Capital $5.12B → $6.38B (DMC + SC 完整 + buyback 少用)
2. **分子仅 +13%**: Op Income $1.09B → $1.22B
3. **DMC 时间错配**: $825M 全年占分母, 但仅 Q4 贡献 income → 2025 单一年 ROIC 被机械拉低 ~100bp

**[DM-ROIC-002]** **2026 ROIC 预估**:
- 如果 DMC 全年贡献 $60M EBITDA / ~$45M 税后 NOPAT, + Systems Control 继续 5-10% 增速, + 有机 EBIT +5%
- 分母: $6.38B + 50M (非现金资产增 + CapEx) ≈ $6.43B
- 分子: $1.22B × 1.08 + $45M (DMC 增量) ≈ $1.36B
- **2026 ROIC ≈ 14.7%** (比 2025 的 13.8% 恢复 90bp, 但仍低于 2024 的 15.3%)

**[DM-ROIC-003]** **结论**: 2025 ROIC 下滑部分是时间错配 (机械性, 不是结构性), 2026 会部分回归。**但即使回归到 14.7%, 仍低于 2024 的 15.3% — "高质量复利"叙事不再站得住**。

**[DM-ROIC-004]** **深层问题**: HUBB 近 4 年 $2.12B 并购 + $3.06B 商誉 + Tangible BVPS -$11 — 已经转型为"并购组装商"。如果再有一次大额并购 + ROIC 拒不恢复, **减值风险上升**。

### 3.3 Goodwill 减值悬剑 (Phase 2 待审)

**[CQ-GW-1]** 2018 年 Aclara 收购 $1.1B, 当前 Aclara 是 #3 硬件商、网络层 <10%、2025 收入下滑 — **理论上最高减值候选**, 但未见披露。Phase 2 需要 pull 10-K goodwill by reporting unit。

---

## 4. 预期差定位 (E→R→G→T, 完整版)

### 4.1 关键变量的 E (市场预期) vs R (数据现实)

| 变量 | E (市场) | R (数据) | G (差距) |
|------|---------|---------|---------|
| 2026 Revenue 增速 | +8.3% (consensus) | +5-6% (organic +2-3% + DMC +3%) | **-2~-3pp** |
| 2026 EPS | $19.71 (consensus) | **$18.50-19.20** (我们) | **-4~-6%** |
| 2026 HES OPM | 20%+ 持续 | **18-19%** (mix peak + tariff) | -100~200bp |
| 2026 HUS volume 增速 | +5-7% | +2-3% | -2~-4pp |
| ROIC 2026 | 15%+ 恢复 (复利叙事) | **14.5-15%** (部分恢复, 仍低于 2024) | -50~-100bp |
| 数据中心增速 | +50%+ 持续 | +30-40% (基数变大 + AI capex mass 成熟) | -10~-20pp |

### 4.2 Reverse DCF (当前价 $549 隐含什么?)

**假设**: WACC 8%, 终值增速 3%, 税后 FCF 近 $750M (2025 $875M 减 SBC $33M 再调整)
- 5 年增速 = **13% CAGR** (需要 EPS 2025 $16.54 → 2030 $30.40) 才能支撑 $549
- 10 年增速 = **9% CAGR** + 3% perpetuity 也能到 $549

**[DM-RDCF-001]** **当前股价 $549 隐含 HUBB 未来 5 年 EPS CAGR ≥ 13%** — 对比:
- 管理层指引 2026 EPS 中点 $19.50 = +17.9% YoY (但含 DMC 一次性 +$0.20 贡献 ≈ 1.2pp 无机增)
- 2023-2025 actual EPS CAGR = 15% (含两次大并购)
- 2026-2030 要 13% CAGR 需要 (a) 不放慢的超级周期 + (b) 持续成功并购 + (c) OPM 不压缩 — **三条件同时成立才 clear 当前价**

### 4.3 T (触发 / 跟踪点)

| 事件 | 时间 | 指标 | 判断方向 |
|------|------|-----|---------|
| 2026 Q1 earnings | ~2026-04-28 | HUS organic volume / HES OPM | 关键: Volume 是否转正 |
| 2026 Q2 earnings | ~2026-07 | 数据中心 revenue 趋势 / Copper tariff 吸收 | HES 压力测试 |
| 2026 Q3 earnings | ~2026-10 | ROIC 是否稳住 / 新并购 | 主线 #4 验证 |
| AMI 2.0 重大中标 | 2026-2027 | 任何 >500k endpoints 新单 | 次线正向 |
| 管理层 insider buying | 持续 | A/D ratio 回升 >1.5 | 主线削弱 |

---

## 5. Phase 0.75 主线校验

### 主线 #1 (价涨量跌): ✓ **强化**
- Grid Automation -18% 是 "stabilizing at a lower base" 不是 V 形 → **比 P0.75 想象的更糟**
- HUS volume 占 organic 增速不到 1/2, 大头是 price
- AMI 2.0 周期 2027-2028 真空 = **2 年时间窗**

### 主线 #4 (ROIC 下滑): **修正** — 从"纯负面"变成"时间错配 + 结构张力"
- 2025 -150bp 下滑中, **约 100bp 是 DMC 时间错配** (机械性, 2026 部分回归)
- 但即使 2026 恢复到 14.7%, 仍低于 2024 的 15.3% → "高质量复利"仍不站
- 3 年 $2.12B 并购 + Tangible BVPS -$11 → **"并购组装商"** 的基本判断不变
- **Aclara $1.1B (2018) 减值悬剑** — Phase 2 需查 10-K

### 次线 #2 (HES 错配): ✓ **弱化** (多头补丁更弱了)
- 数据中心仅占全公司 **4.3%** (之前认知)
- **nVent 正在赢数据中心** (Q4 Systems Protection +58% vs HUBB HES +60% but 基数 1:3)
- HES 是 commodity-adjacent, HUBB 是 passive beneficiary, 不是 active winner
- 20% OPM 是 mix peak 而非 new baseline → 2026 大概率回 18-19%

### 新发现 (P1 产生):
1. **Aclara 网络层份额 <10%** — 比想象更弱的护城河 (硬件 #3 没到核心价值层)
2. **Systems Control 2 年仅 5-10% CAGR** — 收购 thesis (teens) 未兑现
3. **HUBB 在数据中心 vertical 是 passive beneficiary, 不是 active winner** — nVent/Vertiv/Schneider 才是
4. **Reverse DCF 当前价隐含 13% EPS CAGR 5 年** — 靠什么实现?

### 主线微调 (进 Phase 2):
从"价涨量跌 + ROIC 下滑 + HES 错配"
→ **"价涨量跌 + 并购拼装失效 + 数据中心输给邻家 + 估值隐含三条都兑现"** (4 条互锁)

---

## 6. Phase 1 决策点 (非共识观察)

1. **HUBB 的故事不是"超级周期复利", 是"并购拼装 + price/productivity 收割 + 隐含数据中心不会减速"** — 三条都得对
2. **Aclara 在 AMI 2.0 的窗口打开时, 是弱玩家, 不是强玩家** — Itron/L+G 才是网络层主导者
3. **HES 数据中心增长是 channel 带动, 不是 spec 胜出** — 一旦 EPC 规格切换到 nVent/Vertiv, HUBB 份额下滑 (这是 12-24 个月 risk)
4. **ROIC 下滑一部分是机械性, 但"高质量复利"叙事已经失效** — 即使修复, 也回不到 2024 高点
5. **13% EPS CAGR 隐含定价是极度激进的** — 需要同时满足超级周期 + 成功并购 + OPM 不压缩
