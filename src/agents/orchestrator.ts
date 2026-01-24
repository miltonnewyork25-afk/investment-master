/**
 * Orchestrator - 主控 Agent
 * 负责调度子代理、合并结果、输出周报
 *
 * 职责：
 * - 协调 sec-fetcher、evidence-extractor、scorer、data-auditor
 * - 管理执行流程和错误处理
 * - 生成周度报告并写入产物目录
 */

import type {
  Company,
  SupplyChainEdge,
  WeeklyScore,
  WeeklyReport,
  SECFiling,
  FetchLog,
  AgentResult
} from '../types/index.js';
import { secFetcher } from './sec-fetcher.js';
import { evidenceExtractor } from './evidence-extractor.js';
import { scorer } from './scorer.js';
import { dataAuditor } from './data-auditor.js';
import { contentGenerator } from './content-generator.js';
import { validator } from './multi-perspective-validator.js';
import { syntheticResearch } from './synthetic-research.js';
import { sentimentFetcher } from './sentiment-fetcher.js';
import { upstreamCompanies, downstreamCompanies, mockSupplyChainEdges } from '../data/mock-data.js';
import { enrichWithCycleStage, getMacroBetas, getCrossChainEdges, getEnrichmentStats } from '../utils/relation-graph-bridge.js';
import { config, getScoringConfig } from '../config/index.js';
import { cacheManager } from '../utils/cache.js';
import { auditLogger } from '../utils/audit-logger.js';
import { outputManager } from '../utils/output-manager.js';

export interface OrchestratorOptions {
  // 是否运行数据审计
  runAudit?: boolean;
  // 是否强制刷新缓存
  forceRefresh?: boolean;
  // 输出格式
  outputFormat?: 'json' | 'markdown' | 'both';
}

export interface OrchestratorResult {
  success: boolean;
  report?: WeeklyReport;
  outputPath?: string;
  errors: string[];
  warnings: string[];
  executionTime: number;
}

class Orchestrator {
  private logs: FetchLog[] = [];
  private errors: string[] = [];
  private warnings: string[] = [];

  /**
   * 执行完整的周度分析流程
   */
  async runWeeklyAnalysis(options: OrchestratorOptions = {}): Promise<OrchestratorResult> {
    const startTime = Date.now();
    const {
      runAudit = true,
      forceRefresh = false,
      outputFormat = 'both'
    } = options;

    this.reset();
    auditLogger.log('orchestrator', 'info', '开始执行周度分析流程');

    try {
      // Step 1: 获取 SEC filings
      auditLogger.log('orchestrator', 'info', 'Step 1: 获取 SEC filings');
      const filings = await this.fetchAllFilings(upstreamCompanies, forceRefresh);

      // Step 2: 抽取供应链证据
      auditLogger.log('orchestrator', 'info', 'Step 2: 抽取供应链证据');
      const edges = await this.extractAllEvidence(filings);

      // Step 3: 数据审计（可选）
      if (runAudit) {
        auditLogger.log('orchestrator', 'info', 'Step 3: 执行数据审计');
        await this.runDataAudit(edges);
      }

      // Step 3.5: 获取市场情绪 → CPT指数
      auditLogger.log('orchestrator', 'info', 'Step 3.5: 获取市场情绪数据');
      let marketCPT: Awaited<ReturnType<typeof sentimentFetcher.fetchCPT>> | null = null;
      try {
        marketCPT = await sentimentFetcher.fetchCPT();
        scorer.setMarketCPT(marketCPT);
        auditLogger.log('orchestrator', 'info',
          `CPT指数: ${marketCPT.value} (${marketCPT.signal}), 数据质量: ${marketCPT.data_quality}`
        );
        if (marketCPT.data_quality === 'fallback') {
          this.warnings.push('市场情绪数据获取不完整,使用启发式fallback');
        }
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'Unknown';
        this.warnings.push(`市场情绪获取失败: ${errMsg}, 使用纯基本面启发式`);
        auditLogger.log('orchestrator', 'warn', `CPT获取失败: ${errMsg}`);
      }

      // Step 4: 计算评分 (先用relation-graph enrichment)
      auditLogger.log('orchestrator', 'info', 'Step 4: 计算周度评分');
      const rawCompanies = [...upstreamCompanies, ...downstreamCompanies];

      // 4a: 注入cycle_stage (来自relation-graph的CYCLE_POSITIONS)
      const allCompanies = enrichWithCycleStage(rawCompanies);

      // 4b: 注入宏观beta (来自relation-graph的MACRO_SENSITIVITY)
      const tickers = allCompanies.map(c => c.ticker);
      const betas = getMacroBetas(tickers);
      scorer.setMacroBetas(betas);

      // 4c: 补充cross-chain edges
      const crossEdges = getCrossChainEdges(tickers);
      const allEdges = [...edges, ...crossEdges];

      const enrichStats = getEnrichmentStats(allCompanies);
      auditLogger.log('orchestrator', 'info',
        `Enrichment: cycle=${enrichStats.enriched_cycle}/${enrichStats.total}, ` +
        `macro=${enrichStats.enriched_macro}/${enrichStats.total}, ` +
        `cross-chain edges=${enrichStats.cross_chain_edges}`
      );

      const scores = scorer.scoreAndRank(allCompanies, allEdges, true);

      // Step 4.5: 多视角验证
      auditLogger.log('orchestrator', 'info', 'Step 4.5: 多视角交叉验证');
      const validations = validator.validateAll(scores);
      const lowConfidence = validations.filter(v => v.confidence_level === 'low' || v.confidence_level === 'insufficient');
      if (lowConfidence.length > 0) {
        for (const v of lowConfidence) {
          this.warnings.push(`${v.ticker}: 验证信心${v.confidence_level} (共识${v.consensus_score}%), 分歧: ${v.dissent_points[0] || 'N/A'}`);
        }
      }
      auditLogger.log('orchestrator', 'info',
        `验证完成: ${validations.filter(v => v.confidence_level === 'high').length}个高信心, ` +
        `${lowConfidence.length}个低信心`
      );

      // Step 5: 生成周报
      auditLogger.log('orchestrator', 'info', 'Step 5: 生成周度报告');
      const report = this.generateReport(scores, edges);

      // Step 5.5: 生成营销内容原子
      auditLogger.log('orchestrator', 'info', 'Step 5.5: 生成营销内容原子');
      const contentPack = contentGenerator.generateWeeklyContent(scores);

      // Step 5.6: 合成用户调研 (对高分变动股)
      auditLogger.log('orchestrator', 'info', 'Step 5.6: 合成用户调研');
      const topChanges = scores.filter(s => Math.abs(s.psychology_adjustment) >= 10);
      const syntheticResults = topChanges.map(s => {
        const stimulus = {
          type: 'cycle_signal' as const,
          content: `${s.ticker}周期评分${s.overall_score}/100, 心理修正${s.psychology_adjustment > 0 ? '+' : ''}${s.psychology_adjustment}`,
          context: { market_state: s.psychology_detail?.crowd_signal || 'neutral' },
        };
        return { ticker: s.ticker, result: syntheticResearch.runScenario(stimulus) };
      });

      // Step 6: 输出到产物目录
      const outputPath = await this.saveOutput(report, outputFormat);

      // 保存内容包
      await outputManager.writeJSON(outputPath, 'content-atoms.json', contentPack);

      // 保存验证结果
      await outputManager.writeJSON(outputPath, 'validations.json', validations);

      // 保存合成调研结果
      if (syntheticResults.length > 0) {
        await outputManager.writeJSON(outputPath, 'synthetic-research.json', syntheticResults);
      }

      // 保存CPT快照
      if (marketCPT) {
        await outputManager.writeJSON(outputPath, 'market-cpt.json', marketCPT);
      }

      const executionTime = Date.now() - startTime;
      auditLogger.log('orchestrator', 'info', `流程完成，耗时 ${executionTime}ms`);

      return {
        success: true,
        report,
        outputPath,
        errors: this.errors,
        warnings: this.warnings,
        executionTime
      };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      this.errors.push(errorMsg);
      auditLogger.log('orchestrator', 'error', `流程失败: ${errorMsg}`);

      return {
        success: false,
        errors: this.errors,
        warnings: this.warnings,
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Step 1: 获取所有公司的 SEC filings
   */
  private async fetchAllFilings(
    companies: Company[],
    forceRefresh: boolean
  ): Promise<Map<string, SECFiling[]>> {
    const results = new Map<string, SECFiling[]>();

    for (const company of companies) {
      if (!company.cik) {
        this.warnings.push(`${company.ticker}: 缺少 CIK，跳过 SEC 抓取`);
        continue;
      }

      // 检查缓存
      if (!forceRefresh) {
        const cached = cacheManager.get<SECFiling[]>('sec', company.cik);
        if (cached) {
          results.set(company.ticker, cached);
          auditLogger.log('sec-fetcher', 'info', `${company.ticker}: 使用缓存数据`);
          continue;
        }
      }

      // 抓取新数据
      const result = await secFetcher.fetchFilings(company);

      if (result.success && result.data) {
        results.set(company.ticker, result.data);
        cacheManager.set('sec', company.cik, result.data);
      } else {
        this.warnings.push(`${company.ticker}: SEC 抓取失败 - ${result.error}`);
      }

      // 合并日志
      this.logs.push(...result.logs);
    }

    return results;
  }

  /**
   * Step 2: 从 filings 中抽取供应链证据
   */
  private async extractAllEvidence(
    filings: Map<string, SECFiling[]>
  ): Promise<SupplyChainEdge[]> {
    const allEdges: SupplyChainEdge[] = [];

    // 在 mock 模式下直接使用预定义数据
    if (config.mode === 'mock') {
      return mockSupplyChainEdges;
    }

    for (const [ticker, companyFilings] of filings) {
      for (const filing of companyFilings) {
        const result = await evidenceExtractor.extractFromFiling(filing, ticker);
        if (result.success && result.data) {
          // 验证每条边
          for (const edge of result.data) {
            const validation = evidenceExtractor.validateEdge(edge);
            if (validation.valid) {
              allEdges.push(edge);
            } else {
              this.warnings.push(`${ticker}: 边验证失败 - ${validation.reason}`);
            }
          }
        }
      }
    }

    return allEdges;
  }

  /**
   * Step 3: 执行数据审计
   */
  private async runDataAudit(edges: SupplyChainEdge[]): Promise<void> {
    const allCompanies = [...upstreamCompanies, ...downstreamCompanies];
    const auditResult = dataAuditor.runFullAudit(allCompanies, edges);

    if (!auditResult.passed) {
      for (const issue of auditResult.issues) {
        if (issue.severity === 'error') {
          this.errors.push(`审计错误 [${issue.category}]: ${issue.message}`);
        } else {
          this.warnings.push(`审计警告 [${issue.category}]: ${issue.message}`);
        }
      }
    }

    auditLogger.log('data-auditor', 'info',
      `审计完成: ${auditResult.passed ? '通过' : '有问题'}, ` +
      `${auditResult.issues.length} 个问题`
    );
  }

  /**
   * Step 5: 生成周度报告
   */
  private generateReport(
    scores: WeeklyScore[],
    edges: SupplyChainEdge[]
  ): WeeklyReport {
    const weekStart = this.getWeekStart();
    const scoringConfig = getScoringConfig();

    // 统计本周新发现的边（基于 extracted_at）
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newEdges = edges.filter(e => e.extracted_at > oneWeekAgo);

    // 识别风险警报
    const riskAlerts: string[] = [];
    for (const score of scores) {
      if (score.risk_flags.length > 0) {
        riskAlerts.push(`${score.ticker}: ${score.risk_flags.join(', ')}`);
      }
    }

    return {
      generated_at: new Date(),
      week_start: weekStart,
      config_version: scoringConfig.version,
      summary: {
        total_companies: scores.length,
        new_edges_found: newEdges.length,
        top_ranked: scores.slice(0, 5).map(s => s.ticker),
        risk_alerts: riskAlerts.slice(0, 10) // 最多显示10条
      },
      scores,
      new_evidence: newEdges
    };
  }

  /**
   * Step 6: 保存输出到产物目录
   */
  private async saveOutput(
    report: WeeklyReport,
    format: 'json' | 'markdown' | 'both'
  ): Promise<string> {
    const outputPath = outputManager.getWeeklyPath(report.week_start);

    if (format === 'json' || format === 'both') {
      await outputManager.writeJSON(outputPath, 'weekly-report.json', report);
      await outputManager.writeJSON(outputPath, 'scores.json', report.scores);
      await outputManager.writeJSON(outputPath, 'new-evidence.json', report.new_evidence);
    }

    if (format === 'markdown' || format === 'both') {
      const markdown = this.generateMarkdownReport(report);
      await outputManager.writeFile(outputPath, 'weekly-report.md', markdown);
    }

    // 保存审计日志
    await auditLogger.flush(outputPath);

    return outputPath;
  }

  /**
   * 生成 Markdown 格式周报
   */
  private generateMarkdownReport(report: WeeklyReport): string {
    const lines: string[] = [
      `# 投资大师周报`,
      ``,
      `**生成时间**: ${report.generated_at.toISOString()}`,
      `**周起始日**: ${report.week_start}`,
      `**配置版本**: ${report.config_version}`,
      ``,
      `## 摘要`,
      ``,
      `- 分析公司数: ${report.summary.total_companies}`,
      `- 本周新发现证据: ${report.summary.new_edges_found}`,
      `- Top 5: ${report.summary.top_ranked.join(', ')}`,
      ``,
      `## 风险提示`,
      ``
    ];

    if (report.summary.risk_alerts.length > 0) {
      for (const alert of report.summary.risk_alerts) {
        lines.push(`- ${alert}`);
      }
    } else {
      lines.push(`无重大风险提示`);
    }

    lines.push(``, `## 评分排名`, ``, `| 排名 | 股票 | 总分 | 估值 | 证据 | 动量 | 心理修正 | 风险标志 |`);
    lines.push(`|------|------|------|------|------|------|----------|----------|`);

    for (const score of report.scores) {
      const psychAdj = score.psychology_adjustment !== 0
        ? `${score.psychology_adjustment > 0 ? '+' : ''}${score.psychology_adjustment}`
        : '0';
      lines.push(
        `| ${score.rank} | ${score.ticker} | ${score.overall_score} | ` +
        `${score.valuation_score} | ${score.evidence_score} | ${score.momentum_score} | ` +
        `${psychAdj} | ${score.risk_flags.join(', ') || '-'} |`
      );
    }

    if (report.new_evidence.length > 0) {
      lines.push(``, `## 本周新发现证据`, ``);
      for (const edge of report.new_evidence) {
        lines.push(
          `### ${edge.supplier_ticker} → ${edge.customer_ticker} (${edge.evidence_grade}级)`,
          ``,
          `> ${edge.evidence_text}`,
          ``,
          `- 来源: ${edge.evidence_source}`,
          `- 置信度: ${(edge.confidence * 100).toFixed(0)}%`,
          ``
        );
      }
    }

    return lines.join('\n');
  }

  /**
   * 获取本周起始日期
   */
  private getWeekStart(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  /**
   * 重置状态
   */
  private reset(): void {
    this.logs = [];
    this.errors = [];
    this.warnings = [];
  }

  /**
   * 获取执行日志
   */
  getLogs(): FetchLog[] {
    return this.logs;
  }
}

export const orchestrator = new Orchestrator();
export { Orchestrator };
