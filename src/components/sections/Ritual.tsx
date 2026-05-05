"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  PERGUNTAS,
  calcularPerfil,
  recomendacoesPara,
  type Resposta,
  type Perfil,
  type Recomendacoes,
  type RecomendacaoPerfume,
} from "@/data/quiz";
import { addItem } from "@/lib/lista-store";
import { events } from "@/lib/track";
import { linkWhatsApp, linkInstagram } from "@/lib/reserva-dm";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type StepState =
  | { kind: "intro" }
  | { kind: "pergunta"; index: number }
  | { kind: "resultado"; perfil: Perfil; recomendacoes: Recomendacoes };

const RITUAL_STATE_KEY = "zahir-ritual-progresso";

type PersistedState = {
  stepIndex: number; // índice da pergunta em andamento
  respostaKeys: { perguntaId: string; respostaKey: string }[];
};

function loadProgress(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RITUAL_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveProgress(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(RITUAL_STATE_KEY, JSON.stringify(state));
  } catch {
    // silent
  }
}

function clearProgress() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RITUAL_STATE_KEY);
}

export function Ritual({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<StepState>({ kind: "intro" });
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [temProgresso, setTemProgresso] = useState(() => {
    const p = loadProgress();
    return !!p && p.stepIndex > 0 && p.stepIndex < PERGUNTAS.length;
  });

  const reset = () => {
    setStep({ kind: "intro" });
    setRespostas([]);
    clearProgress();
    setTemProgresso(false);
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
    // Se tem progresso salvo, retoma dali
    const p = loadProgress();
    if (p && p.stepIndex > 0 && p.stepIndex < PERGUNTAS.length) {
      const resps: Resposta[] = [];
      for (const item of p.respostaKeys) {
        const perg = PERGUNTAS.find((pp) => pp.id === item.perguntaId);
        const r = perg?.respostas.find((rr) => rr.key === item.respostaKey);
        if (r) resps.push(r);
      }
      setRespostas(resps);
      setStep({ kind: "pergunta", index: p.stepIndex });
    } else {
      setStep({ kind: "pergunta", index: 0 });
    }
  };

  const handleIniciarDoZero = () => {
    clearProgress();
    setTemProgresso(false);
    setRespostas([]);
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
      const recomendacoes = recomendacoesPara(perfil);
      setStep({ kind: "resultado", perfil, recomendacoes });
      events.ritualCompleto(perfil.tituloPerfil);
      clearProgress(); // terminou, limpa
    } else {
      // Persiste progresso
      saveProgress({
        stepIndex: nextIndex,
        respostaKeys: nextRespostas.map((r, idx) => ({
          perguntaId: PERGUNTAS[idx].id,
          respostaKey: r.key,
        })),
      });
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
      <section id="ritual"
        className="section-veil-light relative border-t border-ink/5 px-6 py-28 md:px-12 md:py-36"
      >
        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[1fr_auto] md:items-end md:gap-24">
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
              <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
                Seis perguntas pra descobrir{" "}
                <em className="italic text-amber/90">seu perfil olfativo.</em>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
                Como um curador de verdade: pergunto o que você já amou, o que
                evita, como sua pele se comporta. Você sai com 3 fragrâncias da
                sua zona + 1 pra arriscar — cada uma com afinidade % e por quê.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="flex flex-col items-start gap-2 md:items-end"
          >
            <button
              type="button"
              onClick={handleIniciar}
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-amber px-9 py-5 text-xs font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright"
            >
              <span>
                {temProgresso ? "Continuar o Ritual" : "Começar o Ritual"}
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
            {temProgresso && (
              <button
                type="button"
                onClick={handleIniciarDoZero}
                className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70 transition-colors hover:text-amber"
              >
                ou recomeçar do zero
              </button>
            )}
          </motion.div>
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
            className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-cream"
            role="dialog"
            aria-modal="true"
            aria-label="O Ritual, quiz olfativo"
          >
            {/* Camada de mármore como fundo base (mesma textura do site) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: "url('/textures/marble-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Background ambiente que muda por pergunta */}
            <AmbienteBackground step={step} />

            {/* Progress bar no topo */}
            <div className="relative z-10 border-b border-ink/5 px-6 py-5 md:px-12">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
                <span className="font-display text-xl italic text-ink">
                  O <span className="text-amber">Ritual</span>
                </span>
                <ProgressPill step={step} />
                <button
                  type="button"
                  onClick={handleFechar}
                  className="text-[11px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-colors hover:text-amber"
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
                    recomendacoes={step.recomendacoes}
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
        className="font-display text-3xl font-light leading-[1.15] tracking-tight text-ink md:text-5xl lg:text-6xl"
      >
        {pergunta.pergunta}
      </motion.h2>

      {pergunta.hint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mx-auto -mt-4 max-w-xl text-sm italic leading-relaxed text-ink/65"
        >
          {pergunta.hint}
        </motion.p>
      )}

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
            className="group relative rounded-sm border border-ink/15 bg-cream-soft/50 p-6 text-left backdrop-blur-sm transition-all duration-400 hover:border-amber hover:hover:shadow-[0_0_40px_rgba(200,155,60,0.15)]"
          >
            <div className="flex items-start gap-4">
              <span className="font-display text-xl italic text-amber/70 transition-colors group-hover:text-amber-bright">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-base leading-relaxed text-ink/85 transition-colors group-hover:text-ink">
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
  recomendacoes,
  onReset,
  onFechar,
}: {
  perfil: Perfil;
  recomendacoes: Recomendacoes;
  onReset: () => void;
  onFechar: () => void;
}) {
  const todasAsRecs: RecomendacaoPerfume[] = [
    ...recomendacoes.conforto,
    ...(recomendacoes.ousadia ? [recomendacoes.ousadia] : []),
  ];

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
          className="max-w-3xl font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl"
        >
          {perfil.tituloPerfil}
          <span className="text-amber">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg"
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
                  : "border-ink/20 text-ink/70"
              }`}
            >
              {d}
            </span>
          ))}
        </motion.div>
      </div>

      {/* SUA ZONA DE CONFORTO — 3 perfumes alinhados */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col gap-6"
      >
        <div className="text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber/80">
            Sua zona de conforto
          </span>
          <p className="mt-2 text-sm italic text-ink/65">
            Três fragrâncias do catálogo que casam com seu perfil
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recomendacoes.conforto.map((rec, i) => (
            <motion.div
              key={rec.perfume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.7 + i * 0.15,
                ease: EASE_OUT,
              }}
            >
              <RecCard rec={rec} rank={i} />
            </motion.div>
          ))}
        </div>

        {recomendacoes.conforto.length === 0 && (
          <p className="text-center text-sm italic text-ink/70">
            Combinação rara — seus filtros eliminaram tudo do catálogo. Tenta de
            novo escolhendo "Nenhum desses" no veto.
          </p>
        )}
      </motion.div>

      {/* PRA ARRISCAR — 1 perfume fora da zona */}
      {recomendacoes.ousadia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col gap-4"
        >
          <div className="text-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber/80">
              Pra arriscar
            </span>
            <p className="mt-2 text-sm italic text-ink/65">
              Fora do óbvio, mas pode te surpreender
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <RecCard rec={recomendacoes.ousadia} ousadia />
          </div>
        </motion.div>
      )}

      {/* Captura WhatsApp/Email */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <CapturaContatoRitual
          perfil={perfil}
          recomendacoes={todasAsRecs}
          onAddLista={() => {
            recomendacoes.conforto.forEach((r) => addItem(r.perfume, "frasco"));
          }}
        />
      </motion.div>

      {/* Ações finais */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.9 }}
        className="mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-5"
      >
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-ink/20 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
        >
          Refazer o Ritual
        </button>
        <button
          type="button"
          onClick={onFechar}
          className="rounded-full border border-ink/10 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-all hover:text-ink"
        >
          Voltar ao site
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Card de recomendação ---------------- */

function RecCard({
  rec,
  rank,
  ousadia = false,
}: {
  rec: RecomendacaoPerfume;
  rank?: number;
  ousadia?: boolean;
}) {
  const labelRank = ousadia
    ? "Pra abrir o repertório"
    : ["Top escolha", "Segunda opção", "Terceira"][rank ?? 0] ?? "Sugestão";

  return (
    <Link
      href={`/perfume/${rec.perfume.id}`}
      className={`group flex h-full flex-col gap-3 rounded-sm border p-6 transition-all hover:shadow-product ${
        ousadia
          ? "border-amber-dim/40 bg-cream-soft/40"
          : "border-amber/30 bg-cream-soft/40 hover:border-amber"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-lg italic text-amber/70">
          Nº {String(rec.perfume.numero).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber-dim">
          {labelRank}
        </span>
      </div>

      <h3 className="font-display text-2xl font-light leading-[1.1] text-ink transition-colors group-hover:text-amber-bright">
        {rec.perfume.nome}
      </h3>

      {rec.perfume.familia && (
        <span className="text-xs italic text-amber/70">
          {rec.perfume.familia}
        </span>
      )}

      {rec.perfume.cloneDe?.[0] && (
        <p className="text-xs text-ink/75">
          <span className="italic">inspirado em </span>
          {rec.perfume.cloneDe[0]}
        </p>
      )}

      {/* Justificativa "porque" */}
      <div className="mt-1 rounded-sm border-l-2 border-amber-dim/50 bg-amber-dim/5 px-3 py-2">
        <span className="block text-[9px] font-sans uppercase tracking-[0.35em] text-amber-dim">
          Recomendado porque
        </span>
        <p className="mt-1 text-xs leading-relaxed text-ink/80">{rec.porque}</p>
      </div>

      {/* Afinidade + preço */}
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/65">
            Afinidade
          </span>
          <span className="font-display text-lg text-amber">
            {rec.afinidade}%
          </span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/65">
            A partir de
          </span>
          <span className="font-display text-lg text-ink">
            R$ {Math.round(rec.perfume.precoVenda ?? 0)}
          </span>
        </div>
      </div>

      <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-transform duration-300 group-hover:translate-x-1">
        Abrir ficha →
      </span>
    </Link>
  );
}

/* ---------------- Captura: WhatsApp/Instagram + email opcional ---------------- */

function CapturaContatoRitual({
  perfil,
  recomendacoes,
  onAddLista,
}: {
  perfil: Perfil;
  recomendacoes: RecomendacaoPerfume[];
  onAddLista: () => void;
}) {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [emailError, setEmailError] = useState("");

  const mensagem = useMemo(() => {
    const linhas = [
      `Olá! Acabei de fazer o Ritual no site da Zahir.`,
      ``,
      `Meu perfil: ${perfil.tituloPerfil}`,
      ``,
      `Top sugestões pra mim:`,
      ...recomendacoes.slice(0, 4).map(
        (r, i) =>
          `${i + 1}. ${r.perfume.nome} (Nº ${String(r.perfume.numero).padStart(
            2,
            "0"
          )}) — ${r.afinidade}% afinidade${
            r.tipo === "ousadia" ? " · pra arriscar" : ""
          }`
      ),
      ``,
      `Posso conversar com vocês sobre as opções?`,
    ];
    return linhas.join("\n");
  }, [perfil, recomendacoes]);

  const waUrl = linkWhatsApp(mensagem);
  const igUrl = linkInstagram(mensagem);

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("E-mail não parece válido");
      setEmailState("error");
      return;
    }

    setEmailState("submitting");
    await new Promise((r) => setTimeout(r, 600));

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
            perfumes: recomendacoes.map((r) => r.perfume.id),
            at: Date.now(),
          },
        ])
      );
    } catch {
      // silent
    }

    events.ritualEmailCapturado();
    setEmailState("success");
  };

  return (
    <div className="mt-6 flex flex-col gap-5 rounded-sm border border-ink/10 bg-cream/40 p-5 backdrop-blur-sm md:p-7">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Leve seu perfil
        </span>
        <p className="font-display text-lg font-light italic text-ink md:text-xl">
          Recebe a curadoria via{" "}
          <span className="not-italic font-normal text-amber">WhatsApp</span> e
          fala direto com a gente
        </p>
      </div>

      {/* Botões de canal */}
      <div className="grid gap-3 sm:grid-cols-2">
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            <span>Receber no WhatsApp</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        )}
        <a
          href={igUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/30 bg-cream-soft/60 px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-ink hover:bg-cream"
        >
          <span>Conversar no Instagram</span>
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={onAddLista}
        className="self-center text-[10px] font-sans uppercase tracking-[0.3em] text-amber underline underline-offset-4 transition-colors hover:text-amber-bright"
      >
        Ou adicionar as 3 sugestões à minha lista de reserva
      </button>

      {/* Email opcional pra cupom */}
      <div className="mt-2 border-t border-ink/10 pt-5">
        {emailState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="rounded-sm border border-amber/40 bg-amber/10 p-4 text-center"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              Cupom liberado
            </span>
            <p className="mt-2 font-display text-lg font-light italic text-ink">
              Use{" "}
              <span className="not-italic font-normal text-amber tracking-wider">
                RITUAL10
              </span>{" "}
              na primeira compra
            </p>
            <p className="mt-2 text-xs italic text-ink/70">
              Mande o cupom junto com a reserva.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmitEmail} className="flex flex-col gap-2">
            <p className="text-center text-[10px] font-sans uppercase tracking-[0.35em] text-ink/65">
              Ou pega 10% off pra primeira compra
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailState === "error") setEmailState("idle");
                }}
                disabled={emailState === "submitting"}
                placeholder="seu@email.com (opcional)"
                className="flex-1 rounded-full border border-ink/15 bg-cream/60 px-5 py-2.5 text-sm text-ink placeholder:text-ink/55 focus:border-amber focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={emailState === "submitting" || !email}
                className="rounded-full border border-ink/25 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber disabled:opacity-50"
              >
                {emailState === "submitting" ? "Enviando…" : "Receber cupom"}
              </button>
            </div>
            {emailState === "error" && (
              <p className="text-xs italic" style={{ color: "#d88b8f" }}>
                {emailError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
