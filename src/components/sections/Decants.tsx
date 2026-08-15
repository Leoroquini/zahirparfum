"use client";

import { motion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção "Decants" — explica o conceito antes da oferta.
 *
 * Prop `mundo` define o destino do CTA "Conhecer os decants":
 * - "ele" / "raiz" / undefined → /decants (default, mantém comportamento atual)
 * - "ela" → /ela/decants
 */
export function Decants({
  mundo = "ele",
}: {
  /** @deprecated mantido por compat — não muda mais o layout */
  hideIntro?: boolean;
  mundo?: "ele" | "ela" | "raiz";
} = {}) {
  const decantsHref = mundo === "ela" ? "/ela/decants" : "/decants";

  return (
    <section
      id="decants"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          {/* Coluna esquerda — texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Decants
            </span>

            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Experimente antes
              <br />
              de escolher o frasco.
              <br />
              <em className="italic text-amber/90">Teste na pele.</em>
              <br />
              <em className="italic text-amber/90">
                Compare. Decida com calma.
              </em>
            </h2>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-amber/60">✦</span>
              <span className="h-px flex-1 max-w-[80px] bg-amber/30" />
            </div>

            <p className="max-w-xl text-base leading-relaxed text-ink/80 md:text-[17px]">
              O decant é o mesmo perfume original, fracionado com precisão.{" "}
              <strong className="font-medium text-ink">
                A melhor forma de sentir, testar o desempenho na sua pele e
                evitar compras às cegas.
              </strong>
            </p>

            {/* 4 bullets com ícones */}
            <ul className="mt-2 flex flex-col gap-4">
              <BulletItem
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 2v3" />
                    <path d="M9 5h6l-1 4a3 3 0 1 1-4 0z" />
                  </svg>
                }
                title="Mesmo perfume original"
                sub="Fracionado do frasco original, sem alterações."
              />
              <BulletItem
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M10 2h4v3h-4z" />
                    <path d="M9 5h6v15a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
                    <path d="M11 10h2" />
                  </svg>
                }
                title="Frasco spray prático"
                sub="Aplicação fácil, higiênica e perfeita para o dia a dia."
              />
              <BulletItem
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 2l2.4 6.9 7.6.6-5.8 5 1.8 7.5L12 18l-6 4 1.8-7.5L2 9.5l7.6-.6z" />
                  </svg>
                }
                title="Disponível nos destaques do catálogo"
                sub="Escolha entre os perfumes mais desejados."
              />
              <BulletItem
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                  </svg>
                }
                title="Ideal para testar antes do frasco cheio"
                sub="Descubra se combina com você antes de investir."
              />
            </ul>

            {/* CTAs lado a lado */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href={decantsHref}
                className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
              >
                Conhecer os decants
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
              >
                Comparar tamanhos
              </Link>
            </div>

            {/* Selo de confiança */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
              <span className="inline-flex items-center gap-2">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber"
                  aria-hidden
                >
                  <path d="M12 2 4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6z" />
                </svg>
                Compra segura
              </span>
              <span className="text-ink/30">·</span>
              <span>Originais</span>
              <span className="text-ink/30">·</span>
              <span>Envio cuidadoso</span>
            </div>
          </motion.div>

          {/* Coluna direita — 3 frascos com cards de preço */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="relative"
          >
            {/* Vinheta de luz no fundo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(231,182,89,0.18), transparent 65%)",
              }}
            />

            <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
              <FrascoColuna
                label="5ml"
                tag="Decant"
                priceLabel="Pra"
                price="Testar"
                height={170}
                tone="default"
                delay={0.3}
                footnote="Alguns dias na pele, o suficiente pra saber se é seu."
              />
              <FrascoColuna
                label="10ml"
                tag="Decant"
                priceLabel="Pra"
                price="Conhecer"
                height={220}
                tone="highlight"
                delay={0.5}
                footnote="Semanas de uso, em ocasiões diferentes."
              />
              <FrascoColuna
                label="100ml"
                tag="Versão completa"
                priceLabel="Pra"
                price="Possuir"
                height={290}
                tone="dim"
                delay={0.7}
                footnote="O frasco na estante, quando a escolha já está feita."
              />
            </div>
          </motion.div>
        </div>

        {/* Faixa de 3 passos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-1 gap-6 rounded-md border border-ink/8 bg-cream-soft/70 px-6 py-7 sm:grid-cols-3 lg:gap-10 lg:px-10"
        >
          <PassoItem
            n="1"
            titulo="Escolha o perfume"
            sub="Selecione seu favorito no catálogo."
            icon={
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M10 3h4v3h-4z" />
                <path d="M8 6h8v14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
                <path d="M10 12h4" />
              </svg>
            }
          />
          <PassoItem
            n="2"
            titulo="Teste na pele"
            sub="Sinta a evolução e o desempenho real."
            icon={
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4 0v6H4z" />
                <path d="M8 9c1-2 2-2 3 0" />
                <path d="M14 6c1-2 2-2 3 0" />
              </svg>
            }
          />
          <PassoItem
            n="3"
            titulo="Volte para o frasco ideal"
            sub="Com certeza, sem arrependimentos."
            icon={
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M10 2h4v3h-4z" />
                <path d="M7 5h10v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                <path d="M9 11h6" />
                <path d="M9 15h6" />
              </svg>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Bullet com ícone (lista da esquerda) ---------------- */

function BulletItem({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber/35 bg-amber/10 text-amber">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-ink">{title}</span>
        <span className="text-xs leading-snug text-ink/65">{sub}</span>
      </div>
    </li>
  );
}

/* ---------------- Passo da faixa ---------------- */

function PassoItem({
  n,
  titulo,
  sub,
  icon,
}: {
  n: string;
  titulo: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-sans font-bold text-cream">
        {n}
      </span>
      <span className="shrink-0 text-amber/85">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-ink">
          {titulo}
        </span>
        <span className="text-xs leading-snug text-ink/65">{sub}</span>
      </div>
    </div>
  );
}

/* ---------------- Frasco + card de preço ---------------- */

type Tone = "default" | "highlight" | "dim";

function FrascoColuna({
  label,
  tag,
  priceLabel,
  price,
  height,
  tone,
  delay,
  badge,
  footnote,
}: {
  label: string;
  tag: string;
  priceLabel: string;
  price: string;
  height: number;
  tone: Tone;
  delay: number;
  badge?: string;
  footnote?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      className="relative flex flex-col items-center gap-4"
    >
      {/* Badge MAIS PEDIDO */}
      {badge && (
        <span
          className="absolute -top-3 z-10 inline-flex items-center gap-1 rounded-full bg-amber px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-ink shadow-[0_8px_22px_-6px_rgba(140,107,38,0.55)]"
          style={{ top: -10 }}
        >
          <span aria-hidden>★</span>
          {badge}
        </span>
      )}

      <div className="relative flex w-full items-end justify-center">
        <FrascoSVG label={label} height={height} tone={tone} delay={delay} />
      </div>

      {/* Card de preço */}
      <div
        className={`flex w-full flex-col items-center gap-1 rounded-md border px-2 py-3 text-center sm:px-4 sm:py-4 ${
          tone === "highlight"
            ? "border-amber/40 bg-cream shadow-[0_10px_30px_-12px_rgba(140,107,38,0.45)]"
            : "border-ink/10 bg-cream-soft"
        }`}
      >
        <span
          className={`font-display text-2xl leading-none sm:text-3xl ${
            tone === "highlight" ? "text-ink" : "text-ink"
          }`}
        >
          {label}
        </span>
        <span className="text-[9px] font-sans uppercase tracking-[0.32em] text-ink/60">
          {tag}
        </span>
        <div className="mt-2 flex flex-col items-center gap-0.5">
          {priceLabel && (
            <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/55">
              {priceLabel}
            </span>
          )}
          <span
            className={`font-display ${
              tone === "highlight"
                ? "text-2xl text-amber sm:text-3xl"
                : "text-xl text-ink sm:text-2xl"
            }`}
          >
            {price}
          </span>
        </div>
        {footnote && (
          <p className="mt-2 hidden text-[10px] leading-snug text-ink/60 sm:block">
            {footnote}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- SVG do frasco (visual transparente) ---------------- */

function FrascoSVG({
  label,
  height,
  tone,
  delay,
}: {
  label: string;
  height: number;
  tone: Tone;
  delay: number;
}) {
  const width = height * 0.36;
  const neckHeight = height * 0.14;
  const capHeight = height * 0.1;
  const bodyHeight = height - neckHeight - capHeight;
  const liquidFillPercent = 0.78;

  const strokeColor =
    tone === "highlight" ? "#E7B659" : tone === "dim" ? "#6E5B36" : "#8C6B26";
  const fillColor =
    tone === "highlight"
      ? "rgba(255,255,255,0.45)"
      : tone === "dim"
      ? "rgba(255,255,255,0.55)"
      : "rgba(255,255,255,0.5)";
  const liquidColor =
    tone === "highlight"
      ? "rgba(231,182,89,0.85)"
      : tone === "dim"
      ? "rgba(200,155,60,0.6)"
      : "rgba(200,155,60,0.75)";

  const padX = 16;
  const totalW = width + padX * 2;
  const totalH = height + 8;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`liq-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquidColor} stopOpacity="0.55" />
          <stop offset="1" stopColor={liquidColor} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`glass-${label}`} cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="1" stopColor={fillColor} />
        </radialGradient>
      </defs>

      {/* Sombra base */}
      <ellipse
        cx={totalW / 2}
        cy={totalH - 2}
        rx={width * 0.55}
        ry={4}
        fill="rgba(0,0,0,0.12)"
      />

      {/* Cap */}
      <rect
        x={padX + width * 0.25}
        y={0}
        width={width * 0.5}
        height={capHeight}
        fill="#1a0e08"
        stroke={strokeColor}
        strokeWidth="1"
        rx="2"
      />

      {/* Neck */}
      <rect
        x={padX + width * 0.38}
        y={capHeight}
        width={width * 0.24}
        height={neckHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
      />

      {/* Shoulder/body */}
      <rect
        x={padX}
        y={capHeight + neckHeight}
        width={width}
        height={bodyHeight}
        fill={`url(#glass-${label})`}
        stroke={strokeColor}
        strokeWidth="1.5"
        rx="3"
      />

      {/* Liquid */}
      <motion.rect
        x={padX + 2}
        y={
          capHeight +
          neckHeight +
          bodyHeight * (1 - liquidFillPercent) +
          2
        }
        width={width - 4}
        height={bodyHeight * liquidFillPercent - 4}
        fill={`url(#liq-${label})`}
        rx="2"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: delay + 0.3, ease: EASE_OUT }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Brilho */}
      <rect
        x={padX + width * 0.14}
        y={capHeight + neckHeight + bodyHeight * 0.1}
        width={width * 0.07}
        height={bodyHeight * 0.55}
        fill="rgba(255,255,255,0.55)"
        rx="2"
      />

      {/* Logo Zahir (mini placeholder) — só nos maiores */}
      {height > 180 && (
        <text
          x={padX + width / 2}
          y={capHeight + neckHeight + bodyHeight * 0.5}
          textAnchor="middle"
          fontSize={width * 0.16}
          fontFamily="serif"
          fill={tone === "highlight" ? "#1a0e08" : "rgba(26,14,8,0.7)"}
          fontWeight="300"
          letterSpacing="2"
        >
          ZAHIR
        </text>
      )}
    </svg>
  );
}
