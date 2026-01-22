/**
 * 关系推导引擎
 *
 * 基于 v4.0 框架的6条推导规则计算公司间关系
 */

import {
  RelationType,
  type CompanyAttributes,
  type CompanyRelation,
  type RelationConfig,
  type RelationGraph,
  type RelatedCompaniesResult,
  type GeographyVector,
  type FinancialRatios,
} from '../types/index.js';
import { cosineSimilarity } from '../extractors/attribute-extractor.js';
import {
  getIndustryRelation,
  getUpstreamIndustries,
  getDownstreamIndustries,
  areInSameChain,
  getIndustryGroup,
  getSubIndustryRelation,
  getSubIndustry,
} from '../config/industry-chains.js';
import {
  getCustomerProfile,
  getCyclePosition,
  getMacroSensitivity,
  checkCrossChainRelation,
  calculateCustomerOverlap,
  calculateMacroSimilarity,
} from '../config/company-profiles.js';

// ============ 工具函数 ============

/** 合并两个地理向量的键集并对齐 */
function alignGeoVectors(
  a: GeographyVector,
  b: GeographyVector
): { vectorA: number[]; vectorB: number[] } {
  const allKeys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  const vectorA = allKeys.map(k => a[k] || 0);
  const vectorB = allKeys.map(k => b[k] || 0);
  return { vectorA, vectorB };
}

/** 将财务比率转换为归一化向量 */
function ratiosToVector(ratios: FinancialRatios): number[] {
  return [
    ratios.grossMargin,
    ratios.operatingMargin,
    ratios.netMargin,
    ratios.roe,
    ratios.roic,
    Math.min(ratios.pe / 100, 1),  // 归一化PE
    Math.min(ratios.pb / 10, 1),   // 归一化PB
    Math.min(ratios.debtToEquity / 5, 1),  // 归一化杠杆
    ratios.currentRatio / 3,       // 归一化流动比率
    ratios.assetTurnover,
  ];
}

// ============ 关系推导引擎 ============

export class RelationEngine {
  private config: RelationConfig;

  constructor(config?: Partial<RelationConfig>) {
    this.config = {
      thresholds: {
        geoSimilarity: 0.7,
        seasonalSimilarity: 0.8,
        financialSimilarity: 0.75,
        factorCorrelation: 0.6,
      },
      lookbackDays: 252,
      minDataPoints: 60,
      ...config,
    };
  }

  // ============ 规则1: 行业上下游 (增强版) ============

  /** 检测行业上下游关系 */
  checkIndustryChain(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation[] {
    const relations: CompanyRelation[] = [];
    const symbolA = companyA.identifier.symbol;
    const symbolB = companyB.identifier.symbol;
    const industryA = companyA.industry.industry;
    const industryB = companyB.industry.industry;

    // 首先检查子行业关系 (针对同行业内的细分，如半导体设备 vs 芯片)
    const subRelation = getSubIndustryRelation(symbolA, symbolB);
    if (subRelation) {
      const subA = getSubIndustry(symbolA);
      const subB = getSubIndustry(symbolB);

      if (subRelation === 'upstream') {
        relations.push({
          sourceSymbol: symbolA,
          targetSymbol: symbolB,
          relationType: RelationType.UPSTREAM,
          strength: 0.9,
          confidence: 0.95,
          evidence: `子行业上游: ${subA} → ${subB}`,
          computedAt: new Date().toISOString(),
        });
      } else if (subRelation === 'downstream') {
        relations.push({
          sourceSymbol: symbolA,
          targetSymbol: symbolB,
          relationType: RelationType.DOWNSTREAM,
          strength: 0.9,
          confidence: 0.95,
          evidence: `子行业下游: ${subB} → ${subA}`,
          computedAt: new Date().toISOString(),
        });
      }
      return relations; // 已找到子行业关系，不再检查主行业
    }

    if (!industryA || !industryB || industryA === 'Unknown' || industryB === 'Unknown') {
      return relations;
    }

    const relationshipType = getIndustryRelation(industryA, industryB);

    if (relationshipType === 'upstream') {
      // A是B的上游
      relations.push({
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.UPSTREAM,
        strength: 0.85,
        confidence: 0.9,
        evidence: `产业链上游: ${industryA} → ${industryB}`,
        computedAt: new Date().toISOString(),
      });
    } else if (relationshipType === 'downstream') {
      // A是B的下游
      relations.push({
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.DOWNSTREAM,
        strength: 0.85,
        confidence: 0.9,
        evidence: `产业链下游: ${industryB} → ${industryA}`,
        computedAt: new Date().toISOString(),
      });
    } else if (relationshipType === 'same_chain') {
      // 同一产业链但非直接上下游
      const group = getIndustryGroup(industryA);
      relations.push({
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.FACTOR_RESONANCE, // 使用因子共振表示同产业链
        strength: 0.7,
        confidence: 0.8,
        evidence: `同产业链: ${group} (${industryA}, ${industryB})`,
        computedAt: new Date().toISOString(),
      });
    }

    return relations;
  }

  // ============ 规则2: 行业竞争 ============

  /** 检测同行业竞争关系 */
  checkIndustryCompetition(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    // 同一个细分行业
    if (
      companyA.industry.industry === companyB.industry.industry &&
      companyA.industry.industry !== 'Unknown' &&
      companyA.industry.industry !== ''
    ) {
      // 计算市值相近度作为竞争强度
      let strength = 0.7;
      if (companyA.marketCap && companyB.marketCap) {
        const ratio = Math.min(companyA.marketCap, companyB.marketCap) /
                      Math.max(companyA.marketCap, companyB.marketCap);
        strength = 0.5 + ratio * 0.4;  // 市值越接近，竞争越激烈
      }

      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.COMPETITOR,
        strength,
        confidence: 0.95,
        evidence: `同行业竞争: ${companyA.industry.industry}`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则3: 因子共振 ============

  /** 检测因子共振关系 */
  checkFactorResonance(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    if (!companyA.factorExposure || !companyB.factorExposure) {
      return null;
    }

    const factorsA = companyA.factorExposure;
    const factorsB = companyB.factorExposure;

    // 计算因子暴露的相关性
    const factorNames = ['market', 'interestRate', 'oil', 'dollar', 'sector'];
    const vectorA = factorNames.map(f => factorsA[f] || 0);
    const vectorB = factorNames.map(f => factorsB[f] || 0);

    const similarity = cosineSimilarity(vectorA, vectorB);

    if (similarity > this.config.thresholds.factorCorrelation) {
      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.FACTOR_RESONANCE,
        strength: similarity,
        confidence: 0.8,
        evidence: `因子暴露相似度: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    // 检测对冲关系
    if (similarity < -this.config.thresholds.factorCorrelation) {
      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.FACTOR_HEDGE,
        strength: Math.abs(similarity),
        confidence: 0.8,
        evidence: `因子对冲: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则4: 地理共振 ============

  /** 检测地理分布共振关系 */
  checkGeoResonance(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    if (!companyA.geographyVector || !companyB.geographyVector) {
      return null;
    }

    const { vectorA, vectorB } = alignGeoVectors(
      companyA.geographyVector,
      companyB.geographyVector
    );

    const similarity = cosineSimilarity(vectorA, vectorB);

    if (similarity > this.config.thresholds.geoSimilarity) {
      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.GEO_RESONANCE,
        strength: similarity,
        confidence: 0.85,
        evidence: `地理分布相似度: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则5: 季节共振 ============

  /** 检测季节性共振关系 */
  checkSeasonalResonance(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    if (!companyA.seasonalityVector || !companyB.seasonalityVector) {
      return null;
    }

    const similarity = cosineSimilarity(
      companyA.seasonalityVector,
      companyB.seasonalityVector
    );

    if (similarity > this.config.thresholds.seasonalSimilarity) {
      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.SEASONAL_RESONANCE,
        strength: similarity,
        confidence: 0.75,
        evidence: `季节性模式相似度: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则6: 财务相似 ============

  /** 检测财务特征相似关系 */
  checkFinancialSimilarity(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    if (!companyA.financialRatios || !companyB.financialRatios) {
      return null;
    }

    const vectorA = ratiosToVector(companyA.financialRatios);
    const vectorB = ratiosToVector(companyB.financialRatios);

    const similarity = cosineSimilarity(vectorA, vectorB);

    if (similarity > this.config.thresholds.financialSimilarity) {
      return {
        sourceSymbol: companyA.identifier.symbol,
        targetSymbol: companyB.identifier.symbol,
        relationType: RelationType.FINANCIAL_SIMILAR,
        strength: similarity,
        confidence: 0.7,
        evidence: `财务特征相似度: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则7: 跨产业链关联 ============

  /** 检测跨产业链关联关系 */
  checkCrossChainRelation(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    const symbolA = companyA.identifier.symbol;
    const symbolB = companyB.identifier.symbol;

    const commonChains = checkCrossChainRelation(symbolA, symbolB);

    if (commonChains.length > 0) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.CROSS_CHAIN,
        strength: Math.min(0.5 + commonChains.length * 0.15, 0.95),
        confidence: 0.85,
        evidence: `跨链关联: ${commonChains.join(', ')}`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则8: 客群重合 ============

  /** 检测目标客群重合关系 */
  checkCustomerOverlap(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    const symbolA = companyA.identifier.symbol;
    const symbolB = companyB.identifier.symbol;

    const profileA = getCustomerProfile(symbolA);
    const profileB = getCustomerProfile(symbolB);

    if (!profileA || !profileB) {
      return null;
    }

    const overlap = calculateCustomerOverlap(profileA, profileB);

    // 客群重合度阈值 0.6
    if (overlap > 0.6) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.CUSTOMER_OVERLAP,
        strength: overlap,
        confidence: 0.8,
        evidence: `客群重合度: ${(overlap * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则9: 宏观敏感度 ============

  /** 检测宏观因子敏感度相关性 */
  checkMacroSensitivity(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    const symbolA = companyA.identifier.symbol;
    const symbolB = companyB.identifier.symbol;

    const sensA = getMacroSensitivity(symbolA);
    const sensB = getMacroSensitivity(symbolB);

    if (!sensA || !sensB) {
      return null;
    }

    const similarity = calculateMacroSimilarity(sensA, sensB);

    // 宏观敏感度高度正相关 (> 0.7)
    if (similarity > 0.7) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.MACRO_CORRELATED,
        strength: similarity,
        confidence: 0.75,
        evidence: `宏观因子正相关: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    // 宏观敏感度高度负相关 (< -0.5) - 对冲关系
    if (similarity < -0.5) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.MACRO_INVERSE,
        strength: Math.abs(similarity),
        confidence: 0.75,
        evidence: `宏观因子负相关: ${(similarity * 100).toFixed(1)}%`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 规则10: 周期同步 ============

  /** 检测经济周期同步性 */
  checkCycleSync(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation | null {
    const symbolA = companyA.identifier.symbol;
    const symbolB = companyB.identifier.symbol;

    const cycleA = getCyclePosition(symbolA);
    const cycleB = getCyclePosition(symbolB);

    if (!cycleA || !cycleB) {
      return null;
    }

    // 同一周期位置
    if (cycleA === cycleB) {
      const cycleNames: Record<string, string> = {
        early: '早周期',
        mid: '中周期',
        late: '晚周期',
        defensive: '防御型',
      };

      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.CYCLE_SYNC,
        strength: 0.8,
        confidence: 0.85,
        evidence: `周期同步: ${cycleNames[cycleA]}`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 综合推导 ============

  /** 计算两个公司间的所有关系 */
  computeRelations(
    companyA: CompanyAttributes,
    companyB: CompanyAttributes
  ): CompanyRelation[] {
    const relations: CompanyRelation[] = [];

    // 规则1: 行业链条 (增强版，可能返回多个关系)
    const chainRelations = this.checkIndustryChain(companyA, companyB);
    relations.push(...chainRelations);

    // 规则2: 行业竞争
    const competitorRelation = this.checkIndustryCompetition(companyA, companyB);
    if (competitorRelation) relations.push(competitorRelation);

    // 规则3: 因子共振
    const factorRelation = this.checkFactorResonance(companyA, companyB);
    if (factorRelation) relations.push(factorRelation);

    // 规则4: 地理共振
    const geoRelation = this.checkGeoResonance(companyA, companyB);
    if (geoRelation) relations.push(geoRelation);

    // 规则5: 季节共振
    const seasonalRelation = this.checkSeasonalResonance(companyA, companyB);
    if (seasonalRelation) relations.push(seasonalRelation);

    // 规则6: 财务相似
    const financialRelation = this.checkFinancialSimilarity(companyA, companyB);
    if (financialRelation) relations.push(financialRelation);

    // 规则7: 跨产业链关联
    const crossChainRelation = this.checkCrossChainRelation(companyA, companyB);
    if (crossChainRelation) relations.push(crossChainRelation);

    // 规则8: 客群重合
    const customerRelation = this.checkCustomerOverlap(companyA, companyB);
    if (customerRelation) relations.push(customerRelation);

    // 规则9: 宏观敏感度
    const macroRelation = this.checkMacroSensitivity(companyA, companyB);
    if (macroRelation) relations.push(macroRelation);

    // 规则10: 周期同步
    const cycleRelation = this.checkCycleSync(companyA, companyB);
    if (cycleRelation) relations.push(cycleRelation);

    return relations;
  }

  /** 构建完整的关系图谱 */
  buildRelationGraph(companies: Map<string, CompanyAttributes>): RelationGraph {
    const nodes = companies;
    const edges: CompanyRelation[] = [];
    const symbols = Array.from(companies.keys());

    console.log(`🔗 Building relation graph for ${symbols.length} companies...`);

    let processed = 0;
    const totalPairs = (symbols.length * (symbols.length - 1)) / 2;

    // 计算所有公司对之间的关系
    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const companyA = companies.get(symbols[i]);
        const companyB = companies.get(symbols[j]);

        if (companyA && companyB) {
          const relations = this.computeRelations(companyA, companyB);
          edges.push(...relations);
        }

        processed++;
        if (processed % 1000 === 0) {
          console.log(`  Progress: ${processed}/${totalPairs} pairs`);
        }
      }
    }

    console.log(`✅ Built graph with ${edges.length} relations`);

    return {
      nodes,
      edges,
      metadata: {
        totalCompanies: symbols.length,
        totalRelations: edges.length,
        lastUpdated: new Date().toISOString(),
        version: '4.1',
      },
    };
  }

  /** 查询某公司的所有关联公司 */
  queryRelatedCompanies(
    symbol: string,
    graph: RelationGraph,
    relationTypes?: RelationType[]
  ): RelatedCompaniesResult {
    const relations = graph.edges.filter(edge => {
      const isRelated = edge.sourceSymbol === symbol || edge.targetSymbol === symbol;
      const typeMatch = !relationTypes || relationTypes.includes(edge.relationType);
      return isRelated && typeMatch;
    });

    const relatedCompanies = relations.map(rel => {
      const relatedSymbol = rel.sourceSymbol === symbol ? rel.targetSymbol : rel.sourceSymbol;
      const relatedCompany = graph.nodes.get(relatedSymbol);

      return {
        symbol: relatedSymbol,
        companyName: relatedCompany?.identifier.name,
        relationType: rel.relationType,
        strength: rel.strength,
        description: rel.evidence || '',
      };
    });

    // 按关系强度排序
    relatedCompanies.sort((a, b) => b.strength - a.strength);

    return {
      sourceSymbol: symbol,
      relations: relatedCompanies,
    };
  }

  /** 获取关系类型的中文描述 */
  static getRelationDescription(type: RelationType): string {
    const descriptions: Record<RelationType, string> = {
      [RelationType.UPSTREAM]: '上游供应商',
      [RelationType.DOWNSTREAM]: '下游客户',
      [RelationType.COMPETITOR]: '同行业竞争',
      [RelationType.FACTOR_RESONANCE]: '因子共振',
      [RelationType.FACTOR_HEDGE]: '因子对冲',
      [RelationType.GEO_RESONANCE]: '地理分布相似',
      [RelationType.SEASONAL_RESONANCE]: '季节性相似',
      [RelationType.FINANCIAL_SIMILAR]: '财务特征相似',
      [RelationType.CROSS_CHAIN]: '跨产业链关联',
      [RelationType.CUSTOMER_OVERLAP]: '客群重合',
      [RelationType.MACRO_CORRELATED]: '宏观因子正相关',
      [RelationType.MACRO_INVERSE]: '宏观因子负相关',
      [RelationType.CYCLE_SYNC]: '周期同步',
      [RelationType.PRICE_CORRELATED]: '股价高度相关',
      [RelationType.PRICE_INVERSE]: '股价负相关(对冲)',
      [RelationType.PRICE_LEADING]: '股价领先',
      [RelationType.PRICE_LAGGING]: '股价滞后',
    };
    return descriptions[type] || type;
  }
}

// ============ 单例导出 ============

let engineInstance: RelationEngine | null = null;

export function getRelationEngine(): RelationEngine {
  if (!engineInstance) {
    engineInstance = new RelationEngine();
  }
  return engineInstance;
}

export default RelationEngine;
