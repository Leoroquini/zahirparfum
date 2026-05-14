import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CatalogoGrid } from "@/components/sections/CatalogoGrid";
import { CATALOGO } from "@/data/catalogo";
import { filtrarPorGenero } from "@/lib/genero";

export const metadata: Metadata = {
  title: "Catálogo · Para Ela",
  description:
    "Curadoria de perfumes árabes femininos. Florais, gourmands, orientais — fichas técnicas, comparação com designers, decants disponíveis.",
};

export default function CatalogoElaPage() {
  const catalogoFeminino = filtrarPorGenero(CATALOGO, "feminino");
  const familiasFem = Array.from(
    new Set(
      catalogoFeminino
        .map((p) => p.familia)
        .filter((f): f is string => Boolean(f)),
    ),
  );
  const marcasFem = Array.from(
    new Set(
      catalogoFeminino
        .map((p) => p.marca)
        .filter((m): m is string => Boolean(m)),
    ),
  );

  return (
    <>
      <PageHero
        eyebrow="Catálogo · Para Ela"
        titulo={
          <>
            Cada uma com uma{" "}
            <em className="italic text-amber/90">história.</em>
          </>
        }
        descricao="Perfumes árabes femininos selecionados pra quem está começando e pra quem já coleciona. Notas explicadas, comparação com designers conhecidos, decants disponíveis nos principais."
        backgroundGradient="radial-gradient(ellipse at 70% 30%, rgba(212,165,116,0.18), transparent 60%)"
      />

      {/* Meta rápida — usa counts da coleção feminina */}
      <section className="section-veil-light border-b border-ink/5 px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 text-center md:grid-cols-4 md:text-left">
          <MetaStat
            label="Fragrâncias"
            value={catalogoFeminino.length.toString()}
          />
          <MetaStat label="Famílias" value={familiasFem.length.toString()} />
          <MetaStat label="Casas árabes" value={marcasFem.length.toString()} />
          <MetaStat label="Curadoria" value="Feminino" />
        </div>
      </section>

      <CatalogoGrid hideIntro mundo="ela" />

      {catalogoFeminino.length === 0 && (
        <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <span className="font-display text-5xl italic text-amber/40">∅</span>
            <h2 className="font-display text-3xl font-light text-ink md:text-4xl">
              Catálogo feminino{" "}
              <em className="italic text-amber/90">chegando.</em>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-ink/75 md:text-base">
              A curadoria feminina está sendo montada. Cadastre seu e-mail na
              home pra ser a primeira a saber quando entrar.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
        {label}
      </span>
      <span className="font-display text-3xl font-light text-ink md:text-4xl">
        {value}
      </span>
    </div>
  );
}
