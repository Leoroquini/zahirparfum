"use client";

import { motion } from "motion/react";
import Image from "next/image";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      {/* CAMADA 1, Imagem mestre cinematográfica (paisagem + ingredientes + fumaça em uma só cena) */}
      <HeroMasterImage />

      {/* CAMADA 2, Gradient escurecedor suave pra legibilidade do texto sem esmagar a imagem */}
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
        <h1
          className="font-display leading-[0.95] tracking-[-0.035em] text-ink"
          style={{
            textShadow:
              "0 2px 20px rgba(244, 233, 212, 0.8), 0 0 60px rgba(244, 233, 212, 0.5)",
          }}
        >
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
                  "linear-gradient(135deg, #8C6B26 0%, #C89B3C 25%, #6B4D1F 55%, #4A3614 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter:
                  "drop-shadow(0 2px 12px rgba(244, 233, 212, 0.9)) drop-shadow(0 0 30px rgba(231, 182, 89, 0.3))",
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

        {/* Manifesto — sem caixa de fundo, só text-shadow pra legibilidade */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.7, ease: EASE_OUT }}
          className="mt-14 max-w-xl text-base leading-relaxed text-ink md:text-lg"
          style={{
            textShadow:
              "0 1px 12px rgba(244, 233, 212, 0.95), 0 0 24px rgba(244, 233, 212, 0.7)",
          }}
        >
          Perfume árabe masculino pra quem quer cheirar bem.
          <br className="hidden md:block" />{" "}
          E saber{" "}
          <em className="font-display italic text-ink">por que</em> cheira
          bem.
        </motion.p>

        {/* CTAs — estilo glass premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.1, ease: EASE_OUT }}
          className="mt-14 flex flex-col items-center gap-4 md:flex-row md:gap-5"
        >
          {/* Primário: glass bronze envelhecido (champanhe queimado) */}
          <a
            href="#ritual"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[rgba(140,107,38,0.55)] px-10 py-4 text-[11px] font-sans font-medium uppercase tracking-[0.32em] text-ink shadow-[0_10px_30px_-8px_rgba(74,54,20,0.45),inset_0_1px_0_rgba(255,243,220,0.55),inset_0_-1px_0_rgba(74,54,20,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(140,107,38,0.85)] hover:shadow-[0_14px_38px_-8px_rgba(74,54,20,0.6),inset_0_1px_0_rgba(255,243,220,0.75),inset_0_-1px_0_rgba(74,54,20,0.2)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(214,180,120,0.42) 0%, rgba(168,128,68,0.38) 50%, rgba(120,84,38,0.45) 100%)",
            }}
          >
            {/* brilho passando no hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,243,220,0.45)] to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
            <span className="relative z-10">Fazer o Ritual</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* Secundário: glass cream translúcido com a mesma profundidade */}
          <a
            href="#catalogo"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/20 px-10 py-4 text-[11px] font-sans font-medium uppercase tracking-[0.32em] text-ink shadow-[0_8px_24px_-8px_rgba(42,42,40,0.18),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(42,42,40,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(140,107,38,0.65)] hover:shadow-[0_12px_30px_-8px_rgba(74,54,20,0.3),inset_0_1px_0_rgba(255,243,220,0.85),inset_0_-1px_0_rgba(74,54,20,0.12)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,247,240,0.45) 0%, rgba(237,229,214,0.30) 100%)",
            }}
          >
            <span className="relative z-10">Ver o Catálogo</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.45em] text-ink/75">
          Deslize
        </span>
        <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-ink/60 to-transparent" />
      </motion.div>

      {/* Assinatura vertical à esquerda */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 md:block">
        <span
          className="font-sans text-[10px] tracking-[0.5em] text-ink/70"
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
        src="/hero/hero-master.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
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
      {/* Apoio sutil pra navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream/40 to-transparent"
      />
      {/* Véu cream no centro pra dar legibilidade ao título sobre os perfumes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244, 233, 212, 0.55) 0%, rgba(244, 233, 212, 0.25) 40%, transparent 70%)",
        }}
      />
      {/* Fade de baixo pra transitar com próxima seção */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream/60 via-cream/20 to-transparent"
      />
    </>
  );
}
