import { type ItemLista, labelDa } from "@/lib/lista-store";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";
import {
  detectarKit,
  fmtPrecoCent,
  type TamanhoDecant,
} from "@/lib/promo";

/**
 * Monta URLs de DM pré-preenchidas pra Instagram e WhatsApp.
 *
 * Instagram direct: https://ig.me/m/USUARIO?text=MENSAGEM
 * WhatsApp: https://wa.me/NUMERO?text=MENSAGEM
 */

function formatMoney(n: number): string {
  // Mostra centavos quando houver (R$ 59,90), inteiro quando nao (R$ 199)
  const temDecimais = Math.abs(n - Math.round(n)) > 0.001;
  return `R$ ${n.toLocaleString("pt-BR", {
    minimumFractionDigits: temDecimais ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Mensagem pra lista completa */
export function mensagemLista(itens: ItemLista[]): string {
  if (itens.length === 0) {
    return `Oi, ZAHIR! Gostaria de conversar sobre perfumes do catálogo.`;
  }

  const linhas = itens.map((item, i) => {
    const perfume = CATALOGO.find((p) => p.id === item.perfumeId);
    if (!perfume) return "";
    const variacao = labelDa(item.variante);
    return `${i + 1}. ${perfume.nome} (${variacao}), ${formatMoney(item.precoSnapshot)}`;
  });

  const total = itens.reduce((sum, i) => sum + i.precoSnapshot, 0);

  return [
    `Oi, ZAHIR! Quero reservar:`,
    ``,
    ...linhas,
    ``,
    `Total estimado: ${formatMoney(total)}`,
    ``,
    `Pode me passar o valor com frete e as formas de pagamento?`,
  ].join("\n");
}

/**
 * Mensagem específica do montador de kit. Quando os 3 decants são da Seleção
 * da Semana e mesmo tamanho, marca como "kit promocional" — caso contrário,
 * lista item a item (preço cheio).
 */
export function mensagemKitMontador(
  itens: { perfume: Perfume; tamanho: TamanhoDecant; preco: number }[],
): string {
  const detect = detectarKit(
    itens.map((i) => ({ perfume: i.perfume, tamanho: i.tamanho })),
  );

  const linhasItens = itens.map((it, i) => {
    return `${i + 1}. ${it.perfume.nome} (decant ${it.tamanho})`;
  });

  if (detect.tipo === "kit-promo") {
    return [
      `Oi, ZAHIR! Quero fechar o ${detect.kit.titulo.toUpperCase()} promocional:`,
      ``,
      ...linhasItens,
      ``,
      `Valor do kit: ${fmtPrecoCent(detect.kit.precoPromo)} (economia de ${fmtPrecoCent(detect.economiaTotalCent)} sobre os decants avulsos)`,
      ``,
      `Pode confirmar o frete e a forma de pagamento?`,
    ].join("\n");
  }

  if (detect.tipo === "kit-completo") {
    return [
      `Oi, ZAHIR! Quero fechar o ${detect.kit.titulo.toUpperCase()}:`,
      ``,
      ...linhasItens,
      ``,
      `Valor do kit: ${fmtPrecoCent(detect.kit.precoCheio)}`,
      ``,
      `Pode confirmar o frete e a forma de pagamento?`,
    ].join("\n");
  }

  const total = itens.reduce((sum, i) => sum + i.preco, 0);
  return [
    `Oi, ZAHIR! Quero fechar este kit:`,
    ``,
    ...linhasItens.map((l, i) => `${l} — ${formatMoney(itens[i].preco)}`),
    ``,
    `Total: ${formatMoney(total)}`,
    ``,
    `Pode confirmar o frete e a forma de pagamento?`,
  ].join("\n");
}

/** URL completa do DM Instagram com mensagem */
export function linkInstagram(mensagem: string): string {
  const usuario = BRAND.handles.instagram;
  return `https://ig.me/m/${usuario}?text=${encodeURIComponent(mensagem)}`;
}

/** URL completa do WhatsApp com mensagem. Retorna null se número não configurado. */
export function linkWhatsApp(mensagem: string): string | null {
  const numero = BRAND.whatsapp.number;
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
