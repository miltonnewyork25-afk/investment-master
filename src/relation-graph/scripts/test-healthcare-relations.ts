/**
 * 医疗健康行业关系测试
 *
 * 产业链: 制药 → 生物科技 → 医疗器械 → 医疗服务 → 药品分销
 *
 * 验证:
 * 1. 大型制药: JNJ, PFE, MRK, ABBV, LLY, BMY
 * 2. 生物科技: AMGN, GILD, BIIB, VRTX, REGN
 * 3. 医疗器械: MDT, ABT, SYK, BSX, ISRG, EW
 * 4. 医疗保险: UNH, ELV, HUM, CI, CNC
 * 5. 药品分销: MCK, ABC, CAH
 * 6. 药房零售: CVS, WBA
 * 7. 生命科学工具: TMO, DHR, A, IQV
 * 8. 动物健康: ZTS, IDXX
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testHealthcareRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           医疗健康行业关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司 - 覆盖医疗健康各细分
  const healthcareSymbols = [
    // 大型制药
    'JNJ', 'PFE', 'MRK', 'ABBV', 'LLY', 'BMY',
    // 生物科技
    'AMGN', 'GILD', 'BIIB', 'VRTX', 'REGN', 'MRNA',
    // 医疗器械
    'MDT', 'ABT', 'SYK', 'BSX', 'ISRG', 'EW', 'ZBH', 'BDX',
    // 医疗保险/管理式医疗
    'UNH', 'ELV', 'HUM', 'CI', 'CNC',
    // 药品分销
    'MCK', 'ABC', 'CAH',
    // 药房零售
    'CVS', 'WBA',
    // 医院系统
    'HCA', 'THC', 'UHS',
    // 生命科学工具
    'TMO', 'DHR', 'A', 'IQV',
    // 动物健康
    'ZTS', 'IDXX',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of healthcareSymbols) {
    const model = getBusinessModel(symbol);
    const cycle = getCyclePosition(symbol);
    const macro = getMacroSensitivity(symbol);
    if (model) {
      const gdpSens = macro ? `GDP敏感度: ${macro.gdpGrowth}` : '';
      console.log(`  ${symbol}: ${model.industrySegment} | 周期: ${cycle || 'N/A'} | ${gdpSens}`);
    } else {
      console.log(`  ${symbol}: ⚠️ 无商业模式配置`);
    }
  }

  console.log(`\n📊 测试公司 (${healthcareSymbols.length}个): ${healthcareSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(healthcareSymbols);

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
    // 同行业竞争 - 大型制药
    { a: 'PFE', b: 'MRK', expected: '商业模式相似', desc: '大型制药竞争' },
    { a: 'ABBV', b: 'BMY', expected: '商业模式相似', desc: '大型制药竞争' },

    // 同行业竞争 - 生物科技
    { a: 'AMGN', b: 'GILD', expected: '商业模式相似', desc: '生物科技竞争' },
    { a: 'VRTX', b: 'REGN', expected: '商业模式相似', desc: '生物科技竞争' },

    // 同行业竞争 - 医疗器械
    { a: 'MDT', b: 'ABT', expected: '商业模式相似', desc: '医疗器械竞争' },
    { a: 'SYK', b: 'BSX', expected: '商业模式相似', desc: '医疗器械竞争' },

    // 同行业竞争 - 医疗保险
    { a: 'UNH', b: 'ELV', expected: '商业模式相似', desc: '医疗保险竞争' },
    { a: 'HUM', b: 'CI', expected: '商业模式相似', desc: '医疗保险竞争' },

    // 同行业竞争 - 药品分销
    { a: 'MCK', b: 'ABC', expected: '商业模式相似', desc: '药品分销竞争' },
    { a: 'ABC', b: 'CAH', expected: '商业模式相似', desc: '药品分销竞争' },

    // 同行业竞争 - 生命科学工具
    { a: 'TMO', b: 'DHR', expected: '商业模式相似', desc: '生命科学工具竞争' },

    // 同行业竞争 - 动物健康
    { a: 'ZTS', b: 'IDXX', expected: '商业模式相似', desc: '动物健康竞争' },

    // 上下游关系 - 制药到分销
    { a: 'PFE', b: 'MCK', expected: '上游供应商', desc: '制药→分销' },

    // 周期同步 - 防御型
    { a: 'JNJ', b: 'PFE', expected: '周期同步', desc: '制药防御型同步' },
    { a: 'UNH', b: 'ELV', expected: '周期同步', desc: '保险防御型同步' },
    { a: 'MDT', b: 'ABT', expected: '周期同步', desc: '器械防御型同步' },

    // 宏观因子正相关 - 低敏感度医疗
    { a: 'JNJ', b: 'PFE', expected: '宏观因子正相关', desc: '制药低宏观敏感' },
    { a: 'AMGN', b: 'GILD', expected: '宏观因子正相关', desc: '生物科技低宏观敏感' },
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

  console.log(`【商业模式相似】: ${modelPeers.length}个`);
  for (const rel of modelPeers) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 周期同步 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('周期同步关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cycleSync = graph.edges.filter(e => e.relationType === RelationType.CYCLE_SYNC);
  console.log(`周期同步关系: ${cycleSync.length}个`);

  // 按周期分组显示
  const defensiveCycle = cycleSync.filter(r => r.evidence.includes('defensive'));
  const midCycle = cycleSync.filter(r => r.evidence.includes('mid'));

  console.log(`  防御型 (制药/器械/保险): ${defensiveCycle.length}对`);
  console.log(`  中周期 (医院/工具): ${midCycle.length}对`);

  // === 上下游关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('上下游关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const upstream = graph.edges.filter(e => e.relationType === RelationType.UPSTREAM_SUPPLIER);
  const downstream = graph.edges.filter(e => e.relationType === RelationType.DOWNSTREAM_CUSTOMER);

  console.log(`上游供应商关系: ${upstream.length}个`);
  for (const rel of upstream.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (upstream.length > 10) {
    console.log(`  ... 还有 ${upstream.length - 10} 个`);
  }

  console.log(`\n下游客户关系: ${downstream.length}个`);
  for (const rel of downstream.slice(0, 10)) {
    console.log(`  ${rel.sourceSymbol} → ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (downstream.length > 10) {
    console.log(`  ... 还有 ${downstream.length - 10} 个`);
  }

  // === 宏观因子相关 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('宏观因子相关 (低敏感度验证)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const macroCorr = graph.edges.filter(e => e.relationType === RelationType.MACRO_CORRELATED);
  console.log(`宏观因子正相关: ${macroCorr.length}个`);
  console.log('  (医疗健康公司通常对宏观因子低敏感，但彼此之间高度相关)');

  // === 总结 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('测试总结');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`  通过: ${passed}/${testCases.length}`);
  console.log(`  失败: ${failed}/${testCases.length}`);
  console.log(`  通过率: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);

  // 验证防御型特征
  console.log('【防御型特征验证】');
  const defensiveCompanies = healthcareSymbols.filter(s => getCyclePosition(s) === 'defensive');
  const midCompanies = healthcareSymbols.filter(s => getCyclePosition(s) === 'mid');
  console.log(`  防御型公司: ${defensiveCompanies.length}个`);
  console.log(`  中周期公司: ${midCompanies.length}个 (医院/生科工具)`);

  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

testHealthcareRelations().catch(console.error);
