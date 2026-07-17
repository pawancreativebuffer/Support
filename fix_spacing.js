const fs = require('fs');
['src/app/dashboard/page.tsx', 'src/app/agent/page.tsx', 'src/app/admin/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Make gap equal: remove mt-8 from the tab contents section.
  // The wrapper has space-y-6 and mt-6, so removing mt-8 will make both gaps exactly 1.5rem (24px).
  content = content.replace(/<section className="mt-8 w-full">/g, '<section className="w-full">');
  
  // Actually, maybe space-y-8 is better for the whole page? Let's just remove mt-8.
  // Also, let's make sure it's space-y-6 and mt-6
  content = content.replace(/className="w-full px-6 mt-6 space-y-6"/g, 'className="w-full px-6 mt-6 space-y-6"');

  fs.writeFileSync(file, content);
  console.log('Fixed spacing in ' + file);
});
