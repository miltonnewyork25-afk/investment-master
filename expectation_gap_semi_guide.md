# 半导体预期差分析指南 v1.0

> **用途**: 半导体行业深度调研时的预期差分析参考
> **主知识库**: `knowledge/expectation_gap_patterns.yaml` (PEP-001~007 + 7个领先指标 + 子行业框架)
> **行业报告**: `reports/SEMI_SECTOR/Semiconductor_Expectation_Gap_Sector_Report_v1.0.md`
> **已完成卡片**: 13家(NVDA/TSM/ASML/AMD/AVGO/KLAC/LRCX/AMAT/MU/ARM/SMCI/VRT/INTC)

---

## 1. 半导体分析额外必执行的3个检查

### 检查1: 周期位置判断(BLOCK级, Phase 0)

7个领先指标(SEMI-L1~L7,详见patterns.yaml):
- L1 库存天数(DIO)变化 — 领先收入2-3Q ★最领先
- L2 CapEx/D&A比率 — 领先1-2年
- L3 订单积压/B-B比率 — 领先1-2Q
- L4 DRAM/NAND现货价 — 领先1Q
- L5 WFE总支出预测(SEMI) — 同步
- L6 Hyperscaler AI CapEx — 需求的需求
- L7 地缘政治温度 — 非财务因子

4个周期位置: early_recovery(★买入) → mid_cycle(持有) → late_cycle(减仓) → downturn(准备买)
当前(2026-03): late_cycle(WFE第3年增长), 但AI可能延长

### 检查2: AI利好衰减评估(Phase 1)

```
Layer 1 设计(NVDA/AMD/AVGO/ARM): 0%衰减 → Forward PE
Layer 2 制造(TSM):               ~5%     → Forward PE + 地缘调整
Layer 3 设备(ASML/KLAC/LRCX/AMAT): 30-50% → Mid-cycle PE(★禁止用峰值PE)
Layer 4 存储(MU):                50-70%  → 反转PE(★低PE=卖出信号)
Layer 5 基础设施(VRT/SMCI):      取决于IP → 毛利率区分(VRT 34% vs SMCI 6%)
```

### 检查3: PEP模式检测(Phase 2估值)

| PEP | 适用对象 | 检测方法 |
|-----|---------|---------|
| PEP-005 催化剂金字塔 | INTC等转型 | 催化剂在哪层?市场在哪层定价? |
| PEP-006 周期峰值溢价 | 设备(KLAC/LRCX/AMAT) | 当前PE vs 历史5年区间,>150%上沿=危险 |
| PEP-007 反转PE | 存储(MU) | 低PE+高毛利率=峰值, 检查CapEx/D&A |

---

## 2. 子行业估值锚(强制)

| 子行业 | 正确估值锚 | 禁止 |
|--------|----------|------|
| 设计垄断(NVDA/AMD/AVGO) | Forward PE + PEG | Trailing PE独立使用 |
| 制造垄断(TSM) | Forward PE + 地缘折价 | P/FCF(CapEx扭曲) |
| 设备周期(KLAC/LRCX/AMAT) | **Mid-cycle PE** | 峰值Trailing PE |
| EUV垄断(ASML) | Forward PE | 标准DCF |
| 存储(MU) | **反转PE** | 正常PE逻辑 |
| IP/版税(ARM) | P/S + 版税率 | P/E |
| AI基础设施(VRT/SMCI) | P/E + 毛利率 | P/S独立使用 |

---

## 3. 关键发现速查

- **地缘折价可量化**: TSM vs ASML PE差8个点(OPM/增速/ROIC全面优于但PE低26%)
- **ASIC vs GPU不是零和**: AVGO两种场景都受益(GPU赢=更多网络, ASIC赢=更多设计)
- **有IP vs 无IP**: VRT(34%毛利)vs SMCI(6%) — 同一趋势完全不同结局
- **设备PE历史极端**: KLAC 49x/LRCX 51x/AMAT 38x — 全部>历史区间上沿150%
- **MU反转PE**: 21x PE=峰值信号(FY23曾亏损$5.8B → FQ2'26毛利率74%)
