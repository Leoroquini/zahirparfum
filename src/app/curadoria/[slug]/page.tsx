import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CURADORIAS, getCuradoria, perfumesDa } from "@/data/curadorias";
import { PerfumeCard } from "@/components/ui/PerfumeCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BRAND } from "@/lib/brand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CURADORIAS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const curadoria = getCuradoria(slug);
  if (!curadoria) return { title: "Curadoria não encontrada" };
  return {
    title: curadoria.titulo,
    description: `${curadoria.descricaoHome} Curadoria ${BRAND.fullName}.`,
  };
}

export default async function CuradoriaPage({ params }: Props) {
  const { slug } = await params;
  const curadoria = getCuradoria(slug);
  if (!curadoria) notFound();

  const perfumes = perfumesDa(curadoria);

  return (
    <article className="relative">
      {/* Hero da curadoria */}
      <section
        className="relative flex min-h-[55vh] items-end overflow-hidden border-b border-cream/5 px-6 pb-12 pt-32 md:min-h-[65vh] md:px-12 md:pb-16 md:pt-40"
      >
        <Image
          src={curadoria.foto}
          alt={`Curadoria ${curadoria.titulo}`}
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/40"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/75 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[1440px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Curadorias", href: "/curadorias" },
              { label: curadoria.titulo },
            ]}
          />

          <span className="mt-8 block text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            {curadoria.subtitulo} · Curadoria
          </span>
          <h1 className="mt-4 font-display text-5xl font-light leading-[1] tracking-tight text-cream md:text-7xl lg:text-8xl">
            {curadoria.titulo}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            {curadoria.descricaoPage}
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs text-cream/60">
            <span className="font-display text-2xl italic text-amber">
              {perfumes.length}
            </span>
            <span>
              {perfumes.length === 1 ? "fragrância" : "fragrâncias"} nesta
              curadoria
            </span>
          </div>
        </div>
      </section>

      {/* Grid da curadoria */}
      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          {perfumes.length === 0 ? (
            <p className="mx-auto max-w-md text-center text-sm italic text-cream/50">
              Nenhuma fragrância do catálogo atual encaixa nesse recorte no
              momento. Volte em breve — novas casas entram toda semana.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {perfumes.map((p, i) => (
                <PerfumeCard key={p.id} perfume={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rodapé — outras curadorias */}
      <section className="border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Outras curadorias
          </span>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CURADORIAS.filter((c) => c.id !== curadoria.id).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/curadoria/${c.id}`}
                  className="group flex flex-col gap-2 rounded-sm border border-cream/10 p-5 transition-all hover:border-amber/40 hover:bg-ink"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
                    {c.subtitulo}
                  </span>
                  <span className="font-display text-xl font-light text-cream transition-colors group-hover:text-amber/95">
                    {c.titulo}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
