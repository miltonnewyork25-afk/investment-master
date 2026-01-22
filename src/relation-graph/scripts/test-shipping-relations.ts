/**
 * 航运物流行业关系测试
 *
 * 验证:
 * 1. 集装箱航运: ZIM, MATX
 * 2. 干散货航运: GOGL, SBLK, GNK
 * 3. 油轮运输: FRO, STNG, DHT
 * 4. 快递物流: FDX, UPS
 * 5. 货代/经纪: EXPD, CHRW
 * 6. 铁路: UNP, CSX
 * 7. 下游零售: AMZN, WMT
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModelStats, getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testShippingRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           航运物流行业关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司
  const shippingSymbols = [
    // 集装箱航运
    'ZIM', 'MATX',
    // 干散货航运
    'GOGL', 'SBLK', 'GNK',
    // 油轮运输
    'FRO', 'STNG', 'DHT',
    // 快递物流
    'FDX', 'UPS',
    // 货代/经纪
    'EXPD', 'CHRW',
    // 卡车/3PL
    'XPO', 'JBHT',
    // 铁路
    'UNP', 'CSX',
    // 下游零售 (验证上下游关系)
    'AMZN', 'WMT',
    // 能源 (验证油轮与炼厂关系)
    'VLO', 'MPC',
    // 钢铁 (验证干散货与钢厂关系)
    'NUE', 'CLF',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of shippingSymbols.slice(0, 16)) {
    const model = getBusinessModel(symbol);
    const cycle = getCyclePosition(symbol);
    if (model) {
      console.log(`  ${symbol}: ${model.industrySegment} | ${model.assetModel} | 周期: ${cycle || 'N/A'}`);
    } else {
      console.log(`  ${symbol}: ⚠️ 无商业模式配置`);
    }
  }

  console.log(`\n📊 测试公司 (${shippingSymbols.length}个): ${shippingSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(shippingSymbols);

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

  // === 测试案例 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('典型案例验证');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const testCases = [
    // 同行业竞争
    { a: 'ZIM', b: 'MATX', expected: '商业模式相似', desc: '集装箱航运竞争' },
    { a: 'GOGL', b: 'SBLK', expected: '商业模式相似', desc: '干散货航运竞争' },
    { a: 'FRO', b: 'DHT', expected: '商业模式相似', desc: '油轮VLCC竞争' },
    { a: 'FDX', b: 'UPS', expected: '商业模式相似', desc: '快递物流竞争' },
    { a: 'UNP', b: 'CSX', expected: '商业模式相似', desc: '铁路竞争' },

    // 商业模式变体
    { a: 'FDX', b: 'EXPD', expected: '商业模式变体', desc: '快递vs货代' },
    { a: 'UNP', b: 'JBHT', expected: '商业模式变体', desc: '铁路vs联运' },

    // 周期同步
    { a: 'ZIM', b: 'GOGL', expected: '周期同步', desc: '海运周期同步' },
    { a: 'FRO', b: 'STNG', expected: '周期同步', desc: '油轮周期同步' },

    // 宏观因子
    { a: 'FRO', b: 'VLO', expected: '宏观因子正相关', desc: '油轮与炼厂' },
  ];

  let passed = 0;
  let failed = 0;

  for (const { a, b, expected, desc } of testCases) {
    const rels = graph.edges.filter(
      e => (e.sourceSymbol === a && e.targetSymbol === b) ||
           (e.sourceSymbol === b && e.targetSymbol === a)
    );

    const found = rels.some(r => RelationEngine.getRelationDescription(r.relationType) === expected);

    console.log(`  ${a} vs ${b} (${desc})`);
    console.log(`    预期: ${expected}`);
    console.log(`    实际: ${rels.map(r => RelationEngine.getRelationDescription(r.relationType)).join(', ') || '无关系'}`);

    if (found) {
      console.log(`    结果: ✅ 通过\n`);
      passed++;
    } else {
      console.log(`    结果: ❌ 未找到\n`);
      failed++;
    }
  }

  // === 商业模式关系详情 ===
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('航运物流商业模式关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const modelPeers = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_PEER);
  const modelVariants = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_VARIANT);

  console.log(`【商业模式相似】: ${modelPeers.length}个`);
  for (const rel of modelPeers) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  console.log(`\n【商业模式变体】: ${modelVariants.length}个`);
  for (const rel of modelVariants) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 周期同步关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('周期同步关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cycleSync = graph.edges.filter(e => e.relationType === RelationType.CYCLE_SYNC);
  console.log(`周期同步关系: ${cycleSync.length}个`);
  for (const rel of cycleSync) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 上下游关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('上下游关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const upstream = graph.edges.filter(e => e.relationType === RelationType.UPSTREAM_SUPPLIER);
  const downstream = graph.edges.filter(e => e.relationType === RelationType.DOWNSTREAM_CUSTOMER);

  console.log(`上游供应商关系: ${upstream.length}个`);
  for (const rel of upstream) {
    console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}: ${rel.evidence}`);
  }

  console.log(`\n下游客户关系: ${downstream.length}个`);
  for (const rel of downstream) {
    console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 总结 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('测试总结');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`  通过: ${passed}/${testCases.length}`);
  console.log(`  失败: ${failed}/${testCases.length}`);
  console.log(`  通过率: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

testShippingRelations().catch(console.error);
