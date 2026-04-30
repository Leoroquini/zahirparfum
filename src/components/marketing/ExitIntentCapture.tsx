"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "zahir-exit-intent";

/**
 * Popup exit-intent, detecta mouse saindo pro topo da viewport
 * (padrão universal de "vou fechar a aba") e oferece captura de email.
 * Mostra uma vez por navegador (localStorage).
 * Também dispara após 60s de inatividade em desktop.
 */
export function ExitIntentCapture() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    // Só uma vez por navegador
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    // Exit intent, mouse sai pelo topo
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Fallback mobile, após 45s na página
    const mobileTimer = setTimeout(() => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        trigger();
      }
    }, 45000);

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("E-mail não parece válido");
      setState("error");
      return;
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem("zahir-interest") ?? "[]"
      );
      localStorage.setItem(
        "zahir-interest",
        JSON.stringify([
          ...existing,
          { email: trimmed, source: "exit-intent", at: Date.now() },
        ])
      );
    } catch {
      // silent
    }
    localStorage.setItem(STORAGE_KEY, "captured");
    setState("success");
    setTimeout(() => setOpen(false), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[75] bg-cream/80 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed left-1/2 top-1/2 z-[76] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
            role="dialog"
            aria-labelledby="exit-title"
          >
            <div className="relative overflow-hidden rounded-sm border border-amber/40 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)] md:p-12">
              <button
                type="button"
                onClick={handleDismiss}
                className="absolute right-5 top-5 text-lg text-ink/70 transition-colors hover:text-amber"
                aria-label="Fechar"
              >
                ×
              </button>

              {state === "success" ? (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <span className="font-display text-5xl italic text-amber">
                    ✦
                  </span>
                  <h2
                    id="exit-title"
                    className="font-display text-2xl font-light italic text-ink md:text-3xl"
                  >
                    Tá dentro.
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-ink/70">
                    Use{" "}
                    <span className="font-display italic text-amber">
                      VOLTA10
                    </span>{" "}
                    na primeira compra, é só mandar o código junto com a
                    reserva no Instagram.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                      Antes de você sair
                    </span>
                    <h2
                      id="exit-title"
                      className="font-display text-3xl font-light leading-[1.1] text-ink md:text-4xl"
                    >
                      10% na primeira compra,{" "}
                      <em className="italic text-amber/90">a gente guarda pra você.</em>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">
                      Deixa seu e-mail e a gente manda o cupom junto com uma
                      dica de curadoria escolhida pra você. Sem spam, cancela
                      em 1 clique.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="seu@email.com"
                      autoFocus
                      className="w-full rounded-full border border-ink/20 px-5 py-3.5 text-sm text-ink placeholder:text-ink/75 focus:border-amber focus:outline-none"
                    />
                    {state === "error" && (
                      <span
                        className="text-xs italic"
                        style={{ color: "#d88b8f" }}
                      >
                        {error}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-colors hover:bg-amber-bright"
                    >
                      Quero o cupom
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="mt-1 text-center text-[10px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-colors hover:text-ink/70"
                    >
                      Dispensar oferta
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
