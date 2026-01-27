# Robotaxi Valuation Framework v1.0

## Skill Metadata
- **ID**: valuation.robotaxi_valuation_v1.0
- **Category**: valuation
- **适用**: Waymo/Tesla/Cruise/Baidu Apollo/Zoox

---

## Purpose

自动驾驶出行服务（Robotaxi）专门估值框架。结合TAM渗透+单位经济学DCF+期权定价。

**核心挑战**: 早期业务传统DCF不适用、技术/监管/安全不确定性高

---

## 4种估值方法

### Method 1: TAM渗透法

```yaml
tam_penetration:
  global_ride_hail_2025: "$350B"
  robotaxi_addressable: "60%"
  growth_rate: "10% CAGR"

  scenarios:
    bear: {penetration: 5%, share: 20%, revenue: "$5.5B"}
    base: {penetration: 15%, share: 30%, revenue: "$25B"}
    bull: {penetration: 30%, share: 40%, revenue: "$66B"}

  valuation:
    multiple: "3-5x收入"
    discount: "15%（高风险）"
```

### Method 2: 单位经济学DCF

```yaml
unit_economics:
  vehicle:
    cost: "$150K-250K"
    life: "5年/50万英里"
    utilization: "50-70%"

  economics_per_mile:
    revenue: "$2.50-4.00"
    cost:
      depreciation: "$0.30-0.50"
      maintenance: "$0.15-0.25"
      insurance: "$0.20-0.40"
      remote_support: "$0.10-0.20"
      energy: "$0.08-0.15"
      other: "$0.15-0.30"
      total: "$1.00-1.80"
    gross_margin: "$1.00-2.50"

  fleet_projection: |
    | 年份 | 车队 | 利用率 | 收入 | 毛利 |
    |------|------|--------|------|------|
    | 2026 | 1K | 50% | $200M | $80M |
    | 2028 | 20K | 60% | $4.8B | $2.4B |
    | 2030 | 100K | 65% | $26B | $14B |

  dcf_inputs: {wacc: "12-15%", terminal_growth: "3%"}
```

### Method 3: 期权定价法

```yaml
option_pricing:
  underlying: "成功商业化后的业务价值"
  strike: "累计研发投资+监管成本"

  probability_approach:
    full_success: {prob: 30%, value: "$150B", weighted: "$45B"}
    partial_success: {prob: 40%, value: "$50B", weighted: "$20B"}
    failure: {prob: 30%, value: "$0", weighted: "$0"}
    expected_value: "$65B"
    discount_factor: "0.5（10年@7%）"
    pv: "$32.5B"
    net_option_value: "$17.5B" # PV - cumulative investment
```

### Method 4: 可比交易法

| 公司 | 估值 | 时间 | 阶段 |
|------|------|------|------|
| Cruise | $30B | 2021 | Pre-commercial |
| Waymo | $30B | 2020 | Early commercial |
| Aurora | $13B | 2021 | Pre-commercial |

---

## 4大估值驱动因素

### Driver 1: 技术进度

| 分数 | 条件 |
|------|------|
| +2 | MBD>50,000，行业领先 |
| +1 | MBD 20,000-50,000 |
| 0 | MBD 10,000-20,000 |
| -1 | MBD 5,000-10,000 |
| -2 | MBD<5,000 |

*MBD = Miles Between Disengagement (脱离干预里程)

### Driver 2: 监管进度

| 分数 | 条件 |
|------|------|
| +2 | 多城市商业运营，扩张顺利 |
| +1 | 商业运营中，扩张进行 |
| 0 | 有限商业运营 |
| -1 | 仅测试阶段 |
| -2 | 监管受阻/暂停 |

### Driver 3: 安全记录

| 分数 | 条件 |
|------|------|
| +2 | 安全记录显著优于人类司机 |
| +1 | 安全记录优于人类 |
| 0 | 与人类持平 |
| -1 | 略逊于人类 |
| -2 | 发生严重事故/运营暂停 |

*基准: 人类司机~4次碰撞/百万英里

### Driver 4: 商业牵引力

| 分数 | 条件 |
|------|------|
| +2 | 周订单>100K，增速>100% YoY |
| +1 | 周订单增长中，PMF初步验证 |
| 0 | 早期商业化 |
| -1 | 商业化困难 |
| -2 | 无商业化进展 |

---

## Scoring System: RR_Score (0-100)

| 维度 | 权重 |
|------|------|
| 技术进度 | 30% |
| 监管进度 | 25% |
| 安全记录 | 25% |
| 商业牵引力 | 20% |

**公式**: `RR_Score = Σ(维度分数×权重)×25+50`

**估值方法选择**:
- RR>80: 单位经济学DCF为主
- RR 60-80: 期权+DCF混合
- RR 40-60: 纯期权定价
- RR<40: 可比交易参考

---

## Output Contract

```yaml
robotaxi_valuation_output:
  rr_score: {total, breakdown}
  valuation:
    tam_method: {bear, base, bull}
    unit_economics: {dcf_value, assumptions}
    option_pricing: {prob, value, expected}
    weighted: {bear, base, bull}
  key_assumptions: [技术, 监管, 商业]
  sensitivity: {to_prob, to_penetration, to_timeline}
  milestones: [{event, date, impact}]
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-RT-01 | 致命事故导致运营暂停 | 估值归零直至恢复 |
| KS-RT-02 | 监管全面收紧 | 下调监管评分和估值 |
| KS-RT-03 | 技术路线被证伪 | 重评技术评分 |
| KS-RT-04 | 母公司撤资 | 调整持续经营假设 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 安全数据选择性披露 | 只报告有利数据 |
| 🚩 里程定义不一致 | 有人/无人里程混计 |
| 🚩 城市复杂度差异 | SF难度远高于Phoenix |
| 🚩 补贴掩盖经济学 | 亏本获客 |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本，压缩至~250行 |
