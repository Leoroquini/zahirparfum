"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CURADORIAS, countOf, type Curadoria } from "@/data/curadorias";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão compacta das curadorias pra home — só 3 cards.
 * Seleciona os 3 de maior intenção de conversão:
 * começar-certo, clones-imbativeis, sob-150.
 * CTA manda pra /curadorias (as 6 completas).
 */
const IDS_DESTAQUE = ["comecar-certo", "clones-imbativeis", "sob-250"];

export function CuradoriasHighlight() {
  const destaques = CURADORIAS.filter((c) => IDS_DESTAQUE.includes(c.id)).sort(
    (a, b) => IDS_DESTAQUE.indexOf(a.id) - IDS_DESTAQUE.indexOf(b.id)
  );

  return (
    <section
      id="curadorias"
      className="relative border-t border-cream/5 bg-ink-soft px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex max-w-2xl flex-col gap-5">
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Curadorias
            </span>
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
              Pra escolher pelo{" "}
              <em className="italic text-amber/90">contexto certo.</em>
            </h2>
            <p className="text-base leading-relaxed text-cream/60 md:text-lg">
              Três recortes pra facilitar sua decisão — começar certo, clones
              imbatíveis e sob R$ 150. Tem mais 3 na página de curadorias.
            </p>
          </div>

          <Link
            href="/curadorias"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink md:self-end"
          >
            Ver todas as curadorias
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Grid de 3 destaques em linha única */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {destaques.map((c, i) => (
            <CuradoriaCardCompacto key={c.id} curadoria={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CuradoriaCardCompacto({
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
        delay: index * 0.1,
        ease: EASE_OUT,
      }}
    >
      <Link
        href={`/curadoria/${curadoria.id}`}
        className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm border border-cream/10 p-6 transition-all duration-700 hover:border-amber/50 hover:shadow-[0_0_50px_rgba(200,155,60,0.15)] md:aspect-[3/4] md:p-7"
      >
        {/* Foto de capa */}
        <Image
          src={curadoria.foto}
          alt={`Curadoria ${curadoria.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        />

        {/* Vinheta */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/40"
        />

        {/* Glow no hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(200,155,60,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Top */}
        <div className="relative flex items-start justify-between gap-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/90">
            {curadoria.subtitulo}
          </span>
          <span className="rounded-full border border-cream/20 px-2.5 py-0.5 text-[10px] font-sans tabular-nums text-cream/80 backdrop-blur-sm">
            {count}
          </span>
        </div>

        {/* Bottom */}
        <div className="relative flex flex-col gap-3">
          <h3 className="font-display text-2xl font-light leading-[1.05] text-cream transition-colors duration-500 group-hover:text-amber-bright md:text-3xl">
            {curadoria.titulo}
          </h3>
          <span className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-all duration-500 group-hover:gap-3">
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
