"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero scrolltelling experimental — substitui o Hero estático.
 * Quatro cenas que se sucedem conforme o cliente rola, antes da
 * primeira seção de conteúdo (Catálogo etc).
 *
 * Renderiza só em desktop ≥1024 com hardware decente. Fallback
 * em mobile e low-end via wrapper HeroSection.
 */

const CENAS = [
  { id: "tese", rotulo: "01" },
  { id: "provocacao", rotulo: "02" },
  { id: "promessa", rotulo: "03" },
  { id: "convite", rotulo: "04" },
] as const;

const FASE_THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

export function HeroNarrativo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [faseIdx, setFaseIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let nova = 0;
    for (let i = 0; i < FASE_THRESHOLDS.length - 1; i++) {
      if (v >= FASE_THRESHOLDS[i] && v < FASE_THRESHOLDS[i + 1]) {
        nova = i;
        break;
      }
    }
    if (v >= 1) nova = CENAS.length - 1;
    setFaseIdx(nova);
  });

  // Imagem de fundo cross-fade — landscape sai, ingredients entra suave
  const opacityLandscape = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    [1, 0.5, 0.15],
  );
  const scaleLandscape = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={containerRef}
      className="relative bg-ink"
      style={{ height: "400vh" /* 4 cenas × 100vh */ }}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden pt-24">
        {/* Fundo cinematográfico — paisagem que escurece e amplia ao rolar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: opacityLandscape, scale: scaleLandscape }}
        >
          <Image
            src="/hero/landscape.png"
            alt=""
            fill
            priority
            quality={72}
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "saturate(1.05) contrast(1.02)" }}
          />
        </motion.div>

        {/* Camadas escurecedoras — sempre presentes pra legibilidade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/55 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent"
        />

        {/* Indicador lateral 01-04 */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <ul className="flex flex-col gap-5">
            {CENAS.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center gap-3 transition-opacity duration-500"
                style={{ opacity: i === faseIdx ? 1 : 0.35 }}
              >
                <span
                  className={`h-px transition-all duration-500 ${
                    i <= faseIdx ? "w-12 bg-amber" : "w-8 bg-cream/30"
                  }`}
                />
                <span
                  className={`text-[9px] font-sans uppercase tracking-[0.4em] ${
                    i === faseIdx ? "text-amber" : "text-cream/55"
                  }`}
                >
                  {c.rotulo}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cena ativa */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12 lg:pl-32">
          <AnimatePresence mode="wait">
            {faseIdx === 0 && <CenaTese key="tese" />}
            {faseIdx === 1 && <CenaProvocacao key="provocacao" />}
            {faseIdx === 2 && <CenaPromessa key="promessa" />}
            {faseIdx === 3 && <CenaConvite key="convite" />}
          </AnimatePresence>
        </div>

        {/* Hint inicial */}
        {faseIdx === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <span className="text-[9px] font-sans uppercase tracking-[0.45em] text-cream/45">
              Continua rolando
            </span>
            <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-cream/40 to-transparent" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Wrapper de cena ---------------- */

function CenaWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Cena 1 — Tese ---------------- */

function CenaTese() {
  return (
    <CenaWrapper>
      <div className="flex flex-col items-start gap-8 text-left">
        <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.55em] text-amber">
          <span className="h-px w-12 bg-amber/70" />
          Perfumaria árabe · Edição Brasil
        </span>
        <h1 className="font-display leading-[0.95] tracking-[-0.035em] text-cream">
          <span className="block text-[clamp(3.5rem,9vw,8rem)] font-light">
            O que fica
          </span>
          <span
            className="block text-[clamp(3.5rem,9vw,8rem)] font-light italic"
            style={{
              background:
                "linear-gradient(135deg, #F4E9D4 0%, #E7B659 25%, #C89B3C 55%, #8C6B26 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter:
                "drop-shadow(0 0 30px rgba(231, 182, 89, 0.4)) drop-shadow(0 2px 8px rgba(200, 155, 60, 0.25))",
            }}
          >
            depois
          </span>
          <span className="block text-[clamp(3.5rem,9vw,8rem)] font-light">
            que você passa<span className="text-amber">.</span>
          </span>
        </h1>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 2 — Provocação ---------------- */

function CenaProvocacao() {
  return (
    <CenaWrapper>
      <div className="flex max-w-3xl flex-col gap-10 text-left">
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
          Por quê ZAHIR
        </span>
        <h2 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-cream md:text-6xl lg:text-7xl">
          Pro homem que quer cheirar bem —{" "}
          <em className="italic text-amber/95">e saber por quê.</em>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
          Cada perfume com ficha técnica. Fidelidade declarada em número, não
          em promessa. Decant antes do frasco. Sem cadastro, sem empurrão.
        </p>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 3 — Promessa ---------------- */

function CenaPromessa() {
  const numeros = [
    { n: "28", l: "fragrâncias curadas" },
    { n: "06", l: "curadorias temáticas" },
    { n: "100%", l: "originais árabes" },
  ];
  return (
    <CenaWrapper>
      <div className="flex flex-col gap-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
          O que tem aqui dentro
        </span>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {numeros.map((item, i) => (
            <motion.div
              key={item.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.15,
                ease: EASE_OUT,
              }}
              className="flex flex-col gap-3"
            >
              <span className="font-display text-7xl font-light leading-none text-amber md:text-8xl lg:text-9xl">
                {item.n}
              </span>
              <span className="font-display text-base italic text-cream/75 md:text-lg">
                {item.l}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 4 — Convite ---------------- */

function CenaConvite() {
  return (
    <CenaWrapper>
      <div className="flex flex-col items-start gap-10 text-left">
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
          Como começar
        </span>
        <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.1] tracking-tight text-cream md:text-6xl lg:text-7xl">
          Faça o Ritual e descubra{" "}
          <em className="italic text-amber/95">seu perfil olfativo.</em>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
          Seis perguntas, noventa segundos. Sai com três perfumes casados com
          quem você é hoje — não com quem alguém quer te vender.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/ritual"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-9 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright"
          >
            Fazer o Ritual
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-9 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream transition-all duration-500 hover:border-amber hover:text-amber"
          >
            Explorar catálogo
          </Link>
        </div>
        <p className="mt-2 text-xs italic text-cream/50">
          Ou continua rolando pra ver o que tem no catálogo logo abaixo ↓
        </p>
      </div>
    </CenaWrapper>
  );
}
