import { INDUSTRY_CHAIN_CONFIG } from '../src/relation-graph/config/industry-chains';
import { BUSINESS_MODEL_PROFILES } from '../src/relation-graph/config/business-models';
import { CYCLE_POSITIONS } from '../src/relation-graph/config/company-profiles';

const icSymbols = new Set(Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides));
const bmKeys = Object.keys(BUSINESS_MODEL_PROFILES);
const cpKeys = Object.keys(CYCLE_POSITIONS);
const allSymbols = new Set([...icSymbols, ...bmKeys, ...cpKeys]);

const missingIC = [...allSymbols].filter(s => icSymbols.has(s) === false).sort();

const grouped: Record<string, string[]> = {};
for (const s of missingIC) {
  const bm = (BUSINESS_MODEL_PROFILES as any)[s];
  const seg = bm?.industrySegment || 'unknown';
  if (grouped[seg] === undefined) grouped[seg] = [];
  grouped[seg].push(s);
}

for (const [seg, syms] of Object.entries(grouped).sort()) {
  console.log(`${seg}: ${syms.join(', ')}`);
}
console.log('');
console.log('Total missing:', missingIC.length);
