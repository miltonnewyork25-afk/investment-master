/**
 * LRCX 关联分析报告
 *
 * 完整验证框架的实战应用
 */
import 'dotenv/config';
import {
  buildCompanyGraph,
  RelationEngine,
  getPriceCorrelationAnalyzer,
  getFMPClient,
} from '../index.js';
import { RelationType, CompanyRelation } from '../types/index.js';

// LRCX 关联公司列表 (基于产业链和框架配置)
const LRCX_UNIVERSE = [
  // 目标公司
  'LRCX',

  // 同行竞争: 半导体设备
  'AMAT', 'ASML', 'KLAC', 'SNPS', 'CDNS', 'TER', 'UCTT',

  // 下游: 芯片制造/代工
  'TSM', 'INTC', 'MU', 'NVDA', 'AMD', 'QCOM', 'AVGO', 'TXN',
  'MRVL', 'ON', 'NXPI', 'ADI',

  // 更下游: 终端应用
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA',

  // 上游: 材料/气体
  'ENTG', 'MKSI', 'LECO',

  // 周期对照: 防御型
  'JNJ', 'PG', 'KO',

  // 周期对照: 能源 (晚周期)
  'XOM', 'CVX',
];

async function generateLRCXReport() {
  console.log('═'.repeat(70));
  console.log('          LRCX 公司关联分析报告');
  console.log('          (Lam Research Corporation)');
  console.log('═'.repeat(70));
  console.log(`\n生成时间: ${new Date().toISOString()}\n`);

  const client = getFMPClient();
  const analyzer = getPriceCorrelationAnalyzer();

  // ============ 第一部分: 公司概况 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第一部分: 公司概况');
  console.log('─'.repeat(70) + '\n');

  const profile = await client.getProfile('LRCX');
  if (profile) {
    console.log(`公司名称: ${profile.companyName}`);
    console.log(`股票代码: ${profile.symbol}`);
    console.log(`行业分类: ${profile.sector} / ${profile.industry}`);
    console.log(`市值: $${(profile.marketCap / 1e9).toFixed(1)}B`);
    console.log(`Beta: ${profile.beta?.toFixed(2) || 'N/A'}`);
    console.log(`交易所: ${profile.exchange}`);
  }

  // ============ 第二部分: 构建关系图谱 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第二部分: 关系图谱构建');
  console.log('─'.repeat(70) + '\n');

  const graph = await buildCompanyGraph(LRCX_UNIVERSE);

  console.log(`\n图谱统计:`);
  console.log(`  公司数量: ${graph.metadata.totalCompanies}`);
  console.log(`  关系数量: ${graph.metadata.totalRelations}`);

  // 提取 LRCX 相关的所有关系
  const lrcxRelations = graph.edges.filter(
    e => e.sourceSymbol === 'LRCX' || e.targetSymbol === 'LRCX'
  );

  console.log(`  LRCX相关关系: ${lrcxRelations.length}`);

  // 按关系类型分组
  const relationsByType: Record<string, CompanyRelation[]> = {};
  for (const rel of lrcxRelations) {
    if (!relationsByType[rel.relationType]) {
      relationsByType[rel.relationType] = [];
    }
    relationsByType[rel.relationType].push(rel);
  }

  console.log(`\nLRCX 关系类型分布:`);
  for (const [type, rels] of Object.entries(relationsByType)) {
    const desc = RelationEngine.getRelationDescription(type as RelationType);
    console.log(`  ${desc}: ${rels.length}个`);
  }

  // ============ 第三部分: 上下游分析 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第三部分: 产业链上下游分析');
  console.log('─'.repeat(70) + '\n');

  const upstreamRels = relationsByType[RelationType.UPSTREAM] || [];
  const downstreamRels = relationsByType[RelationType.DOWNSTREAM] || [];

  console.log('【上游供应关系】LRCX 作为上游供应商:');
  if (upstreamRels.length > 0) {
    for (const rel of upstreamRels) {
      const target = rel.targetSymbol === 'LRCX' ? rel.sourceSymbol : rel.targetSymbol;
      const targetProfile = graph.nodes.get(target);
      console.log(`  LRCX → ${target} (${targetProfile?.identifier.name || 'N/A'})`);
      console.log(`    强度: ${(rel.strength * 100).toFixed(0)}% | 依据: ${rel.evidence}`);
    }
  } else {
    console.log('  (无直接上游供应关系)');
  }

  console.log('\n【下游客户关系】LRCX 作为下游客户:');
  if (downstreamRels.length > 0) {
    for (const rel of downstreamRels) {
      const source = rel.sourceSymbol === 'LRCX' ? rel.targetSymbol : rel.sourceSymbol;
      const sourceProfile = graph.nodes.get(source);
      console.log(`  ${source} → LRCX (${sourceProfile?.identifier.name || 'N/A'})`);
      console.log(`    强度: ${(rel.strength * 100).toFixed(0)}% | 依据: ${rel.evidence}`);
    }
  } else {
    console.log('  (无直接下游客户关系)');
  }

  // ============ 第四部分: 竞争对手分析 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第四部分: 同行竞争分析');
  console.log('─'.repeat(70) + '\n');

  const competitorRels = relationsByType[RelationType.COMPETITOR] || [];

  if (competitorRels.length > 0) {
    console.log('【主要竞争对手】');
    // 按强度排序
    const sortedCompetitors = [...competitorRels].sort((a, b) => b.strength - a.strength);

    for (const rel of sortedCompetitors.slice(0, 10)) {
      const competitor = rel.sourceSymbol === 'LRCX' ? rel.targetSymbol : rel.sourceSymbol;
      const compProfile = graph.nodes.get(competitor);
      const marketCap = compProfile?.marketCap
        ? `$${(compProfile.marketCap / 1e9).toFixed(1)}B`
        : 'N/A';

      console.log(`  ${competitor} - ${compProfile?.identifier.name || 'N/A'}`);
      console.log(`    市值: ${marketCap} | 竞争强度: ${(rel.strength * 100).toFixed(0)}%`);
    }
  }

  // ============ 第五部分: 价格相关性验证 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第五部分: 价格相关性验证');
  console.log('─'.repeat(70) + '\n');

  // 获取所有 LRCX 关联公司
  const relatedSymbols = new Set<string>();
  for (const rel of lrcxRelations) {
    relatedSymbols.add(rel.sourceSymbol === 'LRCX' ? rel.targetSymbol : rel.sourceSymbol);
  }

  // 计算相关性
  const correlationResults = await analyzer.findMostCorrelated(
    'LRCX',
    Array.from(relatedSymbols),
    20
  );

  console.log('【与LRCX股价相关性排名】(前15名)\n');
  console.log('  排名  股票    相关性    领先/滞后');
  console.log('  ' + '─'.repeat(45));

  for (let i = 0; i < Math.min(correlationResults.length, 15); i++) {
    const result = correlationResults[i];
    const lagInfo = result.leadLagDays !== 0
      ? `LRCX ${result.leadLagDays > 0 ? '领先' : '滞后'} ${Math.abs(result.leadLagDays)}天`
      : '同步';

    console.log(
      `  ${String(i + 1).padStart(2)}    ${result.symbolB.padEnd(6)}  ${(result.correlation * 100).toFixed(1).padStart(6)}%    ${lagInfo}`
    );
  }

  // ============ 第六部分: 领先指标分析 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第六部分: 领先滞后指标分析');
  console.log('─'.repeat(70) + '\n');

  // 寻找可能的领先指标
  const leadLagResults = await analyzer.findLeadLagRelations(
    'LRCX',
    Array.from(relatedSymbols),
    0.3  // 降低阈值以发现更多关系
  );

  if (leadLagResults.length > 0) {
    console.log('【发现的领先滞后关系】\n');
    for (const result of leadLagResults) {
      const direction = result.leadLagDays > 0 ? '领先' : '滞后';
      const significance = Math.abs(result.leadLagCorrelation) - Math.abs(result.correlation);

      console.log(`  LRCX ${direction} ${result.symbolB} ${Math.abs(result.leadLagDays)} 天`);
      console.log(`    滞后相关性: ${(result.leadLagCorrelation * 100).toFixed(1)}%`);
      console.log(`    同期相关性: ${(result.correlation * 100).toFixed(1)}%`);
      console.log(`    显著性提升: ${(significance * 100).toFixed(1)}%\n`);
    }
  } else {
    console.log('  未检测到显著的领先滞后关系');
    console.log('  (这可能意味着市场定价效率较高，信息传导迅速)\n');
  }

  // ============ 第七部分: 传导链条分析 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第七部分: 产业链传导链条');
  console.log('─'.repeat(70) + '\n');

  // 构建传导路径: 设备 → 代工 → 芯片 → 终端
  const transmissionChains = [
    {
      name: '半导体设备 → 代工厂',
      pairs: [
        ['LRCX', 'TSM'],
        ['AMAT', 'TSM'],
        ['ASML', 'TSM'],
      ],
    },
    {
      name: '代工厂 → 芯片设计',
      pairs: [
        ['TSM', 'NVDA'],
        ['TSM', 'AMD'],
        ['TSM', 'AAPL'],
      ],
    },
    {
      name: '芯片 → 终端应用',
      pairs: [
        ['NVDA', 'MSFT'],
        ['NVDA', 'AMZN'],
        ['AAPL', 'META'],
      ],
    },
  ];

  for (const chain of transmissionChains) {
    console.log(`【${chain.name}】`);

    for (const [from, to] of chain.pairs) {
      const corr = await analyzer.calculateCorrelation(from, to);
      if (corr) {
        const lagInfo = corr.leadLagDays !== 0
          ? `${from} ${corr.leadLagDays > 0 ? '领先' : '滞后'} ${Math.abs(corr.leadLagDays)}天`
          : '同步';

        console.log(`  ${from} → ${to}: 相关性 ${(corr.correlation * 100).toFixed(1)}% (${lagInfo})`);
      } else {
        console.log(`  ${from} → ${to}: 数据不足`);
      }
    }
    console.log('');
  }

  // ============ 第八部分: 周期对比分析 ============
  console.log('─'.repeat(70));
  console.log('第八部分: 周期对比分析');
  console.log('─'.repeat(70) + '\n');

  const cycleCompare = [
    { symbol: 'LRCX', type: '中周期 (半导体设备)' },
    { symbol: 'NVDA', type: '中周期 (AI芯片)' },
    { symbol: 'XOM', type: '晚周期 (能源)' },
    { symbol: 'JNJ', type: '防御型 (医疗)' },
    { symbol: 'PG', type: '防御型 (消费)' },
  ];

  console.log('【LRCX 与不同周期股票的相关性】\n');

  for (const { symbol, type } of cycleCompare) {
    if (symbol === 'LRCX') continue;

    const corr = await analyzer.calculateCorrelation('LRCX', symbol);
    if (corr) {
      const interpretation = corr.correlation > 0.5
        ? '同向波动'
        : corr.correlation < -0.2
          ? '对冲潜力'
          : '弱相关';

      console.log(`  LRCX vs ${symbol} (${type})`);
      console.log(`    相关性: ${(corr.correlation * 100).toFixed(1)}% - ${interpretation}`);
    }
  }

  // ============ 第九部分: 投资启示 ============
  console.log('\n' + '─'.repeat(70));
  console.log('第九部分: 投资启示');
  console.log('─'.repeat(70) + '\n');

  // 找出最高相关的股票
  const highCorr = correlationResults.filter(r => r.correlation > 0.7);
  const lowCorr = correlationResults.filter(r => r.correlation < 0.3);

  console.log('【高度相关股票】(相关性 > 70%)');
  console.log('  这些股票与 LRCX 高度同步，适合作为板块轮动参考:');
  for (const r of highCorr.slice(0, 5)) {
    console.log(`  - ${r.symbolB}: ${(r.correlation * 100).toFixed(1)}%`);
  }

  console.log('\n【弱相关/对冲股票】(相关性 < 30%)');
  console.log('  这些股票与 LRCX 走势分离，可用于分散风险:');
  for (const r of lowCorr.slice(0, 5)) {
    console.log(`  - ${r.symbolB}: ${(r.correlation * 100).toFixed(1)}%`);
  }

  // 统计验证率
  const validatedRels = lrcxRelations.filter(r => {
    const corr = correlationResults.find(c =>
      c.symbolB === (r.sourceSymbol === 'LRCX' ? r.targetSymbol : r.sourceSymbol)
    );
    return corr && corr.correlation > 0.3;
  });

  console.log('\n【框架验证结果】');
  console.log(`  LRCX 关系总数: ${lrcxRelations.length}`);
  console.log(`  价格验证通过: ${validatedRels.length}`);
  console.log(`  验证率: ${((validatedRels.length / lrcxRelations.length) * 100).toFixed(1)}%`);

  console.log('\n' + '═'.repeat(70));
  console.log('                    报告结束');
  console.log('═'.repeat(70) + '\n');
}

generateLRCXReport().catch(console.error);
