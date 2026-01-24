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
export { contentGenerator, ContentGenerator } from './agents/content-generator.js';
export { validator, MultiPerspectiveValidator } from './agents/multi-perspective-validator.js';
export { syntheticResearch, SyntheticResearch } from './agents/synthetic-research.js';
export { sentimentFetcher, SentimentFetcher } from './agents/sentiment-fetcher.js';

// 导出工具类
export { cacheManager, CacheManager } from './utils/cache.js';
export { auditLogger, AuditLogger } from './utils/audit-logger.js';
export { outputManager, OutputManager } from './utils/output-manager.js';
export {
  enrichWithCycleStage,
  getMacroBeta,
  getMacroBetas,
  getCrossChainEdges,
  getEnrichmentStats
} from './utils/relation-graph-bridge.js';

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
  EvidenceGrade,
  CycleStage,
  PsychologyAdjustment
} from './types/index.js';

// 导出心理学相关类型
export type { CPTIndex, TickerSentiment } from './agents/sentiment-fetcher.js';
export type { ValidationResult, PerspectiveResult } from './agents/multi-perspective-validator.js';
export type { PersonaConfig, PersonaResponse, AggregatedResult } from './agents/synthetic-research.js';
export type { ContentAtom, WeeklyContentPack } from './agents/content-generator.js';

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

    case 'cpt': {
      console.log('获取市场心理温度 (CPT)...');
      const { sentimentFetcher } = await import('./agents/sentiment-fetcher.js');

      try {
        const cpt = await sentimentFetcher.fetchCPT();
        console.log(`\n=== CPT Dashboard ===`);
        console.log(`  CPT Value: ${cpt.value}/100`);
        console.log(`  Signal: ${cpt.signal}`);
        console.log(`  Data Quality: ${cpt.data_quality}`);
        console.log(`\n  Components:`);
        console.log(`    VIX Score:        ${cpt.components.vix_score.toFixed(1)}`);
        console.log(`    Momentum Score:   ${cpt.components.momentum_score.toFixed(1)}`);
        console.log(`    Breadth Score:    ${cpt.components.breadth_score.toFixed(1)}`);
        console.log(`    Dispersion Score: ${cpt.components.dispersion_score.toFixed(1)}`);
        console.log(`\n  Raw Data:`);
        if (cpt.raw_data.vix_level != null) console.log(`    VIX Level:      ${cpt.raw_data.vix_level.toFixed(2)}`);
        if (cpt.raw_data.sp500_vs_200ma != null) console.log(`    SPY vs 200MA:   ${(cpt.raw_data.sp500_vs_200ma * 100).toFixed(2)}%`);
        if (cpt.raw_data.sector_dispersion != null) console.log(`    Sector Disp:    ${(cpt.raw_data.sector_dispersion * 100).toFixed(2)}%`);
        if (cpt.raw_data.market_breadth != null) console.log(`    Market Breadth:  ${(cpt.raw_data.market_breadth * 100).toFixed(1)}%`);
        console.log(`\n  Fetched: ${cpt.fetched_at}`);

        // Contrarian interpretation
        const bonus = cpt.signal === 'extreme_fear' ? '+15' :
                      cpt.signal === 'fear' ? '+7' :
                      cpt.signal === 'extreme_greed' ? '-15' :
                      cpt.signal === 'greed' ? '-7' : '0';
        console.log(`\n  Contrarian Adjustment: ${bonus} points`);
        if (cpt.signal === 'extreme_fear') console.log(`  Interpretation: 极度恐慌 → 逆向加仓机会`);
        else if (cpt.signal === 'extreme_greed') console.log(`  Interpretation: 极度贪婪 → 逆向减仓信号`);
        else console.log(`  Interpretation: 市场情绪正常范围`);
      } catch (err) {
        console.error(`\n获取CPT失败: ${err instanceof Error ? err.message : err}`);
        console.log('提示: 需要配置 FMP_API_KEY 环境变量');
        process.exit(1);
      }
      break;
    }

    case 'content': {
      console.log('生成心理学内容原子...');
      const { contentGenerator } = await import('./agents/content-generator.js');
      const { scorer: contentScorer } = await import('./agents/scorer.js');
      const { allCompanies: contentCompanies, mockSupplyChainEdges: contentEdges } = await import('./data/mock-data.js');

      const contentTickers = args.slice(1).filter(a => !a.startsWith('--'));
      const targetCompanies = contentTickers.length > 0
        ? contentCompanies.filter(c => contentTickers.includes(c.ticker))
        : contentCompanies.slice(0, 5);

      const scores = contentScorer.scoreAndRank(targetCompanies, contentEdges, true);
      const pack = contentGenerator.generateWeeklyContent(scores);

      console.log(`\n=== Content Pack ===`);
      console.log(`  Week: ${pack.week_start}`);
      console.log(`  Atoms: ${pack.atoms.length}`);
      console.log('');

      for (const atom of pack.atoms) {
        console.log(`  [${atom.type}] (${atom.urgency})`);
        console.log(`    Content: ${atom.content.substring(0, 100)}`);
        console.log(`    Persona: ${atom.target_persona}`);
        console.log(`    Principles: ${atom.psychology_principles.join(', ')}`);
        console.log('');
      }

      if (pack.score_changes.length > 0) {
        console.log('  Score Changes:');
        for (const sc of pack.score_changes) {
          const dir = sc.direction === 'bullish' ? '↑' : sc.direction === 'bearish' ? '↓' : '→';
          console.log(`    ${dir} ${sc.ticker}: score=${sc.current_score} adj=${sc.psychology_adjustment} [${sc.crowd_signal}]`);
        }
      }
      break;
    }

    case 'validate': {
      console.log('执行多视角验证...');
      const { validator: cliValidator } = await import('./agents/multi-perspective-validator.js');
      const { scorer: validateScorer } = await import('./agents/scorer.js');
      const { allCompanies: validateCompanies, mockSupplyChainEdges: validateEdges } = await import('./data/mock-data.js');

      const validateTickers = args.slice(1).filter(a => !a.startsWith('--'));
      const targetValidateCompanies = validateTickers.length > 0
        ? validateCompanies.filter(c => validateTickers.includes(c.ticker))
        : validateCompanies.slice(0, 10);

      const scores = validateScorer.scoreAndRank(targetValidateCompanies, validateEdges, true);
      const results = cliValidator.validateAll(scores);

      console.log(`\n=== Validation Results ===`);
      console.log(`  Scores validated: ${results.length}`);
      console.log('');

      for (const r of results) {
        const flag = r.confidence_level === 'low' || r.confidence_level === 'insufficient' ? ' ⚠ LOW' : '';
        console.log(`  ${r.ticker}: consensus=${r.consensus_score}% confidence=${r.confidence_level}${flag}`);
        if (r.dissent_points.length > 0) {
          console.log(`    Dissent: ${r.dissent_points.join('; ')}`);
        }
        for (const p of r.perspectives) {
          const icon = p.assessment === 'agree' ? '✓' : p.assessment === 'disagree' ? '✗' : '?';
          console.log(`    ${icon} ${p.perspective} (${p.score}): ${p.key_argument.substring(0, 60)}`);
        }
        console.log(`    → ${r.recommendation}`);
        console.log('');
      }
      break;
    }

    case 'research': {
      console.log('执行合成研究模拟...');
      const { syntheticResearch: cliResearch } = await import('./agents/synthetic-research.js');

      const topic = args.slice(1).join(' ') || '半导体周期见底信号增强,设备商订单回升';
      const stimulus = {
        type: 'market_event' as const,
        content: topic,
        context: {
          market_state: 'mid-cycle recovery',
          recent_price_action: 'sector +5% last month',
        }
      };

      const result = cliResearch.runScenario(stimulus);

      console.log(`\n=== Synthetic Research ===`);
      console.log(`  Stimulus: ${topic}`);
      console.log(`  Respondents: ${result.total_respondents}`);
      console.log(`  Avg Credibility: ${result.avg_credibility.toFixed(1)}/10`);
      console.log(`  Share Probability: ${(result.avg_share_probability * 100).toFixed(0)}%`);
      console.log('');

      const n = result.total_respondents;
      console.log('  Emotion Distribution:');
      console.log(`    Positive: ${result.emotion_distribution.positive}/${n} (${Math.round(result.emotion_distribution.positive / n * 100)}%)`);
      console.log(`    Neutral:  ${result.emotion_distribution.neutral}/${n} (${Math.round(result.emotion_distribution.neutral / n * 100)}%)`);
      console.log(`    Negative: ${result.emotion_distribution.negative}/${n} (${Math.round(result.emotion_distribution.negative / n * 100)}%)`);
      console.log('');

      console.log('  Action Distribution:');
      console.log(`    Buy: ${result.action_distribution.buy}/${n} | Hold: ${result.action_distribution.hold}/${n} | Sell: ${result.action_distribution.sell}/${n}`);
      console.log(`    Research: ${result.action_distribution.research_more}/${n} | Ignore: ${result.action_distribution.ignore}/${n}`);
      console.log('');

      console.log('  Persona Breakdown:');
      for (const r of result.persona_breakdown) {
        console.log(`    [${r.persona_id}] ${r.action_intent} (credibility: ${r.credibility_score.toFixed(1)})`);
        console.log(`      ${r.reasoning.substring(0, 80)}`);
        console.log('');
      }

      console.log(`  Key Insight: ${result.key_insight}`);
      break;
    }

    default:
      console.log('用法: npx tsx src/index.ts <command>');
      console.log('');
      console.log('命令:');
      console.log('  run, weekly    执行周度分析');
      console.log('  audit          执行数据审计');
      console.log('  info           显示系统信息');
      console.log('');
      console.log('心理学模块:');
      console.log('  cpt            获取市场心理温度 (CPT Index)');
      console.log('  content [T..]  生成内容原子 (可指定ticker)');
      console.log('  validate [T..] 多视角验证 (可指定ticker)');
      console.log('  research [文本] 合成研究模拟 (指定事件描述)');
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
