#!/usr/bin/env node
/**
 * Aplica `section-veil-light` em <section> que não tem fundo definido,
 * pra garantir legibilidade sobre o mármore.
 *
 * Heurística:
 * - Procura <section className="..." e adiciona "section-veil-light" se não tiver
 * - Pula seções que já têm: marble, marble-soft, bg-cream (qualquer variação),
 *   section-veil, ou são especiais (Hero)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

const SKIP_FILES = [
  'sections/Hero.tsx',         // Hero tem overlay próprio
  'app/layout.tsx',
  'app/globals.css',
];

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return false;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (SKIP_FILES.some(s => rel.endsWith(s))) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Match <section className="..." (com aspas duplas, com ou sem multiline)
  // Para cada match, verifica se já tem alguma classe de fundo. Se não tiver, adiciona section-veil-light.
  content = content.replace(
    /<section\s+([^>]*?)className=("([^"]+)")/gs,
    (match, before, fullAttr, classes) => {
      // Já tem fundo? Pula.
      if (
        /\bsection-veil/.test(classes) ||
        /\bmarble\b/.test(classes) ||
        /\bmarble-soft\b/.test(classes) ||
        /\bmarble-dark\b/.test(classes) ||
        /\bbg-cream\b/.test(classes) ||
        /\bbg-cream-soft\b/.test(classes) ||
        /\bbg-cream-muted\b/.test(classes) ||
        /\bbg-ink\b/.test(classes)
      ) {
        return match;
      }
      // Adiciona section-veil-light no início das classes
      const newClasses = `section-veil-light ${classes}`;
      return `<section ${before}className="${newClasses}"`;
    }
  );

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
console.log(`\n✓ ${total} arquivo(s) atualizado(s).`);
