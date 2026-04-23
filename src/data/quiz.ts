import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Engine do Ritual — quiz olfativo.
 * Cada resposta acumula pontos nas dimensões olfativas.
 * Ao final, cruzamos as top dimensões com as famílias do catálogo
 * pra sugerir 3 perfumes.
 */

export type Dimensao =
  | "fresco"
  | "intenso"
  | "doce"
  | "seco"
  | "amadeirado"
  | "gourmand"
  | "aquatico"
  | "especiado";

export type Resposta = {
  key: string;
  label: string;
  scores: Partial<Record<Dimensao, number>>;
};

export type Pergunta = {
  id: string;
  eyebrow: string;
  pergunta: string;
  respostas: Resposta[];
  /** Cor de fundo ambiente dessa pergunta (CSS color) */
  ambiente?: string;
};

export const PERGUNTAS: Pergunta[] = [
  {
    id: "hora",
    eyebrow: "01 · Momento",
    pergunta: "Qual sua hora favorita do dia?",
    ambiente: "radial-gradient(ellipse at 70% 30%, rgba(231,182,89,0.18), transparent 60%)",
    respostas: [
      { key: "manha", label: "Manhã — quando o dia começa limpo", scores: { fresco: 3, aquatico: 2 } },
      { key: "tarde", label: "Tarde — sol alto e foco", scores: { seco: 2, amadeirado: 1 } },
      { key: "noite", label: "Noite — a cidade acordando", scores: { intenso: 3, amadeirado: 2 } },
      { key: "madrugada", label: "Madrugada — o mundo em silêncio", scores: { intenso: 2, gourmand: 2, doce: 1 } },
    ],
  },
  {
    id: "encontro",
    eyebrow: "02 · Encontro",
    pergunta: "Num encontro você prefere…",
    ambiente: "radial-gradient(ellipse at 30% 40%, rgba(200,155,60,0.2), transparent 60%)",
    respostas: [
      { key: "jantar", label: "Jantar sentado, lugar caprichado", scores: { intenso: 2, amadeirado: 2, especiado: 1 } },
      { key: "bar", label: "Bar moderno, drink autoral", scores: { fresco: 1, amadeirado: 2, seco: 1 } },
      { key: "caminhada", label: "Caminhada no fim da tarde", scores: { fresco: 3, aquatico: 1 } },
      { key: "festa", label: "Festa com gente demais", scores: { intenso: 3, doce: 2, gourmand: 1 } },
    ],
  },
  {
    id: "infancia",
    eyebrow: "03 · Memória",
    pergunta: "O cheiro da sua infância era de…",
    ambiente: "radial-gradient(ellipse at 60% 70%, rgba(122,45,50,0.22), transparent 60%)",
    respostas: [
      { key: "cozinha", label: "Cozinha da vó — bolo e café", scores: { gourmand: 3, doce: 2 } },
      { key: "pai", label: "Perfume do pai no banheiro", scores: { amadeirado: 3, intenso: 1, seco: 1 } },
      { key: "chuva", label: "Chuva caindo no asfalto quente", scores: { aquatico: 3, fresco: 2 } },
      { key: "jardim", label: "Jardim, terra molhada, flor", scores: { fresco: 1, doce: 2 } },
    ],
  },
  {
    id: "projecao",
    eyebrow: "04 · Assinatura",
    pergunta: "Você prefere perfumes que…",
    ambiente: "radial-gradient(ellipse at 50% 50%, rgba(231,182,89,0.18), transparent 55%)",
    respostas: [
      { key: "gritam", label: "Gritam — querem ser notados", scores: { intenso: 3, gourmand: 2 } },
      { key: "sussurram", label: "Sussurram — classe no detalhe", scores: { fresco: 2, seco: 2 } },
      { key: "contam", label: "Contam história — têm camadas", scores: { amadeirado: 2, especiado: 2 } },
      { key: "fogem", label: "Fogem do óbvio — ninguém usa igual", scores: { especiado: 2, intenso: 2 } },
    ],
  },
  {
    id: "estacao",
    eyebrow: "05 · Estação",
    pergunta: "Em qual estação você se sente mais você?",
    ambiente: "radial-gradient(ellipse at 20% 80%, rgba(200,155,60,0.16), transparent 55%)",
    respostas: [
      { key: "verao", label: "Verão — ar leve, pele aquecida", scores: { fresco: 3, aquatico: 2 } },
      { key: "primavera", label: "Primavera — começos", scores: { fresco: 2, doce: 1 } },
      { key: "outono", label: "Outono — luz dourada, leve melancolia", scores: { amadeirado: 2, seco: 1, especiado: 1 } },
      { key: "inverno", label: "Inverno — casaco e lareira", scores: { intenso: 2, gourmand: 2, amadeirado: 1 } },
    ],
  },
  {
    id: "bebida",
    eyebrow: "06 · Se virasse bebida",
    pergunta: "Que bebida representa você hoje?",
    ambiente: "radial-gradient(ellipse at 80% 20%, rgba(122,45,50,0.25), transparent 60%)",
    respostas: [
      { key: "whisky", label: "Whisky single malt", scores: { amadeirado: 3, seco: 2, intenso: 1 } },
      { key: "vinho", label: "Vinho tinto encorpado", scores: { intenso: 2, doce: 1, amadeirado: 2 } },
      { key: "gin", label: "Gin tônica com alecrim", scores: { fresco: 3, seco: 2 } },
      { key: "cafe", label: "Café curto, forte, sem açúcar", scores: { gourmand: 2, intenso: 2, seco: 1 } },
    ],
  },
];

/* ---------------- Scoring engine ---------------- */

export type Perfil = {
  top: Dimensao[];
  scores: Record<Dimensao, number>;
  tituloPerfil: string;
  descricao: string;
};

/** Mapa dimensão → famílias que satisfazem */
const DIMENSAO_FAMILIAS: Record<Dimensao, string[]> = {
  fresco: [
    "Aquático Marinho",
    "Amadeirado Aquático",
    "Aromático Frutado Cítrico",
    "Amadeirado Aromático Fresco",
  ],
  intenso: [
    "Oriental Especiado",
    "Oriental Oud",
    "Oriental Amadeirado",
    "Âmbar Oriental",
    "Amadeirado Gourmand",
    "Oriental",
  ],
  doce: [
    "Oriental Gourmand",
    "Oriental Baunilha",
    "Âmbar Oriental",
    "Floral Doce",
    "Amadeirado Gourmand",
  ],
  seco: [
    "Amadeirado",
    "Amadeirado Especiado",
    "Aromático Fougère",
    "Amadeirado Aromático",
  ],
  amadeirado: [
    "Amadeirado Aromático",
    "Amadeirado Especiado",
    "Oriental Amadeirado",
    "Amadeirado",
    "Amadeirado Gourmand",
    "Aromático Frutado Amadeirado",
  ],
  gourmand: [
    "Oriental Gourmand",
    "Oriental Baunilha",
    "Amadeirado Gourmand",
    "Floral Doce",
  ],
  aquatico: ["Aquático Marinho", "Amadeirado Aquático"],
  especiado: [
    "Oriental Especiado",
    "Amadeirado Especiado",
    "Âmbar Oriental",
    "Oriental",
  ],
};

/** Título narrativo do perfil baseado na dimensão principal */
const TITULO_POR_DIMENSAO: Record<Dimensao, { titulo: string; descricao: string }> = {
  fresco: {
    titulo: "O Fresco Urbano",
    descricao:
      "Você prefere perfumes que respiram leveza e movimento — cítricos que acordam, aquáticos que refrescam, aromáticos que nunca pesam.",
  },
  intenso: {
    titulo: "O Noturno Árabe",
    descricao:
      "Você é feito pra perfume que entra na sala antes de você — orientais densos, madeiras profundas, projeção que marca presença.",
  },
  doce: {
    titulo: "O Doce Masculino",
    descricao:
      "Você tem pele pra gourmands — baunilha, café, praliné, âmbar. Perfume que abraça e fica na memória de quem passa.",
  },
  seco: {
    titulo: "O Clássico Seco",
    descricao:
      "Você gosta da classe sem grito — fougères, amadeirados austeros, aromáticos especiados. Elegância que não precisa performar.",
  },
  amadeirado: {
    titulo: "O Madeira Moderno",
    descricao:
      "Sândalo, cedro, vetiver, cashmeran — suas madeiras são a assinatura. Perfume de homem que conversa devagar e com segurança.",
  },
  gourmand: {
    titulo: "O Gourmand Profundo",
    descricao:
      "Tabaco, chocolate amargo, café, baunilha escura — gourmands masculinos que flertam com a sobremesa sem virar doce barato.",
  },
  aquatico: {
    titulo: "O Aquático Contemporâneo",
    descricao:
      "Você busca a sensação de sal, brisa, pele limpa — perfumes que lembram o melhor tipo de verão, mesmo no meio do ano.",
  },
  especiado: {
    titulo: "O Especiado Árabe",
    descricao:
      "Açafrão, cardamomo, canela, pimenta — especiarias que vêm do mundo árabe pra traduzir calor e mistério no seu perfume.",
  },
};

export function calcularPerfil(
  respostas: Resposta[]
): Perfil {
  const scores: Record<Dimensao, number> = {
    fresco: 0,
    intenso: 0,
    doce: 0,
    seco: 0,
    amadeirado: 0,
    gourmand: 0,
    aquatico: 0,
    especiado: 0,
  };

  for (const r of respostas) {
    for (const [dim, pts] of Object.entries(r.scores)) {
      scores[dim as Dimensao] += pts ?? 0;
    }
  }

  const sorted = (Object.entries(scores) as [Dimensao, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([d]) => d);

  const top = sorted.slice(0, 3);
  const primary = top[0];
  const { titulo, descricao } = TITULO_POR_DIMENSAO[primary];

  return {
    top,
    scores,
    tituloPerfil: titulo,
    descricao,
  };
}

export function perfumesPara(perfil: Perfil, limit = 3): Perfume[] {
  // Junta as famílias que satisfazem as top dimensões
  const familiasPriorizadas = Array.from(
    new Set(perfil.top.flatMap((d) => DIMENSAO_FAMILIAS[d]))
  );

  // Score cada perfume: quantas dimensões top ele casa + peso pelo rank
  const scored = CATALOGO.filter((p) => p.familia && p.precoVenda !== null).map(
    (p) => {
      let pScore = 0;
      perfil.top.forEach((dim, rank) => {
        const famForDim = DIMENSAO_FAMILIAS[dim];
        if (famForDim.includes(p.familia!)) {
          pScore += (3 - rank) * 10; // top1=30, top2=20, top3=10
        }
      });
      return { perfume: p, score: pScore };
    }
  );

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // tiebreak: preço crescente (introduz o Descobridor com opção mais acessível)
      return (a.perfume.precoVenda ?? 0) - (b.perfume.precoVenda ?? 0);
    })
    .slice(0, limit)
    .map((s) => s.perfume);
}
