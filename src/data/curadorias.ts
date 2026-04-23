import { CATALOGO, type Perfume } from "@/data/catalogo";

/**
 * Curadorias temáticas — agrupam perfumes do catálogo por intenção de compra.
 *
 * Princípio de vendas: cada curadoria RESPONDE A UMA PERGUNTA que o cliente
 * já tem na cabeça antes de chegar. Três removem objeção (iniciante, preço,
 * fidelidade), três atendem intenção explícita (trabalho, noite, inverno).
 *
 * Cada curadoria tem filtro dinâmico — novos SKUs entram automaticamente.
 */

export type Curadoria = {
  id: string;                  // slug URL
  titulo: string;
  subtitulo: string;           // eyebrow
  descricaoHome: string;       // texto curto no card da home
  descricaoPage: string;       // texto longo na página individual
  /** Foto de capa em /public/curadorias/{id}.png */
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
      "Fragrâncias de entrada — acessíveis, versáteis, agradam fácil. Se essa é sua primeira compra consciente, a gente começa por aqui com você.",
    descricaoPage:
      "Cinco perfumes para quem está entrando no universo árabe agora. Preço que cabe na primeira compra, projeção alta o suficiente pra você notar a diferença do mercado designer, versatilidade pra usar no dia ou na noite. Escolhas que agradam fácil sem parecer genéricas.",
    foto: "/curadorias/comecar-certo.png",
    gradient:
      "linear-gradient(135deg, #1a1510 0%, #3d3322 50%, #c89b6a 100%)",
    filter: (p) =>
      p.precoVenda !== null &&
      p.precoVenda <= 180 &&
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
    subtitulo: "Mesmo DNA, fração do preço",
    descricaoHome:
      "Perfumes árabes com 85% ou mais de fidelidade em relação ao designer original. Economia real, líquido igual, sem pagar pela campanha de celebridade.",
    descricaoPage:
      "Você já conhece Sauvage, Aventus, Bleu de Chanel — e quer saber qual clone árabe vale de verdade. Filtramos aqui só os SKUs com fidelidade declarada de 85% ou mais em relação ao designer original. Performance equivalente (ou superior), por um quarto do preço. Transparência em número, não em promessa de marketing.",
    foto: "/curadorias/clones-imbativeis.png",
    gradient:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #c89b3c 100%)",
    filter: (p) => {
      if (!p.cloneFidelidade) return false;
      // Extrai número (%) — aceita formatos "85%", "85-90%", "70-80%", "90-95%"
      const match = p.cloneFidelidade.match(/(\d+)/g);
      if (!match) return false;
      // Pega o menor número pra ser conservador
      const menor = Math.min(...match.map(Number));
      return menor >= 85;
    },
    order: (a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0),
  },
  {
    id: "sob-150",
    titulo: "Sob R$ 150",
    subtitulo: "Ótimos sem pesar no bolso",
    descricaoHome:
      "Toda a curadoria por até cento e cinquenta reais. Entrada acessível pro cara que quer começar bem sem comprometer o mês.",
    descricaoPage:
      "Curadoria completa de tudo que custa até R$ 150 no catálogo. Projeção, qualidade e DNA olfativo premium sem ultrapassar o orçamento. Ideal pra primeira compra, pra montar coleção sem gastar R$ 250 por frasco, ou pra testar um perfil olfativo novo sem medo.",
    foto: "/curadorias/sob-150.png",
    gradient:
      "linear-gradient(135deg, #1a0e06 0%, #3d2210 50%, #c89b6a 100%)",
    filter: (p) => p.precoVenda !== null && p.precoVenda <= 150,
    order: (a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0),
  },
  {
    id: "horario-comercial",
    titulo: "Horário Comercial",
    subtitulo: "Elegância que não briga com o ambiente",
    descricaoHome:
      "Projeção moderada, DNA limpo, nada que domine uma reunião. Fragrâncias que te posicionam sem atrapalhar a conversa.",
    descricaoPage:
      "Escritório, reunião de cliente, apresentação, almoço de negócios. Projeção moderada (ninguém vai pedir pra trocar), paleta aromática ou amadeirada fresca (combina com ambiente fechado), DNA versátil (você sai dali pro happy hour sem precisar trocar). O perfume que alguém elogia em tom baixo depois que todo mundo saiu.",
    foto: "/curadorias/horario-comercial.png",
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
    id: "noite-que-nao-esquece",
    titulo: "Noite que não Esquece",
    subtitulo: "Encontro, festa, evento marcante",
    descricaoHome:
      "Magnetismo em frasco — doces masculinos, amadeirados intensos, orientais que ficam na memória. Fragrâncias feitas pra primeira impressão virar lembrança.",
    descricaoPage:
      "Jantar que importa, primeiro encontro, festa onde você quer ser lembrado, evento de gala. Curadoria de fragrâncias com performance alta, DNA sedutor ou sofisticado, e aquela qualidade de 'o que é esse cheiro?' — a pergunta que deixa a noite memorável. Use com moderação: 2 borrifadas, não 6.",
    foto: "/curadorias/noite-que-nao-esquece.png",
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
    id: "aromas-de-inverno",
    titulo: "Aromas de Inverno",
    subtitulo: "Quando o frio pede mais",
    descricaoHome:
      "Orientais densos, gourmands profundos, amadeirados quentes. O inverno é a estação pra qual os perfumes árabes foram feitos.",
    descricaoPage:
      "Frio pede fragrância encorpada. Orientais, gourmands, amadeirados especiados — perfumes de DNA árabe clássico que a pele esquenta e libera em ondas quentes. A estação em que o perfume árabe brilha mais que qualquer designer europeu — porque concentração maior + frio = rastro que dura o dia inteiro.",
    foto: "/curadorias/aromas-de-inverno.png",
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
