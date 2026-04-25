import { CATALOGO, type Perfume } from "@/data/catalogo";
import {
  NOTAS_GLOSSARIO,
  type NotaGlossario,
} from "@/data/notas-glossario";

/**
 * Normaliza o nome de uma nota pra comparação:
 * lowercase + remove acentos + trim.
 *
 * "Cardamomo " → "cardamomo"
 * "Noz-Moscada" → "noz-moscada"
 * "Âmbar" → "ambar"
 */
export function normalizarNota(nota: string): string {
  return nota
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Busca info editorial da nota no glossário.
 * Retorna null se a nota não estiver catalogada — o modal usa fallback.
 */
export function getInfoNota(nota: string): NotaGlossario | null {
  const key = normalizarNota(nota);
  return NOTAS_GLOSSARIO[key] ?? null;
}

/**
 * Retorna todos os perfumes do catálogo que contêm a nota X em
 * qualquer pirâmide (topo, coração ou fundo). Comparação normalizada
 * pra ignorar variações de acentuação/case.
 */
export function getPerfumesComNota(nota: string): Perfume[] {
  const target = normalizarNota(nota);
  return CATALOGO.filter((p) => {
    const todas = [...p.notas.topo, ...p.notas.coracao, ...p.notas.fundo];
    return todas.some((n) => normalizarNota(n) === target);
  });
}
