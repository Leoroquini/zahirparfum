"use client";

import { motion } from "motion/react";
import Image from "next/image";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink pt-24">
      {/* CAMADA 1 — Imagem mestre cinematográfica (paisagem + ingredientes + fumaça em uma só cena) */}
      <HeroMasterImage />

      {/* CAMADA 2 — Gradient escurecedor suave pra legibilidade do texto sem esmagar a imagem */}
      <DarkeningOverlay />

      {/* Conteúdo principal */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          className="mb-10 flex items-center gap-5"
        >
          <span className="h-px w-12 bg-amber/70" />
          <span className="text-[10px] font-sans uppercase tracking-[0.55em] text-amber">
            Perfumaria Árabe · Edição Brasil
          </span>
          <span className="h-px w-12 bg-amber/70" />
        </motion.div>

        {/* Título cinematográfico */}
        <h1 className="font-display leading-[0.95] tracking-[-0.035em] text-cream">
          <RevealLine delay={0.55}>
            <span className="block text-[clamp(3.5rem,10vw,8.5rem)] font-light">
              O que fica
            </span>
          </RevealLine>
          <RevealLine delay={0.85}>
            <span
              className="block text-[clamp(3.5rem,10vw,8.5rem)] font-light italic"
              style={{
                background:
                  "linear-gradient(135deg, #F4E9D4 0%, #E7B659 25%, #C89B3C 55%, #8C6B26 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 30px rgba(231, 182, 89, 0.4)) drop-shadow(0 2px 8px rgba(200, 155, 60, 0.25))",
              }}
            >
              depois
            </span>
          </RevealLine>
          <RevealLine delay={1.15}>
            <span className="block text-[clamp(3.5rem,10vw,8.5rem)] font-light">
              que você passa<span className="text-amber">.</span>
            </span>
          </RevealLine>
        </h1>

        {/* Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.7, ease: EASE_OUT }}
          className="mt-14 max-w-xl text-base leading-relaxed text-cream/60 md:text-lg"
        >
          Perfume árabe pro homem brasileiro que quer cheirar bem —
          <br className="hidden md:block" />{" "}
          e saber{" "}
          <em className="font-display italic text-cream/90">por que</em> cheira
          bem.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.1, ease: EASE_OUT }}
          className="mt-14 flex flex-col items-center gap-4 md:flex-row md:gap-5"
        >
          <a
            href="#ritual"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber px-9 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright"
          >
            <span className="relative z-10">Fazer o Ritual</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#catalogo"
            className="inline-flex items-center gap-3 rounded-full border border-cream/20 px-9 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream transition-all duration-500 hover:border-amber hover:text-amber"
          >
            Ver o Catálogo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.45em] text-cream/40">
          Deslize
        </span>
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-cream/60 to-transparent"
        />
      </motion.div>

      {/* Assinatura vertical à esquerda */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 md:block">
        <span
          className="font-sans text-[10px] tracking-[0.5em] text-cream/30"
          style={{ writingMode: "vertical-rl" }}
        >
          ZAHIR · 2026
        </span>
      </div>
    </section>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE_OUT }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------- Imagem mestre cinematográfica ---------------- */
/**
 * Imagem única integrada contendo paisagem + ingredientes + fumaça dourada
 * + luz volumétrica em uma só composição. Substituir `/hero/hero-master.png`
 * quando Leo gerar a imagem mestre no Gemini/MidJourney.
 *
 * Fallback temporário: `/hero/landscape.png` (só a paisagem, sem still life).
 */
function HeroMasterImage() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 3, ease: EASE_OUT }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        src="/hero/landscape.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: "saturate(1.08) contrast(1.03)" }}
      />
    </motion.div>
  );
}

/* ---------------- Gradient escurecedor suave ---------------- */
/**
 * Suave o suficiente pra legibilidade do título sem matar a imagem.
 * Concentração maior embaixo (chão) e na esquerda (contraste do texto).
 */
function DarkeningOverlay() {
  return (
    <>
      {/* Escurecimento à esquerda — onde o texto principal fica */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent"
      />
      {/* Fade de baixo — chão e CTAs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/55 to-transparent"
      />
      {/* Fade do topo — apoia o navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent"
      />
    </>
  );
}

