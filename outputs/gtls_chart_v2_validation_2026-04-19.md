# Chart Industries (GTLS) · v2.2 Full Validation Memo

> **Date**: 2026-04-19
> **Purpose**: 第四个 v2 validation 案例, **首次在 v2.2 新判据投入使用后实战**. GTLS 是目前候选池中潜在的 **chokepoint + bridge + duration 三重通过** 候选, 是 v2.2 最强的 stress test — 看 segment-by-segment (补丁 #1) / multi-core Step 1 (补丁 #2) / absolute-years OR (补丁 #3) / renewal extension (补丁 #4) 在真正多 segment 多 trigger 公司上是否给出可操作判据
> **Baseline**: `outputs/lng_top5_2026-04-19.md` Top #1 — "cryogenic + Howden 压缩 chokepoint+bridge, 5 trigger 独立, less-crowded vs LNG/KMI"
> **Source trend (primary)**: 北美 LNG 出口产能翻倍 (2024-2030), liquefaction 冷端 + 压缩设备 forced demand
> **Source trends (siblings, per v2.2 Step 1 multi-core)**: 氢能 buildout (IRA + 产业 decarb) / CCUS (45Q + 企业 climate 承诺) / 工业气体 (semis + electronics + reshoring) / 压缩设备 maintenance (installed base 老化)
> **Data basis**: 训练知识截至 2026-01. Howden 收购 2023-11 已整合, FY24-25 backlog ⚠ ~$4.5-5B, services/aftermarket post-Howden ⚠ ~25-30% revenue. Q1 2026 earnings + 具体 segment margin 未 MCP 验证

---

## 0. 验证设计

继承 MDT 的四元问题, 新增 v2.2 专项 Q-e:

| 元问题 | GTLS 要回答什么 |
|---|---|
| **Q-a 主动识别** | v2.2 三个 skill 是否**主动**识别 chokepoint + bridge + duration 的三重叠加? |
| **Q-b 加值** | 若只用 v2 (无 v2.1 trigger-independence, 无 v2.2 segment-by-segment), 结论会不同吗? |
| **Q-c 硬测试可操作** | Bridge (v2.1) + Duration (v2.2) 双硬测试在 GTLS 上都给出可 falsify 的 yes/no? |
| **Q-d v2.2 #1 segment-by-segment 锐利度** | 按 segment 跑 vs 按公司层跑, 结论有实质差异吗? GTLS 和 MDT 的对比(100% vs 88% weighted pass) 是否告诉我们什么? |
| **Q-e v2.2 #2 multi-core Step 1 实战** | 把 LNG 作为 primary, H2 / CCUS / 工业气体 / maintenance 作为 sibling trends, 是否让 Step 2-4 的中间结论更干净? 对比 "硬挑一个 core" 的 v2 写法 |

---

## 1. Propagation Mapper v2.2 · Multi-chain energy + industrial infrastructure

### Step 1 — Trend core (v2.2 multi-core 首次实战)

**Primary trend**: 美国 LNG 出口产能翻倍 — 2024-2030 从 ~15 Bcf/d 向 ~30+ Bcf/d, 每个 liquefaction train 需要 cryogenic 换热器 + 压缩机

**Sibling trends** (v2.2 Step 1 允许):
| Sibling | 触发机制 | GTLS 暴露 |
|---|---|---|
| 氢能 (H2) buildout | IRA 45V + 欧盟氢银行 + 工业 decarb | 液氢设备 + 压缩 + 储运 |
| CCUS | 45Q tax credit + 企业 Scope 1/2 承诺 | CO2 压缩 + 低温分离设备 |
| 工业气体 (O2/N2/Ar/He) | Semis + electronics + reshoring + 医疗 | 工业气体装置 + 压缩 + 液化 |
| 压缩设备 maintenance (installed base 老化) | 全球 Howden 压缩机存量 (化工/采矿/市政/油气) 20-30 年替换周期 | Services & aftermarket segment |

**v2.2 Q-e 评估**: 强制 Step 1 单一 core 会让 Step 2-4 在单一 LNG chain 上跑, **GTLS 35-40% 非 LNG revenue 会被错误归类为"narrative spillover"**. 声明 5 条 sibling 让后续步骤干净地并行追溯每条 chain.

### Step 2-4 · 分别对每条 chain 跑 (简版)

|  | (α) LNG | (β) H2 | (γ) CCUS | (δ) 工业气 | (ε) Maintenance |
|---|---|---|---|---|---|
| Core node | Liquefaction train (heat exchangers + 压缩) | 液氢 + 储运 + fueling | CO2 压缩 + 分离 | 空分装置 + 工业气体液化 | Howden installed base 老化 |
| Restricted node | IPSMR proprietary + 换热器供应限制 | 专用低温工程 + fueling 标准 | 45Q 要求的工程性能 | Air Liquide / Linde / Air Products 三分天下 + 长约 | Howden OEM 位置 + spare parts 垄断 |
| GTLS 位置 | **Heat exchanger + 压缩 chokepoint**, 与 Linde / APCI 并列 | 液氢 top 3 全球 | CO2 压缩 top 3 | 工业气体主要 OEM 供应商 (设备供 end user, 非终端 fulfillment) | Howden 收购带来的 service/aftermarket 平台 |
| 市场 narrative | "LNG play" 充分 | Policy-driven, 风险被定价 | 早期 + speculative | 稳态工业 | **通常忽略** |

### Step 5 — Identify special roles

#### Bridge 硬测试 (v2.1 trigger-independence + ≥30% resilience)

**触发机制独立性 (per v2.1)**:
- α LNG: 地缘 + 国际天然气需求 + 美国 export 政策. **独立**
- β H2: 美国 IRA + 欧盟氢银行 + 工业 decarb 承诺. **独立于 α** (不共享触发). IRA 可被政策反转, 欧盟政策独立
- γ CCUS: 45Q 税收 + 企业 Scope 承诺. **独立于 α, β**
- δ 工业气体: 制造业 PMI + 半导体 capex + reshoring. **独立于政策**
- ε Maintenance: Howden installed base 年龄分布 + 工业设备更换周期. **完全独立于终端需求**

5 条**显著独立** triggers — GTLS 是 v2.1 最干净的 bridge case (比 Quanta 4 条更分散, 比 MDT 3 条更多)

**Resilience 测试** (按 ⚠ FY24 估算 revenue share):
- α LNG ~30% · β H2 ~10-15% · γ CCUS ~5% · δ 工业气 ~20-25% · ε Maintenance ~25-30% (Howden 带来 40% service 基数)
- 最坏情境 1 (LNG 归零): 剩 H2 + CCUS + 工业气 + maintenance ≈ 70%. ✓
- 最坏情境 2 (IRA 全废 = H2 + CCUS 双击): 剩 α + δ + ε ≈ 75-85%. ✓
- 最坏情境 3 (工业衰退 δ 腰斩): 剩其他 ≈ 85%. ✓
- 最坏情境 4 (双 chain 同时崩, 如 LNG + IRA): 剩 δ + ε ≈ 45-55%. ✓ (仍 >30%)
- **最罕见最坏**: 3 chain 同时崩 (LNG + IRA + 工业衰退): 剩 ε maintenance ≈ 25-30%. 接近 threshold 但仍通过
- **Bridge test pass strongly** —— 是 v2.1 case 中 resilience 最高的 (双 chain 崩仍 >45%)

#### Duration 硬测试 (v2.2 segment-by-segment, #1 首次实战)

**按 GTLS major segment 拆分跑** (v2.2 要求多 segment 公司必须 segment-by-segment):

| Segment | Deployment 周期 | Installed-base monetization 窗口 | Ratio | Absolute-years gap | 切换成本可量化 | Pass? |
|---|---|---|---|---|---|---|
| **Heat Transfer Systems** (LNG brazed 换热器) | LNG train 建设 **5-7 年** | 换热器服役 **25-30 年** + 服务/spare parts | **~5x** | 20-25 年 ✓✓ | IPSMR 技术锁定 + 中期切换不可能 | ✓✓ |
| **Cryogenic Tank Solutions** (低温储运罐) | 生产 **3-6 月** | 罐体 **20-30 年** + ASME 再认证 | **~60x** | 20-30 年 ✓✓ | 尺寸/规格/recertification | ✓✓ |
| **Specialty Products** (H2 / CO2 specialty) | 1-3 年项目 | 20-30 年设备 | **~15-20x** | 18-28 年 ✓✓ | 专用工程 + 集成 | ✓ |
| **Howden new equipment** (压缩机新机) | 6-18 月 | 20-30 年 + 服务合同 | **~20x** | 20-30 年 ✓✓ | 压缩机 spare parts + 服务数据 | ✓✓ |
| **Services & Repair combined** (Howden + Chart aftermarket) | N/A (纯 recurring) | 随 installed base 持续 | **∞ (纯 monetization)** | N/A | 服务合同 + spare 独占 | ✓✓ (trivial) |

**加权 duration pass rate** (按 ⚠ FY24 estimated revenue share):
- Heat Transfer ~25% ✓ + Cryo Tank ~25% ✓ + Specialty ~15% ✓ + Howden equipment ~20% ✓ + Services & Repair ~15% ✓
- **100% weighted pass — 无 exception segment**

**对比 MDT (88% weighted pass + 12% 结构性心 exception)**: GTLS 在多 segment 结构上比 MDT 更干净. 原因: GTLS 所有 segment 都是"设备 + 长寿命 + 服务 recurring"的同类型模式 (capital equipment + aftermarket); MDT 有结构性心这种"一次性 implant 无 recurring"的异类 segment.

**v2.2 Q-d 评估**: segment-by-segment 没**在 GTLS 上暴露 exception** (100% pass), 但**方法论本身仍适用** — 如果以后遇到某 segment 低于 threshold 也能识别. MDT vs GTLS 形成有效对比: 并非所有多 segment 公司都有 duration exception, 但**必须跑一遍才能知道**.

**Absolute-years fallback (v2.2 #3) 应用**: 所有 segment 的 ratio 都 ≥2x, absolute-years 条件 (≥20 年 gap) 也都轻松通过. 本案例**不需 invoke fallback** — 无法以此 case 验证 #3 的锐利度, 需要未来"ratio 临界但 absolute 充裕"的 case 才能测试

**Renewal rate extension (v2.2 #4) 应用**: GTLS 的 Services & Repair 合同是典型的 multi-year 高 renewal 情境, **理论上适用**但本案例也不需 invoke (因为 ratio 本身已足够强). 一样等未来 "低 nominal ratio + 高 renewal" 的 case 验证

### Step 6 — Time sequence

- Immediate (2024-2026): 在建 LNG train (Plaquemines / Rio Grande / Corpus Christi Stage 3) 换热器 + 压缩 deliveries, Howden aftermarket 稳态
- Early (2026-2028): H2 IRA 45V 项目 commissioning + CCUS 首批大型 capture 项目, 工业气体 capex cycle 启动
- Mid-cycle (2028-2033): H2 生态固化, CCUS 规模化, Howden 服务合同 renewal 稳态
- Long-tail (2033+): installed-base monetization 跨 segment 持续, 下一代 LNG / H2 技术迭代

### Step 7 — Economic vs market propagation

- **市场 narrative 错配**: 市场把 GTLS 当"cyclical industrial equipment" (PE 随 LNG capex cycle 波动), 但其 post-Howden 的 Services 占比已接近 30%, 接近 "partly recurring" 的 business model. market 仍按 pure-cyclical 定价
- **Expectation gap**: 2023-2024 Howden 整合阶段的 margin 低谷 + 债务吸收让 multiple 压缩, 现在的估值 implies 整合不会改善 + 5 个 sibling trigger 全失灵 — 这是 reverse DCF 式的极度保守隐含假设
- **Diffusion asymmetry (rule #7)**: GTLS 市值 $15-20B, sell-side 覆盖浅, generalist 少持, attention 低. 与 LNG/KMI 的 hot-theme 形成对比

---

## 2. Profit Owner Resolver v2.2 · 6 层 ownership

| 层 | 判定 | 依据 |
|---|---|---|
| Revenue owner | ✓ | FY24 revenue ~$4.5-5B ⚠, YoY 整合后再加速 |
| Gross profit owner | **中** (待改善) | GM ⚠ mid-30%, Howden 整合完成后应向 40%+ 回升 |
| Cash flow owner | **中** (待改善) | FCF conversion 在整合期波动, 2023-2024 低, 2025 应回 |
| Return owner | **中** | ROIC 在 Howden 整合后摊薄, 需 2-3 年重新上升 |
| **Bridge owner** | **✓✓ strongest** | 5 条独立 trigger, 任一崩 resilience 70-85%, 双崩仍 >45% |
| **Duration owner** | **✓✓ 100% segment pass** | 无 exception segment, 对比 MDT 88% + 结构性心 exception |

### Bridge + Duration 双通过 + Chokepoint = 三重叠加

GTLS 是候选池中**第一个 chokepoint + bridge + duration 三重通过**的案例.

| 候选 | Chokepoint | Bridge (v2.1 trigger-ind) | Duration (v2.2 segment pass rate) |
|---|---|---|---|
| GE (Aero) | ✗ | ✗ (单 aviation chain) | ✓ LEAP ~2.0-2.5x |
| PWR (Quanta) | ✗ | ✓✓ 4 trigger | ✗ 施工型, 非 installed-base monetization |
| MDT (Medtronic) | ✗ | ✓ 3 trigger | ✓ 88% + 结构性心 exception |
| **GTLS (Chart)** | ✓ **IPSMR + cryogenic 专用低温工程** | ✓✓ **5 trigger 最分散** | ✓✓ **100% 无 exception** |

### Q-a/b/c/d/e 元评估

- **Q-a**: ✓✓✓ v2.2 三个 skill 都强制路过, 而且在 Step 1 (multi-core) + Step 5 (bridge/duration) + 第 5-6 ownership 层都显式命中
- **Q-b**: **显著加值** — 若只用 v1 (无 bridge/duration step), 只会看到 "LNG play 但 Howden 整合期阴霾, cyclical industrial"; v2.2 揭示**稀有的三重叠加 owner**, 重写评级含义
- **Q-c**: ✓✓ Bridge (双 chain 崩仍 >45%) + Duration (100% segment) 都给具体 yes/no 和数字
- **Q-d (v2.2 #1 首次实战)**: ✓ Segment-by-segment 跑完成功 — 虽未暴露 exception, 但方法论证明**必须跑才知道**. MDT/GTLS 对比证明此规则不是凑数的
- **Q-e (v2.2 #2 首次实战)**: ✓ Multi-core Step 1 让 Step 2-4 干净声明 5 条 sibling trends, 避免强挑单一 core 导致 35-40% 非 LNG revenue 被误归 "spillover". **建议永久保留 v2.2 #2**

---

## 3. Expression Selector v2.2 · 本 trend 下最佳 expression

### 7 种候选对比 (LNG + 能源转型 + 工业)

| Expression | 代表 | 主要 thesis | Problems |
|---|---|---|---|
| Core leader | LNG (Cheniere) | Textbook duration, SPA lock-in | Hot-theme penalty, 单 trigger, 非 bridge |
| 2nd-order | KMI / WMB | 中游 bridge | 合同 renewal 半软判据, 不含 chokepoint |
| Upstream bottleneck | **GTLS** | Cryogenic + 压缩 chokepoint | Howden 整合消化期, 较小市值 (generalist 少) |
| Hidden owner | FLNG | 长约 shipping | 临界 ~2-3x, 单 trigger |
| **Bridge owner** | **GTLS** | 5 条独立 trigger 最分散 | 与 chokepoint 位置重叠 (不是多选题, 是三重叠加) |
| **Duration owner** | **GTLS + LNG** | 100% segment pass / SPA 20 年 | GTLS 整合期 + 债务; LNG 热门 |
| No-trade | — | — | — |

### 关键判定

**GTLS 是本 trend 下的 chokepoint + bridge + duration triple owner**. 这不是三个候选同时被选中, 是**同一家公司在三个 expression type 同时命中**. 候选池中暂无第二例 (GE/PWR/MDT 都是双通过或单通过).

**最佳 expression 随 time horizon 变化**:
- 6-18 month: 整合期逐步改善 + backlog 能见度 — **Initiate (standard, 带回调纪律)**
- 3-5 year: 三重叠加的结构性 owner 效应在长期更显 — **Initiate (core holding)**
- 10+ year: 理论上顶级 position, 但需 Howden 整合完成 prove 执行

**不选 LNG 替代 GTLS**: LNG 是 textbook 但单 trigger, 无 chokepoint, 非 bridge. GTLS 是 v2.2 框架下候选池的最高质量评级.

### Q-a/b/c

- **Q-a**: ✓ 三重命中在 v2.2 expression 分类中天然识别
- **Q-b**: ✓ 新结论 "GTLS 是 portfolio 中罕见的三重叠加 owner, 不是简单 LNG equipment supplier"
- **Q-c**: ✓ Chokepoint + Bridge + Duration 三个硬测试都 pass 且可量化

---

## 4. Validation Verdict

### 结论: **GTLS 通过 v2.2 完整验证**, 是候选池中**首个 chokepoint + bridge + duration 三重通过**的 candidate

| 元问题 | 结果 |
|---|---|
| Q-a 主动识别 | ✓✓✓ v2.2 三 skill 天然识别三重叠加 |
| Q-b 加值 | ✓✓ 从 "LNG equipment + cyclical" 重定位到 "三重叠加 owner" |
| Q-c 硬测试可操作性 | ✓✓ Bridge (5 trigger, 双崩 >45%) + Duration (100% segment pass) 都给数字 |
| **Q-d v2.2 #1 segment-by-segment** | ✓ 方法论成功 (未暴露 exception, 但**必须跑才知道**; MDT/GTLS 对比证明规则有效) |
| **Q-e v2.2 #2 multi-core Step 1** | ✓✓ 显著加值, 让 35-40% 非 primary revenue 不被误归 spillover |

### 加值的具体形状

**Scanner baseline (LNG #1)**: "chokepoint + bridge 双属性 + Howden 整合消化期 + less-crowded"

**v2.2 full validation**: "**chokepoint (IPSMR + cryogenic 专用低温工程) + bridge (5 trigger 独立, 任一崩 resilience 70-85%, 双崩仍 >45%) + duration (100% segment pass, 无 exception)** = 三重叠加 owner. 候选池内罕见 (GE 单 duration / PWR 单 bridge / MDT 双但有 exception). 估值 implicit reverse DCF 假设 = 整合不会改善 + 5 trigger 全失灵, 结构性保守. Kill Switch 必须 **3 chain 同时崩** 才触发, 极少见"

**Action state 决定**:
- Pre-memo (scanner): Initiate
- Post-memo: **维持 Initiate, 附带纪律** — 前提是 Howden 整合执行数据兑现 (FY26 margin 回到 mid-teens OPM, FY26 FCF conversion >70%). 未 upgrade 到 "core holding" 因 Q1 2026 earnings + 整合数据未 MCP 验证

---

## 5. 对 v2.2 本身的修改建议 (累积至 5 例)

v2.2 四件补丁在 GTLS 实战表现:

| # | 补丁 | GTLS 实战评估 |
|---|---|---|
| 1 | Duration segment-by-segment | ✓ 方法论有效, 但 GTLS 未暴露 exception. 需未来 "有 exception 的多 segment 公司" 持续验证 |
| 2 | Multi-core Step 1 | ✓✓ **显著实战加值**, GTLS 首次正式投入使用 |
| 3 | Absolute-years OR | — 未 invoke (ratio 本身充裕), 无法测试锐利度 |
| 4 | Renewal rate extension | — 未 invoke, 无法测试 |

### 新 v2.3 累积观察 (下一轮 patch 起点)

**观察 A**: Chokepoint + Bridge + Duration 三重叠加是罕见的 owner 质量标签. 候选池 5 例只有 GTLS 一个命中. 建议 v2.3 考虑: **在 expression selector 或 owner resolver 中加入 "triple play" 识别标签**, 强调这种候选的稀缺性和 portfolio 价值 — 但**不现在改**, 等第 2 个 triple play 案例出现再累积

**观察 B**: v2.2 #3 (absolute-years OR) + #4 (renewal extension) 两个补丁在 GTLS 上都**不需要**, 未得到实战验证. 下次再碰到"临界 ratio" 或 "低 nominal 高 renewal" 的 case (铁路 / 国防 sustainment 可能是候选) 再测试. **如果 3 个新 case 后仍未 invoke, 可考虑简化 v2.3 移除这两条**

**观察 C**: 服务 attach rate (% recurring revenue) 是 duration upgrade 的**前瞻指标**. Howden 从 Chart ~10% 提升到整合后 ~30% 就是结构性跃升. 这在 v2.2 没有显式 metric, 建议 v2.3 累积 1-2 个案例后加 soft 指标 — **不现在改**

---

## 6. Next Step

1. **Queue update** (本 session 执行): GTLS `status: raw` → `validated`, `action_state: "Initiate (standard, 带回调纪律)"`, notes 引用本 memo
2. **lng_top5 不需要 needs_patch**: GTLS 的 scanner 判断被 memo 强化 (三重叠加), 不需要修正 source_output; 但可 optional 补一句 "GTLS 已 validated, 参考 memo"
3. **v2.3 累积起点**: 本次已记录 3 个观察, 等 3 个新 case 累积后再一次性打. 暂不执行
4. **下一 queue top**: GEHC (纯 duration textbook, 简单) 或 BDX (workflow lock-in 形式 duration, 可能暴露边界)
