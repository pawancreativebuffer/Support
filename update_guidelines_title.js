const fs = require('fs');

const files = ['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Guidelines Widget Title
  content = content.replace(
    /className="text-sm font-black uppercase text-slate-700 tracking-widest"/g, 
    'className="font-bold text-slate-800 text-base sm:text-lg"'
  );

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
