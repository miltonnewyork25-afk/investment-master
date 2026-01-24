/**
 * Portfolio Risk Management Agent
 * 基于CFA L3 Portfolio Management + Risk Management curriculum
 *
 * 核心功能:
 * 1. Position Sizing (Kelly Criterion + practical guardrails)
 * 2. Risk Budget (sector limits, concentration, drawdown)
 * 3. Correlation-Aware Allocation
 * 4. Rebalancing Signals
 * 5. Risk-Adjusted Performance Metrics
 *
 * 设计原则: 保守偏向 — 宁可错过收益，不可承受过度风险
 */

import type { Company, WeeklyScore } from '../types/index.js';
import type { ValuationResult } from './cfa-valuation.js';

// === Types ===

export interface PositionSize {
  ticker: string;
  recommended_weight: number;      // 0-1 (portfolio weight)
  max_weight: number;              // Hard cap
  kelly_full: number;              // Full Kelly fraction
  kelly_half: number;              // Half Kelly (practical)
  conviction_level: 'high' | 'medium' | 'low';
  size_rationale: string;
}

export interface RiskBudget {
  total_risk_used: number;          // 0-1 (portion of risk budget consumed)
  sector_weights: Record<string, number>;
  concentration_hhi: number;        // Herfindahl-Hirschman Index (0-10000)
  max_drawdown_estimate: number;    // Estimated max drawdown (-1 to 0)
  var_95: number;                   // 95% VaR (daily, as % of portfolio)
  risk_signals: string[];
}

export interface RebalanceSignal {
  ticker: string;
  current_weight: number;
  target_weight: number;
  action: 'buy' | 'sell' | 'hold';
  urgency: 'immediate' | 'next_session' | 'week_end';
  reason: string;
}

export interface PortfolioMetrics {
  sharpe_ratio: number;            // (Rp - Rf) / sigma_p
  sortino_ratio: number;           // (Rp - Rf) / downside_dev
  information_ratio: number;       // alpha / tracking_error
  max_drawdown: number;            // Worst peak-to-trough
  calmar_ratio: number;            // Annual return / max drawdown
  win_rate: number;                // % of positions with positive return
}

export interface PortfolioAllocation {
  positions: PositionSize[];
  risk_budget: RiskBudget;
  rebalance_signals: RebalanceSignal[];
  portfolio_metrics: PortfolioMetrics | null;
  overall_assessment: string;
}

// === CFA L3 Risk Parameters ===

const RISK_PARAMS = {
  // Position sizing
  max_single_position: 0.10,       // 单一持仓不超过10%
  max_sector_weight: 0.30,         // 单一行业不超过30%
  min_positions: 8,                // 最少8只
  max_positions: 25,               // 最多25只
  kelly_fraction: 0.5,             // Half-Kelly (CFA: full Kelly too aggressive)

  // Risk limits
  max_portfolio_drawdown: -0.20,   // 组合最大回撤-20%
  max_daily_var_95: 0.025,         // 日VaR不超过2.5%
  concentration_hhi_limit: 1500,   // HHI>1500 = 过度集中

  // Correlation
  max_correlated_weight: 0.25,     // 高相关(>0.7)的总权重不超过25%
  correlation_threshold: 0.70,     // 相关系数>0.7视为高相关

  // Rebalancing
  drift_threshold: 0.05,           // 偏离5%触发再平衡
  emergency_drift: 0.10,           // 偏离10%紧急再平衡

  // CFA L3: Risk-free rate
  risk_free_rate: 0.04,            // 4% (10Y Treasury)
};

// Sector volatility estimates (annualized, from historical data)
const SECTOR_VOLATILITY: Record<string, number> = {
  'Technology': 0.28,
  'Semiconductors': 0.35,
  'Healthcare': 0.22,
  'Financials': 0.24,
  'Consumer Cyclical': 0.25,
  'Consumer Defensive': 0.15,
  'Industrials': 0.22,
  'Energy': 0.32,
  'Materials': 0.25,
  'Utilities': 0.16,
  'Real Estate': 0.22,
  'Communication Services': 0.26,
};

// === Portfolio Risk Engine ===

class PortfolioRisk {

  /**
   * 主入口: 计算组合配置建议
   */
  calculateAllocation(
    scores: WeeklyScore[],
    valuations: ValuationResult[],
    currentWeights?: Map<string, number>
  ): PortfolioAllocation {
    // Step 1: Calculate position sizes
    const positions = this.calculatePositionSizes(scores, valuations);

    // Step 2: Apply risk constraints
    const constrainedPositions = this.applyRiskConstraints(positions);

    // Step 3: Calculate risk budget
    const companies = scores.map(s => ({
      ticker: s.ticker,
      sector: this.inferSector(s.ticker),
    }));
    const riskBudget = this.calculateRiskBudget(constrainedPositions, companies);

    // Step 4: Generate rebalance signals
    const rebalanceSignals = currentWeights
      ? this.generateRebalanceSignals(constrainedPositions, currentWeights)
      : [];

    // Step 5: Overall assessment
    const assessment = this.generateAssessment(constrainedPositions, riskBudget);

    return {
      positions: constrainedPositions,
      risk_budget: riskBudget,
      rebalance_signals: rebalanceSignals,
      portfolio_metrics: null, // Requires historical returns
      overall_assessment: assessment,
    };
  }

  // === Position Sizing (CFA L3 + Kelly Criterion) ===

  private calculatePositionSizes(
    scores: WeeklyScore[],
    valuations: ValuationResult[]
  ): PositionSize[] {
    const valMap = new Map(valuations.map(v => [v.ticker, v]));

    return scores.map(score => {
      const val = valMap.get(score.ticker);

      // Kelly Criterion: f* = (bp - q) / b
      // Where: b=odds, p=prob(win), q=prob(lose)
      // Simplified: use score as win probability proxy
      const winProb = Math.min(0.80, Math.max(0.20, score.overall_score / 100));
      const lossProb = 1 - winProb;

      // Odds: expected gain / expected loss (use valuation MoS as proxy)
      const mos = val?.margin_of_safety || 0;
      const expectedGain = Math.max(0.10, 0.15 + mos * 0.5); // 10-40% upside
      const expectedLoss = Math.max(0.05, 0.20 - mos * 0.3); // 5-35% downside
      const odds = expectedGain / expectedLoss;

      const kellyFull = Math.max(0, (odds * winProb - lossProb) / odds);
      const kellyHalf = kellyFull * RISK_PARAMS.kelly_fraction;

      // Conviction level
      const conviction = score.overall_score >= 70 && (val?.valuation_zone === 'deep_value' || val?.valuation_zone === 'value')
        ? 'high'
        : score.overall_score >= 55
          ? 'medium'
          : 'low';

      // Recommended weight (bounded by conviction)
      const maxByConviction = conviction === 'high' ? 0.10 : conviction === 'medium' ? 0.06 : 0.03;
      const recommended = Math.min(kellyHalf, maxByConviction);

      const rationale = `Score=${score.overall_score}, MoS=${(mos * 100).toFixed(0)}%, ` +
        `Kelly=${(kellyFull * 100).toFixed(1)}%, Zone=${val?.valuation_zone || 'N/A'}`;

      return {
        ticker: score.ticker,
        recommended_weight: Math.round(recommended * 1000) / 1000,
        max_weight: RISK_PARAMS.max_single_position,
        kelly_full: Math.round(kellyFull * 1000) / 1000,
        kelly_half: Math.round(kellyHalf * 1000) / 1000,
        conviction_level: conviction,
        size_rationale: rationale,
      };
    });
  }

  // === Risk Constraints (CFA L3: IPS constraints) ===

  private applyRiskConstraints(positions: PositionSize[]): PositionSize[] {
    // 1. Cap individual positions
    let result = positions.map(p => ({
      ...p,
      recommended_weight: Math.min(p.recommended_weight, RISK_PARAMS.max_single_position),
    }));

    // 2. Enforce minimum position count
    const nonZero = result.filter(p => p.recommended_weight > 0.01);
    if (nonZero.length < RISK_PARAMS.min_positions && result.length >= RISK_PARAMS.min_positions) {
      // Redistribute to ensure minimum diversification
      const minWeight = 0.02; // 2% minimum
      const sorted = [...result].sort((a, b) => b.recommended_weight - a.recommended_weight);
      for (let i = 0; i < Math.min(RISK_PARAMS.min_positions, sorted.length); i++) {
        if (sorted[i].recommended_weight < minWeight) {
          sorted[i].recommended_weight = minWeight;
        }
      }
      result = sorted;
    }

    // 3. Normalize weights to sum to 1.0 (or less if cash position desired)
    const totalWeight = result.reduce((s, p) => s + p.recommended_weight, 0);
    if (totalWeight > 1.0) {
      const scale = 0.95 / totalWeight; // Leave 5% cash buffer
      result = result.map(p => ({
        ...p,
        recommended_weight: Math.round(p.recommended_weight * scale * 1000) / 1000,
      }));
    }

    // 4. Cap max positions
    if (result.length > RISK_PARAMS.max_positions) {
      result = result
        .sort((a, b) => b.recommended_weight - a.recommended_weight)
        .slice(0, RISK_PARAMS.max_positions);
    }

    return result;
  }

  // === Risk Budget Calculation ===

  private calculateRiskBudget(
    positions: PositionSize[],
    companies: Array<{ ticker: string; sector: string }>
  ): RiskBudget {
    const sectorMap = new Map(companies.map(c => [c.ticker, c.sector]));

    // Sector weights
    const sectorWeights: Record<string, number> = {};
    for (const p of positions) {
      const sector = sectorMap.get(p.ticker) || 'Unknown';
      sectorWeights[sector] = (sectorWeights[sector] || 0) + p.recommended_weight;
    }

    // HHI concentration
    const weights = positions.map(p => p.recommended_weight * 100); // as percentages
    const hhi = weights.reduce((sum, w) => sum + w * w, 0);

    // Portfolio volatility estimate (simplified: weighted average sector vol)
    let portfolioVol = 0;
    for (const p of positions) {
      const sector = sectorMap.get(p.ticker) || 'Unknown';
      const vol = SECTOR_VOLATILITY[sector] || 0.25;
      portfolioVol += p.recommended_weight * vol;
    }
    // Diversification benefit: reduce by sqrt(N) / N factor
    const n = positions.filter(p => p.recommended_weight > 0.01).length;
    const diversificationBenefit = n > 1 ? 0.60 + 0.40 * (1 / Math.sqrt(n)) : 1.0;
    portfolioVol *= diversificationBenefit;

    // 95% VaR (parametric, CFA L2: VaR = portfolio_value * Z * sigma * sqrt(t))
    const var95 = Math.round(portfolioVol * 1.645 / Math.sqrt(252) * 10000) / 10000;

    // Estimated max drawdown (rough: 3x daily VaR * sqrt(20 days))
    const maxDD = -Math.min(0.5, var95 * 3 * Math.sqrt(20));

    // Risk signals
    const signals: string[] = [];
    if (hhi > RISK_PARAMS.concentration_hhi_limit) {
      signals.push(`CFA: HHI=${Math.round(hhi)}>1500, 持仓过度集中`);
    }
    for (const [sector, weight] of Object.entries(sectorWeights)) {
      if (weight > RISK_PARAMS.max_sector_weight) {
        signals.push(`CFA: ${sector}权重${(weight * 100).toFixed(0)}%>30%, 超行业限制`);
      }
    }
    if (var95 > RISK_PARAMS.max_daily_var_95) {
      signals.push(`CFA: 日VaR=${(var95 * 100).toFixed(2)}%>2.5%, 风险预算超标`);
    }
    if (maxDD < RISK_PARAMS.max_portfolio_drawdown) {
      signals.push(`CFA: 预估最大回撤${(maxDD * 100).toFixed(0)}%超限`);
    }
    if (n < RISK_PARAMS.min_positions) {
      signals.push(`CFA: 仅${n}只持仓<8只最低要求, 分散不足`);
    }

    // Total risk used
    const riskUsed = Math.min(1.0, (var95 / RISK_PARAMS.max_daily_var_95) * 0.5 +
      (hhi / (RISK_PARAMS.concentration_hhi_limit * 2)) * 0.3 +
      (Math.abs(maxDD) / Math.abs(RISK_PARAMS.max_portfolio_drawdown)) * 0.2);

    return {
      total_risk_used: Math.round(riskUsed * 100) / 100,
      sector_weights: sectorWeights,
      concentration_hhi: Math.round(hhi),
      max_drawdown_estimate: Math.round(maxDD * 100) / 100,
      var_95: var95,
      risk_signals: signals,
    };
  }

  // === Rebalancing (CFA L3: threshold-based) ===

  private generateRebalanceSignals(
    targets: PositionSize[],
    currentWeights: Map<string, number>
  ): RebalanceSignal[] {
    const signals: RebalanceSignal[] = [];

    for (const target of targets) {
      const current = currentWeights.get(target.ticker) || 0;
      const drift = target.recommended_weight - current;

      if (Math.abs(drift) < RISK_PARAMS.drift_threshold) continue;

      const urgency: RebalanceSignal['urgency'] =
        Math.abs(drift) > RISK_PARAMS.emergency_drift ? 'immediate' :
        Math.abs(drift) > RISK_PARAMS.drift_threshold * 1.5 ? 'next_session' :
        'week_end';

      signals.push({
        ticker: target.ticker,
        current_weight: current,
        target_weight: target.recommended_weight,
        action: drift > 0 ? 'buy' : 'sell',
        urgency,
        reason: `Drift: ${(drift * 100).toFixed(1)}% (${target.conviction_level} conviction)`,
      });
    }

    // Check for positions to exit (not in targets)
    for (const [ticker, weight] of currentWeights) {
      if (weight > 0.01 && !targets.find(t => t.ticker === ticker)) {
        signals.push({
          ticker,
          current_weight: weight,
          target_weight: 0,
          action: 'sell',
          urgency: 'next_session',
          reason: 'Position removed from target allocation',
        });
      }
    }

    return signals.sort((a, b) => {
      const urgencyOrder = { immediate: 0, next_session: 1, week_end: 2 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });
  }

  // === Performance Metrics (CFA L3: Performance Evaluation) ===

  calculateMetrics(returns: number[], benchmarkReturns?: number[]): PortfolioMetrics {
    if (returns.length === 0) {
      return { sharpe_ratio: 0, sortino_ratio: 0, information_ratio: 0,
               max_drawdown: 0, calmar_ratio: 0, win_rate: 0 };
    }

    const rf = RISK_PARAMS.risk_free_rate / 252; // Daily risk-free
    const n = returns.length;

    // Mean and std dev
    const mean = returns.reduce((s, r) => s + r, 0) / n;
    const variance = returns.reduce((s, r) => s + (r - mean) ** 2, 0) / (n - 1);
    const stddev = Math.sqrt(variance);

    // Sharpe Ratio (CFA L3: risk-adjusted return)
    const annualReturn = mean * 252;
    const annualVol = stddev * Math.sqrt(252);
    const sharpe = annualVol > 0 ? (annualReturn - RISK_PARAMS.risk_free_rate) / annualVol : 0;

    // Sortino Ratio (downside deviation only)
    const downsideReturns = returns.filter(r => r < rf);
    const downsideVar = downsideReturns.length > 0
      ? downsideReturns.reduce((s, r) => s + (r - rf) ** 2, 0) / downsideReturns.length
      : 0;
    const downsideDev = Math.sqrt(downsideVar) * Math.sqrt(252);
    const sortino = downsideDev > 0 ? (annualReturn - RISK_PARAMS.risk_free_rate) / downsideDev : 0;

    // Max Drawdown
    let peak = 1;
    let maxDD = 0;
    let cumReturn = 1;
    for (const r of returns) {
      cumReturn *= (1 + r);
      peak = Math.max(peak, cumReturn);
      const dd = (cumReturn - peak) / peak;
      maxDD = Math.min(maxDD, dd);
    }

    // Calmar Ratio
    const calmar = maxDD !== 0 ? annualReturn / Math.abs(maxDD) : 0;

    // Information Ratio (if benchmark available)
    let ir = 0;
    if (benchmarkReturns && benchmarkReturns.length === returns.length) {
      const activeReturns = returns.map((r, i) => r - benchmarkReturns[i]);
      const activeMean = activeReturns.reduce((s, r) => s + r, 0) / n;
      const activeVar = activeReturns.reduce((s, r) => s + (r - activeMean) ** 2, 0) / (n - 1);
      const trackingError = Math.sqrt(activeVar) * Math.sqrt(252);
      ir = trackingError > 0 ? (activeMean * 252) / trackingError : 0;
    }

    // Win Rate
    const wins = returns.filter(r => r > 0).length;
    const winRate = wins / n;

    return {
      sharpe_ratio: Math.round(sharpe * 100) / 100,
      sortino_ratio: Math.round(sortino * 100) / 100,
      information_ratio: Math.round(ir * 100) / 100,
      max_drawdown: Math.round(maxDD * 10000) / 10000,
      calmar_ratio: Math.round(calmar * 100) / 100,
      win_rate: Math.round(winRate * 100) / 100,
    };
  }

  // === Assessment ===

  private generateAssessment(positions: PositionSize[], budget: RiskBudget): string {
    const parts: string[] = [];

    const highConviction = positions.filter(p => p.conviction_level === 'high');
    const totalWeight = positions.reduce((s, p) => s + p.recommended_weight, 0);
    const cashWeight = Math.max(0, 1 - totalWeight);

    parts.push(`Portfolio: ${positions.length}只 | 现金${(cashWeight * 100).toFixed(0)}%`);

    if (highConviction.length > 0) {
      parts.push(`高确信: ${highConviction.map(p => p.ticker).join(',')} (${highConviction.length}只)`);
    }

    if (budget.risk_signals.length > 0) {
      parts.push(`风险警告: ${budget.risk_signals.length}个`);
    }

    // CFA L3 assessment
    if (budget.total_risk_used > 0.80) {
      parts.push('CFA建议: 风险预算接近上限,考虑减仓或对冲');
    } else if (budget.total_risk_used < 0.30) {
      parts.push('CFA建议: 风险预算充裕,可考虑增加敞口');
    }

    return parts.join(' | ');
  }

  // === Helper ===

  private inferSector(ticker: string): string {
    // Quick sector inference from known tickers
    const sectorMap: Record<string, string> = {
      LRCX: 'Semiconductors', AMAT: 'Semiconductors', KLAC: 'Semiconductors',
      ASML: 'Semiconductors', NVDA: 'Semiconductors', AMD: 'Semiconductors',
      TSM: 'Semiconductors', MU: 'Semiconductors', INTC: 'Semiconductors',
      AAPL: 'Technology', MSFT: 'Technology', GOOG: 'Technology',
      AMZN: 'Consumer Cyclical', TSLA: 'Consumer Cyclical',
      JPM: 'Financials', BAC: 'Financials', GS: 'Financials',
      XOM: 'Energy', CVX: 'Energy', COP: 'Energy',
      JNJ: 'Healthcare', UNH: 'Healthcare', PFE: 'Healthcare',
      PG: 'Consumer Defensive', KO: 'Consumer Defensive', WMT: 'Consumer Defensive',
      CAT: 'Industrials', HON: 'Industrials', BA: 'Industrials',
    };
    return sectorMap[ticker] || 'Unknown';
  }
}

export const portfolioRisk = new PortfolioRisk();
export { PortfolioRisk };
