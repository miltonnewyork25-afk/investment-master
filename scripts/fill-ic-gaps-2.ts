import * as fs from 'fs';
import * as path from 'path';

// Map remaining 47 missing symbols to their sub-industry classifications
const IC_ADDITIONS_2: Record<string, string> = {
  // 3D Printing
  DM: '3D Printing',
  SSYS: '3D Printing',

  // Agriculture
  TITN: 'Ag Equipment',

  // Life Science & Biotech
  RGEN: 'Life Science Tools',
  PACB: 'Genetic Testing',
  TWIST: 'Synthetic Biology',
  AMRX: 'Generic Pharma',
  PCRX: 'Specialty Pharma',

  // Medical Devices
  LIVN: 'Cardiac Therapeutics',
  AXNX: 'Neurosurgery Devices',
  NVRO: 'Neurosurgery Devices',

  // Restaurant
  CBRL: 'Casual Dining',

  // Cloud & Tech
  DBX: 'Cloud Storage',
  APPS: 'Digital Advertising Tech',

  // Utilities
  MDU: 'Diversified Utilities',
  AVA: 'Electric & Gas Utility',
  BKH: 'Electric & Gas Utility',
  MGEE: 'Electric & Gas Utility',
  NWE: 'Electric & Gas Utility',
  OTTR: 'Electric & Gas Utility',
  OGE: 'Electric Utility',
  OGS: 'Gas Utility',
  SR: 'Gas Utility',

  // Space & Satellite
  PL: 'Geospatial Intelligence',
  GSAT: 'Satellite Communications',

  // Education
  EDU: 'EdTech',
  TAL: 'EdTech',

  // Healthcare
  EVH: 'Healthcare IT/EHR',
  ALHC: 'Home Health Services',
  SGFY: 'Home Health Services',

  // Travel & Hospitality
  HTHT: 'Hotel Chain',
  TCOM: 'OTA',
  YMM: 'Freight Brokerage',

  // Food & Consumer
  DOLE: 'Packaged Foods',
  FDP: 'Packaged Foods',
  FLWS: 'Specialty E-commerce',
  BARK: 'Pet Products',
  PETS: 'Pet E-commerce',
  OTLY: 'Natural Foods',
  POSH: 'Fashion E-commerce',

  // Life Sciences Distribution
  AVTR: 'Life Sciences Tools',

  // Industrial
  ALG: 'Specialty Industrial',
  GEVO: 'Renewable Fuels',

  // Media & Social
  BILI: 'Streaming',
  WB: 'Social Platform',
  IQ: 'Streaming',

  // Scientific
  BRKR: 'Precision Instruments',
};

const filePath = path.resolve(process.cwd(), 'src/relation-graph/config/industry-chains.ts');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

// Find the gap fill comment section and append after it
const gapFillComment = '    // === Gap Fill: 97 missing symbols ===';
const gapFillIndex = lines.indexOf(gapFillComment);

if (gapFillIndex < 0) {
  console.error('Gap fill comment not found.');
  process.exit(1);
}

// Find the end of the existing gap fill entries
let insertAfter = gapFillIndex + 1;
while (insertAfter < lines.length) {
  const line = lines[insertAfter].trim();
  if (line.match(/^'[A-Z0-9-]+': '.+',?$/) || line === '') {
    insertAfter++;
  } else {
    break;
  }
}

// Build new entries
const entries = Object.entries(IC_ADDITIONS_2).sort(([a], [b]) => a.localeCompare(b));
const newLines = [
  '',
  '    // === Gap Fill Batch 2: 47 remaining symbols ===',
  ...entries.map(([sym, subInd]) => `    '${sym}': '${subInd}',`),
];

lines.splice(insertAfter, 0, ...newLines);

fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log(`Added ${entries.length} more IC entries. Total gap should now be 0.`);
