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
    projecao: "alta",
    fixacao: "6-8h",
    precoMercado: 251.1,
    precoVenda: 190,
    ocasioes: ["noite", "encontro", "inverno"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
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
    precoVenda: 230,
    ocasioes: ["dia", "trabalho", "todas as estações"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 135,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 170,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 145,
    ocasioes: ["noite", "outono", "inverno", "encontros românticos"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "khamrah-preto-teriaq-intense",
    numero: 6,
    nome: "Khamrah Preto (Teriaq Intense)",
    nomeCompleto: "Khamrah Preto (Teriaq Intense) EDP 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "EDP",
    familia: "Oriental Especiado",
    cloneDe: ["Angel's Share by Kilian", "Side Effect Initio"],
    projecao: "alta",
    fixacao: null,
    precoMercado: 232.32,
    precoVenda: 170,
    ocasioes: ["noite", "inverno", "ocasiões especiais"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    },
    perfumista: "Quentin Bisch"
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
    precoMercado: 180.7,
    precoVenda: 150,
    ocasioes: ["dia", "trabalho", "primavera"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 161.1,
    precoVenda: 180,
    ocasioes: ["noite", "outono", "inverno", "eventos formais"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 160,
    ocasioes: ["noite", "inverno", "uso masculino marcante"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 115,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 245,
    precoVenda: 220,
    ocasioes: ["noite", "inverno", "eventos especiais"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 280,
    precoVenda: 210,
    ocasioes: ["noite", "inverno"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 220,
    precoVenda: 160,
    ocasioes: ["dia", "trabalho", "primavera", "verão"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "fakhar-gold-extrait",
    numero: 14,
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
    precoMercado: 141.34,
    precoVenda: 160,
    ocasioes: [],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 190,
    ocasioes: ["noite", "outono", "inverno", "eventos"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 250,
    precoVenda: 180,
    ocasioes: ["dia", "noite", "versátil", "3 estações"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 289,
    precoVenda: 230,
    ocasioes: ["dia", "primavera", "verão", "casual", "esportivo"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoVenda: 175,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "vulcan-feu",
    numero: 19,
    nome: "Vulcan Feu",
    nomeCompleto: "Vulcan Feu EDP 100ml",
    marca: null,
    volume: "100ml",
    concentracao: "EDP",
    familia: null,
    cloneDe: null,
    projecao: null,
    fixacao: null,
    precoMercado: 314.37,
    precoVenda: 245,
    ocasioes: [],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    },
    genero: "unissex",
    status: "dados pendentes — consultar Fragrantica"
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
    precoMercado: 290,
    precoVenda: 235,
    ocasioes: [],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    },
    status: "dados pendentes — consultar Fragrantica"
  },
  {
    id: "atlas-extrait",
    numero: 21,
    nome: "Atlas Extrait",
    nomeCompleto: "Atlas Extrait Extrait 100ml",
    marca: "Lattafa",
    volume: "100ml",
    concentracao: "Extrait",
    familia: "Aquático Marinho",
    cloneDe: ["Orto Parisi Megamare"],
    cloneFidelidade: "60-70%",
    projecao: "nuclear",
    projecaoObs: "máx. 2 borrifadas",
    fixacao: "10h+",
    precoMercado: 269.1,
    precoVenda: 240,
    ocasioes: ["primavera", "verão", "praia", "casual"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 309,
    precoVenda: 230,
    ocasioes: ["noite", "outono", "inverno"],
    ocasioesObs: "intenso, usar com moderação",
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 280,
    precoVenda: 200,
    ocasioes: ["noite", "outono", "inverno", "eventos especiais"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "salvo",
    numero: 24,
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
    precoVenda: 130,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "salvo-elixir",
    numero: 25,
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
    precoMercado: 160,
    precoVenda: 115,
    ocasioes: ["noite", "inverno", "encontro"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
  },
  {
    id: "salvo-intense",
    numero: 26,
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
    precoVenda: 120,
    ocasioes: ["dia", "noite", "outono", "inverno"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 350,
    precoVenda: 240,
    ocasioes: ["noite", "outono", "inverno", "encontro"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
    }
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
    precoMercado: 267,
    precoVenda: 210,
    ocasioes: ["dia", "noite", "versátil", "todas as estações"],
    notas: {
      topo: [],
      coracao: [],
      fundo: [],
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
      p.precoVenda <= 230 &&
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
