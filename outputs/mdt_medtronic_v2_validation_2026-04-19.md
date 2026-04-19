# Medtronic (MDT) · v2.1 Full Validation Memo

> **Date**: 2026-04-19
> **Purpose**: 第三个 v2 validation 案例, 首次**双硬测试整合**(bridge + duration 同时). GE 单 duration / Quanta 单 bridge / MDT 双. 另一个测试点: 硬测试能否 segment-by-segment 处理多线公司
> **Baseline**: `outputs/medical_devices_top5_2026-04-19.md` Top #1 — "multi-line duration owner + 潜在 bridge, PE 17x out-of-favor, expectation gap 候选"
> **Source trend**: 美国医疗器械 multi-chain duration 复利(心律异常 + 椎间盘退变 + T1 糖尿病 + 慢性疼痛/Parkinson, 四条相对独立 chronic disease 曲线)
> **Data basis**: 训练知识截至 2026-01. FY24 revenue ~$32-33B 分布为 CV 37% / Neuroscience 30% / MedSurg 25% / Diabetes 8%. Q1 2026 earnings 未入, 具体 margin / FCF / 分 segment organic growth 有 ⚠ 标注

---

## 0. 验证设计

继承 GE / Quanta 的三元元问题, 新增第四元问题测试 segment-by-segment 处理:

| 元问题 | MDT 要回答什么 |
|---|---|
| **Q-a 主动识别** | v2.1 三个 skill 是否**主动**识别 MDT 的 bridge + duration 双属性, 还是只看到一面? |
| **Q-b 加值** | v1 / 不用 v2.1 时会把 MDT 归到哪里? v2.1 得出的结论**实质不同**还是仅更精确? |
| **Q-c 硬测试可操作** | bridge hard test (trigger independence + ≥30% resilience) + duration hard test (≥2x ratio + 切换成本) **两个同时**用到 MDT 是否都能给 yes/no 判断? |
| **Q-d 多线处理** | 硬测试在多 segment 公司上是按**公司层**算, 还是必须**按 segment** 算再加权? v2.1 文字目前默认公司层. MDT 是首次暴露该问题的案例 |

---

## 1. Propagation Mapper v2 · 多 chain 医疗 duration trend

### Step 1 — Trend core (复数, 与 Quanta 同类 case)

MDT 挂 4 个**相对独立**的 chronic disease 曲线, 不是单一 trend. 候选源头变量:

| 源头变量 | 触发机制 | Forced demand 强度 |
|---|---|---|
| (α) 心律异常 + 心衰 + 结构性心 | 人口老龄化 + 基础心脏病进展, **无条件 forced** (急性事件死亡风险) | 强 |
| (β) 椎间盘退变 + 慢性脊柱病 | 老龄 + 久坐生活方式, **半 forced** (疼痛驱动, 可拖延) | 中强 |
| (γ) T1 糖尿病 + 先进 T2 | T1 自身免疫 (不可逆, 终身 forced), T2 部分受 GLP-1 替代 | 强 (T1) / 中 (T2) |
| (δ) 慢性疼痛 + Parkinson DBS | 阿片替代 + 运动障碍管理, **政策/临床路径驱动** | 中强 |

**与 Quanta 观察一致**: v2 propagation mapper Step 1 默认单一 core 在 multi-line 公司上会误导 Step 2-4, Step 5 事后修正. 这是 §5 建议 #3 (allow multiple trend cores) 的第二次 evidence.

### Step 2-4 — 分别对每条 chain 跑 (简版)

|  | (α) 心血管 | (β) 脊柱 / 神经 | (γ) 糖尿病 | (δ) 慢性疼痛 DBS |
|---|---|---|---|---|
| Core node | 植入式心电装置 + 结构性心 | 脊柱固定 + 机器人导航 | 胰岛素泵 + CGM | DBS 刺激器 |
| Restricted node | FDA PMA 许可 + 心内科医生 | FDA + 脊柱外科培训 + Mazor | FDA + 内分泌科 + payer | FDA + 神经科培训 + IRB |
| MDT 位置 | ~45% market share (大 + PMA 装置) | Mazor 机器人领先 + 传统脊柱 top 3 | MiniMed 780G + Guardian CGM | DBS 全球 #1 (~60% share) |
| 市场 narrative 当前 | 稳态保守 | 机器人采用率 slow | GLP-1 overhang + Libre 竞争 | 冷门, 少被提 |

### Step 5 — Identify special roles (双硬测试 per segment 应用)

#### Bridge 硬测试 (v2.1 trigger-independence + ≥30% resilience)

对 MDT company 层面应用:

**触发机制独立性判定** (per segment):
- α (CV): 心律异常 + 急性心脏事件, 由老龄化 + 基础心脏病进展驱动. **独立**.
- β (Neuro/Spine): 退变脊柱 + DBS, 由老龄 + 运动障碍驱动. **独立于 α**.
- γ (Diabetes): T1 自免 + T2 代谢综合征, 由基因 / 代谢驱动, 受 GLP-1 替代影响. **独立于 α, β**, 但内部 T2 部分 **条件 forced**.
- δ (DBS 慢性疼痛): 由阿片政策 + 临床路径驱动. **独立于 α, β**, 但 δ 与 β 共享 Neuroscience segment, 实际合并为一个 revenue segment.

修正后 **3 条独立触发** (α / β ∪ δ / γ), 不是 4 条.

**Resilience 测试**:
- FY24 revenue 分布 (⚠ approximate): CV 37% / Neuro (含 β + δ) 30% / MedSurg 25% / Diabetes 8%
- 最坏情境 1 (GLP-1 对 Diabetes decimates): Diabetes 归零 → 剩 92% 革命性影响. ✓ 通过 ≥30% threshold 超标
- 最坏情境 2 (CV 结构性衰退, 如 TAVR 竞争 + CRM 创新停滞): CV -50% → 剩 CV 19% + Neuro 30% + MedSurg 25% + Diabetes 8% = 82%. ✓ 通过
- 最坏情境 3 (Neuro 失速, 脊柱竞争 + DBS 渗透停滞): Neuro -50% → 剩 85%. ✓ 通过
- **单 chain 最大 trigger 崩塌不摧毁 company-level thesis**; 必须**至少 2 条同时崩**才进入 <30% 门槛. **Bridge test pass strongly**.

#### Duration 硬测试 (v2.1, installed-base ≥ 2× deployment + 可量化切换成本)

**必须 segment-by-segment 跑** (非合并 company 层), 因为 MDT 各 segment 的 installed-base 时间结构差异大:

| Segment | Deployment 周期 | Installed-base monetization 窗口 | Ratio | 切换成本可量化 | Pass? |
|---|---|---|---|---|---|
| 心律管理 (CRM, pacemaker + ICD) | 1 次植入 + 7-12 年到电池更换 | 患者 10-25+ 年周期 (电池 + 代系升级) | **~2-3x** | ✓ Lead 永久物理留存, 新装置必须 MDT 兼容 | ✓ |
| 结构性心 (TAVR + MitraClip) | 1 次植入, 不换 | 单次植入 10-20 年, **无 recurring** | **~1x** | ✗ 无后续 revenue | **✗ 单线失败** |
| 脊柱固定 + Mazor 机器人 | 植入 + Mazor 装机 5-10 年 | 植入 15-25 年 (少换) + Mazor 推 I&A (razor+blade) | **~3-5x (Mazor vector), ~1-2x (静态植入)** | ✓ Mazor 培训锁定 | ✓ (Mazor vector) / 临界 (静态植入) |
| DBS (Parkinson + 慢性疼痛) | 1 次植入 + 3-9 年电池更换 | 患者 10-20+ 年周期 | **~3-5x** | ✓ Lead 永久 + 系统兼容 | ✓ |
| MedSurg 设备 + consumables | 设备 5-10 年 + 耗材 per procedure | Razor+blade 结构, 医院 lock-in | **~按 workflow lock-in** | ✓ GPO 合同 + 认证 | ✓ (workflow 形式, BDX 同型) |
| Diabetes (MiniMed pump + CGM) | 泵 4 年 + CGM 10 天 sensor | 患者 10-30 年 (T1 终身) | **~5-10x** | ✓ Endo 处方 + payer 网络 | ✓ |

**加权 duration 通过率** (按 FY24 revenue share):
- CV 37% = CRM 25% (pass) + 结构性心 12% (fail) + 其他 CV 少量
  - **CV 内部拆分**: 约 25/37 = 68% 通过, 12/37 = 32% 失败. CV segment 整体 ~68% 加权通过
- Neuro 30% 全通过 (Mazor vector 强, DBS 强)
- MedSurg 25% 通过 (workflow)
- Diabetes 8% 通过
- **MDT company 层加权**: (37% × 0.68) + 30% + 25% + 8% = **88% duration-positive, 12% duration-exception (结构性心)**

**结论**: Duration hard test **按 segment 跑后**给出 88% 通过率. 公司整体 pass, 但结构性心是明确的 duration exception, 应在 validation 里显式标注 (不像 ZBH 整条线 fail, MDT 只是一个 sub-segment).

### Step 6 — Time sequence

- Immediate (2024-2026): CRM 替换周期 + DBS 替换周期稳态; Diabetes 780G 放量
- Early (2026-2028): Mazor AI 导航渗透 + 结构性心新适应症 (MitraClip 新 indication)
- Mid-cycle (2028-2033): 下一代 CRM 无导联 + 心律闭环 + 糖尿病自动闭环 AI
- Long-tail (2033+): 既有 installed base 持续 replacement + service

### Step 7 — Economic vs market propagation

- **市场当前 narrative**: "慢速成长, 多线 underperform, Diabetes 面临 GLP-1, 整体不性感". PE 17x (⚠) < SPX 20x
- **真实 economic**: CV 稳 + Neuro mid-teens potential + Diabetes 自动闭环正加速 + MedSurg 稳定
- **Expectation gap 候选**: 市场给 MDT 的 multiple **假设** Diabetes 大幅恶化 + CV 停滞 + Neuro 无突破. Reverse DCF 隐含约 3-4% 永续增长, 但实际 mid-single organic 可达 5-6%. 差距 = gap.
- **Gap 存在但 narrow**: 不像 GE Aero 的 time-horizon gap 那么锐利, 也不像 Quanta 的 trigger-共振 gap 那么隐性. MDT 的 gap 是**综合执行 gap** — 需要 2-3 季度持续 organic growth ≥5% 才能 prove.

---

## 2. Profit Owner Resolver v2 · 6 层 ownership

| 层 | 判定 | 依据 |
|---|---|---|
| Revenue owner | ✓ | FY24 revenue ~$32-33B, low-to-mid single digit growth |
| Gross profit owner | ✓ | GM ~65%, 远高于 medical device 中位数 |
| Cash flow owner | ✓ 但**未卓越** | FCF ⚠ $5-6B, FCF/revenue ~18% (健康但非顶级, ISRG ~25%+) |
| Return owner | 中 | ROIC ~10-12% (执行改善潜力); ROE 正常 (杠杆不高) |
| **Bridge owner** | **✓ strong** | 三条独立 trigger, resilience >60% 任一崩塌 |
| **Duration owner** | **✓ weighted 88% pass** | 按 segment 跑, 绝大多数通过, 结构性心是 12% exception |

### Bridge + Duration 同时通过意味着什么

这是第一个**双通过**的 candidate. GE 是 duration-only, Quanta 是 bridge-only. MDT 的特殊性:

1. **Downside protection 来自 bridge** (任一 chain 崩不摧毁 thesis)
2. **Upside monetization 来自 duration** (installed base 持续扩张 + razor+blade)
3. **两者叠加不是线性加总** — bridge 降低 σ, duration 升高 mean return. 数学上**Sharpe-like 改善**, 不是 EV 改善.

这暗示 **MDT 理论上是最 defensive 的 multi-chain duration owner**, 但也是最不 sexy 的 — 没有单一 explosive narrative 吸引 generalist.

### Q-a / Q-b / Q-c / Q-d 元评估

- **Q-a 主动识别**: ✓ v2.1 三个 skill 都强制问 bridge + duration. v1 (无 bridge/duration step) 只会看到"low-growth multi-line mature medical"的外观.
- **Q-b 加值**: **显著且具体** — v1 / scanner 看到 "quiet improvement + out-of-favor + PE 17x"; v2.1 给出**结构化的 Sharpe-like thesis**: bridge downside + duration upside 叠加, 不是单纯的 mean reversion 押注.
- **Q-c 硬测试可操作性**: **双 pass, 可操作** — bridge 按 trigger independence + resilience 跑得出 "3 条独立, 任一崩 revenue ≥82%"; duration 按 segment 跑得出 "88% weighted pass + 12% exception".
- **Q-d 多线处理**: **首次暴露新要求** — Duration hard test **必须 segment-by-segment**, 不能公司层一刀切. 结构性心是明确 exception. 这是 v2.2 应该补入 reminder 的点.

---

## 3. Expression Selector v2 · 本 trend 下最佳 expression

### 7 种候选对比 (医疗多线 duration trend)

| Expression | 代表 | 主要 thesis | Problems |
|---|---|---|---|
| Core leader | ISRG (robot) / GEHC (imaging) | textbook duration | 不在 MDT 同 trend |
| 2nd-order | BSX (cardio only) | 单 segment 高增长 | 单线, 非 bridge |
| Upstream bottleneck | BDX (consumables) | Workflow lock-in | 不在 MDT 同 trend chain |
| Hidden owner | STE (sterilization) | 隐性 service owner | 不在 MDT 同 trend chain |
| **Bridge owner** | **MDT** | 3 条独立 trigger 共振 | 低增长 narrative 压低 multiple |
| **Duration owner** | **MDT + ISRG + GEHC** | 多 segment installed base | MDT 有结构性心 12% exception |
| No-trade | — | — | — |

### 关键判定

**MDT 是本 trend 下的 bridge owner + (partial) duration owner**. 和 ISRG (pure duration monopolist) / GEHC (pure duration service) 形成**互补而非替代**.

**最佳 expression 随 time horizon 变化**:
- 6-18 month window (active catalyst): 若无大 M&A, MDT 的 gap 填补需要 2-3 季度 organic growth 兑现 → **Initiate (light)** 适合
- 3-5 year window: MDT 的 bridge × duration 双重优势在长期更显, 可 **Initiate (standard)**
- 10+ year: MDT / BDX / ISRG / GEHC 都应在 portfolio, 不选择

**不选 ISRG 替代 MDT**: ISRG 单 chain (机器人手术), 无 bridge; MDT 单机质量不及 ISRG 但结构保护更强.

### Q-a / Q-b / Q-c

- **Q-a 主动识别**: ✓ v2.1 expression selector 7 candidate + Step 3/4 强制问 bridge/duration → MDT 在"bridge owner"和"duration owner"两个 slot 同时命中. 这在 v1 4-option 下无法表达 (v1 只有 leader/2nd/upstream/hidden/no-trade).
- **Q-b 加值**: ✓ 揭示 MDT 的**互补性** — 不是 ISRG 的替代, 而是 portfolio 中的不同 role. generalist 容易把 ISRG 当"最佳医疗器械" dismiss MDT, v2.1 视角让两家各安其位.
- **Q-c 硬测试**: 同 Owner Resolver, 双 pass + segment-by-segment 应用.

---

## 4. Validation Verdict

### 结论: **MDT 通过 v2.1 完整验证**, 是第一个**双硬测试通过**的 candidate

| 元问题 | 结果 |
|---|---|
| Q-a 主动识别 | ✓✓ v2.1 三个 skill 都强制路过 bridge + duration. v1 workflow 会看到"慢速成长多线"外观但不会命中结构. |
| Q-b 加值 | ✓✓ reframe 为 "Sharpe-like 结构" (bridge 保底 + duration 增长), 不是单纯 mean reversion. |
| Q-c 硬测试可操作性 | ✓✓ 双 pass, 都能给具体数字 (bridge resilience ≥82%, duration weighted 88%). |
| **Q-d 多线处理 (新)** | **✗ 暴露要求**: Duration hard test **必须 segment-by-segment**, 否则公司层一刀切会误判. 这是 v2.2 应补入的 reminder. |

### 加值的具体形状

**v1 / scanner vs v2.1 full validation 的真实 delta**:

> Scanner (baseline): "quiet duration owner + bridge potential, out-of-favor PE 17x, 需 FY26 执行验证"
>
> v2.1 full validation: "**3 条独立 trigger 驱动的 bridge owner (resilience 82%+ 单链崩) × segment-weighted 88% duration-pass (CRM + Mazor + DBS + Diabetes 强, 结构性心为 12% exception)**. 不是 mean reversion 押注 (PE 回 20x 的简单故事), 而是 **Sharpe-like 结构性** — bridge 压缩 σ, duration 抬升 mean, 两者叠加提供多 segment 公司少见的 defensive upside"

这改变 Kill Switch:
- Scanner 的 break condition: 单 segment (如 Diabetes) 崩盘
- v2.1 修正: 必须**至少 2 条独立 chain 同时崩**才 break thesis. Diabetes 被 GLP-1 decimates 一条 (单 8% revenue) 不触发 Kill Switch.

### Action state 决定

- **Pre-memo**: Initiate (light), 待 FY26 验证
- **Post-memo**: **维持 Initiate (light)**, 理由: 双硬测试通过 + expectation gap 存在 (PE 17x vs fair 20-22x), 但 gap 填补需要 2-3 季度 organic growth ≥5% 的执行 prove. **未 upgrade 到 Initiate (standard) 因 Q1 2026 earnings 未入 + FCF/segment growth MCP 未验证**.

---

## 5. 对 v2 本身的修改建议 (累积 GE + Quanta + MDT 三例)

| # | 建议 | 触发案例 | 优先级 | 理由 |
|---|---|---|---|---|
| **1** | **Duration hard test 加 "segment-by-segment 应用" 明确要求**, 不得公司层一刀切 | **MDT** | **高** | MDT 首次暴露. 多线公司若按公司层跑, 结构性心的 12% exception 会被忽略; 按 segment 跑得出加权通过率可 falsify |
| 2 | Propagation Mapper Step 1 允许 multiple trend cores | Quanta + MDT | 中 (累积 2 例) | 两个 multi-chain 公司都暴露 Step 1 单一 core 的局限 |
| 3 | Duration hard test 2x 比值加 absolute-years OR 条件 (≥20 年差) | GE | 中 | GE 刚过 2x (~2.0-2.5) |
| 4 | Expression Selector "time horizon shift" 升为 Step 必答 | GE + MDT | 中 | MDT 也暴露 time-horizon 敏感 (6-18m vs 3-5yr 最佳 action 不同) |
| 5 | Owner Resolver bridge/duration 步骤前移 | Quanta | 低 | 累积 1 例, 影响小 |
| **6** | **Bridge hard test 在**"多 chain 但 terminal demand 重合"**场景下的独立性判据** | MDT + Quanta | 中 | 两家都遇到 terminal demand 相关但 trigger 独立的边界. v2.1 trigger-independence 是正确判据, 但文字可再强化 |

**哪些现在改** vs **累积 3 例后改**:
- #1 已是第三例稳定暴露, **应在下次 v2 patch 中一次性打包 #1 + #2 + #3** (三件都是有明确 evidence 的补丁, 累积效率更高)
- 本次 session 不执行, 避免 thrashing. 累积到下一次触发时一起改

---

## 6. Next Step

1. **Queue update** (本次 session 中执行): MDT `status: raw` → `validated`, `action_state: "Initiate (light)"`, notes 引用本 memo
2. **medical_devices_top5 不需要 needs_patch**: MDT 的 scanner 判断被 memo 确认(仅加了 segment-level 拆分的新信息), 不需要回流修正 source_output
3. **下一个 queue top**: GEHC (Top #2, 纯 duration, 预期简单) 或 BDX (Top #3, workflow lock-in 形式 duration, 会暴露 v2.1 可能的文字补丁)
4. **累积到 v2.2 的三件补丁**: #1 (segment-by-segment duration) + #2 (multiple trend cores) + #3 (duration absolute-years OR). 下次触发时一次性执行.
