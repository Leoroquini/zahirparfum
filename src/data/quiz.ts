import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Engine do Ritual, quiz olfativo (v2 — refeito com base em feedback real).
 *
 * Mudanças em relação à v1:
 * 1. Substituídas perguntas BuzzFeed-style por perguntas de curador real.
 * 2. Adicionada pergunta de referência olfativa (designer já amado).
 * 3. Adicionada pergunta de orçamento implícita.
 * 4. Adicionada pergunta de eliminação (cheiro que NÃO suporta).
 * 5. Adicionada pergunta de pele (fixação).
 * 6. Recomendação dual: "zona de conforto" + "pra arriscar".
 * 7. Cada perfume vem com justificativa explícita ("recomendado porque...").
 * 8. Score de afinidade % visível no resultado.
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

export type FaixaPreco = "ate-200" | "200-350" | "350-500" | "500-mais";

export type Veto = "doce-demais" | "oud-incenso" | "alcoolico" | "almiscarado";

export type Resposta = {
  key: string;
  label: string;
  /** Pontos por dimensão olfativa */
  scores?: Partial<Record<Dimensao, number>>;
  /** Faixa de preço escolhida (apenas pergunta de orçamento) */
  faixaPreco?: FaixaPreco;
  /** Eliminação negativa (apenas pergunta de veto) */
  veto?: Veto | null;
  /** Famílias diretamente boostadas (apenas pergunta de "já amei") */
  familiaBoost?: string[];
  /** Preferência por fixação alta (apenas pergunta de pele) */
  fixacaoAlta?: boolean;
};

export type Pergunta = {
  id: string;
  eyebrow: string;
  pergunta: string;
  hint?: string;
  respostas: Resposta[];
  ambiente?: string;
};

export const PERGUNTAS: Pergunta[] = [
  {
    id: "ja-amei",
    eyebrow: "01 · Referência",
    pergunta: "Tem algum perfume que você usou e adorou?",
    hint: "Se nunca pensou nisso, escolha o que parece mais com seu estilo de hoje.",
    ambiente:
      "radial-gradient(ellipse at 70% 30%, rgba(231,182,89,0.18), transparent 60%)",
    respostas: [
      {
        key: "sauvage-bleu",
        label: "Dior Sauvage ou Bleu de Chanel",
        scores: { fresco: 2, amadeirado: 2, seco: 1 },
        familiaBoost: [
          "Aromático Frutado Cítrico",
          "Amadeirado Aromático Fresco",
          "Amadeirado Aromático",
        ],
      },
      {
        key: "creed-aventus",
        label: "Creed Aventus",
        scores: { amadeirado: 3, intenso: 1, especiado: 1 },
        familiaBoost: ["Amadeirado Aromático", "Amadeirado", "Aromático Frutado Amadeirado"],
      },
      {
        key: "1million-le-male",
        label: "1 Million ou Le Male (clássicos doces)",
        scores: { doce: 2, gourmand: 2, especiado: 1 },
        familiaBoost: ["Oriental Gourmand", "Oriental Baunilha", "Floral Doce"],
      },
      {
        key: "nenhum-acima",
        label: "Nada disso me marcou — quero algo diferente",
        scores: { intenso: 2, especiado: 2, amadeirado: 1 },
        familiaBoost: [
          "Oriental Especiado",
          "Oriental Oud",
          "Amadeirado Especiado",
          "Oriental Amadeirado",
        ],
      },
    ],
  },
  {
    id: "hora",
    eyebrow: "02 · Quando você usa",
    pergunta: "Quando você quer que esse perfume mais funcione?",
    hint: "A maioria das pessoas usa o mesmo perfume em vários momentos. Pensa no principal.",
    ambiente:
      "radial-gradient(ellipse at 30% 40%, rgba(200,155,60,0.2), transparent 60%)",
    respostas: [
      {
        key: "trabalho",
        label: "Trabalho, dia inteiro, sem incomodar ninguém",
        scores: { fresco: 3, seco: 2, aquatico: 1 },
      },
      {
        key: "noite-encontros",
        label: "Encontros à noite, jantar, eventos",
        scores: { intenso: 3, amadeirado: 2, especiado: 1 },
      },
      {
        key: "casual-fim-de-semana",
        label: "Final de semana casual, café, passeio",
        scores: { fresco: 2, amadeirado: 2, doce: 1 },
      },
      {
        key: "ocasiao-especial",
        label: "Ocasiões especiais — quando quero virar atenção",
        scores: { intenso: 3, gourmand: 2, doce: 1 },
      },
    ],
  },
  {
    id: "intensidade",
    eyebrow: "03 · Assinatura",
    pergunta: "Você prefere que seu perfume…",
    hint: "Não tem certo ou errado, é sobre o efeito que você quer causar.",
    ambiente:
      "radial-gradient(ellipse at 50% 50%, rgba(231,182,89,0.18), transparent 55%)",
    respostas: [
      {
        key: "discreto",
        label: "Fique perto da pele, só quem te abraça sente",
        scores: { fresco: 2, seco: 2, aquatico: 1 },
      },
      {
        key: "presente",
        label: "Crie uma aura no raio de 1 metro — moderada",
        scores: { amadeirado: 2, doce: 1, especiado: 1 },
      },
      {
        key: "marcante",
        label: "Entre na sala antes de você",
        scores: { intenso: 3, amadeirado: 1, gourmand: 1 },
      },
      {
        key: "nuclear",
        label: "Quero que perguntem o nome",
        scores: { intenso: 3, gourmand: 2, especiado: 2 },
      },
    ],
  },
  {
    id: "veto",
    eyebrow: "04 · O que evitar",
    pergunta: "Tem algum tipo de cheiro que você NÃO suporta?",
    hint: "Filtra o que vou recomendar pra você. Pode escolher 'nenhum desses' se não tem rejeição.",
    ambiente:
      "radial-gradient(ellipse at 60% 70%, rgba(122,45,50,0.22), transparent 60%)",
    respostas: [
      {
        key: "doce-demais",
        label: "Doce demais (baunilha pesada, chocolate, açúcar queimado)",
        veto: "doce-demais",
      },
      {
        key: "oud-incenso",
        label: "Oud, incenso e madeiras muito densas",
        veto: "oud-incenso",
      },
      {
        key: "alcoolico",
        label: "Alcoólico/cítrico cortante (genérico de farmácia)",
        veto: "alcoolico",
      },
      {
        key: "nenhum-veto",
        label: "Nenhum desses — sou aberto",
        veto: null,
      },
    ],
  },
  {
    id: "pele",
    eyebrow: "05 · Pele",
    pergunta: "Como perfume costuma se comportar em você?",
    hint: "Tem gente cuja pele segura perfume horas — outras 'comem' rápido. Calibra o que indicar.",
    ambiente:
      "radial-gradient(ellipse at 20% 80%, rgba(200,155,60,0.16), transparent 55%)",
    respostas: [
      {
        key: "come-tudo",
        label: "Some em poucas horas, sempre tenho que reaplicar",
        fixacaoAlta: true,
        scores: { intenso: 1 },
      },
      {
        key: "moderado",
        label: "Dura uma jornada de trabalho, suficiente",
        fixacaoAlta: false,
      },
      {
        key: "longa",
        label: "Dura o dia inteiro, sinto até no dia seguinte na roupa",
        fixacaoAlta: false,
        scores: { fresco: 1 },
      },
      {
        key: "nao-sei",
        label: "Nunca prestei atenção",
        fixacaoAlta: false,
      },
    ],
  },
  {
    id: "orcamento",
    eyebrow: "06 · Como você compra",
    pergunta: "Como você costuma pensar na compra de perfume?",
    hint: "Não pergunto preço direto — pergunto o jeito.",
    ambiente:
      "radial-gradient(ellipse at 80% 20%, rgba(122,45,50,0.25), transparent 60%)",
    respostas: [
      {
        key: "experimentar",
        label: "Tô descobrindo agora — quero gastar pouco e testar",
        faixaPreco: "ate-200",
      },
      {
        key: "rotacao",
        label: "Já tenho 2-3 perfumes — quero adicionar com critério",
        faixaPreco: "200-350",
      },
      {
        key: "colecao",
        label: "Sou colecionador, busco fragrância marcante",
        faixaPreco: "350-500",
      },
      {
        key: "premium",
        label: "Quero o que melhor representa qualidade árabe",
        faixaPreco: "500-mais",
      },
    ],
  },
];

/* ---------------- Scoring engine ---------------- */

export type Perfil = {
  top: Dimensao[];
  scores: Record<Dimensao, number>;
  faixaPreco: FaixaPreco | null;
  veto: Veto | null;
  fixacaoAlta: boolean;
  familiaBoosts: string[];
  jaAmou: string | null; // key de "ja-amei"
  tituloPerfil: string;
  descricao: string;
};

export type RecomendacaoPerfume = {
  perfume: Perfume;
  /** Score interno bruto */
  score: number;
  /** Afinidade normalizada 0-100 (display) */
  afinidade: number;
  /** Justificativa textual ("recomendado porque...") */
  porque: string;
  /** "conforto" | "ousadia" */
  tipo: "conforto" | "ousadia";
};

export type Recomendacoes = {
  conforto: RecomendacaoPerfume[];
  ousadia: RecomendacaoPerfume | null;
};

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

const TITULO_POR_DIMENSAO: Record<
  Dimensao,
  { titulo: string; descricao: string }
> = {
  fresco: {
    titulo: "O Fresco Urbano",
    descricao:
      "Você prefere perfumes que respiram leveza e movimento, cítricos que acordam, aquáticos que refrescam, aromáticos que nunca pesam.",
  },
  intenso: {
    titulo: "O Noturno Árabe",
    descricao:
      "Você é feito pra perfume que entra na sala antes de você, orientais densos, madeiras profundas, projeção que marca presença.",
  },
  doce: {
    titulo: "O Doce Masculino",
    descricao:
      "Você tem pele pra gourmands, baunilha, café, praliné, âmbar. Perfume que abraça e fica na memória de quem passa.",
  },
  seco: {
    titulo: "O Clássico Seco",
    descricao:
      "Você gosta da classe sem grito, fougères, amadeirados austeros, aromáticos especiados. Elegância que não precisa performar.",
  },
  amadeirado: {
    titulo: "O Madeira Moderno",
    descricao:
      "Sândalo, cedro, vetiver, cashmeran, suas madeiras são a assinatura. Perfume de homem que conversa devagar e com segurança.",
  },
  gourmand: {
    titulo: "O Gourmand Profundo",
    descricao:
      "Tabaco, chocolate amargo, café, baunilha escura, gourmands masculinos que flertam com a sobremesa sem virar doce barato.",
  },
  aquatico: {
    titulo: "O Aquático Contemporâneo",
    descricao:
      "Você busca a sensação de sal, brisa, pele limpa, perfumes que lembram o melhor tipo de verão, mesmo no meio do ano.",
  },
  especiado: {
    titulo: "O Especiado Árabe",
    descricao:
      "Açafrão, cardamomo, canela, pimenta, especiarias que vêm do mundo árabe pra traduzir calor e mistério no seu perfume.",
  },
};

const PRECO_RANGE: Record<FaixaPreco, [number, number]> = {
  "ate-200": [0, 200],
  "200-350": [180, 380],
  "350-500": [330, 530],
  "500-mais": [450, 9999],
};

/** Famílias que cada veto rejeita */
const VETO_FAMILIAS_PROIBIDAS: Record<Veto, string[]> = {
  "doce-demais": ["Oriental Gourmand", "Oriental Baunilha", "Floral Doce"],
  "oud-incenso": ["Oriental Oud", "Oriental Especiado"],
  alcoolico: ["Aromático Frutado Cítrico", "Aquático Marinho"],
  almiscarado: [],
};

export function calcularPerfil(respostas: Resposta[]): Perfil {
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
  let faixaPreco: FaixaPreco | null = null;
  let veto: Veto | null = null;
  let fixacaoAlta = false;
  const familiaBoosts: string[] = [];
  let jaAmou: string | null = null;

  for (const r of respostas) {
    if (r.scores) {
      for (const [dim, pts] of Object.entries(r.scores)) {
        scores[dim as Dimensao] += pts ?? 0;
      }
    }
    if (r.faixaPreco) faixaPreco = r.faixaPreco;
    if (r.veto !== undefined) veto = r.veto;
    if (r.fixacaoAlta) fixacaoAlta = true;
    if (r.familiaBoost) familiaBoosts.push(...r.familiaBoost);
    if (
      ["sauvage-bleu", "creed-aventus", "1million-le-male", "nenhum-acima"].includes(
        r.key
      )
    ) {
      jaAmou = r.key;
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
    faixaPreco,
    veto,
    fixacaoAlta,
    familiaBoosts,
    jaAmou,
    tituloPerfil: titulo,
    descricao,
  };
}

/* ---------------- Recomendação ---------------- */

function justificativaPara(
  perfume: Perfume,
  perfil: Perfil,
  matchedDims: Dimensao[],
  familiaBoosted: boolean
): string {
  const partes: string[] = [];

  if (familiaBoosted && perfil.jaAmou) {
    const refMap: Record<string, string> = {
      "sauvage-bleu": "casa com Sauvage/Bleu",
      "creed-aventus": "linha Aventus-like",
      "1million-le-male": "DNA dos clássicos doces",
      "nenhum-acima": "fora do óbvio",
    };
    partes.push(refMap[perfil.jaAmou]);
  }

  if (matchedDims.length > 0) {
    const dimLabel: Record<Dimensao, string> = {
      fresco: "frescor",
      intenso: "intensidade",
      doce: "doçura",
      seco: "secura elegante",
      amadeirado: "madeiras",
      gourmand: "tom gourmand",
      aquatico: "ar aquático",
      especiado: "especiarias",
    };
    const dims = matchedDims.slice(0, 2).map((d) => dimLabel[d]).join(" + ");
    partes.push(dims);
  }

  if (perfil.fixacaoAlta && perfume.fixacao && /1[0-9]|^[8-9]/.test(perfume.fixacao)) {
    partes.push("fixação alta pra sua pele");
  }

  if (partes.length === 0) {
    return `Combina com ${perfume.familia ?? "seu perfil"}.`;
  }
  return partes.join(" · ");
}

export function recomendacoesPara(perfil: Perfil): Recomendacoes {
  const proibidas = perfil.veto
    ? VETO_FAMILIAS_PROIBIDAS[perfil.veto]
    : [];
  const [precoMin, precoMax] = perfil.faixaPreco
    ? PRECO_RANGE[perfil.faixaPreco]
    : [0, 9999];

  type Scored = {
    perfume: Perfume;
    score: number;
    matchedDims: Dimensao[];
    familiaBoosted: boolean;
    forcaPreco: number;
  };

  const scored: Scored[] = CATALOGO.filter(
    (p) => p.familia && p.precoVenda !== null
  )
    .filter((p) => !proibidas.includes(p.familia ?? ""))
    .map((p) => {
      let s = 0;
      const matchedDims: Dimensao[] = [];

      // Score por dimensões top
      perfil.top.forEach((dim, rank) => {
        if (DIMENSAO_FAMILIAS[dim].includes(p.familia ?? "")) {
          s += (3 - rank) * 10;
          matchedDims.push(dim);
        }
      });

      // Boost se família foi explicitamente referenciada na pergunta "já-amei"
      const familiaBoosted = perfil.familiaBoosts.includes(p.familia ?? "");
      if (familiaBoosted) s += 15;

      // Bonus se preço dentro da faixa
      const preco = p.precoVenda ?? 0;
      let forcaPreco = 0;
      if (preco >= precoMin && preco <= precoMax) {
        forcaPreco = 12;
        s += forcaPreco;
      } else {
        // Penalidade leve se fora da faixa, escala com distância
        const dist = preco < precoMin ? precoMin - preco : preco - precoMax;
        s -= Math.min(15, dist / 25);
      }

      // Bonus se pele come perfume e fixação alta
      if (
        perfil.fixacaoAlta &&
        p.fixacao &&
        /1[0-9]|^[8-9]/.test(p.fixacao)
      ) {
        s += 8;
      }

      return { perfume: p, score: s, matchedDims, familiaBoosted, forcaPreco };
    })
    .filter((s) => s.score > 0);

  if (scored.length === 0) {
    return { conforto: [], ousadia: null };
  }

  scored.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.1) return b.score - a.score;
    return (a.perfume.precoVenda ?? 0) - (b.perfume.precoVenda ?? 0);
  });

  const maxScore = scored[0]?.score ?? 1;

  // Conforto: top 3 do score, evitando duplicar família
  const conforto: RecomendacaoPerfume[] = [];
  const familiasVistas = new Set<string>();
  for (const s of scored) {
    if (conforto.length >= 3) break;
    const fam = s.perfume.familia ?? "";
    if (familiasVistas.has(fam)) continue;
    familiasVistas.add(fam);
    conforto.push({
      perfume: s.perfume,
      score: s.score,
      afinidade: Math.round(Math.min(99, (s.score / maxScore) * 100)),
      porque: justificativaPara(
        s.perfume,
        perfil,
        s.matchedDims,
        s.familiaBoosted
      ),
      tipo: "conforto",
    });
  }

  // Se não conseguiu 3 únicos por família, completa com qualquer um
  if (conforto.length < 3) {
    const usados = new Set(conforto.map((c) => c.perfume.id));
    for (const s of scored) {
      if (conforto.length >= 3) break;
      if (usados.has(s.perfume.id)) continue;
      conforto.push({
        perfume: s.perfume,
        score: s.score,
        afinidade: Math.round(Math.min(99, (s.score / maxScore) * 100)),
        porque: justificativaPara(
          s.perfume,
          perfil,
          s.matchedDims,
          s.familiaBoosted
        ),
        tipo: "conforto",
      });
    }
  }

  // Ousadia: top 1 perfume FORA das famílias do conforto, mas ainda válido
  const familiasConforto = new Set(
    conforto.map((c) => c.perfume.familia).filter((f): f is string => !!f)
  );
  const candidatosOusadia = scored.filter(
    (s) => !familiasConforto.has(s.perfume.familia ?? "")
  );
  let ousadia: RecomendacaoPerfume | null = null;
  if (candidatosOusadia.length > 0) {
    const c = candidatosOusadia[0];
    ousadia = {
      perfume: c.perfume,
      score: c.score,
      afinidade: Math.round(Math.min(99, (c.score / maxScore) * 100)),
      porque:
        "Fora da sua zona, mas com conexão suficiente pra surpreender — pra abrir o repertório.",
      tipo: "ousadia",
    };
  }

  return { conforto, ousadia };
}

/* ---------------- Compat layer (mantém perfumesPara antigo funcionando) ---------------- */

/** @deprecated use recomendacoesPara */
export function perfumesPara(perfil: Perfil, limit = 3): Perfume[] {
  return recomendacoesPara(perfil)
    .conforto.slice(0, limit)
    .map((r) => r.perfume);
}
