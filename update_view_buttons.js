const fs = require('fs');

const files = ['src/app/agent/page.tsx', 'src/app/admin/page.tsx'];
const oldClass = 'className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"';
const newClass = 'className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // We find all `<button` to `</button>` blocks
  let newContent = '';
  let i = 0;
  while (i < content.length) {
    let btnStart = content.indexOf('<button', i);
    if (btnStart === -1) {
      newContent += content.slice(i);
      break;
    }
    let btnEnd = content.indexOf('</button>', btnStart);
    if (btnEnd === -1) {
      newContent += content.slice(i);
      break;
    }
    btnEnd += 9; // length of </button>

    let btnHtml = content.slice(btnStart, btnEnd);
    
    // Check if it's a View button (table button)
    if (btnHtml.includes('<ChevronRight') && (btnHtml.includes('View') || btnHtml.includes('Manage'))) {
      if (btnHtml.includes(oldClass)) {
        btnHtml = btnHtml.replace(oldClass, newClass);
      }
    }

    newContent += content.slice(i, btnStart) + btnHtml;
    i = btnEnd;
  }
  
  fs.writeFileSync(file, newContent);
  console.log('Updated ' + file);
});
