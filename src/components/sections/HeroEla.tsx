"use client";

import { motion } from "motion/react";
import Image from "next/image";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero da home feminina /ela.
 *
 * Espelha estrutura do Hero masculino mas com:
 * - Paleta rosé-champanhe nos detalhes (mantém amber base da marca)
 * - Copy adaptada ao universo feminino árabe (envolvente, sedutor)
 * - Eyebrow "Edição Feminina" no lugar de "Edição Brasil"
 * - Manifesto curto: "Perfume árabe pra mulher que decide o que fica."
 *
 * Imagem mestre: /hero/hero-master-ela.jpg
 * Quando Leo gerar imagem feminina, substituir o `src` em HeroMasterImageEla.
 * Por enquanto fica fallback gradient + tipografia (sem imagem).
 */
export function HeroEla() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
      <HeroMasterImageEla />
      <DarkeningOverlayEla />

      <div className="relative z-10 ml-auto flex w-full max-w-[680px] flex-col items-start px-6 text-left md:mr-12 md:px-12 lg:mr-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-amber/70" />
          <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
            Perfumaria Árabe · Edição Feminina
          </span>
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
                // Gradiente rosé-amber feminino (vs bourbon-amber masculino)
                background:
                  "linear-gradient(135deg, #B07A52 0%, #D4A574 25%, #8C6B26 55%, #4A1518 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter:
                  "drop-shadow(0 2px 12px rgba(244, 233, 212, 0.9)) drop-shadow(0 0 30px rgba(212, 165, 116, 0.35))",
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
          className="mt-14 max-w-xl text-base leading-relaxed text-ink md:text-lg"
          style={{
            textShadow:
              "0 1px 12px rgba(244, 233, 212, 0.95), 0 0 24px rgba(244, 233, 212, 0.7)",
          }}
        >
          Perfume árabe pra mulher que sabe que cheirar bem
          <br className="hidden md:block" />{" "}
          não é só borrifar e sair —{" "}
          <em className="font-display italic text-ink">
            é decidir o que fica depois.
          </em>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.1, ease: EASE_OUT }}
          className="mt-14 flex flex-col items-center gap-4 md:flex-row md:gap-5"
        >
          {/* Primário rosé glass */}
          <a
            href="#ritual"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[rgba(176,122,82,0.55)] px-10 py-4 text-[11px] font-sans font-medium uppercase tracking-[0.32em] text-ink shadow-[0_10px_30px_-8px_rgba(74,21,24,0.4),inset_0_1px_0_rgba(255,243,220,0.55),inset_0_-1px_0_rgba(74,21,24,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(176,122,82,0.85)] hover:shadow-[0_14px_38px_-8px_rgba(74,21,24,0.55),inset_0_1px_0_rgba(255,243,220,0.75),inset_0_-1px_0_rgba(74,21,24,0.2)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(220,180,140,0.42) 0%, rgba(195,140,110,0.38) 50%, rgba(140,80,68,0.42) 100%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,243,220,0.45)] to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
            <span className="relative z-10">Fazer o Ritual</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* Secundário cream */}
          <a
            href="#catalogo"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/20 px-10 py-4 text-[11px] font-sans font-medium uppercase tracking-[0.32em] text-ink shadow-[0_8px_24px_-8px_rgba(42,42,40,0.18),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(42,42,40,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(176,122,82,0.65)] hover:shadow-[0_12px_30px_-8px_rgba(74,21,24,0.3),inset_0_1px_0_rgba(255,243,220,0.85),inset_0_-1px_0_rgba(74,21,24,0.12)]"
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

      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 md:block">
        <span
          className="font-sans text-[10px] tracking-[0.5em] text-ink/70"
          style={{ writingMode: "vertical-rl" }}
        >
          ZAHIR · ELA · 2026
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

/**
 * Imagem mestre feminina. Quando Leo gerar /hero/hero-master-ela.jpg
 * (equivalente feminina do hero masculino: paisagem árabe + ingredientes
 * em codificação feminina — pétalas de rosa, mel, dourado-rosé),
 * o componente automaticamente usa.
 *
 * Por ora: gradient + textura sutil de luz, sem imagem.
 */
function HeroMasterImageEla() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 3, ease: EASE_OUT }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Image
        src="/hero/hero-ela-v2.webp"
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

function DarkeningOverlayEla() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream/40 to-transparent"
      />
      {/* Véu cream concentrado no lado direito (atrás do texto) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 80% 50%, rgba(244, 233, 212, 0.55) 0%, rgba(244, 233, 212, 0.2) 50%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream/60 via-cream/20 to-transparent"
      />
    </>
  );
}
