/**
 * Arquétipos de persona, frases editoriais por SKU.
 * Formato: "Usado pelo cara que…" + cena concreta (não adjetivo vago).
 *
 * Humanizam o perfume e criam identificação imediata, leitor se reconhece
 * ou reconhece alguém. Diferencial editorial que nenhum concorrente tem.
 */

export const ARQUETIPOS: Record<string, string> = {
  // ========= ARMAF =========
  "club-de-nuit-intense":
    "Usado pelo cara que chega no encontro dez minutos atrasado e, mesmo assim, é perdoado em trinta segundos. O clássico que todo mundo quer conhecer sem admitir que já conhece.",

  "club-de-nuit-iconic-blue":
    "Usado pelo cara que tem reunião às 9h e joga futebol com os amigos na sexta. Discreto o suficiente pra elogiarem sem notar exatamente o perfume.",

  "club-de-nuit-sillage":
    "Usado pelo cara que mora em apartamento com varanda e vinho tinto na geladeira. Aventus, só que mais denso, a versão do cara que já escolheu o lado.",

  "club-de-nuit-urban-elixir":
    "Usado pelo cara que troca o táxi pelo Uber Black, mas ainda guarda os cartões de visita no bolso interno do paletó. Especiado urbano de quem mora a vida toda na cidade grande.",

  "club-de-nuit-milestone":
    "Usado pelo cara que comemora promoção sem postar story. Amêndoa, baunilha e lavanda, a versão árabe do Pegasus pelo terço do preço.",

  // ========= LATTAFA =========
  "asad-preto":
    "Usado pelo cara que dirige sozinho até a casa de alguém no sábado de madrugada e chega cheirando melhor do que saiu.",

  "asad-marrom-bourbon":
    "Usado pelo cara que fecha negócio no salão de eventos com taça de whisky na mão. Quando ele sai, o assento da cadeira ainda tem a história dele.",

  "khamrah-qahwa":
    "Usado pelo cara que pede café curto depois do segundo drink. Adocicado o suficiente pra virar vício, forte o suficiente pra ficar na jaqueta dela.",

  "khamrah-preto-teriaq":
    "Usado pelo cara que fuma charuto no inverno e acende incenso em casa. Perfume que não pede licença, ocupa o cômodo inteiro.",

  "al-noble-safeer":
    "Usado pelo cara que monta apresentação às 8h e manda o deck pro cliente antes das 10h. Elegância de hoje, não de 1998.",

  "al-noble-wazeer":
    "Usado pelo cara que toma whisky puro, sem contar pros amigos que o médico pediu pra reduzir. Amadeirado com atitude de homem que já viveu um pouco.",

  "al-noble-ameer":
    "Usado pelo cara oud-lover de primeira hora, sabe diferenciar cambodiano de indiano, mas não quer pagar R$ 3.500 pra provar.",

  "asad-zanzibar-azul":
    "Usado pelo cara que vai de bermuda pra reunião informal na zona sul e ainda parece o mais bem-arrumado. Fresco de caráter, não de pretexto.",

  "asad-elixir":
    "Usado pelo cara que chega no bar já de outfit do jantar. A noite começa antes e ele tá vestindo isso o tempo todo.",

  "fakhar-preto":
    "Usado pelo cara que trabalha com imagem, toma café da manhã na padaria da esquina e sai de casa às 8h com camisa branca impecável.",

  "fakhar-gold-extrait":
    "Usado pelo cara que começou com 1 Million aos 19 e voltou aos 28 porque descobriu que era o melhor de toda a prateleira da época.",

  "fakhar-platinum":
    "Usado pelo cara que corre na orla às 6h e ainda chega na reunião antes do café passar. Aquático aromático pra quem mantém o ritmo.",

  "the-kingdom-man":
    "Usado pelo cara que aprende a dançar antes do casamento do amigo. O homem que se vestiu pra ser visto, não pra impressionar.",

  "his-confession":
    "Usado pelo cara que lê o livro até o fim e sabe responder quando perguntam sobre. Íris, couro, baunilha, elegância sem esforço aparente.",

  "maahir-black-edition":
    "Usado pelo cara que toma uísque defumado num bar de poltrona de couro. Tabaco, baunilha e cacau, o atalho árabe pro Tobacco Vanille.",

  khamrah:
    "Usado pelo cara que conhece a história antes de conhecer a fórmula. Tâmaras, canela, baunilha, o original que abriu o caminho da família inteira.",

  emeer:
    "Usado pelo cara que prefere oud com rosa turca a oud sozinho. Nicho-style com pegada Penhaligon's, sem o ticket de Penhaligon's.",

  "badee-al-oud-for-glory":
    "Usado pelo cara que está descobrindo oud agora e não quer começar pagando R$ 600. Açafrão, oud e jasmim, o início honesto.",

  "qaed-al-fursan":
    "Usado pelo cara que prefere couro discreto a oud explosivo. Versátil dia-noite, especiado leve, o coringa que cabe na mochila.",

  // ========= AFNAN =========
  "9pm-black":
    "Usado pelo cara que chega tarde no bar e é o último a sair. Doce sem ser infantil, denso o suficiente pra contar a história de quem ficou a noite toda.",

  "9pm-night-oud":
    "Usado pelo cara que escolhe o melhor da carta de oud sem precisar pedir indicação. Nuclear noturno, performance de boutique a preço que cabe.",

  "9pm-rebel":
    "Usado pelo cara que troca de carro a cada dois anos e nunca repete a cor. Frutado especiado fora da curva, pra quem não usa o que todo mundo usa.",

  "9pm-elixir":
    "Usado pelo cara que pediu o Le Male Elixir e descobriu que tinha algo mais barato e tão bom. Mel, baunilha, tabaco, com performance que dura a noite.",

  "turathi-blue":
    "Usado pelo cara que viaja com mala de mão e ainda chega cheirando bem na primeira reunião. Aquático sofisticado com referência a Roja Elysium.",

  // ========= FRENCH AVENUE =========
  "vulcan-feu":
    "Usado pelo cara (ou mulher) que não tem medo de ser notado. Especiado, rum, tabaco, oud, frasco que entra na sala e conversa com o ambiente inteiro.",

  "ghost-spectre":
    "Usado pelo cara que prefere o sussurro ao grito. Frutado amadeirado, performance escondida dentro de um EDP que dura o dia todo sem chamar atenção.",

  "liquid-brun":
    "Usado pelo cara que bebe baunilha bourbon no café depois do almoço. Gourmand pesado pra quem sabe que quase nunca é demais, só às vezes.",

  "azure-aoud":
    "Usado pelo cara que vai pra Dubai a negócio, volta com a mala cheia de oud e já escolheu qual vai manter. Oriental que não pede desculpa.",

  "royal-blend-bourbon":
    "Usado pelo cara que fecha jantar com sobremesa e charuto. Cacau, tabaco, baunilha bourbon, gourmand árabe sem ser doce demais.",

  "yeah-man-parfum":
    "Usado pelo cara que ainda lembra do primeiro Y aos 21. Aromático frutado pra quem sabe a hora de adoçar e a hora de cortar.",

  // ========= MAISON ALHAMBRA =========
  salvo:
    "Usado pelo cara que quer começar pelo clone mais bem-feito do mercado, e acertou. Fresh universal que nunca passa despercebido.",

  "salvo-elixir":
    "Usado pelo cara que descobriu o Sauvage Elixir no estojo do amigo e não podia justificar R$ 1.300. Aqui, encontra 80% pela metade da metade.",

  "salvo-intense":
    "Usado pelo cara que prefere o EDP ao EDT, mais profundidade, mesma pegada. Sauvage versão adulta, sem o drama das campanhas.",

  // ========= RASASI =========
  "hawas-elixir":
    "Usado pelo cara que cozinha no domingo, mistura chocolate com menta no café, e sabe que doce demais não é defeito, é estilo.",

  "hawas-black":
    "Usado pelo cara que busca o Aventus há anos e descobriu que o atalho é melhor que o original. Frutado amadeirado, versátil o ano todo.",

  // ========= NICHO ÁRABE =========
  "bharara-king":
    "Usado pelo cara que separa um perfume só pra ocasião que importa. Açafrão, oud, rosa, couro, nicho árabe que merece a sexta-feira da semana.",

  "rayhaan-corium":
    "Usado pelo cara que tem jaqueta de couro de verdade e cuida dela. Açafrão e framboesa abrindo, couro liso na base, o sopro do Tuscan a preço árabe.",

  aether:
    "Usado pelo cara que coleciona perfume como quem coleciona vinho. Boutique de Dubai, oud com rosa, especiarias e madeiras preciosas, peça de armário, não de rotina.",
};

export function arquetipoDe(slug: string): string | undefined {
  return ARQUETIPOS[slug];
}
