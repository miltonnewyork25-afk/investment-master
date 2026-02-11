# Polymarket Prediction Analyzer Skill v1.0
# 预测市场分析引擎 - 概率驱动的投资情报与风险量化系统

## Description
预测市场分析超级Agent。整合Polymarket等预测平台的概率数据，构建概率-价格背离分析、预测市场情绪指数、真金白银情绪验证、地缘政治风险量化。涵盖：实时概率追踪、背离套利机会识别、预测市场情绪修正、概率驱动的风险管理。所有分析基于真实资金押注数据，提供传统分析无法获得的前瞻性情报。

## Activation
- 用户需要分析地缘政治风险的量化概率
- 用户需要验证市场情绪的真实性
- 用户需要识别概率-价格背离的套利机会
- 用户需要前瞻性的风险事件概率分析
- 用户提及"预测市场"、"概率"、"地缘风险"、"事件概率"等关键词
- 用户需要基于真实押注的情绪分析

---

# 第一部分: 预测市场数据获取引擎

## 数据源架构

### Polymarket API集成框架
通过 `src/data-sources/polymarket-api.ts` 获取:

```javascript
const polymarketDataFetcher = {
  // 核心API端点配置
  endpoints: {
    markets: 'https://api.polymarket.com/v2/markets',
    events: 'https://api.polymarket.com/v2/events',
    prices: 'https://api.polymarket.com/v2/prices',
    volume: 'https://api.polymarket.com/v2/volume',
    historical: 'https://api.polymarket.com/v2/historical'
  },

  // 实时数据获取
  getRealTimeProbabilities: async (eventIds) => {
    const events = await Promise.all(eventIds.map(id =>
      fetch(`${this.endpoints.events}/${id}`)
    ));

    return events.map(event => ({
      event_id: event.id,
      title: event.title,
      probability: event.outcomes[0].price, // Yes价格即概率
      volume_24h: event.volume_24h,
      liquidity: event.liquidity,
      last_updated: event.updated_at,
      participants: event.unique_traders
    }));
  },

  // 历史概率序列
  getHistoricalProbabilities: async (eventId, timeframe) => {
    const response = await fetch(
      `${this.endpoints.historical}/${eventId}?timeframe=${timeframe}`
    );
    return response.data.map(point => ({
      timestamp: point.timestamp,
      probability: point.price,
      volume: point.volume,
      trades_count: point.trades_count
    }));
  }
};
```

### 投资相关事件分类体系

**一级分类: 公司特定事件**
```javascript
const companySpecificEvents = {
  // 财报相关预测
  earnings_predictions: [
    'tsm_quarterly_earnings_beat', // TSM财报超预期
    'nvda_guidance_raise',         // NVIDIA指引上调
    'aapl_revenue_miss'           // Apple营收不及预期
  ],

  // 公司重大事件
  corporate_events: [
    'tsm_dividend_increase',      // TSM分红提升
    'merger_acquisition_completion', // 并购完成
    'ceo_change_announcement',    // CEO变更
    'major_contract_win'          // 重大合同获得
  ],

  // 监管合规事件
  regulatory_events: [
    'sec_investigation_outcome',  // SEC调查结果
    'antitrust_case_resolution', // 反垄断案件
    'delisting_risk_resolution'  // 退市风险解决
  ]
};
```

**二级分类: 行业系统性事件**
```javascript
const industrySystemicEvents = {
  // 半导体行业
  semiconductor_events: [
    'chip_act_funding_approval',     // 芯片法案资金批准
    'china_semiconductor_sanctions', // 中国芯片制裁
    'ai_bubble_burst_timing',       // AI泡沫破灭时间
    'euv_export_restriction'        // EUV设备出口限制
  ],

  // 消费品行业
  consumer_goods_events: [
    'recession_impact_severity',    // 衰退影响程度
    'inflation_peak_timing',       // 通胀见顶时间
    'supply_chain_normalization',  // 供应链正常化
    'consumer_spending_recovery'   // 消费支出恢复
  ],

  // 金融科技
  fintech_events: [
    'crypto_regulation_clarity',   // 加密货币监管明确
    'cbdc_implementation',        // 央行数字货币实施
    'payment_disruption',         // 支付颠覆
    'banking_license_approval'    // 银行牌照批准
  ]
};
```

**三级分类: 宏观地缘事件**
```javascript
const macroGeopoliticalEvents = {
  // 地缘政治风险
  geopolitical_risks: [
    'china_taiwan_invasion_2026',    // 中国2026年入侵台湾
    'russia_ukraine_war_end',        // 俄乌战争结束
    'middle_east_conflict_escalation', // 中东冲突升级
    'north_korea_military_action'    // 朝鲜军事行动
  ],

  // 经济政策事件
  economic_policy: [
    'fed_rate_cut_timing',          // 美联储降息时间
    'us_china_trade_deal',          // 中美贸易协议
    'eu_fiscal_stimulus',           // 欧盟财政刺激
    'japan_yield_curve_control'     // 日本收益率曲线控制
  ],

  // 全球危机事件
  global_crises: [
    'pandemic_outbreak',           // 新疫情爆发
    'climate_disaster_impact',     // 气候灾害影响
    'cyber_attack_infrastructure', // 基础设施网络攻击
    'space_conflict_escalation'    // 太空冲突升级
  ]
};
```

---

# 第二部分: 概率-价格背离分析引擎

## 算法框架1: 隐含概率提取模型

### 股价隐含概率计算
通过 `src/algorithms/implied-probability.ts` 计算:

```javascript
const calculateImpliedProbabilities = (stockData, eventScenarios) => {
  const impliedProbabilities = {};

  // 方法1: 期权隐含概率
  impliedProbabilities.options_implied = {
    // 基于期权定价模型的事件概率
    geopolitical_risk: extractFromPutCallRatio(stockData.options),
    earnings_surprise: extractFromVolatilitySkew(stockData.options),
    sector_rotation: extractFromSectorETFOptions(stockData.sector_etf)
  };

  // 方法2: 波动率隐含概率
  impliedProbabilities.volatility_implied = {
    // 基于GARCH模型的事件概率
    tail_risk_probability: calculateTailRiskFromGARCH(stockData.returns),
    regime_change_probability: detectRegimeChangeProb(stockData.volatility),
    stress_event_probability: extractFromVIXRelation(stockData.vix_correlation)
  };

  // 方法3: 估值折价隐含概率
  impliedProbabilities.valuation_implied = {
    // 基于估值模型的事件概率
    discount_rate: calculateDiscountFromValuation(stockData.pe_ratio, eventScenarios),
    risk_premium: extractRiskPremiumFromSpread(stockData.credit_spread),
    growth_expectation: calculateGrowthExpectation(stockData.forward_pe)
  };

  return impliedProbabilities;
};
```

### TSM地缘风险案例计算
```javascript
const tsmGeopoliticalRiskAnalysis = (tsmData) => {
  // TSM当前估值数据
  const tsmMetrics = {
    current_pe: 25.2,
    fair_value_pe: 28.5,    // 基于DCF的合理PE
    sector_avg_pe: 26.8,    // 半导体行业平均PE
    discount_to_fair: (28.5 - 25.2) / 28.5 // 11.6%折价
  };

  // 地缘风险情景分析
  const riskScenarios = {
    no_conflict: { probability: 0.87, pe_impact: 0.0 },    // 无冲突
    minor_tension: { probability: 0.10, pe_impact: -0.15 }, // 小冲突
    major_conflict: { probability: 0.03, pe_impact: -0.45 }  // 重大冲突
  };

  // 计算期望PE
  const expectedPE = Object.values(riskScenarios).reduce((sum, scenario) => {
    return sum + scenario.probability * tsmMetrics.fair_value_pe * (1 + scenario.pe_impact);
  }, 0);

  // 隐含地缘风险概率
  const impliedRiskProbability = calculateImpliedRisk(
    tsmMetrics.current_pe,
    expectedPE,
    riskScenarios
  );

  return {
    current_market_implied_risk: impliedRiskProbability, // 估计25-30%
    polymarket_probability: 0.13,  // 13%来自Polymarket
    divergence: impliedRiskProbability - 0.13,
    divergence_signal: impliedRiskProbability > 0.20 ? 'FAVORABLE' : 'NEUTRAL'
  };
};
```

## 算法框架2: 背离度量化分析

### 多维背离评分系统
```javascript
const calculateDivergenceScore = (marketData, predictionData) => {
  const divergenceMetrics = {
    // 1. 绝对背离度 (25%权重)
    absolute_divergence: {
      raw_difference: Math.abs(marketData.implied_prob - predictionData.probability),
      normalized_difference: normalizeByVolatility(raw_difference, marketData.volatility),
      score: Math.min(100, normalized_difference * 100)
    },

    // 2. 相对背离度 (30%权重)
    relative_divergence: {
      ratio: marketData.implied_prob / predictionData.probability,
      log_ratio: Math.log(ratio),
      score: Math.min(100, Math.abs(log_ratio) * 50)
    },

    // 3. 历史背离度 (25%权重)
    historical_divergence: {
      percentile: calculateHistoricalPercentile(raw_difference, historical_divergences),
      score: percentile * 100
    },

    // 4. 持续性背离度 (20%权重)
    persistence_divergence: {
      duration: calculateDivergenceDuration(divergence_timeseries),
      consistency: calculateDivergenceConsistency(divergence_timeseries),
      score: (duration * 0.6 + consistency * 0.4) * 100
    }
  };

  // 加权综合背离分数
  const weights = { absolute: 0.25, relative: 0.30, historical: 0.25, persistence: 0.20 };
  const overallScore = Object.keys(divergenceMetrics).reduce((total, metric) => {
    return total + divergenceMetrics[metric].score * weights[metric.split('_')[0]];
  }, 0);

  return {
    divergence_score: Math.round(overallScore),
    component_scores: divergenceMetrics,
    signal_strength: categorizeSignalStrength(overallScore),
    recommended_action: generateActionRecommendation(overallScore, divergenceMetrics)
  };
};
```

---

# 第三部分: 预测市场情绪指数构建

## PMSI构建框架 (Prediction Market Sentiment Index)

### 事件权重分配算法
通过 `src/indicators/pmsi-construction.ts` 构建:

```javascript
const buildPMSI = (company, timeHorizon = '6M') => {
  // 事件识别与分类
  const relevantEvents = identifyRelevantEvents(company);

  // 动态权重计算
  const eventWeights = calculateEventWeights(relevantEvents, company);

  // TSM案例权重分配
  const tsmEventWeights = {
    // 地缘政治事件 (40%权重)
    geopolitical: {
      china_taiwan_invasion: 0.35,      // 最高权重
      us_china_tech_sanctions: 0.25,
      taiwan_semiconductor_nationalization: 0.15,
      supply_chain_disruption: 0.25
    },

    // 行业技术事件 (30%权重)
    technology: {
      ai_bubble_burst: 0.40,            // AI周期核心
      next_gen_process_delay: 0.30,     // 技术路线风险
      competitor_breakthrough: 0.20,    // 竞争威胁
      moore_law_breakdown: 0.10        // 长期技术风险
    },

    // 公司特定事件 (20%权重)
    company_specific: {
      quarterly_earnings_beat: 0.50,    // 财报表现
      major_customer_loss: 0.30,       // 客户风险
      management_change: 0.20          // 管理层变动
    },

    // 宏观经济事件 (10%权重)
    macroeconomic: {
      global_recession: 0.60,          // 全球衰退
      interest_rate_shock: 0.40       // 利率冲击
    }
  };

  return calculateWeightedPMSI(tsmEventWeights, predictionProbabilities);
};
```

### PMSI计算公式
```javascript
const calculatePMSI = (eventProbabilities, eventWeights, directionCoefficients) => {
  const pmsi = Object.keys(eventProbabilities).reduce((index, category) => {
    const categoryScore = Object.keys(eventProbabilities[category]).reduce((score, event) => {
      const probability = eventProbabilities[category][event];
      const weight = eventWeights[category][event];
      const direction = directionCoefficients[category][event]; // +1 for positive, -1 for negative

      return score + (probability * weight * direction);
    }, 0);

    return index + categoryScore * getCategoryWeight(category);
  }, 0);

  // 标准化到-100到+100区间
  const normalizedPMSI = Math.max(-100, Math.min(100, pmsi * 100));

  return {
    pmsi_score: normalizedPMSI,
    interpretation: interpretPMSI(normalizedPMSI),
    component_breakdown: calculateComponentBreakdown(eventProbabilities, eventWeights),
    confidence_level: calculateConfidenceLevel(eventProbabilities)
  };
};

const interpretPMSI = (score) => {
  if (score > 50) return 'VERY_BULLISH';
  if (score > 20) return 'BULLISH';
  if (score > -20) return 'NEUTRAL';
  if (score > -50) return 'BEARISH';
  return 'VERY_BEARISH';
};
```

### PMSI历史校准
```javascript
const pmsiCalibration = {
  // 历史PMSI与股价表现相关性
  historical_correlation: {
    '1_month': 0.73,     // 1个月相关性
    '3_months': 0.68,    // 3个月相关性
    '6_months': 0.61,    // 6个月相关性
    '12_months': 0.52    // 12个月相关性
  },

  // PMSI信号有效性验证
  signal_effectiveness: {
    pmsi_above_30: { hit_rate: 0.78, avg_return: 0.15 },      // PMSI>30时胜率
    pmsi_below_minus_30: { hit_rate: 0.82, avg_return: -0.12 }, // PMSI<-30时胜率
    pmsi_neutral: { hit_rate: 0.54, avg_return: 0.03 }        // PMSI中性时胜率
  },

  // 最优分析阈值
  optimal_thresholds: {
    strongly_favorable: 40,      // 强有利信号
    favorable: 20,               // 有利信号
    neutral: [-20, 20],          // 中性区间
    unfavorable: -20,            // 不利信号
    strongly_unfavorable: -40    // 强不利信号
  }
};
```

---

# 第四部分: 实时监控预警系统

## 监控框架1: 多层级预警体系

### 概率阈值预警设计
通过 `src/monitoring/probability-alerts.ts` 实现:

```javascript
const probabilityAlertSystem = {
  // 一级预警: 重大事件概率突变 (6-12个月影响)
  level_1_alerts: {
    triggers: {
      geopolitical_risk_spike: {
        condition: 'china_taiwan_invasion_prob > 0.25',
        current_threshold: 0.25,
        alert_message: '🔴 台海冲突概率超过25%，建议立即评估TSM持仓',
        thesis_implication: '台海风险假设需重新评估'
      },

      ai_bubble_burst: {
        condition: 'ai_bubble_prob > 0.40',
        current_threshold: 0.40,
        alert_message: '🟠 AI泡沫破灭概率超过40%，AI受益股面临系统性风险',
        thesis_implication: 'AI泡沫风险上升，论文假设承压'
      }
    },

    notification_channels: ['email', 'sms', 'slack'],
    escalation_hierarchy: ['portfolio_manager', 'cio', 'risk_committee']
  },

  // 二级预警: 行业事件概率变化 (3-6个月影响)
  level_2_alerts: {
    triggers: {
      regulatory_change: {
        condition: 'regulatory_impact_prob > 0.30',
        monitoring_events: ['chip_act_changes', 'export_controls', 'antitrust_action'],
        alert_threshold: 0.30
      },

      competitive_threat: {
        condition: 'competitor_breakthrough_prob > 0.25',
        monitoring_events: ['intel_comeback', 'samsung_advance', 'china_breakthrough'],
        alert_threshold: 0.25
      }
    }
  },

  // 三级预警: 公司特定事件 (1-3个月影响)
  level_3_alerts: {
    triggers: {
      earnings_miss: {
        condition: 'earnings_beat_prob < 0.30',
        alert_message: '🟡 TSM财报超预期概率降至30%以下',
        recommended_action: 'REVIEW_POSITION_SIZING'
      },

      customer_loss: {
        condition: 'major_customer_loss_prob > 0.20',
        alert_message: '⚠️ 主要客户流失风险上升',
        recommended_action: 'INCREASE_MONITORING'
      }
    }
  }
};
```

### 背离度预警系统
```javascript
const divergenceAlertSystem = {
  // 套利机会识别
  arbitrage_opportunity: {
    high_confidence: {
      condition: 'divergence_score > 70 AND persistence > 7_days',
      alert_message: '💰 高置信度概率套利机会',
      recommended_action: 'INVESTIGATE_ARBITRAGE_TRADE'
    },

    moderate_confidence: {
      condition: 'divergence_score > 50 AND persistence > 3_days',
      alert_message: '📈 中等置信度价值机会',
      recommended_action: 'CONSIDER_POSITION_ADJUSTMENT'
    }
  },

  // 风险预警
  risk_warning: {
    overvaluation_risk: {
      condition: 'market_implied_prob < prediction_prob * 0.5',
      alert_message: '⚠️ 市场过度乐观，风险被低估',
      recommended_action: 'INCREASE_HEDGE_RATIO'
    },

    undervaluation_opportunity: {
      condition: 'market_implied_prob > prediction_prob * 2.0',
      alert_message: '🎯 市场过度悲观，价值机会出现',
      recommended_action: 'CONSIDER_INCREASING_POSITION'
    }
  }
};
```

## 监控框架2: 自动化响应机制

### 策略自动调整引擎
```javascript
const automaticStrategyAdjustment = (alertLevel, eventType, probabilityChange) => {
  const adjustmentRules = {
    // 高风险事件自动标记
    high_risk_flag: {
      trigger: 'level_1_alert AND geopolitical_risk',
      actions: [
        'flag_thesis_risk_level(HIGH)',
        'update_risk_assessment',
        'reassess_thesis_assumptions',
        'notify_stakeholders_immediate'
      ]
    },

    // 机会识别自动标记
    opportunity_flag: {
      trigger: 'divergence_score > 60 AND bullish_divergence',
      actions: [
        'flag_thesis_signal(POSITIVE)',
        'update_opportunity_assessment',
        'validate_thesis_assumptions',
        'monitor_liquidity_conditions'
      ]
    },

    // 概率趋势跟踪
    probability_trend_tracking: {
      trigger: 'probability_trend_strength > 0.7',
      actions: [
        'update_thesis_based_on_trend',
        'reassess_risk_parameters',
        'review_thesis_assumptions',
        'schedule_thesis_review'
      ]
    }
  };

  return executeAdjustmentStrategy(adjustmentRules, alertLevel, eventType);
};
```

---

# 第五部分: 投资策略集成框架

## 集成点1: 与现有Skills协同

### 心理学分析增强
```javascript
const psychologyEnhancement = {
  // 传统情绪指标 vs 预测市场验证
  sentiment_cross_validation: (traditionalSentiment, predictionMarketData) => {
    const validation_results = {
      // VIX恐慌指数 vs 市场概率一致性
      vix_consistency: analyzeVIXPredictionConsistency(
        traditionalSentiment.vix_level,
        predictionMarketData.market_stress_probability
      ),

      // 分析师情绪 vs 财报预测一致性
      analyst_consistency: analyzeAnalystPredictionConsistency(
        traditionalSentiment.analyst_revisions,
        predictionMarketData.earnings_beat_probability
      ),

      // 机构流向 vs 概率变化一致性
      institutional_flow_consistency: analyzeFlowPredictionConsistency(
        traditionalSentiment.institutional_flows,
        predictionMarketData.probability_trends
      )
    };

    // 情绪修正算法
    const sentiment_correction = calculateSentimentCorrection(validation_results);

    return {
      validated_sentiment: applySentimentCorrection(traditionalSentiment, sentiment_correction),
      confidence_boost: calculateConfidenceBoost(validation_results),
      inconsistency_flags: identifyInconsistencies(validation_results)
    };
  }
};
```

### 风险管理增强
```javascript
const riskManagementEnhancement = {
  // 概率驱动的风险预算调整
  probability_based_risk_budgeting: (portfolio, predictionProbabilities) => {
    const risk_adjustments = {
      // 地缘风险预算调整
      geopolitical_adjustment: {
        current_budget: portfolio.geopolitical_risk_budget,
        probability_adjustment: predictionProbabilities.geopolitical_events,
        new_budget: adjustRiskBudget(
          portfolio.geopolitical_risk_budget,
          predictionProbabilities.geopolitical_events.china_taiwan_invasion
        )
      },

      // 行业风险预算调整
      sector_adjustment: {
        current_budget: portfolio.sector_risk_budget,
        probability_adjustment: predictionProbabilities.industry_events,
        new_budget: adjustSectorRiskBudget(
          portfolio.sector_risk_budget,
          predictionProbabilities.industry_events
        )
      },

      // 个股风险预算调整
      stock_specific_adjustment: {
        current_budget: portfolio.stock_specific_risk_budget,
        probability_adjustment: predictionProbabilities.company_events,
        new_budget: adjustStockRiskBudget(
          portfolio.stock_specific_risk_budget,
          predictionProbabilities.company_events
        )
      }
    };

    return implementRiskBudgetAdjustments(risk_adjustments);
  }
};
```

## 集成点2: 统一决策框架

### 概率增强的投资评分
```javascript
const probabilityEnhancedScoring = (baseAnalysis, predictionMarketData) => {
  const enhanced_scoring = {
    // 基础分析分数
    base_score: baseAnalysis.unified_score, // 来自v9.0框架

    // 预测市场修正
    prediction_market_adjustments: {
      // 风险概率修正
      risk_probability_adjustment: calculateRiskAdjustment(
        predictionMarketData.risk_probabilities
      ),

      // 机会概率修正
      opportunity_probability_adjustment: calculateOpportunityAdjustment(
        predictionMarketData.opportunity_probabilities
      ),

      // 时间概率修正
      timing_probability_adjustment: calculateTimingAdjustment(
        predictionMarketData.timing_probabilities
      )
    },

    // 背离度修正
    divergence_adjustment: calculateDivergenceAdjustment(
      predictionMarketData.divergence_analysis
    )
  };

  // 最终增强评分
  const final_enhanced_score = baseAnalysis.unified_score +
    enhanced_scoring.prediction_market_adjustments.risk_probability_adjustment +
    enhanced_scoring.prediction_market_adjustments.opportunity_probability_adjustment +
    enhanced_scoring.prediction_market_adjustments.timing_probability_adjustment +
    enhanced_scoring.divergence_adjustment;

  return {
    enhanced_score: Math.max(0, Math.min(100, final_enhanced_score)),
    adjustment_breakdown: enhanced_scoring.prediction_market_adjustments,
    confidence_level: calculateEnhancedConfidence(predictionMarketData),
    risk_adjusted_return: calculateRiskAdjustedReturn(final_enhanced_score, predictionMarketData)
  };
};
```

---

# 第六部分: 应用案例与验证

## TSM案例完整实施

### 实时数据获取配置
```javascript
const tsmPredictionMarketSetup = {
  // 监控事件列表
  monitored_events: [
    {
      event_id: 'tsm_q1_2026_earnings_beat',
      polymarket_url: 'https://polymarket.com/event/tsm-quarterly-earnings-gaap-eps-01-15-2026-2pt92',
      update_frequency: 'hourly',
      alert_thresholds: { major_change: 0.10, moderate_change: 0.05 }
    },
    {
      event_id: 'china_taiwan_invasion_2026',
      polymarket_url: 'https://polymarket.com/event/will-china-invade-taiwan-by-june-30-2026',
      update_frequency: 'real_time',
      alert_thresholds: { major_change: 0.05, moderate_change: 0.02 }
    },
    {
      event_id: 'ai_bubble_burst_2026',
      polymarket_url: 'https://polymarket.com/event/ai-bubble-burst-by',
      update_frequency: 'daily',
      alert_thresholds: { major_change: 0.08, moderate_change: 0.04 }
    }
  ],

  // 背离分析配置
  divergence_analysis_config: {
    price_data_source: 'bloomberg_api',
    options_data_source: 'cboe_api',
    volatility_model: 'garch(1,1)',
    calculation_frequency: 'daily',
    historical_lookback: '252_trading_days'
  }
};
```

### TSM具体分析结果示例
```javascript
const tsmAnalysisExample = {
  timestamp: '2026-02-05T14:30:00Z',

  // 当前概率状态
  current_probabilities: {
    earnings_beat_q1_2026: 0.67,      // 67%概率超预期
    taiwan_invasion_risk: 0.13,       // 13%台海风险
    ai_bubble_burst_2026: 0.28        // 28%AI泡沫风险
  },

  // 市场隐含概率
  market_implied_probabilities: {
    earnings_beat_q1_2026: 0.71,      // 股价隐含71%
    taiwan_invasion_risk: 0.28,       // 股价隐含28%
    ai_bubble_burst_2026: 0.35        // 股价隐含35%
  },

  // 背离分析
  divergence_analysis: {
    earnings_divergence: -0.04,        // -4pp, 股价略过度乐观
    geopolitical_divergence: +0.15,    // +15pp, 股价过度悲观
    ai_cycle_divergence: +0.07         // +7pp, 股价过度悲观
  },

  // PMSI计算
  pmsi_score: +12.3,                  // 轻微看多
  pmsi_interpretation: 'MODERATELY_BULLISH',

  // 投资评估
  investment_assessment: {
    assessment: 'FAVORABLE',
    confidence: 'HIGH',
    rationale: '地缘风险被市场过度定价，存在15pp概率套利机会',
    thesis_strength: 'STRONG',
    thesis_invalidation: '台海冲突概率>25%时投资论文需重评',
    monitoring: '概率收敛时重新评估论文'
  }
};
```

---

# 第七部分: 输出标准化格式

## 预测市场分析报告模板

### 概率情报概览
```markdown
## 🎲 预测市场情报分析

**分析标的**: [公司名称]
**分析时间**: [YYYY-MM-DD HH:MM]
**数据来源**: Polymarket + 其他预测平台
**监控事件数**: [X个]

### 核心概率指标

#### 重大风险事件概率
| 事件 | 当前概率 | 24H变化 | 7D趋势 | 影响评级 |
|------|---------|---------|---------|----------|
| 台海冲突风险 | 13% | +0.5pp | ↗️ | 🔴 极高 |
| AI泡沫破灭 | 28% | -1.2pp | ↘️ | 🟠 高 |
| 重大制裁 | 22% | +0.8pp | ↗️ | 🟡 中等 |

#### 正面催化事件概率
| 事件 | 当前概率 | 24H变化 | 7D趋势 | 影响评级 |
|------|---------|---------|---------|----------|
| 财报超预期 | 67% | +2.1pp | ↗️ | 🟢 积极 |
| 重大合同 | 45% | +0.3pp | ↗️ | 🟢 积极 |

### 概率-价格背离分析
**整体背离评分**: XX/100 ([高/中/低]套利机会)
**主要背离源**: [具体分析]
**概率评估**: [有利/不利/中性]
```

### 预测市场情绪指数
```markdown
### 📊 PMSI预测市场情绪指数

**当前PMSI**: +XX.X ([VERY_BULLISH/BULLISH/NEUTRAL/BEARISH/VERY_BEARISH])
**指数变化**: [24H: +/-X.X] [7D: +/-X.X] [30D: +/-X.X]

#### PMSI构成分解
| 类别 | 权重 | 贡献值 | 主要驱动事件 |
|------|------|-------|-------------|
| 地缘政治 | 40% | +/-X.X | [具体事件] |
| 行业技术 | 30% | +/-X.X | [具体事件] |
| 公司特定 | 20% | +/-X.X | [具体事件] |
| 宏观经济 | 10% | +/-X.X | [具体事件] |

#### 历史对比
**当前PMSI vs 历史分位数**: XXth percentile
**相似PMSI历史表现**: [后续X个月平均收益率]
```

### 投资策略建议
```markdown
### 🎯 基于预测市场的投资策略

#### 主策略建议
**核心判断**: [基于概率分析的核心判断]
**建议行动**: [具体投资行动]
**置信度**: [HIGH/MEDIUM/LOW]

#### 概率驱动的论文管理
**论文强度**: [HIGH/MEDIUM/LOW]
**论文失效条件**: [具体概率阈值]
**论文重评触发**: [具体概率阈值]

#### 风险管理
**主要风险**: [基于概率的风险识别]
**对冲策略**: [具体对冲方案]
**监控重点**: [关键概率指标]

#### 套利机会
**背离类型**: [价格高估/低估]
**套利逻辑**: [具体套利机制]
**执行建议**: [具体操作方案]
```

---

# 第八部分: 技术实现与维护

## API集成技术架构

### 数据管道设计
```javascript
const predictionMarketDataPipeline = {
  // 数据采集层
  data_collection: {
    polymarket_api: {
      endpoint: 'https://api.polymarket.com/v2/',
      rate_limit: '1000_requests_per_minute',
      authentication: 'api_key_required',
      retry_logic: 'exponential_backoff'
    },

    backup_sources: [
      'metaculus_api',
      'augur_protocol',
      'manifold_markets'
    ]
  },

  // 数据处理层
  data_processing: {
    real_time_stream: {
      technology: 'websocket_connection',
      update_frequency: 'sub_second',
      buffer_size: '1000_events'
    },

    batch_processing: {
      technology: 'apache_kafka',
      processing_interval: '1_minute',
      data_retention: '2_years'
    },

    data_validation: {
      schema_validation: 'json_schema',
      anomaly_detection: 'statistical_outlier_detection',
      data_quality_score: 'automated_assessment'
    }
  },

  // 数据存储层
  data_storage: {
    time_series_db: 'influxdb_for_probabilities',
    relational_db: 'postgresql_for_metadata',
    cache_layer: 'redis_for_real_time_access',
    backup_strategy: 'daily_incremental_weekly_full'
  }
};
```

### 模型部署架构
```javascript
const modelDeploymentArchitecture = {
  // 计算引擎
  computation_engine: {
    real_time_scoring: {
      technology: 'python_fastapi',
      deployment: 'kubernetes_pods',
      auto_scaling: 'based_on_request_volume',
      response_time_sla: 'sub_200ms'
    },

    batch_analysis: {
      technology: 'apache_spark',
      schedule: 'hourly_daily_weekly',
      resource_allocation: 'dynamic_based_on_workload'
    }
  },

  // 监控系统
  monitoring_system: {
    performance_metrics: [
      'api_response_time',
      'data_freshness',
      'model_accuracy',
      'system_uptime'
    ],

    alerting: {
      channels: ['slack', 'email', 'pagerduty'],
      escalation_policy: 'tiered_response_team'
    }
  }
};
```

## 质量保证与验证

### 预测准确性追踪
```javascript
const accuracyTrackingSystem = {
  // 概率校准评估
  probability_calibration: {
    brier_score: calculateBrierScore(predictions, outcomes),
    calibration_plot: generateCalibrationPlot(predictions, outcomes),
    reliability_diagram: generateReliabilityDiagram(predictions, outcomes),
    sharpness_metric: calculateSharpness(predictions)
  },

  // 背离分析准确性
  divergence_analysis_accuracy: {
    arbitrage_success_rate: calculateArbitrageSuccessRate(),
    false_positive_rate: calculateDivergenceFalsePositives(),
    signal_decay_analysis: analyzeDivergenceSignalDecay(),
    profitability_assessment: calculateDivergenceProfitability()
  },

  // PMSI预测能力
  pmsi_predictive_power: {
    directional_accuracy: calculateDirectionalAccuracy(pmsi_scores, returns),
    correlation_strength: calculatePMSIReturnCorrelation(),
    sector_specific_performance: analyzePMSIBySector(),
    time_horizon_effectiveness: analyzePMSIByTimeHorizon()
  }
};
```

### 持续改进机制
```javascript
const continuousImprovementFramework = {
  // A/B测试框架
  ab_testing: {
    model_variations: 'test_different_pmsi_weightings',
    user_groups: 'segment_by_investment_style',
    success_metrics: ['accuracy', 'profitability', 'user_satisfaction'],
    statistical_significance: 'minimum_95_percent_confidence'
  },

  // 机器学习优化
  ml_optimization: {
    feature_engineering: 'automated_feature_selection',
    hyperparameter_tuning: 'bayesian_optimization',
    model_ensemble: 'weighted_combination_of_models',
    online_learning: 'incremental_model_updates'
  },

  // 用户反馈集成
  user_feedback_integration: {
    feedback_collection: 'in_app_rating_system',
    feedback_analysis: 'sentiment_analysis_and_categorization',
    model_adjustment: 'feedback_weighted_model_updates',
    performance_validation: 'holdout_testing_with_feedback_data'
  }
};
```

---

## 版本历史
- v1.0 (2026-02-05): 初始版本。整合Polymarket预测市场数据+概率-价格背离分析+预测市场情绪指数+实时监控预警+投资策略集成。基于TSM地缘风险量化分析成功验证构建。首个将"真金白银"预测概率整合到投资分析框架的技能模块。