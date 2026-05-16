"use client";

import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero dedicada da página /decants.
 *
 * Split editorial: texto + 3 trust signals + 2 CTAs à esquerda; slot
 * reservado pra still life dos decants à direita (placeholder até a foto
 * chegar). Abaixo, 4 cards de benefício que substituem o antigo FAQ
 * comprido como primeira impressão da página.
 */
export function DecantsHero() {
  const handleExplorar = () => {
    document
      .getElementById("decants")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleComoFunciona = () => {
    document
      .getElementById("decants-faq")
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
              Decants · Antes de pertencer, conheça
            </span>

            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Conheça antes{" "}
              <em className="italic text-amber/90">de pertencer.</em>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-[17px]">
              Os decants Zahir permitem experimentar fragrâncias autênticas na
              sua pele antes de investir no frasco completo. 5ml ou 10ml do
              mesmo perfume original, envasados aqui, com atomizador próprio.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleExplorar}
                className="group inline-flex items-center gap-4 rounded-full bg-amber px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
              >
                <span>Explorar decants</span>
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

            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4 text-ink/75">
              <TrustItem
                label="Fragrâncias originais"
                sub="100% autênticas"
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
                    <path d="M12 2c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />
                  </svg>
                }
              />
              <TrustItem
                label="Curadoria Zahir"
                sub="qualidade que você confia"
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
                    <circle cx="12" cy="9" r="5" />
                    <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
                  </svg>
                }
              />
              <TrustItem
                label="Baixo risco"
                sub="descubra seu próximo favorito"
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
                    <path d="M3 7l9-4 9 4-9 4-9-4z" />
                    <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
                  </svg>
                }
              />
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden border border-amber/15 bg-cream/40">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4"
        >
          <BenefitCard
            n="01"
            titulo="Mesmo perfume"
            descricao="Decants preenchidos com o mesmo líquido 100% autêntico do frasco original."
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
              </svg>
            }
          />
          <BenefitCard
            n="02"
            titulo="Ideal pra testar"
            descricao="Descubra como a fragrância evolui em você ao longo do dia, na sua pele."
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
                <path d="M4 12c0-4 4-7 8-7s8 3 8 7c0 6-8 9-8 9s-8-3-8-9z" />
                <path d="M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            }
          />
          <BenefitCard
            n="03"
            titulo="5ml e 10ml"
            descricao="Escolha o tamanho ideal pra sua experiência — viagem, uso pontual, semana inteira."
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
                <rect x="6" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="7" width="5" height="14" rx="1" />
              </svg>
            }
          />
          <BenefitCard
            n="04"
            titulo="Decida com certeza"
            descricao="Menos risco, mais acerto — sua próxima assinatura olfativa começa aqui."
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
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4.3-4.3" />
              </svg>
            }
          />
        </motion.div>

        {/* Tira editorial inferior */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-ink/10 pt-8 text-[10px] font-sans uppercase tracking-[0.45em] text-amber/80 md:gap-x-10">
          <span>Experimente</span>
          <span aria-hidden className="text-amber/40">·</span>
          <span>Sinta</span>
          <span aria-hidden className="text-amber/40">·</span>
          <span>Escolha</span>
          <span aria-hidden className="text-amber/40">·</span>
          <span>Pertença</span>
        </div>
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
