/**
 * 综合关系测试
 *
 * 验证用户最初提出的三种关系类型：
 * 1. 上下游关系 - 如 LRCX → TSM → NVDA
 * 2. 相似商业模式 - 如 MAR vs ABNB
 * 3. 客群重合 - 如 LULU vs CELH
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';

async function testAllRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           公司关系框架 - 综合测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 选取覆盖三种关系类型的公司
  const testSymbols = [
    // === 上下游关系测试 ===
    'LRCX', 'AMAT',           // 半导体设备
    'TSM', 'NVDA', 'AAPL',    // 下游链条

    // === 商业模式变体测试 ===
    'MAR', 'HLT', 'ABNB',     // 酒店
    'WMT', 'AMZN', 'COST',    // 零售
    'MCD', 'CMG',             // 餐饮
    'F', 'TSLA',              // 汽车

    // === 客群重合测试 ===
    'LULU', 'NKE', 'CELH',    // 健身生活方式
    'SBUX',                   // 咖啡 (millennials)
    'NFLX', 'SPOT',           // 流媒体

    // === 周期/宏观测试 ===
    'XOM', 'JNJ', 'PG',       // 晚周期、防御
  ];

  console.log(`📊 测试公司 (${testSymbols.length}个): ${testSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(testSymbols);

  console.log(`\n✅ 图谱构建完成: ${graph.metadata.totalRelations} 个关系\n`);

  // 按关系类型分组统计
  const relationStats: Record<string, number> = {};
  for (const edge of graph.edges) {
    relationStats[edge.relationType] = (relationStats[edge.relationType] || 0) + 1;
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('关系类型分布');
  console.log('═══════════════════════════════════════════════════════════════\n');

  for (const [type, count] of Object.entries(relationStats).sort((a, b) => b[1] - a[1])) {
    const desc = RelationEngine.getRelationDescription(type as RelationType);
    console.log(`  ${desc}: ${count}`);
  }

  // === 验证1: 上下游关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('验证1: 上下游关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const upstreamRels = graph.edges.filter(e => e.relationType === RelationType.UPSTREAM);
  const downstreamRels = graph.edges.filter(e => e.relationType === RelationType.DOWNSTREAM);

  console.log(`上游关系: ${upstreamRels.length}个`);
  for (const rel of upstreamRels.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 验证2: 商业模式关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('验证2: 商业模式关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const modelPeers = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_PEER);
  const modelVariants = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_VARIANT);

  console.log(`商业模式相似 (直接竞争): ${modelPeers.length}个`);
  for (const rel of modelPeers) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  console.log(`\n商业模式变体 (间接竞争): ${modelVariants.length}个`);
  for (const rel of modelVariants) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}`);
    console.log(`    ${rel.evidence}`);
  }

  // === 验证3: 客群重合 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('验证3: 客群重合');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const customerOverlap = graph.edges.filter(e => e.relationType === RelationType.CUSTOMER_OVERLAP);

  console.log(`客群重合关系: ${customerOverlap.length}个`);
  for (const rel of customerOverlap) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 验证4: 周期同步 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('验证4: 周期同步');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cycleSync = graph.edges.filter(e => e.relationType === RelationType.CYCLE_SYNC);

  console.log(`周期同步关系: ${cycleSync.length}个`);
  for (const rel of cycleSync.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 典型案例验证 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('典型案例验证');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const testCases = [
    { a: 'LRCX', b: 'TSM', expected: '上游供应商', desc: '半导体设备→代工' },
    { a: 'MAR', b: 'ABNB', expected: '商业模式变体', desc: '传统酒店 vs 短租' },
    { a: 'LULU', b: 'CELH', expected: '客群重合', desc: '健身人群' },
    { a: 'WMT', b: 'AMZN', expected: '商业模式变体', desc: '实体 vs 电商' },
    { a: 'F', b: 'TSLA', expected: '商业模式变体', desc: '经销商 vs 直销' },
  ];

  for (const { a, b, expected, desc } of testCases) {
    const rels = graph.edges.filter(
      e => (e.sourceSymbol === a && e.targetSymbol === b) ||
           (e.sourceSymbol === b && e.targetSymbol === a)
    );

    const found = rels.some(r => RelationEngine.getRelationDescription(r.relationType) === expected);

    console.log(`  ${a} vs ${b} (${desc})`);
    console.log(`    预期: ${expected}`);
    console.log(`    实际: ${rels.map(r => RelationEngine.getRelationDescription(r.relationType)).join(', ') || '无关系'}`);
    console.log(`    结果: ${found ? '✅ 通过' : '❌ 未找到'}\n`);
  }

  // === 总结 ===
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('测试总结');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const summary = {
    '上下游关系': upstreamRels.length + downstreamRels.length,
    '商业模式关系': modelPeers.length + modelVariants.length,
    '客群重合': customerOverlap.length,
    '周期同步': cycleSync.length,
    '同行业竞争': graph.edges.filter(e => e.relationType === RelationType.COMPETITOR).length,
  };

  for (const [type, count] of Object.entries(summary)) {
    console.log(`  ${type}: ${count}个`);
  }

  console.log(`\n  总关系数: ${graph.metadata.totalRelations}`);

  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

testAllRelations().catch(console.error);
