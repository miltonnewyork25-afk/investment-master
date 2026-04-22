"""
POWL Phase 0 深化 — LNG Cycle 时间线与 POWL 订单窗口
目的: 判断 POWL 油气+石化 (FY25 51% 营收) 中的 LNG 驱动强度
     + 2026-2030 订单可见性窗口
     + 下行拐点时间表
"""

# ============== 美国 LNG 终端建设管线 (FID 后在建 + 2025 新 FID) ==============
print("=" * 75)
print("美国 LNG 终端建设管线 (2025-2030, 按 in-service 年度排序)")
print("=" * 75)

# (项目, 业主/EPC, 产能 mtpa, FID年, in-service年, POWL 机会强度 1-5)
projects = [
    # ==== 在建中 (FID 2018-2024) ====
    ("Plaquemines Phase 1+2",     "Venture Global",          20.0, 2022, 2026.0, 4,
     "36 modular mini-trains, 2025Q3-2026Q4 commissioning; 模块化=前端电气集成度高"),
    ("Corpus Christi Stage 3",    "Cheniere / Bechtel",       10.0, 2022, 2026.0, 4,
     "Trains 5-7 在 2026 年启动, 0.6 Bcf/d; Bechtel EPC = 典型 POWL 客户链"),
    ("Golden Pass LNG T1-T2",     "ExxonMobil + QatarEnergy", 10.6, 2019, 2026.0, 5,
     "原 Zachry 破产 → 2024 重新发包, Chiyoda/McDermott 接手, 电气重新订购可能性高"),
    ("Golden Pass LNG T3",        "ExxonMobil + QatarEnergy",  5.3, 2019, 2027.5, 3,
     "延后项目, 2024 重组后合同链可能出现新设备采购"),
    ("Rio Grande LNG T1",         "NextDecade / Bechtel",      5.4, 2023, 2027.3, 4,
     "Train 1 2027 中期 in-service, Bechtel EPC"),
    ("Rio Grande LNG T2",         "NextDecade / Bechtel",      5.4, 2023, 2028.2, 4,
     "Train 2 2028 初-中期"),
    ("Rio Grande LNG T3",         "NextDecade / Bechtel",      5.4, 2023, 2028.8, 4,
     "Train 3 2028 末-2029 初"),
    # ==== 2025 新 FID ====
    ("CP2 LNG Phase 1",           "Venture Global",           14.0, 2025, 2027.8, 4,
     "2025 FID, 2027 完工, VG 再次模块化路线"),
    ("Corpus Christi Midscale 8-9","Cheniere / Bechtel",        3.0, 2025, 2028.5, 3,
     "2025 FID, 2028 完工"),
    ("Louisiana LNG Phase 1",     "Woodside Energy",          16.5, 2025, 2029.0, 3,
     "2025 FID, 2029 完工, 新 EPC 组合"),
]

total_mtpa = 0
print(f"\n  {'项目':<32} {'业主/EPC':<28} {'mtpa':<7} {'FID':<6} {'ISD':<7} {'强度':<6}")
print("  " + "-" * 95)
for name, owner, mtpa, fid, isd, strength, note in projects:
    stars = "★" * strength + "☆" * (5 - strength)
    print(f"  {name:<32} {owner:<28} {mtpa:>5.1f}  {fid}   {isd:<6.1f}  {stars}")
    total_mtpa += mtpa

print(f"\n  合计新增产能: {total_mtpa:.1f} mtpa")
print(f"  EIA 数据: 2030 年前美国 LNG 峰值名义产能 +75% 至 30 Bcf/d (从 ~17 Bcf/d)")

# ============== POWL 订单窗口 = ISD 前 18-30 个月 ==============
print("\n" + "=" * 75)
print("POWL 订单窗口预测 (基于'ISD 前 24 个月前后电气设备发包'的工业常识)")
print("=" * 75)
print("""
逻辑: LNG EPC 承包商在 ISD 前 18-30 个月集中采购电气设备 (开关柜/MCC/继电保护)
     POWL 的'订单 → 交付 → 确收' 周期 = 12-24 个月
     因此 POWL 订单 ISD-24m, 确收 ISD-6m 到 ISD+3m
""")

import statistics
orders_by_year = {}
for name, owner, mtpa, fid, isd, strength, note in projects:
    # POWL 订单窗口 = ISD - 2 (年)
    order_year = int(isd - 2)
    weighted = mtpa * strength / 5  # 强度加权
    orders_by_year.setdefault(order_year, []).append((name, mtpa, strength, weighted))

print(f"  {'订单年':<8} {'项目数':<8} {'mtpa 加权':<12} {'代表项目'}")
print("  " + "-" * 80)
for year in sorted(orders_by_year.keys()):
    items = orders_by_year[year]
    total_weighted = sum(w for _, _, _, w in items)
    n = len(items)
    examples = ", ".join(name.split()[0] + name.split()[1] if len(name.split()) > 1 else name.split()[0] for name, _, _, _ in items[:2])
    print(f"  {year:<8} {n:<8} {total_weighted:>9.1f}    {examples}")

# ============== 历史 vs 未来对照 ==============
print("\n" + "=" * 75)
print("历史 LNG 周期 vs 当前周期 对照")
print("=" * 75)
print("""
  周期 1 (2016-2020): Sabine Pass + Cove Point + Cameron + Freeport + Corpus Christi T1-T3
    → 美国 LNG 产能 0 → ~10 Bcf/d (+10 Bcf/d)
    → POWL 油气营收 (FY16-20): $260M → $310M (仅 +19%, 因为同期油价崩盘)

  周期 2 (2021-2025): Calcasieu Pass + Corpus Christi T1-T3 + Plaquemines P1
    → +~7 Bcf/d
    → POWL 油气营收 (FY21-25): $280M → $575M (+105%)

  当前周期 (2026-2030): Plaquemines P2 + Corpus Christi Stage 3 + Golden Pass + Rio Grande + CP2 + ...
    → +~13 Bcf/d (历史最大单轮扩张)
    → POWL 指引: 'strong and extended cycle across the back half of this decade'
    → Jacintoport 扩建 +62% yard area 预备 2026-2028 大项目

  关键: 当前周期'订单密度' >> 上一周期 (13 Bcf/d vs 7 Bcf/d), 但
         -  2026-2027 是订单密集年 (Plaquemines+Corpus T5-7+Golden Pass 同时)
         -  2028-2029 依赖 2025-2026 新 FID (CP2/Louisiana LNG)
         -  2029+ 订单 = 当前未 FID 项目 (Rio Grande T4+, Delfin, Commonwealth 等)
""")

# ============== 下行拐点信号 ==============
print("=" * 75)
print("LNG 周期下行拐点信号 (POWL 反转的 Kill Switch)")
print("=" * 75)
print("""
  信号 1: 新 FID 节奏放缓 (2026-2027 无新 FID)
    → 当前美国 LNG 市场集中度已高, 下一轮 FID 需要新买家 (欧洲能源政策/亚洲长约)
    → Trump admin 2025-2026 解除 Biden LNG 出口 pause → FID 节奏加速
    → 但 2027+ 新 FID 依赖全球 LNG 需求 (China GDP/印度/欧洲)

  信号 2: 订单 duration 缩短 (当前 backlog $1.6B 60% 2026 确收)
    → 意味着 2027+ 可见性较薄
    → 如果 2026 下半年 book-to-bill < 1 → 2028 营收有缺口

  信号 3: Jacintoport 扩建产能利用率
    → +62% yard 如果 2027 仅 60% 利用 → 2026 订单强度不及预期
    → 管理层透露'predominantly 2026 LNG' → 意味着 2026 是单点 peak, 2027-2028 可能回落

  信号 4: 竞争格局 (Eaton Omaha 扩产 + ABB/Siemens 北美增产)
    → Eaton $30M Omaha 扩产 2027H1 投产 → 2027-2028 供给增加
    → POWL 定价权 (3.5pp 周期性 GM 贡献) 面临压缩
""")

# ============== 量化: LNG 直接营收占 POWL 总营收的比重 ==============
print("=" * 75)
print("LNG 在 POWL 营收中的定位 (量化)")
print("=" * 75)

# FY25 revenue mix: 油气 37% + 石化 14% = 51%, 估计油气中 LNG 占 50-60%
fy25_revenue = 1104  # $M
oil_gas_pct = 0.37
lng_share_of_oilgas = 0.55  # 估计, 基于 Jacintoport 专 LNG 扩建的战略权重
lng_direct_revenue = fy25_revenue * oil_gas_pct * lng_share_of_oilgas
petrochem_revenue = fy25_revenue * 0.14

print(f"  FY25 总营收:         ${fy25_revenue}M")
print(f"  油气板块 (37%):       ${fy25_revenue * oil_gas_pct:.0f}M")
print(f"    其中 LNG 直接 (~55%): ${lng_direct_revenue:.0f}M ({lng_direct_revenue/fy25_revenue*100:.0f}%)")
print(f"    其中常规油气 (~45%): ${fy25_revenue * oil_gas_pct * (1-lng_share_of_oilgas):.0f}M")
print(f"  石化板块 (14%):       ${petrochem_revenue:.0f}M ({petrochem_revenue/fy25_revenue*100:.0f}%)")
print(f"  石化 FY25 YoY:        -19% (Q4 FY25 -25% YoY) ← 已经在下行")
print()
print(f"  核心观察:")
print(f"    - LNG 直接 ~22% 营收 + 石化 14% (部分 LNG 关联) ≈ 25-30% 纯 LNG 驱动")
print(f"    - 石化 -19% YoY 说明: 即使 LNG 强, 油气周期仍可分化")
print(f"    - 管理层'3-5 年 LNG 强周期' = 2026-2030 LNG 支撑, 石化已走弱")

# ============== 2026-2030 营收情景 ==============
print("\n" + "=" * 75)
print("2026-2030 LNG 驱动营收情景")
print("=" * 75)

scenarios = [
    # (情景名, 2026增速, 2027, 2028, 2029, 2030)
    ("Bull (全部 LNG 项目按时 + 新 FID)", 0.18, 0.12, 0.08, 0.05, 0.03),
    ("Base (管理层指引 upper end)",        0.12, 0.08, 0.05, 0.02, -0.02),
    ("Bear (2027 新 FID 缺口 + 供给扩)",   0.08, 0.02, -0.05, -0.08, -0.12),
]

base_revenue = 1104
print(f"  FY25 实际营收: ${base_revenue}M (基准)")
print()
print(f"  {'情景':<40} {'FY26':<10} {'FY27':<10} {'FY28':<10} {'FY29':<10} {'FY30':<10}")
print("  " + "-" * 90)
for name, *growths in scenarios:
    rev = base_revenue
    row = f"  {name:<40}"
    for g in growths:
        rev = rev * (1 + g)
        row += f" ${rev:>6.0f}M "
    print(row)

# ============== 核心判断 ==============
print("\n" + "=" * 75)
print("核心判断 — LNG 驱动的强度与时间限制")
print("=" * 75)
print("""
1. 当前 LNG 周期 (2026-2030) 是美国历史最大 LNG 扩张, 规模约 13 Bcf/d
   POWL 订单窗口 (ISD-24m) 已经被 Plaquemines + Corpus 3 + Golden Pass 填满 2026-2027

2. 但 POWL 被 AI DC 叙事抬到 47x PE, 实际 LNG+DC 混合体:
   - LNG 直接 ~22% 营收 + 石化 14% ≈ 25-30% 纯 LNG 驱动 (核心基本盘)
   - DC 仅 15% backlog ≈ 7-8% FY26 营收 (初生期权)
   - 市场把'短 DC 尾巴'估值到 47x PE, 但主干仍是 LNG/油气

3. 2027 分水岭:
   - Plaquemines 完工 / Corpus Stage 3 完工 / Golden Pass 完工集中在 2026
   - 2027 中后段靠 Rio Grande + CP2, 但 FID 到 ISD 3 年, 订单密度低于 2026
   - 石化已经 -19% YoY, 预示周期分化
   - 2027 book-to-bill 若 < 1 → 2028 营收缺口

4. 下行拐点时间表 (按信号触发顺序):
   - 2026H2: 2026 book-to-bill 观察期 (目前 Q1 FY26 订单 +63% YoY 仍强)
   - 2027H1: Eaton Omaha 扩产投产, 定价权压缩
   - 2027H2: 2025 FID 项目 (CP2/Louisiana) 订单进入 POWL → 延后下行
   - 2028+: 依赖 2026-2027 新 FID, 当前可见性不足
   - 2029-2030: 若无新 FID, LNG 驱动走弱, 石化仍弱 → 营收增长 ~0% 或下滑

5. 估值含义:
   - 当前 $241 对应 Reverse DCF 10Y FCF CAGR 19.9%
   - LNG 驱动下 2026-2028 可支持 10-12% 营收增速 (Base 情景)
   - 但 2029-2030 回落 = 10Y CAGR 更可能 10-13% → 当前估值 overshoot 50-70%
""")
