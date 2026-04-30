/**
 * CATÁLOGO ZAHIR PARFUMS
 * Fonte: informações novas/catalogo-zahir.md (30/04/2026)
 * Preços de venda com margem bruta ~30% (custo ÷ 0.7, arredondado pra múltiplo de 5).
 * `precoMercado` = referência do designer original / custo de boutique no Brasil.
 */

export type Projecao =
  | "discreta"
  | "moderada"
  | "moderada-alta"
  | "alta"
  | "nuclear";

export type Concentracao = "EDT" | "EDP" | "Extrait" | "Elixir";

export type Perfume = {
  id: string;                    // slug estável, usado em URLs
  numero: number;                // 1..28 (posição no catálogo inicial)
  nome: string;                  // "Club de Nuit Intense"
  nomeCompleto: string;          // "Club de Nuit Intense EDT 105ml"
  marca: string | null;          // "Armaf", "Lattafa", etc — null quando a verificar
  marcaGrupo?: string;           // "Fragrance World" para French Avenue
  volume: string;                // "100ml", "60ml", "105ml"
  concentracao: Concentracao;
  familia: string | null;        // "Amadeirado Aromático" etc
  cloneDe: string[] | null;      // ["Creed Aventus"] — null quando DNA próprio
  cloneFidelidade?: string;      // "85-90%" — só quando explícito
  cloneTipo?: string;            // "DNA próprio", "referência", etc
  projecao: Projecao | null;
  projecaoObs?: string;          // "máx. 2 borrifadas"
  fixacao: string | null;        // "8-10h", "10h+", null
  fixacaoObs?: string;           // "melhora após maceração"
  precoMercado: number | null;   // referência do mercado brasileiro
  precoVenda: number | null;     // preço da Zahir
  ocasioes: string[];            // [noite, inverno, encontro, trabalho, etc]
  ocasioesObs?: string;
  notas: {
    topo: string[];
    coracao: string[];
    fundo: string[];
  };
  perfumista?: string;           // "Quentin Bisch" etc
  genero?: "masculino" | "unissex" | "feminino";  // default: masculino
  status?: string;               // "dados pendentes" para SKUs incompletos
  /** Badge de destaque visível no card (curadoria editorial) */
  destaque?: "mais-pedido" | "novidade" | "ultimas-unidades" | "curadoria";
  /** Se decant deste SKU está disponível pra reserva (default true; marcar false quando não rola) */
  decantDisponivel?: boolean;
  /**
   * Arquétipo de persona — frase editorial curta que humaniza o perfume.
   * Padrão: "Usado pelo cara que…" + comportamento concreto.
   * Foca em cena/atitude, não em adjetivo vago.
   */
  arquetipo?: string;
};

export const CATALOGO: Perfume[] = [
  {
    id: "club-de-nuit-intense",
    numero: 1,
    nome: "Club de Nuit Intense",
    nomeCompleto: "Club de Nuit Intense EDT 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDT",
    familia: "Amadeirado Aromático",
    cloneDe: ["Creed Aventus"],
    cloneFidelidade: "80-90%",
    projecao: "alta",
    fixacao: "6-8h",
    precoMercado: 251.1,
    precoVenda: 290,
    ocasioes: ["noite", "encontro", "inverno", "eventos"],
    notas: {
      topo: ["bergamota", "maçã", "limão", "abacaxi", "groselha preta"],
      coracao: ["rosa", "jasmim", "bétula"],
      fundo: ["baunilha", "âmbar", "musk", "patchouli"],
    }
  },
  {
    id: "club-de-nuit-iconic-blue",
    numero: 2,
    nome: "Club de Nuit Iconic Blue",
    nomeCompleto: "Club de Nuit Iconic Blue EDP 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDP",
    familia: "Amadeirado Aromático Fresco",
    cloneDe: ["Bleu de Chanel EDT"],
    cloneFidelidade: "70-80%",
    projecao: "moderada",
    fixacao: "6-8h",
    precoMercado: 300,
    precoVenda: 350,
    ocasioes: ["dia", "trabalho", "todas as estações"],
    notas: {
      topo: ["toranja", "limão", "menta", "pimenta rosa", "coentro"],
      coracao: ["gengibre", "melão", "jasmim", "noz-moscada"],
      fundo: ["incenso", "cedro", "âmbar", "sândalo", "patchouli", "ládano"],
    }
  },
  {
    id: "club-de-nuit-sillage",
    numero: 3,
    nome: "Club de Nuit Sillage",
    nomeCompleto: "Club de Nuit Sillage EDP 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDP",
    familia: "Amadeirado Aromático",
    cloneDe: ["Creed Aventus"],
    cloneTipo: "versão mais amadeirada e defumada",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 280,
    precoVenda: 350,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["bergamota", "abacaxi", "limão"],
      coracao: ["rosa", "jasmim", "bétula defumada"],
      fundo: ["âmbar", "musk", "patchouli", "baunilha"],
    }
  },
  {
    id: "club-de-nuit-urban-elixir",
    numero: 4,
    nome: "Club de Nuit Urban Elixir",
    nomeCompleto: "Club de Nuit Urban Elixir EDP 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Versace Eros Flame"],
    cloneFidelidade: "80%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 270,
    precoVenda: 290,
    ocasioes: ["noite", "inverno", "encontro", "eventos especiais"],
    notas: {
      topo: ["pimenta rosa", "tangerina", "açafrão"],
      coracao: ["pimenta preta", "alecrim", "gerânio"],
      fundo: ["tonka", "baunilha", "benjoim", "patchouli"],
    }
  },
  {
    id: "club-de-nuit-milestone",
    numero: 5,
    nome: "Club de Nuit Milestone",
    nomeCompleto: "Club de Nuit Milestone EDP 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDP",
    familia: "Aromático Frutado",
    cloneDe: ["Parfums de Marly Pegasus"],
    cloneFidelidade: "80-85%",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 290,
    precoVenda: 320,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota", "amêndoa amarga"],
      coracao: ["heliotropo", "lavanda"],
      fundo: ["baunilha", "sândalo", "musk", "cumarina"],
    }
  },
  {
    id: "asad-preto",
    numero: 6,
    nome: "Asad Preto",
    nomeCompleto: "Asad Preto EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Âmbar Oriental",
    cloneDe: ["Dior Sauvage Elixir"],
    cloneFidelidade: "85%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 196.08,
    precoVenda: 250,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["pimenta preta", "tabaco", "abacaxi"],
      coracao: ["patchouli", "café", "íris"],
      fundo: ["baunilha", "âmbar", "madeira seca", "benjoim", "ládano"],
    }
  },
  {
    id: "asad-marrom-bourbon",
    numero: 7,
    nome: "Asad Marrom Bourbon",
    nomeCompleto: "Asad Marrom Bourbon EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Boss Bottled Absolu"],
    cloneTipo: "referência",
    projecao: "moderada-alta",
    fixacao: "10-12h",
    precoMercado: 223.51,
    precoVenda: 280,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: [],
      coracao: ["cacau", "davana", "noz-moscada"],
      fundo: ["baunilha bourbon", "vetiver", "âmbar"],
    }
  },
  {
    id: "khamrah-qahwa",
    numero: 8,
    nome: "Khamrah Qahwa",
    nomeCompleto: "Khamrah Qahwa EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Gourmand",
    cloneDe: ["Angel's Share by Kilian"],
    cloneTipo: "DNA próprio, não clone direto",
    projecao: "alta",
    fixacao: "10-14h",
    precoMercado: 257.99,
    precoVenda: 250,
    ocasioes: ["noite", "outono", "inverno", "encontros românticos"],
    notas: {
      topo: ["canela", "cardamomo", "gengibre"],
      coracao: ["praliné", "frutas cristalizadas", "flores brancas"],
      fundo: ["baunilha", "café", "tonka", "benjoim", "musk"],
    }
  },
  {
    id: "khamrah-preto-teriaq",
    numero: 9,
    nome: "Khamrah Preto (Teriaq)",
    nomeCompleto: "Khamrah Preto (Teriaq) EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Angel's Share by Kilian", "Side Effect Initio"],
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 232.32,
    precoVenda: 250,
    ocasioes: ["noite", "inverno", "ocasiões especiais"],
    notas: {
      topo: ["açafrão", "bergamota"],
      coracao: ["licor de ameixa", "canela"],
      fundo: ["âmbar", "tonka", "benjoim"],
    },
    perfumista: "Quentin Bisch"
  },
  {
    id: "al-noble-safeer",
    numero: 10,
    nome: "Al Noble Safeer",
    nomeCompleto: "Al Noble Safeer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Initio Oud for Greatness"],
    cloneTipo: "DNA próximo",
    projecao: "moderada-alta",
    fixacao: "6-8h",
    precoMercado: 180.7,
    precoVenda: 230,
    ocasioes: ["dia", "trabalho", "primavera"],
    notas: {
      topo: ["bergamota", "pimenta preta", "gengibre", "toranja"],
      coracao: ["heliotropo", "jasmim", "caramelo"],
      fundo: ["musk", "cypriol", "caxemira", "âmbar", "madeira de guaiac"],
    }
  },
  {
    id: "al-noble-wazeer",
    numero: 11,
    nome: "Al Noble Wazeer",
    nomeCompleto: "Al Noble Wazeer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Especiado",
    cloneDe: null,
    cloneTipo: "DNA próprio amadeirado e defumado",
    projecao: "moderada",
    fixacao: "6-8h",
    precoMercado: 200,
    precoVenda: 250,
    ocasioes: ["noite", "outono", "inverno", "eventos formais"],
    notas: {
      topo: ["conhaque", "açafrão", "noz-moscada", "maçã"],
      coracao: ["cedro", "sândalo", "whisky", "carvalho"],
      fundo: ["mirra", "ambroxan", "baunilha", "musk"],
    }
  },
  {
    id: "al-noble-ameer",
    numero: 12,
    nome: "Al Noble Ameer",
    nomeCompleto: "Al Noble Ameer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Oud",
    cloneDe: ["Rosendo Mateu", "Tom Ford Oud"],
    cloneTipo: "DNA próximo",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 200,
    precoVenda: 230,
    ocasioes: ["noite", "inverno", "uso masculino marcante"],
    notas: {
      topo: ["maçã", "pimenta rosa", "alecrim"],
      coracao: ["cravo", "notas florais"],
      fundo: ["oud", "patchouli", "ládano", "cipreste", "vetiver"],
    }
  },
  {
    id: "asad-zanzibar-azul",
    numero: 13,
    nome: "Asad Zanzibar Azul",
    nomeCompleto: "Asad Zanzibar Azul EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Aquático",
    cloneDe: ["Dior Sauvage EDT"],
    cloneTipo: "DNA aquático com referência",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 195,
    precoVenda: 220,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["bergamota", "limão", "pimenta"],
      coracao: [],
      fundo: ["âmbar", "musk", "madeiras"],
    }
  },
  {
    id: "asad-elixir",
    numero: 14,
    nome: "Asad Elixir",
    nomeCompleto: "Asad Elixir EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Boss Bottled Absolu"],
    cloneFidelidade: "90%",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 245,
    precoVenda: 280,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["pimenta rosa", "açafrão", "toranja"],
      coracao: ["tabaco", "baunilha", "cedro"],
      fundo: ["âmbar claro", "incenso", "patchouli", "cashmeran"],
    }
  },
  {
    id: "fakhar-preto",
    numero: 15,
    nome: "Fakhar Preto",
    nomeCompleto: "Fakhar Preto EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Fougère",
    cloneDe: ["YSL Y EDP"],
    cloneFidelidade: "85-90%",
    projecao: "moderada",
    fixacao: "6-8h",
    fixacaoObs: "melhora após maceração",
    precoMercado: 220,
    precoVenda: 260,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["maçã", "bergamota", "gengibre"],
      coracao: ["lavanda", "sálvia", "zimbro", "gerânio"],
      fundo: ["tonka", "amberwood", "cedro", "vetiver"],
    }
  },
  {
    id: "fakhar-gold-extrait",
    numero: 16,
    nome: "Fakhar Gold Extrait",
    nomeCompleto: "Fakhar Gold Extrait Extrait 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "Extrait",
    familia: "Floral Doce",
    cloneDe: ["Paco Rabanne 1 Million Parfum"],
    cloneFidelidade: "85-90%",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 195,
    precoVenda: 250,
    ocasioes: ["noite", "encontro", "eventos"],
    notas: {
      topo: ["toranja", "cardamomo", "pimenta rosa"],
      coracao: ["tuberosa", "notas solares", "artemisia"],
      fundo: ["cashmeran", "âmbar", "ládano", "couro"],
    }
  },
  {
    id: "fakhar-platinum",
    numero: 17,
    nome: "Fakhar Platinum",
    nomeCompleto: "Fakhar Platinum EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Aquático",
    cloneDe: ["YSL Y Eau Fraîche"],
    cloneFidelidade: "80%",
    projecao: "moderada-alta",
    fixacao: "7-9h",
    precoMercado: 210,
    precoVenda: 270,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["bergamota", "gengibre", "maçã verde"],
      coracao: ["sálvia", "gerânio", "lavanda"],
      fundo: ["vetiver", "cedro", "ambroxan"],
    }
  },
  {
    id: "the-kingdom-man",
    numero: 18,
    nome: "The Kingdom Man",
    nomeCompleto: "The Kingdom Man EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático",
    cloneDe: ["JPG Le Male Elixir"],
    cloneFidelidade: "85-95%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 244.34,
    precoVenda: 350,
    ocasioes: ["noite", "outono", "inverno", "eventos"],
    notas: {
      topo: ["lavanda", "menta", "sálvia"],
      coracao: ["baunilha", "tabaco", "flor de laranjeira"],
      fundo: ["tonka", "benjoim", "ládano"],
    }
  },
  {
    id: "his-confession",
    numero: 19,
    nome: "His Confession",
    nomeCompleto: "His Confession EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Amadeirado",
    cloneDe: ["Givenchy Gentleman EDP"],
    cloneTipo: "DNA próximo",
    projecao: "moderada",
    fixacao: "6-8h",
    precoMercado: 250,
    precoVenda: 350,
    ocasioes: ["dia", "noite", "versátil", "3 estações"],
    notas: {
      topo: ["lavanda", "canela", "tangerina"],
      coracao: ["íris", "benzoim", "cipreste", "mahonial"],
      fundo: ["baunilha", "tonka", "âmbar", "incenso", "cedro", "patchouli"],
    }
  },
  {
    id: "maahir-black-edition",
    numero: 20,
    nome: "Maahir Black Edition",
    nomeCompleto: "Maahir Black Edition EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Especiado",
    cloneDe: ["Tom Ford Tobacco Vanille"],
    cloneFidelidade: "75-80%",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 220,
    precoVenda: 280,
    ocasioes: ["noite", "outono", "inverno", "eventos"],
    notas: {
      topo: ["especiarias", "açafrão"],
      coracao: ["tabaco", "baunilha", "frutas secas"],
      fundo: ["tonka", "cacau", "fava tonka", "madeiras"],
    }
  },
  {
    id: "khamrah",
    numero: 21,
    nome: "Khamrah",
    nomeCompleto: "Khamrah EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Gourmand",
    cloneDe: null,
    cloneTipo: "DNA próprio (referência cultural árabe — bebida de tâmaras)",
    projecao: "alta",
    fixacao: "10-12h",
    precoMercado: 215,
    precoVenda: 250,
    ocasioes: ["noite", "outono", "inverno", "encontros românticos"],
    notas: {
      topo: ["canela", "noz-moscada", "bergamota"],
      coracao: ["tâmaras", "mirra", "praliné"],
      fundo: ["baunilha", "tonka", "benjoim", "âmbar"],
    }
  },
  {
    id: "emeer",
    numero: 22,
    nome: "Emeer",
    nomeCompleto: "Emeer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Especiado",
    cloneDe: ["Penhaligon's Halfeti"],
    cloneFidelidade: "80-85%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 290,
    precoVenda: 350,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["grapefruit rosa", "açafrão"],
      coracao: ["rosa turca", "tomilho", "cravo"],
      fundo: ["oud", "mirra", "leather", "papyrus"],
    }
  },
  {
    id: "badee-al-oud-for-glory",
    numero: 23,
    nome: "Badee Al Oud For Glory",
    nomeCompleto: "Badee Al Oud For Glory EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Oud",
    cloneDe: ["Initio Oud for Greatness"],
    cloneFidelidade: "75%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 170,
    precoVenda: 200,
    ocasioes: ["noite", "inverno", "ocasiões especiais"],
    notas: {
      topo: ["açafrão", "bergamota"],
      coracao: ["oud", "jasmim"],
      fundo: ["musk", "madeiras", "âmbar"],
    }
  },
  {
    id: "qaed-al-fursan",
    numero: 24,
    nome: "Qaed Al Fursan",
    nomeCompleto: "Qaed Al Fursan EDP 90ml",
    marca: "Lattafa",
    volume: "90ml",
    concentracao: "EDP",
    familia: "Amadeirado Especiado",
    cloneDe: ["Tom Ford Ombré Leather"],
    cloneFidelidade: "70-75%",
    projecao: "moderada",
    fixacao: "6-8h",
    precoMercado: 160,
    precoVenda: 200,
    ocasioes: ["dia", "noite", "versátil"],
    notas: {
      topo: ["especiarias", "frutas"],
      coracao: ["couro", "jasmim"],
      fundo: ["musk", "sândalo", "âmbar"],
    }
  },
  {
    id: "9pm-black",
    numero: 25,
    nome: "9PM Black",
    nomeCompleto: "9PM Black EDP 100ml",
    marca: "Afnan",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Baunilha",
    cloneDe: ["JPG Ultra Male"],
    cloneFidelidade: "90-95%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 255.36,
    precoVenda: 300,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: ["maçã", "canela", "lavanda", "bergamota"],
      coracao: ["flor de laranjeira", "muguet"],
      fundo: ["baunilha", "tonka", "âmbar", "patchouli"],
    }
  },
  {
    id: "9pm-night-oud",
    numero: 26,
    nome: "9PM Night Oud",
    nomeCompleto: "9PM Night Oud EDP 100ml",
    marca: "Afnan",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Oud",
    cloneDe: null,
    cloneTipo: "DNA próprio com base em oud noturno",
    projecao: "alta",
    fixacao: "10-12h",
    precoMercado: 420,
    precoVenda: 500,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["açafrão", "especiarias"],
      coracao: ["oud", "rosa"],
      fundo: ["âmbar", "musk", "madeiras preciosas"],
    }
  },
  {
    id: "9pm-rebel",
    numero: 27,
    nome: "9PM Rebel",
    nomeCompleto: "9PM Rebel EDP 100ml",
    marca: "Afnan",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Frutado",
    cloneDe: ["Mancera Cedrat Boise"],
    cloneFidelidade: "75%",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 320,
    precoVenda: 400,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota", "gengibre", "frutas cítricas"],
      coracao: ["pimenta", "especiarias"],
      fundo: ["vetiver", "cedro", "musk", "âmbar"],
    }
  },
  {
    id: "9pm-elixir",
    numero: 28,
    nome: "9PM Elixir",
    nomeCompleto: "9PM Elixir Elixir 100ml",
    marca: "Afnan",
    volume: "100ml",
    concentracao: "Elixir",
    familia: "Oriental Gourmand",
    cloneDe: ["JPG Le Male Elixir"],
    cloneFidelidade: "85%",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 290,
    precoVenda: 350,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["menta", "lavanda"],
      coracao: ["baunilha", "fava tonka", "mel"],
      fundo: ["benjoim", "tabaco", "tonka"],
    }
  },
  {
    id: "turathi-blue",
    numero: 29,
    nome: "Turathi Blue",
    nomeCompleto: "Turathi Blue EDP 90ml",
    marca: "Afnan",
    volume: "90ml",
    concentracao: "EDP",
    familia: "Amadeirado Aquático",
    cloneDe: ["Roja Parfums Elysium"],
    cloneFidelidade: "70-75%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 295,
    precoVenda: 370,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["limão", "bergamota", "abacaxi", "pimenta rosa"],
      coracao: ["galbanum", "jasmim"],
      fundo: ["cedro", "ambroxan", "musk"],
    }
  },
  {
    id: "vulcan-feu",
    numero: 30,
    nome: "Vulcan Feu",
    nomeCompleto: "Vulcan Feu EDP 100ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Initio Side Effect"],
    cloneFidelidade: "75-80%",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 314.37,
    precoVenda: 400,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["especiarias", "açafrão"],
      coracao: ["rum", "tabaco"],
      fundo: ["baunilha", "tonka", "benjoim", "oud"],
    },
    genero: "unissex"
  },
  {
    id: "ghost-spectre",
    numero: 31,
    nome: "Ghost Spectre",
    nomeCompleto: "Ghost Spectre EDP 80ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "80ml",
    concentracao: "EDP",
    familia: "Aromático Frutado Amadeirado",
    cloneDe: ["Creed Aventus"],
    cloneFidelidade: "75-80%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 290,
    precoVenda: 370,
    ocasioes: ["noite", "encontro", "eventos"],
    notas: {
      topo: ["bergamota", "abacaxi", "maçã"],
      coracao: ["bétula", "jasmim"],
      fundo: ["musk", "oakmoss", "âmbar"],
    }
  },
  {
    id: "liquid-brun",
    numero: 32,
    nome: "Liquid Brun",
    nomeCompleto: "Liquid Brun EDP 100ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Gourmand",
    cloneDe: ["Parfums de Marly Althair"],
    cloneFidelidade: "85%",
    projecao: "alta",
    fixacao: "12h+",
    precoMercado: 360,
    precoVenda: 450,
    ocasioes: ["noite", "outono", "inverno"],
    ocasioesObs: "intenso, usar com moderação",
    notas: {
      topo: ["canela", "flor de laranjeira", "cardamomo", "bergamota"],
      coracao: ["baunilha bourbon", "elemi"],
      fundo: ["praliné", "ambroxan", "musk", "madeira de guaiac"],
    }
  },
  {
    id: "azure-aoud",
    numero: 33,
    nome: "Azure Aoud",
    nomeCompleto: "Azure Aoud EDP 100ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental",
    cloneDe: null,
    cloneTipo: "DNA próprio oriental com oud",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 280,
    precoVenda: 320,
    ocasioes: ["noite", "outono", "inverno", "eventos especiais"],
    notas: {
      topo: ["maracujá", "notas frutadas", "rosa", "açafrão"],
      coracao: ["oud", "benzoim", "patchouli"],
      fundo: ["couro", "âmbar", "cedro", "sândalo", "baunilha", "ládano"],
    }
  },
  {
    id: "royal-blend-bourbon",
    numero: 34,
    nome: "Royal Blend Bourbon",
    nomeCompleto: "Royal Blend Bourbon EDP 100ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Gourmand",
    cloneDe: ["Boss Bottled Absolu"],
    cloneFidelidade: "80%",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 320,
    precoVenda: 400,
    ocasioes: ["noite", "inverno", "eventos"],
    notas: {
      topo: ["pimenta rosa", "davana"],
      coracao: ["cacau", "tabaco"],
      fundo: ["baunilha bourbon", "vetiver", "ambroxan"],
    }
  },
  {
    id: "salvo",
    numero: 35,
    nome: "Salvo",
    nomeCompleto: "Salvo EDP 100ml",
    marca: "Maison Alhambra",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Fougère",
    cloneDe: ["Dior Sauvage EDT"],
    cloneFidelidade: "90%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 184.04,
    precoVenda: 200,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota"],
      coracao: ["pimenta de Sichuan", "lavanda", "anis estrelado", "noz-moscada"],
      fundo: ["ambroxan", "baunilha"],
    }
  },
  {
    id: "salvo-elixir",
    numero: 36,
    nome: "Salvo Elixir",
    nomeCompleto: "Salvo Elixir Elixir 60ml",
    marca: "Maison Alhambra",
    volume: "60ml",
    concentracao: "Elixir",
    familia: "Oriental Fougère",
    cloneDe: ["Dior Sauvage Elixir"],
    cloneFidelidade: "80-90%",
    projecao: "moderada-alta",
    fixacao: "6-8h",
    precoMercado: 180,
    precoVenda: 200,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["toranja", "cardamomo", "canela", "noz-moscada"],
      coracao: ["baunilha", "lavanda"],
      fundo: ["âmbar", "vetiver", "alcaçuz", "patchouli"],
    }
  },
  {
    id: "salvo-intense",
    numero: 37,
    nome: "Salvo Intense",
    nomeCompleto: "Salvo Intense EDP 100ml",
    marca: "Maison Alhambra",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Fougère",
    cloneDe: ["Dior Sauvage EDP"],
    cloneFidelidade: "90%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 184.04,
    precoVenda: 200,
    ocasioes: ["dia", "noite", "outono", "inverno"],
    notas: {
      topo: ["bergamota"],
      coracao: ["lavanda", "pimenta de Sichuan", "anis estrelado", "noz-moscada"],
      fundo: ["ambroxan", "baunilha"],
    }
  },
  {
    id: "yeah-man-parfum",
    numero: 38,
    nome: "Yeah Man Parfum",
    nomeCompleto: "Yeah Man Parfum EDP 100ml",
    marca: "French Avenue",
    marcaGrupo: "Fragrance World",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Frutado",
    cloneDe: ["YSL Y Le Parfum"],
    cloneFidelidade: "75-80%",
    projecao: "moderada-alta",
    fixacao: "8h",
    precoMercado: 200,
    precoVenda: 250,
    ocasioes: ["dia", "noite", "versátil"],
    notas: {
      topo: ["bergamota", "gengibre", "maçã verde"],
      coracao: ["sálvia", "gerânio"],
      fundo: ["tonka", "amberwood", "cedro"],
    }
  },
  {
    id: "hawas-elixir",
    numero: 39,
    nome: "Hawas Elixir",
    nomeCompleto: "Hawas Elixir EDP 100ml",
    marca: "Rasasi",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Gourmand",
    cloneDe: ["JPG Le Male Elixir"],
    cloneFidelidade: "80%",
    projecao: "alta",
    fixacao: "8-12h",
    precoMercado: 350,
    precoVenda: 380,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: ["menta", "bergamota"],
      coracao: ["lavanda", "chocolate escuro"],
      fundo: ["baunilha", "tonka", "musk branco"],
    }
  },
  {
    id: "hawas-black",
    numero: 40,
    nome: "Hawas Black",
    nomeCompleto: "Hawas Black EDP 100ml",
    marca: "Rasasi",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Frutado Amadeirado",
    cloneDe: ["Nishane Hacivat", "Creed Aventus"],
    cloneFidelidade: "85%",
    cloneTipo: "DNA",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 290,
    precoVenda: 350,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota", "abacaxi", "toranja"],
      coracao: ["patchouli", "cedro", "jasmim"],
      fundo: ["oakmoss", "notas amadeiradas", "âmbar"],
    }
  },
  {
    id: "bharara-king",
    numero: 41,
    nome: "Bharara King",
    nomeCompleto: "Bharara King EDP 100ml",
    marca: "Bharara",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: null,
    cloneTipo: "DNA próprio nicho (Bharara é casa de nicho árabe)",
    projecao: "alta",
    fixacao: "10-12h",
    precoMercado: 380,
    precoVenda: 470,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["açafrão", "especiarias"],
      coracao: ["oud", "rosa", "couro"],
      fundo: ["âmbar", "musk", "sândalo", "madeiras preciosas"],
    }
  },
  {
    id: "rayhaan-corium",
    numero: 42,
    nome: "Rayhaan Corium",
    nomeCompleto: "Rayhaan Corium EDP 100ml",
    marca: "Rayhaan",
    marcaGrupo: "Rasasi",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Couro",
    cloneDe: ["Tom Ford Tuscan Leather"],
    cloneFidelidade: "75-80%",
    projecao: "alta",
    fixacao: "10h+",
    precoMercado: 300,
    precoVenda: 350,
    ocasioes: ["noite", "outono", "inverno", "eventos"],
    notas: {
      topo: ["açafrão", "framboesa"],
      coracao: ["couro", "jasmim"],
      fundo: ["musk", "sândalo", "madeiras"],
    }
  },
  {
    id: "aether",
    numero: 43,
    nome: "Aether",
    nomeCompleto: "Aether EDP 100ml",
    marca: "Aether",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Amadeirado",
    cloneDe: null,
    cloneTipo: "DNA nicho (casa boutique de Dubai)",
    projecao: "alta",
    fixacao: "10-12h",
    precoMercado: 460,
    precoVenda: 550,
    ocasioes: ["noite", "eventos especiais", "ocasiões formais"],
    notas: {
      topo: ["bergamota", "açafrão", "pimenta rosa"],
      coracao: ["rosa", "oud", "especiarias"],
      fundo: ["âmbar", "musk", "sândalo", "madeiras preciosas"],
    }
  },
];

/** Lista única de marcas usadas (útil pra filtros) */
export const MARCAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.marca).filter(Boolean) as string[])
).sort();

/** Lista única de famílias olfativas usadas (útil pra filtros) */
export const FAMILIAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.familia).filter(Boolean) as string[])
).sort();

/** Lista única de ocasiões usadas (útil pra filtros) */
export const OCASIOES: string[] = Array.from(
  new Set(CATALOGO.flatMap((p) => p.ocasioes))
).sort();

/* ---------------- Helpers de consulta ---------------- */

export function getBySlug(slug: string): Perfume | undefined {
  return CATALOGO.find((p) => p.id === slug);
}
