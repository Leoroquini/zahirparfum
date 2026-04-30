#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// Padrões de substituição
const replacements = [
  // bg-ink → bg-cream
  { from: /bg-ink/g, to: 'bg-cream' },
  // text-cream → text-ink
  { from: /text-cream/g, to: 'text-ink' },
  // border-cream → border-ink
  { from: /border-cream/g, to: 'border-ink' },
  // fill-cream → fill-ink
  { from: /fill-cream/g, to: 'fill-ink' },
];

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    for (const { from, to } of replacements) {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ ${path.relative(srcDir, filePath)}`);
    }
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      processFile(filePath);
    }
  }
}

console.log('Atualizando paleta de cores...\n');
walkDir(srcDir);
console.log('\n✓ Pronto!');
