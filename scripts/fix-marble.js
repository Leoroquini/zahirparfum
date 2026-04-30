#!/usr/bin/env node
/**
 * Corrige aplicações inválidas de marble:
 * - marble-soft/X     → bg-cream-soft/X     (opacity não funciona em marble)
 * - marble light-diagonal/X → bg-cream/X
 * - marble-soft em inputs/divs internos pequenos → bg-cream-soft (sem efeito visual de marmoreado em peças pequenas)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return false;
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. marble-soft/N → bg-cream-soft/N
  content = content.replace(/\bmarble-soft\/(\d+)/g, 'bg-cream-soft/$1');

  // 2. marble light-diagonal/N → bg-cream/N (normalmente caso raro de overlay)
  content = content.replace(/\bmarble light-diagonal\/(\d+)/g, 'bg-cream/$1');
  content = content.replace(/\bmarble\/(\d+)/g, 'bg-cream/$1');

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
console.log(`\n✓ ${total} arquivo(s) corrigido(s).`);
