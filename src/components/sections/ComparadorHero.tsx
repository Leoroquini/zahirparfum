"use client";

import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero dedicada da página /comparador (Árabe × Designer).
 *
 * Split editorial: texto + CTAs à esquerda; card visual de comparação
 * Creed Aventus × Club de Nuit Intense à direita com porcentagem de
 * similaridade (placeholder estilizado até foto real). Abaixo, 4 cards
 * de método.
 */
export function ComparadorHero() {
  const handleEscolher = () => {
    document
      .getElementById("comparador")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEntender = () => {
    document
      .getElementById("comparador-metodo")
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
              Comparador · Árabe × Designer
            </span>

            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Árabe <span className="text-amber/80">×</span>{" "}
              <em className="italic text-amber/90">Designer.</em>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-[17px]">
              Encontre perfumes árabes que seguem o mesmo caminho olfativo de
              designers icônicos, com curadoria transparente e comparação real
              — notas principais, projeção, fixação e ocasiões.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleEscolher}
                className="group inline-flex items-center gap-4 rounded-full bg-amber px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
              >
                <span>Escolher um designer</span>
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={handleEntender}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:border-amber hover:text-amber"
              >
                <span>Como comparamos</span>
                <span
                  aria-hidden
                  className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none"
                >
                  ↓
                </span>
              </button>
            </div>
          </motion.div>

          {/* Card visual de comparação — placeholder editorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-amber/15 bg-cream/40 p-8">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(231,182,89,0.16), transparent 65%)",
                }}
              />

              <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
                {/* Designer */}
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-ink/55">
                    Designer
                  </span>
                  <span className="font-display text-2xl font-light italic text-ink">
                    Creed Aventus
                  </span>
                  <div className="mt-2 h-32 w-20 rounded-sm border border-ink/15 bg-ink/85" />
                </div>

                {/* Centro - badge de similaridade */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-amber bg-cream">
                    <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-amber/85 leading-tight">
                      Similaridade
                    </span>
                    <span className="font-display text-2xl font-light text-ink">
                      90%
                    </span>
                  </div>
                  <span className="font-display text-2xl italic text-amber/70">
                    ×
                  </span>
                </div>

                {/* Árabe */}
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-amber/85">
                    Árabe
                  </span>
                  <span className="font-display text-2xl font-light italic text-ink">
                    Club de Nuit
                  </span>
                  <div className="mt-2 h-32 w-20 rounded-sm border border-amber/30 bg-amber/15" />
                </div>
              </div>

              <span className="absolute bottom-3 right-4 font-display text-xs italic tracking-[0.3em] text-ink/30">
                exemplo de comparação
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 cards de método */}
        <motion.div
          id="comparador-metodo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4"
        >
          <BenefitCard
            n="01"
            titulo="Mesmo caminho olfativo"
            descricao="Comparamos notas, acordes e sensação geral pra garantir semelhança real."
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
                <path d="M4 12c4-6 12-6 16 0M4 18c4-6 12-6 16 0M4 6c4-6 12-6 16 0" />
              </svg>
            }
          />
          <BenefitCard
            n="02"
            titulo="Curadoria transparente"
            descricao="Método próprio de avaliação com critérios claros, notas públicas e resultados confiáveis."
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
                <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
          />
          <BenefitCard
            n="03"
            titulo="Preço inteligente"
            descricao="Alternativas árabes de alta qualidade por uma fração do preço — sem promessa vazia."
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
                <path d="M20 12 12 4H4v8l8 8z" />
                <circle cx="8" cy="8" r="1.5" />
              </svg>
            }
          />
          <BenefitCard
            n="04"
            titulo="Comparação prática"
            descricao="Notas principais, projeção, fixação e ocasiões de uso lado a lado pra decidir melhor."
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
                <path d="M6 4h12v6a6 6 0 0 1-12 0z" />
                <path d="M9 20h6M12 16v4" />
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
