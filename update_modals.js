const fs = require('fs');

const closeButtonClass = 'p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-[8px] transition-all cursor-pointer shadow-sm';
const iconClass = 'w-5 h-5';

['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx', 'src/components/ReportModal.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix Backdrops
  content = content.replace(/bg-slate-900\/50/g, 'bg-slate-900/80');
  content = content.replace(/bg-slate-900\/60/g, 'bg-slate-900/80');
  content = content.replace(/backdrop-blur-sm/g, '');
  content = content.replace(/backdrop-blur-md/g, '');

  // Fix Close Buttons
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
    btnEnd += 9;

    let btnHtml = content.slice(btnStart, btnEnd);
    
    if (btnHtml.includes('<X ') && !btnHtml.includes('setNewTicketAttachment') && !btnHtml.includes('setSelectedTicketIds')) {
      // It's a modal close button
      btnHtml = btnHtml.replace(/className=\"[^\"]*\"/, `className="${closeButtonClass}"`);
      btnHtml = btnHtml.replace(/<X className=\"[^\"]*\"/g, `<X className="${iconClass}"`);
    }

    newContent += content.slice(i, btnStart) + btnHtml;
    i = btnEnd;
  }
  
  // Fix Header Padding/Bg
  newContent = newContent.replace(/className="p-5 border-b border-slate-100 bg-white flex justify-between items-center gap-4"/g, 'className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4"');
  newContent = newContent.replace(/className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50\/50"/g, 'className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4"');
  newContent = newContent.replace(/className="p-6 border-b border-slate-100 flex justify-between items-center"/g, 'className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4"');
  newContent = newContent.replace(/className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50\/50"/g, 'className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4"');

  fs.writeFileSync(file, newContent);
  console.log('Updated ' + file);
});
