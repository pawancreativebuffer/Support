const fs = require('fs');
let c = fs.readFileSync('src/app/agent/page.tsx', 'utf8');

c = c.replace(
  '<span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">\\n                                {chat.title}\\n                              </span>',
  '<span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">\\n                                {chat.customerName ? chat.customerName : chat.customerEmail ? chat.customerEmail : \\'Guest User\\'}</span>'
);

c = c.replace(
  '<span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">\\n                                Voice Session\\n                              </span>',
  '<span className="font-extrabold text-slate-800 text-xs truncate group-hover:text-primary-600 transition-all">\\n                                {log.customerName ? log.customerName : log.customerEmail ? log.customerEmail : \\'Guest User\\'}</span>'
);

// Actually, let's just use regex which is safer and doesn't care about spaces
c = c.replace(
  /{\s*chat\.title\s*}/,
  "{chat.customerName ? chat.customerName : chat.customerEmail ? chat.customerEmail : 'Guest User'}"
);
c = c.replace(
  /Voice Session\s*<\/span>/,
  "{log.customerName ? log.customerName : log.customerEmail ? log.customerEmail : 'Guest User'}\n                              </span>"
);

fs.writeFileSync('src/app/agent/page.tsx', c);
console.log("Done");
