import type { Perfume } from "@/data/catalogo";

/**
 * Todos os 28 SKUs têm foto em /public/perfumes/{slug}.png
 * (fotografia com fundo escuro/mármore, estética ZAHIR premium).
 * Helper retorna o caminho — a fallback pro gradient continua pros cards
 * onde foto não renderizou ainda.
 */

/** True se existe foto pra este perfume (sempre true por enquanto — os 28 têm) */
export function hasFoto(_perfume: Perfume): boolean {
  void _perfume;
  // Todos os 28 SKUs do catálogo inicial têm foto
  // Quando adicionar SKUs novos sem foto, atualiza este helper
  return true;
}

/** Caminho da foto principal do perfume */
export function fotoSrc(perfume: Perfume): string {
  return `/perfumes/${perfume.id}.png`;
}
