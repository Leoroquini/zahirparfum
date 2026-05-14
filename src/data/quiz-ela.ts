import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Engine do Ritual feminino.
 *
 * Baseado em pesquisa de mercado feminino árabe (2026-05-12):
 * - 40% das vendas femininas árabes são Gourmand (Khamrah, Sweet Like Candy)
 * - 35% são Floral (Crystal Rose, Rose Paris, Shagaf Al Ward)
 * - 20% são Frutal-Floral leve (Yara, Lychee Musk)
 * - 5% premium é Oriental Oud rosé (Bade'e Al Oud)
 *
 * 4 arquétipos de saída:
 * - A Amante (gourmand+oriental, "fica e marca")
 * - A Romântica (floral+rosa)
 * - A Solar (frutal-floral leve)
 * - A Misteriosa (oriental-oud rosé)
 */

export type DimensaoEla =
  | "fresco"
  | "envolvente"
  | "floral"
  | "gourmand"
  | "frutal"
  | "oriental"
  | "rosa"
  | "intensa";

export type FaixaPrecoEla = "ate-200" | "200-350" | "350-500" | "500-mais";

export type VetoEla =
  | "doce-enjoativo"
  | "floral-velho"
  | "masculino-pesado"
  | "sintetico-barato";

export type RespostaEla = {
  key: string;
  label: string;
  scores?: Partial<Record<DimensaoEla, number>>;
  faixaPreco?: FaixaPrecoEla;
  veto?: VetoEla | null;
  familiaBoost?: string[];
  projecao?: "skin" | "media" | "alta";
};

export type PerguntaEla = {
  id: string;
  eyebrow: string;
  pergunta: string;
  hint?: string;
  respostas: RespostaEla[];
  ambiente?: string;
};

export const PERGUNTAS_ELA: PerguntaEla[] = [
  {
    id: "memoria",
    eyebrow: "01 · Memória olfativa",
    pergunta: "Qual desses cheiros te leva pra um lugar bom?",
    hint: "A memória olfativa diz mais sobre você que qualquer adjetivo. Escolhe o que MAIS te marca.",
    ambiente:
      "radial-gradient(ellipse at 70% 30%, rgba(212,165,116,0.22), transparent 60%)",
    respostas: [
      {
        key: "padaria-manha",
        label: "Padaria de manhã — pão quente, café, baunilha no ar",
        scores: { gourmand: 3, envolvente: 1 },
        familiaBoost: [
          "Oriental Gourmand",
          "Oriental Baunilha",
          "Gourmand",
          "Gourmand Floral",
        ],
      },
      {
        key: "jardim-chuva",
        label: "Jardim depois da chuva — pétalas molhadas, terra fresca",
        scores: { floral: 3, fresco: 2 },
        familiaBoost: [
          "Floral",
          "Floral Branco",
          "Floral Frutal",
          "Floral Rosa",
        ],
      },
      {
        key: "pele-marcante",
        label: "Pele de alguém marcante — quase abraçar pra sentir",
        scores: { envolvente: 3, oriental: 2, intensa: 2 },
        familiaBoost: [
          "Oriental Oud",
          "Oriental",
          "Floral Oriental",
          "Âmbar Oriental",
        ],
      },
      {
        key: "festa-doces",
        label: "Festa de aniversário — banana split, algodão doce",
        scores: { gourmand: 2, fresco: 1, frutal: 2 },
        familiaBoost: ["Gourmand", "Floral Doce", "Frutal Almíscar"],
      },
      {
        key: "praia-sal",
        label: "Praia, sal, frutas tropicais cortadas",
        scores: { fresco: 3, frutal: 2 },
        familiaBoost: ["Frutal", "Floral Frutal", "Frutal Almíscar"],
      },
    ],
  },
  {
    id: "designer",
    eyebrow: "02 · Referência",
    pergunta: "Qual desses perfumes designer você já amou ou tem curiosidade?",
    hint: "Não precisa conhecer todos. Escolhe o que mais te chama, mesmo só pelo nome.",
    ambiente:
      "radial-gradient(ellipse at 30% 40%, rgba(200,155,60,0.2), transparent 60%)",
    respostas: [
      {
        key: "la-vie-est-belle",
        label: "La Vie Est Belle (Lancôme) — gourmand floral",
        scores: { gourmand: 2, floral: 1, envolvente: 1 },
        familiaBoost: ["Gourmand Floral", "Floral Doce", "Oriental Gourmand"],
      },
      {
        key: "good-girl",
        label: "Good Girl (Carolina Herrera) — amêndoa, cacau, jasmim",
        scores: { gourmand: 2, envolvente: 2, intensa: 1 },
        familiaBoost: [
          "Oriental Gourmand",
          "Gourmand Especiado",
          "Floral Oriental",
        ],
      },
      {
        key: "libre-idole",
        label: "Libre/Idôle (YSL/Lancôme) — floral moderno",
        scores: { floral: 2, fresco: 1, envolvente: 1 },
        familiaBoost: ["Floral", "Floral Branco", "Floral Frutal"],
      },
      {
        key: "black-opium",
        label: "Black Opium (YSL) — café, baunilha, escuro",
        scores: { gourmand: 3, envolvente: 2, intensa: 2 },
        familiaBoost: [
          "Oriental Gourmand",
          "Gourmand Especiado",
          "Oriental Baunilha",
        ],
      },
      {
        key: "coco-mademoiselle",
        label: "Coco Mademoiselle/Chance (Chanel) — chipre floral",
        scores: { floral: 2, oriental: 1, fresco: 1 },
        familiaBoost: ["Floral Oriental", "Floral", "Floral Rosa"],
      },
      {
        key: "nao-conheco",
        label: "Não conheço nenhum desses — quero descobrir",
        scores: { envolvente: 1 },
      },
    ],
  },
  {
    id: "percepcao",
    eyebrow: "03 · Como ser percebida",
    pergunta:
      "Quando alguém te encontra de perto, o que você quer que ela sinta?",
    hint: "Não é vaidade — é direção. Cada resposta puxa um perfil diferente.",
    ambiente:
      "radial-gradient(ellipse at 50% 50%, rgba(212,165,116,0.18), transparent 55%)",
    respostas: [
      {
        key: "gostosa",
        label: '"Que mulher gostosa" — direto, sedutor, marcante',
        scores: { envolvente: 3, gourmand: 2, intensa: 2 },
        familiaBoost: [
          "Oriental Gourmand",
          "Gourmand Especiado",
          "Oriental",
        ],
      },
      {
        key: "elegante",
        label: '"Que mulher elegante" — refinado, sofisticado, clean',
        scores: { floral: 2, fresco: 2 },
        familiaBoost: ["Floral", "Floral Branco", "Floral Frutal"],
      },
      {
        key: "diferente",
        label: '"Que mulher diferente" — único, marcante, fora da curva',
        scores: { oriental: 3, intensa: 2, envolvente: 1 },
        familiaBoost: [
          "Oriental Oud",
          "Oriental Especiado",
          "Floral Oriental",
        ],
      },
      {
        key: "confortavel",
        label: '"Confortável, gostei dela" — abraçável, fácil de gostar',
        scores: { frutal: 2, floral: 1, fresco: 1 },
        familiaBoost: ["Frutal Almíscar", "Floral Frutal", "Floral Doce"],
      },
    ],
  },
  {
    id: "ocasiao",
    eyebrow: "04 · Ocasião",
    pergunta: "Quando você mais quer cheirar bem?",
    hint: "Pensa no momento principal — o que mais se repete na sua semana.",
    ambiente:
      "radial-gradient(ellipse at 60% 70%, rgba(122,45,50,0.2), transparent 60%)",
    respostas: [
      {
        key: "trabalho",
        label: "Trabalho, dia a dia — leve, sem invadir",
        scores: { fresco: 3, floral: 1, frutal: 1 },
        projecao: "skin",
      },
      {
        key: "encontros",
        label: "Encontros, jantares — quero envolver",
        scores: { envolvente: 3, gourmand: 1, oriental: 1 },
        projecao: "media",
      },
      {
        key: "eventos",
        label: "Eventos, festas — marca, sem pedir licença",
        scores: { intensa: 3, envolvente: 2, gourmand: 1 },
        projecao: "alta",
      },
      {
        key: "para-mim",
        label: "Em casa, pra mim mesma — me dou esse luxo",
        scores: { gourmand: 2, envolvente: 1 },
        projecao: "skin",
      },
    ],
  },
  {
    id: "projecao",
    eyebrow: "05 · Sua pele",
    pergunta: "Você prefere um perfume que…",
    hint: "Algumas mulheres amam rastro forte, outras o discreto. Sem julgamento.",
    ambiente:
      "radial-gradient(ellipse at 20% 80%, rgba(212,165,116,0.18), transparent 55%)",
    respostas: [
      {
        key: "skin-scent",
        label: "Cola na pele — só quem está pertinho sente",
        scores: { fresco: 1, floral: 1 },
        projecao: "skin",
      },
      {
        key: "rastro-medio",
        label: "Deixa rastro, mas não invade — meio termo",
        scores: { envolvente: 1, floral: 1 },
        projecao: "media",
      },
      {
        key: "anuncia",
        label: 'Anuncia minha chegada — "que cheiro é esse?"',
        scores: { intensa: 3, envolvente: 1 },
        projecao: "alta",
      },
    ],
  },
  {
    id: "veto",
    eyebrow: "06 · O que você NÃO quer",
    pergunta: "Qual desses te incomoda mais em um perfume feminino?",
    hint: "Filtra o que vou recomendar. Mais útil pra descobrir do que a pergunta dos preferidos.",
    ambiente:
      "radial-gradient(ellipse at 80% 20%, rgba(74,21,24,0.22), transparent 60%)",
    respostas: [
      {
        key: "doce-enjoativo",
        label: "Muito doce/enjoativo (algodão doce, açúcar exagerado)",
        veto: "doce-enjoativo",
      },
      {
        key: "floral-velho",
        label: "Floral clássico de senhora (rosa pesada, perfume de avó)",
        veto: "floral-velho",
      },
      {
        key: "masculino-pesado",
        label: "Madeira/oud muito pesados — fica masculino na minha pele",
        veto: "masculino-pesado",
      },
      {
        key: "sintetico",
        label: "Sintético, perfume barato, gosto de álcool",
        veto: "sintetico-barato",
      },
      {
        key: "nenhum-veto",
        label: "Nenhum desses — sou aberta",
        veto: null,
      },
    ],
  },
];

/* ---------------- Scoring engine ---------------- */

export type PerfilEla = {
  top: DimensaoEla[];
  scores: Record<DimensaoEla, number>;
  faixaPreco: FaixaPrecoEla | null;
  veto: VetoEla | null;
  projecaoPref: "skin" | "media" | "alta" | null;
  familiaBoosts: string[];
  jaAmou: string | null;
  tituloPerfil: string;
  descricao: string;
};

export type RecomendacaoPerfumeEla = {
  perfume: Perfume;
  score: number;
  afinidade: number;
  porque: string;
  tipo: "conforto" | "ousadia";
};

export type RecomendacoesEla = {
  conforto: RecomendacaoPerfumeEla[];
  ousadia: RecomendacaoPerfumeEla | null;
};

const DIMENSAO_FAMILIAS_ELA: Record<DimensaoEla, string[]> = {
  fresco: ["Floral Frutal", "Frutal", "Frutal Almíscar", "Floral Branco"],
  envolvente: [
    "Oriental Gourmand",
    "Gourmand Especiado",
    "Oriental",
    "Âmbar Oriental",
    "Oriental Floral",
    "Floral Oriental",
  ],
  floral: ["Floral", "Floral Branco", "Floral Rosa", "Floral Frutal"],
  gourmand: [
    "Gourmand",
    "Gourmand Floral",
    "Floral Doce",
    "Oriental Gourmand",
    "Gourmand Especiado",
    "Oriental Baunilha",
    "Amadeirado Gourmand",
  ],
  frutal: ["Frutal", "Floral Frutal", "Frutal Almíscar"],
  oriental: [
    "Oriental Oud",
    "Oriental Especiado",
    "Oriental",
    "Âmbar Oriental",
    "Oriental Floral",
  ],
  rosa: ["Floral Rosa", "Floral", "Floral Oriental"],
  intensa: [
    "Oriental Oud",
    "Oriental Especiado",
    "Amadeirado Gourmand",
    "Âmbar Oriental",
  ],
};

/**
 * 4 arquétipos femininos derivados da pesquisa. Cada um corresponde a uma
 * combinação primária de dimensões.
 */
const TITULO_POR_DIMENSAO_ELA: Record<
  DimensaoEla,
  { titulo: string; descricao: string }
> = {
  gourmand: {
    titulo: "A Amante",
    descricao:
      "Você é feita pra gourmands envolventes — baunilha, mel, dátil, praliné. Perfume que abraça e fica na memória de quem te encontra de perto. Doce sem ser enjoativo, marcante sem precisar performar.",
  },
  envolvente: {
    titulo: "A Amante",
    descricao:
      "Você prefere fragrâncias que não pedem licença. Orientais quentes, gourmand árabe, especiarias doces — a aura que entra na sala junto com você e fica depois.",
  },
  floral: {
    titulo: "A Romântica",
    descricao:
      "Florais sofisticados são o seu lugar — rosa de Taif, jasmim, tuberosa, flor de laranjeira. Refinado sem ser óbvio, romântico sem ser ingênuo. Elegância que se faz notar devagar.",
  },
  rosa: {
    titulo: "A Romântica",
    descricao:
      "A rosa é a sua nota assinatura — não a rosa de chá fraca, mas a rosa árabe densa, complexa, com camadas. Feminino clássico com toque moderno.",
  },
  frutal: {
    titulo: "A Solar",
    descricao:
      "Você é a fragrância que todo mundo elogia e ninguém esquece. Frutal-floral, almíscar leve, doce equilibrado. 'Que cheiro gostoso' é o seu refrão.",
  },
  fresco: {
    titulo: "A Solar",
    descricao:
      "Frescor com personalidade — não cítrico genérico, mas frutal árabe com sofisticação. Leve no dia, suficiente pra deixar memória sem invadir.",
  },
  oriental: {
    titulo: "A Misteriosa",
    descricao:
      "Você não quer cheirar igual à amiga. Oriental denso, oud rosé, açafrão, mirra — o universo árabe inteiro condensado em uma fragrância única. Nicho de verdade.",
  },
  intensa: {
    titulo: "A Misteriosa",
    descricao:
      "Projeção alta, fixação noite inteira, único. Quando você sai do elevador, deixa um rastro que vira pergunta. Perfume árabe no seu auge.",
  },
};

const PRECO_RANGE_ELA: Record<FaixaPrecoEla, [number, number]> = {
  "ate-200": [0, 200],
  "200-350": [180, 380],
  "350-500": [330, 530],
  "500-mais": [450, 9999],
};

const VETO_FAMILIAS_PROIBIDAS_ELA: Record<VetoEla, string[]> = {
  "doce-enjoativo": ["Oriental Baunilha", "Floral Doce"],
  "floral-velho": ["Floral Rosa", "Floral"],
  "masculino-pesado": ["Oriental Oud", "Amadeirado", "Oriental Especiado"],
  "sintetico-barato": [],
};

export function calcularPerfilEla(respostas: RespostaEla[]): PerfilEla {
  const scores: Record<DimensaoEla, number> = {
    fresco: 0,
    envolvente: 0,
    floral: 0,
    gourmand: 0,
    frutal: 0,
    oriental: 0,
    rosa: 0,
    intensa: 0,
  };
  let faixaPreco: FaixaPrecoEla | null = null;
  let veto: VetoEla | null = null;
  let projecaoPref: "skin" | "media" | "alta" | null = null;
  const familiaBoosts: string[] = [];
  let jaAmou: string | null = null;

  for (const r of respostas) {
    if (r.scores) {
      for (const [dim, pts] of Object.entries(r.scores)) {
        scores[dim as DimensaoEla] += pts ?? 0;
      }
    }
    if (r.faixaPreco) faixaPreco = r.faixaPreco;
    if (r.veto !== undefined) veto = r.veto;
    if (r.projecao) projecaoPref = r.projecao;
    if (r.familiaBoost) familiaBoosts.push(...r.familiaBoost);
    if (
      [
        "la-vie-est-belle",
        "good-girl",
        "libre-idole",
        "black-opium",
        "coco-mademoiselle",
        "nao-conheco",
      ].includes(r.key)
    ) {
      jaAmou = r.key;
    }
  }

  const sorted = (Object.entries(scores) as [DimensaoEla, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([d]) => d);

  const top = sorted.slice(0, 3);
  const primary = top[0];
  const { titulo, descricao } = TITULO_POR_DIMENSAO_ELA[primary];

  return {
    top,
    scores,
    faixaPreco,
    veto,
    projecaoPref,
    familiaBoosts,
    jaAmou,
    tituloPerfil: titulo,
    descricao,
  };
}

/* ---------------- Recomendação ---------------- */

function justificativaParaEla(
  perfume: Perfume,
  perfil: PerfilEla,
  matchedDims: DimensaoEla[],
  familiaBoosted: boolean,
): string {
  const partes: string[] = [];

  if (familiaBoosted && perfil.jaAmou) {
    const refMap: Record<string, string> = {
      "la-vie-est-belle": "conversa com La Vie Est Belle",
      "good-girl": "DNA de Good Girl",
      "libre-idole": "linha Libre/Idôle",
      "black-opium": "fundo de Black Opium",
      "coco-mademoiselle": "Coco-like",
      "nao-conheco": "fora do óbvio",
    };
    partes.push(refMap[perfil.jaAmou]);
  }

  if (matchedDims.length > 0) {
    const dimLabel: Record<DimensaoEla, string> = {
      fresco: "frescor",
      envolvente: "envolvência",
      floral: "floral elegante",
      gourmand: "tom gourmand",
      frutal: "frutado",
      oriental: "oriental",
      rosa: "rosa árabe",
      intensa: "projeção alta",
    };
    const dims = matchedDims.slice(0, 2).map((d) => dimLabel[d]).join(" + ");
    partes.push(dims);
  }

  if (
    perfil.projecaoPref === "alta" &&
    perfume.fixacao &&
    /1[0-9]|^[8-9]/.test(perfume.fixacao)
  ) {
    partes.push("fixação que dura a noite");
  }

  if (partes.length === 0) {
    return `Combina com ${perfume.familia ?? "seu perfil"}.`;
  }
  return partes.join(" · ");
}

export function recomendacoesParaEla(perfil: PerfilEla): RecomendacoesEla {
  const proibidas = perfil.veto
    ? VETO_FAMILIAS_PROIBIDAS_ELA[perfil.veto]
    : [];

  // Só considera SKUs femininos ou unissex (não masculinos puros)
  const pool = CATALOGO.filter((p) => {
    const g = p.genero ?? "masculino";
    return g === "feminino" || g === "unissex";
  }).filter((p) => !proibidas.includes(p.familia ?? ""));

  const ranqueados = pool
    .map((perfume) => {
      let score = 0;
      const matchedDims: DimensaoEla[] = [];

      for (const dim of perfil.top) {
        if (DIMENSAO_FAMILIAS_ELA[dim].includes(perfume.familia ?? "")) {
          const weight = perfil.top[0] === dim ? 3 : perfil.top[1] === dim ? 2 : 1;
          score += weight;
          matchedDims.push(dim);
        }
      }

      const familiaBoosted = perfil.familiaBoosts.includes(
        perfume.familia ?? "",
      );
      if (familiaBoosted) score += 2;

      if (perfil.faixaPreco && perfume.precoVenda) {
        const [min, max] = PRECO_RANGE_ELA[perfil.faixaPreco];
        if (perfume.precoVenda >= min && perfume.precoVenda <= max) score += 1;
      }

      const porque = justificativaParaEla(
        perfume,
        perfil,
        matchedDims,
        familiaBoosted,
      );

      return { perfume, score, matchedDims, familiaBoosted, porque };
    })
    .sort((a, b) => b.score - a.score);

  const maxScore = ranqueados[0]?.score ?? 1;

  const conforto: RecomendacaoPerfumeEla[] = ranqueados.slice(0, 3).map((r) => ({
    perfume: r.perfume,
    score: r.score,
    afinidade: Math.round((r.score / maxScore) * 100),
    porque: r.porque,
    tipo: "conforto" as const,
  }));

  // "Pra arriscar" — primeiro fora dos top 3 com score decente
  const ousadiaRaw = ranqueados.slice(3, 8).find((r) => r.score >= maxScore * 0.5);
  const ousadia: RecomendacaoPerfumeEla | null = ousadiaRaw
    ? {
        perfume: ousadiaRaw.perfume,
        score: ousadiaRaw.score,
        afinidade: Math.round((ousadiaRaw.score / maxScore) * 100),
        porque: ousadiaRaw.porque,
        tipo: "ousadia" as const,
      }
    : null;

  return { conforto, ousadia };
}
