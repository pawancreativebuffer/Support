const fs = require('fs');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

// Pagination buttons
const oldPagClass = 'className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"';
const newPagClass = 'className="text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-4 h-[46px] rounded-[8px] cursor-pointer bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"';
content = content.replace(new RegExp(oldPagClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newPagClass);

// Voice button
const oldVoiceClass = 'className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-all shadow-lg shadow-primary-600/20 cursor-pointer border border-primary-500/30"';
const newVoiceClass = 'className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm w-full"';
content = content.replace(new RegExp(oldVoiceClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newVoiceClass);

// Also Mark as Resolved button if it has old class
const oldResolveClass = 'className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg font-bold text-xs transition-all cursor-pointer border border-emerald-200 w-full"';
const newResolveClass = 'className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm w-full"';
content = content.replace(new RegExp(oldResolveClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newResolveClass);

fs.writeFileSync('src/app/dashboard/page.tsx', content);
console.log('Updated dashboard buttons');
