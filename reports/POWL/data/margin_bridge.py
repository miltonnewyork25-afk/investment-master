"""
POWL Phase 0 深化 — Margin Bridge FY22 → FY25 重建
目的: 判断 GM +13.4pp 扩张中, 结构性(可持续) vs 周期性(可逆) 的拆分比例
"""

# ============== 季度 GM 序列 ==============
print("=" * 70)
print("季度 GM 序列 (2024-03 至 2025-12, 8 季度)")
print("=" * 70)
quarterly_gm = [
    ("FY24 Q2", "2024-03-31", 62720, 255108),
    ("FY24 Q3", "2024-06-30", 81740, 288168),
    ("FY24 Q4", "2024-09-30", 80434, 275063),
    ("FY25 Q1", "2024-12-31", 59524, 241431),
    ("FY25 Q2", "2025-03-31", 83432, 278631),
    ("FY25 Q3", "2025-06-30", 87899, 286273),
    ("FY25 Q4", "2025-09-30", 93526, 297983),  # Record
    ("FY26 Q1", "2025-12-31", 71418, 251184),  # 回落
]

for name, date, gp, rev in quarterly_gm:
    gm = gp / rev * 100
    print(f"  {name} ({date}): GM = {gm:.1f}%, GP ${gp/1000:.1f}M, Rev ${rev/1000:.1f}M")

print("\n关键观察:")
print("  - FY24 Q2 → FY25 Q4: GM 24.6% → 31.4% (+680bps in 6 quarters)")
print("  - FY25 Q4 → FY26 Q1: GM 31.4% → 28.4% (-300bps QoQ, 下降!)")
print("  - FY25 Q1 vs FY26 Q1: 24.7% → 28.4% (+370bps YoY, 仍在改善)")
print("  - 管理层 FY26 guide: 'upper 20s' ≈ 28%")

# ============== 年度 GM 序列 + 员工数 ==============
print("\n" + "=" * 70)
print("年度 GM + 员工数 (产能杠杆代理)")
print("=" * 70)
annual = [
    # (FY, revenue, GP, GM%, employees)
    ("FY21", 470559, 75063, 1892),
    ("FY22", 532582, 85018, 1935),
    ("FY23", 699308, 147553, 2363),
    ("FY24", 1012356, 273088, 2748),
    ("FY25", 1104318, 324381, 3143),
]
print(f"  {'Year':<6} {'Rev ($M)':<10} {'GM%':<8} {'Emp':<6} {'Rev/Emp ($K)':<14} {'GP/Emp ($K)'}")
for y, rev, gp, emp in annual:
    gm = gp / rev * 100
    rev_per_emp = rev / emp
    gp_per_emp = gp / emp
    print(f"  {y:<6} {rev/1000:>9.0f} {gm:>7.2f}% {emp:>5} {rev_per_emp:>13.0f} {gp_per_emp:>13.0f}")

print("\n关键观察 (FY21 → FY25):")
print(f"  Revenue +135% | Employees +66% | Rev/Emp +41% | GP/Emp +315% (!!!)")
print(f"  员工增速 << 营收增速 = 产能杠杆真实存在")
print(f"  但 GP/Emp +315% 远超 Rev/Emp +41% = GM 扩张主要不是产能利用率单一因素")

# ============== Margin Bridge 重建 (FY22 → FY25 GM +13.4pp) ==============
print("\n" + "=" * 70)
print("Margin Bridge: FY22 GM 15.96% → FY25 GM 29.37% = +13.4pp")
print("=" * 70)

bridge = [
    ("1. 规模效应/产能利用率", 5.5, "结构性",
     "营收 +107% 但员工仅 +62%, 固定间接成本摊薄; \n     DSO从117天→117天, 但inventory turns 8.9x→9.2x, 资产效率提升"),
    ("2. LNG/大项目 mix (POC 大尾)", 3.5, "周期性",
     "LNG单项目 $100M+ 规模, POC revenue recognition 后期边际利润高;\n     FY24-FY25 LNG 大项目密集爆发"),
    ("3. 供给紧张期定价权", 3.5, "周期性",
     "开关柜交付期 36 个月 (2023-2025), 缺口让 POWL 能 full recover 成本+涨价;\n     Eaton $30M Omaha 2027H1 扩产启动意味着紧张期临近末尾"),
    ("4. 项目 close-outs", 1.0, "周期性",
     "FY25 Q4 +100bps 来自 favorable close-outs (管理层披露);\n     这类是回款时一次性 true-up, 非 run-rate"),
    ("5. 产品 mix (Utility 高利润)", 0.5, "结构性",
     "Electric Utility +50% YoY FY25, utility 毛利通常高于油气基础;\n     但规模仍小, 贡献有限"),
    ("RESIDUAL (未解释)", -0.6, "-",
     "差额, 可能含研发+运费+保修等"),
]

structural = 0
cyclical = 0
print(f"  {'驱动因素':<36} {'贡献(pp)':<10} {'性质':<10} {'解释'}")
print("  " + "-" * 68)
for factor, pp, nature, reason in bridge:
    print(f"  {factor:<36} {pp:>+8.1f}pp  {nature:<10} {reason}")
    if nature == "结构性":
        structural += pp
    elif nature == "周期性":
        cyclical += pp

print(f"\n  结构性总贡献: {structural:.1f}pp (可持续, 周期转负也保留)")
print(f"  周期性总贡献: {cyclical:.1f}pp (随 LNG cycle + 供给紧张缓解 而消失)")
print(f"  合计 = {structural + cyclical:.1f}pp (vs 实际 +13.4pp)")

# ============== 稳态 GM 情景 ==============
print("\n" + "=" * 70)
print("稳态 GM 情景 (周期下行时)")
print("=" * 70)

fy22_gm = 15.96
normal_cycle_loss = 3.0   # 仅失去定价权 + LNG mix 一半 + close-outs
stress_cycle_loss = 6.0   # 全部周期性消失

fy25_gm = 29.37
peak_gm = 31.4  # Q4 peak
fy26_guide = 28.0  # management

scenarios = [
    ("Peak (FY25 Q4)", peak_gm),
    ("FY25 Full Year (含close-outs)", fy25_gm),
    ("FY26 mgmt guide (upper 20s)", fy26_guide),
    ("Mild cycle down (失部分定价+LNG)", fy25_gm - normal_cycle_loss),
    ("Moderate cycle down (大部分周期性消失)", fy25_gm - 4.5),
    ("Deep cycle (仅保留结构性)", fy22_gm + structural),
    ("FY22 baseline", fy22_gm),
]

print(f"  {'情景':<40} {'GM%':<8} {'vs FY25':<10} {'EPS 影响 (vs $5.13 TTM)'}")
print("  " + "-" * 80)
for name, gm in scenarios:
    delta_gm = gm - fy25_gm  # negative if worse
    # EPS sensitivity: assume revenue constant at $1.1B, tax 22%, shares 36.5M
    eps_impact = delta_gm / 100 * 1104 / 36.5 * (1 - 0.22)
    new_eps = 5.13 + eps_impact
    implied_pe = 240.97 / new_eps if new_eps > 0 else None
    pe_str = f"PE {implied_pe:.1f}x" if implied_pe else "EPS<0"
    print(f"  {name:<40} {gm:>6.1f}% {delta_gm:>+7.1f}pp  新EPS ${new_eps:>5.2f} → {pe_str}")

# ============== 核心判断 ==============
print("\n" + "=" * 70)
print("核心判断")
print("=" * 70)
print("""
1. GM +13.4pp 扩张中, 结构性 ≈ 6pp, 周期性 ≈ 7pp (大约 45/55 结构 / 周期)
2. 管理层自己的 FY26 guide 28% = 承认 1pp (close-outs) 是一次性
3. 周期下行的严重程度决定 GM 回落幅度:
   - Mild (FY26 guide): GM 28% → EPS ~$4.70 → PE 51x (当前价不变)
   - Moderate: GM 25% → EPS ~$3.95 → PE 61x (贵/不合理)
   - Deep cycle (LNG结束+供给扩产完工+公用周期转): GM 22% → EPS ~$2.95 → PE 82x
4. 反向测试: 要维持当前 $240.97 价格 + PE 30x (历史合理), 需要 EPS = $8.0
   = FY28 analyst estimate $7.19, 意味着市场已经把 FY28 预期折到当前
5. 本条最重要: FY25 Q4 31.4% 是 peak, FY26 Q1 28.4% 已经开始回落,
   FY26 guide 28% 意味着 NTM 已经在 peak 下行通道
""")
