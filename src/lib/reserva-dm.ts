import { type ItemLista, labelDa } from "@/lib/lista-store";
import { CATALOGO } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";

/**
 * Monta URLs de DM pré-preenchidas pra Instagram e WhatsApp.
 *
 * Instagram direct: https://ig.me/m/USUARIO?text=MENSAGEM
 * WhatsApp: https://wa.me/NUMERO?text=MENSAGEM
 */

function formatMoney(n: number): string {
  return `R$ ${n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
