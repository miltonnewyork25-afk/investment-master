/**
 * Static Attribute Builder
 *
 * Builds company attributes from static config files only (no FMP API needed).
 * Used by the matrix generator to compute relationships based on config data.
 */

import { INDUSTRY_CHAIN_CONFIG, getSubIndustry } from '../config/industry-chains.js';
import { BUSINESS_MODEL_PROFILES, getBusinessModel } from '../config/business-models.js';
import {
  CUSTOMER_PROFILES,
  CYCLE_POSITIONS,
  MACRO_SENSITIVITY,
  CROSS_CHAIN_IMPACT,
} from '../config/company-profiles.js';
import type { MatrixNode } from '../types/matrix.js';

/** Get all symbols across all config files */
export function getAllSymbols(): string[] {
  const symbols = new Set<string>();

  // From industry chains
  for (const sym of Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides)) {
    symbols.add(sym);
  }

  // From business models
  for (const sym of Object.keys(BUSINESS_MODEL_PROFILES)) {
    symbols.add(sym);
  }

  // From cycle positions
  for (const sym of Object.keys(CYCLE_POSITIONS)) {
    symbols.add(sym);
  }

  return Array.from(symbols).sort();
}

/** Build a MatrixNode for a given symbol */
export function buildNode(symbol: string): MatrixNode {
  const subIndustry = getSubIndustry(symbol) || 'Unknown';
  const bm = getBusinessModel(symbol);
  const cycle = CYCLE_POSITIONS[symbol];

  return {
    symbol,
    subIndustry,
    industrySegment: bm?.industrySegment,
    cyclePosition: cycle,
    assetModel: bm?.assetModel,
    customerModel: bm?.customerModel,
  };
}

/** Get all symbols that share the same sub-industry */
export function getSymbolsBySubIndustry(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const [sym, subInd] of Object.entries(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides)) {
    if (!map.has(subInd)) map.set(subInd, []);
    map.get(subInd)!.push(sym);
  }

  return map;
}

/** Get all symbols that share the same industry segment (business model) */
export function getSymbolsBySegment(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const [sym, profile] of Object.entries(BUSINESS_MODEL_PROFILES)) {
    const seg = profile.industrySegment;
    if (!map.has(seg)) map.set(seg, []);
    map.get(seg)!.push(sym);
  }

  return map;
}

/** Check if a symbol has customer profile (B2C facing) */
export function hasCustomerProfile(symbol: string): boolean {
  return symbol in CUSTOMER_PROFILES;
}

/** Get macro sensitivity for a symbol */
export function getMacroVector(symbol: string) {
  return MACRO_SENSITIVITY[symbol] || null;
}

/** Get cross-chain impacts for a symbol */
export function getCrossChainImpact(symbol: string): string[] {
  return CROSS_CHAIN_IMPACT[symbol] || [];
}
