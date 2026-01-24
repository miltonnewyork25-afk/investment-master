/**
 * Data Integrity Validation Script
 *
 * Validates all relationship graph data for:
 * 1. Completeness: Every stock has entries in all required sections
 * 2. Consistency: All enum values are valid
 * 3. Connectivity: No orphan sub-industries
 * 4. Cross-references: All sub-industries in overrides exist in chains
 */

import { BUSINESS_MODEL_PROFILES } from '../config/business-models.ts';
import { CUSTOMER_PROFILES, CYCLE_POSITIONS, MACRO_SENSITIVITY, CROSS_CHAIN_IMPACT } from '../config/company-profiles.ts';
import { INDUSTRY_CHAIN_CONFIG } from '../config/industry-chains.ts';

// Valid enum values
const VALID_ASSET_MODELS = ['asset_heavy', 'asset_light', 'platform', 'hybrid'] as const;
const VALID_REVENUE_MODELS = ['product_sales', 'subscription', 'transaction_fee', 'advertising', 'licensing', 'interest_income', 'premium_service', 'rental', 'consumables'] as const;
const VALID_DELIVERY_MODELS = ['self_operated', 'franchise', 'marketplace', 'managed', 'hybrid'] as const;
const VALID_CUSTOMER_MODELS = ['B2C', 'B2B', 'B2B2C', 'C2C', 'B2G'] as const;
const VALID_CYCLE_POSITIONS = ['early', 'mid', 'late', 'defensive'] as const;
const VALID_INCOME_LEVELS = ['mass', 'affluent', 'high_net_worth', 'all'] as const;

interface ValidationError {
  type: 'completeness' | 'consistency' | 'connectivity' | 'cross_reference';
  severity: 'error' | 'warning';
  symbol?: string;
  message: string;
}

const errors: ValidationError[] = [];

// Get all symbols from each section
const bmSymbols = Object.keys(BUSINESS_MODEL_PROFILES);
const cpSymbols = Object.keys(CUSTOMER_PROFILES);
const cycleSymbols = Object.keys(CYCLE_POSITIONS);
const macroSymbols = Object.keys(MACRO_SENSITIVITY);

console.log('=== Data Integrity Validation ===\n');
console.log('Business Models:', bmSymbols.length);
console.log('Customer Profiles:', cpSymbols.length);
console.log('Cycle Positions:', cycleSymbols.length);
console.log('Macro Sensitivities:', macroSymbols.length);
console.log('Cross-Chain Impact:', Object.keys(CROSS_CHAIN_IMPACT).length);

// 1. Completeness: Every BM symbol should have cycle + macro
const missingCycle = bmSymbols.filter(s => !(s in CYCLE_POSITIONS));
const missingMacro = bmSymbols.filter(s => !(s in MACRO_SENSITIVITY));

for (const s of missingCycle) {
  errors.push({ type: 'completeness', severity: 'error', symbol: s, message: 'Missing CYCLE_POSITION entry' });
}
for (const s of missingMacro) {
  errors.push({ type: 'completeness', severity: 'error', symbol: s, message: 'Missing MACRO_SENSITIVITY entry' });
}

// 2. B2C/B2B2C companies should have customer profiles
const b2cCompanies = bmSymbols.filter(s => {
  const model = BUSINESS_MODEL_PROFILES[s];
  return model && (model.customerModel === 'B2C' || model.customerModel === 'B2B2C');
});
const missingProfiles = b2cCompanies.filter(s => !(s in CUSTOMER_PROFILES));
for (const s of missingProfiles) {
  errors.push({ type: 'completeness', severity: 'warning', symbol: s, message: 'B2C/B2B2C company missing CUSTOMER_PROFILE' });
}

// 3. Consistency: Validate enum values in business models
for (const [symbol, model] of Object.entries(BUSINESS_MODEL_PROFILES)) {
  if (!VALID_ASSET_MODELS.includes(model.assetModel as any)) {
    errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid assetModel: ' + model.assetModel });
  }
  for (const rm of model.revenueModels) {
    if (!VALID_REVENUE_MODELS.includes(rm as any)) {
      errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid revenueModel: ' + rm });
    }
  }
  if (!VALID_DELIVERY_MODELS.includes(model.deliveryModel as any)) {
    errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid deliveryModel: ' + model.deliveryModel });
  }
  if (!VALID_CUSTOMER_MODELS.includes(model.customerModel as any)) {
    errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid customerModel: ' + model.customerModel });
  }
}

// 4. Validate cycle positions
for (const [symbol, pos] of Object.entries(CYCLE_POSITIONS)) {
  if (!VALID_CYCLE_POSITIONS.includes(pos as any)) {
    errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid cyclePosition: ' + pos });
  }
}

// 5. Validate customer profile income levels
for (const [symbol, profile] of Object.entries(CUSTOMER_PROFILES)) {
  if (profile.demographics?.incomeLevel && !VALID_INCOME_LEVELS.includes(profile.demographics.incomeLevel as any)) {
    errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Invalid incomeLevel: ' + profile.demographics.incomeLevel });
  }
}

// 6. Macro sensitivity range validation (-1.0 to 1.0)
for (const [symbol, sensitivity] of Object.entries(MACRO_SENSITIVITY)) {
  for (const [factor, value] of Object.entries(sensitivity)) {
    if (typeof value === 'number' && (value < -1.0 || value > 1.0)) {
      errors.push({ type: 'consistency', severity: 'error', symbol, message: 'Macro ' + factor + ' out of range: ' + value });
    }
  }
}

// 7. Connectivity: Check subIndustryOverrides vs subIndustryChains
const subIndustryOverrides = INDUSTRY_CHAIN_CONFIG.subIndustryOverrides;
const subIndustryChains = INDUSTRY_CHAIN_CONFIG.subIndustryChains;
const overrideSubs = new Set(Object.values(subIndustryOverrides));
const chainKeys = new Set(Object.keys(subIndustryChains));
const chainValues = new Set(Object.values(subIndustryChains).flat());
const allChainSubs = new Set([...chainKeys, ...chainValues]);

const orphans = [...overrideSubs].filter(s => !allChainSubs.has(s));
for (const orphan of orphans) {
  errors.push({ type: 'connectivity', severity: 'error', message: 'Orphan sub-industry: ' + orphan + ' (in overrides but not in chains)' });
}

// 8. Cross-reference: All BM symbols should be in subIndustryOverrides
const missingOverrides = bmSymbols.filter(s => !(s in subIndustryOverrides));
for (const s of missingOverrides) {
  errors.push({ type: 'cross_reference', severity: 'error', symbol: s, message: 'Missing subIndustryOverride entry' });
}

// Summary
console.log('\n=== Validation Results ===\n');
const errorCount = errors.filter(e => e.severity === 'error').length;
const warningCount = errors.filter(e => e.severity === 'warning').length;

if (errorCount === 0 && warningCount === 0) {
  console.log('All validations passed! Data integrity is clean.');
} else {
  if (errorCount > 0) {
    console.log('ERRORS:', errorCount);
    const byType: Record<string, ValidationError[]> = {};
    for (const e of errors.filter(e => e.severity === 'error')) {
      if (!byType[e.type]) byType[e.type] = [];
      byType[e.type].push(e);
    }
    for (const [type, errs] of Object.entries(byType)) {
      console.log('\n  [' + type + '] (' + errs.length + '):');
      for (const e of errs.slice(0, 10)) {
        console.log('    ' + (e.symbol ? e.symbol + ': ' : '') + e.message);
      }
      if (errs.length > 10) console.log('    ... and ' + (errs.length - 10) + ' more');
    }
  }
  if (warningCount > 0) {
    console.log('\nWARNINGS:', warningCount);
    const warnings = errors.filter(e => e.severity === 'warning');
    for (const w of warnings.slice(0, 5)) {
      console.log('  ' + w.symbol + ': ' + w.message);
    }
    if (warnings.length > 5) console.log('  ... and ' + (warnings.length - 5) + ' more');
  }
}

console.log('\n=== Coverage Stats ===');
console.log('Total companies:', bmSymbols.length);
console.log('Sub-industries:', overrideSubs.size);
console.log('Chain sources:', chainKeys.size);
console.log('Chain targets:', chainValues.size);
console.log('Orphan sub-industries:', orphans.length);
console.log('B2C/B2B2C with profiles:', (b2cCompanies.length - missingProfiles.length) + '/' + b2cCompanies.length);

if (errorCount > 0) process.exit(1);
