# HUBB — Default Map Audit (S-1 产物, v2.1)
**Date**: 2026-04-22 | **Phase**: 0.75 (v2.1, Phase 3 Fixes 后 FP4/FP5 降级) | **Price**: $549.11 | **Mkt Cap**: $29.2B

**v2 修订原因**: v1 使用 FMP total reported +3.84% 推断 organic 疲软, 但管理层 Q4 earnings call 披露 2025 organic +7-8% (price+3%/volume+4-5%)。两者差 4pp。Phase 2 segment 数据揭露更深的问题: **reported segment 数据与管理层 organic claim 存在 5pp 系统差距** — 这本身就是核心 failure_point。

**v2.1 修订原因**: Phase 3 Fixes (Skeptic 审计响应) 后:
- 扩展 peer (EMR $18B, AME $7B) 与 ETN/POWL/NVT 共同构成 5 家行业 peer
- **FP4 (R&D 不披露) 被削弱**: EMR / AME FY25 也不独立披露 R&D → HUBB 非独家, 是 M&A-heavy 行业 pattern
- **FP5 (Tangible BVPS -$11) 被削弱**: EMR Intang/TA 66% / AME 74% 比 HUBB 54% 更 M&A-heavy, 但市场给 EMR/AME 更高 PE — 市场不把 "负 Tangible BVPS" 视为 bear 信号
- **核心 thesis 维持**: FP1 (口径差) + FP2 (Aclara) + FP3 (ROIC/M&A 质量) 3 个主证据全部 Phase 2-3 强化
- **fair value 更新**: 原 $479 → **$496** (三方法加权: DCF 50% + Peer 30% + SOTP 20%, Lens 1/2 70/30)

---

## 1. 市场默认地图 (Market Default Map)

```yaml
default_map_audit:
  market_default_definition: |
    "HUBB 是电网超级周期(Grid Super-Cycle)的高质量复利受益者 —
    Utility Solutions 主导 + Electrical Solutions 靠 Data Center 加速
    的双引擎电气设备复利股, 管理层'organic +7%/margin 历史高点'
    叙事被市场完整接受。"

  market_default_variables:
    - "变量 1: 管理层披露的 organic growth (2025: +7-8%, Q4: +9%)"
    - "变量 2: 数据中心 $250M 敞口 FY25 → 管理层预期 FY26 继续 +50%+"
    - "变量 3: 22.7% adj operating margin 历史高点 (FY25, +140bp YoY)"
    - "变量 4: 美国 utility CapEx 2025 $208B → 2029 $1T cumulative"

  market_default_valuation_language: |
    "28-32x FY26E EPS $19.50-19.80 P/E → 公允区间 $546-634
    (consensus midpoint ~$590, 当前 $549 贴近); ETN 39x / NVT 53x /
    POWL 47x → HUBB 33x 为'板块相对便宜+最高 OPM'=继续 re-rating
    + 业务改善双轮驱动。"

  market_default_narrative: |
    "电网超级周期才刚开始, HUBB 站在最直接受益位置, 管理层连续 3
    年超指引, margin 扩张正反馈, Systems Control/DMC 并购巩固护城河,
    数据中心从 0 到 $250M 证明跨周期竞争力。买入持有, 越涨越信。"

  # ------- 失灵事实 (重写, 5 个核心矛盾) -------
  failure_points:

    - fact: |
        "管理层 organic growth claim 与 segment reported growth 存在
        5pp 系统差距 (FY25):
        - 管理层口径 (Q4 earnings call): HUS organic +7%, HES organic
          +13%, 总 organic +7-8%
        - FMP segment reported (continuing ops): HUS +2.0%
          ($3,601M→$3,672M), HES +7.1% ($2,028M→$2,172M), 总 +3.84%
        - DMC 11月底并表贡献 ~$30-40M ≈ +1pp inorganic → organic HUS
          ≈ +1%, 不是 +7%
        即使管理层 +7% 指 'pro-forma excluding certain effects', 差距
        仍 5pp+, 且 HUBB 未披露调整项 reconciliation。"
      why_old_map_fails: |
        "旧地图默认'管理层数字=真实 organic'。但股东拿到的是 segment
        reported 的 GAAP 收入, 不是管理层讲的'core organic'故事。如果
        实际 HUS organic ~+1-2% (not +7%), 整体业务动能接近 stall, 当
        前 33x P/E 的定价完全错误。数据口径差距大得像故事和现实之间
        的鸿沟 — 市场买的是故事。"

    - fact: |
        "Grid Automation sub-segment 2025 Q3 销售 YoY -18% (2025 Q2
        earnings call 管理层确认), 2024 Q1 开始连续 5 个季度负增长。
        Aclara 智能电表业务管理层 call 中承认 'last three quarters
        have been quite flat, down to a stable base of smaller
        projects, MRO, and meeting coops'。Grid Automation 占 HUS ~25%
        (~$900M)。"
      why_old_map_fails: |
        "旧地图'AMI 2.0 升级周期带动 HUS 主升浪'。实际: Aclara 自 2018
        $1.1B 收购以来累计贡献不彰, 2019 Q2 即发生减值, 2023-2025 smart
        meter 升级周期进入谷底(customer waiting for next-gen tech)。
        管理层 earnings call 明确说'stable base'即承认增长机器停摆。"

    - fact: |
        "ROIC 从 2024 FY 15.3% 下降到 2025 FY 13.8% (-150bp, 绝对值)。
        投入资本 $5.12B → $6.38B (+25%), 但经营利润 $1.09B → $1.22B
        (+13%)。DMC Power 并购 $958M, 按管理层指引贡献 FY26 EPS
        $0.30-0.40 → 增量 NOPAT ~$25M / $958M IC = **增量 ROIC 仅
        2.6%**, 远低于 HUBB 13.8% average 及 WACC 9.0%。"
      why_old_map_fails: |
        "旧地图'高质量复利股 + 优秀资本配置'。DMC 并购按 HUBB 自己
        的成本估计, ROIC 2.6% 破坏价值。连续两次大并购(Systems Control
        + DMC) 合计 $2.2B → ROIC 从 15.3% 退化至 13.8%, 如果 2026 再
        并购 + Aclara 商誉减值被触发(goodwill 占 equity 79%, tangible
        BVPS = -$11.22), 'disciplined acquirer' 叙事将被 impairment
        公告击碎。"

    # [v2.1 REVISED, Phase 3 Fixes] — 原 FP4 "R&D 不披露" 在扩展 peer
    # (EMR/AME) 验证后削弱: EMR / AME 2025 也不披露 R&D = HUBB 非独家
    # 行为, 是行业 pattern 非 HUBB-specific governance 问题。保留为
    # 背景性质, 不作为 failure_point 主证据。

    - fact: |
        "HUBB 与 Utility T&D 扩展 peer 在 R&D 披露上**共同**不独立披露:
        - HUBB FY25 R&D/Rev: $0 披露 (嵌入 SG&A/engineering)
        - EMR FY25 R&D/Rev: $0 披露 (亦嵌入 SG&A)
        - AME FY25 R&D/Rev: $0 披露 (FY24 曾披露 3.4%, FY25 归入 SG&A)
        - ETN FY25 R&D/Rev: **2.9%** 披露
        - NVT FY25 R&D/Rev: **2.0%** 披露
        - POWL FY25 R&D/Rev: **1.0%** 披露
        即 6 家扩展 peer 中 3/6 披露 R&D (规模化 operators), 3/6 不披露
        (conglomerate-style M&A-heavy 模式)。"
      why_old_map_fails: |
        "这**不构成** HUBB-unique governance 失灵证据 (原 v2 判断过重)。
        但该行业 pattern 仍有意义: HUBB 与 EMR/AME 同属 'conglomerate
        M&A-heavy + 不独立披露 R&D' 一类, 与 ETN/NVT/POWL 'organic-plus-
        transparent' 一类形成 2-camp 分化。HUBB 所在 camp 的典型特征
        是 OPM 高 (20-25%) + ROIC 中等 (7-14%) + 增长低于透明 peer。
        这一 failure_point 降级为'行业 pattern 确认', 不作为 thesis
        主证据, **删除原'R&D 侵蚀 moat'的强推论**。"

    # [v2.1 REVISED] — 原 FP5 Tangible BVPS 深度在扩展 peer 中不是最极端:
    # EMR Intang/TA 66%, AME 74% 均 > HUBB 54%, 比 HUBB 更 M&A-heavy
    - fact: |
        "HUBB Tangible BVPS = -$11.22/股 (FY25, Goodwill+Intangibles
        $4,455M / Total Assets $8,229M = 54%)。**但在扩展 peer 中非最
        极端**:
        - POWL: Intang/TA **1.1%**, Tangible BVPS **+$17.37** (纯 organic)
        - HUBB: Intang/TA 54%, Tangible BVPS -$11.22
        - ETN: Intang/TA 50%, Tangible BVPS -$3.40
        - EMR: Intang/TA **66%**, Tangible BVPS -$13 (估计, 比 HUBB 深)
        - AME: Intang/TA **74%**, Tangible BVPS -$5.58 (但 Intang 最高)
        - NVT: Intang/TA 66%, Tangible BVPS -$5.01
        HUBB 处于 M&A-heavy camp 中位, **不是最极端**。FY25 回购
        $225M vs FY24 $40M = +462%, 在股价 $549 (52-周高) 加速回购。"
      why_old_map_fails: |
        "原 v2 'HUBB Tangible BVPS 极端负 + 高位回购 = governance 红灯'
        在扩展 peer 中**部分失效**: EMR (Intang/TA 66%, Tangible
        BVPS 比 HUBB 更深负) / AME (Intang/TA 74%) 均比 HUBB 更 M&A-
        heavy, 但它们当前 PE 35.6x / 36.2x 都高于 HUBB 32.9x — 市场
        **愿意为 M&A-heavy + 负 Tangible BVPS 付 premium**, 说明该维度
        不是独立的 bear 信号。该 failure_point 降级为 '二阶 governance
        关注', 不作为 thesis 主 bear 证据。**核心保留**: 高位加速回购
        eta 0.95 (<1.0 警告) — 这是 HUBB-specific 的 capital allocation
        选择, 不是 peer 共同现象 (ETN 2025 回购 $3.2B 但股价低于 DCF
        FV, eta >1.0)。"

    - fact: |
        "2026 Q1 内部人 A/D ratio = 0.77 (16 笔 sales / 0 buys); 2024-
        2026 过去 9 个季度 A/D 中位数 = 0.85 (偏卖方)。股价同期从
        $340(52-周低) 涨到 $549 (+62%), 管理层在历史最高点选择零买入 +
        16 笔卖出(2026 Q1)。"
      why_old_map_fails: |
        "旧地图'管理层与股东利益一致, insider activity 可忽略'。实际:
        if 管理层真信 'super-cycle 刚开始', 股价最高点是加仓窗口 —
        tax basis 成本信号最强。实际看到的是 systematic trickle-
        selling。加上 FY25 OPM 22.7% 历史高点 + 管理层 FY26 guide EPS
        midpoint 仅比 FY25 高 +18% (实际上 FY25 EPS $16.54 → FY26
        guidance $19.50 mid = +17.9%, 含 DMC ~$0.35 贡献 → organic EPS
        +15.7%, 不到 consensus +19.2%), 内部人行动与管理层 guidance
        一致: 未来 organic 收益已接近 fair, 非起点。"

  why_new_map_needed: |
    "[v2.1 修订, Phase 3 Fixes 后] 如果继续用'电网超级周期高质量复利
    股'地图, 读者会:
    (a) 把管理层 organic +7% 当 segment reported +2% 的同义词, 忽略 5pp
        口径差——这差距在 consolidated revenue/earnings 层面会无可回避
        地显现(FY26 consensus $6,333M 需要 +8.3% total, 若 DMC 贡献 +4pp
        + organic 实际 +1-2% → 差距 3pp);
    (b) 错过 ROIC 下降的持续性信号 — 增量 ROIC 2.6% 是并购拼装商的典型
        特征, 不是复利机器;
    (c) 把 Grid Automation -18%/flat 的 $900M 子业务当 'temporary',
        实际是 Aclara 并购 7 年未兑现的长期结构问题;
    (d) 承认扩展 peer (EMR/AME) 都属于'conglomerate M&A-heavy + R&D
        不披露' camp, 该维度**不是 HUBB-unique 红灯**, 仅为行业特征;
    (e) 但高位回购 eta <1.0 仍是 HUBB-specific 资本配置警告。
    一旦 2026 Q1/Q2 任何一个季度 organic HUS 报 0-1% (与 segment
    reported +2% consistent 但与管理层 +7% claim 冲突), 33x P/E 会
    立即被市场重新定价到 **Lens 2 fair $372** (三方法加权:
    DCF $395 / Peer $436 / SOTP $218) = **-32% downside**。
    相反, 若 FY26 Q1 HUS reported ≥+5% (Lens 1 pivot), fair 升至
    **$550** = **-0.2%** (基本 fair), 不再有 short 价值。
    核心 bear case 赔率: 0.3 × -32% + 0.7 × (-0.2%) = **-9.7%**
    概率加权 downside (中性偏 bear, 不是强 bear)。"
```

---

## 2. 候选新地图 (待 Phase 4.5 compression_test 验证)

**临时假设 (v2)**: HUBB 不是"电网超级周期高质量复利股", 而是:

> **"一个管理层叙事与 segment reported 数据系统性偏离 5pp 的后周期
> 并购拼装商 — OPM 已见顶, ROIC 在 M&A 拖累下下行, Aclara 7 年不
> 兑现, R&D 不透明, 管理层在历史高点零加仓 — 但市场仍按'故事'的
> 33x 定价, 不按'segment data'的 25x 定价。"**

### 三个核心变量切换 (v2 修订)

| 市场默认变量 | 我们认为真正的第一变量 | v1→v2 差异 |
|------------|----------------------|-----------|
| 管理层 organic +7% | **Segment reported growth (口径不作调整的 GAAP 数字)** | v1 也聚焦 volume, 但基于错误前提(FMP -3.8%); v2 聚焦"管理层-reported 口径差"本身 |
| AMI 2.0 升级周期 | **ROIC 方向 + 增量 ROIC** (DMC 2.6% vs HUBB 13.8% avg) | v1 用总 ROIC, v2 用增量 ROIC 显示并购质量 |
| 数据中心敞口 | **P/E multiple 对 organic 口径冲突的敏感性** | v1 简单 PEG, v2 显式按 segment reported growth 重算 |

### 估值语言切换

- 市场: 28-32x FY26E P/E (default) — 基于管理层 organic narrative
- 我们: Dual-lens valuation
  - **Lens 1 (管理层 claim 成立, 70% prob)**: 25-28x ROIC-adjusted (vs ETN 39x 有 ROIC 18% / POWL 47x 有 ROIC 28%, HUBB 14% ROIC 对标应 ≤27x) → fair $495-540
  - **Lens 2 (segment reported 口径才真实, 30% prob)**: 20-22x recession mid (organic <+2% 不支持 "复利股" 标签) → fair $370-420
  - **概率加权 fair value**: 70%×$515 + 30%×$395 = **$479** vs 股价 $549 → -13% downside

---

## 3. Kill Switch 候选 (v2 修订)

- [KS-1 红] FY26 Q1 HUS segment reported growth ≥ +5% (excluding DMC 并表)
  → 管理层 organic claim 被 GAAP 数据佐证 → **PIVOT 概率 40%**
- [KS-2 红] ROIC 2026 FY 恢复到 ≥15% + 无新并购 → 主线 ROIC 被削弱
- [KS-3 黄] Grid Automation 连续 2 个季度 organic > +3% → Aclara 主线被削弱
- [KS-4 黄] FY26 FY DMC 披露 incremental EPS $0.40+ (超管理层 guide 上限)
  → DMC 并购被证明质量 OK
- [KS-5 黄] HUBB 在 10-K 或 investor day 首次披露 R&D 独立数字 → 透明度问题解决
- [KS-6 绿] 管理层 2 个季度内有 **显著 insider buying** (≥3 笔, 总额 ≥$5M) → 管理层内心 thesis 转为 bullish

---

## 4. 与 v1 对比表

| 维度 | v1 (被 Phase 2 数据削弱) | v2 (当前) |
|------|------------------------|----------|
| 核心失灵 | organic volume 持续减速到 -1% | **管理层 claim 与 reported 口径差 5pp** |
| HES 判断 | Slow-growth 工业电气 + 4% 数据中心 | **HES organic +13% (管理层), reported +7.1%** — 口径差同样存在但幅度略小 |
| HUS 判断 | 超级周期没传导到 HUBB | **Grid Automation 结构性拖累 + Aclara 7年不兑现** — 更具体 |
| R&D | 0 (误读 FMP) | **不单独披露** (信息质量问题, 不是零投入) |
| 估值张力 | PEG 8.7 (极端) | **Dual-lens 概率加权 $479** (-13% downside, 更 calibrated) |

**v2 更诚实地面对了 Phase 2 数据发现, 主线从"简单 bear"升级为"口径差 + 增量 ROIC + 披露质量"的三层复合论点。**
