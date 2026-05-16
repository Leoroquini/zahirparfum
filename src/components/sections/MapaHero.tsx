"use client";

import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero dedicada da página /mapa.
 *
 * Split editorial: texto + CTAs à esquerda; preview do mapa olfativo
 * com 4 quadrantes (fresco/intenso/seco/doce) e pontos amber decorativos
 * à direita (placeholder até a interação real do mapa). Abaixo, 4 cards
 * explicativos dos eixos e interações.
 */
export function MapaHero() {
  const handleExplorar = () => {
    document
      .getElementById("mapa")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleComoFunciona = () => {
    document
      .getElementById("mapa-instrucoes")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative overflow-hidden border-b border-ink/5 px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cream/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 25% 35%, rgba(231,182,89,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Mapa Olfativo
            </span>

            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Encontre seu perfume{" "}
              <em className="italic text-amber/90">pelo perfil olfativo.</em>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-[17px]">
              O Mapa organiza cada fragrância em um plano 2D — Fresco ↔ Intenso,
              Seco ↔ Doce — pra você descobrir novas combinações, comparar
              perfumes e escolher com muito mais confiança.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExplorar}
                className="group inline-flex items-center gap-4 rounded-full bg-amber px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
              >
                <span>Explorar o mapa</span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={handleComoFunciona}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:border-amber hover:text-amber"
              >
                <span>Como funciona</span>
                <span
                  aria-hidden
                  className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none"
                >
                  ↓
                </span>
              </button>
            </div>
          </motion.div>

          {/* Preview do mapa — quadrante decorativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-amber/15 bg-cream/40 p-8">
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 70%, rgba(231,182,89,0.16), transparent 60%)",
                }}
              />

              {/* Eixos */}
              <div className="relative h-full w-full">
                {/* Eixo horizontal */}
                <div className="absolute inset-x-4 top-1/2 h-px bg-amber/30" />
                {/* Eixo vertical */}
                <div className="absolute inset-y-4 left-1/2 w-px bg-amber/30" />

                {/* Labels eixos */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-sans uppercase tracking-[0.35em] text-amber/85">
                  Fresco
                </span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-sans uppercase tracking-[0.35em] text-amber/85">
                  Intenso
                </span>
                <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[9px] font-sans uppercase tracking-[0.35em] text-amber/85">
                  Doce
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-sans uppercase tracking-[0.35em] text-amber/85">
                  Seco
                </span>

                {/* Pontos decorativos (perfumes) */}
                {[
                  { x: 22, y: 35, size: 6, opacity: 0.55 },
                  { x: 30, y: 60, size: 5, opacity: 0.4 },
                  { x: 42, y: 28, size: 7, opacity: 0.65 },
                  { x: 55, y: 45, size: 8, opacity: 0.75 },
                  { x: 48, y: 70, size: 5, opacity: 0.45 },
                  { x: 65, y: 32, size: 6, opacity: 0.6 },
                  { x: 72, y: 58, size: 9, opacity: 0.9 },
                  { x: 80, y: 40, size: 5, opacity: 0.5 },
                  { x: 38, y: 50, size: 4, opacity: 0.35 },
                  { x: 62, y: 75, size: 6, opacity: 0.55 },
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-amber"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      opacity: p.opacity,
                    }}
                  />
                ))}

                {/* Ponto destacado com tooltip */}
                <div
                  className="absolute"
                  style={{ left: "72%", top: "58%" }}
                >
                  <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full border-2 border-amber bg-cream" />
                </div>
              </div>

              <span className="absolute bottom-3 right-4 font-display text-xs italic tracking-[0.3em] text-ink/30">
                preview do mapa
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 cards de instrução */}
        <motion.div
          id="mapa-instrucoes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4"
        >
          <BenefitCard
            n="01"
            titulo="Fresco → Intenso"
            descricao="O eixo horizontal mostra a evolução do frescor leve até a intensidade profunda."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
              </svg>
            }
          />
          <BenefitCard
            n="02"
            titulo="Seco → Doce"
            descricao="O eixo vertical vai do perfil seco e amadeirado até as notas doces e gourmand."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3v18M12 3l-4 4M12 3l4 4M12 21l-4-4M12 21l4-4" />
              </svg>
            }
          />
          <BenefitCard
            n="03"
            titulo="Compare na hora"
            descricao="Navegue pelos pontos pra ver as famílias olfativas e entender como os perfumes se relacionam."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="8" cy="12" r="5" />
                <circle cx="16" cy="12" r="5" />
              </svg>
            }
          />
          <BenefitCard
            n="04"
            titulo="Abra a ficha"
            descricao="Clique em qualquer ponto pra ver notas, família olfativa e detalhes da fragrância."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M9 3h6v3l2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-2z" />
                <path d="M10 14h4M10 11h4" />
              </svg>
            }
          />
        </motion.div>
      </div>
    </header>
  );
}

function BenefitCard({
  n,
  titulo,
  descricao,
  icon,
}: {
  n: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border border-amber/15 bg-cream/40 p-5 md:p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber/30 text-amber">
          {icon}
        </span>
        <span className="font-display text-xs italic text-amber/70">{n}</span>
      </div>
      <span className="font-display text-lg font-light text-ink md:text-xl">
        {titulo}
      </span>
      <p className="text-[13px] leading-relaxed text-ink/65">{descricao}</p>
    </div>
  );
}
