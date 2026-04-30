#!/usr/bin/env node
/**
 * Reforça contraste de textos com baixa opacidade que somem no mármore claro.
 *
 * - text-ink/30 → text-ink/55  (super-leve, fica invisível em fundos claros)
 * - text-ink/40 → text-ink/60
 * - text-ink/45 → text-ink/65
 * - text-ink/50 → text-ink/70
 * - text-ink/55 → text-ink/70
 * - text-ink/60 → text-ink/75
 *
 * Mantém:
 * - text-ink/65, /70, /75, /80, /85, /90 (já estão ok)
 * - text-ink/15, /20 (decorativos, não são texto)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

const REPLACEMENTS = [
  { from: /\btext-ink\/30\b/g, to: 'text-ink/55' },
  { from: /\btext-ink\/40\b/g, to: 'text-ink/60' },
  { from: /\btext-ink\/45\b/g, to: 'text-ink/65' },
  { from: /\btext-ink\/50\b/g, to: 'text-ink/70' },
  { from: /\btext-ink\/55\b/g, to: 'text-ink/70' },
  { from: /\btext-ink\/60\b/g, to: 'text-ink/75' },
];

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  for (const { from, to } of REPLACEMENTS) {
    content = content.replace(from, to);
  }

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
console.log(`\n✓ ${total} arquivo(s) atualizado(s) — contraste de texto reforçado.`);
