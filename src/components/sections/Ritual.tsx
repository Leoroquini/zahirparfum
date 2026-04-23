"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  PERGUNTAS,
  calcularPerfil,
  perfumesPara,
  type Resposta,
  type Perfil,
} from "@/data/quiz";
import type { Perfume } from "@/data/catalogo";
import { addItem } from "@/lib/lista-store";
import { events } from "@/lib/track";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type StepState =
  | { kind: "intro" }
  | { kind: "pergunta"; index: number }
  | { kind: "resultado"; perfil: Perfil; perfumes: Perfume[] };

export function Ritual({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<StepState>({ kind: "intro" });
  const [respostas, setRespostas] = useState<Resposta[]>([]);

  const reset = () => {
    setStep({ kind: "intro" });
    setRespostas([]);
  };

  // Lock body scroll quando o overlay está aberto
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Fecha com Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleIniciar = () => {
    setOpen(true);
    setStep({ kind: "pergunta", index: 0 });
  };

  const handleResposta = (resposta: Resposta) => {
    const nextRespostas = [...respostas, resposta];
    setRespostas(nextRespostas);

    if (step.kind !== "pergunta") return;
    const nextIndex = step.index + 1;

    if (nextIndex >= PERGUNTAS.length) {
      const perfil = calcularPerfil(nextRespostas);
      const perfumes = perfumesPara(perfil, 3);
      setStep({ kind: "resultado", perfil, perfumes });
    } else {
      setStep({ kind: "pergunta", index: nextIndex });
    }
  };

  const handleFechar = () => {
    setOpen(false);
    // Reset depois da animação de saída
    setTimeout(reset, 400);
  };

  return (
    <>
      {/* Seção visível na home */}
      <section
        id="ritual"
        className="relative border-t border-cream/5 bg-ink-soft px-6 py-28 md:px-12 md:py-36"
      >
        <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[1fr_auto] md:items-end md:gap-24">
          {!hideIntro && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                <span className="h-px w-8 bg-amber" />
                O Ritual
              </span>
              <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl">
                Seis perguntas pra descobrir{" "}
                <em className="italic text-amber/90">seu perfil olfativo.</em>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
                Sem jargão. Sem checklist técnico. Um diálogo curto pra te
                indicar três fragrâncias do catálogo que conversam com quem você
                é hoje.
              </p>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            type="button"
            onClick={handleIniciar}
            className="group relative inline-flex items-center gap-4 self-start overflow-hidden rounded-full bg-amber px-9 py-5 text-xs font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright md:self-end"
          >
            <span>Começar o Ritual</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </div>
      </section>

      {/* Overlay fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-ink"
            role="dialog"
            aria-modal="true"
            aria-label="O Ritual — quiz olfativo"
          >
            {/* Background ambiente que muda por pergunta */}
            <AmbienteBackground step={step} />

            {/* Progress bar no topo */}
            <div className="relative z-10 border-b border-cream/5 px-6 py-5 md:px-12">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
                <span className="font-display text-xl italic text-cream">
                  O <span className="text-amber">Ritual</span>
                </span>
                <ProgressPill step={step} />
                <button
                  type="button"
                  onClick={handleFechar}
                  className="text-[11px] font-sans uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-amber"
                  aria-label="Fechar"
                >
                  Fechar ×
                </button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:px-12">
              <AnimatePresence mode="wait">
                {step.kind === "pergunta" && (
                  <PerguntaView
                    key={`p-${step.index}`}
                    index={step.index}
                    onResposta={handleResposta}
                  />
                )}
                {step.kind === "resultado" && (
                  <ResultadoView
                    key="resultado"
                    perfil={step.perfil}
                    perfumes={step.perfumes}
                    onReset={() => {
                      reset();
                      setStep({ kind: "pergunta", index: 0 });
                    }}
                    onFechar={handleFechar}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Ambiente (background que muda) ---------------- */

function AmbienteBackground({ step }: { step: StepState }) {
  const gradient = useMemo(() => {
    if (step.kind !== "pergunta") {
      return "radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.1), transparent 70%)";
    }
    return PERGUNTAS[step.index]?.ambiente ?? "";
  }, [step]);

  return (
    <motion.div
      aria-hidden
      key={gradient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0"
      style={{ background: gradient }}
    />
  );
}

/* ---------------- Progress pill ---------------- */

function ProgressPill({ step }: { step: StepState }) {
  const total = PERGUNTAS.length;
  const currentIndex =
    step.kind === "pergunta" ? step.index : step.kind === "resultado" ? total : 0;

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          animate={{
            width: i === currentIndex ? 32 : 8,
            backgroundColor:
              i < currentIndex
                ? "rgb(200,155,60)"
                : i === currentIndex
                ? "rgb(231,182,89)"
                : "rgba(244,233,212,0.15)",
          }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="h-1 rounded-full"
        />
      ))}
    </div>
  );
}

/* ---------------- Pergunta view ---------------- */

function PerguntaView({
  index,
  onResposta,
}: {
  index: number;
  onResposta: (r: Resposta) => void;
}) {
  const pergunta = PERGUNTAS[index];
  if (!pergunta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-center"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber"
      >
        {pergunta.eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        className="font-display text-3xl font-light leading-[1.15] tracking-tight text-cream md:text-5xl lg:text-6xl"
      >
        {pergunta.pergunta}
      </motion.h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {pergunta.respostas.map((r, i) => (
          <motion.button
            key={r.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.08,
              ease: EASE_OUT,
            }}
            type="button"
            onClick={() => onResposta(r)}
            className="group relative rounded-sm border border-cream/15 bg-ink-soft/50 p-6 text-left backdrop-blur-sm transition-all duration-400 hover:border-amber hover:bg-ink-soft hover:shadow-[0_0_40px_rgba(200,155,60,0.15)]"
          >
            <div className="flex items-start gap-4">
              <span className="font-display text-xl italic text-amber/70 transition-colors group-hover:text-amber-bright">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-base leading-relaxed text-cream/85 transition-colors group-hover:text-cream">
                {r.label}
              </span>
              <span className="self-center text-amber opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Resultado view ---------------- */

function ResultadoView({
  perfil,
  perfumes,
  onReset,
  onFechar,
}: {
  perfil: Perfil;
  perfumes: Perfume[];
  onReset: () => void;
  onFechar: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: EASE_OUT }}
      className="mx-auto flex w-full max-w-5xl flex-col gap-10 py-10"
    >
      {/* Cabeçalho do perfil */}
      <div className="flex flex-col items-center gap-5 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[10px] font-sans uppercase tracking-[0.5em] text-amber"
        >
          Seu perfil olfativo
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
          className="max-w-3xl font-display text-5xl font-light leading-[1.05] tracking-tight text-cream md:text-7xl"
        >
          {perfil.tituloPerfil}
          <span className="text-amber">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg"
        >
          {perfil.descricao}
        </motion.p>

        {/* Top dimensões */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-2 flex flex-wrap justify-center gap-2"
        >
          {perfil.top.map((d, i) => (
            <span
              key={d}
              className={`rounded-full border px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] ${
                i === 0
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-cream/20 text-cream/70"
              }`}
            >
              {d}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Perfumes recomendados */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col gap-6"
      >
        <span className="text-center text-[10px] font-sans uppercase tracking-[0.45em] text-amber/80">
          Fragrâncias que conversam com você
        </span>

        <div className="grid gap-4 md:grid-cols-3">
          {perfumes.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.7 + i * 0.15,
                ease: EASE_OUT,
              }}
            >
              <Link
                href={`/perfume/${p.id}`}
                className="group flex h-full flex-col gap-3 rounded-sm border border-amber/30 bg-ink-soft p-6 transition-all hover:border-amber hover:bg-ink-muted"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg italic text-amber/70">
                    Nº {String(p.numero).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/60">
                    {["Top escolha", "Segunda opção", "Surpresa"][i] ??
                      "Sugestão"}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-light leading-[1.1] text-cream transition-colors group-hover:text-amber-bright">
                  {p.nome}
                </h3>
                {p.familia && (
                  <span className="text-xs italic text-amber/70">
                    {p.familia}
                  </span>
                )}
                {p.cloneDe?.[0] && (
                  <p className="mt-1 text-xs text-cream/60">
                    <span className="italic">inspirado em </span>
                    {p.cloneDe[0]}
                  </p>
                )}
                <div className="mt-auto flex items-end justify-between border-t border-cream/10 pt-3">
                  <span className="font-display text-xl text-cream">
                    R$ {Math.round(p.precoVenda ?? 0)}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-transform duration-300 group-hover:translate-x-1">
                    Abrir →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {perfumes.length === 0 && (
          <p className="text-center text-sm italic text-cream/50">
            Combinação rara — nenhum perfume do catálogo atual encaixa
            perfeitamente. Tenta de novo ou explora o mapa olfativo.
          </p>
        )}
      </motion.div>

      {/* Captura de email com cupom 10% */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.3 }}
      >
        <CapturaEmailRitual
          perfil={perfil}
          perfumes={perfumes}
          onAddLista={() => {
            perfumes.forEach((p) => addItem(p, "frasco"));
          }}
        />
      </motion.div>

      {/* Ações finais */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.7 }}
        className="mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-5"
      >
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-cream/20 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/80 transition-all hover:border-amber hover:text-amber"
        >
          Refazer o Ritual
        </button>
        <button
          type="button"
          onClick={onFechar}
          className="rounded-full border border-cream/10 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/60 transition-all hover:text-cream"
        >
          Voltar ao site
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Captura de email com cupom ---------------- */

function CapturaEmailRitual({
  perfil,
  perfumes,
  onAddLista,
}: {
  perfil: Perfil;
  perfumes: Perfume[];
  onAddLista: () => void;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("E-mail não parece válido");
      setState("error");
      return;
    }

    setState("submitting");
    await new Promise((r) => setTimeout(r, 700));

    try {
      const existing = JSON.parse(
        localStorage.getItem("zahir-interest") ?? "[]"
      );
      localStorage.setItem(
        "zahir-interest",
        JSON.stringify([
          ...existing,
          {
            email: trimmed,
            perfil: perfil.tituloPerfil,
            perfumes: perfumes.map((p) => p.id),
            at: Date.now(),
          },
        ])
      );
    } catch {
      // silent
    }

    events.ritualEmailCapturado();
    setState("success");
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mt-6 rounded-sm border border-amber/50 bg-amber/10 p-6 text-center md:p-8"
      >
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Seu perfil está a caminho
        </span>
        <p className="mt-3 font-display text-xl font-light italic text-cream md:text-2xl">
          Use o cupom{" "}
          <span className="not-italic font-normal text-amber tracking-wider">
            RITUAL10
          </span>{" "}
          na primeira compra.
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-cream/70">
          Mande o cupom junto com a reserva no Instagram — a gente aplica em
          frasco cheio ou decant.
        </p>
        <button
          type="button"
          onClick={onAddLista}
          className="mt-5 text-[10px] font-sans uppercase tracking-[0.3em] text-amber underline underline-offset-4 transition-colors hover:text-amber-bright"
        >
          Adicionar as 3 sugestões à minha lista
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 rounded-sm border border-cream/10 bg-ink/40 p-5 backdrop-blur-sm md:p-7"
    >
      <div className="flex flex-col gap-2 text-center">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Leve seu perfil
        </span>
        <p className="font-display text-lg font-light italic text-cream md:text-xl">
          Receba seu perfil + cupom de{" "}
          <span className="not-italic font-normal text-amber">
            10% na primeira compra
          </span>
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          disabled={state === "submitting"}
          placeholder="seu@email.com"
          className="flex-1 rounded-full border border-cream/15 bg-ink/60 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-amber focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright disabled:opacity-70"
        >
          {state === "submitting" ? "Enviando…" : "Receber cupom"}
          {state !== "submitting" && (
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </div>

      {state === "error" && (
        <p className="mt-2 text-xs italic" style={{ color: "#d88b8f" }}>
          {error}
        </p>
      )}
      {state === "idle" && (
        <p className="mt-3 text-center text-[10px] italic text-cream/40">
          Sem spam. A gente avisa só quando sair novidade relevante.
        </p>
      )}
    </form>
  );
}
