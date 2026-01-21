/**
 * 投资大师 - AI Investment Agent
 *
 * 半导体供应链投资分析系统
 *
 * 模块结构:
 * - Orchestrator: 主控 Agent，协调子代理
 * - SEC Fetcher: SEC EDGAR 数据抓取
 * - Evidence Extractor: 供应链证据抽取
 * - Scorer: 周度评分计算
 * - Data Auditor: 数据质量审计
 *
 * 产物路径: data/semicap_mvp/YYYY-MM-DD/
 */

// 导出所有 Agent
export { orchestrator, Orchestrator } from './agents/orchestrator.js';
export { secFetcher, SECFetcher } from './agents/sec-fetcher.js';
export { evidenceExtractor, EvidenceExtractor } from './agents/evidence-extractor.js';
export { scorer, Scorer } from './agents/scorer.js';
export { dataAuditor, DataAuditor } from './agents/data-auditor.js';

// 导出工具类
export { cacheManager, CacheManager } from './utils/cache.js';
export { auditLogger, AuditLogger } from './utils/audit-logger.js';
export { outputManager, OutputManager } from './utils/output-manager.js';

// 导出配置
export { config, getScoringConfig, getConfigInfo } from './config/index.js';

// 导出数据
export {
  upstreamCompanies,
  downstreamCompanies,
  allCompanies,
  mockSupplyChainEdges,
  defaultScoringConfig
} from './data/mock-data.js';

// 导出类型
export type {
  Company,
  SupplyChainEdge,
  WeeklyScore,
  WeeklyReport,
  SECFiling,
  FetchLog,
  AgentResult,
  ScoringConfig,
  EvidenceGrade
} from './types/index.js';

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const { orchestrator } = await import('./agents/orchestrator.js');
  const { getConfigInfo } = await import('./config/index.js');

  console.log('投资大师 Agent v1.0.0');
  console.log('========================');

  const configInfo = getConfigInfo();
  console.log(`配置版本: ${configInfo.version}`);
  console.log(`运行模式: ${configInfo.mode}`);
  console.log('');

  switch (command) {
    case 'run':
    case 'weekly':
      console.log('开始执行周度分析...');
      const result = await orchestrator.runWeeklyAnalysis({
        runAudit: !args.includes('--skip-audit'),
        forceRefresh: args.includes('--force-refresh'),
        outputFormat: 'both'
      });

      if (result.success) {
        console.log(`\n分析完成! 耗时: ${result.executionTime}ms`);
        console.log(`输出路径: ${result.outputPath}`);

        if (result.report) {
          console.log(`\nTop 5 排名:`);
          for (const ticker of result.report.summary.top_ranked) {
            console.log(`  - ${ticker}`);
          }
        }

        if (result.warnings.length > 0) {
          console.log(`\n警告 (${result.warnings.length}):`);
          for (const warn of result.warnings.slice(0, 5)) {
            console.log(`  - ${warn}`);
          }
        }
      } else {
        console.error('\n分析失败!');
        for (const err of result.errors) {
          console.error(`  - ${err}`);
        }
        process.exit(1);
      }
      break;

    case 'audit':
      console.log('执行数据审计...');
      const { dataAuditor } = await import('./agents/data-auditor.js');
      const { allCompanies, mockSupplyChainEdges } = await import('./data/mock-data.js');

      const auditResult = dataAuditor.runFullAudit(allCompanies, mockSupplyChainEdges);
      console.log(`\n审计结果: ${auditResult.passed ? '通过' : '有问题'}`);
      console.log(`  公司数: ${auditResult.stats.companies_checked}`);
      console.log(`  边数: ${auditResult.stats.edges_checked}`);
      console.log(`  错误: ${auditResult.stats.errors}`);
      console.log(`  警告: ${auditResult.stats.warnings}`);

      if (auditResult.issues.length > 0) {
        console.log('\n问题列表:');
        for (const issue of auditResult.issues.slice(0, 10)) {
          const prefix = issue.severity === 'error' ? '[ERROR]' : '[WARN]';
          console.log(`  ${prefix} ${issue.message}`);
        }
      }
      break;

    case 'info':
      console.log('系统信息:');
      const { outputManager } = await import('./utils/output-manager.js');
      const { cacheManager } = await import('./utils/cache.js');

      const outputStats = outputManager.getStats();
      const cacheStats = cacheManager.getStats();

      console.log(`\n存储统计:`);
      console.log(`  周报数量: ${outputStats.totalWeeks}`);
      console.log(`  最新周报: ${outputStats.latestWeek || '无'}`);
      console.log(`  缓存条目: ${cacheStats.diskEntries} (磁盘) / ${cacheStats.memoryEntries} (内存)`);
      break;

    default:
      console.log('用法: npx ts-node src/index.ts <command>');
      console.log('');
      console.log('命令:');
      console.log('  run, weekly    执行周度分析');
      console.log('  audit          执行数据审计');
      console.log('  info           显示系统信息');
      console.log('');
      console.log('选项:');
      console.log('  --skip-audit       跳过数据审计');
      console.log('  --force-refresh    强制刷新缓存');
  }
}

// 只在直接运行时执行 main
if (process.argv[1]?.endsWith('index.ts') || process.argv[1]?.endsWith('index.js')) {
  main().catch(console.error);
}
