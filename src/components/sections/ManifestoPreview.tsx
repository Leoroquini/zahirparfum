"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão curta do manifesto pra home.
 * Prop `mundo`:
 * - "ele" / "raiz" / undefined → manifesto neutro/masculino, CTA → /manifesto
 * - "ela" → manifesto feminino (copy adaptada), CTA → /ela/manifesto
 */
export function ManifestoPreview({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela" | "raiz";
} = {}) {
  const isEla = mundo === "ela";
  const manifestoHref = isEla ? "/ela/manifesto" : "/manifesto";

  return (
    <section
      id="manifesto-preview"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          {/* Coluna esquerda — texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Memória
            </span>

            <h2 className="font-display text-5xl font-light leading-[1.02] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Perfume é{" "}
              <em className="italic text-amber/90">memória</em>
              <br />
              que não se vê.
            </h2>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-amber/60">✦</span>
              <span className="h-px max-w-[280px] flex-1 bg-amber/30" />
            </div>

            <p className="max-w-xl text-base leading-relaxed text-ink/80 md:text-[17px]">
              {isEla ? (
                <>
                  Não somos mais um catálogo com desconto piscando. Somos a loja
                  que ensina a mulher a escolher perfume com informação, e a{" "}
                  <Link
                    href={manifestoHref}
                    className="border-b border-amber/60 font-medium text-amber transition-colors hover:text-amber-bright"
                  >
                    transformar sua rotina no ar em sua assinatura
                  </Link>
                  .
                </>
              ) : (
                <>
                  Não somos mais um catálogo com desconto piscando. Somos a loja
                  que ensina o homem a escolher o perfume com informação, e a{" "}
                  <Link
                    href={manifestoHref}
                    className="border-b border-amber/60 font-medium text-amber transition-colors hover:text-amber-bright"
                  >
                    transformar sua rotina no ar em sua assinatura
                  </Link>
                  .
                </>
              )}
            </p>

            <Link
              href={manifestoHref}
              className="group inline-flex items-center gap-3 self-start rounded-full border border-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
            >
              Ver manifesto completo
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          {/* Coluna direita — still life ilustrado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="relative flex justify-center"
          >
            <ManifestoStillLife />
          </motion.div>
        </div>

        {/* Card de pilares (embaixo) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
          className="mt-14 grid grid-cols-2 gap-4 rounded-md border border-ink/10 bg-cream-soft/80 px-6 py-7 sm:grid-cols-4 lg:gap-8 lg:px-10"
        >
          <Pilar
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" />
                <path d="M4 17a3 3 0 0 1 3-3h12" />
              </svg>
            }
            titulo="Informação"
            sub="que educa"
          />
          <Pilar
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3l2.4 6.9 7.6.6-5.8 5 1.8 7.5L12 18l-6 4 1.8-7.5L2 9.5l7.6-.6z" />
              </svg>
            }
            titulo="Escolhas"
            sub="com propósito"
          />
          <Pilar
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <ellipse cx="12" cy="18" rx="7" ry="3" />
                <path d="M8 6a4 4 0 0 1 8 0c0 4-2 6-4 9-2-3-4-5-4-9z" />
              </svg>
            }
            titulo="Experiências"
            sub="que marcam"
          />
          <Pilar
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8l4 6 5-8 5 8 4-6v11H3z" />
              </svg>
            }
            titulo="Assinaturas"
            sub="que ficam"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Pilar (4 ícones no card) ---------------- */

function Pilar({
  icon,
  titulo,
  sub,
}: {
  icon: React.ReactNode;
  titulo: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/40 bg-amber/10 text-amber">
        {icon}
      </span>
      <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber">
        {titulo}
      </span>
      <span className="text-xs italic text-ink/70">{sub}</span>
    </div>
  );
}

/* ---------------- Still life ilustrado ---------------- */

function ManifestoStillLife() {
  return (
    <div
      className="relative w-full max-w-[560px]"
      style={{ aspectRatio: "5 / 3.6" }}
    >
      {/* Vinheta de luz */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-md"
        style={{
          background:
            "radial-gradient(ellipse at 65% 40%, rgba(231,182,89,0.22), transparent 65%)",
        }}
      />

      <svg
        viewBox="0 0 560 400"
        className="relative h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="mfTray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4e9d4" />
            <stop offset="1" stopColor="#ede5d6" />
          </linearGradient>
          <linearGradient id="mfBottle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3d2210" />
            <stop offset="0.5" stopColor="#6a3d1e" />
            <stop offset="1" stopColor="#1a0e08" />
          </linearGradient>
          <radialGradient id="mfBottleShine" cx="0.3" cy="0.25" r="0.5">
            <stop offset="0" stopColor="rgba(255,220,160,0.7)" />
            <stop offset="1" stopColor="rgba(255,220,160,0)" />
          </radialGradient>
          <linearGradient id="mfGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="1" stopColor="rgba(200,155,60,0.4)" />
          </linearGradient>
          <linearGradient id="mfBox" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4e9d4" />
            <stop offset="1" stopColor="#dcc99a" />
          </linearGradient>
        </defs>

        {/* Bandeja de mármore */}
        <ellipse
          cx="280"
          cy="320"
          rx="260"
          ry="48"
          fill="url(#mfTray)"
          stroke="#c89b3c"
          strokeWidth="1"
        />
        <ellipse
          cx="280"
          cy="318"
          rx="246"
          ry="38"
          fill="#faf7f0"
          opacity="0.55"
        />
        <ellipse
          cx="280"
          cy="346"
          rx="240"
          ry="12"
          fill="rgba(0,0,0,0.08)"
        />

        {/* Galhos secos atrás */}
        <g stroke="#8c6b26" strokeWidth="1" fill="none" opacity="0.55">
          <path d="M 80 200 Q 90 130 70 70" />
          <path d="M 75 160 Q 60 140 50 120" />
          <path d="M 82 130 Q 95 110 102 90" />
          <path d="M 78 100 Q 70 80 60 65" />
        </g>
        {/* Folhinhas */}
        <g fill="#c89b3c" opacity="0.45">
          <ellipse cx="50" cy="120" rx="3" ry="2" />
          <ellipse cx="70" cy="70" rx="3" ry="2" />
          <ellipse cx="102" cy="90" rx="3" ry="2" />
          <ellipse cx="60" cy="65" rx="3" ry="2" />
        </g>

        {/* Caixa "RITUAL ZAHIR" — atrás à esquerda do frasco */}
        <g transform="translate(220, 130)">
          <rect
            x="0"
            y="0"
            width="125"
            height="155"
            rx="3"
            fill="url(#mfBox)"
            stroke="#c89b3c"
            strokeWidth="0.8"
          />
          {/* Sombra da caixa */}
          <rect
            x="0"
            y="0"
            width="125"
            height="155"
            rx="3"
            fill="rgba(140,107,38,0.08)"
          />
          {/* Borda interna */}
          <rect
            x="6"
            y="6"
            width="113"
            height="143"
            rx="2"
            fill="none"
            stroke="#c89b3c"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Z monograma */}
          <g transform="translate(62.5, 42)">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#c89b3c" strokeWidth="0.8" />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="20"
              fontStyle="italic"
              fill="#c89b3c"
            >
              Z
            </text>
          </g>

          <text
            x="62.5"
            y="86"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="12"
            letterSpacing="3"
            fill="#1a0e08"
          >
            RITUAL
          </text>
          <text
            x="62.5"
            y="102"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="12"
            letterSpacing="3"
            fill="#1a0e08"
          >
            ZAHIR
          </text>
          <line
            x1="22"
            y1="114"
            x2="103"
            y2="114"
            stroke="#c89b3c"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <text
            x="62.5"
            y="130"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="7"
            letterSpacing="2"
            fill="#1a0e08"
            opacity="0.7"
          >
            DESCUBRA O QUE
          </text>
          <text
            x="62.5"
            y="141"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="7"
            letterSpacing="2"
            fill="#1a0e08"
            opacity="0.7"
          >
            COMBINA COM VOCÊ.
          </text>
        </g>

        {/* Frasco escuro central */}
        <g transform="translate(340, 110)">
          {/* Tampa dourada */}
          <rect x="18" y="-6" width="38" height="10" rx="2" fill="#c89b3c" />
          <rect x="20" y="4" width="34" height="22" rx="2" fill="#8c6b26" />
          {/* Pescoço */}
          <rect x="26" y="26" width="22" height="14" fill="#3d2210" />
          {/* Corpo */}
          <path
            d="M 6 40 L 68 40 L 70 56 L 70 188 Q 70 198 60 198 L 14 198 Q 4 198 4 188 L 4 56 Z"
            fill="url(#mfBottle)"
            stroke="#c89b3c"
            strokeWidth="0.8"
          />
          {/* Brilho */}
          <ellipse cx="22" cy="100" rx="6" ry="48" fill="url(#mfBottleShine)" />
          {/* Selo */}
          <circle cx="37" cy="120" r="13" fill="none" stroke="#c89b3c" strokeWidth="0.7" />
          <text
            x="37"
            y="125"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="16"
            fontStyle="italic"
            fill="#c89b3c"
          >
            Z
          </text>
        </g>

        {/* Copo de cristal facetado à direita */}
        <g transform="translate(440, 180)">
          <ellipse cx="38" cy="118" rx="36" ry="6" fill="rgba(0,0,0,0.1)" />
          <path
            d="M 6 30 Q 6 28 8 28 L 68 28 Q 70 28 70 30 L 68 108 Q 68 118 56 118 L 20 118 Q 8 118 8 108 Z"
            fill="url(#mfGlass)"
            stroke="#c89b3c"
            strokeWidth="0.8"
          />
          {/* Líquido */}
          <path
            d="M 12 80 L 64 80 L 62 104 Q 62 112 52 112 L 24 112 Q 14 112 14 104 Z"
            fill="rgba(200,155,60,0.55)"
          />
          {/* Padrão facetado */}
          {[1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={14 + i * 11}
              y1="32"
              x2={14 + i * 11}
              y2="106"
              stroke="#c89b3c"
              strokeWidth="0.4"
              opacity="0.5"
            />
          ))}
          {[1, 2, 3].map((i) => (
            <line
              key={i}
              x1="8"
              y1={42 + i * 18}
              x2="68"
              y2={42 + i * 18}
              stroke="#c89b3c"
              strokeWidth="0.4"
              opacity="0.4"
            />
          ))}
          <ellipse cx="20" cy="60" rx="2.5" ry="16" fill="rgba(255,255,255,0.55)" />
        </g>

        {/* Especiarias na frente */}
        <g opacity="0.85">
          {/* Favas de baunilha */}
          <path
            d="M 330 310 Q 340 308 358 314 Q 348 318 332 316 Z"
            fill="#3d2210"
            stroke="#1a0e08"
            strokeWidth="0.4"
          />
          <path
            d="M 360 308 Q 370 306 386 312 Q 376 316 362 314 Z"
            fill="#3d2210"
            stroke="#1a0e08"
            strokeWidth="0.4"
          />
          {/* Grãos pequenos */}
          <g fill="#1a0e08">
            <circle cx="310" cy="318" r="2" />
            <circle cx="316" cy="320" r="1.8" />
            <circle cx="322" cy="316" r="1.6" />
            <circle cx="304" cy="322" r="1.6" />
            <circle cx="395" cy="318" r="1.8" />
            <circle cx="402" cy="320" r="2" />
            <circle cx="408" cy="316" r="1.6" />
            <circle cx="412" cy="322" r="1.6" />
          </g>
          {/* Lavanda */}
          <g stroke="#7a5d8c" strokeWidth="1.2" fill="none">
            <path d="M 440 320 Q 455 305 480 295" />
            <path d="M 445 326 Q 460 312 490 302" />
          </g>
          <g fill="#a481b6">
            <ellipse cx="476" cy="294" rx="3" ry="2" />
            <ellipse cx="482" cy="290" rx="2.5" ry="1.8" />
            <ellipse cx="486" cy="298" rx="2.5" ry="1.8" />
            <ellipse cx="490" cy="294" rx="2" ry="1.5" />
          </g>
          {/* Florzinha branca */}
          <g>
            <circle cx="500" cy="318" r="6" fill="#faf7f0" />
            <circle cx="500" cy="318" r="2" fill="#c89b3c" />
          </g>
        </g>
      </svg>
    </div>
  );
}
