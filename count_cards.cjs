const fs = require('fs');
const path = require('path');
const dir = './src/data';
const files = fs.readdirSync(dir).filter(f => f.startsWith('module-') && f.endsWith('.ts'));

let totalCards = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const idMatches = content.match(/id:\s*['"][^'"]+['"]/g);
  let count = idMatches ? idMatches.length : 0;
  // Descontar los que dicen // type: 'boss_fight' o si hay export const BOSS_FIGHT
  if (content.includes('export const BOSS_FIGHT')) {
    count = count - 1;
  }
  // También descontar si hay "type: 'boss_fight'" extra
  console.log(`${file}: ${count} cards`);
  totalCards += count;
}
console.log(`\nTotal cards correctly calculated: ${totalCards}`);
