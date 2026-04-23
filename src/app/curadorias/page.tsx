import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CuradoriasSection } from "@/components/sections/Curadorias";
import { CURADORIAS, countOf } from "@/data/curadorias";

export const metadata: Metadata = {
  title: "Curadorias",
  description:
    "Recortes temáticos do catálogo — primeiros perfumes, trabalho, inverno, encontro, verão à noite. Escolha pelo contexto em vez de perder tempo filtrando.",
};

export default function CuradoriasPage() {
  const total = CURADORIAS.reduce((sum, c) => sum + countOf(c), 0);

  return (
    <>
      <PageHero
        eyebrow="Curadorias"
        titulo={
          <>
            Agrupadas por{" "}
            <em className="italic text-amber/90">momento.</em>
          </>
        }
        descricao="Às vezes a pergunta não é 'qual perfume é o melhor' — é 'qual perfume combina com esse dia'. Cada curadoria é um recorte prático do catálogo feito pra contexto específico."
        backgroundGradient="radial-gradient(ellipse at 30% 50%, rgba(200,155,60,0.12), transparent 60%)"
      />

      <section className="border-b border-cream/5 bg-ink-soft px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm italic text-cream/60">
            Cada curadoria puxa do catálogo automaticamente. Quando um perfume
            novo é adicionado, ele entra nas curadorias que fazem sentido sem
            intervenção.
          </p>
          <div className="flex gap-8 text-right">
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
                Curadorias
              </span>
              <span className="font-display text-3xl font-light text-cream">
                {CURADORIAS.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
                Fragrâncias no total
              </span>
              <span className="font-display text-3xl font-light text-cream">
                {total}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CuradoriasSection hideIntro />
    </>
  );
}
