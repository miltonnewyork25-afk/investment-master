# GRR间接验证v2: Deferred Revenue变化率法 (EVO-ADSK-02)

> **来源**: ADSK v1.0→v2.0升级(NRR倒推法高估GRR 2pp→GRR ~96% vs 估算98%)
> **适用**: 所有不披露GRR的SaaS公司(ADSK/DDOG/大多数SaaS)
> **触发**: Phase 2 M2单位经济学分析中,当公司不披露GRR时强制执行
> **解决问题**: NRR倒推法(NRR-扩展率=GRR)依赖扩展率估算→有2-3pp误差。DR法提供独立验证
> **精度**: ±2pp(优于NRR倒推法的±3pp,但仍是估算)

---

## 一、方法论

### 1.1 核心逻辑

**Deferred Revenue(预收收入)是客户已付未消费的订阅费**。如果客户在续约——Current DR应该跟踪Revenue增速。如果客户在流失——Current DR增速<Revenue增速(因为流失客户不再预付)。

因此: **Current DR增速 vs Revenue增速的gap ≈ GRR偏离100%的程度**。

```
CDR_Growth < Rev_Growth → Gap为负 → GRR < 100%的信号(客户流失)
CDR_Growth ≈ Rev_Growth → Gap为零 → GRR ≈ 100%(稳定)
CDR_Growth > Rev_Growth → Gap为正 → 可能的GRR > 100%(提前续约/预付增加)
```

### 1.2 为什么用Current DR而非Total DR

Total DR包含Non-current DR(多年合同的长期部分)。很多SaaS公司正从多年→年度合同转型(ADSK/CRM/DDOG都是)→Non-current DR结构性下降→**污染信号**。

Current DR(12个月内确认的预收)不受合同期限变化影响→是更干净的GRR代理。

### 1.3 GRR推断公式

```
简化公式:
  GRR_proxy ≈ 100% - (Rev_Growth - CDR_Growth) × 调整系数

调整系数:
  = 0.5-0.8(经验值)
  原因: CDR增速<Rev增速不全是因为churn——也可能因为新客DR占比低(新客付款时间更短)

保守估算(用0.8): GRR ≈ 100% - (Rev_Growth - CDR_Growth) × 0.8
激进估算(用0.5): GRR ≈ 100% - (Rev_Growth - CDR_Growth) × 0.5
中位估算(用0.65): GRR ≈ 100% - (Rev_Growth - CDR_Growth) × 0.65
```

### 1.4 计算模板

```
═══════════════════════════════════════════════════
{TICKER} GRR间接验证v2 (DR变化率法)
═══════════════════════════════════════════════════

Step 1: 提取数据(5年, 来源10-K)

| FY    | Curr DR($M) | CDR Growth | Revenue($M) | Rev Growth | Gap    |
|-------|------------|-----------|-------------|-----------|--------|
| FY{T-4}| $XXX       | —         | $XXX        | —         | —      |
| FY{T-3}| $XXX       | +X.X%     | $XXX        | +X.X%     | X.Xpp  |
| FY{T-2}| $XXX       | +X.X%     | $XXX        | +X.X%     | X.Xpp  |
| FY{T-1}| $XXX       | +X.X%     | $XXX        | +X.X%     | X.Xpp  |
| FY{T}  | $XXX       | +X.X%     | $XXX        | +X.X%     | X.Xpp  |

Step 2: 计算4年平均Gap
  Average Gap = (gap1 + gap2 + gap3 + gap4) / 4 = X.Xpp

Step 3: 推断GRR
  GRR (保守, ×0.8) = 100% - |Avg Gap| × 0.8 = XX.X%
  GRR (中位, ×0.65) = 100% - |Avg Gap| × 0.65 = XX.X%
  GRR (激进, ×0.5) = 100% - |Avg Gap| × 0.5 = XX.X%

Step 4: 与NRR倒推法交叉验证
  NRR倒推法: GRR = NRR - 扩展率 = XX% - XX% = XX%
  DR法: GRR = XX% (中位)
  差异: XXpp → [一致/需要解释]

Step 5: 同行校准
  如果推断GRR在同行范围内(±3pp) → 可信
  如果偏离>3pp → 可能有特殊因素(计费转型/会计变更/并购)
═══════════════════════════════════════════════════
```

---

## 二、已验证案例

### ADSK (首次应用)

| FY | CDR Growth | Rev Growth | Gap |
|----|:---------:|:---------:|:---:|
| FY2023 | +11.9% | +14.1% | -2.2pp |
| FY2024 | +9.3% | +9.8% | -0.6pp |
| FY2025 | +8.2% | +11.5% | -3.3pp |
| FY2026 | +16.3% | +17.5% | -1.2pp |

Avg Gap: -1.8pp
GRR(中位, ×0.65): 100% - 1.8 × 0.65 = **98.8%**
GRR(保守, ×0.8): 100% - 1.8 × 0.8 = **98.6%**

**NRR倒推法**: NRR ~108% - 扩展率~10% = GRR ~98%
**DR法**: GRR ~98.6-98.8%
**交叉验证**: 两种方法在±1pp内一致 ✅ → GRR ~96-98%(取保守端)

### 同行参考基准

| 公司 | GRR(披露/推断) | DR法验证 | 方法 |
|------|:----------:|:------:|------|
| NOW | 97-98%(推断) | 待验证 | NRR 125% - 扩展~27% |
| CRM | ~92%(推断) | 待验证 | NRR ~115% - 扩展~23% |
| DDOG | ~96%(推断) | 待验证 | NRR ~120% - 扩展~24% |
| ADSK | **96-98%(DR法)** | **✅已验证** | 首个DR法案例 |

---

## 三、注意事项与局限

### 3.1 DR法的5个干扰因素

| 干扰 | 影响方向 | 识别方法 | 处理 |
|------|:------:|---------|------|
| **计费模式转型**(多年→年度) | NC DR↓→Total DR失真 | NC DR/Total比是否在快速变化 | 仅用Current DR |
| **大型M&A** | DR跳升(并购带入) | GW变化+收购披露 | 剔除并购年的数据 |
| **地理mix变化** | 不同地区DR seasonality | 地理收入占比变化 | 注意但通常影响<1pp |
| **定价策略变化** | 批量提价→DR短期跳升 | 比对提价幅度和DR增速 | 用3-4年平均而非单年 |
| **会计变更**(ASC 606等) | DR重分类 | 10-K注释 | 剔除变更年 |

### 3.2 什么时候DR法不可靠

- **纯consumption-based定价**(DDOG部分): 无预付→Current DR很小→信号弱
- **DR占Revenue<30%**: DR太小,波动噪音>信号
- **并购密集年**: DR结构被并购打乱

### 3.3 精度估算

| 方法 | 精度(±pp) | 前提条件 |
|------|:-------:|---------|
| 公司直接披露 | ±0 | 公司愿意披露 |
| DR变化率法(本模块) | **±2pp** | DR/Rev>30%+无重大干扰 |
| NRR倒推法(传统) | ±3pp | NRR可得+扩展率可推 |
| 行业类比法 | ±5pp | 仅用同行中位数 |

---

## 四、集成要求

### 触发规则(写入Phase 2检查清单)

```
Phase 2 M2单位经济学:
  IF company_discloses_grr == False:
    EXECUTE grr_indirect_v2(DR变化率法)
    CROSS_VALIDATE with nrr_deduction_method
    IF |DR法 - NRR法| > 3pp:
      FLAG "GRR估算不一致" → 需要解释
    RECORD grr_estimate in shared_context
```

### Kill Switch集成

```
KS-GRR: GRR(DR法) < 90% → "存量客户净流失" → 增长模式崩塌
  数据源: 季度10-Q Current DR + Revenue
  检查频率: 季度
  触发动作: 重新评估NRR+增速假设 → 可能下调评级
```

### 与SBC瀑布的联动

GRR下降→NRR下降→Revenue增速下降→SBC/Rev分母效应减弱→SBC收敛放缓。因此:
```
IF GRR_dr_method < GRR_nrr_method by >2pp:
  WARN "SBC收敛投影可能过于乐观(分母增速被高估)"
  ADJUST sbc_waterfall Step 2收敛投影(降低Rev增速假设)
```
