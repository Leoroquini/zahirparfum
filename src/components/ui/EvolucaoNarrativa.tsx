"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

/**
 * Versão scrolltelling da evolução olfativa na pele.
 *
 * Filosofia desse design:
 *   - Layout limpo, fixo, lado a lado (igual o original que era elogiado)
 *   - 5 momentos editoriais (igual o original)
 *   - 3 camadas (Topo/Coração/Fundo) SEMPRE visíveis com intensidade
 *     variando — não há sobreposição/cross-fade ambíguo
 *   - Apenas UM bloco editorial por vez (eyebrow + título + descrição)
 *     trocando suavemente via AnimatePresence quando o cliente avança
 *   - O scroll é o motor — não a estética
 *
 * Renderiza só em desktop ≥1024px com hardware decente
 * (wrapper EvolucaoSection.tsx faz a detecção e fallback).
 */

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

type Momento = {
  tempo: string;
  rotuloCurto: string;
  titulo: string;
  descricao: string;
  pesos: { topo: number; coracao: number; fundo: number };
};

const MOMENTOS: Momento[] = [
  {
    tempo: "0 — 15 min",
    rotuloCurto: "0:15",
    titulo: "Primeira impressão",
    descricao:
      "As notas voláteis dominam. É o que quem cruza você no elevador vai sentir — cítrico, especiaria viva, fruta fresca.",
    pesos: { topo: 1, coracao: 0.3, fundo: 0.1 },
  },
  {
    tempo: "20 min — 1h",
    rotuloCurto: "1h",
    titulo: "Transição",
    descricao:
      "O topo começa a desaparecer e o coração assume. A pele esquenta o perfume, revela o caráter real da fragrância.",
    pesos: { topo: 0.5, coracao: 1, fundo: 0.3 },
  },
  {
    tempo: "1h — 3h",
    rotuloCurto: "3h",
    titulo: "Assinatura",
    descricao:
      "O coração está em plenitude. Esta é a fase em que quem te abraça vai se lembrar — a identidade central do perfume.",
    pesos: { topo: 0.1, coracao: 1, fundo: 0.6 },
  },
  {
    tempo: "3h — 6h",
    rotuloCurto: "6h",
    titulo: "Maturação",
    descricao:
      "Coração começa a ceder pro fundo. Madeiras, âmbar e musks assumem. O perfume fica mais próximo da pele — projeção menor, intimidade maior.",
    pesos: { topo: 0, coracao: 0.5, fundo: 1 },
  },
  {
    tempo: "6h — 8h+",
    rotuloCurto: "8h+",
    titulo: "O que fica",
    descricao:
      "Só o fundo. É o rastro que alguém sente no seu casaco no dia seguinte. A memória olfativa que o perfume deixa em você e em quem passou.",
    pesos: { topo: 0, coracao: 0.1, fundo: 1 },
  },
];

/* Pontos de breakpoint do scroll que definem qual momento está ativo */
const FASE_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export function EvolucaoNarrativa({ topo, coracao, fundo }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [faseIdx, setFaseIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Atualiza qual fase está ativa conforme o scroll passa
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let novaFase = 0;
    for (let i = 0; i < FASE_THRESHOLDS.length - 1; i++) {
      if (v >= FASE_THRESHOLDS[i] && v < FASE_THRESHOLDS[i + 1]) {
        novaFase = i;
        break;
      }
    }
    if (v >= 1) novaFase = MOMENTOS.length - 1;
    setFaseIdx(novaFase);
  });

  /* Intensidades das camadas — interpoladas suavemente entre todos os momentos */
  const intensidadeTopo = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    MOMENTOS.map((m) => m.pesos.topo),
  );
  const intensidadeCoracao = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    MOMENTOS.map((m) => m.pesos.coracao),
  );
  const intensidadeFundo = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    MOMENTOS.map((m) => m.pesos.fundo),
  );

  /* Posição do marcador na linha do tempo */
  const marcadorX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const momento = MOMENTOS[faseIdx];

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "250vh" /* 5 momentos × ~50vh cada */ }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        {/* Background gradient sutil — sem ser dramático demais */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(200,155,60,0.10), transparent 65%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
          {/* Eyebrow */}
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            Cheiro na pele
          </span>

          <h3 className="mt-4 font-display text-3xl font-light leading-[1.1] text-cream md:text-4xl">
            Como esse perfume{" "}
            <em className="italic text-amber/90">evolui em você.</em>
          </h3>

          {/* Linha do tempo horizontal — sempre visível, marcador acompanha scroll */}
          <div className="mt-10">
            {/* Rótulos dos 5 momentos */}
            <div className="mb-3 flex justify-between text-[10px] font-sans uppercase tracking-[0.3em]">
              {MOMENTOS.map((m, i) => (
                <span
                  key={m.tempo}
                  className={`transition-colors duration-500 ${
                    i === faseIdx ? "text-amber" : "text-cream/35"
                  }`}
                >
                  {m.rotuloCurto}
                </span>
              ))}
            </div>

            {/* Trilha + marcador */}
            <div className="relative h-px w-full bg-cream/15">
              {/* Preenchimento até a fase atual */}
              <motion.div
                className="absolute left-0 top-0 h-full origin-left bg-amber"
                style={{ scaleX: scrollYProgress }}
              />
              {/* Pontos das fases */}
              {MOMENTOS.map((_, i) => (
                <span
                  key={i}
                  className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                    i <= faseIdx
                      ? "border-amber bg-amber"
                      : "border-cream/30 bg-ink"
                  } ${i === faseIdx ? "scale-150 ring-2 ring-amber/35" : ""}`}
                  style={{
                    left: `${(i / (MOMENTOS.length - 1)) * 100}%`,
                  }}
                  aria-hidden
                />
              ))}
              {/* Marcador "vivo" que segue o scroll com suavidade */}
              <motion.span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-bright shadow-[0_0_12px_rgba(231,182,89,0.6)]"
                style={{ left: marcadorX }}
                aria-hidden
              />
            </div>
          </div>

          {/* Conteúdo principal — 2 colunas */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Esquerda — bloco editorial (UM por vez, troca suave) */}
            <div className="relative min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={faseIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/85">
                    {momento.tempo}
                  </span>
                  <h4 className="font-display text-3xl font-light leading-[1.05] text-cream md:text-4xl lg:text-5xl">
                    {momento.titulo}
                  </h4>
                  <p className="max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
                    {momento.descricao}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Direita — 3 camadas de notas, sempre visíveis, intensidade varia */}
            <div className="flex flex-col gap-7">
              <NotasNivel
                titulo="Topo"
                notas={topo}
                intensidade={intensidadeTopo}
                pesoAtual={momento.pesos.topo}
              />
              <NotasNivel
                titulo="Coração"
                notas={coracao}
                intensidade={intensidadeCoracao}
                pesoAtual={momento.pesos.coracao}
              />
              <NotasNivel
                titulo="Fundo"
                notas={fundo}
                intensidade={intensidadeFundo}
                pesoAtual={momento.pesos.fundo}
              />
            </div>
          </div>

          {/* Hint sutil de continuar — só na primeira fase */}
          {faseIdx === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pointer-events-none mt-12 flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.4em] text-cream/45"
            >
              <span className="h-px w-10 bg-cream/30" />
              Continua rolando pra ver evolução
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Camada de notas (Topo / Coração / Fundo) ---------------- */

function NotasNivel({
  titulo,
  notas,
  intensidade,
  pesoAtual,
}: {
  titulo: string;
  notas: string[];
  intensidade: ReturnType<typeof useTransform<number, number>>;
  pesoAtual: number;
}) {
  /* Hooks SEMPRE no topo — nunca depois de early return.
     Antes estava errado: perfume sem alguma camada (notas.fundo vazia)
     fazia o componente retornar null antes dos useTransform, quebrando
     a ordem de hooks entre renders. */
  const opacityBloco = useTransform(intensidade, [0, 1], [0.25, 1]);
  const barWidth = useTransform(intensidade, [0, 1], ["6%", "100%"]);

  if (notas.length === 0) return null;

  const status =
    pesoAtual === 0
      ? "inativa"
      : pesoAtual < 0.3
      ? "desvanecendo"
      : pesoAtual < 0.7
      ? "presente"
      : "dominante";

  return (
    <motion.div style={{ opacity: opacityBloco }} className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-base italic text-amber/85 md:text-lg">
          {titulo}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/45">
          {status}
        </span>
      </div>

      {/* Barra de intensidade — width varia continuamente com o scroll */}
      <div className="relative h-px w-full bg-cream/10">
        <motion.div
          className="absolute left-0 top-0 h-full bg-amber"
          style={{ width: barWidth }}
        />
      </div>

      {/* Notas */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
        {notas.map((n) => (
          <span key={n} className="text-base text-cream/85 md:text-lg">
            {n}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
