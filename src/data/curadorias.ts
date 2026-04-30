import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Curadorias temáticas, agrupam perfumes do catálogo por intenção de compra.
 *
 * Princípio: cada curadoria responde a UMA pergunta que o cliente já tem na
 * cabeça antes de chegar. As 4 cobrem:
 *  - Começar Certo        — primeira compra (carteira + repertório)
 *  - Clones Imbatíveis    — referência designer com 85%+ fidelidade
 *  - Noite que não Esquece — encontro/festa/evento marcante
 *  - Frio que Pede Mais   — orientais densos pra inverno
 *
 * "Sob R$250" virou filtro de preço no catálogo. "Horário Comercial" virou
 * filtro de ocasião (dia/trabalho) no catálogo. Tirei do conjunto pra evitar
 * sobreposição com "Começar Certo" e diluição da curadoria editorial.
 *
 * Cada curadoria tem filtro dinâmico, novos SKUs entram automaticamente.
 */

export type Curadoria = {
  id: string;                  // slug URL
  titulo: string;
  subtitulo: string;           // eyebrow
  descricaoHome: string;       // texto curto no card da home
  descricaoPage: string;       // texto longo na página individual
  /** Foto de capa em /public/curadorias/{id}.webp */
  foto: string;
  /** Gradient de fallback caso foto não renderize */
  gradient: string;
  filter: (p: Perfume) => boolean;
  order?: (a: Perfume, b: Perfume) => number;
};

export const CURADORIAS: Curadoria[] = [
  {
    id: "comecar-certo",
    titulo: "Começar Certo",
    subtitulo: "Pra quem nunca comprou perfume árabe",
    descricaoHome:
      "Fragrâncias de entrada, acessíveis, versáteis, agradam fácil. Se essa é sua primeira compra consciente, a gente começa por aqui com você.",
    descricaoPage:
      "Perfumes para quem está entrando no universo árabe agora. Preço que cabe na primeira compra, projeção alta o suficiente pra você notar a diferença do mercado designer, versatilidade pra usar no dia ou na noite. Escolhas que agradam fácil sem parecer genéricas.",
    foto: "/curadorias/comecar-certo.webp",
    gradient:
      "linear-gradient(135deg, #1a1510 0%, #3d3322 50%, #c89b6a 100%)",
    filter: (p) =>
      p.precoVenda !== null &&
      p.precoVenda <= 260 &&
      (p.projecao === "alta" || p.projecao === "moderada-alta") &&
      p.ocasioes.some((o) =>
        ["versátil", "dia", "noite", "todas as estações"].includes(
          o.toLowerCase()
        )
      ),
    order: (a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0),
  },
  {
    id: "clones-imbativeis",
    titulo: "Clones Imbatíveis",
    subtitulo: "Referências olfativas com custo menor",
    descricaoHome:
      "Perfumes árabes com referência editorial alta em relação a designers conhecidos. Boa porta de entrada pra quem quer o DNA olfativo sem começar pelo preço de boutique.",
    descricaoPage:
      "Você já conhece Sauvage, Aventus, Bleu de Chanel, e quer entender quais interpretações árabes fazem sentido. Filtramos aqui SKUs com referência editorial declarada de 85% ou mais em relação ao designer original. A ideia é comparar caminho olfativo, ocasião de uso e valor percebido com transparência, sem vender número como garantia absoluta.",
    foto: "/curadorias/clones-imbativeis.webp",
    gradient:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #c89b3c 100%)",
    filter: (p) => {
      if (!p.cloneFidelidade) return false;
      // Extrai número (%), aceita formatos "85%", "85-90%", "70-80%", "90-95%"
      const match = p.cloneFidelidade.match(/(\d+)/g);
      if (!match) return false;
      // Pega o menor número pra ser conservador
      const menor = Math.min(...match.map(Number));
      return menor >= 85;
    },
    order: (a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0),
  },
  {
    id: "noite-que-nao-esquece",
    titulo: "Noite que não Esquece",
    subtitulo: "Encontro, festa, evento marcante",
    descricaoHome:
      "Magnetismo em frasco, doces masculinos, amadeirados intensos, orientais que ficam na memória. Fragrâncias feitas pra primeira impressão virar lembrança.",
    descricaoPage:
      "Jantar que importa, primeiro encontro, festa onde você quer ser lembrado, evento de gala. Curadoria de fragrâncias com performance alta, DNA sedutor ou sofisticado, e aquela qualidade de 'o que é esse cheiro?', a pergunta que deixa a noite memorável. Use com moderação: 2 borrifadas, não 6.",
    foto: "/curadorias/noite-que-nao-esquece.webp",
    gradient:
      "linear-gradient(135deg, #2e0a10 0%, #4a1a1f 50%, #c89b3c 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["encontro", "encontros românticos", "noite", "eventos"].some((m) =>
          o.toLowerCase().includes(m)
        )
      ) &&
      (p.projecao === "alta" ||
        p.projecao === "moderada-alta" ||
        p.projecao === "nuclear"),
  },
  {
    id: "frio-que-pede-mais",
    titulo: "Frio que Pede Mais",
    subtitulo: "Quando a temperatura cai, o perfume sobe",
    descricaoHome:
      "Orientais densos, gourmands profundos, amadeirados quentes. O inverno é a estação pra qual os perfumes árabes foram feitos.",
    descricaoPage:
      "Frio pede fragrância encorpada. Orientais, gourmands, amadeirados especiados, perfumes de DNA árabe clássico que a pele esquenta e libera em ondas quentes. É a estação em que notas densas, âmbar, especiarias e madeiras costumam aparecer melhor, sempre variando conforme pele, clima e quantidade aplicada.",
    foto: "/curadorias/frio-que-pede-mais.webp",
    gradient:
      "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c4518 100%)",
    filter: (p) =>
      p.ocasioes.some((o) =>
        ["inverno", "outono"].includes(o.toLowerCase())
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
