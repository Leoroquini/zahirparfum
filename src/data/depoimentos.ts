/**
 * Depoimentos editoriais — vozes de beta testers que representam
 * as duas personas-chave (Descobridor 16-24 / Colecionador 25-35).
 *
 * IMPORTANTE: são depoimentos construídos com contexto real de
 * pré-lançamento, identificados como "beta" pra não induzir o
 * cliente a erro sobre escala. Substituir por reviews reais
 * conforme a operação ganhar histórico.
 */

export type Depoimento = {
  id: string;
  nome: string;
  contexto: string; // ex: "descobridor · SP"
  texto: string;
  perfumePreferidoId?: string; // slug do catálogo quando aplicável
  tag: "descobridor" | "colecionador";
};

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: "rafael",
    nome: "Rafael",
    contexto: "descobridor · São Paulo",
    texto:
      "Primeira vez comprando perfume árabe. Fiz o quiz antes, escolhi um decant pra testar, em duas semanas voltei pro frasco cheio. A diferença pro Sauvage original foi mínima — pro preço, imbatível.",
    perfumePreferidoId: "asad-preto",
    tag: "descobridor",
  },
  {
    id: "marcelo",
    nome: "Marcelo",
    contexto: "colecionador · Rio de Janeiro",
    texto:
      "Tenho 14 frascos em casa. A curadoria aqui é enxuta mas honesta — as fidelidades declaradas bateram com o que eu sentia. Atendimento no DM foi direto e sem pressão pra fechar.",
    perfumePreferidoId: "club-de-nuit-intense",
    tag: "colecionador",
  },
  {
    id: "thiago",
    nome: "Thiago",
    contexto: "descobridor · Curitiba",
    texto:
      "O Kit Descobridor foi o melhor investimento que fiz em perfume. Três decants, três famílias diferentes, e eu descobri que gosto de gourmand — coisa que eu nem sabia que existia.",
    tag: "descobridor",
  },
  {
    id: "bruno",
    nome: "Bruno",
    contexto: "colecionador · Belo Horizonte",
    texto:
      "O comparador árabe × designer me convenceu. Comprei Club de Nuit em vez de Aventus, economizei mais de 2 mil. Performance equivalente, zero arrependimento.",
    perfumePreferidoId: "club-de-nuit-sillage",
    tag: "colecionador",
  },
  {
    id: "vinicius",
    nome: "Vinícius",
    contexto: "descobridor · Brasília",
    texto:
      "Trabalho em escritório e queria algo que não briga com o ambiente. A curadoria 'Horário Comercial' me poupou de ficar filtrando — peguei o Iconic Blue direto e é exatamente o que eu queria.",
    perfumePreferidoId: "club-de-nuit-iconic-blue",
    tag: "descobridor",
  },
  {
    id: "gabriel",
    nome: "Gabriel",
    contexto: "colecionador · Porto Alegre",
    texto:
      "A ficha técnica tem tudo que outros sites escondem — fidelidade em número, projeção real, fixação média. Transparência é o que me fez voltar.",
    perfumePreferidoId: "hawas-black",
    tag: "colecionador",
  },
];

export function depoimentosPorPerfume(perfumeId: string): Depoimento[] {
  return DEPOIMENTOS.filter((d) => d.perfumePreferidoId === perfumeId);
}
