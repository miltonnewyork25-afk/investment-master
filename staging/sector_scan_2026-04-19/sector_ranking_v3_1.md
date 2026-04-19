# Sector Ranking v3.1 — 应用 Pace Gate v1.3 三时钟
**Date**: 2026-04-19
**Framework**: sector-expectation-gap-scanner v1.3
**Change from v3**: Pace gate 从单 Realization 时钟升级为 Contracted / Recognized / Diffusion 三时钟

---

## 0. v3 → v3.1 的主要修正

v3 用 v1.1 Pace gate (单时钟) 把 **Nuclear Fuel Cycle** 放 watch, **Commercial HVAC** 放 watch, 同时放了一些 niche 位置 (BTU M4 方法验证 / Advanced Packaging Upstream)。

v1.3 三时钟重跑后修正如下:

| 主题 | v3 位置 | v1.1 单时钟 | v1.3 三时钟 (C / R / D) | v3.1 位置 |
|------|--------|-----------|------------------------|----------|
| Nuclear Fuel Cycle | watch | D > R → block | **C 高 (2024 Russia ban + HALEU + SMR MOUs) > D 高 > R 低**, 是标准"contract-ramp"情景 → **allowed top-3** | **#6 (回归)** |
| Grid Resilience (HUBB/NVT) | — (HWM 替代) | — | C 高 (FERC CIP-015 + bulk reliability 合规支出 rate base recovered) > D 中 > R 中 | **#7 (取代 HWM)** |
| Selected Shipping (DAC) | 排除 | — | DAC 长约 R > D (长期租赁锁定但市场仍按周期 PE 估) | **#9 (split + 进)** |
| AI Power Upstream HWM | #9 | R > D for HWM | 降位——HUBB/NVT 更宽表达覆盖同一主题 | watch |
| Advanced Packaging Upstream | #6 | R ≈ D | **D > C ≈ R** (Onto/Camtek 30-50% run, ASMPT HK 流动性差) → Pace block top-3 | watch |
| BTU Thermal Coal | #10 | R > D 极端 | C 弱 (煤延期退役合同多是年度谈判, 非长约), F=B | **drop** — 方法验证不应占 top 10 slot |

---

## 1. Top 10 v3.1_final

| # | Theme | Bucket | FROG | 三时钟 C/R/D | 来源 | 核心理由 |
|---|-------|--------|------|-------------|------|---------|
| 1 | **LNG + Gas Midstream** (KMI/WMB bridge) | A | PPPB | C高 / R高 / D中 | v2 keep | 2027 出口合约已签 + KMI/WMB 连接 feedgas + AI power, 市场只按 LNG narrative 定价 |
| 2 | **Aerospace Aftermarket** (TDG/HEI/GE/FTAI) | A | PPPP | C高 / R高 / D中 | v2 keep | FAA 强制维护 + PMA 垄断; TDG/HEI 部分 priced 但 GE 分拆 + FTAI 未完成 diffusion |
| 3 | **Private Prisons / ICE Detention** (CXW/GEO) | C | PPPP | C高 (FY26 DHS 预算) / R中 / D低 (ESG 排除) | v2 keep | R > D 直接 top, ICE capacity 扩张 + ESG 回避 attention gap |
| 4 | **PFAS Remediation** (CLH/PNR/VLTO) | C | PPPP | C高 (5yr 合规期) / R低 / D低 | M1 NEW | EPA 2024 MCL + IIJA $9B; C > D > R, 合同→earnings gap 是 alpha |
| 5 | **Water Infrastructure / EPA LCR** (MWA/MLI) | C | PPBP | C高 (10yr 强制) / R中 / D低 | v2 keep | Lead service line replacement 合同已开始流到 MWA 订单 |
| 6 | **Nuclear Fuel Cycle** (CCJ/LEU) | A | PPPP | **C高 (Russia ban + HALEU + SMR contracts) > D中 > R低** | v2 回归 | **v1.3 修正** — v3 误用单时钟排除; 三时钟下是标杆 contract-ramp 情景 |
| 7 | **Grid Resilience** (HUBB/NVT) | A | PPPB | C高 (FERC CIP-015 + rate base) / R中 / D中 | v3.1 替代 HWM | FERC reliability + cybersecurity 非成长 CapEx 而是合规支出 |
| 8 | **WST Biologics Primary Packaging** | A | PPPP | C高 (GLP-1 fill-finish 扩产订单) / R低 (2024 destocking) / D低 | M1 NEW | GLP-1 注射器 stopper chokepoint, 2026 重启 ramp, 市场未重估 |
| 9 | **WAB Freight Rail Aging** | A | PPPP | C高 (机车 backlog + PTC aftermarket) / R中 / D中 | M3 NEW | 25yr 机车 + FRA 20111 强制 + EPA Tier 5; 同 Aero Aftermarket 构造但更低 diffusion |
| 10 | **Selected Shipping — DAC** (duration containership lessor) | B | BPPP | C高 (长约租赁锁定 5-12 yr) / R高 / D低 | 纳入 (theme purity split) | 长约 duration owner, 市场按 shipping cyclical PE 估 |

---

## 2. 从 v3 出 top 10 的 (4 位)

| v3 Position | 原因 | 去向 |
|-------------|------|------|
| #6 Advanced Packaging Upstream (Onto/Camtek/ASMPT) | v1.3 Pace: D > C ≈ R (Onto/Camtek 30-50% run + ASMPT HK 流动性) | **watch** (HBM4 ramp 可能重启 R > D) |
| #9 AI Power Upstream HWM | 被 Grid Resilience HUBB/NVT 更宽表达覆盖 | **watch** (独立合金层主题若市场分层重估可重回) |
| #10 BTU Thermal Coal | F=B 弱, 方法验证不应占 slot; v1.3 细审下 C 弱 (年度谈判非长约) | **drop** |
| #7 WST (从 v3 #7 移到 v3.1 #8) | 排序内调整, 非出 | — |

---

## 3. Bucket 分布 (v3.1)

| Bucket | v3.1 数 | v3 数 | 变动 |
|--------|--------|------|------|
| A · Structural owner | 6 | 6 | 同 |
| B · Cyclical re-rating | **1** | 0 | **DAC 补入** (theme purity split) |
| C · Policy / regulation | 3 | 4 | -1 (BTU 出) |
| D · Workflow shift | 0 | 0 | 同 (informative null) |
| E · Optionality | 0 | 0 | 同 |

Bucket B 从 0 → 1 是真实进步——不是强塞 Copper, 而是通过 theme purity split 识别 DAC 作为 duration owner 而非 cyclical beta。

---

## 4. Watch List (更新)

| 候选 | 为什么 watch | 触发晋升条件 |
|------|-------------|-------------|
| Advanced Packaging Upstream (Onto/Camtek/ASMPT) | v1.3 Pace D > C ≈ R | HBM4 ramp 开始 + 新 Contracted 订单披露 |
| AI Power Upstream HWM | 被 Grid Resilience 更宽覆盖 | 市场分层重估 aero vs power 独立 |
| Commercial HVAC (WSO/TT) | Pace R ≈ D | R-410A → A2L 强制切换订单 earnings confirm |
| Copper / Electrification | Pace R ≈ D | 铜价 >$5.5/lb 或 EV resurrection |
| Tobacco Smoke-Free (PM) | M4 Type A 但 Diffusion 已跟上 | -20% correction + ZYN +40% 维持 |
| BWXT Nuclear Specialty | Nuclear 主题过度集中 | SMR 商业化 concrete orders |
| BTU Thermal Coal | M4 Type A 但 F=B | F 强化 (正式监管要求 / 长约延期) |
| VLTO (环境 testing + 整合) | 与 PFAS 候选潜在重叠 | Separate from PFAS 专题度确认 |
| FTAI Aviation Leasing | Aero Aftermarket 子层 | Standalone thesis 确认 |
| Nuclear Fuel Cycle ← 从 watch 晋升 | — | (已进 top 10) |

---

## 5. v3 → v3.1 方法论收益

**v1.3 三时钟的实际价值**:

1. **Nuclear Fuel Cycle 从 watch 回 #6** — 最大单一修正, 修正 v1.1 系统性偏差 ("已 re-rated" ≠ "market 已 priced in 合同 ramp")
2. **Grid Resilience 从 missing 到 #7** — v1.3 让"FERC rate base recovered 合规 CapEx"区别于"CEG/VST 叙事性 CapEx"
3. **DAC 从 excluded 回 #10** — theme purity + 长约 duration 表达层识别, v1.1 下粗暴归入"shipping late-cycle"
4. **Advanced Packaging Upstream 从 #6 到 watch** — v1.3 严格测量 C/R 发现已双高, 剩余只是 D 超 (市场先跑)
5. **BTU drop** — v1.3 细审 C (煤延期退役是年度谈判非长约 = C 低) + F=B 共同降权, 正确修正 v3 的方法验证偏差

**净效果**: 10 位中 3 位位置调整 + 1 位新入 (DAC) + 1 位删除 (BTU)。v3.1 比 v3 更接近"结构正确 × 赔率合理"的双重标杆。

---

## 6. v1 → v2 → v3 → v3.1 演化总结

| 主题 | v1 | v2_gated | v3 | **v3.1** |
|------|----|---------|----|---------|
| LNG Midstream | #9 | #1 | #1 | **#1** |
| Aerospace Aftermarket | #2 | #2 | #2 | **#2** |
| Private Prisons | — | #3 | #3 | **#3** |
| PFAS Remediation | — | — | #4 | **#4** |
| Water Infrastructure | — | #5 | #5 | **#5** |
| Nuclear Fuel Cycle | **#1** | #9 | watch | **#6** |
| Grid Resilience (HUBB/NVT) | — | — | — | **#7 NEW** |
| WST Biologics Packaging | — | — | #7 | **#8** |
| WAB Freight Rail Aging | — | — | #8 | **#9** |
| Selected Shipping (DAC) | — | — | 排除 | **#10 NEW** |
| Advanced Packaging Upstream | #3 | #4 | #6 | watch |
| AI Power Upstream (HWM) | #4 | #7 | #9 | watch |
| BTU Thermal Coal | — | — | #10 | drop |
| Copper | 排除 | #6 | watch | watch |
| Data-Center Electrical | — | #8 | 排除 | 排除 |
| Uranium Miners | #7 | #10 | 排除 | 排除 |

**v3 → v3.1 净变**: 1 位回归 (Nuclear Fuel Cycle), 1 位替换 (HUBB/NVT 替 HWM), 1 位进 (DAC), 1 位 drop (BTU), + 排序微调

---

## 7. 下一步建议 (不变)

1. **Mode B 深挖 top 3** (LNG / Aero / Private Prisons) — 用 trend-source-mapper + profit-owner-resolver 出 initiate-ready 方案
2. **Verification round** — MCP 拉 top 10 财务 + Polymarket 事件数据, v3.1 → v3.2
3. **继续 M-hop + M-mono pilots** — 补 Bucket D/E 空白 (预期填不上, 但值得尝试)

建议仍是**路径 1** — ranking 已稳定, 进入 candidate-level 工作。

---

**End of v3.1.**
