import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NOTAS, getNota, perfumesDa } from "@/data/notas";
import { PerfumeCard } from "@/components/ui/PerfumeCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return NOTAS.map((n) => ({ slug: n.id }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) return { title: "Nota não encontrada" };
  return {
    title: `${nota.nome}, ${nota.subtitulo}`,
    description: `Tudo sobre a nota de ${nota.nome}: origem, história, perfil olfativo, e todos os perfumes do catálogo ZAHIR que contêm essa nota.`,
  };
}

export default async function NotaPage({ params }: Props) {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) notFound();

  const perfumes = perfumesDa(nota);

  return (
    <article className="relative">
      {/* Hero da nota */}
      <section className="section-veil-light relative flex min-h-[60vh] items-end overflow-hidden border-b border-ink/5 px-6 pb-14 pt-32 md:min-h-[70vh] md:px-12 md:pb-20 md:pt-40">
        <Image
          src={nota.foto}
          alt={nota.nome}
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Escurecimento à esquerda pro texto + fade rodapé */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/30"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[1440px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Notas", href: "/notas" },
              { label: nota.nome },
            ]}
          />

          <div className="mt-8 flex flex-col gap-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Nota olfativa
            </span>
            <h1 className="max-w-4xl font-display text-5xl font-light leading-[1] tracking-tight text-ink md:text-7xl lg:text-8xl">
              {nota.nome}
            </h1>
            <p className="max-w-3xl font-display text-xl italic leading-relaxed text-amber/85 md:text-2xl">
              {nota.subtitulo}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/70">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-ink/75">
                  Origem
                </span>
                <span>{nota.origem}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-ink/75">
                  Paleta
                </span>
                <span>{nota.paleta}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-ink/75">
                  No catálogo
                </span>
                <span>
                  {perfumes.length}{" "}
                  {perfumes.length === 1 ? "fragrância" : "fragrâncias"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo editorial */}
      <section className="section-veil-light px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          <BlocoEditorial titulo="O que é" conteudo={nota.conteudo.oQueE} />
          <BlocoEditorial titulo="De onde vem" conteudo={nota.conteudo.deOndeVem} />
          <BlocoEditorial titulo="História" conteudo={nota.conteudo.historia} />
          <BlocoEditorial titulo="Perfil olfativo" conteudo={nota.conteudo.perfil} />
          <BlocoEditorial
            titulo="Como identificar"
            conteudo={nota.conteudo.comoIdentificar}
          />
          {nota.conteudo.curiosidade && (
            <div className="rounded-sm border border-amber/25 bg-amber/5 p-6 md:p-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                Curiosidade
              </span>
              <p className="mt-3 font-display text-base font-light italic leading-relaxed text-ink/85 md:text-lg">
                {nota.conteudo.curiosidade}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Grid de perfumes com essa nota */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
              No catálogo ZAHIR
            </span>
            <h2 className="max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
              Fragrâncias que carregam{" "}
              <em className="italic text-amber/90">
                {nota.nome.toLowerCase()}
              </em>
            </h2>
          </div>

          {perfumes.length === 0 ? (
            <p className="mt-14 max-w-md text-sm italic text-ink/70">
              Nenhuma fragrância do catálogo atual tem essa nota declarada.
              Volte em breve, a curadoria cresce toda semana.
            </p>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {perfumes.map((p, i) => (
                <PerfumeCard key={p.id} perfume={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Outras notas */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Outras notas-assinatura
          </span>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {NOTAS.filter((n) => n.id !== nota.id).map((outra) => (
              <li key={outra.id}>
                <Link
                  href={`/nota/${outra.id}`}
                  className="group flex items-center gap-4 rounded-sm border border-ink/10 p-5 transition-all hover:border-amber/40 hover:"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10">
                    <Image
                      src={outra.foto}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
                      {outra.origem}
                    </span>
                    <span className="font-display text-lg font-light text-ink transition-colors group-hover:text-amber">
                      {outra.nome}
                    </span>
                    <span className="text-xs italic text-ink/70">
                      {outra.subtitulo}
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
    </article>
  );
}

function BlocoEditorial({
  titulo,
  conteudo,
}: {
  titulo: string;
  conteudo: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-l-2 border-amber/40 pl-6 md:pl-8">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        {titulo}
      </span>
      <p className="font-display text-base font-light leading-[1.6] text-ink/85 md:text-lg">
        {conteudo}
      </p>
    </div>
  );
}
