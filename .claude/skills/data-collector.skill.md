---
name: data-collector
description: 生态科技实时数据采集器。用WebSearch自动获取公司财务、行业、政策、碳价等实时数据，为5个分析skills提供标准化输入数据层。
---

# 生态科技数据采集器 v1.0

## 触发条件

在eco-tech-orchestrator启动后、skills执行前自动运行，为所有skills提供统一数据基础。

## 数据采集矩阵

### Layer 1: 公司基本面（必须）

```yaml
采集项目:
  财务数据:
    queries:
      - "{公司名} {股票代码} latest quarterly earnings revenue profit"
      - "{公司名} annual report 2025 financial highlights"
      - "{公司名} market cap PE ratio valuation"
    输出字段:
      - 营收(季度/年度) + 增长率
      - 净利润 + 利润率
      - 市值 + PE + PB
      - 负债率 + 现金流
      - CAPEX + 研发投入
    质量标准: A级(财报) / B级(第三方数据库)

  业务数据:
    queries:
      - "{公司名} installed capacity GW MW production"
      - "{公司名} project pipeline backlog"
      - "{公司名} technology efficiency latest"
    输出字段:
      - 装机容量/产能
      - 在建项目管线
      - 核心技术参数
      - 市场份额
    质量标准: A级(公司披露) / B级(行业报告)
```

### Layer 2: 行业数据（必须）

```yaml
采集项目:
  行业指标:
    queries:
      - "{子行业} LCOE cost trend 2025 2026"
      - "{子行业} global installed capacity growth"
      - "{子行业} supply chain pricing"
    输出字段:
      - 行业LCOE趋势
      - 全球装机增速
      - 供应链价格(硅料/锂/稀土等)
      - 行业集中度

  竞争格局:
    queries:
      - "{子行业} market share top companies 2025"
      - "{公司名} vs {竞品} comparison"
    输出字段:
      - TOP10市占率
      - 主要竞品对比
      - 技术差异化
```

### Layer 3: 政策与碳价（必须）

```yaml
采集项目:
  政策动态:
    queries:
      - "{公司所在国} renewable energy policy 2025 2026 subsidy"
      - "IRA Inflation Reduction Act solar wind update"
      - "EU green deal CBAM carbon border latest"
      - "中国 新能源 补贴 政策 最新"
    输出字段:
      - 各国补贴政策现状+变化
      - 碳交易政策进展
      - 贸易壁垒(CBAM等)
      - 监管合规要求

  碳价数据:
    queries:
      - "EU ETS carbon price today"
      - "China carbon market price latest"
      - "voluntary carbon credit price CCER"
    输出字段:
      - EU碳价(€/tCO2)
      - 中国碳价(¥/tCO2)
      - 自愿碳市场价格
      - 碳价趋势(3个月/12个月)
```

### Layer 4: ESG与绿色金融（按需）

```yaml
采集项目:
  ESG评级:
    queries:
      - "{公司名} ESG rating MSCI S&P"
      - "{公司名} sustainability report latest"
    输出字段:
      - MSCI ESG评级
      - S&P ESG评分
      - 中证ESG评级(如适用)

  绿色融资:
    queries:
      - "{公司名} green bond issuance"
      - "{子行业} green finance trend"
    输出字段:
      - 绿色债券发行记录
      - ESG基金持仓
      - 融资成本对比
```

## 输出格式

### 标准化数据包

```yaml
data_package:
  meta:
    company: "{公司名}"
    ticker: "{代码}"
    sub_industry: "{子行业}"
    collection_date: "{日期}"
    data_freshness: "实时/24h内/1周内"

  layer1_fundamentals:
    financials:
      revenue_ttm: {value, unit, quality, source}
      net_income_ttm: {value, unit, quality, source}
      market_cap: {value, unit, quality, source}
      pe_ratio: {value, quality, source}
      debt_equity: {value, quality, source}
      capex_annual: {value, unit, quality, source}
      rd_spending: {value, unit, quality, source}
    business:
      capacity: {value, unit, quality, source}
      pipeline: {value, unit, quality, source}
      market_share: {value, quality, source}
      key_tech_metrics: [{name, value, unit, quality, source}]

  layer2_industry:
    lcoe_trend: {current, yoy_change, quality, source}
    global_capacity_growth: {value, quality, source}
    supply_chain_prices: [{item, price, trend, quality, source}]
    competition: [{company, share, comparison, source}]

  layer3_policy_carbon:
    policies: [{region, type, status, impact, quality, source}]
    carbon_prices:
      eu_ets: {price, currency, trend, quality}
      china: {price, currency, trend, quality}
      voluntary: {price, range, quality}
    trade_barriers: [{type, status, impact, quality}]

  layer4_esg_finance:
    esg_ratings: [{agency, rating, trend, source}]
    green_bonds: [{amount, rate, date, source}]
    esg_fund_holdings: {percentage, trend, source}

  data_quality_summary:
    a_grade_pct: X%
    b_grade_pct: X%
    c_grade_pct: X%
    gaps: ["缺失数据项列表"]
    warnings: ["数据质量问题"]
```

## 采集策略

```yaml
效率优化:
  - 并行执行4个Layer的WebSearch（每Layer独立）
  - 优先采集Layer 1+2（skills核心依赖）
  - Layer 3+4可在Wave 1 agents运行期间异步采集

失败处理:
  - 单个query失败→重试1次→标记为缺失
  - 整个Layer失败→降级到估算数据+标记[D级]
  - 关键数据缺失→警告用户并建议补充

数据冲突:
  - 多源数据冲突→取最权威源+标注分歧
  - 财报数据优先于第三方估算
  - 最新数据优先于历史数据
```

## 与编排器集成

```yaml
执行时机:
  深度分析: 编排器Step 1(子行业识别)后立即启动
  快速扫描: 仅采集Layer 1核心字段(3分钟)

数据分发:
  lcoe-analyzer: layer1.business + layer2.lcoe_trend + layer3.carbon_prices
  tech-maturity: layer1.business.key_tech_metrics + layer2.competition
  carbon-footprint: layer1.financials + layer3.carbon_prices + layer4.esg
  policy-impact: layer3.policies + layer3.trade_barriers + layer1.financials
  green-finance: layer4全部 + layer1.financials + layer3.carbon_prices
```
