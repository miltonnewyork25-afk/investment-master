# Advertising Cycle Indicator v1.0

## Skill Metadata
- **ID**: macro_analysis.advertising_cycle_indicator_v1.0
- **适用**: Google/Meta/Snap/Pinterest/Trade Desk等广告驱动公司

---

## Purpose

追踪广告支出周期与宏观经济的关系，提供周期定位和预测。

**核心问题**: 广告支出与GDP/消费者信心的弹性、当前周期阶段

**适用公司**:
| 公司 | 广告收入占比 | 周期敏感度 |
|------|-------------|-----------|
| Google | 77% | 中 |
| Meta | 97% | 高 |
| Snap | 99% | 极高 |

---

## 广告-经济弹性

| 指标 | 与广告关系 | 领先/滞后 | 弹性 |
|------|-----------|----------|------|
| GDP增速 | 正相关 | 同步 | 1.5-2.0x |
| 消费者信心 | 正相关 | 领先2-3月 | 0.8-1.2x |
| 企业利润 | 正相关 | 同步 | 1.0-1.5x |
| 失业率 | 负相关 | 滞后3-6月 | -1.0x |

---

## 4阶段周期模型

| 阶段 | 特征 | 指标 |
|------|------|------|
| **扩张** | 广告↑>GDP↑、CPM/CPC↑、库存紧张 | 增速vs GDP >1.5x |
| **峰值** | 增速放缓、定价见顶、预算收紧 | 增速vs GDP 1.0-1.5x |
| **收缩** | 广告↑<GDP↑、CPM/CPC↓、效果>品牌 | 增速vs GDP <1.0x |
| **谷底** | 负增长、定价见底、清库存 | 增速为负 |

---

## 渠道敏感度

| 渠道 | 敏感度 | 衰退影响 |
|------|--------|---------|
| 搜索 | 中 | -5~10% |
| 社交 | 高 | -10~20% |
| 展示 | 高 | -15~25% |
| 视频 | 中高 | -10~20% |
| 零售媒体 | 低 | -0~5% |

| 广告主类型 | 敏感度 | 行为 |
|-----------|--------|------|
| 小企业 | 极高 | 现金流紧张即削减 |
| 中端市场 | 高 | 按季度调整 |
| 企业 | 中 | 年度预算有惯性 |
| 效果导向 | 低 | ROI正就继续投 |

---

## 领先指标监测

```yaml
ad_specific:
  - {indicator: "广告主预算调查", source: "IAB/CMO Survey", lead: "1-2季度"}
  - {indicator: "广告招聘趋势", source: "LinkedIn/Indeed", lead: "2-3个月"}
  - {indicator: "广告科技公司指引", source: "TTD/MGNI/PUBM", lead: "1季度"}

macro:
  - {indicator: "消费者信心", source: "Conference Board", lead: "2-3个月"}
  - {indicator: "PMI", source: "ISM", lead: "1-2个月"}

composite:
  formula: "加权平均(广告×0.6 + 宏观×0.4)"
  interpretation: {">60": "扩张", "40-60": "稳定", "<40": "收缩"}
```

---

## Scoring System: AC_Score (0-100)

| 维度 | 权重 | +2 | -2 |
|------|------|----|----|
| 周期阶段 | 30% | 扩张早期 | 收缩/谷底 |
| 定价趋势 | 25% | CPM/CPC强劲↑ | 大幅↓ |
| 广告主情绪 | 25% | 预算增加意愿强 | 大幅削减 |
| 宏观背景 | 20% | GDP加速+信心↑ | 衰退风险高 |

**公式**: `AC_Score = Σ(维度分数×权重)×25+50`

**解读**: 80-100繁荣期 | 60-79扩张期 | 40-59稳定期 | 20-39收缩期 | 0-19低谷期

---

## Output Contract

```yaml
ad_cycle_output:
  cycle_position: {stage, evidence, duration}
  macro_ad_relationship: {gdp_elasticity, confidence_correlation}
  channel_sensitivity: {search, social, display, video, retail_media}
  leading_indicators: {ad_specific, macro, composite}
  ac_score: {total, breakdown}
  scenarios: {base, bear, bull}
  investment_implications: {stance, channel_preference, stock_implications}
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-AC-01 | 经济衰退确认(NBER) | 下调所有广告股 |
| KS-AC-02 | 广告支出连续2季度负增长 | 进入收缩模式 |
| KS-AC-03 | 大型广告主大规模削减 | 重估周期位置 |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 数据滞后 | 广告支出数据通常滞后1-2月 |
| 🚩 渠道转移 | 总量下降可能掩盖渠道转移 |
| 🚩 区域差异 | 美国/欧洲/中国周期不同步 |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-01-27 | 初始版本，压缩至~200行 |
