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
  EvidenceGrade,
  CycleStage,
  PsychologyAdjustment
} from '../types/index.js';
import { getScoringConfig, getPsychologyConfig } from '../config/index.js';
import type { PsychologyConfig } from '../config/index.js';
import type { CPTIndex } from './sentiment-fetcher.js';

class Scorer {
  private config: ScoringConfig;
  private psychConfig: PsychologyConfig;
  private marketCPT: CPTIndex | null = null;

  constructor() {
    this.config = getScoringConfig();
    this.psychConfig = getPsychologyConfig();
  }

  /**
   * 注入市场CPT指数(由sentiment-fetcher提供)
   * 若设置了CPT，心理学修正将使用真实市场情绪数据
   */
  setMarketCPT(cpt: CPTIndex): void {
    this.marketCPT = cpt;
  }

  /**
   * 推断周期阶段（当Company未提供cycle_stage时）
   * 基于估值+动量的组合推断:
   *   - 低估值 + 负增长 = trough
   *   - 低估值 + 正增长 = early_recovery
   *   - 合理估值 + 强增长 = mid_cycle
   *   - 高估值 + 正/减速增长 = peak
   */
  private inferCycleStage(company: Company): CycleStage {
    if (company.cycle_stage) return company.cycle_stage;

    const pe = company.pe_ttm;
    const growth = company.revenue_growth_yoy;
    const { pe_undervalued, pe_overvalued } = this.config.thresholds;

    // 亏损(PE<0) + 负增长 = 底部
    if (pe !== undefined && pe < 0 && growth !== undefined && growth < 0) {
      return 'trough';
    }
    // 低PE + 负增长或微增 = 底部
    if (pe !== undefined && pe < pe_undervalued && growth !== undefined && growth < 0.05) {
      return 'trough';
    }
    // 低PE + 正增长 = 早期恢复
    if (pe !== undefined && pe < pe_undervalued && growth !== undefined && growth >= 0.05) {
      return 'early_recovery';
    }
    // 高PE + 正增长 = 顶部区域
    if (pe !== undefined && pe > pe_overvalued && growth !== undefined && growth > 0) {
      return 'peak';
    }
    // 高PE + 负增长 = 顶部(估值尚未修正)
    if (pe !== undefined && pe > pe_overvalued && growth !== undefined && growth <= 0) {
      return 'peak';
    }

    return 'mid_cycle';
  }

  /**
   * 计算心理学调整
   * 基于: 周期阶段修正 + 逆向信号 + 偏误检测
   */
  private calculatePsychologyAdjustment(
    company: Company,
    baseScore: number
  ): PsychologyAdjustment {
    const cycleStage = this.inferCycleStage(company);
    const biasWarnings: string[] = [];

    // --- 1. 周期阶段调整 ---
    const cycleAdj = this.psychConfig.cycle_adjustments[cycleStage];

    // --- 2. 逆向信号调整 ---
    // 优先使用外部CPT信号(来自sentiment-fetcher)，fallback到PE/Growth启发式
    let contrarianAdj = 0;
    let crowdSignal: PsychologyAdjustment['crowd_signal'] = 'neutral';

    const pe = company.pe_ttm;
    const growth = company.revenue_growth_yoy;

    if (this.marketCPT && this.marketCPT.data_quality !== 'fallback') {
      // === 使用真实市场情绪数据 ===
      crowdSignal = this.marketCPT.signal;
      if (crowdSignal === 'extreme_fear') {
        contrarianAdj = this.psychConfig.contrarian.bonus;
      } else if (crowdSignal === 'fear') {
        contrarianAdj = Math.round(this.psychConfig.contrarian.bonus * 0.5);
      } else if (crowdSignal === 'extreme_greed') {
        contrarianAdj = this.psychConfig.contrarian.penalty;
      } else if (crowdSignal === 'greed') {
        contrarianAdj = Math.round(this.psychConfig.contrarian.penalty * 0.5);
      }

      // 个股修正: 如果市场恐惧但个股PE极高，减弱逆向bonus
      if (crowdSignal === 'extreme_fear' && pe !== undefined && pe > 50) {
        contrarianAdj = Math.round(contrarianAdj * 0.5);
      }
      // 个股修正: 如果市场贪婪但个股PE极低(价值股)，减弱penalty
      if (crowdSignal === 'extreme_greed' && pe !== undefined && pe > 0 && pe < 15) {
        contrarianAdj = Math.round(contrarianAdj * 0.5);
      }
    } else {
      // === Fallback: 纯PE/Growth启发式 ===
      // 极度恐惧信号: 亏损(PE<0) + 收入大幅下滑 → 群体可能过度恐慌
      if (pe !== undefined && pe < 0 && growth !== undefined && growth < -0.2) {
        contrarianAdj = this.psychConfig.contrarian.bonus;
        crowdSignal = 'extreme_fear';
      }
      // 恐惧信号: 低PE + 负增长
      else if (pe !== undefined && pe < this.config.thresholds.pe_undervalued
        && growth !== undefined && growth < -0.1) {
        contrarianAdj = Math.round(this.psychConfig.contrarian.bonus * 0.5);
        crowdSignal = 'fear';
      }
      // 极度贪婪信号: 极高PE + 强增长 → 群体可能过度乐观
      else if (pe !== undefined && pe > 50 && growth !== undefined && growth > 0.3) {
        contrarianAdj = this.psychConfig.contrarian.penalty;
        crowdSignal = 'extreme_greed';
      }
      // 贪婪信号: 高PE + 正增长
      else if (pe !== undefined && pe > this.psychConfig.loss_aversion.hold_threshold
        && growth !== undefined && growth > 0.15) {
        contrarianAdj = Math.round(this.psychConfig.contrarian.penalty * 0.5);
        crowdSignal = 'greed';
      }
    }

    // --- 3. 偏误警告检测 ---

    // 锚定偏误警告: PE在历史极端区域
    if (pe !== undefined && pe > 60) {
      biasWarnings.push('锚定风险: PE极高,可能被历史高点锚定,实际估值已过热');
    }

    // 处置效应警告: 中等评分但处于底部 → 人们倾向过早卖出
    if (baseScore > 50 && baseScore < 70 && cycleStage === 'early_recovery') {
      biasWarnings.push('处置效应风险: 早期恢复阶段,不要因为小幅盈利就急于卖出');
    }

    // 沉没成本警告: 低评分在顶部区域 → 人们倾向不止损
    if (baseScore < 40 && cycleStage === 'peak') {
      biasWarnings.push('沉没成本风险: 估值过热+评分低,应考虑止损而非期望回本');
    }

    // 从众偏误警告: 高增长+高PE → 人们追涨
    if (growth !== undefined && growth > 0.3 && pe !== undefined && pe > 40) {
      biasWarnings.push('从众风险: 高增长+高估值吸引追涨资金,注意周期位置');
    }

    // FOMO警告: 中周期强增长 → 晚期进入风险
    if (cycleStage === 'mid_cycle' && growth !== undefined && growth > 0.25) {
      biasWarnings.push('FOMO风险: 增长强劲但已处中周期,不宜重仓追入');
    }

    // 近期偏误警告: 负增长容易让人过度悲观
    if (growth !== undefined && growth < -0.15 && cycleStage === 'trough') {
      biasWarnings.push('近期偏误: 当前负增长容易引发过度悲观,但底部往往如此');
    }

    return {
      cycle_stage_adjustment: cycleAdj,
      contrarian_adjustment: contrarianAdj,
      bias_warnings: biasWarnings,
      crowd_signal: crowdSignal,
    };
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
   * 流程: 基础评分(估值+证据+动量) → 心理学修正 → 最终评分
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

    const baseScore = Math.round(
      valuationScore * valuation +
      evidenceScore * evidence +
      momentumScore * momentum
    );

    // 心理学修正层
    const psychAdj = this.calculatePsychologyAdjustment(company, baseScore);
    const totalPsychAdjustment = psychAdj.cycle_stage_adjustment + psychAdj.contrarian_adjustment;
    const overallScore = Math.max(0, Math.min(100, baseScore + totalPsychAdjustment));

    const riskFlags = this.identifyRiskFlags(company, edges);

    // 将偏误警告合并到risk_flags
    if (psychAdj.bias_warnings.length > 0) {
      riskFlags.push(...psychAdj.bias_warnings);
    }

    const weekStart = this.getWeekStart();

    return {
      ticker: company.ticker,
      week_start: weekStart,
      overall_score: overallScore,
      valuation_score: Math.round(valuationScore),
      evidence_score: Math.round(evidenceScore),
      momentum_score: Math.round(momentumScore),
      psychology_adjustment: totalPsychAdjustment,
      psychology_detail: psychAdj,
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
