# FORM — Default Map Audit (S-1)

> **Phase 0.75 产物** | 2026-04-16

---

## 市场默认地图

```yaml
default_map_audit:
  market_default_definition: "HBM探针卡独家供应商，AI CapEx超级周期的直接受益者"
  market_default_variables:
    - "HBM出货量增速 (SK Hynix/Micron/Samsung的HBM wafer starts)"
    - "探针卡content per wafer (随HBM代际翻倍)"
    - "毛利率扩张轨迹 (39% → 45% → 47%目标)"
  market_default_valuation_language: "Forward PE 57x × FY2027E EPS, 或 EV/Sales 12.6x 对标Advantest"
  market_default_narrative: "HBM4每一代都让探针卡更贵更复杂，FormFactor是MEMS技术唯一大规模供应商，消耗品模式意味着持续收入"

  failure_points:
    - fact: "ROIC 4.9%远低于WACC (~10%)——市场付12.6x EV/Sales买一个每投入1美元毁灭价值的生意"
      why_old_map_fails: "HBM增长叙事完全忽视资本回报率。FORM和COHR一样，增长不等于创造价值。Farmers Branch追加$140-170M CapEx + $25M OpEx，如果ROIC不跨过WACC，这笔投资是价值毁灭"

    - fact: "Foundry & Logic收入从$436M (FY21)降到$370M (FY25) -15%，同期Technoprobe赢得TSMC 2nm 30%份额"
      why_old_map_fails: "市场只看DRAM/HBM增长，但F&L占47%收入且在萎缩。如果把FORM拆成两个公司：DRAM($247M, +117%) + F&L($370M, -15%)，后者不值12.6x EV/Sales。'HBM纯度'远低于股价暗示的水平"

    - fact: "FY2025全年EPS $0.69，比FY2021的$1.06低35%——尽管DRAM收入翻倍"
      why_old_map_fails: "DRAM增长并没有传导到EPS增长。CapEx从$38M飙到$104M + SBC $39M + pre-production成本吃掉了增量利润。这不是'还没到收获期'的故事——这是'收入翻倍但利润缩小'的结构性问题"

    - fact: "分析师中位目标价$80-86 vs 当前$128——100%的卖方覆盖都认为股价高估33%+"
      why_old_map_fails: "如果市场叙事是对的(HBM探针卡=独家垄断)，卖方不应该集体看低33%。6 Hold + 4 Buy + 0 Sell的评级分布说明卖方看到了市场定价中的泡沫成分，但没人敢喊空"

  why_new_map_needed: "继续用HBM增长叙事看FORM，会忽略四件事：(1)ROIC<WACC意味着增长不创造价值 (2)F&L萎缩被HBM掩盖 (3)EPS随收入翻倍反而下降 (4)全部卖方都认为高估"
```
