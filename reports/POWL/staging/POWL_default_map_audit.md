# POWL — Default Map Audit (S-1 对齐产物)

> **用途**: Phase 0.75 S-1 强制产出; Phase 5 Ch 1 必须显式呈现此 4 元素 (无痕化写法)
> **配套文件**: `POWL_thesis_crystallization.md` (Phase 0.75 另一强制产出)
> **优先级**: 本文件是 S-1 "对齐" 环节, 回答"市场现在把这家公司当什么"以及"这个默认看法解释不通哪几件具体事实"

---

## default_map_audit (YAML)

```yaml
market_default_definition: "POWL 是美国 AI 数据中心电力基础设施纯 beta, 是过去两年小盘股涨幅最大的 AI 受益标的之一。"

market_default_variables:
  - "季度数据中心订单绝对值 ($100M+ megaproject 是主要兴奋点)"
  - "Backlog YoY 增速 (FY25末 $1.4B → Q1 FY26 $1.60B, +16% YoY)"
  - "Book-to-bill 比率 (Q1 FY26 = 1.75x, 历史最高)"
  - "GM 扩张幅度 (FY22 16% → FY25 29.4% → FY25 Q4 peak 31.4%)"

market_default_valuation_language: |
  TTM PE 47x × NTM EPS growth 承接 → FY27E EPS $5.99 × PE 40-50x = 目标价 $240-300
  (市场用高增长 AI 基础设施股的 PE 框架给 POWL 定价, 与 VRT 50x PE 对齐)

market_default_narrative: |
  "POWL 是小盘纯 switchgear 龙头, 借 hyperscaler CapEx 爆炸进入 AI 数据中心供应链, 从油气承包
  商成功转型为 AI beta。$489M 净现金 + 零长期债 + 28% ROE + 0.55% 商誉比 = 资产负债表最干净
  的 AI 基建股。Q1 FY26 单季 $100M+ 数据中心 megaproject 证明 hyperscaler 开始定向采购 POWL
  的中压开关柜, 3-5 年 DC 订单持续翻倍可期。"

# ============================================================
# failure_points — 旧地图解释不通的具体事实 (S-1 强制 ≥2)
# 每个都带具体数字 + DM 锚点 + 为何旧地图失灵的因果链
# ============================================================

failure_points:

  - fact: "FY25 数据中心营收占总营收 2.4% ($26M/$1,104M), 而油气+石化占 51% ($562M)。即便 Q1 FY26 backlog 中 DC 占比 15% ($240M/$1.60B) 全部在 12 个月内确认, FY26 全年 DC 收入最乐观也只 20-22% — 离'纯 AI beta'定义差 2.5-3x。"
    why_old_map_fails: |
      AI beta 定义要求 AI 相关收入是**主导驱动** (通常 >50%)。POWL 即使最乐观 backlog 全
      确认, DC 收入也只 20% 水平。把 20% optionality 当 100% beta 定价, 意味着市场在给
      "未来 5 年 DC 占比从 20% → 50%+"付溢价。这个假设没有硬证据支持 — 管理层没有披露 DC
      标准化产品路线图, 工程交付周期 12-24 个月限制了弹性扩张。
    dm_anchor: "DM-REV-001 (FY25 mix), DM-BL-001 (Q1 FY26 backlog 分段), DM-IND-001 (LNG TAM vs DC TAM)"

  - fact: "2025-08 宣布的 Jacintoport $12.4M 扩产 (+62% yard area, 2026Q4 完工, 双岸码头扩至 1,150 ft), 管理层明确披露用途为'LNG 项目开发与执行 3-5 年强周期', 不是为数据中心标准化产品线。唯一的产能扩张投入方向是 LNG 而非 AI DC。"
    why_old_map_fails: |
      CapEx 是管理层'真金白银'的意见. 如果 POWL 真判断自己是 AI beta, 理应把 80%+ 新增产
      能配给 DC 标准化产品 (像 VRT 扩 Power Management Systems, 像 ETN 扩三相 UPS)。但
      POWL 把 100% 新增产能都给了 LNG 模块化制造 (Houston Gulf Coast 位置对 LNG 终端的
      地理优势, 对 DC 完全无关)。管理层自己的行动说明: POWL 真实的核心基本盘是 LNG, DC
      只是 2-3 年期权. 市场'AI beta'叙事与管理层 CapEx 信号矛盾。
    dm_anchor: "DM-CAPEX-001, DM-CAPEX-002, DM-MGMT-002"

  - fact: "POWL 当前 PE 47x 是 5 年历史中位数 PE 18x 的 2.6x. FY24 → FY25 净利润从 $150M → $181M (+21%), 但股价从 $87 → $241 (+177%, post-split). 估值 re-rating 速度 >> 盈利扩张速度, 剪刀差 ~2.2x."
    why_old_map_fails: |
      如果 POWL 真是 AI 主题的长期结构性受益者, PE 扩张应该**伴随**盈利扩张 (像 VRT 2023-2024)
      而不是**领先**. POWL 的 PE 扩张显著超前于盈利扩张, 说明 re-rating 主要来自"AI 主题
      动量"而非"基本面兑现". 一旦 AI 主题降温 (见 DeepSeek R1 对 Hyperscaler CapEx 质疑
      的 2026Q1 事件), POWL 这种 "multiple expansion 主导 + earnings 配合" 的结构最容易
      发生 PE 压缩 (类似 PLTR 2024-2025 PE 从 200x → 75x 的过程).
    dm_anchor: "DM-CMP-001 (当前 PE 47x), DM-CMP-002 (5Y PE median), DM-FIN-001 (FY24/FY25 NI)"

  - fact: "GM 从 FY22 16% → FY25 29.4% 的 +13.4pp 扩张中, 结构性贡献 (规模效应 5.5pp + utility mix 0.5pp) 仅 6pp; 周期性贡献 (LNG POC 大项目 3.5pp + 供给紧张定价权 3.5pp + FY25 Q4 项目 close-outs 1pp) 合计 8pp. 管理层 FY26 guide'upper 20s'(~28%) 自己承认至少 1.4pp 不可持续。"
    why_old_map_fails: |
      AI beta 定义的估值前提是 **margin 持续扩张或 at least 稳定** (VRT/ANET 案例都是 GM
      持续提升 2-3pp/年). POWL 的 GM 实际是"周期高位"而非"结构性新常态". 如果市场把 29.4%
      当稳态给 47x PE, 一旦 GM 回到 25-27% (失去 3.5pp 定价权 + 1pp close-outs), EPS 将
      下降 ~15%, 47x PE 自动变成 55x, 估值压力触发。FY26 Q1 GM 已经从 FY25 Q4 31.4% 回
      落到 28.4% (-300bps QoQ), 下行已经开始。
    dm_anchor: "DM-GM-001 (5Y GM series), DM-GM-002 (Q1 FY26 GM 28.4%), DM-MGMT-003 (FY26 guide upper 20s)"

  - fact: "POWL 的 DC 订单高度集中在 1-2 个 hyperscaler megaproject. Q1 FY26 的 $100M+ DC 订单中, $75M 来自单一客户 (管理层披露为'first megaproject'). 客户集中度风险远高于'AI beta'估值所暗含的多元化 hyperscaler 采购池。"
    why_old_map_fails: |
      AI beta 估值逻辑假设"全体 hyperscaler 都在规模化采购", 买 POWL 就是买这个赛道。但
      POWL 的 DC 收入实际是"1-2 个客户的特定项目"构成, 一旦该 hyperscaler CapEx 削减或
      转向标准化采购 (向 ETN/Schneider 倾斜), POWL DC 收入可能归零。小盘定制工程商 (POWL)
      的客户结构与大盘标准化产品商 (VRT/ETN) 完全不同, 不应用相同估值框架。
    dm_anchor: "DM-BL-003 (Q1 FY26 megaproject 细分), DM-MGMT-004 (first megaproject 措辞)"

# ============================================================
# why_new_map_needed — 如果继续用旧地图, 哪些关键问题会被抹平
# ============================================================

why_new_map_needed: |
  如果继续把 POWL 当"AI DC 纯 beta"定价, 以下三个问题会被抹平:
  (1) 51% 基本盘 (油气+石化) 的**周期位置** — 当前 LNG 是 peak 年份, 石化已 -19%, 基本盘
      将在 2027-2028 下行, 这不会被 AI 叙事掩盖;
  (2) GM 周期性 8pp 的**可回吐性** — 47x PE 隐含稳态 GM, 但 GM 2027+ 回落 3-4pp 会让 EPS
      打 8-9 折;
  (3) DC megaproject 的**客户集中度** — 1-2 hyperscaler 组成 15% backlog, 单客户取消会
      让 DC 叙事崩塌 30%+.
  三者叠加, Base 情景下 FY25-30 CAGR 仅 ~5% (vs 当前 Reverse DCF 隐含 19.9%),
  合理估值 $130-180 范围 vs 当前 $241 → **高估 30-45%**.
```

---

## 评价 (self-audit, 不参与评分)

### failure_points 质量门控 (S-1 要求每个失灵事实满足 ≥4/5 条件)

| 条件 | fact 1 (DC 2.4%) | fact 2 (CapEx 信号) | fact 3 (PE 2.6σ) | fact 4 (GM 周期性) | fact 5 (客户集中) |
|------|------------------|---------------------|-----------------|--------------------|------------------|
| ①可感知 (读者已有知识即可看懂) | ✓ 营收占比是常识 | ✓ CapEx 方向是硬数据 | ✓ PE 是常识 | ✓ margin 分解看得懂 | ✓ 客户集中度是常识 |
| ②基于已激活旧图式 | ✓ 直接撞"AI beta"的纯度要求 | ✓ 撞"管理层信号"的可信度 | ✓ 撞"PE 扩张应伴随盈利" | ✓ 撞"稳态 margin"假设 | ✓ 撞"赛道多元化"假设 |
| ③适度偏离 | ✓ 不太大也不太小 | ✓ 直接打 CapEx | ✓ 2.6σ 显著但不极端 | ✓ 8pp 周期性可验证 | ✓ 1-2 客户可数 |
| ④可进入 (读者能模拟矛盾) | ✓ "AI beta 应 >50%"是可模拟锚点 | ✓ "真AI beta应扩 DC产能"可模拟 | ✓ "PE/EPS 对比"可模拟 | ✓ "稳态 vs 周期"可模拟 | ✓ "1客户风险"可模拟 |
| ⑤可补足 (后面有新框架接住) | ✓ 新地图 SOTP 混合体接住 | ✓ 新地图 LNG 基本盘接住 | ✓ 新地图 multiple 压缩接住 | ✓ 新地图 peak-cycle 接住 | ✓ 新地图 option pricing 接住 |

**5/5 全部满足**, 失灵事实质量充分。

### 潜在薄弱点 (skeptic 盲读时可能追问)

1. **fact 1**: 2.4% 是 FY25 数字, market 可能 argue "看 12-24 个月"→ 需要在正文说清楚"即使最乐观 backlog 全确认仍只 20%"的推演
2. **fact 3**: PE 扩张 vs earnings 扩张对比对长期 AI beta 可能不公平 (早期阶段确实应 multiple 先行); 需要在正文展示"vs VRT 2023-2024 同期 PE/EPS 对比"
3. **fact 5**: 集中度风险对大部分 B2B 工业股都成立, 需要在正文量化 POWL vs VRT/ETN 的客户 HHI 对比

---

## 与现有框架的一致性

- **P0 范畴预测试 (CLAUDE.md)**: 本审计对应"范畴 2: LNG+公用事业承包主力 + 15% backlog DC optionality 混合体"作为 Lens 1 候选, 证伪了"范畴 1: AI DC 纯 beta"(市场当前地图)
- **P2.5 旧地图状态**: 市场"正在翻转, 但翻转过度" — 本审计证据支持"翻转过度"判断 (估值按已完成翻转 pricing, 基本面在翻转中途)
- **铁律 S-1 对齐**: 本文件产出 default_map_audit, Phase 5 Ch 1 必须显式呈现 4 元素 (市场定义/变量/估值语言/叙事 + failure_points)
- **Phase 0.75 另一产物**: `POWL_thesis_crystallization.md` 使用本审计的 failure_points 作为 thesis 的因果锚

---

**下一步**: Phase 0.75 最终结晶 → `POWL_thesis_crystallization.md` (核心矛盾 + 母命题 + 胜出变量 + Kill Switch 最终版)
