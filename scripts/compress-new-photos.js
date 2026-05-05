/* eslint-disable */
/**
 * Comprime fotos novas (Catalogo Oficial/Foto capa produto site/N{n} Catalogo site.png)
 * em WebP qualidade 88 e salva em public/perfumes/{slug}.webp.
 *
 * Mapeamento N -> slug é derivado do CATALOGO (campo `numero`).
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "Catalogo Oficial",
  "Foto capa produto site"
);
const DEST_DIR = path.resolve(__dirname, "..", "public", "perfumes");

// Mapeamento numero -> slug, extraído do catalogo.ts (verificado manualmente)
const NUMERO_TO_SLUG = {
  1: "club-de-nuit-intense",
  2: "club-de-nuit-iconic-blue",
  3: "club-de-nuit-sillage",
  4: "club-de-nuit-urban-elixir",
  5: "club-de-nuit-milestone",
  6: "asad-preto",
  7: "asad-marrom-bourbon",
  8: "khamrah-qahwa",
  9: "khamrah-preto-teriaq",
  10: "al-noble-safeer",
  11: "al-noble-wazeer",
  12: "al-noble-ameer",
  13: "asad-zanzibar-azul",
  14: "asad-elixir",
  15: "fakhar-preto",
  16: "fakhar-gold-extrait",
  17: "fakhar-platinum",
  18: "the-kingdom-man",
  19: "his-confession",
  20: "maahir-black-edition",
  21: "khamrah",
  22: "emeer",
  23: "badee-al-oud-for-glory",
  24: "qaed-al-fursan",
  25: "9pm-black",
  26: "9pm-night-oud",
  27: "9pm-rebel",
  28: "9pm-elixir",
  29: "turathi-blue",
  30: "vulcan-feu",
  31: "ghost-spectre",
  32: "liquid-brun",
  33: "azure-aoud",
  34: "royal-blend-bourbon",
  35: "salvo",
  36: "salvo-elixir",
  37: "salvo-intense",
  38: "yeah-man-parfum",
  39: "hawas-elixir",
  40: "hawas-black",
  41: "bharara-king",
  42: "rayhaan-corium",
  43: "aether",
};

// Encontra o arquivo PNG dado um número (case-insensitive, lida com variações de nome)
function findPng(numero) {
  const files = fs.readdirSync(SOURCE_DIR);
  const pattern = new RegExp(`^N${numero}\\s+catalogo\\s+site\\.png$`, "i");
  return files.find((f) => pattern.test(f));
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`SOURCE_DIR não existe: ${SOURCE_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

  const QUALITY = 88;
  const results = [];
  const missing = [];

  for (const [numero, slug] of Object.entries(NUMERO_TO_SLUG)) {
    const pngFile = findPng(numero);
    if (!pngFile) {
      missing.push({ numero: Number(numero), slug });
      continue;
    }

    const srcPath = path.join(SOURCE_DIR, pngFile);
    const destPath = path.join(DEST_DIR, `${slug}.webp`);
    const srcSize = fs.statSync(srcPath).size;

    try {
      await sharp(srcPath)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(destPath);
      const destSize = fs.statSync(destPath).size;
      results.push({
        numero: Number(numero),
        slug,
        srcKb: Math.round(srcSize / 1024),
        destKb: Math.round(destSize / 1024),
        ratio: ((destSize / srcSize) * 100).toFixed(1) + "%",
      });
    } catch (err) {
      console.error(`Erro em N${numero} (${slug}): ${err.message}`);
    }
  }

  // Relatório
  console.log("\n=== COMPRESSÃO COMPLETA ===\n");
  console.table(
    results.map((r) => ({
      "Nº": r.numero,
      slug: r.slug,
      "PNG (KB)": r.srcKb,
      "WebP (KB)": r.destKb,
      "redução p/ orig": r.ratio,
    }))
  );

  const totalSrc = results.reduce((s, r) => s + r.srcKb, 0);
  const totalDest = results.reduce((s, r) => s + r.destKb, 0);
  console.log(
    `\nTotal: ${results.length} arquivos | ${totalSrc} KB → ${totalDest} KB (economia ${(
      ((totalSrc - totalDest) / totalSrc) *
      100
    ).toFixed(1)}%)`
  );

  if (missing.length > 0) {
    console.log("\n⚠️  Faltando PNG novo pra:");
    missing.forEach((m) => console.log(`  N${m.numero} (${m.slug})`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
