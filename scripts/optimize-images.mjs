/**
 * Otimização de imagens — converte PNG/JPG grandes pra WebP real com qualidade 85
 * e largura máxima 1024px (cards de produto não precisam mais que isso, já que
 * Next.js redimensiona para deviceSizes [360, 480, 640, 768, 1024, 1280, 1600, 1920]
 * e qualities [72, 75, 78, 85]).
 *
 * Uso: node scripts/optimize-images.mjs
 *
 * Estratégia:
 * - Capas de perfume (public/perfumes/*): max 1024px, WebP q85
 * - Hero (public/hero/*): max 2000px, WebP q82 (mais agressivo, são fundos)
 * - Texturas (public/textures/*): max 1600px, WebP q80
 * - Designers/curadorias: max 1024px, WebP q82
 *
 * Sempre regrava o mesmo path (.webp final). Backup original em _backup/ antes.
 */

import sharp from "sharp";
import { readdir, mkdir, stat, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");
const BACKUP = path.resolve("public/_backup_pre_optimize");

const FOLDERS = [
  { dir: "perfumes", maxWidth: 1024, quality: 85 },
  { dir: "hero", maxWidth: 2000, quality: 82 },
  { dir: "textures", maxWidth: 1600, quality: 80 },
  { dir: "designers", maxWidth: 1024, quality: 82 },
  { dir: "curadorias", maxWidth: 1024, quality: 85 },
];

const SKIP_PATTERNS = [
  /_old/,
  /_backup/,
  /\.svg$/i,
  /\.ico$/i,
];

function shouldProcess(file) {
  if (SKIP_PATTERNS.some((re) => re.test(file))) return false;
  return /\.(png|jpe?g|webp)$/i.test(file);
}

async function processFolder({ dir, maxWidth, quality }) {
  const full = path.join(PUBLIC, dir);
  if (!existsSync(full)) return { before: 0, after: 0, count: 0 };

  const backupDir = path.join(BACKUP, dir);
  await mkdir(backupDir, { recursive: true });

  const entries = await readdir(full, { withFileTypes: true });
  let before = 0;
  let after = 0;
  let count = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!shouldProcess(entry.name)) continue;

    const src = path.join(full, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const base = path.basename(entry.name, ext);
    const dst = path.join(full, `${base}.webp`);
    const backup = path.join(backupDir, entry.name);

    const sizeBefore = (await stat(src)).size;

    // Backup do original antes de sobrescrever
    if (!existsSync(backup)) {
      await copyFile(src, backup);
    }

    try {
      const img = sharp(src);
      const meta = await img.metadata();
      const needsResize = (meta.width ?? 0) > maxWidth;

      let pipeline = img;
      if (needsResize) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      const buffer = await pipeline
        .webp({ quality, effort: 6 })
        .toBuffer();

      // Só sobrescreve se o resultado for menor que o original
      if (buffer.length < sizeBefore || ext !== ".webp") {
        await sharp(buffer).toFile(dst + ".tmp");
        // Atomic-ish: remove src se diferente do dst, depois rename
        const { rename, unlink } = await import("node:fs/promises");
        if (src !== dst && existsSync(src)) {
          await unlink(src);
        }
        await rename(dst + ".tmp", dst);
      }

      const sizeAfter = (await stat(dst)).size;
      before += sizeBefore;
      after += sizeAfter;
      count += 1;

      const ratio = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
      console.log(
        `  ${entry.name.padEnd(40)} ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB  (-${ratio}%)`,
      );
    } catch (e) {
      console.error(`  ERRO ${entry.name}: ${e.message}`);
    }
  }

  return { before, after, count };
}

async function main() {
  console.log(`\n=== OTIMIZAÇÃO DE IMAGENS ===\n`);
  console.log(`Backup em: ${path.relative(process.cwd(), BACKUP)}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let totalCount = 0;

  for (const config of FOLDERS) {
    console.log(`📁 ${config.dir}/  (max ${config.maxWidth}px, q${config.quality})`);
    const { before, after, count } = await processFolder(config);
    totalBefore += before;
    totalAfter += after;
    totalCount += count;
    console.log(
      `   subtotal: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB (${count} arquivos)\n`,
    );
  }

  const saved = totalBefore - totalAfter;
  const savedPct = ((saved / totalBefore) * 100).toFixed(1);
  console.log(`=== RESUMO ===`);
  console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Economia: ${(saved / 1024 / 1024).toFixed(2)}MB (-${savedPct}%) em ${totalCount} arquivos`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
