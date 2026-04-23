import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CatalogoGrid } from "@/components/sections/CatalogoGrid";
import { CATALOGO, FAMILIAS, MARCAS } from "@/data/catalogo";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Curadoria completa de perfumes árabes masculinos — fichas técnicas, clones designer, decants e filtros por família olfativa, ocasião e preço.",
};

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo · Curadoria"
        titulo={
          <>
            Cada um com uma{" "}
            <em className="italic text-amber/90">história.</em>
          </>
        }
        descricao="Perfumes selecionados pra quem está começando e pra quem já coleciona. Notas explicadas, comparação direta com clones designer, decants disponíveis nos principais."
        backgroundGradient="radial-gradient(ellipse at 70% 30%, rgba(200,155,60,0.12), transparent 60%)"
      />

      {/* Meta rápida da coleção */}
      <section className="border-b border-cream/5 bg-ink-soft px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 text-center md:grid-cols-4 md:text-left">
          <MetaStat label="Fragrâncias" value={CATALOGO.length.toString()} />
          <MetaStat label="Famílias" value={FAMILIAS.length.toString()} />
          <MetaStat label="Casas árabes" value={MARCAS.length.toString()} />
          <MetaStat label="Origem" value="Emirados" />
        </div>
      </section>

      <CatalogoGrid hideIntro />
    </>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
        {label}
      </span>
      <span className="font-display text-3xl font-light text-cream md:text-4xl">
        {value}
      </span>
    </div>
  );
}
