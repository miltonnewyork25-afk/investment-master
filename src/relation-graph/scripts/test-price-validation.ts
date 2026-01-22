/**
 * 股价相关性验证测试
 *
 * 用真实股价数据验证已推导的公司关系
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine, getPriceCorrelationAnalyzer } from '../index.js';
import { RelationType } from '../types/index.js';

async function testPriceValidation() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           股价相关性验证测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const analyzer = getPriceCorrelationAnalyzer();

  // 测试公司：包含上下游、竞争、跨链等多种关系
  const testSymbols = [
    // 半导体产业链
    'LRCX', 'AMAT', 'ASML', 'KLAC',  // 设备商
    'TSM', 'INTC', 'MU', 'NVDA',     // 芯片/代工
    // 消费/零售
    'LULU', 'NKE', 'CELH',           // 健身/健康
    // 防御型
    'JNJ', 'PG', 'KO',
    // 能源
    'XOM', 'CVX',
  ];

  console.log(`📊 构建关系图谱: ${testSymbols.join(', ')}\n`);

  // 1. 构建基于规则的关系图谱
  const graph = await buildCompanyGraph(testSymbols);

  console.log(`\n✅ 图谱构建完成: ${graph.metadata.totalRelations} 个关系\n`);

  // 按关系类型分组
  const relationGroups: Record<string, typeof graph.edges> = {};
  for (const edge of graph.edges) {
    if (!relationGroups[edge.relationType]) {
      relationGroups[edge.relationType] = [];
    }
    relationGroups[edge.relationType].push(edge);
  }

  // 2. 选取重点关系进行价格验证
  const keyRelationTypes = [
    RelationType.UPSTREAM,
    RelationType.DOWNSTREAM,
    RelationType.COMPETITOR,
    RelationType.CYCLE_SYNC,
    RelationType.CUSTOMER_OVERLAP,
  ];

  const relationsToValidate = graph.edges.filter(
    e => keyRelationTypes.includes(e.relationType)
  );

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`🔍 验证 ${relationsToValidate.length} 个重点关系`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 3. 批量验证关系
  const validationResults = await analyzer.validateRelations(relationsToValidate);

  // 4. 统计验证结果
  const stats = {
    total: validationResults.length,
    validated: 0,
    partial: 0,
    failed: 0,
  };

  const resultsByType: Record<string, typeof validationResults> = {};

  for (const result of validationResults) {
    const type = result.relation.relationType;
    if (!resultsByType[type]) {
      resultsByType[type] = [];
    }
    resultsByType[type].push(result);

    if (result.validated) {
      if (result.validationNote.includes('✅')) {
        stats.validated++;
      } else {
        stats.partial++;
      }
    } else {
      stats.failed++;
    }
  }

  // 5. 按关系类型输出详细结果
  for (const [type, results] of Object.entries(resultsByType)) {
    const desc = RelationEngine.getRelationDescription(type as RelationType);
    const validCount = results.filter(r => r.validated).length;

    console.log(`\n┌─────────────────────────────────────────────────────────────┐`);
    console.log(`│ ${desc} (${validCount}/${results.length} 验证通过)`);
    console.log(`└─────────────────────────────────────────────────────────────┘\n`);

    for (const result of results) {
      const rel = result.relation;
      console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}`);
      console.log(`    原始依据: ${rel.evidence}`);
      console.log(`    价格相关: ${(result.priceCorrelation * 100).toFixed(1)}%`);
      if (result.leadLagDays !== 0) {
        console.log(`    领先滞后: ${result.leadLagDays > 0 ? rel.sourceSymbol + '领先' : rel.targetSymbol + '领先'} ${Math.abs(result.leadLagDays)}天`);
      }
      console.log(`    验证结果: ${result.validationNote}\n`);
    }
  }

  // 6. 额外分析: 寻找领先滞后关系
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🔮 领先滞后关系探测');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 用半导体设备商作为领先指标
  const leadingIndicator = 'LRCX';
  const candidates = ['TSM', 'INTC', 'MU', 'NVDA', 'ASML', 'AMAT'];

  const leadLagResults = await analyzer.findLeadLagRelations(leadingIndicator, candidates, 0.4);

  if (leadLagResults.length > 0) {
    console.log(`📈 以 ${leadingIndicator} 为基准的领先滞后关系:\n`);
    for (const result of leadLagResults) {
      const direction = result.leadLagDays > 0 ? '领先' : '滞后';
      console.log(`  ${leadingIndicator} ${direction} ${result.symbolB} ${Math.abs(result.leadLagDays)}天`);
      console.log(`    相关性: ${(result.leadLagCorrelation * 100).toFixed(1)}%`);
      console.log(`    同期相关性: ${(result.correlation * 100).toFixed(1)}%\n`);
    }
  } else {
    console.log(`  未检测到显著的领先滞后关系`);
  }

  // 7. 额外分析: 找出最高相关性的股票对
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🔥 最高股价相关性排名');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const correlationMatrix = await analyzer.analyzeCorrelationMatrix(testSymbols);
  const correlationList = Array.from(correlationMatrix.values())
    .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  console.log('正相关 TOP 10:\n');
  const positiveCorr = correlationList.filter(c => c.correlation > 0).slice(0, 10);
  for (const corr of positiveCorr) {
    console.log(`  ${corr.symbolA} ↔ ${corr.symbolB}: ${(corr.correlation * 100).toFixed(1)}%`);
  }

  console.log('\n负相关 (对冲):\n');
  const negativeCorr = correlationList.filter(c => c.correlation < -0.2);
  if (negativeCorr.length > 0) {
    for (const corr of negativeCorr) {
      console.log(`  ${corr.symbolA} ↔ ${corr.symbolB}: ${(corr.correlation * 100).toFixed(1)}%`);
    }
  } else {
    console.log('  未发现显著负相关');
  }

  // 8. 总结报告
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('📋 验证总结报告');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const validationRate = ((stats.validated + stats.partial) / stats.total * 100).toFixed(1);

  console.log(`  总关系数: ${stats.total}`);
  console.log(`  ✅ 完全验证: ${stats.validated} (${(stats.validated / stats.total * 100).toFixed(1)}%)`);
  console.log(`  ⚠️ 部分验证: ${stats.partial} (${(stats.partial / stats.total * 100).toFixed(1)}%)`);
  console.log(`  ❌ 未验证: ${stats.failed} (${(stats.failed / stats.total * 100).toFixed(1)}%)`);
  console.log(`\n  综合验证率: ${validationRate}%\n`);

  // 关系类型验证率
  console.log('  各类型验证率:');
  for (const [type, results] of Object.entries(resultsByType)) {
    const desc = RelationEngine.getRelationDescription(type as RelationType);
    const validCount = results.filter(r => r.validated).length;
    const rate = (validCount / results.length * 100).toFixed(0);
    console.log(`    ${desc}: ${rate}% (${validCount}/${results.length})`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

testPriceValidation().catch(console.error);
