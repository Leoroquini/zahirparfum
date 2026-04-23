/**
 * CATÁLOGO ZAHIR PARFUMS
 * Fonte: informações novas/catalogo-zahir.md
 * Atualizar aqui quando novos SKUs forem adicionados.
 *
 * Perfumes 19 (Vulcan Feu) e 20 (Ghost Spectre) têm dados incompletos —
 * preencher marca/família/notas após pesquisa.
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
    projecao: "alta",
    fixacao: "6-8h",
    precoMercado: 251.10,
    precoVenda: 190.00,
    ocasioes: ["noite", "encontro", "inverno"],
    notas: {
      topo: ["bergamota", "maçã", "limão", "abacaxi", "groselha preta"],
      coracao: ["rosa", "jasmim", "bétula"],
      fundo: ["baunilha", "âmbar", "musk", "patchouli"],
    },
    destaque: "mais-pedido",
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
    precoMercado: 300.00,
    precoVenda: 230.00,
    ocasioes: ["dia", "trabalho", "todas as estações"],
    notas: {
      topo: ["toranja", "limão", "menta", "pimenta rosa", "coentro"],
      coracao: ["gengibre", "melão", "jasmim", "noz-moscada"],
      fundo: ["incenso", "cedro", "âmbar", "sândalo", "patchouli", "ládano"],
    },
  },
  {
    id: "asad-preto",
    numero: 3,
    nome: "Asad Preto",
    nomeCompleto: "Asad Preto EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Âmbar Oriental",
    cloneDe: ["Dior Sauvage Elixir"],
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 196.08,
    precoVenda: 135.00,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["pimenta preta", "tabaco", "abacaxi"],
      coracao: ["patchouli", "café", "íris"],
      fundo: ["baunilha", "âmbar", "madeira seca", "benjoim", "ládano"],
    },
  },
  {
    id: "asad-marrom-bourbon",
    numero: 4,
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
    precoVenda: 170.00,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: [],
      coracao: ["cacau", "davana", "noz-moscada"],
      fundo: ["baunilha bourbon", "vetiver", "âmbar"],
    },
  },
  {
    id: "khamrah-qahwa-marrom",
    numero: 5,
    nome: "Khamrah Qahwa Marrom",
    nomeCompleto: "Khamrah Qahwa Marrom EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Gourmand",
    cloneDe: ["Angel's Share by Kilian"],
    cloneTipo: "DNA próprio, não clone direto",
    projecao: "alta",
    fixacao: "10-14h",
    precoMercado: 257.99,
    precoVenda: 145.00,
    ocasioes: ["noite", "outono", "inverno", "encontros românticos"],
    notas: {
      topo: ["canela", "cardamomo", "gengibre"],
      coracao: ["praliné", "frutas cristalizadas", "flores brancas"],
      fundo: ["baunilha", "café", "tonka", "benjoim", "musk"],
    },
    destaque: "curadoria",
  },
  {
    id: "khamrah-preto-teriaq",
    numero: 6,
    nome: "Khamrah Preto",
    nomeCompleto: "Khamrah Teriaq Intense EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Angel's Share by Kilian", "Side Effect Initio"],
    projecao: "alta",
    fixacao: null,
    precoMercado: 232.32,
    precoVenda: 170.00,
    ocasioes: ["noite", "inverno", "ocasiões especiais"],
    notas: {
      topo: ["açafrão", "bergamota"],
      coracao: ["licor de ameixa", "canela"],
      fundo: ["âmbar", "tonka", "benjoim"],
    },
    perfumista: "Quentin Bisch",
    destaque: "novidade",
  },
  {
    id: "al-noble-sabaen",
    numero: 7,
    nome: "Al Noble Sabaen",
    nomeCompleto: "Al Noble Sabaen EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Initio Oud for Greatness"],
    cloneTipo: "DNA próximo",
    projecao: "moderada-alta",
    fixacao: "6-8h",
    precoMercado: 180.70,
    precoVenda: 150.00,
    ocasioes: ["dia", "trabalho", "primavera"],
    notas: {
      topo: ["bergamota", "pimenta preta", "gengibre", "toranja"],
      coracao: ["heliotropo", "jasmim", "caramelo"],
      fundo: ["musk", "cypriol", "caxemira", "âmbar", "madeira de guaiac"],
    },
  },
  {
    id: "al-noble-wazeer",
    numero: 8,
    nome: "Al Noble Wazeer",
    nomeCompleto: "Al Noble Wazeer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Especiado",
    cloneDe: null,
    cloneTipo: "DNA próprio amadeirado/defumado",
    projecao: "moderada",
    fixacao: "6-8h",
    precoMercado: 161.10,
    precoVenda: 180.00,
    ocasioes: ["noite", "outono", "inverno", "eventos formais"],
    notas: {
      topo: ["conhaque", "açafrão", "noz-moscada", "maçã"],
      coracao: ["cedro", "sândalo", "whisky", "carvalho"],
      fundo: ["mirra", "ambroxan", "baunilha", "musk"],
    },
  },
  {
    id: "al-noble-ameer",
    numero: 9,
    nome: "Al Noble Ameer",
    nomeCompleto: "Al Noble Ameer EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Oud",
    cloneDe: ["Rosendo Mateu", "Tom Ford Oud"],
    cloneTipo: "DNA próximo",
    projecao: "alta",
    fixacao: "8-10h+",
    precoMercado: 135.38,
    precoVenda: 160.00,
    ocasioes: ["noite", "inverno", "uso masculino marcante"],
    notas: {
      topo: ["maçã", "pimenta rosa", "alecrim"],
      coracao: ["cravo", "notas florais"],
      fundo: ["oud", "patchouli", "ládano", "cipreste", "vetiver"],
    },
  },
  {
    id: "asad-zanzibar-azul",
    numero: 10,
    nome: "Asad Zanzibar Azul",
    nomeCompleto: "Asad Zanzibar Azul EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Amadeirado Aquático",
    cloneDe: ["Dior Sauvage EDT"],
    cloneTipo: "DNA aquático — referência",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: null,
    precoVenda: 115.00,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["bergamota", "limão", "pimenta"],
      coracao: [],
      fundo: ["âmbar", "musk", "madeiras"],
    },
  },
  {
    id: "asad-elixir",
    numero: 11,
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
    precoMercado: 245.00,
    precoVenda: 220.00,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: ["pimenta rosa", "açafrão", "toranja"],
      coracao: ["tabaco", "baunilha", "cedro"],
      fundo: ["âmbar claro", "incenso", "patchouli", "cashmeran"],
    },
  },
  {
    id: "club-de-nuit-sillage",
    numero: 12,
    nome: "Club de Nuit Sillage",
    nomeCompleto: "Club de Nuit Sillage EDP 105ml",
    marca: "Armaf",
    volume: "105ml",
    concentracao: "EDP",
    familia: "Amadeirado Aromático",
    cloneDe: ["Creed Aventus"],
    cloneTipo: "versão mais amadeirada/defumada",
    projecao: "alta",
    fixacao: null,
    precoMercado: 280.00,
    precoVenda: 210.00,
    ocasioes: ["noite", "inverno"],
    notas: {
      topo: ["bergamota", "abacaxi", "limão"],
      coracao: ["rosa", "jasmim", "bétula defumada"],
      fundo: ["âmbar", "musk", "patchouli", "baunilha"],
    },
  },
  {
    id: "fakhar-preto",
    numero: 13,
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
    precoMercado: 220.00,
    precoVenda: 160.00,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: ["maçã", "bergamota", "gengibre"],
      coracao: ["lavanda", "sálvia", "zimbro", "gerânio"],
      fundo: ["tonka", "amberwood", "cedro", "vetiver"],
    },
  },
  {
    id: "fakhar-gold-extrait",
    numero: 14,
    nome: "Fakhar Gold Extrait",
    nomeCompleto: "Fakhar Gold Extrait 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "Extrait",
    familia: "Floral Doce",
    cloneDe: ["Paco Rabanne 1 Million Parfum"],
    cloneFidelidade: "85-90%",
    projecao: "moderada-alta",
    fixacao: "8-10h",
    precoMercado: 141.34,
    precoVenda: 160.00,
    ocasioes: [],
    notas: {
      topo: ["toranja", "cardamomo", "pimenta rosa"],
      coracao: ["tuberosa", "notas solares", "artemisia"],
      fundo: ["cashmeran", "âmbar", "ládano", "couro"],
    },
  },
  {
    id: "the-kingdom-man",
    numero: 15,
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
    precoVenda: 190.00,
    ocasioes: ["noite", "outono", "inverno", "eventos"],
    notas: {
      topo: ["lavanda", "menta", "sálvia"],
      coracao: ["baunilha", "tabaco", "flor de laranjeira"],
      fundo: ["tonka", "benjoim", "ládano"],
    },
  },
  {
    id: "his-confession",
    numero: 16,
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
    precoMercado: 250.00,
    precoVenda: 180.00,
    ocasioes: ["dia", "noite", "versátil", "3 estações"],
    notas: {
      topo: ["lavanda", "canela", "tangerina"],
      coracao: ["íris", "benzoim", "cipreste", "mahonial"],
      fundo: ["baunilha", "tonka", "âmbar", "incenso", "cedro", "patchouli"],
    },
  },
  {
    id: "lattafa-pisa",
    numero: 17,
    nome: "Lattafa Pisa",
    nomeCompleto: "Lattafa Pisa EDP 100ml",
    marca: "Lattafa Pride",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Frutado Cítrico",
    cloneDe: ["LV Afternoon Swim", "Bvlgari Tygar"],
    cloneTipo: "DNA próximo",
    projecao: "moderada-alta",
    fixacao: "7-9h",
    precoMercado: 289.00,
    precoVenda: 230.00,
    ocasioes: ["dia", "primavera", "verão", "casual", "esportivo"],
    notas: {
      topo: ["tangerina", "limão", "bergamota"],
      coracao: ["cedro"],
      fundo: ["sândalo", "âmbar"],
    },
  },
  {
    id: "9pm-masculino",
    numero: 18,
    nome: "9PM Masculino",
    nomeCompleto: "9PM Masculino EDP 100ml",
    marca: "Afnan",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Baunilha",
    cloneDe: ["JPG Ultra Male"],
    cloneFidelidade: "90-95%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 255.36,
    precoVenda: 175.00,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: ["maçã", "canela", "lavanda", "bergamota"],
      coracao: ["flor de laranjeira", "muguet"],
      fundo: ["baunilha", "tonka", "âmbar", "patchouli"],
    },
  },
  {
    id: "vulcan-feu",
    numero: 19,
    nome: "Vulcan Feu",
    nomeCompleto: "Vulcan Feu EDP 100ml (Unissex)",
    marca: null,
    volume: "100ml",
    concentracao: "EDP",
    familia: null,
    cloneDe: null,
    projecao: null,
    fixacao: null,
    precoMercado: 314.37,
    precoVenda: 245.00,
    ocasioes: [],
    notas: { topo: [], coracao: [], fundo: [] },
    genero: "unissex",
    status: "dados pendentes — consultar Fragrantica",
  },
  {
    id: "ghost-spectre",
    numero: 20,
    nome: "Ghost Spectre",
    nomeCompleto: "Ghost Spectre EDP 80ml",
    marca: null,
    volume: "80ml",
    concentracao: "EDP",
    familia: null,
    cloneDe: null,
    projecao: null,
    fixacao: null,
    precoMercado: 290.00,
    precoVenda: 235.00,
    ocasioes: [],
    notas: { topo: [], coracao: [], fundo: [] },
    status: "dados pendentes — consultar Fragrantica",
  },
  {
    id: "atlas-extrait",
    numero: 21,
    nome: "Atlas Extrait",
    nomeCompleto: "Atlas Extrait 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "Extrait",
    familia: "Aquático Marinho",
    cloneDe: ["Orto Parisi Megamare"],
    cloneFidelidade: "60-70%",
    projecao: "nuclear",
    projecaoObs: "máx. 2 borrifadas",
    fixacao: "10h+",
    precoMercado: 269.10,
    precoVenda: 240.00,
    ocasioes: ["primavera", "verão", "praia", "casual"],
    notas: {
      topo: ["notas marinhas", "sal", "limão"],
      coracao: ["davana", "íris"],
      fundo: ["ambergris", "oakmoss", "sândalo"],
    },
  },
  {
    id: "liquid-brun",
    numero: 22,
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
    precoMercado: 309.00,
    precoVenda: 230.00,
    ocasioes: ["noite", "outono", "inverno"],
    ocasioesObs: "intenso, usar com moderação",
    notas: {
      topo: ["canela", "flor de laranjeira", "cardamomo", "bergamota"],
      coracao: ["baunilha bourbon", "elemi"],
      fundo: ["praliné", "ambroxan", "musk", "madeira de guaiac"],
    },
  },
  {
    id: "azure-aoud",
    numero: 23,
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
    precoMercado: 280.00,
    precoVenda: 200.00,
    ocasioes: ["noite", "outono", "inverno", "eventos especiais"],
    notas: {
      topo: ["maracujá", "notas frutadas", "rosa", "açafrão"],
      coracao: ["oud", "benzoim", "patchouli"],
      fundo: ["couro", "âmbar", "cedro", "sândalo", "baunilha", "ládano"],
    },
  },
  {
    id: "salvo",
    numero: 24,
    nome: "Salvo",
    nomeCompleto: "Salvo Eau de Parfum 100ml",
    marca: "Maison Alhambra",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Fougère",
    cloneDe: ["Dior Sauvage EDT"],
    cloneFidelidade: "90%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 184.04,
    precoVenda: 130.00,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota"],
      coracao: ["pimenta de Sichuan", "lavanda", "anis estrelado", "noz-moscada"],
      fundo: ["ambroxan", "baunilha"],
    },
    destaque: "mais-pedido",
  },
  {
    id: "salvo-elixir",
    numero: 25,
    nome: "Salvo Elixir",
    nomeCompleto: "Salvo Elixir 60ml",
    marca: "Maison Alhambra",
    volume: "60ml",
    concentracao: "Elixir",
    familia: "Oriental Fougère",
    cloneDe: ["Dior Sauvage Elixir"],
    cloneFidelidade: "80-90%",
    projecao: "moderada-alta",
    fixacao: "6-8h",
    precoMercado: 160.00,
    precoVenda: 115.00,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: ["toranja", "cardamomo", "canela", "noz-moscada"],
      coracao: ["baunilha", "lavanda"],
      fundo: ["âmbar", "vetiver", "alcaçuz", "patchouli"],
    },
  },
  {
    id: "salvo-intense",
    numero: 26,
    nome: "Salvo Intense",
    nomeCompleto: "Salvo Intense 100ml",
    marca: "Maison Alhambra",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Aromático Fougère",
    cloneDe: ["Dior Sauvage EDP"],
    cloneFidelidade: "90%",
    projecao: "alta",
    fixacao: "8-10h",
    precoMercado: 184.04,
    precoVenda: 120.00,
    ocasioes: ["dia", "noite", "outono", "inverno"],
    notas: {
      topo: ["bergamota"],
      coracao: ["lavanda", "pimenta de Sichuan", "anis estrelado", "noz-moscada"],
      fundo: ["ambroxan", "baunilha"],
    },
  },
  {
    id: "hawas-elixir",
    numero: 27,
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
    precoMercado: 350.00,
    precoVenda: 240.00,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: ["menta", "bergamota"],
      coracao: ["lavanda", "chocolate escuro"],
      fundo: ["baunilha", "tonka", "musk branco"],
    },
  },
  {
    id: "hawas-black",
    numero: 28,
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
    precoMercado: 267.00,
    precoVenda: 210.00,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: ["bergamota", "abacaxi", "toranja"],
      coracao: ["patchouli", "cedro", "jasmim"],
      fundo: ["oakmoss", "notas amadeiradas", "âmbar"],
    },
  },
];

/* ---------------- Valores derivados (single source of truth) ---------------- */

/** Lista única de famílias olfativas presentes no catálogo */
export const FAMILIAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.familia).filter((f): f is string => !!f))
).sort();

/** Lista única de marcas */
export const MARCAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.marca).filter((m): m is string => !!m))
).sort();

/** Lista única de ocasiões usadas (útil pra filtros) */
export const OCASIOES: string[] = Array.from(
  new Set(CATALOGO.flatMap((p) => p.ocasioes))
).sort();

/** Todos os perfumes designer referenciados como "clone de" */
export const REFERENCIAS_DESIGNER: string[] = Array.from(
  new Set(CATALOGO.flatMap((p) => p.cloneDe ?? []))
).sort();

/* ---------------- Helpers de consulta ---------------- */

export function getBySlug(slug: string): Perfume | undefined {
  return CATALOGO.find((p) => p.id === slug);
}

export function getByFamilia(familia: string): Perfume[] {
  return CATALOGO.filter(
    (p) => p.familia?.toLowerCase().includes(familia.toLowerCase())
  );
}

export function getByMarca(marca: string): Perfume[] {
  return CATALOGO.filter((p) => p.marca === marca);
}

export function getByOcasiao(ocasiao: string): Perfume[] {
  return CATALOGO.filter((p) =>
    p.ocasioes.some((o) => o.toLowerCase() === ocasiao.toLowerCase())
  );
}

export function getPrimeirosPerfumes(limit = 5): Perfume[] {
  // Curadoria "primeiros perfumes": entrada com preço acessível + projeção alta + versatilidade
  return CATALOGO.filter(
    (p) =>
      p.precoVenda !== null &&
      p.precoVenda <= 160 &&
      (p.projecao === "alta" || p.projecao === "moderada-alta") &&
      p.ocasioes.some((o) => ["versátil", "dia", "noite", "todas as estações"].includes(o))
  )
    .sort((a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0))
    .slice(0, limit);
}

export function temDadosCompletos(p: Perfume): boolean {
  return (
    !!p.marca &&
    !!p.familia &&
    p.notas.topo.length + p.notas.coracao.length + p.notas.fundo.length > 0
  );
}
