/**
 * Static Relationship Matrix Generator
 *
 * Generates a comprehensive relationship matrix from config data only.
 * No FMP API calls needed - purely config-based relationship computation.
 *
 * Relationship types computed:
 * 1. UPSTREAM/DOWNSTREAM - from subIndustryChains
 * 2. COMPETITOR / BUSINESS_MODEL_PEER / BUSINESS_MODEL_VARIANT - from business-models
 * 3. CUSTOMER_OVERLAP - from customer-profiles (shared demographics/occasions)
 * 4. CYCLE_SYNC - from cycle positions
 * 5. MACRO_CORRELATED - from macro sensitivity vectors
 * 6. CROSS_CHAIN - from cross-chain impact config
 *
 * Usage: npx tsx src/relation-graph/scripts/generate-matrix.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { INDUSTRY_CHAIN_CONFIG, getSubIndustry, getSubIndustryRelation } from '../config/industry-chains.js';
import {
  BUSINESS_MODEL_PROFILES,
  calculateBusinessModelSimilarity,
  areBusinessModelVariants,
} from '../config/business-models.js';
import {
  CUSTOMER_PROFILES,
  CYCLE_POSITIONS,
  MACRO_SENSITIVITY,
  CROSS_CHAIN_IMPACT,
  calculateCustomerOverlap,
  calculateMacroSimilarity,
} from '../config/company-profiles.js';
import { RelationType } from '../types/index.js';
import type { RelationMatrix, MatrixEdge, MatrixNode } from '../types/matrix.js';
import { getAllSymbols, buildNode, getSymbolsBySubIndustry, getSymbolsBySegment } from '../utils/static-attribute-builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// Configuration
// ============================================================

const THRESHOLDS = {
  businessModelSimilarity: 0.6,  // Min similarity for BUSINESS_MODEL_PEER
  customerOverlap: 0.5,          // Min overlap for CUSTOMER_OVERLAP
  macroSimilarity: 0.97,         // Min cosine similarity for MACRO_CORRELATED (very high bar)
  macroInverse: -0.8,            // Max (negative) for MACRO_INVERSE
  cycleSyncMacro: 0.97,          // Min macro similarity for cycle_sync edges
};

// ============================================================
// Edge Generation Functions
// ============================================================

/** Generate upstream/downstream edges from subIndustryChains */
function generateSupplyChainEdges(symbolsBySubIndustry: Map<string, string[]>): MatrixEdge[] {
  const edges: MatrixEdge[] = [];
  const chains = INDUSTRY_CHAIN_CONFIG.subIndustryChains;

  for (const [upstream, downstreams] of Object.entries(chains)) {
    const upSymbols = symbolsBySubIndustry.get(upstream) || [];
    for (const downstream of downstreams) {
      const downSymbols = symbolsBySubIndustry.get(downstream) || [];

      for (const src of upSymbols) {
        for (const tgt of downSymbols) {
          if (src === tgt) continue;
          edges.push({
            source: src,
            target: tgt,
            type: RelationType.DOWNSTREAM,
            strength: 0.7,
            evidence: `${upstream} -> ${downstream}`,
          });
          edges.push({
            source: tgt,
            target: src,
            type: RelationType.UPSTREAM,
            strength: 0.7,
            evidence: `${downstream} <- ${upstream}`,
          });
        }
      }
    }
  }

  return edges;
}

/** Generate competition/peer edges from business models */
function generateCompetitionEdges(symbolsBySegment: Map<string, string[]>): MatrixEdge[] {
  const edges: MatrixEdge[] = [];

  for (const [segment, symbols] of symbolsBySegment) {
    if (symbols.length < 2) continue;

    for (let i = 0; i < symbols.length; i++) {
      for (let j = i + 1; j < symbols.length; j++) {
        const symA = symbols[i];
        const symB = symbols[j];
        const profileA = BUSINESS_MODEL_PROFILES[symA];
        const profileB = BUSINESS_MODEL_PROFILES[symB];

        if (!profileA || !profileB) continue;

        const similarity = calculateBusinessModelSimilarity(profileA, profileB);
        const variant = areBusinessModelVariants(profileA, profileB);

        if (variant.isVariant) {
          // Different business model in same segment = variant/indirect competition
          edges.push({
            source: symA,
            target: symB,
            type: RelationType.BUSINESS_MODEL_VARIANT,
            strength: Math.min(0.8, similarity + 0.2),
            subType: 'variant',
            evidence: `Same segment (${segment}), ${variant.reason}`,
          });
        } else if (similarity >= THRESHOLDS.businessModelSimilarity) {
          // Same model in same segment = direct peer
          edges.push({
            source: symA,
            target: symB,
            type: RelationType.BUSINESS_MODEL_PEER,
            strength: similarity,
            subType: 'direct_peer',
            evidence: `Same segment & model (${segment})`,
          });
        }
      }
    }
  }

  return edges;
}

/** Generate customer overlap edges */
function generateCustomerOverlapEdges(): MatrixEdge[] {
  const edges: MatrixEdge[] = [];
  const symbols = Object.keys(CUSTOMER_PROFILES);

  for (let i = 0; i < symbols.length; i++) {
    for (let j = i + 1; j < symbols.length; j++) {
      const symA = symbols[i];
      const symB = symbols[j];
      const profileA = CUSTOMER_PROFILES[symA];
      const profileB = CUSTOMER_PROFILES[symB];

      if (!profileA || !profileB) continue;

      // Skip if they're in the same industry segment (already captured by competition)
      const bmA = BUSINESS_MODEL_PROFILES[symA];
      const bmB = BUSINESS_MODEL_PROFILES[symB];
      if (bmA && bmB && bmA.industrySegment === bmB.industrySegment) continue;

      const overlap = calculateCustomerOverlap(profileA, profileB);
      if (overlap >= THRESHOLDS.customerOverlap) {
        edges.push({
          source: symA,
          target: symB,
          type: RelationType.CUSTOMER_OVERLAP,
          strength: overlap,
          evidence: `Shared customer demographics/occasions`,
        });
      }
    }
  }

  return edges;
}

/** Generate cycle sync edges */
function generateCycleSyncEdges(): MatrixEdge[] {
  const edges: MatrixEdge[] = [];
  const symbols = Object.keys(CYCLE_POSITIONS);

  // Group by cycle position
  const byPosition: Record<string, string[]> = {};
  for (const [sym, pos] of Object.entries(CYCLE_POSITIONS)) {
    if (!byPosition[pos]) byPosition[pos] = [];
    byPosition[pos].push(sym);
  }

  // Only generate edges within same sub-industry group to avoid explosion
  const symbolsBySubInd = new Map<string, string>();
  for (const [sym, subInd] of Object.entries(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides)) {
    symbolsBySubInd.set(sym, subInd);
  }

  for (const [position, syms] of Object.entries(byPosition)) {
    // Group further by whether they share an industry group
    for (let i = 0; i < syms.length; i++) {
      for (let j = i + 1; j < syms.length; j++) {
        const symA = syms[i];
        const symB = syms[j];
        const subA = symbolsBySubInd.get(symA);
        const subB = symbolsBySubInd.get(symB);

        // Only connect if different sub-industries (same sub-industry already has peer edges)
        if (subA && subB && subA !== subB) {
          // Check if in same industry group
          let sameGroup = false;
          for (const industries of Object.values(INDUSTRY_CHAIN_CONFIG.industryGroups)) {
            // This checks FMP-level industries, not sub-industries
            // For cycle sync we just connect different sub-industries in same cycle
            sameGroup = true; // Allow all same-cycle connections
            break;
          }

          // Only emit if both have high macro similarity (tight threshold)
          if (MACRO_SENSITIVITY[symA] && MACRO_SENSITIVITY[symB]) {
            const macroSim = calculateMacroSimilarity(
              MACRO_SENSITIVITY[symA],
              MACRO_SENSITIVITY[symB]
            );
            if (macroSim >= THRESHOLDS.cycleSyncMacro) {
              edges.push({
                source: symA,
                target: symB,
                type: RelationType.CYCLE_SYNC,
                strength: 0.5 + macroSim * 0.3,
                evidence: `Both ${position}-cycle, macro similarity ${macroSim.toFixed(2)}`,
              });
            }
          }
        }
      }
    }
  }

  return edges;
}

/** Generate macro correlation edges (high similarity between different industries) */
function generateMacroEdges(): MatrixEdge[] {
  const edges: MatrixEdge[] = [];
  const symbols = Object.keys(MACRO_SENSITIVITY);

  for (let i = 0; i < symbols.length; i++) {
    for (let j = i + 1; j < symbols.length; j++) {
      const symA = symbols[i];
      const symB = symbols[j];

      // Skip same sub-industry (already covered by peer edges)
      const subA = getSubIndustry(symA);
      const subB = getSubIndustry(symB);
      if (subA && subB && subA === subB) continue;

      const sensA = MACRO_SENSITIVITY[symA];
      const sensB = MACRO_SENSITIVITY[symB];
      const similarity = calculateMacroSimilarity(sensA, sensB);

      if (similarity >= THRESHOLDS.macroSimilarity) {
        edges.push({
          source: symA,
          target: symB,
          type: RelationType.MACRO_CORRELATED,
          strength: similarity,
          evidence: `Macro sensitivity cosine similarity: ${similarity.toFixed(2)}`,
        });
      } else if (similarity <= THRESHOLDS.macroInverse) {
        edges.push({
          source: symA,
          target: symB,
          type: RelationType.MACRO_INVERSE,
          strength: Math.abs(similarity),
          evidence: `Macro sensitivity inverse: ${similarity.toFixed(2)}`,
        });
      }
    }
  }

  return edges;
}

/** Generate cross-chain edges */
function generateCrossChainEdges(): MatrixEdge[] {
  const edges: MatrixEdge[] = [];
  const symbols = Object.keys(CROSS_CHAIN_IMPACT);

  for (let i = 0; i < symbols.length; i++) {
    for (let j = i + 1; j < symbols.length; j++) {
      const symA = symbols[i];
      const symB = symbols[j];
      const chainsA = CROSS_CHAIN_IMPACT[symA];
      const chainsB = CROSS_CHAIN_IMPACT[symB];

      // Find shared chains
      const shared = chainsA.filter(c => chainsB.includes(c));
      if (shared.length > 0) {
        const strength = Math.min(1, shared.length * 0.3 + 0.2);
        edges.push({
          source: symA,
          target: symB,
          type: RelationType.CROSS_CHAIN,
          strength,
          evidence: `Shared chains: ${shared.join(', ')}`,
        });
      }
    }
  }

  return edges;
}

// ============================================================
// Main Generator
// ============================================================

function generateMatrix(): RelationMatrix {
  console.log('Generating relationship matrix...');

  // 1. Collect all symbols and build nodes
  const allSymbols = getAllSymbols();
  console.log(`  Total symbols: ${allSymbols.length}`);

  const nodes: MatrixNode[] = allSymbols.map(buildNode);

  // 2. Precompute groupings
  const symbolsBySubIndustry = new Map<string, string[]>();
  for (const [sym, subInd] of Object.entries(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides)) {
    if (!symbolsBySubIndustry.has(subInd)) symbolsBySubIndustry.set(subInd, []);
    symbolsBySubIndustry.get(subInd)!.push(sym);
  }

  const symbolsBySegment = new Map<string, string[]>();
  for (const [sym, profile] of Object.entries(BUSINESS_MODEL_PROFILES)) {
    const seg = profile.industrySegment;
    if (!symbolsBySegment.has(seg)) symbolsBySegment.set(seg, []);
    symbolsBySegment.get(seg)!.push(sym);
  }

  // 3. Generate edges by type
  console.log('  Generating supply chain edges...');
  const supplyChainEdges = generateSupplyChainEdges(symbolsBySubIndustry);
  console.log(`    -> ${supplyChainEdges.length} edges`);

  console.log('  Generating competition edges...');
  const competitionEdges = generateCompetitionEdges(symbolsBySegment);
  console.log(`    -> ${competitionEdges.length} edges`);

  console.log('  Generating customer overlap edges...');
  const customerEdges = generateCustomerOverlapEdges();
  console.log(`    -> ${customerEdges.length} edges`);

  console.log('  Generating cycle sync edges...');
  const cycleEdges = generateCycleSyncEdges();
  console.log(`    -> ${cycleEdges.length} edges`);

  console.log('  Generating macro correlation edges...');
  const macroEdges = generateMacroEdges();
  console.log(`    -> ${macroEdges.length} edges`);

  console.log('  Generating cross-chain edges...');
  const crossChainEdges = generateCrossChainEdges();
  console.log(`    -> ${crossChainEdges.length} edges`);

  // 4. Combine all edges
  const allEdges = [
    ...supplyChainEdges,
    ...competitionEdges,
    ...customerEdges,
    ...cycleEdges,
    ...macroEdges,
    ...crossChainEdges,
  ];

  // 5. Count by type
  const edgesByType: Record<string, number> = {};
  for (const edge of allEdges) {
    edgesByType[edge.type] = (edgesByType[edge.type] || 0) + 1;
  }

  // 6. Build output
  const matrix: RelationMatrix = {
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      totalNodes: nodes.length,
      totalEdges: allEdges.length,
      edgesByType,
    },
    nodes,
    edges: allEdges,
  };

  console.log(`\nMatrix generated:`);
  console.log(`  Nodes: ${matrix.metadata.totalNodes}`);
  console.log(`  Edges: ${matrix.metadata.totalEdges}`);
  console.log(`  By type:`);
  for (const [type, count] of Object.entries(edgesByType).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${type}: ${count}`);
  }

  return matrix;
}

// ============================================================
// Entry Point
// ============================================================

const matrix = generateMatrix();

// Write output
const outputDir = path.resolve(__dirname, '../../../data/output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'relation-matrix.json');
fs.writeFileSync(outputPath, JSON.stringify(matrix, null, 2));
console.log(`\nMatrix written to: ${outputPath}`);

// Quick spot-check
const aaplEdges = matrix.edges.filter(e => e.source === 'AAPL' || e.target === 'AAPL');
console.log(`\nSpot-check: AAPL has ${aaplEdges.length} edges`);
const aaplTypes = new Set(aaplEdges.map(e => e.type));
console.log(`  Edge types: ${[...aaplTypes].join(', ')}`);
