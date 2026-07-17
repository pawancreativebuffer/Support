const fs = require('fs');

const files = ['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Update container spacing to space-y-6
  content = content.replace(/className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm"/g, 'className="bg-white border border-slate-200 p-6 rounded-xl space-y-6 shadow-sm"');
  
  // Update border-b padding to pb-6
  content = content.replace(/className="flex items-center gap-2 border-b border-slate-100 pb-2"/g, 'className="flex items-center gap-2 border-b border-slate-100 pb-6"');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
