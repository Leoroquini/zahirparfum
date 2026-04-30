#!/usr/bin/env node
/**
 * Remove backgrounds opacos de seções pra deixar o mármore do body aparecer.
 *
 * - "marble light-diagonal" → "" (remove)
 * - "marble-soft"           → "" (remove)
 * - "bg-cream " (puro)      → "" (remove em seções)
 * - "bg-cream-soft"         → "" (remove em seções)
 *
 * MANTÉM bg-cream/N (com opacity) que é proposital.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

const SKIP_FILES = [
  'sections/Hero.tsx',     // Hero — usuário pediu pra não mexer
  'app/layout.tsx',        // body global
  'app/globals.css',
];

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return false;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (SKIP_FILES.some(s => rel.endsWith(s))) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. Remove "marble light-diagonal" das classes (deixa apenas relative + outras)
  content = content.replace(/\bmarble light-diagonal\b\s*/g, '');

  // 2. Remove "marble-soft" (sem opacity)
  content = content.replace(/\bmarble-soft\b(?!\/|\-)\s*/g, '');

  // 3. Remove "marble" sozinho (não marble-soft, não marble-dark)
  content = content.replace(/\bmarble\b(?!\-|\/)\s*/g, '');

  // 4. Remove bg-cream puro (sem /opacity)
  content = content.replace(/\bbg-cream\b(?!\/|\-)\s*/g, '');

  // 5. Remove bg-cream-soft puro (sem /opacity)
  content = content.replace(/\bbg-cream-soft\b(?!\/|\-)\s*/g, '');

  // 6. Remove bg-cream-muted puro
  content = content.replace(/\bbg-cream-muted\b(?!\/|\-)\s*/g, '');

  // Limpa espaços duplos dentro das className strings
  content = content.replace(/className=("[^"]*"|'[^']*'|`[^`]*`)/g, (match) => {
    return match.replace(/\s{2,}/g, ' ').replace(/\s+"/g, '"').replace(/\s+'/g, "'").replace(/"\s+/g, '"');
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let changed = 0;
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      changed += walk(full);
    } else if (entry.isFile() && processFile(full)) {
      console.log(`✓ ${path.relative(ROOT, full)}`);
      changed++;
    }
  }
  return changed;
}

const total = walk(ROOT);
console.log(`\n✓ ${total} arquivo(s) atualizado(s) — seções agora transparentes.`);
