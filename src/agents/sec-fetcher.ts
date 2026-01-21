/**
 * SEC Fetcher Agent
 * 负责从SEC EDGAR获取公司filing数据
 * - 强制限流（10次/秒）
 * - 声明User-Agent
 * - 支持缓存
 */

import type { SECFiling, FetchLog, AgentResult, Company } from '../types/index.js';
import { config } from '../config/index.js';

// 模拟SEC filing数据
const mockFilings: Record<string, SECFiling[]> = {
  'ASML': [
    {
      accession_number: '0000937966-24-000012',
      form_type: '10-K',
      filing_date: '2024-02-15',
      cik: '937966',
      company_name: 'ASML Holding N.V.',
      items_extracted: ['Item 1', 'Item 1A', 'Item 7'],
    },
  ],
  'LRCX': [
    {
      accession_number: '0000707549-24-000015',
      form_type: '10-K',
      filing_date: '2024-02-28',
      cik: '707549',
      company_name: 'Lam Research Corporation',
      items_extracted: ['Item 1', 'Item 1A', 'Item 7'],
    },
  ],
  'AMAT': [
    {
      accession_number: '0000006951-24-000008',
      form_type: '10-K',
      filing_date: '2024-01-20',
      cik: '6951',
      company_name: 'Applied Materials, Inc.',
      items_extracted: ['Item 1', 'Item 1A', 'Item 7'],
    },
  ],
  'KLAC': [
    {
      accession_number: '0000319201-24-000010',
      form_type: '10-K',
      filing_date: '2024-03-01',
      cik: '319201',
      company_name: 'KLA Corporation',
      items_extracted: ['Item 1', 'Item 1A', 'Item 7'],
    },
  ],
  'ENTG': [
    {
      accession_number: '0001101302-24-000005',
      form_type: '10-K',
      filing_date: '2024-02-15',
      cik: '1101302',
      company_name: 'Entegris, Inc.',
      items_extracted: ['Item 1', 'Item 1A', 'Item 7'],
    },
  ],
};

class SECFetcher {
  private rateLimiter: number[] = [];
  private logs: FetchLog[] = [];

  /**
   * 限流检查
   */
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    this.rateLimiter = this.rateLimiter.filter(t => now - t < 1000);

    if (this.rateLimiter.length >= config.sec.rateLimit) {
      const waitTime = 1000 - (now - this.rateLimiter[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.rateLimiter.push(Date.now());
  }

  /**
   * 获取公司的SEC filings
   */
  async fetchFilings(company: Company): Promise<AgentResult<SECFiling[]>> {
    const startTime = Date.now();
    const url = `${config.sec.baseUrl}/submissions/CIK${company.cik?.padStart(10, '0')}.json`;

    try {
      await this.checkRateLimit();

      // Mock模式：返回虚拟数据
      if (config.mode === 'mock') {
        const filings = mockFilings[company.ticker] || [];

        this.logs.push({
          url,
          timestamp: new Date(),
          duration_ms: Date.now() - startTime,
          status: 'success',
        });

        return {
          success: true,
          data: filings,
          logs: this.logs,
        };
      }

      // Live模式：实际调用SEC API
      const response = await fetch(url, {
        headers: {
          'User-Agent': config.sec.userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`SEC API error: ${response.status}`);
      }

      const data = await response.json();

      // 解析filing数据
      const filings: SECFiling[] = this.parseFilings(data, company);

      this.logs.push({
        url,
        timestamp: new Date(),
        duration_ms: Date.now() - startTime,
        status: 'success',
      });

      return {
        success: true,
        data: filings,
        logs: this.logs,
      };

    } catch (error) {
      this.logs.push({
        url,
        timestamp: new Date(),
        duration_ms: Date.now() - startTime,
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        logs: this.logs,
      };
    }
  }

  /**
   * 解析SEC API返回的filing数据
   */
  private parseFilings(data: any, company: Company): SECFiling[] {
    const filings: SECFiling[] = [];
    const recentFilings = data.filings?.recent || {};

    const forms = recentFilings.form || [];
    const accessionNumbers = recentFilings.accessionNumber || [];
    const filingDates = recentFilings.filingDate || [];

    for (let i = 0; i < forms.length && i < 10; i++) {
      if (['10-K', '10-Q', '8-K'].includes(forms[i])) {
        filings.push({
          accession_number: accessionNumbers[i],
          form_type: forms[i],
          filing_date: filingDates[i],
          cik: company.cik || '',
          company_name: company.name,
          items_extracted: [],
        });
      }
    }

    return filings;
  }

  /**
   * 批量获取多家公司的filings
   */
  async fetchAllFilings(companies: Company[]): Promise<AgentResult<Map<string, SECFiling[]>>> {
    const results = new Map<string, SECFiling[]>();

    for (const company of companies) {
      if (!company.cik) continue;

      const result = await this.fetchFilings(company);
      if (result.success && result.data) {
        results.set(company.ticker, result.data);
      }
    }

    return {
      success: true,
      data: results,
      logs: this.logs,
    };
  }

  /**
   * 获取抓取日志
   */
  getLogs(): FetchLog[] {
    return this.logs;
  }
}

export const secFetcher = new SECFetcher();
export { SECFetcher };
