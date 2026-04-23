"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão curta do manifesto pra home.
 * Só a frase-manifesto + um parágrafo + CTA "Ler manifesto completo".
 * Versão completa vive em /manifesto.
 */
export function ManifestoPreview() {
  return (
    <section
      id="manifesto-preview"
      className="relative overflow-hidden border-t border-cream/5 bg-ink-soft px-6 py-28 md:px-12 md:py-36"
    >
      {/* Background sutil com a imagem de ingredientes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15">
        <Image
          src="/hero/ingredients.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "blur(40px) brightness(0.35) saturate(0.7)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft via-ink-soft/80 to-ink-soft"
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col items-center gap-8"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Manifesto
            <span className="h-px w-8 bg-amber" />
          </span>

          <h2 className="max-w-4xl font-display text-4xl font-light leading-[1.02] tracking-tight text-cream md:text-6xl lg:text-7xl">
            Perfume é{" "}
            <em className="italic text-amber/90">memória</em>
            <br />
            que não se vê.
          </h2>

          <p className="max-w-2xl font-display text-lg font-light leading-[1.55] text-cream/75 md:text-xl">
            Não somos mais um catálogo com desconto piscando. Somos a loja que
            ensina o homem brasileiro a escolher perfume com informação — e a
            escrever seu rastro no ar com as letras certas.
          </p>

          <Link
            href="/manifesto"
            className="group mt-4 inline-flex items-center gap-3 rounded-full border border-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
          >
            Ler manifesto completo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
