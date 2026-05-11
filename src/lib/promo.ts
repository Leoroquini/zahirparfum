/**
 * Helpers de Seleção da Semana e Promo.
 *
 * - Seleção da Semana: curadoria editorial rotativa de 12 SKUs, marcada via
 *   campo `selecionadoSemana` em src/data/catalogo.ts.
 * - Promo individual: `precoPromoCentavos` no SKU.
 * - Kit Estreia / Kit Coleção: preço promocional quando os 3 decants são da
 *   Seleção da Semana e do mesmo tamanho (5ml ou 10ml).
 */

import type { Perfume } from "@/data/catalogo";

/* ---------------- Kits ---------------- */

export type TamanhoDecant = "5ml" | "10ml";
export type TipoKit = "estreia" | "colecao";

export const KIT_ESTREIA = {
  tipo: "estreia" as const,
  tamanho: "5ml" as TamanhoDecant,
  titulo: "Kit Estreia",
  subtitulo: "3 decants 5ml",
  precoCheio: 9990,
  precoPromo: 6990,
} as const;

export const KIT_COLECAO = {
  tipo: "colecao" as const,
  tamanho: "10ml" as TamanhoDecant,
  titulo: "Kit Coleção",
  subtitulo: "3 decants 10ml",
  precoCheio: 14990,
  precoPromo: 9990,
} as const;

export type KitConfig = typeof KIT_ESTREIA | typeof KIT_COLECAO;

export function kitDoTamanho(tamanho: TamanhoDecant): KitConfig {
  return tamanho === "5ml" ? KIT_ESTREIA : KIT_COLECAO;
}

/* ---------------- Preço ---------------- */

/** Centavos para reais, sempre R$ 99,90 (não R$ 100) */
export function fmtPrecoCent(centavos: number): string {
  const v = centavos / 100;
  return `R$ ${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Reais inteiros (R$ 199) */
export function fmtPrecoReal(reais: number | null): string {
  if (reais === null) return "—";
  return `R$ ${reais.toLocaleString("pt-BR")}`;
}

/** Retorna o preço efetivo do frasco (promo se houver) e flag emPromo. */
export function precoFrasco(p: Perfume): { atual: number | null; cheio: number | null; emPromo: boolean } {
  if (p.precoVenda === null) return { atual: null, cheio: null, emPromo: false };
  if (p.precoPromoCentavos !== undefined) {
    return {
      atual: p.precoPromoCentavos / 100,
      cheio: p.precoVenda,
      emPromo: true,
    };
  }
  return { atual: p.precoVenda, cheio: p.precoVenda, emPromo: false };
}

/** Desconto percentual da promo (inteiro arredondado). */
export function descontoPercent(p: Perfume): number | null {
  if (!p.precoPromoCentavos || p.precoVenda === null) return null;
  const cheio = p.precoVenda;
  const promo = p.precoPromoCentavos / 100;
  return Math.round((1 - promo / cheio) * 100);
}

/* ---------------- Data dinâmica ---------------- */

/**
 * Próximo domingo (inclusive hoje se for domingo).
 * Usado em "Válido até [data]" da Seleção da Semana.
 */
export function proximoDomingo(now: Date = new Date()): Date {
  const d = new Date(now);
  const dia = d.getDay(); // 0 = domingo
  if (dia === 0) return d;
  d.setDate(d.getDate() + (7 - dia));
  return d;
}

/** "domingo, 17 de maio" — formato editorial */
export function fmtDataExtenso(d: Date): string {
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/* ---------------- Kit detection (montador) ---------------- */

export type ItemKitMontador = {
  perfume: Perfume;
  tamanho: TamanhoDecant;
};

export type KitDetectado =
  | {
      tipo: "kit-promo";
      kit: KitConfig;
      economiaCent: number;
    }
  | {
      tipo: "quase-promo";
      kit: KitConfig;
      foraDaSelecao: ItemKitMontador[];
      economiaCent: number;
    }
  | { tipo: "nenhum" };

/**
 * Detecta se a combinação atual no montador qualifica para um kit promo,
 * ou se está quase lá (2/3 selecionados).
 *
 * Regra:
 * - Exatamente 3 itens, todos do mesmo tamanho → considera kit (5ml = Estreia, 10ml = Coleção)
 * - Todos 3 com selecionadoSemana → "kit-promo"
 * - 2 dos 3 selecionados → "quase-promo" com lista de quem está fora
 * - Outros casos → "nenhum"
 */
export function detectarKit(itens: ItemKitMontador[]): KitDetectado {
  if (itens.length !== 3) return { tipo: "nenhum" };
  const t0 = itens[0].tamanho;
  if (!itens.every((i) => i.tamanho === t0)) return { tipo: "nenhum" };

  const kit = kitDoTamanho(t0);
  const selecionados = itens.filter((i) => i.perfume.selecionadoSemana === true);
  const economiaCent = kit.precoCheio - kit.precoPromo;

  if (selecionados.length === 3) {
    return { tipo: "kit-promo", kit, economiaCent };
  }
  if (selecionados.length === 2) {
    const foraDaSelecao = itens.filter((i) => i.perfume.selecionadoSemana !== true);
    return { tipo: "quase-promo", kit, foraDaSelecao, economiaCent };
  }
  return { tipo: "nenhum" };
}
