"use client";

import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

export function PerfumePyramid({ topo, coracao, fundo }: Props) {
  const hasAny = topo.length + coracao.length + fundo.length > 0;
  if (!hasAny) return null;

  return (
    <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16 lg:gap-20">
      {/* SVG pyramid */}
      <div className="relative flex items-start justify-center md:justify-start">
        <PyramidSVG />
      </div>

      {/* Layers com notas */}
      <div className="flex flex-col gap-10">
        <Layer
          label="Topo"
          subtitle="primeira impressão · 3–15 min"
          notas={topo}
          delay={0.2}
          color="bright"
        />
        <Layer
          label="Coração"
          subtitle="a assinatura · 20 min – 4 h"
          notas={coracao}
          delay={0.4}
          color="mid"
        />
        <Layer
          label="Fundo"
          subtitle="o que fica · 4 h+"
          notas={fundo}
          delay={0.6}
          color="deep"
        />
      </div>
    </div>
  );
}

/* ---------------- SVG Piramide ---------------- */

function PyramidSVG() {
  return (
    <motion.svg
      viewBox="0 0 240 280"
      className="h-72 w-60 md:h-80 md:w-72"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <defs>
        <linearGradient id="pyr-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4E9D4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E7B659" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="pyr-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7B659" stopOpacity="0.45" />
          <stop offset="1" stopColor="#C89B3C" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="pyr-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C89B3C" stopOpacity="0.4" />
          <stop offset="1" stopColor="#4A1518" stopOpacity="0.3" />
        </linearGradient>
        <filter id="pyr-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Piramide — 3 trapézios empilhados, topo menor, base maior */}
      {/* Topo (triângulo) */}
      <motion.path
        d="M120,20 L155,85 L85,85 Z"
        fill="url(#pyr-top)"
        stroke="#E7B659"
        strokeWidth="1.2"
        filter="url(#pyr-glow)"
        variants={{
          hidden: { opacity: 0, pathLength: 0 },
          visible: { opacity: 1, pathLength: 1 },
        }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
      {/* Coração (trapézio meio) */}
      <motion.path
        d="M85,85 L155,85 L180,170 L60,170 Z"
        fill="url(#pyr-mid)"
        stroke="#C89B3C"
        strokeWidth="1.2"
        filter="url(#pyr-glow)"
        variants={{
          hidden: { opacity: 0, pathLength: 0 },
          visible: { opacity: 1, pathLength: 1 },
        }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE_OUT }}
      />
      {/* Fundo (trapézio base) */}
      <motion.path
        d="M60,170 L180,170 L210,258 L30,258 Z"
        fill="url(#pyr-bot)"
        stroke="#8C6B26"
        strokeWidth="1.2"
        filter="url(#pyr-glow)"
        variants={{
          hidden: { opacity: 0, pathLength: 0 },
          visible: { opacity: 1, pathLength: 1 },
        }}
        transition={{ duration: 1.1, delay: 0.8, ease: EASE_OUT }}
      />

      {/* Labels em italic */}
      <motion.text
        x="120"
        y="66"
        textAnchor="middle"
        fontSize="11"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fill="#F4E9D4"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.92 },
        }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        topo
      </motion.text>
      <motion.text
        x="120"
        y="133"
        textAnchor="middle"
        fontSize="11"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fill="#F4E9D4"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.9 },
        }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        coração
      </motion.text>
      <motion.text
        x="120"
        y="218"
        textAnchor="middle"
        fontSize="11"
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fill="#F4E9D4"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.85 },
        }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        fundo
      </motion.text>

      {/* Linhas laterais decorativas — sombras sutis embaixo */}
      <motion.line
        x1="30"
        y1="263"
        x2="210"
        y2="263"
        stroke="#C89B3C"
        strokeWidth="0.5"
        strokeOpacity="0.4"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.5 },
        }}
        transition={{ duration: 0.8, delay: 1.8 }}
      />
    </motion.svg>
  );
}

/* ---------------- Camada de notas ---------------- */

function Layer({
  label,
  subtitle,
  notas,
  delay,
  color,
}: {
  label: string;
  subtitle: string;
  notas: string[];
  delay: number;
  color: "bright" | "mid" | "deep";
}) {
  const borderColor =
    color === "bright"
      ? "border-amber-bright/60"
      : color === "mid"
      ? "border-amber/60"
      : "border-amber-dim/60";

  if (notas.length === 0) {
    return (
      <div className={`border-l-2 ${borderColor} pl-5 opacity-30`}>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-display text-2xl font-light text-cream/70">
            {label}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/60">
            {subtitle}
          </span>
        </div>
        <p className="mt-3 text-xs italic text-cream/40">não declarado</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      className={`border-l-2 ${borderColor} pl-5`}
    >
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-2xl font-light text-cream">
          {label}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
          {subtitle}
        </span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {notas.map((n, i) => (
          <motion.li
            key={n}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + 0.3 + i * 0.05,
            }}
            className="text-base text-cream/85 transition-colors hover:text-amber"
          >
            {n}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
