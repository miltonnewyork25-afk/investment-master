# 报告数据飞轮协议 v1.0

> **目的**: 每份深度报告不只产出内容，还产出结构化数据回灌三个排行系统
> **适用**: 所有Tier 2/3报告，从ADBE开始执行
> **日期**: 2026-03-17

---

## 核心原则

```
报告 → 3个结构化产出 → 回灌3个系统 → 下次报告更准
```

**没有Appendix A/B/C的报告 = 不完整的报告。**

---

## Appendix A: 筛选因子更新表

> 回灌目标: `data/screener/raw/{TICKER}.json` + 筛选器Stage 2排名

Phase 5完成后，输出以下YAML(存入 `reports/{TICKER}/data/screening_update.yaml`):

```yaml
# 筛选因子更新 — {TICKER}
# 日期: {DATE}
# 报告: {TICKER}_Complete_v{X}.md

screening_update:
  # L1 估值 (报告验证后的值)
  pe_fair_range: [low, mid, high]       # 合理PE范围
  pe_current_assessment: "便宜/合理/贵"  # 基于报告估值分析

  # L4 品质 (报告验证/修正)
  gm_latest: XX%                        # 确认或修正
  gm_trend: "+X.X%/yr"                  # 10Y验证
  gm_sustainability: "high/medium/low"   # 天花板分析
  real_fcf_margin: XX%                  # 确认(扣SBC)
  sbc_revenue_pct: X.X%                 # 趋势判断
  sbc_trend: "improving/stable/worsening"
  roic_validated: XX%                   # 报告计算的ROIC
  revenue_cagr_10y: X.X%               # 10Y验证
  revenue_cagr_3y: X.X%
  revenue_quality: "revenue_driven/margin_driven/buyback_driven"

  # L5 拐点 (报告发现)
  inflection_signal: "none/emerging/confirmed"
  inflection_description: "AI Firefly/GenStudio driving upsell"

  # L6 宏观
  asset_dna_validated: "anti_fragile/defensive_compounder/..."
  regime_sensitivity: {goldilocks: +1, tightening: -1, panic: 0, ...}

  # 数据置信度升级
  confidence_upgrade: "M→H"  # 报告完成后自动升级
```

**执行时机**: Phase 5 Complete组装后，作为质量门控的一部分

---

## Appendix B: CQI 42子因子评分卡

> 回灌目标: `knowledge/stock_picking/cqi_public_ranking_v4.0.md` + CQI排行榜

Phase 3(护城河+竞争)完成后，输出以下评分(存入 `reports/{TICKER}/data/cqi_scorecard.yaml`):

```yaml
# CQI评分卡 — {TICKER}
# 评分框架: CQI v4.0 (B1-B8 + C1-C6 + D1)
# 数据窗口: {YEARS}

cqi_scorecard:
  # B. 商业模型 (/40)
  B1_revenue_engine:
    score: X.X/5
    sub: {B1a: X/2, B1b: X/1.5, B1c: X/1.5}
    evidence: "..."
  B2_customer_lock:
    score: X.X/5
    sub: {B2a: X/2, B2b: X/1.5, B2c: X/1.5}
    evidence: "..."
  B3_recurring_revenue:
    score: X.X/5
    evidence: "NRR=XX%, subscription XX%"
  B4_pricing_power:
    score: X.X/5
    evidence: "2024涨价X%后流失率X%"
  B5_margin_elasticity:
    score: X.X/5
    evidence: "OPM XX%→XX% (+XXbps)"
  B6_capital_discipline:
    score: X.X/5
    evidence: "SBC X%, buyback $XB, shares -X%"
  B7_tam_runway:
    score: X.X/5
    evidence: "TAM $XB, penetration X%"
  B8_management:
    score: X.X/5
    evidence: "..."

  B_total: XX/40

  # C. 护城河 (/30)
  C1_institutional_embedding:
    score: X.X/5
    evidence: "PDF标准ISO 32000..."
  C2_network_effect:
    score: X.X/5
  C3_ecosystem_lock:
    score: X.X/5
    evidence: "CC+DC+EC三层..."
  C4_data_flywheel:
    score: X.X/5
    evidence: "Adobe Stock+Firefly..."
  C5_scale_economy:
    score: X.X/5
  C6_physical_barrier:
    score: X.X/5

  C_total: XX/30

  # D1. 周期性修正
  D1: X.XX
  D1_evidence: "2020收入+X%, 2022收入+X%"

  # 最终
  weighted_score: XX.X  # (B+C) × D1
  cqi_percentile: XX    # 百分制
  ranking_position: "#XX"

  # 趋势判断
  moat_trend: "↑/↗/→/↘/↓/⇊"
  moat_trend_rationale: "AI加深生态锁定 / 竞争侵蚀定价权"

  # 一句话标签 (用于CQI公开排名)
  one_liner: "创意软件垄断，AI是加速器还是颠覆者？"
```

**执行时机**: Phase 3完成后输出初版，Phase 5修正最终版

---

## Appendix C: 策略卡数据种子

> 回灌目标: `reports/{TICKER}/{TICKER}_Strategy_Card_INTERNAL.md`

Phase 5估值完成后，输出以下数据(存入 `reports/{TICKER}/data/strategy_seed.yaml`):

```yaml
# 策略卡数据种子 — {TICKER}

strategy_seed:
  # §0 资产DNA
  primary_archetype: "defensive_compounder"
  secondary_archetype: "growth_rate_sensitive (30%)"
  sweet_regime: "goldilocks"
  nemesis_regime: "tightening"

  # §1 OEY估值
  fcf_ttm: $XB
  enterprise_value: $XB
  oey: X.X%
  sustainable_growth: X%
  oey_plus_g: X.X%

  # §2 入场纪律
  oey_spread_cheap: "$XXX (>75th percentile)"
  oey_spread_fair: "$XXX-$XXX (25-75th)"
  oey_spread_expensive: ">$XXX (<25th)"
  sell_put_strike: "$XXX"
  permanent_loss_price: "$XXX"

  # §5 Kill Switch
  kill_switches:
    - id: KS-1
      trigger: "Canva企业版NRR>120%+Adobe CC NRR<95%"
      probability: 15%
      impact: "-25%"
    - id: KS-2
      trigger: "AI开源工具(Stable Diffusion等)渗透率>30%专业用户"
      probability: 20%
      impact: "-20%"

  # §10 政体敏感度
  regime_sensitivity:
    goldilocks: {business: "+1", stock: "+1", net: "+2"}
    tightening: {business: "0", stock: "-1", net: "-1"}
    panic: {business: "0", stock: "-1", net: "-1"}
    recession: {business: "-1", stock: "0", net: "-1"}
    recovery: {business: "+1", stock: "+1", net: "+2"}
    zirp: {business: "0", stock: "+1", net: "+1"}
```

**执行时机**: Phase 5完成后，策略卡可直接从seed生成

---

## 执行检查清单

每份报告Complete前，确认以下产出:

- [ ] **Appendix A**: `reports/{T}/data/screening_update.yaml` — 筛选因子更新
- [ ] **Appendix B**: `reports/{T}/data/cqi_scorecard.yaml` — CQI 42子因子
- [ ] **Appendix C**: `reports/{T}/data/strategy_seed.yaml` — 策略卡数据
- [ ] 运行: `python3 scripts/screener/run_screen.py data/screener/raw/ --stage2` 确认排名变化
- [ ] 如果CQI评分完成: 更新 `knowledge/stock_picking/cqi_public_ranking_v4.0.md`

---

## 版本记录

| 版本 | 日期 | 变化 |
|------|------|------|
| v1.0 | 2026-03-17 | 首版: 3个Appendix + 执行检查清单 |
