/**
 * 测试商业模式关系推导
 */
import 'dotenv/config';
import {
  getBusinessModel,
  areBusinessModelVariants,
  calculateBusinessModelSimilarity,
  getCompaniesBySegment,
  getAllSegments,
  getBusinessModelStats,
} from '../config/business-models.js';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';

async function testBusinessModels() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           商业模式关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 1. 统计信息
  const stats = getBusinessModelStats();
  console.log('【配置统计】');
  console.log(`  总公司数: ${stats.totalCompanies}`);
  console.log(`  行业细分: ${stats.segments}个\n`);

  console.log('  各行业公司数:');
  for (const [segment, count] of Object.entries(stats.bySegment).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${segment}: ${count}`);
  }

  // 2. 测试几个典型案例
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('【典型案例分析】');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const testCases = [
    // 酒店行业
    { a: 'MAR', b: 'HLT', desc: '传统酒店 vs 传统酒店' },
    { a: 'MAR', b: 'ABNB', desc: '传统酒店 vs 短租平台' },
    { a: 'BKNG', b: 'ABNB', desc: 'OTA vs 短租平台' },

    // 零售行业
    { a: 'WMT', b: 'TGT', desc: '大卖场 vs 大卖场' },
    { a: 'WMT', b: 'AMZN', desc: '实体零售 vs 电商' },
    { a: 'COST', b: 'AMZN', desc: '会员仓储 vs 电商' },

    // 餐饮行业
    { a: 'MCD', b: 'YUM', desc: '快餐加盟 vs 快餐加盟' },
    { a: 'MCD', b: 'CMG', desc: '快餐加盟 vs 快休闲自营' },
    { a: 'SBUX', b: 'DASH', desc: '咖啡连锁 vs 外卖平台' },

    // 流媒体
    { a: 'NFLX', b: 'DIS', desc: '纯流媒体 vs 综合娱乐' },
    { a: 'NFLX', b: 'SPOT', desc: '视频流媒体 vs 音乐流媒体' },

    // 支付
    { a: 'V', b: 'MA', desc: '卡组织 vs 卡组织' },
    { a: 'V', b: 'PYPL', desc: '卡组织 vs 数字支付' },
    { a: 'SQ', b: 'PYPL', desc: '数字支付 vs 数字支付' },

    // 汽车
    { a: 'F', b: 'GM', desc: '传统车企 vs 传统车企' },
    { a: 'F', b: 'TSLA', desc: '传统车企 vs EV直销' },
    { a: 'TSLA', b: 'RIVN', desc: 'EV直销 vs EV直销' },
  ];

  for (const { a, b, desc } of testCases) {
    const modelA = getBusinessModel(a);
    const modelB = getBusinessModel(b);

    if (!modelA || !modelB) {
      console.log(`  ${a} vs ${b}: 缺少配置\n`);
      continue;
    }

    const similarity = calculateBusinessModelSimilarity(modelA, modelB);
    const variant = areBusinessModelVariants(modelA, modelB);

    console.log(`  ${a} vs ${b} (${desc})`);
    console.log(`    行业: ${modelA.industrySegment}`);
    console.log(`    资产模式: ${modelA.assetModel} vs ${modelB.assetModel}`);
    console.log(`    客户模式: ${modelA.customerModel} vs ${modelB.customerModel}`);
    console.log(`    相似度: ${(similarity * 100).toFixed(0)}%`);
    console.log(`    是否变体: ${variant.isVariant ? '✅ ' + variant.reason : '❌ 同类模式'}`);
    console.log('');
  }

  // 3. 构建关系图谱测试
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('【关系图谱测试】');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 选取有商业模式配置的公司
  const testSymbols = [
    // 酒店
    'MAR', 'HLT', 'ABNB', 'BKNG',
    // 零售
    'WMT', 'TGT', 'AMZN', 'COST',
    // 餐饮
    'MCD', 'CMG', 'SBUX', 'DPZ',
    // 流媒体
    'NFLX', 'DIS', 'SPOT',
    // 支付
    'V', 'MA', 'PYPL', 'SQ',
  ];

  console.log(`测试公司: ${testSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(testSymbols);

  // 筛选商业模式关系
  const businessModelRelations = graph.edges.filter(
    e => e.relationType === RelationType.BUSINESS_MODEL_PEER ||
         e.relationType === RelationType.BUSINESS_MODEL_VARIANT
  );

  console.log(`\n商业模式关系数: ${businessModelRelations.length}\n`);

  // 按类型分组
  const peers = businessModelRelations.filter(e => e.relationType === RelationType.BUSINESS_MODEL_PEER);
  const variants = businessModelRelations.filter(e => e.relationType === RelationType.BUSINESS_MODEL_VARIANT);

  console.log(`【商业模式相似 (直接竞争)】: ${peers.length}个`);
  for (const rel of peers.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  console.log(`\n【商业模式变体 (间接竞争/替代品)】: ${variants.length}个`);
  for (const rel of variants) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}`);
    console.log(`    ${rel.evidence}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('测试完成');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

testBusinessModels().catch(console.error);
