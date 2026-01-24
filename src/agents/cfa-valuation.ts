/**
 * CFA Valuation Agent
 * 基于CFA L2 Equity Valuation + Financial Analysis curriculum
 *
 * 三层估值框架:
 * 1. Relative Valuation (行业相对估值)
 * 2. Quality of Earnings (盈余质量)
 * 3. Intrinsic Value Range (内在价值区间 — 简化DCF)
 *
 * 输出: ValuationResult with composite score + margin of safety
 */

import type { Company } from '../types/index.js';

// === Types ===

export interface ValuationResult {
  ticker: string;
  composite_score: number;          // 0-100 综合估值得分
  relative_score: number;           // 0-100 相对估值
  quality_score: number;            // 0-100 盈余质量
  intrinsic_value_score: number;    // 0-100 内在价值vs当前价格
  factor_exposure: FactorExposure;
  margin_of_safety: number;         // -50% to +100% (正=便宜, 负=贵)
  valuation_zone: 'deep_value' | 'value' | 'fair' | 'overvalued' | 'extreme_overvalued';
  signals: string[];                // 估值信号列表
}

export interface FactorExposure {
  size: number;        // -1 to 1 (negative=large cap, positive=small cap)
  value: number;       // -1 to 1 (negative=growth, positive=value)
  profitability: number; // -1 to 1 (negative=low profit, positive=high profit)
  investment: number;  // -1 to 1 (negative=aggressive, positive=conservative)
  momentum: number;    // -1 to 1 (negative=loser, positive=winner)
}

export interface RelativeMetrics {
  pe_vs_sector: number;        // 相对行业PE (1.0=平均, <0.8=便宜)
  ev_ebit_vs_sector: number;   // 相对行业EV/EBIT
  peg_ratio: number | null;    // PEG ratio (PE/Growth)
  earnings_yield: number;      // 1/PE (CFA: yield inversion for comparison)
  fcf_yield: number | null;    // FCF/MarketCap
}

export interface QualityMetrics {
  piotroski_f_score: number;   // 0-9 Piotroski F-Score
  altman_z_score: number;      // Z-Score (>2.99=safe, <1.81=distress)
  accruals_quality: number;    // 0-100 (higher=more cash-based earnings)
  roic_vs_wacc: number;        // ROIC - WACC spread (positive=value creation)
  margin_stability: number;    // 0-100 margin consistency
}

// === Sector Average Benchmarks (CFA L2: use sector medians) ===

const SECTOR_PE_MEDIANS: Record<string, number> = {
  'Technology': 28,
  'Semiconductors': 22,
  'Healthcare': 20,
  'Financials': 14,
  'Consumer Cyclical': 18,
  'Consumer Defensive': 22,
  'Industrials': 20,
  'Energy': 12,
  'Materials': 15,
  'Utilities': 17,
  'Real Estate': 35,
  'Communication Services': 20,
};

const SECTOR_EV_EBIT_MEDIANS: Record<string, number> = {
  'Technology': 22,
  'Semiconductors': 18,
  'Healthcare': 16,
  'Financials': 12,
  'Consumer Cyclical': 14,
  'Consumer Defensive': 18,
  'Industrials': 15,
  'Energy': 8,
  'Materials': 10,
  'Utilities': 14,
  'Real Estate': 25,
  'Communication Services': 15,
};

// CFA L2: WACC by sector (simplified, industry average)
const SECTOR_WACC: Record<string, number> = {
  'Technology': 0.10,
  'Semiconductors': 0.11,
  'Healthcare': 0.09,
  'Financials': 0.08,
  'Consumer Cyclical': 0.09,
  'Consumer Defensive': 0.07,
  'Industrials': 0.08,
  'Energy': 0.10,
  'Materials': 0.09,
  'Utilities': 0.06,
  'Real Estate': 0.07,
  'Communication Services': 0.09,
};

// === CFA Valuation Engine ===

class CFAValuation {
  // External data injection (from FMP or mock)
  private financialScores: Map<string, { piotroski: number; altmanZ: number }> = new Map();
  private sectorPEs: Map<string, number> = new Map();

  /**
   * 注入 FMP Financial Scores (Piotroski F-Score, Altman Z-Score)
   */
  setFinancialScores(scores: Map<string, { piotroski: number; altmanZ: number }>): void {
    this.financialScores = scores;
  }

  /**
   * 注入实时行业PE (来自FMP getSectorPE API)
   */
  setSectorPEs(pes: Map<string, number>): void {
    this.sectorPEs = pes;
  }

  /**
   * 主估值入口: 计算综合估值得分
   */
  valuate(company: Company): ValuationResult {
    const relative = this.calculateRelativeScore(company);
    const quality = this.calculateQualityScore(company);
    const intrinsic = this.calculateIntrinsicValueScore(company);
    const factors = this.calculateFactorExposure(company);

    // CFA L2 权重: 相对估值40% + 质量30% + 内在价值30%
    const composite = Math.round(
      relative * 0.40 +
      quality * 0.30 +
      intrinsic * 0.30
    );

    const marginOfSafety = this.estimateMarginOfSafety(company);
    const zone = this.classifyValuationZone(composite, marginOfSafety);
    const signals = this.generateSignals(company, composite, marginOfSafety, factors);

    return {
      ticker: company.ticker,
      composite_score: Math.max(0, Math.min(100, composite)),
      relative_score: relative,
      quality_score: quality,
      intrinsic_value_score: intrinsic,
      factor_exposure: factors,
      margin_of_safety: marginOfSafety,
      valuation_zone: zone,
      signals,
    };
  }

  /**
   * 批量估值
   */
  valuateAll(companies: Company[]): ValuationResult[] {
    return companies.map(c => this.valuate(c));
  }

  // === Layer 1: Relative Valuation (CFA L2 Ch. 28-30) ===

  private calculateRelativeScore(company: Company): number {
    let score = 50; // neutral baseline
    const pe = company.pe_ttm;
    const evEbit = company.ev_ebit_ttm;
    const growth = company.revenue_growth_yoy;

    // 1. PE vs Sector median
    const sectorPE = this.getSectorPE(company.sector);
    if (pe !== undefined && pe > 0 && sectorPE > 0) {
      const peRatio = pe / sectorPE;
      // CFA: relative PE < 0.7 = undervalued, > 1.5 = overvalued
      if (peRatio < 0.5) score += 30;
      else if (peRatio < 0.7) score += 20;
      else if (peRatio < 0.9) score += 10;
      else if (peRatio > 2.0) score -= 30;
      else if (peRatio > 1.5) score -= 20;
      else if (peRatio > 1.2) score -= 10;
    } else if (pe !== undefined && pe < 0) {
      // 亏损公司: PE无意义,扣分
      score -= 15;
    }

    // 2. EV/EBIT vs Sector median
    const sectorEvEbit = SECTOR_EV_EBIT_MEDIANS[company.sector] || 15;
    if (evEbit !== undefined && evEbit > 0) {
      const evRatio = evEbit / sectorEvEbit;
      if (evRatio < 0.5) score += 15;
      else if (evRatio < 0.8) score += 8;
      else if (evRatio > 2.0) score -= 15;
      else if (evRatio > 1.3) score -= 8;
    }

    // 3. PEG Ratio (CFA L2: PEG < 1 = undervalued relative to growth)
    if (pe !== undefined && pe > 0 && growth !== undefined && growth > 0.05) {
      const peg = pe / (growth * 100); // growth as percentage
      if (peg < 0.5) score += 15;
      else if (peg < 1.0) score += 8;
      else if (peg > 3.0) score -= 15;
      else if (peg > 2.0) score -= 8;
    }

    // 4. Earnings Yield check (CFA: compare to risk-free rate)
    if (pe !== undefined && pe > 0) {
      const earningsYield = 1 / pe;
      const riskFreeRate = 0.04; // ~4% (current 10Y Treasury proxy)
      const equityRiskPremium = earningsYield - riskFreeRate;
      if (equityRiskPremium > 0.06) score += 10; // Very attractive yield
      else if (equityRiskPremium < 0) score -= 10; // Earnings yield < risk-free
    }

    return Math.max(0, Math.min(100, score));
  }

  // === Layer 2: Quality of Earnings (CFA L2 Ch. 18-19) ===

  private calculateQualityScore(company: Company): number {
    let score = 50; // neutral baseline

    // 1. Piotroski F-Score (CFA: 0-9, higher = better quality)
    const fmpScores = this.financialScores.get(company.ticker);
    if (fmpScores) {
      const piotroski = fmpScores.piotroski;
      if (piotroski >= 8) score += 25;       // Strong
      else if (piotroski >= 6) score += 15;  // Good
      else if (piotroski >= 4) score += 5;   // Average
      else if (piotroski <= 2) score -= 25;  // Distress signal
      else if (piotroski <= 3) score -= 10;  // Weak

      // 2. Altman Z-Score (CFA: bankruptcy prediction)
      const z = fmpScores.altmanZ;
      if (z > 3.0) score += 15;       // Safe
      else if (z > 2.0) score += 5;   // Gray zone
      else if (z < 1.81) score -= 25; // Distress
      else if (z < 2.0) score -= 10;  // At risk
    }

    // 3. Gross Margin stability/quality
    if (company.gross_margin !== undefined) {
      if (company.gross_margin > 0.60) score += 15;      // High-quality business
      else if (company.gross_margin > 0.40) score += 8;  // Good
      else if (company.gross_margin < 0.20) score -= 15; // Commodity/low-quality
      else if (company.gross_margin < 0.30) score -= 5;
    }

    // 4. ROIC quality (CFA L2: economic value creation = ROIC > WACC)
    if (company.roic !== undefined) {
      const wacc = SECTOR_WACC[company.sector] || 0.09;
      const spread = company.roic - wacc;
      if (spread > 0.15) score += 15;       // Strong value creator
      else if (spread > 0.05) score += 8;   // Good
      else if (spread < -0.05) score -= 15; // Value destroyer
      else if (spread < 0) score -= 5;      // Below WACC
    }

    // 5. Revenue growth quality (CFA: sustainable growth rate = ROE × retention)
    if (company.revenue_growth_yoy !== undefined) {
      const growth = company.revenue_growth_yoy;
      if (growth > 0.30) score += 5;   // High growth (quality check needed)
      else if (growth > 0.10) score += 8; // Healthy growth
      else if (growth < -0.20) score -= 10; // Severe decline
      else if (growth < -0.05) score -= 3;  // Mild decline
    }

    return Math.max(0, Math.min(100, score));
  }

  // === Layer 3: Intrinsic Value (Simplified DCF — CFA L2 Ch. 26-27) ===

  private calculateIntrinsicValueScore(company: Company): number {
    let score = 50;
    const pe = company.pe_ttm;
    const growth = company.revenue_growth_yoy;
    const roic = company.roic;

    if (pe === undefined || pe <= 0) return score; // Can't value without PE

    // Simplified 2-stage DCF logic:
    // Stage 1: Near-term (5 years) growth at current rate
    // Stage 2: Terminal value at GDP growth rate (3%)
    //
    // Instead of full DCF, use "justified PE" approach (CFA L2):
    // Justified P/E = (1 - b) × (1 + g) / (r - g)
    // Where b=retention, g=growth, r=required return

    const wacc = SECTOR_WACC[company.sector] || 0.09;
    const nearTermGrowth = Math.min(growth || 0.05, 0.30); // Cap at 30%
    const terminalGrowth = 0.03; // Long-term GDP

    // CFA justified trailing P/E approximation
    const retentionRatio = 0.70; // Assume 70% retention (30% payout)
    const payoutRatio = 1 - retentionRatio;

    // Two-stage justified PE
    const stage1Years = 5;
    let pvStage1 = 0;
    for (let i = 1; i <= stage1Years; i++) {
      const epsFactor = Math.pow(1 + nearTermGrowth, i);
      pvStage1 += (payoutRatio * epsFactor) / Math.pow(1 + wacc, i);
    }

    // Terminal value (Gordon Growth)
    const terminalEPS = Math.pow(1 + nearTermGrowth, stage1Years) * (1 + terminalGrowth);
    const terminalPE = payoutRatio / (wacc - terminalGrowth);
    const pvTerminal = (terminalEPS * terminalPE) / Math.pow(1 + wacc, stage1Years);

    const justifiedPE = pvStage1 + pvTerminal;

    // Compare actual PE to justified PE
    if (justifiedPE > 0) {
      const ratio = pe / justifiedPE;
      if (ratio < 0.5) score += 35;       // Deep value (actual PE << justified)
      else if (ratio < 0.7) score += 25;
      else if (ratio < 0.9) score += 15;
      else if (ratio > 2.0) score -= 30;  // Extreme overvaluation
      else if (ratio > 1.5) score -= 20;
      else if (ratio > 1.2) score -= 10;
    }

    // ROIC > WACC confirmation (CFA: value creation check)
    if (roic !== undefined) {
      if (roic > wacc + 0.10) score += 10;  // Strong moat
      else if (roic < wacc) score -= 10;     // Value destruction
    }

    return Math.max(0, Math.min(100, score));
  }

  // === Factor Exposure (Fama-French 5-Factor — CFA L2 Ch. 56) ===

  calculateFactorExposure(company: Company): FactorExposure {
    // Size factor (SMB): small cap = positive
    let size = 0;
    if (company.market_cap !== undefined) {
      if (company.market_cap > 200e9) size = -1.0;       // Mega cap
      else if (company.market_cap > 50e9) size = -0.5;   // Large cap
      else if (company.market_cap > 10e9) size = 0;      // Mid cap
      else if (company.market_cap > 2e9) size = 0.5;     // Small cap
      else size = 1.0;                                     // Micro cap
    }

    // Value factor (HML): high book-to-market = positive
    let value = 0;
    const pe = company.pe_ttm;
    if (pe !== undefined && pe > 0) {
      if (pe < 12) value = 1.0;         // Deep value
      else if (pe < 18) value = 0.5;    // Value
      else if (pe < 25) value = 0;      // Blend
      else if (pe < 40) value = -0.5;   // Growth
      else value = -1.0;                 // High growth/speculative
    }

    // Profitability factor (RMW): high profitability = positive
    let profitability = 0;
    if (company.gross_margin !== undefined) {
      if (company.gross_margin > 0.60) profitability = 1.0;
      else if (company.gross_margin > 0.45) profitability = 0.5;
      else if (company.gross_margin > 0.30) profitability = 0;
      else if (company.gross_margin > 0.15) profitability = -0.5;
      else profitability = -1.0;
    }
    // ROIC enhancement
    if (company.roic !== undefined) {
      if (company.roic > 0.20) profitability = Math.min(1.0, profitability + 0.3);
      else if (company.roic < 0) profitability = Math.max(-1.0, profitability - 0.3);
    }

    // Investment factor (CMA): conservative investment = positive
    // Proxy: revenue growth rate (aggressive growers invest more)
    let investment = 0;
    if (company.revenue_growth_yoy !== undefined) {
      const g = company.revenue_growth_yoy;
      if (g > 0.30) investment = -0.8;     // Aggressive
      else if (g > 0.15) investment = -0.3;
      else if (g > 0.05) investment = 0.2; // Moderate
      else if (g > -0.05) investment = 0.5; // Conservative
      else investment = 0.8;                 // Contracting (potentially value trap)
    }

    // Momentum factor: approximate from growth trajectory
    // (In production, would use 12-1 month price return)
    let momentum = 0;
    if (company.revenue_growth_yoy !== undefined) {
      const g = company.revenue_growth_yoy;
      if (g > 0.25) momentum = 0.8;
      else if (g > 0.10) momentum = 0.4;
      else if (g > 0) momentum = 0.1;
      else if (g > -0.10) momentum = -0.3;
      else momentum = -0.7;
    }

    return {
      size: Math.round(size * 100) / 100,
      value: Math.round(value * 100) / 100,
      profitability: Math.round(profitability * 100) / 100,
      investment: Math.round(investment * 100) / 100,
      momentum: Math.round(momentum * 100) / 100,
    };
  }

  // === Margin of Safety (CFA L2: Graham/Buffett concept) ===

  private estimateMarginOfSafety(company: Company): number {
    const pe = company.pe_ttm;
    if (pe === undefined || pe <= 0) return 0;

    const sectorPE = this.getSectorPE(company.sector);
    const growth = company.revenue_growth_yoy || 0;

    // Fair PE estimate (multiple methods averaged):
    // Method 1: Sector median
    const fairPE1 = sectorPE;
    // Method 2: Growth-adjusted (PEG=1.5 is fair)
    const fairPE2 = growth > 0.03 ? (growth * 100) * 1.5 : sectorPE;
    // Method 3: Quality-adjusted (high margin/ROIC deserves premium)
    const qualityPremium = (company.gross_margin || 0.30) > 0.50 ? 1.2 : 1.0;
    const fairPE3 = sectorPE * qualityPremium;

    const fairPE = (fairPE1 + fairPE2 + fairPE3) / 3;

    // Margin of Safety = (Fair Value - Current Price) / Current Price
    // Using PE as proxy: (fairPE - actualPE) / actualPE
    const mos = (fairPE - pe) / pe;
    return Math.round(mos * 100) / 100; // as decimal (-0.5 to +1.0)
  }

  // === Classification ===

  private classifyValuationZone(
    composite: number,
    marginOfSafety: number
  ): ValuationResult['valuation_zone'] {
    if (composite >= 80 || marginOfSafety > 0.50) return 'deep_value';
    if (composite >= 65 || marginOfSafety > 0.20) return 'value';
    if (composite >= 40) return 'fair';
    if (composite >= 25) return 'overvalued';
    return 'extreme_overvalued';
  }

  // === Signal Generation ===

  private generateSignals(
    company: Company,
    composite: number,
    mos: number,
    factors: FactorExposure
  ): string[] {
    const signals: string[] = [];

    // Valuation signals
    if (mos > 0.40) signals.push('CFA: 安全边际>40%, Graham标准深度低估');
    else if (mos > 0.20) signals.push('CFA: 安全边际>20%, 估值偏低');
    else if (mos < -0.30) signals.push('CFA: 负安全边际>30%, 严重高估');
    else if (mos < -0.15) signals.push('CFA: 负安全边际, 估值偏高');

    // Quality signals
    const fmpScores = this.financialScores.get(company.ticker);
    if (fmpScores) {
      if (fmpScores.piotroski >= 8) signals.push('CFA: Piotroski≥8, 财务质量优秀');
      if (fmpScores.piotroski <= 2) signals.push('CFA: Piotroski≤2, 财务困境信号');
      if (fmpScores.altmanZ < 1.81) signals.push('CFA: Altman Z<1.81, 破产风险区');
    }

    // Factor signals (CFA L2: factor tilts)
    if (factors.value > 0.5 && factors.profitability > 0.5) {
      signals.push('CFA: Value+Profitability因子双击 (历史超额收益最高组合)');
    }
    if (factors.value < -0.5 && factors.momentum < -0.5) {
      signals.push('CFA: Growth+Negative Momentum = 风险最高组合');
    }
    if (factors.size > 0.5 && factors.value > 0.5) {
      signals.push('CFA: Small Value效应 (学术证据最强的alpha来源)');
    }

    // ROIC vs WACC (CFA: economic value added)
    if (company.roic !== undefined) {
      const wacc = SECTOR_WACC[company.sector] || 0.09;
      if (company.roic > wacc + 0.15) signals.push('CFA: ROIC显著超WACC, 经济护城河明确');
      if (company.roic < wacc) signals.push('CFA: ROIC<WACC, 正在毁灭股东价值');
    }

    // PEG check
    const pe = company.pe_ttm;
    const growth = company.revenue_growth_yoy;
    if (pe && pe > 0 && growth && growth > 0.05) {
      const peg = pe / (growth * 100);
      if (peg < 0.8) signals.push(`CFA: PEG=${peg.toFixed(1)}<1, 增长未被充分定价`);
      if (peg > 3.0) signals.push(`CFA: PEG=${peg.toFixed(1)}>3, 增长溢价过度`);
    }

    return signals;
  }

  // === Helpers ===

  private getSectorPE(sector: string): number {
    return this.sectorPEs.get(sector) || SECTOR_PE_MEDIANS[sector] || 18;
  }

  /**
   * CFA L3: 组合估值评估 — 整体组合的估值状态
   */
  assessPortfolioValuation(results: ValuationResult[]): {
    avg_composite: number;
    avg_margin_of_safety: number;
    zone_distribution: Record<string, number>;
    top_value_picks: string[];
    overvalued_warnings: string[];
    factor_tilt: FactorExposure;
  } {
    if (results.length === 0) {
      return {
        avg_composite: 50,
        avg_margin_of_safety: 0,
        zone_distribution: {},
        top_value_picks: [],
        overvalued_warnings: [],
        factor_tilt: { size: 0, value: 0, profitability: 0, investment: 0, momentum: 0 },
      };
    }

    const avg_composite = Math.round(
      results.reduce((s, r) => s + r.composite_score, 0) / results.length
    );
    const avg_margin_of_safety = Math.round(
      results.reduce((s, r) => s + r.margin_of_safety, 0) / results.length * 100
    ) / 100;

    const zone_distribution: Record<string, number> = {};
    for (const r of results) {
      zone_distribution[r.valuation_zone] = (zone_distribution[r.valuation_zone] || 0) + 1;
    }

    const sorted = [...results].sort((a, b) => b.composite_score - a.composite_score);
    const top_value_picks = sorted
      .filter(r => r.valuation_zone === 'deep_value' || r.valuation_zone === 'value')
      .slice(0, 5)
      .map(r => r.ticker);

    const overvalued_warnings = results
      .filter(r => r.valuation_zone === 'extreme_overvalued')
      .map(r => `${r.ticker}: MoS=${(r.margin_of_safety * 100).toFixed(0)}%`);

    // Portfolio factor tilt (average)
    const n = results.length;
    const factor_tilt: FactorExposure = {
      size: Math.round(results.reduce((s, r) => s + r.factor_exposure.size, 0) / n * 100) / 100,
      value: Math.round(results.reduce((s, r) => s + r.factor_exposure.value, 0) / n * 100) / 100,
      profitability: Math.round(results.reduce((s, r) => s + r.factor_exposure.profitability, 0) / n * 100) / 100,
      investment: Math.round(results.reduce((s, r) => s + r.factor_exposure.investment, 0) / n * 100) / 100,
      momentum: Math.round(results.reduce((s, r) => s + r.factor_exposure.momentum, 0) / n * 100) / 100,
    };

    return {
      avg_composite,
      avg_margin_of_safety,
      zone_distribution,
      top_value_picks,
      overvalued_warnings,
      factor_tilt,
    };
  }
}

export const cfaValuation = new CFAValuation();
export { CFAValuation };
