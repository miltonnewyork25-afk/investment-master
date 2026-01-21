/**
 * Data Auditor Agent
 * 负责数据质量审计和一致性检查
 *
 * 职责：
 * - 抽检对账，标记数据不一致
 * - 验证公司池完整性
 * - 检查供应链边的有效性
 * - 标记缺失字段和异常值
 * - 禁止写入主数据（只读权限）
 */

import type {
  Company,
  SupplyChainEdge,
  EvidenceGrade
} from '../types/index.js';

// 审计问题类型
export interface AuditIssue {
  category: 'missing_field' | 'invalid_value' | 'orphan_edge' | 'duplicate' | 'consistency';
  severity: 'error' | 'warning';
  ticker?: string;
  field?: string;
  message: string;
  suggestion?: string;
}

// 审计结果
export interface AuditResult {
  passed: boolean;
  timestamp: Date;
  issues: AuditIssue[];
  stats: {
    companies_checked: number;
    edges_checked: number;
    errors: number;
    warnings: number;
  };
}

// 必填字段列表
const REQUIRED_COMPANY_FIELDS: (keyof Company)[] = [
  'ticker',
  'name',
  'sector'
];

// 核心估值字段（至少需要其一）
const VALUATION_FIELDS: (keyof Company)[] = [
  'pe_ttm',
  'ev_ebit_ttm'
];

// 字段有效范围
const FIELD_RANGES: Record<string, { min: number; max: number }> = {
  'pe_ttm': { min: -500, max: 500 },
  'ev_ebit_ttm': { min: -100, max: 200 },
  'gross_margin': { min: -1, max: 1 },
  'roic': { min: -1, max: 2 },
  'revenue_growth_yoy': { min: -1, max: 10 },
  'confidence': { min: 0, max: 1 }
};

class DataAuditor {
  /**
   * 执行完整审计
   */
  runFullAudit(companies: Company[], edges: SupplyChainEdge[]): AuditResult {
    const issues: AuditIssue[] = [];

    // 1. 审计公司数据
    const companyIssues = this.auditCompanies(companies);
    issues.push(...companyIssues);

    // 2. 审计供应链边
    const edgeIssues = this.auditEdges(edges, companies);
    issues.push(...edgeIssues);

    // 3. 交叉一致性检查
    const consistencyIssues = this.checkConsistency(companies, edges);
    issues.push(...consistencyIssues);

    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;

    return {
      passed: errors === 0,
      timestamp: new Date(),
      issues,
      stats: {
        companies_checked: companies.length,
        edges_checked: edges.length,
        errors,
        warnings
      }
    };
  }

  /**
   * 审计公司数据
   */
  auditCompanies(companies: Company[]): AuditIssue[] {
    const issues: AuditIssue[] = [];
    const seenTickers = new Set<string>();

    for (const company of companies) {
      // 检查重复 ticker
      if (seenTickers.has(company.ticker)) {
        issues.push({
          category: 'duplicate',
          severity: 'error',
          ticker: company.ticker,
          message: `重复的 ticker: ${company.ticker}`,
          suggestion: '移除重复记录'
        });
      }
      seenTickers.add(company.ticker);

      // 检查必填字段
      for (const field of REQUIRED_COMPANY_FIELDS) {
        if (!company[field]) {
          issues.push({
            category: 'missing_field',
            severity: 'error',
            ticker: company.ticker,
            field,
            message: `${company.ticker}: 缺少必填字段 ${field}`,
            suggestion: '补充该字段数据'
          });
        }
      }

      // 检查估值字段（至少需要一个）
      const hasValuation = VALUATION_FIELDS.some(f => company[f] !== undefined);
      if (!hasValuation) {
        issues.push({
          category: 'missing_field',
          severity: 'warning',
          ticker: company.ticker,
          message: `${company.ticker}: 缺少估值字段 (PE 或 EV/EBIT)`,
          suggestion: '至少补充一个估值指标'
        });
      }

      // 检查字段值范围
      for (const [field, range] of Object.entries(FIELD_RANGES)) {
        const value = company[field as keyof Company] as number | undefined;
        if (value !== undefined) {
          if (value < range.min || value > range.max) {
            issues.push({
              category: 'invalid_value',
              severity: 'warning',
              ticker: company.ticker,
              field,
              message: `${company.ticker}: ${field}=${value} 超出合理范围 [${range.min}, ${range.max}]`,
              suggestion: '核实数据来源'
            });
          }
        }
      }

      // 特殊检查：CIK 格式
      if (company.cik && !/^\d+$/.test(company.cik)) {
        issues.push({
          category: 'invalid_value',
          severity: 'error',
          ticker: company.ticker,
          field: 'cik',
          message: `${company.ticker}: CIK 格式错误 (应为纯数字)`,
          suggestion: '检查 CIK 号'
        });
      }
    }

    return issues;
  }

  /**
   * 审计供应链边
   */
  auditEdges(edges: SupplyChainEdge[], companies: Company[]): AuditIssue[] {
    const issues: AuditIssue[] = [];
    const companyTickers = new Set(companies.map(c => c.ticker));
    const seenEdges = new Set<string>();

    for (const edge of edges) {
      const edgeKey = `${edge.supplier_ticker}->${edge.customer_ticker}`;

      // 检查重复边
      if (seenEdges.has(edgeKey)) {
        issues.push({
          category: 'duplicate',
          severity: 'warning',
          message: `重复的供应链边: ${edgeKey}`,
          suggestion: '保留证据等级更高的边'
        });
      }
      seenEdges.add(edgeKey);

      // 检查孤立边（供应商或客户不在公司池中）
      if (!companyTickers.has(edge.supplier_ticker)) {
        issues.push({
          category: 'orphan_edge',
          severity: 'error',
          message: `边 ${edgeKey}: 供应商 ${edge.supplier_ticker} 不在公司池中`,
          suggestion: '将供应商加入公司池或移除该边'
        });
      }

      if (!companyTickers.has(edge.customer_ticker)) {
        issues.push({
          category: 'orphan_edge',
          severity: 'error',
          message: `边 ${edgeKey}: 客户 ${edge.customer_ticker} 不在公司池中`,
          suggestion: '将客户加入公司池或移除该边'
        });
      }

      // 检查自引用
      if (edge.supplier_ticker === edge.customer_ticker) {
        issues.push({
          category: 'invalid_value',
          severity: 'error',
          message: `边 ${edgeKey}: 供应商和客户相同`,
          suggestion: '移除该边'
        });
      }

      // 检查证据完整性
      if (!edge.evidence_text || edge.evidence_text.length < 10) {
        issues.push({
          category: 'missing_field',
          severity: 'warning',
          message: `边 ${edgeKey}: 证据文本过短或缺失`,
          suggestion: '补充证据原文'
        });
      }

      if (!edge.evidence_source) {
        issues.push({
          category: 'missing_field',
          severity: 'error',
          message: `边 ${edgeKey}: 缺少证据来源`,
          suggestion: '必须注明证据来源（如 SEC accession number）'
        });
      }

      // 检查证据等级有效性
      const validGrades: EvidenceGrade[] = ['A', 'B', 'C'];
      if (!validGrades.includes(edge.evidence_grade)) {
        issues.push({
          category: 'invalid_value',
          severity: 'error',
          message: `边 ${edgeKey}: 无效的证据等级 ${edge.evidence_grade}`,
          suggestion: '证据等级必须是 A/B/C'
        });
      }

      // 检查置信度范围
      if (edge.confidence < 0 || edge.confidence > 1) {
        issues.push({
          category: 'invalid_value',
          severity: 'warning',
          message: `边 ${edgeKey}: 置信度 ${edge.confidence} 超出范围 [0, 1]`,
          suggestion: '置信度应在 0-1 之间'
        });
      }

      // A级证据应有较高置信度
      if (edge.evidence_grade === 'A' && edge.confidence < 0.8) {
        issues.push({
          category: 'consistency',
          severity: 'warning',
          message: `边 ${edgeKey}: A级证据但置信度仅 ${edge.confidence}`,
          suggestion: 'A级证据置信度通常应 >= 0.8'
        });
      }
    }

    return issues;
  }

  /**
   * 交叉一致性检查
   */
  checkConsistency(companies: Company[], edges: SupplyChainEdge[]): AuditIssue[] {
    const issues: AuditIssue[] = [];

    // 检查上游公司（设备商）应该有下游客户边
    const upstreamTickers = companies
      .filter(c => c.sector.includes('Equipment') || c.sector.includes('Materials'))
      .map(c => c.ticker);

    for (const ticker of upstreamTickers) {
      const hasCustomers = edges.some(e => e.supplier_ticker === ticker);
      if (!hasCustomers) {
        issues.push({
          category: 'consistency',
          severity: 'warning',
          ticker,
          message: `上游公司 ${ticker} 没有任何下游客户边`,
          suggestion: '检查是否缺少供应链关系数据'
        });
      }
    }

    // 检查是否存在循环引用（简单检查）
    const edgeMap = new Map<string, string[]>();
    for (const edge of edges) {
      const customers = edgeMap.get(edge.supplier_ticker) || [];
      customers.push(edge.customer_ticker);
      edgeMap.set(edge.supplier_ticker, customers);
    }

    for (const [supplier, customers] of edgeMap) {
      for (const customer of customers) {
        const reverseCustomers = edgeMap.get(customer) || [];
        if (reverseCustomers.includes(supplier)) {
          issues.push({
            category: 'consistency',
            severity: 'warning',
            message: `发现双向关系: ${supplier} <-> ${customer}`,
            suggestion: '核实双向供应关系是否合理'
          });
        }
      }
    }

    // 检查大客户集中度警告
    const customerCount = new Map<string, number>();
    for (const edge of edges) {
      const count = customerCount.get(edge.supplier_ticker) || 0;
      customerCount.set(edge.supplier_ticker, count + 1);
    }

    for (const [ticker, count] of customerCount) {
      if (count === 1) {
        issues.push({
          category: 'consistency',
          severity: 'warning',
          ticker,
          message: `${ticker} 仅有1个客户，存在集中度风险`,
          suggestion: '确认是否需要补充其他客户关系'
        });
      }
    }

    return issues;
  }

  /**
   * 快速抽检（用于日常验证）
   */
  quickCheck(companies: Company[], edges: SupplyChainEdge[]): { ok: boolean; summary: string } {
    const result = this.runFullAudit(companies, edges);

    const summary = `审计完成: ${result.stats.companies_checked} 家公司, ` +
      `${result.stats.edges_checked} 条边, ` +
      `${result.stats.errors} 错误, ${result.stats.warnings} 警告`;

    return {
      ok: result.passed,
      summary
    };
  }
}

export const dataAuditor = new DataAuditor();
export { DataAuditor };
