#!/usr/bin/env python3
"""
UNH Phase 1 数据审计 — 交叉验证所有章节中引用的关键数字
铁律: 单源不可信 + 口径必须标注 + 无源数字禁写
"""

print("=" * 70)
print("UNH Phase 1 数据审计 — 交叉验证 + 逻辑一致性")
print("=" * 70)

# ============================================================
# 1. FMP源数据 (视为Ground Truth)
# ============================================================
print("\n### 1. FMP源数据锚定 ###\n")

# FMP Income Statement FY2025
fmp_revenue_2025 = 447_567  # $M
fmp_cogs_2025 = 364_650
fmp_gross_profit_2025 = 82_917
fmp_opex_2025 = 63_953
fmp_op_income_2025 = 18_964  # FMP "operatingIncome"
fmp_ebit_2025 = 18_699  # FMP "ebit" (注意与op_income不同!)
fmp_interest_2025 = 4_002
fmp_net_income_2025 = 12_056  # bottomLineNetIncome (归母)
fmp_net_income_cont_2025 = 12_807  # netIncomeFromContinuingOperations
fmp_eps_2025 = 13.23
fmp_shares_2025 = 910  # M

# FMP Balance Sheet FY2025
fmp_total_assets_2025 = 309_581
fmp_goodwill_2025 = 110_499
fmp_total_debt_2025 = 78_389
fmp_net_debt_2025 = 54_024
fmp_total_equity_2025 = 101_698  # including minority
fmp_stockholders_equity_2025 = 94_110  # excluding minority
fmp_minority_2025 = 7_588

# FMP Cashflow FY2025
fmp_ocf_2025 = 19_697
fmp_capex_2025 = 3_622
fmp_fcf_2025 = 16_075
fmp_buyback_2025 = 5_545
fmp_dividend_2025 = 7_916
fmp_acquisitions_2025 = 4_509

# FMP Ratios
fmp_gpm_2025 = 0.1853  # 18.53%
fmp_opm_2025 = 0.0424  # 4.24% (operatingProfitMargin)
fmp_npm_2025 = 0.0269  # 2.69%
fmp_roe_2025 = 0.1476  # 14.76% (TTM)
fmp_roic_2025 = 0.2098  # 20.98%
fmp_pe_2025 = 24.917  # priceToEarningsRatio (FMP计算)
fmp_fcf_yield = 0.1244  # 12.44%

# FMP Profile
fmp_price = 284.33
fmp_market_cap = 258_079  # $M (from profile)

# FMP Estimates
fmp_2027_eps_avg = 19.80
fmp_2027_rev_avg = 455_113  # $M

print("FMP数据加载完成")

# ============================================================
# 2. 报告中引用的数字 vs FMP对照
# ============================================================
print("\n### 2. 报告引用 vs FMP源对照 ###\n")

errors = []
warnings = []

def check(label, report_val, fmp_val, tolerance_pct=2.0, unit=""):
    """对比报告数字与FMP源数字"""
    if fmp_val == 0:
        print(f"  ⚠️  {label}: 报告={report_val}{unit}, FMP=0 (无法比较)")
        warnings.append(f"{label}: FMP=0")
        return
    diff_pct = abs(report_val - fmp_val) / abs(fmp_val) * 100
    status = "✅" if diff_pct <= tolerance_pct else ("⚠️" if diff_pct <= 5 else "❌")
    print(f"  {status} {label}: 报告={report_val}{unit}, FMP={fmp_val}{unit}, 差异={diff_pct:.1f}%")
    if diff_pct > tolerance_pct:
        if diff_pct > 5:
            errors.append(f"{label}: 报告={report_val}, FMP={fmp_val}, 差异={diff_pct:.1f}%")
        else:
            warnings.append(f"{label}: 差异{diff_pct:.1f}%")

# 收入
check("FY2025收入($B)", 447.6, fmp_revenue_2025/1000, unit="B")

# 毛利率
check("FY2025毛利率", 18.5, fmp_gpm_2025*100, tolerance_pct=1, unit="%")

# 营业利润
check("FY2025营业利润($B)", 19.0, fmp_op_income_2025/1000, tolerance_pct=1, unit="B")
# 注意: FMP有两个字段 - operatingIncome=18,964 vs ebit=18,699
print(f"  ℹ️  FMP operatingIncome={fmp_op_income_2025}M vs ebit={fmp_ebit_2025}M (差{fmp_op_income_2025-fmp_ebit_2025}M)")

# OPM
report_opm = 4.2
fmp_opm_calc = fmp_op_income_2025 / fmp_revenue_2025 * 100
check("FY2025 OPM", report_opm, fmp_opm_calc, tolerance_pct=2, unit="%")

# 净利润 - 关键口径问题!
print(f"\n  ℹ️  FMP净利润口径:")
print(f"      netIncomeFromContinuingOperations = ${fmp_net_income_cont_2025}M (含少数股东)")
print(f"      netIncome (bottomLine归母) = ${fmp_net_income_2025}M")
print(f"      差额 = ${fmp_net_income_cont_2025 - fmp_net_income_2025}M (=少数股东权益)")
check("FY2025净利润($B, 归母)", 12.1, fmp_net_income_2025/1000, tolerance_pct=1, unit="B")

# EPS
check("FY2025 EPS", 13.23, fmp_eps_2025, tolerance_pct=0.5, unit="")

# FCF
check("FY2025 FCF($B)", 16.1, fmp_fcf_2025/1000, tolerance_pct=1, unit="B")

# 商誉
check("FY2025商誉($B)", 110.5, fmp_goodwill_2025/1000, tolerance_pct=0.5, unit="B")

# 净债务
check("FY2025净债务($B)", 54.0, fmp_net_debt_2025/1000, tolerance_pct=1, unit="B")

# 总债务
check("FY2025总债务($B)", 78.4, fmp_total_debt_2025/1000, tolerance_pct=1, unit="B")

# 市值
report_mktcap = 258
check("市值($B)", report_mktcap, fmp_market_cap/1000, tolerance_pct=2, unit="B")

# P/E
print(f"\n  ℹ️  P/E口径问题:")
pe_from_price_eps = fmp_price / fmp_eps_2025
pe_from_fmp = fmp_pe_2025
pe_from_mktcap = fmp_market_cap / fmp_net_income_2025 * 1000
print(f"      Price/EPS = {fmp_price}/{fmp_eps_2025} = {pe_from_price_eps:.1f}x")
print(f"      FMP priceToEarningsRatio = {pe_from_fmp:.1f}x")
print(f"      MktCap/NI = {fmp_market_cap}/{fmp_net_income_2025} = {pe_from_mktcap:.1f}x")
print(f"      报告使用: 21.5x (来源: FMP compare_stocks)")
print(f"      ⚠️  Price/EPS=21.5x vs FMP P/E=24.9x — FMP P/E可能用不同EPS口径(TTM vs FY)")

# Forward P/E
fwd_pe = fmp_price / fmp_2027_eps_avg
print(f"\n  ℹ️  Forward P/E: ${fmp_price}/{fmp_2027_eps_avg} = {fwd_pe:.1f}x (报告用14.3x)")

# ============================================================
# 3. 分部数据交叉验证
# ============================================================
print("\n\n### 3. 分部数据交叉验证 ###\n")

# 分部收入合计 vs 合并收入
seg_uhc = 344.9
seg_oh = 102.0
seg_oi = 19.4
seg_rx = 154.7
seg_total = seg_uhc + seg_oh + seg_oi + seg_rx
seg_elim = seg_total - 447.6

print(f"分部收入合计: {seg_total:.1f}B")
print(f"消除后合并: 447.6B")
print(f"消除金额: {seg_elim:.1f}B")
print(f"消除占比: {seg_elim/seg_total*100:.1f}%")
check("分部消除($B)", 173.4, seg_elim, tolerance_pct=5, unit="B")
# 报告中说$168B消除 vs 计算得$173.4B
print(f"  ⚠️  报告中引用消除=$168B, 计算得=${seg_elim:.1f}B — 差$5.4B")
print(f"       可能原因: 报告$168B来自segment_data.md的估计, 精确值需10-K")
warnings.append("消除金额: 报告$168B vs 计算$173.4B, 差$5.4B")

# 分部营业利润合计
seg_uhc_oe = 9.4  # GAAP
seg_oh_oe = -0.278  # GAAP
seg_oi_oe = 2.6   # GAAP
seg_rx_oe = 7.2   # GAAP
seg_total_oe = seg_uhc_oe + seg_oh_oe + seg_oi_oe + seg_rx_oe
print(f"\n分部GAAP营业利润合计: {seg_total_oe:.1f}B")
print(f"FMP合并营业利润: {fmp_op_income_2025/1000:.1f}B")
print(f"差额(corp+消除): {fmp_op_income_2025/1000 - seg_total_oe:.1f}B")

# Adj数字
seg_uhc_adj = 10.5
seg_oh_adj = 2.3
seg_oi_adj = 3.7
seg_rx_adj = 6.1
seg_total_adj = seg_uhc_adj + seg_oh_adj + seg_oi_adj + seg_rx_adj
print(f"\n分部Adj营业利润合计: {seg_total_adj:.1f}B")
print(f"报告引用合并Adj: 21.7B")
check("Adj营业利润合计", seg_total_adj, 21.7, tolerance_pct=3, unit="B")
# 差额
print(f"  差额(corp): {21.7 - seg_total_adj:.1f}B")

# ============================================================
# 4. 估值逻辑一致性
# ============================================================
print("\n\n### 4. 估值逻辑一致性检查 ###\n")

# SOTP检验
print("SOTP一致性:")
sotp_indep = 231.4 + 313.4  # low+high sum
sotp_synergy = 66.0
sotp_discount_20 = 0.80
sotp_ev_low = (231.4 + 66.0) * 0.80
sotp_ev_high = (313.4 + 66.0) * 0.80
sotp_eq_low = sotp_ev_low - 54.0
sotp_eq_high = sotp_ev_high - 54.0
sotp_ps_low = sotp_eq_low / 0.910
sotp_ps_high = sotp_eq_high / 0.910
print(f"  EV range: ${sotp_ev_low:.1f}B - ${sotp_ev_high:.1f}B")
print(f"  Equity range: ${sotp_eq_low:.1f}B - ${sotp_eq_high:.1f}B")
print(f"  Per share: ${sotp_ps_low:.0f} - ${sotp_ps_high:.0f}")
print(f"  Python验证输出: $202 - $274")
check("SOTP low", sotp_ps_low, 202, tolerance_pct=1)
check("SOTP high", sotp_ps_high, 274, tolerance_pct=1)

# MCR敏感性验证
print(f"\nMCR敏感性验证:")
mcr_889 = 0.889
uhc_med_cost = seg_uhc * 1000 * mcr_889  # $M
uhc_gross = seg_uhc * 1000 - uhc_med_cost
uhc_admin = 22_000  # $M assumption
uhc_oe = uhc_gross - uhc_admin
total_oe = uhc_oe + 12_100 - 1_500  # Optum adj + corp
ebt = total_oe - 4_000  # interest
ni = ebt * (1 - 0.22)
eps_calc = ni / 910
print(f"  MCR=88.9%: UHC med cost=${uhc_med_cost/1000:.1f}B")
print(f"  UHC gross=${uhc_gross/1000:.1f}B")
print(f"  UHC OE=${uhc_oe/1000:.1f}B (假设admin=$22B)")
print(f"  Total OE=${total_oe/1000:.1f}B")
print(f"  EPS=${eps_calc:.2f}")
print(f"  Python验证输出: EPS=$19.61 @MCR=88.9%")

# 实际FMP EPS对比
print(f"\n  ⚠️  关键口径差异:")
print(f"  Python MCR模型EPS(@88.9%): ${eps_calc:.2f}")
print(f"  FMP实际EPS(FY2025): ${fmp_eps_2025}")
print(f"  差额: ${eps_calc - fmp_eps_2025:.2f}")
if abs(eps_calc - fmp_eps_2025) > 3:
    print(f"  ❌ MCR敏感性模型与实际EPS差异>$3 — 模型假设需校准!")
    print(f"     原因: admin=$22B假设可能不准; Optum adj $12.1B包含会计调整; 税率/利息可能不同")
    errors.append(f"MCR模型EPS ${eps_calc:.2f} vs 实际 ${fmp_eps_2025} 差${eps_calc-fmp_eps_2025:.2f}")
else:
    print(f"  ✅ 差异在可接受范围内")

# Reverse DCF验证
print(f"\nReverse DCF一致性:")
ev_actual = fmp_market_cap + fmp_net_debt_2025  # $M
print(f"  EV = MktCap + NetDebt = {fmp_market_cap} + {fmp_net_debt_2025} = {ev_actual}M = ${ev_actual/1000:.0f}B")
print(f"  报告使用: EV=$312B")
check("EV($B)", 312, ev_actual/1000, tolerance_pct=2)

# ============================================================
# 5. 逻辑一致性检查
# ============================================================
print("\n\n### 5. 跨章节逻辑一致性 ###\n")

# Ch1 Reverse DCF结论 vs Ch7 MCR概率加权
print("Ch1 RevDCF vs Ch7 MCR概率加权:")
print(f"  Ch1 概率加权公允价: $260-350")
print(f"  Ch7 MCR三假说加权: $280")
print(f"  Ch6 SOTP(20%折价): $202-274")
print(f"  Ch2 身份四层加权: $260-350")
mean_methods = (305 + 238 + 280 + 305) / 4
print(f"  四种方法的中位: ${mean_methods:.0f}")
print(f"  vs 当前$284: 差异{(mean_methods/284.33-1)*100:.1f}%")

# 叙事一致性
print(f"\n叙事方向一致性:")
print(f"  Ch1 RevDCF方向: 中性偏审慎(P/E 14x隐含永久折价)")
print(f"  Ch7 MCR概率加权方向: 中性($280≈$284)")
print(f"  Ch6 SOTP方向: 偏高估($202-274 < $284)")
print(f"  Ch12 CI-03三时代方向: 中性($280≈$284)")
bearish_count = 1  # SOTP
neutral_count = 3  # RevDCF, MCR, 三时代
bullish_count = 0
print(f"  方向统计: 偏高估{bearish_count}个, 中性{neutral_count}个, 偏低估{bullish_count}个")
print(f"  ✅ 方向一致: 偏向'中性关注(偏审慎)' — 与RevDCF暗示一致")

# 身份折价计算验证
print(f"\n身份折价-22pp验证:")
adj_eps = 21.7 / 0.910  # adj op / shares (粗略)
# 更好的方法: adj EPS 已知约$16.35 (2025 adj)
adj_eps_reported = 16.35
effective_pe = fmp_price / adj_eps_reported
print(f"  Adj EPS (报告): ${adj_eps_reported}")
print(f"  有效P/E (adj): {fmp_price}/{adj_eps_reported} = {effective_pe:.1f}x")
insurance_pe = 13.0
platform_pe = 26.0
w = (effective_pe - insurance_pe) / (platform_pe - insurance_pe)
optum_profit_share = 12.1 / (10.5 + 12.1)
identity_gap = optum_profit_share - w
print(f"  隐含平台权重: ({effective_pe:.1f} - {insurance_pe}) / ({platform_pe} - {insurance_pe}) = {w:.1%}")
print(f"  Optum实际利润占比: {optum_profit_share:.1%}")
print(f"  身份折价: {identity_gap:.1%} ({identity_gap*100:.1f}pp)")
print(f"  报告引用: -22pp")
check("身份折价(pp)", abs(identity_gap*100), 22, tolerance_pct=15)

# ============================================================
# 6. 关键口径风险标记
# ============================================================
print("\n\n### 6. 口径风险标记 ###\n")

issues = [
    ("P/E口径", "报告P/E 21.5x(compare_stocks) vs FMP P/E 24.9x(ratios) vs Price/EPS 21.5x",
     "差异来自: compare_stocks可能用forward earnings, ratios用TTM NI including continuing ops",
     "HIGH"),
    ("净利润口径", f"归母NI=${fmp_net_income_2025}M vs 持续经营NI=${fmp_net_income_cont_2025}M",
     f"差额${fmp_net_income_cont_2025-fmp_net_income_2025}M=少数股东权益。报告应明确使用归母口径",
     "MEDIUM"),
    ("消除金额", "报告$168B vs 计算$173.4B",
     "差$5.4B可能来自staging估计vs10-K精确值。不影响结论但需标注",
     "LOW"),
    ("MCR口径", "报告MCR 88.9%来自WebSearch(earnings release) vs FMP GPM 18.5%(=1-GPM≈81.5%?)",
     "FMP GPM包含Optum, 不等于UHC MCR。MCR应单独从earnings release/10-K获取",
     "CRITICAL"),
    ("ROIC口径", f"FMP ROIC={fmp_roic_2025:.1%} vs 报告引用8.2%",
     "巨大差异! FMP ROIC=20.98%来自NOPAT/invested capital计算, 报告8.2%可能来自不同定义",
     "CRITICAL"),
    ("Adj EPS", "报告引用$16.35 adj EPS来自earnings release, FMP GAAP EPS=$13.23",
     "adj排除了一次性charges($2.7B)。两个数字都有效但必须标明口径",
     "HIGH"),
]

for name, detail, explanation, severity in issues:
    icon = {"CRITICAL": "🔴", "HIGH": "🟡", "MEDIUM": "🟢", "LOW": "⚪"}[severity]
    print(f"{icon} [{severity}] {name}")
    print(f"   {detail}")
    print(f"   → {explanation}")
    print()

# ============================================================
# 7. 总结
# ============================================================
print("\n" + "=" * 70)
print("审计总结")
print("=" * 70)

print(f"\n❌ 错误(需立即修复): {len(errors)}")
for e in errors:
    print(f"   - {e}")

print(f"\n⚠️  警告(需标注/解释): {len(warnings)}")
for w in warnings:
    print(f"   - {w}")

print(f"\n🔴 关键口径风险(CRITICAL): 2项")
print(f"   1. MCR: FMP GPM(18.5%)包含Optum≠UHC-only MCR(88.9%)")
print(f"      → 修复: 报告中明确MCR来自earnings release, 非FMP GPM")
print(f"   2. ROIC: FMP ROIC(20.98%) vs 报告(8.2%)")
print(f"      → 修复: 需要确认报告ROIC 8.2%的计算方式")
print(f"      → FMP ROIC计算: NOPAT/Avg Invested Capital")
print(f"      → 可能原因: FMP invested capital定义不同 或 报告用了不同的分子/分母")

print(f"\n🟡 高风险口径: 2项")
print(f"   1. P/E: 多个口径(21.5x/24.9x/17.4x adj)需统一标注")
print(f"   2. Adj EPS vs GAAP EPS: 必须每次引用时标明")

print(f"\n建议优先修复:")
print(f"  1. ROIC口径 — 验证8.2%的计算 或 改用FMP 21.0%并解释")
print(f"  2. MCR口径 — 确认88.9%来源并标注非FMP")
print(f"  3. P/E统一 — 在报告中使用adj P/E(17.4x)作为主口径")
print(f"  4. MCR敏感性模型 — 校准admin假设使EPS接近实际")
