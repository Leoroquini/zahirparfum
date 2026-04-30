"use client";

/**
 * Tracking de eventos críticos do funil de conversão.
 * Dispara em GA4 + Meta Pixel (quando ativos).
 * Eventos customizados que descrevem comportamento real do cliente.
 */

type AnyParams = Record<string, string | number | boolean>;

export function track(
  nome: string,
  params: AnyParams = {}
): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    gtag?: (cmd: string, name: string, params: AnyParams) => void;
    fbq?: (cmd: string, name: string, params: AnyParams) => void;
  };

  // GA4
  if (typeof w.gtag === "function") {
    w.gtag("event", nome, params);
  }

  // Meta Pixel (custom event)
  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", nome, params);
  }
}

/* ---------------- Eventos tipados ---------------- */

export const events = {
  // Entrada / descoberta
  heroCtaClick: (cta: "ritual" | "catalogo") =>
    track("hero_cta_click", { cta }),

  // Ritual
  ritualIniciado: () => track("ritual_iniciado"),
  ritualPerguntaRespondida: (index: number, key: string) =>
    track("ritual_resposta", { pergunta_index: index, resposta: key }),
  ritualCompleto: (perfil: string) =>
    track("ritual_completo", { perfil }),
  ritualEmailCapturado: () => track("ritual_email_capturado"),

  // Catálogo
  catalogoFiltroAplicado: (categoria: string, valor: string) =>
    track("catalogo_filtro", { categoria, valor }),
  catalogoOrdenado: (ordenacao: string) =>
    track("catalogo_ordenado", { ordenacao }),

  // Perfume
  perfumeVisto: (slug: string, nome: string) =>
    track("perfume_visto", { slug, nome }),
  varianteEscolhida: (slug: string, variante: string) =>
    track("variante_escolhida", { slug, variante }),

  // Lista
  adicionouNaLista: (slug: string, variante: string) =>
    track("adicionou_lista", { slug, variante }),
  removeuDaLista: (slug: string, variante: string) =>
    track("removeu_lista", { slug, variante }),
  enviouListaDm: (total: number, valor: number) =>
    track("enviou_lista_dm", { total_itens: total, valor_total: valor }),
  enviouListaWa: (total: number, valor: number) =>
    track("enviou_lista_wa", { total_itens: total, valor_total: valor }),

  // Reserva direta (fora da lista)
  reservaDireta: (slug: string, variante: string, preco: number) =>
    track("reserva_direta", { slug, variante, preco }),

  // Busca
  buscaRealizada: (query: string, resultados: number) =>
    track("busca", { query: query.slice(0, 50), resultados }),

  // Comparador
  comparadorDesignerEscolhido: (designer: string) =>
    track("comparador_designer", { designer }),

  // Conversão final (via IG)
  clickInstagram: (contexto: string) =>
    track("click_instagram", { contexto }),

  // Newsletter
  newsletterInscricao: () => track("newsletter_inscricao"),

  // Kit
  kitTrioAdicionado: (tipo: "estreia" | "colecao") =>
    track("kit_trio_adicionado", { tipo }),
  clickWhatsApp: (contexto: string) =>
    track("click_whatsapp", { contexto }),
};

/* ---------------- UTM handling ---------------- */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Captura UTMs da URL atual e salva em sessionStorage (sessão).
 * Chamar em um effect no layout raiz.
 */
export function captureUtms(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utms[key] = val;
  }
  if (Object.keys(utms).length > 0) {
    try {
      sessionStorage.setItem("zahir-utms", JSON.stringify(utms));
    } catch {
      // silent
    }
    // Dispara também como evento inicial
    track("sessao_iniciada_utm", utms);
  }
}

/** Lê os UTMs capturados (se houver), pra anexar na mensagem do DM */
export function getUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("zahir-utms") ?? "{}");
  } catch {
    return {};
  }
}
