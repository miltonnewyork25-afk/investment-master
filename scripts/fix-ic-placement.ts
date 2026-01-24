import * as fs from 'fs';
import * as path from 'path';

const filePath = path.resolve(process.cwd(), 'src/relation-graph/config/industry-chains.ts');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

// Step 1: Find and remove the wrongly placed entries (after "Industrial Conglomerates" section)
const gapFillComment = '  // === Gap Fill: 97 missing symbols ===';
const gapFillIndex = lines.indexOf(gapFillComment);

if (gapFillIndex < 0) {
  console.error('Gap fill comment not found. May have already been fixed.');
  process.exit(1);
}

console.log('Found gap fill comment at line:', gapFillIndex + 1);

// Find how many lines to remove (comment + entries until we hit a line that's not an entry)
let endIndex = gapFillIndex + 1; // start after the comment
while (endIndex < lines.length) {
  const line = lines[endIndex].trim();
  // Entry lines match: 'SYMBOL': 'SubIndustry',
  if (line.match(/^'[A-Z0-9-]+': '.+',?$/) || line === '') {
    endIndex++;
  } else {
    break;
  }
}

// Also remove the blank line before the comment if present
const startIndex = (gapFillIndex > 0 && lines[gapFillIndex - 1].trim() === '') ? gapFillIndex - 1 : gapFillIndex;

console.log(`Removing lines ${startIndex + 1} to ${endIndex} (${endIndex - startIndex} lines)`);

// Extract the entry lines (without comment and blank lines)
const entryLines = lines.slice(gapFillIndex + 1, endIndex).filter(l => l.trim() !== '');
console.log(`Extracted ${entryLines.length} entry lines`);

// Remove the wrongly placed section
lines.splice(startIndex, endIndex - startIndex);

// Step 2: Find the correct insertion point (closing of subIndustryOverrides)
// Look for subIndustryOverrides: { and then find its closing },
let subIndStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('subIndustryOverrides: {')) {
    subIndStart = i;
    break;
  }
}

if (subIndStart < 0) {
  console.error('subIndustryOverrides not found');
  process.exit(1);
}

console.log('subIndustryOverrides starts at line:', subIndStart + 1);

// Find the closing }, of subIndustryOverrides by looking for subIndustryChains
let subIndEnd = -1;
for (let i = subIndStart; i < lines.length; i++) {
  if (lines[i].includes('subIndustryChains:')) {
    // The closing }, is a few lines before this
    for (let j = i - 1; j > subIndStart; j--) {
      if (lines[j].trim() === '},') {
        subIndEnd = j;
        break;
      }
    }
    break;
  }
}

if (subIndEnd < 0) {
  console.error('Could not find subIndustryOverrides closing');
  process.exit(1);
}

console.log('subIndustryOverrides closes at line:', subIndEnd + 1);

// Step 3: Insert entries before the closing },
// Add proper indentation (4 spaces for entries inside subIndustryOverrides)
const formattedEntries = entryLines.map(line => {
  const trimmed = line.trim();
  return '    ' + trimmed;  // 4 spaces indentation
});

const insertBlock = [
    '',
    '    // === Gap Fill: 97 missing symbols ===',
    ...formattedEntries,
];

lines.splice(subIndEnd, 0, ...insertBlock);

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log('Fixed placement. Entries now inside subIndustryOverrides.');
