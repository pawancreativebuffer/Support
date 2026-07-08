const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prisma/schema.prisma');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

let inUsers = false;
console.log("--- Users Model definition in schema.prisma ---");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim().startsWith('model Users {')) {
    inUsers = true;
  }
  if (inUsers) {
    console.log(`${i + 1}: ${line}`);
    if (line.trim() === '}') {
      inUsers = false;
    }
  }
}
