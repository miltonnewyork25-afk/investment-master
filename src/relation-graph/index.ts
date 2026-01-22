/**
 * 公司关系图谱模块
 *
 * 基于 v4.0 稳健框架，实现美股上市公司关系推导
 *
 * 核心功能:
 * - 从 FMP API 获取公司数据
 * - 提取标准化属性向量
 * - 应用6条推导规则计算关系
 * - 构建可查询的关系图谱
 */

// 加载环境变量
import 'dotenv/config';

// 导出类型
export * from './types/index.js';

// 导出客户端
export { FMPClient, getFMPClient } from './clients/fmp-client.js';
export type {
  FMPCompanyProfile,
  FMPQuote,
  FMPHistoricalPrice,
  FMPIncomeStatement,
  FMPFinancialScores,
} from './clients/fmp-client.js';

// 导出提取器
export {
  AttributeExtractor,
  getAttributeExtractor,
  cosineSimilarity,
  pearsonCorrelation,
  calculateReturns,
  linearRegression,
} from './extractors/attribute-extractor.js';

// 导出引擎
export { RelationEngine, getRelationEngine } from './engines/relation-engine.js';

// 导出价格相关性分析器
export {
  PriceCorrelationAnalyzer,
  getPriceCorrelationAnalyzer,
} from './analyzers/price-correlation.js';
export type {
  PriceCorrelationConfig,
  CorrelationResult,
  ValidationResult,
} from './analyzers/price-correlation.js';

// ============ 便捷函数 ============

import { FMPClient, getFMPClient } from './clients/fmp-client.js';
import { AttributeExtractor, getAttributeExtractor } from './extractors/attribute-extractor.js';
import { RelationEngine, getRelationEngine } from './engines/relation-engine.js';
import type { CompanyAttributes, RelationGraph, RelatedCompaniesResult, RelationType } from './types/index.js';

/**
 * 快速分析单个公司的关联公司
 * @param symbol 股票代码
 * @param compareSymbols 要对比的公司列表
 */
export async function analyzeCompanyRelations(
  symbol: string,
  compareSymbols: string[]
): Promise<RelatedCompaniesResult> {
  const extractor = getAttributeExtractor();
  const engine = getRelationEngine();

  // 提取目标公司属性
  const targetAttrs = await extractor.extractCompanyAttributes(symbol);
  if (!targetAttrs) {
    throw new Error(`Failed to extract attributes for ${symbol}`);
  }

  // 提取对比公司属性
  const compareAttrs = await extractor.batchExtractAttributes(compareSymbols);

  // 构建临时图谱
  const allCompanies = new Map<string, CompanyAttributes>();
  allCompanies.set(symbol, targetAttrs);
  compareAttrs.forEach((attrs, sym) => allCompanies.set(sym, attrs));

  const graph = engine.buildRelationGraph(allCompanies);

  // 查询关系
  return engine.queryRelatedCompanies(symbol, graph);
}

/**
 * 构建多个公司的完整关系图谱
 * @param symbols 股票代码列表
 */
export async function buildCompanyGraph(symbols: string[]): Promise<RelationGraph> {
  const extractor = getAttributeExtractor();
  const engine = getRelationEngine();

  console.log(`📊 Building relation graph for ${symbols.length} companies...`);

  // 批量提取属性
  const attributes = await extractor.batchExtractAttributes(symbols);

  console.log(`✅ Extracted attributes for ${attributes.size} companies`);

  // 构建关系图谱
  return engine.buildRelationGraph(attributes);
}

/**
 * 获取行业内的所有公司
 * @param sector 行业板块
 * @param limit 最大数量
 */
export async function getCompaniesBySector(
  sector: string,
  limit: number = 50
): Promise<string[]> {
  const client = getFMPClient();

  // 获取所有活跃交易股票
  const allStocks = await client.getActivelyTradingList();

  // 批量获取概况并筛选
  const batchSize = 100;
  const result: string[] = [];

  for (let i = 0; i < allStocks.length && result.length < limit; i += batchSize) {
    const batch = allStocks.slice(i, i + batchSize).map(s => s.symbol);
    const profiles = await client.getProfiles(batch);

    for (const profile of profiles) {
      if (profile.sector === sector && result.length < limit) {
        result.push(profile.symbol);
      }
    }
  }

  return result;
}

// ============ 命令行入口 ============

export async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📊 公司关系图谱分析工具

用法:
  tsx src/relation-graph/index.ts profile <symbol>     获取公司概况
  tsx src/relation-graph/index.ts relations <symbol>   分析公司关系
  tsx src/relation-graph/index.ts graph <sym1,sym2,...> 构建关系图谱

示例:
  tsx src/relation-graph/index.ts profile AAPL
  tsx src/relation-graph/index.ts relations LRCX
  tsx src/relation-graph/index.ts graph LRCX,AMAT,ASML,KLAC,MU,NVDA
    `);
    return;
  }

  const command = args[0];
  const target = args[1];

  try {
    switch (command) {
      case 'profile': {
        const client = getFMPClient();
        const profile = await client.getProfile(target);
        console.log('\n📋 公司概况:');
        console.log(JSON.stringify(profile, null, 2));
        break;
      }

      case 'relations': {
        // 获取同行业公司进行对比
        const client = getFMPClient();
        const profile = await client.getProfile(target);
        if (!profile) {
          console.error(`❌ Company not found: ${target}`);
          return;
        }

        console.log(`\n🔍 分析 ${target} (${profile.companyName}) 的关系...`);
        console.log(`   行业: ${profile.sector} / ${profile.industry}`);

        // 获取同行业公司
        const sectorCompanies = await getCompaniesBySector(profile.sector, 20);
        const compareSymbols = sectorCompanies.filter(s => s !== target);

        const result = await analyzeCompanyRelations(target, compareSymbols);

        console.log(`\n🔗 找到 ${result.relations.length} 个关联公司:\n`);
        for (const rel of result.relations.slice(0, 10)) {
          const typeDesc = RelationEngine.getRelationDescription(rel.relationType);
          console.log(`  ${rel.symbol} - ${rel.companyName || 'N/A'}`);
          console.log(`    关系: ${typeDesc} | 强度: ${(rel.strength * 100).toFixed(1)}%`);
          console.log(`    依据: ${rel.description}\n`);
        }
        break;
      }

      case 'graph': {
        const symbols = target.split(',').map(s => s.trim().toUpperCase());
        console.log(`\n📊 构建 ${symbols.length} 家公司的关系图谱...`);

        const graph = await buildCompanyGraph(symbols);

        console.log(`\n✅ 图谱构建完成:`);
        console.log(`   公司数: ${graph.metadata.totalCompanies}`);
        console.log(`   关系数: ${graph.metadata.totalRelations}`);

        // 按关系类型统计
        const typeCount: Record<string, number> = {};
        for (const edge of graph.edges) {
          typeCount[edge.relationType] = (typeCount[edge.relationType] || 0) + 1;
        }

        console.log('\n   关系类型分布:');
        for (const [type, count] of Object.entries(typeCount)) {
          const desc = RelationEngine.getRelationDescription(type as RelationType);
          console.log(`     ${desc}: ${count}`);
        }

        // 显示部分关系
        console.log('\n   前10个关系:');
        for (const edge of graph.edges.slice(0, 10)) {
          const desc = RelationEngine.getRelationDescription(edge.relationType);
          console.log(`     ${edge.sourceSymbol} → ${edge.targetSymbol}: ${desc} (${(edge.strength * 100).toFixed(0)}%)`);
        }
        break;
      }

      default:
        console.error(`❌ Unknown command: ${command}`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// 如果直接运行此文件
if (process.argv[1]?.includes('relation-graph')) {
  main();
}
