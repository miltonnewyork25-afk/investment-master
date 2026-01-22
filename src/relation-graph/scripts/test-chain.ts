/**
 * 测试行业链条检测
 */
import 'dotenv/config';
import { buildCompanyGraph, RelationEngine } from '../index.js';
import { RelationType } from '../types/index.js';

async function main() {
  // 完整半导体供应链测试: 设备商 → 代工厂 → Fabless → 终端
  const symbols = ['LRCX', 'AMAT', 'TSM', 'MU', 'NVDA', 'AAPL', 'TSLA'];

  console.log('Building graph...\n');
  const graph = await buildCompanyGraph(symbols);

  // 只显示上下游关系
  console.log('=== 上游/下游关系 ===\n');
  const chainRelations = graph.edges.filter(
    e => e.relationType === RelationType.UPSTREAM || e.relationType === RelationType.DOWNSTREAM
  );

  for (const rel of chainRelations) {
    const desc = RelationEngine.getRelationDescription(rel.relationType);
    console.log(`${rel.sourceSymbol} → ${rel.targetSymbol}`);
    console.log(`  类型: ${desc}`);
    console.log(`  依据: ${rel.evidence}`);
    console.log('');
  }

  // 显示各公司行业分类
  console.log('=== 各公司行业分类 ===\n');
  for (const [symbol, attrs] of graph.nodes) {
    console.log(`${symbol}: ${attrs.industry.sector} / ${attrs.industry.industry}`);
  }
}

main().catch(console.error);
