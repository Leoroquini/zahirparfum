/* eslint-disable */
/**
 * Comprime fotos dos designers (Catalogo Oficial/fotos dos designer/WhatsApp Image…)
 * em JPEG qualidade 88 e salva em public/designers/{slug}.jpg.
 *
 * Mapeamento timestamp -> slug feito visualmente.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "Catalogo Oficial",
  "fotos dos designer"
);
const DEST_DIR = path.resolve(__dirname, "..", "public", "designers");

const MAPEAMENTO = [
  ["22.01.12", "creed-aventus"],
  ["22.01.24", "boss-bottled-absolu"],
  ["22.01.33", "jpg-le-male-elixir"],
  ["22.01.45", "dior-sauvage-elixir"],
  ["22.01.57", "angels-share-by-kilian"],
  ["22.02.09", "initio-oud-for-greatness"],
  ["22.02.49", "dior-sauvage-edt"],
  ["22.03.01", "bleu-de-chanel-edt"],
  ["22.03.12", "versace-eros-flame"],
  ["22.03.21", "parfums-de-marly-pegasus"],
  ["22.03.31", "side-effect-initio"],
  ["22.03.43", "rosendo-mateu"],
  ["22.03.57", "tom-ford-oud"],
  ["22.05.03", "ysl-y-edp"],
  ["22.05.16", "paco-rabanne-1-million-parfum"],
  ["22.05.27", "ysl-y-edt"],
  ["22.05.36", "givenchy-gentleman-edp"],
  ["22.05.48", "tom-ford-tobacco-vanille"],
  ["22.06.11", "penhaligons-halfeti"],
  ["22.06.20", "tom-ford-ombre-leather"],
  ["22.06.30", "jpg-ultra-male"],
  ["22.06.38", "mancera-cedrat-boise"],
  ["22.06.50", "roja-elysium"],
  ["22.06.59", "parfums-de-marly-althair"],
  ["22.07.21", "dior-sauvage-edp"],
  ["22.07.32", "nishane-hacivat"],
  ["22.07.58", "tom-ford-tuscan-leather"],
];

async function main() {
  if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

  const QUALITY = 88;
  const results = [];
  const missing = [];

  for (const [timestamp, slug] of MAPEAMENTO) {
    const fileName = `WhatsApp Image 2026-05-04 at ${timestamp}.jpeg`;
    const srcPath = path.join(SOURCE_DIR, fileName);
    const destPath = path.join(DEST_DIR, `${slug}.jpg`);

    if (!fs.existsSync(srcPath)) {
      missing.push({ timestamp, slug });
      continue;
    }

    const srcSize = fs.statSync(srcPath).size;
    try {
      // Aceita JPEG, redimensiona pra max 800px (foto designer não precisa ser grande)
      // e salva como JPEG progressivo
      await sharp(srcPath)
        .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toFile(destPath);
      const destSize = fs.statSync(destPath).size;
      results.push({
        slug,
        srcKb: Math.round(srcSize / 1024),
        destKb: Math.round(destSize / 1024),
      });
    } catch (err) {
      console.error(`Erro em ${slug}: ${err.message}`);
    }
  }

  console.log("\n=== COMPRESSÃO COMPLETA ===\n");
  console.table(results);
  const totalSrc = results.reduce((s, r) => s + r.srcKb, 0);
  const totalDest = results.reduce((s, r) => s + r.destKb, 0);
  console.log(
    `\nTotal: ${results.length} arquivos | ${totalSrc} KB → ${totalDest} KB (economia ${(
      ((totalSrc - totalDest) / totalSrc) *
      100
    ).toFixed(1)}%)`
  );

  if (missing.length > 0) {
    console.log("\n⚠️  Faltando:");
    missing.forEach((m) => console.log(`  ${m.timestamp} → ${m.slug}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
