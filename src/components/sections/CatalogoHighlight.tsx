"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMemo } from "react";
import { CATALOGO } from "@/data/catalogo";
import { PerfumeCard } from "@/components/ui/PerfumeCard";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão compacta do catálogo pra home — só 4 cards em destaque.
 * Seleciona perfumes marcados com `destaque` (mais-pedido, novidade,
 * curadoria) + fallback pros primeiros 4 do catálogo.
 * CTA manda pro catálogo completo.
 */
export function CatalogoHighlight() {
  const destaques = useMemo(() => {
    const comDestaque = CATALOGO.filter((p) => p.destaque);
    const pool = comDestaque.length >= 4 ? comDestaque : CATALOGO;
    return pool.slice(0, 4);
  }, []);

  return (
    <section
      id="catalogo"
      className="relative border-t border-cream/5 bg-ink px-6 py-24 md:px-12 md:py-32"
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
              Catálogo
            </span>
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
              Alguns dos{" "}
              <em className="italic text-amber/90">favoritos da casa.</em>
            </h2>
            <p className="text-base leading-relaxed text-cream/60 md:text-lg">
              Uma amostra da curadoria. O catálogo inteiro tem{" "}
              {CATALOGO.length} fragrâncias com filtros, busca e comparação
              direta árabe × designer.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink md:self-end"
          >
            Ver catálogo completo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Grid de 4 destaques */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((perfume, index) => (
            <PerfumeCard key={perfume.id} perfume={perfume} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
