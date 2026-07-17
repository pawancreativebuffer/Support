const fs = require('fs');
const { execSync } = require('child_process');

const files = ['src/app/agent/page.tsx', 'src/app/admin/page.tsx'];

files.forEach(file => {
  // Get HEAD version
  const headContent = execSync('git show HEAD:' + file).toString();
  
  // Get Current version
  let currentContent = fs.readFileSync(file, 'utf8');

  // Extract tables from HEAD
  let headTables = [];
  let i = 0;
  while (i < headContent.length) {
    let start = headContent.indexOf('<table', i);
    if (start === -1) break;
    let end = headContent.indexOf('</table>', start);
    if (end === -1) break;
    end += 8;
    headTables.push(headContent.slice(start, end));
    i = end;
  }

  // Extract tables from Current and replace
  let j = 0;
  let tableIndex = 0;
  let newContent = '';
  while (j < currentContent.length) {
    let start = currentContent.indexOf('<table', j);
    if (start === -1) {
      newContent += currentContent.slice(j);
      break;
    }
    let end = currentContent.indexOf('</table>', start);
    if (end === -1) {
      newContent += currentContent.slice(j);
      break;
    }
    end += 8;
    
    newContent += currentContent.slice(j, start);
    if (tableIndex < headTables.length) {
      newContent += headTables[tableIndex];
      tableIndex++;
    } else {
      newContent += currentContent.slice(start, end); // fallback
    }
    j = end;
  }

  fs.writeFileSync(file, newContent);
  console.log('Reverted tables in ' + file);
});
