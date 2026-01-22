/**
 * 能源产业链关系测试
 *
 * 产业链: 油服设备 → E&P → 中游管道 → 炼化 → 化工
 *
 * 验证:
 * 1. 油服设备: SLB, HAL, BKR
 * 2. E&P页岩油: EOG, PXD, FANG, DVN, COP, OXY
 * 3. E&P国际: HES, MRO
 * 4. 综合油气: XOM, CVX, SHEL, BP
 * 5. 中游管道: WMB, KMI, ET, EPD
 * 6. 炼化: VLO, MPC, PSX
 * 7. 化工: DOW, LYB
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testEnergyChain() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           能源产业链关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司 - 覆盖整个能源产业链
  const energySymbols = [
    // 油服设备
    'SLB', 'HAL', 'BKR', 'LBRT', 'HP',
    // E&P - 页岩油
    'EOG', 'PXD', 'FANG', 'DVN', 'COP', 'OXY',
    // E&P - 国际
    'HES', 'MRO',
    // 综合油气
    'XOM', 'CVX',
    // 中游管道
    'WMB', 'KMI', 'ET', 'EPD', 'OKE',
    // 炼化
    'VLO', 'MPC', 'PSX',
    // 化工
    'DOW', 'LYB',
    // 油轮 (与炼化相关)
    'FRO', 'STNG',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of energySymbols) {
    const model = getBusinessModel(symbol);
    const cycle = getCyclePosition(symbol);
    const macro = getMacroSensitivity(symbol);
    if (model) {
      const oilSens = macro ? `油价敏感度: ${macro.oilPrice}` : '';
      console.log(`  ${symbol}: ${model.industrySegment} | 周期: ${cycle || 'N/A'} | ${oilSens}`);
    } else {
      console.log(`  ${symbol}: ⚠️ 无商业模式配置`);
    }
  }

  console.log(`\n📊 测试公司 (${energySymbols.length}个): ${energySymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(energySymbols);

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
    { a: 'SLB', b: 'HAL', expected: '商业模式相似', desc: '油服竞争' },
    { a: 'EOG', b: 'PXD', expected: '商业模式相似', desc: '页岩油E&P竞争' },
    { a: 'XOM', b: 'CVX', expected: '商业模式相似', desc: '综合油气竞争' },
    { a: 'WMB', b: 'KMI', expected: '商业模式相似', desc: '中游管道竞争' },
    { a: 'VLO', b: 'MPC', expected: '商业模式相似', desc: '炼化竞争' },
    { a: 'DOW', b: 'LYB', expected: '商业模式相似', desc: '化工竞争' },

    // 上下游关系
    { a: 'SLB', b: 'EOG', expected: '上游供应商', desc: '油服→E&P' },
    { a: 'EOG', b: 'WMB', expected: '上游供应商', desc: 'E&P→管道' },
    { a: 'WMB', b: 'VLO', expected: '上游供应商', desc: '管道→炼化' },

    // 周期同步
    { a: 'SLB', b: 'EOG', expected: '周期同步', desc: '油服与E&P周期' },
    { a: 'XOM', b: 'CVX', expected: '周期同步', desc: '综合油气周期' },

    // 宏观因子
    { a: 'EOG', b: 'PXD', expected: '宏观因子正相关', desc: '页岩油宏观相关' },
    { a: 'XOM', b: 'SLB', expected: '宏观因子正相关', desc: '油气与油服宏观' },

    // 油轮与炼化
    { a: 'FRO', b: 'VLO', expected: '上游供应商', desc: '油轮→炼化' },
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

  // === 产业链上下游详情 ===
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('产业链上下游关系');
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

  // === 商业模式关系 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
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
  console.log(`周期同步关系: ${cycleSync.length}个 (所有能源公司都是晚周期)`);

  // === 宏观因子相关 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('宏观因子相关');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const macroCorr = graph.edges.filter(e => e.relationType === RelationType.MACRO_CORRELATED);
  console.log(`宏观因子正相关: ${macroCorr.length}个`);
  for (const rel of macroCorr.slice(0, 20)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (macroCorr.length > 20) {
    console.log(`  ... 还有 ${macroCorr.length - 20} 个`);
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

testEnergyChain().catch(console.error);
