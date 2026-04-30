import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Tudo que você precisa saber sobre perfume árabe, decants, prazos e compra na ZAHIR PARFUMS.",
};

const CATEGORIAS = [
  {
    titulo: "Sobre os perfumes",
    perguntas: [
      {
        p: "Os perfumes são originais?",
        r: "Trabalhamos apenas com perfumes originais, adquiridos com fornecedores nacionais e importadores parceiros. A curadoria não trabalha com falsificações nem com decants de fonte não identificada.",
      },
      {
        p: "Por que o perfume árabe é mais barato que o designer original?",
        r: "Três motivos: (1) as casas árabes não pagam celebridade-embaixadora nem campanha de mídia global; (2) formulação com concentração maior de óleo essencial fica proporcionalmente mais barata; (3) a cadeia de distribuição é mais curta. A qualidade do líquido não é inferior, em muitos casos é comparável ou melhor.",
      },
      {
        p: "A fidelidade de 85%, 90% é real mesmo?",
        r: "Os percentuais são estimativas editoriais baseadas em referências públicas de comunidade olfativa, comparações de mercado e avaliação da curadoria. Não são análise química laboratorial. Se a referência for distante, a ficha técnica deve dizer isso com clareza.",
      },
      {
        p: "Qual a diferença entre EDT, EDP e Extrait?",
        r: "EDT (Eau de Toilette): 5–15% de concentração de óleo. Mais fresco, dura menos. EDP (Eau de Parfum): 15–20%. Intermediário, é o padrão masculino moderno. Extrait de Parfum: 20–40%. O mais potente, menos projeção, mais fixação na pele, dura o dia todo.",
      },
    ],
  },
  {
    titulo: "Decants",
    perguntas: [
      {
        p: "O decant é o mesmo perfume do frasco cheio?",
        r: "É. Exatamente o mesmo líquido, envasamos diretamente do frasco original da casa, com atomizador spray próprio. O que muda é só a quantidade (5 ml ou 10 ml em vez de 100 ml).",
      },
      {
        p: "Quanto dura um decant?",
        r: "Um decant de 10 ml dá, em média, 80–120 borrifadas. Usando 2 borrifadas por dia, são 40–60 dias. Decant de 5 ml dá metade disso. A durabilidade real depende de quantas borrifadas você usa por aplicação.",
      },
      {
        p: "Se eu gostar do decant, posso usar o valor pra comprar o frasco cheio?",
        r: "Por enquanto, não. No lançamento, o decant serve para reduzir seu risco antes do frasco cheio. Programas de crédito e recompra podem entrar depois, quando a operação estiver mais madura.",
      },
      {
        p: "Posso trocar um decant já aberto?",
        r: "Decant aberto não aceita troca por questão sanitária. Por isso existe, é o teste barato antes de investir no frasco cheio. Se você gostou, volta pro frasco; se não gostou, gastou R$ 25–40, não R$ 250.",
      },
    ],
  },
  {
    titulo: "Compra e pagamento",
    perguntas: [
      {
        p: "Por que não tem checkout no site?",
        r: "Fase de lançamento. A gente escolheu fechar as primeiras vendas via Instagram pra manter contato direto com cada cliente, responder dúvida, sugerir alternativa, ajustar pedido antes de fechar. Checkout automatizado vem numa segunda fase.",
      },
      {
        p: "Quais formas de pagamento?",
        r: "Nesta fase inicial, Pix. O valor final com frete é confirmado no atendimento antes do pagamento. Cartão, boleto e checkout entram em uma próxima etapa.",
      },
      {
        p: "Minha compra fica registrada em algum lugar?",
        r: "Fica. Cada pedido gera nota fiscal (emitida depois que o CNPJ for ativado, durante fase beta de lançamento, emitimos manualmente mediante pedido). Histórico do Instagram vale como comprovante de pedido.",
      },
    ],
  },
  {
    titulo: "Entrega",
    perguntas: [
      {
        p: "Quanto custa o frete?",
        r: "Calculamos por CEP depois que você envia a lista pelo DM. O valor depende do endereço, peso e modalidade escolhida. A regra é simples: frete real informado antes do pagamento.",
      },
      {
        p: "Entregam em todo o Brasil?",
        r: "Sim. Pelos Correios alcançamos qualquer CEP brasileiro. Regiões Norte e Nordeste podem demorar mais (até 15 dias úteis em casos extremos).",
      },
      {
        p: "Vocês emitem nota fiscal?",
        r: "Sim, mediante pedido. O CNPJ ZAHIR está sendo finalizado, enquanto isso, emitimos NF manualmente. Quando o CNPJ estiver ativo, NF automática em todo pedido.",
      },
    ],
  },
  {
    titulo: "Conservação",
    perguntas: [
      {
        p: "Onde guardar o perfume?",
        r: "Longe da luz e do calor. Guarda-roupa fechado ou gaveta funciona bem. Janela, banheiro e carro são os piores lugares, luz UV e calor aceleram a oxidação e mudam o cheiro.",
      },
      {
        p: "Perfume tem validade?",
        r: "Geralmente 3–5 anos se bem guardado. Perfume árabe, com concentração maior, tende a durar mais. Se você abre e não usa, a oxidação começa a mudar as notas, fica 'mais velho' no cheiro.",
      },
      {
        p: "Por que o decant vem em frasco escuro?",
        r: "Vidro âmbar (ou preto) protege o líquido da luz, que é o maior inimigo do perfume. Isso evita oxidação e preserva as notas originais, especialmente as de topo, que são as primeiras a se degradarem.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        titulo={
          <>
            Tudo que você pode{" "}
            <em className="italic text-amber/90">estar se perguntando.</em>
          </>
        }
        descricao="Se a sua dúvida não está aqui, chama no DM. Respondemos entre 9h e 22h, e a resposta geralmente leva alguns minutos."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <section className="section-veil-light px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-20">
            {CATEGORIAS.map((cat) => (
              <div key={cat.titulo} className="flex flex-col gap-8">
                <h2 className="font-display text-3xl font-light leading-[1.1] text-ink md:text-5xl">
                  <em className="italic text-amber/90">{cat.titulo}.</em>
                </h2>
                <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                  {cat.perguntas.map((q) => (
                    <div
                      key={q.p}
                      className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5"
                    >
                      <span className="font-display text-xl font-light italic leading-[1.2] text-ink md:text-2xl">
                        {q.p}
                      </span>
                      <p className="text-sm leading-relaxed text-ink/70 md:text-base">
                        {q.r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
          <h2 className="max-w-2xl font-display text-2xl font-light italic leading-[1.15] text-ink md:text-4xl">
            Não achou sua dúvida?
          </h2>
          <Link
            href="/contato"
            className="rounded-full bg-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Falar com a gente →
          </Link>
        </div>
      </section>
    </>
  );
}
