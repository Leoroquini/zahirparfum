import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ComparadorArabeDesigner } from "@/components/sections/ComparadorArabeDesigner";

export const metadata: Metadata = {
  title: "Árabe × Designer",
  description:
    "Alternativas árabes com o mesmo DNA dos grandes designers — por uma fração do preço. Compare Creed Aventus, Sauvage, Bleu de Chanel e outros com seus equivalentes do catálogo.",
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
        descricao="Escolhe um designer que você conhece (ou queria conhecer). Mostramos as fragrâncias árabes do catálogo que capturam o mesmo DNA — por uma fração do preço, com fidelidade transparente."
        backgroundGradient="radial-gradient(ellipse at 70% 50%, rgba(122,45,50,0.15), transparent 60%)"
      />

      {/* Por que compensa */}
      <section className="border-b border-cream/5 bg-ink-soft px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Por que compensa
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Motivo
              titulo="Mesma ideia olfativa"
              descricao="Perfumistas árabes estudam os designers nota por nota. Não é plágio — é interpretação, às vezes com ajustes que melhoram o original (mais projeção, mais fixação)."
            />
            <Motivo
              titulo="Concentração maior"
              descricao="Perfumarias árabes costumam formular com 20–30% de concentração em EDP e extraits — o dobro do padrão ocidental. Resultado: dura mais, projeta mais."
            />
            <Motivo
              titulo="Preço justo"
              descricao="Sem o custo da celebridade-embaixadora, sem marketing de campanha global, sem margem de boutique. A qualidade do líquido chega por um quarto do preço."
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
      <span className="font-display text-2xl font-light text-cream">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-cream/65">{descricao}</p>
    </div>
  );
}
