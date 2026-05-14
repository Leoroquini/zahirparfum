import type { Perfume } from "@/data/catalogo";

/**
 * Helpers de gênero do catálogo.
 *
 * Default implícito: SKU sem campo `genero` é tratado como "masculino".
 * Isso evita ter de migrar os 42 SKUs masculinos existentes — ao adicionar
 * SKUs femininos basta marcar `genero: "feminino"` explicitamente.
 */

export type GeneroPerfume = "masculino" | "feminino" | "unissex";
export type GeneroFiltro = "masculino" | "feminino" | "todos";

export function getGenero(p: Perfume): GeneroPerfume {
  return (p.genero ?? "masculino") as GeneroPerfume;
}

/**
 * Filtra catálogo por gênero. "todos" devolve a lista inteira; "masculino" e
 * "feminino" incluem unissex (presença de unissex em ambos os mundos é
 * intencional — gourmand/doce convertem nos dois públicos).
 */
export function filtrarPorGenero(
  perfumes: Perfume[],
  filtro: GeneroFiltro,
): Perfume[] {
  if (filtro === "todos") return perfumes;
  return perfumes.filter((p) => {
    const g = getGenero(p);
    return g === filtro || g === "unissex";
  });
}

/** Apenas SKUs estritamente do gênero indicado (não inclui unissex) */
export function apenasGenero(
  perfumes: Perfume[],
  genero: GeneroPerfume,
): Perfume[] {
  return perfumes.filter((p) => getGenero(p) === genero);
}

/**
 * Rota da ficha de um perfume conforme o gênero.
 * Feminino → /ela/perfume/{slug}
 * Masculino e unissex → /perfume/{slug}
 *
 * Helper único usado em todo lugar que linka pra ficha de produto
 * (cards, navegador, cross-sell, drawer, etc.) pra evitar mistura
 * de mundos durante a navegação.
 */
export function rotaPerfume(perfume: Perfume): string {
  return getGenero(perfume) === "feminino"
    ? `/ela/perfume/${perfume.id}`
    : `/perfume/${perfume.id}`;
}
