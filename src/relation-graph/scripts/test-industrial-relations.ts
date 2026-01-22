/**
 * 工业/材料行业关系测试
 *
 * 产业链:
 * - 原材料: 铜矿 → 铝 → 钢铁 → 骨料/水泥
 * - 设备制造: 建筑机械 → 卡车/发动机 → 工业自动化
 * - 工程建设: E&C承包 → 房屋建筑
 * - 工业综合: 多元化集团、国防
 * - 物流运输: 铁路 → 工业分销
 * - 包装: 金属包装 → 纸包装 → 柔性包装
 * - 特化: 工业气体 → 涂料 → 特种化学品
 *
 * 验证:
 * 1. 工业综合: HON, MMM, GE, ITW, EMR, ETN, PH, ROK
 * 2. 国防: LMT, RTX, GD, NOC, HII
 * 3. 建筑机械: CAT, DE, AGCO, CNHI, TEX, OSK
 * 4. 铁路: UNP, CSX, NSC
 * 5. 工业分销: FAST, GWW, MSM
 * 6. 钢铁: NUE, STLD, CLF, X
 * 7. 铜/铝: FCX, SCCO, AA
 * 8. 骨料: VMC, MLM
 * 9. E&C: PWR, ACM, J, MTZ
 * 10. 卡车/发动机: PCAR, CMI
 * 11. 包装: BALL, CCK, PKG, IP, WRK
 * 12. 工业气体/涂料: APD, LIN, SHW, PPG
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testIndustrialRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           工业/材料行业关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司 - 覆盖工业各细分
  const industrialSymbols = [
    // 工业综合
    'HON', 'MMM', 'GE', 'ITW', 'EMR', 'ETN', 'PH', 'ROK',
    // 国防
    'LMT', 'RTX', 'GD', 'NOC', 'HII', 'TDG', 'HEI',
    // 建筑/农业机械
    'CAT', 'DE', 'AGCO', 'CNHI', 'PCAR', 'CMI', 'TEX', 'OSK',
    // 铁路
    'UNP', 'CSX', 'NSC',
    // 工业分销
    'FAST', 'GWW', 'MSM', 'WSO', 'POOL',
    // 钢铁
    'NUE', 'STLD', 'CLF', 'X', 'RS',
    // 铜/有色金属
    'FCX', 'SCCO', 'AA',
    // 骨料/水泥
    'VMC', 'MLM', 'CX',
    // E&C工程承包
    'PWR', 'ACM', 'J', 'MTZ', 'EME',
    // 包装
    'BALL', 'CCK', 'PKG', 'IP', 'WRK', 'AMCR',
    // 工业气体/涂料/特化
    'APD', 'LIN', 'SHW', 'PPG', 'ECL', 'IFF', 'ALB',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of industrialSymbols) {
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

  console.log(`\n📊 测试公司 (${industrialSymbols.length}个): ${industrialSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(industrialSymbols);

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
    // 同行业竞争 - 工业综合
    { a: 'HON', b: 'MMM', expected: '商业模式相似', desc: '工业综合竞争' },
    { a: 'ETN', b: 'PH', expected: '商业模式相似', desc: '工业综合竞争' },

    // 同行业竞争 - 工业自动化
    { a: 'EMR', b: 'ROK', expected: '商业模式相似', desc: '工业自动化竞争' },

    // 同行业竞争 - 国防
    { a: 'LMT', b: 'GD', expected: '商业模式相似', desc: '国防竞争' },
    { a: 'NOC', b: 'HII', expected: '商业模式相似', desc: '国防竞争' },

    // 同行业竞争 - 建筑机械
    { a: 'CAT', b: 'DE', expected: '商业模式相似', desc: '建筑/农机竞争' },
    { a: 'AGCO', b: 'CNHI', expected: '商业模式相似', desc: '农机竞争' },

    // 同行业竞争 - 铁路
    { a: 'UNP', b: 'CSX', expected: '商业模式相似', desc: '铁路竞争' },
    { a: 'CSX', b: 'NSC', expected: '商业模式相似', desc: '铁路竞争' },

    // 同行业竞争 - 工业分销
    { a: 'FAST', b: 'GWW', expected: '商业模式相似', desc: '工业分销竞争' },

    // 同行业竞争 - 钢铁
    { a: 'NUE', b: 'STLD', expected: '商业模式相似', desc: '钢铁竞争' },
    { a: 'CLF', b: 'X', expected: '商业模式相似', desc: '钢铁竞争' },

    // 同行业竞争 - 铜矿
    { a: 'FCX', b: 'SCCO', expected: '商业模式相似', desc: '铜矿竞争' },

    // 同行业竞争 - 骨料
    { a: 'VMC', b: 'MLM', expected: '商业模式相似', desc: '骨料竞争' },

    // 同行业竞争 - E&C
    { a: 'PWR', b: 'MTZ', expected: '商业模式相似', desc: 'E&C竞争' },
    { a: 'ACM', b: 'J', expected: '商业模式相似', desc: 'E&C竞争' },

    // 同行业竞争 - 包装
    { a: 'BALL', b: 'CCK', expected: '商业模式相似', desc: '金属包装竞争' },
    { a: 'PKG', b: 'IP', expected: '商业模式相似', desc: '纸包装竞争' },

    // 同行业竞争 - 工业气体
    { a: 'APD', b: 'LIN', expected: '商业模式相似', desc: '工业气体竞争' },

    // 同行业竞争 - 涂料
    { a: 'SHW', b: 'PPG', expected: '商业模式相似', desc: '涂料竞争' },

    // 周期同步 - 中周期工业
    { a: 'CAT', b: 'DE', expected: '周期同步', desc: '建筑机械中周期' },
    { a: 'NUE', b: 'STLD', expected: '周期同步', desc: '钢铁中周期' },
    { a: 'UNP', b: 'CSX', expected: '周期同步', desc: '铁路中周期' },

    // 周期同步 - 国防防御型
    { a: 'LMT', b: 'GD', expected: '周期同步', desc: '国防防御型同步' },
    { a: 'RTX', b: 'NOC', expected: '周期同步', desc: '国防防御型同步' },

    // 宏观因子正相关 - 高GDP敏感
    { a: 'CAT', b: 'DE', expected: '宏观因子正相关', desc: '建筑机械高GDP敏感' },
    { a: 'NUE', b: 'STLD', expected: '宏观因子正相关', desc: '钢铁高GDP敏感' },
    { a: 'FCX', b: 'SCCO', expected: '宏观因子正相关', desc: '铜矿高GDP敏感' },
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
  const midCycle = cycleSync.filter(r => r.evidence.includes('mid'));
  const defensiveCycle = cycleSync.filter(r => r.evidence.includes('defensive'));
  const lateCycle = cycleSync.filter(r => r.evidence.includes('late'));

  console.log(`  中周期 (工业/材料): ${midCycle.length}对`);
  console.log(`  防御型 (国防): ${defensiveCycle.length}对`);
  console.log(`  晚周期 (其他): ${lateCycle.length}对`);

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
  console.log('宏观因子相关');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const macroCorr = graph.edges.filter(e => e.relationType === RelationType.MACRO_CORRELATED);
  console.log(`宏观因子正相关: ${macroCorr.length}个`);

  // 高GDP敏感 (工业/材料)
  const highGDPSens = macroCorr.filter(r => {
    const sensA = getMacroSensitivity(r.sourceSymbol);
    const sensB = getMacroSensitivity(r.targetSymbol);
    return sensA && sensB && sensA.gdpGrowth >= 0.5 && sensB.gdpGrowth >= 0.5;
  });
  console.log(`  高GDP敏感配对 (工业/材料): ${highGDPSens.length}对`);

  // 低GDP敏感 (国防)
  const lowGDPSens = macroCorr.filter(r => {
    const sensA = getMacroSensitivity(r.sourceSymbol);
    const sensB = getMacroSensitivity(r.targetSymbol);
    return sensA && sensB && sensA.gdpGrowth <= 0.3 && sensB.gdpGrowth <= 0.3;
  });
  console.log(`  低GDP敏感配对 (国防): ${lowGDPSens.length}对`);

  // === 总结 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('测试总结');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`  通过: ${passed}/${testCases.length}`);
  console.log(`  失败: ${failed}/${testCases.length}`);
  console.log(`  通过率: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);

  // 验证周期特征
  console.log('【周期特征验证】');
  const midCompanies = industrialSymbols.filter(s => getCyclePosition(s) === 'mid');
  const defensiveCompanies = industrialSymbols.filter(s => getCyclePosition(s) === 'defensive');
  const lateCompanies = industrialSymbols.filter(s => getCyclePosition(s) === 'late');
  console.log(`  中周期公司 (工业/材料): ${midCompanies.length}个`);
  console.log(`  防御型公司 (国防): ${defensiveCompanies.length}个`);
  console.log(`  晚周期公司: ${lateCompanies.length}个`);

  // 验证GDP敏感度
  console.log('\n【GDP敏感度验证】');
  const highGDPCompanies = industrialSymbols.filter(s => {
    const macro = getMacroSensitivity(s);
    return macro && macro.gdpGrowth >= 0.6;
  });
  const lowGDPCompanies = industrialSymbols.filter(s => {
    const macro = getMacroSensitivity(s);
    return macro && macro.gdpGrowth <= 0.3;
  });
  console.log(`  高GDP敏感公司 (>=0.6): ${highGDPCompanies.length}个`);
  console.log(`  低GDP敏感公司 (<=0.3): ${lowGDPCompanies.length}个`);

  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

testIndustrialRelations().catch(console.error);
