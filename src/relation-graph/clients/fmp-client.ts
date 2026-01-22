/**
 * FMP (Financial Modeling Prep) API 客户端
 *
 * 基于用户提供的 FMP API 文档实现
 * 支持重试、速率限制、批量请求
 */

// ============ 类型定义 ============

export interface RetryOptions {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableStatuses: number[];
  retryableErrors: string[];
  timeout?: number;
}

export interface FMPCompanyProfile {
  symbol: string;
  companyName: string;
  price: number;
  beta: number;
  marketCap: number;
  sector: string;
  industry: string;
  exchange: string;
  cik: string;
  isin: string;
  cusip: string;
  country: string;
  currency: string;
  website: string;
  description: string;
  ipoDate: string;
  isActivelyTrading: boolean;
  isEtf: boolean;
  isFund: boolean;
}

export interface FMPQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
}

export interface FMPHistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export interface FMPIncomeStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  grossProfitRatio: number;
  operatingExpenses: number;
  operatingIncome: number;
  operatingIncomeRatio: number;
  netIncome: number;
  netIncomeRatio: number;
  eps: number;
  epsdiluted: number;
}

export interface FMPFinancialScores {
  symbol: string;
  altmanZScore: number;
  piotroskiScore: number;
  workingCapital: number;
  totalAssets: number;
  retainedEarnings: number;
  ebit: number;
  marketCap: number;
  totalLiabilities: number;
  revenue: number;
}

export interface FMPSectorPE {
  date: string;
  sector: string;
  exchange: string;
  pe: number;
}

export interface FMPRevenueSegment {
  [segment: string]: number;
}

// ============ 默认配置 ============

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 2000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  retryableStatuses: [429, 500, 502, 503, 504],
  retryableErrors: ['ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'ECONNREFUSED'],
  timeout: 30000,
};

// ============ 工具函数 ============

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateDelay(attempt: number, options: RetryOptions): number {
  const exponentialDelay = options.initialDelay * Math.pow(options.backoffMultiplier, attempt - 1);
  const cappedDelay = Math.min(exponentialDelay, options.maxDelay);
  // 添加 ±25% 抖动，防止雷群效应
  const jitter = cappedDelay * 0.25 * (Math.random() * 2 - 1);
  return Math.round(cappedDelay + jitter);
}

async function fetchWithRetry(
  url: string,
  fetchOptions: RequestInit = {},
  retryOptions: Partial<RetryOptions> = {}
): Promise<Response> {
  const options: RetryOptions = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = options.timeout
        ? setTimeout(() => controller.abort(), options.timeout)
        : null;

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (response.ok) {
        return response;
      }

      const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as Error & { status?: number };
      error.status = response.status;

      if (!options.retryableStatuses.includes(response.status)) {
        throw error;
      }

      lastError = error;

      if (attempt < options.maxAttempts) {
        const delay = calculateDelay(attempt, options);
        console.warn(`⚠️ FMP API attempt ${attempt}/${options.maxAttempts} failed. Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    } catch (error: unknown) {
      const err = error as Error & { code?: string };
      lastError = err;

      const isRetryable =
        err.name === 'AbortError' ||
        options.retryableErrors.includes(err.code || '');

      if (!isRetryable) {
        throw error;
      }

      if (attempt < options.maxAttempts) {
        const delay = calculateDelay(attempt, options);
        console.warn(`⚠️ FMP API attempt ${attempt}/${options.maxAttempts} failed. Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw new Error(`FMP API failed after ${options.maxAttempts} attempts: ${lastError?.message}`);
}

// ============ 速率限制器 ============

class RateLimiter {
  private requestTimestamps: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 3000, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();

    // 移除窗口外的时间戳
    this.requestTimestamps = this.requestTimestamps.filter(
      ts => now - ts < this.windowMs
    );

    if (this.requestTimestamps.length >= this.maxRequests) {
      const oldestTimestamp = this.requestTimestamps[0];
      const waitTime = this.windowMs - (now - oldestTimestamp) + 100;

      if (waitTime > 0) {
        console.log(`⏳ FMP rate limit reached. Waiting ${waitTime}ms...`);
        await sleep(waitTime);
      }
    }

    this.requestTimestamps.push(Date.now());
  }
}

// ============ FMP 客户端类 ============

export class FMPClient {
  private apiKey: string;
  private baseUrl: string;
  private rateLimiter: RateLimiter;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || process.env.FMP_API_KEY || '';
    this.baseUrl = baseUrl || process.env.FMP_BASE_URL || 'https://financialmodelingprep.com';
    this.rateLimiter = new RateLimiter(3000, 60000);

    if (!this.apiKey) {
      throw new Error('FMP_API_KEY environment variable is not set');
    }
  }

  // ============ 私有方法 ============

  private async fetchJSON<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    await this.rateLimiter.waitIfNeeded();

    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set('apikey', this.apiKey);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const response = await fetchWithRetry(url.toString());
    return response.json() as Promise<T>;
  }

  private async fetchCSV(endpoint: string, params: Record<string, string> = {}): Promise<string> {
    await this.rateLimiter.waitIfNeeded();

    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set('apikey', this.apiKey);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const response = await fetchWithRetry(url.toString());
    return response.text();
  }

  // ============ Stable API 端点 ============

  /** 获取公司概况 */
  async getProfile(symbol: string): Promise<FMPCompanyProfile | null> {
    const data = await this.fetchJSON<FMPCompanyProfile[]>('/stable/profile', { symbol });
    return data?.[0] || null;
  }

  /** 批量获取公司概况 */
  async getProfiles(symbols: string[]): Promise<FMPCompanyProfile[]> {
    // V3 API 支持批量
    const url = `/api/v3/profile/${symbols.join(',')}`;
    return this.fetchJSON<FMPCompanyProfile[]>(url);
  }

  /** 获取活跃交易股票列表 */
  async getActivelyTradingList(): Promise<Array<{ symbol: string; name: string; exchange: string }>> {
    return this.fetchJSON('/stable/actively-trading-list');
  }

  /** 获取历史股价 (完整) */
  async getHistoricalPriceFull(
    symbol: string,
    from?: string,
    to?: string
  ): Promise<{ symbol: string; historical: FMPHistoricalPrice[] }> {
    const params: Record<string, string> = { symbol };
    if (from) params.from = from;
    if (to) params.to = to;

    // stable API 返回数组格式，需要转换
    const data = await this.fetchJSON<FMPHistoricalPrice[]>('/stable/historical-price-eod/full', params);

    // 确保返回统一的格式
    if (Array.isArray(data)) {
      return {
        symbol,
        historical: data,
      };
    }

    // 兼容旧格式（如果 API 改变）
    return data as unknown as { symbol: string; historical: FMPHistoricalPrice[] };
  }

  /** 获取TTM损益表 */
  async getIncomeStatementTTM(symbol: string): Promise<FMPIncomeStatement | null> {
    const data = await this.fetchJSON<FMPIncomeStatement[]>('/stable/income-statement-ttm', { symbol });
    return data?.[0] || null;
  }

  /** 获取季度损益表 (批量CSV) */
  async getIncomeStatementBulk(year: number, period: string): Promise<string> {
    return this.fetchCSV('/stable/income-statement-bulk', {
      year: year.toString(),
      period,
    });
  }

  /** 获取财务评分 (Z-Score, F-Score) */
  async getFinancialScores(symbol: string): Promise<FMPFinancialScores | null> {
    const data = await this.fetchJSON<FMPFinancialScores[]>('/stable/financial-scores', { symbol });
    return data?.[0] || null;
  }

  /** 获取历史市值 */
  async getHistoricalMarketCap(
    symbol: string,
    from: string,
    to: string
  ): Promise<Array<{ date: string; symbol: string; marketCap: number }>> {
    return this.fetchJSON('/stable/historical-market-capitalization', { symbol, from, to });
  }

  /** 获取行业PE快照 */
  async getSectorPE(date: string): Promise<FMPSectorPE[]> {
    return this.fetchJSON('/stable/sector-pe-snapshot', { date });
  }

  /** 获取细分行业PE快照 */
  async getIndustryPE(date: string): Promise<FMPSectorPE[]> {
    return this.fetchJSON('/stable/industry-pe-snapshot', { date });
  }

  // ============ V3 API 端点 ============

  /** 批量获取行情 */
  async getQuotes(symbols: string[]): Promise<FMPQuote[]> {
    const url = `/api/v3/quote/${symbols.join(',')}`;
    return this.fetchJSON<FMPQuote[]>(url);
  }

  /** 获取地理收入分布 */
  async getRevenueGeographicSegmentation(symbol: string): Promise<FMPRevenueSegment[]> {
    return this.fetchJSON(`/api/v3/revenue-geographic-segmentation/${symbol}`, {
      structure: 'flat',
    });
  }

  /** 获取产品收入分布 */
  async getRevenueProductSegmentation(symbol: string): Promise<FMPRevenueSegment[]> {
    return this.fetchJSON(`/api/v3/revenue-product-segmentation/${symbol}`, {
      structure: 'flat',
    });
  }

  /** 获取财务比率 */
  async getFinancialRatios(symbol: string): Promise<Record<string, number>[]> {
    return this.fetchJSON(`/api/v3/ratios/${symbol}`);
  }

  /** 获取季度财务报表 */
  async getIncomeStatementQuarterly(symbol: string, limit: number = 8): Promise<FMPIncomeStatement[]> {
    return this.fetchJSON(`/api/v3/income-statement/${symbol}`, {
      period: 'quarter',
      limit: limit.toString(),
    });
  }

  // ============ 便捷方法 ============

  /** 批量获取多个股票的概况 (带速率控制) */
  async batchGetProfiles(
    symbols: string[],
    batchSize: number = 50,
    delayMs: number = 1000
  ): Promise<Map<string, FMPCompanyProfile>> {
    const result = new Map<string, FMPCompanyProfile>();

    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const profiles = await this.getProfiles(batch);

      profiles.forEach(profile => {
        result.set(profile.symbol, profile);
      });

      if (i + batchSize < symbols.length) {
        await sleep(delayMs);
      }

      console.log(`📊 Fetched profiles: ${Math.min(i + batchSize, symbols.length)}/${symbols.length}`);
    }

    return result;
  }

  /** 批量获取历史价格 (带速率控制) */
  async batchGetHistoricalPrices(
    symbols: string[],
    from: string,
    to: string,
    concurrency: number = 5,
    delayMs: number = 200
  ): Promise<Map<string, FMPHistoricalPrice[]>> {
    const result = new Map<string, FMPHistoricalPrice[]>();

    for (let i = 0; i < symbols.length; i += concurrency) {
      const batch = symbols.slice(i, i + concurrency);
      const promises = batch.map(async symbol => {
        const data = await this.getHistoricalPriceFull(symbol, from, to);
        return { symbol, historical: data.historical || [] };
      });

      const batchResults = await Promise.all(promises);
      batchResults.forEach(({ symbol, historical }) => {
        result.set(symbol, historical);
      });

      if (i + concurrency < symbols.length) {
        await sleep(delayMs);
      }

      console.log(`📈 Fetched prices: ${Math.min(i + concurrency, symbols.length)}/${symbols.length}`);
    }

    return result;
  }
}

// ============ 单例导出 ============

let clientInstance: FMPClient | null = null;

export function getFMPClient(): FMPClient {
  if (!clientInstance) {
    clientInstance = new FMPClient();
  }
  return clientInstance;
}

export default FMPClient;
