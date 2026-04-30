import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Notas olfativas-assinatura da ZAHIR, 4 ingredientes que definem
 * o DNA da casa: Oud, Âmbar, Orquídea Brasileira, Rosa Damascena.
 *
 * Cada nota vira uma página editorial + filtro automático que puxa
 * todos os perfumes do catálogo que contêm essa nota (match por
 * keywords que aparecem nas listas de topo/coração/fundo).
 */

export type Nota = {
  id: string;                     // slug
  nome: string;                   // "Oud"
  subtitulo: string;              // "A madeira sagrada"
  origem: string;                 // "Camboja, Índia, Emirados"
  paleta: string;                 // mood em 3–4 palavras
  foto: string;                   // /hero/note-*.png
  /** Keywords que aparecem nas notas dos perfumes do catálogo */
  matchKeywords: string[];
  /** Conteúdo editorial em seções */
  conteudo: {
    oQueE: string;
    deOndeVem: string;
    historia: string;
    perfil: string;
    comoIdentificar: string;
    curiosidade?: string;
  };
};

export const NOTAS: Nota[] = [
  {
    id: "oud",
    nome: "Oud",
    subtitulo: "A madeira sagrada",
    origem: "Camboja, Índia, Laos, Emirados",
    paleta: "Defumado · Couro · Medicinal · Úmido",
    foto: "/hero/note-oud.png",
    matchKeywords: ["oud", "agarwood", "cypriol"],
    conteudo: {
      oQueE:
        "Oud é a resina escura que se forma dentro da árvore Aquilaria quando ela é infectada por um fungo específico. Nem toda Aquilaria produz oud, só as que foram 'feridas' pela natureza. Quanto mais velha e mais densa essa resina, mais valiosa. Oud puro de qualidade alta custa mais caro que ouro por grama.",
      deOndeVem:
        "As árvores vivem em florestas tropicais do Camboja, Índia, Laos, Tailândia e Myanmar. Oud cambodiano tem aroma mais doce e amadeirado. Oud indiano (especialmente do Assam) tem caráter mais medicinal e intenso. Os Emirados cultivam em estufas controladas pra atender a demanda crescente.",
      historia:
        "Uso documentado em rituais árabes e budistas há mais de 1.300 anos. Presente no incenso queimado em mesquitas, nos óleos aplicados em hóspedes importantes, na fórmula do bakhoor (carvão aromático árabe). O Ocidente só 'descobriu' oud em perfumaria moderna nos anos 2000, Tom Ford Oud Wood (2007) foi marco. Initio, Kilian, Nishane vieram depois. As casas árabes, que já sabiam disso há séculos, passaram a exportar versões mais acessíveis e complexas.",
      perfil:
        "Na top, oud muitas vezes cheira medicinal, quase desinfetante pra quem nunca sentiu antes. No coração, desenvolve notas de couro úmido e madeira queimada. No fundo, permanece como rastro amadeirado envolvente que dura 8h+ na pele. Tanto amado quanto temido, raramente alguém sente oud pela primeira vez e fica indiferente.",
      comoIdentificar:
        "Procura por um cheiro que mistura madeira queimada + couro antigo + uma nota quase farmacêutica que permanece por horas. É denso, presente, nunca discreto. Se o perfume tem oud bem feito, você sente ele subindo da camisa mesmo 6 horas depois de aplicar.",
      curiosidade:
        "Um chip de oud puro de alta qualidade (tamanho de uma moeda) pode custar R$ 3.000 ou mais. Por isso a maioria dos perfumes usa 'oud sintético' ou mistura pequeno percentual de oud real com moléculas recriadas em laboratório.",
    },
  },
  {
    id: "ambar",
    nome: "Âmbar",
    subtitulo: "O calor que fica na pele",
    origem: "Ambroxan sintético + resinas orientais",
    paleta: "Quente · Doce · Resinoso · Envolvente",
    foto: "/hero/note-amber.png",
    matchKeywords: [
      "âmbar",
      "ambar",
      "ambroxan",
      "ambergris",
      "amberwood",
      "ládano",
      "ladano",
    ],
    conteudo: {
      oQueE:
        "O que chamamos de 'âmbar' em perfume moderno quase nunca é a pedra amarelada que você vê em joias, essa é resina fossilizada de árvores pré-históricas e praticamente não tem aroma. O 'âmbar' que você sente em um perfume é um acorde criado com benjoim, baunilha, labdanum (ládano) e moléculas sintéticas como o ambroxan, que simula o aroma do ambergris, substância preciosa da baleia-cachalote.",
      deOndeVem:
        "Benjoim vem das resinas de árvores do sudeste asiático. Labdanum vem das folhas da Cistus do Mediterrâneo. Ambroxan é sintetizado em laboratório desde 1950. Juntos, formam o 'acorde âmbar', quente, doce, resinoso, base universal em perfumaria oriental.",
      historia:
        "Usado em perfumaria árabe há mais de 2.000 anos. O ambergris foi tão valioso em certas épocas que equivalia em peso ao ouro. Hoje é proibido em muitos países, substituído por ambroxan com resultado praticamente idêntico. O 'ambarado' é talvez a categoria mais presente nos perfumes orientais modernos, 80% dos orientais masculinos têm alguma variação de âmbar no fundo.",
      perfil:
        "Doce sem ser enjoativo. Quente sem ser agressivo. Entra no fundo do perfume e funde tudo em volta, madeira, baunilha, oud, rosa, especiarias, num único acorde envolvente. É a razão pela qual perfumes árabes 'abraçam' a pele em vez de só pairar sobre ela.",
      comoIdentificar:
        "Depois de 2h no perfume, quando os cítricos sumiram e o coração se acalmou, o que sobra é o âmbar. Pele quente, cheiro adocicado que não é chocolate, não é baunilha pura, é uma mistura resinosa particular. Quando alguém te abraça e diz 'que perfume é esse?', geralmente está sentindo o âmbar.",
    },
  },
  {
    id: "orquidea-brasileira",
    nome: "Orquídea Brasileira",
    subtitulo: "A flor-símbolo que vira perfume",
    origem: "Mata Atlântica, Brasil",
    paleta: "Floral · Aquoso · Sutil · Sofisticado",
    foto: "/hero/note-orchid.png",
    matchKeywords: [
      "orquídea",
      "orquidea",
      "jasmim",
      "tuberosa",
      "heliotropo",
      "flor de laranjeira",
      "flores brancas",
      "muguet",
    ],
    conteudo: {
      oQueE:
        "A orquídea Cattleya é a flor-símbolo da perfumaria brasileira. Em perfume, a orquídea clássica tecnicamente não cheira, é uma 'flor muda'. O que os perfumistas fazem é criar um acorde que evoca o imaginário da orquídea: flores brancas delicadas (jasmim, tuberosa, muguet) misturadas com toques aquosos e ligeiramente doces que simulam a presença etérea da flor.",
      deOndeVem:
        "Cattleya é endêmica das florestas tropicais brasileiras, especialmente Mata Atlântica. Também cultivada em orquidários. Apesar de ser o ícone floral do Brasil, raramente aparece como nota declarada em perfumaria árabe tradicional, então para nós virou uma metáfora: a ponte entre tradição olfativa árabe e identidade brasileira.",
      historia:
        "A Cattleya aparece no escudo nacional e nos selos do Brasil. No universo da perfumaria, é usada como inspiração desde o início do século XX, Dior Poison (1985) tem acorde de orquídea. Na ZAHIR, ela representa o que buscamos na curadoria: perfumes árabes que dialogam com a sensibilidade brasileira sem imitar perfume europeu ou asiático.",
      perfil:
        "Floral branco, delicado, com traço aquoso, quase como flor e água. Se mistura bem com jasmim (que é mais indólico) e tuberosa (que é mais opulenta). Dá a sensação de flor respirando, não flor esmagada.",
      comoIdentificar:
        "Perfumes que trazem orquídea ou acordes de flores brancas evocam um frescor floral etéreo, diferente da rosa (mais profunda) e do jasmim puro (mais intenso). É uma camada de leveza em cima de perfumes que poderiam ficar muito pesados.",
    },
  },
  {
    id: "rosa-damascena",
    nome: "Rosa Damascena",
    subtitulo: "A rosa mais cara do mundo",
    origem: "Bulgária, Turquia, Irã",
    paleta: "Floral · Mel · Frutado · Picante",
    foto: "/hero/note-rose.png",
    matchKeywords: ["rosa", "damascena", "rose"],
    conteudo: {
      oQueE:
        "Rosa × damascena (rosa damascena, rosa de Damasco) é a espécie de rosa cultivada exclusivamente para produção de óleo essencial. Leva 3–4 toneladas de pétalas pra produzir 1 litro de óleo puro, por isso é uma das notas mais caras da perfumaria mundial. É outra rosa: não cheira como rosa de jardim, é mais profunda, mais complexa.",
      deOndeVem:
        "A Bulgária é a maior produtora mundial (o chamado 'Vale das Rosas' bávaro), seguida por Turquia (Isparta) e Irã. As rosas são colhidas antes do sol nascer, nas primeiras 6 semanas de maio, pra preservar o óleo máximo.",
      historia:
        "Usada em perfumaria árabe desde antes do ano 1000. Aparece em fórmulas clássicas como o gulab (água de rosas) e no attar de rosas, óleo concentrado usado em rituais e presentes. Avicena (séc. XI) foi pioneiro na técnica de destilação que produz o óleo essencial que usamos até hoje. O Ocidente adotou rosa damascena em perfumaria de luxo desde o século XIX.",
      perfil:
        "Floral profundo, com nuances de mel, um toque ligeiramente frutado (às vezes lembra lichia), e um final picante, quase como pimenta rosa. Nunca doce como rosa de sabonete. É a rosa 'séria' da perfumaria.",
      comoIdentificar:
        "Aquele perfume em que você sente uma rosa que parece 'cara', densidade floral diferente, com camadas que vão mudando ao longo do dia. Muitos orientais árabes masculinos usam rosa damascena misturada com oud, âmbar ou couro, ela tira o lado 'feminino' e amplifica a opulência.",
      curiosidade:
        "O óleo puro de rosa damascena custa cerca de R$ 40.000 por litro. Um perfume que declara 'rosa damascena absolue' na fórmula geralmente usa 0,5–2% do produto final, mas mesmo essa quantidade pequena muda drasticamente o caráter.",
    },
  },
];

export function getNota(id: string): Nota | undefined {
  return NOTAS.find((n) => n.id === id);
}

/**
 * Retorna todos os perfumes do catálogo que contêm pelo menos
 * uma das keywords da nota em qualquer camada (topo/coração/fundo).
 */
export function perfumesDa(nota: Nota): Perfume[] {
  return CATALOGO.filter((p) => {
    const todasNotas = [
      ...p.notas.topo,
      ...p.notas.coracao,
      ...p.notas.fundo,
    ].map((n) => n.toLowerCase());

    return nota.matchKeywords.some((kw) =>
      todasNotas.some((n) => n.includes(kw.toLowerCase()))
    );
  });
}
