import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Curadorias temáticas — agrupam perfumes do catálogo por contexto de uso.
 * Cada curadoria tem um filtro dinâmico que consulta o CATALOGO — novos SKUs
 * entram automaticamente nas curadorias quando a família/ocasião bate.
 */

export type Curadoria = {
  id: string;                  // slug da URL
  titulo: string;
  subtitulo: string;           // eyebrow
  descricaoHome: string;       // texto curto na seção da home
  descricaoPage: string;       // texto longo na página individual
  gradient: string;            // gradient do hero do card
  filter: (p: Perfume) => boolean;
  order?: (a: Perfume, b: Perfume) => number;
};

export const CURADORIAS: Curadoria[] = [
  {
    id: "primeiros-perfumes",
    titulo: "Primeiros Perfumes",
    subtitulo: "Pra começar certo",
    descricaoHome:
      "Fragrâncias de entrada — acessíveis, versáteis, agradam fácil. Se essa é sua primeira compra consciente, começa por aqui.",
    descricaoPage:
      "Cinco perfumes para quem está começando. Preço acessível, projeção alta, versatilidade pra dia ou noite — escolhas que agradam fácil sem parecer genéricas.",
    gradient:
      "linear-gradient(135deg, #1a1510 0%, #3d3322 50%, #c89b6a 100%)",
    filter: (p) =>
      p.precoVenda !== null &&
      p.precoVenda <= 170 &&
      (p.projecao === "alta" || p.projecao === "moderada-alta") &&
      p.ocasioes.some((o) =>
        ["versátil", "dia", "noite", "todas as estações"].includes(
          o.toLowerCase()
        )
      ),
    order: (a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0),
  },
  {
    id: "para-trabalho",
    titulo: "Pra Trabalho",
    subtitulo: "Cheire bem sem chamar atenção",
    descricaoHome:
      "Projeção moderada, DNA limpo, nada que briga com o ambiente. Fragrâncias que te posicionam sem atrapalhar a reunião.",
    descricaoPage:
      "Escritório, reunião de cliente, apresentação. Projeção moderada, paleta fresca ou aromática. Ninguém vai pedir pra trocar — e alguém vai perguntar o que você está usando.",
    gradient:
      "linear-gradient(135deg, #0f1a25 0%, #1e3447 50%, #6b8a9c 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["trabalho", "dia", "versátil"].includes(o.toLowerCase())
      ) &&
      (p.projecao === "moderada" ||
        p.projecao === "moderada-alta" ||
        p.projecao === "discreta"),
  },
  {
    id: "aromas-de-inverno",
    titulo: "Aromas de Inverno",
    subtitulo: "Pra quando o frio pede mais",
    descricaoHome:
      "Orientais densos, gourmands profundos, amadeirados quentes. O inverno é a estação pra qual os perfumes árabes foram feitos.",
    descricaoPage:
      "Frio pede fragrância encorpada. Orientais, gourmands, amadeirados especiados — perfumes de DNA árabe clássico que a pele esquenta e libera em ondas quentes.",
    gradient:
      "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c4518 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["inverno", "outono"].includes(o.toLowerCase())
      ),
  },
  {
    id: "encontro",
    titulo: "Encontro",
    subtitulo: "Pra quando importa",
    descricaoHome:
      "Magnetismo em frasco — doces masculinos, amadeirados intensos, orientais que ficam na memória. Perfumes feitos pra primeira impressão virar lembrança.",
    descricaoPage:
      "Jantar, primeiro encontro, evento onde você quer ser lembrado. Curadoria de fragrâncias com performance alta, DNA sedutor, e aquela qualidade de 'o que é esse cheiro?'.",
    gradient:
      "linear-gradient(135deg, #2e0a10 0%, #4a1a1f 50%, #c89b3c 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["encontro", "encontros românticos", "noite"].includes(
          o.toLowerCase()
        )
      ) &&
      (p.projecao === "alta" ||
        p.projecao === "moderada-alta" ||
        p.projecao === "nuclear"),
  },
  {
    id: "verao-a-noite",
    titulo: "Verão à Noite",
    subtitulo: "Calor com personalidade",
    descricaoHome:
      "Frescos de verdade — que sobrevivem ao calor brasileiro sem perder a cara. Aquáticos, cítricos amadeirados, fougères modernos.",
    descricaoPage:
      "Sol-a-sol não combina com perfume pesado. Curadoria de frescos modernos: aquáticos marinhos, cítricos amadeirados, fougères que mantêm presença de dia e viram tudo à noite sem virar caricatura.",
    gradient:
      "linear-gradient(135deg, #0a1a20 0%, #1a3340 50%, #6b9b8c 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["verão", "primavera", "praia"].includes(o.toLowerCase())
      ),
  },
];

export function getCuradoria(id: string): Curadoria | undefined {
  return CURADORIAS.find((c) => c.id === id);
}

export function perfumesDa(curadoria: Curadoria): Perfume[] {
  const results = CATALOGO.filter(curadoria.filter);
  if (curadoria.order) results.sort(curadoria.order);
  return results;
}

export function countOf(curadoria: Curadoria): number {
  return CATALOGO.filter(curadoria.filter).length;
}
