# 护城河评估框架 v1.3

## Skill Metadata
- **ID**: research_mechanism.moat_evaluation_v1.3
- **主路由**: Research Mechanism (70%) / Quality Gate (30%)
- **理论基础**: Porter竞争优势 / Buffett护城河 / Hamilton Helmer 7 Powers

---

## Purpose

评估公司竞争护城河（Moat）的强度和持久性。

**输出**: Moat_Score (0-100) + 护城河类型 + 强度评级 + 反证条件

**适用**: 投资决策中判断公司是否具有持久竞争优势

---

## 6类护城河 (v1.3扩展)

| 类型 | 核心机制 | 关键指标 | 典型案例 |
|------|----------|----------|----------|
| **转换成本** | 客户离开代价高 | Churn<5%, NRR>110% | Salesforce, SAP |
| **网络效应** | 用户越多价值越大 | 用户增速, 匹配效率 | Meta, 美团 |
| **AI护城河** [v1.3] | 模型+数据+推理成本 | 基准领先, 数据独占 | Google, OpenAI |
| **基础设施护城河** [v1.3] | 物理/数字资产难复制 | CapEx壁垒, 专有硬件 | AWS, TSMC |
| **监管护城河** [v1.3] | 牌照/合规/政策壁垒 | 准入难度, 合规成本 | 金融牌照, 电信 |
| **成本优势** | 规模/流程/地理成本低 | 毛利率vs同业 | Costco, 比亚迪 |

---

## 7步工作流

### S1: 护城河声明识别
```yaml
input:
  moat_claim: "一句话护城河假设"
  moat_types: [转换成本, 网络效应, AI, 基础设施, 监管, 成本, 复合]
output:
  primary_moat: "主要护城河类型"
  secondary_moat: "次要护城河类型(如有)"
```

### S2: 领先信号收集

| 护城河类型 | 领先信号 | 观测方式 |
|-----------|---------|---------|
| 转换成本 | 多年期合同/深度集成/数据锁定 | 合同期限, API调用量 |
| 网络效应 | 用户增速/高频互动/生态扩张 | MAU, 开发者数 |
| AI护城河 | 模型领先/数据优势/推理成本↓ | MMLU分数, $/百万token |
| 基础设施 | 专有硬件/数据中心规模/CapEx壁垒 | 节点数, 累计投资 |
| 监管护城河 | 独家牌照/合规成本壁垒 | 牌照数, 合规团队规模 |

### S3: 滞后确认收集

| 护城河类型 | 滞后确认 | 优秀阈值 |
|-----------|---------|---------|
| 转换成本 | 续约率/Churn/NRR/提价能力 | >90%/<5%/>110%/能提价 |
| 网络效应 | CAC↓/竞品失败/ARPU↑ | 随规模下降/高投入无效 |
| AI护城河 | 模型差距/市场份额/毛利率 | 差距扩大/份额↑/毛利>60% |
| 基础设施 | 进入者失败/利用率/折旧覆盖 | 高门槛/利用率>70% |
| 监管护城河 | 新进入者数/政策稳定性 | 进入者少/政策稳定 |

### S4: 指标量化

```yaml
switching_cost_metrics:
  churn_rate: {formula: "流失客户/期初客户", threshold: "<5%"}
  nrr: {formula: "(期初+扩展-收缩-流失)/期初", threshold: ">110%"}
  contract_length: {formula: "加权平均合同年限", threshold: ">2年"}

network_effect_metrics:
  user_growth: {formula: "MAU YoY%", threshold: ">20%"}
  engagement: {formula: "DAU/MAU", threshold: ">50%"}
  cac_trend: {formula: "CAC vs 规模", threshold: "负相关"}

ai_moat_metrics: # v1.3
  model_benchmark: {formula: "MMLU/HumanEval排名", threshold: "Top 3"}
  data_uniqueness: {formula: "独占数据源数", threshold: ">3"}
  inference_cost: {formula: "$/百万token", threshold: "行业最低25%"}
```

### S5: 护城河强度评分

| 维度 | 权重 | +2 | +1 | 0 | -1 | -2 |
|------|------|----|----|---|----|----|
| 持久性 | 25% | >10年 | 5-10年 | 3-5年 | 1-3年 | <1年 |
| 可量化 | 20% | 数据强支撑 | 部分支撑 | 中性 | 数据不足 | 数据反驳 |
| 可复制性 | 20% | 几乎不可复制 | 难复制 | 可复制 | 易复制 | 已被复制 |
| 定价权 | 20% | 提价无流失 | 可小幅提价 | 不能提价 | 被迫降价 | 价格战 |
| 扩展性 | 15% | 跨品类/地区 | 单品类强 | 中性 | 难扩展 | 萎缩中 |

**公式**: `Moat_Score = Σ(维度分数×权重)×25+50`

### S6: 护城河侵蚀检测

```yaml
erosion_signals:
  - signal: "新进入者获客成本下降"
    implication: "转换成本/网络效应减弱"
  - signal: "NRR连续下降"
    implication: "客户价值萎缩"
  - signal: "替代品渗透率上升"
    implication: "护城河被绕过"
  - signal: "监管政策转向"
    implication: "监管护城河削弱"
```

### S7: 输出护城河卡片

```yaml
moat_card:
  company: "公司名"
  moat_types: ["主护城河", "次护城河"]
  moat_score: 0-100
  strength: "强/中/弱"
  durability: "X年"
  key_evidence: ["证据1", "证据2"]
  erosion_risks: ["风险1", "风险2"]
  falsifiers: ["如果X发生，护城河失效"]
```

---

## Output Contract

```yaml
moat_evaluation_output:
  moat_score: {total: 0-100, breakdown: {持久性, 可量化, 可复制性, 定价权, 扩展性}}
  primary_moat: "护城河类型"
  secondary_moat: "次护城河(如有)"
  strength_rating: "强/中/弱"
  durability_years: "预计持续年数"
  leading_signals: [{signal, strength}]
  lagging_confirmations: [{metric, value, benchmark}]
  erosion_risks: ["风险列表"]
  falsifiers: ["证伪条件"]
```

---

## Kill Switches

| ID | 条件 | 动作 |
|----|------|------|
| KS-MOAT-01 | NRR连续3季度<100% | 下调护城河评分 |
| KS-MOAT-02 | 主要客户流失>10%/年 | 重评转换成本 |
| KS-MOAT-03 | 新进入者市场份额>10% | 重评竞争壁垒 |
| KS-MOAT-04 | AI基准落后Top3 | 重评AI护城河(v1.3) |
| KS-MOAT-05 | 监管政策重大变化 | 重评监管护城河(v1.3) |

---

## Red Flags

| 红旗 | 说明 |
|------|------|
| 🚩 伪护城河 | 仅有规模无真正壁垒 |
| 🚩 护城河侵蚀 | 关键指标持续恶化 |
| 🚩 监管依赖 | 护城河完全依赖政策保护 |
| 🚩 单点依赖 | 护城河依赖单一因素(单客户/单技术) |
| 🚩 数据不可验 | 护城河声明缺乏可量化证据 |

---

## v2.0 Compliance

| 模块 | 状态 |
|------|------|
| Scoring System | ✅ 5维度+权重 |
| Kill Switches | ✅ 5条 |
| Red Flags | ✅ 5个 |
| Output Contract | ✅ |

---

## Version History

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.3 | 2026-01-27 | 新增AI/基础设施/监管护城河，压缩至~280行 |
| 1.2 | - | 原版本 |
