/**
 * Evidence Extractor Agent
 * 从SEC filing和IR文档中抽取供应链证据
 * - 仅抽取明确提及客户名的文本
 * - 禁止推测性内容
 * - 输出供应链边（不计算分数）
 */

import type {
  SupplyChainEdge,
  SECFiling,
  EvidenceGrade,
  AgentResult,
  Company
} from '../types/index.js';
import { mockSupplyChainEdges, allCompanies } from '../data/mock-data.js';
import { config } from '../config/index.js';

// 客户名称映射（用于识别文本中的公司名）
const companyNamePatterns: Record<string, string[]> = {
  'TSM': ['TSMC', 'Taiwan Semiconductor', 'Taiwan Semiconductor Manufacturing'],
  'INTC': ['Intel', 'Intel Corporation'],
  'SAMSUNG': ['Samsung', 'Samsung Electronics'],
  'MU': ['Micron', 'Micron Technology'],
  'NVDA': ['NVIDIA', 'Nvidia Corporation'],
  'AMD': ['AMD', 'Advanced Micro Devices'],
  'SKHYNIX': ['SK Hynix', 'SK hynix'],
  'GFS': ['GlobalFoundries', 'Global Foundries'],
  'UMC': ['UMC', 'United Microelectronics'],
  'AMAT': ['Applied Materials', 'AMAT'],
  'LRCX': ['Lam Research', 'Lam'],
  'ASML': ['ASML'],
  'KLAC': ['KLA', 'KLA Corporation'],
};

class EvidenceExtractor {
  private existingEdges: Map<string, SupplyChainEdge> = new Map();

  constructor() {
    // 初始化已有边
    mockSupplyChainEdges.forEach(edge => {
      this.existingEdges.set(edge.id, edge);
    });
  }

  /**
   * 判断证据等级
   */
  private determineGrade(source: string, text: string): EvidenceGrade {
    // A级：SEC官方文件中的明确数字
    if (source.includes('SEC') && /\d+%/.test(text)) {
      return 'A';
    }
    // B级：IR材料或无明确数字的SEC文件
    if (source.includes('IR') || source.includes('Press')) {
      return 'B';
    }
    // C级：其他来源
    return 'C';
  }

  /**
   * 从文本中提取客户关系
   */
  private extractCustomerMentions(
    supplierTicker: string,
    text: string,
    source: string
  ): Partial<SupplyChainEdge>[] {
    const mentions: Partial<SupplyChainEdge>[] = [];

    for (const [ticker, patterns] of Object.entries(companyNamePatterns)) {
      // 不能自己是自己的客户
      if (ticker === supplierTicker) continue;

      for (const pattern of patterns) {
        const regex = new RegExp(`\\b${pattern}\\b`, 'i');
        if (regex.test(text)) {
          // 找到一个包含此客户名的句子
          const sentences = text.split(/[.!?]+/);
          const relevantSentence = sentences.find(s => regex.test(s));

          if (relevantSentence) {
            mentions.push({
              supplier_ticker: supplierTicker,
              customer_ticker: ticker,
              evidence_grade: this.determineGrade(source, relevantSentence),
              evidence_source: source,
              evidence_text: relevantSentence.trim(),
              confidence: this.calculateConfidence(relevantSentence),
            });
            break; // 每个客户只取一个证据
          }
        }
      }
    }

    return mentions;
  }

  /**
   * 计算置信度
   */
  private calculateConfidence(text: string): number {
    let confidence = 0.5;

    // 包含具体百分比数字
    if (/\d+%/.test(text)) confidence += 0.3;

    // 包含"largest"、"major"等关键词
    if (/largest|major|significant|primary/i.test(text)) confidence += 0.1;

    // 包含具体年份
    if (/20\d{2}/.test(text)) confidence += 0.1;

    return Math.min(confidence, 1.0);
  }

  /**
   * 从filing中抽取证据边
   */
  async extractFromFiling(
    filing: SECFiling,
    supplierTicker: string
  ): Promise<AgentResult<SupplyChainEdge[]>> {
    // Mock模式：返回预定义的边
    if (config.mode === 'mock') {
      const edges = mockSupplyChainEdges.filter(
        e => e.supplier_ticker === supplierTicker
      );
      return {
        success: true,
        data: edges,
        logs: [],
      };
    }

    // Live模式：需要实际解析filing内容
    // TODO: 实现真实的filing内容抓取和解析
    return {
      success: true,
      data: [],
      logs: [],
    };
  }

  /**
   * 获取指定供应商的所有供应链边
   */
  getEdgesForSupplier(supplierTicker: string): SupplyChainEdge[] {
    return mockSupplyChainEdges.filter(
      e => e.supplier_ticker === supplierTicker
    );
  }

  /**
   * 获取指定客户的所有供应链边
   */
  getEdgesForCustomer(customerTicker: string): SupplyChainEdge[] {
    return mockSupplyChainEdges.filter(
      e => e.customer_ticker === customerTicker
    );
  }

  /**
   * 获取所有供应链边
   */
  getAllEdges(): SupplyChainEdge[] {
    return mockSupplyChainEdges;
  }

  /**
   * 添加新的供应链边
   */
  addEdge(edge: Omit<SupplyChainEdge, 'id'>): SupplyChainEdge {
    const newEdge: SupplyChainEdge = {
      ...edge,
      id: `edge-${Date.now()}`,
    };
    this.existingEdges.set(newEdge.id, newEdge);
    return newEdge;
  }

  /**
   * 验证边是否有效（必须有明确证据）
   */
  validateEdge(edge: SupplyChainEdge): { valid: boolean; reason?: string } {
    // 证据文本不能为空
    if (!edge.evidence_text || edge.evidence_text.length < 10) {
      return { valid: false, reason: '证据文本过短' };
    }

    // 证据来源必须明确
    if (!edge.evidence_source) {
      return { valid: false, reason: '缺少证据来源' };
    }

    // 供应商和客户必须在我们的公司池中
    const allTickers = allCompanies.map(c => c.ticker);
    if (!allTickers.includes(edge.supplier_ticker)) {
      return { valid: false, reason: '供应商不在公司池中' };
    }
    if (!allTickers.includes(edge.customer_ticker)) {
      return { valid: false, reason: '客户不在公司池中' };
    }

    return { valid: true };
  }
}

export const evidenceExtractor = new EvidenceExtractor();
export { EvidenceExtractor };
