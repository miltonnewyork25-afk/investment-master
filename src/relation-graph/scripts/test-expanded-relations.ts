/**
 * 扩展关系测试
 *
 * 验证新增的公司关系配置：
 * 1. 金融科技 - SOFI, HOOD, COIN, AFRM
 * 2. 云/SaaS - DDOG, NET, ZM, TEAM
 * 3. 饮料 - KO, PEP, MNST, CELH
 * 4. 社交媒体 - META, SNAP, PINS
 * 5. 游戏 - EA, TTWO, RBLX
 * 6. 医疗健康 - CVS, TDOC, HIMS
 * 7. 半导体 - NVDA, AMD, LRCX, TSM
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModelStats } from '../config/business-models.js';

async function testExpandedRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           扩展关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 先显示配置统计
  const stats = getBusinessModelStats();
  console.log('【商业模式配置统计】');
  console.log(`  总公司数: ${stats.totalCompanies}`);
  console.log(`  行业细分: ${stats.segments}个\n`);
  console.log('  各行业公司数:');
  for (const [segment, count] of Object.entries(stats.bySegment).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${segment}: ${count}`);
  }

  // 选取测试公司
  const testSymbols = [
    // 金融科技
    'V', 'MA', 'PYPL', 'SQ', 'SOFI', 'HOOD', 'COIN', 'AFRM',

    // 云/SaaS
    'CRM', 'NOW', 'DDOG', 'NET', 'ZM', 'CRWD', 'PANW',

    // 饮料 (客群重合测试重点)
    'KO', 'PEP', 'MNST', 'CELH',

    // 社交媒体
    'META', 'SNAP', 'PINS', 'GOOGL',

    // 游戏
    'EA', 'TTWO', 'RBLX', 'NFLX', 'SPOT',

    // 医疗健康
    'CVS', 'WBA', 'TDOC', 'HIMS',

    // 半导体链条
    'LRCX', 'AMAT', 'ASML', 'TSM', 'NVDA', 'AMD',
  ];

  console.log(`\n📊 测试公司 (${testSymbols.length}个): ${testSymbols.join(', ')}\n`);

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

  // === 测试案例 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('典型案例验证');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const testCases = [
    // 金融科技
    { a: 'V', b: 'MA', expected: '商业模式相似', desc: '卡组织竞争' },
    { a: 'V', b: 'PYPL', expected: '商业模式变体', desc: '卡组织 vs 数字钱包' },
    { a: 'SOFI', b: 'HOOD', expected: '客群重合', desc: '年轻投资者' },
    { a: 'COIN', b: 'HOOD', expected: '客群重合', desc: '加密交易者' },

    // SaaS/云
    { a: 'CRM', b: 'NOW', expected: '商业模式相似', desc: 'SaaS竞争' },
    { a: 'CRWD', b: 'PANW', expected: '商业模式相似', desc: '网络安全竞争' },
    { a: 'DDOG', b: 'NET', expected: '商业模式相似', desc: '开发者SaaS' },

    // 饮料 - 商业模式变体 (不同交付模式)
    { a: 'CELH', b: 'MNST', expected: '商业模式变体', desc: '能量饮料 - 直销vs加盟' },
    { a: 'KO', b: 'PEP', expected: '商业模式变体', desc: '饮料巨头' },

    // 社交媒体 - 商业模式变体 (不同资产模式)
    { a: 'META', b: 'SNAP', expected: '商业模式变体', desc: '社交媒体 - 重资产vs轻资产' },
    { a: 'SNAP', b: 'RBLX', expected: '客群重合', desc: 'Gen Z用户' },

    // 游戏
    { a: 'EA', b: 'TTWO', expected: '商业模式相似', desc: '游戏发行商' },
    { a: 'NFLX', b: 'SPOT', expected: '商业模式变体', desc: '流媒体竞争' },

    // 医疗 - 商业模式变体 (不同客户模式)
    { a: 'CVS', b: 'WBA', expected: '商业模式相似', desc: '药店竞争' },
    { a: 'TDOC', b: 'HIMS', expected: '客群重合', desc: '远程医疗 - 同类客群' },

    // 半导体链条
    { a: 'LRCX', b: 'AMAT', expected: '同行业竞争', desc: '设备商竞争' },
    { a: 'LRCX', b: 'TSM', expected: '上游供应商', desc: '设备→代工' },
    { a: 'TSM', b: 'NVDA', expected: '上游供应商', desc: '代工→芯片设计' },
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
  console.log('商业模式关系详情');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const modelPeers = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_PEER);
  const modelVariants = graph.edges.filter(e => e.relationType === RelationType.BUSINESS_MODEL_VARIANT);

  console.log(`【商业模式相似】: ${modelPeers.length}个`);
  for (const rel of modelPeers.slice(0, 15)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (modelPeers.length > 15) {
    console.log(`  ... 还有 ${modelPeers.length - 15} 个`);
  }

  console.log(`\n【商业模式变体】: ${modelVariants.length}个`);
  for (const rel of modelVariants.slice(0, 15)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}`);
    console.log(`    ${rel.evidence}`);
  }

  // === 客群重合详情 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('客群重合详情');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const customerOverlap = graph.edges.filter(e => e.relationType === RelationType.CUSTOMER_OVERLAP);
  console.log(`客群重合关系: ${customerOverlap.length}个`);
  for (const rel of customerOverlap) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
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

testExpandedRelations().catch(console.error);
