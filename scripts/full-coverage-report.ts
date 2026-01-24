import { INDUSTRY_CHAIN_CONFIG } from '../src/relation-graph/config/industry-chains';
import { BUSINESS_MODEL_PROFILES } from '../src/relation-graph/config/business-models';
import { CYCLE_POSITIONS, MACRO_SENSITIVITY } from '../src/relation-graph/config/company-profiles';

const icSymbols = new Set(Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides));
const bmSymbols = new Set(Object.keys(BUSINESS_MODEL_PROFILES));
const cpSymbols = new Set(Object.keys(CYCLE_POSITIONS));
const macroSymbols = new Set(Object.keys(MACRO_SENSITIVITY));
const allSymbols = new Set([...icSymbols, ...bmSymbols, ...cpSymbols, ...macroSymbols]);

const missingIC = [...allSymbols].filter(s => icSymbols.has(s) === false);
const missingBM = [...allSymbols].filter(s => bmSymbols.has(s) === false);
const missingCP = [...allSymbols].filter(s => cpSymbols.has(s) === false);
const missingMacro = [...allSymbols].filter(s => macroSymbols.has(s) === false);

console.log('╔═══════════════════════════════════════════════╗');
console.log('║         FULL COVERAGE REPORT                  ║');
console.log('╠═══════════════════════════════════════════════╣');
console.log(`║ Total Universe:     ${String(allSymbols.size).padStart(5)} symbols              ║`);
console.log('╠═══════════════════════════════════════════════╣');
console.log(`║ Industry Chains:    ${String(icSymbols.size).padStart(5)} / ${allSymbols.size}  ${missingIC.length === 0 ? '✓ 100%' : `✗ ${missingIC.length} missing`}     ║`);
console.log(`║ Business Models:    ${String(bmSymbols.size).padStart(5)} / ${allSymbols.size}  ${missingBM.length === 0 ? '✓ 100%' : `✗ ${missingBM.length} missing`}     ║`);
console.log(`║ Cycle Positions:    ${String(cpSymbols.size).padStart(5)} / ${allSymbols.size}  ${missingCP.length === 0 ? '✓ 100%' : `✗ ${missingCP.length} missing`}     ║`);
console.log(`║ Macro Sensitivity:  ${String(macroSymbols.size).padStart(5)} / ${allSymbols.size}  ${missingMacro.length === 0 ? '✓ 100%' : `✗ ${missingMacro.length} missing`}     ║`);
console.log('╠═══════════════════════════════════════════════╣');

const totalCoverage = (
  (icSymbols.size + bmSymbols.size + cpSymbols.size + macroSymbols.size) /
  (allSymbols.size * 4) * 100
).toFixed(2);
console.log(`║ Overall Coverage:   ${totalCoverage}%                  ║`);
console.log('╚═══════════════════════════════════════════════╝');

if (missingCP.length > 0) {
  console.log('\nMissing from CP:', missingCP);
}
if (missingIC.length > 0) {
  console.log('\nMissing from IC:', missingIC);
}
if (missingBM.length > 0) {
  console.log('\nMissing from BM:', missingBM);
}
if (missingMacro.length > 0) {
  console.log('\nMissing from Macro:', missingMacro);
}
