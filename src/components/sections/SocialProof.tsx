"use client";

import { motion } from "motion/react";
import { DEPOIMENTOS } from "@/data/depoimentos";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção de social proof com depoimentos editoriais.
 * Usa os 6 depoimentos do data/ — alterna entre descobridor
 * e colecionador pra cobrir as 2 personas.
 *
 * Marcado com badge "Beta · pré-lançamento" pra transparência.
 */
export function SocialProof() {
  return (
    <section className="relative border-t border-cream/5 bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
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
              Quem testou antes
            </span>
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
              Vozes do{" "}
              <em className="italic text-amber/90">pré-lançamento.</em>
            </h2>
            <p className="text-base leading-relaxed text-cream/60 md:text-lg">
              Seis pessoas que provaram a curadoria antes de abrir oficialmente.
              Duas personas — descobridor (primeira compra) e colecionador
              (já tem várias). Sem roteiro, sem filtro.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full border border-amber/30 bg-amber/5 px-3 py-1.5 text-[9px] font-sans uppercase tracking-[0.35em] text-amber md:self-end">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Beta pré-lançamento
          </span>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <motion.blockquote
              key={d.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: Math.min(i * 0.08, 0.4),
                ease: EASE_OUT,
              }}
              className="flex flex-col gap-5 rounded-sm border border-cream/10 bg-ink-soft p-6 md:p-7"
            >
              <span
                aria-hidden
                className="font-display text-3xl italic leading-none text-amber/50"
              >
                &ldquo;
              </span>
              <p className="flex-1 font-display text-base font-light leading-[1.55] text-cream/85 md:text-lg">
                {d.texto}
              </p>
              <footer className="mt-auto flex items-baseline gap-3 border-t border-cream/5 pt-4">
                <span className="font-display text-lg italic text-cream">
                  {d.nome}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/70">
                  {d.contexto}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
