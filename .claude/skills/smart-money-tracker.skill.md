# Smart Money Tracker Skill v1.0
# 聪明钱追踪分析引擎 - 顶级投资者行为解码与投资逻辑还原系统

## Description
聪明钱追踪超级Agent。专门解码巴菲特、桥水、挪威主权基金等顶级投资者的投资逻辑，分析不同类型资本的配置行为差异，量化机构共识度，构建投资者反应函数模型。涵盖：13F报告解读、投资逻辑还原、资本分类行为研究、共识度量化计算、反向工程投资策略。

## Activation
- 用户需要分析顶级投资者的投资逻辑
- 用户需要评估机构投资者对某标的的共识度
- 用户需要预测不同消息对各类投资者的影响
- 用户需要学习明星投资者的投资策略
- 用户提及"巴菲特"、"机构投资者"、"聪明钱"、"共识"等关键词
- 用户需要评估机构投资者行为对股价的影响

---

# 第一部分: 顶级投资者分类系统

## 投资者分类框架

### Tier 1: 传奇级投资者 (影响权重40%)
通过 `src/analyzers/legendary-investors.ts` 跟踪:

**价值投资大师**:
```
Warren Buffett / Berkshire Hathaway:
- 投资哲学: 长期价值投资 + 护城河理论
- 持有期限: 5-10年+ (Forever股票)
- 选股标准: ROE>15% + 定价权 + 管理层优秀
- 风险偏好: 低风险偏好, 注重确定性
- 市场影响: 极高 (巴菲特效应)

Charlie Munger / Daily Journal:
- 投资哲学: 多元化思维 + 集中投资
- 持有期限: 超长期 (10年+)
- 选股标准: 伟大企业 + 合理价格
- 独特视角: 心理学 + 多学科思维

Seth Klarman / Baupost Group:
- 投资哲学: 价值投资 + 绝对收益
- 持有期限: 3-7年
- 选股标准: 安全边际 + 催化剂
- 风险控制: 极度谨慎 + 现金保护
```

**量化对冲基金大师**:
```
Ray Dalio / Bridgewater:
- 投资哲学: 全天候配置 + 宏观对冲
- 持有期限: 1-3年 (策略导向)
- 选股标准: 宏观一致性 + 风险平价
- 独特方法: 经济机器 + 原则导向

James Simons / Renaissance Technologies:
- 投资哲学: 纯数学量化 + 高频交易
- 持有期限: 分钟级到月级
- 选股标准: 统计套利 + 模式识别
- 技术优势: 数据挖掘 + 机器学习
```

### Tier 2: 主权基金 (影响权重25%)
通过 `src/analyzers/sovereign-funds.ts` 跟踪:

**北欧模式 (长期价值)**:
```
挪威政府全球养老基金 (GPFG):
- 资金规模: $1.4万亿
- 投资期限: 50-100年超长期
- 配置策略: 全球多元化 + ESG导向
- 权益配置: 70% (目标配比)
- 特色: 透明度极高 + 社会责任

瑞典养老基金AP:
- 资金规模: $1800亿
- 投资策略: 风险因子投资
- 配置偏好: 另类投资 + 可持续发展
```

**亚洲模式 (战略配置)**:
```
新加坡政投公司 (GIC):
- 资金规模: $7000亿+
- 投资策略: 长期价值 + 地缘优势
- 配置偏好: 亚洲科技 + 基础设施
- 投资期限: 20年+ 超长期视角

新加坡淡马锡 (Temasek):
- 资金规模: $3800亿
- 投资策略: 主动管理 + 集中投资
- 配置偏好: 科技创新 + 可持续发展
- 地域重点: 亚洲 + 新兴市场
```

### Tier 3: 专业投资机构 (影响权重20%)
通过 `src/analyzers/institutional-funds.ts` 跟踪:

**主动管理基金**:
```
Fidelity Investments:
- 管理规模: $4.5万亿
- 投资风格: 成长投资 + 主题投资
- 研究优势: 深度调研 + 行业专精
- 持股特点: 主动集中 + 长期持有

Capital Group:
- 管理规模: $2.8万亿
- 投资风格: 全球价值 + 多重投资
- 独特方法: 多基金经理制
- 风险控制: 分散投资 + 自下而上

T. Rowe Price:
- 管理规模: $1.5万亿
- 投资风格: 成长投资 + 生命周期
- 研究特色: 基本面研究 + 长期跟踪
```

**指数基金巨头**:
```
Vanguard:
- 管理规模: $8.5万亿
- 投资策略: 被动投资 + 成本控制
- 配置特点: 指数跟踪 + 长期持有
- 市场影响: 机械化买入 + 低换手率

BlackRock:
- 管理规模: $10.5万亿
- 投资策略: 指数 + 主动混合
- 技术优势: Aladdin系统 + 风险管理
- 产品线: ETF + 主动基金全覆盖
```

### Tier 4: 新兴力量 (影响权重15%)
**科技投资专家**:
```
ARK Investment Management:
- 投资主题: 颠覆性创新 + 技术变革
- 持股风格: 高度集中 + 高换手率
- 研究方法: 技术分析 + 趋势预测
- 风险特征: 高波动 + 高收益潜力

Tiger Global:
- 投资策略: 科技成长 + 全球配置
- 投资阶段: 公开市场 + 私募股权
- 地域重点: 美国 + 中国 + 新兴市场
```

---

# 第二部分: 投资逻辑解码引擎

## 解码框架1: 反向工程投资策略

### 巴菲特投资逻辑还原
通过 `src/decoders/buffett-logic.ts` 分析:

**护城河评估算法**:
```javascript
const buffettMoatAnalysis = (company) => {
  const moatMetrics = {
    // 1. 经济护城河评分
    economicMoat: {
      pricingPower: analyzePricingPower(company.pricing_history),
      switchingCosts: evaluateSwitchingCosts(company.customer_data),
      networkEffect: calculateNetworkEffect(company.platform_metrics),
      intangibleAssets: assessIntangibleAssets(company.brand_patents),
      costAdvantage: measureCostAdvantage(company.cost_structure)
    },

    // 2. 财务质量评分
    financialQuality: {
      roe: company.financials.roe,
      roic: calculateROIC(company.financials),
      debtRatio: company.financials.debt_ratio,
      fcfGrowth: company.financials.fcf_growth_5y
    },

    // 3. 管理层质量评分
    managementQuality: {
      capital_allocation: evaluateCapitalAllocation(company.management),
      transparency: assessTransparency(company.communications),
      shareholder_orientation: measureShareholderFocus(company.policies)
    }
  };

  // 巴菲特评分算法
  const buffettScore = calculateBuffettScore(moatMetrics);
  const targetPriceRange = estimateBuffettTargetPrice(company, buffettScore);

  return {
    score: buffettScore,
    moat_strength: categorizeBuffettMoat(buffettScore),
    investment_probability: calculateInvestmentProbability(buffettScore),
    price_target: targetPriceRange,
    hold_period: estimateBuffettHoldPeriod(company.sector)
  };
};
```

### 主权基金配置逻辑分析
```javascript
const sovereignFundLogic = (fund, holding) => {
  const allocationFactors = {
    // 战略配置因素
    strategic: {
      gdp_weight: holding.country_gdp_weight,
      market_cap_weight: holding.global_market_cap_weight,
      strategic_importance: assessStrategicImportance(holding.sector),
      geopolitical_value: evaluateGeopoliticalValue(holding.location)
    },

    // ESG考量因素
    esg: {
      environmental_score: holding.esg_ratings.environmental,
      social_score: holding.esg_ratings.social,
      governance_score: holding.esg_ratings.governance,
      sustainable_development: assessSDGAlignment(holding.business)
    },

    // 风险管理因素
    risk_management: {
      correlation_with_oil: calculateOilCorrelation(holding), // 挪威特有
      currency_hedging: assessCurrencyRisk(holding),
      liquidity_requirements: evaluateLiquidity(holding),
      concentration_limits: checkConcentrationLimits(fund, holding)
    }
  };

  return {
    allocation_logic: identifyPrimaryAllocationReason(allocationFactors),
    expected_holding_period: estimateHoldingPeriod(fund.mandate),
    adjustment_triggers: defineAdjustmentTriggers(allocationFactors),
    confidence_level: calculateAllocationConfidence(allocationFactors)
  };
};
```

## 解码框架2: 机构行为预测模型

### 不同消息类型的机构反应函数
```javascript
const institutionalReactionFunction = (news, investorTypes) => {
  const reactionMatrix = {
    // 财报超预期
    earnings_beat: {
      value_investors: { reaction: 0.05, time_lag: 1 }, // +5%, 1天后反应
      growth_funds: { reaction: 0.15, time_lag: 0 },   // +15%, 当天反应
      quant_funds: { reaction: 0.25, time_lag: 0 },    // +25%, 算法交易
      sovereign_funds: { reaction: 0.02, time_lag: 7 } // +2%, 1周后反应
    },

    // 技术突破
    tech_breakthrough: {
      value_investors: { reaction: 0.02, time_lag: 30 }, // +2%, 1月后确认
      growth_funds: { reaction: 0.20, time_lag: 1 },     // +20%, 次日追涨
      ark_funds: { reaction: 0.35, time_lag: 0 },        // +35%, 当天买入
      sovereign_funds: { reaction: 0.03, time_lag: 14 }  // +3%, 2周后配置
    },

    // 地缘政治风险
    geopolitical_risk: {
      value_investors: { reaction: -0.08, time_lag: 2 },  // -8%, 2天评估期
      growth_funds: { reaction: -0.18, time_lag: 0 },     // -18%, 立即减仓
      hedge_funds: { reaction: -0.30, time_lag: 0 },      // -30%, 算法止损
      sovereign_funds: { reaction: -0.05, time_lag: 7 }   // -5%, 1周观察期
    }
  };

  return calculateAggregateMarketImpact(reactionMatrix[news.type], investorTypes);
};
```

---

# 第三部分: 机构共识度量化系统

## 算法1: 共识度计算引擎

### 权重分配方法论
通过 `src/algorithms/consensus-calculation.ts` 计算:

```javascript
const calculateInstitutionalConsensus = (holdings) => {
  const investorWeights = {
    // 基于影响力的权重分配
    legendary_investors: 0.35, // 巴菲特等传奇投资者
    sovereign_funds: 0.25,     // 主权基金
    active_managers: 0.20,     // 主动管理基金
    passive_funds: 0.15,       // 指数基金
    hedge_funds: 0.05          // 对冲基金
  };

  const consensusMetrics = holdings.map(holding => {
    return {
      investor_type: holding.type,
      sentiment_score: analyzeSentimentFromActions(holding),
      confidence_level: assessConfidenceFromSize(holding),
      weight: investorWeights[holding.type]
    };
  });

  // 加权共识度计算
  const weightedConsensus = consensusMetrics.reduce((consensus, metric) => {
    return consensus + (metric.sentiment_score * metric.weight);
  }, 0);

  // 共识强度评估
  const consensusStrength = assessConsensusStrength(consensusMetrics);

  return {
    consensus_score: weightedConsensus, // 0-100分
    strength_level: consensusStrength,  // weak/moderate/strong/very_strong
    participant_count: consensusMetrics.length,
    key_supporters: identifyKeySupporter(consensusMetrics),
    key_skeptics: identifyKeySKeptics(consensusMetrics)
  };
};
```

### 共识度历史验证模型
```javascript
const consensusAccuracyBacktest = (historicalData) => {
  const predictions = historicalData.map(period => {
    const consensus = calculateInstitutionalConsensus(period.holdings);
    const actual_performance = period.subsequent_returns;

    return {
      consensus_score: consensus.consensus_score,
      predicted_direction: consensus.consensus_score > 50 ? 'bullish' : 'bearish',
      actual_return: actual_performance,
      prediction_accuracy: evaluatePredictionAccuracy(consensus, actual_performance)
    };
  });

  return {
    overall_accuracy: calculateOverallAccuracy(predictions),
    best_performing_threshold: findOptimalThreshold(predictions),
    sector_specific_accuracy: analyzeBySector(predictions),
    time_horizon_analysis: analyzeByTimeHorizon(predictions)
  };
};
```

## 算法2: 分歧度分析框架

### 机构分歧量化
```javascript
const calculateInstitutionalDivergence = (holdings) => {
  // 计算持仓方向分歧
  const positionDivergence = {
    increasing: holdings.filter(h => h.change > 0.02).length,
    decreasing: holdings.filter(h => h.change < -0.02).length,
    maintaining: holdings.filter(h => Math.abs(h.change) <= 0.02).length
  };

  // 计算目标价分歧
  const targetPriceDivergence = {
    standard_deviation: calculateStandardDeviation(holdings.map(h => h.target_price)),
    coefficient_variation: calculateCoefficientVariation(holdings.map(h => h.target_price)),
    range_width: Math.max(...holdings.map(h => h.target_price)) -
                 Math.min(...holdings.map(h => h.target_price))
  };

  // 分歧度综合评分
  const divergenceScore = {
    position_divergence: calculatePositionDivergenceScore(positionDivergence),
    valuation_divergence: calculateValuationDivergenceScore(targetPriceDivergence),
    overall_divergence: calculateOverallDivergence(positionDivergence, targetPriceDivergence)
  };

  return {
    divergence_level: categorizeDivergenceLevel(divergenceScore.overall_divergence),
    market_implications: analyzeDivergenceImplications(divergenceScore),
    resolution_probability: predictDivergenceResolution(holdings, divergenceScore),
    trading_opportunity: assessTradingOpportunity(divergenceScore)
  };
};
```

---

# 第四部分: 投资者行为差异分析

## 分析维度1: 时间偏好差异

### 投资期限分布模型
通过 `src/analyzers/time-preference.ts` 分析:

```
投资期限分类:
- 超短期 (< 1个月): 高频交易、事件驱动
- 短期 (1-6个月): 动量交易、季报驱动
- 中期 (6个月-3年): 周期投资、主题投资
- 长期 (3-10年): 价值投资、成长投资
- 超长期 (10年+): 养老金、主权基金

不同期限的行为特征:
```

| 投资期限 | 代表投资者 | 决策因素 | 风险偏好 | 交易频率 |
|---------|-----------|---------|----------|---------|
| **超短期** | 量化对冲基金 | 技术信号+算法 | 低风险(高频对冲) | 秒/分钟级 |
| **短期** | 交易型对冲基金 | 事件催化剂 | 高风险 | 日/周级 |
| **中期** | 主动管理基金 | 基本面+估值 | 中等风险 | 月/季度级 |
| **长期** | 价值投资者 | 护城河+管理层 | 低-中风险 | 年级 |
| **超长期** | 主权基金 | 战略配置+ESG | 极低风险 | 5-10年级 |

### 不同期限投资者的信息敏感度
```javascript
const informationSensitivityAnalysis = (news, timeHorizon) => {
  const sensitivityMatrix = {
    ultra_short: {
      technical_signals: 0.9,    // 技术信号极度敏感
      earnings: 0.3,             // 财报相对不敏感
      long_term_trends: 0.1      // 长期趋势基本忽略
    },
    short_term: {
      earnings: 0.8,             // 财报高度敏感
      guidance: 0.9,             // 指引极度敏感
      peer_comparison: 0.7       // 同业对比敏感
    },
    long_term: {
      business_model: 0.9,       // 商业模式极度敏感
      management_change: 0.8,    // 管理层变化高度敏感
      industry_disruption: 0.9   // 行业颠覆极度敏感
    }
  };

  return calculateAdjustedImpact(news, sensitivityMatrix[timeHorizon]);
};
```

## 分析维度2: 风险偏好差异

### 风险偏好分类模型
```javascript
const riskProfileAnalysis = (investor) => {
  const riskMetrics = {
    volatility_tolerance: calculateVolatilityTolerance(investor.portfolio),
    max_drawdown_acceptance: assessDrawdownTolerance(investor.history),
    concentration_preference: analyzeConcentration(investor.holdings),
    leverage_usage: evaluateLeverageUsage(investor.positions)
  };

  const riskProfile = {
    conservative: riskMetrics.volatility_tolerance < 0.15 &&
                  riskMetrics.concentration_preference < 0.05,
    moderate: riskMetrics.volatility_tolerance < 0.25 &&
              riskMetrics.concentration_preference < 0.10,
    aggressive: riskMetrics.volatility_tolerance > 0.25 ||
                riskMetrics.concentration_preference > 0.10
  };

  return {
    risk_category: identifyRiskCategory(riskProfile),
    risk_score: calculateRiskScore(riskMetrics),
    position_sizing_behavior: predictPositionSizing(riskMetrics),
    stress_reaction: predictStressReaction(riskMetrics)
  };
};
```

---

# 第五部分: 投资信号生成系统

## 信号类型1: 聪明钱流向信号

### 资金流向追踪算法
通过 `src/signals/smart-money-flow.ts` 生成:

```javascript
const smartMoneyFlowSignal = (recentTransactions) => {
  const flowAnalysis = {
    // Tier 1投资者动向 (最高权重)
    legendary_flow: analyzeFlowByTier(recentTransactions, 'legendary'),

    // 主权基金动向
    sovereign_flow: analyzeFlowByTier(recentTransactions, 'sovereign'),

    // 集中度变化
    concentration_change: analyzeConcentrationChange(recentTransactions),

    // 新进入者分析
    new_entrants: analyzeNewEntrants(recentTransactions)
  };

  // 信号强度计算
  const signalStrength = {
    direction: determineFlowDirection(flowAnalysis),
    intensity: calculateFlowIntensity(flowAnalysis),
    confidence: assessSignalConfidence(flowAnalysis),
    timeframe: estimateSignalDuration(flowAnalysis)
  };

  return {
    signal_type: 'smart_money_flow',
    direction: signalStrength.direction, // inflow/outflow/neutral
    strength: signalStrength.intensity,  // 0-100
    confidence: signalStrength.confidence, // 0-100
    expected_duration: signalStrength.timeframe, // days
    key_drivers: identifyKeyDrivers(flowAnalysis),
    recommended_action: generateRecommendation(signalStrength)
  };
};
```

## 信号类型2: 共识度拐点信号

### 共识度变化追踪
```javascript
const consensusInflectionSignal = (consensusHistory) => {
  const inflectionAnalysis = {
    // 共识度趋势分析
    consensus_trend: analyzeTrend(consensusHistory.map(h => h.consensus_score)),

    // 加速度分析
    acceleration: calculateAcceleration(consensusHistory),

    // 分歧度变化
    divergence_change: analyzeDivergenceChange(consensusHistory),

    // 参与者结构变化
    participant_change: analyzeParticipantChange(consensusHistory)
  };

  // 拐点检测算法
  const inflectionDetection = {
    is_inflection_point: detectInflectionPoint(inflectionAnalysis),
    inflection_type: classifyInflectionType(inflectionAnalysis), // consensus_building/consensus_breakdown
    magnitude: calculateInflectionMagnitude(inflectionAnalysis),
    sustainability: assessInflectionSustainability(inflectionAnalysis)
  };

  return {
    signal_type: 'consensus_inflection',
    inflection_detected: inflectionDetection.is_inflection_point,
    inflection_type: inflectionDetection.inflection_type,
    signal_strength: inflectionDetection.magnitude,
    sustainability_score: inflectionDetection.sustainability,
    market_impact_prediction: predictMarketImpact(inflectionDetection),
    recommended_strategy: generateInflectionStrategy(inflectionDetection)
  };
};
```

---

# 第六部分: 投资策略学习系统

## 学习框架1: 投资大师策略复制

### 巴菲特策略模拟器
```javascript
const buffettStrategySimulator = (universe, timeframe) => {
  const buffettCriteria = {
    // 基本筛选条件
    basic_screen: {
      roe: { min: 0.15, weight: 0.2 },
      debt_ratio: { max: 0.3, weight: 0.15 },
      revenue_growth: { min: 0.05, weight: 0.1 },
      market_cap: { min: 10000000000, weight: 0.05 } // 100亿美元以上
    },

    // 护城河评估
    moat_assessment: {
      brand_strength: { min: 0.7, weight: 0.2 },
      switching_costs: { min: 0.6, weight: 0.15 },
      pricing_power: { min: 0.7, weight: 0.2 },
      regulatory_protection: { weight: 0.1 }
    },

    // 管理层质量
    management_quality: {
      capital_allocation: { min: 0.8, weight: 0.15 },
      transparency: { min: 0.7, weight: 0.1 },
      shareholder_focus: { min: 0.8, weight: 0.15 }
    },

    // 估值合理性
    valuation: {
      pe_ratio: { max: 25, weight: 0.15 },
      price_to_book: { max: 3, weight: 0.1 },
      enterprise_yield: { min: 0.06, weight: 0.2 }
    }
  };

  // 策略执行
  const portfolio = universe.filter(stock =>
    passesBuffettScreen(stock, buffettCriteria)
  ).sort((a, b) =>
    calculateBuffettScore(b, buffettCriteria) - calculateBuffettScore(a, buffettCriteria)
  ).slice(0, 10); // Top 10选择

  return {
    selected_stocks: portfolio,
    position_sizes: calculateBuffettPositionSizes(portfolio),
    expected_holding_period: estimateHoldingPeriod(portfolio),
    risk_assessment: assessPortfolioRisk(portfolio),
    backtesting_results: backtestBuffettStrategy(portfolio, timeframe)
  };
};
```

### 主权基金策略学习
```javascript
const sovereignFundStrategyLearning = (fund, allocation_history) => {
  const strategyPatterns = {
    // 配置规律识别
    allocation_patterns: identifyAllocationPatterns(allocation_history),

    // 重平衡时机
    rebalancing_triggers: analyzeRebalancingTriggers(allocation_history),

    // 行业偏好演变
    sector_preferences: analyzeSectorEvolution(allocation_history),

    // 地域配置变化
    geographic_allocation: analyzeGeographicTrends(allocation_history)
  };

  // 策略提取
  const learnedStrategy = {
    core_principles: extractCorePrinciples(strategyPatterns),
    decision_framework: buildDecisionFramework(strategyPatterns),
    risk_management: identifyRiskManagement(strategyPatterns),
    execution_methodology: defineExecutionMethod(strategyPatterns)
  };

  return {
    strategy_summary: learnedStrategy,
    applicability_score: assessApplicability(learnedStrategy),
    implementation_guide: createImplementationGuide(learnedStrategy),
    performance_expectations: predictPerformance(learnedStrategy)
  };
};
```

---

# 第七部分: 输出标准化格式

## 聪明钱分析报告模板

### 基础信息
```markdown
## 聪明钱追踪分析

**分析标的**: [公司名称]
**分析时间**: [YYYY-MM-DD]
**跟踪期间**: [起始-结束日期]
**重点投资者**: [Top 5投资者名单]

### 顶级投资者持仓概览

#### Tier 1 传奇投资者
| 投资者 | 持股比例 | 变动 | 平均成本 | 浮盈状态 | 投资逻辑 |
|--------|---------|------|----------|---------|----------|
| Berkshire | X.X% | +/-X.X% | $XXX | +/-XX% | [核心逻辑] |
| [其他] | X.X% | +/-X.X% | $XXX | +/-XX% | [核心逻辑] |

#### 主权基金配置
[详细配置表格]

### 共识度分析
**整体共识度**: XX/100 ([强度等级])
**参与机构数**: XX家
**共识强度**: [Strong/Moderate/Weak]
**分歧点**: [主要分歧领域]
```

### 投资逻辑解码
```markdown
### 巴菲特投资逻辑分析

#### 护城河评估
- **技术护城河**: XX/100 ([评估依据])
- **成本护城河**: XX/100 ([评估依据])
- **客户护城河**: XX/100 ([评估依据])
- **规模护城河**: XX/100 ([评估依据])

**护城河综合评分**: XX/100
**巴菲特投资概率**: XX% ([基于历史模式])

#### 主权基金配置逻辑
- **战略配置权重**: XX% ([配置原因])
- **ESG评分影响**: XX分 ([具体考量])
- **地缘政治考量**: [风险/机会分析]
- **预期持有期**: XX年 ([基于基金特征])

### 机构行为预测
**下一期预期变化**:
- 增持概率: XX%
- 减持概率: XX%
- 维持概率: XX%

**关键触发因素**: [具体事件列表]
```

### 投资信号生成
```markdown
### 聪明钱信号

#### 当前信号状态
🟢 **资金流向**: [流入/流出/中性] (强度: XX/100)
🟡 **共识变化**: [建立/分化/稳定] (变化率: XX%)
🔴 **拐点信号**: [检测到/未检测] (概率: XX%)

#### 投资建议
**基于聪明钱分析**:
- 建议策略: [跟随/反向/观望]
- 时间窗口: [XX个月]
- 风险提示: [具体风险点]
- 退出条件: [明确信号]

### 学习价值
**可学习策略要素**:
1. [策略要素1]: [具体学习点]
2. [策略要素2]: [具体学习点]

**实施建议**:
- 适用投资者类型: [具体描述]
- 资金门槛: [最低要求]
- 执行复杂度: [简单/中等/复杂]
```

---

# 第八部分: 数据更新与质量控制

## 数据源管理

### 13F报告自动解析
通过 `src/data-sources/sec-filings.ts` 处理:
```javascript
const parse13FReports = async (filings) => {
  const parsedData = await Promise.all(filings.map(async filing => {
    return {
      investor_name: extractInvestorName(filing),
      filing_date: extractFilingDate(filing),
      positions: parsePositions(filing),
      changes: calculateChanges(filing, previousFiling),
      portfolio_value: calculateTotalValue(filing),
      concentration: calculateConcentration(filing)
    };
  }));

  // 数据验证
  const validatedData = parsedData.filter(data => validateData(data));

  // 异常检测
  const anomalies = detectAnomalies(validatedData);

  return {
    parsed_filings: validatedData,
    data_quality_score: calculateQualityScore(validatedData),
    detected_anomalies: anomalies,
    update_timestamp: new Date()
  };
};
```

### 实时持仓追踪
```javascript
const realTimePositionTracking = () => {
  const trackingSources = [
    'sec_filings',      // 季度13F报告
    'insider_trading',  // 内幕交易披露
    'block_trades',     // 大宗交易记录
    'proxy_statements', // 股东大会材料
    'earnings_calls'    // 财报电话会议
  ];

  return trackingSources.map(source => ({
    source: source,
    update_frequency: getUpdateFrequency(source),
    last_update: getLastUpdate(source),
    data_reliability: assessReliability(source),
    processing_method: getProcessingMethod(source)
  }));
};
```

## 质量控制机制

### 预测准确性追踪
文件: `data/smart-money-predictions/accuracy-log.json`

```json
{
  "prediction_type": "institutional_consensus",
  "predictions": [
    {
      "date": "2024-12-15",
      "prediction": "88.4%共识度，预期上涨15-25%",
      "actual": "3个月后上涨19.2%",
      "accuracy_score": 0.94,
      "prediction_horizon": "3_months"
    }
  ],
  "overall_metrics": {
    "consensus_prediction_accuracy": "89.7%",
    "flow_prediction_accuracy": "76.3%",
    "timing_accuracy": "82.1%"
  }
}
```

### 模型校准流程
```javascript
const modelCalibration = {
  monthly_review: () => {
    // 检查预测准确性
    const accuracy = calculateMonthlyAccuracy();
    if (accuracy < 0.75) {
      triggerModelReview();
    }
  },

  quarterly_recalibration: () => {
    // 重新校准权重
    recalibrateInvestorWeights();
    updateConsensusThresholds();
    validateBacktestingResults();
  },

  annual_strategy_review: () => {
    // 策略有效性全面评估
    assessStrategyEffectiveness();
    updateInvestorClassification();
    refineSignalGenerationLogic();
  }
};
```

---

## 版本历史
- v1.0 (2026-02-05): 初始版本。整合顶级投资者分类+投资逻辑解码+机构共识度量化+行为差异分析+投资信号生成+策略学习系统。基于TSM顶级投资者分析成功经验构建。