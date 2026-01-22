/**
 * 公司属性提取器
 *
 * 从FMP API数据中提取标准化的公司属性向量
 */

import { FMPClient, getFMPClient, FMPCompanyProfile, FMPHistoricalPrice, FMPIncomeStatement } from '../clients/fmp-client.js';
import type {
  CompanyAttributes,
  CompanyIdentifier,
  IndustryClassification,
  GeographyVector,
  SeasonalityVector,
  FinancialRatios,
  FactorExposure,
  RevenueSegmentation,
} from '../types/index.js';

// ============ 工具函数 ============

/** 计算向量的余弦相似度 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

/** 计算两个时间序列的相关系数 */
export function pearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 2) return 0;

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}

/** 计算收益率序列 */
export function calculateReturns(prices: number[]): number[] {
  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] !== 0) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
  }
  return returns;
}

/** 简单线性回归 */
export function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number } {
  if (x.length !== y.length || x.length < 2) {
    return { slope: 0, intercept: 0, r2: 0 };
  }

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // 计算 R²
  const meanY = sumY / n;
  const ssTotal = y.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0);
  const ssResidual = y.reduce((acc, yi, i) => acc + Math.pow(yi - (slope * x[i] + intercept), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;

  return { slope, intercept, r2 };
}

// ============ 属性提取器类 ============

export class AttributeExtractor {
  private client: FMPClient;

  constructor(client?: FMPClient) {
    this.client = client || getFMPClient();
  }

  // ============ 基础信息提取 ============

  /** 从Profile提取公司标识符 */
  extractIdentifier(profile: FMPCompanyProfile): CompanyIdentifier {
    return {
      symbol: profile.symbol,
      cik: profile.cik,
      name: profile.companyName,
    };
  }

  /** 从Profile提取行业分类 */
  extractIndustryClassification(profile: FMPCompanyProfile): IndustryClassification {
    return {
      sector: profile.sector || 'Unknown',
      industry: profile.industry || 'Unknown',
    };
  }

  // ============ 维度A: 地理分布 ============

  /** 提取地理分布向量 */
  async extractGeographyVector(symbol: string): Promise<GeographyVector | undefined> {
    try {
      const segments = await this.client.getRevenueGeographicSegmentation(symbol);
      if (!segments || segments.length === 0) return undefined;

      // 取最新一期数据
      const latest = segments[0];
      const total = Object.values(latest).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);

      if (total === 0) return undefined;

      const vector: GeographyVector = {};
      for (const [region, value] of Object.entries(latest)) {
        if (typeof value === 'number' && value > 0) {
          vector[region] = value / total;
        }
      }

      return vector;
    } catch (error) {
      console.warn(`⚠️ Failed to extract geography for ${symbol}:`, error);
      return undefined;
    }
  }

  /** 提取收入分布 */
  async extractRevenueSegmentation(symbol: string): Promise<RevenueSegmentation | undefined> {
    try {
      const [geoSegments, productSegments] = await Promise.all([
        this.client.getRevenueGeographicSegmentation(symbol).catch(() => []),
        this.client.getRevenueProductSegmentation(symbol).catch(() => []),
      ]);

      const segmentation: RevenueSegmentation = {};

      // 地理分布
      if (geoSegments && geoSegments.length > 0) {
        const geoVector: GeographyVector = {};
        const latest = geoSegments[0];
        const total = Object.values(latest).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
        if (total > 0) {
          for (const [region, value] of Object.entries(latest)) {
            if (typeof value === 'number' && value > 0) {
              geoVector[region] = value / total;
            }
          }
          segmentation.byGeography = geoVector;
        }
      }

      // 产品分布
      if (productSegments && productSegments.length > 0) {
        const productVector: Record<string, number> = {};
        const latest = productSegments[0];
        const total = Object.values(latest).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
        if (total > 0) {
          for (const [product, value] of Object.entries(latest)) {
            if (typeof value === 'number' && value > 0) {
              productVector[product] = value / total;
            }
          }
          segmentation.byProduct = productVector;
        }
      }

      return Object.keys(segmentation).length > 0 ? segmentation : undefined;
    } catch (error) {
      console.warn(`⚠️ Failed to extract revenue segmentation for ${symbol}:`, error);
      return undefined;
    }
  }

  // ============ 维度B: 财务比率 ============

  /** 从财务数据计算财务比率向量 */
  async extractFinancialRatios(symbol: string): Promise<FinancialRatios | undefined> {
    try {
      const ratios = await this.client.getFinancialRatios(symbol);
      if (!ratios || ratios.length === 0) return undefined;

      const latest = ratios[0];

      return {
        // 盈利能力
        grossMargin: latest.grossProfitMargin || 0,
        operatingMargin: latest.operatingProfitMargin || 0,
        netMargin: latest.netProfitMargin || 0,
        roe: latest.returnOnEquity || 0,
        roic: latest.returnOnCapitalEmployed || 0,

        // 估值
        pe: latest.priceEarningsRatio || 0,
        pb: latest.priceToBookRatio || 0,
        ps: latest.priceToSalesRatio || 0,
        evEbitda: latest.enterpriseValueMultiple || 0,

        // 成长 (需要从多期数据计算，这里简化)
        revenueGrowth: 0,
        earningsGrowth: 0,

        // 杠杆
        debtToEquity: latest.debtEquityRatio || 0,
        currentRatio: latest.currentRatio || 0,

        // 效率
        assetTurnover: latest.assetTurnover || 0,
        inventoryTurnover: latest.inventoryTurnover || 0,
      };
    } catch (error) {
      console.warn(`⚠️ Failed to extract financial ratios for ${symbol}:`, error);
      return undefined;
    }
  }

  // ============ 维度C: 季节性 ============

  /** 从季度收入计算季节性向量 */
  async extractSeasonalityVector(symbol: string): Promise<SeasonalityVector | undefined> {
    try {
      // 获取最近8个季度数据
      const statements = await this.client.getIncomeStatementQuarterly(symbol, 8);
      if (!statements || statements.length < 4) return undefined;

      // 按季度分组计算平均收入
      const quarterRevenues: Record<string, number[]> = {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: [],
      };

      for (const stmt of statements) {
        const quarter = stmt.period; // Q1, Q2, Q3, Q4
        if (quarter && quarterRevenues[quarter]) {
          quarterRevenues[quarter].push(stmt.revenue);
        }
      }

      // 计算各季度平均收入
      const avgRevenues = ['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
        const revenues = quarterRevenues[q];
        return revenues.length > 0 ? revenues.reduce((a, b) => a + b, 0) / revenues.length : 0;
      });

      const totalRevenue = avgRevenues.reduce((a, b) => a + b, 0);
      if (totalRevenue === 0) return undefined;

      // 归一化为占比
      const seasonality: SeasonalityVector = [
        avgRevenues[0] / totalRevenue,
        avgRevenues[1] / totalRevenue,
        avgRevenues[2] / totalRevenue,
        avgRevenues[3] / totalRevenue,
      ];

      return seasonality;
    } catch (error) {
      console.warn(`⚠️ Failed to extract seasonality for ${symbol}:`, error);
      return undefined;
    }
  }

  // ============ 因子暴露计算 ============

  /** 计算因子暴露 (需要市场/因子数据) */
  async calculateFactorExposure(
    symbol: string,
    marketPrices: FMPHistoricalPrice[],
    lookbackDays: number = 252
  ): Promise<FactorExposure | undefined> {
    try {
      const priceData = await this.client.getHistoricalPriceFull(symbol);
      const stockPrices = priceData.historical?.slice(0, lookbackDays) || [];

      if (stockPrices.length < 60 || marketPrices.length < 60) {
        return undefined;
      }

      // 对齐日期并计算收益率
      const stockReturns = calculateReturns(stockPrices.map(p => p.adjClose || p.close).reverse());
      const marketReturns = calculateReturns(marketPrices.slice(0, stockPrices.length).map(p => p.adjClose || p.close).reverse());

      // 确保长度一致
      const minLength = Math.min(stockReturns.length, marketReturns.length);
      const alignedStockReturns = stockReturns.slice(0, minLength);
      const alignedMarketReturns = marketReturns.slice(0, minLength);

      // 计算市场Beta
      const { slope: marketBeta } = linearRegression(alignedMarketReturns, alignedStockReturns);

      return {
        market: marketBeta,
        interestRate: 0,  // 需要利率数据
        oil: 0,           // 需要油价数据
        dollar: 0,        // 需要美元数据
        sector: 0,        // 需要行业ETF数据
      };
    } catch (error) {
      console.warn(`⚠️ Failed to calculate factor exposure for ${symbol}:`, error);
      return undefined;
    }
  }

  // ============ 完整属性提取 ============

  /** 提取单个公司的完整属性 */
  async extractCompanyAttributes(symbol: string): Promise<CompanyAttributes | null> {
    try {
      console.log(`📊 Extracting attributes for ${symbol}...`);

      // 获取基础信息
      const profile = await this.client.getProfile(symbol);
      if (!profile) {
        console.warn(`⚠️ Profile not found for ${symbol}`);
        return null;
      }

      // 并行提取各维度属性
      const [geographyVector, financialRatios, seasonalityVector, revenueSegmentation] = await Promise.all([
        this.extractGeographyVector(symbol),
        this.extractFinancialRatios(symbol),
        this.extractSeasonalityVector(symbol),
        this.extractRevenueSegmentation(symbol),
      ]);

      const attributes: CompanyAttributes = {
        identifier: this.extractIdentifier(profile),
        industry: this.extractIndustryClassification(profile),
        geographyVector,
        financialRatios,
        seasonalityVector,
        revenueSegmentation,
        marketCap: profile.marketCap,
        beta: profile.beta,
        lastUpdated: new Date().toISOString(),
      };

      console.log(`✅ Extracted attributes for ${symbol}`);
      return attributes;
    } catch (error) {
      console.error(`❌ Failed to extract attributes for ${symbol}:`, error);
      return null;
    }
  }

  /** 批量提取公司属性 */
  async batchExtractAttributes(
    symbols: string[],
    concurrency: number = 3,
    delayMs: number = 500
  ): Promise<Map<string, CompanyAttributes>> {
    const results = new Map<string, CompanyAttributes>();

    for (let i = 0; i < symbols.length; i += concurrency) {
      const batch = symbols.slice(i, i + concurrency);
      const promises = batch.map(symbol => this.extractCompanyAttributes(symbol));
      const batchResults = await Promise.all(promises);

      batchResults.forEach((attrs, index) => {
        if (attrs) {
          results.set(batch[index], attrs);
        }
      });

      if (i + concurrency < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      console.log(`📈 Extracted: ${Math.min(i + concurrency, symbols.length)}/${symbols.length}`);
    }

    return results;
  }
}

// ============ 单例导出 ============

let extractorInstance: AttributeExtractor | null = null;

export function getAttributeExtractor(): AttributeExtractor {
  if (!extractorInstance) {
    extractorInstance = new AttributeExtractor();
  }
  return extractorInstance;
}

export default AttributeExtractor;
