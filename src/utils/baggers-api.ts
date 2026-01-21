/**
 * 100Baggers API 客户端
 *
 * 提供股票财报数据获取功能
 * API文档: https://www.100baggers.club
 */

const BASE_URL = 'https://www.100baggers.club';

// 从环境变量获取 API Key
function getApiKey(): string {
  const key = process.env.INTERNAL_API_KEY;
  if (!key) {
    throw new Error('INTERNAL_API_KEY 环境变量未设置');
  }
  return key;
}

// ============ 类型定义 ============

export interface SearchResult {
  symbol: string;
  company_name: string;
  company_name_chinese: string;
  sector: string;
  industry: string;
}

export interface SearchResponse {
  success: boolean;
  results: SearchResult[];
  error?: string;
}

export interface SummaryResponse {
  success: boolean;
  markdown: string;
  title: string;
  error?: string;
}

export interface CompareResponse {
  success: boolean;
  markdown: string;
  companies: string[];
  error?: string;
}

export interface StrategyReportResponse {
  success: boolean;
  report: string;
  symbol: string;
  locale: string;
  error?: string;
}

// ============ API 函数 ============

/**
 * 搜索股票（无需认证）
 * @param query 搜索关键词（股票代码、英文名或中文名）
 */
export async function searchStock(query: string): Promise<SearchResponse> {
  const url = `${BASE_URL}/api/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json() as SearchResponse;
  } catch (error) {
    return {
      success: false,
      results: [],
      error: error instanceof Error ? error.message : '搜索失败',
    };
  }
}

/**
 * 获取单只股票的财报摘要（需要认证）
 * @param symbol 股票代码，如 "TSLA", "LRCX"
 */
export async function getFinancialSummary(symbol: string): Promise<SummaryResponse> {
  const url = `${BASE_URL}/api/generate-summary`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getApiKey(),
      },
      body: JSON.stringify({ symbol: symbol.toUpperCase() }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json() as SummaryResponse;
  } catch (error) {
    return {
      success: false,
      markdown: '',
      title: '',
      error: error instanceof Error ? error.message : '获取财报摘要失败',
    };
  }
}

/**
 * 多股票对比（需要认证）
 * @param symbols 股票代码数组，最多10个
 */
export async function compareCompanies(symbols: string[]): Promise<CompareResponse> {
  if (symbols.length > 10) {
    return {
      success: false,
      markdown: '',
      companies: [],
      error: '最多支持10个股票对比',
    };
  }

  const url = `${BASE_URL}/api/compare-companies`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getApiKey(),
      },
      body: JSON.stringify({
        symbols: symbols.map(s => s.toUpperCase())
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json() as CompareResponse;
  } catch (error) {
    return {
      success: false,
      markdown: '',
      companies: [],
      error: error instanceof Error ? error.message : '股票对比失败',
    };
  }
}

/**
 * 获取策略报告（需要认证）
 * @param symbol 股票代码
 * @param locale 语言 'en' | 'zh'
 */
export async function getStrategyReport(
  symbol: string,
  locale: 'en' | 'zh' = 'zh'
): Promise<StrategyReportResponse> {
  const url = `${BASE_URL}/api/get-strategy-report?symbol=${encodeURIComponent(symbol.toUpperCase())}&locale=${locale}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': getApiKey(),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json() as StrategyReportResponse;
  } catch (error) {
    return {
      success: false,
      report: '',
      symbol: symbol,
      locale: locale,
      error: error instanceof Error ? error.message : '获取策略报告失败',
    };
  }
}

// ============ 便捷函数 ============

/**
 * 快速获取股票财报（搜索 + 获取摘要）
 * @param query 股票代码或公司名
 */
export async function quickLookup(query: string): Promise<{
  symbol: string;
  company: string;
  summary: string;
  error?: string;
}> {
  // 1. 先搜索
  const searchResult = await searchStock(query);
  if (!searchResult.success || searchResult.results.length === 0) {
    return {
      symbol: '',
      company: '',
      summary: '',
      error: `未找到股票: ${query}`,
    };
  }

  const stock = searchResult.results[0];

  // 2. 获取财报摘要
  const summaryResult = await getFinancialSummary(stock.symbol);
  if (!summaryResult.success) {
    return {
      symbol: stock.symbol,
      company: stock.company_name,
      summary: '',
      error: summaryResult.error,
    };
  }

  return {
    symbol: stock.symbol,
    company: stock.company_name,
    summary: summaryResult.markdown,
  };
}

/**
 * 批量获取多只股票财报
 * @param symbols 股票代码数组
 */
export async function batchGetSummaries(symbols: string[]): Promise<Map<string, SummaryResponse>> {
  const results = new Map<string, SummaryResponse>();

  // 并行获取，但限制并发数
  const concurrency = 3;
  for (let i = 0; i < symbols.length; i += concurrency) {
    const batch = symbols.slice(i, i + concurrency);
    const promises = batch.map(symbol => getFinancialSummary(symbol));
    const responses = await Promise.all(promises);

    batch.forEach((symbol, index) => {
      results.set(symbol.toUpperCase(), responses[index]);
    });
  }

  return results;
}

// ============ 导出默认客户端 ============

export const BaggersAPI = {
  search: searchStock,
  getSummary: getFinancialSummary,
  compare: compareCompanies,
  getStrategy: getStrategyReport,
  quickLookup,
  batchGetSummaries,
};

export default BaggersAPI;
