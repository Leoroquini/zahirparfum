import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Decants } from "@/components/sections/Decants";
import { KitsTrio } from "@/components/sections/KitsTrio";

export const metadata: Metadata = {
  title: "Decants",
  description:
    "Frascos menores (5ml, 10ml) do mesmo perfume original. Gaste menos pra testar antes de investir no frasco cheio. Como funciona, por que compensa.",
};

export default function DecantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Decants · Antes de pertencer, conheça"
        titulo={
          <>
            Você lembra do cheiro de quem te marcou.{" "}
            <em className="italic text-amber/90">
              Quem te encontra hoje, lembra do seu?
            </em>
          </>
        }
        descricao="Decant é como o cheiro vira o seu antes de virar gasto. Cinco ou dez mililitros do mesmo perfume original, tempo pra ele se misturar com a sua pele e mudar de personalidade ao longo do dia. Quando alguém pergunta o que é, você já testou todos os finais."
        backgroundGradient="radial-gradient(ellipse at 60% 50%, rgba(200,155,60,0.12), transparent 60%)"
      />

      {/* FAQ rápido */}
      <section className="section-veil-light border-b border-ink/5 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Perguntas frequentes
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <Pergunta
              p="É o mesmo perfume do frasco cheio?"
              r="É. Exato. O que muda é só a quantidade de líquido, envasamos do frasco original da casa, com atomizador próprio."
            />
            <Pergunta
              p="Quanto dura um decant?"
              r="Um decant de 10ml dá, em média, entre 80 e 120 borrifadas. Usando 2 borrifadas por dia, são 40 a 60 dias. 5ml dá metade disso."
            />
            <Pergunta
              p="Tem todos os perfumes em decant?"
              r="Os principais do catálogo, sim. SKUs menos rotativos ficam sob demanda, avisamos pelo WhatsApp se faz sentido abrir o frasco ou esperar uma leva."
            />
            <Pergunta
              p="E se eu não gostar?"
              r="É exatamente pra isso que o decant existe. Você testou, gastou R$ 25–40, descobriu que não é pra você. Melhor descobrir aqui do que depois de comprar o frasco inteiro."
            />
            <Pergunta
              p="Se eu gostar, rola algum benefício pra migrar pro frasco?"
              r="Por enquanto, não. No lançamento, o decant existe para você testar antes de investir no frasco cheio. Crédito parcial pode entrar em uma fase posterior."
            />
            <Pergunta
              p="Frasco do decant é transparente ou escuro?"
              r="Escuro (vidro âmbar ou preto) pra proteger da luz, perfume oxida quando fica exposto, e nossos decants foram pensados pra durar."
            />
          </div>
        </div>
      </section>

      <Decants hideIntro />

      {/* Trios curados (Estreia + Coleção) */}
      <KitsTrio />

      {/* Montar kit próprio */}
      <MontarKitCallout />

      {/* CTA final */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 text-center">
          <span className="font-display text-3xl italic text-amber/50">·</span>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
            Um bom catálogo começa com{" "}
            <em className="italic text-amber/90">decants testados.</em>
          </h2>
          <Link
            href="/catalogo"
            className="group mt-2 inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Explorar catálogo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function Pergunta({ p, r }: { p: string; r: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xl font-light italic text-ink md:text-2xl">
        {p}
      </span>
      <p className="text-sm leading-relaxed text-ink/70">{r}</p>
    </div>
  );
}

function MontarKitCallout() {
  return (
    <section className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(200,155,60,0.18), transparent 55%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Monte o seu
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl">
            Quer escolher do{" "}
            <em className="italic text-amber/90">zero?</em>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            Os trios fechados são curadoria. Mas se você já sabe o que quer,
            ou quer testar combinações que ninguém montou, abre o montador
            livre. Escolhe quantos decants quiser, mistura 5ml e 10ml, vê o
            total somar em tempo real e fecha pelo WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/decants/montar"
            className="group flex items-center justify-between gap-3 rounded-sm border border-amber/40 bg-cream/50 p-6 transition-all hover:-translate-y-1 hover:border-amber hover:shadow-product"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-dim">
                Sem desconto, total liberdade
              </span>
              <span className="font-display text-2xl font-light text-ink md:text-3xl">
                Abrir montador livre
              </span>
            </div>
            <span className="text-2xl text-amber transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
