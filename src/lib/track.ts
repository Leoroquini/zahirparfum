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
  iniciouCheckoutMp: (total: number, valor: number) =>
    track("iniciou_checkout_mp", { total_itens: total, valor_total: valor }),
  checkoutMpFalhou: (motivo: string) =>
    track("checkout_mp_falhou", { motivo }),

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

/* ---------------- Eventos canônicos do brief ----------------
 *
 * O brief de redesenho ("Eventos e medição") define uma lista fechada de eventos
 * que descrevem o comportamento específico de perfumaria — não só o clique no
 * frasco. Os nomes abaixo são os do brief, em inglês, para bater 1:1 com a
 * especificação e com o relatório de entrega.
 *
 * Convivem com os eventos PT-BR acima de propósito: aqueles já têm histórico
 * acumulado no GA4 desde abril/2026 e renomear zeraria a série. Os de cima
 * continuam disparando; estes cobrem as lacunas.
 *
 * NÃO IMPLEMENTADO DE PROPÓSITO — `order_confirmed`:
 * o brief é explícito que "uma compra só deve ser confirmada por integração
 * real de pedido ou pagamento". Hoje o pedido fecha manualmente no WhatsApp e
 * o Mercado Pago está dormente (CHECKOUT_MP_ATIVO = false), então o site não
 * tem nenhuma fonte real de confirmação. Disparar esse evento a partir de um
 * clique de CTA seria inventar conversão. Só implementar quando existir webhook
 * de pagamento real ou registro manual de pedido.
 */
export const funnel = {
  /** Abriu a ficha de um perfume. */
  productView: (slug: string, mundo: "ele" | "ela") =>
    track("product_view", { slug, mundo }),

  /** Busca executada no site. */
  siteSearch: (query: string, resultados: number) =>
    track("site_search", { query: query.slice(0, 50), resultados }),

  /** Abriu uma nota olfativa — modal na ficha ou página /nota/[slug]. */
  noteView: (nota: string, origem: "piramide" | "pagina" | "modal") =>
    track("note_view", { nota, origem }),

  /** Tocou/clicou num ponto do mapa olfativo e abriu o painel do produto. */
  mapPointOpen: (slug: string, mundo: "ele" | "ela") =>
    track("map_point_open", { slug, mundo }),

  /** Começou o quiz Ritual. */
  ritualStart: (mundo: "ele" | "ela") => track("ritual_start", { mundo }),

  /** Terminou o quiz e viu o resultado. */
  ritualComplete: (arquetipo: string, mundo: "ele" | "ela") =>
    track("ritual_complete", { arquetipo, mundo }),

  /** Abriu a ficha de um perfume recomendado pelo Ritual. */
  ritualRecommendationOpen: (slug: string, posicao: number) =>
    track("ritual_recommendation_open", { slug, posicao }),

  /** Visualizou um kit de decants pronto (Estreia / Coleção). */
  decantKitView: (kit: string, mundo: "ele" | "ela") =>
    track("decant_kit_view", { kit, mundo }),

  /** Alterou a composição do montador livre de decants. */
  decantBuilderChange: (
    acao: "add" | "remove" | "troca-tamanho",
    slug: string,
    itensNoKit: number,
  ) => track("decant_builder_change", { acao, slug, itens_no_kit: itensNoKit }),

  /** Adicionou item à lista de reserva. */
  listAdd: (slug: string, variante: string) =>
    track("list_add", { slug, variante }),

  /** Abriu o drawer da lista. */
  listOpen: (itens: number) => track("list_open", { itens }),

  /** Iniciou o fecho real do pedido (WhatsApp/Instagram DM). */
  contactOrCheckoutStart: (
    canal: "whatsapp" | "instagram",
    itens: number,
    valor: number,
  ) => track("contact_or_checkout_start", { canal, itens, valor }),

  /**
   * Abriu um comparador. `tipo` distingue as duas ferramentas reais:
   * "designer" = Árabe × Designer (/comparador), "2a2" = comparação par a par (/compare).
   */
  compareOpen: (tipo: "designer" | "2a2", mundo: "ele" | "ela") =>
    track("compare_open", { tipo, mundo }),

  /**
   * A pessoa que já tinha colocado um decant deste SKU na lista voltou e
   * agora está levando o frasco cheio — o ciclo amostra → frasco que define
   * a categoria. Derivado do histórico local da lista, não de dado de venda.
   */
  sampleToFullReturn: (slug: string, decantAnterior: "5ml" | "10ml") =>
    track("sample_to_full_return", { slug, decant_anterior: decantAnterior }),
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
