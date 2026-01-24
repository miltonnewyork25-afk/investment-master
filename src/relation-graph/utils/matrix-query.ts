/**
 * Matrix Query Utilities
 *
 * Provides lookup functions for querying the generated relationship matrix.
 * Loads the pre-generated JSON and provides efficient query methods.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { RelationMatrix, MatrixEdge, MatrixNode, MatrixQuery, MatrixQueryResult } from '../types/matrix.js';
import { RelationType } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MATRIX_PATH = path.resolve(__dirname, '../../../data/output/relation-matrix.json');

let _matrix: RelationMatrix | null = null;
let _edgeIndex: Map<string, MatrixEdge[]> | null = null;
let _nodeIndex: Map<string, MatrixNode> | null = null;

/** Load and cache the matrix */
export function loadMatrix(): RelationMatrix {
  if (_matrix) return _matrix;

  if (!fs.existsSync(MATRIX_PATH)) {
    throw new Error(`Matrix file not found: ${MATRIX_PATH}. Run generate-matrix.ts first.`);
  }

  const raw = fs.readFileSync(MATRIX_PATH, 'utf8');
  _matrix = JSON.parse(raw) as RelationMatrix;

  // Build edge index
  _edgeIndex = new Map();
  for (const edge of _matrix.edges) {
    if (!_edgeIndex.has(edge.source)) _edgeIndex.set(edge.source, []);
    if (!_edgeIndex.has(edge.target)) _edgeIndex.set(edge.target, []);
    _edgeIndex.get(edge.source)!.push(edge);
    _edgeIndex.get(edge.target)!.push({ ...edge, source: edge.target, target: edge.source });
  }

  // Build node index
  _nodeIndex = new Map();
  for (const node of _matrix.nodes) {
    _nodeIndex.set(node.symbol, node);
  }

  return _matrix;
}

/** Get all edges for a symbol */
export function getEdgesForSymbol(symbol: string): MatrixEdge[] {
  loadMatrix();
  return _edgeIndex?.get(symbol) || [];
}

/** Get node info */
export function getNode(symbol: string): MatrixNode | undefined {
  loadMatrix();
  return _nodeIndex?.get(symbol);
}

/** Query the matrix with filters */
export function queryMatrix(query: MatrixQuery): MatrixQueryResult[] {
  loadMatrix();
  const results: MatrixQueryResult[] = [];

  const symbols = query.symbol ? [query.symbol] : (query.symbols || []);

  for (const sym of symbols) {
    let edges = getEdgesForSymbol(sym);

    // Filter by type
    if (query.types && query.types.length > 0) {
      edges = edges.filter(e => query.types!.includes(e.type));
    }

    // Filter by min strength
    if (query.minStrength !== undefined) {
      edges = edges.filter(e => e.strength >= query.minStrength!);
    }

    // Filter by sub-industry of the target
    if (query.subIndustry) {
      edges = edges.filter(e => {
        const node = _nodeIndex?.get(e.target);
        return node?.subIndustry === query.subIndustry;
      });
    }

    // Filter by cycle position of the target
    if (query.cyclePosition) {
      edges = edges.filter(e => {
        const node = _nodeIndex?.get(e.target);
        return node?.cyclePosition === query.cyclePosition;
      });
    }

    // Sort by strength descending
    edges.sort((a, b) => b.strength - a.strength);

    // Apply limit
    if (query.limit) {
      edges = edges.slice(0, query.limit);
    }

    results.push({
      symbol: sym,
      neighbors: edges.map(e => ({
        symbol: e.target,
        type: e.type,
        strength: e.strength,
        evidence: e.evidence,
      })),
    });
  }

  return results;
}

/** Get competitors for a symbol */
export function getCompetitors(symbol: string, limit = 20): MatrixQueryResult {
  const result = queryMatrix({
    symbol,
    types: [RelationType.BUSINESS_MODEL_PEER, RelationType.BUSINESS_MODEL_VARIANT, RelationType.COMPETITOR],
    limit,
  });
  return result[0] || { symbol, neighbors: [] };
}

/** Get supply chain partners (upstream + downstream) */
export function getSupplyChain(symbol: string): { upstream: MatrixEdge[]; downstream: MatrixEdge[] } {
  const edges = getEdgesForSymbol(symbol);
  return {
    upstream: edges.filter(e => e.type === RelationType.UPSTREAM),
    downstream: edges.filter(e => e.type === RelationType.DOWNSTREAM),
  };
}

/** Get shared-customer companies */
export function getSharedCustomers(symbol: string, limit = 15): MatrixQueryResult {
  const result = queryMatrix({
    symbol,
    types: [RelationType.CUSTOMER_OVERLAP],
    limit,
  });
  return result[0] || { symbol, neighbors: [] };
}

/** Get macro-correlated stocks */
export function getMacroCorrelated(symbol: string, limit = 20): MatrixQueryResult {
  const result = queryMatrix({
    symbol,
    types: [RelationType.MACRO_CORRELATED, RelationType.MACRO_INVERSE],
    limit,
  });
  return result[0] || { symbol, neighbors: [] };
}

/** Get cross-chain related companies */
export function getCrossChainRelated(symbol: string): MatrixQueryResult {
  const result = queryMatrix({
    symbol,
    types: [RelationType.CROSS_CHAIN],
  });
  return result[0] || { symbol, neighbors: [] };
}

/** Get matrix statistics */
export function getMatrixStats() {
  const matrix = loadMatrix();
  return matrix.metadata;
}
