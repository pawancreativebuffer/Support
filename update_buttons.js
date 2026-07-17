const fs = require('fs');

const primaryClasses = "flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";
const primaryFullClasses = "flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm w-full disabled:opacity-50 disabled:cursor-not-allowed";
const secondaryClasses = "flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none";

['src/app/agent/page.tsx', 'src/app/admin/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Pagination
  content = content.replace(/className="px-4\.5 py-2 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-300 border border-slate-250 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"/g, `className="${secondaryClasses}"`);

  // Load More Activity
  content = content.replace(/className="px-6 py-2\.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1\.5 cursor-pointer"/g, `className="${primaryClasses}"`);

  // Go to Tickets Queue
  content = content.replace(/className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-all shadow-lg shadow-primary-600\/20 cursor-pointer border border-primary-500\/30"/g, `className="${primaryFullClasses}"`);

  // Manage / View (Table rows)
  content = content.replace(/className="inline-flex items-center gap-1 px-3 py-1\.5 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-700 rounded-xl border border-slate-200\/80 hover:border-primary-200 text-\[11px\] font-bold transition-all cursor-pointer"/g, `className="${secondaryClasses}"`);

  // Close / Resolve
  content = content.replace(/className="w-full justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 border border-emerald-500\/20 shadow-md shadow-emerald-500\/10"/g, `className="${primaryFullClasses}"`);

  // Cancel buttons
  content = content.replace(/className="px-5 py-2\.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"/g, `className="${secondaryClasses}"`);
  content = content.replace(/className="px-5 py-2\.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs bg-white hover:bg-slate-50 transition-all cursor-pointer"/g, `className="${secondaryClasses}"`);

  // Primary Action Modals
  content = content.replace(/className="px-6 py-2\.5 bg-primary-600 hover:bg-primary-750 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1\.5 shadow-md shadow-primary-600\/10 cursor-pointer border border-primary-500\/20"/g, `className="${primaryClasses}"`);
  content = content.replace(/className="px-5 py-3 bg-primary-600 hover:bg-primary-750 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1\.5 shadow-md shadow-primary-600\/10 cursor-pointer border border-primary-500\/20"/g, `className="${primaryClasses}"`);
  content = content.replace(/className="px-5 py-2\.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl disabled:bg-slate-300 flex items-center gap-2 cursor-pointer shadow-sm shadow-blue-500\/20"/g, `className="${primaryClasses}"`);
  content = content.replace(/className="px-5 py-2\.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-70"/g, `className="${primaryClasses}"`);

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
