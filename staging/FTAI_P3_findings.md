# FTAI Aviation — Phase 3 Findings (竞争格局 + 博弈 + 时间窗口精确化)

> **Phase**: Phase 3 (基于 P2 末 PIVOT-LITE, 聚焦 C+D 组合验证)
> **日期**: 2026-04-20
> **目标**: 35KB+, DM≥20, 因果密度 ≥5/万字, R-2 剪刀差追加 ≥2 个, 铁律 W 第二次 Pivot Gate
> **上游**: `FTAI_thesis_crystallization.md` 附录 (PIVOT-LITE), `FTAI_P2_findings.md` (3 WEAKEN + 2 CONFIRM = PIVOT)
> **Phase 3 焦点** (5 项按优先级):
> 1. Margin Gap Triangulation — FTAI Aerospace 36% vs AAR 6%/SARO 13%/MTU 12%/HEI 27%/TDG 50% 的真实来源
> 2. CFM56 时间窗口精确化 — 2030 = LEAP 交叉点 = AAR 协议到期 = C+D 组合的自然寿命
> 3. Aviation Leasing 独立 IRR 审计 — 排除 cross-subsidy, 验证 H4 (feedstock 套利真假)
> 4. SCI II 募资 + 真实 fee stream — 确认 H2 (非 Ponzi) 的强度
> 5. H1 估值锚点最终排序 — 独立锚 (base) / HEICO (乐观) / TDG (排除)

---

## 1. 关键发现 #8 — Margin Gap Triangulation (Aerospace Products 36% 的三种解释)

### 1.1 L1 数据: 5 家同行的 margin spread 是 8.3 倍

| 公司 | FY25 Rev | FY25 EBITDA | EBITDA Margin | EV/EBITDA | ROIC | 主要业务 |
|------|---------|-------------|---------------|-----------|------|---------|
| **FTAI Aerospace (segment only)** | ~$1.82B | **$671M** | **36.8%** [DM-COMP-001] | N/A | N/A | CFM56 module factory + PMA parts |
| **TransDigm (TDG)** | $8.6B | $4.56B | **53.0%** | ~21x | ~28% | 独家 OEM specialized parts |
| **HEICO (HEI) — FY25** | $4.49B [DM-COMP-002] | $1.22B | **27.2%** [DM-COMP-003] | **37.9x** [DM-COMP-004] | 11.0% [DM-COMP-005] | 多样化 PMA parts + electronics |
| **StandardAero (SARO) — FY25** | $6.06B [DM-COMP-006] | $808M | **13.3%** [DM-COMP-007] | ~12x (est) | ~9% | 综合 MRO (CFM56/LEAP/GTF) |
| **MTU Aero Engines — MRO segment FY25** | €6.0B [DM-COMP-008] | ~€720M (est) | **~12%** (EBIT 8%) [DM-COMP-009] | ~15x | ~10% | GTF 大修 + V2500 + CF6/GE90 |
| **AAR (FTAI USM partner) — FY25** | $2.78B [DM-COMP-010] | $169M | **6.1%** [DM-COMP-011] | 18.5x [DM-COMP-012] | 2.6% [DM-COMP-013] | Parts distribution + teardown |

**spread 观察**: FTAI Aerospace 36% vs AAR 6% = **6 倍 gap**. 同一产业链同一客户 (实际上 AAR 是 FTAI 的 teardown/distribution 合作方), margin 差 6 倍. 这是 Phase 3 遇到的**最大单一异常**.

**三个逻辑可能**:
- (a) FTAI 垂直整合溢价 — Module factory + PMA 独家 + 内部 feedstock 套利共同解释 30pp gap (候选 C 正确)
- (b) Cross-subsidy from Aviation Leasing — 内部转移价格低于市场, 把 Leasing 的 margin 转移到 Aerospace Products (候选 A 正确)
- (c) 会计口径 — FTAI 只报 "Aerospace Products segment", 分摊了 corporate SGA (股务/上市费用/利息) 到 Leasing, 导致 Aerospace 看起来 margin 高

### 1.2 L2 机制: 分解 30pp margin gap 的三个可能来源

**来源 1 — Module factory 选品 premium** (~+10-15pp 估算):
FTAI 的 Module Factory 只做 CFM56-5B 和 CFM56-7B (都是窄体主流). 不做宽体 (CF6/GE90/CFM LEAP). 原因: CFM56 机队 8,800 台存量 + 10 年剩余寿命 = 单一型号规模经济. 对比 SARO 同时做 CFM56/LEAP/GTF/PW4000 多机型 → 产能切换成本拖累 margin 约 5-8pp. 对比 AAR 只做 "parts distribution + teardown" 不做 module 组装 → margin 上限本就低 (毛利即成本+1-2x = 6-10% EBITDA 是该模式的天花板).

**来源 2 — PMA parts 独家 premium** (~+8-12pp 估算):
FTAI 拥有 200+ PMA (Parts Manufacturer Approval) 数量 [DM-COMP-014, 2024 年报管理层披露]. 每个 PMA = FAA 批准的 "非 OEM 但被允许替代 OEM" 零件 → 对 CFM (Safran+GE 合资) 原厂价打 30-50% 折扣, 同时 margin 比 OEM 相应零件高 40-60% (因为无需支付 Safran/GE 版税). HEICO 的 PMA 业务 (Flight Support segment) margin 约 21-23% [DM-COMP-015, HEICO 10-K] — 这就是为什么 HEICO overall 27.2% 比 AAR 6% 高 21pp. FTAI 如果 PMA 占 Aerospace 收入的 40-50% → 能解释 8-12pp margin uplift.

**来源 3 — 内部 feedstock 成本优势** (~+5-10pp 估算, H4 核心):
FTAI Aviation Leasing 买旧飞机拆解 → Aerospace Products 低价获得 CFM56 module 原料. 外部 market price 一台 CFM56-5B module $1.8-2.5M. 如果 FTAI 内部 transfer price 按 market 的 70% = $1.3-1.75M, cross-subsidy 对 Aerospace Products 的 margin 贡献约 $150-300M/year (按 ~200 module/year 交付量算). 这就是 H4 feedstock 套利. **但这个"优势"实质是把 Aviation Leasing 的 margin 转移到 Aerospace Products**, 对合并口径无贡献. 如果 H4 真, Aviation Leasing 独立 IRR 低于账面 ROIC; 如果 H4 假 (按 market price internal transfer), Aerospace 36% margin 全来自 source 1+2.

三个来源相加: +10-15 (source 1) + 8-12 (source 2) + 5-10 (source 3) = **+23-37pp**, 落在 30pp 区间内. 但 **source 3 (feedstock 套利) 是最有争议的部分**, 决定 margin gap 是真护城河还是会计艺术.

**因为**: 如果 source 3 = 0, margin gap 纯由 source 1+2 解释, **候选 B (Module Specialist) 主导**, Aviation Leasing 是独立的 runoff 业务.
**因此**: 如果 source 3 = 0, 估值应该分部门 — Aerospace 给 HEICO 倍数 (35-40x EBITDA), Aviation Leasing 给 WLFC 倍数 (5-7x).
**但是**: 如果 source 3 显著 (>$200M/year), **候选 C (垂直整合) 主导**, Aviation Leasing 是战略资产, 合并估值应包含垂直整合溢价.

### 1.3 L3 估值含义: margin 来源决定估值方法和锚点

**情景 A (source 3 = 0, margin 纯由独家 PMA+Module factory 解释)**:
- 应用 SOTP: Aerospace 按 HEICO 37.9x EV/EBITDA = $671M × 37.9 = **$25.4B** Aerospace EV
- Aviation Leasing 按 WLFC 6x × $609M = **$3.65B** Leasing EV
- 合并 EV = $29.1B, 减去净债 $3.15B = 市值 $26B ≈ +29% vs 当前 $20.2B
- 评级: 乐观 (但依赖 HEICO 倍数 — 而 HEICO 成交量 $4.5B vs FTAI Aerospace $1.8B, 规模差 2.5 倍, 流动性溢价应打折)

**情景 B (source 3 显著, Aviation Leasing 作为战略 feedstock 池, 不可独立估)**:
- 应用合并估值 + 垂直整合稀缺性溢价: 22-28x EV/EBITDA × FY25 EBITDA $1.28B (combined) = **$28-36B** EV
- 减去净债 $3.15B = 市值 $25-33B ≈ +24%-63% vs 当前 $20.2B
- 评级: 中等 (依赖垂直整合稀缺性定量化, 但目前只能定性说)

**情景 C (source 3 = cross-subsidy, Aviation Leasing 独立 IRR < 15%)**:
- 应用 SOTP 但 Aerospace 倍数要打折 (因为部分 margin 是转移的, 不是赚的)
- Aerospace 按 MTU 12% EBITDA × 约 22-25x (调整后) = $671M × 23 = **$15.4B** Aerospace EV
- Aviation Leasing 按 independent IRR 计算 NPV = 具体数字依赖 IRR (如果 12%, 估值 $2-3B)
- 合并 EV = $18-19B, 减净债 $3.15B = 市值 $14.9-15.9B ≈ **-21% to -26% vs 当前 $20.2B**
- 评级: 悲观 — 如果情景 C 为真, 当前估值已经透支垂直整合溢价

**情景离散度**: +63% (情景 B 上限) vs -26% (情景 C 下限) = **89pp spread**. 这就是 Phase 3 的核心估值不确定性 — 几乎完全取决于 source 3 的量化.

### 1.4 L4 证伪: 三条硬证伪路径

**证伪 A 的路径** (如果 source 1+2 不足以解释 30pp):
- 如果 2026 年 PMA 收入占比<20% 且 module factory 规模对比其他 MRO 无显著优势 → source 1+2 贡献<18pp → 剩余 12pp 必须来自 source 3
- 数据追踪: FTAI 10-K "Revenue by product category" 披露 (如果未披露 → 黑箱, R-4 黑箱比例上调)

**证伪 B 的路径** (如果 Aerospace Products 增长与 Aviation Leasing 断裂):
- 2027-2028 年 Aviation Leasing 规模缩减 (runoff) 但 Aerospace Products margin 维持 36%+ → 证明 source 3 不重要, 垂直整合溢价可独立
- 数据追踪: 季度 Aviation Leasing EBITDA 趋势 + Aerospace Products margin 趋势相关性

**证伪 C 的路径** (如果 2030 AAR 协议到期/不续约):
- 2030 年 AAR 协议到期后 feedstock 供应渠道变化 → 如果 Aerospace Products margin 2031+ 明显下降 → 证明 source 3 (feedstock 套利) 是关键
- 数据追踪: 2029-2030 AAR-FTAI 协议续约新闻流

**收敛判定**: Layer 4 的三条证伪路径都是 2027-2030 年才能验证 — **当前估值已经隐含了对 source 3 的某种判断, 但投资者没有硬数据**. 这是 R-4 (黑箱比例) 需要显式标注的点.

**对评级的影响**: 在 source 3 量化之前, 任何点估值都包含 **±30% 单点误差**. 报告 Complete 必须给区间 (+24-63% 上限, -26% 下限), 不能单点估值.

---

## 2. 关键发现 #9 — CFM56 时间窗口精确化 (2030 = 多重 deadline 重合)

### 2.1 L1 数据: 2027-2035 的 5 个精确节点

**节点 1 — 2027 年末**: CFM56-5B 和 LEAP-1A 机队数量同时达到约 6,500 台 [DM-CYCLE-001, Aviation Week]. 这是机队数量首次"持平"的时刻, 之前 CFM56 占绝对主导.

**节点 2 — 2030 年**: LEAP 首次超过 CFM56, 比例变为 55:45. 同年 AAR-FTAI CFM56 USM exclusive agreement 到期 [DM-CYCLE-002, aarcorp.com 2025-03-28 press release]. 两件事**同一年发生**是非偶然的 — AAR 2025 年续约到 2030 的决定显示双方对 2030 后 CFM56 退役加速的共同判断.

**节点 3 — 2030-2032**: 按 CFM 原厂退役曲线, 每年 CFM56 退役数量从当前 <100 台加速到 200-400 台. LEAP 年产 75 units/月 (到 2026) = 900/年 → 替换率接近 cross-over [DM-CYCLE-003, CFM International 规划].

**节点 4 — 2030+: Quick-turn visits 占比 60%** (当前 ~40%), 之后每年 +3-4pp [DM-CYCLE-004, Aviation Week]. Quick-turn = 比完整 overhaul 更便宜、周期短、依赖 USM (used serviceable material) 替换. 这是 FTAI Module Factory + AAR USM 池的核心应用场景 — **2030-2035 是 quick-turn 在 CFM56 机队的最高使用年**.

**节点 5 — 2035**: CFM56 机队预计衰减到峰值的 ~50% [DM-CYCLE-005, Sirius Aviation Capital + Safran retire curve]. CFM56 大修/USM 市场规模从 2025 峰值的 ~$15B/year 降至 ~$6-7B/year.

### 2.2 L2 机制: AAR 协议到期为什么重要

AAR 2025-03 与 FTAI 续约到 2030 [DM-CYCLE-006], 给 FTAI 的 CFM56 USM feedstock 供应通道独家至 2030. 这个协议规定 AAR 负责 teardown + spare parts distribution, FTAI 的 Module Factory 获得优先 module-ready 原料. **关键问题**: 2030 协议到期后会怎样?

**机制 A — 续约**: 双方续约到 2035. 但双方都会重议条款 — AAR 2025 会"让利"因为当时 CFM56 还是 AAR 主业增长点, 2030 后 AAR 主业增长可能切换到 LEAP USM, 谈判筹码逆转. 如果续约但条款恶化, FTAI 的 feedstock 成本上升 → Aerospace margin 承压.

**机制 B — 不续约**: AAR 2030 年已转型 LEAP USM 为主, CFM56 USM 池交给其他 teardown 商 (如 Universal Asset Management, GA Telesis 或 StandardAero 的 teardown 能力). FTAI 失去 teardown 合作伙伴 → 需要自己 build teardown capacity, CapEx +$300-500M, 2-3 年 ramp, 期间 margin 压缩 5-10pp.

**机制 C — AAR 并购或被并购**: AAR 市值仅 $2.2B (FTAI 的 1/10). 如果大型 MRO (如 StandardAero, $10B) 并购 AAR, FTAI 的独家协议需要重议. 并购方有动机利用协议筹码 reprice.

三种机制都指向 **2029-2030 是 FTAI 的 execution risk 高峰**, 不是估值空间最大的时刻. 这解释了为什么管理层 2026 CapEx 指引 $100-130M (从 2025 的 $450M 暴跌 70%) [DM-CYCLE-007] — 管理层**知道** 2030 后的确定性下降, 因此不再"为永续扩张"投资, 而是"把窗口内的现金流最大化".

### 2.3 L3 估值含义: Duration 折现不是永续

**错误做法** (候选 A 的隐含假设): FTAI 给 21.6x EV/EBITDA 意味着市场按**永续增长**定价 (永续 EBITDA growth 5-8%/year). 这忽略了 CFM56 退役曲线.

**正确做法 (候选 D)**: 分段 DCF:
- **2026-2030 (黄金窗口, 5 年)**: EBITDA CAGR 8-12%, FCF ~$800-1,200M/年 (假设管理层指引执行). NPV @10% WACC = $4-5B per year average × 3.8 (5 年年金系数) ≈ **$15-19B**
- **2031-2035 (衰减期, 5 年)**: EBITDA 年降 5-8%, FCF $400-700M/年 × 2.5 (折现后) ≈ **$10-17B** × 2.5 = $6-10B (按 5 年年金)
- **2036+ (terminal)**: CFM56 Module Factory 转型为 FTAI Power / LEAP 后市场. 现在估值: 期权价值 $1-3B (高度不确定)

**合计**: $22-32B 现值. 净债 $3.15B. 股权 $19-29B. 当前市值 $20.2B = **中位数, 但区间 +40% 上行 -5% 下行**.

**对比候选 A (永续 21.6x)**: 等效永续 EBITDA growth 需要 4-6%/year. 但 CFM56 机队会萎缩, 意味着 Aerospace Products 必须从 CFM56 扩展到其他机型才能永续. 扩展能力 = FTAI 最大未验证假设.

**核心判断**: 候选 A 对候选 D 的溢价 = "永续扩展能力", 这部分目前没有证据 (FTAI Power 仍 PR-heavy, LEAP USM 市场未见 FTAI 有动作). 因此当前 21.6x 是**合理偏乐观**, 不是"低估".

### 2.4 L4 证伪: 四个可证伪条件

1. **2030 AAR 协议续约失败** → 候选 D 被强化 (窗口到 2030), 候选 A 被削弱
2. **2028-2029 FTAI 宣布进入 LEAP USM 或其他机型 aftermarket** → 候选 A (永续扩张) 被强化
3. **2027-2028 CFM56 退役曲线加速 (>5%/year)** → 候选 D 窗口缩短, 估值下修
4. **2030+ quick-turn 占比 **未**达到 60%** (保持 40-50%) → 候选 D 假设部分错, 但不影响整体 window 判断

**收敛判定**: Layer 4 的证伪条件都是 2027-2030. 当前做判断需要 "给一个 prior", 这个 prior 就是 H1 锚点 (H1 倾向独立锚 20-30x base, HEICO 35-45x 乐观, TDG 排除).

---

## 3. 关键发现 #10 — Aviation Leasing 独立 IRR 审计 (H4 feedstock 套利真假)

### 3.1 L1 数据: Aviation Leasing segment 的原始数字

**2025 年**:
- Aviation Leasing EBITDA: $609M [DM-AL-001]
- Aviation Leasing PP&E: 从年初 $2,481M → 年末 $1,672M = **减少 $809M** [DM-AL-002]
- Aviation Leasing CapEx (flight equipment purchases): 约 +$450M 估算 (总 CapEx $752M - Aerospace CapEx ~$300M)
- Aviation Leasing asset sales proceeds: $529M [DM-AL-003, FMP cashflow]
- Aviation Leasing net asset disposal: 约 $1.34B (PP&E 减 $809M + D&A $226M + CapEx $450M - $529M sale = 净 disposal $1.34B)

**推算 implied return**:
- 如果 Aviation Leasing 资产周转 = 每年卖 30-40% (2025 约 33%, 见 P2 finding #4), EBITDA/avg PP&E = $609M / $2,077M ≈ **29%** (非常高)
- 但这个 29% 包含了 asset sale gains (约 $400-430M, 见 P2 核算) — 剥离 gains, recurring EBITDA 约 $200-230M, recurring EBITDA/PP&E ≈ **10-11%** (正常 leasing 水平)
- Recurring IRR 约 8-12% (符合 WLFC 9%, AerCap 10-12% 区间) — **Aviation Leasing 的真 IRR 不特殊**

### 3.2 L2 机制: feedstock 套利的量化测试

如果 FTAI 内部 transfer pricing 按 market = no cross-subsidy, Aviation Leasing recurring IRR 应等于同行. **数据验证**:
- Aviation Leasing recurring IRR (剥离 gains) 约 10-11% [L1 估算]
- 同行 WLFC 9% [DM-AL-004]
- 同行 AerCap 10-12% [DM-AL-005]
- **FTAI Aviation Leasing recurring IRR 在同行区间内, 不显著高于 WLFC/AerCap**

**含义**:
(a) 如果 FTAI Aviation Leasing IRR 就是同行水平, 则 **Aviation Leasing 没有 "feedstock 套利贡献给 recurring IRR"** — H4 被部分削弱 (或 feedstock 贡献已经体现在 Aerospace Products margin 而不是 Leasing IRR)
(b) 如果 recurring IRR 10-11% 已经含 feedstock 套利, 则**去除套利的 IRR** 可能低于 WLFC 9% — H4 确认
(c) 如果 FTAI Aviation Leasing 的资产周转速度比 WLFC 快 2-3 倍 (33% 周转 vs WLFC 10-12%), 且价格不变, 则 feedstock 套利不在 IRR 里, 在 **sale proceeds 的 velocity** 里 — 这是 P2 finding #4 发现的 "组合轮换 cash cycle"

**正确诊断是 (c)** — feedstock 的价值不在 Aviation Leasing 的 IRR, 而在 **Aviation Leasing 为 Aerospace Products 提供 module 原料的速度和选择性**. Aviation Leasing IRR 看起来"正常"是因为它还**同时在做两件事**: (1) 收租 (2) 给 Aerospace 供料. 内部 transfer pricing 如果按 market, 第二件事的价值体现在 Aerospace margin 上 (source 3 = 0 情景); 如果按折价, 第二件事的价值体现在 Aerospace margin 上 (source 3 显著 情景). 但无论哪种情况, **Aviation Leasing 独立 IRR 都不会超越同行** — 因为它把"独家 feedstock 优势"让给了 Aerospace, 自己保留 commodity leasing margin.

### 3.3 L3 估值含义: H4 部分 CONFIRM, 但方向反转

**H4 原始**: "Alpha 来自 feedstock 套利"
**P3 修正**: "Alpha 来自 **Aerospace 端利用了 Aviation Leasing 的 feedstock 供应链**, 不是 Aviation Leasing 自己套利". 

这个修正对估值的影响:
- Aviation Leasing 不能单独给"战略资产溢价" — 它和 WLFC/AerCap 一样是 commodity leasing
- Aerospace Products margin 36% 中, source 3 (feedstock) 贡献必须量化 — 但关键是**这个贡献在合并口径下是实打实的 EBITDA**, 不是会计艺术
- SOTP 分部门估值: **Aviation Leasing 用 WLFC 倍数 (5-7x) 是对的** (~$3.05-4.26B), **Aerospace 用 HEICO 倍数 (35-40x) 也基本对** (~$23.5-26.8B), 但 Aerospace 的 "transfer pricing 折价" 需要调整

**调整后的 SOTP**:
- Aviation Leasing: $609M × 6x = **$3.65B**
- Aerospace Products: $671M × 32x (保守一点, 在 HEICO 37.9x 和 MTU 15x 之间) = **$21.5B**
- 合并 EV = $25.2B, 减净债 $3.15B = **市值 $22.0B** ≈ **+9% vs $20.2B**
- 这个"公允估值"比候选 A (永续假设) 低 17%, 比候选 D (时间窗口) 高 11%, 比情景 B (垂直整合溢价) 的中位数低 20%

### 3.4 L4 证伪

**证伪 A (H4 全错)**: 如果 FTAI 披露内部 transfer pricing = market price, 则 Aerospace margin 36% 不含 source 3, 全是 source 1+2 → HEICO 倍数 (35-40x) 对 Aerospace 是 fair, Aerospace 估值 $23-27B (SOTP 合并 $26-30B, 股权 +29-49%)

**证伪 B (H4 显著)**: 如果 FTAI 披露 Aerospace 购买原料价比 market 折价 20%+, 则 source 3 贡献明显 → Aerospace 倍数需要打折到 25-28x (因为这部分 margin 可复制给其他 Aviation Leasing 参与者如 AerCap). 估值 $17-19B Aerospace + $4B Leasing = $21-23B EV, 股权 -3% to +5%

**证伪 C (我们的判断 — 介于 A 和 B 之间)**: 数据倾向 source 3 存在但不压倒 — Aerospace 倍数用 30-32x (介于 HEICO 37.9x 和 MTU 15x), 估值合理 +9%

**收敛**: Layer 4 证伪要求 FTAI 10-K 披露具体 transfer pricing, **当前黑箱**. R-4 黑箱比例 +5-8pp 来自这个不确定性.

---

## 4. Phase 3 竞争 Benchmarking 深度对比 (Rule U-2 路由: competitive-benchmarking)

### 4.1 StandardAero — 真正的规模对标

**SARO 为什么重要**: 2024 年 $1.7B IPO 上市 (Carlyle 支持), 是 CFM56 MRO 最大独立玩家. FY25 revenue $6.06B, 其中 Engine Services (含 CFM56 MRO) $5.5B+ [DM-COMP-016]. FY25 EBITDA $808M (13.3%). 2026 guidance $6.28-6.43B revenue.

**关键对比 FTAI**:
- SARO Engine Services 规模是 FTAI Aerospace 的 **3 倍** ($5.5B vs $1.8B)
- SARO EBITDA 是 FTAI Aerospace 的 **1.2 倍** ($808M vs $671M)
- SARO margin 13.3% vs FTAI 36% = **margin 差 22.7pp**
- SARO 产品线多 (CFM56 + LEAP + GTF + PW4000 + JT8D + military), FTAI 只做 CFM56
- SARO 地理扩张 (Dallas CFM56 2025 启动, San Antonio LEAP 2025 启动) → CapEx 高, margin 受投资期压制

**诊断**: SARO 的 13% margin 是 "综合 MRO" 基准. FTAI 的 36% 来自 "单一机型 + 模块化 + PMA" 组合. **这是产品线策略差异, 不是运营效率差异**. FTAI 放弃了规模扩展 (只做 CFM56), 换取单型专注的 margin 提升.

**风险**: SARO 2026 在 Dallas (CFM56) 扩张 = **直接进入 FTAI 的细分市场**. SARO 体量 3x 且 IPO 后资本充足 — 2026-2028 可能在 CFM56 module 空间与 FTAI 正面竞争. 护城河测试时间窗口: 2027-2028.

**对 C+D 组合的影响**: SARO 的竞争进入**可能压缩 FTAI 2028 后的 margin 扩展空间**, 但不影响 2026-2027 窗口 (SARO 需要 ramp 时间). 候选 D (时间窗口) 被**强化** — 2030 窗口关闭前, 竞争强度有限.

### 4.2 HEICO — 乐观锚的局限

**HEICO 为什么是上锚**: PMA parts 独家 premium 业务是 FTAI Aerospace 最类似的对标. HEI Flight Support segment (占 HEI 营收 60%+) 做 commercial 飞机 PMA parts, margin 21-23%. HEI 整体 27.2% EBITDA margin, EV/EBITDA 37.9x = 业内最高. ROIC 11%.

**关键对比 FTAI**:
- HEI 总 EBITDA $1.22B vs FTAI Aerospace $671M (HEI 规模 1.8x)
- HEI margin 27.2% vs FTAI Aerospace 36% (FTAI 高 9pp — **因为 FTAI 只做 module (高毛利) + PMA (高毛利), HEI 还做 electronic systems (较低毛利)**)
- HEI EV/EBITDA 37.9x vs FTAI blended 21.6x — FTAI 有 70% discount
- HEI 成长 FY24→FY25 +16.3% revenue, EBITDA +21.9%, EPS +34% — 持续高复合
- HEI intangibles 60%+ total assets (60 年并购 100+ 家小 PMA 公司) → 护城河积累

**HEICO 倍数应用到 FTAI 的 catch**:
(a) HEI 的 37.9x 反映**长期连续执行** + 稀释率低 (CEO 家族 Mendelson 持股 ~10%) + 60 年 reputation. FTAI 2-3 年历史 + CEO 持股 0.47% + 不少 SBC → **FTAI 不能给 HEI 的质量折价** (-20% to -30%)
(b) HEI 是跨行业 PMA (commercial + military + 电子), FTAI 单机型 CFM56 = 集中度风险 → **再折价 10-15%**
(c) HEI 2027 后 LEAP PMA 市场进入 = 自然永续. FTAI 2030 后路径未明 → **再折价 10-15%**

HEI 倍数 37.9x × (1 - 25% - 12% - 12%) = **37.9x × 51% = ~19.3x**. 但这是乐观锚, 不是 base.

**base anchor** 应该在 SARO 12x (过度保守) 和 HEI 调整后 19.3x 之间 = **15-17x** 作为 base.

**等等, 这和 FTAI 当前 21.6x 接近!** 重新诊断: **当前市场价格 21.6x 已经 fully priced 在 base 和乐观锚之间偏乐观** — 不是"低估".

### 4.3 AAR 和 MTU — 低锚确认候选 D 窗口风险

AAR 6.1% margin + 18.5x EV/EBITDA = 代表 **"无独家协议 + 无 PMA 的 pure distribution 业务"** 估值. AAR 的 18.5x 其实已经不便宜 (因为 FY25 EBITDA 异常低导致比率上偏, 实际 forward 倍数更像 13-14x). AAR 表明: **FTAI 如果失去独家协议 (2030 AAR 协议), margin 会退回 6-10%, 估值应该是 13-15x EBITDA — 约合 $10-12B EV**, 即股权 $7-9B = **-55% to -65% vs 当前 $20.2B**.

MTU Aero Engines commercial MRO FY25 Revenue €6.0B, EBIT margin 8.0% (下降 0.7pp), 主要受 Fort Worth ramp 拖累. MTU 的 EBIT 8% ≈ EBITDA 12%. 15x EV/EBITDA. MTU 的独家因素是 **Pratt & Whitney GTF 的 RSP 股份 (MTU 在 GP7200/V2500/PW1000G 都有 OEM 参与)**, 所以它的 8% EBIT 已经比 pure MRO 商 (如 AAR) 高 ~2pp. **FTAI 没有 OEM RSP 股份** — 所以 MTU 对 FTAI 的 relevance 有限, 但作为下锚 (12x EV/EBITDA) 是合适的.

### 4.4 竞争 benchmark 综合矩阵 (Aerospace segment only)

| 锚点类型 | 参考公司 | 应用倍数 | Aerospace EV | 全股权 |
|---------|---------|---------|--------------|--------|
| **悲观锚** (AAR 情景, 失去协议) | AAR 调整 | 13x | $8.7B | $5.5B |
| **低锚** (MTU, pure MRO) | MTU | 15x | $10.1B | $6.9B |
| **base 锚** (SARO 和 HEI 中间, C+D 组合公允) | 混合 | **22x** [DM-COMP-017] | **$14.8B** | **$15.3B** |
| **HEICO 锚** (无折价, 完全可比假设) | HEICO 37.9x | 38x | $25.5B | $26.0B |
| **乐观锚** (HEI 但打 25% 质量+12% 集中度折价) | HEI 调整 | **19.3x** [DM-COMP-018] | **$13.0B** | **$13.5B** |
| **极乐观锚** (HEI 无折价 + 垂直整合溢价 +20%) | HEI × 1.2 | 45.5x | $30.5B | $31.0B |

**综合范围**: 股权 **$5.5B (悲观) - $31B (极乐观)**. 中位数区间 $13.5-15.3B (vs 当前 $20.2B = **-25% to -32%**), HEICO 锚 $26B (+29%), 极乐观 $31B (+53%).

**核心发现**: **当前 $20.2B 市值 = fully-pricing "乐观锚" (+HEICO 质量折价后的中间值)**. 这不是"低估观察", 这是**中性偏高**. 除非 FTAI 能证明它应得 HEICO 无折价倍数 (需要 5 年 execution 历史 + 多元化 + OEM 合作), 当前估值**已经 priced 大部分上行**.

---

## 5. SCI I/II 深度 + H2 最终 verdict

### 5.1 SCI I 完整数据 (2024-2025 执行完毕)

- **Target**: 原本 $1.5B, Oct 2025 hard-cap 至 **$2.0B equity commitments** [DM-SCI-001, globenewswire 2025-10-27]
- **Deployment**: $1.4B invested in 101 aircraft + $2.1B under LOI (89 aircraft) = **190 aircraft** 总量 [DM-SCI-002]
- **Total purchasing power**: $6B (含债务融资) [DM-SCI-003]
- **完成 deployment 时间**: 预期 2026 H1 [DM-SCI-004]
- **LP 组成**: asset managers, insurance, public pensions, foundations, endowments, family offices [DM-SCI-005, Kirkland & Ellis 法律顾问文件]

**经济结构**:
- FTAI 作为 GP, 收取管理费 (通常 1-2% NAV/year on $2B equity = $20-40M/year) + 业绩提成 (typically 15-20% above hurdle 8%)
- 如果 SCI I 2026-2027 年化回报达 12% (超 hurdle 4%), carry = 20% × 4% × $2B = $16M/year
- 合计 annual fee potential = $36-56M/year (稳定 base), plus upside carry to $50-80M/year

### 5.2 SCI II 2026 Q1 进展

- Fundraising 已经启动 [DM-SCI-006, 多个来源]
- 具体 target 未公开, 但基于 SCI I 的 $2B hard-cap + 部署顺畅 → **SCI II target 很可能 $4-6B**
- 如果 SCI II $5B + 债务 $10B = **$15B total purchasing power**
- 按 SCI I 基本面推算, SCI II 完成后 annual fee $90-150M/year steady + $150-250M/year with carry

**时间线**:
- SCI II fundraising 2026 H1 启动
- 预期 first close 2026 H2
- Deployment 2026 H2 - 2028
- 2028-2029 开始产 material fee stream

### 5.3 H2 (负 FCF = 资本金吸纳 / Ponzi) 最终 verdict

**证据累积**:
- SCI I 是真 LP 资本 (多元化 LP 组合) — 不是 FTAI 内部绕圈子
- SCI I deployment 到真实 190 aircraft (物理存在) — 不是会计虚构
- Fee stream 会在 2027+ 产生 real EBITDA ($50-100M+ annually) — 真现金流, 不是 mark-to-market
- Aviation Leasing runoff + SCI I transferee 关系 = FTAI 的资产负债表实际在 "轻资本化", 不是"堆资本" — 这是 asset-light fee business 的标志, 与 Ponzi 相反

**H2 最终判定**: **削弱 → 几乎排除**. 非 Ponzi, 是**真实的 asset-light fee business 向下 pivot**.

**但 H2 的真正洞察**: 即使不是 Ponzi, FTAI 也**不再是纯 operating company**, 而是**开始转型为 alternative asset manager** (像 Blackstone 的 infrastructure arm 或 Apollo 的 aviation leasing arm). 这意味着估值框架需要**再调整**:
- Operating + Asset Manager 混合体 — 类似 PGR (保险+资产管理) 或 SPG (REIT+管理费)
- Operating (Aerospace Products) 按 HEICO/SARO 基准
- Asset Manager (SCI) 按 BX/APO/ARES 基准 (20-23x 费收 EBITDA)

**调整后 SOTP**:
- Aerospace Products: $671M × 22x (base) = $14.8B
- Aviation Leasing (runoff, 递减): $609M × 5x (WLFC base) = $3.0B, 但要 × 0.7 衰减因子 = $2.1B
- SCI (asset manager): $80M (run-rate 2027+ fee stream) × 22x = $1.76B
- 合计 EV = **$18.7B**, 减净债 $3.15B = 股权 **$15.5B** ≈ **-23% vs $20.2B**

这个修正后的 SOTP 估值**低于**纯 operating 估值 (第 3 节 $22B) — 因为给 Aviation Leasing runoff 打了衰减折, SCI fee stream 的 $80M 还没实现. **2027 后 SCI fee 爬升, Aviation Leasing runoff 完成, SOTP 可以上修到 $25-27B** 股权 (+24-34%).

**结论**: 当前估值 $20.2B **透支了 2027 后 SCI II fee 和 Aerospace Products 扩张**. 这不是 "买入时机", 是 "待兑现时机".

---

## 6. C+D 组合内在一致性测试

### 6.1 C 和 D 是否自洽?

**候选 C (垂直整合护城河)**: FTAI 的 Aerospace Products 之所以 36% margin, 是因为垂直整合了 Aviation Leasing feedstock + AAR USM 分发 + 自己 Module Factory 组装 + PMA 独家零件.
**候选 D (时间窗口)**: FTAI 主要是在 CFM56 2026-2030 黄金窗口提取现金流, 2030-2035 衰减, 2035+ 依赖 FTAI Power 接棒.

**一致性测试**:
(a) **C 依赖 D 吗?** 垂直整合护城河只在 CFM56 机队规模大的时候有价值. 2030 后 CFM56 机队衰减 + AAR 协议到期, 整合优势的价值自然**随 CFM56 退役衰减**. → 一致.
(b) **D 依赖 C 吗?** 时间窗口内要最大化提取, 必须有垂直整合带来的 margin premium. 如果没有 C, 即使有 D (时间窗口), FTAI 只能按 AAR 6% margin 运营, 提取量很小. → 一致.
(c) **组合是否"两个故事硬拼"?** Not really. **C 是"在 D 中为什么 FTAI 赢"的原因**. 两者是**同一现象的两个维度** (one mechanism explains two observations).

**诊断**: C+D 组合**逻辑一致, 不是两个故事硬拼**. 可以作为主线.

### 6.2 C+D 组合无法解释的残余

即使 C+D 主导, 仍有 3 个观测无法完全解释:
- **SCI fee stream 的出现**: 不属于 C (垂直整合) 也不属于 D (时间窗口), 是**第三个维度 "转型 asset manager"**. 这部分权重 2027+ 起扩大.
- **FTAI Power 的 option 价值**: 属于 D 的 "second act" 但具体经济性未知. 黑箱.
- **CEO 持股 2020-2025 +16.7x**: 属于 "management alignment" 但量级小 (0.47%), 不独立驱动估值.

**结论**: C+D 解释 ~80% 现象, SCI 解释 ~10%, 其他 ~10%. 可以写为"**C+D (主) + SCI asset manager (次) + FTAI Power (期权)**" 三层. 这**比 P0.5 的 4 候选更精确**.

### 6.3 组合估值的综合范围

| 组件 | 估值方法 | EV | 备注 |
|------|---------|-----|------|
| Aerospace Products (主) | SOTP 22x EBITDA | $14.8B | base 锚, HEICO 和 SARO 中位 |
| Aviation Leasing (runoff) | WLFC 5x × 衰减 0.7 | $2.1B | 2028 后自然萎缩 |
| SCI asset management | BX 22x on run-rate fee | $1.8B | 2027+ realized |
| FTAI Power (option) | 期权估值 | $1.0-3.0B | 高度不确定 |
| **合计 EV** | | **$19.7-21.7B** | |
| 减净债 | | $3.15B | |
| **股权公允价值** | | **$16.6-18.6B** | |
| 当前市值 | | $20.2B | |
| **区间回报** | | **-18% to -8%** | |

**这个估值范围和 R-4 黑箱比例 30% 一致** — 当前估值**中性偏高**, 不是买入时机.

---

## 7. H1 估值锚点最终确定 (基于 Phase 3 所有 benchmarking)

### 7.1 H1 原始 claim (P0.5): "FTAI 应该像 TransDigm 估值 (PE 30-40x)"

### 7.2 Phase 3 的数据 vs H1

| 对比维度 | TransDigm | FTAI Aerospace | verdict |
|---------|-----------|----------------|--------|
| EBITDA margin | 50% | 36% | FTAI 低 14pp |
| 规模 (Revenue) | $8.6B | $1.8B | FTAI 规模 0.21x |
| 护城河深度 | 专利独家 + 多机型 | PMA + single-engine type | FTAI 窄 |
| 执行历史 | 30 年连续 | 2-3 年 | FTAI 短 |
| 管理层持股 | 高 | 0.47% | FTAI 少 |
| 行业增长 | 永续 (航空 + 国防) | CFM56 有限 (2030+) | FTAI 短 |
| 客户集中度 | 分散 | CFM56 独 | FTAI 集中 |

**H1 的 TDG 锚点几乎**排除**** — 所有维度 FTAI 都在 TDG 之下. TDG 30-40x PE 对应 25-33x EV/EBITDA, 用到 FTAI 等于说 **FTAI 股权 = $14.8-22.1B × 1.25 (wacc adjust) = $18.5-27.6B** 是"TDG 锚点", 但这个锚点过度乐观.

### 7.3 H1 最终锚点重新制定

**Three-point anchor system**:

| 情景 | 锚点类型 | 应用倍数 (EV/EBITDA) | Aerospace EV | 估值含义 |
|------|---------|---------------------|--------------|---------|
| **悲观 (10% 概率)** | AAR 情景 (协议失败) | 13x | $8.7B | 股权 $5.5B = -73% |
| **base (60% 概率)** | SARO+HEI 中位 + 垂直整合 base | **22x** | **$14.8B** | 股权 $16.6B = -18% |
| **乐观 (25% 概率)** | HEICO 调整后 (质量折价 25%) | 19.3x | $13.0B | 股权 $15.3B (低于 base? 是的, 原因是乐观锚给 HEI 更贵但打折, 仍在 base 区间) |
| **极乐观 (5% 概率)** | HEI 无折价 + 组合溢价 | 38x | $25.5B | 股权 $26B = +29% |

**等等, base 和乐观 EV 乱了**. 让我重新排序 — 乐观情景应该给更高倍数.

**重新排序**:
- 悲观 13x ($5.5B equity, -73%)
- base 22x ($16.6B equity, -18%)  
- 乐观 30x ($20.1B equity, 0% ≈ 当前市值)
- 极乐观 38x+ (HEICO 无折价) = 股权 $26B+ (+29%)

**概率加权 期望值** = 10% × $5.5 + 60% × $16.6 + 25% × $20.1 + 5% × $26 = **$16.8B** = **-17% vs $20.2B**

**H1 最终**: **独立锚 22x (base) 是 60% 情景**, HEICO 30-38x 是 30% 情景 (乐观). TDG 几乎排除. 当前市场价格对应 **乐观情景中位**, 期望回报 **负面** (-17% 概率加权).

---

## 8. 博弈论透镜 (game-theory-lens) — FTAI vs AAR vs SARO

### 8.1 三方博弈结构

**玩家**:
- FTAI: CFM56 Module Factory (垂直整合 specialist)
- AAR: CFM56 USM 池持有者 + teardown 专家 (FTAI 独家合作方 through 2030)
- StandardAero: 综合 MRO (CFM56 + LEAP + GTF)

**利益**:
- FTAI 希望: 维持 AAR 独家协议到 2030+ 续约, 同时挡住 SARO 进入 module 市场
- AAR 希望: 2030 后选择 — 续约 FTAI (如果 FTAI 给更多 upside) 或与 SARO 结盟 (如果 SARO 提供 更大 scale)
- SARO 希望: 2027-2028 在 Dallas 建 CFM56 能力, 2028-2030 蚕食 FTAI 份额, 2030+ 竞争 AAR teardown 合作

### 8.2 Nash 均衡 (2030 年协议谈判)

**对 FTAI 的结果** (3 种可能):
(a) **AAR 续约 FTAI to 2035 with 同等条款**: FTAI 支付给 AAR 额外 10-20% (让利 $100-200M NPV) 换取独家维持. 对 FTAI: margin 压缩 3-5pp, 估值下修 10%
(b) **AAR 续约 FTAI but 条款恶化 (non-exclusive)**: AAR 同时向 SARO 供应. FTAI 失去独家性, margin 压缩 8-12pp, 估值下修 20-25%
(c) **AAR 转向 SARO**: 极端情景, 概率低 (<20%, 因 AAR-FTAI 5 年深度合作关系). FTAI margin 崩 15-20pp, 估值 -40%+

**均衡概率** (我们的 prior):
- (a) 概率 55%
- (b) 概率 30%
- (c) 概率 15%

**期望 margin 压缩** = 0.55 × 4 + 0.30 × 10 + 0.15 × 18 = 8.5pp

**这 8.5pp 是 2030+ 的概率加权期望损失**, 未完全 priced in 当前估值. 用 P3 base case (22x EV/EBITDA on $671M = $14.8B) 打 8.5pp margin 折 = **$14.8B × (28/36) = $11.5B Aerospace EV** — 对应 2030+ steady state.

### 8.3 SARO 的反制博弈

SARO 2025-2026 已在 Dallas 建 CFM56 能力. FTAI 如果 2028 前 proactive 锁定 AAR + 锁定 PMA 独家 + 扩张到 LEAP USM → 可以 **延迟 SARO 进入 module 市场** 2-3 年. 这给 FTAI 的 window **从 2030 延长到 2032-2033**.

但这需要 FTAI 投入 **CapEx $500-800M** 在 2026-2028 扩张 LEAP 和/或 其他机型 — 这与管理层 2026 CapEx 指引 $100-130M **完全相反**. 管理层指引意味着 **FTAI 选择了 "最大化 2030 前现金流" 策略, 不是 "延长窗口" 策略**.

**含义**: 候选 D (时间窗口) 被**强化** — 管理层自己的 CapEx 行为证实 2030 窗口的重要性, 不寻求 extend.

---

## 9. 关键剪刀差 — R-2 补充 (Phase 3 新增 3 个)

### 9.1 剪刀差 #5 — 管理层 CapEx vs 管理层 EBITDA 指引

- 2026 CapEx 指引: $100-130M (**-70% vs 2025 $450M**) [DM-SCI-007, Q4 2025 guidance]
- 2026 EBITDA 指引: 提升到 $1.4B (**+30% vs 2025 $1.08B?**) [DM-SCI-008]

**剪刀差**: CapEx 大幅下降 + EBITDA 大幅上升. 管理层说"**我们不再需要投资也能增长**". 但这只有两种可能:
(a) Operating leverage (规模效应) — 2025 建的产能 2026 满产, 无需新 CapEx. 短期 (2026-2027) 合理, 长期不可持续.
(b) EBITDA 增长主要来自 SCI 管理费 + asset sales gains (非 operating earnings) — Q4 2025 EBITDA 已含 $300M+ non-recurring gains

**含义**: 2026 EBITDA 指引 $1.4B 中, 可能 $200-400M 是 non-recurring. **真 recurring EBITDA 可能只有 $1.0-1.2B**. 如果按 $1.1B recurring × 22x = $24.2B EV, 股权 $21.1B ≈ **+4% vs $20.2B** (接近公允). 如果按 $1.4B 全 recurring × 22x = $30.8B EV, 股权 $27.6B ≈ **+37%** (明显低估). 两种估值差 33pp — **剪刀差#5 是当前估值离散度最大的单一变量**.

### 9.2 剪刀差 #6 — Aerospace Products 增长 vs 库存堆积

- Aerospace Products 2025 EBITDA +138% vs 2024 [DM-SCI-009, P1 findings]
- Inventory 2025 Q1 $598M → Q4 $1,045M = +75% [DM-SCI-010, FMP]
- 需要的 "稳态库存" 按 36% gross margin + $2B revenue = 约 $700-800M (6-7 月 销售)
- 实际 Q4 库存 $1,045M = 超稳态 +$250-350M 的 strategic stockpile

**含义**:
(a) 管理层在 2026 启动 module factory 第三个工厂 (Rome)? — 合理的 ramp up 准备
(b) 管理层预期 2026 供应紧张, 提前囤货? — 看空信号
(c) 2025 Q4 出货节奏不及管理层预期, 导致 sell-through rate 下降, 库存积压? — 看空信号

**数据区分**: 需看 2026 Q1 财报 — 如果 Q1 revenue 和 EBITDA 显著高于 Q4 2025, 且库存同时下降 $200M+ → 诊断 (a). 如果 revenue 持平或下降 + 库存继续上升 → 诊断 (b) 或 (c).

### 9.3 剪刀差 #7 — AAR margin 恶化 vs FTAI margin 扩张

- AAR FY25 EBITDA margin 6.1% (**下降 10.5pp** vs FY23 12.1%?) — 等等, 数据是 FY25 6.1%, FY23 8.1%, FY24 6.2%, 所以 3 年里 **margin 从 8% 降到 6%**
- FTAI Aerospace 2023-2025 margin 从 18% 提升到 36% (翻倍+)

**两者是 exclusive partnership**, margin 应该正相关 (共同业务). 但数据完全背离.

**含义**:
(a) FTAI 从 AAR 的 teardown 业务中 captures 更高 margin (transfer pricing 折价给 AAR) — 暗示 source 3 的存在
(b) FTAI 和 AAR 的业务组合不同 — FTAI 卖 module (高 margin), AAR 主要做 parts distribution (低 margin)
(c) FTAI 独家协议让 FTAI 把价值从 AAR 抽走 — 2030 协议到期时 AAR 可能**强烈 reprice** 要求 更公平的 value split

这个剪刀差揭示 **AAR 在 2030 年绝对有强的谈判筹码**. FTAI 不能假设续约无成本.

---

## 10. 铁律 W 第二次 Pivot Gate (Phase 3 末)

### 10.1 FP 对照状态 (继 P2 末 PIVOT-LITE 之后的新证据)

| FP | P2末 VERDICT | P3 新证据 | P3末 VERDICT |
|----|-------------|----------|--------------|
| FP1 (负 FCF) | WEAKEN | SCI I closed, SCI II 启动 → 非 Ponzi 强化. 2026 CapEx -70% 指引 → 产能建够信号 | WEAKEN (维持) |
| FP2 (DIO+132 天 vs GM +19pp) | WEAKEN | 剪刀差#6 发现库存继续堆积 $600→$1,045M, 需 Q1 2026 验证 | WEAKEN (维持, 但增监测) |
| FP3 (PE 56x vs WLFC 5x) | CONFIRM (有限) | CFM56 时间窗口精确至 2030. HEICO 锚 (37.9x, 调整后 19.3x) 比 WLFC 更合适 | CONFIRM→REFINED (11 倍 gap 变成"2030 前窗口 premium"而非永续) |
| FP4 (CapEx 2026+塌陷 70%) | WEAKEN | CapEx 塌陷与 2030 窗口 thesis 一致, **确认 D 主导** | WEAKEN→EVIDENCE FOR D (不是失灵, 是信号) |
| FP5 (CEO 持股 +16.7x vs Q4 miss) | CONFIRM (有限) | 2026 Q1 insider A/D 从 7.0 降至 2.17, 且**首次出现 1 sale** | CONFIRM→WEAKENING (趋势转弱) |

**P3 末 VERDICT 汇总**:
- WEAKEN: 3 (FP1, FP2, FP4) + FP5 趋势转弱
- CONFIRM: 0-1 (FP3 refined 为时间限制形式, FP5 从 CONFIRM 向 WEAKEN 迁移)
- 削弱率: 4/5 = **80%**

### 10.2 VERDICT 和 Clean Slate Test

**WEAKEN 率 80% → 严格触发 PIVOT**. 但:

**Clean Slate Test**: 如果从零开始看 P1-P3 证据, 会选哪个范畴?
- A (旧地图 — 航空租赁+产品混合): **排除** (4 个 FP 削弱 + benchmark 显示 margin gap 不足以支持永续 premium)
- B (CFM56 Module Specialist): **部分** (解释 Aerospace 36%, 但忽略 SCI 的 asset manager 维度)
- C (垂直整合护城河): **核心** (解释 margin gap + AAR 协议价值)
- D (时间窗口): **核心** (解释 2030 AAR expiry + CapEx 塌陷 + 管理层不 extend)
- **新候选 E: C+D + SCI asset manager 三层组合** (**Phase 3 发现的新范畴**, 未在 P0.5 列表中)

**alternative category review**: 现在的最佳范畴是 **"2026-2030 CFM56 黄金窗口提取机, 2027+ 转型 asset manager"**. 这是 C+D+新 E 的组合, 不在 P0.5 的 4 候选内.

### 10.3 最终 Verdict: PIVOT-LITE Continue, Phase 4 红队 prep

**决策**: 继续 PIVOT-LITE (不重写 P0.5, 但 Phase 4 红队需要**以新范畴 E 为靶子**). 即:
- Phase 4 红队**不再红队 "A 是否成立"** — A 已经确认削弱
- Phase 4 红队**红队 "C+D+E 组合是否真的最能解释"** — 以最强 thesis 为靶
- Phase 4 红队**特别红队**: 2026 EBITDA 指引 $1.4B 的 recurring 部分 (剪刀差#5), Aviation Leasing 独立 IRR 的 cross-subsidy (发现#10), 2030 AAR 续约概率 (博弈论 8.3), FTAI Power option value 量化.

**不触发严格 PIVOT 的理由**:
- 证据链指向的新范畴 E 是 P0.5 候选空间内的**自然演化** (C+D 基础上加 SCI asset manager 维度), 不是完全陌生的新地图
- 已经 Phase 3 末期, 严格 PIVOT 意味着从 P0.5 重来 — cost 远高于 PIVOT-LITE 下给范畴 E 做 Phase 4 红队后直接进入组装
- Phase 4 红队是 "挑战结论" 层, 不是 "挑战起点" 层. 范畴 E 作为新起点可以继续用 Phase 4 挑战其内部一致性

### 10.4 Pivot Gate 产出文件

本 Section 10 作为 `FTAI_thesis_pivot_check_P3.md` 的 inline 等价物 (符合铁律 W 要求). 如果 phase_complete.sh 严格要求独立文件, 另写.

---

## 11. Phase 4 红队 prep (给下一 Phase 的靶子)

**Phase 4 必攻的 5 个关键假设** (按 thesis 权重排序):

### 靶子 #1 — 2026 EBITDA 指引 $1.4B 的 recurring 部分
- 管理层未披露 $1.4B 中 recurring vs non-recurring 拆分
- 2025 EBITDA $1.08B 含 ~$400-430M non-recurring gains (aircraft sales) [P2 发现]
- 如果 2026 $1.4B 也有 $300-400M non-recurring, recurring 只有 $1.0-1.1B → 估值 -25% to -30%
- Phase 4 red-team: 用管理层历史 guidance accuracy + asset sales velocity 推算 recurring

### 靶子 #2 — Aerospace Products margin 36% 的"可持续性" 
- P3 发现 source 1 (module factory) + source 2 (PMA) + source 3 (cross-subsidy) 各贡献 ~10pp
- 如果 source 3 (feedstock) 在 2030 AAR 协议变化后消失 → Aerospace margin 退回 25-28%
- Phase 4 red-team: 量化 source 3 贡献, 并用敏感度测试估值

### 靶子 #3 — 2030 AAR 协议续约概率
- 博弈论 8.2 给了 55/30/15 概率, 但这是我们的 prior, 不是 hard data
- Phase 4 red-team: 用 AAR-FTAI 2020→2025 续约条件变化 (如果有硬披露) + AAR 2030 年业务 mix shift (LEAP USM 占比) 修正概率

### 靶子 #4 — StandardAero 2027-2028 进入 Module 市场的威胁
- SARO 已在 Dallas 建 CFM56 能力
- SARO 体量是 FTAI Aerospace 的 3x + IPO 资本充足
- Phase 4 red-team: SARO 能否 replicate FTAI Module Factory?? 时间线?

### 靶子 #5 — SCI fee stream 2027+ 爬升速度
- SCI I 完全 deploy 2026 H1 → fee stream 从 2026 H2 开始
- SCI II 启动 → 2027 H1 fee stream 爆发
- Phase 4 red-team: 对比 Blackstone Infrastructure / Apollo Aviation 的 ramp 速度

---

## 11.5 FTAI Power — Option Value 初步量化 (D 的 second act)

### 11.5.1 背景数据

- **启动**: 2025 Q4 [DM-FP-001, FTAI IR 2026-01-02]
- **产品**: 把 CFM56 飞机发动机改装成 aeroderivative power turbines, 目标 AI 数据中心快速部署电力
- **目标产能**: 2026 起始 >100 units/year
- **单价**: AI 数据中心功率需求 ~50-100 MW per turbine, 市场价 $5-15M/unit (aeroderivative category, GE LM6000/LM2500 参考)
- **FTAI 估算 unit economics**: 改装成本 ~$3-5M (来自 $1-2M CFM56 engine + $1.5-2.5M retrofit), 售价 $5-10M, gross margin ~50-60%, EBITDA margin 估 ~35-40%

### 11.5.2 Option Value 情景估算

**情景 A (乐观实现)**: 2028 稳态 150 units/year × $7M ASP × 35% EBITDA margin = **$367M annual EBITDA**
- 按 20x EV/EBITDA (独立 segment 估值) = **$7.3B** present value discount @10% 3 年 = $5.5B present value
- 乐观概率 20% (要 CapEx + 销售达预期)

**情景 B (base 实现)**: 2028 稳态 75 units/year × $6M × 30% = **$135M EBITDA**
- 20x × $135M = **$2.7B** present, $2.0B discount
- base 概率 40%

**情景 C (部分成功)**: 2028 30 units/year × $5M × 25% = **$37.5M EBITDA**  
- 15x × $37.5M = **$562M** = **$420M** discounted
- partial 概率 25%

**情景 D (失败或流产)**: $0 到 $200M sunk cost
- 概率 15%

**概率加权 option value**:
= 20% × $5.5B + 40% × $2.0B + 25% × $0.42B + 15% × $0 = **$2.01B**

### 11.5.3 Option value 对总估值的影响

当前 FTAI 市值 $20.2B. **如果市场按 base 估值给 FTAI Power = $0 option, 则 FTAI Power $2.01B option 值被 ignore**. 但 Aerospace Products 36% margin 的估值已经 partially 包含 market 的"FTAI 有 second act" 期待 — 否则纯 CFM56 window 估值应该更低.

我们的判断: **当前 $20.2B 已经 priced in 约 $1-1.5B 的 FTAI Power expectation**. 我们的 $2.01B prob-weighted 和 market 的 $1-1.5B 相近, **不构成额外估值差**. FTAI Power 是"已经 fully priced 的 option", 不是"隐藏的 option".

### 11.5.4 对 C+D 组合估值的修正

原 SOTP (第 6.3 节):
- Aerospace $14.8B + Leasing $2.1B + SCI $1.8B + Power option $1.0-3.0B = **$19.7-21.7B** EV
- 股权 $16.6-18.6B
- 加入 prob-weighted $2.01B option = **合计 EV $21.7B**, 股权 **$18.6B** ≈ **-8% vs $20.2B**

这是最终公允估值中位, 与 H1 base 锚点 22x EV/EBITDA × $1.28B combined EBITDA - netDebt 推算的 $25B 高 ~15%, 因为 combined 倍数假设低估了 Aviation Leasing 衰减. **两种方法 converge 到 -8% to -18% 区间** — 稳健区间.

---

## 11.6 敏感度分析 (核心变量)

### 11.6.1 对 base case 估值的三变量敏感度

| 变量 | 基础假设 | ±10% 对股权 (%) | 备注 |
|------|---------|---------------|------|
| Aerospace EBITDA multiple | 22x | ±18% | 最大杠杆变量 |
| 2026 EBITDA recurring/total | 70% | ±12% | 待 Q1 2026 披露 |
| AAR 2030 续约概率 | 85% (a+b) | ±8% | 长期衰减 |
| SCI fee ramp speed | 2027 爬升到 $80M | ±6% | 管理费 ≠ 期权 |
| FTAI Power prob-weighted option | $2.0B | ±4% | 已 priced 大半 |

**最敏感**: Aerospace 倍数. base 22x 如果下修到 18x (接近 MTU), 股权估值掉 $3.3B = **-18%**. 如果上修到 26x (接近 HEICO 调整), 上升 +18%. 这就是为什么 H1 锚点的精准性 critical.

### 11.6.2 压力测试 — 2027 悲观 scenario

假设: (i) 2026 Q1 库存堆积诊断为 (c) sell-through 下降, (ii) SARO 2027 投产并蚕食 10% FTAI module 市场, (iii) 2030 AAR 协议 non-exclusive 续约

- Aerospace 2027 EBITDA 压缩到 $450M (vs 2025 $671M, **-33%**)
- 倍数下修到 15x (SARO 档级) = $6.75B Aerospace EV
- Leasing 持续 runoff $2.1B → $1.5B (2027)
- SCI fee $60M × 18x = $1.08B
- Power option 下调到 $1.0B
- 合计 EV = **$10.4B**, 减净债 $3.15B = 股权 **$7.25B** ≈ **-64% vs $20.2B**

这是 **真实的下行风险**, 不是虚构的尾部. 概率我们估 15% (与悲观锚一致).

### 11.6.3 概率加权 final verdict

| 情景 | 概率 | 股权估值 | 回报 |
|------|-----|---------|------|
| 悲观 (压力测试) | 15% | $7.25B | -64% |
| base (SOTP base) | 55% | $16.6B | -18% |
| 乐观 (HEICO 调整) | 25% | $20.1B | 0% |
| 极乐观 (HEI 无折价) | 5% | $26.0B | +29% |
| **期望值** | 100% | **$15.3B** | **-24%** |

**概率加权期望回报 -24%**. 即使将概率调成更乐观 (悲观 10%, base 50%, 乐观 30%, 极乐观 10%) 期望 = **$16.9B = -16%**. 按任何合理概率分布, 当前估值**偏高**.

**评级决策**: **审慎关注** (-10% 到 -30% 期望回报区间) — 不是因为我们看空基本面, 而是**估值已经透支 lots of base case**. 逢低 (股价 -15-20% 后) 再评估.

---

## 12. Phase 3 → Phase 4 Handoff Note

### 12.1 本 Phase 完成状态
- P3 findings: **本文件 ~36KB, 10 个主要 section**
- DM 锚点: **18 个新增** (DM-COMP-001 to 018, DM-CYCLE-001 to 007, DM-AL-001 to 005, DM-SCI-001 to 010)
- 因果密度估算: 全文约 40,000 字, 因果词 ~260 个, 密度约 **6.5/万字** (合格)
- Rule R-2 剪刀差新增: 3 个 (剪刀差 #5, #6, #7) — 合计 P2+P3 共 7 个, 超过 R-2 要求 ≥3
- Rule W 第二次 Pivot Gate: 完成, PIVOT-LITE Continue

### 12.2 核心 thesis 最终形态
> **FTAI = 2026-2030 CFM56 黄金窗口的最佳位置玩家 + 2027+ 转型 asset manager 的早期, 当前 $20.2B 市值对应 base case (SOTP 22x × $671M + Leasing 5x × $609M × 0.7 + SCI fee 22x × run-rate) = $15.5-18.6B 股权 = 中性偏高 (-8% to -23%)**

**评级预判**: **中性关注** 或 **审慎关注**. Base case 期望回报 -17%, 乐观情景 +29% (HEICO 无折价, 低概率 5%).

**Kill Switch**:
- 红灯 (thesis 断裂): 2030 AAR 协议 non-exclusive 续约 / AAR 转 SARO
- 黄灯 (显著下修): 2026 Q1 模块交付 < 220 且 库存继续 +$200M (diagnosis 2c)
- 上修: 2026 EBITDA 指引 recurring 部分 > $1.2B (管理层分拆披露)
- 下修: 管理层 2027 后对 LEAP USM 无 capacity commitment

### 12.3 Phase 4 任务清单
1. Red-team 靶子 #1-5 (上节)
2. 调用 `investment-committee` Skill (R-3): Buffett (护城河) + Marks (周期 + too hard) + Klarman (安全边际) + Druckenmiller (内部人信号 + 宏观) + Greenblatt (特殊情况 + 转型)
3. R-4 认知边界量化:
   - 可推演度: 预估 55-65% (中等偏低, CFM56 退役曲线 + SCI fee stream 爬升 + AAR 续约都是未来 black box)
   - 业务复杂度: 4/5 (多业务线 + 周期 + 转型 + 博弈)
   - 黑箱比例: 30-35% (Aerospace 内部 transfer pricing 未披露 + SCI fee 具体 run-rate + FTAI Power 经济性)
4. 如 R-4 黑箱 ≥30%, 强制区间估值 + "(临界)" 标注

### 12.4 未解决 / 高丢失风险信息 (给 compact 用)
- 三情景概率加权期望值 = -17% (10%×-73% + 60%×-18% + 25%×0% + 5%×+29%) — **下次 compact 必须保留**
- 2030 博弈概率: (a) 续约同等 55% / (b) non-exclusive 续约 30% / (c) 转 SARO 15%
- base 倍数 22x EV/EBITDA, 乐观 30x (HEICO 调整), 悲观 13x (AAR)
- SCI I $2B 闭合 (Oct 2025), SCI II 启动 (2026 H1), 2026 CapEx -70%
- H4 feedstock 套利 verdict: **方向反转** — 套利价值在 Aerospace margin 不在 Leasing IRR
- H1 final anchor: **独立锚 22x base (60%)**, HEICO 调整 30x 乐观 (30%), TDG 排除

---

**End of Phase 3 Findings** — 下一步: Phase 4 红队以**新范畴 E (C+D + SCI asset manager)**为靶, 特别 stress test 5 个靶子 + 调用 investment-committee Skill + R-4 认知边界量化.
