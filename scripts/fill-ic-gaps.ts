import * as fs from 'fs';
import * as path from 'path';

// Map 97 missing symbols to their sub-industry classifications
const IC_ADDITIONS: Record<string, string> = {
  // Regional Banking (11)
  AUB: 'Regional Banking',
  BANF: 'Regional Banking',
  BPOP: 'Regional Banking',
  CATY: 'Regional Banking',
  CPF: 'Regional Banking',
  CVBF: 'Regional Banking',
  HMST: 'Regional Banking',
  ISBC: 'Regional Banking',
  KRNY: 'Regional Banking',
  QCRH: 'Regional Banking',
  RNST: 'Regional Banking',

  // Mortgage REIT (7 + 4 commercial)
  ABR: 'Mortgage REIT',
  EFC: 'Mortgage REIT',
  MFA: 'Mortgage REIT',
  MITT: 'Mortgage REIT',
  NYMT: 'Mortgage REIT',
  PMT: 'Mortgage REIT',
  RWT: 'Mortgage REIT',
  AGNC: 'Mortgage REIT',
  IVR: 'Mortgage REIT',
  NLY: 'Mortgage REIT',
  TWO: 'Mortgage REIT',
  ACRE: 'Mortgage REIT',
  ARI: 'Mortgage REIT',
  LADR: 'Mortgage REIT',
  STWD: 'Mortgage REIT',

  // Insurance & Reinsurance
  CNA: 'P&C Insurance',
  MCY: 'Auto Insurance',
  AIZ: 'Specialty Insurance',
  HMN: 'Specialty Insurance',
  AEL: 'Life Insurance & Annuities',
  RGA: 'Reinsurance',
  SPNT: 'Specialty Reinsurance',

  // Asset Management & BDC
  BN: 'Alternative Asset Manager',
  AMG: 'Asset Manager',
  FHI: 'Asset Manager',
  AMP: 'Asset Manager',
  MAIN: 'Business Development Company',
  PSEC: 'Business Development Company',
  SLRC: 'Business Development Company',

  // REITs
  SAFE: 'Net Lease REIT',
  GOOD: 'Net Lease REIT',
  INN: 'Hotel REIT',
  XHR: 'Hotel REIT',
  HPP: 'Office REIT',
  ESRT: 'Office REIT',

  // Mortgage & Fintech
  PFSI: 'Mortgage Lender',
  AGM: 'Agricultural Finance',
  GSKY: 'Consumer Finance',
  MICT: 'FinTech SaaS',

  // Technology / SaaS
  AVPT: 'Cloud Infrastructure',
  MSTR: 'Business Intelligence SaaS',
  QADA: 'Enterprise ERP',
  ENFN: 'Financial Software',
  MODN: 'Enterprise SaaS',
  BLKB: 'Enterprise SaaS',
  UPLD: 'Work Management SaaS',
  LVOX: 'Contact Center as a Service',
  EGHT: 'UCaaS',

  // Cybersecurity & Security
  IRNT: 'Cybersecurity',
  OSPN: 'Identity Verification Tech',
  CGNT: 'Managed Security Services',
  ATEN: 'Network Equipment',

  // Digital Advertising & Analytics
  APTI: 'Digital Advertising Tech',
  MCHX: 'Digital Analytics Platform',
  TTGT: 'Business Data',

  // Video & Media
  BCOV: 'Video Platform SaaS',

  // IT Services & BPO
  EXLS: 'Business Process Services',
  CLPS: 'IT Services',

  // Pharma & Healthcare
  OPRX: 'Pharma Tech',
  SGHT: 'Ophthalmic Devices',
  CCCS: 'Insurance Technology',
  EBIX: 'Insurance Technology',
  CXM: 'CX Software',

  // Defense & Aerospace
  CMTL: 'Defense Electronics',

  // Telecom
  TIGO: 'Wireless Carrier',
  MIND: 'Telecom Equipment',
  ADTN: 'Networking Equipment',

  // Industrial & Manufacturing
  FARO: 'Precision Instruments',
  LEDS: 'Electronic Components',
  NKLA: 'EV OEM',
  DUOT: 'Machine Vision',
  CYRX: 'Cold Storage REIT',

  // Payments
  ESMT: 'Payment Processing',

  // Gaming & Entertainment
  PLTK: 'Online Gaming',
  SEAT: 'Live Entertainment',

  // Professional Services & Tax
  HRB: 'Tax Software',
  FORR: 'Management Consulting',
  EPIQ: 'Professional Services Tech',
  SSTI: 'Law Enforcement Tech',

  // Crypto & Bitcoin
  CORZ: 'Bitcoin Mining / Data Center',
  BTBT: 'Crypto Mining',

  // Travel
  SABR: 'Hospitality Technology',

  // Real Estate Services
  MMI: 'Commercial RE Services',

  // Endpoint & IT Management
  EIGI: 'Endpoint Management',

  // ETF (thematic)
  BOTZ: 'Exchange',

  // Space
  LLAP: 'Space Systems',

  // Customer Experience
  // (CXM already added above)
};

const filePath = path.resolve(process.cwd(), 'src/relation-graph/config/industry-chains.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find the subIndustryOverrides section and add entries before its closing brace
// The structure is: subIndustryOverrides: { ... }
// We need to find where subIndustryOverrides ends

// Count entries to verify
const existingCount = (content.match(/^\s+'[A-Z]/gm) || []).length;
console.log('Approximate existing entries in file:', existingCount);

// Build the insertion text
const entries = Object.entries(IC_ADDITIONS).sort(([a], [b]) => a.localeCompare(b));
const insertLines = entries.map(([sym, subInd]) => `  '${sym}': '${subInd}',`).join('\n');

// Find the last entry in subIndustryOverrides and insert after it
// Strategy: find the pattern of the closing of subIndustryOverrides
// The file has structure like:
// subIndustryOverrides: {
//   'AAPL': 'Consumer Electronics',
//   ...
// }

// Find the last occurrence of a line like "  'XXX': 'Something'," before the closing }
// We'll look for the pattern where subIndustryOverrides section ends

// Split content by lines and find the subIndustryOverrides section
const lines = content.split('\n');
let insertIndex = -1;
let inSubIndustryOverrides = false;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('subIndustryOverrides')) {
    inSubIndustryOverrides = true;
  }
  if (inSubIndustryOverrides) {
    for (const ch of lines[i]) {
      if (ch === '{') braceDepth++;
      if (ch === '}') {
        braceDepth--;
        if (braceDepth === 0) {
          // This is the closing brace of subIndustryOverrides
          insertIndex = i;
          inSubIndustryOverrides = false;
          break;
        }
      }
    }
    if (insertIndex > 0) break;
  }
}

if (insertIndex < 0) {
  console.error('Could not find subIndustryOverrides closing brace');
  process.exit(1);
}

console.log('Found subIndustryOverrides closing at line:', insertIndex + 1);

// Insert before the closing brace
lines.splice(insertIndex, 0, '', '  // === Gap Fill: 97 missing symbols ===', insertLines);

const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log(`Added ${entries.length} IC entries. File updated successfully.`);

// Also fix MOG-A in CYCLE_POSITIONS
const cpFilePath = path.resolve(process.cwd(), 'src/relation-graph/config/company-profiles.ts');
let cpContent = fs.readFileSync(cpFilePath, 'utf-8');

if (cpContent.includes("'MOG-A'") === false) {
  // Find CYCLE_POSITIONS and add MOG-A (Moog Inc - Aerospace/Defense, mid-cycle)
  // Insert near other aerospace companies. Find where 'MOG' would alphabetically go
  // or just add before the closing of CYCLE_POSITIONS

  // Find the closing of CYCLE_POSITIONS object
  const cpLines = cpContent.split('\n');
  let cpInsertIndex = -1;
  let inCyclePositions = false;
  let cpBraceDepth = 0;

  for (let i = 0; i < cpLines.length; i++) {
    if (cpLines[i].includes('CYCLE_POSITIONS') && cpLines[i].includes('Record<')) {
      inCyclePositions = true;
    }
    if (inCyclePositions) {
      for (const ch of cpLines[i]) {
        if (ch === '{') cpBraceDepth++;
        if (ch === '}') {
          cpBraceDepth--;
          if (cpBraceDepth === 0) {
            cpInsertIndex = i;
            inCyclePositions = false;
            break;
          }
        }
      }
      if (cpInsertIndex > 0) break;
    }
  }

  if (cpInsertIndex > 0) {
    // MOG-A is Moog Inc, Aerospace/Defense components, mid-cycle
    cpLines.splice(cpInsertIndex, 0, "  'MOG-A': { phase: 'mid-cycle', confidence: 0.6, lastUpdated: '2025-01' },");
    cpContent = cpLines.join('\n');
    fs.writeFileSync(cpFilePath, cpContent, 'utf-8');
    console.log('Added MOG-A to CYCLE_POSITIONS.');
  } else {
    console.error('Could not find CYCLE_POSITIONS closing brace');
  }
} else {
  console.log('MOG-A already exists in CYCLE_POSITIONS.');
}
