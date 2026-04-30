import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { NOTAS, perfumesDa } from "@/data/notas";

export const metadata: Metadata = {
  title: "Notas-assinatura",
  description:
    "As 4 notas olfativas que definem o DNA da ZAHIR PARFUMS: Oud, Âmbar, Orquídea Brasileira e Rosa Damascena. Origem, história e fragrâncias que carregam cada uma.",
};

export default function NotasPage() {
  return (
    <>
      <PageHero
        eyebrow="Notas-assinatura"
        titulo={
          <>
            As quatro notas que definem{" "}
            <em className="italic text-amber/90">a casa.</em>
          </>
        }
        descricao="Oud, Âmbar, Orquídea Brasileira e Rosa Damascena, os quatro ingredientes que traduzem nosso DNA: a tradição árabe (oud, âmbar, rosa damascena) encontrando a identidade brasileira (orquídea). Cada nota tem sua história, origem e conjunto de fragrâncias no catálogo."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.12), transparent 60%)"
      />

      <section className="section-veil-light px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {NOTAS.map((nota) => {
              const count = perfumesDa(nota).length;
              return (
                <Link
                  key={nota.id}
                  href={`/nota/${nota.id}`}
                  className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-sm border border-ink/10 p-6 transition-all duration-700 hover:border-amber/50 hover:shadow-[0_0_60px_rgba(200,155,60,0.15)] md:p-8"
                >
                  <Image
                    src={nota.foto}
                    alt={nota.nome}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />

                  {/* Escurecimento */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/40"
                  />

                  {/* Glow âmbar no hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 60%, rgba(200,155,60,0.18) 0%, transparent 60%)",
                    }}
                  />

                  {/* Topo */}
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/90">
                      Nota-assinatura
                    </span>
                    <span className="rounded-full border border-ink/20 px-2.5 py-0.5 text-[10px] font-sans tabular-nums text-ink/80 backdrop-blur-sm">
                      {count}
                    </span>
                  </div>

                  {/* Rodapé */}
                  <div className="relative flex flex-col gap-2">
                    <h2 className="font-display text-4xl font-light leading-[1.05] text-ink transition-colors duration-500 group-hover:text-amber-bright md:text-5xl">
                      {nota.nome}
                    </h2>
                    <span className="font-display text-base italic text-amber/80 md:text-lg">
                      {nota.subtitulo}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-all duration-500 group-hover:gap-3">
                      Explorar
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
