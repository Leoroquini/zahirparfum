"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Captura de e-mail pra pré-lançamento / lista de interesse.
 * Por enquanto só armazena no front (console + localStorage), integração real
 * com Mailerlite/Klaviyo fica como tarefa pós-lançamento.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Um e-mail, por favor");
      setState("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("E-mail não parece válido");
      setState("error");
      return;
    }

    setState("submitting");
    // Fake delay pra feedback visual, troca por fetch quando a integração real estiver pronta
    await new Promise((r) => setTimeout(r, 900));

    // Salva localmente (não envia pra lugar nenhum ainda)
    try {
      const existing = JSON.parse(
        localStorage.getItem("zahir-interest") ?? "[]"
      );
      localStorage.setItem(
        "zahir-interest",
        JSON.stringify([...existing, { email: trimmed, at: Date.now() }])
      );
    } catch {
      // silent
    }

    setState("success");
    setEmail("");
  };

  return (
    <section id="newsletter"
      className="section-veil-light relative border-t border-ink/5 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Lista de interesse
            </span>
            <h2 className="max-w-xl font-display text-3xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl">
              Primeiro acesso{" "}
              <em className="italic text-amber/90">aos lançamentos.</em>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink/75">
              Sem spam. Só: novos perfumes entrando, decants novos abertos, e
              curadorias temáticas quando a gente publicar.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3"
            aria-label="Cadastro na lista de interesse"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="nl-email">
                Seu e-mail
              </label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                disabled={state === "submitting" || state === "success"}
                placeholder="seu@email.com"
                className="flex-1 rounded-full border border-ink/15 px-5 py-3.5 text-sm text-ink placeholder:text-ink/75 transition-colors focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state === "submitting" || state === "success"}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright disabled:opacity-70"
              >
                {state === "submitting"
                  ? "Enviando..."
                  : state === "success"
                  ? "Cadastrado ✓"
                  : "Quero saber"}
                {state !== "submitting" && state !== "success" && (
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {state === "error" && error && (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs italic text-wine"
                  style={{ color: "#d88b8f" }}
                >
                  {error}
                </motion.span>
              )}
              {state === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs italic text-amber"
                >
                  Tá dentro. A gente avisa quando sair novidade.
                </motion.span>
              )}
              {state === "idle" && (
                <span
                  key="idle"
                  className="text-[10px] italic text-ink/75"
                >
                  Cancelamento com um clique, sempre.
                </span>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
