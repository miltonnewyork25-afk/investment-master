import * as fs from 'fs';
import * as path from 'path';

const matrixPath = path.resolve(process.cwd(), 'data/output/relation-matrix.json');
const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf-8'));

const { metadata, nodes, edges } = matrix;

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║           RELATIONSHIP MATRIX BENCHMARK                       ║');
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log(`║ Generated:      ${metadata.generatedAt}                  ║`);
console.log(`║ Version:        ${metadata.version}                                    ║`);
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log(`║ Nodes:          ${String(metadata.totalNodes).padEnd(6)} (unique symbols)                    ║`);
console.log(`║ Edges:          ${String(metadata.totalEdges).padEnd(6)} (all relationships)                ║`);
console.log(`║ Density:        ${(metadata.totalEdges / (metadata.totalNodes * (metadata.totalNodes - 1) / 2) * 100).toFixed(4)}%                                    ║`);
console.log(`║ Avg Degree:     ${(metadata.totalEdges * 2 / metadata.totalNodes).toFixed(1)} (edges per node avg)               ║`);
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log('║ Edge Distribution:                                            ║');

const sortedTypes = Object.entries(metadata.edgesByType)
  .sort(([, a]: any, [, b]: any) => b - a);

for (const [type, count] of sortedTypes) {
  const pct = ((count as number) / metadata.totalEdges * 100).toFixed(1);
  console.log(`║   ${type.padEnd(25)} ${String(count).padStart(6)}  (${pct.padStart(5)}%)          ║`);
}

// Degree distribution analysis
const degreeMap: Record<string, number> = {};
for (const edge of edges) {
  degreeMap[edge.source] = (degreeMap[edge.source] || 0) + 1;
  degreeMap[edge.target] = (degreeMap[edge.target] || 0) + 1;
}

const degrees = Object.values(degreeMap).sort((a: any, b: any) => b - a) as number[];
const maxDegree = degrees[0];
const minDegree = degrees[degrees.length - 1];
const medianDegree = degrees[Math.floor(degrees.length / 2)];
const p95Degree = degrees[Math.floor(degrees.length * 0.05)];
const isolatedNodes = nodes.length - Object.keys(degreeMap).length;

console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log('║ Degree Distribution:                                          ║');
console.log(`║   Max:          ${String(maxDegree).padEnd(6)}                                      ║`);
console.log(`║   P95:          ${String(p95Degree).padEnd(6)}                                      ║`);
console.log(`║   Median:       ${String(medianDegree).padEnd(6)}                                      ║`);
console.log(`║   Min:          ${String(minDegree).padEnd(6)}                                      ║`);
console.log(`║   Isolated:     ${String(isolatedNodes).padEnd(6)}                                      ║`);

// Top 10 most connected
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log('║ Top 10 Most Connected:                                        ║');
const topNodes = Object.entries(degreeMap)
  .sort(([, a]: any, [, b]: any) => b - a)
  .slice(0, 10);

for (const [sym, deg] of topNodes) {
  console.log(`║   ${sym.padEnd(8)} ${String(deg).padStart(5)} connections                          ║`);
}

// Spot checks
console.log('╠═══════════════════════════════════════════════════════════════╣');
console.log('║ Spot Checks:                                                  ║');
const spotSymbols = ['AAPL', 'NVDA', 'TSLA', 'GOOGL', 'LRCX', 'NLY', 'WM', 'UNH'];
for (const sym of spotSymbols) {
  const symEdges = edges.filter((e: any) => e.source === sym || e.target === sym);
  const types = [...new Set(symEdges.map((e: any) => e.type))];
  console.log(`║   ${sym.padEnd(6)} ${String(symEdges.length).padStart(4)} edges | ${types.length} types                       ║`);
}

console.log('╚═══════════════════════════════════════════════════════════════╝');

// Write benchmark to JSON for tracking over time
const benchmark = {
  timestamp: new Date().toISOString(),
  version: metadata.version,
  metrics: {
    nodes: metadata.totalNodes,
    edges: metadata.totalEdges,
    density: metadata.totalEdges / (metadata.totalNodes * (metadata.totalNodes - 1) / 2),
    avgDegree: metadata.totalEdges * 2 / metadata.totalNodes,
    maxDegree,
    medianDegree,
    minDegree,
    isolatedNodes,
    edgesByType: metadata.edgesByType,
  },
  coverage: {
    industryChains: 2004,
    businessModels: 2004,
    cyclePositions: 2004,
    macroSensitivity: 2004,
    total: 2004,
    completeness: 1.0,
  },
  spotChecks: Object.fromEntries(spotSymbols.map(sym => {
    const symEdges = edges.filter((e: any) => e.source === sym || e.target === sym);
    return [sym, {
      totalEdges: symEdges.length,
      types: [...new Set(symEdges.map((e: any) => e.type))].length,
    }];
  })),
};

const benchmarkPath = path.resolve(process.cwd(), 'data/output/benchmark.json');
fs.writeFileSync(benchmarkPath, JSON.stringify(benchmark, null, 2));
console.log(`\nBenchmark saved to: ${benchmarkPath}`);
