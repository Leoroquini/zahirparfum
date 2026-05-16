"use client";

import { motion } from "motion/react";
import { PERGUNTAS } from "@/data/quiz";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero dedicada da página /ritual.
 *
 * Substitui o PageHero genérico por um layout split (texto+CTAs à esquerda,
 * slot reservado pra imagem à direita) inspirado em referências de e-commerce
 * de luxo, mas mantendo a estética editorial Zahir (sem cards arredondados
 * pesados, sem sombras).
 *
 * O CTA primário dispara um evento custom `zahir:ritual:iniciar` que o
 * componente <Ritual /> escuta pra abrir o overlay do quiz sem refactor.
 */
export function RitualHero() {
  const handleIniciar = () => {
    window.dispatchEvent(new CustomEvent("zahir:ritual:iniciar"));
  };

  const handleComoFunciona = () => {
    document
      .getElementById("ritual-passos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative overflow-hidden border-b border-ink/5 px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
      {/* Veils sutis pra dar profundidade sem competir com o conteúdo */}
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
          {/* Coluna esquerda — texto + CTAs + trust */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              O Ritual · Quiz olfativo
            </span>

            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Descubra seu perfil olfativo{" "}
              <em className="italic text-amber/90">em poucos minutos.</em>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-[17px]">
              Em {PERGUNTAS.length} perguntas curtas, entendo o que você ama, o
              que evita e como sua pele se comporta — pra indicar fragrâncias
              alinhadas ao seu gosto. Você recebe 3 da sua zona + 1 pra
              arriscar.
            </p>

            {/* CTAs */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleIniciar}
                className="group inline-flex items-center gap-4 rounded-full bg-amber px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
              >
                <span>Começar o Ritual</span>
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

            {/* Trust signals */}
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4 text-ink/75">
              <TrustItem
                label="6 perguntas"
                sub="simples e diretas"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9 11a3 3 0 1 1 4 2.83V15" />
                    <circle cx="12" cy="18.5" r=".7" fill="currentColor" />
                  </svg>
                }
              />
              <TrustItem
                label="~2 minutos"
                sub="pra completar"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                }
              />
              <TrustItem
                label="Resultado"
                sub="personalizado, com afinidade %"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 3l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 15.6 6.9 18.3l1.2-5.6L4 8.8l5.6-.6z" />
                  </svg>
                }
              />
            </ul>
          </motion.div>

          {/* Coluna direita — slot reservado pra imagem (a definir) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden border border-amber/15 bg-cream/40">
              {/* Placeholder editorial — substituir por <Image /> quando o asset chegar */}
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 30%, rgba(231,182,89,0.18), transparent 65%), radial-gradient(ellipse at 30% 80%, rgba(231,182,89,0.10), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xs italic tracking-[0.3em] text-ink/30">
                  imagem em breve
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 cards de benefício — substitui a antiga seção "Como funciona" textual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4"
        >
          <BenefitCard
            n="01"
            titulo="Sem jargão"
            descricao="Perguntas simples e diretas. Sem clichê de revista."
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
                <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" />
              </svg>
            }
          />
          <BenefitCard
            n="02"
            titulo="Leitura do seu gosto"
            descricao="Entendo família, intensidade, ocasião e o que você evita."
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
                <path d="M12 2C9 6 7 9 7 13a5 5 0 0 0 10 0c0-4-2-7-5-11z" />
              </svg>
            }
          />
          <BenefitCard
            n="03"
            titulo="Curadoria Zahir"
            descricao="3 recomendações da sua zona + 1 pra arriscar — com afinidade %."
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
                <path d="M12 3l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 15.6 6.9 18.3l1.2-5.6L4 8.8l5.6-.6z" />
              </svg>
            }
          />
          <BenefitCard
            n="04"
            titulo="Decisão com confiança"
            descricao="Você sabe o porquê de cada escolha antes de comprar."
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
        </motion.div>
      </div>
    </header>
  );
}

function TrustItem({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/30 text-amber">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-sm text-ink">{label}</span>
        <span className="text-[11px] text-ink/55">{sub}</span>
      </span>
    </li>
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
