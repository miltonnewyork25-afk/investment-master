/**
 * Relationship Matrix Output Types
 *
 * Defines the output schema for the statically-generated relationship matrix.
 * This matrix captures upstream/downstream, competition, and shared-customer relationships
 * across ~600+ US stocks using only config-based rules (no API needed).
 */

import type { RelationType } from './index.js';

/** A single edge in the relationship matrix */
export interface MatrixEdge {
  source: string;          // Source stock symbol
  target: string;          // Target stock symbol
  type: RelationType;      // Relationship type
  strength: number;        // Relationship strength 0-1
  subType?: string;        // Sub-classification (e.g., 'direct_competitor', 'same_segment')
  evidence: string;        // Human-readable reason
}

/** Node metadata in the matrix */
export interface MatrixNode {
  symbol: string;
  subIndustry: string;
  industrySegment?: string;   // From business-models
  cyclePosition?: string;     // early|mid|late|defensive
  assetModel?: string;        // asset_heavy|asset_light|platform|hybrid
  customerModel?: string;     // B2C|B2B|B2B2C|C2C|B2G
}

/** The complete relationship matrix output */
export interface RelationMatrix {
  metadata: {
    generatedAt: string;
    version: string;
    totalNodes: number;
    totalEdges: number;
    edgesByType: Record<string, number>;
  };
  nodes: MatrixNode[];
  edges: MatrixEdge[];
}

/** Query filter for matrix lookups */
export interface MatrixQuery {
  symbol?: string;
  symbols?: string[];
  types?: RelationType[];
  minStrength?: number;
  subIndustry?: string;
  cyclePosition?: string;
  limit?: number;
}

/** Query result */
export interface MatrixQueryResult {
  symbol: string;
  neighbors: Array<{
    symbol: string;
    type: RelationType;
    strength: number;
    evidence: string;
  }>;
}
