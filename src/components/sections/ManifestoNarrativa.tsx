"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão scrolltelling do Manifesto. Cinco cenas tipográficas
 * que se sucedem conforme o cliente rola — cada cena prende, troca,
 * sem sobreposição (lição aprendida do EvolucaoNarrativa v1).
 *
 * Renderiza só em desktop ≥1024 com hardware decente. Mobile e
 * low-end recebem a versão tradicional via wrapper ManifestoSection.
 */

const CENAS = [
  { id: "hook", rotulo: "01" },
  { id: "confronto", rotulo: "02" },
  { id: "linguagem", rotulo: "03" },
  { id: "sintese", rotulo: "04" },
  { id: "pacto", rotulo: "05" },
] as const;

const FASE_THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export function ManifestoNarrativa() {
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

  return (
    <div
      ref={containerRef}
      className="relative bg-ink-soft"
      style={{ height: "500vh" /* 5 cenas × 100vh */ }}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background gradient sutil — muda discretamente entre cenas */}
        <BackgroundGradient faseIdx={faseIdx} />

        {/* Indicador de progresso lateral */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <ul className="flex flex-col gap-5">
            {CENAS.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center gap-3 transition-opacity duration-500"
                style={{ opacity: i === faseIdx ? 1 : 0.35 }}
              >
                <span
                  className={`h-px w-10 transition-all duration-500 ${
                    i <= faseIdx ? "bg-amber" : "bg-cream/30"
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

        {/* Cena ativa — uma de cada vez, sem sobreposição */}
        <div className="relative z-0 mx-auto w-full max-w-6xl px-6 md:px-12 lg:pl-32">
          <AnimatePresence mode="wait">
            {faseIdx === 0 && <CenaHook key="cena-hook" />}
            {faseIdx === 1 && <CenaConfronto key="cena-confronto" />}
            {faseIdx === 2 && <CenaLinguagem key="cena-linguagem" />}
            {faseIdx === 3 && <CenaSintese key="cena-sintese" />}
            {faseIdx === 4 && <CenaPacto key="cena-pacto" />}
          </AnimatePresence>
        </div>

        {/* Hint "continua rolando" só na primeira cena */}
        {faseIdx === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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

/* ---------------- Background gradient por cena ---------------- */

function BackgroundGradient({ faseIdx }: { faseIdx: number }) {
  const gradients = [
    "radial-gradient(ellipse at 30% 50%, rgba(231,182,89,0.10), transparent 65%)",
    "radial-gradient(ellipse at 50% 50%, rgba(74,21,24,0.18), transparent 65%)",
    "radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.12), transparent 60%)",
    "radial-gradient(ellipse at 70% 50%, rgba(231,182,89,0.10), transparent 65%)",
    "radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.16), transparent 55%)",
  ];
  return (
    <motion.div
      key={faseIdx}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="pointer-events-none absolute inset-0"
      style={{ background: gradients[faseIdx] ?? gradients[0] }}
    />
  );
}

/* ---------------- Wrapper de cena (anim de entrada/saída) ---------------- */

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

/* ---------------- Cena 1 — Hook ---------------- */

function CenaHook() {
  return (
    <CenaWrapper>
      <div className="flex flex-col items-start gap-10 text-left">
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber">
          Manifesto · 01
        </span>
        <h2 className="max-w-4xl font-display text-5xl font-light leading-[0.95] tracking-tight text-cream md:text-7xl lg:text-8xl">
          Perfume é{" "}
          <em className="italic text-amber/95">memória</em>
          <br />
          que não se vê.
        </h2>
        <div className="mt-6 flex items-center gap-5">
          <span className="h-px w-16 bg-amber/60" />
          <p className="font-display text-xl italic leading-[1.4] text-cream/80 md:text-2xl">
            Todo homem deixa um rastro.{" "}
            <em className="not-italic text-amber/95">Mesmo sem querer.</em>
          </p>
        </div>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 2 — Rejeita × Defende ---------------- */

function CenaConfronto() {
  return (
    <CenaWrapper>
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-wine/85">
            <span className="mr-2 text-wine">×</span> O que a gente rejeita
          </span>
          <ul className="flex flex-col gap-4 font-display text-xl font-light leading-[1.3] text-cream/65 md:text-2xl">
            <li className="border-l-2 border-wine/50 pl-4">
              Catálogo inflado piscando desconto
            </li>
            <li className="border-l-2 border-wine/50 pl-4">
              Vendedor que decora preço mas não conhece nota
            </li>
            <li className="border-l-2 border-wine/50 pl-4">
              Promessa barata de “ser notado”
            </li>
            <li className="border-l-2 border-wine/50 pl-4">
              Homem de terno segurando frasco. Cara séria. Nada atrás.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-2">✦</span> O que a gente defende
          </span>
          <ul className="flex flex-col gap-4 font-display text-xl font-light leading-[1.3] text-cream md:text-2xl">
            <li className="border-l-2 border-amber pl-4">
              Curadoria feroz, catálogo compacto
            </li>
            <li className="border-l-2 border-amber pl-4">
              Nota explicada em português, sem jargão
            </li>
            <li className="border-l-2 border-amber pl-4">
              Decant antes do frasco — testa, depois investe
            </li>
            <li className="border-l-2 border-amber pl-4">
              Fidelidade em número. Não em promessa.
            </li>
          </ul>
        </div>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 3 — Linguagem ---------------- */

function CenaLinguagem() {
  return (
    <CenaWrapper>
      <div className="relative mx-auto max-w-4xl text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none font-display italic text-amber/[0.05]"
          style={{ fontSize: "clamp(14rem, 38vw, 32rem)", lineHeight: 1 }}
        >
          ·
        </span>
        <p className="font-display text-3xl font-light leading-[1.15] tracking-tight text-cream md:text-5xl lg:text-6xl">
          Perfume é{" "}
          <em className="italic text-amber">linguagem</em> — a mais discreta{" "}
          <br className="hidden md:block" />
          das vozes masculinas.
        </p>
        <p className="mx-auto mt-8 max-w-xl text-base italic leading-relaxed text-cream/55 md:text-lg">
          Quem entende, usa pra se revelar. Quem não entende, usa porque alguém
          mandou. Entre os dois: só informação.
        </p>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 4 — Menos × Mais ---------------- */

function CenaSintese() {
  const pares = [
    { menos: "catálogo", mais: "curadoria" },
    { menos: "desconto", mais: "contexto" },
    { menos: "empurrão", mais: "ritual" },
  ];
  return (
    <CenaWrapper>
      <div className="flex flex-col gap-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          A equação ZAHIR
        </span>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3 md:gap-x-12">
          {pares.map((p, i) => (
            <motion.div
              key={p.mais}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: EASE_OUT }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-display text-xs italic tracking-tight text-cream/40">
                menos
              </span>
              <span className="font-display text-3xl font-light italic leading-none text-cream/50 line-through decoration-wine/40 md:text-5xl">
                {p.menos}
              </span>
              <span className="my-2 h-px w-12 bg-amber/60" />
              <span className="font-display text-xs italic tracking-tight text-amber/85">
                mais
              </span>
              <span className="font-display text-4xl font-light leading-none text-amber md:text-6xl">
                {p.mais}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </CenaWrapper>
  );
}

/* ---------------- Cena 5 — Pacto ---------------- */

function CenaPacto() {
  return (
    <CenaWrapper>
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-sm border-l-4 border-amber bg-ink/60 px-8 py-12 backdrop-blur-sm md:px-14 md:py-16">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            O pacto
          </span>
          <p className="mt-6 font-display text-2xl font-light italic leading-[1.4] text-cream md:text-4xl lg:text-5xl">
            Se você vai ser lembrado por alguma coisa hoje, que seja{" "}
            <em className="not-italic font-normal text-amber">
              pelo que você é.
            </em>
          </p>
          <p className="mt-8 text-sm italic leading-relaxed text-cream/65 md:text-base">
            A gente só ajuda você a escrever isso no ar — com as letras certas.
          </p>
        </div>
      </div>
    </CenaWrapper>
  );
}
