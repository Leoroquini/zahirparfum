/**
 * Arquétipos de persona — 28 frases editoriais, uma pra cada SKU.
 * Formato: "Usado pelo cara que…" + cena concreta (não adjetivo vago).
 *
 * Humanizam o perfume e criam identificação imediata — leitor se reconhece
 * ou reconhece alguém. Diferencial editorial que nenhum concorrente tem.
 */

export const ARQUETIPOS: Record<string, string> = {
  "club-de-nuit-intense":
    "Usado pelo cara que chega no encontro dez minutos atrasado e, mesmo assim, é perdoado em trinta segundos. O clássico que todo mundo quer conhecer sem admitir que já conhece.",

  "club-de-nuit-iconic-blue":
    "Usado pelo cara que tem reunião às 9h e joga futebol com os amigos na sexta. Discreto o suficiente pra elogiarem sem notar exatamente o perfume.",

  "asad-preto":
    "Usado pelo cara que dirige sozinho até a casa de alguém no sábado de madrugada e chega cheirando melhor do que saiu.",

  "asad-marrom-bourbon":
    "Usado pelo cara que fecha negócio no salão de eventos com taça de whisky na mão. Quando ele sai, o assento da cadeira ainda tem a história dele.",

  "khamrah-qahwa-marrom":
    "Usado pelo cara que pede café curto depois do segundo drink. Adocicado o suficiente pra virar vício, forte o suficiente pra ficar na jaqueta dela.",

  "khamrah-preto-teriaq":
    "Usado pelo cara que fuma charuto no inverno e acende incenso em casa. Perfume que não pede licença — ocupa o cômodo inteiro.",

  "al-noble-sabaen":
    "Usado pelo cara que monta apresentação às 8h e manda o deck pro cliente antes das 10h. Elegância de hoje, não de 1998.",

  "al-noble-wazeer":
    "Usado pelo cara que toma whisky puro, sem contar pros amigos que o médico pediu pra reduzir. Amadeirado com atitude de homem que já viveu um pouco.",

  "al-noble-ameer":
    "Usado pelo cara oud-lover de primeira hora — sabe diferenciar cambodiano de indiano, mas não quer pagar R$ 3.500 pra provar.",

  "asad-zanzibar-azul":
    "Usado pelo cara que vai de bermuda pra reunião informal na zona sul e ainda parece o mais bem-arrumado. Fresco de caráter, não de pretexto.",

  "asad-elixir":
    "Usado pelo cara que chega no bar já de outfit do jantar. A noite começa antes e ele tá vestindo isso o tempo todo.",

  "club-de-nuit-sillage":
    "Usado pelo cara que mora em apartamento com varanda e vinho tinto na geladeira. Aventus, só que mais denso — a versão do cara que já escolheu o lado.",

  "fakhar-preto":
    "Usado pelo cara que trabalha com imagem, toma café da manhã na padaria da esquina e sai de casa às 8h com camisa branca impecável.",

  "fakhar-gold-extrait":
    "Usado pelo cara que começou com 1 Million aos 19 e voltou aos 28 porque descobriu que era o melhor de toda a prateleira da época.",

  "the-kingdom-man":
    "Usado pelo cara que aprende a dançar antes do casamento do amigo. O homem que se vestiu pra ser visto, não pra impressionar.",

  "his-confession":
    "Usado pelo cara que lê o livro até o fim e sabe responder quando perguntam sobre. Íris, couro, baunilha — elegância sem esforço aparente.",

  "lattafa-pisa":
    "Usado pelo cara que joga beach tennis no domingo e janta com a vó no almoço. Cítrico mediterrâneo pra quem ainda não abriu mão da leveza.",

  "9pm-masculino":
    "Usado pelo cara que chega tarde no bar e é o último a sair. Doce sem ser infantil, denso o suficiente pra contar a história de quem ficou a noite toda.",

  "vulcan-feu":
    "Arquétipo em definição. Unissex de caráter forte — a escrita vem depois que a gente cheira e descreve em primeira pessoa.",

  "ghost-spectre":
    "Arquétipo em definição. Misterioso já no nome — aguardando os sócios confirmarem notas e perfil pra escrever com precisão.",

  "atlas-extrait":
    "Usado pelo cara que veraneia no Nordeste e não precisa mandar foto pros amigos. Nuclear aquático — duas borrifadas e a praia inteira sabe que chegou.",

  "liquid-brun":
    "Usado pelo cara que bebe baunilha bourbon no café depois do almoço. Gourmand pesado pra quem sabe que quase nunca é demais — só às vezes.",

  "azure-aoud":
    "Usado pelo cara que vai pra Dubai a negócio, volta com a mala cheia de oud e já escolheu qual vai manter. Oriental que não pede desculpa.",

  salvo:
    "Usado pelo cara que quer começar pelo clone mais bem-feito do mercado — e acertou. Fresh universal que nunca passa despercebido.",

  "salvo-elixir":
    "Usado pelo cara que descobriu o Sauvage Elixir no estojo do amigo e não podia justificar R$ 1.300. Aqui, encontra 80% pela metade da metade.",

  "salvo-intense":
    "Usado pelo cara que prefere o EDP ao EDT — mais profundidade, mesma pegada. Sauvage versão adulta, sem o drama das campanhas.",

  "hawas-elixir":
    "Usado pelo cara que cozinha no domingo, mistura chocolate com menta no café, e sabe que doce demais não é defeito — é estilo.",

  "hawas-black":
    "Usado pelo cara que busca o Aventus há anos e descobriu que o atalho é melhor que o original. Frutado amadeirado — versátil o ano todo.",
};

export function arquetipoDe(slug: string): string | undefined {
  return ARQUETIPOS[slug];
}
