# Pilot · M3 Installed-Base Aging Radar
**Date**: 2026-04-19
**Method**: 扫美国老化资产, 应用"failure cost 非线性上升"测试, 找强制 replacement 纯玩家

---

## 扫描清单 (20 个资产类别, 筛 non-linear failure cost)

| # | 老化资产类别 | 平均龄 / 触发 | Non-linear failure test | Vendor / capacity owner | Gate 5a purity | 结论 |
|---|-------------|--------------|-------------------------|-------------------------|----------------|------|
| 1 | US 变压器 | 40 yr avg, 20%>50 yr | ✓ 介质击穿非线性 | HWM / HUBB / Hyundai HICO | HWM ✓ | 已在 v2 #7 |
| 2 | 商用航空机队 | FAA TBO 强制 | ✓ 认证到期 | TDG / HEI / GE | ✓ | 已在 v2 #2 |
| 3 | **美国货运机车** | **25 yr avg, 长寿命 >35 yr** | **✓ 可靠性 + EPA Tier 5 + FRA 20111 检查** | **WAB (Wabtec)** | **WAB 80% rail ✓** | **★ NEW** |
| 4 | 美国天然气管道 | 1950-70s 安装, PHMSA 规定 | ✓ 事故率非线性 | MTZ / PWR / specialty | fragmented | Research Only |
| 5 | 铁路轨道 + 桥梁 | FRA 检查强制 | ✓ 但 CSX/UP/NSC 自运营 | Cl 1 rail internalize | no vendor | 内部化 |
| 6 | 美国桥梁 | FHWA 7.5% "poor", 2024 Baltimore 加速 | ✓ | ACM / STN / NUE 钢 | ✗ fragmented | Research Only |
| 7 | 美国水坝 | ASCE D grade, AWIA 强制 inspection | ✓ | MTZ / PWR segments | ✗ fragmented | Research Only |
| 8 | **商用 HVAC (R-410A → A2L 冷媒切换)** | **平均 15 yr, EPA AIM Act HFC 削减 2036** | **✓ 强制冷媒切换 + 老化 failure** | **WSO (Watsco), LII, TT** | **WSO 95% pure ✓** | **★ NEW** |
| 9 | 核电站 (40→60→80 yr 许可延期) | PG&E Diablo 先例 | ✓ 但 utility 内化 | 已捕获 (Nuclear Fuel Cycle) | — | 已覆盖 |
| 10 | 海底数据电缆 | AI + 数据中心强制 replacement | ✓ | Prysmian IT / Nexans FR / NKT DK | ✗ non-US | Fail |
| 11 | 市政配电线杆 (木 → 钢/复合) | FERC 可靠性 + 野火 (CA) | ✓ | **VMI (Valmont)** / T&B (ABB sub) | ✗ VMI 40% pure | Borderline |
| 12 | 美国炼油厂 (50+ yr) | 需求端 EV 威胁, 非强制 | ✗ 需求可萎缩 | — | — | Fail (F 弱) |
| 13 | 重卡车队 (EPA 2027 排放) | Class 8 pre-buy 周期 | ✗ 周期性非 aging forced | PCAR / CMI | — | 已熟知周期 |
| 14 | 海洋钻机 (avg 20+ yr) | 新项目需 7G rig | ✓ 稀缺 | VAL / RIG / NE | cyclical | B 桶已覆盖 |
| 15 | 医院/医疗基础设施 | Medicare 现代化要求 | ✓ 但 fragmented | specialty contractors | ✗ | Fail |
| 16 | 铁路罐车 DOT-117 淘汰 | 有 deadline | ✓ | GATX / TRN leasing | cyclical | 周期性 |
| 17 | 军用基地设施 (Forever GI Act + PIT) | Congress 强制 modernization | ✓ | 国防承包商分散 | fragmented | Fail |
| 18 | 智能电表替换 | 10-15 yr 周期 + AMI 2.0 | ✓ 有 deadline | **ITRI (Itron), BMI (Badger Meter)** | ✓ pure | **候选** (BMI 已部分 priced) |
| 19 | 数据中心 PDU / UPS 老化 | AI 负荷 + 寿命周期 | ✓ 但 thermal mgmt 已 priced | VRT / TT | ✗ Gate 2 | Fail |
| 20 | 专业商用冷藏 (零售 + 冷链) | ECOD (Ecodesign) + F-gas | ✓ | 冷链运营 (AMR/LINE) | fragmented | Fail |

---

## ★ 2 个新候选 (+ 1 borderline + 1 备选)

### New M3-1 · Freight Rail Aging — WAB (Wabtec)

**Source**: AAR 数据美国货运机车 avg age ~25 年, 长距离机车 ~35+ 年 (相比最佳运营 life 20-25 年)。EPA Tier 5 排放规则推进中, FRA 20111 规定强制定期检查 + 机车 overhaul

**Non-linear failure test**: ✓ — 老机车 MTBF (mean time between failures) 25yr+ 后下降 >50%; 绝缘 + 电气系统失效率陡升; derailment 统计 + 保险损失数据确认

**Restricted**: 美国机车 OEM 是 duopoly — **Wabtec** + Progress Rail (Caterpillar 子公司, 非独立上市)。WAB 还因安装基数占主导 aftermarket (~60% 机车 + ~80% 信号/PTC)

**Owner**: WAB US-listed, 80% rail (35% 机车 + 40% aftermarket/services + 5% 国际)

**FROG**: PPPP
- F Pass: FRA 强制 inspection + EPA 排放规 + Class 1 railroad 自身可靠性压力
- R Pass: 机车 OEM duopoly, aftermarket 独家 parts PMA
- O Pass: WAB 纯度高, aftermarket + service 是 recurring revenue
- G Pass: 市场按 "industrial cyclical" 归类, 不给 "aging-forced replacement monopoly" 溢价。和 Aerospace Aftermarket 同构但低估度更高 (TDG/HEI 已部分 priced, WAB 未)

**Pace**: R > D。Q3/Q4 2025 WAB backlog 创高位, aftermarket +10%+, 但 sell-side 仍用 "rail volume" 估值

**建议 v3 ranking**: #8 (进, 替代 v2 #8 Data-Center Electrical)

---

### New M3-2 · HVAC Replacement + Refrigerant Transition — WSO (Watsco)

**Source**: 双驱动 — (1) EPA AIM Act 2020 强制 HFC 冷媒 2036 削减 85% (R-410A → A2L 系 2025+ 新规) + (2) 商用 HVAC 系统 avg ~15 yr, 故障率在 15 yr 后陡升

**Non-linear failure test**: ✓ — 压缩机 + 热交换器 + 控制系统在 15+ yr 故障率指数上升; 冷媒切换同时强制设备更换 (老设备不兼容新冷媒)

**Restricted**: HVAC distribution 网络密度 — WSO 有 700+ 分销点, 最大 independent distributor。OEM (LII/CARR/TT) 都依赖 WSO 的 channel 到达商用和住宅维修市场

**Owner**: WSO US-listed, 95% HVAC 分销 pure

**FROG**: PPPB
- F Pass: EPA AIM Act 强制 + 老化驱动双层
- R Pass: 分销网络 density 是真 chokepoint (B2B 维修 SKU 复杂度 + 即时可得需求)
- O Pass: WSO 纯度高
- G borderline: WSO 已有定价 (家族企业溢价 + 分红纪录), 但冷媒切换主题未被归类

**Pace**: R ≈ D。WSO 2024 涨 30%, 2025 回调; 当前冷媒切换订单刚启动 Realization, Diffusion 未跟上主题维度

**建议 v3 ranking**: #9-11 (borderline top 10, 替代候选)

---

### Borderline M3-3 · Utility Poles — VMI (Valmont)

**Source**: FERC 可靠性规 + 西部野火风险 + 气候适应, 推动木质杆替换为钢/复合杆
**FROG**: PPPF — F/G 通过, O 纯度弱 (VMI 仅 ~40% 公用事业结构, 其余 irrigation + coatings)
**Gate 5a**: 纯度 <60% → **Research Only**

---

### 备选 M3-4 · Smart Water Meters — BMI (Badger Meter)

**Source**: AWIA 强制 + AMI 2.0 升级 + PFAS 监测需要精确水表 (10-15 yr 周期)
**FROG**: PPPB
**Pace**: R ≈ D, BMI 已部分 priced (近年稳涨)
**建议**: 进 universe 但未必进 top 10 (和 Water Infra 重叠 bucket)

---

## Pilot 结论 (M3)

| 新候选 | Bucket | FROG | Pace | Purity |
|--------|--------|------|------|--------|
| WAB (Wabtec) | A | PPPP | R > D | ✓ 80% |
| WSO (Watsco) | A | PPPB | R ≈ D | ✓ 95% |

M3 产出 **2 个干净新候选** + 1 borderline (VMI, Research only) + 1 备选 (BMI, universe 加但不进 top 10)。阈值通过。

---

**End of M3 pilot.**
