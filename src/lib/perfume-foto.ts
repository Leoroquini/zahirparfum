import type { Perfume } from "@/data/catalogo";

/**
 * Mapeamento de fotos por perfume.
 * Lista explícita dos IDs que possuem foto em /public/perfumes/{slug}.png
 * Quando adicionar foto nova, basta incluir o ID aqui.
 *
 * Estética: fotografia com fundo escuro/mármore, identidade ZAHIR.
 */

const PERFUMES_COM_FOTO: ReadonlySet<string> = new Set([
  // Masculinos
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
  // Femininos — 45 capas geradas pelo Codex (Tofy Caramelo removido)
  "ameerat-al-arab",
  "ameerat-prive-rose",
  "ana-abiyedh-rouge",
  "bad-femme",
  "bade-al-oud-honor-glory",
  "bade-al-oud-noble-blush",
  "basir",
  "cdn-untold",
  "cdn-woman",
  "chants-tenderine",
  "delilah",
  "eclaire",
  "eclaire-affair",
  "eclaire-banoffi",
  "eden-garden-violette",
  "fakhar-rose",
  "her-confession",
  "kiaana-angel",
  "kiaana-crush",
  "la-vivacite",
  "la-vivacite-intense",
  "la-voie",
  "leonine",
  "leonine-intense",
  "lionheart",
  "mayar",
  "mayar-cherry-intense",
  "mayar-natural-intense",
  "milena",
  "mohra-silky-rose",
  "nectare",
  "qimmah-fem",
  "rayhaan-pretty-in-pink",
  "sabah-al-ward",
  "sabah-al-ward-valentine",
  "shagad-al-ward",
  "sharaf-blend",
  "the-kingdom-women",
  "uniq",
  "vulcan-baie",
  "yara",
  "yara-candy",
  "yara-elixir",
  "yara-moi",
]);

/** True se existe foto pra este perfume */
export function hasFoto(perfume: Perfume): boolean {
  return PERFUMES_COM_FOTO.has(perfume.id);
}

/** Caminho da foto principal do perfume */
export function fotoSrc(perfume: Perfume): string {
  return `/perfumes/${perfume.id}.webp`;
}
