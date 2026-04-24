"use client";

import { motion } from "motion/react";
import { depoimentosPorPerfume } from "@/data/depoimentos";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Mostra depoimento(s) relacionados a este perfume específico, se houver.
 * Renderizado inline na página individual do produto pra reforçar decisão
 * de compra com social proof contextual.
 */
export function DepoimentoInline({ perfumeId }: { perfumeId: string }) {
  const depoimentos = depoimentosPorPerfume(perfumeId);
  if (depoimentos.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
        Voz de quem usou
      </span>

      <div className="mt-6 flex flex-col gap-4">
        {depoimentos.map((d, i) => (
          <motion.blockquote
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
            className="flex flex-col gap-4 rounded-sm border border-amber/25 bg-amber/[0.04] p-6 md:p-8"
          >
            <span
              aria-hidden
              className="font-display text-2xl italic leading-none text-amber/50"
            >
              &ldquo;
            </span>
            <p className="font-display text-lg font-light italic leading-[1.5] text-cream md:text-xl">
              {d.texto}
            </p>
            <footer className="flex items-baseline gap-3">
              <span className="font-display text-base text-cream">
                {d.nome}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
                {d.contexto} · beta
              </span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
