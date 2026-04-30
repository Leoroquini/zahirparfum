"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "zahir-cupom-banner-dismissed";

/**
 * Banner dismissible no topo da página pra primeiro acesso.
 * Mostra cupom RITUAL10 e leva pro quiz.
 * Lembra da dispensa em localStorage (não reaparece).
 */
export function CupomBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Checa se já dispensou
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    // Delay pequeno pra não parecer agressivo
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-0 top-0 z-[55] border-b border-amber/30 bg-cream/95 px-4 py-2.5 backdrop-blur-xl"
          role="region"
          aria-label="Oferta de boas-vindas"
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span
                aria-hidden
                className="font-display text-lg italic leading-none text-amber"
              >
                ✦
              </span>
              <p className="text-xs text-ink md:text-sm">
                <span className="hidden font-sans uppercase tracking-[0.3em] text-amber md:inline">
                  Primeira compra
                </span>
                <span className="md:hidden text-amber">1ª compra · </span>
                <span className="md:ml-3">
                  Faça o{" "}
                  <Link
                    href="/ritual"
                    onClick={dismiss}
                    className="italic text-amber underline-offset-4 hover:underline"
                  >
                    Ritual olfativo
                  </Link>{" "}
                  e ganhe cupom de{" "}
                  <strong className="font-normal text-amber">10% off</strong>
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Fechar aviso"
              className="shrink-0 text-xs text-ink/70 transition-colors hover:text-amber"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
