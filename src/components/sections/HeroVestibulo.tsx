"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero Vestíbulo — versão da LP raiz que força escolha de mundo.
 *
 * Estrutura:
 *  - Desktop: 2 metades verticais (50/50). Hover expande pra 65/35.
 *  - Mobile: empilhado vertical, cada bloco 50vh.
 *  - Sem navbar de seções (catálogo/mapa/etc) — só logo discreto + drawer da Lista.
 *  - Logo "ZAHIR PARFUMS" no canto superior esquerdo (editorial).
 *  - Frase central no eixo entre os 2 lados como divisor visual.
 *
 * Imagens:
 *  - /public/hero/vestibulo-ela.jpg (lado esquerdo feminino)
 *  - /public/hero/vestibulo-ele.jpg (lado direito masculino)
 *  - Enquanto não tiver, usa gradient elegante como fallback.
 *
 * Acessibilidade:
 *  - `aria-label` em cada metade
 *  - `prefers-reduced-motion` zera transições
 *  - Foco visível por teclado
 */

const HAS_IMAGE_ELA = true;
const HAS_IMAGE_ELE = true;

type Lado = "ela" | "ele" | null;

export function HeroVestibulo() {
  const [hover, setHover] = useState<Lado>(null);

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Escolha entre universo feminino ou masculino"
    >
      {/* Logo discreto canto superior esquerdo */}
      <div className="pointer-events-none absolute left-6 top-6 z-30 md:left-12 md:top-10">
        <span className="block font-display text-2xl font-medium tracking-[0.32em] text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-3xl">
          ZAHIR
        </span>
        <span className="mt-1 block text-[10px] font-sans uppercase tracking-[0.45em] text-cream/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
          PARFUMS
        </span>
      </div>

      {/* Lado a lado em desktop / empilhado em mobile */}
      <div className="flex h-full w-full flex-col md:flex-row">
        <LadoMundo
          tipo="ela"
          href="/ela"
          eyebrow="Universo Feminino"
          titulo="Para ela"
          subtitulo="Pra mulher que escolhe o que fica."
          cta="Entrar para ela"
          isHovered={hover === "ela"}
          isOtherHovered={hover === "ele"}
          onEnter={() => setHover("ela")}
          onLeave={() => setHover(null)}
        />

        {/* Divisor central com frase manifesto — só desktop */}
        <DivisorCentral />

        <LadoMundo
          tipo="ele"
          href="/ele"
          eyebrow="Universo Masculino"
          titulo="Para ele"
          subtitulo="Pra homem que sabe por que escolhe."
          cta="Entrar para ele"
          isHovered={hover === "ele"}
          isOtherHovered={hover === "ela"}
          onEnter={() => setHover("ele")}
          onLeave={() => setHover(null)}
        />
      </div>
    </section>
  );
}

/* ---------------- Cada metade ---------------- */

type LadoProps = {
  tipo: "ela" | "ele";
  href: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  cta: string;
  isHovered: boolean;
  isOtherHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

function LadoMundo({
  tipo,
  href,
  eyebrow,
  titulo,
  subtitulo,
  cta,
  isHovered,
  isOtherHovered,
  onEnter,
  onLeave,
}: LadoProps) {
  const isEla = tipo === "ela";
  const hasImage = isEla ? HAS_IMAGE_ELA : HAS_IMAGE_ELE;
  const imageSrc = isEla
    ? "/hero/hero-ela-v2.webp"
    : "/hero/hero-ele-v2.webp";

  // Largura em desktop:
  //  - sem hover em nenhum: 50/50
  //  - este hover: 65%
  //  - outro hover: 35%
  const widthClass = isHovered
    ? "md:w-[65%]"
    : isOtherHovered
      ? "md:w-[35%]"
      : "md:w-1/2";

  // Brilho/saturação do lado:
  //  - este hover: full
  //  - outro hover: dimmed (lado oposto perde força visual)
  //  - nenhum: levemente atenuado (convida a interagir)
  const filterClass = isOtherHovered
    ? "brightness-[0.55] saturate-[0.75] scale-[0.97]"
    : isHovered
      ? "brightness-100 saturate-100 scale-[1.02]"
      : "brightness-[0.85] saturate-[0.9]";

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={`Entrar no universo ${isEla ? "feminino" : "masculino"} da Zahir Parfums`}
      className={`group relative block h-1/2 w-full cursor-pointer overflow-hidden outline-none transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-inset md:h-full ${widthClass} motion-reduce:transition-none`}
    >
      {/* Imagem de fundo */}
      <div
        className={`absolute inset-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${filterClass}`}
      >
        {hasImage ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover object-left"
          />
        ) : (
          <FallbackGradient lado={tipo} />
        )}
      </div>

      {/* Overlay escuro pra legibilidade — mais sutil no lado ativo, mais denso no inativo */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-[700ms] motion-reduce:transition-none ${
          isOtherHovered
            ? "bg-ink/55"
            : isHovered
              ? "bg-ink/25"
              : "bg-ink/35"
        }`}
      />

      {/* Conteúdo textual */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 text-center md:items-start md:px-12 md:pb-20 md:text-left lg:px-20">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: isEla ? 0.4 : 0.55, ease: EASE_OUT }}
          className="mb-3 text-[10px] font-sans uppercase tracking-[0.5em] text-cream/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
        >
          {eyebrow}
        </motion.span>

        {/* Título grande serif */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: isEla ? 0.6 : 0.75, ease: EASE_OUT }}
          className="font-display text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
        >
          {titulo}
        </motion.h2>

        {/* Subtítulo */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: isEla ? 0.85 : 1, ease: EASE_OUT }}
          className="mt-3 font-display text-base italic text-cream/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] md:text-lg"
        >
          {subtitulo}
        </motion.span>

        {/* Botão pill outlined — sempre visível, ganha brilho no hover */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: isEla ? 1.05 : 1.2, ease: EASE_OUT }}
          className={`mt-8 inline-flex items-center gap-3 rounded-full border px-8 py-3 text-[11px] font-sans uppercase tracking-[0.32em] text-cream backdrop-blur-sm transition-all duration-500 ease-out motion-reduce:transition-none ${
            isHovered
              ? "border-amber bg-amber/15 text-cream"
              : "border-cream/60 bg-cream/5 hover:border-cream"
          }`}
        >
          {cta}
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.span>
      </div>
    </Link>
  );
}

/* ---------------- Divisor central com frase ---------------- */

function DivisorCentral() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 md:flex"
    >
      {/* Linha vertical sutil acima */}
      <span className="block h-12 w-px bg-cream/30" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col items-center gap-2 px-6"
      >
        <span className="font-display text-[clamp(1.4rem,2.5vw,2.4rem)] font-light italic leading-tight text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]">
          Escolha o rastro
        </span>
        <span className="font-display text-[clamp(1.4rem,2.5vw,2.4rem)] font-light italic leading-tight text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]">
          que você quer{" "}
          <span className="not-italic font-normal text-amber">deixar</span>
          <span className="text-amber">.</span>
        </span>
      </motion.div>

      {/* Ornamento amber + linha abaixo */}
      <span className="block h-12 w-px bg-cream/30" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.9 }}
        className="font-display text-2xl italic text-amber/80"
      >
        ✦
      </motion.span>
    </div>
  );
}

/* ---------------- Fallback gradient (até ter imagem) ---------------- */

function FallbackGradient({ lado }: { lado: "ela" | "ele" }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          lado === "ela"
            ? // Feminino: champagne / rosé / cream
              `
              radial-gradient(ellipse 80% 60% at 30% 35%, rgba(244, 213, 200, 0.55) 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 75% 70%, rgba(212, 165, 116, 0.45) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 50% 95%, rgba(140, 80, 68, 0.3) 0%, transparent 65%),
              linear-gradient(135deg, #ead7c5 0%, #d9b89c 50%, #b58875 100%)
            `
            : // Masculino: âmbar / oud / travertino quente
              `
              radial-gradient(ellipse 80% 60% at 70% 30%, rgba(200, 155, 60, 0.4) 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 25% 70%, rgba(74, 21, 24, 0.5) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 50% 95%, rgba(42, 24, 16, 0.6) 0%, transparent 65%),
              linear-gradient(135deg, #3a2418 0%, #2a1810 50%, #1a0e08 100%)
            `,
      }}
    />
  );
}
