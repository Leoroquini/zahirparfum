#!/usr/bin/env node
/**
 * Segunda passada: pega os travessões que ficaram em JSX literal
 * (texto entre tags que quebra linha).
 *
 * Substitui qualquer ocorrência de " — " por ", " e " —" por "" no texto
 * literal, mas SÓ quando não está em strings de path/url/className.
 *
 * Mantém: "—" como valor de fallback ("—") e em ranges como "5–15%"
 * (esse é "–" en-dash, não "—" em-dash).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../src');

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return false;

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Estratégia: substitui " — " por ", " e " —\n" por "\n" no arquivo todo,
  // EXCETO dentro de strings tipo "—" (que são fallback, ficam intactas).

  // Pega toda ocorrência exceto quando está sozinha entre aspas: "—"
  // Vou fazer linha por linha pra ter mais controle
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // Pula linhas que parecem fallback/code: "—" ou ?? "—" ou : "—"
    if (/["']—["']/.test(line) && !/[a-záàâãéêíóôõúç] —/i.test(line)) {
      return line;
    }
    // Substitui " — " por ", "
    let newLine = line.replace(/ — /g, ', ');
    // Remove " —" que termina antes de quebra (final de linha visual)
    newLine = newLine.replace(/ —$/, '');
    // Remove "— " que começa linha (depois de espaços/indent)
    newLine = newLine.replace(/^(\s+)— /, '$1');
    return newLine;
  });

  content = newLines.join('\n');

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
console.log(`\n✓ ${total} arquivo(s) atualizado(s) na 2ª passada.`);
