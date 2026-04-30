import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ComparadorArabeDesigner } from "@/components/sections/ComparadorArabeDesigner";

export const metadata: Metadata = {
  title: "Árabe × Designer",
  description:
    "Alternativas árabes com caminhos olfativos próximos aos grandes designers. Compare Creed Aventus, Sauvage, Bleu de Chanel e outros com referências do catálogo.",
};

export default function ComparadorPage() {
  return (
    <>
      <PageHero
        eyebrow="Comparador · Árabe × Designer"
        titulo={
          <>
            Árabe <span className="text-amber/90">×</span>{" "}
            <em className="italic">Designer</em>.
          </>
        }
        descricao="Escolhe um designer que você conhece (ou queria conhecer). Mostramos fragrâncias árabes do catálogo que conversam com o mesmo caminho olfativo, com referência editorial transparente."
        backgroundGradient="radial-gradient(ellipse at 70% 50%, rgba(122,45,50,0.15), transparent 60%)"
      />

      {/* Por que compensa */}
      <section className="section-veil-light border-b border-ink/5 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Por que compensa
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Motivo
              titulo="Mesma ideia olfativa"
              descricao="Muitas casas árabes criam interpretações inspiradas em designers conhecidos. O objetivo aqui é comparar família, notas, ocasião de uso e sensação geral."
            />
            <Motivo
              titulo="Performance na prática"
              descricao="Algumas fragrâncias árabes têm presença forte, mas projeção e fixação variam por pele, clima, quantidade aplicada e lote. Por isso a curadoria evita tratar performance como promessa absoluta."
            />
            <Motivo
              titulo="Preço justo"
              descricao="A proposta é entregar boa experiência olfativa com investimento menor que muitos designers de boutique, sem transformar comparação de preço em garantia de equivalência."
            />
          </div>
        </div>
      </section>

      <ComparadorArabeDesigner hideIntro />
    </>
  );
}

function Motivo({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-2xl font-light text-ink">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-ink/65">{descricao}</p>
    </div>
  );
}
