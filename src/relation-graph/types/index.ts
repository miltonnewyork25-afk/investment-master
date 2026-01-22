/**
 * 公司关系图谱 - 类型定义
 *
 * 基于 v4.0 稳健框架的类型系统
 */

// ============ 基础类型 ============

/** 公司标识符 */
export interface CompanyIdentifier {
  symbol: string;        // 股票代码
  cik?: string;          // SEC CIK
  name?: string;         // 公司名称
}

/** 行业分类 */
export interface IndustryClassification {
  sector: string;        // GICS Sector
  industry: string;      // GICS Industry
  subIndustry?: string;  // GICS Sub-Industry
}

// ============ 维度A: 现金流拓扑 ============

/** 地理分布向量 */
export interface GeographyVector {
  [region: string]: number;  // 区域 -> 收入占比
}

/** 客户/收入分布 */
export interface RevenueSegmentation {
  byGeography?: GeographyVector;
  byProduct?: Record<string, number>;
  byCustomerType?: Record<string, number>;
  majorCustomers?: Array<{
    name: string;
    percentage: number;
  }>;
}

// ============ 维度B: 要素敏感度 ============

/** 因子暴露向量 (通过回归计算) */
export interface FactorExposure {
  market: number;        // 市场因子 β
  interestRate: number;  // 利率敏感度
  oil: number;           // 油价敏感度
  dollar: number;        // 美元敏感度
  sector: number;        // 行业因子
  // 可扩展更多因子
  [factor: string]: number;
}

/** 财务比率向量 */
export interface FinancialRatios {
  // 盈利能力
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number;
  roic: number;

  // 估值
  pe: number;
  pb: number;
  ps: number;
  evEbitda: number;

  // 成长
  revenueGrowth: number;
  earningsGrowth: number;

  // 杠杆
  debtToEquity: number;
  currentRatio: number;

  // 效率
  assetTurnover: number;
  inventoryTurnover: number;
}

// ============ 维度C: 时间特征 ============

/** 季节性向量 [Q1, Q2, Q3, Q4] 收入占比 */
export type SeasonalityVector = [number, number, number, number];

/** 历史价格数据 */
export interface PriceHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjClose?: number;
}

// ============ 公司属性向量 ============

/** 完整的公司属性向量 */
export interface CompanyAttributes {
  identifier: CompanyIdentifier;
  industry: IndustryClassification;

  // 维度A: 现金流拓扑
  revenueSegmentation?: RevenueSegmentation;
  geographyVector?: GeographyVector;

  // 维度B: 要素敏感度
  factorExposure?: FactorExposure;
  financialRatios?: FinancialRatios;

  // 维度C: 时间特征
  seasonalityVector?: SeasonalityVector;

  // 元数据
  marketCap?: number;
  beta?: number;
  lastUpdated: string;
}

// ============ 关系类型 ============

/** 关系类型枚举 */
export enum RelationType {
  // ===== 规则1: 行业链条 =====
  UPSTREAM = 'upstream',           // A是B的上游
  DOWNSTREAM = 'downstream',       // A是B的下游

  // ===== 规则2: 行业竞争 =====
  COMPETITOR = 'competitor',       // 同行业竞争

  // ===== 规则3: 因子共振 =====
  FACTOR_RESONANCE = 'factor_resonance',    // 因子同涨同跌
  FACTOR_HEDGE = 'factor_hedge',            // 因子对冲

  // ===== 规则4: 地理共振 =====
  GEO_RESONANCE = 'geo_resonance',  // 地理分布相似

  // ===== 规则5: 季节共振 =====
  SEASONAL_RESONANCE = 'seasonal_resonance',  // 季节性模式相似

  // ===== 规则6: 财务相似 =====
  FINANCIAL_SIMILAR = 'financial_similar',    // 财务特征相似

  // ===== 规则7: 跨链关联 (新增) =====
  CROSS_CHAIN = 'cross_chain',      // 跨产业链关联 (如半导体同时影响汽车和消费电子)

  // ===== 规则8: 客群重合 (新增) =====
  CUSTOMER_OVERLAP = 'customer_overlap',    // 目标客群重合 (如LULU和CELH)

  // ===== 规则9: 宏观敏感度 (新增) =====
  MACRO_CORRELATED = 'macro_correlated',    // 宏观因子正相关
  MACRO_INVERSE = 'macro_inverse',          // 宏观因子负相关

  // ===== 规则10: 周期同步 (新增) =====
  CYCLE_SYNC = 'cycle_sync',        // 经济周期同步 (同为早周期/晚周期)
}

/** 公司间关系 */
export interface CompanyRelation {
  sourceSymbol: string;
  targetSymbol: string;
  relationType: RelationType;
  strength: number;          // 关系强度 0-1
  confidence: number;        // 置信度 0-1
  evidence?: string;         // 关系依据
  computedAt: string;        // 计算时间
}

// ============ 关系图谱 ============

/** 关系图谱 */
export interface RelationGraph {
  nodes: Map<string, CompanyAttributes>;
  edges: CompanyRelation[];
  metadata: {
    totalCompanies: number;
    totalRelations: number;
    lastUpdated: string;
    version: string;
  };
}

// ============ 查询结果 ============

/** 关联公司查询结果 */
export interface RelatedCompaniesResult {
  sourceSymbol: string;
  relations: Array<{
    symbol: string;
    companyName?: string;
    relationType: RelationType;
    strength: number;
    description: string;
  }>;
}

// ============ 配置类型 ============

/** 关系推导配置 */
export interface RelationConfig {
  // 相似度阈值
  thresholds: {
    geoSimilarity: number;        // 地理相似度阈值
    seasonalSimilarity: number;   // 季节性相似度阈值
    financialSimilarity: number;  // 财务相似度阈值
    factorCorrelation: number;    // 因子相关性阈值
  };

  // 计算参数
  lookbackDays: number;           // 历史数据回溯天数
  minDataPoints: number;          // 最小数据点数
}

/** 默认配置 */
export const DEFAULT_RELATION_CONFIG: RelationConfig = {
  thresholds: {
    geoSimilarity: 0.7,
    seasonalSimilarity: 0.8,
    financialSimilarity: 0.75,
    factorCorrelation: 0.6,
  },
  lookbackDays: 252,  // 一年交易日
  minDataPoints: 60,  // 至少3个月数据
};

// ============ 扩展类型: 客群/消费者画像 ============

/** 目标客群画像 */
export interface CustomerProfile {
  // 人口统计
  demographics: {
    ageGroup: 'gen_z' | 'millennial' | 'gen_x' | 'boomer' | 'all';
    incomeLevel: 'mass' | 'affluent' | 'high_net_worth' | 'all';
    gender?: 'male' | 'female' | 'all';
  };

  // 消费场景
  occasions: string[];  // 如: 'fitness', 'travel', 'dining', 'entertainment'

  // 价值主张
  valueProps: string[]; // 如: 'premium', 'value', 'convenience', 'health'

  // 购买渠道
  channels: ('online' | 'retail' | 'direct' | 'subscription')[];
}

/** 经济周期位置 */
export type CyclePosition = 'early' | 'mid' | 'late' | 'defensive';

/** 宏观敏感度向量 */
export interface MacroSensitivity {
  interestRate: number;    // 利率敏感度 (-1 to 1)
  inflation: number;       // 通胀敏感度
  gdpGrowth: number;       // GDP敏感度
  unemployment: number;    // 失业率敏感度
  consumerConfidence: number; // 消费者信心敏感度
  housingMarket: number;   // 房地产敏感度
  dollarIndex: number;     // 美元指数敏感度
  oilPrice: number;        // 油价敏感度
}

/** 扩展的公司属性 */
export interface ExtendedCompanyAttributes extends CompanyAttributes {
  // 客群画像
  customerProfile?: CustomerProfile;

  // 周期位置
  cyclePosition?: CyclePosition;

  // 宏观敏感度
  macroSensitivity?: MacroSensitivity;

  // 跨链标签 (该公司产品/服务影响的多个产业链)
  crossChainImpact?: string[];
}
