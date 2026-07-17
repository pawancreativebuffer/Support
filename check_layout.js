const fs = require('fs');
['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('Statistics Cards')) console.log(file + ':' + i + ' : ' + l.trim());
    if (l.includes('Tab Contents')) console.log(file + ':' + i + ' : ' + l.trim());
    if (l.includes('w-full px-6 mt-') && l.includes('space-y-')) console.log(file + ':' + i + ' : ' + l.trim());
    if (l.includes('<section className="mt-8')) console.log(file + ':' + i + ' : ' + l.trim());
    if (l.includes('<section className="mt-6')) console.log(file + ':' + i + ' : ' + l.trim());
  });
});
