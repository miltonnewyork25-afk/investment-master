/**
 * 测试新增的关系类型
 *
 * 规则7: 跨产业链关联
 * 规则8: 客群重合
 * 规则9: 宏观敏感度
 * 规则10: 周期同步
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';

async function testNewRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           新增关系类型测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试用例: 混合多种关系类型的公司
  const testSymbols = [
    // 健身/健康生活方式 - 客群重合测试
    'LULU', 'CELH', 'NKE',
    // 旅游链 - 客群重合测试
    'BKNG', 'ABNB', 'MAR', 'DAL',
    // 跨链影响 - 半导体/云
    'NVDA', 'AMZN', 'MSFT',
    // 周期同步 - 早周期 (房地产/银行)
    'LEN', 'DHI', 'JPM', 'BAC',
    // 周期同步 - 晚周期 (能源)
    'XOM', 'CVX', 'SLB',
    // 周期同步 - 防御型
    'JNJ', 'PG', 'KO', 'WMT',
  ];

  console.log(`📊 测试公司: ${testSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(testSymbols);

  // 按关系类型分组统计
  const relationGroups: Record<string, typeof graph.edges> = {};
  for (const edge of graph.edges) {
    if (!relationGroups[edge.relationType]) {
      relationGroups[edge.relationType] = [];
    }
    relationGroups[edge.relationType].push(edge);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('关系类型分布:');
  console.log('═══════════════════════════════════════════════════════════════\n');

  for (const [type, edges] of Object.entries(relationGroups)) {
    const desc = RelationEngine.getRelationDescription(type as RelationType);
    console.log(`📌 ${desc}: ${edges.length}个`);
  }

  // 详细显示新增关系类型
  const newRelationTypes = [
    RelationType.CROSS_CHAIN,
    RelationType.CUSTOMER_OVERLAP,
    RelationType.MACRO_CORRELATED,
    RelationType.MACRO_INVERSE,
    RelationType.CYCLE_SYNC,
  ];

  for (const relType of newRelationTypes) {
    const edges = relationGroups[relType] || [];
    if (edges.length > 0) {
      const desc = RelationEngine.getRelationDescription(relType);
      console.log(`\n═══════════════════════════════════════════════════════════════`);
      console.log(`🔗 ${desc} (${edges.length}个关系)`);
      console.log(`═══════════════════════════════════════════════════════════════\n`);

      // 显示前10个
      for (const edge of edges.slice(0, 10)) {
        console.log(`  ${edge.sourceSymbol} ↔ ${edge.targetSymbol}`);
        console.log(`    强度: ${(edge.strength * 100).toFixed(0)}%`);
        console.log(`    依据: ${edge.evidence}\n`);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`📈 总计: ${graph.metadata.totalRelations}个关系`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

testNewRelations().catch(console.error);
