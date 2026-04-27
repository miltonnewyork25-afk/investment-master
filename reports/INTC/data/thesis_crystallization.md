# INTC Thesis Crystallization (Phase 0.75) — 2026-04-26

> Tier 3 启动产物 | 用户约束: **不强求差异性观点, 主张深入还原事实真相**
> 配套产物: `reports/INTC/staging/INTC_default_map_audit.md` (S-1)

---

## 1. 单一核心问题 ("一个问题"测试, L1 原则 #5)

**如果只能问 INTC 一个问题, 问什么?**

> **当前 $414B 市值 (距 6 个月前 +115%, 距 Q1'26 财报当日 +23.6%) 隐含的 "Intel 是 AI CPU 复兴最大赢家 + Foundry 期权可兑现" 故事, 在多大程度上已经把 5-7 年的好消息打包定价? Q1'26 -5% server volume / +27% ASP 是真实需求转折, 还是 supply-constrained pricing 的短期红利?**

整份报告围绕这个问题组织。

---

## 2. 三大候选范畴 (P0 范畴预测试, v22.2 强制)

| 范畴 | 估值方法 | 关键变量 | 隐含假设 | Phase 4.5 验证状态 |
|---|---|---|---|---|
| **A. AI CPU 复兴受益股** | EV/2027E Sales 6-8x | DCAI 增速 / Xeon 6 attach / Foundry external | DCAI 持续 +20% YoY, 18A 客户 2027 落地 | 待 P3-P4 验证, 候选 Lens 1 (市场默认) |
| **B. Supply-constrained pricing trade + 长期份额流失股** | 周期股 PE 8-15x + Foundry NPV | Server volume / AMD share gain rate / Foundry OpEx | volume -5% 是 supply-constrained, normalization 后 +0-3%; AMD 抢 ~3-5pp/年 | **Phase 0.75 倾向** 的范畴 |
| **C. 政府股权 + 关键 25% 装机量股票** | 类 LMT/RTX 定价 (政策股) | 政府股权稀释 / CHIPS Act / Trump 关税 / 国家安全合同 | 地缘风险溢价持久, 政府不允许 Intel 失败 | 候选 Lens 2 (隐含 floor) |

**初步选择**: **B 是 thesis 主线, A 是市场默认, C 是隐含 floor**。报告结构:
- Ch 1-2: 市场默认 A 的事实基础 (公平展示 +22% DCAI / Xeon 6 / Tan 执行)
- Ch 3-7: 用 5 个 failure_points 把 A 削到 30% 概率, 把 B 推到 50%, C 维持 20%
- Ch 8-10: 估值 — A 隐含 $414B 公允, B 隐含 $200-280B, C 隐含 $150-200B; 概率加权 ~$220-280B → $43-55/股 → 当前 $82.54 隐含 -33% to -48% downside

---

## 3. 主线 thesis (3-句话陈述, 可证伪)

1. **Q1'26 不是"AI CPU 需求拐点", 是"supply-constrained pricing 的最后一杯酒"** — server volume -5% / ASP +27% 是 supply-constrained 而非需求驱动; 管理层自己说 supply 持续到 2026 年其余季度, 一旦缓解 ASP 大概率 normalize, AMD/ARM 同时抢量。

2. **Morgan Stanley $32.5-60B CPU TAM 里, Intel 大概率拿到 <$15B (≤25%)** — AMD 已 41% server revenue share 且年增 5pp; ARM 在 hyperscaler compute 占 50% 且预测 2029 在 custom AI host 占 90%; NVIDIA Grace 在 NVL72 100% 内化 host CPU; Intel 在 Rubin NVL8 中标是 transitional 而非 permanent。

3. **+115% rerate (6 个月内) 已 over-discount Foundry 期权** — 当前隐含 Foundry $200B 价值, 但 18A yield + 外部 anchor customer **0 公开披露**, 14A 可能 pause; 概率加权公允价值 $43-55/股, 当前 $82.54 隐含 -33% to -48% downside; 评级**审慎关注**, 但留 30% 概率给 A 范畴 (政府救助 / Apple 18A 落地 / Tan 战略奇袭) 作为期权下界。

---

## 4. Kill Switch (5 条, 含 baseline + threshold, W-7 v1.1 强制)

| ID | Variable | Baseline (2026-Q1) | Confirm (维持 thesis) | Weaken (减仓信号) | Pivot (反转) | 监测频率 |
|---|---|---|---|---|---|---|
| KS-1 | Server volume YoY | **-5%** | <-3% to +2% (supply-constrained 持续) | +3% to +8% (真实需求) | +10%+ (爆发增长) | 季度 |
| KS-2 | DCAI ASP YoY | **+27%** | +20% to +30% (持续 4 季度) | +5% to +15% (开始 normalize) | <+5% 或负 (转折) | 季度 |
| KS-3 | AMD server revenue share | **41.3%** Q4'25 | +1.5pp/quarter (匀速抢) | +0.5pp/quarter (放缓) | -1pp+ (Intel 反攻) | 季度 (Mercury) |
| KS-4 | 18A external customer 公开披露 | **0** (黑箱) | 0-1 in 12 月 (期权未兑现) | 1-2 anchor customer 签约 | 3+ anchor or Apple confirmed | 半年 |
| KS-5 | Adjusted FCF | **-$2.0B** Q1 | <-$1B/季 (Foundry 持续烧钱) | -$0.5B 到 +$0.5B (转中性) | +$1B+ (烧钱结束) | 季度 |

**红灯 (减仓 25-50%)**: KS-2 跌到 +5% 以下 OR KS-3 一年累计 +5pp+ OR KS-4 仍为 0
**黄灯 (review)**: 当前已经是黄灯状态 (KS-1 -5% + KS-4 0)
**绿灯 (上修)**: KS-4 ≥2 anchor customer + KS-1 转 +5% + KS-3 停止上升

---

## 5. 三维状态判断 (Phase 0.75 初判, Phase 5 校准)

- **价值状态**: **贵** — 当前 $82.54 / 市值 $414B, EV/Sales (TTM) ~7.7x, EV/2027E Sales 6-7x; 即使乐观情景 (B 范畴改善到 A) 也只支撑 $80-100; +115% 6 个月 rerate 已经 front-load
- **方向状态**: **改善但分化** — Products 经营改善真实 (+22% DCAI op income +$967M YoY), Foundry 持续恶化 (亏损扩大), Adjusted FCF 转负
- **催化状态**: **可能** — 2026 H2 Q3-Q4 财报 (server volume + 18A 客户) 是关键观察窗口; Trump 关税政策 + Apple-Intel 谈判都是潜在催化, 但单一催化对 $414B 体量影响有限

→ **三维组合**: [贵 × 改善但分化 × 可能] → 评级标准默认到 **审慎关注**, 但因高争议性需要在 R-3 圆桌确认 (5 大师中需 ≥3 同意)

---

## 6. 信息纪律 (本报告必须做的事, 不要的事)

**必须做**:
- 公平展示 Q1'26 的真实改善 (DCAI 经营杠杆 + 现金回款 + Tan 执行) — 不能只写 bear case
- 量化 supply-constrained pricing vs 真实需求的拆分 (用历史类比 2021-2022 vs 2023-2024)
- 拆解 +115% rerate 的来源 (NVIDIA $5B 投资 + 政府股权 + AI 叙事 + 短挤压 + 概率加权情景)
- 给出 6-12 月跟踪清单 (5 个 KS 信号)
- 留出 30% 概率给 bull case (不否定可能性, 只标注现在估值已计价)

**不要做**:
- 不写"卖出"或"目标价 $X" — 黑箱 ≥30% (18A 进展 + 政府决策 + Trump 关税), 不能单点目标
- 不强行找"非共识"差异 — 如果反方证据齐全, 主线就是"市场可能过度反应了 5-7 年好消息", 不需要更巧妙
- 不复制 v2.1 (2026-02) 的"政府期权"主框架 — 那时 INTC $45.91, 现在 $82.54, 政府溢价已经 mostly priced
- 不混淆 "agentic AI 利好 CPU" (技术真相) 与 "Intel 是受益最大者" (经济命题) — 前者部分成立, 后者证伪 60%+
- 不用 hedging 词假装平衡 — 写"我们认为 X" 而非 "可能 X"

---

## 7. 报告基调

> 这份报告不是 bull / 不是 bear, 是**一次诚实的还原**: Q1'26 哪些信号是真的, 哪些是 supply-pricing artifact; +115% rerate 哪部分有 fundamentals 支持, 哪部分是叙事溢价; Foundry 期权值多少 (基于公开数据可推演的部分), 哪些是黑箱必须打折。
> 给 90 秒 reader 的执行摘要应能让他记住: **"-5% 量, +27% 价" + "Intel 拿到 1/4 的 CPU 复兴" + 评级审慎关注但留 30% 概率给 bull case**。
