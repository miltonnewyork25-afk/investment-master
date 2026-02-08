# COST 数据锚点注册表
> 创建: 2026-02-07 | 版本: v1.0 (Phase 0)

**规则**: 被2个以上Agent引用的数据点必须注册为数据锚点。冲突时以此表为准。

---

## 财务数据锚点

| ID | 数据点 | 值 | 来源 | 验证状态 | 注册Agent |
|----|--------|-----|------|---------|-----------|
| DA-001 | FY2025净销售额 | $269.9B | Costco IR, 2025-09 | ✅ CONFIRMED | Financial Pack |
| DA-002 | Q1 FY2026总收入 | $67.31B | Costco IR, 2025-12-11 | ✅ CONFIRMED | Financial Pack |
| DA-003 | Q1 FY2026净利润 | $2.001B | Costco IR, 2025-12-11 | ✅ CONFIRMED | Financial Pack |
| DA-004 | Q1 FY2026 EPS | $4.50 | Costco IR, 2025-12-11 | ✅ CONFIRMED | Financial Pack |
| DA-005 | FY2025 FCF | $7.837B | MacroTrends, 2025 | ✅ CONFIRMED | Financial Pack |
| DA-006 | FY2025会员费收入 | $5.3B | Costco IR, 2025-09 | ✅ CONFIRMED | Financial Pack |
| DA-007 | Q1 FY2026会员费 | $1.33B | Costco IR, 2025-12-11 | ✅ CONFIRMED | Financial Pack |

## 运营数据锚点

| ID | 数据点 | 值 | 来源 | 验证状态 | 注册Agent |
|----|--------|-----|------|---------|-----------|
| DA-010 | 续费率(美加) | 92.3% | Costco IR | ✅ CONFIRMED | Financial Pack |
| DA-011 | 续费率(全球) | 89.8% | Costco IR | ✅ CONFIRMED | Financial Pack |
| DA-012 | 付费会员总数 | ~81.4M | TheStreet/Costco | ✅ CONFIRMED | Financial Pack |
| DA-013 | Executive会员数 | 39.7M | Motley Fool | ✅ CONFIRMED | Financial Pack |
| DA-014 | 全球仓库数 | 921 | Costco IR, 2025-12-11 | ✅ CONFIRMED | Financial Pack |
| DA-015 | FY2026开店计划 | ~26家 | Earnings Call | ✅ CONFIRMED | Financial Pack |
| DA-016 | 员工流失率 | ~8% | Industry data | ⚠️ NEEDS_VERIFY | Competitive |

## 估值数据锚点

| ID | 数据点 | 值 | 来源 | 验证状态 | 注册Agent |
|----|--------|-----|------|---------|-----------|
| DA-020 | 当前股价 | $1,001.16 | MCP实时, 2026-02-07 | ✅ CONFIRMED | MCP Tool |
| DA-021 | Trailing PE | 53.42 | StockAnalysis, 2026-02 | ✅ CONFIRMED | Financial Pack |
| DA-022 | Forward PE | 48.33~48.39 | GuruFocus/StockAnalysis | ✅ CONFIRMED | Financial Pack |
| DA-023 | EV/EBITDA (TTM) | 32.77 | 多来源 | ✅ CONFIRMED | Financial Pack |
| DA-024 | 分析师目标价中位 | $1,044 | TipRanks, 2026-02 | ⚠️ NEEDS_VERIFY | Financial Pack |
| DA-025 | 分析师共识评级 | Buy | StockAnalysis/TipRanks | ⚠️ NEEDS_VERIFY | Financial Pack |

## 竞争数据锚点

| ID | 数据点 | 值 | 来源 | 验证状态 | 注册Agent |
|----|--------|-----|------|---------|-----------|
| DA-030 | Kirkland年收入 | ~$56B | Yahoo Finance/财报 | ✅ CONFIRMED | Kirkland Analysis |
| DA-031 | Kirkland占比 | ~33% | 公开财报 | ✅ CONFIRMED | Multiple |
| DA-032 | SKU数量 | ~3,700-4,000 | 多来源 | ✅ CONFIRMED | Multiple |
| DA-033 | 毛利率FY2025 | 12.84% | MacroTrends | ✅ CONFIRMED | Financial Pack |
| DA-034 | 营业利润率FY2025 | 3.77% | MacroTrends | ✅ CONFIRMED | Financial Pack |

---

## 冲突日志

| 时间 | 冲突ID | 数据点 | 值A | 值B | 来源A | 来源B | 解决状态 |
|------|--------|--------|-----|-----|-------|-------|---------|
| (等待XV验证Agent返回) | | | | | | | |

---

*下次更新: XV验证Agent完成后*
