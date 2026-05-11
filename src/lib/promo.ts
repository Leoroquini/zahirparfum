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

/**
 * Reais com decimais quando houver (R$ 59,90 / R$ 199).
 * Usado para preços que podem ter centavos (decants com preço fixo).
 */
export function fmtPrecoBRL(reais: number | null | undefined): string {
  if (reais === null || reais === undefined) return "—";
  const temDecimais = Math.abs(reais - Math.round(reais)) > 0.001;
  return `R$ ${reais.toLocaleString("pt-BR", {
    minimumFractionDigits: temDecimais ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
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

/**
 * Estados possíveis do montador, do ponto de vista do "fechamento em Kit":
 *
 * - vazio: 0 itens
 * - parcial: 1 ou 2 itens — mostra hint de quanto falta + projeção de preço
 * - kit-completo: 3 itens, mesmo tamanho, NEM todos da Seleção → preço cheio do kit
 * - kit-promo: 3 itens, mesmo tamanho, todos da Seleção → preço promo do kit
 * - sem-kit: 3+ itens com tamanhos misturados, ou >3 itens (caso raro)
 */
export type KitDetectado =
  | { tipo: "vazio" }
  | {
      tipo: "parcial";
      kitProjetado: KitConfig; // baseado no tamanho mais comum do que ja escolheu
      faltam: number; // 1 ou 2
      jaSelecionados: number; // quantos dos atuais sao da Selecao
      somaAtualCent: number;
    }
  | {
      tipo: "kit-completo";
      kit: KitConfig;
      somaIndividualCent: number; // o que seria sem o kit (decants avulsos)
      foraDaSelecao: ItemKitMontador[]; // pelo menos 1
      economiaProximoNivelCent: number; // quanto mais economiza se virar 3/3
    }
  | {
      tipo: "kit-promo";
      kit: KitConfig;
      somaIndividualCent: number; // o que seria sem o kit
      economiaTotalCent: number; // soma individual - precoPromo
    }
  | { tipo: "sem-kit"; somaAtualCent: number };

/**
 * Calcula o preço de um decant avulso (sem kit), em centavos.
 * Espelha a lógica de precoDa() em lista-store.ts.
 * Mantida aqui pra evitar dependência circular.
 */
function precoDecantAvulsoCent(perfume: Perfume, tamanho: TamanhoDecant): number {
  if (tamanho === "10ml") {
    if (perfume.precoDecant10Cent !== undefined) return perfume.precoDecant10Cent;
    const base = perfume.precoVenda ?? 0;
    return Math.max(40, Math.round(base * 0.3)) * 100;
  }
  if (perfume.precoDecant5Cent !== undefined) return perfume.precoDecant5Cent;
  const base = perfume.precoVenda ?? 0;
  return Math.max(25, Math.round(base * 0.2)) * 100;
}

/**
 * Detecta o estado atual do montador para fins de exibição de preço e CTA.
 *
 * Importante: o tamanho mais comum dos itens já adicionados é o "kit projetado"
 * usado nas mensagens de parcial. Se mistura 5ml e 10ml, projeta pelo primeiro.
 */
export function detectarKit(itens: ItemKitMontador[]): KitDetectado {
  if (itens.length === 0) return { tipo: "vazio" };

  // Soma do que seria comprado avulso (decants individuais)
  const somaIndividualCent = itens.reduce(
    (sum, i) => sum + precoDecantAvulsoCent(i.perfume, i.tamanho),
    0,
  );

  // Tamanho mais comum (pra projetar qual kit)
  const cont5 = itens.filter((i) => i.tamanho === "5ml").length;
  const cont10 = itens.filter((i) => i.tamanho === "10ml").length;
  const tamanhoProjetado: TamanhoDecant = cont10 >= cont5 ? "10ml" : "5ml";
  const kitProjetado = kitDoTamanho(tamanhoProjetado);

  // < 3 itens → parcial
  if (itens.length < 3) {
    const jaSelecionados = itens.filter(
      (i) => i.perfume.selecionadoSemana === true,
    ).length;
    return {
      tipo: "parcial",
      kitProjetado,
      faltam: 3 - itens.length,
      jaSelecionados,
      somaAtualCent: somaIndividualCent,
    };
  }

  // > 3 itens ou tamanhos mistos
  const t0 = itens[0].tamanho;
  const mesmoTamanho = itens.every((i) => i.tamanho === t0);
  if (itens.length !== 3 || !mesmoTamanho) {
    return { tipo: "sem-kit", somaAtualCent: somaIndividualCent };
  }

  // 3 itens, mesmo tamanho — ou kit completo ou kit promo
  const kit = kitDoTamanho(t0);
  const selecionados = itens.filter(
    (i) => i.perfume.selecionadoSemana === true,
  );

  if (selecionados.length === 3) {
    return {
      tipo: "kit-promo",
      kit,
      somaIndividualCent,
      economiaTotalCent: somaIndividualCent - kit.precoPromo,
    };
  }

  // 0, 1 ou 2 dos 3 são da Seleção → cliente paga preço cheio do kit
  return {
    tipo: "kit-completo",
    kit,
    somaIndividualCent,
    foraDaSelecao: itens.filter((i) => i.perfume.selecionadoSemana !== true),
    economiaProximoNivelCent: kit.precoCheio - kit.precoPromo,
  };
}
