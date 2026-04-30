import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Como comprar",
  description:
    "Compra simples via Instagram e Pix. Cinco passos da escolha à entrega.",
};

const PASSOS = [
  {
    n: "01",
    t: "Escolhe no site",
    d: "Navega pelo catálogo, quiz ou mapa olfativo. Adiciona à sua lista o que te interessa, frasco cheio, decant 5 ml ou 10 ml.",
  },
  {
    n: "02",
    t: "Reserva via Instagram",
    d: "Clica em 'Reservar via Instagram' ou em 'Enviar lista via Instagram'. Abre um DM com a mensagem já pronta, você só confere e envia.",
  },
  {
    n: "03",
    t: "Combina o pagamento",
    d: "A gente responde em horário comercial estendido (9h–22h), confirma disponibilidade, calcula o frete pelo seu CEP e envia os dados para pagamento via Pix.",
  },
  {
    n: "04",
    t: "Paga com segurança",
    d: "Nesta fase inicial, aceitamos Pix. O pedido só entra na fila de separação depois da confirmação do pagamento no atendimento.",
  },
  {
    n: "05",
    t: "Recebe em casa",
    d: "Preparo em 1 a 2 dias úteis depois do Pix confirmado. Envio pelos Correios ou transportadora, sempre com código de rastreamento.",
  },
];

export default function ComoComprarPage() {
  return (
    <>
      <PageHero
        eyebrow="Como comprar"
        titulo={
          <>
            Cinco passos da escolha{" "}
            <em className="italic text-amber/90">à porta de casa.</em>
          </>
        }
        descricao="Por enquanto a gente fecha tudo via Instagram. É um contato humano no meio da transação, não um bot, não um checkout genérico. Dá pra perguntar, ajustar, trocar tamanho, pedir conselho antes de fechar."
        backgroundGradient="radial-gradient(ellipse at 40% 50%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <section className="section-veil-light px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {PASSOS.map((p) => (
              <div
                key={p.n}
                className="flex flex-col gap-3 border-l-2 border-amber/40 pl-6 md:pl-7"
              >
                <span className="font-display text-xs italic text-amber/80">
                  Passo {p.n}
                </span>
                <h2 className="font-display text-2xl font-light leading-[1.15] text-ink md:text-3xl">
                  {p.t}
                </h2>
                <p className="text-sm leading-relaxed text-ink/70 md:text-base">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formas de pagamento */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Formas de pagamento
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            <MetodoPagamento
              t="Pix"
              d="Forma inicial de pagamento. O valor total com frete é confirmado no atendimento antes de você pagar."
            />
            <MetodoPagamento
              t="Cartão"
              d="Ainda não disponível. Entra em uma próxima fase, quando a operação estiver pronta para checkout e parcelamento."
            />
            <MetodoPagamento
              t="Boleto"
              d="Ainda não disponível. Para manter a operação simples no lançamento, os primeiros pedidos serão fechados por Pix."
            />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-display text-2xl font-light italic leading-[1.15] text-ink md:text-4xl">
            Pronto pra escolher o seu?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="rounded-full bg-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
            >
              Ir ao catálogo →
            </Link>
            <Link
              href="/ritual"
              className="rounded-full border border-ink/25 px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
            >
              Fazer o Ritual
            </Link>
          </div>
          <p className="mt-3 text-xs italic text-ink/65">
            Alguma dúvida? Chama na{" "}
            <a
              href={`https://instagram.com/${BRAND.handles.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber underline-offset-4 hover:underline"
            >
              DM do Instagram
            </a>{" "}
           , respondemos em minutos.
          </p>
        </div>
      </section>
    </>
  );
}

function MetodoPagamento({ t, d }: { t: string; d: string }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-2xl font-light text-ink">{t}</span>
      <p className="text-sm leading-relaxed text-ink/65">{d}</p>
    </div>
  );
}
