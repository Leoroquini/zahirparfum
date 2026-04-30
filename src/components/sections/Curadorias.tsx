"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CURADORIAS, countOf, type Curadoria } from "@/data/curadorias";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export function CuradoriasSection({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  return (
    <section id="curadorias"
      className="section-veil-light relative border-t border-ink/5 px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        {!hideIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Curadorias
            </span>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Agrupadas por{" "}
              <em className="italic text-amber/90">momento.</em>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Recortes curados pra escolher pelo contexto, primeira compra,
              trabalho, inverno, encontro, verão à noite. Cada curadoria puxa
              do catálogo automaticamente.
            </p>
          </motion.div>
        )}

        <div className={`${hideIntro ? "" : "mt-16 "}grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8`}>
          {CURADORIAS.map((c, i) => (
            <CuradoriaCard key={c.id} curadoria={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CuradoriaCard({
  curadoria,
  index,
}: {
  curadoria: Curadoria;
  index: number;
}) {
  const count = countOf(curadoria);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
    >
      <Link
        href={`/curadoria/${curadoria.id}`}
        className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm border border-ink/10 p-7 shadow-editorial transition-all duration-700 hover:-translate-y-1 hover:border-amber/50 hover:shadow-product md:p-8"
      >
        {/* Foto de capa */}
        <Image
          src={curadoria.foto}
          alt={`Curadoria ${curadoria.titulo}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        />

        {/* Vinheta no topo (leve) + rodape (densa) pra preservar a foto cinematografica */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-ink/55 via-ink/15 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink/95 via-ink/55 to-transparent"
        />

        {/* Glow âmbar no hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(200,155,60,0.18) 0%, transparent 60%)",
          }}
        />

        {/* Top, subtítulo + count */}
        <div className="relative flex items-start justify-between gap-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/95">
            {curadoria.subtitulo}
          </span>
          <span className="rounded-full border border-cream/30 bg-ink/40 px-2.5 py-0.5 text-[10px] font-sans tabular-nums text-cream/90 backdrop-blur-sm">
            {count}
          </span>
        </div>

        {/* Bottom, título + descrição */}
        <div className="relative flex flex-col gap-3">
          <h3 className="font-display text-3xl font-light leading-[1.05] text-cream transition-colors duration-500 group-hover:text-amber-bright md:text-4xl">
            {curadoria.titulo}
          </h3>
          <p className="text-sm leading-relaxed text-cream/85">
            {curadoria.descricaoHome}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-all duration-500 group-hover:gap-3">
            Ver curadoria
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
