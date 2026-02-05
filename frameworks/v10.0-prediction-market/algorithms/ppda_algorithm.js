/**
 * 概率-价格背离分析算法 (PPDA - Probability-Price Divergence Analysis)
 * v10.0预测市场增强框架核心算法
 *
 * 功能：识别市场定价与预测市场概率的系统性偏差，发现套利机会
 */

class PolymarketPriceDeviationAnalyzer {
  constructor(config = {}) {
    this.config = {
      basePrice: config.basePrice || 140,  // 无地缘风险理论价格
      updateFrequency: config.updateFrequency || 'real-time',
      confidenceThreshold: config.confidenceThreshold || 0.85,
      ...config
    };

    this.impactCoefficients = {
      taiwan_conflict: -0.6,      // 台海冲突影响-60%
      tech_sanctions: -0.35,      // 技术制裁影响-35%
      ai_demand_decline: -0.4,    // AI需求下滑-40%
      competition_threat: -0.25   // 竞争威胁-25%
    };
  }

  /**
   * 核心背离分析计算
   */
  calculateDeviations(currentPrice, polymarketProbs) {
    const impliedProbs = this.extractImpliedProbabilities(currentPrice);
    const deviations = {};

    for (let event in polymarketProbs) {
      if (impliedProbs[event] !== undefined) {
        const deviation = this.computeDeviation(
          impliedProbs[event],
          polymarketProbs[event]
        );

        deviations[event] = {
          market_implied: impliedProbs[event],
          polymarket_actual: polymarketProbs[event],
          deviation: deviation,
          confidence: this.calculateConfidence(event, polymarketProbs[event]),
          arbitrage_signal: this.generateArbitrageSignal(deviation, event)
        };
      }
    }

    return deviations;
  }

  /**
   * 从股价提取隐含概率
   */
  extractImpliedProbabilities(price) {
    const geopoliticalDiscount = (this.config.basePrice - price) / this.config.basePrice;

    return {
      taiwan_conflict: Math.max(0, Math.min(1,
        geopoliticalDiscount / Math.abs(this.impactCoefficients.taiwan_conflict)
      )),
      tech_sanctions: Math.max(0, Math.min(1,
        geopoliticalDiscount / Math.abs(this.impactCoefficients.tech_sanctions) * 0.8
      )),
      ai_demand_growth: Math.max(0, Math.min(1,
        0.85 + (price - 110) / 200
      )),
      competition_threat: Math.max(0, Math.min(1,
        geopoliticalDiscount / Math.abs(this.impactCoefficients.competition_threat) * 0.6
      ))
    };
  }

  /**
   * 计算背离度
   */
  computeDeviation(impliedProb, actualProb) {
    if (actualProb === 0) return 0;
    return (impliedProb - actualProb) / actualProb;
  }

  /**
   * 计算置信度
   */
  calculateConfidence(event, probability) {
    const eventConfidenceMap = {
      taiwan_conflict: 0.92,     // A级
      tech_sanctions: 0.90,      // A级
      ai_demand_growth: 0.89,    // A级
      competition_threat: 0.81   // B级
    };

    const baseConfidence = eventConfidenceMap[event] || 0.75;

    // 根据概率的极值调整置信度
    const extremenessPenalty = Math.abs(probability - 0.5) * 0.1;
    return Math.max(0.5, baseConfidence - extremenessPenalty);
  }

  /**
   * 生成套利信号
   */
  generateArbitrageSignal(deviation, event) {
    const absDeviation = Math.abs(deviation);

    if (absDeviation < 0.1) return 'NEUTRAL';

    const signals = {
      taiwan_conflict: {
        positive: 'STRONG_BUY',  // 市场高估风险
        negative: 'SELL'         // 市场低估风险
      },
      ai_demand_growth: {
        positive: 'SELL',        // 市场高估需求
        negative: 'BUY'          // 市场低估需求
      },
      default: {
        positive: 'BUY',
        negative: 'SELL'
      }
    };

    const eventSignals = signals[event] || signals.default;

    if (deviation > 0.2) return eventSignals.positive;
    if (deviation < -0.2) return eventSignals.negative;
    if (deviation > 0.1) return `WEAK_${eventSignals.positive}`;
    if (deviation < -0.1) return `WEAK_${eventSignals.negative}`;

    return 'NEUTRAL';
  }

  /**
   * 实时更新分析
   */
  async updateRealTimeAnalysis(symbol) {
    try {
      const currentPrice = await this.getCurrentPrice(symbol);
      const polymarketData = await this.getPolymarketData();

      const deviations = this.calculateDeviations(currentPrice, polymarketData);
      const summary = this.generateSummary(deviations);

      return {
        timestamp: new Date().toISOString(),
        symbol: symbol,
        currentPrice: currentPrice,
        deviations: deviations,
        summary: summary
      };
    } catch (error) {
      console.error('PPDA实时更新失败:', error);
      throw error;
    }
  }

  /**
   * 生成分析摘要
   */
  generateSummary(deviations) {
    const significantDeviations = Object.entries(deviations)
      .filter(([_, data]) => Math.abs(data.deviation) > 0.2)
      .sort((a, b) => Math.abs(b[1].deviation) - Math.abs(a[1].deviation));

    const overallSignal = this.calculateOverallSignal(deviations);

    return {
      significant_deviations: significantDeviations.length,
      largest_deviation: significantDeviations[0] || null,
      overall_signal: overallSignal,
      confidence_score: this.calculateOverallConfidence(deviations),
      arbitrage_opportunities: this.identifyArbitrageOpportunities(deviations)
    };
  }

  /**
   * 计算综合信号
   */
  calculateOverallSignal(deviations) {
    let buyScore = 0;
    let sellScore = 0;

    for (let [event, data] of Object.entries(deviations)) {
      const signal = data.arbitrage_signal;
      const confidence = data.confidence;

      if (signal.includes('BUY')) {
        buyScore += confidence * (signal.includes('STRONG') ? 2 : 1);
      } else if (signal.includes('SELL')) {
        sellScore += confidence * (signal.includes('STRONG') ? 2 : 1);
      }
    }

    if (buyScore > sellScore * 1.5) return 'BUY';
    if (sellScore > buyScore * 1.5) return 'SELL';
    return 'NEUTRAL';
  }

  /**
   * 识别套利机会
   */
  identifyArbitrageOpportunities(deviations) {
    return Object.entries(deviations)
      .filter(([_, data]) => data.arbitrage_signal.includes('STRONG'))
      .map(([event, data]) => ({
        event: event,
        type: data.deviation > 0 ? 'overpriced_risk' : 'underpriced_opportunity',
        expected_return: Math.abs(data.deviation * 0.3), // 假设30%修正
        confidence: data.confidence,
        action: data.arbitrage_signal
      }));
  }

  // 辅助方法 - 需要根据实际数据源实现
  async getCurrentPrice(symbol) {
    // 实际实现需要连接价格API
    return 122.5; // TSM当前价格示例
  }

  async getPolymarketData() {
    // 实际实现需要连接Polymarket API
    return {
      taiwan_conflict: 0.183,
      tech_sanctions: 0.342,
      ai_demand_growth: 0.734,
      competition_threat: 0.237
    };
  }
}

// 使用示例
const ppdaAnalyzer = new PolymarketPriceDeviationAnalyzer({
  basePrice: 150.3,  // TSM DCF估值
  confidenceThreshold: 0.85
});

// 导出类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PolymarketPriceDeviationAnalyzer;
}

// 浏览器环境
if (typeof window !== 'undefined') {
  window.PolymarketPriceDeviationAnalyzer = PolymarketPriceDeviationAnalyzer;
}