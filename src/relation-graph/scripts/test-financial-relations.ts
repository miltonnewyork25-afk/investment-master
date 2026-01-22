/**
 * 金融行业关系测试
 *
 * 产业链: 银行 → 资管 → 保险 | 支付网络 | 交易所
 *
 * 验证:
 * 1. 大型银行: JPM, BAC, WFC, C
 * 2. 区域银行: PNC, USB, TFC, FITB
 * 3. 投资银行: GS, MS
 * 4. 资产管理: BLK, BX, KKR, APO
 * 5. 保险: TRV, ALL, PGR, MET, PRU
 * 6. 消费金融: COF, DFS, SYF
 * 7. 交易所: CME, ICE, NDAQ
 * 8. 金融数据: SPGI, MCO, MSCI
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getBusinessModel } from '../config/business-models.js';
import { getCyclePosition, getMacroSensitivity } from '../config/company-profiles.js';

async function testFinancialRelations() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           金融行业关系测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 测试公司 - 覆盖金融行业各细分
  const financialSymbols = [
    // 大型银行
    'JPM', 'BAC', 'WFC', 'C',
    // 区域银行
    'PNC', 'USB', 'TFC', 'FITB', 'RF', 'KEY',
    // 投资银行
    'GS', 'MS',
    // 资产管理
    'BLK', 'BX', 'KKR', 'APO', 'ARES', 'TROW',
    // 财产险
    'TRV', 'ALL', 'PGR', 'CB',
    // 寿险
    'MET', 'PRU', 'AFL',
    // 消费金融
    'COF', 'DFS', 'SYF',
    // 券商
    'SCHW',
    // 交易所
    'CME', 'ICE', 'NDAQ', 'CBOE',
    // 金融数据
    'SPGI', 'MCO', 'MSCI',
    // 支付 (已有配置)
    'V', 'MA',
  ];

  console.log('【商业模式配置检查】\n');
  for (const symbol of financialSymbols) {
    const model = getBusinessModel(symbol);
    const cycle = getCyclePosition(symbol);
    const macro = getMacroSensitivity(symbol);
    if (model) {
      const rateSens = macro ? `利率敏感度: ${macro.interestRate}` : '';
      console.log(`  ${symbol}: ${model.industrySegment} | 周期: ${cycle || 'N/A'} | ${rateSens}`);
    } else {
      console.log(`  ${symbol}: ⚠️ 无商业模式配置`);
    }
  }

  console.log(`\n📊 测试公司 (${financialSymbols.length}个): ${financialSymbols.join(', ')}\n`);

  const graph = await buildCompanyGraph(financialSymbols);

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
    // 同行业竞争 - 大型银行
    { a: 'JPM', b: 'BAC', expected: '商业模式相似', desc: '大型银行竞争' },
    { a: 'WFC', b: 'C', expected: '商业模式相似', desc: '大型银行竞争' },

    // 同行业竞争 - 区域银行
    { a: 'PNC', b: 'USB', expected: '商业模式相似', desc: '区域银行竞争' },
    { a: 'TFC', b: 'FITB', expected: '商业模式相似', desc: '区域银行竞争' },

    // 同行业竞争 - 投资银行
    { a: 'GS', b: 'MS', expected: '商业模式相似', desc: '投资银行竞争' },

    // 同行业竞争 - 资管
    { a: 'BX', b: 'KKR', expected: '商业模式相似', desc: '另类资管竞争' },
    { a: 'BLK', b: 'TROW', expected: '商业模式相似', desc: '资产管理竞争' },

    // 同行业竞争 - 保险
    { a: 'TRV', b: 'ALL', expected: '商业模式相似', desc: '财产险竞争' },
    { a: 'MET', b: 'PRU', expected: '商业模式相似', desc: '寿险竞争' },

    // 同行业竞争 - 消费金融
    { a: 'COF', b: 'DFS', expected: '商业模式相似', desc: '消费金融竞争' },

    // 同行业竞争 - 交易所
    { a: 'CME', b: 'ICE', expected: '商业模式相似', desc: '交易所竞争' },
    { a: 'NDAQ', b: 'CBOE', expected: '商业模式相似', desc: '交易所竞争' },

    // 同行业竞争 - 金融数据
    { a: 'SPGI', b: 'MCO', expected: '商业模式相似', desc: '评级机构竞争' },

    // 同行业竞争 - 支付
    { a: 'V', b: 'MA', expected: '商业模式相似', desc: '支付网络竞争' },

    // 商业模式变体
    { a: 'JPM', b: 'PNC', expected: '商业模式变体', desc: '大行vs区域银行' },
    { a: 'BLK', b: 'BX', expected: '商业模式变体', desc: '传统资管vs另类资管' },

    // 周期同步 - 银行都是早周期
    { a: 'JPM', b: 'BAC', expected: '周期同步', desc: '银行周期同步' },
    { a: 'PNC', b: 'USB', expected: '周期同步', desc: '区域银行周期同步' },

    // 宏观因子正相关 - 利率敏感
    { a: 'JPM', b: 'BAC', expected: '宏观因子正相关', desc: '银行利率敏感' },
    { a: 'PNC', b: 'TFC', expected: '宏观因子正相关', desc: '区域银行利率敏感' },
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
  for (const rel of modelPeers) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  console.log(`\n【商业模式变体】: ${modelVariants.length}个`);
  for (const rel of modelVariants) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }

  // === 周期同步 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('周期同步关系');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const cycleSync = graph.edges.filter(e => e.relationType === RelationType.CYCLE_SYNC);
  console.log(`周期同步关系: ${cycleSync.length}个`);

  // 按周期分组显示
  const earlyCycle = cycleSync.filter(r => r.evidence.includes('early'));
  const midCycle = cycleSync.filter(r => r.evidence.includes('mid'));
  const defensiveCycle = cycleSync.filter(r => r.evidence.includes('defensive'));

  console.log(`  早周期 (银行/券商): ${earlyCycle.length}对`);
  console.log(`  中周期 (资管/交易所): ${midCycle.length}对`);
  console.log(`  防御型 (保险): ${defensiveCycle.length}对`);

  // === 宏观因子相关 ===
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('宏观因子相关 (利率敏感度)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const macroCorr = graph.edges.filter(e => e.relationType === RelationType.MACRO_CORRELATED);
  console.log(`宏观因子正相关: ${macroCorr.length}个`);
  for (const rel of macroCorr.slice(0, 15)) {
    console.log(`  ${rel.sourceSymbol} ↔ ${rel.targetSymbol}: ${rel.evidence}`);
  }
  if (macroCorr.length > 15) {
    console.log(`  ... 还有 ${macroCorr.length - 15} 个`);
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

testFinancialRelations().catch(console.error);
