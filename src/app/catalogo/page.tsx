import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CatalogoGrid } from "@/components/sections/CatalogoGrid";
import { CATALOGO, FAMILIAS, MARCAS } from "@/data/catalogo";
import { NOTAS } from "@/data/notas";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Curadoria completa de perfumes árabes masculinos, fichas técnicas, clones designer, decants e filtros por família olfativa, ocasião e preço.",
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
      <section className="section-veil-light border-b border-ink/5 px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 text-center md:grid-cols-4 md:text-left">
          <MetaStat label="Fragrâncias" value={CATALOGO.length.toString()} />
          <MetaStat label="Famílias" value={FAMILIAS.length.toString()} />
          <MetaStat label="Casas árabes" value={MARCAS.length.toString()} />
          <MetaStat label="Curadoria" value="Árabe" />
        </div>
      </section>

      <CatalogoGrid hideIntro />

      {/* Explore por nota-assinatura */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Explore por nota
            </span>
            <h2 className="max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
              Caçando um cheiro{" "}
              <em className="italic text-amber/90">específico?</em>
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/75 md:text-base">
              Descubra as 4 notas que definem o DNA ZAHIR, e veja quais
              fragrâncias do catálogo carregam cada uma delas.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {NOTAS.map((nota) => (
              <li key={nota.id}>
                <Link
                  href={`/nota/${nota.id}`}
                  className="group flex items-center gap-4 rounded-sm border border-ink/10 p-4 transition-all hover:border-amber/40"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10">
                    <Image
                      src={nota.foto}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-display text-lg font-light text-ink transition-colors group-hover:text-amber">
                      {nota.nome}
                    </span>
                    <span className="truncate text-xs italic text-ink/70">
                      {nota.subtitulo}
                    </span>
                  </div>
                  <span className="text-amber opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
