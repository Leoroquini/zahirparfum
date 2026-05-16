"use client";

import { motion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  totalFragrancias: number;
  totalFamilias: number;
  totalMarcas: number;
};

/**
 * Hero dedicada da página /catalogo.
 *
 * Layout split com fundo escuro (mármore ink), pra contrastar com o
 * resto do site cream e dar peso editorial ao "explorar o catálogo".
 * Esquerda: slot reservado pra still life dos frascos. Direita: eyebrow,
 * título grande sobre fundo escuro, descrição, 3 trust badges (originais
 * / exclusividade / experiência completa) e 2 CTAs.
 *
 * Abaixo do hero principal: tira escura horizontal com 4 selos de serviço
 * (frete, parcelas, amostras, embalagem) — espelhando a referência.
 */
export function CatalogoHero({
  totalFragrancias,
  totalFamilias,
  totalMarcas,
}: Props) {
  return (
    <>
      <header className="relative overflow-hidden border-b border-ink/40 bg-ink px-6 pb-16 pt-32 text-cream md:px-12 md:pb-24 md:pt-40">
        {/* Veil radial amber pra dar profundidade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 75% 35%, rgba(231,182,89,0.18), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 10% 80%, rgba(231,182,89,0.10), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            {/* Slot da imagem (esquerda) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="relative hidden lg:block"
              aria-hidden
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-amber/20 bg-ink/40">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, rgba(231,182,89,0.20), transparent 65%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-xs italic tracking-[0.3em] text-amber/40">
                    imagem em breve
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Texto + trust + CTAs (direita) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
              className="flex flex-col gap-7"
            >
              <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                <span className="h-px w-8 bg-amber" />
                Catálogo · Curadoria
              </span>

              <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-cream md:text-6xl lg:text-7xl">
                Encontre o perfume{" "}
                <em className="italic text-amber/90">que conta a sua história.</em>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-cream/75 md:text-[17px]">
                Selecionamos os melhores perfumes árabes do mundo pra quem busca
                exclusividade, personalidade e experiências inesquecíveis. Notas
                explicadas, comparação com clones designer e decants nos
                principais SKUs.
              </p>

              {/* Trust badges */}
              <ul className="mt-2 grid gap-5 sm:grid-cols-3">
                <TrustBadge
                  label="Originais"
                  sub="Garantia de procedência e qualidade"
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
                <TrustBadge
                  label="Exclusividade"
                  sub="Fragrâncias únicas e sofisticadas"
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
                <TrustBadge
                  label="Experiência completa"
                  sub="Do frasco ao ritual, cada detalhe importa"
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
              </ul>

              {/* CTAs */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="#catalogo"
                  className="group inline-flex items-center gap-4 rounded-full bg-amber px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
                >
                  <span>Explorar catálogo</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/mapa"
                  className="group inline-flex items-center gap-3 rounded-full border border-cream/30 px-8 py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-cream transition-all hover:border-amber hover:text-amber"
                >
                  <span>Mapa olfativo</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-cream/15 pt-6">
                <Stat label="Fragrâncias" value={totalFragrancias.toString()} />
                <Stat label="Famílias" value={totalFamilias.toString()} />
                <Stat label="Casas árabes" value={totalMarcas.toString()} />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Tira de serviços (espelha referência) */}
      <section className="bg-ink/95 px-6 py-6 text-cream md:px-12 md:py-7">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          <ServiceItem
            titulo="Frete grátis"
            sub="Para todo o Brasil acima de R$299"
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
                <rect x="1" y="6" width="14" height="11" rx="1" />
                <path d="M15 9h4l3 4v4h-7z" />
                <circle cx="6" cy="19" r="1.5" />
                <circle cx="18" cy="19" r="1.5" />
              </svg>
            }
          />
          <ServiceItem
            titulo="Até 3x sem juros"
            sub="Parcele suas compras sem complicações"
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
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18M7 15h4" />
              </svg>
            }
          />
          <ServiceItem
            titulo="Amostras exclusivas"
            sub="Em compras selecionadas acima de R$349"
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
          <ServiceItem
            titulo="Embalagem premium"
            sub="Cada detalhe pensado pra surpreender"
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
                <path d="M3 8h18v13H3zM3 8l3-5h12l3 5M12 8v13" />
              </svg>
            }
          />
        </div>
      </section>
    </>
  );
}

function TrustBadge({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex flex-col items-start gap-2">
      <span className="text-amber">{icon}</span>
      <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/85">
        {label}
      </span>
      <span className="text-[12px] leading-relaxed text-cream/65">{sub}</span>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
        {label}
      </span>
      <span className="font-display text-2xl font-light text-cream md:text-3xl">
        {value}
      </span>
    </div>
  );
}

function ServiceItem({
  titulo,
  sub,
  icon,
}: {
  titulo: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-amber">{icon}</span>
      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-sans uppercase tracking-[0.32em] text-amber">
          {titulo}
        </span>
        <span className="text-[12px] leading-snug text-cream/70">{sub}</span>
      </div>
    </div>
  );
}
