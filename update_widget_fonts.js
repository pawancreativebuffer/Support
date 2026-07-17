const fs = require('fs');

const files = ['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Top Widget Title
  content = content.replace(/font-bold text-white text-sm/g, 'font-bold text-white text-base sm:text-lg');
  
  // Top Widget Content
  content = content.replace(/text-xs text-slate-350 leading-relaxed/g, 'text-sm text-slate-300 leading-relaxed');

  // Guidelines Widget Title
  content = content.replace(/text-xs font-black uppercase text-slate-700 tracking-widest/g, 'text-sm font-black uppercase text-slate-700 tracking-widest');

  // Guidelines Widget Content
  content = content.replace(/space-y-3\.5 text-xs text-slate-650 leading-relaxed/g, 'space-y-3.5 text-sm text-slate-650 leading-relaxed');
  content = content.replace(/space-y-3\.5 text-xs text-slate-600 leading-relaxed/g, 'space-y-3.5 text-sm text-slate-600 leading-relaxed');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
