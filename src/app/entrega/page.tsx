import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Entrega e frete",
  description:
    "Prazos de envio, regiões atendidas, formas de despacho e rastreamento.",
};

export default function EntregaPage() {
  return (
    <>
      <PageHero
        eyebrow="Entrega · Frete"
        titulo={
          <>
            Do estoque em São Paulo{" "}
            <em className="italic text-amber/90">pro seu endereço.</em>
          </>
        }
        descricao="Envio rápido, embalagem caprichada, rastreamento em todo pedido. Entregamos em todo Brasil — com prazos claros e frete transparente."
        backgroundGradient="radial-gradient(ellipse at 50% 40%, rgba(200,155,60,0.1), transparent 60%)"
      />

      {/* Prazos */}
      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Prazos
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Bloco
              dest="Preparo do pedido"
              val="1 a 2 dias úteis"
              obs="Contados a partir da confirmação do Pix. O pedido é separado, conferido e embalado antes do despacho."
            />
            <Bloco
              dest="São Paulo capital e Grande SP"
              val="2–4 dias úteis"
              obs="Despacho via Correios PAC ou transportadora própria. Rastreamento enviado no DM."
            />
            <Bloco
              dest="Demais regiões do Brasil"
              val="3–10 dias úteis"
              obs="Depende do CEP. Calculamos o frete exato depois que você envia a lista pelo Instagram — sem surpresa no fechamento."
            />
          </div>
        </div>
      </section>

      {/* Embalagem */}
      <section className="border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
              Embalagem
            </span>
            <h2 className="font-display text-3xl font-light leading-[1.1] text-cream md:text-5xl">
              Perfume não pode{" "}
              <em className="italic text-amber/90">viajar errado.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-base leading-relaxed text-cream/75 md:text-lg">
            <p>
              Frasco cheio vai na caixa original da casa, envolvido em bolha
              dupla dentro de caixa de papel-kraft reforçada. Viaja em pé, com
              etiqueta &quot;frágil&quot;.
            </p>
            <p>
              Decant vai em frasco de vidro âmbar com atomizador spray, em
              caixinha própria ZAHIR. O vidro escuro protege o líquido da luz —
              perfume oxida quando fica exposto, e decant foi pensado pra
              durar.
            </p>
            <p className="text-cream/60">
              Cada pedido leva um cartão de agradecimento escrito à mão e uma
              ficha olfativa do(s) perfume(s) dentro — notas, projeção,
              fixação. Pra você usar como referência de bolso.
            </p>
          </div>
        </div>
      </section>

      {/* Rastreamento */}
      <section className="border-t border-cream/5 bg-ink px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Rastreamento
          </span>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
            Assim que o pedido sai daqui, você recebe no Instagram (mesma DM
            que fez a reserva) o código de rastreio + link direto pra
            acompanhar. Se em algum momento parecer que está demorando, chama
            na DM — a gente investiga com a transportadora.
          </p>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}

function Bloco({ dest, val, obs }: { dest: string; val: string; obs: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
        {dest}
      </span>
      <span className="font-display text-3xl font-light text-cream md:text-4xl">
        {val}
      </span>
      <p className="text-sm leading-relaxed text-cream/65">{obs}</p>
    </div>
  );
}

function CtaFinal() {
  return (
    <section className="border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <h2 className="max-w-2xl font-display text-2xl font-light italic leading-[1.15] text-cream md:text-4xl">
          Dúvida sobre o seu CEP ou prazo?
        </h2>
        <Link
          href="/contato"
          className="rounded-full border border-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
        >
          Falar com a gente
        </Link>
      </div>
    </section>
  );
}
