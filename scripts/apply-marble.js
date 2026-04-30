#!/usr/bin/env node
/**
 * Aplica marmoreado em todas as seções de páginas internas.
 *
 * Regra:
 * - bg-cream (puro)        → marble light-diagonal
 * - bg-cream-soft           → marble-soft
 * - bg-cream-muted          → marble-soft
 *
 * NÃO toca em:
 * - bg-cream/X (com opacity, ex: bg-cream/50, bg-cream/85)
 * - bg-cream com classes em string já tendo "marble"
 * - Hero section (já está bom)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../src');
const SKIP_FILES = [
  'sections/Hero.tsx',          // Hero — usuário pediu pra não mexer
  'app/layout.tsx',             // body global, deixa cream puro
];

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return false;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (SKIP_FILES.some(s => rel.endsWith(s))) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. bg-cream-soft / bg-cream-muted (em <section ou className principal de seção)
  //    Substitui apenas quando aparece no className de section/main/footer/header (linha de raiz)
  content = content.replace(
    /(\bclassName=["`'][^"`']*?)\bbg-cream-soft\b/g,
    (match, prefix) => {
      // Se já tem marble, não duplica
      if (prefix.includes('marble')) return match;
      // Se for bg-cream-soft/X (opacity), pula
      return prefix + 'marble-soft';
    }
  );

  content = content.replace(
    /(\bclassName=["`'][^"`']*?)\bbg-cream-muted\b/g,
    (match, prefix) => {
      if (prefix.includes('marble')) return match;
      return prefix + 'marble-soft';
    }
  );

  // 2. bg-cream (puro, sem /opacity) — só em section/main/footer
  //    Procura padrão: <section ... className="... bg-cream ..."
  //    Usar regex que captura exatamente "bg-cream" seguido de espaço ou aspas (não "/")
  content = content.replace(
    /(\bclassName=["`'][^"`']*?)\bbg-cream\b(?!\/|\-)/g,
    (match, prefix) => {
      if (prefix.includes('marble')) return match;
      return prefix + 'marble light-diagonal';
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
    } else if (entry.isFile()) {
      if (processFile(full)) {
        console.log(`✓ ${path.relative(ROOT, full)}`);
        changed++;
      }
    }
  }
  return changed;
}

const total = walk(ROOT);
console.log(`\n✓ ${total} arquivo(s) atualizado(s).`);
