import type { Perfume } from "@/data/catalogo";

/**
 * Mapeamento de fotos por perfume.
 * Lista explícita dos IDs que possuem foto em /public/perfumes/{slug}.png
 * Quando adicionar foto nova, basta incluir o ID aqui.
 *
 * Estética: fotografia com fundo escuro/mármore, identidade ZAHIR.
 */

const PERFUMES_COM_FOTO: ReadonlySet<string> = new Set([
  "9pm-black",
  "9pm-elixir",
  "9pm-night-oud",
  "9pm-rebel",
  "aether",
  "al-noble-ameer",
  "al-noble-safeer",
  "al-noble-wazeer",
  "asad-elixir",
  "asad-marrom-bourbon",
  "asad-preto",
  "asad-zanzibar-azul",
  "azure-aoud",
  "badee-al-oud-for-glory",
  "bharara-king",
  "club-de-nuit-iconic-blue",
  "club-de-nuit-intense",
  "club-de-nuit-milestone",
  "club-de-nuit-sillage",
  "club-de-nuit-urban-elixir",
  "emeer",
  "fakhar-gold-extrait",
  "fakhar-platinum",
  "fakhar-preto",
  "ghost-spectre",
  "hawas-black",
  "hawas-elixir",
  "his-confession",
  "khamrah",
  "khamrah-preto-teriaq",
  "khamrah-qahwa",
  "liquid-brun",
  "maahir-black-edition",
  "qaed-al-fursan",
  "rayhaan-corium",
  "royal-blend-bourbon",
  "salvo",
  "salvo-elixir",
  "salvo-intense",
  "the-kingdom-man",
  "turathi-blue",
  "vulcan-feu",
  "yeah-man-parfum",
]);

/** True se existe foto pra este perfume */
export function hasFoto(perfume: Perfume): boolean {
  return PERFUMES_COM_FOTO.has(perfume.id);
}

/** Caminho da foto principal do perfume */
export function fotoSrc(perfume: Perfume): string {
  return `/perfumes/${perfume.id}.webp`;
}
