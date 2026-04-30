#!/usr/bin/env node
/**
 * Remove travessões (—) de todos os textos do site.
 *
 * Regras:
 * - " — " (com espaços) → ", "  (vira vírgula)
 * - " —" no final de linha/string → "" (remove)
 * - "— " no início → "" (remove)
 *
 * Mantém:
 * - "–" (en-dash, traço curto usado em ranges numéricos como "5–15%")
 * - "-" (hífen normal)
 *
 * Cuidado: só processa strings de texto (entre aspas), não comentários
 * de código nem nomes de variáveis.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

const SKIP_FILES = ['app/globals.css', 'scripts'];

function processString(str) {
  return str
    // " — " no meio → ", "
    .replace(/ — /g, ', ')
    // " —" no final (antes de \n, ", ', `, ., }, etc)
    .replace(/ —(?=["'`.,!?\n}])/g, '')
    // "— " no início (depois de aspas)
    .replace(/(["'`>])— /g, '$1')
    // " — " no final de uma linha sem mais nada
    .replace(/ —$/gm, '');
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return false;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (SKIP_FILES.some(s => rel.includes(s))) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Aplica nas strings (entre aspas duplas, simples, ou template)
  // Cuidado: queremos só strings de texto visível, não imports nem caminhos.

  // 1. Strings com aspas duplas
  content = content.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, inner) => {
    // Se a string tem importPath/className/url típicos, pula
    if (
      /\.[a-z]+$/i.test(inner) ||           // extensão de arquivo
      /^\/[a-z-_/]+/.test(inner) ||         // path absoluto começando com /
      /^[a-z]+\/[a-z-_/]+/.test(inner) ||   // path relativo
      /^@\//.test(inner) ||                  // import alias
      /^[a-z-]+\/[a-z-]+$/.test(inner)      // package name
    ) {
      return match;
    }
    if (!inner.includes('—')) return match;
    return `"${processString(inner)}"`;
  });

  // 2. Strings com aspas simples (mais raro em TSX texto, mas pode ter)
  content = content.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, inner) => {
    if (!inner.includes('—')) return match;
    if (
      /^\/[a-z-_/]+/.test(inner) ||
      /^[a-z-]+\/[a-z-]+$/.test(inner) ||
      /^@\//.test(inner)
    ) {
      return match;
    }
    return `'${processString(inner)}'`;
  });

  // 3. Template strings (backticks)
  content = content.replace(/`([^`\\]*(?:\\.[^`\\]*)*)`/g, (match, inner) => {
    if (!inner.includes('—')) return match;
    return `\`${processString(inner)}\``;
  });

  // 4. Texto literal entre tags JSX (>texto<)
  content = content.replace(/>([^<>{}\n]*?—[^<>{}\n]*?)</g, (match, inner) => {
    return `>${processString(inner)}<`;
  });

  // 5. JSX expression com texto — {`...`} já cobertos acima
  // 6. Texto solto após " " ou {" "} — capturado pelas strings

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
console.log(`\n✓ ${total} arquivo(s) atualizado(s) — travessões removidos.`);
