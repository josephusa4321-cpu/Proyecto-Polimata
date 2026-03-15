const fs = require('fs');
const path = require('path');
const dir = './src/data';
const files = fs.readdirSync(dir).filter(f => f.startsWith('module-') && f.endsWith('.ts'));

let totalCards = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Look for exported arrays like export const CARDS_1_1: ConceptCard[] = [ ... ]
  // and count how many objects with 'id: ' inside them.
  const idMatches = content.match(/id:\s*['"][^'"]+['"]/g);
  let count = idMatches ? idMatches.length : 0;
  // Deduct 1 for the BossFight which also has an id in the same file
  if (content.includes('export const BOSS_FIGHT')) {
    count = count - 1;
  }
  console.log(`${file}: ${count} cards`);
  totalCards += count;
}
console.log(`\nTotal cards correctly calculated: ${totalCards}`);
