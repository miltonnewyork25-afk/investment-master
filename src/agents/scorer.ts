/**
 * Scorer Agent
 * 基于三表（公司池、供应链边、评分配置）计算周度评分
 * - 无网络访问权限
 * - 仅基于本地数据打分排序
 */

import type {
  Company,
  SupplyChainEdge,
  WeeklyScore,
  ScoringConfig,
  EvidenceGrade
} from '../types/index.js';
import { getScoringConfig } from '../config/index.js';

class Scorer {
  private config: ScoringConfig;

  constructor() {
    this.config = getScoringConfig();
  }

  /**
   * 计算估值得分（0-100）
   * PE/EV_EBIT越低越好，但要避免负值（亏损公司）
   */
  private calculateValuationScore(company: Company): number {
    let score = 50; // 基准分

    const { pe_overvalued, pe_undervalued, ev_ebit_overvalued, gm_healthy, roic_good } = this.config.thresholds;

    // PE评分
    if (company.pe_ttm !== undefined) {
      if (company.pe_ttm < 0) {
        score -= 30; // 亏损公司扣分
      } else if (company.pe_ttm < pe_undervalued) {
        score += 25; // 低估值加分
      } else if (company.pe_ttm > pe_overvalued) {
        score -= 20; // 高估值扣分
      }
    }

    // EV/EBIT评分
    if (company.ev_ebit_ttm !== undefined) {
      if (company.ev_ebit_ttm < 0) {
        score -= 20;
      } else if (company.ev_ebit_ttm < 15) {
        score += 15;
      } else if (company.ev_ebit_ttm > ev_ebit_overvalued) {
        score -= 15;
      }
    }

    // 毛利率评分
    if (company.gross_margin !== undefined) {
      if (company.gross_margin >= gm_healthy) {
        score += 10;
      } else if (company.gross_margin < 0.25) {
        score -= 10;
      }
    }

    // ROIC评分
    if (company.roic !== undefined) {
      if (company.roic >= roic_good) {
        score += 10;
      } else if (company.roic < 0) {
        score -= 15;
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * 计算证据得分（0-100）
   * 基于供应链边的数量和质量
   */
  private calculateEvidenceScore(
    ticker: string,
    edges: SupplyChainEdge[],
    isSupplier: boolean
  ): number {
    // 找到与该公司相关的边
    const relevantEdges = edges.filter(e =>
      isSupplier ? e.supplier_ticker === ticker : e.customer_ticker === ticker
    );

    if (relevantEdges.length === 0) return 30; // 无证据基准分

    let score = 30;
    const weights = this.config.evidence_weights;

    for (const edge of relevantEdges) {
      const gradeWeight = weights[edge.evidence_grade];
      const confidenceBonus = edge.confidence * 10;
      score += (15 * gradeWeight) + confidenceBonus;
    }

    return Math.min(100, score);
  }

  /**
   * 计算动量得分（0-100）
   * 基于收入增长
   */
  private calculateMomentumScore(company: Company): number {
    let score = 50;

    if (company.revenue_growth_yoy !== undefined) {
      const growth = company.revenue_growth_yoy;

      if (growth > 0.5) score += 40;      // 50%+ 增长
      else if (growth > 0.2) score += 25; // 20-50% 增长
      else if (growth > 0.1) score += 15; // 10-20% 增长
      else if (growth > 0) score += 5;    // 正增长
      else if (growth > -0.1) score -= 10; // 轻微下滑
      else score -= 25;                    // 大幅下滑
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * 识别风险标志
   */
  private identifyRiskFlags(company: Company, edges: SupplyChainEdge[]): string[] {
    const flags: string[] = [];

    // 估值过热
    if (company.pe_ttm && company.pe_ttm > this.config.thresholds.pe_overvalued) {
      flags.push('估值过热');
    }

    // 亏损
    if (company.pe_ttm && company.pe_ttm < 0) {
      flags.push('当前亏损');
    }

    // 低毛利率
    if (company.gross_margin && company.gross_margin < 0.25) {
      flags.push('低毛利率');
    }

    // 客户集中度风险（供应商角度）
    const supplierEdges = edges.filter(e => e.supplier_ticker === company.ticker);
    if (supplierEdges.length === 1) {
      flags.push('客户集中度高');
    }

    // 证据不足
    const relatedEdges = edges.filter(
      e => e.supplier_ticker === company.ticker || e.customer_ticker === company.ticker
    );
    if (relatedEdges.length === 0) {
      flags.push('证据不足');
    }

    // 收入下滑
    if (company.revenue_growth_yoy && company.revenue_growth_yoy < -0.1) {
      flags.push('收入下滑');
    }

    return flags;
  }

  /**
   * 计算单个公司的周度评分
   */
  scoreCompany(
    company: Company,
    edges: SupplyChainEdge[],
    isUpstream: boolean
  ): Omit<WeeklyScore, 'rank'> {
    const valuationScore = this.calculateValuationScore(company);
    const evidenceScore = this.calculateEvidenceScore(company.ticker, edges, isUpstream);
    const momentumScore = this.calculateMomentumScore(company);

    const { valuation, evidence, momentum } = this.config.weights;

    const overallScore = Math.round(
      valuationScore * valuation +
      evidenceScore * evidence +
      momentumScore * momentum
    );

    const riskFlags = this.identifyRiskFlags(company, edges);

    const weekStart = this.getWeekStart();

    return {
      ticker: company.ticker,
      week_start: weekStart,
      overall_score: overallScore,
      valuation_score: Math.round(valuationScore),
      evidence_score: Math.round(evidenceScore),
      momentum_score: Math.round(momentumScore),
      risk_flags: riskFlags,
      config_version: this.config.version,
    };
  }

  /**
   * 批量计算并排序
   */
  scoreAndRank(
    companies: Company[],
    edges: SupplyChainEdge[],
    isUpstream: boolean
  ): WeeklyScore[] {
    const scores = companies.map(company =>
      this.scoreCompany(company, edges, isUpstream)
    );

    // 按总分降序排序
    scores.sort((a, b) => b.overall_score - a.overall_score);

    // 添加排名
    return scores.map((score, index) => ({
      ...score,
      rank: index + 1,
    }));
  }

  /**
   * 获取本周起始日期
   */
  private getWeekStart(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  /**
   * 获取当前评分配置
   */
  getConfig(): ScoringConfig {
    return this.config;
  }
}

export const scorer = new Scorer();
export { Scorer };
