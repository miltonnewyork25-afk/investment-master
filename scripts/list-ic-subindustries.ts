import { INDUSTRY_CHAIN_CONFIG } from '../src/relation-graph/config/industry-chains';

const subIndustries = new Set(Object.values(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides));
const sorted = [...subIndustries].sort();
console.log('Existing sub-industries (' + sorted.length + '):');
for (const si of sorted) {
  console.log(' ', si);
}
