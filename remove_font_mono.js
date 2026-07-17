const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('font-mono')) {
    content = content.replace(/font-mono/g, '');
    
    // Some minor cleanups for double spaces where they might have been left
    content = content.replace(/className="\s+/g, 'className="');
    content = content.replace(/\s+"/g, '"');
    
    fs.writeFileSync(file, content);
    changedCount++;
  }
});

console.log('Removed font-mono from ' + changedCount + ' files.');
