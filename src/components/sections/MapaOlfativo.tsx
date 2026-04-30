"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { MapaMobileAlt } from "@/components/ui/MapaMobileAlt";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Mapa olfativo: cada família olfativa tem uma posição base no plano
 * X: Fresco (0) → Intenso (1)
 * Y: Seco (0) → Doce (1)  [Y=0 topo, Y=1 base, em coords CSS]
 */
const FAMILY_POS: Record<string, { x: number; y: number }> = {
  "Aquático Marinho": { x: 0.1, y: 0.2 },
  "Amadeirado Aquático": { x: 0.38, y: 0.25 },
  "Aromático Frutado Cítrico": { x: 0.2, y: 0.4 },
  "Amadeirado Aromático Fresco": { x: 0.4, y: 0.28 },
  "Aromático Fougère": { x: 0.38, y: 0.38 },
  Aromático: { x: 0.45, y: 0.4 },
  "Aromático Frutado Amadeirado": { x: 0.52, y: 0.42 },
  "Oriental Fougère": { x: 0.55, y: 0.55 },
  Amadeirado: { x: 0.68, y: 0.4 },
  "Amadeirado Aromático": { x: 0.62, y: 0.4 },
  "Amadeirado Especiado": { x: 0.72, y: 0.38 },
  "Oriental Especiado": { x: 0.72, y: 0.58 },
  "Oriental Oud": { x: 0.85, y: 0.52 },
  "Oriental Amadeirado": { x: 0.78, y: 0.55 },
  Oriental: { x: 0.72, y: 0.55 },
  "Âmbar Oriental": { x: 0.72, y: 0.72 },
  "Amadeirado Gourmand": { x: 0.78, y: 0.76 },
  "Oriental Gourmand": { x: 0.6, y: 0.85 },
  "Oriental Baunilha": { x: 0.55, y: 0.9 },
  "Floral Doce": { x: 0.4, y: 0.78 },
};

function positionFor(p: Perfume): { x: number; y: number } {
  const base = FAMILY_POS[p.familia ?? ""] ?? { x: 0.5, y: 0.5 };
  // Jitter determinístico pra perfumes da mesma família não se sobreporem
  const jx = ((p.numero * 137) % 100) / 100 - 0.5; // -0.5..0.5
  const jy = ((p.numero * 89) % 100) / 100 - 0.5;
  return {
    x: Math.max(0.06, Math.min(0.94, base.x + jx * 0.075)),
    y: Math.max(0.08, Math.min(0.92, base.y + jy * 0.075)),
  };
}

export function MapaOlfativo({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const activeId = focused ?? hovered;
  const activePerfume = activeId
    ? CATALOGO.find((p) => p.id === activeId) ?? null
    : null;

  // Ordena o catálogo pra garantir que perfumes sem família vão pro final (não atrapalham)
  const perfumesComPosicao = CATALOGO.filter((p) => p.familia);

  return (
    <section id="mapa"
      className="section-veil-light relative border-t border-ink/5 px-6 py-28 md:px-12 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {!hideIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Mapa olfativo
            </span>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Todo o catálogo{" "}
              <em className="italic text-amber/90">em um só lugar.</em>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Cada fragrância posicionada por perfil olfativo. Passa o mouse pra
              ver, clica pra abrir a ficha.
            </p>
          </motion.div>
        )}

        {/* Alternativa mobile, lista agrupada por família */}
        <div className={`${hideIntro ? "" : "mt-12 "}md:hidden`}>
          <MapaMobileAlt />
        </div>

        {/* Mapa 2D, só desktop/tablet */}
        <div className={`${hideIntro ? "" : "mt-16 "}hidden gap-8 md:grid lg:grid-cols-[1fr_320px] lg:gap-12`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="relative aspect-square w-full overflow-hidden rounded-sm border border-ink/10 md:aspect-[4/3]"
          >
            {/* Background gradient, sugere temperatura: fresco azul → quente âmbar */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(74,122,156,0.08) 0%, rgba(42,42,40,0.02) 30%, rgba(200,155,60,0.08) 70%, rgba(122,45,50,0.12) 100%)",
              }}
            />

            {/* Grid lines */}
            <div aria-hidden className="absolute inset-0">
              {/* Vertical grid */}
              {[0.25, 0.5, 0.75].map((p) => (
                <div
                  key={`v-${p}`}
                  className="absolute top-0 h-full w-px bg-cream/5"
                  style={{ left: `${p * 100}%` }}
                />
              ))}
              {/* Horizontal grid */}
              {[0.25, 0.5, 0.75].map((p) => (
                <div
                  key={`h-${p}`}
                  className="absolute left-0 h-px w-full bg-cream/5"
                  style={{ top: `${p * 100}%` }}
                />
              ))}
              {/* Axes highlighted */}
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-amber/20" />
              <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-amber/20" />
            </div>

            {/* Axis labels */}
            <AxisLabel position="top">Seco · Especiado</AxisLabel>
            <AxisLabel position="bottom">Doce · Gourmand</AxisLabel>
            <AxisLabel position="left">Fresco · Aquático</AxisLabel>
            <AxisLabel position="right">Intenso · Amadeirado</AxisLabel>

            {/* Quadrant hints */}
            <QuadrantHint x="top-left">Frescos secos</QuadrantHint>
            <QuadrantHint x="top-right">Especiados profundos</QuadrantHint>
            <QuadrantHint x="bottom-left">Florais leves</QuadrantHint>
            <QuadrantHint x="bottom-right">Ambarados gourmand</QuadrantHint>

            {/* Perfume dots */}
            {perfumesComPosicao.map((p, i) => (
              <PerfumeDot
                key={p.id}
                perfume={p}
                index={i}
                active={activeId === p.id}
                anyActive={!!activeId}
                onHover={() => setHovered(p.id)}
                onLeave={() => setHovered(null)}
                onFocus={() => setFocused(p.id)}
                onBlur={() => setFocused(null)}
              />
            ))}
          </motion.div>

          {/* Painel lateral, info do perfume ativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col"
          >
            <AnimatePresence mode="wait">
              {activePerfume ? (
                <InfoPanel key={activePerfume.id} perfume={activePerfume} />
              ) : (
                <EmptyPanel key="empty" />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Legenda da leitura do mapa */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink/70"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber" />
            cada ponto é uma fragrância
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-bright ring-2 ring-amber/30" />
            ponto ativo, hover ou teclado
          </span>
          <span className="italic">
            família olfativa define a posição base · fragrâncias parecidas ficam próximas sem se sobrepor
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Ponto de perfume ---------------- */

function PerfumeDot({
  perfume,
  index,
  active,
  anyActive,
  onHover,
  onLeave,
  onFocus,
  onBlur,
}: {
  perfume: Perfume;
  index: number;
  active: boolean;
  anyActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const pos = positionFor(perfume);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.5 + index * 0.03,
        ease: EASE_OUT,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={() => {
        window.location.href = `/perfume/${perfume.id}`;
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
      aria-label={`${perfume.nome}, ${perfume.familia}`}
    >
      {/* Ring estático no ponto ativo */}
      {active && (
        <span
          aria-hidden
          className="absolute inset-0 h-3 w-3 rounded-full bg-amber/40"
          style={{ transform: "scale(2.2)" }}
        />
      )}
      {/* Dot */}
      <span
        className={`relative block h-3 w-3 rounded-full border transition-all duration-300 ${
          active
            ? "border-amber-bright bg-amber-bright ring-4 ring-amber/30 scale-150"
            : anyActive
            ? "border-amber/40 bg-amber/40"
            : "border-amber/70 bg-amber/80 group-hover:bg-amber-bright group-hover:scale-125"
        }`}
      />
      {/* Tooltip */}
      {active && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: -8 }}
          className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-sm border border-amber/30 bg-cream/95 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="block text-[10px] font-sans uppercase tracking-[0.3em] text-amber">
            Nº {String(perfume.numero).padStart(2, "0")}
          </span>
          <span className="block font-display text-sm text-ink">
            {perfume.nome}
          </span>
        </motion.span>
      )}
    </motion.button>
  );
}

/* ---------------- Labels dos eixos ---------------- */

function AxisLabel({
  position,
  children,
}: {
  position: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}) {
  const pos = {
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    left: "left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center",
    right: "right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center",
  }[position];
  return (
    <span
      className={`pointer-events-none absolute z-10 whitespace-nowrap text-[10px] font-sans uppercase tracking-[0.4em] text-amber/70 ${pos}`}
    >
      {children}
    </span>
  );
}

/* ---------------- Hint dos quadrantes ---------------- */

function QuadrantHint({
  x,
  children,
}: {
  x: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  children: React.ReactNode;
}) {
  const map = {
    "top-left": "top-14 left-14",
    "top-right": "top-14 right-14 text-right",
    "bottom-left": "bottom-14 left-14",
    "bottom-right": "bottom-14 right-14 text-right",
  }[x];
  return (
    <span
      className={`pointer-events-none absolute max-w-[120px] select-none font-display text-[10px] italic text-ink/25 md:text-xs ${map}`}
    >
      {children}
    </span>
  );
}

/* ---------------- Painel lateral ---------------- */

function InfoPanel({ perfume }: { perfume: Perfume }) {
  const primaryClone = perfume.cloneDe?.[0];
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="flex h-full flex-col gap-5 rounded-sm border border-amber/20 p-6 md:p-8"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xl italic text-amber/70">
          Nº {String(perfume.numero).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          {perfume.marca ?? "—"}
        </span>
      </div>

      <h3 className="font-display text-3xl font-light leading-[1.1] text-ink md:text-4xl">
        {perfume.nome}
      </h3>

      {perfume.familia && (
        <span className="text-sm italic text-amber/80">{perfume.familia}</span>
      )}

      {primaryClone && (
        <p className="text-sm text-ink/70">
          <span className="italic">inspirado em </span>
          <span className="text-ink/95">{primaryClone}</span>
          {perfume.cloneFidelidade && (
            <span className="text-ink/70"> · {perfume.cloneFidelidade}</span>
          )}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/5 pt-5">
        <div className="flex flex-col">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/75">
            A partir de
          </span>
          <span className="font-display text-3xl font-light text-ink">
            {perfume.precoVenda !== null
              ? `R$ ${Math.round(perfume.precoVenda)}`
              : "—"}
          </span>
        </div>
        <Link
          href={`/perfume/${perfume.id}`}
          className="group inline-flex items-center gap-2 rounded-full border border-amber/50 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-ink"
        >
          Abrir ficha
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function EmptyPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[280px] flex-col justify-between rounded-sm border border-dashed border-ink/15 p-6 md:p-8"
    >
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/60">
          Como usar
        </span>
        <p className="text-sm leading-relaxed text-ink/65">
          Passa o mouse (ou navega com{" "}
          <kbd className="rounded border border-ink/15 px-1.5 py-0.5 text-[10px] text-ink/80">
            Tab
          </kbd>
          ) por cada ponto pra ver qual fragrância mora naquela posição
          olfativa.
        </p>
      </div>
      <div className="flex flex-col gap-2 border-t border-ink/5 pt-5">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink/75">
          Eixos
        </span>
        <ul className="flex flex-col gap-1 text-xs text-ink/70">
          <li>
            <span className="text-ink/80">Horizontal:</span> Fresco → Intenso
          </li>
          <li>
            <span className="text-ink/80">Vertical:</span> Seco → Doce
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
