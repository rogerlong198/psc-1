import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Regex para encontrar cada produto
const productRegex = /\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"description":\s*"([^"]*)",\s*"price":\s*[\d.]+,\s*"originalPrice":\s*[\d.]+,\s*"image":\s*"[^"]*",\s*"category":\s*"([^"]+)"/g;

let match;
const updates = [];

while ((match = productRegex.exec(content)) !== null) {
  const [fullMatch, id, name, desc, currentCategory] = match;
  const nameLower = name.toLowerCase();
  
  let newCategory = currentCategory;
  
  // Prioridade: ovos > tabletes > bombons
  if (nameLower.includes('ovo') || nameLower.includes('ovinhos')) {
    newCategory = 'ovos-de-pascoa';
  } else if (nameLower.includes('tablete')) {
    newCategory = 'tabletes';
  } else if (nameLower.includes('bombom') || nameLower.includes('trufa')) {
    newCategory = 'bombons';
  }
  
  if (newCategory !== currentCategory) {
    updates.push({ id, name, from: currentCategory, to: newCategory });
  }
}

console.log(`Found ${updates.length} products to update:`);
updates.forEach(u => console.log(`  - ${u.name.substring(0, 50)}... : ${u.from} -> ${u.to}`));

// Aplicar as mudanças
updates.forEach(u => {
  // Encontrar o produto pelo ID e trocar a categoria
  const searchPattern = new RegExp(
    `("id":\\s*"${u.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*"category":\\s*")${u.from}(")`,
    'g'
  );
  content = content.replace(searchPattern, `$1${u.to}$2`);
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log('\nMigration complete!');
