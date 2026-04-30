#!/usr/bin/env node
/**
 * Atualiza preco_venda no catalogo-zahir.md.
 * Lista nova passada pelo Leo.
 */
const fs = require('fs');
const path = require('path');

const PRECOS = {
  '01': 290, '02': 350, '03': 350, '04': 290, '05': 320,
  '06': 250, '07': 280, '08': 250, '09': 250, '10': 230,
  '11': 250, '12': 230, '13': 220, '14': 280, '15': 260,
  '16': 250, '17': 270, '18': 350, '19': 350, '20': 280,
  '21': 250, '22': 350, '23': 200, '24': 200, '25': 300,
  '26': 500, '27': 400, '28': 350, '29': 370, '30': 400,
  '31': 370, '32': 450, '33': 320, '34': 400, '35': 200,
  '36': 200, '37': 200, '38': 250, '39': 380, '40': 350,
  '41': 470, '42': 350, '43': 550,
};

const MD_PATH = path.join(__dirname, '../informações novas/catalogo-zahir.md');

let content = fs.readFileSync(MD_PATH, 'utf-8');

for (const [num, venda] of Object.entries(PRECOS)) {
  const sectionRegex = new RegExp(
    `(## ${num} ·[^\\n]+\\n[\\s\\S]*?preco_venda:)\\s*[\\d.]+`,
    'g'
  );
  content = content.replace(sectionRegex, `$1 ${venda}.00`);
}

fs.writeFileSync(MD_PATH, content);
console.log('✓ Preços atualizados no catalogo-zahir.md');
