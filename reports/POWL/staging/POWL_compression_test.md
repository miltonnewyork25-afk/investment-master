# POWL — Compression Test (S-2 强制产出)

> **用途**: Phase 4.5 S-2 "压缩" 环节; 产 1 个新定义命名 + 三链接验证 + expansion_test
> **配套**: `POWL_default_map_audit.md` (S-1) + `POWL_thesis_crystallization.md` (Phase 0.75)
> **下游**: Phase 5 执行摘要段 2 + Ch 1 新定义引入 + 倒数第二章固化

---

## compression_result (YAML)

```yaml
new_definition: "被当纯 beta 定价的 LNG 混合体"  # ≤15 字, 无审美词
new_definition_one_sentence: |
  POWL 实际是"LNG+公用承包主力(75%稳态营收) + 15% DC backlog optionality"混合体, 被市场
  当 AI 纯 beta 用 PE 47x 定价, 而混合体公允 PE 18x.  # 78 字

# ---- 链接 1: 变量排序变化 ----
variable_reorder:
  old_first_variable: "季度 DC 订单绝对值 + Backlog YoY 增速"
  new_first_variable: "GM run-rate (Forward-Cyclical spread) + DC 收入占总营收比"
  why_new_more_explanatory: |
    季度 DC 订单是**兴奋点**, 不是**基本面**. FY25 DC 仅 2.4% 营收, 即便 FY26
    达 15-20% 管理层 guide, 74% 营收仍来自 LNG+Utility+工业 周期性业务. 真正
    决定 POWL 估值的是: (1) GM 从 peak 29.4% 回落到稳态 25-26% 的速度, 每 1pp
    GM 下降 → FY27 EPS -$0.30, 影响 8-10% 估值; (2) DC 占比是否突破 25% 阈值
    (重分类为 hybrid), 若否则应用 Core PE 16-18x 而非 DC PE 40-50x.
    F-C spread +19-21pp 是**3 年窗口内最高**, 历史类比 12-18 个月跌 35-60%.

# ---- 链接 2: 估值语言切换 ----
valuation_language_shift:
  old_method: "NTM PE 47x × FY27E EPS \$5.99 = \$240-300 目标价 (AI 基建股框架)"
  new_method: "SOTP 三段式: Core 业务 PE 16-18x (周期股) + LNG premium (DCF) + DC option (概率加权)"
  why_must_shift: |
    单一 PE 估值隐含"POWL 主要驱动是 AI DC"——这是范畴错误. POWL 业务结构
    要求 SOTP: 75% 营收 (Core+LNG) 必须用周期股 PE (类比 ETN 28x 打 cycle
    discount -4x = 18x), 25% backlog (DC option) 必须用概率加权 (Bull 10% /
    Base 60% / Bear 30%, 不是 25/55/20 激进分布). Reverse DCF 当前股价
    隐含 10Y FCF CAGR 20.2%, 而 Core 稳态 CAGR 仅 5% → 3-4x overshoot.

# ---- 链接 3: 解释旧框架解释不了的现象 ----
explained_anomaly:
  anomaly: "FY25 DC 营收占比 2.4%, 但 PE 47x 与 VRT (DC 60% 营收, PE 50x) 同档. 单纯 AI beta 框架解释不通这 20x+ 营收占比差距为何仅 3x PE 差距。"
  new_explanation: |
    把 POWL 当 AI beta = 给 2.4% 营收溢价完整的 VRT multiple. 混合体框架解释:
    市场其实在给 POWL **backlog 结构** (Q1 FY26 15% DC) 定价, 而不是营收结构.
    但 backlog 15% 中 2/3 是 1-2 个 hyperscaler megaproject (DM-SG-001~003),
    不能推断为稳态 DC 收入 15%. 当 Q2-Q3 FY26 DC backlog 无法重复 $240M
    megaproject, PE 将从 47x 向 18-22x 均值回归. F-C spread +21pp 同时
    暗示 GM 将从 29.4% 回落, 形成 **PE 压缩 + EPS 下调** 双击 (-40 to -60%).

# ---- expansion_test: 新定义一旦成立, 后续章节自动变顺 ----
expansion_test:
  sub_modules:
    - "Ch 2 财务归因: 因为 POWL 是混合体, FY25 +42% 增速必须拆成 '周期性 +31pp + 结构性 +11pp' (R-1 毛利 Bridge 周期性 12pp vs 结构性 1.5pp 是关键证据)"
    - "Ch 3 护城河: 因为 Core 是周期性重工业承包 (LNG+Utility), 转换成本低; DC 是期权, 尚未建立护城河 → 合理 CQI 稳态 53, 不是当前 58 (peak 虚高)"
    - "Ch 4 估值: 因为混合体, 必须 SOTP (Core 16-18x PE + LNG DCF + DC 概率加权), 不能单一 PE × EPS"
    - "Ch 5 竞争: 因为 POWL 是小盘单产品壳 (MV Switchgear), 不是 VRT 级平台, Peer 可比应选 ETN/HUBB 而非 VRT/SMCI"
    - "Ch 6 风险/Kill Switch: 因为混合体, K-CQI (GM 回落) 和 K-GAP (DC 掉落) 独立可验证, 联合概率 15% 推导极端 Bear $33-45"
    - "Ch 7 圆桌 (R-3): 因为混合体, Munger '反身性 peak' + Buffett '护城河弱 + peak ROE' + Druckenmiller '三重宏观压力' 自然成 3/5 异议, 不是主观选择"
```

---

## 1. 真压缩 vs 假压缩 对照

| 测试维度 | 真压缩 (本报告) | 假压缩 (反例) |
|---------|---------------|--------------|
| **命名** | "被当纯 beta 定价的 LNG 混合体" (13 字, 含经济性质) | "高质量 AI 基础设施股" (审美词, 空) |
| **改变量排序** | ✓ DC 订单绝对值 → F-C spread + DC 占比 (从噪音变量切换到定价变量) | ✗ 仍用 DC 订单/backlog |
| **改估值语言** | ✓ 单一 PE → SOTP 三段 (Core 周期股 PE / LNG DCF / DC 期权) | ✗ 仍用 PE × EPS |
| **解释旧框架失灵** | ✓ 解释了"2.4% DC 营收为何匹配 VRT 50x PE"的错配 | ✗ 未多解释任何异常现象 |
| **可记忆/可携带** | ✓ 13 字, 含 3 个独立组件 (纯 beta / LNG / 混合体) | ✗ 只有概念, 无结构 |
| **Hard Test: 后续章节自动变顺** | ✓ 7 个子模块自动展开 (见 expansion_test) | ✗ 后续章节仍需逐个论证 |

---

## 2. S-2 自检 (脚本要求)

- [x] **产物存在**: `staging/POWL_compression_test.md` ✓
- [x] **三链接齐全**: variable_reorder / valuation_language_shift / explained_anomaly 全部填写 ✓
- [x] **无审美词**: 新定义含 "混合体" "LNG" "纯 beta" (经济术语, 非审美) ✓
- [x] **expansion_test ≥3 个子模块**: 7 个子模块 ✓
- [x] **与 S-1 对齐**: new_definition 对应 default_map_audit 的 `market_default_definition` 的反面 ✓

---

## 3. Top 5 Lens Registry (Hofstadter 范畴重分配)

> **用途**: Phase 5 执行摘要 + Ch 1 范畴重分配展开; 至少 3 条明确包含"把公司从范畴 X 重新分类到 Y"

### Lens 1 (母透镜, 与 compression_test.new_definition 一致):

```yaml
lens_1:
  old_category: "AI 数据中心电力基础设施纯 beta (与 VRT 同档)"
  new_category: "被当纯 beta 定价的 LNG 混合体 (LNG+公用承包主力 + 15% DC optionality)"
  why: |
    FY25 DC 营收 2.4%, LNG+Utility 51%; 管理层 CapEx 100% 投向 Jacintoport LNG
    码头, 零投入 DC 产能; Q1 FY26 backlog 仅 15% DC, 52% 来自 LNG+Utility.
    这些事实是旧"纯 beta" 框架解释不了的.
  valuation_implication: |
    应用 SOTP 三段式, 不是单一 PE: Core (16-18x PE 打 cycle discount) + LNG
    (DCF, 4-5年订单可见) + DC option (概率加权 Bull 10%/Base 60%/Bear 30%)
  key_variable_shift: "从'DC 订单绝对值'变成'GM run-rate + DC 营收占比突破 25% 阈值'"
```

### Lens 2 (周期定位):

```yaml
lens_2:
  old_category: "高增长小盘成长股 (FY25 +42% 增速)"
  new_category: "Peak-cycle 重工业承包商 (F-C spread +19-21pp)"
  why: |
    +42% 增速 74% 来自周期性 (backlog 释放 + GM 扩张), 稳态 FCFE CAGR 5%.
    F-C spread 历史 3 年窗口最高, 4/4 insider base rate 显示 peak confirmation.
    GM 已开始回落 (Q4 FY25 31.4% → Q1 FY26 28.4%, -3pp 单季度).
  valuation_implication: |
    应用 peak-cycle discount -4x PE; 稳态 ROE 12-15% (非 peak 28%), 合理 PB 2x
    (非 peak 5x+); 历史 peak stocks 12-18 个月跌 35-60%.
  key_variable_shift: "从'NTM EPS'变成'稳态 FCFE CAGR 5% + F-C spread 收敛速度'"
```

### Lens 3 (护城河认知):

```yaml
lens_3:
  old_category: "AI 基建龙头 (隐含强护城河, PB 5x+)"
  new_category: "小盘单产品壳 (MV Switchgear 单一产品, 弱护城河)"
  why: |
    POWL 仅供应中压开关柜, 不是垂直整合平台 (对比 VRT 的 Power+Cooling+
    Racks+Monitoring). ETN/ABB/SIEMENS 合计全球 MV switchgear >70% 市占.
    Jacintoport 是 CAPEX 投资, 不是 moat (任何竞争者都能建).
  valuation_implication: |
    不适用 VRT 7.5x EV/Sales multiple (platform premium), 应用单产品电气
    设备 4.0x EV/Sales. DC option 从隐含 $49/股 压缩到概率加权 $22/股.
  key_variable_shift: "从'平台溢价'变成'单产品市占增速 + 产能可见性'"
```

### Lens 4 (insider signal 的硬度):

```yaml
lens_4:
  old_category: "涨势主导的成长股 (insider 卖出视为 diversification)"
  new_category: "Y3 kill switch 已触发 (12 个月 zero-buy + 4/4 F-C spread >15pp base rate)"
  why: |
    CEO Peers 过去 12 个月净 0 次买入, 仅 10b5-1 卖出计划; 历史 4/4 F-C spread
    >15pp 案例 12 个月内股价 -30% 以上 (100% base rate, n=4); 扩大到 n=12
    样本, Bear 情景 2/12 = 16.7% base rate, 已略高于 Bear probability 20%.
  valuation_implication: |
    Bear probability 从 20% 上调至 25% (Phase 4 红队修正), 相应 Base 从 55%
    下调至 50%. 概率加权估值从 $89 → $92 (略变轻微, 因 Base 上调略补).
  key_variable_shift: "从'管理层 guidance'变成'insider buy 6-12 个月 vs zero-buy 计数'"
```

### Lens 5 (Reverse DCF 反推验证):

```yaml
lens_5:
  old_category: "合理估值区间 PE 35-50x"
  new_category: "当前股价隐含 10Y FCF CAGR 20.2% (历史 0/25 案例)"
  why: |
    Reverse DCF 用 WACC 10% + terminal g 3% + TTM FCF $161.5M + EV $8.29B
    反推, 当前 $241 需要 10Y FCF CAGR 20.2%. 对比历史: POWL 过去 10 年
    FCF CAGR 14% (含 FY23-25 AI 周期峰值). 未来 10 年持续 20%+ 增速在
    S&P 600 小盘股历史基本不存在 (0/25 案例).
  valuation_implication: |
    Base 情景 (CAGR 5%) 公允值 $84; Bull 情景 (CAGR 12%, 已属激进) 公允值
    $135; 当前 $241 比 Bull 情景还贵 +78%. 安全边际 = **负 60%** (Klarman
    视角: 这不是投资, 是投机).
  key_variable_shift: "从'NTM PE'变成'Implied 10Y FCF CAGR 的历史 base rate'"
```

---

## 4. Lens 之间的结构 (非独立并列, 母-子结构)

```
Lens 1 (母): 被当纯 beta 定价的 LNG 混合体
├── Lens 2 (周期): 验证"为何旧地图失灵"的机制——peak confirmation
├── Lens 3 (护城河): 验证"为何不能用 VRT 估值"——单产品壳 vs 平台
├── Lens 4 (insider): 验证"peak 将反转"的硬信号——Y3 已触发
└── Lens 5 (Reverse DCF): 验证"overshoot 幅度"的量化——20.2% implied vs 5% actual
```

5 个 lens 不是 5 篇独立小文章, 是围绕 Lens 1 母透镜的 4 个不同角度验证 (机制 / 护城河 / 信号 / 数学).

---

## 5. 钉子预写 (Phase 5 倒数第二章固化章节预备)

### 钉子 1: 新定义
> **POWL 不是"AI 纯 beta", 是"被当纯 beta 定价的 LNG 混合体"**. 解释 FY25 DC 仅 2.4% 营收 + CapEx 100% 投 LNG 的反常事实.

### 钉子 2: 第一变量
> 市场看**季度 DC 订单绝对值**, 但实际驱动是 **GM run-rate (F-C spread 收敛速度) + DC 营收占比突破 25% 阈值**.
> 具体跟踪:
> - FY26 季度 GM 是否 <27% 两季 (K-CQI-2)
> - DC 营收占比 FY26 全年是否突破 15% (V1)

### 钉子 3: 估值语言
> 不要再用 **PE × FY27E EPS** 给 POWL 定价, 应该用 **SOTP 三段式**:
> - Core 业务: ETN 级 PE 22x - cycle discount 4x = **18x** × Core EPS
> - LNG premium: DCF (4-5 年订单可见)
> - DC option: 概率加权 (Bull 10% / Base 60% / Bear 30%, 不是 25/55/20)

### 钉子 4: 迁移问题
> 看下一家 "AI 数据中心纯 beta" 小盘股时, 必问的 2 个问题:
> - DC 营收占比当前是多少? 是否突破 25% 阈值 (混合体 vs 纯 beta 分水岭)?
> - F-C spread 当前几 pp? 是否 >20pp (peak confirmation 阈值)?

---

## 6. 与 Phase 0.75 的一致性检查

| S-1 `default_map_audit` | S-2 `compression_test` | 一致性 |
|------------------------|----------------------|--------|
| `market_default_definition`: AI DC 纯 beta | `new_definition`: 被当纯 beta 定价的 LNG 混合体 | ✓ 反面对应 |
| `market_default_variables`: 季度 DC 订单/Backlog YoY/B2B/GM 扩张 | `new_first_variable`: GM run-rate + DC 占比 | ✓ 变量重排 |
| `market_default_valuation_language`: TTM PE 47x × NTM EPS | `new_method`: SOTP 三段 (周期 PE + DCF + 期权) | ✓ 估值切换 |
| `failure_points`: FY25 DC 2.4% / LNG 100% CapEx / insider 4/4 | `explained_anomaly`: 2.4% 营收匹配 VRT 50x PE 的错配 | ✓ 失灵点被新定义解释 |

一致性验证: **PASS** ✓ 新定义沿着 S-1 failure_points 的接口自然进入.
