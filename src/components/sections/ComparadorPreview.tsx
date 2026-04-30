"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

const DESIGNER_ORIGINAL = {
  nome: "Creed Aventus",
  preco: 2400,
};

/**
 * Prévia do Comparador na home.
 * Mostra um caso icônico (Aventus × Club de Nuit Intense) com
 * diferença de preço e fidelidade. CTA manda pro comparador completo.
 */
export function ComparadorPreview() {
  const alternativa = CATALOGO.find((p) => p.id === "club-de-nuit-intense");
  if (!alternativa) return null;

  const economia = alternativa.precoVenda
    ? Math.round(
        ((DESIGNER_ORIGINAL.preco - alternativa.precoVenda) /
          DESIGNER_ORIGINAL.preco) *
          100
      )
    : 0;

  return (
    <section
      id="comparador"
      className="relative border-t border-cream/5 bg-ink-soft px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-5"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Árabe × Designer
          </span>
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
            DNA conhecido,{" "}
            <em className="italic text-amber/90">leitura árabe.</em>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
            Algumas fragrâncias árabes conversam com designers conhecidos.
            Veja um exemplo clássico da curadoria:
          </p>
        </motion.div>

        {/* Exemplo forte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
          className="mt-14 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8"
        >
          {/* Lado designer */}
          <div className="flex flex-col items-center gap-4 rounded-sm border border-cream/10 bg-ink/50 p-8 text-center md:p-10">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-cream/45">
              Designer
            </span>
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-cream/10 bg-ink/70">
              <span className="font-display text-4xl italic text-cream/60">
                {DESIGNER_ORIGINAL.nome.split(" ").map((w) => w[0]).join("")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-light text-cream md:text-3xl">
                {DESIGNER_ORIGINAL.nome}
              </h3>
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/45">
                Preço de boutique
              </span>
              <span className="mt-1 font-display text-4xl font-light text-cream md:text-5xl">
                R$ {DESIGNER_ORIGINAL.preco.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Símbolo × + economia */}
          <div className="flex flex-col items-center justify-center gap-3 py-4 md:py-0">
            <span className="font-display text-5xl italic text-amber/60 md:text-7xl">
              ×
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                Economia
              </span>
              <span className="font-display text-4xl font-light text-amber md:text-5xl">
                −{economia}%
              </span>
            </div>
          </div>

          {/* Lado árabe */}
          <Link
            href={`/perfume/${alternativa.id}`}
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-sm border border-amber/30 bg-ink-muted p-8 text-center transition-all hover:border-amber md:p-10"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Alternativa árabe
            </span>
            {hasFoto(alternativa) && (
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-amber/40">
                <Image
                  src={fotoSrc(alternativa)}
                  alt={alternativa.nome}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-light text-cream transition-colors group-hover:text-amber md:text-3xl">
                {alternativa.nome}
              </h3>
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
                Referência alta · mesma família
              </span>
              <span className="mt-1 font-display text-4xl font-light text-cream md:text-5xl">
                R$ {alternativa.precoVenda}
              </span>
            </div>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <p className="max-w-xl text-sm italic text-cream/55 md:text-base">
            Tem alternativas árabes pra Sauvage, Bleu de Chanel, Le Male
            Elixir, Angel&apos;s Share, YSL Y e outros mais.
          </p>
          <Link
            href="/comparador"
            className="group mt-2 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Ver comparador completo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
