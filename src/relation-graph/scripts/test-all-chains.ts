/**
 * 综合测试所有产业链的子行业关系
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';
import { getConfigStats } from '../config/industry-chains.js';

interface ChainTest {
  name: string;
  symbols: string[];
  expectedRelations: string[];  // "A→B" 格式
}

const CHAIN_TESTS: ChainTest[] = [
  // 半导体产业链
  {
    name: '半导体产业链',
    symbols: ['LRCX', 'TSM', 'NVDA', 'AAPL'],
    expectedRelations: [
      'LRCX→TSM',   // 设备 → 代工
      'LRCX→NVDA',  // 设备 → Fabless
      'TSM→NVDA',   // 代工 → Fabless
    ],
  },
  // 航空航天产业链
  {
    name: '航空航天产业链',
    symbols: ['GE', 'BA', 'AER', 'DAL', 'MAR'],
    expectedRelations: [
      'GE→BA',      // 发动机 → 飞机制造
      'BA→AER',     // 飞机制造 → 租赁
      'BA→DAL',     // 飞机制造 → 航空公司
      'AER→DAL',    // 租赁 → 航空公司
      'DAL→MAR',    // 航空公司 → 酒店
    ],
  },
  // 油气产业链
  {
    name: '油气产业链',
    symbols: ['SLB', 'EOG', 'WMB', 'VLO'],
    expectedRelations: [
      'SLB→EOG',    // 油服 → E&P
      'EOG→WMB',    // E&P → 中游
      'EOG→VLO',    // E&P → 炼化
      'WMB→VLO',    // 中游 → 炼化
    ],
  },
  // 汽车/EV产业链
  {
    name: '汽车/EV产业链',
    symbols: ['ALB', 'APTV', 'TSLA', 'AN'],
    expectedRelations: [
      'ALB→APTV',   // 锂材料 → 零部件
      'APTV→TSLA',  // 零部件 → 整车厂
      'TSLA→AN',    // 整车厂 → 经销商
    ],
  },
  // 医疗产业链
  {
    name: '医疗产业链',
    symbols: ['LLY', 'MCK', 'CVS', 'HCA'],
    expectedRelations: [
      'LLY→MCK',    // 制药 → 分销
      'LLY→CVS',    // 制药 → 药店
      'LLY→HCA',    // 制药 → 医院
      'MCK→CVS',    // 分销 → 药店
      'MCK→HCA',    // 分销 → 医院
    ],
  },
  // 云计算产业链
  {
    name: '云计算产业链',
    symbols: ['SMCI', 'ANET', 'EQIX', 'MSFT', 'CRM'],
    expectedRelations: [
      'SMCI→EQIX',  // 服务器 → 数据中心
      'SMCI→MSFT',  // 服务器 → 云服务
      'ANET→EQIX',  // 网络设备 → 数据中心
      'ANET→MSFT',  // 网络设备 → 云服务
      'EQIX→MSFT',  // 数据中心 → 云服务
      'MSFT→CRM',   // 云服务 → SaaS
    ],
  },
  // 金融服务产业链
  {
    name: '金融服务产业链',
    symbols: ['ICE', 'SPGI', 'GS', 'BLK'],
    expectedRelations: [
      'ICE→GS',     // 交易所 → 投行
      'ICE→BLK',    // 交易所 → 资管
      'SPGI→GS',    // 金融数据 → 投行
      'SPGI→BLK',   // 金融数据 → 资管
      'GS→BLK',     // 投行 → 资管
    ],
  },
  // 消费品产业链
  {
    name: '消费品产业链',
    symbols: ['ADM', 'PEP', 'WMT', 'MCD'],
    expectedRelations: [
      'ADM→PEP',    // 农产品 → 食品品牌
      'PEP→WMT',    // 食品品牌 → 零售
      'PEP→MCD',    // 食品品牌 → 餐饮
    ],
  },
];

async function testChain(test: ChainTest): Promise<{ passed: number; failed: number; details: string[] }> {
  const graph = await buildCompanyGraph(test.symbols);

  const upstreamRelations = graph.edges.filter(
    e => e.relationType === RelationType.UPSTREAM
  );

  // 检查期望的关系是否存在
  let passed = 0;
  let failed = 0;
  const details: string[] = [];

  for (const expected of test.expectedRelations) {
    const [source, target] = expected.split('→');
    const found = upstreamRelations.find(
      r => r.sourceSymbol === source && r.targetSymbol === target
    );

    if (found) {
      passed++;
      details.push(`  ✅ ${expected}: ${found.evidence}`);
    } else {
      failed++;
      details.push(`  ❌ ${expected}: 未检测到`);
    }
  }

  return { passed, failed, details };
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           产业链关系检测综合测试');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 显示配置统计
  const stats = getConfigStats();
  console.log(`📊 配置统计:`);
  console.log(`   - 覆盖公司数: ${stats.totalSymbols}`);
  console.log(`   - 子行业分类: ${stats.subIndustryCount}`);
  console.log(`   - 产业链关系: ${stats.chainCount}\n`);

  let totalPassed = 0;
  let totalFailed = 0;

  for (const test of CHAIN_TESTS) {
    console.log(`\n🔗 测试: ${test.name}`);
    console.log(`   公司: ${test.symbols.join(', ')}`);
    console.log('   ─────────────────────────────────────');

    try {
      const result = await testChain(test);
      totalPassed += result.passed;
      totalFailed += result.failed;

      for (const detail of result.details) {
        console.log(detail);
      }

      console.log(`   结果: ${result.passed}/${result.passed + result.failed} 通过`);
    } catch (error) {
      console.log(`   ❌ 测试失败: ${error}`);
      totalFailed += test.expectedRelations.length;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`📈 总体结果: ${totalPassed}/${totalPassed + totalFailed} 关系检测通过`);
  console.log(`   通过率: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
