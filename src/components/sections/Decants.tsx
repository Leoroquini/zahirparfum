"use client";

import { motion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export function Decants({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  return (
    <section id="decants"
      className="section-veil-light relative border-t border-ink/5 px-6 py-28 md:px-12 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-24">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            {!hideIntro && (
              <>
                <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                  <span className="h-px w-8 bg-amber" />
                  Decants
                </span>
                <h2 className="max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                  Você lembra do cheiro de quem te marcou.{" "}
                  <em className="italic text-amber/90">
                    Quem te encontra hoje, lembra do seu?
                  </em>
                </h2>
              </>
            )}
            {hideIntro && (
              <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-4xl">
                <em className="italic text-amber/90">Como funciona.</em>
              </h2>
            )}
            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
              Decant é como o cheiro vira o seu antes de virar gasto. Cinco ou
              dez mililitros do mesmo perfume original, tempo pra ele se
              misturar com a sua pele e mudar de personalidade ao longo do
              dia.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
              Quando alguém te abraça e pergunta{" "}
              <em className="italic text-ink">&ldquo;que perfume é esse?&rdquo;</em>,
              você já testou todos os finais.
            </p>

            <ul className="mt-4 flex flex-col gap-3 border-l-2 border-amber/30 pl-5">
              <li className="text-sm text-ink/75">
                <span className="font-display italic text-amber">·</span>{" "}
                Mesmo líquido, mesma origem, só muda a quantidade
              </li>
              <li className="text-sm text-ink/75">
                <span className="font-display italic text-amber">·</span>{" "}
                Frasco próprio com atomizador spray
              </li>
              <li className="text-sm text-ink/75">
                <span className="font-display italic text-amber">·</span>{" "}
                Disponível nos principais perfumes do catálogo
              </li>
            </ul>

            <Link
              href="/decants"
              className="group mt-6 inline-flex items-center gap-3 self-start rounded-full border border-amber/50 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-ink"
            >
              Conhecer os decants
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          {/* Visualização, 3 frascos SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="flex items-end justify-center gap-8 md:gap-12"
          >
            <FrascoSVG label="5ml" subtitle="A partir de R$ 25" height={160} delay={0.3} />
            <FrascoSVG label="10ml" subtitle="A partir de R$ 40" height={220} delay={0.5} highlight />
            <FrascoSVG label="100ml" subtitle="Frasco cheio" height={300} delay={0.7} dim />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FrascoSVG({
  label,
  subtitle,
  height,
  delay,
  highlight = false,
  dim = false,
}: {
  label: string;
  subtitle: string;
  height: number;
  delay: number;
  highlight?: boolean;
  dim?: boolean;
}) {
  const width = height * 0.4;
  const neckHeight = height * 0.18;
  const bodyHeight = height - neckHeight;
  const capHeight = height * 0.08;
  const liquidFillPercent = 0.85; // frasco cheio visual

  const strokeColor = highlight ? "#E7B659" : dim ? "#6E5B36" : "#8C6B26";
  const fillColor = highlight
    ? "rgba(231,182,89,0.3)"
    : dim
    ? "rgba(140,107,60,0.12)"
    : "rgba(200,155,60,0.18)";
  const liquidColor = highlight
    ? "rgba(231,182,89,0.65)"
    : dim
    ? "rgba(140,107,60,0.35)"
    : "rgba(200,155,60,0.5)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      className="flex flex-col items-center gap-3"
    >
      <svg
        width={width + 20}
        height={height + capHeight + 10}
        viewBox={`0 0 ${width + 20} ${height + capHeight + 10}`}
      >
        <defs>
          <linearGradient id={`liq-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={liquidColor} stopOpacity="0.4" />
            <stop offset="1" stopColor={liquidColor} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Cap */}
        <rect
          x={10 + width * 0.3}
          y={0}
          width={width * 0.4}
          height={capHeight}
          fill="#2a1810"
          stroke={strokeColor}
          strokeWidth="1"
          rx="1"
        />

        {/* Neck */}
        <rect
          x={10 + width * 0.38}
          y={capHeight}
          width={width * 0.24}
          height={neckHeight}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1"
        />

        {/* Body */}
        <rect
          x={10}
          y={capHeight + neckHeight}
          width={width}
          height={bodyHeight}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          rx="2"
        />

        {/* Liquid fill animation */}
        <motion.rect
          x={10 + 2}
          y={capHeight + neckHeight + bodyHeight * (1 - liquidFillPercent) + 2}
          width={width - 4}
          height={bodyHeight * liquidFillPercent - 4}
          fill={`url(#liq-${label})`}
          rx="1"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: EASE_OUT }}
          style={{ transformOrigin: "bottom" }}
        />

        {/* Shine */}
        <rect
          x={10 + width * 0.12}
          y={capHeight + neckHeight + bodyHeight * 0.1}
          width={width * 0.06}
          height={bodyHeight * 0.6}
          fill="rgba(255,255,255,0.18)"
          rx="1"
        />
      </svg>

      <div className="flex flex-col items-center gap-0.5">
        <span
          className={`font-display text-xl ${
            highlight ? "text-amber" : dim ? "text-ink/75" : "text-ink"
          }`}
        >
          {label}
        </span>
        <span
          className={`text-[10px] font-sans uppercase tracking-[0.3em] ${
            highlight
              ? "text-amber/80"
              : dim
              ? "text-ink/75"
              : "text-ink/75"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
