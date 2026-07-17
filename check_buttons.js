const fs = require('fs');
const content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

const regex = /<(button|Link)[^>]*className="([^"]*)"[^>]*>([\s\S]*?)<\/(button|Link)>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const className = match[2];
  const text = match[3].trim().replace(/<[^>]+>/g, '').trim();
  
  if (className.includes('bg-') && !className.includes('setActiveTab') && !className.includes('w-10 h-10') && !className.includes('p-2')) {
    console.log('---');
    console.log('Class: ' + className);
    console.log('Text: ' + text);
  }
}
