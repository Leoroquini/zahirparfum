/**
 * Glossário editorial das notas olfativas mais comuns no catálogo ZAHIR.
 * Tom: opinativo, humano, sem juridicês de perfumaria.
 *
 * Pra notas que não estão aqui, o modal mostra fallback elegante (sem
 * descrição, mas com lista de perfumes que contêm a nota).
 *
 * Chave: nome normalizado (lowercase + sem acentos). Use o helper
 * `normalizarNota()` em lib/notas-helper.ts pra comparar.
 */

export type FamiliaNota =
  | "cítrico"
  | "frutado"
  | "floral"
  | "verde"
  | "especiado"
  | "amadeirado"
  | "doce"
  | "resinoso"
  | "âmbar"
  | "couro"
  | "marinho"
  | "fumê";

export type NotaGlossario = {
  /** Nome canônico de exibição (com acentos) */
  nome: string;
  familia: FamiliaNota;
  /** 1 frase editorial, o que é, de onde vem, no tom da marca */
  descricao: string;
  /** 3 adjetivos curtos descrevendo o cheiro */
  comoCheira: string[];
};

/* Chaves normalizadas (lowercase + sem acentos). */
export const NOTAS_GLOSSARIO: Record<string, NotaGlossario> = {
  /* ---------- CÍTRICOS ---------- */
  bergamota: {
    nome: "Bergamota",
    familia: "cítrico",
    descricao:
      "Cítrico de cabeça da Calábria, acerta a porta do nariz na primeira borrifada e some rápido. Quase todo perfume começa por ela.",
    comoCheira: ["fresca", "ácida", "verde"],
  },
  limao: {
    nome: "Limão",
    familia: "cítrico",
    descricao:
      "Cítrico simples, sem nuance, limpa o paladar olfativo antes do perfume mostrar a real intenção.",
    comoCheira: ["ácido", "afiado", "limpo"],
  },
  toranja: {
    nome: "Toranja",
    familia: "cítrico",
    descricao:
      "Cítrico amargo, mais sofisticado que laranja. Dá ar de ginásio escandinavo bem ventilado.",
    comoCheira: ["amargo", "fresco", "metálico"],
  },
  mandarina: {
    nome: "Mandarina",
    familia: "cítrico",
    descricao:
      "Mais doce e arredondado que o limão, cítrico de fim de tarde, não de meio-dia escaldante.",
    comoCheira: ["doce", "redondo", "solar"],
  },
  tangerina: {
    nome: "Tangerina",
    familia: "cítrico",
    descricao:
      "Prima da mandarina, ligeiramente mais brincalhona. Dá vida pra abertura sem dominar.",
    comoCheira: ["doce", "alegre", "frutada"],
  },
  lima: {
    nome: "Lima",
    familia: "cítrico",
    descricao:
      "Verde, suculenta, levemente amarga, pra quem o limão é cru demais.",
    comoCheira: ["verde", "ácida", "fresca"],
  },

  /* ---------- FRUTADOS ---------- */
  maca: {
    nome: "Maçã",
    familia: "frutado",
    descricao:
      "Doce e crocante, em perfumaria masculina é frequente vir verde (não madura), pra dar frescor sem virar gourmand.",
    comoCheira: ["doce", "verde", "crocante"],
  },
  abacaxi: {
    nome: "Abacaxi",
    familia: "frutado",
    descricao:
      "Sintético na maioria das vezes, mas é a nota que dá o famoso 'cheiro de Aventus'. Doce, ácido, inconfundível.",
    comoCheira: ["doce", "ácido", "tropical"],
  },
  manga: {
    nome: "Manga",
    familia: "frutado",
    descricao:
      "Tropical denso, quase resinoso. Quando bem feito, lembra polpa madura no calor.",
    comoCheira: ["tropical", "denso", "doce"],
  },
  maracuja: {
    nome: "Maracujá",
    familia: "frutado",
    descricao:
      "Frutado complexo, começa azedo, termina perfumado. Boa transição pra notas florais.",
    comoCheira: ["azedo", "perfumado", "exótico"],
  },
  ruibarbo: {
    nome: "Ruibarbo",
    familia: "frutado",
    descricao:
      "Verde-frutado pouco usado, entre maçã verde e talo de aipo. Dá personalidade à abertura.",
    comoCheira: ["verde", "azedo", "vegetal"],
  },
  "groselha preta": {
    nome: "Groselha preta",
    familia: "frutado",
    descricao:
      "Também chamada de cassis, frutada-amarga com leve toque animálico. Alma do Aventus original.",
    comoCheira: ["frutada", "amarga", "ácida"],
  },
  cassis: {
    nome: "Cassis",
    familia: "frutado",
    descricao:
      "Mesmo que groselha preta, dá personalidade frutada sem cair em doçura óbvia.",
    comoCheira: ["frutado", "amargo", "ácido"],
  },
  melao: {
    nome: "Melão",
    familia: "frutado",
    descricao:
      "Aquoso e clean, frutado leve que evoca verão, piscina, toalha de praia.",
    comoCheira: ["aquoso", "leve", "fresco"],
  },
  "frutas cristalizadas": {
    nome: "Frutas cristalizadas",
    familia: "frutado",
    descricao:
      "Frutas em compota, com açúcar denso, vai bem em gourmands sérios, sem virar bala.",
    comoCheira: ["doce", "denso", "caramelizado"],
  },
  "licor de ameixa": {
    nome: "Licor de ameixa",
    familia: "frutado",
    descricao:
      "Frutado boozy, fermentado, alcoólico, escuro. Senta bem em perfume de inverno.",
    comoCheira: ["boozy", "frutado", "denso"],
  },

  /* ---------- FLORAIS ---------- */
  rosa: {
    nome: "Rosa",
    familia: "floral",
    descricao:
      "A flor mais usada em perfumaria. Pode ir de feminina e clássica até dura e amadeirada, depende da espécie e do contexto.",
    comoCheira: ["floral", "redonda", "ligeiramente doce"],
  },
  jasmim: {
    nome: "Jasmim",
    familia: "floral",
    descricao:
      "Floral noturno, levemente animálico. A flor que dá densidade onde a rosa daria leveza.",
    comoCheira: ["denso", "indólico", "branco"],
  },
  lavanda: {
    nome: "Lavanda",
    familia: "floral",
    descricao:
      "Espinha dorsal do fougère masculino. Verde, herbácea, levemente medicinal, virou padrão de 'cheiro de homem' nos últimos 100 anos.",
    comoCheira: ["herbácea", "limpa", "fresca"],
  },
  geranio: {
    nome: "Gerânio",
    familia: "floral",
    descricao:
      "Floral verde com toque de rosa, usado em masculino pra evitar o efeito 'flor demais'.",
    comoCheira: ["verde", "floral", "metálico"],
  },
  iris: {
    nome: "Íris",
    familia: "floral",
    descricao:
      "Floral em pó. A nota mais sofisticada da perfumaria, discreta, fria, vagamente mineral.",
    comoCheira: ["em pó", "fria", "discreta"],
  },
  tuberosa: {
    nome: "Tuberosa",
    familia: "floral",
    descricao:
      "Floral branco grosso, voluptuoso, narcótico. Dominante quando aparece.",
    comoCheira: ["denso", "narcótico", "carnal"],
  },
  "flor de laranjeira": {
    nome: "Flor de laranjeira",
    familia: "floral",
    descricao:
      "Floral cítrico solar, leve toque mel, sem perder ar limpo. Comum em masculinos do mediterrâneo.",
    comoCheira: ["solar", "doce", "limpa"],
  },
  violeta: {
    nome: "Violeta",
    familia: "floral",
    descricao:
      "Floral em pó com toque de doce de banana, nostálgico, retrô, levemente artificial.",
    comoCheira: ["em pó", "nostálgica", "doce"],
  },
  heliotropo: {
    nome: "Heliotropo",
    familia: "floral",
    descricao:
      "Floral com aroma de marzipã, entre amêndoa, baunilha e flor branca.",
    comoCheira: ["amendoado", "doce", "cremoso"],
  },
  lirio: {
    nome: "Lírio",
    familia: "floral",
    descricao:
      "Floral verde-frio, funeral chique. Quando bem dosado, dá elegância sem feminizar.",
    comoCheira: ["frio", "verde", "elegante"],
  },
  "flores brancas": {
    nome: "Flores brancas",
    familia: "floral",
    descricao:
      "Coquetel de jasmim, gardênia, tuberosa, densidade floral noturna.",
    comoCheira: ["denso", "noturno", "carnal"],
  },
  "notas florais": {
    nome: "Notas florais",
    familia: "floral",
    descricao:
      "Mistura genérica de flores, fabricante não declarou as específicas. Geralmente discreto, suavizando especiarias ou madeiras.",
    comoCheira: ["floral", "discreta", "leve"],
  },
  "notas solares": {
    nome: "Notas solares",
    familia: "floral",
    descricao:
      "Acordes que evocam pele bronzeada e sol nas costas, frangipani, ylang, óleo de coco.",
    comoCheira: ["solar", "tropical", "morna"],
  },

  /* ---------- ESPECIADOS ---------- */
  "pimenta rosa": {
    nome: "Pimenta rosa",
    familia: "especiado",
    descricao:
      "Especiaria leve, brilhante, abertura efervescente sem agressividade. Tornou-se padrão moderno de masculino.",
    comoCheira: ["picante", "brilhante", "leve"],
  },
  "pimenta preta": {
    nome: "Pimenta preta",
    familia: "especiado",
    descricao:
      "Mais escura e quente que a rosa, dá masculinidade direta, sem ironia.",
    comoCheira: ["picante", "quente", "seca"],
  },
  "pimenta de sichuan": {
    nome: "Pimenta de Sichuan",
    familia: "especiado",
    descricao:
      "Picância levemente entorpecente, com toque cítrico. Dá originalidade onde a pimenta preta seria óbvia.",
    comoCheira: ["picante", "cítrica", "elétrica"],
  },
  pimenta: {
    nome: "Pimenta",
    familia: "especiado",
    descricao:
      "Especiaria sem qualificação, geralmente preta ou rosa, dependendo do contexto da fórmula.",
    comoCheira: ["picante", "quente", "seca"],
  },
  cardamomo: {
    nome: "Cardamomo",
    familia: "especiado",
    descricao:
      "Especiaria árabe por excelência, fresca, levemente cítrica, mentolada. Raiz da perfumaria do oriente médio.",
    comoCheira: ["fresco", "verde", "mentolado"],
  },
  canela: {
    nome: "Canela",
    familia: "especiado",
    descricao:
      "Especiaria quente, doce-seca. Tradução olfativa de inverno e festa de família.",
    comoCheira: ["quente", "doce", "rústica"],
  },
  gengibre: {
    nome: "Gengibre",
    familia: "especiado",
    descricao:
      "Especiaria cítrica e elétrica. Dá vivacidade sem o peso da pimenta.",
    comoCheira: ["cítrico", "elétrico", "raiz"],
  },
  "noz-moscada": {
    nome: "Noz-moscada",
    familia: "especiado",
    descricao:
      "Quente, levemente narcótica, com fundo de madeira seca. Especiaria de homem maduro.",
    comoCheira: ["quente", "seca", "rústica"],
  },
  acafrao: {
    nome: "Açafrão",
    familia: "especiado",
    descricao:
      "Especiaria couro-cítrica, cara. Dá ar oriental nobre sem cair em clichê de oud.",
    comoCheira: ["couro", "cítrico", "âmbar"],
  },
  cravo: {
    nome: "Cravo",
    familia: "especiado",
    descricao:
      "Especiaria dental, quente, intensa, levemente medicinal. Dosagem certa é o segredo.",
    comoCheira: ["quente", "intenso", "medicinal"],
  },
  "anis estrelado": {
    nome: "Anis estrelado",
    familia: "especiado",
    descricao:
      "Especiaria licorosa, parecida com alcaçuz. Toque de boteco fino.",
    comoCheira: ["licoroso", "doce", "anisado"],
  },
  coentro: {
    nome: "Coentro",
    familia: "especiado",
    descricao:
      "Especiaria verde-cítrica em sementes (não folha). Fresca, herbácea, levemente picante.",
    comoCheira: ["verde", "cítrico", "fresco"],
  },

  /* ---------- VERDE / AROMÁTICO ---------- */
  alecrim: {
    nome: "Alecrim",
    familia: "verde",
    descricao:
      "Aromática mediterrânea, herbácea, levemente eucalíptica. Aviva fougères clássicos.",
    comoCheira: ["herbácea", "aromática", "mentolada"],
  },
  salvia: {
    nome: "Sálvia",
    familia: "verde",
    descricao:
      "Aromática seca, levemente canforada. Gosto de homem que faz própria barba.",
    comoCheira: ["seca", "aromática", "canforada"],
  },
  artemisia: {
    nome: "Artemisia",
    familia: "verde",
    descricao:
      "Aromática amarga, parecida com absinto. Dá camada de sofisticação a verdes.",
    comoCheira: ["amarga", "aromática", "verde"],
  },
  zimbro: {
    nome: "Zimbro",
    familia: "verde",
    descricao:
      "A baga que dá o sabor do gin. Verde, levemente picante, com fundo amadeirado.",
    comoCheira: ["herbal", "fresca", "amadeirada"],
  },
  menta: {
    nome: "Menta",
    familia: "verde",
    descricao:
      "Refrescante crua. Em perfumaria séria, vem dosada, senão vira pasta de dente.",
    comoCheira: ["fresca", "afiada", "verde"],
  },

  /* ---------- AMADEIRADOS ---------- */
  cedro: {
    nome: "Cedro",
    familia: "amadeirado",
    descricao:
      "Madeira seca, lápis recém-apontado. Cedro é a 'madeira default' da perfumaria moderna.",
    comoCheira: ["seca", "limpa", "estruturada"],
  },
  sandalo: {
    nome: "Sândalo",
    familia: "amadeirado",
    descricao:
      "Madeira cremosa, leitosa, doce, meditativa. O bom sândalo (Mysore) é caro e raro hoje.",
    comoCheira: ["cremoso", "leitoso", "quente"],
  },
  patchouli: {
    nome: "Patchouli",
    familia: "amadeirado",
    descricao:
      "Folha indiana fermentada, terra molhada após chuva. Dá densidade e fundo a quase tudo.",
    comoCheira: ["terroso", "úmido", "denso"],
  },
  vetiver: {
    nome: "Vetiver",
    familia: "amadeirado",
    descricao:
      "Raiz cortada, tipo grama queimada. Mais seco que o patchouli, masculino sem doçura.",
    comoCheira: ["seco", "terroso", "rústico"],
  },
  oud: {
    nome: "Oud",
    familia: "amadeirado",
    descricao:
      "Madeira fermentada por fungo na agar. Animálico, complexo, divisor de águas, quem ama, ama. Quem odeia, odeia.",
    comoCheira: ["animálico", "denso", "medicinal"],
  },
  betula: {
    nome: "Bétula",
    familia: "amadeirado",
    descricao:
      "Geralmente vem 'defumada', alcatrão, fumo de churrasco fino. Dá ar de couro sem ser couro.",
    comoCheira: ["defumada", "alcatroada", "couro"],
  },
  cypriol: {
    nome: "Cypriol",
    familia: "amadeirado",
    descricao:
      "Raiz indiana cyperus, fumacenta, terrosa, com toque de couro velho. Underused, especial.",
    comoCheira: ["fumê", "terrosa", "couro"],
  },
  cashmeran: {
    nome: "Cashmeran",
    familia: "amadeirado",
    descricao:
      "Molécula sintética que cheira a madeira em pó com toque de almíscar. Dá conforto e densidade moderna.",
    comoCheira: ["em pó", "almíscar", "amadeirado"],
  },
  caxemira: {
    nome: "Caxemira",
    familia: "amadeirado",
    descricao:
      "Mesmo que cashmeran, confortável, em pó, levemente animal.",
    comoCheira: ["em pó", "macia", "amadeirada"],
  },
  "madeira de guaiac": {
    nome: "Madeira de guaiac",
    familia: "amadeirado",
    descricao:
      "Madeira sul-americana, levemente fumacenta. Mais misteriosa que cedro, menos cara que sândalo.",
    comoCheira: ["fumacenta", "rústica", "quente"],
  },
  "madeiras": {
    nome: "Madeiras",
    familia: "amadeirado",
    descricao:
      "Acorde amadeirado genérico, mistura sem revelar especificações.",
    comoCheira: ["seca", "estruturada", "neutra"],
  },
  "madeira seca": {
    nome: "Madeira seca",
    familia: "amadeirado",
    descricao:
      "Acorde sem suco, sem cremosidade, madeira de móvel, lápis. Estruturante.",
    comoCheira: ["seca", "lapidada", "limpa"],
  },
  "notas amadeiradas": {
    nome: "Notas amadeiradas",
    familia: "amadeirado",
    descricao:
      "Mistura de madeiras sem detalhamento. Dá fundo seco e estruturado.",
    comoCheira: ["seca", "estruturada", "neutra"],
  },
  carvalho: {
    nome: "Carvalho",
    familia: "amadeirado",
    descricao:
      "Madeira nobre, ligeiramente acetinada, também base de barril que envelhece whisky.",
    comoCheira: ["nobre", "boozy", "estruturada"],
  },
  oakmoss: {
    nome: "Oakmoss",
    familia: "amadeirado",
    descricao:
      "Líquen de carvalho, verde, amargo, terroso. Espinha do chypre clássico.",
    comoCheira: ["verde", "úmida", "terrosa"],
  },
  cipreste: {
    nome: "Cipreste",
    familia: "amadeirado",
    descricao:
      "Conífera mediterrânea, aromática verde, levemente resinosa.",
    comoCheira: ["resinoso", "verde", "aromático"],
  },
  elemi: {
    nome: "Elemi",
    familia: "resinoso",
    descricao:
      "Resina cítrica, entre incenso e limão. Dá brilho aromático ao topo.",
    comoCheira: ["resinoso", "cítrico", "aromático"],
  },

  /* ---------- DOCES / GOURMAND ---------- */
  baunilha: {
    nome: "Baunilha",
    familia: "doce",
    descricao:
      "Vagem doce-cremosa. Em masculino bem feito, a baunilha não vira bala, vira conforto.",
    comoCheira: ["doce", "cremosa", "balsâmica"],
  },
  "baunilha bourbon": {
    nome: "Baunilha bourbon",
    familia: "doce",
    descricao:
      "A versão mais nobre da baunilha, cultivada em Madagascar/Reunião, mais alcoólica e densa.",
    comoCheira: ["boozy", "cremosa", "densa"],
  },
  tonka: {
    nome: "Tonka",
    familia: "doce",
    descricao:
      "Vagem brasileira/sul-americana. Cumarina pura, feno cortado, baunilha amendoada.",
    comoCheira: ["amendoada", "doce", "feno"],
  },
  "tonka bean": {
    nome: "Tonka",
    familia: "doce",
    descricao:
      "Mesmo que tonka, vagem sul-americana com aroma de feno e baunilha amendoada.",
    comoCheira: ["amendoada", "doce", "feno"],
  },
  praline: {
    nome: "Praliné",
    familia: "doce",
    descricao:
      "Açúcar caramelizado com avelã. Gourmand profundo, raramente clichê quando bem dosado.",
    comoCheira: ["caramelo", "amêndoa", "doce"],
  },
  caramelo: {
    nome: "Caramelo",
    familia: "doce",
    descricao:
      "Açúcar tostado, quente, denso, levemente amargo. Sustenta gourmands sem doçura adolescente.",
    comoCheira: ["doce", "tostado", "denso"],
  },
  cacau: {
    nome: "Cacau",
    familia: "doce",
    descricao:
      "Chocolate amargo, antes do açúcar. Em masculino, dá densidade quente sem virar Trufa.",
    comoCheira: ["amargo", "denso", "tostado"],
  },
  "chocolate escuro": {
    nome: "Chocolate escuro",
    familia: "doce",
    descricao:
      "Cacau com mais densidade, terroso, amargo, levemente animal.",
    comoCheira: ["amargo", "denso", "boozy"],
  },
  cafe: {
    nome: "Café",
    familia: "doce",
    descricao:
      "Grão tostado, amargo, queimado, com fundo doce escondido. Característico de gourmands modernos.",
    comoCheira: ["amargo", "tostado", "denso"],
  },
  alcacuz: {
    nome: "Alcaçuz",
    familia: "doce",
    descricao:
      "Raiz doce-amarga, vagamente anisada. Comum em modernos europeus.",
    comoCheira: ["doce", "amarga", "anisada"],
  },
  davana: {
    nome: "Davana",
    familia: "frutado",
    descricao:
      "Erva indiana com aroma de fruta seca + uísque. Reage de forma única em cada pele.",
    comoCheira: ["frutada", "boozy", "exótica"],
  },

  /* ---------- ÂMBAR / RESINAS ---------- */
  ambar: {
    nome: "Âmbar",
    familia: "âmbar",
    descricao:
      "Acorde, não material, mistura de resinas (benjoim, ládano, baunilha) que evoca calor de pele aquecida.",
    comoCheira: ["quente", "resinoso", "envolvente"],
  },
  "ambar claro": {
    nome: "Âmbar claro",
    familia: "âmbar",
    descricao:
      "Versão mais leve do acorde âmbar, menos doce, mais aerado.",
    comoCheira: ["aerado", "resinoso", "morno"],
  },
  ambergris: {
    nome: "Ambergris",
    familia: "âmbar",
    descricao:
      "Substância marinha de baleia (sintetizada hoje). Sal, pele, calor, uma das notas mais sensuais que existe.",
    comoCheira: ["marinho", "animal", "salgado"],
  },
  ambroxan: {
    nome: "Ambroxan",
    familia: "âmbar",
    descricao:
      "Molécula sintética que evoca ambergris. Quase todo perfume moderno tem, dá projeção mineral, salgada, persistente.",
    comoCheira: ["mineral", "salgado", "longo"],
  },
  ladano: {
    nome: "Ládano",
    familia: "resinoso",
    descricao:
      "Resina mediterrânea, couro doce, mel, fumo. Espinha do âmbar clássico.",
    comoCheira: ["couro", "mel", "resinoso"],
  },
  benjoim: {
    nome: "Benjoim",
    familia: "resinoso",
    descricao:
      "Resina balsâmica, baunilha quente, leve canela. Doce sem ser açúcar.",
    comoCheira: ["balsâmica", "doce", "quente"],
  },
  benzoim: {
    nome: "Benzoim",
    familia: "resinoso",
    descricao:
      "Mesmo que benjoim, resina balsâmica de baunilha quente.",
    comoCheira: ["balsâmica", "doce", "quente"],
  },
  mirra: {
    nome: "Mirra",
    familia: "resinoso",
    descricao:
      "Resina bíblica, amarga, fumacenta, levemente medicinal. Cheiro de igreja antiga.",
    comoCheira: ["amarga", "fumacenta", "antiga"],
  },
  incenso: {
    nome: "Incenso",
    familia: "resinoso",
    descricao:
      "Olíbano, resina queimada, fria, mineral. Cheiro de catedral e de meditação.",
    comoCheira: ["fria", "mineral", "fumacenta"],
  },
  olibanum: {
    nome: "Olíbano",
    familia: "resinoso",
    descricao:
      "Mesmo que incenso, resina queimada de Boswellia, fria e mineral.",
    comoCheira: ["fria", "mineral", "fumacenta"],
  },

  /* ---------- COURO / ANIMÁLICO ---------- */
  musk: {
    nome: "Musk",
    familia: "couro",
    descricao:
      "Almíscar, base que evoca pele limpa. Hoje é sintético (sem mais ataque a animais), mas mantém o efeito de calor humano.",
    comoCheira: ["pele", "limpo", "morno"],
  },
  "musk branco": {
    nome: "Musk branco",
    familia: "couro",
    descricao:
      "Versão mais aerada do almíscar, pele recém-saída do banho.",
    comoCheira: ["limpo", "aerado", "morno"],
  },
  almiscar: {
    nome: "Almíscar",
    familia: "couro",
    descricao:
      "Mesmo que musk, base que evoca pele aquecida.",
    comoCheira: ["pele", "limpo", "morno"],
  },
  couro: {
    nome: "Couro",
    familia: "couro",
    descricao:
      "Acorde sintético, bétula defumada + suedine + bouche. Vai de jaqueta nova até cadeira antiga.",
    comoCheira: ["seco", "defumado", "animal"],
  },

  /* ---------- BOOZY / TABACO ---------- */
  tabaco: {
    nome: "Tabaco",
    familia: "fumê",
    descricao:
      "Folha curada, densa, doce-amarga, levemente animal. Em masculino, é o oposto de fresco.",
    comoCheira: ["doce", "denso", "fumê"],
  },
  conhaque: {
    nome: "Conhaque",
    familia: "fumê",
    descricao:
      "Acorde boozy, destilado de uva envelhecido em carvalho. Dá luxo de meia-idade.",
    comoCheira: ["boozy", "frutado", "morno"],
  },
  whisky: {
    nome: "Whisky",
    familia: "fumê",
    descricao:
      "Acorde boozy + carvalho + leve fumaça. Pra perfume que pretende ser 'adulto'.",
    comoCheira: ["boozy", "amadeirado", "fumê"],
  },

  /* ---------- MARINHO / AQUÁTICO ---------- */
  "notas marinhas": {
    nome: "Notas marinhas",
    familia: "marinho",
    descricao:
      "Acorde sintético que evoca maresia, sal, água, com base na molécula calone.",
    comoCheira: ["salgada", "fria", "azulada"],
  },
  sal: {
    nome: "Sal",
    familia: "marinho",
    descricao:
      "Mineralidade salgada, pele suada após mergulho no mar.",
    comoCheira: ["mineral", "salgado", "limpo"],
  },
};
