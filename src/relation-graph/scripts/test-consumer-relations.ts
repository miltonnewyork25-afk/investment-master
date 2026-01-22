/**
 * 消费品行业关系测试
 *
 * 产业链:
 * - 必需消费品: 农业投入 → 农产品 → 加工/包装食品 → 零售/餐饮
 * - 可选消费品: 家居建材 → 房建 | 餐饮 | 服装 | 专业零售 | 邮轮
 *
 * 验证:
 * 1. 必需消费品 (Defensive)
 *    - 家居用品: PG, CL, KMB, CHD, CLX
 *    - 包装食品: GIS, K, KHC, HSY, CAG, CPB, SJM, MDLZ
 *    - 饮料: KO, PEP, MNST, KDP
 *    - 烟草: PM, MO, BTI
 *    - 食品零售: WMT, COST, KR, DG, DLTR
 *    - 食品分销: SYY, USFD
 *
 * 2. 可选消费品 (Early Cycle)
 *    - 家居建材: HD, LOW
 *    - 餐饮: MCD, SBUX, CMG, YUM, DRI
 *    - 服装零售: GPS, ANF, AEO, URBN
 *    - 专业零售: BBY, ULTA, RH, WSM
 *    - 汽配零售: ORLY, AZO, AAP
 *    - 邮轮: RCL, CCL, NCLH
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testConsumerRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           消费品行业关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司 - 覆盖消费品各细分
  const consumerSymbols = [
    // 必需消费品 - 家居用品
    'PG', 'CL', 'KMB', 'CHD', 'CLX',
    // 必需消费品 - 包装食品
    'GIS', 'K', 'KHC', 'HSY', 'CAG', 'CPB', 'SJM', 'MDLZ', 'HRL',
    // 必需消费品 - 饮料
    'KO', 'PEP', 'MNST', 'KDP',
    // 必需消费品 - 烟草
    'PM', 'MO', 'BTI',
    // 必需消费品 - 食品零售
    'WMT', 'COST', 'KR',
    // 必需消费品 - 折扣零售
    'DG', 'DLTR',
    // 必需消费品 - 食品分销
    'SYY', 'USFD',
    // 可选消费品 - 家居建材
    'HD', 'LOW',
    // 可选消费品 - 餐饮
    'MCD', 'SBUX', 'CMG', 'YUM', 'DRI', 'QSR', 'WING',
    // 可选消费品 - 服装零售
    'GPS', 'ANF', 'AEO', 'URBN',
    // 可选消费品 - 专业零售
    'BBY', 'ULTA', 'RH', 'WSM',
    // 可选消费品 - 汽配零售
    'ORLY', 'AZO', 'AAP',
    // 可选消费品 - 邮轮
    'RCL', 'CCL', 'NCLH',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of consumerSymbols) {
    const model = getBusinessModel(symbol);
    const cycle = getCyclePosition(symbol);
    const macro = getMacroSensitivity(symbol);
    if (model) {
      const confSens = macro ? `消费者信心敏感度: ${macro.consumerConfidence}` : '';
      console.log(`  ${symbol}: ${model.industrySegment} | 周期: ${cycle || 'N/A'} | ${confSens}`);
    } else {
      console.log(`  ${symbol}: ⚠️ 无商业模式配置`);
    }
  }

  console.log(`\n📊 测试公司 (${consumerSymbols.length}个): ${consumerSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(consumerSymbols);

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
    // 同行业竞争 - 家居用品
    { a: 'PG', b: 'CL', expected: '商业模式相似', desc: '家居用品竞争' },
    { a: 'KMB', b: 'CLX', expected: '商业模式相似', desc: '家居用品竞争' },

    // 同行业竞争 - 包装食品
    { a: 'GIS', b: 'K', expected: '商业模式相似', desc: '包装食品竞争' },
    { a: 'CAG', b: 'CPB', expected: '商业模式相似', desc: '包装食品竞争' },

    // 同行业竞争 - 饮料
    { a: 'KO', b: 'PEP', expected: '商业模式相似', desc: '饮料竞争' },

    // 同行业竞争 - 烟草
    { a: 'PM', b: 'MO', expected: '商业模式相似', desc: '烟草竞争' },
    { a: 'PM', b: 'BTI', expected: '商业模式相似', desc: '烟草竞争' },

    // 同行业竞争 - 食品零售
    { a: 'WMT', b: 'COST', expected: '商业模式相似', desc: '大型零售竞争' },

    // 同行业竞争 - 折扣零售
    { a: 'DG', b: 'DLTR', expected: '商业模式相似', desc: '折扣零售竞争' },

    // 同行业竞争 - 食品分销
    { a: 'SYY', b: 'USFD', expected: '商业模式相似', desc: '食品分销竞争' },

    // 同行业竞争 - 家居建材
    { a: 'HD', b: 'LOW', expected: '商业模式相似', desc: '家居建材竞争' },

    // 同行业竞争 - 餐饮
    { a: 'MCD', b: 'YUM', expected: '商业模式相似', desc: 'QSR竞争' },
    { a: 'SBUX', b: 'CMG', expected: '商业模式变体', desc: '快餐不同模式' },

    // 同行业竞争 - 汽配零售
    { a: 'ORLY', b: 'AZO', expected: '商业模式相似', desc: '汽配零售竞争' },

    // 同行业竞争 - 邮轮
    { a: 'RCL', b: 'CCL', expected: '商业模式相似', desc: '邮轮竞争' },
    { a: 'CCL', b: 'NCLH', expected: '商业模式相似', desc: '邮轮竞争' },

    // 周期同步 - 必需消费品都是防御型
    { a: 'PG', b: 'KO', expected: '周期同步', desc: '必需消费品防御型' },
    { a: 'GIS', b: 'KMB', expected: '周期同步', desc: '必需消费品防御型' },

    // 周期同步 - 可选消费品都是早周期
    { a: 'HD', b: 'LOW', expected: '周期同步', desc: '家居建材早周期' },
    { a: 'RCL', b: 'CCL', expected: '周期同步', desc: '邮轮早周期' },

    // 宏观因子正相关 - 低敏感度必需消费
    { a: 'PG', b: 'CL', expected: '宏观因子正相关', desc: '家居用品低宏观敏感' },
    { a: 'KO', b: 'PEP', expected: '宏观因子正相关', desc: '饮料低宏观敏感' },

    // 宏观因子正相关 - 高敏感度可选消费
    { a: 'HD', b: 'LOW', expected: '宏观因子正相关', desc: '家居建材高房市敏感' },
    { a: 'RCL', b: 'CCL', expected: '宏观因子正相关', desc: '邮轮高消费者信心敏感' },
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

  // === 商业模式关系 ===
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('商业模式关系');
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
  for (const rel of modelVariants.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (modelVariants.length > 10) {
    console.log(`  ... 还有 ${modelVariants.length - 10} 个`);
  }

  // === 周期同步 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('周期同步关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cycleSync = graph.edges.filter(e => e.relationType === RelationType.CYCLE_SYNC);
  console.log(`周期同步关系: ${cycleSync.length}个`);

  // 按周期分组显示
  const defensiveCycle = cycleSync.filter(r => r.evidence.includes('defensive'));
  const earlyCycle = cycleSync.filter(r => r.evidence.includes('early'));
  const midCycle = cycleSync.filter(r => r.evidence.includes('mid'));

  console.log(`  防御型 (必需消费品): ${defensiveCycle.length}对`);
  console.log(`  早周期 (可选消费品): ${earlyCycle.length}对`);
  console.log(`  中周期 (汽配等): ${midCycle.length}对`);

  // === 宏观因子相关 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('宏观因子相关');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const macroCorr = graph.edges.filter(e => e.relationType === RelationType.MACRO_CORRELATED);
  console.log(`宏观因子正相关: ${macroCorr.length}个`);

  // 高消费者信心敏感 (可选消费品)
  const highConfidenceSens = macroCorr.filter(r => {
    const sensA = getMacroSensitivity(r.sourceSymbol);
    const sensB = getMacroSensitivity(r.targetSymbol);
    return sensA && sensB && sensA.consumerConfidence >= 0.5 && sensB.consumerConfidence >= 0.5;
  });
  console.log(`  高消费者信心敏感配对: ${highConfidenceSens.length}对`);

  // 低消费者信心敏感 (必需消费品)
  const lowConfidenceSens = macroCorr.filter(r => {
    const sensA = getMacroSensitivity(r.sourceSymbol);
    const sensB = getMacroSensitivity(r.targetSymbol);
    return sensA && sensB && sensA.consumerConfidence <= 0.3 && sensB.consumerConfidence <= 0.3;
  });
  console.log(`  低消费者信心敏感配对: ${lowConfidenceSens.length}对`);

  // === 总结 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('测试总结');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`  通过: ${passed}/${testCases.length}`);
  console.log(`  失败: ${failed}/${testCases.length}`);
  console.log(`  通过率: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);

  // 验证周期特征
  console.log('【周期特征验证】');
  const defensiveCompanies = consumerSymbols.filter(s => getCyclePosition(s) === 'defensive');
  const earlyCompanies = consumerSymbols.filter(s => getCyclePosition(s) === 'early');
  const midCompanies = consumerSymbols.filter(s => getCyclePosition(s) === 'mid');
  console.log(`  防御型公司 (必需消费): ${defensiveCompanies.length}个`);
  console.log(`  早周期公司 (可选消费): ${earlyCompanies.length}个`);
  console.log(`  中周期公司 (汽配等): ${midCompanies.length}个`);

  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

testConsumerRelations().catch(console.error);
