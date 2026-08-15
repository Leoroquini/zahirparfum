import {
  type ItemLista,
  type VarianteReserva,
  labelDa,
  precoDefinido,
} from "@/lib/lista-store";
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

  // Itens cujo preço não está definido no catálogo entram como "a confirmar".
  // Antes, o valor calculado pelo fallback de precoDa() ia na mensagem como se
  // fosse preço fechado — o cliente recebia "R$ 30,00" num decant que a
  // operação nunca precificou.
  let aConfirmar = 0;
  let somaConhecida = 0;

  const linhas = itens.map((item, i) => {
    const perfume = CATALOGO.find((p) => p.id === item.perfumeId);
    if (!perfume) return "";
    const variacao = labelDa(item.variante);
    if (!precoDefinido(perfume, item.variante)) {
      aConfirmar += 1;
      return `${i + 1}. ${perfume.nome} (${variacao}), valor a confirmar`;
    }
    somaConhecida += item.precoSnapshot;
    return `${i + 1}. ${perfume.nome} (${variacao}), ${formatMoney(item.precoSnapshot)}`;
  });

  const linhaTotal =
    aConfirmar === 0
      ? `Total estimado: ${formatMoney(somaConhecida)}`
      : somaConhecida > 0
        ? `Parcial: ${formatMoney(somaConhecida)} — falta o valor de ${aConfirmar} ${aConfirmar === 1 ? "item" : "itens"}`
        : `Preços a confirmar com vocês`;

  return [
    `Oi, ZAHIR! Quero reservar:`,
    ``,
    ...linhas,
    ``,
    linhaTotal,
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

  // Kit sem gatilho de promo: lista item a item. Itens de SKU ainda não
  // precificado entram como "valor a confirmar" em vez do número que o
  // fallback de precoDa() calcularia.
  let aConfirmar = 0;
  let somaConhecida = 0;

  const linhasComPreco = itens.map((it, i) => {
    const variante: VarianteReserva =
      it.tamanho === "10ml" ? "decant-10" : "decant-5";
    if (!precoDefinido(it.perfume, variante)) {
      aConfirmar += 1;
      return `${linhasItens[i]} — valor a confirmar`;
    }
    somaConhecida += it.preco;
    return `${linhasItens[i]} — ${formatMoney(it.preco)}`;
  });

  const linhaTotal =
    aConfirmar === 0
      ? `Total: ${formatMoney(somaConhecida)}`
      : somaConhecida > 0
        ? `Parcial: ${formatMoney(somaConhecida)} — falta o valor de ${aConfirmar} ${aConfirmar === 1 ? "item" : "itens"}`
        : `Preços a confirmar com vocês`;

  return [
    `Oi, ZAHIR! Quero fechar este kit:`,
    ``,
    ...linhasComPreco,
    ``,
    linhaTotal,
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
