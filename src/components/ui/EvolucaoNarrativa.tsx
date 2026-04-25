"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Versão scrolltelling da evolução olfativa na pele.
 * Sticky section que prende enquanto o cliente rola — três cenas
 * (topo / coração / fundo) cross-fadeiam, transformando a página
 * de produto em narrativa cinematográfica.
 *
 * Renderiza apenas em desktop com hardware decente. Em mobile ou
 * hardware fraco, o wrapper EvolucaoSection.tsx volta pra timeline
 * tradicional (mais leve, com slider manual).
 */

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

const FASES = [
  {
    id: "topo",
    eyebrow: "3 — 15 min",
    titulo: "Primeira impressão",
    descricao:
      "É o que quem cruza você no elevador vai sentir. Cítricos, especiarias vivas, frutas frescas — voláteis que abrem a porta antes de o resto chegar.",
  },
  {
    id: "coracao",
    eyebrow: "20 min — 4 h",
    titulo: "A assinatura",
    descricao:
      "O perfume revela o caráter real. Esta é a fase em que quem te abraça vai se lembrar — a identidade central, a razão pela qual você escolheu esse e não outro.",
  },
  {
    id: "fundo",
    eyebrow: "4 h+",
    titulo: "O que fica",
    descricao:
      "Madeiras, âmbar, almíscar. O perfume fica mais próximo da pele — projeção menor, intimidade maior. É o rastro que alguém sente no seu casaco no dia seguinte.",
  },
] as const;

export function EvolucaoNarrativa({ topo, coracao, fundo }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 0 = topo do container entrou no viewport, 1 = saiu
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Opacidade de cada fase — cross-fade suave */
  // Topo:    1.0 ──┐
  //              0.0 ─────────── 0.0
  const opacityTopo = useTransform(
    scrollYProgress,
    [0, 0.28, 0.4, 1],
    [1, 1, 0, 0],
  );
  // Coração: 0.0 ──┐ 1.0 ────┐ 0.0
  const opacityCoracao = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.65, 0.78, 1],
    [0, 0, 1, 1, 0, 0],
  );
  // Fundo:   0.0 ──────── 0.0 ┐ 1.0
  const opacityFundo = useTransform(
    scrollYProgress,
    [0, 0.7, 0.82, 1],
    [0, 0, 1, 1],
  );

  /* Y translate das notas pra dar sensação de "subir" */
  const yTopo = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const yCoracao = useTransform(scrollYProgress, [0.3, 0.78], [40, -40]);
  const yFundo = useTransform(scrollYProgress, [0.7, 1], [40, 0]);

  /* Background gradient — 3 camadas com opacidade animada */
  const bgOpacityTopo = useTransform(
    scrollYProgress,
    [0, 0.33, 0.5],
    [0.5, 0.4, 0],
  );
  const bgOpacityCoracao = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [0, 0.5, 0],
  );
  const bgOpacityFundo = useTransform(
    scrollYProgress,
    [0.5, 0.75, 1],
    [0, 0.4, 0.5],
  );

  /* Indicador de progresso lateral */
  const progressoFase1 = useTransform(scrollYProgress, [0, 0.33], [0, 100]);
  const progressoFase2 = useTransform(scrollYProgress, [0.33, 0.66], [0, 100]);
  const progressoFase3 = useTransform(scrollYProgress, [0.66, 1], [0, 100]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" /* 3 telas de scroll pras 3 cenas */ }}
    >
      {/* Sticky section que segura enquanto o usuário rola */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background gradient — 3 camadas com opacidade animada cross-fade */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bgOpacityTopo,
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(231,182,89,0.22), transparent 60%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bgOpacityCoracao,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.22), transparent 60%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bgOpacityFundo,
            background:
              "radial-gradient(ellipse at 70% 70%, rgba(74,21,24,0.30), transparent 65%)",
          }}
        />

        {/* Indicador de progresso lateral (esquerda) */}
        <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
          <ul className="flex flex-col gap-6">
            {FASES.map((f, i) => (
              <li key={f.id} className="flex items-center gap-3">
                <div className="relative h-px w-16 bg-cream/15">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-amber"
                    style={{
                      scaleX: useTransform(
                        i === 0
                          ? progressoFase1
                          : i === 1
                          ? progressoFase2
                          : progressoFase3,
                        [0, 100],
                        [0, 1],
                      ),
                      transformOrigin: "left",
                    }}
                  />
                </div>
                <motion.span
                  className="text-[9px] font-sans uppercase tracking-[0.35em]"
                  style={{
                    color: useTransform(
                      i === 0
                        ? progressoFase1
                        : i === 1
                        ? progressoFase2
                        : progressoFase3,
                      [0, 100],
                      ["rgba(244, 233, 212, 0.4)", "rgba(200, 155, 60, 1)"],
                    ),
                  }}
                >
                  {f.eyebrow}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conteúdo central — grid 2 colunas */}
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pl-32">
          {/* Lado esquerdo — texto da fase */}
          <div className="relative h-[60vh] min-h-[440px]">
            {/* Eyebrow comum */}
            <span className="absolute left-0 top-0 text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
              Cheiro na pele
            </span>

            {/* Cada fase — 3 textos absolutos sobrepostos, cross-fade */}
            {FASES.map((f, i) => {
              const op =
                i === 0
                  ? opacityTopo
                  : i === 1
                  ? opacityCoracao
                  : opacityFundo;
              return (
                <motion.div
                  key={f.id}
                  style={{ opacity: op }}
                  className="absolute inset-0 mt-12 flex flex-col gap-5"
                >
                  <span className="text-xs font-sans uppercase tracking-[0.4em] text-amber/80">
                    {f.eyebrow}
                  </span>
                  <h3 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
                    {f.titulo}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
                    {f.descricao}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Lado direito — notas da fase ativa */}
          <div className="relative h-[60vh] min-h-[440px]">
            <NotasCamada
              titulo="Topo"
              notas={topo}
              opacity={opacityTopo}
              y={yTopo}
            />
            <NotasCamada
              titulo="Coração"
              notas={coracao}
              opacity={opacityCoracao}
              y={yCoracao}
            />
            <NotasCamada
              titulo="Fundo"
              notas={fundo}
              opacity={opacityFundo}
              y={yFundo}
            />
          </div>
        </div>

        {/* Hint sutil "continua rolando" — só na primeira fase */}
        <motion.div
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: opacityTopo }}
        >
          <span className="text-[9px] font-sans uppercase tracking-[0.45em] text-cream/45">
            Continua rolando
          </span>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-cream/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Camada de notas (uma por fase) ---------------- */

function NotasCamada({
  titulo,
  notas,
  opacity,
  y,
}: {
  titulo: string;
  notas: string[];
  opacity: ReturnType<typeof useTransform<number, number>>;
  y: ReturnType<typeof useTransform<number, number>>;
}) {
  if (notas.length === 0) {
    return (
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 flex flex-col items-start gap-6"
      >
        <span className="font-display text-2xl italic text-amber/60">
          {titulo}
        </span>
        <p className="text-sm italic text-cream/40">
          (não declarado por este perfume)
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-start gap-6"
    >
      <span className="font-display text-2xl italic text-amber/85 md:text-3xl">
        {titulo}
      </span>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {notas.map((n) => (
          <li
            key={n}
            className="font-display text-2xl font-light leading-tight text-cream md:text-3xl lg:text-4xl"
          >
            {n}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
