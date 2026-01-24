import { INDUSTRY_CHAIN_CONFIG } from '../src/relation-graph/config/industry-chains';
import { BUSINESS_MODEL_PROFILES } from '../src/relation-graph/config/business-models';
import { CYCLE_POSITIONS, MACRO_SENSITIVITY } from '../src/relation-graph/config/company-profiles';

const icSymbols = new Set<string>(Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides));
const bmSymbols = new Set(Object.keys(BUSINESS_MODEL_PROFILES));
const cpSymbols = new Set(Object.keys(CYCLE_POSITIONS));
const macroSymbols = new Set(Object.keys(MACRO_SENSITIVITY));
const allSymbols = new Set([...icSymbols, ...bmSymbols, ...cpSymbols, ...macroSymbols]);

const missingBM = [...allSymbols].filter(s => bmSymbols.has(s) === false).sort();
const missingMacro = [...allSymbols].filter(s => macroSymbols.has(s) === false).sort();
const missingIC = [...allSymbols].filter(s => icSymbols.has(s) === false).sort();
const missingCP = [...allSymbols].filter(s => cpSymbols.has(s) === false).sort();

console.log('=== COVERAGE REPORT ===');
console.log(`Total unique symbols: ${allSymbols.size}`);
console.log(`IC: ${icSymbols.size} | BM: ${bmSymbols.size} | CP: ${cpSymbols.size} | Macro: ${macroSymbols.size}`);
console.log('');
console.log(`Missing from BM (${missingBM.length}):`);
console.log(JSON.stringify(missingBM));
console.log('');
console.log(`Missing from Macro (${missingMacro.length}):`);
console.log(JSON.stringify(missingMacro));
console.log('');
console.log(`Missing from IC (${missingIC.length}):`);
// Show with industry segment
const icMissingDetails = missingIC.map(s => {
  const bm = BUSINESS_MODEL_PROFILES[s];
  return `${s}(${bm?.industrySegment || 'unknown'})`;
});
console.log(icMissingDetails.join(', '));
console.log('');
console.log(`Missing from CP (${missingCP.length}):`, missingCP);
