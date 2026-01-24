/**
 * Relation-Graph Bridge
 * 将 relation-graph 模块的公司属性桥接到 scoring pipeline
 *
 * 核心功能:
 * - 用 CYCLE_POSITIONS 数据为 Company 注入 cycle_stage
 * - 用 MACRO_SENSITIVITY 数据为 scorer 提供个股宏观敏感度
 * - 用 CROSS_CHAIN_IMPACT 数据增强供应链证据
 */

import type { Company, CycleStage, SupplyChainEdge } from '../types/index.js';
import {
  getCyclePosition,
  getMacroSensitivity,
  CROSS_CHAIN_IMPACT,
} from '../relation-graph/config/company-profiles.js';
import type { CyclePosition, MacroSensitivity } from '../relation-graph/types/index.js';

// CyclePosition → CycleStage 映射
const CYCLE_MAP: Record<CyclePosition, CycleStage> = {
  early: 'early_recovery',
  mid: 'mid_cycle',
  late: 'peak',
  defensive: 'trough',
};

/**
 * 为 Company[] 注入 cycle_stage (如果 relation-graph 有数据)
 * 不覆盖已有的 cycle_stage
 */
export function enrichWithCycleStage(companies: Company[]): Company[] {
  return companies.map(company => {
    if (company.cycle_stage) return company; // 已有数据,不覆盖

    const position = getCyclePosition(company.ticker);
    if (!position) return company;

    return {
      ...company,
      cycle_stage: CYCLE_MAP[position],
    };
  });
}

/**
 * 获取个股宏观敏感度 (用于 scorer 个股修正)
 * 返回 -1 到 1 的综合宏观beta值
 */
export function getMacroBeta(ticker: string): number | null {
  const sensitivity = getMacroSensitivity(ticker);
  if (!sensitivity) return null;

  // 综合宏观beta = 各维度加权平均 (GDP和利率权重最高)
  const weights = {
    gdpGrowth: 0.30,
    interestRate: 0.25,
    consumerConfidence: 0.15,
    inflation: 0.10,
    unemployment: 0.08,
    housingMarket: 0.05,
    dollarIndex: 0.04,
    oilPrice: 0.03,
  };

  let beta = 0;
  for (const [key, weight] of Object.entries(weights)) {
    beta += (sensitivity[key as keyof MacroSensitivity] || 0) * weight;
  }

  return Math.round(beta * 100) / 100;
}

/**
 * 从 CROSS_CHAIN_IMPACT 生成 SupplyChainEdge[]
 * 补充 mock-data 中未覆盖的关系
 */
export function getCrossChainEdges(tickers: string[]): SupplyChainEdge[] {
  const edges: SupplyChainEdge[] = [];
  const tickerSet = new Set(tickers);

  for (const ticker of tickers) {
    const impacts = CROSS_CHAIN_IMPACT[ticker];
    if (!impacts) continue;

    for (const target of impacts) {
      if (!tickerSet.has(target)) continue;

      // 避免重复 (A→B 和 B→A)
      const edgeId = [ticker, target].sort().join('-');
      if (edges.some(e => e.id === edgeId)) continue;

      edges.push({
        id: edgeId,
        supplier_ticker: ticker,
        customer_ticker: target,
        evidence_grade: 'B' as const,
        evidence_source: 'relation-graph/cross-chain',
        evidence_text: `Cross-chain impact: ${ticker} ↔ ${target}`,
        extracted_at: new Date(),
        confidence: 0.7,
      });
    }
  }

  return edges;
}

/**
 * 批量获取宏观敏感度摘要
 */
export function getMacroBetas(tickers: string[]): Map<string, number> {
  const betas = new Map<string, number>();
  for (const ticker of tickers) {
    const beta = getMacroBeta(ticker);
    if (beta !== null) {
      betas.set(ticker, beta);
    }
  }
  return betas;
}

/**
 * 获取 enrichment 统计
 */
export function getEnrichmentStats(companies: Company[]): {
  total: number;
  enriched_cycle: number;
  enriched_macro: number;
  cross_chain_edges: number;
} {
  const tickers = companies.map(c => c.ticker);
  const cycleEnriched = tickers.filter(t => getCyclePosition(t) !== null).length;
  const macroEnriched = tickers.filter(t => getMacroSensitivity(t) !== null).length;
  const crossEdges = getCrossChainEdges(tickers).length;

  return {
    total: companies.length,
    enriched_cycle: cycleEnriched,
    enriched_macro: macroEnriched,
    cross_chain_edges: crossEdges,
  };
}
