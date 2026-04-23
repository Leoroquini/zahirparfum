import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Manifesto } from "@/components/sections/Manifesto";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Perfume é memória que não se vê. Um manifesto sobre por que ZAHIR PARFUMS existe — e o pacto que fazemos com quem escolhe comprar aqui.",
};

export default function ManifestoPage() {
  return (
    <>
      <PageHero
        eyebrow="Manifesto"
        titulo={
          <>
            Perfume é <em className="italic text-amber/90">memória</em> que
            não se vê.
          </>
        }
        descricao={`Este é o pacto que a marca faz com quem chega aqui. Não é sobre quem fundou — é sobre quem vai levar a ${BRAND.name} pro próprio guarda-roupa, pro próprio dia, pro próprio rastro.`}
        backgroundGradient="radial-gradient(ellipse at 40% 60%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <Manifesto hideIntro />

      {/* O que isso significa pra você — compromissos do cliente */}
      <section className="border-t border-cream/5 bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            O que isso significa pra você
          </span>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-cream md:text-5xl">
            Quatro coisas que a gente{" "}
            <em className="italic text-amber/90">promete</em> e cumpre.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            <Compromisso
              numero="01"
              titulo="Você nunca compra um perfume que a curadoria não validou."
              descricao="Cada SKU passa por teste antes de entrar no catálogo. Se a gente não gostou, não fica. Curadoria não é argumento de marketing — é filtro real."
            />
            <Compromisso
              numero="02"
              titulo="Você descobre. Ninguém te empurra."
              descricao="Quiz olfativo, mapa do catálogo, comparador com designer — antes de qualquer carrinho. A compra vem depois, quando você já sabe o que quer e por quê."
            />
            <Compromisso
              numero="03"
              titulo="Você testa antes de investir."
              descricao="Decants de 5 e 10 ml nos principais. Se não gostou, gastou quarenta reais. Se gostou, o valor vira crédito parcial pro frasco cheio. Perfume errado de R$ 250 é cliente frustrado pra sempre."
            />
            <Compromisso
              numero="04"
              titulo="Você pergunta sem vergonha."
              descricao="WhatsApp em horário estendido, sem script de vendedor. Se você não entendeu o que é projeção, fixação ou extrait, a culpa é do site — não sua. Pergunta. A gente explica."
            />
          </div>
        </div>
      </section>

      {/* Por que árabe, por que agora — contexto cultural */}
      <section className="border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Por que árabe, por que agora
          </span>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-display text-6xl font-light italic leading-none text-amber md:text-8xl">
                1.300<span className="text-amber/60">+</span>
              </span>
              <span className="text-sm italic text-cream/60">
                anos de tradição olfativa árabe
              </span>
            </div>

            <div className="flex max-w-2xl flex-col gap-5 font-display text-lg font-light leading-[1.55] text-cream/80 md:text-xl">
              <p>
                Enquanto a Europa descobria oud nos anos 2000, casas árabes
                nos Emirados e na Arábia Saudita já formulavam com oud,
                âmbar, rosa damascena e açafrão há mais de mil anos. Não é
                tendência — é tradição que o Ocidente só agora percebeu.
              </p>
              <p>
                O perfume árabe chega no homem brasileiro em um momento
                específico: o cara que cresceu vendo campanha de Dior no
                intervalo do futebol agora encontra fragrâncias com
                concentração maior, projeção mais alta e DNA mais complexo —
                por um quarto do preço.
              </p>
              <p className="text-cream/70">
                A pergunta não é se o homem brasileiro vai adotar perfume
                árabe. É se ele vai adotar com informação ou sem.{" "}
                <em className="italic text-amber">{BRAND.fullName}</em> existe
                pra que a resposta seja{" "}
                <em className="italic text-cream">com</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-cream/5 bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center">
          <span className="font-display text-3xl italic text-amber/50">·</span>
          <h2 className="max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-cream md:text-5xl lg:text-6xl">
            Seu rastro no ar começa com{" "}
            <em className="italic text-amber/90">uma escolha consciente.</em>
          </h2>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ritual"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
            >
              Fazer o Ritual
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/80 transition-all hover:border-amber hover:text-amber"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Compromisso({
  numero,
  titulo,
  descricao,
}: {
  numero: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-l-2 border-amber/40 pl-6">
      <span className="font-display text-sm italic text-amber/80">
        {numero}
      </span>
      <span className="font-display text-2xl font-light leading-[1.15] text-cream md:text-3xl">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-cream/70 md:text-base">
        {descricao}
      </p>
    </div>
  );
}
