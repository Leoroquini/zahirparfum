/**
 * Converte todos os PNG de /public/perfumes e /public/curadorias para WebP
 * com qualidade 85. Mantém os PNGs originais até a operação ser confirmada
 * (script roda em fase 1; deletar PNGs vem na fase 2 separada pra rollback fácil).
 *
 * Uso: node scripts/convert-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(ROOT, 'public', 'perfumes'),
  path.join(ROOT, 'public', 'curadorias'),
];

const QUALITY = 85;

async function convertDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Skip: ${dir} (nao existe)`);
    return { converted: 0, savedKB: 0 };
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'));
  let converted = 0;
  let savedBytes = 0;

  for (const file of files) {
    const src = path.join(dir, file);
    const dst = path.join(dir, file.replace(/\.png$/, '.webp'));
    if (fs.existsSync(dst)) {
      console.log(`  skip: ${file} (webp ja existe)`);
      continue;
    }
    const srcSize = fs.statSync(src).size;
    await sharp(src).webp({ quality: QUALITY, effort: 6 }).toFile(dst);
    const dstSize = fs.statSync(dst).size;
    const reduction = Math.round((1 - dstSize / srcSize) * 100);
    savedBytes += srcSize - dstSize;
    converted++;
    console.log(
      `  ${file} (${Math.round(srcSize / 1024)}KB) -> ${path.basename(dst)} (${Math.round(dstSize / 1024)}KB, -${reduction}%)`,
    );
  }
  return { converted, savedKB: Math.round(savedBytes / 1024) };
}

(async () => {
  let totalConverted = 0;
  let totalSavedKB = 0;
  for (const dir of TARGETS) {
    console.log(`\n>> ${path.relative(ROOT, dir)}`);
    const result = await convertDir(dir);
    totalConverted += result.converted;
    totalSavedKB += result.savedKB;
  }
  console.log(
    `\nTotal: ${totalConverted} arquivos convertidos, economia ${totalSavedKB} KB (${(totalSavedKB / 1024).toFixed(1)} MB).`,
  );
})();
