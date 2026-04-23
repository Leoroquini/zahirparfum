"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Timeline interativa da evolução olfativa na pele.
 * Slider 0h → 8h+ mostra quais notas ESTÃO VIVAS naquele momento,
 * baseado no comportamento real de perfumaria:
 *   0–15 min   → Notas de topo
 *   20 min–3h  → Topo desaparecendo + Coração dominante
 *   3–6h       → Coração misturado com Fundo
 *   6h+        → Só Fundo (a assinatura que fica na pele)
 *
 * Diferencial: nenhum e-commerce de perfume no Brasil mostra isso.
 */

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

type Momento = {
  tempo: string;
  titulo: string;
  descricao: string;
  pesos: { topo: number; coracao: number; fundo: number };
};

const MOMENTOS: Momento[] = [
  {
    tempo: "0–15 min",
    titulo: "Primeira impressão",
    descricao:
      "As notas voláteis dominam. É o que quem cruza você no elevador vai sentir — cítrico, especiaria viva, fruta fresca.",
    pesos: { topo: 1, coracao: 0.3, fundo: 0.1 },
  },
  {
    tempo: "20 min – 1h",
    titulo: "Transição",
    descricao:
      "O topo começa a desaparecer e o coração assume. A pele esquenta o perfume, revela o caráter real da fragrância.",
    pesos: { topo: 0.5, coracao: 1, fundo: 0.3 },
  },
  {
    tempo: "1h – 3h",
    titulo: "Assinatura",
    descricao:
      "O coração está em plenitude. Esta é a fase em que quem te abraça vai se lembrar — a identidade central do perfume.",
    pesos: { topo: 0.1, coracao: 1, fundo: 0.6 },
  },
  {
    tempo: "3h – 6h",
    titulo: "Maturação",
    descricao:
      "Coração começa a ceder pro fundo. Madeiras, âmbar, musks assumem. O perfume fica mais próximo da pele — projeção menor, intimidade maior.",
    pesos: { topo: 0, coracao: 0.5, fundo: 1 },
  },
  {
    tempo: "6h – 8h+",
    titulo: "O que fica",
    descricao:
      "Só o fundo. É o rastro que alguém sente no seu casaco no dia seguinte. A memória olfativa que o perfume deixa em você e em quem passou.",
    pesos: { topo: 0, coracao: 0.1, fundo: 1 },
  },
];

export function EvolucaoTimeline({ topo, coracao, fundo }: Props) {
  const [active, setActive] = useState(0);

  // Se não tem notas em nenhuma camada, não renderiza
  if (topo.length + coracao.length + fundo.length === 0) return null;

  const momento = MOMENTOS[active];

  return (
    <div className="rounded-sm border border-cream/10 bg-ink-soft/40 p-6 md:p-10">
      {/* Título */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          Na pele
        </span>
        <h3 className="font-display text-2xl font-light leading-[1.1] text-cream md:text-4xl">
          Como esse perfume{" "}
          <em className="italic text-amber/90">evolui em você.</em>
        </h3>
      </div>

      {/* Slider de tempo */}
      <div className="mt-10">
        <div className="mb-3 flex justify-between text-[9px] font-sans uppercase tracking-[0.3em] text-cream/40">
          {MOMENTOS.map((m, i) => (
            <button
              key={m.tempo}
              type="button"
              onClick={() => setActive(i)}
              className={`transition-colors hover:text-amber ${
                i === active ? "text-amber" : ""
              }`}
            >
              {m.tempo.split("–")[0].trim()}
            </button>
          ))}
        </div>

        {/* Trilha */}
        <div className="relative h-1 w-full rounded-full bg-cream/10">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-amber"
            animate={{
              width: `${((active + 1) / MOMENTOS.length) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
          {/* Handles */}
          {MOMENTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all ${
                i <= active
                  ? "border-amber bg-amber"
                  : "border-cream/30 bg-ink"
              } ${i === active ? "scale-125 ring-2 ring-amber/40" : ""}`}
              style={{ left: `${((i + 1) / MOMENTOS.length) * 100}%` }}
              aria-label={`Ver momento: ${MOMENTOS[i].titulo}`}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo do momento ativo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12"
        >
          {/* Esquerda — descrição do momento */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
              {momento.tempo}
            </span>
            <h4 className="font-display text-2xl font-light leading-[1.1] text-cream md:text-3xl">
              {momento.titulo}
            </h4>
            <p className="text-sm leading-relaxed text-cream/70 md:text-base">
              {momento.descricao}
            </p>
          </div>

          {/* Direita — notas com intensidade */}
          <div className="flex flex-col gap-6">
            <NotasNivel
              titulo="Topo"
              notas={topo}
              intensidade={momento.pesos.topo}
            />
            <NotasNivel
              titulo="Coração"
              notas={coracao}
              intensidade={momento.pesos.coracao}
            />
            <NotasNivel
              titulo="Fundo"
              notas={fundo}
              intensidade={momento.pesos.fundo}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NotasNivel({
  titulo,
  notas,
  intensidade,
}: {
  titulo: string;
  notas: string[];
  intensidade: number;
}) {
  if (notas.length === 0) return null;

  // Opacidade total (visual) baseada na intensidade do momento
  const opacityNotas = Math.max(0.2, intensidade);
  const barWidth = Math.max(5, intensidade * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-sm italic text-amber/80">
          {titulo}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/40">
          {intensidade === 0
            ? "inativa"
            : intensidade < 0.3
            ? "desvanecendo"
            : intensidade < 0.7
            ? "presente"
            : "dominante"}
        </span>
      </div>

      {/* Barra de intensidade */}
      <div className="relative h-0.5 w-full bg-cream/10">
        <motion.div
          className="absolute left-0 top-0 h-full bg-amber"
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      </div>

      {/* Notas */}
      <div
        className="mt-1 flex flex-wrap gap-x-3 gap-y-1 transition-opacity duration-500"
        style={{ opacity: opacityNotas }}
      >
        {notas.map((n) => (
          <span
            key={n}
            className={`text-sm ${
              intensidade > 0.5 ? "text-cream/85" : "text-cream/50"
            }`}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
