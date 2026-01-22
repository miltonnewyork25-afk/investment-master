/**
 * 股价相关性分析器
 *
 * 功能:
 * 1. 计算两只股票的收益率相关系数
 * 2. 检测领先滞后关系 (交叉相关性)
 * 3. 验证已有关系的价格联动性
 */

import { FMPClient, getFMPClient, FMPHistoricalPrice } from '../clients/fmp-client.js';
import { RelationType, CompanyRelation } from '../types/index.js';
import { calculateReturns, pearsonCorrelation } from '../extractors/attribute-extractor.js';

// ============ 配置 ============

export interface PriceCorrelationConfig {
  // 相关性阈值
  correlationThreshold: number;      // 判定为相关的阈值 (默认0.6)
  inverseThreshold: number;          // 判定为负相关的阈值 (默认-0.4)

  // 领先滞后检测
  maxLagDays: number;                // 最大检测滞后天数 (默认10)
  leadLagThreshold: number;          // 领先滞后显著性阈值 (默认0.1)

  // 数据参数
  lookbackDays: number;              // 历史数据天数 (默认252)
  minDataPoints: number;             // 最小数据点数 (默认60)
}

const DEFAULT_CONFIG: PriceCorrelationConfig = {
  correlationThreshold: 0.6,
  inverseThreshold: -0.4,
  maxLagDays: 10,
  leadLagThreshold: 0.1,
  lookbackDays: 252,
  minDataPoints: 60,
};

// ============ 相关性计算结果 ============

export interface CorrelationResult {
  symbolA: string;
  symbolB: string;
  correlation: number;              // 同期相关系数
  leadLagDays: number;              // 领先滞后天数 (正数=A领先B)
  leadLagCorrelation: number;       // 最佳滞后时的相关系数
  dataPoints: number;               // 使用的数据点数
  period: string;                   // 计算周期描述
}

export interface ValidationResult {
  relation: CompanyRelation;
  priceCorrelation: number;
  leadLagDays: number;
  validated: boolean;               // 是否通过价格验证
  validationNote: string;
}

// ============ 价格相关性分析器 ============

export class PriceCorrelationAnalyzer {
  private client: FMPClient;
  private config: PriceCorrelationConfig;
  private priceCache: Map<string, FMPHistoricalPrice[]> = new Map();

  constructor(config?: Partial<PriceCorrelationConfig>) {
    this.client = getFMPClient();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ============ 数据获取 ============

  /** 获取股票历史价格 (带缓存) */
  async getHistoricalPrices(symbol: string): Promise<FMPHistoricalPrice[]> {
    if (this.priceCache.has(symbol)) {
      return this.priceCache.get(symbol)!;
    }

    try {
      const data = await this.client.getHistoricalPriceFull(symbol);
      const prices = data.historical?.slice(0, this.config.lookbackDays) || [];
      this.priceCache.set(symbol, prices);
      return prices;
    } catch (error) {
      console.warn(`⚠️ Failed to get prices for ${symbol}:`, error);
      return [];
    }
  }

  /** 批量预加载价格数据 */
  async preloadPrices(symbols: string[]): Promise<void> {
    console.log(`📈 Preloading price data for ${symbols.length} symbols...`);

    const batchSize = 5;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      await Promise.all(batch.map(s => this.getHistoricalPrices(s)));

      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    console.log(`✅ Preloaded prices for ${this.priceCache.size} symbols`);
  }

  /** 清除缓存 */
  clearCache(): void {
    this.priceCache.clear();
  }

  // ============ 相关性计算 ============

  /** 对齐两个价格序列的日期 */
  private alignPriceSeries(
    pricesA: FMPHistoricalPrice[],
    pricesB: FMPHistoricalPrice[]
  ): { returnsA: number[]; returnsB: number[]; dates: string[] } {
    // 建立日期索引
    const dateMapA = new Map(pricesA.map(p => [p.date, p]));
    const dateMapB = new Map(pricesB.map(p => [p.date, p]));

    // 找到共同日期
    const commonDates = pricesA
      .map(p => p.date)
      .filter(d => dateMapB.has(d))
      .sort()
      .reverse(); // 最新日期在前

    if (commonDates.length < this.config.minDataPoints) {
      return { returnsA: [], returnsB: [], dates: [] };
    }

    // 提取对齐的价格
    const alignedPricesA = commonDates.map(d => dateMapA.get(d)!.adjClose || dateMapA.get(d)!.close);
    const alignedPricesB = commonDates.map(d => dateMapB.get(d)!.adjClose || dateMapB.get(d)!.close);

    // 计算收益率 (价格需要反转，因为最新在前)
    const returnsA = calculateReturns(alignedPricesA.reverse());
    const returnsB = calculateReturns(alignedPricesB.reverse());

    return { returnsA, returnsB, dates: commonDates };
  }

  /** 计算交叉相关性 (用于检测领先滞后) */
  private crossCorrelation(
    seriesA: number[],
    seriesB: number[],
    maxLag: number
  ): { lag: number; correlation: number }[] {
    const results: { lag: number; correlation: number }[] = [];

    for (let lag = -maxLag; lag <= maxLag; lag++) {
      let alignedA: number[];
      let alignedB: number[];

      if (lag >= 0) {
        // A领先B: 用A的早期数据和B的晚期数据
        alignedA = seriesA.slice(0, seriesA.length - lag);
        alignedB = seriesB.slice(lag);
      } else {
        // B领先A: 用B的早期数据和A的晚期数据
        alignedA = seriesA.slice(-lag);
        alignedB = seriesB.slice(0, seriesB.length + lag);
      }

      if (alignedA.length >= this.config.minDataPoints) {
        const corr = pearsonCorrelation(alignedA, alignedB);
        results.push({ lag, correlation: corr });
      }
    }

    return results;
  }

  /** 计算两只股票的相关性 */
  async calculateCorrelation(symbolA: string, symbolB: string): Promise<CorrelationResult | null> {
    const pricesA = await this.getHistoricalPrices(symbolA);
    const pricesB = await this.getHistoricalPrices(symbolB);

    if (pricesA.length < this.config.minDataPoints || pricesB.length < this.config.minDataPoints) {
      return null;
    }

    const { returnsA, returnsB, dates } = this.alignPriceSeries(pricesA, pricesB);

    if (returnsA.length < this.config.minDataPoints) {
      return null;
    }

    // 同期相关性
    const correlation = pearsonCorrelation(returnsA, returnsB);

    // 交叉相关性 (检测领先滞后)
    const crossCorr = this.crossCorrelation(returnsA, returnsB, this.config.maxLagDays);

    // 找到最大相关性的滞后天数
    let bestLag = 0;
    let bestCorr = correlation;

    for (const { lag, correlation: corr } of crossCorr) {
      if (Math.abs(corr) > Math.abs(bestCorr)) {
        bestLag = lag;
        bestCorr = corr;
      }
    }

    // 只有当领先滞后相关性显著高于同期时才报告
    const leadLagDays = Math.abs(bestCorr) - Math.abs(correlation) > this.config.leadLagThreshold
      ? bestLag
      : 0;

    return {
      symbolA,
      symbolB,
      correlation,
      leadLagDays,
      leadLagCorrelation: bestCorr,
      dataPoints: returnsA.length,
      period: `${dates[dates.length - 1]} to ${dates[0]}`,
    };
  }

  // ============ 关系推导 ============

  /** 基于价格相关性推导关系 */
  async deriveRelation(symbolA: string, symbolB: string): Promise<CompanyRelation | null> {
    const result = await this.calculateCorrelation(symbolA, symbolB);

    if (!result) {
      return null;
    }

    // 检测领先滞后关系
    if (result.leadLagDays !== 0 && Math.abs(result.leadLagCorrelation) > this.config.correlationThreshold) {
      if (result.leadLagDays > 0) {
        // A领先B
        return {
          sourceSymbol: symbolA,
          targetSymbol: symbolB,
          relationType: RelationType.PRICE_LEADING,
          strength: Math.abs(result.leadLagCorrelation),
          confidence: Math.min(result.dataPoints / 252, 1),
          evidence: `${symbolA}领先${symbolB} ${result.leadLagDays}天 (相关性: ${(result.leadLagCorrelation * 100).toFixed(1)}%)`,
          computedAt: new Date().toISOString(),
        };
      } else {
        // A滞后于B (即B领先A)
        return {
          sourceSymbol: symbolA,
          targetSymbol: symbolB,
          relationType: RelationType.PRICE_LAGGING,
          strength: Math.abs(result.leadLagCorrelation),
          confidence: Math.min(result.dataPoints / 252, 1),
          evidence: `${symbolA}滞后${symbolB} ${Math.abs(result.leadLagDays)}天 (相关性: ${(result.leadLagCorrelation * 100).toFixed(1)}%)`,
          computedAt: new Date().toISOString(),
        };
      }
    }

    // 检测同期高度相关
    if (result.correlation > this.config.correlationThreshold) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.PRICE_CORRELATED,
        strength: result.correlation,
        confidence: Math.min(result.dataPoints / 252, 1),
        evidence: `股价相关性: ${(result.correlation * 100).toFixed(1)}% (${result.dataPoints}天数据)`,
        computedAt: new Date().toISOString(),
      };
    }

    // 检测负相关 (对冲)
    if (result.correlation < this.config.inverseThreshold) {
      return {
        sourceSymbol: symbolA,
        targetSymbol: symbolB,
        relationType: RelationType.PRICE_INVERSE,
        strength: Math.abs(result.correlation),
        confidence: Math.min(result.dataPoints / 252, 1),
        evidence: `股价负相关: ${(result.correlation * 100).toFixed(1)}% (对冲关系)`,
        computedAt: new Date().toISOString(),
      };
    }

    return null;
  }

  // ============ 关系验证 ============

  /** 验证已有关系的价格联动性 */
  async validateRelation(relation: CompanyRelation): Promise<ValidationResult> {
    const result = await this.calculateCorrelation(relation.sourceSymbol, relation.targetSymbol);

    if (!result) {
      return {
        relation,
        priceCorrelation: 0,
        leadLagDays: 0,
        validated: false,
        validationNote: '无法获取价格数据',
      };
    }

    // 根据关系类型进行验证
    switch (relation.relationType) {
      case RelationType.UPSTREAM:
        // 上游公司应该领先下游
        if (result.leadLagDays > 0 && result.leadLagCorrelation > 0.3) {
          return {
            relation,
            priceCorrelation: result.correlation,
            leadLagDays: result.leadLagDays,
            validated: true,
            validationNote: `✅ 上游领先${result.leadLagDays}天，符合预期`,
          };
        } else if (result.correlation > 0.4) {
          return {
            relation,
            priceCorrelation: result.correlation,
            leadLagDays: result.leadLagDays,
            validated: true,
            validationNote: `⚠️ 价格同步但未检测到明显领先关系`,
          };
        }
        return {
          relation,
          priceCorrelation: result.correlation,
          leadLagDays: result.leadLagDays,
          validated: false,
          validationNote: `❌ 相关性较弱 (${(result.correlation * 100).toFixed(1)}%)`,
        };

      case RelationType.COMPETITOR:
        // 竞争对手应该高度正相关
        if (result.correlation > 0.6) {
          return {
            relation,
            priceCorrelation: result.correlation,
            leadLagDays: result.leadLagDays,
            validated: true,
            validationNote: `✅ 高度相关 (${(result.correlation * 100).toFixed(1)}%)，符合竞争关系`,
          };
        }
        return {
          relation,
          priceCorrelation: result.correlation,
          leadLagDays: result.leadLagDays,
          validated: result.correlation > 0.3,
          validationNote: result.correlation > 0.3
            ? `⚠️ 中等相关 (${(result.correlation * 100).toFixed(1)}%)`
            : `❌ 相关性较弱`,
        };

      case RelationType.FACTOR_HEDGE:
      case RelationType.MACRO_INVERSE:
        // 对冲关系应该负相关
        if (result.correlation < -0.3) {
          return {
            relation,
            priceCorrelation: result.correlation,
            leadLagDays: result.leadLagDays,
            validated: true,
            validationNote: `✅ 负相关 (${(result.correlation * 100).toFixed(1)}%)，符合对冲关系`,
          };
        }
        return {
          relation,
          priceCorrelation: result.correlation,
          leadLagDays: result.leadLagDays,
          validated: false,
          validationNote: `❌ 未检测到负相关`,
        };

      case RelationType.CYCLE_SYNC:
      case RelationType.CUSTOMER_OVERLAP:
      case RelationType.MACRO_CORRELATED:
        // 这些关系应该正相关
        if (result.correlation > 0.4) {
          return {
            relation,
            priceCorrelation: result.correlation,
            leadLagDays: result.leadLagDays,
            validated: true,
            validationNote: `✅ 正相关 (${(result.correlation * 100).toFixed(1)}%)`,
          };
        }
        return {
          relation,
          priceCorrelation: result.correlation,
          leadLagDays: result.leadLagDays,
          validated: result.correlation > 0.2,
          validationNote: result.correlation > 0.2
            ? `⚠️ 弱正相关 (${(result.correlation * 100).toFixed(1)}%)`
            : `❌ 相关性不明显`,
        };

      default:
        // 其他关系类型，只报告相关性
        return {
          relation,
          priceCorrelation: result.correlation,
          leadLagDays: result.leadLagDays,
          validated: true,
          validationNote: `相关性: ${(result.correlation * 100).toFixed(1)}%`,
        };
    }
  }

  /** 批量验证关系 */
  async validateRelations(relations: CompanyRelation[]): Promise<ValidationResult[]> {
    // 预加载价格数据
    const symbols = new Set<string>();
    for (const rel of relations) {
      symbols.add(rel.sourceSymbol);
      symbols.add(rel.targetSymbol);
    }
    await this.preloadPrices(Array.from(symbols));

    // 验证每个关系
    const results: ValidationResult[] = [];
    for (const relation of relations) {
      const result = await this.validateRelation(relation);
      results.push(result);
    }

    return results;
  }

  // ============ 批量分析 ============

  /** 分析一组股票的相关性矩阵 */
  async analyzeCorrelationMatrix(symbols: string[]): Promise<Map<string, CorrelationResult>> {
    await this.preloadPrices(symbols);

    const results = new Map<string, CorrelationResult>();

    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const result = await this.calculateCorrelation(symbols[i], symbols[j]);
        if (result) {
          const key = `${symbols[i]}-${symbols[j]}`;
          results.set(key, result);
        }
      }
    }

    return results;
  }

  /** 找出与指定股票最相关的股票 */
  async findMostCorrelated(
    targetSymbol: string,
    candidateSymbols: string[],
    limit: number = 10
  ): Promise<CorrelationResult[]> {
    await this.preloadPrices([targetSymbol, ...candidateSymbols]);

    const results: CorrelationResult[] = [];

    for (const symbol of candidateSymbols) {
      if (symbol === targetSymbol) continue;

      const result = await this.calculateCorrelation(targetSymbol, symbol);
      if (result) {
        results.push(result);
      }
    }

    // 按相关性绝对值排序
    results.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    return results.slice(0, limit);
  }

  /** 检测指定股票的领先滞后关系 */
  async findLeadLagRelations(
    targetSymbol: string,
    candidateSymbols: string[],
    minCorrelation: number = 0.5
  ): Promise<CorrelationResult[]> {
    await this.preloadPrices([targetSymbol, ...candidateSymbols]);

    const results: CorrelationResult[] = [];

    for (const symbol of candidateSymbols) {
      if (symbol === targetSymbol) continue;

      const result = await this.calculateCorrelation(targetSymbol, symbol);
      if (result && result.leadLagDays !== 0 && Math.abs(result.leadLagCorrelation) >= minCorrelation) {
        results.push(result);
      }
    }

    // 按领先天数排序
    results.sort((a, b) => b.leadLagDays - a.leadLagDays);

    return results;
  }
}

// ============ 单例导出 ============

let analyzerInstance: PriceCorrelationAnalyzer | null = null;

export function getPriceCorrelationAnalyzer(): PriceCorrelationAnalyzer {
  if (!analyzerInstance) {
    analyzerInstance = new PriceCorrelationAnalyzer();
  }
  return analyzerInstance;
}

export default PriceCorrelationAnalyzer;
