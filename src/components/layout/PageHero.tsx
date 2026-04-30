"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  eyebrow: string;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  /** Gradient de fundo opcional, combina com o contexto da página */
  backgroundGradient?: string;
};

/**
 * Hero reutilizável pras páginas dedicadas (/catalogo, /mapa, /ritual…).
 * Mantém estética da home: eyebrow em caixa alta com traço, título serif
 * grande, descrição editorial, breadcrumb pra home.
 */
export function PageHero({
  eyebrow,
  titulo,
  descricao,
  backgroundGradient,
}: Props) {
  return (
    <header className="relative overflow-hidden border-b border-ink/5 px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
      {backgroundGradient && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: backgroundGradient }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1440px]">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-ink/70 transition-colors hover:text-amber"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mt-8 flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            {eyebrow}
          </span>

          <h1 className="max-w-5xl font-display text-5xl font-light leading-[1.02] tracking-tight text-ink md:text-7xl lg:text-8xl">
            {titulo}
          </h1>

          {descricao && (
            <p className="max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">
              {descricao}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
